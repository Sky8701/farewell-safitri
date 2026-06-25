/* ============================================================
   app.js — Web Album Safitri Lailasari
   Apotek Alpro · Keluarga Besar
   ============================================================ */

'use strict';

// ════════════════════════════════════════
//  DRIVE API MODULE
// ════════════════════════════════════════
const DriveAPI = {
  // filename.toLowerCase() → { id, name }
  cache: {},
  isReady: false,
  hasConfig: false,

  /** Fetch all files from a Drive folder */
  async loadFolder(folderId, key) {
    if (!folderId) return {};
    const url =
      `https://www.googleapis.com/drive/v3/files` +
      `?q=%27${folderId}%27+in+parents+and+trashed%3Dfalse` +
      `&fields=files(id%2Cname%2CmimeType%2CthumbnailLink)` +
      `&pageSize=1000` +
      `&key=${CONFIG.apiKey}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const map = {};
      const thumbs = {};
      (data.files || []).forEach(f => {
        const nameLower = f.name.toLowerCase();
        map[nameLower] = f.id;
        if (f.thumbnailLink) {
          thumbs[f.id] = f.thumbnailLink;
        }
      });
      this.cache[key] = map;
      this.cache[key + '_thumbs'] = thumbs;
      return map;
    } catch (err) {
      console.warn(`[DriveAPI] Failed to load folder ${key}:`, err.message);
      this.cache[key] = {};
      this.cache[key + '_thumbs'] = {};
      return {};
    }
  },

  /** Get file ID by filename (case-insensitive) */
  getFileId(folderKey, filename) {
    const map = this.cache[folderKey] || {};
    return map[filename.toLowerCase()] || null;
  },

  /** Thumbnail URL (for quick preview) */
  thumbUrl(fileId, size = 'w400') {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=${size}`;
  },

  /** Full-size view URL (images only) */
  viewUrl(fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  },

  /** Audio/video stream URL via Drive API */
  audioStreamUrl(fileId) {
    // Drive API alt=media returns the actual file bytes — works for MP3/audio
    return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${CONFIG.apiKey}`;
  },

  /** Download URL */
  downloadUrl(fileId) {
    return `https://drive.google.com/uc?id=${fileId}&export=download`;
  },

  /** Video embed URL */
  videoEmbedUrl(fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  },

  /** Get video thumbnail URL by file ID */
  getVideoThumbnail(folderKey, fileId) {
    const thumbMap = this.cache[folderKey + '_thumbs'] || {};
    const originalLink = thumbMap[fileId] || null;
    if (!originalLink) return null;
    // Upgrade resolution from =s220 to =s600
    return originalLink.replace(/=s\d+$/, '=s600');
  },

  /** Load all folders in parallel */
  async loadAll() {
    const ids = CONFIG.folderIds;
    if (!CONFIG.apiKey || CONFIG.apiKey.trim() === '') {
      console.info('[DriveAPI] No API key configured — running in demo mode');
      return;
    }
    this.hasConfig = true;
    const tasks = Object.entries(ids)
      .filter(([, id]) => id && id.trim() !== '')
      .map(([key, id]) => this.loadFolder(id, key));
    await Promise.allSettled(tasks);
    this.isReady = true;
  }
};

