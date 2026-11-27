import { useEffect } from 'react';
import { tr } from '../i18n/phraseDictionary';
import { SupportedLanguage } from '../i18n/types';

export const SITE_URL = 'https://www.haciendaleplus.com';

interface PageMetaOptions {
  title: string;
  description: string;
  canonicalPath?: string;
  lang?: string;
  title_en?: string;
  description_en?: string;
}

const VALID_LANGS: SupportedLanguage[] = ['es', 'en', 'pt', 'fr', 'de', 'zh'];

export const ROUTE_OG_IMAGES: Record<string, { url: string; alt: Record<SupportedLanguage, string> }> = {
  '/': {
    url: `${SITE_URL}/images/og/hacienda-le-plus-home.jpg`,
    alt: {
      es: 'Hacienda Le Plus en Quito–Píntag: hospedaje larga estadía, eventos corporativos y bodas campestres',
      en: 'Hacienda Le Plus in Quito–Pintag: corporate long-stay lodging, major events, and destination weddings',
      pt: 'Hacienda Le Plus em Quito–Píntag: hospedagem, eventos corporativos e casamentos no campo',
      fr: 'Hacienda Le Plus à Quito–Píntag : hébergement de groupe, événements d’entreprise et mariages',
      de: 'Hacienda Le Plus in Quito–Píntag: Gruppenunterkunft, Firmenevents und Landhochzeiten',
      zh: '基多平塔格 Hacienda Le Plus 庄园：长期住宿、企业大型活动与目的地婚礼',
    },
  },
  '/hospedaje': {
    url: `${SITE_URL}/images/og/hacienda-le-plus-hospedaje.jpg`,
    alt: {
      es: 'Suites, habitaciones grupales y hospedaje para hasta 81 personas en Hacienda Le Plus, Quito–Píntag',
      en: 'Suites, group rooms, and long-stay lodging for up to 81 guests at Hacienda Le Plus, Quito–Pintag',
      pt: 'Suítes, quartos e hospedagem para até 81 pessoas na Hacienda Le Plus em Quito–Píntag',
      fr: 'Suites, chambres de groupe et hébergement jusqu’à 81 personnes à Hacienda Le Plus, Quito–Píntag',
      de: 'Suiten, Gruppenzimmer und Langzeitunterkunft für bis zu 81 Gäste in der Hacienda Le Plus',
      zh: '基多平塔格 Hacienda Le Plus 庄园豪华套房与81人团队长期住宿',
    },
  },
  '/bodas': {
    url: `${SITE_URL}/images/og/hacienda-le-plus-bodas.jpg`,
    alt: {
      es: 'Bodas campestres y bodas destino en 13.000 m² de jardines en Hacienda Le Plus, Quito–Píntag',
      en: 'Countryside and destination weddings across 13,000 m² of gardens at Hacienda Le Plus, Quito–Pintag',
      pt: 'Casamentos no campo em 13.000 m² de jardins na Hacienda Le Plus, Quito–Píntag',
      fr: 'Mariages champêtres et mariages de destination dans 13 000 m² de jardins à Hacienda Le Plus',
      de: 'Landhochzeiten auf 13.000 m² Gartenanlage in der Hacienda Le Plus, Quito–Píntag',
      zh: '基多平塔格 Hacienda Le Plus 13,000平方米花园目的地婚礼庄园',
    },
  },
  '/corporativo': {
    url: `${SITE_URL}/images/og/hacienda-le-plus-corporativo.jpg`,
    alt: {
      es: 'Grandes eventos corporativos, convenciones y team building hasta 1.000 personas en Hacienda Le Plus',
      en: 'Major corporate events, conventions, and team building up to 1,000 guests at Hacienda Le Plus',
      pt: 'Grandes eventos corporativos, convenções e integrações até 1.000 pessoas na Hacienda Le Plus',
      fr: 'Grands événements d’entreprise, conventions et séminaires jusqu’à 1 000 personnes à Hacienda Le Plus',
      de: 'Firmenevents, Tagungen und Teambuilding bis zu 1.000 Personen in der Hacienda Le Plus',
      zh: '基多平塔格 Hacienda Le Plus 企业年会、团建与千人大型会议场地',
    },
  },
  '/contacto': {
    url: `${SITE_URL}/images/og/hacienda-le-plus-contacto.jpg`,
    alt: {
      es: 'Ubicación y reservas directas de Hacienda Le Plus en Píntag, Valle de los Chillos, Quito',
      en: 'Location and direct bookings for Hacienda Le Plus in Pintag, Valle de los Chillos, Quito',
      pt: 'Localização e reservas diretas da Hacienda Le Plus em Píntag, Quito',
      fr: 'Emplacement et réservations directes à Hacienda Le Plus, Píntag, Quito',
      de: 'Lage und direkte Buchung der Hacienda Le Plus in Píntag, Quito',
      zh: '基多平塔格 Hacienda Le Plus 位置指南与直接预订联系',
    },
  },
};

