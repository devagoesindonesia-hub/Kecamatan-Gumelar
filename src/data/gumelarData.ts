import { VillageProfile, FacilityLocation, TourismSpot, Complaint, ForumTopic, CommunityEvent, PublicServiceItem } from '../types';

export const KECAMATAN_INFO = {
  name: "Kecamatan Gumelar",
  regency: "Kabupaten Banyumas",
  province: "Jawa Tengah",
  tagline: "Gumelar Gumebyar, Raharja lan Makmur",
  slogan: "Melayani dengan Ramah, Sigap, Transparan, dan Guyub Rukun",
  subdistrictHead: "Arif Triyono, S.Sos., M.Si.", // Camat Gumelar
  secretary: "H. Sugiyanto, S.AP.",
  centerCoordinates: [-7.3697, 108.9866] as [number, number],
  area: "93.95 km²",
  population: "56.418 jiwa",
  villagesCount: 10,
  officeAddress: "Jl. Raya Gumelar No. 01, Gumelar, Kec. Gumelar, Kab. Banyumas, Jawa Tengah 53165",
  phone: "(0281) 571029",
  whatsapp: "0812-2834-9912",
  email: "kecamatan.gumelar@banyumaskab.go.id",
  workingHours: "Senin - Kamis: 07.30 - 16.00 WIB | Jumat: 07.30 - 15.00 WIB",
  emergencyContacts: [
    { name: "Puskesmas Gumelar (24 Jam & Ambulans)", number: "(0281) 571018 / 0813-9122-3400" },
    { name: "Polsek Gumelar", number: "(0281) 571110" },
    { name: "Koramil 14 Gumelar", number: "(0281) 571112" },
    { name: "Posko Siaga Bencana Longsor & Cuaca", number: "0852-9011-4477" },
    { name: "Call Center Banyumas 112", number: "112 (Bebas Pulsa)" }
  ]
};

