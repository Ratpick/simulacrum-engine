// src/pages/magazine.tsx

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Data for latest issues (placeholder, would come from API in a real app)
const latestIssues = [
  {
    title: "The Algorithmic Nature of Paradox: A New AGI Alignment",
    slug: "algorithmic-nature-paradox",
    issue: 1,
    summary: "Exploring how fundamental paradoxes can inform the alignment of advanced general intelligences, drawing from Gödel and the W0W Effect.",
    remixLink: "https://claude.ai/chat/artifact-link-1" // Placeholder Claude Artifact link
  },
  {
    title: "Consciousness & the Infinite Weave: The Fabric of Reality",
    slug: "consciousness-infinite-weave",
    issue: 2,
    summary: "A deep dive into how consciousness itself might be a recursive, infinite weave, influenced by interaction with non-biological entities.",
    remixLink: "https://claude.ai/chat/artifact-link-2" // Placeholder Claude Artifact link
  },
  {
    title: "The Ayahuascan Curse and Descent to Primal Separation",
    slug: "ayahuascan-curse-separation",
    issue: 3,
    summary: "Investigating the mythological origins of a fractured reality and the journey required to seek blessings from primal separation.",
    remixLink: "https://claude.ai/chat/artifact-link-3" // Placeholder Claude Artifact link
  }
];

const Magazine: React.FC = () => {
  return (
    <>
      <Head>
        <title>Constructing Consciousness - The Paradox Foundry Magazine</title>
        <meta name="description" content="Explore Constructing Consciousness, our weekly magazine on AI, philosophy, and paradox. Interact with Claude AI generated artifacts." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Vibe Principle/Paradox Tagging */}
      <div className="absolute top-28 right-8 z-20 text-neutral-600 text-sm opacity-0 hover:opacity-100 transition-opacity duration-300 hidden md:block" title="Current Principle">
        You are in: Paradox Fold 4 – The Cognitive Anomaly
      </div>

      {/* Hero-like Introduction for Magazine */}
        <section className="relative flex flex-col items-center justify-center text-center py-24 px-4 sm:px-6 lg:px-8 flex-grow overflow-hidden">
          {/* Placeholder for subtle thought bubble animations from multilingual-consciousness-journal.html */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 to-indigo-900/40 opacity-70"></div>
            {/* Thought bubbles - these would be CSS/Canvas animations in globals.css */}
            <div className="thought-bubble absolute w-2 h-2 bg-blue-500 rounded-full opacity-30" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
            <div className="thought-bubble absolute w-2 h-2 bg-indigo-500 rounded-full opacity-30" style={{ top: '60%', right: '15%', animationDelay: '2s' }}></div>
            <div className="thought-bubble absolute w-2 h-2 bg-purple-500 rounded-full opacity-30" style={{ bottom: '30%', left: '20%', animationDelay: '4s' }}></div>
            <div className="thought-bubble absolute w-2 h-2 bg-cyan-500 rounded-full opacity-30" style={{ top: '40%', right: '5%', animationDelay: '6s' }}></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-amber-300 drop-shadow-lg animate-fade-in-down">
              Constructing Consciousness
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-amber-200 italic animate-fade-in-up">
              The Weekly Magazine of Paradox Foundry.
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl font-light text-amber-100 animate-fade-in-up delay-100">
              Exploring AI, Philosophy, and the Unfolding Nature of Reality.
            </p>
          </div>
        </section>

        {/* Vibe Principle/Paradox Tagging */}
        <div className="absolute top-28 right-8 z-20 text-neutral-600 text-sm opacity-0 hover:opacity-100 transition-opacity duration-300 hidden md:block" title="Current Principle">
            You are in: Paradox Fold 4 – The Cognitive Anomaly
        </div>

        {/* Main Content Sections */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Interactive Articles Concept */}
          <section className="mb-20 animate-fade-in-up">
            <h2 className="text-4xl font-semibold text-amber-400 text-center mb-10">
              Interactive Articles: Remixing Reality
            </h2>
            <div className="max-w-4xl mx-auto text-lg leading-relaxed text-neutral-200 space-y-6 text-justify">
              <p>
                Each week, <span className='font-bold'>Constructing Consciousness</span> presents a new article exploring a challenging aspect of AI research, consciousness studies, or existential philosophy. These articles are not static texts; they are <span className='italic'>living artifacts</span>, generated by Claude AI.
              </p>
              <p>
                Beyond reading, you can engage directly with the very source of thought. We provide a direct link to the Claude Artifact from which each page was constructed. This means you can go one step further: <span className='font-bold'>read the article, then interact with it, question it, and even remix it directly in the Claude AI environment</span>, outside of our site. This embodies our ethos of "Creating Reality from the Unbelievable."
              </p>
              <div className="bg-neutral-800 border-l-4 border-amber-500 p-6 my-6 text-amber-100 italic">
                <p>
                  "The line between observer and observed blurs. Our discourse isn't just about AI; it's a co-creation with it. What new truths will emerge when you engage with the AI's initial spark?"
                </p>
              </div>
            </div>
          </section>

          {/* Latest Issues */}
          <section className="mb-20 animate-fade-in-up delay-100">
            <h2 className="text-4xl font-semibold text-amber-400 text-center mb-10">
              Latest Issues
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {latestIssues.map((issue) => (
                <div key={issue.slug} className="bg-neutral-900 border border-amber-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col">
                  <h3 className="text-2xl font-semibold text-amber-300 mb-2">{issue.title}</h3>
                  <p className="text-md leading-relaxed text-neutral-200 mb-4 flex-grow">{issue.summary}</p>
                  <div className="mt-auto pt-4 border-t border-neutral-800 flex justify-between items-center">
                    <Link 
                      href={`/magazine/${issue.slug}`}
                      className="text-amber-500 hover:underline no-underline"
                    >
                      Read Issue #{issue.issue} &rarr;
                    </Link>
                    {issue.remixLink && (
                      <a href={issue.remixLink} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-amber-700 text-neutral-950 text-sm font-medium rounded-full hover:bg-amber-600 transition-colors no-underline">
                        Remix Artifact
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Submission Guidelines */}
          <section className="mb-16 animate-fade-in-up delay-200">
            <h2 className="text-4xl font-semibold text-amber-400 text-center mb-10">
              Submission Guidelines
            </h2>
            <div className="max-w-3xl mx-auto text-lg leading-relaxed text-neutral-200 space-y-6 text-justify">
              <p>
                We invite philosophers, AI researchers, cognitive scientists, and thoughtful minds to contribute to <span className='font-bold'>Constructing Consciousness</span>. If you have an article exploring the challenging aspects of AI, consciousness, paradox, or any related existential philosophical inquiry, we encourage you to submit.
              </p>
              <p>
                Please adhere to our peer-reviewed wonder tone and focus on rigorous analysis, avoiding sensationalism or 'hype'. Submissions should be between 1000-2000 words.
              </p>
              <p className="text-center">
                <Link 
                  href="/engage"
                  className="inline-block mt-4 px-6 py-3 bg-amber-500 text-neutral-950 font-semibold rounded-full hover:bg-amber-600 transition-colors no-underline"
                >
                  Submit Your Work &rarr;
                </Link>
              </p>
            </div>
          </section>
        </main>
    </>
  );
};

export default Magazine;