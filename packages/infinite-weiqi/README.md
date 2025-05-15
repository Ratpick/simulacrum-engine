# Infinite Weiqi - Interactive Narrative Engine

A hybrid experimental web app that combines interactive storytelling with the principles of I Ching (周易) and Weiqi (圍棋) to create a unique, multidimensional narrative experience.

## Concept

This project explores the intersection of:
- Interactive storytelling (inspired by Twine)
- Ancient Chinese divination (I Ching)
- Strategic gameplay (Weiqi/Go)
- Dynamic branching narratives

The narrative path is influenced by both I Ching readings and Weiqi board positions, creating a unique story experience that combines chance, strategy, and player choice.

## Features

- **Story Engine**: Import and play through interactive narratives
- **I Ching Oracle**: Traditional hexagram casting and interpretation
- **Weiqi Board**: Interactive Go board with position tracking
- **Dynamic Branching**: Story paths influenced by I Ching readings and Weiqi positions
- **Local Storage**: Save and resume your progress
- **File Integration**: Import Twine stories (.tw, .twee formats)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/infinite-weiqi.git
   cd infinite-weiqi
   ```

2. Open `index.html` in a modern web browser
   - For local development, use a local server (e.g., `python -m http.server 8000`)
   - CORS restrictions require a server for loading story files

## Development

The project is built with vanilla JavaScript for maximum flexibility and future framework integration. Key components:

- `engine.js`: Core story engine and state management
- `iching.js`: I Ching divination system
- `weiqi.js`: Go board implementation
- `story-manager.js`: Story file parsing and management

## Future Plans

- [ ] Integration with DAO tooling (Tally/Snapshot)
- [ ] Decentralized backend (IPFS/Ceramic)
- [ ] AI integration for probabilistic storytelling
- [ ] Vue/Svelte frontend framework integration
- [ ] WebAssembly optimization for Go game logic
- [ ] Full I Ching interpretation database

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 