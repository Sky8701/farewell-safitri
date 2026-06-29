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

    this.isHeroVisible = true;
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      const observer = new IntersectionObserver(entries => {
        this.isHeroVisible = entries[0].isIntersecting;
        if (this.isHeroVisible) {
          if (!this.animId) this.animate();
        } else {
          if (this.animId) {
            cancelAnimationFrame(this.animId);
            this.animId = null;
          }
        }
      }, { threshold: 0.05 });
      observer.observe(heroSection);
    }

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
    if (!this.isHeroVisible) {
      this.animId = null;
      return;
    }
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
  INTERVAL: 4000, // ms between slides

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
//  POJOK MOTIVASI — QUOTE SECTION
// ════════════════════════════════════════
const QuoteSection = {
  quotes: typeof QUOTES !== 'undefined' ? QUOTES : [],
  currentIndex: null,
  favorites: [],
  isAnimating: false,

  // Particle system state
  particles: [],
  animFrame: null,
  canvas: null,
  ctx: null,

  // Photo pool from Drive (filled on init if available)
  photoPool: [],

  /** Initialize the section */
  init() {
    if (this.quotes.length === 0) {
      console.warn('[QuoteSection] QUOTES array is empty — quotes.js may not be loaded.');
      return;
    }

    // Load favorites from localStorage
    try {
      this.favorites = JSON.parse(localStorage.getItem('safitri_fav_quotes') || '[]');
    } catch (e) {
      this.favorites = [];
    }

    // Setup canvas particles
    this._initCanvas();

    // Build photo pool from cached Drive thumbnails
    this._buildPhotoPool();

    // Show first quote (no animation on init)
    this._showQuote(this._randomIndex(), false);

    // Update fav count badge
    this._updateFavCount();

    // Swipe support (mobile)
    this._initSwipe();
  },

  /** Pick a random index different from current */
  _randomIndex() {
    if (this.quotes.length <= 1) return 0;
    let idx;
    do { idx = Math.floor(Math.random() * this.quotes.length); }
    while (idx === this.currentIndex);
    return idx;
  },

  /** Show a specific quote, with optional flip animation */
  _showQuote(idx, animate = true) {
    const q = this.quotes[idx];
    if (!q) return;

    const card   = document.getElementById('quote-card');
    const doFlip = animate && card;

    if (doFlip) {
      if (this.isAnimating) return;
      this.isAnimating = true;

      // Trigger flip (front → back)
      card.classList.add('flipping');

      setTimeout(() => {
        // Midpoint: update content while card is hidden
        this._updateDOM(q, idx);
        this._updatePhotoBackground();
      }, 330);

      setTimeout(() => {
        // Flip back (back → front)
        card.classList.remove('flipping');
        setTimeout(() => { this.isAnimating = false; }, 350);
      }, 660);

    } else {
      this._updateDOM(q, idx);
      this._updatePhotoBackground();
    }

    this.currentIndex = idx;
  },

  /** Update DOM with quote data */
  _updateDOM(q, idx) {
    const setText    = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const setHTML    = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val; };
    const setAttr    = (id, attr, val) => { const el = document.getElementById(id); if (el) el.setAttribute(attr, val); };
    const setClass   = (id, cls, on) => { const el = document.getElementById(id); if (el) el.classList.toggle(cls, on); };

    setText('quote-category', q.category || '');
    setText('quote-author', '— ' + (q.author || 'Anonimus'));
    setText('quote-counter', `Quote #${idx + 1} dari ${this.quotes.length}`);

    // Quote text + language attribute
    const textEl = document.getElementById('quote-text');
    if (textEl) {
      textEl.textContent = q.text || '';
      textEl.setAttribute('lang', q.lang === 'ar' ? 'ar' : q.lang === 'en' ? 'en' : 'id');
      // Re-trigger animation
      textEl.style.animation = 'none';
      textEl.offsetHeight; // reflow
      textEl.style.animation = '';
    }

    // Translation (for AR and EN quotes)
    const transEl = document.getElementById('quote-translation');
    if (transEl) {
      if (q.translation) {
        transEl.textContent = q.translation;
        transEl.classList.add('visible');
      } else {
        transEl.textContent = '';
        transEl.classList.remove('visible');
      }
    }

    // Fav star state
    const isFav = this.favorites.includes(idx);
    const favIcon = document.getElementById('fav-icon');
    const favBtn  = document.getElementById('btn-quote-fav');
    if (favIcon) favIcon.textContent = isFav ? '★' : '☆';
    if (favBtn)  favBtn.classList.toggle('active', isFav);

    // ── Hendri Quote Special Highlight ──
    const isHendri = (q.author || '').trim().toLowerCase() === 'hendri';
    const card = document.getElementById('quote-card');
    if (card) card.classList.toggle('hendri-quote', isHendri);

    // Inject or update Hendri badge (positioned above the author line)
    const authorEl = document.getElementById('quote-author');
    if (authorEl) {
      let badge = document.getElementById('hendri-special-badge');
      if (!badge) {
        badge = document.createElement('div');
        badge.id = 'hendri-special-badge';
        badge.className = 'hendri-badge';
        badge.setAttribute('aria-label', 'Quote spesial dari Hendri');
        badge.innerHTML = '<span class="hendri-badge-icon">✦</span><span>Pesan Spesial dari Hendri</span>';
        authorEl.parentNode.insertBefore(badge, authorEl);
      }
      // Toggle visibility
      if (isHendri) {
        badge.classList.add('visible');
      } else {
        badge.classList.remove('visible');
      }
    }
  },

  /** Public: show random quote (called by button) */
  showRandom() {
    this._showQuote(this._randomIndex(), true);
  },

  /** Toggle favorite for current quote */
  toggleFav() {
    if (this.currentIndex === null) return;
    const idx  = this.currentIndex;
    const pos  = this.favorites.indexOf(idx);
    const icon = document.getElementById('fav-icon');
    const btn  = document.getElementById('btn-quote-fav');

    if (pos === -1) {
      this.favorites.push(idx);
      if (icon) icon.textContent = '★';
      if (btn)  btn.classList.add('active');
      this.showToast('✦ Ditambahkan ke favorit');
    } else {
      this.favorites.splice(pos, 1);
      if (icon) icon.textContent = '☆';
      if (btn)  btn.classList.remove('active');
      this.showToast('Dihapus dari favorit');
    }

    this._saveFavs();
    this._updateFavCount();
    // Refresh fav list if open
    const list = document.getElementById('quote-favlist');
    if (list && list.classList.contains('open')) this._renderFavList();
  },

  /** Copy current quote to clipboard */
  async copyQuote() {
    if (this.currentIndex === null) return;
    const q = this.quotes[this.currentIndex];
    let text = `"${q.text}"`;
    if (q.translation) text += `\n(${q.translation})`;
    text += `\n— ${q.author}`;

    try {
      await navigator.clipboard.writeText(text);
      this.showToast('⎘ Quote berhasil disalin!');
    } catch (e) {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity  = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      this.showToast('⎘ Quote berhasil disalin!');
    }
  },

  /** Show/hide fav list panel */
  toggleFavList() {
    const panel = document.getElementById('quote-favlist');
    if (!panel) return;
    const isOpen = panel.classList.toggle('open');
    if (isOpen) this._renderFavList();
  },

  /** Render items in fav list panel */
  _renderFavList() {
    const container = document.getElementById('quote-favlist-items');
    if (!container) return;

    if (this.favorites.length === 0) {
      container.innerHTML = '<p class="quote-fav-empty">Belum ada quote favorit.<br>Ketuk ☆ pada quote yang kamu sukai.</p>';
      return;
    }

    container.innerHTML = this.favorites.map(idx => {
      const q = this.quotes[idx];
      if (!q) return '';
      const displayText = q.lang !== 'id' && q.translation ? q.translation : q.text;
      return `<div class="quote-fav-item" onclick="QuoteSection._jumpToQuote(${idx})" role="button" tabindex="0">
        <div class="quote-fav-item-text">${displayText}</div>
        <div class="quote-fav-item-author">— ${q.author}</div>
      </div>`;
    }).join('');
  },

  /** Jump to a specific quote index (from fav list) */
  _jumpToQuote(idx) {
    this.toggleFavList();
    setTimeout(() => this._showQuote(idx, true), 200);
  },

  /** Clear all favorites */
  clearFavs() {
    this.favorites = [];
    this._saveFavs();
    this._updateFavCount();
    this._renderFavList();
    this.showToast('Semua favorit dihapus');

    // Update current quote star
    const icon = document.getElementById('fav-icon');
    const btn  = document.getElementById('btn-quote-fav');
    if (icon) icon.textContent = '☆';
    if (btn)  btn.classList.remove('active');
  },

  _saveFavs() {
    try { localStorage.setItem('safitri_fav_quotes', JSON.stringify(this.favorites)); }
    catch (e) {}
  },

  _updateFavCount() {
    const badge = document.getElementById('fav-count');
    if (!badge) return;
    if (this.favorites.length > 0) {
      badge.textContent = this.favorites.length;
      badge.style.display = 'inline';
    } else {
      badge.style.display = 'none';
    }
  },

  /** Show a brief toast notification */
  showToast(msg) {
    const toast = document.getElementById('quote-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  },

  /** Build a pool of photo URLs from cached Drive data */
  _buildPhotoPool() {
    if (!DriveAPI.isReady) return;
    const pool = [];
    const allowedFolders = ['imagesCover', 'images2024', 'images2025', 'images2026'];
    
    Object.entries(DriveAPI.cache).forEach(([key, val]) => {
      // Saring hanya folder gambar yang ditentukan
      if (!allowedFolders.includes(key)) return;
      if (typeof val !== 'object') return;
      Object.values(val).forEach(fileId => {
        if (typeof fileId === 'string' && fileId.length > 10) {
          // Gunakan resolusi w600 yang lebih cepat di-load daripada w800
          pool.push(DriveAPI.thumbUrl(fileId, 'w600'));
        }
      });
    });
    // Shuffle and take up to 30 photos for rotation
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    this.photoPool = pool.slice(0, 30);
    console.info('[QuoteSection] Photo pool built with size:', this.photoPool.length);
  },

  /** Update ghost photo background on card change */
  _updatePhotoBackground() {
    const bg = document.getElementById('quote-photo-bg');
    if (!bg || this.photoPool.length === 0) return;
    const url = this.photoPool[Math.floor(Math.random() * this.photoPool.length)];
    console.info('[QuoteSection] Loading background photo:', url);
    
    // Set background secara langsung untuk menghindari masalah loading pada cross-origin Image objects di JS
    bg.style.backgroundImage = `url('${url}')`;
    bg.classList.add('loaded');
  },

  /** Canvas particle system — floating gold stars */
  _initCanvas() {
    this.canvas = document.getElementById('quote-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this._resizeCanvas();
    this._spawnParticles();
    this._animParticles();

    window.addEventListener('resize', () => {
      this._resizeCanvas();
      this._spawnParticles();
    });
  },

  _resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width  = rect.width  || 760;
    this.canvas.height = rect.height || 600;
  },

  _spawnParticles() {
    const w = this.canvas ? this.canvas.width  : 760;
    const h = this.canvas ? this.canvas.height : 600;
    this.particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.4,
      vy: -(Math.random() * 0.3 + 0.1),
      vx: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.6 + 0.2,
      flicker: Math.random() * Math.PI * 2,
    }));
  },

  _animParticles() {
    if (!this.canvas || !this.ctx) return;
    const { canvas: cv, ctx, particles } = this;

    this.isCanvasVisible = true;

    // Setup IntersectionObserver to play/pause particles based on viewport visibility
    const container = document.getElementById('pojok-motivasi');
    if (container) {
      const observer = new IntersectionObserver(entries => {
        this.isCanvasVisible = entries[0].isIntersecting;
        if (this.isCanvasVisible) {
          if (!this.animFrame) loop();
        } else {
          if (this.animFrame) {
            cancelAnimationFrame(this.animFrame);
            this.animFrame = null;
          }
        }
      }, { threshold: 0.05 });
      observer.observe(container);
    }

    const loop = () => {
      if (!this.isCanvasVisible) {
        this.animFrame = null;
        return;
      }
      ctx.clearRect(0, 0, cv.width, cv.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.flicker += 0.04;
        const alpha = p.opacity * (0.7 + 0.3 * Math.sin(p.flicker));

        // Wrap around
        if (p.y < -4) p.y = cv.height + 4;
        if (p.x < -4) p.x = cv.width  + 4;
        if (p.x > cv.width  + 4) p.x = -4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${alpha.toFixed(2)})`;
        ctx.fill();
      });
      this.animFrame = requestAnimationFrame(loop);
    };
    loop();
  },

  /** Swipe gesture for mobile */
  _initSwipe() {
    const universe = document.getElementById('quote-universe');
    if (!universe) return;
    let startX = null;
    universe.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    universe.addEventListener('touchend', e => {
      if (startX === null) return;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 60) this.showRandom();
      startX = null;
    }, { passive: true });
  },
};

// ════════════════════════════════════════
//  COO MESSAGE — ENVELOPE SECTION
// ════════════════════════════════════════
const EnvelopeSection = {
  isOpen: false,

  // Full COO letter text — paragraphs as array
  letterParagraphs: [
    "Last weekend, Apotek Alpro celebrated another 11 new outlet Grand Openings. 🎉",
    "But today, the story is not about the number of outlets.",
    "Today, the story is about one person behind many of those moments — Safitri Lailasari, S.Sos.",
    "This Grand Opening felt a little different, because it will be the last Grand Opening organized by her.",
    "Safitri is not a Head of Department.\nShe may not appear in the organization chart as someone \"big\".\nTo some people, maybe she is rem as an \"admin operation\".",
    "But for those of us who have walked this journey with her, we know she is much more than that.",
    "Safitri started with Alpro from the early days when we first came in.",
    "She was there during the handover and transformation process from the previous company.",
    "She welcomed us, arranged many things nicely, and helped us understand the people, the flow, and the \"hidden map\" of the organization. 🧭",
    "She knew who to contact — from satpam, outlet team, vendor, PIC, manager, until director — whenever we needed to settle issues quickly.",
    "Of course, she was not perfect.",
    "Sometimes she gave headache to her superior, Pak Hendri .S.E. 😅",
    "Sometimes she cried when asked to do morning sharing & always panicked when we asked for details.",
    "Sometimes she got confused when things became too complicated.",
    "But that is exactly what makes her human.",
    "Because on the other side, Safitri is also someone who kept showing up.",
    "Nervous, but still tried.\nNot always confident, but still did her part.\nNot always under the spotlight, but always somewhere in the background, quietly helping things move. 🌱",
    "And of course, she is also our talented entertainer — the one who never failed to surprise us with her jokes in unique \"Safitri style\". 😂",
    "To me, Safitri represents many genuine, kind, hardworking Indonesians who are fighting their best for their life.",
    "Not perfect.\nNot always loud.\nNot always seen.",
    "But sincere.\nHardworking.\nAnd full of heart.\nIn her own way, she is Yong Xin Kaizen — continuously improving, even when the road is not easy.",
    "Maybe, in terms of position, her job can eventually be replaced by someone else.",
    "But in terms of person, the help Safitri gave to Apotek Alpro, the memories she created, the laughter she brought, and the spark she left behind — those are things that cannot be replaced.",
    "Tomorrow will be her last day.",
    "After years of fighting alone, merantau in Jakarta, she has decided to return to her hometown.",
    "And I see this not as a goodbye.",
    "I see this as a proud graduation. 🎓",
    "Safitri, Pak B wishes you all the best for your next chapter.",
    "Stay real.\nStay kind.\nStay brave.\nStay as the Safitri that we know.",
    "And yes, until today I am still puzzled why you call yourself Angelababy… 😆",
    "But maybe you are right.",
    "Because for Alpro, you will always be one of our Angels. 🤍",
    "Thank you for everything, Safitri.",
    "Once an Alproean, always an Alproean. 💙🧡",
  ],

  init() {
    // Populate letter body
    const bodyEl = document.getElementById('coo-letter-body');
    if (bodyEl) {
      bodyEl.innerHTML = this.letterParagraphs.map(para => {
        // Handle multi-line paragraphs (\n → <br>)
        const html = para.replace(/\n/g, '<br>');
        return `<p>${html}</p>`;
      }).join('');
    }

    // Load photo from Drive (folder: images2026, filename: 'go 27-28 jun 26 (7).jfif')
    this._loadPhoto();
  },

  _loadPhoto() {
    const photoEl = document.getElementById('coo-letter-photo');
    if (!photoEl) return;

    // Try to find the photo from the images2026 Drive folder
    const targetFilename = 'go 27-28 jun 26 (7).jfif';
    const fileId = DriveAPI.getFileId('images2026', targetFilename);

    if (fileId) {
      const url = DriveAPI.viewUrl(fileId);
      photoEl.classList.add('loading');
      photoEl.style.backgroundImage = `url('${url}')`;
      photoEl.style.backgroundSize  = 'cover';
      photoEl.style.backgroundPosition = 'center';
      photoEl.classList.remove('loading');
      console.info('[EnvelopeSection] Photo loaded:', targetFilename);
    } else {
      // Fallback: try thumbnail URL if viewUrl fails
      // We'll try all images2026 thumbnails to find a suitable one as last resort
      console.info('[EnvelopeSection] Photo not found in cache — will attempt on open');
      photoEl.classList.add('loading');
    }
  },

  open() {
    if (this.isOpen) return;
    this.isOpen = true;

    const envelope = document.getElementById('envelope');
    const letter   = document.getElementById('coo-letter');
    const scene    = document.getElementById('envelope-scene');

    if (!envelope || !letter) return;

    // 1. Open envelope flap + hide seal
    envelope.classList.add('is-open');

    // 2. After flap opens, raise letter
    setTimeout(() => {
      letter.setAttribute('aria-hidden', 'false');
      letter.classList.add('is-visible');

      // Expand scene to show full letter
      if (scene) scene.classList.add('letter-open');

      // Try photo load again in case Drive wasn't ready at init
      const photoEl = document.getElementById('coo-letter-photo');
      if (photoEl && photoEl.classList.contains('loading')) {
        this._loadPhoto();
      }
    }, 480);
  },

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;

    const envelope = document.getElementById('envelope');
    const letter   = document.getElementById('coo-letter');
    const scene    = document.getElementById('envelope-scene');

    if (!envelope || !letter) return;

    // 1. Drop letter back
    letter.classList.remove('is-visible');
    letter.setAttribute('aria-hidden', 'true');

    // 2. Close envelope flap after letter recedes
    setTimeout(() => {
      envelope.classList.remove('is-open');
      if (scene) scene.classList.remove('letter-open');
    }, 350);
  },
};

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
  EnvelopeSection.init();
  initPiagam();
  PhotoAlbum.init();
  VideoAlbum.init();
  QuoteSection.init();
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

