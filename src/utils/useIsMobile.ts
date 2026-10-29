import { useState, useEffect } from 'react';

/**
 * Hook para detectar si el usuario está en un dispositivo móvil.
 * - Detecta automáticamente según el ancho de pantalla (breakpoint por defecto 768px).
 * - Escucha cambios de tamaño de pantalla en tiempo real (resize y matchMedia).
 * - Soporta override manual mediante query param (?view=mobile o ?view=desktop)
 *   o localStorage ('hacienda_leplus_view_mode') para facilitar pruebas y desarrollo.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const getIsMobile = (): boolean => {
    if (typeof window === 'undefined') return false;

    // 1. Revisar si hay un override en la URL (?view=mobile o ?view=desktop)
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    if (viewParam === 'mobile') return true;
    if (viewParam === 'desktop') return false;

    // 2. Revisar si hay un override en localStorage
    try {
      const stored = localStorage.getItem('hacienda_leplus_view_mode');
      if (stored === 'mobile') return true;
      if (stored === 'desktop') return false;
    } catch {
      // Ignorar si localStorage está deshabilitado
    }

    // 3. Detección automática por ancho de ventana
    return window.innerWidth < breakpoint;
  };

  const [isMobile, setIsMobile] = useState<boolean>(getIsMobile);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    if (viewParam === 'mobile') {
      setIsMobile(true);
      return;
    }
    if (viewParam === 'desktop') {
      setIsMobile(false);
      return;
    }

    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    if (mql.addEventListener) {
      mql.addEventListener('change', handleChange);
    } else {
      mql.addListener(handleChange);
    }
    window.addEventListener('resize', handleResize);

    // Sincronización inicial en cliente
    setIsMobile(getIsMobile());

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handleChange);
      } else {
        mql.removeListener(handleChange);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
}

/**
 * Función auxiliar para forzar la vista en desarrollo o pruebas.
 */
export function setViewModeOverride(mode: 'mobile' | 'desktop' | 'auto') {
  if (typeof window === 'undefined') return;
  if (mode === 'auto') {
    localStorage.removeItem('hacienda_leplus_view_mode');
  } else {
    localStorage.setItem('hacienda_leplus_view_mode', mode);
  }
  window.dispatchEvent(new Event('resize'));
}
