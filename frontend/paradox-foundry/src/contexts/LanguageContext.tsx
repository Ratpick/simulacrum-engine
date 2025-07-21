// src/contexts/LanguageContext.tsx

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { LanguageCode } from '../types/i18n';
import { getInitialLanguage, saveLanguagePreference, getDirection } from '../utils/i18n';

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setCurrentLanguage: (lang: LanguageCode) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [isRTL, setIsRTL] = useState(false);
  const router = useRouter();
  const { locale, asPath } = router;

  // Initialize language from URL, localStorage, or browser settings
  useEffect(() => {
    // First, check if we have a locale in the URL
    if (locale && locale !== currentLanguage) {
      updateLanguage(locale as LanguageCode);
      return;
    }

    // If no locale in URL, check localStorage or browser settings
    const lang = getInitialLanguage();
    if (lang !== currentLanguage) {
      updateLanguage(lang);
    }
  }, [locale]);

  // Update language and related settings
  const updateLanguage = (newLang: LanguageCode) => {
    // Update state
    setCurrentLanguage(newLang);
    setIsRTL(getDirection(newLang) === 'rtl');
    
    // Update document attributes
    document.documentElement.lang = newLang;
    document.documentElement.dir = getDirection(newLang);
    
    // Save preference
    saveLanguagePreference(newLang);
  };

  // Handle language change
  const handleLanguageChange = (newLang: LanguageCode) => {
    if (newLang === currentLanguage) return;
    
    // Update URL with new locale
    const { pathname, asPath: currentPath, query } = router;
    
    // Update the URL with the new locale
    router.push(
      { pathname, query },
      asPath,
      { locale: newLang }
    );
    
    // Update language state
    updateLanguage(newLang);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setCurrentLanguage: handleLanguageChange,
        isRTL,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
