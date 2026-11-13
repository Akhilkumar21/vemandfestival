import React from 'react';
import { Church, MapPin, Bell, Shield, Heart } from 'lucide-react';
import { NoticeItem } from '../types/festival';

interface PortalFooterProps {
  notices: NoticeItem[];
  isTelugu: boolean;
}

export const PortalFooter: React.FC<PortalFooterProps> = ({ notices, isTelugu }) => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-14 pb-8 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Notice Board Section */}
        <div id="notices" className="mb-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-base mb-4">
            <Bell className="w-5 h-5 text-amber-600" />
            <h3>{isTelugu ? 'ముఖ్య గమనికలు & క్రమశిక్షణా నియమాలు' : 'Important Notices & Devotee Guidelines'}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {notices.map((n) => (
              <div
                key={n.id}
                className="p-4 rounded-xl bg-slate-50 border-l-4 border-amber-500 text-xs text-slate-700 leading-relaxed"
              >
                {isTelugu ? n.textTelugu : n.text}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold">
                <Church className="w-5 h-5" />
              </div>
              <span className="text-base font-bold text-slate-900">
                {isTelugu ? 'వేమండ జపమాల మహోత్సవాలు' : 'Vemanda Japamala Matha'}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              {isTelugu
                ? '"తరతరముల వారు నన్ను ధన్యురాలని పిలిచెదరు" (లూకా 1:48). వేమండ గ్రామము, వెంట్రప్రగడ విచారణ వార్షిక మహోత్సవాల దివ్య జ్ఞాపిక.'
                : '"All generations will call me blessed" (Luke 1:48). Dedicated to the Annual Feast of Japamala Matha Shrine, Vemanda Village, Ventrapragada Parish.'}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-3">
              {isTelugu ? 'పుణ్యక్షేత్ర చిరునామా' : 'Shrine Location'}
            </h4>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  {isTelugu
                    ? 'వేమండ గ్రామము, వెంట్రప్రగడ విచారణ, కృష్ణా జిల్లా, ఆంధ్రప్రదేశ్'
                    : 'Vemanda Village, Ventrapragada Parish, Krishna District, Andhra Pradesh, India'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>{isTelugu ? 'ఆర్.సి.యం. దేవాలయ విచారణ పరిధి' : 'Under R.C.M. Church Parish Jurisdiction'}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-3">
              {isTelugu ? 'పండుగ విశేషాలు' : 'Feast Highlights'}
            </h4>
            <ul className="text-xs space-y-1.5 text-slate-600">
              <li>• {isTelugu ? 'చతుర్విధ పతాక ఆవిష్కరణలు (అక్టోబర్ 27-30)' : '4 Sacred Flag Hoistings (Oct 27 - 30)'}</li>
              <li>• {isTelugu ? 'ప్రతిరోజు ఉదయం 8:00 కి మేళతాళాల పతాక యాత్ర' : 'Daily 8:00 AM Flag Procession with Melathalalu'}</li>
              <li>• {isTelugu ? 'దివ్యసత్ప్రసాద ఆరాధనలు & సమిష్టి దివ్యబలిపూజ' : 'Eucharistic Adorations & Solemn High Mass'}</li>
              <li>• {isTelugu ? 'వేమండ గాయక బృందం దివ్య సంకీర్తనలు' : 'Hymns & Worship by Vemanda Choir Team'}</li>
              <li>• {isTelugu ? 'అక్టోబర్ 30 సాయంత్రం 4:00 కి ఘన రథోత్సవం' : 'Grand Chariot (Theru) Procession on Oct 30 at 4 PM'}</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            {isTelugu ? 'వేమండ జపమాల మాత క్షేత్ర మహోత్సవ కమిటీ' : 'Vemanda Japamala Matha Shrine Committee'}.
          </span>
          <span className="flex items-center gap-1">
            {isTelugu ? 'భక్తి శ్రద్ధలతో సమర్పితం' : 'Devotedly celebrated with faith & joy'} <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
          </span>
        </div>
      </div>
    </footer>
  );
};
