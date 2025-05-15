/**
 * Core visualization engine for Infinite Weiqi
 * Handles trigram displays, DAO node placeholders, and symbolic transitions
 */

import { eventSystem, EVENT_TYPES } from '../core/trigram-event-system.js';
import { analyzeHexagram } from '../core/trigram-pattern-engine.js';

// Visualization modes
const VISUALIZATION_MODES = {
    BAGUA: 'BAGUA',
    TIFINAGH: 'TIFINAGH',
    GLYPH: 'GLYPH',
    DAO: 'DAO',
    NARRATIVE: 'NARRATIVE'
};

// Debug mode flag
const DEBUG_MODE = true;

// Enhanced DAO node types with richer governance metaphors
const DAO_NODES = {
    QIAN: {
        trigram: '111',
        name: 'Originating Power',
        role: 'Genesis Logic',
        function: 'Initiates cycles, spawns proposals',
        metaphor: 'Creative spark, celestial initiation',
        color: '#FF6B6B',
        glyph: '☰',
        animation: 'pulse',
        daoic: true,
        governance: {
            type: 'Proposal Creation',
            power: 'Initiative',
            narrative: 'The spark that ignites community action',
            ethical: 'Ensuring proposals align with collective vision'
        }
    },
    KUN: {
        trigram: '000',
        name: 'Commons Field',
        role: 'Resource Layer',
        function: 'Stores resources, receives proposals',
        metaphor: 'Fertile earth, container for growth',
        color: '#4ECDC4',
        glyph: '☷',
        animation: 'ripple',
        daoic: true,
        governance: {
            type: 'Resource Management',
            power: 'Stewardship',
            narrative: 'The foundation that nurtures community growth',
            ethical: 'Fair distribution and sustainable resource use'
        }
    },
    ZHEN: {
        trigram: '100',
        name: 'Proposal Shockwave',
        role: 'Trigger Node',
        function: 'First energetic response',
        metaphor: "Thunder's rumble, system activation",
        color: '#45B7D1',
        glyph: '☳',
        animation: 'shockwave',
        daoic: true,
        governance: {
            type: 'Vote Initiation',
            power: 'Mobilization',
            narrative: 'The catalyst that moves community to action',
            ethical: 'Ensuring inclusive participation'
        }
    },
    XUN: {
        trigram: '110',
        name: 'Diffusion Protocol',
        role: 'Signal Spreader',
        function: 'Spreads proposals or influence across network',
        metaphor: 'Wind dispersing ideas',
        color: '#96CEB4',
        glyph: '☴',
        animation: 'flow',
        daoic: true,
        governance: {
            type: 'Communication',
            power: 'Distribution',
            narrative: 'The voice that carries community messages',
            ethical: 'Transparent and accessible information flow'
        }
    },
    KAN: {
        trigram: '010',
        name: 'Risk Pool',
        role: 'Security Layer',
        function: 'Holds uncertainty and dissent',
        metaphor: 'Deep water, hidden danger',
        color: '#FFEEAD',
        glyph: '☵',
        animation: 'undulate',
        daoic: true,
        governance: {
            type: 'Risk Assessment',
            power: 'Vigilance',
            narrative: 'The guardian that protects community interests',
            ethical: 'Balancing innovation with security'
        }
    },
    LI: {
        trigram: '101',
        name: 'Ethical Illumination',
        role: 'Transparency Engine',
        function: 'Reveals moral clarity, flags paradox',
        metaphor: 'Firelight in ethical darkness',
        color: '#D4A5A5',
        glyph: '☲',
        animation: 'flicker',
        daoic: true,
        governance: {
            type: 'Ethical Oversight',
            power: 'Clarity',
            narrative: 'The light that guides community decisions',
            ethical: 'Maintaining moral compass in governance'
        }
    },
    GEN: {
        trigram: '001',
        name: 'Pause & Veto',
        role: 'Brake Node',
        function: 'Temporarily halts DAO cycles',
        metaphor: 'Still mountain, sacred no',
        color: '#9B59B6',
        glyph: '☶',
        animation: 'solidify',
        daoic: true,
        governance: {
            type: 'Governance Control',
            power: 'Restraint',
            narrative: 'The wisdom to know when to stop',
            ethical: 'Preventing harmful decisions'
        }
    },
    DUI: {
        trigram: '011',
        name: 'Joyful Consensus',
        role: 'Resolution + Reward',
        function: 'Closes loop with affirmation',
        metaphor: 'Lake of reflection, reward, play',
        color: '#3498DB',
        glyph: '☱',
        animation: 'sparkle',
        daoic: true,
        governance: {
            type: 'Consensus Building',
            power: 'Harmony',
            narrative: 'The celebration of community agreement',
            ethical: 'Ensuring decisions benefit all'
        }
    }
};

