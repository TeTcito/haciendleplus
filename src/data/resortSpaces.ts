import { SupportedLanguage } from '../i18n/types';
import { tr, trList } from '../i18n/phraseDictionary';
import {
  HeartHandshake,
  Building2,
  Heart,
  Utensils,
  Waves,
  ShieldCheck,
  BedDouble,
  LucideIcon,
} from 'lucide-react';
import type { ServicePackage, CabinRoom, LodgingServiceCard, CorporateHighlightItem } from '../types/cms';

export interface ResortSpaceItem {
  id: string;
  title_es: string;
  title_en: string;
  subtitle_es: string;
  subtitle_en: string;
  badge_es: string;
  badge_en: string;
  description_es: string;
  description_en: string;
  mediaType: 'image' | 'video';
  image: string;
  imagePosition?: string;
  videoUrl?: string;
  capacities: {
    auditorium: string;
    banquet: string;
    school: string;
    uShape: string;
    cocktail?: string;
  };
  areaM2?: number | string;
  notes_es: string;
  notes_en: string;
  inclusions_es: string[];
  inclusions_en: string[];
}

export const RESORT_SPACES: ResortSpaceItem[] = [
  {
    id: 'carpas-jardines',
    title_es: 'Carpas Estructurales & Jardines de Gran Formato',
    title_en: 'Structural Tents & Grand-Format Andean Gardens',
    subtitle_es: 'Gran Formato 350+ pax · 13.000 m² de jardines · 8 baños ext.',
    subtitle_en: 'Grand Format 350+ guests · 13,000 m² lawns · 8 external restrooms',
    badge_es: 'Macroeventos & Fin de Año',
    badge_en: 'Macro-Events & Year-End Galas',
    description_es:
      'Carpas de gala impermeables de alta gama instaladas sobre 13.000 m² de jardines planos en Quito–Píntag. Diseñadas para eventos masivos con 8 baños externos dedicados, de 80 a 100 parqueaderos internos, tarima modular, pista de baile iluminada, generador de respaldo y catering propio.',
    description_en:
      'High-end waterproof gala tents erected over 13,000 m² of flat lawns in Quito–Píntag. Purpose-built for large-scale events with 8 dedicated external restrooms, 80 to 100 on-site parking spaces, modular stage, illuminated dance floor, backup power generator, and in-house catering.',
    mediaType: 'image',
    image: '/images/hacienda/boda-carpa-gala.jpg',
    videoUrl: '',
    capacities: {
      auditorium: '350+ pax',
      banquet: '300 pax',
      school: '180 pax',
      uShape: 'N/A',
      cocktail: '400+ pax',
    },
    areaM2: '13.000 m²',
    notes_es: '13.000 m² de jardines, 8 baños externos, 80–100 parqueaderos, tarima y catering',
    notes_en: '13,000 m² lawns, 8 external restrooms, 80–100 parking spots, stage & catering',
    inclusions_es: [
      '13.000 m² de jardines nivelados para ceremonias, activaciones o banquetes',
      '8 baños externos independientes + 80 a 100 parqueaderos internos para autos y buses',
      'Carpas estructurales blancas con cortinajes y cielo falso decorativo',
      'Tarima modular regulable y pista de baile tratada de alta resistencia',
      'Catering propio con menús de 3 tiempos, parrilladas o buffets',
    ],
    inclusions_en: [
      '13,000 m² of flat landscaped lawns for ceremonies, corporate activations, or galas',
      '8 independent external restrooms + 80 to 100 gated parking spaces for cars & coaches',
      'Engineered white gala tents with drapery and decorative false ceilings',
      'Modular adjustable stage and heavy-duty engineered dance floor',
      'Full in-house catering offering 3-course plated banquets, gourmet BBQ, and buffets',
    ],
  },
  {
    id: 'gran-salon',
    title_es: 'Salón Social (Eventos & Coaching*), Convenciones y Discoteca*',
    title_en: 'Social Hall (Events & Coaching*), Conventions & Club*',
    subtitle_es: 'Salón 250 pax · Discoteca 50 pax* · Karaoke* (*pago extra)',
    subtitle_en: 'Hall 250 guests · Nightclub 50 pax* · Karaoke* (*extra fee)',
    badge_es: 'Eventos, Coaching & Discoteca*',
    badge_en: 'Events, Coaching & Nightclub*',
    description_es:
      'Salón cerrado con acabados cálidos en madera andina, pantalla gigante, microfonía y Wi-Fi fibra óptica. Además disponemos de salón social para eventos y coaching, discoteca con capacidad para 50 personas y karaoke (servicios disponibles con pago extra adicional).',
    description_en:
      'Enclosed hall with warm Andean woodwork, giant screen, microphones, and fiber-optic Wi-Fi. We also offer a Social Hall for events and coaching, a 50-guest capacity Nightclub, and Karaoke (amenities available at an additional fee).',
    mediaType: 'image',
    image: '/images/hacienda/corporate-salon-hd.jpg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-hall-with-warm-lighting-42358-large.mp4',
    capacities: {
      auditorium: '250 pax',
      banquet: '200 pax',
      school: '140 pax',
      uShape: '60 pax',
      cocktail: '250 pax',
    },
    areaM2: '450 m²',
    notes_es: 'Salón social para eventos/coaching, discoteca 50 pax y karaoke (con pago extra)',
    notes_en: 'Social hall for events/coaching, 50-pax nightclub & karaoke (extra fee)',
    inclusions_es: [
      'Salón social para eventos y coaching (disponible con pago extra)',
      'Discoteca privada con capacidad para 50 personas (con pago extra)',
      'Sistema de karaoke profesional para celebraciones grupales (con pago extra)',
      'Pantalla gigante, microfonía inalámbrica y tarima frontal',
      'Conexión Wi-Fi simétrica por fibra óptica de alta estabilidad',
    ],
    inclusions_en: [
      'Social Hall dedicated for corporate events and coaching sessions (extra fee)',
      'Private Nightclub / Lounge with capacity for up to 50 guests (extra fee)',
      'Full Karaoke system for evening celebrations and entertainment (extra fee)',
      'High-lumen projection screen, wireless microphones, and main stage',
      'Dedicated symmetrical fiber-optic Wi-Fi for live streams and workshops',
    ],
  },
  {
    id: 'deportes-piscina',
    title_es: 'Canchas Deportivas, Piscina 84 m² (70 Pax) & Spa',
    title_en: 'Sports Courts, 84 m² Pool (70 Guests) & Spa',
    subtitle_es: 'Fútbol 7v7, Básquet Pro, Vóley · Piscina 70 pax · Hidromasajes*',
    subtitle_en: '7v7 Soccer, Pro Basketball, Volleyball · 70-pax Pool · Hot Tubs*',
    badge_es: 'Deportes & Zona Húmeda',
    badge_en: 'Sports & Wellness Spa',
    description_es:
      'Piscina de 14×6 m = 84 m² (capacidad 70 personas), 1 sauna/turco/jacuzzi (capacidad 6 a 8 pax) y 2 hidromasajes de 2×2 m (capacidad 8 a 10 pax c/u). Nota: Los hidromasajes se encienden únicamente en grupos grandes y con tarifa extra. Incluye fútbol en césped 7 vs 7, básquet profesional, vóley en césped reglamentaria, ping pong y billar.',
    description_en:
      '14×6 m = 84 m² pool (capacity 70 guests), 1 sauna/steam/jacuzzi unit (6–8 guests), and 2 whirlpool hot tubs of 2×2 m (8–10 guests each). Note: Hot tubs are heated exclusively for large groups and at an extra fee. Includes 7v7 grass soccer, pro basketball, regulation grass volleyball, ping pong & billiards.',
    mediaType: 'image',
    image: '/images/hacienda/jardines-teambuilding.jpg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-swimming-pool-in-a-sunny-hotel-patio-41586-large.mp4',
    capacities: {
      auditorium: '350 pax',
      banquet: '280 pax',
      school: 'N/A',
      uShape: 'N/A',
      cocktail: '350 pax',
    },
    areaM2: 'Piscina 84 m²',
    notes_es: 'Fútbol 7v7, básquet pro, vóley regl., ping pong, billar; hidromasajes c/ tarifa extra',
    notes_en: '7v7 soccer, pro b-ball, reg. volley, ping pong, pool table; hot tubs extra fee',
    inclusions_es: [
      'Piscina de 14×6 m = 84 m² con capacidad para 70 personas y 1 sauna, turco y jacuzzi (6 a 8 pax)',
      '2 hidromasajes de 2×2 m (cap. 8–10 pax c/u) — Nota: solo en grupos grandes y con tarifa extra',
      'Cancha de fútbol en césped para 7 vs 7 y cancha de básquet profesional',
      'Cancha de vóley en césped reglamentaria, mesa de ping pong y mesa de billar',
      'Karaoke, discoteca para 50 personas y salón social eventos/coaching (con pago extra)',
    ],
    inclusions_en: [
      '14×6 m = 84 m² swimming pool (70 guests capacity) + 1 sauna, steam room & jacuzzi (6–8 pax)',
      'Two 2×2 m whirlpool hot tubs (8–10 pax each) — Note: large groups only at an extra fee',
      'Natural grass 7 vs 7 soccer pitch and professional basketball court',
      'Regulation natural grass volleyball court, table tennis (ping pong) & billiards table',
      'Karaoke, 50-guest nightclub, and social hall for events/coaching (extra fee)',
    ],
  },
  {
    id: 'suites-hospedaje',
    title_es: 'Hospedaje Complementario (Hasta 65 Pax · 14 Baños)',
    title_en: 'Complementary On-Site Lodging (Up to 65 Pax · 14 Baths)',
    subtitle_es: 'Cap. Máx. 65 PAX · 14 baños internos · 7 matr. + 59 indiv.',
    subtitle_en: 'Max 65 Guests · 14 internal baths · 7 double + 59 single beds',
    badge_es: 'Capacidad Auditada 65 Pax',
    badge_en: 'Audited Capacity 65 Guests',
    description_es:
      'Capacidad máxima de 65 personas y 14 baños internos (7 camas matrimoniales y 59 camas individuales totales): 2 Suites Matrimoniales con TV (2–3 pax c/u), 2 Suites Matrimoniales Familiares (2–5 pax c/u), Casa Familiar + 2 Habitaciones (11 pax, 3 baños), Departamento (11 pax, 2 baños) y 2 Habitaciones Compartidas (17 pax y 10 pax).',
    description_en:
      'Maximum audited lodging capacity of 65 guests with 14 internal bathrooms (7 double beds and 59 single beds total): 2 Master Suites w/ TV (2–3 pax ea.), 2 Family Suites (2–5 pax ea.), Family House + 2 Rooms (11 pax, 3 baths), Apartment (11 pax, 2 baths), and 2 Shared Rooms (17 pax + 10 pax).',
    mediaType: 'image',
    image: '/images/hacienda/boda-suite-lounge.jpg',
    capacities: {
      auditorium: '65 pax',
      banquet: '65 pax',
      school: 'N/A',
      uShape: 'N/A',
      cocktail: '65 pax',
    },
    areaM2: '65 Pax · 14 Baños',
    notes_es: '65 PAX máx., 14 baños internos, 7 camas matrimoniales y 59 camas individuales',
    notes_en: '65 PAX max, 14 internal baths, 7 double beds & 59 single beds',
    inclusions_es: [
      '4 Suites Matrimoniales con baño privado (2 con TV 2–3 pax + 2 familiares 2–5 pax)',
      '1 Casa Familiar + 2 habitaciones (11 pax, 3 baños) + 1 Departamento (11 pax, 2 baños)',
      '1 Habitación Compartida literas 8+9 (17 pax, 3 baños) + 1 Compartida 10 camas (10 pax, 2 baños)',
      'Alimentación en restaurante propio, internet fibra óptica y lavandería',
      '80 a 100 parqueaderos internos y 8 baños externos para eventos',
    ],
    inclusions_en: [
      '4 En-suite Master Suites (2 w/ TV 2–3 pax + 2 family 2–5 pax)',
      '1 Family House + 2 rooms (11 pax, 3 baths) + 1 Apartment (11 pax, 2 baths)',
      '1 Shared Bunk Room 8+9 (17 pax, 3 baths) + 1 Shared 10-Bed Room (10 pax, 2 baths)',
      'On-site restaurant full board, fiber-optic Wi-Fi, and housekeeping',
      '80 to 100 private parking spots and 8 external restrooms for events',
    ],
  },
];

