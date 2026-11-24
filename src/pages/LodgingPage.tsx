import React, { lazy } from 'react';
import { useIsMobile } from '../utils/useIsMobile';

const LodgingPageDesktop = lazy(() => import('./desktop/LodgingPageDesktop'));
const LodgingPageMobile = lazy(() => import('./mobile/LodgingPageMobile'));

export const LodgingPage: React.FC = () => {
  const isMobile = useIsMobile();
  return isMobile ? <LodgingPageMobile /> : <LodgingPageDesktop />;
};

export default LodgingPage;
