/**
 * @fileoverview I Ching Oracle Implementation
 * Handles hexagram casting, analysis, and display
 */

import { binaryToKingWen, getOppositeHexagram, getComplementaryHexagram } from './king-wen-sequence.js';
import { TrigramAnalyzer, TRIGRAM_POSITIONS } from './trigram-relations.js';

/**
 * @typedef {Object} Line
 * @property {number} value - Binary value (0 or 1)
 * @property {boolean} isChanging - Whether the line is changing
 * @property {number} total - Total value from coin casting
 */

/**
 * @typedef {Object} Hexagram
 * @property {number} number - King Wen sequence number
 * @property {string} name - Hexagram name
 * @property {string} description - Hexagram description
 * @property {string} meaning - Hexagram meaning
 */

/**
 * @typedef {Object} OracleState
 * @property {Hexagram} primaryHexagram - Primary hexagram
 * @property {Hexagram} changingHexagram - Changing hexagram (if any)
 * @property {Hexagram} nuclearHexagram - Nuclear hexagram
 * @property {Hexagram} oppositeHexagram - Opposite hexagram
 * @property {Hexagram} complementaryHexagram - Complementary hexagram
 * @property {Array<number>} movingLines - Indices of moving lines
 * @property {Array<number>} innerTrigram - Inner trigram values
 * @property {Array<number>} outerTrigram - Outer trigram values
 * @property {Array<Line>} lines - All line values
 * @property {Array<Object>} trigramRelations - Active trigram relationships
 */

/**
 * Class for handling I Ching oracle operations
 */
class IChingOracle {
    /**
     * Initialize a new I Ching oracle
     */
    constructor() {
        /** @private */
        this.hexagrams = new Map();
        
        /** @private */
        this.currentState = {
            primaryHexagram: null,
            changingHexagram: null,
            nuclearHexagram: null,
            movingLines: [],
            innerTrigram: null,
            outerTrigram: null,
            oppositeHexagram: null,
            complementaryHexagram: null
        };
        
        /** @private */
        this.element = document.getElementById('iching-oracle');
        
        /** @private */
        this.trigramAnalyzer = new TrigramAnalyzer();
        
        this.initialize();
    }
    
    /**
     * Initialize the oracle
     * @private
     */
    initialize() {
        this.loadHexagramData();
        this.setupInterface();
    }
    
    /**
     * Load hexagram definitions and interpretations
     * @private
     */
    async loadHexagramData() {
        try {
            const response = await fetch('data/hexagrams.json');
            const data = await response.json();
            
            data.forEach(hexagram => {
                this.hexagrams.set(hexagram.number, hexagram);
            });
        } catch (error) {
            console.error('Failed to load hexagram data:', error);
        }
    }
    
    /**
     * Set up the oracle interface
     * @private
     */
    setupInterface() {
        const container = document.createElement('div');
        container.className = 'iching-container';
        
        // Main casting interface
        const castingArea = document.createElement('div');
        castingArea.className = 'casting-area';
        
        const castButton = document.createElement('button');
        castButton.textContent = 'Cast Oracle';
        castButton.addEventListener('click', () => this.performReading());
        
        // Display areas for different aspects
        const primaryDisplay = document.createElement('div');
        primaryDisplay.className = 'hexagram-display primary';
        
        const transformationDisplay = document.createElement('div');
        transformationDisplay.className = 'hexagram-display transformation';
        
        const nuclearDisplay = document.createElement('div');
        nuclearDisplay.className = 'hexagram-display nuclear';
        
        castingArea.appendChild(castButton);
        container.appendChild(castingArea);
        container.appendChild(primaryDisplay);
        container.appendChild(transformationDisplay);
        container.appendChild(nuclearDisplay);
        
        this.element.appendChild(container);
    }
    
