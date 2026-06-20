"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-0"
      style={{
        width: 600,
        height: 600,
        transform: "translate(-50%, -50%)",
        background:
          "radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 70%)",
        transition: "left 0.15s ease-out, top 0.15s ease-out",
      }}
      aria-hidden="true"
    />
  );
}
