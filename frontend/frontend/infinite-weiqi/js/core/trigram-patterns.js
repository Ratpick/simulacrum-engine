/**
 * @fileoverview Trigram Relationship Pattern Matrix
 * Defines the relationship patterns between trigrams
 */

import { TRIGRAMS, RELATION_TYPES } from './trigram-relations.js';

/**
 * @typedef {Object} PatternMatrix
 * @property {string} trigram1 - First trigram key
 * @property {string} trigram2 - Second trigram key
 * @property {string} type - Relationship type
 * @property {string} [context] - Optional context
 */

/**
 * Matrix of trigram relationships
 * @type {Array<PatternMatrix>}
 */
export const TRIGRAM_PATTERNS = [
    // Heaven (QIAN) relationships
    { trigram1: 'QIAN', trigram2: 'DUI', type: RELATION_TYPES.GENERATION, context: 'metal' },
    { trigram1: 'QIAN', trigram2: 'LI', type: RELATION_TYPES.OPPOSITION, context: 'fire' },
    { trigram1: 'QIAN', trigram2: 'ZHEN', type: RELATION_TYPES.SUPPORT, context: 'thunder' },
    { trigram1: 'QIAN', trigram2: 'XUN', type: RELATION_TYPES.TRANSFORMATION, context: 'wind' },
    { trigram1: 'QIAN', trigram2: 'KAN', type: RELATION_TYPES.CONQUEST, context: 'water' },
    { trigram1: 'QIAN', trigram2: 'GEN', type: RELATION_TYPES.RESONANCE, context: 'mountain' },
    { trigram1: 'QIAN', trigram2: 'KUN', type: RELATION_TYPES.OPPOSITION, context: 'earth' },

    // Lake (DUI) relationships
    { trigram1: 'DUI', trigram2: 'QIAN', type: RELATION_TYPES.GENERATION, context: 'metal' },
    { trigram1: 'DUI', trigram2: 'LI', type: RELATION_TYPES.CONQUEST, context: 'fire' },
    { trigram1: 'DUI', trigram2: 'ZHEN', type: RELATION_TYPES.TRANSFORMATION, context: 'thunder' },
    { trigram1: 'DUI', trigram2: 'XUN', type: RELATION_TYPES.SUPPORT, context: 'wind' },
    { trigram1: 'DUI', trigram2: 'KAN', type: RELATION_TYPES.OPPOSITION, context: 'water' },
    { trigram1: 'DUI', trigram2: 'GEN', type: RELATION_TYPES.RESONANCE, context: 'mountain' },
    { trigram1: 'DUI', trigram2: 'KUN', type: RELATION_TYPES.GENERATION, context: 'earth' },

    // Fire (LI) relationships
    { trigram1: 'LI', trigram2: 'QIAN', type: RELATION_TYPES.OPPOSITION, context: 'metal' },
    { trigram1: 'LI', trigram2: 'DUI', type: RELATION_TYPES.CONQUEST, context: 'fire' },
    { trigram1: 'LI', trigram2: 'ZHEN', type: RELATION_TYPES.TRANSFORMATION, context: 'thunder' },
    { trigram1: 'LI', trigram2: 'XUN', type: RELATION_TYPES.SUPPORT, context: 'wind' },
    { trigram1: 'LI', trigram2: 'KAN', type: RELATION_TYPES.OPPOSITION, context: 'water' },
    { trigram1: 'LI', trigram2: 'GEN', type: RELATION_TYPES.RESONANCE, context: 'mountain' },
    { trigram1: 'LI', trigram2: 'KUN', type: RELATION_TYPES.GENERATION, context: 'earth' },

    // Thunder (ZHEN) relationships
    { trigram1: 'ZHEN', trigram2: 'QIAN', type: RELATION_TYPES.SUPPORT, context: 'metal' },
    { trigram1: 'ZHEN', trigram2: 'DUI', type: RELATION_TYPES.TRANSFORMATION, context: 'fire' },
    { trigram1: 'ZHEN', trigram2: 'LI', type: RELATION_TYPES.TRANSFORMATION, context: 'thunder' },
    { trigram1: 'ZHEN', trigram2: 'XUN', type: RELATION_TYPES.RESONANCE, context: 'wind' },
    { trigram1: 'ZHEN', trigram2: 'KAN', type: RELATION_TYPES.GENERATION, context: 'water' },
    { trigram1: 'ZHEN', trigram2: 'GEN', type: RELATION_TYPES.OPPOSITION, context: 'mountain' },
    { trigram1: 'ZHEN', trigram2: 'KUN', type: RELATION_TYPES.CONQUEST, context: 'earth' },

    // Wind (XUN) relationships
    { trigram1: 'XUN', trigram2: 'QIAN', type: RELATION_TYPES.TRANSFORMATION, context: 'metal' },
    { trigram1: 'XUN', trigram2: 'DUI', type: RELATION_TYPES.SUPPORT, context: 'fire' },
    { trigram1: 'XUN', trigram2: 'LI', type: RELATION_TYPES.SUPPORT, context: 'thunder' },
    { trigram1: 'XUN', trigram2: 'ZHEN', type: RELATION_TYPES.RESONANCE, context: 'wind' },
    { trigram1: 'XUN', trigram2: 'KAN', type: RELATION_TYPES.GENERATION, context: 'water' },
    { trigram1: 'XUN', trigram2: 'GEN', type: RELATION_TYPES.OPPOSITION, context: 'mountain' },
    { trigram1: 'XUN', trigram2: 'KUN', type: RELATION_TYPES.CONQUEST, context: 'earth' },

    // Water (KAN) relationships
    { trigram1: 'KAN', trigram2: 'QIAN', type: RELATION_TYPES.CONQUEST, context: 'metal' },
    { trigram1: 'KAN', trigram2: 'DUI', type: RELATION_TYPES.OPPOSITION, context: 'fire' },
    { trigram1: 'KAN', trigram2: 'LI', type: RELATION_TYPES.OPPOSITION, context: 'thunder' },
    { trigram1: 'KAN', trigram2: 'ZHEN', type: RELATION_TYPES.GENERATION, context: 'wind' },
    { trigram1: 'KAN', trigram2: 'XUN', type: RELATION_TYPES.GENERATION, context: 'water' },
    { trigram1: 'KAN', trigram2: 'GEN', type: RELATION_TYPES.RESONANCE, context: 'mountain' },
    { trigram1: 'KAN', trigram2: 'KUN', type: RELATION_TYPES.SUPPORT, context: 'earth' },

    // Mountain (GEN) relationships
    { trigram1: 'GEN', trigram2: 'QIAN', type: RELATION_TYPES.RESONANCE, context: 'metal' },
    { trigram1: 'GEN', trigram2: 'DUI', type: RELATION_TYPES.RESONANCE, context: 'fire' },
    { trigram1: 'GEN', trigram2: 'LI', type: RELATION_TYPES.RESONANCE, context: 'thunder' },
    { trigram1: 'GEN', trigram2: 'ZHEN', type: RELATION_TYPES.OPPOSITION, context: 'wind' },
    { trigram1: 'GEN', trigram2: 'XUN', type: RELATION_TYPES.OPPOSITION, context: 'water' },
    { trigram1: 'GEN', trigram2: 'KAN', type: RELATION_TYPES.RESONANCE, context: 'mountain' },
    { trigram1: 'GEN', trigram2: 'KUN', type: RELATION_TYPES.SUPPORT, context: 'earth' },

    // Earth (KUN) relationships
    { trigram1: 'KUN', trigram2: 'QIAN', type: RELATION_TYPES.OPPOSITION, context: 'metal' },
    { trigram1: 'KUN', trigram2: 'DUI', type: RELATION_TYPES.GENERATION, context: 'fire' },
    { trigram1: 'KUN', trigram2: 'LI', type: RELATION_TYPES.GENERATION, context: 'thunder' },
    { trigram1: 'KUN', trigram2: 'ZHEN', type: RELATION_TYPES.CONQUEST, context: 'wind' },
    { trigram1: 'KUN', trigram2: 'XUN', type: RELATION_TYPES.CONQUEST, context: 'water' },
    { trigram1: 'KUN', trigram2: 'GEN', type: RELATION_TYPES.SUPPORT, context: 'mountain' },
    { trigram1: 'KUN', trigram2: 'KAN', type: RELATION_TYPES.SUPPORT, context: 'earth' }
];

