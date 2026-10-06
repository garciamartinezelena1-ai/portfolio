/* ============================================================
   UI — TopBar, MobileMenu, Hero (3 variantes), Marquee, Slot
   ============================================================ */
const { useState, useEffect, useRef } = React;

/* image-slot wrapper */
function Slot({ id, src, placeholder, fit, shape, radius, style, className }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute("id", id);
    if (src) el.setAttribute("src", src); else el.removeAttribute("src");
    el.setAttribute("fit", fit || "cover");
    el.setAttribute("shape", shape || "rect");
    if (radius != null) el.setAttribute("radius", String(radius));
    el.setAttribute("placeholder", placeholder || "Arrastra una imagen");
  }, [id, src, placeholder, fit, shape, radius]);
  return React.createElement("image-slot", { ref, class: className, style });
}

/* Media — provided image renders as a plain <img> (reliable in every export);
   a missing image falls back to a drag-and-drop <image-slot>. */
function Media({ id, src, placeholder, alt, style }) {
  if (src) return <img className="slot-img" src={src} alt={alt || ""} style={style} />;
  return <Slot id={id} src="" placeholder={placeholder} style={style} />;
}

const NAV = [
  { id: "trabajos", label: "Índice" },
  { id: "sobre", label: "Sobre mí" },
  { id: "servicios", label: "Servicios" },
  { id: "sectores", label: "Sectores" },
  { id: "contacto", label: "Contacto" },
];

function go(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 54, behavior: "smooth" });
}

function TopBar({ onMenu }) {
  return (
    <header className="topbar">
      <div className="topbar__in">
        <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          Elena García<sup>®</sup>
        </a>
        <nav className="topnav">
          {NAV.map((n) => (
            <a key={n.id} href={"#" + n.id} onClick={(e) => { e.preventDefault(); go(n.id); }}>{n.label}</a>
          ))}
        </nav>
        <div className="topbar__right">
          <span className="status"><span className="dot"></span> Disponible · 2026</span>
          <button className="menu-btn" aria-label="Menú" onClick={onMenu}>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none"><path d="M0 1h18M0 6h18M0 11h18" stroke="currentColor" strokeWidth="1.4"/></svg>
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ onClose }) {
  return (
    <div className="mmenu">
      <div className="mmenu__top">
        <span className="brand" style={{ color: "var(--paper)" }}>Elena García<sup>®</sup></span>
        <button className="cls" onClick={onClose} aria-label="Cerrar">
          <svg width="16" height="16" viewBox="0 0 16 16"><path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.5"/></svg>
        </button>
      </div>
      <nav>
        {NAV.map((n) => (
          <a key={n.id} href={"#" + n.id} onClick={(e) => { e.preventDefault(); onClose(); setTimeout(() => go(n.id), 60); }}>{n.label}</a>
        ))}
      </nav>
      <div className="mmenu__foot">garciamartinezelena1@gmail.com · UX/UI · Web · WordPress</div>
    </div>
  );
}

/* ---------------- HERO ---------------- */
const ROLE_TAGS = ["UX/UI Design", "Diseño web estratégico", "WordPress & Elementor", "Producto digital", "SEO On-Page", "Branding digital"];

function HeroEditorial({ count }) {
  return (
    <section className="hero hero--editorial wrap" id="top">
      <span className="eyebrow rv">Portfolio · Diseñadora & Desarrolladora web</span>
      <h1 className="wordmark rv" style={{ marginTop: 18 }}>
        Elena<br /><span className="l2">García</span>
      </h1>
      <div className="hero__grid">
        <div className="rv">
          <div className="mono" style={{ color: "var(--ink-50)", marginBottom: 14 }}>UX/UI Designer · Web Designer · WordPress Developer</div>
          <p className="hero__intro">Diseño y desarrollo experiencias digitales claras, visuales y orientadas a negocio. Estrategia, diseño y código en un mismo lugar.</p>
        </div>
        <div className="rv">
          <div className="hero__role">
            {ROLE_TAGS.map((t) => <span key={t}>{t}</span>)}
          </div>
        </div>
      </div>
      <button className="scrollhint" onClick={() => go("trabajos")}>
        <span className="arr">↓</span> {count} proyectos seleccionados
      </button>
    </section>
  );
}

function RotatingWord({ words, interval = 2100 }) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);
  return <span className="rotw" key={i}>{words[i]}</span>;
}

