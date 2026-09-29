"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="font-oswald text-2xl font-bold tracking-widest text-text">
          Arun.
        </div>

        <div className="hidden md:flex items-center gap-8 px-8 py-3 rounded-full bg-surface/50 backdrop-blur-md border border-white/5">
          {["Experience", "Certifications", "Projects", "Skills"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-mono text-text/70 hover:text-accent transition-colors"
              data-magnetic
            >
              {item}
            </a>
          ))}
        </div>

        <button 
          className="md:hidden text-text z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="px-6 py-2 border border-accent text-accent font-mono text-sm hover:bg-accent hover:text-white transition-all rounded-sm"
            data-magnetic
          >
            SAY HELLO
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-bg z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {["Experience", "Certifications", "Projects", "Skills", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="font-oswald text-3xl font-bold tracking-widest text-text/80 hover:text-accent"
            onClick={() => setIsOpen(false)}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}
