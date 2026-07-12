import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function AchievementsManager() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    link: ''
  });

  const fetchAchievements = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, 'achievements'));
    const fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAchievements(fetched);
    setLoading(false);
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setFormData({
      category: item.category || '',
      title: item.title || '',
      description: item.description || '',
      link: item.link || ''
    });
  };

  const handleCreateNew = () => {
    setEditingItem('new');
    setFormData({
      category: '',
      title: '',
      description: '',
      link: ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this achievement?")) {
      await deleteDoc(doc(db, 'achievements', id));
      fetchAchievements();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const data = {
        category: formData.category,
        title: formData.title,
        description: formData.description,
        link: formData.link
      };

      if (editingItem === 'new') {
        await addDoc(collection(db, 'achievements'), data);
      } else {
        await setDoc(doc(db, 'achievements', editingItem), data);
      }

      setEditingItem(null);
      fetchAchievements();
    } catch (err) {
      console.error("Error saving achievement: ", err);
      alert("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white/50 text-[10px] uppercase tracking-widest">Loading achievements...</div>;

  return (
    <div>
      {!editingItem ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Milestones & Achievements</h3>
            <button onClick={handleCreateNew} className="bg-[#ff2a2a]/20 hover:bg-[#ff2a2a]/40 text-[#ff2a2a] border border-[#ff2a2a]/50 px-4 py-2 rounded text-[10px] uppercase tracking-widest transition-colors w-full sm:w-auto">
              + Add Milestone
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map(item => (
              <div key={item.id} className="bg-black/40 border border-white/10 p-4 rounded flex flex-col gap-2 group hover:border-[#ff2a2a]/30 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ff2a2a]">
                    {item.category}
                  </div>
                  {item.link && <span className="text-white/30 text-[10px]">🔗</span>}
                </div>
                <h4 className="font-bold text-white text-xs uppercase">{item.title}</h4>
                <p className="text-[10px] text-white/50 leading-relaxed truncate">
                  {item.description}
                </p>
                <div className="flex gap-2 mt-2 pt-2 border-t border-white/5">
                  <button onClick={() => handleEdit(item)} className="text-[#ff2a2a] hover:text-white text-[10px] uppercase tracking-widest">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-500/50 hover:text-red-500 text-[10px] uppercase tracking-widest">Del</button>
                </div>
              </div>
            ))}
            {achievements.length === 0 && <p className="text-white/50 text-xs">No achievements found. Add some milestones!</p>}
          </div>
        </>
      ) : (
        <div className="bg-black/40 border border-white/10 p-6 rounded">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold text-[#ff2a2a] uppercase tracking-widest">{editingItem === 'new' ? 'CREATE_MILESTONE' : 'EDIT_MILESTONE'}</h3>
            <button onClick={() => setEditingItem(null)} className="text-white/50 hover:text-white text-[10px] uppercase tracking-widest border border-white/10 px-3 py-1 rounded">Cancel</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Category</label>
                <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" placeholder="e.g. Hackathons, Open Source" />
              </div>
              <div>
                <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" placeholder="e.g. 1st Place at TechCrunch Disrupt" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Reference URL (Optional)</label>
              <input type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" placeholder="https://..." />
            </div>

            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Description</label>
              <textarea rows="3" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a] resize-none" placeholder="Brief description of the achievement..." />
            </div>

            <button disabled={saving} type="submit" className="w-full bg-[#ff2a2a] hover:bg-white text-black font-black text-xs tracking-widest uppercase py-4 rounded mt-8 transition-colors disabled:opacity-50">
              {saving ? 'SYNCING_DATA...' : 'SAVE_MILESTONE'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
