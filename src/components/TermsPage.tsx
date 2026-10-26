import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";

export default function TermsPage() {
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
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#12372A] text-white">
              <FileText size={24} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#2E7D32]">Legal Agreement</span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#12372A]">Terms & Conditions</h1>
              <p className="text-xs text-slate-500 font-medium">Last updated: October 2026</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            <p>
              Welcome to Verbal Victory. By accessing our platform, enrolling in our IELTS and Spoken English courses, or using our digital services, you agree to comply with and be bound by the following terms and conditions.
            </p>
            
            <h3 className="text-sm font-bold text-[#12372A] pt-2">1. Course Enrollment & Payments</h3>
            <p>
              All course enrollments require manual or approved digital payment verification. Fees paid for courses, mock tests, or subscription programs are strictly non-refundable once the account has been granted full material access.
            </p>

            <h3 className="text-sm font-bold text-[#12372A] pt-2">2. User Account Security</h3>
            <p>
              Users are responsible for maintaining the confidentiality of their account credentials managed via Firebase Authentication. Sharing account access with third parties may result in immediate suspension without prior notice.
            </p>

            <h3 className="text-sm font-bold text-[#12372A] pt-2">3. Intellectual Property</h3>
            <p>
              All curriculum designs, video materials, recorded lectures, and assignment modules provided on Verbal Victory are protected under intellectual property rights and cannot be redistributed or commercialized.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}