/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║     KONFIGURASI WEB ALBUM — SAFITRI LAILASARI           ║
 * ║     Apotek Alpro · Keluarga Besar                       ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * CARA ISI KONFIGURASI INI:
 * Baca file PANDUAN_SETUP.md untuk panduan lengkap step-by-step.
 *
 * SINGKATNYA:
 * 1. Dapatkan API Key Google Drive (gratis, ~5 menit)
 * 2. Upload folder FAREWELL ke Google Drive
 * 3. Share tiap subfolder → "Anyone with link" = Viewer
 * 4. Copy ID folder dari link Drive dan isi di bawah ini
 */

const CONFIG = {

  // ─── LANGKAH 1: Google Drive API Key ───────────────────────
  // Panduan: https://console.cloud.google.com/
  // → Buat project → Enable "Google Drive API" → Credentials → API Key
  apiKey: 'AIzaSyBtNQqpiCK9KViwzLScmaM2V00jBuM-qGA',

  // ─── LANGKAH 2: ID Folder Google Drive ─────────────────────
  // Cara dapat ID folder:
  //   Buka folder di Drive → klik kanan → "Get link"
  //   Link = https://drive.google.com/drive/folders/[INI_ID_NYA]
  //   Copy bagian setelah /folders/
  folderIds: {
    music:           '1XhIb1nF0_vuPtlZiTAv-nrh0dP5jN1iS',   // Folder: LAGU/
    imagesCover:     '12CrTUXOyvZB3WxD6Gl-Hx9ykRNNmlSkB',   // Folder: IMAGE/Cover Random/
    images2024:      '1tXsx_kyQn0cSHyBcKtrhjjFMAZSvojXx',   // Folder: IMAGE/2024/
    images2025:      '1ZcqquD40YesCGJzz4kelwLFZMxFFiSjA',   // Folder: IMAGE/2025/
    images2026:      '129MUf7eq6bTjh40OkukmXHp0ADGjRV3r',   // Folder: IMAGE/2026/
    videosMomenSeru: '1i_htQOf6MIuUhWbKC8ChPf-TjC7aGhi8',   // Folder: VIDEO/Momen Seru/
    videosTraining:  '1MXfUZ4lU3ypic6l0jzgHRMFSMqpAAeqv',   // Folder: VIDEO/TRAINING ACADEMY/
    sertifikat:      '1Dw_qdex24_Ii28ZccCmdVJ9pc9-ZkZHD',   // Folder: SertifikatPiagam/
  },

  // ─── LANGKAH 3: Nama File Musik ────────────────────────────
  // Nama file persis di Google Drive (sudah terisi otomatis):
  musicFilename: 'Hadiah_Untuknya.mp3',

  // ─── LANGKAH 4: Cover Hero (bisa lebih dari 1 foto!) ───────
  // Isi array dengan nama-nama file dari folder Cover Random.
  // Foto akan berganti otomatis setiap 3 detik (slideshow).
  // Urutan bebas, min 1 foto, max tidak terbatas.
  heroCoverFilenames: [
    '1730820218531.jfif','Apresiasi.png','Natalia Wedding 14 Sept 24 (3).jpg','21 nov 24 (5).jpg','Morning Sharing 9 Des 24.jpg','GO 1 Jun 25 (1).jpg','Agustusan 20 Aug 25 (3).jpg','Agustusan 20 Aug 25 (24).jpg','Agustusan 20 Aug 25 (29).jpg','GO Bekasi Aug 25 (1).jpg','Badminton 17 Sep 25 (6).jpg','Badminton 17 Sep 25 (7).jpg','Gathering Sales 32 Miliar 30 Sep 25 (3).jpg','Gathering Sales 32 Miliar 30 Sep 25 (7).jpg','Gathering Sales 32 Miliar 30 Sep 25 (20).jpg','Apoteker Cilik 7 Des 25 (1).jpg','CNY Ramadhan 25 Feb 26 (11).jpg','Idul Fitri 20 Mar 26.jpg','Last Day Hasidan 15 Jun 26 (12).jpg','Posyandu Lansia Melati Kelapa Dua 19 Jun 26 (2).jpeg','Vihara Dharma Subha 20 Jun 26 (1).jpeg','Vihara Dharma Subha 20 Jun 26 (5).jpeg','Sebar Flyer Sorrento 25 Jun 26 (1).jpeg','Sebar Flyer Sorrento 25 Jun 26 (4).jpeg','Sebar Flyer Sorrento 25 Jun 26 (8).jpeg',
    // Tambah nama file lain dari folder Cover Random di sini:
    // 'Apresiasi.png',
  ],

  // ─── INFO SERTIFIKAT (sudah terisi, tidak perlu diubah) ───
  certificate: {
    name: 'Safitri Lailasari, S.Sos',
    company: 'Apotek Alpro',
    roles: [
      {
        title: 'Operation Support Executive',
        period: '1 Juni 2024 – 30 September 2025'
      },
      {
        title: 'Customer Executive',
        period: '1 Oktober 2025 – 30 Juni 2026'
      }
    ],
    totalPeriod: '1 Juni 2024 – 30 Juni 2026',
    logoFilename: 'Logo Alpro.webp',
    contributions: [
      '**Penyusunan Laporan Adaptif:** Senantiasa adaptif dan tanggap dalam menyusun berbagai laporan operasional secara terstruktur demi mendukung pengambilan keputusan tim manajemen.',
      '**Edukasi Pengetahuan Produk:** Menyusun materi pembelajaran produk (*product knowledge*) dan panduan teknis kompetisi secara komprehensif guna meningkatkan kapasitas tim di lapangan.',
      '**Pengelolaan Kompetisi yang Adil:** Menghadirkan mekanisme kompetisi kerja yang terstruktur, transparan, menyenangkan, serta mengawal ketepatan waktu pencairan apresiasi tim.',
      '**Koordinasi Logistik Event & GO:** Mengelola dan mengoordinasikan seluruh proses mobilisasi serta perpindahan barang untuk kebutuhan event dan Grand Opening (GO) dengan sangat rapi dan sistematis.',
      '**Pelaksanaan Mini Event:** Merencanakan dan mengawal jalannya mini event melalui koordinasi lintas departemen yang harmonis demi mencapai kesuksesan bersama.',
      '**Tanggung Jawab Kegiatan:** Menunjukkan komitmen tinggi dengan turut hadir mendampingi kelancaran mini event secara langsung guna memastikan kualitas acara terjaga.',
      '**Pendampingan Grand Opening:** Selalu setia mendampingi dan mengawal perjuangan tim di lapangan selama proses Grand Opening dari awal hingga toko tutup, tanpa memedulikan jarak outlet.',
      '**Solusi Masalah Outlet Baru:** Aktif memberikan dukungan operasional dan membantu memecahkan kendala teknis pada pembukaan berbagai outlet (seperti di Wisma Asri) hingga sukses berjalan lancar.',
      '**Apresiasi Keberhasilan Bersama:** Menanamkan semangat kebersamaan dengan memastikan setiap pencapaian sukses Grand Opening diakui sebagai kemenangan bersama seluruh tim terkait.',
      '**Jembatan Komunikasi (Liaison):** Berperan sebagai penghubung yang andal dalam menyelaraskan koordinasi komunikasi antara manajemen pusat dengan tim operasional di lapangan secara bijaksana.',
      '**Rangkulan Emosional (Team Bonding):** Membangun hubungan yang erat berbasis empati yang tinggi, menciptakan lingkungan kerja yang nyaman dan suportif bagi tim Customer Executive (CE).',
      '**Komitmen Dedikasi Tanpa Batas:** Menunjukkan dedikasi luar biasa dengan senantiasa meluangkan waktu demi memastikan seluruh tanggung jawab operasional terselesaikan dengan sempurna.',
      '**Transisi Tugas yang Profesional:** Mempersiapkan proses serah terima pekerjaan (*handover*) secara matang, terperinci, dan penuh tanggung jawab demi keberlanjutan operasional tim.'
    ]
  }
};
