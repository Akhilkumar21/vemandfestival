export interface FlagItem {
  id: number;
  flagNumber: string;
  flagNumberTelugu: string;
  date: string;
  dateDisplay: string;
  dateDisplayTelugu: string;
  time: string;
  timeTelugu: string;
  event: string;
  eventTelugu: string;
  description: string;
  descriptionTelugu: string;
  choir: string;
  choirTelugu: string;
  badge: string;
  badgeTelugu: string;
}

export interface ScheduleEvent {
  id: string;
  time: string;
  timeTelugu: string;
  category: string;
  categoryTelugu: string;
  title: string;
  titleTelugu: string;
  description: string;
  descriptionTelugu: string;
}

export interface DaySchedule {
  date: string;
  dayTitle: string;
  dayTitleTelugu: string;
  events: ScheduleEvent[];
}

export interface VideoItem {
  id: string;
  filename: string;
  path: string;
  title: string;
  titleTelugu: string;
  duration: string;
  category: string;
  categoryTelugu: string;
  description: string;
  descriptionTelugu: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  titleTelugu: string;
  category: 'flags' | 'procession' | 'statues' | 'forms' | 'media';
  categoryTelugu: string;
  caption: string;
}

export interface NoticeItem {
  id: number;
  text: string;
  textTelugu: string;
}

export interface FestivalData {
  village: string;
  villageTelugu: string;
  mandal?: string;
  mandalTelugu?: string;
  district?: string;
  districtTelugu?: string;
  pincode?: string;
  parish: string;
  parishTelugu: string;
  shrine: string;
  shrineTelugu: string;
  edition: string;
  editionTelugu: string;
  scripture: string;
  scriptureTelugu: string;
  dates: {
    start: string;
    end: string;
    display: string;
    displayTelugu: string;
  };
  dailyTradition: {
    time: string;
    timeTelugu: string;
    title: string;
    titleTelugu: string;
    description: string;
    descriptionTelugu: string;
  };
  flags: FlagItem[];
  schedule: DaySchedule[];
  videos: VideoItem[];
  gallery: GalleryItem[];
  notices: NoticeItem[];
}
