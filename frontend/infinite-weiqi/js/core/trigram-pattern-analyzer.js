/**
 * @fileoverview Advanced Trigram Pattern Analysis
 * Provides enhanced pattern detection and quantum-mythopoetic interpretations
 */

import { TRIGRAM_MATRIX, getTrigramRelationship } from './trigram-matrix.js';
import { RELATION_TYPES } from './trigram-relations.js';

/**
 * @typedef {Object} TriadicPattern
 * @property {Array<string>} trigrams - Sequence of trigrams
 * @property {string} type - Pattern type (generative, destructive, transformative)
 * @property {string} description - Pattern description
 * @property {Object} quantum - Quantum-mythopoetic interpretation
 */

/**
 * @typedef {Object} ConflictNode
 * @property {string} trigram - Central trigram
 * @property {Array<string>} opposingTrigrams - Opposing trigrams
 * @property {string} description - Conflict description
 * @property {Object} quantum - Quantum-mythopoetic interpretation
 */

/**
 * @typedef {Object} TransformationCascade
 * @property {Array<string>} sequence - Sequence of trigrams
 * @property {string} type - Cascade type
 * @property {string} description - Cascade description
 * @property {Object} quantum - Quantum-mythopoetic interpretation
 */

/**
 * @typedef {Object} HexagramPolarity
 * @property {number} yang - Yang score
 * @property {number} yin - Yin score
 * @property {number} balance - Balance score
 * @property {string} dominant - Dominant polarity
 */

/**
 * @typedef {Object} CollapseZone
 * @property {string} trigram - Central trigram
 * @property {Array<string>} unstableRelations - Unstable relationships
 * @property {string} description - Collapse description
 * @property {Object} quantum - Quantum-mythopoetic interpretation
 */

// Quantum-mythopoetic interpretations for specific relationships
const QUANTUM_INTERPRETATIONS = {
    [RELATION_TYPES.GENERATION]: {
        interpretation: 'Quantum emergence of new possibilities',
        resonance: 'Entangled creative forces',
        transformation: 'Birth of new quantum states',
        daoist: 'The Way gives birth to the ten thousand things',
        amazigh: 'The spring waters flow to feed new life',
        sufi: 'The breath of the Beloved creates new forms'
    },
    [RELATION_TYPES.CONQUEST]: {
        interpretation: 'Quantum collapse and transformation',
        resonance: 'Interference patterns of opposing forces',
        transformation: 'Evolution through quantum conflict',
        daoist: 'The strong overcomes the weak, yet weakness contains strength',
        amazigh: 'The desert wind shapes the mountain',
        sufi: 'The sword of truth cuts through illusion'
    },
    [RELATION_TYPES.SUPPORT]: {
        interpretation: 'Quantum stability and harmony',
        resonance: 'Coherent quantum states',
        transformation: 'Maintenance of quantum equilibrium',
        daoist: 'The valley spirit never dies',
        amazigh: 'The mountain shelters the valley',
        sufi: 'The heart finds rest in divine presence'
    },
    [RELATION_TYPES.OPPOSITION]: {
        interpretation: 'Quantum superposition of opposites',
        resonance: 'Interference of quantum waves',
        transformation: 'Emergence through quantum tension',
        daoist: 'The one gives birth to the two',
        amazigh: 'The desert meets the sea',
        sufi: 'The lover and beloved are one'
    },
    [RELATION_TYPES.RESONANCE]: {
        interpretation: 'Quantum entanglement of forces',
        resonance: 'Harmonic quantum patterns',
        transformation: 'Synchronized quantum evolution',
        daoist: 'All things return to their source',
        amazigh: 'The wind sings with the mountain',
        sufi: 'The heart echoes the divine rhythm'
    },
    [RELATION_TYPES.TRANSFORMATION]: {
        interpretation: 'Quantum state evolution',
        resonance: 'Dynamic quantum patterns',
        transformation: 'Emergence of new quantum possibilities',
        daoist: 'Change is the only constant',
        amazigh: 'The river carves new paths',
        sufi: 'The soul transforms through divine love'
    }
};

/**
 * Analyzes triadic patterns in the matrix
 * @returns {Array<TriadicPattern>} Array of identified triadic patterns
 */
export function analyzeTriadicPatterns() {
    const patterns = [];
    const trigrams = Object.keys(TRIGRAM_MATRIX);
    
    // Analyze all possible triadic combinations
    for (let i = 0; i < trigrams.length; i++) {
        for (let j = 0; j < trigrams.length; j++) {
            for (let k = 0; k < trigrams.length; k++) {
                const pattern = analyzeTriad(trigrams[i], trigrams[j], trigrams[k]);
                if (pattern) {
                    patterns.push(pattern);
                }
            }
        }
    }
    
    return patterns;
}

/**
 * Analyzes a specific triad of trigrams
 * @param {string} t1 - First trigram
 * @param {string} t2 - Second trigram
 * @param {string} t3 - Third trigram
 * @returns {TriadicPattern|null} Pattern if found
 */