export const CORPORATE_SPACES_TABLE = RESORT_SPACES.map((space) => ({
  id: space.id,
  space: space.title_es,
  space_en: space.title_en,
  auditorium: space.capacities.auditorium,
  banquet: space.capacities.banquet,
  school: space.capacities.school,
  uShape: space.capacities.uShape,
  notes: space.notes_es,
  notes_en: space.notes_en,
}));

export const CORPORATE_SPACES_CARDS = RESORT_SPACES.map((space) => ({
  id: space.id,
  title: space.title_es,
  title_en: space.title_en,
  subtitle: space.subtitle_es,
  subtitle_en: space.subtitle_en,
  image: space.image,
  videoUrl: space.videoUrl,
  mediaType: space.mediaType,
  badge: space.badge_es,
  badge_en: space.badge_en,
  description: space.description_es,
  description_en: space.description_en,
}));

export interface HeroStopCardItem {
  id: string;
  location: string;
  title: string;
  subtitle: string;
  meta: string;
  cardImage: string;
  bgImage: string;
  route: string;
  serviceType: 'grupos' | 'corporativo' | 'bodas' | 'hospedaje';
}

export const getHeroStopCards = (langOrIsEn?: SupportedLanguage | boolean): HeroStopCardItem[] => [
  {
    id: 'larga-estadia',
    location: tr("Quito–Píntag · Commercial Priority", "Quito–Píntag · Prioridad Comercial", langOrIsEn),
    title: tr("Corporate, delegation & NGO lodging", "Hospedaje para empresas, delegaciones y ONGs", langOrIsEn),
    subtitle: tr("Up to 65 guests (14 baths · 7 double + 59 single beds), dining, fiber Wi-Fi & 80–100 parking spots.", "Hasta 65 personas (14 baños · 7 matr. + 59 indiv.), alimentación, fibra óptica y 80–100 parqueaderos.", langOrIsEn),
    meta: tr("Long Stay · Quotes by headcount & duration", "Larga Estadía · Cotización por personas y duración", langOrIsEn),
    cardImage: '/images/hacienda/grupos-hxp.jpg',
    bgImage: '/images/hacienda/vista-aerea.jpg',
    route: '/hospedaje',
    serviceType: 'grupos',
  },
  {
    id: 'grandes-eventos',
    location: tr("13,000 m² Lawns & Tents · Quito–Píntag", "13.000 m² de Jardines & Carpas · Quito–Píntag", langOrIsEn),
    title: tr("Major events & corporate experiences", "Grandes eventos y experiencias corporativas", langOrIsEn),
    subtitle: tr("Year-end, team retreats & conventions: 13,000 m² gardens, 8 ext. restrooms, catering, stage & sports.", "Fin de año, integración y convenciones: 13.000 m² jardines, 8 baños ext., catering, tarima y deportes.", langOrIsEn),
    meta: tr("Macro-Events 50 to 350+ guests · Lodging", "Macroeventos de 50 a 350 pax · Hospedaje complementario", langOrIsEn),
    cardImage: '/images/hacienda/jardines-teambuilding.jpg',
    bgImage: '/images/hacienda/hero-atardecer.jpg',
    route: '/corporativo',
    serviceType: 'corporativo',
  },
  {
    id: 'bodas',
    location: tr("Gardens & Gala Reception · Quito–Píntag", "Jardines & Recepción de Gala · Quito–Píntag", langOrIsEn),
    title: tr("Weddings & social celebrations", "Bodas y celebraciones sociales", langOrIsEn),
    subtitle: tr("Ceremonies, reception, 13,000 m² gardens, catering, decor, and up to 65-pax guest lodging.", "Ceremonias, recepción, 13.000 m² jardines, catering, decoración y hospedaje hasta 65 pax.", langOrIsEn),
    meta: tr("Weddings & Social Events · Up to 300 guests", "Bodas & Eventos Sociales · Hasta 300 invitados", langOrIsEn),
    cardImage: '/images/hacienda/montaje-banquete.jpg',
    bgImage: '/images/hacienda/bodas-exteriores.jpg',
    route: '/bodas',
    serviceType: 'bodas',
  },
  {
    id: 'instalaciones',
    location: tr("Quito–Píntag · 30 min from Airport", "Quito–Píntag · A 30 min del Aeropuerto", langOrIsEn),
    title: tr("84 m² Pool (70 pax), Spa & Sports Courts", "Piscina 84 m² (70 pax), Spa y Canchas Deportivas", langOrIsEn),
    subtitle: tr("7v7 soccer, pro basketball, reg. volleyball, ping pong & billiards (club 50 pax, karaoke & coaching hall extra fee).", "Fútbol 7v7, básquet pro, vóley reglamentaria, ping pong y billar (discoteca 50 pax, karaoke y salón* pago extra).", langOrIsEn),
    meta: tr("84 m² Pool (70 pax), Sports Courts & Dining", "Piscina 84 m² (70 pax), Canchas y Gastronomía Propia", langOrIsEn),
    cardImage: '/images/hacienda/piscina-aerea.jpg',
    bgImage: '/images/hacienda/piscina-nocturna.jpg',
    route: '/hospedaje',
    serviceType: 'hospedaje',
  },
];

/**
 * SECTION 2 CARDS BILINGUAL HELPER
 */
export const getSection2Cards = (langOrIsEn?: SupportedLanguage | boolean) => [
  {
    title: tr("Corporate Lodging", "Hospedaje Empresas", langOrIsEn),
    desc: tr("Up to 65 guests (14 baths · 7 double + 59 single beds) & 80–100 parking spots.", "Hasta 65 pax (14 baños · 7 matr. + 59 indiv.) y 80–100 parqueaderos.", langOrIsEn),
    img: '/images/hacienda/grupos-hxp.jpg',
    link: '/hospedaje',
    badge: tr("Max Capacity 65 Pax", "Cap. Máx. 65 Pax", langOrIsEn),
  },
  {
    title: tr("Major Events", "Grandes Eventos", langOrIsEn),
    desc: tr("13,000 m² gardens, 8 ext. baths, gala tents, stage, coaching hall* & club*.", "13.000 m² jardines, 8 baños ext., carpas, tarima, salón coaching* y disco*.", langOrIsEn),
    img: '/images/hacienda/jardines-teambuilding.jpg',
    link: '/corporativo',
    badge: tr("Up to 350+ guests", "Hasta 350+ pax", langOrIsEn),
  },
  {
    title: tr("Weddings & Celebrations", "Bodas y Celebraciones", langOrIsEn),
    desc: tr("Ceremonies, reception, 13,000 m² gardens, catering & guest lodging up to 65 pax.", "Ceremonias, recepción, 13.000 m² jardines, catering y hospedaje 65 pax.", langOrIsEn),
    img: '/images/hacienda/montaje-banquete.jpg',
    link: '/bodas',
    badge: tr("Exclusive Weddings", "Bodas Exclusivas", langOrIsEn),
  },
  {
    title: tr("Amenity: 84 m² Pool & Sports", "Comp.: Piscina 84 m² & Deportes", langOrIsEn),
    desc: tr("Pool 70 pax, sauna/steam/jacuzzi (6–8), hot tubs*, 7v7 soccer, b-ball & volley.", "Piscina 70 pax, sauna/turco/jacuzzi (6–8), hidromasajes*, fútbol 7v7, básquet y vóley.", langOrIsEn),
    img: '/images/hacienda/piscina-aerea.jpg',
    link: '/corporativo',
    badge: tr("84 m² Pool · Sports", "Piscina 84 m² · Deportes", langOrIsEn),
  },
  {
    title: tr("Amenity: Restaurant", "Comp.: Restaurante", langOrIsEn),
    desc: tr("3-course meals, BBQ & dedicated in-house catering at resort.", "Alimentación 3 tiempos, parrilladas y catering propio en hacienda.", langOrIsEn),
    img: '/images/hacienda/gastronomia-2.jpg',
    link: '/hospedaje',
    badge: tr("In-House Catering", "Catering Propio", langOrIsEn),
  },
];

/**
 * SECTION 3 INTERACTIVE PORTFOLIO SERVICES (BILINGUAL)
 */
export interface PortfolioServiceItem {
  id: string;
  overline: string;
  title: string;
  description: string;
  inclusions: string[];
  priceText: string;
  capacityText: string;
  image: string;
  imageCaption: string;
  selectorTitle: string;
  selectorDesc: string;
  circleBg: string;
  route: string;
  serviceType: 'grupos' | 'corporativo' | 'bodas';
  Icon: LucideIcon;
}

