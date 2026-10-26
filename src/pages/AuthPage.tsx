import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth";
import {
  UserRound,
  Mail,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  LogOut,
  ArrowRight,
  LoaderCircle,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { auth } from "../lib/firebase";

export default function AccountPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);

      if (!currentUser) {
        navigate("/login", { replace: true });
      }
    });

    return unsubscribe;
  }, [navigate]);

  async function handleLogout() {
    setError("");
    setLoggingOut(true);

    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch {
      setError("Unable to log out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  if (checkingAuth) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center gap-3 text-[#12372A] bg-[#F4F7F2]">
        <LoaderCircle className="animate-spin text-[#2E7D32]" size={26} />
        <span className="font-bold text-sm">Verifying your account session...</span>
      </div>
    );
  }

  if (!user) return null;

  const displayName = user.displayName || "Student";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <section className="min-h-[75vh] bg-[#F4F7F2] px-6 py-16 sm:py-20 lg:px-12 font-sans text-[#12372A] selection:bg-[#12372A] selection:text-white relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="mx-auto max-w-6xl">
        {/* Welcome Header */}
        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-white px-4 py-1.5 text-xs font-bold tracking-wider text-[#12372A] shadow-sm">
            <Sparkles size={14} className="text-[#2E7D32]" />
            STUDENT DASHBOARD
          </div>

          <h1 className="text-3xl font-black tracking-tight text-[#12372A] sm:text-4xl">
            Welcome back, {displayName}!
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Manage your account credentials and continue your structured learning journey.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700 shadow-sm"
          >
            {error}
          </div>
        )}

        {/* Profile Card */}
        <div className="mb-8 overflow-hidden rounded-[2.5rem] border border-emerald-200 bg-white shadow-xl shadow-emerald-950/5">
          <div className="h-2.5 bg-gradient-to-r from-[#12372A] via-[#2E7D32] to-[#43A047]" />

          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-3xl font-black text-[#12372A] shadow-sm border border-emerald-200">
              {initial}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-extrabold text-[#12372A]">
                {displayName}
              </h2>

              <p className="mt-1 break-all text-xs font-medium text-slate-500">
                {user.email}
              </p>

              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-extrabold text-[#12372A]">
                <ShieldCheck size={14} className="text-[#2E7D32]" />
                Verified Student Account
              </span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:opacity-60 shadow-sm"
            >
              <LogOut size={17} />
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>

        {/* Account Details & Navigation Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <div className="rounded-[2.5rem] border border-emerald-200 bg-white p-7 shadow-sm sm:p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F5E9] text-[#12372A]">
              <UserRound size={22} />
            </div>

            <h3 className="text-xl font-black text-[#12372A]">
              Personal Information
            </h3>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-[#FAFDF8] p-4">
                <UserRound size={18} className="mt-0.5 text-[#2E7D32]" />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Full Name</p>
                  <p className="break-words text-sm font-extrabold text-[#12372A]">
                    {displayName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-[#FAFDF8] p-4">
                <Mail size={18} className="mt-0.5 text-[#2E7D32]" />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                  <p className="break-all text-sm font-extrabold text-[#12372A]">
                    {user.email || "No email available"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-[#FAFDF8] p-4">
                <GraduationCap size={18} className="mt-0.5 text-[#2E7D32]" />
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Account Type</p>
                  <p className="text-sm font-extrabold text-[#12372A]">
                    Standard Student Portal
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Learning Shortcuts */}
          <div className="rounded-[2.5rem] border border-emerald-200 bg-white p-7 shadow-sm sm:p-8 flex flex-col justify-between">
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F5E9] text-[#12372A]">
                <BookOpen size={22} />
              </div>

              <h3 className="text-xl font-black text-[#12372A]">
                Continue Learning
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Explore active certification courses and practice your English skills with our interactive tools.
              </p>

              <div className="mt-6 space-y-3.5">
                <Link
                  to="/courses"
                  className="group flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 transition-all hover:border-[#12372A] hover:bg-emerald-50"
                >
                  <span className="flex items-center gap-3 text-sm font-extrabold text-[#12372A]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-[#12372A]">
                      <BookOpen size={18} />
                    </div>
                    Explore Courses
                  </span>
                  <ArrowRight size={18} className="text-[#2E7D32] transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/mock-test"
                  className="group flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 transition-all hover:border-[#12372A] hover:bg-emerald-50"
                >
                  <span className="flex items-center gap-3 text-sm font-extrabold text-[#12372A]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-[#12372A]">
                      <ClipboardCheck size={18} />
                    </div>
                    IELTS Mock Test
                  </span>
                  <ArrowRight size={18} className="text-[#2E7D32] transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-[#12372A] p-4 text-white">
              <p className="text-xs font-bold text-emerald-300">Daily Study Target</p>
              <p className="mt-1 text-xs text-emerald-100/80 leading-relaxed">
                Complete at least one practice module today to maintain your learning streak.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}