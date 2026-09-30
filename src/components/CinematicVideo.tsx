"use client";

import { useEffect, useRef, useCallback } from "react";

const basePath = process.env.NODE_ENV === "production" ? "/Arun_profile--" : "";

export default function CinematicVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Video scrubbing state
  const currentTimeRef = useRef(0);
  const targetTimeRef = useRef(0);
  const readyRef = useRef(false);
  const isSeeking = useRef(false);
  const pendingSeek = useRef<number | null>(null);

  // Mouse parallax state
  const targetMouseX = useRef(0.5);
  const targetMouseY = useRef(0.5);
  const mouseX = useRef(0.5);
  const mouseY = useRef(0.5);
  const scrollProgress = useRef(0);

  /**
   * Safely seek the video. If the browser is still processing a previous seek,
   * we store the desired time and apply it once `seeked` fires.
   * This prevents stacking seeks which causes massive stutter.
   */
  const seekTo = useCallback((time: number) => {
    const video = videoRef.current;
    if (!video || !isFinite(time)) return;

    // Clamp to valid range
    const clamped = Math.max(0, Math.min(time, video.duration || 0));

    if (video.seeking || isSeeking.current) {
      // Queue the latest desired time; only the most recent one matters
      pendingSeek.current = clamped;
      return;
    }

    isSeeking.current = true;
    try {
      video.currentTime = clamped;
    } catch {
      isSeeking.current = false;
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // ── Video readiness ──────────────────────────────────────────
    const onReady = () => {
      readyRef.current = true;
      video.pause();
    };

    if (video.readyState >= 1) onReady();
    video.addEventListener("loadedmetadata", onReady);
    video.addEventListener("canplay", onReady);

    // ── Seek lifecycle ───────────────────────────────────────────
    // When the browser finishes a seek, apply the latest queued seek if any
    const onSeeked = () => {
      isSeeking.current = false;

      if (pendingSeek.current !== null) {
        const next = pendingSeek.current;
        pendingSeek.current = null;
        seekTo(next);
      }
    };
    video.addEventListener("seeked", onSeeked);

    // ── Scroll → video target time ──────────────────────────────
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, window.scrollY / (docHeight || 1)));
      scrollProgress.current = progress;

      if (video.duration) {
        targetTimeRef.current = progress * video.duration;
      }
    };

    // ── Mouse tracking ──────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      targetMouseX.current = e.clientX / window.innerWidth;
      targetMouseY.current = e.clientY / window.innerHeight;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    onScroll(); // initial sync

    // ── Animation loop ──────────────────────────────────────────
    let rafId: number;

    const render = () => {
      // ─ Video scrubbing with lerp ──
      if (readyRef.current && video.duration) {
        const diff = targetTimeRef.current - currentTimeRef.current;

        // Lerp factor: 0.12 gives snappy but smooth response at 60fps
        // (closes ~12% of the remaining gap per frame)
        currentTimeRef.current += diff * 0.12;

        // Only issue a seek if the delta is meaningful (> ~1 frame at 30fps)
        // This avoids flooding the browser with insignificant micro-seeks
        const seekDelta = Math.abs(currentTimeRef.current - video.currentTime);
        if (seekDelta > 0.016) {
          seekTo(currentTimeRef.current);
        }
      }

      // ─ Mouse parallax lerp ──
      mouseX.current += (targetMouseX.current - mouseX.current) * 0.08;
      mouseY.current += (targetMouseY.current - mouseY.current) * 0.08;

      // ─ Dynamic spotlight glow ──
      const glow = document.getElementById("cine-glow");
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${mouseX.current * 100}% ${mouseY.current * 100}%, rgba(196,0,36,0.18), transparent 40%)`;
      }

      // ─ Container parallax ──
      if (containerRef.current) {
        const dx = mouseX.current - 0.5;
        const dy = mouseY.current - 0.5;
        containerRef.current.style.transform =
          `scale(1.06) translate3d(${dx * -15}px, ${dy * -15}px, 0) rotateX(${dy * -2}deg) rotateY(${dx * 2}deg)`;
      }

      // ─ Scroll progress bar ──
      const progressBar = document.getElementById("cine-progress");
      if (progressBar) {
        progressBar.style.width = `${scrollProgress.current * 100}%`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    // ── Cleanup ─────────────────────────────────────────────────
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("seeked", onSeeked);
      cancelAnimationFrame(rafId);
    };
  }, [seekTo]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-bg perspective-[1000px]">
      <div
        id="cine-progress"
        className="fixed top-0 left-0 h-[2px] bg-accent z-50 transition-all duration-75"
      />

      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full transform-gpu preserve-3d will-change-transform transition-transform duration-75"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          playsInline
          muted
          preload="auto"
          src={`${basePath}/video/portfolio-background.mp4`}
        />

        <div className="absolute inset-0 cine-vignette" />
        <div id="cine-glow" className="absolute inset-0 cine-glow" />
        <div className="absolute inset-0 cine-grain" />
        <div className="absolute inset-0 cine-scan" />
      </div>
    </div>
  );
}
