import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  TextField,
  Chip,
  IconButton,
  Alert,
  Link,
} from "@mui/material";
import {
  Edit,
  Save,
  Cancel,
  Add,
  Close,
  FolderOpen,
  Code,
  GitHub,
  Launch,
  Star,
  CalendarToday,
  Group,
  TrendingUp,
  Assignment,
  EmojiEvents,
  GetApp,
  Language,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Projects = () => {
  const { dashboardData, handleEdit } = useOutletContext();
  const data = dashboardData?.projects;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    // Featured Projects
    featuredProjects: data?.featuredProjects || [
      {
        id: 1,
        title: "HealthCare Management System",
        description:
          "A comprehensive healthcare management platform built with Django REST Framework and React. Features patient management, appointment scheduling, medical records, billing system, and real-time notifications. Supports role-based access for doctors, nurses, and administrative staff.",
        category: "Full-Stack Web Application",
        status: "Completed",
        featured: true,
        startDate: "January 2023",
        endDate: "May 2023",
        duration: "5 months",
        teamSize: 4,
        role: "Full-Stack Developer & Team Lead",
        technologies: [
          "Django",
          "React.js",
          "PostgreSQL",
          "Redis",
          "Docker",
          "AWS",
          "Material-UI",
          "REST APIs",
        ],
        features: [
          "Patient registration and profile management",
          "Appointment scheduling with calendar integration",
          "Electronic medical records (EMR) system",
          "Billing and insurance processing",
          "Real-time notifications and messaging",
          "Role-based access control",
          "Report generation and analytics",
          "Mobile-responsive design",
        ],
        achievements: [
          "Reduced appointment scheduling time by 60%",
          "Improved patient satisfaction scores by 35%",
          "Processed 10,000+ patient records",
          "Achieved 99.9% uptime in production",
        ],
        links: {
          github: "https://github.com/nazmulh24/healthcare-management",
          live: "https://healthcare-demo.nazmulhossain.dev",
          documentation: "https://docs.healthcare-demo.nazmulhossain.dev",
        },
        images: [
          "/projects/healthcare/dashboard.png",
          "/projects/healthcare/appointments.png",
          "/projects/healthcare/patient-records.png",
        ],
        challenges:
          "Implementing real-time notifications and ensuring HIPAA compliance for patient data security.",
        impact:
          "Currently used by 3 medical clinics serving 500+ patients monthly.",
      },
      {
        id: 2,
        title: "E-Commerce Platform with AI Recommendations",
        description:
          "Modern e-commerce platform featuring AI-powered product recommendations, advanced search functionality, real-time inventory management, and integrated payment processing. Built with microservices architecture for scalability.",
        category: "E-Commerce & AI",
        status: "In Progress",
        featured: true,
        startDate: "June 2023",
        endDate: "Present",
        duration: "9+ months",
        teamSize: 1,
        role: "Solo Full-Stack Developer",
        technologies: [
          "Django",
          "React.js",
          "TensorFlow",
          "MongoDB",
          "Redis",
          "Stripe API",
          "Elasticsearch",
          "Docker",
        ],
        features: [
          "AI-powered product recommendations",
          "Advanced search with filters and sorting",
          "Real-time inventory management",
          "Multi-vendor marketplace support",
          "Integrated payment processing",
          "Order tracking and management",
          "Customer reviews and ratings",
          "Admin dashboard with analytics",
        ],
        achievements: [
          "Implemented ML recommendation engine with 85% accuracy",
          "Achieved sub-200ms search response time",
          "Processed 1,000+ test transactions",
          "Built scalable microservices architecture",
        ],
        links: {
          github: "https://github.com/nazmulh24/ecommerce-ai",
          live: "https://ecommerce-demo.nazmulhossain.dev",
          api: "https://api.ecommerce-demo.nazmulhossain.dev/docs",
        },
        images: [
          "/projects/ecommerce/homepage.png",
          "/projects/ecommerce/products.png",
          "/projects/ecommerce/recommendations.png",
        ],
        challenges:
          "Implementing scalable recommendation algorithms and handling real-time inventory updates across multiple vendors.",
        impact:
          "Demo platform showcasing modern e-commerce capabilities with AI integration.",
      },
    ],

    // Academic Projects
    academicProjects: data?.academicProjects || [
      {
        id: 1,
        title: "Machine Learning-Based Disease Prediction System",
        description:
          "Undergraduate thesis project developing ML models for early disease detection using clinical datasets. Implemented multiple algorithms including Random Forest, SVM, and Neural Networks.",
        category: "Machine Learning & Healthcare",
        course: "Final Year Thesis",
        institution: "NITER",
        year: "2022",
        grade: "A+",
        supervisor: "Dr. Md. Abdul Rahman",
        teamSize: 1,
        technologies: [
          "Python",
          "TensorFlow",
          "Pandas",
          "Scikit-learn",
          "Matplotlib",
          "Jupyter",
          "NumPy",
        ],
        features: [
          "Data preprocessing and feature engineering",
          "Multiple ML algorithm implementation",
          "Model comparison and evaluation",
          "Interactive prediction interface",
          "Statistical analysis and visualization",
          "Performance metrics calculation",
        ],
        achievements: [
          "Achieved 94% prediction accuracy",
          "Published in IEEE conference",
          "Won Best Thesis Award",
          "Cited by 5+ research papers",
        ],
        links: {
          github: "https://github.com/nazmulh24/disease-prediction-ml",
          paper: "https://papers.nazmulhossain.dev/disease-prediction.pdf",
          presentation: "https://slides.nazmulhossain.dev/thesis-defense",
        },
        impact:
          "Research contributes to early disease detection methodology in healthcare AI.",
      },
      {
        id: 2,
        title: "University Student Management System",
        description:
          "Comprehensive web application for managing university operations including student enrollment, course management, grade tracking, and administrative functions.",
        category: "Web Development",
        course: "Software Engineering",
        institution: "NITER",
        year: "2021",
        grade: "A",
        teamSize: 4,
        role: "Frontend Developer & UI/UX Designer",
        technologies: [
          "React.js",
          "Node.js",
          "Express",
          "MongoDB",
          "Bootstrap",
          "Chart.js",
        ],
        features: [
          "Student registration and profile management",
          "Course enrollment and scheduling",
          "Grade management and transcript generation",
          "Fee payment and financial tracking",
          "Administrative dashboard",
          "Report generation",
        ],
        achievements: [
          "Delivered 2 weeks ahead of schedule",
          "Received highest grade in class",
          "Adopted by university for internal testing",
          "Positive feedback from 50+ student testers",
        ],
        links: {
          github: "https://github.com/nazmulh24/university-management",
          demo: "https://university-demo.nazmulhossain.dev",
        },
        impact:
          "Provided efficient solution for university administrative processes.",
      },
    ],

    // Personal Projects
    personalProjects: data?.personalProjects || [
      {
        id: 1,
        title: "Personal Portfolio Website",
        description:
          "Modern, responsive portfolio website showcasing projects, skills, and professional experience. Features 3D animations, dark theme, and comprehensive dashboard for content management.",
        category: "Portfolio & Web Development",
        status: "Completed",
        startDate: "August 2023",
        endDate: "September 2023",
        technologies: [
          "React.js",
          "Django REST Framework",
          "Three.js",
          "Material-UI",
          "Framer Motion",
          "PostgreSQL",
        ],
        features: [
          "3D animated background",
          "Responsive design",
          "Content management dashboard",
          "Blog system",
          "Contact form with email integration",
          "SEO optimization",
          "Performance optimization",
        ],
        achievements: [
          "Achieved 95+ Google PageSpeed score",
          "Fully responsive across all devices",
          "Integrated comprehensive CMS",
          "Professional design with smooth animations",
        ],
        links: {
          github: "https://github.com/nazmulh24/portfolio-website",
          live: "https://nazmulhossain.dev",
        },
        impact:
          "Professional online presence showcasing technical skills and projects.",
      },
      {
        id: 2,
        title: "Task Management Application",
        description:
          "Productivity application with task organization, project management, team collaboration, and progress tracking features. Built with modern web technologies.",
        category: "Productivity & Collaboration",
        status: "In Progress",
        startDate: "July 2023",
        endDate: "Present",
        technologies: [
          "React.js",
          "Node.js",
          "Express",
          "MongoDB",
          "Socket.io",
          "Material-UI",
        ],
        features: [
          "Task creation and organization",
          "Project management with timelines",
          "Team collaboration tools",
          "Real-time updates",
          "Progress tracking and analytics",
          "Calendar integration",
          "File attachments and comments",
        ],
        achievements: [
          "Real-time collaboration implementation",
          "Intuitive user interface design",
          "Scalable backend architecture",
          "Mobile-responsive design",
        ],
        links: {
          github: "https://github.com/nazmulh24/task-management",
          demo: "https://tasks-demo.nazmulhossain.dev",
        },
        impact:
          "Streamlines project management and team collaboration workflows.",
      },
    ],

    // Open Source Contributions
    openSourceProjects: data?.openSourceProjects || [
      {
        id: 1,
        title: "Django REST Framework Utils",
        description:
          "A collection of utility functions and custom serializers for Django REST Framework to simplify common development tasks.",
        category: "Open Source Library",
        status: "Active",
        role: "Maintainer & Contributor",
        technologies: ["Python", "Django", "Django REST Framework"],
        contributions: [
          "Created custom pagination classes",
          "Implemented advanced filtering utilities",
          "Added comprehensive test coverage",
          "Wrote detailed documentation",
        ],
        stats: {
          stars: 45,
          forks: 12,
          downloads: "2,500+",
          contributors: 6,
        },
        links: {
          github: "https://github.com/nazmulh24/drf-utils",
          pypi: "https://pypi.org/project/drf-utils-nazmul/",
          docs: "https://drf-utils.readthedocs.io/",
        },
        impact: "Helps Django developers streamline API development processes.",
      },
      {
        id: 2,
        title: "React Component Library",
        description:
          "Reusable React components library with Material Design principles, TypeScript support, and comprehensive Storybook documentation.",
        category: "Component Library",
        status: "Active",
        role: "Creator & Maintainer",
        technologies: ["React", "TypeScript", "Storybook", "Material-UI"],
        contributions: [
          "Designed 20+ reusable components",
          "Implemented TypeScript definitions",
          "Created Storybook documentation",
          "Set up automated testing pipeline",
        ],
        stats: {
          stars: 28,
          forks: 8,
          downloads: "1,200+",
          contributors: 3,
        },
        links: {
          github: "https://github.com/nazmulh24/react-components",
          npm: "https://www.npmjs.com/package/@nazmulh24/react-components",
          storybook: "https://components.nazmulhossain.dev",
        },
        impact:
          "Accelerates React development with pre-built, tested components.",
      },
    ],

    // Project Categories
    projectCategories: data?.projectCategories || [
      "Full-Stack Web Applications",
      "Machine Learning & AI",
      "E-Commerce Solutions",
      "Healthcare Technology",
      "Educational Platforms",
      "Portfolio & Personal",
      "Open Source Libraries",
      "Mobile Applications",
      "Data Analytics",
      "API Development",
    ],

    // Technologies Used Across Projects
    technologiesUsed: data?.technologiesUsed || [
      "Python",
      "JavaScript",
      "React.js",
      "Django",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "TensorFlow",
      "Docker",
      "AWS",
      "Git",
      "Material-UI",
      "Express.js",
      "Redis",
      "Elasticsearch",
      "Three.js",
      "TypeScript",
    ],

    // Project Statistics
    projectStats: data?.projectStats || {
      totalProjects: 15,
      completedProjects: 10,
      inProgressProjects: 5,
      githubStars: 120,
      githubForks: 35,
      totalDownloads: "5,000+",
      contributorsMentored: 8,
    },
  });

  const [saveAlert, setSaveAlert] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [newTechnology, setNewTechnology] = useState("");

  const handleSave = () => {
    if (handleEdit) {
      handleEdit("projects", editedData);
    }
    setIsEditing(false);
    setSaveAlert({
      type: "success",
      message: "Projects section updated successfully!",
    });
    setTimeout(() => setSaveAlert(null), 3000);
  };

  const handleCancel = () => {
    setEditedData({
      featuredProjects: data?.featuredProjects || [],
      academicProjects: data?.academicProjects || [],
      personalProjects: data?.personalProjects || [],
      openSourceProjects: data?.openSourceProjects || [],
      projectCategories: data?.projectCategories || [],
      technologiesUsed: data?.technologiesUsed || [],
      projectStats: data?.projectStats || {},
    });
    setIsEditing(false);
  };

  const addCategory = () => {
    if (newCategory.trim() && editedData.projectCategories.length < 15) {
      setEditedData((prev) => ({
        ...prev,
        projectCategories: [...prev.projectCategories, newCategory.trim()],
      }));
      setNewCategory("");
    }
  };

  const removeCategory = (index) => {
    setEditedData((prev) => ({
      ...prev,
      projectCategories: prev.projectCategories.filter((_, i) => i !== index),
    }));
  };

  const addTechnology = () => {
    if (newTechnology.trim() && editedData.technologiesUsed.length < 25) {
      setEditedData((prev) => ({
        ...prev,
        technologiesUsed: [...prev.technologiesUsed, newTechnology.trim()],
      }));
      setNewTechnology("");
    }
  };

  const removeTechnology = (index) => {
    setEditedData((prev) => ({
      ...prev,
      technologiesUsed: prev.technologiesUsed.filter((_, i) => i !== index),
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Reusable Project Card Component
  const ProjectCard = ({
    icon,
    title,
    description,
    children,
    hover = true,
  }) => (
    <Card
      sx={{
        backgroundColor: "transparent",
        border: "1px solid #444",
        borderRadius: 5,
        p: 4,
        mb: 3,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(5px)",
        ...(hover && {
          "&:hover": {
            borderColor: "#4CAF50",
            transition: "border-color 0.3s ease",
          },
        }),
      }}
    >
      {(icon || title || description) && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          {icon &&
            React.cloneElement(icon, {
              sx: { color: "#4CAF50", mr: 2, fontSize: 28 },
            })}
          <Box>
            {title && (
              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                {title}
              </Typography>
            )}
            {description && (
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                {description}
              </Typography>
            )}
          </Box>
        </Box>
      )}
      {children}
    </Card>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ paddingBottom: "2rem" }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 600 }}>
          Projects Section
        </Typography>
        <Typography variant="body1" sx={{ color: "#888" }}>
          Showcase your projects, technical achievements, and development
          portfolio
        </Typography>
      </Box>

      {saveAlert && (
        <motion.div variants={itemVariants}>
          <Alert
            severity={saveAlert.type}
            sx={{
              mb: 3,
              backgroundColor:
                saveAlert.type === "success"
                  ? "rgba(46, 125, 50, 0.1)"
                  : "rgba(211, 47, 47, 0.1)",
              color: "#fff",
              border: `1px solid ${
                saveAlert.type === "success" ? "#4CAF50" : "#f44336"
              }`,
              borderRadius: 2,
              backdropFilter: "blur(10px)",
            }}
          >
            {saveAlert.message}
          </Alert>
        </motion.div>
      )}

      {/* Header with Edit Controls */}
      <motion.div variants={itemVariants}>
        <ProjectCard hover={false}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                Projects Section Management
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Comprehensive project portfolio and technical achievements
              </Typography>
            </Box>

            {!isEditing ? (
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setIsEditing(true)}
                sx={{
                  borderColor: "#4CAF50",
                  color: "#4CAF50",
                  borderWidth: 2,
                  borderRadius: 2,
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#66BB6A",
                    backgroundColor: "rgba(76, 175, 80, 0.1)",
                    borderWidth: 2,
                  },
                }}
              >
                Edit Projects
              </Button>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  sx={{
                    backgroundColor: "#4CAF50",
                    borderRadius: 2,
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#45a049" },
                  }}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={handleCancel}
                  sx={{
                    borderColor: "#666",
                    color: "#666",
                    borderRadius: 2,
                    "&:hover": {
                      borderColor: "#888",
                      backgroundColor: "rgba(102, 102, 102, 0.1)",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
        </ProjectCard>
      </motion.div>

      {/* Project Statistics Overview */}
      <motion.div variants={itemVariants}>
        <ProjectCard
          icon={<TrendingUp />}
          title="Project Statistics"
          description="Overview of project portfolio metrics and achievements"
        >
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#4CAF50", fontWeight: 700 }}
                >
                  {editedData.projectStats.totalProjects}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Total Projects
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#2196F3", fontWeight: 700 }}
                >
                  {editedData.projectStats.completedProjects}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Completed
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#FF9800", fontWeight: 700 }}
                >
                  {editedData.projectStats.githubStars}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  GitHub Stars
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#9C27B0", fontWeight: 700 }}
                >
                  {editedData.projectStats.totalDownloads}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Downloads
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </ProjectCard>
      </motion.div>

      {/* Featured Projects Section */}
      <motion.div variants={itemVariants}>
        <ProjectCard
          icon={<Star />}
          title="Featured Projects"
          description="Highlighted projects showcasing technical expertise and impact"
        >
          {editedData.featuredProjects.map((project, index) => (
            <Box
              key={project.id}
              sx={{
                mb: 4,
                p: 3,
                backgroundColor: "rgba(76, 175, 80, 0.05)",
                border: "1px solid rgba(76, 175, 80, 0.2)",
                borderRadius: 3,
                position: "relative",
              }}
            >
              {/* Project Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", fontWeight: 600, mb: 1 }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#4CAF50", fontWeight: 500, mb: 1 }}
                  >
                    {project.category}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      flexWrap: "wrap",
                      mb: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CalendarToday
                        sx={{ color: "#888", mr: 1, fontSize: 16 }}
                      />
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        {project.startDate} - {project.endDate}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Group sx={{ color: "#888", mr: 1, fontSize: 16 }} />
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        Team: {project.teamSize}{" "}
                        {project.teamSize === 1 ? "member" : "members"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Chip
                    label={project.status}
                    size="small"
                    sx={{
                      backgroundColor:
                        project.status === "Completed"
                          ? "rgba(76, 175, 80, 0.2)"
                          : "rgba(33, 150, 243, 0.2)",
                      color:
                        project.status === "Completed" ? "#4CAF50" : "#2196F3",
                      fontWeight: 600,
                      mb: 1,
                    }}
                  />
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {project.role}
                  </Typography>
                </Box>
              </Box>

              {/* Project Description */}
              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 3 }}
              >
                {project.description}
              </Typography>

              {/* Key Features */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#4CAF50", mb: 2, fontWeight: 600 }}
                >
                  Key Features
                </Typography>
                <Grid container spacing={1}>
                  {project.features.slice(0, 6).map((feature, idx) => (
                    <Grid item xs={12} sm={6} key={idx}>
                      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                        <Assignment
                          sx={{
                            color: "#4CAF50",
                            mr: 1,
                            fontSize: 16,
                            mt: 0.5,
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: "#fff", lineHeight: 1.5 }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Technologies */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#4CAF50", mb: 1, fontWeight: 600 }}
                >
                  Technologies Used
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {project.technologies.map((tech, idx) => (
                    <Chip
                      key={idx}
                      label={tech}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(33, 150, 243, 0.2)",
                        color: "#2196F3",
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Achievements */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#4CAF50", mb: 2, fontWeight: 600 }}
                >
                  Key Achievements
                </Typography>
                <Grid container spacing={1}>
                  {project.achievements.map((achievement, idx) => (
                    <Grid item xs={12} sm={6} key={idx}>
                      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                        <EmojiEvents
                          sx={{
                            color: "#FFC107",
                            mr: 1,
                            fontSize: 16,
                            mt: 0.5,
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: "#fff", lineHeight: 1.5 }}
                        >
                          {achievement}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Project Links */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#4CAF50", mb: 1, fontWeight: 600 }}
                >
                  Project Links
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {project.links.github && (
                    <Chip
                      icon={<GitHub />}
                      label="Source Code"
                      component={Link}
                      href={project.links.github}
                      target="_blank"
                      clickable
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                        },
                      }}
                    />
                  )}
                  {project.links.live && (
                    <Chip
                      icon={<Launch />}
                      label="Live Demo"
                      component={Link}
                      href={project.links.live}
                      target="_blank"
                      clickable
                      sx={{
                        backgroundColor: "rgba(76, 175, 80, 0.2)",
                        color: "#4CAF50",
                        "&:hover": {
                          backgroundColor: "rgba(76, 175, 80, 0.3)",
                        },
                      }}
                    />
                  )}
                  {project.links.documentation && (
                    <Chip
                      icon={<Assignment />}
                      label="Documentation"
                      component={Link}
                      href={project.links.documentation}
                      target="_blank"
                      clickable
                      sx={{
                        backgroundColor: "rgba(33, 150, 243, 0.2)",
                        color: "#2196F3",
                        "&:hover": {
                          backgroundColor: "rgba(33, 150, 243, 0.3)",
                        },
                      }}
                    />
                  )}
                </Box>
              </Box>

              {/* Impact & Challenges */}
              {(project.impact || project.challenges) && (
                <Box>
                  {project.challenges && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "#FF9800", mb: 1, fontWeight: 600 }}
                      >
                        Technical Challenges
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", lineHeight: 1.5 }}
                      >
                        {project.challenges}
                      </Typography>
                    </Box>
                  )}
                  {project.impact && (
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "#9C27B0", mb: 1, fontWeight: 600 }}
                      >
                        Impact & Usage
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", lineHeight: 1.5 }}
                      >
                        {project.impact}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          ))}
        </ProjectCard>
      </motion.div>

      {/* Academic Projects Section */}
      <motion.div variants={itemVariants}>
        <ProjectCard
          icon={<Assignment />}
          title="Academic Projects"
          description="University coursework, thesis projects, and research implementations"
        >
          {editedData.academicProjects.map((project, index) => (
            <Box
              key={project.id}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "rgba(156, 39, 176, 0.05)",
                border: "1px solid rgba(156, 39, 176, 0.2)",
                borderRadius: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", fontWeight: 600, mb: 1 }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#9C27B0", fontWeight: 500, mb: 1 }}
                  >
                    {project.course} • {project.institution}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888", mb: 1 }}>
                    Year: {project.year} • Grade: {project.grade}
                  </Typography>
                  {project.supervisor && (
                    <Typography variant="body2" sx={{ color: "#888", mb: 1 }}>
                      Supervisor: {project.supervisor}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Chip
                    label={project.category}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(156, 39, 176, 0.2)",
                      color: "#9C27B0",
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {project.description}
              </Typography>

              {/* Technologies */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#9C27B0", mb: 1, fontWeight: 600 }}
                >
                  Technologies Used
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {project.technologies.map((tech, idx) => (
                    <Chip
                      key={idx}
                      label={tech}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(156, 39, 176, 0.2)",
                        color: "#9C27B0",
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Achievements */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#9C27B0", mb: 1, fontWeight: 600 }}
                >
                  Achievements
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {project.achievements.map((achievement, idx) => (
                    <Box
                      key={idx}
                      sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                    >
                      <EmojiEvents
                        sx={{ color: "#FFC107", mr: 2, fontSize: 16, mt: 0.5 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", lineHeight: 1.5 }}
                      >
                        {achievement}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Links */}
              {project.links && (
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#9C27B0", mb: 1, fontWeight: 600 }}
                  >
                    Project Resources
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {project.links.github && (
                      <Chip
                        icon={<GitHub />}
                        label="Source Code"
                        component={Link}
                        href={project.links.github}
                        target="_blank"
                        clickable
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                          },
                        }}
                      />
                    )}
                    {project.links.paper && (
                      <Chip
                        icon={<Assignment />}
                        label="Research Paper"
                        component={Link}
                        href={project.links.paper}
                        target="_blank"
                        clickable
                        sx={{
                          backgroundColor: "rgba(156, 39, 176, 0.2)",
                          color: "#9C27B0",
                          "&:hover": {
                            backgroundColor: "rgba(156, 39, 176, 0.3)",
                          },
                        }}
                      />
                    )}
                    {project.links.demo && (
                      <Chip
                        icon={<Launch />}
                        label="Demo"
                        component={Link}
                        href={project.links.demo}
                        target="_blank"
                        clickable
                        sx={{
                          backgroundColor: "rgba(76, 175, 80, 0.2)",
                          color: "#4CAF50",
                          "&:hover": {
                            backgroundColor: "rgba(76, 175, 80, 0.3)",
                          },
                        }}
                      />
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </ProjectCard>
      </motion.div>

      {/* Open Source Projects Section */}
      <motion.div variants={itemVariants}>
        <ProjectCard
          icon={<Code />}
          title="Open Source Contributions"
          description="Community projects, libraries, and collaborative development"
        >
          {editedData.openSourceProjects.map((project, index) => (
            <Box
              key={project.id}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "rgba(255, 152, 0, 0.05)",
                border: "1px solid rgba(255, 152, 0, 0.2)",
                borderRadius: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", fontWeight: 600, mb: 1 }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#FF9800", fontWeight: 500, mb: 1 }}
                  >
                    {project.category} • {project.role}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Chip
                    label={project.status}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(76, 175, 80, 0.2)",
                      color: "#4CAF50",
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {project.description}
              </Typography>

              {/* Project Stats */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#FF9800", mb: 1, fontWeight: 600 }}
                >
                  Project Statistics
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h6" sx={{ color: "#FFC107" }}>
                        ⭐ {project.stats.stars}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#888" }}>
                        Stars
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h6" sx={{ color: "#2196F3" }}>
                        🍴 {project.stats.forks}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#888" }}>
                        Forks
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h6" sx={{ color: "#4CAF50" }}>
                        📦 {project.stats.downloads}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#888" }}>
                        Downloads
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h6" sx={{ color: "#9C27B0" }}>
                        👥 {project.stats.contributors}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#888" }}>
                        Contributors
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* Contributions */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#FF9800", mb: 1, fontWeight: 600 }}
                >
                  Key Contributions
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {project.contributions.map((contribution, idx) => (
                    <Box
                      key={idx}
                      sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                    >
                      <Code
                        sx={{ color: "#FF9800", mr: 2, fontSize: 16, mt: 0.5 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", lineHeight: 1.5 }}
                      >
                        {contribution}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Links */}
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#FF9800", mb: 1, fontWeight: 600 }}
                >
                  Project Links
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {project.links.github && (
                    <Chip
                      icon={<GitHub />}
                      label="GitHub"
                      component={Link}
                      href={project.links.github}
                      target="_blank"
                      clickable
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                        },
                      }}
                    />
                  )}
                  {project.links.npm && (
                    <Chip
                      icon={<GetApp />}
                      label="NPM"
                      component={Link}
                      href={project.links.npm}
                      target="_blank"
                      clickable
                      sx={{
                        backgroundColor: "rgba(255, 87, 34, 0.2)",
                        color: "#FF5722",
                        "&:hover": {
                          backgroundColor: "rgba(255, 87, 34, 0.3)",
                        },
                      }}
                    />
                  )}
                  {project.links.pypi && (
                    <Chip
                      icon={<GetApp />}
                      label="PyPI"
                      component={Link}
                      href={project.links.pypi}
                      target="_blank"
                      clickable
                      sx={{
                        backgroundColor: "rgba(255, 87, 34, 0.2)",
                        color: "#FF5722",
                        "&:hover": {
                          backgroundColor: "rgba(255, 87, 34, 0.3)",
                        },
                      }}
                    />
                  )}
                  {project.links.docs && (
                    <Chip
                      icon={<Assignment />}
                      label="Documentation"
                      component={Link}
                      href={project.links.docs}
                      target="_blank"
                      clickable
                      sx={{
                        backgroundColor: "rgba(33, 150, 243, 0.2)",
                        color: "#2196F3",
                        "&:hover": {
                          backgroundColor: "rgba(33, 150, 243, 0.3)",
                        },
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </ProjectCard>
      </motion.div>

      {/* Project Categories Section */}
      <motion.div variants={itemVariants}>
        <ProjectCard
          icon={<FolderOpen />}
          title="Project Categories"
          description="Areas of expertise and project focus domains"
        >
          <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
            Max 15 project categories
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {editedData.projectCategories.map((category, index) => (
              <Chip
                key={index}
                label={category}
                onDelete={isEditing ? () => removeCategory(index) : undefined}
                deleteIcon={isEditing ? <Close /> : undefined}
                sx={{
                  backgroundColor: "rgba(103, 58, 183, 0.2)",
                  color: "#673AB7",
                  border: "1px solid rgba(103, 58, 183, 0.5)",
                  fontWeight: 600,
                  "& .MuiChip-deleteIcon": {
                    color: "#673AB7",
                    "&:hover": { color: "#9575CD" },
                  },
                }}
              />
            ))}
          </Box>

          {isEditing && editedData.projectCategories.length < 15 && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Add new project category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addCategory()}
                sx={{
                  flexGrow: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(15, 15, 15, 0.6)",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#444" },
                    "&:hover fieldset": { borderColor: "#4CAF50" },
                    "&.Mui-focused fieldset": { borderColor: "#4CAF50" },
                  },
                  "& .MuiInputBase-input": { color: "#fff" },
                }}
              />
              <IconButton
                onClick={addCategory}
                disabled={!newCategory.trim()}
                sx={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#45a049" },
                  "&:disabled": { backgroundColor: "#333", color: "#666" },
                }}
              >
                <Add />
              </IconButton>
            </Box>
          )}
        </ProjectCard>
      </motion.div>

      {/* Technologies Used Section */}
      <motion.div variants={itemVariants}>
        <ProjectCard
          icon={<Language />}
          title="Technologies Used"
          description="Programming languages, frameworks, and tools across all projects"
        >
          <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
            Max 25 technologies
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {editedData.technologiesUsed.map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                onDelete={isEditing ? () => removeTechnology(index) : undefined}
                deleteIcon={isEditing ? <Close /> : undefined}
                sx={{
                  backgroundColor: "rgba(0, 150, 136, 0.2)",
                  color: "#009688",
                  border: "1px solid rgba(0, 150, 136, 0.5)",
                  fontWeight: 600,
                  "& .MuiChip-deleteIcon": {
                    color: "#009688",
                    "&:hover": { color: "#4DB6AC" },
                  },
                }}
              />
            ))}
          </Box>

          {isEditing && editedData.technologiesUsed.length < 25 && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Add new technology"
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTechnology()}
                sx={{
                  flexGrow: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(15, 15, 15, 0.6)",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#444" },
                    "&:hover fieldset": { borderColor: "#4CAF50" },
                    "&.Mui-focused fieldset": { borderColor: "#4CAF50" },
                  },
                  "& .MuiInputBase-input": { color: "#fff" },
                }}
              />
              <IconButton
                onClick={addTechnology}
                disabled={!newTechnology.trim()}
                sx={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#45a049" },
                  "&:disabled": { backgroundColor: "#333", color: "#666" },
                }}
              >
                <Add />
              </IconButton>
            </Box>
          )}
        </ProjectCard>
      </motion.div>
    </motion.div>
  );
};

export default Projects;
