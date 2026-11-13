import { PrayerRequest } from '../types/prayer';

const STORAGE_KEY = 'vemanda_prayer_requests_v1';

export const INITIAL_PRAYER_REQUESTS: PrayerRequest[] = [
  {
    id: 'pr-1',
    name: 'అనిత & రమేష్ (Anitha & Ramesh)',
    village: 'వేమండ (Vemanda)',
    phone: '9848xxxx12',
    category: 'pregnancy',
    title: 'గర్భస్థ శిశువు క్షేమం & సుఖ ప్రసవం కొరకు (Safe Delivery & Baby Health)',
    prayer:
      '7వ నెల గర్భవతిగా ఉన్న నాకు మరియు గర్భస్థ శిశువుకు సంపూర్ణ ఆరోగ్యం, ఎలాంటి ఆటంకాలు లేకుండా సుఖ ప్రసవం జరగాలని వేమండ జపమాల మాత పాదాల చెంత ప్రార్థిస్తున్నాను.',
    date: 'అక్టోబర్ 26',
    createdAt: Date.now() - 1000 * 60 * 60 * 20,
    amenCount: 28,
    isUrgent: true,
  },
  {
    id: 'pr-2',
    name: 'మేరీ ప్రియాంక (Mary Priyanka)',
    village: 'వెంట్రప్రగడ (Ventrapragada)',
    phone: '9440xxxx55',
    category: 'pregnancy',
    title: 'సంతాన భాగ్యం కొరకు విన్నపం (Blessing of a Child)',
    prayer:
      'వివాహమై 5 సంవత్సరాలు కావస్తున్నది. మాకు పవిత్రమైన సంతాన భాగ్యం అనుగ్రహించాలని, మాతృత్వపు ఆనందం ప్రసాదించాలని జపమాల మాత ప్రత్యేక ప్రార్థనలలో మమ్మల్ని జ్ఞాపకముంచుకోవాలని కోరుతున్నాను.',
    date: 'అక్టోబర్ 26',
    createdAt: Date.now() - 1000 * 60 * 60 * 18,
    amenCount: 35,
    isUrgent: true,
  },
  {
    id: 'pr-3',
    name: 'శోభారాణి (Shobha Rani)',
    village: 'గుడివాడ (Gudivada)',
    category: 'pregnancy',
    title: 'హై-రిస్క్ గర్భధారణలో దైవ సంరక్షణ (Protection during High-Risk Pregnancy)',
    prayer:
      'వైద్యులు హై-రిస్క్ ప్రెగ్నెన్సీగా చెప్పినందున ఎలాంటి సమస్యలు లేకుండా నవ మాసాలు సంపూర్ణంగా నిండి, ఆరోగ్యవంతమైన బిడ్డను చేతుల్లోకి తీసుకోవాలని జపమాల మాత తల్లిని వేడుకొనుచున్నాను.',
    date: 'అక్టోబర్ 27',
    createdAt: Date.now() - 1000 * 60 * 60 * 14,
    amenCount: 42,
    isUrgent: true,
  },
  {
    id: 'pr-4',
    name: 'జోసఫ్ & కుటుంబ సభ్యులు (Joseph & Family)',
    village: 'వేమండ (Vemanda)',
    phone: '9989xxxx78',
    category: 'health',
    title: 'తీవ్ర అనారోగ్యం & మోకాళ్ళ శస్త్రచికిత్స స్వస్థత (Severe Illness & Surgery Healing)',
    prayer:
      'గత కొన్ని నెలలుగా తీవ్ర అనారోగ్యంతో బాధపడుతున్న మా నాన్నగారికి జరగబోవు శస్త్రచికిత్స విజయవంతమై, త్వరగా సంపూర్ణ స్వస్థత చేకూరాలని మరియమాత విన్నపాలలో సమర్పిస్తున్నాము.',
    date: 'అక్టోబర్ 26',
    createdAt: Date.now() - 1000 * 60 * 60 * 16,
    amenCount: 31,
    isUrgent: true,
  },
  {
    id: 'pr-5',
    name: 'రోశమ్మ (Rosamma)',
    village: 'హనుమాన్ జంక్షన్ (Hanuman Junction)',
    category: 'health',
    title: 'క్యాన్సర్ వ్యాధిగ్రస్తులకు స్వస్థత కొరకు (Healing from Chronic Disease)',
    prayer:
      'కీమోథెరపీ చికిత్స పొందుతున్న మా సహోదరికి సంపూర్ణ స్వస్థత మరియు శరీరంలో నూతన బలం చేకూరాలని జపమాల మాత మహా పుణ్యక్షేత్రం వద్ద దివ్యబలిపూజలో ప్రార్థించవలసిందిగా కోరుతున్నాను.',
    date: 'అక్టోబర్ 27',
    createdAt: Date.now() - 1000 * 60 * 60 * 10,
    amenCount: 49,
    isUrgent: true,
  },
  {
    id: 'pr-6',
    name: 'కిరణ్ కుమార్ (Kiran Kumar)',
    village: 'ఉయ్యూరు (Vuyyuru)',
    phone: '9701xxxx33',
    category: 'health',
    title: 'గుండె జబ్బు నివారణ & ఆయురారోగ్యాలు (Cardiac Relief & Health Restoration)',
    prayer:
      'గుండె సంబంధిత వ్యాధితో బాధపడుతున్నాను. వైద్య చికిత్సలకు దేవుని స్వస్థతా హస్తం తోడై సాధారణ ఆరోగ్యంతో జీవించడానికి ప్రార్థన చేయవలసిందిగా మనవి.',
    date: 'అక్టోబర్ 27',
    createdAt: Date.now() - 1000 * 60 * 60 * 8,
    amenCount: 22,
  },
  {
    id: 'pr-7',
    name: 'మార్తా & కుటుంబ సభ్యులు (Martha & Family)',
    village: 'కంకిపాడు (Kankipadu)',
    category: 'family',
    title: 'కుటుంబంలో ఐక్యత & శాంతి సమాధానాలు (Family Unity & Peace)',
    prayer:
      'కుటుంబ సమస్యలు సమసిపోయి, గృహంలో సమాధానం మరియు దేవుని ఆశీర్వాదం నిలవాలని జపమాల మాతకు విన్నపము.',
    date: 'అక్టోబర్ 27',
    createdAt: Date.now() - 1000 * 60 * 60 * 6,
    amenCount: 19,
  },
  {
    id: 'pr-8',
    name: 'డేవిడ్ రాజు (David Raju)',
    village: 'వేమండ (Vemanda)',
    category: 'thanksgiving',
    title: 'గత సంవత్సరం చేసిన మేలుకు కృతజ్ఞతా స్తుతులు (Thanksgiving for Answered Prayer)',
    prayer:
      'గత మహోత్సవాలలో సంతానం కొరకు ప్రార్థించగా మరియమాత అనుగ్రహంతో పండంటి బాబు జన్మించాడు. మాతృదేవికి మా కుటుంబం తరపున కృతజ్ఞతాస్తుతులు అర్పిస్తున్నాము.',
    date: 'అక్టోబర్ 27',
    createdAt: Date.now() - 1000 * 60 * 60 * 4,
    amenCount: 56,
  },
  {
    id: 'pr-9',
    name: 'జాన్ బాబు (John Babu)',
    village: 'విజయవాడ (Vijayawada)',
    category: 'education',
    title: 'పోటీ పరీక్షలు & ప్రభుత్వ ఉద్యోగ ప్రాప్తి (Exams & Employment Success)',
    prayer:
      'రాయబోయే పోటీ పరీక్షలలో ఉత్తీర్ణత సాధించి, ఉద్యోగం లభించాలని వేమండ క్షేత్ర జపమాల మాత సన్నిధిలో ప్రార్థిస్తున్నాను.',
    date: 'అక్టోబర్ 27',
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    amenCount: 17,
  },
];

