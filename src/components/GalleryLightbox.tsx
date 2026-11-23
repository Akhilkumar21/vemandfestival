import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GalleryItem } from '../types/festival';
import { UserUploadedMedia } from '../types/media';
import { getUserPhotos, toggleLikeMedia, deleteUserMedia } from '../utils/mediaStorage';
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
  ArrowRight,
  Video,
  Layers,
  Trash2,
  RectangleHorizontal,
  RectangleVertical,
  Square,
} from 'lucide-react';

interface GalleryLightboxProps {
  gallery: GalleryItem[];
  isTelugu: boolean;
  searchQuery: string;
  onOpenUploadModal?: () => void;
  limit?: number;
  showViewAllCard?: boolean;
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
  limit,
  showViewAllCard = true,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [communityPhotos, setCommunityPhotos] = useState<UserUploadedMedia[]>([]);
  const [localUploadModalOpen, setLocalUploadModalOpen] = useState<boolean>(false);
  const [mediaShape, setMediaShape] = useState<'rectangle' | 'square'>(() => {
    const saved = localStorage.getItem('vemanda_photo_shape');
    return saved === 'square' || saved === 'rectangle' ? saved : 'rectangle';
  });

  const handleShapeChange = (shape: 'rectangle' | 'square') => {
    setMediaShape(shape);
    localStorage.setItem('vemanda_photo_shape', shape);
  };

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

  const handleDelete = async (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    const confirmMsg = isTelugu
      ? `మీరు ఈ ఫోటోను "${title}" తొలగించాలనుకుంటున్నారా?`
      : `Are you sure you want to delete "${title}"?`;
    if (window.confirm(confirmMsg)) {
      await deleteUserMedia(id);
      setCommunityPhotos((prev) => prev.filter((item) => item.id !== id));
      if (currentIndex !== null) closeLightbox();
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

  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <mark key={index} className="bg-amber-300 text-amber-950 px-1 rounded font-bold shadow-2xs">
          {part}
        </mark>
      ) : (
        part
      )
    );
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

  // 6 Items Logic: When limit is 6, show 5 items and 6th is "Show More" card
  const isLimited = limit === 6 && showViewAllCard && filteredItems.length > 5;
  const displayItems = isLimited ? filteredItems.slice(0, 5) : limit ? filteredItems.slice(0, limit) : filteredItems;
  const remainingCount = Math.max(0, filteredItems.length - 5);
  const teaserBackground = filteredItems[5]?.src || filteredItems[0]?.src || '';

