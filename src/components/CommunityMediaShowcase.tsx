import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Video,
  Heart,
  Trash2,
  Play,
  Maximize2,
  X,
  Sparkles,
  User,
  MapPin,
  Calendar,
  Filter,
  PlusCircle,
  Clock,
  Share2,
  Search,
} from 'lucide-react';
import { UserUploadedMedia, MediaType, MediaCategory } from '../types/media';
import {
  getAllUserMedia,
  toggleLikeMedia,
  deleteUserMedia,
  CATEGORY_LABELS,
} from '../utils/mediaStorage';

interface CommunityMediaShowcaseProps {
  isTelugu: boolean;
  searchQuery?: string;
  onOpenUploadModal: (type?: MediaType) => void;
  filterType?: MediaType | 'all';
  limit?: number;
  showHeader?: boolean;
}

export const CommunityMediaShowcase: React.FC<CommunityMediaShowcaseProps> = ({
  isTelugu,
  searchQuery: externalSearchQuery = '',
  onOpenUploadModal,
  filterType: initialFilterType = 'all',
  limit,
  showHeader = true,
}) => {
  const [mediaList, setMediaList] = useState<UserUploadedMedia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<MediaType | 'all'>(initialFilterType);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>('');

  // Modals for viewing
  const [activePhoto, setActivePhoto] = useState<UserUploadedMedia | null>(null);
  const [activeVideo, setActiveVideo] = useState<UserUploadedMedia | null>(null);

  const fetchMedia = async () => {
    try {
      const items = await getAllUserMedia();
      setMediaList(items);
    } catch (err) {
      console.error('Failed to load user media:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();

    const handleUpdate = () => {
      fetchMedia();
    };

    window.addEventListener('vemanda_media_updated', handleUpdate);
    return () => window.removeEventListener('vemanda_media_updated', handleUpdate);
  }, []);

  // Update selectedType if prop changes
  useEffect(() => {
    setSelectedType(initialFilterType);
  }, [initialFilterType]);

  const handleLike = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = await toggleLikeMedia(id);
    if (updated) {
      setMediaList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
      );
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    const confirmMsg = isTelugu
      ? `మీరు ఈ ఫైల్‌ను "${title}" తొలగించాలనుకుంటున్నారా?`
      : `Are you sure you want to delete "${title}"?`;
    if (window.confirm(confirmMsg)) {
      await deleteUserMedia(id);
      setMediaList((prev) => prev.filter((item) => item.id !== id));
      if (activePhoto?.id === id) setActivePhoto(null);
      if (activeVideo?.id === id) setActiveVideo(null);
    }
  };

  const activeSearch = (externalSearchQuery || localSearch).trim().toLowerCase();

  const filteredItems = mediaList.filter((item) => {
    // Type filter
    if (selectedType !== 'all' && item.type !== selectedType) return false;
    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    // Search filter
    if (activeSearch) {
      const matchTitle = item.title.toLowerCase().includes(activeSearch);
      const matchTitleTe = (item.titleTelugu || '').toLowerCase().includes(activeSearch);
      const matchDesc = (item.description || '').toLowerCase().includes(activeSearch);
      const matchUploader = item.uploaderName.toLowerCase().includes(activeSearch);
      const matchVillage = item.village.toLowerCase().includes(activeSearch);
      return matchTitle || matchTitleTe || matchDesc || matchUploader || matchVillage;
    }
    return true;
  });

  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const photoCount = mediaList.filter((i) => i.type === 'image').length;
  const videoCount = mediaList.filter((i) => i.type === 'video').length;

  return (
    <section className="space-y-6">
      {/* Header section (if enabled) */}
      {showHeader && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-200/80 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>
                {isTelugu
                  ? `భక్తుల సమర్పణలు (${photoCount} ఫోటోలు, ${videoCount} వీడియోలు)`
                  : `Devotee Community Uploads (${photoCount} Photos, ${videoCount} Videos)`}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {isTelugu
                ? 'భక్తులు పంచుకున్న ఫోటోలు & వీడియోల వేదిక'
                : 'Devotee Festival Gallery & Live Captures'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {isTelugu
                ? 'వేమండ జపమాల మాత పుణ్యక్షేత్రానికి విచ్చేసిన భక్తులు స్వయంగా చిత్రీకరించిన పవిత్ర క్షణాలు, ఊరేగింపు మరియు పూజా దృశ్యాలు.'
                : 'High-definition festival moments, sacred statues, hymns, and chariot processions captured and uploaded by pilgrims.'}
            </p>
          </div>

          {/* Upload Call-To-Action Button */}
          <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
            <button
              onClick={() => onOpenUploadModal('image')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-200 hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95"
            >
              <ImageIcon className="w-4 h-4" />
              <span>{isTelugu ? '+ ఫోటో అప్‌లోడ్' : '+ Upload Photo'}</span>
            </button>
            <button
              onClick={() => onOpenUploadModal('video')}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-200 hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Video className="w-4 h-4" />
              <span>{isTelugu ? '+ వీడియో అప్‌లోడ్' : '+ Upload Video'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Type Switcher Pills */}
        <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              selectedType === 'all'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isTelugu ? `అన్నీ (${mediaList.length})` : `All (${mediaList.length})`}
          </button>
          <button
            onClick={() => setSelectedType('image')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              selectedType === 'image'
                ? 'bg-amber-500 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-amber-800'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{isTelugu ? `ఫోటోలు (${photoCount})` : `Photos (${photoCount})`}</span>
          </button>
          <button
            onClick={() => setSelectedType('video')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              selectedType === 'video'
                ? 'bg-red-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-red-800'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>{isTelugu ? `వీడియోలు (${videoCount})` : `Videos (${videoCount})`}</span>
          </button>
        </div>

        {/* Category Filter Dropdown */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-3 pr-8 py-1.5 text-xs font-medium rounded-xl border border-slate-300 bg-white text-slate-700 focus:outline-none focus:border-amber-500 appearance-none shadow-2xs"
            >
              <option value="all">{isTelugu ? 'అన్ని విభాగాలు' : 'All Categories'}</option>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {isTelugu ? label.te : label.en}
                </option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2 pointer-events-none" />
          </div>

          {!externalSearchQuery && (
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2 pointer-events-none" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder={isTelugu ? 'వెతకండి...' : 'Filter media...'}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-2xs"
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Grid View */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 text-xs">
          {isTelugu ? 'మీడియా వివరాలు లోడ్ అవుతున్నాయి...' : 'Loading devotee media...'}
        </div>
      ) : displayItems.length === 0 ? (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">
            {isTelugu ? 'చిత్రాలు లేదా వీడియోలు ఏవీ లభించలేదు' : 'No Community Media Found'}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {isTelugu
              ? 'మొదటి ఫోటో లేదా వీడియోను మీరే సమర్పించండి! ఉత్సవ దృశ్యాలను ఇతర భక్తులతో పంచుకోండి.'
              : 'Be the first devotee to upload a festival photo or video and share sacred memories.'}
          </p>
          <button
            onClick={() => onOpenUploadModal('image')}
            className="mt-4 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-200 transition-all inline-flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isTelugu ? 'ఇప్పుడే అప్‌లోడ్ చేయండి' : 'Upload Now'}</span>
          </button>
        </div>
      ) : (
        /* Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-amber-400 transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-lg relative"
            >
              {/* Media Thumbnail Container */}
              <div
                className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer"
                onClick={() => {
                  if (item.type === 'image') setActivePhoto(item);
                  else setActiveVideo(item);
                }}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={item.mediaUrl}
                    className="w-full h-full object-cover"
                    preload="metadata"
                  />
                )}

                {/* Video Play Overlay */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-slate-900/35 flex items-center justify-center group-hover:bg-slate-900/20 transition-all">
                    <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-600 transition-all">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>
                  </div>
                )}

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-md shadow-xs ${
                      item.type === 'image'
                        ? 'bg-amber-500/90 text-white'
                        : 'bg-red-600/90 text-white'
                    }`}
                  >
                    {item.type === 'image'
                      ? isTelugu
                        ? '📸 ఫోటో'
                        : '📸 Photo'
                      : isTelugu
                      ? '🎥 వీడియో'
                      : '🎥 Video'}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-amber-200 backdrop-blur-md">
                    {item.categoryTelugu || item.category}
                  </span>
                </div>

                {/* Duration or Size Badge */}
                <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1">
                  {item.duration && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/75 text-white flex items-center gap-1 backdrop-blur-xs">
                      <Clock className="w-3 h-3 text-slate-300" />
                      {item.duration}
                    </span>
                  )}
                  {item.fileSize && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-black/60 text-slate-300 backdrop-blur-xs">
                      {item.fileSize}
                    </span>
                  )}
                </div>

                {/* Expand / Theater trigger on hover */}
                <button
                  type="button"
                  className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-amber-500 hover:text-black"
                  title={isTelugu ? 'పెద్దదిగా చూడండి' : 'Full Screen'}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card Details */}
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Devotee Info & Footer Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-1.5 truncate">
                      <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 text-[11px] font-bold">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-slate-800 truncate">
                        {item.uploaderName}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 flex-shrink-0">
                      {item.dateDisplay}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span className="truncate max-w-[120px]">{item.village}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Like button */}
                      <button
                        onClick={(e) => handleLike(e, item.id)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
                          item.likedByMe
                            ? 'bg-rose-50 border-rose-200 text-rose-600 font-bold'
                            : 'bg-white border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200'
                        }`}
                        title={isTelugu ? 'భక్తితో లైక్ చేయండి' : 'Devotional Amen / Like'}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            item.likedByMe ? 'fill-current text-rose-600' : ''
                          }`}
                        />
                        <span>{item.likes || 0}</span>
                      </button>

                      {/* Delete button (for user-submitted community items) */}
                      <button
                        onClick={(e) => handleDelete(e, item.id, item.title)}
                        className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title={isTelugu ? 'తొలగించు' : 'Delete upload'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Photo Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="px-5 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-2 truncate">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white uppercase">
                  {isTelugu ? 'భక్తుల సమర్పణ' : 'Devotee Photo'}
                </span>
                <h3 className="text-sm font-bold truncate">{activePhoto.title}</h3>
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Photo View */}
            <div className="flex-1 overflow-hidden flex items-center justify-center bg-black p-2">
              <img
                src={activePhoto.mediaUrl}
                alt={activePhoto.title}
                className="max-h-[65vh] max-w-full object-contain rounded-lg"
              />
            </div>

            {/* Details Footer */}
            <div className="px-5 py-3.5 bg-slate-900 text-white text-xs border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-slate-300 text-xs">{activePhoto.description}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                  <span>
                    {isTelugu ? 'సమర్పించినవారు:' : 'By:'}{' '}
                    <strong className="text-white">{activePhoto.uploaderName}</strong>
                  </span>
                  <span>•</span>
                  <span>{activePhoto.village}</span>
                  <span>•</span>
                  <span>{activePhoto.dateDisplay}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleLike(e, activePhoto.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-xs ${
                    activePhoto.likedByMe
                      ? 'bg-rose-600 text-white border-rose-500 font-bold'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${activePhoto.likedByMe ? 'fill-current' : ''}`}
                  />
                  <span>{activePhoto.likes || 0}</span>
                </button>
                <a
                  href={activePhoto.mediaUrl}
                  download={`vemanda-${activePhoto.id}.jpg`}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors"
                >
                  {isTelugu ? 'డౌన్‌లోడ్' : 'Download'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Cinema Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="px-5 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-2 truncate">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600 text-white uppercase">
                  {isTelugu ? 'భక్తుల వీడియో' : 'Devotee Video'}
                </span>
                <h3 className="text-sm font-bold truncate">{activeVideo.title}</h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-video bg-black flex items-center justify-center">
              <video
                src={activeVideo.mediaUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            {/* Details Footer */}
            <div className="px-5 py-3.5 bg-slate-900 text-white text-xs border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-slate-300 text-xs">{activeVideo.description}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                  <span>
                    {isTelugu ? 'సమర్పించినవారు:' : 'By:'}{' '}
                    <strong className="text-white">{activeVideo.uploaderName}</strong>
                  </span>
                  <span>•</span>
                  <span>{activeVideo.village}</span>
                  <span>•</span>
                  <span>{activeVideo.dateDisplay}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleLike(e, activeVideo.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-xs ${
                    activeVideo.likedByMe
                      ? 'bg-rose-600 text-white border-rose-500 font-bold'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${activeVideo.likedByMe ? 'fill-current' : ''}`}
                  />
                  <span>{activeVideo.likes || 0}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
