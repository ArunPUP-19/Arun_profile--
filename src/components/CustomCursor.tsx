"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      
      // Instantly move the dot
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('[data-magnetic]') || el.tagName.toLowerCase() === 'a' || el.tagName.toLowerCase() === 'button') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    let rafId: number;
    const render = () => {
      // Lerp for the ring
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={cursorRingRef}
        className={cn(
          "fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-accent/60 pointer-events-none z-[100] transition-all duration-300 ease-out",
          isHovering ? "w-12 h-12 border-accent bg-accent/10" : ""
        )}
        style={{ mixBlendMode: 'screen' }}
      />
      <div
        ref={cursorDotRef}
        className={cn(
          "fixed top-0 left-0 w-1.5 h-1.5 bg-text rounded-full pointer-events-none z-[100] transition-all duration-300 ease-out",
          isHovering ? "scale-0" : "scale-100"
        )}
      />
    </>
  );
}
