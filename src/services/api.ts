import { WatchServiceItem, Booking, AdminSettings } from "../types";
import {
  INITIAL_SERVICES,
  INITIAL_SETTINGS,
  INITIAL_BOOKINGS,
} from "./demoData";

const ADMIN_TOKEN_KEY = "weber_admin_token_v1";

// Helper to get auth header
function getAuthHeader() {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Helper to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export const apiService = {
  // ============ SERVICES CRUD ============
  async getServices(): Promise<WatchServiceItem[]> {
    try {
      const res = await fetch("/api/services");
      const data = await handleResponse<WatchServiceItem[]>(res);
      return data.sort((a, b) => (a.order || 0) - (b.order || 0));
    } catch (error) {
      console.warn("API error, falling back to localStorage:", error);
      // Fallback to localStorage
      const fallback = localStorage.getItem("weber_services_fallback");
      return fallback ? JSON.parse(fallback) : INITIAL_SERVICES;
    }
  },

  async saveService(
    item: { title: string; description?: string; imageUrl: string },
    id?: string,
  ): Promise<WatchServiceItem> {
    const existing = await this.getServices();

    let serviceItem: WatchServiceItem;
    if (id) {
      const found = existing.find((s) => s.id === id);
      serviceItem = {
        id,
        title: item.title,
        description: item.description || "",
        imageUrl: item.imageUrl,
        createdAt: found?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        order: found?.order || existing.length,
      };
    } else {
      serviceItem = {
        id: `service-${Date.now()}`,
        title: item.title,
        description: item.description || "",
        imageUrl: item.imageUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        order: existing.length + 1,
      };
    }

    try {
      const method = id ? "PUT" : "POST";
      const url = id ? `/api/services` : "/api/services";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(serviceItem),
      });
      const data = await handleResponse<WatchServiceItem>(res);
      return data;
    } catch (error) {
      console.warn("API error, saving to localStorage:", error);
      // Fallback to localStorage
      const fallback = localStorage.getItem("weber_services_fallback");
      let services = fallback ? JSON.parse(fallback) : INITIAL_SERVICES;
      if (id) {
        services = services.map((s: WatchServiceItem) =>
          s.id === id ? serviceItem : s,
        );
      } else {
        services = [...services, serviceItem];
      }
      localStorage.setItem("weber_services_fallback", JSON.stringify(services));
      return serviceItem;
    }
  },

  async deleteService(id: string): Promise<void> {
    try {
      const res = await fetch(`/api/services?id=${id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });
      await handleResponse(res);
    } catch (error) {
      console.warn("API error, deleting from localStorage:", error);
      // Fallback to localStorage
      const fallback = localStorage.getItem("weber_services_fallback");
      if (fallback) {
        const services = JSON.parse(fallback);
        const filtered = services.filter((s: WatchServiceItem) => s.id !== id);
        localStorage.setItem(
          "weber_services_fallback",
          JSON.stringify(filtered),
        );
      }
    }
  },

  async reorderServices(ids: string[]): Promise<void> {
    // For simplicity, we'll just update the order in localStorage
    const services = await this.getServices();
    const reordered = ids
      .map((id, idx) => {
        const found = services.find((s) => s.id === id);
        return found ? { ...found, order: idx + 1 } : null;
      })
      .filter((s): s is WatchServiceItem => s !== null);

    localStorage.setItem("weber_services_fallback", JSON.stringify(reordered));
  },

  // ============ BOOKINGS CRUD ============
  async getBookings(): Promise<Booking[]> {
    try {
      const res = await fetch("/api/bookings");
      const data = await handleResponse<Booking[]>(res);
      return data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } catch (error) {
      console.warn("API error, falling back to localStorage:", error);
      const fallback = localStorage.getItem("weber_bookings_fallback");
      return fallback ? JSON.parse(fallback) : INITIAL_BOOKINGS;
    }
  },

  async createBooking(
    bookingData: Omit<Booking, "id" | "status" | "createdAt">,
  ): Promise<Booking> {
    const newBooking: Booking = {
      ...bookingData,
      id: `WEBER-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBooking),
      });
      const data = await handleResponse<Booking>(res);
      return data;
    } catch (error) {
      console.warn("API error, saving to localStorage:", error);
      const fallback = localStorage.getItem("weber_bookings_fallback");
      const bookings = fallback ? JSON.parse(fallback) : INITIAL_BOOKINGS;
      const updated = [newBooking, ...bookings];
      localStorage.setItem("weber_bookings_fallback", JSON.stringify(updated));
      return newBooking;
    }
  },

  async updateBookingStatus(
    id: string,
    status: Booking["status"],
  ): Promise<Booking> {
    try {
      const res = await fetch("/api/bookings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({ id, status }),
      });
      const data = await handleResponse<Booking>(res);
      return data;
    } catch (error) {
      console.warn("API error, updating localStorage:", error);
      const fallback = localStorage.getItem("weber_bookings_fallback");
      if (fallback) {
        const bookings = JSON.parse(fallback);
        const updated = bookings.map((b: Booking) =>
          b.id === id ? { ...b, status } : b,
        );
        localStorage.setItem(
          "weber_bookings_fallback",
          JSON.stringify(updated),
        );
        const found = updated.find((b: Booking) => b.id === id);
        if (!found) throw new Error("Booking not found");
        return found;
      }
      throw new Error("Booking not found");
    }
  },

  async deleteBooking(id: string): Promise<void> {
    try {
      const res = await fetch(`/api/bookings?id=${id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });
      await handleResponse(res);
    } catch (error) {
      console.warn("API error, deleting from localStorage:", error);
      const fallback = localStorage.getItem("weber_bookings_fallback");
      if (fallback) {
        const bookings = JSON.parse(fallback);
        const filtered = bookings.filter((b: Booking) => b.id !== id);
        localStorage.setItem(
          "weber_bookings_fallback",
          JSON.stringify(filtered),
        );
      }
    }
  },

  async checkBookingStatusByEmail(email: string): Promise<Booking[]> {
    const bookings = await this.getBookings();
    const query = email.trim().toLowerCase();
    return bookings.filter(
      (b) => b.email.toLowerCase() === query || b.id.toLowerCase() === query,
    );
  },

  // ============ SETTINGS ============
  async getSettings(): Promise<AdminSettings> {
    try {
      const res = await fetch("/api/settings");
      const data = await handleResponse<AdminSettings>(res);
      return data;
    } catch (error) {
      console.warn("API error, falling back to localStorage:", error);
      const fallback = localStorage.getItem("weber_settings_fallback");
      return fallback ? JSON.parse(fallback) : INITIAL_SETTINGS;
    }
  },

  async updateSettings(
    settings: Partial<AdminSettings>,
  ): Promise<AdminSettings> {
    const existing = await this.getSettings();
    const updated = { ...existing, ...settings };

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(updated),
      });
      const data = await handleResponse<AdminSettings>(res);
      return data;
    } catch (error) {
      console.warn("API error, saving to localStorage:", error);
      localStorage.setItem("weber_settings_fallback", JSON.stringify(updated));
      return updated;
    }
  },

  // ============ ADMIN AUTH ============
  async loginAdmin(
    password: string,
  ): Promise<{ success: boolean; token?: string; error?: string }> {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
          return { success: true, token: data.token };
        }
        return { success: false, error: data.error || "Invalid password" };
      }
      return { success: false, error: "Server error" };
    } catch (error) {
      console.warn("API error, using localStorage auth:", error);
      // Fallback to localStorage
      const savedPassword =
        localStorage.getItem("weber_admin_password") || "admin123";
      if (password === savedPassword) {
        const token = "weber_token_" + Date.now();
        localStorage.setItem(ADMIN_TOKEN_KEY, token);
        return { success: true, token };
      }
      return { success: false, error: "Invalid password" };
    }
  },

  async changeAdminPassword(
    currentPass: string,
    newPass: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({
          currentPassword: currentPass,
          newPassword: newPass,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return { success: true };
      }
      const error = await res.json();
      return {
        success: false,
        error: error.error || "Failed to change password",
      };
    } catch (error) {
      console.warn("API error, updating localStorage:", error);
      // Fallback to localStorage
      const savedPassword =
        localStorage.getItem("weber_admin_password") || "admin123";
      if (currentPass !== savedPassword) {
        return { success: false, error: "Current password is incorrect" };
      }
      localStorage.setItem("weber_admin_password", newPass);
      return { success: true };
    }
  },

  logoutAdmin(): void {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    return Boolean(token && token.length > 5);
  },

  // ============ IMAGE UPLOAD ============
  async uploadImageToImgBB(file: File, customApiKey?: string): Promise<string> {
    const settings = await this.getSettings();
    const apiKey = customApiKey || settings.imgbbApiKey;

    if (apiKey && apiKey.trim().length > 5) {
      try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: formData,
          },
        );

        const data = await response.json();
        if (data && data.success && data.data && data.data.url) {
          return data.data.url;
        }
      } catch (err) {
        console.error("ImgBB error:", err);
      }
    }

    // Fallback to base64 DataURL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert image to DataURL"));
        }
      };
      reader.onerror = () => reject(new Error("Image reading error"));
      reader.readAsDataURL(file);
    });
  },
};
