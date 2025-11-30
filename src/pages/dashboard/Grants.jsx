import React, { useState, useMemo, useCallback } from "react";
import {
  Stack,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Card,
  CardContent,
  Grid,
  LinearProgress,
} from "@mui/material";
import {
  Search,
  FilterList,
  Clear,
  MonetizationOn,
  TrendingUp,
  EmojiEvents,
  Work,
  ThumbUpAlt,
  PendingActions,
} from "@mui/icons-material";

// Constants
const FILTER_ALL_VALUE = "all";

const CONTENT_TYPES = {
  ALL: "all",
  PROJECTS: "projects",
  fundedAwards: "fundedAwards",
};

const AWARD_TYPE_COLORS = {
  Academic: "#2196F3",
  Professional: "#4CAF50",
  Competition: "#FF9800",
  Community: "#9C27B0",
  Research: "#00BCD4",
  Innovation: "#FF5722",
};

const PRESTIGE_COLORS = {
  Local: "#757575",
  Regional: "#FF9800",
  National: "#2196F3",
  International: "#FFD700",
};

const Grants = () => {
  // const { dashboardData } = useOutletContext();

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(FILTER_ALL_VALUE);
  const [categoryFilter, setCategoryFilter] = useState(FILTER_ALL_VALUE);
  const [contentFilter, setContentFilter] = useState(CONTENT_TYPES.ALL); // New filter for content sections

  // CRUD states
  const [fundedProjects] = useState([
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
      sponsor: "National Science Foundation",
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
      budget: "$250,000",
      achievements: [
        "99.2% Accuracy",
        "50% Faster Diagnosis",
        "HIPAA Compliant",
      ],
      challenges: ["Data Privacy", "Real-time Processing", "Scalability"],
    },
    {
      id: "proj-005",
      title: "Smart City IoT Management System",
      description:
        "Comprehensive IoT platform for managing smart city infrastructure including traffic monitoring, environmental sensors, energy management, and public safety systems with real-time analytics dashboard.",
      category: "IoT",
      status: "In Progress",
      priority: "High",
      startDate: "2024-02-01",
      endDate: "2025-01-31",
      progress: 60,
      teamSize: 12,
      sponsor: "Urban Development Corporation",
      technologies: [
        "IoT",
        "LoRaWAN",
        "Azure IoT Hub",
        "Power BI",
        "C++",
        "Python",
        "React",
      ],
      githubUrl: "https://github.com/username/smart-city-iot",
      liveUrl: null,
      documentationUrl: "https://docs.smart-city-iot.com",
      complexity: "High",
      impact: "Enterprise",
      budget: 320000,
      achievements: [
        "1000+ Sensors Deployed",
        "Real-time Monitoring",
        "Energy Optimization",
      ],
      challenges: ["Network Coverage", "Data Security", "System Integration"],
    },
    {
      id: "proj-006",
      title: "Micro-Learning Educational Platform",
      description:
        "AI-powered micro-learning platform that creates personalized learning paths, adaptive assessments, and bite-sized educational content for professional skill development.",
      category: "Education Technology",
      status: "Completed",
      priority: "Medium",
      startDate: "2023-09-15",
      endDate: "2024-06-30",
      progress: 100,
      teamSize: 4,
      sponsor: "Education Innovation Fund",
      technologies: [
        "Next.js",
        "TensorFlow.js",
        "PostgreSQL",
        "Redis",
        "Stripe",
        "AWS",
      ],
      githubUrl: "https://github.com/username/micro-learning-platform",
      liveUrl: "https://microlearn-platform.vercel.app",
      documentationUrl: "https://docs.microlearn-platform.com",
      complexity: "Medium",
      impact: "Social",
      budget: 45000,
      achievements: [
        "10K+ Active Users",
        "95% Completion Rate",
        "Personalized Learning",
      ],
      challenges: [
        "Content Curation",
        "User Engagement",
        "Assessment Validity",
      ],
    },
    {
      id: "proj-007",
      title: "Fintech Security Analysis Tool",
      description:
        "Advanced security analysis and threat detection tool specifically designed for fintech applications, featuring real-time vulnerability scanning, fraud detection, and compliance monitoring.",
      category: "Cybersecurity",
      status: "In Progress",
      priority: "High",
      startDate: "2024-04-01",
      endDate: "2024-11-30",
      progress: 40,
      teamSize: 7,
      sponsor: "Financial Security Institute",
      technologies: [
        "Python",
        "Elasticsearch",
        "Kibana",
        "Docker",
        "Kafka",
        "Machine Learning",
      ],
      githubUrl: "https://github.com/username/fintech-security-tool",
      liveUrl: null,
      documentationUrl: "https://docs.fintech-security.com",
      complexity: "High",
      impact: "Enterprise",
      budget: 95000,
      achievements: [
        "Real-time Detection",
        "99.8% Accuracy",
        "Compliance Ready",
      ],
      challenges: [
        "False Positives",
        "Performance Optimization",
        "Regulatory Compliance",
      ],
    },
    {
      id: "proj-008",
      title: "Autonomous Drone Fleet Management",
      description:
        "Comprehensive management system for autonomous drone fleets including flight planning, real-time monitoring, automated maintenance scheduling, and regulatory compliance tracking.",
      category: "Autonomous Systems",
      status: "Active",
      priority: "High",
      startDate: "2024-01-01",
      endDate: "2025-12-31",
      progress: 30,
      teamSize: 15,
      sponsor: "Aerospace Innovation Consortium",
      technologies: [
        "ROS",
        "Python",
        "C++",
        "OpenCV",
        "TensorFlow",
        "GPS/GNSS",
        "React",
      ],
      githubUrl: "https://github.com/username/drone-fleet-management",
      liveUrl: null,
      documentationUrl: "https://docs.drone-fleet.com",
      complexity: "High",
      impact: "Enterprise",
      budget: 400000,
      achievements: [
        "Autonomous Navigation",
        "Fleet Coordination",
        "Safety Compliance",
      ],
      challenges: [
        "Weather Adaptation",
        "Battery Management",
        "Air Traffic Integration",
      ],
    },
    {
      id: "proj-009",
      title: "Carbon Footprint Tracking API",
      description:
        "RESTful API service for tracking and analyzing carbon footprints of various activities, providing detailed analytics, reporting capabilities, and integration with sustainability platforms.",
      category: "Environmental Technology",
      status: "Completed",
      priority: "Medium",
      startDate: "2024-03-01",
      endDate: "2024-09-15",
      progress: 100,
      teamSize: 5,
      sponsor: "Green Technology Initiative",
      technologies: [
        "Node.js",
        "Express",
        "MongoDB",
        "GraphQL",
        "Docker",
        "AWS Lambda",
      ],
      githubUrl: "https://github.com/username/carbon-footprint-api",
      liveUrl: "https://api.carbon-tracker.com",
      documentationUrl: "https://docs.carbon-tracker.com",
      complexity: "Medium",
      impact: "Environmental",
      budget: 150000,
      achievements: [
        "Real-time Tracking",
        "Comprehensive Analytics",
        "API Integration",
      ],
      challenges: ["Data Accuracy", "Standard Compliance", "Scalability"],
    },
  ]);

  const [fundedAwards] = useState([
    {
      id: "icmi-best-paper-2024",
      title: "Best Paper Award - Outstanding Research",
      organization: "International Conference on Medical Informatics (ICMI)",
      date: "2024-09-16",
      type: "Academic",
      prestigeLevel: "International",
      description:
        "Recognized for groundbreaking research in 'Deep Learning Applications for Early Disease Detection Using Multimodal Brain Imaging' demonstrating 94.7% accuracy in early Alzheimer's and Parkinson's detection.",
      significance: "Selected from 300+ submissions across 45 countries",
      monetaryValue: 5000,
      impactMetrics: {
        citations: 24,
        mediaFeatures: 8,
        collaborations: 12,
      },
      certificate: "/certificates/icmi_2024_best_paper.pdf",
      keywords: [
        "Machine Learning",
        "Healthcare",
        "Neuroimaging",
        "Early Detection",
      ],
      featured: true,
      teamSize: 1,
      location: "Boston, MA, USA",
      status: "Received",
    },
    {
      id: "ieee-young-researcher-2024",
      title: "Young Researcher Excellence Award",
      organization: "IEEE Computer Society",
      date: "2024-06-20",
      type: "Professional",
      prestigeLevel: "International",
      description:
        "Honored for exceptional contributions to biomedical engineering and real-time healthcare analytics, specifically for developing ML pipelines for wearable ECG devices.",
      significance: "Top 10 young researchers globally under 30",
      monetaryValue: 8000,
      impactMetrics: {
        publications: 15,
        patents: 3,
        industryAdoption: 5,
      },
      certificate: "/certificates/ieee_young_researcher_2024.pdf",
      keywords: [
        "Biomedical Engineering",
        "Wearable Computing",
        "Real-time Analytics",
      ],
      featured: true,
      teamSize: 1,
      location: "San Francisco, CA, USA",
      status: "Received",
    },
    {
      id: "neurips-outstanding-paper-2023",
      title: "Outstanding Paper Award",
      organization:
        "Conference on Neural Information Processing Systems (NeurIPS)",
      date: "2023-12-10",
      type: "Research",
      prestigeLevel: "International",
      description:
        "Awarded for 'Federated Learning for Privacy-Preserving Healthcare Analytics: A Multi-institutional Study' - a novel framework enabling collaborative ML training while maintaining HIPAA compliance.",
      significance: "Top 0.5% of accepted papers (26 out of 5,200)",
      monetaryValue: 25000,
      impactMetrics: {
        citations: 89,
        implementations: 15,
        industrialPartners: 8,
      },
      certificate: "/certificates/neurips_2023_outstanding.pdf",
      keywords: [
        "Federated Learning",
        "Privacy Preservation",
        "Healthcare",
        "HIPAA",
      ],
      featured: true,
      teamSize: 1,
      location: "New Orleans, LA, USA",
      status: "Received",
    },
    {
      id: "acm-sigkdd-innovation-2024",
      title: "Innovation in Data Science Award",
      organization: "ACM SIGKDD International Conference",
      date: "2024-08-25",
      type: "Innovation",
      prestigeLevel: "International",
      description:
        "Recognized for pioneering work in 'Explainable AI for Financial Risk Assessment' improving transparency in algorithmic decision-making for loan approvals and credit scoring systems.",
      significance: "Inaugural award recognizing top 5 innovations globally",
      monetaryValue: 5000,
      impactMetrics: {
        industryAdoption: 12,
        academicCitations: 34,
        mediaFeatures: 6,
      },
      certificate: "/certificates/acm_sigkdd_2024_innovation.pdf",
      keywords: [
        "Explainable AI",
        "Financial Technology",
        "Risk Assessment",
        "Algorithmic Transparency",
      ],
      featured: true,
      teamSize: 1,
      location: "Barcelona, Spain",
      status: "Received",
    },
    {
      id: "google-ai-research-grant-2024",
      title: "AI for Social Good Research Grant",
      organization: "Google AI",
      date: "2024-05-15",
      type: "Competition",
      prestigeLevel: "International",
      description:
        "Awarded funding for 'AI-Powered Early Warning System for Natural Disasters' project aimed at developing machine learning models for predicting and mitigating natural disaster impacts.",
      significance: "Selected from 2,000+ global applications",
      monetaryValue: 10000,
      impactMetrics: {
        communityImpact: 25000,
        partnershipsFormed: 8,
        prototypesDeployed: 3,
      },
      certificate: "/certificates/google_ai_social_good_2024.pdf",
      keywords: [
        "Social Impact",
        "Natural Disasters",
        "Early Warning Systems",
        "Community Safety",
      ],
      featured: true,
      teamSize: 1,
      location: "Remote - Global Program",
      status: "Received",
    },
  ]);

  // Filter grants
  // Filter funded projects
  const filteredProjects = useMemo(() => {
    return fundedProjects.filter((project) => {
      const matchesSearch =
        searchTerm === "" ||
        project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.sponsor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === FILTER_ALL_VALUE || project.status === statusFilter;
      const matchesCategory =
        categoryFilter === FILTER_ALL_VALUE ||
        project.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [fundedProjects, searchTerm, statusFilter, categoryFilter]);

  // Filter fundedAwards
  const filteredAwards = useMemo(() => {
    return fundedAwards.filter((award) => {
      const matchesSearch =
        searchTerm === "" ||
        award.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        award.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        award.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        award.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        award.prestigeLevel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        award.keywords?.some((keyword) =>
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesStatus =
        statusFilter === FILTER_ALL_VALUE || award.status === statusFilter;
      const matchesCategory =
        categoryFilter === FILTER_ALL_VALUE ||
        award.type === categoryFilter ||
        award.prestigeLevel === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [fundedAwards, searchTerm, statusFilter, categoryFilter]);

  // Calculate comprehensive statistics
  const statistics = useMemo(() => {
    // Calculate project funding statistics
    const activeProjects = fundedProjects.filter(
      (project) =>
        project.status === "Active" || project.status === "In Progress"
    );
    const completedProjects = fundedProjects.filter(
      (project) => project.status === "Completed"
    );

    // Calculate total project funding
    const totalProjectFunding = fundedProjects.reduce((sum, project) => {
      // Handle both string format ($250,000) and number format (250000)
      let budget = project.budget;
      if (typeof budget === "string") {
        // Remove $ and commas, convert to number
        budget = parseFloat(budget.replace(/[$,]/g, "")) || 0;
      }
      return sum + (budget || 0);
    }, 0);

    // Calculate award monetary values
    const totalAwardValue = fundedAwards.reduce((sum, award) => {
      return sum + (award.monetaryValue || 0);
    }, 0);

    // Total funding from both projects and awards
    const totalFunding = totalProjectFunding + totalAwardValue;

    const successRate = Math.round(
      (completedProjects.length / fundedProjects.length) * 100
    );

    return {
      totalFunding,
      activeFunding: activeProjects.reduce((sum, project) => {
        let budget = project.budget;
        if (typeof budget === "string") {
          budget = parseFloat(budget.replace(/[$,]/g, "")) || 0;
        }
        return sum + (budget || 0);
      }, 0),
      pendingRequests: 0, // No pending requests in display-only mode
      successRate: isNaN(successRate) ? 0 : successRate,
      activeGrants: activeProjects.length,
      completedGrants: completedProjects.length,
      totalRequested: 0, // No pending requests
      totalProjects: fundedProjects.length,
      totalAwards: fundedAwards.length,
      averageProjectBudget:
        Math.round(totalProjectFunding / fundedProjects.length) || 0,
      averageAwardValue: Math.round(totalAwardValue / fundedAwards.length) || 0,
    };
  }, [fundedProjects, fundedAwards]);

  // Helper functions
  const formatCurrency = useCallback((value) => {
    return typeof value === "number"
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
        }).format(value)
      : value;
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setStatusFilter(FILTER_ALL_VALUE);
    setCategoryFilter(FILTER_ALL_VALUE);
    setContentFilter(FILTER_ALL_VALUE);
  }, []);

  return (
    <Stack spacing={4} sx={{ pb: 6, pt: 4 }}>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ px: 1 }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontWeight: 700,
            fontSize: { xs: 28, md: 32 },
          }}
        >
          Funding Operations
        </Typography>
      </Stack>

      {/* Statistics Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {[
          {
            label: "Total Funding",
            value: formatCurrency(statistics.totalFunding),
            icon: <MonetizationOn />,
            color: "#4CAF50",
          },
          {
            label: "Success Rate",
            value: `${statistics.successRate}%`,
            icon: <ThumbUpAlt />,
            color: "#2196F3",
          },
          {
            label: "Pending Requests",
            value: statistics.pendingRequests,
            icon: <PendingActions />,
            color: "#FF9800",
          },
          {
            label: "Active Grants",
            value: statistics.activeGrants,
            icon: <TrendingUp />,
            color: "#9C27B0",
          },
        ].map((stat) => (
          <Box
            key={stat.label}
            sx={{
              p: 3,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${stat.color}12 0%, ${stat.color}06 100%)`,
              border: `1px solid ${stat.color}30`,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  backgroundColor: `${stat.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: stat.color,
                }}
              >
                {stat.icon}
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 24,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 14,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Stack>
          </Box>
        ))}
      </Box>

      {/* Filter Controls */}
      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          background: "rgba(255,255,255,0.02)",
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
                Search & Filter
              </Typography>
            </Stack>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              projects {filteredProjects.length} • fundedAwards{" "}
              {filteredAwards.length}
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            {/* Search */}
            <TextField
              placeholder="Search grants, projects, fundedAwards..."
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
                    borderColor: "#66BB6A",
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

            {/* Content Filter */}
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#66BB6A" },
                }}
              >
                Content
              </InputLabel>
              <Select
                value={contentFilter}
                onChange={(e) => setContentFilter(e.target.value)}
                label="Content"
                sx={{
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#66BB6A",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value={FILTER_ALL_VALUE}>All Content</MenuItem>
                <MenuItem value={CONTENT_TYPES.PROJECTS}>Projects</MenuItem>
                <MenuItem value={CONTENT_TYPES.fundedAwards}>
                  fundedAwards
                </MenuItem>
              </Select>
            </FormControl>

            {/* Status Filter */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#66BB6A" },
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
                    borderColor: "#66BB6A",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value={FILTER_ALL_VALUE}>All Status</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="received">Received</MenuItem>
              </Select>
            </FormControl>

            {/* Category Filter */}
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#66BB6A" },
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
                    borderColor: "#66BB6A",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value={FILTER_ALL_VALUE}>All Categories</MenuItem>
                <MenuItem value="Research Grant">Research Grant</MenuItem>
                <MenuItem value="Innovation Grant">Innovation Grant</MenuItem>
                <MenuItem value="Technology Development">
                  Technology Development
                </MenuItem>
                <MenuItem value="Research Excellence">
                  Research Excellence
                </MenuItem>
                <MenuItem value="Technology Innovation">
                  Technology Innovation
                </MenuItem>
                <MenuItem value="Academic Achievement">
                  Academic Achievement
                </MenuItem>
              </Select>
            </FormControl>

            {/* Clear Filters */}
            <Button
              onClick={clearFilters}
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

      {/* Funded Projects Section */}
      {(contentFilter === FILTER_ALL_VALUE ||
        contentFilter === CONTENT_TYPES.PROJECTS) && (
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: 600,
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Work sx={{ color: "#4CAF50" }} />
            Funded Projects
          </Typography>
          <Grid container spacing={3}>
            {filteredProjects.map((project, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    background:
                      "linear-gradient(135deg, #4CAF5012 0%, #4CAF5006 100%)",
                    border: "1px solid #4CAF5030",
                    borderRadius: 3,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "#4CAF5060",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                      {/* Project Title - Line 1 */}
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: 16,
                          lineHeight: 1.3,
                        }}
                      >
                        {project.title}
                      </Typography>

                      {/* Budget, Status, Complexity, Team Size - Line 2 */}
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        <Chip
                          icon={
                            <MonetizationOn
                              sx={{ fontSize: 16, color: "#fff !important" }}
                            />
                          }
                          label={formatCurrency(project.budget)}
                          size="small"
                          sx={{
                            backgroundColor: "#4CAF50",
                            color: "#fff",
                            fontWeight: 600,
                            "& .MuiChip-icon": {
                              marginLeft: "6px",
                              marginRight: "-2px",
                            },
                          }}
                        />
                        <Chip
                          label={project.budget}
                          size="small"
                          sx={{
                            backgroundColor: "#4CAF50",
                            color: "#fff",
                            fontWeight: 600,
                          }}
                        />
                        <Chip
                          label={project.status}
                          size="small"
                          sx={{
                            backgroundColor: "#2196F320",
                            color: "#2196F3",
                            border: "1px solid #2196F340",
                          }}
                        />
                        <Chip
                          label={project.complexity}
                          size="small"
                          sx={{
                            backgroundColor: "#FF980030",
                            color: "#FF9800",
                            border: "1px solid #FF980040",
                          }}
                        />
                        <Chip
                          label={project.teamSize}
                          size="small"
                          sx={{
                            backgroundColor: "#9C27B030",
                            color: "#9C27B0",
                            border: "1px solid #9C27B040",
                          }}
                        />
                      </Stack>

                      {/* Sponsor Organization, Start Date, End Date - Line 3 */}
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.7)",
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                      >
                        {project.sponsor} • {project.startDate} -{" "}
                        {project.endDate}
                      </Typography>

                      {/* Progress Bar - Line 4 */}
                      <Box>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          mb={1}
                        >
                          <Typography
                            sx={{
                              color: "rgba(255,255,255,0.6)",
                              fontSize: 12,
                            }}
                          >
                            Progress
                          </Typography>
                          <Typography
                            sx={{
                              color: "#4CAF50",
                              fontSize: 12,
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
                              backgroundColor: "#4CAF50",
                            },
                          }}
                        />
                      </Box>

                      {/* Description - Line 5 */}
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.8)",
                          fontSize: 13,
                          lineHeight: 1.4,
                        }}
                      >
                        {project.description}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* fundedAwards & Recognition Section */}
      {(contentFilter === FILTER_ALL_VALUE ||
        contentFilter === CONTENT_TYPES.fundedAwards) && (
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: 600,
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <EmojiEvents sx={{ color: "#FFD700" }} />
            fundedAwards & Recognition
          </Typography>
          <Grid container spacing={3}>
            {filteredAwards.map((award, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    background:
                      "linear-gradient(135deg, #FFD70012 0%, #FFD70006 100%)",
                    border: "1px solid #FFD70030",
                    borderRadius: 3,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "#FFD70060",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                      {/* Title Line */}
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: 16,
                          lineHeight: 1.3,
                        }}
                      >
                        {award.title}
                      </Typography>

                      {/* Monetary Value, Type, Prestige Level, Year Line */}
                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        alignItems="center"
                      >
                        <Chip
                          icon={
                            <MonetizationOn
                              sx={{ fontSize: 16, color: "#fff !important" }}
                            />
                          }
                          label={`$${award.monetaryValue.toLocaleString()}`}
                          size="small"
                          sx={{
                            backgroundColor: "#4CAF50",
                            color: "#fff",
                            fontWeight: 600,
                            "& .MuiChip-icon": {
                              marginLeft: "6px",
                              marginRight: "-2px",
                            },
                          }}
                        />
                        {award.monetaryValue > 0 && (
                          <Chip
                            label={`$${award.monetaryValue.toLocaleString()}`}
                            size="small"
                            sx={{
                              backgroundColor: "#4CAF50",
                              color: "#fff",
                              fontWeight: 600,
                            }}
                          />
                        )}
                        <Chip
                          label={award.type}
                          size="small"
                          sx={{
                            backgroundColor:
                              AWARD_TYPE_COLORS[award.type] || "#2196F3",
                            color: "#fff",
                            fontWeight: 500,
                          }}
                        />
                        <Chip
                          label={award.prestigeLevel}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(255, 215, 0, 0.2)",
                            color:
                              PRESTIGE_COLORS[award.prestigeLevel] || "#FFD700",
                            border: `1px solid ${
                              PRESTIGE_COLORS[award.prestigeLevel] || "#FFD700"
                            }`,
                            fontWeight: 500,
                          }}
                        />
                        <Chip
                          label={new Date(award.date).getFullYear()}
                          size="small"
                          sx={{
                            backgroundColor: "#9C27B020",
                            color: "#9C27B0",
                            border: "1px solid #9C27B040",
                            fontWeight: 500,
                          }}
                        />
                      </Stack>

                      {/* Organization Line */}
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.8)",
                          fontSize: 14,
                          fontWeight: 500,
                        }}
                      >
                        {award.organization}
                      </Typography>

                      {/* Description Line */}
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.7)",
                          fontSize: 13,
                          lineHeight: 1.4,
                        }}
                      >
                        {award.description}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Stack>
  );
};

export default Grants;
