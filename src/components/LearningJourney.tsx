'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, LogIn, BookOpen, Database, Award, ClipboardCheck, Briefcase } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Register & Enroll',
    desc: 'Select your target curriculum, block your preferred 1-hour daily slot (morning or evening), and start learning.',
    icon: LogIn
  },
  {
    step: '02',
    title: 'Expert Lectures',
    desc: 'Learn directly from professional tax practitioners. Skip theoretical slide decks and focus on actual tax guidelines.',
    icon: BookOpen
  },
  {
    step: '03',
    title: 'Practical Lab Practice',
    desc: 'Work on actual Tally ledgers, GST portals, SAP servers, and live enterprise case files for authentic competence.',
    icon: Database
  },
  {
    step: '04',
    title: 'Credential Certification',
    desc: 'Pass your curriculum checks and receive a recognized corporate accounting certificate validating your skills.',
    icon: Award
  },
  {
    step: '05',
    title: 'Mock Interview Prep',
    desc: 'Receive expert resume editing, practice core technical accounts interviews, and build confidence.',
    icon: ClipboardCheck
  },
  {
    step: '06',
    title: 'Direct Job Referral',
    desc: 'Access our direct partner recruitment lists, get referred to Chennai firms, and secure your accounting job.',
    icon: Briefcase
  }
];

export default function LearningJourney() {
  return (
    <section 
      id="journey" 
      className="py-24 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border transition-colors duration-300 grid-bg noise-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-sm sm:text-base font-extrabold uppercase tracking-widest text-primary dark:text-blue-400 mb-3">
            Our Method
          </h2>
          <p className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-800 dark:text-white leading-tight">
            The SKV 6-Step Career Blueprint
          </p>
          <div className="mt-4 h-1 w-12 bg-primary dark:bg-blue-500 mx-auto rounded-full" />
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            From basic training to corporate onboarding, we manage your entire educational and preparation lifecycle.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
              className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-light-border dark:border-dark-border text-primary dark:text-blue-400 group-hover:scale-105 transition-transform duration-300">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="font-display font-black text-3xl text-slate-200 dark:text-slate-800 tracking-tight">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
