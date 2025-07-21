/**
 * @fileoverview Trigram Pattern Visualization
 * Provides visual representations of trigram patterns and relationships
 */

import { TRIGRAM_MATRIX, getTrigramRelationship } from './trigram-matrix.js';
import { RELATION_TYPES } from './trigram-relations.js';
import { analyzeTriadicPatterns, identifyConflictNodes, identifyTransformationCascades } from './trigram-pattern-analyzer.js';

/**
 * @typedef {Object} HeatmapData
 * @property {Array<Array<number>>} values - Matrix of relationship values
 * @property {Array<string>} labels - Trigram labels
 */

/**
 * Creates a heatmap visualization of relationship types
 * @param {HTMLElement} container - Container element
 * @param {string} relationshipType - Type of relationship to visualize
 */
export function createRelationshipHeatmap(container, relationshipType) {
    const trigrams = Object.keys(TRIGRAM_MATRIX);
    const data = generateHeatmapData(relationshipType);
    
    const heatmap = document.createElement('div');
    heatmap.className = 'heatmap-container';
    
    // Create grid
    const grid = document.createElement('div');
    grid.className = 'heatmap-grid';
    
    // Add header row
    const headerRow = document.createElement('div');
    headerRow.className = 'heatmap-row header';
    headerRow.appendChild(createCell('')); // Empty cell for top-left corner
    
    trigrams.forEach(trigram => {
        headerRow.appendChild(createCell(trigram, 'header'));
    });
    
    grid.appendChild(headerRow);
    
    // Add data rows
    trigrams.forEach((trigram1, i) => {
        const row = document.createElement('div');
        row.className = 'heatmap-row';
        row.appendChild(createCell(trigram1, 'header'));
        
        trigrams.forEach((trigram2, j) => {
            const value = data.values[i][j];
            const cell = createCell(value.toFixed(2));
            cell.style.backgroundColor = getHeatmapColor(value);
            
            // Add hover effect
            cell.addEventListener('mouseenter', () => {
                showRelationshipTooltip(cell, trigram1, trigram2, value);
            });
            
            cell.addEventListener('mouseleave', () => {
                hideTooltip();
            });
            
            row.appendChild(cell);
        });
        
        grid.appendChild(row);
    });
    
    heatmap.appendChild(grid);
    container.appendChild(heatmap);
}

/**
 * Shows a tooltip with relationship details
 * @param {HTMLElement} cell - Cell element
 * @param {string} trigram1 - First trigram
 * @param {string} trigram2 - Second trigram
 * @param {number} value - Relationship value
 */
function showRelationshipTooltip(cell, trigram1, trigram2, value) {
    const relationship = getTrigramRelationship(trigram1, trigram2);
    const tooltip = document.createElement('div');
    tooltip.className = 'relationship-tooltip';
    
    tooltip.innerHTML = `
        <div class="tooltip-header">
            <span class="trigram1">${trigram1}</span>
            <span class="relationship-type">${relationship.type}</span>
            <span class="trigram2">${trigram2}</span>
        </div>
        <div class="tooltip-content">
            <div class="value">Strength: ${value.toFixed(2)}</div>
            <div class="interpretation">${relationship.interpretation}</div>
            <div class="metaphors">
                <div class="daoist">${relationship.daoist}</div>
                <div class="amazigh">${relationship.amazigh}</div>
            </div>
        </div>
    `;
    
    // Position tooltip
    const rect = cell.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
    
    document.body.appendChild(tooltip);
}

/**
 * Hides the tooltip
 */
