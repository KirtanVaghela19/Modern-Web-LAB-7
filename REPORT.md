# Lab 7 Short Report

## Authentication Workflow

The SecureDocs backend supports user registration and login using Express.js. During registration, the system validates the input, ensures that the username and email are unique, and hashes the password using `bcrypt` before storing the user in MongoDB. During login, the system accepts a username or email together with a password, finds the matching user, and compares the submitted password against the stored bcrypt hash.

If the credentials are correct, the server creates a session and stores the authenticated user's `userId` and login timestamp in the session object. This means the server maintains the authentication state and the browser or Postman stores only the session cookie.

## Session Management Implementation

Session management is implemented using `express-session` with MongoDB-backed session storage through `connect-mongo`. Each session cookie is configured with the `httpOnly` flag so client-side JavaScript cannot read it directly. The cookie also includes a timeout using `maxAge`, and the session is configured to roll forward on activity so it expires after inactivity.

When the user sends additional authenticated requests, the browser includes the session cookie and the backend uses it to load the corresponding session from MongoDB. On logout, the backend destroys the server-side session and clears the session cookie.

## Authorization Middleware Logic

Protected routes use authentication middleware that verifies a valid session exists and that the session includes a `userId`. If that check fails, the backend returns `401 Unauthorized`.

For document detail, update, and delete operations, the backend also uses ownership authorization middleware. This middleware loads the requested document and verifies that its `ownerId` matches the authenticated user's ID before allowing access.

## Document Ownership Verification

Every document record stores the `ownerId` of the authenticated user who created it. When a user requests a specific document or attempts to modify or delete it, the backend compares the document's `ownerId` against the `userId` stored in the current session.

If the IDs match, the operation is allowed. If they do not match, the backend rejects the request with a forbidden response. This ensures users can only access and manage documents they personally own.
