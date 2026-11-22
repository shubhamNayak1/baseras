import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Opening intro state ----------
   The intro plays once per browser session, only on the plain home URL, and never with reduced motion.
   Everything that animates on load waits for intro.phase === 'done'. */
const INTRO_KEY = 'bt-intro-seen';
const shouldPlayIntro = () => {
  if (typeof window === 'undefined' || prefersReducedMotion()) return false;
  const route = window.location.hash.replace(/^#/, '');
  if (route && route !== '/') return false;
  try { if (sessionStorage.getItem(INTRO_KEY)) return false; } catch { /* storage blocked: still play */ }
  return true;
};
let introPhase: 'playing' | 'done' = shouldPlayIntro() ? 'playing' : 'done';
const introListeners = new Set<() => void>();
export const intro = {
  get phase() { return introPhase; },
  finish() {
    if (introPhase === 'done') return;
    introPhase = 'done';
    try { sessionStorage.setItem(INTRO_KEY, '1'); } catch { /* ignore */ }
    introListeners.forEach(l => l());
  },
  subscribe(l: () => void) { introListeners.add(l); return () => { introListeners.delete(l); }; },
};
export const useIntroDone = () => useSyncExternalStore(intro.subscribe, () => intro.phase === 'done');

/* Smooth-scrolls to a section on the single page, leaving room for the fixed navbar. */
export const scrollToSection = (id: string, smooth = true) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = id === 'top' ? 0 : el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto' });
};

