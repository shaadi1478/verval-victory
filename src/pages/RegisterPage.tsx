import { useNavigate } from "react-router-dom";
import { Lock, ArrowLeft, MessageCircle } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const supportWhatsapp = "8801700000000"; // আপনার আসল হোয়াটসঅ্যাপ সাপোর্ট নম্বরটি এখানে দিন
  const defaultMsg = encodeURIComponent("Hi, I want to create an account and enroll in Verbal Victory courses.");

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 bg-[#F4F7F2] font-sans text-[#12372A]">
      <div className="max-w-md w-full rounded-[2.5rem] border border-emerald-200 bg-white p-8 text-center shadow-xl">
        {/* Top Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-[#2E7D32] mb-5 shadow-inner">
          <Lock size={32} />
        </div>

        {/* Heading & Notice */}
        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase tracking-wider rounded-full mb-2">
          Private Portal
        </span>
        <h2 className="text-2xl font-black">Public Registration Closed</h2>
        
        <p className="mt-3 text-xs leading-relaxed text-slate-600">
          Direct student registration is currently restricted. Accounts are created and activated strictly by the Admin upon successful course enrollment or manual verification.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <a
            href={`https://wa.me/${supportWhatsapp}?text=${defaultMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-2xl bg-[#25D366] py-3.5 text-xs font-black text-white hover:bg-[#20ba5a] shadow-md transition cursor-pointer"
          >
            <MessageCircle size={18} /> Contact Admin on WhatsApp
          </a>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="flex items-center justify-center gap-2 w-full rounded-2xl bg-[#12372A] py-3.5 text-xs font-black text-white hover:bg-[#2E7D32] shadow-md transition cursor-pointer"
          >
            Already Approved? Go to Login
          </button>

          <button
            type="button"
            onClick={() => navigate("/courses")}
            className="flex items-center justify-center gap-1.5 w-full rounded-2xl bg-white border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer mt-2"
          >
            <ArrowLeft size={15} /> Back to Courses
          </button>
        </div>
      </div>
    </div>
  );
}