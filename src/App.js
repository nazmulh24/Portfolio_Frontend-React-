import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

// Context
import { AuthProvider } from "./contexts/AuthContext.js";

// Router
import AppRouter from "./router/AppRouter.jsx";

// Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

// 3D Background
import ThreeBackground from "./components/ThreeBackground.jsx";

function App() {
  const [loading, setLoading] = useState(true);

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
    <AuthProvider>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#0a192f",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 3D Background */}
        <ThreeBackground />

        {/* Main Content */}
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Navbar />
          <AppRouter />
          <Footer />
          <ScrollToTop />
        </Box>
      </Box>
    </AuthProvider>
  );
}

export default App;
