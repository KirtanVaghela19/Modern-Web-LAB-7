# SecureDocs - Lab 7

This project implements Lab 7 for Modern Web Technologies: authentication and authorization in a SecureDocs web application.

## Project Structure

- `securedocs-backend/` Node.js + Express backend with session-based authentication and MongoDB storage
- `securedocs-frontend/` Angular frontend for registration, login, profile, and document management

## Lab Features Implemented

- User registration with unique username and email checks
- Password hashing with `bcrypt`
- Session-based login using `express-session`
- Session persistence with `httpOnly` cookies and expiry timeout
- Protected profile and document routes
- Ownership checks so users can only access their own documents
- Secure logout with session destruction and cookie invalidation

## Required Backend Endpoints

- `POST /register`
- `POST /login`
- `POST /logout`
- `GET /profile`
- `POST /documents`
- `GET /documents`
- `GET /documents/:id`
- `PUT /documents/:id`
- `DELETE /documents/:id`

The backend also keeps the existing frontend-compatible routes:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/profile`
- `GET /api/auth/session`
- `POST /api/documents`
- `GET /api/documents`
- `GET /api/documents/:id`
- `PUT /api/documents/:id`
- `DELETE /api/documents/:id`

## How To Run

1. Start MongoDB on `mongodb://127.0.0.1:27017`
2. Run `start-securedocs.bat`
3. Frontend runs on `http://localhost:4200`
4. Backend runs on `http://localhost:3000`

## Testing Checklist

- Register a new user
- Verify duplicate username/email is rejected
- Log in successfully
- Verify invalid login is rejected
- Access `/profile` before and after login
- Create a document
- Retrieve only the logged-in user's documents
- Update and delete an owned document
- Verify access to another user's document is denied
- Log out and verify protected routes return `401 Unauthorized`

## Submission Notes

- Add screenshots required by the lab to your repository
- Use the included `REPORT.md` as the short report for submission
