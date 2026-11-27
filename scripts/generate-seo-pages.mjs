/**
 * Post-build Static SEO Route Prerenderer for Hacienda Le Plus
 * Generates dedicated static HTML entrypoints (hospedaje.html, bodas.html, corporativo.html, contacto.html)
 * in `dist/` so Firebase Hosting (`cleanUrls: true`) serves bespoke <title>, <meta description>,
 * self-referencing <link rel="canonical">, hreflang alternates, real 1200x630 OpenGraph/Twitter images,
 * unified Schema.org JSON-LD, and semantic <noscript> content directly on Wave-1 HTTP 200 responses
 * for Googlebot, WhatsApp, LinkedIn, Facebook, and X without needing SSR servers.
 */
import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://www.haciendaleplus.com';
const DIST_DIR = path.resolve(process.cwd(), 'dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');

/**
 * Reads optional SEO/Analytics variables from process.env and local .env file
 * without requiring external dependencies.
 */
function loadSeoEnv() {
  const envMap = {};
  const envFile = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envFile)) {
    const lines = fs.readFileSync(envFile, 'utf8').split(/\r?\n/);
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const eqIdx = line.indexOf('=');
      if (eqIdx === -1) continue;
      const key = line.slice(0, eqIdx).trim();
      const val = line.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
      envMap[key] = val;
    }
  }

  const getVar = (k) => (process.env[k] ?? envMap[k] ?? '').trim();
  const rawGa4 = getVar('VITE_GA4_MEASUREMENT_ID');
  const ga4Id = /^G-[A-Z0-9]{6,}$/i.test(rawGa4) ? rawGa4 : '';
  const gscVerification = getVar('VITE_GSC_VERIFICATION');
  const socialSameAs = getVar('VITE_SOCIAL_SAME_AS')
    .split(',')
    .map((u) => u.trim())
    .filter((u) => /^https?:\/\/.+/i.test(u));

  return { ga4Id, gscVerification, socialSameAs };
}

const SEO_ENV = loadSeoEnv();

