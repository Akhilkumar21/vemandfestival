import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { CommunityMediaShowcase } from '../components/CommunityMediaShowcase';
import { MediaUploadModal } from '../components/MediaUploadModal';
import { MediaType } from '../types/media';
import {
  Users,
  ChevronRight,
  Home,
  Image as ImageIcon,
  Video,
  Upload,
  Sparkles,
  Heart,
  Flag,
  Calendar,
} from 'lucide-react';

interface CommunityPageProps {
  isTelugu: boolean;
  searchQuery: string;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ isTelugu, searchQuery }) => {
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);
  const [modalDefaultType, setModalDefaultType] = useState<MediaType>('image');

  const handleOpenUpload = (type: MediaType = 'image') => {
    setModalDefaultType(type);
    setUploadModalOpen(true);
  };

  return (
    <div className="flex-grow py-8 max-w-7xl mx-auto px-4 md:px-8">
      <SeoHead
        title={
          isTelugu
            ? 'భక్తుల ఫోటోలు & వీడియోల వేదిక | Vemanda Devotee Community Media'
            : 'Devotee Community Photo & Video Gallery | Vemanda Festival'
        }
        description={
          isTelugu
            ? 'వేమండ జపమాల మాత మహోత్సవాల భక్తుల స్వంత చిత్రాలు మరియు వీడియోల ప్రదర్శన. మీ ఫోటోలు, వీడియోలను అప్‌లోడ్ చేసి ఉత్సవ జ్ఞాపకాలను పంచుకోండి.'
            : 'Explore photos and videos uploaded by devotees of Vemanda Japamala Matha Feast. Upload your own festive moments, processions, and devotional hymns.'
        }
        canonicalPath="/community"
        keywords="Vemanda Devotee Photos, Vemanda Uploads, Vemanda Community Videos, వేమండ భక్తుల ఫోటోలు, Vemanda Festival Community"
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link
          to="/"
          className="hover:text-amber-800 flex items-center gap-1 font-medium transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>{isTelugu ? 'హోమ్' : 'Home'}</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-amber-700 font-bold">
          {isTelugu ? 'భక్తుల చిత్రాలు & వీడియోలు' : 'Devotee Media Hub'}
        </span>
      </nav>

      {/* Page Header Banner */}
      <div className="mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-transparent border border-amber-300/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>
                {isTelugu ? 'భక్తుల సమర్పణల వేదిక & ప్రత్యక్ష ప్రదర్శన' : 'Devotee Uploads & Live Showcase'}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isTelugu ? 'వేమండ భక్తుల సమర్పిత చిత్ర & దృశ్య మాలిక' : 'Devotee Photo & Video Center'}
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              {isTelugu
                ? 'మీరు తీసిన వేమండ పతాకావిష్కరణ, పూజలు, రథోత్సవ ఫోటోలు మరియు వీడియోలను ఇక్కడ సులభంగా అప్‌లోడ్ చేయండి. ప్రతి భక్తుడు మీ సమర్పణలను వీక్షించవచ్చు మరియు లైక్ చేయవచ్చు!'
                : 'Share your personal pictures and video captures from the Vemanda Japamala Matha Feast. Upload files instantly to be viewed, cherished, and blessed by fellow pilgrims worldwide.'}
            </p>
          </div>

          {/* Direct Upload Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => handleOpenUpload('image')}
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-200 transition-all flex items-center gap-2 active:scale-95"
            >
              <ImageIcon className="w-4 h-4" />
              <span>{isTelugu ? 'ఫోటో అప్‌లోడ్ చేయండి' : 'Upload Festival Photo'}</span>
            </button>
            <button
              onClick={() => handleOpenUpload('video')}
              className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-200 transition-all flex items-center gap-2 active:scale-95"
            >
              <Video className="w-4 h-4" />
              <span>{isTelugu ? 'వీడియో అప్‌లోడ్ చేయండి' : 'Upload Video Clip'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Showcase Component */}
      <CommunityMediaShowcase
        isTelugu={isTelugu}
        searchQuery={searchQuery}
        onOpenUploadModal={handleOpenUpload}
        showHeader={false}
      />

      {/* Media Upload Modal */}
      <MediaUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        isTelugu={isTelugu}
        defaultType={modalDefaultType}
      />
    </div>
  );
};
