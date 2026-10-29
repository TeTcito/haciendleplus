import React from 'react';
import { useIsMobile } from '../utils/useIsMobile';
import { LodgingPageDesktop } from './desktop/LodgingPageDesktop';
import { LodgingPageMobile } from './mobile/LodgingPageMobile';

/**
 * Vista Adaptativa (LodgingPage)
 * - En escritorio (>= 768px): Carga LodgingPageDesktop desde ./desktop/LodgingPageDesktop.tsx
 * - En móvil (< 768px): Carga LodgingPageMobile desde ./mobile/LodgingPageMobile.tsx
 * - Soporta override con URL (?view=mobile o ?view=desktop)
 */
export const LodgingPage: React.FC = () => {
  const isMobile = useIsMobile();
  return isMobile ? <LodgingPageMobile /> : <LodgingPageDesktop />;
};

export { LodgingPageDesktop, LodgingPageMobile };
export default LodgingPage;
