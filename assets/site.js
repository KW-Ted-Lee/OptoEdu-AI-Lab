/* 實驗室首頁：由 LAB_CONFIG 產生全部內容 */
(function () {
  "use strict";
  const C = window.LAB_CONFIG || {};
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const store = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : v; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  const STATUS = { live: ["上線中", "live"], soon: ["即將上線", "soon"], dev: ["開發中", "dev"] };
  const PLAT = Object.fromEntries((C.platforms || []).map((p) => [p.id, p]));

  /* ---------- 主題 ---------- */
  const THEME_KEY = "lab-theme";
  function applyTheme(t) { const r = document.documentElement; if (t === "light" || t === "dark") r.setAttribute("data-theme", t); else r.removeAttribute("data-theme"); }
  applyTheme(store.get(THEME_KEY, "system"));
  function themeIcon() {
    const t = store.get(THEME_KEY, "system");
    const btn = $("#theme-btn"); if (!btn) return;
    btn.setAttribute("aria-label", "配色：" + (t === "dark" ? "深色" : t === "light" ? "淺色" : "跟隨系統"));
    btn.innerHTML = t === "dark" ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'
      : t === "light" ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3v18" /><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/></svg>';
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
    }).join("") + `<div class="chart-cap"><span>小數視力</span><span>6 公尺 · 翻轉 E</span><span>Snellen</span></div>`;
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
    const live = (C.platforms || []).filter((p) => p.status === "live" && p.url).length;
    $("#hero-stats").innerHTML = [[(C.courses || []).length, "門課程"], [(C.platforms || []).length, "個學習平台"], [live, "個已上線"], [(C.research || []).length, "個研究方向"]]
      .map(([n, l]) => `<div><b>${n}</b><span>${l}</span></div>`).join("");
    $("#chart").innerHTML = chart();
  }

  function platLink(id) {
    const p = PLAT[id]; if (!p) return "";
    if (p.url && p.status === "live") return `<a href="${esc(p.url)}">${esc(p.zh)} →</a>`;
    return `<span class="pending">${esc(p.zh)}（${STATUS[p.status] ? STATUS[p.status][0] : "即將上線"}）</span>`;
  }

  function renderCourses() {
    const list = C.courses || [];
    const tg = (c) => [].concat(c.tag || []).filter(Boolean);   // tag 可以是字串或陣列
    const tags = [...new Set(list.flatMap(tg))];
    const chips = $("#course-chips");
    chips.innerHTML = [["all", "全部", list.length]].concat(tags.map((t) => [t, t, list.filter((c) => tg(c).includes(t)).length]))
      .map(([v, l, n], i) => `<button type="button" data-v="${esc(v)}" aria-pressed="${i === 0}">${esc(l)}<span class="n">${n}</span></button>`).join("");
    const grid = $("#course-grid");
    grid.innerHTML = list.map((c) => {
      const info = [["時間", c.time], ["地點", c.room], ["學分", c.credits], ["狀態", c.status]].filter(([, v]) => v);
      return `<article class="card" id="course-${esc(c.id)}" data-tag="${esc(tg(c).join("|"))}">
        <div class="card-top">${c.code ? `<span class="badge">${esc(c.code)}</span>` : ""}${tg(c).map((t) => `<span class="badge plain">${esc(t)}</span>`).join("")}${c.semester ? `<span class="sem">${esc(c.semester)}</span>` : ""}</div>
        <h3>${esc(c.zh)}<span class="en">${esc(c.en)}</span></h3>
        ${c.desc ? `<p class="desc">${esc(c.desc)}</p>` : (!(c.topics || []).length ? `<p class="desc empty">課程介紹整理中。</p>` : "")}
        ${info.length ? `<div class="info">${info.map(([k, v]) => `<div><span>${k}</span>${esc(v)}</div>`).join("")}</div>` : ""}
        ${c.topics && c.topics.length ? `<div class="topics-h">重點主題</div><div class="tags">${c.topics.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
        ${c.platforms && c.platforms.length ? `<div class="links"><span class="lead">搭配的學習平台</span>${c.platforms.map(platLink).join("")}</div>` : ""}
        ${(C.videos || []).filter((v) => [].concat(v.courses || v.course || []).includes(c.id)).length ? `<div class="links"><span class="lead">實驗影片</span>${(C.videos || []).filter((v) => [].concat(v.courses || v.course || []).includes(c.id)).map((v) => `<a href="#video-${esc(v.id)}">▶ ${esc(v.zh)}</a>`).join("")}</div>` : ""}
      </article>`;
    }).join("");
    chips.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      chips.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
      grid.querySelectorAll(".card").forEach((card) => { card.hidden = !(b.dataset.v === "all" || card.dataset.tag.split("|").includes(b.dataset.v)); });
    });
  }

  function renderPlatforms() {
    $("#platform-grid").innerHTML = (C.platforms || []).map((p) => {
      const st = STATUS[p.status] || STATUS.soon;
      const usedBy = (C.courses || []).filter((c) => (c.platforms || []).includes(p.id)).map((c) => c.zh);
      const go = p.url && p.status === "live" ? `<a class="btn" href="${esc(p.url)}">進入平台</a>` : `<span class="btn ghost" aria-disabled="true">${st[0]}</span>`;
      return `<article class="card" id="plat-${esc(p.id)}">
        <div class="card-top"><span class="status ${st[1]}">${st[0]}</span></div>
        <h3>${esc(p.zh)}<span class="en">${esc(p.en)}</span></h3>
        <p class="desc">${esc(p.desc)}</p>
        ${p.stats ? `<div class="meta">${esc(p.stats)}</div>` : ""}
        ${p.tags && p.tags.length ? `<div class="tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
        ${usedBy.length ? `<div class="meta">用於：${usedBy.map(esc).join("、")}</div>` : ""}
        <div class="links">${go}</div>
      </article>`;
    }).join("");
  }

  function renderVideos() {
    const V = C.videos || [];
    const grid = $("#video-grid"); if (!grid) return;
    if (!V.length) { $("#videos").hidden = true; return; }
    const course = (id) => (C.courses || []).find((c) => c.id === id);
    const vc = (v) => [].concat(v.courses || v.course || []).map(course).filter(Boolean);
    grid.innerHTML = V.map((v) => {
      const cs = vc(v);
      const ids = (v.videos || []).map((x) => x.id).filter(Boolean);
      const n = ids.length ? ids.length : v.count;
      const src = ids.length
        ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(ids[0])}?playlist=${ids.map(encodeURIComponent).join(",")}&autoplay=1`
        : `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(v.list)}&autoplay=1`;
      const yt = ids.length
        ? (v.videos || []).filter((x) => x.id).map((x) => `<a href="https://www.youtube.com/watch?v=${esc(x.id)}" target="_blank" rel="noopener">▶ ${esc(x.title || "觀看影片")} ↗</a>`).join("")
        : `<a href="https://www.youtube.com/playlist?list=${esc(v.list)}" target="_blank" rel="noopener">在 YouTube 開啟 ↗</a>`;
      return `<article class="card video" id="video-${esc(v.id)}">
        <div class="player" data-src="${esc(src)}">
          <button type="button" class="play" aria-label="播放：${esc(v.zh)}">
            <span class="pl-ic"><svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span>
            <span class="pl-t">${esc(v.zh)}</span>
            ${n ? `<span class="pl-n">${ids.length ? "" : "播放清單・"}${esc(n)} 部影片</span>` : ""}
          </button>
        </div>
        <h3>${esc(v.zh)}<span class="en">${esc(v.en || "")}</span></h3>
        <p class="desc">${esc(v.desc)}</p>
        ${v.tags && v.tags.length ? `<div class="tags">${v.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
        ${cs.length ? `<div class="links"><span class="lead">對應課程</span>${cs.map((c) => `<a href="#course-${esc(c.id)}">${esc(c.zh)}</a>`).join("")}</div>` : ""}
        <div class="links">${yt}</div>
      </article>`;
    }).join("");
    grid.addEventListener("click", (e) => {
      const b = e.target.closest(".play"); if (!b) return;
      const box = b.parentElement;
      box.innerHTML = `<iframe src="${esc(box.dataset.src)}" title="YouTube 影片" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe>`;
    });
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
    const TYPE = { poster: "Poster", journal: "Journal", book: "Book", talk: "Talk", conference: "Conference" };
    const pubs = (C.publications || []).slice().sort((a, b) => b.year - a.year);
    const years = [...new Set(pubs.map((p) => p.year))];
    $("#pubs").innerHTML = years.map((y) => `<div class="pub-year"><h3>${y}</h3><ol>${pubs.filter((p) => p.year === y).map((p) => `
      <li id="pub-${(C.publications || []).indexOf(p)}"><span class="ty">${esc(TYPE[p.type] || p.type || "")}</span><b>${esc(p.title)}</b><span class="au">${esc(p.authors)}</span><span class="ve">${esc(p.venue)}</span></li>`).join("")}</ol></div>`).join("");
  }

  function renderPI() {
    const P = C.pi || {};
    const initials = (P.nameZh || P.nameEn || "?").slice(-2);
    const hl = (P.highlights || []).map((h) => `<div><b>${esc(h.n)}</b><span>${esc(h.l)}</span></div>`).join("");
    $("#pi-card").innerHTML = `<div class="avatar">${P.photo ? `<img src="${esc(P.photo)}" alt="${esc(P.nameZh)}">` : esc(initials)}</div>
      <h3>${esc(P.nameZh)}</h3><div class="en">${esc(P.nameEn)}</div><div class="ti">${Array.isArray(P.title) ? P.title.map(esc).join("<br>") : esc(P.title)}</div><div class="un">${esc(P.unit || (C.lab || {}).unit)}</div>
      ${hl ? `<div class="pi-hl">${hl}</div>` : ""}`;
    const block = (t, arr) => (arr && arr.length ? `<div><h4>${t}</h4><ul>${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>` : "");
    $("#pi-cv").innerHTML = (P.bio ? `<p class="pi-bio">${esc(P.bio)}</p>` : "") +
      `<div class="cv-grid">${block("現任", P.current) + block("學歷", P.education) + block("經歷", P.experience) + block("專業服務", P.service) + block("計畫主持", P.projects) + block("獲獎", P.awards)}</div>`;
    const lic = P.licenses || [];
    const total = lic.reduce((n, g) => n + g.items.length, 0);
    $("#pi-lic").innerHTML = lic.length ? `<div class="lic-head"><h4>專業證照</h4><span>精選</span></div>
      <div class="lic-grid">${lic.map((g) => `<div class="lic-group"><div class="lic-g">${esc(g.group)}</div>${g.items.map((it) => `<div class="lic-item"><b>${esc(it.name)}</b>${it.note ? `<span>${esc(it.note)}</span>` : ""}</div>`).join("")}</div>`).join("")}</div>` : "";
    const O = P.outreach;
    if (O && O.text) $("#pi-out").innerHTML = `<div class="lic-head"><h4>${esc(O.title)}</h4></div><p class="out-text">${esc(O.text)}</p>`;
  }

  function renderContact() {
    const K = C.contact || {};
    const items = [["洽詢事項", K.topics], ["電子郵件", K.email, true], ["電話", K.phone], ["地址", K.address], ["GitHub", K.github]].filter(([, v]) => v);
    $("#contact").innerHTML = items.map(([k, v, copy]) => `<div class="card"><span class="k">${k}</span><span class="v">${k === "GitHub" ? `<a href="${esc(v)}">${esc(v)}</a>` : Array.isArray(v) ? v.map(esc).join("<br>") : esc(v)}</span>${copy ? `<button type="button" class="copy-btn" data-copy="${esc(v)}">複製</button>` : ""}</div>`).join("");
    $("#contact").addEventListener("click", (e) => {
      const b = e.target.closest(".copy-btn"); if (!b) return;
      const done = () => { b.textContent = "已複製"; setTimeout(() => (b.textContent = "複製"), 1600); };
      try { navigator.clipboard.writeText(b.dataset.copy).then(done, () => selectText(b)); } catch (err) { selectText(b); }
    });
    function selectText(b) { const r = document.createRange(); r.selectNodeContents(b.previousElementSibling); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
  }

  function renderFooter() {
    const cp = C.copyright || {}, L = C.lab || {};
    $("#footer").innerHTML = `<div class="wrap"><div><b>${esc(L.nameZh)}</b>　${esc(L.nameEn)}</div>${cp.holder ? `<div>© ${esc(cp.year || new Date().getFullYear())} ${esc(cp.holder)}　${esc(cp.note || "")}</div>` : ""}</div>`;
  }

  /* ---------- 導覽 ---------- */
  function navSetup() {
    const links = $(".nav-links"), btn = $("#menu-btn");
    btn.addEventListener("click", () => { const o = links.classList.toggle("open"); btn.setAttribute("aria-expanded", o); });
    links.addEventListener("click", (e) => { if (e.target.closest("a")) { links.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); } });
    $("#theme-btn").addEventListener("click", () => {
      const order = ["system", "light", "dark"]; const t = order[(order.indexOf(store.get(THEME_KEY, "system")) + 1) % 3];
      store.set(THEME_KEY, t); applyTheme(t); themeIcon();
    });
    themeIcon();
    if ("IntersectionObserver" in window) {
      const map = new Map([...links.querySelectorAll("a")].map((a) => [a.getAttribute("href").slice(1), a]));
      const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { map.forEach((a) => a.classList.remove("on")); const a = map.get(en.target.id); if (a) a.classList.add("on"); } }), { rootMargin: "-45% 0px -50% 0px" });
      document.querySelectorAll("section[id]").forEach((s) => io.observe(s));
    }
  }

  /* ---------- 搜尋 ---------- */
  function buildIndex() {
    const idx = [];
    const add = (type, title, sub, text, target) => idx.push({ type, title, sub, target, hay: [title, sub, text].join(" ").toLowerCase() });
    (C.courses || []).forEach((c) => add("課程", c.zh, [c.en, [].concat(c.tag || []).join("・"), c.code].filter(Boolean).join("・"), [c.desc, (c.topics || []).join(" "), c.semester].join(" "), "course-" + c.id));
    (C.platforms || []).forEach((p) => add("學習平台", p.zh, p.en, [p.desc, (p.tags || []).join(" "), p.stats].join(" "), "plat-" + p.id));
    (C.videos || []).forEach((v) => add("影音", v.zh, v.en, [v.desc, (v.tags || []).join(" "), (v.videos || []).map((x) => x.title).join(" "), "影片 YouTube"].join(" "), "video-" + v.id));
    (C.research || []).forEach((r, i) => add("研究", r.zh, r.en, [r.desc, (r.tags || []).join(" "), r.note].join(" "), "research-" + i));
    const PT = { poster: "poster 海報 研討會", journal: "journal 期刊 論文", book: "book 書 譯著 著作", talk: "talk 演講", conference: "conference 研討會 論文" };
    (C.publications || []).forEach((p, i) => add("發表", p.title, `${p.year}・${p.venue}`, [p.authors, PT[p.type] || p.type].join(" "), "pub-" + i));
    const P = C.pi || {};
    (P.licenses || []).forEach((g) => g.items.forEach((it) => add("證照", it.name, g.group, it.note, "pi-lic")));
    [["現任", P.current], ["學歷", P.education], ["經歷", P.experience], ["專業服務", P.service], ["計畫主持", P.projects], ["獲獎", P.awards]]
      .forEach(([k, arr]) => (arr || []).forEach((x) => add("主持人", x, k, "", "pi")));
    if (P.outreach) add("主持人", P.outreach.title, "公益服務", P.outreach.text, "pi-out");
    const K = C.contact || {};
    add("聯絡", "聯絡資訊", [K.email].filter(Boolean).join(""), [K.topics, [].concat(K.phone || []).join(" "), [].concat(K.address || []).join(" ")].join(" "), "contact-sec");
    return idx;
  }
  function searchSetup() {
    const layer = $("#search-layer"), input = $("#search-input"), list = $("#search-results"), hint = $("#search-hint");
    if (!layer) return;
    const INDEX = buildIndex();
    let cur = 0, results = [];
    const hl = (text, words) => { let out = esc(text); words.forEach((w) => { if (!w) return; const re = new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"); out = out.replace(re, (m) => `<mark>${m}</mark>`); }); return out; };
    function run() {
      const q = input.value.trim().toLowerCase();
      const words = q.split(/\s+/).filter(Boolean);
      if (!words.length) { results = []; list.innerHTML = ""; hint.textContent = "可搜尋課程名稱、課號、重點主題、平台、研究、論文題目、證照等。多個關鍵字用空白隔開。"; return; }
      results = INDEX.filter((e) => words.every((w) => e.hay.includes(w))).slice(0, 30);
      hint.textContent = results.length ? `找到 ${results.length} 筆` : "找不到符合的結果，試試其他關鍵字。";
      cur = 0;
      list.innerHTML = results.map((r, i) => `<li><button type="button" data-i="${i}" class="${i === 0 ? "on" : ""}"><span class="rt">${esc(r.type)}</span><span class="rb"><b>${hl(r.title, words)}</b>${r.sub ? `<small>${hl(r.sub, words)}</small>` : ""}</span></button></li>`).join("");
    }
    function open() { layer.hidden = false; document.body.style.overflow = "hidden"; input.value = ""; run(); setTimeout(() => input.focus(), 10); }
    function close() { layer.hidden = true; document.body.style.overflow = ""; }
    function go(i) {
      const r = results[i]; if (!r) return;
      close();
      const el = document.getElementById(r.target); if (!el) return;
      if (el.hidden || (el.closest(".card") && el.closest(".card").hidden)) { const all = $('#course-chips button[data-v="all"]'); if (all) all.click(); }
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash");
    }
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

  document.addEventListener("DOMContentLoaded", () => {
    renderHero(); renderCourses(); renderPlatforms(); renderVideos(); renderResearch(); renderPubs(); renderPI(); renderContact(); renderFooter(); navSetup(); searchSetup();
  });
})();
