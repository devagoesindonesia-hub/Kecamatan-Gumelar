import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GUMELAR_VILLAGES } from '../data/gumelarData';
import { CommunityEvent } from '../types';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  PlusCircle,
  ExternalLink,
  Download,
  Search,
  Filter,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const EventCalendar: React.FC = () => {
  const { events, toggleEventAttendance, addCommunityEvent } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('semua');
  const [selectedVillage, setSelectedVillage] = useState<string>('semua');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  // Proposal modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CommunityEvent['category']>('kebudayaan');
  const [village, setVillage] = useState(GUMELAR_VILLAGES[0].name);
  const [date, setDate] = useState('2026-10-30');
  const [time, setTime] = useState('09.00 - 15.00 WIB');
  const [location, setLocation] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [description, setDescription] = useState('');

  const filteredEvents = events.filter((ev) => {
    const matchesCategory = activeCategory === 'semua' || ev.category === activeCategory;
    const matchesVillage = selectedVillage === 'semua' || ev.village === selectedVillage;
    const matchesSearch =
      searchTerm === '' ||
      ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesVillage && matchesSearch;
  });

  const handleRsvp = (eventId: string, isAttending?: boolean) => {
    toggleEventAttendance(eventId);
    if (!isAttending) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch {
        // Ignored
      }
    }
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location || !organizer) return;

    addCommunityEvent({
      title,
      category,
      village,
      date,
      time,
      location,
      organizer,
      description,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80'
    });

    setShowAddModal(false);
    setTitle('');
    setLocation('');
    setOrganizer('');
    setDescription('');
  };

  // Google Calendar URL generator
  const createGoogleCalendarUrl = (ev: CommunityEvent) => {
    const startStr = ev.date.replace(/-/g, '') + 'T090000Z';
    const endStr = ev.date.replace(/-/g, '') + 'T170000Z';
    const titleEncoded = encodeURIComponent(ev.title);
    const detailsEncoded = encodeURIComponent(`${ev.description}\n\nPenyelenggara: ${ev.organizer}`);
    const locationEncoded = encodeURIComponent(`${ev.location}, ${ev.village}, Kec. Gumelar`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titleEncoded}&dates=${startStr}/${endStr}&details=${detailsEncoded}&location=${locationEncoded}`;
  };

  // Download .ics file
  const downloadIcs = (ev: CommunityEvent) => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Kecamatan Gumelar//Agenda Warga//ID
BEGIN:VEVENT
SUMMARY:${ev.title}
DESCRIPTION:${ev.description}
LOCATION:${ev.location}, ${ev.village}
DTSTART:${ev.date.replace(/-/g, '')}T090000Z
DTEND:${ev.date.replace(/-/g, '')}T170000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${ev.title.substring(0, 20)}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold mb-2">
            <CalendarIcon className="w-3.5 h-3.5 text-indigo-700" />
            <span>Agenda & Kalender Warga Gumelar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Kalender Acara & Kegiatan Komunitas
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            Jadwal kegiatan festival seni ebeg, pelayanan posyandu dan pengobatan gratis,
            musyawarah pembangunan desa, serta kerja bakti gotong royong warga se-Kecamatan Gumelar.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Usulkan Acara Warga</span>
          </button>
        </div>
      </div>

      {/* Filter and View Mode Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari acara, lokasi lapangan, atau penyelenggara..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
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

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1">
          {[
            { id: 'semua', label: 'Semua Agenda' },
            { id: 'kebudayaan', label: 'Seni Ebeg & Budaya' },
            { id: 'kesehatan', label: 'Posyandu & Faskes' },
            { id: 'pemerintahan', label: 'Musrenbang & Desa' },
            { id: 'gotong_royong', label: 'Kerja Bakti Lingkungan' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                activeCategory === cat.id
                  ? 'bg-indigo-700 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className="rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all overflow-hidden flex flex-col justify-between group"
          >
            {/* Image Header with Date Overlay */}
            <div className="relative h-48 bg-slate-100 overflow-hidden">
              <img
                src={ev.image}
                alt={ev.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Date Box */}
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-xs text-slate-900 shadow-md text-center">
                <span className="block text-[10px] uppercase font-black text-indigo-700 leading-none">
                  {new Date(ev.date).toLocaleDateString('id-ID', { month: 'short' })}
                </span>
                <span className="block text-lg font-black leading-tight">
                  {new Date(ev.date).getDate()}
                </span>
              </div>

              {/* Category Pill */}
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
                  {ev.category.replace('_', ' ')}
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-xs font-semibold text-amber-300 block mb-0.5">
                  {ev.village}
                </span>
                <h3 className="text-base sm:text-lg font-bold leading-tight">
                  {ev.title}
                </h3>
              </div>
            </div>

            {/* Event Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {ev.description}
              </p>

              <div className="space-y-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>{ev.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span className="truncate">{ev.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">Penyelenggara: {ev.organizer}</span>
                </div>
              </div>

              {/* Interactions & RSVP */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => handleRsvp(ev.id, ev.userAttending)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    ev.userAttending
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {ev.userAttending ? 'Saya Berencana Hadir' : 'RSVP: Saya Akan Hadir'}
                  </span>
                  <span className="ml-1 px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
                    {ev.attendeesCount}
                  </span>
                </button>

                <div className="flex items-center gap-1">
                  <a
                    href={createGoogleCalendarUrl(ev)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                    title="Simpan ke Google Calendar"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => downloadIcs(ev)}
                    className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                    title="Unduh File Kalender .ics"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Event Proposal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 my-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Usulkan Agenda Acara Komunitas
                  </h3>
                  <p className="text-xs text-slate-500">
                    Daftarkan kegiatan desa agar tercatat di kalender warga se-Kecamatan Gumelar
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="py-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nama Kegiatan / Acara *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Gebyar Seni Calung & Pagelaran Wayang Kulit"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Kategori Acara *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="kebudayaan">Seni & Budaya</option>
                    <option value="kesehatan">Kesehatan & Posyandu</option>
                    <option value="pemerintahan">Pemerintahan & Musdes</option>
                    <option value="gotong_royong">Gotong Royong Lingkungan</option>
                    <option value="olahraga">Turnamen Olahraga</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Lokasi Desa *
                  </label>
                  <select
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    {GUMELAR_VILLAGES.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Tanggal Pelaksanaan *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Waktu Jam Mulai *
                  </label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Contoh: 08.00 - Selesai WIB"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Tempat / Titik Lokasi *
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Contoh: Lapangan Sepakbola Desa atau Balai RW"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Penyelenggara / Panitia *
                </label>
                <input
                  type="text"
                  required
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                  placeholder="Contoh: Karang Taruna Bina Remaja Desa Cihonje"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Deskripsi Singkat Acara *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan tujuan kegiatan, siapa saja yang diundang, dan rangkaian acaranya..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Jadwalkan di Kalender</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