export const TOURISM_SEO_KEYWORDS: Record<SupportedLanguage, string> = {
  es: [
    'hacienda en Pintag Quito',
    'hacienda para eventos en Quito',
    'hacienda para bodas en Quito',
    'hospedaje larga estadía empresas Quito',
    'hospedaje para grupos y delegaciones Quito',
    'hacienda eventos corporativos Valle de los Chillos',
    'salón de eventos campestre Quito',
    'eco resort Quito Antisana',
    'alojamiento cerca del aeropuerto de Quito',
    'hacienda para bodas campestres Pichincha',
    'retiros empresariales y team building Quito',
    'hotel hacienda con piscina y spa Pintag',
    'Hacienda Le Plus',
  ].join(', '),
  en: [
    'hacienda hotel Quito Ecuador',
    'corporate long stay lodging Quito',
    'group accommodation Quito Ecuador 81 guests',
    'destination wedding venue Quito Ecuador',
    'corporate event venue Pintag Quito',
    'eco resort near Quito airport Antisana',
    'NGO delegation lodging Quito',
    'Hacienda Le Plus Eco Club Resort',
  ].join(', '),
  pt: [
    'hotel fazenda Quito Equador',
    'hospedagem para grupos e empresas Quito',
    'eventos corporativos e casamentos Quito',
    'eco resort Pintag perto do aeroporto Quito',
    'Hacienda Le Plus',
  ].join(', '),
  fr: [
    'hôtel hacienda Quito Équateur',
    'hébergement longue durée groupes Quito',
    'lieu de mariage et séminaires Quito',
    'éco-resort Pintag près de l’aéroport de Quito',
    'Hacienda Le Plus',
  ].join(', '),
  de: [
    'Hacienda Hotel Quito Ecuador',
    'Gruppenunterkunft und Firmenunterkunft Quito',
    'Hochzeitslocation und Firmenevents Quito',
    'Öko-Resort Pintag nahe Flughafen Quito',
    'Hacienda Le Plus',
  ].join(', '),
  zh: [
    '基多庄园酒店',
    '基多企业团队长期住宿',
    '厄瓜多尔目的地婚礼庄园',
    '基多大型会议团建场地',
    '安蒂萨纳火山生态度假村',
    'Hacienda Le Plus',
  ].join(', '),
};

interface RouteTourismSEO {
  primaryTitle: Record<SupportedLanguage, string>;
  midScrollTitle: Record<SupportedLanguage, string>;
  deepScrollTitle: Record<SupportedLanguage, string>;
  description: Record<SupportedLanguage, string>;
  keywords?: Record<SupportedLanguage, string>;
}

