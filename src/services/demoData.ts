import { WatchServiceItem, AdminSettings, Booking } from '../types';

export const INITIAL_SERVICES: WatchServiceItem[] = [
  {
    id: 'service-1',
    title: 'Uhrenreparatur / Watch Repair',
    description: 'Professionelle Reparatur und Instandsetzung mechanischer Uhrwerke sowie Quarz-Kaliber von Schweizer und deutschen Manufakturen.',
    imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 1,
  },
  {
    id: 'service-2',
    title: 'Uhrenservice & Wartung / Watch Service',
    description: 'Komplette Revision, Ultraschall-Gehäuseaufbereitung, Dichtigkeitsprüfung und Prüfung der Ganggenauigkeit nach Herstellernormen.',
    imageUrl: 'https://images.unsplash.com/photo-1547996169-4284591fe50d?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 2,
  },
  {
    id: 'service-3',
    title: 'Luxusuhren-Restauration / Luxury Watch Restoration',
    description: 'Behutsame historische Restauration antiker und wertvoller Sammleruhren mit Anfertigung fehlender Mechanikteile und Aufarbeitung.',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 3,
  },
];

export const INITIAL_SETTINGS: AdminSettings = {
  logoUrl: '/logo.svg',
  imgbbApiKey: '',
  enableDemoMode: true,
  adminEmail: 'darbas11@gmail.com',
  businessName: 'Weber Uhrenservice',
  phone: '+4915218263006',
  email: 'darbas11@gmail.com',
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'WEBER-2026-101',
    fullName: 'Dr. Florian Schmidt',
    email: 'florian.schmidt@example.de',
    phone: '+49 170 1234567',
    preferredDate: '2026-08-15',
    preferredTime: '10:30',
    service: 'Uhrenservice & Wartung / Watch Service',
    message: 'Rolex Submariner Date – Revision und Überprüfung der Wasserdichtigkeit.',
    status: 'pending',
    createdAt: '2026-08-01T09:15:00.000Z',
  },
  {
    id: 'WEBER-2026-102',
    fullName: 'Clara von Hardenberg',
    email: 'clara.hardenberg@example.de',
    phone: '+49 171 9876543',
    preferredDate: '2026-08-18',
    preferredTime: '14:00',
    service: 'Luxusuhren-Restauration / Luxury Watch Restoration',
    message: 'A. Lange & Söhne 1815 – historische Revision des Kalibers.',
    status: 'approved',
    createdAt: '2026-08-02T11:40:00.000Z',
  },
];
