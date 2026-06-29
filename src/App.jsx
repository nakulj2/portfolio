import { useEffect, useRef, useState } from "react";
import "./App.css";

const NAME = "Nakul Jain";
const ROLE = "AI Engineer";

const LINKS = [
  { label: "Email", href: "mailto:nakuljain2002@gmail.com", value: "nakuljain2002@gmail.com" },
  { label: "GitHub", href: "https://github.com/nakulj2", value: "github.com/nakulj2" },
  { label: "LinkedIn", href: "https://linkedin.com/in/nakul-jain-uiuc", value: "linkedin.com/in/nakul-jain-uiuc" },
];

const EXPERIENCE = [
  {
    role: "AI Software Engineer",
    org: "PeoplePlus Software",
    loc: "Ann Arbor, MI",
    period: "Aug 2025 — Present",
    current: true,
    desc: "Leading AI systems for the iM3 SCM platform — MCP-based recommendation engines that drive real-time technician decisions across 7 enterprise clients.",
    tags: ["LangChain", "MCP", "Azure Foundry"],
  },
  {
    role: "AI Software Engineer",
    org: "Quilt AI LLC",
    loc: "Boston, MA",
    period: "Jul 2024 — Jul 2025",
    desc: "Built LLM-powered automation — document parsers, OCR pipelines, and batch-inference services with Python, FastAPI, and Docker on cloud-native infra.",
    tags: ["LLMs", "FastAPI", "OCR", "Docker"],
  },
  {
    role: "Software Engineering Intern",
    org: "Ensuredit",
    loc: "New Delhi, India",
    period: "Jun 2023 — Aug 2023",
    desc: "Shipped a Rasa + OpenAI customer chatbot that cut query-resolution time by 32%, plus React/TypeScript real-time messaging UIs.",
    tags: ["Rasa", "React", "WebSocket", "AWS"],
  },
  {
    role: "Software Intern · Data Engineering",
    org: "Brudata Technologies",
    loc: "Gainesville, VA",
    period: "Jun 2023 — Jul 2023",
    desc: "Built synthetic-data pipelines with Docker, Airflow, and Kafka streaming to cut ingestion latency across ETL workflows.",
    tags: ["Airflow", "Kafka", "SQL"],
  },
  {
    role: "ML Research Assistant",
    org: "University of Illinois — Mathematics",
    loc: "Champaign, IL",
    period: "Aug 2021 — Jan 2022",
    desc: "Built ETL and forecasting tools for sports analytics under Prof. A.J. Hildebrand using Python and statistical models.",
    tags: ["Python", "Forecasting", "ETL"],
  },
];

