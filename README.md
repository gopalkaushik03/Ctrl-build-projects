# 🚀 DevMatch AI – Frontend

> A modern AI-powered developer matching platform with a scalable, production-ready frontend architecture.

---

## 🧠 Overview

DevMatch AI helps developers find compatible collaborators using intelligent matching.
This frontend is built with a **feature-based architecture**, ensuring scalability, maintainability, and a premium user experience.

---

## ✨ Key Features

* 🔍 AI-based developer matching
* 🧑‍💻 Profile creation & onboarding
* 📊 Interactive dashboard
* ⚡ Smooth animations & transitions
* 🎨 Modern SaaS UI (glassmorphism + dark theme)
* 📱 Fully responsive design

---

## 🏗️ Architecture

The project follows a **feature-sliced + modular architecture**:

```
src/
 ├── app/                  # Next.js routing (App Router)
 ├── components/
 │    ├── ui/              # Reusable UI components
 │    ├── layout/          # Navbar, layout wrappers
 │    ├── animations/      # Framer Motion wrappers
 ├── features/             # Domain-based modules
 │    ├── auth/
 │    ├── dashboard/
 │    ├── matching/
 ├── hooks/                # Custom reusable hooks
 ├── services/             # API layer
 ├── lib/                  # Utilities
 ├── types/                # TypeScript types
 ├── styles/               # Global styles
```

---

## 🧩 Tech Stack

* ⚛️ Next.js (App Router)
* 🎨 Tailwind CSS
* 🎞️ Framer Motion
* 🟦 TypeScript
* 🔗 REST APIs

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd devmatch/client
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

### 4. Run Development Server

```bash
npm run dev
```

---

### 5. Open in Browser

```
http://localhost:3000
```

---

## 🧪 Build & Production

```bash
npm run build
npm start
```

---

## 🎨 UI System

* Reusable components (`Button`, `Card`, `Input`)
* Variant-based styling
* Glassmorphism design
* Consistent spacing & typography

---

## ✨ Animation System

* Built using Framer Motion
* Includes:

  * Fade-in effects
  * Stagger animations
  * Page transitions

---

## 🔌 API Integration

* Centralized API layer (`services/`)
* Feature-specific hooks manage state:

  * loading
  * error
  * success

---

## 📊 Project Highlights

* ✅ Clean, scalable architecture
* ✅ Separation of concerns (UI / logic / API)
* ✅ Production-ready structure
* ✅ Optimized for hackathon evaluation

---

## 🛠️ Future Improvements

* 🔐 Authentication (JWT / OAuth)
* 🌐 Deployment (Vercel + Render)
* 📈 Analytics dashboard
* 🤖 Advanced AI matching logic

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a PR.

---

## 📄 License

This project is for educational and hackathon purposes.

---

## 💡 Final Note

> This project focuses not just on functionality, but on **clean architecture, scalability, and user experience** — making it closer to a real-world production system.

---
