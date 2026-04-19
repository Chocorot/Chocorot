'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Hash } from 'lucide-react';
import { useTranslations } from 'next-intl';

const PI_VALUE: string = "3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132000568127145263560827785771342757789609173637178721468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771309960518707211349999998372978049951059731732816096318595024459455346908302642522308253344685035261931188171010003137838752886587533208381420617177669147303598253490428755468731159562863882353787593751957781857780532171226806613001927876611195909216420198";

export function PiDisplay() {
  const t = useTranslations('Apps.PiDisplay');
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (): void => {
    navigator.clipboard.writeText(PI_VALUE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full card-standard flex flex-col gap-8 shadow-xl shadow-amber-500/5 overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-amber-600">
          <Hash className="w-6 h-6" />
          Value of Pi
        </h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-amber-500/10 text-amber-600 hover:bg-amber-500 hover:text-white transition-all font-medium text-sm"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? t('copied') : t('copy')}
        </button>
      </div>

      <div className="relative group">
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-card to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none" />
        
        <div className="p-8 bg-foreground/[0.02] border border-border rounded-lg max-h-[400px] overflow-y-auto scrollbar-hide">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl md:text-3xl font-mono leading-relaxed break-all text-foreground/80"
          >
            <span className="text-amber-600 font-bold">3.</span>
            {PI_VALUE.slice(2).split('').map((digit, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.005, duration: 0.2 }}
              >
                {digit}
              </motion.span>
            ))}
          </motion.p>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-center text-sm text-foreground/40 font-medium italic">
        <p>{t('showing')}</p>
        <p className="text-[10px] uppercase tracking-widest bg-amber-500/5 py-1 px-3 rounded-full self-center border border-amber-500/10">
          {t('infinite')}
        </p>
      </div>
    </div>
  );
}