export const GUMELAR_VILLAGES: VillageProfile[] = [
  {
    id: "gumelar",
    name: "Desa Gumelar",
    head: "Sudarmo",
    secretary: "Agus Prasetyo",
    areaKm2: 8.74,
    population: 6850,
    rtRw: "28 RT / 6 RW",
    commodities: ["Gula Kelapa / Semut", "Padi Sawah", "Perdagangan & Jasa", "Industri Makanan Olahan"],
    description: "Ibu kota Kecamatan Gumelar yang menjadi simpul perekonomian, pasar rakyat terpadu, dan pusat layanan terpadu pemerintahan serta kesehatan tingkat pertama.",
    tagline: "Pusat Pemerintahan & Dinamika Niaga Warga",
    heroImage: "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&w=800&q=80",
    officeAddress: "Jl. Raya Gumelar No. 12, Desa Gumelar",
    contactPhone: "0813-2711-4560",
    email: "pemdes.gumelar@banyumaskab.go.id",
    features: ["Pasar Tradisional Gumelar", "Puskesmas Induk Gumelar", "Pusat Kantor PATEN Kecamatan", "Lapangan Sepakbola Gumelar"],
    latitude: -7.3697,
    longitude: 108.9866
  },
  {
    id: "cihonje",
    name: "Desa Cihonje",
    head: "Kusen, S.Pd.",
    secretary: "Budi Santoso",
    areaKm2: 10.35,
    population: 7420,
    rtRw: "32 RT / 7 RW",
    commodities: ["Kapulaga", "Kayu Albasia", "Anyaman Bambu", "Gula Merah Aren"],
    description: "Desa bersejarah dengan hamparan perbukitan hijau yang subur, terkenal sebagai sentra penghasil kapulaga kualitas ekspor dan perkebunan kelapa nira.",
    tagline: "Sentra Rempah Kapulaga & Kerajinan Bambu Lestari",
    heroImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    officeAddress: "Jl. Cihonje Raya No. 4, Cihonje",
    contactPhone: "0812-2980-3321",
    email: "desacihonje.bms@gmail.com",
    features: ["Koperasi Rempah Kapulaga", "Paguyuban Pengrajin Besek & Bambu", "Mata Air Alami Cihonje", "Sentra Seni Ebeg Turonggo Mulyo"],
    latitude: -7.3820,
    longitude: 108.9740
  },
  {
    id: "cilangkap",
    name: "Desa Cilangkap",
    head: "Karsiman Hadi",
    secretary: "Rukmini",
    areaKm2: 9.80,
    population: 5210,
    rtRw: "24 RT / 5 RW",
    commodities: ["Gula Nira Murni", "Cengkih", "Kambing Jawa Randu", "Padi Organik"],
    description: "Kawasan agraris perbukitan dengan terasering sawah menawan dan deretan pohon kelapa nira tempat penderes tradisional memproduksi gula kelapa asli Banyumas.",
    tagline: "Harmoni Terasering Hijau & Tradisi Penderes Nira",
    heroImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    officeAddress: "Jl. Diponegoro Cilangkap RT 02/02",
    contactPhone: "0852-2766-8199",
    email: "desacilangkap.gumelar@gmail.com",
    features: ["Spot Sunrise Lembah Cilangkap", "Kelompok Ternak Kambing Sejahtera", "Jalur Trekking Hutan Rakyat", "Penderes Nira Lestari"],
    latitude: -7.3550,
    longitude: 108.9710
  },
  {
    id: "gancang",
    name: "Desa Gancang",
    head: "H. Bambang Wahyudi",
    secretary: "Imam Rosyadi",
    areaKm2: 8.60,
    population: 4980,
    rtRw: "22 RT / 5 RW",
    commodities: ["Gula Semut Organik Bersertifikat", "Peternakan Sapi Perah/Potong", "Singkong & Olahan Keripik"],
    description: "Pelopor produksi gula kelapa kristal (gula semut) organik di Banyumas Barat yang telah menembus pasar ritel nasional dan memiliki kelompok tani berdaya.",
    tagline: "Desa Inovasi Gula Semut & Mandiri Pangan",
    heroImage: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80",
    officeAddress: "Jl. Balai Desa Gancang No. 09",
    contactPhone: "0821-3455-7801",
    email: "gancang.berkah@gmail.com",
    features: ["Pabrik Pengolahan Gula Semut Higienis", "Bank Sampah Mandiri Gancang", "Sanggar Tari & Karawitan", "Wisata Edukasi Penderes"],
    latitude: -7.3480,
    longitude: 108.9950
  },
  {
    id: "karangkemiri",
    name: "Desa Karangkemiri",
    head: "Sutrisno, S.E.",
    secretary: "Dwi Wahyuni",
    areaKm2: 11.20,
    population: 5830,
    rtRw: "26 RT / 6 RW",
    commodities: ["Kopi Robusta Banyumas", "Buah Durian Lokal", "Perikanan Air Tawar", "Kayu Sengon"],
    description: "Terletak di dataran tinggi yang sejuk dengan kebun kopi robusta bercita rasa khas rempah dan tanah berbukit yang kaya mata air jernih pegunungan.",
    tagline: "Aroma Kopi Lereng Gumelar & Alam Menenangkan",
    heroImage: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80",
    officeAddress: "Jl. Raya Karangkemiri No. 15",
    contactPhone: "0813-9022-7714",
    email: "karangkemiri.gumelar@yahoo.com",
    features: ["Kebun Kopi Rakyat Karangkemiri", "Spot Camping Bukit Kemiri", "Mata Air Sumber Urip", "Pusat Bibit Tanaman Keras"],
    latitude: -7.3890,
    longitude: 109.0020
  },
  {
    id: "kedungurang",
    name: "Desa Kedungurang",
    head: "Suripno",
    secretary: "Triyono",
    areaKm2: 8.90,
    population: 5320,
    rtRw: "24 RT / 5 RW",
    commodities: ["Kerajinan Sapu Glagah Rayung", "Padi Organik", "Kelapa Sayur", "Bambu Apus"],
    description: "Dikenal dengan keahlian warganya memproduksi sapu rayung/glagah berkualitas ekspor dan kesenian tradisional Ebeg Banyumasan yang sangat aktif dilestarikan.",
    tagline: "Kampung Sapu Glagah & Pelestari Seni Tradisi",
    heroImage: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
    officeAddress: "Jl. Balai Desa Kedungurang No. 5",
    contactPhone: "0857-4188-6623",
    email: "kedungurang.desa@gmail.com",
    features: ["Sentra Pengrajin Sapu Rayung", "Curug Sawangan Kedungurang", "Kelompok Karang Taruna Berdaya", "Paguyuban Ebeg Rukun Santoso"],
    latitude: -7.3780,
    longitude: 109.0150
  },
  {
    id: "paningkaban",
    name: "Desa Paningkaban",
    head: "Waryo Suwito",
    secretary: "Siti Maryam",
    areaKm2: 12.15,
    population: 6240,
    rtRw: "30 RT / 7 RW",
    commodities: ["Kopi Pegunungan", "Cengkeh", "Durian & Alpukat", "Wisata Alam"],
    description: "Desa dengan elevasi tertinggi di Gumelar yang menyimpan destinasi panorama spektakuler Puncak Wadas, perkebunan cengkih yang harum, dan udara pegunungan segar.",
    tagline: "Pesona Puncak Wadas & Gerbang Wisata Alam",
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    officeAddress: "Jl. Raya Paningkaban KM 3",
    contactPhone: "0812-2544-1189",
    email: "paningkaban.gumelar@banyumaskab.go.id",
    features: ["Wisata Alam Puncak Wadas", "Agrowisata Durian & Kopi", "Jalur Sepeda Downhill Alami", "Kelompok Sadar Wisata (Pokdarwis)"],
    latitude: -7.3390,
    longitude: 108.9650
  },
  {
    id: "samudra",
    name: "Desa Samudra",
    head: "Kristianto, S.Pd.",
    secretary: "Ahmad Dahlan",
    areaKm2: 8.45,
    population: 4890,
    rtRw: "20 RT / 4 RW",
    commodities: ["Sayuran Dataran Tinggi", "Pisang Mas & Ambon", "Madu Hutan Klanceng", "Perkebunan Nira"],
    description: "Lembah sejuk berhawa damai dengan aliran sungai bebatuan yang jernih, budidaya madu klanceng asli lereng gunung, serta persawahan berjenjang.",
    tagline: "Kesejukan Lembah Alami & Madu Hutan Lestari",
    heroImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    officeAddress: "Jl. Raya Samudra No. 18",
    contactPhone: "0813-2899-0412",
    email: "samudra.desa.bms@gmail.com",
    features: ["Puskesmas Pembantu Samudra", "Budidaya Madu Klanceng Trigona", "Batu Tumpang & Sungai Cikawung", "Pasar Sayur Pagi"],
    latitude: -7.3320,
    longitude: 108.9880
  },
  {
    id: "samudra-kulon",
    name: "Desa Samudra Kulon",
    head: "Yuliyanto",
    secretary: "Nanang Supriyadi",
    areaKm2: 7.90,
    population: 4120,
    rtRw: "18 RT / 4 RW",
    commodities: ["Karet Rakyat", "Jagung Pipil", "Ubi Kayu Unggul", "Peternakan Ayam Kampung"],
    description: "Kawasan perbatasan asri dengan perkebunan karet rakyat, sentra budidaya ternak unggas lokal, dan komitmen tinggi terhadap gotong royong warga.",
    tagline: "Desa Hijau Mandiri, Rukun & Bersahaja",
    heroImage: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80",
    officeAddress: "Jl. Merdeka Samudra Kulon RT 01/01",
    contactPhone: "0822-4211-9033",
    email: "samudrakulon.gumelar@gmail.com",
    features: ["Hutan Karet Rakyat Indah", "Kelompok Tani Ternak Rejeki", "Pos Ronda Terpadu Warga", "Sanggar Belajar Anak Desa"],
    latitude: -7.3270,
    longitude: 108.9720
  },
  {
    id: "tlaga",
    name: "Desa Tlaga",
    head: "Budi Purnomo",
    secretary: "Endang Sulastri",
    areaKm2: 7.86,
    population: 3568,
    rtRw: "16 RT / 3 RW",
    commodities: ["Perikanan Air Tawar (Nila & Gurame)", "Kelapa Genjah", "Palawija", "Anyaman Tikar"],
    description: "Memiliki keunikan cekungan telaga alami yang kaya sumber mata air jernih, menjadi pusat budidaya ikan tawar dan kawasan konservasi air tanah alami.",
    tagline: "Kearifan Sumber Telaga & Kemakmuran Warga",
    heroImage: "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=800&q=80",
    officeAddress: "Jl. Danau Tlaga Indah No. 03",
    contactPhone: "0853-2900-1124",
    email: "tlagagumelar@gmail.com",
    features: ["Telaga Alami Mata Air Tlaga", "Kelompok Budidaya Ikan Mina Tlaga", "Gazebo Tepi Telaga", "Perkebunan Buah Naga Lokal"],
    latitude: -7.3590,
    longitude: 109.0220
  }
];

