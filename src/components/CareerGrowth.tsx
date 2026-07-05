'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, UserCheck, Briefcase, ChevronRight, Award, Compass } from 'lucide-react';

const roles = [
  { title: 'Accounts Executive', desc: 'Manage ledger postings, reconciliations, invoice entries, and day-to-day accounts operations.' },
  { title: 'GST Executive', desc: 'Compute monthly liability, execute GSTR-1/3B filing, and reconcile purchase inputs (ITC).' },
  { title: 'Tax Consultant', desc: 'Advise on personal taxation, file client ITRs, structure deductions, and manage compliance audits.' },
  { title: 'SAP Executive / End-User', desc: 'Log and manage high-volume postings in SAP ERP modules (FI/CO/MM) for multinational corporations.' },
  { title: 'Payroll Analyst', desc: 'Structure salary slips, process monthly ESI & PF deductions, and manage statutory employee filings.' },
  { title: 'Accountant', desc: 'Supervise primary books, prepare balance sheets, oversee cash flows, and coordinate with audits.' }
];

const timelineData = [
  {
    stage: 'Fresher',
    period: '0 - 1 Year',
    salary: '₹2.4L - ₹3.6L',
    role: 'Junior Associate',
    focus: 'Primary ledger entries, basic billing, client coordination, and data entries in Tally or Excel.',
    skills: 'Tally Prime basics, MS Office, basic tax computations.'
  },
  {
    stage: 'Junior Exec',
    period: '1 - 2 Years',
    salary: '₹3.6L - ₹5.0L',
    role: 'Accounts/GST Executive',
    focus: 'Direct preparation of monthly GST logs, bank files reconciliation, processing standard payroll structures.',
    skills: 'Monthly GST returns, TDS deductions, advanced spreadsheet matching.'
  },
  {
    stage: 'Senior Lead',
    period: '3 Years',
    salary: '₹5.5L - ₹8.0L',
    role: 'Senior Accountant / Tax Lead',
    focus: 'Filing complex corporate ITRs, managing SAP accounts modules, leading internal ledger compliance audits.',
    skills: 'SAP FICO transaction codes, corporate tax laws, payroll filings.'
  },
  {
    stage: 'Management',
    period: '5+ Years',
    salary: '₹8.5L - ₹15.0L+',
    role: 'Finance Manager / Tax Consultant',
    focus: 'Designing tax optimization sheets, supervising direct finance teams, representing firms in tax appeals.',
    skills: 'Financial planning, statutory auditing coordination, leadership.'
  }
];

export default function CareerGrowth() {
  const [selectedStage, setSelectedStage] = useState(0);

  return (
    <section 
      id="career-growth" 
      className="py-24 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border transition-colors duration-300 noise-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary dark:text-blue-400 mb-3">
            Career Projection
          </h2>
          <p className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-800 dark:text-white leading-tight">
            Visualize Your Salary & Role Growth
          </p>
          <div className="mt-4 h-1 w-12 bg-primary dark:bg-blue-500 mx-auto rounded-full" />
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            Accounting is one of the few fields with a guaranteed upward path. See how your salary scales from a day-one fresher to a finance leader.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Interactive Timeline Graph: Left/Top */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-slate-800 dark:text-white mb-6 flex items-center">
                <Compass className="w-5 h-5 text-primary dark:text-blue-400 mr-2" />
                Select Experience Stage
              </h3>

              {/* Progress track */}
              <div className="relative flex justify-between items-center mb-10 px-4">
                {/* Background Connecting Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 z-0" />
                
                {/* Active fill line */}
                <div 
                  className="absolute top-1/2 left-0 h-0.5 bg-primary dark:bg-blue-600 -translate-y-1/2 z-0 transition-all duration-300"
                  style={{ width: `${(selectedStage / (timelineData.length - 1)) * 100}%` }}
                />

                {timelineData.map((data, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedStage(idx)}
                    className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border transition-all ${
                      selectedStage === idx
                        ? 'bg-primary dark:bg-blue-600 border-primary dark:border-blue-600 text-white scale-110 shadow-sm'
                        : 'bg-white dark:bg-dark-card border-light-border dark:border-dark-border text-slate-500 dark:text-slate-400 hover:border-slate-400'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              {/* Stage Info Card */}
              <div className="p-5 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/20 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary dark:text-blue-400">
                      Stage {selectedStage + 1}: {timelineData[selectedStage].stage} ({timelineData[selectedStage].period})
                    </span>
                    <h4 className="font-display font-bold text-lg text-slate-800 dark:text-white mt-0.5">
                      {timelineData[selectedStage].role}
                    </h4>
                  </div>
                  <div className="py-1 px-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 text-green-700 dark:text-green-400 font-extrabold text-sm sm:text-base">
                    {timelineData[selectedStage].salary} / Year
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {timelineData[selectedStage].focus}
                </p>
                <div className="flex items-center space-x-2 text-[11px]">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Core Skills Required:</span>
                  <span className="text-slate-500 dark:text-slate-400 truncate">{timelineData[selectedStage].skills}</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5 text-accent-dark dark:text-accent" />
              <span>Estimates based on current Chennai financial market recruitment datasets.</span>
            </div>
          </div>

          {/* Qualified Roles Grid: Right/Bottom */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="p-6 rounded-2xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card shadow-sm h-full">
              <h3 className="font-display font-bold text-xl text-slate-800 dark:text-white mb-6 flex items-center">
                <Briefcase className="w-5 h-5 text-primary dark:text-blue-400 mr-2" />
                Target Career Roles
              </h3>

              <div className="space-y-4">
                {roles.map((role, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start space-x-3 p-3 rounded-xl border border-transparent hover:border-light-border dark:hover:border-dark-border hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-all duration-200"
                  >
                    <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-primary dark:text-blue-400 mt-0.5 shrink-0">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {role.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {role.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
