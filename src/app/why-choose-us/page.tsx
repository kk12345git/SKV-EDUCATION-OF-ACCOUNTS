'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import WhyChooseUs from '@/components/WhyChooseUs';
import LearningJourney from '@/components/LearningJourney';
import Footer from '@/components/Footer';
import AICourseAdvisor from '@/components/AICourseAdvisor';
import Popups from '@/components/Popups';
import { motion } from 'framer-motion';

export default function WhyChooseUsPage() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-slate-800 dark:text-slate-200 transition-colors duration-300 relative">
      <Navigation />
      
      <main className="pt-24">
        {/* Header Hero */}
        <div className="py-12 bg-slate-50 dark:bg-[#0D111A] border-b border-light-border dark:border-dark-border text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto px-4"
          >
            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-800 dark:text-white">
              Why SKV Accounts Academy?
            </h1>
            <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm sm:text-base">
              Learn about our teaching principles, practice files configuration, and direct statutory filing workflows.
            </p>
          </motion.div>
        </div>

        {/* Why Choose Us Bento Grid */}
        <WhyChooseUs />

        {/* 6-step Learning Blueprint */}
        <LearningJourney />
      </main>

      <Footer />
      <AICourseAdvisor />
      <Popups />
    </div>
  );
}
