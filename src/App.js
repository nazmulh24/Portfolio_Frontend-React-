import { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";

// Context
import { AuthProvider } from "./contexts/AuthContext.js";

// Router
import AppRouter from "./router/AppRouter.jsx";

// Components
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/shared/Footer.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";

// 3D Background
import ThreeBackground from "./components/shared/ThreeBackground.jsx";

function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Routes where we don't want to show Navbar and Footer
  const shouldHideNavbar = location.pathname.startsWith("/dashboard");

  // Debug logging
  console.log("Current pathname:", location.pathname);
  console.log("Should hide navbar:", shouldHideNavbar);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#0a192f",
        }}
      >
        <CircularProgress sx={{ color: "#64ffda" }} size={60} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: shouldHideNavbar ? "transparent" : "#0a192f", // Clean background for dashboard
        position: "relative",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        width: "100%",
      }}
    >
      {/* 3D Background - only show on non-dashboard pages */}
      {!shouldHideNavbar && <ThreeBackground />}

      {/* Main Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          margin: 0,
          padding: 0,
        }}
      >
        {!shouldHideNavbar && <Navbar />}
        <AppRouter />
        {!shouldHideNavbar && <Footer />}
        <ScrollToTop />
      </Box>
    </Box>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
