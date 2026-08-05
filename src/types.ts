export type Language = 'de' | 'en';

export type BookingStatus = 'pending' | 'approved' | 'rejected';

export interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  service: string;
  message: string;
  status: BookingStatus;
  createdAt: string;
}

export interface WatchServiceItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  order: number;
}

export interface AdminSettings {
  logoUrl: string;
  imgbbApiKey?: string;
  enableDemoMode: boolean;
  adminEmail: string;
  businessName: string;
  phone: string;
  email: string;
}

export interface AdminAuthSession {
  authenticated: boolean;
  token?: string;
  user?: {
    username: string;
    role: string;
  };
}
