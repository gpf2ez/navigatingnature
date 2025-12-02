// services/SiteContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {
  BlogPost,
  SiteConfig,
  CalendarEvent,
  Service,
  MapRegion,
  UserSubmission
} from '../types';

interface SiteContextType {
  posts: BlogPost[];
  config: SiteConfig;
  events: CalendarEvent[];
  services: Service[];
  regions: MapRegion[];
  submissions: UserSubmission[];
  addPost: (post: BlogPost) => void;
  updatePost: (post: BlogPost) => void;
  deletePost: (id: string) => void;
  updateConfig: (config: SiteConfig) => void;
  addEvent: (event: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
  addSubmission: (s: UserSubmission) => void;
  updateSubmissionStatus: (id: string, status: UserSubmission['status']) => void;
  isAdmin: boolean;
  toggleAdmin: () => void;
}

const emptyPost: BlogPost = {
  id: '',
  title: '',
  excerpt: '',
  content: '',
  author: 'Admin',
  date: new Date().toISOString().split('T')[0],
  imageUrl: 'https://picsum.photos/seed/new/800/600',
  category: 'General',
  tags: [],
  status: 'draft'
};

const defaultConfig: SiteConfig = {
  siteName: 'Navigating Nature',
  siteDescription: 'Explore, learn, and engage with the natural world.',
  logoUrl: 'https://cdn-icons-png.flaticon.com/512/3025/3025689.png',
  contactEmail: 'hello@navigatingnature.com',
  socialLinks: { facebook: '', twitter: '', instagram: '' },
  seo: {
    metaTitle: 'Navigating Nature',
    metaDescription: 'Explore the natural world — maps, programs and community.',
    imageUrl: 'https://picsum.photos/seed/og/1200/630'
  }
};

const defaultPosts: BlogPost[] = [
  {
    ...emptyPost,
    id: 'post-1',
    title: 'Welcome to Navigating Nature',
    excerpt: 'An introduction to our community-guided nature site.',
    content: '<p>Welcome! This is a sample post.</p>',
    status: 'published',
    date: new Date().toISOString().split('T')[0]
  }
];

const defaultEvents: CalendarEvent[] = [
  {
    id: 'ev1',
    title: 'Guided Hike: Emerald Forest',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    description: 'A beginner-friendly guided hike of local trails.',
    location: 'Emerald Forest Visitor Center'
  }
];

const defaultServices: Service[] = [
  { id: '1', title: 'Guided Hikes', description: 'Expert-led tours of local trails.', icon: 'Map' },
  { id: '2', title: 'School Programs', description: 'Curriculum-aligned visits and workshops.', icon: 'BookOpen' }
];

const defaultRegions: MapRegion[] = [
  {
    id: 'r1',
    name: 'Emerald Forest',
    description: 'Ancient woodland with varied habitats.',
    imageUrl: 'https://picsum.photos/seed/forestmap/1200/800',
    pointsOfInterest: []
  }
];

const defaultSubmissions: UserSubmission[] = [];

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<BlogPost[]>(defaultPosts);
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [events, setEvents] = useState<CalendarEvent[]>(defaultEvents);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [regions, setRegions] = useState<MapRegion[]>(defaultRegions);
  const [submissions, setSubmissions] = useState<UserSubmission[]>(defaultSubmissions);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Example: persist to localStorage for dev convenience
  useEffect(() => {
    try {
      localStorage.setItem('nn_posts', JSON.stringify(posts));
      localStorage.setItem('nn_config', JSON.stringify(config));
    } catch (e) {
      // ignore localStorage write failures in restricted environments
    }
  }, [posts, config]);

  const addPost = (post: BlogPost) => {
    setPosts(prev => [{ ...post, id: post.id || Date.now().toString() }, ...prev]);
  };

  const updatePost = (post: BlogPost) => {
    setPosts(prev => prev.map(p => (p.id === post.id ? post : p)));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const updateConfig = (c: SiteConfig) => {
    setConfig(c);
  };

  const addEvent = (event: CalendarEvent) => {
    setEvents(prev => [{ ...event, id: event.id || Date.now().toString() }, ...prev]);
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const addSubmission = (s: UserSubmission) => {
    setSubmissions(prev => [{ ...s, id: s.id || Date.now().toString(), status: 'pending' }, ...prev]);
  };

  const updateSubmissionStatus = (id: string, status: UserSubmission['status']) => {
    setSubmissions(prev => prev.map(s => (s.id === id ? { ...s, status } : s)));
  };

  const toggleAdmin = () => setIsAdmin(v => !v);

  return (
    <SiteContext.Provider
      value={{
        posts,
        config,
        events,
        services,
        regions,
        submissions,
        addPost,
        updatePost,
        deletePost,
        updateConfig,
        addEvent,
        deleteEvent,
        addSubmission,
        updateSubmissionStatus,
        isAdmin,
        toggleAdmin
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within a SiteProvider');
  return ctx;
};