/**
 * Get relationship pattern between two trigrams
 * @param {string} trigram1 - First trigram key
 * @param {string} trigram2 - Second trigram key
 * @returns {PatternMatrix|null} Relationship pattern
 */
export function getTrigramPattern(trigram1, trigram2) {
    return TRIGRAM_PATTERNS.find(pattern => 
        (pattern.trigram1 === trigram1 && pattern.trigram2 === trigram2) ||
        (pattern.trigram1 === trigram2 && pattern.trigram2 === trigram1)
    ) || null;
}

/**
 * Get all relationships for a trigram
 * @param {string} trigram - Trigram key
 * @returns {Array<PatternMatrix>} Relationship patterns
 */
export function getTrigramRelationships(trigram) {
    return TRIGRAM_PATTERNS.filter(pattern => 
        pattern.trigram1 === trigram || pattern.trigram2 === trigram
    );
}

/**
 * Get relationships of a specific type
 * @param {string} type - Relationship type
 * @returns {Array<PatternMatrix>} Relationship patterns
 */
export function getRelationshipsByType(type) {
    return TRIGRAM_PATTERNS.filter(pattern => pattern.type === type);
}

/**
 * @fileoverview Trigram Relationship Pattern Analysis
 * Provides utilities for analyzing patterns in trigram relationships
 */

