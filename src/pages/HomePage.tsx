import React, { lazy } from 'react';
import { useIsMobile } from '../utils/useIsMobile';

const HomePageDesktop = lazy(() => import('./desktop/HomePageDesktop'));
const HomePageMobile = lazy(() => import('./mobile/HomePageMobile'));

/**
 * Vista Adaptativa (HomePage) con carga diferida por dispositivo
 * - En escritorio (>= 768px): Solo descarga HomePageDesktop
 * - En móvil (< 768px): Solo descarga HomePageMobile
 */
export const HomePage: React.FC = () => {
  const isMobile = useIsMobile();
  return isMobile ? <HomePageMobile /> : <HomePageDesktop />;
};

export default HomePage;
