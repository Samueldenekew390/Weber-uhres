import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Github, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Logo } from './Logo';

interface FooterProps {
  currentLang: Language;
  logoUrl?: string;
  onNavigate: (tab: 'home' | 'admin', sectionId?: string) => void;
  onOpenStatusModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  logoUrl,
  onNavigate,
  onOpenStatusModal,
}) => {
  const t = translations[currentLang].footer;
  const navT = translations[currentLang].nav;

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1f1f1f] text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#1f1f1f]">
          {/* Brand & Logo Area */}
          <div className="md:col-span-5 space-y-5">
            <button
              onClick={() => onNavigate('home')}
              className="focus:outline-none flex items-center group"
              aria-label="Weber Uhrenservice"
            >
              <Logo logoUrl={logoUrl} className="h-14 w-auto" />
            </button>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm font-light">
              {t.tagline}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="px-3 py-1 rounded bg-zinc-900/80 border border-[#1f1f1f] text-[11px] font-medium text-[#c5a059] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Made in Germany • Meisterwerkstatt</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  {navT.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'services')}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  {navT.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'booking')}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  {navT.booking}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStatusModal}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  {navT.checkStatus}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'contact')}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  {navT.contact}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="text-[#c5a059] hover:underline transition-all flex items-center gap-1.5"
                >
                  <span>{navT.admin}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              {t.contactTitle}
            </h4>
            <div className="space-y-3 text-sm font-light">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
                <a
                  href="tel:+4915218263006"
                  className="text-white hover:text-[#c5a059] font-medium transition-colors"
                >
                  +49 152 18263006
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
                <a
                  href="mailto:darbas11@gmail.com"
                  className="text-white hover:text-[#c5a059] font-medium transition-colors"
                >
                  darbas11@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#c5a059] flex-shrink-0 mt-0.5" />
                <span className="text-zinc-400">
                  Meisterwerkstatt Deutschland • Mo. – Fr. 09:00 – 18:00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-widest uppercase text-zinc-500">
          <div>
            © {new Date().getFullYear()} Weber Uhrenservice. {t.rights}
          </div>
          <div className="flex items-center gap-6">
            <span>{t.githubReady}</span>
            <span className="text-[#c5a059]">YOURDOMAIN.COM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
