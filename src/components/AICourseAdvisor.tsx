'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Sparkles } from 'lucide-react';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const prebuiltAnswers: Record<string, string> = {
  'which course should i learn?': 'It depends on your current background! If you are a beginner looking to enter the corporate world quickly, we highly recommend "Tally Prime with GST" and "Advanced Excel". If you are looking for advanced accounting or MNC roles, "SAP FICO" is the absolute standard.',
  'what is the best course after b.com?': 'For B.Com graduates, the best path is the "SAP (FICO/MM/HR)" course or the "GST + Income Tax Returns" combination. B.Com students qualify for premium tax advisor roles or MNC end-user posts, and these courses provide the practical edge that colleges miss.',
  'can i get placement?': 'Absolutely! We offer 100% placement preparation support. This includes direct referrals to corporate tax offices, mock technical interviews, and resume structuring. 5,000+ students have successfully transitioned to jobs through our training.',
  'what is the course duration?': 'Our courses are highly focused and practical. Durations range from 1 month (Basic Computers, MS Office, ESI & PF) to 2 months (Tally Prime, GST, TDS & TCS) and up to 3.5 months (SAP modules). We offer flexible 1-hour slots throughout the day.',
  'suggest best career path.': 'If you want to become a Corporate Accountant: learn Tally Prime → Advanced Excel → SAP FICO. If you want to become an independent Tax Practitioner: learn GST → TDS/TCS → Income Tax Returns. Both paths offer high growth in Chennai.'
};

export default function AICourseAdvisor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hello! I am your SKV Course Advisor. How can I help you choose the right accounting career path today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleQuestionClick = (question: string) => {
    // Add user message
    const userMsg: Message = { sender: 'user', text: question };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const answer = prebuiltAnswers[question.toLowerCase()] || 
        'I would love to help you with that! Please leave your contact details or call us directly at 9384662036, and our senior counsellor will guide you step-by-step.';
      
      setMessages(prev => [...prev, { sender: 'bot', text: answer }]);
    }, 800);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const text = inputText.trim();
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      // Simple keyword matching
      let response = 'Thank you for your question! For specific advising, we recommend booking a free demo class or calling our admissions line at 9384662036. What other courses are you curious about?';
      const cleanText = text.toLowerCase();

      if (cleanText.includes('tally')) {
        response = 'Our Tally Prime course includes GST, ledger postings, voucher entries, and bank reconciliations. It is a 2-month course (₹14,999 general / ₹6,999 college students).';
      } else if (cleanText.includes('sap') || cleanText.includes('fico')) {
        response = 'SAP is our premium FICO/MM/HR enterprise ERP course taking 3.5 months. It opens high-paying jobs in corporate MNCs (₹34,999 general / ₹29,999 college students).';
      } else if (cleanText.includes('gst') || cleanText.includes('tax')) {
        response = 'We offer GST return filing, TDS/TCS computation, and Income Tax Return (ITR) filing. Perfect for tax consultants and practitioners.';
      } else if (cleanText.includes('excel') || cleanText.includes('excel')) {
        response = 'Advanced Excel teaches pivot tables, lookup models, data cleaning, and dashboards in 1.5 months (₹13,999 general / ₹9,999 college students).';
      } else if (cleanText.includes('fees') || cleanText.includes('discount')) {
        response = 'All courses have a flat 10% discount today! We also offer special college student pricing (starting from ₹2,999) and Double Course bundle discounts.';
      }

      setMessages(prev => [...prev, { sender: 'bot', text: response }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-[320px] sm:w-[360px] h-[480px] rounded-2xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card shadow-2xl overflow-hidden flex flex-col mb-4"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-light-border dark:border-dark-border bg-primary dark:bg-blue-600 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-white/15">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-black tracking-tight">AI Course Advisor</h4>
                  <span className="text-[10px] text-blue-100 font-bold uppercase tracking-wider block">SKV Virtual Guide</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-slate-900/10">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-primary dark:bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-900 border border-light-border dark:border-dark-border text-slate-800 dark:text-slate-200 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-900 border border-light-border dark:border-dark-border p-3 rounded-2xl rounded-tl-none flex space-x-1 items-center">
                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Prebuilt Prompts */}
            <div className="p-3 border-t border-light-border dark:border-dark-border bg-white dark:bg-dark-card flex flex-col space-y-1.5">
              <span className="text-[9px] font-extrabold uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                Select a Question
              </span>
              <div className="flex overflow-x-auto py-1 gap-1.5 scrollbar-thin max-w-full">
                {Object.keys(prebuiltAnswers).map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuestionClick(q)}
                    className="shrink-0 px-3 py-1.5 rounded-lg border border-light-border dark:border-dark-border bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-850 text-[10px] font-bold text-slate-600 dark:text-slate-400 transition-colors whitespace-nowrap"
                  >
                    {q.charAt(0).toUpperCase() + q.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form 
              onSubmit={handleSend}
              className="p-3 border-t border-light-border dark:border-dark-border bg-white dark:bg-dark-card flex gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about courses, fees, timings..."
                className="flex-grow px-3 py-2 rounded-lg border border-light-border dark:border-dark-border bg-slate-50/50 dark:bg-slate-900/30 text-xs focus:outline-none focus:border-primary dark:focus:border-blue-500"
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-primary hover:bg-primary-light text-white dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
                aria-label="Send Message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button Toggle */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-primary hover:bg-primary-light text-white flex items-center justify-center shadow-xl shadow-blue-500/20 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors relative"
        aria-label="Toggle AI advisor chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6" />
              {/* Notification Badge indicator */}
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-amber-500 rounded-full border-2 border-white dark:border-[#090B0F]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
