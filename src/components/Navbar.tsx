import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, Sparkles } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { buildContextualWhatsAppUrl, WhatsAppContextType } from '../utils/whatsapp';
import { useIsMobile } from '../utils/useIsMobile';

export const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const { siteConfig } = useCMS();
  const { t } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const currentWhatsAppContext: WhatsAppContextType = location.pathname.includes('bodas')
    ? 'bodas'
    : location.pathname.includes('corporativo')
    ? 'corporativo'
    : location.pathname.includes('hospedaje')
    ? 'grupos'
    : location.pathname.includes('contacto')
    ? 'visita'
    : 'general';

  const whatsappHref = buildContextualWhatsAppUrl({
    phone: siteConfig.whatsappNumber,
    context: currentWhatsAppContext,
  });

  // Navegación principal con las 4 páginas de enfoque comercial + Contáctanos
  const navLinks = [
    { name: t.nav.home, desktopLabel: t.nav.home, path: '/' },
    { name: t.nav.weddings, desktopLabel: t.nav.weddingsDesktop, path: '/bodas' },
    {
      name: t.nav.lodging,
      desktopLabel: t.nav.lodgingDesktop,
      path: '/hospedaje',
    },
    {
      name: t.nav.corporate,
      desktopLabel: t.nav.corporateDesktop,
      path: '/corporativo',
    },
    {
      name: t.nav.contact,
      desktopLabel: t.nav.contactDesktop,
      path: '/contacto',
    },
  ];

  const isDarkHeroPage = location.pathname !== '/admin';
  const isBodasPage = location.pathname.startsWith('/bodas');
  const isTransparentNavbar = isBodasPage && !scrolled && !mobileMenuOpen;

  if (isMobile) {
    return null;
  }

  return (
    <header
      className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isDarkHeroPage || mobileMenuOpen
          ? 'bg-[#071912]/95 backdrop-blur-md border-b border-[#C8A45D]/20 py-2.5 shadow-xl'
          : isTransparentNavbar
          ? 'bg-transparent py-4 border-b border-transparent'
          : 'bg-[#071912] py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 whitespace-nowrap">
          {/* Brand Logo: Original Design + Business Name in Two Lines on the Right */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none shrink-0"
            aria-label="Hacienda Le Plus Inicio"
          >
            <img
              src="/logo-leplus.png"
              alt="Logo Oficial Hacienda Le Plus"
              className="h-12 sm:h-14 w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <div className="flex flex-col justify-center leading-tight">
              <span
                className={`font-serif-luxury text-base sm:text-lg font-semibold tracking-[0.22em] block transition-colors ${
                  isTransparentNavbar ? 'text-[#0A1F17]' : 'text-[#FAF7F2]'
                }`}
              >
                HACIENDA
              </span>
              <span
                className={`font-serif-luxury text-lg sm:text-xl font-bold tracking-[0.26em] block -mt-0.5 transition-colors ${
                  isTransparentNavbar ? 'text-[#8C6D3F]' : 'text-[#C8A45D]'
                }`}
              >
                LE PLUS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation — Strictly Single Line (4 Páginas Oficiales) */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-1.5 whitespace-nowrap"
            aria-label="Navegación Principal"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  title={link.name}
                  className={`px-3 xl:px-3.5 py-2 rounded-full text-xs xl:text-[13px] font-medium whitespace-nowrap transition-all duration-200 ${
                    isTransparentNavbar
                      ? isActive
                        ? 'bg-[#13281F] text-[#FAF7F2] shadow-xs'
                        : 'text-[#0A1F17] hover:text-[#8C6D3F] hover:bg-black/5 font-semibold'
                      : isActive
                      ? 'bg-[#C8A45D]/20 text-[#E2C585] border border-[#C8A45D]/40'
                      : 'text-[#FAF7F2]/85 hover:text-[#E2C585] hover:bg-white/5'
                  }`}
                >
                  {link.desktopLabel}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions — Selector de Idioma + Botón único Cotizar (redirige a WhatsApp) */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0 whitespace-nowrap">
            <LanguageSelector variant="navbar" />

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-[13px] font-semibold bg-gradient-to-r from-[#C8A45D] to-[#DFB96E] text-[#06150F] hover:brightness-110 shadow-lg shadow-[#C8A45D]/20 whitespace-nowrap transition-all cursor-pointer"
              title="Solicitar cotización por WhatsApp al 0969817891"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.nav.quote}</span>
            </a>
          </div>

          {/* Mobile Hamburger Button (Touch-First 44px+) */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSelector variant="compact" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-xl border focus:outline-none transition-colors ${
                isTransparentNavbar
                  ? 'bg-black/5 text-[#0A1F17] border-black/15 hover:bg-black/10'
                  : 'bg-white/10 text-[#FAF7F2] border-[#C8A45D]/30 hover:bg-white/15'
              }`}
              aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className={`w-6 h-6 ${isTransparentNavbar ? 'text-[#8C6D3F]' : 'text-[#C8A45D]'}`} />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071912] border-b border-[#C8A45D]/30 px-4 pt-4 pb-6 space-y-3 shadow-2xl">
          <div className="grid grid-cols-1 gap-1.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm sm:text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#C8A45D]/20 text-[#E2C585] border border-[#C8A45D]/40'
                      : 'text-[#FAF7F2]/90 hover:bg-white/5'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <Sparkles className="w-4 h-4 text-[#C8A45D]" />}
                </Link>
              );
            })}
          </div>

          <LanguageSelector variant="mobile-drawer" />

          <div className="pt-3 border-t border-white/10">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-[#C8A45D] to-[#DFB96E] text-[#06150F]"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.quote}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
