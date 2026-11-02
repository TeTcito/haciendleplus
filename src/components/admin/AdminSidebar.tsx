import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  BedDouble,
  Waves,
  Heart,
  Sparkles,
  Building2,
  ArrowLeft,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

export type AdminModuleTab =
  | 'profile'
  | 'habitaciones'
  | 'servicios-estadia'
  | 'bodas-propuestas'
  | 'corp-formato-exclusivo'
  | 'corp-grandes-eventos';

interface AdminSidebarProps {
  activeTab: AdminModuleTab;
  setActiveTab: (tab: AdminModuleTab) => void;
  counts: {
    habitaciones: number;
    serviciosEstadia: number;
    bodasPropuestas: number;
    corpFormatoExclusivo: number;
    corpGrandesEventos: number;
  };
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  counts,
}) => {
  const { user, profile, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const displayName = profile?.first_name
    ? `${profile.first_name} ${profile.last_name || ''}`.trim()
    : 'Administración Hacienda Le Plus';

  const menuItems: {
    id: AdminModuleTab;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    badgeColor?: string;
  }[] = [
    {
      id: 'profile',
      label: 'Mi Perfil',
      description: 'Datos personales y clave de acceso',
      icon: User,
    },
    {
      id: 'habitaciones',
      label: 'Habitaciones Empresas y Grupos',
      description: 'Carrusel Hospedaje Empresas y Grupos',
      icon: BedDouble,
      badge: counts.habitaciones,
      badgeColor: 'bg-[#C8A45D] text-[#06150F]',
    },
    {
      id: 'servicios-estadia',
      label: 'Servicio de Estadía y Complementos',
      description: 'Operación Completa + 4 tarjetas (Videos)',
      icon: Waves,
      badge: counts.serviciosEstadia,
      badgeColor: 'bg-emerald-500 text-white',
    },
    {
      id: 'bodas-propuestas',
      label: 'Propuestas Nupciales Destacadas',
      description: 'Carrusel Servicios y Paquetes Nupciales',
      icon: Heart,
      badge: counts.bodasPropuestas,
      badgeColor: 'bg-[#C8A45D] text-[#06150F]',
    },
    {
      id: 'corp-formato-exclusivo',
      label: 'Formato Exclusivo Corporativo',
      description: 'Carrusel de apartados Formato Exclusivo',
      icon: Sparkles,
      badge: counts.corpFormatoExclusivo,
      badgeColor: 'bg-[#C8A45D] text-[#06150F]',
    },
    {
      id: 'corp-grandes-eventos',
      label: 'Grandes Eventos Corporativos',
      description: 'Macroeventos y Encuentros (Carrusel)',
      icon: Building2,
      badge: counts.corpGrandesEventos,
      badgeColor: 'bg-[#C8A45D] text-[#06150F]',
    },
  ];

  const handleSelectTab = (tab: AdminModuleTab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-5 bg-[#06150F] text-[#FAF7F2]">
      <div>
        {/* ========================================================
            CONTENEDOR DEL LOGO CON ALTO CONTRASTE Y BOTÓN REGRESAR
           ======================================================== */}
        <div className="mb-5">
          <div className="bg-[#0A1F17] p-3.5 rounded-2xl shadow-md border border-[#C8A45D]/30 flex items-center justify-between gap-3 group transition-all">
            <div className="flex items-center gap-3">
              <img
                src="/logo-leplus.png"
                alt="Hacienda Le Plus Logo"
                className="h-12 w-12 object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <span className="font-serif-luxury font-bold text-base text-white block leading-tight">
                  Hacienda Le Plus
                </span>
                <span className="text-[10px] text-[#E2C585] uppercase tracking-widest font-bold block">
                  Quito – Píntag
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 px-2 flex items-center justify-between text-xs">
            <span className="font-sans-ui font-black tracking-widest uppercase text-[#C8A45D] text-[10px]">
              PANEL ADMINISTRATIVO
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </span>
          </div>
        </div>

        {/* Tarjeta de identificación del Administrador */}
        <div className="bg-[#0A1F17] rounded-2xl p-3.5 border border-[#C8A45D]/20 mb-5 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C8A45D] to-[#A6823C] text-[#06150F] font-sans-ui font-black text-lg flex items-center justify-center shrink-0 shadow-sm">
            {profile?.first_name ? profile.first_name.charAt(0).toUpperCase() : 'H'}
          </div>
          <div className="min-w-0 flex-1">
            <span className="font-sans-ui font-bold text-xs uppercase text-white truncate block">
              {displayName}
            </span>
            <span className="text-[11px] text-[#FAF7F2]/60 truncate block">
              {user?.email || 'admin@haciendaleplus.com'}
            </span>
          </div>
        </div>

        {/* ========================================================
            MÓDULOS DE NAVEGACIÓN LATERAL
           ======================================================== */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-sans-ui font-bold uppercase tracking-wider text-[#FAF7F2]/50 px-3 mb-2 block">
            Módulos del Sistema
          </span>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectTab(item.id)}
                className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between group cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#13281F] to-[#1A382B] text-white shadow-lg ring-1 ring-[#C8A45D]/50'
                    : 'text-[#FAF7F2]/75 hover:text-white hover:bg-[#0A1F17]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      isActive
                        ? 'bg-[#C8A45D] text-[#06150F] shadow-inner'
                        : 'bg-[#0A1F17] text-[#C8A45D]/80 group-hover:text-[#E2C585] group-hover:bg-[#13281F]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-sans-ui font-bold text-xs tracking-tight block truncate">
                      {item.label}
                    </span>
                    <span
                      className={`text-[10px] truncate block ${
                        isActive ? 'text-[#E2C585]' : 'text-[#FAF7F2]/50'
                      }`}
                    >
                      {item.description}
                    </span>
                  </div>
                </div>

                {item.badge !== undefined ? (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ml-2 ${
                      item.badgeColor || 'bg-[#0A1F17] text-[#FAF7F2]/80'
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive
                        ? 'text-[#C8A45D] translate-x-0.5'
                        : 'text-[#FAF7F2]/40 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          PIE DEL PANEL: REGRESAR AL SITIO WEB & CERRAR SESIÓN
         ======================================================== */}
      <div className="pt-5 border-t border-white/10 space-y-2">
        <Link
          to="/"
          className="w-full p-2.5 rounded-xl bg-[#0A1F17] hover:bg-[#13281F] text-[#FAF7F2]/90 hover:text-white text-xs font-semibold flex items-center justify-between transition-colors border border-[#C8A45D]/30"
        >
          <span className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 text-[#C8A45D]" />
            <span>Regresar al Sitio Web</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-[#C8A45D]/70" />
        </Link>

        <button
          type="button"
          onClick={signOut}
          className="w-full p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-red-500/20 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>

        <p className="text-[10px] text-center text-[#FAF7F2]/40 pt-1">
          Hacienda Le Plus &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Barra superior en móviles (con botón de menú hamburguesa y botón Regresar) */}
      <div className="md:hidden bg-[#06150F] border-b border-[#C8A45D]/20 p-3.5 flex items-center justify-between text-white sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2.5">
          <img src="/logo-leplus.png" alt="Logo" className="h-9 w-9 object-contain" />
          <span className="font-serif-luxury font-bold text-base text-[#E2C585]">
            Admin Le Plus
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="px-2.5 py-1.5 rounded-xl bg-[#13281F] border border-[#C8A45D]/30 text-[#E2C585] text-xs font-bold flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Regresar</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl bg-[#0A1F17] text-white hover:bg-[#13281F]"
            aria-label="Abrir menú"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Drawer móvil */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex">
          <div className="w-76 h-full bg-[#06150F] shadow-2xl overflow-y-auto">
            {sidebarContent}
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Sidebar fijo en Escritorio (A la izquierda) */}
      <aside className="hidden md:flex flex-col w-72 lg:w-80 shrink-0 h-screen sticky top-0 border-r border-[#C8A45D]/20 shadow-xl z-20 overflow-y-auto bg-[#06150F]">
        {sidebarContent}
      </aside>
    </>
  );
};
