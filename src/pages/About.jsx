import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 12 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h2"
          align="center"
          sx={{
            color: "#ccd6f6",
            mb: 4,
            fontWeight: "bold",
          }}
        >
          About Me
        </Typography>

        <Typography
          variant="h5"
          align="center"
          sx={{
            color: "#8892b0",
            mb: 6,
            maxWidth: "800px",
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          I'm a passionate software engineer specializing in Django backend
          development and React frontend applications. As a researcher and tech
          enthusiast, I love exploring new technologies and building innovative
          solutions.
        </Typography>

        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/contact"
            sx={{
              color: "#64ffda",
              borderColor: "#64ffda",
              "&:hover": {
                backgroundColor: "rgba(100, 255, 218, 0.1)",
              },
            }}
          >
            Get In Touch
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default About;
