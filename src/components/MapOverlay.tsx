import React, { useEffect, useRef, useState } from 'react';

interface Marker {
  name: string;
  x: number;
  y: number;
}

const countryMarkers: Marker[] = [
  { name: 'USA', x: 200, y: 120 },
  { name: 'France', x: 260, y: 80 },
  { name: 'Japan', x: 500, y: 100 },
];

const playerPos = { x: 320, y: 180 };

export default function MapOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw(ctx, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) draw(ctx, canvas.width, canvas.height);
  }, [visible]);

  const draw = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#999';
    ctx.lineWidth = 1;
    countryMarkers.forEach(({ x, y }) => {
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.stroke();
    });

    ctx.fillStyle = '#007bff';
    ctx.beginPath();
    ctx.arc(playerPos.x, playerPos.y, 8, 0, 2 * Math.PI);
    ctx.fill();
  };

  return (
    <>
      {visible && (
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full h-full z-40 pointer-events-none"
        />
      )}
      <button
        onClick={() => setVisible((v) => !v)}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full border border-white bg-black text-white flex items-center justify-center hover:bg-gray-900"
        aria-label="Toggle map"
      >
        {visible ? '×' : '🗺️'}
      </button>
    </>
  );
}

