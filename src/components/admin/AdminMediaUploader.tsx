import React, { useState, useRef, useEffect } from 'react';
import {
  compressAndConvertToWebP,
  CompressionResult,
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
} from 'lucide-react';

interface AdminMediaUploaderProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
  videoUrl?: string;
  onVideoChange?: (url: string) => void;
  mediaType?: 'image' | 'video';
  onMediaTypeChange?: (type: 'image' | 'video') => void;
  allowVideo?: boolean;
  label?: string;
  onProcessingChange?: (isProcessing: boolean) => void;
}

export const AdminMediaUploader: React.FC<AdminMediaUploaderProps> = ({
  imageUrl,
  onImageChange,
  videoUrl = '',
  onVideoChange,
  mediaType = 'image',
  onMediaTypeChange,
  allowVideo = true,
  label = '2. Multimedia Optimizada (Imagen WebP / Video HD)',
  onProcessingChange,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressionResult, setCompressionResult] = useState<CompressionResult | null>(null);
  const [videoUploadNotice, setVideoUploadNotice] = useState<string | null>(null);
  const [previewOverride, setPreviewOverride] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Sincronizar previsualización cuando cambie el item desde el exterior
  useEffect(() => {
    setPreviewOverride(null);
    setCompressionResult(null);
  }, [imageUrl]);

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Resetear valor para permitir volver a seleccionar el mismo archivo si se desea
    e.target.value = '';

    // 1. PREVISUALIZACIÓN LOCAL INSTANTÁNEA EN 0 MILISEGUNDOS
    const instantLocalUrl = URL.createObjectURL(file);
    setPreviewOverride(instantLocalUrl);
    onImageChange(instantLocalUrl);
    if (onMediaTypeChange) {
      onMediaTypeChange('image');
    }

    try {
      setIsProcessing(true);
      if (onProcessingChange) onProcessingChange(true);

      // 2. Compresión optimizada a WebP
      const result = await compressAndConvertToWebP(file, 1280, 1280, 0.8);
      setCompressionResult(result);

      // 3. Subida a Supabase Storage con respaldo en base64
      const uploadedUrl = await uploadMediaToSupabase(result.file, 'img');
      const finalUrl = uploadedUrl || result.base64DataUrl || instantLocalUrl;

      // 4. Actualizar con la URL definitiva permanente en la nube
      setPreviewOverride(finalUrl);
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

    // 1. Previsualización instantánea de video
    const instantLocalUrl = URL.createObjectURL(file);
    onVideoChange(instantLocalUrl);
    if (onMediaTypeChange) {
      onMediaTypeChange('video');
    }

    try {
      setIsProcessing(true);
      if (onProcessingChange) onProcessingChange(true);
      setVideoUploadNotice('Subiendo video a la nube...');

      // 2. Subir video a Supabase Storage
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

  const activeImageSrc = previewOverride || imageUrl;

  return (
    <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
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
          {isProcessing && (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 text-[10px] font-bold">
              <Loader2 className="w-3 h-3 animate-spin text-amber-600" />
              <span>Sincronizando nube...</span>
            </div>
          )}
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
                    setPreviewOverride(e.target.value);
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
          /* MODO IMAGEN WEBP */
          <div className="space-y-3">
            {activeImageSrc ? (
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-slate-200 bg-white shadow-inner group">
                <img
                  key={activeImageSrc}
                  src={activeImageSrc}
                  alt="Vista previa"
                  className="w-full h-full object-cover transition-transform duration-300"
                />

                {/* Overlay de carga mientras sube a la nube (pero ya con vista previa visible) */}
                {isProcessing && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-2xs flex flex-col items-center justify-center text-white gap-2 z-10 p-4 text-center">
                    <Loader2 className="w-7 h-7 animate-spin text-[#E2C585]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">
                      Optimizando y subiendo a la nube...
                    </span>
                    <span className="text-[11px] text-white/80">
                      Vista previa en vivo activa
                    </span>
                  </div>
                )}

                {!isProcessing && (
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-white text-[#06150F] text-xs font-bold hover:bg-[#E2C585] transition-colors shadow cursor-pointer"
                    >
                      Cambiar Imagen
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewOverride(null);
                        setCompressionResult(null);
                        onImageChange('');
                      }}
                      className="p-1.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors shadow cursor-pointer"
                      title="Quitar imagen"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={() => imageInputRef.current?.click()}
                className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#C8A45D] bg-white flex flex-col items-center justify-center p-5 text-center cursor-pointer transition-colors group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#C8A45D]/15 text-[#A6823C] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <span className="font-sans-ui font-bold text-xs sm:text-sm text-[#06150F]">
                  Haga clic para subir la imagen (1:1)
                </span>
                <span className="text-[11px] text-slate-400 mt-1 max-w-[210px]">
                  JPG, PNG o WEBP. Formato 1:1 cuadrado recomendado. Se convertirá automáticamente a WebP optimizado.
                </span>
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
                  setPreviewOverride(e.target.value);
                  onImageChange(e.target.value);
                }}
                placeholder="/images/hacienda/..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#C8A45D]"
              />
            </div>

            {compressionResult && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>¡Convertida a WebP Optimizado!</span>
                </div>
                <div className="text-[11px] text-emerald-700 flex justify-between pt-1 border-t border-emerald-200/60">
                  <span>Original: {formatFileSize(compressionResult.originalSize)}</span>
                  <span>➔</span>
                  <span className="font-bold">
                    WebP: {formatFileSize(compressionResult.compressedSize)} (-
                    {compressionResult.savingsPercentage}%)
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageFileChange}
          className="hidden"
        />

        {isProcessing && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2.5 text-xs text-amber-900 font-semibold">
            <Loader2 className="w-4 h-4 animate-spin text-[#A6823C]" />
            <span>Optimizando a WebP y subiendo a la nube de Supabase...</span>
          </div>
        )}
      </div>
    </div>
  );
};