export const getPortfolioServices = (langOrIsEn?: SupportedLanguage | boolean): PortfolioServiceItem[] => [
  {
    id: 'srv-larga-estadia',
    overline: tr("COMMERCIAL PRIORITY · LONG STAYS IN QUITO–PÍNTAG", "PRIORIDAD COMERCIAL · LARGA ESTADÍA EN QUITO–PÍNTAG", langOrIsEn),
    title: tr("Corporate & Group Lodging (Long Stay)", "Hospedaje para Empresas y Grupos (Larga Estadía)", langOrIsEn),
    description: tr("A peaceful home base in Quito–Píntag designed for extended stays of corporate staff, delegations, NGOs, and international teams—blending private rest, daily meals, and reliable connectivity.", "Un refugio funcional y acogedor en Quito–Píntag pensado para largas estadías de equipos empresariales, delegaciones, ONG y voluntarios internacionales, integrando descanso, gastronomía diaria y conectividad estable.", langOrIsEn),
    inclusions: trList([
          'Max capacity 65 guests (14 internal baths): 4 Suites, Family House (11), Apt. (11) & Shared Rooms (17+10)',
          'Full board in on-site restaurant, high-speed fiber Wi-Fi, and 80 to 100 private parking spots',
          'Flexible tailored pricing based on headcount and stay length (days, weeks, or months)',
        ], [
          'Capacidad máx. 65 pax (14 baños): 4 Suites, Casa Familiar (11), Depto. (11) y Hab. Compartidas (17+10)',
          'Alimentación completa en restaurante, internet fibra óptica y 80 a 100 parqueaderos privados',
          'Cotización flexible por número de personas y duración (días, semanas o meses)',
        ], langOrIsEn),
    priceText: tr("From $35 / person / night", "Desde $35 / persona / noche", langOrIsEn),
    capacityText: tr("Max 65 guests · 14 baths (7 double + 59 single beds)", "Máx. 65 pax · 14 baños (7 matr. + 59 indiv.)", langOrIsEn),
    image: 'https://pezajodvvouezumnppaj.supabase.co/storage/v1/object/public/hacienda-media/img-whatsapp-image-2026-10-16-at-12-41-33-1793737502604.webp',
    imageCaption: tr("COMMERCIAL PRIORITY · LONG STAYS UP TO 65 GUESTS", "PRIORIDAD COMERCIAL · LARGA ESTADÍA HASTA 65 PAX", langOrIsEn),
    selectorTitle: tr("1. Corporate & Group Lodging (Long Stay)", "1. Hospedaje Empresas y Grupos (Larga Estadía)", langOrIsEn),
    selectorDesc: tr("Up to 65 guests · 14 baths · 7 double & 59 single beds.", "Hasta 65 pax · 14 baños · 7 matr. y 59 indiv.", langOrIsEn),
    circleBg: '#113B4F',
    route: '/hospedaje',
    serviceType: 'grupos',
    Icon: HeartHandshake,
  },
  {
    id: 'srv-grandes-eventos',
    overline: tr("COMMERCIAL PRIORITY · MACRO-EVENTS & CORPORATE", "PRIORIDAD COMERCIAL · MACROEVENTOS Y EMPRESAS", langOrIsEn),
    title: tr("Major Events & Corporate Experiences", "Grandes Eventos y Experiencias Corporativas", langOrIsEn),
    description: tr("Transform year-end galas, team integration retreats, and conventions into seamless experiences surrounded by Andean nature, bespoke setups, chef catering, and outdoor sports.", "Transforma fiestas de fin de año, jornadas de integración y convenciones en encuentros memorables rodeados de naturaleza, con montaje versátil, catering propio y recreación integral.", langOrIsEn),
    inclusions: trList([
          '13,000 m² lawns, 8 external restrooms, 80–100 parking spots, gala tents & catering',
          'Soccer 7v7, pro basketball, regulation grass volleyball, ping pong & billiards',
          'Extra-fee options: Social hall (events/coaching), 50-guest nightclub & karaoke',
        ], [
          '13.000 m² jardines, 8 baños externos, 80–100 parqueaderos, carpas y catering propio',
          'Fútbol 7 vs 7, básquet profesional, vóley en césped reglamentaria, ping pong y billar',
          'Opcionales con pago extra: Salón social eventos/coaching, discoteca 50 pax y karaoke',
        ], langOrIsEn),
    priceText: tr("From $45 / participant", "Desde $45 / participante", langOrIsEn),
    capacityText: tr("50 to 350 participants · 13,000 m² gardens", "50 a 350 participantes · 13.000 m² jardines", langOrIsEn),
    image: '/images/hacienda/jardines-teambuilding.jpg',
    imageCaption: tr("MACRO-EVENTS, 13,000 M² LAWNS & CORPORATE FACILITIES", "MACROEVENTOS, 13.000 M² JARDINES Y CONVENCIONES", langOrIsEn),
    selectorTitle: tr("2. Major Events & Corporate", "2. Grandes Eventos y Corporativo", langOrIsEn),
    selectorDesc: tr("13,000 m² lawns, 8 ext. baths, tents, sports & coaching hall*.", "13.000 m² jardines, 8 baños ext., carpas, deportes y salón*.", langOrIsEn),
    circleBg: '#1B3B2B',
    route: '/corporativo',
    serviceType: 'corporativo',
    Icon: Building2,
  },
  {
    id: 'srv-bodas',
    overline: tr("UNFORGETTABLE MEMORIES · GALA CELEBRATIONS", "EXPERIENCIAS INOLVIDABLES · CELEBRACIONES DE GALA", langOrIsEn),
    title: tr("Weddings & Celebrations in Quito–Píntag", "Bodas y Celebraciones en Quito–Píntag", langOrIsEn),
    description: tr("Celebrate an unforgettable wedding amidst open-air valley gardens, glowing gala receptions, signature gastronomy, and on-site accommodations for your closest family and friends.", "Vive una boda inolvidable entre paisajes andinos, recepción de gala bajo carpa iluminada, gastronomía de autor y la comodidad de hospedar a tus invitados en la misma hacienda.", langOrIsEn),
    inclusions: trList([
          'Open-air ceremony in 13,000 m² gardens with floral arch and 8 external restrooms',
          'Gala reception under imperial tent with dance floor and 80–100 parking spots',
          '3-course gourmet dinner, Bridal Suite, and on-site lodging for up to 65 guests',
        ], [
          'Ceremonia en 13.000 m² de jardines con arco floral y 8 baños externos',
          'Recepción bajo carpa imperial con pista de baile y 80–100 parqueaderos internos',
          'Catering de 3 tiempos, suite nupcial y hospedaje para hasta 65 invitados',
        ], langOrIsEn),
    priceText: tr("From $42 / guest", "Desde $42 / invitado", langOrIsEn),
    capacityText: tr("50 to 300 guests · 13,000 m² lawns", "50 a 300 personas · 13.000 m² jardines", langOrIsEn),
    image: '/images/hacienda/montaje-banquete.jpg',
    imageCaption: tr("WEDDINGS, SOCIAL CELEBRATIONS & GALA RECEPTIONS", "BODAS, CELEBRACIONES SOCIALES Y RECEPCIONES DE GALA", langOrIsEn),
    selectorTitle: tr("3. Weddings & Celebrations", "3. Bodas y Celebraciones", langOrIsEn),
    selectorDesc: tr("13,000 m² ceremony, gala tent banquet & 65-pax guest lodging.", "Ceremonia 13.000 m², banquete y hospedaje 65 pax.", langOrIsEn),
    circleBg: '#3F2212',
    route: '/bodas',
    serviceType: 'bodas',
    Icon: Heart,
  },
  {
    id: 'srv-comp-gastronomia',
    overline: tr("ON-SITE GASTRONOMIC AMENITY", "COMPLEMENTO GASTRONÓMICO IN SITU", langOrIsEn),
    title: tr("Complement: On-Site Restaurant & Catering", "Complemento: Restaurante y Catering Propio", langOrIsEn),
    description: tr("Professional on-site kitchen serving 3 balanced chef-prepared daily meals for long-stay groups, country BBQs, continuous coffee breaks, and gala banquets for weddings and events.", "Cocina profesional en la hacienda que ofrece 3 comidas diarias balanceadas para largas estadías, parrilladas campestres, coffee breaks continuos y banquetes de gala para bodas y eventos.", langOrIsEn),
    inclusions: trList([
          'American breakfast, executive lunches, and dinners for resident groups',
          'Charcoal barbecue, international buffets, and plated gala menus',
          'Continuous coffee breaks with premium Andean coffee and artisanal snacks',
        ], [
          'Desayunos americanos, almuerzos ejecutivos y cenas para grupos alojados',
          'Parrilladas al carbón, buffets internacionales y menús de gala emplatados',
          'Coffee breaks continuos con café andino, bocaditos dulces y salados',
        ], langOrIsEn),
    priceText: tr("On-Site Dining Amenity", "Complemento Gastronómico In Situ", langOrIsEn),
    capacityText: tr("For Long Stays, Macro-Events & Weddings", "Para Larga Estadía, Macroeventos y Bodas", langOrIsEn),
    image: '/images/hacienda/gastronomia-parrillada.jpg',
    imageCaption: tr("RESTAURANT & CATERING AS AN ESSENTIAL AMENITY", "RESTAURANTE Y CATERING COMO COMPLEMENTO INTEGRAL", langOrIsEn),
    selectorTitle: tr("Complement: Dining & Catering", "Complemento: Restaurante y Catering", langOrIsEn),
    selectorDesc: tr("Meal plans for long stays, barbecues, and celebration banquets.", "Alimentación para largas estadías, parrilladas y banquetes de eventos.", langOrIsEn),
    circleBg: '#7A4928',
    route: '/hospedaje',
    serviceType: 'grupos',
    Icon: Utensils,
  },
  {
    id: 'srv-comp-piscina',
    overline: tr("WELLNESS & RECREATIONAL AMENITY", "COMPLEMENTO RECREATIVO Y DE BIENESTAR", langOrIsEn),
    title: tr("Complement: 84 m² Pool (70 Pax) & Wellness Spa", "Complemento: Piscina 84 m² (70 Pax) y Zona Spa", langOrIsEn),
    description: tr("Recharge after productive meetings or celebrations in our spacious heated pool and tranquil thermal spa zone set among mountain breezes in Píntag.", "Relájate después de cada jornada laboral o celebración en nuestra amplia piscina y zona húmeda de descanso rodeadas de aire puro en Quito–Píntag.", langOrIsEn),
    inclusions: trList([
          '14×6 m = 84 m² swimming pool (capacity 70 guests)',
          '1 sauna, steam room & jacuzzi area (capacity 6 to 8 guests)',
          '2 whirlpool hot tubs 2×2 m (8–10 pax ea.) — Note: large groups only at an extra fee',
        ], [
          'Piscina de 14×6 metros = 84 m² con capacidad para 70 personas',
          '1 área de sauna, turco y jacuzzi (capacidad para 6 a 8 personas)',
          '2 hidromasajes 2×2 m (8–10 pax c/u) — Nota: solo en grupos grandes y con tarifa extra',
        ], langOrIsEn),
    priceText: tr("84 m² Pool · 70 Pax Capacity", "Piscina 84 m² · Cap. 70 Pax", langOrIsEn),
    capacityText: tr("Pool 70 Pax + Spa (6–8) + 2 Hot Tubs*", "Piscina 70 Pax + Spa (6–8) + 2 Hidromasajes*", langOrIsEn),
    image: '/images/hacienda/piscina-aerea.jpg',
    imageCaption: tr("84 M² POOL (70 PAX) & SPA (HOT TUBS EXTRA FEE*)", "PISCINA 84 M² (70 PAX) & ZONA SPA (HIDROMASAJES*)", langOrIsEn),
    selectorTitle: tr("Complement: 84 m² Pool & Spa", "Complemento: Piscina 84 m² y Zona Spa", langOrIsEn),
    selectorDesc: tr("84 m² pool (70 pax), sauna/steam/jacuzzi (6–8) & 2 hot tubs*.", "Piscina 84 m² (70 pax), sauna/turco/jacuzzi y 2 hidromasajes*.", langOrIsEn),
    circleBg: '#9E7329',
    route: '/corporativo',
    serviceType: 'corporativo',
    Icon: Waves,
  },
  {
    id: 'srv-comp-recreacion',
    overline: tr("TEAM BUILDING & SPORTS AMENITY", "COMPLEMENTO DEPORTIVO Y DE INTEGRACIÓN", langOrIsEn),
    title: tr("Complement: Sports Areas, 13,000 m² & Club*", "Complemento: Áreas Deportivas, 13.000 m² & Discoteca*", langOrIsEn),
    description: tr("Spark camaraderie and friendly competition outdoors with dedicated sporting grounds, indoor table games, and optional evening entertainment spaces for private groups.", "Impulsa la integración y el disfrute de tu grupo con escenarios deportivos al aire libre, juegos de salón y espacios nocturnos exclusivos para celebraciones privadas.", langOrIsEn),
    inclusions: trList([
          '7 vs 7 natural grass soccer pitch, pro basketball & regulation grass volleyball',
          'Table tennis (ping pong), billiards table, and 13,000 m² of private lawns',
          'Available at an extra fee: Karaoke, 50-pax Nightclub & Social Hall (events/coaching)',
        ], [
          'Cancha de fútbol en césped 7 vs 7, básquet profesional y vóley en césped reglamentaria',
          'Mesa de ping pong, mesa de billar y 13.000 m² de jardines privados',
          'Con pago extra adicional: Karaoke, Discoteca 50 personas y Salón social (eventos/coaching)',
        ], langOrIsEn),
    priceText: tr("Sports Included · Club/Karaoke Extra Fee", "Deportes · Discoteca/Karaoke Pago Extra", langOrIsEn),
    capacityText: tr("13,000 m² Lawns & 5 Sports Disciplines", "13.000 m² Jardines · Deportes & Club 50 pax*", langOrIsEn),
    image: '/images/hacienda/reunion-corporativa.jpg',
    imageCaption: tr("7V7 SOCCER, PRO BASKETBALL, VOLLEYBALL & EXTRA-FEE CLUB*", "FÚTBOL 7V7, BÁSQUET PRO, VÓLEY, BILLAR & CLUB*", langOrIsEn),
    selectorTitle: tr("Complement: Sports & Recreation*", "Complemento: Áreas Deportivas & Recreación*", langOrIsEn),
    selectorDesc: tr("7v7 soccer, pro b-ball, reg. volley, ping pong, billiards & club*.", "Fútbol 7v7, básquet pro, vóley, ping pong, billar & club*.", langOrIsEn),
    circleBg: '#2E5239',
    route: '/corporativo',
    serviceType: 'corporativo',
    Icon: ShieldCheck,
  },
  {
    id: 'srv-ubicacion-logistica',
    overline: tr("STRATEGIC VENUE IN QUITO–PÍNTAG", "UBICACIÓN ESTRATÉGICA EN QUITO–PÍNTAG", langOrIsEn),
    title: tr("80–100 Parking Spots, 8 Ext. Baths & Fiber Wi-Fi", "80–100 Parqueaderos, 8 Baños Externos y Fibra Óptica", langOrIsEn),
    description: tr("Strategic access right near Quito and Mariscal Sucre International Airport—built with seamless vehicle logistics, event support facilities, and high-speed connectivity.", "Conectividad ágil desde Quito y el Aeropuerto Internacional Mariscal Sucre, con infraestructura logística diseñada para recibir delegaciones, buses e invitados con total comodidad.", langOrIsEn),
    inclusions: trList([
          'Strategic location 30 minutes from Mariscal Sucre International Airport',
          '80 to 100 private gated parking spaces for buses, vans & vehicles',
          '8 independent external restrooms supporting lawns and event areas + fiber Wi-Fi',
        ], [
          'Ubicación estratégica a 30 minutos del Aeropuerto Internacional Mariscal Sucre',
          '80 a 100 parqueaderos privados internos con capacidad para buses y vehículos',
          '8 baños externos de apoyo para eventos en áreas verdes + Wi-Fi fibra óptica',
        ], langOrIsEn),
    priceText: tr("80–100 Parking · 8 External Restrooms", "80–100 Parqueaderos · 8 Baños Externos", langOrIsEn),
    capacityText: tr("30 min from Airport · 80–100 Parking", "A 30 min Aeropuerto · 80–100 Parqueaderos", langOrIsEn),
    image: '/images/hacienda/hero-vista-aerea-clean-derecha.jpg',
    imageCaption: tr("80–100 PARKING SPOTS & 8 EXTERNAL RESTROOMS", "80–100 PARQUEADEROS & 8 BAÑOS EXTERNOS EN PÍNTAG", langOrIsEn),
    selectorTitle: tr("80–100 Parking & 8 Ext. Baths", "80–100 Parqueaderos & 8 Baños Externos", langOrIsEn),
    selectorDesc: tr("40 min from Quito, 30 min Airport, fiber Wi-Fi & parking.", "A 40 min Quito, 30 min Aeropuerto, fibra y 80–100 parqueaderos.", langOrIsEn),
    circleBg: '#A64B2A',
    route: '/hospedaje',
    serviceType: 'grupos',
    Icon: BedDouble,
  },
];

