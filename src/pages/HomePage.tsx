import React from 'react';
import { useIsMobile } from '../utils/useIsMobile';
import { HomePageDesktop } from './desktop/HomePageDesktop';
import { HomePageMobile } from './mobile/HomePageMobile';

/**
 * Vista Adaptativa (HomePage)
 * - En escritorio (>= 768px): Carga HomePageDesktop desde ./desktop/HomePageDesktop.tsx
 * - En móvil (< 768px): Carga HomePageMobile desde ./mobile/HomePageMobile.tsx
 * - Soporta override con URL (?view=mobile o ?view=desktop)
 */
export const HomePage: React.FC = () => {
  const isMobile = useIsMobile();
  return isMobile ? <HomePageMobile /> : <HomePageDesktop />;
};

export { HomePageDesktop, HomePageMobile };
export default HomePage;
