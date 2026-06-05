# Bible Study App

A React + Vite web application for guided Bible study, organized into themed blocks, modules, and lessons. The app is built with Firebase authentication and Firestore persistence so users can track their study progress, save notes, and continue where they left off.

## Key Features

- Firebase authentication with Google and email/password sign-in
- User progress tracking for completed studies
- Notes persistence per study
- Curriculum organized into blocks, modules, and studies
- Home dashboard with progress summary and resume study CTA
- Block, module, and study detail views
- Responsive UI built with Tailwind CSS and Lucide icons

## Project Structure

- `src/App.tsx` — application routes
- `src/main.tsx` — app entry point
- `src/contexts/AuthContext.tsx` — authentication state provider
- `src/hooks/useProgress.ts` — progress state and Firestore sync
- `src/services/auth.ts` — Firebase auth helpers
- `src/services/firebase.ts` — Firebase initialization
- `src/services/progress.ts` — Firestore progress CRUD functions
- `src/data/curriculum.ts` — blocks, modules, and study metadata
- `src/pages/` — page components for home, login, blocks, profile, and detail views
- `src/components/` — reusable UI elements and layout components
- `src/types/` — TypeScript types used across the app

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Firebase Authentication
- Firestore
- React Router DOM
- Lucide icons

## Pages

- `/` — Home dashboard
- `/login` — Authentication
- `/blocos` — Block list view
- `/bloco/:blockId` — Block detail view
- `/modulo/:moduleId` — Module detail view
- `/estudo/:studyId` — Study detail view
- `/perfil` — User profile

## Firebase Configuration

The app expects Firebase configuration values in environment variables. The values are loaded using Vite and should be defined in a `.env` or `.env.local` file at the project root.

Required variables:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

Example `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Setup

1. Install dependencies

```bash
npm install
```

2. Configure Firebase environment variables
3. Start the development server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

5. Preview the production build

```bash
npm run preview
```

## Authentication & Progress

- `src/contexts/AuthContext.tsx` keeps track of the authenticated Firebase user
- `src/services/auth.ts` handles Google sign-in, email sign-in, registration, logout, and Firestore user document creation
- `src/hooks/useProgress.ts` loads and refreshes progress, calculates completion percentages, and updates notes and completion state
- `src/services/progress.ts` stores progress under `users/{uid}/progress/{studyId}` in Firestore

## Curriculum Data

- `src/data/curriculum.ts` defines six study blocks (A through F)
- Each block contains modules with study counts and study metadata
- The curriculum currently includes well over 200 studies spanning foundational faith topics, biblical history, teachings of Jesus, Christian living, prophecy, and Spirit of Prophecy content

## Notes

- The app is designed for a Bible study curriculum aligned with Adventist study values
- Anonymous or unauthenticated visitors can browse the interface, but progress and notes save only for authenticated users
- The login page supports both Google authentication and email/password registration

## Contribution

Contributions are welcome. If you want to extend the app:

- add new curriculum content in `src/data/curriculum.ts`
- create new study detail components for richer lesson presentation
- implement additional progress analytics or streak tracking
- improve accessibility and mobile responsiveness

## License

This project is currently private and configured as a personal study app.
