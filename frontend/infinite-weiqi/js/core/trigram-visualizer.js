/**
 * @fileoverview Enhanced Trigram Matrix Visualization
 * Provides interactive visual representation of trigram relationships
 */

import { TRIGRAM_MATRIX, getTrigramRelationship } from './trigram-matrix.js';
import { RELATION_TYPES } from './trigram-relations.js';

/**
 * Color mapping for relationship types
 * @type {Object.<string, string>}
 */
const RELATION_COLORS = {
    [RELATION_TYPES.GENERATION]: '#4CAF50',    // Green for generation
    [RELATION_TYPES.CONQUEST]: '#F44336',      // Red for conquest
    [RELATION_TYPES.SUPPORT]: '#2196F3',       // Blue for support
    [RELATION_TYPES.OPPOSITION]: '#9C27B0',    // Purple for opposition
    [RELATION_TYPES.RESONANCE]: '#FFC107',     // Yellow for resonance
    [RELATION_TYPES.TRANSFORMATION]: '#FF9800'  // Orange for transformation
};

/**
 * Creates a detailed tooltip panel
 * @param {Object} relationship - Relationship data
 * @param {string} trigram1 - First trigram
 * @param {string} trigram2 - Second trigram
 * @returns {HTMLElement} Tooltip panel element
 */
function createTooltipPanel(relationship, trigram1, trigram2) {
    const panel = document.createElement('div');
    panel.className = 'tooltip-panel';
    
    // Create sections for different aspects of the relationship
    const sections = [
        {
            title: 'Classical Interpretation',
            content: relationship.context
        },
        {
            title: 'Mythopoetic Meaning',
            content: relationship.symbolic
        },
        {
            title: 'Quantum-Mythopoetic',
            content: relationship.quantum
        }
    ];
    
    // Add relationship type indicator
    const typeIndicator = document.createElement('div');
    typeIndicator.className = 'relationship-type';
    typeIndicator.style.backgroundColor = RELATION_COLORS[relationship.type];
    typeIndicator.textContent = relationship.type;
    panel.appendChild(typeIndicator);
    
    // Add sections
    sections.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'tooltip-section';
        
        const title = document.createElement('h4');
        title.textContent = section.title;
        
        const content = document.createElement('p');
        content.textContent = section.content;
        
        sectionDiv.appendChild(title);
        sectionDiv.appendChild(content);
        panel.appendChild(sectionDiv);
    });
    
    // Add asymmetric indicator if applicable
    if (relationship.asymmetric) {
        const asymmetricNote = document.createElement('div');
        asymmetricNote.className = 'asymmetric-note';
        asymmetricNote.textContent = '↔ Asymmetric Relationship';
        panel.appendChild(asymmetricNote);
    }
    
    return panel;
}

/**
 * Creates a visual representation of the trigram matrix
 * @param {HTMLElement} container - Container element for the matrix
 */
export function createTrigramMatrix(container) {
    // Create table structure
    const table = document.createElement('table');
    table.className = 'trigram-matrix';
    
    // Create header row
    const headerRow = document.createElement('tr');
    headerRow.appendChild(createCell('')); // Empty cell for top-left corner
    
    // Add trigram headers
    Object.keys(TRIGRAM_MATRIX).forEach(trigram => {
        headerRow.appendChild(createCell(trigram, 'header'));
    });
    
    table.appendChild(headerRow);
    
    // Create matrix rows
    Object.entries(TRIGRAM_MATRIX).forEach(([trigram1, relationships]) => {
        const row = document.createElement('tr');
        row.appendChild(createCell(trigram1, 'header')); // Row header
        
        // Add relationship cells
        Object.keys(TRIGRAM_MATRIX).forEach(trigram2 => {
            const relationship = relationships[trigram2];
            const cell = createCell('', 'relationship');
            
            // Set background color based on relationship type
            cell.style.backgroundColor = RELATION_COLORS[relationship.type];
            
            // Add asymmetric indicator if applicable
            if (relationship.asymmetric) {
                cell.classList.add('asymmetric');
            }
            
            // Create tooltip panel
            const tooltipPanel = createTooltipPanel(relationship, trigram1, trigram2);
            
            // Add hover and click interactions
            cell.addEventListener('mouseenter', () => {
                cell.appendChild(tooltipPanel);
                cell.classList.add('active');
            });
            
            cell.addEventListener('mouseleave', () => {
                cell.removeChild(tooltipPanel);
                cell.classList.remove('active');
            });
            
            cell.addEventListener('click', () => {
                // Toggle detailed view
                cell.classList.toggle('expanded');
                if (cell.classList.contains('expanded')) {
                    cell.appendChild(tooltipPanel);
                } else {
                    cell.removeChild(tooltipPanel);
                }
            });
            
            row.appendChild(cell);
        });
        
        table.appendChild(row);
    });
    
    container.appendChild(table);
}

/**
 * Creates a table cell
 * @param {string} content - Cell content
 * @param {string} className - CSS class name
 * @returns {HTMLTableCellElement} Table cell element
 */
function createCell(content, className = '') {
    const cell = document.createElement('td');
    cell.textContent = content;
    if (className) {
        cell.className = className;
    }
    return cell;
}

/**
 * Creates a legend for the relationship types
 * @param {HTMLElement} container - Container element for the legend
 */
export function createLegend(container) {
    const legend = document.createElement('div');
    legend.className = 'trigram-legend';
    
    Object.entries(RELATION_COLORS).forEach(([type, color]) => {
        const item = document.createElement('div');
        item.className = 'legend-item';
        
        const colorBox = document.createElement('span');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = color;
        
        const label = document.createElement('span');
        label.textContent = type;
        
        item.appendChild(colorBox);
        item.appendChild(label);
        legend.appendChild(item);
    });
    
    container.appendChild(legend);
} 