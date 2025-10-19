import React, { useMemo, useState, useCallback } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  GitHub,
  Launch,
  Search,
  FilterList,
  Clear,
  Code,
  Web,
  Storage,
  VideoLibrary,
  Description,
  Star,
  Group,
  TrendingUp,
} from "@mui/icons-material";

const Projects = () => {
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [impactFilter, setImpactFilter] = useState("all");

  // Comprehensive projects data with diverse examples
  const allProjects = useMemo(
    () => [
      {
        id: "proj-001",
        title: "AI-Powered Healthcare Analytics Platform",
        description:
          "Comprehensive healthcare analytics platform leveraging machine learning for predictive diagnostics, patient risk assessment, and treatment optimization. Built with microservices architecture and real-time data processing capabilities.",
        category: "AI/ML",
        status: "Completed",
        priority: "High",
        startDate: "2024-01-15",
        endDate: "2024-08-30",
        progress: 100,
        teamSize: 8,
        technologies: [
          "Python",
          "TensorFlow",
          "React",
          "Node.js",
          "MongoDB",
          "Docker",
          "Kubernetes",
        ],
        githubUrl: "https://github.com/username/healthcare-analytics",
        liveUrl: "https://healthcare-analytics-demo.vercel.app",
        documentationUrl: "https://docs.healthcare-analytics.com",
        complexity: "High",
        impact: "Enterprise",
        clientType: "Healthcare Provider",
        budget: 250000,
        achievements: [
          "99.2% Accuracy",
          "50% Faster Diagnosis",
          "HIPAA Compliant",
        ],
        challenges: ["Data Privacy", "Real-time Processing", "Scalability"],
      },
      {
        id: "proj-002",
        title: "E-Commerce Mobile Application",
        description:
          "Cross-platform mobile application for seamless online shopping experience with advanced search capabilities, personalized recommendations, and integrated payment solutions.",
        category: "Mobile Development",
        status: "In Progress",
        priority: "High",
        startDate: "2024-06-01",
        endDate: "2024-12-15",
        progress: 75,
        teamSize: 6,
        technologies: [
          "React Native",
          "Firebase",
          "Stripe API",
          "Redux",
          "TypeScript",
          "Expo",
        ],
        githubUrl: "https://github.com/username/ecommerce-mobile",
        liveUrl: null,
        documentationUrl: "https://docs.ecommerce-mobile.com",
        complexity: "Medium",
        impact: "Commercial",
        clientType: "Retail Business",
        budget: 80000,
        achievements: [
          "4.8★ App Store Rating",
          "100K+ Downloads",
          "Multi-platform Support",
        ],
        challenges: [
          "Performance Optimization",
          "Offline Capability",
          "Push Notifications",
        ],
      },
      {
        id: "proj-003",
        title: "Blockchain Supply Chain Tracker",
        description:
          "Decentralized supply chain management system using blockchain technology for transparent tracking of products from manufacture to consumer, ensuring authenticity and reducing counterfeiting.",
        category: "Blockchain",
        status: "Completed",
        priority: "Medium",
        startDate: "2023-09-10",
        endDate: "2024-03-20",
        progress: 100,
        teamSize: 5,
        technologies: [
          "Solidity",
          "Web3.js",
          "React",
          "Node.js",
          "Ethereum",
          "IPFS",
        ],
        githubUrl: "https://github.com/username/blockchain-supply-chain",
        liveUrl: "https://supply-chain-tracker.ethereum.com",
        documentationUrl: "https://whitepaper.supply-chain-tracker.com",
        complexity: "High",
        impact: "Industry",
        clientType: "Manufacturing",
        budget: 180000,
        achievements: [
          "Zero Counterfeits",
          "30% Cost Reduction",
          "Enterprise Adoption",
        ],
        challenges: [
          "Gas Optimization",
          "Scalability",
          "Regulatory Compliance",
        ],
      },
      {
        id: "proj-004",
        title: "Real-Time Collaboration Platform",
        description:
          "Advanced collaboration platform enabling teams to work together seamlessly with real-time document editing, video conferencing, project management tools, and integrated communication channels.",
        category: "Web Development",
        status: "In Progress",
        priority: "High",
        startDate: "2024-04-01",
        endDate: "2024-11-30",
        progress: 60,
        teamSize: 12,
        technologies: [
          "Next.js",
          "WebRTC",
          "Socket.io",
          "PostgreSQL",
          "Redis",
          "AWS",
          "Docker",
        ],
        githubUrl: null,
        liveUrl: null,
        documentationUrl: "https://internal-docs.collab-platform.com",
        complexity: "High",
        impact: "Enterprise",
        clientType: "Corporate",
        budget: 320000,
        achievements: [
          "Real-time Sync",
          "500+ Concurrent Users",
          "99.9% Uptime",
        ],
        challenges: [
          "Concurrent Editing",
          "WebRTC Optimization",
          "Cross-browser Support",
        ],
      },
      {
        id: "proj-005",
        title: "IoT Smart Home Management System",
        description:
          "Comprehensive IoT platform for smart home automation including device management, energy optimization, security monitoring, and predictive maintenance capabilities.",
        category: "IoT",
        status: "Completed",
        priority: "Medium",
        startDate: "2023-11-01",
        endDate: "2024-05-15",
        progress: 100,
        teamSize: 4,
        technologies: [
          "Arduino",
          "Raspberry Pi",
          "Python",
          "MQTT",
          "InfluxDB",
          "Grafana",
          "React",
        ],
        githubUrl: "https://github.com/username/iot-smart-home",
        liveUrl: "https://smarthome-demo.iot-platform.com",
        documentationUrl: "https://docs.iot-platform.com",
        complexity: "Medium",
        impact: "Consumer",
        clientType: "Homeowners",
        budget: 45000,
        achievements: [
          "40% Energy Savings",
          "Smart Automation",
          "Remote Monitoring",
        ],
        challenges: [
          "Device Compatibility",
          "Network Reliability",
          "Security Protocols",
        ],
      },
      {
        id: "proj-006",
        title: "Machine Learning Model Deployment Pipeline",
        description:
          "MLOps platform for automated machine learning model training, validation, deployment, and monitoring with continuous integration and deployment capabilities.",
        category: "DevOps/MLOps",
        status: "Completed",
        priority: "Medium",
        startDate: "2024-02-01",
        endDate: "2024-07-30",
        progress: 100,
        teamSize: 3,
        technologies: [
          "Python",
          "MLflow",
          "Kubernetes",
          "Jenkins",
          "Prometheus",
          "Grafana",
          "AWS",
        ],
        githubUrl: "https://github.com/username/ml-deployment-pipeline",
        liveUrl: null,
        documentationUrl: "https://docs.ml-pipeline.com",
        complexity: "High",
        impact: "Technical",
        clientType: "Data Science Teams",
        budget: 95000,
        achievements: [
          "90% Deployment Speed",
          "Automated Testing",
          "Model Versioning",
        ],
        challenges: [
          "Model Drift Detection",
          "Resource Optimization",
          "A/B Testing",
        ],
      },
      {
        id: "proj-007",
        title: "Cybersecurity Threat Detection System",
        description:
          "Advanced cybersecurity platform using AI and machine learning for real-time threat detection, anomaly identification, and automated incident response in enterprise environments.",
        category: "Cybersecurity",
        status: "Planning",
        priority: "High",
        startDate: "2024-11-01",
        endDate: "2025-06-30",
        progress: 15,
        teamSize: 10,
        technologies: [
          "Python",
          "TensorFlow",
          "Elasticsearch",
          "Kafka",
          "React",
          "FastAPI",
          "PostgreSQL",
        ],
        githubUrl: null,
        liveUrl: null,
        documentationUrl: null,
        complexity: "High",
        impact: "Enterprise",
        clientType: "Security Teams",
        budget: 400000,
        achievements: [
          "Real-time Detection",
          "Zero-day Protection",
          "Compliance Ready",
        ],
        challenges: [
          "False Positive Reduction",
          "Real-time Processing",
          "Threat Intelligence",
        ],
      },
      {
        id: "proj-008",
        title: "Educational VR Learning Platform",
        description:
          "Immersive virtual reality platform for educational content delivery, interactive learning experiences, and student progress tracking across various subjects and skill levels.",
        category: "VR/AR",
        status: "Research",
        priority: "Low",
        startDate: "2024-09-01",
        endDate: "2025-03-30",
        progress: 25,
        teamSize: 7,
        technologies: [
          "Unity",
          "C#",
          "Oculus SDK",
          "WebXR",
          "Node.js",
          "MongoDB",
          "Three.js",
        ],
        githubUrl: "https://github.com/username/vr-learning-platform",
        liveUrl: null,
        documentationUrl: "https://research.vr-learning.com",
        complexity: "Medium",
        impact: "Educational",
        clientType: "Educational Institutions",
        budget: 150000,
        achievements: [
          "Immersive Learning",
          "Cross-platform VR",
          "Accessibility Features",
        ],
        challenges: [
          "Motion Sickness",
          "Hardware Compatibility",
          "Content Creation Tools",
        ],
      },
    ],
    []
  );

  // Helper functions for filtering
  const getUniqueValues = useCallback(
    (key) => {
      return [...new Set(allProjects.map((project) => project[key]))].sort();
    },
    [allProjects]
  );

  const uniqueCategories = useMemo(
    () => getUniqueValues("category"),
    [getUniqueValues]
  );
  const uniqueStatuses = useMemo(
    () => getUniqueValues("status"),
    [getUniqueValues]
  );
  const uniqueImpacts = useMemo(
    () => getUniqueValues("impact"),
    [getUniqueValues]
  );

  // Apply filters to projects
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesSearch =
        searchTerm === "" ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || project.category === categoryFilter;
      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;
      const matchesImpact =
        impactFilter === "all" || project.impact === impactFilter;

      return matchesSearch && matchesCategory && matchesStatus && matchesImpact;
    });
  }, [allProjects, searchTerm, categoryFilter, statusFilter, impactFilter]);

  // Statistics calculations
  const statistics = useMemo(() => {
    const totalProjects = allProjects.length;
    const completedProjects = allProjects.filter(
      (p) => p.status === "Completed"
    ).length;
    const inProgressProjects = allProjects.filter(
      (p) => p.status === "In Progress"
    ).length;
    const planningProjects = allProjects.filter(
      (p) => p.status === "Planning"
    ).length;
    const researchProjects = allProjects.filter(
      (p) => p.status === "Research"
    ).length;
    const averageProgress = Math.round(
      allProjects.reduce((acc, p) => acc + p.progress, 0) / totalProjects
    );

    return {
      total: totalProjects,
      completed: completedProjects,
      inProgress: inProgressProjects,
      planning: planningProjects,
      research: researchProjects,
      averageProgress: averageProgress,
    };
  }, [allProjects]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setStatusFilter("all");
    setImpactFilter("all");
  };

  const getStatusChipProps = (status) => {
    switch (status) {
      case "Completed":
        return {
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          color: "#4CAF50",
          borderColor: "rgba(76, 175, 80, 0.4)",
        };
      case "In Progress":
        return {
          backgroundColor: "rgba(33, 150, 243, 0.2)",
          color: "#2196F3",
          borderColor: "rgba(33, 150, 243, 0.4)",
        };
      case "Planning":
        return {
          backgroundColor: "rgba(255, 193, 7, 0.2)",
          color: "#FFC107",
          borderColor: "rgba(255, 193, 7, 0.4)",
        };
      case "Research":
        return {
          backgroundColor: "rgba(156, 39, 176, 0.2)",
          color: "#9C27B0",
          borderColor: "rgba(156, 39, 176, 0.4)",
        };
      default:
        return {
          backgroundColor: "rgba(158, 158, 158, 0.2)",
          color: "#9E9E9E",
          borderColor: "rgba(158, 158, 158, 0.4)",
        };
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "AI/ML":
        return <TrendingUp fontSize="small" />;
      case "Web Development":
        return <Web fontSize="small" />;
      case "Mobile Development":
        return <Code fontSize="small" />;
      case "Blockchain":
        return <Storage fontSize="small" />;
      case "IoT":
        return <Storage fontSize="small" />;
      case "Cybersecurity":
        return <Storage fontSize="small" />;
      case "VR/AR":
        return <VideoLibrary fontSize="small" />;
      case "DevOps/MLOps":
        return <TrendingUp fontSize="small" />;
      default:
        return <Code fontSize="small" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#F44336";
      case "Medium":
        return "#FF9800";
      case "Low":
        return "#4CAF50";
      default:
        return "#9E9E9E";
    }
  };

  return (
    <Box sx={{ p: 3, background: "#0D1117", minHeight: "100vh" }}>
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "flex-start" }}
        spacing={{ xs: 2, sm: 0 }}
        mb={4}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ color: "#fff", fontWeight: 700, mb: 1 }}
          >
            Project Portfolio
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
            Manage and showcase your development projects and achievements
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            backgroundColor: "rgba(129,199,132,0.2)",
            color: "#A5D6A7",
            "&:hover": { backgroundColor: "rgba(129,199,132,0.3)" },
            px: 3,
            py: 1,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Add Project
        </Button>
      </Stack>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card
            sx={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 2,
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: "rgba(129,199,132,0.2)",
                  }}
                >
                  <Code sx={{ color: "#A5D6A7" }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ color: "#fff", fontWeight: 700 }}
                  >
                    {statistics.total}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    All Projects
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card
            sx={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 2,
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                  }}
                >
                  <Star sx={{ color: "#4CAF50" }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ color: "#fff", fontWeight: 700 }}
                  >
                    {statistics.completed}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Completed
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card
            sx={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 2,
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: "rgba(33, 150, 243, 0.2)",
                  }}
                >
                  <TrendingUp sx={{ color: "#2196F3" }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ color: "#fff", fontWeight: 700 }}
                  >
                    {statistics.inProgress}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    In Progress
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card
            sx={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 2,
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 193, 7, 0.2)",
                  }}
                >
                  <Description sx={{ color: "#FFC107" }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ color: "#fff", fontWeight: 700 }}
                  >
                    {statistics.planning}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Planning
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card
            sx={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 2,
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: "rgba(156, 39, 176, 0.2)",
                  }}
                >
                  <Search sx={{ color: "#9C27B0" }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ color: "#fff", fontWeight: 700 }}
                  >
                    {statistics.research}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Research
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Box
        sx={{
          mb: 3,
          p: 3,
          backgroundColor: "rgba(255,255,255,0.02)",
          borderRadius: 2,
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Stack spacing={3}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <FilterList
                sx={{ color: "rgba(255,255,255,0.7)", fontSize: 20 }}
              />
              <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: 16 }}>
                Filter Projects
              </Typography>
            </Stack>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {filteredProjects.length} of {allProjects.length}
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            {/* Search */}
            <TextField
              placeholder="Search projects, technologies, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "#fff",
                  "& fieldset": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#A5D6A7",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255,255,255,0.5)",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search
                      sx={{ color: "rgba(255,255,255,0.5)", fontSize: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            {/* Category Filter */}
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#A5D6A7" },
                }}
              >
                Category
              </InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                label="Category"
                sx={{
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#A5D6A7",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {uniqueCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Status Filter */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#A5D6A7" },
                }}
              >
                Status
              </InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
                sx={{
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#A5D6A7",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value="all">All Status</MenuItem>
                {uniqueStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Impact Filter */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#A5D6A7" },
                }}
              >
                Impact
              </InputLabel>
              <Select
                value={impactFilter}
                onChange={(e) => setImpactFilter(e.target.value)}
                label="Impact"
                sx={{
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#A5D6A7",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value="all">All Impact</MenuItem>
                {uniqueImpacts.map((impact) => (
                  <MenuItem key={impact} value={impact}>
                    {impact}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Clear Filters */}
            <Button
              onClick={handleClearFilters}
              startIcon={<Clear />}
              variant="outlined"
              size="small"
              sx={{
                color: "rgba(255,255,255,0.7)",
                borderColor: "rgba(255,255,255,0.15)",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.3)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              Clear
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            px: 3,
            backgroundColor: "rgba(255,255,255,0.02)",
            borderRadius: 2,
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Code sx={{ color: "rgba(255,255,255,0.3)", fontSize: 64, mb: 2 }} />
          <Typography
            sx={{ color: "rgba(255,255,255,0.6)", mb: 1, fontSize: "1.1rem" }}
          >
            No projects found
          </Typography>
          <Typography
            sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}
          >
            {searchTerm ||
            categoryFilter !== "all" ||
            statusFilter !== "all" ||
            impactFilter !== "all"
              ? "Try adjusting your filters to see more results"
              : "Start building your project portfolio"}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredProjects.map((project) => (
            <Grid item xs={12} lg={6} key={project.id}>
              <Card
                sx={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                  },
                }}
              >
                {/* Priority Indicator */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    backgroundColor: getPriorityColor(project.priority),
                    borderRadius: "8px 8px 0 0",
                  }}
                />

                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  {/* Project Header */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    mb={2}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        mb={1}
                      >
                        {getCategoryIcon(project.category)}
                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: "1.2rem",
                            lineHeight: 1.3,
                          }}
                        >
                          {project.title}
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        alignItems="center"
                      >
                        <Chip
                          label={project.category}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(129,199,132,0.2)",
                            color: "#A5D6A7",
                            fontSize: "0.75rem",
                            height: "24px",
                          }}
                        />
                        <Chip
                          label={project.status}
                          size="small"
                          sx={{
                            ...getStatusChipProps(project.status),
                            border: `1px solid ${
                              getStatusChipProps(project.status).borderColor
                            }`,
                            fontSize: "0.75rem",
                            height: "24px",
                          }}
                        />
                        <Chip
                          label={`${project.teamSize} members`}
                          icon={<Group fontSize="small" />}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.8)",
                            fontSize: "0.75rem",
                            height: "24px",
                          }}
                        />
                      </Stack>
                    </Box>

                    <Stack direction="row" spacing={1}>
                      {/* Edit Button */}
                      <Tooltip title="Edit Project" arrow>
                        <IconButton
                          size="small"
                          sx={{
                            color: "rgba(255,255,255,0.6)",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                              color: "#A5D6A7",
                              backgroundColor: "rgba(129, 199, 132, 0.15)",
                              border: "1px solid rgba(129, 199, 132, 0.3)",
                              transform: "scale(1.05)",
                            },
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      {/* Delete Button */}
                      <Tooltip title="Delete Project" placement="top">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Add delete logic here
                            console.log("Delete project:", project.id);
                          }}
                          sx={{
                            color: "rgba(255,255,255,0.5)",
                            "&:hover": {
                              color: "#f44336",
                              backgroundColor: "rgba(244,67,54,0.1)",
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>

                  {/* Description */}
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {project.description}
                  </Typography>

                  {/* Progress Bar */}
                  <Box sx={{ mb: 2 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={1}
                    >
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.7)",
                          fontSize: "0.8rem",
                        }}
                      >
                        Progress
                      </Typography>
                      <Typography
                        sx={{
                          color: "#fff",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                        }}
                      >
                        {project.progress}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={project.progress}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: "rgba(255,255,255,0.1)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor:
                            project.progress === 100 ? "#4CAF50" : "#2196F3",
                          borderRadius: 3,
                        },
                      }}
                    />
                  </Box>

                  {/* Technologies */}
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "0.8rem",
                        mb: 1,
                      }}
                    >
                      Technologies
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {project.technologies.slice(0, 5).map((tech, index) => (
                        <Chip
                          key={index}
                          label={tech}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.9)",
                            fontSize: "0.7rem",
                            height: "22px",
                          }}
                        />
                      ))}
                      {project.technologies.length > 5 && (
                        <Tooltip
                          title={project.technologies.slice(5).join(", ")}
                        >
                          <Chip
                            label={`+${project.technologies.length - 5}`}
                            size="small"
                            sx={{
                              backgroundColor: "rgba(255,255,255,0.05)",
                              color: "rgba(255,255,255,0.6)",
                              fontSize: "0.7rem",
                              height: "22px",
                            }}
                          />
                        </Tooltip>
                      )}
                    </Box>
                  </Box>

                  {/* Project Stats */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 2,
                      mb: 2,
                      p: 2,
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "0.7rem",
                        }}
                      >
                        Start Date
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.8)",
                          fontSize: "0.8rem",
                        }}
                      >
                        {new Date(project.startDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "0.7rem",
                        }}
                      >
                        End Date
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.8)",
                          fontSize: "0.8rem",
                        }}
                      >
                        {new Date(project.endDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "0.7rem",
                        }}
                      >
                        Budget
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.8)",
                          fontSize: "0.8rem",
                        }}
                      >
                        ${project.budget.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "0.7rem",
                        }}
                      >
                        Impact
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.8)",
                          fontSize: "0.8rem",
                        }}
                      >
                        {project.impact}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Action Links */}
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    mt="auto"
                  >
                    {project.githubUrl && (
                      <Tooltip title="View GitHub Repository" arrow>
                        <IconButton
                          size="small"
                          onClick={() =>
                            window.open(project.githubUrl, "_blank")
                          }
                          sx={{
                            color: "rgba(255,255,255,0.6)",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                              color: "#fff",
                              backgroundColor: "rgba(255,255,255,0.15)",
                              border: "1px solid rgba(255,255,255,0.2)",
                              transform: "translateY(-1px)",
                            },
                          }}
                        >
                          <GitHub fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {project.liveUrl && (
                      <Tooltip title="View Live Demo" arrow>
                        <IconButton
                          size="small"
                          onClick={() => window.open(project.liveUrl, "_blank")}
                          sx={{
                            color: "rgba(255,255,255,0.6)",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                              color: "#4CAF50",
                              backgroundColor: "rgba(76, 175, 80, 0.15)",
                              border: "1px solid rgba(76, 175, 80, 0.3)",
                              transform: "translateY(-1px)",
                            },
                          }}
                        >
                          <Launch fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {project.documentationUrl && (
                      <Tooltip title="View Documentation" arrow>
                        <IconButton
                          size="small"
                          onClick={() =>
                            window.open(project.documentationUrl, "_blank")
                          }
                          sx={{
                            color: "rgba(255,255,255,0.6)",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                              color: "#2196F3",
                              backgroundColor: "rgba(33, 150, 243, 0.15)",
                              border: "1px solid rgba(33, 150, 243, 0.3)",
                              transform: "translateY(-1px)",
                            },
                          }}
                        >
                          <Description fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Projects;
