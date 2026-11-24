import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { ROUTE_TOURISM_SEO } from '../utils/seo';

const ROUTE_SCHEMA_TYPES: Record<string, string[]> = {
  '/': ['Resort', 'Hotel', 'LodgingBusiness', 'TouristAttraction'],
  '/hospedaje': ['Hotel', 'LodgingBusiness', 'Resort'],
  '/bodas': ['EventVenue', 'Resort', 'LodgingBusiness'],
  '/corporativo': ['Resort', 'EventVenue', 'LodgingBusiness'],
  '/contacto': ['LodgingBusiness', 'Resort', 'TouristInformationCenter'],
};

export const DynamicSEO: React.FC = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const { cabins } = useCMS();

  useEffect(() => {
    const pathname = location.pathname;
    const isAdmin = pathname.startsWith('/admin') || pathname.startsWith('/portal-admin');

    if (isAdmin) {
      document.title = 'Panel Administrativo | Hacienda Le Plus';
      let robotsEl = document.querySelector('meta[name="robots"]');
      if (!robotsEl) {
        robotsEl = document.createElement('meta');
        robotsEl.setAttribute('name', 'robots');
        document.head.appendChild(robotsEl);
      }
      robotsEl.setAttribute('content', 'noindex, nofollow');
      return;
    }

    const routeSEO = ROUTE_TOURISM_SEO[pathname] || ROUTE_TOURISM_SEO['/'];
    const description = routeSEO.description[language] || routeSEO.description.es;
    const canonicalUrl = `https://www.haciendaleplus.com${pathname === '/' ? '/' : pathname}`;
    const schemaTypes = ROUTE_SCHEMA_TYPES[pathname] || ROUTE_SCHEMA_TYPES['/'];

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
          : `https://www.haciendaleplus.com${cabin.image || '/images/hacienda/vista-aerea.webp'}`,
      }));

    const jsonLdData = {
      '@context': 'https://schema.org',
      '@type': schemaTypes,
      '@id': `${canonicalUrl}#lodging`,
      name: 'Hacienda Le Plus – Eco Club & Resort',
      alternateName: 'Hacienda Turística y Hospedaje Le Plus Píntag Quito',
      url: canonicalUrl,
      telephone: '+593969817891',
      email: 'reservas@haciendaleplus.com',
      description,
      isAccessibleForFree: false,
      currenciesAccepted: 'USD',
      paymentAccepted: 'Transferencia Bancaria, Efectivo, Tarjeta',
      checkinTime: '14:00',
      checkoutTime: '12:00',
      petsAllowed: true,
      maximumAttendeeCapacity: 1000,
      numberOfRooms: availableRoomsSchema.length || 9,
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
      touristType: [
        'Turismo Rural y de Naturaleza',
        'Hospedaje Familiar y Grupal',
        'Eco Resort y Bienestar',
        'Turismo Corporativo y Delegaciones',
        'Bodas Destino en Ecuador',
      ],
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Piscina temperada cubierta 84 m²', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Sauna, Turco e Hidromasaje / Jacuzzi', value: true },
        { '@type': 'LocationFeatureSpecification', name: '13.000 m² de áreas verdes y jardines', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Internet Wi-Fi por Fibra Óptica', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Restaurante privado y gastronomía de hacienda', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Parqueadero privado para 80–100 vehículos', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Canchas de fútbol 7v7, básquet profesional y vóley', value: true },
      ],
      containsPlace: availableRoomsSchema,
    };

    let scriptEl = document.getElementById('dynamic-seo-jsonld') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'dynamic-seo-jsonld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(jsonLdData);
  }, [location.pathname, language, cabins]);

  return null;
};

export default DynamicSEO;
