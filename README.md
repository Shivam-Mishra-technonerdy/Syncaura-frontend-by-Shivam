# Syncaura 🚀
Modern, scalable collaborative workspace platform designed for teams to streamline projects, tasks, real-time chats, video meetings, and attendance management in one unified dashboard.

Syncaura integrates multi-role workspaces (Admin, Co-Admin, and User) with global Redux state management, Tailwind-driven aesthetics, client-side validation, and secure JWT-based API communication with auto-refreshing sessions.

## Features
* **Multi-Role Dashboards**: Customized workspace layouts for Admins, Co-Admins, and Users.
* **Project & Task Management**: Real-time project boards and interactive checklists.
* **Real-Time Communication**: Multi-channel chat interface designed for Socket.IO integration.
* **Interactive Meetings**: Virtual video call client with scheduling and WebRTC/Jitsi integration.
* **Attendance & Leave Tracker**: Digital sign-in sheet with request approval portals.
* **Document Repository**: Shared file management, organization, and preview dashboard.
* **Complaints Portal**: Multi-status feedback logging and tracking interface.
* **Notice Board**: Corporate bulletin board for publishing notices and announcements.
* **Global Theme Engine**: Interactive Dark Mode and Light Mode toggles.
* **JWT Interceptors**: Automatic Bearer token insertion and auto-token refresh queues.

## Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend Core** | React (v19), Vite |
| **Styling & Theme** | Tailwind CSS, Lucide React, Framer Motion |
| **State Management** | Redux Toolkit |
| **Routing** | React Router Dom (v7) |
| **Network Client** | Axios |
| **Notifications** | React Toastify |
| **Form Validation** | React Hook Form |

## System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SYNCAURA CLIENT LAYER                           │
│                                                                        │
│  ┌───────────────────────┐  Validate Inputs  ┌──────────────────────┐  │
│  │   UI Components &     ├──────────────────>│   validationRules    │  │
│  │  Pages (SignIn/Up/etc)│                   └──────────────────────┘  │
│  └──────────┬────────────┘                                             │
│             │                                                          │
│             │ Dispatches Actions                                       │
│             ▼                                                          │
│  ┌───────────────────────┐  Selects State    ┌──────────────────────┐  │
│  │     Redux Store       │<──────────────────┤    Slices (Auth,     │  │
│  │ (Thunks & Operations) │                   │    Theme, Meet)      │  │
│  └──────────┬────────────┘                   └──────────────────────┘  │
│             │                                                          │
│             │ HTTP Requests / WebSockets                               │
│             ▼                                                          │
│  ┌───────────────────────┐                   ┌──────────────────────┐  │
│  │  Axios Client Wrapper │                   │  Local Storage       │  │
│  │ (Request/Response)    │<─────────────────>│  (accessToken,       │  │
│  │  Interceptors         │   Read/Write JWT  │   refreshToken)      │  │
│  └──────────┬────────────┘                   └──────────────────────┘  │
└─────────────┼──────────────────────────────────────────────────────────┘
              │
              │ HTTP / WebSockets (Port 5000)
              ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        SYNCAURA SERVER LAYER                           │
│                                                                        │
│  ┌───────────────────────┐                   ┌──────────────────────┐  │
│  │  Express/Node Server  │<─────────────────>│   Socket.IO Server   │  │
│  │  (REST Controllers)   │                   │ (Real-time events)   │  │
│  └──────────┬────────────┘                   └──────────┬───────────┘  │
│             │                                           │              │
│             └───────────────────┬───────────────────────┘              │
│                                 ▼                                      │
│                      ┌──────────────────────┐                          │
│                      │  MongoDB Database    │                          │
│                      │ (User/Task Schemas)  │                          │
│                      └──────────────────────┘                          │
└────────────────────────────────────────────────────────────────────────┘
```

## Processing Workflow
1. **User Sign Up / Sign In**:
   * User inputs credentials on the frontend page.
   * `validationRules` verifies name, email formatting, and password requirements client-side.
   * On validation success, an `authThunk` triggers the Axios wrapper.
2. **Authentication request**:
   * Request interceptor retrieves `accessToken` from `localStorage` (if present) and appends it to headers.
   * The backend validates the inputs and issues a short-lived `accessToken` and a long-lived `refreshToken`.
3. **Session Synchronization**:
   * On response success, the thunk saves both tokens to `localStorage` and updates the global `authSlice` state.
   * The user is automatically routed to their dashboard based on their account role (Admin, Co-Admin, or default user).
4. **Session Token Refresh**:
   * When an API call fails with `401 Unauthorized` (token expired), the Axios response interceptor pauses the request queue.
   * It requests a new `accessToken` from `/auth/refresh` using the `refreshToken`.
   * **On Success**: Restarts all queued requests with the new token.
   * **On Failure**: Emits an `auth_session_expired` event, clears tokens, logs the user out, and redirects them to the Sign In screen.

## Cost-Efficient Architecture
* **Vite HMR**: Hot Module Replacement for near-instant local compiling.
* **Client-Side Validation**: Stops malformed payloads before they hit the network, saving server computing resources.
* **Token Queuing Interceptor**: Eliminates redundant token refresh requests by pausing the call stack during refreshes.
* **Redux Selector Memoization**: Prevents unnecessary UI re-renders, optimizing client memory footprint.

## Running the Application
1. Navigate to the frontend directory:
   ```bash
   cd Syncaura-frontend-1
   ```
2. Install the project dependencies:
   ```bash
   npm install
   ```
3. Run the Vite local development server:
   ```bash
   npm run dev
   ```

## API Documentation
The API client communicates with the backend server via endpoints documented in:
* **[API_Architecture.md](file:///c:/Users/Shivratna/OneDrive/Desktop/Syncora%20Fr/Syncaura-frontend-1/API_Architecture.md)**

## Roadmap
- [ ] Connect chat dashboard with live Socket.IO events
- [ ] Add Jitsi Meet video frames in the meeting panel
- [ ] Integrate file uploads and storage in the documents hub
- [ ] Add mobile layout responsive optimizations
- [ ] Implement Progressive Web App (PWA) offline capabilities
- [ ] Set up automated frontend unit testing suite

## Author
**Shivratna Shinde**
Information Technology Student | Full-Stack Developer | Team Lead

* [LinkedIn](https://www.linkedin.com/in/shivratna-shinde-a0a208226/)
* [GitHub](https://github.com/Shivratna-27)
* [Portfolio](https://shivratnashinde.com/)
