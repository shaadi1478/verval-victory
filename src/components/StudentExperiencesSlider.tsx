import { useRef, useEffect, useState } from "react";
import { Star, Play, X } from "lucide-react";

// Student/Parent Experience Reviews Data (Vimeo Embed ID যুক্ত করা হয়েছে)
const EXPERIENCES = [
  {
    id: 1,
    title: "আমার কোনো ইচ্ছা চাপিয়ে দিতে চাই না",
    name: "Md. Reasheduzzaman",
    role: "Rashed's mother (Rebecca Sultana - Spoken English Junior A1 Batch)",
    thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    vimeoId: "1239295189", // আপনার দেওয়া Vimeo ভিডিও ID
  },
  {
    id: 2,
    name: "Roksana Zaman",
    role: "Kamruzzaman's mother (Spoken English Junior B2 Batch)",
    title: "Spoken English এখন একটা গেম!",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    vimeoId: "1239295189",
  },
  {
    id: 3,
    name: "Ayesha Akhter",
    role: "Raisa's mother (Spoken English Junior A1 Batch)",
    title: "বাংলা মিডিয়ামের স্টুডেন্ট ও কি...",
    thumbnail: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    vimeoId: "1239295189",
  },
  {
    id: 4,
    name: "Shamim Ahsan",
    role: "Naswan's father (Spoken English Junior B2 Batch)",
    title: "Cambridge University তে পড়ার স্বপ্ন",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    vimeoId: "1239295189",
  },
  {
    id: 5,
    name: "Romana Parveen Roxy",
    role: "Darave's mother (Spoken English Junior AA2 Batch)",
    title: "আমার ছেলের হার মানে না",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    vimeoId: "1239295189",
  },
];

export default function StudentExperiencesSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftState = useRef(0);

  // Video Modal State
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Auto smooth infinite horizontal scrolling effect
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationId: number;
    const speed = 0.5; // Auto slide speed

    const autoScroll = () => {
      // যদি ভিডিও মোডাল খোলা থাকে বা ইউজার ড্র্যাগ করে, তবে অটো-স্লল থেমকে যাবে
      if (!isDragging.current && !activeVideoId && slider) {
        slider.scrollLeft += speed;
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
          slider.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationId);
  }, [activeVideoId]);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    if (sliderRef.current) {
      startX.current = e.pageX - sliderRef.current.offsetLeft;
      scrollLeftState.current = sliderRef.current.scrollLeft;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    sliderRef.current.scrollLeft = scrollLeftState.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#F4F7F2] via-[#E2EDE8] to-[#F4F7F2] py-16 my-16 text-[#12372A] relative overflow-hidden font-sans border-y border-emerald-200 shadow-inner">
      
      {/* Header Section */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-12 px-6">
        <div className="flex justify-center gap-1.5 text-amber-500 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={20} fill="currentColor" className="drop-shadow-sm" />
          ))}
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#12372A]">
          Experiences of our students and parents
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
          Real stories and inspiring reviews from our vibrant learning community.
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative z-10 w-full px-4 sm:px-12">
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-6 pt-2 px-2 cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {EXPERIENCES.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveVideoId(item.vimeoId)}
              className="relative flex-shrink-0 w-72 sm:w-80 h-[420px] rounded-[2.5rem] overflow-hidden shadow-xl border border-emerald-300/40 bg-white flex flex-col justify-between group transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
            >
              {/* Thumbnail Image Background */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full h-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061410] via-[#061410]/40 to-transparent" />
              </div>

              {/* Title / Quote */}
              <div className="relative z-10 p-6 pt-7">
                <h3 className="text-lg sm:text-xl font-black text-white leading-snug drop-shadow-md">
                  "{item.title}"
                </h3>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play size={22} fill="currentColor" className="ml-1" />
                </div>
              </div>

              {/* Author Details Footer */}
              <div className="relative z-10 p-5 flex items-center gap-3 border-t border-emerald-500/20 bg-[#061410]/90 backdrop-blur-md">
                <div className="w-11 h-11 rounded-full bg-[#12372A] flex items-center justify-center text-white font-bold text-sm overflow-hidden border-2 border-emerald-400/60 flex-shrink-0 shadow-md">
                  <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover pointer-events-none" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-black text-emerald-300 truncate">{item.name}</h4>
                  <p className="text-[10px] text-slate-300 truncate mt-0.5">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🟢 Vimeo Video Player Modal */}
      {activeVideoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/30">
            {/* Close Button */}
            <button
              onClick={() => setActiveVideoId(null)}
              className="absolute top-4 right-4 z-20 rounded-full bg-black/60 p-2 text-white hover:bg-red-600 transition cursor-pointer shadow-lg"
            >
              <X size={20} />
            </button>

            {/* Vimeo Embed Iframe */}
            <iframe
              src={`https://player.vimeo.com/video/${activeVideoId}?autoplay=1`}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Student Experience Video"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}