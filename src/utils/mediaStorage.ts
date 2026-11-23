import { UserUploadedMedia, MediaUploadFormData, MediaCategory } from '../types/media';

const DB_NAME = 'VemandaMediaDB';
const DB_VERSION = 1;
const STORE_NAME = 'uploaded_media';
const LIKES_KEY = 'vemanda_media_user_likes';

export const CATEGORY_LABELS: Record<MediaCategory, { en: string; te: string }> = {
  procession: { en: 'Procession & Theru', te: 'తేరు & రథోత్సవం' },
  statues: { en: 'Sacred Statues', te: 'పవిత్ర స్వరూపాలు' },
  flags: { en: 'Flag Mast & Lighting', te: 'ధ్వజస్తంభం & దీపాలంకరణ' },
  prayers: { en: 'Prayers & Holy Mass', te: 'దివ్యబలిపూజ & ఆరాధన' },
  choir: { en: 'Choir & Melathalalu', te: 'గాయక బృందం & సంకీర్తనలు' },
  general: { en: 'Village Celebrations', te: 'గ్రామ వేడుకలు' },
};

// Initial community-seeded devotee contributions for a lively initial view
const INITIAL_COMMUNITY_MEDIA: UserUploadedMedia[] = [
  {
    id: 'user-media-1',
    type: 'image',
    title: 'Blessed Mother Decorated in Golden Flowers at Vemanda Shrine',
    titleTelugu: 'స్వర్ణ పుష్పాలతో అలరారే వేమండ జపమాల మాత దివ్య దర్శనం',
    description: 'Devotee snapshot captured during the morning flag procession and rosary prayer.',
    uploaderName: 'రాణి & డేవిడ్ (Rani & David)',
    village: 'వేమండ (Vemanda)',
    category: 'statues',
    categoryTelugu: 'పవిత్ర స్వరూపాలు',
    mediaUrl: '/images/our-lady-of-expectation-grand-floral-arch.jpeg',
    uploadedAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    dateDisplay: 'అక్టోబర్ 27',
    likes: 42,
    fileSize: '2.4 MB',
    isCommunity: true,
  },
  {
    id: 'user-media-2',
    type: 'video',
    title: 'Devotional Hymns & Choir during Evening Holy Mass',
    titleTelugu: 'సాయంత్ర దివ్యబలిపూజలో భక్తి గీతాలాపన దృశ్యాలు',
    description: 'A touching devotional choir video recorded near the shrine by our family members.',
    uploaderName: 'జాన్ పాల్ & బృందం (John Paul & Team)',
    village: 'వెంట్రప్రగడ (Ventrapragada)',
    category: 'choir',
    categoryTelugu: 'గాయక బృందం & సంకీర్తనలు',
    mediaUrl: '/videos/video-03-sacred-statue-and-devotional-hymns.mp4',
    uploadedAt: Date.now() - 1000 * 60 * 60 * 18,
    dateDisplay: 'అక్టోబర్ 28',
    likes: 56,
    duration: '0:35',
    fileSize: '5.1 MB',
    isCommunity: true,
  },
  {
    id: 'user-media-3',
    type: 'image',
    title: 'Illuminated Dwajasthambam Night View from Church Road',
    titleTelugu: 'దేవాలయ మార్గం నుండి విద్యుద్దీప శోభిత ధ్వజస్తంభ రాత్రి దృశ్యం',
    description: 'Breathtaking 60-foot flag pole glowing brightly against the night sky in Vemanda.',
    uploaderName: 'శామ్యూల్ కుమార్ (Samuel Kumar)',
    village: 'గుడివాడ (Gudivada)',
    category: 'flags',
    categoryTelugu: 'ధ్వజస్తంభం & దీపాలంకరణ',
    mediaUrl: '/images/illuminated-dwajasthambam-flag-pole-night.jpeg',
    uploadedAt: Date.now() - 1000 * 60 * 60 * 10,
    dateDisplay: 'అక్టోబర్ 28',
    likes: 64,
    fileSize: '3.1 MB',
    isCommunity: true,
  },
  {
    id: 'user-media-4',
    type: 'video',
    title: 'Flag Hoisting Joy & Melathalalu Procession',
    titleTelugu: 'పతాకావిష్కరణ ఆనందోత్సాహాలు & మేళతాళాల ఊరేగింపు',
    description: 'Devotees cheering and singing while the Marian flag rises on the sacred stupa.',
    uploaderName: 'ఆరోగ్య మేరీ (Arogya Mary)',
    village: 'వేమండ (Vemanda)',
    category: 'procession',
    categoryTelugu: 'తేరు & రథోత్సవం',
    mediaUrl: '/videos/video-01-flag-hoisting-and-dwajasthambam-lighting.mp4',
    uploadedAt: Date.now() - 1000 * 60 * 60 * 5,
    dateDisplay: 'అక్టోబర్ 29',
    likes: 78,
    duration: '0:30',
    fileSize: '4.8 MB',
    isCommunity: true,
  },
  {
    id: 'user-media-5',
    type: 'image',
    title: 'Archangel St. Michael and Saints Palki Procession with Umbrellas',
    titleTelugu: 'ఛత్ర చామరాలతో పునీతుల పల్లకి ఊరేగింపు వైభవం',
    description: 'Devotees carrying holy statues across the village streets with devotion and respect.',
    uploaderName: 'కిషోర్ & కుటుంబం (Kishore & Family)',
    village: 'హనుమాన్ జంక్షన్ (Hanuman Junction)',
    category: 'procession',
    categoryTelugu: 'తేరు & రథోత్సవం',
    mediaUrl: '/images/village-procession-st-michael-st-anthony-palanquins.jpeg',
    uploadedAt: Date.now() - 1000 * 60 * 60 * 2,
    dateDisplay: 'అక్టోబర్ 30',
    likes: 51,
    fileSize: '2.8 MB',
    isCommunity: true,
  },
];

