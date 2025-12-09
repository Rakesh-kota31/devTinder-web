# DevTinder Web

A modern, interactive web application built with **React** that replicates the core functionality of a developer-focused dating/networking platform. Users can discover fellow developers, send connection requests, view profiles, and manage their connections.

## 🚀 Features

- **Authentication**: User login and signup with email/password validation
- **Feed**: Browse developer profiles with swipe-like interactions
- **Profile Management**: View and edit your profile with detailed information
- **Connection Requests**: Send and receive connection requests from other developers
- **Connections**: Manage and view accepted connections
- **Real-time Updates**: Redux state management for instant UI updates
- **Responsive Design**: Beautiful, mobile-friendly UI with DaisyUI components

## 🛠️ Tech Stack

### Frontend Framework & Build
- **React** ^19.2.0 - UI library for building interactive components
- **Vite** ^7.2.4 - Lightning-fast build tool and dev server
- **React Router DOM** ^7.10.1 - Client-side routing for seamless navigation

### State Management
- **Redux Toolkit** ^2.11.0 - Global state management
- **React Redux** ^9.2.0 - React bindings for Redux

### Styling
- **Tailwind CSS** ^4.1.17 - Utility-first CSS framework
- **@tailwindcss/vite** ^4.1.17 - Vite integration for Tailwind
- **DaisyUI** ^5.5.8 - Component library built on Tailwind CSS

### HTTP & API
- **Axios** ^1.13.2 - Promise-based HTTP client for API requests

### Development Tools
- **ESLint** ^9.39.1 - Code quality and style enforcement
- **React Refresh** - Fast refresh for development

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── UserCard.jsx    # Card displaying user profiles in feed
│   ├── RequestCard.jsx # Card for displaying connection requests
│   └── ConnectionCard.jsx # Card for displaying accepted connections
├── layouts/            # Layout components
│   ├── NavBar.jsx      # Navigation bar with user dropdown
│   └── Footer.jsx      # Footer component
├── pages/              # Page components
│   ├── MainLayout.jsx  # Main layout wrapper with NavBar & Footer
│   ├── Feed.jsx        # Browse and interact with developer profiles
│   ├── Login.jsx       # User login page
│   ├── SignUp.jsx      # User registration page
│   ├── Profile.jsx     # View user's own profile
│   ├── EditProfile.jsx # Edit profile information
│   ├── Requests.jsx    # View received connection requests
│   ├── Connections.jsx # View accepted connections
│   └── Error.jsx       # 404 error page
├── state/              # Redux store and slices
│   ├── store.js        # Redux store configuration
│   ├── userSlice.js    # User authentication state
│   ├── cardSlice.js    # Feed cards state
│   ├── requestSlice.js # Connection requests state
│   └── connectionSlice.js # Connections state
├── utils/              # Utility functions and constants
│   ├── constants.js    # API base URL and constants
│   └── validations.js  # Form validation functions
├── App.jsx             # Main app component with routing
├── main.jsx            # React app entry point
└── index.css           # Global styles
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd devTinder-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Update `src/utils/constants.js` with your backend API base URL:
     ```javascript
     export const baseURL = "http://your-backend-url:port";
     ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## 📜 Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint to check code quality

## 🎯 Key Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/feed` | Feed | Browse developer profiles |
| `/login` | Login | User authentication |
| `/signup` | SignUp | User registration |
| `/profile` | Profile | View current user profile |
| `/profile/edit` | EditProfile | Edit profile information |
| `/requests` | Requests | View incoming connection requests |
| `/connections` | Connections | View accepted connections |
| `*` | Error | 404 page for undefined routes |

## 🎨 Redux State Structure

```javascript
store = {
  user: { /* user auth data */ },
  cards: [ /* array of developer profiles */ ],
  requests: [ /* array of connection requests */ ],
  connections: [ /* array of accepted connections */ ]
}
```

## 🔐 Authentication Flow

1. User signs up with email, password, first name, last name
2. Form validation ensures data integrity
3. Request sent to backend API
4. On success, user data dispatched to Redux store (`addUser` action)
5. Navigation redirected to `/home` or `/feed`
6. NavBar component checks Redux user state for conditional rendering

## 🎭 Components Overview

### UserCard
- Displays individual developer profiles in the feed
- Shows name, profile image, and interaction buttons
- "Interested" and "Ignored" buttons to send requests

### RequestCard
- Shows received connection requests
- Displays sender's profile info (name, age, gender)
- Accept/Reject actions for managing requests

### ConnectionCard
- Displays accepted connections
- Shows mutual connection information
- Action buttons for messaging or disconnecting

## 🔄 API Integration

The app communicates with a backend API using Axios. Key endpoints:

- `POST /signup` - Register new user
- `POST /login` - Authenticate user
- `GET /user/feed` - Fetch developer profiles
- `GET /user/requests/received` - Fetch incoming requests
- `POST /request/send/:status/:userId` - Send connection request
- `GET /user/connections` - Fetch accepted connections
- `PUT /user/profile/edit` - Update user profile

All API requests include `withCredentials: true` for secure cookie-based authentication.

## 🎨 Styling & Theming

The app uses **DaisyUI** for pre-built, accessible components and **Tailwind CSS** for utility-based styling. Key design features:

- Responsive grid layouts for cards
- Flexbox for alignment and spacing
- DaisyUI form components for inputs
- Custom button styles with Tailwind utilities
- Mobile-first responsive design

## 🚀 Performance

- **Vite** provides fast bundling and hot reload
- **Redux** enables efficient state updates with minimal re-renders
- **React Router** enables code splitting and lazy loading
- **Tailwind CSS** with Vite plugin for optimized CSS output

## 📝 Form Validation

The app includes client-side validation for:
- Sign Up: First name, last name, email format, password strength
- Login: Email format, password required
- Profile Edit: All profile fields with appropriate constraints

Validation functions are in `src/utils/validations.js`

## 🔒 Security Considerations

- Passwords sent securely via HTTPS (in production)
- Authentication state managed in Redux store
- Axios configured with `withCredentials` for secure cookie handling
- Input validation on both client and server side
- ESLint enforced code standards

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (responsive design)

## 🤝 Contributing

To contribute improvements:
1. Create a feature branch
2. Make your changes
3. Run `npm run lint` to check code quality
4. Submit a pull request

## 📄 License

This project is provided as-is for educational and development purposes.