/**
 * CLIENT REVIEWS (BILINGUAL)
 */
export interface ClientReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  avatarUrl: string;
}

export const getClientReviews = (langOrIsEn?: SupportedLanguage | boolean): ClientReviewItem[] => [
  {
    id: 'rev-1',
    author: 'Misión HXP · ONG',
    role: tr("Long Stay · NGO Delegation", "Larga Estadía · Delegación", langOrIsEn),
    rating: 5,
    comment: tr("Privacy, reliable fiber-optic Wi-Fi, and 3 flawless daily meals for our 55 international volunteers across several weeks.", "Privacidad, internet fibra óptica y 3 comidas diarias impecables para nuestros 55 voluntarios durante varias semanas.", langOrIsEn),
    avatarUrl: '/images/avatars/mision-hxp.jpg',
  },
  {
    id: 'rev-2',
    author: 'IMC Cooperación',
    role: tr("Corporate & Group Lodging", "Hospedaje Empresas y Grupos", langOrIsEn),
    rating: 5,
    comment: tr("Strategic venue in Quito–Píntag 30 min from airport, 80–100 private parking spaces, comfortable beds, and attentive staff.", "Ubicación estratégica en Quito–Píntag a 30 min del aeropuerto, 80–100 parqueaderos internos, habitaciones cómodas y atención directa.", langOrIsEn),
    avatarUrl: '/images/avatars/imc-cooperacion.jpg',
  },
  {
    id: 'rev-3',
    author: 'GAD de Pichincha',
    role: tr("Major Corporate Conventions", "Grandes Eventos Corporativos", langOrIsEn),
    rating: 5,
    comment: tr("13,000 m² lawns, 8 external restrooms, gala tents, stage, sports courts (7v7 soccer & basketball), 84 m² pool, and generous catering.", "13.000 m² de jardines, 8 baños externos, carpas, tarima, canchas deportivas (fútbol 7v7 y básquet pro), piscina 84 m² y catering puntual.", langOrIsEn),
    avatarUrl: '/images/avatars/gad-pichincha.jpg',
  },
  {
    id: 'rev-4',
    author: 'Dir. Banco & Finanzas',
    role: tr("Year-End Gala & Retreat", "Fin de Año & Convención", langOrIsEn),
    rating: 5,
    comment: tr("A single provider for our grand gala, social hall for coaching, illuminated dance floor, BBQ banquet, and on-site lodging. Effortless planning.", "Un solo proveedor para nuestro gran evento, salón social de coaching, pista de baile, parrillada y hospedaje complementario. Facilitó todo.", langOrIsEn),
    avatarUrl: '/images/avatars/banco-finanzas.jpg',
  },
  {
    id: 'rev-5',
    author: 'Sofía & Sebastián',
    role: tr("Weddings & Celebrations", "Bodas y Celebraciones", langOrIsEn),
    rating: 5,
    comment: tr("We held our ceremony and reception across 13,000 m² of gardens and accommodated our guests in the suites and family house.", "Celebramos nuestra ceremonia y recepción en los 13.000 m² de jardines y alojamos a los invitados en nuestras suites y casa familiar.", langOrIsEn),
    avatarUrl: '/images/avatars/sofia-sebastian.jpg',
  },
  {
    id: 'rev-6',
    author: 'Dr. Carlos Mendoza',
    role: tr("Executive Retreat", "Encuentro Empresarial", langOrIsEn),
    rating: 5,
    comment: tr("First-class facilities in Quito–Píntag, well-equipped halls, 80–100 parking spots, and the 84 m² pool and dining room were standout features.", "Instalaciones de primer nivel en Quito–Píntag, salones equipados, 80–100 parqueaderos y piscina de 84 m² con restaurante como grandes complementos.", langOrIsEn),
    avatarUrl: '/images/avatars/dr-carlos.jpg',
  },
  {
    id: 'rev-7',
    author: 'Valeria & Mateo',
    role: tr("Wedding & Gourmet Catering", "Boda & Catering Propio", langOrIsEn),
    rating: 5,
    comment: tr("The floral decor, gala tent dinner, 8 dedicated external restrooms for comfort, and in-house culinary service delighted our 220 guests.", "La decoración, la recepción bajo carpa, sus 8 baños externos para comodidad y el catering propio dejaron encantados a nuestros 220 invitados.", langOrIsEn),
    avatarUrl: '/images/avatars/valeria-mateo.jpg',
  },
];

