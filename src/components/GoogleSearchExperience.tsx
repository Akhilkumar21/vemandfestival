import React, { useState } from 'react';
import { FestivalData } from '../types/festival';
import {
  Search,
  Mic,
  Camera,
  MapPin,
  Calendar,
  Flag,
  Video,
  Image as ImageIcon,
  Share2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Globe,
  Sparkles,
  Music,
  CheckCircle2,
} from 'lucide-react';

interface GoogleSearchExperienceProps {
  data: FestivalData;
  isTelugu: boolean;
  onOpenPortal: () => void;
  onSelectFlag: (flagId: number) => void;
  onSelectVideo: (videoId: string) => void;
  onSelectPhoto: (photoIndex: number) => void;
}

export const GoogleSearchExperience: React.FC<GoogleSearchExperienceProps> = ({
  data,
  isTelugu,
  onOpenPortal,
  onSelectFlag,
  onSelectVideo,
  onSelectPhoto,
}) => {
  const [searchTerm, setSearchTerm] = useState('vemanda');
  const [activeTab, setActiveTab] = useState<'all' | 'images' | 'videos' | 'maps'>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      qEn: 'When is the Vemanda Japamala Matha Annual Feast celebrated?',
      qTe: 'వేమండ జపమాల మాత వార్షిక మహోత్సవాలు ఎప్పుడు జరుగుతాయి?',
      aEn: 'The Annual Feast of Japamala Matha Shrine in Vemanda Village is celebrated from October 27 to October 30.',
      aTe: 'వేమండ గ్రామ జపమాల మాత క్షేత్ర వార్షిక మహోత్సవాలు అక్టోబర్ 27, 28, 29, 30 తేదీలలో అత్యంత వైభవంగా జరుగుతాయి.',
    },
    {
      qEn: 'What are the dates and timings of the 4 Sacred Flag Hoistings in Vemanda?',
      qTe: 'వేమండలో 4 పతాక ఆవిష్కరణల సమయాలు మరియు తేదీలు ఏమిటి?',
      aEn: '1st Flag: Oct 27 at 6:00 PM (Inaugural & Stupa Blessing); 2nd Flag: Oct 28 at 9:00 AM; 3rd Flag: Oct 29 at 9:00 AM; 4th Flag: Oct 30 at 9:00 AM (Concelebrated High Mass).',
      aTe: '1వ పతాకం: అక్టోబర్ 27 సా॥ 6:00 (స్థూప ప్రతిష్ఠ); 2వ పతాకం: అక్టోబర్ 28 ఉ॥ 9:00; 3వ పతాకం: అక్టోబర్ 29 ఉ॥ 9:00; 4వ పతాకం: అక్టోబర్ 30 ఉ॥ 9:00 (సమిష్టి దివ్యబలిపూజ).',
    },
    {
      qEn: 'What is the daily morning flag tradition in Vemanda?',
      qTe: 'వేమండలో ప్రతిరోజు ఉదయం జరిగే పతాక ఆచారం ఏమిటి?',
      aEn: 'Every morning at 8:00 AM, Mother Mary’s sacred flag departs in a solemn procession with traditional instruments (Melathalalu) from the historic R.C.M. Church to the Japamala Matha Shrine.',
      aTe: 'ప్రతిరోజు ఉదయం 8:00 గంటలకు ఆర్.సి.యం. దేవాలయం నుండి మరిమాత పతాకము, మేళ తాళాలతో భక్తిశ్రద్ధలతో జపమాల మాత గృహ వద్దకు చేరును.',
    },
    {
      qEn: 'When does the Grand Chariot (Theru) Street Procession take place?',
      qTe: 'మహా తేరు ప్రదక్షిణ - రథోత్సవం ఎప్పుడు జరుగుతుంది?',
      aEn: 'The Grand Chariot (Theru) Procession with the sacred statues of Mother Mary, St. Michael the Archangel, and Saints takes place on October 30, starting at 4:00 PM through the streets of Vemanda.',
      aTe: 'మరియమాత, పునీత మిఖాయేలు మరియు పలువురు పునీతుల స్వరూపాలతో వేమండ పురవీధులలో కన్నులపండువగా సాగే తేరు ప్రదక్షిణ (రథోత్సవం) అక్టోబర్ 30 సాయంత్రం 4:00 గంటలకు ప్రారంభమగును.',
    },
    {
      qEn: 'Who coordinates the sacred choir and music for the celebrations?',
      qTe: 'ఉత్సవాలలో భక్తి గీతాలాపన ఎవరు సమర్పిస్తారు?',
      aEn: 'The devotional hymns, liturgical songs, and praise worship throughout the feast are presented by the renowned Vemanda Choir Team (వేమండ గాయక బృందం).',
      aTe: 'మహోత్సవాల పొడవునా దివ్యబలిపూజలలో మరియమాత భక్తి సంకీర్తనలను వేమండ గాయక బృందం వారు భక్తితో సమర్పిస్తారు.',
    },
  ];

  return (
    <div className="text-[#202124] min-h-screen font-sans">
      {/* Google Search Top Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#dadce0] px-4 py-3 md:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 w-full md:w-auto">
            {/* Google Logo */}
            <div className="flex items-center text-2xl font-bold tracking-tight select-none cursor-pointer">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </div>

            {/* Google Search Bar */}
            <div className="relative flex-grow md:w-[600px]">
              <div className="flex items-center w-full bg-white hover:shadow-md focus-within:shadow-md rounded-full border border-[#dfe1e5] px-4 py-2.5 transition-all">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-slate-800 outline-none flex-grow text-sm md:text-base font-normal pr-3"
                  placeholder="Search Google or type a URL"
                />
                <div className="flex items-center gap-3 text-[#70757a]">
                  <Mic className="w-4 h-4 cursor-pointer hover:text-blue-600" />
                  <Camera className="w-4 h-4 cursor-pointer hover:text-blue-600" />
                  <Search className="w-4 h-4 text-[#4285F4] cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* Direct CTA to Portal View */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPortal}
              className="px-4 py-2 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs md:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              {isTelugu ? 'అధికారిక క్షేత్ర పోర్టల్ చూడండి' : 'Open Official Shrine Portal'}
            </button>
          </div>
        </div>

        {/* Google Search Sub-tabs */}
        <div className="max-w-7xl mx-auto flex items-center gap-6 mt-3 text-xs md:text-sm text-[#5f6368] overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-2 border-b-2 font-medium flex items-center gap-1.5 transition-colors ${activeTab === 'all'
                ? 'text-[#1a73e8] border-[#1a73e8]'
                : 'border-transparent hover:text-slate-900'
              }`}
          >
            <Search className="w-3.5 h-3.5" />
            {isTelugu ? 'అన్నీ' : 'All'}
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`pb-2 border-b-2 font-medium flex items-center gap-1.5 transition-colors ${activeTab === 'images'
                ? 'text-[#1a73e8] border-[#1a73e8]'
                : 'border-transparent hover:text-slate-900'
              }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            {isTelugu ? 'చిత్రాలు' : 'Images'}
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`pb-2 border-b-2 font-medium flex items-center gap-1.5 transition-colors ${activeTab === 'videos'
                ? 'text-[#1a73e8] border-[#1a73e8]'
                : 'border-transparent hover:text-slate-900'
              }`}
          >
            <Video className="w-3.5 h-3.5" />
            {isTelugu ? 'వీడియోలు' : 'Videos'}
          </button>
          <button
            onClick={() => setActiveTab('maps')}
            className={`pb-2 border-b-2 font-medium flex items-center gap-1.5 transition-colors ${activeTab === 'maps'
                ? 'text-[#1a73e8] border-[#1a73e8]'
                : 'border-transparent hover:text-slate-900'
              }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            {isTelugu ? 'మ్యాప్స్' : 'Maps'}
          </button>
        </div>
      </header>

      {/* Main SERP Content Area */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        {/* Search Results Stat */}
        <div className="text-xs text-[#70757a] mb-4">
          {isTelugu
            ? `సుమారు 6,420 ఫలితాలు (0.24 సెకన్లు) - "వేమండ"`
            : `About 6,420 results (0.24 seconds) for "vemanda"`}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Organic Results, Videos, People Also Ask */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Organic Result: Official Feast Portal */}
            <div className="bg-white rounded-2xl p-6 border border-[#dadce0] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-xs text-[#202124] mb-1">
                <Globe className="w-3.5 h-3.5 text-[#1a73e8]" />
                <span>https://vemanda.shrine › annual-feast</span>
              </div>
              <h2
                onClick={onOpenPortal}
                className="text-lg md:text-xl font-medium text-[#1a0dab] hover:underline cursor-pointer mb-2"
              >
                {isTelugu
                  ? 'వేమండ జపమాల మాత గృహ ప్రతిష్ట - వార్షిక మహోత్సవములు'
                  : 'Vemanda Japamala Matha Shrine - Annual Feast (Oct 27-30)'}
              </h2>

              <p className="text-sm text-[#4d5156] leading-relaxed mb-4">
                <span className="text-amber-800 font-semibold">
                  {isTelugu ? 'అక్టోబర్ 27, 28, 29, 30' : 'October 27, 28, 29, 30'}:{' '}
                </span>
                {isTelugu
                  ? 'తరతరముల వారు నన్ను ధన్యురాలని పిలిచెదరు (లూకా 1:48). వేమండ గ్రామము, వెంట్రప్రగడ విచారణలో జపమాల మాత వార్షిక మహోత్సవాల పూర్తి వివరాలు. 4 పతాక ఆవిష్కరణలు, దివ్యబలిపూజలు, ఆరాధన, వేమండ గాయక బృందం సంకీర్తనలు, ప్రీతి విందు మరియు గ్రామంలో ఘన రథోత్సవం - తేరు ప్రదక్షిణ.'
                  : '"All generations will call me blessed" (Luke 1:48). Complete schedule of the Annual Feast of Japamala Matha Shrine in Vemanda Village, Ventrapragada Parish. Highlights include 4 Sacred Flag Hoistings, Holy Masses, Adoration, Vemanda Choir hymns, community banquets (విందు), and Grand Chariot (Theru) Street Procession.'}
              </p>

              {/* Sitelinks Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#f1f3f4]">
                <div
                  onClick={() => onSelectFlag(1)}
                  className="p-3 rounded-xl bg-[#f8f9fa] hover:bg-[#f1f3f4] border border-[#e8eaed] cursor-pointer transition-colors"
                >
                  <div className="text-sm font-semibold text-[#1a0dab] flex items-center gap-1.5 mb-1">
                    <Flag className="w-3.5 h-3.5 text-amber-600" />
                    {isTelugu ? 'చతుర్విధ పతాక ఆవిష్కరణలు' : 'The 4 Sacred Flags'}
                  </div>
                  <div className="text-xs text-[#70757a]">
                    {isTelugu
                      ? 'అక్టోబర్ 27, 28, 29, 30 తేదీల 4 పతాకాల వివరాలు'
                      : 'Timings & rituals for 1st, 2nd, 3rd, and 4th flags'}
                  </div>
                </div>

                <div
                  onClick={onOpenPortal}
                  className="p-3 rounded-xl bg-[#f8f9fa] hover:bg-[#f1f3f4] border border-[#e8eaed] cursor-pointer transition-colors"
                >
                  <div className="text-sm font-semibold text-[#1a0dab] flex items-center gap-1.5 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    {isTelugu ? '4 రోజుల సమగ్ర కార్యక్రమ పట్టిక' : 'Day-by-Day Schedule'}
                  </div>
                  <div className="text-xs text-[#70757a]">
                    {isTelugu
                      ? 'దివ్యబలిపూజలు, ఆరాధన, మరియు ప్రార్థనల వేళలు'
                      : 'Divya Bali Pooja, Eucharistic Adoration & Rosary'}
                  </div>
                </div>

                <div
                  onClick={() => onSelectVideo(data.videos[0].id)}
                  className="p-3 rounded-xl bg-[#f8f9fa] hover:bg-[#f1f3f4] border border-[#e8eaed] cursor-pointer transition-colors"
                >
                  <div className="text-sm font-semibold text-[#1a0dab] flex items-center gap-1.5 mb-1">
                    <Video className="w-3.5 h-3.5 text-red-600" />
                    {isTelugu ? 'మహోత్సవ ప్రత్యక్ష వీడియోలు (5)' : 'Festival Videos (5)'}
                  </div>
                  <div className="text-xs text-[#70757a]">
                    {isTelugu
                      ? 'ధ్వజస్తంభం విద్యుద్దీపాలు, తేరు ప్రదక్షిణ వీడియోలు'
                      : 'Flag hoisting, shrine illumination & night theru'}
                  </div>
                </div>

                <div
                  onClick={() => onSelectPhoto(0)}
                  className="p-3 rounded-xl bg-[#f8f9fa] hover:bg-[#f1f3f4] border border-[#e8eaed] cursor-pointer transition-colors"
                >
                  <div className="text-sm font-semibold text-[#1a0dab] flex items-center gap-1.5 mb-1">
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                    {isTelugu ? 'పవిత్ర చిత్ర మాలిక (13)' : 'Sacred Photo Gallery (13)'}
                  </div>
                  <div className="text-xs text-[#70757a]">
                    {isTelugu
                      ? 'జపమాల మాత, గర్భిణీ మరియమాత, పునీత మిఖాయేలు'
                      : 'High-res photos of statues, procession & brochures'}
                  </div>
                </div>
              </div>
            </div>

            {/* Video Carousel */}
            <div className="bg-white rounded-2xl p-5 border border-[#dadce0] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                  <Video className="w-4 h-4 text-red-600" />
                  {isTelugu ? 'వేమండ క్షేత్ర వీడియో దృశ్యాలు' : 'Videos for Vemanda Feast'}
                </h3>
                <span className="text-xs text-[#1a73e8] hover:underline cursor-pointer" onClick={onOpenPortal}>
                  {isTelugu ? 'అన్నీ చూడండి' : 'View all'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {data.videos.slice(0, 3).map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => onSelectVideo(vid.id)}
                    className="group rounded-xl overflow-hidden bg-white border border-[#dadce0] cursor-pointer hover:border-[#1a73e8] hover:shadow-md transition-all"
                  >
                    <div className="relative aspect-video bg-slate-900">
                      <video src={vid.path} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                        <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                          ▶
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/80 text-[10px] text-white px-1.5 py-0.5 rounded">
                        {vid.duration}
                      </span>
                    </div>
                    <div className="p-2.5">
                      <h4 className="text-xs font-semibold text-slate-900 line-clamp-2 group-hover:text-[#1a73e8]">
                        {isTelugu ? vid.titleTelugu : vid.title}
                      </h4>
                      <p className="text-[11px] text-[#70757a] mt-1">Vemanda Feast Official</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* People Also Ask (Interactive Accordion) */}
            <div className="bg-white rounded-2xl p-5 border border-[#dadce0] shadow-sm">
              <h3 className="text-base font-semibold text-slate-900 mb-3">
                {isTelugu ? 'ప్రజలు ఎక్కువగా అడిగే ప్రశ్నలు' : 'People also ask'}
              </h3>
              <div className="divide-y divide-[#f1f3f4]">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="py-3">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between text-left text-sm font-medium text-slate-900 hover:text-[#1a73e8]"
                    >
                      <span>{isTelugu ? faq.qTe : faq.qEn}</span>
                      {expandedFaq === idx ? (
                        <ChevronUp className="w-4 h-4 text-[#70757a]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#70757a]" />
                      )}
                    </button>
                    {expandedFaq === idx && (
                      <p className="mt-2 text-xs md:text-sm text-[#4d5156] leading-relaxed pl-1">
                        {isTelugu ? faq.aTe : faq.aEn}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Images Pack */}
            <div className="bg-white rounded-2xl p-5 border border-[#dadce0] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  {isTelugu ? 'వేమండ మహోత్సవ చిత్రాలు' : 'Images for Vemanda Feast'}
                </h3>
                <span className="text-xs text-[#1a73e8] hover:underline cursor-pointer" onClick={onOpenPortal}>
                  {isTelugu ? 'మరిన్ని చూడండి' : 'See more images'}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {data.gallery.slice(0, 4).map((img, i) => (
                  <div
                    key={img.id}
                    onClick={() => onSelectPhoto(i)}
                    className="aspect-square rounded-xl overflow-hidden bg-slate-100 border border-[#dadce0] cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <img
                      src={img.src}
                      alt={isTelugu ? img.titleTelugu : img.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Google Knowledge Graph Panel */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-white rounded-2xl border border-[#dadce0] overflow-hidden shadow-md">
              {/* Photo Collage Header */}
              <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1">
                <img
                  src={data.gallery[0].src}
                  alt="Vemanda Flag Pole"
                  className="w-full h-40 object-cover rounded-l-xl cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => onSelectPhoto(0)}
                />
                <div className="grid grid-rows-2 gap-1">
                  <img
                    src={data.gallery[4].src}
                    alt="Japamala Matha Statue"
                    className="w-full h-[78px] object-cover rounded-tr-xl cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => onSelectPhoto(4)}
                  />
                  <img
                    src={data.gallery[1].src}
                    alt="Night Chariot Procession"
                    className="w-full h-[78px] object-cover rounded-br-xl cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => onSelectPhoto(1)}
                  />
                </div>
              </div>

              {/* Panel Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="text-xl md:text-[22px] font-bold text-slate-900">
                      {isTelugu ? data.shrineTelugu : data.shrine}
                    </h2>
                    <p className="text-sm text-[#70757a]">
                      {isTelugu
                        ? `${data.villageTelugu}, ${data.parishTelugu} విచారణ • కాథలిక్ పుణ్యక్షేత్రం`
                        : `${data.village}, ${data.parish} Parish • Catholic Pilgrimage Shrine`}
                    </p>
                  </div>
                  <span className="p-2 rounded-full bg-[#f1f3f4] text-[#5f6368] hover:text-[#1a73e8] cursor-pointer">
                    <Share2 className="w-4 h-4" />
                  </span>
                </div>

                {/* Scripture Quote */}
                <div className="my-4 p-3 rounded-xl bg-amber-50 border-l-4 border-amber-500 text-xs italic text-amber-900">
                  {isTelugu ? data.scriptureTelugu : data.scripture}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={onOpenPortal}
                    className="py-2.5 px-3 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {isTelugu ? 'పోర్టల్ ప్రవేశించండి' : 'Open Portal'}
                  </button>
                  <button
                    onClick={() => onSelectFlag(1)}
                    className="py-2.5 px-3 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-[#dadce0]"
                  >
                    <Flag className="w-3.5 h-3.5 text-amber-600" />
                    {isTelugu ? '4 పతాకాలు' : 'The 4 Flags'}
                  </button>
                </div>

                {/* Key Attributes List */}
                <div className="space-y-3.5 text-xs md:text-sm divide-y divide-[#f1f3f4]">
                  <div className="flex items-start gap-3 pt-2">
                    <Calendar className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#70757a] block text-xs">
                        {isTelugu ? 'మహోత్సవ తేదీలు' : 'Festival Dates'}
                      </span>
                      <span className="text-slate-900 font-semibold">
                        {isTelugu ? data.dates.displayTelugu : data.dates.display}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3">
                    <Flag className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#70757a] block text-xs">
                        {isTelugu ? 'పతాక ఆవిష్కరణలు' : 'Sacred Flags'}
                      </span>
                      <span className="text-slate-800">
                        {isTelugu
                          ? 'మొదటి (27వ తేదీ), రెండవ (28వ తేదీ), మూడవ (29వ తేదీ), నాల్గవ (30వ తేదీ)'
                          : '1st (Oct 27), 2nd (Oct 28), 3rd (Oct 29), 4th (Oct 30)'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3">
                    <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#70757a] block text-xs">
                        {isTelugu ? 'నివాస ప్రాంతం' : 'Location & Address'}
                      </span>
                      <span className="text-slate-800">
                        {isTelugu
                          ? 'వేమండ గ్రామము, వెంట్రప్రగడ విచారణ, కృష్ణా జిల్లా, ఆంధ్రప్రదేశ్'
                          : 'Vemanda Village, Ventrapragada Parish, Krishna District, AP'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3">
                    <Music className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#70757a] block text-xs">
                        {isTelugu ? 'గాయక బృందం' : 'Devotional Choir'}
                      </span>
                      <span className="text-slate-900 font-medium">
                        {isTelugu ? 'వేమండ గాయక బృందం' : 'Vemanda Choir Team'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#70757a] block text-xs">
                        {isTelugu ? 'గమనిక & నిబంధనలు' : 'Devotional Notice'}
                      </span>
                      <span className="text-[#5f6368] text-xs">
                        {isTelugu
                          ? 'దివ్యబలిపూజ కానుకలు కౌంటర్లలో నమోదు చేయవలెను. భక్తి క్రమశిక్షణ పాటించవలెను.'
                          : 'Mass intention offerings registerable at counters. Devotees requested to observe sacred discipline.'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
