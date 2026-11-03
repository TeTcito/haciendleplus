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
    if (isCreatingWedding) {
      const { id: _unusedId, ...rest } = activeWedding;
      void _unusedId;
      addWeddingProposal(rest);
      showToast('Nueva propuesta agregada al carrusel de Bodas y Celebraciones.');
    } else {
      updateWeddingProposal(activeWedding);
      showToast('Propuesta nupcial actualizada correctamente.');
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
                {/* Barra de control compacta superior */}
                <div className="flex flex-wrap items-center justify-between gap-2 bg-white/70 backdrop-blur-xs p-2.5 px-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C8A45D]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#06150F]">
                      {isCreatingCabin
                        ? 'Creando Nueva Tarjeta de Habitación'
                        : `Editando: ${activeCabin?.name || 'Habitación'}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCreatingCabin ? (
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingCabin(false);
                          setEditingCabin(cabins[0] || null);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Cancelar Nueva</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleStartNewCabin}
                        className="px-3.5 py-1.5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ Nueva Tarjeta</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Los 3 Bloques de Edición (Comienzan a 15px) */}
                {activeCabin && (
                  <form onSubmit={handleSaveCabin} className="animate-fadeIn">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px] items-stretch">
                      {/* COLUMNA 1: INFORMACIÓN DE LA TARJETA */}
                      <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
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
                            value={activeCabin.name}
                            onChange={(e) =>
                              setEditingCabin({ ...activeCabin, name: e.target.value })
                            }
                            placeholder="Ej: Suite Ejecutiva Le Plus No. 1"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-[#06150F] focus:outline-none focus:border-[#06150F]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                              Etiqueta (Badge)
                            </label>
                            <input
                              type="text"
                              value={activeCabin.type}
                              onChange={(e) =>
                                setEditingCabin({ ...activeCabin, type: e.target.value })
                              }
                              placeholder="Suite Matrimonial"
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#06150F]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                              Baños Privados
                            </label>
                            <input
                              type="number"
                              min={1}
                              value={activeCabin.bathrooms}
                              onChange={(e) =>
                                setEditingCabin({
                                  ...activeCabin,
                                  bathrooms: Number(e.target.value) || 1,
                                })
                              }
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#06150F]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Capacidad (Texto en Tarjeta)
                          </label>
                          <input
                            type="text"
                            value={activeCabin.capacity}
                            onChange={(e) =>
                              setEditingCabin({ ...activeCabin, capacity: e.target.value })
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
                            value={activeCabin.beds}
                            onChange={(e) =>
                              setEditingCabin({ ...activeCabin, beds: e.target.value })
                            }
                            placeholder="Ej: 1 Cama Matrimonial + 1 Cama Adicional"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs text-[#06150F]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Descripción Comercial
                          </label>
                          <textarea
                            rows={3}
                            value={activeCabin.description}
                            onChange={(e) =>
                              setEditingCabin({ ...activeCabin, description: e.target.value })
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs text-[#06150F] resize-none"
                          />
                        </div>
                      </div>

                      {/* COLUMNA 2: MULTIMEDIA WEBP / VIDEO */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                        <AdminMediaUploader
                          imageUrl={activeCabin.image}
                          onImageChange={(url) =>
                            setEditingCabin({ ...activeCabin, image: url })
                          }
                          videoUrl={activeCabin.videoUrl || ''}
                          onVideoChange={(url) =>
                            setEditingCabin({ ...activeCabin, videoUrl: url })
                          }
                          mediaType={activeCabin.mediaType || 'image'}
                          onMediaTypeChange={(type) =>
                            setEditingCabin({ ...activeCabin, mediaType: type })
                          }
                          allowVideo={true}
                        />
                      </div>

                      {/* COLUMNA 3: PRECIO Y PUBLICACIÓN */}
                      <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                            <DollarSign className="w-4 h-4 text-[#A6823C]" />
                            <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F]">
                              3. Tarifa y Publicación
                            </h3>
                          </div>

                          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#06150F]">
                                Mostrar Precio en la Tarjeta
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  setEditingCabin({
                                    ...activeCabin,
                                    showPrice: activeCabin.showPrice === false ? true : false,
                                  })
                                }
                                className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                                  activeCabin.showPrice !== false
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-slate-200 text-slate-600'
                                }`}
                              >
                                {activeCabin.showPrice !== false ? (
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
                                  value={activeCabin.pricePerNight}
                                  onChange={(e) =>
                                    setEditingCabin({
                                      ...activeCabin,
                                      pricePerNight: Number(e.target.value) || 0,
                                    })
                                  }
                                  className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-200 text-base font-bold text-[#06150F] bg-white"
                                />
                              </div>
                              <span className="text-[11px] text-slate-400 block mt-1">
                                Se mostrará como: <strong>${activeCabin.pricePerNight}</strong> / ref.
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-200 space-y-2">
                          <button
                            type="submit"
                            className="w-full py-3.5 px-5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-sans-ui font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                          >
                            <Save className="w-4 h-4" />
                            <span>
                              {isCreatingCabin ? 'Crear Tarjeta en Carrusel' : 'Guardar Cambios'}
                            </span>
                          </button>
                          {isCreatingCabin && (
                            <button
                              type="button"
                              onClick={() => {
                                setIsCreatingCabin(false);
                                setEditingCabin(cabins[0] || null);
                              }}
                              className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                            >
                              Cancelar Creación
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                )}

                {/* Grilla de Tarjetas Actuales del Carrusel */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                    Tarjetas en el Carrusel de Hospedaje ({cabins.length})
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[15px]">
                    {cabins.map((cabin, idx) => (
                      <div
                        key={cabin.id}
                        className={`bg-white rounded-2xl border overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group ${
                          activeCabin?.id === cabin.id && !isCreatingCabin
                            ? 'ring-2 ring-[#C8A45D] border-transparent'
                            : 'border-slate-200/90'
                        }`}
                      >
                        <div>
                          <div className="relative aspect-square overflow-hidden bg-[#06150F]">
                            {cabin.mediaType === 'video' && cabin.videoUrl ? (
                              <video
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
                                setIsCreatingCabin(false);
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
              </div>
            )}

            {/* ===============================================================
                MÓDULO 3: SERVICIO DE ESTADÍA Y COMPLEMENTOS (VIDEOS)
               =============================================================== */}
            {activeTab === 'servicios-estadia' && (
              <div className="space-y-[15px]">
                {/* Selector rápido para los 3 bloques de edición */}
                <div className="flex flex-wrap items-center justify-between gap-2 bg-white/70 backdrop-blur-xs p-2.5 px-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setServiciosTarget('principal')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        serviciosTarget === 'principal'
                          ? 'bg-[#06150F] text-[#E2C585] shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>1. Tarjeta Principal Grande (Con Video)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setServiciosTarget('servicios');
                        if (!editingServiceCard && lodgingServices.length > 0) {
                          setEditingServiceCard(lodgingServices[0]);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        serviciosTarget === 'servicios'
                          ? 'bg-[#06150F] text-[#E2C585] shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <Waves className="w-3.5 h-3.5" />
                      <span>
                        2. Tarjetas de Servicios ({lodgingServices.length})
                        {editingServiceCard ? ` · ${editingServiceCard.title}` : ''}
                      </span>
                    </button>
                  </div>

                  {serviciosTarget === 'servicios' && (
                    <button
                      type="button"
                      onClick={handleStartNewServiceCard}
                      className="px-3.5 py-1.5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Nueva Tarjeta de Servicio</span>
                    </button>
                  )}
                </div>

                {/* LOS 3 BLOQUES DE EDICIÓN (A 15PX DEL HEADER Y PANEL IZQUIERDO) */}
                {serviciosTarget === 'principal' ? (
                  <form onSubmit={handleSaveHeroBanner} className="animate-fadeIn">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px] items-stretch">
                      <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                        <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F] pb-2 border-b border-slate-200">
                          1. Textos de la Tarjeta Principal
                        </h3>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Antetítulo Superior
                          </label>
                          <input
                            type="text"
                            value={activeHeroBanner.overline}
                            onChange={(e) =>
                              setEditingHeroBanner({
                                ...activeHeroBanner,
                                overline: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Título Principal (Línea 1)
                          </label>
                          <input
                            type="text"
                            value={activeHeroBanner.titleLine1}
                            onChange={(e) =>
                              setEditingHeroBanner({
                                ...activeHeroBanner,
                                titleLine1: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Título Cursiva Dorada (Línea 2)
                          </label>
                          <input
                            type="text"
                            value={activeHeroBanner.titleLine2}
                            onChange={(e) =>
                              setEditingHeroBanner({
                                ...activeHeroBanner,
                                titleLine2: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Descripción
                          </label>
                          <textarea
                            rows={3}
                            value={activeHeroBanner.description}
                            onChange={(e) =>
                              setEditingHeroBanner({
                                ...activeHeroBanner,
                                description: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs resize-none"
                          />
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                        <AdminMediaUploader
                          imageUrl={activeHeroBanner.image}
                          onImageChange={(url) =>
                            setEditingHeroBanner({ ...activeHeroBanner, image: url })
                          }
                          videoUrl={activeHeroBanner.videoUrl || ''}
                          onVideoChange={(url) =>
                            setEditingHeroBanner({ ...activeHeroBanner, videoUrl: url })
                          }
                          mediaType={activeHeroBanner.mediaType}
                          onMediaTypeChange={(type) =>
                            setEditingHeroBanner({ ...activeHeroBanner, mediaType: type })
                          }
                          allowVideo={true}
                          label="2. Video Principal o Portada"
                        />
                      </div>

                      <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                        <div className="space-y-4">
                          <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F] pb-2 border-b border-slate-200">
                            3. Botón de Video y Ubicación
                          </h3>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Texto del Botón Reproductor
                            </label>
                            <input
                              type="text"
                              value={activeHeroBanner.videoButtonText}
                              onChange={(e) =>
                                setEditingHeroBanner({
                                  ...activeHeroBanner,
                                  videoButtonText: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Etiqueta de Ubicación
                            </label>
                            <input
                              type="text"
                              value={activeHeroBanner.locationBadge}
                              onChange={(e) =>
                                setEditingHeroBanner({
                                  ...activeHeroBanner,
                                  locationBadge: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                            />
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-200">
                          <button
                            type="submit"
                            className="w-full py-3.5 px-5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                          >
                            <Save className="w-4 h-4" />
                            <span>Guardar Tarjeta Principal</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                ) : (
                  activeServiceCard && (
                    <form onSubmit={handleSaveServiceCard} className="animate-fadeIn">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px] items-stretch">
                        <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                          <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F] pb-2 border-b border-slate-200">
                            1. Contenido de la Tarjeta
                          </h3>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Título de la Tarjeta <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={activeServiceCard.title}
                              onChange={(e) =>
                                setEditingServiceCard({
                                  ...activeServiceCard,
                                  title: e.target.value,
                                })
                              }
                              placeholder="Ej: Alimentación & Restaurante"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Etiqueta Superior (Badge)
                            </label>
                            <input
                              type="text"
                              value={activeServiceCard.badge}
                              onChange={(e) =>
                                setEditingServiceCard({
                                  ...activeServiceCard,
                                  badge: e.target.value,
                                })
                              }
                              placeholder="Ej: Servicio Diario / Incluido / Complemento"
                              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Descripción
                            </label>
                            <textarea
                              rows={3}
                              value={activeServiceCard.description}
                              onChange={(e) =>
                                setEditingServiceCard({
                                  ...activeServiceCard,
                                  description: e.target.value,
                                })
                              }
                              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs resize-none"
                            />
                          </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                          <AdminMediaUploader
                            imageUrl={activeServiceCard.image}
                            onImageChange={(url) =>
                              setEditingServiceCard({ ...activeServiceCard, image: url })
                            }
                            videoUrl={activeServiceCard.videoUrl || ''}
                            onVideoChange={(url) =>
                              setEditingServiceCard({ ...activeServiceCard, videoUrl: url })
                            }
                            mediaType={activeServiceCard.mediaType}
                            onMediaTypeChange={(type) =>
                              setEditingServiceCard({ ...activeServiceCard, mediaType: type })
                            }
                            allowVideo={true}
                            label="2. Video o Imagen de la Tarjeta"
                          />
                        </div>

                        <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                          <div className="space-y-4">
                            <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F] pb-2 border-b border-slate-200">
                              3. Acción de la Tarjeta
                            </h3>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                                Texto del Enlace Inferior
                              </label>
                              <input
                                type="text"
                                value={activeServiceCard.ctaText}
                                onChange={(e) =>
                                  setEditingServiceCard({
                                    ...activeServiceCard,
                                    ctaText: e.target.value,
                                  })
                                }
                                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                                Asunto para Cotización WhatsApp
                              </label>
                              <input
                                type="text"
                                value={activeServiceCard.itemName}
                                onChange={(e) =>
                                  setEditingServiceCard({
                                    ...activeServiceCard,
                                    itemName: e.target.value,
                                  })
                                }
                                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs"
                              />
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-200 space-y-2">
                            <button
                              type="submit"
                              className="w-full py-3.5 px-5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                            >
                              <Save className="w-4 h-4" />
                              <span>
                                {isCreatingServiceCard
                                  ? 'Crear Tarjeta de Servicio'
                                  : 'Guardar Tarjeta'}
                              </span>
                            </button>
                            {isCreatingServiceCard && (
                              <button
                                type="button"
                                onClick={() => {
                                  setIsCreatingServiceCard(false);
                                  setEditingServiceCard(lodgingServices[0] || null);
                                }}
                                className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                              >
                                Cancelar
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </form>
                  )
                )}

                {/* VISTA PREVIA INFERIOR: TARJETA PRINCIPAL + TARJETAS DE SERVICIOS */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                    Vista del Contenido en la Página Pública
                  </span>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-[15px] items-stretch">
                    {/* PRIMERA TARJETA GRANDE CON VIDEO */}
                    <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[420px] flex flex-col justify-between p-6 bg-[#06150F] border-2 border-[#C8A45D]/50 shadow-md group">
                      {lodgingHeroBanner.mediaType === 'video' && lodgingHeroBanner.videoUrl ? (
                        <video
                          key={lodgingHeroBanner.videoUrl}
                          src={lodgingHeroBanner.videoUrl}
                          poster={lodgingHeroBanner.image}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover opacity-65"
                        />
                      ) : (
                        <img
                          src={lodgingHeroBanner.image}
                          alt={lodgingHeroBanner.titleLine1}
                          className="absolute inset-0 w-full h-full object-cover opacity-65"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06150F] via-[#06150F]/65 to-[#06150F]/30" />

                      <div className="relative z-10 flex items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-[#C8A45D] text-[#06150F] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                          <Play className="w-3 h-3 fill-current" />
                          1ra Tarjeta Grande · Video
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setServiciosTarget('principal');
                            setEditingHeroBanner(lodgingHeroBanner);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white text-[#06150F] hover:bg-[#E2C585] text-xs font-bold flex items-center gap-1 shadow cursor-pointer transition-colors"
                        >
                          <Pencil className="w-3 h-3" />
                          <span>Editar en Bloques</span>
                        </button>
                      </div>

                      <div className="relative z-10 space-y-2 mt-auto pt-8">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#E2C585] font-bold block">
                          {lodgingHeroBanner.overline}
                        </span>
                        <h3 className="font-serif-luxury text-2xl text-white leading-tight">
                          {lodgingHeroBanner.titleLine1}{' '}
                          <span className="italic font-light text-[#E2C585]">
                            {lodgingHeroBanner.titleLine2}
                          </span>
                        </h3>
                        <p className="text-xs text-white/85 leading-relaxed line-clamp-2">
                          {lodgingHeroBanner.description}
                        </p>
                      </div>
                    </div>

                    {/* LAS 4+ TARJETAS AL LADO DERECHO */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-[15px]">
                      {lodgingServices.map((card, idx) => (
                        <div
                          key={card.id}
                          className={`relative rounded-2xl overflow-hidden aspect-square flex flex-col justify-between p-4 bg-[#06150F] border shadow-2xs group ${
                            activeServiceCard?.id === card.id && serviciosTarget === 'servicios'
                              ? 'ring-2 ring-[#C8A45D] border-transparent'
                              : 'border-slate-200/60'
                          }`}
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
                                  setServiciosTarget('servicios');
                                  setIsCreatingServiceCard(false);
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
                            <p className="text-[11px] text-white/80 line-clamp-1 mt-0.5">
                              {card.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===============================================================
                MÓDULO 4: BODAS Y CELEBRACIONES — PROPUESTAS NUPCIALES DESTACADAS
               =============================================================== */}
            {activeTab === 'bodas-propuestas' && (
              <div className="space-y-[15px]">
                {/* Barra de control compacta superior */}
                <div className="flex flex-wrap items-center justify-between gap-2 bg-white/70 backdrop-blur-xs p-2.5 px-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C8A45D]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#06150F]">
                      {isCreatingWedding
                        ? 'Creando Nueva Propuesta Nupcial'
                        : `Editando: ${activeWedding?.title || 'Propuesta Nupcial'}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCreatingWedding ? (
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingWedding(false);
                          setEditingWedding(weddingProposals[0] || null);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Cancelar</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleStartNewWedding}
                        className="px-3.5 py-1.5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ Nueva Propuesta Nupcial</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Los 3 Bloques de Edición (Comienzan a 15px) */}
                {activeWedding && (
                  <form onSubmit={handleSaveWedding} className="animate-fadeIn">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px] items-stretch">
                      <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                        <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F] pb-2 border-b border-slate-200">
                          1. Información del Paquete Nupcial
                        </h3>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Título de la Tarjeta <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={activeWedding.title}
                            onChange={(e) =>
                              setEditingWedding({ ...activeWedding, title: e.target.value })
                            }
                            placeholder="Ej: Todo Incluido Premium"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Subtítulo
                          </label>
                          <input
                            type="text"
                            value={activeWedding.subtitle}
                            onChange={(e) =>
                              setEditingWedding({ ...activeWedding, subtitle: e.target.value })
                            }
                            placeholder="Ej: De 60 a 350 invitados · Producción integral"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Etiqueta Superior (Badge)
                          </label>
                          <input
                            type="text"
                            value={activeWedding.badge}
                            onChange={(e) =>
                              setEditingWedding({ ...activeWedding, badge: e.target.value })
                            }
                            placeholder="Ej: Más Solicitado"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                          />
                        </div>

                        <div className="space-y-2 pt-1">
                          <label className="block text-[11px] font-bold text-slate-700 uppercase">
                            Características (3 líneas)
                          </label>
                          {[0, 1, 2].map((specIdx) => (
                            <input
                              key={specIdx}
                              type="text"
                              value={activeWedding.specs[specIdx]?.label || ''}
                              onChange={(e) => {
                                const nextSpecs = [...activeWedding.specs];
                                const defaultIcons: ('users' | 'tent' | 'utensils')[] = [
                                  'users',
                                  'tent',
                                  'utensils',
                                ];
                                nextSpecs[specIdx] = {
                                  label: e.target.value,
                                  icon: nextSpecs[specIdx]?.icon || defaultIcons[specIdx] || 'sparkles',
                                };
                                setEditingWedding({ ...activeWedding, specs: nextSpecs });
                              }}
                              placeholder={`Característica #${specIdx + 1}`}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs"
                            />
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                        <AdminMediaUploader
                          imageUrl={activeWedding.image}
                          onImageChange={(url) =>
                            setEditingWedding({ ...activeWedding, image: url })
                          }
                          videoUrl={activeWedding.videoUrl || ''}
                          onVideoChange={(url) =>
                            setEditingWedding({ ...activeWedding, videoUrl: url })
                          }
                          mediaType={activeWedding.mediaType || 'image'}
                          onMediaTypeChange={(type) =>
                            setEditingWedding({ ...activeWedding, mediaType: type })
                          }
                          allowVideo={true}
                        />
                      </div>

                      <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                        <div className="space-y-4">
                          <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F] pb-2 border-b border-slate-200">
                            3. Precio y Unidad
                          </h3>
                          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 space-y-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                                Precio Destacado (Ej: $70, $980, $35)
                              </label>
                              <input
                                type="text"
                                value={activeWedding.price}
                                onChange={(e) =>
                                  setEditingWedding({ ...activeWedding, price: e.target.value })
                                }
                                placeholder="$70"
                                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-base font-bold bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                                Unidad / Detalle del Precio
                              </label>
                              <input
                                type="text"
                                value={activeWedding.unit}
                                onChange={(e) =>
                                  setEditingWedding({ ...activeWedding, unit: e.target.value })
                                }
                                placeholder="/ persona · ref."
                                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-200 space-y-2">
                          <button
                            type="submit"
                            className="w-full py-3.5 px-5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                          >
                            <Save className="w-4 h-4" />
                            <span>
                              {isCreatingWedding
                                ? 'Crear Propuesta Nupcial'
                                : 'Guardar Propuesta Nupcial'}
                            </span>
                          </button>
                          {isCreatingWedding && (
                            <button
                              type="button"
                              onClick={() => {
                                setIsCreatingWedding(false);
                                setEditingWedding(weddingProposals[0] || null);
                              }}
                              className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                            >
                              Cancelar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                )}

                {/* Grilla de Tarjetas del Carrusel de Bodas */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                    Propuestas en el Carrusel de Bodas ({weddingProposals.length})
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[15px]">
                    {weddingProposals.map((item, idx) => (
                      <div
                        key={item.id}
                        className={`bg-white rounded-2xl border overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group ${
                          activeWedding?.id === item.id && !isCreatingWedding
                            ? 'ring-2 ring-[#C8A45D] border-transparent'
                            : 'border-slate-200/90'
                        }`}
                      >
                        <div>
                          <div className="relative aspect-square overflow-hidden bg-[#06150F]">
                            {item.mediaType === 'video' && item.videoUrl ? (
                              <video
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
                                setIsCreatingWedding(false);
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
              </div>
            )}

            {/* ===============================================================
                MÓDULO 5: GRANDES EVENTOS Y CORPORATIVOS — FORMATO EXCLUSIVO
               =============================================================== */}
            {activeTab === 'corp-formato-exclusivo' && (
              <div className="space-y-[15px]">
                {/* Barra de control compacta superior */}
                <div className="flex flex-wrap items-center justify-between gap-2 bg-white/70 backdrop-blur-xs p-2.5 px-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C8A45D]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#06150F]">
                      {isCreatingExclusive
                        ? 'Creando Nuevo Formato Exclusivo'
                        : `Editando: ${activeExclusive?.title || 'Formato Corporativo'}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCreatingExclusive ? (
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingExclusive(false);
                          setEditingExclusive(corporateExclusiveFormats[0] || null);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Cancelar</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleStartNewExclusive}
                        className="px-3.5 py-1.5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ Nuevo Formato</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Los 3 Bloques de Edición (Comienzan a 15px) */}
                {activeExclusive && (
                  <form onSubmit={handleSaveExclusive} className="animate-fadeIn">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px] items-stretch">
                      <div className="space-y-3.5 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                        <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F] pb-2 border-b border-slate-200">
                          1. Detalles del Formato Exclusivo
                        </h3>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Título del Apartado <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={activeExclusive.title}
                            onChange={(e) =>
                              setEditingExclusive({ ...activeExclusive, title: e.target.value })
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm font-bold"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Capacidad
                            </label>
                            <input
                              type="text"
                              value={activeExclusive.capacity}
                              onChange={(e) =>
                                setEditingExclusive({
                                  ...activeExclusive,
                                  capacity: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Etiqueta (Badge)
                            </label>
                            <input
                              type="text"
                              value={activeExclusive.highlightBadge || ''}
                              onChange={(e) =>
                                setEditingExclusive({
                                  ...activeExclusive,
                                  highlightBadge: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Configuración / Montajes
                          </label>
                          <input
                            type="text"
                            value={activeExclusive.setupInfo}
                            onChange={(e) =>
                              setEditingExclusive({
                                ...activeExclusive,
                                setupInfo: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Descripción
                          </label>
                          <textarea
                            rows={3}
                            value={activeExclusive.description}
                            onChange={(e) =>
                              setEditingExclusive({
                                ...activeExclusive,
                                description: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Inclusiones (Una por línea)
                          </label>
                          <textarea
                            rows={3}
                            value={activeExclusive.inclusions.join('\n')}
                            onChange={(e) =>
                              setEditingExclusive({
                                ...activeExclusive,
                                inclusions: e.target.value
                                  .split('\n')
                                  .map((s) => s.trim())
                                  .filter(Boolean),
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs resize-none"
                          />
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                        <AdminMediaUploader
                          imageUrl={activeExclusive.image}
                          onImageChange={(url) =>
                            setEditingExclusive({ ...activeExclusive, image: url })
                          }
                          videoUrl={activeExclusive.videoUrl || ''}
                          onVideoChange={(url) =>
                            setEditingExclusive({ ...activeExclusive, videoUrl: url })
                          }
                          mediaType={activeExclusive.mediaType || 'image'}
                          onMediaTypeChange={(type) =>
                            setEditingExclusive({ ...activeExclusive, mediaType: type })
                          }
                          allowVideo={true}
                        />
                      </div>

                      <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                        <div className="space-y-4">
                          <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F] pb-2 border-b border-slate-200">
                            3. Tarifa Referencial
                          </h3>
                          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 space-y-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                                Precio Desde ($ USD)
                              </label>
                              <input
                                type="number"
                                min={0}
                                value={activeExclusive.priceValue}
                                onChange={(e) =>
                                  setEditingExclusive({
                                    ...activeExclusive,
                                    priceValue: Number(e.target.value) || 0,
                                  })
                                }
                                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-base font-bold bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                                Unidad del Precio
                              </label>
                              <input
                                type="text"
                                value={activeExclusive.unit}
                                onChange={(e) =>
                                  setEditingExclusive({
                                    ...activeExclusive,
                                    unit: e.target.value,
                                  })
                                }
                                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-200 space-y-2">
                          <button
                            type="submit"
                            className="w-full py-3.5 px-5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                          >
                            <Save className="w-4 h-4" />
                            <span>
                              {isCreatingExclusive
                                ? 'Crear Formato Exclusivo'
                                : 'Guardar Apartado'}
                            </span>
                          </button>
                          {isCreatingExclusive && (
                            <button
                              type="button"
                              onClick={() => {
                                setIsCreatingExclusive(false);
                                setEditingExclusive(corporateExclusiveFormats[0] || null);
                              }}
                              className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                            >
                              Cancelar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                )}

                {/* Lista de los Apartados del Carrusel Formato Exclusivo */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                    Apartados en el Carrusel Formato Exclusivo ({corporateExclusiveFormats.length})
                  </span>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px]">
                    {corporateExclusiveFormats.map((pkg, idx) => (
                      <div
                        key={pkg.id}
                        className={`bg-white rounded-2xl border overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group ${
                          activeExclusive?.id === pkg.id && !isCreatingExclusive
                            ? 'ring-2 ring-[#C8A45D] border-transparent'
                            : 'border-slate-200/90'
                        }`}
                      >
                        <div>
                          <div className="relative aspect-square overflow-hidden bg-[#06150F]">
                            {pkg.mediaType === 'video' && pkg.videoUrl ? (
                              <video
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
                            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#06150F]/85 text-[#E2C585] text-[10px] font-bold">
                              #{idx + 1} · {pkg.highlightBadge || 'Exclusivo'}
                            </span>
                          </div>

                          <div className="p-4 space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A6823C] block">
                              {pkg.capacity}
                            </span>
                            <h3 className="font-serif-luxury font-bold text-lg text-[#06150F] leading-snug line-clamp-1">
                              {pkg.title}
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                              {pkg.description}
                            </p>
                          </div>
                        </div>

                        <div className="px-4 py-3 bg-[#FAF7F2] border-t border-slate-200/80 flex items-center justify-between">
                          <div>
                            <span className="font-serif-luxury font-bold text-xl text-[#06150F]">
                              ${pkg.priceValue}
                            </span>
                            <span className="text-[10px] text-slate-500 ml-1">{pkg.unit}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setIsCreatingExclusive(false);
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
                                    window.confirm(
                                      `¿Eliminar el apartado "${pkg.title}" del carrusel?`
                                    )
                                  ) {
                                    deleteCorporateExclusiveFormat(pkg.id);
                                    showToast('Apartado eliminado.');
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
              </div>
            )}

            {/* ===============================================================
                MÓDULO 6: GRANDES EVENTOS CORPORATIVOS (CARRUSEL HORIZONTAL)
               =============================================================== */}
            {activeTab === 'corp-grandes-eventos' && (
              <div className="space-y-[15px]">
                {/* Barra de control compacta superior */}
                <div className="flex flex-wrap items-center justify-between gap-2 bg-white/70 backdrop-blur-xs p-2.5 px-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C8A45D]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#06150F]">
                      {isCreatingCorpHighlight
                        ? 'Creando Nuevo Evento al Carrusel'
                        : `Editando: ${activeCorpHighlight?.title || 'Evento Corporativo'}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCreatingCorpHighlight ? (
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingCorpHighlight(false);
                          setEditingCorpHighlight(corporateHighlights[0] || null);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Cancelar</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleStartNewCorpHighlight}
                        className="px-3.5 py-1.5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ Nuevo Evento</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Los 3 Bloques de Edición (Comienzan a 15px) */}
                {activeCorpHighlight && (
                  <form onSubmit={handleSaveCorpHighlight} className="animate-fadeIn">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px] items-stretch">
                      <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                        <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F] pb-2 border-b border-slate-200">
                          1. Datos del Evento Corporativo
                        </h3>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Título del Evento <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={activeCorpHighlight.title}
                            onChange={(e) =>
                              setEditingCorpHighlight({
                                ...activeCorpHighlight,
                                title: e.target.value,
                              })
                            }
                            placeholder="Ej: Integraciones & Fiestas de Fin de Año"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Subtítulo / Descripción Breve
                          </label>
                          <textarea
                            rows={3}
                            value={activeCorpHighlight.subtitle}
                            onChange={(e) =>
                              setEditingCorpHighlight({
                                ...activeCorpHighlight,
                                subtitle: e.target.value,
                              })
                            }
                            placeholder="Ej: Cenas corporativas, música en vivo..."
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Métrica / Dato Destacado (En Dorado)
                          </label>
                          <input
                            type="text"
                            value={activeCorpHighlight.highlightMetric}
                            onChange={(e) =>
                              setEditingCorpHighlight({
                                ...activeCorpHighlight,
                                highlightMetric: e.target.value,
                              })
                            }
                            placeholder="Ej: Hasta 350+ pax / Desde $40 / pax"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-[#A6823C]"
                          />
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                        <AdminMediaUploader
                          imageUrl={activeCorpHighlight.image}
                          onImageChange={(url) =>
                            setEditingCorpHighlight({ ...activeCorpHighlight, image: url })
                          }
                          videoUrl={activeCorpHighlight.videoUrl || ''}
                          onVideoChange={(url) =>
                            setEditingCorpHighlight({ ...activeCorpHighlight, videoUrl: url })
                          }
                          mediaType={activeCorpHighlight.mediaType || 'image'}
                          onMediaTypeChange={(type) =>
                            setEditingCorpHighlight({ ...activeCorpHighlight, mediaType: type })
                          }
                          allowVideo={true}
                        />
                      </div>

                      <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                        <div className="space-y-4">
                          <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F] pb-2 border-b border-slate-200">
                            3. Vista Previa Circular y Guardar
                          </h3>
                          <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200 flex items-center gap-3.5">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#C8A45D] shrink-0 bg-[#06150F]">
                              {activeCorpHighlight.image && (
                                <img
                                  src={activeCorpHighlight.image}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-serif-luxury font-bold text-sm text-[#06150F] truncate">
                                {activeCorpHighlight.title || 'Título del Evento'}
                              </h4>
                              <span className="font-serif-luxury text-xs font-bold text-[#A6823C] block mt-0.5">
                                {activeCorpHighlight.highlightMetric}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-200 space-y-2">
                          <button
                            type="submit"
                            className="w-full py-3.5 px-5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                          >
                            <Save className="w-4 h-4" />
                            <span>
                              {isCreatingCorpHighlight
                                ? 'Crear Evento en Carrusel'
                                : 'Guardar en Carrusel'}
                            </span>
                          </button>
                          {isCreatingCorpHighlight && (
                            <button
                              type="button"
                              onClick={() => {
                                setIsCreatingCorpHighlight(false);
                                setEditingCorpHighlight(corporateHighlights[0] || null);
                              }}
                              className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                            >
                              Cancelar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                )}

                {/* Tarjetas Horizontales del Carrusel de Grandes Eventos */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                    Eventos en el Carrusel Horizontal ({corporateHighlights.length})
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
                    {corporateHighlights.map((item, idx) => (
                      <div
                        key={item.id}
                        className={`bg-white rounded-2xl p-4 border shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between gap-4 group ${
                          activeCorpHighlight?.id === item.id && !isCreatingCorpHighlight
                            ? 'ring-2 ring-[#C8A45D] border-transparent'
                            : 'border-slate-200/90'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-[#C8A45D]/50 shadow-xs bg-[#06150F]">
                            {item.mediaType === 'video' && item.videoUrl ? (
                              <video
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
                          </div>

                          <div className="space-y-1 min-w-0">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                              #{idx + 1} del Carrusel
                            </span>
                            <h3 className="font-serif-luxury font-bold text-base text-[#06150F] leading-snug truncate">
                              {item.title}
                            </h3>
                            <div className="font-serif-luxury text-sm font-bold text-[#A6823C]">
                              {item.highlightMetric}
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 truncate max-w-[140px]">
                            {item.whatsappItemName}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setIsCreatingCorpHighlight(false);
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
                                    showToast('Evento eliminado del carrusel.');
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
