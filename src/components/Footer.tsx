import { Link } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  MapPin,
} from "lucide-react";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white font-sans border-t border-slate-800/80">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 items-start">
          
          {/* Brand & Socials (Span 4) */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-500 text-slate-950 shadow-lg">
                <GraduationCap size={27} />
              </div>

              <div>
                <span className="block text-lg font-extrabold tracking-tight">
                  VERBAL <span className="text-lime-400">VICTORY</span>
                </span>
                <span className="text-[10px] tracking-wider text-slate-400">
                  SPEAK ENGLISH, SEE THE WORLD
                </span>
              </div>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
              Improve your spoken English, prepare for IELTS, and build the confidence to communicate with the world.
            </p>

            <div className="mt-5 flex gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="rounded-lg border border-slate-800 p-2.5 text-slate-300 transition hover:border-lime-400 hover:text-lime-400"
              >
                <span className="text-lg font-bold">f</span>
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-lg border border-slate-800 p-2.5 text-slate-300 transition hover:border-lime-400 hover:text-lime-400"
              >
                <span className="text-sm font-bold">IG</span>
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="rounded-lg border border-slate-800 p-2.5 text-slate-300 transition hover:border-lime-400 hover:text-lime-400"
              >
                <span className="text-sm font-bold">YT</span>
              </a>
            </div>
          </div>

          {/* Quick Links (Span 2) */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-lime-400">Quick Links</h3>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li><Link className="transition hover:text-lime-400" to="/">Home</Link></li>
              <li><Link className="transition hover:text-lime-400" to="/courses">All Courses</Link></li>
              <li><Link className="transition hover:text-lime-400" to="/mock-test">IELTS Mock Test</Link></li>
              <li><Link className="transition hover:text-lime-400" to="/account">My Account</Link></li>
            </ul>
          </div>

          {/* Our Learning (Span 2) */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-lime-400">Our Learning</h3>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li><Link className="transition hover:text-lime-400" to="/courses">Spoken English</Link></li>
              <li><Link className="transition hover:text-lime-400" to="/courses">IELTS Preparation</Link></li>
              <li><Link className="transition hover:text-lime-400" to="/register">Join Platform</Link></li>
              <li><Link className="transition hover:text-lime-400" to="/login">Student Login</Link></li>
            </ul>
          </div>

          {/* Google Map Integration & Contact (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-lime-400">
              Our Location & Contact
            </h3>

            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Mail size={16} className="shrink-0 text-lime-400" />
              <a href="mailto:hello@verbalvictory.com" className="hover:text-lime-400 transition">
                hello@verbalvictory.com
              </a>
            </div>

            {/* Interactive Map Embed */}
            <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-900">
              <iframe
                title="Verbal Victory Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.847321151774!2d90.39121847629575!3d23.751244489370857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bd55555555%3A0x5555555555555555!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full opacity-80 hover:opacity-100 transition-opacity filter invert-[90%] hue-rotate-180"
              ></iframe>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <MapPin size={15} className="shrink-0 text-lime-400" />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} VERBAL VICTORY. All rights reserved.</p>

          <div className="flex flex-wrap gap-5">
            <Link to="/privacy" className="transition hover:text-lime-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition hover:text-lime-400">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}