// Open IndexedDB database safely
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported in this browser.'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event: Event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
}

function getLikedIds(): string[] {
  try {
    const raw = localStorage.getItem(LIKES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setLikedIds(ids: string[]): void {
  try {
    localStorage.setItem(LIKES_KEY, JSON.stringify(ids));
  } catch (err) {
    console.error('Failed to save liked ids', err);
  }
}

// Convert File to Base64 data URL
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

// Format bytes into readable string (e.g., 4.2 MB)
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

// Format duration in mm:ss from seconds
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// Initialize seed data if store is empty
export async function initMediaDB(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const countReq = store.count();

    await new Promise<void>((resolve, reject) => {
      countReq.onsuccess = async () => {
        if (countReq.result === 0) {
          // Store initial seed items
          const writeTx = db.transaction(STORE_NAME, 'readwrite');
          const writeStore = writeTx.objectStore(STORE_NAME);
          INITIAL_COMMUNITY_MEDIA.forEach((item) => writeStore.put(item));
          writeTx.oncomplete = () => resolve();
          writeTx.onerror = () => reject(writeTx.error);
        } else {
          resolve();
        }
      };
      countReq.onerror = () => reject(countReq.error);
    });
  } catch (err) {
    console.warn('Could not initialize media DB:', err);
  }
}

// Get all user uploaded media
export async function getAllUserMedia(): Promise<UserUploadedMedia[]> {
  try {
    await initMediaDB();
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    const items: UserUploadedMedia[] = await new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });

    const likedIds = getLikedIds();

    // Map likes state and sort by upload timestamp (newest first)
    return items
      .map((item) => ({
        ...item,
        likedByMe: likedIds.includes(item.id),
      }))
      .sort((a, b) => b.uploadedAt - a.uploadedAt);
  } catch (err) {
    console.warn('IndexedDB fetch failed, using fallback:', err);
    const likedIds = getLikedIds();
    return INITIAL_COMMUNITY_MEDIA.map((item) => ({
      ...item,
      likedByMe: likedIds.includes(item.id),
    }));
  }
}

// Get user uploaded photos only
export async function getUserPhotos(): Promise<UserUploadedMedia[]> {
  const all = await getAllUserMedia();
  return all.filter((item) => item.type === 'image');
}

