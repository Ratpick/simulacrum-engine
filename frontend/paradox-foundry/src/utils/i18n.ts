// src/utils/i18n.ts
import { LanguageCode, LocalizedContent, LinkContent } from '../types/i18n';

// Re-export types for convenience
export type { LanguageCode, LocalizedContent, LinkContent } from '../types/i18n';

/**
 * Language options for the language selector
 */
export const languageOptions = [
  { value: 'en' as const, label: 'EN', dir: 'ltr' as const },
  { value: 'fr' as const, label: 'FR', dir: 'ltr' as const },
  { value: 'es' as const, label: 'ES', dir: 'ltr' as const },
  { value: 'ar' as const, label: 'عربي', dir: 'rtl' as const },
];

/**
 * Get translated text from a LocalizedContent object
 * @param content The localized content object
 * @param lang The target language (defaults to 'en' if not provided or translation missing)
 * @returns The translated string
 */
export const t = (content: LocalizedContent, lang: LanguageCode = 'en'): string => {
  return content[lang] || content.en || '';
};

/**
 * Get translated link content
 * @param link The link content object
 * @param lang The target language
 * @returns Translated link text and href
 */
export const tLink = (link: LinkContent | undefined, lang: LanguageCode = 'en') => {
  if (!link) return { text: '', href: '#', isExternal: false };
  return {
    text: t(link.text, lang),
    href: link.href,
    isExternal: link.isExternal || false,
  };
};

/**
 * Get text direction for a language
 * @param language The language code
 * @returns 'rtl' for Arabic, 'ltr' for other languages
 */
export const getDirection = (language: LanguageCode): 'ltr' | 'rtl' => {
  return language === 'ar' ? 'rtl' : 'ltr';
};

/**
 * Check if a string is a valid language code
 * @param lang The language code to check
 * @returns boolean indicating if the language code is valid
 */
const isValidLanguageCode = (lang: string): lang is LanguageCode => {
  return languageOptions.some(option => option.value === lang);
};

/**
 * Get the current language from localStorage or browser settings
 * @returns The user's preferred language code
 */
export const getInitialLanguage = (): LanguageCode => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return 'en';
  }

  // Check for saved language preference
  try {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && isValidLanguageCode(savedLang)) {
      return savedLang as LanguageCode;
    }
  } catch (e) {
    console.warn('Failed to read language preference from localStorage', e);
  }

  // Check browser language
  if (navigator && navigator.language) {
    const browserLang = navigator.language.split('-')[0];
    if (isValidLanguageCode(browserLang)) {
      return browserLang as LanguageCode;
    }
  }

  // Default to English
  return 'en';
};

/**
 * Save language preference to localStorage
 * @param lang The language code to save
 */
export const saveLanguagePreference = (lang: LanguageCode): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('preferredLanguage', lang);
    } catch (e) {
      console.warn('Failed to save language preference to localStorage', e);
    }
  }
};

/**
 * Format a date according to the specified language and options
 * @param date The date to format
 * @param lang The language code
 * @param options Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string | number,
  lang: LanguageCode = 'en',
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(dateObj);
};

/**
 * Format a number according to the specified language and options
 * @param number The number to format
 * @param lang The language code
 * @param options Intl.NumberFormat options
 * @returns Formatted number string
 */
export const formatNumber = (
  number: number,
  lang: LanguageCode = 'en',
  options: Intl.NumberFormatOptions = {}
): string => {
  return new Intl.NumberFormat(lang, options).format(number);
};

/**
 * Get the current language direction
 * @param lang The language code
 * @returns 'rtl' for Arabic, 'ltr' for other languages
 */
export const getTextDirection = (lang: LanguageCode): 'ltr' | 'rtl' => {
  return lang === 'ar' ? 'rtl' : 'ltr';
};


