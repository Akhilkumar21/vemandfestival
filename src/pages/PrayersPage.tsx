import React, { useState, useEffect } from 'react';
import {
  Heart,
  Baby,
  Activity,
  Home as HomeIcon,
  Sparkles,
  GraduationCap,
  HeartHandshake,
  PlusCircle,
  FileText,
  Printer,
  Download,
  Search,
  Flame,
  X,
  Check,
  Copy,
  Share2,
  Calendar,
  Filter,
  Church,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { PrayerCategory, PRAYER_CATEGORIES, PrayerRequest } from '../types/prayer';
import {
  getStoredPrayerRequests,
  incrementAmenCount,
} from '../utils/prayerStorage';
import {
  exportToWordDocument,
  printPrayerDocument,
  exportToCSV,
} from '../utils/prayerExporter';
import { PrayerFormModal } from '../components/PrayerFormModal';

interface PrayersPageProps {
  isTelugu: boolean;
  searchQuery?: string;
}

export const PrayersPage: React.FC<PrayersPageProps> = ({ isTelugu, searchQuery = '' }) => {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalDefaultCat, setModalDefaultCat] = useState<PrayerCategory>('pregnancy');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [candleLitMap, setCandleLitMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setPrayers(getStoredPrayerRequests());
  }, []);

  const effectiveSearch = (localSearch || searchQuery).trim().toLowerCase();

  // Filter prayers
  const filteredPrayers = prayers.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !effectiveSearch ||
      p.name.toLowerCase().includes(effectiveSearch) ||
      p.village.toLowerCase().includes(effectiveSearch) ||
      p.title.toLowerCase().includes(effectiveSearch) ||
      p.prayer.toLowerCase().includes(effectiveSearch);

    return matchesCategory && matchesSearch;
  });

  // Calculate statistics
  const pregnancyCount = prayers.filter((p) => p.category === 'pregnancy').length;
  const healthCount = prayers.filter((p) => p.category === 'health').length;
  const totalAmens = prayers.reduce((acc, p) => acc + (p.amenCount || 1), 0);

  const handleAmen = (id: string) => {
    const updated = incrementAmenCount(id);
    setPrayers(updated);
    setCandleLitMap((prev) => ({ ...prev, [id]: true }));
  };

  const handleCopyPrayer = (p: PrayerRequest) => {
    const text = `వేమండ జపమాల మాత ప్రార్థనా విన్నపం:\nభక్తుడు: ${p.name} (${p.village})\nవిభాగం: ${
      isTelugu ? PRAYER_CATEGORIES[p.category].labelTe : PRAYER_CATEGORIES[p.category].labelEn
    }\nశీర్షిక: ${p.title}\nవిన్నపం: ${p.prayer}\n\nవేమండ జపమాల మాత క్షేత్ర వార్షిక మహోత్సవాలు (అక్టోబర్ 27-30)`;
    navigator.clipboard.writeText(text);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openModalWithCategory = (cat: PrayerCategory) => {
    setModalDefaultCat(cat);
    setIsModalOpen(true);
  };

  const handlePrayerAdded = (newPrayer: PrayerRequest) => {
    setPrayers((prev) => [newPrayer, ...prev]);
  };

  return (
    <main className="flex-grow py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold mb-3 shadow-xs">
              <Church className="w-3.5 h-3.5 text-amber-600" />
              <span>
                {isTelugu
                  ? 'వేమండ జపమాల మాత క్షేత్రం • వార్షిక మహోత్సవాలు (అక్టోబర్ 27-30)'
                  : 'Vemanda Japamala Matha Shrine • Annual Feast (Oct 27-30)'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {isTelugu ? 'భక్తుల ప్రార్థనా విన్నపాల డాష్‌బోర్డ్' : 'Devotee Prayer Petitions Dashboard'}
            </h1>
            <p className="text-sm md:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
              {isTelugu
                ? 'సమిష్టి దివ్యబలిపూజ మరియు పవిత్ర తేరు రథోత్సవంలో మరియమాత పాదాల చెంత సమర్పించుటకు భక్తులు పంపిన ప్రార్థనలు. ముఖ్యముగా గర్భిణీలు, సుఖ ప్రసవం, సంతాన భాగ్యం మరియు శారీరక రోగ నివారణ స్వస్థత విన్నపాలు ప్రముఖంగా ప్రదర్శించబడుతున్నాయి.'
                : 'Devotee intentions offered at the feet of Our Lady of the Rosary for Holy Masses & Processions. Dedicated focus on pregnancy, safe delivery, childbirth blessings, and health/healing.'}
            </p>
          </div>

          {/* Action Buttons: Submit & Exports */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => openModalWithCategory('pregnancy')}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs md:text-sm shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isTelugu ? 'విన్నపం సమర్పించండి' : 'Submit Prayer'}</span>
            </button>

            {/* Word Export */}
            <button
              onClick={() => exportToWordDocument(filteredPrayers, isTelugu)}
              className="px-4 py-2.5 rounded-full bg-white border border-blue-300 hover:border-blue-600 hover:bg-blue-50 text-blue-800 font-bold text-xs md:text-sm shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
              title={isTelugu ? 'Word డాక్యుమెంట్‌గా డౌన్‌లోడ్ చేయండి' : 'Export to Word (.doc)'}
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>{isTelugu ? 'Word పత్రం (.doc)' : 'Export Word'}</span>
            </button>

            {/* Print / PDF Export */}
            <button
              onClick={() => printPrayerDocument(filteredPrayers, isTelugu)}
              className="px-4 py-2.5 rounded-full bg-white border border-slate-300 hover:border-slate-600 hover:bg-slate-50 text-slate-800 font-bold text-xs md:text-sm shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
              title={isTelugu ? 'ముద్రించండి లేదా PDF రూపంలో సేవ్ చేయండి' : 'Print / Save as PDF'}
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>{isTelugu ? 'ముద్రించు / PDF' : 'Print / PDF'}</span>
            </button>

            {/* CSV Export */}
            <button
              onClick={() => exportToCSV(filteredPrayers, isTelugu)}
              className="px-3.5 py-2.5 rounded-full bg-white border border-emerald-300 hover:border-emerald-600 hover:bg-emerald-50 text-emerald-800 font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
              title={isTelugu ? 'Excel/CSV ఫైల్‌గా డౌన్‌లోడ్ చేయండి' : 'Export CSV'}
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>CSV</span>
            </button>
          </div>
        </div>

        {/* PROMINENT HIGHLIGHT SECTION: PREGNANCY & HEALTH CARDS */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-600">
              {isTelugu ? 'ముఖ్య విభాగాల ప్రత్యేకావలోకనం (Featured Categories)' : 'Priority Highlighted Intentions'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Highlight Card 1: Pregnancy & Childbirth */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-50 via-white to-rose-100/60 border-2 border-rose-300 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-24 h-24 bg-rose-200/40 rounded-full blur-xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-200 group-hover:scale-105 transition-transform">
                    <Baby className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-200 text-rose-900 uppercase tracking-wider">
                    {isTelugu ? '★ ప్రముఖ విభాగం' : '★ Featured'}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-900 transition-colors">
                  {isTelugu ? 'సంతాన భాగ్యం & సుఖ ప్రసవం' : 'Pregnancy & Childbirth'}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {isTelugu
                    ? 'గర్భవతులు, సుఖ ప్రసవం, సంతాన భాగ్యం మరియు పసిబిడ్డల సంరక్షణ కొరకు'
                    : 'Expectant mothers, safe delivery & blessing of children'}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-rose-200/80 flex items-center justify-between">
                <div>
                  <span className="text-2xl font-black text-rose-700">{pregnancyCount}</span>
                  <span className="text-xs font-semibold text-rose-900/80 ml-1.5">
                    {isTelugu ? 'విన్నపాలు' : 'Petitions'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCategory('pregnancy')}
                    className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 hover:bg-rose-200 text-rose-800 transition-colors"
                  >
                    {isTelugu ? 'చూడండి' : 'Filter'}
                  </button>
                  <button
                    onClick={() => openModalWithCategory('pregnancy')}
                    className="px-3 py-1 rounded-full text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors shadow-xs"
                  >
                    + {isTelugu ? 'సమర్పించండి' : 'Add'}
                  </button>
                </div>
              </div>
            </div>

            {/* Highlight Card 2: Health & Healing */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-emerald-100/60 border-2 border-emerald-300 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-24 h-24 bg-emerald-200/40 rounded-full blur-xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-200 group-hover:scale-105 transition-transform">
                    <Activity className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-200 text-emerald-900 uppercase tracking-wider">
                    {isTelugu ? '★ ప్రముఖ విభాగం' : '★ Featured'}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                  {isTelugu ? 'ఆరోగ్యం & స్వస్థత' : 'Health & Healing'}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {isTelugu
                    ? 'తీవ్ర అనారోగ్యాలు, శస్త్రచికిత్సలు, రోగ నివారణ & దైవ స్వస్థత కొరకు'
                    : 'Relief from critical illness, surgeries, chronic pain & recovery'}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-emerald-200/80 flex items-center justify-between">
                <div>
                  <span className="text-2xl font-black text-emerald-700">{healthCount}</span>
                  <span className="text-xs font-semibold text-emerald-900/80 ml-1.5">
                    {isTelugu ? 'విన్నపాలు' : 'Petitions'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCategory('health')}
                    className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors"
                  >
                    {isTelugu ? 'చూడండి' : 'Filter'}
                  </button>
                  <button
                    onClick={() => openModalWithCategory('health')}
                    className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-xs"
                  >
                    + {isTelugu ? 'సమర్పించండి' : 'Add'}
                  </button>
                </div>
              </div>
            </div>

            {/* Total Petitions Card */}
            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-200 mb-3">
                  <Church className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {isTelugu ? 'మొత్తం విన్నపాలు' : 'Total Devotee Prayers'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {isTelugu
                    ? 'వేమండ, పరిసర గ్రామాల భక్తుల సమర్పణ'
                    : 'From Vemanda & surrounding parishes'}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-baseline justify-between">
                <span className="text-3xl font-black text-amber-600">{prayers.length}</span>
                <span className="text-xs text-slate-500 font-semibold">
                  {isTelugu ? 'రిజిస్టర్ అయ్యాయి' : 'Registered'}
                </span>
              </div>
            </div>

            {/* Total Amens / Candles Card */}
            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center shadow-md shadow-orange-200 mb-3">
                  <Flame className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {isTelugu ? 'వెలిగించిన జ్యోతులు & ఆమెన్లు' : 'Candles Lit & Amens'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {isTelugu
                    ? 'సమిష్టిగా భక్తులు చేసిన ప్రార్థనలు'
                    : 'Collective intercessions offered together'}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-baseline justify-between">
                <span className="text-3xl font-black text-orange-600">{totalAmens}</span>
                <span className="text-xs text-slate-500 font-semibold">
                  {isTelugu ? 'ఆమెన్లు / ప్రార్థనలు' : 'Amens / Prayers'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search, Filter Tabs & Document Export Bar */}
        <div className="bg-white rounded-3xl p-4 md:p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder={
                  isTelugu
                    ? 'భక్తుని పేరు, గ్రామం లేదా ప్రార్థన వెతకండి...'
                    : 'Search by devotee, village, prayer...'
                }
                className="w-full pl-10 pr-9 py-2.5 rounded-full bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all shadow-inner"
              />
              {localSearch && (
                <button
                  onClick={() => setLocalSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Export Links for Current View */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span>{isTelugu ? 'ప్రస్తుత జాబితా ఎక్స్‌పోర్ట్:' : 'Export current view:'}</span>
              <button
                onClick={() => exportToWordDocument(filteredPrayers, isTelugu)}
                className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 flex items-center gap-1 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Word (.doc)</span>
              </button>
              <button
                onClick={() => printPrayerDocument(filteredPrayers, isTelugu)}
                className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 flex items-center gap-1 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{isTelugu ? 'ప్రింట్ / PDF' : 'Print / PDF'}</span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills (with special highlights for Pregnancy & Health) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100">
            {/* All */}
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isTelugu ? 'అన్ని ప్రార్థనలు' : 'All Petitions'} ({prayers.length})
            </button>

            {/* Pregnancy Pill (Highlighted) */}
            <button
              onClick={() => setSelectedCategory('pregnancy')}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                selectedCategory === 'pregnancy'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-200 ring-2 ring-rose-300'
                  : 'bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100'
              }`}
            >
              <Baby className="w-3.5 h-3.5" />
              <span>{isTelugu ? 'సంతాన భాగ్యం & సుఖ ప్రసవం' : 'Pregnancy & Childbirth'}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-rose-200/80 text-rose-900 text-[10px] ml-1">
                {pregnancyCount}
              </span>
            </button>

            {/* Health Pill (Highlighted) */}
            <button
              onClick={() => setSelectedCategory('health')}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                selectedCategory === 'health'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 ring-2 ring-emerald-300'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{isTelugu ? 'ఆరోగ్యం & స్వస్థత' : 'Health & Healing'}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-200/80 text-emerald-900 text-[10px] ml-1">
                {healthCount}
              </span>
            </button>

            {/* Family */}
            <button
              onClick={() => setSelectedCategory('family')}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                selectedCategory === 'family'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <HomeIcon className="w-3.5 h-3.5" />
              <span>{isTelugu ? 'కుటుంబ శాంతి' : 'Family Peace'}</span>
            </button>

            {/* Thanksgiving */}
            <button
              onClick={() => setSelectedCategory('thanksgiving')}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                selectedCategory === 'thanksgiving'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isTelugu ? 'కృతజ్ఞతాస్తుతులు' : 'Thanksgiving'}</span>
            </button>

            {/* Education */}
            <button
              onClick={() => setSelectedCategory('education')}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                selectedCategory === 'education'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{isTelugu ? 'విద్య & ఉద్యోగం' : 'Education'}</span>
            </button>

            {/* Special */}
            <button
              onClick={() => setSelectedCategory('special')}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                selectedCategory === 'special'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>{isTelugu ? 'ప్రత్యేక విన్నపాలు' : 'Special'}</span>
            </button>
          </div>
        </div>

        {/* Devotee Prayer Petitions List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>
              {isTelugu
                ? `మొత్తం ${filteredPrayers.length} ప్రార్థనా విన్నపాలు కనిపిస్తున్నాయి`
                : `Showing ${filteredPrayers.length} prayer petitions`}
            </span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-amber-700 hover:underline flex items-center gap-1"
              >
                <span>{isTelugu ? 'ఫిల్టర్ తొలగించు' : 'Clear filter'}</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {filteredPrayers.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                {isTelugu ? 'ఎలాంటి ప్రార్థనా విన్నపాలు కనిపించలేదు' : 'No prayer petitions found'}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {isTelugu
                  ? 'మీరు వెతికిన పదానికి సంబంధించి విన్నపాలు లేవు. మీరే మొదటి విన్నపాన్ని సమర్పించండి.'
                  : 'No petitions matched your current search/filter. Be the first to submit a prayer intention!'}
              </p>
              <button
                onClick={() => openModalWithCategory('pregnancy')}
                className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{isTelugu ? 'విన్నపం సమర్పించండి' : 'Submit Prayer'}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPrayers.map((p) => {
                const isPregnancy = p.category === 'pregnancy';
                const isHealth = p.category === 'health';
                const isSpecialHighlight = isPregnancy || isHealth;
                const catMeta = PRAYER_CATEGORIES[p.category];
                const isCandleLit = candleLitMap[p.id];

                return (
                  <div
                    key={p.id}
                    className={`rounded-3xl p-5 border transition-all flex flex-col justify-between relative bg-white ${
                      isPregnancy
                        ? 'border-rose-300 ring-2 ring-rose-100 shadow-sm hover:shadow-md hover:border-rose-400'
                        : isHealth
                        ? 'border-emerald-300 ring-2 ring-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-400'
                        : 'border-slate-200 shadow-xs hover:shadow-sm hover:border-amber-300'
                    }`}
                  >
                    {/* Top Ribbon & Category Badge */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 ${catMeta.badgeClass}`}
                        >
                          {isPregnancy && <Baby className="w-3.5 h-3.5" />}
                          {isHealth && <Activity className="w-3.5 h-3.5" />}
                          <span>{isTelugu ? catMeta.labelTe : catMeta.labelEn}</span>
                        </span>

                        <span className="text-[11px] text-slate-400 font-medium">{p.date}</span>
                      </div>

                      {/* Devotee Name & Village */}
                      <div className="flex items-baseline gap-2 mb-2">
                        <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                        <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                          📍 {p.village}
                        </span>
                      </div>

                      {/* Title */}
                      <h5
                        className={`text-xs font-bold mb-2 ${
                          isPregnancy
                            ? 'text-rose-800'
                            : isHealth
                            ? 'text-emerald-800'
                            : 'text-amber-800'
                        }`}
                      >
                        {p.title}
                      </h5>

                      {/* Prayer Content */}
                      <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100 italic">
                        "{p.prayer}"
                      </p>
                    </div>

                    {/* Bottom Actions: Candle / Amen & Copy */}
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      {/* Interactive Amen / Light a Candle */}
                      <button
                        onClick={() => handleAmen(p.id)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                          isCandleLit
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300'
                        }`}
                        title={
                          isTelugu
                            ? 'ఈ విన్నపం కోసం జ్యోతిని వెలిగించి ఆమెన్ పలకండి'
                            : 'Light a candle and say Amen for this intention'
                        }
                      >
                        <Flame
                          className={`w-3.5 h-3.5 ${
                            isCandleLit ? 'fill-white text-white animate-bounce' : 'text-amber-600'
                          }`}
                        />
                        <span>
                          {isCandleLit
                            ? isTelugu
                              ? 'ఆమెన్ చెప్పబడింది'
                              : 'Amen Offered'
                            : isTelugu
                            ? 'జ్యోతి వెలిగించండి / ఆమెన్'
                            : 'Light Candle / Amen'}
                        </span>
                        <span
                          className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                            isCandleLit ? 'bg-amber-600 text-white' : 'bg-amber-200 text-amber-900'
                          }`}
                        >
                          {p.amenCount}
                        </span>
                      </button>

                      {/* Copy / Share Action */}
                      <button
                        onClick={() => handleCopyPrayer(p)}
                        className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        title={isTelugu ? 'విన్నపాన్ని కాపీ చేయండి' : 'Copy prayer'}
                      >
                        {copiedId === p.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Devotee Guidelines / Mass Offering Note */}
        <div className="rounded-3xl bg-amber-50/70 border border-amber-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Church className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-amber-950">
                {isTelugu
                  ? 'దివ్యబలిపూజలో మరియమాత పాదాల చెంత సమర్పణ'
                  : 'Offered at the Feet of Mother Mary during Holy Mass'}
              </h3>
              <p className="text-xs text-amber-900/80 mt-1 max-w-2xl leading-relaxed">
                {isTelugu
                  ? 'ఈ డాష్‌బోర్డ్ ద్వారా భక్తులు సమర్పించిన అన్ని ప్రార్థనా విన్నపాలు పత్ర రూపంలో ఎక్స్‌పోర్ట్ చేయబడి, వార్షిక మహోత్సవాల సమిష్టి దివ్యబలిపూజలలో మరియు అక్టోబర్ 30 సాయంత్రం 4:00 గంటలకు జరిగే తేరు రథోత్సవంలో మరియమాత ప్రత్యేక ఆశీర్వాదం కొరకు ఉంచబడతాయి.'
                  : 'All prayer intentions submitted via this portal are exported in document format and placed before the altar of Our Lady of the Rosary during the Concelebrated High Mass and Chariot Procession on October 30.'}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => exportToWordDocument(prayers, isTelugu)}
              className="px-5 py-2.5 rounded-full bg-white border border-amber-300 hover:border-amber-500 text-amber-900 font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-amber-700" />
              <span>{isTelugu ? 'మొత్తం పత్రం (.doc)' : 'Export Full Document'}</span>
            </button>
            <button
              onClick={() => openModalWithCategory('pregnancy')}
              className="px-5 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isTelugu ? 'కొత్త విన్నపం' : 'Add Prayer'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Prayer Form Modal */}
      <PrayerFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isTelugu={isTelugu}
        defaultCategory={modalDefaultCat}
        onSuccess={handlePrayerAdded}
      />
    </main>
  );
};

