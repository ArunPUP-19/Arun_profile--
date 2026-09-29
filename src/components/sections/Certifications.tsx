"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ShieldCheck, Play, Pause, X } from "lucide-react";

interface Cert {
  id: string;
  title: string;
  issuer: string;
  date: string;
  hash: string;
  skills: string[];
}

const certs: Cert[] = [
  {
    id: "c1",
    title: "MERN Stack Developer Certification",
    issuer: "Profenaa Technologies",
    date: "2024",
    hash: "SHA256://8F9A3B2A99D45E...",
    skills: ["React.js", "Node.js", "MongoDB", "Express.js"]
  },
  {
    id: "c2",
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2023",
    hash: "SHA256://4D2C1A9B67F32C...",
    skills: ["HTML5", "CSS3", "Flexbox", "Grid"]
  },
  {
    id: "c3",
    title: "JavaScript Data Structures",
    issuer: "freeCodeCamp",
    date: "2023",
    hash: "SHA256://1B8E7F5A2C90D1...",
    skills: ["ES6+", "DSA", "OOP"]
  },
  {
    id: "c4",
    title: "Frontend Development Libraries",
    issuer: "freeCodeCamp",
    date: "2023",
    hash: "SHA256://9C2D4E1B5F8A32...",
    skills: ["React", "Redux", "Bootstrap"]
  }
];

export default function Certifications() {
  const N = certs.length;
  const step = 360 / N;
  
  const [radius, setRadius] = useState(480);
  const [angle, setAngle] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const rafId = useRef<number>(0);
  const lastTime = useRef(0);
  const angleRef = useRef(0);

  const [activeCert, setActiveCert] = useState<Cert | null>(null);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 768) setRadius(275);
      else if (window.innerWidth < 1024) setRadius(380);
      else setRadius(480);
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const tick = (time: number) => {
    if (!lastTime.current) lastTime.current = time;
    const dt = time - lastTime.current;
    lastTime.current = time;

    if (!isDragging.current) {
      if (Math.abs(velocity.current) > 0.01) {
        velocity.current *= 0.945; // Friction damping
        angleRef.current += velocity.current;
      } else if (isAutoSpin) {
        angleRef.current -= 0.06 * (dt / 16.6); // Auto spin
      }
      setAngle(angleRef.current);
    }
    rafId.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoSpin]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    velocity.current = 0;
    const el = e.currentTarget as HTMLElement;
    el.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - lastX.current;
    lastX.current = e.clientX;
    const rotDelta = delta * 0.2;
    angleRef.current += rotDelta;
    velocity.current = rotDelta;
    setAngle(angleRef.current);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    const el = e.currentTarget as HTMLElement;
    el.releasePointerCapture(e.pointerId);
  };

  const spinTo = (index: number) => {
    const targetAngle = -index * step;
    let delta = (targetAngle - angleRef.current) % 360;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    
    velocity.current = delta * 0.05; // kick towards target
  };

  return (
    <section id="certifications" className="w-full py-32 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-24 flex justify-between items-end">
        <div>
          <h2 className="font-oswald text-5xl md:text-7xl font-bold uppercase text-white/10 relative">
            <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">CERTIFICATIONS</span>
            CERTIFICATIONS
          </h2>
          <p className="font-mono text-accent mt-2 tracking-widest">03 / PROOF OF WORK</p>
        </div>
        <button 
          onClick={() => setIsAutoSpin(!isAutoSpin)}
          className="hidden md:flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full font-mono text-xs hover:border-accent transition-colors z-10 relative"
          data-magnetic
        >
          {isAutoSpin ? <Pause size={14} /> : <Play size={14} />}
          AUTO-SPIN {isAutoSpin ? "ON" : "PAUSED"}
        </button>
      </div>

      <div className="relative h-[500px] w-full flex items-center justify-center perspective-[1200px]" style={{ touchAction: 'pan-y' }}>
        <div 
          className="absolute w-0 h-0 transform-gpu preserve-3d"
          style={{ transform: `translateZ(${-radius}px) rotateY(${angle}deg)` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {certs.map((cert, i) => {
            const cardAngle = i * step;
            const globalAngle = (angle + cardAngle) % 360;
            const normalizedGlobalAngle = globalAngle < 0 ? globalAngle + 360 : globalAngle;
            const isFront = normalizedGlobalAngle < 20 || normalizedGlobalAngle > 340;

            return (
              <div 
                key={cert.id}
                className={cn(
                  "absolute top-0 left-0 w-[280px] md:w-[320px] p-6 rounded-2xl border transition-all duration-300 cursor-pointer select-none",
                  "bg-surface/80 backdrop-blur-xl border-white/5 shadow-2xl",
                  isFront ? "border-accent shadow-[0_0_40px_rgba(196,0,36,0.3)]" : "hover:border-white/20"
                )}
                style={{ 
                  transform: `translate(-50%, -50%) rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'hidden',
                }}
                onClick={() => {
                  if (!isFront) {
                    spinTo(i);
                  } else {
                    setActiveCert(cert);
                  }
                }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-accent shadow-[0_0_10px_#c40024]" />
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="text-accent" />
                  <span className="font-mono text-xs text-white/50">{cert.date}</span>
                </div>
                <h3 className="font-space text-xl font-bold mb-2 leading-tight">{cert.title}</h3>
                <p className="font-syne text-sm text-white/60 mb-6">{cert.issuer}</p>
                <div className="bg-bg/50 rounded-lg p-3 font-mono text-[10px] text-accent/80 truncate">
                  {cert.hash}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        {certs.map((_, i) => (
          <button
            key={i}
            onClick={() => spinTo(i)}
            className="w-2 h-2 rounded-full bg-white/20 hover:bg-accent transition-colors"
          />
        ))}
      </div>

      {/* Verification Modal */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-bg/90 backdrop-blur-sm" onClick={() => setActiveCert(null)} />
          <div className="relative bg-surface border border-accent/30 rounded-2xl w-full max-w-lg p-8 shadow-[0_0_50px_rgba(196,0,36,0.2)]">
            <button className="absolute top-4 right-4 text-white/50 hover:text-white" onClick={() => setActiveCert(null)}>
              <X size={24} />
            </button>
            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center border border-accent/50 text-accent">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h3 className="font-space text-2xl font-bold">VERIFIED</h3>
                <p className="font-mono text-sm text-white/50">{activeCert.issuer}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="font-mono text-xs text-white/50 mb-1">CREDENTIAL NAME</p>
                <p className="font-space text-lg">{activeCert.title}</p>
              </div>
              <div>
                <p className="font-mono text-xs text-white/50 mb-1">CRYPTOGRAPHIC HASH</p>
                <p className="font-mono text-xs text-accent break-all">{activeCert.hash}</p>
              </div>
              <div>
                <p className="font-mono text-xs text-white/50 mb-2">COMPETENCIES</p>
                <div className="flex flex-wrap gap-2">
                  {activeCert.skills.map(s => (
                    <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-syne text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
