import React, { useState, useEffect } from 'react';
import { VideoItem } from '../types/festival';
import { UserUploadedMedia } from '../types/media';
import { getUserVideos, toggleLikeMedia } from '../utils/mediaStorage';
import { MediaUploadModal } from './MediaUploadModal';
import {
  Video,
  Play,
  Maximize2,
  X,
  Clock,
  Sparkles,
  Upload,
  Heart,
  User,
  MapPin,
} from 'lucide-react';

interface VideoExperienceProps {
  videos: VideoItem[];
  isTelugu: boolean;
  searchQuery: string;
  onOpenUploadModal?: () => void;
}

interface CombinedVideoItem {
  id: string;
  path: string;
  title: string;
  titleTelugu: string;
  duration: string;
  category: string;
  categoryTelugu: string;
  description: string;
  descriptionTelugu: string;
  isCommunity?: boolean;
  uploaderName?: string;
  village?: string;
  likes?: number;
  likedByMe?: boolean;
  dateDisplay?: string;
}

export const VideoExperience: React.FC<VideoExperienceProps> = ({
  videos,
  isTelugu,
  searchQuery,
  onOpenUploadModal,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'official' | 'community'>('all');
  const [activeModalVideo, setActiveModalVideo] = useState<CombinedVideoItem | null>(null);
  const [communityVideos, setCommunityVideos] = useState<UserUploadedMedia[]>([]);
  const [localUploadModalOpen, setLocalUploadModalOpen] = useState<boolean>(false);

  const fetchCommunityVideos = async () => {
    try {
      const vids = await getUserVideos();
      setCommunityVideos(vids);
    } catch (err) {
      console.error('Failed to load user videos:', err);
    }
  };

  useEffect(() => {
    fetchCommunityVideos();

    const handleUpdate = () => {
      fetchCommunityVideos();
    };

    window.addEventListener('vemanda_media_updated', handleUpdate);
    return () => window.removeEventListener('vemanda_media_updated', handleUpdate);
  }, []);

  const handleLike = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = await toggleLikeMedia(id);
    if (updated) {
      setCommunityVideos((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
      );
    }
  };

  const handleOpenUpload = () => {
    if (onOpenUploadModal) {
      onOpenUploadModal();
    } else {
      setLocalUploadModalOpen(true);
    }
  };

  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <mark key={index} className="bg-amber-200 text-amber-950 px-1 rounded font-bold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Convert official videos
  const officialFormatted: CombinedVideoItem[] = videos.map((v) => ({
    id: v.id,
    path: v.path,
    title: v.title,
    titleTelugu: v.titleTelugu,
    duration: v.duration,
    category: v.category,
    categoryTelugu: v.categoryTelugu,
    description: v.description,
    descriptionTelugu: v.descriptionTelugu,
    isCommunity: false,
  }));

  // Convert community videos
  const communityFormatted: CombinedVideoItem[] = communityVideos.map((v) => ({
    id: v.id,
    path: v.mediaUrl,
    title: v.title,
    titleTelugu: v.titleTelugu || v.title,
    duration: v.duration || '0:45',
    category: 'Devotee Video',
    categoryTelugu: 'భక్తుల వీడియో',
    description: v.description,
    descriptionTelugu: v.description,
    isCommunity: true,
    uploaderName: v.uploaderName,
    village: v.village,
    likes: v.likes,
    likedByMe: v.likedByMe,
    dateDisplay: v.dateDisplay,
  }));

  const allCombinedVideos = [...communityFormatted, ...officialFormatted];

  const filteredVideos = allCombinedVideos.filter((v) => {
    if (activeTab === 'official' && v.isCommunity) return false;
    if (activeTab === 'community' && !v.isCommunity) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = v.title.toLowerCase().includes(q);
      const matchTitleTe = (v.titleTelugu || '').toLowerCase().includes(q);
      const matchDesc = (v.description || '').toLowerCase().includes(q);
      const matchUploader = (v.uploaderName || '').toLowerCase().includes(q);
      const matchVillage = (v.village || '').toLowerCase().includes(q);
      return matchTitle || matchTitleTe || matchDesc || matchUploader || matchVillage;
    }
    return true;
  });

  return (
    <section id="videos" className="py-8">
      {/* Header and Upload Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold uppercase tracking-wider mb-2 shadow-xs">
            <Video className="w-3.5 h-3.5" />
            <span>{isTelugu ? 'వీడియో దృశ్యాలు' : 'Live Festivities & Video Highlights'}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isTelugu ? 'మహోత్సవ ప్రత్యక్ష వీడియోలు' : 'Festival Video Showcase'}
          </h2>
          <p className="text-slate-600 text-xs md:text-sm mt-1">
            {isTelugu
              ? 'పతాక ఆవిష్కరణ, విద్యుత్ దీపాలంకరణ, రథోత్సవం మరియు భక్తులు పంచుకున్న పవిత్ర వీడియోలు.'
              : 'Watch official festival HD highlights along with video moments uploaded directly by devotees.'}
          </p>
        </div>

        {/* Upload Video Button */}
        <button
          onClick={handleOpenUpload}
          className="px-5 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-200 hover:shadow-lg transition-all flex items-center justify-center gap-2 self-start md:self-auto active:scale-95"
        >
          <Upload className="w-4 h-4" />
          <span>{isTelugu ? 'మీ వీడియోను అప్‌లోడ్ చేయండి' : 'Upload Your Video'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-semibold mb-8">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            activeTab === 'all'
              ? 'bg-white text-slate-900 font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isTelugu ? `అన్ని వీడియోలు (${allCombinedVideos.length})` : `All Videos (${allCombinedVideos.length})`}
        </button>
        <button
          onClick={() => setActiveTab('official')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            activeTab === 'official'
              ? 'bg-blue-600 text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-blue-700'
          }`}
        >
          {isTelugu ? `అధికారిక దృశ్యాలు (${officialFormatted.length})` : `Official Feast (${officialFormatted.length})`}
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'community'
              ? 'bg-red-600 text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-red-700'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {isTelugu
              ? `భక్తుల సమర్పణలు (${communityFormatted.length})`
              : `Devotee Uploads (${communityFormatted.length})`}
          </span>
        </button>
      </div>

      {/* Video Grid */}
      {filteredVideos.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-dashed border-slate-200 bg-white">
          <Video className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">
            {isTelugu ? 'వీడియోలు ఏవీ లభించలేదు' : 'No videos found'}
          </p>
          <button
            onClick={handleOpenUpload}
            className="mt-3 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold"
          >
            {isTelugu ? 'మొదటి వీడియోను అప్‌లోడ్ చేయండి' : 'Upload the first video'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="group rounded-2xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-lg"
            >
              {/* HTML5 Video Box */}
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <video
                  src={video.path}
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveModalVideo(video)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-amber-500 hover:text-black transition-colors"
                  title={isTelugu ? 'థియేటర్ మోడ్' : 'Theater Mode'}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {video.isCommunity && (
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-red-600/90 text-white text-[10px] font-bold shadow-md uppercase tracking-wider backdrop-blur-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{isTelugu ? 'భక్తుల వీడియో' : 'Devotee Video'}</span>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {isTelugu ? video.categoryTelugu : video.category}
                    </span>
                    <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                      <Clock className="w-3 h-3" />
                      <span>{video.duration}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {highlightText(isTelugu ? video.titleTelugu : video.title)}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {highlightText(isTelugu ? video.descriptionTelugu : video.description)}
                  </p>

                  {/* Devotee Info */}
                  {video.isCommunity && video.uploaderName && (
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3 pb-2 border-b border-slate-100">
                      <span className="flex items-center gap-1 font-semibold text-slate-800">
                        <User className="w-3.5 h-3.5 text-red-600" />
                        <span>{video.uploaderName}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{video.village}</span>
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setActiveModalVideo(video)}
                    className="flex-1 py-2 px-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-500 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isTelugu ? 'పూర్తి స్క్రీన్‌లో చూడండి' : 'Open in Cinema Mode'}</span>
                  </button>

                  {video.isCommunity && (
                    <button
                      onClick={(e) => handleLike(e, video.id)}
                      className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                        video.likedByMe
                          ? 'bg-rose-50 border-rose-300 text-rose-600'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-rose-300'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${video.likedByMe ? 'fill-current text-rose-600' : ''}`}
                      />
                      <span>{video.likes || 0}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cinema Mode Modal */}
      {activeModalVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveModalVideo(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 text-white hover:bg-red-600 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video bg-black">
              <video
                src={activeModalVideo.path}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  {isTelugu ? activeModalVideo.categoryTelugu : activeModalVideo.category}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {activeModalVideo.duration}
                </span>
                {activeModalVideo.isCommunity && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                    {isTelugu ? 'భక్తుల సమర్పణ' : 'Devotee Video'}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {isTelugu ? activeModalVideo.titleTelugu : activeModalVideo.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isTelugu ? activeModalVideo.descriptionTelugu : activeModalVideo.description}
              </p>

              {activeModalVideo.isCommunity && activeModalVideo.uploaderName && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-500">
                  <span>
                    {isTelugu ? 'సమర్పించినవారు:' : 'Uploaded by:'}{' '}
                    <strong className="text-slate-800">{activeModalVideo.uploaderName}</strong>
                  </span>
                  <span>•</span>
                  <span>{activeModalVideo.village}</span>
                  {activeModalVideo.dateDisplay && (
                    <>
                      <span>•</span>
                      <span>{activeModalVideo.dateDisplay}</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Standalone Upload Modal */}
      <MediaUploadModal
        isOpen={localUploadModalOpen}
        onClose={() => setLocalUploadModalOpen(false)}
        isTelugu={isTelugu}
        defaultType="video"
      />
    </section>
  );
};
