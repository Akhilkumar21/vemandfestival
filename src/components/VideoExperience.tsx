import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VideoItem } from '../types/festival';
import { UserUploadedMedia } from '../types/media';
import { getUserVideos, toggleLikeMedia, deleteUserMedia } from '../utils/mediaStorage';
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
  ArrowRight,
  Image as ImageIcon,
  Film,
  Trash2,
  RectangleHorizontal,
  RectangleVertical,
  Square,
} from 'lucide-react';

interface VideoExperienceProps {
  videos: VideoItem[];
  isTelugu: boolean;
  searchQuery: string;
  onOpenUploadModal?: () => void;
  limit?: number;
  showViewAllCard?: boolean;
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
  limit,
  showViewAllCard = true,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'official' | 'community'>('all');
  const [activeModalVideo, setActiveModalVideo] = useState<CombinedVideoItem | null>(null);
  const [communityVideos, setCommunityVideos] = useState<UserUploadedMedia[]>([]);
  const [localUploadModalOpen, setLocalUploadModalOpen] = useState<boolean>(false);
  const [mediaShape, setMediaShape] = useState<'rectangle' | 'square'>(() => {
    const saved = localStorage.getItem('vemanda_video_shape');
    return saved === 'square' || saved === 'rectangle' ? saved : 'square';
  });

  const handleShapeChange = (shape: 'rectangle' | 'square') => {
    setMediaShape(shape);
    localStorage.setItem('vemanda_video_shape', shape);
  };

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

