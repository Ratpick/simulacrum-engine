import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const T = path.join(root, "data", "build", "hex_transitions_full.json");
const H = path.join(root, "data", "build", "hexagrams_merged.json");

const trans = JSON.parse(await readFile(T, "utf-8"));
const hexes = JSON.parse(await readFile(H, "utf-8"));
const hexIds = new Set(hexes.map(h => Number(h.id)));

let errs = 0;
function bad(msg, row) { errs++; console.error("•", msg, JSON.stringify(row)); }

for (const r of trans) {
  const from = Number(r.from_id ?? r.fromId);
  const to   = Number(r.to_id ?? r.toId);
  const mask = String(r.moving_mask ?? r.movingMask ?? "");

  if (!hexIds.has(from)) bad("from_id not in hex set", r);
  if (!hexIds.has(to))   bad("to_id not in hex set", r);
  if (!/^[01]{6}$/.test(mask)) bad("moving_mask must be 6 chars of 0/1", r);

  // If moving_lines present, check it matches mask (bottom→top)
  if (r.moving_lines) {
    const expected = [...mask]
      .map((b, i) => (b === "1" ? (i + 1) : null))
      .filter(Boolean)
      .join(",");
    if (expected !== String(r.moving_lines)) bad("moving_lines ≠ mask", r);
  }
}

if (errs) {
  console.error(`✖ verify failed (${errs} issues)`);
  process.exit(1);
} else {
  console.log("✔ transitions look sane");
}