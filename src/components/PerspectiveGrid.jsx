import React, { useEffect, useRef } from 'react';

/**
 * 3D Perspective Grid Canvas Background
 * Renders an infinite perspective-projected grid that gently drifts forward
 * and responds to mouse position by tilting the virtual camera.
 */
export default function PerspectiveGrid() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 }); // normalized 0..1

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMouse = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse);
    resize();

    const draw = () => {
      t += 0.004;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x; // 0..1
      const my = mouseRef.current.y; // 0..1

      // Horizon point shifts subtly with mouse
      const horizonY = H * (0.48 + (my - 0.5) * 0.06);
      const vanishX = W * (0.5 + (mx - 0.5) * 0.08);

      const cols = 14;
      const rows = 18;
      const gridSpacingH = W / cols;

      // Vertical lines converging to vanishing point
      for (let c = 0; c <= cols; c++) {
        const baseX = c * gridSpacingH;
        const alpha = 0.06 + (c % 2 === 0 ? 0.05 : 0);
        ctx.beginPath();
        ctx.moveTo(baseX, H);
        ctx.lineTo(vanishX, horizonY);
        const grad = ctx.createLinearGradient(vanishX, horizonY, baseX, H);
        grad.addColorStop(0, `rgba(217,30,140,0)`);
        grad.addColorStop(0.4, `rgba(217,30,140,${alpha})`);
        grad.addColorStop(1, `rgba(91,33,182,${alpha + 0.06})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = c % 4 === 0 ? 1.2 : 0.6;
        ctx.stroke();
      }

      // Horizontal lines — perspective-spaced, scrolling via t
      for (let r = 0; r < rows; r++) {
        const progress = ((r / rows) + (t % 1)) % 1; // 0..1 looping
        // Perspective mapping: near (progress=1) → bottom, far (progress=0) → horizon
        const yPos = horizonY + (H - horizonY) * Math.pow(progress, 2.4);

        // Width of horizontal line at this depth (wider near bottom)
        const depth = progress;
        const xLeft = vanishX - (vanishX) * depth * 1.1;
        const xRight = vanishX + (W - vanishX) * depth * 1.1;

        const alpha = depth * 0.15;
        ctx.beginPath();
        ctx.moveTo(xLeft, yPos);
        ctx.lineTo(xRight, yPos);
        const hGrad = ctx.createLinearGradient(xLeft, yPos, xRight, yPos);
        hGrad.addColorStop(0, `rgba(217,30,140,0)`);
        hGrad.addColorStop(0.3, `rgba(217,30,140,${alpha})`);
        hGrad.addColorStop(0.7, `rgba(91,33,182,${alpha})`);
        hGrad.addColorStop(1, `rgba(91,33,182,0)`);
        ctx.strokeStyle = hGrad;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Subtle glow dots at grid intersections near the bottom
      for (let c = 0; c <= cols; c++) {
        for (let r = Math.floor(rows * 0.6); r < rows; r++) {
          const progress = ((r / rows) + (t % 1)) % 1;
          const yPos = horizonY + (H - horizonY) * Math.pow(progress, 2.4);
          const depth = progress;
          const xAtDepth = vanishX + (c * gridSpacingH - vanishX) * depth;
          const dotAlpha = depth * 0.4;
          const dotRadius = 1.2 * depth;

          ctx.beginPath();
          ctx.arc(xAtDepth, yPos, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(217,30,140,${dotAlpha})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
