import React, { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Chip,
  Stack,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  Switch,
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  GitHub,
  Launch,
  Dataset,
  Code,
  VideoLibrary,
  Search,
  FilterList,
} from "@mui/icons-material";

const Projects = () => {
  const outlet = useOutletContext?.() || {};
  const { handleEdit, handleDelete } = outlet;

  // Sample projects data
  const projects = useMemo(() => {
    return [
      {
        id: "birth-asphyxia",
        title: "Birth Asphyxia Detection Using Hybrid CNN",
        description:
          "A machine learning approach using Mel Frequency Cepstral Coefficients (MFCCs) and deep learning models to detect birth asphyxia in newborns through infant cry analysis. This research achieved 90.16% accuracy using Logistic Regression and demonstrated the potential for early detection systems in clinical settings.",
        technologies: ["Python", "TensorFlow", "CNN", "Signal Processing"],
        category: "AI/ML",
        timeline: "9/4/2025 - 10/3/2025",
        status: "completed",
        progress: 100,
        showInPortfolio: true,
        links: {
          github: "https://github.com/nazmulh24/birth-asphyxia-detection",
          live: "https://birth-asphyxia-demo.vercel.app",
          paper: null,
          dataset: "https://kaggle.com/datasets/birth-asphyxia",
          notebook: "https://colab.research.google.com/drive/example",
          video: null,
        },
      },
      {
        id: "hybrid-cnn",
        title: "Using Hybrid CNN",
        description:
          "Exploring the latest developments in machine learning applications for healthcare, from diagnostic tools to personalized treatment plans. This comprehensive analysis covers current implementations and future possibilities.",
        technologies: ["Python", "TensorFlow", "CNN", "Signal Processing"],
        category: "Research",
        timeline: "9/10/2025 - 10/3/2025",
        status: "in-progress",
        progress: 68,
        showInPortfolio: false,
        links: {
          github: "https://github.com/nazmulh24/birth-asphyxia-detection",
          live: "https://birth-asphyxia-demo.vercel.app",
          paper: "https://example.com/research-paper",
        },
      },
      {
        id: "birth-asphyxia-detection-2",
        title: "Birth Asphyxia Detection Using Hybrid CNN",
        description:
          "A machine learning approach using Mel Frequency Cepstral Coefficients (MFCCs) and deep learning models to detect birth asphyxia in newborns through infant cry analysis. This research achieved 90.16% accuracy using Logistic Regression and demonstrated the potential for early detection systems in clinical settings.",
        technologies: ["Python", "TensorFlow", "CNN", "Signal Processing"],
        category: "AI/ML",
        timeline: "9/4/2025 - 10/3/2025",
        status: "completed",
        progress: 100,
        showInPortfolio: true,
        links: {
          github: "https://github.com/nazmulh24/birth-asphyxia-detection",
          live: "https://birth-asphyxia-demo.vercel.app",
          paper: "https://example.com/research-paper",
        },
      },
      {
        id: "birth-asphyxia-detection-3",
        title: "Birth Asphyxia Detection Using Hybrid CNN",
        description:
          "A machine learning approach using Mel Frequency Cepstral Coefficients (MFCCs) and deep learning models to detect birth asphyxia in newborns through infant cry analysis. This research achieved 90.16% accuracy using Logistic Regression and demonstrated the potential for early detection systems in clinical settings.",
        technologies: ["Python", "TensorFlow", "CNN", "Signal Processing"],
        category: "Deep Learning",
        timeline: "9/4/2025 - 10/3/2025",
        status: "completed",
        progress: 100,
        showInPortfolio: false,
        links: {
          github: "https://github.com/nazmulh24/birth-asphyxia-detection",
          live: "https://birth-asphyxia-demo.vercel.app",
          paper: "https://example.com/research-paper",
        },
      },
    ];
  }, []);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [portfolioFilter, setPortfolioFilter] = useState("all");

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projects.map((p) => p.category))];
    return uniqueCategories;
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        categoryFilter === "all" || project.category === categoryFilter;
      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;
      const matchesPortfolio =
        portfolioFilter === "all" ||
        (portfolioFilter === "public" && project.showInPortfolio) ||
        (portfolioFilter === "private" && !project.showInPortfolio);

      return (
        matchesSearch && matchesCategory && matchesStatus && matchesPortfolio
      );
    });
  }, [projects, searchTerm, categoryFilter, statusFilter, portfolioFilter]);

  const handleAddProject = () => {
    handleEdit?.("projects", { mode: "create" });
  };

  const handleEditProject = (project) => {
    handleEdit?.("projects", { mode: "edit", item: project });
  };

  const handleDeleteProject = (project) => {
    handleDelete?.("projects", { item: project });
  };

  const handleTogglePortfolio = (projectId) => {
    // This would typically update the project in state/database
    console.log(`Toggle portfolio visibility for project: ${projectId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return {
          backgroundColor: "rgba(76, 175, 80, 0.1)",
          color: "#4caf50",
          borderColor: "#4caf50",
        };
      case "in-progress":
        return {
          backgroundColor: "rgba(255, 193, 7, 0.1)",
          color: "#ffc107",
          borderColor: "#ffc107",
        };
      default:
        return {
          backgroundColor: "rgba(158, 158, 158, 0.1)",
          color: "#9e9e9e",
          borderColor: "#9e9e9e",
        };
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#0d1117",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* Admin Header */}
      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: "white", mb: 0.5 }}
            >
              Project Management
            </Typography>
            <Typography variant="body2" sx={{ color: "#8b949e" }}>
              Manage your portfolio projects • {projects.length} total projects
              • {projects.filter((p) => p.showInPortfolio).length} visible in
              portfolio • {filteredProjects.length} shown
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddProject}
            sx={{
              backgroundColor: "#238636",
              color: "white",
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "#2ea043",
              },
            }}
          >
            Add New Project
          </Button>
        </Stack>
      </Box>

      {/* Filters Section */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          backgroundColor: "#161b22",
          border: "1px solid #30363d",
          borderRadius: 3,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <FilterList sx={{ color: "#8b949e", fontSize: 20 }} />
          <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
            Filter & Search Projects
          </Typography>
          <Typography variant="caption" sx={{ color: "#6e7681", ml: "auto" }}>
            {filteredProjects.length} of {projects.length} projects shown
          </Typography>

          {/* Count Badges */}
          <Stack direction="row" spacing={1.5} sx={{ ml: 2 }}>
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                backgroundColor: "rgba(76, 175, 80, 0.1)",
                border: "1px solid rgba(76, 175, 80, 0.3)",
                borderRadius: 1.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#4caf50",
                  fontWeight: 600,
                  fontSize: "11px",
                }}
              >
                COMPLETED:{" "}
                {
                  filteredProjects.filter((p) => p.status === "completed")
                    .length
                }
              </Typography>
            </Box>
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                backgroundColor: "rgba(255, 193, 7, 0.1)",
                border: "1px solid rgba(255, 193, 7, 0.3)",
                borderRadius: 1.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#ffc107",
                  fontWeight: 600,
                  fontSize: "11px",
                }}
              >
                IN-PROGRESS:{" "}
                {
                  filteredProjects.filter((p) => p.status === "in-progress")
                    .length
                }
              </Typography>
            </Box>
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                backgroundColor: "rgba(88, 166, 255, 0.1)",
                border: "1px solid rgba(88, 166, 255, 0.3)",
                borderRadius: 1.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#58a6ff",
                  fontWeight: 600,
                  fontSize: "11px",
                }}
              >
                PUBLIC:{" "}
                {filteredProjects.filter((p) => p.showInPortfolio).length}
              </Typography>
            </Box>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          {/* Search Bar */}
          <TextField
            placeholder="Search projects, description, or technologies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{
              minWidth: 300,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#0d1117",
                color: "white",
                "& fieldset": {
                  borderColor: "#30363d",
                },
                "&:hover fieldset": {
                  borderColor: "#58a6ff",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#58a6ff",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#8b949e",
                opacity: 1,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#8b949e", fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Category Filter */}
          <TextField
            select
            label="Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            size="small"
            sx={{
              minWidth: 150,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#0d1117",
                color: "white",
                "& fieldset": {
                  borderColor: "#30363d",
                },
                "&:hover fieldset": {
                  borderColor: "#58a6ff",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#58a6ff",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#8b949e",
                "&.Mui-focused": {
                  color: "#58a6ff",
                },
              },
            }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>

          {/* Status Filter */}
          <TextField
            select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            size="small"
            sx={{
              minWidth: 140,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#0d1117",
                color: "white",
                "& fieldset": {
                  borderColor: "#30363d",
                },
                "&:hover fieldset": {
                  borderColor: "#58a6ff",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#58a6ff",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#8b949e",
                "&.Mui-focused": {
                  color: "#58a6ff",
                },
              },
            }}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
          </TextField>

          {/* Portfolio Visibility Filter */}
          <TextField
            select
            label="Portfolio"
            value={portfolioFilter}
            onChange={(e) => setPortfolioFilter(e.target.value)}
            size="small"
            sx={{
              minWidth: 130,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#0d1117",
                color: "white",
                "& fieldset": {
                  borderColor: "#30363d",
                },
                "&:hover fieldset": {
                  borderColor: "#58a6ff",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#58a6ff",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#8b949e",
                "&.Mui-focused": {
                  color: "#58a6ff",
                },
              },
            }}
          >
            <MenuItem value="all">All Projects</MenuItem>
            <MenuItem value="public">Public Only</MenuItem>
            <MenuItem value="private">Private Only</MenuItem>
          </TextField>

          {/* Clear Filters Button */}
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setSearchTerm("");
              setCategoryFilter("all");
              setStatusFilter("all");
              setPortfolioFilter("all");
            }}
            sx={{
              borderColor: "#30363d",
              color: "#8b949e",
              textTransform: "none",
              "&:hover": {
                borderColor: "#58a6ff",
                color: "#58a6ff",
                backgroundColor: "rgba(88, 166, 255, 0.1)",
              },
            }}
          >
            Clear Filters
          </Button>
        </Stack>
      </Box>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <Stack spacing={3}>
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              sx={{
                backgroundColor: "#161b22",
                border: "1px solid #30363d",
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease-in-out",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background:
                    project.status === "completed"
                      ? "linear-gradient(90deg, #4caf50, #66bb6a)"
                      : "linear-gradient(90deg, #ffc107, #ffb300)",
                  zIndex: 1,
                },
                "&:hover": {
                  borderColor: "#58a6ff",
                  boxShadow: "0 8px 25px rgba(88, 166, 255, 0.15)",
                  transform: "translateY(-2px)",
                  "& .project-title": {
                    color: "#58a6ff",
                  },
                },
              }}
            >
              <CardContent sx={{ p: 4, pt: 3 }}>
                <Stack spacing={3}>
                  {/* Project Title and Actions */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        className="project-title"
                        sx={{
                          fontWeight: 700,
                          color: "white",
                          mb: 2,
                          fontSize: "20px",
                          lineHeight: 1.3,
                          transition: "color 0.2s ease",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {project.title}
                      </Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Chip
                          icon={
                            <Typography sx={{ fontSize: "14px" }}>
                              🏷️
                            </Typography>
                          }
                          label={project.category}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(255, 193, 7, 0.1)",
                            color: "#ffc107",
                            border: "1px solid #ffc107",
                            fontSize: "11px",
                            height: "20px",
                            borderRadius: 3,
                            "& .MuiChip-icon": {
                              color: "#ffc107",
                              fontSize: "14px",
                            },
                          }}
                        />
                        <Chip
                          icon={
                            <Typography sx={{ fontSize: "14px" }}>
                              📅
                            </Typography>
                          }
                          label={project.timeline}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(88, 166, 255, 0.1)",
                            color: "#58a6ff",
                            border: "1px solid #58a6ff",
                            fontSize: "11px",
                            height: "20px",
                            borderRadius: 3,
                            "& .MuiChip-icon": {
                              color: "#58a6ff",
                              fontSize: "14px",
                            },
                          }}
                        />
                        <Chip
                          label={`${project.status} / ${project.progress}%`}
                          size="small"
                          sx={{
                            ...getStatusColor(project.status),
                            border: `1px solid`,
                            fontSize: "11px",
                            height: "20px",
                          }}
                        />
                      </Stack>
                    </Box>

                    {/* Action Buttons */}
                    <Stack direction="row" spacing={2} alignItems="center">
                      {/* Show in Portfolio Toggle with Border */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          px: 2,
                          py: 1,
                          border: "1px solid #30363d",
                          borderRadius: 2,
                          backgroundColor: "rgba(48, 54, 61, 0.1)",
                          "&:hover": {
                            borderColor: "#58a6ff",
                            backgroundColor: "rgba(88, 166, 255, 0.05)",
                          },
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#8b949e",
                            fontSize: "11px",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                          }}
                        >
                          Show in Portfolio:
                        </Typography>
                        <Switch
                          size="small"
                          checked={project.showInPortfolio}
                          onChange={() => handleTogglePortfolio(project.id)}
                          sx={{
                            "& .MuiSwitch-switchBase": {
                              color: "#8b949e",
                              "&.Mui-checked": {
                                color: "#238636",
                                "& + .MuiSwitch-track": {
                                  backgroundColor: "#238636",
                                },
                              },
                            },
                            "& .MuiSwitch-track": {
                              backgroundColor: "#30363d",
                            },
                          }}
                        />
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => handleEditProject(project)}
                        sx={{ color: "#8b949e", "&:hover": { color: "white" } }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteProject(project)}
                        sx={{
                          color: "#8b949e",
                          "&:hover": { color: "#f85149" },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Stack>

                  {/* Description */}
                  <Box
                    sx={{
                      backgroundColor: "rgba(139, 148, 158, 0.05)",
                      borderRadius: 2,
                      p: 2.5,
                      border: "1px solid rgba(48, 54, 61, 0.5)",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#c9d1d9",
                        lineHeight: 1.7,
                        fontSize: "15px",
                        fontWeight: 400,
                      }}
                    >
                      {project.description}
                    </Typography>
                  </Box>

                  {/* Technologies */}
                  <Stack
                    direction="row"
                    spacing={1.5}
                    flexWrap="wrap"
                    useFlexGap
                  >
                    {project.technologies.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{
                          background:
                            "linear-gradient(135deg, #1f6feb, #0969da)",
                          color: "white",
                          fontSize: "12px",
                          height: "26px",
                          borderRadius: 2,
                          fontWeight: 500,
                          boxShadow: "0 2px 4px rgba(31, 111, 235, 0.2)",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #0969da, #0550ae)",
                            transform: "scale(1.05)",
                          },
                          transition: "all 0.2s ease",
                        }}
                      />
                    ))}
                  </Stack>

                  {/* Project Links */}
                  <Box
                    sx={{
                      borderTop: "1px solid #30363d",
                      pt: 3,
                      mt: 3,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      flexWrap="wrap"
                      useFlexGap
                    >
                      <Button
                        variant="contained"
                        size="medium"
                        startIcon={<GitHub />}
                        component={project.links.github ? "a" : "button"}
                        href={project.links.github || undefined}
                        target={project.links.github ? "_blank" : undefined}
                        disabled={!project.links.github}
                        sx={{
                          backgroundColor: project.links.github
                            ? "#21262d"
                            : "#161b22",
                          color: project.links.github ? "#f0f6fc" : "#6e7681",
                          fontSize: "13px",
                          fontWeight: 500,
                          textTransform: "none",
                          borderRadius: 2,
                          px: 2.5,
                          py: 1,
                          border: project.links.github
                            ? "1px solid #30363d"
                            : "1px solid #21262d",
                          boxShadow: project.links.github
                            ? "0 2px 6px rgba(0, 0, 0, 0.1)"
                            : "none",
                          "&:hover": project.links.github
                            ? {
                                backgroundColor: "#30363d",
                                borderColor: "#58a6ff",
                                boxShadow:
                                  "0 4px 12px rgba(88, 166, 255, 0.15)",
                                transform: "translateY(-1px)",
                              }
                            : {},
                          "&.Mui-disabled": {
                            backgroundColor: "#161b22",
                            color: "#6e7681",
                            border: "1px solid #21262d",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        {project.links.github
                          ? "GitHub Repo"
                          : "No GitHub Link"}
                      </Button>

                      <Button
                        variant="contained"
                        size="medium"
                        startIcon={<Launch />}
                        component={project.links.live ? "a" : "button"}
                        href={project.links.live || undefined}
                        target={project.links.live ? "_blank" : undefined}
                        disabled={!project.links.live}
                        sx={{
                          backgroundColor: project.links.live
                            ? "#238636"
                            : "#161b22",
                          color: project.links.live ? "white" : "#6e7681",
                          fontSize: "13px",
                          fontWeight: 500,
                          textTransform: "none",
                          borderRadius: 2,
                          px: 2.5,
                          py: 1,
                          border: project.links.live
                            ? "none"
                            : "1px solid #21262d",
                          boxShadow: project.links.live
                            ? "0 2px 6px rgba(35, 134, 54, 0.2)"
                            : "none",
                          "&:hover": project.links.live
                            ? {
                                backgroundColor: "#2ea043",
                                boxShadow: "0 4px 12px rgba(35, 134, 54, 0.3)",
                                transform: "translateY(-1px)",
                              }
                            : {},
                          "&.Mui-disabled": {
                            backgroundColor: "#161b22",
                            color: "#6e7681",
                            border: "1px solid #21262d",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        {project.links.live ? "Live Site" : "No Live Demo"}
                      </Button>

                      <Button
                        variant="contained"
                        size="medium"
                        startIcon={<Launch />}
                        component={project.links.paper ? "a" : "button"}
                        href={project.links.paper || undefined}
                        target={project.links.paper ? "_blank" : undefined}
                        disabled={!project.links.paper}
                        sx={{
                          backgroundColor: project.links.paper
                            ? "#ffc107"
                            : "#161b22",
                          color: project.links.paper ? "#1b1f23" : "#6e7681",
                          fontSize: "13px",
                          fontWeight: 500,
                          textTransform: "none",
                          borderRadius: 2,
                          px: 2.5,
                          py: 1,
                          border: project.links.paper
                            ? "none"
                            : "1px solid #21262d",
                          boxShadow: project.links.paper
                            ? "0 2px 6px rgba(255, 193, 7, 0.2)"
                            : "none",
                          "&:hover": project.links.paper
                            ? {
                                backgroundColor: "#ffb300",
                                boxShadow: "0 4px 12px rgba(255, 193, 7, 0.3)",
                                transform: "translateY(-1px)",
                              }
                            : {},
                          "&.Mui-disabled": {
                            backgroundColor: "#161b22",
                            color: "#6e7681",
                            border: "1px solid #21262d",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        {project.links.paper ? "Paper/Doc" : "No Paper"}
                      </Button>

                      <Button
                        variant="contained"
                        size="medium"
                        startIcon={<Dataset />}
                        component={project.links.dataset ? "a" : "button"}
                        href={project.links.dataset || undefined}
                        target={project.links.dataset ? "_blank" : undefined}
                        disabled={!project.links.dataset}
                        sx={{
                          backgroundColor: project.links.dataset
                            ? "#8b5cf6"
                            : "#161b22",
                          color: project.links.dataset ? "white" : "#6e7681",
                          fontSize: "13px",
                          fontWeight: 500,
                          textTransform: "none",
                          borderRadius: 2,
                          px: 2.5,
                          py: 1,
                          border: project.links.dataset
                            ? "none"
                            : "1px solid #21262d",
                          boxShadow: project.links.dataset
                            ? "0 2px 6px rgba(139, 92, 246, 0.2)"
                            : "none",
                          "&:hover": project.links.dataset
                            ? {
                                backgroundColor: "#7c3aed",
                                boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
                                transform: "translateY(-1px)",
                              }
                            : {},
                          "&.Mui-disabled": {
                            backgroundColor: "#161b22",
                            color: "#6e7681",
                            border: "1px solid #21262d",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        {project.links.dataset ? "Dataset" : "No Dataset"}
                      </Button>

                      <Button
                        variant="contained"
                        size="medium"
                        startIcon={<Code />}
                        component={project.links.notebook ? "a" : "button"}
                        href={project.links.notebook || undefined}
                        target={project.links.notebook ? "_blank" : undefined}
                        disabled={!project.links.notebook}
                        sx={{
                          backgroundColor: project.links.notebook
                            ? "#f97316"
                            : "#161b22",
                          color: project.links.notebook ? "white" : "#6e7681",
                          fontSize: "13px",
                          fontWeight: 500,
                          textTransform: "none",
                          borderRadius: 2,
                          px: 2.5,
                          py: 1,
                          border: project.links.notebook
                            ? "none"
                            : "1px solid #21262d",
                          boxShadow: project.links.notebook
                            ? "0 2px 6px rgba(249, 115, 22, 0.2)"
                            : "none",
                          "&:hover": project.links.notebook
                            ? {
                                backgroundColor: "#ea580c",
                                boxShadow: "0 4px 12px rgba(249, 115, 22, 0.3)",
                                transform: "translateY(-1px)",
                              }
                            : {},
                          "&.Mui-disabled": {
                            backgroundColor: "#161b22",
                            color: "#6e7681",
                            border: "1px solid #21262d",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        {project.links.notebook ? "Notebook" : "No Notebook"}
                      </Button>

                      <Button
                        variant="contained"
                        size="medium"
                        startIcon={<VideoLibrary />}
                        component={project.links.video ? "a" : "button"}
                        href={project.links.video || undefined}
                        target={project.links.video ? "_blank" : undefined}
                        disabled={!project.links.video}
                        sx={{
                          backgroundColor: project.links.video
                            ? "#ef4444"
                            : "#161b22",
                          color: project.links.video ? "white" : "#6e7681",
                          fontSize: "13px",
                          fontWeight: 500,
                          textTransform: "none",
                          borderRadius: 2,
                          px: 2.5,
                          py: 1,
                          border: project.links.video
                            ? "none"
                            : "1px solid #21262d",
                          boxShadow: project.links.video
                            ? "0 2px 6px rgba(239, 68, 68, 0.2)"
                            : "none",
                          "&:hover": project.links.video
                            ? {
                                backgroundColor: "#dc2626",
                                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
                                transform: "translateY(-1px)",
                              }
                            : {},
                          "&.Mui-disabled": {
                            backgroundColor: "#161b22",
                            color: "#6e7681",
                            border: "1px solid #21262d",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        {project.links.video ? "Video Demo" : "No Video"}
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        /* No Results Found */
        <Card
          sx={{
            backgroundColor: "#161b22",
            border: "1px solid #30363d",
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            textAlign: "center",
            py: 8,
          }}
        >
          <CardContent>
            <Stack spacing={3} alignItems="center">
              {/* Empty State Icon */}
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  backgroundColor: "rgba(139, 148, 158, 0.1)",
                  border: "2px dashed #30363d",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Search sx={{ fontSize: 32, color: "#6e7681" }} />
              </Box>

              {/* No Results Message */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  No Projects Found
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#8b949e",
                    lineHeight: 1.6,
                    maxWidth: 400,
                  }}
                >
                  {searchTerm ||
                  categoryFilter !== "all" ||
                  statusFilter !== "all" ||
                  portfolioFilter !== "all"
                    ? "No projects match your current filters. Try adjusting your search criteria or clearing filters to see more results."
                    : "You haven't created any projects yet. Click 'Add New Project' to get started with your portfolio."}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Projects;