// ════════════════════════════════════════
//  MUSIC PLAYER
// ════════════════════════════════════════
const MusicPlayer = {
  audio: null,
  isPlaying: false,
  isMuted: false,

  init() {
    const musicId = DriveAPI.getFileId('music', CONFIG.musicFilename);
    if (!musicId) {
      console.info('[Music] No music file ID found — player hidden');
      document.getElementById('music-player').style.opacity = '0.3';
      return;
    }

    // ✅ Use Drive API stream URL (not lh3 which is images-only)
    const streamUrl = DriveAPI.audioStreamUrl(musicId);
    this.audio = new Audio(streamUrl);
    this.audio.loop = true;
    this.audio.volume = 0.7;
    this.audio.preload = 'none'; // don't preload until user interacts

    this.audio.addEventListener('error', (e) => {
      console.warn('[Music] Audio error:', e);
    });

    this.audio.addEventListener('waiting', () => {
      document.getElementById('player-wave')?.classList.add('buffering');
    });
    this.audio.addEventListener('playing', () => {
      document.getElementById('player-wave')?.classList.remove('buffering');
    });
    this.audio.addEventListener('pause', () => {
      document.getElementById('player-wave')?.classList.remove('buffering');
    });

    // Auto-play on first user interaction (browser policy)
    const autoPlay = () => {
      this.play();
    };
    document.addEventListener('click', autoPlay, { once: true });
    document.addEventListener('touchstart', autoPlay, { once: true });

    // Bind buttons
    document.getElementById('btn-play-pause').addEventListener('click', (e) => {
      e.stopPropagation(); // prevent triggering autoPlay
      this.toggle();
    });
    document.getElementById('btn-mute').addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMute();
    });
    document.getElementById('btn-download-music').addEventListener('click', (e) => {
      e.stopPropagation();
      this.download();
    });

    document.getElementById('music-player').style.display = 'flex';
  },

  play() {
    if (!this.audio) return;
    this.audio.play().catch(() => {});
    this.isPlaying = true;
    this.updateUI();
  },

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.updateUI();
  },

  toggle() {
    this.isPlaying ? this.pause() : this.play();
  },

  toggleMute() {
    if (!this.audio) return;
    this.isMuted = !this.isMuted;
    this.audio.muted = this.isMuted;
    this.updateUI();
  },

  download() {
    const musicId = DriveAPI.getFileId('music', CONFIG.musicFilename);
    if (!musicId) return;
    const a = document.createElement('a');
    a.href = DriveAPI.downloadUrl(musicId);
    a.download = CONFIG.musicFilename;
    a.click();
  },

  updateUI() {
    const playIcon  = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const muteIcon  = document.getElementById('mute-icon');
    const waveEl    = document.getElementById('player-wave');

    if (playIcon && pauseIcon) {
      playIcon.style.display  = this.isPlaying ? 'none' : 'block';
      pauseIcon.style.display = this.isPlaying ? 'block' : 'none';
    }
    if (muteIcon) {
      muteIcon.textContent = this.isMuted ? '🔇' : '🔊';
    }
    if (waveEl) {
      waveEl.classList.toggle('paused', !this.isPlaying);
    }
  }
};

// ════════════════════════════════════════
//  PARTICLES SYSTEM
// ════════════════════════════════════════
const Particles = {
  canvas: null,
  ctx: null,
  particles: [],
  animId: null,

  init(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.createParticles();
    this.animate();
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });
  },

  resize() {
    const c = this.canvas;
    c.width  = c.offsetWidth;
    c.height = c.offsetHeight;
  },

  createParticles() {
    this.particles = [];
    const count = Math.floor((this.canvas.width * this.canvas.height) / 12000);
    for (let i = 0; i < Math.min(count, 60); i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        opacity: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.5 ? '#C9A84C' : '#E8C97A',
      });
    }
  },

  animate() {
    this.animId = requestAnimationFrame(() => this.animate());
    const { ctx, canvas, particles } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  }
};

// Confetti for closing section
const Confetti = {
  canvas: null,
  ctx: null,
  pieces: [],
  running: false,

  init(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  },

  resize() {
    this.canvas.width  = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  },

  burst() {
    const colors = ['#C9A84C','#E8C97A','#FFF5CC','#8B2252','#FDF6EC'];
    for (let i = 0; i < 80; i++) {
      this.pieces.push({
        x: Math.random() * this.canvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 1,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
        opacity: 1,
      });
    }
    if (!this.running) this.animate();
  },

  animate() {
    if (this.pieces.length === 0) { this.running = false; return; }
    this.running = true;
    requestAnimationFrame(() => this.animate());
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.pieces = this.pieces.filter(p => p.opacity > 0.01);
    this.pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.vy += 0.05; // gravity
      if (p.y > canvas.height * 0.7) p.opacity -= 0.02;
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });
  }
};

