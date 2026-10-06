/* ============================================================
   WORK — toolbar, grid, list, project detail overlay
   ============================================================ */

const FILTERS = [
  { id: "all", label: "Todos", test: () => true },
  { id: "uxui", label: "UX/UI", test: (t) => t.some((x) => /ux|ui/i.test(x)) },
  { id: "brand", label: "Branding", test: (t) => t.some((x) => /brand|direcci/i.test(x)) },
  { id: "wp", label: "WordPress", test: (t) => t.some((x) => /wordpress/i.test(x)) },
  { id: "prod", label: "Producto", test: (t) => t.some((x) => /producto|product/i.test(x)) },
  { id: "seo", label: "SEO", test: (t) => t.some((x) => /seo/i.test(x)) },
];

function pad2(n) { return String(n + 1).padStart(2, "0"); }

/* ---------------- HORIZONTAL SCROLL CAROUSEL (estilo editorial) ---------------- */
function HWorks({ projects, onOpen }) {
  const outer = useRef(null);
  const track = useRef(null);
  const sticky = useRef(null);

  useEffect(() => {
    const o = outer.current, t = track.current, s = sticky.current;
    if (!o || !t || !s) return;
    let maxX = 0;
    const apply = () => {
      const total = o.offsetHeight - window.innerHeight;
      const rectTop = o.getBoundingClientRect().top;
      const prog = total > 0 ? Math.min(1, Math.max(0, -rectTop / total)) : 0;
      t.style.transform = "translate3d(" + (-prog * maxX) + "px,0,0)";
    };
    const measure = () => {
      maxX = Math.max(0, t.scrollWidth - s.clientWidth);
      o.style.height = (maxX + window.innerHeight) + "px";
      apply();
    };
    measure();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    t.querySelectorAll("img").forEach((im) => { if (!im.complete) im.addEventListener("load", measure); });
    const tm = setTimeout(measure, 500);
    return () => { window.removeEventListener("scroll", apply); window.removeEventListener("resize", measure); ro.disconnect(); clearTimeout(tm); };
  }, [projects]);

  return (
    <div className="hscroll" ref={outer}>
      <div className="hscroll__sticky" ref={sticky}>
        <div className="hscroll__rail">
          <div className="hscroll__track" ref={track}>
            {projects.map((p, i) => (
              <article className="hcard" key={p.id} onClick={() => onOpen(p)}>
                <div className="hcard__media">
                  <span className="hcard__num">{pad2(i)}</span>
                  {p.link && <span className="card__live">● Online</span>}
                  <Media id={"hcover-" + p.id} src={p.cover} alt={p.name} placeholder={p.name} />
                  <span className="card__open" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 12L12 2M5 2h7v7" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
                  </span>
                </div>
                <div className="hcard__cap">
                  <span className="hcard__name">{p.name}</span>
                  <span className="hcard__cat">{p.cat}</span>
                </div>
              </article>
            ))}
            <article className="hscroll__end">
              <span className="hscroll__end-q ser-it">¿Hacemos<br />el tuyo?</span>
              <button className="hscroll__cta" onClick={(e) => { e.stopPropagation(); go("contacto"); }}>Hablemos →</button>
            </article>
          </div>
        </div>
        <span className="hscroll__hint">Desliza ↓ para avanzar →</span>
      </div>
    </div>
  );
}

function Card({ p, idx, onOpen }) {
  return (
    <article className="card rv" onClick={() => onOpen(p)}>
      <div className="card__media">
        <span className="card__num">{pad2(idx)}</span>
        {p.link && <span className="card__live">● Online</span>}
        <Media id={"cover-" + p.id} src={p.cover} alt={p.name} placeholder={p.name} />
        <span className="card__open" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 12L12 2M5 2h7v7" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
        </span>
      </div>
      <div className="card__cap">
        <span className="card__name">{p.name}</span>
        <span className="card__cat">{p.cat}</span>
      </div>
    </article>
  );
}

function WorkList({ items, onOpen }) {
  return (
    <div className="worklist rv">
      {items.map((p, i) => (
        <div className="wl-row" key={p.id} onClick={() => onOpen(p)}>
          <span className="wl-num">{pad2(i)}</span>
          <span className="wl-name">{p.name}</span>
          <span className="wl-cat">{p.cat}</span>
          <span className="wl-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</span>
          <span className="wl-arr">
            <svg width="16" height="16" viewBox="0 0 14 14"><path d="M2 12L12 2M5 2h7v7" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
          </span>
          {p.cover && <img className="wl-thumb" src={p.cover} alt="" />}
        </div>
      ))}
    </div>
  );
}

