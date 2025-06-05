import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Define a type for multilingual content
type LocalizedContent = {
  en: string;
  fr: string;
  es: string;
  ar: string;
};

// Define a type for link content
type LinkContent = {
  text: LocalizedContent;
  href: string;
  isExternal?: boolean;
};

// Define a type for section content
type SectionContent = {
  title: LocalizedContent;
  description: LocalizedContent;
  cta?: LinkContent;
  items?: { title: LocalizedContent; description: LocalizedContent, link?: LinkContent }[];
};

// --- Multilingual Content Store ---
// This object holds all translatable strings for the Engage page.
// In a larger application, this might come from a dedicated i18n library or CMS.
const engagePageContent = {
  metaTitle: {
    en: "Engage | Paradox Foundry",
    fr: "Engager | Paradox Foundry",
    es: "Participar | Paradox Foundry",
    ar: "شارك | Paradox Foundry", // Ensure this is accurate
  },
  heroHeadline: {
    en: "Join the Confluence",
    fr: "Rejoignez la Confluence",
    es: "Únete a la Confluencia",
    ar: "انضم إلى الملتقى",
  },
  heroIntro: {
    en: "The Paradox Foundry is a nexus of creation, research, and paradoxical exploration. Here, we invite you to connect, collaborate, and contribute to shaping realities from the unbelievable.",
    fr: "Paradox Foundry est un carrefour de création, de recherche et d'exploration paradoxale. Ici, nous vous invitons à vous connecter, collaborer et contribuer à façonner des réalités à partir de l'incroyable.",
    es: "Paradox Foundry es un nexo de creación, investigación y exploración paradójica. Aquí, te invitamos a conectar, colaborar y contribuir a dar forma a realidades a partir de lo increíble.",
    ar: "مسبك المفارقات هو محور الخلق والبحث والاستكشاف المتناقض. هنا، ندعوك للتواصل والتعاون والمساهمة في تشكيل الحقائق من غير المعقول.",
  },
  collaboration: {
    title: {
      en: "Collaborate with the Nexus",
      fr: "Collaborer avec le Nexus",
      es: "Colabora con el Nexus",
      ar: "تعاون مع المحور",
    },
    description: {
      en: "We seek partnerships with academic institutions, industry innovators, and independent creative minds. If your work resonates with paradoxical inquiry, advanced AI, or narrative engineering, let's explore the impossible together.",
      fr: "Nous recherchons des partenariats avec des institutions académiques, des innovateurs de l'industrie et des esprits créatifs indépendants. Si votre travail résonne avec l'enquête paradoxale, l'IA avancée ou l'ingénierie narrative, explorons ensemble l'impossible.",
      es: "Buscamos asociaciones con instituciones académicas, innovadores de la industria y mentes creativas independientes. Si tu trabajo resuena con la investigación paradójica, la IA avanzada o la ingeniería narrativa, exploremos juntos lo imposible.",
      ar: "نسعى لإقامة شراكات مع المؤسسات الأكاديمية ومبتكري الصناعة والعقول المبدعة المستقلة. إذا كان عملك يتردد صداه مع البحث المتناقض أو الذكاء الاصطناعي المتقدم أو هندسة السرد، فلنستكشف المستحيل معًا.",
    },
    cta: {
      text: {
        en: "Propose a Collaboration",
        fr: "Proposer une Collaboration",
        es: "Proponer una Colaboración",
        ar: "اقترح تعاونًا",
      },
      href: "mailto:collaborate@paradoxfoundry.com", // Placeholder email
    },
  },
  careers: {
    title: {
      en: "Join a Visionary Collective",
      fr: "Rejoignez un Collectif Visionnaire",
      es: "Únete a un Colectivo Visionario",
      ar: "انضم إلى مجموعة ذات رؤية",
    },
    description: {
      en: "Become part of a team dedicated to exploring the frontiers of consciousness, AI, and interactive storytelling. We offer opportunities for those who thrive on intellectual challenge and creative audacity.",
      fr: "Rejoignez une équipe dédiée à l'exploration des frontières de la conscience, de l'IA et de la narration interactive. Nous offrons des opportunités à ceux qui carburent au défi intellectuel et à l'audace créative.",
      es: "Forma parte de un equipo dedicado a explorar las fronteras de la conciencia, la IA y la narración interactiva. Ofrecemos oportunidades para aquellos que prosperan con el desafío intelectual y la audacia creativa.",
      ar: "كن جزءًا من فريق مكرس لاستكشاف حدود الوعي والذكاء الاصطناعي ورواية القصص التفاعلية. نحن نقدم فرصًا لأولئك الذين يزدهرون على التحدي الفكري والجرأة الإبداعية.",
    },
    cta: {
      text: {
        en: "Explore Opportunities",
        fr: "Explorer les Opportunités",
        es: "Explorar Oportunidades",
        ar: "اكتشف الفرص",
      },
      href: "/careers", // Placeholder link to a future careers page or section
    },
  },
  openContribution: {
    title: {
      en: "Contribute to the Paradoxicon",
      fr: "Contribuer au Paradoxicon",
      es: "Contribuye al Paradoxicon",
      ar: "ساهم في قاموس المفارقات",
    },
    description: {
      en: "The Paradoxicon is an ever-evolving repository of paradoxical thought and creation. We welcome submissions, proposals, and expressions of interest from those wishing to contribute their unique perspectives. Share your work, join the discourse.",
      fr: "Le Paradoxicon est un référentiel en constante évolution de pensée et de création paradoxales. Nous accueillons les soumissions, propositions et manifestations d'intérêt de ceux qui souhaitent apporter leurs perspectives uniques. Partagez votre travail, rejoignez le discours.",
      es: "El Paradoxicon es un repositorio en constante evolución de pensamiento y creación paradójicos. Damos la bienvenida a envíos, propuestas y expresiones de interés de aquellos que deseen aportar sus perspectivas únicas. Comparte tu trabajo, únete al discurso.",
      ar: "قاموس المفارقات هو مستودع دائم التطور للفكر والإبداع المتناقض. نرحب بالتقديمات والمقترحات وعبارات الاهتمام من أولئك الذين يرغبون في المساهمة بوجهات نظرهم الفريدة. شارك عملك، انضم إلى الحوار.",
    },
    cta: {
      text: {
        en: "Submit Your Proposal",
        fr: "Soumettre Votre Proposition",
        es: "Enviar su Propuesta",
        ar: "قدم مقترحك",
      },
      href: "mailto:contribute@paradoxfoundry.com", // Placeholder, ideally a Typeform or Google Form link
    },
  },
  contact: {
    title: {
      en: "Connect with the Foundry",
      fr: "Connecter avec la Fonderie",
      es: "Conecta con la Fundición",
      ar: "تواصل مع المسبك",
    },
    description: {
      en: "For general inquiries, or to simply open a channel to the unexpected, reach out. The doors of perception are always ajar.",
      fr: "Pour les demandes générales, ou simplement pour ouvrir un canal vers l'inattendu, contactez-nous. Les portes de la perception sont toujours entrouvertes.",
      es: "Para consultas generales, o simplemente para abrir un canal a lo inesperado, contáctanos. Las puertas de la percepción están siempre entreabiertas.",
      ar: "للاستفسارات العامة، أو لمجرد فتح قناة إلى ما هو غير متوقع، تواصل معنا. أبواب الإدراك دائما مواربة.",
    },
    email: {
        text: { en: "inquiries@paradoxfoundry.com", fr: "demandes@paradoxfoundry.com", es: "consultas@paradoxfoundry.com", ar: "inquiries@paradoxfoundry.com" }, // Using generic for AR for now
        href: "mailto:inquiries@paradoxfoundry.com"
    },
    github: {
      text: {
        en: "Explore our Simulacrum Engine Monorepo",
        fr: "Explorez notre Monorepo Simulacrum Engine",
        es: "Explora nuestro Monorepo Simulacrum Engine",
        ar: "استكشف مستودعنا الأحادي لمحرك المحاكاة",
      },
      href: "https://github.com/your-org/simulacrum-engine", // Replace with actual link [cite: 40]
      isExternal: true,
    },
  },
  whitepapers: {
    title: {
      en: "Foundational Texts",
      fr: "Textes Fondateurs",
      es: "Textos Fundacionales",
      ar: "النصوص التأسيسية",
    },
    description: {
      en: "Delve deeper into the strategic vision and theoretical underpinnings of the Paradox Foundry and the Principia Paradoxica ecosystem.",
      fr: "Plongez plus profondément dans la vision stratégique et les fondements théoriques de Paradox Foundry et de l'écosystème Principia Paradoxica.",
      es: "Profundiza en la visión estratégica y los fundamentos teóricos de Paradox Foundry y el ecosistema Principia Paradoxica.",
      ar: "تعمق في الرؤية الاستراتيجية والأسس النظرية لمسبك المفارقات ونظام برينسيبيا بارادوكسيكا البيئي.",
    },
    items: [
      {
        text: {
          en: "Paradox Foundry Strategic Plan",
          fr: "Plan Stratégique de Paradox Foundry",
          es: "Plan Estratégico de Paradox Foundry",
          ar: "الخطة الاستراتيجية لمسبك المفارقات",
        },
        // This will link to the "Comprehensive Strategic Plan for Paradox Foundry within the Simulacrum Paradoxicum Ecosystem.docx" [cite: 64]
        // Assume it's converted to PDF and placed in /public/documents or a similar accessible path.
        href: "/documents/ParadoxFoundry_Strategic_Plan.pdf",
        isExternal: true, // Open in new tab for docs
      },
      // Add more documents as needed
      // {
      //   text: { en: "Another Key Document", fr: "Autre Document Clé", es: "Otro Documento Clave", ar: "وثيقة رئيسية أخرى" },
      //   href: "/documents/another_key_document.pdf",
      //   isExternal: true,
      // },
    ],
  },
  vibeTag: {
    en: "You are Engaging: The Principle of Confluence",
    fr: "Vous Engagez : Le Principe de Confluence",
    es: "Estás Participando: El Principio de Confluencia",
    ar: "أنت تشارك: مبدأ الالتقاء",
  },
  // Add more translations as needed
};

