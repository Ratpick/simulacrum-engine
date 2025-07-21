// Main application initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core components
    const engine = new StoryEngine();
    const storyManager = new StoryManager();
    const iching = new IChingOracle();
    const weiqi = new WeiqiBoard();

    // Set up file handling
    setupFileHandling();

    // Initialize status bar
    updateStatus('Ready');
});

// File handling setup
function setupFileHandling() {
    // Enable drag and drop for story files
    const storyContainer = document.getElementById('story-container');
    
    storyContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        storyContainer.classList.add('drag-over');
    });

    storyContainer.addEventListener('dragleave', () => {
        storyContainer.classList.remove('drag-over');
    });

    storyContainer.addEventListener('drop', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        storyContainer.classList.remove('drag-over');

        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    });
}

// File handling
async function handleFiles(files) {
    for (const file of files) {
        if (file.name.endsWith('.tw') || file.name.endsWith('.twee')) {
            try {
                const content = await file.text();
                StoryManager.importTwineStory(content);
                updateStatus(`Imported: ${file.name}`);
            } catch (error) {
                updateStatus(`Error importing ${file.name}: ${error.message}`, 'error');
            }
        }
    }
}

// Status updates
function updateStatus(message, type = 'info') {
    const statusBar = document.getElementById('status-bar');
    statusBar.textContent = message;
    statusBar.className = `status ${type}`;
} 