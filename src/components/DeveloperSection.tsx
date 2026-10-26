import { Mail, ShieldCheck } from "lucide-react";
import developer from "../assets/developer.jpeg"

export default function DeveloperSection() {
  return (
    <section className="w-full bg-[#061410] py-20 px-6 sm:px-8 font-sans text-[#F4F7F2] relative overflow-hidden border-y border-emerald-900/40">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400">
            ENGINEERING SHOWCASE
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            The Architect Behind
          </h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full mt-2" />
        </div>

        {/* Main Card Container */}
        <div className="bg-[#0c201a]/90 rounded-[2.5rem] border border-emerald-500/30 shadow-2xl p-6 sm:p-10 relative overflow-hidden backdrop-blur-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Side: Developer Image & Floating Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-md bg-emerald-950/50 border border-emerald-500/20">
                <img
                  src={developer} 
                  alt="Sheikh Sadi"
                  className="w-full h-full object-cover opacity-90"
                />
                
                {/* Floating Role Badge */}
                <div className="absolute bottom-4 left-4 bg-[#061410]/90 text-white px-5 py-3 rounded-2xl shadow-lg border border-emerald-500/30 backdrop-blur-md">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">ROLE</p>
                  <p className="text-xs font-black text-emerald-300">Lead Creator & Architect</p>
                </div>
              </div>
            </div>

            {/* Right Side: Bio & Tech Stack */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              
              <div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  SHEIKH SADI
                </h3>
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mt-1">
                  Lead Software Engineer & Platform Creator
                </p>

                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  "Verbal Victory is an immersive IELTS & Spoken English LMS platform that I have meticulously designed and developed as a passionate full-stack developer and digital designer. By leveraging a scalable real-time architecture and modern UI/UX principles, I have strived to make language learning seamless, interactive, and highly effective."
                </p>
              </div>

              {/* Tech Stack Grid Badges (Theme Matched) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  "React.js",
                  "JavaScript",
                  "TypeScript",
                  "Tailwind CSS",
                  "Firebase",
                  "Framer Motion",
                  "UI/UX Design",
                  "Git / GitHub",
                ].map((tech, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 rounded-xl text-center text-[11px] font-bold border bg-[#12372A]/60 text-emerald-200 border-emerald-500/20 shadow-sm transition-transform hover:scale-105"
                  >
                    {tech}
                  </div>
                ))}
              </div>

              {/* Footer Info inside Card: Email & Project Lead */}
              <div className="pt-4 border-t border-emerald-900/50 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-semibold">
                <a 
                  href="mailto:sheikhsadi.dev@gmail.com" 
                  className="flex items-center gap-1.5 hover:text-emerald-300 transition"
                >
                  <Mail size={14} className="text-emerald-400" />
                  <span>sheikhsadi.dev@gmail.com</span>
                </a>
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>Verbal Victory Lead Developer</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}