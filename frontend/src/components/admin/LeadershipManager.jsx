import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function LeadershipManager() {
  const [leadershipRoles, setLeadershipRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    role: '',
    organization: '',
    period: '',
    responsibilities: '',
    impact: '',
    link: ''
  });

  const fetchLeadership = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, 'leadership'));
    const fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setLeadershipRoles(fetched);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeadership();
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setFormData({
      role: item.role || '',
      organization: item.organization || '',
      period: item.period || '',
      responsibilities: item.responsibilities || '',
      impact: item.impact || '',
      link: item.link || ''
    });
  };

  const handleCreateNew = () => {
    setEditingItem('new');
    setFormData({
      role: '',
      organization: '',
      period: '',
      responsibilities: '',
      impact: '',
      link: ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      await deleteDoc(doc(db, 'leadership', id));
      fetchLeadership();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const data = {
        role: formData.role,
        organization: formData.organization,
        period: formData.period,
        responsibilities: formData.responsibilities,
        impact: formData.impact,
        link: formData.link
      };

      if (editingItem === 'new') {
        await addDoc(collection(db, 'leadership'), data);
      } else {
        await setDoc(doc(db, 'leadership', editingItem), data);
      }

      setEditingItem(null);
      fetchLeadership();
    } catch (err) {
      console.error("Error saving leadership role: ", err);
      alert("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white/50 text-[10px] uppercase tracking-widest">Loading timeline...</div>;

  return (
    <div>
      {!editingItem ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Leadership & Experience</h3>
            <button onClick={handleCreateNew} className="bg-[#ff2a2a]/20 hover:bg-[#ff2a2a]/40 text-[#ff2a2a] border border-[#ff2a2a]/50 px-4 py-2 rounded text-[10px] uppercase tracking-widest transition-colors w-full sm:w-auto">
              + Add Position
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {leadershipRoles.map(item => (
              <div key={item.id} className="bg-black/40 border border-white/10 p-4 rounded flex flex-col sm:flex-row sm:items-center gap-4 group hover:border-[#ff2a2a]/30 transition-colors">
                <div className="flex-1">
                  <h4 className="font-bold text-white text-xs uppercase">{item.role} <span className="text-[#ff2a2a] px-2">@</span> {item.organization}</h4>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 my-1">
                    {item.period} {item.link && <span className="text-[#ff2a2a] ml-2">🔗 {item.link}</span>}
                  </div>
                  <div className="mt-2 text-white/70">
                    <p className="text-[10px] leading-relaxed mb-1"><span className="text-white/40 uppercase tracking-widest font-mono">Resp:</span> {item.responsibilities}</p>
                    <p className="text-[10px] leading-relaxed"><span className="text-[#ff2a2a]/70 uppercase tracking-widest font-mono">Impact:</span> {item.impact}</p>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col gap-2 mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-white/5 sm:pl-4">
                  <button onClick={() => handleEdit(item)} className="text-[#ff2a2a] hover:text-white text-[10px] uppercase tracking-widest">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-500/50 hover:text-red-500 text-[10px] uppercase tracking-widest">Del</button>
                </div>
              </div>
            ))}
            {leadershipRoles.length === 0 && <p className="text-white/50 text-xs">No leadership roles found. Add some positions!</p>}
          </div>
        </>
      ) : (
        <div className="bg-black/40 border border-white/10 p-6 rounded">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold text-[#ff2a2a] uppercase tracking-widest">{editingItem === 'new' ? 'CREATE_POSITION' : 'EDIT_POSITION'}</h3>
            <button onClick={() => setEditingItem(null)} className="text-white/50 hover:text-white text-[10px] uppercase tracking-widest border border-white/10 px-3 py-1 rounded">Cancel</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Role / Title</label>
                <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" placeholder="e.g. Lead Organizer" />
              </div>
              <div>
                <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Organization</label>
                <input required type="text" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" placeholder="e.g. Tech Club" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Time Period</label>
              <input required type="text" value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" placeholder="e.g. 2023 - Present" />
            </div>

            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Reference URL (Optional)</label>
              <input type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" placeholder="https://..." />
            </div>

            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Responsibilities</label>
              <textarea rows="3" required value={formData.responsibilities} onChange={e => setFormData({...formData, responsibilities: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a] resize-none" placeholder="Brief description of your responsibilities..." />
            </div>

            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Impact</label>
              <textarea rows="3" required value={formData.impact} onChange={e => setFormData({...formData, impact: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a] resize-none" placeholder="Quantifiable impact or achievements..." />
            </div>

            <button disabled={saving} type="submit" className="w-full bg-[#ff2a2a] hover:bg-white text-black font-black text-xs tracking-widest uppercase py-4 rounded mt-8 transition-colors disabled:opacity-50">
              {saving ? 'SYNCING_DATA...' : 'SAVE_POSITION'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
