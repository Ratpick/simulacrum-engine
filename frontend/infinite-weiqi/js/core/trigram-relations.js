/**
 * @fileoverview Trigram Relationship Schema
 * Defines the structure for analyzing trigram relationships
 * without prescribing specific interpretations
 */

/**
 * @typedef {Object} Trigram
 * @property {string} binary - Binary representation (3 bits)
 * @property {string} symbol - Unicode symbol representation
 * @property {string} element - Associated element name
 */

/**
 * @typedef {Object} TrigramRelation
 * @property {string} type - Type of relationship from RELATION_TYPES
 * @property {string} position1 - Position of first trigram from TRIGRAM_POSITIONS
 * @property {string} position2 - Position of second trigram from TRIGRAM_POSITIONS
 * @property {string} [context] - Optional contextual category
 */

/**
 * @typedef {Object} HexagramData
 * @property {Array<number>} upper - Upper trigram binary values
 * @property {Array<number>} lower - Lower trigram binary values
 * @property {Array<number>} inner - Inner trigram binary values
 * @property {Array<number>} outer - Outer trigram binary values
 * @property {Array<number>} nuclear_upper - Upper nuclear trigram binary values
 * @property {Array<number>} nuclear_lower - Lower nuclear trigram binary values
 */

/**
 * Base trigram definitions with their binary representations and symbols
 * @type {Object.<string, Trigram>}
 */
export const TRIGRAMS = {
    QIAN: { binary: "111", symbol: "☰", element: "heaven" },
    DUI:  { binary: "110", symbol: "☱", element: "lake" },
    LI:   { binary: "101", symbol: "☲", element: "fire" },
    ZHEN: { binary: "011", symbol: "☳", element: "thunder" },
    XUN:  { binary: "100", symbol: "☴", element: "wind" },
    KAN:  { binary: "010", symbol: "☵", element: "water" },
    GEN:  { binary: "001", symbol: "☶", element: "mountain" },
    KUN:  { binary: "000", symbol: "☷", element: "earth" }
};

/**
 * Abstract relationship types for trigram analysis
 * @type {Object.<string, string>}
 */
export const RELATION_TYPES = {
    GENERATION: "generation",      // One trigram generates another
    CONQUEST: "conquest",         // One trigram overcomes another
    SUPPORT: "support",          // Trigrams support each other
    OPPOSITION: "opposition",     // Trigrams oppose each other
    RESONANCE: "resonance",      // Trigrams share qualities
    TRANSFORMATION: "transformation" // One trigram becomes another
};

/**
 * Structural positions of trigrams within a hexagram
 * @type {Object.<string, string>}
 */
export const TRIGRAM_POSITIONS = {
    UPPER: "upper",           // Upper trigram
    LOWER: "lower",           // Lower trigram
    INNER: "inner",           // Inner trigram (lines 2-4)
    OUTER: "outer",           // Outer trigram (lines 1,5,6)
    NUCLEAR_UPPER: "nuclear_upper", // Upper nuclear
    NUCLEAR_LOWER: "nuclear_lower"  // Lower nuclear
};

/**
 * Class for analyzing relationships between trigrams in a hexagram
 */
export class TrigramAnalyzer {
    /**
     * Initialize a new TrigramAnalyzer
     */
    constructor() {
        /** @private */
        this.relations = new Map();
    }

    /**
     * Register a potential relationship between trigram positions
     * @param {TrigramRelation} relation - Relationship definition
     */
    registerRelation(relation) {
        const key = `${relation.position1}_${relation.position2}`;
        if (!this.relations.has(key)) {
            this.relations.set(key, []);
        }
        this.relations.get(key).push(relation);
    }

    /**
     * Analyze relationships between trigrams in a hexagram
     * @param {HexagramData} hexagram - Hexagram data containing trigram positions
     * @returns {Array<TrigramRelation>} Active relationships
     */
    analyzeRelations(hexagram) {
        const activeRelations = [];
        
        // Analyze each registered relationship type
        for (const [key, relations] of this.relations) {
            const [pos1, pos2] = key.split('_');
            const trigram1 = this.getTrigramAtPosition(hexagram, pos1);
            const trigram2 = this.getTrigramAtPosition(hexagram, pos2);
            
            if (trigram1 && trigram2) {
                relations.forEach(relation => {
                    if (this.isRelationActive(trigram1, trigram2, relation)) {
                        activeRelations.push({
                            ...relation,
                            trigram1,
                            trigram2
                        });
                    }
                });
            }
        }
        
        return activeRelations;
    }

    /**
     * Get trigram at a specific position in hexagram
     * @param {HexagramData} hexagram - Hexagram data
     * @param {string} position - Position from TRIGRAM_POSITIONS
     * @returns {Array<number>} Binary values of trigram
     * @private
     */
    getTrigramAtPosition(hexagram, position) {
        return hexagram[position];
    }

    /**
     * Check if a relationship is active between two trigrams
     * @param {Array<number>} trigram1 - First trigram binary values
     * @param {Array<number>} trigram2 - Second trigram binary values
     * @param {TrigramRelation} relation - Relationship to check
     * @returns {boolean} Whether relationship is active
     * @private
     */
    isRelationActive(trigram1, trigram2, relation) {
        // Implementation would check relationship criteria
        // without prescribing specific meanings
        return true; // Placeholder
    }
}

// Export interfaces for type checking
export const interfaces = {
    TrigramRelation: null, // TypeScript would use this for interface
    RelationType: Object.values(RELATION_TYPES),
    Position: Object.values(TRIGRAM_POSITIONS)
}; 