import React from 'react';
import { Link } from 'react-router-dom';
import { FestivalData } from '../types/festival';
import { VideoExperience } from '../components/VideoExperience';
import { Video, ChevronRight, Home, Flag, Calendar, Image as ImageIcon, PlayCircle } from 'lucide-react';

interface VideosPageProps {
  data: FestivalData;
  isTelugu: boolean;
  searchQuery: string;
}

export const VideosPage: React.FC<VideosPageProps> = ({ data, isTelugu, searchQuery }) => {
  return (
    <div className="flex-grow py-8 max-w-7xl mx-auto px-4 md:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link to="/" className="hover:text-amber-800 flex items-center gap-1 font-medium transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>{isTelugu ? 'హోమ్' : 'Home'}</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-red-700 font-bold">
          {isTelugu ? 'ప్రత్యక్ష వీడియోలు (5)' : 'Devotional Videos (5)'}
        </span>
      </nav>

      {/* Page Header Banner */}
      <div className="mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-red-500/10 via-red-400/5 to-transparent border border-red-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-900 text-xs font-semibold mb-3">
              <PlayCircle className="w-3.5 h-3.5 text-red-700" />
              <span>{isTelugu ? '5 ప్రత్యక్ష మహోత్సవ దృశ్యాలు' : '5 Live HD Celebration Clips'}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isTelugu ? 'వేమండ క్షేత్ర దివ్య వీడియోలు' : 'Vemanda Shrine Video Center'}
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              {isTelugu
                ? 'ధ్వజస్తంభ విద్యుద్దీప ప్రకాశం, పతాకావిష్కరణ, పునీతుల పల్లకీ ఊరేగింపు, గాయక బృంద సంకీర్తనలు మరియు తేరు రథోత్సవ వీడియోలు.'
                : 'Watch high-definition highlights of flag hoisting, flagpole illuminations, saint palanquin processions, choir devotional hymns, and chariot street celebrations.'}
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
              to="/gallery"
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-emerald-400 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isTelugu ? 'చిత్రాలు' : 'Photos'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Video Experience Component */}
      <VideoExperience videos={data.videos} isTelugu={isTelugu} searchQuery={searchQuery} />
    </div>
  );
};

