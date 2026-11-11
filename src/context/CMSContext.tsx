import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SiteConfig,
  ServicePackage,
  CabinRoom,
  LodgingFeaturedBanner,
  LodgingServiceCard,
  WeddingProposalCard,
  CorporateHighlightItem,
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
  updateLeadInSupabase,
  deleteLeadFromSupabase,
  saveSiteConfigToSupabase,
  fetchSiteConfigFromSupabase,
  saveModulesToSupabase,
  fetchModulesFromSupabase,
} from '../lib/supabase';

const STORAGE_KEY = 'hacienda_leplus_cms_v7';

const SKIP_NORMALIZATION_KEYS = new Set([
  'id',
  'image',
  'rawImage',
  'videoUrl',
  'route',
  'linkTo',
  'email',
  'phone',
]);

const LEGACY_EXT_RESTROOMS_RE =
  /\b8(?=\s+(?:(?:dedicated|independent|external\s+event)\s+)?(?:baños?\b|ext(?:ernal|ernos?)?\b))/gi;
const LEGACY_MAX_PAX_RE =
  /(?<!\$)\b65(?=\s*(?:[-–]\s*pax|\+?\s*(?:pax\b|personas?\b|hu[eé]spedes?\b|invitados?\b|participantes?\b|guests?\b|p\b|·|,|\))))/gi;
const LEGACY_PAX_RANGE_RE = /\b(45\s*[-–a]\s*|45\s+to\s+)65\b/gi;
const LEGACY_INT_BATHS_RE = /(?<!\d)\b14(?=\s+(?:internal\s+)?(?:ba[ñn]os?|baths?)\b)/gi;
const LEGACY_SINGLE_BEDS_RE = /\b59(?=\s+(?:camas\s+)?(?:indiv(?:\.|iduales)?|single(?:\s+beds?)?))/gi;
const LEGACY_TOTAL_BEDS_RE = /\b66(?=\s+(?:camas?|beds?)\b)/gi;

function normalizeLegacyString(value: string): string {
  return value
    .replace(LEGACY_EXT_RESTROOMS_RE, '20')
    .replace(LEGACY_PAX_RANGE_RE, '$181')
    .replace(LEGACY_MAX_PAX_RE, '81')
    .replace(LEGACY_INT_BATHS_RE, '18')
    .replace(LEGACY_SINGLE_BEDS_RE, '75')
    .replace(LEGACY_TOTAL_BEDS_RE, '82')
    .replace(/\b80\s+a\s+300\s+invitados\b/gi, 'Eventos hasta 1.000 personas en áreas verdes c/ carpas')
    .replace(/\b50\s+a\s+300\s+Invitados\b/g, 'Hasta 1.000 Invitados Ext.')
    .replace(/\b50\s+a\s+300\s+Pax\b/g, 'Hasta 1.000 Ext.')
    .replace(/\b(?:50|80)\s+a\s+350\+?\s*participantes\b/gi, 'Eventos hasta 1.000 personas en áreas verdes c/ carpas')
    .replace(/\bHasta\s+350\s+participantes\b/gi, 'Hasta 1.000 personas en áreas verdes c/ carpas')
    .replace(/\bHasta\s+350\+?\s*pax\b/gi, 'Hasta 1.000 pax ext.')
    .replace(/\b(?:300|350|400)\+(?=\s*(?:pax\b|personas?\b|invitados?\b|guests?\b)?)/gi, '1.000')
    .replace(/\bTarifas?\s+(?:grupales?\s+)?desde\s+\$\s*\d+(?:[.,]\d+)?(?:\s*(?:por\s+persona|\/\s*(?:persona|noche|guest|invitado))[^\n.]*)?/gi, 'Cotización personalizada según personas y duración')
    .replace(/\b(?:Desde|From)\s+\$\s*\d+(?:[.,]\d+)?[^\n.·]*/gi, '')
    .replace(/\$\s*\d+(?:[.,]\d+)?(?:\s*USD)?/gi, '')
    .replace(/\btarifa(?:s)?\s+extra(?:s)?\b/gi, 'costo adicional')
    .replace(/\btarifario\b/gi, 'propuesta')
    .replace(/\btarifa(?:s)?\b/gi, 'cotización');
}

function normalizeLegacyCMSData<T>(data: T, currentKey?: string): T {
  if (typeof data === 'string') {
    if (currentKey && SKIP_NORMALIZATION_KEYS.has(currentKey)) {
      return data;
    }
    return normalizeLegacyString(data) as unknown as T;
  }
  if (Array.isArray(data)) {
    return data.map((item) => normalizeLegacyCMSData(item)) as unknown as T;
  }
  if (data && typeof data === 'object') {
    const normalized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      if (key === 'showPrice') {
        normalized[key] = false;
      } else if (key === 'pricePerNight' || key === 'priceValue') {
        normalized[key] = 0;
      } else if (key === 'price' || key === 'priceLabel' || key === 'unit') {
        normalized[key] = '';
      } else {
        normalized[key] = normalizeLegacyCMSData(value, key);
      }
    }
    return normalized as T;
  }
  return data;
}

