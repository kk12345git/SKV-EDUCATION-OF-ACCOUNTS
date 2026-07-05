'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { X, Download, ArrowRight, Clock, Award, BookOpen, CheckCircle, TrendingUp } from 'lucide-react';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import AICourseAdvisor from '@/components/AICourseAdvisor';
import Popups from '@/components/Popups';

// Top 3 featured courses for home page preview
const featuredCourses = [
  {
    name: 'Tally Prime with GST',
    category: 'Accounting',
    fees: 14999,
    collegeFees: 6999,
    duration: '2 Months (Daily slots)',
    eligibility: '12th Pass / Graduate / B.Com',
    avgSalary: '₹2.5L - ₹4.5L/year',
    skills: ['Tally Prime Ledger', 'Voucher Entry', 'GST Invoicing', 'Bank Reconciliation'],
    desc: 'Complete ledger accounting and inventory control software training, synced with modern GST rules.'
  },
  {
    name: 'GST (Goods & Services Tax)',
    category: 'Taxation',
    fees: 14999,
    collegeFees: 6999,
    duration: '1.5 Months',
    eligibility: 'Graduates / Accountants / Owners',
    avgSalary: '₹3.0L - ₹5.5L/year',
    skills: ['GSTR-1 & 3B filings', 'ITC Reconciliation', 'GST Online returns'],
    desc: 'End-to-end practical GST coursework covering online registration, monthly return filings, and credits.'
  },
  {
    name: 'SAP (FICO / MM / HR)',
    category: 'Accounting',
    fees: 34999,
    collegeFees: 29999,
    duration: '3.5 Months',
    eligibility: 'B.Com / M.Com / MBA Finance',
    avgSalary: '₹4.5L - ₹9.0L/year',
    skills: ['GL configurations', 'AP & AR accounts', 'Asset postings'],
    desc: 'Professional ERP training covering SAP Financial Accounting (FI) and Controlling (CO) transactions.'
  }
];

export default function Home() {
  const router = useRouter();
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [brochureName, setBrochureName] = useState('');
  const [brochurePhone, setBrochurePhone] = useState('');
  const [brochureEmail, setBrochureEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBrochureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brochureName || !brochurePhone || !brochureEmail) return;

    setLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'brochure_popup_download',
          name: brochureName,
          phone: brochurePhone,
          email: brochureEmail
        })
      });

      if (response.ok) {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
        router.push(`/thank-you?type=guide&name=${encodeURIComponent(brochureName)}`);
        setShowBrochureModal(false);
        setBrochureName('');
        setBrochurePhone('');
        setBrochureEmail('');
      }
    } catch (err) {
      console.error('Failed to submit brochure request:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-slate-800 dark:text-slate-200 transition-colors duration-300 relative">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <Hero onOpenBrochure={() => setShowBrochureModal(true)} />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Home Page Featured Courses Preview */}
        <section className="py-24 bg-slate-50 dark:bg-[#0D111A] border-t border-light-border dark:border-dark-border transition-colors duration-300 noise-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display text-sm sm:text-base font-extrabold uppercase tracking-widest text-primary dark:text-blue-400 mb-3">
                Featured Programs
              </h2>
              <p className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-800 dark:text-white leading-tight">
                Our Most Popular Accounting Courses
              </p>
              <div className="mt-4 h-1 w-12 bg-primary dark:bg-blue-500 mx-auto rounded-full" />
            </div>

            {/* Courses Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
              {featuredCourses.map((course, idx) => (
                <div 
                  key={idx}
                  className="rounded-2xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card shadow-sm flex flex-col justify-between overflow-hidden group hover:shadow-md transition-all duration-300"
                >
                  <div className="p-6 pb-4 border-b border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2.5 py-1 rounded-md">
                        {course.category}
                      </span>
                      <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <h3 className="font-display font-black text-xl text-slate-800 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                      {course.name}
                    </h3>
                  </div>

                  <div className="p-6 flex-grow">
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                      {course.desc}
                    </p>
                    <div className="mb-6">
                      <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Topics Covered
                      </h4>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                        {course.skills.map((skill, sIdx) => (
                          <div key={sIdx} className="flex items-start space-x-1">
                            <CheckCircle className="w-3 h-3 text-accent mt-0.5 shrink-0" />
                            <span className="text-[11px] text-slate-600 dark:text-slate-400 truncate" title={skill}>
                              {skill}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-light-border dark:border-dark-border">
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase">Standard Price</span>
                        <span className="text-xs font-black text-slate-700 dark:text-slate-300 block">
                          ₹{course.fees.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] font-extrabold text-amber-600 uppercase">Offer Price</span>
                        <span className="text-xs font-black text-amber-600 dark:text-amber-400 block">
                          ₹{course.collegeFees.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t border-light-border dark:border-dark-border mt-auto">
                    <Link
                      href={`/enroll?course=${encodeURIComponent(course.name)}`}
                      className="w-full py-3 rounded-xl bg-slate-50 border border-light-border text-slate-800 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-850 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-1"
                    >
                      <span>Enroll / Register</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Link to Courses route */}
            <div className="text-center">
              <Link
                href="/courses"
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-sm shadow-md shadow-blue-500/10 transition-all hover:-translate-y-0.5 active:translate-y-0 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                <span>Explore All 9 Courses & Syllabus</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />
      </main>

      <Footer />

      <AICourseAdvisor />
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
