import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTypingSound } from "../hooks/useTypingSound";

// --- Types ---
type CommandLog = {
  id: string;
  command: string;
  output: React.ReactNode;
};

import {
  AVAILABLE_COMMANDS, HelpContent, AboutContent, ProjectsContent,
  SkillsContent, ContactContent, ThemeContent, ErrorContent,
  WhoamiContent, ExperienceContent, EducationContent, SocialsContent,
  ResumeContent, SudoContent, RickrollContent
} from "../components/TerminalCommands";

// --- Component ---
const Home: React.FC = () => {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([]);
  // Tracking the index of user-entered commands (not system boots) for up/down arrows
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const [isBooting, setIsBooting] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { soundEnabled, playTypingSound, toggleSound } = useTypingSound();

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
    let [baseCmd, ...args] = cmd.split(" ");

    switch (baseCmd) {
      case "help": output = <HelpContent />; break;
      case "about": output = <AboutContent />; break;
      case "projects": output = <ProjectsContent />; break;
      case "skills": output = <SkillsContent />; break;
      case "contact": output = <ContactContent />; break;
      case "whoami": output = <WhoamiContent />; break;
      case "experience": output = <ExperienceContent />; break;
      case "education": output = <EducationContent />; break;
      case "socials": output = <SocialsContent />; break;
      case "resume": output = <ResumeContent />; break;
      case "sudo": output = <SudoContent />; break;
      case "rickroll": output = <RickrollContent />; break;
      case "theme":
        const selectedTheme = args[0] || "";
        output = <ThemeContent theme={selectedTheme} />;
        if (["matrix", "amber", "red", "cyan"].includes(selectedTheme)) {
          if (selectedTheme === "matrix") {
            document.body.removeAttribute("data-theme");
          } else {
            document.body.setAttribute("data-theme", selectedTheme);
          }
        }
        break;
      default: output = <ErrorContent cmd={baseCmd} />;
    }

    const commandId = Math.random().toString(36).substring(7);
    const requiresLoading = ["projects", "experience", "education"].includes(baseCmd);

    if (requiresLoading) {
      // Show loading state first
      setHistory((prev) => [
        ...prev,
        {
          id: commandId,
          command: inputVal,
          output: (
            <motion.div>
              <div className="text-dim">Fetching data...</div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8 }}
                style={{ height: "4px", background: "var(--text-main)", marginTop: "8px", maxWidth: "200px" }}
              />
            </motion.div>
          ),
        },
      ]);

      // Replace with actual output after "delay"
      setTimeout(() => {
        setHistory((prev) =>
          prev.map((log) =>
            log.id === commandId ? { ...log, output } : log
          )
        );
      }, 900);
    } else {
      // Instant output
      setHistory((prev) => [
        ...prev,
        { id: commandId, command: inputVal, output },
      ]);
    }

    // Add to command history buffer for arrow key navigation
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1); // Reset index
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInputVal("");
        } else {
          setHistoryIndex(nextIndex);
          setInputVal(commandHistory[nextIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault(); // Prevent focus shift
      const val = inputVal.toLowerCase();
      const matches = AVAILABLE_COMMANDS.filter(c => c.startsWith(val));
      if (matches.length === 1) {
        setInputVal(matches[0]);
      } else if (matches.length > 1) {
        // If multiple matches, we could show them or auto-complete the common prefix
        // For simplicity, we just complete the first match.
        setInputVal(matches[0]);
      }
    }
  };

  return (
    <main className="crt">
      <div className="terminal-window">
        {/* Terminal Header */}
        <div className="terminal-header" style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="terminal-header-buttons">
              <div className="terminal-header-btn btn-close"></div>
              <div className="terminal-header-btn btn-min"></div>
              <div className="terminal-header-btn btn-max"></div>
            </div>
            <div>guest@ramprakash-os:~</div>
          </div>
          <button
            onClick={toggleSound}
            style={{
              background: "transparent", border: "1px solid var(--border-color)",
              color: "var(--text-dim)", fontSize: "0.7rem", padding: "2px 8px", cursor: "pointer"
            }}
          >
            Sound: {soundEnabled ? "ON" : "OFF"}
          </button>
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
                  onChange={(e) => {
                    setInputVal(e.target.value);
                    playTypingSound();
                  }}
                  onKeyDown={handleKeyDown}
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
