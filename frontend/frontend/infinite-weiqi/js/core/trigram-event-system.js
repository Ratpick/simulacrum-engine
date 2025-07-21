/**
 * Event trigger system for story transitions and ritual states
 */

import { analyzeHexagram } from './trigram-pattern-engine.js';
import { interpretHexagram } from './trigram-hexagram-engine.js';

// Event types
const EVENT_TYPES = {
    PATTERN_DETECTED: 'pattern-detected',
    TRANSITION_STARTED: 'transition-started',
    TRANSITION_COMPLETED: 'transition-completed',
    RITUAL_STATE_CHANGED: 'ritual-state-changed',
    NARRATIVE_ELEMENT_ACTIVATED: 'narrative-element-activated'
};

// Ritual states
const RITUAL_STATES = {
    PREPARATION: 'preparation',
    INVOCATION: 'invocation',
    TRANSFORMATION: 'transformation',
    INTEGRATION: 'integration',
    COMPLETION: 'completion'
};

class TrigramEventSystem {
    constructor() {
        this.listeners = new Map();
        this.currentState = RITUAL_STATES.PREPARATION;
        this.activePatterns = new Set();
        this.transitionHistory = [];
    }

    /**
     * Registers an event listener
     * @param {string} eventType Type of event to listen for
     * @param {Function} callback Function to call when event occurs
     */
    addEventListener(eventType, callback) {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, new Set());
        }
        this.listeners.get(eventType).add(callback);
    }

    /**
     * Removes an event listener
     * @param {string} eventType Type of event to remove listener for
     * @param {Function} callback Function to remove
     */
    removeEventListener(eventType, callback) {
        if (this.listeners.has(eventType)) {
            this.listeners.get(eventType).delete(callback);
        }
    }

    /**
     * Triggers an event with associated data
     * @param {string} eventType Type of event to trigger
     * @param {Object} data Data associated with the event
     */
    triggerEvent(eventType, data) {
        if (this.listeners.has(eventType)) {
            this.listeners.get(eventType).forEach(callback => {
                callback(data);
            });
        }
    }

    /**
     * Analyzes a pattern and triggers appropriate events
     * @param {string[]} trigrams Array of trigram symbols
     */
    analyzePattern(trigrams) {
        const analysis = analyzeTriadicPattern(trigrams);
        
        // Trigger pattern detection event
        this.triggerEvent(EVENT_TYPES.PATTERN_DETECTED, {
            pattern: analysis.patternType,
            trigrams: analysis.trigrams,
            relationships: analysis.relationships,
            yinYangBalance: analysis.yinYangBalance
        });

        // Update active patterns
        this.activePatterns.add(analysis.patternType);
    }

    /**
     * Initiates a transition between hexagrams
     * @param {string} fromHexagram Starting hexagram
     * @param {string} toHexagram Ending hexagram
     */
    initiateTransition(fromHexagram, toHexagram) {
        const transition = {
            from: fromHexagram,
            to: toHexagram,
            timestamp: Date.now()
        };

        // Trigger transition started event
        this.triggerEvent(EVENT_TYPES.TRANSITION_STARTED, transition);

        // Store transition in history
        this.transitionHistory.push(transition);

        // Analyze the transition
        this.analyzeTransition(transition);
    }

    /**
     * Analyzes a transition between hexagrams
     * @param {Object} transition Transition object
     */
    analyzeTransition(transition) {
        const fromAnalysis = interpretHexagram(transition.from);
        const toAnalysis = interpretHexagram(transition.to);

        // Check for paradox transitions
        const paradoxTransitions = fromAnalysis.paradoxTransitions.filter(pt => 
            pt.description.includes(transition.to));

        if (paradoxTransitions.length > 0) {
            this.triggerEvent(EVENT_TYPES.TRANSITION_COMPLETED, {
                ...transition,
                paradoxTransitions,
                interpretation: paradoxTransitions[0].interpretation,
                metaphors: paradoxTransitions[0].metaphors
            });
        }
    }

    /**
     * Changes the current ritual state
     * @param {string} newState New ritual state
     */
    changeRitualState(newState) {
        if (!Object.values(RITUAL_STATES).includes(newState)) {
            throw new Error(`Invalid ritual state: ${newState}`);
        }

        const oldState = this.currentState;
        this.currentState = newState;

        // Trigger state change event
        this.triggerEvent(EVENT_TYPES.RITUAL_STATE_CHANGED, {
            from: oldState,
            to: newState,
            timestamp: Date.now()
        });
    }

    /**
     * Activates a narrative element
     * @param {string} elementType Type of narrative element
     * @param {Object} elementData Data associated with the element
     */
    activateNarrativeElement(elementType, elementData) {
        this.triggerEvent(EVENT_TYPES.NARRATIVE_ELEMENT_ACTIVATED, {
            type: elementType,
            data: elementData,
            timestamp: Date.now()
        });
    }

    /**
     * Gets the current ritual state
     * @returns {string} Current ritual state
     */
    getCurrentState() {
        return this.currentState;
    }

    /**
     * Gets the active patterns
     * @returns {Set} Set of active patterns
     */
    getActivePatterns() {
        return this.activePatterns;
    }

    /**
     * Gets the transition history
     * @returns {Array} Array of transitions
     */
    getTransitionHistory() {
        return this.transitionHistory;
    }
}

// Export singleton instance
export const eventSystem = new TrigramEventSystem();

// Export constants
export { EVENT_TYPES, RITUAL_STATES }; 