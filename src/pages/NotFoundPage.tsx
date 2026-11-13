import React from 'react';
import { Link } from 'react-router-dom';
import { Church, Home, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  isTelugu: boolean;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ isTelugu }) => {
  return (
    <div className="flex-grow flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center p-8 rounded-3xl bg-white border border-slate-200 shadow-lg">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
          <Church className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">404</h2>
        <h3 className="text-base font-bold text-slate-700 mb-4">
          {isTelugu ? 'పేజీ కనుగొనబడలేదు' : 'Page Not Found'}
        </h3>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          {isTelugu
            ? 'మీరు వెతుకుతున్న పేజీ అందుబాటులో లేదు లేదా మార్చబడింది. దయచేసి ప్రధాన పేజీకి తిరిగి వెళ్లండి.'
            : 'The page you requested could not be found. Please return to the festival home portal.'}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md transition-all active:scale-95"
        >
          <Home className="w-4 h-4" />
          <span>{isTelugu ? 'ప్రధాన పేజీకి వెళ్లండి' : 'Back to Home'}</span>
        </Link>
      </div>
    </div>
  );
};

