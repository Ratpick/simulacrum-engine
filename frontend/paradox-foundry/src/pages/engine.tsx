// src/pages/engine.tsx

import React from 'react';
import Head from 'next/head';
import { LocalizedContent } from '../types/i18n';
import { useLanguage } from '../contexts/LanguageContext';

// Weave tongues - Engine sacred texts
const engineContent = {
  pageTitle: {
    en: 'The Paradox Engine - Forging Living Narratives',
    fr: 'Le Moteur du Paradoxe - Forger des Récits Vivants',
    es: 'El Motor de la Paradoja - Forjando Narrativas Vivientes',
    ar: 'محرك المفارقة - صياغة السرديات الحية'
  } as LocalizedContent,
  metaDescription: {
    en: 'Discover The Paradox Engine, a dynamic narrative platform powered by AI and I Ching principles, where your choices shape reality.',
    fr: 'Découvrez le Moteur du Paradoxe, une plateforme narrative dynamique alimentée par l\'IA et les principes du I Ching, où vos choix façonnent la réalité.',
    es: 'Descubre el Motor de la Paradoja, una plataforma narrativa dinámica impulsada por IA y principios del I Ching, donde tus elecciones dan forma a la realidad.',
    ar: 'اكتشف محرك المفارقة، منصة سردية ديناميكية مدعومة بالذكاء الاصطناعي ومبادئ الي تشينغ، حيث تشكل اختياراتك الواقع.'
  } as LocalizedContent,
  vibePrinciple: {
    en: 'You are in: Paradox Fold 3 – Narrative Emergence',
    fr: 'Vous êtes dans : Pli du Paradoxe 3 – Émergence Narrative',
    es: 'Estás en: Pliegue Paradoja 3 – Emergencia Narrativa',
    ar: 'أنت في: طية المفارقة 3 – ظهور السرد'
  } as LocalizedContent,
  mainHeading: {
    en: 'The Paradox Engine',
    fr: 'Le Moteur du Paradoxe',
    es: 'El Motor de la Paradoja',
    ar: 'محرك المفارقة'
  } as LocalizedContent,
  subheading: {
    en: 'Forging Living Narratives, Where Your Choices Fold Reality.',
    fr: 'Forger des Récits Vivants, Où Vos Choix Plient la Réalité.',
    es: 'Forjando Narrativas Vivientes, Donde Tus Elecciones Pliegan la Realidad.',
    ar: 'صياغة السرديات الحية، حيث تطوي اختياراتك الواقع.'
  } as LocalizedContent,
  tagline: {
    en: 'Beyond gaming, into an immersive mythopoeic experience.',
    fr: 'Au-delà du jeu, vers une expérience mythopoétique immersive.',
    es: 'Más allá de los juegos, hacia una experiencia mitopoética inmersiva.',
    ar: 'أبعد من اللعب، في تجربة أسطورية شعرية غامرة.'
  } as LocalizedContent,
  sectionHeading1: {
    en: 'More Than a Game Engine: Living Narratives',
    fr: 'Plus qu\'un Moteur de Jeu : Récits Vivants',
    es: 'Más que un Motor de Juego: Narrativas Vivientes',
    ar: 'أكثر من محرك لعبة: سرديات حية'
  } as LocalizedContent,
  description1: {
    en: 'The Paradox Engine is conceived as more than just a game engine; it is a dynamic platform for creating and experiencing interactive narratives deeply infused with the philosophical and technological innovations of the Simulacrum Paradoxicum.',
    fr: 'Le Moteur du Paradoxe est conçu comme plus qu\'un simple moteur de jeu ; il s\'agit d\'une plateforme dynamique pour créer et vivre des récits interactifs profondément imprégnés des innovations philosophiques et technologiques du Simulacrum Paradoxicum.',
    es: 'El Motor de la Paradoja está concebido como más que un simple motor de juego; es una plataforma dinámica para crear y experimentar narrativas interactivas profundamente imbuidas con las innovaciones filosóficas y tecnológicas del Simulacrum Paradoxicum.',
    ar: 'تم تصميم محرك المفارقة ليكون أكثر من مجرد محرك لعبة؛ إنه منصة ديناميكية لإنشاء وتجربة السرديات التفاعلية المشبعة بعمق بالابتكارات الفلسفية والتكنولوجية لسيمولاكروم بارادوكسيكوم.'
  } as LocalizedContent
};

