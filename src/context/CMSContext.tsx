import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SiteConfig,
  ServicePackage,
  CabinRoom,
  EventPhoto,
  CaseStudy,
  FAQItem,
  LeadSubmission,
  LeadStatus,
} from '../types/cms';
import {
  saveLeadToSupabase,
  fetchLeadsFromSupabase,
  updateLeadStatusInSupabase,
  deleteLeadFromSupabase,
  saveSiteConfigToSupabase,
  fetchSiteConfigFromSupabase,
} from '../lib/supabase';

const STORAGE_KEY = 'hacienda_leplus_cms_v3';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  brandName: 'Hacienda Le Plus',
  tagline: 'Hospedaje de larga estadía, grandes eventos y bodas en Quito–Píntag.',
  heroOverline: 'QUITO–PÍNTAG · LARGA ESTADÍA · GRANDES EVENTOS · BODAS',
  heroTitle: 'Más que una hacienda — tu sede para largas estadías y grandes eventos.',
  heroSubtitle:
    'Prioridad comercial en hospedaje de larga estadía para empresas, delegaciones, ONG y grupos internacionales (14 habitaciones para 28 a 80 personas) y grandes eventos corporativos o bodas en Quito–Píntag, con restaurante, piscina e instalaciones deportivas como complementos.',
  heroVideoUrl:
    'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-resort-in-the-mountains-41573-large.mp4',
  heroPosterUrl: '/images/hacienda/vista-aerea.jpg',
  whatsappNumber: '593969817891',
  phoneDisplay: '0969817891',
  address: 'Barrio San Juan de la Tola, Calle Deus N.º 100, Quito–Píntag',
  cityRegion: 'Quito–Píntag, Valle de los Chillos · Distrito Metropolitano de Quito, Ecuador',
  airportReference:
    'Ubicación estratégica en Quito–Píntag: a 40 minutos de Quito y 30 minutos del Aeropuerto Internacional Mariscal Sucre.',
  googleMapsEmbedUrl:
    'https://www.google.com/maps?q=Pintag,+Quito,+Ecuador&output=embed',
  googleMapsDirectUrl:
    'https://www.google.com/maps/search/?api=1&query=Calle+Deus+100+San+Juan+de+la+Tola+Pintag+Quito',
  responseCommitment:
    'Cotizaciones directas según número de personas y duración por WhatsApp al 0969817891 y atención comercial personalizada.',
  corporateEmails: {
    general: 'info@haciendaleplus.com',
    bodas: 'bodas@haciendaleplus.com',
    corporativo: 'corporativo@haciendaleplus.com',
    reservas: 'reservas@haciendaleplus.com',
    gerencia: 'leplus2022@gmail.com',
  },
};