function ensureUpdatedCabins(cabins: CabinRoom[] | undefined, fallbackCabins: CabinRoom[]): CabinRoom[] {
  if (!cabins || cabins.length === 0) return fallbackCabins;
  const panoramicaDefault = fallbackCabins.find((c) => c.id === 'cabin-panoramica');
  const upgraded = cabins.map((cabin) => {
    const cleanCabin = {
      ...cabin,
      pricePerNight: 0,
      showPrice: false,
    };
    if (cleanCabin.id === 'cabin-complejo-grupal') {
      const next = {
        ...cleanCabin,
        maxGuests: cleanCabin.maxGuests === 65 ? 81 : cleanCabin.maxGuests,
        bathrooms: cleanCabin.bathrooms === 14 ? 18 : cleanCabin.bathrooms,
      };
      if (next.description && !next.description.includes('Panorámica')) {
        next.description = next.description.replace(
          /:\s*/,
          ': Habitación Panorámica (16 pax, 4 baños), '
        );
      }
      return next;
    }
    if (cleanCabin.id === 'cabin-panoramica') {
      return {
        ...cleanCabin,
        imagePosition: cleanCabin.imagePosition || '50% 48%',
      };
    }
    return cleanCabin;
  });

  if (panoramicaDefault && !upgraded.some((c) => c.id === 'cabin-panoramica')) {
    const insertIdx = Math.min(1, upgraded.length);
    return [
      ...upgraded.slice(0, insertIdx),
      { ...panoramicaDefault },
      ...upgraded.slice(insertIdx),
    ];
  }
  return upgraded;
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  brandName: 'Hacienda Le Plus',
  tagline: 'Hospedaje de larga estadía, grandes eventos y bodas en Quito–Píntag.',
  heroOverline: 'QUITO–PÍNTAG · LARGA ESTADÍA · GRANDES EVENTOS · BODAS',
  heroTitle: 'Más que una hacienda — tu sede para largas estadías y grandes eventos.',
  heroSubtitle:
    'Tu sede privada en Quito–Píntag diseñada para largas estadías empresariales y de delegaciones, grandes eventos corporativos y bodas campestres rodeados de naturaleza, gastronomía propia y bienestar.',
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
    priceLabel: '',
    priceValue: 0,
    unit: '',
    capacity: 'Hasta 81 personas · 18 baños internos',
    setupInfo: 'Suites & Habitaciones + Alimentación + Fibra Óptica + 80–100 Parqueaderos',
    description:
      'Alojamiento estratégico en Quito–Píntag pensado para el descanso y la operación diaria de equipos empresariales, delegaciones, ONG y voluntarios, con cotización flexible según personas y estadía.',
    inclusions: [
      'Capacidad máx. 81 personas · 18 baños internos (Hab. Panorámica, 4 suites, casa familiar, depto. y hab. compartidas)',
      'Alimentación completa en restaurante propio (desayuno, almuerzo, cena y refrigerios)',
      'Internet Wi-Fi por fibra óptica de alta estabilidad y 80 a 100 parqueaderos privados',
      'Complementos: piscina 84 m² (70 pax), sauna/turco/jacuzzi (6–8 pax), fútbol 7v7, básquet pro y vóley',
    ],
    highlightBadge: 'Prioridad Comercial · Larga Estadía',
    image: 'https://pezajodvvouezumnppaj.supabase.co/storage/v1/object/public/hacienda-media/img-whatsapp-image-2026-10-16-at-12-41-33-1793737502604.webp',
    whatsappIntent: 'Hospedaje Larga Estadía para Empresa / Grupo',
    featuredInHome: true,
  },
  {
    id: 'pkg-corp-jornada',
    category: 'corporativo',
    title: 'Grandes Eventos, Fin de Año, Integración y Convenciones',
    subtitle: '13.000 m² de áreas verdes donde montamos carpas gigantes según cada evento, catering, tarima y canchas.',
    priceLabel: '',
    priceValue: 0,
    unit: '',
    capacity: 'Eventos hasta 1.000 pax en áreas verdes c/ carpas',
    setupInfo: 'Carpas Gigantes + 13.000 m² Áreas Verdes + 20 Baños Ext. + Piscina 84 m²',
    description:
      'Escenario campestre privado en Quito–Píntag con 13.000 m² de áreas verdes donde montamos carpas gigantes según el tamaño de tu evento para celebrar fin de año, convenciones e integraciones con gastronomía y deporte.',
    inclusions: [
      '13.000 m² de áreas verdes con carpas gigantes según evento, 20 baños externos, tarima y pista (salón coaching* pago extra)',
      'Canchas deportivas: fútbol césped 7 vs 7, básquet profesional, vóley en césped reglamentaria, ping pong y billar',
      'Catering corporativo: parrilladas, banquetes y coffee breaks (karaoke y discoteca 50 pax c/ pago extra)',
      'Complementos: piscina 14×6m = 84 m² (70 pax), sauna/turco/jacuzzi, 80–100 parqueaderos y hospedaje hasta 81 pax',
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
    priceLabel: '',
    priceValue: 0,
    unit: '',
    capacity: 'Hasta 81 participantes alojados (hasta 250 en plenaria)',
    setupInfo: 'Salón (pago extra) + Catering 3 Tiempos + Piscina 84 m² + Hospedaje 81 Pax',
    description:
      'Combina convenciones, talleres de liderazgo o encuentros directivos con descanso confortable en la misma hacienda, conectividad estable y experiencias gastronómicas y recreativas.',
    inclusions: [
      'Salón social para eventos y coaching (con pago extra), pantalla gigante, sonido pro y fibra óptica',
      'Hospedaje complementario hasta 81 personas (Hab. Panorámica 16 pax, 4 suites, casa familiar, depto. y hab. compartidas)',
      'Tres comidas diarias en nuestro restaurante y coffee breaks continuos',
      'Piscina 84 m² (70 pax), sauna/turco/jacuzzi (6–8 pax) e hidromasajes 2×2m (solo grupos grandes c/ costo adicional)',
    ],
    highlightBadge: 'Convención + Hospedaje',
    image: '/images/hacienda/reunion-corporativa.jpg',
    whatsappIntent: 'Convención Empresarial con Hospedaje Complementario',
    featuredInHome: false,
  },
  {
    id: 'pkg-boda-gastronomia',
    category: 'bodas',
    title: 'Bodas y Celebraciones: Ceremonia, Carpas Gigantes en Áreas Verdes y Catering',
    subtitle: 'Ceremonias en 13.000 m² de áreas verdes, carpas gigantes según cada boda, decoración y gastronomía propia en Quito–Píntag.',
    priceLabel: '',
    priceValue: 0,
    unit: '',
    capacity: 'Eventos hasta 1.000 pax en áreas verdes c/ carpas',
    setupInfo: '13.000 m² Áreas Verdes + Carpas Gigantes + 20 Baños Ext. + Catering',
    description:
      'Un escenario campestre y romántico frente a los volcanes para vivir tu ceremonia en 13.000 m² de áreas verdes donde montamos carpas gigantes a medida y disfrutas un banquete de autor.',
    inclusions: [
      '13.000 m² de áreas verdes donde montamos carpas gigantes según tu evento y 20 baños externos',
      'Catering propio (bocaditos, menú de gala, parrilladas y postres) y decoración',
      'Tarima, pista de baile, coordinación de protocolo y personal profesional de servicio',
      'Suite nupcial y 80 a 100 parqueaderos privados internos con seguridad permanente',
    ],
    highlightBadge: 'Bodas & Celebraciones',
    image: '/images/hacienda/montaje-banquete.jpg',
    whatsappIntent: 'Boda y Celebración Social',
    featuredInHome: true,
  },
  {
    id: 'pkg-boda-hospedaje',
    category: 'bodas',
    title: 'Boda Destino + Hospedaje para Invitados (Hasta 81 Pax)',
    subtitle: 'Ceremonia, recepción y alojamiento exclusivo para hasta 81 invitados dentro de la hacienda.',
    priceLabel: '',
    priceValue: 0,
    unit: '',
    capacity: 'Hasta 81 invitados alojados (18 baños internos)',
    setupInfo: 'Ceremonia + Recepción + Hospedaje 81 Pax + Piscina 84 m² & Desayuno',
    description:
      'Pensado para bodas con familiares y amigos que viajan desde fuera de la ciudad, integrando ceremonia, banquete, alojamiento privado en la hacienda y desayuno compartido al despertar.',
    inclusions: [
      'Bloqueo integral de hospedaje para alojar cómodamente hasta 81 invitados (18 baños internos)',
      'Piscina 14×6m = 84 m² (70 pax), sauna/turco/jacuzzi; 2 hidromasajes 2×2m en grupos grandes c/ costo adicional',
      'Desayuno americano en nuestro restaurante a la mañana siguiente del evento',
      '80 a 100 parqueaderos internos (buses y autos) y 20 baños externos para áreas verdes',
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
    subtitle: 'Alojamiento funcional con alimentación, internet por fibra óptica y 80–100 parqueaderos.',
    priceLabel: '',
    priceValue: 0,
    unit: '',
    capacity: 'Equipos de 10 a 81 personas',
    setupInfo: 'Habitaciones + Alimentación + Fibra Óptica + 80–100 Parqueaderos',
    description:
      'Solución llave en mano para empresas, contratistas y proyectos que requieren alojar personal cerca de Quito y del Aeropuerto con control presupuestario, alimentación e internet.',
    inclusions: [
      'Suites matrimoniales, habitación panorámica, casa familiar, departamento o habitaciones compartidas con limpieza',
      'Desayunos, almuerzos y cenas ajustados a los turnos de trabajo del personal',
      'Internet por fibra óptica, áreas de trabajo y 80 a 100 parqueaderos internos para camionetas y buses',
      'Complementos: piscina 84 m² (70 pax), sauna/turco/jacuzzi (6–8 pax), fútbol 7v7, básquet pro y vóley',
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
    name: 'Bloque Completo de Hospedaje (Capacidad Máxima 81 Pax)',
    type: 'Villa Grupal',
    capacity: 'Hasta 81 Personas · 18 Baños Internos',
    maxGuests: 81,
    beds: '7 Camas Matrimoniales + 75 Camas Individuales (Total 81 Pax)',
    bathrooms: 18,
    pricePerNight: 0,
    showPrice: false,
    weekendNote: 'Cotización grupal según personas y duración. Hidromasajes 2×2m (8–10 pax c/u) se encienden únicamente para grupos grandes y con costo adicional.',
    description:
      'Capacidad total certificada de la hacienda (81 PAX y 18 baños internos): Habitación Panorámica (16 pax, 4 baños), 4 Suites Matrimoniales (2 con TV de 2–3 pax + 2 familiares de 2–5 pax), Casa Familiar (11 pax), Departamento (11 pax) y 2 Habitaciones Compartidas (17 pax + 10 pax), además de 20 baños externos y 80–100 parqueaderos.',
    amenities: ['Capacidad Máx. 81 Pax', '18 Baños Internos', '7 Matr. + 75 Indiv.', '80–100 Parqueaderos', 'Piscina 84 m² (70 Pax)'],
    image: 'https://pezajodvvouezumnppaj.supabase.co/storage/v1/object/public/hacienda-media/img-whatsapp-image-2026-10-16-at-12-41-33-1793737502604.webp',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-panoramica',
    name: 'Habitación Panorámica (16 Pax · 4 Baños)',
    type: 'Habitación Panorámica',
    capacity: '16 Personas (8 Literas · 2 Pisos)',
    maxGuests: 16,
    beds: '8 Literas de 2 Pisos (16 Camas Individuales)',
    bathrooms: 4,
    pricePerNight: 0,
    showPrice: false,
    weekendNote: 'Cotización grupal y corporativa preferencial según número de personas y duración.',
    description:
      'Amplia Habitación Panorámica con acabados en madera equipada con 8 literas de 2 pisos (16 camas individuales), capacidad total para 16 personas y 4 baños junto a la habitación; ideal para equipos empresariales, delegaciones, ONGs e invitados.',
    amenities: ['16 Personas (4 Baños)', '8 Literas x 2 Pisos (16 Camas)', 'Internet Fibra Óptica', '80–100 Parqueaderos', 'Piscina 84 m² (70 Pax)'],
    image: '/images/hacienda/habitacion-panoramica.jpg',
    imagePosition: '50% 48%',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-chalet-familiar',
    name: 'Casa Familiar + 2 Habitaciones (11 Pax · 3 Baños)',
    type: 'Casa Familiar',
    capacity: '11 Personas (2 Matrimoniales + 7 Literas)',
    maxGuests: 11,
    beds: '2 Camas de 2 Plazas (1 c/ TV) + 7 Literas Individuales x 2 Pisos',
    bathrooms: 3,
    pricePerNight: 0,
    showPrice: false,
    weekendNote: 'Cotización especial por duración para familias, brigadas técnicas, voluntarios y equipos.',
    description:
      'Incluye 2 habitaciones matrimoniales con 1 cama de dos plazas c/u (una con TV, 2 pax c/u, 1 baño c/u) y 1 habitación con 7 literas individuales de dos pisos (7 pax, 1 baño). Total: 11 pax y 3 baños privados.',
    amenities: ['11 Personas (3 Baños)', '2 Matrimoniales (1 TV)', '7 Literas x 2 Pisos', 'Fibra Óptica Estable', '80–100 Parqueaderos'],
    image: '/images/hacienda/cabana-exterior.jpg',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-suite-1',
    name: '2 Suites Matrimoniales con TV (2 a 3 Pax c/u)',
    type: 'Suite Matrimonial con TV',
    capacity: '2 a 3 Pax c/u (Subtotal 6 Pax · 2 Baños)',
    maxGuests: 3,
    beds: '1 Cama de 3 Plazas + 1 Adicional Individual por Suite',
    bathrooms: 1,
    pricePerNight: 0,
    showPrice: false,
    weekendNote: '2 unidades disponibles (3 pax máx. c/u · 1 baño privado por suite · incluye TV).',
    description:
      'Dos suites matrimoniales equipadas con TV y baño privado cada una. Cada suite cuenta con 1 cama de 3 plazas + 1 cama adicional individual (capacidad 2–3 pax por unidad, 6 pax total entre ambas).',
    amenities: ['2 Unidades · TV Incluida', '1 Cama 3 Plazas + 1 Indiv.', '2–3 Pax c/u · 1 Baño c/u', 'Fibra Óptica', 'Piscina & Zona Spa'],
    image: '/images/hacienda/suite-1.jpg',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-suite-2',
    name: '2 Suites Matrimoniales Familiares (2 a 5 Pax c/u)',
    type: 'Suite Matrimonial Familiar',
    capacity: '2 a 5 Pax c/u (Subtotal 10 Pax · 2 Baños)',
    maxGuests: 5,
    beds: '1 Cama de 3 Plazas + Adicionales Individuales por Suite',
    bathrooms: 1,
    pricePerNight: 0,
    showPrice: false,
    weekendNote: '2 unidades disponibles (5 pax máx. c/u · 1 baño privado por suite).',
    description:
      'Dos amplias suites matrimoniales familiares con baño privado cada una, configuradas con 1 cama de 3 plazas más adicionales individuales (capacidad 2–5 pax por unidad, 10 pax en total).',
    amenities: ['2 Unidades · 2–5 Pax c/u', '1 Cama 3 Plazas + Adic. Indiv.', '1 Baño Privado c/u', 'Internet Fibra Óptica', '80–100 Parqueaderos'],
    image: '/images/hacienda/suite-2.jpg',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-departamento',
    name: 'Departamento Independiente (11 Pax · 2 Baños)',
    type: 'Departamento Grupal',
    capacity: '11 Personas (2 Pax Matr. c/ TV + 9 Literas)',
    maxGuests: 11,
    beds: '1 Cama de 2 Plazas (c/ TV) + 9 Literas Individuales x 2 Pisos',
    bathrooms: 2,
    pricePerNight: 0,
    showPrice: false,
    weekendNote: 'Distribución ideal para coordinador/pareja con TV + equipo de 9 personas dentro de una misma unidad.',
    description:
      'Departamento funcional compuesto por 1 habitación matrimonial con TV y cama de 2 plazas (2 pax, 1 baño) más ambiente con 9 literas individuales de dos pisos (9 pax, 1 baño). Total: 11 pax y 2 baños.',
    amenities: ['11 Personas (2 Baños)', 'Matrimonial c/ TV (2 Pax)', '9 Literas x 2 Pisos (9 Pax)', 'Fibra Óptica', 'Alimentación 3 Tiempos'],
    image: '/images/hacienda/boda-suite-lounge.jpg',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-compartida-literas',
    name: 'Habitación Compartida Literas 8+9 (17 Pax · 3 Baños)',
    type: 'Alojamiento Grupal Literas',
    capacity: '17 Personas (8 Literas + 9 Literas)',
    maxGuests: 17,
    beds: '8 Literas Individuales x 2 Pisos + 9 Literas Individuales x 2 Pisos',
    bathrooms: 3,
    pricePerNight: 0,
    showPrice: false,
    weekendNote: 'Estadía grupal cotizada con alimentación programada y acceso a áreas recreativas.',
    description:
      'Bloque de alojamiento grupal dividido en dos ambientes integrados: sección de 8 literas individuales de dos pisos (8 pax) y sección de 9 literas individuales de dos pisos (9 pax), servido por 3 baños completos.',
    amenities: ['17 Personas (3 Baños)', '8 + 9 Literas x 2 Pisos', 'Camas Individuales', 'Internet Fibra Óptica', 'Canchas & Piscina 84 m²'],
    image: '/images/hacienda/lodging-hero-hacienda.jpg',
    available: true,
    featuredInHome: true,
  },
  {
    id: 'cabin-compartida-camas',
    name: 'Habitación Compartida 10 Camas (10 Pax · 2 Baños)',
    type: 'Habitación Múltiple',
    capacity: '10 Personas (10 Camas Individuales)',
    maxGuests: 10,
    beds: '10 Camas Individuales',
    bathrooms: 2,
    pricePerNight: 0,
    showPrice: false,
    weekendNote: 'Práctica habitación múltiple de 1 nivel con 2 baños completos para brigadas o delegaciones.',
    description:
      'Amplia habitación compartida equipada con 10 camas individuales y 2 baños completos para descanso práctico y ordenado de delegaciones, voluntarios y personal de campo.',
    amenities: ['10 Personas (2 Baños)', '10 Camas Individuales', 'Internet Fibra Óptica', '80–100 Parqueaderos', 'Piscina 84 m² (70 Pax)'],
    image: '/images/hacienda/hero-atardecer.jpg',
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
    title: '13.000 m² de Jardines para Team Building e Integración',
    category: 'Corporativo',
    spaceName: 'Explanada Verde 13.000 m²',
    dateTag: 'Empresas & Colegios',
    imageUrl: '/images/hacienda/jardines-teambuilding.jpg',
    description: 'Dinámicas grupales al aire libre en 13.000 m² con 80 a 100 parqueaderos internos y 20 baños externos.',
    featured: true,
  },
  {
    id: 'photo-5',
    title: 'Piscina de 14×6 m (84 m² · Cap. 70 Pax) y Zona Spa',
    category: 'Hospedaje',
    spaceName: 'Zona Húmeda & Recreación',
    dateTag: 'Bienestar',
    imageUrl: '/images/hacienda/piscina-nocturna.jpg',
    description: 'Piscina 84 m² (70 pax), 1 sauna/turco/jacuzzi (6–8 pax) y 2 hidromasajes 2×2m (8–10 pax c/u, solo grupos grandes c/ costo adicional).',
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
    metrics: 'Hasta 81 huéspedes · 18 baños internos · Varias semanas',
    challenge:
      'Las delegaciones internacionales requieren una base segura cerca del Aeropuerto Mariscal Sucre (30 min) y Quito (40 min) con alimentación planificada, fibra óptica y áreas de convivencia.',
    solution:
      'Operación integral con distribución flexible (hasta 81 pax: 7 camas matrimoniales y 75 individuales, 18 baños internos), 3 comidas diarias, lavandería y 80–100 parqueaderos internos.',
    quote:
      '“Privacidad, amplitud y atención directa para que nuestros grupos internacionales puedan concentrarse, descansar y convivir durante varias semanas en Ecuador.”',
    author: 'Coordinación de Delegaciones Internacionales (IMC · HXP)',
    image: 'https://pezajodvvouezumnppaj.supabase.co/storage/v1/object/public/hacienda-media/img-whatsapp-image-2026-10-16-at-12-41-33-1793737502604.webp',
    linkTo: '/hospedaje',
  },
  {
    id: 'case-empresa-real',
    category: 'Instituciones & Sector Corporativo',
    title: 'Reuniones Institucionales, GAD de Pichincha y Jornadas de Team Building',
    clientProfile: 'Instituciones del Estado · Bancos · Universidades · Empresas',
    metrics: '13.000 m² jardines · 80–100 parqueaderos · 20 baños ext.',
    challenge:
      'Contar con un mismo lugar reservado para sesionar con internet de fibra óptica, realizar actividades de integración en 13.000 m² al aire libre y servir almuerzos o parrilladas puntuales.',
    solution:
      '13.000 m² de jardines, canchas deportivas (fútbol 7 vs 7, básquet profesional, vóley en césped reglamentaria, ping pong y billar), salón social para eventos y coaching (pago extra) y catering propio.',
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
    metrics: '13.000 m² jardines · 20 baños ext. · Hosp. hasta 81 pax',
    challenge:
      'Integrar ceremonia campestre, recepción elegante bajo carpa estructural o salón, personal de servicio uniformado y alojamiento para la familia en un mismo predio.',
    solution:
      'Montaje completo en 13.000 m² de áreas verdes donde montamos carpas gigantes según el evento, 20 baños externos, 80–100 parqueaderos, flores, equipo profesional y alojamiento hasta 81 huéspedes.',
    quote:
      '“13.000 m² de áreas verdes donde instalamos carpas gigantes a medida y un equipo profesional impecable.”',
    author: 'Familias & Novios — Hacienda Le Plus',
    image: '/images/hacienda/montaje-banquete.jpg',
    linkTo: '/bodas',
  },
];

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'hospedaje',
    question: '¿Cuál es la capacidad real de hospedaje y cómo se distribuyen las camas y baños?',
    answer:
      'Hacienda Le Plus tiene capacidad máxima para 81 personas y 18 baños internos (7 camas matrimoniales y 75 individuales en total), distribuidos en: 1 habitación panorámica de 8 literas x 2 pisos (16 pax, 4 baños), 2 suites matrimoniales con TV (2–3 pax c/u), 2 suites matrimoniales familiares (2–5 pax c/u), 1 casa familiar + 2 habitaciones (11 pax, 3 baños), 1 departamento (11 pax, 2 baños), 1 habitación compartida de 8+9 literas (17 pax, 3 baños) y 1 habitación compartida de 10 camas (10 pax, 2 baños).',
  },
  {
    id: 'faq-2',
    category: 'general',
    question: '¿A qué distancia está de Quito y cómo funcionan sus áreas verdes, carpas, parqueaderos y baños externos?',
    answer:
      'Estamos ubicados en Píntag (Barrio San Juan de la Tola, Calle Deus N.º 100), a 40 minutos de Quito y a 30 minutos del Aeropuerto Internacional Mariscal Sucre. En áreas externas ofrecemos 13.000 m² de áreas verdes donde montamos carpas gigantes dimensionadas según el tamaño de cada evento (hasta 1.000 pax), 20 baños externos y de 80 a 100 parqueaderos privados.',
  },
  {
    id: 'faq-3',
    category: 'corporativo',
    question: '¿Qué áreas húmedas, deportivas y servicios con pago extra ofrece la hacienda?',
    answer:
      'Contamos con internet fibra óptica, piscina de 14×6 m = 84 m² (cap. 70 personas), 1 sauna/turco/jacuzzi (cap. 6–8 pax) y 2 hidromasajes de 2×2 m (cap. 8–10 pax c/u; nota: se encienden únicamente en grupos grandes y con costo adicional). En deportes: fútbol en césped 7 vs 7, básquet profesional, vóley en césped reglamentaria, mesa de ping pong y mesa de billar. Con pago extra adicional: karaoke, discoteca para 50 personas y salón social para eventos y coaching.',
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
    estimatedVolume: '55 personas × 18 noches (Bloque Completo · 18 baños)',
    notes: 'Looking for full-board accommodation (breakfast, lunch, dinner), laundry service, and airport bus transfer.',
    targetCorporateEmail: 'reservas@haciendaleplus.com',
    sourcePage: '/hospedaje',
    status: 'Nuevo',
  },
];

