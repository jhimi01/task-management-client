# Task Management System

## Overview
This project is a [brief description of the project], designed using React, Redux for state management, and integrated with REST APIs for data handling. The application follows best practices for security and scalability.

## Features
- User authentication with JWT
- User register with a otp
- User login with password, email and a google recaptcha
- Logout
- Update profile included with (name, username, add bio and add image)
- Reset Password and forgot password
- Task management system(CRUD operation)
- API integration with Redux
- Secure data handling

---

## State Management
### Redux Setup
This project uses **Redux Toolkit** for efficient state management and API integration. The `redux` store handles global state, including authentication, tasks, and user profile data.

### Key Redux Features
- **Slices**: The application is divided into slices (e.g., `authSlice`, `taskSlice`).
- **Redux Thunk for async API calls**: Middleware for handling asynchronous operations like login, fetching tasks, etc.
- **Selector functions**: For accessing specific parts of the state efficiently.

---

## Setup Instructions
### Prerequisites
- Node.js (v16+)
- npm
- PostgreSQL (if running locally)


## 🚀 Installation & Guide for Frontend Setup

### 1️⃣ Clone the Repository 
```sh
git clone https://github.com/jhimi01/task-management-client.git
cd project-directory
```

### 2️⃣ Install Dependencies  
```sh
npm install
```

### Running Locally for frontend
```sh
npm run dev
```


## 🚀 Installation & Guide for Backend Setup

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/jhimi01/task-management-server.git
cd task-management-server
```

### 2️⃣ Install Dependencies  
```sh
npm install
```

### 3️⃣ Set Up Environment Variables  
- Create a `.env` file in the root directory.  
- The required environment variables will be shared separately.  
- Copy and paste the provided values into your `.env` file.  

### 4️⃣ Set Up Database  
- Ensure PostgreSQL is installed and running on your system.  
- Update the `.env` file with your local `DATABASE_URL`.  
- Run Prisma Migration
```sh
npx prisma migrate dev
```

### 5️⃣ Start the Server  
```sh
nodemon server.ts
```
Your backend should now be running locally! 🚀

---


## Api Documentation

These APIs are protected by tokens that are stored in the cookie.

### authentication endpoint

- POST /auth/register (for register account)
- POST /auth/verify-otp (for verification)
- POST /auth/login (for Login account)
- GET /auth/profile (to get a authenticated user)
- PUT /auth/profile (for update profile information)
- PUT /auth/edit-image (for update/add profile Image)
- DELETE /auth/logout (for logout)
- POST /auth/reset-password (for change password)
- POST /auth/sendemail-forgotpassword (This send an email for a reset password)
- POST /auth/forgot-password/:id/:token (reset password)

### tasks endpoint

- GET /auth/tasks (get tasks)
- GET /auth/tasks/:id (get a specific task)
- POST /auth/tasks (add a task) 
- PUT /auth/tasks/:id (update a task)
- DELETE /auth/tasks/:id (delete a task)


## Design Decisions  

### Why Prisma with PostgreSQL?  
I chose PostgreSQL for its scalability and Prisma for its developer-friendly ORM features. Prisma provides type safety, auto-generated queries, and efficient database migrations, making it the best choice for structured database management.  

### Why Redux Toolkit?  
Managing global state with Redux Toolkit allows for efficient API caching, streamlined async requests, and normalized data handling, reducing unnecessary re-renders.  

### Why JWT Authentication?  
JWT provides secure, stateless authentication, reducing server load and improving security. Tokens are stored in httpOnly cookies to prevent XSS attacks.  

### Why Google reCAPTCHA?  
To prevent bot attacks, I implemented Google reCAPTCHA on the login page, ensuring only real users can access the system.  


---

## Security Measures
### Implemented Practices
- **Password Hashing**: User passwords are hashed using bcrypt.
- **JWT Authentication**: Tokens are validated and stored securely.

---

## Deployment
### Live URL (Optional)
couldn't be able to provide a live URL
but here is the video link for the overview of this project
[https://drive.google.com/file/d/1il722hlrHCU_nciBs1Sysk5goc0VQL9Y/view?usp=sharing]