export const getCorporatePackages = (langOrIsEn?: SupportedLanguage | boolean): ServicePackage[] => [
  {
    id: 'pkg-corp-findeanio',
    category: 'corporativo',
    title: tr("Year-End Galas & Large-Format Celebrations", "Fiestas de Fin de Año & Celebraciones de Gran Formato", langOrIsEn),
    subtitle: tr("Structural tents, 13,000 m² lawns, 8 ext. restrooms & 80–100 parking spots.", "Carpas, 13.000 m² de jardines, catering, 8 baños externos y 80–100 parqueaderos.", langOrIsEn),
    priceLabel: tr("From", "Desde", langOrIsEn),
    priceValue: 45,
    unit: tr("per guest", "por participante", langOrIsEn),
    capacity: tr("80 to 350+ guests", "80 a 350+ participantes", langOrIsEn),
    setupInfo: tr("Tents + 13,000 m² Lawns + 8 Ext. Baths + Catering", "Carpas + Jardines 13.000 m² + 8 Baños Ext. + Catering", langOrIsEn),
    description: tr("Host unforgettable year-end galas and large corporate celebrations under glowing marquee tents surrounded by greenery, custom menus, live music setups, and restful group accommodations.", "Celebra eventos de fin de año y encuentros corporativos inolvidables bajo elegantes carpas rodeadas de naturaleza, con música, banquete a medida y opciones de descanso en la hacienda.", langOrIsEn),
    inclusions: trList([
          '13,000 m² illuminated gardens, 8 external restrooms, gala tents, stage & dance floor',
          'In-house corporate catering: gala dinner, buffet, or country BBQ',
          '84 m² pool (70 pax), sports courts & 80–100 parking; karaoke/50-pax club/hall* (extra fee)',
          'Complementary on-site lodging up to 65 guests (14 baths · 7 double + 59 single beds)',
        ], [
          '13.000 m² de jardines iluminados, 8 baños externos, carpas, tarima y pista de baile',
          'Catering corporativo propio: menú de gala, buffet o parrillada campestre',
          'Piscina 84 m² (70 pax), deportes y 80–100 parqueaderos; karaoke/discoteca 50 pax/salón* c/ pago extra',
          'Opción de hospedaje complementario hasta 65 pax (14 baños internos · 7 matr. + 59 indiv.)',
        ], langOrIsEn),
    highlightBadge: tr("Year-End & Major Events", "Fin de Año & Macroeventos", langOrIsEn),
    image: '/images/hacienda/boda-carpa-gala.jpg',
    whatsappIntent: tr("Corporate Year-End / Major Event", "Evento Corporativo de Fin de Año / Gran Formato", langOrIsEn),
    featuredInHome: false,
  },
  {
    id: 'pkg-corp-teambuilding',
    category: 'corporativo',
    title: tr("Team Building, Sports & 84 m² Pool", "Integración Empresarial, Deportes & Piscina 84 m²", langOrIsEn),
    subtitle: tr("7v7 soccer, pro basketball, reg. grass volley, ping pong, billiards & 70-pax pool.", "Fútbol 7v7, básquet profesional, vóley reglamentaria, ping pong, billar y piscina 70 pax.", langOrIsEn),
    priceLabel: tr("From", "Desde", langOrIsEn),
    priceValue: 40,
    unit: tr("per guest", "por participante", langOrIsEn),
    capacity: tr("Up to 350 guests", "Hasta 350 participantes", langOrIsEn),
    setupInfo: tr("13,000 m² Lawns + Sports Courts + 84 m² Pool + Catering", "13.000 m² Jardines + Canchas Pro + Piscina 84 m² + Catering", langOrIsEn),
    description: tr("Energize your organization with active outdoor tournaments, country barbecues, refreshing pool breaks, and effortless team bonding away from the office.", "Fortalece el espíritu de equipo con jornadas deportivas, actividades al aire libre, parrillada campestre y momentos de relajación junto a la piscina y áreas verdes.", langOrIsEn),
    inclusions: trList([
          '13,000 m² lawns, 8 ext. baths & sports (7v7 soccer, pro b-ball, reg. volley, ping pong, billiards)',
          'In-house dining: breakfast, integration BBQ, and coffee breaks',
          '84 m² pool (70 pax) & sauna/steam/jacuzzi (6–8); 2×2m hot tubs large groups only w/ extra fee',
          '80–100 private parking spaces & complementary lodging up to 65 guests',
        ], [
          '13.000 m² de jardines, 8 baños externos y canchas (fútbol 7v7, básquet pro, vóley regl., ping pong, billar)',
          'Catering y restaurante: desayuno, parrillada de integración y coffee breaks',
          'Piscina 84 m² (70 pax) y 1 sauna/turco/jacuzzi (6–8 pax); 2 hidromasajes 2×2m grupos grandes c/ tarifa extra',
          '80 a 100 parqueaderos privados internos y hospedaje complementario hasta 65 pax',
        ], langOrIsEn),
    highlightBadge: tr("Team Building & Sports", "Integración & Deportes", langOrIsEn),
    image: '/images/hacienda/jardines-teambuilding.jpg',
    whatsappIntent: tr("Team Building and Sports Day", "Jornada de Integración y Deportes", langOrIsEn),
    featuredInHome: false,
  },
  {
    id: 'pkg-corp-retiro',
    category: 'corporativo',
    title: tr("Conventions & Corporate Retreats with On-Site Lodging", "Convenciones y Encuentros Empresariales con Hospedaje Complementario", langOrIsEn),
    subtitle: tr("Social hall for events/coaching (extra fee), plenaries & lodging for up to 65 guests.", "Salón de eventos/coaching (pago extra), plenarias y alojamiento hasta 65 personas.", langOrIsEn),
    priceLabel: tr("From", "Desde", langOrIsEn),
    priceValue: 88,
    unit: tr("per guest / night", "por persona / noche", langOrIsEn),
    capacity: tr("Up to 65 lodged guests (up to 250 in plenary)", "Hasta 65 participantes alojados (hasta 250 en plenaria)", langOrIsEn),
    setupInfo: tr("Coaching Hall* + 3-Course Catering + 84 m² Pool + 65-Pax Lodging", "Salón Coaching* + Catering 3 Tiempos + Piscina 84 m² + Hosp. 65 Pax", langOrIsEn),
    description: tr("Bring leaders and teams together in a quiet private estate tailored for productive strategic sessions, multi-day conventions, full-board dining, and restorative overnight stays.", "Reúne a tus directivos y colaboradores en un entorno privado ideal para convenciones, talleres estratégicos y descanso completo con alimentación diaria y conectividad estable.", langOrIsEn),
    inclusions: trList([
          'Social hall for events & coaching (available at extra fee), giant screen, pro audio & fiber Wi-Fi',
          'On-site lodging up to 65 guests (7 double + 59 single beds, 14 internal baths)',
          'Three daily meals at our restaurant and continuous coffee breaks',
          '84 m² pool (70 pax), sauna/steam/jacuzzi (6–8), 80–100 parking spots & hot tubs*',
        ], [
          'Salón social para eventos y coaching (con pago extra), pantalla gigante, sonido pro y fibra óptica',
          'Hospedaje complementario hasta 65 pax (7 camas matrimoniales y 59 individuales, 14 baños)',
          'Tres comidas diarias en nuestro restaurante y coffee breaks continuos',
          'Piscina 84 m² (70 pax), sauna/turco/jacuzzi (6–8 pax), 80–100 parqueaderos e hidromasajes*',
        ], langOrIsEn),
    highlightBadge: tr("Convention + Lodging", "Convención + Hospedaje", langOrIsEn),
    image: '/images/hacienda/reunion-corporativa.jpg',
    whatsappIntent: tr("Convention and Corporate Retreat", "Convención y Retiro Corporativo", langOrIsEn),
    featuredInHome: true,
  },
];

export interface WeddingServiceCardItem {
  id: string;
  title: string;
  description: string;
  priceTag: string;
  iconType: 'rings' | 'flower' | 'camera' | 'couple' | 'calendar';
}

export const getWeddingServices = (langOrIsEn?: SupportedLanguage | boolean): WeddingServiceCardItem[] => [
  {
    id: 'srv-planning',
    title: tr("Ceremonies & Reception", "Ceremonias & Recepción", langOrIsEn),
    description: tr("Outdoor lawn ceremonies across 13,000 m², 8 external restrooms, full protocol & gala reception.", "Ceremonias al aire libre en 13.000 m² de jardines, 8 baños externos, protocolo integral y recepción.", langOrIsEn),
    priceTag: tr("From $42 / guest", "Desde $42 / invitado", langOrIsEn),
    iconType: 'rings',
  },
  {
    id: 'srv-theme',
    title: tr("13,000 m² Gardens & Decor", "13.000 m² Jardines & Decoración", langOrIsEn),
    description: tr("Exclusive 13,000 m² gardens, bespoke floral design, structural gala marquee tent, and imperial tables.", "Exclusivos 13.000 m² de jardines, decoración floral personalizada, carpa de gala y mesas imperiales.", langOrIsEn),
    priceTag: tr("80 to 300 guests", "80 a 300 invitados", langOrIsEn),
    iconType: 'flower',
  },
  {
    id: 'srv-catering',
    title: tr("Catering & Restaurant", "Catering & Restaurante", langOrIsEn),
    description: tr("In-house wedding catering (welcome cocktail, 3-course gala dinner, dessert table), free corkage, and dining room.", "Catering nupcial propio (cóctel, menú de 3 tiempos, mesa de dulces), descorche libre y restaurante.", langOrIsEn),
    priceTag: tr("From $70 / guest", "Desde $70 / invitado", langOrIsEn),
    iconType: 'camera',
  },
  {
    id: 'srv-destination',
    title: tr("Guest Lodging (Up to 65 Pax)", "Hospedaje Invitados (Hasta 65 Pax)", langOrIsEn),
    description: tr("Accommodate up to 65 wedding guests (14 internal baths · 7 double + 59 single beds) with 84 m² pool (70 pax) & spa.", "Aloja hasta 65 invitados (14 baños · 7 camas matrimoniales + 59 indiv.) con piscina 84 m² (70 pax) y spa.", langOrIsEn),
    priceTag: tr("From $95 / guest", "Desde $95 / invitado", langOrIsEn),
    iconType: 'couple',
  },
  {
    id: 'srv-coordination',
    title: tr("80–100 Parking & Optional Extras*", "80–100 Parqueaderos & Adicionales*", langOrIsEn),
    description: tr("80–100 private parking spots, 8 external restrooms, plus optional 50-pax nightclub, karaoke & social hall (extra fee).", "80–100 parqueaderos internos, 8 baños externos, y opcional discoteca 50 pax, karaoke y salón* (pago extra).", langOrIsEn),
    priceTag: 'Quito – Píntag',
    iconType: 'calendar',
  },
];

