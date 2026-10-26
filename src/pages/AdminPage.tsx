import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  signOut as secondarySignOut 
} from "firebase/auth";
import { auth, db, firebaseConfig } from "../lib/firebase";
import { 
  CheckCircle2, 
  XCircle, 
  LoaderCircle, 
  ShieldCheck, 
  ArrowLeft, 
  AlertCircle, 
  Clock, 
  CheckCheck, 
  Search, 
  Users, 
  DollarSign, 
  TrendingUp,
  UserCheck,
  UserPlus,
  LogOut
} from "lucide-react";

const ADMIN_EMAIL = "shaadirs010@gmail.com";

// 🟢 ব্যাকগ্রাউন্ডে অ্যাডমিন সেশন ঠিক রেখে ইউজার ক্রিয়েট করার জন্য Secondary Firebase App
const secondaryApp = !getApps().some(app => app.name === "SecondaryAdminApp") 
  ? initializeApp(firebaseConfig, "SecondaryAdminApp") 
  : getApp("SecondaryAdminApp");

const secondaryAuth = getAuth(secondaryApp);

export default function AdminPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  // Tabs: 'pending' | 'approved' | 'students'
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "students">("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingList, setPendingList] = useState<any[]>([]);
  const [approvedList, setApprovedList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvingDocId, setApprovingDocId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return unsubscribeAuth;
  }, []);

  // রিয়েল-টাইম ফায়ারবেস লিসেনার
  useEffect(() => {
    if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) return;

    setLoading(true);
    const unsubscribeSnapshot = onSnapshot(
      collection(db, "enrollments"),
      (querySnapshot) => {
        const pending: any[] = [];
        const approved: any[] = [];

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const item = { docId: docSnap.id, ...data };

          if (data.status === "approved") {
            approved.push(item);
          } else if (data.status === "pending") {
            pending.push(item);
          }
        });

        setPendingList(pending);
        setApprovedList(approved);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching enrollments:", error);
        setLoading(false);
      }
    );

    return () => unsubscribeSnapshot();
  }, [user]);

  // 🟢 ১. এক্সিট ও লগআউট হ্যান্ডলার
  const handleExitAndLogout = async () => {
    try {
      await signOut(auth);
      navigate("/courses");
    } catch (error) {
      console.error("Error signing out:", error);
      navigate("/courses");
    }
  };

  // 🟢 ২. কাস্টম পাসওয়ার্ড সহ অ্যাকাউন্ট ক্রিয়েট, ইমেল ভেরিফিকেশন লিঙ্ক সেন্ড ও এপ্রুভ হ্যান্ডলার
  async function handleApproveAndCreateAccount(item: any) {
    const studentEmail = item.studentEmail || item.userEmail;
    if (!studentEmail) {
      alert("Error: Student Email not found in this request!");
      return;
    }

    const customPassword = window.prompt(
      `Enter a custom password for:\n${studentEmail}\n\n(Must be at least 6 characters):`,
      "12345678"
    );

    if (customPassword === null) return;

    if (customPassword.trim().length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    setApprovingDocId(item.docId);

    try {
      let createdUid = item.userId || "";

      try {
        const userCredential = await createUserWithEmailAndPassword(
          secondaryAuth, 
          studentEmail.trim(), 
          customPassword.trim()
        );
        createdUid = userCredential.user.uid;

        // ✉️ স্টুডেন্টের ইমেলে অটোমেটিক ভেরিফিকেশন লিঙ্ক পাঠানো হচ্ছে
        await sendEmailVerification(userCredential.user);

        // স্টুডেন্ট তৈরির পরপরই সেকেন্ডারি Auth সাইন-আউট
        await secondarySignOut(secondaryAuth);
      } catch (authError: any) {
        if (authError.code === "auth/email-already-in-use") {
          console.log("User already registered in Firebase Auth, proceeding to approve...");
        } else {
          throw authError;
        }
      }

      const docRef = doc(db, "enrollments", item.docId);
      await updateDoc(docRef, { 
        status: "approved",
        userId: createdUid || "approved_student"
      });

      alert(`✅ Account Approved & Verification Email Sent!\n\nEmail: ${studentEmail}\nPassword: ${customPassword.trim()}\n\nA verification email has been dispatched to the student's inbox.`);
    } catch (error: any) {
      console.error("Error creating account & approving:", error);
      alert("Failed to create account: " + error.message);
    } finally {
      setApprovingDocId(null);
    }
  }

  // 🔴 ৩. রিকোয়েস্ট রিজেক্ট/বাতিল করার হ্যান্ডলার
  async function handleReject(docId: string) {
    if (!window.confirm("Are you sure you want to REJECT or REVOKE this access?")) return;

    try {
      const docRef = doc(db, "enrollments", docId);
      await updateDoc(docRef, { status: "rejected" });
      alert("Status updated successfully.");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  }

  const totalRevenue = approvedList.reduce((sum, item) => {
    const cleanPrice = item.amount ? Number(item.amount.replace(/[^0-9]/g, "")) : 0;
    return sum + cleanPrice;
  }, 0);

  if (checkingAuth) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center gap-3 bg-[#F4F7F2] text-[#12372A]">
        <LoaderCircle className="animate-spin text-[#2E7D32]" size={30} />
        <span className="font-bold text-sm">Verifying admin permissions...</span>
      </div>
    );
  }

  if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 bg-[#F4F7F2]">
        <div className="max-w-md w-full rounded-[2.5rem] border border-red-200 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 mb-4">
            <AlertCircle size={30} />
          </div>
          <h2 className="text-xl font-black text-[#12372A]">Access Denied</h2>
          <p className="mt-2 text-xs text-slate-600">You are not authorized to view the Admin Panel.</p>
          <button
            type="button"
            onClick={() => navigate("/courses")}
            className="mt-6 w-full rounded-2xl bg-[#12372A] py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#2E7D32] cursor-pointer"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  // ডেটা ফিল্টারিং
  const rawList = activeTab === "pending" ? pendingList : activeTab === "approved" ? approvedList : [...pendingList, ...approvedList];
  const filteredList = rawList.filter((item) => {
    const queryLower = searchQuery.toLowerCase().trim();
    return (
      (item.trxId && item.trxId.toLowerCase().includes(queryLower)) ||
      (item.senderNumber && item.senderNumber.includes(queryLower)) ||
      (item.studentEmail && item.studentEmail.toLowerCase().includes(queryLower)) ||
      (item.studentName && item.studentName.toLowerCase().includes(queryLower)) ||
      (item.courseId && item.courseId.toLowerCase().includes(queryLower))
    );
  });

  return (
    <div className="min-h-screen bg-[#F4F7F2] p-6 lg:p-12 font-sans text-[#12372A]">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-[#12372A]">
              <ShieldCheck size={14} className="text-[#2E7D32]" /> Admin Control Center
            </div>
            <h1 className="text-3xl font-black">LMS Management Dashboard</h1>
          </div>

          {/* 🔴 Exit & Logout Button */}
          <button
            type="button"
            onClick={handleExitAndLogout}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-white border border-red-200 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 shadow-sm w-fit cursor-pointer transition"
          >
            <LogOut size={15} /> Exit & Logout
          </button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Revenue</p>
              <h3 className="text-2xl font-black text-[#12372A] mt-1">৳{totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-[#2E7D32]">
              <DollarSign size={24} />
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Students</p>
              <h3 className="text-2xl font-black text-[#12372A] mt-1">{approvedList.length}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-[#2E7D32]">
              <Users size={24} />
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pending Requests</p>
              <h3 className="text-2xl font-black text-amber-600 mt-1">{pendingList.length}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>

        {/* Navigation Tabs & Search */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-emerald-200 pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("pending")}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === "pending" ? "bg-[#12372A] text-white shadow-md" : "bg-white text-slate-600 border border-emerald-200 hover:bg-emerald-50"
              }`}
            >
              <Clock size={15} /> Pending ({pendingList.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("approved")}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === "approved" ? "bg-[#12372A] text-white shadow-md" : "bg-white text-slate-600 border border-emerald-200 hover:bg-emerald-50"
              }`}
            >
              <CheckCheck size={15} /> Approved ({approvedList.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("students")}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === "students" ? "bg-[#12372A] text-white shadow-md" : "bg-white text-slate-600 border border-emerald-200 hover:bg-emerald-50"
              }`}
            >
              <UserCheck size={15} /> All Directory ({pendingList.length + approvedList.length})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search Email, TrxID, Mobile..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-emerald-200 bg-white py-2.5 pl-10 pr-4 text-xs font-bold text-[#12372A] placeholder-slate-400 focus:border-[#12372A] focus:outline-none shadow-sm"
            />
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          </div>
        </div>

        {/* List View */}
        {loading ? (
          <div className="flex min-h-[30vh] items-center justify-center gap-3 bg-white rounded-[2.5rem] border border-emerald-200 shadow-sm">
            <LoaderCircle className="animate-spin text-[#2E7D32]" size={30} />
            <span className="font-bold text-xs text-slate-600">Syncing live records...</span>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="rounded-[2.5rem] border border-emerald-200 bg-white p-12 text-center shadow-sm">
            <CheckCircle2 size={40} className="mx-auto text-emerald-600 mb-3" />
            <h3 className="text-lg font-bold">No records found!</h3>
            <p className="mt-1 text-xs text-slate-500">No matching student submissions in this view.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredList.map((item) => (
              <div
                key={item.docId}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E7D32]">
                      Course: {item.courseTitle || item.courseId}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === "approved" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="mt-1 text-base font-black">
                    Name: {item.studentName || "N/A"}
                  </h4>
                  <p className="text-xs font-bold text-[#12372A] mt-0.5">
                    Email: <span className="text-emerald-700">{item.studentEmail || item.userEmail || "N/A"}</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    TrxID: <span className="font-bold text-[#12372A]">{item.trxId}</span> | Method:{" "}
                    <span className="font-bold text-[#12372A]">{item.paymentMethod || item.gateway}</span> | Sender:{" "}
                    <span className="font-bold text-[#12372A]">{item.senderNumber}</span>
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    Amount: {item.amount}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {item.status === "pending" && (
                    <>
                      <button
                        type="button"
                        disabled={approvingDocId === item.docId}
                        onClick={() => handleApproveAndCreateAccount(item)}
                        className="inline-flex items-center gap-1.5 rounded-2xl bg-[#00A859] px-4 py-2.5 text-xs font-black text-white hover:bg-[#00904d] shadow-md transition cursor-pointer disabled:opacity-50"
                      >
                        {approvingDocId === item.docId ? (
                          <>
                            <LoaderCircle size={15} className="animate-spin" /> Approving...
                          </>
                        ) : (
                          <>
                            <UserPlus size={15} /> Approve & Create
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleReject(item.docId)}
                        className="inline-flex items-center gap-1.5 rounded-2xl bg-red-50 border border-red-200 px-4 py-2.5 text-xs font-black text-red-600 hover:bg-red-100 transition cursor-pointer"
                      >
                        <XCircle size={15} /> Reject
                      </button>
                    </>
                  )}

                  {item.status === "approved" && (
                    <button
                      type="button"
                      onClick={() => handleReject(item.docId)}
                      className="inline-flex items-center gap-1.5 rounded-2xl bg-red-50 border border-red-200 px-4 py-2.5 text-xs font-black text-red-600 hover:bg-red-100 transition cursor-pointer"
                    >
                      <XCircle size={15} /> Revoke Access
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}