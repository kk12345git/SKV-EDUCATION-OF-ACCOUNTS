'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
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
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 noise-bg pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Info - Col 4 */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-white p-1 border border-slate-700">
                <Image
                  src="/SKV LOGO.jpeg"
                  alt="SKV Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-white text-lg tracking-tight">
                  SKV EDUCATION
                </span>
                <span className="text-[10px] tracking-widest font-semibold uppercase text-secondary-light">
                  OF ACCOUNTS
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              The benchmark accounting training academy in Chennai. Enabling college students and professionals to become job-ready through practical hands-on ledger and tax filing coursework.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href="https://www.instagram.com/skv_education_of_accounts"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Instagram Profile"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links - Col 2 */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Navigation
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              <a href="#courses" onClick={(e) => handleScrollTo(e, 'courses')} className="hover:text-white transition-colors">Courses Offered</a>
              <a href="#why-choose-us" onClick={(e) => handleScrollTo(e, 'why-choose-us')} className="hover:text-white transition-colors">Why Choose Us</a>
              <a href="#career-growth" onClick={(e) => handleScrollTo(e, 'career-growth')} className="hover:text-white transition-colors">Career Timeline</a>
              <a href="#journey" onClick={(e) => handleScrollTo(e, 'journey')} className="hover:text-white transition-colors">Our Journey</a>
              <a href="#testimonials" onClick={(e) => handleScrollTo(e, 'testimonials')} className="hover:text-white transition-colors">Student Reviews</a>
              <a href="#faq" onClick={(e) => handleScrollTo(e, 'faq')} className="hover:text-white transition-colors">FAQs</a>
            </div>
          </div>

          {/* Contact Details - Col 3 */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Contact Us
            </h4>
            <div className="flex flex-col space-y-3.5 text-xs">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  11/2 (5/2/A) Patel Road,<br />
                  Perambur, Chennai - 600011
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary-light shrink-0" />
                <div className="flex flex-col space-y-1">
                  <a href="tel:9384662036" className="hover:text-white">9384662036</a>
                  <a href="tel:7010813836" className="hover:text-white">7010813836</a>
                  <a href="tel:04426323036" className="hover:text-white">044-26323036</a>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary-light shrink-0" />
                <a href="mailto:skveduacctraining@gmail.com" className="hover:text-white break-all">
                  skveduacctraining@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary-light shrink-0" />
                <span>Mon - Sat: 9:00 AM - 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Interactive Map Embed - Col 3 */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Location Map
            </h4>
            <div className="relative rounded-xl overflow-hidden border border-slate-700 h-[140px] w-full">
              {/* Google Maps embed iframe targeting Perambur, Chennai */}
              <iframe
                title="SKV Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3885.6425488151833!2d80.2355523!3d13.1118356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52643a6f44d57b%3A0xe1db060c41031d27!2sPatel%20Rd%2C%20Perambur%2C%20Chennai%2C%20Tamil%20Nadu%20600011!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

        <hr className="border-slate-800 mb-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] gap-2">
          <span>
            &copy; {new Date().getFullYear()} SKV Education of Accounts. All Rights Reserved.
          </span>
          <div className="flex items-center space-x-1">
            <span>Learn Today. Lead Tomorrow.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
