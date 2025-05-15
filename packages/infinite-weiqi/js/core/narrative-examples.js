/**
 * @fileoverview Example Narrative Nodes and Transitions
 * Demonstrates narrative transitions between hexagrams
 */

import { RELATION_TYPES } from './trigram-relations.js';

/**
 * Example narrative nodes for the Zhen to Jing transition
 */
export const EXAMPLE_NODES = [
    {
        id: 'zhen_thunder',
        type: 'hexagram_state',
        content: {
            title: 'The Arousing Thunder',
            description: 'A moment of awakening and movement. The thunder stirs the earth, bringing both opportunity and challenge.',
            hexagram: 51,
            tags: ['movement', 'awakening', 'initiative']
        },
        conditions: {
            hexagram: 51,
            movingLines: [0, 1, 2, 3, 4, 5] // Any moving line
        }
    },
    {
        id: 'jing_well',
        type: 'hexagram_state',
        content: {
            title: 'The Well',
            description: 'A source of nourishment and wisdom. The well provides sustenance but requires proper maintenance.',
            hexagram: 48,
            tags: ['nourishment', 'wisdom', 'sustainability']
        },
        conditions: {
            hexagram: 48,
            movingLines: [0, 1, 2, 3, 4, 5] // Any moving line
        }
    },
    {
        id: 'transition_state',
        type: 'transformation',
        content: {
            title: 'The Transformation',
            description: 'The thunderous awakening leads to the discovery of a wellspring of wisdom.',
            tags: ['transformation', 'discovery', 'wisdom']
        },
        conditions: {
            fromHexagram: 51,
            toHexagram: 48,
            movingLines: [0, 1, 2, 3, 4, 5] // Any moving line
        }
    }
];

/**
 * Example transitions between nodes
 */
export const EXAMPLE_TRANSITIONS = [
    {
        from: 'zhen_thunder',
        to: 'transition_state',
        trigger: {
            type: 'hexagram_change',
            conditions: {
                fromHexagram: 51,
                toHexagram: 48,
                movingLines: [0, 1, 2, 3, 4, 5] // Any moving line
            }
        },
        weight: 1.0
    },
    {
        from: 'transition_state',
        to: 'jing_well',
        trigger: {
            type: 'state_complete',
            conditions: {
                duration: 1000 // 1 second transition
            }
        },
        weight: 1.0
    }
];

/**
 * Example usage of the narrative bridge
 */
export function setupExampleNarrative(narrativeBridge) {
    // Register nodes
    EXAMPLE_NODES.forEach(node => {
        narrativeBridge.registerNode(node);
    });
    
    // Register transitions
    EXAMPLE_TRANSITIONS.forEach(transition => {
        narrativeBridge.registerTransition(transition);
    });
    
    // Set up event handlers
    narrativeBridge.on('node-activated', (detail) => {
        console.log(`Node activated: ${detail.node.id}`);
    });
    
    narrativeBridge.on('transition-activated', (detail) => {
        console.log(`Transition activated: ${detail.transition.from} -> ${detail.transition.to}`);
    });
}

/**
 * Simulate a reading that triggers the Zhen to Jing transition
 */
export function simulateZhenToJingTransition(narrativeBridge) {
    // Simulate a reading event
    const event = new CustomEvent('iching-reading', {
        detail: {
            primary: {
                number: 51,
                name: 'Zhen',
                description: 'The Arousing Thunder'
            },
            changing: {
                number: 48,
                name: 'Jing',
                description: 'The Well'
            },
            movingLines: [2], // Example: third line moving
            innerTrigram: [1, 1, 1], // Example values
            outerTrigram: [0, 1, 1], // Example values
            trigramRelations: [
                {
                    type: RELATION_TYPES.TRANSFORMATION,
                    position1: 'upper',
                    position2: 'lower'
                }
            ]
        }
    });
    
    document.dispatchEvent(event);
} 