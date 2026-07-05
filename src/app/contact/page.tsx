'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Phone, Mail, MapPin, Clock, Calendar, Send, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AICourseAdvisor from '@/components/AICourseAdvisor';
import Popups from '@/components/Popups';

export default function ContactPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('Tally Prime with GST');
  const [timing, setTiming] = useState('Morning (9 AM - 12 PM)');
  const [loading, setLoading] = useState(false);

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact_page_demo_booking',
          name,
          phone,
          course,
          timing
        })
      });

      if (response.ok) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
        router.push(`/thank-you?type=demo&name=${encodeURIComponent(name)}`);
        setName('');
        setPhone('');
      }
    } catch (err) {
      console.error('Failed to submit contact demo:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-slate-800 dark:text-slate-200 transition-colors duration-300 relative">
      <Navigation />
      
      <main className="pt-24 pb-16">
        {/* Header */}
        <div className="py-12 bg-slate-50 dark:bg-[#0D111A] border-b border-light-border dark:border-dark-border text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto px-4"
          >
            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-800 dark:text-white">
              Connect With Our Academy
            </h1>
            <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm sm:text-base">
              Call us directly, visit our Perambur training lab, or book a free trial class slot.
            </p>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Coordinates & Map - Col 7 */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white flex items-center">
                  <MapPin className="w-5 h-5 text-primary dark:text-blue-400 mr-2 shrink-0" />
                  Address
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  11/2 (5/2/A) Patel Road,<br />
                  Perambur, Chennai - 600011
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white flex items-center">
                  <Phone className="w-5 h-5 text-primary dark:text-blue-400 mr-2 shrink-0" />
                  Phone Lines
                </h3>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex flex-col space-y-1">
                  <a href="tel:9384662036" className="hover:text-primary dark:hover:text-blue-400">9384662036</a>
                  <a href="tel:7010813836" className="hover:text-primary dark:hover:text-blue-400">7010813836</a>
                  <a href="tel:04426323036" className="hover:text-primary dark:hover:text-blue-400">044-26323036</a>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white flex items-center">
                  <Mail className="w-5 h-5 text-primary dark:text-blue-400 mr-2 shrink-0" />
                  Email Support
                </h3>
                <a 
                  href="mailto:skveduacctraining@gmail.com" 
                  className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400 break-all"
                >
                  skveduacctraining@gmail.com
                </a>
              </div>

              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white flex items-center">
                  <Clock className="w-5 h-5 text-primary dark:text-blue-400 mr-2 shrink-0" />
                  Office Hours
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Monday - Saturday<br />
                  9:00 AM - 9:00 PM
                </p>
              </div>
            </div>

            {/* Expanded Google Map embed */}
            <div className="rounded-2xl border border-light-border dark:border-dark-border overflow-hidden h-[350px] w-full shadow-sm bg-slate-100 dark:bg-slate-900 relative">
              <iframe
                title="SKV Campus Location Map"
                src="https://maps.google.com/maps?q=11/2%20(5/2/A)%20Patel%20Road,%20Perambur,%20Chennai%20-%20600011&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Demo Form - Col 5 */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-2xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card shadow-sm">
              <div className="flex items-center space-x-2.5 mb-6">
                <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-primary dark:text-blue-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">
                    Book Trial Session
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Schedule a 1-hour live lab session. Complete the fields below.
                  </p>
                </div>
              </div>

              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="contact-course" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    Select Course
                  </label>
                  <select
                    id="contact-course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-primary text-slate-700 dark:text-slate-300"
                  >
                    <option>Tally Prime with GST</option>
                    <option>GST</option>
                    <option>SAP</option>
                    <option>Income Tax Returns</option>
                    <option>ESI & PF</option>
                    <option>MS Office</option>
                    <option>TDS & TCS</option>
                    <option>Basic Computer</option>
                    <option>Advanced Excel</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-timing" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    Preferred Batch Time
                  </label>
                  <select
                    id="contact-timing"
                    value={timing}
                    onChange={(e) => setTiming(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-sm focus:outline-none focus:border-primary text-slate-700 dark:text-slate-300"
                  >
                    <option>Morning (9 AM - 12 PM)</option>
                    <option>Evening (4 PM - 9 PM)</option>
                    <option>Flexible 1-Hour Slot</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 py-3.5 rounded-xl bg-primary hover:bg-primary-light text-white text-sm font-bold uppercase tracking-wider shadow-md shadow-blue-500/10 transition-all flex items-center justify-center space-x-2 disabled:opacity-75"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Registering...' : 'Book Free Demo Class'}</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <AICourseAdvisor />
      <Popups />
    </div>
  );
}
