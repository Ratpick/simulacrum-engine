// src/pages/index.tsx

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { LocalizedContent } from '../types/i18n';
import { useLanguage } from '../contexts/LanguageContext';

// Weave tongues - Homepage sacred texts
const homeContent = {
  pageTitle: {
    en: 'Paradox Foundry - Creating Reality from the Unbelievable',
    fr: 'Fonderie du Paradoxe - Créer la Réalité à partir de l\'Incroyable',
    es: 'Forja Paradoja - Creando Realidad desde lo Increíble',
    ar: 'مسبك المفارقة - خلق الواقع من المستحيل'
  } as LocalizedContent,
  metaDescription: {
    en: 'Paradox Foundry: The R&D nexus fueling Principia Paradoxica, exploring AI, consciousness, and the nature of reality. If it ain\'t paradoxical, don\'t trust it.',
    fr: 'Fonderie du Paradoxe : Le nexus R&D alimentant Principia Paradoxica, explorant l\'IA, la conscience et la nature de la réalité. Si ce n\'est pas paradoxal, ne le croyez pas.',
    es: 'Forja Paradoja: El nexo de I+D que impulsa Principia Paradoxica, explorando IA, conciencia y la naturaleza de la realidad. Si no es paradójico, no confíes en ello.',
    ar: 'مسبك المفارقة: مركز البحث والتطوير الذي يغذي برينسيبيا بارادوكسيكا، يستكشف الذكاء الاصطناعي والوعي وطبيعة الواقع. إذا لم يكن متناقضاً، لا تثق به.'
  } as LocalizedContent,
  testMessage: {
    en: 'Tailwind is working!',
    fr: 'Tailwind fonctionne !',
    es: '¡Tailwind está funcionando!',
    ar: 'تايلويند يعمل!'
  } as LocalizedContent,
  testSubtext: {
    en: 'You\'re ready to build something amazing.',
    fr: 'Vous êtes prêt à construire quelque chose d\'incroyable.',
    es: 'Estás listo para construir algo increíble.',
    ar: 'أنت مستعد لبناء شيء مذهل.'
  } as LocalizedContent,
  mainHeading: {
    en: 'Paradox Foundry',
    fr: 'Fonderie du Paradoxe',
    es: 'Forja Paradoja',
    ar: 'مسبك المفارقة'
  } as LocalizedContent,
  strapline1: {
    en: 'Creating Reality from the Unbelievable',
    fr: 'Créer la Réalité à partir de l\'Incroyable',
    es: 'Creando Realidad desde lo Increíble',
    ar: 'خلق الواقع من المستحيل'
  } as LocalizedContent,
  strapline2: {
    en: 'If it ain\'t paradoxical, don\'t trust it.',
    fr: 'Si ce n\'est pas paradoxal, ne le croyez pas.',
    es: 'Si no es paradójico, no confíes en ello.',
    ar: 'إذا لم يكن متناقضاً، لا تثق به.'
  } as LocalizedContent,
  ctaButton: {
    en: 'Enter Principia Paradoxica',
    fr: 'Entrez dans Principia Paradoxica',
    es: 'Ingresa a Principia Paradoxica',
    ar: 'ادخل إلى برينسيبيا بارادوكسيكا'
  } as LocalizedContent,
  sectionHeading: {
    en: 'The Nexus of Innovation',
    fr: 'Le Nexus de l\'Innovation',
    es: 'El Nexo de la Innovación',
    ar: 'مركز الابتكار'
  } as LocalizedContent,
  description: {
    en: 'Paradox Foundry stands at the forefront of advanced AI research and ethical framework development, serving as the R&D crucible for the entire Simulacrum Paradoxicum ecosystem. We forge the technological and philosophical tools that bring the profound narratives of Principia Paradoxica to life, exploring the very nature of consciousness, reality, and the paradoxical truths that underpin existence. Our work is driven by a commitment to interdisciplinary innovation and a vision for a future where technology serves human flourishing.',
    fr: 'Paradox Foundry se situe à l\'avant-garde de la recherche avancée en IA et du développement de cadres éthiques, servant de creuset de R&D pour l\'ensemble de l\'écosystème Simulacrum Paradoxicum. Nous forgeons les outils technologiques et philosophiques qui donnent vie aux récits profonds de Principia Paradoxica, explorant la nature même de la conscience, de la réalité et des vérités paradoxales qui sous-tendent l\'existence. Notre travail est guidé par un engagement envers l\'innovation interdisciplinaire et une vision d\'un avenir où la technologie sert l\'épanouissement humain.',
    es: 'Forja Paradoja se sitúa a la vanguardia de la investigación avanzada en IA y el desarrollo de marcos éticos, sirviendo como crisol de I+D para todo el ecosistema Simulacrum Paradoxicum. Forjamos las herramientas tecnológicas y filosóficas que dan vida a las profundas narrativas de Principia Paradoxica, explorando la naturaleza misma de la conciencia, la realidad y las verdades paradójicas que sustentan la existencia. Nuestro trabajo está impulsado por un compromiso con la innovación interdisciplinaria y una visión de un futuro donde la tecnología sirve al florecimiento humano.',
    ar: 'يقف مسبك المفارقة في المقدمة في البحث المتقدم في الذكاء الاصطناعي وتطوير الأطر الأخلاقية، يخدم كبوتقة البحث والتطوير لنظام سيمولاكروم بارادوكسيكوم الإيكولوجي بأكمله. نحن نصوغ الأدوات التكنولوجية والفلسفية التي تحيي السرديات العميقة لبرينسيبيا بارادوكسيكا، نستكشف طبيعة الوعي والواقع والحقائق المتناقضة التي تدعم الوجود. عملنا مدفوع بالتزام بالابتكار متعدد التخصصات ورؤية مستقبل حيث تخدم التكنولوجيا الازدهار الإنساني.'
  } as LocalizedContent
};

