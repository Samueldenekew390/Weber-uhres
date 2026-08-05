import React, { useState } from 'react';
import { Menu, X, Globe, ChevronDown, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Logo } from './Logo';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: 'home' | 'admin';
  onNavigate: (tab: 'home' | 'admin', sectionId?: string) => void;
  logoUrl?: string;
  onOpenStatusModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  activeTab,
  onNavigate,
  logoUrl,
  onOpenStatusModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = translations[currentLang].nav;

  const handleNavClick = (tab: 'home' | 'admin', sectionId?: string) => {
    onNavigate(tab, sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0f0f11]/95 backdrop-blur-md border-b border-zinc-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Area */}
          <button
            onClick={() => handleNavClick('home')}
            className="focus:outline-none flex items-center group py-2"
            aria-label="Weber Uhrenservice Home"
          >
            <Logo logoUrl={logoUrl} className="h-12 w-auto" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7" aria-label="Main Navigation">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-sm font-medium tracking-wide transition-colors py-2 px-1 border-b-2 ${
                activeTab === 'home'
                  ? 'text-white border-[#d4af37]'
                  : 'text-zinc-400 border-transparent hover:text-white'
              }`}
            >
              {t.home}
            </button>
            <button
              onClick={() => handleNavClick('home', 'services')}
              className="text-sm font-medium tracking-wide text-zinc-400 hover:text-white transition-colors py-2 px-1 border-b-2 border-transparent"
            >
              {t.services}
            </button>
            <button
              onClick={() => handleNavClick('home', 'booking')}
              className="text-sm font-medium tracking-wide text-zinc-400 hover:text-white transition-colors py-2 px-1 border-b-2 border-transparent"
            >
              {t.booking}
            </button>
            <button
              onClick={() => handleNavClick('home', 'contact')}
              className="text-sm font-medium tracking-wide text-zinc-400 hover:text-white transition-colors py-2 px-1 border-b-2 border-transparent"
            >
              {t.contact}
            </button>
            <button
              onClick={onOpenStatusModal}
              className="text-sm font-medium tracking-wide text-zinc-400 hover:text-[#d4af37] transition-colors py-2 px-1 border-b-2 border-transparent"
            >
              {t.checkStatus}
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`text-sm font-medium tracking-wide transition-colors py-2 px-3 rounded-md flex items-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/40'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>{t.admin}</span>
            </button>
          </nav>

          {/* Language Selector & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 hover:border-[#d4af37]/60 transition-colors focus:outline-none"
                aria-label="Select Language"
                aria-expanded={langDropdownOpen}
              >
                <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{currentLang === 'de' ? '🇩🇪 DE' : '🇬🇧 EN'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-lg bg-zinc-900 border border-zinc-800 shadow-2xl py-1 z-50">
                  <button
                    onClick={() => {
                      onLanguageChange('de');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 text-xs font-medium flex items-center justify-between transition-colors ${
                      currentLang === 'de'
                        ? 'bg-[#d4af37]/15 text-[#d4af37]'
                        : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <span>🇩🇪 Deutsch</span>
                    {currentLang === 'de' && <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />}
                  </button>
                  <button
                    onClick={() => {
                      onLanguageChange('en');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 text-xs font-medium flex items-center justify-between transition-colors ${
                      currentLang === 'en'
                        ? 'bg-[#d4af37]/15 text-[#d4af37]'
                        : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <span>🇬🇧 English</span>
                    {currentLang === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />}
                  </button>
                </div>
              )}
            </div>

            {/* Book Now Button */}
            <button
              onClick={() => handleNavClick('home', 'booking')}
              className="px-5 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#b89528] text-[#0f0f11] font-semibold text-xs uppercase tracking-wider rounded shadow-md hover:brightness-110 transition-all"
            >
              {t.booking}
            </button>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            {/* Compact Mobile Language Switcher */}
            <button
              onClick={() => onLanguageChange(currentLang === 'de' ? 'en' : 'de')}
              className="px-2.5 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-xs font-semibold text-[#d4af37] flex items-center gap-1"
              aria-label="Toggle language"
            >
              <span>{currentLang === 'de' ? '🇩🇪 DE' : '🇬🇧 EN'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0f0f11]/98 border-t border-zinc-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleNavClick('home')}
              className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-zinc-200 hover:bg-zinc-800/80 transition-colors"
            >
              {t.home}
            </button>
            <button
              onClick={() => handleNavClick('home', 'services')}
              className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-zinc-200 hover:bg-zinc-800/80 transition-colors"
            >
              {t.services}
            </button>
            <button
              onClick={() => handleNavClick('home', 'booking')}
              className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-[#d4af37] hover:bg-zinc-800/80 transition-colors"
            >
              {t.booking}
            </button>
            <button
              onClick={() => handleNavClick('home', 'contact')}
              className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-zinc-200 hover:bg-zinc-800/80 transition-colors"
            >
              {t.contact}
            </button>
            <button
              onClick={() => {
                onOpenStatusModal();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-zinc-200 hover:bg-zinc-800/80 transition-colors"
            >
              {t.checkStatus}
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center gap-2"
            >
              <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
              <span>{t.admin}</span>
            </button>
          </div>

          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
            <span className="text-xs text-zinc-500">Sprache / Language:</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onLanguageChange('de');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1.5 rounded text-xs font-semibold ${
                  currentLang === 'de'
                    ? 'bg-[#d4af37] text-black'
                    : 'bg-zinc-900 text-zinc-300 border border-zinc-800'
                }`}
              >
                🇩🇪 Deutsch
              </button>
              <button
                onClick={() => {
                  onLanguageChange('en');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1.5 rounded text-xs font-semibold ${
                  currentLang === 'en'
                    ? 'bg-[#d4af37] text-black'
                    : 'bg-zinc-900 text-zinc-300 border border-zinc-800'
                }`}
              >
                🇬🇧 English
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
