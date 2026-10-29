import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Users,
  DollarSign,
  BedDouble,
  Image as ImageIcon,
  Settings,
  CheckCircle2,
  Trash2,
  Plus,
  MessageCircle,
  Mail,
  RotateCcw,
  Lock,
  ExternalLink,
  Download,
  Sparkles,
  Save,
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { LeadStatus, EventPhoto, ServiceCategory } from '../types/cms';
import { useDocumentMeta } from '../utils/seo';

const LEAD_STATUSES: LeadStatus[] = [
  'Nuevo',
  'Contactado',
  'Calificado',
  'Visita Agendada',
  'Propuesta Enviada',
  'Confirmado',
];

export const AdminCMSPage: React.FC = () => {
  const {
    siteConfig,
    packages,
    cabins,
    photos,
    leads,
    updateSiteConfig,
    updatePackage,
    addPackage,
    deletePackage,
    updateCabin,
    addCabin,
    deleteCabin,
    addPhoto,
    deletePhoto,
    togglePhotoFeatured,
    updateLeadStatus,
    deleteLead,
    resetToDefaults,
  } = useCMS();

  useDocumentMeta({
    title: 'Panel Administrativo (CMS) | Hacienda Le Plus',
    description: 'Panel de control privado para administración de textos, tarifas, fotos y solicitudes de Hacienda Le Plus.',
    canonicalPath: '/admin',
  });

  // Simple PIN protection (default: 2026)
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [pinInput, setPinInput] = useState('2026');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<
    'leads' | 'packages' | 'cabins' | 'photos' | 'config'
  >('leads');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Photo state
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState<EventPhoto['category']>('Bodas');
  const [newPhotoSpace, setNewPhotoSpace] = useState('Jardín Principal Le Plus');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoDesc, setNewPhotoDesc] = useState('');

  // New Package state
  const [showNewPkgForm, setShowNewPkgForm] = useState(false);
  const [newPkgTitle, setNewPkgTitle] = useState('');
  const [newPkgCat, setNewPkgCat] = useState<ServiceCategory>('bodas');
  const [newPkgPrice, setNewPkgPrice] = useState(65);
  const [newPkgUnit, setNewPkgUnit] = useState('por invitado');
  const [newPkgCap, setNewPkgCap] = useState('80 a 200 personas');
  const [newPkgDesc, setNewPkgDesc] = useState('');

  // New Cabin state
  const [showNewCabinForm, setShowNewCabinForm] = useState(false);
  const [newCabinName, setNewCabinName] = useState('');
  const [newCabinType, setNewCabinType] = useState<
    'Suite Matrimonial' | 'Cabaña Familiar' | 'Villa Grupal' | 'Habitación Doble'
  >('Cabaña Familiar');
  const [newCabinPrice, setNewCabinPrice] = useState(145);
  const [newCabinCap, setNewCabinCap] = useState('Hasta 4 Huéspedes');
  const [newCabinBeds, setNewCabinBeds] = useState('1 Cama Queen + 2 Individuales');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '2026' || pinInput === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Fecha Registro',
      'Cliente',
      'Organizacion/Referencia',
      'Servicio',
      'Fecha Evento',
      'Volumen',
      'Telefono',
      'Email',
      'Buzon Corporativo',
      'Estado',
    ];
    const rows = leads.map((l) => [
      l.id,
      l.createdAt,
      `"${l.clientName.replace(/"/g, '""')}"`,
      `"${l.organizationOrCouple.replace(/"/g, '""')}"`,
      l.serviceType,
      l.tentativeDate,
      `"${l.estimatedVolume.replace(/"/g, '""')}"`,
      l.phone,
      l.email,
      l.targetCorporateEmail,
      l.status,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `solicitudes-hacienda-leplus-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Archivo CSV de prospectos descargado.');
  };

  const handleCreatePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle.trim() || !newPhotoUrl.trim()) return;
    addPhoto({
      title: newPhotoTitle.trim(),
      category: newPhotoCategory,
      spaceName: newPhotoSpace.trim() || 'Hacienda Le Plus',
      dateTag: 'Publicado desde CMS',
      imageUrl: newPhotoUrl.trim(),
      description: newPhotoDesc.trim() || 'Fotografía oficial de evento en Hacienda Le Plus.',
      featured: true,
    });
    setNewPhotoTitle('');
    setNewPhotoUrl('');
    setNewPhotoDesc('');
    showToast('Fotografía publicada en la galería y portada.');
  };

  const handleCreatePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkgTitle.trim()) return;
    addPackage({
      category: newPkgCat,
      title: newPkgTitle.trim(),
      subtitle: 'Programa configurado desde el Panel CMS',
      priceLabel: 'Desde',
      priceValue: Number(newPkgPrice) || 50,
      unit: newPkgUnit,
      capacity: newPkgCap,
      setupInfo: 'Salones & Jardines Le Plus',
      description: newPkgDesc.trim() || 'Paquete personalizado con espacios, gastronomía y coordinación.',
      inclusions: [
        'Uso de instalaciones según alcance contratado',
        'Coordinación logística y parqueadero privado',
        'Plan de contingencia climática',
      ],
      highlightBadge: 'Nuevo Paquete',
      image:
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80',
      whatsappIntent: newPkgTitle.trim(),
      featuredInHome: true,
    });
    setNewPkgTitle('');
    setNewPkgDesc('');
    setShowNewPkgForm(false);
    showToast('Nuevo paquete comercial publicado.');
  };

  const handleCreateCabin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCabinName.trim()) return;
    addCabin({
      name: newCabinName.trim(),
      type: newCabinType,
      capacity: newCabinCap,
      maxGuests: 4,
      beds: newCabinBeds,
      bathrooms: 1,
      pricePerNight: Number(newCabinPrice) || 120,
      weekendNote: 'Incluye desayuno campestre e impuestos.',
      description: 'Unidad de alojamiento confortable rodeada de naturaleza en Pintag.',
      amenities: ['Baño Privado', 'Agua Caliente 24h', 'Wi-Fi', 'Desayuno Incluido'],
      image:
        'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1000&q=80',
      available: true,
      featuredInHome: true,
    });
    setNewCabinName('');
    setShowNewCabinForm(false);
    showToast('Nueva cabaña/habitación añadida al catálogo.');
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen pt-24 pb-16 bg-[#06150F] text-[#FAF7F2] flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-3xl bg-[#0A1F17] border border-[#C8A45D]/40 p-8 shadow-2xl space-y-6 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-[#C8A45D]/15 border border-[#C8A45D]/40 flex items-center justify-center mx-auto text-[#E2C585]">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#C8A45D] font-bold">
              Acceso Administrativo
            </span>
            <h1 className="font-serif-luxury text-3xl font-semibold text-white mt-1">
              Panel de Control CMS
            </h1>
            <p className="text-xs text-[#FAF7F2]/70 mt-1">
              Ingresa el PIN de administración de Hacienda Le Plus (PIN Demo: <strong>2026</strong>)
            </p>
          </div>

          <input
            type="password"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            placeholder="PIN Administrativo"
            className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-[#C8A45D]/40 text-center text-lg tracking-widest text-white focus:outline-none"
          />
          {pinError && (
            <p className="text-xs text-red-400">PIN incorrecto. Usa 2026 para acceder.</p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C8A45D] to-[#DFB96E] text-[#06150F] font-bold text-sm cursor-pointer"
          >
            Ingresar al Panel CMS
          </button>
        </form>
      </main>
    );
  }

  const filteredLeads =
    statusFilter === 'Todos' ? leads : leads.filter((l) => l.status === statusFilter);

  return (
    <main className="min-h-screen pt-24 pb-20 bg-[#F4F0E8] text-[#0A1F17]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-[#071912] text-[#E2C585] border border-[#C8A45D] shadow-2xl text-xs sm:text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Admin Header */}
        <div className="rounded-3xl bg-[#071912] text-[#FAF7F2] p-6 sm:p-8 border border-[#C8A45D]/40 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C8A45D] font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Panel Administrativo Autogestionable (CMS)</span>
            </div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-white">
              Administración de Hacienda Le Plus
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF7F2]/75 max-w-2xl">
              Edita textos, actualiza tarifas de paquetes y cabañas, publica fotografías de eventos y gestiona las solicitudes comerciales recibidas en tiempo real.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors"
            >
              <span>Ver Sitio Público</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => {
                if (window.confirm('¿Restaurar los datos de demostración originales del sistema?')) {
                  resetToDefaults();
                  showToast('Datos restaurados a los valores oficiales por defecto.');
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold border border-[#C8A45D]/40 text-[#E2C585] hover:bg-[#C8A45D]/15 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Base Inicial</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs font-medium text-white/70 hover:text-white cursor-pointer"
              title="Bloquear sesión CMS"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Bloquear</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-[#0A1F17]/10 shadow-sm">
          {[
            {
              id: 'leads',
              label: `Solicitudes de Clientes (${leads.length})`,
              icon: Users,
            },
            {
              id: 'packages',
              label: `Tarifas Eventos & Paquetes (${packages.length})`,
              icon: DollarSign,
            },
            {
              id: 'cabins',
              label: `Tarifas Cabañas & Suites (${cabins.length})`,
              icon: BedDouble,
            },
            {
              id: 'photos',
              label: `Galería de Eventos (${photos.length})`,
              icon: ImageIcon,
            },
            {
              id: 'config',
              label: 'Textos, Video Hero & Correos Corporativos',
              icon: Settings,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#071912] text-[#E2C585] shadow-md'
                    : 'text-[#0A1F17]/75 hover:bg-[#FAF7F2]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =================================================================
            TAB 1: SOLICITUDES DE CLIENTES (CRM DE PROSPECTOS)
        ================================================================== */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* KPI Summary Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#0A1F17]/10">
                <span className="text-xs text-[#0A1F17]/60 font-semibold uppercase">Total Solicitudes</span>
                <p className="font-serif-luxury text-4xl font-bold text-[#071912] mt-1">{leads.length}</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-emerald-500/30">
                <span className="text-xs text-emerald-700 font-semibold uppercase">Nuevas por Contactar</span>
                <p className="font-serif-luxury text-4xl font-bold text-emerald-700 mt-1">
                  {leads.filter((l) => l.status === 'Nuevo').length}
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-[#C8A45D]/40">
                <span className="text-xs text-[#A6823C] font-semibold uppercase">Visitas & Propuestas</span>
                <p className="font-serif-luxury text-4xl font-bold text-[#A6823C] mt-1">
                  {
                    leads.filter(
                      (l) => l.status === 'Visita Agendada' || l.status === 'Propuesta Enviada'
                    ).length
                  }
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-[#0A1F17]/10">
                <span className="text-xs text-[#0A1F17]/60 font-semibold uppercase">Confirmados</span>
                <p className="font-serif-luxury text-4xl font-bold text-[#071912] mt-1">
                  {leads.filter((l) => l.status === 'Confirmado').length}
                </p>
              </div>
            </div>

            {/* Filter & Export Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#0A1F17]/10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A1F17]/60 mr-1">
                  Filtrar por estado:
                </span>
                {['Todos', ...LEAD_STATUSES].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                      statusFilter === st
                        ? 'bg-[#071912] text-[#E2C585]'
                        : 'bg-[#FAF7F2] text-[#0A1F17]/75 hover:bg-[#0A1F17]/10'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#071912] text-[#E2C585] hover:bg-[#123326] transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar CSV (Excel)</span>
              </button>
            </div>

            {/* Leads List */}
            <div className="space-y-4">
              {filteredLeads.map((lead) => {
                const cleanClientPhone = lead.phone.replace(/\D/g, '');
                const waClientPhone = cleanClientPhone.startsWith('0')
                  ? `593${cleanClientPhone.slice(1)}`
                  : cleanClientPhone;
                const waReplyText = encodeURIComponent(
                  `Hola ${lead.clientName}, te saludamos de Hacienda Le Plus (Pintag, Quito). Recibimos tu solicitud para "${lead.organizationOrCouple}" en fecha tentativa ${lead.tentativeDate} (${lead.estimatedVolume}). ¿A qué hora podemos conversar o agendar tu visita?`
                );

                return (
                  <div
                    key={lead.id}
                    className="rounded-2xl bg-white border border-[#0A1F17]/10 p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase bg-[#071912] text-[#E2C585]">
                          {lead.serviceType}
                        </span>
                        <span className="text-xs font-mono text-[#0A1F17]/60">
                          Recibido: {lead.createdAt} · Origen: {lead.sourcePage}
                        </span>
                        <span className="text-xs font-mono text-[#A6823C] font-semibold">
                          → {lead.targetCorporateEmail}
                        </span>
                      </div>

                      <h3 className="font-serif-luxury text-2xl font-bold text-[#071912]">
                        {lead.clientName}{' '}
                        <span className="text-base font-sans-ui font-normal text-[#0A1F17]/70">
                          — {lead.organizationOrCouple}
                        </span>
                      </h3>

                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs sm:text-sm text-[#0A1F17]/80">
                        <span>
                          <strong>Fecha tentativa:</strong> {lead.tentativeDate}
                        </span>
                        <span>
                          <strong>Asistentes/Noches:</strong> {lead.estimatedVolume}
                        </span>
                        <span>
                          <strong>Tel/WhatsApp:</strong> {lead.phone}
                        </span>
                        <span>
                          <strong>Email:</strong> {lead.email}
                        </span>
                      </div>

                      {lead.notes && (
                        <p className="text-xs bg-[#FAF7F2] p-3 rounded-xl border border-[#0A1F17]/10 text-[#0A1F17]/85">
                          <strong>Notas del cliente:</strong> {lead.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-3 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-[#0A1F17]/10">
                      <div className="flex items-center gap-2">
                        <label htmlFor={`status-${lead.id}`} className="text-xs font-bold text-[#0A1F17]/60">
                          Estado Comercial:
                        </label>
                        <select
                          id={`status-${lead.id}`}
                          value={lead.status}
                          onChange={(e) => {
                            updateLeadStatus(lead.id, e.target.value as LeadStatus);
                            showToast(`Estado actualizado a: ${e.target.value}`);
                          }}
                          className="px-3 py-2 rounded-xl text-xs font-bold bg-[#FAF7F2] border border-[#0A1F17]/20 text-[#071912]"
                        >
                          {LEAD_STATUSES.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${waClientPhone}?text=${waReplyText}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Responder WhatsApp</span>
                        </a>

                        <a
                          href={`mailto:${lead.email}?cc=${lead.targetCorporateEmail}&subject=${encodeURIComponent(
                            `Propuesta Hacienda Le Plus - ${lead.organizationOrCouple}`
                          )}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#071912] text-[#E2C585] hover:bg-[#123326] transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Enviar Correo</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => {
                            deleteLead(lead.id);
                            showToast('Solicitud eliminada.');
                          }}
                          className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Eliminar solicitud"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 2: TARIFAS DE EVENTOS Y PAQUETES
        ================================================================== */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#0A1F17]/10">
              <div>
                <h2 className="font-serif-luxury text-2xl font-bold text-[#071912]">
                  Actualizar Tarifas y Alcances de Paquetes Comerciales
                </h2>
                <p className="text-xs text-[#0A1F17]/70">
                  Cualquier cambio en precio, unidad, aforo o descripción se refleja al instante en Inicio, Bodas, Corporativo y Hospedaje.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowNewPkgForm(!showNewPkgForm)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold bg-[#071912] text-[#E2C585] cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>{showNewPkgForm ? 'Cancelar' : 'Crear Nuevo Paquete'}</span>
              </button>
            </div>

            {showNewPkgForm && (
              <form
                onSubmit={handleCreatePackage}
                className="rounded-2xl bg-white border-2 border-[#C8A45D] p-6 space-y-4"
              >
                <h3 className="font-serif-luxury text-2xl font-bold text-[#071912]">
                  Nuevo Paquete Comercial
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Nombre del Paquete *</label>
                    <input
                      type="text"
                      required
                      value={newPkgTitle}
                      onChange={(e) => setNewPkgTitle(e.target.value)}
                      placeholder="Ej. Boda Íntima Boutique"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/20 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Categoría *</label>
                    <select
                      value={newPkgCat}
                      onChange={(e) => setNewPkgCat(e.target.value as ServiceCategory)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/20 text-sm"
                    >
                      <option value="bodas">Bodas & Sociales</option>
                      <option value="corporativo">Eventos Corporativos</option>
                      <option value="hospedaje">Hospedaje & Grupos</option>
                      <option value="escapadas">Escapadas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Tarifa Base ($ USD) *</label>
                    <input
                      type="number"
                      required
                      value={newPkgPrice}
                      onChange={(e) => setNewPkgPrice(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/20 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Unidad de Cobro</label>
                    <input
                      type="text"
                      value={newPkgUnit}
                      onChange={(e) => setNewPkgUnit(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/20 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Capacidad / Aforo</label>
                    <input
                      type="text"
                      value={newPkgCap}
                      onChange={(e) => setNewPkgCap(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/20 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Descripción Comercial</label>
                  <textarea
                    rows={2}
                    value={newPkgDesc}
                    onChange={(e) => setNewPkgDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/20 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full text-xs font-bold bg-[#C8A45D] text-[#06150F] cursor-pointer"
                >
                  Guardar y Publicar Paquete
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 gap-5">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-2xl bg-white border border-[#0A1F17]/10 p-6 shadow-sm space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0A1F17]/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-[#071912] text-[#E2C585]">
                        {pkg.category}
                      </span>
                      <h3 className="font-serif-luxury text-2xl font-bold text-[#071912]">
                        {pkg.title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        deletePackage(pkg.id);
                        showToast('Paquete eliminado.');
                      }}
                      className="text-xs text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Eliminar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#0A1F17]/60 mb-1">
                        Título del Paquete
                      </label>
                      <input
                        type="text"
                        value={pkg.title}
                        onChange={(e) => updatePackage({ ...pkg, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/15 text-sm font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#A6823C] mb-1">
                        Tarifa ($ USD)
                      </label>
                      <input
                        type="number"
                        value={pkg.priceValue}
                        onChange={(e) =>
                          updatePackage({ ...pkg, priceValue: Number(e.target.value) || 0 })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#C8A45D] text-sm font-bold text-[#071912]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#0A1F17]/60 mb-1">
                        Unidad (ej. por invitado)
                      </label>
                      <input
                        type="text"
                        value={pkg.unit}
                        onChange={(e) => updatePackage({ ...pkg, unit: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/15 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#0A1F17]/60 mb-1">
                        Capacidad / Aforo
                      </label>
                      <input
                        type="text"
                        value={pkg.capacity}
                        onChange={(e) => updatePackage({ ...pkg, capacity: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/15 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#0A1F17]/60 mb-1">
                      Descripción Comercial Visible
                    </label>
                    <textarea
                      rows={2}
                      value={pkg.description}
                      onChange={(e) => updatePackage({ ...pkg, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/15 text-xs sm:text-sm"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => showToast(`Tarifa y datos de "${pkg.title}" guardados.`)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 text-white cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Confirmar Cambios</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 3: TARIFAS DE HOSPEDAJE Y CABAÑAS
        ================================================================== */}
        {activeTab === 'cabins' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#0A1F17]/10">
              <div>
                <h2 className="font-serif-luxury text-2xl font-bold text-[#071912]">
                  Catálogo de Cabañas, Suites y Disponibilidad
                </h2>
                <p className="text-xs text-[#0A1F17]/70">
                  Actualiza precios por noche, distribución de camas, ocupación y estado de disponibilidad.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowNewCabinForm(!showNewCabinForm)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold bg-[#071912] text-[#E2C585] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{showNewCabinForm ? 'Cancelar' : 'Agregar Cabaña / Suite'}</span>
              </button>
            </div>

            {showNewCabinForm && (
              <form
                onSubmit={handleCreateCabin}
                className="rounded-2xl bg-white border-2 border-[#C8A45D] p-6 space-y-4"
              >
                <h3 className="font-serif-luxury text-2xl font-bold text-[#071912]">
                  Nueva Cabaña o Suite
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Nombre *</label>
                    <input
                      type="text"
                      required
                      value={newCabinName}
                      onChange={(e) => setNewCabinName(e.target.value)}
                      placeholder="Ej. Cabaña Los Pinos"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/20 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Tipo de Unidad</label>
                    <select
                      value={newCabinType}
                      onChange={(e) => setNewCabinType(e.target.value as typeof newCabinType)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/20 text-sm"
                    >
                      <option value="Suite Matrimonial">Suite Matrimonial</option>
                      <option value="Cabaña Familiar">Cabaña Familiar</option>
                      <option value="Habitación Doble">Habitación Doble</option>
                      <option value="Villa Grupal">Villa Grupal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Tarifa por Noche ($ USD)</label>
                    <input
                      type="number"
                      required
                      value={newCabinPrice}
                      onChange={(e) => setNewCabinPrice(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/20 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Capacidad</label>
                    <input
                      type="text"
                      value={newCabinCap}
                      onChange={(e) => setNewCabinCap(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/20 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Distribución de Camas</label>
                    <input
                      type="text"
                      value={newCabinBeds}
                      onChange={(e) => setNewCabinBeds(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/20 text-sm"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full text-xs font-bold bg-[#C8A45D] text-[#06150F] cursor-pointer"
                >
                  Guardar Cabaña
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cabins.map((cabin) => (
                <div
                  key={cabin.id}
                  className="rounded-2xl bg-white border border-[#0A1F17]/10 p-6 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-luxury text-2xl font-bold text-[#071912]">
                      {cabin.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        deleteCabin(cabin.id);
                        showToast('Unidad eliminada.');
                      }}
                      className="text-xs text-red-600 hover:underline cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#A6823C] mb-1">
                        Tarifa / Noche ($ USD)
                      </label>
                      <input
                        type="number"
                        value={cabin.pricePerNight}
                        onChange={(e) =>
                          updateCabin({ ...cabin, pricePerNight: Number(e.target.value) || 0 })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#C8A45D] text-sm font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#0A1F17]/60 mb-1">
                        Estado Disponibilidad
                      </label>
                      <select
                        value={cabin.available ? 'si' : 'no'}
                        onChange={(e) =>
                          updateCabin({ ...cabin, available: e.target.value === 'si' })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/15 text-sm font-semibold"
                      >
                        <option value="si">Disponible bajo consulta</option>
                        <option value="no">Cupo Limitado / Reservado</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#0A1F17]/60 mb-1">
                        Capacidad
                      </label>
                      <input
                        type="text"
                        value={cabin.capacity}
                        onChange={(e) => updateCabin({ ...cabin, capacity: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/15 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#0A1F17]/60 mb-1">
                        Camas
                      </label>
                      <input
                        type="text"
                        value={cabin.beds}
                        onChange={(e) => updateCabin({ ...cabin, beds: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/15 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#0A1F17]/60 mb-1">
                      Nota de Impuestos y Condiciones
                    </label>
                    <input
                      type="text"
                      value={cabin.weekendNote}
                      onChange={(e) => updateCabin({ ...cabin, weekendNote: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/15 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 4: PUBLICAR FOTOS DE EVENTOS Y GALERÍA
        ================================================================== */}
        {activeTab === 'photos' && (
          <div className="space-y-8">
            <form
              onSubmit={handleCreatePhoto}
              className="rounded-3xl bg-white border border-[#0A1F17]/10 p-6 sm:p-8 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A6823C]">
                <Sparkles className="w-4 h-4" />
                <span>Publicar Nueva Fotografía Oficial en la Web</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#071912]">
                Subir / Enlazar Foto de Evento Real
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Título de la Escena *</label>
                  <input
                    type="text"
                    required
                    value={newPhotoTitle}
                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                    placeholder="Ej. Boda Nocturna en Pérgola"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Categoría *</label>
                  <select
                    value={newPhotoCategory}
                    onChange={(e) => setNewPhotoCategory(e.target.value as EventPhoto['category'])}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/20 text-sm"
                  >
                    <option value="Bodas">Bodas</option>
                    <option value="Corporativo">Corporativo</option>
                    <option value="Hospedaje">Hospedaje</option>
                    <option value="Naturaleza & Gastronomía">Naturaleza & Gastronomía</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Espacio de la Hacienda</label>
                  <input
                    type="text"
                    value={newPhotoSpace}
                    onChange={(e) => setNewPhotoSpace(e.target.value)}
                    placeholder="Ej. Salón Principal / Jardín"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/20 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">URL de la Fotografía HD *</label>
                  <input
                    type="url"
                    required
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Descripción Breve</label>
                  <input
                    type="text"
                    value={newPhotoDesc}
                    onChange={(e) => setNewPhotoDesc(e.target.value)}
                    placeholder="Montaje real para 150 invitados..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/20 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-[#071912] text-[#E2C585] hover:bg-[#123326] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Publicar Fotografía en Galería</span>
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="rounded-2xl bg-white border border-[#0A1F17]/10 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-[#071912]/90 text-[#E2C585]">
                        {photo.category}
                      </span>
                    </div>
                    <div className="p-4 space-y-1">
                      <span className="text-[11px] text-[#A6823C] font-semibold">
                        {photo.spaceName}
                      </span>
                      <h4 className="font-serif-luxury text-xl font-bold text-[#071912]">
                        {photo.title}
                      </h4>
                      <p className="text-xs text-[#0A1F17]/70">{photo.description}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#FAF7F2] border-t border-[#0A1F17]/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        togglePhotoFeatured(photo.id);
                        showToast('Visibilidad en portada actualizada.');
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                        photo.featured
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#0A1F17]/10 text-[#0A1F17]'
                      }`}
                    >
                      {photo.featured ? 'Destacada en Home' : 'Oculta en Home'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        deletePhoto(photo.id);
                        showToast('Foto eliminada.');
                      }}
                      className="text-xs text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 5: TEXTOS DE PORTADA, VIDEO HD Y CORREOS CORPORATIVOS
        ================================================================== */}
        {activeTab === 'config' && (
          <div className="rounded-3xl bg-white border border-[#0A1F17]/10 p-6 sm:p-8 shadow-sm space-y-8">
            <div>
              <h2 className="font-serif-luxury text-3xl font-bold text-[#071912]">
                Configuración de Portada, Contacto y Correos Corporativos
              </h2>
              <p className="text-xs sm:text-sm text-[#0A1F17]/70">
                Personaliza el mensaje principal de la portada (Home), el video HD de fondo, el número de WhatsApp y las cuentas de correo corporativas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-[#0A1F17]/70 mb-1.5">
                  Sobreimpreso Superior (Hero Overline)
                </label>
                <input
                  type="text"
                  value={siteConfig.heroOverline}
                  onChange={(e) => updateSiteConfig({ heroOverline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/15 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#0A1F17]/70 mb-1.5">
                  Eslogan / Concepto Creativo
                </label>
                <input
                  type="text"
                  value={siteConfig.tagline}
                  onChange={(e) => updateSiteConfig({ tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/15 text-sm font-semibold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-[#0A1F17]/70 mb-1.5">
                  Título Principal de Portada (H1)
                </label>
                <input
                  type="text"
                  value={siteConfig.heroTitle}
                  onChange={(e) => updateSiteConfig({ heroTitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/15 text-base font-bold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-[#0A1F17]/70 mb-1.5">
                  Subtítulo / Propuesta de Valor en Portada
                </label>
                <textarea
                  rows={2}
                  value={siteConfig.heroSubtitle}
                  onChange={(e) => updateSiteConfig({ heroSubtitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/15 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#0A1F17]/70 mb-1.5">
                  URL de Video HD de Portada (MP4 Optimizado)
                </label>
                <input
                  type="url"
                  value={siteConfig.heroVideoUrl}
                  onChange={(e) => updateSiteConfig({ heroVideoUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/15 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#0A1F17]/70 mb-1.5">
                  Imagen Poster de Carga Instantánea (Fallback)
                </label>
                <input
                  type="url"
                  value={siteConfig.heroPosterUrl}
                  onChange={(e) => updateSiteConfig({ heroPosterUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/15 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#A6823C] mb-1.5">
                  Número Oficial de WhatsApp (Formato Internacional sin +)
                </label>
                <input
                  type="text"
                  value={siteConfig.whatsappNumber}
                  onChange={(e) => updateSiteConfig({ whatsappNumber: e.target.value })}
                  placeholder="593969817891"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#C8A45D] text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#0A1F17]/70 mb-1.5">
                  Teléfono Visible en Pantalla
                </label>
                <input
                  type="text"
                  value={siteConfig.phoneDisplay}
                  onChange={(e) => updateSiteConfig({ phoneDisplay: e.target.value })}
                  placeholder="+593 96 981 7891"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/15 text-sm font-semibold"
                />
              </div>
            </div>

            {/* Correos Corporativos */}
            <div className="pt-6 border-t border-[#0A1F17]/10 space-y-4">
              <h3 className="font-serif-luxury text-2xl font-bold text-[#071912]">
                Integración de Correos Corporativos Oficiales (@haciendaleplus.com)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#0A1F17]/70 mb-1">
                    Buzón Bodas & Sociales
                  </label>
                  <input
                    type="email"
                    value={siteConfig.corporateEmails.bodas}
                    onChange={(e) =>
                      updateSiteConfig({
                        corporateEmails: { ...siteConfig.corporateEmails, bodas: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/15 text-xs font-mono font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#0A1F17]/70 mb-1">
                    Buzón Eventos Corporativos
                  </label>
                  <input
                    type="email"
                    value={siteConfig.corporateEmails.corporativo}
                    onChange={(e) =>
                      updateSiteConfig({
                        corporateEmails: {
                          ...siteConfig.corporateEmails,
                          corporativo: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/15 text-xs font-mono font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#0A1F17]/70 mb-1">
                    Buzón Hospedaje & Grupos
                  </label>
                  <input
                    type="email"
                    value={siteConfig.corporateEmails.reservas}
                    onChange={(e) =>
                      updateSiteConfig({
                        corporateEmails: {
                          ...siteConfig.corporateEmails,
                          reservas: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/15 text-xs font-mono font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#0A1F17]/70 mb-1">
                    Buzón Información General
                  </label>
                  <input
                    type="email"
                    value={siteConfig.corporateEmails.general}
                    onChange={(e) =>
                      updateSiteConfig({
                        corporateEmails: {
                          ...siteConfig.corporateEmails,
                          general: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/15 text-xs font-mono font-semibold"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => showToast('Configuración general y correos corporativos guardados.')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#071912] text-[#E2C585] hover:bg-[#123326] cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Configuración General</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
