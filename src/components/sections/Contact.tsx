"use client";

import { useState } from "react";
import { Copy, Check, Mail, Phone, ExternalLink } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "arunnagarajan648@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="w-full py-32 px-6 md:px-16 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(196,0,36,0.1)_0%,transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-16 justify-between">
        <div className="w-full md:w-1/2">
          <h2 className="font-oswald text-5xl md:text-7xl font-bold uppercase text-white mb-6">
            LET&apos;S <span className="text-accent">BUILD</span><br/> SOMETHING.
          </h2>
          <p className="font-syne text-white/60 mb-12 max-w-md">
            Open to opportunities and exciting projects. Let&apos;s create experiences that leave a mark.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={handleCopy} data-magnetic>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-colors">
                <Mail size={18} />
              </div>
              <div>
                <p className="font-mono text-xs text-white/40 mb-1">EMAIL ADDRESS</p>
                <div className="flex items-center gap-2">
                  <p className="font-space text-lg">{email}</p>
                  {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-white/30" />}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 group" data-magnetic>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-colors">
                <Phone size={18} />
              </div>
              <div>
                <p className="font-mono text-xs text-white/40 mb-1">PHONE</p>
                <p className="font-space text-lg">+91-8925633819</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group" data-magnetic>
              <a href="https://arun-19n.github.io/Arun-s__Profile/" target="_blank" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-colors">
                <ExternalLink size={18} />
              </a>
              <div>
                <p className="font-mono text-xs text-white/40 mb-1">PORTFOLIO V1</p>
                <a href="https://arun-19n.github.io/Arun-s__Profile/" target="_blank" className="font-space text-lg hover:text-accent transition-colors cursor-pointer">arun-19n.github.io</a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <form className="flex flex-col gap-6 bg-surface/50 p-8 rounded-2xl border border-white/10" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-white/50">NAME</label>
              <input type="text" className="bg-transparent border-b border-white/20 p-2 font-space text-white outline-none focus:border-accent transition-colors" placeholder="Enter your name" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-white/50">EMAIL</label>
              <input type="email" className="bg-transparent border-b border-white/20 p-2 font-space text-white outline-none focus:border-accent transition-colors" placeholder="Enter your email" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-white/50">MESSAGE</label>
              <textarea rows={4} className="bg-transparent border-b border-white/20 p-2 font-space text-white outline-none focus:border-accent transition-colors resize-none" placeholder="Tell me about your project..."></textarea>
            </div>
            <button className="mt-4 bg-accent text-white font-space font-bold py-4 rounded-lg hover:bg-bright-red transition-colors" data-magnetic>
              TRANSMIT MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
