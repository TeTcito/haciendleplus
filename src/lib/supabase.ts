import { createClient } from '@supabase/supabase-js';
import { LeadSubmission, LeadStatus, SiteConfig } from '../types/cms';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://pezajodvvouezumnppaj.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlemFqb2R2dm91ZXp1bW5wcGFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzMDA4ODEsImV4cCI6MjEwODg3Njg4MX0.LsQfzxKPk576WIWrNQ9UnILIXCm0a-LeIGFq_r0mDb0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================================
// 1. LEADS (COTIZACIONES)
// ============================================================================
export async function saveLeadToSupabase(lead: LeadSubmission): Promise<boolean> {
  try {
    const { error } = await supabase.from('leads').insert([
      {
        id: lead.id,
        created_at: lead.createdAt || new Date().toISOString(),
        client_name: lead.clientName,
        organization_or_couple: lead.organizationOrCouple,
        email: lead.email,
        phone: lead.phone,
        service_type: lead.serviceType,
        tentative_date: lead.tentativeDate,
        estimated_volume: lead.estimatedVolume,
        notes: lead.notes,
        target_corporate_email: lead.targetCorporateEmail,
        source_page: lead.sourcePage,
        status: lead.status || 'Nuevo',
      },
    ]);

    if (error) {
      console.warn('Advertencia al guardar lead en Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error de red al guardar lead en Supabase:', err);
    return false;
  }
}

export async function fetchLeadsFromSupabase(): Promise<LeadSubmission[] | null> {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return null;
    }

    return data.map((row: any) => ({
      id: row.id,
      createdAt: row.created_at,
      clientName: row.client_name,
      organizationOrCouple: row.organization_or_couple,
      email: row.email,
      phone: row.phone,
      serviceType: row.service_type,
      tentativeDate: row.tentative_date,
      estimatedVolume: row.estimated_volume,
      notes: row.notes,
      targetCorporateEmail: row.target_corporate_email,
      sourcePage: row.source_page,
      status: row.status as LeadStatus,
    }));
  } catch (err) {
    console.warn('Error al obtener leads desde Supabase:', err);
    return null;
  }
}

export async function updateLeadStatusInSupabase(id: string, status: LeadStatus): Promise<boolean> {
  try {
    const { error } = await supabase.from('leads').update({ status }).eq('id', id);
    if (error) {
      console.warn('Error al actualizar estado en Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error al actualizar estado en Supabase:', err);
    return false;
  }
}

export async function deleteLeadFromSupabase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) {
      console.warn('Error al eliminar lead en Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error al eliminar lead en Supabase:', err);
    return false;
  }
}

// ============================================================================
// 2. CONTACT MESSAGES (FORMULARIO DE CONTACTO)
// ============================================================================
export interface ContactMessagePayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export async function saveContactMessageToSupabase(payload: ContactMessagePayload): Promise<boolean> {
  try {
    const { error } = await supabase.from('contact_messages').insert([
      {
        name: payload.name,
        email: payload.email,
        phone: payload.phone || null,
        subject: payload.subject || null,
        message: payload.message,
        status: 'Pendiente',
      },
    ]);

    if (error) {
      console.warn('Advertencia al guardar mensaje en Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error de red al guardar mensaje en Supabase:', err);
    return false;
  }
}

// ============================================================================
// 3. REVIEWS & TESTIMONIALS
// ============================================================================
export interface ReviewPayload {
  author: string;
  role: string;
  rating: number;
  comment: string;
}

export async function saveReviewToSupabase(payload: ReviewPayload): Promise<boolean> {
  try {
    const { error } = await supabase.from('reviews').insert([
      {
        author: payload.author,
        role: payload.role,
        rating: payload.rating,
        comment: payload.comment,
        is_approved: true,
      },
    ]);

    if (error) {
      console.warn('Advertencia al guardar reseña en Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error de red al guardar reseña en Supabase:', err);
    return false;
  }
}

export async function fetchReviewsFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error || !data) return null;
    return data;
  } catch (err) {
    console.warn('Error al cargar reseñas desde Supabase:', err);
    return null;
  }
}

// ============================================================================
// 4. SITE CONFIGURATION
// ============================================================================
export async function saveSiteConfigToSupabase(config: SiteConfig): Promise<boolean> {
  try {
    const { error } = await supabase.from('site_config').upsert([
      {
        id: 'main_config',
        updated_at: new Date().toISOString(),
        data: config,
      },
    ]);

    if (error) {
      console.warn('Error al guardar config en Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error al guardar config en Supabase:', err);
    return false;
  }
}

export async function fetchSiteConfigFromSupabase(): Promise<SiteConfig | null> {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('data')
      .eq('id', 'main_config')
      .single();

    if (error || !data?.data) return null;
    return data.data as SiteConfig;
  } catch (err) {
    console.warn('Error al cargar config desde Supabase:', err);
    return null;
  }
}
