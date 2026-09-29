"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Briefcase, GraduationCap } from "lucide-react";

type EventType = "work" | "education";

interface TimelineEvent {
  id: string;
  type: EventType;
  title: string;
  organization: string;
  date: string;
  description: string[];
  metrics?: string;
}

const events: TimelineEvent[] = [
  {
    id: "e1",
    type: "work",
    title: "Frontend Developer",
    organization: "Vizweb Solutions",
    date: "6 months",
    description: [
      "Maintained and enhanced website functionality, managing the full project lifecycle from concept to deployment.",
      "Collaborated with back-end developers to optimize data handling, resulting in a 100% front-end performance boost using batch processing.",
      "Developed over 10 responsive web applications utilizing HTML, CSS, JavaScript, and Bootstrap.",
      "Implemented SEO best practices, improving organic search visibility by 30%."
    ],
    metrics: "100% Perf Boost | 10+ Apps | 30% SEO inc"
  },
  {
    id: "e2",
    type: "education",
    title: "B.Sc. Computer Science",
    organization: "Erode Arts and Science College",
    date: "Graduated in 2024",
    description: [
      "Maths & Computer Science",
      "Achieved 67.4% overall grade."
    ],
    metrics: "67.4% CGPA"
  }
];

export default function Experience() {
  const [filter, setFilter] = useState<"all" | "work" | "education">("all");

  const filteredEvents = events.filter(e => filter === "all" || e.type === filter);

  return (
    <section id="experience" className="w-full py-32 px-6 md:px-16 relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <h2 className="font-oswald text-5xl md:text-7xl font-bold uppercase text-white/10 relative">
              <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">EXPERIENCE</span>
              EXPERIENCE
            </h2>
            <p className="font-mono text-accent mt-2 tracking-widest">02 / PROFESSIONAL JOURNEY</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {(["all", "work", "education"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 rounded-full font-mono text-xs tracking-widest transition-all duration-300 border",
                  filter === f ? "bg-white text-bg border-white" : "bg-surface/30 text-white/50 border-white/10 hover:border-white/30"
                )}
                data-magnetic
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Central Glowing Spine */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent -translate-x-1/2" />
          
          <div className="flex flex-col gap-12 md:gap-24">
            {filteredEvents.map((event, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={event.id} className={cn("relative flex flex-col md:flex-row items-center", isLeft ? "md:flex-row" : "md:flex-row-reverse")}>
                  
                  {/* Waypoint Node */}
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-surface border-2 border-accent -translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(196,0,36,0.5)]">
                    <div className={cn("w-2 h-2 rounded-full animate-pulse", event.type === "work" ? "bg-green-500" : "bg-accent")} />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-1/2" />
                  
                  {/* Card */}
                  <div className={cn("w-full md:w-1/2 pl-20 md:pl-0", isLeft ? "md:pr-16" : "md:pl-16")}>
                    <div className="group bg-surface/50 backdrop-blur-md border border-white/5 p-8 rounded-xl hover:border-accent/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(196,0,36,0.1)]">
                      <div className="flex items-center gap-3 mb-4 text-accent">
                        {event.type === "work" ? <Briefcase size={20} /> : <GraduationCap size={20} />}
                        <span className="font-mono text-sm tracking-widest">{event.date}</span>
                      </div>
                      
                      <h3 className="font-space text-2xl font-bold text-white mb-1 group-hover:text-accent transition-colors">{event.title}</h3>
                      <h4 className="font-space text-lg text-white/70 mb-6">{event.organization}</h4>
                      
                      <ul className="space-y-3">
                        {event.description.map((desc, i) => (
                          <li key={i} className="font-syne text-white/60 leading-relaxed text-sm flex gap-3">
                            <span className="text-accent mt-1">▹</span> {desc}
                          </li>
                        ))}
                      </ul>

                      {event.metrics && (
                        <div className="mt-8 pt-4 border-t border-white/5 font-mono text-xs text-white/40">
                          {event.metrics}
                        </div>
                      )}
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
          
        </div>

      </div>
    </section>
  );
}
