# Developer Onboarding Guide: Simulacrum Engine

## Getting Started
1. **Clone the Repo with Submodules:**
    ```bash
    git clone --recurse-submodules https://github.com/YourUsername/simulacrum-engine.git
    cd simulacrum-engine
    ```

2. **Install Dependencies (if applicable):**
    ```bash
    npm install
    ```

3. **Submodule Management:**
    - To update submodules:
        ```bash
        git submodule update --remote --merge
        ```

## Common Workflows
### Pushing Changes
```bash
git add .
git commit -m "type: brief description"
git push origin dev
```

### Deploying Hexagram Myth / MHCIC
- Deployment is automated via GitHub Actions on push to `main`.
- Workflow files are under `.github/workflows/`.

### Adding New Packages
1. Create in `/packages/`.
2. Update `repo-map.txt`:
    ```bash
    tree -L 3 -I '.git|node_modules' > repo-map.txt
    git add repo-map.txt
    git commit -m "Update repo-map with new package"
    git push origin dev
    ```

## Best Practices
- Use feature branches: `feature/your-feature-name`.
- Keep commits atomic.
- Document changes in `docs/` if relevant.
- Maintain up-to-date `repo-map.txt` for clarity.

## Contact
This is a DAO-governed project. Reach out via the Principia Paradoxica Discord or through GitHub Discussions.