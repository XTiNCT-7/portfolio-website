import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/Global.css"; // Import custom CSS file

// Define types
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
}

interface Skill {
  name: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: JSX.Element;
}

const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "Built a full-stack e-commerce platform using React, Node.js, and MongoDB.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
      image: "/api/placeholder/300/180",
      link: "#",
    },
    {
      id: 2,
      title: "ProductCompareAI website",
      description:
        "Created a Website chatbot which compares products and suggest user's need.",
      technologies: ["React", "TypeScript", "Vercel", "Mistral AI"],
      image: "/chatbot.png",
      link: "https://product-compare-ai.vercel.app",
    },
    {
      id: 3,
      title: "Task Management App",
      description:
        "Developed a task management application with authentication and real-time updates.",
      technologies: ["React", "Firebase", "Material-UI", "Context API"],
      image: "/api/placeholder/300/180",
      link: "#",
    },
  ];

  const skills: Skill[] = [
    { name: "React" },
    { name: "TypeScript" },
    { name: "Node.js" },
    { name: "Java" },
    { name: "Azure Functions" },
    { name: "Azure logic app" },
  ];

  const socialLinks: SocialLink[] = [
    {
      platform: "GitHub",
      url: "https://github.com/XTiNCT-7",
      icon: (
        <svg
          className="social-icon"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/ramprakash-nadar-b80199216",
      icon: (
        <svg
          className="social-icon"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-7a1 1 0 100-2 1 1 0 000 2zm7 7h-2v-4c0-.5-.5-1-1-1s-1 .5-1 1v4h-2v-6h2v1c.4-.6 1.2-1 2-1 1.5 0 2 1 2 2.5V17z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const projectsRef = React.useRef<HTMLElement>(null);
  const scrollToProjects = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {!isLoaded ? (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="loader"></div>
          <h2>Loading portfolio...</h2>
        </motion.div>
      ) : (
        <div className="portfolio-container">
          {/* Hero Section with Animation */}
          <header className="hero-section">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="hero-content"
            >
              <h1 className="hero-title">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  Hello, I'm <span className="highlight">Ramprakash</span>
                </motion.span>
              </h1>
              <motion.h2
                className="hero-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                Full Stack Developer
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                <a className="cta-button" onClick={scrollToProjects}>
                  View My Work
                </a>
              </motion.div>
            </motion.div>

            {/* Background animation elements */}
            <motion.div
              className="hero-particles"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ delay: 0.5, duration: 2 }}
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="particle"
                  style={{
                    width: Math.random() * 20 + 10,
                    height: Math.random() * 20 + 10,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, Math.random() * -100 - 50],
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </motion.div>
          </header>

          {/* About Section with Image */}
          <section className="about-section" id="about">
            <motion.div
              className="about-container"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="about-image-container">
                <motion.div
                  className="profile-image-wrapper"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/api/placeholder/300/300"
                    alt="Profile"
                    className="profile-image"
                  />
                </motion.div>
              </div>

              <div className="about-content">
                <h2 className="section-title">About Me</h2>
                <p className="about-text">
                  Hi there! I'm a passionate full-stack developer with expertise
                  in modern web technologies. I specialize in creating
                  responsive, user-friendly applications with React, TypeScript,
                  and Node.js. 
                </p>
                <p className="about-text">
                  With over 3 years of experience, I've worked on a variety of
                  projects ranging from integrating different software to creating front-end. I'm committed to writing clean,
                  maintainable code and creating exceptional user experiences.
                </p>
                <div className="skills-container">
                  {skills.map((skill) => (
                    <span key={skill.name} className="skill-tag">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* Projects Section */}
          <section className="projects-section" id="projects" ref={projectsRef}>
            <div className="projects-container">
              <motion.h2
                className="section-title centered"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                My Projects
              </motion.h2>

              <motion.div
                className="projects-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="project-card"
                    variants={itemVariants}
                  >
                    <div className="project-image-container">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="project-image"
                      />
                    </div>
                    <div className="project-content">
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description">
                        {project.description}
                      </p>
                      <div className="project-technologies">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a href={project.link} className="project-link">
                        View Project →
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="contact-section" id="contact">
            <div className="contact-container">
              <motion.h2
                className="section-title centered"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Get In Touch
              </motion.h2>
              <motion.p
                className="contact-text"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Interested in working together? Feel free to reach out!
              </motion.p>
              <motion.a
                href="mailto:contact@example.com"
                className="contact-button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                Say Hello 👋
              </motion.a>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <div className="footer-container">
              <p className="copyright">
                © 2025 Ramprakash. All Rights Reserved.
              </p>
              <div className="social-links">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    className="social-link"
                    aria-label={link.platform}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default Home;
