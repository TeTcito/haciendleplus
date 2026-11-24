import React, { lazy } from 'react';
import { useIsMobile } from '../utils/useIsMobile';

const CorporatePageDesktop = lazy(() => import('./desktop/CorporatePageDesktop'));
const CorporatePageMobile = lazy(() => import('./mobile/CorporatePageMobile'));

export const CorporatePage: React.FC = () => {
  const isMobile = useIsMobile();
  return isMobile ? <CorporatePageMobile /> : <CorporatePageDesktop />;
};

export default CorporatePage;
