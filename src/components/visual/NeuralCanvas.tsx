import React, { useEffect, useRef } from 'react';

export interface NeuralCanvasProps {
  className?: string;
  nodeCount?: number;
  interactive?: boolean;
  ribbonCount?: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulsePhase: number;
  pulseSpeed: number;
  color: string;
}

interface Spark {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

export const NeuralCanvas: React.FC<NeuralCanvasProps> = ({
  className = '',
  nodeCount = 42,
  interactive = true,
  ribbonCount = 3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Check reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Color definitions
    const colors = [
      'rgba(248, 92, 58, 0.85)', // Cybergenix Vermilion
      'rgba(90, 102, 238, 0.85)', // Electric Indigo
      'rgba(0, 240, 255, 0.85)',  // Cyber Cyan
      'rgba(155, 77, 255, 0.85)', // Violet
    ];

    // Initialize nodes
    const nodes: Node[] = [];
    const sparks: Spark[] = [];

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Re-populate nodes if empty or out of bounds
      if (nodes.length === 0 && width > 0 && height > 0) {
        for (let i = 0; i < nodeCount; i++) {
          const baseRadius = 2 + Math.random() * 2.5;
          nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.7,
            vy: (Math.random() - 0.5) * 0.7,
            radius: baseRadius,
            baseRadius,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.03,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Pointer events for interactivity
    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      pointerRef.current.x = clientX - rect.left;
      pointerRef.current.y = clientY - rect.top;
      pointerRef.current.active = true;
    };

    const onPointerLeave = () => {
      pointerRef.current.active = false;
      pointerRef.current.x = -9999;
      pointerRef.current.y = -9999;
    };

    const parent = canvas.parentElement || canvas;
    parent.addEventListener('mousemove', onPointerMove as EventListener);
    parent.addEventListener('touchmove', onPointerMove as EventListener, { passive: true });
    parent.addEventListener('mouseleave', onPointerLeave);
    parent.addEventListener('touchend', onPointerLeave);

    let time = 0;

    // Render loop
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw flowing cyber ribbons in background
      for (let r = 0; r < ribbonCount; r++) {
        ctx.beginPath();
        const ribbonColor =
          r === 0
            ? 'rgba(248, 92, 58, 0.12)'
            : r === 1
            ? 'rgba(90, 102, 238, 0.10)'
            : 'rgba(0, 240, 255, 0.08)';

        ctx.strokeStyle = ribbonColor;
        ctx.lineWidth = 2 + r * 1.5;

        const freq = 0.0025 + r * 0.001;
        const amp = 35 + r * 15;
        const phase = time * (0.8 + r * 0.4);
        const yOffset = height * (0.35 + r * 0.18);

        ctx.moveTo(0, yOffset + Math.sin(phase) * amp);

        for (let x = 0; x <= width; x += 15) {
          const wave1 = Math.sin(x * freq + phase) * amp;
          const wave2 = Math.cos(x * freq * 0.5 - phase * 0.7) * (amp * 0.4);
          ctx.lineTo(x, yOffset + wave1 + wave2);
        }
        ctx.stroke();
      }

      // 2. Draw Synaptic Connections between nearby nodes
      const maxDist = 125;
      const pointer = pointerRef.current;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            // Occasionally spawn a spark between connected nodes
            if (Math.random() < 0.0008 && sparks.length < 12) {
              sparks.push({
                fromNode: i,
                toNode: j,
                progress: 0,
                speed: 0.015 + Math.random() * 0.02,
              });
            }
          }
        }
      }

      // 3. Render and update synaptic sparks
      for (let s = sparks.length - 1; s >= 0; s--) {
        const spark = sparks[s];
        const nA = nodes[spark.fromNode];
        const nB = nodes[spark.toNode];

        if (!nA || !nB) {
          sparks.splice(s, 1);
          continue;
        }

        spark.progress += spark.speed;
        if (spark.progress >= 1) {
          sparks.splice(s, 1);
          continue;
        }

        const sx = nA.x + (nB.x - nA.x) * spark.progress;
        const sy = nA.y + (nB.y - nA.y) * spark.progress;

        ctx.beginPath();
        ctx.arc(sx, sy, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#f85c3a';
        ctx.shadowColor = '#f85c3a';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // 4. Update and render nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          // Bounce off boundary walls
          if (node.x <= 0 || node.x >= width) node.vx *= -1;
          if (node.y <= 0 || node.y >= height) node.vy *= -1;

          // Interactive pointer repulsion / attraction
          if (pointer.active) {
            const pdx = pointer.x - node.x;
            const pdy = pointer.y - node.y;
            const pdist = Math.hypot(pdx, pdy);

            if (pdist < 150 && pdist > 0) {
              const force = (1 - pdist / 150) * 0.45;
              node.x -= (pdx / pdist) * force * 3;
              node.y -= (pdy / pdist) * force * 3;
            }
          }

          // Pulsing radius
          node.pulsePhase += node.pulseSpeed;
          node.radius = node.baseRadius + Math.sin(node.pulsePhase) * 1.2;
        }

        // Draw node glow aura
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = node.color.replace('0.85', '0.12');
        ctx.fill();

        // Draw node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 5. Draw gentle pointer halo if active
      if (pointer.active && !prefersReducedMotion) {
        const grad = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          100
        );
        grad.addColorStop(0, 'rgba(248, 92, 58, 0.15)');
        grad.addColorStop(1, 'rgba(248, 92, 58, 0)');
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 100, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      parent.removeEventListener('mousemove', onPointerMove as EventListener);
      parent.removeEventListener('touchmove', onPointerMove as EventListener);
      parent.removeEventListener('mouseleave', onPointerLeave);
      parent.removeEventListener('touchend', onPointerLeave);
    };
  }, [nodeCount, interactive, ribbonCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`NeuralCanvas block pointer-events-none select-none w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};

export default NeuralCanvas;