function analyzeTriad(t1, t2, t3) {
    const r1 = getTrigramRelationship(t1, t2);
    const r2 = getTrigramRelationship(t2, t3);
    const r3 = getTrigramRelationship(t3, t1);
    
    // Check for generative loop
    if (r1.type === RELATION_TYPES.GENERATION && 
        r2.type === RELATION_TYPES.GENERATION && 
        r3.type === RELATION_TYPES.GENERATION) {
        return {
            trigrams: [t1, t2, t3],
            type: 'generative',
            description: `Generative loop: ${t1} → ${t2} → ${t3}`,
            quantum: {
                ...QUANTUM_INTERPRETATIONS[RELATION_TYPES.GENERATION],
                pattern: 'A self-sustaining cycle of creation and renewal',
                resonance: 'Quantum entanglement of creative forces',
                transformation: 'Continuous emergence of new possibilities'
            }
        };
    }
    
    // Check for destructive loop
    if (r1.type === RELATION_TYPES.CONQUEST && 
        r2.type === RELATION_TYPES.CONQUEST && 
        r3.type === RELATION_TYPES.CONQUEST) {
        return {
            trigrams: [t1, t2, t3],
            type: 'destructive',
            description: `Destructive loop: ${t1} → ${t2} → ${t3}`,
            quantum: {
                ...QUANTUM_INTERPRETATIONS[RELATION_TYPES.CONQUEST],
                pattern: 'A cycle of transformation through destruction',
                resonance: 'Quantum collapse and rebirth patterns',
                transformation: 'Emergence through dissolution'
            }
        };
    }
    
    // Check for transformative sequence
    if (r1.type === RELATION_TYPES.TRANSFORMATION && 
        r2.type === RELATION_TYPES.TRANSFORMATION) {
        return {
            trigrams: [t1, t2, t3],
            type: 'transformative',
            description: `Transformative sequence: ${t1} → ${t2} → ${t3}`,
            quantum: {
                ...QUANTUM_INTERPRETATIONS[RELATION_TYPES.TRANSFORMATION],
                pattern: 'A cascade of quantum state changes',
                resonance: 'Quantum superposition of multiple states',
                transformation: 'Evolution through multiple dimensions'
            }
        };
    }
    
    return null;
}

/**
 * Identifies conflict nodes in the matrix
 * @returns {Array<ConflictNode>} Array of identified conflict nodes
 */
export function identifyConflictNodes() {
    const nodes = [];
    const trigrams = Object.keys(TRIGRAM_MATRIX);
    
    trigrams.forEach(trigram => {
        const opposingTrigrams = [];
        
        // Find all opposing trigrams
        trigrams.forEach(other => {
            if (other !== trigram) {
                const rel = getTrigramRelationship(trigram, other);
                if (rel.type === RELATION_TYPES.OPPOSITION) {
                    opposingTrigrams.push(other);
                }
            }
        });
        
        // If three or more opposing trigrams found, create conflict node
        if (opposingTrigrams.length >= 3) {
            nodes.push({
                trigram,
                opposingTrigrams,
                description: `${trigram} opposes ${opposingTrigrams.join(', ')}`,
                quantum: {
                    ...QUANTUM_INTERPRETATIONS[RELATION_TYPES.OPPOSITION],
                    pattern: 'Quantum superposition of opposing forces',
                    resonance: 'Interference patterns of conflicting energies',
                    transformation: 'Emergence of new states through conflict'
                }
            });
        }
    });
    
    return nodes;
}

/**
 * Identifies transformation cascades in the matrix
 * @returns {Array<TransformationCascade>} Array of identified transformation cascades
 */
export function identifyTransformationCascades() {
    const cascades = [];
    const trigrams = Object.keys(TRIGRAM_MATRIX);
    
    // Analyze all possible three-step sequences
    for (let i = 0; i < trigrams.length; i++) {
        for (let j = 0; j < trigrams.length; j++) {
            for (let k = 0; k < trigrams.length; k++) {
                const cascade = analyzeCascade(trigrams[i], trigrams[j], trigrams[k]);
                if (cascade) {
                    cascades.push(cascade);
                }
            }
        }
    }
    
    return cascades;
}

/**
 * Analyzes a specific cascade sequence
 * @param {string} t1 - First trigram
 * @param {string} t2 - Second trigram
 * @param {string} t3 - Third trigram
 * @returns {TransformationCascade|null} Cascade if found
 */
