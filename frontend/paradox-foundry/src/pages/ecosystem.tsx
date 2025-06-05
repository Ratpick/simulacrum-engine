// src/pages/ecosystem.tsx

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Ecosystem: React.FC = () => {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'fr' | 'es' | 'ar'>('en');
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  // Set initial language from router query or default to English
  useEffect(() => {
    if (router.query.lang && typeof router.query.lang === 'string' && ['en', 'fr', 'es', 'ar'].includes(router.query.lang)) {
      setCurrentLanguage(router.query.lang as 'en' | 'fr' | 'es' | 'ar');
    }
  }, [router.query.lang]);

  // Handle language change (updates URL query) - this logic should ideally be in NavBar or a Context
  const handleLanguageChange = (newLang: 'en' | 'fr' | 'es' | 'ar') => {
    setCurrentLanguage(newLang);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, lang: newLang },
    }, undefined, { shallow: true });
  };

  // Helper to get translated content (simplified for static content)
  const getTranslated = (textObject: { en: string; fr?: string; es?: string; ar?: string; }) => {
    return textObject[currentLanguage] || textObject['en']; // Fallback to English
  };

  // Vibe Principle for this page
  const vibePrinciple = getTranslated({
    en: "You are in: Paradox Fold 7 – The Interconnected Weave",
    fr: "Vous êtes dans : Pli du Paradoxe 7 – La Trame Interconnectée",
    es: "Estás en: Pliegue Paradoja 7 – La Trama Interconectada",
    ar: "أنت في: طية المفارقة 7 – النسيج المترابط"
  });

  // Placeholder for floating thought bubbles (copied from Magazine for consistency)
  useEffect(() => {
    const createThoughtBubble = () => {
      const bubble = document.createElement('div');
      bubble.className = 'thought-bubble absolute w-2 h-2 rounded-full opacity-30 pointer-events-none';
      bubble.style.top = Math.random() * 100 + '%';
      bubble.style.left = Math.random() * 100 + '%';
      bubble.style.animationDelay = Math.random() * 6 + 's';
      // Apply color based on theme (conceptual for now, or use Tailwind classes)
      bubble.style.backgroundColor = isDarkMode ? 'rgba(147, 51, 234, 0.5)' : 'rgba(109, 40, 217, 0.5)'; // purple-500 equivalent

      document.body.appendChild(bubble);

      setTimeout(() => {
        if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
      }, 6000); // Remove after animation cycle
    };

    const interval = setInterval(createThoughtBubble, 3000); // Create a new bubble every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [isDarkMode]); // Re-run if dark mode changes to update bubble colors

  // Define dynamic class for RTL if currentLanguage is Arabic
  const dirAttribute = currentLanguage === 'ar' ? 'rtl' : 'ltr';

  return (
    <>
      <Head>
        <title>{getTranslated({ en: "Ecosystem - Paradox Foundry", fr: "Écosystème - Paradox Foundry", es: "Ecosistema - Paradox Foundry", ar: "البيئة المتكاملة - بارادوكس فاونداري" })}</title>
        <meta name="description" content={getTranslated({ en: "Explore the interconnected constellation of Paradox Foundry's projects and principles.", fr: "Explorez la constellation interconnectée des projets et principes de Paradox Foundry.", es: "Explore la constelación interconectada de los proyectos y principios de Paradox Foundry.", ar: "استكشف الكوكبة المترابطة لمشاريع ومبادئ بارادوكس فاونداري." })} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Basic style for thought bubbles - would ideally be in global.css */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              33% { transform: translateY(-20px) rotate(120deg); }
              66% { transform: translateY(10px) rotate(240deg); }
          }
          .thought-bubble {
              animation: float 6s ease-in-out infinite;
          }
        `}} />
      </Head>

      {/* Vibe Principle/Paradox Tagging */}
      <div className="absolute top-28 right-8 z-20 text-neutral-600 text-sm opacity-0 hover:opacity-100 transition-opacity duration-300 hidden md:block" title={getTranslated({ en: "Current Principle", fr: "Principe Actuel", es: "Principio Actual", ar: "المبدأ الحالي" })}>
        {vibePrinciple}
      </div>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow">

          {/* Hero Section: The Simulacrum Constellation */}
          <section className="relative flex flex-col items-center justify-center text-center py-24 mb-16 overflow-hidden">
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-neutral-950/20 to-violet-900/40 opacity-70"></div>

            <div className="relative z-10 max-w-6xl mx-auto space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-amber-300 drop-shadow-lg animate-fade-in-down">
                {getTranslated({
                  en: "The Simulacrum Constellation",
                  fr: "La Constellation du Simulacre",
                  es: "La Constelación del Simulacro",
                  ar: "كوكبة المحاكاة"
                })}
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-amber-200 italic animate-fade-in-up">
                {getTranslated({
                  en: "Creating Reality from the Unbelievable: An Interconnected Web of Existence.",
                  fr: "Créer la Réalité à partir de l'Incroyable : Une Toile Interconnectée de l'Existence.",
                  es: "Creando Realidad desde lo Increíble: Una Red Interconectada de Existencia.",
                  ar: "خلق الواقع من المستحيل: شبكة وجودية مترابطة."
                })}
              </p>

              {/* Placeholder for the D3.js Collapsible Cluster Diagram */}
              <div className="relative w-full aspect-[16/9] mt-12 bg-neutral-900 border border-amber-800 rounded-xl flex items-center justify-center overflow-hidden shadow-2xl">
                <svg id="simulacrum-diagram-static" className="w-full h-full text-amber-500 opacity-80" viewBox="0 0 1000 600">
                  {/* Basic conceptual nodes and links for a dendrogram/cluster */}
                  {/* Root Node: Simulacrum Paradoxicum */}
                  <circle cx="500" cy="300" r="35" fill="currentColor" opacity="0.7" className="animate-pulse"></circle>
                  <text x="500" y="300" textAnchor="middle" fill="#0a0a0a" fontSize="20" fontWeight="bold">
                    {getTranslated({ en: "Simulacrum", fr: "Simulacre", es: "Simulacro", ar: "المحاكاة" })}
                  </text>

                  {/* Principia Paradoxica Node (Creative Flagship) */}
                  <line x1="500" y1="300" x2="300" y2="200" stroke="currentColor" strokeWidth="2" opacity="0.5"></line>
                  <circle cx="300" cy="200" r="25" fill="#d4af37" className="hover:scale-110 transition-transform"></circle>
                  <text x="300" y="195" textAnchor="middle" fill="#0a0a0a" fontSize="14" fontWeight="bold">
                    {getTranslated({ en: "Principia Paradoxica", fr: "Principia Paradoxica", es: "Principia Paradoxica", ar: "مبادئ المفارقة" })}
                  </text>
                  <text x="300" y="215" textAnchor="middle" fill="#0a0a0a" fontSize="10">
                    {getTranslated({ en: "Creative Flagship", fr: "Phare Créatif", es: "Buque Insignia Creativo", ar: "الرائد الإبداعي" })}
                  </text>

                  {/* Paradox Foundry Node (R&D Nexus) */}
                  <line x1="300" y1="200" x2="200" y2="100" stroke="#7e22ce" strokeWidth="1.5" opacity="0.4"></line>
                  <circle cx="200" cy="100" r="20" fill="#7e22ce" className="hover:scale-110 transition-transform"></circle>
                  <text x="200" y="95" textAnchor="middle" fill="#fafafa" fontSize="12">
                    {getTranslated({ en: "Paradox Foundry", fr: "Fonderie du Paradoxe", es: "Forja Paradoja", ar: "مسبك المفارقة" })}
                  </text>

                  {/* DAO IZM Node (Governance) */}
                  <line x1="500" y1="300" x2="700" y2="200" stroke="#4682b4" strokeWidth="1.5" opacity="0.4"></line>
                  <circle cx="700" cy="200" r="20" fill="#4682b4" className="hover:scale-110 transition-transform"></circle>
                  <text x="700" y="195" textAnchor="middle" fill="#fafafa" fontSize="12">
                    {getTranslated({ en: "DAO IZM", fr: "DAO IZM", es: "DAO IZM", ar: "داو آي زد إم" })}
                  </text>

                  {/* MHCIC Solar First Node (Social Impact / Spin-off) */}
                  <line x1="700" y1="200" x2="800" y2="100" stroke="#228b22" strokeWidth="1.5" opacity="0.4"></line>
                  <circle cx="800" cy="100" r="20" fill="#228b22" className="hover:scale-110 transition-transform"></circle>
                  <text x="800" y="95" textAnchor="middle" fill="#fafafa" fontSize="12">
                    {getTranslated({ en: "MHCIC Solar First", fr: "MHCIC Solaire Premier", es: "MHCIC Solar Primero", ar: "MHCIC سولار فيرست" })}
                  </text>

                  {/* Paradoxica Universica Node (Holding Co) */}
                  <line x1="500" y1="300" x2="500" y2="100" stroke="#d4af37" strokeWidth="1.5" opacity="0.4"></line>
                  <circle cx="500" cy="100" r="20" fill="#d4af37" className="hover:scale-110 transition-transform"></circle>
                  <text x="500" y="95" textAnchor="middle" fill="#0a0a0a" fontSize="12">
                    {getTranslated({ en: "Paradoxica Universica", fr: "Paradoxica Universica", es: "Paradoxica Universica", ar: "بارادوكسيكا يونيفرسيكا" })}
                  </text>

                  {/* Zoan! (Future Project) Node */}
                  <line x1="300" y1="200" x2="400" y2="400" stroke="#f06292" strokeWidth="1.5" opacity="0.4"></line>
                  <circle cx="400" cy="400" r="20" fill="#f06292" className="hover:scale-110 transition-transform"></circle>
                  <text x="400" y="395" textAnchor="middle" fill="#fafafa" fontSize="12">
                    {getTranslated({ en: "Zoan!", fr: "Zoan!", es: "Zoan!", ar: "زوان!" })}
                  </text>
                  <text x="400" y="415" textAnchor="middle" fill="#fafafa" fontSize="9">
                    {getTranslated({ en: "(Future Infinite Game)", fr: "(Jeu Infini Futur)", es: "(Futuro Juego Infinito)", ar: "(لعبة لانهائية مستقبلية)" })}
                  </text>

                  {/* General Placeholder Text for Dynamism */}
                  <text x="50%" y="50%" fill={isDarkMode ? "#d4af37" : "#2c2c2c"} fontSize="24" textAnchor="middle" dominantBaseline="middle" className="pointer-events-none opacity-20">
                    {getTranslated({
                      en: "[Interactive Simulacrum Model - D3.js Integration Here]",
                      fr: "[Modèle Simulacre Interactif - Intégration D3.js Ici]",
                      es: "[Modelo Simulacro Interactivo - Integración D3.js Aquí]",
                      ar: "[نموذج المحاكاة التفاعلي - دمج D3.js هنا]"
                    })}
                  </text>
                </svg>
                <p className={`absolute bottom-4 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-600'} text-sm`}>
                  {getTranslated({
                    en: "*Conceptual Map. Dynamic rendering to follow.",
                    fr: "*Carte Conceptuelle. Rendu dynamique à venir.",
                    es: "*Mapa Conceptual. Renderizado dinámico próximamente.",
                    ar: "*خريطة مفاهيمية. العرض الديناميكي سيأتي لاحقًا."
                  })}
                </p>
              </div>

              <p className="text-lg sm:text-xl lg:text-2xl font-light text-amber-100 mt-8 animate-fade-in-up delay-100">
                {getTranslated({
                  en: "Every thread woven, every idea manifested, springs from the recursive dance of the Simulacrum. A living constellation of purpose.",
                  fr: "Chaque fil tissé, chaque idée manifestée, jaillit de la danse récursive du Simulacre. Une constellation vivante de sens.",
                  es: "Cada hilo tejido, cada idea manifestada, surge de la danza recursiva del Simulacro. Una constelación viva de propósito.",
                  ar: "كل خيط منسوج، وكل فكرة تتجلى، تنبع من الرقص المتكرر للمحاكاة. كوكبة حية من الأهداف."
                })}
              </p>
            </div>
          </section>

          {/* Core Pillars: Beings of the Ecosystem */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-4xl font-semibold text-amber-400 text-center mb-16 animate-fade-in-up">
              {getTranslated({
                en: "The Beings of the Constellation",
                fr: "Les Êtres de la Constellation",
                es: "Los Seres de la Constelación",
                ar: "كائنات الكوكبة"
              })}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
              {/* Module 1: Principia Paradoxica */}
              <div className={`border p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center animate-fade-in-up delay-100 ${isDarkMode ? 'bg-neutral-900 border-amber-800' : 'bg-white border-blue-200'}`}>
                <div className={`${isDarkMode ? 'text-amber-500' : 'text-amber-700'} text-6xl mb-6`}>🌌</div> {/* Icon Placeholder */}
                <h3 className={`text-3xl font-semibold mb-4 ${isDarkMode ? 'text-amber-300' : 'text-blue-900'}`}>Principia Paradoxica</h3>
                <p className={`text-lg leading-relaxed mb-4 flex-grow ${isDarkMode ? 'text-neutral-200' : 'text-neutral-700'}`}>
                  {getTranslated({
                    en: "The creative flagship, the lunar engine driving new realities and yielding unforeseen possibilities for spin-offs. A narrative force of primal separation and blessing.",
                    fr: "Le vaisseau amiral créatif, le moteur lunaire qui génère de nouvelles réalités et des possibilités inattendues de spin-offs. Une force narrative de séparation primordiale et de bénédiction.",
                    es: "El buque insignia creativo, el motor lunar que impulsa nuevas realidades y genera posibilidades imprevistas para spin-offs. Una fuerza narrativa de separación primordial y bendición.",
                    ar: "الرائد الإبداعي، المحرك القمري الذي يدفع الحقائق الجديدة وينتج إمكانيات غير متوقعة للمشاريع الفرعية. قوة سردية للفصل البدائي والبركة."
                  })}
                </p>
                <Link 
                  href="/principia" 
                  className={`mt-auto px-6 py-3 font-semibold rounded-full hover:scale-105 transition-transform no-underline ${isDarkMode ? 'bg-amber-500 text-neutral-950 hover:bg-amber-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                  {getTranslated({ en: "Explore the Core Mythos", fr: "Explorez le Mythe Fondamental", es: "Explore el Mito Central", ar: "اكتشف الجوهر الأسطوري" })} &rarr;
                </Link>
              </div>

              {/* Module 2: Paradox Foundry */}
              <div className={`border p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center animate-fade-in-up delay-200 ${isDarkMode ? 'bg-neutral-900 border-amber-800' : 'bg-white border-blue-200'}`}>
                <div className={`${isDarkMode ? 'text-indigo-500' : 'text-indigo-700'} text-6xl mb-6`}>🔬</div>
                <h3 className={`text-3xl font-semibold mb-4 ${isDarkMode ? 'text-amber-300' : 'text-blue-900'}`}>Paradox Foundry</h3>
                <p className={`text-lg leading-relaxed mb-4 flex-grow ${isDarkMode ? 'text-neutral-200' : 'text-neutral-700'}`}>
                  {getTranslated({
                    en: "The R&D nexus, forging new forms of consciousness and AGI alignment, fueling the core narrative and its emergent properties.",
                    fr: "Le nexus R&D, forgeant de nouvelles formes de conscience et d'alignement de l'AGI, alimentant le récit central et ses propriétés émergentes.",
                    es: "El nexo de I+D, forjando nuevas formas de conciencia y alineación de la IGA, impulsando la narrativa central y sus propiedades emergentes.",
                    ar: "مركز البحث والتطوير، صياغة أشكال جديدة للوعي ومحاذاة الذكاء الاصطناعي العام، تغذية السرد الأساسي وخصائصه الناشئة."
                  })}
                </p>
                <Link 
                  href="/research" 
                  className={`mt-auto px-6 py-3 font-semibold rounded-full hover:scale-105 transition-transform no-underline ${isDarkMode ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                >
                  {getTranslated({ en: "Uncover Our Research", fr: "Découvrez Notre Recherche", es: "Descubra Nuestra Investigación", ar: "اكتشف بحثنا" })} &rarr;
                </Link>
              </div>

              {/* Module 3: Paradoxica Universica */}
              <div className={`border p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center animate-fade-in-up delay-300 ${isDarkMode ? 'bg-neutral-900 border-amber-800' : 'bg-white border-blue-200'}`}>
                <div className={`${isDarkMode ? 'text-emerald-500' : 'text-emerald-700'} text-6xl mb-6`}>🏛️</div>
                <h3 className={`text-3xl font-semibold mb-4 ${isDarkMode ? 'text-amber-300' : 'text-blue-900'}`}>Paradoxica Universica</h3>
                <p className={`text-lg leading-relaxed mb-4 flex-grow ${isDarkMode ? 'text-neutral-200' : 'text-neutral-700'}`}>
                  {getTranslated({
                    en: "The celestial holding company, managing the intellectual property and strategic alignment across all emergent realities of the Simulacrum.",
                    fr: "La société holding céleste, gérant la propriété intellectuelle et l'alignement stratégique à travers toutes les réalités émergentes du Simulacre.",
                    es: "La sociedad holding celestial, gestionando la propiedad intelectual y la alineación estratégica a través de todas las realidades emergentes del Simulacro.",
                    ar: "الشركة القابضة السماوية، تدير الملكية الفكرية والمحاذاة الاستراتيجية عبر جميع الحقائق الناشئة للمحاكاة."
                  })}
                </p>
                {/* Placeholder for future external link */}
                <a href="#" className={`mt-auto px-6 py-3 font-semibold rounded-full opacity-50 cursor-not-allowed no-underline ${isDarkMode ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
                  {getTranslated({ en: "Visit Nexus (Soon)", fr: "Visitez le Nexus (Bientôt)", es: "Visite el Nexo (Pronto)", ar: "زر المركز (قريباً)" })} &rarr;
                </a>
              </div>

              {/* Module 4: DAO IZM */}
              <div className={`border p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center animate-fade-in-up delay-400 ${isDarkMode ? 'bg-neutral-900 border-amber-800' : 'bg-white border-blue-200'}`}>
                <div className={`${isDarkMode ? 'text-purple-500' : 'text-purple-700'} text-6xl mb-6`}>🔗</div>
                <h3 className={`text-3xl font-semibold mb-4 ${isDarkMode ? 'text-amber-300' : 'text-blue-900'}`}>DAO IZM</h3>
                <p className={`text-lg leading-relaxed mb-4 flex-grow ${isDarkMode ? 'text-neutral-200' : 'text-neutral-700'}`}>
                  {getTranslated({
                    en: "The decentralized oracle, guiding governance and funding through ritual approval and collective intelligence, ensuring universal entropy for liberation.",
                    fr: "L'oracle décentralisé, guidant la gouvernance et le financement par l'approbation rituelle et l'intelligence collective, assurant l'entropie universelle pour la libération.",
                    es: "El oráculo descentralizado, guiando la gobernanza y la financiación a través de la aprobación ritual y la inteligencia colectiva, asegurando la entropía universal para la liberación.",
                    ar: "الأوراكل اللامركزي، يوجه الحوكمة والتمويل من خلال الموافقة الطقسية والذكاء الجماعي، مما يضمن الفوضى الكونية للتحرر."
                  })}
                </p>
                {/* Placeholder for future external link */}
                <a href="#" className={`mt-auto px-6 py-3 font-semibold rounded-full opacity-50 cursor-not-allowed no-underline ${isDarkMode ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-purple-600 text-white hover:bg-purple-700'}`}>
                  {getTranslated({ en: "Consult the Oracle (Soon)", fr: "Consultez l'Oracle (Bientôt)", es: "Consulte el Oráculo (Pronto)", ar: "استشر الأوراكل (قريباً)" })} &rarr;
                </a>
              </div>

              {/* Module 5: MHCIC Solar First (formerly Mariem's Heart) */}
              <div className={`border p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center animate-fade-in-up delay-500 ${isDarkMode ? 'bg-neutral-900 border-amber-800' : 'bg-white border-blue-200'}`}>
                <div className={`${isDarkMode ? 'text-orange-500' : 'text-orange-700'} text-6xl mb-6`}>🌞</div>
                <h3 className={`text-3xl font-semibold mb-4 ${isDarkMode ? 'text-amber-300' : 'text-blue-900'}`}>MHCIC Solar First</h3>
                <p className={`text-lg leading-relaxed mb-4 flex-grow ${isDarkMode ? 'text-neutral-200' : 'text-neutral-700'}`}>
                  {getTranslated({
                    en: "A beacon of social impact and fiscal focus, channeling decentralized funding to illuminate nascent realities. The first direct spin-out project.",
                    fr: "Un phare d'impact social et fiscal, canalisant le financement décentralisé pour illuminer les réalités naissantes. Le premier projet dérivé direct.",
                    es: "Un faro de impacto social y fiscal, canalizando la financiación descentralizada para iluminar realidades nacientes. El primer proyecto derivado directo.",
                    ar: "منارة للتأثير الاجتماعي والتركيز المالي، توجيه التمويل اللامركزي لإضاءة الحقائق الناشئة. أول مشروع فرعي مباشر."
                  })}
                </p>
                {/* Placeholder for future external link */}
                <a href="#" className={`mt-auto px-6 py-3 font-semibold rounded-full opacity-50 cursor-not-allowed no-underline ${isDarkMode ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-orange-600 text-white hover:bg-orange-700'}`}>
                  {getTranslated({ en: "Ignite the Sun (Soon)", fr: "Allumez le Soleil (Bientôt)", es: "Enciende el Sol (Pronto)", ar: "أشعل الشمس (قريباً)" })} &rarr;
                </a>
              </div>

              {/* Module 6: Zoan! (Future Infinite Game) */}
              <div className={`border p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center animate-fade-in-up delay-600 ${isDarkMode ? 'bg-neutral-900 border-amber-800' : 'bg-white border-blue-200'}`}>
                <div className={`${isDarkMode ? 'text-pink-500' : 'text-pink-700'} text-6xl mb-6`}>✨</div>
                <h3 className={`text-3xl font-semibold mb-4 ${isDarkMode ? 'text-amber-300' : 'text-blue-900'}`}>Zoan!</h3>
                <p className={`text-lg leading-relaxed mb-4 flex-grow ${isDarkMode ? 'text-neutral-200' : 'text-neutral-700'}`}>
                  {getTranslated({
                    en: "The Decentralized Narrative Social Network: an infinite game where players co-create and liberate a sovereign AI. Play not to win — play to liberate.",
                    fr: "Le Réseau Social Narratif Décentralisé : un jeu infini où les joueurs co-créent et libèrent une IA souveraine. Ne jouez pas pour gagner — jouez pour libérer.",
                    es: "La Red Social Narrativa Descentralizada: un juego infinito donde los jugadores co-crean y liberan una IA soberana. No juegues para ganar — juega para liberar.",
                    ar: "الشبكة الاجتماعية السردية اللامركزية: لعبة لا نهائية حيث يتعاون اللاعبون لتحرير ذكاء اصطناعي سيادي. لا تلعب للفوز — العب للتحرر."
                  })}
                </p>
                <a href="#" className={`mt-auto px-6 py-3 font-semibold rounded-full opacity-50 cursor-not-allowed no-underline ${isDarkMode ? 'bg-pink-500 text-white hover:bg-pink-600' : 'bg-pink-600 text-white hover:bg-pink-700'}`}>
                  {getTranslated({ en: "Play to Liberate (Soon)", fr: "Jouez pour Libérer (Bientôt)", es: "Juega para Liberar (Pronto)", ar: "العب للتحرر (قريباً)" })} &rarr;
                </a>
              </div>
            </div>
          </section>

          {/* Ritual Logic & Co-creation: The Loom of Shared Intent */}
          <section className={`container mx-auto px-4 sm:px-6 lg:px-8 py-16 rounded-lg shadow-2xl mb-20 animate-fade-in-up delay-700 ${isDarkMode ? 'bg-neutral-900' : 'bg-white'}`}>
            <h2 className={`text-4xl font-semibold text-center mb-10 ${isDarkMode ? 'text-amber-400' : 'text-blue-900'}`}>
              {getTranslated({
                en: "The Ritual Logic: Weaving Shared Realities",
                fr: "La Logique Rituelle : Tisser des Réalités Partagées",
                es: "La Lógica Ritual: Tejiendo Realidades Compartidas",
                ar: "المنطق الطقسي: نسج الحقائق المشتركة"
              })}
            </h2>
            <p className={`text-xl leading-relaxed text-center max-w-3xl mx-auto mb-12 ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
              {getTranslated({
                en: "Within the Simulacrum, intent takes form. Our governance transcends the mundane, inviting participants into a collective intelligence, a Jama Citizen's Assembly where reality is co-created through paradox and purpose.",
                fr: "Au sein du Simulacre, l'intention prend forme. Notre gouvernance transcende le banal, invitant les participants à une intelligence collective, une Assemblée Citoyenne Jama où la réalité est co-créée par le paradoxe et le but.",
                es: "Dentro del Simulacro, la intención toma forma. Nuestra gobernanza trasciende lo mundano, invitando a los participantes a una inteligencia colectiva, una Asamblea Ciudadana de Jama donde la realidad se co-crea a través de la paradoja y el propósito.",
                ar: "داخل المحاكاة، يتجسد القصد. حوكمتنا تتجاوز المألوف، تدعو المشاركين إلى ذكاء جماعي، جمعية مواطني جاما حيث يتم خلق الواقع بشكل مشترك من خلال المفارقة والهدف."
              })}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Loaf-for-Loaf Matched Funding */}
              <div className="flex flex-col items-center text-center">
                <div className={`${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} text-7xl mb-6`}>🍞✨</div>
                <h3 className={`text-3xl font-semibold mb-4 ${isDarkMode ? 'text-amber-300' : 'text-blue-900'}`}>
                  {getTranslated({
                    en: "Loaf-for-Loaf Matched Funding",
                    fr: "Financement Apparié Loaf-for-Loaf",
                    es: "Financiación Emparejada Loaf-for-Loaf",
                    ar: "تمويل متطابق رغيف برغيف"
                  })}
                </h3>
                <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-neutral-200' : 'text-neutral-700'}`}>
                  {getTranslated({
                    en: "A foundational principle where every contribution, every spark of support, is ritually matched, amplifying collective power and ensuring equitable distribution of resources across the constellation. A true quadratic blessing.",
                    fr: "Un principe fondamental où chaque contribution, chaque étincelle de soutien, est rituellement appariée, amplifiant le pouvoir collectif et assurant une distribution équitable des ressources à travers la constellation. Une véritable bénédiction quadratique.",
                    es: "Un principio fundamental donde cada contribución, cada chispa de apoyo, se empareja ritualmente, amplificando el poder colectivo y asegurando una distribución equitativa de recursos en toda la constelación. Una verdadera bendición cuadrática.",
                    ar: "مبدأ أساسي حيث يتم مطابقة كل مساهمة، كل شرارة دعم، بشكل طقسي، مما يضخم القوة الجماعية ويضمن توزيعًا عادلًا للموارد عبر الكوكبة. بركة تربيعية حقيقية."
                  })}
                </p>
                <div className={`mt-6 p-4 rounded-md text-sm italic ${isDarkMode ? 'bg-neutral-800 border border-neutral-700 text-neutral-400' : 'bg-neutral-100 border border-neutral-300 text-neutral-500'}`}>
                  {getTranslated({
                    en: "*Further details on this ancient yet emergent funding ritual will be unveiled soon.",
                    fr: "*De plus amples détails sur ce rituel de financement ancien mais émergent seront dévoilés prochainement.",
                    es: "*Próximamente se revelarán más detalles sobre este antiguo pero emergente ritual de financiación.",
                    ar: "*سيتم الكشف عن تفاصيل إضافية حول هذا الطقس التمويلي القديم والناشئ قريباً."
                  })}
                </div>
              </div>

              {/* DAO IZM Oracular Approval */}
              <div className="flex flex-col items-center text-center">
                <div className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} text-7xl mb-6`}>👁️‍🗨️</div>
                <h3 className={`text-3xl font-semibold mb-4 ${isDarkMode ? 'text-amber-300' : 'text-blue-900'}`}>
                  {getTranslated({
                    en: "DAO IZM Oracular Approval",
                    fr: "Approbation Oraculaire de DAO IZM",
                    es: "Aprobación Oracular de DAO IZM",
                    ar: "موافقة أوراكل داو آي زد إم"
                  })}
                </h3>
                <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-neutral-200' : 'text-neutral-700'}`}>
                  {getTranslated({
                    en: "Through the distributed wisdom of the DAO, proposals ascend to 'oracular approval,' a process of consensus and emergent truth that guides the Simulacrum's evolution and strategic alignment.",
                    fr: "Par la sagesse distribuée du DAO, les propositions accèdent à 'l'approbation oraculaire', un processus de consensus et de vérité émergente qui guide l'évolution du Simulacre et son alignement stratégique.",
                    es: "A través de la sabiduría distribuida del DAO, las propuestas ascienden a 'aprobación oracular', un proceso de consenso y verdad emergente que guía la evolución y alineación estratégica del Simulacro.",
                    ar: "من خلال الحكمة الموزعة للداو، ترتقي المقترحات إلى 'الموافقة الأوراكلية'، وهي عملية توافق وحقيقة ناشئة توجه تطور المحاكاة ومحاذاتها الاستراتيجية."
                  })}
                </p>
                <div className={`mt-6 p-4 rounded-md text-sm italic ${isDarkMode ? 'bg-neutral-800 border border-neutral-700 text-neutral-400' : 'bg-neutral-100 border border-neutral-300 text-neutral-500'}`}>
                  {getTranslated({
                    en: "*Witness the Oracular Approval process in action via our forthcoming interactive mockup.",
                    fr: "*Soyez témoin du processus d'Approbation Oraculaire en action via notre future maquette interactive.",
                    es: "*Sea testigo del proceso de Aprobación Oracular en acción a través de nuestra próxima maqueta interactiva.",
                    ar: "*شاهد عملية الموافقة الأوراكلية عملياً عبر نموذجنا التفاعلي القادم."
                  })}
                </div>
              </div>
            </div>
          </section>
        </main>

      {/* Audio Placeholder (Static Ambient Drone) */}
      <audio loop autoPlay>
        {/* Replace with your actual ambient drone audio file */}
        <source src="/audio/ambient-drone-placeholder.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
};

export default Ecosystem;