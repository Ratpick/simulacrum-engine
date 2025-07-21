/**
 * @fileoverview Enhanced Trigram Visualization
 * Provides advanced visualization tools with animations and interactive features
 */

import { TRIGRAM_MATRIX, getTrigramRelationship } from './trigram-matrix.js';
import { RELATION_TYPES } from './trigram-relations.js';
import { analyzeParadoxTransition, detectHiddenSymmetry } from './trigram-advanced-patterns.js';

/**
 * Creates an animated phase-shifting visualization between hexagrams
 * @param {HTMLElement} container - Container element
 * @param {string} fromHexagram - Starting hexagram
 * @param {string} toHexagram - Ending hexagram
 * @param {Array<number>} changingLines - Array of changing line indices
 */
export function createPhaseShiftAnimation(container, fromHexagram, toHexagram, changingLines) {
    const canvas = document.createElement('canvas');
    canvas.className = 'phase-shift-canvas';
    canvas.width = 400;
    canvas.height = 400;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let progress = 0;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawHexagram(ctx, fromHexagram, toHexagram, changingLines, progress);
        progress += 0.02;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

/**
 * Creates an overlay visualization for inner/outer/nuclear trigrams
 * @param {HTMLElement} container - Container element
 * @param {string} hexagram - Hexagram symbol
 */
export function createTrigramOverlay(container, hexagram) {
    const overlay = document.createElement('div');
    overlay.className = 'trigram-overlay';
    
    const mainHexagram = document.createElement('div');
    mainHexagram.className = 'main-hexagram';
    mainHexagram.innerHTML = hexagram;
    
    const innerTrigram = document.createElement('div');
    innerTrigram.className = 'inner-trigram';
    innerTrigram.innerHTML = getInnerTrigram(hexagram);
    
    const outerTrigram = document.createElement('div');
    outerTrigram.className = 'outer-trigram';
    outerTrigram.innerHTML = getOuterTrigram(hexagram);
    
    const nuclearTrigram = document.createElement('div');
    nuclearTrigram.className = 'nuclear-trigram';
    nuclearTrigram.innerHTML = getNuclearTrigram(hexagram);
    
    overlay.appendChild(mainHexagram);
    overlay.appendChild(innerTrigram);
    overlay.appendChild(outerTrigram);
    overlay.appendChild(nuclearTrigram);
    
    container.appendChild(overlay);
}

/**
 * Creates an audio-visual feedback system for pattern activation
 * @param {HTMLElement} container - Container element
 * @param {Object} pattern - Pattern object
 */
export function createPatternFeedback(container, pattern) {
    const feedback = document.createElement('div');
    feedback.className = 'pattern-feedback';
    
    // Create visual feedback
    const visual = document.createElement('div');
    visual.className = 'visual-feedback';
    visual.innerHTML = pattern.description;
    
    // Create audio feedback
    const audio = new Audio();
    audio.src = getPatternSound(pattern.type);
    
    feedback.appendChild(visual);
    container.appendChild(feedback);
    
    // Play sound and show visual feedback
    audio.play().then(() => {
        visual.classList.add('active');
        setTimeout(() => {
            visual.classList.remove('active');
        }, 2000);
    });
}

/**
 * Creates a Yin-Yang phase inversion visualization
 * @param {HTMLElement} container - Container element
 * @param {string} initialPolarity - Initial polarity ('yin' or 'yang')
 * @param {string} finalPolarity - Final polarity ('yin' or 'yang')
 */
export function createPolarityInversion(container, initialPolarity, finalPolarity) {
    const canvas = document.createElement('canvas');
    canvas.className = 'polarity-canvas';
    canvas.width = 400;
    canvas.height = 400;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let progress = 0;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPolarityInversion(ctx, initialPolarity, finalPolarity, progress);
        progress += 0.01;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// Helper functions
function drawHexagram(ctx, fromHexagram, toHexagram, changingLines, progress) {
    const center = { x: ctx.canvas.width / 2, y: ctx.canvas.height / 2 };
    const size = Math.min(center.x, center.y) - 20;
    
    // Draw base hexagram
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    
    // Draw lines with animation
    for (let i = 0; i < 6; i++) {
        const y = center.y - size/2 + (i * size/5);
        const fromLine = fromHexagram[i];
        const toLine = toHexagram[i];
        
        if (changingLines.includes(i)) {
            // Animate changing lines
            const currentLine = progress < 0.5 ? fromLine : toLine;
            drawLine(ctx, center.x - size/2, y, center.x + size/2, y, currentLine, progress);
        } else {
            // Draw static lines
            drawLine(ctx, center.x - size/2, y, center.x + size/2, y, fromLine, 0);
        }
    }
}

function drawLine(ctx, x1, y, x2, y, type, progress) {
    if (type === '1') { // Yang line
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
    } else { // Yin line
        const gap = (x2 - x1) / 3;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x1 + gap, y);
        ctx.moveTo(x1 + gap * 2, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
    }
}

function drawPolarityInversion(ctx, initialPolarity, finalPolarity, progress) {
    const center = { x: ctx.canvas.width / 2, y: ctx.canvas.height / 2 };
    const radius = Math.min(center.x, center.y) - 20;
    
    // Draw Yin-Yang symbol with animation
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Animate polarity shift
    const currentPolarity = progress < 0.5 ? initialPolarity : finalPolarity;
    const angle = progress * Math.PI;
    
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, angle);
    ctx.fillStyle = currentPolarity === 'yin' ? '#000' : '#fff';
    ctx.fill();
    
    // Draw dots
    ctx.beginPath();
    ctx.arc(center.x - radius/2, center.y, radius/6, 0, 2 * Math.PI);
    ctx.fillStyle = currentPolarity === 'yin' ? '#fff' : '#000';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(center.x + radius/2, center.y, radius/6, 0, 2 * Math.PI);
    ctx.fillStyle = currentPolarity === 'yin' ? '#000' : '#fff';
    ctx.fill();
}

function getInnerTrigram(hexagram) {
    return hexagram.substring(1, 4);
}

function getOuterTrigram(hexagram) {
    return hexagram.substring(0, 3);
}

function getNuclearTrigram(hexagram) {
    return hexagram.substring(1, 4);
}

function getPatternSound(patternType) {
    const sounds = {
        'generative': 'sounds/generative.mp3',
        'destructive': 'sounds/destructive.mp3',
        'transformative': 'sounds/transformative.mp3',
        'conflict': 'sounds/conflict.mp3',
        'cascade': 'sounds/cascade.mp3'
    };
    
    return sounds[patternType] || 'sounds/default.mp3';
} 