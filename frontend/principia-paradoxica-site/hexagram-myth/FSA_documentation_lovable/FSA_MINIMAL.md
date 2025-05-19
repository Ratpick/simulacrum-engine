# Minimal FSA Data Contract & Interfaces

## Event (JSON)
{
  "id": "uuid",
  "ts": "iso8601",
  "domain": "game | narrative | dao",
  "user_hash": "sha256",
  "payload": {}
}

## State Vector (JSON)
{
  "skill_est": 0.0,
  "challenge_est": 0.0,
  "c_sms": 0.0
}

## TypeScript Interface
export interface PerceptionEvent {
  id: string;
  ts: string;
  domain: 'game' | 'narrative' | 'dao';
  user_hash: string;
  payload: Record<string, any>;
}
export interface FSAStateVector {
  skill_est: number;
  challenge_est: number;
  c_sms: number;
}
export function updateFSAState(state: FSAStateVector, event: PerceptionEvent): FSAStateVector;

## Python Dataclass (Stub)
from dataclasses import dataclass
from typing import Dict
from datetime import datetime

@dataclass
class PerceptionEvent:
    id: str
    ts: datetime
    domain: str
    user_hash: str
    payload: Dict

@dataclass
class FSAStateVector:
    skill_est: float
    challenge_est: float
    c_sms: float

def update_fsa_state(state: FSAStateVector, event: PerceptionEvent) -> FSAStateVector:
    # Implement logic...
    return state