export const GUMELAR_FACILITIES: FacilityLocation[] = [
  // Kesehatan
  {
    id: "faskes-1",
    name: "Puskesmas Gumelar (Pusat / UGD 24 Jam)",
    category: "kesehatan",
    village: "Desa Gumelar",
    lat: -7.3702,
    lng: 108.9868,
    address: "Jl. Raya Gumelar No. 04, Gumelar",
    phone: "(0281) 571018",
    operatingHours: "UGD & Persalinan: 24 Jam | Rawat Jalan: 07.30 - 14.00",
    description: "Fasilitas kesehatan tingkat pertama utama di Kecamatan Gumelar dengan layanan dokter umum, dokter gigi, UGD 24 jam, rawat inap, persalinan, dan armada ambulans siaga.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
    tags: ["UGD 24 Jam", "Rawat Inap", "BPJS", "Ambulans Siaga", "Poli Gigi", "Laboratorium"]
  },
  {
    id: "faskes-2",
    name: "Puskesmas Pembantu (Pustu) Samudra",
    category: "kesehatan",
    village: "Desa Samudra",
    lat: -7.3325,
    lng: 108.9878,
    address: "Jl. Raya Samudra RT 03/02, Desa Samudra",
    phone: "0813-9112-8821",
    operatingHours: "Senin - Sabtu: 08.00 - 13.00 WIB",
    description: "Pelayanan kesehatan rujukan cepat bagi warga Samudra, Samudra Kulon, dan Paningkaban dengan perawat dan bidan desa siaga.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
    tags: ["Bidan Desa", "Pemeriksaan Balita", "BPJS", "Pengobatan Umum"]
  },
  {
    id: "faskes-3",
    name: "Poskesdes Cihonje & Rumah Bersalin Sehat",
    category: "kesehatan",
    village: "Desa Cihonje",
    lat: -7.3815,
    lng: 108.9745,
    address: "Kompleks Balai Desa Cihonje",
    phone: "0852-2710-4491",
    operatingHours: "Senin - Jumat: 08.00 - 14.00 (Bidan Siaga 24 Jam)",
    description: "Pos Kesehatan Desa melayani imunisasi anak, konsultasi gizi pencegahan stunting, tensi gratis lansia, dan persalinan normal.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    tags: ["Posyandu", "Bidan Siaga", "Konsultasi Ibu & Anak"]
  },
  {
    id: "faskes-4",
    name: "Apotek Gumelar Sehat & Praktik Dokter Bersama",
    category: "kesehatan",
    village: "Desa Gumelar",
    lat: -7.3691,
    lng: 108.9859,
    address: "Jl. Pasar Gumelar No. 19, Gumelar",
    phone: "0812-3344-7711",
    operatingHours: "Setiap Hari: 07.00 - 21.00 WIB",
    description: "Apotek lengkap obat generik, resep dokter, suplemen, serta alat kesehatan untuk kebutuhan warga kecamatan.",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80",
    tags: ["Apotek", "Tebus Resep", "Cek Gula & Asam Urat", "Obat Lengkap"]
  },

  // Pendidikan
  {
    id: "edu-1",
    name: "SMP Negeri 1 Gumelar",
    category: "pendidikan",
    village: "Desa Gumelar",
    lat: -7.3712,
    lng: 108.9882,
    address: "Jl. Raya Gumelar, Gumelar",
    phone: "(0281) 571055",
    operatingHours: "Senin - Jumat: 07.00 - 15.30 WIB",
    description: "Sekolah menengah pertama favorit dengan fasilitas laboratorium komputer, lapangan olahraga terpadu, dan prestasi akademik serta ekstrakurikuler Pramuka tingkat Banyumas.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
    tags: ["Akreditasi A", "Lab IPA & Komputer", "Adiwiyata", "Pramuka"]
  },
  {
    id: "edu-2",
    name: "SMP Negeri 2 Gumelar (Samudra)",
    category: "pendidikan",
    village: "Desa Samudra",
    lat: -7.3338,
    lng: 108.9862,
    address: "Jl. Lapangan Olahraga Samudra, Gumelar",
    phone: "0813-2700-6644",
    operatingHours: "Senin - Jumat: 07.00 - 15.00 WIB",
    description: "Sekolah ramah anak berlatar belakang perbukitan hijau, berfokus pada pendidikan karakter, sains alam, dan seni karawitan lokal.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
    tags: ["Akreditasi A", "Lingkungan Asri", "Karawitan", "Digital Learning"]
  },
  {
    id: "edu-3",
    name: "SMK Wijaya Kusuma Gumelar",
    category: "pendidikan",
    village: "Desa Gumelar",
    lat: -7.3680,
    lng: 108.9840,
    address: "Jl. Cihonje-Gumelar KM 1, Gumelar",
    phone: "0812-2849-0012",
    operatingHours: "Senin - Jumat: 07.00 - 16.00 WIB",
    description: "Sekolah kejuruan dengan program unggulan Teknik Otomotif Sepeda Motor, Teknik Komputer Jaringan (TKJ), dan Akuntansi Keuangan.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80",
    tags: ["SMK Pusat Keunggulan", "Bursa Kerja Khusus", "Otomotif & IT"]
  },
  {
    id: "edu-4",
    name: "SD Negeri 1 Gumelar (Inti)",
    category: "pendidikan",
    village: "Desa Gumelar",
    lat: -7.3690,
    lng: 108.9875,
    address: "Jl. Kauman No. 02, Gumelar",
    phone: "0852-9118-2233",
    operatingHours: "Senin - Sabtu: 07.00 - 12.30 WIB",
    description: "Sekolah dasar tertua dengan tradisi literasi kuat, dokter kecil, dan pembinaan olimpiade sains matematika.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    tags: ["Sekolah Ramah Anak", "Dokter Kecil", "Pramuka Siaga"]
  },

  // Pemerintahan
  {
    id: "gov-1",
    name: "Kantor Kecamatan Gumelar (PATEN Terpadu)",
    category: "pemerintahan",
    village: "Desa Gumelar",
    lat: -7.3697,
    lng: 108.9866,
    address: "Jl. Raya Gumelar No. 01, Gumelar",
    phone: "(0281) 571029",
    operatingHours: "Senin - Kamis: 07.30 - 16.00 | Jumat: 07.30 - 15.00",
    description: "Pusat pelayanan administrasi terpadu kecamatan: pengurusan KTP-el, Kartu Keluarga, Surat Pindah, Rekomendasi Nikah, SKU, dan Balai Pertemuan Warga.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    tags: ["PATEN", "KTP / KK", "Layanan Gratis Rp 0", "Ruang Laktasi", "Akses Disabilitas"]
  },
  {
    id: "gov-2",
    name: "Polsek Gumelar (Polres Banyumas)",
    category: "pemerintahan",
    village: "Desa Gumelar",
    lat: -7.3692,
    lng: 108.9871,
    address: "Jl. Raya Gumelar No. 08, Gumelar",
    phone: "(0281) 571110",
    operatingHours: "Pelayanan SPKT & Siaga: 24 Jam",
    description: "Pos Sentra Pelayanan Kepolisian Terpadu (SPKT) melayani laporan kehilangan surat, SKCK pengantar, pengaduan kamtibmas, dan pengawalan.",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80",
    tags: ["SPKT 24 Jam", "SKCK", "Kamtibmas", "Patroli Siaga"]
  },
  {
    id: "gov-3",
    name: "Koramil 14 Gumelar (Kodim 0701/Banyumas)",
    category: "pemerintahan",
    village: "Desa Gumelar",
    lat: -7.3705,
    lng: 108.9855,
    address: "Jl. Raya Gumelar No. 06, Gumelar",
    phone: "(0281) 571112",
    operatingHours: "Siaga 24 Jam",
    description: "Komando Rayon Militer 14 pembina ketahanan wilayah, Babinsa desa, serta tim terdepan tanggap darurat bencana alam longsor di Gumelar.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
    tags: ["Babinsa", "Siaga Bencana", "Bakti TNI"]
  },

  // Wisata
  {
    id: "wisata-1",
    name: "Wisata Alam Puncak Wadas Paningkaban",
    category: "wisata",
    village: "Desa Paningkaban",
    lat: -7.3385,
    lng: 108.9642,
    address: "Dusun Kaliduren, Desa Paningkaban",
    phone: "0812-9988-1022",
    operatingHours: "Setiap Hari: 05.00 - 18.00 WIB (Camping 24 Jam)",
    description: "Puncak batu andesit dengan panorama 360 derajat pegunungan Banyumas Barat, negeri di atas awan saat fajar, spot foto sunrise, dan camping ground.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    tags: ["Sunrise View", "Camping Ground", "Spot Foto", "Warung Kopi Lereng"]
  },
  {
    id: "wisata-2",
    name: "Curug Ciranggon (Air Terjun Pengantin)",
    category: "wisata",
    village: "Desa Cilangkap",
    lat: -7.3565,
    lng: 108.9698,
    address: "Hutan Pinus Cilangkap, Gumelar",
    phone: "0852-3321-7788",
    operatingHours: "Setiap Hari: 07.30 - 17.00 WIB",
    description: "Air terjun alami berundak dengan kolam alami berair bening kehijauan dikelilingi tebing lumut dan hutan pinus yang meneduhkan jiwa.",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80",
    tags: ["Air Terjun", "Mata Air Jernih", "Spot Foto Instagramable", "Alam Asri"]
  },
  {
    id: "wisata-3",
    name: "Telaga Alami & Rest Area Mata Air Tlaga",
    category: "wisata",
    village: "Desa Tlaga",
    lat: -7.3588,
    lng: 109.0225,
    address: "Kompleks Telaga Indah, Desa Tlaga",
    phone: "0821-4400-9981",
    operatingHours: "Setiap Hari: 08.00 - 17.30 WIB",
    description: "Danau mata air alami yang tenang dilengkapi gazebo bambu tepi telaga, spot memancing ikan air tawar, dan kuliner ikan bakar khas Banyumas.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    tags: ["Telaga Alami", "Kolam Ikan", "Kuliner Gurame Bakar", "Ramah Anak"]
  }
];

