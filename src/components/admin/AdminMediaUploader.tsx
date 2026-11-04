import React, { useState, useRef, useEffect } from 'react';
import {
  compressAndConvertToWebP,
  formatFileSize,
} from '../../utils/imageCompressor';
import { uploadMediaToSupabase } from '../../lib/supabase';
import {
  UploadCloud,
  X,
  Image as ImageIcon,
  Video,
  Loader2,
  Film,
  Link as LinkIcon,
  Hand,
  Check,
  CheckCircle2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

interface AdminMediaUploaderProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
  imagePosition?: string;
  onImagePositionChange?: (pos: string) => void;
  videoUrl?: string;
  onVideoChange?: (url: string) => void;
  mediaType?: 'image' | 'video';
  onMediaTypeChange?: (type: 'image' | 'video') => void;
  allowVideo?: boolean;
  label?: string;
  onProcessingChange?: (isProcessing: boolean) => void;
}

type Offset = { x: number; y: number };

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const CROP_BG = '#06150F';

/**
 * Calcula la posición CSS object-position (X% Y%) a partir del offset y dimensiones.
 */
const computePositionPercent = (
  off: Offset,
  w: number,
  h: number,
  boxSize: number
): string => {
  const maxOverflowX = w - boxSize;
  const maxOverflowY = h - boxSize;
  const px =
    maxOverflowX > 0
      ? Math.round(Math.max(0, Math.min(100, (-off.x / maxOverflowX) * 100)))
      : 50;
  const py =
    maxOverflowY > 0
      ? Math.round(Math.max(0, Math.min(100, (-off.y / maxOverflowY) * 100)))
      : 50;
  return `${px}% ${py}%`;
};

/**
 * Exporta EXACTAMENTE lo que se ve en el visor cuadrado (WYSIWYG) a un WebP 1:1.
 * offset/w/h están en píxeles de pantalla relativos al visor de tamaño S.
 * Protegido contra tainted canvas por CORS mediante fetch de blob local.
 */
const cropVisibleSquare = async (
  src: string,
  offset: Offset,
  renderW: number,
  renderH: number,
  S: number
): Promise<Blob | null> => {
  try {
    let cleanSrc = src;
    // Si es una URL externa o de Supabase, obtener blob local para que canvas jamás se bloquee por CORS
    if (/^https?:\/\//.test(src)) {
      try {
        const resp = await fetch(src, { mode: 'cors', cache: 'no-cache' });
        if (resp.ok) {
          const b = await resp.blob();
          cleanSrc = URL.createObjectURL(b);
        }
      } catch (e) {
        console.warn('Fetch fallback to direct src:', e);
      }
    }

    return await new Promise<Blob | null>((resolve) => {
      const img = new Image();
      if (/^https?:\/\//.test(cleanSrc)) img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          // Resolución de salida = píxeles reales de la imagen visibles en el visor (800–1600 px)
          const nativePerScreenPx = img.naturalWidth / renderW;
          const N = Math.round(Math.min(1600, Math.max(800, nativePerScreenPx * S)));
          const r = N / S;

          const canvas = document.createElement('canvas');
          canvas.width = N;
          canvas.height = N;
          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(null);

          ctx.fillStyle = CROP_BG;
          ctx.fillRect(0, 0, N, N);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, offset.x * r, offset.y * r, renderW * r, renderH * r);

          canvas.toBlob((blob) => resolve(blob), 'image/webp', 0.88);
        } catch (err) {
          console.warn('Canvas export failed:', err);
          resolve(null);
        }
      };
      img.onerror = (e) => {
        console.warn('Image load failed for crop:', cleanSrc, e);
        resolve(null);
      };
      img.src = cleanSrc;
    });
  } catch (err) {
    console.warn('cropVisibleSquare error:', err);
    return null;
  }
};

