# LearnLingo

LearnLingo is a web application for an online language tutoring platform. Users can browse teachers, filter them by language, student level, and price, save favorites, and book a trial lesson. The UI supports multiple color themes based on the GoIT design mockup.

## Live demo

https://language-tutors-app.vercel.app/teachers

## Design mockup

The layout follows the **GoIT Learn Lingo** Figma mockup (desktop version) with support for multiple theme palettes (gray, yellow, green, blue, coral, orange).

## Main features

- **Home** — hero section, company advantages, and a call-to-action link to the Teachers page
- **Teachers** — teacher cards loaded from Firebase in batches of 4 with a **Load more** button
- **Filters** — by teaching language, student level, and price per hour
- **Favorites** — private page for authenticated users with saved teachers
- **Authentication** — registration, login, logout, and current user state via Firebase Auth
- **Booking modal** — trial lesson form with validation
- **Theme switcher** — dynamic accent colors across the app

## Tech stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Firebase](https://firebase.google.com/) (Authentication + Realtime Database)
- [react-hook-form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup)
- CSS Modules
- [react-icons](https://react-icons.github.io/react-icons/)

## Project structure

```
src/
├── components/       # Reusable UI (Header, TeacherCard, Modal, AuthModal, etc.)
├── context/          # Auth, Theme, and Favorites providers
├── firebase/         # Firebase config and API services
├── pages/            # Home, Teachers, Favorites
├── validation/       # Yup schemas for forms
└── config/           # Theme color tokens
```

## Getting started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- A Firebase project with **Email/Password Authentication** and **Realtime Database** enabled

### Installation

1. Clone the repository:

```bash
git clone https://github.com/hannamuzychuk/language-tutors-app.git
cd language-tutors-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example` and add your Firebase credentials:

```bash
cp .env.example .env
```

4. Import the `teachers.json` dataset into Realtime Database under the `teachers` node (from GoIT course materials).

5. Start the development server:

```bash
npm run dev
```

6. Open `http://localhost:5173` in your browser.

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Deploy to Vercel

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
3. Click **Add New Project** and import `language-tutors-app`.
4. Vercel should auto-detect **Vite** with these settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add environment variables from your `.env` file (all `VITE_FIREBASE_*` keys).
6. Click **Deploy**.

After deployment, copy the live URL (e.g. `https://language-tutors-app.vercel.app`).

The included `vercel.json` ensures React Router routes (`/teachers`, `/favorites`) work correctly on refresh.

## Firebase data structure

```
teachers/                  # Public teacher profiles (read-only for clients)
users/
  {uid}/
    favorites/
      {teacherKey}/        # Full teacher object saved as favorite
bookings/                  # Trial lesson booking requests
```

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`  | Run ESLint               |

## Author

Hanna Muzychuk
