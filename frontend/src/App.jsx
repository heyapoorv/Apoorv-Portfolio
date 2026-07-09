import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy load non-critical sections for performance
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Certificates = lazy(() => import('./components/Certificates'));
const Leadership = lazy(() => import('./components/Leadership'));
const Achievements = lazy(() => import('./components/Achievements'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Admin pages
const Login = lazy(() => import('./pages/Login'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

const PortfolioLayout = () => (
  <>
    <Navbar />
    <Hero />
    
    <Suspense fallback={<div className="h-screen bg-black" />}>
      {/* Main Content Modules in exact requested order */}
      <About />
      <Skills />
      <Portfolio />
      <Certificates />
      <Leadership />
      <Achievements />
      
      <Contact />
      <Footer />
    </Suspense>
  </>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioLayout />} />
      <Route 
        path="/login" 
        element={
          <Suspense fallback={<div className="h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
            <Login />
          </Suspense>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <Suspense fallback={<div className="h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
            <AdminDashboard />
          </Suspense>
        } 
      />
    </Routes>
  );
}

export default App;