// ════════════════════════════════════════
//  HERO SECTION — Multi-cover slideshow
// ════════════════════════════════════════
const HeroSlideshow = {
  slides: [],
  current: 0,
  timer: null,
  INTERVAL: 3000, // ms between slides

  /** Build slides from resolved file IDs */
  init(fileIds) {
    const container = document.getElementById('hero-cover');
    if (!container || fileIds.length === 0) return;

    // Remove placeholder fallback once we have real photos
    const fallback = container.querySelector('.hero-cover-fallback');

    this.slides = fileIds.map((id, idx) => {
      const div = document.createElement('div');
      div.className = `hero-cover-slide${idx === 0 ? ' active' : ''}`;

      const img = document.createElement('img');
      img.alt = `Cover foto ${idx + 1}`;
      // Use w2048 thumbnail for high-res but fast loading
      img.src = DriveAPI.thumbUrl(id, 'w2048');
      img.loading = idx === 0 ? 'eager' : 'lazy';

      img.onerror = () => {
        // Fallback: try full viewUrl if thumbnail fails
        if (!img.dataset.retried) {
          img.dataset.retried = '1';
          img.src = DriveAPI.viewUrl(id);
        }
      };

      div.appendChild(img);
      container.appendChild(div);
      return div;
    });

    // Hide fallback gradient once first image loads
    if (this.slides[0]) {
      const firstImg = this.slides[0].querySelector('img');
      firstImg.addEventListener('load', () => {
        if (fallback) fallback.style.opacity = '0';
      });
    }

    if (this.slides.length > 1) this.startTimer();
  },

  goTo(idx) {
    this.slides[this.current]?.classList.remove('active');
    this.current = (idx + this.slides.length) % this.slides.length;
    this.slides[this.current]?.classList.add('active');
  },

  next() { this.goTo(this.current + 1); },

  startTimer() {
    this.timer = setInterval(() => this.next(), this.INTERVAL);
  },

  stopTimer() {
    clearInterval(this.timer);
  }
};

function initHero() {
  // Support both old single string and new array format (backwards-compatible)
  const rawFilenames = CONFIG.heroCoverFilenames
    || (CONFIG.heroCoverFilename ? [CONFIG.heroCoverFilename] : []);

  // Resolve filenames → Drive file IDs
  const fileIds = rawFilenames
    .map(fname => DriveAPI.getFileId('imagesCover', fname))
    .filter(Boolean);

  if (fileIds.length > 0) {
    HeroSlideshow.init(fileIds);
  } else {
    console.info('[Hero] No cover photos resolved — showing fallback gradient');
  }

  // Load logo for piagam
  const logoId = DriveAPI.getFileId('sertifikat', CONFIG.certificate.logoFilename);
  if (logoId) {
    document.querySelectorAll('.piagam-logo').forEach(el => {
      el.src = DriveAPI.viewUrl(logoId);
      el.style.display = 'block';
    });
    document.querySelectorAll('.piagam-logo-placeholder').forEach(el => {
      el.style.display = 'none';
    });
  }
}

// ════════════════════════════════════════
//  PIAGAM SECTION
// ════════════════════════════════════════
function initPiagam() {
  const cert = CONFIG.certificate;

  // Fill dynamic content
  setText('piagam-name-text', cert.name);
  setText('piagam-company-text', cert.company);
  setText('piagam-period-text', cert.totalPeriod);

  // Roles
  const rolesEl = document.getElementById('piagam-roles-container');
  if (rolesEl && cert.roles) {
    rolesEl.innerHTML = cert.roles.map(r => `
      <div class="piagam-role">
        <div class="piagam-role-title">${r.title}</div>
        <div class="piagam-role-period">${r.period}</div>
      </div>
    `).join('');
  }

  // Contributions (13 points)
  const contribEl = document.getElementById('piagam-contributions-container');
  if (contribEl && cert.contributions) {
    contribEl.innerHTML = cert.contributions.map((text, idx) => {
      const formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
      return `
        <div class="piagam-contribution-item">
          <span class="piagam-contribution-number">${idx + 1}</span>
          <span class="piagam-contribution-text">${formattedText}</span>
        </div>
      `;
    }).join('');
  }

  // Toggle Mode (Lengkap / Ringkas)
  const toggleBtn = document.getElementById('btn-toggle-piagam');
  const certCard = document.getElementById('piagam-certificate');
  if (toggleBtn && certCard) {
    toggleBtn.addEventListener('click', () => {
      const isCompact = certCard.classList.toggle('compact-mode');
      toggleBtn.textContent = isCompact ? '📋 Versi Lengkap' : '📋 Versi Ringkas';
    });
  }

  // Download as image (using html2canvas-like approach)
  document.getElementById('btn-download-piagam')?.addEventListener('click', () => {
    window.print();
  });
  document.getElementById('btn-print-piagam')?.addEventListener('click', () => {
    window.print();
  });
}

