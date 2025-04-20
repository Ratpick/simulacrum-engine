/**
 * Narrative Bridge Module
 * Connects I Ching readings with narrative events and story branches
 */

import { RELATION_TYPES, TRIGRAM_POSITIONS } from './trigram-relations.js';

/**
 * @typedef {Object} NarrativeNode
 * @property {string} id - Unique identifier for the node
 * @property {string} type - Type of narrative node
 * @property {Object} content - Content placeholder
 * @property {Array<string>} tags - Metadata tags
 * @property {Object} conditions - Conditions for activation
 */

/**
 * @typedef {Object} NarrativeTransition
 * @property {string} from - Source node ID
 * @property {string} to - Target node ID
 * @property {Object} trigger - Trigger conditions
 * @property {number} weight - Transition probability weight
 */

export class NarrativeBridge {
    constructor() {
        this.nodes = new Map();
        this.transitions = new Map();
        this.activeStates = new Set();
        this.eventHandlers = new Map();
        
        // Initialize event listeners
        this.initializeEventListeners();
    }
    
    /**
     * Set up event listeners for I Ching readings
     */
    initializeEventListeners() {
        document.addEventListener('iching-reading', this.handleReading.bind(this));
        document.addEventListener('narrative-choice', this.handleChoice.bind(this));
        document.addEventListener('state-change', this.handleStateChange.bind(this));
    }
    
    /**
     * Register a narrative node
     * @param {NarrativeNode} node - Node definition
     */
    registerNode(node) {
        this.nodes.set(node.id, {
            ...node,
            transitions: new Set(),
            conditions: this.normalizeConditions(node.conditions)
        });
    }
    
    /**
     * Register a narrative transition
     * @param {NarrativeTransition} transition - Transition definition
     */
    registerTransition(transition) {
        const key = `${transition.from}_${transition.to}`;
        this.transitions.set(key, {
            ...transition,
            trigger: this.normalizeTrigger(transition.trigger)
        });
        
        // Add to source node's transitions
        const sourceNode = this.nodes.get(transition.from);
        if (sourceNode) {
            sourceNode.transitions.add(key);
        }
    }
    
    /**
     * Handle an I Ching reading event
     * @param {CustomEvent} event - Reading event
     */
    handleReading(event) {
        const {
            primary,
            changing,
            nuclear,
            movingLines,
            innerTrigram,
            outerTrigram
        } = event.detail;
        
        // Create reading context
        const context = {
            hexagrams: { primary, changing, nuclear },
            trigrams: { inner: innerTrigram, outer: outerTrigram },
            changes: movingLines,
            timestamp: Date.now()
        };
        
        // Evaluate narrative implications
        this.evaluateReadingContext(context);
    }
    
    /**
     * Evaluate narrative implications of a reading
     * @param {Object} context - Reading context
     */
    evaluateReadingContext(context) {
        // Check active nodes for triggered transitions
        for (const nodeId of this.activeStates) {
            const node = this.nodes.get(nodeId);
            if (!node) continue;
            
            // Evaluate each transition from this node
            for (const transitionKey of node.transitions) {
                const transition = this.transitions.get(transitionKey);
                if (this.evaluateTransitionTrigger(transition, context)) {
                    this.activateTransition(transition, context);
                }
            }
        }
        
        // Check for new nodes that might become active
        for (const [id, node] of this.nodes) {
            if (!this.activeStates.has(id) && 
                this.evaluateNodeConditions(node, context)) {
                this.activateNode(node, context);
            }
        }
    }
    
    /**
     * Normalize node activation conditions
     * @param {Object} conditions - Raw conditions
     * @returns {Object} Normalized conditions
     */
    normalizeConditions(conditions) {
        // Placeholder for condition normalization logic
        return conditions;
    }
    
    /**
     * Normalize transition trigger conditions
     * @param {Object} trigger - Raw trigger conditions
     * @returns {Object} Normalized trigger
     */
    normalizeTrigger(trigger) {
        // Placeholder for trigger normalization logic
        return trigger;
    }
    
    /**
     * Evaluate if a node's conditions are met
     * @param {Object} node - Node to evaluate
     * @param {Object} context - Current context
     * @returns {boolean} Whether conditions are met
     */
    evaluateNodeConditions(node, context) {
        // Placeholder for condition evaluation logic
        return true;
    }
    
    /**
     * Evaluate if a transition should trigger
     * @param {Object} transition - Transition to evaluate
     * @param {Object} context - Current context
     * @returns {boolean} Whether transition should trigger
     */
    evaluateTransitionTrigger(transition, context) {
        // Placeholder for trigger evaluation logic
        return true;
    }
    
    /**
     * Activate a narrative node
     * @param {Object} node - Node to activate
     * @param {Object} context - Activation context
     */
    activateNode(node, context) {
        this.activeStates.add(node.id);
        this.emitEvent('node-activated', { node, context });
    }
    
    /**
     * Activate a narrative transition
     * @param {Object} transition - Transition to activate
     * @param {Object} context - Activation context
     */
    activateTransition(transition, context) {
        // Deactivate source node
        this.activeStates.delete(transition.from);
        
        // Activate target node
        this.activeStates.add(transition.to);
        
        this.emitEvent('transition-activated', { transition, context });
    }
    
    /**
     * Handle a narrative choice event
     * @param {CustomEvent} event - Choice event
     */
    handleChoice(event) {
        const { choice, context } = event.detail;
        this.evaluateChoice(choice, context);
    }
    
    /**
     * Handle a state change event
     * @param {CustomEvent} event - State change event
     */
    handleStateChange(event) {
        const { state, context } = event.detail;
        this.evaluateStateChange(state, context);
    }
    
    /**
     * Emit a narrative event
     * @param {string} type - Event type
     * @param {Object} detail - Event details
     */
    emitEvent(type, detail) {
        const event = new CustomEvent(`narrative-${type}`, { detail });
        document.dispatchEvent(event);
        
        // Call registered handlers
        const handlers = this.eventHandlers.get(type) || [];
        handlers.forEach(handler => handler(detail));
    }
    
    /**
     * Register an event handler
     * @param {string} type - Event type
     * @param {Function} handler - Event handler
     */
    on(type, handler) {
        if (!this.eventHandlers.has(type)) {
            this.eventHandlers.set(type, new Set());
        }
        this.eventHandlers.get(type).add(handler);
    }
    
    /**
     * Remove an event handler
     * @param {string} type - Event type
     * @param {Function} handler - Event handler
     */
    off(type, handler) {
        const handlers = this.eventHandlers.get(type);
        if (handlers) {
            handlers.delete(handler);
        }
    }
} 