/* Fades + slides children in the first time they scroll into view (after the opening intro). */
export const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string; keepDelay?: boolean }> = ({ children, delay = 0, className = '', keepDelay = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const introDone = useIntroDone();
  // on phones/tablets cards stack in one column, so skip the stagger and start the fade before they scroll in
  const [small] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024);
  useEffect(() => {
    const el = ref.current;
    if (!el || !introDone) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('is-visible');
        io.disconnect();
      }
    }, small ? { threshold: 0, rootMargin: '0px 0px 15% 0px' } : { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [small, introDone]);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${small && !keepDelay ? 0 : delay}ms` }}>
      {children}
    </div>
  );
};

/* Text that "decodes" from random characters into the real words, left to right. */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@$';
const scramble = (text: string, revealed: number) =>
  text.split('').map((c, i) => (i < revealed || c === ' ' || c === '.') ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join('');

export const ScrambleText: React.FC<{ text: string; start: boolean; delay?: number; className?: string }> = ({ text, start, delay = 0, className = '' }) => {
  const [out, setOut] = useState(() => (prefersReducedMotion() ? text : scramble(text, 0)));
  useEffect(() => {
    if (prefersReducedMotion()) { setOut(text); return; }
    if (!start) return;
    let raf = 0, lastTick = -1;
    const t0 = performance.now() + delay, dur = 1400;
    const tick = (now: number) => {
      const p = (now - t0) / dur;
      if (p >= 1) { setOut(text); return; }
      const step = Math.floor(now / 45); // change the random letters ~22 times a second
      if (step !== lastTick) { lastTick = step; setOut(scramble(text, Math.max(0, Math.floor(p * text.length)))); }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, text, delay]);
  return (
    <span className="relative inline-block">
      {/* the real text reserves the space so nothing jumps while letters change */}
      <span className="invisible">{text}</span>
      {/* styling (e.g. the gradient) goes on the visible layer: background-clip text doesn't reach positioned children */}
      <span className={`absolute inset-0 ${className}`} aria-hidden="true">{out}</span>
    </span>
  );
};

/* Glass card whose glow and edge highlight follow the mouse. */
export const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <div onMouseMove={onMove} className={`glass spotlight ${className}`}>
      {children}
    </div>
  );
};

/* Drifting molecule-style network drawn on a canvas; lines reach toward the cursor. */
export const MoleculeField: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, raf = 0, running = true;
    const mouse = { x: -9999, y: -9999 };
    // ring: 0 = plain atom, 1 = benzene-style ring, 2 = fused double ring
    type Node = { x: number; y: number; vx: number; vy: number; r: number; ring: 0 | 1 | 2; angle: number; spin: number };
    let nodes: Node[] = [];
    let link = 130;
    // burst: -1 = waiting behind the intro (all molecules gathered in the centre), number = start time, null = normal
    let burstStart: number | null = intro.phase === 'playing' ? -1 : null;
    const onBurst = () => { if (burstStart === -1) burstStart = performance.now(); };
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const makeNode = (): Node => {
      const roll = Math.random();
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 1,
        ring: roll < 0.06 ? 2 : roll < 0.2 ? 1 : 0,
        angle: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.004,
      };
    };

    const resize = () => {
      const nw = canvas.clientWidth, nh = canvas.clientHeight;
      if (!nw || !nh || (nw === w && nh === h)) return;
      const small = nw < 1024;
      // lighter rendering on phones/tablets
      const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
      canvas.width = nw * dpr;
      canvas.height = nh * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // keep the existing molecules and stretch their positions instead of scattering new ones
      if (w && h) {
        for (const n of nodes) { n.x *= nw / w; n.y *= nh / h; }
      }
      w = nw; h = nh;
      link = small ? 110 : 130;
      const count = Math.round(Math.min(small ? 60 : 130, (w * h) / (small ? 9000 : 10000)));
      while (nodes.length < count) nodes.push(makeNode());
      if (nodes.length > count) nodes.length = count;
    };

    const hexagon = (x: number, y: number, size: number, rot: number, inner: boolean) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i + rot;
        const px = x + size * Math.cos(a), py = y + size * Math.sin(a);
        i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      if (inner) {
        // aromatic circle inside the ring
        ctx.beginPath(); ctx.arc(x, y, size * 0.55, 0, Math.PI * 2); ctx.stroke();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // during the burst, molecules fly out from the centre to their places
      let k = 1;
      if (burstStart === -1) k = 0;
      else if (burstStart !== null) {
        const t = (performance.now() - burstStart) / 1600;
        if (t >= 1) burstStart = null; else k = easeOut(t);
      }
      const cx = w / 2, cy = h / 2;
      const P = nodes.map(n => ({ x: cx + (n.x - cx) * k, y: cy + (n.y - cy) * k }));
      if (k < 1 && k > 0) {
        // shockwave ring
        ctx.strokeStyle = `rgba(56,189,248,${0.5 * (1 - k)})`;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cx, cy, k * Math.max(w, h) * 0.6, 0, Math.PI * 2); ctx.stroke();
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = P[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = P[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < link) {
            ctx.strokeStyle = `rgba(56,189,248,${0.22 * (1 - d / link)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < 180) {
          ctx.strokeStyle = `rgba(31,182,166,${0.55 * (1 - dm / 180)})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        const n = { ...nodes[i], ...P[i] };
        ctx.fillStyle = n.ring ? 'rgba(31,182,166,.9)' : 'rgba(148,197,255,.75)';
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
        if (n.ring) {
          const size = 11;
          ctx.strokeStyle = 'rgba(31,182,166,.5)';
          ctx.lineWidth = 1.2;
          hexagon(n.x, n.y, size, n.angle, n.ring === 1);
          if (n.ring === 2) {
            // second ring sharing one edge with the first
            const off = size * Math.sqrt(3);
            const a = n.angle + Math.PI / 6;
            hexagon(n.x + off * Math.cos(a), n.y + off * Math.sin(a), size, n.angle, false);
          }
        }
      }
    };

    const step = () => {
      if (!running) return;
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        n.angle += n.spin;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };

    // touch: molecules reach toward the finger, then let go shortly after it lifts
    let touchTimer = 0;
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      clearTimeout(touchTimer);
      const r = canvas.getBoundingClientRect();
      mouse.x = t.clientX - r.left;
      mouse.y = t.clientY - r.top;
    };
    const onTouchEnd = () => {
      clearTimeout(touchTimer);
      touchTimer = window.setTimeout(onLeave, 700);
    };

    resize();
    const ro = new ResizeObserver(() => { resize(); if (!running || prefersReducedMotion()) draw(); });
    ro.observe(canvas);

    if (prefersReducedMotion()) {
      draw();
      return () => ro.disconnect();
    }

    // only animate while the hero is on screen
    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(step);
    });
    io.observe(canvas);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('baseras:burst', onBurst);
    window.addEventListener('touchstart', onTouch, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(touchTimer);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('baseras:burst', onBurst);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

/* Site-wide molecule layer: fixed behind all content, full strength at the top, dimmed once you scroll into the page. */
export const BackgroundMolecules: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const t = Math.min(1, window.scrollY / (window.innerHeight * 0.8));
      if (ref.current) ref.current.style.opacity = String(1 - 0.5 * t);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div ref={ref} className="fixed left-0 top-0 w-full h-screen z-0 pointer-events-none" style={{ height: '100lvh' }} aria-hidden="true">
      <MoleculeField className="w-full h-full" />
    </div>
  );
};

/* Mock product window that streams audit-trail style events across all three products. */
const EVENTS = [
  { mod: 'QMS', color: 'text-amber-300 bg-amber-300/10', text: 'Deviation DEV-0142 logged · Granulation Line 3' },
  { mod: 'eLogbook', color: 'text-teal bg-teal/10', text: 'Equipment cleaning recorded · RMG-02' },
  { mod: 'DMS', color: 'text-skyblue bg-skyblue/10', text: 'SOP-QA-017 v4 approved · e-signature applied' },
  { mod: 'LMS', color: 'text-violet-300 bg-violet-300/10', text: 'Training assigned on SOP-QA-017 · 12 users' },
  { mod: 'Field', color: 'text-teal bg-teal/10', text: 'Daily call report submitted · Territory Pune-2' },
  { mod: 'QMS', color: 'text-emerald-300 bg-emerald-300/10', text: 'CAPA-0087 closed · effectiveness verified' },
  { mod: 'eLogbook', color: 'text-skyblue bg-skyblue/10', text: 'Line clearance reviewed · Batch B24-118' },
];

const clock = (d: Date) => d.toTimeString().slice(0, 8);

type Row = (typeof EVENTS)[number] & { id: number; time: string };
const initialRows = (): Row[] => {
  const now = Date.now();
  return EVENTS.slice(0, 4).map((e, i) => ({ ...e, id: i, time: clock(new Date(now - (4 - i) * 47000)) }));
};

export const LiveConsole: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const introDone = useIntroDone();
  const [reduced] = useState(prefersReducedMotion);
  // idle → boot ("Connecting to audit trail…" ✓) → live (entries stream in)
  const [phase, setPhase] = useState<'idle' | 'boot' | 'live'>(reduced ? 'live' : 'idle');
  const [typed, setTyped] = useState('');
  const [connected, setConnected] = useState(false);
  const [rows, setRows] = useState<Row[]>(() => (reduced ? initialRows() : []));

  // boot once the console is on screen (on phones that's when you scroll to it)
  useEffect(() => {
    if (phase !== 'idle' || !introDone) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setPhase('boot'); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [phase, introDone]);

  useEffect(() => {
    if (phase !== 'boot') return;
    const msg = 'Connecting to audit trail…';
    const timers: number[] = [];
    let i = 0;
    const typer = window.setInterval(() => {
      i++;
      setTyped(msg.slice(0, i));
      if (i >= msg.length) {
        clearInterval(typer);
        timers.push(window.setTimeout(() => setConnected(true), 400));
        timers.push(window.setTimeout(() => setPhase('live'), 1300));
      }
    }, 45);
    return () => { clearInterval(typer); timers.forEach(clearTimeout); };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'live' || reduced) return;
    let i = 0;
    const add = () => {
      const e = EVENTS[i % EVENTS.length];
      const id = i++;
      setRows(prev => [...prev.slice(-4), { ...e, id, time: clock(new Date()) }]);
    };
    // first entries arrive quickly, then one every 2.2 s
    const timers = [0, 1, 2, 3].map(k => window.setTimeout(add, k * 350));
    const iv = window.setInterval(add, 2200);
    return () => { timers.forEach(clearTimeout); clearInterval(iv); };
  }, [phase, reduced]);

  return (
    <div ref={ref} className="glass !bg-deep/85 rounded-3xl overflow-hidden shadow-2xl shadow-teal/10 text-left relative">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-skyblue/10 to-transparent scanline pointer-events-none" />
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-300/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="text-xs font-semibold text-slate-400 tracking-wider">AUDIT TRAIL</span>
        <span className="flex items-center gap-2 text-xs font-bold text-teal">
          <span className="w-2 h-2 rounded-full bg-teal pulse-dot" /> LIVE
        </span>
      </div>
      <div className="p-4 space-y-2 min-h-[290px]">
        {phase !== 'live' && (
          <div className="px-2 pt-2 space-y-2 font-mono text-sm">
            <div className="text-slate-300">
              <span className="text-teal mr-2">›</span>{typed}
              {!connected && <span className="caret text-teal">▍</span>}
            </div>
            {connected && (
              <div className="row-in text-emerald-300">✓ Connected · QMS · eLogbook · Field Pharma</div>
            )}
          </div>
        )}
        {phase === 'live' && rows.map(r => (
          <div key={r.id} className="row-in flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/5 px-3 py-2.5">
            <span className="font-mono text-[11px] text-slate-500 shrink-0">{r.time}</span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shrink-0 ${r.color}`}>{r.mod}</span>
            <span className="text-sm text-slate-200 truncate">{r.text}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 text-[11px] font-semibold text-slate-400">
        <span>Every entry time-stamped &amp; attributable</span>
        <span className="font-mono text-slate-500">user: qa.reviewer</span>
      </div>
    </div>
  );
};
