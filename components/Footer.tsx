import Link from 'next/link';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import { SITE_CONFIG, FOOTER_LINKS, SOCIAL_LINKS, getBookingUrl } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="font-display font-bold text-2xl text-white">OneWay</span>
              <span className="font-display font-bold text-2xl text-accent">.Cab</span>
            </Link>
            <p className="text-gray-400 mb-4">
              {SITE_CONFIG.tagline}
            </p>
            <div className="flex space-x-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={social.name}
                >
                  {social.icon === 'facebook' && <Facebook className="w-5 h-5" />}
                  {social.icon === 'twitter' && <Twitter className="w-5 h-5" />}
                  {social.icon === 'linkedin' && <Linkedin className="w-5 h-5" />}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.main.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.secondary.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Routes */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Popular Routes</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.popularRoutes.map((route) => (
                <li key={route.label}>
                  <a
                    href={getBookingUrl(route.from, route.to)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link hover:text-accent"
                  >
                    {route.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <p>
              Copyright © 2013-{currentYear} Baroda Taxi Cabs Pvt Ltd. All Rights Reserved.
            </p>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <Link href="/terms-and-conditions" className="hover:text-accent transition-colors">
                Terms
              </Link>
              <span>•</span>
              <Link href="/privacy-policy" className="hover:text-accent transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
