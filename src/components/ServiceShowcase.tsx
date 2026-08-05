import React from 'react';
import { Phone, ArrowRight, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { WatchServiceItem, Language } from '../types';
import { translations } from '../i18n/translations';

interface ServiceShowcaseProps {
  services: WatchServiceItem[];
  currentLang: Language;
  onBookService?: (serviceTitle: string) => void;
}

export const ServiceShowcase: React.FC<ServiceShowcaseProps> = ({
  services,
  currentLang,
  onBookService,
}) => {
  const t = translations[currentLang].services;

  return (
    <section id="services" className="py-20 md:py-28 bg-[#0f0f11] relative border-b border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#d4af37] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{t.sectionBadge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(services || []).map((item) => {
            const hasDesc = Boolean(item.description && item.description.trim().length > 0);

            return (
              <div
                key={item.id}
                className="group flex flex-col rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-[#d4af37]/40 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl"
              >
                {/* Watch Image Area */}
                <div className="relative h-64 overflow-hidden bg-zinc-950">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />

                  {/* Top corner tag */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#0f0f11]/80 backdrop-blur-sm border border-zinc-700 text-[10px] uppercase font-semibold text-[#d4af37] tracking-wider">
                    Weber Uhrenservice
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-white group-hover:text-[#d4af37] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    {/* Optional description - ONLY renders if non-empty so there is no awkward blank area */}
                    {hasDesc && (
                      <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a
                      href="tel:+4915218263006"
                      className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-[#0f0f11] font-semibold text-xs uppercase tracking-wider text-center shadow hover:brightness-110 transition-all flex items-center justify-center gap-2"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{t.callToInquire}</span>
                    </a>

                    {onBookService && (
                      <button
                        onClick={() => onBookService(item.title)}
                        className="py-3 px-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>Termin</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee footer banner */}
        <div className="mt-16 p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-white">
                Meisterhafte Qualitätsgarantie | Uhrmachermeister Weber
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400">
                Verwendung von Original-Ersatzteilen &amp; umfassende Prüfung auf Chronometer-Genauigkeit.
              </p>
            </div>
          </div>
          <a
            href="tel:+4915218263006"
            className="px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs uppercase tracking-wider border border-zinc-700 transition-all whitespace-nowrap"
          >
            Direktberatung (+49 152 18263006)
          </a>
        </div>
      </div>
    </section>
  );
};
