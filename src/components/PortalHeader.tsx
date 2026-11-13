import React from 'react';
import {
  Church,
  Search,
  Globe,
  Sparkles,
  Flag,
  Calendar,
  Video,
  Image as ImageIcon,
  X,
} from 'lucide-react';

interface PortalHeaderProps {
  isTelugu: boolean;
  onToggleLanguage: () => void;
  viewMode: 'google' | 'portal';
  onToggleViewMode: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({
  isTelugu,
  onToggleLanguage,
  viewMode,
  onToggleViewMode,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 md:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center text-white shadow-md">
              <Church className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base md:text-lg font-bold text-slate-900 tracking-wide">
                {isTelugu ? 'వేమండ జపమాల మహోత్సవాలు' : 'Vemanda Japamala Matha'}
              </h1>
              <p className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
                {isTelugu ? 'వార్షిక మహోత్సవాలు (అక్టోబర్ 27-30)' : 'Annual Feast (Oct 27-30)'}
              </p>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleLanguage}
              className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 shadow-sm"
            >
              {isTelugu ? 'EN' : 'తెలుగు'}
            </button>
            <button
              onClick={onToggleViewMode}
              className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
            >
              {viewMode === 'google' ? 'Portal' : 'Google'}
            </button>
          </div>
        </div>

        {/* Global Instant Search Bar */}
        <div className="relative w-full md:w-96">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={isTelugu ? 'వేమండ, పతాకం, పూజ, రథోత్సవం వెతకండి...' : 'Search Vemanda, flags, schedule, videos...'}
              className="w-full pl-9 pr-9 py-2 rounded-full bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs md:text-sm focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Controls & View Switcher */}
        <div className="hidden md:flex items-center gap-3">
          {/* Switch to Google Search View */}
          <button
            onClick={onToggleViewMode}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${viewMode === 'google'
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
                : 'bg-white text-slate-700 border border-slate-300 hover:border-blue-500 hover:text-blue-600'
              }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {viewMode === 'google' ? (isTelugu ? 'పోర్టల్ మోడ్' : 'Portal Mode') : (isTelugu ? 'గూగుల్ సెర్చ్ వ్యూ' : 'Google Search View')}
          </button>

          {/* Bilingual Switcher */}
          <button
            onClick={onToggleLanguage}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 border border-amber-300 text-amber-800 hover:bg-amber-100 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isTelugu ? 'English' : 'తెలుగు'}</span>
          </button>
        </div>
      </div>

      {/* Nav links */}
      {viewMode === 'portal' && (
        <nav className="max-w-7xl mx-auto flex items-center justify-center md:justify-start gap-4 md:gap-8 mt-2.5 pt-2 border-t border-slate-100 text-xs font-semibold text-slate-600 overflow-x-auto scrollbar-none">
          <a href="#flags" className="hover:text-amber-700 flex items-center gap-1 transition-colors">
            <Flag className="w-3 h-3 text-amber-500" />
            {isTelugu ? '4 పతాకాలు' : '4 Sacred Flags'}
          </a>
          <a href="#schedule" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
            <Calendar className="w-3 h-3 text-blue-500" />
            {isTelugu ? 'కార్యక్రమ పట్టిక' : 'Daily Schedule'}
          </a>
          <a href="#videos" className="hover:text-red-600 flex items-center gap-1 transition-colors">
            <Video className="w-3 h-3 text-red-500" />
            {isTelugu ? 'వీడియోలు' : 'Videos'}
          </a>
          <a href="#gallery" className="hover:text-emerald-600 flex items-center gap-1 transition-colors">
            <ImageIcon className="w-3 h-3 text-emerald-500" />
            {isTelugu ? 'చిత్ర మాలిక' : 'Photo Gallery'}
          </a>
          <a href="#notices" className="hover:text-slate-900 transition-colors">
            {isTelugu ? 'గమనికలు' : 'Notice Board'}
          </a>
        </nav>
      )}
    </header>
  );
};
