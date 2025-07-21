// src/hooks/useLanguage.ts

import { useState, useEffect } from 'react';
import { LanguageCode } from '../types/i18n';
import { getInitialLanguage, saveLanguagePreference } from '../utils/i18n';

const useLanguage = () => {
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

  return {
    currentLanguage,
    isClient,
    setLanguage: handleLanguageChange,
  };
};

export default useLanguage;
