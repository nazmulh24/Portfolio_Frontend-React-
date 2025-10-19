import React, { useState, useMemo, useCallback } from "react";
// import { useOutletContext } from "react-router-dom";
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
  IconButton,
  LinearProgress,
} from "@mui/material";
import {
  Add,
  Search,
  FilterList,
  Clear,
  Edit,
  Delete,
  MonetizationOn,
  PendingActions,
  ThumbUpAlt,
  TrendingUp,
  CalendarToday,
  Timeline,
  People,
  Launch,
  Assessment,
  CheckCircle,
  HourglassEmpty,
  Cancel,
  EmojiEvents,
} from "@mui/icons-material";

// Constants
const FILTER_ALL_VALUE = "all";

const GRANT_TYPES = {
  ACTIVE: "active",
  COMPLETED: "completed", 
  PENDING: "pending",
  REJECTED: "rejected",
};

const GRANT_STATUS = {
  ACTIVE: "Active",
  COMPLETED: "Completed",
  PENDING: "Pending",
  REJECTED: "Rejected",
  IN_PROGRESS: "In Progress",
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
};

const TYPE_COLORS = {
  active: "#4CAF50",
  completed: "#2196F3",
  pending: "#FF9800",
  rejected: "#F44336",
};

const STATUS_COLORS = {
  "Active": "#4CAF50",
  "Completed": "#2196F3",
  "Pending": "#FF9800",
  "Rejected": "#F44336",
  "In Progress": "#4CAF50",
  "Submitted": "#FF9800",
  "Under Review": "#9C27B0",
};

const CATEGORY_COLORS = {
  "Research Grant": "#4CAF50",
  "Innovation Grant": "#2196F3",
  "Community Grant": "#FF9800",
  "Education Grant": "#9C27B0",
  "Security Research": "#F44336",
  "Ethics Research": "#795548",
  "Technology Development": "#00BCD4",
  "Industry Partnership": "#E91E63",
};