import { TRIGRAM_MATRIX, getTrigramRelationship } from './trigram-matrix.js';
import { RELATION_TYPES } from './trigram-relations.js';

/**
 * @typedef {Object} PatternAnalysis
 * @property {Array<string>} patterns - Identified patterns
 * @property {Object} statistics - Pattern statistics
 * @property {Array<string>} insights - Human-readable insights
 */

/**
 * Analyzes patterns in the trigram matrix
 * @returns {PatternAnalysis} Analysis of relationship patterns
 */
export function analyzeMatrixPatterns() {
    const patterns = [];
    const statistics = {
        relationshipCounts: {},
        asymmetricCount: 0,
        symmetricCount: 0,
        dominantTypes: {},
        complementaryPairs: []
    };
    
    // Count relationship types
    Object.values(TRIGRAM_MATRIX).forEach(relationships => {
        Object.values(relationships).forEach(rel => {
            statistics.relationshipCounts[rel.type] = (statistics.relationshipCounts[rel.type] || 0) + 1;
            if (rel.asymmetric) {
                statistics.asymmetricCount++;
            } else {
                statistics.symmetricCount++;
            }
        });
    });
    
    // Find dominant relationship types
    const sortedTypes = Object.entries(statistics.relationshipCounts)
        .sort(([,a], [,b]) => b - a);
    statistics.dominantTypes = Object.fromEntries(sortedTypes.slice(0, 2));
    
    // Find complementary pairs
    Object.entries(TRIGRAM_MATRIX).forEach(([trigram1, relationships]) => {
        Object.entries(relationships).forEach(([trigram2, rel]) => {
            const inverseRel = getTrigramRelationship(trigram2, trigram1);
            if (rel.type === inverseRel.type && !rel.asymmetric) {
                statistics.complementaryPairs.push(`${trigram1}-${trigram2}`);
            }
        });
    });
    
    // Generate patterns
    patterns.push(...generatePatterns(statistics));
    
    // Generate insights
    const insights = generateInsights(statistics, patterns);
    
    return {
        patterns,
        statistics,
        insights
    };
}

/**
 * Generates pattern descriptions based on statistics
 * @param {Object} statistics - Pattern statistics
 * @returns {Array<string>} Pattern descriptions
 */
function generatePatterns(statistics) {
    const patterns = [];
    
    // Analyze relationship distribution
    const totalRelationships = Object.values(statistics.relationshipCounts).reduce((a, b) => a + b, 0);
    Object.entries(statistics.relationshipCounts).forEach(([type, count]) => {
        const percentage = (count / totalRelationships) * 100;
        if (percentage > 20) {
            patterns.push(`${type} relationships form ${Math.round(percentage)}% of the matrix`);
        }
    });
    
    // Analyze symmetry
    const symmetryRatio = statistics.symmetricCount / (statistics.symmetricCount + statistics.asymmetricCount);
    if (symmetryRatio > 0.6) {
        patterns.push('High degree of symmetry in relationships');
    } else if (symmetryRatio < 0.4) {
        patterns.push('Strong asymmetry in relationships');
    }
    
    // Analyze complementary pairs
    if (statistics.complementaryPairs.length > 0) {
        patterns.push(`${statistics.complementaryPairs.length} complementary pairs found`);
    }
    
    return patterns;
}

/**
 * Generates human-readable insights from patterns
 * @param {Object} statistics - Pattern statistics
 * @param {Array<string>} patterns - Identified patterns
 * @returns {Array<string>} Human-readable insights
 */
