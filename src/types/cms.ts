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
  weekendNote: string;
  description: string;
  amenities: string[];
  image: string;
  available: boolean;
  featuredInHome: boolean;
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
