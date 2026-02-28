import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// --- Types ---
type CommandLog = {
  id: string;
  command: string;
  output: React.ReactNode;
};

// --- Content Data ---
const projects = [
  {
    title: "E-commerce Platform",
    description: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB.",
    link: "#",
  },
  {
    title: "ProductCompareAI website",
    description: "Created a Website chatbot which compares products.",
    link: "https://product-compare-ai.vercel.app",
  },
  {
    title: "Task Management App",
    description: "Developed a task management application with authentication and real-time updates.",
    link: "#",
  },
];

const HelpContent = () => (
  <div className="mt-1 mb-2">
    <div className="text-highlight mb-1">Available commands:</div>
    <div className="grid-list">
      <div><span className="text-highlight">help</span>     - Show this help message</div>
      <div><span className="text-highlight">about</span>    - Learn more about me</div>
      <div><span className="text-highlight">projects</span> - View my recent work</div>
      <div><span className="text-highlight">skills</span>   - List my technical skills</div>
      <div><span className="text-highlight">contact</span>  - Get my contact information</div>
      <div><span className="text-highlight">clear</span>    - Clear the terminal screen</div>
    </div>
  </div>
);

const AboutContent = () => (
  <div className="mt-1 mb-2">
    <div className="text-highlight mb-1">❯ USER PROFILE MATCH: RAMPRAKASH</div>
    <p className="mb-1">
      Hello, I'm Ramprakash. I'm a passionate full-stack developer specializing in building
      robust, scalable web applications from end to end.
    </p>
    <p>
      I combine React/TypeScript for dynamic, modern frontends with robust Java Spring Boot
      architectures on the backend, ensuring a seamless flow of data and beautiful user experiences.
    </p>
  </div>
);

const ProjectsContent = () => (
  <div className="mt-1 mb-2 flex-col gap-2">
    <div className="text-highlight">❯ ACCESSING PROJECT ARCHIVE...</div>
    {projects.map((p, i) => (
      <div key={i} className="project-frame">
        <div style={{ fontWeight: "bold", color: "var(--text-highlight)", marginBottom: "4px" }}>
          [{i + 1}] {p.title}
        </div>
        <div style={{ marginBottom: "6px" }}>{p.description}</div>
        <a href={p.link} target="_blank" rel="noreferrer" className="flex-row">
          <span>URL: </span>
          <span style={{ textDecoration: "underline", marginLeft: "4px" }}>{p.link}</span>
        </a>
      </div>
    ))}
  </div>
);

const SkillsContent = () => (
  <div className="mt-1 mb-2">
    <div className="text-highlight mb-1">❯ ANALYZING SKILL MATRIX...</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div><strong className="text-highlight">Frontend:</strong> React, TypeScript, HTML/CSS, Tailwind, Framer Motion</div>
      <div><strong className="text-highlight">Backend:</strong> Node.js, Express, Java, Spring Boot</div>
      <div><strong className="text-highlight">Database:</strong> MongoDB, PostgreSQL, MySQL</div>
      <div><strong className="text-highlight">Tools:</strong> Git, Docker, AWS, Postman</div>
    </div>
  </div>
);

const ContactContent = () => (
  <div className="mt-1 mb-2">
    <div className="text-highlight mb-1">❯ INITIATING SECURE COMM LINE...</div>
    <div className="grid-list">
      <div><strong className="text-highlight">Email:</strong> <a href="mailto:ramprakash@example.com">ramprakash@example.com</a></div>
      <div><strong className="text-highlight">GitHub:</strong> <a href="https://github.com/XTiNCT-7" target="_blank" rel="noreferrer">XTiNCT-7</a></div>
      <div><strong className="text-highlight">LinkedIn:</strong> <a href="https://www.linkedin.com/in/ramprakash-nadar-b80199216" target="_blank" rel="noreferrer">Profile Link</a></div>
    </div>
  </div>
);

