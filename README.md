# Call Fabric Client

Call Fabric Client is a web application built with Next.js that streamlines video call management using the SignalWire API. It provides an intuitive interface for creating video rooms, managing contacts, authenticating users, and integrating seamlessly with SignalWire's video conferencing services.

The application leverages modern technologies such as React, Next.js, TypeScript, Tailwind CSS, and Zustand to ensure a smooth and efficient user experience.

## 📌 Features

- **Video Conferencing:** Create and join video rooms with customizable settings.
- **Contact Directory:** Manage contacts with options to add, remove, and initiate calls.
- **User Authentication:** Sign up and log in with email and password, with local storage persistence.
- **Call Management:** Connect and disconnect calls in real-time with status updates.
- **Responsive Interface:** Optimized for various devices using Tailwind CSS.
- **State Management:** Utilizes React Context and Zustand for centralized state control.
- **Call History:** View a log of previous calls.

## 🔧 Prerequisites

Before getting started, ensure you have the following installed:

- Node.js (v18 or later recommended)
- npm or Yarn
- A SignalWire account with API credentials (Project ID, API Token, Space URL)

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/your-username/call-fabric-client.git
cd call-fabric-client
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env.local` file in the project's root directory and populate it with your SignalWire credentials:

```env
NEXT_PUBLIC_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_API_TOKEN=<your-api-token>
NEXT_PUBLIC_SPACE_URL=<your-space-url>
```

These credentials are required for API authentication and video room creation.

### Start the development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

## 📖 Usage

### Start the application

```bash
npm run dev
```

### Access the app in your browser

```
http://localhost:3000
```

### Core Features

- **User Authentication:** Sign up or log in to access the system.
- **Video Calls:** Create or join a video room.
- **Contact Management:** Add, edit, and delete contacts.
- **Call History:** View past call records.
- **Logout:** Securely sign out of the application.

### Build for production

```bash
npm run build
```

## 📂 Project Structure

```
call-fabric-client/
├── .next/                  # Next.js build directory
├── node_modules/           # Dependencies
├── public/                 # Static assets
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   ├── contexts/           # React Context API for state management
│   ├── pages/              # Next.js pages
│   ├── services/           # API services and integrations
│   ├── store/              # Zustand state management
│   ├── styles/             # Global styles and Tailwind CSS
│   ├── types/              # TypeScript type definitions
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore file
├── env.example             # Example environment variables
├── next-env.d.ts           # TypeScript environment types
├── next.config.mjs         # Next.js configuration
├── package-lock.json       # Dependency lockfile
├── package.json            # Project dependencies
├── postcss.config.js       # PostCSS configuration
├── postcss.config.mjs      # Alternative PostCSS configuration
├── README.md               # Project documentation
├── tailwind.config.js      # Tailwind CSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration (TypeScript)
└── tsconfig.json           # TypeScript configuration
```

## 📌 Key Dependencies

| Dependency  | Description |
|-------------|------------|
| **Next.js** | A framework for React applications. |
| **React** | A library for building user interfaces. |
| **Zustand** | A lightweight state management library. |
| **React Context** | Built-in state management for global state control. |
| **Tailwind CSS** | A utility-first styling framework. |

## 🛠️ React Context Usage

React Context is used for managing global application state, providing a seamless way to pass data between components without prop drilling. In this project, it is used to handle user authentication and application state management efficiently.

```
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string) => setUser(username);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

```

For a complete list of dependencies, refer to `package.json`.

## 🛠️ Known Issues

- **Data Persistence:** Local storage is used for authentication and contacts. Future updates may integrate a database for better data management.
- **Token Management:** SignalWire tokens are not currently validated on the backend, which could allow unauthenticated calls.
- **SDK Issues:** The `@signalwire-community/react` package was chosen due to compatibility issues with `@signalwire/js`.

## 📜 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for more details.