import React, { useState, useEffect } from 'react';
import { GalleryItem } from '../types/festival';
import { Image, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

interface GalleryLightboxProps {
  gallery: GalleryItem[];
  isTelugu: boolean;
  searchQuery: string;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({ gallery, isTelugu, searchQuery }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const categories = [
    { key: 'all', en: 'All Photos', te: 'అన్ని చిత్రాలు' },
    { key: 'statues', en: 'Sacred Statues', te: 'పవిత్ర స్వరూపాలు' },
    { key: 'flags', en: 'Flag Mast & Lighting', te: 'ధ్వజస్తంభం & దీపాలంకరణ' },
    { key: 'procession', en: 'Procession & Theru', te: 'తేరు & రథోత్సవం' },
    { key: 'forms', en: 'Official Brochures', te: 'ఆహ్వాన పత్రికలు' },
    { key: 'media', en: 'TV & News Coverage', te: 'మీడియా ప్రసారాలు' },
  ];

  const filteredItems = gallery.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setCurrentIndex(null);
  };

  const showNext = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex + 1) % filteredItems.length);
  };

  const showPrev = () => {
    if (currentIndex === null) return;
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

  return (
    <section id="gallery" className="py-12">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
          <Image className="w-3.5 h-3.5" />
          {isTelugu ? 'పవిత్ర ఛాయాచిత్రాలు' : 'Sacred Photo Gallery'}
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
          {isTelugu ? 'క్షేత్ర శోభ & ఉత్సవ చిత్ర మాలిక' : 'Shrine & Festivity Gallery'}
        </h2>
        <p className="text-slate-600 text-sm md:text-base">
          {isTelugu
            ? 'జపమాల మాత స్వరూపం, ధ్వజస్తంభం, తేరు ప్రదక్షిణ, మరియు ఉత్సవ ఆహ్వాన పత్రికల దృశ్యాలు'
            : 'Explore high-resolution photographs of Our Lady of the Rosary, holy flag mast, and chariot processions.'}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all shadow-xs ${
              activeCategory === cat.key
                ? 'bg-amber-500 text-white shadow-amber-200'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-400'
            }`}
          >
            {isTelugu ? cat.te : cat.en}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => openLightbox(index)}
            className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-[4/3] cursor-pointer hover:border-amber-500 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg"
          >
            <img
              src={item.src}
              alt={`${isTelugu ? item.titleTelugu : item.title} - వేమండ జపమాల మాత క్షేత్రం | Vemanda Festival`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider mb-1">
                {isTelugu ? item.categoryTelugu : item.category}
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug">
                {isTelugu ? item.titleTelugu : item.title}
              </h3>
            </div>
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
              <ZoomIn className="w-4 h-4 text-amber-600" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {currentIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
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
                src={filteredItems[currentIndex].src}
                alt={`${isTelugu ? filteredItems[currentIndex].titleTelugu : filteredItems[currentIndex].title} - వేమండ జపమాల మాత | Vemanda Festival`}
                className="max-w-full max-h-[68vh] object-contain rounded-lg"
                decoding="async"
              />
            </div>

            <div className="p-6 bg-white border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                    {isTelugu
                      ? filteredItems[currentIndex].categoryTelugu
                      : filteredItems[currentIndex].category}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">
                    {currentIndex + 1} / {filteredItems.length}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {isTelugu
                    ? filteredItems[currentIndex].titleTelugu
                    : filteredItems[currentIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {filteredItems[currentIndex].caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
