'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MessageCircle, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Popups() {
  const router = useRouter();

  // Scroll Progress State
  const [scrollProgress, setScrollProgress] = useState(0);

  // Modal States
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [showDelayedDemo, setShowDelayedDemo] = useState(false);

  // Form inputs for modals
  const [exitName, setExitName] = useState('');
  const [exitPhone, setExitPhone] = useState('');
  const [demoName, setDemoName] = useState('');
  const [demoPhone, setDemoPhone] = useState('');

  useEffect(() => {
    // 1. Scroll Progress Listener
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // 2. Exit Intent Trigger
    const handleMouseLeave = (e: MouseEvent) => {
      // Check if exit intent was already shown in this session
      const exitShown = sessionStorage.getItem('skv_exit_shown');
      if (e.clientY < 20 && !exitShown) {
        setShowExitIntent(true);
        sessionStorage.setItem('skv_exit_shown', 'true');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    // 3. Delayed Demo Popup (15 seconds delay)
    const timer = setTimeout(() => {
      const demoShown = sessionStorage.getItem('skv_demo_popup_shown');
      const leadsSubmitted = localStorage.getItem('skv_leads');
      if (!demoShown && !leadsSubmitted) {
        setShowDelayedDemo(true);
        sessionStorage.setItem('skv_demo_popup_shown', 'true');
      }
    }, 15000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleExitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exitName || !exitPhone) return;

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'exit_intent_discount',
          name: exitName,
          phone: exitPhone
        })
      });

      if (response.ok) {
        triggerConfetti();
        setShowExitIntent(false);
        router.push(`/thank-you?type=discount&name=${encodeURIComponent(exitName)}`);
        setExitName('');
        setExitPhone('');
      }
    } catch (err) {
      console.error('Failed to submit exit lead:', err);
    }
  };

  const handleDelayedDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoName || !demoPhone) return;

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'delayed_popup_demo',
          name: demoName,
          phone: demoPhone
        })
      });

      if (response.ok) {
        triggerConfetti();
        setShowDelayedDemo(false);
        router.push(`/thank-you?type=demo&name=${encodeURIComponent(demoName)}`);
        setDemoName('');
        setDemoPhone('');
      }
    } catch (err) {
      console.error('Failed to submit delayed demo lead:', err);
    }
  };

  return (
    <>
      {/* 1. Top Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary dark:bg-blue-600 z-50 transition-all origin-left duration-75"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* 2. Floating Mobile Call & WhatsApp sticky actions */}
      <div className="fixed bottom-6 left-6 z-40 md:hidden flex flex-col space-y-3">
        <a
          href="tel:9384662036"
          className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary-light transition-all"
          aria-label="Call Admissions Office"
        >
          <Phone className="w-5 h-5" />
        </a>
        <a
          href="https://wa.me/917010813836"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-all"
          aria-label="Contact WhatsApp Counselor"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
        </a>
      </div>

      {/* 3. Exit Intent Popup Modal */}
      <AnimatePresence>
        {showExitIntent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card shadow-2xl overflow-hidden"
            >
              {/* Top gradient indicator */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-yellow-400" />
              
              <button 
                onClick={() => setShowExitIntent(false)}
                className="absolute top-4 right-4 p-1 rounded-lg border border-light-border dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                aria-label="Close Discount Offer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-6">
                <div className="mx-auto w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="font-display font-black text-xl text-slate-800 dark:text-white leading-tight">
                  Wait! Claim Your 10% Discount
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Don't leave empty-handed. Enter your details to block a 10% discount and claim a Free Accounting Career Consultation Guide.
                </p>
              </div>

              <form onSubmit={handleExitSubmit} className="space-y-4">
                <div>
                  <label htmlFor="exit-name" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="exit-name"
                    required
                    value={exitName}
                    onChange={(e) => setExitName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label htmlFor="exit-phone" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="exit-phone"
                    required
                    value={exitPhone}
                    onChange={(e) => setExitPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-amber-500/10 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Block 10% Discount Now</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Delayed Demo Booking Prompt Modal */}
      <AnimatePresence>
        {showDelayedDemo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card shadow-2xl overflow-hidden"
            >
              {/* Top gradient indicator */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-blue-400" />
              
              <button 
                onClick={() => setShowDelayedDemo(false)}
                className="absolute top-4 right-4 p-1 rounded-lg border border-light-border dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                aria-label="Close Trial Booking Prompt"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-6">
                <h3 className="font-display font-black text-xl text-slate-800 dark:text-white leading-tight">
                  Try a Free Demo Class
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Inspect our labs, meet the expert practitioners, and experience hands-on study slots without spending a rupee.
                </p>
              </div>

              <form onSubmit={handleDelayedDemoSubmit} className="space-y-4">
                <div>
                  <label htmlFor="delayed-name" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="delayed-name"
                    required
                    value={demoName}
                    onChange={(e) => setDemoName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="delayed-phone" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="delayed-phone"
                    required
                    value={demoPhone}
                    onChange={(e) => setDemoPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-500/10 transition-all flex items-center justify-center space-x-2 dark:bg-blue-600"
                >
                  <span>Book Free Demo Class</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
