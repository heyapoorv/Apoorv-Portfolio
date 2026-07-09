import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { fallbackProfileData } from '../../data/profileData';

export default function ProfileManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(fallbackProfileData);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'profile', 'main');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setFormData(snap.data());
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'profile', 'main'), formData);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error saving profile: ", err);
      alert("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white/50 text-[10px] uppercase tracking-widest">Loading profile...</div>;

  return (
    <div className="bg-black/40 border border-white/10 p-6 rounded">
      <div className="mb-8 border-b border-white/10 pb-4">
        <h3 className="text-sm font-bold text-[#ff2a2a] uppercase tracking-widest">Global Profile Settings</h3>
        <p className="text-white/50 text-xs mt-2">Update your name, bio, and social links across the entire site.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Hero Section Info */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Hero Section</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Display Name</label>
              <input required name="name" type="text" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" />
            </div>
            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Tagline</label>
              <input required name="tagline" type="text" value={formData.tagline} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Hero Subtitle</label>
              <textarea name="subtitle" rows="2" value={formData.subtitle} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a] resize-none" />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="pt-4">
          <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4 border-b border-white/5 pb-2">About Section</h4>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Bio Paragraph 1 (Use HTML for bold text if needed)</label>
              <textarea name="aboutP1" rows="3" value={formData.aboutP1} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a] resize-none" />
            </div>
            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Bio Paragraph 2 (Use HTML for bold text if needed)</label>
              <textarea name="aboutP2" rows="3" value={formData.aboutP2} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a] resize-none" />
            </div>
            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Resume Link (PDF URL)</label>
              <input name="resumeLink" type="text" value={formData.resumeLink} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="pt-4">
          <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Social Links</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">GitHub URL</label>
              <input name="github" type="text" value={formData.github} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" />
            </div>
            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">LinkedIn URL</label>
              <input name="linkedin" type="text" value={formData.linkedin} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" />
            </div>
            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Twitter URL</label>
              <input name="twitter" type="text" value={formData.twitter} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" />
            </div>
            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Instagram URL</label>
              <input name="instagram" type="text" value={formData.instagram} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" />
            </div>
            <div>
              <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Email Address</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a]" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4">
          <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Footer Section</h4>
          <div>
            <label className="block text-[10px] text-white/50 mb-2 uppercase tracking-widest">Footer Tagline</label>
            <textarea name="footerTagline" rows="2" value={formData.footerTagline} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#ff2a2a] resize-none" />
          </div>
        </div>

        <button disabled={saving} type="submit" className="w-full bg-[#ff2a2a] hover:bg-white text-black font-black text-xs tracking-widest uppercase py-4 rounded mt-8 transition-colors disabled:opacity-50">
          {saving ? 'SYNCING_DATA...' : 'SAVE_PROFILE'}
        </button>
      </form>
    </div>
  );
}
