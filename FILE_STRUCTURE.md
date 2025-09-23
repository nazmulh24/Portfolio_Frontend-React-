# Frontend File Structure Guide

## File Extensions Convention

### .jsx Files (React Components & Pages)

- All React components that return JSX
- Located in: `/src/components/`, `/src/pages/`, `/src/router/`

**Components:**

- `src/components/AdminLogin.jsx`
- `src/components/Footer.jsx`
- `src/components/Navbar.jsx`
- `src/components/ScrollToTop.jsx`
- `src/components/ThreeBackground.jsx`

**Pages:**

- `src/pages/About.jsx`
- `src/pages/Blog.jsx`
- `src/pages/BlogPost.jsx`
- `src/pages/Contact.jsx`
- `src/pages/Home.jsx`
- `src/pages/NotFound.jsx`
- `src/pages/Portfolio.jsx`
- `src/pages/ProjectDetail.jsx`

**Router:**

- `src/router/AppRouter.jsx`

### .js Files (Utilities, Services, Contexts)

- JavaScript utilities, API services, contexts
- Located in: `/src/services/`, `/src/contexts/`, `/src/utils/`, `/src/hooks/`

**Services:**

- `src/services/api.js` - API client and endpoints

**Contexts:**

- `src/contexts/AuthContext.js` - Authentication context

**Main Files:**

- `src/App.js` - Main application component
- `src/index.js` - Application entry point

## Import Examples

### Importing Components (.jsx)

```javascript
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import AppRouter from "./router/AppRouter.jsx";
```

### Importing Services/Utilities (.js)

```javascript
import { portfolioAPI, authAPI } from "../services/api.js";
import { useAuth } from "../contexts/AuthContext.js";
```

## Router Structure

The application uses a separate router file (`AppRouter.jsx`) that handles all routing logic, keeping the main `App.js` clean and focused on layout and providers.

## API Configuration

- Base URL: `http://127.0.0.1:8000/api/v1`
- Authentication: Django Token format
- All API calls centralized in `src/services/api.js`
