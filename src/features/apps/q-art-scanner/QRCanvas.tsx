'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface QRCanvasProps {
  size: number;
  onDataChange: (imageData: ImageData) => void;
}

export function QRCanvas({ size, onDataChange }: QRCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [grid, setGrid] = useState<boolean[][]>(() => 
    Array.from({ length: size }, () => Array(size).fill(false))
  );
  const isDrawing = useRef(false);
  const drawMode = useRef<boolean>(true); // true = black, false = white
  const lastCell = useRef<{ r: number; c: number } | null>(null);

  // Handle drawing logic
  const handlePointerAction = useCallback((e: React.PointerEvent<HTMLCanvasElement> | PointerEvent) => {
    if (!canvasRef.current || !isDrawing.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const cellSize = rect.width / size;
    const c = Math.floor(x / cellSize);
    const r = Math.floor(y / cellSize);

    if (r >= 0 && r < size && c >= 0 && c < size) {
      // Avoid redundant updates
      if (lastCell.current?.r === r && lastCell.current?.c === c) return;
      lastCell.current = { r, c };

      setGrid(prev => {
        if (prev[r][c] === drawMode.current) return prev;
        const newGrid = prev.map(row => [...row]);
        newGrid[r][c] = drawMode.current;
        return newGrid;
      });
    }
  }, [size]);

  // Sync grid to canvas and parent
  useEffect(() => {
    if (grid.length === 0) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const canvasSize = canvas.width;
    const cellSize = canvasSize / size;
    
    // Draw for UI
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c]) {
          ctx.fillStyle = '#111827'; // slate-900
          ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        }
        
        // Subtle grid lines
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }

    // Prepare ImageData for jsqr (clean 1:1 scale)
    const scanCanvas = document.createElement('canvas');
    scanCanvas.width = size;
    scanCanvas.height = size;
    const scanCtx = scanCanvas.getContext('2d');
    if (scanCtx) {
      const scanData = scanCtx.createImageData(size, size);
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const i = (r * size + c) * 4;
          const val = grid[r][c] ? 0 : 255;
          scanData.data[i] = val;
          scanData.data[i + 1] = val;
          scanData.data[i + 2] = val;
          scanData.data[i + 3] = 255;
        }
      }
      onDataChange(scanData);
    }
  }, [grid, size, onDataChange]);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // Only handle primary and secondary buttons
    if (e.button !== 0 && e.button !== 2) return;
    
    isDrawing.current = true;
    drawMode.current = e.button === 0; // Left = Draw, Right = Erase
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
        className="relative bg-card rounded-xl overflow-hidden border border-border shadow-2xl"
      >
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          className="w-full max-w-[500px] aspect-square cursor-crosshair touch-none select-none bg-white"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onContextMenu={(e) => e.preventDefault()}
        />
      </motion.div>
      
      {/* Drawing Instructions Overlay */}
      <div className="mt-4 flex justify-center gap-6 text-xs font-medium text-foreground/40">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-900 border border-border" />
          Left Click: Draw
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white border border-border" />
          Right Click: Erase
        </div>
      </div>
    </div>
  );
}
