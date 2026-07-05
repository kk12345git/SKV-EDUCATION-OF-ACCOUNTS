'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Menu, X, Phone, MessageCircle, Calendar, Lock } from 'lucide-react';

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md border-b border-light-border dark:border-dark-border py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-lg premium-border bg-white p-1">
              <Image
                src="/SKV LOGO.jpeg"
                alt="SKV Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold tracking-tight text-lg text-primary dark:text-blue-400">
                SKV EDUCATION
              </span>
              <span className="text-[10px] tracking-widest font-semibold uppercase text-secondary-dark dark:text-secondary opacity-90">
                OF ACCOUNTS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/courses"
              className={`text-sm font-medium transition-colors ${
                isActive('/courses')
                  ? 'text-primary dark:text-blue-400 font-bold'
                  : 'text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-blue-400'
              }`}
            >
              Courses
            </Link>
            <Link
              href="/why-choose-us"
              className={`text-sm font-medium transition-colors ${
                isActive('/why-choose-us')
                  ? 'text-primary dark:text-blue-400 font-bold'
                  : 'text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-blue-400'
              }`}
            >
              Why SKV
            </Link>
            <Link
              href="/career"
              className={`text-sm font-medium transition-colors ${
                isActive('/career')
                  ? 'text-primary dark:text-blue-400 font-bold'
                  : 'text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-blue-400'
              }`}
            >
              Career Growth
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors ${
                isActive('/contact')
                  ? 'text-primary dark:text-blue-400 font-bold'
                  : 'text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-blue-400'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Admin Portal Shortcut */}
            <Link
              href="/admin"
              className="p-2 rounded-lg border border-light-border dark:border-dark-border text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-blue-400 transition-all hover:bg-slate-50 dark:hover:bg-slate-900"
              aria-label="Admin Portal"
              title="Admissions Admin Portal"
            >
              <Lock className="w-5 h-5" />
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-light-border dark:border-dark-border text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-blue-400 transition-all hover:bg-slate-50 dark:hover:bg-slate-900"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Quick Actions */}
            <a
              href="tel:9384662036"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-light-border dark:border-dark-border text-xs font-semibold hover:border-primary dark:hover:border-blue-400 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-primary dark:text-blue-400" />
              <span>Call Now</span>
            </a>

            <a
              href="https://wa.me/917010813836"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-green-200 dark:border-green-900/50 bg-green-50/50 dark:bg-green-950/20 text-xs font-semibold text-green-700 dark:text-green-400 hover:bg-green-100/50 dark:hover:bg-green-950/40 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
              <span>WhatsApp</span>
            </a>

            <Link
              href="/enroll"
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-light text-white text-xs font-bold shadow-sm shadow-blue-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Free Demo</span>
            </Link>
          </div>

          {/* Mobile Right Menu & Theme Toggle */}
          <div className="flex md:hidden items-center space-x-3">
            <Link
              href="/admin"
              className="p-1.5 rounded-lg border border-light-border dark:border-dark-border text-slate-400 dark:text-slate-500"
              aria-label="Admin Portal"
              title="Admissions Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </Link>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-light-border dark:border-dark-border text-slate-600 dark:text-slate-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg border border-light-border dark:border-dark-border text-slate-600 dark:text-slate-300"
              aria-label="Open Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-light-border dark:border-dark-border bg-white dark:bg-dark-bg absolute top-full left-0 right-0 py-6 px-4 shadow-xl flex flex-col space-y-4 animate-in fade-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/courses"
              onClick={() => setIsOpen(false)}
              className={`text-base font-semibold ${
                isActive('/courses') ? 'text-primary dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'
              }`}
            >
              Courses
            </Link>
            <Link
              href="/why-choose-us"
              onClick={() => setIsOpen(false)}
              className={`text-base font-semibold ${
                isActive('/why-choose-us') ? 'text-primary dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'
              }`}
            >
              Why SKV
            </Link>
            <Link
              href="/career"
              onClick={() => setIsOpen(false)}
              className={`text-base font-semibold ${
                isActive('/career') ? 'text-primary dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'
              }`}
            >
              Career Growth
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={`text-base font-semibold ${
                isActive('/contact') ? 'text-primary dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'
              }`}
            >
              Contact
            </Link>
          </nav>

          <hr className="border-light-border dark:border-dark-border" />

          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:9384662036"
              className="flex items-center justify-center space-x-2 py-2.5 rounded-lg border border-light-border dark:border-dark-border text-sm font-semibold"
            >
              <Phone className="w-4 h-4 text-primary dark:text-blue-400" />
              <span>Call Now</span>
            </a>
            <a
              href="https://wa.me/917010813836"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 py-2.5 rounded-lg border border-green-200 dark:border-green-950 bg-green-50 dark:bg-green-950/20 text-sm font-semibold text-green-700 dark:text-green-400"
            >
              <MessageCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span>WhatsApp</span>
            </a>
            <Link
              href="/enroll"
              onClick={() => setIsOpen(false)}
              className="col-span-2 flex items-center justify-center space-x-2 py-3 rounded-lg bg-primary hover:bg-primary-light text-white text-sm font-bold shadow-md shadow-blue-500/10"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Demo Class</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