export const DEFAULT_PACKAGES: ServicePackage[] = [
  {
    id: 'pkg-grupos-largas',
    category: 'hospedaje',
    title: 'Hospedaje Larga Estadía: Empresas, Delegaciones y ONGs',
    subtitle: 'Prioridad comercial: alojamiento para personal de empresas, ONG, voluntarios y grupos internacionales.',
    priceLabel: 'Desde',
    priceValue: 35,
    unit: 'por persona / noche (según grupo y duración)',
    capacity: '28 a 80 personas en 14 habitaciones',
    setupInfo: 'Habitaciones + Alimentación + Internet Fibra Óptica + Parqueaderos',
    description:
      'Alojamiento estratégico en Quito–Píntag para personal de empresas, delegaciones, ONG (IMC · HXP), voluntarios y grupos internacionales. Cotización flexible según número de personas y duración, con piscina, restaurante y áreas recreativas como complemento.',
    inclusions: [
      '14 habitaciones configurables (individuales, dobles, múltiples de 5 pax y suites)',
      'Alimentación completa en restaurante propio (desayuno, almuerzo, cena y refrigerios)',
      'Internet Wi-Fi por fibra óptica de alta estabilidad y amplios parqueaderos privados',
      'Complementos incluidos: piscina temperada 14×6m, sauna, turco, hidromasajes y canchas deportivas',
    ],
    highlightBadge: 'Prioridad Comercial · Larga Estadía',
    image: '/images/hacienda/grupos-hxp.jpg',
    whatsappIntent: 'Hospedaje Larga Estadía para Empresa / Grupo',
    featuredInHome: true,
  },
  {
    id: 'pkg-corp-jornada',
    category: 'corporativo',
    title: 'Grandes Eventos, Fin de Año, Integración y Convenciones',
    subtitle: 'Macroeventos empresariales con carpas, jardines, catering, tarima, pista de baile y canchas.',
    priceLabel: 'Desde',
    priceValue: 45,
    unit: 'por participante',
    capacity: '50 a 350 participantes',
    setupInfo: 'Carpas + Jardines 5.000 m² + Tarima + Pista de Baile + Canchas + Piscina',
    description:
      'Escenario integral en Quito–Píntag para eventos corporativos de fin de año, jornadas de integración, convenciones y celebraciones de gran formato, fortalecido con restaurante propio, actividades deportivas, piscina y hospedaje complementario.',
    inclusions: [
      'Carpas estructurales de gran formato, salones en madera, tarima y pista de baile',
      '5.000 m² de jardines y canchas deportivas (fútbol, vóley y básquet) para integración',
      'Catering corporativo: parrilladas abundantes, banquetes de fin de año y coffee breaks',
      'Complementos: piscina temperada 14×6m, zona húmeda, parqueaderos para buses y 14 habitaciones',
    ],
    highlightBadge: 'Macroeventos & Empresas',
    image: '/images/hacienda/jardines-teambuilding.jpg',
    whatsappIntent: 'Gran Evento Corporativo / Fin de Año / Integración',
    featuredInHome: true,
  },
  {
    id: 'pkg-corp-retiro',
    category: 'corporativo',
    title: 'Convenciones y Encuentros Empresariales con Hospedaje Complementario',
    subtitle: 'Sesiones estratégicas, plenarias y celebración con alojamiento in situ para equipos y directivos.',
    priceLabel: 'Desde',
    priceValue: 88,
    unit: 'por persona / noche',
    capacity: '28 a 80 participantes alojados (hasta 250 en plenaria)',
    setupInfo: 'Salones + Tarima & AV + Catering 3 Tiempos + Piscina + 14 Habitaciones',
    description:
      'Combina convenciones, talleres o celebraciones empresariales con hospedaje complementario en nuestras 14 habitaciones, internet por fibra óptica, alimentación completa y áreas recreativas.',
    inclusions: [
      'Salones equipados con pantalla gigante, sonido profesional, tarima e internet fibra óptica',
      'Hospedaje complementario en 14 habitaciones para directivos, ponentes o equipos',
      'Tres comidas diarias en nuestro restaurante y coffee breaks continuos',
      'Acceso complementario a piscina 14×6m, 2 hidromasajes, sauna, turco y parqueadero privado',
    ],
    highlightBadge: 'Convención + Hospedaje',
    image: '/images/hacienda/reunion-corporativa.jpg',
    whatsappIntent: 'Convención Empresarial con Hospedaje Complementario',
    featuredInHome: false,
  },
  {
    id: 'pkg-boda-gastronomia',
    category: 'bodas',
    title: 'Bodas y Celebraciones: Ceremonia, Recepción, Jardines y Catering',
    subtitle: 'Ceremonias al aire libre, recepción de gala, decoración y gastronomía propia en Quito–Píntag.',
    priceLabel: 'Desde',
    priceValue: 70,
    unit: 'por invitado',
    capacity: '80 a 300 invitados',
    setupInfo: 'Jardines Ceremoniales + Carpa de Gala + Catering + Decoración',
    description:
      'Escenario campestre y elegante para bodas y eventos sociales: ceremonias en jardines con vista a los volcanes, recepción en carpa estructural o salón, catering de autor, decoración y suite nupcial.',
    inclusions: [
      'Jardines para ceremonia al aire libre y carpa/salón cubierto para recepción',
      'Catering propio (bocaditos, menú de gala, parrilladas y postres) y decoración',
      'Tarima, pista de baile, coordinación de protocolo y personal profesional de servicio',
      'Suite nupcial de cortesía y parqueadero privado con seguridad permanente',
    ],
    highlightBadge: 'Bodas & Celebraciones',
    image: '/images/hacienda/montaje-banquete.jpg',
    whatsappIntent: 'Boda y Celebración Social',
    featuredInHome: true,
  },
  {
    id: 'pkg-boda-hospedaje',
    category: 'bodas',
    title: 'Boda Destino + Hospedaje para Invitados (14 Habitaciones)',
    subtitle: 'Ceremonia, recepción y alojamiento exclusivo de 28 a 80 invitados dentro de la hacienda.',
    priceLabel: 'Desde',
    priceValue: 95,
    unit: 'por invitado',
    capacity: 'Hasta 80 invitados alojados en 14 habitaciones',
    setupInfo: 'Ceremonia + Recepción + 14 Habitaciones + Piscina & Desayuno',
    description:
      'Ideal para bodas con familias que vienen fuera de Quito o del extranjero. Integra ceremonia, recepción, decoración, catering y hospedaje para invitados con piscina y desayuno al día siguiente.',
    inclusions: [
      'Bloqueo de nuestras 14 habitaciones para alojar cómodamente de 28 a 80 invitados',
      'Uso complementario de piscina 14×6m, 2 hidromasajes, sauna y baño turco',
      'Desayuno americano en nuestro restaurante a la mañana siguiente del evento',
      'Amplios parqueaderos internos y opción de flota de buses para traslado de invitados',
    ],
    highlightBadge: 'Boda + Hospedaje Invitados',
    image: '/images/hacienda/bodas-exteriores.jpg',
    whatsappIntent: 'Boda con Hospedaje para Invitados',
    featuredInHome: false,
  },
  {
    id: 'pkg-escapada-pareja',
    category: 'escapadas',
    title: 'Hospedaje Corporativo por Semanas o Quincenas (Personal de Empresas)',
    subtitle: 'Alojamiento funcional con alimentación, internet por fibra óptica y parqueadero para equipos técnicos.',
    priceLabel: 'Desde',
    priceValue: 40,
    unit: 'por persona / noche (planes corporativos)',
    capacity: 'Equipos de 10 a 80 personas',
    setupInfo: 'Habitaciones + Alimentación + Fibra Óptica + Parqueadero Flotas',
    description:
      'Solución llave en mano para empresas, contratistas y proyectos que requieren alojar personal cerca de Quito y del Aeropuerto con control presupuestario, alimentación e internet.',
    inclusions: [
      'Habitaciones individuales, dobles o múltiples con limpieza programada y lavandería',
      'Desayunos, almuerzos y cenas ajustados a los turnos de trabajo del personal',
      'Internet por fibra óptica, salas de trabajo y parqueadero cerrado para camionetas y buses',
      'Acceso complementario a piscina temperada, área húmeda y canchas deportivas',
    ],
    highlightBadge: 'Personal de Empresas',
    image: '/images/hacienda/cabana-exterior.jpg',
    whatsappIntent: 'Hospedaje para Personal de Empresa',
    featuredInHome: true,
  },
];

