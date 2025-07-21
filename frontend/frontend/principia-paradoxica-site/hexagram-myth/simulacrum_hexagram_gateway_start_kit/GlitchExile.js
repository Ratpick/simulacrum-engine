// GlitchExile.js - Redirects to random glitch 404
import { useEffect } from 'react';
const glitches = [
  '/glitches/forbidden-entry-x_03.html',
  '/glitches/forbidden-entry-x_04.html',
  '/glitches/forbidden-entry-x_05.html',
  '/glitches/forbidden-entry-page-x_06.html',
  '/glitches/forbidden-entry-page-x_07.html'
];

export default function GlitchExile() {
  useEffect(() => {
    const idx = Math.floor(Math.random() * glitches.length);
    window.location.href = glitches[idx];
  }, []);
  return <div className="exile-msg">You are exiled to the glitch realm...</div>;
}
