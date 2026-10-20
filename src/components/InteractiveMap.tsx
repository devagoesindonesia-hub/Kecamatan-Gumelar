import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useApp } from '../context/AppContext';
import { GUMELAR_FACILITIES, GUMELAR_VILLAGES, KECAMATAN_INFO } from '../data/gumelarData';
import { FacilityLocation, CategoryType } from '../types';
import {
  MapPin,
  Search,
  Filter,
  HeartPulse,
  GraduationCap,
  Landmark,
  Mountain,
  Navigation,
  Phone,
  Clock,
  Layers,
  Info,
  Maximize2,
  ExternalLink
} from 'lucide-react';

export const InteractiveMap: React.FC = () => {
  const { selectedVillage, setSelectedVillage, selectedFacility, setSelectedFacility } = useApp();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>('semua');
  const [selectedVillageFilter, setSelectedVillageFilter] = useState<string>('semua');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeFacilityDetail, setActiveFacilityDetail] = useState<FacilityLocation | null>(null);

  // Combine standard facilities with the 10 Village Hall locations as government facilities
  const allMapPoints: FacilityLocation[] = [
    ...GUMELAR_FACILITIES,
    ...GUMELAR_VILLAGES.map((v) => ({
      id: `balai-${v.id}`,
      name: `Kantor Balai ${v.name}`,
      category: 'pemerintahan' as CategoryType,
      village: v.name,
      lat: v.latitude,
      lng: v.longitude,
      address: v.officeAddress,
      phone: v.contactPhone,
      operatingHours: 'Senin - Jumat: 08.00 - 15.00 WIB',
      description: `Pusat layanan administrasi kependudukan desa, musyawarah warga, dan pelayanan ${v.head} selaku Kepala Desa.`,
      image: v.heroImage,
      tags: ['Balai Desa', 'Pelayanan Surat', 'Musdes', v.head]
    }))
  ];

  // Filtering
  const filteredPoints = allMapPoints.filter((item) => {
    const matchesCategory =
      activeCategory === 'semua' || item.category === activeCategory;

    const matchesVillage =
      selectedVillageFilter === 'semua' ||
      item.village.toLowerCase() === selectedVillageFilter.toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesVillage && matchesSearch;
  });

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Already initialized

    try {
      if ((mapContainerRef.current as any)._leaflet_id) {
        delete (mapContainerRef.current as any)._leaflet_id;
      }

      // Default center Gumelar
      const initialCenter = selectedVillage
        ? [selectedVillage.latitude, selectedVillage.longitude]
        : KECAMATAN_INFO.centerCoordinates;

      const map = L.map(mapContainerRef.current, {
        center: initialCenter as [number, number],
        zoom: 13,
        scrollWheelZoom: true
      });

      // Clean OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
      markersGroupRef.current = markersGroup;
    } catch (e) {
      console.warn('Leaflet map initialization warning:', e);
    }

    return () => {
      try {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      } catch (err) {
        console.warn('Leaflet cleanup warning:', err);
      }
    };
  }, []);

  // Sync selectedVillage from external state if set
  useEffect(() => {
    if (selectedVillage && mapInstanceRef.current) {
      mapInstanceRef.current.setView([selectedVillage.latitude, selectedVillage.longitude], 14, {
        animate: true
      });
      setSelectedVillageFilter(selectedVillage.name);
    }
  }, [selectedVillage]);

  // Update Markers when filter changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    // Helper for custom SVG pin icons
    const createCustomIcon = (cat: CategoryType) => {
      let bgColor = '#059669'; // emerald
      let iconSvg = '🏛️';

      if (cat === 'kesehatan') {
        bgColor = '#e11d48'; // rose
        iconSvg = '🏥';
      } else if (cat === 'pendidikan') {
        bgColor = '#2563eb'; // blue
        iconSvg = '🎓';
      } else if (cat === 'wisata') {
        bgColor = '#d97706'; // amber
        iconSvg = '🌲';
      }

      return L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            background-color: ${bgColor};
            color: white;
            width: 34px;
            height: 34px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
            border: 2px solid white;
          ">
            <span style="transform: rotate(45deg); font-size: 15px;">${iconSvg}</span>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -34]
      });
    };

    filteredPoints.forEach((point) => {
      const marker = L.marker([point.lat, point.lng], {
        icon: createCustomIcon(point.category)
      });

      marker.bindPopup(`
        <div style="font-family: inherit; font-size: 12px; max-width: 240px;">
          <h4 style="font-weight: 800; font-size: 13px; color: #0f172a; margin-bottom: 4px;">${point.name}</h4>
          <span style="display: inline-block; padding: 2px 8px; border-radius: 9999px; font-weight: 700; font-size: 10px; background: #ecfdf5; color: #047857; margin-bottom: 6px;">
            ${point.village}
          </span>
          <p style="color: #475569; margin: 4px 0 8px; font-size: 11px; line-height: 1.4;">${point.description.substring(0, 95)}...</p>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">
            📍 ${point.address}
          </div>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}" target="_blank" rel="noopener noreferrer" style="
            display: inline-block;
            background: #059669;
            color: white;
            padding: 6px 12px;
            border-radius: 8px;
            font-weight: bold;
            text-decoration: none;
            font-size: 11px;
          ">
            Buka Navigasi →
          </a>
        </div>
      `);

      marker.on('click', () => {
        setActiveFacilityDetail(point);
      });

      markersGroup.addLayer(marker);
    });
  }, [filteredPoints]);

  const handleSelectFacility = (fac: FacilityLocation) => {
    setActiveFacilityDetail(fac);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([fac.lat, fac.lng], 15, { animate: true });
    }
  };

  const resetMapCenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(KECAMATAN_INFO.centerCoordinates, 13, { animate: true });
      setActiveCategory('semua');
      setSelectedVillageFilter('semua');
      setSearchTerm('');
      setSelectedVillage(null);
    }
  };

  return (
    <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
            <MapPin className="w-3.5 h-3.5 text-blue-700" />
            <span>Peta Digital Wilayah Terpadu</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Peta Fasilitas Kesehatan, Pendidikan & Pemerintahan
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            Telusuri sebaran fasilitas publik Puskesmas, Pustu, sekolah negeri & swasta, kantor balai desa,
            serta titik destinasi wisata di seluruh penjuru Kecamatan Gumelar.
          </p>
        </div>

        <button
          onClick={resetMapCenter}
          className="self-start md:self-auto px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Pusatkan ke Ibu Kota Gumelar</span>
        </button>
      </div>

      {/* Control Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-6 space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveCategory('semua')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              activeCategory === 'semua'
                ? 'bg-slate-900 text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua Fasilitas ({allMapPoints.length})
          </button>
          <button
            onClick={() => setActiveCategory('kesehatan')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
              activeCategory === 'kesehatan'
                ? 'bg-rose-600 text-white shadow'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Kesehatan & Puskesmas</span>
          </button>
          <button
            onClick={() => setActiveCategory('pendidikan')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
              activeCategory === 'pendidikan'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Pendidikan (SD, SMP, SMK)</span>
          </button>
          <button
            onClick={() => setActiveCategory('pemerintahan')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
              activeCategory === 'pemerintahan'
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Pemerintahan & Kantor Desa</span>
          </button>
          <button
            onClick={() => setActiveCategory('wisata')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
              activeCategory === 'wisata'
                ? 'bg-amber-600 text-white shadow'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <Mountain className="w-3.5 h-3.5" />
            <span>Destinasi Wisata</span>
          </button>
        </div>

        {/* Search & Village Dropdown */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari faskes, sekolah, kantor desa, atau alamat jalan..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedVillageFilter}
              onChange={(e) => setSelectedVillageFilter(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="semua">Semua Desa (10 Desa)</option>
              {GUMELAR_VILLAGES.map((v) => (
                <option key={v.id} value={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Map & Side Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Leaflet Map Canvas */}
        <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-slate-200 shadow-md relative h-[520px] bg-slate-100">
          <div ref={mapContainerRef} className="w-full h-full z-10" />

          {/* Quick Legend Overlay */}
          <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-slate-200 text-[11px] space-y-1.5 hidden sm:block">
            <span className="font-bold text-slate-800 block text-xs">Legenda Peta:</span>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-600" />
              <span className="text-slate-600">Fasilitas Kesehatan</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600" />
              <span className="text-slate-600">Fasilitas Pendidikan</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600" />
              <span className="text-slate-600">Pemerintahan & Balai Desa</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-600" />
              <span className="text-slate-600">Wisata & Rekreasi</span>
            </div>
          </div>
        </div>

        {/* Side Panel: Results List & Active Detail */}
        <div className="lg:col-span-4 flex flex-col h-[520px] rounded-3xl bg-white border border-slate-200 shadow-md overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Daftar Titik Lokasi</h3>
              <p className="text-xs text-slate-500">
                Menampilkan {filteredPoints.length} titik ditemukan
              </p>
            </div>
            {activeFacilityDetail && (
              <button
                onClick={() => setActiveFacilityDetail(null)}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900"
              >
                Tutup Detail
              </button>
            )}
          </div>

          {/* Active Detail View if selected, else List */}
          {activeFacilityDetail ? (
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              <div className="relative h-36 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={activeFacilityDetail.image}
                  alt={activeFacilityDetail.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-[10px] font-bold">
                  {activeFacilityDetail.village}
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-base leading-tight">
                  {activeFacilityDetail.name}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {activeFacilityDetail.description}
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{activeFacilityDetail.address}</span>
                </div>
                {activeFacilityDetail.operatingHours && (
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{activeFacilityDetail.operatingHours}</span>
                  </div>
                )}
                {activeFacilityDetail.phone && (
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{activeFacilityDetail.phone}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {activeFacilityDetail.tags.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-100"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Navigation Button */}
              <div className="pt-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${activeFacilityDetail.lat},${activeFacilityDetail.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Petunjuk Arah (Buka di Google Maps)</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          ) : (
            <div className="overflow-y-auto divide-y divide-slate-100 flex-1">
              {filteredPoints.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  Tidak ditemukan fasilitas dengan kriteria pencarian ini.
                </div>
              ) : (
                filteredPoints.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectFacility(item)}
                    className="p-3.5 hover:bg-slate-50 cursor-pointer transition-colors group flex items-start gap-3"
                  >
                    <div className="p-2 rounded-xl bg-slate-100 shrink-0 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                      {item.category === 'kesehatan' && <HeartPulse className="w-4 h-4 text-rose-600" />}
                      {item.category === 'pendidikan' && <GraduationCap className="w-4 h-4 text-blue-600" />}
                      {item.category === 'pemerintahan' && <Landmark className="w-4 h-4 text-emerald-600" />}
                      {item.category === 'wisata' && <Mountain className="w-4 h-4 text-amber-600" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-xs text-slate-900 group-hover:text-emerald-800 truncate">
                        {item.name}
                      </h5>
                      <span className="text-[10px] font-semibold text-emerald-700 block">
                        {item.village}
                      </span>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {item.address}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
