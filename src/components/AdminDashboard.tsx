import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Calendar,
  Wrench,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Upload,
  Phone,
  Mail,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Key,
  AlertCircle,
  Image as ImageIcon,
} from 'lucide-react';
import { WatchServiceItem, Booking, AdminSettings, Language } from '../types';
import { translations } from '../i18n/translations';
import { apiService } from '../services/api';
import { Logo } from './Logo';

interface AdminDashboardProps {
  currentLang: Language;
  onLogout: () => void;
  onNavigateHome: () => void;
  logoUrl?: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentLang,
  onLogout,
  onNavigateHome,
  logoUrl,
}) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'services' | 'settings'>(
    'bookings'
  );

  // Data State
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<WatchServiceItem[]>([]);
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  // Filters & Search
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>(
    'all'
  );
  const [bookingSearch, setBookingSearch] = useState('');

  // New/Edit Service Item Modal State
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceImageUrl, setServiceImageUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // ImgBB / Settings State
  const [imgbbKeyInput, setImgbbKeyInput] = useState('');
  const [settingsMessage, setSettingsMessage] = useState<string | null>(null);

  const statusT = translations[currentLang].status;

  // Load all admin data
  const refreshData = async () => {
    setLoadingData(true);
    try {
      const [bList, sList, setObj] = await Promise.all([
        apiService.getBookings(),
        apiService.getServices(),
        apiService.getSettings(),
      ]);
      setBookings(bList);
      setServices(sList);
      setSettings(setObj);
      if (setObj.imgbbApiKey) {
        setImgbbKeyInput(setObj.imgbbApiKey);
      }
    } catch (err) {
      console.error('Failed loading admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const query = bookingSearch.trim().toLowerCase();
    const matchesSearch =
      !query ||
      b.fullName.toLowerCase().includes(query) ||
      b.email.toLowerCase().includes(query) ||
      b.id.toLowerCase().includes(query) ||
      b.service.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  // Overview Counts
  const pendingCount = bookings.filter((b) => b.status === 'pending').length;
  const approvedCount = bookings.filter((b) => b.status === 'approved').length;
  const rejectedCount = bookings.filter((b) => b.status === 'rejected').length;

  // Booking status update
  const handleUpdateBookingStatus = async (id: string, status: Booking['status']) => {
    try {
      await apiService.updateBookingStatus(id, status);
      await refreshData();
    } catch (err) {
      alert('Fehler beim Aktualisieren des Status');
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!window.confirm('Möchten Sie diese Anfrage wirklich unwiderruflich löschen?')) return;
    try {
      await apiService.deleteBooking(id);
      await refreshData();
    } catch (err) {
      alert('Fehler beim Löschen');
    }
  };

  // Open modal for add / edit service
  const handleOpenServiceModal = (item?: WatchServiceItem) => {
    setUploadError(null);
    if (item) {
      setEditingServiceId(item.id);
      setServiceTitle(item.title);
      setServiceDescription(item.description || '');
      setServiceImageUrl(item.imageUrl);
    } else {
      setEditingServiceId(null);
      setServiceTitle('');
      setServiceDescription('');
      setServiceImageUrl('https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80');
    }
    setIsServiceModalOpen(true);
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    setUploadingImage(true);
    setUploadError(null);
    try {
      const url = await apiService.uploadImageToImgBB(file, imgbbKeyInput);
      setServiceImageUrl(url);
    } catch (err: any) {
      setUploadError(err.message || 'Bild-Upload fehlgeschlagen');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceTitle.trim() || !serviceImageUrl.trim()) return;

    try {
      await apiService.saveService(
        {
          title: serviceTitle.trim(),
          description: serviceDescription.trim(),
          imageUrl: serviceImageUrl.trim(),
        },
        editingServiceId || undefined
      );
      setIsServiceModalOpen(false);
      await refreshData();
    } catch (err) {
      alert('Fehler beim Speichern der Leistung');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm('Möchten Sie diese Leistung wirklich löschen?')) return;
    try {
      await apiService.deleteService(id);
      await refreshData();
    } catch (err) {
      alert('Fehler beim Löschen der Leistung');
    }
  };

  const handleMoveService = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= services.length) return;

    const newOrder = [...services];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    const ids = newOrder.map((s) => s.id);
    await apiService.reorderServices(ids);
    await refreshData();
  };

  // Save Settings & ImgBB API Key
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.updateSettings({
        imgbbApiKey: imgbbKeyInput.trim(),
      });
      setSettingsMessage('Einstellungen und ImgBB-API-Key erfolgreich gespeichert!');
      setTimeout(() => setSettingsMessage(null), 4000);
      await refreshData();
    } catch (err) {
      alert('Fehler beim Speichern der Einstellungen');
    }
  };

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Die neuen Passwörter stimmen nicht überein.' });
      return;
    }
    if (newPassword.length < 5) {
      setPasswordMessage({ type: 'error', text: 'Das neue Passwort sollte mindestens 5 Zeichen haben.' });
      return;
    }

    const res = await apiService.changeAdminPassword(currentPassword, newPassword);
    if (res.success) {
      setPasswordMessage({ type: 'success', text: 'Passwort erfolgreich geändert!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordMessage({ type: 'error', text: res.error || 'Fehler beim Ändern des Passworts' });
    }
    setTimeout(() => setPasswordMessage(null), 5000);
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
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] flex flex-col">
      {/* Top Admin Navigation Bar */}
      <header className="bg-zinc-900/90 border-b border-[#1f1f1f] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo logoUrl={logoUrl} className="h-11 w-auto" />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-[#c5a059]/15 border border-[#c5a059]/40 text-[#c5a059] text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Center</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshData}
              className="p-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Daten aktualisieren"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Aktualisieren</span>
            </button>

            <button
              onClick={onNavigateHome}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider"
            >
              Startseite
            </button>

            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 hover:text-red-100 border border-red-500/30 transition-colors text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Abmelden</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="bg-zinc-950/80 border-t border-[#1f1f1f]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'bookings'
                  ? 'border-[#c5a059] text-white bg-zinc-900/60'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#c5a059]" />
              <span>Anfragen &amp; Buchungen ({bookings.length})</span>
              {pendingCount > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-amber-500 text-black font-bold text-[10px]">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'services'
                  ? 'border-[#c5a059] text-white bg-zinc-900/60'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Wrench className="w-4 h-4 text-[#c5a059]" />
              <span>Uhren &amp; Leistungen ({services.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'settings'
                  ? 'border-[#c5a059] text-white bg-zinc-900/60'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4 text-[#c5a059]" />
              <span>Einstellungen &amp; ImgBB Key</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Quick Stat Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-zinc-900 border border-[#1f1f1f]">
            <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
              Anfragen Gesamt
            </p>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              {bookings.length}
            </p>
          </div>
          <div className="p-5 rounded-xl bg-zinc-900 border border-[#1f1f1f]">
            <p className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
              Ausstehend
            </p>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-amber-400 mt-1">
              {pendingCount}
            </p>
          </div>
          <div className="p-5 rounded-xl bg-zinc-900 border border-[#1f1f1f]">
            <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              Genehmigt
            </p>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400 mt-1">
              {approvedCount}
            </p>
          </div>
          <div className="p-5 rounded-xl bg-zinc-900 border border-[#1f1f1f]">
            <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
              Katalog-Leistungen
            </p>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-[#c5a059] mt-1">
              {services.length}
            </p>
          </div>
        </div>

        {/* TAB 1: BOOKINGS / ANFRAGEN */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900 border border-[#1f1f1f]">
              <div className="flex items-center gap-2 overflow-x-auto">
                {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
                      statusFilter === status
                        ? 'bg-[#c5a059] text-black'
                        : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    {status === 'all'
                      ? 'Alle Anfragen'
                      : status === 'pending'
                      ? statusT.pending
                      : status === 'approved'
                      ? statusT.approved
                      : statusT.rejected}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  placeholder="Name, E-Mail, ID oder Leistung..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#c5a059] text-xs"
                />
              </div>
            </div>

            {/* Bookings List */}
            {filteredBookings.length === 0 ? (
              <div className="p-12 text-center rounded-xl bg-zinc-900 border border-[#1f1f1f] space-y-3">
                <Calendar className="w-10 h-10 text-zinc-600 mx-auto" />
                <p className="text-sm font-medium text-zinc-400">
                  Keine Terminanfragen für den ausgewählten Filter vorhanden.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-6 rounded-xl bg-zinc-900 border border-[#1f1f1f] hover:border-[#c5a059]/40 transition-all space-y-4 shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#c5a059] font-bold px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800">
                          {b.id}
                        </span>
                        <span className="text-xs text-zinc-500">
                          Eingegangen am: {new Date(b.createdAt).toLocaleDateString('de-DE')}
                        </span>
                      </div>
                      {getStatusBadge(b.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Customer Info */}
                      <div className="space-y-1.5">
                        <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                          Kunde
                        </p>
                        <p className="text-base font-bold text-white">{b.fullName}</p>
                        <div className="flex items-center gap-2 text-xs text-zinc-300">
                          <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                          <a
                            href={`tel:${b.phone}`}
                            className="hover:text-[#c5a059] underline underline-offset-2"
                          >
                            {b.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-300">
                          <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
                          <a
                            href={`mailto:${b.email}`}
                            className="hover:text-[#c5a059] underline underline-offset-2"
                          >
                            {b.email}
                          </a>
                        </div>
                      </div>

                      {/* Appointment & Service Details */}
                      <div className="space-y-1.5">
                        <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                          Wunschtermin &amp; Leistung
                        </p>
                        <p className="text-sm font-semibold text-white">
                          {b.preferredDate} ({b.preferredTime} Uhr)
                        </p>
                        <p className="text-xs text-[#c5a059] font-medium">{b.service}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col justify-end space-y-2">
                        <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                          Status verwalten
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, 'approved')}
                            className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition-all ${
                              b.status === 'approved'
                                ? 'bg-emerald-500 text-black font-bold'
                                : 'bg-zinc-800 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Genehmigen</span>
                          </button>

                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, 'rejected')}
                            className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition-all ${
                              b.status === 'rejected'
                                ? 'bg-red-500 text-black font-bold'
                                : 'bg-zinc-800 hover:bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Ablehnen</span>
                          </button>

                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, 'pending')}
                            className="px-2.5 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold uppercase"
                            title="Zurück auf Ausstehend setzen"
                          >
                            Zurücksetzen
                          </button>

                          <button
                            onClick={() => handleDeleteBooking(b.id)}
                            className="p-1.5 rounded bg-red-950/40 hover:bg-red-900 text-red-400 transition-colors ml-auto"
                            title="Anfrage löschen"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {b.message && (
                      <div className="pt-3 border-t border-zinc-800/80">
                        <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">
                          Nachricht des Kunden:
                        </p>
                        <p className="text-xs text-zinc-300 italic bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                          "{b.message}"
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SERVICES & WATCH CATALOG CRUD */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 rounded-xl bg-zinc-900 border border-[#1f1f1f]">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Uhrenreparatur-Leistungen &amp; Bilder
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Verwalten Sie Ihre Leistungen. Unterstützt direkten Bild-Upload zu ImgBB oder Bild-URLs.
                </p>
              </div>
              <button
                onClick={() => handleOpenServiceModal()}
                className="px-5 py-3 rounded-lg bg-[#c5a059] hover:bg-[#b08d48] text-[#0a0a0a] font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Neue Leistung hinzufügen</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col rounded-xl bg-zinc-900 border border-[#1f1f1f] hover:border-[#c5a059]/40 overflow-hidden shadow-lg transition-all"
                >
                  <div className="relative h-48 bg-zinc-950">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 border border-zinc-700 text-[10px] font-mono text-[#c5a059]">
                      #{index + 1}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-serif text-lg font-bold text-white leading-tight">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleMoveService(index, 'up')}
                          disabled={index === 0}
                          className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-30"
                          title="Nach oben verschieben"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveService(index, 'down')}
                          disabled={index === services.length - 1}
                          className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-30"
                          title="Nach unten verschieben"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenServiceModal(item)}
                          className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-[#c5a059] text-xs font-semibold uppercase flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Bearbeiten</span>
                        </button>

                        <button
                          onClick={() => handleDeleteService(item.id)}
                          className="p-1.5 rounded bg-red-950/40 hover:bg-red-900 text-red-400"
                          title="Leistung löschen"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SETTINGS & IMGBB CONFIGURATION */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ImgBB Key Form */}
            <div className="p-6 rounded-xl bg-zinc-900 border border-[#1f1f1f] space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#c5a059]" />
                  <span>ImgBB Bild-Upload API-Schlüssel</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Mit einem kostenlosen ImgBB API-Key können Sie Bilder hochladen, die automatisch auf ImgBB-Servern gespeichert werden – ideal für GitHub Pages / statisches Hosting.
                </p>
              </div>

              {settingsMessage && (
                <div className="p-3 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs">
                  {settingsMessage}
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    ImgBB API Key
                  </label>
                  <input
                    type="password"
                    value={imgbbKeyInput}
                    onChange={(e) => setImgbbKeyInput(e.target.value)}
                    placeholder="z. B. c41a5b8109d9f5263152504b2b8100..."
                    className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white font-mono text-sm focus:outline-none focus:border-[#c5a059]"
                  />
                  <p className="text-[11px] text-zinc-500">
                    Kostenlosen API-Key erstellen unter:{' '}
                    <a
                      href="https://api.imgbb.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c5a059] hover:underline"
                    >
                      api.imgbb.com
                    </a>
                  </p>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-[#c5a059] hover:bg-[#b08d48] text-[#0a0a0a] font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Einstellungen speichern
                </button>
              </form>
            </div>

            {/* Change Password Form */}
            <div className="p-6 rounded-xl bg-zinc-900 border border-[#1f1f1f] space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <Key className="w-5 h-5 text-[#c5a059]" />
                  <span>Admin-Passwort ändern</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Ändern Sie Ihr Zugangs-Passwort für diesen Administrationsbereich.
                </p>
              </div>

              {passwordMessage && (
                <div
                  className={`p-3 rounded-lg border text-xs ${
                    passwordMessage.type === 'success'
                      ? 'bg-emerald-950 border-emerald-500/40 text-emerald-300'
                      : 'bg-red-950 border-red-500/40 text-red-300'
                  }`}
                >
                  {passwordMessage.text}
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Aktuelles Passwort
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Aktuelles Passwort (z. B. admin123)"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white font-mono text-sm focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Neues Passwort
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Neues Passwort (mind. 5 Zeichen)"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white font-mono text-sm focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Neues Passwort bestätigen
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Neues Passwort wiederholen"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white font-mono text-sm focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider border border-zinc-700 transition-all"
                >
                  Passwort aktualisieren
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* SERVICE MODAL (ADD / EDIT) */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-2xl bg-zinc-900 border border-[#1f1f1f] shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-white">
                {editingServiceId ? 'Leistung bearbeiten' : 'Neue Leistung hinzufügen'}
              </h3>
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveService} className="p-6 space-y-5">
              {uploadError && (
                <div className="p-3 rounded bg-red-950 border border-red-500/40 text-red-300 text-xs">
                  {uploadError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Titel der Leistung *
                </label>
                <input
                  type="text"
                  required
                  value={serviceTitle}
                  onChange={(e) => setServiceTitle(e.target.value)}
                  placeholder="z. B. Uhrenservice & Wartung"
                  className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Beschreibung (optional)
                </label>
                <textarea
                  rows={3}
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  placeholder="Detaillierte Beschreibung der Serviceleistung..."
                  className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-[#c5a059] resize-y"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Bild-URL oder Datei-Upload *
                </label>
                <input
                  type="text"
                  required
                  value={serviceImageUrl}
                  onChange={(e) => setServiceImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs font-mono focus:outline-none focus:border-[#c5a059]"
                />

                <div className="flex items-center justify-between pt-1">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold uppercase tracking-wider transition-colors">
                    <Upload className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>{uploadingImage ? 'Lade hoch...' : 'Bild vom PC hochladen (ImgBB / lokal)'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>

                {serviceImageUrl && (
                  <div className="mt-2 h-36 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950">
                    <img
                      src={serviceImageUrl}
                      alt="Vorschau"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-5 py-2.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Abbrechen
                </button>

                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="px-6 py-2.5 rounded bg-[#c5a059] hover:bg-[#b08d48] text-[#0a0a0a] font-bold text-xs uppercase tracking-wider shadow"
                >
                  Speichern
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
