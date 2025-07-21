"""
Flow-State Algorithm – minimal stub (Python 3.10+)
--------------------------------------------------
pip install pydantic[dotenv]
"""

from __future__ import annotations
import json
import logging
from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field, field_validator


# ---------------------------------------------------------------------------
# 1. Event & State models
# ---------------------------------------------------------------------------

class PerceptionEvent(BaseModel):
    """Incoming telemetry from front-end domains."""
    id: UUID
    ts: datetime
    domain: str  # "game" | "narrative" | "dao"
    user_hash: str  # SHA-256 hex digest
    payload: dict

    @field_validator("domain")
    @classmethod
    def check_domain(cls, v: str):
        if v not in {"game", "narrative", "dao"}:
            raise ValueError("domain must be game|narrative|dao")
        return v


class FSAState(BaseModel):
    skill_est: float = 0.0
    challenge_est: float = 0.0
    c_sms: float = 0.0  # challenge/skill match score ≈ -1..1


class FSAResponse(BaseModel):
    state: FSAState
    adaptation: str  # free-text recommendation


# ---------------------------------------------------------------------------
# 2. Flow-State Algorithm core
# ---------------------------------------------------------------------------

class FlowStateAlgorithm:
    """Very small, synchronous FSA engine."""

    def __init__(self):
        self._state = FSAState()
        self._logger = logging.getLogger("FSA")
        self._logger.setLevel(logging.INFO)
        if not self._logger.handlers:
            self._logger.addHandler(logging.StreamHandler())

    # public API -------------------------------------------------------------
    def process_event(self, event: PerceptionEvent) -> FSAResponse:
        """Accept one event, update state, return adaptation."""
        self._log_event(event)
        self._update_state(event)
        adaptation = self._recommend()
        return FSAResponse(state=self._state, adaptation=adaptation)

    # internals --------------------------------------------------------------
    def _log_event(self, ev: PerceptionEvent):
        self._logger.info("EVENT %s", ev.model_dump_json())

    def _update_state(self, ev: PerceptionEvent):
        # ---- stub logic ----------------------------------------------------
        delta_skill = 0.05 if ev.domain == "game" else 0.02
        delta_chal = ev.payload.get("difficulty", 0.5) * 0.03
        self._state.skill_est = max(0.0, self._state.skill_est + delta_skill)
        self._state.challenge_est = max(0.0, self._state.challenge_est + delta_chal)
        # c_sms ∈ [-1,1]  where 0 ≈ perfect balance
        diff = self._state.challenge_est - self._state.skill_est
        self._state.c_sms = max(-1.0, min(1.0, diff))

    def _recommend(self) -> str:
        if self._state.c_sms > 0.2:
            return "↓ decrease difficulty (anxiety zone)"
        if self._state.c_sms < -0.2:
            return "↑ increase difficulty (boredom zone)"
        return "✓ keep challenge steady (flow)"


# ---------------------------------------------------------------------------
# 3. Demo usage
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import uuid

    fsa = FlowStateAlgorithm()
    ev = PerceptionEvent(
        id=uuid.uuid4(),
        ts=datetime.utcnow(),
        domain="game",
        user_hash="deadbeef" * 8,
        payload={"difficulty": 0.8, "score": 100},
    )

    resp = fsa.process_event(ev)
    print(json.dumps(resp.model_dump(), indent=2))
