'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Play, CheckCircle } from 'lucide-react';

const testimonials = [
  {
    name: 'Karthik Raja',
    role: 'Tax Consultant at R.K. Associates',
    course: 'GST + Income Tax Returns',
    rating: 5,
    quote: 'SKV taught me how to file GSTR-1 and ITR from scratch. Standard theory classes elsewhere were confusing, but practicing here on real company ledger entries gave me the confidence to handle client profiles independently.',
    avatar: 'K'
  },
  {
    name: 'Priya Dharshini',
    role: 'Accounts Executive at TechZone',
    course: 'Tally Prime with GST + Adv Excel',
    rating: 5,
    quote: 'The flexible 1-hour slots were perfect during my college. I could attend classes after my shift. Within a month of graduating, I got placed as an accounts executive with solid pay. The certification is highly valued!',
    avatar: 'P'
  },
  {
    name: 'Suresh Kumar',
    role: 'SAP End-User at Wipro Chennai',
    course: 'SAP (FI/CO Module)',
    rating: 5,
    quote: 'The SAP FICO training is absolute corporate standard. Trainers explain enterprise setups step-by-step. The regular mock interview preparations and placement alerts helped me crack my first MNC interview.',
    avatar: 'S'
  }
];

export default function Testimonials() {
  return (
    <section 
      id="testimonials" 
      className="py-24 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border transition-colors duration-300 noise-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary dark:text-blue-400 mb-3">
            Success Stories
          </h2>
          <p className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-800 dark:text-white leading-tight">
            Trusted by 5,000+ Students
          </p>
          <div className="mt-4 h-1 w-12 bg-primary dark:bg-blue-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-center">
          {/* Google Review Cards - Left/Top */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                4.9/5 Rating based on Google Reviews
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {testimonials.map((test, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm flex flex-col sm:flex-row gap-4 items-start relative group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary dark:bg-blue-950 dark:text-blue-400 font-extrabold flex items-center justify-center text-sm shrink-0">
                    {test.avatar}
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <div>
                        <h4 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-1">
                          {test.name}
                          <CheckCircle className="w-3.5 h-3.5 text-accent fill-white dark:fill-[#0A0A0A]" />
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block sm:inline">
                          {test.role}
                        </span>
                      </div>
                      <div className="flex text-amber-500 mt-1 sm:mt-0">
                        {[...Array(test.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">
                      "{test.quote}"
                    </p>
                    <div className="mt-3 text-[10px] font-bold text-primary dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 px-2 py-0.5 w-fit rounded-md uppercase">
                      {test.course}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Video Testimonial Mockup - Right/Bottom */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden border border-light-border dark:border-dark-border bg-slate-900 aspect-video shadow-lg group"
            >
              {/* Overlay with grid/noise */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-10" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent z-10" />
              
              {/* Play Button Mockup */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-4 text-center">
                <button 
                  className="w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4 focus:outline-none"
                  aria-label="Play Student Review Video"
                >
                  <Play className="w-7 h-7 fill-current translate-x-0.5" />
                </button>
                <h4 className="font-display font-bold text-white text-base">
                  Watch Priya's Placement Journey
                </h4>
                <p className="text-slate-300 text-[11px] mt-1">
                  Placed as Accounts Exec at TechZone within 30 days of graduation
                </p>
              </div>

              {/* Background simulated image */}
              <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-slate-800 flex items-center justify-center">
                <span className="text-slate-600 font-bold text-sm">Classroom Video Mockup</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
