import React, { useState, useMemo } from 'react';
import {
  FileSpreadsheet,
  Download,
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Trash2,
  Eye,
  RefreshCw,
  X,
  Send,
  Building,
  Heart,
  Sparkles,
  BedDouble,
  ChevronDown,
  AlertCircle,
  FileText,
  UserCheck,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { LeadSubmission, LeadStatus } from '../../types/cms';
import { exportLeadsToExcel, exportLeadsToCSV } from '../../utils/exportToExcel';

const STATUS_OPTIONS: { value: LeadStatus; label: string; bg: string; text: string; border: string }[] = [
  { value: 'Nuevo', label: 'Nuevo', bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-300' },
  { value: 'Contactado', label: 'Contactado', bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-300' },
  { value: 'Calificado', label: 'Calificado', bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-300' },
  { value: 'Visita Agendada', label: 'Visita Agendada', bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-300' },
  { value: 'Propuesta Enviada', label: 'Propuesta Enviada', bg: 'bg-cyan-50', text: 'text-cyan-800', border: 'border-cyan-300' },
  { value: 'Confirmado', label: 'Confirmado', bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-300' },
];

export const AdminLeadsSection: React.FC = () => {
  const { leads, addLead, updateLeadStatus, updateLead, deleteLead, siteConfig } = useCMS();

  // Estados de filtrado y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modales
  const [selectedLead, setSelectedLead] = useState<LeadSubmission | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<LeadSubmission | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<LeadSubmission | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Formulario de creación manual
  const [newClientName, setNewClientName] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newServiceType, setNewServiceType] = useState<LeadSubmission['serviceType']>('bodas');
  const [newTentativeDate, setNewTentativeDate] = useState('');
  const [newVolume, setNewVolume] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // KPIs
  const stats = useMemo(() => {
    const total = leads.length;
    const nuevos = leads.filter((l) => l.status === 'Nuevo').length;
    const enGestion = leads.filter(
      (l) => l.status === 'Contactado' || l.status === 'Calificado' || l.status === 'Visita Agendada' || l.status === 'Propuesta Enviada'
    ).length;
    const confirmados = leads.filter((l) => l.status === 'Confirmado').length;
    return { total, nuevos, enGestion, confirmados };
  }, [leads]);

  // Filtrado de la lista
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        searchTerm === '' ||
        lead.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        (lead.organizationOrCouple && lead.organizationOrCouple.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lead.notes && lead.notes.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesService = serviceFilter === 'all' || lead.serviceType === serviceFilter;
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

      return matchesSearch && matchesService && matchesStatus;
    });
  }, [leads, searchTerm, serviceFilter, statusFilter]);

  // Manejo de exportación a Excel
  const handleExportExcel = () => {
    if (filteredLeads.length === 0) {
      showToast('⚠️ No hay registros para exportar con los filtros seleccionados.');
      return;
    }
    exportLeadsToExcel(filteredLeads);
    showToast(`✓ Se descargó el archivo Excel con ${filteredLeads.length} registros.`);
  };

  const handleExportCSV = () => {
    if (filteredLeads.length === 0) {
      showToast('⚠️ No hay registros para exportar con los filtros seleccionados.');
      return;
    }
    exportLeadsToCSV(filteredLeads);
    showToast(`✓ Se descargó el archivo CSV con ${filteredLeads.length} registros.`);
  };

  // Guardar nuevo registro manual
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim() || !newPhone.trim()) {
      showToast('Por favor ingrese al menos el nombre y teléfono del cliente.');
      return;
    }

    addLead({
      clientName: newClientName.trim(),
      organizationOrCouple: newOrg.trim() || 'Registro Manual Admin',
      email: newEmail.trim() || 'sin-correo@registro-admin.ec',
      phone: newPhone.trim(),
      serviceType: newServiceType,
      tentativeDate: newTentativeDate.trim() || 'Por definir',
      estimatedVolume: newVolume.trim() || 'Por definir',
      notes: newNotes.trim() ? `[Ingreso Manual Admin] ${newNotes.trim()}` : 'Registrado manualmente desde el panel de administración',
      targetCorporateEmail: siteConfig?.corporateEmails?.general || 'reservas@haciendaleplus.com',
      sourcePage: 'Panel Admin / Registro Manual',
    });

    // Resetear formulario
    setNewClientName('');
    setNewOrg('');
    setNewEmail('');
    setNewPhone('');
    setNewServiceType('bodas');
    setNewTentativeDate('');
    setNewVolume('');
    setNewNotes('');
    setIsCreateModalOpen(false);

    showToast('✓ Cliente registrado exitosamente en la base de datos.');
  };

  // Guardar edición de notas y estado
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;

    updateLead(editingLead);
    setEditingLead(null);
    showToast('✓ Registro actualizado correctamente.');
  };

  // Confirmar eliminación
  const confirmDelete = () => {
    if (leadToDelete) {
      deleteLead(leadToDelete.id);
      showToast('✓ Solicitud eliminada de la base de datos.');
      setLeadToDelete(null);
      if (selectedLead?.id === leadToDelete.id) setSelectedLead(null);
    }
  };

  // Helper para generar link de WhatsApp directo al cliente
  const getClientWhatsAppUrl = (lead: LeadSubmission) => {
    const cleanPhone = lead.phone.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.startsWith('593')
      ? cleanPhone
      : cleanPhone.startsWith('0')
      ? `593${cleanPhone.slice(1)}`
      : cleanPhone.length === 9
      ? `593${cleanPhone}`
      : cleanPhone;

    const message = `Hola ${lead.clientName}, un saludo cordial desde *Hacienda Le Plus* (Píntag, Quito). Recibimos tu solicitud para *${lead.organizationOrCouple || lead.serviceType.toUpperCase()}* y con gusto te asistimos personalmente. ¿Podemos coordinar los detalles de tu fecha (${lead.tentativeDate || 'a convenir'})?`;
    return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(message)}`;
  };

  // Helper de badges por servicio
  const renderServiceBadge = (serviceType: string) => {
    switch (serviceType?.toLowerCase()) {
      case 'bodas':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#C8A45D]/15 text-[#8A6B2D] border border-[#C8A45D]/30">
            <Heart className="w-3 h-3 text-[#A6823C]" />
            <span>Bodas & Social</span>
          </span>
        );
      case 'corporativo':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-800 border border-blue-200">
            <Building className="w-3 h-3 text-blue-600" />
            <span>Corporativo</span>
          </span>
        );
      case 'hospedaje':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <BedDouble className="w-3 h-3 text-emerald-600" />
            <span>Hospedaje</span>
          </span>
        );
      case 'grupos':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-purple-50 text-purple-800 border border-purple-200">
            <Users className="w-3 h-3 text-purple-600" />
            <span>Grupos / ONGs</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
            <Sparkles className="w-3 h-3 text-slate-500" />
            <span>{serviceType || 'General'}</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#06150F] text-[#E2C585] px-5 py-3 rounded-2xl shadow-2xl border border-[#C8A45D]/40 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#C8A45D]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ===================================================================
          1. ENCABEZADO PRINCIPAL Y BOTONES DE ACCIÓN
         =================================================================== */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2 border border-emerald-200">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>Módulo de Clientes, Formularios y Agendamientos</span>
          </div>
          <h2 className="font-serif-luxury font-bold text-2xl sm:text-3xl text-[#06150F]">
            Gestión de Clientes y Solicitudes ({leads.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Consulte en tiempo real los datos de clientes que completan formularios en la web, solicitan agendamientos para bodas, eventos y hospedaje de larga estadía, y expórtelos a Excel con un clic.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleExportExcel}
            className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:shadow-md"
            title="Descargar tabla completa formateada en Microsoft Excel (.xlsx)"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
            <span>Exportar Excel (.xlsx)</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200"
            title="Exportar en formato CSV universal"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#C8A45D]" />
            <span>+ Registrar Cliente</span>
          </button>
        </div>
      </div>

      {/* ===================================================================
          2. TARJETAS DE INDICADORES (KPIS)
         =================================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Leads */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Total Solicitudes</span>
            <span className="font-serif-luxury font-black text-2xl sm:text-3xl text-[#06150F] block mt-0.5">{stats.total}</span>
            <span className="text-[10px] text-slate-500 mt-1 block">Histórico total acumulado</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#06150F]/5 text-[#06150F] flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-[#C8A45D]" />
          </div>
        </div>

        {/* Nuevos / Sin Gestionar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">Nuevos / Pendientes</span>
            <span className="font-serif-luxury font-black text-2xl sm:text-3xl text-amber-700 block mt-0.5">{stats.nuevos}</span>
            <span className="text-[10px] text-amber-600 font-semibold mt-1 block">Por contactar</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* En Gestión / Visitas */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-blue-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">En Gestión / Visitas</span>
            <span className="font-serif-luxury font-black text-2xl sm:text-3xl text-blue-700 block mt-0.5">{stats.enGestion}</span>
            <span className="text-[10px] text-blue-600 font-semibold mt-1 block">Propuesta o cita agendada</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        {/* Confirmados */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-emerald-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">Confirmados / Cierres</span>
            <span className="font-serif-luxury font-black text-2xl sm:text-3xl text-emerald-700 block mt-0.5">{stats.confirmados}</span>
            <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">Clientes cerrados</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* ===================================================================
          3. BARRA DE BÚSQUEDA Y FILTROS
         =================================================================== */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Campo de búsqueda */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente, teléfono, email, organización o notas..."
            className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#C8A45D] transition-colors"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-2.5 p-0.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filtros por servicio y estado */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filtros:</span>
          </div>

          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 font-semibold focus:outline-none focus:border-[#C8A45D] cursor-pointer"
          >
            <option value="all">Todos los Servicios</option>
            <option value="bodas">Bodas y Social</option>
            <option value="corporativo">Corporativo</option>
            <option value="hospedaje">Hospedaje</option>
            <option value="grupos">Grupos / ONGs</option>
            <option value="visita">Visitas</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 font-semibold focus:outline-none focus:border-[#C8A45D] cursor-pointer"
          >
            <option value="all">Todos los Estados</option>
            {STATUS_OPTIONS.map((st) => (
              <option key={st.value} value={st.value}>
                {st.label}
              </option>
            ))}
          </select>

          {(searchTerm || serviceFilter !== 'all' || statusFilter !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setServiceFilter('all');
                setStatusFilter('all');
              }}
              className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-red-600 hover:bg-red-50 transition-colors"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* ===================================================================
          4. TABLA DE REGISTROS DE CLIENTES
         =================================================================== */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#06150F] text-[#FAF7F2] border-b border-slate-200 font-sans-ui text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 font-bold">Fecha / Origen</th>
                <th className="py-3.5 px-4 font-bold">Cliente / Organización</th>
                <th className="py-3.5 px-4 font-bold">Contacto Directo</th>
                <th className="py-3.5 px-4 font-bold">Servicio Solicitado</th>
                <th className="py-3.5 px-4 font-bold">Fecha Tentativa / Aforo</th>
                <th className="py-3.5 px-4 font-bold">Estado</th>
                <th className="py-3.5 px-4 font-bold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => {
                  const statusConfig =
                    STATUS_OPTIONS.find((s) => s.value === lead.status) || STATUS_OPTIONS[0];

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      {/* Fecha y Origen */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-bold text-[#06150F] block">
                          {lead.createdAt
                            ? new Date(lead.createdAt).toLocaleDateString('es-EC', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })
                            : '-'}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-mono">
                          {lead.createdAt ? new Date(lead.createdAt).toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded mt-1 inline-block truncate max-w-[120px]">
                          {lead.sourcePage || 'Web'}
                        </span>
                      </td>

                      {/* Cliente y Organización */}
                      <td className="py-3.5 px-4 min-w-[180px]">
                        <span className="font-bold text-slate-900 text-sm block leading-tight">
                          {lead.clientName}
                        </span>
                        {lead.organizationOrCouple && (
                          <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                            {lead.organizationOrCouple}
                          </span>
                        )}
                      </td>

                      {/* Contacto Directo */}
                      <td className="py-3.5 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1.5">
                          <a
                            href={getClientWhatsAppUrl(lead)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold hover:bg-emerald-100 transition-colors text-[11px] border border-emerald-200"
                            title="Chatear por WhatsApp"
                          >
                            <Send className="w-3 h-3 text-emerald-600" />
                            <span>{lead.phone}</span>
                          </a>
                        </div>
                        {lead.email && lead.email !== 'sin-correo@consulta-web.ec' && (
                          <a
                            href={`mailto:${lead.email}`}
                            className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 mt-1 block truncate max-w-[170px]"
                            title={lead.email}
                          >
                            <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{lead.email}</span>
                          </a>
                        )}
                      </td>

                      {/* Servicio */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {renderServiceBadge(lead.serviceType)}
                      </td>

                      {/* Fecha Tentativa y Aforo */}
                      <td className="py-3.5 px-4 min-w-[150px]">
                        <span className="font-semibold text-slate-800 block text-xs">
                          📅 {lead.tentativeDate || 'Por coordinar'}
                        </span>
                        <span className="text-[11px] text-slate-500 block mt-0.5">
                          👥 {lead.estimatedVolume || 'Por definir'}
                        </span>
                      </td>

                      {/* Estado con selector dropdown interactivo directo */}
                      <td className="py-3.5 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-xl border cursor-pointer focus:outline-none transition-all ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                        >
                          {STATUS_OPTIONS.map((st) => (
                            <option key={st.value} value={st.value}>
                              {st.label}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Acciones */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          {/* Ver Ficha */}
                          <button
                            type="button"
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-[#06150F] hover:bg-slate-100 transition-colors"
                            title="Ver detalles completos"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* WhatsApp Directo */}
                          <a
                            href={getClientWhatsAppUrl(lead)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                            title="Contactar vía WhatsApp"
                          >
                            <Phone className="w-4 h-4" />
                          </a>

                          {/* Editar */}
                          <button
                            type="button"
                            onClick={() => setEditingLead(lead)}
                            className="p-1.5 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                            title="Editar notas o información"
                          >
                            <FileText className="w-4 h-4" />
                          </button>

                          {/* Eliminar */}
                          <button
                            type="button"
                            onClick={() => setLeadToDelete(lead)}
                            className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                            title="Eliminar de la lista"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileSpreadsheet className="w-10 h-10 text-slate-300" />
                      <span className="font-bold text-sm text-slate-600">No se encontraron clientes o solicitudes</span>
                      <span className="text-xs text-slate-400">
                        {searchTerm || serviceFilter !== 'all' || statusFilter !== 'all'
                          ? 'Intenta ajustar los filtros de búsqueda.'
                          : 'Aún no se han recibido registros a través de los formularios.'}
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer de la tabla con resumen de cantidad */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 font-medium">
          <span>
            Mostrando <strong>{filteredLeads.length}</strong> de <strong>{leads.length}</strong> solicitudes totales
          </span>
          <span className="text-[11px] text-slate-400">
            Sincronizado con base de datos en la nube y almacenamiento local
          </span>
        </div>
      </div>

      {/* ===================================================================
          MODAL 1: DETALLE COMPLETO DEL CLIENTE / LEAD
         =================================================================== */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  {renderServiceBadge(selectedLead.serviceType)}
                  <span className="text-xs text-slate-400 font-mono">ID: {selectedLead.id}</span>
                </div>
                <h3 className="font-serif-luxury font-bold text-2xl text-[#06150F]">
                  {selectedLead.clientName}
                </h3>
                {selectedLead.organizationOrCouple && (
                  <p className="text-sm font-semibold text-slate-600">{selectedLead.organizationOrCouple}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cuadrícula de detalles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Teléfono / WhatsApp</span>
                <span className="text-sm font-bold text-slate-800 block">{selectedLead.phone}</span>
                <a
                  href={getClientWhatsAppUrl(selectedLead)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold text-[11px] mt-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Abrir chat de WhatsApp</span>
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Correo Electrónico</span>
                <span className="text-sm font-bold text-slate-800 block truncate">{selectedLead.email}</span>
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-800 font-bold text-[11px] mt-1"
                >
                  <Mail className="w-3 h-3" />
                  <span>Enviar correo directo</span>
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Fecha Tentativa / Ingreso</span>
                <span className="text-sm font-bold text-slate-800 block">📅 {selectedLead.tentativeDate || 'Por coordinar'}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Volumen / Personas / Duración</span>
                <span className="text-sm font-bold text-slate-800 block">👥 {selectedLead.estimatedVolume || 'Por definir'}</span>
              </div>
            </div>

            {/* Notas y requerimientos */}
            <div className="p-4 rounded-2xl bg-[#06150F]/5 border border-[#06150F]/10 space-y-1.5">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                Notas y Requerimientos de la Solicitud
              </span>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                {selectedLead.notes || 'No se registraron notas adicionales en el formulario.'}
              </p>
            </div>

            {/* Metadatos técnicos */}
            <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-3 flex flex-wrap items-center justify-between gap-2">
              <span>Registrado el: {selectedLead.createdAt}</span>
              <span>Página origen: {selectedLead.sourcePage}</span>
              <span>Destino comercial: {selectedLead.targetCorporateEmail}</span>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Estado actual:</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) => {
                    const nextStatus = e.target.value as LeadStatus;
                    updateLeadStatus(selectedLead.id, nextStatus);
                    setSelectedLead({ ...selectedLead, status: nextStatus });
                    showToast(`✓ Estado actualizado a "${nextStatus}"`);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                >
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st.value} value={st.value}>
                      {st.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={getClientWhatsAppUrl(selectedLead)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Contactar WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 2: CREACIÓN MANUAL DE CLIENTE / AGENDAMIENTO
         =================================================================== */}
      {isCreateModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl w-full max-w-xl max-h-[92vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h3 className="font-serif-luxury font-bold text-2xl text-[#06150F]">
                  Registrar Nuevo Cliente / Agendamiento
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ingrese los datos para agregarlo a la tabla de control y seguimiento de la hacienda.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="Ej. Carolina Montes"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C8A45D]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Organización / Tipo de Evento</label>
                  <input
                    type="text"
                    value={newOrg}
                    onChange={(e) => setNewOrg(e.target.value)}
                    placeholder="Ej. Boda Montes - Pérez / Banco Pichincha"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C8A45D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Teléfono / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="Ej. 0998451230 o +593 99..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C8A45D]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="cliente@ejemplo.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C8A45D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tipo de Servicio</label>
                  <select
                    value={newServiceType}
                    onChange={(e) => setNewServiceType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold focus:outline-none focus:border-[#C8A45D]"
                  >
                    <option value="bodas">Bodas & Social</option>
                    <option value="corporativo">Corporativo</option>
                    <option value="hospedaje">Hospedaje</option>
                    <option value="grupos">Grupos / ONGs</option>
                    <option value="visita">Visita Técnica</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fecha Tentativa</label>
                  <input
                    type="text"
                    value={newTentativeDate}
                    onChange={(e) => setNewTentativeDate(e.target.value)}
                    placeholder="Ej. 2026-12-15"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C8A45D]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Aforo / Personas</label>
                  <input
                    type="text"
                    value={newVolume}
                    onChange={(e) => setNewVolume(e.target.value)}
                    placeholder="Ej. 120 personas"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C8A45D]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notas / Requerimientos</label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Detalles sobre catering, hospedaje, visita técnica o servicios requeridos..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C8A45D]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-bold transition-colors"
                >
                  Guardar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 3: EDICIÓN RÁPIDA DE NOTAS Y ESTADO
         =================================================================== */}
      {editingLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl w-full max-w-lg border border-slate-200 shadow-2xl p-6 sm:p-7">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-serif-luxury font-bold text-xl text-[#06150F]">
                Editar Solicitud: {editingLead.clientName}
              </h3>
              <button
                type="button"
                onClick={() => setEditingLead(null)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Estado de la Solicitud</label>
                <select
                  value={editingLead.status}
                  onChange={(e) => setEditingLead({ ...editingLead, status: e.target.value as LeadStatus })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white focus:outline-none focus:border-[#C8A45D]"
                >
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st.value} value={st.value}>
                      {st.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Fecha Tentativa</label>
                <input
                  type="text"
                  value={editingLead.tentativeDate}
                  onChange={(e) => setEditingLead({ ...editingLead, tentativeDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C8A45D]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Aforo / Huéspedes / Duración</label>
                <input
                  type="text"
                  value={editingLead.estimatedVolume}
                  onChange={(e) => setEditingLead({ ...editingLead, estimatedVolume: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C8A45D]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notas y Requerimientos</label>
                <textarea
                  rows={4}
                  value={editingLead.notes}
                  onChange={(e) => setEditingLead({ ...editingLead, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C8A45D]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingLead(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#06150F] hover:bg-[#13281F] text-[#E2C585] font-bold transition-colors"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 4: CONFIRMAR ELIMINACIÓN
         =================================================================== */}
      {leadToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl w-full max-w-sm border border-slate-200 shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base text-slate-900">¿Eliminar esta solicitud?</h4>
              <p className="text-xs text-slate-500 mt-1">
                Se eliminará el registro de <strong>{leadToDelete.clientName}</strong>. Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setLeadToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
