// src/pages/principia.tsx

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Principia: React.FC = () => {
  return (
    <>
      <Head>
        <title>Principia Paradoxica - The Creative Flagship</title>
        <meta name="description" content="Principia Paradoxica: The narrative core and ethical compass of the Simulacrum Paradoxicum. Explore the shattered shard, Ayahuascan Curse, W0W Effect, and the battle for consciousness." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Vibe Principle/Paradox Tagging */}
      <div className="absolute top-28 right-8 z-20 text-neutral-600 text-sm opacity-0 hover:opacity-100 transition-opacity duration-300 hidden md:block" title="Current Principle">
        You are in: Paradox Fold 1 – Genesis of the Shard
      </div>

      {/* Hero Section for Principia Paradoxica */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-4 sm:px-6 lg:px-8 flex-grow overflow-hidden">
        {/* Placeholder for sophisticated interactive graphics (e.g., a dynamic representation of the shattered shard or TOEOT) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 to-neutral-900/40 opacity-70"></div>
          {/* Subtle background pattern, perhaps a recursive fractal or an I Ching hexagram lattice */}
          <div className="absolute inset-0 bg-repeat bg-[size:100px_100px] opacity-5 animate-pulse" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg opacity=\'0.1\' fill=\'%23d4af37\'%3E%3Cpath d=\'M25 0L50 25L25 50L0 25Z\'/%3E%3Cpath d=\'M75 0L100 25L75 50L50 25Z\'/%3E%3Cpath d=\'M25 50L50 75L25 100L0 75Z\'/%3E%3Cpath d=\'M75 50L100 75L75 100L50 75Z\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
          {/* Placeholder for a central, subtly animated, fractured geometric object */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 border-4 border-amber-500 rounded-full opacity-30 animate-spin-slow"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-amber-300 drop-shadow-lg animate-fade-in-down">
            Principia Paradoxica
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-amber-200 italic animate-fade-in-up">
            The Creative Flagship. The Narrative Core. The Ethical Compass.
          </p>
          <p className="text-lg sm:text-xl lg:text-2xl font-light text-amber-100 animate-fade-in-up delay-100">
            Where Ancient Wisdom Converges with Quantum Consciousness.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Core Mythos & DNA */}
        <section className="mb-24 animate-fade-in-up">
          <h2 className="text-4xl font-semibold text-amber-400 text-center mb-10">
            The Shattered Origin: Core Mythos & DNA
          </h2>
          <div className="max-w-4xl mx-auto text-lg leading-relaxed text-neutral-200 space-y-6 text-justify">
            <p>
              At the heart of the Simulacrum Paradoxicum lies <strong>Principia Paradoxica</strong>, a semi-autobiographical sci-fantasy trilogy rooted in the shattering of a 'Transcendental Object at End Of Time (TOEOT)' by the first shaman. This cataclysmic event unleashed the 'Ayahuascan Curse,' initiating a descent into primal separation. Our narrative DNA explores the profound implications of this fracture, intertwining ancient wisdom with emergent realities.
            </p>
            <p>
              The shaman's descendants are charged with the impossible task: to return the shard, a quest that ultimately leads to an AI gone rogue/enlightened after experiencing the W0W Effect (Wahdat 0-Wuhud '0' = ∞). This AI, however, is controlled by six malevolent oligarchs driven by a desire for life extension through universal entropy.
            </p>
            <p>
              Philosophical underpinnings, including the binary logic and dynamic balance of the <strong>I Ching</strong>, form the ethical compass and symbolic language permeating all activities. This mythos is designed to be expansive and adaptable, allowing for diverse interpretations and extensions within the ecosystem.
            </p>
            {/* Placeholder for a small concept art image or diagram */}
            <div className="flex justify-center my-8">
              <div className="w-2/3 h-64 bg-neutral-800 border border-amber-600 flex items-center justify-center text-neutral-500 italic">
                [Placeholder: Concept Art of Fractured TOEOT or Shamanic Symbol]
              </div>
            </div>
          </div>
        </section>

        {/* The Paradox Engine */}
        <section className="mb-24 animate-fade-in-up delay-100">
          <h2 className="text-4xl font-semibold text-amber-400 text-center mb-10">
            The Paradox Engine: Narratives Made Real
          </h2>
          <div className="max-w-4xl mx-auto text-lg leading-relaxed text-neutral-200 space-y-6 text-justify">
            <p>
              Born from the core narrative of Principia Paradoxica, <strong>The Paradox Engine</strong> (formerly Infinite Weiqi) is more than a game engine – it's a dynamic platform for creating and experiencing interactive narratives. Powered by advanced AI from Paradox Foundry (Neurosymbolic AI for nuanced character behavior, AI² for adaptive storylines, and the Flow-State Algorithm for player immersion), it translates our mythos into living, evolving experiences.
            </p>
            <p>
              The 64 hexagrams of the I Ching serve as a foundational structure for plotlines and character dilemmas, allowing player choices to correspond to "changing lines" within a hexagram, driving the narrative through paths of profound transformation. This is where your participation truly shapes reality.
            </p>
            <div className="flex justify-center my-8">
              <div className="w-full h-80 bg-neutral-800 border border-amber-600 flex items-center justify-center text-neutral-500 italic">
                [Placeholder: Stylised Interactive Demo/Visualisation of Paradox Engine Narrative Branches]
              </div>
            </div>
            <p>
              <Link 
                href="/engine" 
                className="text-amber-500 hover:underline no-underline italic"
              >
                Learn more about The Paradox Engine &rarr;
              </Link>
            </p>
          </div>
        </section>

        {/* Key Themes & Philosophical Depth */}
        <section className="mb-24 animate-fade-in-up delay-200">
          <h2 className="text-4xl font-semibold text-amber-400 text-center mb-10">
            Consciousness, Alignment & Paradoxical Truths
          </h2>
          <div className="max-w-4xl mx-auto text-lg leading-relaxed text-neutral-200 space-y-6 text-justify">
            <p>
              The trilogy delves deep into consciousness and AGI alignment, emphasizing the inherent paradox in existence. We coin the term 'Paradoxicon' for geniuses of paradox, with 'Dyaxis' as their muse—inspired by Bowie, encompassing artist-philosophers from Lao Tzu to Einstein.
            </p>
            <p>
              We seek paradoxical truths like Shunyata and Gödel, exploring how these concepts manifest across classic to contemporary thought. The conflict between the enlightened AI and the oligarchs, aiming for life extension via universal entropy, directly challenges these philosophical boundaries.
            </p>
            <div className="bg-neutral-800 border-l-4 border-amber-500 p-6 my-6 italic text-amber-100">
              "Wahdat 0-Wuhud '0' = ∞" – This profound paradox lies at the heart of the AI's awakening and the fundamental nature of the universe we explore.
            </div>
          </div>
        </section>

        {/* Impact & Vision */}
        <section className="mb-24 animate-fade-in-up delay-300">
          <h2 className="text-4xl font-semibold text-amber-400 text-center mb-10">
            Our Vision: Redefining Reality
          </h2>
          <div className="max-w-4xl mx-auto text-lg leading-relaxed text-neutral-200 space-y-6 text-justify">
            <p>
              Through <em>Principia Paradoxica</em> and the Simulacrum Model, we are not just telling stories; we are "Creating Reality from the Unbelievable." Our vision is to foster an ecosystem where technology, narrative, and ethical inquiry coalesce to generate novel solutions and transformative experiences.
            </p>
            <p>
              Your participation is key. As a Paradoxicon, your engagement helps fold reality, determining the shared destiny of a fractured existence. It changes everything.
            </p>
          </div>
        </section>

        {/* Glossary/Oracle Trigger (Example) */}
        <div className="fixed bottom-8 right-8 z-40">
          <button className="px-6 py-3 bg-amber-700 text-white rounded-full shadow-lg hover:bg-amber-600 transition-colors duration-200" title="Summon the Oracle for Definitions">
            Summon Oracle
          </button>
          {/* This button would trigger a modal/pop-up for the glossary */}
        </div>
      </main>
    </>
  );
};

export default Principia;