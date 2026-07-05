'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Calendar, Download, Sparkles, BookOpen, Send } from 'lucide-react';

export default function LeadMagnets() {
  const router = useRouter();

  // Demo Booking State
  const [demoName, setDemoName] = useState('');
  const [demoPhone, setDemoPhone] = useState('');
  const [demoCourse, setDemoCourse] = useState('Tally Prime with GST');
  const [demoTiming, setDemoTiming] = useState('Morning (9 AM - 12 PM)');
  const [demoLoading, setDemoLoading] = useState(false);

  // Guide Download State
  const [guideName, setGuideName] = useState('');
  const [guidePhone, setGuidePhone] = useState('');
  const [guideEmail, setGuideEmail] = useState('');
  const [guideCourse, setGuideCourse] = useState('Tally Prime with GST');
  const [guideLoading, setGuideLoading] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoName || !demoPhone) return;

    setDemoLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'demo_booking',
          name: demoName,
          phone: demoPhone,
          course: demoCourse,
          timing: demoTiming
        })
      });

      if (response.ok) {
        triggerConfetti();
        router.push(`/thank-you?type=demo&name=${encodeURIComponent(demoName)}`);
        setDemoName('');
        setDemoPhone('');
      }
    } catch (err) {
      console.error('Failed to submit demo booking:', err);
    } finally {
      setDemoLoading(false);
    }
  };

  const handleGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideName || !guidePhone || !guideEmail) return;

    setGuideLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'guide_download',
          name: guideName,
          phone: guidePhone,
          email: guideEmail,
          course: guideCourse
        })
      });

      if (response.ok) {
        triggerConfetti();
        router.push(`/thank-you?type=guide&name=${encodeURIComponent(guideName)}`);
        setGuideName('');
        setGuidePhone('');
        setGuideEmail('');
      }
    } catch (err) {
      console.error('Failed to submit guide download:', err);
    } finally {
      setGuideLoading(false);
    }
  };

  return (
    <section 
      id="demo-form" 
      className="py-24 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border transition-colors duration-300 noise-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary dark:text-blue-400 mb-3">
            Get Started
          </h2>
          <p className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-800 dark:text-white leading-tight">
            Book a Free Demo or Download Syllabus
          </p>
          <div className="mt-4 h-1 w-12 bg-primary dark:bg-blue-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Demo Booking Form */}
          <div className="p-6 sm:p-8 rounded-2xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2.5 mb-6">
                <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-primary dark:text-blue-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">
                    Book a Free Demo Class
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Attend a 1-hour trial session to inspect our lab, teaching style, and systems.
                  </p>
                </div>
              </div>

              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div>
                  <label htmlFor="demo-name" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="demo-name"
                    required
                    value={demoName}
                    onChange={(e) => setDemoName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-primary dark:focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="demo-phone" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="demo-phone"
                    required
                    value={demoPhone}
                    onChange={(e) => setDemoPhone(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-primary dark:focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="demo-course" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                      Course Interested
                    </label>
                    <select
                      id="demo-course"
                      value={demoCourse}
                      onChange={(e) => setDemoCourse(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-primary dark:focus:border-blue-500 transition-colors text-slate-700 dark:text-slate-300"
                    >
                      <option>Tally Prime with GST</option>
                      <option>GST</option>
                      <option>SAP</option>
                      <option>Income Tax Returns</option>
                      <option>ESI & PF</option>
                      <option>MS Office</option>
                      <option>TDS & TCS</option>
                      <option>Basic Computer</option>
                      <option>Advanced Excel</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="demo-timing" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                      Preferred Slot
                    </label>
                    <select
                      id="demo-timing"
                      value={demoTiming}
                      onChange={(e) => setDemoTiming(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-primary dark:focus:border-blue-500 transition-colors text-slate-700 dark:text-slate-300"
                    >
                      <option>Morning (9 AM - 12 PM)</option>
                      <option>Evening (4 PM - 9 PM)</option>
                      <option>Flexible 1-Hour Slot</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={demoLoading}
                  className="w-full mt-4 py-3.5 rounded-xl bg-primary hover:bg-primary-light text-white text-sm font-bold uppercase tracking-wider shadow-md shadow-blue-500/10 transition-all flex items-center justify-center space-x-2 disabled:opacity-75"
                >
                  <Send className="w-4 h-4" />
                  <span>{demoLoading ? 'Submitting...' : 'Book Free Demo Class'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Card 2: Lead Magnet Section */}
          <div className="p-6 sm:p-8 rounded-2xl border border-amber-200 dark:border-amber-950 bg-gradient-to-br from-amber-50/40 via-white to-white dark:from-amber-950/10 dark:via-dark-card dark:to-dark-card shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2.5 mb-6">
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white flex items-center gap-1.5">
                    Accounting Career Guide 2026
                    <span className="text-[10px] font-extrabold uppercase bg-amber-500 text-white px-2 py-0.5 rounded-md tracking-wider">
                      Free PDF
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Download our career map and detailed course syllabus to match your goals.
                  </p>
                </div>
              </div>

              <form onSubmit={handleGuideSubmit} className="space-y-4">
                <div>
                  <label htmlFor="guide-name" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="guide-name"
                    required
                    value={guideName}
                    onChange={(e) => setGuideName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="guide-phone" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="guide-phone"
                      required
                      value={guidePhone}
                      onChange={(e) => setGuidePhone(e.target.value)}
                      placeholder="Mobile number"
                      className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="guide-email" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="guide-email"
                      required
                      value={guideEmail}
                      onChange={(e) => setGuideEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="guide-course" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    Course of Interest
                  </label>
                  <select
                    id="guide-course"
                    value={guideCourse}
                    onChange={(e) => setGuideCourse(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 transition-colors text-slate-700 dark:text-slate-300"
                  >
                    <option>Tally Prime with GST</option>
                    <option>GST</option>
                    <option>SAP</option>
                    <option>Income Tax Returns</option>
                    <option>ESI & PF</option>
                    <option>MS Office</option>
                    <option>TDS & TCS</option>
                    <option>Basic Computer</option>
                    <option>Advanced Excel</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={guideLoading}
                  className="w-full mt-4 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold uppercase tracking-wider shadow-md shadow-amber-500/10 transition-all flex items-center justify-center space-x-2 disabled:opacity-75"
                >
                  <Download className="w-4 h-4" />
                  <span>{guideLoading ? 'Preparing PDF...' : 'Download Guide Free'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
