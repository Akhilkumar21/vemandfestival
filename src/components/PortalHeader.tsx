import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Church,
  Search,
  Globe,
  Flag,
  Calendar,
  Video,
  Image as ImageIcon,
  Bell,
  Menu,
  X,
  Home,
  Heart,
  Upload,
  Users,
} from 'lucide-react';
import { MediaUploadModal } from './MediaUploadModal';

interface PortalHeaderProps {
  isTelugu: boolean;
  onToggleLanguage: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({
  isTelugu,
  onToggleLanguage,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const navLinks = [
    {
      to: '/',
      labelEn: 'Home',
      labelTe: 'ప్రధాన పేజీ',
      icon: Home,
      exact: true,
    },
    {
      to: '/flags',
      labelEn: '4 Sacred Flags',
      labelTe: '4 పవిత్ర పతాకాలు',
      icon: Flag,
    },
    {
      to: '/schedule',
      labelEn: 'Daily Schedule',
      labelTe: 'కార్యక్రమ పట్టిక',
      icon: Calendar,
    },
    {
      to: '/prayers',
      labelEn: 'Prayer Petitions',
      labelTe: 'ప్రార్థనల డాష్‌బోర్డ్',
      icon: Heart,
    },
    {
      to: '/videos',
      labelEn: 'Videos (5)',
      labelTe: 'వీడియోలు (5)',
      icon: Video,
    },
    {
      to: '/gallery',
      labelEn: 'Gallery (13)',
      labelTe: 'చిత్ర మాలిక (13)',
      icon: ImageIcon,
    },
    {
      to: '/community',
      labelEn: 'Devotee Media',
      labelTe: 'భక్తుల వేదిక',
      icon: Users,
    },
    {
      to: '/notices',
      labelEn: 'Notices & Info',
      labelTe: 'గమనికలు & సమాచారం',
      icon: Bell,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-3 md:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo & Title */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 group transition-transform active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center text-white shadow-md group-hover:shadow-amber-200 transition-all">
              <Church className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base md:text-lg font-bold text-slate-900 tracking-wide group-hover:text-amber-800 transition-colors">
                {isTelugu ? 'వేమండ జపమాల మహోత్సవాలు' : 'Vemanda Japamala Matha'}
              </h1>
              <p className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
                {isTelugu ? 'వార్షిక మహోత్సవాలు (అక్టోబర్ 27-30)' : 'Annual Feast (Oct 27-30)'}
              </p>
            </div>
          </Link>

          {/* Search Bar (Desktop / Tablet) */}
          <div className="hidden lg:block relative w-72 xl:w-80">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={isTelugu ? 'పతాకం, పూజ, రథోత్సవం వెతకండి...' : 'Search flags, schedule, gallery...'}
                className="w-full pl-9 pr-9 py-2 rounded-full bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                  className="absolute right-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Controls: Upload CTA, Language Toggle & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            {/* Quick Upload Button */}
            <button
              onClick={() => setUploadModalOpen(true)}
              className="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-sm shadow-amber-200 transition-all flex items-center gap-1.5 active:scale-95"
              title={isTelugu ? 'ఫోటో లేదా వీడియో అప్‌లోడ్ చేయండి' : 'Upload photo or video'}
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isTelugu ? 'అప్‌లోడ్' : 'Upload'}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-100 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
              title={isTelugu ? 'Switch to English' : 'తెలుగులోకి మార్చండి'}
            >
              <Globe className="w-3.5 h-3.5 text-amber-700" />
              <span>{isTelugu ? 'English' : 'తెలుగు'}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar for Mobile/Tablet */}
        <div className="mt-2.5 lg:hidden relative w-full">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={isTelugu ? 'వేమండ, పతాకం, పూజ, రథోత్సవం వెతకండి...' : 'Search Vemanda, flags, schedule, videos...'}
              className="w-full pl-9 pr-9 py-2 rounded-full bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                className="absolute right-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 mt-2.5 pt-2 border-t border-slate-100 text-xs font-semibold overflow-x-auto scrollbar-none">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-sm shadow-amber-200 font-bold'
                      : 'text-slate-700 hover:text-amber-800 hover:bg-amber-50/70'
                  }`
                }
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{isTelugu ? link.labelTe : link.labelEn}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile Dropdown Navigation Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-3 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 animate-fadeIn">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.exact}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-xl flex items-center gap-2 text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-amber-500 text-white font-bold shadow-sm'
                        : 'bg-slate-50 text-slate-700 hover:bg-amber-50 hover:text-amber-900 border border-slate-200/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span className="truncate">{isTelugu ? link.labelTe : link.labelEn}</span>
                </NavLink>
              );
            })}
          </nav>
        )}
      </div>

      {/* Global Upload Modal Triggered from Header */}
      <MediaUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        isTelugu={isTelugu}
      />
    </header>
  );
};
