import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function SkillsManager() {
  const [skillsCategories, setSkillsCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    category: '',
    skills: ''
  });

  const fetchSkills = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, 'skills'));
    const fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // Sort by a field if desired, or just use natural order
    setSkillsCategories(fetched);
    setLoading(false);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleEdit = (cat) => {
    setEditingCategory(cat.id);
    setFormData({
      category: cat.category || '',
      skills: cat.skills ? cat.skills.join(', ') : ''
    });
  };

  const handleCreateNew = () => {
    setEditingCategory('new');
    setFormData({
      category: '',
      skills: ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await deleteDoc(doc(db, 'skills', id));
      fetchSkills();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const data = {
        category: formData.category,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
      };

      if (editingCategory === 'new') {
        await addDoc(collection(db, 'skills'), data);
      } else {
        await setDoc(doc(db, 'skills', editingCategory), data);
      }

      setEditingCategory(null);
      fetchSkills();
    } catch (err) {
      console.error("Error saving skill category: ", err);
      alert("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white/50 text-[10px] uppercase tracking-widest">Loading skills...</div>;

  return (
    <div>
      {!editingCategory ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Skill Categories</h3>
            <button onClick={handleCreateNew} className="bg-[#ff2a2a]/20 hover:bg-[#ff2a2a]/40 text-[#ff2a2a] border border-[#ff2a2a]/50 px-4 py-2 rounded text-[10px] uppercase tracking-widest transition-colors w-full sm:w-auto">
              + New Category
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillsCategories.map(cat => (
              <div key={cat.id} className="bg-black/40 border border-white/10 p-4 rounded flex flex-col gap-2 group hover:border-[#ff2a2a]/30 transition-colors">
                <h4 className="font-bold text-white text-xs uppercase tracking-widest text-[#ff2a2a]">{cat.category}</h4>
                <p className="text-[10px] text-white/50 leading-relaxed">
                  {cat.skills?.join(', ')}
                </p>
                <div className="flex gap-2 mt-2 pt-2 border-t border-white/5">
                  <button onClick={() => handleEdit(cat)} className="text-[#ff2a2a] hover:text-white text-[10px] uppercase tracking-widest">Edit</button>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-500/50 hover:text-red-500 text-[10px] uppercase tracking-widest">Del</button>
                </div>
              </div>
            ))}
            {skillsCategories.length === 0 && <p className="text-white/50 text-xs">No skills found. Seed data in settings.</p>}
          </div>
        </>
      ) : (
        <div className="bg-black/40 border border-white/10 p-6 rounded">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold text-[#ff2a2a] uppercase tracking-widest">{editingCategory === 'new' ? 'CREATE_CATEGORY' : 'EDIT_CATEGORY'}</h3>
            <button onClick={() => setEditingCategory(null)} className="text-white/50 hover:text-white text-[10px] uppercase tracking-widest border border-white/10 px-3 py-1 rounded">Cancel</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Category Name</label>
              <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" placeholder="e.g. Frontend" />
            </div>

            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Skills (comma separated)</label>
              <textarea rows="3" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a] resize-none" placeholder="React, Vite, GSAP" />
            </div>

            <button disabled={saving} type="submit" className="w-full bg-[#ff2a2a] hover:bg-white text-black font-black text-xs tracking-widest uppercase py-4 rounded mt-8 transition-colors disabled:opacity-50">
              {saving ? 'SYNCING_DATA...' : 'SAVE_CATEGORY'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
