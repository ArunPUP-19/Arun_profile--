"use client";

import { useRef, useState } from "react";
import { ExternalLink, Code2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: "p1",
    title: "Mini Chat AI",
    description: "Interactive chat application with intelligent responses using Gemini API integration.",
    tech: ["React", "Gemini API", "JavaScript", "CSS"],
    link: "https://arun-19n.github.io/Chat-Ai-demo/",
  },
  {
    id: "p2",
    title: "React Weather App",
    description: "Real-time weather data visualization fetched from the OpenWeatherMap API.",
    tech: ["React", "OpenWeatherMap", "CSS"],
    link: "https://arun-19n.github.io/Weather-App-React/",
  },
  {
    id: "p3",
    title: "Startup Website",
    description: "Fully responsive website engineered from scratch for a startup with cross-browser compatibility.",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    link: "https://vizwebsolutions.com/",
  },
  {
    id: "p4",
    title: "Clothing E-Commerce",
    description: "Visually appealing and user-friendly front-end interface for a clothing brand.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://sripada.netlify.app/",
  },
  {
    id: "p5",
    title: "Training Institute Website",
    description: "Interactive website to showcase courses and information for an institute.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://besttraininginstitute.co.in/",
  }
];

export default function Projects() {
  return (
    <section id="projects" className="w-full py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="font-oswald text-5xl md:text-7xl font-bold uppercase text-white/10 relative">
            <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">PROJECTS</span>
            PROJECTS
          </h2>
          <p className="font-mono text-accent mt-2 tracking-widest">04 / SELECTED WORKS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // 3D tilt effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
  };

  return (
    <div 
      ref={cardRef}
      className="relative group rounded-2xl border border-white/5 bg-surface/50 p-8 transition-transform duration-300 ease-out overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cursor Spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(196,0,36,0.1), transparent 40%)`
        }}
      />
      
      <div className="relative z-10">
        <h3 className="font-space text-3xl font-bold mb-4">{project.title}</h3>
        <p className="font-syne text-white/60 mb-8 min-h-[60px]">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-12">
          {project.tech.map(t => (
            <span key={t} className="px-3 py-1 border border-white/10 rounded-full font-mono text-xs text-white/70 bg-bg/50">
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a 
            href={project.link} 
            target="_blank" 
            className="flex items-center gap-2 font-mono text-sm border-b border-accent text-accent hover:text-white hover:border-white transition-colors pb-1"
            data-magnetic
          >
            <ExternalLink size={16} /> LIVE DEMO
          </a>
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              className="flex items-center gap-2 font-mono text-sm border-b border-white/30 text-white/50 hover:text-white hover:border-white transition-colors pb-1"
              data-magnetic
            >
              <Code2 size={16} /> SOURCE
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