function generateInsights(statistics, patterns) {
    const insights = [];
    
    // Relationship type insights
    const [dominantType, secondaryType] = Object.entries(statistics.dominantTypes);
    insights.push(`The matrix is dominated by ${dominantType[0]} relationships (${dominantType[1]} occurrences)`);
    
    // Symmetry insights
    if (patterns.includes('High degree of symmetry in relationships')) {
        insights.push('The system shows a strong tendency toward balanced, reciprocal relationships');
    } else if (patterns.includes('Strong asymmetry in relationships')) {
        insights.push('The system emphasizes dynamic, transformative relationships');
    }
    
    // Complementary pair insights
    if (statistics.complementaryPairs.length > 0) {
        insights.push('Several trigram pairs form perfect complementary relationships');
    }
    
    // Philosophical balance insights
    const yangRelationships = statistics.relationshipCounts[RELATION_TYPES.GENERATION] + 
                            statistics.relationshipCounts[RELATION_TYPES.CONQUEST];
    const yinRelationships = statistics.relationshipCounts[RELATION_TYPES.SUPPORT] + 
                           statistics.relationshipCounts[RELATION_TYPES.RESONANCE];
    
    if (yangRelationships > yinRelationships * 1.5) {
        insights.push('The system emphasizes dynamic, transformative processes');
    } else if (yinRelationships > yangRelationships * 1.5) {
        insights.push('The system emphasizes harmony and stability');
    } else {
        insights.push('The system maintains a balanced interplay of dynamic and stable forces');
    }
    
    return insights;
}

/**
 * Analyzes a specific hexagram's relationship patterns
 * @param {string} upperTrigram - Upper trigram
 * @param {string} lowerTrigram - Lower trigram
 * @returns {Object} Hexagram pattern analysis
 */
export function analyzeHexagramPatterns(upperTrigram, lowerTrigram) {
    const relationship = getTrigramRelationship(upperTrigram, lowerTrigram);
    const inverseRelationship = getTrigramRelationship(lowerTrigram, upperTrigram);
    
    const patterns = [];
    const insights = [];
    
    // Analyze relationship symmetry
    if (relationship.asymmetric) {
        patterns.push('Asymmetric relationship');
        insights.push('The relationship between these trigrams is dynamic and transformative');
    } else {
        patterns.push('Symmetric relationship');
        insights.push('The relationship between these trigrams is balanced and reciprocal');
    }
    
    // Analyze relationship type
    switch (relationship.type) {
        case RELATION_TYPES.GENERATION:
            patterns.push('Generative relationship');
            insights.push('This hexagram represents growth and emergence');
            break;
        case RELATION_TYPES.CONQUEST:
            patterns.push('Conquest relationship');
            insights.push('This hexagram represents transformation through challenge');
            break;
        case RELATION_TYPES.SUPPORT:
            patterns.push('Supportive relationship');
            insights.push('This hexagram represents harmony and stability');
            break;
        case RELATION_TYPES.OPPOSITION:
            patterns.push('Oppositional relationship');
            insights.push('This hexagram represents creative tension');
            break;
        case RELATION_TYPES.RESONANCE:
            patterns.push('Resonant relationship');
            insights.push('This hexagram represents natural flow and unity');
            break;
        case RELATION_TYPES.TRANSFORMATION:
            patterns.push('Transformative relationship');
            insights.push('This hexagram represents evolutionary change');
            break;
    }
    
    // Analyze philosophical balance
    const yangScore = relationship.type === RELATION_TYPES.GENERATION || 
                     relationship.type === RELATION_TYPES.CONQUEST ? 2 : 1;
    const yinScore = relationship.type === RELATION_TYPES.SUPPORT || 
                    relationship.type === RELATION_TYPES.RESONANCE ? 2 : 1;
    
    if (yangScore > yinScore) {
        patterns.push('Yang-dominant');
        insights.push('The hexagram emphasizes dynamic, expansive qualities');
    } else if (yinScore > yangScore) {
        patterns.push('Yin-dominant');
        insights.push('The hexagram emphasizes receptive, integrative qualities');
    } else {
        patterns.push('Balanced polarity');
        insights.push('The hexagram maintains equilibrium between dynamic and receptive forces');
    }
    
    return {
        patterns,
        insights,
        relationship,
        inverseRelationship
    };
} 