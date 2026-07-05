'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, Award, CheckCircle, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';

type Course = {
  id: string;
  name: string;
  category: 'accounting' | 'taxation' | 'essentials';
  fees: number;
  collegeFees: number;
  duration: string;
  eligibility: string;
  avgSalary: string;
  skills: string[];
  careers: string[];
  desc: string;
};

const coursesData: Course[] = [
  {
    id: 'tally-prime',
    name: 'Tally Prime with GST',
    category: 'accounting',
    fees: 14999,
    collegeFees: 6999,
    duration: '2 Months (Daily slots)',
    eligibility: '12th Pass / Graduate / B.Com',
    avgSalary: '₹2.5L - ₹4.5L/year',
    skills: ['Tally Prime Ledger', 'Voucher Entry', 'GST Invoicing', 'E-Way Bills', 'RCM entries', 'Bank Reconciliation'],
    careers: ['Accounts Executive', 'Tally Operator', 'Junior Accountant'],
    desc: 'Complete ledger accounting and inventory control software training, synced with modern GST rules and direct ledger reconciliations.'
  },
  {
    id: 'gst',
    name: 'GST (Goods & Services Tax)',
    category: 'taxation',
    fees: 14999,
    collegeFees: 6999,
    duration: '1.5 Months',
    eligibility: 'Graduates / Accountants / Business Owners',
    avgSalary: '₹3.0L - ₹5.5L/year',
    skills: ['GSTR-1 & GSTR-3B filing', 'ITC Reconciliation', 'GST Registration', 'E-Invoicing Rules', 'Annual Returns GSTR-9'],
    careers: ['GST Consultant', 'Tax Practitioner', 'GST Executive'],
    desc: 'End-to-end practical GST coursework covering online registration, monthly return filings, input tax credit matchings, and refund claims.'
  },
  {
    id: 'sap',
    name: 'SAP (FICO / MM / HR)',
    category: 'accounting',
    fees: 34999,
    collegeFees: 29999,
    duration: '3.5 Months',
    eligibility: 'B.Com / M.Com / MBA Finance / Professionals',
    avgSalary: '₹4.5L - ₹9.0L/year',
    skills: ['General Ledger (FI-GL)', 'AP & AR (FI-AP/AR)', 'Asset Accounting', 'Cost Center Accounting', 'Enterprise Structure setup'],
    careers: ['SAP FICO Consultant', 'SAP End-User', 'Finance Analyst'],
    desc: 'Professional ERP training covering SAP Financial Accounting (FI) and Controlling (CO) configurations, and transaction postings.'
  },
  {
    id: 'income-tax',
    name: 'Income Tax Returns (ITR)',
    category: 'taxation',
    fees: 19999,
    collegeFees: 13999,
    duration: '2 Months',
    eligibility: 'B.Com / Graduates / Working Professionals',
    avgSalary: '₹3.5L - ₹6.0L/year',
    skills: ['ITR-1, 2 & 4 filings', 'Salary & House Property Tax', 'Capital Gains calculations', 'Tax Planning', 'Form 26AS/AIS/TIS'],
    careers: ['Tax Consultant', 'Tax Analyst', 'Freelance Tax Preparer'],
    desc: 'Learn standard tax computations, file deductions, and submit Income Tax Returns electronically for individuals, firms, and HUFs.'
  },
  {
    id: 'esi-pf',
    name: 'ESI & PF (Payroll Accounting)',
    category: 'taxation',
    fees: 9999,
    collegeFees: 4999,
    duration: '1 Month',
    eligibility: 'Graduates / HR Students / Admin Staff',
    avgSalary: '₹2.5L - ₹4.0L/year',
    skills: ['PF & ESI Registration', 'Monthly Contribution filing', 'Challan generation', 'Salary Sheet structuring', 'Bonus & Gratuity laws'],
    careers: ['Payroll Executive', 'HR Administrator', 'Payroll Specialist'],
    desc: 'Master salary structures, provident fund rules, employee state insurance filing systems, and statutory labor compliance requirements.'
  },
  {
    id: 'ms-office',
    name: 'MS Office Suite',
    category: 'essentials',
    fees: 4999,
    collegeFees: 3999,
    duration: '1 Month',
    eligibility: 'Open to All',
    avgSalary: '₹1.8L - ₹3.0L/year',
    skills: ['MS Word formatting', 'PowerPoint presentations', 'Outlook email scheduling', 'Word templates', 'Basic spreadsheet entries'],
    careers: ['Office Assistant', 'Data Entry Operator', 'Admin Assistant'],
    desc: 'Master the fundamental corporate software suite: compose reports in Word, prepare slides in PowerPoint, and manage outlook letters.'
  },
  {
    id: 'tds-tcs',
    name: 'TDS & TCS (Tax Deductions)',
    category: 'taxation',
    fees: 11999,
    collegeFees: 4999,
    duration: '1.5 Months',
    eligibility: 'B.Com / Accountants / Finance Freshers',
    avgSalary: '₹3.0L - ₹5.0L/year',
    skills: ['TDS Section rules', 'Form 24Q, 26Q & 27Q filing', 'TDS Certificate Form 16', 'TCS collections', 'Interest & Penalties computations'],
    careers: ['TDS Executive', 'Tax Audit Assistant', 'Accounts Assistant'],
    desc: 'Practical training on deducting tax at source, filing quarterly TDS returns, issuing certificates, and matching online statements.'
  },
  {
    id: 'basic-computer',
    name: 'Basic Computer Operations',
    category: 'essentials',
    fees: 4999,
    collegeFees: 2999,
    duration: '1 Month',
    eligibility: 'Students / Beginners / Senior Citizens',
    avgSalary: '₹1.5L - ₹2.5L/year',
    skills: ['OS Navigation (Windows)', 'File Explorer controls', 'Internet & Email systems', 'Google Workspace tools', 'Data entry skills'],
    careers: ['Front Office Assistant', 'Computer Operator', 'Billing Clerk'],
    desc: 'Perfect starting course for beginners. Understand folder structures, send emails, browse securely, and type letters efficiently.'
  },
  {
    id: 'adv-excel',
    name: 'Advanced Excel for Analytics',
    category: 'essentials',
    fees: 13999,
    collegeFees: 9999,
    duration: '1.5 Months',
    eligibility: 'Graduates / Engineers / MBA Students / Professionals',
    avgSalary: '₹3.0L - ₹6.5L/year',
    skills: ['VLOOKUP & XLOOKUP', 'Pivot Tables & Charts', 'IF/Nested IF Formulas', 'Macros & VBA introduction', 'Data Validation & Cleaning'],
    careers: ['MIS Executive', 'Data Analyst', 'Reporting Analyst'],
    desc: 'Master advanced spreadsheet analytics: clean massive files, automate dashboards, perform complex audit matches, and write advanced functions.'
  }
];