export const DEFAULT_CABINS: CabinRoom[] = [
  {
    id: 'cabin-complejo-grupal',
    name: 'Bloque Institucional Completo (14 Habitaciones)',
    type: 'Villa Grupal',
    capacity: '28 a 80 Personas (Empresas, ONGs y Delegaciones)',
    maxGuests: 80,
    beds: '14 Habitaciones (Individuales, Dobles y Múltiples)',
    bathrooms: 14,
    pricePerNight: 35,
    weekendNote: 'Tarifa desde $35 por persona/noche según número de personas y duración (semanas o meses). Incluye internet fibra óptica y parqueaderos.',
    description:
      'Capacidad total de la hacienda para personal de empresas, delegaciones, ONG, voluntarios y grupos internacionales, con alimentación en restaurante propio, internet por fibra óptica, parqueaderos privados y acceso complementario a piscina y canchas.',
    amenities: ['14 Habitaciones (28–80 Pax)', 'Alimentación 3 Tiempos', 'Internet Fibra Óptica', 'Parqueadero Buses/Flotas', 'Lavandería & Limpieza'],
    image: '/images/hacienda/grupos-hxp.jpg',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-chalet-familiar',
    name: 'Habitaciones Múltiples & Chalet para Grupos (5 Pax)',
    type: 'Cabaña Familiar',
    capacity: 'Hasta 5 Personas por Habitación',
    maxGuests: 5,
    beds: 'Camas Individuales y Dobles (2 Suites + 2 Hab. de 5 Pax)',
    bathrooms: 2,
    pricePerNight: 165,
    weekendNote: 'Cotización especial por duración para brigadas técnicas, voluntarios, misiones y equipos de trabajo.',
    description:
      'Edificación de dos plantas en madera y piedra con terrazas panorámicas. Ideal para alojar equipos de empresas, voluntarios, delegaciones deportivas o grupos con internet estable, alimentación y parqueadero interno.',
    amenities: ['Capacidad 5 Pax / Hab.', 'Internet Fibra Óptica', 'Alimentación Programada', 'Parqueadero Privado', 'Piscina & Canchas'],
    image: '/images/hacienda/cabana-exterior.jpg',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-suite-1',
    name: 'Suite Ejecutiva Le Plus No. 1 (Balcón & Fibra Óptica)',
    type: 'Suite Matrimonial',
    capacity: 'Ejecutivos, Líderes o 1 a 3 Pax',
    maxGuests: 3,
    beds: '1 Cama Matrimonial + 1 Cama Adicional',
    bathrooms: 1,
    pricePerNight: 115,
    weekendNote: 'Tarifas corporativas preferenciales para estadías semanales o mensuales de directivos y coordinadores.',
    description:
      'Acogedora suite en madera noble para directivos de empresas, coordinadores de ONG o huéspedes en larga estadía. Cuenta con baño privado, escritorio/Wi-Fi por fibra óptica, TV, parqueadero y acceso a restaurante y piscina.',
    amenities: ['Balcón con Vista', 'Internet Fibra Óptica', 'Alimentación Incluida', 'Parqueadero Seguro', 'Zona Húmeda & Piscina'],
    image: '/images/hacienda/suite-1.jpg',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-suite-2',
    name: 'Suite Ejecutiva Le Plus No. 2 (Confort Corporativo)',
    type: 'Suite Matrimonial',
    capacity: 'Personal de Empresa, Pareja o 3 Pax',
    maxGuests: 3,
    beds: '1 Cama King/Queen + 1 Cama Individual',
    bathrooms: 1,
    pricePerNight: 115,
    weekendNote: 'Ideal para supervisores de proyecto, consultores internacionales o invitados de eventos.',
    description:
      'Arquitectura cálida con techos de madera vista, ventanales luminosos, agua caliente permanente, internet por fibra óptica para teletrabajo, alimentación en restaurante y estacionamiento privado.',
    amenities: ['1 a 3 Huéspedes', 'Fibra Óptica Estable', 'Baño Privado', 'Parqueadero Interno', 'Restaurante & Piscina'],
    image: '/images/hacienda/suite-2.jpg',
    available: true,
    featuredInHome: true,
  },
];

