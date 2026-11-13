import React, { useState } from 'react';
import { VideoItem } from '../types/festival';
import { Video, Play, Maximize2, X, Clock } from 'lucide-react';

interface VideoExperienceProps {
  videos: VideoItem[];
  isTelugu: boolean;
  searchQuery: string;
}

export const VideoExperience: React.FC<VideoExperienceProps> = ({ videos, isTelugu, searchQuery }) => {
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null);

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

  return (
    <section id="videos" className="py-12">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
          <Video className="w-3.5 h-3.5" />
          {isTelugu ? 'వీడియో దృశ్యాలు' : 'Live Festivities & Video Highlights'}
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
          {isTelugu ? 'మహోత్సవ ప్రత్యక్ష వీడియోలు' : 'Festival Video Showcase'}
        </h2>
        <p className="text-slate-600 text-sm md:text-base">
          {isTelugu
            ? 'పతాక ఆవిష్కరణ, విద్యుత్ దీపాలంకరణ, మరియు రథోత్సవ మహా వేడుకల పవిత్ర వీడియోలు'
            : 'Watch actual footage of flag hoistings, shrine illumination, and sacred chariot processions.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group rounded-2xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg"
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
              </div>

              <button
                onClick={() => setActiveModalVideo(video)}
                className="w-full py-2 px-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-500 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isTelugu ? 'పూర్తి స్క్రీన్‌లో వీక్షించండి' : 'Open in Cinema Mode'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cinema Mode Modal */}
      {activeModalVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
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
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300">
                  {isTelugu ? activeModalVideo.categoryTelugu : activeModalVideo.category}
                </span>
                <span className="text-xs text-slate-500">Duration: {activeModalVideo.duration}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {isTelugu ? activeModalVideo.titleTelugu : activeModalVideo.title}
              </h3>
              <p className="text-sm text-slate-600">
                {isTelugu ? activeModalVideo.descriptionTelugu : activeModalVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
