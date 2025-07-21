class StoryEngine {
    constructor() {
        this.currentState = {
            storyNode: null,
            ichingReading: null,
            weiqiPosition: null
        };
        
        this.history = [];
        this.branches = new Map();
        
        // Event system for component communication
        this.events = new EventTarget();
        
        this.initialize();
    }
    
    initialize() {
        // Set up event listeners for component interaction
        this.setupEventListeners();
        
        // Initialize local storage handling
        this.loadState();
    }
    
    setupEventListeners() {
        // Listen for I Ching readings
        document.getElementById('iching-oracle').addEventListener('reading', (e) => {
            this.handleIChingReading(e.detail);
        });
        
        // Listen for Weiqi moves
        document.getElementById('weiqi-board').addEventListener('move', (e) => {
            this.handleWeiqiMove(e.detail);
        });
    }
    
    handleIChingReading(reading) {
        this.currentState.ichingReading = reading;
        this.determineStoryBranch();
        this.saveState();
    }
    
    handleWeiqiMove(position) {
        this.currentState.weiqiPosition = position;
        this.updateGameState();
        this.saveState();
    }
    
    determineStoryBranch() {
        // Combine I Ching reading with current game state to determine story direction
        const branchKey = this.calculateBranchKey();
        const nextNode = this.branches.get(branchKey) || this.getDefaultBranch();
        
        this.navigateToNode(nextNode);
    }
    
    calculateBranchKey() {
        // Create a unique key based on current state
        return `${this.currentState.ichingReading}_${this.currentState.weiqiPosition}`;
    }
    
    navigateToNode(node) {
        this.history.push(this.currentState.storyNode);
        this.currentState.storyNode = node;
        
        // Dispatch event for UI update
        this.events.dispatchEvent(new CustomEvent('storyUpdate', {
            detail: { node: node }
        }));
    }
    
    saveState() {
        try {
            localStorage.setItem('gameState', JSON.stringify(this.currentState));
        } catch (error) {
            console.error('Failed to save game state:', error);
        }
    }
    
    loadState() {
        try {
            const savedState = localStorage.getItem('gameState');
            if (savedState) {
                this.currentState = JSON.parse(savedState);
                this.navigateToNode(this.currentState.storyNode);
            }
        } catch (error) {
            console.error('Failed to load game state:', error);
        }
    }
    
    getDefaultBranch() {
        // Return a default story node when no specific branch is found
        return {
            id: 'default',
            content: 'Continue your journey...',
            choices: []
        };
    }
} 