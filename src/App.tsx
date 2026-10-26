import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./layouts/RootLayouts";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import MockTestPage from "./pages/MockTestPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CourseLearnPage from "./pages/CourseLearnPage";
import AdminPage from "./pages/AdminPage";
import WhatsAppButton from "./components/WhatsAppButton";
import PrivacyPage from "./components/PrivacyPage";
import TermsPage from "./components/TermsPage";
import FreeCoursesPage from "./components/FreeCoursesPage";
import FreeCourseLearnPage from "./components/FreeCourseLearnPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🟢 RootLayout এর ভেতরে সব পেজ রাখার ফলে নেভবার ও ফুটার সব পেজেই অটোমেটিক শো করবে */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/free-courses" element={<FreeCoursesPage />} />
          <Route path="/free-courses/:courseId/learn" element={<FreeCourseLearnPage />} />
          <Route path="/mock-test" element={<MockTestPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/courses/:courseId/learn" element={<CourseLearnPage />} />
        </Route>

        {/* যদি Admin পেজে নেভবার বা লেআউট না রাখতে চান, তবে এটি বাইরে রাখতে পারেন */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>

      {/* 🟢 গ্লোবাল ফ্লোটিং হোয়াটসঅ্যাপ বাটন (সব পেজে শো করবে) */}
      <WhatsAppButton phoneNumber="8801700000000" message="Hi, I want to know more about Verbal Victory courses." />
    </BrowserRouter>
  );
}