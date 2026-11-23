import React, { useState, useEffect } from 'react';
import { GalleryItem } from '../types/festival';
import { UserUploadedMedia } from '../types/media';
import { getUserPhotos, toggleLikeMedia } from '../utils/mediaStorage';
import { MediaUploadModal } from './MediaUploadModal';
import {
  Image,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Sparkles,
  Upload,
  Heart,
  User,
  MapPin,
  Download,
} from 'lucide-react';

interface GalleryLightboxProps {
  gallery: GalleryItem[];
  isTelugu: boolean;
  searchQuery: string;
  onOpenUploadModal?: () => void;
}

interface CombinedPhotoItem {
  id: string;
  src: string;
  title: string;
  titleTelugu: string;
  category: string;
  categoryTelugu: string;
  caption: string;
  isCommunity?: boolean;
  uploaderName?: string;
  village?: string;
  likes?: number;
  likedByMe?: boolean;
  dateDisplay?: string;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  gallery,
  isTelugu,
  searchQuery,
  onOpenUploadModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [communityPhotos, setCommunityPhotos] = useState<UserUploadedMedia[]>([]);
  const [localUploadModalOpen, setLocalUploadModalOpen] = useState<boolean>(false);

  const fetchCommunityPhotos = async () => {
    try {
      const photos = await getUserPhotos();
      setCommunityPhotos(photos);
    } catch (err) {
      console.error('Failed to load user photos in gallery:', err);
    }
  };

  useEffect(() => {
    fetchCommunityPhotos();

    const handleUpdate = () => {
      fetchCommunityPhotos();
    };

    window.addEventListener('vemanda_media_updated', handleUpdate);
    return () => window.removeEventListener('vemanda_media_updated', handleUpdate);
  }, []);