// ============================================================================
// NUEVOS MÓDULOS POR DEFECTO (SINCRONIZADOS CON PANEL ADMINISTRATIVO)
// ============================================================================
export const DEFAULT_LODGING_BANNER: LodgingFeaturedBanner = {
  id: 'banner-operacion-completa',
  overline: 'EMPRESAS, DELEGACIONES, ONGS Y VOLUNTARIOS',
  titleLine1: 'Operación Completa',
  titleLine2: 'para Larga Estadía',
  description:
    'Estadías prolongadas sin preocupaciones: habitaciones equipadas, tres comidas diarias de nuestro restaurante, conectividad estable y acceso a zonas verdes, piscina y recreación en un entorno privado.',
  locationBadge: 'Quito – Píntag · A 40 min de Quito y 30 min del Aeropuerto',
  videoButtonText: 'Ver Instalaciones',
  image: '/images/hacienda/piscina-nocturna.jpg',
  videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-resort-in-the-mountains-41573-large.mp4',
  mediaType: 'image',
};

export const DEFAULT_LODGING_SERVICES: LodgingServiceCard[] = [
  {
    id: 'srv-alimentacion-restaurante',
    title: 'Alimentación & Restaurante',
    badge: 'Alimentación & Comp.',
    badgeClass: 'bg-[#13281F]/90 text-[#E2C585] border border-[#C8A45D]/40',
    description:
      'Desayunos, almuerzos, cenas y coffee breaks programados para grupos de hasta 81 personas, con restaurante propio como complemento.',
    ctaText: 'Cotizar con pensión',
    image: '/images/hacienda/gastronomia-parrillada.jpg',
    videoUrl: '',
    mediaType: 'image',
    serviceType: 'hospedaje',
    itemName: 'Alimentación 3 Tiempos y Restaurante para Larga Estadía',
  },
  {
    id: 'srv-internet-parqueaderos',
    title: 'Internet & 80–100 Parqueaderos',
    badge: 'Internet & Parqueaderos',
    badgeClass: 'bg-[#8C6D3F]/90 text-[#FAF7F2]',
    description:
      'Wi-Fi por fibra óptica de alta estabilidad, 20 baños externos de apoyo y 80 a 100 parqueaderos internos seguros para autos y buses.',
    ctaText: 'Consultar logística',
    image: 'https://pezajodvvouezumnppaj.supabase.co/storage/v1/object/public/hacienda-media/img-whatsapp-image-2026-10-16-at-12-41-33-1793737502604.webp',
    videoUrl: '',
    mediaType: 'image',
    serviceType: 'hospedaje',
    itemName: 'Estadía Corporativa con Internet Fibra Óptica y Parqueaderos',
  },
  {
    id: 'srv-piscina-bienestar',
    title: 'Comp.: Piscina 84 m² & Spa',
    badge: 'Complemento',
    badgeClass: 'bg-[#1A382B]/90 text-[#FAF7F2]',
    description:
      'Piscina 14×6 m = 84 m² (cap. 70 pax) y sauna/turco/jacuzzi (6–8 pax). Nota: 2 hidromasajes 2×2 m solo en grupos grandes y con costo adicional.',
    ctaText: 'Ver inclusiones',
    image: '/images/hacienda/area-humeda.jpg',
    videoUrl: '',
    mediaType: 'image',
    serviceType: 'hospedaje',
    itemName: 'Complemento Piscina Temperada y Zona Húmeda',
  },
  {
    id: 'srv-recreacion-deportes',
    title: 'Comp.: 13.000 m² & Deportes',
    badge: 'Complemento',
    badgeClass: 'bg-[#6B7052]/90 text-[#FAF7F2]',
    description:
      '13.000 m² de jardines, fútbol 7v7, básquet profesional, vóley en césped reglamentaria, ping pong y billar (karaoke, discoteca 50 pax y salón social con pago extra).',
    ctaText: 'Cotizar grupo',
    image: '/images/hacienda/jardines-teambuilding.jpg',
    videoUrl: '',
    mediaType: 'image',
    serviceType: 'grupos',
    itemName: 'Hospedaje Grupal con Actividades Recreativas y Canchas',
  },
];

