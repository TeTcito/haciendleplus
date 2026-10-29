import React, { useState, useRef } from 'react';
import { Play, Volume2, VolumeX, Maximize2, X, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface MediaDisplayProps {
  mediaType?: 'image' | 'video';
  url: string;
  posterUrl?: string;
  alt?: string;
  className?: string;
  aspectRatio?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  showBadge?: boolean;
  allowFullscreen?: boolean;
}

export const MediaDisplay: React.FC<MediaDisplayProps> = ({
  mediaType = 'image',
  url,
  posterUrl,
  alt = 'Hacienda Le Plus Resort',
  className = '',
  aspectRatio = 'aspect-[16/9]',
  autoPlay = true,
  loop = true,
  muted = true,
  showBadge = true,
  allowFullscreen = true,
}) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(muted);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const isVideo =
    mediaType === 'video' ||
    (typeof url === 'string' && (url.endsWith('.mp4') || url.endsWith('.webm') || url.includes('/videos/')));

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <div className={`relative overflow-hidden group select-none ${aspectRatio} ${className}`}>
        {isVideo ? (
          <>
            <video
              ref={videoRef}
              src={url}
              poster={posterUrl}
              autoPlay={autoPlay}
              loop={loop}
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Badges and sound control */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
              {showBadge && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-[#E2C585] backdrop-blur-md border border-[#C8A45D]/40">
                  <Play className="w-2.5 h-2.5 fill-[#E2C585]" />
                  <span>{t.common.videoBadge}</span>
                </span>
              )}
            </div>

            <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Activar sonido' : 'Silenciar video'}
                className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>

              {allowFullscreen && (
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  aria-label="Ver video en pantalla completa"
                  className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <img
              src={url}
              alt={alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {showBadge && (
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/50 text-[#FAF7F2] backdrop-blur-md border border-white/10">
                  <ImageIcon className="w-2.5 h-2.5" />
                  <span>{t.common.photoBadge}</span>
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Fullscreen Video Modal */}
      {isModalOpen && isVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-black border border-[#C8A45D]/40 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 text-white hover:bg-[#C8A45D] hover:text-[#06150F] transition-all cursor-pointer"
              aria-label="Cerrar reproductor"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="aspect-[16/9] w-full">
              <video
                src={url}
                poster={posterUrl}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