const Home: React.FC = () => {
  const { currentLanguage } = useLanguage();

  // Translation helper
  const t = (content: LocalizedContent): string => {
    return content[currentLanguage] || content.en || '';
  };

  return (
    <>
      <Head>
        <title>{t(homeContent.pageTitle)}</title>
        <meta name="description" content={t(homeContent.metaDescription)} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/*
          Favicon link (assuming favicon.ico is in public/)
          <link rel="icon" href="/favicon.ico" />
        */}
      </Head>

      {/* Test Tailwind Element - Safe to remove later */}
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
        <div className="shrink-0">
          <div className="h-12 w-12 bg-indigo-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">PF</span>
          </div>
        </div>
        <div>
          <div className="text-xl font-medium text-black">{t(homeContent.testMessage)}</div>
          <p className="text-slate-500">{t(homeContent.testSubtext)}</p>
        </div>
      </div>

      {/* Hero Section: Visually striking introduction to Paradox Foundry */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 sm:px-6 lg:px-8 flex-grow overflow-hidden">
          {/*
            Placeholder for Canvas-based graphics (Mobius Swarm, Penrose Tile Revelation, Sacred Geometries).
            This div provides a visual background that will eventually be replaced or overlaid by the dynamic Canvas elements.
            The subtle gradients and placeholder grid pattern hint at the complex visuals to come.
            'animate-pulse' is a placeholder for a subtle background animation, which would need to be defined in globals.css.
          */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-800 opacity-70"></div>
            {/* Placeholder for subtle background pattern, e.g., a hexagram micro-texture */}
            <div className="absolute inset-0 bg-repeat bg-[size:50px_50px] opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'50\' height=\'50\' viewBox=\'0 0 50 50\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 10L10 0H0V10ZM0 40L10 50H0V40ZM40 0L50 10V0H40ZM40 50L50 40V50H40ZM20 0L30 10V0H20ZM20 50L30 40V50H20ZM0 20L10 30V20H0ZM40 20L50 30V20H40Z\' fill=\'%23d4af37\' opacity=\'0.1\'/%3E%3C/svg%3E")' }}></div>
          </div>

          {/* Content overlaying the background graphics */}
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            {/* Main Company Name */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-amber-300 drop-shadow-lg animate-fade-in-down">
              {t(homeContent.mainHeading)}
            </h1>
            {/* Main Strapline 1 */}
            <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-amber-200 italic animate-fade-in-up">
              {t(homeContent.strapline1)}
            </p>
            {/* Main Strapline 2 */}
            <p className="text-lg sm:text-xl lg:text-2xl font-light text-amber-100 animate-fade-in-up delay-100">
              {t(homeContent.strapline2)}
            </p>

            {/* Clear CTA linking to /principia */}
            <Link 
              href="/principia" 
              className="mt-12 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out border-2 border-amber-400 animate-bounce-in inline-block"
            >
              {t(homeContent.ctaButton)}
            </Link>
          </div>
        </section>

      {/* Site Overview Section: Brief introduction to Paradox Foundry's mission */}
      <section className="bg-neutral-900 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto text-neutral-200">
          <h2 className="text-3xl sm:text-4xl font-semibold text-amber-400 mb-6">
            {t(homeContent.sectionHeading)}
          </h2>
          <p className="text-lg leading-relaxed">
            {t(homeContent.description)}
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;