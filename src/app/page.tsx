import CinematicVideo from "@/components/CinematicVideo";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Certifications from "@/components/sections/Certifications";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <CinematicVideo />
      <Navbar />
      
      <div className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Certifications />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </main>
  );
}
