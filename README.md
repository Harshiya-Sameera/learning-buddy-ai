# 🧠 Learning Buddy (Virtual Buddy AI)

**Learning Buddy** is an interactive web application designed to assist users in their learning journey by offering intelligent support, personalized insights, and helpful resources. Whether you're revising, exploring new topics, or looking for guidance, your virtual buddy is here to help.

---

## 🚀 Features

- 🔐 **User Authentication** – Secure sign-up and login using Firebase.
- 📊 **Personalized Dashboard** – View stats like quizzes completed, average score, and learning streak.
- ❓ **Language-Based Quizzes** – Practice with interactive quizzes tailored to your learning focus.
- 📈 **Weekly Progress Tracker** – Visualize your learning journey over time.
- 🤖 **AI Chatbot** – Ask questions and get instant help from your AI-powered study assistant.
- 🌐 **Curated Tech Resources** – Access hand-picked resources and links relevant to your domain.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, HTML, Tailwind CSS
- **Backend**: Firebase Authentication, Firestore
- **Chatbot**: Integrated AI Assistant (ChatGPT-based)
- **Icons & UI**: Heroicons, React Icons, Shadcn UI

---

## 📁 Folder Structure

/learning-buddy-ai
├── /public
│   ├── /assets
│   └── /logos
├── /src
│   ├── /components
│   │   ├── DashboardStats.jsx
│   │   ├── Navigation.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── ...
│   ├── /contexts
│   │   └── AuthContext.jsx
│   ├── /hooks
│   ├── /pages
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   └── ...
│   ├── App.jsx
│   ├── index.js
│   └── main.jsx
├── .gitignore
├── tailwind.config.js
├── postcss.config.js
└── package.json


1. **Clone the repository**
   ```bash
   git clone https://github.com/Harshiya-Sameera/learning-buddy-ai.git
   cd learning-buddy-ai
2. **Install dependencies**
  npm install

3. **Set up Firebase**
  Create a project in Firebase.
  Enable Email/Password Authentication.
  Create a Firestore Database.
  Replace config in firebase.js with your Firebase credentials.

4. **Run the app**
  npm start

🌍 Deployment
The app can be deployed using platforms like Vercel, Netlify, or Firebase Hosting.


📅 Possible Future Enhancements
Add leaderboard for quiz rankings
Support for voice-based chatbot
Add more quiz categories and difficulty levels