  return (
    <section id="gallery" className="py-6">
      {/* Header and Upload Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
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
              ? 'జపమాల మాత స్వరూపం, ధ్వజస్తంభం, తేరు ప్రదక్షిణ మరియు భక్తులు సమర్పించిన హై-రెస్ చిత్రాలు.'
              : 'Explore high-resolution official feast photographs and photos uploaded directly by devotees.'}
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

      {/* Category Filter Pills & Media Shape Toggle Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-8">
        <div className="flex flex-wrap items-center gap-2">
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

        {/* Shape Switcher: Photo Size Portrait Rectangle (3:4) vs Square (1:1) */}
        <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200 shadow-2xs self-start md:self-auto flex-shrink-0">
          <span className="text-[10px] font-bold text-slate-500 uppercase px-1.5 hidden sm:inline">
            {isTelugu ? 'ఆకారం:' : 'Shape:'}
          </span>
          <button
            type="button"
            onClick={() => handleShapeChange('rectangle')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mediaShape === 'rectangle'
                ? 'bg-white text-emerald-800 shadow-xs border border-emerald-300 font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title={isTelugu ? 'ఫోటో సైజు - ఆయతాకారం (Photo Size Rectangle 3:4)' : 'Photo Size Rectangle (3:4)'}
          >
            <RectangleVertical className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isTelugu ? 'ఫోటో సైజు (ఆయతాకారం)' : 'Photo Size (Rectangle)'}</span>
          </button>
          <button
            type="button"
            onClick={() => handleShapeChange('square')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mediaShape === 'square'
                ? 'bg-white text-emerald-800 shadow-xs border border-emerald-300 font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title={isTelugu ? 'చతురస్రాకారం (Square Shape 1:1)' : 'Square Shape (1:1)'}
          >
            <Square className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isTelugu ? 'చతురస్రం (Square)' : 'Square (1:1)'}</span>
          </button>
        </div>
      </div>

      {/* Professional 3-Per-Row Grid (3 columns on desktop, perfectly set uniform lengths) */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Cards 1 to 5 (or all if not limited) */}
          {displayItems.map((item, index) => {
            const isSearchMatched = Boolean(
              searchQuery.trim() &&
                (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.titleTelugu.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (item.uploaderName && item.uploaderName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                  (item.village && item.village.toLowerCase().includes(searchQuery.toLowerCase())))
            );

            return (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className={`group flex flex-col h-full rounded-2xl bg-white border transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer ${
                  isSearchMatched
                    ? 'border-emerald-500 ring-2 ring-emerald-400/80 shadow-md shadow-emerald-100 scale-[1.01]'
                    : 'border-slate-200/90 hover:border-emerald-500 shadow-2xs hover:shadow-lg'
                }`}
              >
                {/* Image Viewport: Portrait Photo Rectangle (3:4) vs Square (1:1) - Zero Cropping, Pure White Matting */}
                <div
                  className={`relative ${
                    mediaShape === 'square' ? 'aspect-square' : 'aspect-[3/4]'
                  } w-full bg-white flex items-center justify-center overflow-hidden transition-all duration-300 border-b border-slate-100`}
                >
                  {/* Pure uncropped photo: object-contain ensures 100% full view with ZERO cutting, extra space is pure white */}
                  <img
                    src={item.src}
                    alt={`${isTelugu ? item.titleTelugu : item.title} - వేమండ జపమాల మాత క్షేత్రం | Vemanda Festival`}
                    className="w-full h-full object-contain p-1.5 transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Badge Overlay */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                    {item.isCommunity ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/95 text-white text-[9px] font-bold shadow-md uppercase tracking-wider backdrop-blur-xs flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>{isTelugu ? 'భక్తుల సమర్పణ' : 'Devotee Photo'}</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-700/90 text-white text-[9px] font-bold shadow-md uppercase tracking-wider backdrop-blur-xs">
                        {isTelugu ? item.categoryTelugu : item.category}
                      </span>
                    )}

                    {isSearchMatched && (
                      <span className="px-1.5 py-0.5 rounded-full bg-emerald-600 text-white text-[8px] font-extrabold uppercase tracking-wider shadow-sm animate-pulse">
                        {isTelugu ? 'శోధన మ్యాచ్' : 'Match'}
                      </span>
                    )}
                  </div>

                  {/* Zoom Trigger Button */}
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <ZoomIn className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                </div>

                {/* Card Details: Compact uniform height and text */}
                <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-1 h-[20px] group-hover:text-emerald-700 transition-colors">
                      {highlightText(isTelugu ? item.titleTelugu : item.title)}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1 h-[18px] leading-snug mt-1">
                      {highlightText(item.caption)}
                    </p>
                  </div>

                  {/* Card Footer: Compact layout */}
                  <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    {item.isCommunity && item.uploaderName ? (
                      <div className="flex items-center gap-1 truncate max-w-[140px]">
                        <User className="w-3 h-3 text-amber-600 flex-shrink-0" />
                        <span className="font-medium text-slate-700 truncate">
                          {highlightText(item.uploaderName)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium truncate">
                        {isTelugu ? 'అధికారిక ఆల్బమ్' : 'Official Album'}
                      </span>
                    )}

                    <div className="flex items-center gap-1.5">
                      {item.isCommunity && (
                        <>
                          <button
                            onClick={(e) => handleLike(e, item.id)}
                            className={`flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] transition-all ${
                              item.likedByMe
                                ? 'bg-rose-50 border-rose-300 text-rose-600 font-bold'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-rose-300'
                            }`}
                            title={isTelugu ? 'లైక్ చేయండి' : 'Like'}
                          >
                            <Heart
                              className={`w-3 h-3 ${
                                item.likedByMe ? 'fill-current text-rose-600' : ''
                              }`}
                            />
                            <span>{item.likes || 0}</span>
                          </button>

                          {/* Delete Photo Button */}
                          <button
                            onClick={(e) => handleDelete(e, item.id, item.title)}
                            className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title={isTelugu ? 'తొలగించు' : 'Delete photo'}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </>
                      )}

                      <span className="text-[10px] text-emerald-700 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        {isTelugu ? 'వీక్షించు' : 'View'}
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Dedicated "Show More" Navigational Card (Light & Vibrant Festive Theme) */}
          {isLimited && (
            <div className="group flex flex-col h-full rounded-2xl overflow-hidden border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              {/* Center Content: Compact layout matching cards 1-5 */}
              <div className="relative z-10 p-4 sm:p-5 flex flex-col items-center justify-between h-full text-center">
                <div className="w-full flex justify-between items-center text-[11px]">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 font-extrabold uppercase tracking-wider text-[9px]">
                    {isTelugu ? 'చిత్ర మాలిక' : 'Gallery'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-[10px] shadow-2xs">
                    +{remainingCount} {isTelugu ? 'మరిన్ని' : 'More'}
                  </span>
                </div>

                <div className="my-auto py-2">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center mx-auto mb-2 shadow-md shadow-emerald-200 group-hover:scale-110 transition-transform">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                    {isTelugu
                      ? `మరో ${remainingCount} చిత్రాలు అందుబాటులో ఉన్నాయి`
                      : `+${remainingCount} More Sacred Photos`}
                  </h3>
                  <p className="text-[11px] text-slate-600 mt-1 max-w-xs mx-auto line-clamp-1 leading-snug">
                    {isTelugu
                      ? 'రథోత్సవం, ధ్వజస్తంభం, పవిత్ర స్వరూపాలు మరియు భక్తుల సమర్పణలు.'
                      : 'Explore all high-res photos, chariot procession, and brochures.'}
                  </p>
                </div>

                {/* Primary Show More Action Button */}
                <div className="w-full space-y-1.5 pt-1">
                  <Link
                    to="/gallery"
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <span>{isTelugu ? 'మొత్తం చిత్రాలు (Show More)' : 'Show More Photos →'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <Link
                    to="/videos"
                    className="w-full py-1.5 px-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-[10px] border border-emerald-200 transition-all flex items-center justify-center gap-1"
                  >
                    <Video className="w-3 h-3 text-red-500" />
                    <span>{isTelugu ? 'వీడియోల పేజీ చూడండి' : 'Devotional Videos Page'}</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Lightbox Modal */}
      {currentIndex !== null && currentItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white text-slate-800 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={showPrev}
            className="absolute left-4 z-20 w-12 h-12 rounded-full bg-white text-slate-800 hover:bg-amber-500 hover:text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={showNext}
            className="absolute right-4 z-20 w-12 h-12 rounded-full bg-white text-slate-800 hover:bg-amber-500 hover:text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl max-h-[90vh] flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex-grow flex items-center justify-center bg-white max-h-[70vh] p-2">
              <img
                src={currentItem.src}
                alt={`${isTelugu ? currentItem.titleTelugu : currentItem.title} - వేమండ జపమాల మాత | Vemanda Festival`}
                className="max-w-full max-h-[68vh] object-contain rounded-lg shadow-sm"
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
                  <>
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

                    <button
                      onClick={(e) => handleDelete(e, currentItem.id, currentItem.title)}
                      className="px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-colors flex items-center gap-1.5"
                      title={isTelugu ? 'తొలగించు' : 'Delete photo'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{isTelugu ? 'తొలగించు' : 'Delete'}</span>
                    </button>
                  </>
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

      {/* Local Upload Modal */}
      <MediaUploadModal
        isOpen={localUploadModalOpen}
        onClose={() => setLocalUploadModalOpen(false)}
        isTelugu={isTelugu}
        defaultType="image"
      />
    </section>
  );
};
