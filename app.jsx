/* ============================================================
   APP — estado, tweaks, reveal observer, render
   ============================================================ */
const { PROJECTS, SERVICES, SECTORS, PROCESS, ABOUT } = window.PORTFOLIO;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "arena",
  "nav": "caps",
  "hero": "poster",
  "type": "grotesca",
  "cols": 3,
  "defaultView": "carrusel"
}/*EDITMODE-END*/;

const THEMES = [
  { id: "arena", label: "Arena", paper: "#E9E2D4", ink: "#33291C", accent: "#9C6B3F" },
  { id: "oliva", label: "Oliva", paper: "#E7E5D5", ink: "#38402A", accent: "#41452C" },
  { id: "noche", label: "Noche", paper: "#EAE9E3", ink: "#1B2440", accent: "#1B2440" },
  { id: "crudo", label: "Crudo", paper: "#ECE3D4", ink: "#2A2018", accent: "#B4502B" },
  { id: "papel", label: "Papel", paper: "#F2F1EC", ink: "#17160F", accent: "#17160F" },
  { id: "salvia", label: "Salvia", paper: "#E7EAE0", ink: "#21301F", accent: "#21301F" },
  { id: "noir", label: "Noir", paper: "#14130E", ink: "#EEEAE0", accent: "#EEEAE0" },
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [view, setView] = useState(t.defaultView || "grid");
  const [active, setActive] = useState(null);
  const [menu, setMenu] = useState(false);

  // apply type personality + grid density
  useEffect(() => { document.documentElement.setAttribute("data-theme", t.theme || "arena"); }, [t.theme]);
  useEffect(() => { document.documentElement.setAttribute("data-hero", t.hero || "poster");
    const tb = document.querySelector(".topbar");
    if (tb && (t.hero || "poster") !== "poster") tb.classList.remove("over");
    requestAnimationFrame(() => window.dispatchEvent(new Event("scroll")));
  }, [t.hero]);
  useEffect(() => { document.documentElement.setAttribute("data-nav", t.nav || "caps"); }, [t.nav]);
  useEffect(() => { document.documentElement.setAttribute("data-type", t.type || "grotesca"); }, [t.type]);
  useEffect(() => { document.documentElement.style.setProperty("--cols", String(t.cols || 3)); }, [t.cols]);
  useEffect(() => { setView(t.defaultView || "grid"); }, [t.defaultView]);

  // reveal-on-scroll (scroll-position based — robust everywhere)
  useEffect(() => {
    let ticking = false;
    const reveal = () => {
      ticking = false;
      const h = window.innerHeight;
      document.querySelectorAll(".rv:not(.in)").forEach((el) => {
        if (el.getBoundingClientRect().top < h * 0.92) el.classList.add("in");
      });
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(reveal); } };
    reveal();
    requestAnimationFrame(reveal);
    setTimeout(reveal, 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const mo = new MutationObserver(onScroll);
    mo.observe(document.body, { childList: true, subtree: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(reveal);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); mo.disconnect(); };
  }, []);

  const open = (p) => setActive(p);
  const close = () => setActive(null);

  // Scroll progress + custom cursor follower over project cards
  const cursorRef = useRef(null);
  useEffect(() => {
    const bar = document.getElementById("scrollprog");
    const topbar = document.querySelector(".topbar");
    const onScroll = () => {
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
      }
      if (topbar) {
        const heroEl = document.getElementById("top");
        const isPoster = heroEl && heroEl.classList.contains("hero--poster");
        const overHero = isPoster && window.scrollY < heroEl.offsetHeight - 90;
        topbar.classList.toggle("over", !!overHero);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const cur = cursorRef.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
    const tick = () => { cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22; if (cur) cur.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`; raf = requestAnimationFrame(tick); };
    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      if (!cur) return;
      const hit = e.target.closest && e.target.closest(".card, .seccard, .hcard");
      cur.classList.toggle("on", !!hit);
    };
    if (fine && cur) { document.addEventListener("pointermove", onMove); raf = requestAnimationFrame(tick); }

    return () => {
      window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll);
      document.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="scrollprog" id="scrollprog"></div>
      <div className="curfollow" ref={cursorRef} aria-hidden="true">Ver ↗</div>
      <TopBar onMenu={() => setMenu(true)} />
      {menu && <MobileMenu onClose={() => setMenu(false)} />}

      <main>
        <Hero variant={t.hero} count={PROJECTS.length} />
        <WorkSection projects={PROJECTS} view={view} setView={setView} onOpen={open} />
        <About about={ABOUT} />
        <Services services={SERVICES} />
        <Sectors sectors={SECTORS} projects={PROJECTS} onOpenProject={open} />
        <Process process={PROCESS} />
        <Contact />
        <Footer />
      </main>

      {active && (
        <ProjectDetail project={active} projects={PROJECTS} onClose={close} onNav={(p) => setActive(p)} />
      )}

      <TweaksPanel>
        <TweakSection label="Paleta" />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: "2px 0 4px" }}>
          {THEMES.map((th) => {
            const sel = (t.theme || "arena") === th.id;
            return (
              <button key={th.id} onClick={() => setTweak("theme", th.id)} title={th.label}
                style={{ flex: "1 1 64px", minWidth: 60, cursor: "pointer", borderRadius: 9, padding: 4,
                  border: sel ? "2px solid #fff" : "2px solid transparent",
                  outline: sel ? "1px solid rgba(255,255,255,.4)" : "none",
                  background: "rgba(255,255,255,.06)" }}>
                <div style={{ height: 30, borderRadius: 5, background: th.paper, position: "relative", overflow: "hidden", border: "1px solid rgba(255,255,255,.15)" }}>
                  <div style={{ position: "absolute", left: 6, top: 6, width: 13, height: 13, borderRadius: "50%", background: th.ink }} />
                  <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 10, background: th.accent }} />
                </div>
                <div style={{ fontSize: 10, marginTop: 5, color: "rgba(255,255,255,.8)", fontFamily: "system-ui", textAlign: "center" }}>{th.label}</div>
              </button>
            );
          })}
        </div>
        <TweakSection label="Portada" />
        <TweakSelect label="Estilo de header" value={t.hero}
          options={[{ value: "poster", label: "Poster (foto a pantalla completa)" }, { value: "index", label: "Índice editorial" }, { value: "editorial", label: "Nombre grande" }, { value: "split", label: "Split con imagen" }]}
          onChange={(v) => setTweak("hero", v)} />
        <TweakSection label="Tipografía" />
        <TweakSelect label="Tipo del menú" value={t.nav}
          options={[{ value: "caps", label: "Sans versales" }, { value: "sans", label: "Sans normal" }, { value: "mono", label: "Mono (técnica)" }, { value: "serif", label: "Serif itálica" }]}
          onChange={(v) => setTweak("nav", v)} />
        <TweakSelect label="Personalidad" value={t.type}
          options={[{ value: "grotesca", label: "Grotesca neutra" }, { value: "caracter", label: "Grotesca con carácter" }, { value: "mixta", label: "Serif editorial + grotesca" }]}
          onChange={(v) => setTweak("type", v)} />
        <TweakSection label="Índice de trabajos" />
        <TweakRadio label="Columnas (grid)" value={t.cols}
          options={[{ value: 2, label: "2" }, { value: 3, label: "3" }, { value: 4, label: "4" }]}
          onChange={(v) => setTweak("cols", v)} />
        <TweakSelect label="Vista por defecto" value={t.defaultView}
          options={[{ value: "carrusel", label: "Carrusel horizontal" }, { value: "grid", label: "Grid" }, { value: "list", label: "Lista" }]}
          onChange={(v) => setTweak("defaultView", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
