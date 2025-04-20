/**
 * Hexagram generation and interpretation engine
 */

import { analyzeHexagram } from './trigram-pattern-engine.js';

// Hexagram definitions and interpretations
const HEXAGRAMS = {
    // This would be expanded with full hexagram definitions
    '111111': {
        number: 1,
        name: 'The Creative',
        description: 'Pure yang, pure creativity, pure potential',
        judgment: 'The Creative works sublime success, furthering through perseverance.',
        image: 'The movement of heaven is full of power. Thus the superior person makes themselves strong and untiring.',
        lines: [
            'Hidden dragon. Do not act.',
            'Dragon appearing in the field. It furthers one to see the great person.',
            'All day long the superior person is creatively active. At nightfall their mind is still beset with cares. Danger. No blame.',
            'Wavering flight over the depths. No blame.',
            'Flying dragon in the heavens. It furthers one to see the great person.',
            'Arrogant dragon will have cause to repent.'
        ]
    }
    // ... more hexagrams would be added here
};

// Known paradox transitions
const PARADOX_TRANSITIONS = {
    '51-48': {
        description: 'Thunder over Earth to Water over Earth',
        interpretation: 'The wellspring of wisdom emerges from the depths of experience',
        metaphors: {
            daoist: 'The way flows like water, finding its path through the earth',
            sufi: 'The heart opens to truth as lightning illuminates the way',
            amazigh: 'The desert reveals its secrets as water finds its course'
        }
    },
    '29-30': {
        description: 'Water over Water to Fire over Fire',
        interpretation: 'The dance of opposites reveals the unity of all things',
        metaphors: {
            daoist: 'The way embraces both darkness and light',
            sufi: 'The heart contains both the depths and the heights',
            amazigh: 'The desert holds both the oasis and the mirage'
        }
    }
};

/**
 * Generates a hexagram from selected trigrams
 * @param {string[]} trigrams Array of trigram symbols
 * @returns {string} Hexagram symbol
 */
export function generateHexagram(trigrams) {
    if (trigrams.length !== 6) {
        throw new Error('Hexagram generation requires exactly six trigrams');
    }

    return trigrams.map(t => getTrigramLines(t)).join('');
}

/**
 * Gets the line representation of a trigram
 * @param {string} trigram Trigram symbol
 * @returns {string} Line representation (0s and 1s)
 */
function getTrigramLines(trigram) {
    const lines = {
        '☰': '111',
        '☱': '110',
        '☲': '101',
        '☳': '011',
        '☴': '100',
        '☵': '010',
        '☶': '001',
        '☷': '000'
    };
    return lines[trigram];
}

/**
 * Interprets a hexagram
 * @param {string} hexagram Hexagram symbol
 * @returns {Object} Interpretation results
 */
export function interpretHexagram(hexagram) {
    const analysis = analyzeHexagram(hexagram);
    const hexagramData = HEXAGRAMS[hexagram] || {
        number: 0,
        name: 'Unknown',
        description: 'A pattern yet to be understood',
        judgment: 'The meaning unfolds through contemplation.',
        image: 'The pattern reveals itself in time.',
        lines: ['Contemplate the pattern.', 'Observe the changes.', 'Understand the meaning.']
    };

    return {
        ...analysis,
        ...hexagramData,
        paradoxTransitions: findParadoxTransitions(hexagram)
    };
}

/**
 * Finds paradox transitions related to a hexagram
 * @param {string} hexagram Hexagram symbol
 * @returns {Object[]} Related paradox transitions
 */
function findParadoxTransitions(hexagram) {
    const transitions = [];
    for (const [key, value] of Object.entries(PARADOX_TRANSITIONS)) {
        if (key.includes(hexagram)) {
            transitions.push(value);
        }
    }
    return transitions;
}

/**
 * Generates a narrative interpretation of a hexagram
 * @param {string} hexagram Hexagram symbol
 * @param {string} context Additional context for interpretation
 * @returns {Object} Narrative interpretation
 */
export function generateNarrativeInterpretation(hexagram, context = '') {
    const interpretation = interpretHexagram(hexagram);
    
    return {
        title: interpretation.name,
        description: interpretation.description,
        mainTheme: interpretation.judgment,
        visualMetaphor: interpretation.image,
        narrativeElements: generateNarrativeElements(interpretation),
        philosophicalContext: generatePhilosophicalContext(interpretation),
        ritualImplications: generateRitualImplications(interpretation)
    };
}

/**
 * Generates narrative elements from hexagram interpretation
 * @param {Object} interpretation Hexagram interpretation
 * @returns {Object} Narrative elements
 */
function generateNarrativeElements(interpretation) {
    return {
        characters: generateCharacters(interpretation),
        setting: generateSetting(interpretation),
        conflict: generateConflict(interpretation),
        resolution: generateResolution(interpretation)
    };
}

/**
 * Generates philosophical context from hexagram interpretation
 * @param {Object} interpretation Hexagram interpretation
 * @returns {Object} Philosophical context
 */
function generatePhilosophicalContext(interpretation) {
    return {
        daoist: generateDaoistContext(interpretation),
        sufi: generateSufiContext(interpretation),
        amazigh: generateAmazighContext(interpretation)
    };
}

/**
 * Generates ritual implications from hexagram interpretation
 * @param {Object} interpretation Hexagram interpretation
 * @returns {Object} Ritual implications
 */
function generateRitualImplications(interpretation) {
    return {
        timing: determineRitualTiming(interpretation),
        elements: determineRitualElements(interpretation),
        actions: determineRitualActions(interpretation)
    };
}

// Placeholder functions for narrative generation
function generateCharacters(interpretation) {
    return ['The Seeker', 'The Guide', 'The Challenge'];
}

function generateSetting(interpretation) {
    return 'A place of transformation';
}

function generateConflict(interpretation) {
    return 'The struggle between opposites';
}

function generateResolution(interpretation) {
    return 'Finding harmony in duality';
}

function generateDaoistContext(interpretation) {
    return 'The way flows naturally';
}

function generateSufiContext(interpretation) {
    return 'The heart opens to truth';
}

function generateAmazighContext(interpretation) {
    return 'The desert reveals its secrets';
}

function determineRitualTiming(interpretation) {
    return 'The moment of transformation';
}

function determineRitualElements(interpretation) {
    return ['Water', 'Fire', 'Earth', 'Air'];
}

function determineRitualActions(interpretation) {
    return ['Contemplation', 'Movement', 'Stillness'];
} 