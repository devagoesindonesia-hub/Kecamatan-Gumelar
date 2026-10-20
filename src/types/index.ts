export type CategoryType = 'kesehatan' | 'pendidikan' | 'pemerintahan' | 'wisata' | 'ibadah' | 'ekonomi';

export interface FacilityLocation {
  id: string;
  name: string;
  category: CategoryType;
  village: string;
  lat: number;
  lng: number;
  address: string;
  phone?: string;
  operatingHours?: string;
  description: string;
  image: string;
  tags: string[];
}

export interface VillageProfile {
  id: string;
  name: string;
  head: string; // Kepala Desa
  secretary: string;
  areaKm2: number;
  population: number;
  rtRw: string;
  commodities: string[];
  description: string;
  tagline: string;
  heroImage: string;
  officeAddress: string;
  contactPhone: string;
  email: string;
  features: string[];
  latitude: number;
  longitude: number;
}

export interface TourismSpot {
  id: string;
  name: string;
  village: string;
  category: 'alam' | 'budaya' | 'kuliner' | 'agrowisata';
  description: string;
  ticketPrice: string;
  hours: string;
  highlights: string[];
  image: string;
  gallery: string[];
  tips: string;
  coordinates: [number, number];
}

export type ComplaintStatus = 'diajukan' | 'diverifikasi' | 'diproses' | 'selesai' | 'ditolak';

export interface ComplaintUpdate {
  id: string;
  timestamp: string;
  status: ComplaintStatus;
  officerName: string;
  note: string;
  proofImageUrl?: string;
}

export interface Complaint {
  id: string; // e.g., GML-2026-001
  title: string;
  category: 'jalan_jembatan' | 'pju_listrik' | 'bencana_alam' | 'layanan_publik' | 'kesehatan_lingkungan' | 'keamanan';
  village: string;
  locationDetails: string;
  description: string;
  reporterName: string;
  reporterPhone: string;
  isAnonymous: boolean;
  status: ComplaintStatus;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  updates: ComplaintUpdate[];
  priority: 'rendah' | 'sedang' | 'tinggi' | 'darurat';
}

export interface ForumComment {
  id: string;
  author: string;
  village: string;
  isOfficial?: boolean;
  content: string;
  timestamp: string;
  likes: number;
}

export interface ForumTopic {
  id: string;
  title: string;
  category: 'pertanian' | 'umkm_ekonomi' | 'keamanan' | 'seni_budaya' | 'infrastruktur' | 'umum';
  village: string;
  author: string;
  isOfficial?: boolean;
  content: string;
  timestamp: string;
  likes: number;
  userLiked?: boolean;
  comments: ForumComment[];
  tags: string[];
}

export interface CommunityEvent {
  id: string;
  title: string;
  category: 'kebudayaan' | 'kesehatan' | 'pemerintahan' | 'olahraga' | 'keagamaan' | 'gotong_royong';
  village: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  organizer: string;
  description: string;
  attendeesCount: number;
  userAttending?: boolean;
  image: string;
}

export interface PublicServiceItem {
  id: string;
  name: string;
  shortDesc: string;
  category: 'kependudukan' | 'perizinan' | 'sosial' | 'rekomendasi' | 'kesehatan';
  processingTime: string;
  cost: string; // Rp 0 (Gratis)
  requirements: string[];
  procedure: string[];
  contactPerson: string;
  onlineSubmissionAvailable: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'complaint_update' | 'new_complaint' | 'forum_reply' | 'event_reminder' | 'emergency';
  read: boolean;
  linkId?: string; // id of complaint or forum post
}