export const DEFAULT_PHOTOS: EventPhoto[] = [
  {
    id: 'photo-1',
    title: 'Vista Aérea Panorámica de Hacienda Le Plus en Píntag',
    category: 'Naturaleza & Gastronomía',
    spaceName: 'Valle de los Chillos · Píntag',
    dateTag: 'A 30 min del Aeropuerto',
    imageUrl: '/images/hacienda/vista-aerea.jpg',
    description: 'Extensas áreas verdes, piscina, salones, cabañas y estacionamiento privado rodeados de naturaleza.',
    featured: true,
  },
  {
    id: 'photo-2',
    title: 'Atardecer en la Cancha y Casona Principal',
    category: 'Hospedaje',
    spaceName: 'Eco Club · Resort',
    dateTag: 'Atardecer Andino',
    imageUrl: '/images/hacienda/hero-atardecer.jpg',
    description: 'Cielos despejados, canchas deportivas e instalaciones iluminadas para convivencia segura.',
    featured: true,
  },
  {
    id: 'photo-3',
    title: 'Montaje Corporativo y Banquetes de Gala',
    category: 'Bodas',
    spaceName: 'Carpa Estructural & Jardines',
    dateTag: 'Eventos & Bodas',
    imageUrl: '/images/hacienda/montaje-banquete.jpg',
    description: 'Recepciones elegantes con pantalla LED, candelabros florales y atención con personal profesional.',
    featured: true,
  },
  {
    id: 'photo-4',
    title: 'Grandes Áreas Verdes para Team Building e Integración',
    category: 'Corporativo',
    spaceName: 'Explanada Verde Le Plus',
    dateTag: 'Empresas & Colegios',
    imageUrl: '/images/hacienda/jardines-teambuilding.jpg',
    description: 'Dinámicas grupales al aire libre con parqueadero interno para vehículos y buses.',
    featured: true,
  },
  {
    id: 'photo-5',
    title: 'Piscina de 14×6m y Dos Hidromasajes',
    category: 'Hospedaje',
    spaceName: 'Zona Húmeda & Recreación',
    dateTag: 'Bienestar',
    imageUrl: '/images/hacienda/piscina-nocturna.jpg',
    description: 'Iluminación nocturna, sauna, baño turco y áreas de descanso para nuestros huéspedes.',
    featured: true,
  },
  {
    id: 'photo-6',
    title: 'Parrilladas Abundantes y Gastronomía para Grupos',
    category: 'Naturaleza & Gastronomía',
    spaceName: 'Cocina & Parrilla Le Plus',
    dateTag: 'Catering & Menús',
    imageUrl: '/images/hacienda/gastronomia-parrillada.jpg',
    description: 'Desayunos americanos, almuerzos, cenas, coffee breaks y parrilladas preparadas al momento.',
    featured: true,
  },
];

