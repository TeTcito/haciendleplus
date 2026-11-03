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

// Recorta la porción encuadrada con total fidelidad matemática a 1:1 WebP
const cropImageToSquareBlob = async (
  src: string,
  naturalDim: { width: number; height: number },
  pan: { x: number; y: number },
  zoom: number,
  containerSize: number
): Promise<Blob | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const Wnat = img.naturalWidth || naturalDim.width || 1000;
      const Hnat = img.naturalHeight || naturalDim.height || 1000;
      const S = containerSize > 0 ? containerSize : 320;
      const isLandscape = Wnat >= Hnat;

      const scaleFactor = isLandscape ? (S * zoom) / Hnat : (S * zoom) / Wnat;
      const sw = Math.min(Wnat, Math.max(10, S / scaleFactor));
      const sh = Math.min(Hnat, Math.max(10, S / scaleFactor));

      const sx = Math.max(0, Math.min(Wnat - sw, Wnat / 2 + (-pan.x - S / 2) / scaleFactor));
      const sy = Math.max(0, Math.min(Hnat - sh, Hnat / 2 + (-pan.y - S / 2) / scaleFactor));

      const outputSize = Math.min(1280, Math.max(800, Math.round(sw)));
      const canvas = document.createElement('canvas');
      canvas.width = outputSize;
      canvas.height = outputSize;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(null);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outputSize, outputSize);

      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        'image/webp',
        0.88
      );
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
};

