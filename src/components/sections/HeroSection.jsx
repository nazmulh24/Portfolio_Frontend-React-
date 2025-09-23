import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <Box
      id="home"
      component="section"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "linear-gradient(135deg, #0a192f 0%, #112240 100%)",
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" color="white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#64ffda",
                  fontFamily: "Monaco, monospace",
                  marginBottom: 2,
                }}
              >
                Hi, my name is
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "4rem", lg: "5rem" },
                  fontWeight: 700,
                  marginBottom: 1,
                  color: "#ccd6f6",
                }}
              >
                Nazmul Hossain
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "3rem", lg: "4rem" },
                  fontWeight: 700,
                  marginBottom: 3,
                  color: "#8892b0",
                }}
              >
                I build intelligent solutions.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  maxWidth: "600px",
                  margin: "0 auto",
                  marginBottom: 4,
                  color: "#8892b0",
                  lineHeight: 1.6,
                }}
              >
                I'm a 3rd-year CSE student passionate about AI/ML, research, and
                full-stack development. From algorithmic problem-solving to
                modern web applications, I create technology that makes a
                difference.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: "#64ffda",
                  borderColor: "#64ffda",
                  padding: "12px 24px",
                  fontSize: "1.1rem",
                  fontFamily: "Monaco, monospace",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(100, 255, 218, 0.1)",
                    borderColor: "#64ffda",
                  },
                }}
                onClick={() => {
                  const aboutSection = document.getElementById("about");
                  aboutSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get to know me
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HeroSection;