export const ROUTE_TOURISM_SEO: Record<string, RouteTourismSEO> = {
  '/': {
    primaryTitle: {
      es: 'Hacienda Le Plus Quito–Píntag | Hospedaje, Eventos y Bodas',
      en: 'Hacienda Le Plus Quito–Pintag | Group Lodging, Events & Weddings',
      pt: 'Hacienda Le Plus Quito–Píntag | Hospedagem, Eventos e Casamentos',
      fr: 'Hacienda Le Plus Quito–Píntag | Hébergement, Événements & Mariages',
      de: 'Hacienda Le Plus Quito–Píntag | Unterkunft, Events & Hochzeiten',
      zh: 'Hacienda Le Plus 基多平塔格庄园 | 团队住宿、大型活动与婚礼',
    },
    midScrollTitle: {
      es: 'Hacienda Le Plus Quito–Píntag | Hospedaje, Eventos y Bodas',
      en: 'Hacienda Le Plus Quito–Pintag | Group Lodging, Events & Weddings',
      pt: 'Hacienda Le Plus Quito–Píntag | Hospedagem, Eventos e Casamentos',
      fr: 'Hacienda Le Plus Quito–Píntag | Hébergement, Événements & Mariages',
      de: 'Hacienda Le Plus Quito–Píntag | Unterkunft, Events & Hochzeiten',
      zh: 'Hacienda Le Plus 基多平塔格庄园 | 团队住宿、大型活动与婚礼',
    },
    deepScrollTitle: {
      es: 'Hacienda Le Plus Quito–Píntag | Hospedaje, Eventos y Bodas',
      en: 'Hacienda Le Plus Quito–Pintag | Group Lodging, Events & Weddings',
      pt: 'Hacienda Le Plus Quito–Píntag | Hospedagem, Eventos e Casamentos',
      fr: 'Hacienda Le Plus Quito–Píntag | Hébergement, Événements & Mariages',
      de: 'Hacienda Le Plus Quito–Píntag | Unterkunft, Events & Hochzeiten',
      zh: 'Hacienda Le Plus 基多平塔格庄园 | 团队住宿、大型活动与婚礼',
    },
    description: {
      es: 'Hacienda privada en Quito–Píntag a 30 min del aeropuerto: hospedaje de larga estadía hasta 81 personas, grandes eventos corporativos y bodas hasta 1.000 invitados en 13.000 m² con piscina, spa y gastronomía.',
      en: 'Private eco-resort hacienda in Quito–Pintag, 30 min from Quito Airport: long-stay group lodging up to 81 guests, corporate events, and weddings up to 1,000 guests across 13,000 m² with indoor pool and spa.',
      pt: 'Fazenda eco-resort privada em Quito–Píntag, a 30 min do aeroporto: hospedagem para grupos até 81 pessoas, eventos corporativos e casamentos até 1.000 convidados em 13.000 m² com piscina e spa.',
      fr: 'Domaine éco-resort privé à Quito–Píntag, à 30 min de l’aéroport : hébergement longue durée jusqu’à 81 hôtes, événements d’entreprise et mariages jusqu’à 1 000 invités dans 13 000 m² avec piscine et spa.',
      de: 'Privates Öko-Resort in Quito–Píntag, 30 Min. vom Flughafen: Gruppenunterkunft bis 81 Gäste, Firmenevents und Hochzeiten bis 1.000 Gäste auf 13.000 m² mit Hallenbad und Spa.',
      zh: '位于基多平塔格的私密生态庄园，距基多机场30分钟：可容纳81人的长期团队住宿、1,000人企业活动与婚礼场地，拥有13,000平方米花园、恒温泳池及水疗。',
    },
  },
  '/hospedaje': {
    primaryTitle: {
      es: 'Hospedaje Larga Estadía y Grupos en Quito (81 Pax) | Hacienda Le Plus',
      en: 'Long-Stay & Group Lodging in Quito–Pintag (81 Guests) | Hacienda Le Plus',
      pt: 'Hospedagem para Grupos e Empresas em Quito (81 Pax) | Hacienda Le Plus',
      fr: 'Hébergement Longue Durée & Groupes à Quito (81 Hôtes) | Hacienda Le Plus',
      de: 'Gruppen- & Langzeitunterkunft in Quito (81 Gäste) | Hacienda Le Plus',
      zh: '基多平塔格81人团队与企业长期住宿 | Hacienda Le Plus',
    },
    midScrollTitle: {
      es: 'Hospedaje Larga Estadía y Grupos en Quito (81 Pax) | Hacienda Le Plus',
      en: 'Long-Stay & Group Lodging in Quito–Pintag (81 Guests) | Hacienda Le Plus',
      pt: 'Hospedagem para Grupos e Empresas em Quito (81 Pax) | Hacienda Le Plus',
      fr: 'Hébergement Longue Durée & Groupes à Quito (81 Hôtes) | Hacienda Le Plus',
      de: 'Gruppen- & Langzeitunterkunft in Quito (81 Gäste) | Hacienda Le Plus',
      zh: '基多平塔格81人团队与企业长期住宿 | Hacienda Le Plus',
    },
    deepScrollTitle: {
      es: 'Hospedaje Larga Estadía y Grupos en Quito (81 Pax) | Hacienda Le Plus',
      en: 'Long-Stay & Group Lodging in Quito–Pintag (81 Guests) | Hacienda Le Plus',
      pt: 'Hospedagem para Grupos e Empresas em Quito (81 Pax) | Hacienda Le Plus',
      fr: 'Hébergement Longue Durée & Groupes à Quito (81 Hôtes) | Hacienda Le Plus',
      de: 'Gruppen- & Langzeitunterkunft in Quito (81 Gäste) | Hacienda Le Plus',
      zh: '基多平塔格81人团队与企业长期住宿 | Hacienda Le Plus',
    },
    description: {
      es: 'Alojamiento para empresas, delegaciones, ONGs y familias en Píntag, Quito: capacidad hasta 81 personas en 82 camas y 18 baños internos, alimentación completa, fibra óptica, piscina 84 m², spa y 100 parqueaderos.',
      en: 'Corporate, NGO delegation, and family lodging in Pintag, Quito: up to 81 guests across 82 beds and 18 internal bathrooms, full-board dining, fiber Wi-Fi, 84 m² indoor pool, spa, and 100 private parking spaces.',
      pt: 'Hospedagem para empresas, delegações, ONGs e famílias em Píntag, Quito: até 81 pessoas em 82 camas e 18 banheiros internos, alimentação completa, Wi-Fi fibra, piscina 84 m² e spa.',
      fr: 'Hébergement pour entreprises, délégations, ONG et familles à Píntag, Quito : jusqu’à 81 personnes (82 lits, 18 salles de bain internes), pension complète, fibre optique, piscine 84 m² et spa.',
      de: 'Unterkunft für Firmen, Delegationen, NGOs und Familien in Píntag, Quito: bis zu 81 Gäste (82 Betten, 18 Innenbäder), Vollpension, Glasfaser-WLAN, 84 m² Pool und Spa.',
      zh: '基多平塔格企业、非政府组织、代表团及家庭住宿：可容纳81人（82张床位、18间内部卫浴），提供全餐服务、光纤Wi-Fi、84平方米室内泳池、水疗与百车位停车场。',
    },
    keywords: {
      es: 'hospedaje larga estadía Quito, alojamiento para empresas Pintag, hospedaje para delegaciones y ONGs Ecuador, suites y habitaciones grupales Quito, hotel hacienda 81 personas Pichincha, alojamiento cerca aeropuerto Quito',
      en: 'long stay lodging Quito, corporate accommodation Ecuador, NGO group housing Quito, Pintag hacienda suites, lodging near Quito airport',
      pt: 'hospedagem longa estadia Quito, alojamento empresas delegações Equador, hotel fazenda Pintag',
      fr: 'hébergement longue durée Quito, logement groupes délégations Équateur, hacienda Pintag',
      de: 'Langzeitunterkunft Quito, Firmenunterkunft Gruppenunterkunft Ecuador, Hacienda Pintag',
      zh: '基多长期住宿, 厄瓜多尔企业团队住宿, 基多机场附近庄园酒店',
    },
  },
  '/bodas': {
    primaryTitle: {
      es: 'Hacienda para Bodas Campestres en Quito–Píntag | Hacienda Le Plus',
      en: 'Countryside & Destination Wedding Venue in Quito | Hacienda Le Plus',
      pt: 'Fazenda para Casamentos no Campo em Quito–Píntag | Hacienda Le Plus',
      fr: 'Domaine de Mariage Champêtre à Quito–Píntag | Hacienda Le Plus',
      de: 'Hochzeitslocation & Landhochzeiten in Quito–Píntag | Hacienda Le Plus',
      zh: '基多平塔格乡村与目的地婚礼庄园 | Hacienda Le Plus',
    },
    midScrollTitle: {
      es: 'Hacienda para Bodas Campestres en Quito–Píntag | Hacienda Le Plus',
      en: 'Countryside & Destination Wedding Venue in Quito | Hacienda Le Plus',
      pt: 'Fazenda para Casamentos no Campo em Quito–Píntag | Hacienda Le Plus',
      fr: 'Domaine de Mariage Champêtre à Quito–Píntag | Hacienda Le Plus',
      de: 'Hochzeitslocation & Landhochzeiten in Quito–Píntag | Hacienda Le Plus',
      zh: '基多平塔格乡村与目的地婚礼庄园 | Hacienda Le Plus',
    },
    deepScrollTitle: {
      es: 'Hacienda para Bodas Campestres en Quito–Píntag | Hacienda Le Plus',
      en: 'Countryside & Destination Wedding Venue in Quito | Hacienda Le Plus',
      pt: 'Fazenda para Casamentos no Campo em Quito–Píntag | Hacienda Le Plus',
      fr: 'Domaine de Mariage Champêtre à Quito–Píntag | Hacienda Le Plus',
      de: 'Hochzeitslocation & Landhochzeiten in Quito–Píntag | Hacienda Le Plus',
      zh: '基多平塔格乡村与目的地婚礼庄园 | Hacienda Le Plus',
    },
    description: {
      es: 'Celebra tu boda campestre o boda destino en Píntag, Quito: 13.000 m² de jardines para carpas de gala hasta 1.000 invitados, 20 baños externos, banquete propio, suite nupcial y hospedaje para 81 invitados.',
      en: 'Celebrate your countryside or destination wedding in Pintag, Quito: 13,000 m² of lush gardens for gala tents up to 1,000 guests, 20 external restrooms, bespoke catering, bridal suite, and lodging for 81 guests.',
      pt: 'Celebre seu casamento no campo em Píntag, Quito: 13.000 m² de jardins para tendas até 1.000 convidados, 20 banheiros externos, buffet próprio, suíte nupcial e hospedagem para 81 convidados.',
      fr: 'Célébrez votre mariage champêtre à Píntag, Quito : 13 000 m² de jardins pour chapiteaux jusqu’à 1 000 invités, 20 toilettes externes, traiteur privé, suite nuptiale et hébergement pour 81 invités.',
      de: 'Feiern Sie Ihre Traumhochzeit in Píntag, Quito: 13.000 m² Gärten für Festzelte bis 1.000 Gäste, 20 Außenbäder, Catering, Hochzeitssuite und Unterkunft für 81 Hochzeitsgäste.',
      zh: '在基多平塔格举办您的乡村或目的地婚礼：13,000平方米草坪可搭千人礼堂帐篷，配备20间外部卫浴、定制宴会餐饮、新娘套房及81位宾客住宿。',
    },
    keywords: {
      es: 'hacienda para bodas en Quito, bodas campestres Pintag, bodas Valle de los Chillos, recepción de matrimonio al aire libre Quito, hacienda bodas con hospedaje Ecuador, bodas destino Quito',
      en: 'wedding venue Quito Ecuador, destination wedding hacienda Pintag, outdoor wedding reception Quito, wedding venue with guest lodging Ecuador',
      pt: 'fazenda para casamento Quito, casamento no campo Equador, espaço de eventos Pintag',
      fr: 'domaine de mariage Quito Équateur, mariage champêtre Pintag, réception mariage jardin',
      de: 'Hochzeitslocation Quito Ecuador, Landhochzeit Pintag, Hochzeitsfeier mit Unterkunft',
      zh: '基多婚礼庄园, 厄瓜多尔户外婚礼场地, 目的地婚礼住宿',
    },
  },
  '/corporativo': {
    primaryTitle: {
      es: 'Hacienda para Eventos Corporativos en Quito | Hacienda Le Plus',
      en: 'Corporate Event Venue, Retreats & Conventions Quito | Hacienda Le Plus',
      pt: 'Eventos Corporativos, Convenções e Retiros em Quito | Hacienda Le Plus',
      fr: 'Événements d’Entreprise, Séminaires & Team Building Quito | Le Plus',
      de: 'Firmenevents, Tagungen & Teambuilding in Quito | Hacienda Le Plus',
      zh: '基多企业大型活动、年会与团建庄园 | Hacienda Le Plus',
    },
    midScrollTitle: {
      es: 'Hacienda para Eventos Corporativos en Quito | Hacienda Le Plus',
      en: 'Corporate Event Venue, Retreats & Conventions Quito | Hacienda Le Plus',
      pt: 'Eventos Corporativos, Convenções e Retiros em Quito | Hacienda Le Plus',
      fr: 'Événements d’Entreprise, Séminaires & Team Building Quito | Le Plus',
      de: 'Firmenevents, Tagungen & Teambuilding in Quito | Hacienda Le Plus',
      zh: '基多企业大型活动、年会与团建庄园 | Hacienda Le Plus',
    },
    deepScrollTitle: {
      es: 'Hacienda para Eventos Corporativos en Quito | Hacienda Le Plus',
      en: 'Corporate Event Venue, Retreats & Conventions Quito | Hacienda Le Plus',
      pt: 'Eventos Corporativos, Convenções e Retiros em Quito | Hacienda Le Plus',
      fr: 'Événements d’Entreprise, Séminaires & Team Building Quito | Le Plus',
      de: 'Firmenevents, Tagungen & Teambuilding in Quito | Hacienda Le Plus',
      zh: '基多企业大型活动、年会与团建庄园 | Hacienda Le Plus',
    },
    description: {
      es: 'Sede privada para eventos corporativos, fiestas de fin de año, convenciones y team building en Quito–Píntag: hasta 1.000 personas en 13.000 m² con carpas gigantes, canchas, catering, fibra óptica y hospedaje para 81 pax.',
      en: 'Private venue for corporate events, year-end galas, conventions, and team building in Quito–Pintag: up to 1,000 attendees across 13,000 m² with giant tents, sports courts, catering, fiber Wi-Fi, and lodging for 81.',
      pt: 'Sede privada para eventos corporativos, festas de fim de ano e convenções em Quito–Píntag: até 1.000 pessoas em 13.000 m² com tendas, quadras esportivas, catering e hospedagem para 81.',
      fr: 'Lieu privé pour événements d’entreprise, conventions et team building à Quito–Píntag : jusqu’à 1 000 personnes dans 13 000 m² avec chapiteaux, terrains de sport, traiteur et hébergement pour 81.',
      de: 'Private Location für Firmenevents, Jahresfeiern, Tagungen und Teambuilding in Quito–Píntag: bis 1.000 Personen auf 13.000 m² mit Zelten, Sportplätzen, Catering und Unterkunft für 81.',
      zh: '基多平塔格私密企业活动、年会、会议与团建场地：13,000平方米草坪可容纳1,000人，配备巨型帐篷、运动球场、企业餐饮、光纤网络与81人住宿。',
    },
    keywords: {
      es: 'hacienda para eventos corporativos Quito, fiestas de fin de año empresas Quito, convenciones empresariales Valle de los Chillos, team building Pintag, alquiler hacienda para empresas Quito, retiros corporativos Ecuador',
      en: 'corporate event venue Quito, team building venue Ecuador, company retreat Pintag, convention center near Quito airport',
      pt: 'eventos corporativos Quito, confraternização empresas Equador, convenções Pintag',
      fr: 'séminaire entreprise Quito, team building Équateur, convention corporate Pintag',
      de: 'Firmenevents Quito, Teambuilding Ecuador, Tagungshotel Pintag',
      zh: '基多企业团建场地, 厄瓜多尔公司年会庄园, 企业会议住宿',
    },
  },
  '/contacto': {
    primaryTitle: {
      es: 'Reservas y Ubicación en Píntag, Quito | Hacienda Le Plus',
      en: 'Bookings, Quotes & Location in Pintag, Quito | Hacienda Le Plus',
      pt: 'Reservas, Cotações e Localização em Píntag, Quito | Hacienda Le Plus',
      fr: 'Réservations, Devis & Accès à Píntag, Quito | Hacienda Le Plus',
      de: 'Buchung, Anfrage & Anfahrt in Píntag, Quito | Hacienda Le Plus',
      zh: '预订咨询与基多平塔格位置地图 | Hacienda Le Plus',
    },
    midScrollTitle: {
      es: 'Reservas y Ubicación en Píntag, Quito | Hacienda Le Plus',
      en: 'Bookings, Quotes & Location in Pintag, Quito | Hacienda Le Plus',
      pt: 'Reservas, Cotações e Localização em Píntag, Quito | Hacienda Le Plus',
      fr: 'Réservations, Devis & Accès à Píntag, Quito | Hacienda Le Plus',
      de: 'Buchung, Anfrage & Anfahrt in Píntag, Quito | Hacienda Le Plus',
      zh: '预订咨询与基多平塔格位置地图 | Hacienda Le Plus',
    },
    deepScrollTitle: {
      es: 'Reservas y Ubicación en Píntag, Quito | Hacienda Le Plus',
      en: 'Bookings, Quotes & Location in Pintag, Quito | Hacienda Le Plus',
      pt: 'Reservas, Cotações e Localização em Píntag, Quito | Hacienda Le Plus',
      fr: 'Réservations, Devis & Accès à Píntag, Quito | Hacienda Le Plus',
      de: 'Buchung, Anfrage & Anfahrt in Píntag, Quito | Hacienda Le Plus',
      zh: '预订咨询与基多平塔格位置地图 | Hacienda Le Plus',
    },
    description: {
      es: 'Cotiza tu hospedaje de larga estadía, evento corporativo o boda en Hacienda Le Plus. Calle Deus N.º 100, Barrio San Juan de la Tola, Píntag (a 40 min de Quito y 30 min del Aeropuerto). WhatsApp 0969817891.',
      en: 'Request a direct quote for group lodging, corporate events, or weddings at Hacienda Le Plus. Calle Deus N° 100, San Juan de la Tola, Pintag (40 min from Quito, 30 min from Airport). WhatsApp +593 96 981 7891.',
      pt: 'Solicite sua cotação direta de hospedagem, evento corporativo ou casamento na Hacienda Le Plus em Píntag (a 40 min de Quito e 30 min do Aeroporto). WhatsApp +593 96 981 7891.',
      fr: 'Demandez un devis direct pour votre séjour, événement d’entreprise ou mariage à Hacienda Le Plus, Píntag (40 min de Quito, 30 min de l’aéroport). WhatsApp +593 96 981 7891.',
      de: 'Fordern Sie ein direktes Angebot für Gruppenunterkunft, Firmenevents oder Hochzeiten in der Hacienda Le Plus an (Píntag, 30 Min. vom Flughafen Quito). WhatsApp +593 96 981 7891.',
      zh: '获取基多平塔格 Hacienda Le Plus 团队住宿、企业活动或婚礼的直接报价（距基多40分钟，距机场30分钟）。WhatsApp +593 96 981 7891。',
    },
    keywords: {
      es: 'contacto Hacienda Le Plus, teléfono Hacienda Le Plus Pintag, cómo llegar a Hacienda Le Plus, reservas hacienda Pintag Quito, cotización eventos Quito',
      en: 'contact Hacienda Le Plus, Hacienda Le Plus Pintag location, book hacienda Quito Ecuador',
      pt: 'contato Hacienda Le Plus, localização Pintag Quito, reservas fazenda Equador',
      fr: 'contact Hacienda Le Plus, accès Pintag Quito, réservation domaine Équateur',
      de: 'Kontakt Hacienda Le Plus, Anfahrt Pintag Quito, Buchung Hacienda Ecuador',
      zh: 'Hacienda Le Plus 联系方式, 基多平塔格地图位置, 庄园预订电话',
    },
  },
};

