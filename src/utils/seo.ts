import { useEffect } from 'react';
import { tr } from '../i18n/phraseDictionary';
import { SupportedLanguage } from '../i18n/types';

interface PageMetaOptions {
  title: string;
  description: string;
  canonicalPath?: string;
  lang?: string;
  title_en?: string;
  description_en?: string;
}

const VALID_LANGS: SupportedLanguage[] = ['es', 'en', 'pt', 'fr', 'de', 'zh'];

export const TOURISM_SEO_KEYWORDS: Record<SupportedLanguage, string> = {
  es: [
    'hospedaje en Pintag',
    'hotel hacienda en Quito',
    'turismo rural Ecuador',
    'eco resort Quito',
    'alojamiento cerca del Antisana',
    'hacienda turística en Pichincha',
    'hospedaje Valle de los Chillos',
    'suites y cabañas en Pintag',
    'hospedaje para grupos y familias Quito',
    'turismo ecológico Quito',
    'escapadas de fin de semana cerca de Quito',
    'hotel campestre con piscina y spa Pintag',
    'alojamiento para turistas y delegaciones Ecuador',
    'turismo de naturaleza Antisana',
    'hospedaje larga estadía Quito',
    'vacaciones en hacienda Ecuador',
    'hotel cerca del aeropuerto de Quito',
    'Hacienda Le Plus',
  ].join(', '),
  en: [
    'hacienda hotel Quito Ecuador',
    'eco resort Pintag Quito',
    'Antisana volcano lodging',
    'rural tourism Ecuador',
    'boutique hacienda stay Quito',
    'group accommodation Quito Ecuador',
    'Valle de los Chillos hotel resort',
    'nature retreat near Quito airport',
    'family and corporate lodging Ecuador',
    'Hacienda Le Plus Eco Club Resort',
  ].join(', '),
  pt: [
    'hospedagem em Quito Equador',
    'hotel fazenda Pintag Quito',
    'turismo rural Equador',
    'eco resort perto de Quito',
    'alojamento perto do vulcão Antisana',
    'hospedagem para grupos e famílias Quito',
    'Hacienda Le Plus',
  ].join(', '),
  fr: [
    'hébergement hacienda Quito Équateur',
    'éco resort Pintag Quito',
    'tourisme rural Équateur',
    'hôtel nature près du volcan Antisana',
    'séjour de groupe et famille Quito',
    'Hacienda Le Plus',
  ].join(', '),
  de: [
    'Hacienda Hotel Quito Ecuador',
    'Öko Resort Pintag Quito',
    'Landtourismus Ecuador Unterkunft',
    'Unterkunft nahe Vulkan Antisana',
    'Gruppenunterkunft und Naturhotel Quito',
    'Hacienda Le Plus',
  ].join(', '),
  zh: [
    '基多庄园酒店',
    '厄瓜多尔生态度假村',
    '安蒂萨纳火山附近住宿',
    '基多乡村旅游住宿',
    '平塔格度假庄园',
    'Hacienda Le Plus',
  ].join(', '),
};

interface RouteTourismSEO {
  primaryTitle: Record<SupportedLanguage, string>;
  midScrollTitle: Record<SupportedLanguage, string>;
  deepScrollTitle: Record<SupportedLanguage, string>;
  description: Record<SupportedLanguage, string>;
}

