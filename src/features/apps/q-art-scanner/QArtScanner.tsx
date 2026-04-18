'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import jsQR from 'jsqr';
import { QRCanvas, QRCanvasHandle } from './QRCanvas';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanQrCode, Info, AlertCircle, CheckCircle2, RotateCcw, X, AlertTriangle, Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

const QR_VERSIONS = [
  { id: 1, size: 21, label: 'Version 1' },
  { id: 2, size: 25, label: 'Version 2' },
  { id: 3, size: 29, label: 'Version 3' },
];

export function QArtScanner() {
  const t = useTranslations('Apps.QArtScanner');
  const [version, setVersion] = useState(QR_VERSIONS[0]);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  
  const canvasRef = useRef<QRCanvasHandle>(null);
  
  // Throttle state
  const lastImageData = useRef<ImageData | null>(null);
  const lastScanTime = useRef<number>(0);
  const scanTimer = useRef<NodeJS.Timeout | null>(null);

  const performScan = useCallback(() => {
    if (!lastImageData.current) return;
    
    const imageData = lastImageData.current;
    try {
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      setScanResult(code?.data || null);
    } catch (err) {
      console.error('QR Scan error:', err);
      setScanResult(null);
    }
    
    lastScanTime.current = Date.now();
    if (scanTimer.current) {
      clearTimeout(scanTimer.current);
      scanTimer.current = null;
    }
  }, []);

  const handleDataChange = useCallback((imageData: ImageData) => {
    lastImageData.current = imageData;
    const now = Date.now();
    const timeSinceLastScan = now - lastScanTime.current;

    if (timeSinceLastScan >= 500) {
      performScan();
    } else if (!scanTimer.current) {
      scanTimer.current = setTimeout(performScan, 500 - timeSinceLastScan);
    }
  }, [performScan]);

  const handleExport = () => {
    const filename = `q-art-${version.label.toLowerCase().replace(' ', '-')}-${scanResult || 'unscanned'}.png`;
    canvasRef.current?.exportImage(filename);
  };

  const handleReset = () => {
    canvasRef.current?.clear();
    setScanResult(null);
    setShowResetModal(false);
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (scanTimer.current) clearTimeout(scanTimer.current);
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-10 animate-in fade-in duration-700">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-card/30 backdrop-blur-xl border border-border p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-500/10 rounded-xl text-primary-600">
            <ScanQrCode className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tighter text-foreground uppercase">
              {t('title')}
            </h2>
            <div className="flex items-center gap-2 mt-1">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/20 leading-none">
                {t('subtitle')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-foreground/5 p-1 rounded-xl border border-border/50">
            {QR_VERSIONS.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setVersion(v);
                  setScanResult(null);
                  lastImageData.current = null;
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all min-w-[80px] ${
                  version.id === v.id
                    ? 'bg-background text-primary-600 shadow-sm'
                    : 'text-foreground/40 hover:text-foreground/60'
                }`}
              >
                <span className="block">{v.label}</span>
                <span className={`block text-[10px] opacity-30 font-mono mt-0.5 ${version.id === v.id ? 'opacity-80' : ''}`}>
                  {v.size}x{v.size}
                </span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="p-3 rounded-xl bg-primary-500/5 border border-primary-500/10 text-primary-500 hover:bg-primary-500/10 hover:border-primary-500/20 transition-all active:scale-95 flex items-center gap-2 group"
              title={t('export_image')}
            >
              <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest pr-1 hidden sm:block">
                Export
              </span>
            </button>
            <button
              onClick={() => setShowResetModal(true)}
              className="p-3 rounded-xl bg-red-500/5 border border-red-500/10 text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all active:scale-95 group"
              title={t('clear_canvas')}
            >
              <RotateCcw className="w-5 h-5 group-hover:rotate-[-90deg] transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Canvas Section */}
        <div className="lg:col-span-12 xl:col-span-7 flex flex-col items-center">
          <QRCanvas 
            ref={canvasRef}
            key={version.id} 
            size={version.size} 
            onDataChange={handleDataChange} 
          />
        </div>

        {/* Info & Result Section */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6 w-full">
          {/* Result Box */}
          <div className="bg-card/20 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-xl flex flex-col gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
               <ScanQrCode className="w-32 h-32" />
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full transition-colors duration-500 ${scanResult ? 'bg-green-500/20 text-green-600' : 'bg-foreground/5 text-foreground/20'}`}>
                {scanResult ? <CheckCircle2 className="w-5 h-5" /> : <Info className="w-5 h-5" />}
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-foreground/40">
                {t('scan_status')}
              </h3>
            </div>

            <div className={`min-h-[140px] flex items-center justify-center bg-foreground/[0.01] rounded-xl border border-dashed transition-all duration-500 p-6 text-center ${scanResult ? 'border-green-500/30 bg-green-500/[0.02]' : 'border-border'}`}>
              <AnimatePresence mode="wait">
                {scanResult ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col gap-3"
                  >
                    <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.3em]">
                      {t('match_found')}
                    </span>
                    <p className="text-xl font-mono break-all text-foreground leading-relaxed selection:bg-green-500/20">
                      {scanResult}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/20">
                      {t('waiting')}
                    </span>
                    <p className="text-xs text-foreground/30 font-medium max-w-[200px]">
                      {t('not_detected')}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Tips Box */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-primary-500/[0.02] border border-primary-500/10 rounded-2xl p-6 flex gap-4 items-start"
          >
            <div className="p-2 bg-primary-500/10 rounded-lg text-primary-500">
              <AlertCircle className="w-4 h-4 shrink-0" />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-xs font-black uppercase tracking-wider text-primary-600">
                {t('tips_title')}
              </h4>
              <p className="text-[11px] leading-relaxed text-foreground/50 font-medium">
                {t('tips_content')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetModal(false)}
              className="absolute inset-0 bg-background/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-card border border-border p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center gap-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                <AlertTriangle className="w-8 h-8" />
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-black uppercase tracking-tight text-foreground">
                  {t('clear_confirm_title')}
                </h3>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  {t('clear_confirm_desc')}
                </p>
              </div>

              <div className="flex flex-col w-full gap-3 mt-2">
                <button
                  onClick={handleReset}
                  className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-colors shadow-lg shadow-red-500/20 active:scale-95 transition-all"
                >
                  {t('confirm')}
                </button>
                <button
                  onClick={() => setShowResetModal(false)}
                  className="w-full py-4 bg-foreground/5 hover:bg-foreground/10 text-foreground/60 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors active:scale-95 transition-all"
                >
                  {t('cancel')}
                </button>
              </div>

              <button 
                onClick={() => setShowResetModal(false)}
                className="absolute top-4 right-4 p-2 text-foreground/20 hover:text-foreground/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
