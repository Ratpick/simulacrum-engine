# FSA Documentation & Integration (Lovable)

## Overview
This folder contains documentation and minimal code/data contracts for integrating the Flow-State Algorithm (FSA) into Lovable or any modular stack.

- Use `FSA_PRD.md` for high-level purpose and requirements.
- Use `FSA_MINIMAL.md` for the JSON contract and stub function signatures.
- Use the prompt in `PROMPT_FOR_AI.txt` to request executable code from an advanced code model (o3, GPT-4o, etc).

## Usage in Lovable

- Reference this documentation before designing any FSA-powered component.
- Any front-end event should log a `perception_event` as JSON.
- All challenge/skill/flow logic should maintain the minimal state vector.
- Future code and AI integrations should use the schemas here for validation and testing.

## Files

- `FSA_PRD.md` — Main product requirements (read first)
- `FSA_MINIMAL.md` — Minimal interfaces and stub logic
- `PROMPT_FOR_AI.txt` — Ready-to-use AI prompt for code generation
