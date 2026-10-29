import React from 'react';
import { useIsMobile } from '../utils/useIsMobile';
import { WeddingsPageDesktop } from './desktop/WeddingsPageDesktop';
import { WeddingsPageMobile } from './mobile/WeddingsPageMobile';

/**
 * Vista Adaptativa (WeddingsPage)
 * - En escritorio (>= 768px): Carga WeddingsPageDesktop desde ./desktop/WeddingsPageDesktop.tsx
 * - En móvil (< 768px): Carga WeddingsPageMobile desde ./mobile/WeddingsPageMobile.tsx
 * - Soporta override con URL (?view=mobile o ?view=desktop)
 */
export const WeddingsPage: React.FC = () => {
  const isMobile = useIsMobile();
  return isMobile ? <WeddingsPageMobile /> : <WeddingsPageDesktop />;
};

export { WeddingsPageDesktop, WeddingsPageMobile };
export default WeddingsPage;