/**
 * Updates document title, html lang, meta description, commercial keywords,
 * self-referencing canonical, hreflang alternates (all 6 languages), and per-route OpenGraph/Twitter tags.
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
    const ogImageData = ROUTE_OG_IMAGES[canonicalPath] || ROUTE_OG_IMAGES['/'];

    const fallbackTitle = title_en
      ? tr(title_en, title, normalizedLang)
      : tr(title, title, normalizedLang);
    const fallbackDescription = description_en
      ? tr(description_en, description, normalizedLang)
      : tr(description, description, normalizedLang);

    const primaryTitle = routeSEO?.primaryTitle[normalizedLang] || fallbackTitle;
    const effectiveDescription = routeSEO?.description[normalizedLang] || fallbackDescription;
    const effectiveKeywords =
      routeSEO?.keywords?.[normalizedLang] ||
      TOURISM_SEO_KEYWORDS[normalizedLang] ||
      TOURISM_SEO_KEYWORDS.es;

    // 1. Stable canonical document.title (never mutated on scroll so Googlebot indexes exact commercial title)
    document.title = primaryTitle;

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

    const baseUrl = `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`;
    // Self-referencing canonical URL compliant with Google's hreflang specification
    const selfCanonicalUrl =
      normalizedLang === 'es' ? baseUrl : `${baseUrl}?lang=${normalizedLang}`;

    const localeMap: Record<SupportedLanguage, string> = {
      es: 'es_EC',
      en: 'en_US',
      pt: 'pt_BR',
      fr: 'fr_FR',
      de: 'de_DE',
      zh: 'zh_CN',
    };

    const ogAlt = ogImageData.alt[normalizedLang] || ogImageData.alt.es;

    setMeta(
      'meta[name="robots"]',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
    setMeta('meta[name="description"]', effectiveDescription);
    setMeta('meta[name="keywords"]', effectiveKeywords);
    setMeta('meta[property="og:title"]', primaryTitle);
    setMeta('meta[property="og:description"]', effectiveDescription);
    setMeta('meta[property="og:url"]', selfCanonicalUrl);
    setMeta('meta[property="og:locale"]', localeMap[normalizedLang] || 'es_EC');
    setMeta('meta[property="og:image"]', ogImageData.url);
    setMeta('meta[property="og:image:secure_url"]', ogImageData.url);
    setMeta('meta[property="og:image:type"]', 'image/jpeg');
    setMeta('meta[property="og:image:width"]', '1200');
    setMeta('meta[property="og:image:height"]', '630');
    setMeta('meta[property="og:image:alt"]', ogAlt);
    setMeta('meta[name="twitter:card"]', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', primaryTitle);
    setMeta('meta[name="twitter:description"]', effectiveDescription);
    setMeta('meta[name="twitter:image"]', ogImageData.url);
    setMeta('meta[name="twitter:image:alt"]', ogAlt);

    // 4. Self-referencing Canonical link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', selfCanonicalUrl);

    // 5. Bidirectional Hreflang alternates for all 6 supported languages
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

    setHreflang('es', baseUrl);
    setHreflang('en', `${baseUrl}?lang=en`);
    setHreflang('pt', `${baseUrl}?lang=pt`);
    setHreflang('fr', `${baseUrl}?lang=fr`);
    setHreflang('de', `${baseUrl}?lang=de`);
    setHreflang('zh', `${baseUrl}?lang=zh`);
    setHreflang('x-default', baseUrl);
  }, [title, description, canonicalPath, lang, title_en, description_en]);
}
