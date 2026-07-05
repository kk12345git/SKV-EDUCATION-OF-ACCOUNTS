'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'What are the batch timings? Can I choose flexible slots?',
    a: 'Yes, absolutely! We offer highly flexible timings. Our morning slot runs from 9:00 AM to 12:00 PM, and our evening slot runs from 4:00 PM to 9:00 PM. Within these windows, you can block any 1-hour slot daily according to your college or job schedule.'
  },
  {
    q: 'Do you offer special fees for college students?',
    a: 'Yes! We support student growth. As shown in our official brochure, college students receive discounts of over 50% on select courses. For example, the GST or Tally Prime course is just ₹6,999 for college students (standard fee: ₹14,999).'
  },
  {
    q: 'Is a course completion certificate provided?',
    a: 'Yes. Upon successfully completing any curriculum, you will receive a course completion certificate from SKV Education of Accounts, validating your practical competence to corporate recruiters.'
  },
  {
    q: 'What does "practical training" mean at SKV?',
    a: 'Unlike generic classes that rely on board theory, SKV gives you access to direct ledger logs, actual client transactions, and live government portal filings. You learn by doing the actual billing, filing, and coding.'
  },
  {
    q: 'Do you guarantee job placements?',
    a: 'We offer 100% placement preparation support. This includes direct referrals to corporate tax teams, mock technical interviews, and resume structuring. While we do not "sell" guaranteed jobs, our network of partner recruiters ensures qualified students get direct interview opportunities.'
  },
  {
    q: 'Can non-commerce (B.Com) students learn accounting?',
    a: 'Yes, definitely! We start from the absolute basics of accounting double-entry systems in our "Basic Computer" and "Tally" courses. Non-commerce students (B.Sc, B.A, engineering) learn easily under our step-by-step mentoring.'
  }
];

export default function FAQs() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section 
      id="faq" 
      className="py-24 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border transition-colors duration-300 grid-bg noise-bg"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-sm sm:text-base font-extrabold uppercase tracking-widest text-primary dark:text-blue-400 mb-3">
            Common Inquiries
          </h2>
          <p className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-800 dark:text-white leading-tight">
            Frequently Asked Questions
          </p>
          <div className="mt-4 h-1 w-12 bg-primary dark:bg-blue-500 mx-auto rounded-full" />
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-display font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200">
                    {faq.q}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-light-border dark:border-dark-border bg-slate-50/30 dark:bg-slate-900/10">
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