// ════════════════════════════════════════
//  PHOTO ALBUM
// ════════════════════════════════════════
const PhotoAlbum = {
  activeYear: 2024,
  lightboxEvent: null,
  lightboxIndex: 0,
  slideshowTimers: {},

  init() {
    this.renderYearTabs();
    this.renderEvents(this.activeYear);
    this.initLightbox();
  },

  renderYearTabs() {
    const years = [2024, 2025, 2026];
    const container = document.getElementById('year-tabs');
    if (!container) return;

    container.innerHTML = years.map(y => `
      <button class="year-tab ${y === this.activeYear ? 'active' : ''}"
              onclick="PhotoAlbum.switchYear(${y})"
              aria-label="Tahun ${y}">
        ${y}
        <small style="display:block;font-size:0.6em;opacity:0.7;margin-top:2px;">
          ${PHOTO_EVENTS.filter(e => e.year === y).length} momen
        </small>
      </button>
    `).join('');
  },

  switchYear(year) {
    this.activeYear = year;
    // Update tab styles
    document.querySelectorAll('.year-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.year-tab')[
      [2024,2025,2026].indexOf(year)
    ]?.classList.add('active');

    this.renderEvents(year);
  },

  renderEvents(year) {
    const container = document.getElementById('events-container');
    if (!container) return;

    const events = PHOTO_EVENTS.filter(e => e.year === year);
    if (events.length === 0) {
      container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px">Belum ada data untuk tahun ini.</p>';
      return;
    }

    container.innerHTML = events.map((ev, idx) => this.renderEventBlock(ev, idx)).join('');

    // Load thumbnails lazily
    this.loadEventThumbnails(events);

    // Trigger scroll animations
    observeElements('.event-block');
  },

  renderEventBlock(ev, idx) {
    const photoCount = ev.photos.length;
    return `
      <div class="event-block" id="event-${ev.id}" data-event-id="${ev.id}">
        <div class="event-header">
          <div>
            <div class="event-date">${ev.displayDate}</div>
            <h3 class="event-title">${ev.title}</h3>
            ${ev.caption ? `<p class="event-caption">"${ev.caption}"</p>` : ''}
          </div>
          <div class="event-actions">
            <button class="btn-event-action" onclick="PhotoAlbum.toggleSlideshow('${ev.id}')" id="ss-btn-${ev.id}">
              ▶ Slideshow
            </button>
            <button class="btn-event-action" onclick="PhotoAlbum.openLightbox('${ev.id}', 0)">
              ⛶ Fullscreen
            </button>
          </div>
        </div>

        <!-- Grid Mode -->
        <div class="photo-grid" id="grid-${ev.id}">
          ${ev.photos.map((fname, pIdx) => `
            <div class="photo-item" onclick="PhotoAlbum.openLightbox('${ev.id}', ${pIdx})">
              <img
                class="lazy-img"
                data-folder="${ev.folder}"
                data-filename="${fname}"
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'/%3E"
                alt="${ev.title} — foto ${pIdx + 1}"
                loading="lazy"
              />
              <div class="photo-overlay">
                <span class="photo-overlay-icon">⛶</span>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Slideshow Mode -->
        <div class="event-slideshow" id="ss-${ev.id}">
          <div class="slideshow-main">
            <img id="ss-img-${ev.id}" src="" alt="" style="object-fit:contain;width:100%;height:100%;background:var(--dark-elevated)" />
            <div class="slideshow-nav">
              <button class="slideshow-btn" onclick="PhotoAlbum.ssPrev('${ev.id}')">‹</button>
              <button class="slideshow-btn" onclick="PhotoAlbum.ssNext('${ev.id}')">›</button>
            </div>
            <div class="slideshow-counter" id="ss-counter-${ev.id}">1 / ${photoCount}</div>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;gap:12px;flex-wrap:wrap;">
            <div class="slideshow-dots" id="ss-dots-${ev.id}">
              ${ev.photos.slice(0, Math.min(photoCount, 20)).map((_, i) =>
                `<span class="slideshow-dot ${i === 0 ? 'active' : ''}" onclick="PhotoAlbum.ssGoto('${ev.id}',${i})"></span>`
              ).join('')}
            </div>
            <div style="display:flex;gap:8px;">
              <button class="btn-event-action" onclick="PhotoAlbum.ssDownload('${ev.id}')">⬇ Download</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  loadEventThumbnails(events) {
    // Use IntersectionObserver for lazy loading
    const imgs = document.querySelectorAll('img.lazy-img');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        const folder = img.dataset.folder;
        const filename = img.dataset.filename;
        const fileId = DriveAPI.getFileId(folder, filename);

        if (fileId) {
          img.src = DriveAPI.thumbUrl(fileId, 'w400');
          img.onerror = () => {
            img.parentElement.innerHTML = `<div class="photo-placeholder">
              <span class="photo-placeholder-icon">🖼</span>
              <span>${filename.split(' (')[0]}</span>
            </div>`;
          };
        } else {
          // Show placeholder when no Drive ID
          img.parentElement.innerHTML = `<div class="photo-placeholder">
            <span class="photo-placeholder-icon">🖼</span>
            <span style="font-size:0.6rem;opacity:0.6">${filename.substring(0, 20)}...</span>
          </div>`;
        }
        obs.unobserve(img);
      });
    }, { rootMargin: '200px' });

    imgs.forEach(img => obs.observe(img));
  },

  // Slideshow state per event
  ssState: {},

  toggleSlideshow(eventId) {
    const gridEl = document.getElementById(`grid-${eventId}`);
    const ssEl   = document.getElementById(`ss-${eventId}`);
    const btn    = document.getElementById(`ss-btn-${eventId}`);
    if (!ssEl || !gridEl) return;

    const isActive = ssEl.classList.toggle('active');
    gridEl.style.display = isActive ? 'none' : 'grid';
    btn.classList.toggle('active', isActive);
    btn.textContent = isActive ? '⏹ Grid' : '▶ Slideshow';

    if (isActive) {
      if (!this.ssState[eventId]) this.ssState[eventId] = { index: 0 };
      this.ssRender(eventId);
      this.ssStartTimer(eventId);
    } else {
      this.ssStopTimer(eventId);
    }
  },

  ssRender(eventId) {
    const ev = PHOTO_EVENTS.find(e => e.id === eventId);
    if (!ev) return;
    const state = this.ssState[eventId];
    const idx = state.index;
    const img = document.getElementById(`ss-img-${eventId}`);
    const counter = document.getElementById(`ss-counter-${eventId}`);
    const dots = document.querySelectorAll(`#ss-dots-${eventId} .slideshow-dot`);

    const fileId = DriveAPI.getFileId(ev.folder, ev.photos[idx]);
    if (img) {
      img.src = fileId ? DriveAPI.thumbUrl(fileId, 'w1200') : '';
      img.alt = `${ev.title} — ${idx + 1}`;
    }
    if (counter) counter.textContent = `${idx + 1} / ${ev.photos.length}`;
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  },

  ssNext(eventId) {
    const ev = PHOTO_EVENTS.find(e => e.id === eventId);
    if (!ev) return;
    this.ssState[eventId].index = (this.ssState[eventId].index + 1) % ev.photos.length;
    this.ssRender(eventId);
    this.ssResetTimer(eventId);
  },

  ssPrev(eventId) {
    const ev = PHOTO_EVENTS.find(e => e.id === eventId);
    if (!ev) return;
    this.ssState[eventId].index = (this.ssState[eventId].index - 1 + ev.photos.length) % ev.photos.length;
    this.ssRender(eventId);
    this.ssResetTimer(eventId);
  },

  ssGoto(eventId, idx) {
    this.ssState[eventId].index = idx;
    this.ssRender(eventId);
    this.ssResetTimer(eventId);
  },

  ssStartTimer(eventId) {
    this.slideshowTimers[eventId] = setInterval(() => this.ssNext(eventId), 4000);
  },

  ssStopTimer(eventId) {
    clearInterval(this.slideshowTimers[eventId]);
  },

  ssResetTimer(eventId) {
    this.ssStopTimer(eventId);
    this.ssStartTimer(eventId);
  },

  ssDownload(eventId) {
    const ev = PHOTO_EVENTS.find(e => e.id === eventId);
    if (!ev) return;
    const idx = this.ssState[eventId]?.index ?? 0;
    const fileId = DriveAPI.getFileId(ev.folder, ev.photos[idx]);
    if (fileId) {
      const a = document.createElement('a');
      a.href = DriveAPI.downloadUrl(fileId);
      a.download = ev.photos[idx];
      a.click();
    }
  },

  // Lightbox
  initLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.addEventListener('click', e => {
      if (e.target === lb) this.closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'ArrowRight') this.lbNext();
      if (e.key === 'ArrowLeft')  this.lbPrev();
      if (e.key === 'Escape')     this.closeLightbox();
    });
  },

  openLightbox(eventId, photoIndex) {
    const ev = PHOTO_EVENTS.find(e => e.id === eventId);
    if (!ev) return;
    this.lightboxEvent = ev;
    this.lightboxIndex = photoIndex;
    this.renderLightbox();
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  },

  renderLightbox() {
    const ev  = this.lightboxEvent;
    const idx = this.lightboxIndex;
    const fileId = DriveAPI.getFileId(ev.folder, ev.photos[idx]);
    const imgEl = document.getElementById('lb-img');
    const countEl = document.getElementById('lb-counter');
    const capEl = document.getElementById('lb-caption');

    if (imgEl) imgEl.src = fileId ? DriveAPI.thumbUrl(fileId, 'w2048') : '';
    if (countEl) countEl.textContent = `${idx + 1} / ${ev.photos.length}`;
    if (capEl) capEl.textContent = ev.caption || '';

    // Download button
    const dlBtn = document.getElementById('lb-download');
    if (dlBtn) dlBtn.onclick = () => {
      if (fileId) {
        const a = document.createElement('a');
        a.href = DriveAPI.downloadUrl(fileId);
        a.download = ev.photos[idx];
        a.click();
      }
    };
  },

  lbNext() {
    const ev = this.lightboxEvent;
    if (!ev) return;
    this.lightboxIndex = (this.lightboxIndex + 1) % ev.photos.length;
    this.renderLightbox();
  },

  lbPrev() {
    const ev = this.lightboxEvent;
    if (!ev) return;
    this.lightboxIndex = (this.lightboxIndex - 1 + ev.photos.length) % ev.photos.length;
    this.renderLightbox();
  }
};