    /**
     * Perform a complete I Ching reading
     * @public
     */
    async performReading() {
        // Generate the primary hexagram
        const lines = this.castLines();
        const primaryNumber = binaryToKingWen(lines.map(l => l.value));
        
        // Identify moving lines and generate changing hexagram
        const movingLines = lines.map((l, i) => l.isChanging ? i : null).filter(i => i !== null);
        const changingLines = lines.map(l => l.isChanging ? this.flipLine(l.value) : l.value);
        const changingNumber = movingLines.length > 0 ? 
            binaryToKingWen(changingLines) : null;
        
        // Calculate nuclear hexagram
        const nuclearLines = this.extractNuclearHexagram(lines.map(l => l.value));
        const nuclearNumber = binaryToKingWen(nuclearLines);
        
        // Extract inner and outer trigrams
        const innerTrigram = this.extractInnerTrigram(lines.map(l => l.value));
        const outerTrigram = this.extractOuterTrigram(lines.map(l => l.value));
        
        // Calculate opposite and complementary hexagrams
        const oppositeNumber = getOppositeHexagram(primaryNumber);
        const complementaryNumber = getComplementaryHexagram(primaryNumber);
        
        // Update current state
        this.currentState = {
            primaryHexagram: await this.getHexagram(primaryNumber),
            changingHexagram: changingNumber ? await this.getHexagram(changingNumber) : null,
            nuclearHexagram: await this.getHexagram(nuclearNumber),
            oppositeHexagram: await this.getHexagram(oppositeNumber),
            complementaryHexagram: await this.getHexagram(complementaryNumber),
            movingLines,
            innerTrigram,
            outerTrigram,
            lines
        };
        
        // Analyze trigram relationships
        const trigramRelations = this.trigramAnalyzer.analyzeRelations({
            [TRIGRAM_POSITIONS.UPPER]: this.extractUpperTrigram(lines.map(l => l.value)),
            [TRIGRAM_POSITIONS.LOWER]: this.extractLowerTrigram(lines.map(l => l.value)),
            [TRIGRAM_POSITIONS.INNER]: innerTrigram,
            [TRIGRAM_POSITIONS.OUTER]: outerTrigram,
            [TRIGRAM_POSITIONS.NUCLEAR_UPPER]: nuclearLines.slice(3),
            [TRIGRAM_POSITIONS.NUCLEAR_LOWER]: nuclearLines.slice(0, 3)
        });
        
        this.currentState.trigramRelations = trigramRelations;
        
        this.displayReading();
        this.notifyReading();
    }
    
    /**
     * Cast the six lines of a hexagram
     * @returns {Array<Line>} Array of line values
     * @private
     */
    castLines() {
        const lines = [];
        for (let i = 0; i < 6; i++) {
            const coins = Array(3).fill(0).map(() => Math.random() < 0.5 ? 2 : 3);
            const total = coins.reduce((sum, val) => sum + val, 0);
            
            // 6 = old yin (changing 0), 7 = young yang (stable 1)
            // 8 = young yin (stable 0), 9 = old yang (changing 1)
            const value = total % 2 === 1 ? 1 : 0;
            const isChanging = total === 6 || total === 9;
            
            lines.push({ value, isChanging, total });
        }
        return lines;
    }
    
    /**
     * Flip a line value (0 to 1 or 1 to 0)
     * @param {number} value - Line value to flip
     * @returns {number} Flipped value
     * @private
     */
    flipLine(value) {
        return value === 1 ? 0 : 1;
    }
    
    /**
     * Extract nuclear hexagram from primary hexagram
     * @param {Array<number>} lines - Primary hexagram lines
     * @returns {Array<number>} Nuclear hexagram lines
     * @private
     */
    extractNuclearHexagram(lines) {
        // Lines 2-4 form lower nuclear trigram
        // Lines 3-5 form upper nuclear trigram
        return [
            lines[1], lines[2], lines[3], // Lower nuclear
            lines[2], lines[3], lines[4]  // Upper nuclear
        ];
    }
    
    /**
     * Extract inner trigram from hexagram
     * @param {Array<number>} lines - Hexagram lines
     * @returns {Array<number>} Inner trigram lines
     * @private
     */
    extractInnerTrigram(lines) {
        return [lines[1], lines[2], lines[3]]; // Lines 2-4
    }
    
    /**
     * Extract outer trigram from hexagram
     * @param {Array<number>} lines - Hexagram lines
     * @returns {Array<number>} Outer trigram lines
     * @private
     */
    extractOuterTrigram(lines) {
        return [lines[0], lines[4], lines[5]]; // Lines 1,5,6
    }
    
    /**
     * Extract upper trigram from hexagram
     * @param {Array<number>} lines - Hexagram lines
     * @returns {Array<number>} Upper trigram lines
     * @private
     */
    extractUpperTrigram(lines) {
        return lines.slice(0, 3);
    }
    
