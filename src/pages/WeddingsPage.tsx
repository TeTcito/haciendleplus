import React, { lazy } from 'react';
import { useIsMobile } from '../utils/useIsMobile';

const WeddingsPageDesktop = lazy(() => import('./desktop/WeddingsPageDesktop'));
const WeddingsPageMobile = lazy(() => import('./mobile/WeddingsPageMobile'));

export const WeddingsPage: React.FC = () => {
  const isMobile = useIsMobile();
  return isMobile ? <WeddingsPageMobile /> : <WeddingsPageDesktop />;
};

export default WeddingsPage;
