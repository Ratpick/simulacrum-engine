/**
 * @fileoverview Advanced Trigram Pattern Analysis
 * Provides enhanced pattern detection and quantum-mythopoetic interpretations
 */

import { TRIGRAM_MATRIX, getTrigramRelationship } from './trigram-matrix.js';
import { RELATION_TYPES } from './trigram-relations.js';

/**
 * @typedef {Object} ParadoxTransition
 * @property {string} fromHexagram - Starting hexagram
 * @property {string} toHexagram - Ending hexagram
 * @property {string} description - Transition description
 * @property {Object} quantum - Quantum-mythopoetic interpretation
 */

/**
 * @typedef {Object} MetaphorBloom
 * @property {string} archetype - Philosophical archetype
 * @property {Array<string>} trigrams - Related trigrams
 * @property {string} description - Bloom description
 * @property {Object} quantum - Quantum-mythopoetic interpretation
 */

/**
 * @typedef {Object} HiddenSymmetry
 * @property {string} hexagram - Hexagram symbol
 * @property {Object} outer - Outer trigram analysis
 * @property {Object} nuclear - Nuclear trigram analysis
 * @property {string} description - Symmetry description
 * @property {Object} quantum - Quantum-mythopoetic interpretation
 */

// Known paradox transitions
const PARADOX_TRANSITIONS = {
    '51-48': {
        description: 'Thunder → Well: The awakening leads to nourishment',
        quantum: {
            interpretation: 'Quantum collapse into new possibility',
            resonance: 'The storm creates the spring',
            transformation: 'Chaos gives birth to order',
            daoist: 'The thunder awakens the sleeping waters',
            amazigh: 'The storm feeds the desert well',
            sufi: 'The lightning reveals the hidden spring'
        }
    },
    '29-30': {
        description: 'Water → Fire: The abyss meets the light',
        quantum: {
            interpretation: 'Quantum superposition of opposites',
            resonance: 'The depths reflect the heights',
            transformation: 'Darkness reveals light',
            daoist: 'The valley spirit meets the mountain light',
            amazigh: 'The wellspring feeds the desert sun',
            sufi: 'The heart finds light in darkness'
        }
    }
};

// Philosophical archetypes for metaphor blooms
const PHILOSOPHICAL_ARCHETYPES = {
    'REVERSAL': {
        description: 'Patterns of inversion and return',
        quantum: {
            interpretation: 'Quantum state reversal',
            resonance: 'The circle completes itself',
            transformation: 'Return to source',
            daoist: 'The way returns to itself',
            amazigh: 'The wind returns to the mountain',
            sufi: 'The soul returns to its origin'
        }
    },
    'UNFOLDING': {
        description: 'Patterns of emergence and growth',
        quantum: {
            interpretation: 'Quantum state expansion',
            resonance: 'The pattern unfolds',
            transformation: 'Emergence of new forms',
            daoist: 'The ten thousand things unfold',
            amazigh: 'The desert blooms after rain',
            sufi: 'The heart opens to truth'
        }
    },
    'CONTAINMENT': {
        description: 'Patterns of holding and preserving',
        quantum: {
            interpretation: 'Quantum state preservation',
            resonance: 'The form holds the essence',
            transformation: 'Maintenance of order',
            daoist: 'The valley holds the spirit',
            amazigh: 'The mountain shelters the tribe',
            sufi: 'The heart contains the divine'
        }
    }
};

/**
 * Analyzes paradox transitions between hexagrams
 * @param {string} fromHexagram - Starting hexagram
 * @param {string} toHexagram - Ending hexagram
 * @returns {ParadoxTransition|null} Transition analysis if found
 */
export function analyzeParadoxTransition(fromHexagram, toHexagram) {
    const key = `${fromHexagram}-${toHexagram}`;
    if (PARADOX_TRANSITIONS[key]) {
        return {
            fromHexagram,
            toHexagram,
            ...PARADOX_TRANSITIONS[key]
        };
    }
    return null;
}

/**
 * Analyzes trigram triads with paradoxical polarity
 * @param {Array<string>} trigrams - Array of three trigrams
 * @returns {Object|null} Analysis if paradoxical
 */
export function analyzeParadoxicalTriad(trigrams) {
    const lines = trigrams.map(t => getTrigramLines(t));
    const yangCount = lines.reduce((sum, l) => sum + l.filter(line => line === 'yang').length, 0);
    const yinCount = lines.reduce((sum, l) => sum + l.filter(line => line === 'yin').length, 0);
    
    // Check for paradoxical balance (e.g., 5 yang + 4 yin)
    if (Math.abs(yangCount - yinCount) === 1) {
        return {
            trigrams,
            description: `Paradoxical triad: ${trigrams.join(' + ')}`,
            quantum: {
                interpretation: 'Quantum superposition of opposites',
                resonance: 'The pattern holds both light and shadow',
                transformation: 'Emergence through paradox',
                daoist: 'The one contains the many',
                amazigh: 'The desert holds both sun and moon',
                sufi: 'The heart contains both truth and mystery'
            }
        };
    }
    
    return null;
}