const Engine: React.FC = () => {
  const { currentLanguage } = useLanguage();

  // Translation helper
  const t = (content: LocalizedContent): string => {
    return content[currentLanguage] || content.en || '';
  };

  return (
    <>
      <Head>
        <title>{t(engineContent.pageTitle)}</title>
        <meta name="description" content={t(engineContent.metaDescription)} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Vibe Principle/Paradox Tagging */}
      <div className="absolute top-28 right-8 z-20 text-neutral-600 text-sm opacity-0 hover:opacity-100 transition-opacity duration-300 hidden md:block" title="Current Principle">
        {t(engineContent.vibePrinciple)}
      </div>

      {/* Hero-like Introduction for The Paradox Engine */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-4 sm:px-6 lg:px-8 flex-grow overflow-hidden">
        {/* Placeholder for dynamic background graphics related to narrative flow or game mechanics */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 to-blue-900/40 opacity-70"></div>
          {/* Background pattern suggesting narrative branching or recursive structures */}
          <div className="absolute inset-0 bg-repeat bg-[size:100px_100px] opacity-5 animate-pulse" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0L50 50L0 100L50 50L100 0L50 50L100 100Z\' fill=\'%23a78bfa\' opacity=\'0.1\'/%3E%3C/svg%3E")' }}></div>
          {/* Placeholder for a central, subtly animated, unfolding geometric narrative element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-80 border-4 border-purple-500 rounded-full opacity-30 animate-spin-slow"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-amber-300 drop-shadow-lg animate-fade-in-down">
            {t(engineContent.mainHeading)}
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-amber-200 italic animate-fade-in-up">
            {t(engineContent.subheading)}
          </p>
          <p className="text-lg sm:text-xl lg:text-2xl font-light text-amber-100 animate-fade-in-up delay-100">
            {t(engineContent.tagline)}
          </p>
        </div>
      </section>

      {/* Content Sections for The Paradox Engine */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction & Core Architecture */}
        <section className="mb-20 animate-fade-in-up">
          <h2 className="text-4xl font-semibold text-amber-400 text-center mb-10">
            {t(engineContent.sectionHeading1)}
          </h2>
          <div className="max-w-4xl mx-auto text-lg leading-relaxed text-neutral-200 space-y-6 text-justify">
            <p>
              <strong>{t(engineContent.mainHeading)}</strong> {t(engineContent.description1)}
            </p>
            <p>
              Its architecture relies heavily on advanced AI components developed by Paradox Foundry:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li><strong>Neurosymbolic AI:</strong> For dynamic character behavior, believable dialogue generation, and complex plot management.</li>
              <li><strong>AI² (Anticipatory & Adaptive AI):</strong> Enabling narratives to adapt in real-time to player choices and emergent situations, creating truly personalized and unpredictable story paths.</li>
              <li><strong>Flow-State Algorithm:</strong> Designing game mechanics, pacing, and challenge levels to foster player immersion and a state of optimal experience.</li>
            </ul>
            {/* Placeholder for an interactive AI architecture diagram */}
            <div className="w-full h-64 bg-neutral-800 border border-purple-700 flex items-center justify-center text-neutral-500 italic mt-6">
              [Placeholder: Interactive AI Integration Diagram for Engine]
            </div>
          </div>
        </section>

        {/* I Ching & Mythopoeic Principles */}
        <section className="mb-20 animate-fade-in-up delay-100">
          <h2 className="text-4xl font-semibold text-amber-400 text-center mb-10">
            I Ching & Mythopoeic Principles
          </h2>
          <div className="max-w-4xl mx-auto text-lg leading-relaxed text-neutral-200 space-y-6 text-justify">
            <p>
              A unique aspect of The Paradox Engine is its direct embedding of I Ching principles and mythopoeic concepts into its narrative generation and gameplay mechanics. The 64 hexagrams of the I Ching, each representing an archetypal situation, serve as a foundational structure for generating plotlines, character dilemmas, and thematic explorations.
            </p>
            <p>
              Player choices can correspond to "changing lines" within a hexagram, leading the narrative down different paths of development and transformation, reflecting the I Ching's wisdom on navigating change. The engine facilitates the creation of "artifacts"—interactive narratives—that are rich in symbolic meaning and aim to evoke deeper imaginative and affective responses in players.
            </p>
            {/* Placeholder for I Ching-inspired visual */}
            <div className="flex justify-center my-8">
              <div className="w-2/3 h-56 bg-neutral-800 border border-purple-700 flex items-center justify-center text-neutral-500 italic">
                [Placeholder: Stylised I Ching Hexagram Generation Visual]
              </div>
            </div>
          </div>
        </section>

        {/* Narrative Metrics & Player Agency */}
        <section className="mb-20 animate-fade-in-up delay-200">
          <h2 className="text-4xl font-semibold text-amber-400 text-center mb-10">
            Your Agency: Shaping the Unfolding Story
          </h2>
          <div className="max-w-4xl mx-auto text-lg leading-relaxed text-neutral-200 space-y-6 text-justify">
            <p>
              The success of experiences created with The Paradox Engine is measured not just by traditional game metrics but by their ability to deliver meaningful narrative engagement and profound player agency. We develop methods to quantify the degree to which players feel their choices have meaningful consequences on the story, tracking branching narratives and the impact of decisions on game state and character relationships.
            </p>
            <p>
              Ethical dilemmas derived from Principia Paradoxica's framework and Paradox Foundry's ethical AI research are integrated into the narrative. Player choices in these scenarios can even contribute to their W∞W Credentials, reflecting their engagement with the ecosystem's ethical dimensions.
            </p>
          </div>
        </section>

        {/* Project Showcase */}
        <section className="mb-16 animate-fade-in-up delay-300">
          <h2 className="text-4xl font-semibold text-amber-400 text-center mb-10">
            Projects Forged by The Paradox Engine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="bg-neutral-900 border border-purple-800 p-8 rounded-lg shadow-xl text-center">
              <h3 className="text-2xl font-semibold text-amber-300 mb-4">Legend of Mariem & Alahudin</h3>
              <p className="text-lg leading-relaxed text-neutral-200 mb-4">
                An upcoming narrative-driven game leveraging the engine's adaptive storytelling to explore a rich, culturally-inspired mythos.
              </p>
              <div className="w-full h-48 bg-neutral-800 flex items-center justify-center text-neutral-500 italic">
                [Placeholder: Concept Art/Screenshot for Mariem & Alahudin]
              </div>
            </div>
            <div className="bg-neutral-900 border border-purple-800 p-8 rounded-lg shadow-xl text-center">
              <h3 className="text-2xl font-semibold text-amber-300 mb-4">Amazigh Game</h3>
              <p className="text-lg leading-relaxed text-neutral-200 mb-4">
                Another exciting narrative experience rooted in the expansive mythos, showcasing the engine's capacity for diverse interactive storytelling.
              </p>
              <div className="w-full h-48 bg-neutral-800 flex items-center justify-center text-neutral-500 italic">
                [Placeholder: Concept Art/Screenshot for Amazigh Game]
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Engine;