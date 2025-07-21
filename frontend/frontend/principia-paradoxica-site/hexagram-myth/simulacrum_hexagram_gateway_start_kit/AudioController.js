// AudioController.js - Handles chant audio, volume
import React, { forwardRef, useEffect } from 'react';

const chantSrc = '/assets/audio/chant-loop.mp3';

const AudioController = forwardRef(({ volume = 0.1 }, ref) => {
  useEffect(() => {
    if (ref.current) ref.current.volume = volume;
  }, [volume, ref]);
  return (
    <audio ref={ref} src={chantSrc} loop autoPlay muted />
  );
});

export default AudioController;
