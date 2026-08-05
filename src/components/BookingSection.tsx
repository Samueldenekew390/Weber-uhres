import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, Phone, Send, ShieldAlert } from 'lucide-react';
import { WatchServiceItem, Language, Booking } from '../types';
import { translations } from '../i18n/translations';

interface BookingSectionProps {
  services: WatchServiceItem[];
  currentLang: Language;
  selectedServiceTitle?: string;
  onSubmitBooking: (booking: {
    fullName: string;
    email: string;
    phone: string;
    preferredDate: string;
    preferredTime: string;
    service: string;
    message: string;
  }) => Promise<Booking>;
  onOpenStatusModal: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  services,
  currentLang,
  selectedServiceTitle,
  onSubmitBooking,
  onOpenStatusModal,
}) => {
  const t = translations[currentLang].booking;

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [service, setService] = useState(selectedServiceTitle || services[0]?.title || '');
  const [message, setMessage] = useState('');

  // Status & Validation State
  const [submitting, setSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync selectedServiceTitle if passed via props
  React.useEffect(() => {
    if (selectedServiceTitle) {
      setService(selectedServiceTitle);
    }
  }, [selectedServiceTitle]);

  // Today string for date input min attribute
  const getTodayString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = t.validation.requiredField;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t.validation.invalidEmail;
    }

    if (!phone.trim() || phone.trim().length < 6) {
      newErrors.phone = t.validation.invalidPhone;
    }

    if (!preferredDate) {
      newErrors.preferredDate = t.validation.requiredField;
    } else {
      const selected = new Date(preferredDate);
      const today = new Date(getTodayString());
      if (selected < today) {
        newErrors.preferredDate = t.validation.pastDate;
      }
    }

    if (!preferredTime) {
      newErrors.preferredTime = t.validation.requiredField;
    }

    if (!service) {
      newErrors.service = t.validation.requiredField;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setErrors({});
    try {
      const created = await onSubmitBooking({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        preferredDate,
        preferredTime,
        service,
        message: message.trim(),
      });
      setSuccessBooking(created);
    } catch (err: any) {
      setErrors({ general: 'Fehler beim Übermitteln / Transmission error. Bitte versuchen Sie es erneut.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setPreferredDate('');
    setPreferredTime('');
    setService(services[0]?.title || '');
    setMessage('');
    setSuccessBooking(null);
    setErrors({});
  };

  return (
    <section id="booking" className="py-20 md:py-28 bg-[#131316] relative border-b border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-semibold text-[#d4af37] uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{t.sectionBadge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
            {t.sectionSubtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {successBooking ? (
            /* SUCCESS MESSAGE BOX */
            <div className="p-8 md:p-12 rounded-2xl bg-zinc-900 border border-[#d4af37]/60 text-center space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">
                  {t.successTitle}
                </h3>
                <p className="text-zinc-300 text-base max-w-xl mx-auto leading-relaxed">
                  {t.successMessage}
                </p>
              </div>

              {/* Summary card of booked details */}
              <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 max-w-lg mx-auto text-left space-y-3">
                <div className="flex justify-between text-xs text-zinc-500 border-b border-zinc-800 pb-2">
                  <span>Referenz-Nr. / ID:</span>
                  <span className="font-mono font-bold text-[#d4af37]">{successBooking.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Name:</span>
                  <span className="text-white font-medium">{successBooking.fullName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Termin / Date:</span>
                  <span className="text-white font-medium">
                    {successBooking.preferredDate} - {successBooking.preferredTime} Uhr
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Leistung / Service:</span>
                  <span className="text-[#d4af37] font-medium">{successBooking.service}</span>
                </div>
                <div className="flex justify-between text-xs pt-2 border-t border-zinc-800">
                  <span className="text-zinc-400">Status:</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase font-semibold">
                    {translations[currentLang].status.pending}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-lg bg-[#d4af37] text-[#0f0f11] font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
                >
                  {t.newBookingButton}
                </button>
                <button
                  onClick={onOpenStatusModal}
                  className="px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs uppercase tracking-wider border border-zinc-700 transition-all"
                >
                  {translations[currentLang].nav.checkStatus}
                </button>
              </div>
            </div>
          ) : (
            /* BOOKING FORM */
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-10 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-2xl space-y-6"
            >
              {errors.general && (
                <div className="p-4 rounded-lg bg-red-950/80 border border-red-500/50 text-red-300 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                  <span>{errors.general}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    {t.fullName} *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.fullNamePlaceholder}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37] transition-colors text-sm"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-400">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    {t.email} *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37] transition-colors text-sm"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    {t.phone} *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.phonePlaceholder}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37] transition-colors text-sm"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-400">{errors.phone}</p>
                  )}
                </div>

                {/* Service Selection */}
                <div className="space-y-2">
                  <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    {t.serviceType} *
                  </label>
                  <select
                    id="service"
                    required
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#d4af37] transition-colors text-sm"
                  >
                    <option value="" disabled>
                      -- {t.selectService} --
                    </option>
                    {(services || []).map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-xs text-red-400">{errors.service}</p>
                  )}
                </div>

                {/* Preferred Date (No past dates!) */}
                <div className="space-y-2">
                  <label htmlFor="preferredDate" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    {t.preferredDate} *
                  </label>
                  <input
                    id="preferredDate"
                    type="date"
                    required
                    min={getTodayString()}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#d4af37] transition-colors text-sm"
                  />
                  {errors.preferredDate && (
                    <p className="text-xs text-red-400">{errors.preferredDate}</p>
                  )}
                </div>

                {/* Preferred Time */}
                <div className="space-y-2">
                  <label htmlFor="preferredTime" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    {t.preferredTime} *
                  </label>
                  <select
                    id="preferredTime"
                    required
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#d4af37] transition-colors text-sm"
                  >
                    <option value="" disabled>
                      -- {t.selectTime} --
                    </option>
                    <option value="09:00">09:00 Uhr / AM</option>
                    <option value="10:00">10:00 Uhr / AM</option>
                    <option value="11:00">11:00 Uhr / AM</option>
                    <option value="13:00">13:00 Uhr / PM</option>
                    <option value="14:00">14:00 Uhr / PM</option>
                    <option value="15:00">15:00 Uhr / PM</option>
                    <option value="16:00">16:00 Uhr / PM</option>
                    <option value="17:00">17:00 Uhr / PM</option>
                  </select>
                  {errors.preferredTime && (
                    <p className="text-xs text-red-400">{errors.preferredTime}</p>
                  )}
                </div>
              </div>

              {/* Optional Message / Additional details */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  {t.message}
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37] transition-colors text-sm resize-y"
                />
              </div>

              {/* Submit & Status check buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={onOpenStatusModal}
                  className="text-xs text-zinc-400 hover:text-[#d4af37] underline underline-offset-4 font-medium transition-colors"
                >
                  Bereits einen Termin angefragt? Status prüfen →
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b89528] text-[#0f0f11] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? t.submitting : t.submitBooking}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