/**
 * Identifies collapse zones with philosophical interpretations
 * @param {string} trigram - Central trigram
 * @param {Array<string>} unstableRelations - Unstable relationships
 * @returns {Object} Collapse zone analysis
 */
export function analyzeCollapseZone(trigram, unstableRelations) {
    const interpretations = {
        'CHAOS_NODE': {
            description: 'Point of maximum potential transformation',
            quantum: {
                interpretation: 'Quantum uncertainty peak',
                resonance: 'The pattern dissolves and reforms',
                transformation: 'Emergence through chaos',
                daoist: 'The valley of chaos gives birth to order',
                amazigh: 'The storm creates new paths',
                sufi: 'The heart finds truth in confusion'
            }
        },
        'SACRED_RUPTURE': {
            description: 'Moment of divine intervention',
            quantum: {
                interpretation: 'Quantum state rupture',
                resonance: 'The pattern breaks and heals',
                transformation: 'Emergence through rupture',
                daoist: 'The way breaks through',
                amazigh: 'The mountain splits to reveal water',
                sufi: 'The heart breaks to reveal truth'
            }
        },
        'LIMINAL_DOORWAY': {
            description: 'Threshold of transformation',
            quantum: {
                interpretation: 'Quantum state transition',
                resonance: 'The pattern stands at the threshold',
                transformation: 'Emergence through liminality',
                daoist: 'The way opens between worlds',
                amazigh: 'The desert reveals the oasis',
                sufi: 'The heart stands at the door of truth'
            }
        }
    };
    
    // Determine interpretation based on relationship patterns
    const interpretation = unstableRelations.length >= 4 ? 'CHAOS_NODE' :
                          unstableRelations.length === 3 ? 'SACRED_RUPTURE' :
                          'LIMINAL_DOORWAY';
    
    return {
        trigram,
        unstableRelations,
        ...interpretations[interpretation]
    };
}

/**
 * Detects hidden symmetries in hexagrams
 * @param {string} hexagram - Hexagram symbol
 * @returns {HiddenSymmetry|null} Symmetry analysis if found
 */
export function detectHiddenSymmetry(hexagram) {
    const outer = getOuterTrigram(hexagram);
    const nuclear = getNuclearTrigram(hexagram);
    
    if (isMirrorSymmetry(outer, nuclear)) {
        return {
            hexagram,
            outer,
            nuclear,
            description: `Hidden symmetry in ${hexagram}`,
            quantum: {
                interpretation: 'Quantum mirror symmetry',
                resonance: 'The pattern reflects itself',
                transformation: 'Emergence through reflection',
                daoist: 'The way mirrors itself',
                amazigh: 'The mountain reflects the sky',
                sufi: 'The heart reflects the divine'
            }
        };
    }
    
    return null;
}

/**
 * Detects metaphor blooms in relationship patterns
 * @param {Array<string>} trigrams - Array of trigrams
 * @returns {Array<MetaphorBloom>} Array of detected metaphor blooms
 */
export function detectMetaphorBlooms(trigrams) {
    const blooms = [];
    
    // Check each philosophical archetype
    Object.entries(PHILOSOPHICAL_ARCHETYPES).forEach(([archetype, data]) => {
        const relatedTrigrams = trigrams.filter(t => 
            isArchetypeRelated(t, archetype)
        );
        
        if (relatedTrigrams.length >= 3) {
            blooms.push({
                archetype,
                trigrams: relatedTrigrams,
                description: `${archetype} bloom detected`,
                quantum: data.quantum
            });
        }
    });
    
    return blooms;
}

// Helper functions
function getTrigramLines(trigram) {
    const lines = [];
    for (let i = 0; i < 3; i++) {
        lines.push(trigram[i] === '1' ? 'yang' : 'yin');
    }
    return lines;
}

function getOuterTrigram(hexagram) {
    return hexagram.substring(0, 3);
}

function getNuclearTrigram(hexagram) {
    return hexagram.substring(1, 4);
}

function isMirrorSymmetry(outer, nuclear) {
    return outer.split('').reverse().join('') === nuclear;
}

function isArchetypeRelated(trigram, archetype) {
    // Implementation depends on specific archetype relationships
    // This is a simplified example
    const relationships = {
        'REVERSAL': ['QIAN', 'KUN'],
        'UNFOLDING': ['LI', 'XUN'],
        'CONTAINMENT': ['GEN', 'KAN']
    };
    
    return relationships[archetype].includes(trigram);
} 