function analyzeCascade(t1, t2, t3) {
    const r1 = getTrigramRelationship(t1, t2);
    const r2 = getTrigramRelationship(t2, t3);
    
    // Check for transformation cascade
    if (r1.type === RELATION_TYPES.TRANSFORMATION && 
        r2.type === RELATION_TYPES.TRANSFORMATION) {
        return {
            sequence: [t1, t2, t3],
            type: 'transformation',
            description: `Transformation cascade: ${t1} → ${t2} → ${t3}`,
            quantum: {
                ...QUANTUM_INTERPRETATIONS[RELATION_TYPES.TRANSFORMATION],
                pattern: 'Quantum state evolution through multiple dimensions',
                resonance: 'Entangled transformation patterns',
                transformation: 'Emergence of new quantum possibilities'
            }
        };
    }
    
    // Check for mutation arc
    if (r1.type === RELATION_TYPES.GENERATION && 
        r2.type === RELATION_TYPES.TRANSFORMATION) {
        return {
            sequence: [t1, t2, t3],
            type: 'mutation',
            description: `Mutation arc: ${t1} → ${t2} → ${t3}`,
            quantum: {
                ...QUANTUM_INTERPRETATIONS[RELATION_TYPES.TRANSFORMATION],
                pattern: 'Quantum mutation through generation and transformation',
                resonance: 'Evolutionary quantum patterns',
                transformation: 'Emergence of new quantum states'
            }
        };
    }
    
    return null;
}

/**
 * Analyzes hexagram polarity
 * @param {string} upper - Upper trigram
 * @param {string} lower - Lower trigram
 * @returns {HexagramPolarity} Polarity analysis
 */
export function analyzeHexagramPolarity(upper, lower) {
    const upperLines = getTrigramLines(upper);
    const lowerLines = getTrigramLines(lower);
    
    const yang = upperLines.filter(line => line === 'yang').length + 
                 lowerLines.filter(line => line === 'yang').length;
    const yin = upperLines.filter(line => line === 'yin').length + 
                lowerLines.filter(line => line === 'yin').length;
    
    const balance = Math.abs(yang - yin) / 6;
    
    return {
        yang,
        yin,
        balance,
        dominant: yang > yin ? 'yang' : yin > yang ? 'yin' : 'balanced'
    };
}

/**
 * Identifies collapse zones in the matrix
 * @returns {Array<CollapseZone>} Array of identified collapse zones
 */
export function identifyCollapseZones() {
    const zones = [];
    const trigrams = Object.keys(TRIGRAM_MATRIX);
    
    trigrams.forEach(trigram => {
        const unstableRelations = [];
        
        // Find all unstable relationships
        trigrams.forEach(other => {
            if (other !== trigram) {
                const rel = getTrigramRelationship(trigram, other);
                if (isUnstableRelationship(rel)) {
                    unstableRelations.push(other);
                }
            }
        });
        
        // If three or more unstable relationships found, create collapse zone
        if (unstableRelations.length >= 3) {
            zones.push({
                trigram,
                unstableRelations,
                description: `${trigram} has unstable relations with ${unstableRelations.join(', ')}`,
                quantum: {
                    interpretation: 'Quantum uncertainty and potential collapse',
                    resonance: 'Chaotic quantum patterns',
                    transformation: 'Emergence through chaos',
                    daoist: 'The valley of chaos gives birth to order',
                    amazigh: 'The desert wind creates new dunes',
                    sufi: 'The heart finds truth in confusion'
                }
            });
        }
    });
    
    return zones;
}

/**
 * Checks if a relationship is unstable
 * @param {Object} relationship - Relationship object
 * @returns {boolean} True if relationship is unstable
 */
function isUnstableRelationship(relationship) {
    return relationship.type === RELATION_TYPES.OPPOSITION || 
           relationship.type === RELATION_TYPES.CONQUEST;
}

/**
 * Gets the lines of a trigram
 * @param {string} trigram - Trigram symbol
 * @returns {Array<string>} Array of line types ('yang' or 'yin')
 */
function getTrigramLines(trigram) {
    const lines = [];
    for (let i = 0; i < 3; i++) {
        lines.push(trigram[i] === '1' ? 'yang' : 'yin');
    }
    return lines;
}

/**
 * Generates quantum-mythopoetic interpretations for specific relationships
 * @param {string} trigram1 - First trigram
 * @param {string} trigram2 - Second trigram
 * @returns {Object} Quantum-mythopoetic interpretation
 */
export function generateQuantumInterpretation(trigram1, trigram2) {
    const relationship = getTrigramRelationship(trigram1, trigram2);
    const inverseRel = getTrigramRelationship(trigram2, trigram1);
    
    const baseInterpretation = QUANTUM_INTERPRETATIONS[relationship.type];
    
    // Add asymmetry-specific interpretations
    if (relationship.asymmetric) {
        return {
            ...baseInterpretation,
            asymmetry: {
                interpretation: 'Asymmetric quantum evolution',
                resonance: 'Unbalanced quantum patterns',
                transformation: 'Directed quantum flow',
                daoist: 'The way forward is not the way back',
                amazigh: 'The wind shapes the mountain differently than the mountain shapes the wind',
                sufi: 'The path to truth is not the path from truth'
            }
        };
    }
    
    return baseInterpretation;
} 