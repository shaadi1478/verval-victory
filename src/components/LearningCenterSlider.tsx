import { useEffect, useRef } from "react";
import { Award } from "lucide-react";

// Row 1 Images
const ROW_1_IMAGES = [
  { id: 1, url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80", title: "Modern Discussion Room" },
  { id: 2, url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80", title: "Interactive Smart Classroom" },
  { id: 3, url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80", title: "Spacious Student Lounge" },
  { id: 4, url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80", title: "Computer Lab & Practice Zone" },
  { id: 5, url: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=600&q=80", title: "Advanced Audio-Visual Studio" },
];

// Row 2 Images
const ROW_2_IMAGES = [
  { id: 6, url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80", title: "Group Study Hall" },
  { id: 7, url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80", title: "Executive Meeting Space" },
  { id: 8, url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80", title: "Interactive Workshop Area" },
  { id: 9, url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80", title: "Collaboration Pods" },
  { id: 10, url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80", title: "Digital Media Station" },
];

export default function LearningCenterSlider() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Auto smooth infinite horizontal scrolling effect
  useEffect(() => {
    const r1 = row1Ref.current;
    const r2 = row2Ref.current;

    let animationFrameId: number;

    const scrollSpeed = 0.8; // Adjust speed here

    const handleAutoScroll = () => {
      if (r1) {
        r1.scrollLeft += scrollSpeed;
        // Infinite loop reset
        if (r1.scrollLeft >= r1.scrollWidth / 2) {
          r1.scrollLeft = 0;
        }
      }
      if (r2) {
        r2.scrollLeft -= scrollSpeed; // Reverse direction for row 2
        if (r2.scrollLeft <= 0) {
          r2.scrollLeft = r2.scrollWidth / 2;
        }
      }
      animationFrameId = requestAnimationFrame(handleAutoScroll);
    };

    animationFrameId = requestAnimationFrame(handleAutoScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="mt-20 py-12 px-4 bg-white rounded-[3rem] border border-emerald-100 shadow-sm overflow-hidden">
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 text-amber-600 font-extrabold text-xs uppercase tracking-widest mb-2">
          <Award size={16} /> English Center
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#12372A]">
          Take a look at our learning centers
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          World-class offline environment designed for immersive Spoken English & IELTS practice.
        </p>
      </div>

      {/* Slider Container with 2 Rows */}
      <div className="flex flex-col gap-4 overflow-hidden relative w-full">
        
        {/* Row 1 (Auto Scrolling Left) */}
        <div 
          ref={row1Ref}
          className="flex gap-4 overflow-x-hidden whitespace-nowrap py-2 no-scrollbar"
          style={{ scrollBehavior: "auto" }}
        >
          {[...ROW_1_IMAGES, ...ROW_1_IMAGES].map((item, index) => (
            <div 
              key={`r1-${item.id}-${index}`}
              className="inline-block relative h-44 sm:h-56 w-72 sm:w-80 flex-shrink-0 rounded-2xl overflow-hidden shadow-md border border-slate-100 group"
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <h4 className="text-white text-xs sm:text-sm font-black tracking-wide">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 (Auto Scrolling Right) */}
        <div 
          ref={row2Ref}
          className="flex gap-4 overflow-x-hidden whitespace-nowrap py-2 no-scrollbar"
          style={{ scrollBehavior: "auto" }}
        >
          {[...ROW_2_IMAGES, ...ROW_2_IMAGES].map((item, index) => (
            <div 
              key={`r2-${item.id}-${index}`}
              className="inline-block relative h-44 sm:h-56 w-72 sm:w-80 flex-shrink-0 rounded-2xl overflow-hidden shadow-md border border-slate-100 group"
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <h4 className="text-white text-xs sm:text-sm font-black tracking-wide">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}