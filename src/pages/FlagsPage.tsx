import React from 'react';
import { Link } from 'react-router-dom';
import { FestivalData } from '../types/festival';
import { FlagsShowcase } from '../components/FlagsShowcase';
import { SeoHead } from '../components/SeoHead';
import { Flag, ChevronRight, Home, Calendar, Video, Image as ImageIcon, Sparkles } from 'lucide-react';

interface FlagsPageProps {
  data: FestivalData;
  isTelugu: boolean;
  searchQuery: string;
}

export const FlagsPage: React.FC<FlagsPageProps> = ({ data, isTelugu, searchQuery }) => {
  return (
    <div className="flex-grow py-8 max-w-7xl mx-auto px-4 md:px-8">
      <SeoHead
        title={
          isTelugu
            ? 'వేమండ 4 పవిత్ర పతాక ఆవిష్కరణలు | Vemanda Festival Sacred Flags'
            : 'Vemanda 4 Sacred Flag Hoistings | Vemanda Festival Traditions'
        }
        description={
          isTelugu
            ? 'వేమండ జపమాల మాత క్షేత్రంలో అక్టోబర్ 27 నుండి 30 వరకు జరిగే 4 పవిత్ర పతాక ఆవిష్కరణలు, ఉదయం 8 గంటల ఆర్.సి.యం. దేవాలయ ఊరేగింపు మరియు దివ్యబలిపూజల వివరాలు.'
            : 'Detailed guide to the 4 Sacred Flag Hoistings (October 27-30) at Vemanda Japamala Matha Shrine in Vemanda Village, including daily morning RCM church processions and choir hymns.'
        }
        canonicalPath="/flags"
        keywords="Vemanda, Vemanda Festival Flags, Vemanda Sacred Flags, Vemanda Japamala Matha, వేమండ, పతాక ఆవిష్కరణ, Vemanda Village"
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link to="/" className="hover:text-amber-800 flex items-center gap-1 font-medium transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>{isTelugu ? 'హోమ్' : 'Home'}</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-amber-800 font-bold">
          {isTelugu ? '4 పవిత్ర పతాక ఆవిష్కరణలు' : '4 Sacred Flag Hoistings'}
        </span>
      </nav>

      {/* Page Header Banner */}
      <div className="mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-3">
              <Flag className="w-3.5 h-3.5 text-amber-700" />
              <span>{isTelugu ? 'మహోత్సవ ప్రత్యేక విశేషం' : 'Special Festival Feature'}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isTelugu ? 'చతుర్విధ పతాక ఆవిష్కరణలు' : 'The Four Sacred Flag Hoistings'}
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              {isTelugu
                ? 'వేమండ జపమాల మాత పుణ్యక్షేత్రంలో అక్టోబర్ 27 నుండి 30 వరకు ప్రతిరోజూ అత్యంత భక్తి శ్రద్ధలతో మరియు మేళతాళాలతో సమర్పించబడు పవిత్ర పతాక మహోత్సవాలు.'
                : 'Solemn and devotional hoisting of the 4 sacred flags from October 27 to 30 at Japamala Matha Shrine, accompanied by traditional Melathalalu and choral hymns.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-2 flex-wrap">
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

      {/* Main Flags Showcase Component */}
      <FlagsShowcase
        flags={data.flags}
        schedule={data.schedule}
        dailyTradition={data.dailyTradition}
        isTelugu={isTelugu}
        searchQuery={searchQuery}
      />
    </div>
  );
};

