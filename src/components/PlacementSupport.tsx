'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, ArrowUpRight, GraduationCap, CheckCircle } from 'lucide-react';

const steps = [
  {
    title: 'Resume Crafting Workshops',
    desc: 'Transform your resume into a corporate recruiter magnet. Learn to highlight practical tax filings and Tally entries rather than generic bullet points.',
    icon: FileText
  },
  {
    title: 'Simulated Mock Interviews',
    desc: 'Regular practice sessions with chartered accountants and tax experts. We grill you on ledger accounts, SAP codes, and GST sections until you are flawless.',
    icon: Users
  },
  {
    title: 'Direct Recruiter Referrals',
    desc: 'We maintain direct channels with leading accounting firms, corporate tax teams, and SME businesses across Chennai to pass your profile directly.',
    icon: ArrowUpRight
  },
  {
    title: 'Career Paths Planning',
    desc: 'Understand the landscape. Decide between becoming an in-house payroll associate, a SAP consultant, or a freelance GST practitioner.',
    icon: GraduationCap
  }
];

// Typographic corporate logos for mock presentation
const corporatePartners = [
  { name: 'Wipro', logo: 'WIPRO' },
  { name: 'Cognizant', logo: 'CTS' },
  { name: 'Zoho', logo: 'ZOHO' },
  { name: 'TCS', logo: 'TCS' },
  { name: 'Sutherland', logo: 'SUTHERLAND' },
  { name: 'R.K. Tax Firms', logo: 'R.K. TAX' }
];

export default function PlacementSupport() {
  return (
    <section 
      id="placement" 
      className="py-24 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border transition-colors duration-300 grid-bg noise-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-sm sm:text-base font-extrabold uppercase tracking-widest text-primary dark:text-blue-400 mb-3">
            Career Onboarding
          </h2>
          <p className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-800 dark:text-white leading-tight">
            100% Placement Preparation Support
          </p>
          <div className="mt-4 h-1 w-12 bg-primary dark:bg-blue-500 mx-auto rounded-full" />
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            Getting certified is only half the job. We actively prepare you to face and crack real-world corporate interviews.
          </p>
        </div>

        {/* Support Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm flex items-start space-x-4 group"
            >
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-light-border dark:border-dark-border text-primary dark:text-blue-400 shrink-0 group-hover:scale-105 transition-transform duration-200">
                <step.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-slate-800 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Corporate logos marquee simulation */}
        <div className="max-w-4xl mx-auto text-center border-t border-light-border dark:border-dark-border pt-12">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6 block">
            Our Students Secure Roles at Top Corporates & Tax Offices
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 opacity-50 dark:opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            {corporatePartners.map((partner, idx) => (
              <div 
                key={idx} 
                className="font-display font-black text-sm tracking-widest text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
              >
                {partner.logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