  const handleDelete = async (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    const confirmMsg = isTelugu
      ? `మీరు ఈ వీడియోను "${title}" తొలగించాలనుకుంటున్నారా?`
      : `Are you sure you want to delete "${title}"?`;
    if (window.confirm(confirmMsg)) {
      await deleteUserMedia(id);
      setCommunityVideos((prev) => prev.filter((item) => item.id !== id));
      if (activeModalVideo?.id === id) setActiveModalVideo(null);
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

  // 6 Items Logic: When limit is 6, show 5 items and 6th is "Show More" card
  const isLimited = limit === 6 && showViewAllCard && filteredVideos.length > 5;
  const displayVideos = isLimited ? filteredVideos.slice(0, 5) : limit ? filteredVideos.slice(0, limit) : filteredVideos;
  const remainingCount = Math.max(0, filteredVideos.length - 5);

  return (
    <section id="videos" className="py-6">
      {/* Header and Upload Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
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
              : 'Watch high-definition feast highlights along with video moments uploaded directly by devotees.'}
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

      {/* Category Tabs & Media Shape Toggle Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
        <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-semibold">
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

        {/* Shape Switcher: Photo Size Portrait Rectangle (3:4) vs Square (1:1) */}
        <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200 shadow-2xs self-start sm:self-auto flex-shrink-0">
          <span className="text-[10px] font-bold text-slate-500 uppercase px-1.5 hidden sm:inline">
            {isTelugu ? 'ఆకారం:' : 'Shape:'}
          </span>
          <button
            type="button"
            onClick={() => handleShapeChange('rectangle')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mediaShape === 'rectangle'
                ? 'bg-white text-red-800 shadow-xs border border-red-300 font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title={isTelugu ? 'ఫోటో సైజు - ఆయతాకారం (Photo Size Rectangle 3:4)' : 'Photo Size Rectangle (3:4)'}
          >
            <RectangleVertical className="w-3.5 h-3.5 text-red-600" />
            <span>{isTelugu ? 'ఫోటో సైజు (ఆయతాకారం)' : 'Photo Size (Rectangle)'}</span>
          </button>
          <button
            type="button"
            onClick={() => handleShapeChange('square')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mediaShape === 'square'
                ? 'bg-white text-red-800 shadow-xs border border-red-300 font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title={isTelugu ? 'చతురస్రాకారం (Square Shape 1:1)' : 'Square Shape (1:1)'}
          >
            <Square className="w-3.5 h-3.5 text-red-600" />
            <span>{isTelugu ? 'చతురస్రం (Square)' : 'Square (1:1)'}</span>
          </button>
        </div>
      </div>

      {/* Professional 3-Per-Row Grid (3 columns on desktop, perfectly set uniform lengths) */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Cards 1 to 5 (or all if not limited) */}
          {displayVideos.map((video) => {
            const isSearchMatched = Boolean(
              searchQuery.trim() &&
                (video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  video.titleTelugu.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (video.uploaderName && video.uploaderName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                  (video.village && video.village.toLowerCase().includes(searchQuery.toLowerCase())))
            );

            return (
              <div
                key={video.id}
                className={`group flex flex-col h-full rounded-2xl bg-white border transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
                  isSearchMatched
                    ? 'border-red-500 ring-2 ring-red-400/80 shadow-md shadow-red-100 scale-[1.01]'
                    : 'border-slate-200/90 hover:border-red-400 shadow-2xs hover:shadow-lg'
                }`}
              >
                {/* HTML5 Video Box: Portrait Photo Rectangle (3:4) vs Square (1:1) - Zero Cropping, Pure White Matting */}
                <div
                  className={`relative ${
                    mediaShape === 'square' ? 'aspect-square' : 'aspect-[3/4]'
                  } w-full bg-white flex items-center justify-center overflow-hidden transition-all duration-300 border-b border-slate-100`}
                >
                  <video
                    src={video.path}
                    controls
                    preload="metadata"
                    className="w-full h-full object-contain p-1"
                  />

                  <button
                    onClick={() => setActiveModalVideo(video)}
                    className="absolute top-2.5 right-2.5 p-1 rounded-full bg-white/90 text-slate-700 hover:bg-amber-500 hover:text-white transition-colors shadow-sm"
                    title={isTelugu ? 'థియేటర్ మోడ్' : 'Cinema Mode'}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Category & Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                    {video.isCommunity ? (
                      <span className="px-2 py-0.5 rounded-full bg-red-600/95 text-white text-[9px] font-bold shadow-md uppercase tracking-wider backdrop-blur-xs flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>{isTelugu ? 'భక్తుల వీడియో' : 'Devotee Video'}</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-blue-600/90 text-white text-[9px] font-bold shadow-md uppercase tracking-wider backdrop-blur-xs">
                        {isTelugu ? video.categoryTelugu : video.category}
                      </span>
                    )}

                    {isSearchMatched && (
                      <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[8px] font-extrabold uppercase tracking-wider shadow-sm animate-pulse">
                        {isTelugu ? 'శోధన మ్యాచ్' : 'Match'}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 text-slate-800 text-[10px] font-bold bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-2xs border border-slate-200">
                    <Clock className="w-2.5 h-2.5 text-blue-600" />
                    <span>{video.duration}</span>
                  </div>
                </div>

                {/* Card Details: Compact uniform height and text matching photo cards */}
                <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-1 h-[20px] group-hover:text-red-700 transition-colors">
                      {highlightText(isTelugu ? video.titleTelugu : video.title)}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1 h-[18px] leading-snug mt-1">
                      {highlightText(isTelugu ? video.descriptionTelugu : video.description)}
                    </p>
                  </div>

                  {/* Footer Actions: Sits at identical compact height */}
                  <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    {video.isCommunity && video.uploaderName ? (
                      <div className="flex items-center gap-1 truncate max-w-[140px]">
                        <User className="w-3 h-3 text-red-600 flex-shrink-0" />
                        <span className="font-medium text-slate-700 truncate">
                          {highlightText(video.uploaderName)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium truncate">
                        {isTelugu ? 'ప్రత్యక్ష HD క్లిప్' : 'Official HD Clip'}
                      </span>
                    )}

                    <div className="flex items-center gap-1.5">
                      {video.isCommunity && (
                        <>
                          <button
                            onClick={(e) => handleLike(e, video.id)}
                            className={`flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] transition-all ${
                              video.likedByMe
                                ? 'bg-rose-50 border-rose-300 text-rose-600 font-bold'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-rose-300'
                            }`}
                            title={isTelugu ? 'లైక్ చేయండి' : 'Like'}
                          >
                            <Heart
                              className={`w-3 h-3 ${video.likedByMe ? 'fill-current text-rose-600' : ''}`}
                            />
                            <span>{video.likes || 0}</span>
                          </button>

                          {/* Delete Video Button */}
                          <button
                            onClick={(e) => handleDelete(e, video.id, video.title)}
                            className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title={isTelugu ? 'తొలగించు' : 'Delete video'}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => setActiveModalVideo(video)}
                        className="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-600 text-red-800 hover:text-white font-bold text-[10px] transition-colors flex items-center gap-1 shadow-2xs"
                      >
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>{isTelugu ? 'ప్లే' : 'Play'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Dedicated "Show More" Navigational Card (Light & Vibrant Festive Theme) */}
          {isLimited && (
            <div className="group flex flex-col h-full rounded-2xl overflow-hidden border-2 border-red-200 bg-gradient-to-br from-red-50 via-white to-rose-50 relative shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              {/* Center Content */}
              <div className="relative z-10 p-4 sm:p-5 flex flex-col items-center justify-between h-full text-center">
                <div className="w-full flex justify-between items-center text-[11px]">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-100 border border-red-200 text-red-800 font-extrabold uppercase tracking-wider text-[9px]">
                    {isTelugu ? 'వీడియోల వేదిక' : 'Video Center'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-extrabold text-[10px] shadow-2xs">
                    +{remainingCount} {isTelugu ? 'మరిన్ని' : 'More'}
                  </span>
                </div>

                <div className="my-auto py-2">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center mx-auto mb-2 shadow-md shadow-red-200 group-hover:scale-110 transition-transform">
                    <Film className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                    {isTelugu
                      ? `మరో ${remainingCount} ప్రత్యక్ష వీడియోలు ఉన్నాయి`
                      : `+${remainingCount} More Festival Videos`}
                  </h3>
                  <p className="text-[11px] text-slate-600 mt-1 max-w-xs mx-auto line-clamp-1 leading-snug">
                    {isTelugu
                      ? 'ధ్వజస్తంభ దీపాలంకరణ, పల్లకీ ఊరేగింపు మరియు సంకీర్తనలు.'
                      : 'Watch all high-definition footage including chariot celebrations.'}
                  </p>
                </div>

                {/* Primary Show More Action Button */}
                <div className="w-full space-y-1.5 pt-1">
                  <Link
                    to="/videos"
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-xs shadow-md shadow-red-200 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <span>{isTelugu ? 'మొత్తం వీడియోలు (Show More)' : 'Show More Videos →'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <Link
                    to="/gallery"
                    className="w-full py-1.5 px-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-800 font-semibold text-[10px] border border-red-200 transition-all flex items-center justify-center gap-1"
                  >
                    <ImageIcon className="w-3 h-3 text-emerald-600" />
                    <span>{isTelugu ? 'చిత్ర మాలికను చూడండి' : 'Sacred Photo Gallery'}</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cinema Mode Modal */}
      {activeModalVideo && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-white border-2 border-red-200 rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveModalVideo(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 text-slate-700 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video bg-white flex items-center justify-center">
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

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                    {isTelugu ? activeModalVideo.titleTelugu : activeModalVideo.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {isTelugu ? activeModalVideo.descriptionTelugu : activeModalVideo.description}
                  </p>
                </div>

                {/* Modal Delete Video Option */}
                {activeModalVideo.isCommunity && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={(e) => handleDelete(e, activeModalVideo.id, activeModalVideo.title)}
                      className="px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-colors flex items-center gap-1.5"
                      title={isTelugu ? 'తొలగించు' : 'Delete video'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{isTelugu ? 'తొలగించు' : 'Delete'}</span>
                    </button>
                  </div>
                )}
              </div>

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

      {/* Local Upload Modal */}
      <MediaUploadModal
        isOpen={localUploadModalOpen}
        onClose={() => setLocalUploadModalOpen(false)}
        isTelugu={isTelugu}
        defaultType="video"
      />
    </section>
  );
};
