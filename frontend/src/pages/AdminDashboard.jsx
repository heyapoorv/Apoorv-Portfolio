import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, doc, writeBatch, getDocs } from 'firebase/firestore';
import { projectData as fallbackProjectData } from '../data/projectsData';
import { fallbackAchievementsData } from '../components/Achievements';
import { fallbackLeadershipData } from '../components/Leadership';
import { fallbackCertificatesData } from '../components/Certificates';
import { fallbackProfileData } from '../data/profileData';
import ProjectsManager from '../components/admin/ProjectsManager';
import SkillsManager from '../components/admin/SkillsManager';
import AchievementsManager from '../components/admin/AchievementsManager';
import LeadershipManager from '../components/admin/LeadershipManager';
import CertificatesManager from '../components/admin/CertificatesManager';
import ProfileManager from '../components/admin/ProfileManager';

const fallbackSkillCategories = [
  {
    category: "Programming",
    skills: ["Python", "C++", "JavaScript", "SQL"]
  },
  {
    category: "AI / ML",
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "Hugging Face", "LangChain", "LlamaIndex"]
  },
  {
    category: "Backend",
    skills: ["FastAPI", "Node.js", "Express"]
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS"]
  },
  {
    category: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis"]
  },
  {
    category: "Cloud & DevOps",
    skills: ["Docker", "Git", "GitHub", "AWS"]
  }
];

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const handleSeedSkills = async () => {
    setSeeding(true);
    setSeedMessage('');
    try {
      const snap = await getDocs(collection(db, 'skills'));
      if (!snap.empty) {
        setSeedMessage('ABORTED: Skills already exist. We prevented the overwrite of your dynamic data!');
        setSeeding(false);
        return;
      }

      const batch = writeBatch(db);
      fallbackSkillCategories.forEach((group, index) => {
        const docRef = doc(db, 'skills', `group_${index}`);
        batch.set(docRef, group);
      });
      await batch.commit();
      setSeedMessage('Skills seeded successfully to Firestore!');
    } catch (err) {
      console.error('Error seeding skills:', err);
      setSeedMessage('Failed to seed skills. Make sure Firestore rules allow writes.');
    } finally {
      setSeeding(false);
    }
  };

  const handleSeedProjects = async () => {
    setSeeding(true);
    setSeedMessage('');
    try {
      const snap = await getDocs(collection(db, 'projects'));
      if (!snap.empty) {
        setSeedMessage('ABORTED: Projects already exist. We prevented the overwrite of your dynamic data!');
        setSeeding(false);
        return;
      }

      const batch = writeBatch(db);
      fallbackProjectData.forEach((proj, index) => {
        const docRef = doc(db, 'projects', `proj_${index}`);
        batch.set(docRef, proj);
      });
      await batch.commit();
      setSeedMessage('Projects seeded successfully to Firestore!');
    } catch (err) {
      console.error('Error seeding projects:', err);
      setSeedMessage('Failed to seed projects. Check your rules.');
    } finally {
      setSeeding(false);
    }
  };

  const handleSeedAchievements = async () => {
    setSeeding(true);
    setSeedMessage('');
    try {
      const snap = await getDocs(collection(db, 'achievements'));
      if (!snap.empty) {
        setSeedMessage('ABORTED: Achievements already exist. We prevented the overwrite of your dynamic data!');
        setSeeding(false);
        return;
      }

      const batch = writeBatch(db);
      fallbackAchievementsData.forEach((ach, index) => {
        const docRef = doc(db, 'achievements', `ach_${index}`);
        batch.set(docRef, ach);
      });
      await batch.commit();
      setSeedMessage('Achievements seeded successfully to Firestore!');
    } catch (err) {
      console.error('Error seeding achievements:', err);
      setSeedMessage('Failed to seed achievements. Make sure Firestore rules allow writes.');
    } finally {
      setSeeding(false);
    }
  };

  const handleSeedLeadership = async () => {
    setSeeding(true);
    setSeedMessage('');
    try {
      const snap = await getDocs(collection(db, 'leadership'));
      if (!snap.empty) {
        setSeedMessage('ABORTED: Leadership roles already exist. We prevented the overwrite of your dynamic data!');
        setSeeding(false);
        return;
      }

      const batch = writeBatch(db);
      fallbackLeadershipData.forEach((role, index) => {
        const docRef = doc(db, 'leadership', `lead_${index}`);
        const mappedRole = {
          role: role.position || '',
          organization: role.organization || '',
          period: role.period || '',
          description: role.description || ''
        };
        batch.set(docRef, mappedRole);
      });
      await batch.commit();
      setSeedMessage('Leadership roles seeded successfully to Firestore!');
    } catch (err) {
      console.error('Error seeding leadership:', err);
      setSeedMessage('Failed to seed leadership. Make sure Firestore rules allow writes.');
    } finally {
      setSeeding(false);
    }
  };

  const handleSeedCertificates = async () => {
    setSeeding(true);
    setSeedMessage('');
    try {
      const snap = await getDocs(collection(db, 'certificates'));
      if (!snap.empty) {
        setSeedMessage('ABORTED: Certificates already exist. We prevented the overwrite of your dynamic data!');
        setSeeding(false);
        return;
      }

      const batch = writeBatch(db);
      fallbackCertificatesData.forEach((cert, index) => {
        const docRef = doc(db, 'certificates', `cert_${index}`);
        batch.set(docRef, cert);
      });
      await batch.commit();
      setSeedMessage('Certificates seeded successfully to Firestore!');
    } catch (err) {
      console.error('Error seeding certificates:', err);
      setSeedMessage('Failed to seed certificates. Make sure Firestore rules allow writes.');
    } finally {
      setSeeding(false);
    }
  };

  const handleSeedProfile = async () => {
    setSeeding(true);
    setSeedMessage('');
    try {
      const docRef = doc(db, 'profile', 'main');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setSeedMessage('ABORTED: Profile already exists. We prevented the overwrite of your dynamic data!');
        setSeeding(false);
        return;
      }
      await setDoc(docRef, fallbackProfileData);
      setSeedMessage('Profile seeded successfully to Firestore!');
    } catch (err) {
      console.error('Error seeding profile:', err);
      setSeedMessage('Failed to seed profile.');
    } finally {
      setSeeding(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-mono">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-white/10 pb-4 gap-4">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase italic">
            ADMIN<span className="text-[#ff2a2a]">_PANEL</span>
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-xs tracking-widest uppercase">{user?.email}</span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[10px] uppercase tracking-widest transition-colors text-[#ff2a2a]"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0">
            {['profile', 'projects', 'skills', 'achievements', 'leadership', 'certificates', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-center md:text-left px-4 py-3 rounded text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-[#ff2a2a]/10 text-[#ff2a2a] border border-[#ff2a2a]/30' 
                    : 'text-white/50 hover:bg-white/5 border border-transparent'
                }`}
              >
                {tab}
              </button>
            ))}
            <div className="hidden md:block mt-8 pt-4 border-t border-white/10">
               <button onClick={() => navigate('/')} className="text-white/50 hover:text-white transition-colors w-full text-left px-4 py-2 text-xs uppercase tracking-widest">
                 &larr; View Live Site
               </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 md:p-8">
            <h2 className="text-xl font-bold mb-8 uppercase tracking-[0.2em] text-[#ff2a2a] border-b border-white/10 pb-4">{activeTab}_MANAGEMENT</h2>
            
            {activeTab === 'profile' ? (
              <ProfileManager />
            ) : activeTab === 'projects' ? (
              <ProjectsManager />
            ) : activeTab === 'skills' ? (
              <SkillsManager />
            ) : activeTab === 'achievements' ? (
              <AchievementsManager />
            ) : activeTab === 'leadership' ? (
              <LeadershipManager />
            ) : activeTab === 'certificates' ? (
              <CertificatesManager />
            ) : activeTab === 'settings' ? (
              <div className="space-y-6">
                <div className="p-6 bg-black/40 border border-white/10 rounded-xl">
                  <h3 className="text-sm font-bold text-[#ff2a2a] mb-2 uppercase tracking-widest">Seed Database</h3>
                  <p className="text-white/50 text-xs mb-6 uppercase tracking-wider">
                    Push the default hardcoded data to Firebase Firestore. Use this to initialize your database.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                    <button 
                      onClick={handleSeedSkills}
                      disabled={seeding}
                      className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-50 text-white text-[10px] uppercase tracking-widest rounded transition-colors"
                    >
                      {seeding ? 'SYNCING...' : 'Seed Skills'}
                    </button>
                    <button 
                      onClick={handleSeedProjects}
                      disabled={seeding}
                      className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-50 text-white text-[10px] uppercase tracking-widest rounded transition-colors"
                    >
                      {seeding ? 'SYNCING...' : 'Seed Projects'}
                    </button>
                    <button 
                      onClick={handleSeedAchievements}
                      disabled={seeding}
                      className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-50 text-white text-[10px] uppercase tracking-widest rounded transition-colors"
                    >
                      {seeding ? 'SYNCING...' : 'Seed Achievements'}
                    </button>
                    <button 
                      onClick={handleSeedLeadership}
                      disabled={seeding}
                      className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-50 text-white text-[10px] uppercase tracking-widest rounded transition-colors"
                    >
                      {seeding ? 'SYNCING...' : 'Seed Leadership'}
                    </button>
                    <button 
                      onClick={handleSeedCertificates}
                      disabled={seeding}
                      className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-50 text-white text-[10px] uppercase tracking-widest rounded transition-colors"
                    >
                      {seeding ? 'SYNCING...' : 'Seed Certificates'}
                    </button>
                    <button 
                      onClick={handleSeedProfile}
                      disabled={seeding}
                      className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-50 text-white text-[10px] uppercase tracking-widest rounded transition-colors"
                    >
                      {seeding ? 'SYNCING...' : 'Seed Profile'}
                    </button>
                  </div>
                  {seedMessage && (
                    <p className="mt-4 text-xs tracking-widest text-[#ff2a2a] animate-pulse">{seedMessage}</p>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
