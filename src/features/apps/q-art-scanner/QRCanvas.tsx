'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface QRCanvasProps {
  size: number;
  onDataChange: (imageData: ImageData) => void;
}

export function QRCanvas({ size, onDataChange }: QRCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridRef = useRef<boolean[][]>([]);
  const isDrawing = useRef(false);
  const drawMode = useRef<boolean>(true); // true = black, false = white
  const lastCell = useRef<{ r: number; c: number } | null>(null);

  // Initialize data and offscreen canvas
  useEffect(() => {
    gridRef.current = Array.from({ length: size }, () => Array(size).fill(false));
    
    const scanCanvas = document.createElement('canvas');
    scanCanvas.width = size;
    scanCanvas.height = size;
    offscreenCanvasRef.current = scanCanvas;
    
    const ctx = scanCanvas.getContext('2d', { willReadFrequently: true });
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
    }

    // Initial draw to UI canvas
    drawWholeGrid();
    lastCell.current = null;
  }, [size]);

  const drawWholeGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const canvasSize = canvas.width;
    const cellSize = canvasSize / size;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (gridRef.current[r][c]) {
          ctx.fillStyle = '#111827';
          ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        }
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }
  }, [size]);

  const drawSingleCell = (r: number, c: number, mode: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const cellSize = canvas.width / size;
    
    // Update UI Canvas directly (No React re-render)
    ctx.fillStyle = mode ? '#111827' : '#ffffff';
    ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);

    // Update Offscreen Canvas
    const offCtx = offscreenCanvasRef.current?.getContext('2d');
    if (offCtx) {
      offCtx.fillStyle = mode ? '#000000' : '#ffffff';
      offCtx.fillRect(c, r, 1, 1);
      
      // Pass the updated image data to parent
      const imageData = offCtx.getImageData(0, 0, size, size);
      onDataChange(imageData);
    }
  };

  const handlePointerAction = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !isDrawing.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const cellSize = rect.width / size;
    const c = Math.floor(x / cellSize);
    const r = Math.floor(y / cellSize);

    if (r >= 0 && r < size && c >= 0 && c < size) {
      if (lastCell.current?.r === r && lastCell.current?.c === c) return;
      lastCell.current = { r, c };

      if (gridRef.current[r][c] !== drawMode.current) {
        gridRef.current[r][c] = drawMode.current;
        drawSingleCell(r, c, drawMode.current);
      }
    }
  }, [size, onDataChange]);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.button !== 0 && e.button !== 2) return;
    isDrawing.current = true;
    drawMode.current = e.button === 0;
    canvasRef.current?.setPointerCapture(e.pointerId);
    handlePointerAction(e);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    handlePointerAction(e);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawing.current = false;
    lastCell.current = null;
    canvasRef.current?.releasePointerCapture(e.pointerId);
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white rounded-xl overflow-hidden border border-border shadow-2xl"
      >
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          className="w-full max-w-[500px] aspect-square cursor-crosshair touch-none select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onContextMenu={(e) => e.preventDefault()}
        />
      </motion.div>
      
      <div className="mt-4 flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-foreground/20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-900" />
          Left: Draw
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-200" />
          Right: Erase
        </div>
      </div>
    </div>
  );
}
