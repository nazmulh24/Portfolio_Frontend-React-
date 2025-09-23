import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import {
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const PortfolioSection = () => {
  const projects = [
    {
      title: "Student Management System",
      description:
        "A comprehensive web application built with Django REST Framework and React for managing student records, courses, and academic progress with role-based authentication.",
      image: "/api/placeholder/400/250",
      technologies: [
        "React",
        "Django",
        "PostgreSQL",
        "JWT Auth",
        "Material-UI",
      ],
      github: "https://github.com",
      live: "https://example.com",
      featured: true,
    },
    {
      title: "Algorithm Visualizer",
      description:
        "Interactive web application to visualize sorting and searching algorithms, helping students understand algorithmic concepts through animated demonstrations.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "JavaScript", "D3.js", "Algorithms"],
      github: "https://github.com",
      live: "https://example.com",
      featured: true,
    },
    {
      title: "Problem Solving Solutions",
      description:
        "Collection of algorithmic problem solutions in C/C++ covering data structures, dynamic programming, and competitive programming challenges.",
      image: "/api/placeholder/400/250",
      technologies: ["C++", "Data Structures", "Algorithms", "Problem Solving"],
      github: "https://github.com",
      live: null,
      featured: false,
    },
    {
      title: "ML Learning Journey",
      description:
        "Documentation and implementations of machine learning concepts, from basic linear regression to neural networks, with Python and popular ML libraries.",
      image: "/api/placeholder/400/250",
      technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Jupyter"],
      github: "https://github.com",
      live: "https://example.com",
      featured: false,
    },
  ];

  const ProjectCard = ({ project, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <Card
        sx={{
          backgroundColor: "#112240",
          color: "#ccd6f6",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-10px)",
            boxShadow: "0 20px 30px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={project.image}
          alt={project.title}
          sx={{
            filter: "grayscale(100%) contrast(1)",
            transition: "filter 0.3s ease",
            "&:hover": {
              filter: "none",
            },
          }}
        />
        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Typography
            variant="h6"
            component="h3"
            sx={{
              color: "#64ffda",
              fontWeight: 600,
              marginBottom: 1,
            }}
          >
            {project.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#8892b0",
              marginBottom: 2,
              flexGrow: 1,
              lineHeight: 1.5,
            }}
          >
            {project.description}
          </Typography>

          <Box sx={{ marginBottom: 2 }}>
            {project.technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  backgroundColor: "rgba(100, 255, 218, 0.1)",
                  color: "#64ffda",
                  fontSize: "0.75rem",
                  margin: "2px",
                  fontFamily: "Monaco, monospace",
                }}
              />
            ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <IconButton
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "#ccd6f6",
                "&:hover": {
                  color: "#64ffda",
                },
              }}
            >
              <GitHubIcon />
            </IconButton>
            {project.live && (
              <IconButton
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#ccd6f6",
                  "&:hover": {
                    color: "#64ffda",
                  },
                }}
              >
                <LaunchIcon />
              </IconButton>
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box
      id="portfolio"
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
                content: '"02."',
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
            Some Things I've Built
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} lg={6} key={project.title}>
              <ProjectCard project={project} index={index} />
            </Grid>
          ))}
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: "center", marginTop: 6 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: "#64ffda",
                borderColor: "#64ffda",
                padding: "12px 24px",
                fontSize: "1rem",
                fontFamily: "Monaco, monospace",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(100, 255, 218, 0.1)",
                  borderColor: "#64ffda",
                },
              }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              View More Projects
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default PortfolioSection;
