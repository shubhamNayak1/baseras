import React, { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Smooth-scrolls to a section on the single page, leaving room for the fixed navbar. */
export const scrollToSection = (id: string, smooth = true) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = id === 'top' ? 0 : el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto' });
};

/* Fades + slides children in the first time they scroll into view. */
export const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('is-visible');
        io.disconnect();
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
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

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(130, (w * h) / 10000));
      nodes = Array.from({ length: count }, () => {
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
      });
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
      const link = 130;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
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
      for (const n of nodes) {
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
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
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
    <div ref={ref} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
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

export const LiveConsole: React.FC = () => {
  const [rows, setRows] = useState(() => {
    const now = Date.now();
    return EVENTS.slice(0, 4).map((e, i) => ({ ...e, id: i, time: clock(new Date(now - (4 - i) * 47000)) }));
  });

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let i = 4;
    const t = setInterval(() => {
      const e = EVENTS[i % EVENTS.length];
      setRows(prev => [...prev.slice(-4), { ...e, id: i, time: clock(new Date()) }]);
      i++;
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="glass !bg-deep/85 rounded-3xl overflow-hidden shadow-2xl shadow-teal/10 text-left relative">
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
        {rows.map(r => (
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