    /**
     * Extract lower trigram from hexagram
     * @param {Array<number>} lines - Hexagram lines
     * @returns {Array<number>} Lower trigram lines
     * @private
     */
    extractLowerTrigram(lines) {
        return lines.slice(3);
    }
    
    /**
     * Get hexagram by King Wen sequence number
     * @param {number} number - King Wen sequence number
     * @returns {Promise<Hexagram>} Hexagram data
     * @private
     */
    async getHexagram(number) {
        const hexagram = this.hexagrams.get(number);
        if (!hexagram) {
            console.warn(`Hexagram ${number} not found`);
            return null;
        }
        return hexagram;
    }
    
    /**
     * Display the current reading
     * @private
     */
    displayReading() {
        const primary = this.element.querySelector('.hexagram-display.primary');
        const transformation = this.element.querySelector('.hexagram-display.transformation');
        const nuclear = this.element.querySelector('.hexagram-display.nuclear');
        
        // Clear previous displays
        primary.innerHTML = '';
        transformation.innerHTML = '';
        nuclear.innerHTML = '';
        
        // Display primary hexagram
        if (this.currentState.primaryHexagram) {
            primary.appendChild(this.createHexagramDisplay(
                this.currentState.primaryHexagram,
                this.currentState.lines,
                'Primary Hexagram',
                {
                    opposite: this.currentState.oppositeHexagram,
                    complementary: this.currentState.complementaryHexagram
                }
            ));
        }
        
        // Display changing hexagram if there are moving lines
        if (this.currentState.changingHexagram) {
            transformation.appendChild(this.createHexagramDisplay(
                this.currentState.changingHexagram,
                this.currentState.lines.map(l => ({ ...l, value: l.isChanging ? this.flipLine(l.value) : l.value })),
                'Transformation'
            ));
        }
        
        // Display nuclear hexagram
        if (this.currentState.nuclearHexagram) {
            nuclear.appendChild(this.createHexagramDisplay(
                this.currentState.nuclearHexagram,
                this.extractNuclearHexagram(this.currentState.lines.map(l => l.value))
                    .map(v => ({ value: v, isChanging: false })),
                'Nuclear Essence'
            ));
        }
    }
    
    /**
     * Create display element for a hexagram
     * @param {Hexagram} hexagram - Hexagram data
     * @param {Array<Line>} lines - Line values
     * @param {string} title - Display title
     * @param {Object} related - Related hexagrams
     * @returns {HTMLElement} Display element
     * @private
     */
    createHexagramDisplay(hexagram, lines, title, related = {}) {
        const container = document.createElement('div');
        container.className = 'hexagram-content';
        
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        
        const linesContainer = document.createElement('div');
        linesContainer.className = 'hexagram-lines';
        
        lines.forEach(line => {
            const lineElement = document.createElement('div');
            lineElement.className = `line ${line.value === 1 ? 'yang' : 'yin'}`;
            if (line.isChanging) lineElement.classList.add('changing');
            linesContainer.appendChild(lineElement);
        });
        
        const interpretation = document.createElement('div');
        interpretation.className = 'interpretation';
        
        let relatedInfo = '';
        if (related.opposite) {
            relatedInfo += `<p class="related">Opposite: ${related.opposite.name}</p>`;
        }
        if (related.complementary) {
            relatedInfo += `<p class="related">Complementary: ${related.complementary.name}</p>`;
        }
        
        interpretation.innerHTML = `
            <h4>${hexagram.name}</h4>
            <p>${hexagram.description || hexagram.meaning}</p>
            ${relatedInfo}
        `;
        
        container.appendChild(titleElement);
        container.appendChild(linesContainer);
        container.appendChild(interpretation);
        
        return container;
    }
    
    /**
     * Notify listeners of new reading
     * @private
     */
    notifyReading() {
        const event = new CustomEvent('iching-reading', {
            detail: {
                primary: this.currentState.primaryHexagram,
                changing: this.currentState.changingHexagram,
                nuclear: this.currentState.nuclearHexagram,
                opposite: this.currentState.oppositeHexagram,
                complementary: this.currentState.complementaryHexagram,
                movingLines: this.currentState.movingLines,
                innerTrigram: this.currentState.innerTrigram,
                outerTrigram: this.currentState.outerTrigram,
                trigramRelations: this.currentState.trigramRelations
            }
        });
        
        this.element.dispatchEvent(event);
    }
} 