const Grants = () => {
  // const { dashboardData } = useOutletContext();

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState(FILTER_ALL_VALUE);
  const [statusFilter, setStatusFilter] = useState(FILTER_ALL_VALUE);
  const [categoryFilter, setCategoryFilter] = useState(FILTER_ALL_VALUE);

  // Grants data with comprehensive examples
  const allGrants = useMemo(() => {
    return [
      {
        id: 1,
        title: "AI-Powered Healthcare Analytics Platform",
        sponsor: "National Science Foundation",
        program: "Computer and Information Science and Engineering (CISE)",
        grantNumber: "NSF-1847392",
        type: GRANT_TYPES.ACTIVE,
        status: GRANT_STATUS.IN_PROGRESS,
        category: "Research Grant",
        amount: 285000,
        startDate: "2023-09-01",
        endDate: "2026-08-31",
        durationMonths: 36,
        progress: 65,
        description: "Building interpretable ML pipelines for real-time clinical decision support systems with focus on bias mitigation and transparency in healthcare AI applications.",
        principalInvestigator: "Dr. Nazmul Hossain",
        coInvestigators: ["Dr. Sarah Johnson", "Dr. Michael Chen", "Dr. Emily Rodriguez"],
        budget: {
          personnel: 180000,
          equipment: 45000,
          travel: 15000,
          supplies: 25000,
          indirect: 20000,
        },
        objectives: [
          "Deploy real-time analytics pipeline",
          "Publish 8 peer-reviewed papers", 
          "File two patent disclosures",
          "Train 15 graduate students",
        ],
        milestones: [
          {
            title: "Prototype implementation",
            status: "In Progress",
            dueDate: "2024-09-30",
            completion: 80,
          },
          {
            title: "Clinical testing phase",
            status: "Upcoming",
            dueDate: "2025-01-15", 
            completion: 0,
          },
          {
            title: "Publication and dissemination",
            status: "Upcoming",
            dueDate: "2025-06-30",
            completion: 0,
          },
        ],
        outputs: {
          publications: 3,
          students: 4,
          patents: 1,
          presentations: 8,
        },
        featured: true,
      },
      {
        id: 2,
        title: "Sustainable Web Technologies Initiative",
        sponsor: "Department of Energy",
        program: "Energy Efficiency and Renewable Energy (EERE)",
        grantNumber: "DOE-5634",
        type: GRANT_TYPES.ACTIVE,
        status: GRANT_STATUS.IN_PROGRESS,
        category: "Innovation Grant",
        amount: 125000,
        startDate: "2024-01-15",
        endDate: "2025-12-31",
        durationMonths: 24,
        progress: 45,
        description: "Optimizing digital products to reduce operational carbon footprint and energy usage through advanced web performance techniques and green computing practices.",
        principalInvestigator: "Dr. Nazmul Hossain",
        coInvestigators: ["Dr. Emily Rodriguez", "Dr. James Wilson"],
        budget: {
          personnel: 85000,
          equipment: 20000,
          travel: 8000,
          supplies: 7000,
          indirect: 5000,
        },
        objectives: [
          "Publish sustainability playbook",
          "Train 100 developers",
          "Open-source measurement toolkit",
          "Reduce web carbon by 30%",
        ],
        milestones: [
          {
            title: "Tooling beta release",
            status: "In Progress",
            dueDate: "2024-10-15",
            completion: 60,
          },
          {
            title: "Industry pilot programs",
            status: "Upcoming",
            dueDate: "2025-03-01",
            completion: 0,
          },
        ],
        outputs: {
          publications: 1,
          students: 2,
          patents: 0,
          presentations: 4,
        },
      },
      {
        id: 3,
        title: "Django Framework Security Enhancement",
        sponsor: "Python Software Foundation",
        program: "Community Development Grant",
        type: GRANT_TYPES.COMPLETED,
        status: GRANT_STATUS.COMPLETED,
        category: "Community Grant",
        amount: 35000,
        completionYear: 2023,
        duration: "12 months (2022-2023)",
        description: "Enhanced Django framework security features and community documentation, focusing on authentication, authorization, and data protection mechanisms.",
        principalInvestigator: "Dr. Nazmul Hossain",
        coInvestigators: ["Dr. Lisa Park"],
        achievements: [
          "5 core security contributions merged",
          "Average performance improvement +25%",
          "Critical security advisories resolved",
          "Community adoption rate +40%",
        ],
        impact: [
          "Reached 25,000+ community members",
          "Delivered 2 global conference talks",
          "Released comprehensive docs refresh",
          "Influenced Django 4.2 LTS release",
        ],
        outputs: {
          publications: 2,
          students: 1,
          patents: 0,
          presentations: 3,
        },
        reportUrl: "/reports/django-enhancement-final-report.pdf",
      },
      {
        id: 4,
        title: "Educational Technology Innovation Lab",
        sponsor: "Gates Foundation",
        program: "Digital Learning Solutions Initiative",
        type: GRANT_TYPES.COMPLETED,
        status: GRANT_STATUS.COMPLETED,
        category: "Education Grant",
        amount: 95000,
        completionYear: 2022,
        duration: "18 months (2021-2022)",
        description: "Developed interactive coding laboratory platform for K-12 education, focusing on computational thinking and programming fundamentals for underserved communities.",
        principalInvestigator: "Dr. Nazmul Hossain",
        coInvestigators: ["Dr. Maria Santos", "Dr. Robert Kim"],
        achievements: [
          "Launched interactive coding lab platform",
          "5,000+ students onboarded across 50 institutions", 
          "Student engagement uplift of 40%",
          "Teacher satisfaction rating 4.8/5",
        ],
        impact: [
          "Learning outcomes improved by 35%",
          "Open-source adoption across 12 school districts",
          "Four publications in education technology journals",
          "Platform scaled to 3 additional states",
        ],
        outputs: {
          publications: 4,
          students: 6,
          patents: 0,
          presentations: 5,
        },
        reportUrl: "/reports/edtech-innovation-final-report.pdf",
        featured: true,
      },
      {
        id: 5,
        title: "Quantum Computing for Web Security",
        sponsor: "National Security Agency",
        program: "Cybersecurity Research Initiative",
        type: GRANT_TYPES.PENDING,
        status: GRANT_STATUS.UNDER_REVIEW,
        category: "Security Research",
        requestedAmount: 450000,
        submissionDate: "2024-08-15",
        decisionDate: "2025-02-15",
        reviewStage: "Technical Review Panel",
        probability: "High",
        description: "Investigating quantum-resistant cryptographic protocols for next-generation web applications, with focus on post-quantum security implementations and performance optimization.",
        principalInvestigator: "Dr. Nazmul Hossain",
        coInvestigators: ["Dr. Alexandra Chen", "Dr. David Thompson"],
        proposedDuration: "36 months",
        reviewNotes: "Panel noted strong technical merit and innovative approach. Requested expanded deployment roadmap for government systems integration.",
        objectives: [
          "Develop quantum-resistant protocols",
          "Create security testing framework",
          "Publish 6 peer-reviewed papers",
          "Train 8 PhD students",
        ],
      },
      {
        id: 6,
        title: "AI Ethics & Transparency Framework",
        sponsor: "Mozilla Foundation", 
        program: "Responsible AI Initiative",
        type: GRANT_TYPES.PENDING,
        status: GRANT_STATUS.SUBMITTED,
        category: "Ethics Research",
        requestedAmount: 180000,
        submissionDate: "2024-09-10",
        decisionDate: "2025-01-10", 
        reviewStage: "Initial Review",
        probability: "Medium",
        description: "Developing comprehensive framework for AI transparency and ethical decision-making in web applications, with focus on algorithmic accountability and user trust.",
        principalInvestigator: "Dr. Nazmul Hossain",
        coInvestigators: ["Dr. Sarah Mitchell"],
        proposedDuration: "24 months",
        reviewNotes: "Meets criteria with compelling case studies. Reviewers noted competitive cohort for final funding round. Strong alignment with foundation priorities.",
        objectives: [
          "Create AI ethics assessment tools",
          "Develop transparency guidelines",
          "Train 50 industry professionals", 
          "Establish best practices framework",
        ],
      },
      {
        id: 7,
        title: "Machine Learning Model Interpretability",
        sponsor: "National Institute of Standards and Technology",
        program: "AI Risk Management Framework",
        type: GRANT_TYPES.ACTIVE,
        status: GRANT_STATUS.IN_PROGRESS,
        category: "Technology Development",
        amount: 215000,
        startDate: "2024-03-01",
        endDate: "2027-02-28",
        durationMonths: 36,
        progress: 25,
        description: "Developing standardized methods for ML model interpretability and explainability in critical applications, with focus on healthcare and finance sectors.",
        principalInvestigator: "Dr. Nazmul Hossain",
        coInvestigators: ["Dr. Jennifer Liu", "Dr. Mark Anderson"],
        budget: {
          personnel: 140000,
          equipment: 35000,
          travel: 20000,
          supplies: 15000,
          indirect: 5000,
        },
        objectives: [
          "Develop interpretability standards",
          "Create evaluation benchmarks", 
          "Publish technical specifications",
          "Industry pilot implementations",
        ],
        milestones: [
          {
            title: "Literature review and gap analysis",
            status: "Completed",
            dueDate: "2024-06-30",
            completion: 100,
          },
          {
            title: "Framework development",
            status: "In Progress", 
            dueDate: "2024-12-31",
            completion: 40,
          },
        ],
        outputs: {
          publications: 0,
          students: 3,
          patents: 0,
          presentations: 2,
        },
      },
      {
        id: 8,
        title: "Blockchain Identity Management System",
        sponsor: "European Research Council",
        program: "Digital Innovation Grants",
        type: GRANT_TYPES.REJECTED,
        status: GRANT_STATUS.REJECTED,
        category: "Technology Development",
        requestedAmount: 320000,
        submissionDate: "2024-05-15",
        decisionDate: "2024-07-15",
        description: "Proposed development of decentralized identity management system using blockchain technology for secure web authentication and authorization.",
        principalInvestigator: "Dr. Nazmul Hossain",
        coInvestigators: ["Dr. Thomas Brown"],
        proposedDuration: "30 months",
        rejectionReason: "Scope considered overly ambitious relative to proposed timeline. Technical feasibility concerns raised by review panel.",
        lessonLearned: "Rescoping MVP approach for Q1 2025 resubmission with municipal government partner. Focus on specific use case validation.",
        resubmissionPlan: "Targeting smaller proof-of-concept with city government partnership for Q1 2025 submission cycle.",
      },
    ];
  }, []);

  // Get unique filter options
  const uniqueTypes = useMemo(() => {
    return [...new Set(allGrants.map(grant => grant.type))].sort();
  }, [allGrants]);

  const uniqueStatuses = useMemo(() => {
    return [...new Set(allGrants.map(grant => grant.status))].sort();
  }, [allGrants]);

  const uniqueCategories = useMemo(() => {
    return [...new Set(allGrants.map(grant => grant.category))].sort();
  }, [allGrants]);

  // Filter grants
  const filteredGrants = useMemo(() => {
    return allGrants.filter(grant => {
      const matchesSearch = searchTerm === "" ||
        grant.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grant.sponsor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grant.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grant.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grant.program?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === FILTER_ALL_VALUE || grant.type === typeFilter;
      const matchesStatus = statusFilter === FILTER_ALL_VALUE || grant.status === statusFilter;
      const matchesCategory = categoryFilter === FILTER_ALL_VALUE || grant.category === categoryFilter;
      
      return matchesSearch && matchesType && matchesStatus && matchesCategory;
    });
  }, [allGrants, searchTerm, typeFilter, statusFilter, categoryFilter]);

  // Calculate comprehensive statistics
  const statistics = useMemo(() => {
    const activeGrants = allGrants.filter(grant => grant.type === GRANT_TYPES.ACTIVE);
    const completedGrants = allGrants.filter(grant => grant.type === GRANT_TYPES.COMPLETED);
    const pendingGrants = allGrants.filter(grant => grant.type === GRANT_TYPES.PENDING);
    
    const totalFunding = activeGrants.reduce((sum, grant) => sum + (grant.amount || 0), 0) +
                        completedGrants.reduce((sum, grant) => sum + (grant.amount || 0), 0);
    
    const totalRequested = pendingGrants.reduce((sum, grant) => sum + (grant.requestedAmount || 0), 0);
    
    const successfulGrants = activeGrants.length + completedGrants.length;
    const totalApplications = allGrants.filter(grant => grant.type !== GRANT_TYPES.ACTIVE || grant.type === GRANT_TYPES.COMPLETED).length;
    const successRate = totalApplications > 0 ? Math.round((successfulGrants / (totalApplications + pendingGrants.length)) * 100) : 0;

    return {
      totalFunding,
      activeFunding: activeGrants.reduce((sum, grant) => sum + (grant.amount || 0), 0),
      pendingRequests: pendingGrants.length,
      successRate,
      activeGrants: activeGrants.length,
      completedGrants: completedGrants.length,
      totalRequested,
    };
  }, [allGrants]);

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

  const getTypeIcon = useCallback((type) => {
    const icons = {
      active: <CheckCircle />,
      completed: <EmojiEvents />,
      pending: <HourglassEmpty />,
      rejected: <Cancel />,
    };
    return icons[type] || <Assessment />;
  }, []);

  const getTypeColor = useCallback((type) => {
    return TYPE_COLORS[type] || TYPE_COLORS.active;
  }, []);

  const getStatusColor = useCallback((status) => {
    return STATUS_COLORS[status] || STATUS_COLORS.Active;
  }, []);

  const getCategoryColor = useCallback((category) => {
    return CATEGORY_COLORS[category] || CATEGORY_COLORS["Research Grant"];
  }, []);

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setTypeFilter(FILTER_ALL_VALUE);
    setStatusFilter(FILTER_ALL_VALUE);
    setCategoryFilter(FILTER_ALL_VALUE);
  }, []);

  const handleAddGrant = useCallback(() => {
    console.log("Add Grant clicked");
  }, []);

  const handleEditGrant = useCallback((grant) => {
    console.log("Edit Grant:", grant);
  }, []);

  const handleDeleteGrant = useCallback((grant) => {
    if (window.confirm(`Are you sure you want to delete "${grant.title}"?`)) {
      console.log("Delete Grant:", grant);
    }
  }, []);

  return (
    <Stack spacing={4} sx={{ pb: 6, pt: 4 }}>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
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
        <Button
          onClick={handleAddGrant}
          sx={{
            background: "#66BB6A",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#81C784",
            },
          }}
        >
          <Add fontSize="small" />
          Add Grant
        </Button>
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
                Filter Grants
              </Typography>
            </Stack>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {filteredGrants.length} of {allGrants.length}
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            {/* Search */}
            <TextField
              placeholder="Search grants, sponsors, or programs..."
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

            {/* Type Filter */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#66BB6A" },
                }}
              >
                Type
              </InputLabel>
              <Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                label="Type"
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
                <MenuItem value={FILTER_ALL_VALUE}>All Types</MenuItem>
                {uniqueTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Status Filter */}
            <FormControl size="small" sx={{ minWidth: 140 }}>
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
                {uniqueStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
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
                {uniqueCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
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

      {/* Grants List */}
      {filteredGrants.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 8,
            px: 4,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 18,
              fontWeight: 600,
              mb: 1,
            }}
          >
            No Grants Found
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 14,
              maxWidth: 400,
              lineHeight: 1.6,
            }}
          >
            Try adjusting your search terms or filters to find the grants you're looking for.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={3}>
          {filteredGrants.map((grant) => (
            <Box
              key={grant.id}
              sx={{
                p: 3,
                borderRadius: 4,
                background: `linear-gradient(135deg, ${getTypeColor(grant.type)}12 0%, ${getTypeColor(grant.type)}06 100%)`,
                border: `1px solid ${getTypeColor(grant.type)}30`,
                position: "relative",
                transition: "all 160ms ease",
                "&:hover": {
                  borderColor: `${getTypeColor(grant.type)}60`,
                  transform: "translateY(-2px)",
                  boxShadow: `0 8px 32px ${getTypeColor(grant.type)}20`,
                },
              }}
            >
              <Stack spacing={2.5}>
                {/* Header */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="flex-start"
                    sx={{ flex: 1 }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        backgroundColor: `${getTypeColor(grant.type)}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: getTypeColor(grant.type),
                        mt: 0.5,
                      }}
                    >
                      {getTypeIcon(grant.type)}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: 18,
                          lineHeight: 1.3,
                          mb: 1,
                        }}
                      >
                        {grant.title}
                        {grant.featured && (
                          <EmojiEvents sx={{ ml: 1, fontSize: 18, color: "#FFD700" }} />
                        )}
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.7)",
                          fontSize: 14,
                          mb: 1,
                        }}
                      >
                        {grant.sponsor} • {grant.program}
                        {grant.grantNumber && ` • ${grant.grantNumber}`}
                      </Typography>

                      {/* Grant Info */}
                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        alignItems="center"
                      >
                        <Chip
                          label={grant.type.charAt(0).toUpperCase() + grant.type.slice(1)}
                          size="small"
                          sx={{
                            backgroundColor: `${getTypeColor(grant.type)}20`,
                            color: getTypeColor(grant.type),
                            fontWeight: 600,
                            fontSize: 12,
                            border: `1px solid ${getTypeColor(grant.type)}40`,
                          }}
                        />
                        <Chip
                          label={grant.status}
                          size="small"
                          sx={{
                            backgroundColor: `${getStatusColor(grant.status)}20`,
                            color: getStatusColor(grant.status),
                            fontWeight: 600,
                            fontSize: 12,
                            border: `1px solid ${getStatusColor(grant.status)}40`,
                          }}
                        />
                        <Chip
                          label={grant.category}
                          size="small"
                          sx={{
                            backgroundColor: `${getCategoryColor(grant.category)}20`,
                            color: getCategoryColor(grant.category),
                            fontWeight: 600,
                            fontSize: 12,
                            border: `1px solid ${getCategoryColor(grant.category)}40`,
                          }}
                        />
                        <Chip
                          startIcon={<MonetizationOn fontSize="small" />}
                          label={formatCurrency(grant.amount || grant.requestedAmount)}
                          size="small"
                          sx={{
                            backgroundColor: "#4CAF50",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: 12,
                          }}
                        />
                      </Stack>
                    </Box>
                  </Stack>

                  {/* Action Buttons */}
                  <Stack direction="row" spacing={0.5}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditGrant(grant);
                      }}
                      size="small"
                      sx={{
                        color: "rgba(255,255,255,0.6)",
                        "&:hover": {
                          color: "#90CAF9",
                          backgroundColor: "rgba(33,150,243,0.1)",
                        },
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteGrant(grant);
                      }}
                      size="small"
                      sx={{
                        color: "rgba(255,255,255,0.6)",
                        "&:hover": {
                          color: "#F48FB1",
                          backgroundColor: "rgba(233,30,99,0.1)",
                        },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>

                {/* Description */}
                {grant.description && (
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: 14,
                      lineHeight: 1.6,
                    }}
                  >
                    {grant.description}
                  </Typography>
                )}

                {/* Principal Investigator & Team */}
                <Stack spacing={1}>
                  {grant.principalInvestigator && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <People sx={{ color: "#4CAF50", fontSize: 16 }} />
                      <Typography
                        sx={{
                          color: "#4CAF50",
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        PI: {grant.principalInvestigator}
                      </Typography>
                    </Box>
                  )}
                  {grant.coInvestigators && grant.coInvestigators.length > 0 && (
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.6)",
                        fontSize: 13,
                        ml: 3,
                      }}
                    >
                      Co-Is: {grant.coInvestigators.join(", ")}
                    </Typography>
                  )}
                </Stack>

                {/* Dates and Progress */}
                <Stack direction="row" spacing={3} flexWrap="wrap">
                  {grant.startDate && grant.endDate && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarToday sx={{ color: "#2196F3", fontSize: 16 }} />
                      <Typography
                        sx={{
                          color: "#2196F3",
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        {formatDate(grant.startDate)} → {formatDate(grant.endDate)}
                      </Typography>
                    </Box>
                  )}
                  {grant.durationMonths && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Timeline sx={{ color: "#FF9800", fontSize: 16 }} />
                      <Typography
                        sx={{
                          color: "#FF9800",
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        {grant.durationMonths} months
                      </Typography>
                    </Box>
                  )}
                </Stack>

                {/* Progress Bar for Active Grants */}
                {grant.type === GRANT_TYPES.ACTIVE && grant.progress !== undefined && (
                  <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography
                        sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}
                      >
                        Project Progress
                      </Typography>
                      <Typography
                        sx={{ color: "#4CAF50", fontWeight: 600, fontSize: 13 }}
                      >
                        {grant.progress}% complete
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={grant.progress}
                      sx={{
                        height: 6,
                        borderRadius: 999,
                        backgroundColor: "rgba(255,255,255,0.08)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#4CAF50",
                        },
                      }}
                    />
                  </Stack>
                )}

                {/* Objectives */}
                {grant.objectives && grant.objectives.length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {grant.objectives.slice(0, 4).map((objective) => (
                      <Chip
                        key={`${grant.id}-${objective}`}
                        label={objective}
                        size="small"
                        sx={{
                          backgroundColor: `${getTypeColor(grant.type)}25`,
                          color: `${getTypeColor(grant.type)}FF`,
                          fontWeight: 600,
                          fontSize: 11,
                          "&:hover": {
                            backgroundColor: `${getTypeColor(grant.type)}40`,
                          },
                        }}
                      />
                    ))}
                  </Stack>
                )}

                {/* Outputs */}
                {grant.outputs && (
                  <Stack direction="row" spacing={3} flexWrap="wrap">
                    {Object.entries(grant.outputs).map(([key, value]) => (
                      <Box
                        key={`${grant.id}-${key}`}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Assessment sx={{ color: "#9C27B0", fontSize: 16 }} />
                        <Typography
                          sx={{
                            color: "#9C27B0",
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          {value} {key}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                )}

                {/* Special Information for Different Types */}
                {grant.type === GRANT_TYPES.PENDING && grant.reviewNotes && (
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.65)",
                      fontSize: 13,
                      fontStyle: "italic",
                      p: 2,
                      backgroundColor: "rgba(255,255,255,0.03)",
                      borderRadius: 2,
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    Review Notes: {grant.reviewNotes}
                  </Typography>
                )}

                {grant.type === GRANT_TYPES.REJECTED && grant.lessonLearned && (
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.65)",
                      fontSize: 13,
                      p: 2,
                      backgroundColor: "rgba(244,67,54,0.05)",
                      borderRadius: 2,
                      border: "1px solid rgba(244,67,54,0.15)",
                    }}
                  >
                    Lesson Learned: {grant.lessonLearned}
                  </Typography>
                )}

                {/* External Links */}
                {grant.reportUrl && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Launch />}
                    href={grant.reportUrl}
                    target="_blank"
                    sx={{
                      color: "rgba(255,255,255,0.8)",
                      borderColor: "rgba(255,255,255,0.3)",
                      fontSize: 12,
                      textTransform: "none",
                      alignSelf: "flex-start",
                      "&:hover": {
                        borderColor: "rgba(255,255,255,0.5)",
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    View Final Report
                  </Button>
                )}
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default Grants;