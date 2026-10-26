import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldAlert,
  BookOpen,
  PlayCircle,
} from "lucide-react";

// ফ্রি কোর্সগুলোর আলাদা ডেটাবেজ ও মডিউল
const freeCourseContentData: Record<string, { title: string; category: string; lessonsCount: string; description: string; modules: { title: string; duration: string; videoUrl: string }[] }> = {
  "free-spoken-basics": {
    title: "Free Spoken English Starter Kit",
    category: "SPOKEN ENGLISH",
    lessonsCount: "12 Free Videos",
    description: "Learn essential everyday sentences and greetings without any cost.",
    modules: [
      { title: "Lesson 1: Common Everyday Greetings & Expressions", duration: "20 mins", videoUrl: "https://vimeo.com/1239295189" },
      { title: "Lesson 2: Basic Sentence Structures for Daily Use", duration: "25 mins", videoUrl: "https://archive.org/download/placeholder-video/sample.mp4" },
      { title: "Lesson 3: Overcoming Hesitation & Building Confidence", duration: "30 mins", videoUrl: "https://archive.org/download/placeholder-video/sample.mp4" },
    ],
  },
  "free-ielts-roadmap": {
    title: "IELTS Band 7.5+ Master Plan",
    category: "IELTS PREPARATION",
    lessonsCount: "15 Free Sessions",
    description: "A complete step-by-step guideline and strategy blueprint to crack IELTS.",
    modules: [
      { title: "Session 1: IELTS Exam Structure & Scoring System", duration: "35 mins", videoUrl: "https://vimeo.com/1239295189" },
      { title: "Session 2: Reading Hacks for Skimming & Scanning", duration: "40 mins", videoUrl: "https://archive.org/download/placeholder-video/sample.mp4" },
      { title: "Session 3: Writing Task 1 Overview & Templates", duration: "45 mins", videoUrl: "https://archive.org/download/placeholder-video/sample.mp4" },
    ],
  },
  "free-vocabulary-hacks": {
    title: "1000+ IELTS Vocabulary Shortcuts",
    category: "VOCABULARY",
    lessonsCount: "10 Modules",
    description: "Build advanced lexical resources for writing and speaking.",
    modules: [
      { title: "Module 1: Environment & Climate Change Lexicon", duration: "30 mins", videoUrl: "https://vimeo.com/1239295189" },
      { title: "Module 2: Technology & Education High-Band Words", duration: "35 mins", videoUrl: "https://archive.org/download/placeholder-video/sample.mp4" },
    ],
  },
  "free-grammar-foundation": {
    title: "Advanced English Grammar Bootcamp",
    category: "GRAMMAR",
    lessonsCount: "14 Lessons",
    description: "Master complex sentence structures and error-free writing.",
    modules: [
      { title: "Module 1: Master Tenses in 30 Minutes", duration: "30 mins", videoUrl: "https://vimeo.com/1239295189" },
      { title: "Module 2: Complex Sentences & Relative Clauses", duration: "40 mins", videoUrl: "https://archive.org/download/placeholder-video/sample.mp4" },
    ],
  },
};

