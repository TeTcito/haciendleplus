import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, CheckCircle2, Mail, Calendar, Users, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useCMS } from '../context/CMSContext';
import { useLanguage } from '../context/LanguageContext';
import { LeadSubmission } from '../types/cms';
import { buildContextualWhatsAppUrl, WhatsAppContextType } from '../utils/whatsapp';

interface DirectQuoteFormProps {
  defaultService?: LeadSubmission['serviceType'];
  defaultItemName?: string;
  compact?: boolean;
  darkTheme?: boolean;
  onSuccessClose?: () => void;
}

export const DirectQuoteForm: React.FC<DirectQuoteFormProps> = ({
  defaultService = 'bodas',
  defaultItemName = '',
  compact = false,
  darkTheme = true,
  onSuccessClose,
}) => {
  const { siteConfig, addLead } = useCMS();
  const { t } = useLanguage();
  const location = useLocation();

  const [clientName, setClientName] = useState('');
  const [organizationOrCouple, setOrganizationOrCouple] = useState(defaultItemName);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<LeadSubmission['serviceType']>(defaultService);
  const [tentativeDate, setTentativeDate] = useState('');
  const [estimatedVolume, setEstimatedVolume] = useState('');
  const [notes, setNotes] = useState('');
  const [submittedLead, setSubmittedLead] = useState<LeadSubmission | null>(null);

  useEffect(() => {
    if (defaultService) setServiceType(defaultService);
    if (defaultItemName) setOrganizationOrCouple(defaultItemName);
  }, [defaultService, defaultItemName]);

  const getCorporateTargetEmail = (type: LeadSubmission['serviceType']): string => {
    switch (type) {
      case 'bodas':
        return siteConfig.corporateEmails.bodas;
      case 'corporativo':
        return siteConfig.corporateEmails.corporativo;
      case 'hospedaje':
      case 'grupos':
      case 'escapadas':
        return siteConfig.corporateEmails.reservas;
      case 'visita':
      default:
        return siteConfig.corporateEmails.general;
    }
  };

  const targetEmail = getCorporateTargetEmail(serviceType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim()) return;

    const created = addLead({
      clientName: clientName.trim(),
      organizationOrCouple:
        organizationOrCouple.trim() ||
        (serviceType === 'bodas'
          ? 'Celebración Nupcial / Social'
          : serviceType === 'corporativo'
          ? 'Evento Corporativo'
          : 'Hospedaje / Estadía'),
      email: email.trim() || 'sin-correo@consulta-web.ec',
      phone: phone.trim(),
      serviceType,
      tentativeDate: tentativeDate || 'Por definir',
      estimatedVolume: estimatedVolume.trim() || 'Por definir',
      notes: notes.trim(),
      targetCorporateEmail: targetEmail,
      sourcePage: location.pathname,
    });

    setSubmittedLead(created);
  };

  if (submittedLead) {
    const waUrl = buildContextualWhatsAppUrl({
      phone: siteConfig.whatsappNumber,
      context: submittedLead.serviceType as WhatsAppContextType,
      clientName: submittedLead.clientName,
      itemName: submittedLead.organizationOrCouple,
      tentativeDate: submittedLead.tentativeDate,
      guestsOrNights: submittedLead.estimatedVolume,
    });

    const mailtoSubject = encodeURIComponent(
      `[Cotización Web - ${submittedLead.serviceType.toUpperCase()}] ${submittedLead.clientName} - Fecha: ${submittedLead.tentativeDate}`
    );
    const mailtoBody = encodeURIComponent(
      `Hola equipo de Hacienda Le Plus,\n\nHe registrado mi solicitud en la web:\n- Nombre: ${submittedLead.clientName}\n- Servicio / Referencia: ${submittedLead.organizationOrCouple}\n- Fecha tentativa: ${submittedLead.tentativeDate}\n- Invitados / Huéspedes: ${submittedLead.estimatedVolume}\n- Teléfono / WhatsApp: ${submittedLead.phone}\n- Correo: ${submittedLead.email}\n- Notas adicionales: ${submittedLead.notes || 'Ninguna'}\n\nQuedo atento(a) a su propuesta.`
    );

    const successTitleText = t.forms.successTitle.replace('{name}', submittedLead.clientName);
    const successDescText = t.forms.successDesc
      .replace('{email}', submittedLead.targetCorporateEmail)
      .replace('{date}', submittedLead.tentativeDate);

    return (
      <div
        className={`p-6 sm:p-8 rounded-3xl border text-center space-y-5 animate-fadeIn ${
          darkTheme
            ? 'bg-[#06150F] border-[#C8A45D]/40 text-[#FAF7F2]'
            : 'bg-white border-[#0A1F17]/15 text-[#0A1F17]'
        }`}
      >
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C8A45D] font-semibold">
            {t.forms.successTag}
          </span>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold">
            {successTitleText}
          </h3>
          <p className={`text-sm max-w-lg mx-auto ${darkTheme ? 'text-[#FAF7F2]/80' : 'text-[#0A1F17]/75'}`}>
            {successDescText}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm shadow-lg transition-all"
          >
            <WhatsAppIcon variant="monochrome" className="w-4 h-4 text-white fill-current" />
            <span>{t.forms.whatsappFastTrack}</span>
          </a>

          <a
            href={`mailto:${submittedLead.targetCorporateEmail}?subject=${mailtoSubject}&body=${mailtoBody}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-[#C8A45D]/50 text-[#C8A45D] hover:bg-[#C8A45D]/10 font-semibold text-xs transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>{t.forms.emailClientCopy}</span>
          </a>
        </div>

        <div className="pt-2 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              setSubmittedLead(null);
              setClientName('');
              setNotes('');
              if (onSuccessClose) onSuccessClose();
            }}
            className="text-xs underline opacity-70 hover:opacity-100 cursor-pointer"
          >
            {t.forms.anotherInquiry}
          </button>
        </div>
      </div>
    );
  }

  const inputClasses = darkTheme
    ? 'w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-[#FAF7F2] placeholder-[#FAF7F2]/40 text-sm focus:outline-none focus:border-[#C8A45D] transition-colors'
    : 'w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/15 text-[#0A1F17] placeholder-[#0A1F17]/45 text-sm focus:outline-none focus:border-[#C8A45D] transition-colors';

  const labelClasses = `block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
    darkTheme ? 'text-[#E2C585]' : 'text-[#0A1F17]/80'
  }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Corporate Email Routing Banner */}
      <div
        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs border ${
          darkTheme
            ? 'bg-[#C8A45D]/10 border-[#C8A45D]/30 text-[#E2C585]'
            : 'bg-[#0A1F17]/5 border-[#C8A45D]/40 text-[#0A1F17]'
        }`}
      >
        <span className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
          <span>{t.forms.routingNotice}</span>
        </span>
        <span className="font-mono font-semibold text-[#C8A45D]">{targetEmail}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="quote-service" className={labelClasses}>
            {t.forms.serviceLabel}
          </label>
          <select
            id="quote-service"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value as LeadSubmission['serviceType'])}
            className={inputClasses}
            required
          >
            <option value="grupos" className="bg-[#071912] text-white">
              {t.forms.serviceOptions.grupos}
            </option>
            <option value="corporativo" className="bg-[#071912] text-white">
              {t.forms.serviceOptions.corporativo}
            </option>
            <option value="bodas" className="bg-[#071912] text-white">
              {t.forms.serviceOptions.bodas}
            </option>
            <option value="hospedaje" className="bg-[#071912] text-white">
              {t.forms.serviceOptions.hospedaje}
            </option>
            <option value="escapadas" className="bg-[#071912] text-white">
              {t.forms.serviceOptions.escapadas}
            </option>
            <option value="visita" className="bg-[#071912] text-white">
              {t.forms.serviceOptions.visita}
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="quote-name" className={labelClasses}>
            {t.forms.nameLabel}
          </label>
          <input
            id="quote-name"
            type="text"
            required
            placeholder={t.forms.namePlaceholder}
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="quote-phone" className={labelClasses}>
            {t.forms.phoneLabel}
          </label>
          <input
            id="quote-phone"
            type="tel"
            required
            placeholder={t.forms.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="quote-email" className={labelClasses}>
            {t.forms.emailLabel}
          </label>
          <input
            id="quote-email"
            type="email"
            required
            placeholder={t.forms.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="quote-date" className={labelClasses}>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {t.forms.dateLabel}
            </span>
          </label>
          <input
            id="quote-date"
            type="date"
            value={tentativeDate}
            onChange={(e) => setTentativeDate(e.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="quote-volume" className={labelClasses}>
            <span className="inline-flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> {t.forms.volumeLabel}
            </span>
          </label>
          <input
            id="quote-volume"
            type="text"
            placeholder={t.forms.volumePlaceholder}
            value={estimatedVolume}
            onChange={(e) => setEstimatedVolume(e.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="quote-org" className={labelClasses}>
            {t.forms.organizationLabel}
          </label>
          <input
            id="quote-org"
            type="text"
            placeholder={t.forms.organizationPlaceholder}
            value={organizationOrCouple}
            onChange={(e) => setOrganizationOrCouple(e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      {!compact && (
        <div>
          <label htmlFor="quote-notes" className={labelClasses}>
            {t.forms.notesLabel}
          </label>
          <textarea
            id="quote-notes"
            rows={3}
            placeholder={t.forms.notesPlaceholder}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={inputClasses}
          />
        </div>
      )}

      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="submit"
          className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-bold bg-gradient-to-r from-[#C8A45D] to-[#DFB96E] text-[#06150F] hover:brightness-110 shadow-lg shadow-[#C8A45D]/20 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>{t.forms.submitBtn}</span>
        </button>

        <a
          href={buildContextualWhatsAppUrl({
            phone: siteConfig.whatsappNumber,
            context: serviceType as WhatsAppContextType,
            clientName,
            itemName: organizationOrCouple,
            tentativeDate,
            guestsOrNights: estimatedVolume,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full text-sm font-semibold border transition-all ${
            darkTheme
              ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30'
              : 'bg-emerald-700 text-white border-emerald-700 hover:bg-emerald-800'
          }`}
        >
          <WhatsAppIcon variant="monochrome" className="w-4 h-4 text-white fill-current" />
          <span>{t.common.quoteWhatsapp} · 0969817891</span>
        </a>
      </div>
    </form>
  );
};