export interface WeddingPresetItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeClass: string;
  image: string;
  imagePosition?: string;
  specs: { label: string; icon: string }[];
  price: string;
  unit: string;
  serviceType: 'bodas';
}

export const getWeddingPresets = (langOrIsEn?: SupportedLanguage | boolean): WeddingPresetItem[] => [
  {
    id: 'boda-clasica-integral',
    title: tr("Comprehensive Wedding & Lawn Reception", "Boda Integral & Recepción en Jardines", langOrIsEn),
    subtitle: tr("Quito–Píntag · 50 to 300 Guests · 13,000 m²", "Quito–Píntag · 50 a 300 Invitados · 13.000 m²", langOrIsEn),
    badge: tr("Popular Wedding", "Boda Popular", langOrIsEn),
    badgeClass: 'bg-[#C8A45D] text-[#0A1F17]',
    image: 'https://pezajodvvouezumnppaj.supabase.co/storage/v1/object/public/hacienda-media/img-whatsapp-image-2026-10-16-at-12-41-33-1793738382768.webp',
    specs: [
      { label: tr("50 to 300 Pax", "50 a 300 Pax", langOrIsEn), icon: 'users' },
      { label: tr("13,000 m² Lawns", "13.000 m² Jardines", langOrIsEn), icon: 'sparkles' },
      { label: tr("3-Course Catering", "Catering 3 Tiempos", langOrIsEn), icon: 'utensils' },
    ],
    price: '$42',
    unit: tr("/ guest", "/ invitado", langOrIsEn),
    serviceType: 'bodas',
  },
  {
    id: 'boda-destino-14-suites',
    title: tr("Wedding + Guest Lodging", "Boda + Hospedaje para Invitados", langOrIsEn),
    subtitle: tr("Quito–Píntag · Up to 65 Pax · 14 Internal Baths", "Quito–Píntag · Hasta 65 Pax · 14 Baños Internos", langOrIsEn),
    badge: tr("Guest Lodging", "Hospedaje Invitados", langOrIsEn),
    badgeClass: 'bg-[#8C6D3F]/90 text-[#FAF7F2]',
    image: '/images/hacienda/bodas-exteriores.jpg',
    specs: [
      { label: tr("Up to 65 Pax", "Hasta 65 Pax", langOrIsEn), icon: 'users' },
      { label: tr("14 Baths (66 Beds)", "14 Baños (66 Camas)", langOrIsEn), icon: 'bed' },
      { label: tr("84 m² Pool (70 Pax)", "Piscina 84 m² (70 Pax)", langOrIsEn), icon: 'sparkles' },
    ],
    price: '$95',
    unit: tr("/ guest", "/ invitado", langOrIsEn),
    serviceType: 'bodas',
  },
  {
    id: 'banquete-autor-coctel',
    title: tr("Wedding Catering & Styling", "Catering Nupcial & Decoración", langOrIsEn),
    subtitle: tr("Quito–Píntag · Cuisine & Tablescapes", "Quito–Píntag · Gastronomía & Montaje", langOrIsEn),
    badge: tr("Catering & Decor", "Catering & Decoración", langOrIsEn),
    badgeClass: 'bg-[#1A382B]/90 text-[#FAF7F2]',
    image: '/images/hacienda/boda-mesa-imperial.jpg',
    specs: [
      { label: tr("Free Corkage", "Descorche Libre", langOrIsEn), icon: 'glass' },
      { label: tr("In-House Dining", "Catering Propio", langOrIsEn), icon: 'utensils' },
      { label: tr("8 External Restrooms", "8 Baños Externos", langOrIsEn), icon: 'sparkles' },
    ],
    price: '$70',
    unit: tr("/ guest", "/ invitado", langOrIsEn),
    serviceType: 'bodas',
  },
  {
    id: 'ceremonia-jardin-palmeras',
    title: tr("Ceremonies in 13,000 m² Gardens", "Ceremonia en 13.000 m² de Jardines", langOrIsEn),
    subtitle: tr("Quito–Píntag · Natural Arch & Styling", "Quito–Píntag · Altares & Decoración Natural", langOrIsEn),
    badge: tr("Ceremonies", "Ceremonias", langOrIsEn),
    badgeClass: 'bg-[#6B7052]/90 text-[#FAF7F2]',
    image: '/images/hacienda/boda-ceremonia-arco.jpg',
    specs: [
      { label: tr("50 to 300 Pax", "50 a 300 Pax", langOrIsEn), icon: 'users' },
      { label: tr("80–100 Parking", "80–100 Parqueaderos", langOrIsEn), icon: 'sparkles' },
      { label: tr("Tiffany Chairs", "Sillas Tiffany", langOrIsEn), icon: 'sparkles' },
    ],
    price: '$35',
    unit: tr("/ guest", "/ invitado", langOrIsEn),
    serviceType: 'bodas',
  },
  {
    id: 'experiencia-zona-humeda',
    title: tr("Add-on: 84 m² Pool, Dining & Sports", "Complemento: Piscina 84 m², Restaurante & Deportes", langOrIsEn),
    subtitle: tr("Quito–Píntag · Hot tubs for large groups at extra fee", "Quito–Píntag · Hidromasajes en grupos grandes c/ tarifa extra", langOrIsEn),
    badge: tr("Wedding Add-on", "Complemento Nupcial", langOrIsEn),
    badgeClass: 'bg-[#7A6A58]/90 text-[#FAF7F2]',
    image: '/images/hacienda/area-humeda.jpg',
    specs: [
      { label: tr("84 m² Pool", "Piscina 84 m²", langOrIsEn), icon: 'sparkles' },
      { label: tr("Sauna/Steam/Jacuzzi", "Sauna/Turco/Jacuzzi", langOrIsEn), icon: 'utensils' },
      { label: tr("Sports Areas", "Áreas Deportivas", langOrIsEn), icon: 'sparkles' },
    ],
    price: '$55',
    unit: tr("/ guest", "/ invitado", langOrIsEn),
    serviceType: 'bodas',
  },
  {
    id: 'recepcion-salon-colonial',
    title: tr("Social Hall, Nightclub (50 Pax) & Karaoke*", "Salón Social, Discoteca (50 Pax) & Karaoke*", langOrIsEn),
    subtitle: tr("Quito–Píntag · *Extra-fee event add-ons", "Quito–Píntag · *Servicios con pago extra opcional", langOrIsEn),
    badge: tr("Reception & Extras", "Recepción & Adicionales", langOrIsEn),
    badgeClass: 'bg-[#221D1A]/90 text-[#E2C585]',
    image: '/images/hacienda/suite-1.jpg',
    specs: [
      { label: tr("50-Pax Nightclub*", "Discoteca 50 Pax*", langOrIsEn), icon: 'users' },
      { label: tr("Social Hall*", "Salón Social*", langOrIsEn), icon: 'utensils' },
      { label: tr("Karaoke (Extra Fee)", "Karaoke (Pago Extra)", langOrIsEn), icon: 'bed' },
    ],
    price: '$48',
    unit: tr("/ guest", "/ invitado", langOrIsEn),
    serviceType: 'bodas',
  },
];

