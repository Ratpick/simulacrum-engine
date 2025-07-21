// src/hocs/withLanguage.tsx

import React, { useEffect, useState } from 'react';
import { LanguageCode } from '../types/i18n';
import { getInitialLanguage, saveLanguagePreference } from '../utils/i18n';

const withLanguage = (WrappedComponent: React.ComponentType<any>) => {
  const WithLanguage: React.FC<any> = (props) => {
    const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
    const [isClient, setIsClient] = useState(false);

    // Set initial language from localStorage or browser settings
    useEffect(() => {
      setIsClient(true);
      const lang = getInitialLanguage();
      setCurrentLanguage(lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }, []);

    // Handle language change
    const handleLanguageChange = (newLang: LanguageCode) => {
      saveLanguagePreference(newLang);
      setCurrentLanguage(newLang);
      // Force a page reload to update all content
      window.location.reload();
    };

    // Don't render anything during SSR to avoid hydration mismatch
    if (!isClient) {
      return null;
    }

    return (
      <WrappedComponent
        {...props}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />
    );
  };

  // Set display name for debugging
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithLanguage.displayName = `withLanguage(${displayName})`;

  return WithLanguage;
};

export default withLanguage;