export const ROUTE_TOURISM_SEO: Record<string, RouteTourismSEO> = {
  '/': {
    primaryTitle: {
      es: 'Hacienda Le Plus | Hospedaje, Turismo Rural y Eco Resort en Píntag, Quito',
      en: 'Hacienda Le Plus | Hacienda Hotel, Eco Resort & Nature Tourism in Pintag, Quito',
      pt: 'Hacienda Le Plus | Hospedagem, Turismo Rural e Eco Resort em Píntag, Quito',
      fr: 'Hacienda Le Plus | Hôtel Hacienda, Éco-Resort & Tourisme Nature à Píntag, Quito',
      de: 'Hacienda Le Plus | Hacienda-Hotel, Öko-Resort & Naturtourismus in Píntag, Quito',
      zh: 'Hacienda Le Plus | 厄瓜多尔基多平塔格生态度假庄园与乡村旅游住宿',
    },
    midScrollTitle: {
      es: 'Suites, Habitaciones y Alojamiento Turístico en Píntag (81 Pax) | Hacienda Le Plus Quito',
      en: 'Suites, Rooms & Tourist Lodging in Pintag (81 Guests) | Hacienda Le Plus Quito',
      pt: 'Suítes, Quartos e Hospedagem Turística em Píntag (81 Hóspedes) | Hacienda Le Plus',
      fr: 'Suites, Chambres & Hébergement Touristique à Píntag (81 Hôtes) | Hacienda Le Plus',
      de: 'Suiten, Zimmer & Tourismus-Unterkunft in Píntag (81 Gäste) | Hacienda Le Plus',
      zh: '套房、客房与81人旅游住宿 | 基多平塔格 Hacienda Le Plus 庄园',
    },
    deepScrollTitle: {
      es: 'Turismo de Naturaleza, Piscina Temperada, Spa y 13.000 m² en Quito | Hacienda Le Plus',
      en: 'Nature Tourism, Heated Pool, Spa & 13,000 m² Gardens in Quito | Hacienda Le Plus',
      pt: 'Turismo de Natureza, Piscina Aquecida, Spa e 13.000 m² em Quito | Hacienda Le Plus',
      fr: 'Tourisme Nature, Piscine Chauffée, Spa & 13 000 m² à Quito | Hacienda Le Plus',
      de: 'Naturtourismus, Beheizter Pool, Spa & 13.000 m² in Quito | Hacienda Le Plus',
      zh: '自然生态旅游、恒温泳池、水疗与13,000平方米花园 | Hacienda Le Plus',
    },
    description: {
      es: 'Descubre Hacienda Le Plus en Píntag, Quito: eco resort y hospedaje turístico hasta 81 huéspedes (18 baños internos), suites matrimoniales, habitaciones grupales, piscina cubierta 84 m², spa, gastronomía propia y 13.000 m² de áreas verdes cerca del Volcán Antisana.',
      en: 'Discover Hacienda Le Plus in Pintag, Quito: eco-resort and tourist lodging for up to 81 guests (18 internal bathrooms), suites, 84 m² indoor pool, spa, private dining, and 13,000 m² of green areas near Antisana Volcano.',
      pt: 'Descubra a Hacienda Le Plus em Píntag, Quito: eco resort e hospedagem turística para até 81 hóspedes, suítes, piscina coberta de 84 m², spa, gastronomia própria e 13.000 m² de áreas verdes.',
      fr: 'Découvrez Hacienda Le Plus à Píntag, Quito : éco-resort et hébergement touristique jusqu’à 81 hôtes, suites, piscine couverte de 84 m², spa, gastronomie locale et 13 000 m² de jardins.',
      de: 'Entdecken Sie die Hacienda Le Plus in Píntag, Quito: Öko-Resort und Unterkunft für bis zu 81 Gäste, Suiten, 84 m² Hallenbad, Spa, eigene Gastronomie und 13.000 m² Grünflächen.',
      zh: '探索位于基多平塔格的 Hacienda Le Plus 生态度假庄园：可容纳81位宾客的旅游住宿、豪华套房、84平方米室内泳池、水疗中心、特色餐饮及13,000平方米花园绿地。',
    },
  },
  '/hospedaje': {
    primaryTitle: {
      es: 'Hospedaje en Píntag y Valle de los Chillos | Suites, Cabañas y Grupos (81 Pax) | Hacienda Le Plus',
      en: 'Lodging in Pintag & Quito Valley | Suites, Group Stays (81 Guests) & Eco Resort | Hacienda Le Plus',
      pt: 'Hospedagem em Píntag e Quito | Suítes, Casas e Grupos (81 Hóspedes) | Hacienda Le Plus',
      fr: 'Hébergement à Píntag & Quito | Suites, Séjours de Groupe (81 Hôtes) & Éco-Resort | Hacienda Le Plus',
      de: 'Unterkunft in Píntag & Quito | Suiten, Gruppenunterkunft (81 Gäste) & Öko-Resort | Hacienda Le Plus',
      zh: '基多平塔格旅游住宿 | 豪华套房与81人团体住宿 | Hacienda Le Plus 度假庄园',
    },
    midScrollTitle: {
      es: 'Habitaciones Panorámicas, Suites Matrimoniales y Casa Familiar en Quito | Hacienda Le Plus',
      en: 'Panoramic Rooms, Bridal Suites & Family House in Quito | Hacienda Le Plus',
      pt: 'Quartos Panorâmicos, Suítes de Casal e Casa Familiar em Quito | Hacienda Le Plus',
      fr: 'Chambres Panoramiques, Suites & Maison Familiale à Quito | Hacienda Le Plus',
      de: 'Panoramazimmer, Suiten & Familienhaus in Quito | Hacienda Le Plus',
      zh: '全景客房、情侣套房与家庭别墅 | 基多 Hacienda Le Plus',
    },
    deepScrollTitle: {
      es: 'Estadías con Piscina 84 m², Jacuzzi, Turco, Gastronomía y Canchas | Hacienda Le Plus Píntag',
      en: 'Stays with 84 m² Pool, Jacuzzi, Steam Room, Dining & Courts | Hacienda Le Plus Pintag',
      pt: 'Estadias com Piscina 84 m², Jacuzzi, Sauna, Gastronomia e Quadras | Hacienda Le Plus',
      fr: 'Séjours avec Piscine 84 m², Jacuzzi, Hammam, Restaurant & Terrains | Hacienda Le Plus',
      de: 'Aufenthalte mit 84 m² Pool, Whirlpool, Dampfbad, Restaurant & Sport | Hacienda Le Plus',
      zh: '包含84平方米泳池、按摩浴缸、蒸汽浴、餐饮与球场的度假住宿 | Hacienda Le Plus',
    },
    description: {
      es: 'Reserva tu hospedaje turístico en Hacienda Le Plus (Píntag, Quito): alojamiento para familias, parejas, turistas y grupos hasta 81 personas en 82 camas y 18 baños internos. Incluye Wi-Fi fibra óptica, restaurante, piscina de 84 m², jacuzzi, turco y canchas deportivas.',
      en: 'Book your tourist stay at Hacienda Le Plus (Pintag, Quito): lodging for families, couples, tourists, and groups up to 81 guests across 82 beds and 18 internal bathrooms. Includes fiber Wi-Fi, restaurant, 84 m² pool, spa, and sports courts.',
      pt: 'Reserve sua hospedagem turística na Hacienda Le Plus (Píntag, Quito): alojamento para famílias, casais, turistas e grupos de até 81 pessoas em 82 camas e 18 banheiros internos com piscina, spa e restaurante.',
      fr: 'Réservez votre hébergement touristique à Hacienda Le Plus (Píntag, Quito) : logement pour familles, couples et groupes jusqu’à 81 personnes (82 lits, 18 salles de bain internes), piscine, spa et restaurant.',
      de: 'Buchen Sie Ihre Unterkunft in der Hacienda Le Plus (Píntag, Quito): Tourismus- und Gruppenunterkunft für bis zu 81 Gäste (82 Betten, 18 Innenbäder) mit Glasfaser-WLAN, Restaurant, Pool und Spa.',
      zh: '预订基多平塔格 Hacienda Le Plus 庄园旅游住宿：适合家庭、情侣及多达81人团队的住宿（82张床位、18间内部卫浴），配备光纤Wi-Fi、餐厅、室内泳池与水疗设施。',
    },
  },
  '/bodas': {
    primaryTitle: {
      es: 'Bodas Destino, Turismo Nupcial y Hospedaje en Píntag, Quito | Hacienda Le Plus',
      en: 'Destination Weddings & Guest Lodging in Pintag, Quito | Hacienda Le Plus Eco Resort',
      pt: 'Casamentos no Campo e Hospedagem para Convidados em Píntag, Quito | Hacienda Le Plus',
      fr: 'Mariages Champêtres & Hébergement des Invités à Píntag, Quito | Hacienda Le Plus',
      de: 'Landhochzeiten & Gästeunterkunft in Píntag, Quito | Hacienda Le Plus',
      zh: '基多平塔格目的地婚礼与宾客庄园住宿 | Hacienda Le Plus',
    },
    midScrollTitle: {
      es: 'Hacienda para Bodas Campestres hasta 1.000 Invitados en Quito | Hacienda Le Plus',
      en: 'Countryside Wedding Venue up to 1,000 Guests in Quito | Hacienda Le Plus',
      pt: 'Fazenda para Casamentos até 1.000 Convidados em Quito | Hacienda Le Plus',
      fr: 'Domaine de Mariage jusqu’à 1 000 Invités à Quito | Hacienda Le Plus',
      de: 'Hochzeitslocation für bis zu 1.000 Gäste in Quito | Hacienda Le Plus',
      zh: '可容纳1,000位宾客的基多乡村婚礼庄园 | Hacienda Le Plus',
    },
    deepScrollTitle: {
      es: 'Suite Nupcial y Hospedaje Turístico para 81 Invitados de Boda | Hacienda Le Plus Píntag',
      en: 'Bridal Suite & Tourist Lodging for 81 Wedding Guests | Hacienda Le Plus Pintag',
      pt: 'Suíte Nupcial e Hospedagem Turística para 81 Convidados | Hacienda Le Plus Píntag',
      fr: 'Suite Nuptiale & Hébergement Touristique pour 81 Invités | Hacienda Le Plus Píntag',
      de: 'Hochzeitssuite & Gästeunterkunft für 81 Hochzeitsgäste | Hacienda Le Plus Píntag',
      zh: '新娘套房与81位婚礼宾客旅游住宿 | Hacienda Le Plus',
    },
    description: {
      es: 'Celebra tu boda destino en Hacienda Le Plus (Píntag, Quito): turismo nupcial con 13.000 m² de áreas verdes para carpas gigantes hasta 1.000 invitados, 20 baños externos, suite nupcial y hospedaje exclusivo para 81 familiares e invitados.',
      en: 'Celebrate your destination wedding at Hacienda Le Plus (Pintag, Quito): 13,000 m² of green gardens for giant tents up to 1,000 guests, 20 external restrooms, bridal suite, and on-site tourist lodging for 81 guests.',
      pt: 'Celebre seu casamento na Hacienda Le Plus (Píntag, Quito): 13.000 m² de jardins para tendas gigantes até 1.000 convidados, 20 banheiros externos, suíte nupcial e hospedagem para 81 hóspedes.',
      fr: 'Célébrez votre mariage à Hacienda Le Plus (Píntag, Quito) : 13 000 m² de jardins pour chapiteaux jusqu’à 1 000 invités, 20 toilettes externes, suite nuptiale et hébergement pour 81 personnes.',
      de: 'Feiern Sie Ihre Traumhochzeit in der Hacienda Le Plus (Píntag, Quito): 13.000 m² Gärten für Festzelte bis 1.000 Gäste, 20 Außenbäder, Hochzeitssuite und Unterkunft für 81 Gäste.',
      zh: '在基多平塔格 Hacienda Le Plus 举办目的地婚礼：13,000平方米草坪可搭建容纳1,000人的巨型帐篷，配备20间外部卫浴、新娘套房及81人宾客住宿。',
    },
  },
  '/corporativo': {
    primaryTitle: {
      es: 'Turismo Corporativo, Retiros y Hospedaje de Grupos en Quito – Píntag | Hacienda Le Plus',
      en: 'Corporate Tourism, Retreats & Group Lodging in Quito – Pintag | Hacienda Le Plus',
      pt: 'Turismo Corporativo, Retiros e Hospedagem de Grupos em Quito – Píntag | Hacienda Le Plus',
      fr: 'Tourisme d’Affaires, Séminaires & Hébergement de Groupe à Quito – Píntag | Hacienda Le Plus',
      de: 'Geschäftstourismus, Retreats & Gruppenunterkunft in Quito – Píntag | Hacienda Le Plus',
      zh: '基多平塔格商务旅游、企业团建与团队住宿 | Hacienda Le Plus',
    },
    midScrollTitle: {
      es: 'Convivencias Empresariales, Eventos hasta 1.000 Personas y Áreas Verdes | Hacienda Le Plus',
      en: 'Team Building, Outdoor Events up to 1,000 People & Green Areas | Hacienda Le Plus',
      pt: 'Integração Empresarial, Eventos até 1.000 Pessoas e Áreas Verdes | Hacienda Le Plus',
      fr: 'Team Building, Événements jusqu’à 1 000 Personnes & Espaces Verts | Hacienda Le Plus',
      de: 'Teambuilding, Events bis 1.000 Personen & Grünflächen | Hacienda Le Plus',
      zh: '企业团建、1,000人户外活动与生态绿地 | Hacienda Le Plus',
    },
    deepScrollTitle: {
      es: 'Hospedaje para Delegaciones, ONGs y Equipos (81 Pax) cerca de Quito | Hacienda Le Plus',
      en: 'Lodging for Delegations, NGOs & Teams (81 Guests) near Quito | Hacienda Le Plus',
      pt: 'Hospedagem para Delegações, ONGs e Equipes (81 Hóspedes) perto de Quito | Hacienda Le Plus',
      fr: 'Hébergement pour Délégations, ONG & Équipes (81 Hôtes) près de Quito | Hacienda Le Plus',
      de: 'Unterkunft für Delegationen, NGOs & Teams (81 Gäste) nahe Quito | Hacienda Le Plus',
      zh: '基多附近代表团、非政府组织与81人团队住宿 | Hacienda Le Plus',
    },
    description: {
      es: 'Turismo corporativo, convivencias y hospedaje de delegaciones en Hacienda Le Plus (Píntag, Quito): alojamiento turístico para 81 participantes, eventos en áreas verdes hasta 1.000 personas, Wi-Fi fibra óptica, gastronomía, piscina, spa y canchas.',
      en: 'Corporate tourism, retreats, and delegation lodging at Hacienda Le Plus (Pintag, Quito): accommodation for 81 guests, outdoor events up to 1,000 attendees, fiber Wi-Fi, dining, pool, spa, and sports facilities.',
      pt: 'Turismo corporativo, retiros e hospedagem de delegações na Hacienda Le Plus (Píntag, Quito): alojamento para 81 participantes, eventos até 1.000 pessoas, Wi-Fi fibra óptica e lazer completo.',
      fr: 'Tourisme d’affaires, séminaires et hébergement de délégations à Hacienda Le Plus (Píntag, Quito) : logement pour 81 participants, événements jusqu’à 1 000 personnes, Wi-Fi fibre et détente.',
      de: 'Geschäftstourismus, Retreats und Delegationsunterkunft in der Hacienda Le Plus (Píntag, Quito): Unterkunft für 81 Teilnehmer, Events bis 1.000 Personen, Glasfaser-WLAN und Sportanlagen.',
      zh: '基多平塔格 Hacienda Le Plus 商务旅游与代表团住宿：可容纳81人住宿、1,000人户外活动，提供光纤网络、餐饮与休闲运动设施。',
    },
  },
  '/contacto': {
    primaryTitle: {
      es: 'Reservas de Hospedaje y Ubicación Turística en Píntag, Quito | Hacienda Le Plus',
      en: 'Lodging Reservations & Tourist Location in Pintag, Quito | Hacienda Le Plus',
      pt: 'Reservas de Hospedagem e Localização Turística em Píntag, Quito | Hacienda Le Plus',
      fr: 'Réservations d’Hébergement & Localisation Touristique à Píntag, Quito | Hacienda Le Plus',
      de: 'Unterkunftsreservierung & Touristische Lage in Píntag, Quito | Hacienda Le Plus',
      zh: '住宿预订与基多平塔格旅游位置指南 | Hacienda Le Plus',
    },
    midScrollTitle: {
      es: 'Cómo Llegar a Hacienda Le Plus (Ruta al Antisana, Píntag – Quito) | Mapa y Contacto',
      en: 'How to Get to Hacienda Le Plus (Antisana Route, Pintag – Quito) | Map & Contact',
      pt: 'Como Chegar à Hacienda Le Plus (Rota Antisana, Píntag – Quito) | Mapa e Contato',
      fr: 'Comment Venir à Hacienda Le Plus (Route Antisana, Píntag – Quito) | Carte & Contact',
      de: 'Anfahrt zur Hacienda Le Plus (Antisana-Route, Píntag – Quito) | Karte & Kontakt',
      zh: '如何前往基多平塔格 Hacienda Le Plus（毗邻安蒂萨纳火山路线）| 地图与联系方式',
    },
    deepScrollTitle: {
      es: 'Cotiza tu Estadía o Evento por WhatsApp 0969817891 | Hacienda Le Plus Quito',
      en: 'Quote Your Stay or Event via WhatsApp +593 96 981 7891 | Hacienda Le Plus Quito',
      pt: 'Faça sua Cotação via WhatsApp +593 96 981 7891 | Hacienda Le Plus Quito',
      fr: 'Demandez un Devis via WhatsApp +593 96 981 7891 | Hacienda Le Plus Quito',
      de: 'Angebot per WhatsApp +593 96 981 7891 anfordern | Hacienda Le Plus Quito',
      zh: '通过 WhatsApp +593 96 981 7891 预订您的庄园住宿 | Hacienda Le Plus',
    },
    description: {
      es: 'Cotiza y reserva tu hospedaje o estadía turística en Hacienda Le Plus. Ubicados en Barrio San Juan de la Tola, Calle Deus N.º 100, Píntag (a 40 min de Quito y 30 min del Aeropuerto Mariscal Sucre, ruta turística al Volcán Antisana).',
      en: 'Quote and book your tourist stay or event at Hacienda Le Plus. Located in San Juan de la Tola, Calle Deus N° 100, Pintag (40 min from Quito and 30 min from Quito Airport, near Antisana Volcano).',
      pt: 'Faça sua cotação e reserve sua hospedagem turística na Hacienda Le Plus em Píntag, Quito (a 40 min de Quito e 30 min do Aeroporto Internacional Mariscal Sucre).',
      fr: 'Réservez votre séjour touristique à Hacienda Le Plus à Píntag, Quito (à 40 min de Quito et 30 min de l’aéroport Mariscal Sucre, sur la route du volcan Antisana).',
      de: 'Buchen Sie Ihren Aufenthalt in der Hacienda Le Plus in Píntag, Quito (40 Min. von Quito und 30 Min. vom Flughafen entfernt, nahe dem Vulkan Antisana).',
      zh: '预订基多平塔格 Hacienda Le Plus 庄园旅游住宿（距基多市区40分钟，距基多国际机场30分钟，毗邻安蒂萨纳火山生态路线）。',
    },
  },
};

