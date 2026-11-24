import React, { lazy } from 'react';
import { useIsMobile } from '../utils/useIsMobile';

const ContactPageDesktop = lazy(() => import('./desktop/ContactPageDesktop'));
const ContactPageMobile = lazy(() => import('./mobile/ContactPageMobile'));

export const ContactPage: React.FC = () => {
  const isMobile = useIsMobile();
  return isMobile ? <ContactPageMobile /> : <ContactPageDesktop />;
};

export default ContactPage;