export const DEFAULT_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-hxp-grupos',
    category: 'ONGs del Mundo Nos Eligen (IMC · HXP)',
    title: 'Estadías Prolongadas para Delegaciones Internacionales y Voluntariado',
    clientProfile: 'Organizaciones Internacionales · IMC · HXP · Embajadas',
    metrics: '28 a 80 huéspedes · 14 habitaciones · Varias semanas',
    challenge:
      'Las delegaciones internacionales requieren una base segura cerca del Aeropuerto Mariscal Sucre (30 min) y Quito (40 min) con alimentación planificada, fibra óptica y áreas de convivencia.',
    solution:
      'Operación integral con distribución flexible en 14 habitaciones, 3 comidas diarias coordinadas por horario, lavandería, salones exclusivos y flota propia de buses para recorridos.',
    quote:
      '“Privacidad, amplitud y atención directa para que nuestros grupos internacionales puedan concentrarse, descansar y convivir durante varias semanas en Ecuador.”',
    author: 'Coordinación de Delegaciones Internacionales (IMC · HXP)',
    image: '/images/hacienda/grupos-hxp.jpg',
    linkTo: '/hospedaje',
  },
  {
    id: 'case-empresa-real',
    category: 'Instituciones & Sector Corporativo',
    title: 'Reuniones Institucionales, GAD de Pichincha y Jornadas de Team Building',
    clientProfile: 'Instituciones del Estado · Bancos · Universidades · Empresas',
    metrics: 'Salones equipados · Fibra óptica · Grandes áreas verdes',
    challenge:
      'Contar con un mismo lugar reservado para sesionar con internet de fibra óptica, realizar actividades de integración al aire libre y servir almuerzos o parrilladas puntuales.',
    solution:
      'Salones interiores en madera para plenarias y talleres, canchas deportivas (fútbol, vóley, básquet), áreas verdes y servicio gastronómico completo sin múltiples proveedores.',
    quote:
      '“Más que habitaciones o un salón: una solución coordinada que facilita el control del presupuesto y garantiza una jornada impecable.”',
    author: 'Coordinación de Eventos Institucionales y Corporativos',
    image: '/images/hacienda/reunion-corporativa.jpg',
    linkTo: '/corporativo',
  },
  {
    id: 'case-boda-real',
    category: 'Bodas & Celebraciones Sociales',
    title: 'Ceremonias al Aire Libre, Recepciones de Gala y Hotel Boutique In Situ',
    clientProfile: 'Matrimonios, Recepciones y Eventos Sociales en Píntag',
    metrics: 'Amplias áreas exteriores · Carpas de gala · 14 habitaciones',
    challenge:
      'Integrar ceremonia campestre, recepción elegante bajo carpa estructural o salón, personal de servicio uniformado y alojamiento para la familia en un mismo predio.',
    solution:
      'Montaje completo con flores, menaje fino, equipo profesional en todas las áreas (cocina, meseros, seguridad) y suites matrimoniales y familiares listas para los invitados.',
    quote:
      '“Amplias áreas exteriores para tu evento y un equipo profesional en todas las áreas para crear momentos inolvidables.”',
    author: 'Familias & Novios — Hacienda Le Plus',
    image: '/images/hacienda/montaje-banquete.jpg',
    linkTo: '/bodas',
  },
];

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'hospedaje',
    question: '¿Cuál es la capacidad real de hospedaje y cuántas habitaciones tiene la Hacienda?',
    answer:
      'Hacienda Le Plus dispone de 14 habitaciones con diferentes configuraciones (suites matrimoniales para pareja o 3 pax, y habitaciones familiares/múltiples para 5 pax), permitiendo alojar cómodamente desde 28 hasta 80 personas según la distribución deseada.',
  },
  {
    id: 'faq-2',
    category: 'general',
    question: '¿A qué distancia está de Quito y del Aeropuerto Internacional Mariscal Sucre?',
    answer:
      'Estamos ubicados en Píntag (Barrio San Juan de la Tola, Calle Deus N.º 100), en el Valle de los Chillos, aproximadamente a 40 minutos de Quito y a 30 minutos del Aeropuerto Internacional Mariscal Sucre, con acceso vehicular directo y estacionamiento privado interno.',
  },
  {
    id: 'faq-3',
    category: 'corporativo',
    question: '¿Qué instalaciones recreativas, de bienestar y conectividad incluye la propiedad?',
    answer:
      'Contamos con internet de fibra óptica para trabajo remoto y reuniones, piscina de 14×6 metros, dos hidromasajes, sauna, baño turco, canchas de fútbol, vóley y básquet, salón social con billar, ping-pong y karaoke, además de extensos jardines con vista a los volcanes.',
  },
  {
    id: 'faq-4',
    category: 'bodas',
    question: '¿Qué información se necesita para recibir una cotización personalizada?',
    answer:
      'Solo debes indicarnos tu nombre o institución, fechas estimadas de ingreso/evento, número aproximado de huéspedes o invitados, plan de alimentación requerido (desayuno, almuerzo, cena, coffee break o banquete) y si requieres salones o transporte en nuestra flota de buses.',
  },
];

