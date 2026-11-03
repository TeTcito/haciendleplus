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
  CheckCircle2,
  Loader2,
  Film,
  Link as LinkIcon,
  Hand,
  Check,
  RotateCcw,
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

const parsePos = (str?: string): { x: number; y: number } => {
  if (!str) return { x: 50, y: 50 };
  const parts = str.trim().split(/\s+/);
  if (parts.length >= 2) {
    const x = parseFloat(parts[0]);
    const y = parseFloat(parts[1]);
    if (!isNaN(x) && !isNaN(y)) return { x, y };
  }
  return { x: 50, y: 50 };
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
  const lastUploadedUrlRef = useRef<string | null>(null);

  // Estados de encuadre manual (arrastrar con la manito)
  const [isPanMode, setIsPanMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number }>(() => parsePos(imagePosition));
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ clientX: number; clientY: number; startX: number; startY: number }>({
    clientX: 0,
    clientY: 0,
    startX: 50,
    startY: 50,
  });

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Sincronizar previsualización cuando cambie el item desde el exterior
  useEffect(() => {
    if (imageUrl !== lastUploadedUrlRef.current) {
      setDisplaySrc(imageUrl || '');
    }
  }, [imageUrl]);

  // Sincronizar posición cuando cambie el item exterior
  useEffect(() => {
    setPos(parsePos(imagePosition));
  }, [imagePosition]);

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = '';

    // 1. Previsualización instantánea sin salto blanco
    const instantLocalUrl = URL.createObjectURL(file);
    setDisplaySrc(instantLocalUrl);
    if (onMediaTypeChange) {
      onMediaTypeChange('image');
    }

    try {
      setIsProcessing(true);
      if (onProcessingChange) onProcessingChange(true);

      // 2. Compresión optimizada a WebP
      const result = await compressAndConvertToWebP(file, 1280, 1280, 0.8);

      // 3. Subida a Supabase Storage con respaldo en base64
      const uploadedUrl = await uploadMediaToSupabase(result.file, 'img');
      const finalUrl = uploadedUrl || result.base64DataUrl || instantLocalUrl;

      // 4. Pre-cargar imagen en memoria antes de sustituir el src
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
  // GESTIÓN DE ENCUADRE CON LA MANITO (DRAG & DROP DIRECTO SIN FLECHAS)
  // =========================================================================
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanMode) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      startX: pos.x,
      startY: pos.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanMode || !isDragging || !containerRef.current) return;
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = e.clientX - dragStartRef.current.clientX;
    const deltaY = e.clientY - dragStartRef.current.clientY;

    // Arrastre natural de agarre: mover el cursor desplaza el visor de la imagen
    const newX = Math.min(100, Math.max(0, Math.round((dragStartRef.current.startX - (deltaX / rect.width) * 100) * 10) / 10));
    const newY = Math.min(100, Math.max(0, Math.round((dragStartRef.current.startY - (deltaY / rect.height) * 100) * 10) / 10));

    setPos({ x: newX, y: newY });
    onImagePositionChange?.(`${newX}% ${newY}%`);
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
      startX: pos.x,
      startY: pos.y,
    };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isPanMode || !isDragging || !containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = e.touches[0].clientX - dragStartRef.current.clientX;
    const deltaY = e.touches[0].clientY - dragStartRef.current.clientY;

    const newX = Math.min(100, Math.max(0, Math.round((dragStartRef.current.startX - (deltaX / rect.width) * 100) * 10) / 10));
    const newY = Math.min(100, Math.max(0, Math.round((dragStartRef.current.startY - (deltaY / rect.height) * 100) * 10) / 10));

    setPos({ x: newX, y: newY });
    onImagePositionChange?.(`${newX}% ${newY}%`);
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const handleResetPosition = () => {
    setPos({ x: 50, y: 50 });
    onImagePositionChange?.('50% 50%');
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

            {/* Imagen de portada (Poster) opcional para el video */}
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
                className={`relative aspect-square rounded-2xl overflow-hidden border border-slate-300 bg-[#06150F] shadow-xs select-none transition-shadow ${
                  isPanMode
                    ? isDragging
                      ? 'cursor-grabbing ring-2 ring-[#C8A45D] shadow-lg'
                      : 'cursor-grab ring-2 ring-[#C8A45D]'
                    : 'group'
                }`}
              >
                <img
                  src={activeImageSrc}
                  alt="Vista previa"
                  draggable={false}
                  style={{
                    objectPosition: `${pos.x}% ${pos.y}%`,
                  }}
                  className="w-full h-full object-cover pointer-events-none select-none transition-[object-position] duration-75"
                />

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
                      <span>{isDragging ? 'Moviendo posición...' : 'Arrastra con la manito'}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {(pos.x !== 50 || pos.y !== 50) && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResetPosition();
                          }}
                          className="px-2.5 py-1 rounded-lg bg-black/80 hover:bg-black text-white text-[10px] font-bold shadow cursor-pointer transition-colors flex items-center gap-1"
                          title="Restablecer encuadre al centro"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Centrar</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPanMode(false);
                        }}
                        className="px-3 py-1 rounded-lg bg-[#C8A45D] hover:bg-[#E2C585] text-[#06150F] text-xs font-extrabold shadow cursor-pointer transition-colors flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Listo</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* ETIQUETA INFORMATIVA DE COORDENADAS DURANTE EL ACOMODO */}
                {isPanMode && !isProcessing && (
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#06150F]/85 text-white text-[10px] font-mono pointer-events-none z-30 border border-white/10">
                    Encuadre: {Math.round(pos.x)}% {Math.round(pos.y)}%
                  </div>
                )}

                {/* BOTONES EN EL CENTRO DE LA IMAGEN AL PASAR EL CURSOR (HOVER) */}
                {!isProcessing && !isPanMode && (
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20 p-2">
                    {/* Botón 1: Cambiar Imagen */}
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="px-3 py-2 rounded-xl bg-white text-[#06150F] text-xs font-bold hover:bg-[#E2C585] transition-colors shadow cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Cambiar</span>
                    </button>

                    {/* Botón 2: Mover / Acomodar Encuadre con la manito */}
                    <button
                      type="button"
                      onClick={() => setIsPanMode(true)}
                      className="px-3 py-2 rounded-xl bg-[#06150F] text-[#E2C585] border border-[#C8A45D]/60 text-xs font-bold hover:bg-[#13281F] transition-colors shadow cursor-pointer flex items-center gap-1.5 shrink-0"
                      title="Mover y acomodar encuadre de la imagen manteniendo clickeado con la manito"
                    >
                      <Hand className="w-3.5 h-3.5" />
                      <span>Acomodar</span>
                    </button>

                    {/* Botón 3: Quitar Imagen */}
                    <button
                      type="button"
                      onClick={() => {
                        lastUploadedUrlRef.current = null;
                        setDisplaySrc('');
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
