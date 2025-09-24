// Export all dummy data
export * from "./portfolioData";
export * from "./dashboardData";
export * from "./contentData";

// Navigation Data
export const navigationItems = [
  {
    id: 1,
    name: "Dashboard",
    path: "/admin",
    icon: "Dashboard",
    active: true,
  },
  {
    id: 2,
    name: "Analytics",
    path: "/admin/analytics",
    icon: "Analytics",
    active: false,
  },
  {
    id: 3,
    name: "Projects",
    path: "/admin/projects",
    icon: "Code",
    active: false,
  },
  {
    id: 4,
    name: "Blog",
    path: "/admin/blog",
    icon: "Article",
    active: false,
  },
  {
    id: 5,
    name: "Messages",
    path: "/admin/messages",
    icon: "Message",
    active: false,
  },
  {
    id: 6,
    name: "Settings",
    path: "/admin/settings",
    icon: "Settings",
    active: false,
  },
];

// Theme Configuration
export const themeOptions = [
  {
    id: 1,
    name: "Dark Professional",
    value: "dark",
    primary: "#00d4ff",
    secondary: "#4caf50",
    background: "#0a0a0a",
    surface: "#1a1a1a",
    active: true,
  },
  {
    id: 2,
    name: "Light Professional",
    value: "light",
    primary: "#1976d2",
    secondary: "#388e3c",
    background: "#f5f5f5",
    surface: "#ffffff",
    active: false,
  },
  {
    id: 3,
    name: "Cyberpunk",
    value: "cyberpunk",
    primary: "#ff0080",
    secondary: "#00ff80",
    background: "#0d0d0d",
    surface: "#1a0d1a",
    active: false,
  },
];
