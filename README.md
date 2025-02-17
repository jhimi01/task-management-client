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
- npm or yarn
- PostgreSQL (if running locally)

### Installation
```sh
git clone https://github.com/jhimi01/task-management-client.git
cd project-directory
npm install
```

### Environment Variables
I will send this to your email

### Running Locally
```sh
npm run dev
```

---

## API Documentation
### Authentication
#### `POST /api/login`
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

### Tasks
#### `GET /api/tasks`
**Headers:**
```json
{
  "Authorization": "Bearer <token>"
}
```
**Response:**
```json
[
  {
    "id": 1,
    "title": "Complete Redux setup",
    "completed": false
  }
]
```

---

## Security Measures
### Implemented Practices
- **Password Hashing**: User passwords are hashed using bcrypt.
- **JWT Authentication**: Tokens are validated and stored securely.
- **Input Validation**: Backend APIs validate inputs to prevent SQL injection and XSS attacks.
- **CORS Policies**: Configured to allow only whitelisted domains.

---

## Deployment
### Live URL (Optional)
[Your Deployed Link Here]

### Deployment Instructions
For deploying to Vercel or Netlify:
```sh
vercel deploy
```
For backend deployment (e.g., on Render or DigitalOcean):
```sh
docker build -t my-app .
docker run -p 5000:5000 my-app
```

---

## License
[Your License Here]

