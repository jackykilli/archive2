
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const money = n => CONFIG.moneda + n.toFixed(2);
  const page = document.body.dataset.page || "";

  const ART = {
    coat: `<path d="M62 30 Q100 50 138 30 L178 58 L168 96 L150 88 L150 222 L108 222 L104 110 L96 110 L92 222 L50 222 L50 88 L32 96 L22 58 Z"/>`,
    denim: `<path d="M62 30 Q100 50 138 30 L178 58 L168 96 L150 88 L150 222 L50 222 L50 88 L32 96 L22 58 Z"/><rect x="62" y="110" width="28" height="22" fill="#fff" opacity=".35"/><rect x="110" y="110" width="28" height="22" fill="#fff" opacity=".35"/><path d="M100 50 V222" stroke="#fff" stroke-opacity=".3" stroke-width="2" fill="none"/>`,
    tee: `<path d="M70 30 Q100 48 130 30 L185 62 L172 100 L150 90 L150 215 L50 215 L50 90 L28 100 L15 62 Z"/>`,
    hoodie: `<circle cx="100" cy="36" r="24"/><path d="M76 40 Q100 22 124 40 L186 72 L172 108 L150 98 L150 222 L50 222 L50 98 L28 108 L14 72 Z"/><path d="M90 150 H110 V180 H90 Z" fill="#fff" opacity=".3"/>`,
    pants: `<path d="M50 20 H150 L160 225 H110 L100 90 L90 225 H40 Z"/>`,
    bag: `<rect x="48" y="90" width="104" height="120" rx="8"/><path d="M74 92 Q74 40 100 40 Q126 40 126 92" fill="none" stroke="rgba(10,19,48,.85)" stroke-width="9"/>`,
    glasses: `<circle cx="62" cy="120" r="36"/><circle cx="138" cy="120" r="36"/><path d="M96 116 Q100 104 104 116" fill="none" stroke="rgba(10,19,48,.85)" stroke-width="8"/><path d="M26 112 L4 100 M174 112 L196 100" stroke="rgba(10,19,48,.85)" stroke-width="6" fill="none"/>`
  };
  const artSVG = t => `<svg class="art" viewBox="0 0 200 240" preserveAspectRatio="xMidYMid meet">${ART[t]}</svg>`;
  const photo = p => p.imagen ? `<div class="photo" style="background-image:url('${p.imagen}')"></div>` : "";

  /* ---------------- Carrito (localStorage) ---------------- */
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem("archive_cart") || "[]"); } catch (e) {}
  const saveCart = () => { try { localStorage.setItem("archive_cart", JSON.stringify(cart)); } catch (e) {} };
  const prod = id => PRODUCTOS.find(p => p.id === id);
  cart = cart.filter(i => prod(i.id));

  /* ---------------- Header / Footer / Carrito / Modal ---------------- */
  const nav = CONFIG.menu.map(m => `<li><a href="${m.href}" class="${m.id === page ? "active" : ""}">${m.texto}</a></li>`).join("");
  const logo = CONFIG.logoImagen
    ? `<img src="${CONFIG.logoImagen}" alt="${CONFIG.logoParte1} ${CONFIG.logoParte2}">`
    : `${CONFIG.logoParte1}<span>.</span>${CONFIG.logoParte2}`;

  /* Marquesina: repite los textos y duplica la mitad para que el loop no tenga saltos */
  function track(items, sep) {
    const list = [].concat(items);
    const half = Array.from({ length: Math.max(2, Math.ceil(12 / list.length)) }, () => list).flat()
      .map(t => `<span>${t}</span>${sep || ""}`).join("");
    return `<div class="track">${half}${half}</div>`;
  }

  const hdr = $("#app-header");
  if (hdr) hdr.innerHTML = `
    <div class="topbar">${track(CONFIG.barraSuperior)}</div>
    <header>
      <div class="nav-wrap">
        <div class="nav-left">
          <button class="menu-toggle" id="menuToggle" aria-label="Menú">&#9776;</button>
          <button class="icon-btn" id="searchBtn" aria-label="Buscar">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/></svg>
          </button>
        </div>
        <a href="index.html" class="logo">${logo}</a>
        <div class="icons">
          <button class="icon-btn" id="cartBtn" aria-label="Carrito">
            <svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
            <span class="badge" id="cartCount">0</span>
          </button>
        </div>
      </div>
      <nav id="mainNav"><ul>${nav}</ul></nav>
      <form class="search-bar" id="searchBar">
        <input id="searchInput" type="search" placeholder="Buscar prendas o marcas" aria-label="Buscar">
        <button class="btn btn-primary" type="submit">Buscar</button>
      </form>
    </header>`;

  const ftr = $("#app-footer");
  if (ftr) ftr.innerHTML = `
    <footer>
      <div class="foot-grid">
        <div><div class="logo">${logo}</div><p>${CONFIG.footerDescripcion}</p></div>
        <div><h5>Tienda</h5><ul>
          <li><a href="mujer.html">Mujer</a></li><li><a href="hombre.html">Hombre</a></li>
          <li><a href="accesorios.html">Accesorios</a></li><li><a href="productos.html">Archivo completo</a></li></ul></div>
        <div><h5>Marcas</h5><ul>${CONFIG.marcasFooter.map(m => `<li>${m}</li>`).join("")}</ul></div>
        <div><h5>Ayuda</h5><ul>
          <li><a href="contacto.html">Contacto</a></li><li><a href="ofertas.html">Ofertas</a></li>
          <li><a href="checkout.html">Finalizar compra</a></li></ul></div>
      </div>
      <div class="foot-pay">
        <div><h5>Medios de pago</h5><div class="pills">${CONFIG.metodosPago.map(m => `<span>${m}</span>`).join("")}</div></div>
        <div><h5>Medios de envío</h5><div class="pills">${CONFIG.mediosEnvio.map(m => `<span>${m}</span>`).join("")}</div></div>
      </div>
      <div class="copy">${CONFIG.copyright}</div>
    </footer>

    <div class="modal" id="modal"><div class="modal-box">
      <button class="modal-close" id="closeModal" aria-label="Cerrar">&times;</button>
      <div class="modal-grid">
        <div class="modal-img" id="mImg"></div>
        <div class="modal-info">
          <div class="brand" id="mBrand"></div><h2 id="mName"></h2><div class="price" id="mPrice"></div>
          <p id="mDesc"></p><ul class="specs" id="mSpecs"></ul>
          <div class="size-label">Talle <span id="mSizeHint"></span></div>
          <div class="sizes" id="mSizes"></div><div class="size-err" id="mErr"></div>
          <div class="modal-btns">
            <button class="btn btn-primary" id="mBuy">Comprar ahora</button>
            <button class="btn btn-dark" id="mAdd">Añadir al carrito</button>
          </div>
          <p class="size-guide">Medidas aproximadas. Si tenés dudas, escribinos antes de comprar.</p>
        </div>
      </div>
    </div></div>

    <div class="overlay" id="overlay"></div>
    <aside class="cart" id="cart" aria-label="Carrito">
      <div class="cart-head"><h3>Tu carrito</h3><button id="closeCart" style="font-size:24px">&times;</button></div>
      <div class="cart-body" id="cartBody"></div>
      <div class="cart-foot">
        <div class="total"><span>Subtotal</span><span id="cartTotal">${money(0)}</span></div>
        <button class="btn btn-primary" id="checkoutBtn">Finalizar compra</button>
      </div>
    </aside>
    <div class="toast" id="toast"></div>
    ${CONFIG.whatsapp ? `<a class="wa-float" href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M3 21l1.7-4.9A8.5 8.5 0 1 1 8 19.3L3 21z"/><path d="M9 11.5h.01M12 11.5h.01M15 11.5h.01"/></svg></a>` : ""}
    <div class="cookies" id="cookies"><p>Al navegar por este sitio guardamos tu carrito en tu navegador para agilizar tu compra. <a href="#" id="cookieOk">Entendido</a></p></div>`;

  /* ---------------- Aviso de cookies ---------------- */
  const ck = $("#cookies");
  if (ck) {
    let seen = false;
    try { seen = localStorage.getItem("archive_cookies") === "1"; } catch (e) {}
    if (seen) ck.remove();
    else $("#cookieOk").addEventListener("click", e => {
      e.preventDefault();
      try { localStorage.setItem("archive_cookies", "1"); } catch (err) {}
      ck.remove();
    });
  }

  let toastTimer;
  function showToast(msg) {
    const t = $("#toast"); if (!t) return;
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
  }

  const subtotal = () => cart.reduce((s, i) => s + i.qty * prod(i.id).precio, 0);

  function updateCart() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    const badge = $("#cartCount"); if (badge) badge.textContent = count;
    const total = $("#cartTotal"); if (total) total.textContent = money(subtotal());
    const body = $("#cartBody"); if (!body) return;
    if (!cart.length) { body.innerHTML = `<p class="cart-empty">Tu carrito está vacío.</p>`; return; }
    body.innerHTML = cart.map(i => {
      const p = prod(i.id), key = i.id + "-" + i.size;
      return `<div class="cart-item">
        <div class="cart-thumb" style="background:${p.color}">${artSVG(p.dibujo)}${photo(p)}</div>
        <div><small>${p.marca}</small><h5>${p.nombre}</h5><small>Talle: ${i.size} · ${money(p.precio)}</small>
          <div class="qty"><button data-dec="${key}">−</button><span>${i.qty}</span><button data-inc="${key}">+</button></div>
          <button class="remove" data-rm="${key}">Eliminar</button></div>
        <strong>${money(p.precio * i.qty)}</strong></div>`;
    }).join("");
  }

  function addToCart(id, size) {
    const item = cart.find(i => i.id === id && i.size === size);
    if (item) item.qty++; else cart.push({ id, size, qty: 1 });
    saveCart(); updateCart(); renderSummary();
    showToast(`${prod(id).nombre} (${size}) añadido al carrito`);
  }
  function changeQty(key, d) {
    const i = cart.find(x => x.id + "-" + x.size === key); if (!i) return;
    i.qty += d; if (i.qty <= 0) cart = cart.filter(x => x !== i);
    saveCart(); updateCart(); renderSummary();
  }
  function openCart(open) {
    $("#cart").classList.toggle("open", open); $("#overlay").classList.toggle("show", open);
  }

  if ($("#cartBtn")) {
    $("#cartBtn").addEventListener("click", () => openCart(true));
    $("#closeCart").addEventListener("click", () => openCart(false));
    $("#overlay").addEventListener("click", () => openCart(false));
    $("#cartBody").addEventListener("click", e => {
      const t = e.target;
      if (t.dataset.inc) changeQty(t.dataset.inc, 1);
      if (t.dataset.dec) changeQty(t.dataset.dec, -1);
      if (t.dataset.rm) { const k = t.dataset.rm; cart = cart.filter(x => x.id + "-" + x.size !== k); saveCart(); updateCart(); renderSummary(); }
    });
    $("#checkoutBtn").addEventListener("click", () => {
      if (!cart.length) return showToast("Tu carrito está vacío");
      location.href = "checkout.html";
    });
    $("#menuToggle").addEventListener("click", () => $("#mainNav").classList.toggle("open"));
  }

  /* ---------------- Buscador ---------------- */
  const searchBar = $("#searchBar");
  if (searchBar) {
    $("#searchBtn").addEventListener("click", () => {
      searchBar.classList.toggle("open");
      if (searchBar.classList.contains("open")) $("#searchInput").focus();
    });
    searchBar.addEventListener("submit", e => {
      e.preventDefault();
      const v = $("#searchInput").value.trim();
      location.href = "productos.html" + (v ? "?q=" + encodeURIComponent(v) : "");
    });
  }

  /* ---------------- Modal de prenda ---------------- */
  let mProd = null, mSize = null;
  function openModal(id) {
    mProd = prod(id); mSize = null; const p = mProd;
    $("#mImg").innerHTML = `<div style="position:absolute;inset:0;background:${p.color}"></div>${artSVG(p.dibujo)}${photo(p)}`;
    $("#mBrand").textContent = p.marca; $("#mName").textContent = p.nombre;
    $("#mPrice").innerHTML = money(p.precio) + (p.precioAnterior ? `<s style="color:var(--muted);font-weight:400;margin-left:8px">${money(p.precioAnterior)}</s>` : "");
    $("#mDesc").textContent = p.descripcion;
    $("#mSpecs").innerHTML = p.detalles.map(s => `<li>${s}</li>`).join("");
    $("#mSizes").innerHTML = p.talles.map(s => `<button class="size-btn" data-size="${s}">${s}</button>`).join("");
    $("#mSizeHint").textContent = p.talles.length === 1 ? "Talle único" : "Elegí un talle";
    if (p.talles.length === 1) { mSize = p.talles[0]; $("#mSizes .size-btn").classList.add("active"); }
    $("#mErr").textContent = "";
    $("#modal").classList.add("show");
  }
  const closeModal = () => $("#modal").classList.remove("show");
  if ($("#modal")) {
    $("#mSizes").addEventListener("click", e => {
      const b = e.target.closest(".size-btn"); if (!b) return;
      mSize = b.dataset.size;
      $$(".size-btn").forEach(x => x.classList.toggle("active", x === b));
      $("#mErr").textContent = ""; $("#mSizeHint").textContent = "Talle: " + mSize;
    });
    const need = () => { if (!mSize) { $("#mErr").textContent = "Por favor elegí un talle."; return false; } return true; };
    $("#mAdd").addEventListener("click", () => { if (need()) { addToCart(mProd.id, mSize); closeModal(); } });
    $("#mBuy").addEventListener("click", () => { if (need()) { addToCart(mProd.id, mSize); location.href = "checkout.html"; } });
    $("#closeModal").addEventListener("click", closeModal);
    $("#modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
  }

  /* ---------------- Listado de productos ---------------- */
  const grid = $("#productGrid");
  if (grid) {
    const fixedCat = grid.dataset.categoria || "all";
    const onlyOffers = grid.dataset.ofertas === "true";
    const limit = Number(grid.dataset.limite) || 0;
    const q = (new URLSearchParams(location.search).get("q") || "").trim().toLowerCase();
    if (q && $("#searchInput")) { $("#searchInput").value = q; }
    const qMarca = new URLSearchParams(location.search).get("marca");
    let fCat = fixedCat, fBrand = "all", fSort = "default";

    const brandSel = $("#brandSelect");
    if (brandSel) [...new Set(PRODUCTOS.map(p => p.marca))].sort().forEach(b => brandSel.add(new Option(b, b)));
    if (brandSel && qMarca && PRODUCTOS.some(p => p.marca === qMarca)) { fBrand = qMarca; brandSel.value = qMarca; }

    function render() {
      let list = PRODUCTOS.filter(p =>
        (fCat === "all" || p.categoria === fCat) && (fBrand === "all" || p.marca === fBrand) &&
        (!onlyOffers || p.precioAnterior) &&
        (!q || [p.nombre, p.marca, p.categoria, p.descripcion].join(" ").toLowerCase().includes(q)));
      if (fSort === "asc") list = [...list].sort((a, b) => a.precio - b.precio);
      if (fSort === "desc") list = [...list].sort((a, b) => b.precio - a.precio);
      if (limit) list = list.slice(0, limit);
      if (!list.length) { grid.innerHTML = `<div class="empty-grid">No hay productos con estos filtros.</div>`; return; }
      grid.innerHTML = list.map(p => `
        <div class="product" data-open="${p.id}">
          <div class="product-img" style="background:${p.color}">
            ${p.etiqueta ? `<span class="tag ${p.etiqueta === "Oferta" ? "sale" : ""}">${p.etiqueta}</span>` : ""}
            ${artSVG(p.dibujo)}${photo(p)}
            <span class="add-btn">Ver talles y comprar</span>
          </div>
          <div class="brand">${p.marca}</div><h4>${p.nombre}</h4>
          <div class="meta">${p.categoria.charAt(0).toUpperCase() + p.categoria.slice(1)}</div>
          <p class="desc">${p.descripcion}</p>
          <div class="price">${money(p.precio)}${p.precioAnterior ? `<s>${money(p.precioAnterior)}</s>` : ""}</div>
        </div>`).join("");
    }
    grid.addEventListener("click", e => { const c = e.target.closest("[data-open]"); if (c) openModal(Number(c.dataset.open)); });
    const filters = $("#filters");
    if (filters) filters.addEventListener("click", e => {
      const chip = e.target.closest(".chip"); if (!chip) return;
      $$(".chip").forEach(c => c.classList.remove("active")); chip.classList.add("active");
      fCat = chip.dataset.filter; render();
    });
    if (brandSel) brandSel.addEventListener("change", e => { fBrand = e.target.value; render(); });
    const sortSel = $("#sortSelect");
    if (sortSel) sortSel.addEventListener("change", e => { fSort = e.target.value; render(); });
    render();
  }

  /* ---------------- Hero (slider) ---------------- */
  const hero = $("#hero");
  if (hero) {
    const slides = $$(".slide", hero), dots = $("#heroDots");
    let cur = 0, timer;
    dots.innerHTML = slides.map((_, i) => `<button data-i="${i}" aria-label="Ir a la imagen ${i + 1}"></button>`).join("");
    const go = n => {
      cur = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle("active", i === cur));
      $$("button", dots).forEach((b, i) => b.classList.toggle("active", i === cur));
    };
    const auto = () => { clearInterval(timer); timer = setInterval(() => go(cur + 1), 6000); };
    $(".hero-prev", hero).addEventListener("click", () => { go(cur - 1); auto(); });
    $(".hero-next", hero).addEventListener("click", () => { go(cur + 1); auto(); });
    dots.addEventListener("click", e => { const b = e.target.closest("button"); if (b) { go(Number(b.dataset.i)); auto(); } });
    go(0); auto();
  }

  /* ---------------- Franja negra con ✕ ---------------- */
  const mq = $("#marquee");
  if (mq) mq.innerHTML = track(CONFIG.marquesina, "<i>&#10005;</i>");

  /* ---------------- Secciones (carrusel de categorías) ---------------- */
  const cf = $("#coverflow");
  if (cf) {
    const cards = $$(".cf-card", cf), n = cards.length;
    let cur = 0;
    const place = () => cards.forEach((c, i) => {
      let o = ((i - cur) % n + n) % n; if (o > n / 2) o -= n;
      c.className = "cf-card " + (o === 0 ? "p0" : o === 1 ? "p1" : o === -1 ? "pm1" : "px");
      c.tabIndex = Math.abs(o) > 1 ? -1 : 0;
    });
    const move = d => { cur = (cur + d + n) % n; place(); };
    $(".cf-prev", cf).addEventListener("click", () => move(-1));
    $(".cf-next", cf).addEventListener("click", () => move(1));
    let x0 = null;
    cf.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
    cf.addEventListener("touchend", e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) move(dx < 0 ? 1 : -1);
    });
    document.addEventListener("keydown", e => {
      if (e.target.closest("input, textarea, select")) return;
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
    });
    place();
  }

  /* ---------------- Preguntas frecuentes ---------------- */
  const faqBox = $("#faq");
  if (faqBox) faqBox.innerHTML = `<div class="faq">
    <div class="faq-side">
      <small>Ayuda</small><h2>Preguntas frecuentes</h2>
      <a class="btn btn-primary" href="${CONFIG.instagram.url}" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>
        ¿Otra duda? Mandanos un DM</a>
    </div>
    <div class="faq-list">${CONFIG.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join("")}</div>
  </div>`;

  /* ---------------- Sección Instagram ---------------- */
  const igBox = $("#instagram");
  if (igBox) {
    const ig = CONFIG.instagram;
    igBox.innerHTML = `<div class="container ig-grid">
      <div class="ig-card">
        <div class="ig-avatar"><div style="background-image:url('${ig.avatar}'),linear-gradient(160deg,#6d8fd6,#1c3a7a)"></div></div>
        <div class="ig-info">
          <h3>${ig.usuario}</h3>
          <p class="ig-stats"><b>${ig.seguidores}</b> <span>seguidores</span> <b>${ig.seguidos}</b> <span>seguidos</span></p>
          <div class="ig-bio">${ig.bio.map(l => `<div>${l}</div>`).join("")}</div>
        </div>
        <a class="ig-pill" href="${ig.url}" target="_blank" rel="noopener">${ig.etiqueta}</a>
      </div>
      <div class="ig-text">
        <small>${ig.supratitulo}</small>
        <h2>${ig.titulo}</h2>
        <a class="btn btn-primary" href="${ig.url}" target="_blank" rel="noopener">${ig.boton}</a>
      </div></div>`;
  }

  /* ---------------- Cuenta regresiva (Ofertas) ---------------- */
  if ($("#countdown")) {
    const end = new Date(CONFIG.ofertaHasta).getTime();
    const tick = () => {
      let d = Math.max(0, end - Date.now());
      const v = { d: Math.floor(d / 864e5) }; d %= 864e5;
      v.h = Math.floor(d / 36e5); d %= 36e5; v.m = Math.floor(d / 6e4); d %= 6e4; v.s = Math.floor(d / 1e3);
      Object.keys(v).forEach(k => $(`[data-u="${k}"]`).textContent = String(v[k]).padStart(2, "0"));
    };
    tick(); setInterval(tick, 1000);
  }

  /* ---------------- Newsletter y Contacto (sin servidor) ---------------- */
  const news = $("#newsForm");
  if (news) news.addEventListener("submit", e => { e.preventDefault(); showToast("¡Suscripción exitosa!"); e.target.reset(); });

  const cform = $("#contactForm");
  if (cform) cform.addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(cform);
    const body = `Nombre: ${f.get("nombre")}\nEmail: ${f.get("email")}\n\n${f.get("mensaje")}`;
    location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(f.get("asunto") || "Consulta")}&body=${encodeURIComponent(body)}`;
  });
  const wa = $("#waBtn");
  if (wa) { if (CONFIG.whatsapp) wa.href = `https://wa.me/${CONFIG.whatsapp}`; else wa.style.display = "none"; }

  /* ---------------- Checkout ---------------- */
  function shipping() { return cart.length && subtotal() < CONFIG.envioGratisDesde ? CONFIG.costoEnvio : 0; }

  function renderSummary() {
    const box = $("#orderSummary"); if (!box) return;
    if (!cart.length) { box.innerHTML = `<p class="cart-empty">Tu carrito está vacío. <a href="productos.html" style="color:var(--accent)">Ver productos</a></p>`; return; }
    const env = shipping();
    box.innerHTML = cart.map(i => { const p = prod(i.id);
      return `<div class="sum-item"><div>${p.nombre} × ${i.qty}<small>${p.marca} · Talle ${i.size}</small></div><strong>${money(p.precio * i.qty)}</strong></div>`; }).join("") +
      `<div class="sum-line"><span>Subtotal</span><span>${money(subtotal())}</span></div>
       <div class="sum-line"><span>Envío</span><span>${env ? money(env) : "Gratis"}</span></div>
       <div class="sum-total"><span>Total</span><span>${money(subtotal() + env)}</span></div>`;
  }

  const form = $("#checkoutForm");
  if (form) {
    const pay = $("#pago"); CONFIG.metodosPago.forEach(m => pay.add(new Option(m, m)));
    renderSummary();
    form.addEventListener("submit", e => {
      e.preventDefault();
      if (!cart.length) return showToast("Tu carrito está vacío");
      const f = Object.fromEntries(new FormData(form));
      const env = shipping(), total = subtotal() + env;
      const lineas = cart.map(i => { const p = prod(i.id); return `• ${p.nombre} (${p.marca}) talle ${i.size} × ${i.qty} = ${money(p.precio * i.qty)}`; });
      const resumen = `PEDIDO - ${CONFIG.logoParte1}.${CONFIG.logoParte2}\n\n${lineas.join("\n")}\n\nEnvío: ${env ? money(env) : "Gratis"}\nTOTAL: ${money(total)}\nPago: ${f.pago}\n\nCliente: ${f.nombre} ${f.apellido}\nDNI: ${f.dni}\nEmail: ${f.email}\nTeléfono: ${f.telefono}\nDirección: ${f.direccion}${f.piso ? ", " + f.piso : ""}\n${f.ciudad}, ${f.provincia} (CP ${f.cp})${f.notas ? "\nNotas: " + f.notas : ""}`;
      $("#checkoutWrap").style.display = "none";
      const ok = $("#confirmacion"); ok.style.display = "block";
      $("#okNombre").textContent = f.nombre;
      $("#okResumen").textContent = resumen;
      $("#okMail").href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Nuevo pedido - " + f.nombre + " " + f.apellido)}&body=${encodeURIComponent(resumen)}`;
      const okWa = $("#okWa");
      if (CONFIG.whatsapp) okWa.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(resumen)}`; else okWa.style.display = "none";
      cart = []; saveCart(); updateCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  updateCart();
})();
