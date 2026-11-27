import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { ROUTE_OG_IMAGES, ROUTE_TOURISM_SEO, SITE_URL } from '../utils/seo';
import { GSC_VERIFICATION_CODE, OFFICIAL_SOCIAL_PROFILES } from '../config/seoConfig';
import { SupportedLanguage } from '../i18n/types';

const ROUTE_SCHEMA_TYPES: Record<string, string[]> = {
  '/': ['Resort', 'Hotel', 'LodgingBusiness', 'EventVenue'],
  '/hospedaje': ['Hotel', 'LodgingBusiness', 'Resort'],
  '/bodas': ['EventVenue', 'Resort', 'LodgingBusiness'],
  '/corporativo': ['EventVenue', 'Resort', 'LodgingBusiness'],
  '/contacto': ['LodgingBusiness', 'Resort', 'EventVenue'],
};

const ROUTE_BREADCRUMB_LABELS: Record<string, Record<SupportedLanguage, string>> = {
  '/': {
    es: 'Inicio',
    en: 'Home',
    pt: 'Início',
    fr: 'Accueil',
    de: 'Startseite',
    zh: '首页',
  },
  '/hospedaje': {
    es: 'Hospedaje Larga Estadía y Grupos',
    en: 'Long-Stay & Group Lodging',
    pt: 'Hospedagem e Grupos',
    fr: 'Hébergement & Groupes',
    de: 'Unterkunft & Gruppen',
    zh: '团队与长期住宿',
  },
  '/bodas': {
    es: 'Bodas Campestres y Destino',
    en: 'Countryside & Destination Weddings',
    pt: 'Casamentos no Campo',
    fr: 'Mariages Champêtres',
    de: 'Landhochzeiten',
    zh: '目的地婚礼',
  },
  '/corporativo': {
    es: 'Eventos Corporativos y Convenciones',
    en: 'Corporate Events & Conventions',
    pt: 'Eventos Corporativos',
    fr: 'Événements d’Entreprise',
    de: 'Firmenevents & Tagungen',
    zh: '企业活动与会议',
  },
  '/contacto': {
    es: 'Reservas y Ubicación',
    en: 'Bookings & Location',
    pt: 'Reservas e Localização',
    fr: 'Réservations & Accès',
    de: 'Buchung & Anfahrt',
    zh: '预订与位置',
  },
};

