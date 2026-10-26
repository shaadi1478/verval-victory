import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Headphones,
  Mic,
  PlayCircle,
  Star,
  Trophy,
  Sparkles,
  ShieldCheck,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import DeveloperSection from "../components/DeveloperSection";

const courses = [
  {
    title: "IELTS Academic",
    level: "ALL LEVELS",
    description:
      "Build your core competencies in Listening, Reading, Writing and Speaking with verified, high-impact frameworks.",
    icon: GraduationCap,
    color: "bg-emerald-600/10 text-[#12372A] border-emerald-300/60",
    lessons: "40+ Structured Lessons",
  },
  {
    title: "Spoken English",
    level: "BEGINNER FRIENDLY",
    description:
      "Master natural fluidity and professional communication for real-world interactions and global workplaces.",
    icon: Mic,
    color: "bg-emerald-600/10 text-[#12372A] border-emerald-300/60",
    lessons: "30+ Interactive Modules",
  },
  {
    title: "IELTS General Training",
    level: "ALL LEVELS",
    description:
      "Prepare thoroughly for migration or work requirements with guided practice sessions and official mock simulations.",
    icon: BookOpen,
    color: "bg-emerald-600/10 text-[#12372A] border-emerald-300/60",
    lessons: "35+ Guided Sessions",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Verified Curriculum",
    description: "Designed by certified global English and IELTS examiners.",
  },
  {
    icon: Mic,
    title: "Speaking Labs",
    description: "Real-world conversational practice with immediate feedback.",
  },
  {
    icon: Trophy,
    title: "Guaranteed Progress",
    description: "Track measurable improvements with advanced analytics.",
  },
  {
    icon: BookOpen,
    title: "Lifetime Access",
    description: "Learn flexibly at your own pace from any device, anywhere.",
  },
];