export const DEFAULT_LEADS: LeadSubmission[] = [
  {
    id: 'lead-demo-1',
    createdAt: '2026-10-16 16:40',
    clientName: 'Valeria Andrade & Mateo Cueva',
    organizationOrCouple: 'Boda Andrade - Cueva',
    email: 'valeria.andrade@email.com',
    phone: '0998451230',
    serviceType: 'bodas',
    tentativeDate: '2027-02-20',
    estimatedVolume: '150 invitados (con 35 huéspedes en suites)',
    notes: 'Deseamos agendar visita técnica este sábado para ver las áreas exteriores, carpa y las Suites No. 1 y No. 2.',
    targetCorporateEmail: 'bodas@haciendaleplus.com',
    sourcePage: '/bodas',
    status: 'Visita Agendada',
  },
  {
    id: 'lead-demo-2',
    createdAt: '2026-10-17 09:15',
    clientName: 'Ing. Roberto Salazar',
    organizationOrCouple: 'Coordinación Interinstitucional Pichincha',
    email: 'rsalazar@institucion.gob.ec',
    phone: '0987123490',
    serviceType: 'corporativo',
    tentativeDate: '2026-11-28',
    estimatedVolume: '90 participantes',
    notes: 'Jornada de planificación y team building en áreas verdes con coffee break y parrillada.',
    targetCorporateEmail: 'corporativo@haciendaleplus.com',
    sourcePage: '/corporativo',
    status: 'Propuesta Enviada',
  },
  {
    id: 'lead-demo-3',
    createdAt: '2026-10-17 11:30',
    clientName: 'Sarah Jenkins',
    organizationOrCouple: 'HXP / International Youth Delegation',
    email: 'sjenkins@hxp-missions.org',
    phone: '+1 801 555 0192',
    serviceType: 'grupos',
    tentativeDate: '2027-06-10',
    estimatedVolume: '45 personas × 18 noches (14 habitaciones)',
    notes: 'Looking for full-board accommodation (breakfast, lunch, dinner), laundry service, and airport bus transfer.',
    targetCorporateEmail: 'reservas@haciendaleplus.com',
    sourcePage: '/hospedaje',
    status: 'Nuevo',
  },
];

