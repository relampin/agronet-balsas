export enum PlanType {
  FIBRA = 'FIBRA',
  RADIO = 'RÁDIO'
}

export enum CoverageStatus {
  ACTIVE = 'ACTIVE',
  PLANNED = 'PLANNED',
  UNAVAILABLE = 'UNAVAILABLE'
}

export interface InternetPlan {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  type: PlanType;
  speed: number;
  price: number;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  bannerImage?: string | null;
  bannerOrder?: number | null;
}

export interface Lead {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  phone: string;
  planId?: string | null;
  plan?: InternetPlan | null;
  source?: string | null;
  convertedAt?: Date | null;
  notes?: string | null;
  contacted: boolean;
  whatsappSent: boolean;
}

export interface CoverageArea {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  zipCodes: string[];
  hasFiber: boolean;
  hasRadio: boolean;
  status: CoverageStatus;
}

export interface Testimonial {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  location: string;
  comment: string;
  rating: number;
  isActive: boolean;
  imageUrl?: string | null;
}

export interface FAQ {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  question: string;
  answer: string;
  category?: string | null;
  order: number;
  isActive: boolean;
}

export interface SiteSetting {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  key: string;
  value: string;
}