const ROUTES = [
  {
    route: '/hospedaje',
    fileName: 'hospedaje.html',
    title: 'Hospedaje Larga Estadía y Grupos en Quito (81 Pax) | Hacienda Le Plus',
    description:
      'Alojamiento para empresas, delegaciones, ONGs y familias en Píntag, Quito: capacidad hasta 81 personas en 82 camas y 18 baños internos, alimentación completa, fibra óptica, piscina 84 m², spa y 100 parqueaderos.',
    keywords:
      'hospedaje larga estadía Quito, alojamiento para empresas Pintag, hospedaje para delegaciones y ONGs Ecuador, suites y habitaciones grupales Quito, hotel hacienda 81 personas Pichincha, alojamiento cerca aeropuerto Quito, Hacienda Le Plus',
    ogImage: `${SITE_URL}/images/og/hacienda-le-plus-hospedaje.jpg`,
    ogAlt:
      'Suites, habitaciones grupales y hospedaje para hasta 81 personas en Hacienda Le Plus, Quito–Píntag',
    preloadImage: '/images/hacienda/lodging-hero-hacienda.webp',
    breadcrumbName: 'Hospedaje Larga Estadía y Grupos',
    schemaTypes: ['Hotel', 'LodgingBusiness', 'Resort'],
    webPageType: 'WebPage',
    h1: 'Hospedaje Larga Estadía para Empresas, Delegaciones y Grupos en Quito–Píntag',
    summary:
      'Capacidad máxima certificada para 81 personas en 82 camas y 18 baños internos: Habitación Panorámica (16 pax, 4 baños), 4 Suites Matrimoniales, Casa Familiar (11 pax), Departamento (11 pax) y Habitaciones Compartidas. Alimentación completa en restaurante propio, Wi-Fi fibra óptica, piscina temperada cubierta de 84 m², sauna, turco, jacuzzi y 80–100 parqueaderos a 30 min del Aeropuerto de Quito.',
    faqs: [
      {
        question: '¿Cuál es la capacidad real de hospedaje y cómo se distribuyen las camas y baños?',
        answer:
          'Hacienda Le Plus tiene capacidad máxima para 81 personas y 18 baños internos (7 camas matrimoniales y 75 individuales en total), distribuidos en: 1 habitación panorámica de 8 literas x 2 pisos (16 pax, 4 baños), 2 suites matrimoniales con TV (2–3 pax c/u), 2 suites matrimoniales familiares (2–5 pax c/u), 1 casa familiar + 2 habitaciones (11 pax, 3 baños), 1 departamento (11 pax, 2 baños), 1 habitación compartida de 8+9 literas (17 pax, 3 baños) y 1 habitación compartida de 10 camas (10 pax, 2 baños).',
      },
      {
        question: '¿A qué distancia está de Quito y cómo funcionan sus áreas verdes, carpas, parqueaderos y baños externos?',
        answer:
          'Estamos ubicados en Píntag (Barrio San Juan de la Tola, Calle Deus N.º 100), a 40 minutos de Quito y a 30 minutos del Aeropuerto Internacional Mariscal Sucre. Ofrecemos 13.000 m² de áreas verdes, 20 baños externos y de 80 a 100 parqueaderos privados.',
      },
    ],
  },
  {
    route: '/bodas',
    fileName: 'bodas.html',
    title: 'Hacienda para Bodas Campestres en Quito–Píntag | Hacienda Le Plus',
    description:
      'Celebra tu boda campestre o boda destino en Píntag, Quito: 13.000 m² de jardines para carpas de gala hasta 1.000 invitados, 20 baños externos, banquete propio, suite nupcial y hospedaje para 81 invitados.',
    keywords:
      'hacienda para bodas en Quito, bodas campestres Pintag, bodas Valle de los Chillos, recepción de matrimonio al aire libre Quito, hacienda bodas con hospedaje Ecuador, bodas destino Quito, Hacienda Le Plus',
    ogImage: `${SITE_URL}/images/og/hacienda-le-plus-bodas.jpg`,
    ogAlt: 'Bodas campestres y bodas destino en 13.000 m² de jardines en Hacienda Le Plus, Quito–Píntag',
    preloadImage: '/images/hacienda/boda-hero-editorial.webp',
    breadcrumbName: 'Bodas Campestres y Destino',
    schemaTypes: ['EventVenue', 'Resort', 'LodgingBusiness'],
    webPageType: 'WebPage',
    h1: 'Hacienda para Bodas Campestres y Bodas Destino en Quito–Píntag',
    summary:
      '13.000 m² de jardines privados para ceremonias al aire libre y carpas de gala hasta 1.000 invitados, 20 baños externos, banquete propio, suite nupcial y hospedaje exclusivo in situ hasta 81 familiares e invitados en Quito–Píntag.',
    faqs: [
      {
        question: '¿Qué información se necesita para recibir una cotización personalizada de boda?',
        answer:
          'Solo debes indicarnos tu nombre, fecha estimada de la boda, número aproximado de invitados, tipo de banquete o menú deseado y si requieres hospedaje para familiares e invitados (hasta 81 personas en la hacienda).',
      },
      {
        question: '¿A qué distancia está de Quito y cuál es la capacidad para bodas?',
        answer:
          'Estamos ubicados en Píntag (Barrio San Juan de la Tola, Calle Deus N.º 100), a 40 minutos de Quito y 30 minutos del Aeropuerto. Nuestras áreas verdes de 13.000 m² permiten montar carpas de gala hasta para 1.000 invitados con 20 baños externos y 80–100 parqueaderos.',
      },
    ],
  },
  {
    route: '/corporativo',
    fileName: 'corporativo.html',
    title: 'Hacienda para Eventos Corporativos en Quito | Hacienda Le Plus',
    description:
      'Sede privada para eventos corporativos, fiestas de fin de año, convenciones y team building en Quito–Píntag: hasta 1.000 personas en 13.000 m² con carpas gigantes, canchas, catering, fibra óptica y hospedaje para 81 pax.',
    keywords:
      'hacienda para eventos corporativos Quito, fiestas de fin de año empresas Quito, convenciones empresariales Valle de los Chillos, team building Pintag, alquiler hacienda para empresas Quito, retiros corporativos Ecuador, Hacienda Le Plus',
    ogImage: `${SITE_URL}/images/og/hacienda-le-plus-corporativo.jpg`,
    ogAlt:
      'Grandes eventos corporativos, convenciones y team building hasta 1.000 personas en Hacienda Le Plus',
    preloadImage: '/images/hacienda/corporate-hero-banner.webp',
    breadcrumbName: 'Eventos Corporativos y Convenciones',
    schemaTypes: ['EventVenue', 'Resort', 'LodgingBusiness'],
    webPageType: 'WebPage',
    h1: 'Hacienda para Grandes Eventos Corporativos, Convenciones y Team Building en Quito',
    summary:
      'Escenario privado en Quito–Píntag con 13.000 m² de áreas verdes para carpas gigantes hasta 1.000 asistentes, 20 baños externos, 80–100 parqueaderos, canchas deportivas (fútbol 7v7, básquet profesional, vóley), piscina cubierta de 84 m², catering corporativo, fibra óptica y hospedaje complementario para 81 participantes.',
    faqs: [
      {
        question: '¿Qué áreas húmedas, deportivas y servicios ofrece la hacienda para eventos corporativos?',
        answer:
          'Contamos con internet fibra óptica, piscina cubierta de 84 m² (70 pax), sauna, turco y jacuzzi, canchas de fútbol 7v7, básquet profesional, vóley, ping pong y billar, además de salón social de coaching, karaoke y discoteca (con costo adicional).',
      },
      {
        question: '¿Cuál es la capacidad para convenciones y fiestas empresariales de fin de año?',
        answer:
          'En nuestros 13.000 m² de áreas verdes montamos carpas gigantes dimensionadas para hasta 1.000 personas, respaldadas por 20 baños externos, 80 a 100 parqueaderos y hospedaje complementario para hasta 81 personas.',
      },
    ],
  },
  {
    route: '/contacto',
    fileName: 'contacto.html',
    title: 'Reservas y Ubicación en Píntag, Quito | Hacienda Le Plus',
    description:
      'Cotiza tu hospedaje de larga estadía, evento corporativo o boda en Hacienda Le Plus. Calle Deus N.º 100, Barrio San Juan de la Tola, Píntag (a 40 min de Quito y 30 min del Aeropuerto). WhatsApp 0969817891.',
    keywords:
      'contacto Hacienda Le Plus, teléfono Hacienda Le Plus Pintag, cómo llegar a Hacienda Le Plus, reservas hacienda Pintag Quito, cotización eventos Quito',
    ogImage: `${SITE_URL}/images/og/hacienda-le-plus-contacto.jpg`,
    ogAlt: 'Ubicación y reservas directas de Hacienda Le Plus en Píntag, Valle de los Chillos, Quito',
    preloadImage: '/images/hacienda/vista-aerea.webp',
    breadcrumbName: 'Reservas y Ubicación',
    schemaTypes: ['LodgingBusiness', 'Resort', 'EventVenue'],
    webPageType: 'ContactPage',
    h1: 'Reservas, Cotizaciones y Ubicación de Hacienda Le Plus en Píntag, Quito',
    summary:
      'Dirección: Calle Deus N.º 100, Barrio San Juan de la Tola, Píntag, Valle de los Chillos, Quito (a 40 min de Quito y 30 min del Aeropuerto Internacional Mariscal Sucre). Atención comercial directa por WhatsApp al +593 96 981 7891 y correos reservas@haciendaleplus.com, corporativo@haciendaleplus.com y bodas@haciendaleplus.com.',
    faqs: [
      {
        question: '¿Dónde está ubicada Hacienda Le Plus y cómo llegar desde Quito o el Aeropuerto?',
        answer:
          'Estamos en Calle Deus N.º 100, Barrio San Juan de la Tola, parroquia Píntag (Valle de los Chillos, Distrito Metropolitano de Quito), a 40 minutos de Quito y a 30 minutos del Aeropuerto Internacional Mariscal Sucre.',
      },
    ],
  },
];

function escapeHtmlAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildRouteJsonLd(cfg) {
  const canonicalUrl = `${SITE_URL}${cfg.route}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
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
        email: 'reservas@haciendaleplus.com',
        telephone: '+593969817891',
        ...(SEO_ENV.socialSameAs.length > 0 ? { sameAs: SEO_ENV.socialSameAs } : {}),
      },
      {
        '@type': cfg.schemaTypes,
        '@id': `${SITE_URL}/#resort`,
        name: 'Hacienda Le Plus – Eco Club & Resort',
        url: `${SITE_URL}/`,
        image: [
          `${SITE_URL}/images/og/hacienda-le-plus-home.jpg`,
          `${SITE_URL}/images/og/hacienda-le-plus-hospedaje.jpg`,
          `${SITE_URL}/images/og/hacienda-le-plus-bodas.jpg`,
          `${SITE_URL}/images/og/hacienda-le-plus-corporativo.jpg`,
        ],
        logo: `${SITE_URL}/logo-leplus.png`,
        telephone: '+593969817891',
        email: 'reservas@haciendaleplus.com',
        ...(SEO_ENV.socialSameAs.length > 0 ? { sameAs: SEO_ENV.socialSameAs } : {}),
        description: cfg.description,
        priceRange: '$$-$$$',
        currenciesAccepted: 'USD',
        checkinTime: '14:00',
        checkoutTime: '12:00',
        maximumAttendeeCapacity: 1000,
        numberOfRooms: 9,
        petsAllowed: true,
        hasMap:
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
      },
      {
        '@type': cfg.webPageType,
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: cfg.title,
        description: cfg.description,
        inLanguage: 'es-EC',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#resort` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: cfg.ogImage,
          width: 1200,
          height: 630,
        },
        breadcrumb: { '@id': `${canonicalUrl}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: cfg.breadcrumbName,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: cfg.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

function generateRouteHtml(baseHtml, cfg) {
  const canonicalUrl = `${SITE_URL}${cfg.route}`;
  let html = baseHtml;

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtmlAttr(cfg.title)}</title>`);

  // Replace meta description & keywords
  html = html.replace(
    /<meta\s+name="description"[\s\S]*?\/>/i,
    `<meta name="description" content="${escapeHtmlAttr(cfg.description)}" />`
  );
  html = html.replace(
    /<meta\s+name="keywords"[\s\S]*?\/>/i,
    `<meta name="keywords" content="${escapeHtmlAttr(cfg.keywords)}" />`
  );

  // Replace canonical & hreflang links
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="es"\s+href="[^"]*"\s*\/>/i,
    `<link rel="alternate" hreflang="es" href="${canonicalUrl}" />`
  );
  for (const lang of ['en', 'pt', 'fr', 'de', 'zh']) {
    html = html.replace(
      new RegExp(`<link\\s+rel="alternate"\\s+hreflang="${lang}"\\s+href="[^"]*"\\s*\\/>`, 'i'),
      `<link rel="alternate" hreflang="${lang}" href="${canonicalUrl}?lang=${lang}" />`
    );
  }
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/>/i,
    `<link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />`
  );

  // Replace hero preload image
  html = html.replace(
    /<link\s+rel="preload"\s+as="image"\s+href="[^"]*"[^>]*\/>/i,
    `<link rel="preload" as="image" href="${cfg.preloadImage}" fetchpriority="high" />`
  );

  // Replace OpenGraph tags
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:title" content="${escapeHtmlAttr(cfg.title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"[\s\S]*?\/>/i,
    `<meta property="og:description" content="${escapeHtmlAttr(cfg.description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:image" content="${cfg.ogImage}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image:secure_url"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:image:secure_url" content="${cfg.ogImage}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:image:alt" content="${escapeHtmlAttr(cfg.ogAlt)}" />`
  );

  // Replace Twitter Card tags
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/i,
    `<meta name="twitter:title" content="${escapeHtmlAttr(cfg.title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"[\s\S]*?\/>/i,
    `<meta name="twitter:description" content="${escapeHtmlAttr(cfg.description)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/i,
    `<meta name="twitter:image" content="${cfg.ogImage}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image:alt"\s+content="[^"]*"\s*\/>/i,
    `<meta name="twitter:image:alt" content="${escapeHtmlAttr(cfg.ogAlt)}" />`
  );

  // Replace JSON-LD block
  const jsonLdStr = JSON.stringify(buildRouteJsonLd(cfg), null, 2);
  html = html.replace(
    /<script\s+id="leplus-structured-data"\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script id="leplus-structured-data" type="application/ld+json">\n${jsonLdStr}\n    </script>`
  );

  // Replace <noscript> content with route-specific semantic HTML
  const noscriptBlock = `<noscript>
      <main style="max-width:860px;margin:2rem auto;padding:1.5rem;font-family:system-ui,sans-serif;color:#0A1F17;">
        <h1>${escapeHtmlAttr(cfg.h1)}</h1>
        <p>${escapeHtmlAttr(cfg.summary)}</p>
        <nav aria-label="Navegación principal">
          <ul>
            <li><a href="/">Inicio — Hacienda Le Plus Quito–Píntag</a></li>
            <li><a href="/hospedaje">Hospedaje Larga Estadía y Grupos (81 Personas)</a></li>
            <li><a href="/corporativo">Grandes Eventos Corporativos, Convenciones y Fin de Año</a></li>
            <li><a href="/bodas">Bodas Campestres y Bodas Destino en Quito–Píntag</a></li>
            <li><a href="/contacto">Reservas, Cotizaciones y Ubicación en Píntag, Quito</a></li>
          </ul>
        </nav>
        <p>WhatsApp y Reservas: <a href="tel:+593969817891">+593 96 981 7891</a> · Correo: <a href="mailto:reservas@haciendaleplus.com">reservas@haciendaleplus.com</a></p>
      </main>
    </noscript>`;

  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, noscriptBlock);

  return html;
}

