'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, BookOpen, GraduationCap, Briefcase, DollarSign, Clock, LayoutGrid, Award, CheckCircle } from 'lucide-react';

const reasons = [
  {
    title: 'Practical Industry Training',
    desc: 'Skip pure theory. Work directly on actual company tax filings, real invoices, and live company profiles to build genuine competence.',
    icon: Cpu,
    cols: 'col-span-1 sm:col-span-2 lg:col-span-2',
    color: 'from-blue-500/10 to-indigo-500/10'
  },
  {
    title: 'Real Company Accounts',
    desc: 'Practice on authentic business datasets, Tally files, and actual trade accounts, preparing you for real day-one responsibilities.',
    icon: BookOpen,
    cols: 'col-span-1',
    color: 'from-amber-500/10 to-orange-500/10'
  },
  {
    title: 'Expert Trainers',
    desc: 'Learn directly from seasoned tax consultants and corporate accounting professionals who know what employers expect.',
    icon: GraduationCap,
    cols: 'col-span-1',
    color: 'from-emerald-500/10 to-teal-500/10'
  },
  {
    title: 'Placement Support',
    desc: 'Receive direct interview alerts, company referrals, resume building reviews, and mock interview preparations to secure your job.',
    icon: Briefcase,
    cols: 'col-span-1 sm:col-span-2 lg:col-span-2',
    color: 'from-violet-500/10 to-purple-500/10'
  },
  {
    title: 'Affordable Fees',
    desc: 'Get standard corporate-level training at half the market rates. Exclusive student pricing models starting at ₹2,999.',
    icon: DollarSign,
    cols: 'col-span-1',
    color: 'from-pink-500/10 to-rose-500/10'
  },
  {
    title: 'Flexible Timings',
    desc: 'Choose from multiple hourly slots between 9:00 AM – 12:00 PM and 4:00 PM – 9:00 PM, perfect for college students and working professionals.',
    icon: Clock,
    cols: 'col-span-1',
    color: 'from-cyan-500/10 to-sky-500/10'
  },
  {
    title: 'Live Practice Lab',
    desc: 'Unrestricted hands-on computer system access during your course timing. No slides—just pure system training and direct teacher support.',
    icon: LayoutGrid,
    cols: 'col-span-1 sm:col-span-2 lg:col-span-2',
    color: 'from-indigo-500/10 to-sky-500/10'
  },
  {
    title: 'Course Certification',
    desc: 'Receive a recognized course completion certificate validating your professional accounting capabilities to corporate recruiters.',
    icon: Award,
    cols: 'col-span-1',
    color: 'from-green-500/10 to-emerald-500/10'
  },
  {
    title: 'Interview Support',
    desc: 'Regular mock Q&A training, resume building sessions, and personality training to build confidence for your job applications.',
    icon: CheckCircle,
    cols: 'col-span-1',
    color: 'from-fuchsia-500/10 to-purple-500/10'
  }
];

export default function WhyChooseUs() {
  return (
    <section 
      id="why-choose-us" 
      className="py-24 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border transition-colors duration-300 noise-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary dark:text-blue-400 mb-3">
            Why Choose SKV
          </h2>
          <p className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-800 dark:text-white leading-tight">
            Designed for Real-World Competence
          </p>
          <div className="mt-4 h-1 w-12 bg-primary dark:bg-blue-500 mx-auto rounded-full" />
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Most institutes teach accounting concepts on whiteboards. At SKV, we give you access to standard ledger tools, tax accounts, and actual company filings.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
              className={`p-6 rounded-2xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm flex flex-col group relative overflow-hidden ${reason.cols}`}
            >
              {/* Highlight Gradient Overlay on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
              
              <div className="relative z-10">
                <div className="p-3 w-fit rounded-xl bg-slate-50 dark:bg-slate-900 border border-light-border dark:border-dark-border text-primary dark:text-blue-400 group-hover:scale-105 transition-transform duration-300 mb-4">
                  <reason.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white mb-2">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