export const getStoredPrayerRequests = (): PrayerRequest[] => {
  if (typeof window === 'undefined') return INITIAL_PRAYER_REQUESTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRAYER_REQUESTS));
      return INITIAL_PRAYER_REQUESTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_PRAYER_REQUESTS;
  } catch (err) {
    console.error('Failed to load prayer requests from localStorage', err);
    return INITIAL_PRAYER_REQUESTS;
  }
};

export const savePrayerRequests = (requests: PrayerRequest[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  } catch (err) {
    console.error('Failed to save prayer requests to localStorage', err);
  }
};

export const addPrayerRequest = (
  newRequest: Omit<PrayerRequest, 'id' | 'createdAt' | 'amenCount'>
): PrayerRequest => {
  const current = getStoredPrayerRequests();
  const created: PrayerRequest = {
    ...newRequest,
    id: `pr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    createdAt: Date.now(),
    amenCount: 1,
  };
  const updated = [created, ...current];
  savePrayerRequests(updated);
  return created;
};

export const incrementAmenCount = (id: string): PrayerRequest[] => {
  const current = getStoredPrayerRequests();
  const updated = current.map((p) => {
    if (p.id === id) {
      return { ...p, amenCount: p.amenCount + 1 };
    }
    return p;
  });
  savePrayerRequests(updated);
  return updated;
};

