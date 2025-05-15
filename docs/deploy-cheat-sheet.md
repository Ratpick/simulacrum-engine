# Deploy Cheat Sheet – Simulacrum Frontends

## 🟢 General Principle
Each micro-project (Hexagram Myth, MHCIC Solar First, etc.) lives in its own subfolder and can deploy independently via **GitHub Pages** workflows.

---

## 📦 MHCIC Solar First
- Path: `frontend/mhcic-solar-first/`
- Deployment Workflow: `.github/workflows/deploy-mhcic.yml`
- Live URL: `https://yourusername.github.io/mhcic-solar-first/`

---

## 📦 Hexagram Myth
- Path: `frontend/hexagram-myth/`
- Deployment Workflow: `.github/workflows/deploy-hexagram-myth.yml`
- Live URL: `https://yourusername.github.io/hexagram-myth/`

---

## 🛠 Deploy Workflow Example
Each deploy file uses this structure:

```yaml
name: Deploy XYZ to GitHub Pages

on:
  push:
    branches:
      - main
    paths:
      - 'frontend/xyz/**'
      - '.github/workflows/deploy-xyz.yml'

jobs:
  deploy:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: frontend/xyz

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci || npm install

      - name: Build project (if applicable)
        run: |
          if [ -f package.json ]; then
            npm run build || echo "No build step defined, skipping"
          else
            echo "No package.json, assuming static site"
          fi

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/xyz
```

## 📒 Notes
- For **Lovable exports**, ensure `index.html` is updated before pushing.
- Each deploy action triggers only when relevant folder files change.
- Keep `repo-map.txt` updated to avoid confusion in nested repos.

## 🐛 Common Errors
| Symptom                             | Likely Cause                                      | Fix                                       |
|-------------------------------------|--------------------------------------------------|-------------------------------------------|
| 404 page not updating               | Forgot to push changes to `main`                  | `git add . && git commit && git push main` |
| Deployment error on GitHub Actions  | Missing `.github/workflows/deploy-xyz.yml`        | Add workflow file, push to `main`         |
| Files missing in deployed site      | Wrong `publish_dir` in workflow                   | Correct path to target subfolder          |

## ✅ Best Practice
- **Commit frequently.**
- **Keep workflows simple and modular.**
- **Document everything.**