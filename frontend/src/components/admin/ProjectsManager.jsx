import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '', domain: 'Full Stack', shortDesc: '', link: '', github: '',
    image: '', tags: '',
    details_overview: '', details_features: '', details_techStack: '',
    details_architecture: '', details_challenges: '', details_learned: ''
  });

  const fetchProjects = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, 'projects'));
    const fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProjects(fetched);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (proj) => {
    setEditingProject(proj.id);
    setFormData({
      title: proj.title,
      domain: proj.domain,
      shortDesc: proj.shortDesc,
      link: proj.link,
      github: proj.github,
      image: proj.image,
      tags: proj.tags ? proj.tags.join(', ') : '',
      details_overview: proj.details?.overview || '',
      details_features: proj.details?.features ? proj.details.features.join(', ') : '',
      details_techStack: proj.details?.techStack ? proj.details.techStack.join(', ') : '',
      details_architecture: proj.details?.architecture || '',
      details_challenges: proj.details?.challenges || '',
      details_learned: proj.details?.learned || ''
    });
  };

  const handleCreateNew = () => {
    setEditingProject('new');
    setFormData({
      title: '', domain: 'Full Stack', shortDesc: '', link: '', github: '', image: '', tags: '',
      details_overview: '', details_features: '', details_techStack: '', details_architecture: '', details_challenges: '', details_learned: ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteDoc(doc(db, 'projects', id));
      fetchProjects();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // 1. Format Data
      const projectData = {
        title: formData.title,
        domain: formData.domain,
        shortDesc: formData.shortDesc,
        link: formData.link,
        github: formData.github,
        image: formData.image,
        tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean),
        details: {
          overview: formData.details_overview,
          features: formData.details_features.split(',').map(s => s.trim()).filter(Boolean),
          techStack: formData.details_techStack.split(',').map(s => s.trim()).filter(Boolean),
          architecture: formData.details_architecture,
          challenges: formData.details_challenges,
          learned: formData.details_learned
        }
      };

      // 3. Save to Firestore
      if (editingProject === 'new') {
        await addDoc(collection(db, 'projects'), projectData);
      } else {
        await setDoc(doc(db, 'projects', editingProject), projectData);
      }

      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      console.error("Error saving project: ", err);
      alert("Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-gray-400">Loading projects...</div>;

  return (
    <div>
      {!editingProject ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Active Archives</h3>
            <button onClick={handleCreateNew} className="bg-[#ff2a2a]/20 hover:bg-[#ff2a2a]/40 text-[#ff2a2a] border border-[#ff2a2a]/50 px-4 py-2 rounded text-[10px] uppercase tracking-widest transition-colors w-full sm:w-auto">
              + Instantiate New
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {projects.map(proj => (
              <div key={proj.id} className="bg-black/40 border border-white/10 p-4 rounded flex items-center gap-4 group hover:border-[#ff2a2a]/30 transition-colors">
                <img src={proj.image || 'https://via.placeholder.com/150'} alt={proj.title} className="w-16 h-16 object-cover rounded opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-bold text-white text-xs truncate">{proj.title}</h4>
                  <p className="text-[10px] text-white/50 uppercase tracking-wider truncate">{proj.domain}</p>
                </div>
                <div className="flex flex-col gap-2 border-l border-white/10 pl-4">
                  <button onClick={() => handleEdit(proj)} className="text-[#ff2a2a] hover:text-white text-[10px] uppercase tracking-widest">Edit</button>
                  <button onClick={() => handleDelete(proj.id)} className="text-red-500/50 hover:text-red-500 text-[10px] uppercase tracking-widest">Del</button>
                </div>
              </div>
            ))}
            {projects.length === 0 && <p className="text-gray-500">No projects found. Seed data in settings.</p>}
          </div>
        </>
      ) : (
        <div className="bg-black/40 border border-white/10 p-6 rounded">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold text-[#ff2a2a] uppercase tracking-widest">{editingProject === 'new' ? 'CREATE_NEW_ARCHIVE' : 'EDIT_ARCHIVE'}</h3>
            <button onClick={() => setEditingProject(null)} className="text-white/50 hover:text-white text-[10px] uppercase tracking-widest border border-white/10 px-3 py-1 rounded">Cancel</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" />
              </div>
              <div>
                <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Domain</label>
                <select value={formData.domain} onChange={e => setFormData({...formData, domain: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a] appearance-none">
                  <option className="bg-black">Full Stack</option>
                  <option className="bg-black">AI / Machine Learning</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Short Description</label>
              <input required type="text" value={formData.shortDesc} onChange={e => setFormData({...formData, shortDesc: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" />
            </div>
            
            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Image URL</label>
              <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" placeholder="https://imgur.com/your-image.png" />
              {formData.image && <img src={formData.image} className="h-20 mt-3 rounded border border-white/10" alt="Current" />}
            </div>

            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Tags (comma separated)</label>
              <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" placeholder="React, Node.js, Firebase" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Live Demo URL</label>
                <input type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" />
              </div>
              <div>
                <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">GitHub URL</label>
                <input type="text" value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" />
              </div>
            </div>

            <div className="my-8 flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-white/10"></div>
              <h4 className="text-[#ff2a2a] text-[10px] font-bold uppercase tracking-[0.3em]">Detailed Information (Modal)</h4>
              <div className="h-[1px] flex-1 bg-white/10"></div>
            </div>

            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Overview</label>
              <textarea rows="3" value={formData.details_overview} onChange={e => setFormData({...formData, details_overview: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a] resize-none" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Features (comma separated)</label>
                <input type="text" value={formData.details_features} onChange={e => setFormData({...formData, details_features: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" />
              </div>
              <div>
                <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Detailed Tech Stack (comma separated)</label>
                <input type="text" value={formData.details_techStack} onChange={e => setFormData({...formData, details_techStack: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" />
              </div>
            </div>
            
            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Architecture / Workflow</label>
              <textarea rows="3" value={formData.details_architecture} onChange={e => setFormData({...formData, details_architecture: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a] resize-none" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Challenges Solved</label>
                <textarea rows="3" value={formData.details_challenges} onChange={e => setFormData({...formData, details_challenges: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a] resize-none" />
              </div>
              <div>
                <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Impact / What I Learned</label>
                <textarea rows="3" value={formData.details_learned} onChange={e => setFormData({...formData, details_learned: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a] resize-none" />
              </div>
            </div>

            <button disabled={saving} type="submit" className="w-full bg-[#ff2a2a] hover:bg-white text-black font-black text-xs tracking-widest uppercase py-4 rounded mt-8 transition-colors disabled:opacity-50">
              {saving ? 'SYNCING_DATA...' : 'TRANSMIT_ARCHIVE'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
