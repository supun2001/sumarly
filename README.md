# AI Audio/Video Converter (MERN Stack)

🎵🎥 **Full-Stack AI-Powered Audio & Video Conversion Platform**  
A modern web application built with the **MERN stack** (MongoDB, Express, React, Node.js) that allows users to convert audio and video files using AI-based processing.

---

## 🚀 Project Overview

This project enables users to:

- Convert audio and video files between different formats.
- Enhance audio/video using AI (noise reduction, upscaling, or speech-to-text).
- Process files quickly via a modern web interface.
- Track conversion history with MongoDB backend.

The platform is **full-stack**, providing a seamless experience from file upload to processed download.

---

## 🧩 Tech Stack

### Frontend
- **React.js** – Interactive UI and file handling
- **Material-UI / TailwindCSS** – Modern design components
- **Axios** – API requests to backend

### Backend
- **Node.js + Express.js** – RESTful API for file conversion
- **MongoDB** – Storage for user data and conversion history
- **Multer** – File uploads handling
- **FFmpeg / AI libraries** – Audio/video processing
- **OpenAI / Local AI models** – Optional AI enhancements (speech-to-text, upscaling)

---

## 📂 Project Structure

/
├─ /frontend # React frontend for user interaction
├─ /admin # Admin panel to monitor usage and manage conversions
├─ /backend # Node.js + Express backend
│ ├─ /models # MongoDB schemas
│ ├─ /routes # API routes for conversion and history
│ ├─ /controllers # Conversion logic and API controllers
│ ├─ /middlewares # Authentication, error handling
│ ├─ /uploads # Temporary file storage
│ └─ /config # DB and server configuration
└─ README.md # Project overview

## ⚡ Features

- **Audio Conversion:** MP3, WAV, FLAC, AAC, etc.
- **Video Conversion:** MP4, MKV, AVI, MOV, etc.
- **AI Enhancements:**  
  - Noise reduction for audio  
  - Upscale video resolution  
  - Speech-to-text transcription
- **User-Friendly UI:** Drag-and-drop uploads, progress bars, and download links.
- **Conversion History:** Tracks all processed files for the user.

---
