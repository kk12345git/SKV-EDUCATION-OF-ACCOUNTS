'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Download, Phone, Calendar, Users, Award, BookOpen, Clock } from 'lucide-react';

const stats = [
  { label: 'Students Trained', val: '5,000+', icon: Users, desc: 'Empowered with job skills' },
  { label: 'Placement Support', val: '100%', icon: Award, desc: 'Interview prep & job alerts' },
  { label: 'Specialized Courses', val: '9+', icon: BookOpen, desc: 'Tailored industry curriculum' },
  { label: 'Years of Excellence', val: '15+', icon: Clock, desc: 'Deep accounting experience' }
];

export default function Hero({ onOpenBrochure }: { onOpenBrochure: () => void }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const handleDemoClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('demo-form');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bento-grid-pattern noise-bg bg-light-bg dark:bg-dark-bg transition-colors duration-300"
    >
      {/* Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 dark:bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-secondary/5 dark:bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Slogan */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-primary/20 dark:border-blue-500/30 bg-primary/5 dark:bg-blue-500/5 text-xs font-semibold text-primary dark:text-blue-400 tracking-wider uppercase">
            <span>Learn Today. Lead Tomorrow.</span>
          </div>
        </motion.div>

        {/* Hero Copy */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl lg:text-7xl tracking-tight leading-[1.05] mb-6"
          >
            Become Job-Ready in <br />
            <span className="text-gradient">Accounting & Finance</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Master Tally Prime, GST, SAP, Income Tax, and Advanced Excel with hands-on, practical training. Real client files. Professional certification. 100% job support.
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
          >
            <button
              onClick={handleDemoClick}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Demo Class</span>
            </button>

            <button
              onClick={onOpenBrochure}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card hover:bg-slate-50 dark:hover:bg-slate-900 font-bold text-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Download Syllabus & Pricing</span>
            </button>

            <a
              href="tel:9384662036"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-xl border border-light-border dark:border-dark-border text-slate-700 dark:text-slate-300 font-bold text-sm hover:border-primary dark:hover:border-blue-400 transition-all"
            >
              <Phone className="w-4 h-4 text-primary dark:text-blue-400" />
              <span>Call Admissions</span>
            </a>
          </motion.div>
        </div>

        {/* Bento Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm flex flex-col items-center text-center relative overflow-hidden group"
            >
              {/* Subtle top indicator line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-light-border dark:border-dark-border mb-4 text-primary dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="font-display font-black text-3xl sm:text-4xl text-slate-800 dark:text-white mb-1">
                {stat.val}
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                {stat.label}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {stat.desc}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
