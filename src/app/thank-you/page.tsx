'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, MessageCircle, Download, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

function ThankYouContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState('Student');
  const [submissionType, setSubmissionType] = useState('demo');

  useEffect(() => {
    // Fire confetti on enter
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    const type = searchParams.get('type') || 'demo';
    const userName = searchParams.get('name') || 'Student';
    
    setSubmissionType(type);
    setName(userName);
  }, [searchParams]);

  const getHeading = () => {
    if (submissionType === 'guide') return 'Your Career Guide is Ready!';
    if (submissionType === 'discount') return '10% Discount Coupon Reserved!';
    return 'Demo Class Booking Confirmed!';
  };

  const getMessage = () => {
    if (submissionType === 'guide') {
      return `Thank you, ${name}. We have generated your Free Accounting Career Guide 2026. You can download your copy instantly below.`;
    }
    if (submissionType === 'discount') {
      return `Congratulations, ${name}! Your flat 10% discount voucher has been reserved under your phone number. Let's connect on WhatsApp to confirm your batch.`;
    }
    return `Excellent choice, ${name}! Your seat request for the free demo class has been registered. Our admissions counselor will call you in 1-2 hours to confirm your 1-hour slots.`;
  };

  return (
    <main className="min-h-screen bento-grid-pattern noise-bg bg-light-bg dark:bg-dark-bg flex items-center justify-center p-4 transition-colors duration-300">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 dark:bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg p-6 sm:p-10 rounded-3xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card shadow-2xl relative overflow-hidden text-center z-10"
      >
        {/* Top visual strip */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-blue-500 to-accent" />
        
        {/* Logo Branding */}
        <div className="flex justify-center mb-6">
          <div className="relative w-12 h-12 overflow-hidden rounded-xl bg-white border border-light-border dark:border-slate-800 p-1">
            <Image
              src="/SKV LOGO.jpeg"
              alt="SKV Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Check Circle */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 text-green-600 dark:text-green-400 flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8" />
        </div>

        <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-800 dark:text-white leading-tight mb-4">
          {getHeading()}
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
          {getMessage()}
        </p>

        {/* Dynamic Actions */}
        <div className="space-y-3 mb-8">
          {submissionType === 'guide' && (
            <a
              href="data:text/plain;charset=utf-8,SKV%2520Education%2520Syllabus%2520And%2520Pricing%2520Brochure"
              download="SKV_Accounting_Career_Guide_2026.txt"
              className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-amber-500/10 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Guide Instantly</span>
            </a>
          )}

          <a
            href="https://wa.me/917010813836?text=Hi%20SKV%20Education,%20I%20just%2520submitted%2520a%2520form%2520online%2520and%2520would%2520like%2520to%2520coordinate%252520my%252520slots."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-green-500/10 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Connect on WhatsApp</span>
          </a>
        </div>

        <hr className="border-light-border dark:border-dark-border mb-6" />

        <button
          onClick={() => router.push('/')}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-400 hover:text-slate-800 dark:text-slate-500 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home Page</span>
        </button>
      </motion.div>
    </main>
  );
}

export default function ThankYou() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <span className="text-slate-400 font-bold text-sm">Loading...</span>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
