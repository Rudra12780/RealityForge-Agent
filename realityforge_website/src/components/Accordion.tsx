import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

export const Accordion: React.FC<{ items: AccordionItem[] }> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 dark:border-[#353750] bg-white dark:bg-[#252637] overflow-hidden transition-all duration-200 shadow-sm"
          >
            <button
              onClick={() => toggle(item.id)}
              type="button"
              className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-indigo-500' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-[#353750]/60 pt-3">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
