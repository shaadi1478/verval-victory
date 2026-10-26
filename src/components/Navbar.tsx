import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, GraduationCap, Sparkles, ShieldCheck } from "lucide-react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../lib/firebase";

// আপনার নির্দিষ্ট অ্যাডমিন ইমেইল
const ADMIN_EMAIL = "admin@verbalvictory.com";

const links = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/courses" },
  { label: "Free Course", to: "/free-courses" }, // 👈 Free Course Menu Added (CourseLearningPage link)
  { label: "IELTS Mock Test", to: "/mock-test" },
  { label: "My Account", to: "/account" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // Mobile menu খোলা অবস্থায় স্ক্রিন কন্ট্রোল বা Escape প্রেস হ্যান্ডেল করা
  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-3 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 md:text-[11px] lg:text-xs ${
      isActive
        ? "text-[#12372A] font-black after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-[#12372A] after:rounded-full"
        : "text-slate-500 hover:text-[#12372A]"
    }`;

  const isAdmin = user && user.email === ADMIN_EMAIL;

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-900/10 bg-[#F4F7F2]/90 shadow-sm backdrop-blur-xl transition-all">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        
        {/* Logo / Brand Section */}
        <Link
          to={isAdmin ? "/admin" : "/"}
          onClick={() => setMenuOpen(false)}
          className="group flex items-center gap-3 transition-transform duration-300 hover:opacity-95"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#12372A] text-white shadow-md shadow-emerald-950/20 transition-transform duration-500 group-hover:scale-105">
            <GraduationCap size={22} className="text-emerald-300" />
          </div>

          <div className="flex flex-col">
            <span className="text-base font-black tracking-wider text-[#12372A] font-serif sm:text-lg">
              VERBAL VICTORY
            </span>
            <span className="flex items-center gap-1 text-[9px] font-bold tracking-[0.2em] text-[#2E7D32]">
              <Sparkles size={10} className="shrink-0 text-amber-600" />
              {isAdmin ? "ADMIN CONTROL CENTER" : "SPEAK ENGLISH, SEE THE WORLD"}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/70 px-3 py-1.5 rounded-full border border-emerald-900/10 shadow-inner">
          {isAdmin ? (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-black tracking-wider uppercase transition-all shadow-sm ${
                  isActive
                    ? "bg-[#12372A] text-white shadow-md"
                    : "bg-amber-100 text-amber-900 hover:bg-amber-200"
                }`
              }
            >
              <ShieldCheck size={15} className="text-amber-600" />
              Admin Panel
            </NavLink>
          ) : (
            links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-900/10 bg-white text-[#12372A] shadow-sm transition hover:bg-emerald-50 md:hidden cursor-pointer"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Dropdown Menu */}
        <div
          id="main-navigation"
          className={`${
            menuOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-4 opacity-0 invisible pointer-events-none"
          } absolute left-4 right-4 top-full mt-2 flex flex-col gap-2 rounded-3xl border border-emerald-900/15 bg-white/95 p-5 shadow-2xl backdrop-blur-2xl transition-all duration-300 md:hidden`}
        >
          {isAdmin ? (
            <NavLink
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs font-black uppercase transition-all ${
                  isActive
                    ? "bg-[#12372A] text-white shadow-md"
                    : "bg-amber-100 text-amber-900"
                }`
              }
            >
              <ShieldCheck size5={16} />
              Admin Panel
            </NavLink>
          ) : (
            links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-xs font-extrabold tracking-wider uppercase transition-all ${
                    isActive
                      ? "bg-[#12372A] text-white shadow-md shadow-emerald-950/20"
                      : "text-slate-600 hover:bg-emerald-50/80 hover:text-[#12372A]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))
          )}
        </div>
      </nav>
    </header>
  );
}