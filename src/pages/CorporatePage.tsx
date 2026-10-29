import React from 'react';
import { useIsMobile } from '../utils/useIsMobile';
import { CorporatePageDesktop } from './desktop/CorporatePageDesktop';
import { CorporatePageMobile } from './mobile/CorporatePageMobile';

/**
 * Vista Adaptativa (CorporatePage)
 * - En escritorio (>= 768px): Carga CorporatePageDesktop desde ./desktop/CorporatePageDesktop.tsx
 * - En móvil (< 768px): Carga CorporatePageMobile desde ./mobile/CorporatePageMobile.tsx
 * - Soporta override con URL (?view=mobile o ?view=desktop)
 */
export const CorporatePage: React.FC = () => {
  const isMobile = useIsMobile();
  return isMobile ? <CorporatePageMobile /> : <CorporatePageDesktop />;
};

export { CorporatePageDesktop, CorporatePageMobile };
export default CorporatePage;