  const handleLike = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = await toggleLikeMedia(id);
    if (updated) {
      setCommunityPhotos((prev) =>
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

  // Convert official items to unified format
  const officialFormatted: CombinedPhotoItem[] = gallery.map((item) => ({
    id: item.id,
    src: item.src,
    title: item.title,
    titleTelugu: item.titleTelugu,
    category: item.category,
    categoryTelugu: item.categoryTelugu,
    caption: item.caption,
    isCommunity: false,
  }));

  // Convert community items to unified format
  const communityFormatted: CombinedPhotoItem[] = communityPhotos.map((item) => ({
    id: item.id,
    src: item.mediaUrl,
    title: item.title,
    titleTelugu: item.titleTelugu || item.title,
    category: 'community',
    categoryTelugu: 'భక్తుల సమర్పణలు',
    caption: item.description,
    isCommunity: true,
    uploaderName: item.uploaderName,
    village: item.village,
    likes: item.likes,
    likedByMe: item.likedByMe,
    dateDisplay: item.dateDisplay,
  }));

  const combinedItems = [...communityFormatted, ...officialFormatted];

  const categories = [
    { key: 'all', en: `All Photos (${combinedItems.length})`, te: `అన్ని చిత్రాలు (${combinedItems.length})` },
    {
      key: 'community',
      en: `Devotee Uploads (${communityFormatted.length})`,
      te: `భక్తుల సమర్పణలు (${communityFormatted.length})`,
      isDevotee: true,
    },
    { key: 'statues', en: 'Sacred Statues', te: 'పవిత్ర స్వరూపాలు' },
    { key: 'flags', en: 'Flag Mast & Lighting', te: 'ధ్వజస్తంభం & దీపాలంకరణ' },
    { key: 'procession', en: 'Procession & Theru', te: 'తేరు & రథోత్సవం' },
    { key: 'forms', en: 'Official Brochures', te: 'ఆహ్వాన పత్రికలు' },
    { key: 'media', en: 'TV & News Coverage', te: 'మీడియా ప్రసారాలు' },
  ];

  const filteredItems = combinedItems.filter((item) => {
    // Category filter
    if (activeCategory === 'community' && !item.isCommunity) return false;
    if (activeCategory !== 'all' && activeCategory !== 'community' && item.category !== activeCategory) {
      return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchTitleTe = (item.titleTelugu || '').toLowerCase().includes(q);
      const matchCaption = (item.caption || '').toLowerCase().includes(q);
      const matchUploader = (item.uploaderName || '').toLowerCase().includes(q);
      const matchVillage = (item.village || '').toLowerCase().includes(q);
      return matchTitle || matchTitleTe || matchCaption || matchUploader || matchVillage;
    }

    return true;
  });

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setCurrentIndex(null);
  };

  const showNext = () => {
    if (currentIndex === null || filteredItems.length === 0) return;
    setCurrentIndex((currentIndex + 1) % filteredItems.length);
  };

  const showPrev = () => {
    if (currentIndex === null || filteredItems.length === 0) return;
    setCurrentIndex((currentIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, filteredItems.length]);

  const currentItem = currentIndex !== null && filteredItems[currentIndex] ? filteredItems[currentIndex] : null;

  return (
    <section id="gallery" className="py-8">
      {/* Header and Upload Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2 shadow-xs">
            <Image className="w-3.5 h-3.5" />
            <span>{isTelugu ? 'పవిత్ర ఛాయాచిత్రాలు' : 'Sacred Photo Gallery'}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isTelugu ? 'క్షేత్ర శోభ & ఉత్సవ చిత్ర మాలిక' : 'Shrine & Festivity Gallery'}
          </h2>
          <p className="text-slate-600 text-xs md:text-sm mt-1">
            {isTelugu
              ? 'జపమాల మాత స్వరూపం, ధ్వజస్తంభం, తేరు ప్రదక్షిణ, మరియు భక్తులు పంపిన చిత్రాలు.'
              : 'Explore official high-res photographs and real-time photos uploaded by devotees.'}
          </p>
        </div>

        {/* Upload Photo Button */}
        <button
          onClick={handleOpenUpload}
          className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-200 hover:shadow-lg transition-all flex items-center justify-center gap-2 self-start md:self-auto active:scale-95"
        >
          <Upload className="w-4 h-4" />
          <span>{isTelugu ? 'మీ ఫోటోను అప్‌లోడ్ చేయండి' : 'Upload Your Photo'}</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 ${
              activeCategory === cat.key
                ? cat.isDevotee
                  ? 'bg-amber-600 text-white shadow-amber-200 font-bold'
                  : 'bg-emerald-600 text-white shadow-emerald-200 font-bold'
                : cat.isDevotee
                ? 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-400'
            }`}
          >
            {cat.isDevotee && <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
            <span>{isTelugu ? cat.te : cat.en}</span>
          </button>
        ))}
      </div>

      {/* Image Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-dashed border-slate-200 bg-white">
          <Image className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">
            {isTelugu ? 'ఈ విభాగంలో చిత్రాలు ఏవీ లభించలేదు' : 'No photos found in this category'}
          </p>
          <button
            onClick={handleOpenUpload}
            className="mt-3 px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold"
          >
            {isTelugu ? 'మొదటి ఫోటోను అప్‌లోడ్ చేయండి' : 'Upload the first photo'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-[4/3] cursor-pointer hover:border-amber-500 transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-lg"
            >
              <img
                src={item.src}
                alt={`${isTelugu ? item.titleTelugu : item.title} - వేమండ జపమాల మాత క్షేత్రం | Vemanda Festival`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />

              {/* Devotee Badge on Thumbnail */}
              {item.isCommunity && (
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-amber-500/95 text-white text-[10px] font-bold shadow-md uppercase tracking-wider backdrop-blur-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{isTelugu ? 'భక్తుల సమర్పణ' : 'Devotee Photo'}</span>
                </div>
              )}

              {/* Bottom Info Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider mb-1">
                  {isTelugu ? item.categoryTelugu : item.category}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug">
                  {isTelugu ? item.titleTelugu : item.title}
                </h3>
                {item.isCommunity && item.uploaderName && (
                  <p className="text-[11px] text-amber-100 mt-1 flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{item.uploaderName}</span>
                    <span>•</span>
                    <span>{item.village}</span>
                  </p>
                )}
              </div>

              {/* Zoom trigger on top right */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                <ZoomIn className="w-4 h-4 text-amber-600" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {currentIndex !== null && currentItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/90 text-slate-800 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={showPrev}
            className="absolute left-4 z-20 w-12 h-12 rounded-full bg-white/90 text-slate-800 hover:bg-amber-500 hover:text-white flex items-center justify-center transition-colors shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={showNext}
            className="absolute right-4 z-20 w-12 h-12 rounded-full bg-white/90 text-slate-800 hover:bg-amber-500 hover:text-white flex items-center justify-center transition-colors shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl max-h-[90vh] flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex-grow flex items-center justify-center bg-slate-950 max-h-[70vh] p-2">
              <img
                src={currentItem.src}
                alt={`${isTelugu ? currentItem.titleTelugu : currentItem.title} - వేమండ జపమాల మాత | Vemanda Festival`}
                className="max-w-full max-h-[68vh] object-contain rounded-lg"
                decoding="async"
              />
            </div>

            <div className="p-6 bg-white border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {currentItem.isCommunity ? (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 uppercase tracking-wider">
                      {isTelugu ? 'భక్తుల సమర్పణ' : 'Devotee Upload'}
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      {isTelugu ? currentItem.categoryTelugu : currentItem.category}
                    </span>
                  )}
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">
                    {currentIndex + 1} / {filteredItems.length}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                  {isTelugu ? currentItem.titleTelugu : currentItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">{currentItem.caption}</p>
                {currentItem.isCommunity && currentItem.uploaderName && (
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                    <span className="flex items-center gap-1 font-semibold text-slate-800">
                      <User className="w-3.5 h-3.5 text-amber-600" />
                      <span>{currentItem.uploaderName}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{currentItem.village}</span>
                    </span>
                    {currentItem.dateDisplay && (
                      <>
                        <span>•</span>
                        <span>{currentItem.dateDisplay}</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {currentItem.isCommunity && currentItem.id && (
                  <button
                    onClick={(e) => handleLike(e, currentItem.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                      currentItem.likedByMe
                        ? 'bg-rose-50 border-rose-300 text-rose-600'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-rose-300'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${currentItem.likedByMe ? 'fill-current text-rose-600' : ''}`}
                    />
                    <span>{currentItem.likes || 0}</span>
                  </button>
                )}

                <a
                  href={currentItem.src}
                  download={`vemanda-photo-${currentItem.id}.jpg`}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isTelugu ? 'డౌన్‌లోడ్' : 'Download'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Local Upload Modal for standalone usage */}
      <MediaUploadModal
        isOpen={localUploadModalOpen}
        onClose={() => setLocalUploadModalOpen(false)}
        isTelugu={isTelugu}
        defaultType="image"
      />
    </section>
  );
};
