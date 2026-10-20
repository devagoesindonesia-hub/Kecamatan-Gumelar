import React from 'react';
import { useApp } from '../context/AppContext';
import { KECAMATAN_INFO, GUMELAR_VILLAGES } from '../data/gumelarData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Mountain,
  ShieldCheck,
  ExternalLink,
  Heart,
  ChevronRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedVillage } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* Upper Footer: Main Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand & Address */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md">
                <Mountain className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight">
                  {KECAMATAN_INFO.name}
                </h3>
                <p className="text-[11px] text-emerald-400 font-semibold">
                  {KECAMATAN_INFO.regency} • Jawa Tengah
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Portal resmi pelayanan administrasi terpadu, pusat pengaduan online masyarakat dengan
              notifikasi real-time, wadah rembug komunitas desa, dan informasi potensi kearifan lokal.
            </p>

            <div className="space-y-2 pt-1 text-slate-300 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{KECAMATAN_INFO.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Telepon: {KECAMATAN_INFO.phone} | WA: {KECAMATAN_INFO.whatsapp}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{KECAMATAN_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{KECAMATAN_INFO.workingHours}</span>
              </div>
            </div>
          </div>

          {/* 10 Desa Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-300">
              10 Desa di Kec. Gumelar
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {GUMELAR_VILLAGES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setSelectedVillage(v);
                    setCurrentView('desa');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left py-1 text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1 group truncate"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
                  <span className="truncate">{v.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Services Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-300">
              Menu Layanan
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => setCurrentView('layanan')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Layanan PATEN (KTP/KK)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('pengaduan')}
                  className="hover:text-emerald-400 transition-colors font-semibold text-emerald-300"
                >
                  LAPOR GUMELAR (Aduan)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('peta')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Peta Fasilitas Faskes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('forum')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Rembug Warga Komunitas
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('agenda')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Kalender Acara Warga
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('wisata')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Wisata & Alam Puncak Wadas
                </button>
              </li>
            </ul>
          </div>

          {/* External Government Portals & Security */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-300">
              Kanal Terpadu Banyumas
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="https://www.banyumaskab.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white flex items-center justify-between transition-colors block"
              >
                <span>Portal Resmi Pemkab Banyumas</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <a
                href="https://dinkes.banyumaskab.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white flex items-center justify-between transition-colors block"
              >
                <span>Dinas Kesehatan / Puskesmas</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-900/50 text-[11px] text-emerald-200">
                <span className="font-bold block text-white mb-0.5">Semboyan Gumelar:</span>
                &ldquo;Gumelar Gumebyar, Raharja lan Makmur&rdquo; • Melayani Guyub Rukun Sedulur Banyumas Barat.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 py-6 px-4 sm:px-6 text-center text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>
            © {new Date().getFullYear()} Pemerintah Kecamatan Gumelar, Kabupaten Banyumas. Seluruh Hak Cipta Dilindungi.
          </p>
          <p className="flex items-center gap-1">
            Dibangun dengan rasa cinta untuk warga 10 Desa Kecamatan Gumelar.
          </p>
        </div>
      </div>
    </footer>
  );
};
