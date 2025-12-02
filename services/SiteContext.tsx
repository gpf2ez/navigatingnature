import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BlogPost, SiteConfig, CalendarEvent, Service, MapRegion, UserSubmission } from '../types';

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
  addSubmission: (submission: UserSubmission) => void;
  updateSubmissionStatus: (id: string, status: 'approved' | 'rejected') => void;
  isAdmin: boolean;
  toggleAdmin: () => void;
}

const defaultPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding the Forest Ecosystem',
    excerpt: 'A deep dive into how producers, consumers, and decomposers work together.',
    content: 'Forests are complex webs of life. From the towering canopy to the fungal networks underground...',
    author: 'Ranger Rick',
    date: '2023-10-15',
    imageUrl: 'https://picsum.photos/seed/forest1/800/600',
    category: 'Ecology',
    tags: ['forest', 'science', 'nature'],
    status: 'published'
  },
  {
    id: '2',
    title: 'Top 5 Mushrooms to Spot this Fall',
    excerpt: 'Grab your basket! Here are the most photogenic fungi appearing this season.',
    content: 'Fall is prime time for mycology enthusiasts. Look out for the Fly Agaric...',
    author: 'Sarah Spore',
    date: '2023-10-20',
    imageUrl: 'https://picsum.photos/seed/mushroom/800/600',
    category: 'Mycology',
    tags: ['mushrooms', 'fall', 'guide'],
    status: 'published'
  },
  {
    id: '3',
    title: 'Tracking Wildlife: A Beginners Guide',
    excerpt: 'Learn to read the signs left behind by our furry neighbors.',
    content: 'Tracks, scat, and fur snags can tell a story of who walked this path before you...',
    author: 'Tracker Tom',
    date: '2023-10-28',
    imageUrl: 'https://picsum.photos/seed/fox/800/600',
    category: 'Skills',
    tags: ['tracking', 'animals', 'outdoor skills'],
    status: 'published'
  }
];

const defaultConfig: SiteConfig = {
  siteName: 'Navigating Nature',
  siteDescription: 'Your guide to the wild world.',
  logoUrl: './logo.png',
  primaryColor: '#1a4d2e',
  contactEmail: 'hello@navigatingnature.com',
  socialLinks: {
    facebook: '#',
    twitter: '#',
    instagram: '#'
  },
  seo: {
    metaTitle: 'Navigating Nature - Explore the Wild',
    metaDescription: 'Discover the beauty of nature through our guides, blog, and events.',
    keywords: 'nature, hiking, ecology, forest, wildlife'
  }
};

const defaultEvents: CalendarEvent[] = [
  { id: '1', title: 'Morning Bird Walk', date: '2023-11-15', type: 'hike', description: 'Bring your binoculars!' },
  { id: '2', title: 'Mushroom ID Workshop', date: '2023-11-20', type: 'workshop', description: 'Learn the basics of fungi.' }
];

const defaultServices: Service[] = [
  { id: '1', title: 'Guided Hikes', description: 'Expert-led tours through local trails focusing on flora and fauna.', icon: 'Map' },
  { id: '2', title: 'School Programs', description: 'Educational field trips for K-12 students tailored to curriculum.', icon: 'BookOpen' },
  { id: '3', title: 'Ecological Surveys', description: 'Professional land assessment and biodiversity reporting.', icon: 'Clipboard' }
];

