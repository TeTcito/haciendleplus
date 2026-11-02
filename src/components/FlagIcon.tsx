import React from 'react';
import { SupportedLanguage } from '../i18n/types';

interface FlagIconProps {
  code: SupportedLanguage | string;
  className?: string;
  size?: number | string;
}

/**
 * High-definition vector SVG flags for all supported languages.
 * Guarantees 100% crisp, colorful rendering across all operating systems
 * (especially Windows 10/11 where flag emojis are otherwise rendered as text letters).
 */
export const FlagIcon: React.FC<FlagIconProps> = ({
  code,
  className = 'w-4 h-3 rounded-[2px] shadow-xs inline-block shrink-0',
}) => {
  switch (code) {
    case 'es':
      // Spain (España)
      return (
        <svg
          viewBox="0 0 750 500"
          className={className}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="750" height="500" fill="#c60b1e" />
          <rect width="750" height="250" y="125" fill="#ffc400" />
          {/* Simplified decorative crown / shield mark */}
          <circle cx="210" cy="250" r="42" fill="#c60b1e" opacity="0.85" />
          <rect x="195" y="225" width="30" height="48" rx="6" fill="#ffc400" />
          <path d="M190 220 L210 200 L230 220 Z" fill="#c60b1e" />
        </svg>
      );

    case 'en':
      // United States (English)
      return (
        <svg
          viewBox="0 0 741 390"
          className={className}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="741" height="390" fill="#b22234" />
          <path
            d="M0,30H741M0,90H741M0,150H741M0,210H741M0,270H741M0,330H741"
            stroke="#ffffff"
            strokeWidth="30"
          />
          <rect width="296" height="210" fill="#3c3b6e" />
          {/* Crisp canton star field */}
          <g fill="#ffffff">
            <circle cx="45" cy="35" r="9" />
            <circle cx="105" cy="35" r="9" />
            <circle cx="165" cy="35" r="9" />
            <circle cx="225" cy="35" r="9" />
            <circle cx="75" cy="70" r="9" />
            <circle cx="135" cy="70" r="9" />
            <circle cx="195" cy="70" r="9" />
            <circle cx="45" cy="105" r="9" />
            <circle cx="105" cy="105" r="9" />
            <circle cx="165" cy="105" r="9" />
            <circle cx="225" cy="105" r="9" />
            <circle cx="75" cy="140" r="9" />
            <circle cx="135" cy="140" r="9" />
            <circle cx="195" cy="140" r="9" />
            <circle cx="45" cy="175" r="9" />
            <circle cx="105" cy="175" r="9" />
            <circle cx="165" cy="175" r="9" />
            <circle cx="225" cy="175" r="9" />
          </g>
        </svg>
      );

    case 'pt':
      // Brazil (Português)
      return (
        <svg
          viewBox="0 0 720 504"
          className={className}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="720" height="504" fill="#009739" />
          <polygon points="360,42 666,252 360,462 54,252" fill="#fedd00" />
          <circle cx="360" cy="252" r="126" fill="#012169" />
          {/* White celestial band */}
          <path
            d="M245,268 C 290,230 425,230 475,274 C 425,216 290,216 245,268 Z"
            fill="#ffffff"
          />
          {/* Southern Cross constellation dots */}
          <circle cx="360" cy="275" r="5" fill="#ffffff" />
          <circle cx="345" cy="290" r="4" fill="#ffffff" />
          <circle cx="375" cy="290" r="4" fill="#ffffff" />
          <circle cx="360" cy="305" r="4" fill="#ffffff" />
          <circle cx="385" cy="300" r="3" fill="#ffffff" />
        </svg>
      );

    case 'fr':
      // France (Français)
      return (
        <svg
          viewBox="0 0 900 600"
          className={className}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="300" height="600" fill="#002654" />
          <rect x="300" width="300" height="600" fill="#ffffff" />
          <rect x="600" width="300" height="600" fill="#ed2939" />
        </svg>
      );

    case 'de':
      // Germany (Deutsch)
      return (
        <svg
          viewBox="0 0 500 300"
          className={className}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="500" height="100" fill="#000000" />
          <rect y="100" width="500" height="100" fill="#dd0000" />
          <rect y="200" width="500" height="100" fill="#ffce00" />
        </svg>
      );

    case 'zh':
      // China (简体中文)
      return (
        <svg
          viewBox="0 0 900 600"
          className={className}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="900" height="600" fill="#de2910" />
          {/* Main big star */}
          <polygon
            points="150,55 178,141 268,141 195,194 223,280 150,227 77,280 105,194 32,141 122,141"
            fill="#ffde00"
          />
          {/* 4 smaller stars in arc */}
          <circle cx="300" cy="60" r="15" fill="#ffde00" />
          <circle cx="360" cy="120" r="15" fill="#ffde00" />
          <circle cx="360" cy="200" r="15" fill="#ffde00" />
          <circle cx="300" cy="260" r="15" fill="#ffde00" />
        </svg>
      );

    default:
      return null;
  }
};
