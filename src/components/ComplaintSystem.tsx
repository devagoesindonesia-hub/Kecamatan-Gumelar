import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GUMELAR_VILLAGES } from '../data/gumelarData';
import { Complaint, ComplaintStatus } from '../types';
import {
  MessageSquareWarning,
  Send,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Eye,
  EyeOff,
  Upload,
  Camera,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ChevronRight,
  User,
  MapPin,
  Calendar,
  X,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ComplaintSystem: React.FC = () => {
  const {
    complaints,
    addComplaint,
    updateComplaintStatus,
    isAdminMode,
    setIsAdminMode,
    selectedVillage
  } = useApp();

  // Filters
  const [filterStatus, setFilterStatus] = useState<string>('semua');
  const [filterCategory, setFilterCategory] = useState<string>('semua');
  const [filterVillage, setFilterVillage] = useState<string>(selectedVillage?.name || 'semua');
  const [trackingSearch, setTrackingSearch] = useState<string>('');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  // New complaint form state
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Complaint['category']>('jalan_jembatan');
  const [village, setVillage] = useState(selectedVillage?.name || GUMELAR_VILLAGES[0].name);
  const [locationDetails, setLocationDetails] = useState('');
  const [description, setDescription] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [priority, setPriority] = useState<Complaint['priority']>('sedang');
  const [imageUrl, setImageUrl] = useState('');
  const [newComplaintCreatedId, setNewComplaintCreatedId] = useState<string | null>(null);

  // Officer follow-up modal state
  const [showOfficerModal, setShowOfficerModal] = useState<boolean>(false);
  const [officerStatus, setOfficerStatus] = useState<ComplaintStatus>('diproses');
  const [officerName, setOfficerName] = useState('Ir. H. Joko Santoso (Kasi Trantib & Tim Reaksi Cepat)');
  const [officerNote, setOfficerNote] = useState('');
  const [officerProofUrl, setOfficerProofUrl] = useState('');

  // Sample photos for quick one-click testing
  const samplePhotos = [
    { label: 'Jalan Berlubang', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80' },
    { label: 'PJU Padam', url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80' },
    { label: 'Pohon Roboh / Tebing', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80' }
  ];

  const sampleResolutionPhotos = [
    { label: 'Aspal Selesai Ditambal', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80' },
    { label: 'Lampu PJU Menyala', url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80' },
    { label: 'Pohon Selesai Dipangkas', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80' }
  ];

  // Filtering complaints
  const filteredComplaints = complaints.filter((c) => {
    const matchesStatus = filterStatus === 'semua' || c.status === filterStatus;
    const matchesCategory = filterCategory === 'semua' || c.category === filterCategory;
    const matchesVillage = filterVillage === 'semua' || c.village.toLowerCase() === filterVillage.toLowerCase();
    const matchesSearch =
      trackingSearch === '' ||
      c.id.toLowerCase().includes(trackingSearch.toLowerCase()) ||
      c.title.toLowerCase().includes(trackingSearch.toLowerCase()) ||
      c.description.toLowerCase().includes(trackingSearch.toLowerCase());

    return matchesStatus && matchesCategory && matchesVillage && matchesSearch;
  });

  const handleSubmitNewComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !village) return;

    const assignedId = addComplaint({
      title,
      category,
      village,
      locationDetails,
      description,
      reporterName: isAnonymous ? 'Warga Gumelar (Anonim)' : reporterName || 'Warga Masyarakat',
      reporterPhone: reporterPhone || '-',
      isAnonymous,
      priority,
      status: 'diajukan',
      imageUrl: imageUrl || samplePhotos[0].url
    });

    setNewComplaintCreatedId(assignedId);
    setShowFormModal(false);

    // Reset fields
    setTitle('');
    setLocationDetails('');
    setDescription('');
    setReporterName('');
    setReporterPhone('');
    setImageUrl('');

    // Trigger confetti
    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    } catch {
      // Ignored
    }
  };

  const handleOfficerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    updateComplaintStatus(
      selectedComplaint.id,
      officerStatus,
      officerName,
      officerNote || `Laporan telah diproses dan status diubah menjadi ${officerStatus}.`,
      officerProofUrl || (officerStatus === 'selesai' ? sampleResolutionPhotos[0].url : undefined)
    );

    // Update active modal view with fresh complaint data
    const updated = complaints.find((c) => c.id === selectedComplaint.id);
    if (updated) {
      setSelectedComplaint(updated);
    }

    setShowOfficerModal(false);
    setOfficerNote('');
  };

  // Quick 1-click test simulation
  const handleQuickDemoFollowUp = (complaint: Complaint) => {
    updateComplaintStatus(
      complaint.id,
      'selesai',
      'Tim Sapu Lubang DPU & Kasi Trantib Gumelar',
      'Pekerjaan perbaikan lapangan telah dirampungkan sore ini. Arus lalu lintas warga telah kembali aman dan lancar.',
      sampleResolutionPhotos[0].url
    );
  };

  const getStatusBadge = (status: ComplaintStatus) => {
    switch (status) {
      case 'diajukan':
        return (
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>Diajukan</span>
          </span>
        );
      case 'diverifikasi':
        return (
          <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-blue-600" />
            <span>Diverifikasi</span>
          </span>
        );
      case 'diproses':
        return (
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>Sedang Ditangani</span>
          </span>
        );
      case 'selesai':
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Selesai</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold">
            {status}
          </span>
        );
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <MessageSquareWarning className="w-3.5 h-3.5 text-amber-700" />
            <span>LAPOR GUMELAR • Pengaduan Terintegrasi & Notifikasi Real-Time</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Sistem Pengaduan & Aspirasi Warga Gumelar
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            Laporkan jalan berlubang, lampu jalan mati, kendala layanan, atau bencana alam.
            Setiap tindak lanjut dari petugas kecamatan memicu <span className="font-bold text-emerald-700">notifikasi instan real-time</span> ke perangkat Anda.
          </p>
        </div>

        {/* Action Buttons: New Complaint & Admin Mode Indicator */}
        <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
          <button
            onClick={() => setShowFormModal(true)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-700/25 flex items-center gap-2 transition-all transform active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Buat Laporan Aduan Baru</span>
          </button>

          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`px-4 py-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              isAdminMode
                ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
            title="Klik untuk beralih mode simulasi Petugas Kecamatan"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isAdminMode ? 'Mode Petugas Aktif' : 'Simulasi Petugas'}</span>
          </button>
        </div>
      </div>

      {/* Admin Mode Notice Bar */}
      {isAdminMode && (
        <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-400 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm block">
                Anda Sedang Berada di Mode Petugas Kecamatan Gumelar
              </span>
              <span className="text-xs text-amber-900/80">
                Panjenengan dapat mengubah status laporan warga, menuliskan catatan investigasi, dan mengunggah foto bukti tindak lanjut yang memicu notifikasi real-time seketika.
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsAdminMode(false)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shrink-0 self-end sm:self-auto"
          >
            Keluar Mode Petugas
          </button>
        </div>
      )}

      {/* New Complaint Success Alert Banner */}
      {newComplaintCreatedId && (
        <div className="mb-8 p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <span className="font-extrabold text-sm block">
                Aduan Anda Berhasil Diterbitkan dengan Kode #{newComplaintCreatedId}
              </span>
              <span className="text-xs text-emerald-800">
                Gunakan nomor tiket ini untuk melacak status penanganan. Petugas kecamatan telah menerima pemberitahuan.
              </span>
            </div>
          </div>
          <button
            onClick={() => setNewComplaintCreatedId(null)}
            className="p-1 text-emerald-700 hover:text-emerald-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter and Tracking Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Tracking Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={trackingSearch}
              onChange={(e) => setTrackingSearch(e.target.value)}
              placeholder="Cari kata kunci atau lacak Kode Aduan (misal: GML-2026-0042)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Village Filter */}
          <div className="md:col-span-3">
            <select
              value={filterVillage}
              onChange={(e) => setFilterVillage(e.target.value)}
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

          {/* Category Filter */}
          <div className="md:col-span-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="semua">Semua Kategori</option>
              <option value="jalan_jembatan">Jalan & Jembatan</option>
              <option value="pju_listrik">Penerangan Jalan (PJU)</option>
              <option value="bencana_alam">Bencana Alam & Longsor</option>
              <option value="layanan_publik">Pelayanan Publik</option>
              <option value="kesehatan_lingkungan">Kesehatan & Lingkungan</option>
              <option value="keamanan">Keamanan Lingkungan</option>
            </select>
          </div>
        </div>

        {/* Status Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1">
          <span className="text-xs font-bold text-slate-500 shrink-0">Status:</span>
          {['semua', 'diajukan', 'diverifikasi', 'diproses', 'selesai'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 rounded-xl text-xs font-bold capitalize shrink-0 transition-all ${
                filterStatus === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'semua' ? 'Semua Status' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Complaints List Cards */}
      <div className="space-y-4">
        {filteredComplaints.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <MessageSquareWarning className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="font-bold text-slate-700 text-base">Tidak Ada Laporan yang Cocok</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Silakan sesuaikan kata kunci pencarian atau buat pengaduan baru bila menemukan kendala di wilayah Anda.
            </p>
          </div>
        ) : (
          filteredComplaints.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-lg transition-all p-5 flex flex-col md:flex-row gap-5 items-start justify-between group"
            >
              {/* Thumbnail if any */}
              {item.imageUrl && (
                <div className="w-full md:w-36 h-28 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Main Content */}
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    #{item.id}
                  </span>
                  {getStatusBadge(item.status)}
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {item.village}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    • {new Date(item.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                <h3
                  onClick={() => setSelectedComplaint(item)}
                  className="font-bold text-slate-900 text-base cursor-pointer hover:text-emerald-700 transition-colors"
                >
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-3 pt-1">
                  <span>Pelapor: <strong>{item.reporterName}</strong></span>
                  <span>Lokasi: {item.locationDetails}</span>
                  {item.updates.length > 0 && (
                    <span className="text-emerald-700 font-semibold">
                      {item.updates.length} Pembaruan Petugas
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 self-stretch md:self-auto justify-end">
                <button
                  onClick={() => setSelectedComplaint(item)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat Detail Timeline</span>
                </button>

                {isAdminMode && (
                  <button
                    onClick={() => {
                      setSelectedComplaint(item);
                      setOfficerStatus(item.status === 'selesai' ? 'diproses' : 'selesai');
                      setShowOfficerModal(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-sm"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Tindak Lanjuti (Petugas)</span>
                  </button>
                )}

                {/* 1-Click Fast Simulation Demo Button */}
                {item.status !== 'selesai' && (
                  <button
                    onClick={() => handleQuickDemoFollowUp(item)}
                    title="Simulasikan respon petugas dengan notifikasi audio & banner seketika"
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 border border-emerald-200"
                  >
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>⚡ Simulasi Tanggapi Selesai</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Complaint Modal Form */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 my-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Formulir Pengaduan LAPOR GUMELAR
                  </h3>
                  <p className="text-xs text-slate-500">
                    Sampaikan keluhan dan aspirasi untuk ditindaklanjuti kecamatan
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowFormModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitNewComplaint} className="py-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Judul Keluhan / Masalah *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Aspal Rusak Berlubang Parah di Tanjakan Kaliduren"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Kategori Pengaduan *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="jalan_jembatan">Jalan & Jembatan Rusak</option>
                    <option value="pju_listrik">Lampu Jalan (PJU) Mati</option>
                    <option value="bencana_alam">Bencana Longsor / Pohon Tumbang</option>
                    <option value="layanan_publik">Pelayanan Administrasi PATEN</option>
                    <option value="kesehatan_lingkungan">Kesehatan & Tempat Sampah</option>
                    <option value="keamanan">Ketertiban & Keamanan</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Desa Kejadian *
                  </label>
                  <select
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    {GUMELAR_VILLAGES.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Patokan Lokasi Rinci *
                </label>
                <input
                  type="text"
                  required
                  value={locationDetails}
                  onChange={(e) => setLocationDetails(e.target.value)}
                  placeholder="Contoh: RT 03 RW 02, sebelah timur jembatan Kali Cikawung"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Uraian Lengkap Kejadian / Keluhan *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan kondisi secara mendalam, sejak kapan terjadi, dan potensi dampak bahayanya..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Sample Photo Attachment Shortcut */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Lampiran Foto Bukti Lapangan
                </label>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[11px] text-slate-500 font-semibold">Gunakan foto contoh:</span>
                  {samplePhotos.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImageUrl(s.url)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                        imageUrl === s.url
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Atau tempel link URL foto bukti lapangan..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Reporter Info & Anonymous Toggle */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Identitas Pelapor</span>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Rahasiakan Nama Saya (Anonim)</span>
                  </label>
                </div>

                {!isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        value={reporterName}
                        onChange={(e) => setReporterName(e.target.value)}
                        placeholder="Nama Lengkap Anda"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        value={reporterPhone}
                        onChange={(e) => setReporterPhone(e.target.value)}
                        placeholder="Nomor WA (untuk info perkembangan)"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Laporan Pengaduan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Complaint Detail Timeline Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 my-6 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    #{selectedComplaint.id}
                  </span>
                  {getStatusBadge(selectedComplaint.status)}
                </div>
                <h3 className="text-lg font-black text-slate-900 leading-snug">
                  {selectedComplaint.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedComplaint(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-4 space-y-6">
              {/* Photo if any */}
              {selectedComplaint.imageUrl && (
                <div className="rounded-2xl overflow-hidden h-52 bg-slate-100 border border-slate-200">
                  <img
                    src={selectedComplaint.imageUrl}
                    alt={selectedComplaint.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Key metadata grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Desa</span>
                  <span className="font-bold text-slate-800">{selectedComplaint.village}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Pelapor</span>
                  <span className="font-bold text-slate-800">{selectedComplaint.reporterName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Waktu Lapor</span>
                  <span className="font-bold text-slate-800">
                    {new Date(selectedComplaint.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Prioritas</span>
                  <span className="font-bold capitalize text-amber-600">
                    {selectedComplaint.priority}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Uraian Laporan
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                  {selectedComplaint.description}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  📍 Lokasi Spesifik: <strong>{selectedComplaint.locationDetails}</strong>
                </p>
              </div>

              {/* Chronological Progress Timeline */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                  <span>Kronologi & Tindak Lanjut Tim Kecamatan</span>
                  <span className="text-emerald-700 font-semibold text-[11px]">
                    Status: {selectedComplaint.status.toUpperCase()}
                  </span>
                </h4>

                <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
                  {selectedComplaint.updates.length === 0 ? (
                    <p className="text-xs text-slate-400 italic pl-8">
                      Laporan baru masuk, sedang menunggu disposisi tim verifikasi kecamatan.
                    </p>
                  ) : (
                    selectedComplaint.updates.map((up) => (
                      <div key={up.id} className="relative flex items-start gap-3 pl-1">
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold z-10 shrink-0 ring-4 ring-white">
                          ✓
                        </div>
                        <div className="flex-1 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-slate-900">{up.officerName}</span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(up.timestamp).toLocaleString('id-ID', {
                                dateStyle: 'short',
                                timeStyle: 'short'
                              })}
                            </span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed">{up.note}</p>
                          {up.proofImageUrl && (
                            <div className="mt-2 rounded-xl overflow-hidden h-32 border border-slate-200">
                              <img
                                src={up.proofImageUrl}
                                alt="Bukti penyelesaian"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedComplaint(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Tutup
              </button>

              <button
                onClick={() => {
                  setShowOfficerModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Beri Tanggapan Petugas & Picu Notifikasi</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Officer Response Action Modal (Tindak Lanjut & Trigger Real-Time Notification) */}
      {showOfficerModal && selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 my-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">
                    Tindak Lanjut Laporan #{selectedComplaint.id}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tindakan ini akan mengirimkan notifikasi real-time & sinyal audio ke pemohon
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowOfficerModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleOfficerSubmit} className="py-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Ubah Status Penanganan *
                </label>
                <select
                  value={officerStatus}
                  onChange={(e) => setOfficerStatus(e.target.value as ComplaintStatus)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="diverifikasi">Diverifikasi Tim Kecamatan</option>
                  <option value="diproses">Sedang Ditangani di Lapangan</option>
                  <option value="selesai">Selesai Ditindaklanjuti (Tuntas)</option>
                  <option value="ditolak">Ditolak / Non-Kewenangan</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nama Petugas / Instansi Pelaksana *
                </label>
                <input
                  type="text"
                  required
                  value={officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                  placeholder="Nama & Jabatan Petugas Penanggung Jawab"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Catatan Tindak Lanjut Lapangan *
                </label>
                <textarea
                  rows={3}
                  required
                  value={officerNote}
                  onChange={(e) => setOfficerNote(e.target.value)}
                  placeholder="Contoh: Tim lapangan telah selesai menambal lubang jalan dan memasang penerangan baru. Kondisi telah kembali normal."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Resolution Photo Attachment */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Foto Bukti Penyelesaian (Opsional)
                </label>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[11px] text-slate-500 font-semibold">Gunakan foto contoh:</span>
                  {sampleResolutionPhotos.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setOfficerProofUrl(s.url)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                        officerProofUrl === s.url
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  value={officerProofUrl}
                  onChange={(e) => setOfficerProofUrl(e.target.value)}
                  placeholder="URL foto bukti pengerjaan lapangan..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowOfficerModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Tindak Lanjut & Picu Notifikasi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
