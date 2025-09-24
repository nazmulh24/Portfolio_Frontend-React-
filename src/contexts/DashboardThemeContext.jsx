import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const DashboardThemeContext = createContext();

// Theme definitions - easily extensible for more themes
const themeDefinitions = {
  system: {
    name: "System Theme",
    mode: "system", // Special mode for system preference
    primary: "#1976d2", // Will be overridden by actual system theme
    secondary: "#dc004e",
    error: "#d32f2f",
    warning: "#ed6c02",
    success: "#2e7d32",
    info: "#0288d1",
    isSystem: true, // Flag to identify system theme
  },
  dark: {
    name: "Dark",
    mode: "dark",
    primary: "#00d4ff",
    secondary: "#64ffda",
    error: "#ff6b6b",
    warning: "#ffb74d",
    success: "#4caf50",
    info: "#2196f3",
    background: {
      default: "#0f0f0f",
      paper: "#1a1a1a",
      secondary: "#222222",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
      disabled: "#666666",
    },
    sidebar: {
      background: "#1a1a1a",
      border: "#333333",
      hover: "rgba(255, 255, 255, 0.05)",
      active: "rgba(0, 212, 255, 0.1)",
    },
    card: {
      background: "#1a1a1a",
      border: "#333333",
      hover: "#222222",
    },
    divider: "#333333",
  },
  light: {
    name: "Light",
    mode: "light",
    primary: "#1976d2",
    secondary: "#dc004e",
    error: "#d32f2f",
    warning: "#ed6c02",
    success: "#2e7d32",
    info: "#0288d1",
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
      secondary: "#fafafa",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
      disabled: "#bdbdbd",
    },
    sidebar: {
      background: "#ffffff",
      border: "#e0e0e0",
      hover: "rgba(0, 0, 0, 0.04)",
      active: "rgba(25, 118, 210, 0.08)",
    },
    card: {
      background: "#ffffff",
      border: "#e0e0e0",
      hover: "#fafafa",
    },
    divider: "#e0e0e0",
  },
  blue: {
    name: "Ocean Blue",
    mode: "dark",
    primary: "#2196f3",
    secondary: "#03dac6",
    error: "#cf6679",
    warning: "#ffb74d",
    success: "#4caf50",
    info: "#81c784",
    background: {
      default: "#0d1421",
      paper: "#1e2837",
      secondary: "#2a3441",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
      disabled: "#78909c",
    },
    sidebar: {
      background: "#1e2837",
      border: "#37474f",
      hover: "rgba(33, 150, 243, 0.08)",
      active: "rgba(33, 150, 243, 0.12)",
    },
    card: {
      background: "#1e2837",
      border: "#37474f",
      hover: "#2a3441",
    },
    divider: "#37474f",
  },
  purple: {
    name: "Royal Purple",
    mode: "dark",
    primary: "#9c27b0",
    secondary: "#e91e63",
    error: "#f44336",
    warning: "#ff9800",
    success: "#4caf50",
    info: "#2196f3",
    background: {
      default: "#1a0d21",
      paper: "#2d1b3d",
      secondary: "#3a2449",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ce93d8",
      disabled: "#9c27b0",
    },
    sidebar: {
      background: "#2d1b3d",
      border: "#4a2c5a",
      hover: "rgba(156, 39, 176, 0.08)",
      active: "rgba(156, 39, 176, 0.12)",
    },
    card: {
      background: "#2d1b3d",
      border: "#4a2c5a",
      hover: "#3a2449",
    },
    divider: "#4a2c5a",
  },
  green: {
    name: "Forest Green",
    mode: "dark",
    primary: "#4caf50",
    secondary: "#81c784",
    error: "#f44336",
    warning: "#ff9800",
    success: "#8bc34a",
    info: "#2196f3",
    background: {
      default: "#0d1f0d",
      paper: "#1b2e1b",
      secondary: "#2e4a2e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#a5d6a7",
      disabled: "#66bb6a",
    },
    sidebar: {
      background: "#1b2e1b",
      border: "#388e3c",
      hover: "rgba(76, 175, 80, 0.08)",
      active: "rgba(76, 175, 80, 0.12)",
    },
    card: {
      background: "#1b2e1b",
      border: "#388e3c",
      hover: "#2e4a2e",
    },
    divider: "#388e3c",
  },
  orange: {
    name: "Warm Orange",
    mode: "dark",
    primary: "#ff9800",
    secondary: "#ffb74d",
    error: "#f44336",
    warning: "#ffc107",
    success: "#4caf50",
    info: "#2196f3",
    background: {
      default: "#1f1209",
      paper: "#2e1f0d",
      secondary: "#3d2b14",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffcc02",
      disabled: "#ff9800",
    },
    sidebar: {
      background: "#2e1f0d",
      border: "#5d3a1a",
      hover: "rgba(255, 152, 0, 0.08)",
      active: "rgba(255, 152, 0, 0.12)",
    },
    card: {
      background: "#2e1f0d",
      border: "#5d3a1a",
      hover: "#3d2b14",
    },
    divider: "#5d3a1a",
  },
};

export const DashboardThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("system");
  const [systemPreference, setSystemPreference] = useState("dark");
  const [isAnimating, setIsAnimating] = useState(false);

  // Detect system theme preference
  const detectSystemTheme = () => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "light";
  };

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("dashboardTheme");
    const systemTheme = detectSystemTheme();
    setSystemPreference(systemTheme);

    if (savedTheme && themeDefinitions[savedTheme]) {
      setCurrentTheme(savedTheme);
    } else {
      setCurrentTheme("system");
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e) => {
      const newSystemTheme = e.matches ? "dark" : "light";
      setSystemPreference(newSystemTheme);
    };

    mediaQuery.addListener(handleSystemThemeChange);

    return () => {
      mediaQuery.removeListener(handleSystemThemeChange);
    };
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("dashboardTheme", currentTheme);
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (
      themeName !== currentTheme &&
      (themeDefinitions[themeName] || themeName === "system")
    ) {
      setIsAnimating(true);
      setCurrentTheme(themeName);

      // Animation duration
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
  };

  // Get the actual theme data (resolve system theme to dark/light)
  const getActiveThemeData = () => {
    if (currentTheme === "system") {
      return themeDefinitions[systemPreference];
    }
    return themeDefinitions[currentTheme];
  };

  const themeData = getActiveThemeData();

  // Create Material-UI theme
  const muiTheme = createTheme({
    palette: {
      mode: themeData.mode,
      primary: {
        main: themeData.primary,
      },
      secondary: {
        main: themeData.secondary,
      },
      error: {
        main: themeData.error,
      },
      warning: {
        main: themeData.warning,
      },
      success: {
        main: themeData.success,
      },
      info: {
        main: themeData.info,
      },
      background: themeData.background,
      text: themeData.text,
      divider: themeData.divider,
    },
    components: {
      // Customize Material-UI components for smooth theme transitions
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition:
              "background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            backgroundColor: themeData.background.default,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition:
              "background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            transition: "background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            transition: "background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          },
        },
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    shape: {
      borderRadius: 8,
    },
  });

  const contextValue = {
    currentTheme,
    systemPreference,
    themeData,
    themeDefinitions,
    changeTheme,
    isAnimating,
    isSystemTheme: currentTheme === "system",
  };

  return (
    <DashboardThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </DashboardThemeContext.Provider>
  );
};

export const useDashboardTheme = () => {
  const context = useContext(DashboardThemeContext);
  if (!context) {
    throw new Error(
      "useDashboardTheme must be used within a DashboardThemeProvider"
    );
  }
  return context;
};

export default DashboardThemeContext;
