import { useState, useEffect } from 'react';

// --- Data ---
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

export const AVAILABLE_COMMANDS = [
    "help", "about", "projects", "skills", "contact", "clear",
    "whoami", "experience", "education", "socials", "resume",
    "sudo", "rickroll", "theme"
];

// --- Components ---

export const HelpContent = () => (
    <div className="mt-1 mb-2">
        <div className="text-highlight mb-1">Available commands:</div>
        <div className="grid-list">
            <div><span className="text-highlight">help</span>     - Show this help message</div>
            <div><span className="text-highlight">about</span>    - Learn more about me</div>
            <div><span className="text-highlight">projects</span> - View my recent work</div>
            <div><span className="text-highlight">skills</span>   - List my technical skills</div>
            <div><span className="text-highlight">contact</span>  - Get my contact information</div>
            <div><span className="text-highlight">theme</span>    - Available themes: matrix, amber, red, cyan</div>
            <div><span className="text-highlight">clear</span>    - Clear the terminal screen</div>
        </div>
    </div>
);

export const AboutContent = () => (
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

export const ProjectsContent = () => (
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

export const SkillsContent = () => (
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

export const WhoamiContent = () => (
    <div className="mt-1 mb-2">
        <div>guest</div>
    </div>
);

export const ExperienceContent = () => (
    <div className="mt-1 mb-2">
        <div className="text-highlight mb-1">❯ EMPLOYMENT HISTORY</div>
        <div className="flex-col gap-1">
            <div>
                <div style={{ fontWeight: "bold" }}>Software Engineer</div>
                <div className="text-dim">Xoriant Solutions | Aug 2023 - Present</div>
                <ul style={{ paddingLeft: "20px", marginTop: "4px", marginBottom: "0" }}>
                    <li>Designed and developed Spring Boot–based backend systems using microservices architecture, exposing REST APIs for Order,
                        Work Order, and Tender workflows.</li>
                    <li>Delivered API-first, client-defined contracts with pagination, filtering, validation, and standardized error handling to support
                        multiple downstream consumers.</li>
                    <li>Deployed containerized microservices on AWS ECS (Fargate) behind an Application Load Balancer, ensuring high availability and
                        horizontal scalability.</li>
                </ul>
            </div>
            <div>
                <div style={{ fontWeight: "bold" }}>Associate Software Engineer</div>
                <div className="text-dim">Xoriant Solutions | Aug 2022 - July 2023</div>
                <ul style={{ paddingLeft: "20px", marginTop: "4px", marginBottom: "0" }}>
                    <li>Developed a monolithic backend exposing REST APIs for recipe upload, pagination, filtering and managing 1000+ recipe records.</li>
                    <li>Integrated asynchronous processing using Azure Queue Storage, enabling parallel handling of recipe-processing tasks and reducing
                        API response time by 20%</li>
                    <li>Added Azure Blob Storage for file storage and Spring Security for user authentication</li>
                </ul>
            </div>
        </div>
    </div>
);

export const EducationContent = () => (
    <div className="mt-1 mb-2">
        <div className="text-highlight mb-1">❯ ACADEMIC RECORDS</div>
        <div className="flex-col gap-1">
            <div>
                <div style={{ fontWeight: "bold" }}>Bachelor of Engineering in Electronics and Telecommunication</div>
                <div className="text-dim">SIES GST, Mumbai University | Aug 2018 - April 2022</div>
                <div style={{ marginTop: "4px" }}>GPA: 9.07/10</div>
            </div>
        </div>
    </div>
);

export const SocialsContent = () => (
    <div className="mt-1 mb-2">
        <div className="text-highlight mb-1">❯ SOCIAL NETWORKS</div>
        <div className="grid-list">
            <div><strong className="text-highlight">GitHub:</strong> <a href="https://github.com/XTiNCT-7" target="_blank" rel="noreferrer">@XTiNCT-7</a></div>
            <div><strong className="text-highlight">LinkedIn:</strong> <a href="https://www.linkedin.com/in/ramprakash-nadar-b80199216" target="_blank" rel="noreferrer">Ramprakash Nadar</a></div>
            <div><strong className="text-highlight">Twitter/X:</strong> <a href="#" target="_blank" rel="noreferrer">@YourHandle</a></div>
        </div>
    </div>
);

export const ResumeContent = () => {
    const [resumeUrl, setResumeUrl] = useState<string | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Add cache-busting to bypass GitHub API caching
        const timestamp = new Date().getTime();
        fetch(`https://api.github.com/repos/XTiNCT-7/MyResume/contents?t=${timestamp}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    // Find the specific PDF file the user mentioned, or fallback to the first PDF
                    const targetPdf = data.find((file: any) => file.name.toLowerCase().includes("ramprakash_nadar_resume.pdf"));
                    const anyPdf = data.find((file: any) => file.name.endsWith(".pdf"));

                    const pdfFile = targetPdf || anyPdf;

                    if (pdfFile) {
                        // Append cache buster to the download URL itself
                        setResumeUrl(`${pdfFile.download_url}?t=${timestamp}`);
                    } else {
                        setError(true);
                    }
                } else {
                    setError(true);
                }
            })
            .catch(() => setError(true));
    }, []);

    if (error) {
        return (
            <div className="mt-1 mb-2">
                <div className="text-highlight mb-1">❯ FETCHING RESUME...</div>
                <div>❌ <span style={{ color: "#ff5f56" }}>Failed to locate PDF in repository.</span></div>
                <div className="text-dim mt-1">Please check: <a href="https://github.com/XTiNCT-7/MyResume" target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>github.com/XTiNCT-7/MyResume</a></div>
            </div>
        );
    }

    if (!resumeUrl) {
        return (
            <div className="mt-1 mb-2">
                <div className="text-highlight mb-1">❯ OVERRIDING SECURITY PROTOCOLS...</div>
                <div className="text-dim">Connecting to GitHub servers...</div>
            </div>
        );
    }

    return (
        <div className="mt-1 mb-2">
            <div className="text-highlight mb-1">❯ RESUME FETCHED SUCCESSFULLY</div>
            <div>📄 <a href={resumeUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>Click here to download the latest resume</a></div>
            <div className="text-dim mt-1">(File will open securely from GitHub infrastructure)</div>
        </div>
    );
};

export const SudoContent = () => (
    <div className="mt-1 mb-2" style={{ color: "#ff5f56" }}>
        <div className="text-highlight mb-1">❯ sudo: command not found</div>
        <div>Nice try! This incident will be reported. 🚨</div>
    </div>
);

export const RickrollContent = () => {
    return (
        <div className="mt-1 mb-2">
            <div className="text-highlight mb-1">❯ INITIALIZING CLASSIFIED PROTOCOL...</div>
            <div>🎵 Never gonna give you up...</div>
            <div className="mt-1"><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>Click to decrypt payload</a></div>
        </div>
    );
};

export const ContactContent = () => (
    <div className="mt-1 mb-2">
        <div className="text-highlight mb-1">❯ INITIATING SECURE COMM LINE...</div>
        <div className="grid-list">
            <div><strong className="text-highlight">Email:</strong> <a href="mailto:iamram48@gmail.com">iamram48@gmail.com</a></div>
            <div><strong className="text-highlight">GitHub:</strong> <a href="https://github.com/XTiNCT-7" target="_blank" rel="noreferrer">XTiNCT-7</a></div>
            <div><strong className="text-highlight">LinkedIn:</strong> <a href="https://www.linkedin.com/in/ramprakash-nadar-b80199216" target="_blank" rel="noreferrer">Profile Link</a></div>
        </div>
    </div>
);

export const ThemeContent = ({ theme }: { theme: string }) => {
    const validThemes = ["matrix", "amber", "red", "cyan"];
    if (!theme) {
        return (
            <div className="mt-1 mb-2">
                <div>Usage: <span className="text-highlight">theme [color]</span></div>
                <div>Available colors: <span className="text-highlight">{validThemes.join(", ")}</span></div>
            </div>
        );
    }

    if (!validThemes.includes(theme)) {
        return <div className="mt-1 mb-2 text-dim" style={{ color: "#ff5f56" }}>Unknown theme: '{theme}'</div>;
    }

    return (
        <div className="mt-1 mb-2">
            <div className="text-highlight">❯ SYSTEM RECALIBRATION SUCCESSFUL</div>
            <div>Theme set to: <span className="text-highlight">{theme}</span></div>
        </div>
    );
};

export const ErrorContent = ({ cmd }: { cmd: string }) => (
    <div className="mt-1 mb-2" style={{ color: "#ff5f56" }}>
        Command not found: '{cmd}'. Type 'help' to see available commands.
    </div>
);
