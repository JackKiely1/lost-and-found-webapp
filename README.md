# FindIT – Lost & Found Mobile Application
 
FindIT is a mobile application designed for SETU students to report, browse, and recover lost and found items on campus.
 
---
 
## 🚀 Features
 
### 🔐 Authentication
- User registration and login
- JWT-based authentication
- SETU email validation
### 📦 Item Reporting
- Report lost or found items
- Upload images (Cloudinary integration)
- Items linked to the reporting user
### 🔍 Browsing & Search
- View lost and found items
- Filter by category
- Search functionality
### 📄 Item Details
- View full item information
- Contact reporter via email
### 🛠 Admin Moderation
- Admin-only approval system
- Approve or reject item submissions
- Pending items hidden from public view
### 🔄 Item Lifecycle
 
Items move through the following states:
 
```
pending → approved → claimed
```
 
- `pending`: awaiting admin approval
- `approved`: visible to users
- `claimed`: item resolved and removed from listings
Users can mark their own items as **claimed**, completing the lifecycle.
 
---
 
## 🌐 Deployment
 
### Backend (Render)
- Hosted on Render
- URL:
```
https://findit-backend-vjjj.onrender.com/api
```
 
### Mobile App
- Built with Expo (React Native)
- Tested using:
  - Expo Go (Tunnel mode)
  - Android APK (EAS Build)
---
 
## 📱 Running the App
 
### Local Development
 
```bash
cd frontend/findit-frontend
npx expo start
```
 
Use:
- Expo Go (QR code)
- Emulator
- Tunnel Mode (for external devices)
```bash
npx expo start --tunnel
```
 
### 📦 APK Build (EAS)
 
```bash
eas build -p android --profile preview
```
 
---
 
## ⚙️ Tech Stack
 
| Layer | Technology |
|---|---|
| Frontend | React Native (Expo Router) |
| Backend | Node.js, Express.js |
| Database | MongoDB (Atlas) |
| Image Storage | Cloudinary |
| Auth | JWT |
 
---
 
## 📌 Notes
 
- Backend may take a few seconds to wake up on first request (Render free tier)
- Only approved items are visible to users
- Claimed items are hidden but retained in the database
---
 
## 📈 Future Improvements
 
- User profile management
- Push notifications
- Real-time messaging
- Admin dashboard enhancements
---
 
## 👨‍💻 Author
 
**Jack Kiely** – Creative Computing Student (SETU)

## 📄 License

This project is for educational purposes only.
