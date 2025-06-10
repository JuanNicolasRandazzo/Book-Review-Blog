# Ascending Library 📖

## ✨ Features

- **Full User Authentication:** Secure user registration and login system using **JWT** and **bcrypt** for password hashing.
- **Email Verification:** Integrated with **Amazon SES** and **Nodemailer** to send account confirmation emails.
- **Rich Text Reviews (CRUD):** Users can **C**reate, **R**ead, **U**pdate, and **D**elete their own book reviews using a **Quill** rich text editor.
- **File Uploads:** Supports file uploads (e.g., for user avatars or book covers) using **Multer**.
- **Book Exploration:** A clean interface to browse and search the book catalog.
- **RESTful API:** A robust and well-structured backend API built with Node.js and Express.
- **Single-Page Application (SPA):** A reactive and dynamic frontend built with **React** and **React Router**.

---

## 🛠️ Tech Stack & Key Libraries

### Backend
- **Framework:** Express.js
- **Database:** MongoDB with **Mongoose** for data modeling.
- **Authentication:** `jsonwebtoken` for JWTs and `bcrypt` for password hashing.
- **Cloud Services:** `aws-sdk/client-ses` for connecting to Amazon SES.
- **Email:** `nodemailer` for composing and sending emails.
- **File Handling:** `multer` for managing multipart/form-data (file uploads).
- **Environment:** `dotenv` for managing environment variables.

### Frontend
- **Framework:** React
- **HTTP Client:** `axios` for making requests to the backend API.
- **Routing:** `react-router-dom` for client-side navigation.
- **Rich Text Editor:** `react-quill` for a modern review editor.
- **Testing:** `React Testing Library` for component testing.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### 1. Prerequisites

- Node.js (v16+)
- npm / yarn
- Git
- A MongoDB Atlas account (or a local instance)
- AWS credentials configured for SES

### 2. Installation and Configuration

**Step 1: Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create the .env file
touch .env

# Content for server/.env
MONGO_URI="your_mongodb_connection_string"
JWT_SECRET="your_super_secret_jwt_key"
AWS_ACCESS_KEY_ID="your_aws_access_key"
AWS_SECRET_ACCESS_KEY="your_aws_secret_key"
AWS_REGION="your_aws_region"
SES_SENDER_EMAIL="your_verified_ses_email"

#To start runing the backend go to the api directory
cd ../api

# Install dependencies
npm install

# From the /server directory
node --watch index.js

# Navigate to the client directory from the root
cd ../client

# Install dependencies
npm install

# From the /server directory
npm start


---
```

### ✍️ Author

**Juan Nicolas Randazzo**

- **GitHub:** (https://github.com/JuanNicolasRandazzo)
- **LinkedIn:** (https://www.linkedin.com/in/tu_perfil_linkedin)]
- **Email:** nicolas_randazzo_castaneda@outlook.com

