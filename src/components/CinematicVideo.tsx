"use client";

import { useEffect, useRef } from "react";

export default function CinematicVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const readyRef = useRef(false);

  const mouseX = useRef(0.5);
  const mouseY = useRef(0.5);
  const scrollY = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      readyRef.current = true;
      video.pause();
      video.currentTime = 0;
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("canplay", onLoaded);

    const onScroll = () => {
      // Normalize scroll progress across document height
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, window.scrollY / (docHeight || 1)));
      scrollY.current = progress;
      
      if (video.duration) {
        targetRef.current = progress * video.duration;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX / window.innerWidth;
      mouseY.current = e.clientY / window.innerHeight;
      
      // Update dynamic spotlight
      const glow = document.getElementById("cine-glow");
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${mouseX.current * 100}% ${mouseY.current * 100}%, rgba(196,0,36,0.18), transparent 40%)`;
      }
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMouseMove);
    
    // Initial calls
    onScroll();

    let rafId: number;
    const render = () => {
      if (readyRef.current && video.duration) {
        currentRef.current += (targetRef.current - currentRef.current) * 0.10;
        
        if (Math.abs(targetRef.current - currentRef.current) > 0.001) {
          try {
            video.currentTime = currentRef.current;
          } catch {}
        }
      }

      if (containerRef.current) {
        const dx = mouseX.current - 0.5;
        const dy = mouseY.current - 0.5;
        containerRef.current.style.transform = `scale(1.06) translate3d(${dx * -15}px, ${dy * -15}px, 0) rotateX(${dy * -2}deg) rotateY(${dx * 2}deg)`;
      }

      const progressBar = document.getElementById("cine-progress");
      if (progressBar) {
        progressBar.style.width = `${scrollY.current * 100}%`;
      }

      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("canplay", onLoaded);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-bg perspective-[1000px]">
      <div id="cine-progress" className="fixed top-0 left-0 h-[2px] bg-accent z-50 transition-all duration-75" />
      
      <div ref={containerRef} className="absolute inset-0 w-full h-full transform-gpu preserve-3d will-change-transform transition-transform duration-75">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          playsInline
          muted
          preload="auto"
          src="/Arun_profile--/video/portfolio-background.mp4"
        />
        
        <div className="absolute inset-0 cine-vignette" />
        <div id="cine-glow" className="absolute inset-0 cine-glow" />
        <div className="absolute inset-0 cine-grain" />
        <div className="absolute inset-0 cine-scan" />
      </div>
    </div>
  );
}
