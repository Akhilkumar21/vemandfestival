import React from 'react';
import { Link } from 'react-router-dom';
import { FestivalData } from '../types/festival';
import { FlagsShowcase } from '../components/FlagsShowcase';
import { ScheduleTimeline } from '../components/ScheduleTimeline';
import { VideoExperience } from '../components/VideoExperience';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { SeoHead } from '../components/SeoHead';
import {
  Flag,
  Calendar,
  Video,
  Image as ImageIcon,
  Sparkles,
  ArrowRight,
  Bell,
  Church,
  ChevronDown,
  Heart,
  Baby,
  Activity,
  FileText,
  Flame,
  PlusCircle,
  MapPin,
} from 'lucide-react';

interface HomePageProps {
  data: FestivalData;
  isTelugu: boolean;
  searchQuery: string;
}

export const HomePage: React.FC<HomePageProps> = ({ data, isTelugu, searchQuery }) => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

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
    <main className="flex-grow">
      {/* Dynamic SEO Metadata for Homepage */}
      <SeoHead
        title={
          isTelugu
            ? 'వేమండ (Vemanda) - గ్రామ అధికారిక సమాచారం & జపమాల మహోత్సవాలు | Unguturu, PIN 521311'
            : 'Vemanda (వేమండ) - Official Village, Unguturu Mandal & Festival Portal | PIN 521311'
        }
        description={
          isTelugu
            ? 'వేమండ (Vemanda) గ్రామం, ఉంగుటూరు మండలం, కృష్ణా జిల్లా, ఆంధ్రప్రదేశ్ (పిన్ కోడ్: 521311). ప్రసిద్ధ వేమండ జపమాల మాత క్షేత్ర వార్షిక మహోత్సవాలు (అక్టోబర్ 27-30), 4 పతాక ఆవిష్కరణలు, పూజలు, ప్రార్థనలు & రథోత్సవ సమగ్ర సమాచారం.'
            : 'Official portal for Vemanda (వేమండ) Village in Unguturu Mandal, Krishna District, Andhra Pradesh (PIN 521311), Ventrapragada Parish. Home of Vemanda Japamala Matha Shrine, Annual Festival (Oct 27-30), 4 sacred flags, mass schedule, prayer dashboard, and chariot procession.'
        }
        canonicalPath="/"
        keywords="Vemanda, వేమండ, Vemanda Village, Vemanda Unguturu, Vemanda Krishna District, Vemanda 521311, Unguturu Mandal, Ventrapragada, Indupalli, Vemanda Festival, Vemanda Japamala Matha, Vemanda Mahotsavalu"
      />

      {/* Majestic Hero Banner */}
      <section className="relative overflow-hidden pt-10 pb-16 md:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Left Column: Text & Actions */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs md:text-sm font-semibold mb-6 shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>
                  {isTelugu
                    ? `${data.villageTelugu}, ${data.parishTelugu} విచారణ`
                    : `${data.village} Village, ${data.parish} Parish`}
                </span>
                <span className="text-amber-400">•</span>
                <span>{isTelugu ? data.editionTelugu : data.edition}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-slate-900 tracking-tight mb-3">
                {isTelugu ? (
                  <>
                    <span className="block text-amber-700 text-xl sm:text-2xl md:text-3xl font-extrabold mb-1">
                      వేమండ
                    </span>
                    <span className="text-slate-800 text-lg sm:text-xl md:text-2xl font-bold">
                      జపమాల మాత గృహ ప్రతిష్ట
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block text-amber-700 text-xl sm:text-2xl md:text-3xl font-extrabold mb-1">
                      Vemanda
                    </span>
                    <span className="text-slate-800 text-lg sm:text-xl md:text-2xl font-bold">
                      Japamala Matha Annual Feast
                    </span>
                  </>
                )}
              </h1>

              {/* Scripture Banner */}
              <div className="max-w-2xl my-5 p-4 rounded-2xl bg-amber-50/80 border-l-4 border-amber-500 text-amber-900 text-sm md:text-base italic shadow-xs">
                {isTelugu ? data.scriptureTelugu : data.scripture}
              </div>

              {/* Date Callout */}
              <p className="text-xl md:text-2xl font-bold text-blue-700 mb-6">
                {isTelugu ? data.dates.displayTelugu : data.dates.display}
              </p>

              {/* Quick Route Navigation Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
                <Link
                  to="/flags"
                  className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs md:text-sm shadow-md transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <Flag className="w-4 h-4" />
                  {isTelugu ? '4 పతాక ఆవిష్కరణలు' : '4 Sacred Flags'}
                </Link>
                <Link
                  to="/schedule"
                  className="px-5 py-2.5 rounded-full bg-white border border-slate-300 hover:border-blue-500 text-slate-800 font-bold text-xs md:text-sm shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <Calendar className="w-4 h-4 text-blue-600" />
                  {isTelugu ? 'కార్యక్రమ వివరాలు' : 'Daily Schedule'}
                </Link>
                <Link
                  to="/prayers"
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs md:text-sm shadow-md transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{isTelugu ? 'ప్రార్థనా విన్నపాలు' : 'Prayer Petitions'}</span>
                </Link>
                <Link
                  to="/videos"
                  className="px-5 py-2.5 rounded-full bg-white border border-slate-300 hover:border-red-500 text-slate-800 font-bold text-xs md:text-sm shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <Video className="w-4 h-4 text-red-600" />
                  {isTelugu ? 'వీడియోలు (5)' : 'Videos (5)'}
                </Link>
                <Link
                  to="/gallery"
                  className="px-5 py-2.5 rounded-full bg-white border border-slate-300 hover:border-emerald-500 text-slate-800 font-bold text-xs md:text-sm shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  {isTelugu ? 'చిత్ర మాలిక (13)' : 'Gallery (13)'}
                </Link>
                <Link
                  to="/notices"
                  className="px-5 py-2.5 rounded-full bg-white border border-slate-300 hover:border-amber-500 text-slate-800 font-bold text-xs md:text-sm shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <Bell className="w-4 h-4 text-amber-600" />
                  {isTelugu ? 'ముఖ్య గమనికలు' : 'Notices & FAQ'}
                </Link>
              </div>

              {/* 4 Stats Cards with Direct Route Links */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Link
                  to="/flags"
                  className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 shadow-sm text-center transition-all hover:shadow group"
                >
                  <div className="text-2xl font-extrabold text-amber-600 group-hover:scale-105 transition-transform">
                    4
                  </div>
                  <div className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider">
                    {isTelugu ? 'పవిత్ర పతాకాలు' : 'Sacred Flags'}
                  </div>
                </Link>
                <Link
                  to="/schedule"
                  className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 shadow-sm text-center transition-all hover:shadow group"
                >
                  <div className="text-2xl font-extrabold text-blue-600 group-hover:scale-105 transition-transform">
                    4
                  </div>
                  <div className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider">
                    {isTelugu ? 'మహోత్సవ దినాలు' : 'Festival Days'}
                  </div>
                </Link>
                <Link
                  to="/videos"
                  className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-red-400 shadow-sm text-center transition-all hover:shadow group"
                >
                  <div className="text-2xl font-extrabold text-red-600 group-hover:scale-105 transition-transform">
                    5
                  </div>
                  <div className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider">
                    {isTelugu ? 'ప్రత్యక్ష వీడియోలు' : 'Video Clips'}
                  </div>
                </Link>
                <Link
                  to="/gallery"
                  className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 shadow-sm text-center transition-all hover:shadow group"
                >
                  <div className="text-2xl font-extrabold text-emerald-600 group-hover:scale-105 transition-transform">
                    13
                  </div>
                  <div className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider">
                    {isTelugu ? 'హై-రెస్ చిత్రాలు' : 'High-Res Photos'}
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Column: Featured Shrine Image Card */}
            <div className="lg:w-96 flex-shrink-0">
              <div className="relative rounded-3xl overflow-hidden bg-white p-3 border border-slate-200 shadow-2xl">
                <img
                  src="/images/hero-shrine-background.jpeg"
                  alt={
                    isTelugu
                      ? 'వేమండ జపమాల మాత క్షేత్రం - రాత్రి వేళ దీపాలంకరణతో ధ్వజస్తంభం | Vemanda Festival'
                      : 'Vemanda Japamala Matha Shrine - Illuminated Sacred Flag Mast at Night | Vemanda Festival'
                  }
                  className="w-full h-auto max-h-[460px] object-cover rounded-2xl shadow-md"
                  loading="eager"
                  decoding="async"
                />
                <div className="mt-3 text-center">
                  <h4 className="text-sm font-bold text-slate-900">
                    {isTelugu
                      ? 'విద్యుద్దీప శోభిత ధ్వజస్తంభం & జపమాల మహోత్సవాలు'
                      : 'Illuminated Flag Pole & Japamala Matha Shrine'}
                  </h4>
                  <p className="text-xs text-amber-800 font-medium">
                    {isTelugu ? 'వేమండ గ్రామము' : 'Vemanda Village'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections with Links to Dedicated Pages */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16 py-10">
        {/* Comprehensive SEO Content Section: About Vemanda Village & The Japamala Matha Feast */}
        <section id="about-vemanda" className="rounded-3xl bg-white border border-slate-200 p-6 md:p-10 shadow-sm space-y-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-xs">
              <Church className="w-4 h-4 text-amber-600" />
              <span>{isTelugu ? 'వేమండ క్షేత్ర విశేషాలు' : 'About Vemanda & Sacred Feast'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isTelugu
                ? 'వేమండ జపమాల మాత క్షేత్ర చరిత్ర & వార్షిక మహోత్సవ వైభవం'
                : 'Vemanda Japamala Matha Shrine: History, Traditions & Annual Festival'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isTelugu
                ? 'ఆంధ్రప్రదేశ్ రాష్ట్రం, కృష్ణా జిల్లాలోని పవిత్ర పుణ్యక్షేత్రం వేమండ. వెంట్రప్రగడ విచారణ పరిధిలోని ఈ దివ్య గ్రామంలో ప్రతి సంవత్సరం అక్టోబర్ 27 నుండి 30 వరకు జపమాల మాత వార్షిక మహోత్సవాలు అత్యంత భక్తి ప్రపత్తులతో నిర్వహించబడతాయి.'
                : 'Vemanda is a renowned pilgrim village located in Ventrapragada Parish, Krishna District, Andhra Pradesh. Every year from October 27 to October 30, the sacred Annual Feast of Japamala Matha (Our Lady of the Rosary) is celebrated with solemn Catholic traditions and community devotion.'}
            </p>
          </div>

          {/* Google Knowledge Panel Style Key Details Card for Vemanda Village */}
          <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-amber-700" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {isTelugu ? 'వేమండ గ్రామ భౌగోళిక వివరాలు (Vemanda Village Key Details)' : 'Vemanda Village Key Details & Geography'}
              </h3>
            </div>
            <p className="text-xs text-slate-700 mb-4 leading-relaxed">
              {isTelugu
                ? 'వేమండ (Vemanda) ఆంధ్రప్రదేశ్ రాష్ట్రం, కృష్ణా జిల్లాలోని ఉంగుటూరు మండలంలో ఉన్న ప్రసిద్ధ గ్రామం (పిన్ కోడ్: 521311). చారిత్రక వెంట్రప్రగడ ఆర్.సి.యం. విచారణ పరిధిలోని ఈ గ్రామం ప్రముఖ జపమాల మాత పుణ్యక్షేత్రం మరియు అక్టోబర్ 27-30 వార్షిక మహోత్సవాలకు కేంద్ర బిందువు.'
                : 'Vemanda is a prominent village in Unguturu Mandal of Krishna District in Andhra Pradesh, India (PIN Code: 521311). Located under the historical Ventrapragada Parish, Vemanda is globally renowned for the sacred Japamala Matha Shrine and its Annual Feast celebrated every October 27 to 30.'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">{isTelugu ? 'గ్రామం' : 'Village'}</span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm">Vemanda (వేమండ)</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">{isTelugu ? 'మండలం' : 'Mandal'}</span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm">Unguturu (ఉంగుటూరు)</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">{isTelugu ? 'జిల్లా & రాష్ట్రం' : 'District'}</span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm">Krishna, AP</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">{isTelugu ? 'పిన్ కోడ్' : 'Postal Code'}</span>
                <span className="font-bold text-amber-700 text-xs sm:text-sm">521311</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">{isTelugu ? 'విచారణ' : 'Parish'}</span>
                <span className="font-bold text-blue-700 text-xs sm:text-sm">Ventrapragada</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">{isTelugu ? 'ప్రధాన పండుగ' : 'Major Feast'}</span>
                <span className="font-bold text-rose-700 text-xs sm:text-sm">Oct 27 - 30</span>
              </div>
            </div>
          </div>

          {/* 3 Pillar Cards: Vemanda Village, Japamala Matha Shrine, Sacred Festival Traditions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Vemanda Village & Parish */}
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-amber-400 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {isTelugu ? 'వేమండ గ్రామము (Vemanda Village)' : 'Vemanda Village & Parish'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isTelugu
                  ? 'కృష్ణా జిల్లా, వెంట్రప్రగడ ఆర్.సి.యం. విచారణ పరిధిలోని వేమండ గ్రామం భక్తి విశ్వాసాలకు నిలయం. మరియమాత అనుగ్రహం కోసం రాష్ట్రవ్యాప్తంగా పలు ప్రాంతాల నుండి భక్తులు వేమండ మహోత్సవాలకు విచ్చేస్తారు.'
                  : 'Nestled in Krishna District under the historical R.C.M. Church Ventrapragada Parish jurisdiction, Vemanda Village is a vibrant pilgrimage center drawing thousands of Catholic families, pilgrims, and devotees across Andhra Pradesh.'}
              </p>
            </div>

            {/* 2. Vemanda Japamala Matha Shrine */}
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-blue-400 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {isTelugu ? 'జపమాల మాత క్షేత్ర విశిష్టత' : 'Vemanda Japamala Matha Shrine'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isTelugu
                  ? '"తరతరముల వారు నన్ను ధన్యురాలని పిలిచెదరు" (లూకా 1:48) అనే దివ్య లేఖన ప్రేరణతో నిర్మించబడిన ఈ క్షేత్రంలో జపమాల మాత తల్లి భక్తుల మొరలను ఆలకించి కోరిన వరాలను అనుగ్రహించే కరుణామయిగా ప్రసిద్ధి చెందింది.'
                  : 'Inspired by the sacred scripture "All generations will call me blessed" (Luke 1:48), the Vemanda Japamala Matha Shrine stands as a lighthouse of intercessory prayer, maternal grace, and divine solace for all who seek Mother Mary’s blessing.'}
              </p>
            </div>

            {/* 3. Sacred Festival & Traditions */}
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-emerald-400 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {isTelugu ? '4 దినాల మహోత్సవ విశేషాలు' : '4-Day Annual Festival Events'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isTelugu
                  ? 'అక్టోబర్ 27న పవిత్ర స్థూప ప్రతిష్ఠ, మొదటి పతాకంతో ప్రారంభమై, ప్రతిరోజు ఉదయం 8:00 గంటలకు ఆర్.సి.యం. దేవాలయం నుండి మేళతాళాలతో మరిమాత పతాక ఊరేగింపు, అక్టోబర్ 30న సమిష్టి దివ్యబలిపూజ & మహా తేరు రథోత్సవంతో వేడుకలు ముగుస్తాయి.'
                  : 'Beginning on Oct 27 with Stupa blessing & 1st Flag Hoisting, continuing with daily 8 AM musical flag processions from RCM Church, and culminating on Oct 30 with Concelebrated High Mass and the Grand Chariot (Theru) Street Procession.'}
              </p>
            </div>
          </div>

          {/* Informative Highlights Strip */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-slate-50 to-blue-50 border border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">
                🚩
              </div>
              <div>
                <span className="font-bold text-slate-900 block">{isTelugu ? '4 పవిత్ర పతాకాలు' : '4 Sacred Flags'}</span>
                <span className="text-slate-500">{isTelugu ? 'అక్టోబర్ 27-30 ఆవిష్కరణలు' : 'October 27-30 Hoistings'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center shrink-0 font-bold">
                🤰
              </div>
              <div>
                <span className="font-bold text-slate-900 block">{isTelugu ? 'సంతాన & సుఖ ప్రసవం' : 'Pregnancy Blessings'}</span>
                <span className="text-slate-500">{isTelugu ? 'ప్రత్యేక ప్రార్థనా విన్నపాలు' : 'Dedicated Petitions'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 font-bold">
                🛕
              </div>
              <div>
                <span className="font-bold text-slate-900 block">{isTelugu ? 'మహా తేరు రథోత్సవం' : 'Grand Chariot (Theru)'}</span>
                <span className="text-slate-500">{isTelugu ? 'అక్టోబర్ 30 సా॥ 4:00 గం॥లకు' : 'Oct 30 at 4:00 PM'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 font-bold">
                🎵
              </div>
              <div>
                <span className="font-bold text-slate-900 block">{isTelugu ? 'వేమండ గాయక బృందం' : 'Vemanda Choir Team'}</span>
                <span className="text-slate-500">{isTelugu ? 'భక్తి సంకీర్తనల సమర్పణ' : 'Sacred Liturgical Hymns'}</span>
              </div>
            </div>
          </div>
        </section>
        {/* Featured Section: Devotee Prayer Petitions Dashboard & Highlights */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-emerald-500/10 border-2 border-amber-300/80 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-amber-300 text-amber-900 text-xs font-bold shadow-xs">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>
                  {isTelugu
                    ? 'మరియమాత సన్నిధిలో ప్రార్థనా విన్నపాలు'
                    : 'Prayer Petitions to Mother Mary'}
                </span>
                <span className="text-amber-400">•</span>
                <span className="text-rose-700 font-extrabold">
                  {isTelugu ? 'గర్భిణీలు & స్వస్థత విభాగం' : 'Pregnancy & Health Focus'}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                {isTelugu
                  ? 'సంతాన భాగ్యం, సుఖ ప్రసవం & రోగ నివారణ స్వస్థత ప్రార్థనలు'
                  : 'Special Blessings for Pregnancy, Childbirth & Divine Healing'}
              </h2>
              <p className="text-xs md:text-sm text-slate-600 max-w-2xl leading-relaxed">
                {isTelugu
                  ? 'మీ కుటుంబంలో ఎవరైనా గర్భిణీగా ఉన్నారా లేదా అనారోగ్యంతో బాధపడుతున్నారా? మీ విన్నపాలు పంపండి. ఇవి పవిత్ర దివ్యబలిపూజలో మరియు రథోత్సవంలో సమర్పించబడతాయి మరియు Word డాక్యుమెంట్‌గా డౌన్‌లోడ్ చేయవచ్చు.'
                  : 'Submit your prayer intentions for expectant mothers, childbirth blessings, and health recovery. View all devotee prayers on the live dashboard and export as printable Word documents.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                to="/prayers"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs md:text-sm shadow-md transition-all flex items-center gap-2 active:scale-95"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{isTelugu ? 'ప్రార్థన డాష్‌బోర్డ్ తెరవండి' : 'Open Prayer Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 1: The 4 Sacred Flags */}
        <section id="flags" className="relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              {isTelugu ? 'విభాగం 1' : 'Section 1'}
            </span>
            <Link
              to="/flags"
              className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 group"
            >
              <span>{isTelugu ? 'పూర్తి పతాక పేజీ చూడండి' : 'Dedicated Flags Page'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <FlagsShowcase flags={data.flags} isTelugu={isTelugu} searchQuery={searchQuery} />
        </section>

        {/* Section 2: Day-by-Day Schedule Timeline */}
        <section id="schedule" className="relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              {isTelugu ? 'విభాగం 2' : 'Section 2'}
            </span>
            <Link
              to="/schedule"
              className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 group"
            >
              <span>{isTelugu ? 'పూర్తి కార్యక్రమ పేజీ చూడండి' : 'Dedicated Schedule Page'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <ScheduleTimeline
            schedule={data.schedule}
            dailyTradition={data.dailyTradition}
            isTelugu={isTelugu}
            searchQuery={searchQuery}
          />
        </section>

        {/* Section 3: Video Experience Center */}
        <section id="videos" className="relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-red-700 uppercase tracking-widest">
              {isTelugu ? 'విభాగం 3' : 'Section 3'}
            </span>
            <Link
              to="/videos"
              className="text-xs font-bold text-red-700 hover:text-red-900 flex items-center gap-1 group"
            >
              <span>{isTelugu ? 'పూర్తి వీడియో పేజీ చూడండి' : 'Dedicated Videos Page'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <VideoExperience videos={data.videos} isTelugu={isTelugu} searchQuery={searchQuery} />
        </section>

        {/* Section 4: Photo Gallery & Lightbox */}
        <section id="gallery" className="relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
              {isTelugu ? 'విభాగం 4' : 'Section 4'}
            </span>
            <Link
              to="/gallery"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 group"
            >
              <span>{isTelugu ? 'పూర్తి చిత్ర మాలిక పేజీ చూడండి' : 'Dedicated Gallery Page'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <GalleryLightbox gallery={data.gallery} isTelugu={isTelugu} searchQuery={searchQuery} />
        </section>

        {/* Section 5: Devotional FAQ & Quick Answers */}
        <section id="faq" className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Church className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isTelugu ? 'భక్తుల సందేహాలు & విశేషాలు (FAQ)' : 'Frequently Asked Questions (FAQ)'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isTelugu
                    ? 'వేమండ జపమాల మహోత్సవాల ముఖ్య సమాచారం'
                    : 'Key details about the annual shrine celebrations'}
                </p>
              </div>
            </div>
            <Link
              to="/notices"
              className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1"
            >
              <span>{isTelugu ? 'అన్ని గమనికలు' : 'View All Notices'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all bg-slate-50/50"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-xs md:text-sm text-slate-800 hover:text-amber-800 transition-colors"
                  >
                    <span>{isTelugu ? faq.qTe : faq.qEn}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform ${
                        isOpen ? 'rotate-180 text-amber-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white pt-3">
                      {isTelugu ? faq.aTe : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};

