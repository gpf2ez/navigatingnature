export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
  tags: string[];
  status: 'published' | 'draft';
}

export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  logoUrl: string;
  primaryColor: string;
  contactEmail: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  }
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  type: 'workshop' | 'hike' | 'volunteer' | 'other';
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price?: string;
}

export interface PointOfInterest {
  id: string;
  name: string;
  type: 'trail' | 'viewpoint' | 'center' | 'landmark';
  description: string;
  x: number; // Percentage X coordinate on map
  y: number; // Percentage Y coordinate on map
}

export interface MapRegion {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  pointsOfInterest: PointOfInterest[];
}

export interface UserSubmission {
  id: string;
  userName: string;
  type: 'photo' | 'review' | 'sighting';
  title: string;
  description: string;
  imageUrl?: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}