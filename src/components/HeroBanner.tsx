import React from 'react';
import { useApp } from '../context/AppContext';
import { KECAMATAN_INFO } from '../data/gumelarData';
import {
  Users,
  FileText,
  MapPin,
  MessageSquareWarning,
  Calendar,
  Mountain,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  CloudSunRain,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setCurrentView } = useApp();

  const quickFeatures = [
    {
      id: 'desa',
      title: '10 Profil Desa',
      desc: 'Cihonje, Gancang, Paningkaban, dll.',
      icon: <Users className="w-5 h-5 text-emerald-600" />,
      color: 'hover:border-emerald-400 hover:bg-emerald-50/50'
    },
    {
      id: 'layanan',
      title: 'Layanan PATEN',
      desc: 'KTP-el, KK, SKU, Nikah (Gratis Rp 0)',
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      color: 'hover:border-blue-400 hover:bg-blue-50/50'
    },
    {
      id: 'pengaduan',
      title: 'LAPOR GUMELAR',
      desc: 'Aduan Online & Notifikasi Real-Time',
      icon: <MessageSquareWarning className="w-5 h-5 text-amber-600" />,
      color: 'hover:border-amber-400 hover:bg-amber-50/50'
    },
    {
      id: 'peta',
      title: 'Peta Fasilitas',
      desc: 'Puskesmas, Sekolah, Kantor Desa',
      icon: <MapPin className="w-5 h-5 text-rose-600" />,
      color: 'hover:border-rose-400 hover:bg-rose-50/50'
    },
    {
      id: 'wisata',
      title: 'Wisata & Alam',
      desc: 'Puncak Wadas, Curug Ciranggon, Ebeg',
      icon: <Mountain className="w-5 h-5 text-teal-600" />,
      color: 'hover:border-teal-400 hover:bg-teal-50/50'
    },
    {
      id: 'agenda',
      title: 'Agenda Warga',
      desc: 'Festival Ebeg, Posyandu, Musrenbang',
      icon: <Calendar className="w-5 h-5 text-indigo-600" />,
      color: 'hover:border-indigo-400 hover:bg-indigo-50/50'
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900 text-white pt-10 pb-16 px-4 sm:px-6">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-emerald-200 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Portal Pelayanan & Informasi Terpadu Masyarakat</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
              Sugeng Rawuh ing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-100 to-amber-300">
                Kecamatan Gumelar
              </span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
              Kawasan perbukitan asri di Kabupaten Banyumas bagian barat. Menyatukan 10 desa berdaya,
              potensi perkebunan nira & kapulaga, kekayaan alam air terjun dan puncak bukit, serta
              layanan birokrasi ramah warga dengan sistem pengaduan cepat tanggap berfitur notifikasi real-time.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                <span className="block text-2xl font-black text-amber-300">10 Desa</span>
                <span className="text-xs text-emerald-100 font-medium">Wilayah Administratif</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                <span className="block text-2xl font-black text-emerald-300">{KECAMATAN_INFO.area}</span>
                <span className="text-xs text-emerald-100 font-medium">Luas Perbukitan</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                <span className="block text-2xl font-black text-amber-300">56.400+</span>
                <span className="text-xs text-emerald-100 font-medium">Jiwa Penduduk</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                <span className="block text-2xl font-black text-emerald-300">Rp 0,-</span>
                <span className="text-xs text-emerald-100 font-medium">Biaya PATEN (Gratis)</span>
              </div>
            </div>

            {/* CTA Button Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setCurrentView('pengaduan')}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold text-sm shadow-lg shadow-amber-600/30 hover:from-amber-400 hover:to-amber-500 transition-all flex items-center gap-2 transform active:scale-95"
              >
                <MessageSquareWarning className="w-4 h-4 text-slate-900" />
                <span>Buat Pengaduan Warga</span>
              </button>

              <button
                onClick={() => setCurrentView('peta')}
                className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm backdrop-blur-xs transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-emerald-300" />
                <span>Buka Peta Fasilitas & Faskes</span>
              </button>
            </div>
          </div>

          {/* Camat Welcome Card & Weather Ticker */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-5 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-emerald-600 p-0.5 shadow-md shrink-0">
                  <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                      alt="Camat Gumelar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                    Sambutan Camat Gumelar
                  </span>
                  <h3 className="text-base font-bold text-white leading-tight">
                    {KECAMATAN_INFO.subdistrictHead}
                  </h3>
                  <p className="text-xs text-emerald-200 mt-0.5">
                    Camat Gumelar, Kab. Banyumas
                  </p>
                </div>
              </div>

              <blockquote className="mt-4 text-xs text-emerald-100/90 italic leading-relaxed border-l-2 border-amber-400/80 pl-3">
                &ldquo;Gumelar Gumebyar lan Makmur. Kami berkomitmen menghadirkan tata kelola kecamatan
                yang responsif, terbuka, dan cepat menindaklanjuti setiap aspirasi serta kendala warga.
                Gunakan kanal pengaduan dan forum komunitas ini untuk kemajuan bersama.&rdquo;
              </blockquote>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-emerald-200">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Kecamatan Ramah Pelayanan
                </span>
                <span className="text-amber-300 font-medium">Banyumas Berdaya</span>
              </div>
            </div>

            {/* Local Condition & Weather Alert */}
            <div className="rounded-2xl bg-emerald-950/70 border border-emerald-500/30 p-3.5 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-800/80 text-emerald-300">
                  <CloudSunRain className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-white block">Status Cuaca & Siaga Wilayah</span>
                  <span className="text-emerald-300 text-[11px]">Suhu 24°C • Siaga Waspada Longsor Musim Hujan</span>
                </div>
              </div>
              <span className="px-2 py-1 rounded-full bg-emerald-800 text-emerald-200 text-[10px] font-bold border border-emerald-400/40">
                Kondisi Aman
              </span>
            </div>
          </div>
        </div>

        {/* Quick Menu Shortcut Cards */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3">
            Pintasan Layanan & Informasi Warga
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickFeatures.map((feat) => (
              <button
                key={feat.id}
                onClick={() => setCurrentView(feat.id as any)}
                className={`p-3.5 rounded-2xl bg-white text-slate-800 shadow-md text-left transition-all border border-slate-200 group transform hover:-translate-y-1 ${feat.color}`}
              >
                <div className="p-2 rounded-xl bg-slate-100 w-fit mb-2 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h4 className="font-bold text-xs text-slate-900 group-hover:text-emerald-800 line-clamp-1">
                  {feat.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {feat.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