export const DEFAULT_WEDDING_PROPOSALS: WeddingProposalCard[] = [
  {
    id: 'boda-clasica-integral',
    title: 'Boda Integral & Carpas Gigantes en Áreas Verdes',
    subtitle: 'Quito–Píntag · Hasta 1.000 Pax · Carpas Gigantes en 13.000 m² Áreas Verdes',
    badge: 'Boda Popular',
    badgeClass: 'bg-[#C8A45D] text-[#0A1F17]',
    image: 'https://pezajodvvouezumnppaj.supabase.co/storage/v1/object/public/hacienda-media/img-whatsapp-image-2026-10-16-at-12-41-33-1793738382768.webp',
    specs: [
      { label: 'Carpas hasta 1.000 Pax', icon: 'users' },
      { label: '13.000 m² Áreas Verdes', icon: 'sparkles' },
      { label: 'Catering 3 Tiempos', icon: 'utensils' },
    ],
    price: '',
    unit: '',
    showPrice: false,
    serviceType: 'bodas',
  },
  {
    id: 'boda-destino-14-suites',
    title: 'Boda + Hospedaje para Invitados',
    subtitle: 'Quito–Píntag · Hasta 81 Pax · 18 Baños Internos',
    badge: 'Hospedaje Invitados',
    badgeClass: 'bg-[#8C6D3F]/90 text-[#FAF7F2]',
    image: '/images/hacienda/bodas-exteriores.jpg',
    specs: [
      { label: 'Hasta 81 Pax', icon: 'users' },
      { label: '18 Baños (82 Camas)', icon: 'bed' },
      { label: 'Piscina 84 m² (70 Pax)', icon: 'sparkles' },
    ],
    price: '',
    unit: '',
    showPrice: false,
    serviceType: 'bodas',
  },
  {
    id: 'banquete-autor-coctel',
    title: 'Catering Nupcial & Decoración',
    subtitle: 'Quito–Píntag · Gastronomía & Montaje',
    badge: 'Catering & Decoración',
    badgeClass: 'bg-[#1A382B]/90 text-[#FAF7F2]',
    image: '/images/hacienda/boda-mesa-imperial.jpg',
    specs: [
      { label: 'Descorche Libre', icon: 'glass' },
      { label: 'Catering Propio', icon: 'utensils' },
      { label: '20 Baños Externos', icon: 'sparkles' },
    ],
    price: '',
    unit: '',
    showPrice: false,
    serviceType: 'bodas',
  },
  {
    id: 'ceremonia-jardin-palmeras',
    title: 'Ceremonia en 13.000 m² de Áreas Verdes',
    subtitle: 'Quito–Píntag · Carpas Gigantes según Evento',
    badge: 'Ceremonias',
    badgeClass: 'bg-[#6B7052]/90 text-[#FAF7F2]',
    image: '/images/hacienda/boda-ceremonia-arco.jpg',
    specs: [
      { label: 'Hasta 1.000 Ext.', icon: 'users' },
      { label: '80–100 Parqueaderos', icon: 'sparkles' },
      { label: 'Sillas Tiffany', icon: 'sparkles' },
    ],
    price: '',
    unit: '',
    showPrice: false,
    serviceType: 'bodas',
  },
  {
    id: 'experiencia-zona-humeda',
    title: 'Complemento: Piscina 84 m², Restaurante & Deportes',
    subtitle: 'Quito–Píntag · Hidromasajes en grupos grandes c/ costo adicional',
    badge: 'Complemento Nupcial',
    badgeClass: 'bg-[#7A6A58]/90 text-[#FAF7F2]',
    image: '/images/hacienda/area-humeda.jpg',
    specs: [
      { label: 'Piscina 84 m²', icon: 'sparkles' },
      { label: 'Sauna/Turco/Jacuzzi', icon: 'utensils' },
      { label: 'Áreas Deportivas', icon: 'sparkles' },
    ],
    price: '',
    unit: '',
    showPrice: false,
    serviceType: 'bodas',
  },
  {
    id: 'recepcion-salon-colonial',
    title: 'Salón Social, Discoteca (50 Pax) & Karaoke*',
    subtitle: 'Quito–Píntag · *Servicios con pago extra opcional',
    badge: 'Recepción & Adicionales',
    badgeClass: 'bg-[#221D1A]/90 text-[#E2C585]',
    image: '/images/hacienda/suite-1.jpg',
    specs: [
      { label: 'Discoteca 50 Pax*', icon: 'users' },
      { label: 'Salón Social*', icon: 'utensils' },
      { label: 'Karaoke (Pago Extra)', icon: 'bed' },
    ],
    price: '',
    unit: '',
    showPrice: false,
    serviceType: 'bodas',
  },
];

