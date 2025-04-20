/**
 * @fileoverview Trigram Relationship Analysis
 * Provides utilities for analyzing relationships between trigrams in hexagrams
 */

import { TRIGRAM_MATRIX, getTrigramRelationship } from './trigram-matrix.js';
import { RELATION_TYPES } from './trigram-relations.js';

/**
 * @typedef {Object} RelationshipWeight
 * @property {string} type - Relationship type
 * @property {number} weight - Weight of the relationship
 * @property {string} context - Context of the relationship
 */

/**
 * @typedef {Object} HexagramAnalysis
 * @property {Object.<string, number>} relationshipCounts - Count of each relationship type
 * @property {Object.<string, number>} relationshipWeights - Weighted sum of relationships
 * @property {Array<RelationshipWeight>} dominantRelationships - Most significant relationships
 * @property {string} narrativeMood - Suggested narrative mood based on relationships
 */

/**
 * Analyzes relationships in a hexagram
 * @param {string} upperTrigram - Upper trigram of the hexagram
 * @param {string} lowerTrigram - Lower trigram of the hexagram
 * @returns {HexagramAnalysis} Analysis of the hexagram's relationships
 */
export function analyzeHexagramRelationships(upperTrigram, lowerTrigram) {
    const relationship = getTrigramRelationship(upperTrigram, lowerTrigram);
    const inverseRelationship = getTrigramRelationship(lowerTrigram, upperTrigram);
    
    // Count relationships
    const relationshipCounts = {
        [RELATION_TYPES.GENERATION]: 0,
        [RELATION_TYPES.CONQUEST]: 0,
        [RELATION_TYPES.SUPPORT]: 0,
        [RELATION_TYPES.OPPOSITION]: 0,
        [RELATION_TYPES.RESONANCE]: 0,
        [RELATION_TYPES.TRANSFORMATION]: 0
    };
    
    // Weight relationships based on type and context
    const relationshipWeights = { ...relationshipCounts };
    const weights = {
        [RELATION_TYPES.GENERATION]: 2,
        [RELATION_TYPES.CONQUEST]: 2,
        [RELATION_TYPES.SUPPORT]: 1.5,
        [RELATION_TYPES.OPPOSITION]: 1.5,
        [RELATION_TYPES.RESONANCE]: 1,
        [RELATION_TYPES.TRANSFORMATION]: 1.5
    };
    
    // Count and weight primary relationship
    relationshipCounts[relationship.type]++;
    relationshipWeights[relationship.type] += weights[relationship.type];
    
    // Count and weight inverse relationship if different
    if (inverseRelationship && inverseRelationship.type !== relationship.type) {
        relationshipCounts[inverseRelationship.type]++;
        relationshipWeights[inverseRelationship.type] += weights[inverseRelationship.type];
    }
    
    // Determine dominant relationships
    const dominantRelationships = Object.entries(relationshipWeights)
        .map(([type, weight]) => ({
            type,
            weight,
            context: relationship.context
        }))
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 2);
    
    // Determine narrative mood
    const narrativeMood = determineNarrativeMood(relationshipWeights, dominantRelationships);
    
    return {
        relationshipCounts,
        relationshipWeights,
        dominantRelationships,
        narrativeMood
    };
}

/**
 * Determines narrative mood based on relationship weights
 * @param {Object.<string, number>} weights - Relationship weights
 * @param {Array<RelationshipWeight>} dominant - Dominant relationships
 * @returns {string} Suggested narrative mood
 */
function determineNarrativeMood(weights, dominant) {
    const { type } = dominant[0];
    
    switch (type) {
        case RELATION_TYPES.GENERATION:
            return 'Emergence and growth';
        case RELATION_TYPES.CONQUEST:
            return 'Conflict and transformation';
        case RELATION_TYPES.SUPPORT:
            return 'Harmony and stability';
        case RELATION_TYPES.OPPOSITION:
            return 'Tension and potential';
        case RELATION_TYPES.RESONANCE:
            return 'Unity and flow';
        case RELATION_TYPES.TRANSFORMATION:
            return 'Change and adaptation';
        default:
            return 'Balance and equilibrium';
    }
}

/**
 * Compares relational polarity across hexagram positions
 * @param {string} upperTrigram - Upper trigram
 * @param {string} lowerTrigram - Lower trigram
 * @returns {Object} Polarity analysis
 */
export function analyzeHexagramPolarity(upperTrigram, lowerTrigram) {
    const relationship = getTrigramRelationship(upperTrigram, lowerTrigram);
    const inverseRelationship = getTrigramRelationship(lowerTrigram, upperTrigram);
    
    // Calculate polarity scores
    const polarityScores = {
        yang: 0,
        yin: 0,
        balance: 0
    };
    
    // Weight relationships based on yin-yang nature
    const weights = {
        [RELATION_TYPES.GENERATION]: { yang: 2, yin: 1 },
        [RELATION_TYPES.CONQUEST]: { yang: 2, yin: 1 },
        [RELATION_TYPES.SUPPORT]: { yang: 1, yin: 1 },
        [RELATION_TYPES.OPPOSITION]: { yang: 1, yin: 1 },
        [RELATION_TYPES.RESONANCE]: { yang: 1, yin: 1 },
        [RELATION_TYPES.TRANSFORMATION]: { yang: 1.5, yin: 1.5 }
    };
    
    // Add primary relationship weights
    polarityScores.yang += weights[relationship.type].yang;
    polarityScores.yin += weights[relationship.type].yin;
    
    // Add inverse relationship weights if different
    if (inverseRelationship && inverseRelationship.type !== relationship.type) {
        polarityScores.yang += weights[inverseRelationship.type].yang;
        polarityScores.yin += weights[inverseRelationship.type].yin;
    }
    
    // Calculate balance score
    polarityScores.balance = Math.abs(polarityScores.yang - polarityScores.yin);
    
    return polarityScores;
}

/**
 * Generates potential narrative arcs based on hexagram relationships
 * @param {string} upperTrigram - Upper trigram
 * @param {string} lowerTrigram - Lower trigram
 * @returns {Array<string>} Potential narrative arcs
 */
export function generateNarrativeArcs(upperTrigram, lowerTrigram) {
    const analysis = analyzeHexagramRelationships(upperTrigram, lowerTrigram);
    const polarity = analyzeHexagramPolarity(upperTrigram, lowerTrigram);
    
    const arcs = [];
    
    // Generate arcs based on dominant relationships
    analysis.dominantRelationships.forEach(({ type, context }) => {
        switch (type) {
            case RELATION_TYPES.GENERATION:
                arcs.push(`Emergence of new possibilities from ${context}`);
                break;
            case RELATION_TYPES.CONQUEST:
                arcs.push(`Transformation through challenge in ${context}`);
                break;
            case RELATION_TYPES.SUPPORT:
                arcs.push(`Harmonious development in ${context}`);
                break;
            case RELATION_TYPES.OPPOSITION:
                arcs.push(`Creative tension in ${context}`);
                break;
            case RELATION_TYPES.RESONANCE:
                arcs.push(`Natural flow in ${context}`);
                break;
            case RELATION_TYPES.TRANSFORMATION:
                arcs.push(`Evolutionary change in ${context}`);
                break;
        }
    });
    
    // Add polarity-based arcs
    if (polarity.balance < 2) {
        arcs.push('Harmonious integration of opposites');
    } else if (polarity.yang > polarity.yin) {
        arcs.push('Dynamic expansion and growth');
    } else {
        arcs.push('Deep integration and receptivity');
    }
    
    return arcs;
} 