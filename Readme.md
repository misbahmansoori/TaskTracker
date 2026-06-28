# 📝 Task Tracker – MERN Stack Application

A full-stack Task Tracker web application built using the MERN stack (MongoDB, Express, React, Node.js).  
It helps users manage daily tasks with a clean UI and full CRUD functionality.

---

## 🚀 Live Links

Frontend: https://task-tracker-sigma-lake.vercel.app/ 
Backend API: https://your-backend-link.onrender.com  

---

## ✨ Features

- ➕ Create new tasks  
- 📋 View all tasks  
- ✏️ Update existing tasks  
- ❌ Delete tasks with confirmation modal  
- 🔍 Search tasks by title  
- 🔄 Filter tasks by status (Pending / In Progress / Completed)  
- ↕️ Sort tasks (Latest / Oldest)  
- 📊 Dashboard statistics (Total / Pending / In Progress / Completed)  
- 🌙 Dark mode support  
- 📱 Fully responsive design  
- 🔔 Toast notifications  
- ⚡ Real-time UI updates without page reload  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Tailwind CSS  
- Axios  
- React Hook Form  
- React Icons  
- React Toastify  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- CORS  
- dotenv  

---

## 📂 Project Structure
TaskTracker/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.jsx



---

## ⚙️ Installation & Setup

### 1. Clone Repository

git clone https://github.com/yourusername/task-tracker.git


### 2. Backend Setup 
cd backend
npm install
npm start

create a .env file 

PORT=5000
MONGO_URI=your_mongodb_connection_string

### 3. Frontend Setup

cd frontend
npm install
npm run dev

Create a .env file : 
VITE_API_URL=http://localhost:5000/api


## 📊 What I Learned

- Full-stack MERN development
- REST API creation and integration
- MongoDB schema design
- React state management
- UI/UX design improvements
- Deployment using Render & Vercel

## 👨‍💻 Author
Built as a full-stack MERN project for learning and portfolio purposes.

## ⭐ Note

This project demonstrates real-world CRUD operations, API integration, and modern responsive UI development.