export default function FreeCourseLearnPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const courseInfo = courseId ? freeCourseContentData[courseId] : null;

  if (!courseInfo) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center bg-[#F4F7F2]">
        <h2 className="text-2xl font-black text-[#12372A]">Free Course Not Found</h2>
        <p className="mt-2 text-xs text-slate-500">The free resource you are looking for does not exist.</p>
        <Link to="/free-courses" className="mt-5 rounded-xl bg-[#12372A] px-6 py-3 text-xs font-bold text-white">
          Back to Free Courses
        </Link>
      </div>
    );
  }

  const activeModule = courseInfo.modules[activeModuleIndex] || courseInfo.modules[0];

  // Vimeo URL থেকে Embed লিঙ্কে রূপান্তর করার ফাংশন
  const getVimeoEmbedUrl = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    if (match && match[1]) {
      return `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
    }
    return url;
  };

  const isVimeo = activeModule.videoUrl.includes("vimeo.com");

  return (
    <div className="min-h-screen bg-[#F4F7F2] font-sans text-[#12372A] pb-20">
      {/* Top Header Bar */}
      <div className="bg-[#12372A] text-white px-6 py-5 shadow-md">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/free-courses")}
              className="flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-emerald-200 hover:bg-white/25 transition cursor-pointer"
            >
              <ArrowLeft size={16} /> Free Courses Hub
            </button>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">{courseInfo.category}</span>
              <h1 className="text-base sm:text-lg font-black">{courseInfo.title}</h1>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-900/50 border border-emerald-400/30 px-4 py-1.5 text-xs font-bold text-emerald-200">
            <CheckCircle2 size={15} className="text-emerald-400" /> 100% Free Access
          </div>
        </div>
      </div>

      {/* Warning Alert if switching without completion */}
      {showWarning && (
        <div className="mx-auto max-w-7xl px-6 mt-4">
          <div className="flex items-center gap-2 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-xs font-bold text-amber-800 shadow-sm">
            <ShieldAlert size={18} className="text-amber-600 shrink-0" />
            <span>Please watch the complete video lesson before switching modules!</span>
          </div>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="mx-auto max-w-7xl px-6 pt-8 grid lg:grid-cols-3 gap-8">
        
        {/* Left: Video Player Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="overflow-hidden rounded-[2.5rem] border border-emerald-200 bg-white shadow-lg">
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {isVimeo ? (
                <iframe
                  key={activeModule.videoUrl}
                  src={getVimeoEmbedUrl(activeModule.videoUrl)}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={activeModule.title}
                ></iframe>
              ) : (
                <video
                  key={activeModule.videoUrl}
                  controls
                  controlsList="nodownload"
                  className="w-full h-full object-contain"
                  onEnded={() => setIsVideoCompleted(true)}
                >
                  <source src={activeModule.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-extrabold text-[#12372A]">
                    Active Lesson
                  </span>
                  <span className="text-xs font-bold text-slate-500">{activeModule.duration}</span>
                </div>
                <h2 className="text-xl font-black text-[#12372A]">{activeModule.title}</h2>
              </div>

              {!isVideoCompleted ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsVideoCompleted(true);
                    setShowWarning(false);
                  }}
                  className="rounded-xl bg-[#2E7D32] px-5 py-3 text-xs font-bold text-white hover:bg-[#1b4d20] shadow-md transition cursor-pointer"
                >
                  Mark as Watched
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-100 px-4 py-3 text-xs font-bold text-emerald-800">
                  <CheckCircle2 size={16} /> Completed
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Module Syllabus List */}
        <div className="space-y-6">
          <div className="rounded-[2.5rem] border border-emerald-200 bg-white p-6 sm:p-7 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-black text-[#12372A]">Free Course Syllabus</h3>
              <span className="text-xs font-bold text-[#2E7D32]">{courseInfo.lessonsCount}</span>
            </div>

            <div className="space-y-3">
              {courseInfo.modules.map((mod, index) => {
                const isActive = activeModuleIndex === index;
                return (
                  <button
                    key={mod.title}
                    type="button"
                    onClick={() => {
                      if (!isVideoCompleted && !isActive) {
                        setShowWarning(true);
                        return;
                      }
                      setActiveModuleIndex(index);
                      setIsVideoCompleted(false);
                      setShowWarning(false);
                    }}
                    className={`w-full flex items-start gap-3 rounded-2xl p-4 text-left transition cursor-pointer ${
                      isActive
                        ? "border-2 border-[#12372A] bg-emerald-50/60 shadow-sm"
                        : "border border-slate-100 bg-[#FAFDF8] hover:bg-slate-50"
                    }`}
                  >
                    <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl font-black text-xs ${
                      isActive ? "bg-[#12372A] text-white" : "bg-emerald-100 text-[#12372A]"
                    }`}>
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-extrabold line-clamp-1 ${isActive ? "text-[#12372A]" : "text-slate-700"}`}>
                        {mod.title}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-400 font-medium">{mod.duration}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}