const features = [
  {
    title: "Structured, Step-by-Step Methodology",
    description:
      "Eliminate guesswork with a clear roadmap designed to take you from foundational grammar to advanced band scores.",
  },
  {
    title: "Targeted Skill Enhancement",
    description:
      "Focus intensely on high-weightage modules including advanced vocabulary, active listening, and structured essay drafting.",
  },
  {
    title: "Exam-Ready Confidence",
    description:
      "Simulate real test environments and overcome hesitation before stepping into your official examination room.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#F4F7F2] font-sans text-[#12372A] selection:bg-[#12372A] selection:text-white">
      {/* Background Grid Pattern & Ambient Light */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Hero Section */}
      <section
        id="home"
        className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-28"
      >
        <div className="flex flex-col items-start">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-white px-4 py-2 text-xs font-bold tracking-wider text-[#12372A] shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#2E7D32] animate-pulse" />
            VERIFIED ENGLISH LEARNING PLATFORM
          </div>

          <h1 className="max-w-2xl text-4xl font-black leading-[1.1] tracking-tight text-[#12372A] sm:text-6xl lg:text-7xl">
            Your Voice. <br />
            Your Future. <br />
            <span className="bg-gradient-to-r from-[#12372A] via-[#2E7D32] to-[#43A047] bg-clip-text text-transparent">
              Unlimited.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Achieve absolute clarity and target band scores with an institutional-grade curriculum built for ambitious learners and professionals.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row">
            <Link
              to="/courses"
              className="group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-2xl bg-[#12372A] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-950/20 transition-all duration-300 hover:bg-[#1b4d3e] active:scale-[0.98]"
            >
              Explore Certified Courses
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/register"
              className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-2xl border border-emerald-300 bg-white px-7 py-3.5 text-sm font-bold text-[#12372A] shadow-sm transition-all duration-300 hover:bg-emerald-50 active:scale-[0.98]"
            >
              <PlayCircle size={18} className="text-[#2E7D32]" />
              Watch Free Sample
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-emerald-900/10 pt-6">
            <div className="flex -space-x-3">
              {["S", "A", "R", "M"].map((letter, index) => (
                <div
                  key={letter}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-xs font-bold ${
                    index % 2 === 0
                      ? "bg-[#12372A] text-white"
                      : "bg-[#2E7D32] text-white"
                  }`}
                >
                  {letter}
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={15} fill="currentColor" />
                ))}
              </div>
              <p className="mt-1 text-xs text-slate-600">
                Trusted by <span className="font-bold text-[#12372A]">2,500+</span> successful graduates
              </p>
            </div>
          </div>
        </div>

  {/* 🟢 Right Side: Interactive Course Preview Card */}
<div className="relative mx-auto w-full max-w-lg lg:max-w-none">
  {/* Background Ambient Glows */}
  <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
  <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-[#2E7D32]/15 blur-3xl pointer-events-none" />

  {/* Main Card Container */}
  <div className="relative rounded-[2.5rem] border border-emerald-900/10 bg-white/85 p-4 shadow-2xl shadow-emerald-950/10 backdrop-blur-2xl sm:p-6">
    <div className="rounded-[2rem] border border-emerald-100 bg-gradient-to-b from-[#FAFDF8] to-[#F4F7F2] p-5 shadow-sm sm:p-7">
      
      {/* Featured Banner Header */}
      <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-[#12372A] shadow-md">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
          alt="IELTS Live Program"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061410] via-transparent to-transparent" />
        
        <span className="absolute top-3 left-3 rounded-full bg-[#12372A]/80 backdrop-blur-md px-3 py-1 text-[10px] font-black uppercase text-emerald-300 border border-emerald-500/30">
          🔥 Most Enrolled Batch
        </span>

        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h3 className="text-lg font-black tracking-wide">IELTS Complete Band 7.5+</h3>
          <p className="text-[11px] text-emerald-200">Live Mentoring + 1:1 Speaking Evaluation</p>
        </div>
      </div>

      {/* Program Highlights */}
      <div className="my-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-emerald-200/80 bg-white p-3 shadow-sm text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Live Classes</p>
          <p className="text-base font-black text-[#12372A]">48 Sessions</p>
        </div>
        <div className="rounded-xl border border-emerald-200/80 bg-white p-3 shadow-sm text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Mock Tests</p>
          <p className="text-base font-black text-[#2E7D32]">12 Full Length</p>
        </div>
      </div>

      {/* Course Included Features List */}
      <div className="space-y-2.5 mb-6">
        {[
          "Personalized Speaking Correction & Feedback",
          "Band 8+ Writing Task 1 & 2 Evaluation",
          "1000+ Cambridge Keyword Hacks & Shortcuts",
        ].map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-[#12372A]">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#2E7D32]">
              <CheckCircle2 size={13} />
            </div>
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <Link
        to="/courses"
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#12372A] py-3.5 text-xs font-black text-white hover:bg-[#2E7D32] shadow-md transition cursor-pointer"
      >
        <span>Enroll in Next Batch</span>
        <ArrowRight size={16} />
      </Link>
    </div>

    {/* Floating Live Seats Left Badge */}
    <div className="absolute -right-3 -top-5 hidden sm:flex items-center gap-2.5 rounded-2xl border border-emerald-200/80 bg-white/95 p-3 shadow-xl backdrop-blur-xl">
      <span className="flex h-3 w-3 rounded-full bg-red-500 animate-ping" />
      <p className="text-[11px] font-extrabold text-[#12372A]">
        Only 5 Seats Remaining for November Batch!
      </p>
    </div>
  </div>
</div>
      </section>

      {/* Benefits Grid */}
      <section className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-6 rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4 lg:p-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F5E9] text-[#12372A] transition-colors duration-300 hover:bg-[#12372A] hover:text-white">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#12372A]">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Courses Section */}
      <section
        id="courses"
        className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:px-12"
      >
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#2E7D32]">
            CERTIFIED PROGRAMS
          </p>
          <h2 className="text-3xl font-black tracking-tight text-[#12372A] sm:text-4xl lg:text-5xl">
            Designed for professional results
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            Select a specialized course structured by veteran educators to fast-track your proficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const Icon = course.icon;
            return (
              <article
                key={course.title}
                className="group relative flex h-full flex-col rounded-3xl border border-emerald-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#12372A] hover:shadow-xl hover:shadow-emerald-950/10"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${course.color}`}>
                    <Icon size={26} />
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-extrabold tracking-wider text-[#12372A]">
                    {course.level}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-extrabold text-[#12372A]">
                  {course.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {course.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={15} className="text-[#2E7D32]" />
                    {course.lessons}
                  </span>
                  <span className="flex items-center gap-1 text-[#2E7D32] font-bold">
                    <ShieldCheck size={14} /> Certified
                  </span>
                </div>

                <Link
                  to="/courses"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/50 py-3 text-sm font-bold text-[#12372A] transition-all duration-300 group-hover:bg-[#12372A] group-hover:text-white"
                >
                  View Curriculum
                  <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300 bg-white px-7 py-3.5 text-sm font-bold text-[#12372A] shadow-sm transition-all duration-300 hover:bg-emerald-50"
          >
            Explore All Programs
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative border-y border-emerald-200 bg-[#E8F5E9]/50 py-20 sm:py-28">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#2E7D32]">
              WHY CHOOSE VERBAL VICTORY
            </p>

            <h2 className="text-3xl font-black tracking-tight text-[#12372A] sm:text-4xl lg:text-5xl">
              An institution built on reliability and success.
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
              We combine robust academic structure with practical digital learning tools to guarantee continuous skill development.
            </p>

            <div className="mt-8 space-y-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#12372A] text-white shadow-md shadow-emerald-950/20">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#12372A]">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/register"
              className="mt-10 inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-[#12372A] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#1b4d3e]"
            >
              Enroll in Next Batch
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="rounded-[2.5rem] border border-white bg-white/80 p-4 shadow-xl backdrop-blur-xl sm:p-6">
            <div className="rounded-[2rem] border border-emerald-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    ACCREDITED FRAMEWORK
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold text-[#12372A]">
                    Core Competencies
                  </h3>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-[#12372A]">
                  <Award size={22} />
                </div>
              </div>

              <div className="mt-6 space-y-5">
                {[
                  { label: "Vocabulary Architecture", value: "Advanced lexical resources", icon: BookOpen },
                  { label: "Auditory Processing", value: "Native speed comprehension", icon: Headphones },
                  { label: "Verbal Expression", value: "Structured impromptu speech", icon: Mic },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-4 rounded-2xl border border-emerald-100 bg-[#FAFDF8] p-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-200 text-[#12372A]">
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-[#12372A]">
                          {item.label}
                        </h4>
                        <p className="text-[11px] text-slate-600">
                          {item.value}
                        </p>
                      </div>
                      <CheckCircle2 size={18} className="text-[#2E7D32]" />
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl bg-emerald-50 p-4 border border-emerald-200">
                <p className="text-xs font-extrabold text-[#12372A]">
                  Guaranteed Academic Support
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                  Dedicated mentors available daily to clear doubts and evaluate speaking performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DeveloperSection />
      {/* CTA Section */}
      <section id="contact" className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#12372A] px-8 py-14 text-white shadow-2xl sm:px-12 sm:py-20 lg:flex lg:items-center lg:justify-between lg:px-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full border border-white/10 bg-emerald-400/10 blur-2xl" />

          <div className="relative max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-300">
              SECURE YOUR ADMISSION
            </p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Ready to secure your target score?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-emerald-100/80 sm:text-base">
              Enroll today in our upcoming batch and take a definitive step toward academic and career success.
            </p>
          </div>

          <div className="relative mt-8 flex flex-col gap-3.5 sm:flex-row lg:mt-0 lg:flex-col">
            <Link
              to="/register"
              className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-extrabold text-[#12372A] shadow-lg transition-all duration-300 hover:bg-emerald-50 active:scale-[0.98]"
            >
              Enroll Now Free
              <ArrowRight size=
{18} />
            </Link>
            <Link
              to="/courses"
              className="inline-flex min-h-[50px] items-center justify-center rounded-2xl border border-white/30 bg-white/5 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
            >
              View Schedule
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}