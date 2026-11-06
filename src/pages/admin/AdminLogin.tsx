import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAdminAccount } from '../../config/adminAccount';
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Loader2,
  KeyRound,
} from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { user, loading: authLoading, signIn } = useAuth();
  const navigate = useNavigate();

  const currentAccount = getAdminAccount();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!authLoading && user) {
    return <Navigate to="/portal-admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg('Por favor ingrese sus credenciales de administrador.');
      return;
    }

    try {
      setSubmitting(true);
      await signIn(email, password);
      navigate('/portal-admin');
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Error al intentar iniciar sesión.';
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const fillCredentials = () => {
    const acc = getAdminAccount();
    setEmail(acc.email);
    setPassword(acc.password);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#06150F] font-sans-ui overflow-hidden">
      {/* =================================================================
          PANEL IZQUIERDO (1/4 DEL ESPACIO - 25%): FORMULARIO COMPACTO
         ================================================================= */}
      <div className="w-full lg:w-1/4 lg:min-w-[360px] lg:max-w-[440px] min-h-screen bg-[#FAF7F2] flex flex-col justify-between p-6 sm:p-8 z-20 shadow-2xl border-r border-[#C8A45D]/30">
        {/* Cabecera: Enlace de retorno */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-[#06150F] text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#A6823C]" />
            <span>Regresar al Sitio Web</span>
          </Link>
        </div>

        {/* Cuerpo Central del Formulario */}
        <div className="my-auto py-6">
          {/* Logo en contenedor oscuro para contraste del texto blanco/dorado */}
          <div className="inline-flex items-center gap-3 mb-6 bg-[#06150F] p-3.5 rounded-2xl shadow-lg border border-[#C8A45D]/40 w-full">
            <img
              src="/logo-leplus.png"
              alt="Hacienda Le Plus"
              className="h-12 w-12 object-contain shrink-0"
            />
            <div className="border-l border-white/15 pl-3">
              <span className="font-serif-luxury font-bold text-base tracking-tight text-white block leading-none">
                Hacienda Le Plus
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E2C585] block mt-1">
                Portal Administrativo
              </span>
            </div>
          </div>

          <div className="mb-5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#06150F]/10 text-[#06150F] text-[11px] font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A6823C]" />
              <span>Acceso Exclusivo Administrador</span>
            </div>
            <h1 className="font-serif-luxury font-bold text-2xl sm:text-3xl text-[#06150F] tracking-tight">
              Iniciar Sesión
            </h1>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Gestione los carruseles de habitaciones, servicios de estadía con video, bodas y grandes eventos corporativos.
            </p>
          </div>

          {/* Alerta de error */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2 text-red-700 text-xs">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span className="font-medium">{errorMsg}</span>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[#06150F] uppercase tracking-wider mb-1.5">
                Correo / Usuario Administrador
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@haciendaleplus.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#06150F] focus:ring-2 focus:ring-[#C8A45D]/25 text-xs sm:text-sm text-[#06150F] transition-all"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#06150F] uppercase tracking-wider mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[#06150F] focus:ring-2 focus:ring-[#C8A45D]/25 text-xs sm:text-sm text-[#06150F] transition-all"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-sans-ui font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer border border-[#C8A45D]/30"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verificando...</span>
                </>
              ) : (
                <>
                  <span>Ingresar al Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Acceso directo de credenciales configuradas */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <div className="bg-white rounded-xl p-3.5 border border-[#C8A45D]/30 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#06150F] flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-[#A6823C]" />
                  Credenciales de Acceso Rápido
                </span>
                <button
                  type="button"
                  onClick={fillCredentials}
                  className="text-[10px] font-bold text-[#06150F] bg-[#E2C585]/30 hover:bg-[#E2C585]/60 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                >
                  Autocompletar
                </button>
              </div>
              <div className="text-[11px] text-slate-600 space-y-0.5 font-mono">
                <div className="truncate">
                  <strong className="text-slate-800">Usuario:</strong> {currentAccount.email}
                </div>
                <div>
                  <strong className="text-slate-800">Clave:</strong> {currentAccount.password}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pie del Panel Izquierdo */}
        <div className="pt-3 border-t border-slate-200 text-center">
          <p className="text-[11px] text-slate-500">
            &copy; {new Date().getFullYear()} Hacienda Le Plus. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* =================================================================
          PANEL DERECHO (75% DEL ESPACIO): IMAGEN DE PORTADA EXCLUSIVA
         ================================================================= */}
      <div className="hidden lg:block lg:flex-1 relative bg-[#06150F] overflow-hidden min-h-screen">
        <img
          src="/images/admin/login-hero.jpg"
          alt="Hacienda Le Plus - Píntag, Quito"
          className="w-full h-full object-cover object-center select-none"
        />
        {/* Gradientes sutiles para realce y profundidad visual */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06150F]/25 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06150F]/40 via-transparent to-black/10 pointer-events-none" />
        
        {/* Sello de alta gama discreto en la esquina inferior */}
        <div className="absolute bottom-6 right-8 z-10 pointer-events-none text-right">
          <span className="font-serif-luxury text-white text-base font-bold tracking-wider drop-shadow-md block">
            Hacienda Le Plus
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#E2C585] font-semibold drop-shadow block">
            Píntag · Quito, Ecuador
          </span>
        </div>
      </div>
    </div>
  );
};
