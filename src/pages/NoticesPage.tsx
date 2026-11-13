import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FestivalData } from '../types/festival';
import { SeoHead } from '../components/SeoHead';
import {
  Bell,
  ChevronRight,
  Home,
  MapPin,
  Shield,
  Music,
  ChevronDown,
  Church,
  Calendar,
  Flag,
  Video,
  Image as ImageIcon,
} from 'lucide-react';

interface NoticesPageProps {
  data: FestivalData;
  isTelugu: boolean;
  searchQuery: string;
}

export const NoticesPage: React.FC<NoticesPageProps> = ({ data, isTelugu, searchQuery }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  const filteredNotices = data.notices.filter((n) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      n.text.toLowerCase().includes(q) ||
      n.textTelugu.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex-grow py-8 max-w-7xl mx-auto px-4 md:px-8">
      <SeoHead
        title={
          isTelugu
            ? 'వేమండ ముఖ్య గమనికలు, నిబంధనలు & FAQ | Vemanda Festival Notices'
            : 'Vemanda Festival Notices, Devotee Guidelines & FAQ | Vemanda Feast'
        }
        description={
          isTelugu
            ? 'వేమండ జపమాల మాత క్షేత్ర వార్షిక మహోత్సవాల భక్తుల గమనికలు, క్రమశిక్షణా నియమాలు, వెంట్రప్రగడ విచారణ పరిధి మరియు తరచుగా అడిగే ప్రశ్నలు (FAQ).'
            : 'Important notices, pilgrim guidelines, discipline rules, parish jurisdiction, and devotional FAQs for Vemanda Japamala Matha Shrine Annual Festival in Vemanda Village.'
        }
        canonicalPath="/notices"
        keywords="Vemanda, Vemanda Notices, Vemanda FAQ, Vemanda Japamala Matha Guidelines, వేమండ, గమనికలు, Vemanda Village"
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link to="/" className="hover:text-amber-800 flex items-center gap-1 font-medium transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>{isTelugu ? 'హోమ్' : 'Home'}</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-amber-800 font-bold">
          {isTelugu ? 'ముఖ్య గమనికలు & సమాచారం' : 'Notices & Devotee Information'}
        </span>
      </nav>

      {/* Page Header Banner */}
      <div className="mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-3">
              <Bell className="w-3.5 h-3.5 text-amber-700" />
              <span>{isTelugu ? 'భక్తుల మార్గదర్శకాలు' : 'Devotee Guidelines & Information'}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isTelugu ? 'ముఖ్య గమనికలు & సూచనలు' : 'Important Notices & Guidelines'}
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              {isTelugu
                ? 'ఉత్సవాలలో పాల్గొనే భక్తులు పాటించవలసిన క్రమశిక్షణా నియమావళి, పవిత్ర సంకీర్తనల వివరాలు మరియు క్షేత్ర చిరునామా.'
                : 'Essential guidelines for devotees attending the feast, devotional choir arrangements, and official shrine jurisdiction.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to="/flags"
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-amber-400 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Flag className="w-3.5 h-3.5 text-amber-600" />
              <span>{isTelugu ? '4 పతాకాలు' : 'Sacred Flags'}</span>
            </Link>
            <Link
              to="/schedule"
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-blue-400 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>{isTelugu ? 'కార్యక్రమ పట్టిక' : 'Schedule'}</span>
            </Link>
            <Link
              to="/videos"
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-red-400 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Video className="w-3.5 h-3.5 text-red-600" />
              <span>{isTelugu ? 'వీడియోలు' : 'Videos'}</span>
            </Link>
            <Link
              to="/gallery"
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-emerald-400 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isTelugu ? 'చిత్రాలు' : 'Photos'}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Notices & FAQs */}
        <div className="lg:col-span-2 space-y-8">
          {/* Notices Section */}
          <section className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-base mb-4">
              <Bell className="w-5 h-5 text-amber-600" />
              <h3>{isTelugu ? 'గమనికల జాబితా' : 'Announcements & Rules'}</h3>
            </div>

            <div className="space-y-3">
              {filteredNotices.map((n) => (
                <div
                  key={n.id}
                  className="p-4 rounded-2xl bg-amber-50/50 border-l-4 border-amber-500 text-xs md:text-sm text-slate-700 leading-relaxed shadow-2xs"
                >
                  <p>{isTelugu ? n.textTelugu : n.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Devotional Choir Highlight */}
          <section className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-slate-900">
                  {isTelugu ? 'వేమండ గాయక బృందం దివ్య గానం' : 'Devotional Music by Vemanda Choir Team'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isTelugu ? 'మహోత్సవాల దివ్య సంకీర్తనలు' : 'Sacred Liturgical Singing & Devotional Hymns'}
                </p>
              </div>
            </div>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              {isTelugu
                ? 'పండుగ నాలుగు రోజులు జరిగే దివ్యబలిపూజలలో, దివ్యసత్ప్రసాద ఆరాధనలో మరియు మహా రథోత్సవంలో మరియమాత భక్తి గీతాలను, స్తోత్రములను వేమండ గాయక బృందం వారు భక్తి ప్రపత్తులతో సమర్పిస్తారు.'
                : 'Throughout the 4 festive days, all Holy Masses, Eucharistic adorations, and the street chariot processions are accompanied by melodious spiritual hymns and praises by the Vemanda Choir Team.'}
            </p>
          </section>

          {/* FAQ Accordion */}
          <section className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Church className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-slate-900">
                  {isTelugu ? 'తరచుగా అడిగే ప్రశ్నలు (FAQ)' : 'Frequently Asked Questions'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isTelugu
                    ? 'వేమండ క్షేత్ర మహోత్సవాల పూర్తి సమాచారం'
                    : 'Clear answers to common questions about the celebrations'}
                </p>
              </div>
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

        {/* Right Column: Location & Shrine Info */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <h4 className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-700" />
              <span>{isTelugu ? 'పుణ్యక్షేత్ర సమాచారం' : 'Shrine Information'}</span>
            </h4>
            <div className="space-y-4 text-xs text-slate-700">
              <div>
                <span className="font-bold block text-slate-900 mb-1">
                  {isTelugu ? 'గ్రామము & విచారణ:' : 'Village & Parish:'}
                </span>
                <p>
                  {isTelugu
                    ? `${data.villageTelugu} గ్రామము, ${data.parishTelugu} విచారణ, కృష్ణా జిల్లా, ఆంధ్రప్రదేశ్`
                    : `${data.village} Village, ${data.parish} Parish, Krishna District, Andhra Pradesh, India`}
                </p>
              </div>

              <div>
                <span className="font-bold block text-slate-900 mb-1">
                  {isTelugu ? 'దేవాలయ పరిధి:' : 'Parish Jurisdiction:'}
                </span>
                <div className="flex items-center gap-2 text-slate-600">
                  <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>
                    {isTelugu ? 'ఆర్.సి.యం. దేవాలయ పరిధి' : 'Under R.C.M. Church Parish Jurisdiction'}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-bold block text-slate-900 mb-1">
                  {isTelugu ? 'వార్షిక మహోత్సవ తేదీలు:' : 'Festival Dates:'}
                </span>
                <p className="font-bold text-blue-700">
                  {isTelugu ? data.dates.displayTelugu : data.dates.display}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden bg-white p-3 border border-slate-200 shadow-sm">
            <img
              src="/images/night-prayer-assembly-illuminated-shrine.jpeg"
              alt="Vemanda Night Prayer Assembly"
              className="w-full h-48 object-cover rounded-2xl mb-3"
            />
            <p className="text-center text-xs font-bold text-slate-800">
              {isTelugu ? 'రాత్రి వేళ ప్రార్థన సభ' : 'Night Prayer & Assembly'}
            </p>
            <p className="text-center text-[11px] text-slate-500">
              {isTelugu ? 'వేమండ జపమాల మాత సన్నిధి' : 'Japamala Matha Shrine, Vemanda'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

