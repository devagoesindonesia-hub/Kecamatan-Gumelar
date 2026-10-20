import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GUMELAR_VILLAGES } from '../data/gumelarData';
import { ForumTopic } from '../types';
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Share2,
  PlusCircle,
  Tag,
  ShieldCheck,
  Search,
  CheckCircle,
  Send,
  X,
  MessageCircle
} from 'lucide-react';

export const CommunityForum: React.FC = () => {
  const {
    forumTopics,
    addForumTopic,
    addForumComment,
    toggleForumLike,
    isAdminMode
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('semua');
  const [selectedVillageFilter, setSelectedVillageFilter] = useState<string>('semua');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // New Topic Form Modal
  const [showNewTopicModal, setShowNewTopicModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ForumTopic['category']>('pertanian');
  const [newVillage, setNewVillage] = useState(GUMELAR_VILLAGES[0].name);
  const [newAuthor, setNewAuthor] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('Gumelar, Warga');

  // Active reply box per topic
  const [replyTopicId, setReplyTopicId] = useState<string | null>(null);
  const [replyAuthor, setReplyAuthor] = useState('');
  const [replyVillage, setReplyVillage] = useState(GUMELAR_VILLAGES[0].name);
  const [replyContent, setReplyContent] = useState('');

  const filteredTopics = forumTopics.filter((t) => {
    const matchesCategory = activeCategory === 'semua' || t.category === activeCategory;
    const matchesVillage = selectedVillageFilter === 'semua' || t.village === selectedVillageFilter;
    const matchesSearch =
      searchTerm === '' ||
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.author.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesVillage && matchesSearch;
  });

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent || !newAuthor) return;

    addForumTopic({
      title: newTitle,
      category: newCategory,
      village: newVillage,
      author: newAuthor,
      isOfficial: isAdminMode,
      content: newContent,
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean)
    });

    setShowNewTopicModal(false);
    setNewTitle('');
    setNewContent('');
    setNewAuthor('');
  };

  const handleSendComment = (topicId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent || !replyAuthor) return;

    addForumComment(
      topicId,
      replyContent,
      isAdminMode ? `${replyAuthor} (Petugas Kecamatan)` : replyAuthor,
      replyVillage
    );

    setReplyContent('');
    setReplyTopicId(null);
  };

  const getCategoryColor = (cat: ForumTopic['category']) => {
    switch (cat) {
      case 'pertanian':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'umkm_ekonomi':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'seni_budaya':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'keamanan':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5 text-purple-700" />
            <span>Rembug Warga & Komunitas Gumelar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Forum Diskusi & Guyub Rukun Warga
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            Wadah interaksi, urun rembug pertanian nira & kapulaga, info lowongan kerja lokal,
            keamanan ronda malam, serta promosi produk UMKM antar-warga 10 desa di Gumelar.
          </p>
        </div>

        <button
          onClick={() => setShowNewTopicModal(true)}
          className="px-5 py-3 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 self-start md:self-auto transition-transform active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Buat Topik Rembug Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari topik diskusi, ide pertanian, atau nama warga..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedVillageFilter}
              onChange={(e) => setSelectedVillageFilter(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
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

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1">
          {[
            { id: 'semua', label: 'Semua Kategori' },
            { id: 'pertanian', label: 'Pertanian & Perkebunan' },
            { id: 'umkm_ekonomi', label: 'UMKM & Usaha Desa' },
            { id: 'seni_budaya', label: 'Seni & Tradisi Ebeg' },
            { id: 'keamanan', label: 'Keamanan & Ronda' },
            { id: 'umum', label: 'Info Umum & Pengumuman' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                activeCategory === cat.id
                  ? 'bg-purple-800 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Stream */}
      <div className="space-y-6">
        {filteredTopics.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="font-bold text-slate-700 text-base">Belum Ada Topik Diskusi</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Jadilah warga pertama yang memulai urun rembug untuk kategori ini!
            </p>
          </div>
        ) : (
          filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 space-y-4"
            >
              {/* Topic Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                    {topic.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm">{topic.author}</span>
                      {topic.isOfficial && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-300 flex items-center gap-0.5">
                          <ShieldCheck className="w-3 h-3 text-amber-700" />
                          <span>Resmi Pemerintah</span>
                        </span>
                      )}
                      <span className="text-slate-400 text-xs">•</span>
                      <span className="text-xs font-semibold text-purple-700">{topic.village}</span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {new Date(topic.timestamp).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getCategoryColor(
                    topic.category
                  )}`}
                >
                  {topic.category.replace('_', ' ')}
                </span>
              </div>

              {/* Topic Title & Content */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {topic.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed whitespace-pre-line">
                  {topic.content}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {topic.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Topic Interactions Bar */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleForumLike(topic.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      topic.userLiked
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${topic.userLiked ? 'fill-purple-800' : ''}`} />
                    <span>{topic.likes} Suka</span>
                  </button>

                  <button
                    onClick={() =>
                      setReplyTopicId(replyTopicId === topic.id ? null : topic.id)
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{topic.comments.length} Tanggapan</span>
                  </button>
                </div>

                <button
                  onClick={() =>
                    setReplyTopicId(replyTopicId === topic.id ? null : topic.id)
                  }
                  className="text-xs font-semibold text-purple-700 hover:text-purple-900"
                >
                  {replyTopicId === topic.id ? 'Tutup Balasan' : 'Beri Tanggapan →'}
                </button>
              </div>

              {/* Comments Thread */}
              {topic.comments.length > 0 && (
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Tanggapan Warga ({topic.comments.length}):
                  </span>
                  {topic.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-3 rounded-2xl border text-xs space-y-1 ${
                        comment.isOfficial
                          ? 'bg-amber-50/70 border-amber-200'
                          : 'bg-slate-50 border-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900">{comment.author}</span>
                          {comment.isOfficial && (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-200/80 px-1.5 py-0.2 rounded">
                              Petugas Resmi
                            </span>
                          )}
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500 font-medium">{comment.village}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {new Date(comment.timestamp).toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Inline Reply Form */}
              {replyTopicId === topic.id && (
                <form
                  onSubmit={(e) => handleSendComment(topic.id, e)}
                  className="mt-3 p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2.5 animate-in fade-in"
                >
                  <span className="text-xs font-bold text-purple-900 block">
                    Tulis Tanggapan Anda:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={replyAuthor}
                      onChange={(e) => setReplyAuthor(e.target.value)}
                      placeholder="Nama Anda"
                      className="px-3 py-1.5 rounded-xl border border-purple-200 text-xs bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-500"
                    />
                    <select
                      value={replyVillage}
                      onChange={(e) => setReplyVillage(e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-purple-200 text-xs bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-500 font-medium"
                    >
                      {GUMELAR_VILLAGES.map((v) => (
                        <option key={v.id} value={v.name}>
                          {v.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    rows={2}
                    required
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Sampaikan gagasan, solusi, atau tanggapan Anda secara santun..."
                    className="w-full px-3 py-2 rounded-xl border border-purple-200 text-xs bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setReplyTopicId(null)}
                      className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-semibold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold flex items-center gap-1 shadow"
                    >
                      <Send className="w-3 h-3" />
                      <span>Kirim Komentar</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))
        )}
      </div>

      {/* New Topic Modal */}
      {showNewTopicModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 my-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Tulis Topik Rembug Warga Baru
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ajak sedulur se-Kecamatan Gumelar berdiskusi dan berbagi ide
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowNewTopicModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTopic} className="py-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Judul Topik Rembug *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Rencana Pembentukan Paguyuban Petani Organik Gumelar"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Kategori Diskusi *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="pertanian">Pertanian & Perkebunan</option>
                    <option value="umkm_ekonomi">UMKM & Niaga Desa</option>
                    <option value="seni_budaya">Seni Budaya & Ebeg</option>
                    <option value="keamanan">Keamanan & Ronda</option>
                    <option value="umum">Info Umum & Warga</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Asal Desa *
                  </label>
                  <select
                    value={newVillage}
                    onChange={(e) => setNewVillage(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
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
                  Nama Anda / Inisiator *
                </label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="Nama Lengkap atau Tokoh Komunitas"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Isi Pokok Gagasan / Ajakan Diskusi *
                </label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Uraikan gagasan Anda secara jelas dan santun..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Kata Kunci / Tagar (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Misal: Tani, Kapulaga, GumelarMaju"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewTopicModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Terbitkan Topik Rembug</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
