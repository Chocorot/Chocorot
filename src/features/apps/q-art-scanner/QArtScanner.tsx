'use client';

import { useState, useCallback } from 'react';
import jsQR from 'jsqr';
import { QRCanvas } from './QRCanvas';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanQrCode, Info, AlertCircle, CheckCircle2 } from 'lucide-react';
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

  const handleDataChange = useCallback((imageData: ImageData) => {
    try {
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code && code.data) {
        setScanResult(code.data);
      } else {
        setScanResult(null);
      }
    } catch (err) {
      console.error('QR Scan error:', err);
      setScanResult(null);
    }
  }, []);

  return (
    <div className="w-full flex flex-col gap-10 animate-in fade-in duration-700">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-card/50 backdrop-blur-xl border border-border p-6 rounded-2xl shadow-xl shadow-primary-500/5">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-500/10 rounded-xl text-primary-600">
            <ScanQrCode className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-foreground">
              {t('title')}
            </h2>
            <p className="text-sm font-medium text-foreground/40 leading-none mt-1">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <div className="flex bg-foreground/5 p-1 rounded-xl border border-border/50">
          {QR_VERSIONS.map((v) => (
            <button
              key={v.id}
              onClick={() => setVersion(v)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all min-w-[80px] ${
                version.id === v.id
                  ? 'bg-background text-primary-600 shadow-sm'
                  : 'text-foreground/40 hover:text-foreground/60'
              }`}
            >
              <span className="block">{v.label}</span>
              <span className={`block text-[10px] opacity-50 font-mono mt-0.5 ${version.id === v.id ? 'opacity-80' : ''}`}>
                {v.size}x{v.size}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Canvas Section */}
        <div className="lg:col-span-12 xl:col-span-7 flex flex-col items-center">
          <QRCanvas 
            key={version.id} 
            size={version.size} 
            onDataChange={handleDataChange} 
          />
        </div>

        {/* Info & Result Section */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6 w-full">
          {/* Result Box */}
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-xl shadow-primary-500/5 flex flex-col gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
               <ScanQrCode className="w-32 h-32" />
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full transition-colors duration-500 ${scanResult ? 'bg-green-500/20 text-green-600' : 'bg-foreground/5 text-foreground/20'}`}>
                {scanResult ? <CheckCircle2 className="w-5 h-5" /> : <Info className="w-5 h-5" />}
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/60">
                {t('scan_status')}
              </h3>
            </div>

            <div className={`min-h-[140px] flex items-center justify-center bg-foreground/[0.02] rounded-xl border border-dashed transition-all duration-500 p-6 text-center ${scanResult ? 'border-green-500/30' : 'border-border'}`}>
              <AnimatePresence mode="wait">
                {scanResult ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col gap-3"
                  >
                    <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em]">
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
                    className="flex flex-col items-center gap-3"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">
                      {t('waiting')}
                    </span>
                    <p className="text-sm text-foreground/40 font-medium">
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
            className="bg-primary-500/[0.03] border border-primary-500/10 rounded-2xl p-6 flex gap-4 items-start"
          >
            <div className="p-2 bg-primary-500/10 rounded-lg text-primary-500">
              <AlertCircle className="w-4 h-4 shrink-0" />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-bold text-primary-600">
                {t('tips_title')}
              </h4>
              <p className="text-xs leading-relaxed text-foreground/60 font-medium">
                {t('tips_content')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