export const AdminMediaUploader: React.FC<AdminMediaUploaderProps> = ({
  imageUrl,
  onImageChange,
  imagePosition = '50% 50%',
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
  const [rawSourceUrl, setRawSourceUrl] = useState<string>(imageUrl || '');
  const lastUploadedUrlRef = useRef<string | null>(null);

  // Estados de encuadre libre 2D con la manito
  const [isPanMode, setIsPanMode] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [zoom, setZoom] = useState(1.15); // Zoom inicial elegante que da libertad horizontal y vertical
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [naturalDimensions, setNaturalDimensions] = useState<{ width: number; height: number }>({
    width: 1,
    height: 1,
  });
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ clientX: number; clientY: number; startPanX: number; startPanY: number }>({
    clientX: 0,
    clientY: 0,
    startPanX: 0,
    startPanY: 0,
  });

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Sincronizar previsualización cuando cambie la URL exterior
  useEffect(() => {
    if (imageUrl !== lastUploadedUrlRef.current) {
      setDisplaySrc(imageUrl || '');
      setRawSourceUrl(imageUrl || '');
    }
  }, [imageUrl]);

  // Cargar dimensiones naturales de la imagen para calcular límites de arrastre 2D
  useEffect(() => {
    const srcToMeasure = rawSourceUrl || displaySrc;
    if (srcToMeasure) {
      const img = new Image();
      img.onload = () => {
        if (img.naturalWidth && img.naturalHeight) {
          setNaturalDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        }
      };
      img.src = srcToMeasure;
    }
  }, [rawSourceUrl, displaySrc]);

  // Límites dinámicos de movimiento para evitar que la imagen se salga del marco 1:1
  const getPanLimits = (currentZoom: number = zoom) => {
    if (!containerRef.current) return { maxX: 100, maxY: 100 };
    const S = containerRef.current.clientWidth || 300;
    const { width: Wnat, height: Hnat } = naturalDimensions;
    if (Wnat <= 1 || Hnat <= 1) return { maxX: 100, maxY: 100 };

    const isLandscape = Wnat >= Hnat;
    const renderedWidth = isLandscape ? (S * (Wnat / Hnat)) * currentZoom : S * currentZoom;
    const renderedHeight = isLandscape ? S * currentZoom : (S * (Hnat / Wnat)) * currentZoom;

    // Margen libre de movimiento 2D según dimensiones y zoom
    const maxX = Math.max(10, (renderedWidth - S) / 2);
    const maxY = Math.max(10, (renderedHeight - S) / 2);

    return { maxX, maxY };
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = '';

    const instantLocalUrl = URL.createObjectURL(file);
    setDisplaySrc(instantLocalUrl);
    setRawSourceUrl(instantLocalUrl);
    setPan({ x: 0, y: 0 });
    setZoom(1.15);
    if (onMediaTypeChange) {
      onMediaTypeChange('image');
    }

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
    } catch (err) {
      console.error('Error al procesar imagen:', err);
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
    if (onMediaTypeChange) {
      onMediaTypeChange('video');
    }

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

  // =========================================================================
  // GESTIÓN DE ARRASTRE LIBRE 2D CON LA MANITO (HORIZONTAL + VERTICAL FLUIDO)
  // =========================================================================
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanMode) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      startPanX: pan.x,
      startPanY: pan.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanMode || !isDragging) return;
    e.preventDefault();
    const deltaX = e.clientX - dragStartRef.current.clientX;
    const deltaY = e.clientY - dragStartRef.current.clientY;

    const { maxX, maxY } = getPanLimits();

    // Mueve directamente el elemento en 2D (X e Y con total fluidez)
    const newX = Math.min(maxX, Math.max(-maxX, dragStartRef.current.startPanX + deltaX));
    const newY = Math.min(maxY, Math.max(-maxY, dragStartRef.current.startPanY + deltaY));

    setPan({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isPanMode || e.touches.length === 0) return;
    setIsDragging(true);
    dragStartRef.current = {
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY,
      startPanX: pan.x,
      startPanY: pan.y,
    };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isPanMode || !isDragging || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - dragStartRef.current.clientX;
    const deltaY = e.touches[0].clientY - dragStartRef.current.clientY;

    const { maxX, maxY } = getPanLimits();
    const newX = Math.min(maxX, Math.max(-maxX, dragStartRef.current.startPanX + deltaX));
    const newY = Math.min(maxY, Math.max(-maxY, dragStartRef.current.startPanY + deltaY));

    setPan({ x: newX, y: newY });
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  // Zoom fluido mediante rueda del ratón (Wheel)
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!isPanMode) return;
    e.preventDefault();
    const zoomStep = 0.08;
    const newZoom = e.deltaY < 0 ? Math.min(2.8, zoom + zoomStep) : Math.max(1.0, zoom - zoomStep);
    const rounded = parseFloat(newZoom.toFixed(2));
    setZoom(rounded);

    const { maxX, maxY } = getPanLimits(rounded);
    setPan((prev) => ({
      x: Math.min(maxX, Math.max(-maxX, prev.x)),
      y: Math.min(maxY, Math.max(-maxY, prev.y)),
    }));
  };

  const handleResetPosition = () => {
    setPan({ x: 0, y: 0 });
    setZoom(1.15);
  };

  // Aplicar el encuadre 1:1 mediante recorte de canvas y subir a la nube
  const handleApplyCrop = async () => {
    const srcToCrop = rawSourceUrl || displaySrc;
    if (!srcToCrop) {
      setIsPanMode(false);
      return;
    }

    try {
      setIsCropping(true);
      if (onProcessingChange) onProcessingChange(true);

      const S = containerRef.current?.clientWidth || 320;
      const croppedBlob = await cropImageToSquareBlob(
        srcToCrop,
        naturalDimensions,
        pan,
        zoom,
        S
      );

      if (croppedBlob) {
        const croppedLocalUrl = URL.createObjectURL(croppedBlob);
        setDisplaySrc(croppedLocalUrl);

        // Subir la imagen ya recortada en formato 1:1 perfecto a Supabase
        const uploaded = await uploadMediaToSupabase(
          new File([croppedBlob], `crop-${Date.now()}.webp`, { type: 'image/webp' }),
          'img'
        );

        const finalUrl = uploaded || croppedLocalUrl;
        lastUploadedUrlRef.current = finalUrl;
        setDisplaySrc(finalUrl);
        onImageChange(finalUrl);
      }
    } catch (err) {
      console.warn('Error al aplicar recorte canvas:', err);
    } finally {
      setIsCropping(false);
      setIsPanMode(false);
      if (onProcessingChange) onProcessingChange(false);
    }
  };

  const activeImageSrc = displaySrc;

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

        {/* Selector de Tipo de Multimedia cuando allowVideo está activo */}
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
          /* MODO IMAGEN WEBP (1:1 CUADRADO) */
          <div className="space-y-3">
            {activeImageSrc ? (
              <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onWheel={handleWheel}
                className={`relative aspect-square rounded-2xl overflow-hidden border border-slate-300 bg-[#06150F] shadow-xs select-none transition-shadow ${
                  isPanMode
                    ? isDragging
                      ? 'cursor-grabbing ring-2 ring-[#C8A45D] shadow-lg'
                      : 'cursor-grab ring-2 ring-[#C8A45D]'
                    : 'group'
                }`}
              >
                {/* VISTA PREVIA: MODO ENCUADRE LIBRE 2D (CON ZOOM Y ARRASTRE SIN BLOQUEOS) */}
                {isPanMode ? (
                  <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                    <img
                      src={rawSourceUrl || activeImageSrc}
                      alt="Vista previa encuadre"
                      draggable={false}
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        width: naturalDimensions.width >= naturalDimensions.height ? 'auto' : '100%',
                        height: naturalDimensions.width >= naturalDimensions.height ? '100%' : 'auto',
                        maxWidth: 'none',
                        maxHeight: 'none',
                        transform: `translate(-50%, -50%) translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                        transformOrigin: 'center center',
                        pointerEvents: 'none',
                        userSelect: 'none',
                      }}
                      className="transition-[transform] duration-75"
                    />
                  </div>
                ) : (
                  /* VISTA PREVIA NORMAL 1:1 */
                  <img
                    src={activeImageSrc}
                    alt="Vista previa"
                    draggable={false}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* ANIMACIÓN EXCLUSIVA EN EL CENTRO DE LA IMAGEN DURANTE LA SUBIDA */}
                {isProcessing && (
                  <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-2xs flex flex-col items-center justify-center text-white gap-2.5 z-30 p-4 text-center">
                    <div className="relative flex items-center justify-center">
                      <UploadCloud className="w-12 h-12 text-[#E2C585] animate-bounce" />
                      <Loader2 className="w-5 h-5 text-[#E2C585] animate-spin absolute -bottom-1 -right-1" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">
                      Subiendo a la nube...
                    </span>
                    <span className="text-[10px] text-[#E2C585] bg-black/60 px-2.5 py-0.5 rounded-full font-mono">
                      Optimizando a formato WebP
                    </span>
                  </div>
                )}

                {/* BARRA SUPERIOR FLOTANTE CUANDO ESTÁ ACTIVO EL MODO ACOMODAR (MANITO) */}
                {isPanMode && !isProcessing && (
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-30 pointer-events-auto">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06150F]/90 text-[#E2C585] text-[11px] font-bold shadow-md backdrop-blur-xs border border-[#C8A45D]/40">
                      <Hand className="w-3.5 h-3.5" />
                      <span>{isDragging ? 'Moviendo con libertad...' : 'Arrastra con la manito (2D)'}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResetPosition();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-black/80 hover:bg-black text-white text-[10px] font-bold shadow cursor-pointer transition-colors flex items-center gap-1"
                        title="Restablecer posición y zoom"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Centrar</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApplyCrop();
                        }}
                        disabled={isCropping}
                        className="px-3 py-1 rounded-lg bg-[#C8A45D] hover:bg-[#E2C585] text-[#06150F] text-xs font-extrabold shadow cursor-pointer transition-colors flex items-center gap-1 disabled:opacity-50"
                      >
                        {isCropping ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        )}
                        <span>{isCropping ? 'Aplicando...' : 'Listo'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* BARRA INFERIOR DE ZOOM FLUIDO Y RUEDA DE RATÓN */}
                {isPanMode && !isProcessing && (
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#06150F]/90 backdrop-blur-xs border border-white/10 rounded-xl px-3 py-1.5 flex items-center justify-between gap-3 z-30 text-white text-xs">
                    <div className="flex items-center gap-2 flex-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const nz = Math.max(1.0, parseFloat((zoom - 0.1).toFixed(2)));
                          setZoom(nz);
                        }}
                        className="p-1 rounded-md hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
                        title="Alejar (Zoom -)"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>

                      <input
                        type="range"
                        min={1.0}
                        max={2.5}
                        step={0.05}
                        value={zoom}
                        onChange={(e) => {
                          const nz = parseFloat(e.target.value);
                          setZoom(nz);
                        }}
                        className="flex-1 accent-[#C8A45D] cursor-pointer h-1 bg-white/20 rounded-lg"
                      />

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const nz = Math.min(2.5, parseFloat((zoom + 0.1).toFixed(2)));
                          setZoom(nz);
                        }}
                        className="p-1 rounded-md hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
                        title="Acercar (Zoom +)"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="font-mono text-[10px] text-[#E2C585] shrink-0 font-bold">
                      {Math.round(zoom * 100)}%
                    </span>
                  </div>
                )}

                {/* BOTONES EN EL CENTRO DE LA IMAGEN AL PASAR EL CURSOR (HOVER) */}
                {!isProcessing && !isPanMode && (
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
                      onClick={() => {
                        setPan({ x: 0, y: 0 });
                        setZoom(1.15);
                        setIsPanMode(true);
                      }}
                      className="px-3 py-2 rounded-xl bg-[#06150F] text-[#E2C585] border border-[#C8A45D]/60 text-xs font-bold hover:bg-[#13281F] transition-colors shadow cursor-pointer flex items-center gap-1.5 shrink-0"
                      title="Mover y acomodar libremente en 2D con la manito"
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
                        handleResetPosition();
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
                    <span className="text-[10px] text-slate-500">
                      Optimizando a WebP
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
                  setDisplaySrc(e.target.value);
                  setRawSourceUrl(e.target.value);
                  onImageChange(e.target.value);
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
