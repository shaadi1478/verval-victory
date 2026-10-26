import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { CheckCircle2, Copy, Send, X, Smartphone, Mail, User } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  coursePrice: string;
  courseId: string;
}

// 🟢 ইমেল ভ্যালিডেশন ফাংশন (Format Check + Common Domain Typo Check)
const isValidEmail = (email: string): boolean => {
  const cleanEmail = email.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(cleanEmail)) return false;

  const invalidDomains = [
    "gmail.co", 
    "gamil.com", 
    "gmal.com", 
    "yahoo.co", 
    "yaho.com", 
    "hotmail.co"
  ];
  const domain = cleanEmail.split("@")[1]?.toLowerCase();
  return !invalidDomains.includes(domain);
};

// 🟢 ১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর ভ্যালিডেশন ফাংশন (013-019)
const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^01[3-9]\d{8}$/;
  return phoneRegex.test(phone.trim());
};

export default function PaymentInstructionModal({
  isOpen,
  onClose,
  courseTitle,
  coursePrice,
  courseId,
}: PaymentModalProps) {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  
  const [senderNumber, setSenderNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [trxId, setTrxId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bKash");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // আপনার অফিশিয়াল বিকাশ/নগদ নম্বর
  const adminBkashNumber = "01700000000"; 

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(adminBkashNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setStudentEmail(val);

    if (val.length > 0 && !isValidEmail(val)) {
      setEmailError("Enter a valid email address (check for typos like gmail.co)");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const cleanVal = val.replace(/\D/g, "").slice(0, 11);
    setSenderNumber(cleanVal);

    if (cleanVal.length > 0 && !isValidPhone(cleanVal)) {
      setPhoneError("Enter a valid 11-digit mobile number (e.g., 017XXXXXXXX)");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🟢 সাবমিটের আগে ইমেল ও ফোন ভ্যালিডেশন চেক
    if (!studentEmail || !isValidEmail(studentEmail)) {
      setEmailError("Please enter a valid email address!");
      return;
    }

    if (!senderNumber || !isValidPhone(senderNumber)) {
      setPhoneError("Please enter a valid 11-digit mobile number!");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "enrollments"), {
        studentName,
        studentEmail: studentEmail.trim(),
        senderNumber: senderNumber.trim(),
        trxId: trxId.trim(),
        paymentMethod,
        courseId,
        courseTitle,
        amount: coursePrice,
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      setLoading(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting payment details:", error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-sans text-[#12372A]">
      <div className="relative w-full max-w-lg rounded-[2.5rem] bg-white p-6 sm:p-8 shadow-2xl border border-emerald-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 transition cursor-pointer"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <>
            <div className="mb-6 text-center">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-[#2E7D32] text-[10px] font-extrabold uppercase tracking-wider rounded-full mb-2">
                Manual Enrollment Step
              </span>
              <h2 className="text-2xl font-black">{courseTitle}</h2>
              <p className="text-xs text-slate-500 mt-1">Course Fee: <span className="font-extrabold text-[#2E7D32]">{coursePrice}</span></p>
            </div>

            <div className="mb-6 rounded-2xl bg-[#F4F7F2] p-4 border border-emerald-200">
              <h4 className="text-xs font-black uppercase text-[#12372A] mb-2 flex items-center gap-1.5">
                <Smartphone size={16} className="text-[#2E7D32]" /> How to Pay (Send Money / Cash Out):
              </h4>
              <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1 font-medium">
                <li>Go to your Mobile Banking App (bKash/Nagad/Rocket).</li>
                <li>Send <strong className="text-[#12372A]">{coursePrice}</strong> to the official number below:</li>
              </ol>

              <div className="mt-3 flex items-center justify-between rounded-xl bg-white p-3 border border-emerald-200 shadow-sm">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">bKash / Nagad Personal Number</p>
                  <p className="text-sm font-black text-[#12372A]">{adminBkashNumber}</p>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-[#2E7D32] hover:bg-emerald-100 transition cursor-pointer"
                >
                  <Copy size={14} /> {copied ? "Copied!" : "Copy Number"}
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">Your Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Hasan"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full rounded-xl border border-emerald-200 py-2.5 pl-9 pr-3 text-xs font-bold text-[#12372A] focus:border-[#12372A] focus:outline-none"
                  />
                  <User size={15} className="absolute left-3 top-3 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">Your Email (Credentials will be sent here)</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="student@gmail.com"
                    value={studentEmail}
                    onChange={handleEmailChange}
                    className={`w-full rounded-xl border py-2.5 pl-9 pr-3 text-xs font-bold text-[#12372A] focus:outline-none ${
                      emailError ? "border-red-500 bg-red-50" : "border-emerald-200 focus:border-[#12372A]"
                    }`}
                  />
                  <Mail size={15} className="absolute left-3 top-3 text-slate-400" />
                </div>
                {emailError && <p className="mt-1 text-[10px] font-bold text-red-500">{emailError}</p>}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full rounded-xl border border-emerald-200 py-2.5 px-3 text-xs font-bold text-[#12372A] focus:border-[#12372A] focus:outline-none"
                  >
                    <option value="bKash">bKash</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Rocket">Rocket</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">Sender Mobile Number</label>
                  <input
                    type="text"
                    required
                    placeholder="017XXXXXXXX"
                    value={senderNumber}
                    onChange={handlePhoneChange}
                    className={`w-full rounded-xl border py-2.5 px-3 text-xs font-bold text-[#12372A] focus:outline-none ${
                      phoneError ? "border-red-500 bg-red-50" : "border-emerald-200 focus:border-[#12372A]"
                    }`}
                  />
                  {phoneError && <p className="mt-1 text-[10px] font-bold text-red-500">{phoneError}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">Transaction ID (TrxID)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BKX8923JK1"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className="w-full rounded-xl border border-emerald-200 py-2.5 px-3 text-xs font-bold text-[#12372A] focus:border-[#12372A] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !!emailError || !!phoneError}
                className="mt-2 flex items-center justify-center gap-2 w-full rounded-2xl bg-[#12372A] py-3.5 text-xs font-black text-white hover:bg-[#2E7D32] shadow-md transition cursor-pointer disabled:opacity-50"
              >
                <Send size={16} /> {loading ? "Submitting..." : "Submit Payment Details"}
              </button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-[#2E7D32] mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-black">Information Received!</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              Thank you! Your payment verification is pending. Our admin team will verify your transaction and send your <strong>Login Credentials</strong> to <strong>{studentEmail}</strong> shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-2xl bg-[#12372A] px-6 py-3 text-xs font-bold text-white hover:bg-[#2E7D32] transition cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}