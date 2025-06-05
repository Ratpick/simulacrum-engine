// src/pages/research.tsx

import React from 'react';
import Head from 'next/head';

const Research: React.FC = () => {
  return (
    <>
      <Head>
        <title>Our Research - Paradox Foundry: The Crucible of Innovation</title>
        <meta name="description" content="Explore Paradox Foundry's pioneering research in AI², Neurosymbolic AI, Ethical AI Frameworks, and the Flow-State Algorithm, fueling Principia Paradoxica." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Hero-like Introduction for Research */}
        <section className="relative flex flex-col items-center justify-center text-center py-24 px-4 sm:px-6 lg:px-8 flex-grow overflow-hidden">
          {/* Placeholder for subtle background graphics related to data/networks */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/20 to-neutral-900/40 opacity-70"></div>
            {/* Background pattern suggesting neural networks or data flow */}
            <div className="absolute inset-0 bg-repeat bg-[size:80px_80px] opacity-5 animate-pulse" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg opacity=\'0.1\' fill=\'%23d4af37\'%3E%3Cpath d=\'M0 0h10v10H0V0zm20 20h10v10H20V20zm40 40h10v10H60V60zM0 40h10v10H0V40zm40 0h10v10H40V40zM80 0h-10v10h10V0zM80 40h-10v10h10V40zM20 60h10v10H20V60zM60 20h10v10H60V20z\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-amber-300 drop-shadow-lg animate-fade-in-down">
              Our Research
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-amber-200 italic animate-fade-in-up">
              The Crucible of Innovation that Fuels Principia Paradoxica.
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl font-light text-amber-100 animate-fade-in-up delay-100">
              Pioneering advanced AI and ethical frameworks for a new reality.
            </p>
          </div>
        </section>

      {/* Vibe Principle/Paradox Tagging */}
      <div className="absolute top-28 right-8 z-20 text-neutral-600 text-sm opacity-0 hover:opacity-100 transition-opacity duration-300 hidden md:block" title="Current Principle">
        You are in: Paradox Fold 2 – Emergence of Intelligence
      </div>

        {/* Content Sections for Research Areas */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-20 animate-fade-in-up">
            <h2 className="text-4xl font-semibold text-amber-400 text-center mb-10">
              Key Research Areas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* AI² (Anticipatory & Adaptive AI) */}
              <div className="bg-neutral-900 border border-amber-800 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                <h3 className="text-3xl font-semibold text-amber-300 mb-4">AI²: Anticipatory & Adaptive AI</h3>
                <p className="text-lg leading-relaxed text-neutral-200 mb-4">
                  This research focuses on developing AI systems that can not only react to current data but also anticipate future states and adapt proactively. Beyond mere prediction, we aim for systems that model complex emergent behaviors, assisting in navigating the uncertain futures intrinsic to the <em>Principia Paradoxica</em> narrative. It directly informs spinouts like <code>Solving AI Futurescape</code>.
                </p>
                {/* Placeholder for AI² data visualization (e.g., dynamic flow map) */}
                <div className="w-full h-48 bg-neutral-800 border border-amber-700 flex items-center justify-center text-neutral-500 italic mt-6">
                  [Placeholder: Dynamic Flow Map/Predictive Analytics Visualisation]
                </div>
              </div>

              {/* Neurosymbolic AI */}
              <div className="bg-neutral-900 border border-amber-800 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                <h3 className="text-3xl font-semibold text-amber-300 mb-4">Neurosymbolic AI</h3>
                <p className="text-lg leading-relaxed text-neutral-200 mb-4">
                  Bridging the gap between neural network and symbolic AI approaches, this area combines the pattern recognition strengths of deep learning with the explicit reasoning and interpretability of symbolic systems. This enables more nuanced dialogue and believable reasoning for characters within `The Paradox Engine`, crucial for evolving the narrative.
                </p>
                {/* Placeholder for Neurosymbolic AI data visualization (e.g., hybrid node-link diagram) */}
                <div className="w-full h-48 bg-neutral-800 border border-amber-700 flex items-center justify-center text-neutral-500 italic mt-6">
                  [Placeholder: Neurosymbolic Hybrid Architecture Diagram]
                </div>
              </div>

              {/* Ethical AI Frameworks & W∞W Credentials */}
              <div className="bg-neutral-900 border border-amber-800 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                <h3 className="text-3xl font-semibold text-amber-300 mb-4">Ethical AI Frameworks & W∞W Credentials</h3>
                <p className="text-lg leading-relaxed text-neutral-200 mb-4">
                  This stream translates the philosophical principles of <em>Principia Paradoxica</em> into operational ethical guidelines and a unique system for recognizing and verifying ethical conduct: <strong>W∞W Credentials</strong> (Soul-Bound Tokens). These non-transferable tokens represent achievements, skills, and ethical certifications, enhancing trust and accountability within the ecosystem.
                </p>
                {/* Placeholder for W∞W Credentials data visualization (e.g., network graph) */}
                <div className="w-full h-48 bg-neutral-800 border border-amber-700 flex items-center justify-center text-neutral-500 italic mt-6">
                  [Placeholder: W∞W Credentials Network Visualisation]
                </div>
              </div>

              {/* Flow-State Algorithm */}
              <div className="bg-neutral-900 border border-amber-800 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                <h3 className="text-3xl font-semibold text-amber-300 mb-4">Flow-State Algorithm</h3>
                <p className="text-lg leading-relaxed text-neutral-200 mb-4">
                  We computationally model the psychological state of "flow"—deep immersion and optimal experience—to enhance creativity, learning, and problem-solving. This research is key to designing `The Paradox Engine` mechanics for deeper immersion and engagement, and for boosting productivity within Paradox Foundry's own R&D processes.
                </p>
                {/* Placeholder for Flow-State Algorithm data visualization (e.g., biofeedback representation) */}
                <div className="w-full h-48 bg-neutral-800 border border-amber-700 flex items-center justify-center text-neutral-500 italic mt-6">
                  [Placeholder: Flow State Induction Visualisation]
                </div>
              </div>
            </div>
          </section>

          {/* Publications & Outputs */}
          <section className="mb-16 animate-fade-in-up delay-200">
            <h2 className="text-4xl font-semibold text-amber-400 text-center mb-10">
              Publications & Outputs
            </h2>
            <div className="max-w-3xl mx-auto text-lg leading-relaxed text-neutral-200 space-y-4">
              <p>
                Our commitment to advancing knowledge is reflected in our ongoing publications and open-source contributions. Explore our latest research papers, technical reports, and whitepapers that detail the breakthroughs emerging from Paradox Foundry.
              </p>
              <ul className="list-disc list-inside text-left ml-4 space-y-2">
                <li><a href="#" className="text-amber-500 hover:underline">"The Algorithmic Nature of Paradox: A New Approach to AGI Alignment"</a> (Pre-print, 2025)</li>
                <li><a href="#" className="text-amber-500 hover:underline">"Neurosymbolic AI for Narrative Generation in Complex Systems"</a> (Journal of Emergent Technologies, 2024)</li>
                <li><a href="#" className="text-amber-500 hover:underline">"Operationalizing Ethics in AI Development: A Case Study from Principia Paradoxica"</a> (Ethical AI Review, 2024)</li>
                <li><a href="https://github.com/your-org/simulacrum-engine" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">Simulacrum Engine Monorepo on GitHub</a> (Open-source Contributions)</li>
              </ul>
            </div>
          </section>
        </main>
    </>
  );
};

export default Research;