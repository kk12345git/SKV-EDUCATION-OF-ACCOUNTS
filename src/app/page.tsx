'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { X, Download } from 'lucide-react';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import Courses from '@/components/Courses';
import CareerGrowth from '@/components/CareerGrowth';
import LearningJourney from '@/components/LearningJourney';
import Testimonials from '@/components/Testimonials';
import PlacementSupport from '@/components/PlacementSupport';
import LeadMagnets from '@/components/LeadMagnets';
import AICourseAdvisor from '@/components/AICourseAdvisor';
import FAQs from '@/components/FAQs';
import Footer from '@/components/Footer';
import Popups from '@/components/Popups';

export default function Home() {
  const router = useRouter();
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [brochureName, setBrochureName] = useState('');
  const [brochurePhone, setBrochurePhone] = useState('');
  const [brochureEmail, setBrochureEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBrochureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brochureName || !brochurePhone || !brochureEmail) return;

    setLoading(true);
    setTimeout(() => {
      // Store lead details
      const leads = JSON.parse(localStorage.getItem('skv_leads') || '[]');
      leads.push({
        type: 'brochure_popup_download',
        name: brochureName,
        phone: brochurePhone,
        email: brochureEmail,
        date: new Date().toISOString()
      });
      localStorage.setItem('skv_leads', JSON.stringify(leads));

      // Trigger Confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });

      setLoading(false);
      setShowBrochureModal(false);
      router.push(`/thank-you?type=guide&name=${encodeURIComponent(brochureName)}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-slate-800 dark:text-slate-200 transition-colors duration-300 relative">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <Hero onOpenBrochure={() => setShowBrochureModal(true)} />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Courses Section */}
        <Courses />

        {/* Career Growth Timeline */}
        <CareerGrowth />

        {/* Learning Journey step section */}
        <LearningJourney />

        {/* Testimonials */}
        <Testimonials />

        {/* Placement Support */}
        <PlacementSupport />

        {/* Lead Capture Hub (Forms) */}
        <LeadMagnets />

        {/* FAQs */}
        <FAQs />
      </main>

      <Footer />

      {/* Global Interactive Chat Advisor */}
      <AICourseAdvisor />

      {/* Scroll trackers & Mobile quick tabs */}
      <Popups />

      {/* Brochure Download Form Modal */}
      <AnimatePresence>
        {showBrochureModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card shadow-2xl overflow-hidden"
            >
              {/* Top border strip */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-blue-400" />
              
              <button 
                onClick={() => setShowBrochureModal(false)}
                className="absolute top-4 right-4 p-1 rounded-lg border border-light-border dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                aria-label="Close Brochure Modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-6">
                <h3 className="font-display font-black text-xl text-slate-800 dark:text-white leading-tight">
                  Download Full Syllabus & Fees
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Enter your details to receive the comprehensive course guide and detailed pricing sheets.
                </p>
              </div>

              <form onSubmit={handleBrochureSubmit} className="space-y-4">
                <div>
                  <label htmlFor="modal-name" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="modal-name"
                    required
                    value={brochureName}
                    onChange={(e) => setBrochureName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="modal-phone" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="modal-phone"
                    required
                    value={brochurePhone}
                    onChange={(e) => setBrochurePhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="modal-email" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    required
                    value={brochureEmail}
                    onChange={(e) => setBrochureEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-500/10 transition-all flex items-center justify-center space-x-2 disabled:opacity-75"
                >
                  <Download className="w-4 h-4" />
                  <span>{loading ? 'Preparing files...' : 'Download Syllabus (PDF)'}</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
