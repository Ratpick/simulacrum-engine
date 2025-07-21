// src/components/Layout.tsx

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import NavBar from './NavBar';
import { LocalizedContent } from '../types/i18n';
import { useLanguage } from '../contexts/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

// Weave tongues - Layout sacred texts
const layoutContent = {
  defaultTitle: {
    en: 'Paradox Foundry',
    fr: 'Fonderie du Paradoxe',
    es: 'Forja Paradoja',
    ar: 'مسبك المفارقة'
  } as LocalizedContent,
  defaultDescription: {
    en: 'Exploring the boundaries of reality and imagination',
    fr: 'Explorer les frontières de la réalité et de l\'imagination',
    es: 'Explorando los límites de la realidad y la imaginación',
    ar: 'استكشاف حدود الواقع والخيال'
  } as LocalizedContent,
  copyright: {
    en: 'All rights reserved.',
    fr: 'Tous droits réservés.',
    es: 'Todos los derechos reservados.',
    ar: 'جميع الحقوق محفوظة.'
  } as LocalizedContent
};

const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
  const { currentLanguage } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  // Translation helper
  const t = (content: LocalizedContent): string => {
    return content[currentLanguage] || content.en || '';
  };

  // Resolve title and description with defaults
  const resolvedTitle = title || t(layoutContent.defaultTitle);
  const resolvedDescription = description || t(layoutContent.defaultDescription);

  // Set client-side flag to handle SSR hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render anything during SSR to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-200">
      <Head>
        <title>{resolvedTitle}</title>
        <meta name="description" content={resolvedDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <NavBar />
      
      <main className="pt-20">
        {children}
      </main>
      
      <footer className="bg-neutral-900/80 backdrop-blur-sm border-t border-amber-400/10 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-amber-400/60">
            <p>© {new Date().getFullYear()} {t(layoutContent.defaultTitle)}. {t(layoutContent.copyright)}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
