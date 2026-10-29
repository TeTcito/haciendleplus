-- ============================================================================
-- HACIENDA LE PLUS - ESQUEMA DE BASE DE DATOS SUPABASE (FASE 1 - BILINGÜE & MULTIMEDIA)
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

-- 3. TABLA RESEÑAS Y TESTIMONIOS REALES (CON SOPORTE MULTI-IDIOMA)
CREATE TABLE IF NOT EXISTS public.reviews (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    author TEXT NOT NULL,
    role TEXT NOT NULL,
    role_en TEXT,
    rating INTEGER DEFAULT 5,
    comment TEXT NOT NULL,
    comment_en TEXT,
    is_approved BOOLEAN DEFAULT TRUE
);

-- 4. TABLA CONFIGURACIÓN DEL SITIO (SITE CONFIG - ES & EN)
CREATE TABLE IF NOT EXISTS public.site_config (
    id TEXT PRIMARY KEY DEFAULT 'main_config',
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    data JSONB NOT NULL
);

-- 5. TABLA PAQUETES DE SERVICIO (SERVICE PACKAGES - BILINGÜES)
CREATE TABLE IF NOT EXISTS public.service_packages (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    title_en TEXT,
    subtitle TEXT,
    subtitle_en TEXT,
    price_label TEXT,
    price_label_en TEXT,
    price_value NUMERIC,
    unit TEXT,
    unit_en TEXT,
    capacity TEXT,
    capacity_en TEXT,
    setup_info TEXT,
    setup_info_en TEXT,
    description TEXT,
    description_en TEXT,
    inclusions JSONB DEFAULT '[]'::jsonb,
    inclusions_en JSONB DEFAULT '[]'::jsonb,
    highlight_badge TEXT,
    highlight_badge_en TEXT,
    image TEXT,
    video_url TEXT,
    whatsapp_intent TEXT,
    featured_in_home BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABLA HABITACIONES Y CABAÑAS (CABIN ROOMS - BILINGÜES)
CREATE TABLE IF NOT EXISTS public.cabin_rooms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_en TEXT,
    type TEXT,
    type_en TEXT,
    capacity TEXT,
    max_guests INTEGER,
    beds TEXT,
    bathrooms NUMERIC,
    price_per_night NUMERIC,
    weekend_note TEXT,
    description TEXT,
    description_en TEXT,
    amenities JSONB DEFAULT '[]'::jsonb,
    amenities_en JSONB DEFAULT '[]'::jsonb,
    image TEXT,
    video_url TEXT,
    available BOOLEAN DEFAULT TRUE,
    featured_in_home BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABLA FOTOS Y VIDEOS DE EVENTOS (MULTIMEDIA & EVENT GALLERY)
CREATE TABLE IF NOT EXISTS public.event_photos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    title_en TEXT,
    category TEXT NOT NULL,
    space_name TEXT,
    date_tag TEXT,
    media_type TEXT DEFAULT 'image', -- 'image' | 'video'
    image_url TEXT NOT NULL,
    video_url TEXT,
    thumbnail_url TEXT,
    description TEXT,
    description_en TEXT,
    featured BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TABLA ESPACIOS DEL RESORT Y AFOROS AUDITADOS (RESORT SPACES & CAPACITIES)
CREATE TABLE IF NOT EXISTS public.resort_spaces (
    id TEXT PRIMARY KEY,
    title_es TEXT NOT NULL,
    title_en TEXT NOT NULL,
    subtitle_es TEXT,
    subtitle_en TEXT,
    badge_es TEXT,
    badge_en TEXT,
    description_es TEXT,
    description_en TEXT,
    media_type TEXT DEFAULT 'image', -- 'image' | 'video'
    image TEXT NOT NULL,
    video_url TEXT,
    capacities JSONB NOT NULL,
    area_m2 TEXT,
    notes_es TEXT,
    notes_en TEXT,
    inclusions_es JSONB DEFAULT '[]'::jsonb,
    inclusions_en JSONB DEFAULT '[]'::jsonb,
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
ALTER TABLE public.resort_spaces ENABLE ROW LEVEL SECURITY;

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

-- Service Packages, Cabins, Photos & Spaces:
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

DROP POLICY IF EXISTS "Lectura publica resort_spaces" ON public.resort_spaces;
CREATE POLICY "Lectura publica resort_spaces" ON public.resort_spaces FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Escritura resort_spaces" ON public.resort_spaces;
CREATE POLICY "Escritura resort_spaces" ON public.resort_spaces FOR ALL TO anon, authenticated USING (true);
