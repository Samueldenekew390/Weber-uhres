import { Language } from '../types';

export interface Translations {
  nav: {
    home: string;
    services: string;
    booking: string;
    contact: string;
    admin: string;
    checkStatus: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    bookAppointment: string;
    callNow: string;
    heritageLabel: string;
    heritageText: string;
    warrantyLabel: string;
    warrantyText: string;
  };
  services: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    callToInquire: string;
    noDescriptionNotice: string;
  };
  booking: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    preferredDate: string;
    preferredTime: string;
    selectTime: string;
    serviceType: string;
    selectService: string;
    message: string;
    messagePlaceholder: string;
    submitBooking: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    newBookingButton: string;
    validation: {
      requiredField: string;
      invalidEmail: string;
      invalidPhone: string;
      pastDate: string;
    };
    statusModal: {
      title: string;
      subtitle: string;
      searchByEmail: string;
      searchPlaceholder: string;
      searchButton: string;
      noBookingsFound: string;
      statusLabel: string;
      bookingIdLabel: string;
      dateLabel: string;
      serviceLabel: string;
    };
  };
  status: {
    pending: string;
    approved: string;
    rejected: string;
  };
  contact: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    phoneLabel: string;
    emailLabel: string;
    addressLabel: string;
    addressText: string;
    hoursLabel: string;
    hoursText: string;
    callButton: string;
    emailButton: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    contactTitle: string;
    rights: string;
    githubReady: string;
  };
}

