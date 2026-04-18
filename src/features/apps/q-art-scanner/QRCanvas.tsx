'use client';

import { useEffect, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import { motion } from 'framer-motion';

export interface QRCanvasHandle {
  clear: () => void;
  exportImage: (filename: string) => void;
}

interface QRCanvasProps {
  size: number;
  onDataChange: (imageData: ImageData) => void;
}

const SCALE_FACTOR = 10;
const COOKIE_NAME_PREFIX = 'qart_grid_v';

// --- Cryptic/Unreadable Encoding Logic ---
const encodeGrid = (grid: boolean[][]): string => {
  const flat = grid.flat();
  const byteCount = Math.ceil(flat.length / 8);
  const bytes = new Uint8Array(byteCount);
  for (let i = 0; i < flat.length; i++) {
    if (flat[i]) {
      bytes[Math.floor(i / 8)] |= (1 << (i % 8));
    }
  }
  return btoa(String.fromCharCode(...Array.from(bytes)));
};

const decodeGrid = (str: string, size: number): boolean[][] | null => {
  try {
    const raw = atob(str);
    const bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
      bytes[i] = raw.charCodeAt(i);
    }
    
    const grid: boolean[][] = [];
    for (let r = 0; r < size; r++) {
      grid[r] = [];
      for (let c = 0; c < size; c++) {
        const i = r * size + c;
        grid[r][c] = !!(bytes[Math.floor(i / 8)] & (1 << (i % 8)));
      }
    }
    return grid;
  } catch (e) {
    return null;
  }
};
// ------------------------------------------

export const QRCanvas = forwardRef<QRCanvasHandle, QRCanvasProps>(({ size, onDataChange }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridRef = useRef<boolean[][]>([]);
  const isDrawing = useRef(false);
  const drawMode = useRef<boolean>(true); // true = black, false = white
  const lastCell = useRef<{ r: number; c: number } | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const drawWholeGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const canvasSize = canvas.width;
    const cellSize = canvasSize / size;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    
    // Draw to UI
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

    // Draw to Scanner
    const offCtx = offscreenCanvasRef.current?.getContext('2d');
    if (offCtx) {
      offCtx.fillStyle = '#ffffff';
      offCtx.fillRect(0, 0, size * SCALE_FACTOR, size * SCALE_FACTOR);
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (gridRef.current[r][c]) {
            offCtx.fillStyle = '#000000';
            offCtx.fillRect(c * SCALE_FACTOR, r * SCALE_FACTOR, SCALE_FACTOR, SCALE_FACTOR);
          }
        }
      }
      onDataChange(offCtx.getImageData(0, 0, size * SCALE_FACTOR, size * SCALE_FACTOR));
    }
  }, [size, onDataChange]);

  const persistToCookie = useCallback(() => {
    const encoded = encodeGrid(gridRef.current);
    document.cookie = `${COOKIE_NAME_PREFIX}${size}=${encoded}; path=/; max-age=31536000; SameSite=Strict`;
  }, [size]);

  const scheduleSave = useCallback(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(persistToCookie, 1000);
  }, [persistToCookie]);

  const initialize = useCallback(() => {
    // Attempt to load from cookie
    const cookies = document.cookie.split(';');
    const cookieName = `${COOKIE_NAME_PREFIX}${size}=`;
    const found = cookies.find(c => c.trim().startsWith(cookieName));
    
    if (found) {
      const val = found.trim().substring(cookieName.length);
      const decoded = decodeGrid(val, size);
      if (decoded) {
        gridRef.current = decoded;
      } else {
        gridRef.current = Array.from({ length: size }, () => Array(size).fill(false));
      }
    } else {
      gridRef.current = Array.from({ length: size }, () => Array(size).fill(false));
    }
    
    const scanSize = size * SCALE_FACTOR;
    const scanCanvas = document.createElement('canvas');
    scanCanvas.width = scanSize;
    scanCanvas.height = scanSize;
    offscreenCanvasRef.current = scanCanvas;
    
    drawWholeGrid();
    lastCell.current = null;
  }, [size, drawWholeGrid]);

  useImperativeHandle(ref, () => ({
    clear: () => {
      gridRef.current = Array.from({ length: size }, () => Array(size).fill(false));
      persistToCookie();
      drawWholeGrid();
    },
    exportImage: (filename: string) => {
      const mainCanvas = canvasRef.current;
      if (!mainCanvas) return;
      
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = mainCanvas.width;
      tempCanvas.height = mainCanvas.height;
      const tCtx = tempCanvas.getContext('2d');
      if (!tCtx) return;

      const cellSize = tempCanvas.width / size;
      
      // Draw white background
      tCtx.fillStyle = '#ffffff';
      tCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      
      // Draw ONLY the black cells (no grid lines)
      tCtx.fillStyle = '#000000';
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (gridRef.current[r][c]) {
            // Using a tiny overlap (0.5px) to ensure no hairline gaps between cells
            tCtx.fillRect(c * cellSize - 0.2, r * cellSize - 0.2, cellSize + 0.4, cellSize + 0.4);
          }
        }
      }

      const link = document.createElement('a');
      link.download = filename;
      link.href = tempCanvas.toDataURL('image/png');
      link.click();
    }
  }));

  useEffect(() => {
    initialize();
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [initialize]);

  const drawSingleCell = (r: number, c: number, mode: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const cellSize = canvas.width / size;
    
    ctx.fillStyle = mode ? '#111827' : '#ffffff';
    ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);

    const offCtx = offscreenCanvasRef.current?.getContext('2d');
    if (offCtx) {
      offCtx.fillStyle = mode ? '#000000' : '#ffffff';
      offCtx.fillRect(c * SCALE_FACTOR, r * SCALE_FACTOR, SCALE_FACTOR, SCALE_FACTOR);
      onDataChange(offCtx.getImageData(0, 0, size * SCALE_FACTOR, size * SCALE_FACTOR));
    }

    scheduleSave();
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
  }, [size, onDataChange, scheduleSave]);

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
          onPointerDown={(e) => {
            if (e.button !== 0 && e.button !== 2) return;
            isDrawing.current = true;
            drawMode.current = e.button === 0;
            canvasRef.current?.setPointerCapture(e.pointerId);
            handlePointerAction(e);
          }}
          onPointerMove={handlePointerAction}
          onPointerUp={(e) => {
            isDrawing.current = false;
            lastCell.current = null;
            canvasRef.current?.releasePointerCapture(e.pointerId);
          }}
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
});

QRCanvas.displayName = 'QRCanvas';
