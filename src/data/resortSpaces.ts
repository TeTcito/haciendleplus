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

export const getHeroStopCards = (isEn: boolean): HeroStopCardItem[] => [
  {
    id: 'larga-estadia',
    location: isEn ? 'Quito–Píntag · Commercial Priority' : 'Quito–Píntag · Prioridad Comercial',
    title: isEn
      ? 'Corporate, delegation & NGO lodging'
      : 'Hospedaje para empresas, delegaciones y ONGs',
    subtitle: isEn
      ? '14 private rooms (28 to 80 guests), full dining, fiber Wi-Fi & parking.'
      : '14 habitaciones (28 a 80 personas), alimentación, internet fibra óptica y parqueaderos.',
    meta: isEn
      ? 'Long Stay · Quotes by headcount & duration'
      : 'Larga Estadía · Cotización por personas y duración',
    cardImage: '/images/hacienda/grupos-hxp.jpg',
    bgImage: '/images/hacienda/vista-aerea.jpg',
    route: '/hospedaje',
    serviceType: 'grupos',
  },
  {
    id: 'grandes-eventos',
    location: isEn ? '5,000 m² Lawns & Tents · Quito–Píntag' : 'Explanada 5.000 m² & Carpas · Quito–Píntag',
    title: isEn
      ? 'Major events & corporate experiences'
      : 'Grandes eventos y experiencias corporativas',
    subtitle: isEn
      ? 'Year-end, team retreats & conventions: tents, gardens, catering, stage, dance floor & pool.'
      : 'Fin de año, integración y convenciones: carpas, jardines, catering, tarima, pista de baile, canchas y piscina.',
    meta: isEn
      ? 'Macro-Events 50 to 350+ guests · Lodging'
      : 'Macroeventos de 50 a 350 pax · Hospedaje complementario',
    cardImage: '/images/hacienda/jardines-teambuilding.jpg',
    bgImage: '/images/hacienda/hero-atardecer.jpg',
    route: '/corporativo',
    serviceType: 'corporativo',
  },
  {
    id: 'bodas',
    location: isEn ? 'Gardens & Gala Reception · Quito–Píntag' : 'Jardines & Recepción de Gala · Quito–Píntag',
    title: isEn
      ? 'Weddings & social celebrations'
      : 'Bodas y celebraciones sociales',
    subtitle: isEn
      ? 'Ceremonies, reception, gardens, catering, decoration, and on-site lodging for guests.'
      : 'Ceremonias, recepción, jardines, catering, decoración y hospedaje para invitados.',
    meta: isEn
      ? 'Weddings & Social Events · Up to 300 guests'
      : 'Bodas & Eventos Sociales · Hasta 300 invitados',
    cardImage: '/images/hacienda/montaje-banquete.jpg',
    bgImage: '/images/hacienda/bodas-exteriores.jpg',
    route: '/bodas',
    serviceType: 'bodas',
  },
  {
    id: 'instalaciones',
    location: isEn ? 'Quito–Píntag · 30 min from Airport' : 'Quito–Píntag · A 30 min del Aeropuerto',
    title: isEn
      ? 'Pool, restaurant and recreational activities'
      : 'Piscina, restaurante y actividades recreativas',
    subtitle: isEn
      ? 'Value amenities strengthening your long stay or major event on private grounds.'
      : 'Complementos que fortalecen tu larga estadía o gran evento en un mismo predio privado.',
    meta: isEn
      ? '14×6m Pool, Sports Courts & In-House Dining'
      : 'Piscina 14×6m, Canchas Deportivas y Gastronomía Propia',
    cardImage: '/images/hacienda/piscina-aerea.jpg',
    bgImage: '/images/hacienda/piscina-nocturna.jpg',
    route: '/hospedaje',
    serviceType: 'hospedaje',
  },
];

/**
 * SECTION 2 CARDS BILINGUAL HELPER
 */
