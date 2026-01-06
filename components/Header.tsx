'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCallbackModal, setShowCallbackModal] = useState(false);

  return (
    <>
      <header className="bg-primary text-white sticky top-0 z-50 shadow-lg">
        {/* Top Bar */}
        <div className="container-custom">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-white rounded-lg p-1">
                <svg 
                  viewBox="0 0 40 40" 
                  className="w-10 h-10"
                  fill="none"
                >
                  <rect width="40" height="40" rx="8" fill="#008bd2"/>
                  <text 
                    x="50%" 
                    y="55%" 
                    dominantBaseline="middle" 
                    textAnchor="middle" 
                    fill="white" 
                    fontWeight="bold" 
                    fontSize="10"
                  >
                    OWC
                  </text>
                </svg>
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-xl">OneWay</span>
                <span className="text-accent font-bold text-xl">.Cab</span>
              </div>
            </Link>

            {/* Tagline - Desktop */}
            <div className="hidden lg:block">
              <p className="text-accent font-medium text-lg">
                {SITE_CONFIG.tagline}
              </p>
            </div>

            {/* CTA Section */}
            <div className="flex items-center space-x-4">
              {/* Phone */}
              <a 
                href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                className="flex items-center space-x-2 text-accent hover:text-accent-300 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="font-semibold hidden sm:inline">{SITE_CONFIG.phone}</span>
              </a>

              {/* Request Callback Button */}
              <button
                onClick={() => setShowCallbackModal(true)}
                className="btn-accent text-sm py-2 px-4 rounded-full hidden md:block"
              >
                Request Callback
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-primary-600 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="bg-white border-t border-gray-100 hidden lg:block">
          <div className="container-custom">
            <ul className="flex items-center space-x-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-link block"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="nav-link block">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden bg-white border-t border-gray-100 animate-fade-in">
            <ul className="container-custom py-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2 px-4 text-gray-700 hover:bg-surface rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="block py-2 px-4 text-gray-700 hover:bg-surface rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => {
                    setShowCallbackModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="btn-accent w-full text-center"
                >
                  Request Callback
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Callback Modal */}
      {showCallbackModal && (
        <CallbackModal onClose={() => setShowCallbackModal(false)} />
      )}
    </>
  );
}

// Callback Modal Component
function CallbackModal({ onClose }: { onClose: () => void }) {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (phone.length !== 10) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setTimeout(onClose, 2000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-display font-semibold text-gray-800">
            Request Callback
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-600">We'll call you back shortly!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600">
                  +91
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setPhone(value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter 10 digit number"
                  className="input-field rounded-l-none"
                  maxLength={10}
                />
              </div>
              {status === 'error' && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid 10-digit number</p>
              )}
              <p className="text-gray-500 text-xs mt-2">
                * Request callback is not available on DND numbers
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                {status === 'loading' ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
