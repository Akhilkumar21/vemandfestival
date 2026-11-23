import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FestivalData } from '../types/festival';
import { VideoExperience } from '../components/VideoExperience';
import { SeoHead } from '../components/SeoHead';
import { MediaUploadModal } from '../components/MediaUploadModal';
import {
  Video,
  ChevronRight,
  Home,
  Flag,
  Calendar,
  Image as ImageIcon,
  PlayCircle,
  Upload,
  Users,
} from 'lucide-react';

interface VideosPageProps {
  data: FestivalData;
  isTelugu: boolean;
  searchQuery: string;
}

export const VideosPage: React.FC<VideosPageProps> = ({ data, isTelugu, searchQuery }) => {
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);

  return (
    <div className="flex-grow py-8 max-w-7xl mx-auto px-4 md:px-8">
      <SeoHead
        title={
          isTelugu
            ? 'వేమండ వార్షిక మహోత్సవ ప్రత్యక్ష వీడియోలు & భక్తుల సమర్పణలు | Vemanda Festival Videos'
            : 'Vemanda Festival Devotional Videos & Devotee Uploads | Vemanda Feast'
        }
        description={
          isTelugu
            ? 'వేమండ జపమాల మాత క్షేత్ర వార్షిక మహోత్సవాల ప్రత్యక్ష HD వీడియోలు మరియు భక్తులు పంచుకున్న వీడియో క్లిప్‌లు. పతాక ఆవిష్కరణ, మేళతాళాల ఊరేగింపు మరియు మహా రథోత్సవ దృశ్యాలు.'
            : 'Watch HD devotional video highlights and devotee uploads from Vemanda Japamala Matha Shrine Annual Festival in Vemanda Village.'
        }
        canonicalPath="/videos"
        keywords="Vemanda, Vemanda Videos, Vemanda Festival Video, Vemanda Devotee Videos, వేమండ, వీడియోలు, Vemanda Village Rathotsavam"
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link to="/" className="hover:text-amber-800 flex items-center gap-1 font-medium transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>{isTelugu ? 'హోమ్' : 'Home'}</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-red-700 font-bold">
          {isTelugu ? 'ప్రత్యక్ష వీడియోలు & భక్తుల సమర్పణలు' : 'Devotional Videos & Devotee Uploads'}
        </span>
      </nav>

      {/* Page Header Banner */}
      <div className="mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-red-500/10 via-red-400/5 to-transparent border border-red-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-900 text-xs font-semibold mb-3">
              <PlayCircle className="w-3.5 h-3.5 text-red-700" />
              <span>
                {isTelugu ? 'ప్రత్యక్ష మహోత్సవ దృశ్యాలు & భక్తుల వీడియోలు' : 'Feast Highlights & Devotee Videos'}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isTelugu ? 'వేమండ క్షేత్ర దివ్య వీడియోలు' : 'Vemanda Shrine Video Center'}
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              {isTelugu
                ? 'ధ్వజస్తంభ విద్యుద్దీప ప్రకాశం, పతాకావిష్కరణ, పునీతుల పల్లకీ ఊరేగింపు, మరియు భక్తులు స్వయంగా అప్‌లోడ్ చేసిన దివ్య వీడియోలు.'
                : 'Watch high-definition highlights of flag hoisting, flagpole illuminations, saint palanquin processions, choir devotional hymns, and video clips uploaded by devotees.'}
            </p>
          </div>

          {/* Quick Actions & Upload CTA */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setUploadModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-red-200"
            >
              <Upload className="w-4 h-4" />
              <span>{isTelugu ? 'వీడియో అప్‌లోడ్ చేయండి' : 'Upload Video'}</span>
            </button>
            <Link
              to="/community"
              className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-amber-400 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>{isTelugu ? 'భక్తుల వేదిక' : 'Community Hub'}</span>
            </Link>
            <Link
              to="/gallery"
              className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-emerald-400 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isTelugu ? 'చిత్రాలు' : 'Photos'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Video Experience Component */}
      <VideoExperience
        videos={data.videos}
        isTelugu={isTelugu}
        searchQuery={searchQuery}
        onOpenUploadModal={() => setUploadModalOpen(true)}
      />

      {/* Standalone Upload Modal */}
      <MediaUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        isTelugu={isTelugu}
        defaultType="video"
      />
    </div>
  );
};
