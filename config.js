/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║     KONFIGURASI WEB ALBUM — SAFITRI LAILASARI           ║
 * ║     Apotek Alpro · Divisi Sales & Geo Marketing         ║
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
  // Foto akan berganti otomatis setiap 5 detik (slideshow).
  // Urutan bebas, min 1 foto, max tidak terbatas.
  heroCoverFilenames: [
    '1730820218531.jfif',
    // Tambah nama file lain dari folder Cover Random di sini:
    // 'Apresiasi.png',
  ],

  // ─── INFO SERTIFIKAT (sudah terisi, tidak perlu diubah) ───
  certificate: {
    name: 'Safitri Lailasari, S.Sos','Apresiasi.png',
    company: 'Apotek Alpro',
    division: 'Sales & Geo Marketing',
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
  }
};
