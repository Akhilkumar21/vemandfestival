import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FestivalData } from '../types/festival';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { SeoHead } from '../components/SeoHead';
import { MediaUploadModal } from '../components/MediaUploadModal';
import {
  Image as ImageIcon,
  ChevronRight,
  Home,
  Flag,
  Calendar,
  Video,
  Sparkles,
  Upload,
  Users,
} from 'lucide-react';

interface GalleryPageProps {
  data: FestivalData;
  isTelugu: boolean;
  searchQuery: string;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ data, isTelugu, searchQuery }) => {
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);

  return (
    <div className="flex-grow py-8 max-w-7xl mx-auto px-4 md:px-8">
      <SeoHead
        title={
          isTelugu
            ? 'వేమండ చిత్ర మాలిక & భక్తుల ఫోటోలు | Vemanda Festival Gallery'
            : 'Vemanda Photo Gallery & Devotee Uploads | Vemanda Japamala Matha Shrine'
        }
        description={
          isTelugu
            ? 'వేమండ జపమాల మాత క్షేత్ర పవిత్ర స్వరూపాలు, ధ్వజస్తంభం, దీపాలంకరణ, రథోత్సవం మరియు భక్తులు సమర్పించిన అరుదైన చిత్రాలు.'
            : 'Explore high-resolution official photos and devotee uploads of Vemanda Japamala Matha Shrine Annual Festival: sacred statues, illuminated flag mast, and chariot procession in Vemanda Village.'
        }
        canonicalPath="/gallery"
        keywords="Vemanda, Vemanda Photos, Vemanda Gallery, Vemanda Japamala Matha Photos, వేమండ, చిత్ర మాలిక, భక్తుల ఫోటోలు, Vemanda Village"
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link to="/" className="hover:text-amber-800 flex items-center gap-1 font-medium transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>{isTelugu ? 'హోమ్' : 'Home'}</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-emerald-700 font-bold">
          {isTelugu ? 'చిత్ర మాలిక & భక్తుల ఫోటోలు' : 'Photo Gallery & Devotee Uploads'}
        </span>
      </nav>

      {/* Page Header Banner */}
      <div className="mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-emerald-400/5 to-transparent border border-emerald-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>
                {isTelugu ? 'అధికారిక & భక్తుల సమర్పిత చిత్రాలు' : 'Official Photos & Devotee Uploads'}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isTelugu ? 'వేమండ క్షేత్ర దివ్య చిత్ర మాలిక' : 'Sacred Photo Gallery & Archives'}
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              {isTelugu
                ? 'జపమాల మాత దివ్య స్వరూపం, ధ్వజస్తంభ స్థాపన, రథోత్సవం, పునీతుల పల్లకీలు మరియు భక్తులు స్వయంగా అప్‌లోడ్ చేసిన ఉత్సవ చిత్రాలు.'
                : 'Browse through our curated collection of high-resolution images celebrating Mother Mary, St. Michael the Archangel, illuminated flag poles, and photos submitted directly by devotees.'}
            </p>
          </div>

          {/* Quick Actions & Upload CTA */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setUploadModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-amber-200"
            >
              <Upload className="w-4 h-4" />
              <span>{isTelugu ? 'ఫోటో అప్‌లోడ్ చేయండి' : 'Upload Photo'}</span>
            </button>
            <Link
              to="/community"
              className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-amber-400 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>{isTelugu ? 'భక్తుల వేదిక' : 'Community Hub'}</span>
            </Link>
            <Link
              to="/videos"
              className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-red-400 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Video className="w-3.5 h-3.5 text-red-600" />
              <span>{isTelugu ? 'వీడియోలు' : 'Videos'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Gallery Lightbox Component */}
      <GalleryLightbox
        gallery={data.gallery}
        isTelugu={isTelugu}
        searchQuery={searchQuery}
        onOpenUploadModal={() => setUploadModalOpen(true)}
      />

      {/* Standalone Upload Modal */}
      <MediaUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        isTelugu={isTelugu}
        defaultType="image"
      />
    </div>
  );
};