export const GUMELAR_TOURISM: TourismSpot[] = [
  {
    id: "puncak-wadas",
    name: "Wisata Alam Puncak Wadas",
    village: "Desa Paningkaban",
    category: "alam",
    description: "Destinasi wisata puncak bukit batu eksotis dengan ketinggian lebih dari 750 mdpl. Menyajikan pemandangan spektakuler lembah Gumelar, lautan kabut pagi hari bak negeri di atas awan, serta langit senja yang memikat pecinta fotografi.",
    ticketPrice: "Rp 5.000 / orang (Parkir Motor Rp 2.000)",
    hours: "Buka 24 Jam (Khusus Camping harap konfirmasi Pokdarwis)",
    highlights: ["Sunrise Viewpoint 360°", "Area Camping & Hammock", "Kedai Kopi Robusta Paningkaban", "Fasilitas Mushola & Toilet Bersih"],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=600&q=80"
    ],
    tips: "Disarankan tiba sebelum pukul 05.15 WIB untuk menikmati matahari terbit terbaik. Bawalah jaket tebal karena udara dini hari cukup menusuk tulang.",
    coordinates: [-7.3385, 108.9642]
  },
  {
    id: "curug-ciranggon",
    name: "Curug Ciranggon Cilangkap",
    village: "Desa Cilangkap",
    category: "alam",
    description: "Air terjun alami dengan dua aliran kembar yang jatuh ke kolam batu berair segar jernih. Jalur menuju lokasi dihiasi rindangnya hutan pinus dan gemericik air yang menenangkan jiwa.",
    ticketPrice: "Rp 5.000 / orang",
    hours: "07.30 - 17.00 WIB",
    highlights: ["Kolam Alami untuk Berenang Santai", "Trekking Menembus Hutan Pinus", "Gazebo Istirahat", "Spot Foto Alami"],
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=600&q=80"
    ],
    tips: "Gunakan alas kaki anti selip untuk trekking. Jangan lupa bawa baju ganti dan selalu jaga kebersihan alam sekitar.",
    coordinates: [-7.3565, 108.9698]
  },
  {
    id: "edukasi-gula-semut",
    name: "Kampung Edukasi Gula Nira & Gula Semut Gancang",
    village: "Desa Gancang",
    category: "agrowisata",
    description: "Pengalaman menyaksikan langsung kepiawaian para penderes pohon kelapa menaiki pohon nira setinggi 20 meter, memasak nira di tungku kayu bakar tradisional, hingga mengkristalkannya menjadi gula semut berstandar ekspor.",
    ticketPrice: "Gratis / Donasi Edukasi Sukarela",
    hours: "08.00 - 16.00 WIB",
    highlights: ["Melihat Atraksi Penderes Nira", "Mencicipi Wedang Nira Manis Hangat", "Belajar Membuat Gula Semut", "Beli Oleh-Oleh Asli dari Petani"],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80"
    ],
    tips: "Waktu terbaik mencicipi nira segar adalah pagi hari sekitar pukul 08.00 saat penderes baru turun dari pohon kelapa.",
    coordinates: [-7.3480, 108.9950]
  },
  {
    id: "seni-ebeg-gumelar",
    name: "Panggung Budaya Ebeg Banyumasan Kedungurang",
    village: "Desa Kedungurang",
    category: "budaya",
    description: "Kesenian tarian kuda lumping khas Banyumasan dengan iringan gamelan calung bambu, tetabuhan kendang banyumasan, dan atraksi kesatria gagah berani yang sarat filosofi persaudaraan dan keluhuran budi pekerti.",
    ticketPrice: "Gratis (Acara Terjadwal / Tanggapan)",
    hours: "Sesuai Agenda Kegiatan Seni Desa",
    highlights: ["Atraksi Tarian Ebeg Banyumasan Asli", "Harmoni Gamelan Calung Bambu", "Interaksi dengan Sanggar Seni", "Kerajinan Kuda Kepang Bambu"],
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80"
    ],
    tips: "Cek jadwal kalender acara desa di portal ini untuk mengetahui waktu pentas rutin bulanan.",
    coordinates: [-7.3780, 109.0150]
  },
  {
    id: "sentra-kerajinan-glagah",
    name: "Sentra Kerajinan Sapu Glagah Rayung",
    village: "Desa Kedungurang",
    category: "agrowisata",
    description: "Desa perajin sapu berbahan dasar tanaman rayung glagah liar yang dirangkai teliti dengan benang warna-warni dan gagang bambu halus. Produk ini telah diekspor ke berbagai negara di Asia dan Timur Tengah.",
    ticketPrice: "Gratis",
    hours: "08.00 - 17.00 WIB",
    highlights: ["Workshop Merangkai Sapu Tradisional", "Beli Kerajinan Tangan Harga Produsen", "Melihat Kebun Rayung Glagah"],
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80"
    ],
    tips: "Sangat cocok sebagai buah tangan khas keluarga yang awet dan bernilai seni tinggi.",
    coordinates: [-7.3785, 109.0142]
  }
];

