// HexagramGateway.js - Main ritual component (React-style, Lovable-ready)
import React, { useState, useRef } from 'react';
import dragonReadings from './dragonReadings';
import FSAManager from './FSAManager';
import AudioController from './AudioController';
import GlitchExile from './GlitchExile';
import OnboardingPortal from './OnboardingPortal';

const archetypeColors = ['#fff', '#5ee7df', '#348aa7', '#f6c90e', '#c44536', '#e98074'];

function HexagramGateway() {
  const [lines, setLines] = useState([false, false, false, false, false, false]);
  const [dwellTimes, setDwellTimes] = useState([0,0,0,0,0,0]);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [fsaScore, setFsaScore] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [exiled, setExiled] = useState(false);
  const audioRef = useRef();

  function handleLineClick(idx) {
    // Timing/flow-state logic handled in FSAManager
    const {success, exile, feedback} = FSAManager({idx, dwellTimes, lines, fsaScore});
    if (success) {
      setLines(lines => lines.map((l, i) => i === idx ? true : l));
      setFsaScore(fsaScore + 1);
      setActiveTooltip(dragonReadings[idx]);
      AudioController(audioRef, fsaScore + 1);
      if (lines.every(Boolean) && fsaScore + 1 === 6) setShowOnboarding(true);
    } else if (exile) {
      setActiveTooltip('Arrogant dragon will have cause to repent.');
      setExiled(true);
      setTimeout(() => GlitchExile(), 3000);
    } else {
      setActiveTooltip(feedback || 'The dragon recoils—try again, with patience...');
    }
  }

  if (exiled) return <GlitchExile />;

  return (
    <div className="hexagram-gateway">
      <AudioController ref={audioRef} />
      <div className="hexagram-lines">
        {lines.map((active, idx) => (
          <div
            key={idx}
            className={`hex-line ${active ? 'active' : ''}`}
            style={{
              background: active ? archetypeColors[idx] : '#eee',
              boxShadow: active ? `0 0 12px ${archetypeColors[idx]}` : 'none'
            }}
            onClick={() => handleLineClick(idx)}
            onMouseEnter={() => setActiveTooltip(dragonReadings[idx])}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            {active ? <b>九</b> : <span>&nbsp;</span>}
          </div>
        ))}
      </div>
      {activeTooltip && <div className="hex-tooltip">{activeTooltip}</div>}
      {showOnboarding && <OnboardingPortal />}
    </div>
  );
}

export default HexagramGateway;
