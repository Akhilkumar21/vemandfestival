export type MediaType = 'image' | 'video';

export type MediaCategory =
  | 'procession'
  | 'statues'
  | 'flags'
  | 'prayers'
  | 'choir'
  | 'general';

export interface UserUploadedMedia {
  id: string;
  type: MediaType;
  title: string;
  titleTelugu?: string;
  description: string;
  uploaderName: string;
  village: string;
  category: MediaCategory;
  categoryTelugu: string;
  mediaUrl: string; // Blob URL, Data URL, or public path
  thumbnailUrl?: string;
  uploadedAt: number; // timestamp
  dateDisplay: string;
  likes: number;
  likedByMe?: boolean;
  fileSize?: string;
  duration?: string; // e.g. "0:45" for videos
  isCommunity: true;
}

export interface MediaUploadFormData {
  type: MediaType;
  title: string;
  uploaderName: string;
  village: string;
  category: MediaCategory;
  description: string;
  file: File | null;
  sampleUrl?: string;
}