// ════════════════════════════════════════
//  VIDEO ALBUM
// ════════════════════════════════════════
const VideoAlbum = {
  activeTab: 'momenSeru',

  init() {
    this.renderTabs();
    this.renderVideos(this.activeTab);
    this.initModal();
  },

  renderTabs() {
    const tabs = [
      { key: 'momenSeru', label: '🎬 Momen Seru' },
      { key: 'training',  label: '📚 Training Academy' },
    ];
    const container = document.getElementById('video-tabs');
    if (!container) return;
    container.innerHTML = tabs.map(t => `
      <button class="video-tab ${t.key === this.activeTab ? 'active' : ''}"
              onclick="VideoAlbum.switchTab('${t.key}')">
        ${t.label}
      </button>
    `).join('');
  },

  switchTab(tab) {
    this.activeTab = tab;
    document.querySelectorAll('.video-tab').forEach((t, i) => {
      t.classList.toggle('active', ['momenSeru','training'][i] === tab);
    });
    this.renderVideos(tab);
  },

  renderVideos(tab) {
    const container = document.getElementById('video-grid');
    if (!container) return;
    const videos = VIDEO_EVENTS[tab] || [];
    if (videos.length === 0) {
      container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px;grid-column:1/-1">Belum ada video.</p>';
      return;
    }
    container.innerHTML = videos.map(v => this.renderVideoCard(v)).join('');
    observeElements('.video-card');
  },

  renderVideoCard(v) {
    const fileId = DriveAPI.getFileId(v.folder, v.filename);
    const hasFile = !!fileId;
    const thumbUrl = fileId ? DriveAPI.getVideoThumbnail(v.folder, fileId) : null;

    let thumbContent = `
      <div class="video-thumb-fallback">
        🎬
      </div>
    `;

    if (thumbUrl) {
      thumbContent = `
        <img class="video-thumb-img" src="${thumbUrl}" alt="${v.title}" loading="lazy" />
        <div class="video-thumb-overlay"></div>
      `;
    }

    return `
      <div class="video-card ${hasFile ? '' : 'opacity-50'}"
           onclick="VideoAlbum.openVideo('${v.id}')"
           data-video-id="${v.id}"
           style="${hasFile ? '' : 'cursor:default;opacity:0.5'}">
        <div class="video-thumb">
          ${thumbContent}
          <div class="video-play-btn">
            <div class="video-play-circle">▶</div>
          </div>
        </div>
        <div class="video-card-body">
          <div class="video-card-date">${v.displayDate}</div>
          <h4 class="video-card-title">${v.title}</h4>
          ${v.caption ? `<p class="video-card-caption">${v.caption}</p>` : ''}
          ${!hasFile ? `<p style="font-size:0.7rem;color:var(--text-muted);margin-top:8px">⚠ Belum dikonfigurasi</p>` : ''}
        </div>
      </div>
    `;
  },

  initModal() {
    const modal = document.getElementById('video-modal');
    if (!modal) return;
    modal.addEventListener('click', e => {
      if (e.target === modal) this.closeModal();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.closeModal();
    });
  },

  openVideo(videoId) {
    const all = [...VIDEO_EVENTS.momenSeru, ...VIDEO_EVENTS.training];
    const v = all.find(v => v.id === videoId);
    if (!v) return;
    const fileId = DriveAPI.getFileId(v.folder, v.filename);
    if (!fileId) { alert('Video belum dikonfigurasi. Isi folder ID di config.js'); return; }

    const modal = document.getElementById('video-modal');
    const titleEl = document.getElementById('vm-title');
    const frameEl = document.getElementById('vm-frame');
    const capEl   = document.getElementById('vm-caption');

    if (titleEl) titleEl.textContent = v.title;
    if (frameEl) frameEl.innerHTML = `<iframe src="${DriveAPI.videoEmbedUrl(fileId)}" allowfullscreen allow="autoplay"></iframe>`;
    if (capEl)   capEl.textContent = v.caption || '';

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeModal() {
    const modal = document.getElementById('video-modal');
    modal.classList.remove('open');
    const frameEl = document.getElementById('vm-frame');
    if (frameEl) frameEl.innerHTML = ''; // Stop video
    document.body.style.overflow = '';
  }
};

// ════════════════════════════════════════
//  MESSAGES
// ════════════════════════════════════════
function initMessages() {
  const container = document.getElementById('messages-grid');
  if (!container) return;

  if (!MESSAGES || MESSAGES.length === 0) {
    container.innerHTML = `
      <div class="messages-empty" style="grid-column:1/-1">
        <div class="messages-empty-icon">💌</div>
        <div class="messages-empty-text">
          Pesan & kesan akan segera hadir.<br>
          <span style="font-size:0.75rem;opacity:0.7">Isi file data.js pada bagian MESSAGES</span>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = MESSAGES.map((m, i) => `
    <div class="message-card" style="transition-delay: ${i * 0.1}s">
      ${m.emoji ? `<div class="message-emoji">${m.emoji}</div>` : ''}
      <p class="message-text">${m.message.replace(/\n/g, '<br>')}</p>
      <div class="message-sender">
        <div class="message-avatar">${m.name.charAt(0)}</div>
        <div>
          <div class="message-sender-name">${m.name}</div>
          ${m.role ? `<div class="message-sender-role">${m.role}</div>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  observeElements('.message-card');
}

// ════════════════════════════════════════
//  NAVIGATION
// ════════════════════════════════════════
function initNavigation() {
  const nav = document.getElementById('main-nav');
  const hamburger = document.getElementById('nav-hamburger');
  const drawer = document.getElementById('nav-drawer');

  // Scroll behavior
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 80);
        updateActiveNavLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Hamburger
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    drawer?.classList.toggle('open');
    document.body.style.overflow = drawer?.classList.contains('open') ? 'hidden' : '';
  });

  // Close drawer on nav click
  drawer?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

function updateActiveNavLink() {
  const sections = ['hero','piagam','album-foto','album-video','pesan-kesan','penutup'];
  let active = 'hero';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 100) active = id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href')?.replace('#', '');
    link.classList.toggle('active', href === active);
  });
}

// ════════════════════════════════════════
//  SCROLL ANIMATIONS
// ════════════════════════════════════════
function observeElements(selector) {
  const els = document.querySelectorAll(selector);
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

// ════════════════════════════════════════
//  SETUP OVERLAY
// ════════════════════════════════════════
function checkSetup() {
  const needsSetup = !CONFIG.apiKey || CONFIG.apiKey.trim() === '';
  if (needsSetup) {
    const overlay = document.getElementById('setup-overlay');
    if (overlay) overlay.classList.remove('hidden');
  }
}

function dismissSetup() {
  document.getElementById('setup-overlay')?.classList.add('hidden');
}

// ════════════════════════════════════════
//  UTILITIES
// ════════════════════════════════════════
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function showLoadingScreen() {
  document.getElementById('loading-screen')?.classList.remove('hidden');
}

function hideLoadingScreen() {
  setTimeout(() => {
    document.getElementById('loading-screen')?.classList.add('hidden');
  }, 500);
}

// Confetti trigger when user scrolls to penutup
function initConfetti() {
  const penutup = document.getElementById('penutup');
  if (!penutup) return;
  Confetti.init('penutup-canvas');
  let fired = false;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !fired) {
      fired = true;
      setTimeout(() => Confetti.burst(), 600);
      setTimeout(() => Confetti.burst(), 1800);
    }
  }, { threshold: 0.3 });
  obs.observe(penutup);
}

// ════════════════════════════════════════
//  MAIN APP INIT
// ════════════════════════════════════════
async function initApp() {
  showLoadingScreen();

  // Init particles (hero)
  Particles.init('hero-canvas');

  // Check setup
  checkSetup();

  // Load Drive data
  await DriveAPI.loadAll();

  // Init sections
  initHero();
  initPiagam();
  PhotoAlbum.init();
  VideoAlbum.init();
  initMessages();
  initNavigation();
  initConfetti();

  // Initial scroll animations
  observeElements('.fade-in-up');

  // Music player
  MusicPlayer.init();

  hideLoadingScreen();

  console.info(
    '%c🎀 Web Album Safitri Lailasari%c\nKeluarga Besar Apotek Alpro',
    'color:#C9A84C;font-size:16px;font-weight:bold',
    'color:#FDF6EC;font-size:12px'
  );
}

document.addEventListener('DOMContentLoaded', initApp);
