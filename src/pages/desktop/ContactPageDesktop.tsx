import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Navigation,
  ExternalLink,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Clock,
  Sparkles,
} from 'lucide-react';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import { useCMS } from '../../context/CMSContext';
import { buildContextualWhatsAppUrl } from '../../utils/whatsapp';
import { useDocumentMeta } from '../../utils/seo';
import { ScrollReveal } from '../../components/ScrollReveal';

export const ContactPageDesktop: React.FC = () => {
  const { siteConfig, addLead } = useCMS();

  useDocumentMeta({
    title: 'Contáctanos y Ubicación en Pintag | Hacienda Le Plus',
    description:
      'Ponte en contacto con Hacienda Le Plus en Pintag, Quito. Agenda tu visita para bodas, eventos corporativos o reserva cabañas y suites.',
    canonicalPath: '/contacto',
  });

  // Estado del formulario de contacto
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Determinar la categoría comercial basada en el asunto o mensaje
      let serviceType: 'bodas' | 'corporativo' | 'hospedaje' | 'grupos' | 'escapadas' | 'visita' = 'visita';
      const textToAnalyze = `${formData.subject} ${formData.message}`.toLowerCase();
      if (textToAnalyze.includes('boda') || textToAnalyze.includes('matrimonio')) {
        serviceType = 'bodas';
      } else if (textToAnalyze.includes('corp') || textToAnalyze.includes('empresa') || textToAnalyze.includes('taller')) {
        serviceType = 'corporativo';
      } else if (textToAnalyze.includes('hosp') || textToAnalyze.includes('cabaña') || textToAnalyze.includes('suite')) {
        serviceType = 'hospedaje';
      }

      // Registro oficial del lead en el CMS
      addLead({
        clientName: formData.name,
        organizationOrCouple: formData.company || 'Contacto Directo',
        email: formData.email,
        phone: formData.phone,
        serviceType,
        tentativeDate: 'Por coordinar',
        estimatedVolume: 'Consulta desde formulario de contacto',
        notes: `[Asunto: ${formData.subject || 'Contacto Web'}] ${formData.message}`,
        targetCorporateEmail: siteConfig.corporateEmails.general,
        sourcePage: '/contacto',
      });

      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      company: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  // WhatsApp con mensaje parametrizado para contacto inmediato
  const whatsappContactUrl = buildContextualWhatsAppUrl({
    phone: siteConfig.whatsappNumber,
    context: 'general',
  });

  return (
    <main className="w-full bg-[#FAF7F2] text-[#0A1F17] overflow-x-hidden">
      {/* =========================================================================
          1. HERO HEADER BANNER (CONTACT US)
          ========================================================================= */}
      <section className="relative w-full pt-28 sm:pt-36 pb-36 sm:pb-44 lg:pb-52 overflow-hidden bg-[#06150F] text-white">
        {/* Imagen de fondo con atmósfera de hospitalidad */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hacienda/corporate-salon-hd.jpg"
            alt="Contacto Hacienda Le Plus"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06150F]/90 via-[#06150F]/75 to-[#06150F]/95 backdrop-blur-[2px]" />
        </div>

        {/* Textos centrales */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal direction="down" duration={850} className="space-y-3">
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight drop-shadow-md">
              Contáctanos
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#FAF7F2]/85 max-w-xl mx-auto leading-relaxed font-light">
              Hacienda Le Plus está lista para ofrecerte la solución perfecta según tus necesidades y requerimientos.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          2. FLOATING CONTACT CARD (GET IN TOUCH & SEND US A MESSAGE)
          ========================================================================= */}
      <section className="relative z-20 -mt-28 sm:-mt-32 lg:-mt-36 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="bg-white rounded-3xl shadow-[0_25px_70px_-15px_rgba(6,21,15,0.18)] border border-[#0A1F17]/10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#0A1F17]/10">
            {/* -------------------------------------------------------------------
                COLUMNA IZQUIERDA: "Ponte en contacto" (Get in touch)
                ------------------------------------------------------------------- */}
            <ScrollReveal direction="left" duration={850} className="lg:col-span-5 p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8 bg-white h-full">
              <div className="space-y-6">
                {/* Encabezado izquierdo */}
                <div className="space-y-2">
                  <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#06150F]">
                    Ponte en contacto
                  </h2>
                  <p className="text-xs sm:text-sm text-[#0A1F17]/70 leading-relaxed font-light">
                    Estamos a tu disposición para coordinar visitas a la hacienda, resolver cualquier consulta o preparar una propuesta personalizada a la medida de tu evento o descanso.
                  </p>
                </div>

                {/* 3 Filas de contacto con íconos circulares */}
                <div className="space-y-6 pt-2">
                  {/* 1. Dirección / Oficina Principal */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1B4735]/10 text-[#1B4735] flex items-center justify-center shrink-0 border border-[#1B4735]/20 shadow-sm">
                      <MapPin className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-sm text-[#06150F]">
                        Oficina Principal & Hacienda
                      </h4>
                      <p className="text-xs text-[#0A1F17]/70 leading-relaxed">
                        {siteConfig.address}
                      </p>
                      <p className="text-xs text-[#A6823C] font-semibold">
                        Píntag · Quito, Ecuador
                      </p>
                    </div>
                  </div>

                  {/* 2. Correo Electrónico */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1B4735]/10 text-[#1B4735] flex items-center justify-center shrink-0 border border-[#1B4735]/20 shadow-sm">
                      <Mail className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-sm text-[#06150F]">
                        Correos Electrónicos
                      </h4>
                      <a
                        href={`mailto:${siteConfig.corporateEmails.general}`}
                        className="text-xs text-[#0A1F17]/80 hover:text-[#C8A45D] hover:underline block truncate font-medium"
                      >
                        {siteConfig.corporateEmails.general}
                      </a>
                      <a
                        href={`mailto:${siteConfig.corporateEmails.reservas}`}
                        className="text-xs text-[#0A1F17]/80 hover:text-[#C8A45D] hover:underline block truncate font-medium"
                      >
                        {siteConfig.corporateEmails.reservas}
                      </a>
                    </div>
                  </div>

                  {/* 3. Teléfono & WhatsApp */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1B4735]/10 text-[#1B4735] flex items-center justify-center shrink-0 border border-[#1B4735]/20 shadow-sm">
                      <Phone className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-sm text-[#06150F]">
                        Llámanos & WhatsApp
                      </h4>
                      <p className="text-xs text-[#0A1F17]/80 font-medium">
                        Teléfono: {siteConfig.phoneDisplay}
                      </p>
                      <p className="text-xs text-[#0A1F17]/80 font-medium">
                        WhatsApp: +593 96 981 7891
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redes Sociales con botones circulares */}
              <div className="pt-4 border-t border-[#0A1F17]/10 space-y-3">
                <h5 className="font-bold text-xs sm:text-sm text-[#06150F]">
                  Síguenos en nuestras redes
                </h5>
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook Hacienda Le Plus"
                    className="w-10 h-10 rounded-full bg-[#06150F] hover:bg-[#1B4735] text-white hover:text-[#E2C585] transition-all flex items-center justify-center shadow-sm"
                  >
                    <Facebook className="w-4 h-4 fill-current" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Hacienda Le Plus"
                    className="w-10 h-10 rounded-full bg-[#06150F] hover:bg-[#1B4735] text-white hover:text-[#E2C585] transition-all flex items-center justify-center shadow-sm"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={whatsappContactUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp Oficial"
                    className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all flex items-center justify-center shadow-sm"
                  >
                    <WhatsAppIcon variant="monochrome" className="w-4 h-4 text-white fill-current" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube Hacienda Le Plus"
                    className="w-10 h-10 rounded-full bg-[#06150F] hover:bg-[#1B4735] text-white hover:text-[#E2C585] transition-all flex items-center justify-center shadow-sm"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* -------------------------------------------------------------------
                COLUMNA DERECHA: "Envíanos un mensaje" (Send us a message)
                ------------------------------------------------------------------- */}
            <ScrollReveal direction="right" delay={120} duration={850} className="lg:col-span-7 p-7 sm:p-10 lg:p-12 space-y-6 bg-white h-full">
              <div>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#06150F]">
                  Envíanos un mensaje
                </h2>
                <p className="text-xs text-[#0A1F17]/65 mt-1 font-light">
                  Completa los campos y te responderemos en menos de 24 horas hábiles.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#1B4735]/20 text-center space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-[#1B4735] text-[#E2C585] mx-auto flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-luxury text-2xl font-bold text-[#06150F]">
                    ¡Mensaje recibido con éxito!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0A1F17]/80 max-w-md mx-auto leading-relaxed">
                    Muchas gracias por contactarnos, <strong>{formData.name}</strong>. Un asesor de Hacienda Le Plus se comunicará contigo a la brevedad posible.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={buildContextualWhatsAppUrl({
                        phone: siteConfig.whatsappNumber,
                        context: 'general',
                        itemName: formData.subject || 'Consulta Web',
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white transition-colors shadow-sm"
                    >
                      <WhatsAppIcon variant="monochrome" className="w-4 h-4 fill-current text-white" />
                      <span>Escribir también por WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-3 rounded-full text-xs font-semibold border border-[#0A1F17]/20 text-[#06150F] hover:bg-[#06150F] hover:text-white transition-colors cursor-pointer"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Fila 1: Nombre & Empresa/Evento */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-bold text-[#06150F] block">
                        Nombre
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre y apellido"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 focus:border-[#C8A45D] focus:bg-white text-xs sm:text-sm text-[#06150F] placeholder-[#0A1F17]/40 outline-none transition-all shadow-inner"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-company" className="text-xs font-bold text-[#06150F] block">
                        Empresa / Organización
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Empresa o tipo de evento"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 focus:border-[#C8A45D] focus:bg-white text-xs sm:text-sm text-[#06150F] placeholder-[#0A1F17]/40 outline-none transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Fila 2: Teléfono & Correo */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className="text-xs font-bold text-[#06150F] block">
                        Teléfono
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+593 9..."
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 focus:border-[#C8A45D] focus:bg-white text-xs sm:text-sm text-[#06150F] placeholder-[#0A1F17]/40 outline-none transition-all shadow-inner"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-bold text-[#06150F] block">
                        Correo Electrónico
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@correo.com"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 focus:border-[#C8A45D] focus:bg-white text-xs sm:text-sm text-[#06150F] placeholder-[#0A1F17]/40 outline-none transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Fila 3: Asunto */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="text-xs font-bold text-[#06150F] block">
                      Asunto
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Ej: Cotización Boda, Retiro Corporativo o Reserva de Cabaña"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 focus:border-[#C8A45D] focus:bg-white text-xs sm:text-sm text-[#06150F] placeholder-[#0A1F17]/40 outline-none transition-all shadow-inner"
                    />
                  </div>

                  {/* Fila 4: Mensaje */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-bold text-[#06150F] block">
                      Mensaje
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Escribe aquí los detalles de tu consulta, número estimado de invitados o fecha群tentativa..."
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 focus:border-[#C8A45D] focus:bg-white text-xs sm:text-sm text-[#06150F] placeholder-[#0A1F17]/40 outline-none transition-all shadow-inner resize-y"
                    />
                  </div>

                  {/* Fila 5: Botón Enviar (Send) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl font-bold text-sm bg-[#06150F] hover:bg-[#1B4735] text-white hover:text-[#E2C585] shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. FULL-WIDTH GOOGLE MAPS EMBED SECTION (ANCHO COMPLETO)
          ========================================================================= */}
      <section className="w-full relative border-t border-[#0A1F17]/10 bg-[#FAF7F2] overflow-hidden">
        {/* Contenedor del Mapa a Pantalla Completa */}
        <ScrollReveal direction="up" duration={850}>
          <div className="w-full h-[450px] sm:h-[500px] lg:h-[550px] relative">
            <iframe
              title="Mapa de Ubicación de Hacienda Le Plus en Pintag, Quito"
              src={siteConfig.googleMapsEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Tarjeta flotante sobre el mapa (Información y Cómo Llegar) */}
            <ScrollReveal direction="down-left" delay={250} duration={750} className="absolute top-6 left-4 sm:left-8 z-10 max-w-sm w-[calc(100%-2rem)] sm:w-auto">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#0A1F17]/10 space-y-2.5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1B4735] text-[#E2C585] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif-luxury text-base sm:text-lg font-bold text-[#06150F]">
                      Hacienda Le Plus
                    </h4>
                    <p className="text-[11px] text-[#0A1F17]/70 truncate">
                      {siteConfig.address}
                    </p>
                    <p className="text-[10px] text-[#A6823C] font-semibold">
                      Píntag · Valle de los Chillos, Quito
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#0A1F17]/10 flex items-center justify-between gap-3 text-xs">
                  <span className="text-[11px] text-[#0A1F17]/60">
                    A 30 min del Aeropuerto
                  </span>
                  <a
                    href={siteConfig.googleMapsDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold bg-[#06150F] text-[#E2C585] hover:bg-[#1B4735] transition-colors shadow-sm"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Cómo llegar</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
};
export { ContactPageDesktop as ContactPage };
export default ContactPageDesktop;
