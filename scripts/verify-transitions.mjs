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
    path.join(root, "data", "build", "hexagrams_transitions.json"),
    path.join(root, "data", "min",  "hex_transitions_full.json"),
    path.join(root, "data", "min",  "hexagrams_transitions.json"),
  ],
  out: {
    mergedHexes: path.join(root, "data", "build", "hexagrams_merged.json"),
    transitions: path.join(root, "data", "build", "hex_transitions_full.json"),
  },
};

async function exists(p) { try { await access(p); return true; } catch { return false; } }
async function ensureDir(dir) { await mkdir(dir, { recursive: true }); }

function normalizeMinHexes(raw) {
  // Accept: array | { hexagrams: [...] } | object map | known schema-like object (fallback)
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.hexagrams)) return raw.hexagrams;
  if (raw && typeof raw === "object") {
    const keys = Object.keys(raw);
    // schema-like? (contains descriptive keys instead of hexes)
    const looksLikeSchema = ["schema_version", "fields", "examples"].some(k => keys.includes(k));
    if (looksLikeSchema) return null; // force fallback
    // try object-map → array
    return Object.values(raw);
  }
  return null;
}

function fallbackHexes() {
  return [
    { id: 11, title: "11 · Tai (Peace)",             pattern: "111000", lower_trigram: "Qian", upper_trigram: "Kun" },
    { id: 12, title: "12 · Pi (Standstill)",          pattern: "000111", lower_trigram: "Kun",  upper_trigram: "Qian" },
    { id: 23, title: "23 · Bo (Splitting Apart)",     pattern: "000001", lower_trigram: "Kun",  upper_trigram: "Gen" },
    { id: 59, title: "59 · Huan (Dispersion)",        pattern: "010011", lower_trigram: "Kan",  upper_trigram: "Dui" }
  ];
}

async function pickTransitions() {
  for (const c of P.transitionCandidates) {
    if (await exists(c)) return c;
  }
  return null;
}

async function main() {
  console.log("→ Building data…");
  await ensureDir(P.buildDir);

  // 1) Build hexagrams_merged.json
  let minRaw;
  try {
    minRaw = JSON.parse(await readFile(P.minHexes, "utf-8"));
  } catch (e) {
    console.warn(`! Could not read ${path.relative(root, P.minHexes)} (${e.message}) — using fallback 4-hex set.`);
    minRaw = null;
  }
  let min = normalizeMinHexes(minRaw);
  let used = "min/hexagrams_min.json";
  if (!min || !Array.isArray(min) || min.length === 0) {
    min = fallbackHexes();
    used = "fallback (4 hexes: 11,12,23,59)";
  }
  await writeFile(P.out.mergedHexes, JSON.stringify(min, null, 2));
  console.log(`✓ wrote ${path.relative(root, P.out.mergedHexes)} (entries: ${min.length}; source: ${used})`);

  // 2) Copy transitions into build (prefer full)
  const transitionsSrc = await pickTransitions();
  if (transitionsSrc) {
    await copyFile(transitionsSrc, P.out.transitions);
    console.log(`✓ copied transitions → ${path.relative(root, P.out.transitions)} (from ${path.relative(root, transitionsSrc)})`);
  } else {
    console.warn("! No transitions JSON found; expected one of:\n  " + P.transitionCandidates.map(p => path.relative(root, p)).join("\n  "));
  }

  // 3) Sync to public
  for (const pub of P.publicDirs) {
    await ensureDir(pub);
    await copyFile(P.out.mergedHexes, path.join(pub, "hexagrams_merged.json"));
    if (await exists(P.out.transitions)) {
      await copyFile(P.out.transitions, path.join(pub, "hex_transitions_full.json"));
    }
    console.log("✓ synced to", path.relative(root, pub));
  }
  console.log("✔ Done.");
}

main().catch((e) => {
  console.error("✖ build:data failed:", e);
  process.exit(1);
});