"use client";

import { Terminal } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="w-full py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="font-oswald text-5xl md:text-7xl font-bold uppercase text-white/10 relative">
            <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">ABOUT</span>
            ABOUT
          </h2>
          <p className="font-mono text-accent mt-2 tracking-widest">01 / SYSTEM IDENTITY</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="font-syne text-lg text-white/70 leading-relaxed space-y-6">
            <p>
              I am a dedicated Web Developer with 6 months of professional experience in front-end development and certified MERN Stack skills.
            </p>
            <p>
              My focus is on building responsive, user-friendly web applications using modern technologies like React, JavaScript, and Node.js.
            </p>
            <p>
              I am seeking a Full Stack or Frontend Developer role to leverage my expertise in creating scalable and efficient digital solutions that deliver real-world value.
            </p>
          </div>
          
          {/* Cyber Terminal */}
          <div className="bg-[#050505] rounded-xl border border-white/10 p-6 font-mono text-xs text-white/60 shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:border-white/20 transition-colors">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-4">
              <Terminal size={14} className="text-accent" />
              <span>sys_diagnostic.exe</span>
              <div className="ml-auto flex gap-2">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-accent" />
              </div>
            </div>
            <div className="space-y-2">
              <p><span className="text-accent">{">"}</span> INIT_SEQUENCE ... OK</p>
              <p><span className="text-accent">{">"}</span> LOADING_PROFILE: ARUN N</p>
              <p><span className="text-accent">{">"}</span> ROLE: FRONTEND / FULL STACK</p>
              <p><span className="text-accent">{">"}</span> LOCATION: TIRUPUR, TAMIL NADU</p>
              <br />
              <p><span className="text-accent">{">"}</span> ANALYZING_CORE_STRENGTHS...</p>
              <p className="pl-4 text-green-400">▹ MERN Stack Architecture</p>
              <p className="pl-4 text-green-400">▹ Responsive UI Engineering</p>
              <p className="pl-4 text-green-400">▹ Performance Optimization (100% boost verified)</p>
              <p className="pl-4 text-green-400">▹ SEO Best Practices (30% visibility inc.)</p>
              <br />
              <p className="animate-pulse"><span className="text-accent">{">"}</span> AWAITING_INPUT_</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
