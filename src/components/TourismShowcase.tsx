import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GUMELAR_TOURISM } from '../data/gumelarData';
import { TourismSpot } from '../types';
import {
  Mountain,
  MapPin,
  Clock,
  Ticket,
  Sparkles,
  Info,
  ChevronRight,
  ExternalLink,
  Camera,
  X
} from 'lucide-react';

export const TourismShowcase: React.FC = () => {
  const { setCurrentView } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('semua');
  const [selectedSpot, setSelectedSpot] = useState<TourismSpot | null>(null);

  const filteredSpots = GUMELAR_TOURISM.filter((spot) => {
    if (activeCategory === 'semua') return true;
    return spot.category === activeCategory;
  });

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <Mountain className="w-3.5 h-3.5 text-amber-700" />
            <span>Pesona Alam & Kearifan Lokal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Potensi Wisata & Kebudayaan Gumelar
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            Dari ketinggian Puncak Wadas, segarnya Curug Ciranggon, atraksi penderes nira kelapa,
            hingga pagelaran tari Ebeg Banyumasan yang sarat nilai luhur gotong royong.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('peta')}
          className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow"
        >
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Buka Titik Wisata di Peta</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8">
        {[
          { id: 'semua', label: 'Semua Destinasi' },
          { id: 'alam', label: 'Wisata Alam & Puncak' },
          { id: 'agrowisata', label: 'Agrowisata & Kerajinan' },
          { id: 'budaya', label: 'Seni Budaya & Tradisi' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              activeCategory === tab.id
                ? 'bg-amber-600 text-white shadow'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tourism Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpots.map((spot) => (
          <div
            key={spot.id}
            className="rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-amber-300 transition-all overflow-hidden flex flex-col justify-between group"
          >
            {/* Card Hero Image */}
            <div className="relative h-52 bg-slate-100 overflow-hidden">
              <img
                src={spot.image}
                alt={spot.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider shadow">
                  {spot.category}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1 mb-0.5">
                  <MapPin className="w-3 h-3" />
                  {spot.village}
                </span>
                <h3 className="text-lg font-bold leading-tight">{spot.name}</h3>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {spot.description}
              </p>

              <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Ticket className="w-3.5 h-3.5 text-amber-600" />
                    Tiket Masuk:
                  </span>
                  <span className="font-bold text-slate-900">{spot.ticketPrice}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    Jam Buka:
                  </span>
                  <span className="font-semibold text-slate-800 truncate max-w-[140px]">
                    {spot.hours}
                  </span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 block uppercase">
                  Daya Tarik Utama:
                </span>
                <div className="flex flex-wrap gap-1">
                  {spot.highlights.slice(0, 3).map((hl, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-medium"
                    >
                      • {hl}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedSpot(spot)}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Lihat Panduan & Galeri Foto</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tourism Detail Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 my-6 animate-in fade-in zoom-in-95">
            {/* Hero Image */}
            <div className="relative h-60 sm:h-72 bg-slate-900">
              <img
                src={selectedSpot.image}
                alt={selectedSpot.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              <button
                onClick={() => setSelectedSpot(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider inline-block mb-1">
                  {selectedSpot.category} • {selectedSpot.village}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black">{selectedSpot.name}</h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Tentang Destinasi
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedSpot.description}
                </p>
              </div>

              {/* Price & Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="text-slate-400 block font-bold uppercase text-[10px]">
                    Tiket & Retribusi
                  </span>
                  <span className="text-sm font-extrabold text-slate-900">
                    {selectedSpot.ticketPrice}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="text-slate-400 block font-bold uppercase text-[10px]">
                    Jam Operasional
                  </span>
                  <span className="text-sm font-extrabold text-slate-900">
                    {selectedSpot.hours}
                  </span>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Fasilitas & Daya Tarik
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedSpot.highlights.map((hl, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs font-semibold text-emerald-900 flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo Gallery */}
              {selectedSpot.gallery.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-slate-500" />
                    <span>Galeri Foto Suasana</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {selectedSpot.gallery.map((imgUrl, idx) => (
                      <div key={idx} className="h-28 rounded-xl overflow-hidden bg-slate-100">
                        <img
                          src={imgUrl}
                          alt={`${selectedSpot.name} - ${idx}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visitor Tips */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <span className="font-extrabold block text-sm mb-1">
                  💡 Tips Berkunjung & Kearifan Lokal:
                </span>
                <p className="leading-relaxed">{selectedSpot.tips}</p>
              </div>

              {/* Navigation Action */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedSpot.coordinates[0]},${selectedSpot.coordinates[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Petunjuk Arah Rute Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>

                <button
                  onClick={() => setSelectedSpot(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
