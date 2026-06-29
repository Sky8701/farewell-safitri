/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║     DATA KONTEN — EVENTS, VIDEO & PESAN                 ║
 * ║     Sudah pre-populated dari scan folder referensi      ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * YANG PERLU ANDA ISI:
 * → Cari setiap field  caption: ''  dan isi dengan quote/caption
 *   yang ingin ditampilkan untuk setiap event/video.
 * → Untuk event tanpa nama (hanya tanggal), caption wajib diisi.
 *
 * FORMAT TANGGAL: YYYY-MM-DD (untuk sorting otomatis)
 */

// ═══════════════════════════════════════════════════════════
//  EVENTS FOTO
//  Setiap event = satu momen/kegiatan, berisi array foto
// ═══════════════════════════════════════════════════════════

const PHOTO_EVENTS = [

  // ─────────────────────────────────────────
  //  2024 — Tahun Pertama di Alpro
  // ─────────────────────────────────────────

  {
    id: 'pra-alpro-2024',
    title: 'Pra Alpro',
    displayDate: '14 Mei 2024',
    date: '2024-05-14',
    year: 2024,
    folder: 'images2024',
    caption: 'Sebelum Alpro resmi hadir, inilah awal kita membangun.',  // ← ISI CAPTION/QUOTE DISINI
    photos: ['Pra Alpro 14 Mei 24.jpg']
  },

  {
    id: 'formasi-awal-2024',
    title: 'Formasi Awal Tim',
    displayDate: '27 Juni 2024',
    date: '2024-06-27',
    year: 2024,
    folder: 'images2024',
    caption: 'Bermula dalam ruangan kecil, segelintir orang saja, kamu sudah menjadi bagian tim',
    photos: [
      'Formasi Awal 27 Jun 24 (1).jpg',
      'Formasi Awal 27 Jun 24 (2).jpg',
      'Formasi Awal 27 Jun 24 (3).jpg',
    ]
  },

  {
    id: 'hari-bersama-jul-2024',
    title: 'Hari Bersama Tim',
    displayDate: '2 Juli 2024',
    date: '2024-07-02',
    year: 2024,
    folder: 'images2024',
    caption: 'Sekacau apapun di awal, selalu sempatkan moment untuk bahagia',
    photos: ['2 Jul 24.jpg']
  },

  {
    id: 'greenville-2024',
    title: 'Kunjungan Greenville',
    displayDate: '20 Juli 2024',
    date: '2024-07-20',
    year: 2024,
    folder: 'images2024',
    caption: 'Menjadi bagian kunjungan COO untuk turun langsung ke lapangan',
    photos: ['Greenville 20 Jul 24.jpg']
  },

  {
    id: 'agustusan-2024',
    title: 'HUT RI ke-79 — Agustusan',
    displayDate: '16 Agustus 2024',
    date: '2024-08-16',
    year: 2024,
    folder: 'images2024',
    caption: 'Merah Putih perdana kita di Alpro',
    photos: [
      'Agustusan 16 Aug 24 (1).jpg',
      'Agustusan 16 Aug 24 (2).jpg',
      'Agustusan 16 Aug 24 (3).jpg',
    ]
  },

  {
    id: 'ultah-bu-ria-2024',
    title: 'Ulang Tahun Bu Ria',
    displayDate: '29 Agustus 2024',
    date: '2024-08-29',
    year: 2024,
    folder: 'images2024',
    caption: 'Celebrate HUT Bu Ria, tampil manis secara sederhana',
    photos: [
      'Ultah B Ria 29 Aug 24 (1).jpg',
      'Ultah B Ria 29 Aug 24 (2).jpg',
    ]
  },

  {
    id: 'natalia-wedding-2024',
    title: 'Pernikahan Natalia',
    displayDate: '14 September 2024',
    date: '2024-09-14',
    year: 2024,
    folder: 'images2024',
    caption: 'Hadir di hari bahagia Natalia, selalu bahagia jika orang lain bahagia',
    photos: [
      'Natalia Wedding 14 Sept 24 (1).jpg',
      'Natalia Wedding 14 Sept 24 (2).jpg',
      'Natalia Wedding 14 Sept 24 (3).jpg',
      'Natalia Wedding 14 Sept 24 (4).jpg',
      'Natalia Wedding 14 Sept 24 (5).jpg',
    ]
  },

  {
    id: 'morning-sharing-sep-2024',
    title: 'Morning Sharing',
    displayDate: '20 September 2024',
    date: '2024-09-20',
    year: 2024,
    folder: 'images2024',
    caption: 'Macam ada Big Moment untuk Morning Sharing x ini ^^',
    photos: ['Morning Sharing 20 Sep 24.jpg']
  },

  {
    id: 'gathering-kampung-kecil-2024',
    title: 'Gathering Kampung Kecil',
    displayDate: '25 September 2024',
    date: '2024-09-25',
    year: 2024,
    folder: 'images2024',
    caption: 'Gathering perdana dimana kita belajar kebersamaan adalah modal terkuat',
    photos: [
      'Gathering Kampung Kecil 25 Sep 24 (1).jpg',
      'Gathering Kampung Kecil 25 Sep 24 (2).jpg',
      'Gathering Kampung Kecil 25 Sep 24 (3).jpg',
      'Gathering Kampung Kecil 25 Sep 24 (4).jpg',
      'Gathering Kampung Kecil 25 Sep 24 (5).jpg',
      'Gathering Kampung Kecil 25 Sep 24 (6).jpg',
      'Gathering Kampung Kecil 25 Sep 24 (7).jpg',
      'Gathering Kampung Kecil 25 Sep 24 (8).jpg',
      'Gathering Kampung Kecil 25 Sep 24 (9).jpg',
      'Gathering Kampung Kecil 25 Sep 24 (10).jpg',
      'Gathering Kampung Kecil 25 Sep 24 (11).jpg',
      'Gathering Kampung Kecil 25 Sep 24 (12).jpg',
      'Gathering Kampung Kecil 25 Sep 24 (13).jpg',
    ]
  },

  {
    id: 'ultah-via-2024',
    title: 'Ulang Tahun Via',
    displayDate: '22 Oktober 2024',
    date: '2024-10-22',
    year: 2024,
    folder: 'images2024',
    caption: 'Selalu ambil bagian dalam setiap moment ultah, dengan gaya dan senyum termanis',
    photos: [
      'Ultah Via 22 Okt 24 (1).jpg',
      'Ultah Via 22 Okt 24 (2).jpg',
      'Ultah Via 22 Okt 24 (3).jpg',
      'Ultah Via 22 Okt 24 (4).jpg',
      'Ultah Via 22 Okt 24 (5).jpg',
      'Ultah Via 22 Okt 24 (6).jpg',
      'Ultah Via 22 Okt 24 (7).jpg',
      'Ultah Via 22 Okt 24 (8).jpg',
    ]
  },

  {
    id: 'kebersamaan-nov-2024',
    title: 'Kebersamaan Tim November',
    displayDate: '7 November 2024',
    date: '2024-11-07',
    year: 2024,
    folder: 'images2024',
    caption: "Together we're Happy, Happy Moment for Everyone",
    photos: [
      '7 Nov 24 (1).jpg',
      '7 Nov 24 (2).jpg',
      '7 Nov 24 (3).jpg',
      '7 Nov 24 (4).jpg',
      '7 Nov 24 (5).jpg',
    ]
  },

  {
    id: 'event-alpro-nov-2024',
    title: 'Event Alpro',
    displayDate: '21 November 2024',
    date: '2024-11-21',
    year: 2024,
    folder: 'images2024',
    caption: 'Waktu santai bersama OSS Tim, momen untuk kenangan indah',
    photos: [
      '21 nov 24 (1).jpg',
      '21 nov 24 (2).jpg',
      '21 nov 24 (3).jpg',
      '21 nov 24 (4).jpg',
      '21 nov 24 (5).jpg',
      '21 nov 24 (6).jpg',
      '21 nov 24 (7).jpg',
      '21 nov 24 (8).jpg',
      '21 nov 24 (9).jpg',
      '21 nov 24 (10).jpg',
      '21 nov 24 (11).jpg',
      '21 Nov 24 (12).jpg',
      '21 Nov 24 (13).jpg',
      '21 Nov 24 (14).jpg',
      '21 Nov 24 (15).jpg',
      '21 Nov 24 (16).jpg',
    ]
  },

  {
    id: 'grand-launching-2024',
    title: 'Grand Launching Apotek Alpro',
    displayDate: '7 Desember 2024',
    date: '2024-12-07',
    year: 2024,
    folder: 'images2024',
    caption: 'Proud to be part of Grand Launching Apotek Alpro',
    photos: [
      'Grand Launching 7 Des 24 (1).jpg',
      'Grand Launching 7 Des 24 (2).jpg',
      'Grand Launching 7 Des 24 (3).jpg',
      'Grand Launching 7 Des 24 (4).jpg',
      'Grand Launching 7 Des 24 (5).jpg',
      'Grand Launching 7 Des 24 (6).jpg',
      'Grand Launching 7 Des 24 (7).jpg',
      'Grand Launching 7 Des 24 (8).jpg',
      'Grand Launching 7 Des 24 (9).jpg',
      'Grand Launching 7 Des 24 (10).jpg',
      'Grand Launching 7 Des 24 (11).jpg',
      'Grand Launching 7 Des 24 (12).jpg',
      'Grand Launching 7 Des 24 (13).jpg',
      'Grand Launching 7 Des 24 (14).jpg',
      'Grand Launching 7 Des 24 (15).jpg',
      'Grand Launching 7 Des 24 (16).jpg',
      'Grand Launching 7 Des 24 (17).jpg',
      'Grand Launching 7 Des 24 (18).jpg',
      'Grand Launching 7 Des 24 (19).jpg',
      'Grand Launching 7 Des 24 (20).jpg',
    ]
  },

  {
    id: 'morning-sharing-des-2024',
    title: 'Morning Sharing',
    displayDate: '9 Desember 2024',
    date: '2024-12-09',
    year: 2024,
    folder: 'images2024',
    caption: 'Mencoba PD membawakan Alpro Philosophy di sesi Morning Briefing',
    photos: ['Morning Sharing 9 Des 24.jpg']
  },

  {
    id: 'last-day-ilham-2024',
    title: 'Perpisahan Ilham',
    displayDate: '18 Desember 2024',
    date: '2024-12-18',
    year: 2024,
    folder: 'images2024',
    caption: 'Mengingatkan diri bahwa setiap pertemuan, pasti ada perpisahan. Stay Happy',
    photos: [
      'Last Day Ilham 18 Des 24 (1).jpg',
      'Last Day Ilham 18 Des 24 (2).jpg',
      'Last Day Ilham 18 Des 24 (3).jpg',
      'Last Day Ilham 18 Des 24 (4).jpg',
      'Last Day Ilham 18 Des 24 (5).jpg',
      'Last Day Ilham 18 Des 24 (6).jpg',
    ]
  },

  // ─────────────────────────────────────────
  //  2025 — Tahun Kedua & Transisi Jabatan
  // ─────────────────────────────────────────

  {
    id: 'ultah-hendri-2025',
    title: 'Ulang Tahun P. Hendri (Belated)',
    displayDate: '2 Januari 2025',
    date: '2025-01-02',
    year: 2025,
    folder: 'images2025',
    caption: 'Fit, apa yang ada di pikiranmu tentang moment ini?',
    photos: ['Ultah P Hendri (Belated) 2 Jan 25.jpg']
  },

  {
    id: 'januari-2025',
    title: 'Kebersamaan Januari',
    displayDate: '17 Januari 2025',
    date: '2025-01-17',
    year: 2025,
    folder: 'images2025',
    caption: 'Ketika kerja membuat stress, moment fun seperti ini lah yang jadi obatnya',
    photos: [
      '17 Jan 25 (1).jpg',
      '17 Jan 25 (2).jpg',
      '17 Jan 25 (3).jpg',
      '17 Jan 25 (4).jpg',
    ]
  },

  {
    id: 'ultah-bram-2025',
    title: 'Ulang Tahun Bram',
    displayDate: '25 Februari 2025',
    date: '2025-02-25',
    year: 2025,
    folder: 'images2025',
    caption: 'Teknisi handal pun perlu moment celebrate ultah ><',
    photos: [
      'Ultah Bram 25 Feb 25 (1).jpg',
      'Ultah Bram 25 Feb 25 (2).jpg',
      'Ultah Bram 25 Feb 25 (3).jpg',
      'Ultah Bram 25 Feb 25 (4).jpg',
    ]
  },

  {
    id: 'bukber-8-mar-2025',
    title: 'Buka Bersama Ramadhan',
    displayDate: '8 Maret 2025',
    date: '2025-03-08',
    year: 2025,
    folder: 'images2025',
    caption: 'Momen Bukber adalah momen silaturahmi, saat tali persaudaraan dan kasih sayang dibangun kembali',
    photos: Array.from({length: 32}, (_, i) => `Bukber 8 Mar 25 (${i + 1}).jpg`)
  },

  {
    id: 'maret-2025',
    title: 'Momen Maret',
    displayDate: '12 Maret 2025',
    date: '2025-03-12',
    year: 2025,
    folder: 'images2025',
    caption: 'Kamu selalu lucu di momen seperti ini',
    photos: ['12 Mar 25.jpg']
  },

  {
    id: 'bukber-24-mar-2025',
    title: 'Buka Bersama Tim',
    displayDate: '24 Maret 2025',
    date: '2025-03-24',
    year: 2025,
    folder: 'images2025',
    caption: 'Bukber tim itu seru, tetapi Bukber 1 HQ jauh lebih pecah',
    photos: [
      'Bukber 24 Mar 25 (1).jpg',
      'Bukber 24 Mar 25 (2).jpg',
      'Bukber 24 Mar 25 (3).jpg',
      'Bukber 24 Mar 25 (4).jpg',
      'Bukber 24 Mar 25 (5).jpg',
      'Bukber 24 Mar 25 (6).jpg',
      '24 Mar 25.jpg',
    ]
  },

  {
    id: 'go-jun-2025',
    title: 'Grand Opening Cabang Baru',
    displayDate: '1 Juni 2025',
    date: '2025-06-01',
    year: 2025,
    folder: 'images2025',
    caption: 'Ambil bagian dalam setiap GO, Tq u untuk setiap waktu libur yang kamu luangkan',
    photos: [
      'GO 1 Jun 25 (1).jpg',
      'GO 1 Jun 25 (2).jpg',
      'GO 1 Jun 25 (3).jpg',
      'GO 1 Jun 25 (4).jpg',
      'GO 1 Jun 25 (5).jpg',
      'GO 1 Jun 25 (6).jpg',
      'GO 1 Jun 25 (7).jpg',
      'GO 1 Jun 25 (8).jpg',
      'GO 1 Jun 25 (9).jpg',
    ]
  },

  {
    id: 'ultah-anita-2025',
    title: 'Ulang Tahun Anita',
    displayDate: '3 Juni 2025',
    date: '2025-06-03',
    year: 2025,
    folder: 'images2025',
    caption: 'Momen dimana kamu lebih Glowing dari yang sedang ultah',
    photos: [
      'Ultah Anita 3 Jun 25 (1).jpg',
      'Ultah Anita 3 Jun 25 (2).jpg',
    ]
  },

  {
    id: 'last-day-winda-2025',
    title: 'Perpisahan Winda',
    displayDate: '13 Agustus 2025',
    date: '2025-08-13',
    year: 2025,
    folder: 'images2025',
    caption: 'Ketika yang lain Last Day, kita pun harus bersiap saat itu adalah our Last Day',
    photos: [
      'Last Day Winda 13 Aug 25 (1).jpg',
      'Last Day Winda 13 Aug 25 (2).jpg',
      'Last Day Winda 13 Aug 25 (3).jpg',
      'Last Day Winda 13 Aug 25 (4).jpg',
    ]
  },

  {
    id: 'agustusan-2025',
    title: 'HUT RI ke-80 — Agustusan',
    displayDate: '20 Agustus 2025',
    date: '2025-08-20',
    year: 2025,
    folder: 'images2025',
    caption: 'Agustusan tahun kedua bersama keluarga besar Alpro, kamu tampil cantik dengan dress etnik mu',
    photos: Array.from({length: 29}, (_, i) => `Agustusan 20 Aug 25 (${i + 1}).jpg`)
  },

  {
    id: 'go-bekasi-2025',
    title: 'Grand Opening Bekasi',
    displayDate: 'Agustus 2025',
    date: '2025-08-25',
    year: 2025,
    folder: 'images2025',
    caption: 'Percayalah ada sumbangsing nyatamu di setiap Apotek Alpro',
    photos: Array.from({length: 20}, (_, i) => `GO Bekasi Aug 25 (${i + 1}).jpg`)
  },

  {
    id: 'ultah-ria-2025',
    title: 'Ulang Tahun Ria',
    displayDate: '29 Agustus 2025',
    date: '2025-08-29',
    year: 2025,
    folder: 'images2025',
    caption: 'Ketika ultah setiap orang menjadi sumber senyummu',
    photos: [
      'Ultah Ria 29 Aug 25 (1).jpg',
      'Ultah Ria 29 Aug 25 (2).jpg',
      'Ultah Ria 29 Aug 25 (3).jpg',
    ]
  },

  {
    id: 'badminton-17-sep-2025',
    title: 'Badminton Bareng Tim',
    displayDate: '17 September 2025',
    date: '2025-09-17',
    year: 2025,
    folder: 'images2025',
    caption: 'Kerja memang perlu, tetapi jadikan olahraga sebagai waktu bounding di luar kantor',
    photos: [
      'Badminton 17 Sep 25 (1).jpg',
      'Badminton 17 Sep 25 (2).jpg',
      'Badminton 17 Sep 25 (3).jpg',
      'Badminton 17 Sep 25 (4).jpg',
      'Badminton 17 Sep 25 (5).jpg',
      'Badminton 17 Sep 25 (6).jpg',
      'Badminton 17 Sep 25 (7).jpg',
    ]
  },

  {
    id: 'ultah-septian-2025',
    title: 'Ulang Tahun Septian',
    displayDate: '22 September 2025',
    date: '2025-09-22',
    year: 2025,
    folder: 'images2025',
    caption: 'Asyiknya baru join sudah dirayakan dengan hangat',
    photos: [
      'IMG-20250922-WA0027.jpg',
      'IMG-20250922-WA0137.jpg',
    ]
  },

  {
    id: 'wedding-septian-2025',
    title: 'Pernikahan Septian',
    displayDate: '29 September 2025',
    date: '2025-09-29',
    year: 2025,
    folder: 'images2025',
    caption: 'Si bapak ini memang pintar pilih waktu, pindah kerja sebelum ultah dan nikah =D',
    photos: ['Wedding Septian 29 Sept 25.jpg']
  },

  {
    id: 'badminton-25-sep-2025',
    title: 'Badminton — Sesi Ke-2',
    displayDate: '25 September 2025',
    date: '2025-09-25',
    year: 2025,
    folder: 'images2025',
    caption: 'Badminton lagi biar sehat ya Fit',
    photos: [
      'Badminton 25 Sep 25 (1).jpg',
      'Badminton 25 Sep 25 (2).jpg',
      'Badminton 25 Sep 25 (3).jpg',
      'Badminton 25 Sep 25 (4).jpg',
    ]
  },

  {
    id: 'gathering-32m-2025',
    title: 'Gathering Sales 32 Miliar',
    displayDate: '30 September 2025',
    date: '2025-09-30',
    year: 2025,
    folder: 'images2025',
    caption: 'Ketika capaian sales diapresiasi dengan Gathering, kadang itu lebih berharga daripada uang',
    photos: Array.from({length: 38}, (_, i) => `Gathering Sales 32 Miliar 30 Sep 25 (${i + 1}).jpg`)
  },

  {
    id: 'go-okt-2025',
    title: 'Grand Opening Oktober',
    displayDate: 'Oktober 2025',
    date: '2025-10-22',
    year: 2025,
    folder: 'images2025',
    caption: 'Kamu sangat rajin ambil bagian dalam sosialisasi dan GO, percayalah ada yang mengapresiasi semua itu',
    photos: [
      'GO 22 Okt 25.jpg',
      'GO 24 Okt 25.jpg',
    ]
  },

  {
    id: 'apoteker-cilik-2025',
    title: 'Program Apoteker Cilik',
    displayDate: '7 Desember 2025',
    date: '2025-12-07',
    year: 2025,
    folder: 'images2025',
    caption: 'Walaupun capek dan ada gesekan, terima kasih kamu sudah do the best untuk membuat anak-anak ini tersenyum',
    photos: Array.from({length: 9}, (_, i) => `Apoteker Cilik 7 Des 25 (${i + 1}).jpg`)
  },

  {
    id: 'last-day-pram-2025',
    title: 'Perpisahan P. Pram',
    displayDate: '12 Desember 2025',
    date: '2025-12-12',
    year: 2025,
    folder: 'images2025',
    caption: 'Sukses selalu Pak Pram, figur kebapakan yang Alpro butuhkan',
    photos: [
      'Last Day P Pram 12 Des 25 (1).jpg',
      'Last Day P Pram 12 Des 25 (2).jpg',
      'Last Day P Pram 12 Des 25 (3).jpg',
      'Last Day P Pram 12 Des 25 (4).jpg',
      'Last Day P Pram 12 Des 25 (5).jpg',
      'Last Day P Pram 12 Des 25 (6).jpg',
    ]
  },

  // ─────────────────────────────────────────
  //  2026 — Tahun Terakhir & Kenangan Indah
  // ─────────────────────────────────────────

  {
    id: 'go-feb-2026',
    title: 'Grand Opening Februari',
    displayDate: 'Februari 2026',
    date: '2026-02-02',
    year: 2026,
    folder: 'images2026',
    caption: 'Kamu memang tidak ada di Spotlight, tetapi tanpamu GO ini mungkin tidak berjalan lancar',
    photos: [
      'GO 2 Feb 26 (1).jpg',
      'GO 2 Feb 26 (2).jpg',
      'GO 2 Feb 26 (3).jpg',
      'GO Feb 26 (1).jpg',
      'GO Feb 26 (2).jpg',
    ]
  },

  {
    id: 'cny-ramadhan-2026',
    title: 'CNY & Ramadhan Celebration',
    displayDate: '25 Februari 2026',
    date: '2026-02-25',
    year: 2026,
    folder: 'images2026',
    caption: 'Ketika 2 tradisi berbeda di lebur, memori lucu dan indah yang tercipta',
    photos: Array.from({length: 26}, (_, i) => `CNY Ramadhan 25 Feb 26 (${i + 1}).jpg`)
  },

  {
    id: 'ultah-dahlia-2026',
    title: 'Ulang Tahun Dahlia',
    displayDate: '9 Maret 2026',
    date: '2026-03-09',
    year: 2026,
    folder: 'images2026',
    caption: 'Sepertinya kalian memang lebih baik tidak menjadi rekan kerja y',
    photos: [
      'Ultah Dahlia 9 Mar 26 (1).jpg',
      'Ultah Dahlia 9 Mar 26 (2).jpg',
    ]
  },

  {
    id: 'bukber-2026',
    title: 'Buka Bersama Ramadhan',
    displayDate: '12 Maret 2026',
    date: '2026-03-12',
    year: 2026,
    folder: 'images2026',
    caption: 'Siapa yang sangka ini akan menjadi bukber terakhir kita di Alpro, stay happy y',
    photos: [
      'Bukber 12 Mar 26 (1).jpg',
      'Bukber 12 Mar 26 (2).jpg',
      'Bukber 12 Mar 26 (3).jpg',
      'Bukber 12 Mar 26 (4).jpg',
      'Bukber 12 Mar 26 (5).jpg',
      'Bukber 12 Mar 26 (6).jpg',
    ]
  },

  {
    id: 'idul-fitri-2026',
    title: 'Idul Fitri 1447 H',
    displayDate: '20 Maret 2026',
    date: '2026-03-20',
    year: 2026,
    folder: 'images2026',
    caption: 'Kita bermaaf-maafan untuk kembali menjadi fitri, seperti bagian namamu',
    photos: ['Idul Fitri 20 Mar 26.jpg']
  },

  {
    id: 'last-day-fey-2026',
    title: 'Perpisahan Fey',
    displayDate: '31 Maret 2026',
    date: '2026-03-31',
    year: 2026,
    folder: 'images2026',
    caption: 'Ketika saatnya Last Day, tinggalkan dengan senyuman',
    photos: Array.from({length: 7}, (_, i) => `Last Day Fey 31 Mar 26 (${i + 1}).jpg`)
  },

  {
    id: 'ultah-dila-2026',
    title: 'Ulang Tahun Dila',
    displayDate: '1 April 2026',
    date: '2026-04-01',
    year: 2026,
    folder: 'images2026',
    caption: 'Kamu selalu ambil bagian dalam semua momen happy, Good Job',
    photos: [
      'Ultah Dila 1 Apr 26 (1).jpg',
      'Ultah Dila 1 Apr 26 (2).jpg',
    ]
  },

  {
    id: 'ultah-wahyu-2026',
    title: 'Ulang Tahun Wahyu',
    displayDate: '2 April 2026',
    date: '2026-04-02',
    year: 2026,
    folder: 'images2026',
    caption: 'Momen gembira di Alpro tidak hanya momen Ultah, Fit. Banyak momen gembira sudah kamu buat',
    photos: [
      'Ultah Wahyu 2 Apr 26 (1).jpg',
      'Ultah Wahyu 2 Apr 26 (2).jpg',
      'Ultah Wahyu 2 Apr 26 (3).jpg',
    ]
  },

  {
    id: 'last-day-key-2026',
    title: 'Perpisahan Key',
    displayDate: '24 April 2026',
    date: '2026-04-24',
    year: 2026,
    folder: 'images2026',
    caption: 'Saat adik kecil Alpro memutuskan untuk "terbang" di dunia luar',
    photos: [
      'Last Day Key 24 Apr 26 (1).jpg',
      'Last Day Key 24 Apr 26 (2).jpg',
      'Last Day Key 24 Apr 26 (3).jpg',
    ]
  },

  {
    id: 'ultah-eugenne-2026',
    title: 'Ulang Tahun Ms. Eugenne, Saddam & Takat',
    displayDate: '26 Mei 2026',
    date: '2026-05-26',
    year: 2026,
    folder: 'images2026',
    caption: 'Love-Hate & Misunderstanding, Ms mu ini tetap jadi mentor yang membentuk cara berpikir mu. Keep memori baik tentangnya ya Fit',
    photos: [
      'Ultah Ms Eugenne-Saddam-Takat 26 May 26 (1).jpg',
      'Ultah Ms Eugenne-Saddam-Takat 26 May 26 (2).jpg',
      'Ultah Ms Eugenne-Saddam-Takat 26 May 26 (3).jpg',
    ]
  },

  {
    id: 'last-day-khalisa-sinta-2026',
    title: 'Perpisahan Khalisa & Sinta',
    displayDate: '29 Mei 2026',
    date: '2026-05-29',
    year: 2026,
    folder: 'images2026',
    caption: 'Mungkin kamu tak sadar y, tapi kamu selalu bisa dicari di tengah keramaian ^^',
    photos: [
      'Last Day Khalisa-Sinta 29 Mei 26 (1).jpg',
      'Last Day Khalisa-Sinta 29 Mei 26 (2).jpg',
      'Last Day Khalisa-Sinta 29 Mei 26 (3).jpg',
      'Last Day Khalisa-Sinta 29 Mei 26 (4).jpg',
    ]
  },

  {
    id: 'ultah-anita-jun-2026',
    title: 'Ulang Tahun Anita, Trijun & Rossa',
    displayDate: '3 Juni 2026',
    date: '2026-06-03',
    year: 2026,
    folder: 'images2026',
    caption: 'Saat-saat seperti ini yang akan selalu dirindukan dari kamu Fit',
    photos: Array.from({length: 13}, (_, i) => `Ultah Anita-Trijun-Rossa 3 Jun 26 (${i + 1}).jpg`)
  },

  {
    id: 'sosialisasi-gereja-2026',
    title: 'Sosialisasi Gereja Advent Palem Semi',
    displayDate: '14 Juni 2026',
    date: '2026-06-14',
    year: 2026,
    folder: 'images2026',
    caption: 'Ketekunanmu membuktikan kamu memiliki ownership yang jarang dimiliki orang lain',
    photos: ['Sosialisasi Gereja Advent Palem Semi 14 Jun 26.jpeg']
  },

  {
    id: 'last-day-hasidan-2026',
    title: 'Perpisahan Hasidan',
    displayDate: '15 Juni 2026',
    date: '2026-06-15',
    year: 2026,
    folder: 'images2026',
    caption: 'Adik cowok ini sudah mengembangkan sayapnya, tak lama lagi kamu pun akan Last Day. Kita lepas dengan senyuman ya',
    photos: Array.from({length: 14}, (_, i) => `Last Day Hasidan 15 Jun 26 (${i + 1}).jpg`)
  },

  {
    id: 'ultah-adi-2026',
    title: 'Ulang Tahun Adi',
    displayDate: '15 Juni 2026',
    date: '2026-06-15',
    year: 2026,
    folder: 'images2026',
    caption: 'Ultahnya bapak perijinan, wajib hadir y Fit =) ',
    photos: Array.from({length: 7}, (_, i) => `Ultah Adi 15 Jun 26 (${i + 1}).jpg`)
  },

  {
    id: 'school-talk-2026',
    title: 'School Talk Sorrento',
    displayDate: '17 Juni 2026',
    date: '2026-06-17',
    year: 2026,
    folder: 'images2026',
    caption: 'Aku suka lihat keseriusanmu saat bekerja, apresiasi tinggi buat kamu Fit',
    photos: ['School Talk Sorrento 17 Jun 26.jpeg']
  },

  {
    id: 'ultah-joko-2026',
    title: 'Ulang Tahun P. Joko',
    displayDate: '17 Juni 2026',
    date: '2026-06-17',
    year: 2026,
    folder: 'images2026',
    caption: 'Kapan lagi merayakan ultahnya Bapak Busdev y?',
    photos: ['Ultah P Joko 17 Jun 26.jpg']
  },

  {
    id: 'posyandu-lansia-2026',
    title: 'Posyandu Lansia Melati Kelapa Dua',
    displayDate: '19 Juni 2026',
    date: '2026-06-19',
    year: 2026,
    folder: 'images2026',
    caption: 'Sabtu Minggu tetap bertugas menyelesaikan dan meninggalkan Legacy baik',
    photos: [
      'Posyandu Lansia Melati Kelapa Dua 19 Jun 26 (1).jpeg',
      'Posyandu Lansia Melati Kelapa Dua 19 Jun 26 (2).jpeg',
    ]
  },

  {
    id: 'masjid-vihara-2026',
    title: 'Kunjungan & Sosialisasi',
    displayDate: '20 Juni 2026',
    date: '2026-06-20',
    year: 2026,
    folder: 'images2026',
    caption: 'Kamu sedang menabung amal baik dengan melayani setiap ibu-bapak yang ada di sosialisasi pemeriksaan kesehatan ini',
    photos: [
      'Masjid Jami Asapih Ayanih 20 Jun 26.jpeg',
      'Vihara Dharma Subha 20 Jun 26 (1).jpeg',
      'Vihara Dharma Subha 20 Jun 26 (2).jpeg',
      'Vihara Dharma Subha 20 Jun 26 (3).jpeg',
      'Vihara Dharma Subha 20 Jun 26 (4).jpeg',
      'Vihara Dharma Subha 20 Jun 26 (5).jpeg',
    ]
  },
  {
    id: 'sebar-flyer-sorrento-2026',
    title: 'Sebar Flyer Sorrento',
    displayDate: '25 Juni 2026',
    date: '2026-06-25',
    year: 2026,
    folder: 'images2026',
    caption: 'Masya Allah, sebar flyer pun tetap Happy & Sparkling.',
    photos: [
      'Sebar Flyer Sorrento 25 Jun 26 (1).jpeg',
      'Sebar Flyer Sorrento 25 Jun 26 (2).jpeg',
      'Sebar Flyer Sorrento 25 Jun 26 (3).jpeg',
      'Sebar Flyer Sorrento 25 Jun 26 (4).jpeg',
      'Sebar Flyer Sorrento 25 Jun 26 (5).jpeg',
      'Sebar Flyer Sorrento 25 Jun 26 (6).jpeg',
      'Sebar Flyer Sorrento 25 Jun 26 (7).jpeg',
      'Sebar Flyer Sorrento 25 Jun 26 (8).jpeg',
      'Sebar Flyer Sorrento 25 Jun 26 (9).jpeg',
      'Sebar Flyer Sorrento 25 Jun 26 (10).jpeg',
      'Sebar Flyer Sorrento 25 Jun 26 (11).jpeg',
      'Sebar Flyer Sorrento 25 Jun 26 (12).jpeg',
      'Sebar Flyer Sorrento 25 Jun 26 (13).jpeg',
      'Sebar Flyer Sorrento 25 Jun 26 (14).jpeg',
    ]
  },
  {
    id: 'last-go-juni-2026',
    title: 'Last GO (Tangerang) 27-28 Juni 2026',
    displayDate: '27-28 Juni 2026',
    date: '2026-06-27, 2026-06-28',
    year: 2026,
    folder: 'images2026',
    caption: 'Last GO, good job Fit, kamu sudah FINISH WELL dan DOING THE BEST, semua tidak akan sama lagi tanpamu.',
    photos: [
      'GO 27-28 Jun 26 (1).jpg',
      'GO 27-28 Jun 26 (2).jpg',
      'GO 27-28 Jun 26 (3).jpg',
      'GO 27-28 Jun 26 (4).jpg',
      'GO 27-28 Jun 26 (5).jfif',
      'GO 27-28 Jun 26 (6).jfif',
      'GO 27-28 Jun 26 (7).jfif',
      'GO 27-28 Jun 26 (8).jfif',
    ]
  },
];

