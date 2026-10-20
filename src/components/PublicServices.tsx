import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GUMELAR_SERVICES, GUMELAR_VILLAGES, KECAMATAN_INFO } from '../data/gumelarData';
import { PublicServiceItem } from '../types';
import {
  FileText,
  Clock,
  Coins,
  CheckSquare,
  Square,
  Download,
  Send,
  Phone,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  Printer,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PublicServices: React.FC = () => {
  const { setCurrentView } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('semua');
  const [selectedService, setSelectedService] = useState<PublicServiceItem | null>(null);
  const [checkedRequirements, setCheckedRequirements] = useState<Record<string, boolean>>({});

  // Online submission modal state
  const [submissionModalService, setSubmissionModalService] = useState<PublicServiceItem | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantNik, setApplicantNik] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantVillage, setApplicantVillage] = useState(GUMELAR_VILLAGES[0].name);
  const [applicantNotes, setApplicantNotes] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<{ ticketNumber: string; serviceName: string; queueDate: string } | null>(null);

  const filteredServices = GUMELAR_SERVICES.filter((srv) => {
    if (activeCategory === 'semua') return true;
    return srv.category === activeCategory;
  });

  const toggleRequirement = (req: string) => {
    setCheckedRequirements((prev) => ({
      ...prev,
      [req]: !prev[req]
    }));
  };

  const handleStartSubmission = (srv: PublicServiceItem) => {
    setSubmissionModalService(srv);
    setSubmittedTicket(null);
  };

  const handleOnlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantNik || !applicantPhone) return;

    const randomQueue = `PATEN-${Math.floor(100 + Math.random() * 900)}`;
    setSubmittedTicket({
      ticketNumber: randomQueue,
      serviceName: submissionModalService?.name || 'Layanan Administrasi',
      queueDate: new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    });

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // Ignored
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Title & Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
            <FileText className="w-3.5 h-3.5 text-blue-700" />
            <span>PATEN Terpadu Kecamatan Gumelar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Layanan Publik & Administrasi Warga
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            Seluruh layanan administrasi kependudukan, perizinan usaha, dan rekomendasi kecamatan
            berkomitmen melayani dengan cepat, transparan, dan <span className="font-bold text-emerald-700">100% Gratis Tanpa Pungutan Liar</span>.
          </p>
        </div>

        {/* Free Service Guarantee Badge */}
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 self-start md:self-auto">
          <div className="p-2 rounded-xl bg-emerald-600 text-white">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
              Standar Tarif Resmi
            </span>
            <span className="text-sm font-extrabold text-emerald-900">
              Rp 0,- (GRATIS)
            </span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8">
        {[
          { id: 'semua', label: 'Semua Layanan' },
          { id: 'kependudukan', label: 'Kependudukan (KTP & KK)' },
          { id: 'perizinan', label: 'Perizinan Usaha (SKU)' },
          { id: 'rekomendasi', label: 'Rekomendasi Nikah' },
          { id: 'sosial', label: 'Bantuan Sosial / DTKS' },
          { id: 'kesehatan', label: 'Kesehatan & Ambulans' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              activeCategory === tab.id
                ? 'bg-slate-900 text-white shadow'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((srv) => (
          <div
            key={srv.id}
            className="rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all p-6 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-100 uppercase tracking-wide">
                  {srv.category}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-100">
                  {srv.cost}
                </span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                {srv.name}
              </h3>
              <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                {srv.shortDesc}
              </p>
            </div>

            {/* Quick Specs */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  Waktu Proses:
                </span>
                <span className="font-bold text-slate-800">{srv.processingTime}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  Petugas PIC:
                </span>
                <span className="font-semibold text-slate-700 truncate max-w-[150px]">
                  {srv.contactPerson.split('-')[0]}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedService(srv)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors text-center"
              >
                Cek Syarat Berkas
              </button>

              {srv.onlineSubmissionAvailable ? (
                <button
                  onClick={() => handleStartSubmission(srv)}
                  className="py-2.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Ajukan Online</span>
                </button>
              ) : (
                <span className="text-[11px] font-medium text-slate-400 italic">
                  Datang Langsung
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal with Interactive Requirements Checklist */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 my-6 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wide">
                  Panduan Resmi PATEN
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {selectedService.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-5">
              {/* Cost & Processing time summary */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs">
                <div>
                  <span className="text-emerald-700 block font-semibold text-[10px] uppercase">
                    Biaya Retribusi
                  </span>
                  <span className="text-base font-black text-emerald-900">
                    {selectedService.cost}
                  </span>
                </div>
                <div>
                  <span className="text-emerald-700 block font-semibold text-[10px] uppercase">
                    Estimasi Selesai
                  </span>
                  <span className="text-base font-black text-emerald-900">
                    {selectedService.processingTime}
                  </span>
                </div>
              </div>

              {/* Requirements Checklist */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Daftar Dokumen Persyaratan
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Centang untuk cek kesiapan berkas
                  </span>
                </div>
                <div className="space-y-2">
                  {selectedService.requirements.map((req, idx) => {
                    const isChecked = !!checkedRequirements[req];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleRequirement(req)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 text-xs leading-relaxed ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="mt-0.5 text-emerald-600 shrink-0">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </span>
                        <span>{req}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step by step procedures */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Alur Prosedur Pengurusan
                </h4>
                <div className="space-y-2">
                  {selectedService.procedure.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact PIC */}
              <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-700">
                <span className="text-[10px] font-bold text-slate-500 block uppercase">
                  Kontak Informasi Pelayanan
                </span>
                <span className="font-bold text-slate-800">{selectedService.contactPerson}</span>
                <span className="block text-slate-500 text-[11px] mt-0.5">
                  Loket PATEN Kantor Kecamatan Gumelar ({KECAMATAN_INFO.workingHours})
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                Tutup
              </button>

              {selectedService.onlineSubmissionAvailable && (
                <button
                  onClick={() => {
                    const target = selectedService;
                    setSelectedService(null);
                    handleStartSubmission(target);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 flex items-center gap-1.5 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Isi Formulir Online Sekarang</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Online Submission Form Modal */}
      {submissionModalService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 my-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-700">
                  Formulir Pra-Permohonan Online
                </span>
                <h3 className="font-black text-slate-900 text-lg">
                  {submissionModalService.name}
                </h3>
              </div>
              <button
                onClick={() => setSubmissionModalService(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedTicket ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900">Permohonan Berhasil Dikirim!</h4>
                  <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                    Data Anda telah masuk ke sistem antrean pelayanan PATEN Kecamatan Gumelar.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 max-w-xs mx-auto text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    Nomor Tiket Antrean / Registrasi
                  </span>
                  <div className="text-2xl font-black font-mono text-emerald-700">
                    {submittedTicket.ticketNumber}
                  </div>
                  <div className="text-xs text-slate-600 font-semibold pt-1 border-t border-slate-200">
                    {submittedTicket.serviceName}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Tanggal: {submittedTicket.queueDate}
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed max-w-xs mx-auto">
                  Silakan simpan atau tangkap layar nomor tiket ini. Tunjukkan kepada petugas loket PATEN saat datang membawa berkas asli.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => setSubmissionModalService(null)}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow"
                  >
                    Selesai & Tutup
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleOnlineSubmit} className="py-4 space-y-4">
                <p className="text-xs text-slate-600">
                  Isi data identitas diri Anda untuk mempercepat proses verifikasi di loket kecamatan.
                </p>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Nama Lengkap Sesuai KTP *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Nomor Induk Kependudukan (NIK) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={16}
                      value={applicantNik}
                      onChange={(e) => setApplicantNik(e.target.value.replace(/\D/g, ''))}
                      placeholder="16 Digit NIK"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder="0812-xxxx-xxxx"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Asal Desa Domisili *
                  </label>
                  <select
                    value={applicantVillage}
                    onChange={(e) => setApplicantVillage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    {GUMELAR_VILLAGES.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Catatan Khusus / Keperluan Pemohon (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    value={applicantNotes}
                    onChange={(e) => setApplicantNotes(e.target.value)}
                    placeholder="Contoh: Mengajukan SKU untuk pendaftaran KUR Mikro BRI"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSubmissionModalService(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Dapatkan Nomor Antrean</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