function injectGlobalSeoTags(html) {
  let out = html;

  // 1. Google Search Console HTML Verification Meta Tag
  if (SEO_ENV.gscVerification && !/meta\s+name="google-site-verification"/i.test(out)) {
    out = out.replace(
      /<\/head>/i,
      `    <meta name="google-site-verification" content="${escapeHtmlAttr(SEO_ENV.gscVerification)}" />\n  </head>`
    );
  }

  // 2. Google Analytics 4 (gtag.js) async tag in <head> (SPA page_views handled by AnalyticsTracker)
  if (SEO_ENV.ga4Id && !out.includes(`googletagmanager.com/gtag/js?id=${SEO_ENV.ga4Id}`)) {
    const safeGa4 = escapeHtmlAttr(SEO_ENV.ga4Id);
    const gaSnippet = `    <!-- Google Analytics 4 (GA4) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${safeGa4}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${safeGa4}', { send_page_view: false, anonymize_ip: true });
    </script>
  </head>`;
    out = out.replace(/<\/head>/i, gaSnippet);
  }

  // 3. Inject sameAs into static index.html JSON-LD Organization & Resort if configured
  if (SEO_ENV.socialSameAs.length > 0) {
    out = out.replace(
      /<script\s+id="leplus-structured-data"\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i,
      (full, jsonBody) => {
        try {
          const parsed = JSON.parse(jsonBody);
          if (Array.isArray(parsed['@graph'])) {
            for (const node of parsed['@graph']) {
              if (node['@id']?.endsWith('#organization') || node['@id']?.endsWith('#resort')) {
                node.sameAs = SEO_ENV.socialSameAs;
              }
            }
          }
          return `<script id="leplus-structured-data" type="application/ld+json">\n${JSON.stringify(parsed, null, 2)}\n    </script>`;
        } catch {
          return full;
        }
      }
    );
  }

  return out;
}

function main() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.error('[SEO Prerender] dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const rawBaseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf8');
  const enrichedIndexHtml = injectGlobalSeoTags(rawBaseHtml);
  fs.writeFileSync(INDEX_HTML_PATH, enrichedIndexHtml, 'utf8');

  for (const cfg of ROUTES) {
    const outPath = path.join(DIST_DIR, cfg.fileName);
    const outHtml = injectGlobalSeoTags(generateRouteHtml(rawBaseHtml, cfg));
    fs.writeFileSync(outPath, outHtml, 'utf8');
    console.log(`[SEO Prerender] Generated ${cfg.fileName} -> ${SITE_URL}${cfg.route}`);
  }

  console.log(
    `[SEO Config] GA4: ${SEO_ENV.ga4Id || 'pending (.env)'} | GSC Tag: ${
      SEO_ENV.gscVerification ? 'configured' : 'DNS or pending (.env)'
    } | sameAs: ${SEO_ENV.socialSameAs.length} profiles`
  );
}

main();
