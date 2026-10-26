import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, BookOpen, PlayCircle, ArrowRight } from "lucide-react";

// 10 Minute School Free Category-er moto free course/resources list
const FREE_COURSES = [
  {
    id: "free-spoken-basics",
    title: "Free Spoken English Starter Kit",
    category: "SPOKEN ENGLISH",
    lessons: "12 Free Videos",
    duration: "2 Hours",
    description: "Learn essential everyday sentences, greetings, and basic grammatical rules without any cost.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    badge: "100% Free",
  },
  {
    id: "free-ielts-roadmap",
    title: "IELTS Band 7.5+ Master Plan",
    category: "IELTS PREPARATION",
    lessons: "15 Free Sessions",
    duration: "3.5 Hours",
    description: "A complete step-by-step guideline and strategy blueprint to crack IELTS Academic & General.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    badge: "Popular Free",
  },
  {
    id: "free-vocabulary-hacks",
    title: "1000+ IELTS Vocabulary Shortcuts",
    category: "VOCABULARY",
    lessons: "10 Modules",
    duration: "1.5 Hours",
    description: "Build advanced lexical resources and learn how to use high-band words correctly in writing and speaking.",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&q=80",
    badge: "Free Guide",
  },
  {
    id: "free-grammar-foundation",
    title: "Advanced English Grammar Bootcamp",
    category: "GRAMMAR",
    lessons: "14 Lessons",
    duration: "2.5 Hours",
    description: "Master complex sentence structures, tenses, and error-free writing techniques for professional communication.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
    badge: "100% Free",
  },
];

const CATEGORIES = ["All", "SPOKEN ENGLISH", "IELTS PREPARATION", "VOCABULARY", "GRAMMAR"];

export default function FreeCoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses = selectedCategory === "All"
    ? FREE_COURSES
    : FREE_COURSES.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#F4F7F2] py-12 px-6 font-sans text-[#12372A]">
      <div className="mx-auto max-w-6xl space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#12372A]/10 text-[#12372A] text-xs font-black uppercase tracking-wider rounded-full shadow-sm">
            <Sparkles size={14} className="text-[#2E7D32]" /> Free Learning Hub
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#12372A]">
            Explore Free Classes & Resources
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Upskill yourself with expert-led free sessions, crash courses, and comprehensive guides designed for ambitious learners.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all shadow-sm cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#12372A] text-white shadow-md scale-105"
                  : "bg-white text-slate-600 border border-emerald-950/10 hover:bg-emerald-50 hover:text-[#12372A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Free Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group flex flex-col sm:flex-row items-center rounded-[2.5rem] bg-white overflow-hidden shadow-md border border-emerald-950/10 p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:border-emerald-500/30"
            >
              {/* Thumbnail Image */}
              <div className="relative h-44 sm:h-40 w-full sm:w-44 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100 mb-4 sm:mb-0">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-2.5 left-2.5 rounded-md bg-[#2E7D32] px-2.5 py-1 text-[9px] font-black uppercase text-white shadow-md">
                  {course.badge}
                </span>
              </div>

              {/* Course Details */}
              <div className="sm:ml-5 flex flex-col justify-between flex-grow w-full">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#2E7D32]">
                    {course.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-[#12372A] mt-1 line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 line-clamp-2 font-medium leading-relaxed">
                    {course.description}
                  </p>

                  <div className="mt-3 flex items-center gap-4 text-[11px] font-bold text-slate-500">
                    <span className="flex items-center gap-1 text-[#12372A]">
                      <BookOpen size={13} className="text-[#2E7D32]" /> {course.lessons}
                    </span>
                    <span className="flex items-center gap-1 text-[#12372A]">
                      <PlayCircle size={13} className="text-[#2E7D32]" /> {course.duration}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-sm font-black text-[#2E7D32] uppercase tracking-wider">
                    Free Access
                  </span>

                  {/* 🟢 Corrected dynamic link to Free Course Learn Page */}
                  <Link
                    to={`/free-courses/${course.id}/learn`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#12372A] px-4 py-2.5 text-xs font-black text-white hover:bg-[#2E7D32] shadow-sm transition cursor-pointer"
                  >
                    <span>Start Learning</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="rounded-[2.5rem] bg-[#12372A] p-8 sm:p-10 text-white text-center space-y-4 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <h3 className="text-xl sm:text-2xl font-black">Want to unlock full structured live batches?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium">
            Take your preparation to the next level with our premium certified courses, 1:1 speaking evaluations, and full-length mock exams.
          </p>

          <div>
            {/* 🟢 Fixed bottom banner link to point to main courses page */}
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3 text-xs font-black text-[#12372A] hover:bg-emerald-50 shadow-md transition cursor-pointer"
            >
              <span>Explore Premium Courses</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}