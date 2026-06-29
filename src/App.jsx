import { useEffect, useRef, useState } from "react";
import "./App.css";

const NAME = "Nakul Jain";
const ROLE = "AI Engineer";

const LINKS = [
  { label: "Email", href: "mailto:nakuljain2002@gmail.com", value: "nakuljain2002@gmail.com" },
  { label: "GitHub", href: "https://github.com/nakulj2", value: "github.com/nakulj2" },
  { label: "LinkedIn", href: "https://linkedin.com/in/nakul-jain-uiuc", value: "linkedin.com/in/nakul-jain-uiuc" },
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

function Projects() {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={`projects ${inView ? "projects--in" : ""}`}
      aria-label="Projects"
    >
      <p className="eyebrow">
        <span className="dot" aria-hidden="true" />
        projects
        <span className="eyebrow-count">
          {String(PROJECTS.length).padStart(2, "0")}
        </span>
      </p>

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
    </section>
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
            Building AI platforms and orchestration systems. Based in Ann
            Arbor, Michigan.
          </p>

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
            selected work below ↓
          </p>
        </div>
      </div>

      <Projects />

      <footer className="footer">
        <span>&copy; {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}

export default App;