const SKILLS = [
  { group: "Languages", items: ["Python", "C++", "Java", "JavaScript", "TypeScript", "SQL"] },
  { group: "AI & ML", items: ["LLMs", "Prompt Engineering", "Agentic AI", "PyTorch", "TensorFlow", "scikit-learn"] },
  { group: "Systems", items: ["API Infrastructure", "Distributed Systems", "Data Pipelines", "Databases"] },
  { group: "Cloud & DevOps", items: ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD"] },
  { group: "Frameworks", items: ["Flask", "FastAPI", "React", "LangChain", "Airflow", "Pinecone"] },
];

const PROJECTS = [
  {
    title: "File Classifier",
    repo: "join-the-siege",
    href: "https://github.com/nakulj2/join-the-siege",
    desc: "Multimodal classifier for documents and media — DistilBERT for text, CNN + Gemini for audio/video — served behind a containerized Flask API on Docker and GCP.",
    tags: ["Python", "Flask", "Docker"],
    icon: "layers",
  },
  {
    title: "DQN & Double DQN",
    repo: "DQN---DDQN",
    href: "https://github.com/nakulj2/DQN---DDQN",
    desc: "Deep Q-Network and Double DQN agents that learn to play Atari Breakout from raw pixels via OpenAI Gym, with an optional LSTM state-encoding variant.",
    tags: ["PyTorch", "RL", "Gym"],
    icon: "network",
  },
  {
    title: "Athlete Data Analysis",
    repo: "Athlete-Data-Analysis",
    href: "https://github.com/nakulj2/Athlete-Data-Analysis",
    desc: "Exploratory analysis and linear-regression modeling of athlete body records using pandas, seaborn, plotly, and scikit-learn.",
    tags: ["Python", "scikit-learn"],
    icon: "chart",
  },
  {
    title: "Handwriting Recognition",
    repo: "HandwritingRecognition",
    href: "https://github.com/nakulj2/HandwritingRecognition",
    desc: "Naive Bayes digit classifier in C++ (78% accuracy) wired into a live Cinder sketchpad for real-time handwriting recognition.",
    tags: ["C++", "Cinder"],
    icon: "pen",
  },
  {
    title: "Fish Image Detection",
    repo: "FishImageDetection",
    href: "https://github.com/nakulj2/FishImageDetection",
    desc: "Convolutional neural network built from scratch with NumPy kernels to classify fish versus non-fish images.",
    tags: ["Python", "NumPy", "CNN"],
    icon: "fish",
  },
  {
    title: "Fingerprint Recognition",
    repo: "FingerPrintRecognition",
    href: "https://github.com/nakulj2/FingerPrintRecognition",
    desc: "From-scratch NumPy neural network performing binary classification on grayscale fingerprint images.",
    tags: ["Python", "NumPy"],
    icon: "fingerprint",
  },
  {
    title: "Watchful Eye LA",
    repo: "WatchfulEyeLA",
    href: "https://github.com/nakulj2/WatchfulEyeLA",
    desc: "Web app surfacing Los Angeles crime trends from LAPD logs (2020–present) to help residents stay informed.",
    tags: ["HTML", "SQL", "Data"],
    icon: "eye",
  },
  {
    title: "Personal Website",
    repo: "PersonalWebsite",
    href: "https://github.com/nakulj2/PersonalWebsite",
    desc: "An earlier iteration of my personal site — a playground for front-end experiments.",
    tags: ["Web"],
    icon: "globe",
  },
];

const ICONS = {
  layers: (
    <>
      <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" />
      <path d="M3 12l9 4.5L21 12" />
      <path d="M3 16.5 12 21l9-4.5" />
    </>
  ),
  network: (
    <>
      <circle cx="5" cy="6" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
      <path d="M6.7 7 10.4 10.6M6.7 17 10.4 13.4M14 12h3" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="M8 17v-4" />
      <path d="M13 17V9" />
      <path d="M18 17V6" />
    </>
  ),
  pen: (
    <>
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5Z" />
      <path d="M13 6l3 3" />
    </>
  ),
  fish: (
    <>
      <path d="M3 12c3.5-5 11-5 14.5 0C14 17 6.5 17 3 12Z" />
      <path d="M17.5 12c1.4-1.3 3-1.8 3.5-1.8v3.6c-.5 0-2.1-.5-3.5-1.8Z" />
      <path d="M8 10.8h.01" />
    </>
  ),
  fingerprint: (
    <>
      <path d="M4 12a8 8 0 0 1 16 0" />
      <path d="M7.5 12a4.5 4.5 0 0 1 9 0v2" />
      <path d="M12 12v6" />
      <path d="M8 15v3" />
      <path d="M16 16v1.5" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.8 2.6 2.8 15.4 0 18M12 3c-2.8 2.6-2.8 15.4 0 18" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 0 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </>
  ),
  cap: (
    <>
      <path d="M2 9l10-4 10 4-10 4L2 9Z" />
      <path d="M6 11v5c0 1.1 2.7 2.5 6 2.5s6-1.4 6-2.5v-5" />
      <path d="M22 9v5" />
    </>
  ),
};

function Icon({ name }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

function useTypewriter(text, speed = 55, startDelay = 200) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { out, done };
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [inView, threshold]);

  return [ref, inView];
}

// Renders the photo at public/avatar.jpg if present, else a monogram.
function Avatar() {
  const [broken, setBroken] = useState(false);
  const src = `${import.meta.env.BASE_URL}avatar.jpg`;
  return (
    <div className="avatar" aria-hidden="true">
      {broken ? (
        <span className="avatar-mono">NJ</span>
      ) : (
        <img src={src} alt="" onError={() => setBroken(true)} />
      )}
      <span className="avatar-ring" />
    </div>
  );
}

