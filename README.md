# Campus Connect

Live URL: https://campus-connect-54bf1.web.app

A student community platform for skill exchange, study groups, and book discovery.

## Features
- **Authentication:** Email/Password and Google login.
- **Protected Routes:** Unauthenticated users are redirected to login.
- **Community Feed:** Create, delete, and like posts saved in Firestore.
- **Book Search:** Integration with Open Library API to search for books.
- **Responsive UI:** Built with Tailwind CSS.

## Tech Stack
React, Vite, Tailwind CSS, Firebase (Auth & Firestore), Open Library API, Vitest, GitHub Actions.

## How it works (Architecture)
- `AuthContext` listens to Firebase's `onAuthStateChanged` to share login state with all components.
- `ProtectedRoute` checks this state to secure pages like the Feed and Book Search.
- Data persistence is handled by Firestore using `onSnapshot` for real-time updates.
- The Book Search calls the Open Library external API directly.

## Running Locally
1. `npm install`
2. `npm run dev`
3. Note: You will need your own `src/firebase.js` config file to run the database locally.

## Testing
Run `npm run coverage` to see the test suite. Target is >65%.