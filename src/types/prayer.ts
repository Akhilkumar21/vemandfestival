export type PrayerCategory =
  | 'pregnancy'
  | 'health'
  | 'family'
  | 'thanksgiving'
  | 'education'
  | 'special';

export interface PrayerCategoryMeta {
  id: PrayerCategory;
  labelEn: string;
  labelTe: string;
  iconName: string;
  badgeClass: string;
  highlighted?: boolean;
  descriptionEn: string;
  descriptionTe: string;
}

export interface PrayerRequest {
  id: string;
  name: string;
  village: string;
  phone?: string;
  category: PrayerCategory;
  title: string;
  prayer: string;
  date: string;
  createdAt: number;
  amenCount: number;
  isUrgent?: boolean;
}

export const PRAYER_CATEGORIES: Record<PrayerCategory, PrayerCategoryMeta> = {
  pregnancy: {
    id: 'pregnancy',
    labelEn: 'Pregnancy & Childbirth Blessings',
    labelTe: 'సంతాన భాగ్యం & సుఖ ప్రసవం',
    iconName: 'Baby',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300 ring-rose-200',
    highlighted: true,
    descriptionEn: 'Special intentions for expectant mothers, safe delivery, conception & infants',
    descriptionTe: 'గర్భిణీ స్త్రీల క్షేమం, సుఖ ప్రసవం మరియు సంతాన భాగ్యం కొరకు ప్రత్యేక ప్రార్థనలు',
  },
  health: {
    id: 'health',
    labelEn: 'Health & Healing / Illness Relief',
    labelTe: 'ఆరోగ్యం & రోగ నివారణ స్వస్థత',
    iconName: 'Activity',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 ring-emerald-200',
    highlighted: true,
    descriptionEn: 'Divine healing from sickness, surgeries, critical care & physical relief',
    descriptionTe: 'తీవ్ర అనారోగ్యాలు, ఆపరేషన్లు, దీర్ఘకాలిక వ్యాధుల నుండి స్వస్థత కొరకు ప్రార్థనలు',
  },
  family: {
    id: 'family',
    labelEn: 'Family Peace & Unity',
    labelTe: 'కుటుంబ శాంతి & సమాధానం',
    iconName: 'Home',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300 ring-blue-200',
    descriptionEn: 'Blessings for marriage, peace in households and overcoming disputes',
    descriptionTe: 'గృహాలలో శాంతి, అనురాగం, వివాహ బంధాలు బలపడటం కొరకు ప్రార్థనలు',
  },
  thanksgiving: {
    id: 'thanksgiving',
    labelEn: 'Thanksgiving & Praises',
    labelTe: 'కృతజ్ఞతాస్తుతులు & సాక్ష్యాలు',
    iconName: 'Sparkles',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300 ring-amber-200',
    descriptionEn: 'Grateful praise for prayers answered and blessings received',
    descriptionTe: 'జపమాల మాత ద్వారా దేవుడు చేసిన మేళ్ళకు కృతజ్ఞతా స్తుతులు',
  },
  education: {
    id: 'education',
    labelEn: 'Education & Employment',
    labelTe: 'విద్య, ఉద్యోగ & భవిష్యత్ ప్రాప్తి',
    iconName: 'GraduationCap',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300 ring-purple-200',
    descriptionEn: 'Academic success, exams, career advancement and job opportunities',
    descriptionTe: 'విద్యార్థుల పరీక్షలు, ఉన్నత చదువులు మరియు ఉద్యోగ ప్రాప్తి కొరకు ప్రార్థనలు',
  },
  special: {
    id: 'special',
    labelEn: 'Special Petitions',
    labelTe: 'ప్రత్యేక విన్నపాలు',
    iconName: 'HeartHandshake',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-300 ring-slate-200',
    descriptionEn: 'Heartfelt personal petitions and divine intercession of Mother Mary',
    descriptionTe: 'మనసులోని ప్రత్యేక విన్నపాలు మరియమాత మధ్యవర్తిత్వానికి సమర్పణ',
  },
};

