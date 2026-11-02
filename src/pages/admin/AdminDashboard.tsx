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
  // ESTADOS DE EDICIÓN POR MÓDULO
  // =========================================================================

  // MÓDULO 2: HABITACIONES EMPRESAS Y GRUPOS
  const [editingCabin, setEditingCabin] = useState<CabinRoom | null>(null);
  const [isCreatingCabin, setIsCreatingCabin] = useState(false);

  // MÓDULO 3: SERVICIO DE ESTADÍA Y COMPLEMENTOS (1 GRANDE + 4 TARJETAS CON VIDEO)
  const [editingHeroBanner, setEditingHeroBanner] = useState<LodgingFeaturedBanner | null>(null);
  const [editingServiceCard, setEditingServiceCard] = useState<LodgingServiceCard | null>(null);
  const [isCreatingServiceCard, setIsCreatingServiceCard] = useState(false);

  // MÓDULO 4: PROPUESTAS NUPCIALES DESTACADAS (CARRUSEL BODAS)
  const [editingWedding, setEditingWedding] = useState<WeddingProposalCard | null>(null);
  const [isCreatingWedding, setIsCreatingWedding] = useState(false);

  // MÓDULO 5: FORMATO EXCLUSIVO CORPORATIVO (CARRUSEL 3+ APARTADOS)
  const [editingExclusive, setEditingExclusive] = useState<ServicePackage | null>(null);
  const [isCreatingExclusive, setIsCreatingExclusive] = useState(false);

  // MÓDULO 6: GRANDES EVENTOS CORPORATIVOS (MACROEVENTOS Y ENCUENTROS)
  const [editingCorpHighlight, setEditingCorpHighlight] = useState<CorporateHighlightItem | null>(
    null
  );
  const [isCreatingCorpHighlight, setIsCreatingCorpHighlight] = useState(false);

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
    if (!editingCabin || !editingCabin.name.trim()) return;
    if (isCreatingCabin) {
      const { id: _unusedId, ...rest } = editingCabin;
      void _unusedId;
      addCabin(rest);
      showToast('Nueva tarjeta agregada al carrusel de Habitaciones para Empresas y Grupos.');
    } else {
      updateCabin(editingCabin);
      showToast('Tarjeta de habitación actualizada correctamente.');
    }
    setEditingCabin(null);
    setIsCreatingCabin(false);
  };

  // =========================================================================
  // HANDLERS MÓDULO 3: SERVICIO DE ESTADÍA Y COMPLEMENTOS
  // =========================================================================
  const handleSaveHeroBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHeroBanner) return;
    updateLodgingHeroBanner(editingHeroBanner);
    setEditingHeroBanner(null);
    showToast('Tarjeta Principal "Operación Completa para Larga Estadía" actualizada.');
  };

  const handleStartNewServiceCard = () => {
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
    if (!editingServiceCard || !editingServiceCard.title.trim()) return;
    if (isCreatingServiceCard) {
      const { id: _unusedId, ...rest } = editingServiceCard;
      void _unusedId;
      addLodgingService(rest);
      showToast('Nueva tarjeta agregada a Servicio de Estadía y Complementos.');
    } else {
      updateLodgingService(editingServiceCard);
      showToast('Tarjeta de Servicio de Estadía actualizada.');
    }
    setEditingServiceCard(null);
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
    if (!editingWedding || !editingWedding.title.trim()) return;
    if (isCreatingWedding) {
      const { id: _unusedId, ...rest } = editingWedding;
      void _unusedId;
      addWeddingProposal(rest);
      showToast('Nueva propuesta agregada al carrusel de Bodas y Celebraciones.');
    } else {
      updateWeddingProposal(editingWedding);
      showToast('Propuesta nupcial actualizada correctamente.');
    }
    setEditingWedding(null);
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
    if (!editingExclusive || !editingExclusive.title.trim()) return;
    const updated: ServicePackage = {
      ...editingExclusive,
      priceLabel: `Desde $${editingExclusive.priceValue} USD`,
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
    setEditingExclusive(null);
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
    if (!editingCorpHighlight || !editingCorpHighlight.title.trim()) return;
    if (isCreatingCorpHighlight) {
      const { id: _unusedId, ...rest } = editingCorpHighlight;
      void _unusedId;
      addCorporateHighlight(rest);
      showToast('Nueva tarjeta agregada al carrusel de Grandes Eventos Corporativos.');
    } else {
      updateCorporateHighlight(editingCorpHighlight);
      showToast('Tarjeta de Grandes Eventos Corporativos actualizada.');
    }
    setEditingCorpHighlight(null);
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
    <div className="min-h-screen bg-[#F5F2EB] flex flex-col md:flex-row font-sans-ui text-[#06150F]">
      {/* =================================================================
          PANEL LATERAL IZQUIERDO (SIDEBAR)
         ================================================================= */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setEditingCabin(null);
          setEditingHeroBanner(null);
          setEditingServiceCard(null);
          setEditingWedding(null);
          setEditingExclusive(null);
          setEditingCorpHighlight(null);
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
          PANEL DERECHO: BARRA SUPERIOR CON BOTÓN REGRESAR + MÓDULO ACTIVO
         ================================================================= */}
      <main className="flex-1 min-w-0 flex flex-col justify-between min-h-screen overflow-y-auto">
        <div>
          {/* BARRA SUPERIOR ("ARRIBA EL FOOTER CON BOTONCITO DE REGRESAR") */}
          <header className="sticky top-0 z-20 bg-[#06150F] text-[#FAF7F2] border-b border-[#C8A45D]/30 px-5 sm:px-8 py-3.5 shadow-md flex flex-wrap items-center justify-between gap-3">
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

          {/* NOTIFICACIÓN FLOTANTE DE ÉXITO */}
          {toastMsg && (
            <div className="mx-5 sm:mx-8 mt-5 p-4 rounded-2xl bg-[#06150F] text-white border border-[#C8A45D] shadow-xl flex items-center justify-between animate-fadeIn">
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

          {/* CONTENEDOR DEL MÓDULO ACTIVO */}
          <div className="p-5 sm:p-8 lg:p-10 max-w-7xl mx-auto space-y-8">
            {/* ===============================================================
                MÓDULO 1: MI PERFIL
               =============================================================== */}
            {activeTab === 'profile' && <AdminProfileSection />}

            {/* ===============================================================
                MÓDULO 2: CARRUSEL HABITACIONES PARA EMPRESAS Y GRUPOS
               =============================================================== */}
            {activeTab === 'habitaciones' && (
              <div className="space-y-6">
                {/* Encabezado del Módulo */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A45D]/15 text-[#8A6B2D] text-xs font-bold uppercase tracking-wider mb-2">
                      <BedDouble className="w-3.5 h-3.5" />
                      <span>Página: Hospedaje Empresas y Grupos · Sección Carrusel</span>
                    </div>
                    <h1 className="font-serif-luxury font-bold text-2xl sm:text-3xl text-[#06150F]">
                      Habitaciones para Empresas y Grupos
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                      Edite las tarjetas actuales del carrusel o agregue nuevas opciones de alojamiento corporativo y grupal.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleStartNewCabin}
                    className="px-5 py-3 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-sans-ui font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all shrink-0 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar Nueva Tarjeta al Carrusel</span>
                  </button>
                </div>

                {/* Formulario de Edición / Creación en 3 Columnas */}
                {editingCabin && (
                  <div className="bg-white rounded-3xl shadow-lg border-2 border-[#C8A45D]/50 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#06150F] to-[#13281F] px-6 py-4 flex items-center justify-between text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#C8A45D] text-[#06150F] flex items-center justify-center font-bold">
                          <BedDouble className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#E2C585] block">
                            {isCreatingCabin ? 'Crear Nueva Tarjeta' : 'Editando Tarjeta del Carrusel'}
                          </span>
                          <h2 className="font-serif-luxury font-bold text-lg text-white">
                            {editingCabin.name || 'Nueva Habitación / Suite'}
                          </h2>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCabin(null);
                          setIsCreatingCabin(false);
                        }}
                        className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveCabin} className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                        {/* COLUMNA 1: INFORMACIÓN DE LA TARJETA */}
                        <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
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
                              value={editingCabin.name}
                              onChange={(e) =>
                                setEditingCabin({ ...editingCabin, name: e.target.value })
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
                                value={editingCabin.type}
                                onChange={(e) =>
                                  setEditingCabin({ ...editingCabin, type: e.target.value })
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
                                value={editingCabin.bathrooms}
                                onChange={(e) =>
                                  setEditingCabin({
                                    ...editingCabin,
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
                              value={editingCabin.capacity}
                              onChange={(e) =>
                                setEditingCabin({ ...editingCabin, capacity: e.target.value })
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
                              value={editingCabin.beds}
                              onChange={(e) =>
                                setEditingCabin({ ...editingCabin, beds: e.target.value })
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
                              value={editingCabin.description}
                              onChange={(e) =>
                                setEditingCabin({ ...editingCabin, description: e.target.value })
                              }
                              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs text-[#06150F] resize-none"
                            />
                          </div>
                        </div>

                        {/* COLUMNA 2: MULTIMEDIA WEBP / VIDEO */}
                        <AdminMediaUploader
                          imageUrl={editingCabin.image}
                          onImageChange={(url) => setEditingCabin({ ...editingCabin, image: url })}
                          videoUrl={editingCabin.videoUrl || ''}
                          onVideoChange={(url) =>
                            setEditingCabin({ ...editingCabin, videoUrl: url })
                          }
                          mediaType={editingCabin.mediaType || 'image'}
                          onMediaTypeChange={(type) =>
                            setEditingCabin({ ...editingCabin, mediaType: type })
                          }
                          allowVideo={true}
                        />

                        {/* COLUMNA 3: PRECIO Y PUBLICACIÓN */}
                        <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                              <DollarSign className="w-4 h-4 text-[#A6823C]" />
                              <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F]">
                                3. Tarifa y Publicación
                              </h3>
                            </div>

                            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#06150F]">
                                  Mostrar Precio en la Tarjeta
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setEditingCabin({
                                      ...editingCabin,
                                      showPrice: editingCabin.showPrice === false ? true : false,
                                    })
                                  }
                                  className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                                    editingCabin.showPrice !== false
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : 'bg-slate-200 text-slate-600'
                                  }`}
                                >
                                  {editingCabin.showPrice !== false ? (
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
                                    value={editingCabin.pricePerNight}
                                    onChange={(e) =>
                                      setEditingCabin({
                                        ...editingCabin,
                                        pricePerNight: Number(e.target.value) || 0,
                                      })
                                    }
                                    className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-200 text-base font-bold text-[#06150F]"
                                  />
                                </div>
                                <span className="text-[11px] text-slate-400 block mt-1">
                                  Se mostrará como: <strong>${editingCabin.pricePerNight}</strong> / ref. (desc. larga estadía)
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-200 space-y-2.5">
                            <button
                              type="submit"
                              className="w-full py-3.5 px-5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-sans-ui font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                            >
                              <Save className="w-4 h-4" />
                              <span>
                                {isCreatingCabin ? 'Crear Tarjeta en Carrusel' : 'Guardar Cambios'}
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingCabin(null);
                                setIsCreatingCabin(false);
                              }}
                              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-600 font-bold text-xs border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Cancelar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {/* Grilla de Tarjetas Actuales del Carrusel */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                  {cabins.map((cabin, idx) => (
                    <div
                      key={cabin.id}
                      className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="relative h-48 overflow-hidden bg-[#06150F]">
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
                          <div className="absolute top-3 left-3 flex items-center gap-1.5">
                            <span className="px-2.5 py-1 rounded-full bg-[#06150F]/85 text-[#E2C585] text-[10px] font-bold">
                              #{idx + 1} · {cabin.type}
                            </span>
                            {cabin.mediaType === 'video' && (
                              <span className="px-2 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1">
                                <Video className="w-3 h-3" /> Video
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="p-5 space-y-3">
                          <h3 className="font-serif-luxury font-bold text-lg text-[#06150F] leading-snug">
                            {cabin.name}
                          </h3>
                          <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-2.5">
                            <div className="flex items-start gap-2">
                              <Users className="w-3.5 h-3.5 text-[#A6823C] shrink-0 mt-0.5" />
                              <span>
                                <strong>Capacidad:</strong> {cabin.capacity}
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <BedDouble className="w-3.5 h-3.5 text-[#A6823C] shrink-0 mt-0.5" />
                              <span>
                                <strong>Camas:</strong> {cabin.beds}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Bath className="w-3.5 h-3.5 text-[#A6823C] shrink-0" />
                              <span>
                                <strong>Baños:</strong> {cabin.bathrooms}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="px-5 py-4 bg-[#FAF7F2] border-t border-slate-200/80 flex items-center justify-between">
                        <div>
                          {cabin.showPrice !== false ? (
                            <span className="font-serif-luxury font-bold text-xl text-[#06150F]">
                              ${cabin.pricePerNight}
                              <span className="text-[11px] font-sans-ui font-normal text-slate-500">
                                {' '}
                                / ref.
                              </span>
                            </span>
                          ) : (
                            <span className="text-xs font-semibold text-slate-400 italic">
                              Precio oculto
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
                            className="px-3 py-1.5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
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
                              className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                              title="Eliminar tarjeta"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===============================================================
                MÓDULO 3: SERVICIO DE ESTADÍA Y COMPLEMENTOS (1 GRANDE + 4 TARJETAS CON VIDEO)
               =============================================================== */}
            {activeTab === 'servicios-estadia' && (
              <div className="space-y-6">
                {/* Encabezado del Módulo */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                      <Waves className="w-3.5 h-3.5" />
                      <span>Página: Hospedaje · Sección Servicio de Estadía y Complementos (Videos)</span>
                    </div>
                    <h1 className="font-serif-luxury font-bold text-2xl sm:text-3xl text-[#06150F]">
                      Servicio de Estadía y Complementos
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                      Gestione a la izquierda la <strong>Tarjeta Principal Grande ("Operación Completa para Larga Estadía")</strong> con su video, y a la derecha las <strong>4 Tarjetas de Servicios y Complementos</strong> (también con soporte de video o imagen).
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleStartNewServiceCard}
                    className="px-5 py-3 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-sans-ui font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all shrink-0 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar Tarjeta de Servicio</span>
                  </button>
                </div>

                {/* MODAL / FORMULARIO PARA EDITAR LA TARJETA PRINCIPAL GRANDE */}
                {editingHeroBanner && (
                  <div className="bg-white rounded-3xl shadow-lg border-2 border-[#C8A45D] overflow-hidden">
                    <div className="bg-gradient-to-r from-[#06150F] to-[#13281F] px-6 py-4 flex items-center justify-between text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#C8A45D] text-[#06150F] flex items-center justify-center font-bold">
                          <Video className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#E2C585] block">
                            Editando Tarjeta Principal Grande (Con Video)
                          </span>
                          <h2 className="font-serif-luxury font-bold text-lg text-white">
                            {editingHeroBanner.titleLine1} {editingHeroBanner.titleLine2}
                          </h2>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingHeroBanner(null)}
                        className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveHeroBanner} className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
                          <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F] pb-2 border-b border-slate-200">
                            1. Textos de la Tarjeta Principal
                          </h3>
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
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
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
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Título Cursiva Dorada (Línea 2)
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
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Descripción
                            </label>
                            <textarea
                              rows={3}
                              value={editingHeroBanner.description}
                              onChange={(e) =>
                                setEditingHeroBanner({
                                  ...editingHeroBanner,
                                  description: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs resize-none"
                            />
                          </div>
                        </div>

                        <AdminMediaUploader
                          imageUrl={editingHeroBanner.image}
                          onImageChange={(url) =>
                            setEditingHeroBanner({ ...editingHeroBanner, image: url })
                          }
                          videoUrl={editingHeroBanner.videoUrl || ''}
                          onVideoChange={(url) =>
                            setEditingHeroBanner({ ...editingHeroBanner, videoUrl: url })
                          }
                          mediaType={editingHeroBanner.mediaType}
                          onMediaTypeChange={(type) =>
                            setEditingHeroBanner({ ...editingHeroBanner, mediaType: type })
                          }
                          allowVideo={true}
                          label="2. Video Principal o Imagen de Portada"
                        />

                        <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
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
                                value={editingHeroBanner.videoButtonText}
                                onChange={(e) =>
                                  setEditingHeroBanner({
                                    ...editingHeroBanner,
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
                                value={editingHeroBanner.locationBadge}
                                onChange={(e) =>
                                  setEditingHeroBanner({
                                    ...editingHeroBanner,
                                    locationBadge: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                              />
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-200 space-y-2">
                            <button
                              type="submit"
                              className="w-full py-3.5 px-5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <Save className="w-4 h-4" />
                              <span>Guardar Tarjeta Principal</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingHeroBanner(null)}
                              className="w-full py-2.5 px-4 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 cursor-pointer"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {/* FORMULARIO PARA EDITAR / CREAR UNA DE LAS 4 TARJETAS DE SERVICIO */}
                {editingServiceCard && (
                  <div className="bg-white rounded-3xl shadow-lg border-2 border-[#C8A45D] overflow-hidden">
                    <div className="bg-gradient-to-r from-[#06150F] to-[#13281F] px-6 py-4 flex items-center justify-between text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#C8A45D] text-[#06150F] flex items-center justify-center font-bold">
                          <Waves className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#E2C585] block">
                            {isCreatingServiceCard
                              ? 'Nueva Tarjeta de Servicio y Complemento'
                              : 'Editando Tarjeta de Servicio y Complemento'}
                          </span>
                          <h2 className="font-serif-luxury font-bold text-lg text-white">
                            {editingServiceCard.title || 'Nueva Tarjeta'}
                          </h2>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingServiceCard(null);
                          setIsCreatingServiceCard(false);
                        }}
                        className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveServiceCard} className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
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
                              value={editingServiceCard.title}
                              onChange={(e) =>
                                setEditingServiceCard({
                                  ...editingServiceCard,
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
                              value={editingServiceCard.badge}
                              onChange={(e) =>
                                setEditingServiceCard({
                                  ...editingServiceCard,
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
                              value={editingServiceCard.description}
                              onChange={(e) =>
                                setEditingServiceCard({
                                  ...editingServiceCard,
                                  description: e.target.value,
                                })
                              }
                              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs resize-none"
                            />
                          </div>
                        </div>

                        <AdminMediaUploader
                          imageUrl={editingServiceCard.image}
                          onImageChange={(url) =>
                            setEditingServiceCard({ ...editingServiceCard, image: url })
                          }
                          videoUrl={editingServiceCard.videoUrl || ''}
                          onVideoChange={(url) =>
                            setEditingServiceCard({ ...editingServiceCard, videoUrl: url })
                          }
                          mediaType={editingServiceCard.mediaType}
                          onMediaTypeChange={(type) =>
                            setEditingServiceCard({ ...editingServiceCard, mediaType: type })
                          }
                          allowVideo={true}
                          label="2. Video o Imagen de la Tarjeta"
                        />

                        <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
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
                                value={editingServiceCard.ctaText}
                                onChange={(e) =>
                                  setEditingServiceCard({
                                    ...editingServiceCard,
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
                                value={editingServiceCard.itemName}
                                onChange={(e) =>
                                  setEditingServiceCard({
                                    ...editingServiceCard,
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
                              className="w-full py-3.5 px-5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <Save className="w-4 h-4" />
                              <span>Guardar Tarjeta</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingServiceCard(null);
                                setIsCreatingServiceCard(false);
                              }}
                              className="w-full py-2.5 px-4 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 cursor-pointer"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {/* DISPOSICIÓN IDÉNTICA A LA PÁGINA PÚBLICA:
                    IZQUIERDA (5 cols): 1RA TARJETA GRANDE "OPERACIÓN COMPLETA PARA LARGA ESTADÍA" (CON VIDEO)
                    DERECHA (7 cols): LAS 4 TARJETAS DE SERVICIOS Y COMPLEMENTOS (CON VIDEO/IMAGEN) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  {/* PRIMERA TARJETA GRANDE CON VIDEO */}
                  <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[460px] flex flex-col justify-between p-7 bg-[#06150F] border-2 border-[#C8A45D]/50 shadow-xl group">
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
                      <span className="px-3 py-1 rounded-full bg-[#C8A45D] text-[#06150F] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                        <Play className="w-3 h-3 fill-current" />
                        1ra Tarjeta Grande · Video Principal
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingHeroBanner(lodgingHeroBanner);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-3.5 py-2 rounded-xl bg-white text-[#06150F] hover:bg-[#E2C585] text-xs font-bold flex items-center gap-1.5 shadow-lg cursor-pointer transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Editar Video y Textos</span>
                      </button>
                    </div>

                    <div className="relative z-10 space-y-3 mt-auto pt-12">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#E2C585] font-bold block">
                        {lodgingHeroBanner.overline}
                      </span>
                      <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white leading-tight">
                        {lodgingHeroBanner.titleLine1}{' '}
                        <span className="italic font-light text-[#E2C585]">
                          {lodgingHeroBanner.titleLine2}
                        </span>
                      </h3>
                      <p className="text-xs text-white/85 leading-relaxed">
                        {lodgingHeroBanner.description}
                      </p>
                      <div className="pt-2 flex items-center justify-between text-[11px] text-[#E2C585] font-semibold border-t border-white/15">
                        <span>{lodgingHeroBanner.videoButtonText}</span>
                        <span className="truncate max-w-[200px] opacity-80">
                          Video: {lodgingHeroBanner.videoUrl || 'Sin archivo'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* LAS 4+ TARJETAS AL LADO DERECHO (TAMBIÉN CON SOPORTE DE VIDEO) */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {lodgingServices.map((card, idx) => (
                      <div
                        key={card.id}
                        className="relative rounded-2xl overflow-hidden min-h-[225px] flex flex-col justify-between p-5 bg-[#06150F] border border-slate-200/60 shadow-md group"
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
                          <span className="px-2.5 py-1 rounded-full bg-[#06150F]/85 text-[#E2C585] border border-[#C8A45D]/40 text-[10px] font-bold flex items-center gap-1">
                            {card.mediaType === 'video' ? (
                              <Video className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <ImageIcon className="w-3 h-3 text-[#E2C585]" />
                            )}
                            <span>
                              Tarjeta #{idx + 1} · {card.badge}
                            </span>
                          </span>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                setIsCreatingServiceCard(false);
                                setEditingServiceCard(card);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="px-2.5 py-1.5 rounded-xl bg-white text-[#06150F] hover:bg-[#E2C585] text-[11px] font-bold flex items-center gap-1 shadow cursor-pointer"
                            >
                              <Pencil className="w-3 h-3" />
                              <span>Editar / Video</span>
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
                                className="p-1.5 rounded-xl bg-red-600/90 hover:bg-red-600 text-white shadow cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="relative z-10 mt-auto pt-8">
                          <h4 className="font-serif-luxury text-lg text-white font-bold">
                            {card.title}
                          </h4>
                          <p className="text-[11px] text-white/80 line-clamp-2 mt-1">
                            {card.description}
                          </p>
                          <span className="mt-2 inline-block text-[10px] font-bold uppercase tracking-wider text-[#E2C585]">
                            {card.ctaText}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ===============================================================
                MÓDULO 4: BODAS Y CELEBRACIONES — PROPUESTAS NUPCIALES DESTACADAS
               =============================================================== */}
            {activeTab === 'bodas-propuestas' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A45D]/15 text-[#8A6B2D] text-xs font-bold uppercase tracking-wider mb-2">
                      <Heart className="w-3.5 h-3.5" />
                      <span>Página: Bodas y Celebraciones · Carrusel Servicios y Paquetes Nupciales</span>
                    </div>
                    <h1 className="font-serif-luxury font-bold text-2xl sm:text-3xl text-[#06150F]">
                      Propuestas Nupciales Destacadas
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                      Edite las tarjetas del carrusel de Servicios y Paquetes Nupciales o cree nuevas propuestas para bodas y celebraciones.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleStartNewWedding}
                    className="px-5 py-3 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-sans-ui font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all shrink-0 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Crear Nueva Tarjeta Nupcial</span>
                  </button>
                </div>

                {/* Formulario de Edición / Creación */}
                {editingWedding && (
                  <div className="bg-white rounded-3xl shadow-lg border-2 border-[#C8A45D] overflow-hidden">
                    <div className="bg-gradient-to-r from-[#06150F] to-[#13281F] px-6 py-4 flex items-center justify-between text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#C8A45D] text-[#06150F] flex items-center justify-center font-bold">
                          <Heart className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#E2C585] block">
                            {isCreatingWedding
                              ? 'Nueva Propuesta Nupcial'
                              : 'Editando Propuesta Nupcial'}
                          </span>
                          <h2 className="font-serif-luxury font-bold text-lg text-white">
                            {editingWedding.title || 'Nuevo Paquete de Bodas'}
                          </h2>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingWedding(null);
                          setIsCreatingWedding(false);
                        }}
                        className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveWedding} className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
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
                              value={editingWedding.title}
                              onChange={(e) =>
                                setEditingWedding({ ...editingWedding, title: e.target.value })
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
                              value={editingWedding.subtitle}
                              onChange={(e) =>
                                setEditingWedding({ ...editingWedding, subtitle: e.target.value })
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
                              value={editingWedding.badge}
                              onChange={(e) =>
                                setEditingWedding({ ...editingWedding, badge: e.target.value })
                              }
                              placeholder="Ej: Más Solicitado"
                              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                            />
                          </div>

                          <div className="space-y-2 pt-1">
                            <label className="block text-[11px] font-bold text-slate-700 uppercase">
                              Características / Puntos Clave (3 líneas)
                            </label>
                            {[0, 1, 2].map((specIdx) => (
                              <input
                                key={specIdx}
                                type="text"
                                value={editingWedding.specs[specIdx]?.label || ''}
                                onChange={(e) => {
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
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs"
                              />
                            ))}
                          </div>
                        </div>

                        <AdminMediaUploader
                          imageUrl={editingWedding.image}
                          onImageChange={(url) =>
                            setEditingWedding({ ...editingWedding, image: url })
                          }
                          videoUrl={editingWedding.videoUrl || ''}
                          onVideoChange={(url) =>
                            setEditingWedding({ ...editingWedding, videoUrl: url })
                          }
                          mediaType={editingWedding.mediaType || 'image'}
                          onMediaTypeChange={(type) =>
                            setEditingWedding({ ...editingWedding, mediaType: type })
                          }
                          allowVideo={true}
                        />

                        <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
                          <div className="space-y-4">
                            <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F] pb-2 border-b border-slate-200">
                              3. Precio y Unidad
                            </h3>
                            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                              <div>
                                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                                  Precio Destacado (Ej: $70, $980, $35)
                                </label>
                                <input
                                  type="text"
                                  value={editingWedding.price}
                                  onChange={(e) =>
                                    setEditingWedding({ ...editingWedding, price: e.target.value })
                                  }
                                  placeholder="$70"
                                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-base font-bold"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                                  Unidad / Detalle del Precio
                                </label>
                                <input
                                  type="text"
                                  value={editingWedding.unit}
                                  onChange={(e) =>
                                    setEditingWedding({ ...editingWedding, unit: e.target.value })
                                  }
                                  placeholder="/ persona · ref."
                                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-200 space-y-2">
                            <button
                              type="submit"
                              className="w-full py-3.5 px-5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <Save className="w-4 h-4" />
                              <span>Guardar Propuesta Nupcial</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingWedding(null);
                                setIsCreatingWedding(false);
                              }}
                              className="w-full py-2.5 px-4 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 cursor-pointer"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {/* Grilla de Tarjetas del Carrusel de Propuestas Nupciales */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                  {weddingProposals.map((item, idx) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="relative h-48 overflow-hidden bg-[#06150F]">
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
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#06150F]/85 text-[#E2C585] text-[10px] font-bold">
                            #{idx + 1} · {item.badge}
                          </span>
                        </div>

                        <div className="p-5 space-y-3">
                          <h3 className="font-serif-luxury font-bold text-lg text-[#06150F] leading-snug">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-500">{item.subtitle}</p>
                          <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                            {item.specs.map((spec, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D] mt-1.5 shrink-0" />
                                <span>{spec.label}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="px-5 py-4 bg-[#FAF7F2] border-t border-slate-200/80 flex items-center justify-between">
                        <div>
                          <span className="font-serif-luxury font-bold text-xl text-[#06150F]">
                            {item.price}
                          </span>
                          <span className="text-[11px] text-slate-500 ml-1">{item.unit}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setIsCreatingWedding(false);
                              setEditingWedding(item);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-3 py-1.5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
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
                              className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===============================================================
                MÓDULO 5: GRANDES EVENTOS Y CORPORATIVOS — FORMATO EXCLUSIVO
               =============================================================== */}
            {activeTab === 'corp-formato-exclusivo' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A45D]/15 text-[#8A6B2D] text-xs font-bold uppercase tracking-wider mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Página: Grandes Eventos y Corporativos · Carrusel Formato Exclusivo</span>
                    </div>
                    <h1 className="font-serif-luxury font-bold text-2xl sm:text-3xl text-[#06150F]">
                      Formato Exclusivo Corporativo (Carrusel)
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                      Edite los 3 apartados del carrusel de Formato Exclusivo o agregue nuevos formatos empresariales.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleStartNewExclusive}
                    className="px-5 py-3 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-sans-ui font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all shrink-0 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar Apartado al Carrusel</span>
                  </button>
                </div>

                {editingExclusive && (
                  <div className="bg-white rounded-3xl shadow-lg border-2 border-[#C8A45D] overflow-hidden">
                    <div className="bg-gradient-to-r from-[#06150F] to-[#13281F] px-6 py-4 flex items-center justify-between text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#C8A45D] text-[#06150F] flex items-center justify-center font-bold">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#E2C585] block">
                            {isCreatingExclusive
                              ? 'Nuevo Apartado Formato Exclusivo'
                              : 'Editando Apartado de Formato Exclusivo'}
                          </span>
                          <h2 className="font-serif-luxury font-bold text-lg text-white">
                            {editingExclusive.title || 'Nuevo Formato Corporativo'}
                          </h2>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingExclusive(null);
                          setIsCreatingExclusive(false);
                        }}
                        className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveExclusive} className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="space-y-3.5 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
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
                              value={editingExclusive.title}
                              onChange={(e) =>
                                setEditingExclusive({ ...editingExclusive, title: e.target.value })
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
                                value={editingExclusive.capacity}
                                onChange={(e) =>
                                  setEditingExclusive({
                                    ...editingExclusive,
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
                                value={editingExclusive.highlightBadge || ''}
                                onChange={(e) =>
                                  setEditingExclusive({
                                    ...editingExclusive,
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
                              value={editingExclusive.setupInfo}
                              onChange={(e) =>
                                setEditingExclusive({
                                  ...editingExclusive,
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
                              value={editingExclusive.description}
                              onChange={(e) =>
                                setEditingExclusive({
                                  ...editingExclusive,
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
                              rows={4}
                              value={editingExclusive.inclusions.join('\n')}
                              onChange={(e) =>
                                setEditingExclusive({
                                  ...editingExclusive,
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

                        <AdminMediaUploader
                          imageUrl={editingExclusive.image}
                          onImageChange={(url) =>
                            setEditingExclusive({ ...editingExclusive, image: url })
                          }
                          videoUrl={editingExclusive.videoUrl || ''}
                          onVideoChange={(url) =>
                            setEditingExclusive({ ...editingExclusive, videoUrl: url })
                          }
                          mediaType={editingExclusive.mediaType || 'image'}
                          onMediaTypeChange={(type) =>
                            setEditingExclusive({ ...editingExclusive, mediaType: type })
                          }
                          allowVideo={true}
                        />

                        <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
                          <div className="space-y-4">
                            <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F] pb-2 border-b border-slate-200">
                              3. Tarifa Referencial
                            </h3>
                            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                              <div>
                                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                                  Precio Desde ($ USD)
                                </label>
                                <input
                                  type="number"
                                  min={0}
                                  value={editingExclusive.priceValue}
                                  onChange={(e) =>
                                    setEditingExclusive({
                                      ...editingExclusive,
                                      priceValue: Number(e.target.value) || 0,
                                    })
                                  }
                                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-base font-bold"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                                  Unidad del Precio
                                </label>
                                <input
                                  type="text"
                                  value={editingExclusive.unit}
                                  onChange={(e) =>
                                    setEditingExclusive({
                                      ...editingExclusive,
                                      unit: e.target.value,
                                    })
                                  }
                                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-200 space-y-2">
                            <button
                              type="submit"
                              className="w-full py-3.5 px-5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <Save className="w-4 h-4" />
                              <span>Guardar Apartado</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingExclusive(null);
                                setIsCreatingExclusive(false);
                              }}
                              className="w-full py-2.5 px-4 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 cursor-pointer"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {/* Lista de los Apartados del Carrusel Formato Exclusivo */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {corporateExclusiveFormats.map((pkg, idx) => (
                    <div
                      key={pkg.id}
                      className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="relative h-52 overflow-hidden bg-[#06150F]">
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
                          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#06150F]/85 text-[#E2C585] text-[10px] font-bold">
                            Apartado #{idx + 1} · {pkg.highlightBadge || 'Formato Exclusivo'}
                          </span>
                        </div>

                        <div className="p-6 space-y-3">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#A6823C] block">
                            {pkg.capacity}
                          </span>
                          <h3 className="font-serif-luxury font-bold text-xl text-[#06150F] leading-snug">
                            {pkg.title}
                          </h3>
                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                            {pkg.description}
                          </p>
                          <div className="pt-2 border-t border-slate-100">
                            <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1.5">
                              Incluye ({pkg.inclusions.length} ítems):
                            </span>
                            <ul className="space-y-1 text-xs text-slate-600">
                              {pkg.inclusions.slice(0, 3).map((inc, i) => (
                                <li key={i} className="truncate">
                                  • {inc}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="px-6 py-4 bg-[#FAF7F2] border-t border-slate-200/80 flex items-center justify-between">
                        <div>
                          <span className="font-serif-luxury font-bold text-2xl text-[#06150F]">
                            ${pkg.priceValue}
                          </span>
                          <span className="text-[11px] text-slate-500 block">{pkg.unit}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setIsCreatingExclusive(false);
                              setEditingExclusive(pkg);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-3.5 py-2 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
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
                              className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===============================================================
                MÓDULO 6: GRANDES EVENTOS CORPORATIVOS — MACROEVENTOS Y ENCUENTROS (CARRUSEL)
               =============================================================== */}
            {activeTab === 'corp-grandes-eventos' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A45D]/15 text-[#8A6B2D] text-xs font-bold uppercase tracking-wider mb-2">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>
                        Página: Grandes Eventos y Corporativos · Macroeventos y Encuentros Empresariales
                      </span>
                    </div>
                    <h1 className="font-serif-luxury font-bold text-2xl sm:text-3xl text-[#06150F]">
                      Grandes Eventos Corporativos (Carrusel Horizontal)
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                      Edite los eventos empresariales existentes o agregue nuevos ítems para que se desplieguen en formato carrusel horizontal en la página corporativa.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleStartNewCorpHighlight}
                    className="px-5 py-3 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-sans-ui font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all shrink-0 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar Evento al Carrusel</span>
                  </button>
                </div>

                {editingCorpHighlight && (
                  <div className="bg-white rounded-3xl shadow-lg border-2 border-[#C8A45D] overflow-hidden">
                    <div className="bg-gradient-to-r from-[#06150F] to-[#13281F] px-6 py-4 flex items-center justify-between text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#C8A45D] text-[#06150F] flex items-center justify-center font-bold">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#E2C585] block">
                            {isCreatingCorpHighlight
                              ? 'Nuevo Evento en Carrusel'
                              : 'Editando Evento Corporativo'}
                          </span>
                          <h2 className="font-serif-luxury font-bold text-lg text-white">
                            {editingCorpHighlight.title || 'Nuevo Macroevento Empresarial'}
                          </h2>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCorpHighlight(null);
                          setIsCreatingCorpHighlight(false);
                        }}
                        className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveCorpHighlight} className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
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
                              value={editingCorpHighlight.title}
                              onChange={(e) =>
                                setEditingCorpHighlight({
                                  ...editingCorpHighlight,
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
                              value={editingCorpHighlight.subtitle}
                              onChange={(e) =>
                                setEditingCorpHighlight({
                                  ...editingCorpHighlight,
                                  subtitle: e.target.value,
                                })
                              }
                              placeholder="Ej: Cenas corporativas, música en vivo, parrilladas gourmet..."
                              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs resize-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Métrica / Dato Destacado (En Dorado)
                            </label>
                            <input
                              type="text"
                              value={editingCorpHighlight.highlightMetric}
                              onChange={(e) =>
                                setEditingCorpHighlight({
                                  ...editingCorpHighlight,
                                  highlightMetric: e.target.value,
                                })
                              }
                              placeholder="Ej: Hasta 350+ pax / Desde $40 / pax"
                              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-[#A6823C]"
                            />
                          </div>
                        </div>

                        <AdminMediaUploader
                          imageUrl={editingCorpHighlight.image}
                          onImageChange={(url) =>
                            setEditingCorpHighlight({ ...editingCorpHighlight, image: url })
                          }
                          videoUrl={editingCorpHighlight.videoUrl || ''}
                          onVideoChange={(url) =>
                            setEditingCorpHighlight({ ...editingCorpHighlight, videoUrl: url })
                          }
                          mediaType={editingCorpHighlight.mediaType || 'image'}
                          onMediaTypeChange={(type) =>
                            setEditingCorpHighlight({ ...editingCorpHighlight, mediaType: type })
                          }
                          allowVideo={true}
                        />

                        <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
                          <div className="space-y-4">
                            <h3 className="font-sans-ui font-bold text-xs sm:text-sm uppercase text-[#06150F] pb-2 border-b border-slate-200">
                              3. Vista Previa Circular y Acción
                            </h3>
                            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
                              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#C8A45D] shrink-0 bg-[#06150F]">
                                {editingCorpHighlight.image && (
                                  <img
                                    src={editingCorpHighlight.image}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-serif-luxury font-bold text-base text-[#06150F] truncate">
                                  {editingCorpHighlight.title || 'Título del Evento'}
                                </h4>
                                <p className="text-[11px] text-slate-500 line-clamp-2">
                                  {editingCorpHighlight.subtitle || 'Subtítulo descriptivo'}
                                </p>
                                <span className="font-serif-luxury text-sm font-bold text-[#A6823C] block mt-1">
                                  {editingCorpHighlight.highlightMetric}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-200 space-y-2">
                            <button
                              type="submit"
                              className="w-full py-3.5 px-5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <Save className="w-4 h-4" />
                              <span>Guardar en Carrusel</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingCorpHighlight(null);
                                setIsCreatingCorpHighlight(false);
                              }}
                              className="w-full py-2.5 px-4 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 cursor-pointer"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {/* Tarjetas Horizontales del Carrusel de Grandes Eventos Corporativos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {corporateHighlights.map((item, idx) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between gap-5 group"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 border-2 border-[#C8A45D]/50 shadow-md bg-[#06150F]">
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
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          )}
                        </div>

                        <div className="space-y-1.5 min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Ítem #{idx + 1} del Carrusel
                          </span>
                          <h3 className="font-serif-luxury font-bold text-xl text-[#06150F] leading-snug">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                            {item.subtitle}
                          </p>
                          <div className="pt-1 font-serif-luxury text-lg font-bold text-[#A6823C]">
                            {item.highlightMetric}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 truncate max-w-[180px]">
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
                            className="px-3.5 py-1.5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
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
                              className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PIE DEL PANEL DERECHO */}
        <footer className="bg-white border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
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
  );
};
