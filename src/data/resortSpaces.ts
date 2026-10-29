export interface ResortSpaceItem {
  id: string;
  // Bilingual basic info
  title_es: string;
  title_en: string;
  subtitle_es: string;
  subtitle_en: string;
  badge_es: string;
  badge_en: string;
  description_es: string;
  description_en: string;

  // Media
  mediaType: 'image' | 'video';
  image: string;
  videoUrl?: string;

  // Technical Capacities (exact audited counts)
  capacities: {
    auditorium: string;
    banquet: string;
    school: string; // e.g. "140 pax" or "180 pax"
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

/**
 * Backward compatibility helpers & tables for existing page components
 */
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