function HeroIndex({ count }) {
  return (
    <section className="hero hero--index wrap" id="top">
      <span className="hero__arch" aria-hidden="true"></span>
      <div className="hero__top rv">
        <span className="eyebrow">Elena García — Diseñadora & Desarrolladora web</span>
        <span className="hero__place">Granada · ES</span>
      </div>

      <h1 className="hero__statement rv">
        <span className="g">Diseño</span> <span className="s">digital</span> <span className="g">con</span><br />
        <span className="s">alma</span> <span className="g">&amp;</span> <span className="s">método</span><span className="g">.</span>
      </h1>

      <div className="hero__grid hero__bottom">
        <p className="hero__intro ser rv">
          UX/UI, diseño web estratégico y WordPress. Construyo experiencias <em className="ser-it">intuitivas</em>, optimizadas y alineadas con los objetivos de cada negocio.
        </p>
        <div className="rv">
          <div className="hero__kinetic">
            <span className="hero__kinetic-lbl ser-it">Hago</span>
            <RotatingWord words={["Branding", "Diseño web", "Producto digital", "UX/UI Design", "SEO On-Page", "WordPress"]} />
          </div>
          <div className="hero__role" style={{ marginTop: 18 }}>
            {ROLE_TAGS.slice(0, 4).map((t) => <span key={t}>{t}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSplit({ count }) {
  return (
    <section className="hero hero--split wrap" id="top">
      <div className="hero__grid">
        <div className="hero__left rv">
          <div>
            <span className="eyebrow">Portfolio · 2026</span>
            <h1 className="wordmark" style={{ marginTop: 18 }}>Elena<br />García</h1>
            <div className="mono" style={{ color: "var(--ink-50)", marginTop: 16 }}>UX/UI · Web Design · WordPress Developer</div>
            <p className="hero__intro" style={{ marginTop: 22 }}>Entiendo el negocio, no solo el diseño. Por eso mis webs comunican mejor, se entienden y convierten.</p>
          </div>
          <div className="hero__statline">
            <div className="stat"><div className="n">{count}</div><div className="k">Proyectos</div></div>
            <div className="stat"><div className="n">13</div><div className="k">Sectores</div></div>
            <div className="stat"><div className="n">∞</div><div className="k">Iteraciones</div></div>
          </div>
        </div>
        <div className="hero__featured rv">
          <Media id="hero-featured" src="assets/parada.png" placeholder="Proyecto destacado" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        </div>
      </div>
    </section>
  );
}

function Hero({ variant, count }) {
  if (variant === "poster") return <HeroPoster count={count} />;
  if (variant === "index") return <HeroIndex count={count} />;
  if (variant === "split") return <HeroSplit count={count} />;
  return <HeroEditorial count={count} />;
}

function HeroPoster({ count }) {
  return (
    <section className="hero hero--poster" id="top">
      <div className="hero__bg" aria-hidden="true">
        <Slot id="hero-bg" src="" placeholder="Arrastra aquí tu foto de portada — un retrato o una imagen atmosférica" />
      </div>
      <div className="hero__scrim" aria-hidden="true"></div>
      <span className="hero__pgrain" aria-hidden="true"></span>

      <div className="hero__poster-in wrap">
        <div className="hero__ptop rv">
          <span className="eyebrow eyebrow--light">Elena García — Diseñadora & Desarrolladora web</span>
          <span className="hero__place">Granada · ES · Disponible 2026</span>
        </div>

        <div className="hero__pbottom">
          <h1 className="hero__statement--poster rv">
            Creo experiencias digitales <em>claras</em>, <em>cuidadas</em> y pensadas para <em>crecer</em>.
          </h1>
          <div className="hero__pmeta rv">
            <p className="hero__ptag">UX/UI · Diseño web estratégico · WordPress &amp; SEO. Estrategia, diseño y desarrollo en un mismo lugar.</p>
            <button className="scrollhint scrollhint--light" onClick={() => go("trabajos")}>
              <span className="arr">↓</span> Ver trabajos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee({ items }) {
  const seq = items.concat(items);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {seq.map((s, i) => <span key={i}>{s}</span>)}
      </div>
    </div>
  );
}

Object.assign(window, { Slot, Media, RotatingWord, TopBar, MobileMenu, Hero, Marquee, NAV, go, ROLE_TAGS });
