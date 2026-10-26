import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F7F2] py-12 px-6 font-sans text-[#12372A]">
      <div className="mx-auto max-w-3xl space-y-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-emerald-950/10 text-xs font-black text-[#12372A] hover:bg-emerald-50 transition shadow-sm cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Header */}
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-md border border-emerald-950/10 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2E7D32] text-white">
              <Lock size={24} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#2E7D32]">Data Security</span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#12372A]">Privacy Policy</h1>
              <p className="text-xs text-slate-500 font-medium">How we protect your personal information</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            <p>
              At Verbal Victory, engineered by Sheikh Sadi, we value your privacy. This policy outlines how we collect, use, and secure your data when you interact with our LMS platform.
            </p>

            <h3 className="text-sm font-bold text-[#12372A] pt-2">1. Information We Collect</h3>
            <p>
              We collect essential information during registration and payment processing, including your full name, email address, and 11-digit mobile numbers for transaction verification.
            </p>

            <h3 className="text-sm font-bold text-[#12372A] pt-2">2. Data Protection & Firebase</h3>
            <p>
              All authentication data and student records are securely handled using industry-standard Firebase security protocols and encrypted databases to prevent unauthorized access.
            </p>

            <h3 className="text-sm font-bold text-[#12372A] pt-2">3. Third-Party Services</h3>
            <p>
              We do not sell, trade, or transfer your personally identifiable information to outside parties, except for trusted administrative verifications required for course enrolment.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}