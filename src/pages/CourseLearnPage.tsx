import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import {
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
  Lock,
  Clock,
  ShieldAlert,
} from "lucide-react";

const courseContentData: Record<string, { title: string; category: string; lessonsCount: string; description: string; modules: { title: string; duration: string; videoUrl: string }[] }> = {
  "english-speaking-mastery": {
    title: "English Speaking Mastery",
    category: "SPOKEN ENGLISH",
    lessonsCount: "48 Lessons",
    description: "Master everyday conversations, advanced pronunciation, and natural fluency with structured practice modules.",
    modules: [
      { title: "Module 1: Overcoming Hesitation & Fear of Speaking", duration: "45 mins", videoUrl: "https://vimeo.com/1239295189" },
      { title: "Module 2: Daily Conversation Vocabulary & Phrases", duration: "60 mins", videoUrl: "https://archive.org/download/placeholder-video/sample.mp4" },
      { title: "Module 3: Advanced Pronunciation & Intonation Secrets", duration: "50 mins", videoUrl: "https://archive.org/download/placeholder-video/sample.mp4" },
    ],
  },
  "ielts-complete-prep": {
    title: "IELTS Complete Preparation",
    category: "IELTS PREPARATION",
    lessonsCount: "40 Lessons",
    description: "Comprehensive preparation for Listening, Reading, Writing, and Speaking modules to achieve your target 7.5+ band.",
    modules: [
      { title: "Module 1: IELTS Listening Strategies & Map Questions", duration: "50 mins", videoUrl: "https://vimeo.com/1239295189" },
      { title: "Module 2: IELTS Reading Academic Passage Analysis", duration: "75 mins", videoUrl: "https://archive.org/download/placeholder-video/sample.mp4" },
      { title: "Module 3: Writing Task 1 & Task 2 Band 8+ Framework", duration: "90 mins", videoUrl: "https://archive.org/download/placeholder-video/sample.mp4" },
    ],
  },
  "ielts-speaking-booster": {
    title: "IELTS Speaking Booster",
    category: "IELTS SPEAKING",
    lessonsCount: "20 Lessons",
    description: "Intensive practice for Speaking Parts 1, 2, and 3 with model answers and lexical resource training.",
    modules: [
      { title: "Module 1: Part 1 Common Topics & Fluency Hacks", duration: "40 mins", videoUrl: "https://archive.org/download/placeholder-video/sample.mp4" },
      { title: "Module 2: Part 2 Cue Card Structural Blueprint", duration: "60 mins", videoUrl: "https://archive.org/download/placeholder-video/sample.mp4" },
      { title: "Module 3: Part 3 Abstract Discussion & Complex Grammar", duration: "55 mins", videoUrl: "https://archive.org/download/placeholder-video/sample.mp4" },
    ],
  },
  "ielts-practice-test": {
    title: "IELTS Practice Test Program",
    category: "IELTS MOCK TEST",
    lessonsCount: "Practice Tests",
    description: "Timed mock exams simulating real computer-delivered IELTS testing conditions with instant band evaluation.",
    modules: [
      { title: "Test 1: Full-Length Timed Practice Examination", duration: "2 Hours 45 mins", videoUrl: "https://archive.org/download/placeholder-video/sample.mp4" },
      { title: "Test 2: Detailed Answer Explanations & Error Analysis", duration: "90 mins", videoUrl: "https://archive.org/download/placeholder-video/sample.mp4" },
    ],
  },
};

export default function CourseLearnPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [approvalStatus, setApprovalStatus] = useState<"approved" | "pending" | "none">("none");
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const courseInfo = courseId ? courseContentData[courseId] : null;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigate("/login", { replace: true });
        return;
      }

      if (courseId) {
        try {
          const docRef = doc(db, "enrollments", `${currentUser.uid}_${courseId}`);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setApprovalStatus(data.status || "approved");
          } else {
            setApprovalStatus("none");
          }
        } catch (error) {
          console.error("Error verifying approval status:", error);
        } finally {
          setIsChecking(false);
        }
      }
    });

    return unsubscribe;
  }, [courseId, navigate]);

  if (isChecking) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center gap-3 bg-[#F4F7F2] text-[#12372A]">
        <LoaderCircle className="animate-spin text-[#2E7D32]" size={28} />
        <span className="font-bold text-sm">Verifying admin approval status...</span>
      </div>
    );
  }

  if (!courseInfo) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center bg-[#F4F7F2]">
        <h2 className="text-2xl font-black text-[#12372A]">Course Not Found</h2>
        <p className="mt-2 text-xs text-slate-500">The course you are looking for does not exist.</p>
        <Link to="/courses" className="mt-5 rounded-xl bg-[#12372A] px-6 py-3 text-xs font-bold text-white">
          Back to Courses
        </Link>
      </div>
    );
  }

  if (approvalStatus !== "approved") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 bg-[#F4F7F2]">
        <div className="max-w-md w-full rounded-[2.5rem] border border-amber-200 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-4">
            {approvalStatus === "pending" ? <Clock size={30} /> : <Lock size={30} />}
          </div>
          <h2 className="text-xl font-black text-[#12372A]">
            {approvalStatus === "pending" ? "Payment Under Review" : "Access Denied: Not Enrolled"}
          </h2>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            {approvalStatus === "pending"
              ? "Your TrxID has been submitted and is waiting for Admin approval. You will gain full access once verified!"
              : "You have not enrolled in this course yet. Please complete payment first."}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link to="/courses" className="w-full rounded-2xl bg-[#12372A] py-3.5 text-xs font-extrabold text-white shadow-md hover:bg-[#2E7D32] transition">
              Back to Courses Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const activeModule = courseInfo.modules[activeModuleIndex] || courseInfo.modules[0];

  return (
    <div className="min-h-screen bg-[#F4F7F2] font-sans text-[#12372A] selection:bg-[#12372A] selection:text-white pb-20">
      <div className="bg-[#12372A] text-white px-6 py-5 shadow-md">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/account"
              className="flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-emerald-200 hover:bg-white/20 transition cursor-pointer"
            >
              <ArrowLeft size={16} /> Dashboard
            </Link>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">{courseInfo.category}</span>
              <h1 className="text-base sm:text-lg font-black">{courseInfo.title}</h1>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-900/50 border border-emerald-400/30 px-4 py-1.5 text-xs font-bold text-emerald-200">
            <CheckCircle2 size={15} className="text-emerald-400" /> Approved Access
          </div>
        </div>
      </div>

      {showWarning && (
        <div className="mx-auto max-w-7xl px-6 mt-4">
          <div className="flex items-center gap-2 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-xs font-bold text-amber-800 shadow-sm">
            <ShieldAlert size={18} className="text-amber-600 shrink-0" />
            <span>Please watch the complete video lesson before switching modules!</span>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6 pt-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="overflow-hidden rounded-[2.5rem] border border-emerald-200 bg-white shadow-lg">
            <div className="relative aspect-video bg-black flex items-center justify-center">
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

        <div className="space-y-6">
          <div className="rounded-[2.5rem] border border-emerald-200 bg-white p-6 sm:p-7 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-black text-[#12372A]">Course Syllabus</h3>
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