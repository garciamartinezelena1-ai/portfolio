/* ============================================================
   SECTIONS — About, Services, Sectors, Process, Contact, Footer
   ============================================================ */

function About({ about }) {
  return (
    <section className="section" id="sobre">
      <div className="wrap">
        <div className="section__head">
          <div>
            <span className="eyebrow rv">Sobre mí</span>
            <h2 className="section__title mt rv">Hola, soy <span className="it">Elena</span>.</h2>
          </div>
          <p className="section__lead rv">Diseñadora UX/UI y desarrolladora web. Uno <em>estrategia</em>, <em>diseño</em> y <em>desarrollo</em> para que tu marca comunique mejor y crezca.</p>
        </div>
        <div className="about__grid">
          <div className="about__portrait rv">
            <Slot id="about-portrait" src="" placeholder="Arrastra aquí tu retrato" />
            <span className="about__sig">Elena García</span>
          </div>
          <div className="about__col rv">
            <p className="about__big">{about}</p>
            <div className="about__meta">
              <div className="about__metaItem"><span className="k">Base</span><span className="v">Granada · ES</span></div>
              <div className="about__metaItem"><span className="k">Modalidad</span><span className="v">Freelance · Remoto</span></div>
              <div className="about__metaItem"><span className="k">Stack</span><span className="v">Figma · WordPress · Elementor</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ services }) {
  return (
    <section className="section" id="servicios">
      <div className="wrap">
        <div className="section__head">
          <div>
            <span className="eyebrow rv">Qué hago</span>
            <h2 className="section__title mt rv">Servicios</h2>
          </div>
          <p className="section__lead rv">Un mismo proyecto, <em>de principio a fin</em>: de la estrategia al diseño, del diseño al desarrollo y del desarrollo al crecimiento.</p>
        </div>
        <div className="svcs">
          {services.map((s) => (
            <div className="svc rv" key={s.n}>
              <span className="svc__n">{s.n}</span>
              <div>
                <h3 className="svc__title">{s.title}</h3>
                <p className="svc__desc">{s.desc}</p>
                <div className="svc__items">{s.items.map((i) => <span key={i}>{i}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sectors({ sectors, projects, onOpenProject }) {
  const [activeSector, setActiveSector] = useState(null);

  // Mapa sector → proyectos
  const MAP = {
    "Arquitectura": ["balzar"],
    "Hospitality y turismo": ["parada", "villakali"],
    "Hoteles y alojamientos": ["villakali", "parada"],
    "Bienestar y salud": ["natuurlijk", "nutricion"],
    "Nutrición": ["nutricion"],
    "Belleza y estética": ["natuurlijk"],
    "Tecnología": ["essedi", "gevotec", "purplefish"],
    "SaaS y producto digital": ["globaldream", "alcaldia"],
    "Formación": [],
    "Consultoría": ["essedi"],
    "Organizaciones deportivas": ["granada"],
    "ONG e impacto social": ["globaldream"],
    "Servicios profesionales": ["sauceman", "purplefish"],
  };
  const projectsFor = (sector) => (MAP[sector] || []).map((id) => projects.find((p) => p.id === id)).filter(Boolean);

  return (
    <section className="section" id="sectores">
      <div className="wrap">
        <div className="section__head">
          <div>
            <span className="eyebrow rv">Experiencia real</span>
            <h2 className="section__title mt rv">Sectores</h2>
          </div>
          <p className="sectors__lead rv">He trabajado con marcas, empresas y profesionales de sectores muy diversos. <strong style={{ color: "var(--ink)" }}>Pulsa un sector</strong> para ver los proyectos relacionados.</p>
        </div>
        <div className="sectorlist">
          {sectors.map((s, i) => {
            const n = projectsFor(s).length;
            return (
              <button className="sector rv" key={s} onClick={() => setActiveSector(s)} disabled={n === 0} aria-label={`Ver proyectos de ${s}`}>
                <span className="si">{String(i + 1).padStart(2, "0")}</span>
                <span className="sector__name">{s}</span>
                <span className="sector__count">{n > 0 ? n : "—"}</span>
                <span className="sector__arr" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 14 14"><path d="M2 12L12 2M5 2h7v7" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <Marquee items={["Arquitectura", "Hospitality", "Salud", "Tecnología", "Deporte", "Bienestar", "ONG", "Consultoría", "Turismo", "Nutrición"]} />

      {activeSector && (
        <SectorModal
          sector={activeSector}
          items={projectsFor(activeSector)}
          onClose={() => setActiveSector(null)}
          onOpenProject={(p) => { setActiveSector(null); onOpenProject(p); }}
        />
      )}
    </section>
  );
}

function SectorModal({ sector, items, onClose, onOpenProject }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const k = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, []);
  return (
    <div className="secmodal" role="dialog" aria-label={"Proyectos de " + sector} onClick={onClose}>
      <div className="secmodal__panel" onClick={(e) => e.stopPropagation()}>
        <div className="secmodal__head">
          <div>
            <span className="secmodal__ey">Sector · {String(items.length).padStart(2, "0")} {items.length === 1 ? "proyecto" : "proyectos"}</span>
            <h3 className="secmodal__title">{sector}</h3>
          </div>
          <button className="secmodal__x" onClick={onClose} aria-label="Cerrar">
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.6"/></svg>
          </button>
        </div>
        <div className="secmodal__body">
          {items.length === 0 ? (
            <p className="secmodal__empty">Pronto añadiré proyectos de este sector.</p>
          ) : (
            <div className="secmodal__grid">
              {items.map((p) => (
                <button className="seccard" key={p.id} onClick={() => onOpenProject(p)}>
                  <div className="seccard__media">
                    {p.cover
                      ? <img src={p.cover} alt={p.name} />
                      : <span className="seccard__ph">{p.name}</span>}
                    <span className="seccard__open" aria-hidden="true">
                      <svg width="13" height="13" viewBox="0 0 14 14"><path d="M2 12L12 2M5 2h7v7" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
                    </span>
                  </div>
                  <div className="seccard__meta">
                    <span className="seccard__name">{p.name}</span>
                    <span className="seccard__cat">{p.cat}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Process({ process }) {
  return (
    <section className="section" id="proceso">
      <div className="wrap">
        <div className="section__head">
          <div>
            <span className="eyebrow rv">Cómo trabajo</span>
            <h2 className="section__title mt rv">Proceso</h2>
          </div>
          <p className="section__lead rv">Un método claro en cinco fases. Ordenar la información y <em>entender el negocio</em> es la mitad del trabajo.</p>
        </div>
        <div className="process__rows">
          {process.map((s) => (
            <div className="proc rv" key={s.n}>
              <span className="proc__n">{s.n}</span>
              <h3 className="proc__t">{s.title}</h3>
              <p className="proc__d">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact" id="contacto">
      <div className="wrap">
        <span className="eyebrow rv">Hablemos</span>
        <h2 className="contact__big rv">
          <a href="mailto:garciamartinezelena1@gmail.com">¿Empezamos<br />tu <span className="it">proyecto?</span></a>
        </h2>
        <div className="contact__row rv">
          <div className="cc">
            <span className="k">Email</span>
            <span className="v"><a href="mailto:garciamartinezelena1@gmail.com">garciamartinezelena1@gmail.com</a></span>
          </div>
          <div className="cc">
            <span className="k">LinkedIn</span>
            <span className="v"><a href="https://www.linkedin.com/search/results/all/?keywords=Elena%20Garcia%20Martinez" target="_blank" rel="noopener">Elena García Martínez</a></span>
          </div>
          <div className="cc">
            <span className="k">Disponibilidad</span>
            <span className="v">Proyectos freelance · 2026</span>
          </div>
          <div className="cc">
            <span className="k">Servicios</span>
            <span className="v">UX/UI · Web · WordPress · SEO</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap footer__in">
        <div className="footer__mark">Elena<br />García</div>
        <div className="footer__meta">
          UX/UI · WEB · WORDPRESS<br />
          GRANADA · ESPAÑA<br />
          © {year} — TODOS LOS DERECHOS RESERVADOS<br />
          <a className="totop" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>↑ Volver arriba</a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { About, Services, Sectors, SectorModal, Process, Contact, Footer });