function hideTooltip() {
    const tooltip = document.querySelector('.relationship-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

/**
 * Creates a circular diagram showing Yin-Yang balance flows
 * @param {HTMLElement} container - Container element
 */
export function createYinYangFlowDiagram(container) {
    const canvas = document.createElement('canvas');
    canvas.className = 'yin-yang-diagram';
    canvas.width = 400;
    canvas.height = 400;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const center = { x: canvas.width / 2, y: canvas.height / 2 };
    const radius = Math.min(center.x, center.y) - 20;
    
    // Draw base circle
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#000';
    ctx.stroke();
    
    // Draw Yin-Yang symbol with animation
    drawYinYangSymbol(ctx, center, radius);
    
    // Draw flow arrows with animation
    drawFlowArrows(ctx, center, radius);
    
    // Add interactive elements
    addInteractiveElements(canvas, center, radius);
}

/**
 * Draws the Yin-Yang symbol with animation
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} center - Center coordinates
 * @param {number} radius - Circle radius
 */
function drawYinYangSymbol(ctx, center, radius) {
    // Draw Yin (black) half with pulse animation
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, Math.PI);
    ctx.fillStyle = '#000';
    ctx.fill();
    
    // Draw Yang (white) half with pulse animation
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, Math.PI, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    
    // Draw dots with pulse animation
    ctx.beginPath();
    ctx.arc(center.x - radius/2, center.y, radius/6, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(center.x + radius/2, center.y, radius/6, 0, 2 * Math.PI);
    ctx.fillStyle = '#000';
    ctx.fill();
}

/**
 * Draws flow arrows with animation
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} center - Center coordinates
 * @param {number} radius - Circle radius
 */
function drawFlowArrows(ctx, center, radius) {
    const trigrams = Object.keys(TRIGRAM_MATRIX);
    const angleStep = (2 * Math.PI) / trigrams.length;
    
    trigrams.forEach((trigram, i) => {
        const angle = i * angleStep;
        const x = center.x + radius * Math.cos(angle);
        const y = center.y + radius * Math.sin(angle);
        
        // Draw trigram symbol
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(trigram, x, y);
        
        // Draw flow arrows based on relationships
        trigrams.forEach((other, j) => {
            if (i !== j) {
                const rel = getTrigramRelationship(trigram, other);
                const otherAngle = j * angleStep;
                const otherX = center.x + radius * Math.cos(otherAngle);
                const otherY = center.y + radius * Math.sin(otherAngle);
                
                drawArrow(ctx, x, y, otherX, otherY, rel.type);
            }
        });
    });
}

/**
 * Adds interactive elements to the diagram
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {Object} center - Center coordinates
 * @param {number} radius - Circle radius
 */
function addInteractiveElements(canvas, center, radius) {
    const ctx = canvas.getContext('2d');
    const trigrams = Object.keys(TRIGRAM_MATRIX);
    const angleStep = (2 * Math.PI) / trigrams.length;
    
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left - center.x;
        const y = e.clientY - rect.top - center.y;
        const distance = Math.sqrt(x * x + y * y);
        
        if (distance < radius) {
            const angle = Math.atan2(y, x);
            const index = Math.floor((angle + Math.PI) / angleStep);
            const trigram = trigrams[index];
            
            highlightTrigram(ctx, center, radius, index, trigram);
        }
    });
}

/**
 * Highlights a trigram in the diagram
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} center - Center coordinates
 * @param {number} radius - Circle radius
 * @param {number} index - Trigram index
 * @param {string} trigram - Trigram symbol
 */
function highlightTrigram(ctx, center, radius, index, trigram) {
    const angleStep = (2 * Math.PI) / 8;
    const startAngle = index * angleStep;
    const endAngle = (index + 1) * angleStep;
    
    // Draw highlight arc
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, startAngle, endAngle);
    ctx.strokeStyle = '#ff9800';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Show tooltip
    const x = center.x + radius * Math.cos(startAngle + angleStep/2);
    const y = center.y + radius * Math.sin(startAngle + angleStep/2);
    
    showTrigramTooltip(x, y, trigram);
}

/**
 * Shows a tooltip for a trigram
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {string} trigram - Trigram symbol
 */
