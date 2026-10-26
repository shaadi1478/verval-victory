import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { LogIn, LoaderCircle, ShieldAlert, KeyRound, Mail } from "lucide-react";

const ADMIN_EMAIL = "shaadirs010@gmail.com";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      // ১. ফায়ারবেস অথেনটিকেশনে সাইন ইন করা
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      // ২. যদি সে অ্যাডমিন হয়, সরাসরি অ্যাডমিন প্যানেলে পাঠানো
      if (user.email === ADMIN_EMAIL) {
        navigate("/admin");
        return;
      }

      // ৩. সাধারণ ইউজারের জন্য Firestore-এ 'approved' পেমেন্ট বা এনরোলমেন্ট ডাটা চেক করা
      const q = query(
        collection(db, "enrollments"),
        where("userId", "==", user.uid),
        where("status", "==", "approved")
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // যদি ডাটাবেসে অ্যাডমিন এপ্রুভাল না থাকে, তবে সেশন সাইন-আউট করে এক্সেস ব্লক করা
        await auth.signOut();
        setErrorMsg("Your account is not approved by the admin yet. Please wait for payment approval or contact support.");
        setLoading(false);
        return;
      }

      // ৪. এপ্রুভড ইউজার হলে কোর্স পেজে নিয়ে যাওয়া
      navigate("/courses");
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        setErrorMsg("Invalid email or password. Please check your credentials.");
      } else {
        setErrorMsg("Failed to login. Please try again or contact support.");
      }
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 bg-[#F4F7F2] font-sans text-[#12372A]">
      <div className="max-w-md w-full rounded-[2.5rem] border border-emerald-200 bg-white p-8 shadow-xl">
        <div className="text-center mb-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-[#2E7D32] mb-3">
            <LogIn size={26} />
          </div>
          <h2 className="text-2xl font-black">Student & Admin Portal</h2>
          <p className="text-xs text-slate-500 mt-1">Sign in with your approved credentials</p>
        </div>

        {errorMsg && (
          <div className="mb-5 flex items-start gap-2.5 rounded-2xl bg-red-50 p-4 text-xs font-bold text-red-600 border border-red-200 shadow-sm">
            <ShieldAlert size={18} className="shrink-0 text-red-500 mt-0.5" />
            <p className="leading-relaxed">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="student@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-emerald-200 bg-white py-3 pl-10 pr-4 text-xs font-bold text-[#12372A] placeholder-slate-400 focus:border-[#12372A] focus:outline-none shadow-sm"
              />
              <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-emerald-200 bg-white py-3 pl-10 pr-4 text-xs font-bold text-[#12372A] placeholder-slate-400 focus:border-[#12372A] focus:outline-none shadow-sm"
              />
              <KeyRound size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[#12372A] py-3.5 text-xs font-black text-white hover:bg-[#2E7D32] shadow-md transition cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <LoaderCircle size={18} className="animate-spin" />
                <span>Verifying Approval...</span>
              </>
            ) : (
              "Login to Portal"
            )}
          </button>
        </form>

        <div className="mt-6 text-center border-t border-slate-100 pt-4">
          <p className="text-[11px] text-slate-500 font-medium">
            Don't have an approved account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="font-extrabold text-[#2E7D32] hover:underline cursor-pointer"
            >
              Check Status
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}