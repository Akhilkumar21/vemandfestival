import React from 'react';
import { Link } from 'react-router-dom';
import { FestivalData } from '../types/festival';
import { ScheduleTimeline } from '../components/ScheduleTimeline';
import { Calendar, ChevronRight, Home, Flag, Video, Image as ImageIcon, Clock } from 'lucide-react';

interface SchedulePageProps {
  data: FestivalData;
  isTelugu: boolean;
  searchQuery: string;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({ data, isTelugu, searchQuery }) => {
  return (
    <div className="flex-grow py-8 max-w-7xl mx-auto px-4 md:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link to="/" className="hover:text-amber-800 flex items-center gap-1 font-medium transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>{isTelugu ? 'హోమ్' : 'Home'}</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-blue-700 font-bold">
          {isTelugu ? 'కార్యక్రమ వివరాలు' : 'Daily Schedule & Program'}
        </span>
      </nav>

      {/* Page Header Banner */}
      <div className="mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-500/10 via-blue-400/5 to-transparent border border-blue-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-semibold mb-3">
              <Clock className="w-3.5 h-3.5 text-blue-700" />
              <span>{isTelugu ? '4 రోజుల సమగ్ర కాలపట్టిక' : '4-Day Comprehensive Timetable'}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isTelugu ? 'మహోత్సవ కార్యక్రమ వివరాలు' : 'Daily Schedule & Timetable'}
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              {isTelugu
                ? 'అక్టోబర్ 27 నుండి 30 వరకు ప్రతిరోజూ జరుగనున్న పతాకావిష్కరణ, దివ్యబలిపూజలు, ఆరాధనలు మరియు రథోత్సవ సమయాల వివరాలు.'
                : 'Complete itinerary of flag hoisting, Eucharistic adorations, Holy Mass celebrations, and the Grand Chariot street procession from October 27 to 30.'}
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
              to="/videos"
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-red-400 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Video className="w-3.5 h-3.5 text-red-600" />
              <span>{isTelugu ? 'వీడియోలు' : 'Videos'}</span>
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

      {/* Main Schedule Timeline Component */}
      <ScheduleTimeline
        schedule={data.schedule}
        dailyTradition={data.dailyTradition}
        isTelugu={isTelugu}
        searchQuery={searchQuery}
      />
    </div>
  );
};