export const AdminMediaUploader: React.FC<AdminMediaUploaderProps> = ({
  imageUrl,
  onImageChange,
  onImagePositionChange,
  videoUrl = '',
  onVideoChange,
  mediaType = 'image',
  onMediaTypeChange,
  allowVideo = true,
  label = '2. Multimedia Optimizada (Imagen WebP / Video HD)',
  onProcessingChange,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoUploadNotice, setVideoUploadNotice] = useState<string | null>(null);
  const [displaySrc, setDisplaySrc] = useState<string>(imageUrl || '');
  // Imagen original (sin recortar) sobre la que se hace el encuadre
  const [rawSourceUrl, setRawSourceUrl] = useState<string>(imageUrl || '');
  const lastUploadedUrlRef = useRef<string | null>(null);

  // ======================= ESTADO DEL ENCUADRE =======================
  const [isPanMode, setIsPanMode] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(MIN_ZOOM); // 100%: la imagen tal cual, sin zoom inicial
  const [offset, setOffset] = useState<Offset | null>(null); // null = centrada
  const [boxSize, setBoxSize] = useState(0);
  const [naturalDimensions, setNaturalDimensions] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; startY: number; originX: number; originY: number } | null>(null);
  const pendingOffsetRef = useRef<Offset | null>(null);
  const rafRef = useRef<number | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const resetFraming = () => {
    setZoom(MIN_ZOOM);
    setOffset(null);
    onImagePositionChange?.('50% 50%');
  };

  // Sincronizar cuando cambia el item desde el exterior (al cambiar de tarjeta)
  useEffect(() => {
    // Si estamos subiendo o procesando, jamás sobreescribir con valor viejo del padre
    if (isProcessing || isCropping) return;

    if (imageUrl) {
      if (imageUrl !== lastUploadedUrlRef.current && imageUrl !== displaySrc) {
        lastUploadedUrlRef.current = imageUrl;
        setDisplaySrc(imageUrl);
        setRawSourceUrl(imageUrl);
        resetFraming();
        setIsPanMode(false);
      }
    } else if (!imageUrl && displaySrc) {
      lastUploadedUrlRef.current = '';
      setDisplaySrc('');
      setRawSourceUrl('');
      resetFraming();
      setIsPanMode(false);
    }
  }, [imageUrl, isProcessing, isCropping]);

  // Dimensiones naturales de la imagen original
  useEffect(() => {
    const src = rawSourceUrl || displaySrc;
    if (!src) return;
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled && img.naturalWidth && img.naturalHeight) {
        setNaturalDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      }
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [rawSourceUrl, displaySrc]);

  // Tamaño real del visor cuadrado (px)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setBoxSize(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [displaySrc, mediaType]);

  // ======================= GEOMETRÍA =======================
  const dimsReady = naturalDimensions.width > 0 && naturalDimensions.height > 0 && boxSize > 0;

  const getRenderSize = (z: number = zoom) => {
    if (!dimsReady) return { w: boxSize, h: boxSize };
    const { width: W, height: H } = naturalDimensions;
    const cover = Math.max(boxSize / W, boxSize / H); // 100% = cubre el cuadro sin deformar
    return { w: W * cover * z, h: H * cover * z };
  };

  // Movimiento libre: solo se impide que la imagen salga por completo del visor
  const clampOffset = (x: number, y: number, w: number, h: number): Offset => {
    const keep = Math.min(40, boxSize * 0.15);
    return {
      x: Math.min(boxSize - keep, Math.max(keep - w, x)),
      y: Math.min(boxSize - keep, Math.max(keep - h, y)),
    };
  };

  const { w: renderW, h: renderH } = getRenderSize();
  const effectiveOffset: Offset = offset ?? { x: (boxSize - renderW) / 2, y: (boxSize - renderH) / 2 };

  // Referencia siempre actualizada para listeners nativos (rueda / teclado)
  const latestRef = useRef({ effectiveOffset, renderW, renderH, zoom });
  latestRef.current = { effectiveOffset, renderW, renderH, zoom };

  const zoomTo = (nextZoomRaw: number) => {
    const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, parseFloat(nextZoomRaw.toFixed(2))));
    const { effectiveOffset: cur, renderW: w, renderH: h } = latestRef.current;
    const { w: nw, h: nh } = getRenderSize(nextZoom);
    // Zoom anclado al centro del visor
    const cx = boxSize / 2;
    const cy = boxSize / 2;
    const px = (cx - cur.x) / w;
    const py = (cy - cur.y) / h;
    setZoom(nextZoom);
    setOffset(clampOffset(cx - px * nw, cy - py * nh, nw, nh));
  };

  // ======================= ARRASTRE PIXEL A PIXEL =======================
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPanMode || isCropping || !dimsReady) return;
    if ((e.target as HTMLElement).closest('button, input')) return; // no interferir con los controles
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: effectiveOffset.x,
      originY: effectiveOffset.y,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    // 1 px del cursor = 1 px de la imagen (sin transiciones ni suavizados)
    pendingOffsetRef.current = clampOffset(
      drag.originX + (e.clientX - drag.startX),
      drag.originY + (e.clientY - drag.startY),
      renderW,
      renderH
    );
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (pendingOffsetRef.current) setOffset(pendingOffsetRef.current);
      });
    }
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const finalOffset = pendingOffsetRef.current ?? effectiveOffset;
    if (pendingOffsetRef.current) setOffset(pendingOffsetRef.current);
    pendingOffsetRef.current = null;
    dragRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);

    // Sincronizar inmediatamente la posición relativa en el padre
    if (dimsReady && boxSize > 0) {
      const pos = computePositionPercent(finalOffset, renderW, renderH, boxSize);
      onImagePositionChange?.(pos);
    }
  };

  // Rueda del ratón = zoom opcional (listener no pasivo para evitar scroll de la página)
  const wheelHandlerRef = useRef<(e: WheelEvent) => void>(() => {});
  wheelHandlerRef.current = (e: WheelEvent) => {
    if (!isPanMode || !dimsReady) return;
    e.preventDefault();
    zoomTo(latestRef.current.zoom + (e.deltaY < 0 ? 0.05 : -0.05));
  };
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const listener = (e: WheelEvent) => wheelHandlerRef.current(e);
    el.addEventListener('wheel', listener, { passive: false });
    return () => el.removeEventListener('wheel', listener);
  }, [displaySrc, mediaType]);

  // Flechas del teclado: ajuste fino de 1 px (Shift = 10 px)
  useEffect(() => {
    if (!isPanMode) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const step = e.shiftKey ? 10 : 1;
      let dx = 0;
      let dy = 0;
      if (e.key === 'ArrowLeft') dx = -step;
      else if (e.key === 'ArrowRight') dx = step;
      else if (e.key === 'ArrowUp') dy = -step;
      else if (e.key === 'ArrowDown') dy = step;
      else return;
      e.preventDefault();
      const { effectiveOffset: cur, renderW: w, renderH: h } = latestRef.current;
      setOffset(clampOffset(cur.x + dx, cur.y + dy, w, h));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPanMode, boxSize]);

  // ======================= SUBIDA DE ARCHIVOS =======================
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    const instantLocalUrl = URL.createObjectURL(file);
    lastUploadedUrlRef.current = instantLocalUrl;
    setDisplaySrc(instantLocalUrl);
    setRawSourceUrl(instantLocalUrl);
    resetFraming();
    setIsPanMode(false);
    if (onMediaTypeChange) onMediaTypeChange('image');
    // Notificar al padre de inmediato para que la previsualización no se revierta
    onImageChange(instantLocalUrl);
    onImagePositionChange?.('50% 50%');

    try {
      setIsProcessing(true);
      if (onProcessingChange) onProcessingChange(true);

      const result = await compressAndConvertToWebP(file, 1600, 1600, 0.85);
      const uploadedUrl = await uploadMediaToSupabase(result.file, 'img');
      const finalUrl = uploadedUrl || result.base64DataUrl || instantLocalUrl;

      if (finalUrl.startsWith('http')) {
        await new Promise<void>((resolve) => {
          const preImg = new window.Image();
          preImg.onload = () => resolve();
          preImg.onerror = () => resolve();
          preImg.src = finalUrl;
          if (preImg.complete) resolve();
        });
      }

      lastUploadedUrlRef.current = finalUrl;
      setDisplaySrc(finalUrl);
      setRawSourceUrl(finalUrl);
      onImageChange(finalUrl);
      onImagePositionChange?.('50% 50%');
    } catch (err) {
      console.error('Error al procesar imagen:', err);
      // Mantener la URL local como respaldo si falló la subida remota
      lastUploadedUrlRef.current = instantLocalUrl;
      setDisplaySrc(instantLocalUrl);
      onImageChange(instantLocalUrl);
    } finally {
      setIsProcessing(false);
      if (onProcessingChange) onProcessingChange(false);
    }
  };

  const handleVideoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onVideoChange) return;
    e.target.value = '';

    const instantLocalUrl = URL.createObjectURL(file);
    onVideoChange(instantLocalUrl);
    if (onMediaTypeChange) onMediaTypeChange('video');

    try {
      setIsProcessing(true);
      if (onProcessingChange) onProcessingChange(true);
      setVideoUploadNotice('Subiendo video a la nube...');

      const uploadedUrl = await uploadMediaToSupabase(file, 'vid');
      if (uploadedUrl) {
        onVideoChange(uploadedUrl);
        setVideoUploadNotice(`✓ Video subido a la nube (${formatFileSize(file.size)})`);
      } else {
        setVideoUploadNotice(`✓ Video cargado localmente (${formatFileSize(file.size)})`);
      }
    } catch (err) {
      console.error('Error al procesar video:', err);
    } finally {
      setIsProcessing(false);
      if (onProcessingChange) onProcessingChange(false);
    }
  };

  // Aplica el encuadre: exporta exactamente lo visible y lo sube como WebP 1:1
  const handleApplyCrop = async () => {
    const src = rawSourceUrl || displaySrc;
    if (!src || !dimsReady) {
      setIsPanMode(false);
      return;
    }
    try {
      setIsCropping(true);
      if (onProcessingChange) onProcessingChange(true);

      // Posición relativa guardada inmediatamente como respaldo
      const posPercent = computePositionPercent(effectiveOffset, renderW, renderH, boxSize);
      onImagePositionChange?.(posPercent);

      const blob = await cropVisibleSquare(src, effectiveOffset, renderW, renderH, boxSize);
      if (!blob) {
        console.warn('Canvas no pudo exportar el recorte, manteniendo posicionamiento CSS:', posPercent);
        setIsPanMode(false);
        return;
      }

      const localUrl = URL.createObjectURL(blob);
      lastUploadedUrlRef.current = localUrl;
      setDisplaySrc(localUrl);
      setRawSourceUrl(localUrl);
      onImageChange(localUrl);

      const uploaded = await uploadMediaToSupabase(
        new File([blob], `crop-${Date.now()}.webp`, { type: 'image/webp' }),
        'img'
      );
      const finalUrl = uploaded || localUrl;
      lastUploadedUrlRef.current = finalUrl;
      setDisplaySrc(finalUrl);
      setRawSourceUrl(finalUrl);
      resetFraming();
      onImageChange(finalUrl);
      onImagePositionChange?.('50% 50%');
    } catch (err) {
      console.warn('Error al aplicar el encuadre:', err);
    } finally {
      setIsCropping(false);
      setIsPanMode(false);
      if (onProcessingChange) onProcessingChange(false);
    }
  };

  const activeImageSrc = displaySrc;
  const showOverlayLoader = isProcessing || isCropping;

  return (
    <div className="space-y-4 flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-300/80">
          <div className="flex items-center gap-2">
            {mediaType === 'video' ? (
              <Video className="w-4 h-4 text-[#A6823C]" />
            ) : (
              <ImageIcon className="w-4 h-4 text-[#A6823C]" />
            )}
            <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F]">
              {label}
            </h3>
          </div>
        </div>

        {/* Selector de Tipo de Multimedia */}
        {allowVideo && onMediaTypeChange && (
          <div className="grid grid-cols-2 gap-2 p-1 bg-white rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => onMediaTypeChange('image')}
              className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                mediaType === 'image'
                  ? 'bg-[#06150F] text-[#E2C585] shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Imagen (WebP)</span>
            </button>
            <button
              type="button"
              onClick={() => onMediaTypeChange('video')}
              className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                mediaType === 'video'
                  ? 'bg-[#06150F] text-[#E2C585] shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Video (MP4/WebM)</span>
            </button>
          </div>
        )}

        {/* MODO VIDEO */}
        {allowVideo && mediaType === 'video' && onVideoChange ? (
          <div className="space-y-3">
            {videoUrl ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-[#C8A45D]/40 bg-[#06150F] shadow-inner group">
                <video
                  key={videoUrl}
                  src={videoUrl}
                  controls
                  muted
                  loop
                  playsInline
                  poster={activeImageSrc || undefined}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => onVideoChange('')}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors shadow cursor-pointer"
                  title="Quitar video"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => videoInputRef.current?.click()}
                className="aspect-video rounded-2xl border-2 border-dashed border-[#C8A45D]/50 hover:border-[#06150F] bg-white flex flex-col items-center justify-center p-5 text-center cursor-pointer transition-colors group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#C8A45D]/15 text-[#A6823C] flex items-center justify-center mb-2.5">
                  <Film className="w-6 h-6" />
                </div>
                <span className="font-sans-ui font-bold text-xs sm:text-sm text-[#06150F]">
                  Subir archivo de Video (MP4 / WebM)
                </span>
                <span className="text-[11px] text-slate-400 mt-1">
                  O pegue abajo el enlace directo al video
                </span>
              </div>
            )}

            <input
              ref={videoInputRef}
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={handleVideoFileChange}
              className="hidden"
            />

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                URL del Video (MP4 / WebM)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => onVideoChange(e.target.value)}
                  placeholder="https://... archivo.mp4 o subir desde botón"
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#C8A45D]"
                />
                <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {videoUploadNotice && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{videoUploadNotice}</span>
              </div>
            )}

            <div className="pt-2 border-t border-slate-200/80">
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Imagen de Portada / Miniatura del Video
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={activeImageSrc}
                  onChange={(e) => {
                    setDisplaySrc(e.target.value);
                    setRawSourceUrl(e.target.value);
                    onImageChange(e.target.value);
                  }}
                  placeholder="/images/hacienda/..."
                  className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#C8A45D]"
                />
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-[#06150F] text-[#E2C585] text-xs font-bold hover:bg-[#13281F] transition-colors shrink-0 cursor-pointer"
                >
                  Subir Portada
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* MODO IMAGEN WEBP (1:1) */
          <div className="space-y-3">
            {activeImageSrc ? (
              <div
                ref={containerRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                style={{ touchAction: isPanMode ? 'none' : undefined }}
                className={`relative aspect-square rounded-2xl overflow-hidden border border-slate-300 bg-[#06150F] shadow-xs select-none ${
                  isPanMode
                    ? isDragging
                      ? 'cursor-grabbing ring-2 ring-[#C8A45D]'
                      : 'cursor-grab ring-2 ring-[#C8A45D]'
                    : 'group'
                }`}
              >
                {isPanMode ? (
                  /* VISOR DE ENCUADRE: posición en píxeles exactos, sin transiciones */
                  dimsReady && (
                    <img
                      src={rawSourceUrl || activeImageSrc}
                      alt="Encuadre"
                      draggable={false}
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: `${renderW}px`,
                        height: `${renderH}px`,
                        maxWidth: 'none',
                        maxHeight: 'none',
                        transform: `translate3d(${effectiveOffset.x}px, ${effectiveOffset.y}px, 0)`,
                        willChange: 'transform',
                        pointerEvents: 'none',
                        userSelect: 'none',
                      }}
                    />
                  )
                ) : (
                  <img
                    src={activeImageSrc}
                    alt="Vista previa"
                    draggable={false}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Guías de tercios durante el encuadre */}
                {isPanMode && !showOverlayLoader && (
                  <div className="absolute inset-0 pointer-events-none z-10">
                    <div className="absolute inset-y-0 left-1/3 w-px bg-white/25" />
                    <div className="absolute inset-y-0 left-2/3 w-px bg-white/25" />
                    <div className="absolute inset-x-0 top-1/3 h-px bg-white/25" />
                    <div className="absolute inset-x-0 top-2/3 h-px bg-white/25" />
                  </div>
                )}

                {/* Animación central de subida / aplicación */}
                {showOverlayLoader && (
                  <div className="absolute inset-0 bg-slate-950/75 flex flex-col items-center justify-center text-white gap-2.5 z-30 p-4 text-center">
                    <div className="relative flex items-center justify-center">
                      <UploadCloud className="w-12 h-12 text-[#E2C585] animate-bounce" />
                      <Loader2 className="w-5 h-5 text-[#E2C585] animate-spin absolute -bottom-1 -right-1" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">
                      {isCropping ? 'Aplicando encuadre...' : 'Subiendo a la nube...'}
                    </span>
                  </div>
                )}

                {/* Barra superior del modo Acomodar */}
                {isPanMode && !showOverlayLoader && (
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-30">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06150F]/90 text-[#E2C585] text-[11px] font-bold shadow-md border border-[#C8A45D]/40 pointer-events-none">
                      <Hand className="w-3.5 h-3.5" />
                      <span>{isDragging ? 'Moviendo...' : 'Arrastra la imagen'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={resetFraming}
                        className="px-2.5 py-1 rounded-lg bg-black/80 hover:bg-black text-white text-[10px] font-bold shadow cursor-pointer transition-colors flex items-center gap-1"
                        title="Volver a la posición original"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Centrar</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleApplyCrop}
                        className="px-3 py-1 rounded-lg bg-[#C8A45D] hover:bg-[#E2C585] text-[#06150F] text-xs font-extrabold shadow cursor-pointer transition-colors flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Listo</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Barra inferior: zoom opcional (inicia en 100%) */}
                {isPanMode && !showOverlayLoader && (
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#06150F]/90 border border-white/10 rounded-xl px-3 py-1.5 flex items-center gap-2 z-30 text-white text-xs">
                    <button
                      type="button"
                      onClick={() => zoomTo(zoom - 0.1)}
                      className="p-1 rounded-md hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
                      title="Alejar"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="range"
                      min={MIN_ZOOM}
                      max={MAX_ZOOM}
                      step={0.01}
                      value={zoom}
                      onChange={(e) => zoomTo(parseFloat(e.target.value))}
                      className="flex-1 accent-[#C8A45D] cursor-pointer h-1"
                    />
                    <button
                      type="button"
                      onClick={() => zoomTo(zoom + 0.1)}
                      className="p-1 rounded-md hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
                      title="Acercar"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-[10px] text-[#E2C585] w-9 text-right font-bold">
                      {Math.round(zoom * 100)}%
                    </span>
                  </div>
                )}

                {/* Botones centrales al pasar el cursor */}
                {!showOverlayLoader && !isPanMode && (
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20 p-2">
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="px-3 py-2 rounded-xl bg-white text-[#06150F] text-xs font-bold hover:bg-[#E2C585] transition-colors shadow cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Cambiar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPanMode(true)}
                      className="px-3 py-2 rounded-xl bg-[#06150F] text-[#E2C585] border border-[#C8A45D]/60 text-xs font-bold hover:bg-[#13281F] transition-colors shadow cursor-pointer flex items-center gap-1.5 shrink-0"
                      title="Mover la imagen libremente con la manito"
                    >
                      <Hand className="w-3.5 h-3.5" />
                      <span>Acomodar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        lastUploadedUrlRef.current = null;
                        setDisplaySrc('');
                        setRawSourceUrl('');
                        onImageChange('');
                        resetFraming();
                      }}
                      className="p-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors shadow cursor-pointer shrink-0"
                      title="Quitar imagen"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ZONA DE SUBIDA VACÍA */
              <div
                onClick={() => imageInputRef.current?.click()}
                className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#C8A45D] bg-white flex flex-col items-center justify-center p-5 text-center cursor-pointer transition-colors group relative overflow-hidden"
              >
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <div className="relative flex items-center justify-center">
                      <UploadCloud className="w-10 h-10 text-[#A6823C] animate-bounce" />
                      <Loader2 className="w-4 h-4 text-[#A6823C] animate-spin absolute -bottom-1 -right-1" />
                    </div>
                    <span className="font-sans-ui font-bold text-xs text-[#06150F]">
                      Subiendo a la nube...
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-2xl bg-[#C8A45D]/15 text-[#A6823C] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <span className="font-sans-ui font-bold text-xs sm:text-sm text-[#06150F]">
                      Haga clic para subir la imagen (1:1)
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 max-w-[210px]">
                      JPG, PNG o WEBP. Formato 1:1 cuadrado recomendado.
                    </span>
                  </>
                )}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                O ruta / URL directa de imagen
              </label>
              <input
                type="text"
                value={activeImageSrc}
                onChange={(e) => {
                  const val = e.target.value;
                  lastUploadedUrlRef.current = val;
                  setDisplaySrc(val);
                  setRawSourceUrl(val);
                  onImageChange(val);
                }}
                placeholder="/images/hacienda/..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#C8A45D]"
              />
            </div>
          </div>
        )}

        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};
