import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Video,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  MapPin,
  Play,
  RotateCcw,
  Check,
} from 'lucide-react';
import { MediaType, MediaCategory, MediaUploadFormData, UserUploadedMedia } from '../types/media';
import { saveUserMedia, CATEGORY_LABELS, formatBytes } from '../utils/mediaStorage';

interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  isTelugu: boolean;
  defaultType?: MediaType;
  onUploadSuccess?: (media: UserUploadedMedia) => void;
}

export const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  isOpen,
  onClose,
  isTelugu,
  defaultType = 'image',
  onUploadSuccess,
}) => {
  const [mediaType, setMediaType] = useState<MediaType>(defaultType);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [sampleUrl, setSampleUrl] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Form Fields
  const [title, setTitle] = useState<string>('');
  const [uploaderName, setUploaderName] = useState<string>('');
  const [village, setVillage] = useState<string>('వేమండ (Vemanda)');
  const [category, setCategory] = useState<MediaCategory>('procession');
  const [description, setDescription] = useState<string>('');

  // Status & Progress
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [uploadSuccessMedia, setUploadSuccessMedia] = useState<UserUploadedMedia | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update defaultType when opened
  useEffect(() => {
    if (isOpen) {
      setMediaType(defaultType);
      resetForm();
    }
  }, [isOpen, defaultType]);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setSampleUrl('');
    setTitle('');
    setUploaderName('');
    setVillage('వేమండ (Vemanda)');
    setCategory('procession');
    setDescription('');
    setIsSubmitting(false);
    setUploadProgress(0);
    setErrorMsg(null);
    setUploadSuccessMedia(null);
  };

  const handleFileChange = (file: File) => {
    setErrorMsg(null);

    // Validate type
    if (mediaType === 'image' && !file.type.startsWith('image/')) {
      setErrorMsg(
        isTelugu
          ? 'దయచేసి సరైన ఫోటో ఫైల్ (JPEG, PNG, WebP) ఎంచుకోండి.'
          : 'Please select a valid image file (JPEG, PNG, WebP).'
      );
      return;
    }

    if (mediaType === 'video' && !file.type.startsWith('video/')) {
      setErrorMsg(
        isTelugu
          ? 'దయచేసి సరైన వీడియో ఫైల్ (MP4, WebM) ఎంచుకోండి.'
          : 'Please select a valid video file (MP4, WebM).'
      );
      return;
    }

    // Validate size (Images: 25MB, Videos: 100MB)
    const maxSize = mediaType === 'image' ? 25 * 1024 * 1024 : 100 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMsg(
        isTelugu
          ? `ఫైల్ పరిమాణం చాలా పెద్దది. గరిష్ట పరిమితి: ${mediaType === 'image' ? '25MB' : '100MB'}.`
          : `File size too large. Maximum allowed: ${mediaType === 'image' ? '25MB' : '100MB'}.`
      );
      return;
    }

    setSelectedFile(file);
    setSampleUrl('');

    // Create live preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Auto-fill default title if empty
    if (!title) {
      const fileNameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      setTitle(fileNameWithoutExt.replace(/[-_]/g, ' '));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const samplePhotos = [
    {
      title: 'Our Lady in Decorated Floral Chariot',
      url: '/images/decorated-palm-chariot-theru-japamala-matha.jpeg',
      cat: 'procession' as MediaCategory,
    },
    {
      title: 'Grand Chariot Night Procession in Vemanda',
      url: '/images/grand-chariot-theru-night-procession.jpeg',
      cat: 'procession' as MediaCategory,
    },
    {
      title: 'Sacred Statue of Our Lady of Rosary',
      url: '/images/our-lady-of-rosary-japamala-matha-statue.jpeg',
      cat: 'statues' as MediaCategory,
    },
    {
      title: 'Daytime Flag Pole Erection Work',
      url: '/images/community-erecting-dwajasthambam-flag-pole-daytime.jpeg',
      cat: 'flags' as MediaCategory,
    },
  ];

  const sampleVideos = [
    {
      title: 'Flag Hoisting and Stupa Illumination',
      url: '/videos/video-01-flag-hoisting-and-dwajasthambam-lighting.mp4',
      cat: 'flags' as MediaCategory,
    },
    {
      title: 'Grand Annual Feast Highlights',
      url: '/videos/video-02-grand-annual-feast-full-highlights.mp4',
      cat: 'general' as MediaCategory,
    },
    {
      title: 'Night Chariot Festivities & Joy',
      url: '/videos/video-05-night-chariot-theru-celebrations.mp4',
      cat: 'procession' as MediaCategory,
    },
  ];

  const handleSelectSample = (sample: { title: string; url: string; cat: MediaCategory }) => {
    setSelectedFile(null);
    setSampleUrl(sample.url);
    setPreviewUrl(sample.url);
    setTitle(sample.title);
    setCategory(sample.cat);
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile && !sampleUrl) {
      setErrorMsg(
        isTelugu
          ? 'దయచేసి ఒక ఫోటో లేదా వీడియో ఫైల్ ఎంచుకోండి.'
          : 'Please select or drop a photo or video file.'
      );
      return;
    }

    if (!uploaderName.trim()) {
      setErrorMsg(
        isTelugu
          ? 'దయచేసి మీ పేరు (భక్తుని పేరు) నమోదు చేయండి.'
          : 'Please enter your devotee name.'
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);
    setUploadProgress(15);

    try {
      // Realistic smooth progress simulation
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 15;
        });
      }, 100);

      const formData: MediaUploadFormData = {
        type: mediaType,
        title: title || (mediaType === 'image' ? 'Devotee Photo' : 'Devotee Video'),
        uploaderName,
        village,
        category,
        description,
        file: selectedFile,
        sampleUrl: sampleUrl || undefined,
      };

      const newMedia = await saveUserMedia(formData);

      clearInterval(interval);
      setUploadProgress(100);

      setTimeout(() => {
        setIsSubmitting(false);
        setUploadSuccessMedia(newMedia);
        if (onUploadSuccess) {
          onUploadSuccess(newMedia);
        }
      }, 400);
    } catch (err: unknown) {
      setIsSubmitting(false);
      setErrorMsg(
        err instanceof Error
          ? err.message
          : isTelugu
          ? 'అప్‌లోడ్ చేయడంలో లోపం తలెత్తింది. దయచేసి మళ్ళీ ప్రయత్నించండి.'
          : 'Failed to upload media. Please try again.'
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-scaleUp">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 px-6 py-4 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                {isTelugu ? 'భక్తుల ఫోటో & వీడియో సమర్పణ' : 'Devotee Photo & Video Upload'}
              </h2>
              <p className="text-[11px] text-amber-100 font-medium">
                {isTelugu
                  ? 'వేమండ జపమాల మాత మహోత్సవ చిత్రాలు మరియు వీడియోలను పోర్టల్‌లో పంచుకోండి'
                  : 'Share your sacred festival captures with pilgrims across the globe'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors text-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {uploadSuccessMedia ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {isTelugu ? 'విజయవంతంగా అప్‌లోడ్ చేయబడింది!' : 'Uploaded Successfully!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto">
                {isTelugu
                  ? 'మీరు సమర్పించిన ఫోటో/వీడియో వెంటనే పోర్టల్ చిత్ర మాలిక మరియు వీడియో విభాగాలలో ప్రత్యక్షంగా ప్రదర్శించబడుతుంది.'
                  : 'Your capture has been published to the Vemanda Festival portal and is now live for all devotees.'}
              </p>
            </div>

            {/* Preview of uploaded item */}
            <div className="max-w-md mx-auto rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 p-3 flex items-center gap-3 text-left">
              <div className="w-16 h-16 rounded-xl bg-slate-900 overflow-hidden flex-shrink-0 relative">
                {uploadSuccessMedia.type === 'image' ? (
                  <img
                    src={uploadSuccessMedia.mediaUrl}
                    alt={uploadSuccessMedia.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={uploadSuccessMedia.mediaUrl}
                    className="w-full h-full object-cover"
                  />
                )}
                {uploadSuccessMedia.type === 'video' && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="w-5 h-5 text-white fill-current" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase tracking-wider">
                  {uploadSuccessMedia.type === 'image'
                    ? isTelugu
                      ? 'ఫోటో'
                      : 'Photo'
                    : isTelugu
                    ? 'వీడియో'
                    : 'Video'}
                </span>
                <h4 className="text-xs font-bold text-slate-900 truncate mt-1">
                  {uploadSuccessMedia.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">
                  {uploadSuccessMedia.uploaderName} • {uploadSuccessMedia.village}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{isTelugu ? 'మరొకటి అప్‌లోడ్ చేయండి' : 'Upload Another Media'}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all shadow-md shadow-amber-200 flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>{isTelugu ? 'పూర్తయింది (గ్యాలరీ చూడండి)' : 'Done (View in Portal)'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Main Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Media Type Switcher */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {isTelugu ? 'సమర్పణ రకం ఎంచుకోండి' : '1. Choose Media Format'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMediaType('image');
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    setSampleUrl('');
                  }}
                  className={`p-3 rounded-2xl border-2 flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold transition-all ${
                    mediaType === 'image'
                      ? 'border-amber-500 bg-amber-50/80 text-amber-900 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <ImageIcon
                    className={`w-5 h-5 ${
                      mediaType === 'image' ? 'text-amber-600' : 'text-slate-400'
                    }`}
                  />
                  <span>{isTelugu ? 'ఫోటో / చిత్రం (Photo)' : 'Photo / Picture'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMediaType('video');
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    setSampleUrl('');
                  }}
                  className={`p-3 rounded-2xl border-2 flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold transition-all ${
                    mediaType === 'video'
                      ? 'border-red-500 bg-red-50/80 text-red-900 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Video
                    className={`w-5 h-5 ${
                      mediaType === 'video' ? 'text-red-600' : 'text-slate-400'
                    }`}
                  />
                  <span>{isTelugu ? 'వీడియో క్లిప్ (Video)' : 'Video Clip (HD)'}</span>
                </button>
              </div>
            </div>

            {/* Drag & Drop File Picker or Preview Box */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {isTelugu ? 'మీ ఫైల్‌ను ఎంచుకోండి లేదా లాగి వదలండి' : '2. Select or Drop File'}
              </label>

              {previewUrl ? (
                /* Live Preview Container */
                <div className="relative rounded-2xl border border-slate-300 bg-slate-900 overflow-hidden shadow-inner flex flex-col items-center justify-center group">
                  {mediaType === 'image' ? (
                    <img
                      src={previewUrl}
                      alt="Selected preview"
                      className="max-h-56 w-auto object-contain"
                    />
                  ) : (
                    <video
                      src={previewUrl}
                      controls
                      autoPlay
                      muted
                      className="max-h-56 w-full object-contain"
                    />
                  )}

                  {/* Top Bar with replace & remove */}
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-xs p-1 rounded-xl text-white text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                        setSampleUrl('');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-red-500/80 hover:bg-red-600 text-white font-medium transition-colors flex items-center gap-1 text-[11px]"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>{isTelugu ? 'తొలగించు' : 'Remove'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium transition-colors text-[11px]"
                    >
                      {isTelugu ? 'మార్చు' : 'Change'}
                    </button>
                  </div>

                  {/* Bottom Meta Bar */}
                  <div className="w-full bg-slate-950/80 px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-300">
                    <span className="truncate max-w-[200px]">
                      {selectedFile ? selectedFile.name : sampleUrl ? 'Devotional Sample Media' : ''}
                    </span>
                    <span>
                      {selectedFile ? formatBytes(selectedFile.size) : sampleUrl ? 'Official Sample' : ''}
                    </span>
                  </div>
                </div>
              ) : (
                /* Dropzone Container */
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    isDragOver
                      ? 'border-amber-500 bg-amber-50/60 scale-[1.01]'
                      : 'border-slate-300 bg-slate-50/50 hover:bg-amber-50/30 hover:border-amber-400'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept={mediaType === 'image' ? 'image/*' : 'video/*'}
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleFileChange(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    {isTelugu
                      ? `${mediaType === 'image' ? 'ఫోటో' : 'వీడియో'}ను ఎంచుకోవడానికి ఇక్కడ క్లిక్ చేయండి`
                      : `Click to select or drag & drop a ${mediaType === 'image' ? 'photo' : 'video'}`}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {mediaType === 'image'
                      ? 'JPEG, PNG, WebP up to 25MB'
                      : 'MP4, WebM, MOV up to 100MB'}
                  </p>
                </div>
              )}

              {/* Quick Sample Selector for Devotees who want to test without files */}
              <div className="mt-2 text-left">
                <span className="text-[11px] text-slate-500 font-medium">
                  {isTelugu ? 'లేదా ఉత్సవ నమూనాను ఎంచుకోండి:' : 'Or test with a festival sample:'}
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {(mediaType === 'image' ? samplePhotos : sampleVideos).map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSample(sample)}
                      className={`text-[10px] font-semibold px-2 py-1 rounded-lg border transition-all ${
                        sampleUrl === sample.url
                          ? 'bg-amber-500 text-white border-amber-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400 hover:bg-amber-50/50'
                      }`}
                    >
                      {sample.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Media Details Form Fields */}
            <div className="space-y-3 pt-1">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isTelugu ? 'శీర్షిక / వివరణ శీర్షిక' : 'Media Title / Celebration Event'} *
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={
                      isTelugu
                        ? 'ఉదా: తేరు ప్రదక్షిణ భక్తుల సంబరం'
                        : 'e.g. Grand Chariot Celebration with Village Devotees'
                    }
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                  />
                </div>
              </div>

              {/* Devotee Name & Village */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isTelugu ? 'మీ పేరు (భక్తుని పేరు)' : 'Your Name (Devotee)'} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={uploaderName}
                      onChange={(e) => setUploaderName(e.target.value)}
                      placeholder={isTelugu ? 'ఉదా: జోసఫ్ & కుటుంబం' : 'e.g. Joseph & Family'}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isTelugu ? 'గ్రామం / ఊరు' : 'Village / Location'} *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      placeholder={isTelugu ? 'ఉదా: వేమండ' : 'e.g. Vemanda'}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isTelugu ? 'ఉత్సవ విభాగం' : 'Festival Category'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as MediaCategory)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                >
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {isTelugu ? label.te : label.en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Devotional Note / Caption */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isTelugu ? 'భక్తి సందేశం / గమనిక (ఐచ్ఛికం)' : 'Devotional Message / Note (Optional)'}
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    isTelugu
                      ? 'ఈ ఫోటో లేదా వీడియో గురించిన వివరాలు, ప్రార్థనా సందేశం...'
                      : 'Share any sacred memories, dates, or prayer blessings with this media...'
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                />
              </div>
            </div>

            {/* Upload Progress Bar (when submitting) */}
            {isSubmitting && (
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-bold text-amber-900">
                  <span>
                    {isTelugu ? 'పోర్టల్‌కు అప్‌లోడ్ అవుతోంది...' : 'Uploading & Processing Media...'}
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 disabled:opacity-50"
              >
                {isTelugu ? 'రద్దు చేయి' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={isSubmitting || (!selectedFile && !sampleUrl)}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {isSubmitting
                    ? isTelugu
                      ? 'భద్రపరుస్తోంది...'
                      : 'Saving...'
                    : isTelugu
                    ? 'ఇప్పుడే అప్‌లోడ్ చేయండి'
                    : 'Publish Media to Portal'}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
