/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { VillageProfiles } from './components/VillageProfiles';
import { InteractiveMap } from './components/InteractiveMap';
import { PublicServices } from './components/PublicServices';
import { ComplaintSystem } from './components/ComplaintSystem';
import { CommunityForum } from './components/CommunityForum';
import { EventCalendar } from './components/EventCalendar';
import { TourismShowcase } from './components/TourismShowcase';
import { Footer } from './components/Footer';
import { NotificationToast } from './components/NotificationToast';
import {
  Users,
  MapPin,
  FileText,
  MessageSquareWarning,
  Calendar,
  Mountain,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />
      <NotificationToast />

      <main className="flex-1">
        {currentView === 'beranda' && (
          <>
            <HeroBanner />

            {/* Quick Overview Section: 10 Profil Desa Preview */}
            <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                    Wilayah Administratif
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    10 Desa Berdaya di Kecamatan Gumelar
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Karakteristik khas, sentra produksi gula kelapa & kapulaga, serta pesona alam tiap desa.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentView('desa')}
                  className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto transition-transform active:scale-95 shadow-sm"
                >
                  <span>Buka Semua 10 Profil Desa</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  onClick={() => setCurrentView('desa')}
                  className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all cursor-pointer group"
                >
                  <div className="h-40 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&w=600&q=80"
                      alt="Desa Gumelar"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                    Ibu Kota Kecamatan
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-emerald-700 transition-colors">
                    Desa Gumelar
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    Pusat pelayanan administrasi PATEN terpadu, Pasar Tradisional Gumelar, dan simpul perekonomian masyarakat.
                  </p>
                </div>

                <div
                  onClick={() => setCurrentView('desa')}
                  className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all cursor-pointer group"
                >
                  <div className="h-40 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80"
                      alt="Desa Gancang"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                    Inovasi Organik
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-amber-700 transition-colors">
                    Desa Gancang
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    Pelopor gula semut organik kualitas ekspor dan koperasi tani nira kelapa berdaya saing tinggi.
                  </p>
                </div>

                <div
                  onClick={() => setCurrentView('desa')}
                  className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all cursor-pointer group"
                >
                  <div className="h-40 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                      alt="Desa Paningkaban"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-200">
                    Pesona Puncak Wadas
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-teal-700 transition-colors">
                    Desa Paningkaban
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    Kawasan perbukitan sejuk berpanorama spektakuler negeri di atas awan, kebun cengkih, dan kopi lereng.
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Feature: Sistem Pengaduan LAPOR GUMELAR Highlight */}
            <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto border-b border-slate-200">
              <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
                <div className="max-w-2xl space-y-4 relative z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Notifikasi Real-Time Terintegrasi
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black leading-tight text-white">
                    Ada Jalan Rusak, PJU Padam, atau Kendala Layanan di Desa Anda?
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Kirimkan laporan secara langsung melalui sistem <strong>LAPOR GUMELAR</strong>.
                    Setiap penanganan oleh petugas kecamatan, DPU, atau dinas terkait akan langsung mengirimkan
                    notifikasi status penanganan secara real-time ke gawai Anda.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => setCurrentView('pengaduan')}
                      className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                    >
                      <MessageSquareWarning className="w-4 h-4" />
                      <span>Buat Pengaduan Sekarang</span>
                    </button>

                    <button
                      onClick={() => setCurrentView('pengaduan')}
                      className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-colors"
                    >
                      Lacak Status Aduan Saya
                    </button>
                  </div>
                </div>

                <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
                  <MessageSquareWarning className="w-72 h-72 text-emerald-400" />
                </div>
              </div>
            </section>

            {/* Interactive Map Preview Section */}
            <InteractiveMap />

            {/* Community Forum & Calendar Teaser */}
            <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Forum Box */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700 block mb-1">
                      Komunitas Warga
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      Rembug & Forum Diskusi Warga
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      Saling bertukar kabar seputar pertanian kapulaga, pelatihan gula semut, ronda malam desa,
                      dan info gotong royong antar-warga 10 desa di Gumelar.
                    </p>
                  </div>

                  <button
                    onClick={() => setCurrentView('forum')}
                    className="py-2.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow"
                  >
                    <span>Masuk ke Ruang Rembug Warga</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Event Calendar Box */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 block mb-1">
                      Kegiatan Mendatang
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      Agenda & Kalender Kegiatan Warga
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      Jadwal Festival Seni Ebeg Gumelar, Posyandu Lansia serentak, Musrenbang Kecamatan,
                      dan aksi penghijauan lereng bantaran Kali Cikawung.
                    </p>
                  </div>

                  <button
                    onClick={() => setCurrentView('agenda')}
                    className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow"
                  >
                    <span>Buka Kalender & RSVP Acara</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {currentView === 'desa' && <VillageProfiles />}
        {currentView === 'layanan' && <PublicServices />}
        {currentView === 'peta' && <InteractiveMap />}
        {currentView === 'wisata' && <TourismShowcase />}
        {currentView === 'pengaduan' && <ComplaintSystem />}
        {currentView === 'forum' && <CommunityForum />}
        {currentView === 'agenda' && <EventCalendar />}
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