export const getSection2Cards = (isEn: boolean) => [
  {
    title: isEn ? 'Corporate Lodging' : 'Hospedaje Empresas',
    desc: isEn
      ? 'Long Stay Priority: 14 rooms, full dining, Wi-Fi & private parking.'
      : 'Prioridad Larga Estadía: 14 hab., alimentación, internet y parqueadero.',
    img: '/images/hacienda/grupos-hxp.jpg',
    link: '/hospedaje',
    badge: isEn ? 'Commercial Priority' : 'Prioridad Comercial',
  },
  {
    title: isEn ? 'Major Events' : 'Grandes Eventos',
    desc: isEn
      ? 'Year-end, team retreats, conventions, gala tents, lawns & stage.'
      : 'Fin de año, integración, convenciones, carpas, jardines y tarima.',
    img: '/images/hacienda/jardines-teambuilding.jpg',
    link: '/corporativo',
    badge: isEn ? 'Up to 350+ guests' : 'Hasta 350+ pax',
  },
  {
    title: isEn ? 'Weddings & Celebrations' : 'Bodas y Celebraciones',
    desc: isEn
      ? 'Ceremonies, reception, gardens, catering, decor & on-site lodging.'
      : 'Ceremonias, recepción, jardines, catering, decoración y hospedaje.',
    img: '/images/hacienda/montaje-banquete.jpg',
    link: '/bodas',
    badge: isEn ? 'Exclusive Weddings' : 'Bodas Exclusivas',
  },
  {
    title: isEn ? 'Comp.: Pool & Sports' : 'Comp.: Piscina & Canchas',
    desc: isEn
      ? '14×6m pool, whirlpools & sports facilities elevating your retreat.'
      : 'Piscina 14×6m, hidromasajes y deportes que fortalecen tu evento.',
    img: '/images/hacienda/piscina-aerea.jpg',
    link: '/corporativo',
    badge: isEn ? 'Complementary' : 'Complementario',
  },
  {
    title: isEn ? 'Comp.: Restaurant' : 'Comp.: Restaurante',
    desc: isEn
      ? '3-course meals, BBQ & dedicated in-house catering at resort.'
      : 'Alimentación 3 tiempos, parrilladas y catering propio en hacienda.',
    img: '/images/hacienda/gastronomia-2.jpg',
    link: '/hospedaje',
    badge: isEn ? 'In-House Catering' : 'Catering Propio',
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

export const getPortfolioServices = (isEn: boolean): PortfolioServiceItem[] => [
  {
    id: 'srv-larga-estadia',
    overline: isEn
      ? 'COMMERCIAL PRIORITY · LONG STAYS IN QUITO–PÍNTAG'
      : 'PRIORIDAD COMERCIAL · LARGA ESTADÍA EN QUITO–PÍNTAG',
    title: isEn
      ? 'Corporate & Group Lodging (Long Stay)'
      : 'Hospedaje para Empresas y Grupos (Larga Estadía)',
    description: isEn
      ? 'Strategic on-site accommodation for corporate personnel, delegations, NGOs (IMC · HXP), volunteers, and international groups. Configurable rooms, full board, fiber-optic internet, parking, and custom quotes based on team size and stay duration.'
      : 'Alojamiento estratégico para personal de empresas, delegaciones, ONG (IMC · HXP), voluntarios y grupos internacionales. Habitaciones configurables, alimentación diaria, internet fibra óptica, parqueaderos y cotización según número de personas y duración.',
    inclusions: isEn
      ? [
          '14 configurable rooms (28 to 80 guests) with daily housekeeping and laundry',
          'Full board in on-site restaurant, high-speed fiber Wi-Fi, and private parking',
          'Flexible tailored pricing based on headcount and stay length (days, weeks, or months)',
        ]
      : [
          '14 habitaciones configurables (28 a 80 personas) con limpieza y lavandería',
          'Alimentación completa en restaurante, internet fibra óptica y parqueaderos privados',
          'Cotización flexible por número de personas y duración (días, semanas o meses)',
        ],
    priceText: isEn ? 'From $35 / person / night' : 'Desde $35 / persona / noche',
    capacityText: isEn ? '28 to 80 guests · 14 rooms' : '28 a 80 personas · 14 habitaciones',
    image: '/images/hacienda/grupos-hxp.jpg',
    imageCaption: isEn
      ? 'COMMERCIAL PRIORITY · LONG STAYS FOR COMPANIES & GROUPS'
      : 'PRIORIDAD COMERCIAL · LARGA ESTADÍA PARA EMPRESAS Y GRUPOS',
    selectorTitle: isEn
      ? '1. Corporate & Group Lodging (Long Stay)'
      : '1. Hospedaje Empresas y Grupos (Larga Estadía)',
    selectorDesc: isEn
      ? 'Corporate staff, delegations, NGOs, and international groups.'
      : 'Personal de empresas, delegaciones, ONGs y grupos internacionales.',
    circleBg: '#113B4F',
    route: '/hospedaje',
    serviceType: 'grupos',
    Icon: HeartHandshake,
  },
  {
    id: 'srv-grandes-eventos',
    overline: isEn
      ? 'COMMERCIAL PRIORITY · MACRO-EVENTS & CORPORATE'
      : 'PRIORIDAD COMERCIAL · MACROEVENTOS Y EMPRESAS',
    title: isEn
      ? 'Major Events & Corporate Experiences'
      : 'Grandes Eventos y Experiencias Corporativas',
    description: isEn
      ? 'Year-end galas, team building retreats, conventions, and large-format corporate gatherings in Quito–Píntag. Features structural tents, 5,000 m² lawns, in-house catering, stage, dance floor, sports courts, pool, and complementary lodging.'
      : 'Eventos de fin de año, integración, convenciones y celebraciones de gran formato en Quito–Píntag. Incluye carpas, 5.000 m² de jardines, catering, tarima, pista de baile, actividades deportivas, piscina y hospedaje complementario.',
    inclusions: isEn
      ? [
          'Structural gala tents, indoor halls, stage, professional sound, and dance floor',
          '5,000 m² lawns, regulation sports courts (soccer, volley, basketball) & catering',
          'Covered heated 14×6m pool and 14 rooms for complementary overnight lodging',
        ]
      : [
          'Carpas estructurales, salones, tarima, sonido profesional y pista de baile',
          '5.000 m² de jardines, canchas deportivas (fútbol, vóley, básquet) y catering propio',
          'Piscina temperada 14×6m y 14 habitaciones de hospedaje complementario',
        ],
    priceText: isEn ? 'From $45 / participant' : 'Desde $45 / participante',
    capacityText: isEn ? '50 to 350 participants' : '50 a 350 participantes',
    image: '/images/hacienda/jardines-teambuilding.jpg',
    imageCaption: isEn
      ? 'MACRO-EVENTS, YEAR-END GALAS, INTEGRATION & CONVENTIONS'
      : 'MACROEVENTOS, FIN DE AÑO, INTEGRACIÓN Y CONVENCIONES',
    selectorTitle: isEn
      ? '2. Major Events & Corporate'
      : '2. Grandes Eventos y Corporativo',
    selectorDesc: isEn
      ? 'Year-end, team retreats, conventions, tents, stage, and dance floor.'
      : 'Fin de año, integración, convenciones, carpas, tarima y pista de baile.',
    circleBg: '#1B3B2B',
    route: '/corporativo',
    serviceType: 'corporativo',
    Icon: Building2,
  },
  {
    id: 'srv-bodas',
    overline: isEn
      ? 'UNFORGETTABLE MEMORIES · GALA CELEBRATIONS'
      : 'EXPERIENCIAS INOLVIDABLES · CELEBRACIONES DE GALA',
    title: isEn
      ? 'Weddings & Celebrations in Quito–Píntag'
      : 'Bodas y Celebraciones en Quito–Píntag',
    description: isEn
      ? 'Country-style weddings and dream receptions surrounded by Andean nature. Open-air ceremony, gala tent or colonial hall reception, gourmet catering, custom decor, and on-site lodging for newlyweds and guests.'
      : 'Bodas campestres y recepciones de ensueño rodeadas de naturaleza andina. Ceremonia al aire libre, banquete en carpa de gala o salón colonial, catering propio, decoración personalizada y hospedaje para novios e invitados.',
    inclusions: isEn
      ? [
          'Open-air garden ceremony with floral arch and Tiffany seating',
          'Gala reception under imperial tent with dance floor and mood lighting',
          '3-course gourmet dinner, open bar, and complimentary bridal suite',
        ]
      : [
          'Ceremonia al aire libre en jardines con arco floral y sillas Tiffany',
          'Recepción de gala bajo carpa imperial con pista de baile e iluminación',
          'Catering de 3 tiempos, barra libre y suite nupcial de cortesía',
        ],
    priceText: isEn ? 'From $42 / guest' : 'Desde $42 / invitado',
    capacityText: isEn ? '50 to 300 guests' : '50 a 300 personas · Jardines y Salones',
    image: '/images/hacienda/montaje-banquete.jpg',
    imageCaption: isEn
      ? 'WEDDINGS, SOCIAL CELEBRATIONS & GALA RECEPTIONS'
      : 'BODAS, CELEBRACIONES SOCIALES Y RECEPCIONES DE GALA',
    selectorTitle: isEn
      ? '3. Weddings & Celebrations'
      : '3. Bodas y Celebraciones',
    selectorDesc: isEn
      ? 'Open-air ceremony, gala tent banquet, and on-site lodging.'
      : 'Ceremonia al aire libre, banquete en carpa de gala y hospedaje.',
    circleBg: '#3F2212',
    route: '/bodas',
    serviceType: 'bodas',
    Icon: Heart,
  },
  {
    id: 'srv-comp-gastronomia',
    overline: isEn ? 'ON-SITE GASTRONOMIC AMENITY' : 'COMPLEMENTO GASTRONÓMICO IN SITU',
    title: isEn
      ? 'Complement: On-Site Restaurant & Catering'
      : 'Complemento: Restaurante y Catering Propio',
    description: isEn
      ? 'Professional on-site kitchen serving 3 balanced chef-prepared daily meals for long-stay groups, country BBQs, continuous coffee breaks, and gala banquets for weddings and events.'
      : 'Cocina profesional en la hacienda que ofrece 3 comidas diarias balanceadas para largas estadías, parrilladas campestres, coffee breaks continuos y banquetes de gala para bodas y eventos.',
    inclusions: isEn
      ? [
          'American breakfast, executive lunches, and dinners for resident groups',
          'Charcoal barbecue, international buffets, and plated gala menus',
          'Continuous coffee breaks with premium Andean coffee and artisanal snacks',
        ]
      : [
          'Desayunos americanos, almuerzos ejecutivos y cenas para grupos alojados',
          'Parrilladas al carbón, buffets internacionales y menús de gala emplatados',
          'Coffee breaks continuos con café andino, bocaditos dulces y salados',
        ],
    priceText: isEn ? 'On-Site Dining Amenity' : 'Complemento Gastronómico In Situ',
    capacityText: isEn ? 'For Long Stays, Macro-Events & Weddings' : 'Para Larga Estadía, Macroeventos y Bodas',
    image: '/images/hacienda/gastronomia-parrillada.jpg',
    imageCaption: isEn ? 'RESTAURANT & CATERING AS AN ESSENTIAL AMENITY' : 'RESTAURANTE Y CATERING COMO COMPLEMENTO INTEGRAL',
    selectorTitle: isEn ? 'Complement: Dining & Catering' : 'Complemento: Restaurante y Catering',
    selectorDesc: isEn
      ? 'Meal plans for long stays, barbecues, and celebration banquets.'
      : 'Alimentación para largas estadías, parrilladas y banquetes de eventos.',
    circleBg: '#7A4928',
    route: '/hospedaje',
    serviceType: 'grupos',
    Icon: Utensils,
  },
  {
    id: 'srv-comp-piscina',
    overline: isEn ? 'WELLNESS & RECREATIONAL AMENITY' : 'COMPLEMENTO RECREATIVO Y DE BIENESTAR',
    title: isEn
      ? 'Complement: 14×6m Heated Pool & Wellness Spa'
      : 'Complemento: Piscina Temperada 14×6m y Zona Húmeda',
    description: isEn
      ? 'The covered heated 14×6m pool, two whirlpools, sauna, and steam room serve as the ideal retreat for long-stay personnel, corporate retreats, and wedding guests.'
      : 'La piscina cubierta de 14×6 metros, los dos hidromasajes, el sauna y el baño turco se integran como el complemento ideal para el descanso del personal en larga estadía, jornadas corporativas y huéspedes de bodas.',
    inclusions: isEn
      ? [
          'Heated 14×6 meter swimming pool under climate-controlled glass enclosure',
          'Two hot tubs, Finnish sauna, and eucalyptus steam room for relaxation',
          'Exclusive value-add for resident teams and corporate gathering attendees',
        ]
      : [
          'Piscina temperada de 14×6 metros bajo cubierta climatizada',
          'Dos hidromasajes, sauna finlandés y baño turco para recuperación y bienestar',
          'Valor agregado exclusivo para grupos alojados y eventos empresariales',
        ],
    priceText: isEn ? 'Amenity Included in Stays & Events' : 'Complemento Incluido en Estadías y Eventos',
    capacityText: isEn ? '14×6m Pool + 2 Hot Tubs + Sauna & Steam Room' : 'Piscina 14×6m + 2 Hidromasajes + Sauna & Turco',
    image: '/images/hacienda/piscina-aerea.jpg',
    imageCaption: isEn ? 'HEATED POOL & WELLNESS SPA AS VALUE AMENITIES' : 'PISCINA Y ZONA HÚMEDA COMO COMPLEMENTO DE VALOR',
    selectorTitle: isEn ? 'Complement: Pool & Wellness Spa' : 'Complemento: Piscina y Zona Húmeda',
    selectorDesc: isEn
      ? '14×6m pool, 2 hot tubs, sauna, and steam room for your groups.'
      : 'Piscina 14×6m, 2 hidromasajes, sauna y turco para tus grupos y eventos.',
    circleBg: '#9E7329',
    route: '/corporativo',
    serviceType: 'corporativo',
    Icon: Waves,
  },
  {
    id: 'srv-comp-recreacion',
    overline: isEn ? 'TEAM BUILDING & SPORTS AMENITY' : 'COMPLEMENTO DEPORTIVO Y DE INTEGRACIÓN',
    title: isEn
      ? 'Complement: Sports Courts, Lawns & Recreation'
      : 'Complemento: Actividades Deportivas, Canchas y Recreación',
    description: isEn
      ? 'Strengthen team cohesion for your company, delegation, or year-end retreat across 5,000 m² of lawns, regulation sports courts, and game lounge right on property.'
      : 'Fortalece la convivencia de tu empresa, delegación o evento de fin de año con 5.000 m² de jardines, canchas deportivas reglamentarias y salón de juegos sin salir de la propiedad.',
    inclusions: isEn
      ? [
          'Soccer, volleyball, and basketball courts for corporate sports tournaments',
          'Social lounge with billiards, table tennis, karaoke, and fire pit areas',
          '5,000 m² of private lawns for team-building challenges and relaxation',
        ]
      : [
          'Canchas de fútbol, vóley y básquet para torneos corporativos y recreación',
          'Salón social con billar, ping-pong, karaoke y áreas de fogata/convivencia',
          '5.000 m² de jardines privados para gincanas, team building y descanso',
        ],
    priceText: isEn ? 'Sports & Recreational Amenity' : 'Complemento Deportivo & Recreativo',
    capacityText: isEn ? '5,000 m² Lawns & Regulation Courts' : '5.000 m² de Jardines y Canchas Deportivas',
    image: '/images/hacienda/reunion-corporativa.jpg',
    imageCaption: isEn ? 'SPORTS COURTS & TEAM ACTIVITIES ELEVATING RETREATS' : 'CANCHAS Y RECREACIÓN QUE FORTALECEN TU EXPERIENCIA',
    selectorTitle: isEn ? 'Complement: Recreational Activities' : 'Complemento: Actividades Recreativas',
    selectorDesc: isEn
      ? 'Soccer, volleyball, basketball, billiards, karaoke, and green lawns.'
      : 'Canchas de fútbol, vóley, básquet, billar, karaoke y áreas verdes.',
    circleBg: '#2E5239',
    route: '/corporativo',
    serviceType: 'corporativo',
    Icon: ShieldCheck,
  },
  {
    id: 'srv-ubicacion-logistica',
    overline: isEn ? 'STRATEGIC VENUE IN QUITO–PÍNTAG' : 'UBICACIÓN ESTRATÉGICA EN QUITO–PÍNTAG',
    title: isEn
      ? 'Facilities, Fiber-Optic Internet & Private Parking'
      : 'Instalaciones, Internet Fibra Óptica y Parqueaderos Privados',
    description: isEn
      ? 'Located in Quito–Píntag (San Juan de la Tola, Calle Deus No. 100), 40 min from Quito and 30 min from Mariscal Sucre Airport. Features high-speed fiber internet, expansive secure parking for coach buses and cars.'
      : 'Ubicada en Quito–Píntag (Barrio San Juan de la Tola, Calle Deus N.º 100), a 40 min de Quito y 30 min del Aeropuerto Mariscal Sucre. Cuenta con internet por fibra óptica, amplios parqueaderos internos y flota de buses.',
    inclusions: isEn
      ? [
          'Strategic location 30 minutes from Mariscal Sucre International Airport',
          'Symmetrical fiber-optic Wi-Fi coverage across meeting halls and rooms',
          'Spacious secure gated parking with capacity for tourist buses and cars',
        ]
      : [
          'Ubicación estratégica a 30 minutos del Aeropuerto Mariscal Sucre',
          'Internet Wi-Fi por fibra óptica simétrica en salones y habitaciones',
          'Parqueadero interno privado vigilado con capacidad para buses y vehículos',
        ],
    priceText: isEn ? 'Prime Location & Logistics' : 'Ubicación & Logística Privilegiada',
    capacityText: isEn ? '30 min from Airport · Bus Parking' : 'A 30 min del Aeropuerto · Parqueadero Buses',
    image: '/images/hacienda/hero-vista-aerea-clean-derecha.jpg',
    imageCaption: isEn ? 'STRATEGIC POSITION & RELIABLE LOGISTICS IN PÍNTAG' : 'UBICACIÓN Y LOGÍSTICA PRIVILEGIADA EN PÍNTAG',
    selectorTitle: isEn ? 'Quito–Píntag Venue & Parking' : 'Ubicación Quito–Píntag & Parqueaderos',
    selectorDesc: isEn
      ? '40 min from Quito, 30 min from Airport, fiber Wi-Fi and parking.'
      : 'A 40 min de Quito y 30 min del Aeropuerto, fibra óptica y parqueaderos.',
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

export const getClientReviews = (isEn: boolean): ClientReviewItem[] => [
  {
    id: 'rev-1',
    author: 'Misión HXP · ONG',
    role: isEn ? 'Long Stay · NGO Delegation' : 'Larga Estadía · Delegación',
    rating: 5,
    comment: isEn
      ? 'Privacy, reliable fiber-optic Wi-Fi, and 3 flawless daily meals for our 75 international volunteers across several weeks.'
      : 'Privacidad, internet fibra óptica y 3 comidas diarias impecables para nuestros 75 voluntarios durante varias semanas.',
    avatarUrl: '/images/avatars/mision-hxp.jpg',
  },
  {
    id: 'rev-2',
    author: 'IMC Cooperación',
    role: isEn ? 'Corporate & Group Lodging' : 'Hospedaje Empresas y Grupos',
    rating: 5,
    comment: isEn
      ? 'Strategic venue in Quito–Píntag 30 min from airport, generous coach parking, peaceful rooms, and attentive staff.'
      : 'Ubicación estratégica en Quito–Píntag a 30 min del aeropuerto, amplios parqueaderos, habitaciones cómodas y atención directa.',
    avatarUrl: '/images/avatars/imc-cooperacion.jpg',
  },
  {
    id: 'rev-3',
    author: 'GAD de Pichincha',
    role: isEn ? 'Major Corporate Conventions' : 'Grandes Eventos Corporativos',
    rating: 5,
    comment: isEn
      ? 'Gala tents, manicured lawns, stage, sports fields, heated pool, and generous punctual catering for our annual summit.'
      : 'Carpas, jardines, tarima, canchas deportivas, piscina y un catering puntual y abundante para nuestra jornada de integración.',
    avatarUrl: '/images/avatars/gad-pichincha.jpg',
  },
  {
    id: 'rev-4',
    author: 'Dir. Banco & Finanzas',
    role: isEn ? 'Year-End Gala & Retreat' : 'Fin de Año & Convención',
    rating: 5,
    comment: isEn
      ? 'A single provider for our grand gala, illuminated dance floor, BBQ banquet, and complementary rooms. Made planning effortless.'
      : 'Un solo proveedor para nuestro gran evento, pista de baile, parrillada y hospedaje complementario. Facilitó todo el presupuesto.',
    avatarUrl: '/images/avatars/banco-finanzas.jpg',
  },
  {
    id: 'rev-5',
    author: 'Sofía & Sebastián',
    role: isEn ? 'Weddings & Celebrations' : 'Bodas y Celebraciones',
    rating: 5,
    comment: isEn
      ? 'We held our ceremony and reception in the gardens and accommodated all our out-of-town guests in the 14 on-site rooms.'
      : 'Celebramos nuestra ceremonia y recepción en los jardines y alojamos a los invitados que vinieron de fuera en las 14 habitaciones.',
    avatarUrl: '/images/avatars/sofia-sebastian.jpg',
  },
  {
    id: 'rev-6',
    author: 'Dr. Carlos Mendoza',
    role: isEn ? 'Executive Retreat' : 'Encuentro Empresarial',
    rating: 5,
    comment: isEn
      ? 'First-class facilities in Quito–Píntag, well-equipped conference halls, and the heated pool and dining room were standout features.'
      : 'Instalaciones de primer nivel en Quito–Píntag, salones equipados y piscina y restaurante como complementos extraordinarios.',
    avatarUrl: '/images/avatars/dr-carlos.jpg',
  },
  {
    id: 'rev-7',
    author: 'Valeria & Mateo',
    role: isEn ? 'Wedding & Gourmet Catering' : 'Boda & Catering Propio',
    rating: 5,
    comment: isEn
      ? 'The floral decor, the gala tent dinner, and the in-house culinary service thoroughly delighted our 220 guests.'
      : 'La decoración, la recepción bajo carpa y el catering propio dejaron encantados a nuestros 220 invitados.',
    avatarUrl: '/images/avatars/valeria-mateo.jpg',
  },
];

export const getCorporatePackages = (isEn: boolean): ServicePackage[] => [
  {
    id: 'pkg-corp-findeanio',
    category: 'corporativo',
    title: isEn
      ? 'Year-End Galas & Large-Format Celebrations'
      : 'Fiestas de Fin de Año & Celebraciones de Gran Formato',
    subtitle: isEn
      ? 'Structural tents, gardens, catering, stage, and dance floor.'
      : 'Carpas, jardines, catering, tarima y pista de baile.',
    priceLabel: isEn ? 'From' : 'Desde',
    priceValue: 45,
    unit: isEn ? 'per guest' : 'por participante',
    capacity: isEn ? '80 to 350+ guests' : '80 a 350+ participantes',
    setupInfo: isEn
      ? 'Tents + Gardens + Stage + Dance Floor + Catering'
      : 'Carpas + Jardines + Tarima + Pista de Baile + Catering',
    description: isEn
      ? 'Major corporate events and year-end galas featuring modular structural tents, professional stage, lacquer dance floor, banquet or gourmet BBQ, and on-site lodging.'
      : 'Macroeventos empresariales y fiestas de fin de año con montaje de carpas, tarima profesional, pista de baile, banquete o parrillada y hospedaje complementario.',
    inclusions: isEn
      ? [
          'Structural tents, illuminated gardens, stage, and dance floor',
          'In-house corporate catering: gala dinner, buffet, or country BBQ',
          'Complementary heated pool, sports facilities, and coach bus parking',
          'On-site lodging option across 14 rooms (28 to 80 guests)',
        ]
      : [
          'Carpas estructurales, jardines iluminados, tarima y pista de baile',
          'Catering corporativo propio: menú de gala, buffet o parrillada campestre',
          'Complemento de piscina temperada, actividades deportivas y parqueaderos para buses',
          'Opción de hospedaje complementario en nuestras 14 habitaciones (28 a 80 pax)',
        ],
    highlightBadge: isEn ? 'Year-End & Major Events' : 'Fin de Año & Macroeventos',
    image: '/images/hacienda/boda-carpa-gala.jpg',
    whatsappIntent: isEn
      ? 'Corporate Year-End / Major Event'
      : 'Evento Corporativo de Fin de Año / Gran Formato',
    featuredInHome: false,
  },
  {
    id: 'pkg-corp-teambuilding',
    category: 'corporativo',
    title: isEn
      ? 'Team Building, Sports & Heated Pool'
      : 'Integración Empresarial, Deportes & Piscina',
    subtitle: isEn
      ? 'Sports courts, 14×6m heated pool, gardens, and catering.'
      : 'Actividades deportivas, piscina 14×6m, jardines y catering.',
    priceLabel: isEn ? 'From' : 'Desde',
    priceValue: 40,
    unit: isEn ? 'per guest' : 'por participante',
    capacity: isEn ? 'Up to 350 guests' : 'Hasta 350 participantes',
    setupInfo: isEn
      ? 'Gardens + Sports Courts + Pool + Catering'
      : 'Jardines + Canchas Deportivas + Piscina + Catering',
    description: isEn
      ? 'Corporate team building sessions empowered with regulation sports courts, heated pool, in-house dining, and on-site lodging.'
      : 'Jornadas de integración corporativa y team building fortalecidas con nuestras canchas deportivas, piscina temperada, restaurante propio y hospedaje complementario.',
    inclusions: isEn
      ? [
          'Exclusive use of 5,000 m² gardens and sports courts (soccer, volleyball, basketball)',
          'In-house dining: breakfast, integration BBQ, and coffee breaks',
          'Access to 14×6m heated pool, 2 whirlpool hot tubs, sauna, and steam room',
          'Private parking for coach buses and optional on-site lodging',
        ]
      : [
          'Uso exclusivo de jardines (5.000 m²) y canchas deportivas (fútbol, vóley, básquet)',
          'Catering y restaurante: desayuno, parrillada de integración y coffee breaks',
          'Acceso a piscina temperada (14×6m), 2 hidromasajes, sauna y turco como complemento',
          'Parqueaderos privados para autobuses y hospedaje complementario opcional',
        ],
    highlightBadge: isEn ? 'Team Building & Sports' : 'Integración & Deportes',
    image: '/images/hacienda/jardines-teambuilding.jpg',
    whatsappIntent: isEn
      ? 'Team Building and Sports Day'
      : 'Jornada de Integración y Deportes',
    featuredInHome: false,
  },
  {
    id: 'pkg-corp-retiro',
    category: 'corporativo',
    title: isEn
      ? 'Conventions & Corporate Retreats with On-Site Lodging'
      : 'Convenciones y Encuentros Empresariales con Hospedaje Complementario',
    subtitle: isEn
      ? 'Strategic sessions, plenaries, and celebration with on-site lodging for teams and executives.'
      : 'Sesiones estratégicas, plenarias y celebración con alojamiento in situ para equipos y directivos.',
    priceLabel: isEn ? 'From' : 'Desde',
    priceValue: 88,
    unit: isEn ? 'per guest / night' : 'por persona / noche',
    capacity: isEn ? '28 to 80 lodged guests (up to 250 in plenary)' : '28 a 80 participantes alojados (hasta 250 en plenaria)',
    setupInfo: isEn
      ? 'Halls + Stage & AV + 3-Course Catering + Pool + 14 Rooms'
      : 'Salones + Tarima & AV + Catering 3 Tiempos + Piscina + 14 Habitaciones',
    description: isEn
      ? 'Combine conventions, workshops, or executive summits with on-site lodging in our 14 rooms, fiber-optic Wi-Fi, full-board dining, and recreational grounds.'
      : 'Combina convenciones, talleres o celebraciones empresariales con hospedaje complementario en nuestras 14 habitaciones, internet por fibra óptica, alimentación completa y áreas recreativas.',
    inclusions: isEn
      ? [
          'Halls equipped with giant screen, pro audio, stage, and fiber-optic Wi-Fi',
          'On-site lodging in 14 rooms for executives, speakers, and delegations',
          'Three daily meals at our restaurant and continuous coffee breaks',
          'Complimentary access to 14×6m pool, 2 whirlpools, sauna, steam room, and parking',
        ]
      : [
          'Salones equipados con pantalla gigante, sonido profesional, tarima e internet fibra óptica',
          'Hospedaje complementario en 14 habitaciones para directivos, ponentes o equipos',
          'Tres comidas diarias en nuestro restaurante y coffee breaks continuos',
          'Acceso complementario a piscina 14×6m, 2 hidromasajes, sauna, turco y parqueadero privado',
        ],
    highlightBadge: isEn ? 'Convention + Lodging' : 'Convención + Hospedaje',
    image: '/images/hacienda/reunion-corporativa.jpg',
    whatsappIntent: isEn
      ? 'Convention and Corporate Retreat'
      : 'Convención y Retiro Corporativo',
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

export const getWeddingServices = (isEn: boolean): WeddingServiceCardItem[] => [
  {
    id: 'srv-planning',
    title: isEn ? 'Ceremonies & Reception' : 'Ceremonias & Recepción',
    description: isEn
      ? 'Outdoor lawn ceremonies or colonial hall celebrations, full protocol, and gala reception in Quito–Píntag.'
      : 'Ceremonias al aire libre o en salón colonial, protocolo integral y recepción de gala en Quito–Píntag.',
    priceTag: isEn ? 'From $42 / guest' : 'Desde $42 / invitado',
    iconType: 'rings',
  },
  {
    id: 'srv-theme',
    title: isEn ? 'Gardens & Decor' : 'Jardines & Decoración',
    description: isEn
      ? 'Exclusive landscaped gardens, bespoke floral design, structural gala marquee tent, and imperial tables.'
      : 'Jardines exclusivos, decoración floral personalizada, carpa estructural de gala y mesas imperiales.',
    priceTag: isEn ? '80 to 300 guests' : '80 a 300 invitados',
    iconType: 'flower',
  },
  {
    id: 'srv-catering',
    title: isEn ? 'Catering & Restaurant' : 'Catering & Restaurante',
    description: isEn
      ? 'In-house wedding catering (welcome cocktail, 3-course gala dinner, dessert table), free corkage, and dining room.'
      : 'Catering nupcial propio (cóctel, menú de 3 tiempos, mesa de dulces), descorche libre y restaurante como complemento.',
    priceTag: isEn ? 'From $70 / guest' : 'Desde $70 / invitado',
    iconType: 'camera',
  },
  {
    id: 'srv-destination',
    title: isEn ? 'Guest Lodging' : 'Hospedaje para Invitados',
    description: isEn
      ? 'Accommodate 28 to 80 wedding guests in 14 private rooms, complemented by a 14×6m pool, whirlpools, and grounds.'
      : 'Aloja de 28 a 80 invitados en 14 habitaciones, fortalecido con piscina 14×6m, hidromasajes y áreas recreativas.',
    priceTag: isEn ? 'From $95 / guest' : 'Desde $95 / invitado',
    iconType: 'couple',
  },
  {
    id: 'srv-coordination',
    title: isEn ? 'Social Events & Gala' : 'Eventos Sociales & Gala',
    description: isEn
      ? 'Anniversaries, baptisms, and family galas with Bridal Suite and secure private on-site parking.'
      : 'Aniversarios, bautizos, graduaciones y celebraciones familiares con Suite Nupcial y parqueadero privado.',
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

export const getWeddingPresets = (isEn: boolean): WeddingPresetItem[] => [
  {
    id: 'boda-clasica-integral',
    title: isEn ? 'Comprehensive Wedding & Lawn Reception' : 'Boda Integral & Recepción en Jardines',
    subtitle: isEn ? 'Quito–Píntag · 50 to 300 Guests' : 'Quito–Píntag · 50 a 300 Invitados',
    badge: isEn ? 'Popular Wedding' : 'Boda Popular',
    badgeClass: 'bg-[#C8A45D] text-[#0A1F17]',
    image: '/images/hacienda/boda-carpa-gala.jpg',
    specs: [
      { label: isEn ? '50 to 300 Pax' : '50 a 300 Pax', icon: 'users' },
      { label: isEn ? 'Gala Marquee Tent' : 'Carpa de Gala', icon: 'sparkles' },
      { label: isEn ? '3-Course Catering' : 'Catering 3 Tiempos', icon: 'utensils' },
    ],
    price: '$42',
    unit: isEn ? '/ guest' : '/ invitado',
    serviceType: 'bodas',
  },
  {
    id: 'boda-destino-14-suites',
    title: isEn ? 'Wedding + Guest Lodging' : 'Boda + Hospedaje para Invitados',
    subtitle: isEn ? 'Quito–Píntag · 14 Rooms (28 to 80 Pax)' : 'Quito–Píntag · 14 Habitaciones (28 a 80 Pax)',
    badge: isEn ? 'Guest Lodging' : 'Hospedaje Invitados',
    badgeClass: 'bg-[#8C6D3F]/90 text-[#FAF7F2]',
    image: '/images/hacienda/bodas-exteriores.jpg',
    specs: [
      { label: isEn ? '28 to 80 Pax' : '28 a 80 Pax', icon: 'users' },
      { label: isEn ? '14 Rooms' : '14 Habitaciones', icon: 'bed' },
      { label: isEn ? '14×6m Heated Pool' : 'Comp. Piscina 14×6m', icon: 'sparkles' },
    ],
    price: '$95',
    unit: isEn ? '/ guest' : '/ invitado',
    serviceType: 'bodas',
  },
  {
    id: 'banquete-autor-coctel',
    title: isEn ? 'Wedding Catering & Styling' : 'Catering Nupcial & Decoración',
    subtitle: isEn ? 'Quito–Píntag · Cuisine & Tablescapes' : 'Quito–Píntag · Gastronomía & Montaje',
    badge: isEn ? 'Catering & Decor' : 'Catering & Decoración',
    badgeClass: 'bg-[#1A382B]/90 text-[#FAF7F2]',
    image: '/images/hacienda/boda-mesa-imperial.jpg',
    specs: [
      { label: isEn ? 'Free Corkage' : 'Descorche Libre', icon: 'glass' },
      { label: isEn ? 'In-House Dining' : 'Catering Propio', icon: 'utensils' },
      { label: isEn ? 'Floral Design' : 'Decoración Floral', icon: 'sparkles' },
    ],
    price: '$70',
    unit: isEn ? '/ guest' : '/ invitado',
    serviceType: 'bodas',
  },
  {
    id: 'ceremonia-jardin-palmeras',
    title: isEn ? 'Lawn Ceremonies & Altar' : 'Ceremonia en Jardines de la Hacienda',
    subtitle: isEn ? 'Quito–Píntag · Natural Arch & Styling' : 'Quito–Píntag · Altares & Decoración Natural',
    badge: isEn ? 'Ceremonies' : 'Ceremonias',
    badgeClass: 'bg-[#6B7052]/90 text-[#FAF7F2]',
    image: '/images/hacienda/boda-ceremonia-arco.jpg',
    specs: [
      { label: isEn ? '50 to 300 Pax' : '50 a 300 Pax', icon: 'users' },
      { label: isEn ? 'Arch & Styling' : 'Arco & Decoración', icon: 'sparkles' },
      { label: isEn ? 'Tiffany Chairs' : 'Sillas Tiffany', icon: 'sparkles' },
    ],
    price: '$35',
    unit: isEn ? '/ guest' : '/ invitado',
    serviceType: 'bodas',
  },
  {
    id: 'experiencia-zona-humeda',
    title: isEn ? 'Add-on: Heated Pool, Dining & Wellness' : 'Complemento: Piscina, Restaurante & Recreación',
    subtitle: isEn ? 'Quito–Píntag · Guest Weekend Experience' : 'Quito–Píntag · Fortalece la Estadía de Invitados',
    badge: isEn ? 'Wedding Add-on' : 'Complemento Nupcial',
    badgeClass: 'bg-[#7A6A58]/90 text-[#FAF7F2]',
    image: '/images/hacienda/area-humeda.jpg',
    specs: [
      { label: isEn ? '14×6m Heated Pool' : 'Piscina 14×6m', icon: 'sparkles' },
      { label: isEn ? 'Restaurant' : 'Restaurante', icon: 'utensils' },
      { label: isEn ? 'Sports & Grounds' : 'Áreas Recreativas', icon: 'sparkles' },
    ],
    price: '$55',
    unit: isEn ? '/ guest' : '/ invitado',
    serviceType: 'bodas',
  },
  {
    id: 'recepcion-salon-colonial',
    title: isEn ? 'Hall Reception & Social Gala' : 'Recepción & Eventos Sociales en Salón',
    subtitle: isEn ? 'Quito–Píntag · Civil Weddings & Celebrations' : 'Quito–Píntag · Bodas Civiles & Celebraciones',
    badge: isEn ? 'Social Receptions' : 'Recepción & Sociales',
    badgeClass: 'bg-[#221D1A]/90 text-[#E2C585]',
    image: '/images/hacienda/suite-1.jpg',
    specs: [
      { label: isEn ? '30 to 90 Pax' : '30 a 90 Pax', icon: 'users' },
      { label: isEn ? 'Menu & Styling' : 'Decoración & Menú', icon: 'utensils' },
      { label: isEn ? 'Optional Lodging' : 'Hospedaje Opcional', icon: 'bed' },
    ],
    price: '$48',
    unit: isEn ? '/ guest' : '/ invitado',
    serviceType: 'bodas',
  },
];

export const getCabinsData = (isEn: boolean): CabinRoom[] => [
  {
    id: 'cabin-complejo-grupal',
    name: isEn
      ? 'Full Resort Lodging Complex (14 Rooms)'
      : 'Bloque Institucional Completo (14 Habitaciones)',
    type: isEn ? 'Group Villa' : 'Villa Grupal',
    capacity: isEn
      ? '28 to 80 Guests (Corporate, NGOs & Delegations)'
      : '28 a 80 Personas (Empresas, ONGs y Delegaciones)',
    maxGuests: 80,
    beds: isEn
      ? '14 Rooms (Single, Double & Multi-bed Suites)'
      : '14 Habitaciones (Individuales, Dobles y Múltiples)',
    bathrooms: 14,
    pricePerNight: 35,
    weekendNote: isEn
      ? 'Rates from $35 per guest/night according to headcount and length of stay (weeks or months). Includes fiber-optic Wi-Fi and parking.'
      : 'Tarifa desde $35 por persona/noche según número de personas y duración (semanas o meses). Incluye internet fibra óptica y parqueaderos.',
    description: isEn
      ? 'Full capacity of the resort for corporate personnel, international delegations, NGOs, volunteers, with in-house restaurant dining, fiber-optic Wi-Fi, private parking, and complimentary access to pool and sports courts.'
      : 'Capacidad total de la hacienda para personal de empresas, delegaciones, ONG, voluntarios y grupos internacionales, con alimentación en restaurante propio, internet por fibra óptica, parqueaderos privados y acceso complementario a piscina y canchas.',
    amenities: isEn
      ? ['14 Rooms (28–80 Guests)', '3-Course Full Board', 'Fiber-Optic Wi-Fi', 'Bus/Fleet Parking', 'Housekeeping & Laundry']
      : ['14 Habitaciones (28–80 Pax)', 'Alimentación 3 Tiempos', 'Internet Fibra Óptica', 'Parqueadero Buses/Flotas', 'Lavandería & Limpieza'],
    image: '/images/hacienda/grupos-hxp.jpg',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-chalet-familiar',
    name: isEn
      ? 'Multi-Bed Rooms & Group Chalet (5 Pax)'
      : 'Habitaciones Múltiples & Chalet para Grupos (5 Pax)',
    type: isEn ? 'Family Chalet' : 'Cabaña Familiar',
    capacity: isEn ? 'Up to 5 Guests per Room' : 'Hasta 5 Personas por Habitación',
    maxGuests: 5,
    beds: isEn
      ? 'Single & Double Beds (2 Suites + 2 Five-Guest Rooms)'
      : 'Camas Individuales y Dobles (2 Suites + 2 Hab. de 5 Pax)',
    bathrooms: 2,
    pricePerNight: 165,
    weekendNote: isEn
      ? 'Custom volume quotes for technical brigades, volunteers, missions, and work teams.'
      : 'Cotización especial por duración para brigadas técnicas, voluntarios, misiones y equipos de trabajo.',
    description: isEn
      ? 'Two-story natural stone and timber lodge with panoramic terraces. Ideal for corporate technical teams, volunteers, sports delegations, or groups needing stable Wi-Fi, full board, and secure parking.'
      : 'Edificación de dos plantas en madera y piedra con terrazas panorámicas. Ideal para alojar equipos de empresas, voluntarios, delegaciones deportivas o grupos con internet estable, alimentación y parqueadero interno.',
    amenities: isEn
      ? ['Capacity 5 Pax / Room', 'Fiber-Optic Wi-Fi', 'Scheduled Dining', 'Private Parking', 'Pool & Sports Courts']
      : ['Capacidad 5 Pax / Hab.', 'Internet Fibra Óptica', 'Alimentación Programada', 'Parqueadero Privado', 'Piscina & Canchas'],
    image: '/images/hacienda/cabana-exterior.jpg',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-suite-1',
    name: isEn
      ? 'Executive Suite Le Plus No. 1 (Balcony & Fiber Wi-Fi)'
      : 'Suite Ejecutiva Le Plus No. 1 (Balcón & Fibra Óptica)',
    type: isEn ? 'Master Suite' : 'Suite Matrimonial',
    capacity: isEn ? 'Executives, Leaders or 1 to 3 Guests' : 'Ejecutivos, Líderes o 1 a 3 Pax',
    maxGuests: 3,
    beds: isEn ? '1 King/Queen Bed + 1 Additional Single' : '1 Cama Matrimonial + 1 Cama Adicional',
    bathrooms: 1,
    pricePerNight: 115,
    weekendNote: isEn
      ? 'Preferential corporate rates for weekly or monthly stays of executives and coordinators.'
      : 'Tarifas corporativas preferenciales para estadías semanales o mensuales de directivos y coordinadores.',
    description: isEn
      ? 'Warm hardwood suite for corporate leaders, NGO directors, or long-stay travelers. Features en-suite bathroom, work desk with fiber Wi-Fi, TV, secure parking, and access to dining room and heated pool.'
      : 'Acogedora suite en madera noble para directivos de empresas, coordinadores de ONG o huéspedes en larga estadía. Cuenta con baño privado, escritorio/Wi-Fi por fibra óptica, TV, parqueadero y acceso a restaurante y piscina.',
    amenities: isEn
      ? ['Scenic Balcony', 'Fiber-Optic Wi-Fi', 'Dining Included', 'Secure Parking', 'Spa & Heated Pool']
      : ['Balcón con Vista', 'Internet Fibra Óptica', 'Alimentación Incluida', 'Parqueadero Seguro', 'Zona Húmeda & Piscina'],
    image: '/images/hacienda/suite-1.jpg',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-suite-2',
    name: isEn
      ? 'Executive Suite Le Plus No. 2 (Corporate Comfort)'
      : 'Suite Ejecutiva Le Plus No. 2 (Confort Corporativo)',
    type: isEn ? 'Master Suite' : 'Suite Matrimonial',
    capacity: isEn ? 'Corporate Staff, Couple or 3 Guests' : 'Personal de Empresa, Pareja o 3 Pax',
    maxGuests: 3,
    beds: isEn ? '1 King/Queen Bed + 1 Single Bed' : '1 Cama King/Queen + 1 Cama Individual',
    bathrooms: 1,
    pricePerNight: 115,
    weekendNote: isEn
      ? 'Ideal for project supervisors, international consultants, or wedding VIP guests.'
      : 'Ideal para supervisores de proyecto, consultores internacionales o invitados de eventos.',
    description: isEn
      ? 'Rustic-refined architecture with exposed beam ceilings, bright picture windows, continuous hot water, fiber-optic Wi-Fi for remote work, restaurant dining, and gated parking.'
      : 'Arquitectura cálida con techos de madera vista, ventanales luminosos, agua caliente permanente, internet por fibra óptica para teletrabajo, alimentación en restaurante y estacionamiento privado.',
    amenities: isEn
      ? ['1 to 3 Guests', 'Fiber-Optic Wi-Fi', 'En-Suite Bathroom', 'Gated Parking', 'Restaurant & Pool']
      : ['1 a 3 Huéspedes', 'Fibra Óptica Estable', 'Baño Privado', 'Parqueadero Interno', 'Restaurante & Piscina'],
    image: '/images/hacienda/suite-2.jpg',
    available: true,
    featuredInHome: true,
  },
];
