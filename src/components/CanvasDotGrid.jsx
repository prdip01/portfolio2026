import React, { useEffect, useRef } from 'react';

export default function CanvasDotGrid() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Initial size
    handleResize();

    const dotSpacing = 32; // spacing between dots in pixels
    const maxDistance = 120; // radius of mouse influence

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const cols = Math.floor(canvas.width / dotSpacing) + 2;
      const rows = Math.floor(canvas.height / dotSpacing) + 2;
      const mouse = mouseRef.current;

      ctx.fillStyle = 'rgba(0, 240, 255, 0.12)'; // Cyan dots by default

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const originalX = c * dotSpacing;
          const originalY = r * dotSpacing;

          const dx = mouse.x - originalX;
          const dy = mouse.y - originalY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let drawX = originalX;
          let drawY = originalY;
          let dotSize = 1.2;
          let dotColor = 'rgba(255, 255, 255, 0.15)'; // default soft gray-white

          if (dist < maxDistance) {
            const force = (maxDistance - dist) / maxDistance; // 1 at center, 0 at boundary
            
            // Warp coordinates slightly away from mouse
            const warpX = (dx / dist) * force * -8;
            const warpY = (dy / dist) * force * -8;
            
            drawX += warpX;
            drawY += warpY;

            // Increase size and change color based on distance
            dotSize = 1.2 + force * 2.5;
            
            // Mix cyan and amber based on coordinates or proximity
            if (force > 0.6) {
              dotColor = `rgba(255, 107, 0, ${0.3 + force * 0.5})`; // Amber closer to center
            } else {
              dotColor = `rgba(0, 240, 255, ${0.2 + force * 0.6})`; // Cyan on borders of influence
            }
          }

          ctx.beginPath();
          ctx.arc(drawX, drawY, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-[0.85]"
      aria-hidden="true"
    />
  );
}
