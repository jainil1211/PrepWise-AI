"# PrepWise-AI" 

> An AI-powered technical interview preparation platform that generates personalized interview questions from your resume and target job description — then evaluates your answers with actionable feedback.

🚧 **Actively in development** — building in public, one feature at a time.

---

## 💡 The Idea

Generic interview prep treats every candidate the same. PrepWise AI doesn't.

Upload your **resume** and paste a **job description**, and PrepWise AI generates a set of technical interview questions tailored specifically to your background and the role you're targeting — then evaluates your answers and gives you structured feedback to improve.

## ✨ Core Features (Planned & In Progress)

- 🔐 **Secure authentication** — JWT-based signup/login with hashed passwords
- 📄 **Resume + job description parsing** — extract meaningful context from your uploaded resume
- 🤖 **AI-generated interview questions** — tailored to your experience and the specific role
- 📝 **Text-based interview flow** — answer questions at your own pace
- 📊 **AI-evaluated feedback** — get scored, structured feedback on your responses
- 🎨 **Clean, modern UI** — built with React and Tailwind CSS

## 🛠️ Tech Stack

**Frontend:** React (Vite), Tailwind CSS, React Router, Axios
**Backend:** Node.js, Express, MongoDB, Mongoose
**Auth:** JWT, bcrypt
**AI:** LLM API integration (OpenAI / Claude) for question generation and answer evaluation

## 🏗️ Architecture
prepwise-ai/
├── client/          # React frontend
│   └── src/
│       ├── components/   # Presentational UI components
│       ├── pages/        # Page-level logic (API calls, routing)
│       ├── context/       # Global auth state
│       └── services/      # Centralized API layer
│
└── server/          # Express backend
└── src/
├── models/         # Mongoose schemas
├── controllers/    # Route logic
├── routes/          # API endpoints
├── middleware/      # Auth protection, error handling
└── config/          # Database connection

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/jainil1211/PrepWise-AI.git

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

Set up your environment variables in `server/.env`:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Run both servers:
```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

## 📌 Roadmap

- [x] Project architecture & folder structure
- [x] JWT authentication (signup/login)
- [x] Auth UI (Login/Signup pages)
- [ ] Resume + job description upload
- [ ] AI-powered question generation
- [ ] Interview answer evaluation
- [ ] Results dashboard
- [ ] Deployment

---

*Built as a hands-on learning project exploring full-stack development and AI integration.*