const defaultRegions: MapRegion[] = [
  {
    id: '1',
    name: 'Emerald Forest',
    description: 'A dense, ancient woodland teeming with life and hidden trails.',
    imageUrl: 'https://picsum.photos/seed/forestmap/1200/800',
    pointsOfInterest: [
      { id: 'p1', name: 'Whispering Pines Trail', type: 'trail', description: 'A 3-mile loop through old-growth pines.', x: 20, y: 40 },
      { id: 'p2', name: 'Eagle Outlook', type: 'viewpoint', description: 'Highest point in the forest, great for birdwatching.', x: 65, y: 25 },
      { id: 'p3', name: 'Visitor Lodge', type: 'center', description: 'Maps, snacks, and restrooms available here.', x: 45, y: 80 }
    ]
  },
  {
    id: '2',
    name: 'Granite Peaks',
    description: 'Rugged mountain terrain for the adventurous hiker.',
    imageUrl: 'https://picsum.photos/seed/mountainmap/1200/800',
    pointsOfInterest: [
      { id: 'p4', name: 'Summit Base Camp', type: 'center', description: 'Registration required for summit attempts.', x: 50, y: 60 },
      { id: 'p5', name: 'Mirror Lake', type: 'landmark', description: 'Crystal clear alpine lake.', x: 30, y: 70 },
      { id: 'p6', name: 'Cloud Ridge', type: 'viewpoint', description: 'Spectacular views above the treeline.', x: 70, y: 30 }
    ]
  },
  {
    id: '3',
    name: 'Coastal Dunes',
    description: 'Where the ocean meets the land. Windy, wild, and beautiful.',
    imageUrl: 'https://picsum.photos/seed/coastmap/1200/800',
    pointsOfInterest: [
      { id: 'p7', name: 'Lighthouse Point', type: 'landmark', description: 'Historic lighthouse built in 1902.', x: 85, y: 20 },
      { id: 'p8', name: 'Seal Rock', type: 'viewpoint', description: 'Best spot to see harbor seals basking.', x: 20, y: 50 },
      { id: 'p9', name: 'Dune Walkway', type: 'trail', description: 'Protected wooden path through the sand dunes.', x: 50, y: 60 }
    ]
  }
];

const defaultSubmissions: UserSubmission[] = [
  {
    id: '1',
    userName: 'Jane Doe',
    type: 'sighting',
    title: 'Spotted a Red Fox!',
    description: 'Saw a beautiful red fox near the creek this morning.',
    imageUrl: 'https://picsum.photos/seed/fox/400/300',
    date: '2023-11-01',
    status: 'approved'
  },
  {
    id: '2',
    userName: 'Bob Smith',
    type: 'review',
    title: 'Great Trail Conditions',
    description: 'The Whispering Pines trail is in perfect condition right now.',
    date: '2023-11-02',
    status: 'approved'
  },
  {
    id: '3',
    userName: 'Alice Wonder',
    type: 'photo',
    title: 'Sunrise over the peaks',
    description: 'Caught this amazing light just as the sun came up.',
    imageUrl: 'https://picsum.photos/seed/sunrise/400/300',
    date: '2023-11-03',
    status: 'pending'
  }
];

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>(defaultPosts);
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [events, setEvents] = useState<CalendarEvent[]>(defaultEvents);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [regions, setRegions] = useState<MapRegion[]>(defaultRegions);
  const [submissions, setSubmissions] = useState<UserSubmission[]>(defaultSubmissions);
  const [isAdmin, setIsAdmin] = useState(false);

  const addPost = (post: BlogPost) => setPosts([...posts, post]);
  const updatePost = (updatedPost: BlogPost) => {
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  };
  const deletePost = (id: string) => setPosts(posts.filter(p => p.id !== id));
  
  const updateConfig = (newConfig: SiteConfig) => setConfig(newConfig);
  
  const addEvent = (event: CalendarEvent) => setEvents([...events, event]);
  const deleteEvent = (id: string) => setEvents(events.filter(e => e.id !== id));

  const addSubmission = (submission: UserSubmission) => setSubmissions([submission, ...submissions]);
  const updateSubmissionStatus = (id: string, status: 'approved' | 'rejected') => {
    setSubmissions(submissions.map(s => s.id === id ? { ...s, status } : s));
  };

  const toggleAdmin = () => setIsAdmin(!isAdmin);

  // SEO Effect
  useEffect(() => {
    document.title = config.seo.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', config.seo.metaDescription);
  }, [config]);

  return (
    <SiteContext.Provider value={{ 
      posts, config, events, services, regions, submissions,
      addPost, updatePost, deletePost, updateConfig, 
      addEvent, deleteEvent, 
      addSubmission, updateSubmissionStatus,
      isAdmin, toggleAdmin 
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used within a SiteProvider');
  return context;
};