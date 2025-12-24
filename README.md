# AI Resume Builder & Job Tracker

A production-ready SaaS application for building professional resumes with AI assistance and tracking job applications in a Kanban board. Built with Next.js 14, Tailwind CSS, and MongoDB.

![Project Status](https://img.shields.io/badge/status-production--ready-success)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🚀 Features

### 📄 AI Resume Builder
- **Multi-step Wizard**: Personal info, education, skills, projects, and experience.
- **Live Preview**: See your resume update in real-time as you type.
- **AI Enhancement**: Click "AI Enhance" to improve your job descriptions using mock AI (simulating professional rewrites).
- **PDF Export**: Print-friendly layout designed for ATS compatibility.

### 💼 Job Tracker Dashboard
- **Kanban Board**: Drag-and-drop interface to manage applications.
- **Status Tracking**: Applied, Interview, Offer, Rejected columns.
- **Analytics**: Quick view of your application progress.

### 🔐 Authentication & Security
- **Secure Auth**: JWT-based authentication with HTTP-only cookies.
- **Middleware Protection**: Secure routes for dashboard and user data.

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Shadcn/UI (Radix).
- **Backend**: Next.js API Routes, Node.js.
- **Database**: MongoDB (via Mongoose).
- **State Management**: React Context + Hooks.
- **DnD**: @hello-pangea/dnd for Kanban board.

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB URI (Atlas or Local)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-resume-builder.git
   cd ai-resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/resume_builder
   JWT_SECRET=your_super_secret_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the App**
   Navigate to [http://localhost:3000](http://localhost:3000).

## 📱 Screenshots

(Screenshots would go here in a real repo)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