const ErrorContent = ({ cmd }: { cmd: string }) => (
  <div className="mt-1 mb-2" style={{ color: "#ff5f56" }}>
    Command not found: '{cmd}'. Type 'help' to see available commands.
  </div>
);

// --- Component ---
const Home: React.FC = () => {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Focus input on click anywhere
  useEffect(() => {
    const handleGlobalClick = () => {
      inputRef.current?.focus();
    };
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  // Scroll to bottom when history changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isBooting]);

  useEffect(() => {
    setTimeout(() => {
      setIsBooting(false);
      // Give them a starting message
      setHistory([
        {
          id: "boot-message",
          command: "",
          output: (
            <div className="mb-2">
              <pre className="text-highlight" style={{ fontSize: "0.65em", lineHeight: "1.2", marginBottom: "1rem" }}>
                {`
 ____    _    __  __ ____  ____      _    _  __    _    ____  _   _ 
|  _ \\  / \\  |  \\/  |  _ \\|  _ \\    / \\  | |/ /   / \\  / ___|| | | |
| |_) |/ _ \\ | |\\/| | |_) | |_) |  / _ \\ | ' /   / _ \\ \\___ \\| |_| |
|  _ </ ___ \\| |  | |  __/|  _ <  / ___ \\| . \\  / ___ \\ ___) |  _  |
|_| \\_\\/   \\_\\_|  |_|_|   |_| \\_\\/_/   \\_\\_|\\_\\/_/   \\_\\____/|_| |_|

`}
              </pre>
              <div className="text-dim mb-1">:: Portfolio System Boot initiated ::</div>
              <div className="text-highlight">SYSTEM ONLINE. WELCOME TO PORTFOLIO OS v2.0</div>
              <div>Type <span className="text-highlight">'help'</span> to view available commands.</div>
            </div>
          ),
        },
      ]);
    }, 1500); // 1.5s boot sequence
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();

    if (!cmd) return;

    setInputVal("");

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    let output: React.ReactNode = null;
    switch (cmd) {
      case "help": output = <HelpContent />; break;
      case "about": output = <AboutContent />; break;
      case "projects": output = <ProjectsContent />; break;
      case "skills": output = <SkillsContent />; break;
      case "contact": output = <ContactContent />; break;
      default: output = <ErrorContent cmd={cmd} />;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        command: inputVal, // keep original casing for display
        output,
      },
    ]);
  };

  return (
    <main className="crt">
      <div className="terminal-window">
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-header-buttons">
            <div className="terminal-header-btn btn-close"></div>
            <div className="terminal-header-btn btn-min"></div>
            <div className="terminal-header-btn btn-max"></div>
          </div>
          <div>guest@ramprakash-os:~</div>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body" ref={scrollRef}>
          {isBooting ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
              className="text-highlight"
            >
              INITIALIZING SECURE CONNECTION...
            </motion.div>
          ) : (
            <>
              {/* Render History */}
              {history.map((log) => (
                <div key={log.id}>
                  {log.command && (
                    <div className="flex-row">
                      <span className="text-highlight">guest@ramprakash-os</span>
                      <span className="text-dim">:~$&nbsp;</span>
                      <span>{log.command}</span>
                    </div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {log.output}
                  </motion.div>
                </div>
              ))}

              {/* Active Input Line */}
              <form onSubmit={handleCommand} className="flex-row mt-1" style={{ position: "relative" }}>
                <span className="text-highlight">guest@ramprakash-os</span>
                <span className="text-dim">:~$&nbsp;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "transparent", // Hide actual text, show via div
                    outline: "none",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    width: "100%",
                    caretColor: "transparent", // Hide default caret
                    position: "absolute",
                    left: 0, top: 0, height: "100%", opacity: 0
                  }}
                />
                <div style={{ display: "flex", alignItems: "center", position: "relative", pointerEvents: "none" }}>
                  <span>{inputVal}</span>
                  <span className="cursor-blink"></span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
