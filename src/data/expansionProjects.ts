import { SupportedLanguage } from '../i18n/types';
import { tr, trList } from '../i18n/phraseDictionary';

export interface ExpansionGalleryImage {
  id: string;
  src: string;
  label: string;
  caption: string;
  alt: string;
}

export interface ExpansionSpecMetric {
  label: string;
  value: string;
  detail: string;
}

export const getDomeGalleryImages = (
  langOrIsEn?: SupportedLanguage | boolean
): ExpansionGalleryImage[] => [
  {
    id: 'dome-complex',
    src: '/images/hacienda/domo-eventos-complejo.jpg',
    label: tr('Complex & Service Wings', 'Complejo y Áreas Integradas', langOrIsEn),
    caption: tr(
      '20m × 10m Geodesic Dome integrated with Bar, Kitchen, Storage & Men/Women Restrooms in one zone',
      'Domo Geodésico 20m × 10m integrado con Bar, Cocina, Bodegas y Baños Hombres/Mujeres en una sola área',
      langOrIsEn
    ),
    alt: tr(
      'Aerial view of the 20m by 10m event dome complex with Bar, Kitchen, Storage, and Men/Women restrooms at Hacienda Le Plus',
      'Vista panorámica del Domo de 20m x 10m con áreas de Bar, Cocina, Bodega y Baños de Hombres y Mujeres en Hacienda Le Plus',
      langOrIsEn
    ),
  },
  {
    id: 'dome-entrance',
    src: '/images/hacienda/domo-eventos-entrada.jpg',
    label: tr('Grand Entrance Canopy', 'Ingreso Monumental', langOrIsEn),
    caption: tr(
      'Glass-roofed arrival portal and illuminated red-carpet steps welcoming 200–250 guests',
      'Pórtico acristalado de llegada y escalinata iluminada para recibir de 200 a 250 invitados',
      langOrIsEn
    ),
    alt: tr(
      'Front illuminated entrance with glass canopy and red carpet leading to the 20m geodesic event dome',
      'Entrada frontal iluminada con pórtico de cristal y alfombra roja del Domo de eventos de 20 metros',
      langOrIsEn
    ),
  },
  {
    id: 'dome-interior',
    src: '/images/hacienda/domo-eventos-interior.jpg',
    label: tr('Interior Gala (250 Pax)', 'Interior Gala (250 Pax)', langOrIsEn),
    caption: tr(
      '10m clear-span draped ceiling, stage screen, dance floor, and banquet seating for 200–250 guests',
      'Cúpula de 10m de alto con cielo falso drapeado, escenario, pista de baile y banquete para 200–250 invitados',
      langOrIsEn
    ),
    alt: tr(
      'Interior gala wedding and banquet setup inside the Hacienda Le Plus geodesic dome for 200 to 250 guests',
      'Salón interior del Domo Hacienda Le Plus montado para gala y banquete de 200 a 250 invitados',
      langOrIsEn
    ),
  },
];

export const getCabinGalleryImage = (
  langOrIsEn?: SupportedLanguage | boolean
): ExpansionGalleryImage => ({
  id: 'cabins-complex',
  src: '/images/hacienda/cabanas-domo-2pisos.jpg',
  label: tr('4 Two-Story Dome Cabins', '4 Cabañas de Dos Pisos', langOrIsEn),
  caption: tr(
    '4 terraced two-story cabins: wood suite + balcony downstairs, geodesic dome + couple jacuzzi terrace upstairs',
    '4 cabañas de dos pisos: habitación matrimonial en madera con balcón en 1er piso y domo matrimonial con jacuzzi en terraza del 2do piso',
    langOrIsEn
  ),
  alt: tr(
    'Four two-story luxury cabins with wood ground-floor suites and rooftop geodesic dome suites with couple jacuzzis in Quito-Pintag',
    'Área de 4 cabañas de dos pisos con habitación matrimonial en madera abajo y domo matrimonial con jacuzzi de pareja arriba en Hacienda Le Plus',
    langOrIsEn
  ),
});

export const getDomeSpecs = (langOrIsEn?: SupportedLanguage | boolean): ExpansionSpecMetric[] => [
  {
    label: tr('Dimensions', 'Dimensiones', langOrIsEn),
    value: '20 m × 10 m',
    detail: tr('Diameter × Height', 'Diámetro × Alto', langOrIsEn),
  },
  {
    label: tr('Capacity', 'Capacidad', langOrIsEn),
    value: '200 – 250',
    detail: tr('Seated Guests', 'Invitados', langOrIsEn),
  },
  {
    label: tr('Unified Layout', 'Complejo Integral', langOrIsEn),
    value: tr('All-in-One', 'En 1 Sola Área', langOrIsEn),
    detail: tr('Bar · Kitchen · Storage · Baths', 'Bar · Cocina · Bodegas · Baños', langOrIsEn),
  },
];

export const getDomeIntegratedAreas = (langOrIsEn?: SupportedLanguage | boolean): string[] =>
  trList(
    [
      'Integrated dedicated Bar & Cocktail Service Wing',
      'In-house Catering Kitchen & Operational Storage Rooms',
      'Dedicated Men’s, Women’s & Accessible Restrooms in one unified complex',
      '20m diameter × 10m height column-free arena for 200 to 250 guests',
    ],
    [
      'Área de Bar propio integrado al complejo del Domo',
      'Cocina profesional de soporte y bodegas logísticas dedicadas',
      'Batería independiente de baños para hombres y mujeres en una sola área',
      'Planta libre de 20m de diámetro × 10m de alto para 200 a 250 invitados',
    ],
    langOrIsEn
  );

export const getCabinSpecs = (langOrIsEn?: SupportedLanguage | boolean): ExpansionSpecMetric[] => [
  {
    label: tr('Total Units', 'Unidades', langOrIsEn),
    value: tr('4 Cabins', '4 Cabañas', langOrIsEn),
    detail: tr('2 Floors · 8 Couple Suites', '2 Pisos · 8 Hab. Parejas', langOrIsEn),
  },
  {
    label: tr('Expanded Capacity', 'Aforo Ampliado', langOrIsEn),
    value: tr('16 → 32 Pax', '16 a 32 Usuarios', langOrIsEn),
    detail: tr('2x Occupancy via Sofa Beds', 'Ocupación doble con sofá cama', langOrIsEn),
  },
  {
    label: tr('Top Terrace', '2do Piso Privado', langOrIsEn),
    value: tr('Couple Jacuzzi', 'Jacuzzi de Pareja', langOrIsEn),
    detail: tr('Inside Rooftop Dome Terrace', 'En terraza con domo matrimonial', langOrIsEn),
  },
];
