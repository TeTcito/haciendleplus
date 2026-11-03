import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, CloudUpload, AlertCircle, ArrowRight } from 'lucide-react';

export type SaveModalState = 'idle' | 'saving' | 'success' | 'error';

export interface AdminSaveModalProps {
  isOpen: boolean;
  state: SaveModalState;
  savingTitle?: string;
  savingMessage?: string;
  successTitle?: string;
  successMessage?: string;
  errorMessage?: string;
  onClose: () => void;
  onSuccessComplete?: () => void;
  autoCloseDelay?: number; // ms to auto close on success (default 1700ms)
}

export const AdminSaveModal: React.FC<AdminSaveModalProps> = ({
  isOpen,
  state,
  savingTitle = 'Guardando Cambios...',
  savingMessage = 'Sincronizando información y multimedia en la base de datos de Hacienda Le Plus...',
  successTitle = '¡Guardado con Éxito!',
  successMessage = 'Los cambios se han actualizado y sincronizado correctamente en la web.',
  errorMessage = 'Ocurrió un error al intentar guardar los cambios. Intente nuevamente.',
  onClose,
  onSuccessComplete,
  autoCloseDelay = 1700,
}) => {
  const [progress, setProgress] = useState(0);

  // Efecto de progreso simulado durante 'saving'
  useEffect(() => {
    if (state === 'saving') {
      setProgress(15);
      const timer1 = setTimeout(() => setProgress(45), 250);
      const timer2 = setTimeout(() => setProgress(85), 550);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else if (state === 'success') {
      setProgress(100);
    } else {
      setProgress(0);
    }
  }, [state]);

  // Cierre automático tras éxito
  useEffect(() => {
    if (isOpen && state === 'success') {
      const timer = setTimeout(() => {
        if (onSuccessComplete) {
          onSuccessComplete();
        } else {
          onClose();
        }
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [isOpen, state, autoCloseDelay, onClose, onSuccessComplete]);

  const handleConfirmSuccess = () => {
    if (onSuccessComplete) {
      onSuccessComplete();
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && state !== 'idle' && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Fondo oscuro con desenfoque de cristal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#06150F]/80 backdrop-blur-md"
            onClick={() => {
              if (state === 'success' || state === 'error') {
                handleConfirmSuccess();
              }
            }}
          />

          {/* Ventana Emergente */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative w-full max-w-sm sm:max-w-md bg-[#081812] rounded-3xl border border-[#C8A45D]/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden p-6 sm:p-8 text-center text-white"
          >
            {/* Resplandor decorativo de fondo */}
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 blur-3xl pointer-events-none rounded-full transition-colors duration-500 ${
                state === 'success'
                  ? 'bg-emerald-500/20'
                  : state === 'error'
                  ? 'bg-red-500/20'
                  : 'bg-[#C8A45D]/20'
              }`}
            />

            {/* Línea superior dorada / esmeralda */}
            <div
              className={`absolute top-0 left-0 right-0 h-1.5 transition-colors duration-500 ${
                state === 'success'
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-300 to-emerald-500'
                  : state === 'error'
                  ? 'bg-gradient-to-r from-red-500 via-rose-300 to-red-500'
                  : 'bg-gradient-to-r from-[#C8A45D] via-[#E2C585] to-[#8A6B2D]'
              }`}
            />

            {/* ================= ESTADO 1: GUARDANDO ================= */}
            {state === 'saving' && (
              <div className="relative py-2 space-y-5">
                {/* Animación de carga central */}
                <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
                  {/* Anillo exterior rotatorio con gradiente */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#E2C585] border-r-[#C8A45D]/60"
                  />
                  {/* Anillo de pulso suave */}
                  <motion.div
                    animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="absolute inset-1.5 rounded-full bg-[#C8A45D]/10 border border-[#C8A45D]/30"
                  />
                  {/* Icono central de nube / guardado */}
                  <motion.div
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    className="relative z-10 w-12 h-12 rounded-2xl bg-[#06150F] border border-[#C8A45D]/50 flex items-center justify-center text-[#E2C585] shadow-inner"
                  >
                    <CloudUpload className="w-6 h-6 animate-pulse" />
                  </motion.div>
                </div>

                {/* Títulos y descripción */}
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A45D]/15 text-[#E2C585] text-[11px] font-bold uppercase tracking-wider">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Sincronizando</span>
                  </div>
                  <h3 className="font-serif-luxury font-bold text-xl sm:text-2xl text-white tracking-tight">
                    {savingTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xs mx-auto leading-relaxed">
                    {savingMessage}
                  </p>
                </div>

                {/* Barra de progreso visual */}
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden p-0.5">
                  <motion.div
                    initial={{ width: '10%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-[#C8A45D] via-[#E2C585] to-[#C8A45D]"
                  />
                </div>
              </div>
            )}

            {/* ================= ESTADO 2: ÉXITO (OK) ================= */}
            {state === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="relative py-2 space-y-5"
              >
                {/* Insignia Checkmark con rebote suave y resplandor */}
                <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.25, 1] }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-[0_0_35px_rgba(16,185,129,0.4)]"
                  >
                    <Check className="w-10 h-10 stroke-[3]" />
                  </motion.div>
                </div>

                {/* Títulos de confirmación */}
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                    <span>✓ Sincronización Completa</span>
                  </div>
                  <h3 className="font-serif-luxury font-bold text-2xl sm:text-3xl text-white tracking-tight">
                    {successTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 max-w-xs mx-auto leading-relaxed">
                    {successMessage}
                  </p>
                </div>

                {/* Botón Aceptar y Continuar */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleConfirmSuccess}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C8A45D] via-[#E2C585] to-[#C8A45D] hover:brightness-110 text-[#06150F] font-sans-ui font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all mx-auto cursor-pointer"
                  >
                    <span>Aceptar y Continuar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Cuenta atrás sutil */}
                <p className="text-[10px] text-slate-400">
                  Regresando automáticamente al catálogo...
                </p>
              </motion.div>
            )}

            {/* ================= ESTADO 3: ERROR ================= */}
            {state === 'error' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative py-2 space-y-5"
              >
                <div className="mx-auto w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-400 flex items-center justify-center text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.35)]">
                  <AlertCircle className="w-10 h-10" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif-luxury font-bold text-2xl text-white">
                    Error al Guardar
                  </h3>
                  <p className="text-xs sm:text-sm text-red-200/90 max-w-xs mx-auto leading-relaxed">
                    {errorMessage}
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
