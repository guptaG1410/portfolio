"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; r: number };

export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0.72, y: 0.38 };
    let frame = 0;
    let visible = true;
    const count = window.innerWidth < 768 ? 18 : 42;
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00022,
      vy: (Math.random() - 0.5) * 0.00022,
      r: Math.random() * 1.15 + 0.35,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, canvas.clientWidth * dpr);
      canvas.height = Math.max(1, canvas.clientHeight * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      const gap = width < 768 ? 48 : 64;
      context.beginPath();
      for (let x = 0; x <= width; x += gap) {
        context.moveTo(x + 0.5, 0);
        context.lineTo(x + 0.5, height);
      }
      for (let y = 0; y <= height; y += gap) {
        context.moveTo(0, y + 0.5);
        context.lineTo(width, y + 0.5);
      }
      context.strokeStyle = "rgba(255,255,255,0.045)";
      context.lineWidth = 1;
      context.stroke();

      const gx = pointer.x * width;
      const gy = pointer.y * height;
      const glow = context.createRadialGradient(gx, gy, 0, gx, gy, 280);
      glow.addColorStop(0, "rgba(141, 123, 255, 0.16)");
      glow.addColorStop(0.45, "rgba(110, 162, 255, 0.05)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      for (const particle of particles) {
        if (!reduce) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x < 0 || particle.x > 1) particle.vx *= -1;
          if (particle.y < 0 || particle.y > 1) particle.vy *= -1;
        }
        context.beginPath();
        context.arc(particle.x * width, particle.y * height, particle.r, 0, Math.PI * 2);
        context.fillStyle = "rgba(154, 223, 255, 0.7)";
        context.fill();
      }

      if (width >= 768) {
        context.lineWidth = 1;
        for (let i = 0; i < particles.length; i += 1) {
          for (let j = i + 1; j < particles.length; j += 1) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.hypot(dx, dy);
            if (distance > 0.16) continue;
            context.strokeStyle = `rgba(154, 223, 255, ${0.18 * (1 - distance / 0.16)})`;
            context.beginPath();
            context.moveTo(particles[i].x * width, particles[i].y * height);
            context.lineTo(particles[j].x * width, particles[j].y * height);
            context.stroke();
          }
        }
      }

      if (!reduce && visible) frame = requestAnimationFrame(draw);
    };

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
      if (reduce) draw();
    };

    resize();
    draw();

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      if (visible && !reduce) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(draw);
      }
    });
    observer.observe(canvas);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
