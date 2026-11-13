import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { festivalData } from './data/festivalData';
import { PortalHeader } from './components/PortalHeader';
import { PortalFooter } from './components/PortalFooter';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { FlagsPage } from './pages/FlagsPage';
import { SchedulePage } from './pages/SchedulePage';
import { PrayersPage } from './pages/PrayersPage';
import { VideosPage } from './pages/VideosPage';
import { GalleryPage } from './pages/GalleryPage';
import { NoticesPage } from './pages/NoticesPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  const [isTelugu, setIsTelugu] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleLanguage = () => setIsTelugu(!isTelugu);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen text-slate-800 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
        {/* Fixed Divine Background Image - Vemanda Illuminated Shrine & Flag Pole */}
        <div
          className="fixed inset-0 z-0 pointer-events-none bg-cover bg-center bg-fixed opacity-30 sm:opacity-35"
          style={{
            backgroundImage: `url('/images/hero-shrine-background.jpeg')`,
          }}
        />
        {/* Luminous Soft White Screen Overlay - Keeps background bright, clean and white */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-white/75 via-white/65 to-white/80 backdrop-blur-[0.5px]" />

        {/* Content Container (Above Background) */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Universal Header with Navigation & Bilingual Controls */}
          <PortalHeader
            isTelugu={isTelugu}
            onToggleLanguage={toggleLanguage}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Application Routes */}
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  data={festivalData}
                  isTelugu={isTelugu}
                  searchQuery={searchQuery}
                />
              }
            />
            <Route
              path="/flags"
              element={
                <FlagsPage
                  data={festivalData}
                  isTelugu={isTelugu}
                  searchQuery={searchQuery}
                />
              }
            />
            <Route
              path="/schedule"
              element={
                <SchedulePage
                  data={festivalData}
                  isTelugu={isTelugu}
                  searchQuery={searchQuery}
                />
              }
            />
            <Route
              path="/prayers"
              element={
                <PrayersPage
                  isTelugu={isTelugu}
                  searchQuery={searchQuery}
                />
              }
            />
            <Route
              path="/videos"
              element={
                <VideosPage
                  data={festivalData}
                  isTelugu={isTelugu}
                  searchQuery={searchQuery}
                />
              }
            />
            <Route
              path="/gallery"
              element={
                <GalleryPage
                  data={festivalData}
                  isTelugu={isTelugu}
                  searchQuery={searchQuery}
                />
              }
            />
            <Route
              path="/notices"
              element={
                <NoticesPage
                  data={festivalData}
                  isTelugu={isTelugu}
                  searchQuery={searchQuery}
                />
              }
            />
            <Route path="*" element={<NotFoundPage isTelugu={isTelugu} />} />
          </Routes>

          {/* Universal Footer with Notices & Parish Info */}
          <PortalFooter notices={festivalData.notices} isTelugu={isTelugu} />
        </div>
      </div>
    </BrowserRouter>
  );
};