// Get user uploaded videos only
export async function getUserVideos(): Promise<UserUploadedMedia[]> {
  const all = await getAllUserMedia();
  return all.filter((item) => item.type === 'video');
}

// Save a new photo or video uploaded by user
export async function saveUserMedia(formData: MediaUploadFormData): Promise<UserUploadedMedia> {
  let mediaUrl = formData.sampleUrl || '';
  let fileSize = '1.5 MB';
  let duration = formData.type === 'video' ? '0:45' : undefined;

  if (formData.file) {
    fileSize = formatBytes(formData.file.size);
    // For images, data URL is convenient and persists across sessions
    // For videos, create a persistent object URL or data URL
    if (formData.type === 'image') {
      mediaUrl = await fileToDataUrl(formData.file);
    } else {
      // For video, if under 25MB we can convert to base64 DataURL, or create blob URL
      if (formData.file.size < 25 * 1024 * 1024) {
        mediaUrl = await fileToDataUrl(formData.file);
      } else {
        mediaUrl = URL.createObjectURL(formData.file);
      }
    }
  }

  const now = new Date();
  const dateDisplay = `${now.getDate()} ${
    ['జనవరి', 'ఫిబ్రవరి', 'మార్చి', 'ఏప్రిల్', 'మే', 'జూన్', 'జూలై', 'ఆగస్టు', 'సెప్టెంబర్', 'అక్టోబర్', 'నవంబర్', 'డిసెంబర్'][
      now.getMonth()
    ]
  }`;

  const categoryLabels = CATEGORY_LABELS[formData.category] || { en: 'Celebrations', te: 'వేడుకలు' };

  const newMedia: UserUploadedMedia = {
    id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    type: formData.type,
    title: formData.title.trim() || (formData.type === 'image' ? 'Devotee Photo' : 'Devotee Festival Video'),
    titleTelugu: formData.title.trim(),
    description: formData.description.trim() || 'Uploaded with devotion by Vemanda festival pilgrim.',
    uploaderName: formData.uploaderName.trim() || 'Devotee (భక్తులు)',
    village: formData.village.trim() || 'వేమండ (Vemanda)',
    category: formData.category,
    categoryTelugu: categoryLabels.te,
    mediaUrl,
    uploadedAt: Date.now(),
    dateDisplay,
    likes: 1,
    fileSize,
    duration,
    isCommunity: true,
  };

  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(newMedia);

    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error('Failed to save to IndexedDB:', err);
  }

  // Trigger universal media update event
  window.dispatchEvent(new CustomEvent('vemanda_media_updated', { detail: { media: newMedia } }));

  return newMedia;
}

// Delete a user uploaded media item
export async function deleteUserMedia(id: string): Promise<boolean> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(id);

    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });

    window.dispatchEvent(new CustomEvent('vemanda_media_updated', { detail: { deletedId: id } }));
    return true;
  } catch (err) {
    console.error('Failed to delete media item:', err);
    return false;
  }
}

// Toggle like for a media item
export async function toggleLikeMedia(id: string): Promise<UserUploadedMedia | null> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const getReq = store.get(id);

    const item: UserUploadedMedia = await new Promise((resolve, reject) => {
      getReq.onsuccess = () => resolve(getReq.result);
      getReq.onerror = () => reject(getReq.error);
    });

    if (!item) return null;

    const likedIds = getLikedIds();
    const isLiked = likedIds.includes(id);

    let updatedLikedIds: string[];
    if (isLiked) {
      updatedLikedIds = likedIds.filter((likedId) => likedId !== id);
      item.likes = Math.max(0, (item.likes || 1) - 1);
    } else {
      updatedLikedIds = [...likedIds, id];
      item.likes = (item.likes || 0) + 1;
    }

    setLikedIds(updatedLikedIds);
    store.put(item);

    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });

    item.likedByMe = !isLiked;
    window.dispatchEvent(new CustomEvent('vemanda_media_updated', { detail: { updatedItem: item } }));

    return item;
  } catch (err) {
    console.error('Failed to toggle like:', err);
    return null;
  }
}
