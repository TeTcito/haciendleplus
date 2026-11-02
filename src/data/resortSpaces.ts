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
import type { ServicePackage, CabinRoom } from '../types/cms';

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
    subtitle_es: 'Gran Formato 350+ pax · 5.000 m² de áreas verdes',
    subtitle_en: 'Grand Format 350+ guests · 5,000 m² of flat green lawns',
    badge_es: 'Macroeventos & Fin de Año',
    badge_en: 'Macro-Events & Year-End Galas',
    description_es:
      'Carpas de gala impermeables de alta gama instaladas sobre 5.000 m² de jardines andinos planos. Diseñadas para celebraciones masivas, con tarima modular para orquesta o presentaciones, pista de baile iluminada, generador eléctrico de respaldo y servicio de catering propio in situ.',
    description_en:
      'High-end waterproof gala tents erected over 5,000 m² of manicured flat Andean lawns. Purpose-built for massive celebrations, featuring a modular stage for live orchestras or keynotes, dance floor, backup power generator, and in-house gourmet catering.',
    mediaType: 'video',
    image: '/images/hacienda/boda-carpa-gala.jpg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-resort-in-the-mountains-41573-large.mp4',
    capacities: {
      auditorium: '350+ pax',
      banquet: '300 pax',
      school: '180 pax',
      uShape: 'N/A',
      cocktail: '400+ pax',
    },
    areaM2: '5.000 m²',
    notes_es: 'Carpas de gala, jardines de 5.000 m², tarima, pista de baile y catering propio',
    notes_en: 'Gala tents, 5,000 m² lawns, stage, illuminated dance floor, and on-site catering',
    inclusions_es: [
      'Carpas estructurales blancas con cortinajes y cielo falso decorativo',
      '5.000 m² de jardines nivelados para actividades, cócteles o banquetes',
      'Tarima modular regulable para escenario de bandas, conferencistas o DJ',
      'Pista de baile tratada de alta resistencia y generador auxiliar',
      'Catering propio con menús de 3 tiempos, parrilladas o buffets',
    ],
    inclusions_en: [
      'Engineered white gala tents with drapery and decorative false ceilings',
      '5,000 m² of manicured flat lawns for team activities, cocktails, or open-air dining',
      'Modular adjustable stage for live entertainment, keynote speakers, or DJ setup',
      'Heavy-duty engineered dance floor and auxiliary backup power generator',
      'Full in-house catering offering 3-course plated banquets, gourmet BBQ, and buffets',
    ],
  },
  {
    id: 'gran-salon',
    title_es: 'Gran Salón de Convenciones, Tarima & Pista de Baile',
    title_en: 'Grand Convention Hall, Stage & Dance Floor',
    subtitle_es: 'Convenciones 250 pax · Banquete 200 pax · Escuela 140 pax',
    subtitle_en: 'Conventions 250 guests · Banquet 200 guests · Classroom 140 guests',
    badge_es: 'Tarima & Pista de Baile',
    badge_en: 'Stage & Pro Audio / Visual',
    description_es:
      'Salón cerrado de 450 m² con acabados cálidos en madera andina, excelente acústica y ventanales panorámicos hacia los jardines. Equipado con tarima principal elevada, pista de baile, sistema de sonido profesional, pantalla gigante y microfonía para convenciones empresariales o eventos nocturnos.',
    description_en:
      'Enclosed 450 m² hall featuring warm Andean woodwork, pristine acoustics, and panoramic windows facing the gardens. Outfitted with an elevated main stage, dance floor, professional PA audio, giant projection screen, and wireless microphones for corporate summits or gala evenings.',
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
    notes_es: 'Climatizado, tarima, pista de baile, pantalla gigante, sonido pro y acceso a jardines',
    notes_en: 'Climate-controlled, stage, dance floor, giant screen, pro audio, and garden terrace access',
    inclusions_es: [
      'Ambiente cerrado climatizado con iluminación arquitectónica dimerizable',
      'Tarima frontal para directorio, panel de expositores o presentaciones',
      'Pantalla gigante de proyección y microfonía inalámbrica de alta fidelidad',
      'Pista de baile integrada de madera lacada para celebraciones',
      'Conexión Wi-Fi simétrica por fibra óptica de alta estabilidad',
    ],
    inclusions_en: [
      'Enclosed climate-controlled space with dimmable architectural mood lighting',
      'Elevated head-table stage for executive board, panel speakers, or ceremonies',
      'High-lumen giant presentation screen and high-fidelity wireless microphones',
      'Integrated lacquered hardwood dance floor for evening celebrations',
      'Dedicated symmetrical fiber-optic Wi-Fi for live streams and digital conferences',
    ],
  },
  {
    id: 'deportes-piscina',
    title_es: 'Canchas Deportivas, Piscina Temperada 14×6m & Spa',
    title_en: 'Sports Courts, 14×6m Heated Pool & Wellness Spa',
    subtitle_es: 'Canchas reglamentarias + Piscina temperada + 2 Hidromasajes',
    subtitle_en: 'Regulation sports courts + 14×6m heated pool + 2 Whirlpools',
    badge_es: 'Complemento Integración & Relax',
    badge_en: 'Team Building & Wellness',
    description_es:
      'Instalaciones recreativas de primer nivel integradas al recinto: piscina cubierta temperada de 14×6 metros, dos hidromasajes de relajación, sauna finlandés y baño turco. Incluye canchas reglamentarias de fútbol césped, vóley y básquetbol para dinámicas de team building y torneos empresariales.',
    description_en:
      'Top-tier recreational and wellness amenities integrated into the resort: indoor heated 14×6m swimming pool, two relaxation whirlpool hot tubs, Finnish sauna, and eucalyptus steam room. Includes regulation grass soccer, volleyball, and basketball courts for team-building tournaments.',
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
    areaM2: 'Área deportiva y húmeda',
    notes_es: 'Complemento recreativo: fútbol, vóley, básquetbol, piscina temperada y 2 hidromasajes',
    notes_en: 'Recreational highlight: soccer, volleyball, basketball, heated pool, sauna & 2 hot tubs',
    inclusions_es: [
      'Piscina cubierta y temperada de 14×6 metros con iluminación subacuática',
      'Dos tinas de hidromasaje térmico para relajación de grupos',
      'Sauna seco finlandés y baño turco vaporizado de eucalipto',
      'Cancha reglamentaria de fútbol césped y canchas de vóley y básquetbol',
      'Baterías sanitarias, vestidores y duchas de agua caliente independientes',
    ],
    inclusions_en: [
      'Covered and heated 14×6 meter swimming pool with underwater ambient lights',
      'Two thermal whirlpool hot tubs designed for post-activity group relaxation',
      'Dry Finnish wood sauna and eucalyptus-infused steam room',
      'Regulation natural grass soccer pitch plus volleyball and basketball courts',
      'Complete locker rooms, changing facilities, and hot-water private showers',
    ],
  },
  {
    id: 'suites-hospedaje',
    title_es: 'Hospedaje Complementario en 14 Habitaciones',
    title_en: 'Complementary On-Site Lodging across 14 Rooms',
    subtitle_es: '14 habitaciones configurables · 28 a 80 huéspedes',
    subtitle_en: '14 configurable private rooms · 28 to 80 guests',
    badge_es: 'Complemento Alojamiento In Situ',
    badge_en: 'On-Site Private Lodging',
    description_es:
      'Solución integral de alojamiento dentro de la hacienda para delegaciones de empresas, ONGs, directivos e invitados de bodas. 14 habitaciones distribuidas en suites matrimoniales, dobles y cabañas grupales, todas con baño privado, agua caliente continua, sábanas térmicas y Wi-Fi fibra óptica.',
    description_en:
      'Complete on-site accommodation solution inside the resort grounds for corporate delegations, NGOs, executives, and wedding party members. 14 private rooms spanning matrimonial suites, double rooms, and group villas, each with en-suite private bathrooms, continuous hot water, and high-speed Wi-Fi.',
    mediaType: 'image',
    image: '/images/hacienda/boda-suite-lounge.jpg',
    capacities: {
      auditorium: '80 pax',
      banquet: '80 pax',
      school: 'N/A',
      uShape: 'N/A',
      cocktail: '80 pax',
    },
    areaM2: '14 Habitaciones',
    notes_es: 'Alojamiento complementario in situ (28 a 80 huéspedes) para convenciones y eventos',
    notes_en: 'On-site lodging (28 to 80 guests) complementing conventions, long stays, and weddings',
    inclusions_es: [
      '14 habitaciones privadas con baño independiente y agua caliente 24/7',
      'Capacidad flexible desde 28 hasta 80 personas según distribución',
      'Servicio de limpieza diario, cambio de lencería y lavandería',
      'Acceso directo a restaurante propio con tres comidas diarias',
      'Seguridad privada perimetral y parqueaderos amplios para buses y autos',
    ],
    inclusions_en: [
      '14 private rooms with en-suite bathrooms and 24/7 high-pressure hot water',
      'Flexible configurations accommodating 28 to 80 guests tailored to your group',
      'Daily housekeeping service, fresh premium linens, and laundry service',
      'Direct access to on-site dining room providing 3 daily chef-prepared meals',
      'Gated perimeter security with spacious parking for coach buses and vehicles',
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
    subtitle: tr("14 private rooms (28 to 80 guests), full dining, fiber Wi-Fi & parking.", "14 habitaciones (28 a 80 personas), alimentación, internet fibra óptica y parqueaderos.", langOrIsEn),
    meta: tr("Long Stay · Quotes by headcount & duration", "Larga Estadía · Cotización por personas y duración", langOrIsEn),
    cardImage: '/images/hacienda/grupos-hxp.jpg',
    bgImage: '/images/hacienda/vista-aerea.jpg',
    route: '/hospedaje',
    serviceType: 'grupos',
  },
  {
    id: 'grandes-eventos',
    location: tr("5,000 m² Lawns & Tents · Quito–Píntag", "Explanada 5.000 m² & Carpas · Quito–Píntag", langOrIsEn),
    title: tr("Major events & corporate experiences", "Grandes eventos y experiencias corporativas", langOrIsEn),
    subtitle: tr("Year-end, team retreats & conventions: tents, gardens, catering, stage, dance floor & pool.", "Fin de año, integración y convenciones: carpas, jardines, catering, tarima, pista de baile, canchas y piscina.", langOrIsEn),
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
    subtitle: tr("Ceremonies, reception, gardens, catering, decoration, and on-site lodging for guests.", "Ceremonias, recepción, jardines, catering, decoración y hospedaje para invitados.", langOrIsEn),
    meta: tr("Weddings & Social Events · Up to 300 guests", "Bodas & Eventos Sociales · Hasta 300 invitados", langOrIsEn),
    cardImage: '/images/hacienda/montaje-banquete.jpg',
    bgImage: '/images/hacienda/bodas-exteriores.jpg',
    route: '/bodas',
    serviceType: 'bodas',
  },
  {
    id: 'instalaciones',
    location: tr("Quito–Píntag · 30 min from Airport", "Quito–Píntag · A 30 min del Aeropuerto", langOrIsEn),
    title: tr("Pool, restaurant and recreational activities", "Piscina, restaurante y actividades recreativas", langOrIsEn),
    subtitle: tr("Value amenities strengthening your long stay or major event on private grounds.", "Complementos que fortalecen tu larga estadía o gran evento en un mismo predio privado.", langOrIsEn),
    meta: tr("14×6m Pool, Sports Courts & In-House Dining", "Piscina 14×6m, Canchas Deportivas y Gastronomía Propia", langOrIsEn),
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
    desc: tr("Long Stay Priority: 14 rooms, full dining, Wi-Fi & private parking.", "Prioridad Larga Estadía: 14 hab., alimentación, internet y parqueadero.", langOrIsEn),
    img: '/images/hacienda/grupos-hxp.jpg',
    link: '/hospedaje',
    badge: tr("Commercial Priority", "Prioridad Comercial", langOrIsEn),
  },
  {
    title: tr("Major Events", "Grandes Eventos", langOrIsEn),
    desc: tr("Year-end, team retreats, conventions, gala tents, lawns & stage.", "Fin de año, integración, convenciones, carpas, jardines y tarima.", langOrIsEn),
    img: '/images/hacienda/jardines-teambuilding.jpg',
    link: '/corporativo',
    badge: tr("Up to 350+ guests", "Hasta 350+ pax", langOrIsEn),
  },
  {
    title: tr("Weddings & Celebrations", "Bodas y Celebraciones", langOrIsEn),
    desc: tr("Ceremonies, reception, gardens, catering, decor & on-site lodging.", "Ceremonias, recepción, jardines, catering, decoración y hospedaje.", langOrIsEn),
    img: '/images/hacienda/montaje-banquete.jpg',
    link: '/bodas',
    badge: tr("Exclusive Weddings", "Bodas Exclusivas", langOrIsEn),
  },
  {
    title: tr("Amenity: Pool & Sports", "Comp.: Piscina & Canchas", langOrIsEn),
    desc: tr("14×6m pool, whirlpools & sports facilities elevating your retreat.", "Piscina 14×6m, hidromasajes y deportes que fortalecen tu evento.", langOrIsEn),
    img: '/images/hacienda/piscina-aerea.jpg',
    link: '/corporativo',
    badge: tr("Complementary", "Complementario", langOrIsEn),
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
    description: tr("Strategic on-site accommodation for corporate personnel, delegations, NGOs (IMC · HXP), volunteers, and international groups. Configurable rooms, full board, fiber-optic internet, parking, and custom quotes based on team size and stay duration.", "Alojamiento estratégico para personal de empresas, delegaciones, ONG (IMC · HXP), voluntarios y grupos internacionales. Habitaciones configurables, alimentación diaria, internet fibra óptica, parqueaderos y cotización según número de personas y duración.", langOrIsEn),
    inclusions: trList([
          '14 configurable rooms (28 to 80 guests) with daily housekeeping and laundry',
          'Full board in on-site restaurant, high-speed fiber Wi-Fi, and private parking',
          'Flexible tailored pricing based on headcount and stay length (days, weeks, or months)',
        ], [
          '14 habitaciones configurables (28 a 80 personas) con limpieza y lavandería',
          'Alimentación completa en restaurante, internet fibra óptica y parqueaderos privados',
          'Cotización flexible por número de personas y duración (días, semanas o meses)',
        ], langOrIsEn),
    priceText: tr("From $35 / person / night", "Desde $35 / persona / noche", langOrIsEn),
    capacityText: tr("28 to 80 guests · 14 rooms", "28 a 80 personas · 14 habitaciones", langOrIsEn),
    image: '/images/hacienda/grupos-hxp.jpg',
    imageCaption: tr("COMMERCIAL PRIORITY · LONG STAYS FOR COMPANIES & GROUPS", "PRIORIDAD COMERCIAL · LARGA ESTADÍA PARA EMPRESAS Y GRUPOS", langOrIsEn),
    selectorTitle: tr("1. Corporate & Group Lodging (Long Stay)", "1. Hospedaje Empresas y Grupos (Larga Estadía)", langOrIsEn),
    selectorDesc: tr("Corporate staff, delegations, NGOs, and international groups.", "Personal de empresas, delegaciones, ONGs y grupos internacionales.", langOrIsEn),
    circleBg: '#113B4F',
    route: '/hospedaje',
    serviceType: 'grupos',
    Icon: HeartHandshake,
  },
  {
    id: 'srv-grandes-eventos',
    overline: tr("COMMERCIAL PRIORITY · MACRO-EVENTS & CORPORATE", "PRIORIDAD COMERCIAL · MACROEVENTOS Y EMPRESAS", langOrIsEn),
    title: tr("Major Events & Corporate Experiences", "Grandes Eventos y Experiencias Corporativas", langOrIsEn),
    description: tr("Year-end galas, team building retreats, conventions, and large-format corporate gatherings in Quito–Píntag. Features structural tents, 5,000 m² lawns, in-house catering, stage, dance floor, sports courts, pool, and complementary lodging.", "Eventos de fin de año, integración, convenciones y celebraciones de gran formato en Quito–Píntag. Incluye carpas, 5.000 m² de jardines, catering, tarima, pista de baile, actividades deportivas, piscina y hospedaje complementario.", langOrIsEn),
    inclusions: trList([
          'Structural gala tents, indoor halls, stage, professional sound, and dance floor',
          '5,000 m² lawns, regulation sports courts (soccer, volley, basketball) & catering',
          'Covered heated 14×6m pool and 14 rooms for complementary overnight lodging',
        ], [
          'Carpas estructurales, salones, tarima, sonido profesional y pista de baile',
          '5.000 m² de jardines, canchas deportivas (fútbol, vóley, básquet) y catering propio',
          'Piscina temperada 14×6m y 14 habitaciones de hospedaje complementario',
        ], langOrIsEn),
    priceText: tr("From $45 / participant", "Desde $45 / participante", langOrIsEn),
    capacityText: tr("50 to 350 participants", "50 a 350 participantes", langOrIsEn),
    image: '/images/hacienda/jardines-teambuilding.jpg',
    imageCaption: tr("MACRO-EVENTS, YEAR-END GALAS, INTEGRATION & CONVENTIONS", "MACROEVENTOS, FIN DE AÑO, INTEGRACIÓN Y CONVENCIONES", langOrIsEn),
    selectorTitle: tr("2. Major Events & Corporate", "2. Grandes Eventos y Corporativo", langOrIsEn),
    selectorDesc: tr("Year-end, team retreats, conventions, tents, stage, and dance floor.", "Fin de año, integración, convenciones, carpas, tarima y pista de baile.", langOrIsEn),
    circleBg: '#1B3B2B',
    route: '/corporativo',
    serviceType: 'corporativo',
    Icon: Building2,
  },
  {
    id: 'srv-bodas',
    overline: tr("UNFORGETTABLE MEMORIES · GALA CELEBRATIONS", "EXPERIENCIAS INOLVIDABLES · CELEBRACIONES DE GALA", langOrIsEn),
    title: tr("Weddings & Celebrations in Quito–Píntag", "Bodas y Celebraciones en Quito–Píntag", langOrIsEn),
    description: tr("Country-style weddings and dream receptions surrounded by Andean nature. Open-air ceremony, gala tent or colonial hall reception, gourmet catering, custom decor, and on-site lodging for newlyweds and guests.", "Bodas campestres y recepciones de ensueño rodeadas de naturaleza andina. Ceremonia al aire libre, banquete en carpa de gala o salón colonial, catering propio, decoración personalizada y hospedaje para novios e invitados.", langOrIsEn),
    inclusions: trList([
          'Open-air garden ceremony with floral arch and Tiffany seating',
          'Gala reception under imperial tent with dance floor and mood lighting',
          '3-course gourmet dinner, open bar, and complimentary bridal suite',
        ], [
          'Ceremonia al aire libre en jardines con arco floral y sillas Tiffany',
          'Recepción de gala bajo carpa imperial con pista de baile e iluminación',
          'Catering de 3 tiempos, barra libre y suite nupcial de cortesía',
        ], langOrIsEn),
    priceText: tr("From $42 / guest", "Desde $42 / invitado", langOrIsEn),
    capacityText: tr("50 to 300 guests", "50 a 300 personas · Jardines y Salones", langOrIsEn),
    image: '/images/hacienda/montaje-banquete.jpg',
    imageCaption: tr("WEDDINGS, SOCIAL CELEBRATIONS & GALA RECEPTIONS", "BODAS, CELEBRACIONES SOCIALES Y RECEPCIONES DE GALA", langOrIsEn),
    selectorTitle: tr("3. Weddings & Celebrations", "3. Bodas y Celebraciones", langOrIsEn),
    selectorDesc: tr("Open-air ceremony, gala tent banquet, and on-site lodging.", "Ceremonia al aire libre, banquete en carpa de gala y hospedaje.", langOrIsEn),
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
    title: tr("Complement: 14×6m Heated Pool & Wellness Spa", "Complemento: Piscina Temperada 14×6m y Zona Húmeda", langOrIsEn),
    description: tr("The covered heated 14×6m pool, two whirlpools, sauna, and steam room serve as the ideal retreat for long-stay personnel, corporate retreats, and wedding guests.", "La piscina cubierta de 14×6 metros, los dos hidromasajes, el sauna y el baño turco se integran como el complemento ideal para el descanso del personal en larga estadía, jornadas corporativas y huéspedes de bodas.", langOrIsEn),
    inclusions: trList([
          'Heated 14×6 meter swimming pool under climate-controlled glass enclosure',
          'Two hot tubs, Finnish sauna, and eucalyptus steam room for relaxation',
          'Exclusive value-add for resident teams and corporate gathering attendees',
        ], [
          'Piscina temperada de 14×6 metros bajo cubierta climatizada',
          'Dos hidromasajes, sauna finlandés y baño turco para recuperación y bienestar',
          'Valor agregado exclusivo para grupos alojados y eventos empresariales',
        ], langOrIsEn),
    priceText: tr("Amenity Included in Stays & Events", "Complemento Incluido en Estadías y Eventos", langOrIsEn),
    capacityText: tr("14×6m Pool + 2 Hot Tubs + Sauna & Steam Room", "Piscina 14×6m + 2 Hidromasajes + Sauna & Turco", langOrIsEn),
    image: '/images/hacienda/piscina-aerea.jpg',
    imageCaption: tr("HEATED POOL & WELLNESS SPA AS VALUE AMENITIES", "PISCINA Y ZONA HÚMEDA COMO COMPLEMENTO DE VALOR", langOrIsEn),
    selectorTitle: tr("Complement: Pool & Wellness Spa", "Complemento: Piscina y Zona Húmeda", langOrIsEn),
    selectorDesc: tr("14×6m pool, 2 hot tubs, sauna, and steam room for your groups.", "Piscina 14×6m, 2 hidromasajes, sauna y turco para tus grupos y eventos.", langOrIsEn),
    circleBg: '#9E7329',
    route: '/corporativo',
    serviceType: 'corporativo',
    Icon: Waves,
  },
  {
    id: 'srv-comp-recreacion',
    overline: tr("TEAM BUILDING & SPORTS AMENITY", "COMPLEMENTO DEPORTIVO Y DE INTEGRACIÓN", langOrIsEn),
    title: tr("Complement: Sports Courts, Lawns & Recreation", "Complemento: Actividades Deportivas, Canchas y Recreación", langOrIsEn),
    description: tr("Strengthen team cohesion for your company, delegation, or year-end retreat across 5,000 m² of lawns, regulation sports courts, and game lounge right on property.", "Fortalece la convivencia de tu empresa, delegación o evento de fin de año con 5.000 m² de jardines, canchas deportivas reglamentarias y salón de juegos sin salir de la propiedad.", langOrIsEn),
    inclusions: trList([
          'Soccer, volleyball, and basketball courts for corporate sports tournaments',
          'Social lounge with billiards, table tennis, karaoke, and fire pit areas',
          '5,000 m² of private lawns for team-building challenges and relaxation',
        ], [
          'Canchas de fútbol, vóley y básquet para torneos corporativos y recreación',
          'Salón social con billar, ping-pong, karaoke y áreas de fogata/convivencia',
          '5.000 m² de jardines privados para gincanas, team building y descanso',
        ], langOrIsEn),
    priceText: tr("Sports & Recreational Amenity", "Complemento Deportivo & Recreativo", langOrIsEn),
    capacityText: tr("5,000 m² Lawns & Regulation Courts", "5.000 m² de Jardines y Canchas Deportivas", langOrIsEn),
    image: '/images/hacienda/reunion-corporativa.jpg',
    imageCaption: tr("SPORTS COURTS & TEAM ACTIVITIES ELEVATING RETREATS", "CANCHAS Y RECREACIÓN QUE FORTALECEN TU EXPERIENCIA", langOrIsEn),
    selectorTitle: tr("Complement: Recreational Activities", "Complemento: Actividades Recreativas", langOrIsEn),
    selectorDesc: tr("Soccer, volleyball, basketball, billiards, karaoke, and green lawns.", "Canchas de fútbol, vóley, básquet, billar, karaoke y áreas verdes.", langOrIsEn),
    circleBg: '#2E5239',
    route: '/corporativo',
    serviceType: 'corporativo',
    Icon: ShieldCheck,
  },
  {
    id: 'srv-ubicacion-logistica',
    overline: tr("STRATEGIC VENUE IN QUITO–PÍNTAG", "UBICACIÓN ESTRATÉGICA EN QUITO–PÍNTAG", langOrIsEn),
    title: tr("Facilities, Fiber-Optic Internet & Private Parking", "Instalaciones, Internet Fibra Óptica y Parqueaderos Privados", langOrIsEn),
    description: tr("Located in Quito–Píntag (San Juan de la Tola, Calle Deus No. 100), 40 min from Quito and 30 min from Mariscal Sucre Airport. Features high-speed fiber internet, expansive secure parking for coach buses and cars.", "Ubicada en Quito–Píntag (Barrio San Juan de la Tola, Calle Deus N.º 100), a 40 min de Quito y 30 min del Aeropuerto Mariscal Sucre. Cuenta con internet por fibra óptica, amplios parqueaderos internos y flota de buses.", langOrIsEn),
    inclusions: trList([
          'Strategic location 30 minutes from Mariscal Sucre International Airport',
          'Symmetrical fiber-optic Wi-Fi coverage across meeting halls and rooms',
          'Spacious secure gated parking with capacity for tourist buses and cars',
        ], [
          'Ubicación estratégica a 30 minutos del Aeropuerto Mariscal Sucre',
          'Internet Wi-Fi por fibra óptica simétrica en salones y habitaciones',
          'Parqueadero interno privado vigilado con capacidad para buses y vehículos',
        ], langOrIsEn),
    priceText: tr("Prime Location & Logistics", "Ubicación & Logística Privilegiada", langOrIsEn),
    capacityText: tr("30 min from Airport · Bus Parking", "A 30 min del Aeropuerto · Parqueadero Buses", langOrIsEn),
    image: '/images/hacienda/hero-vista-aerea-clean-derecha.jpg',
    imageCaption: tr("STRATEGIC POSITION & RELIABLE LOGISTICS IN PÍNTAG", "UBICACIÓN Y LOGÍSTICA PRIVILEGIADA EN PÍNTAG", langOrIsEn),
    selectorTitle: tr("Quito–Píntag Venue & Parking", "Ubicación Quito–Píntag & Parqueaderos", langOrIsEn),
    selectorDesc: tr("40 min from Quito, 30 min from Airport, fiber Wi-Fi and parking.", "A 40 min de Quito y 30 min del Aeropuerto, fibra óptica y parqueaderos.", langOrIsEn),
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
    comment: tr("Privacy, reliable fiber-optic Wi-Fi, and 3 flawless daily meals for our 75 international volunteers across several weeks.", "Privacidad, internet fibra óptica y 3 comidas diarias impecables para nuestros 75 voluntarios durante varias semanas.", langOrIsEn),
    avatarUrl: '/images/avatars/mision-hxp.jpg',
  },
  {
    id: 'rev-2',
    author: 'IMC Cooperación',
    role: tr("Corporate & Group Lodging", "Hospedaje Empresas y Grupos", langOrIsEn),
    rating: 5,
    comment: tr("Strategic venue in Quito–Píntag 30 min from airport, generous coach parking, peaceful rooms, and attentive staff.", "Ubicación estratégica en Quito–Píntag a 30 min del aeropuerto, amplios parqueaderos, habitaciones cómodas y atención directa.", langOrIsEn),
    avatarUrl: '/images/avatars/imc-cooperacion.jpg',
  },
  {
    id: 'rev-3',
    author: 'GAD de Pichincha',
    role: tr("Major Corporate Conventions", "Grandes Eventos Corporativos", langOrIsEn),
    rating: 5,
    comment: tr("Gala tents, manicured lawns, stage, sports fields, heated pool, and generous punctual catering for our annual summit.", "Carpas, jardines, tarima, canchas deportivas, piscina y un catering puntual y abundante para nuestra jornada de integración.", langOrIsEn),
    avatarUrl: '/images/avatars/gad-pichincha.jpg',
  },
  {
    id: 'rev-4',
    author: 'Dir. Banco & Finanzas',
    role: tr("Year-End Gala & Retreat", "Fin de Año & Convención", langOrIsEn),
    rating: 5,
    comment: tr("A single provider for our grand gala, illuminated dance floor, BBQ banquet, and complementary rooms. Made planning effortless.", "Un solo proveedor para nuestro gran evento, pista de baile, parrillada y hospedaje complementario. Facilitó todo el presupuesto.", langOrIsEn),
    avatarUrl: '/images/avatars/banco-finanzas.jpg',
  },
  {
    id: 'rev-5',
    author: 'Sofía & Sebastián',
    role: tr("Weddings & Celebrations", "Bodas y Celebraciones", langOrIsEn),
    rating: 5,
    comment: tr("We held our ceremony and reception in the gardens and accommodated all our out-of-town guests in the 14 on-site rooms.", "Celebramos nuestra ceremonia y recepción en los jardines y alojamos a los invitados que vinieron de fuera en las 14 habitaciones.", langOrIsEn),
    avatarUrl: '/images/avatars/sofia-sebastian.jpg',
  },
  {
    id: 'rev-6',
    author: 'Dr. Carlos Mendoza',
    role: tr("Executive Retreat", "Encuentro Empresarial", langOrIsEn),
    rating: 5,
    comment: tr("First-class facilities in Quito–Píntag, well-equipped conference halls, and the heated pool and dining room were standout features.", "Instalaciones de primer nivel en Quito–Píntag, salones equipados y piscina y restaurante como complementos extraordinarios.", langOrIsEn),
    avatarUrl: '/images/avatars/dr-carlos.jpg',
  },
  {
    id: 'rev-7',
    author: 'Valeria & Mateo',
    role: tr("Wedding & Gourmet Catering", "Boda & Catering Propio", langOrIsEn),
    rating: 5,
    comment: tr("The floral decor, the gala tent dinner, and the in-house culinary service thoroughly delighted our 220 guests.", "La decoración, la recepción bajo carpa y el catering propio dejaron encantados a nuestros 220 invitados.", langOrIsEn),
    avatarUrl: '/images/avatars/valeria-mateo.jpg',
  },
];