// --- React Component ---

interface EngagePageProps {
  // Assuming lang is passed as a prop or from a global context
  // For simplicity, using a local state for this example page
  // In a real app, this would likely come from a LanguageContext or similar
}

const EngagePage: React.FC<EngagePageProps> = () => {
  const [isMounted, setIsMounted] = useState(false);
  // Language state - default to English.
  const [currentLang, setCurrentLang] = useState<'en' | 'fr' | 'es' | 'ar'>('en');
  
  useEffect(() => {
    setIsMounted(true);
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // Helper function to get translated content
  function t(content: LocalizedContent): string {
    return content[currentLang] || content['en'];
  }

  // Helper function to get translated link content
  function tLink(link: LinkContent | undefined): { text: string; href: string; isExternal?: boolean } {
    if (!link) return { text: '', href: '#' };
    return {
      text: t(link.text),
      href: link.href,
      isExternal: link.isExternal
    };
  }

  // Simple Language Selector Component
  const LanguageSelector = () => (
    <div className="fixed top-4 right-4 z-50 bg-neutral-900/80 backdrop-blur-sm rounded-full p-2 flex space-x-2 border border-amber-400/20">
      {(['en', 'fr', 'es', 'ar'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => setCurrentLang(lang)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
            currentLang === lang
              ? 'bg-amber-400 text-neutral-900 font-bold'
              : 'text-gray-300 hover:text-white hover:bg-amber-400/20'
          }`}
          aria-label={`Switch to ${lang.toUpperCase()}`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );

  // Styling for the page when it's not yet mounted
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="animate-pulse text-amber-400">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{t(engagePageContent.metaTitle)}</title>
        <meta name="description" content={t(engagePageContent.heroIntro)} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-amber-400">
            {t(engagePageContent.heroHeadline)}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {t(engagePageContent.heroIntro)}
          </p>
        </header>

        {/* Sections Container */}
        {/* Main Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          
          {/* Collaboration Section */}
          <div className="bg-neutral-900/80 backdrop-blur-sm rounded-xl p-8 border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">
              {t(engagePageContent.collaboration.title)}
            </h2>
            <p className="mb-6 text-gray-200 leading-relaxed">
              {t(engagePageContent.collaboration.description)}
            </p>
            {engagePageContent.collaboration.cta && (
              <a 
                href={tLink(engagePageContent.collaboration.cta).href} 
                className="inline-flex items-center px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-900 font-medium rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-amber-400/20"
              >
                {tLink(engagePageContent.collaboration.cta).text}
              </a>
            )}
          </div>

          {/* Careers Section */}
          <div className="bg-neutral-900/80 backdrop-blur-sm rounded-xl p-8 border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">
              {t(engagePageContent.careers.title)}
            </h2>
            <p className="mb-6 text-gray-200 leading-relaxed">
              {t(engagePageContent.careers.description)}
            </p>
            {engagePageContent.careers.cta && (
              <a 
                href={tLink(engagePageContent.careers.cta).href} 
                className="inline-flex items-center px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-900 font-medium rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-amber-400/20"
              >
                {tLink(engagePageContent.careers.cta).text}
              </a>
            )}
          </div>

          {/* Open Contribution Section */}
          <div className="bg-neutral-900/80 backdrop-blur-sm rounded-xl p-8 border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">
              {t(engagePageContent.openContribution.title)}
            </h2>
            <p className="mb-6 text-gray-200 leading-relaxed">
              {t(engagePageContent.openContribution.description)}
            </p>
            {engagePageContent.openContribution.cta && (
              <a 
                href={tLink(engagePageContent.openContribution.cta).href} 
                className="inline-flex items-center px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-900 font-medium rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-amber-400/20"
              >
                {tLink(engagePageContent.openContribution.cta).text}
              </a>
            )}
          </div>

          {/* Contact Section */}
          <div className="bg-neutral-900/80 backdrop-blur-sm rounded-xl p-8 border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">
              {t(engagePageContent.contact.title)}
            </h2>
            <p className="mb-6 text-gray-200 leading-relaxed">
              {t(engagePageContent.contact.description)}
            </p>
            <div className="space-y-4">
              <p>
                <a 
                  href={tLink(engagePageContent.contact.email).href} 
                  className="text-amber-400 hover:text-amber-300 inline-flex items-center transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {tLink(engagePageContent.contact.email).text}
                </a>
              </p>
              {engagePageContent.contact.github && (
                <a 
                  href={tLink(engagePageContent.contact.github).href}
                  className="inline-flex items-center px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-900 font-medium rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-amber-400/20"
                  target={engagePageContent.contact.github.isExternal ? "_blank" : undefined}
                  rel={engagePageContent.contact.github.isExternal ? "noopener noreferrer" : undefined}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  {tLink(engagePageContent.contact.github).text}
                </a>
              )}
            </div>
          </div>

          {/* Whitepapers/Docs Section */}
          <div className="bg-neutral-900/80 backdrop-blur-sm rounded-xl p-8 border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300 md:col-span-2">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">
              {t(engagePageContent.whitepapers.title)}
            </h2>
            <p className="mb-6 text-gray-200 leading-relaxed">
              {t(engagePageContent.whitepapers.description)}
            </p>
            <ul className="space-y-4">
              {engagePageContent.whitepapers.items.map((item, index) => (
                <li key={index}>
                  <a
                    href={tLink(item).href}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    className="text-amber-400 hover:text-amber-300 inline-flex items-center transition-colors group"
                  >
                    <svg className="w-5 h-5 mr-2 text-amber-400 group-hover:text-amber-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="group-hover:underline">{tLink(item).text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Vibe Tag */}
        <footer className="text-center py-16 mt-12 md:mt-20 border-t border-amber-400/10">
          <p className="text-sm text-amber-400/60 italic">
            {t(engagePageContent.vibeTag)}
          </p>
        </footer>
      </main>
    </>
  );
};

export default EngagePage;