import React, { useState } from 'react';
import { useSite } from '../../services/SiteContext';
import { LayoutDashboard, FileText, Settings, Calendar as CalIcon, Plus, Trash2, Edit3, Save, Users, Check, X, Upload } from 'lucide-react';
import { BlogPost, SiteConfig } from '../../types';

const AdminDashboard: React.FC = () => {
  const { posts, config, events, submissions, addPost, updatePost, deletePost, updateConfig, deleteEvent, updateSubmissionStatus } = useSite();
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'settings' | 'moderation'>('overview');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // New Post Template
  const newPostTemplate: BlogPost = {
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

  const [formPost, setFormPost] = useState<BlogPost>(newPostTemplate);

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (formPost.id) {
       updatePost(formPost);
    } else {
       addPost({ ...formPost, id: Date.now().toString() });
    }
    setEditingPost(null);
    setFormPost(newPostTemplate);
  };

  const handleEditClick = (post: BlogPost) => {
    setFormPost(post);
    setEditingPost(post);
    setActiveTab('posts');
  };

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
        const socialKey = name.split('.')[1];
        updateConfig({ ...config, socialLinks: { ...config.socialLinks, [socialKey]: value } });
    } else if (name.startsWith('seo.')) {
        const seoKey = name.split('.')[1];
        updateConfig({ ...config, seo: { ...config.seo, [seoKey]: value } });
    } else {
        updateConfig({ ...config, [name]: value });
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateConfig({ ...config, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const pendingSubmissions = submissions.filter(s => s.status === 'pending');

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-nature-dark text-white hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-hand font-bold">Admin Panel</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition ${activeTab === 'overview' ? 'bg-nature-primary' : 'hover:bg-white/10'}`}
          >
            <LayoutDashboard size={20} /> Overview
          </button>
          <button 
            onClick={() => { setActiveTab('posts'); setEditingPost(null); setFormPost(newPostTemplate); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition ${activeTab === 'posts' ? 'bg-nature-primary' : 'hover:bg-white/10'}`}
          >
            <FileText size={20} /> Blog Posts
          </button>
          <button 
            onClick={() => setActiveTab('moderation')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition ${activeTab === 'moderation' ? 'bg-nature-primary' : 'hover:bg-white/10'}`}
          >
            <Users size={20} /> Moderation
            {pendingSubmissions.length > 0 && <span className="ml-auto bg-nature-accent text-white text-xs px-2 py-0.5 rounded-full">{pendingSubmissions.length}</span>}
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition ${activeTab === 'settings' ? 'bg-nature-primary' : 'hover:bg-white/10'}`}
          >
            <Settings size={20} /> Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
             <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-nature-primary">
                   <div className="flex justify-between items-center">
                      <div>
                         <p className="text-gray-500 text-sm font-bold uppercase">Total Posts</p>
                         <p className="text-3xl font-bold">{posts.length}</p>
                      </div>
                      <FileText className="text-nature-primary opacity-20" size={48} />
                   </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-nature-accent">
                   <div className="flex justify-between items-center">
                      <div>
                         <p className="text-gray-500 text-sm font-bold uppercase">Events</p>
                         <p className="text-3xl font-bold">{events.length}</p>
                      </div>
                      <CalIcon className="text-nature-accent opacity-20" size={48} />
                   </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                   <div className="flex justify-between items-center">
                      <div>
                         <p className="text-gray-500 text-sm font-bold uppercase">Pending</p>
                         <p className="text-3xl font-bold">{pendingSubmissions.length}</p>
                      </div>
                      <Users className="text-yellow-500 opacity-20" size={48} />
                   </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-nature-brown">
                   <div className="flex justify-between items-center">
                      <div>
                         <p className="text-gray-500 text-sm font-bold uppercase">Site Name</p>
                         <p className="text-xl font-bold truncate">{config.siteName}</p>
                      </div>
                      <Settings className="text-nature-brown opacity-20" size={48} />
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* Moderation Tab */}
        {activeTab === 'moderation' && (
           <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-800">Community Moderation</h1>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                 <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                       <tr>
                          <th className="px-6 py-3 font-bold text-gray-600">User</th>
                          <th className="px-6 py-3 font-bold text-gray-600">Type</th>
                          <th className="px-6 py-3 font-bold text-gray-600">Content</th>
                          <th className="px-6 py-3 font-bold text-gray-600">Status</th>
                          <th className="px-6 py-3 font-bold text-gray-600">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                       {submissions.length === 0 && (
                          <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No submissions found.</td></tr>
                       )}
                       {submissions.sort((a,b) => a.status === 'pending' ? -1 : 1).map(sub => (
                          <tr key={sub.id} className={sub.status === 'pending' ? 'bg-yellow-50/50' : ''}>
                             <td className="px-6 py-4">
                                <p className="font-bold">{sub.userName}</p>
                                <p className="text-xs text-gray-500">{sub.date}</p>
                             </td>
                             <td className="px-6 py-4">
                                <span className={`text-xs uppercase font-bold px-2 py-1 rounded-full ${
                                   sub.type === 'sighting' ? 'bg-green-100 text-green-800' :
                                   sub.type === 'review' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                                }`}>{sub.type}</span>
                             </td>
                             <td className="px-6 py-4 max-w-md">
                                <p className="font-bold text-sm mb-1">{sub.title}</p>
                                <p className="text-sm text-gray-600 line-clamp-2">{sub.description}</p>
                                {sub.imageUrl && <a href={sub.imageUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline mt-1 block">View Image</a>}
                             </td>
                             <td className="px-6 py-4">
                                <span className={`text-xs font-bold px-2 py-1 rounded-sm ${
                                   sub.status === 'approved' ? 'text-green-600 bg-green-50 border border-green-200' :
                                   sub.status === 'rejected' ? 'text-red-600 bg-red-50 border border-red-200' :
                                   'text-yellow-600 bg-yellow-100 border border-yellow-200'
                                }`}>
                                   {sub.status.toUpperCase()}
                                </span>
                             </td>
                             <td className="px-6 py-4">
                                <div className="flex gap-2">
                                   {sub.status === 'pending' && (
                                      <>
                                         <button onClick={() => updateSubmissionStatus(sub.id, 'approved')} className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200" title="Approve">
                                            <Check size={18} />
                                         </button>
                                         <button onClick={() => updateSubmissionStatus(sub.id, 'rejected')} className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200" title="Reject">
                                            <X size={18} />
                                         </button>
                                      </>
                                   )}
                                   {sub.status === 'rejected' && (
                                      <button onClick={() => updateSubmissionStatus(sub.id, 'approved')} className="text-xs text-blue-500 hover:underline">Re-approve</button>
                                   )}
                                </div>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="flex gap-6">
             {/* List */}
             <div className="w-1/3 bg-white rounded-lg shadow-md p-4 overflow-y-auto h-[80vh]">
                <div className="flex justify-between items-center mb-4">
                   <h2 className="text-xl font-bold">Posts</h2>
                   <button onClick={() => { setEditingPost(null); setFormPost(newPostTemplate); }} className="bg-nature-primary text-white p-2 rounded-full hover:bg-nature-dark"><Plus size={20} /></button>
                </div>
                <ul className="space-y-2">
                   {posts.map(post => (
                      <li key={post.id} className={`p-3 rounded-md cursor-pointer border hover:bg-gray-50 ${editingPost?.id === post.id ? 'border-nature-primary bg-nature-light/10' : 'border-gray-200'}`}>
                         <div className="flex justify-between items-start">
                             <div onClick={() => handleEditClick(post)} className="flex-1">
                                <h4 className="font-bold text-gray-800">{post.title}</h4>
                                <p className="text-xs text-gray-500">{post.date}</p>
                             </div>
                             <button onClick={() => { if(window.confirm('Delete?')) deletePost(post.id) }} className="text-red-400 hover:text-red-600 ml-2"><Trash2 size={16} /></button>
                         </div>
                      </li>
                   ))}
                </ul>
             </div>

             {/* Editor */}
             <div className="w-2/3 bg-white rounded-lg shadow-md p-6 h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">{formPost.id ? 'Edit Post' : 'Create New Post'}</h2>
                <form onSubmit={handleSavePost} className="space-y-4">
                   <div>
                      <label className="block text-sm font-bold text-gray-700">Title</label>
                      <input 
                        type="text" 
                        required 
                        value={formPost.title} 
                        onChange={(e) => setFormPost({ ...formPost, title: e.target.value })}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-nature-primary outline-none" 
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700">Category</label>
                        <input 
                           type="text" 
                           value={formPost.category} 
                           onChange={(e) => setFormPost({ ...formPost, category: e.target.value })} 
                           className="w-full border border-gray-300 rounded-md p-2" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700">Status</label>
                        <select 
                           value={formPost.status} 
                           onChange={(e) => setFormPost({...formPost, status: e.target.value as 'published' | 'draft'})} 
                           className="w-full border border-gray-300 rounded-md p-2"
                        >
                           <option value="draft">Draft</option>
                           <option value="published">Published</option>
                        </select>
                      </div>
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-gray-700">Image URL</label>
                      <input 
                        type="text" 
                        value={formPost.imageUrl} 
                        onChange={(e) => setFormPost({ ...formPost, imageUrl: e.target.value })}
                        className="w-full border border-gray-300 rounded-md p-2" 
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-gray-700">Excerpt</label>
                      <textarea 
                        rows={2} 
                        value={formPost.excerpt} 
                        onChange={(e) => setFormPost({...formPost, excerpt: e.target.value})} 
                        className="w-full border border-gray-300 rounded-md p-2" 
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-gray-700">Content</label>
                      <textarea 
                        rows={10} 
                        value={formPost.content} 
                        onChange={(e) => setFormPost({...formPost, content: e.target.value})} 
                        className="w-full border border-gray-300 rounded-md p-2 font-mono text-sm" 
                      />
                   </div>
                   <button type="submit" className="bg-nature-primary text-white px-6 py-2 rounded-md hover:bg-nature-dark flex items-center gap-2">
                      <Save size={18} /> Save Post
                   </button>
                </form>
             </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
             <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Site Configuration</h2>
             <div className="space-y-6">
                
                {/* Branding */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-nature-primary">Branding</h3>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Website Logo</label>
                    <div className="flex items-center gap-4">
                       <img 
                         src={config.logoUrl} 
                         alt="Current Logo" 
                         className="h-12 w-auto border p-1 rounded-md" 
                         loading="lazy" 
                         width="800" 
                         height="600" 
                       />
                       <div>
                          <label className="flex items-center gap-2 cursor-pointer bg-nature-light/20 hover:bg-nature-light/40 text-nature-dark font-bold py-2 px-4 rounded-md transition">
                            <Upload size={18} />
                            Upload New Logo
                            <input type="file" accept="image/png" onChange={handleLogoUpload} className="hidden" />
                          </label>
                          <p className="text-xs text-gray-500 mt-1">Accepts PNG files</p>
                       </div>
                    </div>
                  </div>
                </div>

                {/* General Info */}
                <div className="space-y-4 pt-4 border-t">
                   <h3 className="text-lg font-bold text-nature-primary">General Information</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                         <label className="block text-sm text-gray-600">Site Name</label>
                         <input name="siteName" value={config.siteName} onChange={handleConfigChange} className="w-full border p-2 rounded" />
                      </div>
                      <div>
                         <label className="block text-sm text-gray-600">Contact Email</label>
                         <input name="contactEmail" value={config.contactEmail} onChange={handleConfigChange} className="w-full border p-2 rounded" />
                      </div>
                   </div>
                   <div>
                      <label className="block text-sm text-gray-600">Description</label>
                      <textarea name="siteDescription" value={config.siteDescription} onChange={handleConfigChange} className="w-full border p-2 rounded" rows={3} />
                   </div>
                </div>

                {/* SEO */}
                <div className="space-y-4 pt-4 border-t">
                   <h3 className="text-lg font-bold text-nature-primary">SEO Settings</h3>
                   <div>
                      <label className="block text-sm text-gray-600">Meta Title</label>
                      <input name="seo.metaTitle" value={config.seo.metaTitle} onChange={handleConfigChange} className="w-full border p-2 rounded" />
                   </div>
                   <div>
                      <label className="block text-sm text-gray-600">Meta Description</label>
                      <textarea name="seo.metaDescription" value={config.seo.metaDescription} onChange={handleConfigChange} className="w-full border p-2 rounded" rows={3} />
                   </div>
                </div>

                {/* Socials */}
                <div className="space-y-4 pt-4 border-t">
                   <h3 className="text-lg font-bold text-nature-primary">Social Media</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input name="social.facebook" placeholder="Facebook URL" value={config.socialLinks.facebook} onChange={handleConfigChange} className="border p-2 rounded" />
                      <input name="social.twitter" placeholder="Twitter URL" value={config.socialLinks.twitter} onChange={handleConfigChange} className="border p-2 rounded" />
                      <input name="social.instagram" placeholder="Instagram URL" value={config.socialLinks.instagram} onChange={handleConfigChange} className="border p-2 rounded" />
                   </div>
                </div>

             </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;