// Enhanced DAO network schema with governance flows
const DAO_GRAPH_SCHEMA = {
    nodes: Object.values(DAO_NODES).map(n => ({ 
        id: n.trigram, 
        label: n.name,
        governance: n.governance
    })),
    links: [
        { source: '111', target: '000', type: 'proposal', narrative: 'Creative spark meets fertile ground' },
        { source: '000', target: '100', type: 'activation', narrative: 'Resources enable action' },
        { source: '100', target: '110', type: 'diffusion', narrative: 'Action spreads through network' },
        { source: '110', target: '010', type: 'assessment', narrative: 'Ideas face risk evaluation' },
        { source: '010', target: '101', type: 'oversight', narrative: 'Risk meets ethical scrutiny' },
        { source: '101', target: '001', type: 'control', narrative: 'Ethics guide governance' },
        { source: '001', target: '011', type: 'consensus', narrative: 'Governance leads to agreement' },
        { source: '011', target: '111', type: 'renewal', narrative: 'Consensus inspires new creation' }
    ]
};

class TrigramVisualizationEngine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with id '${containerId}' not found`);
            return;
        }
        this.currentMode = VISUALIZATION_MODES.BAGUA;
        this.activeNodes = new Set();
        this.transitions = [];
        this.flowPaths = new Set();
        this.setupEventListeners();
        this.render(); // Initial render
    }

    /**
     * Sets up event listeners for visualization updates
     */
    setupEventListeners() {
        if (DEBUG_MODE) console.log('Setting up event listeners');
        
        eventSystem.addEventListener(EVENT_TYPES.PATTERN_DETECTED, (data) => {
            if (DEBUG_MODE) console.log('Pattern detected:', data);
            this.updatePatternVisualization(data);
        });

        eventSystem.addEventListener(EVENT_TYPES.TRANSITION_STARTED, (data) => {
            if (DEBUG_MODE) console.log('Transition started:', data);
            this.animateTransition(data);
        });

        eventSystem.addEventListener(EVENT_TYPES.RITUAL_STATE_CHANGED, (data) => {
            if (DEBUG_MODE) console.log('Ritual state changed:', data);
            this.updateRitualState(data);
        });
    }

    /**
     * Updates the visualization based on detected patterns
     * @param {Object} patternData Pattern analysis data
     */
    updatePatternVisualization(patternData) {
        // Clear previous active nodes
        this.activeNodes.clear();

        // Update active nodes based on pattern
        patternData.trigrams.forEach(trigram => {
            const node = this.findDAONode(trigram);
            if (node) {
                this.activeNodes.add(node);
            }
        });

        // Render updated visualization
        this.render();
    }

    /**
     * Animates a transition between states
     * @param {Object} transitionData Transition data
     */
    animateTransition(transitionData) {
        const { from, to } = transitionData;
        
        // Create transition animation
        this.transitions.push({
            from: this.findDAONode(from),
            to: this.findDAONode(to),
            timestamp: Date.now()
        });

        // Render transition
        this.render();
    }

    /**
     * Updates visualization based on ritual state
     * @param {Object} stateData State change data
     */
    updateRitualState(stateData) {
        // Update visualization based on ritual state
        this.currentState = stateData.to;
        this.render();
    }

    /**
     * Finds a DAO node by trigram
     * @param {string} trigram Trigram symbol
     * @returns {Object} DAO node data
     */
    findDAONode(trigram) {
        return Object.values(DAO_NODES).find(node => node.trigram === trigram);
    }

    /**
     * Renders the current visualization state
     */
    render() {
        if (DEBUG_MODE) console.log('Starting render in mode:', this.currentMode);
        
        // Clear container
        this.clearVisualization();

        // Create visualization container
        const vizContainer = document.createElement('div');
        vizContainer.className = 'trigram-viz-container';
        
        if (DEBUG_MODE) {
            vizContainer.style.border = '1px solid blue';
        }

        try {
            // Render based on current mode
            switch (this.currentMode) {
                case VISUALIZATION_MODES.BAGUA:
                    if (DEBUG_MODE) console.log('Switching to Bagua mode');
                    this.renderBagua(vizContainer);
                    break;
                case VISUALIZATION_MODES.TIFINAGH:
                    if (DEBUG_MODE) console.log('Switching to Tifinagh mode');
                    this.renderTifinagh(vizContainer);
                    break;
                case VISUALIZATION_MODES.GLYPH:
                    if (DEBUG_MODE) console.log('Switching to Glyph mode');
                    this.renderGlyph(vizContainer);
                    break;
                case VISUALIZATION_MODES.DAO:
                    if (DEBUG_MODE) console.log('Switching to DAO mode');
                    this.renderDAO(vizContainer);
                    break;
                default:
                    console.warn('Unknown visualization mode:', this.currentMode);
            }

            // Add container to DOM
            this.container.appendChild(vizContainer);
            
            if (DEBUG_MODE) console.log('Visualization rendered successfully');
        } catch (error) {
            console.error('Error in render:', error);
            // Add fallback visualization
            const fallback = document.createElement('div');
            fallback.className = 'fallback-viz';
            fallback.textContent = 'Visualization Error';
            this.container.appendChild(fallback);
        }
    }

    /**
     * Renders the Bagua visualization with mythopoetic tooltips
     * @param {HTMLElement} container Container element
     */
    renderBagua(container) {
        if (DEBUG_MODE) console.log('Starting Bagua rendering');
        
        try {
            // Create Bagua circle
            const baguaCircle = document.createElement('div');
            baguaCircle.className = 'bagua-circle';
            
            // Add debug border in debug mode
            if (DEBUG_MODE) {
                baguaCircle.style.border = '2px solid red';
            }
            
            // Create central hexagram placeholder
            const centralHexagram = document.createElement('div');
            centralHexagram.className = 'central-hexagram';
            centralHexagram.textContent = 'Resulting Hexagram';
            baguaCircle.appendChild(centralHexagram);
            
            if (DEBUG_MODE) console.log('Created central hexagram');

            // Create tooltip container (separate layer)
            const tooltipContainer = document.createElement('div');
            tooltipContainer.className = 'tooltip-layer';
            container.appendChild(tooltipContainer);
            
            if (DEBUG_MODE) console.log('Created tooltip container');

            // Define King Wen sequence
            const kingWenSequence = [
                { trigram: '111', name: 'Qian', element: 'Heaven' },
                { trigram: '011', name: 'Dui', element: 'Lake' },
                { trigram: '101', name: 'Li', element: 'Fire' },
                { trigram: '100', name: 'Zhen', element: 'Thunder' },
                { trigram: '110', name: 'Xun', element: 'Wind' },
                { trigram: '010', name: 'Kan', element: 'Water' },
                { trigram: '001', name: 'Gen', element: 'Mountain' },
                { trigram: '000', name: 'Kun', element: 'Earth' }
            ];

            // Add trigrams in King Wen sequence
            kingWenSequence.forEach((seq, index) => {
                if (DEBUG_MODE) console.log(`Creating trigram ${index + 1}:`, seq.name);
                
                const node = DAO_NODES[seq.name];
                if (!node) {
                    console.error(`Node not found for ${seq.name}`);
                    return;
                }
                
                const trigram = document.createElement('div');
                trigram.className = `trigram ${this.activeNodes.has(node) ? 'active' : ''}`;
                trigram.style.backgroundColor = node.color;
                trigram.innerHTML = node.glyph;
                
                // Add label
                const label = document.createElement('div');
                label.className = 'trigram-label';
                label.textContent = `${seq.name} (${seq.element})`;
                trigram.appendChild(label);
                
                // Add basic title for now
                trigram.title = `${node.name}\n${node.role}\n${node.metaphor}`;
                
                baguaCircle.appendChild(trigram);
                
                if (DEBUG_MODE) console.log(`Added trigram ${index + 1} to circle`);
            });

            // Add the circle to the container
            container.appendChild(baguaCircle);
            
            if (DEBUG_MODE) console.log('Added Bagua circle to container');
            
            // Verify DOM structure
            if (DEBUG_MODE) {
                console.log('Container children:', container.children.length);
                console.log('Bagua circle children:', baguaCircle.children.length);
            }
            
        } catch (error) {
            console.error('Error in renderBagua:', error);
            // Add fallback visualization
            const fallback = document.createElement('div');
            fallback.className = 'fallback-viz';
            fallback.textContent = 'Bagua Visualization';
            container.appendChild(fallback);
        }
    }

    /**
     * Renders the Tifinagh visualization
     * @param {HTMLElement} container Container element
     */
    renderTifinagh(container) {
        if (DEBUG_MODE) console.log('Rendering Tifinagh visualization');
        
        const tifinaghContainer = document.createElement('div');
        tifinaghContainer.className = 'tifinagh-container';

        // Create Tifinagh circle
        const tifinaghCircle = document.createElement('div');
        tifinaghCircle.className = 'tifinagh-circle';

        // Add Tifinagh symbols
        Object.values(DAO_NODES).forEach(node => {
            const symbol = document.createElement('div');
            symbol.className = `tifinagh-symbol ${this.activeNodes.has(node) ? 'active' : ''}`;
            symbol.innerHTML = 'ⵣ'; // Placeholder for actual Tifinagh symbols
            symbol.title = `${node.name}\n${node.role}\n${node.metaphor}`;
            tifinaghCircle.appendChild(symbol);
        });

        tifinaghContainer.appendChild(tifinaghCircle);
        container.appendChild(tifinaghContainer);
        
        if (DEBUG_MODE) console.log('Tifinagh visualization rendered');
    }

    /**
     * Renders the Glyph visualization
     * @param {HTMLElement} container Container element
     */
    renderGlyph(container) {
        if (DEBUG_MODE) console.log('Rendering Glyph visualization');
        
        const glyphContainer = document.createElement('div');
        glyphContainer.className = 'glyph-container';

        // Create Glyph mandala
        const glyphMandala = document.createElement('div');
        glyphMandala.className = 'glyph-mandala';

        // Add glyphs
        Object.values(DAO_NODES).forEach(node => {
            const glyph = document.createElement('div');
            glyph.className = `glyph-symbol ${this.activeNodes.has(node) ? 'active' : ''}`;
            glyph.innerHTML = '✶'; // Placeholder for actual glyphs
            glyph.title = `${node.name}\n${node.role}\n${node.metaphor}`;
            glyphMandala.appendChild(glyph);
        });

        glyphContainer.appendChild(glyphMandala);
        container.appendChild(glyphContainer);
        
        if (DEBUG_MODE) console.log('Glyph visualization rendered');
    }

    /**
     * Renders the DAO visualization
     * @param {HTMLElement} container Container element
     */
    renderDAO(container) {
        if (DEBUG_MODE) console.log('Rendering DAO visualization');
        
        // Create DAO network
        const daoNetwork = document.createElement('div');
        daoNetwork.className = 'dao-network';

        // Add DAO nodes
        Object.values(DAO_NODES).forEach(node => {
            const daoNode = document.createElement('div');
            daoNode.className = `dao-node ${this.activeNodes.has(node) ? 'active' : ''}`;
            daoNode.style.backgroundColor = node.color;
            daoNode.innerHTML = `
                <div class="node-glyph">${node.glyph}</div>
                <div class="node-name">${node.name}</div>
                <div class="node-role">${node.role}</div>
            `;
            daoNode.title = `${node.name}\n${node.role}\n${node.metaphor}`;
            daoNetwork.appendChild(daoNode);
        });

        container.appendChild(daoNetwork);
        
        if (DEBUG_MODE) console.log('DAO visualization rendered');
    }

    /**
     * Clears the current visualization
     */
    clearVisualization() {
        if (DEBUG_MODE) console.log('Clearing visualization');
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
    }

    /**
     * Sets the visualization mode
     * @param {string} mode Visualization mode
     */
    setMode(mode) {
        if (DEBUG_MODE) console.log('Setting visualization mode:', mode);
        if (Object.values(VISUALIZATION_MODES).includes(mode)) {
            this.currentMode = mode;
            this.render();
        }
    }
}

// Export visualization engine and constants
export { TrigramVisualizationEngine, VISUALIZATION_MODES, DAO_NODES, DAO_GRAPH_SCHEMA }; 