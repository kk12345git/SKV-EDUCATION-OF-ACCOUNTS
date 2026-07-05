'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import CareerGrowth from '@/components/CareerGrowth';
import PlacementSupport from '@/components/PlacementSupport';
import Footer from '@/components/Footer';
import AICourseAdvisor from '@/components/AICourseAdvisor';
import Popups from '@/components/Popups';
import { motion } from 'framer-motion';

export default function CareerPage() {
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
              Career & Placements Path
            </h1>
            <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm sm:text-base">
              See how corporate accounting salaries scale with experience and explore our placement preparation services.
            </p>
          </motion.div>
        </div>

        {/* Salary growth timeline */}
        <CareerGrowth />

        {/* Mock interviews & Placement referals */}
        <PlacementSupport />
      </main>

      <Footer />
      <AICourseAdvisor />
      <Popups />
    </div>
  );
}
