import { useState } from "react";
import PaymentInstructionModal from "../components/PaymentInstructionModal";
import LearningCenterSlider from "../components/LearningCenterSlider"; // 👈 Slider Import
import { BookOpen, CheckCircle, Clock, Sparkles } from "lucide-react";
import StudentExperiencesSlider from "../components/StudentExperiencesSlider";

// Course List
const COURSES = [
  {
    id: "spoken-english",
    title: "Spoken English Mastery",
    description: "Fluency development, accent training, and real-life conversation practice for everyday confidence.",
    price: "৳২,৫০০",
    duration: "3 Months",
    lessons: "36 Live Classes",
    popular: true,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ielts-complete",
    title: "IELTS Complete Band 7.5+",
    description: "Comprehensive preparation covering Academic & General Training: Listening, Reading, Writing & Speaking.",
    price: "৳৪,৫০০",
    duration: "4 Months",
    lessons: "48 Live Classes",
    popular: false,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "speaking-booster",
    title: "IELTS Speaking Booster",
    description: "One-on-one speaking feedback, cue card strategies, and mock tests to score Band 7+ in Speaking.",
    price: "৳১,৮০০",
    duration: "1.5 Months",
    lessons: "18 Live Classes",
    popular: false,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ielts-writing-crash",
    title: "IELTS Writing Task 1 & 2 Special",
    description: "Master Task 1 graphs & Task 2 essay structures with personalized evaluation and grammar correction.",
    price: "৳২,০০০",
    duration: "1.5 Months",
    lessons: "20 Live Classes",
    popular: false,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "reading-listening-crack",
    title: "Reading & Listening Band 8+ Hacks",
    description: "Learn time management, keyword matching, and question-solving shortcuts for Academic & General reading.",
    price: "৳২,২০০",
    duration: "2 Months",
    lessons: "24 Live Classes",
    popular: false,
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "vocab-grammar-foundation",
    title: "Advanced Vocab & Grammar Foundation",
    description: "Build a solid foundation with 1000+ IELTS topic-based vocabulary, collocations, and complex sentence structures.",
    price: "৳১,৫০০",
    duration: "1 Month",
    lessons: "15 Live Classes",
    popular: false,
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "corporate-business-english",
    title: "Corporate & Business Communication",
    description: "Professional email writing, presentation skills, interview preparation, and workplace English fluency.",
    price: "৳৩,০০০",
    duration: "2.5 Months",
    lessons: "30 Live Classes",
    popular: false,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
  },
];

export default function CoursesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{
    id: string;
    title: string;
    price: string;
  } | null>(null);

  const handleEnrollClick = (course: { id: string; title: string; price: string }) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="min-h-screen bg-[#F4F7F2] py-12 px-6 font-sans text-[#12372A]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-100 text-[#2E7D32] text-xs font-extrabold uppercase tracking-wider rounded-full mb-3">
            <Sparkles size={14} /> Premium Learning Programs
          </span>
          <h1 className="text-3xl sm:text-4xl font-black">Choose Your Target Program</h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Enroll today to unlock personalized mentoring, live practice sessions, and step-by-step guidance.
          </p>
        </div>

        {/* Course Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className={`relative flex flex-col sm:flex-row items-center rounded-[2rem] bg-white overflow-hidden shadow-md border p-4 sm:p-5 transition-all duration-300 hover:shadow-xl ${
                course.popular ? "border-[#2E7D32] ring-2 ring-[#2E7D32]/20" : "border-emerald-100"
              }`}
            >
              {/* Left Side: Thumbnail */}
              <div className="relative h-44 sm:h-40 w-full sm:w-44 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100 mb-4 sm:mb-0">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {course.popular && (
                  <span className="absolute top-2.5 left-2.5 rounded-md bg-[#12372A] px-2 py-0.5 text-[9px] font-black uppercase text-white shadow-md">
                    Popular
                  </span>
                )}
              </div>

              {/* Right Side: Details & Action */}
              <div className="sm:ml-5 flex flex-col justify-between flex-grow w-full">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#12372A] line-clamp-1">{course.title}</h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">{course.description}</p>

                  <div className="mt-3 flex items-center gap-4 text-[11px] font-bold text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-[#2E7D32]" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={13} className="text-[#2E7D32]" /> {course.lessons}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-lg sm:text-xl font-black text-[#12372A]">{course.price}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleEnrollClick(course)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#00A859] px-4 py-2.5 text-xs font-black text-white hover:bg-[#00904d] shadow-sm transition cursor-pointer"
                  >
                    <CheckCircle size={14} /> Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>

      {/* Manual Payment Instruction Modal */}
      {selectedCourse && (
        <PaymentInstructionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          courseId={selectedCourse.id}
          courseTitle={selectedCourse.title}
          coursePrice={selectedCourse.price}
        />
      )}
    </div>
            {/* 🟢 Learning Centers Slider Added at the Bottom of CoursesPage */}
        <StudentExperiencesSlider />
        <LearningCenterSlider />
    </div>
  );
}