export default function Courses() {
  const [activeTab, setActiveTab] = useState<'all' | 'accounting' | 'taxation' | 'essentials'>('all');

  const filteredCourses = coursesData.filter(course => {
    if (activeTab === 'all') return true;
    return course.category === activeTab;
  });

  const handleEnrollClick = (courseName: string) => {
    const courseSelect = document.getElementById('demo-course') as HTMLSelectElement;
    if (courseSelect) {
      courseSelect.value = courseName;
      // Trigger a change event so the select state updates if it uses react state
      const event = new Event('change', { bubbles: true });
      courseSelect.dispatchEvent(event);
    }
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
      id="courses" 
      className="py-24 bg-slate-50 dark:bg-[#0D111A] border-t border-light-border dark:border-dark-border transition-colors duration-300 noise-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner offers */}
        <div className="max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl border border-amber-200 dark:border-amber-950 bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-950/10 flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-amber-500 text-white font-black text-sm">10%</div>
            <div>
              <h4 className="font-display font-bold text-slate-800 dark:text-slate-200">10% Flat Discount Offer</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Get an instant 10% discount applied to the total admission fees for any course selected today.</p>
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-blue-200 dark:border-blue-950 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-950/10 flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-wider">Double</div>
            <div>
              <h4 className="font-display font-bold text-slate-800 dark:text-slate-200">Double Course Package Offer</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Enroll in any 2 courses simultaneously and unlock extra bundle discounts and double certifications.</p>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary dark:text-blue-400 mb-3">
            Our Syllabus
          </h2>
          <p className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-800 dark:text-white leading-tight">
            Curriculums Built for Corporate Roles
          </p>
          <div className="mt-4 h-1 w-12 bg-primary dark:bg-blue-500 mx-auto rounded-full" />
        </div>

        {/* Course Filters */}
        <div className="flex justify-center space-x-2 mb-12 flex-wrap gap-y-2">
          {(['all', 'accounting', 'taxation', 'essentials'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                activeTab === tab
                  ? 'bg-primary dark:bg-blue-600 border-primary dark:border-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-dark-card border-light-border dark:border-dark-border text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              {tab === 'all' ? 'All Courses' : tab}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={course.id}
                className="rounded-2xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card shadow-sm flex flex-col justify-between overflow-hidden group hover:shadow-md transition-all duration-300"
              >
                {/* Course Header Banner */}
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

                {/* Content body */}
                <div className="p-6 flex-grow">
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                    {course.desc}
                  </p>

                  {/* Skills List */}
                  <div className="mb-5">
                    <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Key Topics Covered
                    </h4>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                      {course.skills.map((skill, idx) => (
                        <div key={idx} className="flex items-start space-x-1">
                          <CheckCircle className="w-3 h-3 text-accent mt-0.5 shrink-0" />
                          <span className="text-[11px] text-slate-600 dark:text-slate-400 truncate" title={skill}>
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Career & Salaries */}
                  <div className="grid grid-cols-2 gap-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-light-border dark:border-dark-border mb-6">
                    <div>
                      <span className="text-[9px] font-bold uppercase text-slate-400 dark:text-slate-500 block mb-0.5">
                        Target Roles
                      </span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block truncate" title={course.careers.join(', ')}>
                        {course.careers[0]} & more
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase text-slate-400 dark:text-slate-500 block mb-0.5">
                        Avg. Base Salary
                      </span>
                      <span className="text-xs font-bold text-accent-dark dark:text-accent flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {course.avgSalary.split('/')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Eligibility */}
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-3 flex items-center space-x-1.5">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Eligibility:</span>
                    <span>{course.eligibility}</span>
                  </div>
                </div>

                {/* Course Fees Section */}
                <div className="p-6 border-t border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 mt-auto">
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="p-2.5 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-card flex flex-col justify-center">
                      <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                        Standard Fee
                      </span>
                      <span className="text-sm font-black text-slate-700 dark:text-slate-300">
                        ₹{course.fees.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50/20 dark:bg-amber-950/10 flex flex-col justify-center relative overflow-hidden group/college">
                      <span className="text-[9px] font-extrabold text-amber-700 dark:text-amber-400 uppercase flex items-center">
                        <Sparkles className="w-2.5 h-2.5 mr-0.5 text-amber-500 animate-pulse" />
                        College Student
                      </span>
                      <span className="text-base font-black text-amber-600 dark:text-amber-400">
                        ₹{course.collegeFees.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleEnrollClick(course.name)}
                    className="w-full py-3 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0 dark:bg-blue-600 dark:hover:bg-blue-500"
                  >
                    Enroll / Book Demo
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
