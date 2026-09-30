"use client";

const basePath = process.env.NODE_ENV === "production" ? "/Arun_profile--" : "";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center px-6 md:px-16 pt-20">
      {/* Background Watermark */}
      <div 
        className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden select-none"
        style={{
          WebkitTextStroke: '2px rgba(196, 0, 36, 0.35)',
          textShadow: '0 0 50px rgba(196, 0, 36, 0.18)'
        }}
      >
        <span className="font-oswald text-[25vw] font-bold text-transparent whitespace-nowrap">
          ARUN
        </span>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-6">
        <div className="inline-block border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm w-max">
          <span className="font-mono text-xs tracking-widest text-accent">01 / FULL-STACK & AI ENGINEER</span>
        </div>

        <h1 className="font-oswald text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] font-bold uppercase" style={{ maxWidth: '13ch' }}>
          <span className="block text-white">BUILDING IDEAS</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-[#ff3b5c] to-accent">
            INTO EXPERIENCES<span className="text-accent">.</span>
          </span>
        </h1>

        <div className="flex flex-wrap gap-8 mt-8 border-l-2 border-accent/50 pl-6 py-2">
          <div>
            <p className="font-mono text-xs text-white/50 mb-1">PROJECTS</p>
            <p className="font-space text-2xl font-bold">10+</p>
          </div>
          <div>
            <p className="font-mono text-xs text-white/50 mb-1">CGPA</p>
            <p className="font-space text-2xl font-bold">6.74</p>
          </div>
          <div>
            <p className="font-mono text-xs text-white/50 mb-1">STATUS</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="font-space text-sm font-bold text-green-500">Open to Opportunities</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 mt-12">
          <a
            href="#projects"
            className="group flex items-center gap-4 bg-white text-bg px-8 py-4 rounded-full font-bold font-space hover:bg-accent hover:text-white transition-all duration-300"
            data-magnetic
          >
            EXPLORE WORK 
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </a>
          <a
            href={`${basePath}/Arun_Resume_.pdf`}
            target="_blank"
            className="font-mono text-sm text-text/70 hover:text-white border-b border-text/30 hover:border-white pb-1 transition-all"
            data-magnetic
          >
            DOWNLOAD RÉSUMÉ
          </a>
        </div>
      </div>
    </section>
  );
}