export const getCorporatePackages = (langOrIsEn?: SupportedLanguage | boolean): ServicePackage[] => [
  {
    id: 'pkg-corp-findeanio',
    category: 'corporativo',
    title: tr("Year-End Galas & Large-Format Celebrations", "Fiestas de Fin de Año & Celebraciones de Gran Formato", langOrIsEn),
    subtitle: tr("Structural tents, gardens, catering, stage, and dance floor.", "Carpas, jardines, catering, tarima y pista de baile.", langOrIsEn),
    priceLabel: tr("From", "Desde", langOrIsEn),
    priceValue: 45,
    unit: tr("per guest", "por participante", langOrIsEn),
    capacity: tr("80 to 350+ guests", "80 a 350+ participantes", langOrIsEn),
    setupInfo: tr("Tents + Gardens + Stage + Dance Floor + Catering", "Carpas + Jardines + Tarima + Pista de Baile + Catering", langOrIsEn),
    description: tr("Major corporate events and year-end galas featuring modular structural tents, professional stage, lacquer dance floor, banquet or gourmet BBQ, and on-site lodging.", "Macroeventos empresariales y fiestas de fin de año con montaje de carpas, tarima profesional, pista de baile, banquete o parrillada y hospedaje complementario.", langOrIsEn),
    inclusions: trList([
          'Structural tents, illuminated gardens, stage, and dance floor',
          'In-house corporate catering: gala dinner, buffet, or country BBQ',
          'Complementary heated pool, sports facilities, and coach bus parking',
          'On-site lodging option across 14 rooms (28 to 80 guests)',
        ], [
          'Carpas estructurales, jardines iluminados, tarima y pista de baile',
          'Catering corporativo propio: menú de gala, buffet o parrillada campestre',
          'Complemento de piscina temperada, actividades deportivas y parqueaderos para buses',
          'Opción de hospedaje complementario en nuestras 14 habitaciones (28 a 80 pax)',
        ], langOrIsEn),
    highlightBadge: tr("Year-End & Major Events", "Fin de Año & Macroeventos", langOrIsEn),
    image: '/images/hacienda/boda-carpa-gala.jpg',
    whatsappIntent: tr("Corporate Year-End / Major Event", "Evento Corporativo de Fin de Año / Gran Formato", langOrIsEn),
    featuredInHome: false,
  },
  {
    id: 'pkg-corp-teambuilding',
    category: 'corporativo',
    title: tr("Team Building, Sports & Heated Pool", "Integración Empresarial, Deportes & Piscina", langOrIsEn),
    subtitle: tr("Sports courts, 14×6m heated pool, gardens, and catering.", "Actividades deportivas, piscina 14×6m, jardines y catering.", langOrIsEn),
    priceLabel: tr("From", "Desde", langOrIsEn),
    priceValue: 40,
    unit: tr("per guest", "por participante", langOrIsEn),
    capacity: tr("Up to 350 guests", "Hasta 350 participantes", langOrIsEn),
    setupInfo: tr("Gardens + Sports Courts + Pool + Catering", "Jardines + Canchas Deportivas + Piscina + Catering", langOrIsEn),
    description: tr("Corporate team building sessions empowered with regulation sports courts, heated pool, in-house dining, and on-site lodging.", "Jornadas de integración corporativa y team building fortalecidas con nuestras canchas deportivas, piscina temperada, restaurante propio y hospedaje complementario.", langOrIsEn),
    inclusions: trList([
          'Exclusive use of 5,000 m² gardens and sports courts (soccer, volleyball, basketball)',
          'In-house dining: breakfast, integration BBQ, and coffee breaks',
          'Access to 14×6m heated pool, 2 whirlpool hot tubs, sauna, and steam room',
          'Private parking for coach buses and optional on-site lodging',
        ], [
          'Uso exclusivo de jardines (5.000 m²) y canchas deportivas (fútbol, vóley, básquet)',
          'Catering y restaurante: desayuno, parrillada de integración y coffee breaks',
          'Acceso a piscina temperada (14×6m), 2 hidromasajes, sauna y turco como complemento',
          'Parqueaderos privados para autobuses y hospedaje complementario opcional',
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
    subtitle: tr("Strategic sessions, plenaries, and celebration with on-site lodging for teams and executives.", "Sesiones estratégicas, plenarias y celebración con alojamiento in situ para equipos y directivos.", langOrIsEn),
    priceLabel: tr("From", "Desde", langOrIsEn),
    priceValue: 88,
    unit: tr("per guest / night", "por persona / noche", langOrIsEn),
    capacity: tr("28 to 80 lodged guests (up to 250 in plenary)", "28 a 80 participantes alojados (hasta 250 en plenaria)", langOrIsEn),
    setupInfo: tr("Halls + Stage & AV + 3-Course Catering + Pool + 14 Rooms", "Salones + Tarima & AV + Catering 3 Tiempos + Piscina + 14 Habitaciones", langOrIsEn),
    description: tr("Combine conventions, workshops, or executive summits with on-site lodging in our 14 rooms, fiber-optic Wi-Fi, full-board dining, and recreational grounds.", "Combina convenciones, talleres o celebraciones empresariales con hospedaje complementario en nuestras 14 habitaciones, internet por fibra óptica, alimentación completa y áreas recreativas.", langOrIsEn),
    inclusions: trList([
          'Halls equipped with giant screen, pro audio, stage, and fiber-optic Wi-Fi',
          'On-site lodging in 14 rooms for executives, speakers, and delegations',
          'Three daily meals at our restaurant and continuous coffee breaks',
          'Complimentary access to 14×6m pool, 2 whirlpools, sauna, steam room, and parking',
        ], [
          'Salones equipados con pantalla gigante, sonido profesional, tarima e internet fibra óptica',
          'Hospedaje complementario en 14 habitaciones para directivos, ponentes o equipos',
          'Tres comidas diarias en nuestro restaurante y coffee breaks continuos',
          'Acceso complementario a piscina 14×6m, 2 hidromasajes, sauna, turco y parqueadero privado',
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
    description: tr("Outdoor lawn ceremonies or colonial hall celebrations, full protocol, and gala reception in Quito–Píntag.", "Ceremonias al aire libre o en salón colonial, protocolo integral y recepción de gala en Quito–Píntag.", langOrIsEn),
    priceTag: tr("From $42 / guest", "Desde $42 / invitado", langOrIsEn),
    iconType: 'rings',
  },
  {
    id: 'srv-theme',
    title: tr("Gardens & Decor", "Jardines & Decoración", langOrIsEn),
    description: tr("Exclusive landscaped gardens, bespoke floral design, structural gala marquee tent, and imperial tables.", "Jardines exclusivos, decoración floral personalizada, carpa estructural de gala y mesas imperiales.", langOrIsEn),
    priceTag: tr("80 to 300 guests", "80 a 300 invitados", langOrIsEn),
    iconType: 'flower',
  },
  {
    id: 'srv-catering',
    title: tr("Catering & Restaurant", "Catering & Restaurante", langOrIsEn),
    description: tr("In-house wedding catering (welcome cocktail, 3-course gala dinner, dessert table), free corkage, and dining room.", "Catering nupcial propio (cóctel, menú de 3 tiempos, mesa de dulces), descorche libre y restaurante como complemento.", langOrIsEn),
    priceTag: tr("From $70 / guest", "Desde $70 / invitado", langOrIsEn),
    iconType: 'camera',
  },
  {
    id: 'srv-destination',
    title: tr("Guest Lodging", "Hospedaje para Invitados", langOrIsEn),
    description: tr("Accommodate 28 to 80 wedding guests in 14 private rooms, complemented by a 14×6m pool, whirlpools, and grounds.", "Aloja de 28 a 80 invitados en 14 habitaciones, fortalecido con piscina 14×6m, hidromasajes y áreas recreativas.", langOrIsEn),
    priceTag: tr("From $95 / guest", "Desde $95 / invitado", langOrIsEn),
    iconType: 'couple',
  },
  {
    id: 'srv-coordination',
    title: tr("Social Events & Gala", "Eventos Sociales & Gala", langOrIsEn),
    description: tr("Anniversaries, baptisms, and family galas with Bridal Suite and secure private on-site parking.", "Aniversarios, bautizos, graduaciones y celebraciones familiares con Suite Nupcial y parqueadero privado.", langOrIsEn),
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
  specs: { label: string; icon: string }[];
  price: string;
  unit: string;
  serviceType: 'bodas';
}

export const getWeddingPresets = (langOrIsEn?: SupportedLanguage | boolean): WeddingPresetItem[] => [
  {
    id: 'boda-clasica-integral',
    title: tr("Comprehensive Wedding & Lawn Reception", "Boda Integral & Recepción en Jardines", langOrIsEn),
    subtitle: tr("Quito–Píntag · 50 to 300 Guests", "Quito–Píntag · 50 a 300 Invitados", langOrIsEn),
    badge: tr("Popular Wedding", "Boda Popular", langOrIsEn),
    badgeClass: 'bg-[#C8A45D] text-[#0A1F17]',
    image: '/images/hacienda/boda-carpa-gala.jpg',
    specs: [
      { label: tr("50 to 300 Pax", "50 a 300 Pax", langOrIsEn), icon: 'users' },
      { label: tr("Gala Marquee Tent", "Carpa de Gala", langOrIsEn), icon: 'sparkles' },
      { label: tr("3-Course Catering", "Catering 3 Tiempos", langOrIsEn), icon: 'utensils' },
    ],
    price: '$42',
    unit: tr("/ guest", "/ invitado", langOrIsEn),
    serviceType: 'bodas',
  },
  {
    id: 'boda-destino-14-suites',
    title: tr("Wedding + Guest Lodging", "Boda + Hospedaje para Invitados", langOrIsEn),
    subtitle: tr("Quito–Píntag · 14 Rooms (28 to 80 Pax)", "Quito–Píntag · 14 Habitaciones (28 a 80 Pax)", langOrIsEn),
    badge: tr("Guest Lodging", "Hospedaje Invitados", langOrIsEn),
    badgeClass: 'bg-[#8C6D3F]/90 text-[#FAF7F2]',
    image: '/images/hacienda/bodas-exteriores.jpg',
    specs: [
      { label: tr("28 to 80 Pax", "28 a 80 Pax", langOrIsEn), icon: 'users' },
      { label: tr("14 Rooms", "14 Habitaciones", langOrIsEn), icon: 'bed' },
      { label: tr("14×6m Heated Pool", "Comp. Piscina 14×6m", langOrIsEn), icon: 'sparkles' },
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
      { label: tr("Floral Design", "Decoración Floral", langOrIsEn), icon: 'sparkles' },
    ],
    price: '$70',
    unit: tr("/ guest", "/ invitado", langOrIsEn),
    serviceType: 'bodas',
  },
  {
    id: 'ceremonia-jardin-palmeras',
    title: tr("Lawn Ceremonies & Altar", "Ceremonia en Jardines de la Hacienda", langOrIsEn),
    subtitle: tr("Quito–Píntag · Natural Arch & Styling", "Quito–Píntag · Altares & Decoración Natural", langOrIsEn),
    badge: tr("Ceremonies", "Ceremonias", langOrIsEn),
    badgeClass: 'bg-[#6B7052]/90 text-[#FAF7F2]',
    image: '/images/hacienda/boda-ceremonia-arco.jpg',
    specs: [
      { label: tr("50 to 300 Pax", "50 a 300 Pax", langOrIsEn), icon: 'users' },
      { label: tr("Arch & Styling", "Arco & Decoración", langOrIsEn), icon: 'sparkles' },
      { label: tr("Tiffany Chairs", "Sillas Tiffany", langOrIsEn), icon: 'sparkles' },
    ],
    price: '$35',
    unit: tr("/ guest", "/ invitado", langOrIsEn),
    serviceType: 'bodas',
  },
  {
    id: 'experiencia-zona-humeda',
    title: tr("Add-on: Heated Pool, Dining & Wellness", "Complemento: Piscina, Restaurante & Recreación", langOrIsEn),
    subtitle: tr("Quito–Píntag · Guest Weekend Experience", "Quito–Píntag · Fortalece la Estadía de Invitados", langOrIsEn),
    badge: tr("Wedding Add-on", "Complemento Nupcial", langOrIsEn),
    badgeClass: 'bg-[#7A6A58]/90 text-[#FAF7F2]',
    image: '/images/hacienda/area-humeda.jpg',
    specs: [
      { label: tr("14×6m Heated Pool", "Piscina 14×6m", langOrIsEn), icon: 'sparkles' },
      { label: tr("Restaurant", "Restaurante", langOrIsEn), icon: 'utensils' },
      { label: tr("Sports & Grounds", "Áreas Recreativas", langOrIsEn), icon: 'sparkles' },
    ],
    price: '$55',
    unit: tr("/ guest", "/ invitado", langOrIsEn),
    serviceType: 'bodas',
  },
  {
    id: 'recepcion-salon-colonial',
    title: tr("Hall Reception & Social Gala", "Recepción & Eventos Sociales en Salón", langOrIsEn),
    subtitle: tr("Quito–Píntag · Civil Weddings & Celebrations", "Quito–Píntag · Bodas Civiles & Celebraciones", langOrIsEn),
    badge: tr("Social Receptions", "Recepción & Sociales", langOrIsEn),
    badgeClass: 'bg-[#221D1A]/90 text-[#E2C585]',
    image: '/images/hacienda/suite-1.jpg',
    specs: [
      { label: tr("30 to 90 Pax", "30 a 90 Pax", langOrIsEn), icon: 'users' },
      { label: tr("Menu & Styling", "Decoración & Menú", langOrIsEn), icon: 'utensils' },
      { label: tr("Optional Lodging", "Hospedaje Opcional", langOrIsEn), icon: 'bed' },
    ],
    price: '$48',
    unit: tr("/ guest", "/ invitado", langOrIsEn),
    serviceType: 'bodas',
  },
];

export const getCabinsData = (langOrIsEn?: SupportedLanguage | boolean): CabinRoom[] => [
  {
    id: 'cabin-complejo-grupal',
    name: tr("Full Resort Lodging Complex (14 Rooms)", "Bloque Institucional Completo (14 Habitaciones)", langOrIsEn),
    type: tr("Group Villa", "Villa Grupal", langOrIsEn),
    capacity: tr("28 to 80 Guests (Corporate, NGOs & Delegations)", "28 a 80 Personas (Empresas, ONGs y Delegaciones)", langOrIsEn),
    maxGuests: 80,
    beds: tr("14 Rooms (Single, Double & Multi-bed Suites)", "14 Habitaciones (Individuales, Dobles y Múltiples)", langOrIsEn),
    bathrooms: 14,
    pricePerNight: 35,
    weekendNote: tr("Rates from $35 per guest/night according to headcount and length of stay (weeks or months). Includes fiber-optic Wi-Fi and parking.", "Tarifa desde $35 por persona/noche según número de personas y duración (semanas o meses). Incluye internet fibra óptica y parqueaderos.", langOrIsEn),
    description: tr("Full capacity of the resort for corporate personnel, international delegations, NGOs, volunteers, with in-house restaurant dining, fiber-optic Wi-Fi, private parking, and complimentary access to pool and sports courts.", "Capacidad total de la hacienda para personal de empresas, delegaciones, ONG, voluntarios y grupos internacionales, con alimentación en restaurante propio, internet por fibra óptica, parqueaderos privados y acceso complementario a piscina y canchas.", langOrIsEn),
    amenities: trList(['14 Rooms (28–80 Guests)', '3-Course Full Board', 'Fiber-Optic Wi-Fi', 'Bus/Fleet Parking', 'Housekeeping & Laundry'], ['14 Habitaciones (28–80 Pax)', 'Alimentación 3 Tiempos', 'Internet Fibra Óptica', 'Parqueadero Buses/Flotas', 'Lavandería & Limpieza'], langOrIsEn),
    image: '/images/hacienda/grupos-hxp.jpg',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-chalet-familiar',
    name: tr("Multi-Bed Rooms & Group Chalet (5 Pax)", "Habitaciones Múltiples & Chalet para Grupos (5 Pax)", langOrIsEn),
    type: tr("Family Chalet", "Cabaña Familiar", langOrIsEn),
    capacity: tr("Up to 5 Guests per Room", "Hasta 5 Personas por Habitación", langOrIsEn),
    maxGuests: 5,
    beds: tr("Single & Double Beds (2 Suites + 2 Five-Guest Rooms)", "Camas Individuales y Dobles (2 Suites + 2 Hab. de 5 Pax)", langOrIsEn),
    bathrooms: 2,
    pricePerNight: 165,
    weekendNote: tr("Custom volume quotes for technical brigades, volunteers, missions, and work teams.", "Cotización especial por duración para brigadas técnicas, voluntarios, misiones y equipos de trabajo.", langOrIsEn),
    description: tr("Two-story natural stone and timber lodge with panoramic terraces. Ideal for corporate technical teams, volunteers, sports delegations, or groups needing stable Wi-Fi, full board, and secure parking.", "Edificación de dos plantas en madera y piedra con terrazas panorámicas. Ideal para alojar equipos de empresas, voluntarios, delegaciones deportivas o grupos con internet estable, alimentación y parqueadero interno.", langOrIsEn),
    amenities: trList(['Capacity 5 Pax / Room', 'Fiber-Optic Wi-Fi', 'Scheduled Dining', 'Private Parking', 'Pool & Sports Courts'], ['Capacidad 5 Pax / Hab.', 'Internet Fibra Óptica', 'Alimentación Programada', 'Parqueadero Privado', 'Piscina & Canchas'], langOrIsEn),
    image: '/images/hacienda/cabana-exterior.jpg',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-suite-1',
    name: tr("Executive Suite Le Plus No. 1 (Balcony & Fiber Wi-Fi)", "Suite Ejecutiva Le Plus No. 1 (Balcón & Fibra Óptica)", langOrIsEn),
    type: tr("Master Suite", "Suite Matrimonial", langOrIsEn),
    capacity: tr("Executives, Leaders or 1 to 3 Guests", "Ejecutivos, Líderes o 1 a 3 Pax", langOrIsEn),
    maxGuests: 3,
    beds: tr("1 King/Queen Bed + 1 Additional Single", "1 Cama Matrimonial + 1 Cama Adicional", langOrIsEn),
    bathrooms: 1,
    pricePerNight: 115,
    weekendNote: tr("Preferential corporate rates for weekly or monthly stays of executives and coordinators.", "Tarifas corporativas preferenciales para estadías semanales o mensuales de directivos y coordinadores.", langOrIsEn),
    description: tr("Warm hardwood suite for corporate leaders, NGO directors, or long-stay travelers. Features en-suite bathroom, work desk with fiber Wi-Fi, TV, secure parking, and access to dining room and heated pool.", "Acogedora suite en madera noble para directivos de empresas, coordinadores de ONG o huéspedes en larga estadía. Cuenta con baño privado, escritorio/Wi-Fi por fibra óptica, TV, parqueadero y acceso a restaurante y piscina.", langOrIsEn),
    amenities: trList(['Scenic Balcony', 'Fiber-Optic Wi-Fi', 'Dining Included', 'Secure Parking', 'Spa & Heated Pool'], ['Balcón con Vista', 'Internet Fibra Óptica', 'Alimentación Incluida', 'Parqueadero Seguro', 'Zona Húmeda & Piscina'], langOrIsEn),
    image: '/images/hacienda/suite-1.jpg',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-suite-2',
    name: tr("Executive Suite Le Plus No. 2 (Corporate Comfort)", "Suite Ejecutiva Le Plus No. 2 (Confort Corporativo)", langOrIsEn),
    type: tr("Master Suite", "Suite Matrimonial", langOrIsEn),
    capacity: tr("Corporate Staff, Couple or 3 Guests", "Personal de Empresa, Pareja o 3 Pax", langOrIsEn),
    maxGuests: 3,
    beds: tr("1 King/Queen Bed + 1 Single Bed", "1 Cama King/Queen + 1 Cama Individual", langOrIsEn),
    bathrooms: 1,
    pricePerNight: 115,
    weekendNote: tr("Ideal for project supervisors, international consultants, or wedding VIP guests.", "Ideal para supervisores de proyecto, consultores internacionales o invitados de eventos.", langOrIsEn),
    description: tr("Rustic-refined architecture with exposed beam ceilings, bright picture windows, continuous hot water, fiber-optic Wi-Fi for remote work, restaurant dining, and gated parking.", "Arquitectura cálida con techos de madera vista, ventanales luminosos, agua caliente permanente, internet por fibra óptica para teletrabajo, alimentación en restaurante y estacionamiento privado.", langOrIsEn),
    amenities: trList(['1 to 3 Guests', 'Fiber-Optic Wi-Fi', 'En-Suite Bathroom', 'Gated Parking', 'Restaurant & Pool'], ['1 a 3 Huéspedes', 'Fibra Óptica Estable', 'Baño Privado', 'Parqueadero Interno', 'Restaurante & Piscina'], langOrIsEn),
    image: '/images/hacienda/suite-2.jpg',
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