function WorkSection({ projects, view, setView, onOpen }) {
  const [filter, setFilter] = useState("all");
  const f = FILTERS.find((x) => x.id === filter) || FILTERS[0];
  const items = projects.filter((p) => f.test(p.tags));

  return (
    <section className="section section--flush" id="trabajos" style={{ paddingTop: "clamp(30px,4vw,56px)" }}>
      <div className="wrap">
        <div className="works__bar">
          <div className="works__title">
            <h2>Trabajos seleccionados</h2>
            <sup>({String(projects.length).padStart(2, "0")})</sup>
          </div>
          <div className="works__tools">
            <div className="filters">
              {FILTERS.map((x) => (
                <button key={x.id} className="chip" aria-pressed={filter === x.id} onClick={() => setFilter(x.id)}>{x.label}</button>
              ))}
            </div>
            <div className="viewtoggle">
              <button aria-pressed={view === "carrusel"} onClick={() => setView("carrusel")}>Carrusel</button>
              <button aria-pressed={view === "grid"} onClick={() => setView("grid")}>Grid</button>
              <button aria-pressed={view === "list"} onClick={() => setView("list")}>Lista</button>
            </div>
          </div>
        </div>

        {view === "grid" ? (
          <div className="grid" key={filter}>
            {items.map((p, i) => <Card key={p.id} p={p} idx={projects.indexOf(p)} onOpen={onOpen} />)}
          </div>
        ) : view === "list" ? (
          <WorkList items={items} onOpen={onOpen} />
        ) : null}
      </div>
      {view === "carrusel" && <HWorks projects={items} onOpen={onOpen} key={filter} />}
    </section>
  );
}

/* ---------------- DETAIL OVERLAY ---------------- */
function ProjectDetail({ project, projects, onClose, onNav }) {
  const p = project;
  const idx = projects.findIndex((x) => x.id === p.id);
  const next = projects[(idx + 1) % projects.length];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const scroller = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  useEffect(() => { if (scroller.current) scroller.current.scrollTop = 0; }, [p.id]);
  useEffect(() => {
    const k = (e) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") onNav(next); if (e.key === "ArrowLeft") onNav(prev); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [p.id]);

  const gallery = p.gallery || [];

  return (
    <div className="detail" ref={scroller} role="dialog" aria-label={p.name}>
      <div className="detail__bar">
        <button className="bk" onClick={onClose}>
          <svg width="16" height="12" viewBox="0 0 16 12"><path d="M6 1L1 6l5 5M1 6h15" stroke="currentColor" strokeWidth="1.4" fill="none"/></svg>
          Volver al índice
        </button>
        <span className="pname">{p.name}</span>
        <button className="cls" onClick={onClose} aria-label="Cerrar">
          <svg width="14" height="14" viewBox="0 0 16 16"><path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.5"/></svg>
        </button>
      </div>

      <div className="detail__hero">
        <span className="detail__index">PROYECTO {pad2(idx)} / {String(projects.length).padStart(2, "0")}</span>
        <h1 className="detail__name">{p.name}</h1>
        <div className="detail__sub">
          <span className="mono">{p.cat}</span>
          {p.link && (
            <a className="dl-link" href={p.link} target="_blank" rel="noopener" style={{ marginTop: 0 }}>
              Ver web en vivo
              <svg width="12" height="12" viewBox="0 0 14 14"><path d="M2 12L12 2M5 2h7v7" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
            </a>
          )}
        </div>
        <div className="detail__cover">
          <Media id={"hero-" + p.id} src={p.cover} alt={p.name} placeholder={"Arrastra aquí la portada de " + p.name} />
        </div>
      </div>

      <div className="detail__body">
        <div className="detail__cols">
          <div>
            <div className="dl-block">
              <span className="lbl">Mi trabajo</span>
              <ul className="dl-work">
                {p.trabajo.map((t, i) => (
                  <li key={t}><span className="i">{pad2(i)}</span> {t}</li>
                ))}
              </ul>
            </div>
            <div className="dl-block">
              <span className="lbl">Disciplinas</span>
              <div className="dl-meta-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          </div>
          <div>
            <div className="dl-block">
              <span className="lbl">Objetivo</span>
              <p className="dl-obj">{p.objetivo}</p>
            </div>
            <div className="dl-block">
              <span className="lbl">Resultado</span>
              <p className="dl-res">{p.resultado}</p>
            </div>
          </div>
        </div>

        <div className={"detail__gallery" + (gallery.length === 1 ? "" : gallery.length >= 2 ? " two" : "")}>
          {gallery.length > 0
            ? gallery.map((g, i) => <Media key={i} id={"g-" + p.id + "-" + i} src={g} alt={p.name} placeholder="Imagen del proyecto" />)
            : <Slot id={"g-" + p.id + "-extra"} src="" placeholder={"Añade más imágenes de " + p.name + " (arrastra)"} />
          }
        </div>
      </div>

      <div className="detail__foot">
        <a className="detail__prev" onClick={(e) => { e.preventDefault(); onNav(prev); }} href="#">
          <div className="lbl">← Anterior</div>
          <div className="nm">{prev.name}</div>
        </a>
        <a className="detail__next" onClick={(e) => { e.preventDefault(); onNav(next); }} href="#">
          <div className="lbl">Siguiente →</div>
          <div className="nm">{next.name}</div>
        </a>
      </div>
    </div>
  );
}

Object.assign(window, { WorkSection, ProjectDetail, Card, WorkList });
