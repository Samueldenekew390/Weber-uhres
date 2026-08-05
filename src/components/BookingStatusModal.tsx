import React, { useState } from 'react';
import { X, Search, Clock, CheckCircle2, XCircle, Calendar, Wrench } from 'lucide-react';
import { Booking, Language } from '../types';
import { translations } from '../i18n/translations';
import { apiService } from '../services/api';

interface BookingStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const BookingStatusModal: React.FC<BookingStatusModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const [emailQuery, setEmailQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Booking[] | null>(null);

  const t = translations[currentLang].booking.statusModal;
  const statusT = translations[currentLang].status;

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailQuery.trim()) return;
    setLoading(true);
    try {
      const found = await apiService.checkBookingStatusByEmail(emailQuery.trim());
      setResults(found);
    } catch (err) {
      console.error('Status query error:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-semibold uppercase">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{statusT.approved}</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-semibold uppercase">
            <XCircle className="w-3.5 h-3.5" />
            <span>{statusT.rejected}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-semibold uppercase">
            <Clock className="w-3.5 h-3.5" />
            <span>{statusT.pending}</span>
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#131316] border border-zinc-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div>
            <h3 className="font-serif text-xl font-bold text-white">{t.title}</h3>
            <p className="text-xs text-zinc-400 mt-1">{t.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="p-6 border-b border-zinc-800/60">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={emailQuery}
                onChange={(e) => setEmailQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37] text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-[#d4af37] text-[#0f0f11] font-semibold text-xs uppercase tracking-wider hover:brightness-110 disabled:opacity-50 transition-all whitespace-nowrap"
            >
              {loading ? '...' : t.searchButton}
            </button>
          </div>
        </form>

        {/* Results Area */}
        <div className="p-6 max-h-96 overflow-y-auto space-y-4">
          {results === null ? (
            <p className="text-sm text-zinc-500 text-center py-6">
              Bitte E-Mail-Adresse oder Referenznummer eingeben...
            </p>
          ) : results.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <p className="text-sm text-zinc-400 font-medium">{t.noBookingsFound}</p>
              <p className="text-xs text-zinc-500">
                Tipp: Test-E-Mails sind z. B. <span className="text-[#d4af37] font-mono">florian.schmidt@example.de</span>
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-xl bg-zinc-900 border border-zinc-800/80 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <span className="font-mono text-xs text-[#d4af37] font-bold">
                      {b.id}
                    </span>
                    {getStatusBadge(b.status)}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2 text-zinc-300">
                      <Calendar className="w-4 h-4 text-zinc-500" />
                      <span>
                        {b.preferredDate} ({b.preferredTime} Uhr)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-300">
                      <Wrench className="w-4 h-4 text-zinc-500" />
                      <span className="truncate">{b.service}</span>
                    </div>
                  </div>

                  {b.message && (
                    <p className="text-xs text-zinc-400 italic bg-zinc-950 p-2.5 rounded border border-zinc-800/60">
                      "{b.message}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/40 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Schließen / Close
          </button>
        </div>
      </div>
    </div>
  );
};
