import React, { useRef, useLayoutEffect, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Heart, BedDouble, Building2, PhoneCall } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  activeColor: string;
}

// Generadores geométricos puros fuera del render para máximo rendimiento
const getBorderPath = (cx: number, w: number) => {
  const scoopHalfW = 46;
  const leftX = cx - scoopHalfW;
  const rightX = cx + scoopHalfW;
  const depth = 35;
  const endX = Math.max(w, 800);
  return `M -20,1.5 L ${Math.max(-20, leftX)},1.5 C ${cx - 26},1.5 ${cx - 15},${depth} ${cx},${depth} C ${cx + 15},${depth} ${cx + 26},1.5 ${rightX},1.5 L ${endX},1.5`;
};

const getBgPath = (cx: number, w: number) => {
  const scoopHalfW = 46;
  const leftX = cx - scoopHalfW;
  const rightX = cx + scoopHalfW;
  const depth = 35;
  const h = 48;
  const endX = Math.max(w, 800);
  return `M -20,1.5 L ${Math.max(-20, leftX)},1.5 C ${cx - 26},1.5 ${cx - 15},${depth} ${cx},${depth} C ${cx + 15},${depth} ${cx + 26},1.5 ${rightX},1.5 L ${endX},1.5 L ${endX},${h + 80} L -20,${h + 80} Z`;
};

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isEn } = useLanguage();

  const menuRef = useRef<HTMLDivElement>(null);
  const borderPathRef = useRef<SVGPathElement>(null);
  const bgPathRef = useRef<SVGPathElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const navWidthRef = useRef<number>(
    typeof window !== 'undefined' ? window.innerWidth : 390
  );

  const navItems: NavItem[] = useMemo(
    () => [
      { path: '/', label: isEn ? 'Home' : 'Inicio', icon: Home, activeColor: '#E2C585' },
      { path: '/bodas', label: isEn ? 'Weddings' : 'Bodas', icon: Heart, activeColor: '#E5C98B' },
      { path: '/hospedaje', label: isEn ? 'Lodging' : 'Hospedaje', icon: BedDouble, activeColor: '#DFB96E' },
      { path: '/corporativo', label: isEn ? 'Events' : 'Eventos', icon: Building2, activeColor: '#C8A45D' },
      { path: '/contacto', label: isEn ? 'Contact' : 'Contacto', icon: PhoneCall, activeColor: '#E2C585' },
    ],
    [isEn]
  );

  const getActiveIndex = useCallback((): number => {
    const current = location.pathname;
    if (current === '/') return 0;
    if (current.startsWith('/bodas')) return 1;
    if (current.startsWith('/hospedaje')) return 2;
    if (current.startsWith('/corporativo')) return 3;
    if (current.startsWith('/contacto')) return 4;
    return 0;
  }, [location.pathname]);

  const activeIndex = getActiveIndex();

  // Física de resorte suave, sedosa y fluida (sin tirones)
  const rawX = useMotionValue(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 195
  );
  const springX = useSpring(rawX, { stiffness: 220, damping: 26, mass: 0.9 });

  const updateNotchPosition = useCallback(() => {
    const activeItem = itemRefs.current[activeIndex];
    const menu = menuRef.current;
    if (activeItem && menu) {
      const activeRect = activeItem.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      const centerX = activeRect.left - menuRect.left + activeRect.width / 2;
      navWidthRef.current = Math.max(
        menuRect.width || 0,
        window.innerWidth || 0,
        document.documentElement.clientWidth || 0,
        420
      );
      rawX.set(centerX);

      // Actualización directa inicial de los paths para evitar parpadeos
      if (borderPathRef.current && bgPathRef.current) {
        const w = navWidthRef.current;
        const currentCenter = rawX.get();
        borderPathRef.current.setAttribute('d', getBorderPath(currentCenter, w));
        bgPathRef.current.setAttribute('d', getBgPath(currentCenter, w));
      }
    }
  }, [activeIndex, rawX]);

  useLayoutEffect(() => {
    updateNotchPosition();
    const handleResize = () => {
      updateNotchPosition();
    };

    window.addEventListener('resize', handleResize);
    const rId = requestAnimationFrame(updateNotchPosition);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rId);
    };
  }, [updateNotchPosition, location.pathname]);

  // Actualización directa al DOM del SVG a 60-120fps (CERO re-renders de React)
  useEffect(() => {
    return springX.on('change', (cx) => {
      const w = navWidthRef.current;
      if (borderPathRef.current) {
        borderPathRef.current.setAttribute('d', getBorderPath(cx, w));
      }
      if (bgPathRef.current) {
        bgPathRef.current.setAttribute('d', getBgPath(cx, w));
      }
    });
  }, [springX]);

  const handleTabClick = (path: string) => {
    if (location.pathname !== path) {
      navigate(path);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const initialW = typeof window !== 'undefined' ? Math.max(window.innerWidth, 420) : 420;
  const initialCx = initialW / 2;

  // No renderizar en el panel de administración
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <nav
      ref={menuRef}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden h-[48px] w-full safe-area-pb select-none overflow-visible pointer-events-none"
      role="navigation"
      aria-label="Navegación móvil Hacienda Le Plus"
    >
      {/* Respaldo sólido inferior para safe-area en teléfonos (evita franjas blancas en iOS) */}
      <div className="absolute -bottom-10 left-0 right-0 h-10 bg-[#06150F] pointer-events-none -z-10" />

      {/* FONDO Y TRAZO SUPERIOR SVG DIRECTAMENTE MUTABLE (ULTRA-FLUIDO) */}
      <svg
        className="absolute inset-0 w-full h-[74px] pointer-events-none overflow-visible will-change-transform"
        style={{ filter: 'drop-shadow(0 -4px 18px rgba(0, 0, 0, 0.55))' }}
      >
        <defs>
          <linearGradient id="leplus-navbar-gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8C6D3F" />
            <stop offset="25%" stopColor="#C8A45D" />
            <stop offset="50%" stopColor="#FAF7F2" />
            <stop offset="75%" stopColor="#E5C98B" />
            <stop offset="100%" stopColor="#8C6D3F" />
          </linearGradient>
          <filter id="leplus-navbar-glow" x="-10%" y="-30%" width="120%" height="160%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#C8A45D" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Fondo oscuro 100% sólido con el tono Obsidian de Le Plus */}
        <path
          ref={bgPathRef}
          d={getBgPath(initialCx, initialW)}
          fill="#06150F"
          fillOpacity="1"
        />

        {/* Trazo continuo dorado con resplandor suave */}
        <path
          ref={borderPathRef}
          d={getBorderPath(initialCx, initialW)}
          fill="none"
          stroke="url(#leplus-navbar-gold-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#leplus-navbar-glow)"
        />
      </svg>

      {/* CONTENEDOR DE LOS BOTONES CON ANIMACIÓN SUAVE */}
      <div className="flex items-center justify-around max-w-md mx-auto relative z-30 h-full pointer-events-auto px-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIndex === index;

          return (
            <button
              key={item.path}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onClick={() => handleTabClick(item.path)}
              className="relative flex-1 h-full flex flex-col items-center justify-center py-0.5 px-0.5 cursor-pointer select-none group"
              aria-label={item.label}
              title={item.label}
            >
              {/* ICON CONTAINER: TRANSICIÓN VERTICAL ELEVADA EN EL NOTCH */}
              <motion.div
                initial={false}
                animate={{
                  y: isActive ? -13 : 0,
                }}
                transition={{
                  duration: 0.34,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileTap={{ scale: 0.88 }}
                className="flex items-center justify-center will-change-transform"
              >
                {isActive ? (
                  <div className="w-[40px] h-[40px] rounded-full bg-gradient-to-tr from-[#8C6D3F] via-[#E2C585] to-[#C8A45D] p-[1.5px] shadow-[0_4px_18px_rgba(200,164,93,0.55)] flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[#06150F] flex items-center justify-center text-white">
                      <Icon
                        className="w-[18px] h-[18px] stroke-[2.4]"
                        style={{ color: item.activeColor }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-[#FAF7F2]/60 group-hover:text-[#E2C585] transition-colors">
                    <Icon className="w-[18px] h-[18px] stroke-[1.8]" />
                    <span className="text-[9px] font-medium tracking-tight mt-0.5 text-[#FAF7F2]/60 group-hover:text-[#E2C585] transition-colors leading-none">
                      {item.label}
                    </span>
                  </div>
                )}
              </motion.div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
