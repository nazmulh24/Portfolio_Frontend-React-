import React from "react";
import { Box } from "@mui/material";

// Import background and sections
import ThreeJsBackground from "../components/ThreeJsBackground";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import PortfolioSection from "../components/sections/PortfolioSection";
import BlogSection from "../components/sections/BlogSection";
import ContactSection from "../components/sections/ContactSection";

const SinglePagePortfolio = () => {
  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      {/* 3D Background */}
      <ThreeJsBackground />

      {/* Main Content */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <BlogSection />
        <ContactSection />
      </Box>
    </Box>
  );
};

export default SinglePagePortfolio;
