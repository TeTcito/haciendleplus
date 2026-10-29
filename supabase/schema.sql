-- ============================================================================
-- HACIENDA LE PLUS - ESQUEMA DE BASE DE DATOS SUPABASE
-- ============================================================================

-- 1. TABLA LEADS / COTIZACIONES
CREATE TABLE IF NOT EXISTS public.leads (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    client_name TEXT NOT NULL,
    organization_or_couple TEXT,
    email TEXT,
    phone TEXT NOT NULL,
    service_type TEXT NOT NULL, -- 'bodas', 'corporativo', 'hospedaje', 'grupos', 'escapadas', 'visita'
    tentative_date TEXT,
    estimated_volume TEXT,
    notes TEXT,
    target_corporate_email TEXT,
    source_page TEXT,
    status TEXT DEFAULT 'Nuevo' -- 'Nuevo', 'Contactado', 'Calificado', 'Visita Agendada', 'Propuesta Enviada', 'Confirmado'
);

-- 2. TABLA MENSAJES DE CONTACTO DIRECTO
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'Pendiente'
);

-- 3. TABLA RESEÑAS Y TESTIMONIOS REALES
CREATE TABLE IF NOT EXISTS public.reviews (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    author TEXT NOT NULL,
    role TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    comment TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT TRUE
);

-- 4. TABLA CONFIGURACIÓN DEL SITIO (SITE CONFIG)
CREATE TABLE IF NOT EXISTS public.site_config (
    id TEXT PRIMARY KEY DEFAULT 'main_config',
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    data JSONB NOT NULL
);

-- 5. TABLA PAQUETES DE SERVICIO (SERVICE PACKAGES)
CREATE TABLE IF NOT EXISTS public.service_packages (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    price_label TEXT,
    price_value NUMERIC,
    unit TEXT,
    capacity TEXT,
    setup_info TEXT,
    description TEXT,
    inclusions JSONB DEFAULT '[]'::jsonb,
    highlight_badge TEXT,
    image TEXT,
    whatsapp_intent TEXT,
    featured_in_home BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABLA HABITACIONES Y CABAÑAS (CABIN ROOMS)
CREATE TABLE IF NOT EXISTS public.cabin_rooms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT,
    capacity TEXT,
    max_guests INTEGER,
    beds TEXT,
    bathrooms NUMERIC,
    price_per_night NUMERIC,
    weekend_note TEXT,
    description TEXT,
    amenities JSONB DEFAULT '[]'::jsonb,
    image TEXT,
    available BOOLEAN DEFAULT TRUE,
    featured_in_home BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABLA FOTOS DE EVENTOS (EVENT PHOTOS)
CREATE TABLE IF NOT EXISTS public.event_photos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    space_name TEXT,
    date_tag TEXT,
    image_url TEXT NOT NULL,
    description TEXT,
    featured BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- HABILITAR ROW LEVEL SECURITY (RLS)
-- ============================================================================
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cabin_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_photos ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE ACCESO PÚBLICO (ANON & AUTHENTICATED)

-- Leads: Inserción y consulta pública
DROP POLICY IF EXISTS "Permitir insercion publica de leads" ON public.leads;
CREATE POLICY "Permitir insercion publica de leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir lectura de leads" ON public.leads;
CREATE POLICY "Permitir lectura de leads" ON public.leads FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Permitir actualizacion de leads" ON public.leads;
CREATE POLICY "Permitir actualizacion de leads" ON public.leads FOR UPDATE TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Permitir borrado de leads" ON public.leads;
CREATE POLICY "Permitir borrado de leads" ON public.leads FOR DELETE TO anon, authenticated USING (true);

-- Mensajes de contacto:
DROP POLICY IF EXISTS "Permitir insercion publica de mensajes" ON public.contact_messages;
CREATE POLICY "Permitir insercion publica de mensajes" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir lectura de mensajes" ON public.contact_messages;
CREATE POLICY "Permitir lectura de mensajes" ON public.contact_messages FOR SELECT TO anon, authenticated USING (true);

-- Reseñas:
DROP POLICY IF EXISTS "Permitir lectura publica de resenas" ON public.reviews;
CREATE POLICY "Permitir lectura publica de resenas" ON public.reviews FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Permitir envio publico de resenas" ON public.reviews;
CREATE POLICY "Permitir envio publico de resenas" ON public.reviews FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Site Config:
DROP POLICY IF EXISTS "Lectura publica site_config" ON public.site_config;
CREATE POLICY "Lectura publica site_config" ON public.site_config FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Escritura site_config" ON public.site_config;
CREATE POLICY "Escritura site_config" ON public.site_config FOR ALL TO anon, authenticated USING (true);

-- Service Packages, Cabins & Photos:
DROP POLICY IF EXISTS "Lectura publica packages" ON public.service_packages;
CREATE POLICY "Lectura publica packages" ON public.service_packages FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Escritura packages" ON public.service_packages;
CREATE POLICY "Escritura packages" ON public.service_packages FOR ALL TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Lectura publica cabins" ON public.cabin_rooms;
CREATE POLICY "Lectura publica cabins" ON public.cabin_rooms FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Escritura cabins" ON public.cabin_rooms;
CREATE POLICY "Escritura cabins" ON public.cabin_rooms FOR ALL TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Lectura publica photos" ON public.event_photos;
CREATE POLICY "Lectura publica photos" ON public.event_photos FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Escritura photos" ON public.event_photos;
CREATE POLICY "Escritura photos" ON public.event_photos FOR ALL TO anon, authenticated USING (true);
