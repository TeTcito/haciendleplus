import React, { useRef, useState, useEffect } from 'react';

/* ============================================================================
   REAL-TIME VIEWPORT SCROLL REVEAL (ENTRANCE & EXIT ON SCROLL DOWN / UP)
   Hardware-accelerated animations from all directions:
   up, down, left, right, up-left, up-right, down-left, down-right,
   zoom-in, zoom-out, tilt-left, tilt-right, blur-up.
   ============================================================================ */
export type RevealDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'tilt-left'
  | 'tilt-right'
  | 'blur-up';

export interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  scale?: number;
  className?: string;
  innerClassName?: string;
  style?: React.CSSProperties;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 850,
  distance = 75,
  scale = 0.88,
  className = '',
  innerClassName = '',
  style,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [exitSide, setExitSide] = useState<'top' | 'bottom'>('bottom');
  const isVisibleRef = useRef(false);

  useEffect(() => {
    let rafId: number | null = null;

    const evaluatePosition = () => {
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight;
      const nearPageBottom = vh + scrollY >= docHeight - 48;

      // Active visible zone inside the screen:
      // Enters when element top reaches 88% of viewport height (or 96% near page bottom)
      // Exits at top when element bottom goes above 14% of viewport height
      const bottomEnterLine = nearPageBottom ? vh * 0.96 : vh * 0.88;
      const bottomExitLine = vh * 0.92;
      const topExitLine = scrollY > 70 ? vh * 0.14 : 10;
      const topEnterLine = scrollY > 70 ? vh * 0.18 : 15;

      const effectiveBottom = Math.max(rect.bottom, rect.top + Math.min(rect.height, 260));

      if (!isVisibleRef.current) {
        if (rect.top <= bottomEnterLine && effectiveBottom >= topEnterLine) {
          isVisibleRef.current = true;
          setIsVisible(true);
        } else {
          setExitSide(rect.top < vh * 0.45 ? 'top' : 'bottom');
        }
      } else {
        if (scrollY > 70 && effectiveBottom < topExitLine) {
          isVisibleRef.current = false;
          setExitSide('top');
          setIsVisible(false);
        } else if (rect.top > bottomExitLine && !nearPageBottom) {
          isVisibleRef.current = false;
          setExitSide('bottom');
          setIsVisible(false);
        }
      }
    };

    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        evaluatePosition();
      });
    };

    // Initial check after paint so entrance animations play visibly on first mount
    const initTimer = window.setTimeout(() => {
      evaluatePosition();
    }, 40);

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      window.clearTimeout(initTimer);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  const getHiddenTransform = (): string => {
    const vSign = exitSide === 'top' ? -0.85 : 1;
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance * vSign}px, 0) scale(0.94)`;
      case 'down':
        return `translate3d(0, ${-distance * vSign}px, 0) scale(0.94)`;
      case 'left':
        return `translate3d(${-distance}px, ${16 * vSign}px, 0) scale(0.94)`;
      case 'right':
        return `translate3d(${distance}px, ${16 * vSign}px, 0) scale(0.94)`;
      case 'up-left':
        return `translate3d(${-distance * 0.85}px, ${distance * 0.7 * vSign}px, 0) scale(0.9)`;
      case 'up-right':
        return `translate3d(${distance * 0.85}px, ${distance * 0.7 * vSign}px, 0) scale(0.9)`;
      case 'down-left':
        return `translate3d(${-distance * 0.8}px, ${-distance * 0.65 * vSign}px, 0) scale(0.9)`;
      case 'down-right':
        return `translate3d(${distance * 0.8}px, ${-distance * 0.65 * vSign}px, 0) scale(0.9)`;
      case 'zoom-in':
        return `translate3d(0, ${28 * vSign}px, 0) scale(${scale})`;
      case 'zoom-out':
        return `translate3d(0, ${20 * vSign}px, 0) scale(1.12)`;
      case 'tilt-left':
        return `translate3d(${-distance * 0.8}px, ${32 * vSign}px, 0) rotate(${-5 * vSign}deg) scale(0.9)`;
      case 'tilt-right':
        return `translate3d(${distance * 0.8}px, ${32 * vSign}px, 0) rotate(${5 * vSign}deg) scale(0.9)`;
      case 'blur-up':
        return `translate3d(0, ${distance * vSign}px, 0) scale(0.92)`;
      default:
        return `translate3d(0, ${distance * vSign}px, 0) scale(0.94)`;
    }
  };

  const revealStyles: React.CSSProperties = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0) scale(1) rotate(0deg)' : getHiddenTransform(),
    filter: isVisible ? 'blur(0px)' : 'blur(5px)',
    transitionProperty: 'transform, opacity, filter',
    transitionDuration: isVisible ? `${duration}ms` : '480ms',
    transitionDelay: isVisible ? `${delay}ms` : '0ms',
    transitionTimingFunction: isVisible
      ? 'cubic-bezier(0.16, 1, 0.3, 1)'
      : 'cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const isFullHeight = className.includes('h-full') || innerClassName.includes('h-full');
  const innerClasses = `will-change-reveal w-full ${isFullHeight ? 'h-full' : ''} ${innerClassName}`.trim();

  return (
    <div ref={wrapperRef} className={className}>
      <div className={innerClasses} style={revealStyles}>
        {children}
      </div>
    </div>
  );
};
