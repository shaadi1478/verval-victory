import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  BookOpen,
  LogOut,
  LoaderCircle,
  Sparkles,
  ShieldCheck,
  Edit3,
  Check,
  PlayCircle,
  Camera,
} from "lucide-react";
import { auth, db } from "../lib/firebase";

const courseMasterData: Record<string, { title: string; category: string; image: string; duration: string; lessons: string }> = {
  "english-speaking-mastery": {
    title: "English Speaking Mastery",
    category: "SPOKEN ENGLISH",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop",
    duration: "12 Weeks",
    lessons: "48 Lessons",
  },
  "ielts-complete-prep": {
    title: "IELTS Complete Preparation",
    category: "IELTS PREPARATION",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop",
    duration: "10 Weeks",
    lessons: "40 Lessons",
  },
  "ielts-speaking-booster": {
    title: "IELTS Speaking Booster",
    category: "IELTS SPEAKING",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
    duration: "4 Weeks",
    lessons: "20 Lessons",
  },
  "ielts-practice-test": {
    title: "IELTS Practice Test Program",
    category: "IELTS MOCK TEST",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
    duration: "Self-paced",
    lessons: "Practice Tests",
  },
};

export default function AccountPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [myEnrolledCourses, setMyEnrolledCourses] = useState<any[]>([]);
  const [loadingEnrollments, setLoadingEnrollments] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [displayNameInput, setDisplayNameInput] = useState("");
  const [photoUrlInput, setPhotoUrlInput] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);

      if (currentUser) {
        setDisplayNameInput(currentUser.displayName || "");
        setPhotoUrlInput(currentUser.photoURL || "");

        // 1. Instant Local Caching for Zero-Delay Loading
        const cachedData = localStorage.getItem(`user_enrolled_items_${currentUser.uid}`);
        if (cachedData) {
          setMyEnrolledCourses(JSON.parse(cachedData));
          setLoadingEnrollments(false);
        }

        // 2. Fast Async Sync with Firestore
        try {
          const q = query(collection(db, "enrollments"), where("userId", "==", currentUser.uid));
          const querySnapshot = await getDocs(q);
          const enrolledItems: any[] = [];
          
          querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            if (courseMasterData[data.courseId]) {
              enrolledItems.push({
                id: data.courseId,
                ...courseMasterData[data.courseId],
                enrolledAt: data.enrolledAt,
                gateway: data.gateway || "bKash",
              });
            }
          });

          setMyEnrolledCourses(enrolledItems);
          localStorage.setItem(`user_enrolled_items_${currentUser.uid}`, JSON.stringify(enrolledItems));
        } catch (err) {
          console.error("Error fetching student enrollments:", err);
        } finally {
          setLoadingEnrollments(false);
        }
      } else {
        navigate("/login", { replace: true });
      }
    });

    return unsubscribe;
  }, [navigate]);

  async function handleLogout() {
    setError("");
    setLoggingOut(true);
    try {
      if (user) {
        localStorage.removeItem(`user_enrolled_items_${user.uid}`);
        localStorage.removeItem(`enrollments_${user.uid}`);
      }
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch {
      setError("Unable to log out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  async function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setError("");
    setSuccessMsg("");
    setUpdating(true);

    try {
      await updateProfile(user, {
        displayName: displayNameInput,
        photoURL: photoUrlInput || null,
      });

      setUser({ ...auth.currentUser! });
      setSuccessMsg("Profile updated successfully!");
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  }

  if (checkingAuth) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center gap-3 text-[#12372A] bg-[#F4F7F2]">
        <LoaderCircle className="animate-spin text-[#2E7D32]" size={26} />
        <span className="font-bold text-sm">Verifying student account...</span>
      </div>
    );
  }

  if (!user) return null;

  const displayName = user.displayName || user.email?.split("@")[0] || "Student";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <section className="min-h-[85vh] bg-[#F4F7F2] px-6 py-12 sm:py-16 lg:px-12 font-sans text-[#12372A] relative">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-white px-4 py-1.5 text-xs font-bold tracking-wider text-[#12372A] shadow-sm">
            <Sparkles size={14} className="text-[#2E7D32]" />
            STUDENT DASHBOARD
          </div>

          <h1 className="text-3xl font-black tracking-tight text-[#12372A] sm:text-4xl">
            Welcome back, {displayName}!
          </h1>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm">
            Access your active enrolled learning modules below.
          </p>
        </div>

        {error && (
          <div role="alert" className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-6 rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-xs font-bold text-[#12372A]">
            {successMsg}
          </div>
        )}

        <div className="mb-8 overflow-hidden rounded-[2.5rem] border border-emerald-200 bg-white shadow-xl shadow-emerald-950/5">
          <div className="h-2.5 bg-gradient-to-r from-[#12372A] via-[#2E7D32] to-[#43A047]" />

          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={displayName} className="h-20 w-20 shrink-0 rounded-2xl object-cover border-2 border-emerald-300 shadow-sm" />
                ) : (
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-3xl font-black text-[#12372A] border border-emerald-200">
                    {initial}
                  </div>
                )}

                <div className="text-center sm:text-left">
                  <h2 className="text-xl font-extrabold text-[#12372A]">{displayName}</h2>
                  <p className="mt-1 break-all text-xs font-medium text-slate-500">{user.email}</p>
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-extrabold text-[#12372A]">
                    <ShieldCheck size={13} className="text-[#2E7D32]" /> Verified Student Account
                  </span>
                </div>
              </div>

              <div className="flex gap-2.5 justify-center">
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/50 px-5 py-3 text-xs font-bold text-[#12372A] hover:bg-emerald-100"
                >
                  <Edit3 size={15} /> {isEditing ? "Cancel" : "Edit Profile"}
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut size={15} /> Logout
                </button>
              </div>
            </div>

            {isEditing && (
              <form onSubmit={handleUpdateProfile} className="mt-8 border-t border-slate-100 pt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={displayNameInput}
                      onChange={(e) => setDisplayNameInput(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-[#FAFDF8] p-3 text-xs font-semibold text-[#12372A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Photo Image URL</label>
                    <div className="relative">
                      <input
                        type="url"
                        value={photoUrlInput}
                        onChange={(e) => setPhotoUrlInput(e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-[#FAFDF8] p-3 text-xs font-semibold text-[#12372A]"
                      />
                      <Camera size={16} className="absolute right-3.5 top-3.5 text-slate-400" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button type="submit" disabled={updating} className="inline-flex items-center gap-1.5 rounded-xl bg-[#12372A] px-5 py-2 text-xs font-bold text-white">
                    <Check size={14} /> {updating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="mb-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-[#12372A]">My Enrolled Courses</h3>
              <p className="text-xs text-slate-500 mt-0.5">Showing courses unlocked by your account enrollment.</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-extrabold text-[#12372A]">
              {myEnrolledCourses.length} Active Courses
            </span>
          </div>

          {loadingEnrollments ? (
            <div className="flex justify-center py-12 bg-white rounded-3xl border border-emerald-100">
              <LoaderCircle className="animate-spin text-[#2E7D32]" size={30} />
            </div>
          ) : myEnrolledCourses.length === 0 ? (
            <div className="rounded-[2.5rem] border border-emerald-200 bg-white p-10 text-center shadow-sm">
              <BookOpen size={40} className="mx-auto text-emerald-600 mb-3" />
              <h4 className="text-lg font-bold text-[#12372A]">No enrolled courses found</h4>
              <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
                You haven't enrolled in any courses yet. Visit our courses catalog to unlock learning programs.
              </p>
              <Link to="/courses" className="mt-5 inline-block rounded-2xl bg-[#12372A] px-6 py-3 text-xs font-bold text-white hover:bg-[#2E7D32]">
                Explore Available Courses
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {myEnrolledCourses.map((course) => (
                <div key={course.id} className="flex flex-col sm:flex-row overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-sm hover:shadow-md transition">
                  <img src={course.image} alt={course.title} className="sm:w-2/5 h-44 sm:h-auto object-cover" />
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <span className="text-[10px] font-bold text-[#2E7D32] uppercase">{course.category}</span>
                      <h4 className="mt-1 text-base font-black text-[#12372A]">{course.title}</h4>
                      <p className="mt-2 text-xs text-slate-500">{course.lessons} · {course.duration}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                        Paid via {course.gateway}
                      </span>
                      <Link
                        to={`/courses/${course.id}/learn`}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#12372A] px-4 py-2 text-xs font-bold text-white hover:bg-[#2E7D32]"
                      >
                        <PlayCircle size={15} /> Continue Learning
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}