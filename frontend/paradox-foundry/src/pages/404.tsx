// src/pages/404.tsx

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { LocalizedContent } from '../types/i18n';
import { useLanguage } from '../contexts/LanguageContext';

// Weave tongues - 404 reality fold texts
const notFoundContent = {
  pageTitle: {
    en: '404 - Page Not Found | Paradox Foundry',
    fr: '404 - Page Introuvable | Fonderie du Paradoxe',
    es: '404 - Página No Encontrada | Forja Paradoja',
    ar: '404 - الصفحة غير موجودة | مسبك المفارقة'
  } as LocalizedContent,
  metaDescription: {
    en: 'The page you are looking for does not exist in this reality.',
    fr: 'La page que vous recherchez n\'existe pas dans cette réalité.',
    es: 'La página que buscas no existe en esta realidad.',
    ar: 'الصفحة التي تبحث عنها غير موجودة في هذا الواقع.'
  } as LocalizedContent,
  heading: {
    en: 'Reality Not Found',
    fr: 'Réalité Introuvable',
    es: 'Realidad No Encontrada',
    ar: 'الواقع غير موجود'
  } as LocalizedContent,
  description: {
    en: 'The page you seek exists in another paradox fold. Perhaps it was never meant to be, or perhaps it is yet to become.',
    fr: 'La page que vous cherchez existe dans un autre pli paradoxal. Peut-être n\'a-t-elle jamais été destinée à être, ou peut-être est-elle encore à devenir.',
    es: 'La página que buscas existe en otro pliegue paradójico. Quizás nunca estuvo destinada a ser, o quizás aún está por convertirse.',
    ar: 'الصفحة التي تبحث عنها موجودة في طية مفارقة أخرى. ربما لم تكن مقدرة للوجود، أو ربما لم تصبح بعد.'
  } as LocalizedContent,
  returnButton: {
    en: 'Return to the Foundry',
    fr: 'Retourner à la Fonderie',
    es: 'Regresar a la Forja',
    ar: 'العودة إلى المسبك'
  } as LocalizedContent
};

const Custom404: React.FC = () => {
  const { currentLanguage } = useLanguage();

  // Translation helper
  const t = (content: LocalizedContent): string => {
    return content[currentLanguage] || content.en || '';
  };

  return (
    <>
      <Head>
        <title>{t(notFoundContent.pageTitle)}</title>
        <meta name="description" content={t(notFoundContent.metaDescription)} />
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-amber-400 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-amber-300 mb-6">
            {t(notFoundContent.heading)}
          </h2>
          <p className="text-lg text-neutral-300 mb-8">
            {t(notFoundContent.description)}
          </p>
          <Link 
            href="/" 
            className="inline-block px-6 py-3 bg-amber-500 text-neutral-950 font-semibold rounded-full hover:bg-amber-600 transition-colors"
          >
            {t(notFoundContent.returnButton)}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Custom404;