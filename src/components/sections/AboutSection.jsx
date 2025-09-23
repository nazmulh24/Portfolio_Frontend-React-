import React from "react";
import { Box, Typography, Container, Grid, Paper, Chip } from "@mui/material";
import { motion } from "framer-motion";

const AboutSection = () => {
  const skills = [
    "Python",
    "C/C++",
    "JavaScript (ES6+)",
    "Django REST Framework",
    "React.js",
    "Machine Learning",
    "Data Structures & Algorithms",
    "PostgreSQL",
    "Git & GitHub",
    "Problem Solving",
    "Research & Analysis",
    "AI/ML Fundamentals",
  ];

  return (
    <Box
      id="about"
      component="section"
      sx={{
        minHeight: "100vh",
        padding: { xs: "4rem 0", md: "6rem 0" },
        backgroundColor: "#0a192f",
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              color: "#ccd6f6",
              marginBottom: 4,
              display: "flex",
              alignItems: "center",
              "&::before": {
                content: '"01."',
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                color: "#64ffda",
                fontFamily: "Monaco, monospace",
                marginRight: 2,
              },
              "&::after": {
                content: '""',
                display: "block",
                width: "300px",
                height: "1px",
                backgroundColor: "#233554",
                marginLeft: 2,
              },
            }}
          >
            About Me
          </Typography>
        </motion.div>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  color: "#8892b0",
                  lineHeight: 1.6,
                  marginBottom: 3,
                }}
              >
                Hello! I'm Nazmul, a 3rd-year Computer Science Engineering
                student passionate about creating innovative solutions through
                technology. My journey started with problem-solving in C, which
                built my strong foundation in algorithms and data structures.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  color: "#8892b0",
                  lineHeight: 1.6,
                  marginBottom: 3,
                }}
              >
                Currently, I specialize in full-stack development with Django
                and React, while actively exploring the fascinating world of
                AI/ML and research. I believe in combining theoretical knowledge
                with practical implementation to solve real-world problems.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  color: "#8892b0",
                  lineHeight: 1.6,
                  marginBottom: 3,
                }}
              >
                My goal is to contribute to cutting-edge research and develop
                intelligent systems that make a positive impact. InshAllah, this
                portfolio will showcase my growing expertise and ambitious
                projects.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  color: "#8892b0",
                  lineHeight: 1.6,
                  marginBottom: 3,
                }}
              >
                Here are a few technologies I've been working with recently:
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Chip
                      label={skill}
                      sx={{
                        backgroundColor: "rgba(100, 255, 218, 0.1)",
                        color: "#64ffda",
                        border: "1px solid #64ffda",
                        fontFamily: "Monaco, monospace",
                        fontSize: "0.875rem",
                        "&:hover": {
                          backgroundColor: "rgba(100, 255, 218, 0.2)",
                        },
                      }}
                    />
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: "transparent",
                  position: "relative",
                  maxWidth: "300px",
                  margin: { xs: "0 auto", md: "0" },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "300px",
                    backgroundColor: "#64ffda",
                    borderRadius: "4px",
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "20px",
                      left: "20px",
                      width: "100%",
                      height: "100%",
                      border: "2px solid #64ffda",
                      borderRadius: "4px",
                      zIndex: -1,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="/api/placeholder/300/300"
                    alt="Profile"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "4px",
                      filter: "grayscale(100%) contrast(1)",
                      mixBlendMode: "multiply",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        filter: "none",
                        mixBlendMode: "normal",
                      },
                    }}
                  />
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection;