export const DEFAULT_CORPORATE_EXCLUSIVE_FORMATS: ServicePackage[] = [
  {
    id: 'pkg-corp-findeanio',
    category: 'corporativo',
    title: 'Fiestas de Fin de Año & Celebraciones de Gran Formato',
    subtitle: 'Carpas gigantes según evento en 13.000 m² de áreas verdes, catering, 20 baños ext. y 80–100 parqueos.',
    priceLabel: '',
    priceValue: 0,
    unit: '',
    capacity: 'Eventos hasta 1.000 pax en áreas verdes c/ carpas',
    setupInfo: 'Carpas Gigantes + 13.000 m² Áreas Verdes + 20 Baños Ext. + Catering',
    description:
      'Celebra eventos de fin de año y encuentros corporativos inolvidables en 13.000 m² de áreas verdes donde montamos carpas gigantes según el tamaño de tu evento, con música, banquete a medida y opciones de descanso.',
    inclusions: [
      '13.000 m² de áreas verdes donde montamos carpas gigantes según evento, 20 baños ext., tarima y pista',
      'Catering corporativo propio: menú de gala, buffet o parrillada campestre',
      'Piscina 84 m² (70 pax), deportes y 80–100 parqueaderos; karaoke/discoteca 50 pax/salón social c/ pago extra',
      'Opción de hospedaje complementario hasta 81 pax (18 baños internos · 7 matr. + 75 indiv.)',
    ],
    highlightBadge: 'Fin de Año & Macroeventos',
    image: '/images/hacienda/boda-carpa-gala.jpg',
    showPrice: false,
    whatsappIntent: 'Evento Corporativo de Fin de Año / Gran Formato',
    featuredInHome: false,
  },
  {
    id: 'pkg-corp-teambuilding',
    category: 'corporativo',
    title: 'Integración Empresarial, Deportes & Piscina 84 m²',
    subtitle: 'Fútbol 7v7, básquet profesional, vóley reglamentaria, ping pong, billar y piscina 70 pax.',
    priceLabel: '',
    priceValue: 0,
    unit: '',
    capacity: 'Hasta 1.000 pax en áreas verdes c/ carpas',
    setupInfo: '13.000 m² Áreas Verdes + Canchas Pro + Piscina 84 m² + Catering',
    description:
      'Fortalece el espíritu de equipo con jornadas deportivas, actividades al aire libre en 13.000 m² de áreas verdes, carpas según tu evento, parrillada campestre y relajación junto a la piscina.',
    inclusions: [
      '13.000 m² de áreas verdes, 20 baños externos y canchas (fútbol 7v7, básquet pro, vóley reglamentaria, ping pong, billar)',
      'Catering y restaurante: desayuno, parrillada de integración y coffee breaks',
      'Piscina 84 m² (70 pax) y 1 sauna/turco/jacuzzi (6–8 pax); 2 hidromasajes 2×2m en grupos grandes c/ costo adicional',
      '80 a 100 parqueaderos privados internos y hospedaje complementario hasta 81 pax',
    ],
    highlightBadge: 'Integración & Deportes',
    image: '/images/hacienda/jardines-teambuilding.jpg',
    showPrice: false,
    whatsappIntent: 'Jornada de Integración y Deportes',
    featuredInHome: false,
  },
  {
    id: 'pkg-corp-retiro',
    category: 'corporativo',
    title: 'Convenciones y Encuentros Empresariales con Hospedaje Complementario',
    subtitle: 'Salón de eventos/coaching (pago extra), plenarias y alojamiento hasta 81 personas.',
    priceLabel: '',
    priceValue: 0,
    unit: '',
    capacity: 'Hasta 81 participantes alojados (hasta 250 en plenaria)',
    setupInfo: 'Salón Coaching* + Catering 3 Tiempos + Piscina 84 m² + Hosp. 81 Pax',
    description:
      'Reúne a tus directivos y colaboradores en un entorno privado ideal para convenciones, talleres estratégicos y descanso completo con alimentación diaria y conectividad estable.',
    inclusions: [
      'Salón social para eventos y coaching (con pago extra), pantalla gigante, sonido pro y fibra óptica',
      'Hospedaje complementario hasta 81 pax (7 camas matrimoniales y 75 individuales, 18 baños)',
      'Tres comidas diarias en nuestro restaurante y coffee breaks continuos',
      'Piscina 84 m² (70 pax), sauna/turco/jacuzzi (6–8 pax), 80–100 parqueaderos e hidromasajes*',
    ],
    highlightBadge: 'Convenciones + Hospedaje',
    image: '/images/hacienda/reunion-corporativa.jpg',
    showPrice: false,
    whatsappIntent: 'Convención o Encuentro con Hospedaje',
    featuredInHome: false,
  },
];

