import React from 'react';
import { Phone, Calendar, Award, ShieldCheck, Clock, Wrench } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface HeroProps {
  currentLang: Language;
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onBookClick }) => {
  const t = translations[currentLang].hero;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 border-b border-zinc-800/60">
      {/* Subtle luxury glow light background in corner */}
      <div className="absolute top-0 right-1/4 -mt-24 w-96 h-96 rounded-full bg-[#d4af37]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-zinc-700/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-7">
            {/* German Master Watchmaker Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-[#d4af37]/40 text-xs font-semibold text-[#d4af37] tracking-wider uppercase">
              <Award className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{t.badge}</span>
            </div>

            <div className="space-y-3">
              <p className="font-serif text-sm md:text-base text-zinc-400 uppercase tracking-[0.25em] font-medium">
                Weber Uhrenservice • Meisterwerkstatt
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                {t.headline}
              </h1>
            </div>

            <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl font-normal">
              {t.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onBookClick}
                className="px-8 py-4 bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#b89528] text-[#0f0f11] font-semibold text-sm uppercase tracking-wider rounded-lg shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2.5 active:scale-[0.99]"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.bookAppointment}</span>
              </button>

              <a
                href="tel:+4915218263006"
                className="px-8 py-4 bg-zinc-900/90 hover:bg-zinc-800 text-white font-semibold text-sm uppercase tracking-wider rounded-lg border border-zinc-700/80 hover:border-[#d4af37]/60 transition-all flex items-center justify-center gap-2.5"
              >
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <span>{t.callNow} (+49 152 18263006)</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-zinc-800/80 max-w-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-[#d4af37]">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                    {t.heritageLabel}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{t.heritageText}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-[#d4af37]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                    {t.warrantyLabel}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{t.warrantyText}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Luxury Watch Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative border box */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#d4af37]/30 via-transparent to-[#d4af37]/10 blur-sm -z-10" />

              {/* Main watch image container */}
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1000&q=85"
                  alt="Weber Uhrenservice - Meisterhafte Luxusuhr im Detail"
                  className="w-full h-80 sm:h-96 object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Overlay badge on image */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0f0f11]/90 backdrop-blur-md border border-zinc-800/80 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                      UHRMACHERMEISTER WEBER
                    </p>
                    <p className="text-sm font-serif font-medium text-white mt-0.5">
                      Präzisionsrevision &amp; Chronographen-Service
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                    <Clock className="w-5 h-5 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
