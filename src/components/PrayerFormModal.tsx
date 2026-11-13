import React, { useState } from 'react';
import {
  X,
  Send,
  Heart,
  Baby,
  Activity,
  Home as HomeIcon,
  Sparkles,
  GraduationCap,
  HeartHandshake,
  CheckCircle2,
  Sparkle,
} from 'lucide-react';
import { PrayerCategory, PRAYER_CATEGORIES, PrayerRequest } from '../types/prayer';
import { addPrayerRequest } from '../utils/prayerStorage';

interface PrayerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  isTelugu: boolean;
  onSuccess: (newPrayer: PrayerRequest) => void;
  defaultCategory?: PrayerCategory;
}

export const PrayerFormModal: React.FC<PrayerFormModalProps> = ({
  isOpen,
  onClose,
  isTelugu,
  onSuccess,
  defaultCategory = 'pregnancy',
}) => {
  const [name, setName] = useState('');
  const [village, setVillage] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<PrayerCategory>(defaultCategory);
  const [title, setTitle] = useState('');
  const [prayer, setPrayer] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(isTelugu ? 'దయచేసి మీ పేరు నమోదు చేయండి' : 'Please enter your name');
      return;
    }
    if (!village.trim()) {
      setError(isTelugu ? 'దయచేసి మీ గ్రామం లేదా ఊరి పేరు నమోదు చేయండి' : 'Please enter your village/town');
      return;
    }
    if (!prayer.trim()) {
      setError(isTelugu ? 'దయచేసి ప్రార్థనా విన్నపాన్ని వివరించండి' : 'Please enter prayer intention details');
      return;
    }

    const defaultTitles: Record<PrayerCategory, { te: string; en: string }> = {
      pregnancy: {
        te: 'గర్భస్థ శిశువు క్షేమం & సుఖ ప్రసవం కొరకు',
        en: 'Safe Delivery & Blessing of Child',
      },
      health: {
        te: 'శారీరక స్వస్థత & రోగ నివారణ కొరకు',
        en: 'Health Restoration & Divine Healing',
      },
      family: {
        te: 'కుటుంబ సమాధానం & శాంతి కొరకు',
        en: 'Family Peace & Unity',
      },
      thanksgiving: {
        te: 'మరియమాతకు కృతజ్ఞతా స్తుతులు',
        en: 'Thanksgiving for Answered Prayer',
      },
      education: {
        te: 'చదువు, పరీక్షలు & ఉద్యోగ ప్రాప్తి కొరకు',
        en: 'Education & Employment Blessings',
      },
      special: {
        te: 'ప్రత్యేక దైవ సంరక్షణ విన్నపం',
        en: 'Special Divine Intercession',
      },
    };

    const finalTitle = title.trim() || (isTelugu ? defaultTitles[category].te : defaultTitles[category].en);

    // Formatted current Telugu date label (e.g. "అక్టోబర్ 27")
    const monthsTe = ['జనవరి', 'ఫిబ్రవరి', 'మార్చి', 'ఏప్రిల్', 'మే', 'జూన్', 'జూలై', 'ఆగస్టు', 'సెప్టెంబర్', 'అక్టోబర్', 'నవంబర్', 'డిసెంబర్'];
    const now = new Date();
    const dateLabel = isTelugu
      ? `${monthsTe[now.getMonth()]} ${now.getDate()}`
      : `${now.toLocaleString('default', { month: 'short' })} ${now.getDate()}`;

    const newPrayer = addPrayerRequest({
      name: name.trim(),
      village: village.trim(),
      phone: phone.trim() || undefined,
      category,
      title: finalTitle,
      prayer: prayer.trim(),
      date: dateLabel,
      isUrgent: category === 'pregnancy' || category === 'health' ? isUrgent || true : isUrgent,
    });

    setSubmitted(true);
    onSuccess(newPrayer);
  };

  const handleResetAndClose = () => {
    setName('');
    setVillage('');
    setPhone('');
    setTitle('');
    setPrayer('');
    setError('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden my-6 animate-scaleUp">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
              <Heart className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold tracking-tight">
                {isTelugu ? 'జపమాల మాతకు ప్రార్థనా విన్నపం' : 'Submit Prayer Petition to Japamala Matha'}
              </h2>
              <p className="text-xs text-amber-100 font-medium">
                {isTelugu
                  ? 'సంతాన భాగ్యం, గర్భిణీ స్త్రీల క్షేమం & శారీరక స్వస్థత కొరకు ప్రత్యేక విన్నపాలు'
                  : 'Special petitions for pregnancy, safe delivery, childbirth & divine healing'}
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {isTelugu ? 'మీ ప్రార్థనా విన్నపం విజయవంతంగా సమర్పించబడింది!' : 'Prayer Petition Submitted Successfully!'}
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              {isTelugu
                ? 'మీ విన్నపం వేమండ జపమాల మాత పాదాల చెంత చేరింది. రాబోవు దివ్యబలిపూజలో మరియు రథోత్సవంలో ఈ ప్రార్థనలు సమర్పించబడును. మీ ప్రార్థన డాష్‌బోర్డ్‌లో కూడా కనిపిస్తుంది.'
                : 'Your petition has been recorded at the feet of Our Lady of the Rosary. It is now visible on the prayer dashboard and will be offered during Holy Mass and processions.'}
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                {isTelugu ? 'డాష్‌బోర్డ్ చూడండి' : 'View on Dashboard'}
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Prominent Callout Banner for Pregnancy & Health */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-50 via-amber-50 to-emerald-50 border border-amber-200/80 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-amber-900">
                  {isTelugu ? 'ముఖ్య సూచన: ' : 'Highlight: '}
                </span>
                {isTelugu
                  ? 'గర్భవతులు, సుఖ ప్రసవం, సంతాన భాగ్యం మరియు దీర్ఘకాలిక వ్యాధుల నుండి స్వస్థత కోరేవారు క్రింద ప్రత్యేక వర్గాన్ని ఎంచుకోవచ్చు. మీ విన్నపాలు ప్రత్యేక విభాగంలో ప్రముఖంగా ప్రదర్శించబడతాయి.'
                  : 'Special highlight for pregnancy, safe childbirth, blessing of children, and health/healing from chronic illnesses. These petitions are given dedicated focus on the shrine altar.'}
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                ⚠️ {error}
              </div>
            )}

            {/* Category Selection with Highlighting */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {isTelugu ? 'ప్రార్థనా వర్గం ఎంచుకోండి *' : 'Select Prayer Category *'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* 1. Pregnancy (Highlighted) */}
                <button
                  type="button"
                  onClick={() => setCategory('pregnancy')}
                  className={`p-3 rounded-2xl border text-left transition-all relative flex items-start gap-3 ${
                    category === 'pregnancy'
                      ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-300 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-rose-300 hover:bg-rose-50/40'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Baby className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">
                        {isTelugu ? 'సంతాన భాగ్యం & సుఖ ప్రసవం' : 'Pregnancy & Childbirth'}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-200 text-rose-900 uppercase">
                        {isTelugu ? 'ముఖ్యమైనది' : 'Special'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {isTelugu ? 'గర్భిణీలు, సుఖ ప్రసవం, సంతానం' : 'Safe delivery, conception & babies'}
                    </p>
                  </div>
                </button>

                {/* 2. Health & Healing (Highlighted) */}
                <button
                  type="button"
                  onClick={() => setCategory('health')}
                  className={`p-3 rounded-2xl border text-left transition-all relative flex items-start gap-3 ${
                    category === 'health'
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">
                        {isTelugu ? 'ఆరోగ్యం & స్వస్థత' : 'Health & Healing'}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 uppercase">
                        {isTelugu ? 'ముఖ్యమైనది' : 'Special'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {isTelugu ? 'శస్త్రచికిత్సలు, రోగ నివారణ' : 'Sickness relief, surgery healing'}
                    </p>
                  </div>
                </button>

                {/* 3. Family */}
                <button
                  type="button"
                  onClick={() => setCategory('family')}
                  className={`p-2.5 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                    category === 'family'
                      ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center shrink-0">
                    <HomeIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {isTelugu ? 'కుటుంబ శాంతి & సమాధానం' : 'Family Peace & Unity'}
                  </span>
                </button>

                {/* 4. Thanksgiving */}
                <button
                  type="button"
                  onClick={() => setCategory('thanksgiving')}
                  className={`p-2.5 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                    category === 'thanksgiving'
                      ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-200'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {isTelugu ? 'కృతజ్ఞతాస్తుతులు & సాక్ష్యాలు' : 'Thanksgiving & Praises'}
                  </span>
                </button>

                {/* 5. Education & Job */}
                <button
                  type="button"
                  onClick={() => setCategory('education')}
                  className={`p-2.5 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                    category === 'education'
                      ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-200'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-500 text-white flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {isTelugu ? 'విద్య & ఉద్యోగ ప్రాప్తి' : 'Education & Career'}
                  </span>
                </button>

                {/* 6. Special */}
                <button
                  type="button"
                  onClick={() => setCategory('special')}
                  className={`p-2.5 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                    category === 'special'
                      ? 'bg-slate-100 border-slate-500 ring-2 ring-slate-300'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-600 text-white flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {isTelugu ? 'ప్రత్యేక విన్నపాలు' : 'Special Intentions'}
                  </span>
                </button>
              </div>
            </div>

            {/* Devotee Info: Name & Village */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isTelugu ? 'భక్తుని పేరు (లేదా కుటుంబం) *' : 'Devotee / Family Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder={isTelugu ? 'ఉదా: అనిత & రమేష్' : 'e.g., Anitha & Ramesh'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 transition-all bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isTelugu ? 'గ్రామం / ఊరు *' : 'Village / Town *'}
                </label>
                <input
                  type="text"
                  required
                  value={village}
                  onChange={(e) => {
                    setVillage(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder={isTelugu ? 'ఉదా: వేమండ / వెంట్రప్రగడ' : 'e.g., Vemanda / Gudivada'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 transition-all bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Phone & Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isTelugu ? 'ఫోన్ నంబర్ (ఐచ్ఛికం)' : 'Phone Number (Optional)'}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={isTelugu ? 'ఫోన్ నంబర్' : 'Contact number'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 transition-all bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isTelugu ? 'విన్నపం శీర్షిక (ఐచ్ఛికం)' : 'Petition Title (Optional)'}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={
                    category === 'pregnancy'
                      ? isTelugu
                        ? 'సుఖ ప్రసవం & గర్భస్థ శిశువు క్షేమం'
                        : 'Safe Delivery & Child Blessing'
                      : category === 'health'
                      ? isTelugu
                        ? 'తీవ్ర అనారోగ్యం నుండి సంపూర్ణ స్వస్థత'
                        : 'Health Restoration & Surgery Success'
                      : isTelugu
                      ? 'శీర్షిక'
                      : 'Petition Title'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 transition-all bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Prayer Details Textarea */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isTelugu ? 'ప్రార్థనా విన్నపం వివరాలు *' : 'Prayer Petition Details *'}
              </label>
              <textarea
                required
                rows={4}
                value={prayer}
                onChange={(e) => {
                  setPrayer(e.target.value);
                  if (error) setError('');
                }}
                placeholder={
                  category === 'pregnancy'
                    ? isTelugu
                      ? 'గర్భవతిగా ఉన్న నాకు ఎలాంటి ఇబ్బందులు లేకుండా సుఖ ప్రసవం జరగాలని, బిడ్డ సంపూర్ణ ఆయురారోగ్యాలతో జన్మించాలని జపమాల మాతను వేడుకొనుచున్నాను...'
                      : 'Praying for safe delivery, protection of the expectant mother and healthy infant...'
                    : category === 'health'
                    ? isTelugu
                      ? 'దీర్ఘకాలిక వ్యాధి / శస్త్రచికిత్స నుండి సంపూర్ణ స్వస్థత చేకూరాలని మరియమాత మధ్యవర్తిత్వంలో ప్రార్థిస్తున్నాను...'
                      : 'Praying for divine healing, surgery success, and physical strength...'
                    : isTelugu
                    ? 'మీ ప్రార్థనా విన్నపాన్ని భక్తితో ఇక్కడ రాయండి...'
                    : 'Write your heartfelt prayer petition here...'
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 transition-all bg-slate-50 focus:bg-white leading-relaxed"
              />
            </div>

            {/* Submit Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-5 py-2 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors"
              >
                {isTelugu ? 'రద్దు చేయి' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isTelugu ? 'విన్నపం సమర్పించండి' : 'Submit Prayer'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
