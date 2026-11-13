import React from 'react';
import { Link } from 'react-router-dom';
import { FestivalData } from '../types/festival';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { Image as ImageIcon, ChevronRight, Home, Flag, Calendar, Video, Sparkles } from 'lucide-react';

interface GalleryPageProps {
  data: FestivalData;
  isTelugu: boolean;
  searchQuery: string;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ data, isTelugu, searchQuery }) => {
  return (
    <div className="flex-grow py-8 max-w-7xl mx-auto px-4 md:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link to="/" className="hover:text-amber-800 flex items-center gap-1 font-medium transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>{isTelugu ? 'హోమ్' : 'Home'}</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-emerald-700 font-bold">
          {isTelugu ? 'చిత్ర మాలిక (13)' : 'Sacred Photo Gallery (13)'}
        </span>
      </nav>

      {/* Page Header Banner */}
      <div className="mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-emerald-400/5 to-transparent border border-emerald-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isTelugu ? '13 హై-రిజల్యూషన్ చిత్రాల ప్రదర్శన' : '13 High-Resolution Photos'}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isTelugu ? 'వేమండ క్షేత్ర దివ్య చిత్ర మాలిక' : 'Sacred Photo Gallery & Archives'}
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              {isTelugu
                ? 'జపమాల మాత దివ్య స్వరూపం, ధ్వజస్తంభ స్థాపన, రథోత్సవం, పునీతుల పల్లకీలు మరియు ఆహ్వాన పత్రికల ఛాయాచిత్రాలు.'
                : 'Browse through our curated collection of high-resolution images celebrating Mother Mary, St. Michael the Archangel, the illuminated flag pole, and chariot processions.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to="/flags"
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-amber-400 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Flag className="w-3.5 h-3.5 text-amber-600" />
              <span>{isTelugu ? '4 పతాకాలు' : 'Sacred Flags'}</span>
            </Link>
            <Link
              to="/schedule"
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-blue-400 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>{isTelugu ? 'కార్యక్రమ పట్టిక' : 'Schedule'}</span>
            </Link>
            <Link
              to="/videos"
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-red-400 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Video className="w-3.5 h-3.5 text-red-600" />
              <span>{isTelugu ? 'వీడియోలు' : 'Videos'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Gallery Lightbox Component */}
      <GalleryLightbox gallery={data.gallery} isTelugu={isTelugu} searchQuery={searchQuery} />
    </div>
  );
};
