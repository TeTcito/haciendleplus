export type SupportedLanguage = 'es' | 'en' | 'pt' | 'fr' | 'de' | 'zh';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string; // Native name: Español, English, Português, Français, Deutsch, 简体中文
  shortLabel: string;
  flag: string;
  enabled: boolean; // true for es & en in Phase 1; others prepared for future phases
}

export const AVAILABLE_LANGUAGES: LanguageInfo[] = [
  { code: 'es', name: 'Español', shortLabel: 'ES', flag: '🇪🇸', enabled: true },
  { code: 'en', name: 'English', shortLabel: 'EN', flag: '🇺🇸', enabled: true },
  { code: 'pt', name: 'Português', shortLabel: 'PT', flag: '🇧🇷', enabled: false },
  { code: 'fr', name: 'Français', shortLabel: 'FR', flag: '🇫🇷', enabled: false },
  { code: 'de', name: 'Deutsch', shortLabel: 'DE', flag: '🇩🇪', enabled: false },
  { code: 'zh', name: '简体中文', shortLabel: 'ZH', flag: '🇨🇳', enabled: false },
];

export interface Translations {
  nav: {
    home: string;
    weddings: string;
    weddingsDesktop: string;
    lodging: string;
    lodgingDesktop: string;
    corporate: string;
    corporateDesktop: string;
    contact: string;
    contactDesktop: string;
    quote: string;
    openMenu: string;
    closeMenu: string;
    langSelect: string;
    comingSoon: string;
  };
  hero: {
    overline: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    quoteBtn: string;
    whatsappBtn: string;
    watchVideo: string;
    closeVideo: string;
    exploreSpaces: string;
    paxUnit: string;
  };
  commercialPriorities: {
    lodgingTitle: string;
    lodgingSubtitle: string;
    corporateTitle: string;
    corporateSubtitle: string;
    weddingsTitle: string;
    weddingsSubtitle: string;
    learnMore: string;
    quoteNow: string;
  };
  spaces: {
    sectionTitle: string;
    sectionSubtitle: string;
    tableTitle: string;
    spaceCol: string;
    auditoriumCol: string;
    banquetCol: string;
    schoolCol: string;
    uShapeCol: string;
    notesCol: string;
    quoteSpace: string;
    modalTitle: string;
    modalDesc: string;
    viewDetails: string;
    watchTour: string;
    closeMedia: string;
  };
  forms: {
    title: string;
    subtitle: string;
    routingNotice: string;
    serviceLabel: string;
    serviceOptions: {
      grupos: string;
      corporativo: string;
      bodas: string;
      hospedaje: string;
      escapadas: string;
      visita: string;
    };
    nameLabel: string;
    namePlaceholder: string;
    organizationLabel: string;
    organizationPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    dateLabel: string;
    volumeLabel: string;
    volumePlaceholder: string;
    notesLabel: string;
    notesPlaceholder: string;
    submitBtn: string;
    submitting: string;
    successTag: string;
    successTitle: string;
    successDesc: string;
    whatsappFastTrack: string;
    emailClientCopy: string;
    anotherInquiry: string;
    requiredNotice: string;
  };
  modals: {
    quickQuoteTitle: string;
    quickQuoteBadge: string;
    closeAria: string;
  };
  reviews: {
    sectionTitle: string;
    sectionSubtitle: string;
    verifiedGuests: string;
    addReview: string;
    authorPlaceholder: string;
    commentPlaceholder: string;
    rolePlaceholder: string;
    submitReview: string;
    thankYou: string;
  };
  footer: {
    tagline: string;
    locationTitle: string;
    airportTime: string;
    quitoTime: string;
    rights: string;
    commercialPriorityBadge: string;
  };
  common: {
    from: string;
    perPersonNight: string;
    perParticipant: string;
    guests: string;
    rooms: string;
    metersSquared: string;
    directContact: string;
    quoteWhatsapp: string;
    videoBadge: string;
    photoBadge: string;
  };
}
