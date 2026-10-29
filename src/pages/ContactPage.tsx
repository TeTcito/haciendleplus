import React from 'react';
import { useIsMobile } from '../utils/useIsMobile';
import { ContactPageDesktop } from './desktop/ContactPageDesktop';
import { ContactPageMobile } from './mobile/ContactPageMobile';

/**
 * Vista Adaptativa (ContactPage)
 * - En escritorio (>= 768px): Carga ContactPageDesktop desde ./desktop/ContactPageDesktop.tsx
 * - En móvil (< 768px): Carga ContactPageMobile desde ./mobile/ContactPageMobile.tsx
 * - Soporta override con URL (?view=mobile o ?view=desktop)
 */
export const ContactPage: React.FC = () => {
  const isMobile = useIsMobile();
  return isMobile ? <ContactPageMobile /> : <ContactPageDesktop />;
};

export { ContactPageDesktop, ContactPageMobile };
export default ContactPage;
