import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const T = path.join(root, "data", "build", "hex_transitions_full.json");
const H = path.join(root, "data", "build", "hexagrams_merged.json");

// helpers
const loadJson = async (p) => JSON.parse(await readFile(p, "utf-8"));
const asArray  = (x) =>
  Array.isArray(x) ? x :
  (x && Array.isArray(x.hexagrams)) ? x.hexagrams :
  (x && typeof x === "object") ? Object.values(x) : [];

const parseLeadingInt = (s) => {
  const m = String(s ?? "").match(/^\s*(\d{1,2})/);
  return m ? Number(m[1]) : undefined;
};

const coerceHexId = (h) => {
  const cands = [h?.id, h?.number, h?.no, h?.king_wen, h?.wen];
  for (const c of cands) {
    const n = Number(c);
    if (Number.isInteger(n) && n >= 1 && n <= 64) return n;
  }
  // try from title/name/key like "11 · Tai (Peace)"
  return parseLeadingInt(h?.title || h?.name || h?.key);
};

const coerceRowId = (num, key) => {
  if (num !== undefined && num !== null) {
    const n = Number(num);
    if (Number.isInteger(n) && n >= 1 && n <= 64) return n;
  }
  return parseLeadingInt(key);
};

// load data
const trans = asArray(await loadJson(T));
const hexesRaw = await loadJson(H);
const HEXES = asArray(hexesRaw);

if (!HEXES.length) {
  throw new Error("No hexagrams found in data/build/hexagrams_merged.json");
}
if (!trans.length) {
  throw new Error("No transitions found in data/build/hex_transitions_full.json");
}

const hexIds = new Set(
  HEXES.map(coerceHexId).filter((n) => Number.isInteger(n))
);

let errs = 0;
const bad = (msg, row) => { errs++; console.error("•", msg, JSON.stringify(row)); };

for (const r of trans) {
  const from = coerceRowId(r.from_id ?? r.fromId, r.from_key ?? r.fromKey);
  const to   = coerceRowId(r.to_id   ?? r.toId,   r.to_key   ?? r.toKey);
  const mask = String(r.moving_mask ?? r.movingMask ?? "");

  if (!hexIds.has(from)) bad("from_id not in hex set", r);
  if (!hexIds.has(to))   bad("to_id not in hex set", r);
  if (!/^[01]{6}$/.test(mask)) bad("moving_mask must be 6 chars of 0/1", r);

  // If moving_lines present, check it matches mask (bottom→top)
  if (r.moving_lines !== undefined && r.moving_lines !== null) {
    const expected = [...mask]
      .map((b, i) => (b === "1" ? (i + 1) : null))
      .filter(Boolean)
      .join(",");
    const got = Array.isArray(r.moving_lines)
      ? r.moving_lines.join(",")
      : String(r.moving_lines);
    if (expected !== got) bad("moving_lines ≠ mask", r);
  }
}

if (errs) {
  console.error(`✖ verify failed (${errs} issues)`);
  process.exit(1);
} else {
  console.log("✔ transitions look sane");
}