import React, { useEffect, useState } from 'react';
import { intro } from './fx';

// hexagon (benzene ring) vertices, flat sides left/right
const R = 44;
const VERTS = Array.from({ length: 6 }, (_, i) => {
  const a = (Math.PI / 3) * i - Math.PI / 2;
  return { x: +(R * Math.cos(a)).toFixed(2), y: +(R * Math.sin(a)).toFixed(2) };
});
const HEX_POINTS = VERTS.map(v => `${v.x},${v.y}`).join(' ');

/* Opening sequence: a glowing hexagon draws itself, then bursts into the molecule background.
   Plays once per session; any click, tap, scroll or key press skips it. */
const Intro: React.FC = () => {
  const [show, setShow] = useState(intro.phase === 'playing');
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    if (!show) return;
    const small = window.innerWidth < 768;
    const tBurst = small ? 1200 : 1400;
    const tDone = small ? 1550 : 1800;
    const timers: number[] = [];
    const events = ['pointerdown', 'wheel', 'keydown', 'touchstart'] as const;
    let burstFired = false;
    let finished = false;

    const doBurst = () => {
      if (burstFired) return;
      burstFired = true;
      setBurst(true);
      window.dispatchEvent(new Event('baseras:burst'));
    };
    const finish = () => {
      if (finished) return;
      finished = true;
      events.forEach(e => window.removeEventListener(e, skip));
      intro.finish();
      timers.push(window.setTimeout(() => setShow(false), 900));
    };
    function skip() { doBurst(); finish(); }

    timers.push(window.setTimeout(doBurst, tBurst), window.setTimeout(finish, tDone));
    events.forEach(e => window.addEventListener(e, skip, { passive: true }));
    return () => {
      timers.forEach(clearTimeout);
      events.forEach(e => window.removeEventListener(e, skip));
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`intro fixed inset-0 z-[70] flex items-center justify-center ${burst ? 'burst' : ''}`} aria-hidden="true">
      <div className="intro-mark flex flex-col items-center">
        <svg viewBox="-60 -60 120 120" className="w-24 h-24 md:w-32 md:h-32 overflow-visible">
          <defs>
            <linearGradient id="introGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1FB6A6" />
              <stop offset="1" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
          <polygon className="intro-hex" points={HEX_POINTS} fill="none" stroke="url(#introGrad)" strokeWidth="3" strokeLinejoin="round" />
          <circle className="intro-circle" r="24" fill="none" stroke="url(#introGrad)" strokeWidth="2" />
          {VERTS.map((v, i) => (
            <circle key={i} className="intro-dot" cx={v.x} cy={v.y} r="4" fill="#38BDF8" style={{ animationDelay: `${350 + i * 110}ms` }} />
          ))}
        </svg>
        <div className="intro-title font-display font-bold text-white text-sm md:text-base mt-6">BASERAS TECH</div>
      </div>
    </div>
  );
};

export default Intro;