export const getCabinsData = (langOrIsEn?: SupportedLanguage | boolean): CabinRoom[] => [
  {
    id: 'cabin-complejo-grupal',
    name: tr("Full Lodging Wing (Max Capacity 65 Pax)", "Bloque Completo de Hospedaje (Capacidad Máxima 65 Pax)", langOrIsEn),
    type: tr("Group Villa", "Villa Grupal", langOrIsEn),
    capacity: tr("Up to 65 Guests · 14 Internal Baths", "Hasta 65 Personas · 14 Baños Internos", langOrIsEn),
    maxGuests: 65,
    beds: tr("7 Double Beds + 59 Single Beds (Total 65 Pax)", "7 Camas Matrimoniales + 59 Camas Individuales (Total 65 Pax)", langOrIsEn),
    bathrooms: 14,
    pricePerNight: 35,
    weekendNote: tr("Rates from $35/guest/night. Note: 2×2 m hot tubs (8–10 pax ea.) are heated exclusively for large groups and at an extra fee.", "Tarifa desde $35 por persona/noche según grupo y duración. Hidromasajes 2×2m (8–10 pax c/u) se encienden únicamente para grupos grandes y con tarifa extra.", langOrIsEn),
    description: tr("Audited total resort capacity (65 PAX & 14 internal baths): 4 Master Suites (2 w/ TV 2–3 pax + 2 family 2–5 pax), Family House (11 pax), Apartment (11 pax), and 2 Shared Rooms (17 + 10 pax), plus 8 external baths & 80–100 parking spots.", "Capacidad total certificada de la hacienda (65 PAX y 14 baños internos): 4 Suites Matrimoniales (2 con TV de 2–3 pax + 2 familiares de 2–5 pax), Casa Familiar (11 pax), Departamento (11 pax) y 2 Habitaciones Compartidas (17 pax + 10 pax), además de 8 baños externos y 80–100 parqueaderos.", langOrIsEn),
    amenities: trList(['Max 65 Guests', '14 Internal Baths', '7 Double + 59 Single', '80–100 Parking Spots', '84 m² Pool (70 Pax)'], ['Capacidad Máx. 65 Pax', '14 Baños Internos', '7 Matr. + 59 Indiv.', '80–100 Parqueaderos', 'Piscina 84 m² (70 Pax)'], langOrIsEn),
    image: 'https://pezajodvvouezumnppaj.supabase.co/storage/v1/object/public/hacienda-media/img-whatsapp-image-2026-10-16-at-12-41-33-1793737502604.webp',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-chalet-familiar',
    name: tr("Family House + 2 Rooms (11 Pax · 3 Baths)", "Casa Familiar + 2 Habitaciones (11 Pax · 3 Baños)", langOrIsEn),
    type: tr("Family House", "Casa Familiar", langOrIsEn),
    capacity: tr("11 Guests (2 Double Rooms + 7 Bunk Beds)", "11 Personas (2 Matrimoniales + 7 Literas)", langOrIsEn),
    maxGuests: 11,
    beds: tr("2 Double Beds (1 w/ TV) + 7 Two-Tier Single Bunk Beds", "2 Camas de 2 Plazas (1 c/ TV) + 7 Literas Individuales x 2 Pisos", langOrIsEn),
    bathrooms: 3,
    pricePerNight: 165,
    weekendNote: tr("Custom duration quotes for families, technical brigades, volunteers, and work teams.", "Cotización especial por duración para familias, brigadas técnicas, voluntarios y equipos.", langOrIsEn),
    description: tr("Includes 2 matrimonial rooms with 1 double bed each (one w/ TV, 2 pax & 1 bath ea.) plus 1 room with 7 two-tier single bunk beds (7 pax, 1 bath). Total: 11 pax & 3 private baths.", "Incluye 2 habitaciones matrimoniales con 1 cama de dos plazas c/u (una con TV, 2 pax c/u, 1 baño c/u) y 1 habitación con 7 literas individuales de dos pisos (7 pax, 1 baño). Total: 11 pax y 3 baños privados.", langOrIsEn),
    amenities: trList(['11 Guests (3 Baths)', '2 Double Rooms (1 TV)', '7 Two-Tier Bunks', 'Fiber-Optic Wi-Fi', '80–100 Parking Spots'], ['11 Personas (3 Baños)', '2 Matrimoniales (1 TV)', '7 Literas x 2 Pisos', 'Fibra Óptica Estable', '80–100 Parqueaderos'], langOrIsEn),
    image: '/images/hacienda/cabana-exterior.jpg',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-suite-1',
    name: tr("2 Master Suites w/ TV (2 to 3 Pax Each)", "2 Suites Matrimoniales con TV (2 a 3 Pax c/u)", langOrIsEn),
    type: tr("Master Suite w/ TV", "Suite Matrimonial con TV", langOrIsEn),
    capacity: tr("2 to 3 Pax Each (Subtotal 6 Pax · 2 Baths)", "2 a 3 Pax c/u (Subtotal 6 Pax · 2 Baños)", langOrIsEn),
    maxGuests: 3,
    beds: tr("1 Three-Plaza Bed + 1 Additional Single per Suite", "1 Cama de 3 Plazas + 1 Adicional Individual por Suite", langOrIsEn),
    bathrooms: 1,
    pricePerNight: 115,
    weekendNote: tr("2 units available (max 3 pax ea. · 1 en-suite bathroom per suite · TV included).", "2 unidades disponibles (3 pax máx. c/u · 1 baño privado por suite · incluye TV).", langOrIsEn),
    description: tr("Two matrimonial suites equipped with TV and en-suite private bathroom each. Configured with 1 three-plaza bed + 1 additional single bed (2–3 pax per suite, 6 pax total across both).", "Dos suites matrimoniales equipadas con TV y baño privado cada una. Cada suite cuenta con 1 cama de 3 plazas + 1 cama adicional individual (capacidad 2–3 pax por unidad, 6 pax total entre ambas).", langOrIsEn),
    amenities: trList(['2 Units · TV Included', '1 Triple + 1 Single Bed', '2–3 Pax Ea. · 1 Bath', 'Fiber-Optic Wi-Fi', '84 m² Pool & Spa'], ['2 Unidades · TV Incluida', '1 Cama 3 Plazas + 1 Indiv.', '2–3 Pax c/u · 1 Baño c/u', 'Fibra Óptica', 'Piscina & Zona Spa'], langOrIsEn),
    image: '/images/hacienda/suite-1.jpg',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-suite-2',
    name: tr("2 Family Master Suites (2 to 5 Pax Each)", "2 Suites Matrimoniales Familiares (2 a 5 Pax c/u)", langOrIsEn),
    type: tr("Family Master Suite", "Suite Matrimonial Familiar", langOrIsEn),
    capacity: tr("2 to 5 Pax Each (Subtotal 10 Pax · 2 Baths)", "2 a 5 Pax c/u (Subtotal 10 Pax · 2 Baños)", langOrIsEn),
    maxGuests: 5,
    beds: tr("1 Three-Plaza Bed + Additional Single Beds per Suite", "1 Cama de 3 Plazas + Adicionales Individuales por Suite", langOrIsEn),
    bathrooms: 1,
    pricePerNight: 145,
    weekendNote: tr("2 units available (max 5 pax ea. · 1 en-suite bathroom per suite).", "2 unidades disponibles (5 pax máx. c/u · 1 baño privado por suite).", langOrIsEn),
    description: tr("Two spacious family matrimonial suites with en-suite bathroom each, furnished with 1 three-plaza bed plus additional single beds (2–5 pax per suite, 10 pax combined).", "Dos amplias suites matrimoniales familiares con baño privado cada una, configuradas con 1 cama de 3 plazas más adicionales individuales (capacidad 2–5 pax por unidad, 10 pax en total).", langOrIsEn),
    amenities: trList(['2 Units · 2–5 Pax Ea.', '1 Triple + Extra Singles', '1 En-Suite Bath Ea.', 'Fiber-Optic Wi-Fi', '80–100 Parking Spots'], ['2 Unidades · 2–5 Pax c/u', '1 Cama 3 Plazas + Adic. Indiv.', '1 Baño Privado c/u', 'Internet Fibra Óptica', '80–100 Parqueaderos'], langOrIsEn),
    image: '/images/hacienda/suite-2.jpg',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-departamento',
    name: tr("Independent Apartment (11 Pax · 2 Baths)", "Departamento Independiente (11 Pax · 2 Baños)", langOrIsEn),
    type: tr("Group Apartment", "Departamento Grupal", langOrIsEn),
    capacity: tr("11 Guests (2 Pax Double w/ TV + 9 Bunks)", "11 Personas (2 Pax Matr. c/ TV + 9 Literas)", langOrIsEn),
    maxGuests: 11,
    beds: tr("1 Double Bed (w/ TV) + 9 Two-Tier Single Bunk Beds", "1 Cama de 2 Plazas (c/ TV) + 9 Literas Individuales x 2 Pisos", langOrIsEn),
    bathrooms: 2,
    pricePerNight: 240,
    weekendNote: tr("Ideal layout combining a private TV matrimonial room (2 pax) + 9-person bunk wing within one apartment.", "Distribución ideal para coordinador/pareja con TV + equipo de 9 personas dentro de una misma unidad.", langOrIsEn),
    description: tr("Functional independent apartment featuring 1 matrimonial room w/ TV & double bed (2 pax, 1 bath) plus a room with 9 two-tier single bunks (9 pax, 1 bath). Total: 11 pax & 2 baths.", "Departamento funcional compuesto por 1 habitación matrimonial con TV y cama de 2 plazas (2 pax, 1 baño) más ambiente con 9 literas individuales de dos pisos (9 pax, 1 baño). Total: 11 pax y 2 baños.", langOrIsEn),
    amenities: trList(['11 Guests (2 Baths)', 'Master w/ TV (2 Pax)', '9 Two-Tier Bunks (9 Pax)', 'Fiber-Optic Wi-Fi', '3-Course Dining'], ['11 Personas (2 Baños)', 'Matrimonial c/ TV (2 Pax)', '9 Literas x 2 Pisos (9 Pax)', 'Fibra Óptica', 'Alimentación 3 Tiempos'], langOrIsEn),
    image: '/images/hacienda/boda-suite-lounge.jpg',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-compartida-literas',
    name: tr("Shared Bunk Room 8+9 (17 Pax · 3 Baths)", "Habitación Compartida Literas 8+9 (17 Pax · 3 Baños)", langOrIsEn),
    type: tr("Shared Bunk Lodging", "Alojamiento Grupal Literas", langOrIsEn),
    capacity: tr("17 Guests (8 Bunks + 9 Bunks)", "17 Personas (8 Literas + 9 Literas)", langOrIsEn),
    maxGuests: 17,
    beds: tr("8 Two-Tier Single Bunks + 9 Two-Tier Single Bunks", "8 Literas Individuales x 2 Pisos + 9 Literas Individuales x 2 Pisos", langOrIsEn),
    bathrooms: 3,
    pricePerNight: 35,
    weekendNote: tr("Group rates from $35/guest with scheduled dining and recreational access.", "Tarifa grupal desde $35/persona con alimentación programada y acceso a áreas recreativas.", langOrIsEn),
    description: tr("Shared lodging wing divided into two adjoining bunk sections: an 8 two-tier single bunk bay (8 pax) and a 9 two-tier single bunk bay (9 pax), served by 3 full bathrooms.", "Bloque de alojamiento grupal dividido en dos ambientes integrados: sección de 8 literas individuales de dos pisos (8 pax) y sección de 9 literas individuales de dos pisos (9 pax), servido por 3 baños completos.", langOrIsEn),
    amenities: trList(['17 Guests (3 Baths)', '8 + 9 Two-Tier Bunks', 'Single Bunk Beds', 'Fiber-Optic Wi-Fi', 'Sports & 84 m² Pool'], ['17 Personas (3 Baños)', '8 + 9 Literas x 2 Pisos', 'Camas Individuales', 'Internet Fibra Óptica', 'Canchas & Piscina 84 m²'], langOrIsEn),
    image: '/images/hacienda/lodging-hero-hacienda.jpg',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-compartida-camas',
    name: tr("Shared 10-Bed Room (10 Pax · 2 Baths)", "Habitación Compartida 10 Camas (10 Pax · 2 Baños)", langOrIsEn),
    type: tr("Shared Multi-Bed Room", "Habitación Múltiple", langOrIsEn),
    capacity: tr("10 Guests (10 Single Beds)", "10 Personas (10 Camas Individuales)", langOrIsEn),
    maxGuests: 10,
    beds: tr("10 Individual Single Beds", "10 Camas Individuales", langOrIsEn),
    bathrooms: 2,
    pricePerNight: 35,
    weekendNote: tr("Practical single-level 10-bed dorm with 2 full bathrooms for brigades or delegations.", "Práctica habitación múltiple de 1 nivel con 2 baños completos para brigadas o delegaciones.", langOrIsEn),
    description: tr("Spacious shared room equipped with 10 single beds and 2 full bathrooms for practical, comfortable rest for delegations, volunteers, and field crews.", "Amplia habitación compartida equipada con 10 camas individuales y 2 baños completos para descanso práctico y ordenado de delegaciones, voluntarios y personal de campo.", langOrIsEn),
    amenities: trList(['10 Guests (2 Baths)', '10 Single Beds', 'Fiber-Optic Wi-Fi', '80–100 Parking Spots', '84 m² Pool (70 Pax)'], ['10 Personas (2 Baños)', '10 Camas Individuales', 'Internet Fibra Óptica', '80–100 Parqueaderos', 'Piscina 84 m² (70 Pax)'], langOrIsEn),
    image: '/images/hacienda/hero-atardecer.jpg',
    available: true,
    featuredInHome: true,
  },
];

