// scripts/normalize-min-hexes.mjs
import { readFile, writeFile, copyFile, mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const MIN = path.join(root, "data", "min", "hexagrams_min.json");
const OUT = MIN; // normalize in-place
const BAK = path.join(root, "data", "min", `hexagrams_min.json.bak`);

const FALLBACK_PATTERN = {
  // minimal fallback set for your current arcs
  11: "111000", // Tai
  12: "000111", // Pi
  23: "000001", // Bo
  59: "010011"  // Huan
};

// optional trigram → bits if your source has lower/upper_trigram names
const TRI = {
  Qian: "111", Dui: "110", Li: "101", Zhen: "100",
  Xun: "011", Kan: "010", Gen: "001", Kun: "000"
};

function coerceId(x) {
  const cands = [x?.id, x?.number, x?.no, x?.king_wen, x?.wen];
  for (const c of cands) {
    const n = Number(c);
    if (Number.isInteger(n) && n >= 1 && n <= 64) return n;
  }
  return undefined;
}
function pickName(x) {
  return x?.title || x?.name || x?.hex_name || x?.pinyin || x?.english || "";
}
function pickPattern(x) {
  // already a clean 6-bit string?
  const candidates = [x?.pattern, x?.binary, x?.bits, x?.code, x?.code6];
  for (const c of candidates) {
    if (typeof c === "string" && /^[01]{6}$/.test(c)) return c;
  }
  // build from trigrams if present
  const lower = x?.lower_trigram || x?.lowerTrigram || x?.lower;
  const upper = x?.upper_trigram || x?.upperTrigram || x?.upper;
  if (TRI[lower] && TRI[upper]) return TRI[lower] + TRI[upper];
  return undefined;
}

function normalizeOne(x) {
  const id = coerceId(x);
  if (!id) return null;

  let pattern = pickPattern(x);
  if (!pattern && FALLBACK_PATTERN[id]) pattern = FALLBACK_PATTERN[id];

  let title = pickName(x);
  if (!title) title = `${id}`;

  if (!/^[01]{6}$/.test(pattern || "")) {
    console.warn(`! hex ${id} missing/invalid 6-bit pattern — keeping as empty`);
    pattern = pattern || "";
  }

  const lower = x?.lower_trigram || x?.lowerTrigram || x?.lower;
  const upper = x?.upper_trigram || x?.upperTrigram || x?.upper;

  return {
    id,
    title,
    pattern,                     // 6-bit bottom→top (1=yang, 0=yin)
    lower_trigram: lower || undefined,
    upper_trigram: upper || undefined
  };
}

async function main() {
  await mkdir(path.dirname(MIN), { recursive: true });

  const raw = JSON.parse(await readFile(MIN, "utf8"));
  // accept many shapes
  let arr = Array.isArray(raw)
    ? raw
    : (Array.isArray(raw.hexagrams) ? raw.hexagrams
       : (typeof raw === "object" ? Object.values(raw) : []));

  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("Could not interpret data/min/hexagrams_min.json as a list of hexagrams.");
  }

  // normalize each
  const norm = [];
  for (const x of arr) {
    const n = normalizeOne(x);
    if (n) norm.push(n);
  }
  // sort by id
  norm.sort((a,b) => a.id - b.id);

  // backup existing file, then write normalized
  await copyFile(MIN, BAK).catch(() => {});
  await writeFile(OUT, JSON.stringify(norm, null, 2));
  console.log(`✓ normalized ${norm.length} hexagrams`);
  console.log(`• backup written: ${path.relative(root, BAK)}`);
  console.log(`• output written: ${path.relative(root, OUT)}`);
}

main().catch(e => { console.error("✖ normalize failed:", e.message); process.exit(1); });