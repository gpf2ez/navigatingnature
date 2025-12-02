import React from 'react';
import { useSite } from '../services/SiteContext';
import { Tape } from '../components/Scrapbook';
import { Tag, Calendar, User } from 'lucide-react';

const Blog: React.FC = () => {
  const { posts } = useSite();
  const publishedPosts = posts.filter(p => p.status === 'published');

  return (
    <div className="py-16 bg-nature-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-hand font-bold text-nature-dark mb-12 text-center">Field Journal</h1>
        
        <div className="space-y-16">
          {publishedPosts.map((post, index) => (
            <article key={post.id} className="flex flex-col md:flex-row bg-white shadow-xl overflow-hidden relative group">
              {/* Image Section */}
              <div className="md:w-2/5 h-64 md:h-auto overflow-hidden relative">
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition"></div>
                 <img 
                   src={post.imageUrl} 
                   alt={post.title} 
                   className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" 
                   loading="lazy" 
                   width="800" 
                   height="600" 
                 />
                 
                 {/* Date Stamp */}
                 <div className="absolute top-4 left-4 bg-white/90 p-2 text-center shadow-md rotate-[-2deg]">
                    <span className="block text-xl font-bold font-sans text-nature-dark">{new Date(post.date).getDate()}</span>
                    <span className="block text-xs uppercase font-bold text-nature-primary">{new Date(post.date).toLocaleString('default', { month: 'short' })}</span>
                 </div>
              </div>

              {/* Content Section */}
              <div className="md:w-3/5 p-8 flex flex-col justify-center relative">
                 {/* Aesthetic Tape */}
                 <Tape variant={index % 2 === 0 ? 'yellow' : 'white'} className="-top-3 right-12 w-24" />

                 <div className="flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    <span className="flex items-center gap-1"><Tag size={12} /> {post.category}</span>
                    <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                 </div>

                 <h2 className="text-3xl font-hand font-bold text-nature-dark mb-4 leading-tight group-hover:text-nature-primary transition">
                   {post.title}
                 </h2>
                 <p className="text-gray-600 font-sans mb-6 line-clamp-3">
                   {post.excerpt}
                 </p>
                 
                 <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex gap-2">
                       {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs bg-nature-light/20 text-nature-dark px-2 py-1 rounded-sm">#{tag}</span>
                       ))}
                    </div>
                    <button className="text-nature-accent font-bold uppercase text-sm hover:underline">Read More</button>
                 </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;