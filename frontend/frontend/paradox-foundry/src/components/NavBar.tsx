// src/components/NavBar.tsx

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // For client-side navigation
import { useRouter } from 'next/router'; // To get/set query parameters for lens

// Define types for clarity
type LensOption = 'researcher' | 'investor' | 'oracle' | 'shadow';
type LanguageOption = 'en' | 'fr' | 'es' | 'ar';

// Data for navigation links
const navLinks = [
  { name: 'Principia Paradoxica', href: '/principia' },
  { name: 'Our Research', href: '/research' },
  { name: 'The Paradox Engine', href: '/engine' },
  { name: 'Constructing Consciousness', href: '/magazine' },
  { name: 'Ecosystem', href: '/ecosystem' },
  { name: 'Engage', href: '/engage' },
];

// Data for lens options (for the ritualized switcher)
const lensOptions: { value: LensOption; label: string; prelude: string }[] = [
  { value: 'researcher', label: 'Researcher', prelude: 'Entering the realm of empirical inquiry...' },
  { value: 'investor', label: 'Investor', prelude: 'Illuminating the pathways of strategic investment...' },
  { value: 'oracle', label: 'Oracle', prelude: 'Consulting the depths of emergent truths...' },
  { value: 'shadow', label: 'Shadow', prelude: 'Navigating the unseen currents of reality...' },
];

// Data for language options
const languageOptions: { value: LanguageOption; label: string; dir: 'ltr' | 'rtl' }[] = [
  { value: 'en', label: 'EN', dir: 'ltr' },
  { value: 'fr', label: 'FR', dir: 'ltr' },
  { value: 'es', label: 'ES', dir: 'ltr' },
  { value: 'ar', label: 'عر', dir: 'rtl' }, // Arabic for Right-To-Left
];

const NavBar: React.FC = () => {
  const router = useRouter(); // Next.js router hook
  const [currentLens, setCurrentLens] = useState<LensOption>('researcher'); // Default lens
  const [currentLanguage, setCurrentLanguage] = useState<LanguageOption>('en'); // Default language
  const [preludeMessage, setPreludeMessage] = useState<string>(''); // State for the ritual prelude message

  // Effect to read lens from URL on initial load and update language direction
  useEffect(() => {
    const { lens } = router.query;
    if (lens && typeof lens === 'string' && lensOptions.some(opt => opt.value === lens)) {
      setCurrentLens(lens as LensOption);
    }

    // Set initial language direction based on default language
    const initialLang = languageOptions.find(lang => lang.value === currentLanguage);
    if (initialLang) {
      document.documentElement.setAttribute('lang', initialLang.value);
      document.documentElement.setAttribute('dir', initialLang.dir);
    }
  }, [router.query, currentLanguage]); // currentLanguage added to re-run effect if language changes

  // Handle lens change
  const handleLensChange = (newLens: LensOption) => {
    if (newLens === currentLens) return; // No change needed

    setCurrentLens(newLens);
    setPreludeMessage(lensOptions.find(opt => opt.value === newLens)?.prelude || '');

    // Update URL query parameter without full page reload
    router.push({
      pathname: router.pathname,
      query: { ...router.query, lens: newLens },
    }, undefined, { shallow: true }); // shallow: true keeps state in sync without re-running data fetching
  };

  // Handle language change
  const handleLanguageChange = (newLang: LanguageOption) => {
    setCurrentLanguage(newLang);
    const selectedLang = languageOptions.find(lang => lang.value === newLang);
    if (selectedLang) {
      document.documentElement.setAttribute('lang', selectedLang.value);
      document.documentElement.setAttribute('dir', selectedLang.dir);
      // In a real app, this would also trigger content translation on the page.
      // For this component, it primarily handles the HTML lang/dir attributes.
    }
  };

  return (
    // Sticky navigation bar with deep black background and subtle shadow
    <nav className="sticky top-0 z-50 w-full bg-neutral-950 bg-opacity-95 backdrop-blur-sm shadow-lg py-4 px-6 sm:px-8 lg:px-12 transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap">
        {/* Logo/Site Title */}
        <Link href="/" passHref>
          <div className="text-3xl font-bold text-amber-400 hover:text-amber-300 transition-colors duration-200 cursor-pointer flex-shrink-0">
            Paradox Foundry
          </div>
        </Link>

        {/* Navigation Links (hidden on small screens, revealed by a future mobile menu) */}
        <div className="hidden lg:flex items-center space-x-8 flex-grow justify-center">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} passHref>
              <div className="text-lg font-medium text-amber-300 hover:text-amber-100 relative group cursor-pointer">
                {link.name}
                {/* Underline effect on hover */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
              </div>
            </Link>
          ))}
        </div>

        {/* Controls: Lens Switcher & Language Selector */}
        <div className="flex items-center space-x-4 ml-auto lg:ml-0 flex-shrink-0">
          {/* Lens Switcher (Ritualized) */}
          <div className="relative group">
            <button
              className="flex items-center px-4 py-2 bg-neutral-800 text-amber-200 rounded-full text-sm font-medium hover:bg-neutral-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-haspopup="true"
              aria-expanded="true"
            >
              <span className="mr-2 capitalize">{currentLens}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {/* Dropdown for lens options */}
            <div className="absolute right-0 mt-2 w-48 bg-neutral-800 rounded-lg shadow-xl py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform scale-95 group-hover:scale-100 origin-top-right">
              {lensOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleLensChange(option.value)}
                  className={`block w-full text-left px-4 py-2 text-sm ${currentLens === option.value ? 'bg-amber-700 text-white' : 'text-amber-100 hover:bg-neutral-700'} capitalize`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Language Selector */}
          <div className="relative group">
            <button
              className="flex items-center px-4 py-2 bg-neutral-800 text-amber-200 rounded-full text-sm font-medium hover:bg-neutral-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-haspopup="true"
              aria-expanded="true"
            >
              <span className="mr-2">{currentLanguage.toUpperCase()}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {/* Dropdown for language options */}
            <div className="absolute right-0 mt-2 w-32 bg-neutral-800 rounded-lg shadow-xl py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform scale-95 group-hover:scale-100 origin-top-right">
              {languageOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleLanguageChange(option.value)}
                  className={`block w-full text-left px-4 py-2 text-sm ${currentLanguage === option.value ? 'bg-amber-700 text-white' : 'text-amber-100 hover:bg-neutral-700'}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ritual Prelude Message Display */}
      {preludeMessage && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-4 py-2 bg-amber-900 text-amber-100 text-sm rounded-lg shadow-lg animate-fade-in-out">
          {preludeMessage}
        </div>
      )}
    </nav>
  );
};

export default NavBar;