const AWAY_TAB_TITLES: Record<SupportedLanguage, string> = {
  es: '🌿 Reserva tu Hospedaje en Píntag, Quito | Hacienda Le Plus',
  en: '🌿 Book Your Nature Stay in Quito | Hacienda Le Plus',
  pt: '🌿 Reserve sua Hospedagem em Quito | Hacienda Le Plus',
  fr: '🌿 Réservez votre Séjour à Quito | Hacienda Le Plus',
  de: '🌿 Buchen Sie Ihren Aufenthalt in Quito | Hacienda Le Plus',
  zh: '🌿 预订您的基多生态庄园住宿 | Hacienda Le Plus',
};

/**
 * Updates document title (dynamically by route, scroll depth, and tab visibility),
 * html lang, meta description, tourism keywords, hreflang (all 6 languages), and OpenGraph tags.
 */
export function useDocumentMeta({
  title,
  description,
  canonicalPath = '/',
  lang = 'es',
  title_en,
  description_en,
}: PageMetaOptions) {
  useEffect(() => {
    const normalizedLang: SupportedLanguage = VALID_LANGS.includes(lang as SupportedLanguage)
      ? (lang as SupportedLanguage)
      : 'es';

    const routeSEO = ROUTE_TOURISM_SEO[canonicalPath];

    const fallbackTitle = title_en
      ? tr(title_en, title, normalizedLang)
      : tr(title, title, normalizedLang);
    const fallbackDescription = description_en
      ? tr(description_en, description, normalizedLang)
      : tr(description, description, normalizedLang);

    const primaryTitle = routeSEO?.primaryTitle[normalizedLang] || fallbackTitle;
    const midScrollTitle = routeSEO?.midScrollTitle[normalizedLang] || primaryTitle;
    const deepScrollTitle = routeSEO?.deepScrollTitle[normalizedLang] || primaryTitle;
    const effectiveDescription = routeSEO?.description[normalizedLang] || fallbackDescription;
    const effectiveKeywords = TOURISM_SEO_KEYWORDS[normalizedLang] || TOURISM_SEO_KEYWORDS.es;

    const getScrollDynamicTitle = (): string => {
      if (typeof window === 'undefined') return primaryTitle;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      if (scrollY < 500) return primaryTitle;
      if (scrollY < 1600) return midScrollTitle;
      return deepScrollTitle;
    };

    // 1. Dynamic document.title
    document.title = getScrollDynamicTitle();

    // 2. Dynamic html lang attribute
    document.documentElement.lang = normalizedLang;

    // 3. Meta tags helper
    const setMeta = (selector: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.startsWith('meta[name="')) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          if (name) el.setAttribute('name', name);
        } else if (selector.startsWith('meta[property="')) {
          const property = selector.match(/property="([^"]+)"/)?.[1];
          if (property) el.setAttribute('property', property);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const fullCanonicalUrl = `https://www.haciendaleplus.com${canonicalPath === '/' ? '/' : canonicalPath}`;

    setMeta(
      'meta[name="robots"]',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
    setMeta('meta[name="description"]', effectiveDescription);
    setMeta('meta[name="keywords"]', effectiveKeywords);
    setMeta('meta[property="og:title"]', primaryTitle);
    setMeta('meta[property="og:description"]', effectiveDescription);
    setMeta('meta[property="og:url"]', fullCanonicalUrl);
    const localeMap: Record<string, string> = {
      es: 'es_EC',
      en: 'en_US',
      pt: 'pt_BR',
      fr: 'fr_FR',
      de: 'de_DE',
      zh: 'zh_CN',
    };
    setMeta('meta[property="og:locale"]', localeMap[normalizedLang] || 'es_EC');
    setMeta('meta[name="twitter:title"]', primaryTitle);
    setMeta('meta[name="twitter:description"]', effectiveDescription);

    // 4. Canonical link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', fullCanonicalUrl);

    // 5. Hreflang alternates for all 6 supported languages
    const setHreflang = (hreflang: string, href: string) => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hreflang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    setHreflang('es', fullCanonicalUrl);
    setHreflang('en', `${fullCanonicalUrl}?lang=en`);
    setHreflang('pt', `${fullCanonicalUrl}?lang=pt`);
    setHreflang('fr', `${fullCanonicalUrl}?lang=fr`);
    setHreflang('de', `${fullCanonicalUrl}?lang=de`);
    setHreflang('zh', `${fullCanonicalUrl}?lang=zh`);
    setHreflang('x-default', fullCanonicalUrl);

    // 6. Scroll & tab-visibility listeners for dynamic titles
    let rafId: number | null = null;
    const handleScroll = () => {
      if (document.hidden || rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const nextTitle = getScrollDynamicTitle();
        if (document.title !== nextTitle) {
          document.title = nextTitle;
        }
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = AWAY_TAB_TITLES[normalizedLang] || AWAY_TAB_TITLES.es;
      } else {
        document.title = getScrollDynamicTitle();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [title, description, canonicalPath, lang, title_en, description_en]);
}
