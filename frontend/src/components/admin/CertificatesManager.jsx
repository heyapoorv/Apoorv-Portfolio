import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function CertificatesManager() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    link: ''
  });

  const fetchCertificates = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, 'certificates'));
    const fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCertificates(fetched);
    setLoading(false);
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setFormData({
      title: item.title || '',
      issuer: item.issuer || '',
      date: item.date || '',
      link: item.link || ''
    });
  };

  const handleCreateNew = () => {
    setEditingItem('new');
    setFormData({
      title: '',
      issuer: '',
      date: '',
      link: ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      await deleteDoc(doc(db, 'certificates', id));
      fetchCertificates();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const data = {
        title: formData.title,
        issuer: formData.issuer,
        date: formData.date,
        link: formData.link
      };

      if (editingItem === 'new') {
        await addDoc(collection(db, 'certificates'), data);
      } else {
        await setDoc(doc(db, 'certificates', editingItem), data);
      }

      setEditingItem(null);
      fetchCertificates();
    } catch (err) {
      console.error("Error saving certificate: ", err);
      alert("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white/50 text-[10px] uppercase tracking-widest">Loading certificates...</div>;

  return (
    <div>
      {!editingItem ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Certifications</h3>
            <button onClick={handleCreateNew} className="bg-[#ff2a2a]/20 hover:bg-[#ff2a2a]/40 text-[#ff2a2a] border border-[#ff2a2a]/50 px-4 py-2 rounded text-[10px] uppercase tracking-widest transition-colors w-full sm:w-auto">
              + Add Certificate
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map(item => (
              <div key={item.id} className="bg-black/40 border border-white/10 p-4 rounded flex flex-col gap-2 group hover:border-[#ff2a2a]/30 transition-colors">
                <h4 className="font-bold text-white text-xs uppercase">{item.title}</h4>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ff2a2a]">
                  {item.issuer} <span className="text-white/50"> // {item.date}</span>
                </div>
                {item.link && (
                   <p className="text-[10px] text-white/50 truncate">
                     URL: {item.link}
                   </p>
                )}
                <div className="flex gap-2 mt-2 pt-2 border-t border-white/5">
                  <button onClick={() => handleEdit(item)} className="text-[#ff2a2a] hover:text-white text-[10px] uppercase tracking-widest">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-500/50 hover:text-red-500 text-[10px] uppercase tracking-widest">Del</button>
                </div>
              </div>
            ))}
            {certificates.length === 0 && <p className="text-white/50 text-xs">No certificates found. Add your credentials!</p>}
          </div>
        </>
      ) : (
        <div className="bg-black/40 border border-white/10 p-6 rounded">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold text-[#ff2a2a] uppercase tracking-widest">{editingItem === 'new' ? 'CREATE_CERTIFICATE' : 'EDIT_CERTIFICATE'}</h3>
            <button onClick={() => setEditingItem(null)} className="text-white/50 hover:text-white text-[10px] uppercase tracking-widest border border-white/10 px-3 py-1 rounded">Cancel</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Certificate Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" placeholder="e.g. AWS Solutions Architect" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Issuing Organization</label>
                  <input required type="text" value={formData.issuer} onChange={e => setFormData({...formData, issuer: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" placeholder="e.g. Amazon Web Services" />
                </div>
                <div>
                  <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Date / Year</label>
                  <input required type="text" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" placeholder="e.g. Oct 2024" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Credential URL (Optional)</label>
                <input type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" placeholder="https://credly.com/..." />
              </div>
            </div>

            <button disabled={saving} type="submit" className="w-full bg-[#ff2a2a] hover:bg-white text-black font-black text-xs tracking-widest uppercase py-4 rounded mt-8 transition-colors disabled:opacity-50">
              {saving ? 'SYNCING_DATA...' : 'SAVE_CERTIFICATE'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