function Section({ label, count, className = "", children }) {
  const [ref, inView] = useInView();
  return (
    <section
      ref={ref}
      className={`section ${className} ${inView ? "is-in" : ""}`}
      aria-label={label}
    >
      <p className="eyebrow">
        <span className="dot" aria-hidden="true" />
        {label}
        {count != null && (
          <span className="eyebrow-count">{String(count).padStart(2, "0")}</span>
        )}
      </p>
      {children}
    </section>
  );
}

function Experience() {
  return (
    <Section label="experience" count={EXPERIENCE.length} className="experience">
      <ol className="timeline">
        {EXPERIENCE.map((e, i) => (
          <li key={e.org} className="exp reveal-item" style={{ "--i": i }}>
            <span className="exp-node" aria-hidden="true" />
            <div className="exp-head">
              <span className="exp-period">{e.period}</span>
              {e.current && <span className="exp-now">now</span>}
            </div>
            <h3 className="exp-role">{e.role}</h3>
            <p className="exp-org">
              {e.org} <span className="exp-loc">· {e.loc}</span>
            </p>
            <p className="exp-desc">{e.desc}</p>
            <div className="card-tags">
              {e.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <div className="edu reveal-item" style={{ "--i": EXPERIENCE.length }}>
        <span className="edu-icon">
          <Icon name="cap" />
        </span>
        <div>
          <p className="edu-school">University of Illinois Urbana-Champaign</p>
          <p className="edu-detail">
            B.S. Mathematics &amp; Computer Science · 2020 — 2024
          </p>
        </div>
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section label="projects" count={PROJECTS.length} className="projects">
      <div className="project-grid">
        {PROJECTS.map((p, i) => (
          <a
            key={p.repo}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="card"
            style={{ "--i": i }}
          >
            <div className="card-top">
              <span className="card-icon">
                <Icon name={p.icon} />
              </span>
              <svg
                className="card-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </div>
            <h3 className="card-title">{p.title}</h3>
            <p className="card-desc">{p.desc}</p>
            <div className="card-tags">
              {p.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section label="skills" className="skills">
      <div className="skill-groups">
        {SKILLS.map((s, i) => (
          <div key={s.group} className="skill-group reveal-item" style={{ "--i": i }}>
            <p className="skill-label">{s.group}</p>
            <div className="card-tags">
              {s.items.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function App() {
  const { out: typedName, done: nameDone } = useTypewriter(NAME, 60, 150);
  const [showRest, setShowRest] = useState(false);

  useEffect(() => {
    if (nameDone) {
      const t = setTimeout(() => setShowRest(true), 200);
      return () => clearTimeout(t);
    }
  }, [nameDone]);

  return (
    <main className="page">
      <div className="frame">
        <Avatar />

        <p className="eyebrow">
          <span className="dot" aria-hidden="true" />
          whoami
        </p>

        <h1 className="name">
          {typedName}
          {!showRest && <span className="cursor" aria-hidden="true" />}
        </h1>

        <div className={`reveal ${showRest ? "reveal--in" : ""}`}>
          <p className="role">
            {ROLE}
            <span className="cursor cursor--inline" aria-hidden="true" />
          </p>

          <p className="bio">
            Building AI platforms and orchestration systems — from MCP
            recommendation engines to LLM document pipelines.
          </p>

          <div className="hero-meta">
            <span className="meta-item">
              <Icon name="pin" />
              Ann Arbor, MI
            </span>
            <span className="meta-item">
              <Icon name="briefcase" />
              PeoplePlus Software
            </span>
          </div>

          <nav className="links" aria-label="Contact and profile links">
            {LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className="link-row"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                style={{ "--delay": `${i * 70}ms` }}
              >
                <span className="link-label">{link.label}</span>
                <span className="link-rule" aria-hidden="true" />
                <span className="link-value">{link.value}</span>
              </a>
            ))}
          </nav>

          <p className="scroll-hint" aria-hidden="true">
            scroll for more ↓
          </p>
        </div>
      </div>

      <Experience />
      <Projects />
      <Skills />

      <footer className="footer">
        <span>&copy; {new Date().getFullYear()} Nakul Jain</span>
        <span className="footer-built">built with React + Vite</span>
      </footer>
    </main>
  );
}

export default App;
