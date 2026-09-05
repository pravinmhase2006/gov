import React, { useState, useEffect } from 'react';
import Link from '@/components/common/Link';
import { Flame } from 'lucide-react';
import { dataService } from '@/services/dataService';

export default function LiveTicker() {
  const [tickerItems, setTickerItems] = useState<{ id: string; title: string; link: string; tag: string }[]>([]);

  useEffect(() => {
    let isMounted = true;
    async function loadTickers() {
      const data = await dataService.getTickers();
      if (isMounted && data && data.length > 0) {
        setTickerItems(data);
      }
    }
    loadTickers();
    const interval = setInterval(loadTickers, 30000); // 30s auto-refresh
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (tickerItems.length === 0) return null;

  return (
    <div className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs font-medium border-b border-slate-200 dark:border-slate-800 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center">
        <div className="flex items-center gap-1.5 bg-saffron-500 text-white px-2.5 py-0.5 rounded-full text-[10px] font-black shrink-0 uppercase tracking-wider shadow-xs animate-pulse">
          <Flame className="w-3.5 h-3.5" />
          <span>Live Updates</span>
        </div>

        <div className="overflow-hidden relative flex-1 ml-3">
          <div className="animate-ticker flex items-center gap-8">
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <Link
                key={`${item.id}-${idx}`}
                href={item.link}
                className="inline-flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap text-[11px]"
              >
                <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] px-1.5 py-0.2 rounded font-bold border border-blue-200 dark:border-blue-800">
                  {item.tag}
                </span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{item.title}</span>
                <span className="text-slate-400 mx-2">•</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