export const getCorporateSpacesTable = (langOrIsEn?: SupportedLanguage | boolean) =>
  RESORT_SPACES.map((space) => ({
    id: space.id,
    space: tr(space.title_en, space.title_es, langOrIsEn),
    space_en: space.title_en,
    auditorium: space.capacities.auditorium,
    banquet: space.capacities.banquet,
    school: space.capacities.school,
    uShape: space.capacities.uShape,
    notes: tr(space.notes_en, space.notes_es, langOrIsEn),
    notes_en: space.notes_en,
  }));

export const getCorporateSpacesCards = (langOrIsEn?: SupportedLanguage | boolean) =>
  RESORT_SPACES.map((space) => ({
    id: space.id,
    title: tr(space.title_en, space.title_es, langOrIsEn),
    title_en: space.title_en,
    subtitle: tr(space.subtitle_en, space.subtitle_es, langOrIsEn),
    subtitle_en: space.subtitle_en,
    image: space.image,
    videoUrl: space.videoUrl,
    mediaType: space.mediaType,
    badge: tr(space.badge_en, space.badge_es, langOrIsEn),
    badge_en: space.badge_en,
    description: tr(space.description_en, space.description_es, langOrIsEn),
    description_en: space.description_en,
  }));

export const getResortSpaces = (langOrIsEn?: SupportedLanguage | boolean) =>
  RESORT_SPACES.map((space) => ({
    ...space,
    title: tr(space.title_en, space.title_es, langOrIsEn),
    subtitle: tr(space.subtitle_en, space.subtitle_es, langOrIsEn),
    badge: tr(space.badge_en, space.badge_es, langOrIsEn),
    description: tr(space.description_en, space.description_es, langOrIsEn),
    notes: tr(space.notes_en, space.notes_es, langOrIsEn),
    inclusions: trList(space.inclusions_en, space.inclusions_es, langOrIsEn),
  }));

export const getLodgingServicesData = (
  langOrIsEn?: SupportedLanguage | boolean
): LodgingServiceCard[] => [
  {
    id: 'srv-alimentacion-restaurante',
    title: tr("Dining & Restaurant", "Alimentación & Restaurante", langOrIsEn),
    badge: tr("Dining & Amenity", "Alimentación & Comp.", langOrIsEn),
    badgeClass: 'bg-[#13281F]/90 text-[#E2C585] border border-[#C8A45D]/40',
    description: tr(
      "Scheduled breakfasts, lunches, dinners, and coffee breaks for groups up to 65 guests, featuring our on-site restaurant.",
      "Desayunos, almuerzos, cenas y coffee breaks programados para grupos de hasta 65 personas, con restaurante propio como complemento.",
      langOrIsEn
    ),
    ctaText: tr("Quote with meal plan", "Cotizar con pensión", langOrIsEn),
    image: '/images/hacienda/gastronomia-parrillada.jpg',
    videoUrl: '',
    mediaType: 'image',
    serviceType: 'hospedaje',
    itemName: tr(
      "3-Meal Catering & Restaurant for Extended Stays",
      "Alimentación 3 Tiempos y Restaurante para Larga Estadía",
      langOrIsEn
    ),
  },
  {
    id: 'srv-internet-parqueaderos',
    title: tr("Internet & 80–100 Parking", "Internet & 80–100 Parqueaderos", langOrIsEn),
    badge: tr("Internet & Parking", "Internet & Parqueaderos", langOrIsEn),
    badgeClass: 'bg-[#8C6D3F]/90 text-[#FAF7F2]',
    description: tr(
      "High-speed fiber-optic Wi-Fi, 8 external restrooms, and 80 to 100 gated private parking spots for cars and buses.",
      "Wi-Fi por fibra óptica de alta estabilidad, 8 baños externos de apoyo y 80 a 100 parqueaderos internos seguros para autos y buses.",
      langOrIsEn
    ),
    ctaText: tr("Check logistics", "Consultar logística", langOrIsEn),
    image: '/images/hacienda/grupos-hxp.jpg',
    videoUrl: '',
    mediaType: 'image',
    serviceType: 'hospedaje',
    itemName: tr(
      "Corporate Stay with Fiber Optic WiFi & 80–100 Parking",
      "Estadía Corporativa con Internet Fibra Óptica y Parqueaderos",
      langOrIsEn
    ),
  },
  {
    id: 'srv-piscina-bienestar',
    title: tr("Amenity: 84 m² Pool & Spa", "Comp.: Piscina 84 m² & Spa", langOrIsEn),
    badge: tr("Amenity", "Complemento", langOrIsEn),
    badgeClass: 'bg-[#1A382B]/90 text-[#FAF7F2]',
    description: tr(
      "14×6m = 84 m² pool (70 pax) and sauna/steam/jacuzzi (6–8 pax). Note: 2 hot tubs (2×2 m) for large groups at extra fee.",
      "Piscina 14×6 m = 84 m² (cap. 70 pax) y sauna/turco/jacuzzi (6–8 pax). Nota: 2 hidromasajes 2×2 m solo en grupos grandes y con tarifa extra.",
      langOrIsEn
    ),
    ctaText: tr("View inclusions", "Ver inclusiones", langOrIsEn),
    image: '/images/hacienda/area-humeda.jpg',
    videoUrl: '',
    mediaType: 'image',
    serviceType: 'hospedaje',
    itemName: tr(
      "84 m² Pool (70 Pax) & Wellness Spa Amenity",
      "Complemento Piscina Temperada y Zona Húmeda",
      langOrIsEn
    ),
  },
  {
    id: 'srv-recreacion-deportes',
    title: tr("Amenity: 13,000 m² & Sports*", "Comp.: 13.000 m² & Deportes", langOrIsEn),
    badge: tr("Amenity", "Complemento", langOrIsEn),
    badgeClass: 'bg-[#6B7052]/90 text-[#FAF7F2]',
    description: tr(
      "13,000 m² lawns, 7v7 grass soccer, pro basketball, reg. grass volley, ping pong & billiards (karaoke, 50-pax club & coaching hall extra fee).",
      "13.000 m² de jardines, fútbol 7v7, básquet profesional, vóley en césped reglamentaria, ping pong y billar (karaoke, discoteca 50 pax y salón social con pago extra).",
      langOrIsEn
    ),
    ctaText: tr("Quote group", "Cotizar grupo", langOrIsEn),
    image: '/images/hacienda/jardines-teambuilding.jpg',
    videoUrl: '',
    mediaType: 'image',
    serviceType: 'grupos',
    itemName: tr(
      "Group Lodging with Sports Courts & 13,000 m² Gardens",
      "Hospedaje Grupal con Actividades Recreativas y Canchas",
      langOrIsEn
    ),
  },
];

export const getCorporateHighlightsData = (
  langOrIsEn?: SupportedLanguage | boolean
): CorporateHighlightItem[] => [
  {
    id: 'corp-hl-findeanio',
    title: tr("Year-End & 13,000 m² Gardens", "Fin de Año & 13.000 m² Jardines", langOrIsEn),
    subtitle: tr(
      "Tents, 8 external restrooms, 80–100 parking spots & catering",
      "Carpas, 8 baños externos, 80–100 parqueaderos y catering",
      langOrIsEn
    ),
    highlightMetric: tr("Up to 350+ pax", "Hasta 350+ pax", langOrIsEn),
    image: '/images/hacienda/boda-carpa-gala.jpg',
    mediaType: 'image',
    whatsappItemName: tr(
      "Year-End Galas & Large-Format Celebrations",
      "Eventos de Fin de Año & Celebraciones de Gran Formato",
      langOrIsEn
    ),
  },
  {
    id: 'corp-hl-teambuilding',
    title: tr("Team Building, Sports & Pool", "Integración, Deportes & Piscina", langOrIsEn),
    subtitle: tr(
      "7v7 soccer, pro b-ball, reg. volley, ping pong, billiards & 84 m² pool",
      "Fútbol 7v7, básquet pro, vóley regl., ping pong, billar y piscina 84 m²",
      langOrIsEn
    ),
    highlightMetric: tr("70-pax pool", "Piscina 70 pax", langOrIsEn),
    image: '/images/hacienda/jardines-teambuilding.jpg',
    mediaType: 'image',
    whatsappItemName: tr(
      "Corporate Team Building, Sports Activities & Pool",
      "Integración Empresarial, Actividades Deportivas y Piscina",
      langOrIsEn
    ),
  },
  {
    id: 'corp-hl-convenciones',
    title: tr("Conventions + 65-Pax Lodging", "Convenciones + Hospedaje 65 Pax", langOrIsEn),
    subtitle: tr(
      "Social hall*, 50-pax nightclub* & karaoke* (*extra fee)",
      "Salón eventos/coaching*, discoteca 50 pax* y karaoke* (*pago extra)",
      langOrIsEn
    ),
    highlightMetric: tr("Up to 65 guests", "Hasta 65 huéspedes", langOrIsEn),
    image: '/images/hacienda/reunion-corporativa.jpg',
    mediaType: 'image',
    whatsappItemName: tr(
      "Conventions with Complementary Lodging (Up to 65 Guests)",
      "Convenciones con Hospedaje Complementario (Hasta 65 Personas)",
      langOrIsEn
    ),
  },
];