interface CMSState {
  siteConfig: SiteConfig;
  packages: ServicePackage[];
  cabins: CabinRoom[];
  photos: EventPhoto[];
  caseStudies: CaseStudy[];
  faqs: FAQItem[];
  leads: LeadSubmission[];
}

interface CMSContextValue extends CMSState {
  updateSiteConfig: (newConfig: Partial<SiteConfig>) => void;
  updatePackage: (pkg: ServicePackage) => void;
  addPackage: (pkg: Omit<ServicePackage, 'id'>) => void;
  deletePackage: (id: string) => void;
  updateCabin: (cabin: CabinRoom) => void;
  addCabin: (cabin: Omit<CabinRoom, 'id'>) => void;
  deleteCabin: (id: string) => void;
  addPhoto: (photo: Omit<EventPhoto, 'id'>) => void;
  deletePhoto: (id: string) => void;
  togglePhotoFeatured: (id: string) => void;
  addLead: (lead: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>) => LeadSubmission;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  deleteLead: (id: string) => void;
  resetToDefaults: () => void;
  isQuoteModalOpen: boolean;
  quoteModalPreset: {
    serviceType?: LeadSubmission['serviceType'];
    itemName?: string;
  };
  openQuoteModal: (preset?: { serviceType?: LeadSubmission['serviceType']; itemName?: string }) => void;
  closeQuoteModal: () => void;
}

