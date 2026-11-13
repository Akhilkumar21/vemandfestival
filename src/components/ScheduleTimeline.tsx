import React, { useState } from 'react';
import { DaySchedule } from '../types/festival';
import { Calendar, Clock, Bell, Sparkles, Filter } from 'lucide-react';

interface ScheduleTimelineProps {
  schedule: DaySchedule[];
  dailyTradition: {
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

export const ScheduleTimeline: React.FC<ScheduleTimelineProps> = ({
  schedule,
  dailyTradition,
  isTelugu,
  searchQuery,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

  const filteredSchedule = schedule
    .filter((day) => selectedDay === 'all' || day.date === selectedDay)
    .map((day) => ({
      ...day,
      events: day.events.filter((ev) => {
        if (selectedCategory === 'all') return true;
        return ev.category.toLowerCase().includes(selectedCategory.toLowerCase());
      }),
    }))
    .filter((day) => day.events.length > 0);

  const categories = [
    { key: 'all', en: 'All Events', te: 'అన్ని కార్యక్రమాలు' },
    { key: 'flag', en: 'Flag Hoisting', te: 'పతాక ఆవిష్కరణ' },
    { key: 'mass', en: 'Holy Mass', te: 'దివ్యబలిపూజ' },
    { key: 'adoration', en: 'Adoration', te: 'ఆరాధన' },
    { key: 'choir', en: 'Choir & Songs', te: 'గాయక బృందం' },
    { key: 'feast', en: 'Community Meal', te: 'ప్రీతి విందు' },
    { key: 'procession', en: 'Chariot Procession', te: 'రథోత్సవం' },
  ];

  return (
    <section id="schedule" className="py-12">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
          <Calendar className="w-3.5 h-3.5" />
          {isTelugu ? 'కార్యక్రమ వివరాలు' : 'Festival Liturgy & Timeline'}
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
          {isTelugu ? '4 రోజుల సమగ్ర కార్యక్రమ పట్టిక' : 'Day-by-Day Festival Schedule'}
        </h2>
        <p className="text-slate-600 text-sm md:text-base">
          {isTelugu
            ? 'అక్టోబర్ 27 నుండి 30 వరకు వేమండ జపమాల మాత గృహ క్షేత్రంలో జరిగే దివ్య పూజలు మరియు వేడుకలు'
            : 'Explore all masses, flag hoistings, adorations, community banquets, and processions.'}
        </p>
      </div>

      {/* Daily Tradition Banner */}
      <div className="max-w-4xl mx-auto mb-10 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex flex-col md:flex-row items-center gap-5 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
          <Bell className="w-7 h-7" />
        </div>
        <div className="flex-grow text-center md:text-left">
          <div className="inline-block text-xs font-bold px-2.5 py-0.5 rounded bg-blue-200/80 text-blue-900 mb-1">
            {isTelugu ? dailyTradition.timeTelugu : dailyTradition.time}
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            {highlightText(isTelugu ? dailyTradition.titleTelugu : dailyTradition.title)}
          </h3>
          <p className="text-slate-700 text-xs md:text-sm leading-relaxed">
            {highlightText(isTelugu ? dailyTradition.descriptionTelugu : dailyTradition.description)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col items-center gap-4 mb-10">
        {/* Day Selectors */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedDay('all')}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all shadow-sm ${
              selectedDay === 'all'
                ? 'bg-amber-500 text-white shadow-amber-200'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-400'
            }`}
          >
            {isTelugu ? 'అన్ని రోజులు' : 'All 4 Days'}
          </button>
          {schedule.map((day) => (
            <button
              key={day.date}
              onClick={() => setSelectedDay(day.date)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all shadow-sm ${
                selectedDay === day.date
                  ? 'bg-amber-500 text-white shadow-amber-200'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-400'
              }`}
            >
              {isTelugu ? day.dayTitleTelugu.split(' - ')[0] : day.dayTitle.split(' - ')[0]} (
              {day.date.replace('10-', 'Oct ')})
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1 rounded-full text-xs transition-colors flex items-center gap-1 shadow-xs ${
                selectedCategory === cat.key
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Filter className="w-2.5 h-2.5" />
              {isTelugu ? cat.te : cat.en}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Groups */}
      <div className="max-w-4xl mx-auto space-y-6">
        {filteredSchedule.map((day) => (
          <div
            key={day.date}
            className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {highlightText(isTelugu ? day.dayTitleTelugu : day.dayTitle)}
                </h3>
                <span className="text-xs text-amber-800 font-semibold">
                  {day.date.replace('10-', 'October ')}
                </span>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {day.events.length} {isTelugu ? 'కార్యక్రమాలు' : 'Events'}
              </span>
            </div>

            <div className="space-y-3.5">
              {day.events.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 rounded-xl bg-slate-50 border-l-4 border-amber-500 hover:bg-slate-100/80 transition-colors"
                >
                  <div className="sm:w-36 flex-shrink-0">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-bold mb-1 shadow-xs">
                      <Clock className="w-3 h-3 text-amber-600" />
                      {highlightText(isTelugu ? event.timeTelugu : event.time)}
                    </div>
                    <span className="block text-[11px] text-blue-700 font-semibold uppercase tracking-wider">
                      {isTelugu ? event.categoryTelugu : event.category}
                    </span>
                  </div>

                  <div className="flex-grow">
                    <h4 className="text-base font-bold text-slate-900 mb-1">
                      {highlightText(isTelugu ? event.titleTelugu : event.title)}
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {highlightText(isTelugu ? event.descriptionTelugu : event.description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