// ═══════════════════════════════════════════════════════════
//  EVENTS VIDEO
// ═══════════════════════════════════════════════════════════

const VIDEO_EVENTS = {
  momenSeru: [
    {
      id: 'v-greenville-2024',
      title: 'Kunjungan Greenville',
      displayDate: '20 Juli 2024',
      date: '2024-07-20',
      folder: 'videosMomenSeru',
      filename: 'Greenville 20 Jul 24.mp4',
      caption: 'Alproean to be...><',
      thumbnail: '', // opsional: filename foto cover dari Drive
    },
    {
      id: 'v-event-alpro-2024',
      title: 'Event Alpro',
      displayDate: '21 November 2024',
      date: '2024-11-21',
      folder: 'videosMomenSeru',
      filename: '21 Nov 24 Video Alpro.mp4',
      caption: "Let's we sing Theme Song ' Apotek Alpro' =)",
    },
    {
      id: 'v-grand-opening-2024',
      title: 'Grand Opening Apotek Alpro',
      displayDate: '7 Desember 2024',
      date: '2024-12-07',
      folder: 'videosMomenSeru',
      filename: 'Grand Opening 7 Des 24.mp4',
      caption: 'Simpan dalam memori manismu ya, saat kamu masih bagian dari OSS team',
    },
    {
      id: 'v-bukber-mar-2025-1',
      title: 'Buka Bersama Ramadhan — Sesi 1',
      displayDate: '24 Maret 2025',
      date: '2025-03-24',
      folder: 'videosMomenSeru',
      filename: 'BUKBER 24 MARET 25 (1) .mp4',
      caption: 'Candaan receh seperti ini yang kamu akan rindukan y',
    },
    {
      id: 'v-bukber-mar-2025-2',
      title: 'Buka Bersama Ramadhan — Sesi 2',
      displayDate: '24 Maret 2025',
      date: '2025-03-24',
      folder: 'videosMomenSeru',
      filename: 'BUKBER 24 MARET 25 (2).mp4',
      caption: 'Kompak di saat semua tangan bersepakat membuat yel-yel',
    },
    {
      id: 'v-bukber-mar-2025-3',
      title: 'Buka Bersama Ramadhan — Sesi 3',
      displayDate: '24 Maret 2025',
      date: '2025-03-24',
      folder: 'videosMomenSeru',
      filename: 'BUKBER 24 MARET 25  (3).mp4',
      caption: 'Alproooo, KAIZEN',
    },
    {
      id: 'v-bukber-mar-2025-4',
      title: 'Buka Bersama Ramadhan — Sesi 4',
      displayDate: '24 Maret 2025',
      date: '2025-03-24',
      folder: 'videosMomenSeru',
      filename: 'BUKBER 24 MARET 25  (4).mp4',
      caption: 'Percayalah kamu akan lebih banyak lagi mengalami momen seru seperti ini di masa depanmu',
    },
    {
      id: 'v-bukber-mar-2025-5',
      title: 'Buka Bersama Ramadhan — Sesi 5',
      displayDate: '24 Maret 2025',
      date: '2025-03-24',
      folder: 'videosMomenSeru',
      filename: 'BUKBER 24 MARET 25  (5).mp4',
      caption: 'Tahun pertama bukber bersama keluarga besar Alpro, precious moment',
    },
    {
      id: 'v-idul-fitri-2025',
      title: 'Idul Fitri 1446 H',
      displayDate: 'Maret 2025',
      date: '2025-03-30',
      folder: 'videosMomenSeru',
      filename: 'IDUL FITRI 1446 H MARET 25 (1).mp4',
      caption: 'Mari kita bermaaf-maafan, memulai dengan hati yang bersih',
    },
    {
      id: 'v-go-bekasi-2025',
      title: 'Grand Opening Bekasi',
      displayDate: 'Agustus 2025',
      date: '2025-08-25',
      folder: 'videosMomenSeru',
      filename: 'GO Bekasi Aug 25.mp4',
      caption: 'Kamu harus bangga menjadi bagian dari setiap GO Alpro yang kamu ikuti y',
    },
    {
      id: 'v-agustusan-2025-1',
      title: 'HUT RI ke-80 — Agustusan (Part 1)',
      displayDate: '20 Agustus 2025',
      date: '2025-08-20',
      folder: 'videosMomenSeru',
      filename: 'Agustusan 20 Aug 25 (1).mp4',
      caption: 'Berapa x tag untuk menghasilkan video ini y?',
    },
    {
      id: 'v-agustusan-2025-2',
      title: 'HUT RI ke-80 — Agustusan (Part 2)',
      displayDate: '20 Agustus 2025',
      date: '2025-08-20',
      folder: 'videosMomenSeru',
      filename: 'Agustusan 20 Aug 25 (2).mp4',
      caption: "Sebanyak apapun tag nya, it's work & worth it",
    },

    {
      id: 'v-agustusan-2025-3',
      title: 'HUT RI ke-80 — Agustusan (Part 3)',
      displayDate: '20 Agustus 2025',
      date: '2025-08-20',
      folder: 'videosMomenSeru',
      filename: 'Agustusan 20 Aug 25 (3).mp4',
      caption: 'Percayalah kamu dikelilingi banyak orang baik di Alpro',
    },
    {
      id: 'v-agustusan-2025-4',
      title: 'HUT RI ke-80 — Agustusan (Part 4)',
      displayDate: '20 Agustus 2025',
      date: '2025-08-20',
      folder: 'videosMomenSeru',
      filename: 'Agustusan 20 Aug 25 (4).mp4',
      caption: 'Ini moment Gong nya pas Agustusan, hati-hati paket datamu habis karena ukuran video ini sangat besar',
    },
    {
      id: 'v-gathering-32m-2025-1',
      title: 'Gathering Sales 32 Miliar (Part 1)',
      displayDate: '30 September 2025',
      date: '2025-09-30',
      folder: 'videosMomenSeru',
      filename: 'Gathering Sales 32 Miliar 30 Sep 25 (1).mp4',
      caption: 'Alpro, Obat Tepat, Hati Tenang',
    },
    {
      id: 'v-gathering-32m-2025-2',
      title: 'Gathering Sales 32 Miliar (Part 2)',
      displayDate: '30 September 2025',
      date: '2025-09-30',
      folder: 'videosMomenSeru',
      filename: 'Gathering Sales 32 Miliar 30 Sep 25 (2).mp4',
      caption: 'Dan Hati Tenang karena dedikasimu di OSS dan SGM, Good Job Fit',
    },
    {
      id: 'v-apoteker-cilik-2025-1',
      title: 'Program Apoteker Cilik (Part 1)',
      displayDate: '7 Desember 2025',
      date: '2025-12-07',
      folder: 'videosMomenSeru',
      filename: 'Apoteker Cilik 7 Des 25 (1).mp4',
      caption: 'Kompak kan hati untuk memulai event Apocil',
    },
    {
      id: 'v-apoteker-cilik-2025-2',
      title: 'Program Apoteker Cilik (Part 2)',
      displayDate: '7 Desember 2025',
      date: '2025-12-07',
      folder: 'videosMomenSeru',
      filename: 'Apoteker Cilik 7 Des 25 (2).mp4',
      caption: 'Kamu harus bangga Fit, sudah menjadi bagian penting dari event ini',
    },
    {
      id: 'v-natal-2025',
      title: 'Natal 2025',
      displayDate: 'Desember 2025',
      date: '2025-12-25',
      folder: 'videosMomenSeru',
      filename: 'NATAL 2025.mp4',
      caption: 'Bhinneka Tunggal Ika, adakah wajahmu di video ucapan natal ini?',
    },
    {
      id: 'v-cny-ramadhan-2026-1',
      title: 'CNY & Ramadhan Celebration (Part 1)',
      displayDate: '25 Februari 2026',
      date: '2026-02-25',
      folder: 'videosMomenSeru',
      filename: 'CNY Ramadhan 25 Feb 26(1).mp4',
      caption: 'Mungkin ini last time kamu rayakan Imlek dan Bukber Puasa bersama Alpro',
    },
    {
      id: 'v-cny-ramadhan-2026-2',
      title: 'CNY & Ramadhan Celebration (Part 2)',
      displayDate: '25 Februari 2026',
      date: '2026-02-25',
      folder: 'videosMomenSeru',
      filename: 'CNY Ramadhan 25 Feb 26(2).mp4',
      caption: 'Tetapi ini akan tetap menjadi momen manis yang bisa kamu kenang kapan saja',
    },
    {
      id: 'v-bukber-2026',
      title: 'Buka Bersama Ramadhan 1447 H',
      displayDate: '12 Maret 2026',
      date: '2026-03-12',
      folder: 'videosMomenSeru',
      filename: 'BUKBER 12 MAR 26.mp4',
      caption: 'Walapun ini video AI, semoga feel kehangatannya tetap kamu rasa y Fit',
    },
    {
      id: 'v-idul-fitri-2026',
      title: 'Idul Fitri 1447 H',
      displayDate: 'Maret 2026',
      date: '2026-03-20',
      folder: 'videosMomenSeru',
      filename: 'IDUL FITRI 1447 H MARET 26.mp4',
      caption: 'Last vlog Ramadhan terakhir di Alpro, tandem bersama bestie Ralin',
    },
    {
      id: 'v-suwahyu-2026',
      title: 'Bersama Wahyu',
      displayDate: '11 Juni 2026',
      date: '2026-06-11',
      folder: 'videosMomenSeru',
      filename: 'SUWAHYU 11 JUNI 26.mp4',
      caption: 'Birthday nya Wahyu, maaf ya tidak ketemu moment video ataupun foto birthday mu di Alpro 2 tahun terakhir ini (2024 belated di Desember, 2025 belated bebrapa hari karena kamu tidak di HQ dan dirayakan oleh genk mu di Kedai 47',
    },
    {
      id: 'v-morning-sharing-game-2026-1',
      title: 'Morning Sharing Game 12 Juni (Part 1)',
      displayDate: '12 Juni 2026',
      date: '2026-06-12',
      folder: 'videosMomenSeru',
      filename: 'Morning Sharing Game 12 Jun 26 (1).mp4',
      caption: 'Mungkin game seru-seru terakhir yang kamu ikuti bersama. Pastikan tonton pakai wifi, karena size video ini besar banget. Habis kuotamu nanti',
    },
    {
      id: 'v-morning-sharing-game-2026-2',
      title: 'Morning Sharing Game 12 Juni (Part 2)',
      displayDate: '12 Juni 2026',
      date: '2026-06-12',
      folder: 'videosMomenSeru',
      filename: 'Morning Sharing Game 12 Jun 26 (2).mp4',
      caption: 'Kamu memang selalu All Out di semua kondisi y, selalu seru kalau ada kamu. Disclaimer tonton pakai wifi masih berlaku y, sumpah ini file nya hampir 1GB',
    },
    {
      id: 'v-morning-sharing-game-2026-3',
      title: 'Morning Sharing Game 12 Juni (Part 3)',
      displayDate: '12 Juni 2026',
      date: '2026-06-12',
      folder: 'videosMomenSeru',
      filename: 'Morning Sharing Game 12 Jun 26 (3).mp4',
      caption: 'Dan sekali lagi, semua memang menjadi seru kalau ada kamu Fit, tq y sudah memberi warna di Alpro.',
    },
  ],

  training: [
    {
      id: 'v-training-jerawat',
      title: 'Academy: Wellness Package — MK Jerawat',
      displayDate: 'Training Alpro',
      date: '2025-01-01',
      folder: 'videosTraining',
      filename: '257. ACADEMY - MK - WELLNESS PACKAGE -  MK JERAWAT.mp4',
      caption: 'Legacy baik yang kamu tinggalkan di video Academy',
    },
    {
      id: 'v-training-diabemed',
      title: 'Procurement: Health Supplement — Diabemed',
      displayDate: 'Training Alpro',
      date: '2025-01-02',
      folder: 'videosTraining',
      filename: '26.  PROCUREMENT - FCS - HEALTH SUPPLEMENT - DIABEMED.mp4',
      caption: 'Legacy baik yang kamu tinggalkan di video Academy',
    },
    {
      id: 'v-training-apd',
      title: 'Procurement: Health Supplement — APD',
      displayDate: 'Training Alpro',
      date: '2025-01-03',
      folder: 'videosTraining',
      filename: '31. PROCUREMENT - FCS - HEALTH SUPPLEMENT - APD.mp4',
      caption: 'Legacy baik yang kamu tinggalkan di video Academy',
    },
    {
      id: 'v-training-flimty',
      title: 'Procurement: Health Supplement — Flimty',
      displayDate: 'Training Alpro',
      date: '2025-01-04',
      folder: 'videosTraining',
      filename: '32. PROCUREMENT - FCS - HEALTH SUPPLEMENT - FLIMTY.mp4',
      caption: 'Legacy baik yang kamu tinggalkan di video Academy',
    },
    {
      id: 'v-training-coolvita',
      title: 'New Product: Health Supplement — Cool Vita Slimkeep',
      displayDate: 'Training Alpro',
      date: '2025-01-05',
      folder: 'videosTraining',
      filename: '40. PROCUREMENT - NEW PRODUCT - HEALTH SUPPLEMENT - COOL VITA SLIMKEEP.mp4',
      caption: 'Legacy baik yang kamu tinggalkan di video Academy',
    },
  ]
};