const CMSContext = createContext<CMSContextValue | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CMSState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          siteConfig: { ...DEFAULT_SITE_CONFIG, ...parsed.siteConfig },
          packages: parsed.packages?.length ? parsed.packages : DEFAULT_PACKAGES,
          cabins: parsed.cabins?.length ? parsed.cabins : DEFAULT_CABINS,
          photos: parsed.photos?.length ? parsed.photos : DEFAULT_PHOTOS,
          caseStudies: parsed.caseStudies?.length ? parsed.caseStudies : DEFAULT_CASE_STUDIES,
          faqs: parsed.faqs?.length ? parsed.faqs : DEFAULT_FAQS,
          leads: parsed.leads || DEFAULT_LEADS,
        };
      }
    } catch (e) {
      console.error('Error loading CMS state from localStorage:', e);
    }
    return {
      siteConfig: DEFAULT_SITE_CONFIG,
      packages: DEFAULT_PACKAGES,
      cabins: DEFAULT_CABINS,
      photos: DEFAULT_PHOTOS,
      caseStudies: DEFAULT_CASE_STUDIES,
      faqs: DEFAULT_FAQS,
      leads: DEFAULT_LEADS,
    };
  });

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteModalPreset, setQuoteModalPreset] = useState<{
    serviceType?: LeadSubmission['serviceType'];
    itemName?: string;
  }>({});

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving CMS state to localStorage:', e);
    }
  }, [state]);

  // Sincronización inicial desde Supabase
  useEffect(() => {
    fetchLeadsFromSupabase().then((remoteLeads) => {
      if (remoteLeads && remoteLeads.length > 0) {
        setState((prev) => {
          // Unir leads remotos con locales evitando duplicados
          const existingIds = new Set(remoteLeads.map((l) => l.id));
          const uniqueLocal = prev.leads.filter((l) => !existingIds.has(l.id));
          return { ...prev, leads: [...remoteLeads, ...uniqueLocal] };
        });
      }
    });

    fetchSiteConfigFromSupabase().then((remoteConfig) => {
      if (remoteConfig) {
        setState((prev) => ({
          ...prev,
          siteConfig: { ...prev.siteConfig, ...remoteConfig },
        }));
      }
    });
  }, []);

  const updateSiteConfig = (newConfig: Partial<SiteConfig>) => {
    setState((prev) => {
      const merged = { ...prev.siteConfig, ...newConfig };
      saveSiteConfigToSupabase(merged);
      return {
        ...prev,
        siteConfig: merged,
      };
    });
  };

  const updatePackage = (updated: ServicePackage) => {
    setState((prev) => ({
      ...prev,
      packages: prev.packages.map((p) => (p.id === updated.id ? updated : p)),
    }));
  };

  const addPackage = (pkg: Omit<ServicePackage, 'id'>) => {
    const newPkg: ServicePackage = {
      ...pkg,
      id: `pkg-${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      packages: [newPkg, ...prev.packages],
    }));
  };

  const deletePackage = (id: string) => {
    setState((prev) => ({
      ...prev,
      packages: prev.packages.filter((p) => p.id !== id),
    }));
  };

  const updateCabin = (updated: CabinRoom) => {
    setState((prev) => ({
      ...prev,
      cabins: prev.cabins.map((c) => (c.id === updated.id ? updated : c)),
    }));
  };

  const addCabin = (cabin: Omit<CabinRoom, 'id'>) => {
    const newCabin: CabinRoom = {
      ...cabin,
      id: `cabin-${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      cabins: [...prev.cabins, newCabin],
    }));
  };

  const deleteCabin = (id: string) => {
    setState((prev) => ({
      ...prev,
      cabins: prev.cabins.filter((c) => c.id !== id),
    }));
  };

  const addPhoto = (photo: Omit<EventPhoto, 'id'>) => {
    const newPhoto: EventPhoto = {
      ...photo,
      id: `photo-${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      photos: [newPhoto, ...prev.photos],
    }));
  };

  const deletePhoto = (id: string) => {
    setState((prev) => ({
      ...prev,
      photos: prev.photos.filter((p) => p.id !== id),
    }));
  };

  const togglePhotoFeatured = (id: string) => {
    setState((prev) => ({
      ...prev,
      photos: prev.photos.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)),
    }));
  };

  const addLead = (leadData: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>): LeadSubmission => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(
      2,
      '0'
    )}`;

    const newLead: LeadSubmission = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: formattedDate,
      status: 'Nuevo',
    };

    setState((prev) => ({
      ...prev,
      leads: [newLead, ...prev.leads],
    }));

    // Persistir asíncronamente en Supabase
    saveLeadToSupabase(newLead);

    return newLead;
  };

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    setState((prev) => ({
      ...prev,
      leads: prev.leads.map((l) => (l.id === id ? { ...l, status } : l)),
    }));
    updateLeadStatusInSupabase(id, status);
  };

  const deleteLead = (id: string) => {
    setState((prev) => ({
      ...prev,
      leads: prev.leads.filter((l) => l.id !== id),
    }));
    deleteLeadFromSupabase(id);
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      siteConfig: DEFAULT_SITE_CONFIG,
      packages: DEFAULT_PACKAGES,
      cabins: DEFAULT_CABINS,
      photos: DEFAULT_PHOTOS,
      caseStudies: DEFAULT_CASE_STUDIES,
      faqs: DEFAULT_FAQS,
      leads: DEFAULT_LEADS,
    });
  };

  const openQuoteModal = (preset?: { serviceType?: LeadSubmission['serviceType']; itemName?: string }) => {
    setQuoteModalPreset(preset || {});
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setQuoteModalPreset({});
  };

  return (
    <CMSContext.Provider
      value={{
        ...state,
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
        addLead,
        updateLeadStatus,
        deleteLead,
        resetToDefaults,
        isQuoteModalOpen,
        quoteModalPreset,
        openQuoteModal,
        closeQuoteModal,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