export const DEFAULT_CORPORATE_HIGHLIGHTS: CorporateHighlightItem[] = [
  {
    id: 'corp-hl-findeanio',
    title: 'Fin de Año & 13.000 m² Áreas Verdes',
    subtitle: 'Carpas gigantes según evento, 20 baños externos, 80–100 parqueaderos y catering',
    highlightMetric: 'Carpas hasta 1.000 pax',
    image: '/images/hacienda/boda-carpa-gala.jpg',
    mediaType: 'image',
    whatsappItemName: 'Eventos de Fin de Año & Celebraciones de Gran Formato',
  },
  {
    id: 'corp-hl-teambuilding',
    title: 'Integración, Deportes & Piscina',
    subtitle: 'Fútbol 7v7, básquet pro, vóley regl., ping pong, billar y piscina 84 m²',
    highlightMetric: 'Piscina 70 pax',
    image: '/images/hacienda/jardines-teambuilding.jpg',
    mediaType: 'image',
    whatsappItemName: 'Integración Empresarial, Actividades Deportivas y Piscina',
  },
  {
    id: 'corp-hl-convenciones',
    title: 'Convenciones + Hospedaje 81 Pax',
    subtitle: 'Salón eventos/coaching*, discoteca 50 pax* y karaoke* (*pago extra)',
    highlightMetric: 'Hasta 81 huéspedes',
    image: '/images/hacienda/reunion-corporativa.jpg',
    mediaType: 'image',
    whatsappItemName: 'Convenciones con Hospedaje Complementario (Hasta 81 Personas)',
  },
];

