import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Chip,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Launch,
  Code,
  Web,
  Storage,
  School,
  Work,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { portfolioAPI, projectsAPI, blogAPI } from "../services/api.js";

const Home = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [skills, setSkills] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          personalResponse,
          skillsResponse,
          projectsResponse,
          postsResponse,
        ] = await Promise.all([
          portfolioAPI.getPersonalInfo().catch(() => ({ data: null })),
          portfolioAPI.getSkills().catch(() => ({ data: [] })),
          projectsAPI.getFeaturedProjects().catch(() => ({ data: [] })),
          blogAPI.getRecentPosts().catch(() => ({ data: [] })),
        ]);

        setPersonalInfo(personalResponse.data);
        setSkills(skillsResponse.data.slice(0, 8)); // Show top 8 skills
        setFeaturedProjects(projectsResponse.data.slice(0, 3)); // Show top 3 projects
        setRecentPosts(postsResponse.data.slice(0, 3)); // Show top 3 posts
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="spinner"></div>
      </Box>
    );
  }

  return (
    <Box sx={{ pt: 8 }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div initial="hidden" animate="visible" variants={heroVariants}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h5"
              sx={{
                color: "#64ffda",
                mb: 2,
                fontFamily: "Fira Code, monospace",
              }}
            >
              Hi, my name is
            </Typography>
            <Typography
              variant={isMobile ? "h3" : "h1"}
              sx={{
                color: "#ccd6f6",
                fontWeight: "bold",
                mb: 2,
                lineHeight: 1.1,
              }}
            >
              {personalInfo?.name || "Nazmul Hossain"}
            </Typography>
            <Typography
              variant={isMobile ? "h4" : "h2"}
              sx={{
                color: "#8892b0",
                mb: 4,
                fontWeight: 600,
              }}
            >
              {personalInfo?.title || "Software Engineer & Researcher"}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#8892b0",
                mb: 6,
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              {personalInfo?.bio ||
                "I specialize in building exceptional digital experiences with Django backend and React frontend. Passionate about research and exploring cutting-edge technologies."}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/portfolio"
                sx={{
                  color: "#64ffda",
                  borderColor: "#64ffda",
                  "&:hover": {
                    backgroundColor: "rgba(100, 255, 218, 0.1)",
                    borderColor: "#64ffda",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                  px: 4,
                  py: 1.5,
                }}
              >
                View My Work
              </Button>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/contact"
                sx={{
                  backgroundColor: "#64ffda",
                  color: "#0a192f",
                  "&:hover": {
                    backgroundColor: "#4fd1c7",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                  px: 4,
                  py: 1.5,
                }}
              >
                Get In Touch
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>

      {/* Skills Section */}
      {skills.length > 0 && (
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <Typography
              variant="h3"
              align="center"
              sx={{
                color: "#ccd6f6",
                mb: 6,
                fontWeight: "bold",
              }}
            >
              Technologies I Work With
            </Typography>

            <Grid container spacing={3}>
              {skills.map((skill, index) => (
                <Grid item xs={6} md={3} key={skill.id}>
                  <motion.div variants={itemVariants}>
                    <Paper
                      sx={{
                        p: 3,
                        textAlign: "center",
                        backgroundColor: "#112240",
                        border: "1px solid rgba(100, 255, 218, 0.1)",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          borderColor: "#64ffda",
                        },
                        transition: "all 0.3s ease",
                        height: "100%",
                      }}
                    >
                      <Box sx={{ mb: 2 }}>
                        {skill.category === "backend" && (
                          <Storage sx={{ fontSize: 40, color: "#64ffda" }} />
                        )}
                        {skill.category === "frontend" && (
                          <Web sx={{ fontSize: 40, color: "#64ffda" }} />
                        )}
                        {skill.category === "database" && (
                          <Storage sx={{ fontSize: 40, color: "#64ffda" }} />
                        )}
                        {!["backend", "frontend", "database"].includes(
                          skill.category
                        ) && <Code sx={{ fontSize: 40, color: "#64ffda" }} />}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#ccd6f6",
                          mb: 1,
                          fontWeight: "bold",
                        }}
                      >
                        {skill.name}
                      </Typography>
                      <Chip
                        label={`${skill.proficiency}%`}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(100, 255, 218, 0.1)",
                          color: "#64ffda",
                        }}
                      />
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      )}

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <Typography
              variant="h3"
              align="center"
              sx={{
                color: "#ccd6f6",
                mb: 6,
                fontWeight: "bold",
              }}
            >
              Featured Projects
            </Typography>

            <Grid container spacing={4}>
              {featuredProjects.map((project, index) => (
                <Grid item xs={12} md={4} key={project.id}>
                  <motion.div variants={itemVariants}>
                    <Card
                      sx={{
                        backgroundColor: "#112240",
                        border: "1px solid rgba(100, 255, 218, 0.1)",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          borderColor: "#64ffda",
                        },
                        transition: "all 0.3s ease",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {project.featured_image && (
                        <CardMedia
                          component="img"
                          height="200"
                          image={project.featured_image}
                          alt={project.title}
                        />
                      )}
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#ccd6f6",
                            mb: 2,
                            fontWeight: "bold",
                          }}
                        >
                          {project.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#8892b0",
                            mb: 3,
                            lineHeight: 1.6,
                          }}
                        >
                          {project.short_description}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            mb: 3,
                          }}
                        >
                          {project.technologies?.slice(0, 3).map((tech) => (
                            <Chip
                              key={tech.id}
                              label={tech.name}
                              size="small"
                              sx={{
                                backgroundColor: "rgba(100, 255, 218, 0.1)",
                                color: "#64ffda",
                              }}
                            />
                          ))}
                        </Box>

                        <Box sx={{ display: "flex", gap: 1 }}>
                          {project.github_url && (
                            <Button
                              size="small"
                              startIcon={<GitHub />}
                              href={project.github_url}
                              target="_blank"
                              sx={{ color: "#8892b0" }}
                            >
                              Code
                            </Button>
                          )}
                          {project.demo_url && (
                            <Button
                              size="small"
                              startIcon={<Launch />}
                              href={project.demo_url}
                              target="_blank"
                              sx={{ color: "#64ffda" }}
                            >
                              Demo
                            </Button>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button
                variant="outlined"
                component={Link}
                to="/portfolio"
                sx={{
                  color: "#64ffda",
                  borderColor: "#64ffda",
                  "&:hover": {
                    backgroundColor: "rgba(100, 255, 218, 0.1)",
                  },
                }}
              >
                View All Projects
              </Button>
            </Box>
          </motion.div>
        </Container>
      )}

      {/* Call to Action */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <Paper
            sx={{
              p: 6,
              textAlign: "center",
              backgroundColor: "#112240",
              border: "1px solid rgba(100, 255, 218, 0.2)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#ccd6f6",
                mb: 3,
                fontWeight: "bold",
              }}
            >
              Let's Work Together
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#8892b0",
                mb: 4,
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              I'm always interested in new opportunities and exciting projects.
              Whether you have a question or just want to say hi, I'll get back
              to you!
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/contact"
              sx={{
                backgroundColor: "#64ffda",
                color: "#0a192f",
                "&:hover": {
                  backgroundColor: "#4fd1c7",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
                px: 4,
                py: 1.5,
              }}
            >
              Say Hello
            </Button>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;
