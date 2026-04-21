# FindIT
 
FindIT is a cross-platform mobile application designed to improve how lost and found items are managed on campus.
It provides a centralised digital platform where users can report lost or found items, browse listings, and increase the chances of recovering belongings.
 
---
 
## 📱 Features
 
### 🔐 Authentication
- Register using SETU email address
- Login with secure authentication
- Logout functionality with session handling
### 📦 Item Reporting
- Report lost items
- Report found items
- Form validation for required fields
- Data stored in MongoDB
### 📋 Item Listings
- View all lost items
- View all found items
- Items displayed in clean card layout
- Empty state handling for no results
### 🎨 UI & UX
- Tab-based navigation using Expo Router
- Custom colour theme based on SETU branding
- Clean, simple and mobile-friendly interface
---
 
## 🛠️ Technologies Used
 
### Frontend
- React Native (Expo)
- Expo Router
- TypeScript
### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
### Other Tools
- Git & GitHub
- Postman (API testing)
---
 
## 🗂️ Project Structure
 
```bash
lost-and-found-webapp/
│
├── backend/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   └── findit-frontend/
│       ├── app/
│       ├── src/
│       └── constants/
│
└── README.md
```
 
---
 
## ⚙️ Setup Instructions
 
### 1. Clone the repository
 
```bash
git clone https://github.com/your-username/lost-and-found-webapp.git
cd lost-and-found-webapp
```
 
### 2. Backend setup
 
```bash
cd backend
npm install
npm run dev
```
 
Ensure you have a `.env` file with:
 
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```
 
### 3. Frontend setup
 
```bash
cd frontend/findit-frontend
npm install
npx expo start
```
 
### 4. Emulator / Device setup
 
If using Android Emulator:
 
```env
API_BASE_URL=http://10.0.2.2:5000/api
```
 
If using a real device:
 
```env
API_BASE_URL=http://YOUR_LOCAL_IP:5000/api
```
 
---
 
## 🔀 Branch Structure
 
| Branch | Purpose |
|--------|---------|
| `main` | Stable release version |
| `dev` | Active development branch |
| `feature/*` | Individual feature branches (now merged) |
 
---
 
## 🚀 Current Version — v0.2.0
 
- ✅ Authentication system complete
- ✅ Lost & found item reporting connected to backend
- ✅ MongoDB integration working
- ✅ Items displayed in app
- ✅ UI styled with custom theme
---
 
## 🔮 Future Improvements
 
- 📷 Image upload functionality
- 🔍 Search and filtering
- 📄 Item detail screen
- 💬 User contact / messaging system
- 🔔 Notifications
---
 
## 👨‍💻 Author
 
**Jack Kiely** — SETU Creative Computing Final Year Project
 
---
 
## 📄 License
 
This project is for educational purposes only.
 
