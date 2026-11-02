export type ServiceCategory = 'bodas' | 'corporativo' | 'hospedaje' | 'escapadas';

export type LeadStatus =
  | 'Nuevo'
  | 'Contactado'
  | 'Calificado'
  | 'Visita Agendada'
  | 'Propuesta Enviada'
  | 'Confirmado';

export interface CorporateEmails {
  general: string;
  bodas: string;
  corporativo: string;
  reservas: string;
  gerencia: string;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  heroOverline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroVideoUrl: string;
  heroPosterUrl: string;
  whatsappNumber: string; // International format without '+', e.g. '593969817891'
  phoneDisplay: string;
  address: string;
  cityRegion: string;
  airportReference: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectUrl: string;
  responseCommitment: string;
  corporateEmails: CorporateEmails;
}

export interface ServicePackage {
  id: string;
  category: ServiceCategory;
  title: string;
  subtitle: string;
  priceLabel: string;
  priceValue: number;
  unit: string;
  capacity: string;
  setupInfo: string;
  description: string;
  inclusions: string[];
  highlightBadge?: string;
  image: string;
  videoUrl?: string;
  mediaType?: 'image' | 'video';
  showPrice?: boolean;
  whatsappIntent: string;
  featuredInHome: boolean;
}

export interface CabinRoom {
  id: string;
  name: string;
  type: 'Suite Matrimonial' | 'Cabaña Familiar' | 'Villa Grupal' | 'Habitación Doble' | string;
  capacity: string;
  maxGuests: number;
  beds: string;
  bathrooms: number;
  pricePerNight: number;
  showPrice?: boolean;
  weekendNote: string;
  description: string;
  amenities: string[];
  image: string;
  videoUrl?: string;
  mediaType?: 'image' | 'video';
  available: boolean;
  featuredInHome: boolean;
}

/**
 * MÓDULO: SERVICIOS DE ESTADÍA Y COMPLEMENTOS
 * 1) Tarjeta Principal Grande ("Operación Completa para Larga Estadía") con soporte de Video
 * 2) Las 4+ Tarjetas de Servicios y Complementos con soporte de Video e Imagen
 */
export interface LodgingFeaturedBanner {
  id: string;
  overline: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  locationBadge: string;
  videoButtonText: string;
  image: string;
  videoUrl?: string;
  mediaType: 'image' | 'video';
}

export interface LodgingServiceCard {
  id: string;
  title: string;
  badge: string;
  badgeClass?: string;
  description: string;
  ctaText: string;
  image: string;
  videoUrl?: string;
  mediaType: 'image' | 'video';
  serviceType: 'hospedaje' | 'grupos';
  itemName: string;
}

/**
 * MÓDULO: BODAS Y CELEBRACIONES — PROPUESTAS NUPCIALES DESTACADAS (CARRUSEL)
 */
export interface WeddingProposalSpec {
  label: string;
  icon: 'users' | 'bed' | 'tent' | 'utensils' | 'glass' | 'sparkles';
}

export interface WeddingProposalCard {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeClass: string;
  image: string;
  videoUrl?: string;
  mediaType?: 'image' | 'video';
  specs: WeddingProposalSpec[];
  price: string;
  unit: string;
  showPrice?: boolean;
  serviceType: 'bodas';
}

/**
 * MÓDULO: GRANDES EVENTOS CORPORATIVOS — MACROEVENTOS Y ENCUENTROS EMPRESARIALES (CARRUSEL HORIZONTAL)
 */
export interface CorporateHighlightItem {
  id: string;
  title: string;
  subtitle: string;
  highlightMetric: string;
  image: string;
  videoUrl?: string;
  mediaType?: 'image' | 'video';
  whatsappItemName: string;
}

export interface EventPhoto {
  id: string;
  title: string;
  category: 'Bodas' | 'Corporativo' | 'Hospedaje' | 'Naturaleza & Gastronomía';
  spaceName: string;
  dateTag: string;
  imageUrl: string;
  description: string;
  featured: boolean;
}

export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  clientProfile: string;
  metrics: string;
  challenge: string;
  solution: string;
  quote: string;
  author: string;
  image: string;
  linkTo: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'bodas' | 'corporativo' | 'hospedaje';
}

export interface LeadSubmission {
  id: string;
  createdAt: string;
  clientName: string;
  organizationOrCouple: string;
  email: string;
  phone: string;
  serviceType: 'bodas' | 'corporativo' | 'hospedaje' | 'grupos' | 'escapadas' | 'visita';
  tentativeDate: string;
  estimatedVolume: string;
  notes: string;
  targetCorporateEmail: string;
  sourcePage: string;
  status: LeadStatus;
}