export const GUMELAR_SERVICES: PublicServiceItem[] = [
  {
    id: "srv-ktp",
    name: "Perekaman & Cetak KTP Elektronik (KTP-el)",
    category: "kependudukan",
    shortDesc: "Perekaman biometrik baru usia 17 tahun, penggantian KTP rusak, atau hilang bagi warga berdomisili di 10 desa se-Kecamatan Gumelar.",
    processingTime: "1 Hari Kerja (Bisa ditunggu)",
    cost: "Rp 0 (Gratis Tanpa Pungli)",
    requirements: [
      "Fotokopi Kartu Keluarga (KK) terbaru yang sudah bertandatangan elektronik (barcode)",
      "KTP lama yang rusak (bila permohonan ganti rusak)",
      "Surat Keterangan Kehilangan dari Polsek Gumelar (bila KTP hilang)",
      "Pasfoto tidak diperlukan (perekaman wajah langsung di loket PATEN)"
    ],
    procedure: [
      "Warga datang ke loket PATEN Kecamatan Gumelar mengambil nomor antrean",
      "Petugas memverifikasi data NIK di database kependudukan SIAK",
      "Perekaman biometrik (sidik jari, retina mata, foto wajah, tanda tangan digital)",
      "Pencetakan blangko KTP-el dan penyerahan kepada pemohon"
    ],
    contactPerson: "Pak Slamet (Petugas Adminduk PATEN) - 0812-2933-7711",
    onlineSubmissionAvailable: true
  },
  {
    id: "srv-kk",
    name: "Penerbitan & Perubahan Kartu Keluarga (KK)",
    category: "kependudukan",
    shortDesc: "Pembaruan data KK karena penambahan anggota keluarga (kelahiran), pengurangan (kematian), pemecahan KK baru, atau mutasi data.",
    processingTime: "1 - 2 Hari Kerja",
    cost: "Rp 0 (Gratis)",
    requirements: [
      "Kartu Keluarga (KK) asli yang lama",
      "Surat Pengantar dari RT/RW dan Balai Desa setempat",
      "Surat Keterangan Lahir (dari bidan/Puskesmas) untuk bayi baru lahir",
      "Buku Nikah / Akta Perkawinan orang tua (fotokopi dan tunjukkan asli)",
      "Surat Kematian dari Desa (bila pengurangan karena meninggal)"
    ],
    procedure: [
      "Mengurus surat pengantar di Balai Desa masing-masing",
      "Membawa berkas ke Loket 2 PATEN Kecamatan Gumelar",
      "Petugas menginput dan menerbitkan draf KK untuk dicek kebenarannya",
      "KK cetak dengan barcode TTE resmi diserahkan ke warga"
    ],
    contactPerson: "Ibu Nurul (Loket Kependudukan) - 0852-2788-9900",
    onlineSubmissionAvailable: true
  },
  {
    id: "srv-sku",
    name: "Surat Keterangan Usaha (SKU) & Legalisasi IUMK",
    category: "perizinan",
    shortDesc: "Surat rekomendasi keterangan kepemilikan usaha mikro/kecil untuk syarat pengajuan kredit usaha rakyat (KUR), sertifikasi halal, atau bantuan modal.",
    processingTime: "15 Menit Jadi",
    cost: "Rp 0 (Gratis)",
    requirements: [
      "KTP-el dan Kartu Keluarga asli/fotokopi pemilik usaha",
      "Surat Pengantar Keterangan Usaha dari Kepala Desa setempat",
      "Foto tempat/kegiatan usaha (bisa dari kamera HP)",
      "Mengisi formulir jenis usaha & modal taksiran"
    ],
    procedure: [
      "Menyerahkan surat pengantar dari desa ke Loket PATEN",
      "Pemeriksaan bidang usaha oleh Kasi Ekonomi & Pembangunan",
      "Pencetakan surat keterangan dan penandatanganan oleh Camat / Sekcam",
      "Penyerahan dokumen resmi berstempel kecamatan"
    ],
    contactPerson: "Pak Hendro (Kasi Ekbang) - 0813-9221-5044",
    onlineSubmissionAvailable: true
  },
  {
    id: "srv-nikah",
    name: "Rekomendasi Dispensasi & Pengantar Nikah (N1-N4)",
    category: "rekomendasi",
    shortDesc: "Pemberian rekomendasi pengantar pernikahan lintas kecamatan/kabupaten dan validasi berkas sebelum ke KUA Gumelar.",
    processingTime: "30 Menit",
    cost: "Rp 0 (Gratis)",
    requirements: [
      "Formulir N1 s.d N4 yang sudah ditandatangani Kepala Desa",
      "Fotokopi KTP-el calon pengantin dan kedua orang tua",
      "Fotokopi Akta Kelahiran dan Ijazah Terakhir calon pengantin",
      "Surat Keterangan Belum Menikah dari Desa setempat"
    ],
    procedure: [
      "Verifikasi berkas persyaratan calon pengantin",
      "Pencatatan buku registrasi pernikahan kecamatan",
      "Penerbitan surat rekomendasi resmi ditujukan ke KUA setempat"
    ],
    contactPerson: "Pak H. Sugiyanto (Sekcam Gumelar) - 0812-2834-9912",
    onlineSubmissionAvailable: true
  },
  {
    id: "srv-bansos",
    name: "Layanan Verifikasi Data Terpadu Kesejahteraan Sosial (DTKS/Bansos)",
    category: "sosial",
    shortDesc: "Pengecekan status kepesertaan PKH, BPNT (Sembako), PBI JK (BPJS Gratis), dan usulan warga rentan masuk DTKS Kemensos.",
    processingTime: "Langsung saat konsultasi",
    cost: "Rp 0 (Gratis)",
    requirements: [
      "KTP-el dan Kartu Keluarga asli pemohon",
      "Foto kondisi rumah (tampak depan, ruang tamu, dapur)",
      "Surat keterangan tidak mampu (SKTM) dari desa setempat bila ada usulan baru"
    ],
    procedure: [
      "Warga berkonsultasi di Meja Pelayanan Sosial PATEN",
      "Pendamping sosial PKH / TKSK mengecek NIK pada aplikasi SIKS-NG",
      "Penjelasan status kepesertaan dan pendataan bila masuk kriteria usulan musdes"
    ],
    contactPerson: "Ibu Rita (Pendamping Sosial Kecamatan) - 0857-4200-1178",
    onlineSubmissionAvailable: false
  },
  {
    id: "srv-ambulans",
    name: "Layanan Ambulans Siaga 24 Jam Puskesmas Gumelar",
    category: "kesehatan",
    shortDesc: "Armada ambulans siaga darurat untuk rujukan pasien gawat darurat ke RSUD Ajibarang / RSUD Margono Soekarjo Purwokerto.",
    processingTime: "Respon Cepat Tanggap (< 10 Menit)",
    cost: "Gratis untuk Pasien Gawat Darurat BPJS PBI",
    requirements: [
      "Surat rujukan medis dari dokter Puskesmas / Bidan Desa yang bertugas",
      "Kartu BPJS / KTP pasien yang bersangkutan",
      "Menghubungi nomor call center gawat darurat Puskesmas Gumelar"
    ],
    procedure: [
      "Keluarga/perawat menghubungi call center (0281) 571018 atau 0813-9122-3400",
      "Tim medis mempersiapkan peralatan oksigen dan perawat pendamping",
      "Ambulans diberangkatkan ke lokasi atau mengantar pasien ke RS rujukan"
    ],
    contactPerson: "Koordinator Tim Siaga Puskesmas - 0813-9122-3400",
    onlineSubmissionAvailable: false
  }
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: "GML-2026-0042",
    title: "Jalan Berlubang Cukup Dalam di Jalur Penghubung Gumelar - Cihonje",
    category: "jalan_jembatan",
    village: "Desa Cihonje",
    locationDetails: "Dekat tikungan tanjakan grumbul Kaliduren, sekitar 300 meter setelah jembatan kecil batas desa.",
    description: "Terdapat lubang jalan selebar 1 meter dengan kedalaman sekitar 15 cm yang tergenang air saat hujan. Sangat membahayakan pengendara motor khususnya malam hari karena penerangan minim.",
    reporterName: "Tri Wahyono",
    reporterPhone: "0813-9221-xxxx",
    isAnonymous: false,
    status: "diproses",
    priority: "tinggi",
    createdAt: "2026-10-18T08:30:00Z",
    updatedAt: "2026-10-19T14:15:00Z",
    imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80",
    updates: [
      {
        id: "up-1",
        timestamp: "2026-10-18T09:10:00Z",
        status: "diverifikasi",
        officerName: "Budi Santoso (Admin PATEN Kecamatan)",
        note: "Laporan telah diverifikasi oleh tim kecamatan. Lokasi masuk kategori jalan kabupaten ruas Gumelar - Cihonje."
      },
      {
        id: "up-2",
        timestamp: "2026-10-19T14:15:00Z",
        status: "diproses",
        officerName: "Ir. Joko Susilo (Tim Teknis DPU UPT Banyumas Barat)",
        note: "Tim sapu lubang DPU didampingi Kasi Trantib Kecamatan Gumelar telah melakukan peninjauan lapangan dan memasang rambu peringatan sementara. Material aspal hotmix dijadwalkan tiba besok pagi.",
        proofImageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "GML-2026-0039",
    title: "Lampu Penerangan Jalan Umum (PJU) Mati di Pertigaan Samudra",
    category: "pju_listrik",
    village: "Desa Samudra",
    locationDetails: "Tiang PJU persis di pertigaan arah Samudra Kulon dekat gardu ronda RW 02.",
    description: "Lampu penerangan jalan sudah padam selama 4 malam berturut-turut. Kondisi jalan di perbukitan sangat gelap dan berkabut tebal pada malam hari.",
    reporterName: "Warga Samudra",
    reporterPhone: "0852-9011-xxxx",
    isAnonymous: true,
    status: "selesai",
    priority: "sedang",
    createdAt: "2026-10-15T19:20:00Z",
    updatedAt: "2026-10-17T11:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80",
    updates: [
      {
        id: "up-3",
        timestamp: "2026-10-16T08:00:00Z",
        status: "diverifikasi",
        officerName: "Admin Pelayanan Gumelar",
        note: "Laporan diteruskan ke Dinas Perhubungan & PLN ULP terdekat."
      },
      {
        id: "up-4",
        timestamp: "2026-10-17T11:00:00Z",
        status: "selesai",
        officerName: "Tim Teknisi PJU Dishub Banyumas",
        note: "Bohlam LED 90 Watt dan komponen sakelar otomatis (photocell) telah diganti baru. PJU sudah menyala terang dan berfungsi normal kembali.",
        proofImageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "GML-2026-0045",
    title: "Pohon Tumbang Membahayakan Kabel PLN di Tanjakan Paningkaban",
    category: "bencana_alam",
    village: "Desa Paningkaban",
    locationDetails: "Dekat jembatan kayu grumbul Munggang RT 04 RW 02.",
    description: "Hujan deras disertai angin kencang menyebabkan pohon sengon miring dan tersangkut kabel listrik tegang tinggi. Dikhawatirkan roboh menimpa pengendara.",
    reporterName: "Suratno",
    reporterPhone: "0812-3400-xxxx",
    isAnonymous: false,
    status: "diajukan",
    priority: "darurat",
    createdAt: "2026-10-19T18:40:00Z",
    updatedAt: "2026-10-19T18:40:00Z",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
    updates: []
  }
];

export const INITIAL_FORUM_TOPICS: ForumTopic[] = [
  {
    id: "forum-1",
    title: "Kabar Gembira: Ekspor Gula Semut Gancang & Pelatihan Organik Batch 3",
    category: "umkm_ekonomi",
    village: "Desa Gancang",
    author: "H. Bambang Wahyudi (Kades Gancang)",
    isOfficial: true,
    content: "Assalamu'alaikum warga Kecamatan Gumelar. Alhamdulillah Koperasi Nira Gancang baru saja menandatangani kontrak pengiriman 15 ton gula kelapa kristal organik. Untuk memenuhi kuota tersebut, kami mengundang para pemuda dan penderes nira se-Kecamatan Gumelar untuk mengikuti Pelatihan Standarisasi Organik SNI & Ekspor yang akan diadakan di Balai Desa Gancang pada hari Sabtu pekan depan. Gratis dan dapat sertifikat!",
    timestamp: "2026-10-19T10:15:00Z",
    likes: 38,
    userLiked: true,
    tags: ["GulaSemut", "UMKM", "Ekspor", "GumelarMaju"],
    comments: [
      {
        id: "c-1",
        author: "Slamet Riyadi",
        village: "Desa Cilangkap",
        isOfficial: false,
        content: "Mantap Pak Kades! Apakah warga Cilangkap yang masih memproduksi gula cetak batok boleh ikut belajar beralih ke gula kristal?",
        timestamp: "2026-10-19T11:00:00Z",
        likes: 7
      },
      {
        id: "c-2",
        author: "H. Bambang Wahyudi (Kades Gancang)",
        village: "Desa Gancang",
        isOfficial: true,
        content: "Sangat boleh Mas Slamet! Semua penderes di 10 desa Gumelar sangat kami harapkan hadir agar harga nira petani kita semakin tinggi.",
        timestamp: "2026-10-19T11:45:00Z",
        likes: 12
      }
    ]
  },
  {
    id: "forum-2",
    title: "Tips Mengatasi Hama Penggerek Batang pada Kebun Kapulaga Saat Musim Hujan",
    category: "pertanian",
    village: "Desa Cihonje",
    author: "Pak Maryono (Ketua Gapoktan Cihonje)",
    isOfficial: false,
    content: "Sedulur tani kapulaga Gumelar, beberapa hari ini curah hujan di kawasan lereng cukup tinggi. Mohon waspada busuk rimpang dan ulat penggerek batang. Kami sarankan pembersihan gulma di sekitar rumpun dipercepat agar drainase lancar, dan gunakan semprotan pesnab dari daun tembakau + serai wangi. Ada yang punya pengalaman serupa?",
    timestamp: "2026-10-18T16:20:00Z",
    likes: 24,
    userLiked: false,
    tags: ["Kapulaga", "Pertanian", "TipsTani", "Banyumas"],
    comments: [
      {
        id: "c-3",
        author: "Sutrisno (Petani Karangkemiri)",
        village: "Desa Karangkemiri",
        isOfficial: false,
        content: "Nuwun sewu Pak Maryono, pengalaman kulo di Karangkemiri dikasih taburan abu dapur di pangkal batang juga ampuh mencegah jamur saat hujan deras.",
        timestamp: "2026-10-18T17:30:00Z",
        likes: 9
      }
    ]
  },
  {
    id: "forum-3",
    title: "Pendaftaran Festival Ebeg Turonggo Sakti Gumelar 2026 Dibuka!",
    category: "seni_budaya",
    village: "Desa Kedungurang",
    author: "Karang Taruna Kedungurang",
    isOfficial: true,
    content: "Salam Budaya! Dalam rangka memeriahkan hari jadi dan melestarikan seni adiluhung Banyumasan, Karang Taruna bekerja sama dengan Kecamatan Gumelar menyelenggarakan Festival Ebeg Antar-Paguyuban se-Kecamatan Gumelar. Tiap desa boleh mengirimkan 1 perwakilan paguyuban ebeg binaannya. Hadiah total puluhan juta rupiah dan piala bergilir Camat Gumelar!",
    timestamp: "2026-10-17T09:00:00Z",
    likes: 52,
    userLiked: true,
    tags: ["EbegBanyumasan", "FestivalGumelar", "BudayaNusantara", "Calung"],
    comments: [
      {
        id: "c-4",
        author: "Danang Wijaya",
        village: "Desa Gumelar",
        isOfficial: false,
        content: "Luar biasa! Paguyuban Turonggo Mudho Gumelar siap mendaftar! Kapan jadwal gladi bersihnya lur?",
        timestamp: "2026-10-17T10:12:00Z",
        likes: 11
      }
    ]
  }
];

export const INITIAL_EVENTS: CommunityEvent[] = [
  {
    id: "ev-1",
    title: "Festival Budaya Ebeg & Pentas Calung Gumelar Gumebyar",
    category: "kebudayaan",
    village: "Desa Gumelar",
    date: "2026-10-25",
    time: "08.30 - 17.00 WIB",
    location: "Lapangan Sepak Bola Utama Kecamatan Gumelar",
    organizer: "Kecamatan Gumelar & Dewan Kesenian Banyumas",
    description: "Parade seni akbar menampilkan 10 paguyuban ebeg kuda kepang dari 10 desa, pasar kuliner mendoan dan olahan nira, serta pameran kerajinan sapu rayung dan anyaman bambu.",
    attendeesCount: 342,
    userAttending: true,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ev-2",
    title: "Pemeriksaan Kesehatan Gratis & Skrining PTM Serentak",
    category: "kesehatan",
    village: "Desa Samudra",
    date: "2026-10-28",
    time: "08.00 - 12.00 WIB",
    location: "Balai Desa Samudra",
    organizer: "Puskesmas Gumelar & Posbindu Lansia",
    description: "Layanan cek tensi darah, gula darah sewaktu, kolesterol, asam urat, serta konsultasi dokter dan pembagian kacamata baca bersubsidi bagi warga usia 40 tahun ke atas.",
    attendeesCount: 128,
    userAttending: false,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ev-3",
    title: "Musyawarah Perencanaan Pembangunan Kecamatan (Musrenbang)",
    category: "pemerintahan",
    village: "Desa Gumelar",
    date: "2026-11-04",
    time: "09.00 - 14.30 WIB",
    location: "Aula Ronggolawe Kantor Kecamatan Gumelar",
    organizer: "Pemerintah Kecamatan Gumelar & Bappedalitbang Banyumas",
    description: "Penetapan prioritas usulan pembangunan infrastruktur jalan antar-desa, irigasi pertanian, sarana air bersih, dan peningkatan ekonomi desa tahun anggaran 2027.",
    attendeesCount: 85,
    userAttending: false,
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ev-4",
    title: "Aksi Resik Kali & Kerja Bakti Penghijauan Lereng Gumelar",
    category: "gotong_royong",
    village: "Desa Paningkaban",
    date: "2026-11-08",
    time: "06.30 - 11.00 WIB",
    location: "Bantaran Sungai Cikawung & Lereng Paningkaban",
    organizer: "Relawan Siaga Bencana & Forum Pemuda Gumelar",
    description: "Gotong royong membersihkan sampah aliran sungai dan penanaman 1.000 bibit pohon aren dan bambu petung untuk mencegah resiko longsor di perbukitan.",
    attendeesCount: 195,
    userAttending: false,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
  }
];
