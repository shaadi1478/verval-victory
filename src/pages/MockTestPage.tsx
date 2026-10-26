import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock3,
  XCircle,
  Headphones,
  BookOpen,
  PenLine,
  Sparkles,
  ShieldCheck,
  FileText,
  Send,
} from "lucide-react";
import { moduleDataStore } from "../data/questionsData";

export default function MockTestPage() {
  const [selectedTestKey, setSelectedTestKey] = useState("Listening Practice");
  const [started, setStarted] = useState(false);

  const activeModule = moduleDataStore[selectedTestKey];

  // MCQ state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  
  // Writing state
  const [essayText, setEssayText] = useState("");

  const [timeLeft, setTimeLeft] = useState(activeModule.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const questions = activeModule.questions || [];
  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  const score = questions.reduce((total, q) => {
    return total + (answers[q.id] === q.answer ? 1 : 0);
  }, 0);

  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  const wordCount = essayText.trim() === "" ? 0 : essayText.trim().split(/\s+/).length;

  useEffect(() => {
    if (!started || isSubmitted) return;

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [started, isSubmitted]);

  function startTest() {
    setCurrentIndex(0);
    setAnswers({});
    setEssayText("");
    setTimeLeft(activeModule.durationMinutes * 60);
    setIsSubmitted(false);
    setShowReview(false);
    setStarted(true);
  }

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  // Active Test UI
  if (started) {
    // Submitted View
    if (isSubmitted) {
      return (
        <main className="min-h-screen bg-[#F4F7F2] px-5 py-12 text-[#12372A] font-sans relative">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-[2.5rem] border border-emerald-200 bg-white p-6 text-center sm:p-10 shadow-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F5E9] text-[#12372A]">
                <Award size={34} />
              </div>

              <p className="mt-6 text-xs font-bold tracking-[0.18em] text-[#2E7D32] uppercase">
                SESSION SUBMITTED SUCCESSFULLY
              </p>

              <h1 className="mt-2 text-3xl font-black text-[#12372A] sm:text-4xl">
                {activeModule.isWriting ? "Great Essay Submission!" : "Test Completed!"}
              </h1>

              {activeModule.isWriting ? (
                <div className="mt-6 rounded-2xl border border-emerald-100 bg-[#FAFDF8] p-6 text-left max-w-2xl mx-auto">
                  <p className="text-xs font-bold text-[#2E7D32] uppercase">Your Submitted Essay ({wordCount} words):</p>
                  <p className="mt-3 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                    {essayText || "No essay text entered."}
                  </p>
                </div>
              ) : (
                <>
                  <div className="mx-auto mt-8 flex h-40 w-40 flex-col items-center justify-center rounded-full border-8 border-emerald-200 bg-[#FAFDF8]">
                    <span className="text-4xl font-black text-[#12372A]">{percentage}%</span>
                    <span className="mt-1 text-xs font-semibold text-slate-500">Your Score</span>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-2xl mx-auto">
                    <div className="rounded-2xl border border-emerald-100 bg-[#FAFDF8] p-5">
                      <CheckCircle2 size={22} className="mx-auto text-[#2E7D32]" />
                      <p className="mt-2 text-2xl font-black text-[#12372A]">{score}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-500">Correct</p>
                    </div>
                    <div className="rounded-2xl border border-red-100 bg-red-50/50 p-5">
                      <XCircle size={22} className="mx-auto text-rose-600" />
                      <p className="mt-2 text-2xl font-black text-[#12372A]">{questions.length - score}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-500">Incorrect</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-100 bg-[#FAFDF8] p-5">
                      <BookOpen size={22} className="mx-auto text-sky-600" />
                      <p className="mt-2 text-2xl font-black text-[#12372A]">{answeredCount}/{questions.length}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-500">Answered</p>
                    </div>
                  </div>
                </>
              )}

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={startTest}
                  className="rounded-2xl bg-[#12372A] px-6 py-3.5 text-xs font-bold text-white hover:bg-[#1b4d3e]"
                >
                  Try Again
                </button>
                <button
                  type="button"
                  onClick={() => setStarted(false)}
                  className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Back to Modules
                </button>
              </div>
            </div>
          </div>
        </main>
      );
    }

    // Real Writing Practice Screen
    if (activeModule.isWriting) {
      const prompt = activeModule.writingPrompt!;
      return (
        <main className="min-h-screen bg-[#F4F7F2] px-4 py-8 text-[#12372A] font-sans">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-emerald-200 pb-4">
              <div>
                <p className="text-xs font-bold text-[#2E7D32] uppercase tracking-widest">{prompt.taskType}</p>
                <h1 className="text-2xl font-black text-[#12372A]">{activeModule.title}</h1>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-white px-5 py-2.5 shadow-sm">
                <Clock3 size={18} className="text-[#2E7D32]" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">TIME REMAINING</p>
                  <p className="text-base font-black tabular-nums">{formatTime(timeLeft)}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 items-start">
              <div className="rounded-[2.5rem] border border-emerald-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#2E7D32] uppercase mb-3">
                  <FileText size={16} />
                  Writing Prompt & Instructions
                </div>
                <div className="text-xs leading-relaxed text-slate-700 bg-[#FAFDF8] p-5 rounded-2xl border border-slate-100">
                  <p className="font-bold text-[#12372A] mb-2">Task Details:</p>
                  <p>{prompt.promptText}</p>
                  <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                    * Minimum recommended word count: {prompt.minWords} words. Organize your ideas into an introduction, clear body paragraphs, and a conclusion.
                  </div>
                </div>
              </div>

              <div className="rounded-[2.5rem] border border-emerald-200 bg-white p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-[#12372A] uppercase">Your Essay Editor</span>
                  <span className={`text-xs font-bold ${wordCount >= prompt.minWords ? "text-[#2E7D32]" : "text-amber-600"}`}>
                    Word Count: {wordCount} words
                  </span>
                </div>

                <textarea
                  rows={12}
                  value={essayText}
                  onChange={(e) => setEssayText(e.target.value)}
                  placeholder="Type your essay response here..."
                  className="w-full rounded-2xl border border-slate-200 bg-[#FAFDF8] p-4 text-xs font-medium text-slate-800 focus:border-[#12372A] focus:outline-none leading-relaxed resize-none"
                />

                <div className="mt-5 flex justify-between items-center border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => setStarted(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel Session
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#12372A] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#1b4d3e]"
                  >
                    Submit Essay <Send size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      );
    }

    // Listening & Reading Active MCQ Test View
    return (
      <main className="min-h-screen bg-[#F4F7F2] px-4 py-8 text-[#12372A] font-sans">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-emerald-200 pb-4">
            <div>
              <p className="text-xs font-bold text-[#2E7D32] uppercase tracking-widest">IELTS OFFICIAL SIMULATION</p>
              <h1 className="text-2xl font-black text-[#12372A]">{activeModule.title}</h1>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-white px-5 py-2.5 shadow-sm">
              <Clock3 size={18} className="text-[#2E7D32]" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">TIME REMAINING</p>
                <p className="text-base font-black tabular-nums">{formatTime(timeLeft)}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 items-start">
            <div className="rounded-[2.5rem] border border-emerald-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#2E7D32] uppercase mb-3">
                <FileText size={16} />
                {activeModule.passageTitle}
              </div>
              <div className="whitespace-pre-line text-xs leading-relaxed text-slate-700 bg-[#FAFDF8] p-5 rounded-2xl border border-slate-100 max-h-[500px] overflow-y-auto">
                {activeModule.passageContent}
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-emerald-200 bg-white p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-extrabold text-[#12372A]">
                  QUESTION {currentQuestion.id} of {questions.length}
                </span>
                <span className="text-xs font-bold text-slate-400">{currentQuestion.section}</span>
              </div>

              <h2 className="text-base font-black text-[#12372A]">{currentQuestion.question}</h2>

              <div className="mt-5 space-y-3">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = answers[currentQuestion.id] === idx;
                  const letter = String.fromCharCode(65 + idx);

                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: idx }))}
                      className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                        isSelected
                          ? "border-[#12372A] bg-emerald-50/60 ring-1 ring-[#12372A]"
                          : "border-slate-200 bg-[#FAFDF8] hover:border-emerald-300"
                      }`}
                    >
                      <span className={`flex h-7 w-7 items-center justify-center rounded-xl text-xs font-black ${
                        isSelected ? "bg-[#12372A] text-white" : "bg-white border border-slate-200 text-slate-600"
                      }`}>
                        {letter}
                      </span>
                      <span className="text-xs font-semibold text-slate-800 flex-1">{opt}</span>
                      {isSelected && <CheckCircle2 size={16} className="text-[#2E7D32]" />}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-between border-t border-slate-100 pt-5">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((p) => p - 1)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 disabled:opacity-40"
                >
                  Previous
                </button>

                {currentIndex === questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(true)}
                    className="rounded-xl bg-[#12372A] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#1b4d3e]"
                  >
                    Submit Module
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((p) => p + 1)}
                    className="rounded-xl bg-[#12372A] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#1b4d3e]"
                  >
                    Next Question
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Module Selection Screen
  return (
    <div className="min-h-screen bg-[#F4F7F2] font-sans text-[#12372A] selection:bg-[#12372A] selection:text-white">
      <section className="relative overflow-hidden bg-[#12372A] px-6 py-20 text-white sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest text-emerald-300">
            <Sparkles size={14} />
            ASSESSMENT LAB
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">IELTS Practice Test</h1>
          <p className="mt-4 max-w-2xl text-sm text-emerald-100/80 sm:text-base">
            Select a module below to practice official listening tasks, reading passages, or write live IELTS essays.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-6 md:grid-cols-3">
          {Object.keys(moduleDataStore).map((key) => {
            const mod = moduleDataStore[key];
            const Icon = key === "Listening Practice" ? Headphones : key === "Reading Practice" ? BookOpen : PenLine;
            const isSelected = selectedTestKey === key;

            return (
              <button
                type="button"
                key={key}
                onClick={() => setSelectedTestKey(key)}
                className={`group flex flex-col justify-between rounded-3xl border p-6 text-left transition-all ${
                  isSelected ? "border-[#12372A] bg-white shadow-lg ring-2 ring-[#12372A]/10" : "border-emerald-200/80 bg-white/80 hover:bg-white"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F5E9] text-[#12372A]">
                      <Icon size={22} />
                    </div>
                    {isSelected && <CheckCircle2 size={22} className="text-[#2E7D32]" />}
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-[#12372A]">{mod.title}</h3>
                  <p className="mt-2 text-xs text-slate-600">{mod.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <Clock3 size={14} className="text-[#2E7D32]" /> {mod.durationMinutes} mins
                  </span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-extrabold text-[#12372A]">
                    Ready
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 rounded-[2.5rem] border border-emerald-200 bg-white p-8 shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase">
                <ShieldCheck size={16} /> Selected Practice Module
              </div>
              <h3 className="mt-2 text-2xl font-black text-[#12372A]">{activeModule.title}</h3>
              <p className="mt-2 text-xs text-slate-600">{activeModule.description}</p>
            </div>
            <button
              type="button"
              onClick={startTest}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#12372A] px-8 py-3.5 text-xs font-bold text-white shadow-lg hover:bg-[#1b4d3e]"
            >
              Start Practice Session <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}