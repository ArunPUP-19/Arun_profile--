"use client";

const skillCategories = [
  {
    name: "Languages",
    skills: ["HTML", "CSS", "JavaScript"]
  },
  {
    name: "Frontend",
    skills: ["React.js", "Bootstrap", "Tailwind CSS"]
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express.js"]
  },
  {
    name: "Databases",
    skills: ["MongoDB"]
  },
  {
    name: "Cloud & Tools",
    skills: ["VS Code", "Git", "GitHub", "Firebase", "Hostinger", "RESTful APIs"]
  },
  {
    name: "Core Concepts",
    skills: ["Responsive Web Design", "SEO", "Performance Optimization"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="w-full py-32 px-6 md:px-16 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="font-oswald text-5xl md:text-7xl font-bold uppercase text-white/10 relative">
            <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">SKILLS</span>
            SKILLS
          </h2>
          <p className="font-mono text-accent mt-2 tracking-widest">05 / ARSENAL</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {skillCategories.map(category => (
            <div key={category.name} className="flex flex-col">
              <h3 className="font-space text-xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-accent inline-block" />
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map(skill => (
                  <span 
                    key={skill}
                    className="px-4 py-2 border border-white/10 bg-bg rounded-lg font-mono text-sm text-white/80 hover:border-accent hover:text-white transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