interface CMSState {
  siteConfig: SiteConfig;
  packages: ServicePackage[];
  cabins: CabinRoom[];
  lodgingHeroBanner: LodgingFeaturedBanner;
  lodgingServices: LodgingServiceCard[];
  weddingProposals: WeddingProposalCard[];
  corporateExclusiveFormats: ServicePackage[];
  corporateHighlights: CorporateHighlightItem[];
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
  // Módulo 1: Habitaciones para Empresas y Grupos
  updateCabin: (cabin: CabinRoom) => void;
  addCabin: (cabin: Omit<CabinRoom, 'id'>) => void;
  deleteCabin: (id: string) => void;
  // Módulo 2: Servicios de Estadía y Complementos (Tarjeta Principal Grande + 4 Tarjetas)
  updateLodgingHeroBanner: (banner: Partial<LodgingFeaturedBanner>) => void;
  updateLodgingService: (card: LodgingServiceCard) => void;
  addLodgingService: (card: Omit<LodgingServiceCard, 'id'>) => void;
  deleteLodgingService: (id: string) => void;
  // Módulo 3: Bodas y Celebraciones — Propuestas Nupciales Destacadas
  updateWeddingProposal: (card: WeddingProposalCard) => void;
  addWeddingProposal: (card: Omit<WeddingProposalCard, 'id'>) => void;
  deleteWeddingProposal: (id: string) => void;
  // Módulo 4: Grandes Eventos — Formato Exclusivo
  updateCorporateExclusiveFormat: (pkg: ServicePackage) => void;
  addCorporateExclusiveFormat: (pkg: Omit<ServicePackage, 'id'>) => void;
  deleteCorporateExclusiveFormat: (id: string) => void;
  // Módulo 5: Grandes Eventos Corporativos — Macroeventos y Encuentros Empresariales
  updateCorporateHighlight: (item: CorporateHighlightItem) => void;
  addCorporateHighlight: (item: Omit<CorporateHighlightItem, 'id'>) => void;
  deleteCorporateHighlight: (id: string) => void;
  // Galería & Leads
  addPhoto: (photo: Omit<EventPhoto, 'id'>) => void;
  deletePhoto: (id: string) => void;
  togglePhotoFeatured: (id: string) => void;
  addLead: (lead: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>) => LeadSubmission;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  updateLead: (lead: LeadSubmission) => void;
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
        const parsed = normalizeLegacyCMSData(JSON.parse(saved));
        return {
          siteConfig: { ...DEFAULT_SITE_CONFIG, ...parsed.siteConfig },
          packages: parsed.packages?.length ? parsed.packages : DEFAULT_PACKAGES,
          cabins: ensureUpdatedCabins(parsed.cabins, DEFAULT_CABINS),
          lodgingHeroBanner: parsed.lodgingHeroBanner
            ? { ...DEFAULT_LODGING_BANNER, ...parsed.lodgingHeroBanner }
            : DEFAULT_LODGING_BANNER,
          lodgingServices: parsed.lodgingServices?.length
            ? parsed.lodgingServices
            : DEFAULT_LODGING_SERVICES,
          weddingProposals: parsed.weddingProposals?.length
            ? parsed.weddingProposals
            : DEFAULT_WEDDING_PROPOSALS,
          corporateExclusiveFormats: parsed.corporateExclusiveFormats?.length
            ? parsed.corporateExclusiveFormats
            : DEFAULT_CORPORATE_EXCLUSIVE_FORMATS,
          corporateHighlights: parsed.corporateHighlights?.length
            ? parsed.corporateHighlights
            : DEFAULT_CORPORATE_HIGHLIGHTS,
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
      lodgingHeroBanner: DEFAULT_LODGING_BANNER,
      lodgingServices: DEFAULT_LODGING_SERVICES,
      weddingProposals: DEFAULT_WEDDING_PROPOSALS,
      corporateExclusiveFormats: DEFAULT_CORPORATE_EXCLUSIVE_FORMATS,
      corporateHighlights: DEFAULT_CORPORATE_HIGHLIGHTS,
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

  const syncModulesWithCloud = (nextState: CMSState) => {
    saveModulesToSupabase({
      cabins: nextState.cabins,
      lodgingHeroBanner: nextState.lodgingHeroBanner,
      lodgingServices: nextState.lodgingServices,
      weddingProposals: nextState.weddingProposals,
      corporateExclusiveFormats: nextState.corporateExclusiveFormats,
      corporateHighlights: nextState.corporateHighlights,
    });
  };

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
          const existingIds = new Set(remoteLeads.map((l) => l.id));
          const uniqueLocal = prev.leads.filter((l) => !existingIds.has(l.id));
          return { ...prev, leads: [...remoteLeads, ...uniqueLocal] };
        });
      }
    });

    fetchSiteConfigFromSupabase().then((remoteConfig) => {
      if (remoteConfig) {
        const normalizedConfig = normalizeLegacyCMSData(remoteConfig);
        setState((prev) => ({
          ...prev,
          siteConfig: { ...prev.siteConfig, ...normalizedConfig },
        }));
      }
    });

    fetchModulesFromSupabase().then((remoteModules) => {
      if (remoteModules) {
        const normalizedModules = normalizeLegacyCMSData(remoteModules);
        setState((prev) => ({
          ...prev,
          cabins: normalizedModules.cabins?.length
            ? ensureUpdatedCabins(normalizedModules.cabins, DEFAULT_CABINS)
            : prev.cabins,
          lodgingHeroBanner: normalizedModules.lodgingHeroBanner
            ? { ...prev.lodgingHeroBanner, ...normalizedModules.lodgingHeroBanner }
            : prev.lodgingHeroBanner,
          lodgingServices: normalizedModules.lodgingServices?.length
            ? normalizedModules.lodgingServices
            : prev.lodgingServices,
          weddingProposals: normalizedModules.weddingProposals?.length
            ? normalizedModules.weddingProposals
            : prev.weddingProposals,
          corporateExclusiveFormats: normalizedModules.corporateExclusiveFormats?.length
            ? normalizedModules.corporateExclusiveFormats
            : prev.corporateExclusiveFormats,
          corporateHighlights: normalizedModules.corporateHighlights?.length
            ? normalizedModules.corporateHighlights
            : prev.corporateHighlights,
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

  // MÓDULO 1: Habitaciones para Empresas y Grupos
  const updateCabin = (updated: CabinRoom) => {
    setState((prev) => {
      const next = {
        ...prev,
        cabins: prev.cabins.map((c) => (c.id === updated.id ? updated : c)),
      };
      syncModulesWithCloud(next);
      return next;
    });
  };

  const addCabin = (cabin: Omit<CabinRoom, 'id'>) => {
    const newCabin: CabinRoom = {
      ...cabin,
      id: `cabin-${Date.now()}`,
    };
    setState((prev) => {
      const next = {
        ...prev,
        cabins: [...prev.cabins, newCabin],
      };
      syncModulesWithCloud(next);
      return next;
    });
  };

  const deleteCabin = (id: string) => {
    setState((prev) => {
      const next = {
        ...prev,
        cabins: prev.cabins.filter((c) => c.id !== id),
      };
      syncModulesWithCloud(next);
      return next;
    });
  };

  // MÓDULO 2: Servicios de Estadía y Complementos
  const updateLodgingHeroBanner = (banner: Partial<LodgingFeaturedBanner>) => {
    setState((prev) => {
      const next = {
        ...prev,
        lodgingHeroBanner: { ...prev.lodgingHeroBanner, ...banner },
      };
      syncModulesWithCloud(next);
      return next;
    });
  };

  const updateLodgingService = (updated: LodgingServiceCard) => {
    setState((prev) => {
      const next = {
        ...prev,
        lodgingServices: prev.lodgingServices.map((s) => (s.id === updated.id ? updated : s)),
      };
      syncModulesWithCloud(next);
      return next;
    });
  };

  const addLodgingService = (card: Omit<LodgingServiceCard, 'id'>) => {
    const newCard: LodgingServiceCard = {
      ...card,
      id: `srv-${Date.now()}`,
    };
    setState((prev) => {
      const next = {
        ...prev,
        lodgingServices: [...prev.lodgingServices, newCard],
      };
      syncModulesWithCloud(next);
      return next;
    });
  };

  const deleteLodgingService = (id: string) => {
    setState((prev) => {
      const next = {
        ...prev,
        lodgingServices: prev.lodgingServices.filter((s) => s.id !== id),
      };
      syncModulesWithCloud(next);
      return next;
    });
  };

  // MÓDULO 3: Propuestas Nupciales Destacadas (Bodas)
  const updateWeddingProposal = (updated: WeddingProposalCard) => {
    setState((prev) => {
      const next = {
        ...prev,
        weddingProposals: prev.weddingProposals.map((w) => (w.id === updated.id ? updated : w)),
      };
      syncModulesWithCloud(next);
      return next;
    });
  };

  const addWeddingProposal = (card: Omit<WeddingProposalCard, 'id'>) => {
    const newCard: WeddingProposalCard = {
      ...card,
      id: `boda-${Date.now()}`,
    };
    setState((prev) => {
      const next = {
        ...prev,
        weddingProposals: [...prev.weddingProposals, newCard],
      };
      syncModulesWithCloud(next);
      return next;
    });
  };

  const deleteWeddingProposal = (id: string) => {
    setState((prev) => {
      const next = {
        ...prev,
        weddingProposals: prev.weddingProposals.filter((w) => w.id !== id),
      };
      syncModulesWithCloud(next);
      return next;
    });
  };

  // MÓDULO 4: Formato Exclusivo (Corporativo)
  const updateCorporateExclusiveFormat = (updated: ServicePackage) => {
    setState((prev) => {
      const next = {
        ...prev,
        corporateExclusiveFormats: prev.corporateExclusiveFormats.map((p) =>
          p.id === updated.id ? updated : p
        ),
      };
      syncModulesWithCloud(next);
      return next;
    });
  };

  const addCorporateExclusiveFormat = (pkg: Omit<ServicePackage, 'id'>) => {
    const newPkg: ServicePackage = {
      ...pkg,
      id: `pkg-corp-${Date.now()}`,
    };
    setState((prev) => {
      const next = {
        ...prev,
        corporateExclusiveFormats: [...prev.corporateExclusiveFormats, newPkg],
      };
      syncModulesWithCloud(next);
      return next;
    });
  };

  const deleteCorporateExclusiveFormat = (id: string) => {
    setState((prev) => {
      const next = {
        ...prev,
        corporateExclusiveFormats: prev.corporateExclusiveFormats.filter((p) => p.id !== id),
      };
      syncModulesWithCloud(next);
      return next;
    });
  };

  // MÓDULO 5: Grandes Eventos Corporativos (Macroeventos y Encuentros Empresariales)
  const updateCorporateHighlight = (updated: CorporateHighlightItem) => {
    setState((prev) => {
      const next = {
        ...prev,
        corporateHighlights: prev.corporateHighlights.map((h) =>
          h.id === updated.id ? updated : h
        ),
      };
      syncModulesWithCloud(next);
      return next;
    });
  };

  const addCorporateHighlight = (item: Omit<CorporateHighlightItem, 'id'>) => {
    const newItem: CorporateHighlightItem = {
      ...item,
      id: `corp-hl-${Date.now()}`,
    };
    setState((prev) => {
      const next = {
        ...prev,
        corporateHighlights: [...prev.corporateHighlights, newItem],
      };
      syncModulesWithCloud(next);
      return next;
    });
  };

  const deleteCorporateHighlight = (id: string) => {
    setState((prev) => {
      const next = {
        ...prev,
        corporateHighlights: prev.corporateHighlights.filter((h) => h.id !== id),
      };
      syncModulesWithCloud(next);
      return next;
    });
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

  const updateLead = (lead: LeadSubmission) => {
    setState((prev) => ({
      ...prev,
      leads: prev.leads.map((l) => (l.id === lead.id ? lead : l)),
    }));
    updateLeadInSupabase(lead);
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
    const defaultState: CMSState = {
      siteConfig: DEFAULT_SITE_CONFIG,
      packages: DEFAULT_PACKAGES,
      cabins: DEFAULT_CABINS,
      lodgingHeroBanner: DEFAULT_LODGING_BANNER,
      lodgingServices: DEFAULT_LODGING_SERVICES,
      weddingProposals: DEFAULT_WEDDING_PROPOSALS,
      corporateExclusiveFormats: DEFAULT_CORPORATE_EXCLUSIVE_FORMATS,
      corporateHighlights: DEFAULT_CORPORATE_HIGHLIGHTS,
      photos: DEFAULT_PHOTOS,
      caseStudies: DEFAULT_CASE_STUDIES,
      faqs: DEFAULT_FAQS,
      leads: DEFAULT_LEADS,
    };
    setState(defaultState);
    syncModulesWithCloud(defaultState);
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
        updateLodgingHeroBanner,
        updateLodgingService,
        addLodgingService,
        deleteLodgingService,
        updateWeddingProposal,
        addWeddingProposal,
        deleteWeddingProposal,
        updateCorporateExclusiveFormat,
        addCorporateExclusiveFormat,
        deleteCorporateExclusiveFormat,
        updateCorporateHighlight,
        addCorporateHighlight,
        deleteCorporateHighlight,
        addPhoto,
        deletePhoto,
        togglePhotoFeatured,
        addLead,
        updateLeadStatus,
        updateLead,
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