export const DynamicSEO: React.FC = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const { cabins, faqs, siteConfig } = useCMS();

  useEffect(() => {
    const pathname = location.pathname === '/' ? '/' : location.pathname.replace(/\/+$/, '');
    const isAdmin = pathname.startsWith('/admin') || pathname.startsWith('/portal-admin');

    const structuredScriptId = 'leplus-structured-data';

    if (isAdmin) {
      document.title = 'Panel Administrativo | Hacienda Le Plus';
      let robotsEl = document.querySelector('meta[name="robots"]');
      if (!robotsEl) {
        robotsEl = document.createElement('meta');
        robotsEl.setAttribute('name', 'robots');
        document.head.appendChild(robotsEl);
      }
      robotsEl.setAttribute('content', 'noindex, nofollow, noarchive');

      const existingSchema = document.getElementById(structuredScriptId);
      if (existingSchema) existingSchema.remove();
      return;
    }

    const normalizedPath = ROUTE_TOURISM_SEO[pathname] ? pathname : '/';
    const routeSEO = ROUTE_TOURISM_SEO[normalizedPath];
    const title = routeSEO.primaryTitle[language] || routeSEO.primaryTitle.es;
    const description = routeSEO.description[language] || routeSEO.description.es;
    const baseUrl = `${SITE_URL}${normalizedPath === '/' ? '/' : normalizedPath}`;
    const canonicalUrl = language === 'es' ? baseUrl : `${baseUrl}?lang=${language}`;
    const schemaTypes = ROUTE_SCHEMA_TYPES[normalizedPath] || ROUTE_SCHEMA_TYPES['/'];
    const ogImage = (ROUTE_OG_IMAGES[normalizedPath] || ROUTE_OG_IMAGES['/']).url;

    const availableRoomsSchema = (cabins || [])
      .filter((c) => c.available !== false)
      .map((cabin) => ({
        '@type': 'HotelRoom',
        name: cabin.name,
        description: cabin.description,
        occupancy: {
          '@type': 'QuantitativeValue',
          maxValue: cabin.maxGuests || 4,
          unitText: 'personas',
        },
        numberOfBathroomsTotal: cabin.bathrooms || 1,
        bed: {
          '@type': 'BedDetails',
          typeOfBed: cabin.beds,
        },
        image: cabin.image?.startsWith('http')
          ? cabin.image
          : `${SITE_URL}${cabin.image || '/images/hacienda/vista-aerea.webp'}`,
      }));

    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: ROUTE_BREADCRUMB_LABELS['/'][language] || 'Inicio',
        item: `${SITE_URL}/`,
      },
    ];

    if (normalizedPath !== '/') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name:
          ROUTE_BREADCRUMB_LABELS[normalizedPath]?.[language] ||
          ROUTE_BREADCRUMB_LABELS[normalizedPath]?.es ||
          title,
        item: baseUrl,
      });
    }

    const relevantFaqs = (faqs || []).filter((faq) => {
      if (normalizedPath === '/' || normalizedPath === '/contacto') return true;
      if (normalizedPath === '/hospedaje') return faq.category === 'hospedaje' || faq.category === 'general';
      if (normalizedPath === '/bodas') return faq.category === 'bodas' || faq.category === 'general';
      if (normalizedPath === '/corporativo') return faq.category === 'corporativo' || faq.category === 'general';
      return true;
    });

    const graph: Record<string, unknown>[] = [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: 'Hacienda Le Plus',
        alternateName: 'Hacienda Le Plus – Eco Club & Resort',
        inLanguage: ['es-EC', 'en', 'pt', 'fr', 'de', 'zh'],
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Hacienda Le Plus – Eco Club & Resort',
        url: `${SITE_URL}/`,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo-leplus.png`,
          width: 512,
          height: 512,
        },
        email: siteConfig?.corporateEmails?.reservas || 'reservas@haciendaleplus.com',
        telephone: '+593969817891',
        ...(OFFICIAL_SOCIAL_PROFILES.length > 0 ? { sameAs: OFFICIAL_SOCIAL_PROFILES } : {}),
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+593969817891',
            contactType: 'reservations',
            email: siteConfig?.corporateEmails?.reservas || 'reservas@haciendaleplus.com',
            areaServed: 'EC',
            availableLanguage: ['Spanish', 'English', 'Portuguese', 'French', 'German', 'Chinese'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+593969817891',
            contactType: 'sales',
            email: siteConfig?.corporateEmails?.corporativo || 'corporativo@haciendaleplus.com',
            areaServed: 'EC',
            availableLanguage: ['Spanish', 'English'],
          },
        ],
      },
      {
        '@type': schemaTypes,
        '@id': `${SITE_URL}/#resort`,
        name: 'Hacienda Le Plus – Eco Club & Resort',
        alternateName: 'Hacienda Turística, Eventos y Hospedaje Le Plus Quito–Píntag',
        url: `${SITE_URL}/`,
        image: [
          `${SITE_URL}/images/og/hacienda-le-plus-home.jpg`,
          `${SITE_URL}/images/og/hacienda-le-plus-hospedaje.jpg`,
          `${SITE_URL}/images/og/hacienda-le-plus-bodas.jpg`,
          `${SITE_URL}/images/og/hacienda-le-plus-corporativo.jpg`,
        ],
        logo: `${SITE_URL}/logo-leplus.png`,
        telephone: '+593969817891',
        email: siteConfig?.corporateEmails?.reservas || 'reservas@haciendaleplus.com',
        ...(OFFICIAL_SOCIAL_PROFILES.length > 0 ? { sameAs: OFFICIAL_SOCIAL_PROFILES } : {}),
        description,
        priceRange: '$$-$$$',
        currenciesAccepted: 'USD',
        paymentAccepted: 'Transferencia Bancaria, Efectivo, Tarjeta de Crédito',
        checkinTime: '14:00',
        checkoutTime: '12:00',
        petsAllowed: true,
        maximumAttendeeCapacity: 1000,
        numberOfRooms: availableRoomsSchema.length || 9,
        hasMap:
          siteConfig?.googleMapsDirectUrl ||
          'https://www.google.com/maps/search/?api=1&query=Calle+Deus+100+San+Juan+de+la+Tola+Pintag+Quito',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Calle Deus N.º 100, Barrio San Juan de la Tola',
          addressLocality: 'Píntag, Quito',
          addressRegion: 'Pichincha',
          postalCode: '170804',
          addressCountry: 'EC',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -0.3712,
          longitude: -78.3748,
        },
        areaServed: [
          { '@type': 'City', name: 'Quito' },
          { '@type': 'AdministrativeArea', name: 'Píntag' },
          { '@type': 'AdministrativeArea', name: 'Valle de los Chillos' },
          { '@type': 'AdministrativeArea', name: 'Pichincha' },
          { '@type': 'Country', name: 'Ecuador' },
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '23:59',
          },
        ],
        amenityFeature: [
          { '@type': 'LocationFeatureSpecification', name: 'Hospedaje hasta 81 personas en 82 camas y 18 baños internos', value: true },
          { '@type': 'LocationFeatureSpecification', name: '13.000 m² de áreas verdes para carpas gigantes hasta 1.000 personas', value: true },
          { '@type': 'LocationFeatureSpecification', name: '20 baños externos para grandes eventos y bodas', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Piscina temperada cubierta de 84 m²', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Sauna, Turco e Hidromasaje (Jacuzzi)', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Internet Wi-Fi por Fibra Óptica', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Restaurante privado y catering propio', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Parqueadero privado para 80–100 vehículos', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Canchas de fútbol 7v7, básquet profesional y vóley', value: true },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios Comerciales Hacienda Le Plus Quito–Píntag',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Hospedaje de Larga Estadía para Empresas, Delegaciones y ONGs (hasta 81 pax)',
                url: `${SITE_URL}/hospedaje`,
                areaServed: 'Quito, Pichincha, Ecuador',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Grandes Eventos Corporativos, Convenciones y Fin de Año (hasta 1.000 pax)',
                url: `${SITE_URL}/corporativo`,
                areaServed: 'Quito, Pichincha, Ecuador',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Bodas Campestres y Bodas Destino con Hospedaje (hasta 1.000 invitados)',
                url: `${SITE_URL}/bodas`,
                areaServed: 'Quito, Pichincha, Ecuador',
              },
            },
          ],
        },
        ...(availableRoomsSchema.length > 0 ? { containsPlace: availableRoomsSchema } : {}),
      },
      {
        '@type': normalizedPath === '/contacto' ? 'ContactPage' : 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description,
        inLanguage: language === 'es' ? 'es-EC' : language,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#resort` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: ogImage,
          width: 1200,
          height: 630,
        },
        breadcrumb: { '@id': `${canonicalUrl}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: breadcrumbItems,
      },
    ];

    if (relevantFaqs.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: relevantFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    const jsonLdData = {
      '@context': 'https://schema.org',
      '@graph': graph,
    };

    // Sync Google Search Console HTML verification tag if configured
    if (GSC_VERIFICATION_CODE) {
      let gscMeta = document.querySelector('meta[name="google-site-verification"]');
      if (!gscMeta) {
        gscMeta = document.createElement('meta');
        gscMeta.setAttribute('name', 'google-site-verification');
        document.head.appendChild(gscMeta);
      }
      gscMeta.setAttribute('content', GSC_VERIFICATION_CODE);
    }

    // Remove any legacy duplicate script if present
    const legacyEl = document.getElementById('dynamic-seo-jsonld');
    if (legacyEl) legacyEl.remove();

    let scriptEl = document.getElementById(structuredScriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = structuredScriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(jsonLdData);
  }, [location.pathname, language, cabins, faqs, siteConfig]);

  return null;
};

export default DynamicSEO;
