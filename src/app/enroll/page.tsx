'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { BookOpen, Calendar, Send, ShieldCheck, ArrowLeft, GraduationCap, Compass } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const courses = [
  'Tally Prime with GST',
  'GST',
  'SAP',
  'Income Tax Returns',
  'ESI & PF',
  'MS Office',
  'TDS & TCS',
  'Basic Computer',
  'Advanced Excel'
];

function EnrollFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('Tally Prime with GST');
  const [qualification, setQualification] = useState('B.Com Graduate');
  const [timing, setTiming] = useState('Morning (9 AM - 12 PM)');
  const [purpose, setPurpose] = useState('Job Placement Support');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Prefill course from query parameter if valid
    const courseParam = searchParams.get('course');
    if (courseParam) {
      const match = courses.find(c => c.toLowerCase() === courseParam.toLowerCase() || c.toLowerCase().includes(courseParam.toLowerCase()));
      if (match) {
        setCourse(match);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    setLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'course_registration',
          name,
          phone,
          email,
          course,
          timing,
          qualification,
          purpose
        })
      });

      if (response.ok) {
        // Trigger Confetti
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });

        router.push(`/thank-you?type=enroll&name=${encodeURIComponent(name)}`);
        setName('');
        setPhone('');
        setEmail('');
      }
    } catch (err) {
      console.error('Failed to submit enrollment registration:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 p-6 sm:p-10 rounded-3xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card shadow-2xl relative overflow-hidden">
      {/* Top visual strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-blue-500" />

      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-800 dark:text-white leading-tight">
          Intake Registration Form
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
          Please complete your educational background details and timing preferences below to submit your corporate training registration.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="student-name" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="student-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-primary"
          />
        </div>

        {/* Contact details row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="student-phone" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              id="student-phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit phone number"
              className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="student-email" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="student-email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Course drop down */}
        <div>
          <label htmlFor="student-course" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
            Selected Course Program
          </label>
          <select
            id="student-course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-primary text-slate-700 dark:text-slate-350"
          >
            {courses.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Academic Qualification & Purpose */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="student-qualification" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
              Educational Qualification
            </label>
            <select
              id="student-qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-primary text-slate-700 dark:text-slate-350"
            >
              <option>10th Std Pass</option>
              <option>12th Std Pass</option>
              <option>College Student (B.Com / Others)</option>
              <option>B.Com Graduate</option>
              <option>Post Graduate (M.Com / MBA)</option>
              <option>Working Professional</option>
              <option>Business Owner / Entrepreneur</option>
            </select>
          </div>
          <div>
            <label htmlFor="student-purpose" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
              Registration Purpose
            </label>
            <select
              id="student-purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-primary text-slate-700 dark:text-slate-350"
            >
              <option>Job Placement Support</option>
              <option>Professional Upskilling</option>
              <option>Manage Business Accounts</option>
              <option>College Curriculum Help</option>
              <option>General Computer Literacy</option>
            </select>
          </div>
        </div>

        {/* Slot Timings & Study Mode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="student-timing" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
              Preferred Daily Slot
            </label>
            <select
              id="student-timing"
              value={timing}
              onChange={(e) => setTiming(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-primary text-slate-700 dark:text-slate-350"
            >
              <option>Morning (9 AM - 12 PM)</option>
              <option>Evening (4 PM - 9 PM)</option>
              <option>Flexible 1-Hour Slot</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
              Mode of Study
            </label>
            <div className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-100 dark:bg-slate-900/50 text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center select-none">
              <ShieldCheck className="w-4 h-4 text-green-500 mr-1.5 shrink-0" />
              <span>Direct Classroom (Chennai Center)</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 py-4 rounded-xl bg-primary hover:bg-primary-light text-white text-sm font-bold uppercase tracking-wider shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-75"
        >
          <Send className="w-4 h-4" />
          <span>{loading ? 'Submitting Registration...' : 'Submit Course Registration'}</span>
        </button>

        <span className="text-[10px] text-slate-400 dark:text-slate-500 text-center block mt-3">
          🔒 By registering, you agree that our admissions team will contact you to coordinate batch slots.
        </span>
      </form>
    </div>
  );
}

export default function EnrollPage() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-slate-800 dark:text-slate-200 transition-colors duration-300 relative flex flex-col justify-between">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <Suspense fallback={
          <div className="max-w-2xl mx-auto my-12 p-12 text-center">
            <span className="text-slate-400 font-bold text-sm">Loading Registration...</span>
          </div>
        }>
          <EnrollFormContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
