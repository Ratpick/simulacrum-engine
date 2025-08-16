# Binary Yijing Encoding — Principia Paradoxica

**Purpose.** This note defines the exact binary encoding we use across the Paradox Engine, the Story Bible (Notion), and the website. It keeps the narrative gates (hexagram transitions) unambiguous and machine-readable.

---

## 1) Conventions

- **Line numbering**: bottom → top = **1..6**.
- **Bit order**: strings are written bottom → top (index 1 = bottom line).
- **Bits**: `1 = yang (solid)`, `0 = yin (broken)`.
- **Hexagram pattern**: a 6‑bit string, e.g. **11 · Tai** = `111000`.
- **Moving mask**: a 6‑bit string where `1` means “this line changes”, `0` means “stable”. Example: `111001` means lines **1,2,3,6** change.
- **Direction (per line)**:
  - `-1` = **yang → yin** (▼), `+1` = **yin → yang** (▲), `0` = no change.
- **Arrows (display only)**: ▲ = yin→yang, ▼ = yang→yin, — = stable. Use Unicode: ▲ `U+25B2`, ▼ `U+25BC`, — `U+2014`.

### Trigram bits (bottom→top)
| Trigram | Bits | Usual name |
|---|---|---|
| 111 | Qian (Heaven) |
| 110 | Dui (Lake) |
| 101 | Li (Fire) |
| 100 | Zhen (Thunder) |
| 011 | Xun (Wind/Wood) |
| 010 | Kan (Water) |
| 001 | Gen (Mountain) |
| 000 | Kun (Earth) |

*A hexagram is lower trigram (lines 1–3) + upper trigram (lines 4–6). Example: **11 · Tai** has lower `111` (Qian) and upper `000` (Kun) → `111000`.*

---

## 2) Computing outcomes

Given `from_pattern` and `moving_mask`, compute `to_pattern` by flipping the bits where the mask has `1`:

```text
to[i] = from[i]  if mask[i] = 0
to[i] = 1-from[i] if mask[i] = 1
```

From that, derive **direction mask** per line:
- If `from[i]=1` and `to[i]=0` → `-1` (▼).
- If `from[i]=0` and `to[i]=1` → `+1` (▲).
- Else `0` (—).

---

## 3) Canonical examples (used in Principia Paradoxica)

### A) *Great Shattering* — **11 · Tai (Peace)** → **12 · Pi (Standstill)**
- `from_pattern`: `111000`
- `moving_mask`: `111111`
- `to_pattern`: `000111`
- `moving_lines`: 1,2,3,4,5,6
- `dir_mask_numeric`: `[-1,-1,-1,+1,+1,+1]`
- Arrows: `▼ ▼ ▼ ▲ ▲ ▲`

### B) *Fracture of the Axis* — **11 · Tai** → **23 · Bo (Splitting Apart)**
- `from_pattern`: `111000`
- `moving_mask`: `111001`  → lines 1,2,3,6
- `to_pattern`: `000001`
- `dir_mask_numeric`: `[-1,-1,-1,0,0,+1]`
- Arrows: `▼ ▼ ▼ — — ▲`

### C) *Shinar Protocol* — **23 · Bo** → **59 · Huan (Dispersion)**
- `from_pattern`: `000001`
- `moving_mask`: `010010`  → lines 2,5
- `to_pattern`: `010011`
- `dir_mask_numeric`: `[0,+1,0,0,+1,0]`
- Arrows: `— ▲ — — ▲ —`

---

## 4) Data shapes

**CSV (Notion import):**
```csv
from_key,to_key,moving_mask,moving_lines,label,narrative_note
11 · Tai (Peace),12 · Pi (Standstill),111111,"1,2,3,4,5,6",Great Shattering,"Monad splits; Dyaxis/Abraxas polarity revealed."
11 · Tai (Peace),23 · Bo (Splitting Apart),111001,"1,2,3,6",Fracture of the Axis,"Peace ruptures; muse of paradox awakens."
23 · Bo (Splitting Apart),59 · Huan (Dispersion),010010,"2,5",Shinar Protocol,"Lemurian end; 12 tribes + 13th shadow disperse."
```

**JSON (engine/runtime):**
```json
{
  "from_id": 11,
  "to_id": 12,
  "from_pattern": "111000",
  "to_pattern": "000111",
  "moving_mask": "111111",
  "moving_lines": [1,2,3,4,5,6],
  "dir_mask_numeric": [-1,-1,-1,1,1,1]
}
```

---

## 5) Licensing / text sources

We store **facts and encodings** (ids, trigrams, binary, masks) freely. Long translation texts are either public‑domain (e.g., Legge) or kept private and paraphrased for the Story Bible.