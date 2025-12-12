# SSR React User Directory

A production-ready Server-Side Rendered (SSR) application built from scratch using **React**, **Vite**, and **Express**.

This project demonstrates a manual SSR implementation without meta-frameworks (like Next.js), featuring isomorphic data fetching, hydration, and a scalable feature-based architecture.

## 🚀 Features

- **Custom SSR Engine:** Manual Express server with Vite middleware for development and optimized static serving for production.
- **Isomorphic Data Fetching:** Data is prefetched on the server and dehydrated to the client using **TanStack Query v5**.
- **Clean Architecture:** Feature-based folder structure separating domain logic (`features/`) from presentation (`pages/`).
- **Performance Optimization:**

  - Full server-side hydration (no "loading" flickers on initial load).

  - Debounced search functionality.

- **Mobile-First UI:** Responsive design using Tailwind CSS with optimized touch zones.

---

## 🛠 Tech Stack

- **Runtime:** Node.js, Express
- **Frontend:** React 19, TypeScript
- **Build Tool:** Vite (SSR Mode)
- **State Management:** TanStack Query (React Query)
- **Styling:** Tailwind CSS

---

## 📦 Installation & Setup

**Prerequisites:** Node.js (v18+ recommended) and `pnpm`.

1.  **Install Dependencies**

    ```bash
    pnpm install
    ```

2.  **Environment Setup**
    Create a `.env` file in the root directory:
    ```env
    VITE_API_URL=https://jsonplaceholder.typicode.com
    ```

---

## 🏃‍♂️ How to Run

### **Development Mode**

Runs the Express server with Vite as middleware. Supports HMR (Hot Module Replacement).

```bash
pnpm serve
```

## 🏗 Architecture Overview

This project follows a **Page-Module & Feature-Based** architecture to ensure scalability and separation of concerns.

### **1. Entry Points**

- **`entry-client.tsx`**: The browser entry point. It hydrates the React app into the DOM using `hydrateRoot` and restores the React Query state from `window.__REACT_QUERY_STATE__`.
- **`entry-server.tsx`**: The server entry point. It handles server-side routing, matches the URL against a declarative route config, prefetches necessary data, and renders the app to an HTML string.

### **2. Server Logic (`server.ts`)**

Instead of a standard SPA fallback, the Express server intercepts all requests:

1.  **Match**: It determines if the request corresponds to a valid route.
2.  **Render**: It calls the `render()` function from `entry-server.tsx`, which returns the App HTML and the Dehydrated State.
3.  **Inject**: It dynamically replaces placeholders in `index.html` (`<div id="root">` and `</body>`) to inject the content and state script before sending the response to the browser.

### **3. Folder Structure Strategy**

- **`src/features/`**: Contains domain-specific logic (e.g., `Users`). This layer handles API calls, type definitions, and business logic. It is UI-agnostic.
- **`src/pages/`**: Contains the orchestration logic. Each page is a self-contained **Module** containing its own components, skeletons, and error states.
- **`src/components/`**: Shared "dumb" UI components (e.g., `Card`, `SearchBar`) that are reusable across the application.
