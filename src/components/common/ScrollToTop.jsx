import React, { useState, useEffect } from "react";
import { Fab, Zoom } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={isVisible} timeout={300}>
      <Fab
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          backgroundColor: "#64ffda",
          color: "#0a192f",
          "&:hover": {
            backgroundColor: "#4fd1c7",
            transform: "scale(1.1)",
          },
          transition: "all 0.3s ease",
          zIndex: 1000,
        }}
        aria-label="scroll to top"
      >
        <KeyboardArrowUp />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTop;
