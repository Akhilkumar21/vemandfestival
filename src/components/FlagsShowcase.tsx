import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FlagItem, DaySchedule } from '../types/festival';
import {
  Flag,
  Clock,
  Calendar,
  Music,
  Sparkles,
  ArrowRight,
  X,
  Bell,
  ChevronRight,
  Church,
  CalendarCheck,
} from 'lucide-react';

interface FlagsShowcaseProps {
  flags: FlagItem[];
  schedule?: DaySchedule[];
  dailyTradition?: {
    time: string;
    timeTelugu: string;
    title: string;
    titleTelugu: string;
    description: string;
    descriptionTelugu: string;
  };
  isTelugu: boolean;
  searchQuery: string;
}

export const FlagsShowcase: React.FC<FlagsShowcaseProps> = ({
  flags,
  schedule,
  dailyTradition,
  isTelugu,
  searchQuery,
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

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

  // Close modal on Escape key & arrow keys to change day
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedDayIndex === null) return;
      if (e.key === 'Escape') setSelectedDayIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedDayIndex((prev) => (prev !== null ? (prev + 1) % flags.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedDayIndex((prev) => (prev !== null ? (prev - 1 + flags.length) % flags.length : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDayIndex, flags.length]);

  const currentFlag = selectedDayIndex !== null ? flags[selectedDayIndex] : null;
  const currentSchedule =
    selectedDayIndex !== null && schedule
      ? schedule.find((s) => s.date === currentFlag?.date) || schedule[selectedDayIndex]
      : null;

  return (
    <section id="flags" className="py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>{isTelugu ? 'చతుర్విధ పతాక ఆవిష్కరణలు' : 'The Four Sacred Flags'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
          {isTelugu ? 'పవిత్ర పతాక ఆవిష్కరణ మహోత్సవాలు' : 'Sacred Flag Hoisting Ceremonies'}
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto">
          {isTelugu
            ? 'వేమండ జపమాల మాత క్షేత్రంలో అక్టోబర్ 27 నుండి 30 వరకు జరిగే 4 పవిత్ర పతాకావిష్కరణల వివరాలు. ఏ రోజు వివరాలైన క్లిక్ చేసి సమగ్రంగా చూడవచ్చు.'
            : 'Explore the 4 sacred flag hoistings from October 27 to 30. Click "Show More" on any flag to view full day liturgy and program details.'}
        </p>
      </div>

      {/* 4 Sacred Flag Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {flags.map((flag, index) => (
          <div
            key={flag.id}
            onClick={() => setSelectedDayIndex(index)}
            className="group relative rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-lg cursor-pointer"
          >
            {/* Top golden accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-t-2xl" />

            <div>
              {/* Badge & Flag Icon */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
                  {isTelugu ? flag.badgeTelugu : flag.badge}
                </span>
                <div className="w-9 h-9 rounded-full bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-700 group-hover:scale-110 transition-transform shadow-2xs">
                  <Flag className="w-4 h-4 text-amber-600" />
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                {highlightText(isTelugu ? flag.flagNumberTelugu : flag.flagNumber)}
              </h3>
              <h4 className="text-xs font-semibold text-amber-800 mt-0.5 line-clamp-1">
                {highlightText(isTelugu ? flag.eventTelugu : flag.event)}
              </h4>

              {/* Date & Time Box */}
              <div className="space-y-1.5 bg-slate-50 border border-slate-100 rounded-xl p-2.5 mt-3 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span className="font-bold text-slate-800 text-[11px]">
                    {highlightText(isTelugu ? flag.dateDisplayTelugu : flag.dateDisplay)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span className="font-extrabold text-blue-700 text-[11px]">
                    {highlightText(isTelugu ? flag.timeTelugu : flag.time)}
                  </span>
                </div>
              </div>

              {/* Show More Button (Directly fulfilling user request: "below just add show more then after click open popup") */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDayIndex(index);
                }}
                className="w-full mt-3 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md shadow-amber-200/80 transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <span>{isTelugu ? 'మరిన్ని వివరాలు (Show More)' : 'Show More Details'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Card Footer: Choir */}
            <div className="pt-2.5 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-amber-900 font-medium">
              <div className="flex items-center gap-1 truncate max-w-[150px]">
                <Music className="w-3 h-3 text-amber-600 flex-shrink-0" />
                <span className="truncate">{isTelugu ? flag.choirTelugu : flag.choir}</span>
              </div>
              <span className="text-[10px] font-bold text-amber-700 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                {isTelugu ? 'వివరాలు' : 'Day Details'}
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Day Popup Modal (Triggered by clicking "Show More" on any of the 4 flags) */}
      {selectedDayIndex !== null && currentFlag && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedDayIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-200 flex flex-col animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3 truncate">
                <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-2xs">
                  <Flag className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-white/20 text-white uppercase tracking-wider backdrop-blur-xs">
                      {isTelugu ? currentFlag.badgeTelugu : currentFlag.badge}
                    </span>
                    <span className="text-xs text-amber-100 font-semibold hidden sm:inline">
                      • {isTelugu ? currentFlag.dateDisplayTelugu : currentFlag.dateDisplay}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl font-extrabold truncate text-white mt-0.5">
                    {currentSchedule
                      ? isTelugu
                        ? currentSchedule.dayTitleTelugu
                        : currentSchedule.dayTitle
                      : isTelugu
                      ? currentFlag.flagNumberTelugu
                      : currentFlag.flagNumber}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedDayIndex(null)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors flex-shrink-0 ml-3 cursor-pointer"
                title={isTelugu ? 'మూసివేయి' : 'Close'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 4 Days Switcher Tabs (Fulfilling user request: "that way we can change the 4 days") */}
            <div className="px-5 py-3 bg-amber-50/80 border-b border-amber-200 flex items-center gap-2 overflow-x-auto text-xs">
              {flags.map((f, idx) => {
                const isActive = selectedDayIndex === idx;
                return (
                  <button
                    key={f.id}
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`px-3.5 py-2 rounded-xl font-extrabold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm'
                        : 'bg-white text-slate-700 hover:bg-amber-100/70 border border-amber-200 shadow-2xs'
                    }`}
                  >
                    <span>🚩</span>
                    <span>{isTelugu ? f.flagNumberTelugu : f.flagNumber}</span>
                    <span className="text-[10px] opacity-80">
                      ({isTelugu ? f.dateDisplayTelugu : f.dateDisplay})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Modal Body Content (Spacious 2-column layout for wider popup) */}
            <div className="p-5 sm:p-7 overflow-y-auto text-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left Column: Flag Ceremony Highlight & Morning Tradition */}
                <div className="md:col-span-5 space-y-4">
                  {/* Flag Hoisting Highlight Banner */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 via-amber-50/60 to-white border-2 border-amber-200 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between text-xs text-amber-900 font-semibold">
                      <span className="flex items-center gap-1 text-amber-800">
                        <Calendar className="w-4 h-4 text-amber-600" />
                        <strong>{isTelugu ? currentFlag.dateDisplayTelugu : currentFlag.dateDisplay}</strong>
                      </span>
                      <span className="flex items-center gap-1 font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>{isTelugu ? currentFlag.timeTelugu : currentFlag.time}</span>
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                      {highlightText(isTelugu ? currentFlag.eventTelugu : currentFlag.event)}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {highlightText(isTelugu ? currentFlag.descriptionTelugu : currentFlag.description)}
                    </p>

                    <div className="pt-2 border-t border-amber-200/60 flex items-center gap-2 text-xs text-amber-900 font-medium">
                      <Music className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span>
                        {isTelugu ? 'భక్తి గీతాలాపన:' : 'Devotional Choir:'}{' '}
                        <strong>{isTelugu ? currentFlag.choirTelugu : currentFlag.choir}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Daily Morning 8:00 AM Tradition */}
                  {dailyTradition && (
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/80 to-white border-2 border-blue-200 flex items-start gap-3 shadow-2xs">
                      <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-xs mt-0.5">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-blue-200 text-blue-900 uppercase">
                          {isTelugu ? dailyTradition.timeTelugu : dailyTradition.time}
                        </div>
                        <h5 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                          {isTelugu ? dailyTradition.titleTelugu : dailyTradition.title}
                        </h5>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                          {isTelugu ? dailyTradition.descriptionTelugu : dailyTradition.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Full Day Program Schedule Timeline */}
                <div className="md:col-span-7 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider pb-1 border-b border-slate-200">
                    <CalendarCheck className="w-4 h-4 text-emerald-600" />
                    <span>
                      {isTelugu
                        ? `${isTelugu ? currentSchedule?.dayTitleTelugu || currentFlag.flagNumberTelugu : currentSchedule?.dayTitle || currentFlag.flagNumber} సమగ్ర కార్యక్రమ పట్టిక`
                        : `${currentSchedule?.dayTitle || currentFlag.flagNumber} Liturgical Events Timeline`}
                    </span>
                  </div>

                  {currentSchedule && currentSchedule.events && currentSchedule.events.length > 0 ? (
                    <div className="space-y-3">
                      {currentSchedule.events.map((ev) => (
                        <div
                          key={ev.id}
                          className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-xs transition-all flex items-start gap-3.5"
                        >
                          <span className="text-xs font-extrabold px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 flex-shrink-0 text-center min-w-[75px]">
                            {isTelugu ? ev.timeTelugu : ev.time}
                          </span>

                          <div className="flex-grow">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 uppercase">
                                {isTelugu ? ev.categoryTelugu : ev.category}
                              </span>
                              <h6 className="text-xs sm:text-sm font-extrabold text-slate-900">
                                {isTelugu ? ev.titleTelugu : ev.title}
                              </h6>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {isTelugu ? ev.descriptionTelugu : ev.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-xs text-slate-500">
                      {isTelugu ? 'కార్యక్రమ వివరాలు లభ్యమవుతాయి' : 'Event timetable details'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Bottom Footer */}
            <div className="px-6 py-3.5 bg-amber-50/70 border-t border-amber-200 flex items-center justify-between text-xs">
              <span className="text-slate-500 text-[11px] hidden sm:inline">
                {isTelugu ? 'కీబోర్డ్ బాణం గుర్తులు (←/→) తో రోజు మార్చవచ్చు' : 'Use ← / → keys to switch days'}
              </span>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <Link
                  to="/schedule"
                  className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold text-xs border border-blue-200 transition-colors"
                >
                  {isTelugu ? 'పూర్తి టైమ్‌టేబుల్ పేజీ' : 'Full Timetable Page'}
                </Link>
                <button
                  onClick={() => setSelectedDayIndex(null)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs shadow-md shadow-amber-200 transition-colors cursor-pointer"
                >
                  {isTelugu ? 'ముగించు' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
