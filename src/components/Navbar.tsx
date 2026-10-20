import React, { useState } from 'react';
import { useApp, ViewType } from '../context/AppContext';
import { KECAMATAN_INFO } from '../data/gumelarData';
import {
  Bell,
  MapPin,
  FileText,
  MessageSquareWarning,
  Users,
  Calendar,
  Mountain,
  Home,
  ShieldCheck,
  User,
  PhoneCall,
  Menu,
  X,
  CheckCircle,
  ExternalLink,
  ChevronDown,
  Volume2
} from 'lucide-react';
import { playNotificationSound } from '../utils/sound';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    isAdminMode,
    setIsAdminMode,
    notifications,
    unreadNotifCount,
    markNotificationAsRead,
    markAllNotificationsAsRead
  } = useApp();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: ViewType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'beranda', label: 'Beranda', icon: <Home className="w-4 h-4" /> },
    { id: 'desa', label: '10 Profil Desa', icon: <Users className="w-4 h-4" /> },
    { id: 'layanan', label: 'Layanan Publik', icon: <FileText className="w-4 h-4" /> },
    { id: 'peta', label: 'Peta Fasilitas', icon: <MapPin className="w-4 h-4" /> },
    { id: 'wisata', label: 'Wisata & Budaya', icon: <Mountain className="w-4 h-4" /> },
    { id: 'pengaduan', label: 'Lapor Aduan', icon: <MessageSquareWarning className="w-4 h-4" /> },
    { id: 'forum', label: 'Rembug Warga', icon: <Users className="w-4 h-4" /> },
    { id: 'agenda', label: 'Kalender Acara', icon: <Calendar className="w-4 h-4" /> }
  ];

  const handleNavClick = (view: ViewType) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Banner Ticker: Info Darurat & Kontak Cepat */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-600/30 text-emerald-300 font-medium text-[11px] border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Pusat Pelayanan Terpadu
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline font-medium text-slate-300">
              {KECAMATAN_INFO.name}, {KECAMATAN_INFO.regency}
            </span>
            <span className="hidden lg:inline text-slate-400">• Jam Pelayanan: {KECAMATAN_INFO.workingHours}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowEmergencyModal(true)}
              className="flex items-center gap-1 text-red-400 hover:text-red-300 font-semibold transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              <span>Kontak Darurat (24 Jam)</span>
            </button>

            {/* Role Switcher Pill */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={() => setIsAdminMode(false)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-all ${
                  !isAdminMode
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Mode Warga
              </button>
              <button
                onClick={() => setIsAdminMode(true)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
                  isAdminMode
                    ? 'bg-amber-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Beralih ke mode Petugas Kecamatan untuk memproses & menanggapi aduan warga"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Petugas Kecamatan</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-18">
            {/* Logo & Brand */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => handleNavClick('beranda')}
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <Mountain className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                    Kecamatan Gumelar
                  </h1>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Kabupaten Banyumas • Jawa Tengah
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 shadow-xs ring-1 ring-emerald-200'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span className={isActive ? 'text-emerald-700' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons: Notifications & Quick Lapor */}
            <div className="flex items-center gap-2">
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                  className="relative p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-emerald-700 hover:bg-slate-50 hover:border-emerald-200 transition-all focus:outline-hidden"
                  aria-label="Notifikasi real-time"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                      {unreadNotifCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifDropdown && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 px-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm">Notifikasi Real-Time</span>
                        {unreadNotifCount > 0 && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {unreadNotifCount} Baru
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => playNotificationSound('success')}
                          title="Tes Bunyi Notifikasi"
                          className="p-1 text-slate-400 hover:text-emerald-600 rounded transition-colors"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        {unreadNotifCount > 0 && (
                          <button
                            onClick={markAllNotificationsAsRead}
                            className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900"
                          >
                            Tandai semua dibaca
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                      {notifications.length === 0 ? (
                        <div className="text-center py-6 text-slate-400 text-xs">
                          Belum ada notifikasi
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => {
                              markNotificationAsRead(notif.id);
                              if (notif.linkId) {
                                setCurrentView('pengaduan');
                              }
                              setShowNotifDropdown(false);
                            }}
                            className={`p-2.5 rounded-xl text-left cursor-pointer transition-colors border ${
                              notif.read
                                ? 'bg-slate-50/60 border-transparent hover:bg-slate-100 text-slate-600'
                                : 'bg-emerald-50/60 border-emerald-100 hover:bg-emerald-100/70 text-slate-800 font-medium'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-1 mb-1">
                              <h5 className="text-xs font-bold text-slate-900 leading-tight">
                                {notif.title}
                              </h5>
                              <span className="text-[10px] text-slate-400 shrink-0">
                                {new Date(notif.timestamp).toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                              {notif.message}
                            </p>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="pt-2 mt-2 border-t border-slate-100 text-center">
                      <button
                        onClick={() => {
                          setCurrentView('pengaduan');
                          setShowNotifDropdown(false);
                        }}
                        className="text-xs font-semibold text-emerald-700 hover:text-emerald-900"
                      >
                        Buka Ruang Laporan & Status Tindak Lanjut →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Lapor Cepat Button */}
              <button
                onClick={() => handleNavClick('pengaduan')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-700/20 hover:from-emerald-700 hover:to-teal-800 hover:shadow-lg transition-all"
              >
                <MessageSquareWarning className="w-3.5 h-3.5" />
                <span>Lapor Aduan</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-xl">
            {navLinks.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-3 mt-3 border-t border-slate-100 flex flex-col gap-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-800 block mb-1">
                  Status Mode Akses:
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsAdminMode(false)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold ${
                      !isAdminMode ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    Mode Warga
                  </button>
                  <button
                    onClick={() => setIsAdminMode(true)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold ${
                      isAdminMode ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    Petugas Kecamatan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Emergency Hotline Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-red-600">
                <PhoneCall className="w-6 h-6 animate-bounce" />
                <h3 className="font-bold text-lg text-slate-900">Kontak Darurat Kecamatan Gumelar</h3>
              </div>
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mt-3 mb-4">
              Layanan tanggap darurat 24 jam untuk kondisi medis darurat, bencana tanah longsor, kebakaran, atau gangguan keamanan di wilayah Kecamatan Gumelar.
            </p>

            <div className="space-y-2.5">
              {KECAMATAN_INFO.emergencyContacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:border-red-300 hover:bg-red-50/40 transition-colors"
                >
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">{contact.name}</h5>
                    <p className="text-xs font-mono font-semibold text-red-600 mt-0.5">
                      {contact.number}
                    </p>
                  </div>
                  <a
                    href={`tel:${contact.number.split('/')[0].replace(/[^0-9]/g, '')}`}
                    className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 flex items-center gap-1 shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Hubungi</span>
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
