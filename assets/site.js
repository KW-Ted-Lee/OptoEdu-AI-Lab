/* 實驗室首頁：由 LAB_CONFIG 產生全部內容；支援中文／English／日本語 */
(function () {
  "use strict";
  const BASE = window.LAB_CONFIG || {};
  const UI_ALL = window.LAB_UI || {};
  const TR = window.LAB_I18N || {};
  const LANGS = ["zh", "en", "ja"].filter((l) => UI_ALL[l]);
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const store = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : v; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };

  /* ---------- 語言 ---------- */
  const LANG_KEY = "lab-lang";
  let lang = store.get(LANG_KEY, "zh");
  if (!LANGS.includes(lang)) lang = "zh";
  let C = BASE, U = UI_ALL.zh, PLAT = {};

  /* 把翻譯疊到中文資料上：有 id 的陣列用 id 對應，其他物件陣列用順序對應，字串陣列整個取代 */
  function merge(base, ov) {
    if (ov === undefined) return base;
    if (Array.isArray(base) && Array.isArray(ov)) {
      if (!base.length || typeof base[0] !== "object" || base[0] === null) return ov.slice();
      const byId = base[0].id !== undefined;
      return base.map((b, i) => merge(b, byId ? ov.find((o) => o && o.id === b.id) : ov[i]));
    }
    if (base && typeof base === "object" && ov && typeof ov === "object" && !Array.isArray(ov)) {
      const out = Object.assign({}, base);
      Object.keys(ov).forEach((k) => { out[k] = k in base ? merge(base[k], ov[k]) : ov[k]; });
      return out;
    }
    return ov;
  }
  const get = (obj, path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);

  function setLang(l) {
    lang = LANGS.includes(l) ? l : "zh";
    U = UI_ALL[lang] || UI_ALL.zh;
    C = lang === "zh" ? BASE : merge(BASE, TR[lang] || {});
    PLAT = Object.fromEntries((C.platforms || []).map((p) => [p.id, p]));
    document.documentElement.lang = U.htmlLang;
    if (lang === "ja") loadJaFont();
  }
  function loadJaFont() {
    if (document.getElementById("font-ja")) return;
    const l = document.createElement("link");
    l.id = "font-ja"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@600;700&display=swap";
    document.head.appendChild(l);
  }
  setLang(lang);

  /* ---------- 主題 ---------- */
  const THEME_KEY = "lab-theme";
  const THEMES = ["system", "light", "dark", "shiden"];   // shiden（紫電）：紫底螢光綠的特別配色，會多出音樂按鈕
  /* 紫電模式的背景音樂：在這幾首 YouTube 影片之間隨機播放（填影片 ID，網址 v= 後面那一段） */
  const MUSIC = ["V36Gz7cUbas", "D0QJTrb98kE"];
  function applyTheme(t) {
    const r = document.documentElement;
    if (t === "light" || t === "dark" || t === "shiden") r.setAttribute("data-theme", t); else r.removeAttribute("data-theme");
    const m = document.getElementById("music-btn"); if (m) m.hidden = t !== "shiden";
    if (t !== "shiden") Music.stop();
  }

  /* ---------- 背景音樂（網頁內隱藏的 YouTube 播放器） ---------- */
  const Music = (function () {
    let player = null, ready = false, playing = false, current = null, failed = new Set(), apiLoading = false, wantPlay = false;
    const pick = () => {
      const pool = MUSIC.filter((id) => !failed.has(id) && id !== current);
      const list = pool.length ? pool : MUSIC.filter((id) => !failed.has(id));
      return list.length ? list[Math.floor(Math.random() * list.length)] : null;
    };
    function setBtn() {
      const b = document.getElementById("music-btn"); if (!b) return;
      b.setAttribute("aria-pressed", playing ? "true" : "false");
      b.classList.toggle("on", playing);
      const label = playing ? U.theme.musicStop : U.theme.music;
      b.setAttribute("aria-label", label); b.title = label;
    }
    function loadApi() {
      if (window.YT && window.YT.Player) return onApi();
      if (apiLoading) return; apiLoading = true;
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { if (prev) prev(); onApi(); };
      const sc = document.createElement("script"); sc.src = "https://www.youtube.com/iframe_api"; document.head.appendChild(sc);
    }
    function onApi() {
      if (player) return;
      const id = pick(); if (!id) return;
      current = id;
      player = new YT.Player("music-player", {
        host: "https://www.youtube-nocookie.com", width: 1, height: 1, videoId: id,
        playerVars: { autoplay: 1, controls: 0, playsinline: 1, rel: 0 },
        events: {
          onReady: (e) => { ready = true; if (wantPlay) { e.target.playVideo(); } },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING) { playing = true; setBtn(); }
            if (e.data === YT.PlayerState.ENDED) { next(); }
          },
          onError: () => { failed.add(current); if (failed.size >= MUSIC.length) { playing = false; wantPlay = false; setBtn(); toast(U.theme.musicBlocked); } else next(); },
        },
      });
    }
    function next() { const id = pick(); if (!id || !player) return; current = id; player.loadVideoById(id); }
    function play() {
      wantPlay = true; playing = true; setBtn();
      if (!player) return loadApi();
      if (ready) { next(); player.playVideo(); }
    }
    function stop() {
      wantPlay = false;
      if (player && ready) { try { player.stopVideo(); } catch (e) {} }
      playing = false; setBtn();
    }
    return { play, stop, toggle: () => (playing ? stop() : play()), setBtn };
  })();
  function toast(msg) {
    let t = document.getElementById("toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show"); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 3200);
  }
  applyTheme(store.get(THEME_KEY, "system"));
  function themeIcon() {
    const t = store.get(THEME_KEY, "system");
    const btn = $("#theme-btn"); if (!btn) return;
    btn.setAttribute("aria-label", U.theme.label + "：" + (t === "dark" ? U.theme.dark : t === "light" ? U.theme.light : t === "shiden" ? U.theme.shiden : U.theme.system));
    btn.title = btn.getAttribute("aria-label");
    Music.setBtn();
    btn.innerHTML = t === "shiden" ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5z"/><path d="M13 6.5l-4 6h3.5l-1.5 5 4.5-6.5h-3.5z" fill="currentColor" stroke-width="1.2"/></svg>'
      : t === "dark" ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'
      : t === "light" ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3v18" /><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/></svg>';
  }

  /* ---------- 靜態文字 ---------- */
  function renderStatic() {
    document.querySelectorAll("[data-i18n]").forEach((el) => { const v = get(U, el.dataset.i18n); if (typeof v === "string") el.textContent = v; });
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => el.dataset.i18nAttr.split(";").forEach((pair) => {
      const [attr, path] = pair.split(":"); const v = get(U, path); if (typeof v === "string") el.setAttribute(attr, v);
    }));
    document.querySelectorAll("[data-sec]").forEach((el) => {
      const s = U.sec[el.dataset.sec] || ["", "", ""];
      el.innerHTML = `<h2><small>${esc(s[0])}</small>${esc(s[1])}</h2>${s[2] ? `<p>${esc(s[2])}</p>` : ""}`;
    });
    $("#lang-switch").innerHTML = LANGS.map((l) => `<button type="button" data-lang="${l}" lang="${UI_ALL[l].htmlLang}" aria-pressed="${l === lang}">${esc(UI_ALL[l].label)}</button>`).join("");
    themeIcon();
  }

  /* ---------- 視力表（翻轉 E） ---------- */
  function eSvg(px, rot) {
    return `<svg width="${px}" height="${px}" viewBox="0 0 5 5" aria-hidden="true"><path d="M0 0H5V1H1V2H5V3H1V4H5V5H0Z" fill="currentColor" transform="rotate(${rot} 2.5 2.5)"/></svg>`;
  }
  function chart() {
    const rows = [[0.1, "6/60", 1], [0.2, "6/30", 2], [0.3, "6/20", 3], [0.5, "6/12", 4], [0.7, "6/9", 5], [1.0, "6/6", 6]];
    let seed = 7; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    const base = 66;
    return rows.map(([dec, sn, n]) => {
      const px = Math.max(7, Math.round(base * 0.1 / dec));
      const es = Array.from({ length: n }, () => eSvg(px, [0, 90, 180, 270][Math.floor(rnd() * 4)])).join("");
      return `<div class="chart-row" style="--gap:${Math.max(6, px * 0.8)}px"><span class="lbl">${dec.toFixed(1)}</span><div class="es">${es}</div><span class="lbl r">${sn}</span></div>`;
    }).join("") + `<div class="chart-cap">${U.chartCap.map((t) => `<span>${esc(t)}</span>`).join("")}</div>`;
  }

  /* ---------- 各區塊 ---------- */
  function renderHero() {
    const L = C.lab || {};
    document.title = L.nameZh ? `${L.nameZh}｜${L.nameEn || ""}` : document.title;
    $("#logo-name").textContent = L.short || L.nameZh || "";
    $("#logo-sub").textContent = L.nameZh || "";
    $("#hero-unit").textContent = L.unit || "";
    $("#hero-title").textContent = L.nameZh || "";
    $("#hero-en").textContent = L.nameEn || "";
    $("#hero-tag").textContent = L.tagline || "";
    $("#hero-intro").textContent = L.intro || "";
    const hasAdm = (C.videos || []).some((v) => v.id === "admissions");
    $("#hero-cta").innerHTML = `<a class="btn" href="#courses">${esc(U.cta.courses)}</a><a class="btn ghost" href="#platforms">${esc(U.cta.platforms)}</a>` +
      (hasAdm ? `<a class="btn ghost" href="#video-admissions" data-flash>${esc(U.cta.admissions)}</a>` : "");
    const P = C.pi || {};
    const title = Array.isArray(P.title) ? P.title.slice(P.title.length > 1 ? 1 : 0).join("｜") : P.title;   // 首頁小字：去掉第一行（科別）
    $("#hero-pi").innerHTML = P.nameZh ? `${P.photo ? `<img src="${esc(P.photo)}" alt="" width="36" height="36">` : ""}<span><small>${esc(U.heroPi)}</small><b>${esc(P.nameZh)}</b>${title ? `<em>${esc(title)}</em>` : ""}</span>` : "";
    const PL = C.platforms || [];
    const online = PL.filter((p) => (p.status === "live" && p.url) || p.status === "campus").length;
    const campus = PL.filter((p) => p.status === "campus").length;
    $("#hero-stats").innerHTML = [[(C.courses || []).length, U.stats.courses], [online, U.stats.online], [campus, U.stats.campus], [(C.research || []).length, U.stats.research]]
      .map(([n, l]) => `<div><b>${n}</b><span>${esc(l)}</span></div>`).join("");
    $("#chart").innerHTML = chart();
  }

  const statusLabel = (s) => U.status[s] || U.status.soon;
  const tg = (c) => [].concat(c.tag || []).filter(Boolean);   // tag 可以是字串或陣列
  const videosOf = (cid) => (C.videos || []).filter((v) => [].concat(v.courses || v.course || []).includes(cid));

  /* 課程卡片下方：學習平台與影片濃縮成一排小標籤 */
  function resChips(c) {
    const chips = (c.platforms || []).map((id) => {
      const p = PLAT[id]; if (!p) return "";
      const name = esc(p.short || p.zh);
      if (p.url && p.status === "live") return `<a class="rc" href="${esc(p.url)}" title="${esc(p.zh)}">${name}<span aria-hidden="true">→</span></a>`;
      return `<span class="rc off" title="${esc(p.zh)}（${esc(statusLabel(p.status))}）">${name}<small>${esc(p.status === "campus" ? U.campusShort : statusLabel(p.status))}</small></span>`;
    }).concat(videosOf(c.id).map((v) => `<a class="rc vid" href="#video-${esc(v.id)}" data-flash>▶ ${esc(v.short || v.zh)}</a>`)).filter(Boolean);
    return chips.length ? `<div class="res"><span class="lead">${esc(U.resources)}</span><div class="res-chips">${chips.join("")}</div></div>` : "";
  }

  let filterTag = "all";
  function renderCourses() {
    const list = C.courses || [];
    const tags = [...new Set(list.flatMap(tg))];
    if (filterTag !== "all" && !tags.includes(filterTag)) filterTag = "all";
    $("#course-chips").innerHTML = [["all", U.all, list.length]].concat(tags.map((t) => [t, t, list.filter((c) => tg(c).includes(t)).length]))
      .map(([v, l, n]) => `<button type="button" data-v="${esc(v)}" aria-pressed="${v === filterTag}">${esc(l)}<span class="n">${n}</span></button>`).join("");
    $("#course-grid").innerHTML = list.map((c) => {
      const info = [[U.info.time, c.time], [U.info.room, c.room], [U.info.status, c.status]].filter(([, v]) => v);   // 學分放在卡片上方
      const hidden = !(filterTag === "all" || tg(c).includes(filterTag));
      return `<article class="card" id="course-${esc(c.id)}" data-tag="${esc(tg(c).join("|"))}"${hidden ? " hidden" : ""}>
        <div class="card-top">${c.code ? `<span class="badge">${esc(c.code)}</span>` : ""}${tg(c).map((t) => `<span class="badge plain">${esc(t)}</span>`).join("")}${c.credits ? `<span class="badge plain cr">${esc(c.credits)}</span>` : ""}${c.semester ? `<span class="sem">${esc(c.semester)}</span>` : ""}</div>
        <h3>${esc(c.zh)}<span class="en">${esc(c.en)}</span></h3>
        ${c.desc ? `<p class="desc">${esc(c.desc)}</p>` : (!(c.topics || []).length ? `<p class="desc empty">${esc(U.descEmpty)}</p>` : "")}
        ${info.length ? `<div class="info">${info.map(([k, v]) => `<div><span>${esc(k)}</span>${esc(v)}</div>`).join("")}</div>` : ""}
        ${c.topics && c.topics.length ? `<div class="topics-h">${esc(U.topics)}</div><div class="tags">${c.topics.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
        ${resChips(c)}
      </article>`;
    }).join("");
  }
  function applyFilter() {
    $("#course-chips").querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x.dataset.v === filterTag ? "true" : "false"));
    $("#course-grid").querySelectorAll(".card").forEach((card) => { card.hidden = !(filterTag === "all" || card.dataset.tag.split("|").includes(filterTag)); });
  }

  function renderPlatforms() {
    $("#platform-grid").innerHTML = (C.platforms || []).map((p) => {
      const st = statusLabel(p.status);
      const usedBy = (C.courses || []).filter((c) => (c.platforms || []).includes(p.id)).map((c) => c.zh).concat(p.usedFor || []);
      const go = p.url && p.status === "live" ? `<a class="btn" href="${esc(p.url)}">${esc(U.enter)}</a>` : `<span class="btn ghost" aria-disabled="true">${esc(st)}</span>`;
      return `<article class="card" id="plat-${esc(p.id)}">
        <div class="card-top">${p.status === "campus" ? `<span class="status live">${esc(U.status.live)}</span><span class="status campus">${esc(U.status.campusOnly)}</span>` : `<span class="status ${esc(p.status || "soon")}">${esc(st)}</span>`}</div>
        <h3>${esc(p.zh)}<span class="en">${esc(p.en)}</span></h3>
        <p class="desc">${esc(p.desc)}</p>
        ${p.note ? `<p class="plat-note">${esc(p.note)}</p>` : ""}
        ${p.stats ? `<div class="meta">${esc(p.stats)}</div>` : ""}
        ${p.tags && p.tags.length ? `<div class="tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
        ${usedBy.length ? `<div class="meta">${esc(U.usedFor)}${usedBy.map(esc).join(esc(U.listSep))}</div>` : ""}
        <div class="links">${go}</div>
      </article>`;
    }).join("");
  }

  function renderVideos() {
    const V = C.videos || [];
    const grid = $("#video-grid"); if (!grid) return;
    if (!V.length) { $("#videos").hidden = true; return; }
    const course = (id) => (C.courses || []).find((c) => c.id === id);
    grid.innerHTML = V.map((v) => {
      const cs = [].concat(v.courses || v.course || []).map(course).filter(Boolean);
      const ids = (v.videos || []).map((x) => x.id).filter(Boolean);
      const n = ids.length ? ids.length : v.count;
      const cover = /^[\w-]{6,20}$/.test(v.cover || "") ? v.cover : ids[0];   // 預覽圖：cover 指定影片 ID，否則用第一支影片
      const src = ids.length
        ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(ids[0])}?playlist=${ids.map(encodeURIComponent).join(",")}&autoplay=1`
        : `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(v.list)}&autoplay=1`;
      const yt = (v.videos || []).filter((x) => x.id).map((x) => `<a href="https://www.youtube.com/watch?v=${esc(x.id)}" target="_blank" rel="noopener">▶ ${esc(x.title || U.watch)} ↗</a>`).join("");
      const ytList = v.list ? `<a href="https://www.youtube.com/playlist?list=${esc(v.list)}" target="_blank" rel="noopener">${esc(ids.length ? U.fullList : U.openYt)} ↗</a>` : "";
      return `<article class="card video" id="video-${esc(v.id)}">
        <div class="player" data-src="${esc(src)}">
          <button type="button" class="play${cover ? " has-cover" : ""}" aria-label="${esc(U.play + v.zh)}"${cover ? ` style="--cover:url('https://i.ytimg.com/vi/${esc(cover)}/hqdefault.jpg')"` : ""}>
            <span class="pl-ic"><svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span>
            <span class="pl-t">${esc(v.zh)}</span>
            ${n ? `<span class="pl-n">${ids.length ? "" : esc(U.playlist)}${esc(U.videosCount(n))}</span>` : ""}
          </button>
        </div>
        <h3>${esc(v.zh)}<span class="en">${esc(v.en || "")}</span></h3>
        <p class="desc">${esc(v.desc)}</p>
        ${v.tags && v.tags.length ? `<div class="tags">${v.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
        ${cs.length ? `<div class="links"><span class="lead">${esc(U.relatedCourses)}</span>${cs.map((c) => `<a href="#course-${esc(c.id)}" data-flash>${esc(c.zh)}</a>`).join("")}</div>` : ""}
        <div class="links">${yt}${ytList}</div>
        ${(v.links || []).length ? `<div class="links social">${v.links.filter((l) => /^https:\/\//.test(l.url || "")).map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}</div>` : ""}
      </article>`;
    }).join("");
  }

  function renderResearch() {
    $("#research-grid").innerHTML = (C.research || []).map((r, i) => `<article class="card" id="research-${i}">
      ${r.note ? `<div class="note">${esc(r.note)}</div>` : ""}
      <h3>${esc(r.zh)}<span class="en">${esc(r.en)}</span></h3>
      <p class="desc">${esc(r.desc)}</p>
      ${r.tags && r.tags.length ? `<div class="tags">${r.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
    </article>`).join("");
  }

  function renderPubs() {
    const all = C.publications || [];
    const pubs = all.slice().sort((a, b) => b.year - a.year);
    const years = [...new Set(pubs.map((p) => p.year))];
    $("#pubs").innerHTML = years.map((y) => `<div class="pub-year"><h3>${y}</h3><ol>${pubs.filter((p) => p.year === y).map((p) => `
      <li id="pub-${all.indexOf(p)}"><span class="ty">${esc(U.pubTypes[p.type] || p.type || "")}</span><b>${esc(p.title)}</b>${p.titleTr ? `<span class="tr">${esc(p.titleTr)}</span>` : ""}<span class="au">${esc(p.authors)}</span><span class="ve">${esc(p.venue)}</span></li>`).join("")}</ol></div>`).join("");
  }

  /* 職稱以「｜」分段，每段不在中間斷行（避免「オプトメトリスト」被拆開） */
  const nobr = (t) => String(t).split("｜").map((x) => `<span class="nw">${esc(x)}</span>`).join("<wbr>｜");

  function renderPI() {
    const P = C.pi || {};
    const initials = (P.nameZh || P.nameEn || "?").slice(-2);
    const hl = (P.highlights || []).map((h) => `<div><b>${esc(h.n)}</b><span>${esc(h.l)}</span></div>`).join("");
    $("#pi-card").innerHTML = `<div class="avatar">${P.photo ? `<img src="${esc(P.photo)}" alt="${esc(P.nameZh)}">` : esc(initials)}</div>
      <h3>${esc(P.nameZh)}</h3><div class="en">${esc(P.nameEn)}</div><div class="ti">${[].concat(P.title || []).map(nobr).join("<br>")}</div><div class="un">${esc(P.unit || (C.lab || {}).unit)}</div>
      ${hl ? `<div class="pi-hl">${hl}</div>` : ""}`;
    const block = (t, arr) => (arr && arr.length ? `<div><h4>${esc(t)}</h4><ul>${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>` : "");
    $("#pi-cv").innerHTML = (P.bio ? `<p class="pi-bio">${esc(P.bio)}</p>` : "") +
      `<div class="cv-grid">${block(U.cv.current, P.current) + block(U.cv.education, P.education) + block(U.cv.experience, P.experience) + block(U.cv.service, P.service) + block(U.cv.projects, P.projects) + block(U.cv.awards, P.awards)}</div>`;
    const lic = P.licenses || [];
    $("#pi-lic").innerHTML = lic.length ? `<div class="lic-head"><h4>${esc(U.cv.licenses)}</h4><span>${esc(U.cv.selected)}</span></div>
      <div class="lic-grid">${lic.map((g) => `<div class="lic-group"><div class="lic-g">${esc(g.group)}</div>${g.items.map((it) => `<div class="lic-item"><b>${esc(it.name)}</b>${it.note ? `<span>${esc(it.note)}</span>` : ""}</div>`).join("")}</div>`).join("")}</div>` : "";
    const O = P.outreach;
    $("#pi-out").innerHTML = O && O.text ? `<div class="lic-head"><h4>${esc(O.title)}</h4></div><p class="out-text">${esc(O.text)}</p>` : "";
  }

  function renderContact() {
    const K = C.contact || {};
    const items = [[U.contact.topics, K.topics], [U.contact.email, K.email, true], [U.contact.phone, K.phone], [U.contact.address, K.address]].filter(([, v]) => v && (!Array.isArray(v) || v.length));
    $("#contact").innerHTML = items.map(([k, v, copy]) => `<div class="card"><span class="k">${esc(k)}</span><span class="v">${Array.isArray(v) ? v.map(esc).join("<br>") : esc(v)}</span>${copy ? `<button type="button" class="copy-btn" data-copy="${esc(v)}">${esc(U.contact.copy)}</button>` : ""}</div>`).join("");
  }

  function renderFooter() {
    const cp = C.copyright || {}, L = C.lab || {};
    $("#footer").innerHTML = `<div class="wrap"><div><b>${esc(L.nameZh)}</b>　${esc(L.nameEn)}</div>${cp.holder ? `<div>© ${esc(cp.year || new Date().getFullYear())} ${esc(cp.holder)}　${esc(cp.note || "")}</div>` : ""}</div>`;
  }

  function renderAll() {
    renderStatic(); renderHero(); renderCourses(); renderPlatforms(); renderVideos(); renderResearch(); renderPubs(); renderPI(); renderContact(); renderFooter();
    INDEX = buildIndex();
  }

  /* ---------- 事件（只綁一次） ---------- */
  function flashTo(el) {
    if (!el) return;
    if (el.hidden || (el.closest(".card") && el.closest(".card").hidden)) { filterTag = "all"; applyFilter(); }
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash");
  }
  function bindEvents() {
    const links = $(".nav-links"), btn = $("#menu-btn");
    btn.addEventListener("click", () => { const o = links.classList.toggle("open"); btn.setAttribute("aria-expanded", o); });
    links.addEventListener("click", (e) => { if (e.target.closest("a")) { links.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); } });
    $("#theme-btn").addEventListener("click", () => {
      const t = THEMES[(THEMES.indexOf(store.get(THEME_KEY, "system")) + 1) % THEMES.length];
      store.set(THEME_KEY, t); applyTheme(t); themeIcon();
      if (t === "shiden") Music.play();   // 切進紫電模式就開始播放（點擊算使用者操作，瀏覽器才允許有聲音的自動播放）
    });
    $("#music-btn").addEventListener("click", () => Music.toggle());
    $("#lang-switch").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-lang]"); if (!b || b.dataset.lang === lang) return;
      const y = window.scrollY;
      store.set(LANG_KEY, b.dataset.lang); setLang(b.dataset.lang); renderAll();
      window.scrollTo(0, y);
      const nb = $(`#lang-switch button[data-lang="${lang}"]`); if (nb) nb.focus();
    });
    $("#course-chips").addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      filterTag = b.dataset.v; applyFilter();
    });
    $("#video-grid").addEventListener("click", (e) => {
      const b = e.target.closest(".play"); if (!b) return;
      const box = b.parentElement;
      box.innerHTML = `<iframe src="${esc(box.dataset.src)}" title="${esc(U.ytTitle)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe>`;
    });
    /* 站內跳轉並閃一下目標卡片 */
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-flash]"); if (!a) return;
      const el = document.getElementById(a.getAttribute("href").slice(1)); if (!el) return;
      e.preventDefault(); flashTo(el);
    });
    $("#contact").addEventListener("click", (e) => {
      const b = e.target.closest(".copy-btn"); if (!b) return;
      const done = () => { b.textContent = U.contact.copied; setTimeout(() => (b.textContent = U.contact.copy), 1600); };
      try { navigator.clipboard.writeText(b.dataset.copy).then(done, () => selectText(b)); } catch (err) { selectText(b); }
    });
    function selectText(b) { const r = document.createRange(); r.selectNodeContents(b.previousElementSibling); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
    if ("IntersectionObserver" in window) {
      const map = new Map([...links.querySelectorAll("a")].map((a) => [a.getAttribute("href").slice(1), a]));
      const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { map.forEach((a) => a.classList.remove("on")); const a = map.get(en.target.id); if (a) a.classList.add("on"); } }), { rootMargin: "-45% 0px -50% 0px" });
      document.querySelectorAll("section[id]").forEach((s) => io.observe(s));
    }
  }

  /* ---------- 搜尋（搜尋當下語言的內容） ---------- */
  let INDEX = [];
  function buildIndex() {
    const T = U.searchUi.types, idx = [];
    const add = (type, title, sub, text, target) => idx.push({ type, title, sub, target, hay: [title, sub, text].join(" ").toLowerCase() });
    (C.courses || []).forEach((c) => add(T.course, c.zh, [c.en, tg(c).join("・"), c.code].filter(Boolean).join("・"), [c.desc, (c.topics || []).join(" "), c.semester].join(" "), "course-" + c.id));
    (C.platforms || []).forEach((p) => add(T.platform, p.zh, p.en, [p.desc, (p.tags || []).join(" "), p.stats, p.note, statusLabel(p.status)].join(" "), "plat-" + p.id));
    (C.videos || []).forEach((v) => add(T.video, v.zh, v.en, [v.desc, (v.tags || []).join(" "), (v.videos || []).map((x) => x.title).join(" "), (v.links || []).map((x) => x.label).join(" "), (v.links || []).length ? "IG Instagram Threads" : "", "YouTube video 影片 動画"].join(" "), "video-" + v.id));
    (C.research || []).forEach((r, i) => add(T.research, r.zh, r.en, [r.desc, (r.tags || []).join(" "), r.note].join(" "), "research-" + i));
    const PT = { poster: "poster 海報 研討會 ポスター", journal: "journal 期刊 論文", book: "book 書 譯著 著作 書籍", talk: "talk 演講 講演", conference: "conference 研討會 論文 学会" };
    (C.publications || []).forEach((p, i) => add(T.pub, p.title, `${p.year}・${p.venue}`, [p.titleTr, p.authors, PT[p.type] || p.type].join(" "), "pub-" + i));
    const P = C.pi || {};
    (P.licenses || []).forEach((g) => g.items.forEach((it) => add(T.license, it.name, g.group, it.note, "pi-lic")));
    [["current", P.current], ["education", P.education], ["experience", P.experience], ["service", P.service], ["projects", P.projects], ["awards", P.awards]]
      .forEach(([k, arr]) => (arr || []).forEach((x) => add(T.pi, x, U.cv[k], "", "pi")));
    if (P.outreach) add(T.pi, P.outreach.title, U.searchUi.outreachSub, P.outreach.text, "pi-out");
    const K = C.contact || {};
    add(T.contact, U.searchUi.contactTitle, K.email || "", [K.topics, [].concat(K.phone || []).join(" "), [].concat(K.address || []).join(" ")].join(" "), "contact-sec");
    return idx;
  }
  function searchSetup() {
    const layer = $("#search-layer"), input = $("#search-input"), list = $("#search-results"), hint = $("#search-hint");
    if (!layer) return;
    let cur = 0, results = [];
    const hl = (text, words) => { let out = esc(text); words.forEach((w) => { if (!w) return; const re = new RegExp(esc(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"); out = out.replace(re, (m) => `<mark>${m}</mark>`); }); return out; };
    function run() {
      const q = input.value.trim().toLowerCase();
      const words = q.split(/\s+/).filter(Boolean);
      if (!words.length) { results = []; list.innerHTML = ""; hint.textContent = U.searchUi.hint; return; }
      results = INDEX.filter((e) => words.every((w) => e.hay.includes(w))).slice(0, 30);
      hint.textContent = results.length ? U.searchUi.found(results.length) : U.searchUi.none;
      cur = 0;
      list.innerHTML = results.map((r, i) => `<li><button type="button" data-i="${i}" class="${i === 0 ? "on" : ""}"><span class="rt">${esc(r.type)}</span><span class="rb"><b>${hl(r.title, words)}</b>${r.sub ? `<small>${hl(r.sub, words)}</small>` : ""}</span></button></li>`).join("");
    }
    function open() { layer.hidden = false; document.body.style.overflow = "hidden"; input.value = ""; run(); setTimeout(() => input.focus(), 10); }
    function close() { layer.hidden = true; document.body.style.overflow = ""; }
    function go(i) { const r = results[i]; if (!r) return; close(); flashTo(document.getElementById(r.target)); }
    $("#search-btn").addEventListener("click", open);
    $("#search-close").addEventListener("click", close);
    layer.addEventListener("click", (e) => { if (e.target === layer) close(); const b = e.target.closest("button[data-i]"); if (b) go(+b.dataset.i); });
    input.addEventListener("input", run);
    input.addEventListener("keydown", (e) => {
      const btns = list.querySelectorAll("button");
      if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); if (!btns.length) return; cur = (cur + (e.key === "ArrowDown" ? 1 : -1) + btns.length) % btns.length; btns.forEach((b, i) => b.classList.toggle("on", i === cur)); btns[cur].scrollIntoView({ block: "nearest" }); }
      else if (e.key === "Enter") { e.preventDefault(); go(cur); }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !layer.hidden) close();
      const typing = /INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || "");
      if (!typing && layer.hidden && (e.key === "/" || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k"))) { e.preventDefault(); open(); }
    });
  }

  document.addEventListener("DOMContentLoaded", () => { applyTheme(store.get(THEME_KEY, "system")); renderAll(); bindEvents(); searchSetup(); });
})();
