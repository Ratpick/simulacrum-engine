# Flow-State Algorithm (FSA) — Product Requirements

## Purpose & Scope
The FSA is the experiential core of the Simulacrum Engine. It continuously tunes challenge to user skill to evoke flow, drive capability gain and mint Eureka reputation tokens.

## MVP Behaviour
- Log perception events (user actions, moves, timings, etc.).
- Maintain a state vector per user (`skill_est`, `challenge_est`, `c_sms`).
- Recommend adaptation commands to tune challenge/experience.
- Issue flow “rewards” on verified flow peaks (future).

## Data Contract
Event:
    id: uuid
    ts: iso8601
    domain: [game|narrative|dao]
    user_hash: sha256
    payload: {}

State:
    skill_est: float
    challenge_est: float
    c_sms: float

## MVP Interfaces
- Python: Pydantic model/class with update function.
- TypeScript: Interface and function for state update.

## Future Extensibility
- Real-time feedback, oracle/reward minting, and DAO integration.
- All changes must respect this contract for upgradeability.
