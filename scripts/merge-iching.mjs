// scripts/merge-iching.mjs
import { mkdir, readFile, writeFile, copyFile, access } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const P = {
  minHexes: path.join(root, "data", "min", "hexagrams_min.json"),
  buildDir: path.join(root, "data", "build"),
  publicDirs: [
    path.join(root, "public", "data"),
    path.join(root, "frontend", "paradox-foundry", "public", "data"),
  ],
  transitionCandidates: [
    path.join(root, "data", "build", "hex_transitions_full.json"),
    path.join(root, "data", "min", "hex_transitions_full.json"),
    path.join(root, "data", "build", "hexagrams_transitions.json"),
    path.join(root, "data", "min", "hexagrams_transitions.json"),
  ],
  out: {
    mergedHexes: path.join(root, "data", "build", "hexagrams_merged.json"),
    transitions: path.join(root, "data", "build", "hex_transitions_full.json"),
  },
};

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}
async function ensureDir(dir) { await mkdir(dir, { recursive: true }); }

async function pickTransitions() {
  for (const c of P.transitionCandidates) {
    if (await exists(c)) return c;
  }
  throw new Error(
    "No transitions file found. Expected one of:\n" + P.transitionCandidates.join("\n")
  );
}

async function main() {
  console.log("→ Building data…");

  // Ensure build dir
  await ensureDir(P.buildDir);

  // 1) Merge hexes (for now: copy min to merged; safe place to enrich later)
  if (!(await exists(P.minHexes))) {
    throw new Error(`Missing ${P.minHexes}`);
  }
  const min = JSON.parse(await readFile(P.minHexes, "utf-8"));
  await writeFile(P.out.mergedHexes, JSON.stringify(min, null, 2));
  console.log("✓ wrote", path.relative(root, P.out.mergedHexes));

  // 2) Pick transitions source and copy into build
  const transitionsSrc = await pickTransitions();
  await copyFile(transitionsSrc, P.out.transitions);
  console.log(
    "✓ copied transitions →",
    path.relative(root, P.out.transitions),
    "(from",
    path.relative(root, transitionsSrc) + ")"
  );

  // 3) Copy public artifacts for the site(s)
  for (const pub of P.publicDirs) {
    await ensureDir(pub);
    await copyFile(P.out.transitions, path.join(pub, "hex_transitions_full.json"));
    await copyFile(P.out.mergedHexes, path.join(pub, "hexagrams_merged.json"));
    console.log("✓ synced to", path.relative(root, pub));
  }

  console.log("✔ Done.");
}

main().catch((e) => {
  console.error("✖ build:data failed:", e.message);
  process.exit(1);
});