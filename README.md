# FindIT

FindIT is a cross-platform mobile application designed to improve how lost and found items are managed on campus.
It provides a centralised digital platform where users can report lost or found items, browse listings, and increase the chances of recovering belongings.

---

## 📱 Features

### 🔐 Authentication
- Register using SETU email address
- Login with secure authentication
- Logout functionality with session handling
- Root navigation redirects consistently to login

### 📦 Item Reporting
- Report lost and found items with image upload (via Cloudinary)
- Image previews in report forms
- Category selection buttons for consistent item reporting
- Form validation for required fields
- KeyboardAvoidingView to prevent keyboard overlap
- Data stored in MongoDB

### 📋 Item Listings
- View all lost and found items with uploaded images displayed
- Search and category filters on lost and found screens
- Automatic list refresh when returning to screens
- Items displayed in clean card layout
- Empty state handling for no results

### 🎨 UI & UX
- Tab-based navigation using Expo Router
- Updated tab bar icons for better cross-platform support
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
- Cloudinary (image upload & storage)
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
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
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

## 🚀 Current Version — v0.3.0

- ✅ Authentication system complete
- ✅ Lost & found item reporting connected to backend
- ✅ MongoDB integration working
- ✅ Cloudinary image upload integrated
- ✅ Image previews in forms and listings
- ✅ Category selection for item reporting
- ✅ Search and category filters on listing screens
- ✅ UI styled with custom theme

### Changelog

#### v0.3.0
- Added Cloudinary image upload for lost and found reports
- Added image previews in report forms and listings
- Added category selection buttons for item reporting
- Added search and category filters on listing screens
- Added automatic list refresh on screen focus
- Improved keyboard handling in report forms (KeyboardAvoidingView)
- Updated tab bar icons for better cross-platform support
- Fixed root navigation to redirect consistently to login

#### v0.2.0
- Authentication system complete
- Lost & found item reporting connected to backend
- MongoDB integration working
- Items displayed in app
- UI styled with custom theme

---

## 🔮 Future Improvements

- 📄 Item detail screen
- 💬 User contact / messaging system
- 🔔 Notifications

---

## 👨‍💻 Author

**Jack Kiely** — SETU Creative Computing Final Year Project

---

## 📄 License

This project is for educational purposes only.
