/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { ProjectGallery } from './components/ProjectGallery';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { profile } from './config/profile';

export default function App() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [activeConsultationService, setActiveConsultationService] = useState('');

  // Dynamically sync document title and meta from profile config
  useEffect(() => {
    if (profile.seo.title) {
      document.title = profile.seo.title;
    }
  }, []);

  const handleOpenConsultation = (serviceTitle?: string) => {
    if (serviceTitle) {
      setActiveConsultationService(serviceTitle);
    } else {
      setActiveConsultationService('');
    }
    setConsultationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Dynamic Theme Color Injection from profile.ts */}
      <style>{`
        :root {
          --theme-primary: ${profile.theme.primary};
          --theme-primary-hover: ${profile.theme.primaryHover};
          --theme-accent: ${profile.theme.accent};
          --theme-bg: ${profile.theme.background};
          --theme-surface: ${profile.theme.surface};
          --theme-card: ${profile.theme.surfaceCard};
          --theme-border: ${profile.theme.border};
        }
      `}</style>

      {/* 1. Header with Top Bar Contract */}
      <Header onOpenConsultation={() => handleOpenConsultation()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero onOpenConsultation={() => handleOpenConsultation()} />

        {/* 3. About Section */}
        <About />

        {/* 4. Services Section */}
        <Services onSelectService={(service) => handleOpenConsultation(service)} />

        {/* 5. Skills & Equipment Section */}
        <Skills />

        {/* 6. Projects & Album Showcase Section */}
        <ProjectGallery onConsultProject={(project) => handleOpenConsultation(project)} />

        {/* 7. Experience Timeline & Testimonials Section */}
        <Experience />

        {/* 8. Contact & Survey Lead Capture Section */}
        <Contact prefilledService={activeConsultationService} />
      </main>

      {/* 9. Footer & Mobile Floating CTA */}
      <Footer />

      {/* Interactive Consultation / Quote Request Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        initialService={activeConsultationService}
      />
    </div>
  );
}
