/**
 * Flow-State Algorithm – minimal stub (TypeScript 5+ / ES 2020)
 *
 *   tsc fsa.ts && node fsa.js
 */

import { randomUUID } from "node:crypto";

// ---------------------------------------------------------------------------
// 1. Event & State interfaces
// ---------------------------------------------------------------------------

export type Domain = "game" | "narrative" | "dao";

export interface PerceptionEvent {
  id: string;           // uuid
  ts: string;           // ISO-8601
  domain: Domain;
  user_hash: string;    // sha256 hex
  payload: Record<string, unknown>;
}

export interface FSAState {
  skill_est: number;
  challenge_est: number;
  c_sms: number;
}

export interface FSAResponse {
  state: FSAState;
  adaptation: string;
}

// ---------------------------------------------------------------------------
// 2. Flow-State Algorithm class
// ---------------------------------------------------------------------------

export class FlowStateAlgorithm {
  private state: FSAState = { skill_est: 0, challenge_est: 0, c_sms: 0 };

  processEvent(ev: PerceptionEvent): FSAResponse {
    this.logEvent(ev);
    this.updateState(ev);
    const adaptation = this.recommend();
    return { state: this.state, adaptation };
  }

  // internals --------------------------------------------------------------

  private logEvent(ev: PerceptionEvent) {
    console.info("EVENT", JSON.stringify(ev));
  }

  private updateState(ev: PerceptionEvent) {
    const deltaSkill = ev.domain === "game" ? 0.05 : 0.02;
    const diffInput =
      typeof ev.payload["difficulty"] === "number"
        ? (ev.payload["difficulty"] as number)
        : 0.5;
    const deltaChal = diffInput * 0.03;

    this.state.skill_est = Math.max(0, this.state.skill_est + deltaSkill);
    this.state.challenge_est = Math.max(
      0,
      this.state.challenge_est + deltaChal
    );

    const diff = this.state.challenge_est - this.state.skill_est;
    this.state.c_sms = Math.max(-1, Math.min(1, diff));
  }

  private recommend(): string {
    if (this.state.c_sms > 0.2) return "↓ decrease difficulty (anxiety zone)";
    if (this.state.c_sms < -0.2) return "↑ increase difficulty (boredom zone)";
    return "✓ keep challenge steady (flow)";
  }
}

// ---------------------------------------------------------------------------
// 3. Demo
// ---------------------------------------------------------------------------

if (require.main === module) {
  const fsa = new FlowStateAlgorithm();

  const ev: PerceptionEvent = {
    id: randomUUID(),
    ts: new Date().toISOString(),
    domain: "game",
    user_hash: "deadbeef".repeat(8),
    payload: { difficulty: 0.8, score: 100 },
  };

  const resp = fsa.processEvent(ev);
  console.log(JSON.stringify(resp, null, 2));
}
