import React from 'react';
import { Phone, Mail, MapPin, Clock, Award } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface ContactSectionProps {
  currentLang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].contact;

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#0f0f11] relative border-b border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#d4af37] uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{t.sectionBadge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
            {t.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Direct Line Cards */}
          <div className="p-8 md:p-10 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-white">
                Weber Uhrenservice
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Zertifizierter Uhrmachermeister – wir beraten Sie diskret und fachkundig zu allen Fragen rund um Uhrenreparatur, Dichtigkeitsprüfung und Werksrevision.
              </p>

              <div className="space-y-4 pt-2">
                {/* Clickable Phone Item */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0f0f11] border border-zinc-800 flex items-center justify-center text-[#d4af37] flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      {t.phoneLabel}
                    </p>
                    <a
                      href="tel:+4915218263006"
                      className="text-white font-bold text-base md:text-lg hover:text-[#d4af37] transition-colors"
                    >
                      +49 152 18263006
                    </a>
                  </div>
                </div>

                {/* Clickable Email Item */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0f0f11] border border-zinc-800 flex items-center justify-center text-[#d4af37] flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      {t.emailLabel}
                    </p>
                    <a
                      href="mailto:darbas11@gmail.com"
                      className="text-white font-bold text-base md:text-lg hover:text-[#d4af37] transition-colors"
                    >
                      darbas11@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a
                href="tel:+4915218263006"
                className="flex-1 px-6 py-4 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-[#0f0f11] font-bold text-xs uppercase tracking-wider text-center shadow hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>{t.callButton}</span>
              </a>

              <a
                href="mailto:darbas11@gmail.com"
                className="flex-1 px-6 py-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider text-center border border-zinc-700 transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#d4af37]" />
                <span>{t.emailButton}</span>
              </a>
            </div>
          </div>

          {/* Workshop Details Box */}
          <div className="p-8 md:p-10 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-white">
                Meisterwerkstatt &amp; Servicezeiten
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0f0f11] border border-zinc-800 flex items-center justify-center text-[#d4af37] flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      {t.addressLabel}
                    </p>
                    <p className="text-white text-base font-medium mt-1">
                      Weber Uhrenservice
                    </p>
                    <p className="text-zinc-400 text-sm">{t.addressText}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0f0f11] border border-zinc-800 flex items-center justify-center text-[#d4af37] flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      {t.hoursLabel}
                    </p>
                    <p className="text-white text-sm mt-1 leading-relaxed">
                      {t.hoursText}
                    </p>
                    <p className="text-xs text-[#d4af37] mt-2 font-medium">
                      ✓ Kostenlose Erstdiagnose bei Wartungsanfragen
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* GitHub Pages & Namecheap compatibility note */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-500 flex items-center justify-between">
              <span>Weber Uhrenservice • Deutschland</span>
              <span className="font-mono text-[#d4af37]">www.weber-uhrenservice.de</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
