/**
 * Core pattern analysis engine for trigram relationships
 */

// Trigram definitions
const TRIGRAMS = {
    '☰': { name: 'Heaven', lines: [1, 1, 1], yinCount: 0, yangCount: 3 },
    '☱': { name: 'Lake', lines: [1, 1, 0], yinCount: 1, yangCount: 2 },
    '☲': { name: 'Fire', lines: [1, 0, 1], yinCount: 1, yangCount: 2 },
    '☳': { name: 'Thunder', lines: [0, 1, 1], yinCount: 1, yangCount: 2 },
    '☴': { name: 'Wind', lines: [1, 0, 0], yinCount: 2, yangCount: 1 },
    '☵': { name: 'Water', lines: [0, 1, 0], yinCount: 2, yangCount: 1 },
    '☶': { name: 'Mountain', lines: [0, 0, 1], yinCount: 2, yangCount: 1 },
    '☷': { name: 'Earth', lines: [0, 0, 0], yinCount: 3, yangCount: 0 }
};

// Relationship types between trigrams
const RELATIONSHIPS = {
    GENERATION: 'generation',
    CONQUEST: 'conquest',
    SUPPORT: 'support',
    OPPOSITION: 'opposition',
    RESONANCE: 'resonance',
    TRANSFORMATION: 'transformation'
};

/**
 * Analyzes a triad of trigrams for patterns
 * @param {string[]} trigrams Array of three trigram symbols
 * @returns {Object} Analysis results
 */
export function analyzeTriadicPattern(trigrams) {
    if (trigrams.length !== 3) {
        throw new Error('Triadic pattern analysis requires exactly three trigrams');
    }

    const analysis = {
        trigrams: trigrams.map(t => TRIGRAMS[t]),
        relationships: [],
        yinYangBalance: calculateYinYangBalance(trigrams),
        patternType: determinePatternType(trigrams)
    };

    // Analyze relationships between each pair
    for (let i = 0; i < 3; i++) {
        const j = (i + 1) % 3;
        analysis.relationships.push(analyzeRelationship(trigrams[i], trigrams[j]));
    }

    return analysis;
}

/**
 * Calculates the yin-yang balance of a set of trigrams
 * @param {string[]} trigrams Array of trigram symbols
 * @returns {Object} Balance metrics
 */
function calculateYinYangBalance(trigrams) {
    const totalYin = trigrams.reduce((sum, t) => sum + TRIGRAMS[t].yinCount, 0);
    const totalYang = trigrams.reduce((sum, t) => sum + TRIGRAMS[t].yangCount, 0);
    
    return {
        yinCount: totalYin,
        yangCount: totalYang,
        balance: totalYin === totalYang ? 'balanced' : 
                 totalYin > totalYang ? 'yin-heavy' : 'yang-heavy'
    };
}

/**
 * Determines the type of pattern formed by three trigrams
 * @param {string[]} trigrams Array of three trigram symbols
 * @returns {string} Pattern type
 */
function determinePatternType(trigrams) {
    const relationships = [];
    for (let i = 0; i < 3; i++) {
        const j = (i + 1) % 3;
        relationships.push(analyzeRelationship(trigrams[i], trigrams[j]));
    }

    // Check for generative cycle
    if (relationships.every(r => r === RELATIONSHIPS.GENERATION)) {
        return 'generative-cycle';
    }

    // Check for destructive cycle
    if (relationships.every(r => r === RELATIONSHIPS.CONQUEST)) {
        return 'destructive-cycle';
    }

    // Check for balanced triad
    if (relationships.every(r => r === RELATIONSHIPS.SUPPORT)) {
        return 'balanced-triad';
    }

    // Check for conflict triad
    if (relationships.every(r => r === RELATIONSHIPS.OPPOSITION)) {
        return 'conflict-triad';
    }

    return 'mixed-pattern';
}

/**
 * Analyzes the relationship between two trigrams
 * @param {string} trigram1 First trigram symbol
 * @param {string} trigram2 Second trigram symbol
 * @returns {string} Relationship type
 */
function analyzeRelationship(trigram1, trigram2) {
    const t1 = TRIGRAMS[trigram1];
    const t2 = TRIGRAMS[trigram2];

    // Count differences in lines
    const differences = t1.lines.reduce((count, line, i) => 
        count + (line !== t2.lines[i] ? 1 : 0), 0);

    // Determine relationship based on differences
    switch (differences) {
        case 0:
            return RELATIONSHIPS.RESONANCE;
        case 1:
            return RELATIONSHIPS.SUPPORT;
        case 2:
            return RELATIONSHIPS.TRANSFORMATION;
        case 3:
            return RELATIONSHIPS.OPPOSITION;
        default:
            return RELATIONSHIPS.TRANSFORMATION;
    }
}

/**
 * Analyzes a hexagram for patterns
 * @param {string} hexagram Hexagram symbol (six trigram lines)
 * @returns {Object} Hexagram analysis
 */
export function analyzeHexagram(hexagram) {
    if (hexagram.length !== 6) {
        throw new Error('Hexagram analysis requires exactly six lines');
    }

    const upperTrigram = hexagram.slice(0, 3);
    const lowerTrigram = hexagram.slice(3);

    return {
        upperTrigram: analyzeTrigram(upperTrigram),
        lowerTrigram: analyzeTrigram(lowerTrigram),
        nuclearTrigram: analyzeNuclearTrigram(hexagram),
        polarity: analyzeHexagramPolarity(hexagram)
    };
}

/**
 * Analyzes a single trigram
 * @param {string} trigram Three-line trigram
 * @returns {Object} Trigram analysis
 */
function analyzeTrigram(trigram) {
    const lines = trigram.split('').map(l => parseInt(l));
    const yinCount = lines.filter(l => l === 0).length;
    const yangCount = lines.filter(l => l === 1).length;

    return {
        lines,
        yinCount,
        yangCount,
        balance: yinCount === yangCount ? 'balanced' : 
                 yinCount > yangCount ? 'yin-heavy' : 'yang-heavy'
    };
}

/**
 * Analyzes the nuclear trigram of a hexagram
 * @param {string} hexagram Hexagram symbol
 * @returns {Object} Nuclear trigram analysis
 */
function analyzeNuclearTrigram(hexagram) {
    const nuclearLines = hexagram.slice(1, 4);
    return analyzeTrigram(nuclearLines);
}

/**
 * Analyzes the polarity of a hexagram
 * @param {string} hexagram Hexagram symbol
 * @returns {Object} Polarity analysis
 */
function analyzeHexagramPolarity(hexagram) {
    const lines = hexagram.split('').map(l => parseInt(l));
    const yinCount = lines.filter(l => l === 0).length;
    const yangCount = lines.filter(l => l === 1).length;

    return {
        yinCount,
        yangCount,
        balance: yinCount === yangCount ? 'balanced' : 
                 yinCount > yangCount ? 'yin-heavy' : 'yang-heavy',
        dominant: yinCount === yangCount ? 'balanced' : 
                  yinCount > yangCount ? 'yin' : 'yang'
    };
} 