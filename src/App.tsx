import React, { useState } from 'react';
import { festivalData } from './data/festivalData';
import { PortalHeader } from './components/PortalHeader';
import { PortalFooter } from './components/PortalFooter';
import { FlagsShowcase } from './components/FlagsShowcase';
import { ScheduleTimeline } from './components/ScheduleTimeline';
import { VideoExperience } from './components/VideoExperience';
import { GalleryLightbox } from './components/GalleryLightbox';
import { GoogleSearchExperience } from './components/GoogleSearchExperience';
import {
  Flag,
  Calendar,
  Video,
  Image as ImageIcon,
  Sparkles,
  Search,
  Church,
} from 'lucide-react';

export const App: React.FC = () => {
  const [isTelugu, setIsTelugu] = useState<boolean>(true);
  // Default to 'google' view so searching "vemanda" shows Google Search results as requested!
  const [viewMode, setViewMode] = useState<'google' | 'portal'>('google');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleLanguage = () => setIsTelugu(!isTelugu);
  const toggleViewMode = () => setViewMode(viewMode === 'google' ? 'portal' : 'google');

  const handleSelectFlag = (flagId: number) => {
    setViewMode('portal');
    setTimeout(() => {
      const el = document.getElementById('flags');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectVideo = (videoId: string) => {
    setViewMode('portal');
    setTimeout(() => {
      const el = document.getElementById('videos');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectPhoto = (photoIndex: number) => {
    setViewMode('portal');
    setTimeout(() => {
      const el = document.getElementById('gallery');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
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
        {/* Top Universal Header */}
        <PortalHeader
          isTelugu={isTelugu}
          onToggleLanguage={toggleLanguage}
          viewMode={viewMode}
          onToggleViewMode={toggleViewMode}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Main View Router: Google Search Experience vs Shrine Portal */}
        {viewMode === 'google' ? (
          <GoogleSearchExperience
            data={festivalData}
            isTelugu={isTelugu}
            onOpenPortal={() => setViewMode('portal')}
            onSelectFlag={handleSelectFlag}
            onSelectVideo={handleSelectVideo}
            onSelectPhoto={handleSelectPhoto}
          />
        ) : (
          <main className="flex-grow">
            {/* Majestic Hero Banner */}
            <section className="relative overflow-hidden pt-10 pb-16 md:py-20 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-10">
                  {/* Left Column: Text & Actions */}
                  <div className="flex-1 text-center lg:text-left">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs md:text-sm font-semibold mb-6 shadow-sm">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>
                        {isTelugu
                          ? `${festivalData.villageTelugu}, ${festivalData.parishTelugu} విచారణ`
                          : `${festivalData.village} Village, ${festivalData.parish} Parish`}
                      </span>
                      <span className="text-amber-400">•</span>
                      <span>{isTelugu ? festivalData.editionTelugu : festivalData.edition}</span>
                    </div>

                    {/* Title - Decreased font size in English and Telugu */}
                    <h1 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-slate-900 tracking-tight mb-3">
                      {isTelugu ? (
                        <>
                          <span className="block text-amber-700 text-xl sm:text-2xl md:text-3xl font-extrabold mb-1">వేమండ</span>
                          <span className="text-slate-800 text-lg sm:text-xl md:text-2xl font-bold">జపమాల మాత గృహ ప్రతిష్ట</span>
                        </>
                      ) : (
                        <>
                          <span className="block text-amber-700 text-xl sm:text-2xl md:text-3xl font-extrabold mb-1">Vemanda</span>
                          <span className="text-slate-800 text-lg sm:text-xl md:text-2xl font-bold">Japamala Matha Annual Feast</span>
                        </>
                      )}
                    </h1>

                    {/* Scripture Banner */}
                    <div className="max-w-2xl my-5 p-4 rounded-2xl bg-amber-50/80 border-l-4 border-amber-500 text-amber-900 text-sm md:text-base italic shadow-xs">
                      {isTelugu ? festivalData.scriptureTelugu : festivalData.scripture}
                    </div>

                    {/* Date Callout */}
                    <p className="text-xl md:text-2xl font-bold text-blue-700 mb-6">
                      {isTelugu ? festivalData.dates.displayTelugu : festivalData.dates.display}
                    </p>

                    {/* Quick Jump Buttons */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
                      <a
                        href="#flags"
                        className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs md:text-sm shadow-md transition-all flex items-center gap-1.5"
                      >
                        <Flag className="w-4 h-4" />
                        {isTelugu ? '4 పతాక ఆవిష్కరణలు' : '4 Sacred Flags'}
                      </a>
                      <a
                        href="#schedule"
                        className="px-5 py-2.5 rounded-full bg-white border border-slate-300 hover:border-blue-500 text-slate-800 font-bold text-xs md:text-sm shadow-sm transition-all flex items-center gap-1.5"
                      >
                        <Calendar className="w-4 h-4 text-blue-600" />
                        {isTelugu ? 'కార్యక్రమ వివరాలు' : 'Daily Schedule'}
                      </a>
                      <a
                        href="#videos"
                        className="px-5 py-2.5 rounded-full bg-white border border-slate-300 hover:border-red-500 text-slate-800 font-bold text-xs md:text-sm shadow-sm transition-all flex items-center gap-1.5"
                      >
                        <Video className="w-4 h-4 text-red-600" />
                        {isTelugu ? 'వీడియోలు (5)' : 'Videos (5)'}
                      </a>
                      <a
                        href="#gallery"
                        className="px-5 py-2.5 rounded-full bg-white border border-slate-300 hover:border-emerald-500 text-slate-800 font-bold text-xs md:text-sm shadow-sm transition-all flex items-center gap-1.5"
                      >
                        <ImageIcon className="w-4 h-4 text-emerald-600" />
                        {isTelugu ? 'చిత్ర మాలిక (13)' : 'Gallery (13)'}
                      </a>
                      <button
                        onClick={() => setViewMode('google')}
                        className="px-5 py-2.5 rounded-full bg-blue-50 border border-blue-300 hover:bg-blue-600 hover:text-white text-blue-700 font-bold text-xs md:text-sm transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <Search className="w-4 h-4 text-blue-600" />
                        {isTelugu ? 'గూగుల్ సెర్చ్ వ్యూ చూడండి' : 'Try Google Search View'}
                      </button>
                    </div>

                    {/* 4 Stats Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                        <div className="text-2xl font-extrabold text-amber-600">4</div>
                        <div className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider">
                          {isTelugu ? 'పవిత్ర పతాకాలు' : 'Sacred Flags'}
                        </div>
                      </div>
                      <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                        <div className="text-2xl font-extrabold text-blue-600">4</div>
                        <div className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider">
                          {isTelugu ? 'మహోత్సవ దినాలు' : 'Festival Days'}
                        </div>
                      </div>
                      <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                        <div className="text-2xl font-extrabold text-red-600">5</div>
                        <div className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider">
                          {isTelugu ? 'ప్రత్యక్ష వీడియోలు' : 'Video Clips'}
                        </div>
                      </div>
                      <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                        <div className="text-2xl font-extrabold text-emerald-600">13</div>
                        <div className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider">
                          {isTelugu ? 'హై-రెస్ చిత్రాలు' : 'High-Res Photos'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Featured Shrine Image Card */}
                  <div className="lg:w-96 flex-shrink-0">
                    <div className="relative rounded-3xl overflow-hidden bg-white p-3 border border-slate-200 shadow-2xl">
                      <img
                        src="/images/hero-shrine-background.jpeg"
                        alt="Vemanda Illuminated Flag Pole and Mother Mary"
                        className="w-full h-auto max-h-[460px] object-cover rounded-2xl shadow-md"
                      />
                      <div className="mt-3 text-center">
                        <h4 className="text-sm font-bold text-slate-900">
                          {isTelugu
                            ? 'విద్యుద్దీప శోభిత ధ్వజస్తంభం & జపమాల మహోత్సవాలు'
                            : 'Illuminated Flag Pole & Japamala Matha Shrine'}
                        </h4>
                        <p className="text-xs text-amber-800 font-medium">
                          {isTelugu ? 'వేమండ గ్రామము' : 'Vemanda Village'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 1: The 4 Sacred Flags */}
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <FlagsShowcase
                flags={festivalData.flags}
                isTelugu={isTelugu}
                searchQuery={searchQuery}
              />

              {/* Section 2: Day-by-Day Schedule Timeline */}
              <ScheduleTimeline
                schedule={festivalData.schedule}
                dailyTradition={festivalData.dailyTradition}
                isTelugu={isTelugu}
                searchQuery={searchQuery}
              />

              {/* Section 3: Video Experience Center */}
              <VideoExperience
                videos={festivalData.videos}
                isTelugu={isTelugu}
                searchQuery={searchQuery}
              />

              {/* Section 4: Photo Gallery & Lightbox */}
              <GalleryLightbox
                gallery={festivalData.gallery}
                isTelugu={isTelugu}
                searchQuery={searchQuery}
              />
            </div>
          </main>
        )}

        {/* Universal Footer with Notices */}
        <PortalFooter notices={festivalData.notices} isTelugu={isTelugu} />
      </div>
    </div>
  );
};