// ═══════════════════════════════════════════════════════════
//  PESAN & KESAN
//  Isi hari ke-2 setelah mendapatkan pesan dari rekan-rekan
// ═══════════════════════════════════════════════════════════

const MESSAGES = [
  // Format:
  // {
  //   name: 'Nama Pengirim',
  //   role: 'Jabatan / Keterangan',
  //   message: 'Teks pesan di sini...',
  //   emoji: '🌸', // opsional, emoji untuk dekorasi kartu
  // },

  {
    name: 'Hendri',
    role: 'OSS',
    message: 'Safitri, semua yang kamu buat selama 2,5 tahun ini tidak sia-sia. \n\n Kamu sudah membawa legacy baik, selesai dengan apresiasi tinggi. \n\n Good luck dan happy-happy di luar sana ya, Fit',
    emoji: '💛',
  },
  {
    name: 'Jessica Melati',
    role: 'Finance',
    message: 'Happy resign day Kak Saf!! \n Terima kasih atas kontribusi kakak untuk Alpro, semoga semakin sukses dan selalu happy ya❤️',
    emoji: '🌸',
  },
  {
    name: 'Takat Bayu',
    role: 'Finance',
    message: 'Tetap tangguh, tabah, berdoa, dan bersyukur untuk kedepannya',
    emoji: '🧑🏽',
  },
  {
    name: 'Shanda',
    role: 'Finance',
    message: 'Huhu :( \n Met resign Ka Saf! \n\n Makasih ya udah bikin Alpro ini berwarna ea... \n Sukses terus semoga cepet dapat jodoh lot ❤️❤️',
    emoji: '🧕🏻',
  },
  {
    name: 'Esti',
    role: 'Finance',
    message: 'Bab di sini selesai, \n Semoga bab berikutnya lebih seru. \n\n Happy Resign Saf😊',
    emoji: '🌝',
  },
  {
    name: 'Caroline Viona',
    role: 'Finance',
    message: 'Congratulation Ka Saf😊 \n Segala jerih payah dan usahamu sangat berarti \n Really proud of you, good luck❤️',
    emoji: '💃',
  },
  {
    name: 'Desi Annastasia',
    role: 'Your Partner in OSS',
    message: 'Selamat menyelesaikan pengalaman 2 tahun di perusahaan ini :) \n Terima kasih untuk semua kerja keras, bantuan, dan kebersamaan yang telah diberikan. \n Semoga babak baru yang akan dijalani membawa lebih banyak kesempatan, kebahagiaan, dan kesuksesan. \n Sampai bertemu lagi di puncak kesuksesan ! :)',
    emoji: '🎶',
  },
  {
    name: 'Dahlia',
    role: 'Your Partner in OSS',
    message: 'Beberapa pertemuan memang tidak selamanya bersama, tetapi kenangan akan tetap ada. \n\n Happy Resign Saf. Terima kasih sudah menjadi teman dan partner kerja yang luar biasa😊 \n\n Semoga hal baik menyertaimu',
    emoji: '🥰',
  },
  {
    name: 'Ria',
    role: 'Academy',
    message: 'Angelita... \n Nggak nyangka bakal sampai di moment bilang "see u" gini. \n Masih ingat waktu awal-awal masuk Alpro, Angel adalah salah satu orang yang selalu aku repotin. Mulai dari jadi talent Video ALH, persediaan barang, dan hal lainnya. \n Dan entah gimana, Angel selalu gercep banget bantuinnya. \n\n Angel geulis... Jaga diri baik-baik ya. \n Please selalu bikin orang nyaman di sekitar mu. \n Sukses terus, dapat jodoh, jadi CEO in another way❤️',
    emoji: '🧕',
  },
  {
    name: 'Maryani Sunarti',
    role: 'Busdev',
    message: 'Selamat atas kelulusannya😇 \n Semoga sukses selalu dimanapun berada \n Dan pesanku, jadilah Dirimu sendiri, tetap Bahagia \n Dan Explore semua yang kamu sukai, jangan malu \n Serta tetap berkarya. \n\n Good luck Bestie🌺',
    emoji: '🐣',
  },
  {
    name: 'Isti Mukaromah',
    role: 'OSS',
    message: 'Kakak Cantiq, sukses selalu dimanapun kau berada nanti. \n Tetep HAPPY dan jangan sampe jadi abu-abu lagi yaa, haha. \n Jangan terlalu memaksakan diri kalo udah capek.\n Makasih yaa udah ngajarin banyak hal sejak aku join di HO. \n Lop yu & see you on top Chief!😆',
    emoji: '🐑',
  },
  {
    name: 'Sekar Kinasih',
    role: 'BPT',
    message: "Kak, aku sedih banget kamu udah gak disini... \n Tapi aku sangat amat bahagia liat Spark✨ kamu balik lagi. \n Eventho aku selalu nyebelin sama kamu tapi u are always be my Sister! \n I'll always cherish u wherever u are! \n\n Bahagia terus ya kak. Jangan sampai Spark✨ kamu ilang lagi, or even orang lain ngambil Spark✨ kamu! \n love u kak❤️",
    emoji: '💋',
  },
  {
    name: 'Rahma Agustina Aliana (RALIN)',
    role: 'BPT',
    message: '"Safitri, Angela, Cong" Haha selamat lulus ya!!! \n\n Jujur sedih banget, tapi aku ikut senang karena kamu berani mengambil kesempatan baru untuk berkembang. \n\n Thank you for being such a good friend & colleague. \n Good luck for your next chapter! \n Semoga makin sukses,happy & achieve everything you aim for. \n\n Already Miss You!!❤️',
    emoji: '🏃🏻‍♀️',
  },
  {
    name: 'Ginting Eka Prasetyo',
    role: 'OSS',
    message: 'Selamat menyelesaikan perjalanan disini kak, dimanapun berada sukses selalu.',
    emoji: '👓',
  },
  {
    name: 'Aulia Wiracandra',
    role: 'OSS',
    message: 'Kak Saf, selamat lulus dari sini. \n Terima kasih sudah menjadi bagian dari OSS juga. Kerja bareng Kak Saf menyenangkan. \n Terima kasih kebersamaan atas apa yang telah dibangun. \n\n Good luck for your next journey.',
    emoji: '👽',
  },
  {
    name: 'Bram',
    role: 'Teknisi',
    message: 'Hai Mbak Angel. Tetap full smile ya.Always positive thinking. \n Tetap jaga komunikasi dan kalau ada waktu sempat-sempat nongkrong bareng ya. \n Sukses selalu. Thx',
    emoji: '👨‍🔧',
  },
  {
    name: 'Suwahyu',
    role: 'Ops, your babe',
    message: 'Aku menyadari beberapa waktu terakhir, kamu lebih banyak diem sama aku. \n Tapi aku diem juga. \n\n Bukan karena aku tak peduli, melainkan aku memberikan ruang untuk kamu. \n sekuat tenaga aku sudah coba ajak kamu untuk bertahan, tapi.., ternyata tekadmu lebih kuat dari itu. \n\n Kapanpun ruang dan waktumu ada, kita bisa jumpa di "Gammy Coffee", dan kita bisa bercerita lebih lepas😊❤️',
    emoji: '☕',
  },
  {
    name: 'Lusia',
    role: 'Sahabat sehidup semati',
    message: 'Darling, waktu memang cepat berlalu. \n Jujur kaget banget nggak nyangka. \n Terlepas dari apapun yang membuat kamu mengambil keputusan ini, saya yakin dan percaya bahwa kamu sudah pertimbangkan baik-baik. \n\n Sesuai janji kita bersama, kita akan terbang🛫 di 2027. \n\n Tetap jaga silaturahmi di antara kita. \n Sukses dimanapun kamu berada. \n Secara pribadi kami pasti merindukanmu selalu. \n Darling, sukses dan tetap bahagia.',
    emoji: '👩🏻‍❤️‍👩🏼',
  },
  {
    name: 'Hendri',
    role: 'Your mentor, partner, and hopefully one of your close friend',
    message: 'Tidak akan cukup kata untuk menggambarkan istimewanya kamu. \n Tidak cukup ungkapan dari kami untuk membagikan perasaan kami tentang apa yang sudah kamu sentuh dari diri kami masing-masing. \n\n Tetapi ketahuilah Fit, kamu orang yang spesial, dan seperti lagu tema dari Album ini, \n "Perpisahan yang harus terjadi, terjadilah..." \n Karena tidak ada penyesalan untuk semua hal baik dan indah yang sudah kamu buat.',
    emoji: '💛',
  },
];
