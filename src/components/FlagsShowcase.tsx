import React from 'react';
import { FlagItem } from '../types/festival';
import { Flag, Clock, Calendar, Music, Sparkles } from 'lucide-react';

interface FlagsShowcaseProps {
  flags: FlagItem[];
  isTelugu: boolean;
  searchQuery: string;
}

export const FlagsShowcase: React.FC<FlagsShowcaseProps> = ({ flags, isTelugu, searchQuery }) => {
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
    <section id="flags" className="py-12">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          {isTelugu ? 'చతుర్విధ పతాక ఆవిష్కరణలు' : 'The Four Sacred Flags'}
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
          {isTelugu ? 'పవిత్ర పతాక ఆవిష్కరణ మహోత్సవాలు' : 'Sacred Flag Hoisting Ceremonies'}
        </h2>
        <p className="text-slate-600 text-sm md:text-base">
          {isTelugu
            ? 'వేమండ జపమాల మాత వార్షిక మహోత్సవాల సందర్భంగా 4 రోజులలో జరిగే పతాక ఆవిష్కరణ విశేషాలు'
            : 'Detailed schedule and spiritual significance of the 4 sacred flag hoistings during the Annual Feast.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {flags.map((flag) => (
          <div
            key={flag.id}
            className="group relative rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between hover:border-amber-400 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl"
          >
            {/* Top golden accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-t-2xl" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  {isTelugu ? flag.badgeTelugu : flag.badge}
                </span>
                <div className="w-10 h-10 rounded-full bg-amber-100/60 border border-amber-200 flex items-center justify-center text-amber-700 group-hover:scale-110 transition-transform">
                  <Flag className="w-5 h-5 text-amber-600" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-amber-700 transition-colors">
                {highlightText(isTelugu ? flag.flagNumberTelugu : flag.flagNumber)}
              </h3>
              <h4 className="text-sm font-semibold text-amber-800 mb-4 line-clamp-1">
                {highlightText(isTelugu ? flag.eventTelugu : flag.event)}
              </h4>

              <div className="space-y-2 bg-slate-50 border border-slate-100 rounded-xl p-3 mb-4 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span className="font-semibold text-slate-800">
                    {highlightText(isTelugu ? flag.dateDisplayTelugu : flag.dateDisplay)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span className="font-bold text-blue-700">
                    {highlightText(isTelugu ? flag.timeTelugu : flag.time)}
                  </span>
                </div>
              </div>

              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                {highlightText(isTelugu ? flag.descriptionTelugu : flag.description)}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-amber-900 font-medium">
              <Music className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>{isTelugu ? flag.choirTelugu : flag.choir}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
