// src/types/i18n.ts

export type LanguageCode = 'en' | 'fr' | 'es' | 'ar';

export interface LocalizedContent {
  en: string;
  fr: string;
  es: string;
  ar: string;
}

export interface LinkContent {
  text: LocalizedContent;
  href: string;
  isExternal?: boolean;
}

export interface SectionContent {
  title: LocalizedContent;
  description: LocalizedContent;
  cta?: LinkContent;
  items?: {
    title: LocalizedContent;
    description: LocalizedContent;
    link?: LinkContent;
  }[];
}

export interface PageContent {
  metaTitle: LocalizedContent;
  metaDescription: LocalizedContent;
  // Add other common page fields as needed
}
