/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, WatchServiceItem, AdminSettings } from './types';
import { apiService } from './services/api';
import { INITIAL_SERVICES } from './services/demoData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceShowcase } from './components/ServiceShowcase';
import { BookingSection } from './components/BookingSection';
import { BookingStatusModal } from './components/BookingStatusModal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('de');
  const [isAdminView, setIsAdminView] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  // Pre-selected service when clicking a service card
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | undefined>(undefined);

  // Settings loaded from server/localStorage
  const [settings, setSettings] = useState<AdminSettings>({
    businessName: 'Weber Uhrenservice',
    email: 'darbas11@gmail.com',
    phone: '+4915218263006',
  });

  const [services, setServices] = useState<WatchServiceItem[]>(INITIAL_SERVICES);

  useEffect(() => {
    const initApp = async () => {
      try {
        const [setObj, sList] = await Promise.all([
          apiService.getSettings(),
          apiService.getServices(),
        ]);
        if (setObj) setSettings(setObj);
        if (sList && sList.length > 0) setServices(sList);
      } catch (err) {
        console.error('Initialization fallback error:', err);
      }
    };
    initApp();
  }, []);

  const handleSelectService = (title: string) => {
    setSelectedServiceTitle(title);
    const bookingElement = document.getElementById('booking');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdminView(false);
  };

  const handleNavigate = (tab: 'home' | 'admin', sectionId?: string) => {
    if (tab === 'admin') {
      setIsAdminView(true);
    } else {
      setIsAdminView(false);
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  // Admin View Rendering
  if (isAdminView) {
    if (!isLoggedIn) {
      return (
        <AdminLogin
          currentLang={currentLang}
          onLoginSuccess={handleLoginSuccess}
          onNavigateHome={() => setIsAdminView(false)}
          logoUrl={settings.logoUrl}
        />
      );
    }
    return (
      <AdminDashboard
        currentLang={currentLang}
        onLogout={handleLogout}
        onNavigateHome={() => setIsAdminView(false)}
        logoUrl={settings.logoUrl}
      />
    );
  }

  // Public Website Rendering
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] font-sans flex flex-col selection:bg-[#c5a059] selection:text-[#0a0a0a]">
      {/* Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        activeTab={isAdminView ? 'admin' : 'home'}
        onNavigate={handleNavigate}
        onOpenStatusModal={() => setIsStatusModalOpen(true)}
        logoUrl={settings.logoUrl}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero
          currentLang={currentLang}
          onBookClick={() => {
            const el = document.getElementById('booking');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Watch & Repair Service Showcase */}
        <ServiceShowcase
          services={services}
          currentLang={currentLang}
          onBookService={handleSelectService}
        />

        {/* Appointment & Booking Section */}
        <BookingSection
          services={services}
          currentLang={currentLang}
          selectedServiceTitle={selectedServiceTitle}
          onSubmitBooking={(bookingData) => apiService.createBooking(bookingData)}
          onOpenStatusModal={() => setIsStatusModalOpen(true)}
        />

        {/* Contact & Meisterwerkstatt Section */}
        <ContactSection currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        logoUrl={settings.logoUrl}
        onNavigate={handleNavigate}
        onOpenStatusModal={() => setIsStatusModalOpen(true)}
      />

      {/* Booking Status Check Modal */}
      {isStatusModalOpen && (
        <BookingStatusModal
          isOpen={isStatusModalOpen}
          currentLang={currentLang}
          onClose={() => setIsStatusModalOpen(false)}
        />
      )}
    </div>
  );
}

