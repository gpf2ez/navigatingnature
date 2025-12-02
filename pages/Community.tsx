import React, { useState } from 'react';
import { useSite } from '../services/SiteContext';
import { Tape, Polaroid, NatureButton } from '../components/Scrapbook';
import { Camera, PenTool, Eye, CheckCircle, Upload } from 'lucide-react';
import { UserSubmission } from '../types';

const Community: React.FC = () => {
  const { submissions, addSubmission } = useSite();
  const [activeTab, setActiveTab] = useState<'gallery' | 'submit'>('gallery');
  
  // Submission Form State
  const [formData, setFormData] = useState({
     userName: '',
     type: 'sighting' as 'sighting' | 'review' | 'photo',
     title: '',
     description: '',
     imageUrl: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     const newSubmission: UserSubmission = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
     };
     addSubmission(newSubmission);
     setSubmitted(true);
     // Reset after delay
     setTimeout(() => {
        setSubmitted(false);
        setFormData({ userName: '', type: 'sighting', title: '', description: '', imageUrl: '' });
        setActiveTab('gallery');
     }, 3000);
  };

  const approvedSubmissions = submissions.filter(s => s.status === 'approved');

  return (
    <div className="py-16 bg-nature-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
           <div>
              <h1 className="text-5xl font-hand font-bold text-nature-dark mb-2">Community Field Notes</h1>
              <p className="text-lg text-gray-600 font-sans">Share your sightings, reviews, and photos with fellow explorers.</p>
           </div>
           <div className="flex gap-4 mt-6 md:mt-0">
              <button 
                onClick={() => setActiveTab('gallery')}
                className={`px-6 py-2 rounded-full font-bold transition ${activeTab === 'gallery' ? 'bg-nature-primary text-white' : 'bg-white text-nature-dark hover:bg-gray-100'}`}
              >
                 View Gallery
              </button>
              <button 
                onClick={() => setActiveTab('submit')}
                className={`px-6 py-2 rounded-full font-bold transition flex items-center gap-2 ${activeTab === 'submit' ? 'bg-nature-accent text-white' : 'bg-white text-nature-dark hover:bg-gray-100'}`}
              >
                 <PenTool size={18} /> Share Your Find
              </button>
           </div>
        </div>

        {activeTab === 'gallery' && (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {approvedSubmissions.length === 0 ? (
                 <div className="col-span-full text-center py-20 text-gray-500">
                    <p className="text-2xl font-hand">No submissions yet. Be the first to share!</p>
                 </div>
              ) : (
                 approvedSubmissions.map((sub, idx) => (
                    <div key={sub.id} className="relative group">
                       <Tape variant={idx % 2 === 0 ? 'white' : 'yellow'} className="-top-3 left-1/2 -translate-x-1/2 w-32 z-20" />
                       <div className="bg-white p-4 pb-8 shadow-lg transform rotate-0 hover:rotate-1 transition duration-300">
                          {sub.imageUrl ? (
                             <div className="aspect-video bg-gray-100 mb-4 overflow-hidden border border-gray-200">
                                <img 
                                  src={sub.imageUrl} 
                                  alt={sub.title} 
                                  className="w-full h-full object-cover" 
                                  loading="lazy" 
                                  width="800" 
                                  height="600" 
                                />
                             </div>
                          ) : (
                             <div className="h-32 bg-nature-light/20 mb-4 flex items-center justify-center border-2 border-dashed border-nature-light">
                                <span className="text-nature-primary font-bold opacity-50 uppercase">{sub.type}</span>
                             </div>
                          )}
                          
                          <div className="flex items-center gap-2 mb-2">
                             {sub.type === 'photo' && <Camera size={16} className="text-nature-accent" />}
                             {sub.type === 'sighting' && <Eye size={16} className="text-nature-primary" />}
                             {sub.type === 'review' && <PenTool size={16} className="text-nature-brown" />}
                             <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">{sub.type}</span>
                          </div>

                          <h3 className="text-xl font-hand font-bold text-nature-dark mb-2 leading-tight">{sub.title}</h3>
                          <p className="text-sm text-gray-600 font-sans mb-4 line-clamp-3">{sub.description}</p>
                          
                          <div className="flex justify-between items-center text-xs text-gray-400 font-sans border-t pt-2">
                             <span>By {sub.userName}</span>
                             <span>{sub.date}</span>
                          </div>
                       </div>
                    </div>
                 ))
              )}
           </div>
        )}

        {activeTab === 'submit' && (
           <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 shadow-2xl relative rotate-[-0.5deg]">
              <Tape className="-top-4 right-12 w-32 rotate-[2deg]" />
              
              {!submitted ? (
                 <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-3xl font-hand font-bold text-nature-dark text-center mb-8">Submit an Entry</h2>
                    
                    <div className="grid grid-cols-2 gap-6">
                       <div>
                          <label className="block text-sm font-bold text-nature-dark mb-1">Your Name</label>
                          <input 
                             required
                             type="text" 
                             value={formData.userName}
                             onChange={(e) => setFormData({...formData, userName: e.target.value})}
                             className="w-full border-b-2 border-nature-tan bg-gray-50 p-2 focus:outline-none focus:border-nature-primary" 
                             placeholder="Explorer Name"
                             aria-label="Your Name" 
                          />
                       </div>
                       <div>
                          <label className="block text-sm font-bold text-nature-dark mb-1">Entry Type</label>
                          <select 
                             value={formData.type}
                             onChange={e => setFormData({...formData, type: e.target.value as any})}
                             className="w-full border-b-2 border-nature-tan bg-gray-50 p-2 focus:outline-none focus:border-nature-primary"
                          >
                             <option value="sighting">Wildlife Sighting</option>
                             <option value="review">Location Review</option>
                             <option value="photo">Photo Share</option>
                          </select>
                       </div>
                    </div>

                    <div>
                       <label className="block text-sm font-bold text-nature-dark mb-1">Title</label>
                       <input 
                          required
                          type="text" 
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          className="w-full border-b-2 border-nature-tan bg-gray-50 p-2 focus:outline-none focus:border-nature-primary" 
                          placeholder="What did you see?"
                          aria-label="Title" 
                       />
                    </div>

                    <div>
                       <label className="block text-sm font-bold text-nature-dark mb-1">Description / Story</label>
                       <textarea 
                          required
                          rows={4} 
                          value={formData.description}
                          onChange={e => setFormData({...formData, description: e.target.value})}
                          className="w-full border-2 border-nature-tan bg-gray-50 p-2 focus:outline-none focus:border-nature-primary rounded-sm" 
                          placeholder="Tell us about the details..."
                       ></textarea>
                    </div>

                    <div>
                       <label className="block text-sm font-bold text-nature-dark mb-1">Image URL (Optional)</label>
                       <div className="flex gap-2">
                          <input 
                             type="text" 
                             value={formData.imageUrl}
                             onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                             className="w-full border-b-2 border-nature-tan bg-gray-50 p-2 focus:outline-none focus:border-nature-primary" 
                             placeholder="https://..."
                             aria-label="Image URL" 
                          />
                          <button type="button" className="bg-gray-200 p-2 rounded-sm"><Upload size={20} /></button>
                       </div>
                    </div>

                    <div className="pt-4">
                       <NatureButton type="submit" variant="primary" className="w-full flex justify-center items-center gap-2">
                          Submit for Review
                       </NatureButton>
                    </div>
                 </form>
              ) : (
                 <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                       <CheckCircle size={48} />
                    </div>
                    <h3 className="text-3xl font-hand font-bold text-nature-dark mb-4">Submission Received!</h3>
                    <p className="text-gray-600">Thanks for sharing. Our rangers will review your submission shortly.</p>
                 </div>
              )}
           </div>
        )}

      </div>
    </div>
  );
};

export default Community;