export const translations: Record<Language, Translations> = {
  de: {
    nav: {
      home: 'Startseite',
      services: 'Leistungen',
      booking: 'Termin buchen',
      contact: 'Kontakt',
      admin: 'Admin',
      checkStatus: 'Status abfragen',
    },
    hero: {
      badge: 'Zertifizierter Uhrmachermeister in Deutschland',
      headline: 'Präzision. Handwerkskunst. Zeit.',
      subheadline: 'Meisterhafte Pflege, Reparatur und Restauration von Luxusuhren. Mit höchster Akribie und jahrelanger Erfahrung garantieren wir die Lebensdauer Ihrer wertvollsten Zeitmesser.',
      bookAppointment: 'Termin anfragen',
      callNow: 'Jetzt anrufen',
      heritageLabel: 'Meisterwerkstatt',
      heritageText: 'Traditionelle Uhrmacherkunst kombiniert mit moderner Prüftechnik.',
      warrantyLabel: '24 Monate Garantie',
      warrantyText: 'Auf jede durchgeführte Generalüberholung und Revision.',
    },
    services: {
      sectionBadge: 'Unsere Kompetenzen',
      sectionTitle: 'Leistungen & Uhrenreparatur',
      sectionSubtitle: 'Vom einfachen Service bis zur komplexen Restauration historischer Manufakturkaliber – jede Uhr wird mit Sorgfalt behandelt.',
      callToInquire: 'Jetzt anrufen',
      noDescriptionNotice: '',
    },
    booking: {
      sectionBadge: 'Terminvereinbarung',
      sectionTitle: 'Ihren Wunschtermin anfragen',
      sectionSubtitle: 'Buchen Sie ganz bequem eine Beratung oder Überprüfung für Ihr Uhrwerk. Unser Team meldet sich umgehend mit einer Bestätigung.',
      fullName: 'Vollständiger Name',
      fullNamePlaceholder: 'z. B. Maximilian Weber',
      email: 'E-Mail-Adresse',
      emailPlaceholder: 'name@beispiel.de',
      phone: 'Telefonnummer',
      phonePlaceholder: 'z. B. +49 152 18263006',
      preferredDate: 'Wunschtermin',
      preferredTime: 'Wunschzeit',
      selectTime: 'Bitte Uhrzeit wählen',
      serviceType: 'Gewünschte Leistung / Uhrtyp',
      selectService: 'Bitte Leistung auswählen',
      message: 'Nachricht & Angaben zur Uhr (optional)',
      messagePlaceholder: 'Marke, Modell, Referenz oder Fehlerbeschreibung...',
      submitBooking: 'Termin anfragen',
      submitting: 'Wird übermittelt...',
      successTitle: 'Anfrage erfolgreich eingegangen',
      successMessage: 'Vielen Dank. Ihre Termin-Anfrage wurde erfolgreich übermittelt. Weber Uhrenservice wird diese prüfen und sich in Kürze bei Ihnen melden.',
      newBookingButton: 'Weitere Anfrage stellen',
      validation: {
        requiredField: 'Dieses Feld ist erforderlich.',
        invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
        invalidPhone: 'Bitte geben Sie eine gültige Telefonnummer ein.',
        pastDate: 'Das Datum darf nicht in der Vergangenheit liegen.',
      },
      statusModal: {
        title: 'Anfragestatus prüfen',
        subtitle: 'Geben Sie Ihre E-Mail-Adresse ein, um den aktuellen Bearbeitungsstand Ihrer Terminanfrage einzusehen.',
        searchByEmail: 'E-Mail-Adresse der Anfrage',
        searchPlaceholder: 'name@beispiel.de',
        searchButton: 'Status abfragen',
        noBookingsFound: 'Keine Anfragen unter dieser E-Mail-Adresse gefunden.',
        statusLabel: 'Status',
        bookingIdLabel: 'Referenz-Nr.',
        dateLabel: 'Datum & Uhrzeit',
        serviceLabel: 'Leistung',
      },
    },
    status: {
      pending: 'Ausstehend',
      approved: 'Genehmigt',
      rejected: 'Abgelehnt',
    },
    contact: {
      sectionBadge: 'Direkter Draht',
      sectionTitle: 'Kontakt & Werkstatt',
      sectionSubtitle: 'Haben Sie spezielle Fragen zu Ihrem Zeitmesser? Rufen Sie uns direkt an oder schreiben Sie uns eine Nachricht.',
      phoneLabel: 'Telefon',
      emailLabel: 'E-Mail',
      addressLabel: 'Standort',
      addressText: 'Meisterwerkstatt Deutschland',
      hoursLabel: 'Öffnungszeiten',
      hoursText: 'Mo. – Fr.: 09:00 – 18:00 Uhr | Sa.: nach Vereinbarung',
      callButton: 'Weber Uhrenservice anrufen',
      emailButton: 'E-Mail senden',
    },
    footer: {
      tagline: 'Uhrmachermeister – Präzision & Vertrauen. Professionelle Uhrenreparatur, Wartung und Restauration von Luxusuhren in Deutschland.',
      quickLinks: 'Navigation',
      contactTitle: 'Kontakt',
      rights: 'Alle Rechte vorbehalten.',
      githubReady: 'Bereit für GitHub Pages & Namecheap Domain.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      booking: 'Book an Appointment',
      contact: 'Contact',
      admin: 'Admin',
      checkStatus: 'Check Status',
    },
    hero: {
      badge: 'Certified Master Watchmaker in Germany',
      headline: 'Precision. Craftsmanship. Time.',
      subheadline: 'Masterful care, repair, and restoration of luxury watches. With extreme precision and years of experience, we guarantee the longevity of your most prized timepieces.',
      bookAppointment: 'Book an Appointment',
      callNow: 'Call Now',
      heritageLabel: 'Master Workshop',
      heritageText: 'Traditional watchmaking craftsmanship paired with modern diagnostics.',
      warrantyLabel: '24-Month Warranty',
      warrantyText: 'On every full overhaul and mechanical movement restoration.',
    },
    services: {
      sectionBadge: 'Our Expertise',
      sectionTitle: 'Services & Watch Repair',
      sectionSubtitle: 'From routine servicing to complex restorations of historical manufacture calibers – every timepiece is treated with exceptional care.',
      callToInquire: 'Call Now',
      noDescriptionNotice: '',
    },
    booking: {
      sectionBadge: 'Online Appointment',
      sectionTitle: 'Request Your Appointment',
      sectionSubtitle: 'Conveniently request a consultation or movement diagnosis. Our team will review your request and confirm your appointment promptly.',
      fullName: 'Full Name',
      fullNamePlaceholder: 'e.g. Maximilian Weber',
      email: 'Email Address',
      emailPlaceholder: 'name@example.com',
      phone: 'Phone Number',
      phonePlaceholder: 'e.g. +49 152 18263006',
      preferredDate: 'Preferred Date',
      preferredTime: 'Preferred Time',
      selectTime: 'Please select a time',
      serviceType: 'Service / Watch Type',
      selectService: 'Please select a service',
      message: 'Message & Watch Details (optional)',
      messagePlaceholder: 'Brand, model, reference number, or symptom description...',
      submitBooking: 'Submit Booking',
      submitting: 'Submitting...',
      successTitle: 'Appointment Request Received',
      successMessage: 'Thank you. Your appointment request has been received. Weber Uhrenservice will review your request and contact you.',
      newBookingButton: 'Submit Another Request',
      validation: {
        requiredField: 'This field is required.',
        invalidEmail: 'Please enter a valid email address.',
        invalidPhone: 'Please enter a valid phone number.',
        pastDate: 'Preferred date cannot be in the past.',
      },
      statusModal: {
        title: 'Check Request Status',
        subtitle: 'Enter your email address to view the current status of your appointment request.',
        searchByEmail: 'Booking Email Address',
        searchPlaceholder: 'name@example.com',
        searchButton: 'Check Status',
        noBookingsFound: 'No appointment requests found for this email address.',
        statusLabel: 'Status',
        bookingIdLabel: 'Reference No.',
        dateLabel: 'Date & Time',
        serviceLabel: 'Service',
      },
    },
    status: {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
    },
    contact: {
      sectionBadge: 'Direct Line',
      sectionTitle: 'Contact & Workshop',
      sectionSubtitle: 'Do you have specific questions about your timepiece? Call us directly or send us an email.',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      addressLabel: 'Location',
      addressText: 'Master Workshop Germany',
      hoursLabel: 'Opening Hours',
      hoursText: 'Mon – Fri: 09:00 – 18:00 | Sat: by appointment',
      callButton: 'Call Weber Uhrenservice',
      emailButton: 'Send Email',
    },
    footer: {
      tagline: 'Master Watchmaker – Precision & Trust. Professional luxury watch repair, servicing, and restoration in Germany.',
      quickLinks: 'Navigation',
      contactTitle: 'Contact',
      rights: 'All rights reserved.',
      githubReady: 'Ready for GitHub Pages & Namecheap Domain.',
    },
  },
};
