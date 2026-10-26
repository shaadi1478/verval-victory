# 🎓 Verbal Victory — High-End LMS for IELTS & Spoken English

> **"Speak English, See the World."**  
> Verbal Victory is a modern, feature-rich Learning Management System (LMS) tailored for IELTS and Spoken English aspirants, engineered with a stunning **Green Forest (`#12372A`)** and **Off-White (`#F4F7F2`)** theme.

---

## 🌟 Key Features

* **🎨 Professional Design & Branding**: Immersive glass-morphism aesthetics, responsive pill-based navigation, and a custom developer showcase section (`Sheikh Sadi`).
* **🔐 Authentication & Security**: Fully integrated with **Firebase Authentication** for secure student sign-up, login, and protected route management.
* **🎥 Dual Video Learning Engine**: 
  * Seamless support for **Vimeo iframe** playback (with autoplay and responsive ratio).
  * Standard **MP4 video** playback with custom controls and completion tracking.
* **📚 Free Learning Hub (10MS Style)**: Dedicated free resource library categorized by *Spoken English, IELTS Preparation, Vocabulary, and Grammar* with individual module-wise video lesson flows.
* **💳 Course Enrollment & Admin Approval**: Manual bKash/Nagad TrxID submission workflow with real-time Firebase Firestore status checking (`approved`, `pending`, `none`).
* **📝 Legal & Compliance**: Dedicated Terms & Conditions and Privacy Policy pages with smooth back-navigation.
* **💬 Global Support**: Integrated floating WhatsApp quick-chat widget for instant student communication.

---

## 🛠️ Tech Stack

* **Frontend**: React.js, Vite, TypeScript / JavaScript
* **Styling**: Tailwind CSS, Lucide React Icons
* **Routing**: React Router DOM (v6)
* **Backend & Database**: Firebase Auth & Firestore
* **Deployment Ready**: Configured for Vercel & Netlify (SPA routing support)

---

## 📁 Project Structure

```text
verbal-victory/
├── public/
│   ├── _redirects            # Netlify SPA routing fallback
│   └── vercel.json           # Vercel SPA routing fallback
├── src/
│   ├── components/           # Navbar, Footer, WhatsAppButton, DeveloperSection
│   ├── layouts/              # RootLayouts.tsx
│   ├── pages/                # HomePage, CoursesPage, CourseLearnPage, 
│   │                         # FreeCoursesPage, FreeCourseLearnPage,
│   │                         # AdminPage, AccountPage, TermsPage, PrivacyPage
│   ├── lib/                  # Firebase configuration (firebase.ts)
│   ├── App.tsx               # Main Router Configuration
│   └── main.tsx              # React Entry Point
├── package.json
└── README.md
🚀 Getting Started Locally
To run this project on your local machine, follow these steps:

1. Clone the Repository
Bash
git clone [https://github.com/your-username/verbal-victory.git](https://github.com/your-username/verbal-victory.git)
cd verbal-victory
2. Install Dependencies
Bash
npm install
3. Configure Environment Variables
Create a .env file in the root directory and add your Firebase credentials:

কোড স্নিপেট
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
4. Run Development Server
Bash
npm run dev
🚢 Deployment Guide (Vercel / Netlify)
To prevent 404 Not Found errors on page refresh when hosting single-page applications (SPA), ensure the following configurations are present:

For Netlify: Ensure public/_redirects contains:

Plaintext
/*    /index.html   200
For Vercel: Ensure vercel.json contains:

JSON
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
Firebase Settings: Go to your Firebase Console -> Authentication -> Settings -> Authorized domains and add your live Vercel/Netlify deployment domain.

👨‍💻 Lead Architect & Developer
Created & Engineered by: Sheikh Sadi

Role: Lead Software Engineer & Digital Designer

Contact: sheikhsadi.dev@gmail.com

📄 License
This project is proprietary and built for Verbal Victory. All curriculum designs, video materials, and code architectures are protected under intellectual property rights.
