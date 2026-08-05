import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { apiService } from '../services/api';
import { Logo } from './Logo';

interface AdminLoginProps {
  currentLang: Language;
  onLoginSuccess: () => void;
  onNavigateHome: () => void;
  logoUrl?: string;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  currentLang,
  onLoginSuccess,
  onNavigateHome,
  logoUrl,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navT = translations[currentLang].nav;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const result = await apiService.loginAdmin(password.trim());
      if (result.success) {
        onLoginSuccess();
      } else {
        setError(result.error || 'Ungültiges Passwort / Invalid password');
      }
    } catch (err: any) {
      setError('Verbindungsfehler beim Login / Authentication connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] text-[#e5e5e5]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-6 text-center">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 hover:text-[#c5a059] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Zurück zur {navT.home} / Back to website</span>
        </button>

        <div className="flex justify-center">
          <Logo logoUrl={logoUrl} className="h-14 w-auto" />
        </div>

        <div className="space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Weber Uhrenservice Admin
          </h2>
          <p className="text-xs uppercase tracking-widest text-[#c5a059] font-semibold">
            Meisterwerkstatt Deutschland • Geschützter Bereich
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-zinc-900/90 border border-[#1f1f1f] py-8 px-6 sm:px-10 shadow-2xl rounded-xl space-y-6">
          {error && (
            <div className="p-4 rounded-lg bg-red-950/80 border border-red-500/40 text-red-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
              >
                Administrator Passwort
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Passwort eingeben (Standard: admin123)"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#c5a059] text-sm font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-lg bg-[#c5a059] hover:bg-[#b08d48] text-[#0a0a0a] font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? 'Anmelden...' : 'Anmelden / Login'}</span>
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
