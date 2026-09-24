import React, { useEffect, useRef } from 'react';

export interface AmbientAuraProps {
  containerRef?: React.RefObject<HTMLElement>;
  className?: string;
}

export const AmbientAura: React.FC<AmbientAuraProps> = ({ containerRef, className = '' }) => {
  const warmRef = useRef<HTMLSpanElement>(null);
  const coolRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const target = containerRef?.current || warmRef.current?.parentElement;
    if (!target) return;

    let targetX = target.clientWidth / 2;
    let targetY = target.clientHeight / 2;
    let warmX = targetX;
    let warmY = targetY;
    let coolX = targetX;
    let coolY = targetY;
    let rafId = 0;
    let isRunning = false;

    const updatePosition = () => {
      // Dual-speed lerp damping (0.16 for warm, 0.07 for cool)
      warmX += (targetX - warmX) * 0.16;
      warmY += (targetY - warmY) * 0.16;
      coolX += (targetX - coolX) * 0.07;
      coolY += (targetY - coolY) * 0.07;

      if (warmRef.current) {
        warmRef.current.style.transform = `translate3d(${warmX}px, ${warmY}px, 0) translate(-50%, -50%)`;
      }
      if (coolRef.current) {
        coolRef.current.style.transform = `translate3d(${coolX}px, ${coolY}px, 0) translate(-50%, -50%)`;
      }

      // Check deltas for auto-sleeping requestAnimationFrame loop
      const warmDelta = Math.abs(targetX - warmX) + Math.abs(targetY - warmY);
      const coolDelta = Math.abs(targetX - coolX) + Math.abs(targetY - coolY);

      if (warmDelta > 0.05 || coolDelta > 0.05) {
        rafId = requestAnimationFrame(updatePosition);
      } else {
        isRunning = false;
        rafId = 0;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = target.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;

      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    // Initial positioning
    if (warmRef.current) {
      warmRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
    }
    if (coolRef.current) {
      coolRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
    }

    target.addEventListener('pointermove', handlePointerMove as EventListener, { passive: true });

    return () => {
      target.removeEventListener('pointermove', handlePointerMove as EventListener);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [containerRef]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* Warm Glow Aura (Vibrant Cyber Orange #f85c3a / #f48445) */}
      <span
        ref={warmRef}
        className="aura -warm absolute top-0 left-0 w-[450px] h-[450px] rounded-full pointer-events-none will-change-transform opacity-75"
        style={{
          background: 'radial-gradient(circle at center, rgba(248, 92, 58, 0.45) 0%, rgba(244, 132, 69, 0.25) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Cool Glow Aura (Electric Indigo #5a66ee) */}
      <span
        ref={coolRef}
        className="aura -cool absolute top-0 left-0 w-[550px] h-[550px] rounded-full pointer-events-none will-change-transform opacity-60"
        style={{
          background: 'radial-gradient(circle at center, rgba(90, 102, 238, 0.40) 0%, rgba(123, 63, 242, 0.20) 45%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
    </div>
  );
};

export default AmbientAura;
