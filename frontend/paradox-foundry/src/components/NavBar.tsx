// src/components/NavBar.tsx

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { languageOptions } from '../utils/i18n';
import { LocalizedContent } from '../types/i18n';
import { useLanguage } from '../contexts/LanguageContext';

type NavLink = {
  name: LocalizedContent;
  href: string;
};

// Navigation links with translations
const navLinks: NavLink[] = [
  { 
    name: {
      en: 'Principia Paradoxica',
      fr: 'Principia Paradoxica',
      es: 'Principia Paradoxica',
      ar: 'برينسيبيا بارادوكسيكا'
    }, 
    href: '/principia' 
  },
  { 
    name: {
      en: 'Our Research',
      fr: 'Notre Recherche',
      es: 'Nuestra Investigación',
      ar: 'بحثنا'
    }, 
    href: '/research' 
  },
  { 
    name: {
      en: 'The Paradox Engine',
      fr: 'Le Moteur du Paradoxe',
      es: 'El Motor de la Paradoja',
      ar: 'محرك المفارقة'
    }, 
    href: '/engine' 
  },
  { 
    name: {
      en: 'Constructing Consciousness',
      fr: 'Construire la Conscience',
      es: 'Construyendo Conciencia',
      ar: 'بناء الوعي'
    }, 
    href: '/magazine' 
  },
  { 
    name: {
      en: 'Ecosystem',
      fr: 'Écosystème',
      es: 'Ecosistema',
      ar: 'النظام البيئي'
    }, 
    href: '/ecosystem' 
  },
  { 
    name: {
      en: 'Engage',
      fr: 'Engagez-vous',
      es: 'Participa',
      ar: 'انضم إلينا'
    }, 
    href: '/engage' 
  },
  {
    name: {
      en: 'Secret',
      fr: 'Secret',
      es: 'Secreto',
      ar: 'سري'
    },
    href: '/secret-entrance/index.html'
  },
];

const NavBar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentLanguage, setCurrentLanguage, isRTL } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  // Set client-side flag to handle SSR hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Helper function to get translated text
  const t = (content: LocalizedContent): string => {
    return content[currentLanguage] || content.en || '';
  };

  // Don't render anything during SSR to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-neutral-950 bg-opacity-95 backdrop-blur-sm shadow-lg py-4 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-amber-400 hover:text-amber-300 transition-colors">
          Paradox Foundry
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-lg font-medium text-amber-300 hover:text-amber-100 relative group"
            >
              {t(link.name)}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Language Selector */}
        <div className="relative group">
          <button
            className="flex items-center px-4 py-2 bg-neutral-800 text-amber-200 rounded-full text-sm font-medium hover:bg-neutral-700 transition-colors"
            aria-haspopup="true"
            aria-expanded="true"
          >
            <span className="mr-2">{currentLanguage.toUpperCase()}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div className="absolute right-0 mt-2 w-32 bg-neutral-800 rounded-lg shadow-xl py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            {languageOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setCurrentLanguage(option.value)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currentLanguage === option.value 
                    ? 'bg-amber-700 text-white' 
                    : 'text-amber-100 hover:bg-neutral-700'
                }`}
                dir={option.dir}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