function showTrigramTooltip(x, y, trigram) {
    const tooltip = document.createElement('div');
    tooltip.className = 'trigram-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-header">${trigram}</div>
        <div class="tooltip-content">
            <div class="interpretation">${getTrigramInterpretation(trigram)}</div>
            <div class="metaphors">
                <div class="daoist">${getDaoistMetaphor(trigram)}</div>
                <div class="amazigh">${getAmazighMetaphor(trigram)}</div>
            </div>
        </div>
    `;
    
    tooltip.style.top = `${y - tooltip.offsetHeight - 10}px`;
    tooltip.style.left = `${x - tooltip.offsetWidth / 2}px`;
    
    document.body.appendChild(tooltip);
}

/**
 * Gets the interpretation for a trigram
 * @param {string} trigram - Trigram symbol
 * @returns {string} Interpretation
 */
function getTrigramInterpretation(trigram) {
    const interpretations = {
        'QIAN': 'Heaven - Creative Force',
        'DUI': 'Lake - Joy and Pleasure',
        'LI': 'Fire - Clarity and Illumination',
        'ZHEN': 'Thunder - Movement and Action',
        'XUN': 'Wind - Penetration and Gentleness',
        'KAN': 'Water - Danger and Opportunity',
        'GEN': 'Mountain - Stillness and Stability',
        'KUN': 'Earth - Receptivity and Nurturing'
    };
    
    return interpretations[trigram] || '';
}

/**
 * Gets the Daoist metaphor for a trigram
 * @param {string} trigram - Trigram symbol
 * @returns {string} Metaphor
 */
function getDaoistMetaphor(trigram) {
    const metaphors = {
        'QIAN': 'The dragon soars in the heavens',
        'DUI': 'The lake reflects the moon',
        'LI': 'The fire illuminates the path',
        'ZHEN': 'The thunder awakens the earth',
        'XUN': 'The wind carries the seeds',
        'KAN': 'The water flows through the valley',
        'GEN': 'The mountain stands in stillness',
        'KUN': 'The earth nurtures all things'
    };
    
    return metaphors[trigram] || '';
}

/**
 * Gets the Amazigh metaphor for a trigram
 * @param {string} trigram - Trigram symbol
 * @returns {string} Metaphor
 */
function getAmazighMetaphor(trigram) {
    const metaphors = {
        'QIAN': 'The desert wind shapes the dunes',
        'DUI': 'The oasis reflects the stars',
        'LI': 'The sun paints the sand gold',
        'ZHEN': 'The storm awakens the desert',
        'XUN': 'The breeze whispers secrets',
        'KAN': 'The wellspring feeds the valley',
        'GEN': 'The mountain shelters the tribe',
        'KUN': 'The earth holds the ancestors'
    };
    
    return metaphors[trigram] || '';
}

/**
 * Creates a glyph display for complementary pairs
 * @param {HTMLElement} container - Container element
 * @param {string} style - Glyph style ('taoist' or 'tifinagh')
 */
export function createGlyphDisplay(container, style = 'taoist') {
    const trigrams = Object.keys(TRIGRAM_MATRIX);
    const glyphContainer = document.createElement('div');
    glyphContainer.className = 'glyph-container';
    
    // Find complementary pairs
    const pairs = [];
    trigrams.forEach(trigram1 => {
        trigrams.forEach(trigram2 => {
            if (trigram1 < trigram2) { // Avoid duplicates
                const rel1 = getTrigramRelationship(trigram1, trigram2);
                const rel2 = getTrigramRelationship(trigram2, trigram1);
                if (rel1.type === rel2.type && !rel1.asymmetric) {
                    pairs.push([trigram1, trigram2]);
                }
            }
        });
    });
    
    // Create glyph displays for each pair
    pairs.forEach(([t1, t2]) => {
        const pairDisplay = document.createElement('div');
        pairDisplay.className = 'glyph-pair';
        
        const glyph1 = createGlyph(t1, style);
        const glyph2 = createGlyph(t2, style);
        
        // Add hover effect
        pairDisplay.addEventListener('mouseenter', () => {
            showPairTooltip(pairDisplay, t1, t2);
        });
        
        pairDisplay.addEventListener('mouseleave', () => {
            hideTooltip();
        });
        
        pairDisplay.appendChild(glyph1);
        pairDisplay.appendChild(glyph2);
        glyphContainer.appendChild(pairDisplay);
    });
    
    container.appendChild(glyphContainer);
}

/**
 * Shows a tooltip for a complementary pair
 * @param {HTMLElement} pair - Pair element
 * @param {string} t1 - First trigram
 * @param {string} t2 - Second trigram
 */
function showPairTooltip(pair, t1, t2) {
    const relationship = getTrigramRelationship(t1, t2);
    const tooltip = document.createElement('div');
    tooltip.className = 'pair-tooltip';
    
    tooltip.innerHTML = `
        <div class="tooltip-header">
            <span class="trigram1">${t1}</span>
            <span class="relationship-type">${relationship.type}</span>
            <span class="trigram2">${t2}</span>
        </div>
        <div class="tooltip-content">
            <div class="interpretation">${relationship.interpretation}</div>
            <div class="metaphors">
                <div class="daoist">${relationship.daoist}</div>
                <div class="amazigh">${relationship.amazigh}</div>
            </div>
        </div>
    `;
    
    // Position tooltip
    const rect = pair.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
    
    document.body.appendChild(tooltip);
}

/**
 * Creates a glyph for a trigram
 * @param {string} trigram - Trigram symbol
 * @param {string} style - Glyph style
 * @returns {HTMLElement} Glyph element
 */
function createGlyph(trigram, style) {
    const glyph = document.createElement('div');
    glyph.className = `glyph ${style}`;
    
    if (style === 'taoist') {
        glyph.innerHTML = getTaoistGlyph(trigram);
    } else {
        glyph.innerHTML = getTifinaghGlyph(trigram);
    }
    
    return glyph;
}

/**
 * Gets the Taoist glyph for a trigram
 * @param {string} trigram - Trigram symbol
 * @returns {string} SVG glyph
 */
function getTaoistGlyph(trigram) {
    // Simplified Taoist-style glyphs
    const glyphs = {
        'QIAN': '☰',
        'DUI': '☱',
        'LI': '☲',
        'ZHEN': '☳',
        'XUN': '☴',
        'KAN': '☵',
        'GEN': '☶',
        'KUN': '☷'
    };
    
    return glyphs[trigram] || trigram;
}

/**
 * Gets the Tifinagh-style glyph for a trigram
 * @param {string} trigram - Trigram symbol
 * @returns {string} SVG glyph
 */
function getTifinaghGlyph(trigram) {
    // Simplified Tifinagh-style glyphs
    const glyphs = {
        'QIAN': 'ⴰ',
        'DUI': 'ⴱ',
        'LI': 'ⴲ',
        'ZHEN': 'ⴳ',
        'XUN': 'ⴴ',
        'KAN': 'ⴵ',
        'GEN': 'ⴶ',
        'KUN': 'ⴷ'
    };
    
    return glyphs[trigram] || trigram;
}

/**
 * Gets a color for the heatmap based on value
 * @param {number} value - Value between 0 and 1
 * @returns {string} Color in hex format
 */
function getHeatmapColor(value) {
    const colors = [
        '#ffffff', // 0
        '#ffebee', // 0.2
        '#ffcdd2', // 0.4
        '#ef9a9a', // 0.6
        '#e57373', // 0.8
        '#ef5350'  // 1
    ];
    
    const index = Math.floor(value * (colors.length - 1));
    return colors[index];
} 