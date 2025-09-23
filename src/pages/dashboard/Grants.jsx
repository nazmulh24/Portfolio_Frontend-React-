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
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Edit,
  Save,
  Cancel,
  Add,
  Close,
  Assessment,
  Science,
  Business,
  CheckCircle,
  Schedule,
  ExpandMore,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Grants = () => {
  const { dashboardData, handleEdit } = useOutletContext();
  const data = dashboardData?.grants;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    // Active Grants
    activeGrants: data?.activeGrants || [
      {
        id: 1,
        title: "AI-Powered Healthcare Analytics Platform Development",
        grantingOrganization: "National Science Foundation (NSF)",
        program: "Computer and Information Science and Engineering (CISE)",
        grantNumber: "NSF-2023-CISE-1847392",
        principalInvestigator: "Dr. Nazmul Hossain",
        coInvestigators: ["Dr. Sarah Johnson", "Dr. Michael Chen"],
        amount: 285000,
        duration: 36,
        startDate: "2023-09-01",
        endDate: "2026-08-31",
        status: "Active",
        category: "Research Grant",
        field: "Computer Science",
        description:
          "Development of machine learning algorithms for real-time analysis of healthcare data to improve patient outcomes and reduce hospital costs. The project focuses on creating interpretable AI models for clinical decision support systems.",
        objectives: [
          "Develop novel ML algorithms for healthcare data analysis",
          "Create interpretable AI models for clinical decision support",
          "Implement real-time processing capabilities",
          "Validate system performance in clinical settings",
          "Publish research findings in top-tier venues",
        ],
        deliverables: [
          "Open-source healthcare analytics platform",
          "Research publications (minimum 8 papers)",
          "Patent applications (2-3 pending)",
          "Clinical trial participation",
          "Student training and mentorship",
        ],
        progress: {
          completed: 65,
          milestones: [
            {
              name: "Literature Review",
              status: "Completed",
              date: "2023-11-15",
            },
            {
              name: "Algorithm Development",
              status: "Completed",
              date: "2024-03-20",
            },
            {
              name: "Prototype Implementation",
              status: "In Progress",
              date: "2024-09-30",
            },
            {
              name: "Clinical Testing",
              status: "Upcoming",
              date: "2025-01-15",
            },
            {
              name: "Final Evaluation",
              status: "Upcoming",
              date: "2025-12-01",
            },
          ],
        },
        budget: {
          personnel: 180000,
          equipment: 45000,
          travel: 15000,
          supplies: 25000,
          indirect: 20000,
        },
        publications: 3,
        students: 4,
      },
      {
        id: 2,
        title: "Sustainable Web Technologies Research Initiative",
        grantingOrganization: "Department of Energy (DOE)",
        program: "Energy Efficiency and Renewable Energy",
        grantNumber: "DOE-2024-EERE-WEB-5634",
        principalInvestigator: "Dr. Nazmul Hossain",
        coInvestigators: ["Dr. Emily Rodriguez"],
        amount: 125000,
        duration: 24,
        startDate: "2024-01-15",
        endDate: "2025-12-31",
        status: "Active",
        category: "Innovation Grant",
        field: "Green Technology",
        description:
          "Research into energy-efficient web technologies and sustainable software development practices. Focus on reducing carbon footprint of digital applications through optimized algorithms and resource management.",
        objectives: [
          "Analyze energy consumption of web technologies",
          "Develop energy-efficient algorithms",
          "Create sustainable development frameworks",
          "Measure environmental impact reduction",
          "Disseminate best practices to industry",
        ],
        deliverables: [
          "Energy measurement toolkit",
          "Sustainable development guidelines",
          "Industry case studies",
          "Open-source optimization tools",
          "Training workshops for developers",
        ],
        progress: {
          completed: 45,
          milestones: [
            {
              name: "Baseline Analysis",
              status: "Completed",
              date: "2024-04-01",
            },
            {
              name: "Tool Development",
              status: "In Progress",
              date: "2024-10-15",
            },
            { name: "Case Studies", status: "Upcoming", date: "2025-03-01" },
            { name: "Workshop Series", status: "Upcoming", date: "2025-08-15" },
          ],
        },
        budget: {
          personnel: 85000,
          equipment: 20000,
          travel: 8000,
          supplies: 7000,
          indirect: 5000,
        },
        publications: 1,
        students: 2,
      },
    ],

    // Completed Grants
    completedGrants: data?.completedGrants || [
      {
        id: 3,
        title: "Django Framework Enhancement Project",
        grantingOrganization: "Python Software Foundation",
        program: "Community Development Grants",
        grantNumber: "PSF-2022-CDG-0089",
        principalInvestigator: "Dr. Nazmul Hossain",
        amount: 35000,
        duration: 12,
        startDate: "2022-08-01",
        endDate: "2023-07-31",
        status: "Completed",
        category: "Community Grant",
        field: "Software Development",
        description:
          "Enhancement of Django framework capabilities for better performance and security. Project resulted in significant contributions to the Django core codebase and improved documentation.",
        outcomes: [
          "5 major Django core contributions",
          "Performance improvements (avg 25% faster)",
          "Security enhancements implemented",
          "Community documentation updates",
          "2 conference presentations",
        ],
        impact: {
          codeContributions: 156,
          communityReach: 25000,
          performanceGain: "25%",
          securityFixes: 8,
        },
        publications: 2,
        finalReport: "https://example.com/django-enhancement-final-report.pdf",
      },
      {
        id: 4,
        title: "Educational Technology Innovation Grant",
        grantingOrganization: "Gates Foundation",
        program: "Digital Learning Solutions",
        grantNumber: "GF-2021-DLS-4567",
        principalInvestigator: "Dr. Nazmul Hossain",
        coInvestigators: ["Dr. Lisa Wang"],
        amount: 95000,
        duration: 18,
        startDate: "2021-06-01",
        endDate: "2022-11-30",
        status: "Completed",
        category: "Education Grant",
        field: "Educational Technology",
        description:
          "Development of interactive learning platforms for computer science education. Created web-based tools to improve student engagement and learning outcomes in programming courses.",
        outcomes: [
          "Interactive coding platform launched",
          "Used by 5,000+ students across 50 institutions",
          "Student engagement increased by 40%",
          "Learning outcomes improved by 35%",
          "Open-source release with community adoption",
        ],
        impact: {
          studentsImpacted: 5000,
          institutionsReached: 50,
          engagementIncrease: "40%",
          learningImprovement: "35%",
        },
        publications: 4,
        finalReport: "https://example.com/edtech-innovation-final-report.pdf",
      },
    ],

    // Pending Applications
    pendingApplications: data?.pendingApplications || [
      {
        id: 5,
        title: "Quantum Computing for Web Security Applications",
        grantingOrganization: "National Security Agency (NSA)",
        program: "Cybersecurity Research Initiative",
        requestedAmount: 450000,
        duration: 48,
        submissionDate: "2024-08-15",
        reviewPeriod: "6 months",
        expectedDecision: "2025-02-15",
        status: "Under Review",
        category: "Security Research",
        field: "Quantum Computing",
        description:
          "Research into quantum-resistant cryptography for web applications and development of post-quantum security protocols for distributed systems.",
        reviewStage: "Technical Review",
        probability: "High",
        feedback: "Initial review positive, strong technical merit identified",
      },
      {
        id: 6,
        title: "AI Ethics and Transparency Framework Development",
        grantingOrganization: "Mozilla Foundation",
        program: "Responsible AI Initiative",
        requestedAmount: 180000,
        duration: 30,
        submissionDate: "2024-09-10",
        reviewPeriod: "4 months",
        expectedDecision: "2025-01-10",
        status: "Submitted",
        category: "Ethics Research",
        field: "AI Ethics",
        description:
          "Development of comprehensive frameworks for AI transparency and ethical decision-making in automated systems, with focus on web-based AI applications.",
        reviewStage: "Initial Review",
        probability: "Medium",
        feedback: "Application meets all criteria, competitive pool",
      },
    ],

    // Rejected Applications
    rejectedApplications: data?.rejectedApplications || [
      {
        id: 7,
        title: "Blockchain-Based Identity Management System",
        grantingOrganization: "European Research Council",
        program: "Digital Innovation Grants",
        requestedAmount: 320000,
        submissionDate: "2024-03-20",
        decisionDate: "2024-07-15",
        status: "Rejected",
        category: "Innovation Grant",
        field: "Blockchain Technology",
        feedback:
          "Strong technical approach but concerns about scalability and practical implementation timeline. Encouraged to resubmit with revised scope.",
        resubmissionPlan:
          "Revising scope and implementation timeline for Q1 2025 resubmission",
      },
    ],

    // Grant Statistics
    grantStats: data?.grantStats || {
      totalFunding: 540000,
      activeFunding: 410000,
      completedFunding: 130000,
      totalGrants: 6,
      activeGrants: 2,
      completedGrants: 2,
      pendingApplications: 2,
      rejectedApplications: 1,
      successRate: 75,
      averageGrantSize: 192500,
      totalStudentsSupported: 12,
      publicationsFromGrants: 10,
      patentsFromGrants: 2,
    },

    // Funding Categories
    fundingCategories: data?.fundingCategories || [
      "Research Grant",
      "Innovation Grant",
      "Community Grant",
      "Education Grant",
      "Security Research",
      "Ethics Research",
      "Technology Development",
      "Open Source",
      "Academic Research",
      "Industry Partnership",
    ],
  });

  const [saveAlert, setSaveAlert] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  const handleSave = () => {
    if (handleEdit) {
      handleEdit("grants", editedData);
    }
    setIsEditing(false);
    setSaveAlert({
      type: "success",
      message: "Grants section updated successfully!",
    });
    setTimeout(() => setSaveAlert(null), 3000);
  };

  const handleCancel = () => {
    setEditedData({
      activeGrants: data?.activeGrants || [],
      completedGrants: data?.completedGrants || [],
      pendingApplications: data?.pendingApplications || [],
      rejectedApplications: data?.rejectedApplications || [],
      grantStats: data?.grantStats || {},
      fundingCategories: data?.fundingCategories || [],
    });
    setIsEditing(false);
  };

  const addCategory = () => {
    if (newCategory.trim() && editedData.fundingCategories.length < 12) {
      setEditedData((prev) => ({
        ...prev,
        fundingCategories: [...prev.fundingCategories, newCategory.trim()],
      }));
      setNewCategory("");
    }
  };

  const removeCategory = (index) => {
    setEditedData((prev) => ({
      ...prev,
      fundingCategories: prev.fundingCategories.filter((_, i) => i !== index),
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

  // Reusable Grant Card Component
  const GrantCard = ({ icon, title, description, children, hover = true }) => (
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

  // Get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "#4CAF50";
      case "completed":
        return "#2196F3";
      case "under review":
        return "#FF9800";
      case "submitted":
        return "#9C27B0";
      case "rejected":
        return "#f44336";
      default:
        return "#888";
    }
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      "Research Grant": "#2196F3",
      "Innovation Grant": "#9C27B0",
      "Community Grant": "#4CAF50",
      "Education Grant": "#FF9800",
      "Security Research": "#f44336",
      "Ethics Research": "#00BCD4",
      "Technology Development": "#795548",
      "Open Source": "#607D8B",
      "Academic Research": "#3F51B5",
      "Industry Partnership": "#E91E63",
    };
    return colors[category] || "#888";
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ paddingBottom: "2rem" }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 600 }}>
          Grants & Funding
        </Typography>
        <Typography variant="body1" sx={{ color: "#888" }}>
          Research grants, funding applications, and financial support for
          projects
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
        <GrantCard hover={false}>
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
                Grants Management
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Research funding, grant applications, and project financial
                support
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
                Edit Grants
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
        </GrantCard>
      </motion.div>

      {/* Grant Statistics Overview */}
      <motion.div variants={itemVariants}>
        <GrantCard
          icon={<Assessment />}
          title="Funding Overview"
          description="Comprehensive statistics and funding portfolio metrics"
        >
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#4CAF50", fontWeight: 700 }}
                >
                  {formatCurrency(editedData.grantStats.totalFunding)}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Total Funding
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#2196F3", fontWeight: 700 }}
                >
                  {editedData.grantStats.activeGrants}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Active Grants
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#FF9800", fontWeight: 700 }}
                >
                  {editedData.grantStats.successRate}%
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Success Rate
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#9C27B0", fontWeight: 700 }}
                >
                  {editedData.grantStats.totalStudentsSupported}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Students Supported
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Additional Metrics */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#00BCD4", fontWeight: 600 }}
                >
                  {formatCurrency(editedData.grantStats.averageGrantSize)}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Avg Grant Size
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#E91E63", fontWeight: 600 }}
                >
                  {editedData.grantStats.publicationsFromGrants}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Publications
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#795548", fontWeight: 600 }}
                >
                  {editedData.grantStats.patentsFromGrants}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Patents
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#607D8B", fontWeight: 600 }}
                >
                  {editedData.grantStats.pendingApplications}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Pending Apps
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </GrantCard>
      </motion.div>

      {/* Active Grants */}
      <motion.div variants={itemVariants}>
        <GrantCard
          icon={<CheckCircle />}
          title="Active Grants"
          description="Currently funded research projects and ongoing grants"
        >
          {editedData.activeGrants.map((grant, index) => (
            <Accordion
              key={grant.id}
              sx={{
                backgroundColor: "rgba(76, 175, 80, 0.05)",
                border: "1px solid rgba(76, 175, 80, 0.2)",
                borderRadius: 2,
                mb: 2,
                "&:before": { display: "none" },
                "&.Mui-expanded": {
                  margin: "0 0 16px 0",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: "#4CAF50" }} />}
                sx={{ p: 3 }}
              >
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: "#fff", fontWeight: 600, flex: 1, mr: 2 }}
                    >
                      {grant.title}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
                      <Chip
                        label={grant.status}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(76, 175, 80, 0.2)",
                          color: "#4CAF50",
                          fontWeight: 600,
                        }}
                      />
                      <Chip
                        label={formatCurrency(grant.amount)}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(255, 193, 7, 0.2)",
                          color: "#FFC107",
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  </Box>

                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#4CAF50", mb: 1 }}
                  >
                    {grant.grantingOrganization} • {grant.program}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      {grant.startDate} - {grant.endDate} ({grant.duration}{" "}
                      months)
                    </Typography>
                    <Chip
                      label={grant.category}
                      size="small"
                      sx={{
                        backgroundColor: `${getCategoryColor(
                          grant.category
                        )}20`,
                        color: getCategoryColor(grant.category),
                        fontWeight: 500,
                      }}
                    />
                  </Box>

                  {/* Progress Bar */}
                  <Box sx={{ width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        Progress
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#4CAF50", fontWeight: 600 }}
                      >
                        {grant.progress.completed}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={grant.progress.completed}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 4,
                          backgroundColor: "#4CAF50",
                        },
                      }}
                    />
                  </Box>
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ p: 3, pt: 0 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "#fff", lineHeight: 1.6, mb: 3 }}
                >
                  {grant.description}
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#4CAF50", mb: 2, fontWeight: 600 }}
                    >
                      Project Team
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", fontWeight: 600 }}
                      >
                        Principal Investigator
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        {grant.principalInvestigator}
                      </Typography>
                    </Box>
                    {grant.coInvestigators.length > 0 && (
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ color: "#fff", fontWeight: 600 }}
                        >
                          Co-Investigators
                        </Typography>
                        {grant.coInvestigators.map((co, idx) => (
                          <Typography
                            key={idx}
                            variant="body2"
                            sx={{ color: "#888" }}
                          >
                            {co}
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#4CAF50", mb: 2, fontWeight: 600 }}
                    >
                      Budget Breakdown
                    </Typography>
                    <Grid container spacing={1}>
                      {Object.entries(grant.budget).map(
                        ([category, amount], idx) => (
                          <Grid item xs={6} key={idx}>
                            <Typography
                              variant="body2"
                              sx={{ color: "#fff", fontWeight: 600 }}
                            >
                              {formatCurrency(amount)}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "#888" }}
                            >
                              {category.charAt(0).toUpperCase() +
                                category.slice(1)}
                            </Typography>
                          </Grid>
                        )
                      )}
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#4CAF50", mb: 2, fontWeight: 600 }}
                    >
                      Project Milestones
                    </Typography>
                    <Grid container spacing={2}>
                      {grant.progress.milestones.map((milestone, idx) => (
                        <Grid item xs={12} md={6} key={idx}>
                          <Box
                            sx={{
                              p: 2,
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                              borderRadius: 2,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ color: "#fff", fontWeight: 600 }}
                              >
                                {milestone.name}
                              </Typography>
                              <Chip
                                label={milestone.status}
                                size="small"
                                sx={{
                                  backgroundColor:
                                    milestone.status === "Completed"
                                      ? "rgba(76, 175, 80, 0.2)"
                                      : milestone.status === "In Progress"
                                      ? "rgba(255, 152, 0, 0.2)"
                                      : "rgba(158, 158, 158, 0.2)",
                                  color:
                                    milestone.status === "Completed"
                                      ? "#4CAF50"
                                      : milestone.status === "In Progress"
                                      ? "#FF9800"
                                      : "#9E9E9E",
                                  fontWeight: 500,
                                }}
                              />
                            </Box>
                            <Typography
                              variant="caption"
                              sx={{ color: "#888" }}
                            >
                              Target: {milestone.date}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 3,
                        alignItems: "center",
                        mt: 2,
                      }}
                    >
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        Grant #{grant.grantNumber}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        {grant.publications} Publications
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        {grant.students} Students Supported
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </GrantCard>
      </motion.div>

      {/* Completed Grants */}
      <motion.div variants={itemVariants}>
        <GrantCard
          icon={<Science />}
          title="Completed Grants"
          description="Successfully completed projects and their outcomes"
        >
          {editedData.completedGrants.map((grant, index) => (
            <Box
              key={grant.id}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "rgba(33, 150, 243, 0.05)",
                border: "1px solid rgba(33, 150, 243, 0.2)",
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
                <Typography
                  variant="h6"
                  sx={{ color: "#fff", fontWeight: 600, flex: 1, mr: 2 }}
                >
                  {grant.title}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
                  <Chip
                    label={grant.status}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(33, 150, 243, 0.2)",
                      color: "#2196F3",
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    label={formatCurrency(grant.amount)}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255, 193, 7, 0.2)",
                      color: "#FFC107",
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Box>

              <Typography variant="subtitle2" sx={{ color: "#2196F3", mb: 1 }}>
                {grant.grantingOrganization} • {grant.program}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 3 }}
              >
                {grant.description}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#2196F3", mb: 1, fontWeight: 600 }}
                >
                  Key Outcomes
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {grant.outcomes.map((outcome, idx) => (
                    <Chip
                      key={idx}
                      label={outcome}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(76, 175, 80, 0.2)",
                        color: "#4CAF50",
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Grid container spacing={2}>
                {grant.impact && (
                  <Grid item xs={12} md={8}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#2196F3", mb: 1, fontWeight: 600 }}
                    >
                      Project Impact
                    </Typography>
                    <Grid container spacing={2}>
                      {Object.entries(grant.impact).map(([key, value], idx) => (
                        <Grid item xs={6} key={idx}>
                          <Typography
                            variant="body2"
                            sx={{ color: "#fff", fontWeight: 600 }}
                          >
                            {value}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#888" }}>
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                )}

                <Grid item xs={12} md={4}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      Duration: {grant.startDate} - {grant.endDate}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      Publications: {grant.publications}
                    </Typography>
                    {grant.finalReport && (
                      <Link
                        href={grant.finalReport}
                        target="_blank"
                        sx={{ color: "#2196F3", fontSize: "0.875rem" }}
                      >
                        View Final Report
                      </Link>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </GrantCard>
      </motion.div>

      {/* Pending Applications */}
      <motion.div variants={itemVariants}>
        <GrantCard
          icon={<Schedule />}
          title="Pending Applications"
          description="Grant applications currently under review"
        >
          {editedData.pendingApplications.map((application, index) => (
            <Box
              key={application.id}
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
                <Typography
                  variant="h6"
                  sx={{ color: "#fff", fontWeight: 600, flex: 1, mr: 2 }}
                >
                  {application.title}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
                  <Chip
                    label={application.status}
                    size="small"
                    sx={{
                      backgroundColor: `${getStatusColor(
                        application.status
                      )}20`,
                      color: getStatusColor(application.status),
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    label={formatCurrency(application.requestedAmount)}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255, 193, 7, 0.2)",
                      color: "#FFC107",
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Box>

              <Typography variant="subtitle2" sx={{ color: "#FF9800", mb: 1 }}>
                {application.grantingOrganization} • {application.program}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 3 }}
              >
                {application.description}
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#FF9800", mb: 1, fontWeight: 600 }}
                  >
                    Application Timeline
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      Submitted: {application.submissionDate}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      Review Period: {application.reviewPeriod}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      Expected Decision: {application.expectedDecision}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#FF9800", mb: 1, fontWeight: 600 }}
                  >
                    Review Status
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Chip
                      label={application.reviewStage}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(156, 39, 176, 0.2)",
                        color: "#9C27B0",
                        fontWeight: 600,
                        alignSelf: "flex-start",
                      }}
                    />
                    <Chip
                      label={`${application.probability} Probability`}
                      size="small"
                      sx={{
                        backgroundColor:
                          application.probability === "High"
                            ? "rgba(76, 175, 80, 0.2)"
                            : "rgba(255, 152, 0, 0.2)",
                        color:
                          application.probability === "High"
                            ? "#4CAF50"
                            : "#FF9800",
                        fontWeight: 600,
                        alignSelf: "flex-start",
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#FF9800", mb: 1, fontWeight: 600 }}
                  >
                    Feedback
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#fff", fontStyle: "italic" }}
                  >
                    "{application.feedback}"
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </GrantCard>
      </motion.div>

      {/* Funding Categories */}
      <motion.div variants={itemVariants}>
        <GrantCard
          icon={<Business />}
          title="Funding Categories"
          description="Grant types and funding areas of expertise"
        >
          <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
            Max 12 funding categories
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {editedData.fundingCategories.map((category, index) => (
              <Chip
                key={index}
                label={category}
                onDelete={isEditing ? () => removeCategory(index) : undefined}
                deleteIcon={isEditing ? <Close /> : undefined}
                sx={{
                  backgroundColor: `${getCategoryColor(category)}20`,
                  color: getCategoryColor(category),
                  border: `1px solid ${getCategoryColor(category)}50`,
                  fontWeight: 600,
                  "& .MuiChip-deleteIcon": {
                    color: getCategoryColor(category),
                    "&:hover": { opacity: 0.8 },
                  },
                }}
              />
            ))}
          </Box>

          {isEditing && editedData.fundingCategories.length < 12 && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Add new funding category"
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
        </GrantCard>
      </motion.div>
    </motion.div>
  );
};

export default Grants;
