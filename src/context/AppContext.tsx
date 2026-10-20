import React, { createContext, useContext, useState, useEffect } from 'react';
import { Complaint, ComplaintStatus, ForumTopic, CommunityEvent, AppNotification, VillageProfile, FacilityLocation } from '../types';
import { INITIAL_COMPLAINTS, INITIAL_FORUM_TOPICS, INITIAL_EVENTS, GUMELAR_VILLAGES } from '../data/gumelarData';
import { playNotificationSound } from '../utils/sound';

export type ViewType = 'beranda' | 'desa' | 'layanan' | 'peta' | 'wisata' | 'pengaduan' | 'forum' | 'agenda';

interface AppContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;
  complaints: Complaint[];
  addComplaint: (data: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'updates'>) => string;
  updateComplaintStatus: (complaintId: string, status: ComplaintStatus, officerName: string, note: string, proofImageUrl?: string) => void;
  forumTopics: ForumTopic[];
  addForumTopic: (data: Omit<ForumTopic, 'id' | 'timestamp' | 'likes' | 'comments'>) => void;
  addForumComment: (topicId: string, content: string, author: string, village: string) => void;
  toggleForumLike: (topicId: string) => void;
  events: CommunityEvent[];
  toggleEventAttendance: (eventId: string) => void;
  addCommunityEvent: (event: Omit<CommunityEvent, 'id' | 'attendeesCount' | 'userAttending'>) => void;
  notifications: AppNotification[];
  unreadNotifCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  activeToast: { id: string; title: string; message: string; type: 'success' | 'alert' | 'update' } | null;
  dismissToast: () => void;
  selectedVillage: VillageProfile | null;
  setSelectedVillage: (v: VillageProfile | null) => void;
  selectedFacility: FacilityLocation | null;
  setSelectedFacility: (f: FacilityLocation | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  COMPLAINTS: 'gumelar_complaints_v1',
  FORUM: 'gumelar_forum_v1',
  EVENTS: 'gumelar_events_v1',
  NOTIFICATIONS: 'gumelar_notifs_v1'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('beranda');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [selectedVillage, setSelectedVillage] = useState<VillageProfile | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<FacilityLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Initial load from localStorage or defaults
  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLAINTS);
      return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
    } catch {
      return INITIAL_COMPLAINTS;
    }
  });

  const [forumTopics, setForumTopics] = useState<ForumTopic[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FORUM);
      return saved ? JSON.parse(saved) : INITIAL_FORUM_TOPICS;
    } catch {
      return INITIAL_FORUM_TOPICS;
    }
  });

  const [events, setEvents] = useState<CommunityEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (saved) return JSON.parse(saved);
      return [
        {
          id: "notif-welcome",
          title: "Sugeng Rawuh di Portal Gumelar",
          message: "Aplikasi terpadu informasi 10 desa, peta fasilitas, dan kanal aduan masyarakat siap melayani panjenengan.",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          type: "complaint_update",
          read: false
        },
        {
          id: "notif-1",
          title: "Tindak Lanjut Aduan: GML-2026-0042",
          message: "Laporan perbaikan jalan Gumelar-Cihonje telah diverifikasi dan masuk jadwal pengaspalan DPU UPT Banyumas Barat.",
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          type: "complaint_update",
          read: false,
          linkId: "GML-2026-0042"
        }
      ];
    } catch {
      return [];
    }
  });

  const [activeToast, setActiveToast] = useState<{ id: string; title: string; message: string; type: 'success' | 'alert' | 'update' } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(complaints));
    } catch {
      // Storage unavailable
    }
  }, [complaints]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FORUM, JSON.stringify(forumTopics));
    } catch {
      // Storage unavailable
    }
  }, [forumTopics]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch {
      // Storage unavailable
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch {
      // Storage unavailable
    }
  }, [notifications]);

  // Show toast with auto-dismiss
  const triggerToast = (title: string, message: string, type: 'success' | 'alert' | 'update' = 'update') => {
    const id = Date.now().toString();
    setActiveToast({ id, title, message, type });
    playNotificationSound(type);

    setTimeout(() => {
      setActiveToast((current) => (current?.id === id ? null : current));
    }, 6000);
  };

  const dismissToast = () => setActiveToast(null);

  // Add new complaint (citizen)
  const addComplaint = (data: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'updates'>): string => {
    const newId = `GML-2026-${String(complaints.length + 46).padStart(4, '0')}`;
    const now = new Date().toISOString();

    const newComplaint: Complaint = {
      ...data,
      id: newId,
      createdAt: now,
      updatedAt: now,
      updates: [
        {
          id: `up-${Date.now()}`,
          timestamp: now,
          status: 'diajukan',
          officerName: 'Sistem Terpadu LAPOR GUMELAR',
          note: 'Laporan berhasil dicatat dan otomatis dikirimkan ke meja kerja Kasi Trantib & Pelayanan Kecamatan Gumelar.'
        }
      ]
    };

    setComplaints((prev) => [newComplaint, ...prev]);

    // Push notification to official / citizen
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `Aduan Baru Masuk: ${newId}`,
      message: `${data.title} (${data.village}) telah didaftarkan dan menunggu verifikasi petugas.`,
      timestamp: now,
      type: 'new_complaint',
      read: false,
      linkId: newId
    };

    setNotifications((prev) => [newNotif, ...prev]);
    triggerToast(`Aduan Terdaftar #${newId}`, 'Laporan Anda berhasil disimpan dan diteruskan ke petugas kecamatan.', 'success');

    return newId;
  };

  // Update complaint status (admin/petugas kecamatan) -> Triggers real-time notification to user
  const updateComplaintStatus = (
    complaintId: string,
    newStatus: ComplaintStatus,
    officerName: string,
    note: string,
    proofImageUrl?: string
  ) => {
    const now = new Date().toISOString();

    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === complaintId) {
          const updateItem = {
            id: `up-${Date.now()}`,
            timestamp: now,
            status: newStatus,
            officerName,
            note,
            proofImageUrl
          };
          return {
            ...c,
            status: newStatus,
            updatedAt: now,
            updates: [...c.updates, updateItem]
          };
        }
        return c;
      })
    );

    const statusLabels: Record<ComplaintStatus, string> = {
      diajukan: 'Telah Diajukan',
      diverifikasi: 'Diverifikasi Kecamatan',
      diproses: 'Sedang Ditindaklanjuti',
      selesai: 'Selesai Ditangani',
      ditolak: 'Ditolak / Belum Memenuhi Syarat'
    };

    const notifTitle = `Status Diperbarui: ${complaintId}`;
    const notifMsg = `Laporan Anda kini berstatus "${statusLabels[newStatus]}". Catatan: "${note.substring(0, 80)}${note.length > 80 ? '...' : ''}"`;

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: notifTitle,
      message: notifMsg,
      timestamp: now,
      type: 'complaint_update',
      read: false,
      linkId: complaintId
    };

    setNotifications((prev) => [newNotif, ...prev]);
    triggerToast(notifTitle, notifMsg, newStatus === 'selesai' ? 'success' : 'update');
  };

  // Forum actions
  const addForumTopic = (data: Omit<ForumTopic, 'id' | 'timestamp' | 'likes' | 'comments'>) => {
    const now = new Date().toISOString();
    const newTopic: ForumTopic = {
      ...data,
      id: `forum-${Date.now()}`,
      timestamp: now,
      likes: 1,
      userLiked: true,
      comments: []
    };

    setForumTopics((prev) => [newTopic, ...prev]);

    const newNotif: AppNotification = {
      id: `notif-forum-${Date.now()}`,
      title: 'Topik Rembug Warga Baru',
      message: `"${data.title}" dibagikan di forum ${data.village}.`,
      timestamp: now,
      type: 'forum_reply',
      read: false,
      linkId: newTopic.id
    };
    setNotifications((prev) => [newNotif, ...prev]);
    triggerToast('Topik Diskusi Terbit', 'Kiriman Anda telah dibagikan ke seluruh warga Gumelar.', 'success');
  };

  const addForumComment = (topicId: string, content: string, author: string, village: string) => {
    const now = new Date().toISOString();
    const newComment = {
      id: `com-${Date.now()}`,
      author,
      village,
      isOfficial: isAdminMode,
      content,
      timestamp: now,
      likes: 0
    };

    setForumTopics((prev) =>
      prev.map((t) => (t.id === topicId ? { ...t, comments: [...t.comments, newComment] } : t))
    );

    triggerToast('Tanggapan Terkirim', 'Komentar Anda berhasil ditambahkan di diskusi rembug warga.', 'update');
  };

  const toggleForumLike = (topicId: string) => {
    setForumTopics((prev) =>
      prev.map((t) => {
        if (t.id === topicId) {
          const isLiked = t.userLiked;
          return {
            ...t,
            userLiked: !isLiked,
            likes: isLiked ? t.likes - 1 : t.likes + 1
          };
        }
        return t;
      })
    );
  };

  // Events actions
  const toggleEventAttendance = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === eventId) {
          const attending = ev.userAttending;
          return {
            ...ev,
            userAttending: !attending,
            attendeesCount: attending ? ev.attendeesCount - 1 : ev.attendeesCount + 1
          };
        }
        return ev;
      })
    );
  };

  const addCommunityEvent = (eventData: Omit<CommunityEvent, 'id' | 'attendeesCount' | 'userAttending'>) => {
    const newEv: CommunityEvent = {
      ...eventData,
      id: `ev-${Date.now()}`,
      attendeesCount: 1,
      userAttending: true
    };
    setEvents((prev) => [newEv, ...prev]);
    triggerToast('Acara Ditambahkan', `Kegiatan "${eventData.title}" berhasil dijadwalkan pada kalender warga.`, 'success');
  };

  // Notifications
  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        isAdminMode,
        setIsAdminMode,
        complaints,
        addComplaint,
        updateComplaintStatus,
        forumTopics,
        addForumTopic,
        addForumComment,
        toggleForumLike,
        events,
        toggleEventAttendance,
        addCommunityEvent,
        notifications,
        unreadNotifCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        activeToast,
        dismissToast,
        selectedVillage,
        setSelectedVillage,
        selectedFacility,
        setSelectedFacility,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
