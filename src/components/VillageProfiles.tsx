import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GUMELAR_VILLAGES } from '../data/gumelarData';
import { VillageProfile } from '../types';
import {
  Users,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  Search,
  ExternalLink,
  ChevronRight,
  Landmark,
  Layers,
  ArrowRight,
  X
} from 'lucide-react';

export const VillageProfiles: React.FC = () => {
  const { setCurrentView, setSelectedVillage } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState<string>('semua');
  const [activeModalVillage, setActiveModalVillage] = useState<VillageProfile | null>(null);

  // Extract unique commodities for filtering
  const allCommodities = Array.from(
    new Set(GUMELAR_VILLAGES.flatMap((v) => v.commodities))
  );

  const filteredVillages = GUMELAR_VILLAGES.filter((village) => {
    const matchesSearch =
      village.name.toLowerCase().includes(search.toLowerCase()) ||
      village.description.toLowerCase().includes(search.toLowerCase()) ||
      village.head.toLowerCase().includes(search.toLowerCase());

    const matchesCommodity =
      selectedCommodity === 'semua' ||
      village.commodities.some((c) =>
        c.toLowerCase().includes(selectedCommodity.toLowerCase())
      );

    return matchesSearch && matchesCommodity;
  });

  const handleOpenMap = (village: VillageProfile) => {
    setSelectedVillage(village);
    setActiveModalVillage(null);
    setCurrentView('peta');
  };

  const handleMakeReport = (village: VillageProfile) => {
    setSelectedVillage(village);
    setActiveModalVillage(null);
    setCurrentView('pengaduan');
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header & Description */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <Landmark className="w-3.5 h-3.5 text-emerald-700" />
            <span>Pemerintahan Desa Terpadu</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Profil 10 Desa di Kecamatan Gumelar
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            Kenali keunggulan potensi agraris, kerajinan lokal, profil pemerintahan, dan karakteristik
            setiap desa di lingkungan Kecamatan Gumelar, Kabupaten Banyumas.
          </p>
        </div>

        {/* Quick Total Badges */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
            Total: 10 Desa
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            Luas: 93,95 km²
          </span>
        </div>
      </div>

      {/* Search & Commodity Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari desa, nama kepala desa, atau potensi..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Reset
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-500 shrink-0">Filter Komoditas:</span>
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="semua">Semua Komoditas</option>
              <option value="Gula">Gula Kelapa / Semut</option>
              <option value="Kapulaga">Kapulaga & Rempah</option>
              <option value="Kopi">Kopi Robusta</option>
              <option value="Sapu">Kerajinan Sapu Rayung</option>
              <option value="Bambu">Kerajinan Bambu</option>
              <option value="Wisata">Potensi Wisata</option>
              <option value="Ikan">Perikanan Air Tawar</option>
            </select>
          </div>
        </div>
      </div>

      {/* Villages Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVillages.map((village) => (
          <div
            key={village.id}
            className="rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all overflow-hidden flex flex-col group"
          >
            {/* Village Hero Image */}
            <div className="relative h-44 overflow-hidden bg-slate-100">
              <img
                src={village.heroImage}
                alt={village.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-xs text-white text-[11px] font-bold shadow-xs">
                  {village.rtRw}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="text-xl font-black tracking-tight">{village.name}</h3>
                <p className="text-xs text-emerald-200 font-medium line-clamp-1">{village.tagline}</p>
              </div>
            </div>

            {/* Village Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {village.description}
              </p>

              {/* Village Stats */}
              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Kepala Desa</span>
                  <span className="font-bold text-slate-800 line-clamp-1">{village.head}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Penduduk & Luas</span>
                  <span className="font-bold text-slate-800">
                    {village.population.toLocaleString('id-ID')} jiwa • {village.areaKm2} km²
                  </span>
                </div>
              </div>

              {/* Commodities Tags */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                  Komoditas & Potensi Unggulan:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {village.commodities.map((com, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-100"
                    >
                      {com}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveModalVillage(village)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <span>Detail Profil</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleOpenMap(village)}
                  className="px-3 py-2 rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-slate-100 text-xs font-semibold transition-colors flex items-center gap-1"
                  title="Lihat koordinat desa di Peta"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Titik Peta</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Village Modal */}
      {activeModalVillage && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 my-6 animate-in fade-in zoom-in-95">
            {/* Modal Header Image */}
            <div className="relative h-52 sm:h-64 bg-slate-900">
              <img
                src={activeModalVillage.heroImage}
                alt={activeModalVillage.name}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <button
                onClick={() => setActiveModalVillage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition-colors"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold inline-block mb-1">
                  Kecamatan Gumelar • Kab. Banyumas
                </span>
                <h3 className="text-2xl sm:text-3xl font-black">{activeModalVillage.name}</h3>
                <p className="text-xs sm:text-sm text-emerald-200 font-medium">
                  {activeModalVillage.tagline}
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Gambaran Umum & Karakteristik
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeModalVillage.description}
                </p>
              </div>

              {/* Leadership & Demographics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Aparatur Desa</span>
                  <div className="text-sm font-bold text-slate-900">
                    Kades: {activeModalVillage.head}
                  </div>
                  <div className="text-xs text-slate-600">
                    Sekdes: {activeModalVillage.secretary}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Kependudukan & Wilayah</span>
                  <div className="text-sm font-bold text-slate-900">
                    {activeModalVillage.population.toLocaleString('id-ID')} Jiwa • {activeModalVillage.areaKm2} km²
                  </div>
                  <div className="text-xs text-slate-600">
                    Pembagian Wilayah: {activeModalVillage.rtRw}
                  </div>
                </div>
              </div>

              {/* Key Features & Landmarks */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Fasilitas & Potensi Utama
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalVillage.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs font-semibold text-emerald-900 flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Contact Info */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Kontak Balai Desa {activeModalVillage.name}
                </h4>
                <div className="text-xs space-y-1 text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{activeModalVillage.officeAddress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{activeModalVillage.contactPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{activeModalVillage.email}</span>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => handleMakeReport(activeModalVillage)}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Lapor Aduan di Desa Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenMap(activeModalVillage)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Lihat di Peta Digital</span>
                  </button>
                  <button
                    onClick={() => setActiveModalVillage(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
