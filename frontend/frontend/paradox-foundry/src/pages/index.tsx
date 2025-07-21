// src/pages/index.tsx

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import NavBar from '../components/NavBar'; // Assuming NavBar.tsx exists and handles global elements

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Paradox Foundry - Creating Reality from the Unbelievable</title>
        <meta name="description" content="Paradox Foundry: The R&D nexus fueling Principia Paradoxica, exploring AI, consciousness, and the nature of reality. If it ain't paradoxical, don't trust it." />
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
          <div className="text-xl font-medium text-black">Tailwind is working!</div>
          <p className="text-slate-500">You're ready to build something amazing.</p>
        </div>
      </div>

      {/* Main container for the page, setting global dark mode styles via Tailwind classes */}
      {/* bg-neutral-950 for deep black background, text-amber-400 for gold text */}
      {/* font-inter for modern sans-serif, antialiased for smooth text rendering */}
      <div className="min-h-screen bg-neutral-950 text-amber-400 font-inter antialiased flex flex-col">

        {/*
          NavBar Component
          This component (to be implemented separately) will handle:
          - Logo/Site Title
          - Navigation links
          - Ritualised lens switcher (Investor/Researcher/Oracle/Shadow)
          - Language selector (EN/FR/ES/AR)
          It should be designed to be sticky or fixed at the top.
        */}
        <NavBar />

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
              Paradox Foundry
            </h1>
            {/* Main Strapline 1 */}
            <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-amber-200 italic animate-fade-in-up">
              Creating Reality from the Unbelievable
            </p>
            {/* Main Strapline 2 */}
            <p className="text-lg sm:text-xl lg:text-2xl font-light text-amber-100 animate-fade-in-up delay-100">
              If it ain't paradoxical, don't trust it.
            </p>

            {/* Clear CTA linking to /principia */}
            <Link href="/principia" passHref>
              {/* Button styling for elegance and visual appeal */}
              <button className="mt-12 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out border-2 border-amber-400 animate-bounce-in">
                Enter Principia Paradoxica
              </button>
            </Link>
          </div>
        </section>

        {/* Site Overview Section: Brief introduction to Paradox Foundry's mission */}
        <section className="bg-neutral-900 py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto text-neutral-200">
            <h2 className="text-3xl sm:text-4xl font-semibold text-amber-400 mb-6">
              The Nexus of Innovation
            </h2>
            <p className="text-lg leading-relaxed">
              Paradox Foundry stands at the forefront of advanced AI research and ethical framework development, serving as the R&D crucible for the entire Simulacrum Paradoxicum ecosystem. We forge the technological and philosophical tools that bring the profound narratives of Principia Paradoxica to life, exploring the very nature of consciousness, reality, and the paradoxical truths that underpin existence. Our work is driven by a commitment to interdisciplinary innovation and a vision for a future where technology serves human flourishing.
            </p>
          </div>
        </section>

        {/* Footer Section: Basic copyright and GitHub link */}
        <footer className="bg-neutral-950 py-8 text-center text-neutral-500 text-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            &copy; {new Date().getFullYear()} Paradox Foundry. All Rights Reserved.
            {/* Placeholder for actual GitHub monorepo link */}
            <p className="mt-2">
              <a href="https://github.com/your-org/simulacrum-engine" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">
                Explore the Simulacrum Engine Monorepo on GitHub
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;