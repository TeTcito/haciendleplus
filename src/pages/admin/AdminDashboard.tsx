import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../../context/CMSContext';
import { AdminSidebar, AdminModuleTab } from '../../components/admin/AdminSidebar';
import { AdminProfileSection } from '../../components/admin/AdminProfileSection';
import { AdminMediaUploader } from '../../components/admin/AdminMediaUploader';
import {
  CabinRoom,
  LodgingFeaturedBanner,
  LodgingServiceCard,
  WeddingProposalCard,
  ServicePackage,
  CorporateHighlightItem,
} from '../../types/cms';
import {
  ArrowLeft,
  ExternalLink,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  X,
  Save,
  BedDouble,
  Waves,
  Heart,
  Sparkles,
  Building2,
  Video,
  Image as ImageIcon,
  DollarSign,
  Eye,
  EyeOff,
  Users,
  Bath,
  RotateCcw,
  Play,
  FileText,
  Loader2,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    cabins,
    addCabin,
    updateCabin,
    deleteCabin,
    lodgingHeroBanner,
    updateLodgingHeroBanner,
    lodgingServices,
    addLodgingService,
    updateLodgingService,
    deleteLodgingService,
    weddingProposals,
    addWeddingProposal,
    updateWeddingProposal,
    deleteWeddingProposal,
    corporateExclusiveFormats,
    addCorporateExclusiveFormat,
    updateCorporateExclusiveFormat,
    deleteCorporateExclusiveFormat,
    corporateHighlights,
    addCorporateHighlight,
    updateCorporateHighlight,
    deleteCorporateHighlight,
  } = useCMS();

  const [activeTab, setActiveTab] = useState<AdminModuleTab>('habitaciones');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3800);
  };

  // =========================================================================
  // ESTADOS DE EDICIÓN POR MÓDULO (INICIALIZADOS POR DEFECTO PARA QUE LOS
  // 3 BLOQUES DE EDICIÓN ESTÉN SIEMPRE VISIBLES DE INMEDIATO A 15PX)
  // =========================================================================

  // ESTADO GLOBAL DE SUBIDA MULTIMEDIA (DESACTIVA BOTONES MIENTRAS SUBE A LA NUBE)
  const [isMediaUploading, setIsMediaUploading] = useState(false);

  // MÓDULO 2: HABITACIONES EMPRESAS Y GRUPOS
  const [editingCabin, setEditingCabin] = useState<CabinRoom | null>(null);
  const [isCreatingCabin, setIsCreatingCabin] = useState(false);

  const activeCabin: CabinRoom | null =
    editingCabin || (cabins && cabins.length > 0 ? cabins[0] : null);

  // MÓDULO 3: SERVICIO DE ESTADÍA Y COMPLEMENTOS
  const [serviciosTarget, setServiciosTarget] = useState<'principal' | 'servicios'>('principal');
  const [editingHeroBanner, setEditingHeroBanner] = useState<LodgingFeaturedBanner | null>(null);
  const [editingServiceCard, setEditingServiceCard] = useState<LodgingServiceCard | null>(null);
  const [isCreatingServiceCard, setIsCreatingServiceCard] = useState(false);

  const activeHeroBanner: LodgingFeaturedBanner = editingHeroBanner || lodgingHeroBanner;
  const activeServiceCard: LodgingServiceCard | null =
    editingServiceCard || (lodgingServices && lodgingServices.length > 0 ? lodgingServices[0] : null);

  // MÓDULO 4: PROPUESTAS NUPCIALES DESTACADAS (CARRUSEL BODAS)
  const [editingWedding, setEditingWedding] = useState<WeddingProposalCard | null>(null);
  const [isCreatingWedding, setIsCreatingWedding] = useState(false);

  const activeWedding: WeddingProposalCard | null =
    editingWedding || (weddingProposals && weddingProposals.length > 0 ? weddingProposals[0] : null);

  // MÓDULO 5: FORMATO EXCLUSIVO CORPORATIVO (CARRUSEL 3+ APARTADOS)
  const [editingExclusive, setEditingExclusive] = useState<ServicePackage | null>(null);
  const [isCreatingExclusive, setIsCreatingExclusive] = useState(false);

  const activeExclusive: ServicePackage | null =
    editingExclusive ||
    (corporateExclusiveFormats && corporateExclusiveFormats.length > 0
      ? corporateExclusiveFormats[0]
      : null);

  // MÓDULO 6: GRANDES EVENTOS CORPORATIVOS (MACROEVENTOS Y ENCUENTROS)
  const [editingCorpHighlight, setEditingCorpHighlight] = useState<CorporateHighlightItem | null>(
    null
  );
  const [isCreatingCorpHighlight, setIsCreatingCorpHighlight] = useState(false);

  const activeCorpHighlight: CorporateHighlightItem | null =
    editingCorpHighlight ||
    (corporateHighlights && corporateHighlights.length > 0 ? corporateHighlights[0] : null);

  // =========================================================================
  // HANDLERS MÓDULO 2: HABITACIONES EMPRESAS Y GRUPOS
  // =========================================================================
  const handleStartNewCabin = () => {
    setIsCreatingCabin(true);
    setEditingCabin({
      id: `cabin-${Date.now()}`,
      name: '',
      type: 'Suite Matrimonial',
      capacity: 'Ejecutivos, Pareja o 3 Pax',
      maxGuests: 3,
      beds: '1 Cama Matrimonial + 1 Cama Adicional',
      bathrooms: 1,
      pricePerNight: 115,
      showPrice: true,
      weekendNote: 'Alimentación diaria, Wi-Fi fibra óptica y parqueadero privado incluidos',
      description:
        'Habitación equipada con balcón privado, Wi-Fi de fibra óptica, baño privado con agua caliente y acceso a áreas sociales.',
      amenities: [
        'Wi-Fi de fibra óptica',
        'Baño privado con agua caliente',
        'Parqueadero privado seguro',
        'Acceso a piscina y restaurante',
      ],
      image: '/images/hacienda/suite-1-leplus.png',
      videoUrl: '',
      mediaType: 'image',
      available: true,
      featuredInHome: true,
    });
  };

  const handleSaveCabin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCabin || !activeCabin.name.trim()) return;
    if (isMediaUploading) {
      showToast('⏳ Espere un momento mientras termina de subirse la multimedia a la nube.');
      return;
    }
    if (isCreatingCabin) {
      const { id: _unusedId, ...rest } = activeCabin;
      void _unusedId;
      addCabin(rest);
      showToast('Nueva tarjeta agregada al carrusel de Habitaciones para Empresas y Grupos.');
    } else {
      updateCabin(activeCabin);
      showToast('Tarjeta de habitación actualizada correctamente.');
    }
    setIsCreatingCabin(false);
  };

  // =========================================================================
  // HANDLERS MÓDULO 3: SERVICIO DE ESTADÍA Y COMPLEMENTOS
  // =========================================================================
  const handleSaveHeroBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeHeroBanner) return;
    if (isMediaUploading) {
      showToast('⏳ Espere un momento mientras termina de subirse la multimedia a la nube.');
      return;
    }
    updateLodgingHeroBanner(activeHeroBanner);
    showToast('Tarjeta Principal "Operación Completa para Larga Estadía" actualizada.');
  };

  const handleStartNewServiceCard = () => {
    setServiciosTarget('servicios');
    setIsCreatingServiceCard(true);
    setEditingServiceCard({
      id: `lodging-srv-${Date.now()}`,
      title: '',
      badge: 'Complemento',
      badgeClass: 'bg-[#0F1C15]/80 text-white border border-white/15',
      description: '',
      ctaText: 'Solicitar Información →',
      image: '/images/hacienda/piscina-cubierta-climatizada.png',
      videoUrl: '',
      mediaType: 'image',
      serviceType: 'hospedaje',
      itemName: 'Servicio de Estadía — Hacienda Le Plus',
    });
  };

  const handleSaveServiceCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeServiceCard || !activeServiceCard.title.trim()) return;
    if (isMediaUploading) {
      showToast('⏳ Espere un momento mientras termina de subirse la multimedia a la nube.');
      return;
    }
    if (isCreatingServiceCard) {
      const { id: _unusedId, ...rest } = activeServiceCard;
      void _unusedId;
      addLodgingService(rest);
      showToast('Nueva tarjeta agregada a Servicio de Estadía y Complementos.');
    } else {
      updateLodgingService(activeServiceCard);
      showToast('Tarjeta de Servicio de Estadía actualizada.');
    }
    setIsCreatingServiceCard(false);
  };

  // =========================================================================
  // HANDLERS MÓDULO 4: PROPUESTAS NUPCIALES DESTACADAS
  // =========================================================================
  const handleStartNewWedding = () => {
    setIsCreatingWedding(true);
    setEditingWedding({
      id: `wed-prop-${Date.now()}`,
      title: '',
      subtitle: '',
      badge: 'Paquete Nupcial',
      badgeClass: 'bg-[#0F1C15]/85 text-[#E2C585]',
      image: '/images/hacienda/boda-1.png',
      videoUrl: '',
      mediaType: 'image',
      specs: [
        { label: 'De 60 a 350 invitados', icon: 'users' },
        { label: 'Jardines y salón principal incluidos', icon: 'tent' },
        { label: 'Gastronomía nupcial de autor', icon: 'utensils' },
      ],
      price: '$70',
      unit: '/ persona · ref.',
      showPrice: true,
      serviceType: 'bodas',
    });
  };

  const handleSaveWedding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeWedding || !activeWedding.title.trim()) return;
    if (isMediaUploading) {
      showToast('⏳ Espere un momento mientras termina de subirse la multimedia a la nube.');
      return;
    }
    if (isCreatingWedding) {
      const { id: _unusedId, ...rest } = activeWedding;
      void _unusedId;
      addWeddingProposal(rest);
      showToast('Nueva propuesta agregada al carrusel de Bodas y Celebraciones.');
    } else {
      updateWeddingProposal(activeWedding);
      showToast('✓ Propuesta nupcial guardada y sincronizada en la base de datos y la web.');
    }
    setIsCreatingWedding(false);
  };

  // =========================================================================
  // HANDLERS MÓDULO 5: FORMATO EXCLUSIVO CORPORATIVO
  // =========================================================================
  const handleStartNewExclusive = () => {
    setIsCreatingExclusive(true);
    setEditingExclusive({
      id: `corp-excl-${Date.now()}`,
      category: 'corporativo',
      title: '',
      subtitle: 'Formato Exclusivo Empresarial',
      priceLabel: 'Desde $45 USD',
      priceValue: 45,
      unit: 'por participante (según requerimientos)',
      capacity: 'De 20 a 350 participantes',
      setupInfo: 'Auditorio, Escuela, Imperial o Jardines al Aire Libre',
      description: '',
      inclusions: [
        'Salón corporativo y jardines privados',
        'Audio, proyección HD y Wi-Fi de fibra óptica',
        'Coffee break y almuerzo ejecutivo',
        'Parqueadero privado seguro',
      ],
      highlightBadge: 'Formato Exclusivo',
      image: '/images/hacienda/capacitaciones-2.png',
      videoUrl: '',
      mediaType: 'image',
      showPrice: true,
      whatsappIntent: 'Quiero cotizar un evento corporativo en Hacienda Le Plus.',
      featuredInHome: true,
    });
  };

  const handleSaveExclusive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeExclusive || !activeExclusive.title.trim()) return;
    if (isMediaUploading) {
      showToast('⏳ Espere un momento mientras termina de subirse la multimedia a la nube.');
      return;
    }
    const updated: ServicePackage = {
      ...activeExclusive,
      priceLabel: `Desde $${activeExclusive.priceValue} USD`,
    };
    if (isCreatingExclusive) {
      const { id: _unusedId, ...rest } = updated;
      void _unusedId;
      addCorporateExclusiveFormat(rest);
      showToast('Nuevo apartado agregado al carrusel de Formato Exclusivo.');
    } else {
      updateCorporateExclusiveFormat(updated);
      showToast('Apartado de Formato Exclusivo actualizado.');
    }
    setIsCreatingExclusive(false);
  };

  // =========================================================================
  // HANDLERS MÓDULO 6: GRANDES EVENTOS CORPORATIVOS
  // =========================================================================
  const handleStartNewCorpHighlight = () => {
    setIsCreatingCorpHighlight(true);
    setEditingCorpHighlight({
      id: `corp-macro-${Date.now()}`,
      title: '',
      subtitle: '',
      highlightMetric: 'Hasta 350+ pax',
      image: '/images/hacienda/eventos-1.png',
      videoUrl: '',
      mediaType: 'image',
      whatsappItemName: 'Evento Corporativo — Hacienda Le Plus',
    });
  };

  const handleSaveCorpHighlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCorpHighlight || !activeCorpHighlight.title.trim()) return;
    if (isMediaUploading) {
      showToast('⏳ Espere un momento mientras termina de subirse la multimedia a la nube.');
      return;
    }
    if (isCreatingCorpHighlight) {
      const { id: _unusedId, ...rest } = activeCorpHighlight;
      void _unusedId;
      addCorporateHighlight(rest);
      showToast('Nueva tarjeta agregada al carrusel de Grandes Eventos Corporativos.');
    } else {
      updateCorporateHighlight(activeCorpHighlight);
      showToast('Tarjeta de Grandes Eventos Corporativos actualizada.');
    }
    setIsCreatingCorpHighlight(false);
  };

  // Helper para enlace directo de vista previa según el módulo activo
  const getModulePreviewRoute = (): { path: string; label: string } => {
    switch (activeTab) {
      case 'habitaciones':
      case 'servicios-estadia':
        return { path: '/hospedaje', label: 'Ver Página de Hospedaje' };
      case 'bodas-propuestas':
        return { path: '/bodas', label: 'Ver Página de Bodas' };
      case 'corp-formato-exclusivo':
      case 'corp-grandes-eventos':
        return { path: '/corporativo', label: 'Ver Página Corporativa' };
      default:
        return { path: '/', label: 'Ir al Inicio' };
    }
  };

  const previewLink = getModulePreviewRoute();

  return (
    <div className="h-screen bg-[#F5F2EB] flex flex-col md:flex-row font-sans-ui text-[#06150F] overflow-hidden">
      {/* =================================================================
          PANEL LATERAL IZQUIERDO (SIDEBAR)
         ================================================================= */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsCreatingCabin(false);
          setIsCreatingServiceCard(false);
          setIsCreatingWedding(false);
          setIsCreatingExclusive(false);
          setIsCreatingCorpHighlight(false);
        }}
        counts={{
          habitaciones: cabins.length,
          serviciosEstadia: 1 + lodgingServices.length,
          bodasPropuestas: weddingProposals.length,
          corpFormatoExclusivo: corporateExclusiveFormats.length,
          corpGrandesEventos: corporateHighlights.length,
        }}
      />

      {/* =================================================================
          PANEL DERECHO: BARRA SUPERIOR FIJA + CONTENIDO SCROLLABLE INDEPENDIENTE
         ================================================================= */}
      <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
        {/* BARRA SUPERIOR FIJA (NUNCA SE MUEVE AL HACER SCROLL) */}
        <header className="shrink-0 z-20 bg-[#06150F] text-[#FAF7F2] border-b border-[#C8A45D]/30 px-5 sm:px-8 py-3.5 shadow-md flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#E2C585] block">
                Administración Hacienda Le Plus · Sincronización Activa
              </span>
              <span className="text-xs text-[#FAF7F2]/70 hidden sm:block">
                Todos los cambios se guardan inmediatamente en el sitio web y en la nube.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to={previewLink.path}
              className="px-3.5 py-2 rounded-xl bg-[#13281F] hover:bg-[#1C3A2D] text-[#E2C585] border border-[#C8A45D]/35 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{previewLink.label}</span>
            </Link>

            <Link
              to="/"
              className="px-4 py-2 rounded-xl bg-[#C8A45D] hover:bg-[#E2C585] text-[#06150F] font-sans-ui font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Regresar al Sitio Web</span>
            </Link>
          </div>
        </header>

        {/* NOTIFICACIÓN FLOTANTE DE ÉXITO (NO DESPLAZA EL CONTENIDO) */}
        {toastMsg && (
          <div className="fixed bottom-5 right-5 z-50 max-w-md p-4 rounded-2xl bg-[#06150F] text-white border border-[#C8A45D] shadow-xl flex items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#FAF7F2]">{toastMsg}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMsg(null)}
              className="text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* CONTENIDO DE ABAJO SCROLLABLE (SOLO ESTE CONTENEDOR SE MUEVE AL HACER SCROLL) */}
        <main className="flex-1 overflow-y-auto min-w-0 flex flex-col justify-between">
          {/* ===============================================================
              CONTENEDOR DEL MÓDULO ACTIVO:
              COMIENZA EXACTAMENTE A 15PX DEL HEADER Y 15PX DEL PANEL IZQUIERDO
             =============================================================== */}
          <div className="p-[15px] space-y-[15px]">
            {/* ===============================================================
                MÓDULO 1: MI PERFIL
               =============================================================== */}
            {activeTab === 'profile' && <AdminProfileSection />}

            {/* ===============================================================
                MÓDULO 2: CARRUSEL HABITACIONES PARA EMPRESAS Y GRUPOS
               =============================================================== */}
                        {activeTab === 'habitaciones' && (
              <div className="space-y-[15px]">
                {!editingCabin && !isCreatingCabin ? (
                  /* ================= ESTANTE GENERAL DE HABITACIONES ================= */
                  <div className="space-y-[15px]">
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#C8A45D]/15 text-[#8A6B2D] text-[11px] font-bold uppercase tracking-wider mb-1.5">
                          <BedDouble className="w-3.5 h-3.5" />
                          <span>Página: Hospedaje Empresas y Grupos · Carrusel Habitaciones</span>
                        </div>
                        <h2 className="font-serif-luxury font-bold text-xl sm:text-2xl text-[#06150F]">
                          Habitaciones para Empresas y Grupos ({cabins.length})
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Seleccione una tarjeta para editar o agregue una nueva habitación al carrusel.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleStartNewCabin}
                        className="px-4 py-2.5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Nueva Habitación</span>
                      </button>
                    </div>

                    {/* Grilla de Tarjetas en Estante General */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[15px]">
                      {cabins.map((cabin, idx) => (
                        <div
                          key={cabin.id}
                          className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group"
                        >
                          <div>
                            <div className="relative aspect-square overflow-hidden bg-[#06150F]">
                              {cabin.mediaType === 'video' && cabin.videoUrl ? (
                                <video
                                  key={cabin.videoUrl}
                                  src={cabin.videoUrl}
                                  poster={cabin.image}
                                  muted
                                  loop
                                  autoPlay
                                  playsInline
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <img
                                  src={cabin.image}
                                  alt={cabin.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              )}
                              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                                <span className="px-2 py-0.5 rounded-full bg-[#06150F]/85 text-[#E2C585] text-[10px] font-bold">
                                  #{idx + 1} · {cabin.type}
                                </span>
                                {cabin.mediaType === 'video' && (
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1">
                                    <Video className="w-3 h-3" /> Video
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="p-4 space-y-2">
                              <h3 className="font-serif-luxury font-bold text-base text-[#06150F] leading-snug line-clamp-1">
                                {cabin.name}
                              </h3>
                              <div className="space-y-1 text-xs text-slate-600 border-t border-slate-100 pt-2">
                                <div className="flex items-center gap-1.5 truncate">
                                  <Users className="w-3.5 h-3.5 text-[#A6823C] shrink-0" />
                                  <span className="truncate">{cabin.capacity}</span>
                                </div>
                                <div className="flex items-center gap-1.5 truncate">
                                  <BedDouble className="w-3.5 h-3.5 text-[#A6823C] shrink-0" />
                                  <span className="truncate">{cabin.beds}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="px-4 py-3 bg-[#FAF7F2] border-t border-slate-200/80 flex items-center justify-between">
                            <div>
                              {cabin.showPrice !== false ? (
                                <span className="font-serif-luxury font-bold text-lg text-[#06150F]">
                                  ${cabin.pricePerNight}
                                  <span className="text-[10px] font-sans-ui font-normal text-slate-500">
                                    {' '}
                                    / ref.
                                  </span>
                                </span>
                              ) : (
                                <span className="text-xs font-semibold text-slate-400 italic">
                                  Oculto
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingCabin(cabin);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="px-2.5 py-1 rounded-lg bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <Pencil className="w-3 h-3" />
                                <span>Editar</span>
                              </button>
                              {cabins.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        `¿Está seguro de eliminar "${cabin.name}" del carrusel?`
                                      )
                                    ) {
                                      deleteCabin(cabin.id);
                                      showToast('Tarjeta eliminada del carrusel.');
                                    }
                                  }}
                                  className="p-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                                  title="Eliminar tarjeta"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* ================= EDICIÓN DE HABITACIÓN (3 BLOQUES INCRUSTADOS EN EL LIENZO) ================= */
                  <form onSubmit={handleSaveCabin} className="space-y-[15px] animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-300/80">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCreatingCabin(false);
                            setEditingCabin(null);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#06150F] text-xs font-bold flex items-center gap-1.5 border border-slate-300 shadow-2xs transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Volver a las tarjetas</span>
                        </button>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#06150F]">
                          {isCreatingCabin
                            ? 'Creando Nueva Tarjeta de Habitación'
                            : `Editando: ${editingCabin?.name || 'Habitación'}`}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px] items-stretch">
                      {/* COLUMNA 1: INFORMACIÓN DE LA TARJETA */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-300/80">
                          <FileText className="w-4 h-4 text-[#A6823C]" />
                          <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F]">
                            1. Datos de la Habitación
                          </h3>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Título de la Tarjeta <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={editingCabin?.name || ''}
                            onChange={(e) =>
                              editingCabin && setEditingCabin({ ...editingCabin, name: e.target.value })
                            }
                            placeholder="Ej: Suite Ejecutiva Le Plus No. 1"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-[#06150F] focus:outline-none focus:border-[#06150F]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                              Etiqueta (Badge)
                            </label>
                            <input
                              type="text"
                              value={editingCabin?.type || ''}
                              onChange={(e) =>
                                editingCabin && setEditingCabin({ ...editingCabin, type: e.target.value })
                              }
                              placeholder="Suite Matrimonial"
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-[#06150F]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                              Baños Privados
                            </label>
                            <input
                              type="number"
                              min={1}
                              value={editingCabin?.bathrooms || 1}
                              onChange={(e) =>
                                editingCabin && setEditingCabin({
                                  ...editingCabin,
                                  bathrooms: Number(e.target.value) || 1,
                                })
                              }
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-[#06150F]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Capacidad (Texto en Tarjeta)
                          </label>
                          <input
                            type="text"
                            value={editingCabin?.capacity || ''}
                            onChange={(e) =>
                              editingCabin && setEditingCabin({ ...editingCabin, capacity: e.target.value })
                            }
                            placeholder="Ej: Ejecutivos, Líderes o 1 a 3 Pax"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs text-[#06150F]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Distribución de Camas
                          </label>
                          <input
                            type="text"
                            value={editingCabin?.beds || ''}
                            onChange={(e) =>
                              editingCabin && setEditingCabin({ ...editingCabin, beds: e.target.value })
                            }
                            placeholder="Ej: 1 Cama Matrimonial + 1 Cama Adicional"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs text-[#06150F]"
                          />
                        </div>

                        {/* DESCRIPCIÓN COMERCIAL: 10 LÍNEAS VISUALES CON SCROLL */}
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Descripción Comercial (10 líneas visuales)
                          </label>
                          <textarea
                            rows={10}
                            value={editingCabin?.description || ''}
                            onChange={(e) =>
                              editingCabin && setEditingCabin({ ...editingCabin, description: e.target.value })
                            }
                            placeholder="Describa los atributos, beneficios y confort de la habitación..."
                            className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-white text-xs text-[#06150F] leading-relaxed min-h-[220px] max-h-[300px] overflow-y-auto focus:outline-none focus:border-[#C8A45D]"
                          />
                        </div>
                      </div>

                      {/* COLUMNA 2: MULTIMEDIA WEBP / VIDEO (VISTA PREVIA LOCAL) */}
                      {editingCabin && (
                        <div className="flex flex-col justify-between">
                          <AdminMediaUploader
                            imageUrl={editingCabin.image}
                            onImageChange={(url) => {
                              setEditingCabin({ ...editingCabin, image: url, mediaType: 'image' });
                            }}
                            videoUrl={editingCabin.videoUrl || ''}
                            onVideoChange={(url) => {
                              setEditingCabin({ ...editingCabin, videoUrl: url, mediaType: 'video' });
                            }}
                            mediaType={editingCabin.mediaType || 'image'}
                            onMediaTypeChange={(type) => {
                              setEditingCabin({ ...editingCabin, mediaType: type });
                            }}
                            allowVideo={true}
                            onProcessingChange={setIsMediaUploading}
                            label="2. Multimedia de la Habitación (1:1)"
                          />
                        </div>
                      )}

                      {/* COLUMNA 3: PRECIO Y PUBLICACIÓN */}
                      <div className="space-y-4 flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 pb-2 border-b border-slate-300/80">
                            <DollarSign className="w-4 h-4 text-[#A6823C]" />
                            <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F]">
                              3. Tarifa y Publicación
                            </h3>
                          </div>

                          <div className="bg-white/80 p-4 rounded-xl border border-slate-300 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#06150F]">
                                Mostrar Precio en la Tarjeta
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  editingCabin && setEditingCabin({
                                    ...editingCabin,
                                    showPrice: editingCabin.showPrice === false ? true : false,
                                  })
                                }
                                className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                                  editingCabin?.showPrice !== false
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-slate-200 text-slate-600'
                                }`}
                              >
                                {editingCabin?.showPrice !== false ? (
                                  <>
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>Visible</span>
                                  </>
                                ) : (
                                  <>
                                    <EyeOff className="w-3.5 h-3.5" />
                                    <span>Oculto</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                                Tarifa Referencial ($ USD)
                              </label>
                              <div className="relative">
                                <span className="absolute left-3.5 top-2.5 font-bold text-slate-400">
                                  $
                                </span>
                                <input
                                  type="number"
                                  min={0}
                                  value={editingCabin?.pricePerNight || 0}
                                  onChange={(e) =>
                                    editingCabin && setEditingCabin({
                                      ...editingCabin,
                                      pricePerNight: Number(e.target.value) || 0,
                                    })
                                  }
                                  className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-300 text-base font-bold text-[#06150F] bg-white"
                                />
                              </div>
                              <span className="text-[11px] text-slate-400 block mt-1">
                                Se mostrará como: <strong>${editingCabin?.pricePerNight}</strong> / ref.
                              </span>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                              Nota de Servicios Inclusiones
                            </label>
                            <textarea
                              rows={2}
                              value={editingCabin?.weekendNote || ''}
                              onChange={(e) =>
                                editingCabin && setEditingCabin({
                                  ...editingCabin,
                                  weekendNote: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-[#06150F] resize-none"
                            />
                          </div>

                          <div className="pt-2 border-t border-slate-300/80 space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={editingCabin?.available !== false}
                                onChange={(e) =>
                                  editingCabin && setEditingCabin({
                                    ...editingCabin,
                                    available: e.target.checked,
                                  })
                                }
                                className="w-4 h-4 rounded text-[#06150F] accent-[#06150F]"
                              />
                              <span className="text-xs text-[#06150F] font-semibold">
                                Habitación disponible para reservas
                              </span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={editingCabin?.featuredInHome !== false}
                                onChange={(e) =>
                                  editingCabin && setEditingCabin({
                                    ...editingCabin,
                                    featuredInHome: e.target.checked,
                                  })
                                }
                                className="w-4 h-4 rounded text-[#06150F] accent-[#06150F]"
                              />
                              <span className="text-xs text-[#06150F] font-semibold">
                                Destacada en Carrusel Principal
                              </span>
                            </label>
                          </div>
                        </div>

                        {/* Botón de Guardar en la columna 3 */}
                        <div className="pt-4 border-t border-slate-300/80 space-y-2">
                          <button
                            type="submit"
                            disabled={isMediaUploading}
                            className="w-full py-3.5 px-5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-sans-ui font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Save className="w-4 h-4" />
                            <span>
                              {isCreatingCabin
                                ? 'Guardar Nueva Habitación'
                                : 'Guardar Cambios de Habitación'}
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsCreatingCabin(false);
                              setEditingCabin(null);
                            }}
                            className="w-full py-2 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition-colors cursor-pointer"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* ===============================================================
                MÓDULO 3: SERVICIO DE ESTADÍA Y COMPLEMENTOS (VIDEOS)
               =============================================================== */}
                        {activeTab === 'servicios-estadia' && (
              <div className="space-y-[15px]">
                {!editingHeroBanner && !editingServiceCard && !isCreatingServiceCard ? (
                  /* ================= ESTANTE GENERAL DE SERVICIOS Y COMPLEMENTOS ================= */
                  <div className="space-y-[15px]">
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#C8A45D]/15 text-[#8A6B2D] text-[11px] font-bold uppercase tracking-wider mb-1.5">
                          <Waves className="w-3.5 h-3.5" />
                          <span>Página: Hospedaje Empresas y Grupos · Servicio de Estadía y Complementos</span>
                        </div>
                        <h2 className="font-serif-luxury font-bold text-xl sm:text-2xl text-[#06150F]">
                          Servicio de Estadía y Complementos (1 Tarjeta Principal + {lodgingServices.length} Servicios)
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Edite la tarjeta principal con video o las tarjetas complementarias de servicios.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleStartNewServiceCard}
                        className="px-4 py-2.5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Nueva Tarjeta de Servicio</span>
                      </button>
                    </div>

                    {/* SECCIÓN A: TARJETA PRINCIPAL GRANDE CON VIDEO */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#06150F] flex items-center gap-2">
                          <Video className="w-4 h-4 text-[#A6823C]" />
                          Tarjeta Principal Grande: Operación Completa para Larga Estadía
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingHeroBanner(lodgingHeroBanner);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span>Editar Tarjeta Principal</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        <div className="md:col-span-5 relative aspect-video rounded-xl overflow-hidden bg-[#06150F] shadow-sm">
                          {lodgingHeroBanner.mediaType === 'video' && lodgingHeroBanner.videoUrl ? (
                            <video
                              key={lodgingHeroBanner.videoUrl}
                              src={lodgingHeroBanner.videoUrl}
                              poster={lodgingHeroBanner.image}
                              muted
                              loop
                              autoPlay
                              playsInline
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <img
                              src={lodgingHeroBanner.image}
                              alt={lodgingHeroBanner.titleLine1}
                              className="w-full h-full object-cover"
                            />
                          )}
                          <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/70 text-[#E2C585] text-[10px] font-bold">
                            {lodgingHeroBanner.mediaType === 'video' ? 'Video Activo' : 'Imagen'}
                          </span>
                        </div>
                        <div className="md:col-span-7 space-y-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#A6823C] block">
                            {lodgingHeroBanner.overline}
                          </span>
                          <h3 className="font-serif-luxury font-bold text-xl text-[#06150F]">
                            {lodgingHeroBanner.titleLine1}{' '}
                            <span className="italic font-light text-[#A6823C]">
                              {lodgingHeroBanner.titleLine2}
                            </span>
                          </h3>
                          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                            {lodgingHeroBanner.description}
                          </p>
                          <div className="pt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                              Ubicación: {lodgingHeroBanner.locationBadge}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                              Botón: {lodgingHeroBanner.videoButtonText}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECCIÓN B: LAS 4+ TARJETAS DE SERVICIOS */}
                    <div className="space-y-2.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                        Tarjetas de Servicios y Complementos ({lodgingServices.length})
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px]">
                        {lodgingServices.map((card, idx) => (
                          <div
                            key={card.id}
                            className="relative rounded-2xl overflow-hidden aspect-square flex flex-col justify-between p-4 bg-[#06150F] border border-slate-200/60 shadow-2xs group"
                          >
                            {card.mediaType === 'video' && card.videoUrl ? (
                              <video
                                key={card.videoUrl}
                                src={card.videoUrl}
                                poster={card.image}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover opacity-70"
                              />
                            ) : (
                              <img
                                src={card.image}
                                alt={card.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#06150F]/95 via-[#06150F]/55 to-black/25" />

                            <div className="relative z-10 flex items-center justify-between gap-2">
                              <span className="px-2 py-0.5 rounded-full bg-[#06150F]/85 text-[#E2C585] border border-[#C8A45D]/40 text-[10px] font-bold flex items-center gap-1">
                                {card.mediaType === 'video' ? (
                                  <Video className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <ImageIcon className="w-3 h-3 text-[#E2C585]" />
                                )}
                                <span>
                                  #{idx + 1} · {card.badge}
                                </span>
                              </span>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingServiceCard(card);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                  }}
                                  className="px-2 py-1 rounded-lg bg-white text-[#06150F] hover:bg-[#E2C585] text-[11px] font-bold flex items-center gap-1 shadow cursor-pointer"
                                >
                                  <Pencil className="w-3 h-3" />
                                  <span>Editar</span>
                                </button>
                                {lodgingServices.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (
                                        window.confirm(`¿Eliminar la tarjeta "${card.title}"?`)
                                      ) {
                                        deleteLodgingService(card.id);
                                        showToast('Tarjeta eliminada.');
                                      }
                                    }}
                                    className="p-1 rounded-lg bg-red-600/90 hover:bg-red-600 text-white shadow cursor-pointer"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="relative z-10 mt-auto pt-6">
                              <h4 className="font-serif-luxury text-base text-white font-bold">
                                {card.title}
                              </h4>
                              <p className="text-[11px] text-white/80 line-clamp-2 mt-0.5 leading-relaxed">
                                {card.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : editingHeroBanner ? (
                  /* ================= EDICIÓN DE TARJETA PRINCIPAL (3 BLOQUES INCRUSTADOS EN EL LIENZO) ================= */
                  <form onSubmit={handleSaveHeroBanner} className="space-y-[15px] animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-300/80">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setEditingHeroBanner(null)}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#06150F] text-xs font-bold flex items-center gap-1.5 border border-slate-300 shadow-2xs transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Volver a los servicios</span>
                        </button>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#06150F]">
                          Editando: Tarjeta Principal Grande (Operación Completa)
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px] items-stretch">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-300/80">
                          <FileText className="w-4 h-4 text-[#A6823C]" />
                          <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F]">
                            1. Textos de la Tarjeta Principal
                          </h3>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Antetítulo Superior
                          </label>
                          <input
                            type="text"
                            value={editingHeroBanner.overline}
                            onChange={(e) =>
                              setEditingHeroBanner({
                                ...editingHeroBanner,
                                overline: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Título Principal (Línea 1)
                          </label>
                          <input
                            type="text"
                            value={editingHeroBanner.titleLine1}
                            onChange={(e) =>
                              setEditingHeroBanner({
                                ...editingHeroBanner,
                                titleLine1: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Título Principal (Línea 2 en Dorado)
                          </label>
                          <input
                            type="text"
                            value={editingHeroBanner.titleLine2}
                            onChange={(e) =>
                              setEditingHeroBanner({
                                ...editingHeroBanner,
                                titleLine2: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-[#A6823C]"
                          />
                        </div>
                        {/* DESCRIPCIÓN COMERCIAL: 10 LÍNEAS VISUALES CON SCROLL */}
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Descripción Comercial (10 líneas visuales)
                          </label>
                          <textarea
                            rows={10}
                            value={editingHeroBanner.description}
                            onChange={(e) =>
                              setEditingHeroBanner({
                                ...editingHeroBanner,
                                description: e.target.value,
                              })
                            }
                            placeholder="Describa la operación de larga estadía..."
                            className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 leading-relaxed min-h-[220px] max-h-[300px] overflow-y-auto focus:outline-none focus:border-[#C8A45D]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Etiqueta de Ubicación
                            </label>
                            <input
                              type="text"
                              value={editingHeroBanner.locationBadge}
                              onChange={(e) =>
                                setEditingHeroBanner({
                                  ...editingHeroBanner,
                                  locationBadge: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Texto del Botón Video
                            </label>
                            <input
                              type="text"
                              value={editingHeroBanner.videoButtonText}
                              onChange={(e) =>
                                setEditingHeroBanner({
                                  ...editingHeroBanner,
                                  videoButtonText: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      {/* COLUMNA 2: VIDEO / MULTIMEDIA */}
                      <div className="flex flex-col justify-between">
                        <AdminMediaUploader
                          imageUrl={editingHeroBanner.image}
                          onImageChange={(url) =>
                            setEditingHeroBanner({
                              ...editingHeroBanner,
                              image: url,
                            })
                          }
                          videoUrl={editingHeroBanner.videoUrl || ''}
                          onVideoChange={(url) =>
                            setEditingHeroBanner({
                              ...editingHeroBanner,
                              videoUrl: url,
                              mediaType: 'video',
                            })
                          }
                          mediaType={editingHeroBanner.mediaType}
                          onMediaTypeChange={(t) =>
                            setEditingHeroBanner({
                              ...editingHeroBanner,
                              mediaType: t,
                            })
                          }
                          allowVideo={true}
                          onProcessingChange={setIsMediaUploading}
                          label="2. Video Principal / Poster (WebP / HD)"
                        />
                      </div>

                      {/* COLUMNA 3: GUARDAR */}
                      <div className="space-y-4 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 pb-2 border-b border-slate-300/80">
                            <Video className="w-4 h-4 text-[#A6823C]" />
                            <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F]">
                              3. Publicación de la Tarjeta Principal
                            </h3>
                          </div>
                          <div className="bg-white/80 p-4 rounded-xl border border-slate-300 space-y-2 text-xs">
                            <span className="font-bold text-[#06150F] block">
                              Formato de Alta Impacto Visual
                            </span>
                            <p className="text-slate-600 leading-relaxed text-[11px]">
                              Esta tarjeta se visualiza con fondo de video HD continuo y controles interactivos en la sección de Estadía de la web pública.
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-300/80 space-y-2">
                          <button
                            type="submit"
                            disabled={isMediaUploading}
                            className="w-full py-3.5 px-5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-sans-ui font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Save className="w-4 h-4" />
                            <span>Guardar Tarjeta Principal</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingHeroBanner(null)}
                            className="w-full py-2 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition-colors cursor-pointer"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                ) : (
                  /* ================= EDICIÓN DE TARJETA DE SERVICIO (3 BLOQUES INCRUSTADOS EN EL LIENZO) ================= */
                  <form onSubmit={handleSaveServiceCard} className="space-y-[15px] animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-300/80">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCreatingServiceCard(false);
                            setEditingServiceCard(null);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#06150F] text-xs font-bold flex items-center gap-1.5 border border-slate-300 shadow-2xs transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Volver a los servicios</span>
                        </button>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#06150F]">
                          {isCreatingServiceCard
                            ? 'Creando Nueva Tarjeta de Servicio'
                            : `Editando: ${editingServiceCard?.title || 'Servicio'}`}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px] items-stretch">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-300/80">
                          <FileText className="w-4 h-4 text-[#A6823C]" />
                          <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F]">
                            1. Datos del Servicio
                          </h3>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Título del Servicio <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={editingServiceCard?.title || ''}
                            onChange={(e) =>
                              editingServiceCard &&
                              setEditingServiceCard({
                                ...editingServiceCard,
                                title: e.target.value,
                              })
                            }
                            placeholder="Ej: Piscina Cubierta Climatizada"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-[#06150F]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Etiqueta (Badge)
                            </label>
                            <input
                              type="text"
                              value={editingServiceCard?.badge || ''}
                              onChange={(e) =>
                                editingServiceCard &&
                                setEditingServiceCard({
                                  ...editingServiceCard,
                                  badge: e.target.value,
                                })
                              }
                              placeholder="Ej: Amenidad Clave"
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Texto del Botón CTA
                            </label>
                            <input
                              type="text"
                              value={editingServiceCard?.ctaText || ''}
                              onChange={(e) =>
                                editingServiceCard &&
                                setEditingServiceCard({
                                  ...editingServiceCard,
                                  ctaText: e.target.value,
                                })
                              }
                              placeholder="Ej: Solicitar Información →"
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                            />
                          </div>
                        </div>

                        {/* DESCRIPCIÓN COMERCIAL: 10 LÍNEAS VISUALES CON SCROLL */}
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Descripción Comercial (10 líneas visuales)
                          </label>
                          <textarea
                            rows={10}
                            value={editingServiceCard?.description || ''}
                            onChange={(e) =>
                              editingServiceCard &&
                              setEditingServiceCard({
                                ...editingServiceCard,
                                description: e.target.value,
                              })
                            }
                            placeholder="Describa los atractivos, capacidad y disponibilidad del servicio..."
                            className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 leading-relaxed min-h-[220px] max-h-[300px] overflow-y-auto focus:outline-none focus:border-[#C8A45D]"
                          />
                        </div>
                      </div>

                      {/* COLUMNA 2: MULTIMEDIA */}
                      {editingServiceCard && (
                        <div className="flex flex-col justify-between">
                          <AdminMediaUploader
                            imageUrl={editingServiceCard.image}
                            onImageChange={(url) =>
                              setEditingServiceCard({
                                ...editingServiceCard,
                                image: url,
                                mediaType: 'image',
                              })
                            }
                            videoUrl={editingServiceCard.videoUrl || ''}
                            onVideoChange={(url) =>
                              setEditingServiceCard({
                                ...editingServiceCard,
                                videoUrl: url,
                                mediaType: 'video',
                              })
                            }
                            mediaType={editingServiceCard.mediaType || 'image'}
                            onMediaTypeChange={(t) =>
                              setEditingServiceCard({
                                ...editingServiceCard,
                                mediaType: t,
                              })
                            }
                            allowVideo={true}
                            onProcessingChange={setIsMediaUploading}
                            label="2. Multimedia del Servicio (1:1)"
                          />
                        </div>
                      )}

                      {/* COLUMNA 3: PUBLICACIÓN */}
                      <div className="space-y-4 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 pb-2 border-b border-slate-300/80">
                            <Waves className="w-4 h-4 text-[#A6823C]" />
                            <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F]">
                              3. Publicación y Configuración
                            </h3>
                          </div>
                          <div className="bg-white/80 p-4 rounded-xl border border-slate-300 space-y-2 text-xs">
                            <span className="font-bold text-[#06150F] block">
                              Enlace con WhatsApp Corporativo
                            </span>
                            <p className="text-slate-600 leading-relaxed text-[11px]">
                              Al pulsar el botón en la tarjeta web, el cliente abrirá un mensaje directo de WhatsApp consultando por este servicio específico.
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-300/80 space-y-2">
                          <button
                            type="submit"
                            disabled={isMediaUploading}
                            className="w-full py-3.5 px-5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-sans-ui font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Save className="w-4 h-4" />
                            <span>
                              {isCreatingServiceCard
                                ? 'Guardar Tarjeta de Servicio'
                                : 'Guardar Cambios de Servicio'}
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsCreatingServiceCard(false);
                              setEditingServiceCard(null);
                            }}
                            className="w-full py-2 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition-colors cursor-pointer"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* ===============================================================
                MÓDULO 4: BODAS Y CELEBRACIONES — PROPUESTAS NUPCIALES DESTACADAS
               =============================================================== */}
                        {activeTab === 'bodas-propuestas' && (
              <div className="space-y-[15px]">
                {!editingWedding && !isCreatingWedding ? (
                  /* ================= ESTANTE GENERAL DE BODAS ================= */
                  <div className="space-y-[15px]">
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#C8A45D]/15 text-[#8A6B2D] text-[11px] font-bold uppercase tracking-wider mb-1.5">
                          <Heart className="w-3.5 h-3.5" />
                          <span>Página: Bodas y Celebraciones · Carrusel Servicios y Paquetes Nupciales</span>
                        </div>
                        <h2 className="font-serif-luxury font-bold text-xl sm:text-2xl text-[#06150F]">
                          Propuestas Nupciales Destacadas ({weddingProposals.length})
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Edite las tarjetas del carrusel de Servicios y Paquetes Nupciales o cree nuevas propuestas para bodas y celebraciones.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleStartNewWedding}
                        className="px-4 py-2.5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Nueva Propuesta Nupcial</span>
                      </button>
                    </div>

                    {/* Grilla de Tarjetas del Carrusel de Bodas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[15px]">
                      {weddingProposals.map((item, idx) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group"
                        >
                          <div>
                            <div className="relative aspect-square overflow-hidden bg-[#06150F]">
                              {item.mediaType === 'video' && item.videoUrl ? (
                                <video
                                  key={item.videoUrl}
                                  src={item.videoUrl}
                                  poster={item.image}
                                  muted
                                  loop
                                  autoPlay
                                  playsInline
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              )}
                              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#06150F]/85 text-[#E2C585] text-[10px] font-bold">
                                #{idx + 1} · {item.badge}
                              </span>
                            </div>

                            <div className="p-4 space-y-2">
                              <h3 className="font-serif-luxury font-bold text-base text-[#06150F] leading-snug line-clamp-1">
                                {item.title}
                              </h3>
                              <p className="text-xs text-slate-500 line-clamp-1">{item.subtitle}</p>
                              <ul className="space-y-1 pt-1.5 border-t border-slate-100 text-xs text-slate-600">
                                {item.specs.slice(0, 2).map((spec, sIdx) => (
                                  <li key={sIdx} className="flex items-center gap-1.5 truncate">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D] shrink-0" />
                                    <span className="truncate">{spec.label}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="px-4 py-3 bg-[#FAF7F2] border-t border-slate-200/80 flex items-center justify-between">
                            <div>
                              <span className="font-serif-luxury font-bold text-lg text-[#06150F]">
                                {item.price}
                              </span>
                              <span className="text-[10px] text-slate-500 ml-1">{item.unit}</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingWedding(item);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="px-2.5 py-1 rounded-lg bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <Pencil className="w-3 h-3" />
                                <span>Editar</span>
                              </button>
                              {weddingProposals.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (
                                      window.confirm(`¿Eliminar "${item.title}" del carrusel?`)
                                    ) {
                                      deleteWeddingProposal(item.id);
                                      showToast('Propuesta nupcial eliminada.');
                                    }
                                  }}
                                  className="p-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* ================= EDICIÓN DE PROPUESTA NUPCIAL (3 BLOQUES INCRUSTADOS EN EL LIENZO) ================= */
                  <form onSubmit={handleSaveWedding} className="space-y-[15px] animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-300/80">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCreatingWedding(false);
                            setEditingWedding(null);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#06150F] text-xs font-bold flex items-center gap-1.5 border border-slate-300 shadow-2xs transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Volver a las tarjetas</span>
                        </button>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#06150F]">
                          {isCreatingWedding
                            ? 'Creando Nueva Propuesta Nupcial'
                            : `Editando: ${editingWedding?.title || 'Propuesta Nupcial'}`}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px] items-stretch">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-300/80">
                          <Heart className="w-4 h-4 text-[#A6823C]" />
                          <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F]">
                            1. Información del Paquete Nupcial
                          </h3>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Título de la Tarjeta <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={editingWedding?.title || ''}
                            onChange={(e) =>
                              editingWedding &&
                              setEditingWedding({ ...editingWedding, title: e.target.value })
                            }
                            placeholder="Ej: Todo Incluido Premium"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Subtítulo
                          </label>
                          <input
                            type="text"
                            value={editingWedding?.subtitle || ''}
                            onChange={(e) =>
                              editingWedding &&
                              setEditingWedding({ ...editingWedding, subtitle: e.target.value })
                            }
                            placeholder="Ej: De 60 a 350 invitados · Producción integral"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Etiqueta Superior (Badge)
                          </label>
                          <input
                            type="text"
                            value={editingWedding?.badge || ''}
                            onChange={(e) =>
                              editingWedding &&
                              setEditingWedding({ ...editingWedding, badge: e.target.value })
                            }
                            placeholder="Ej: Más Solicitado"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold"
                          />
                        </div>

                        {/* DESCRIPCIÓN COMERCIAL: 10 LÍNEAS VISUALES CON SCROLL */}
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Descripción Comercial (10 líneas visuales)
                          </label>
                          <textarea
                            rows={10}
                            value={editingWedding?.description || editingWedding?.subtitle || ''}
                            onChange={(e) =>
                              editingWedding &&
                              setEditingWedding({
                                ...editingWedding,
                                description: e.target.value,
                              })
                            }
                            placeholder="Describa la propuesta nupcial, ambiente y servicios incluidos..."
                            className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 leading-relaxed min-h-[220px] max-h-[300px] overflow-y-auto focus:outline-none focus:border-[#C8A45D]"
                          />
                        </div>

                        <div className="space-y-2 pt-1 border-t border-slate-300/80">
                          <label className="block text-[11px] font-bold text-slate-700 uppercase">
                            Características (3 líneas)
                          </label>
                          {[0, 1, 2].map((specIdx) => (
                            <input
                              key={specIdx}
                              type="text"
                              value={editingWedding?.specs[specIdx]?.label || ''}
                              onChange={(e) => {
                                if (!editingWedding) return;
                                const nextSpecs = [...editingWedding.specs];
                                const defaultIcons: ('users' | 'tent' | 'utensils')[] = [
                                  'users',
                                  'tent',
                                  'utensils',
                                ];
                                nextSpecs[specIdx] = {
                                  label: e.target.value,
                                  icon: nextSpecs[specIdx]?.icon || defaultIcons[specIdx] || 'sparkles',
                                };
                                setEditingWedding({ ...editingWedding, specs: nextSpecs });
                              }}
                              placeholder={`Característica #${specIdx + 1}`}
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                            />
                          ))}
                        </div>
                      </div>

                      {/* COLUMNA 2: MULTIMEDIA */}
                      {editingWedding && (
                        <div className="flex flex-col justify-between">
                          <AdminMediaUploader
                            imageUrl={editingWedding.image}
                            onImageChange={(url) =>
                              setEditingWedding({ ...editingWedding, image: url, mediaType: 'image' })
                            }
                            videoUrl={editingWedding.videoUrl}
                            onVideoChange={(url) =>
                              setEditingWedding({ ...editingWedding, videoUrl: url, mediaType: 'video' })
                            }
                            mediaType={editingWedding.mediaType}
                            onMediaTypeChange={(t) =>
                              setEditingWedding({ ...editingWedding, mediaType: t })
                            }
                            allowVideo={true}
                            onProcessingChange={setIsMediaUploading}
                            label="2. Multimedia Nupcial (1:1)"
                          />
                        </div>
                      )}

                      {/* COLUMNA 3: PRECIO Y CONFIRMACIÓN */}
                      <div className="space-y-4 flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 pb-2 border-b border-slate-300/80">
                            <DollarSign className="w-4 h-4 text-[#A6823C]" />
                            <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F]">
                              3. Precio y Unidad
                            </h3>
                          </div>
                          <div className="bg-white/80 p-4 rounded-xl border border-slate-300 space-y-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                                Precio Destacado (Ej: $70, $980, $35)
                              </label>
                              <input
                                type="text"
                                value={editingWedding?.price || ''}
                                onChange={(e) =>
                                  editingWedding &&
                                  setEditingWedding({ ...editingWedding, price: e.target.value })
                                }
                                placeholder="$70"
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-base font-bold text-[#06150F]"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                                Unidad / Detalle del Precio
                              </label>
                              <input
                                type="text"
                                value={editingWedding?.unit || ''}
                                onChange={(e) =>
                                  editingWedding &&
                                  setEditingWedding({ ...editingWedding, unit: e.target.value })
                                }
                                placeholder="/ persona · ref."
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-300/80 space-y-2">
                          <button
                            type="submit"
                            disabled={isMediaUploading}
                            className="w-full py-3.5 px-5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-sans-ui font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Save className="w-4 h-4" />
                            <span>
                              {isCreatingWedding
                                ? 'Guardar Nueva Propuesta'
                                : 'Guardar Propuesta Nupcial'}
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsCreatingWedding(false);
                              setEditingWedding(null);
                            }}
                            className="w-full py-2 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition-colors cursor-pointer"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* ===============================================================
                MÓDULO 5: GRANDES EVENTOS Y CORPORATIVOS — FORMATO EXCLUSIVO
               =============================================================== */}
                        {activeTab === 'corp-formato-exclusivo' && (
              <div className="space-y-[15px]">
                {!editingExclusive && !isCreatingExclusive ? (
                  /* ================= ESTANTE GENERAL FORMATO EXCLUSIVO ================= */
                  <div className="space-y-[15px]">
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#C8A45D]/15 text-[#8A6B2D] text-[11px] font-bold uppercase tracking-wider mb-1.5">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>Página: Grandes Eventos y Corporativos · Formato Exclusivo</span>
                        </div>
                        <h2 className="font-serif-luxury font-bold text-xl sm:text-2xl text-[#06150F]">
                          Formatos Exclusivos Corporativos ({corporateExclusiveFormats.length})
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Apartados en carrusel para convenciones, congresos empresariales y exclusividad de hacienda.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleStartNewExclusive}
                        className="px-4 py-2.5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Nuevo Formato Exclusivo</span>
                      </button>
                    </div>

                    {/* Grilla de Formatos Exclusivos */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px]">
                      {corporateExclusiveFormats.map((pkg, idx) => (
                        <div
                          key={pkg.id}
                          className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group"
                        >
                          <div>
                            <div className="relative aspect-square overflow-hidden bg-[#06150F]">
                              {pkg.mediaType === 'video' && pkg.videoUrl ? (
                                <video
                                  key={pkg.videoUrl}
                                  src={pkg.videoUrl}
                                  poster={pkg.image}
                                  muted
                                  loop
                                  autoPlay
                                  playsInline
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <img
                                  src={pkg.image}
                                  alt={pkg.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              )}
                              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#06150F]/85 text-[#E2C585] text-[10px] font-bold">
                                #{idx + 1} · {pkg.highlightBadge || 'Exclusivo'}
                              </span>
                            </div>

                            <div className="p-4 space-y-2">
                              <h3 className="font-serif-luxury font-bold text-base text-[#06150F] leading-snug line-clamp-1">
                                {pkg.title}
                              </h3>
                              <p className="text-xs text-slate-500 line-clamp-1">{pkg.capacity}</p>
                              <p className="text-xs text-slate-600 line-clamp-2 pt-1 border-t border-slate-100">
                                {pkg.description}
                              </p>
                            </div>
                          </div>

                          <div className="px-4 py-3 bg-[#FAF7F2] border-t border-slate-200/80 flex items-center justify-between">
                            <div>
                              <span className="font-serif-luxury font-bold text-lg text-[#06150F]">
                                {pkg.priceLabel}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingExclusive(pkg);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="px-2.5 py-1 rounded-lg bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <Pencil className="w-3 h-3" />
                                <span>Editar</span>
                              </button>
                              {corporateExclusiveFormats.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (
                                      window.confirm(`¿Eliminar "${pkg.title}" del carrusel?`)
                                    ) {
                                      deleteCorporateExclusiveFormat(pkg.id);
                                      showToast('Formato eliminado.');
                                    }
                                  }}
                                  className="p-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* ================= EDICIÓN DE FORMATO EXCLUSIVO (3 BLOQUES INCRUSTADOS EN EL LIENZO) ================= */
                  <form onSubmit={handleSaveExclusive} className="space-y-[15px] animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-300/80">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCreatingExclusive(false);
                            setEditingExclusive(null);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#06150F] text-xs font-bold flex items-center gap-1.5 border border-slate-300 shadow-2xs transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Volver a las tarjetas</span>
                        </button>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#06150F]">
                          {isCreatingExclusive
                            ? 'Creando Nuevo Formato Exclusivo'
                            : `Editando: ${editingExclusive?.title || 'Formato Corporativo'}`}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px] items-stretch">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-300/80">
                          <Building2 className="w-4 h-4 text-[#A6823C]" />
                          <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F]">
                            1. Detalles del Formato Exclusivo
                          </h3>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Título del Apartado <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={editingExclusive?.title || ''}
                            onChange={(e) =>
                              editingExclusive &&
                              setEditingExclusive({ ...editingExclusive, title: e.target.value })
                            }
                            placeholder="Ej: Convenciones & Congresos Privados"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-bold"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Capacidad
                            </label>
                            <input
                              type="text"
                              value={editingExclusive?.capacity || ''}
                              onChange={(e) =>
                                editingExclusive &&
                                setEditingExclusive({
                                  ...editingExclusive,
                                  capacity: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Etiqueta (Badge)
                            </label>
                            <input
                              type="text"
                              value={editingExclusive?.highlightBadge || ''}
                              onChange={(e) =>
                                editingExclusive &&
                                setEditingExclusive({
                                  ...editingExclusive,
                                  highlightBadge: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Configuración / Montajes
                          </label>
                          <input
                            type="text"
                            value={editingExclusive?.setupInfo || ''}
                            onChange={(e) =>
                              editingExclusive &&
                              setEditingExclusive({
                                ...editingExclusive,
                                setupInfo: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                          />
                        </div>

                        {/* DESCRIPCIÓN COMERCIAL: 10 LÍNEAS VISUALES CON SCROLL */}
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Descripción Comercial (10 líneas visuales)
                          </label>
                          <textarea
                            rows={10}
                            value={editingExclusive?.description || ''}
                            onChange={(e) =>
                              editingExclusive &&
                              setEditingExclusive({
                                ...editingExclusive,
                                description: e.target.value,
                              })
                            }
                            placeholder="Describa el formato exclusivo corporativo..."
                            className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 leading-relaxed min-h-[220px] max-h-[300px] overflow-y-auto focus:outline-none focus:border-[#C8A45D]"
                          />
                        </div>

                        <div className="space-y-2 pt-1 border-t border-slate-300/80">
                          <label className="block text-[11px] font-bold text-slate-700 uppercase">
                            Servicios Incluidos (Hasta 4)
                          </label>
                          {[0, 1, 2, 3].map((incIdx) => (
                            <input
                              key={incIdx}
                              type="text"
                              value={editingExclusive?.inclusions[incIdx] || ''}
                              onChange={(e) => {
                                if (!editingExclusive) return;
                                const nextInc = [...editingExclusive.inclusions];
                                nextInc[incIdx] = e.target.value;
                                setEditingExclusive({
                                  ...editingExclusive,
                                  inclusions: nextInc,
                                });
                              }}
                              placeholder={`Inclusión #${incIdx + 1}`}
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                            />
                          ))}
                        </div>
                      </div>

                      {/* COLUMNA 2: MULTIMEDIA */}
                      {editingExclusive && (
                        <div className="flex flex-col justify-between">
                          <AdminMediaUploader
                            imageUrl={editingExclusive.image}
                            onImageChange={(url) =>
                              setEditingExclusive({
                                ...editingExclusive,
                                image: url,
                                mediaType: 'image',
                              })
                            }
                            videoUrl={editingExclusive.videoUrl}
                            onVideoChange={(url) =>
                              setEditingExclusive({
                                ...editingExclusive,
                                videoUrl: url,
                                mediaType: 'video',
                              })
                            }
                            mediaType={editingExclusive.mediaType}
                            onMediaTypeChange={(t) =>
                              setEditingExclusive({ ...editingExclusive, mediaType: t })
                            }
                            allowVideo={true}
                            onProcessingChange={setIsMediaUploading}
                            label="2. Multimedia del Formato (1:1)"
                          />
                        </div>
                      )}

                      {/* COLUMNA 3: PRECIO Y CONFIRMACIÓN */}
                      <div className="space-y-4 flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 pb-2 border-b border-slate-300/80">
                            <DollarSign className="w-4 h-4 text-[#A6823C]" />
                            <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F]">
                              3. Tarifa Referencial
                            </h3>
                          </div>
                          <div className="bg-white/80 p-4 rounded-xl border border-slate-300 space-y-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                                Tarifa desde ($ USD)
                              </label>
                              <div className="relative">
                                <span className="absolute left-3.5 top-2.5 font-bold text-slate-400">
                                  $
                                </span>
                                <input
                                  type="number"
                                  min={0}
                                  value={editingExclusive?.priceValue || 0}
                                  onChange={(e) =>
                                    editingExclusive &&
                                    setEditingExclusive({
                                      ...editingExclusive,
                                      priceValue: Number(e.target.value) || 0,
                                    })
                                  }
                                  className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-300 text-base font-bold text-[#06150F] bg-white"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                                Detalle de la Unidad
                              </label>
                              <input
                                type="text"
                                value={editingExclusive?.unit || ''}
                                onChange={(e) =>
                                  editingExclusive &&
                                  setEditingExclusive({ ...editingExclusive, unit: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-300/80 space-y-2">
                          <button
                            type="submit"
                            disabled={isMediaUploading}
                            className="w-full py-3.5 px-5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-sans-ui font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Save className="w-4 h-4" />
                            <span>
                              {isCreatingExclusive
                                ? 'Guardar Nuevo Formato'
                                : 'Guardar Formato Exclusivo'}
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsCreatingExclusive(false);
                              setEditingExclusive(null);
                            }}
                            className="w-full py-2 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition-colors cursor-pointer"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* ===============================================================
                MÓDULO 6: GRANDES EVENTOS CORPORATIVOS (CARRUSEL HORIZONTAL)
               =============================================================== */}
                        {activeTab === 'corp-grandes-eventos' && (
              <div className="space-y-[15px]">
                {!editingCorpHighlight && !isCreatingCorpHighlight ? (
                  /* ================= ESTANTE GENERAL DE MACROEVENTOS ================= */
                  <div className="space-y-[15px]">
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#C8A45D]/15 text-[#8A6B2D] text-[11px] font-bold uppercase tracking-wider mb-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Página: Grandes Eventos y Corporativos · Macroeventos y Encuentros</span>
                        </div>
                        <h2 className="font-serif-luxury font-bold text-xl sm:text-2xl text-[#06150F]">
                          Macroeventos y Encuentros Empresariales ({corporateHighlights.length})
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Edite los apartados en carrusel de grandes eventos o agregue un nuevo evento empresarial.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleStartNewCorpHighlight}
                        className="px-4 py-2.5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Nuevo Macroevento</span>
                      </button>
                    </div>

                    {/* Grilla de Macroeventos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
                      {corporateHighlights.map((item, idx) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group"
                        >
                          <div>
                            <div className="relative aspect-square overflow-hidden bg-[#06150F]">
                              {item.mediaType === 'video' && item.videoUrl ? (
                                <video
                                  key={item.videoUrl}
                                  src={item.videoUrl}
                                  poster={item.image}
                                  muted
                                  loop
                                  autoPlay
                                  playsInline
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              )}
                              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#06150F]/85 text-[#E2C585] text-[10px] font-bold">
                                #{idx + 1}
                              </span>
                            </div>

                            <div className="p-4 space-y-2">
                              <span className="text-xs font-bold text-[#A6823C] block">
                                {item.highlightMetric}
                              </span>
                              <h3 className="font-serif-luxury font-bold text-base text-[#06150F] leading-snug line-clamp-1">
                                {item.title}
                              </h3>
                              <p className="text-xs text-slate-600 line-clamp-2 pt-1 border-t border-slate-100">
                                {item.subtitle}
                              </p>
                            </div>
                          </div>

                          <div className="px-4 py-3 bg-[#FAF7F2] border-t border-slate-200/80 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500">
                              Hacienda Le Plus
                            </span>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingCorpHighlight(item);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="px-2.5 py-1 rounded-lg bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <Pencil className="w-3 h-3" />
                                <span>Editar</span>
                              </button>
                              {corporateHighlights.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (
                                      window.confirm(`¿Eliminar "${item.title}" del carrusel?`)
                                    ) {
                                      deleteCorporateHighlight(item.id);
                                      showToast('Evento eliminado.');
                                    }
                                  }}
                                  className="p-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* ================= EDICIÓN DE MACROEVENTO (3 BLOQUES INCRUSTADOS EN EL LIENZO) ================= */
                  <form onSubmit={handleSaveCorpHighlight} className="space-y-[15px] animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-300/80">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCreatingCorpHighlight(false);
                            setEditingCorpHighlight(null);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#06150F] text-xs font-bold flex items-center gap-1.5 border border-slate-300 shadow-2xs transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Volver a las tarjetas</span>
                        </button>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#06150F]">
                          {isCreatingCorpHighlight
                            ? 'Creando Nuevo Macroevento'
                            : `Editando: ${editingCorpHighlight?.title || 'Evento Corporativo'}`}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px] items-stretch">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-300/80">
                          <Sparkles className="w-4 h-4 text-[#A6823C]" />
                          <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F]">
                            1. Datos del Evento Corporativo
                          </h3>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Título del Evento <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={editingCorpHighlight?.title || ''}
                            onChange={(e) =>
                              editingCorpHighlight &&
                              setEditingCorpHighlight({
                                ...editingCorpHighlight,
                                title: e.target.value,
                              })
                            }
                            placeholder="Ej: Integraciones & Fiestas de Fin de Año"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Métrica / Dato Destacado (En Dorado)
                          </label>
                          <input
                            type="text"
                            value={editingCorpHighlight?.highlightMetric || ''}
                            onChange={(e) =>
                              editingCorpHighlight &&
                              setEditingCorpHighlight({
                                ...editingCorpHighlight,
                                highlightMetric: e.target.value,
                              })
                            }
                            placeholder="Ej: Hasta 350+ pax / Desde $40 / pax"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-[#A6823C]"
                          />
                        </div>

                        {/* DESCRIPCIÓN COMERCIAL: 10 LÍNEAS VISUALES CON SCROLL */}
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Descripción Comercial (10 líneas visuales)
                          </label>
                          <textarea
                            rows={10}
                            value={editingCorpHighlight?.subtitle || ''}
                            onChange={(e) =>
                              editingCorpHighlight &&
                              setEditingCorpHighlight({
                                ...editingCorpHighlight,
                                subtitle: e.target.value,
                              })
                            }
                            placeholder="Describa la escala, cena corporativa, producción y música en vivo..."
                            className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 leading-relaxed min-h-[220px] max-h-[300px] overflow-y-auto focus:outline-none focus:border-[#C8A45D]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Nombre del Item en WhatsApp
                          </label>
                          <input
                            type="text"
                            value={editingCorpHighlight?.whatsappItemName || ''}
                            onChange={(e) =>
                              editingCorpHighlight &&
                              setEditingCorpHighlight({
                                ...editingCorpHighlight,
                                whatsappItemName: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                          />
                        </div>
                      </div>

                      {/* COLUMNA 2: MULTIMEDIA */}
                      {editingCorpHighlight && (
                        <div className="flex flex-col justify-between">
                          <AdminMediaUploader
                            imageUrl={editingCorpHighlight.image}
                            onImageChange={(url) =>
                              setEditingCorpHighlight({
                                ...editingCorpHighlight,
                                image: url,
                                mediaType: 'image',
                              })
                            }
                            videoUrl={editingCorpHighlight.videoUrl}
                            onVideoChange={(url) =>
                              setEditingCorpHighlight({
                                ...editingCorpHighlight,
                                videoUrl: url,
                                mediaType: 'video',
                              })
                            }
                            mediaType={editingCorpHighlight.mediaType}
                            onMediaTypeChange={(t) =>
                              setEditingCorpHighlight({
                                ...editingCorpHighlight,
                                mediaType: t,
                              })
                            }
                            allowVideo={true}
                            onProcessingChange={setIsMediaUploading}
                            label="2. Multimedia del Macroevento (1:1)"
                          />
                        </div>
                      )}

                      {/* COLUMNA 3: CONFIRMACIÓN */}
                      <div className="space-y-4 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 pb-2 border-b border-slate-300/80">
                            <Sparkles className="w-4 h-4 text-[#A6823C]" />
                            <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F]">
                              3. Publicación del Macroevento
                            </h3>
                          </div>
                          <div className="bg-white/80 p-4 rounded-xl border border-slate-300 space-y-2 text-xs">
                            <span className="font-bold text-[#06150F] block">
                              Presencia en Carrusel Corporativo
                            </span>
                            <p className="text-slate-600 leading-relaxed text-[11px]">
                              Aparecerá en el carrusel de grandes eventos corporativos y macroeventos con su métrica en dorado de alto impacto.
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-300/80 space-y-2">
                          <button
                            type="submit"
                            disabled={isMediaUploading}
                            className="w-full py-3.5 px-5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-sans-ui font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Save className="w-4 h-4" />
                            <span>
                              {isCreatingCorpHighlight
                                ? 'Guardar Nuevo Evento'
                                : 'Guardar Cambios de Evento'}
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsCreatingCorpHighlight(false);
                              setEditingCorpHighlight(null);
                            }}
                            className="w-full py-2 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition-colors cursor-pointer"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* PIE DEL PANEL DERECHO */}
          <footer className="bg-white border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
            <span>
              Panel Administrativo Hacienda Le Plus &copy; {new Date().getFullYear()} — Estructura Corporativa
            </span>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-bold text-[#06150F] hover:text-[#A6823C] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Regresar al Sitio Web Principal</span>
            </Link>
          </footer>
        </main>
      </div>
    </div>
  );
};
