import React, { useMemo, useState, useCallback } from "react";
import {
  Box,
  Chip,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Autocomplete,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  Search,
  FilterList,
  Clear,
  Edit,
  Delete,
  Add,
  EmojiEvents,
  AttachMoney,
  WorkspacePremium,
  Star,
  Launch,
  Place,
  TrendingUp,
  Public,
  Group,
  Save,
  Close,
  Assignment,
} from "@mui/icons-material";

// Constants for better maintainability
const AWARD_TYPES = {
  ACADEMIC: "academic",
  PROFESSIONAL: "professional",
  COMPETITION: "competition",
  COMMUNITY: "community",
  RESEARCH: "research",
  INNOVATION: "innovation",
};

const PRESTIGE_LEVELS = {
  INTERNATIONAL: "International",
  NATIONAL: "National",
  REGIONAL: "Regional",
  LOCAL: "Local",
  INSTITUTIONAL: "Institutional",
};

const TYPE_COLORS = {
  academic: "#2196F3",
  professional: "#FF9800",
  competition: "#4CAF50",
  community: "#9C27B0",
  research: "#607D8B",
  innovation: "#E91E63",
};

const PRESTIGE_COLORS = {
  International: "#FFD700",
  National: "#C0C0C0",
  Regional: "#CD7F32",
  Local: "#4CAF50",
  Institutional: "#2196F3",
};

const FILTER_ALL_VALUE = "all";

/**
 * Awards & Recognition Management Component
 * Handles display and management of awards with comprehensive filtering
 */
const Awards = () => {
  // CRUD states
  const [awards, setAwards] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAward, setSelectedAward] = useState(null);
  const [dialogMode, setDialogMode] = useState("add"); // add, edit
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Certificate selection states
  const [certificateDialogOpen, setCertificateDialogOpen] = useState(false);
  const [certificateViewOpen, setCertificateViewOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [certificates] = useState([
    {
      id: "cert-001",
      title: "AWS Certified Solutions Architect - Professional",
      credentialId: "AWS-PSA-2024-001472",
      issuer: "Amazon Web Services",
      type: "Cloud Computing",
      issueDate: "2024-03-15",
      expiryDate: "2027-03-15",
      status: "Valid",
      verificationLink: "https://aws.amazon.com/verification/001472",
      competencyLevel: "Professional",
      skillsValidated: [
        "Architecture Design",
        "Cost Optimization",
        "Security",
        "Scalability",
      ],
      certificateImage:
        "https://images.credly.com/size/340x340/images/2d84e428-9078-49b6-a804-13c15383d0de/image.png",
    },
    {
      id: "cert-002",
      title: "Certified Kubernetes Administrator (CKA)",
      credentialId: "CKA-2024-15729",
      issuer: "Cloud Native Computing Foundation",
      type: "DevOps",
      issueDate: "2024-01-20",
      expiryDate: "2027-01-20",
      status: "Valid",
      verificationLink:
        "https://training.linuxfoundation.org/certification/verify/",
      competencyLevel: "Professional",
      skillsValidated: [
        "Container Orchestration",
        "Cluster Management",
        "Networking",
        "Security",
      ],
      certificateImage:
        "https://images.credly.com/size/340x340/images/8b8ed108-e77d-4396-ac59-2504583b9d54/cka_from_cncfsite__281_29.png",
    },
    {
      id: "cert-003",
      title: "Google Professional Cloud Developer",
      credentialId: "GCP-PCD-943251",
      issuer: "Google Cloud",
      type: "Cloud Computing",
      issueDate: "2023-11-10",
      expiryDate: "2025-11-10",
      status: "Valid",
      verificationLink: "https://cloud.google.com/certification/verify/",
      competencyLevel: "Professional",
      skillsValidated: [
        "Application Development",
        "Cloud APIs",
        "Data Storage",
        "Monitoring",
      ],
      certificateImage:
        "https://images.credly.com/size/340x340/images/fb5a2c06-3ef8-4413-9c3f-4ac70b3b592a/image.png",
    },
  ]);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    date: "",
    type: AWARD_TYPES.ACADEMIC,
    prestigeLevel: PRESTIGE_LEVELS.LOCAL,
    description: "",
    significance: "",
    monetaryValue: "",
    keywords: [],
    featured: false,
    teamSize: 1,
    location: "",
    certificate: null,
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState(FILTER_ALL_VALUE);
  const [prestigeFilter, setPrestigeFilter] = useState(FILTER_ALL_VALUE);
  const [yearFilter, setYearFilter] = useState(FILTER_ALL_VALUE);

  // Initialize with demo data
  React.useEffect(() => {
    const demoAwards = [
      {
        id: "icmi-best-paper-2024",
        title: "Best Paper Award - Outstanding Research",
        organization: "International Conference on Medical Informatics (ICMI)",
        date: "2024-09-16",
        type: AWARD_TYPES.ACADEMIC,
        prestigeLevel: PRESTIGE_LEVELS.INTERNATIONAL,
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
      },
      {
        id: "ieee-young-researcher-2024",
        title: "Young Researcher Excellence Award",
        organization: "IEEE Computer Society",
        date: "2024-06-20",
        type: AWARD_TYPES.PROFESSIONAL,
        prestigeLevel: PRESTIGE_LEVELS.INTERNATIONAL,
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
      },
      {
        id: "neurips-outstanding-paper-2023",
        title: "Outstanding Paper Award",
        organization:
          "Conference on Neural Information Processing Systems (NeurIPS)",
        date: "2023-12-10",
        type: AWARD_TYPES.RESEARCH,
        prestigeLevel: PRESTIGE_LEVELS.INTERNATIONAL,
        description:
          "Awarded for 'Federated Learning for Privacy-Preserving Healthcare Analytics: A Multi-institutional Study' - a novel framework enabling collaborative ML training while maintaining HIPAA compliance.",
        significance: "Top 0.5% of accepted papers (26 out of 5,200)",
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
        teamSize: 5,
        location: "New Orleans, LA, USA",
      },
      {
        id: "hackathon-healthcare-ai-2023",
        title: "1st Place - Healthcare AI Challenge",
        organization: "Global Healthcare Innovation Summit",
        date: "2023-03-25",
        type: AWARD_TYPES.COMPETITION,
        prestigeLevel: PRESTIGE_LEVELS.INTERNATIONAL,
        description:
          "Built an AI-powered diagnostic assistant achieving 95% accuracy in predicting COVID-19 severity using multi-omics data integration. Solution impressed judges with clinical interpretability and real-world deployment readiness.",
        significance: "120 teams from 25 countries, $50K total prize pool",
        monetaryValue: 25000,
        impactMetrics: {
          accuracy: 95,
          dataPoints: 100000,
          processingTime: 2,
        },
        certificate: "/certificates/healthcare_ai_challenge_2023.pdf",
        keywords: [
          "Multi-omics",
          "COVID-19",
          "Biomarker Discovery",
          "Clinical AI",
        ],
        teamSize: 4,
        location: "Geneva, Switzerland",
      },
      {
        id: "django-core-contributor-2023",
        title: "Outstanding Contribution Award",
        organization: "Django Software Foundation",
        date: "2023-10-15",
        type: AWARD_TYPES.COMMUNITY,
        prestigeLevel: PRESTIGE_LEVELS.INTERNATIONAL,
        description:
          "Recognized for exceptional contributions to Django core development including performance optimizations, security patches, and mentoring new contributors. Helped maintain 40M+ monthly active Django installations.",
        significance:
          "Top 10 contributors globally out of 2,000+ active developers",
        impactMetrics: {
          pullRequests: 45,
          issuesResolved: 67,
          menteesGuided: 28,
        },
        certificate: "/certificates/django_outstanding_2023.pdf",
        keywords: ["Open Source", "Django", "Web Framework", "Community"],
        teamSize: 1,
        location: "Remote - Global Community",
      },
      {
        id: "innovation-leadership-2022",
        title: "Technology Innovation Leadership Award",
        organization: "National Technology Leadership Council",
        date: "2022-11-10",
        type: AWARD_TYPES.INNOVATION,
        prestigeLevel: PRESTIGE_LEVELS.NATIONAL,
        description:
          "Honored for transforming healthcare technology infrastructure, leading cross-functional teams of 20+ engineers, and delivering $2M+ in cost savings through innovative ML deployment strategies.",
        significance: "Top 5% of technology leaders nationwide",
        monetaryValue: 5000,
        impactMetrics: {
          teamsLed: 3,
          projectsDelivered: 12,
          costSavings: 2000000,
        },
        certificate: "/certificates/innovation_leadership_2022.pdf",
        keywords: [
          "Leadership",
          "Innovation",
          "Cost Optimization",
          "Team Management",
        ],
        teamSize: 1,
        location: "New York, NY, USA",
      },
      {
        id: "web-hackathon-2022",
        title: "2nd Place - Web Innovation Hackathon",
        organization: "Silicon Valley Tech Hub",
        date: "2022-08-14",
        type: AWARD_TYPES.COMPETITION,
        prestigeLevel: PRESTIGE_LEVELS.REGIONAL,
        description:
          "Developed a real-time collaborative workspace platform with sub-50ms latency using modern WebSocket architecture. Solution featured 15+ productivity tools with seamless synchronization.",
        significance:
          "80+ teams, judged by industry leaders from Google, Meta, Netflix",
        monetaryValue: 10000,
        impactMetrics: {
          demoUsers: 1000,
          latency: 45,
          features: 15,
        },
        certificate: "/certificates/web_innovation_2022.pdf",
        keywords: [
          "Real-time Systems",
          "WebSocket",
          "Collaboration",
          "Performance",
        ],
        teamSize: 4,
        location: "Palo Alto, CA, USA",
      },
      {
        id: "community-champion-2022",
        title: "Open Source Community Champion",
        organization: "Open Source Initiative",
        date: "2022-06-30",
        type: AWARD_TYPES.COMMUNITY,
        prestigeLevel: PRESTIGE_LEVELS.INTERNATIONAL,
        description:
          "Acknowledged for fostering inclusive open-source communities, maintaining 8 widely-used packages, and mentoring 25+ new contributors. Packages collectively downloaded 500K+ times monthly.",
        significance: "Recognizes top community builders globally each year",
        impactMetrics: {
          packagesOwned: 8,
          monthlyDownloads: 500000,
          contributorsHelped: 25,
        },
        certificate: "/certificates/community_champion_2022.pdf",
        keywords: [
          "Open Source",
          "Community Building",
          "Mentorship",
          "Package Maintenance",
        ],
        teamSize: 1,
        location: "Global Open Source Community",
      },
    ];
    setAwards(demoAwards);
  }, []);

  // Use state for awards data
  const allAwards = useMemo(() => awards, [awards]);

  // Get unique filter options
  const uniqueTypes = useMemo(() => {
    return [...new Set(allAwards.map((award) => award.type))].sort();
  }, [allAwards]);

  const uniquePrestigeLevels = useMemo(() => {
    return [...new Set(allAwards.map((award) => award.prestigeLevel))].sort();
  }, [allAwards]);

  const uniqueYears = useMemo(() => {
    return [
      ...new Set(allAwards.map((award) => new Date(award.date).getFullYear())),
    ].sort((a, b) => b - a);
  }, [allAwards]);

  // Filter awards
  const filteredAwards = useMemo(() => {
    return allAwards.filter((award) => {
      const matchesSearch =
        searchTerm === "" ||
        award.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        award.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        award.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        award.keywords?.some((keyword) =>
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesType =
        typeFilter === FILTER_ALL_VALUE || award.type === typeFilter;
      const matchesPrestige =
        prestigeFilter === FILTER_ALL_VALUE ||
        award.prestigeLevel === prestigeFilter;
      const matchesYear =
        yearFilter === FILTER_ALL_VALUE ||
        new Date(award.date).getFullYear().toString() === yearFilter;

      return matchesSearch && matchesType && matchesPrestige && matchesYear;
    });
  }, [allAwards, searchTerm, typeFilter, prestigeFilter, yearFilter]);

  // Calculate comprehensive statistics
  const statistics = useMemo(() => {
    const totalMonetaryValue = allAwards.reduce(
      (sum, award) =>
        sum +
        (award.monetaryValue && award.monetaryValue > 0
          ? award.monetaryValue
          : 0),
      0
    );
    const internationalAwards = allAwards.filter(
      (award) => award.prestigeLevel === PRESTIGE_LEVELS.INTERNATIONAL
    ).length;
    const monetaryAwards = allAwards.filter(
      (award) => award.monetaryValue && award.monetaryValue > 0
    ).length;
    const competitionAwards = allAwards.filter(
      (award) => award.type === AWARD_TYPES.COMPETITION
    ).length;

    return {
      totalAwards: allAwards.length,
      totalMonetaryValue,
      internationalAwards,
      monetaryAwards,
      competitionAwards,
      currentYear: allAwards.filter(
        (award) => new Date(award.date).getFullYear() === 2024
      ).length,
    };
  }, [allAwards]);

  // Helper functions
  const formatCurrency = useCallback((value) => {
    return typeof value === "number" && value > 0
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(value)
      : "N/A";
  }, []);

  const formatNumber = useCallback((value) => {
    return typeof value === "number" ? value.toLocaleString() : value;
  }, []);

  const getTypeIcon = useCallback((type) => {
    const icons = {
      academic: <EmojiEvents />,
      professional: <WorkspacePremium />,
      competition: <Star />,
      community: <Group />,
      research: <TrendingUp />,
      innovation: <Public />,
    };
    return icons[type] || <EmojiEvents />;
  }, []);

  const getTypeColor = useCallback((type) => {
    return TYPE_COLORS[type] || TYPE_COLORS.academic;
  }, []);

  const getPrestigeColor = useCallback((prestige) => {
    return PRESTIGE_COLORS[prestige] || PRESTIGE_COLORS.Local;
  }, []);

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setTypeFilter(FILTER_ALL_VALUE);
    setPrestigeFilter(FILTER_ALL_VALUE);
    setYearFilter(FILTER_ALL_VALUE);
  }, []);

  // CRUD handlers
  const handleOpenAddDialog = () => {
    setDialogMode("add");
    setSelectedAward(null);
    setFormData({
      title: "",
      organization: "",
      date: "",
      type: AWARD_TYPES.ACADEMIC,
      prestigeLevel: PRESTIGE_LEVELS.LOCAL,
      description: "",
      significance: "",
      monetaryValue: "",
      keywords: [],
      featured: false,
      teamSize: 1,
      location: "",
      certificate: null,
    });
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (award) => {
    setDialogMode("edit");
    setSelectedAward(award);
    setFormData({
      title: award.title || "",
      organization: award.organization || "",
      date: award.date || "",
      type: award.type || AWARD_TYPES.ACADEMIC,
      prestigeLevel: award.prestigeLevel || PRESTIGE_LEVELS.LOCAL,
      description: award.description || "",
      significance: award.significance || "",
      monetaryValue: award.monetaryValue || "",
      keywords: Array.isArray(award.keywords) ? award.keywords : [],
      featured: award.featured || false,
      teamSize: award.teamSize || 1,
      location: award.location || "",
      certificate: award.certificate || null,
    });
    setDialogOpen(true);
  };

  const handleOpenDeleteDialog = (award) => {
    setSelectedAward(award);
    setDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedAward(null);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedAward(null);
  };

  const handleSave = () => {
    // Validate required fields
    if (!formData.title.trim() || !formData.organization.trim()) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields (Title and Organization).",
        severity: "error",
      });
      return;
    }

    if (dialogMode === "add") {
      // Add new award
      const newAward = {
        ...formData,
        id: `award-${Date.now()}`,
        title: formData.title.trim(),
        organization: formData.organization.trim(),
        date: formData.date || new Date().toISOString().split("T")[0],
        monetaryValue:
          formData.monetaryValue && formData.monetaryValue !== ""
            ? parseFloat(formData.monetaryValue)
            : null,
        impactMetrics: {},
      };
      setAwards((prev) => [newAward, ...prev]);
      setSnackbar({
        open: true,
        message: "Award added successfully!",
        severity: "success",
      });
    } else if (dialogMode === "edit") {
      // Update existing award
      const updatedAward = {
        ...selectedAward,
        ...formData,
        title: formData.title.trim(),
        organization: formData.organization.trim(),
        monetaryValue:
          formData.monetaryValue && formData.monetaryValue !== ""
            ? parseFloat(formData.monetaryValue)
            : null,
      };
      setAwards((prev) =>
        prev.map((award) =>
          award.id === selectedAward.id ? updatedAward : award
        )
      );
      setSnackbar({
        open: true,
        message: "Award updated successfully!",
        severity: "success",
      });
    }

    handleCloseDialog();
  };

  const handleDeleteAward = () => {
    if (!selectedAward?.id) {
      setSnackbar({
        open: true,
        message: "Error: No award selected for deletion.",
        severity: "error",
      });
      return;
    }

    setAwards((prev) => prev.filter((award) => award.id !== selectedAward.id));
    handleCloseDeleteDialog();
    setSnackbar({
      open: true,
      message: "Award deleted successfully!",
      severity: "success",
    });
  };

  // Certificate handlers
  const handleViewCertificate = (certificateId) => {
    const certificate = certificates.find((cert) => cert.id === certificateId);
    if (certificate) {
      setSelectedCertificate(certificate);
      setCertificateViewOpen(true);
    }
  };

  const handleSelectCertificate = (certificate) => {
    setFormData((prev) => ({
      ...prev,
      certificate: certificate.id,
    }));
    setCertificateDialogOpen(false);
    setSnackbar({
      open: true,
      message: "Certificate linked successfully!",
      severity: "success",
    });
  };

  const handleOpenCertificateDialog = () => {
    setCertificateDialogOpen(true);
  };

  const handleCloseCertificateDialog = () => {
    setCertificateDialogOpen(false);
  };

  const handleCloseCertificateView = () => {
    setCertificateViewOpen(false);
    setSelectedCertificate(null);
  };

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
          Awards & Recognition
        </Typography>
        <Button
          onClick={handleOpenAddDialog}
          sx={{
            background: "#FBC02D",
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
              backgroundColor: "#FDD835",
            },
          }}
        >
          <Add fontSize="small" />
          Add Award
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
            label: "Total Awards",
            value: statistics.totalAwards,
            icon: <EmojiEvents />,
            color: "#FBC02D",
          },
          {
            label: "International",
            value: statistics.internationalAwards,
            icon: <Public />,
            color: "#4CAF50",
          },
          {
            label: "Prize Money",
            value: formatCurrency(statistics.totalMonetaryValue),
            icon: <AttachMoney />,
            color: "#FF9800",
          },
          {
            label: "Competitions",
            value: statistics.competitionAwards,
            icon: <Star />,
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
                Filter Awards
              </Typography>
            </Stack>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {filteredAwards.length} of {allAwards.length}
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            {/* Search */}
            <TextField
              placeholder="Search awards, organizations, or keywords..."
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
                    borderColor: "#FBC02D",
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
                  "&.Mui-focused": { color: "#FBC02D" },
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
                    borderColor: "#FBC02D",
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

            {/* Prestige Filter */}
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#FBC02D" },
                }}
              >
                Prestige
              </InputLabel>
              <Select
                value={prestigeFilter}
                onChange={(e) => setPrestigeFilter(e.target.value)}
                label="Prestige"
                sx={{
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FBC02D",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value={FILTER_ALL_VALUE}>All Levels</MenuItem>
                {uniquePrestigeLevels.map((prestige) => (
                  <MenuItem key={prestige} value={prestige}>
                    {prestige}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Year Filter */}
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#FBC02D" },
                }}
              >
                Year
              </InputLabel>
              <Select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                label="Year"
                sx={{
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FBC02D",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value={FILTER_ALL_VALUE}>All Years</MenuItem>
                {uniqueYears.map((year) => (
                  <MenuItem key={year} value={year.toString()}>
                    {year}
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

      {/* Awards List */}
      {filteredAwards.length === 0 ? (
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
            No Awards Found
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 14,
              maxWidth: 400,
              lineHeight: 1.6,
            }}
          >
            Try adjusting your search terms or filters to find the awards you're
            looking for.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={3}>
          {filteredAwards.map((award) => (
            <Box
              key={award.id}
              sx={{
                p: 3,
                borderRadius: 4,
                background: `linear-gradient(135deg, ${getTypeColor(
                  award.type
                )}12 0%, ${getTypeColor(award.type)}06 100%)`,
                border: `1px solid ${getTypeColor(award.type)}30`,
                position: "relative",
                transition: "all 160ms ease",
                "&:hover": {
                  borderColor: `${getTypeColor(award.type)}60`,
                  transform: "translateY(-2px)",
                  boxShadow: `0 8px 32px ${getTypeColor(award.type)}20`,
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
                        backgroundColor: `${getTypeColor(award.type)}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: getTypeColor(award.type),
                        mt: 0.5,
                      }}
                    >
                      {getTypeIcon(award.type)}
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
                        {award.title}
                        {award.featured && (
                          <Star
                            sx={{ ml: 1, fontSize: 18, color: "#FFD700" }}
                          />
                        )}
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.7)",
                          fontSize: 14,
                          mb: 1,
                        }}
                      >
                        {award.organization} • {formatDate(award.date)}
                      </Typography>

                      {/* Award Info */}
                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        alignItems="center"
                      >
                        <Chip
                          label={
                            award.type.charAt(0).toUpperCase() +
                            award.type.slice(1)
                          }
                          size="small"
                          sx={{
                            backgroundColor: `${getTypeColor(award.type)}20`,
                            color: getTypeColor(award.type),
                            fontWeight: 600,
                            fontSize: 12,
                            border: `1px solid ${getTypeColor(award.type)}40`,
                          }}
                        />
                        <Chip
                          label={award.prestigeLevel}
                          size="small"
                          sx={{
                            backgroundColor: `${getPrestigeColor(
                              award.prestigeLevel
                            )}20`,
                            color: getPrestigeColor(award.prestigeLevel),
                            fontWeight: 600,
                            fontSize: 12,
                            border: `1px solid ${getPrestigeColor(
                              award.prestigeLevel
                            )}40`,
                          }}
                        />
                        <Chip
                          label={new Date(award.date).getFullYear()}
                          size="small"
                          sx={{
                            backgroundColor: "#2196F3",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: 12,
                          }}
                        />
                        {award.monetaryValue && award.monetaryValue > 0 && (
                          <Chip
                            label={formatCurrency(award.monetaryValue)}
                            size="small"
                            sx={{
                              backgroundColor: "#4CAF50",
                              color: "#fff",
                              fontWeight: 600,
                              fontSize: 12,
                            }}
                          />
                        )}
                        {award.teamSize && award.teamSize > 1 && (
                          <Chip
                            label={`Team of ${award.teamSize}`}
                            size="small"
                            sx={{
                              backgroundColor: "#FF9800",
                              color: "#fff",
                              fontWeight: 600,
                              fontSize: 12,
                            }}
                          />
                        )}
                      </Stack>
                    </Box>
                  </Stack>

                  {/* Action Buttons */}
                  <Stack direction="row" spacing={0.5}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEditDialog(award);
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
                        handleOpenDeleteDialog(award);
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
                {award.description && (
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: 14,
                      lineHeight: 1.6,
                    }}
                  >
                    {award.description}
                  </Typography>
                )}

                {/* Significance */}
                {award.significance && (
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.85)",
                      fontSize: 14,
                      fontWeight: 600,
                      fontStyle: "italic",
                    }}
                  >
                    🏆 {award.significance}
                  </Typography>
                )}

                {/* Impact Metrics */}
                {award.impactMetrics &&
                  Object.keys(award.impactMetrics).length > 0 && (
                    <Stack direction="row" spacing={3} flexWrap="wrap">
                      {Object.entries(award.impactMetrics).map(
                        ([key, value]) => (
                          <Box
                            key={`${award.id}-${key}`}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <TrendingUp
                              sx={{ color: "#4CAF50", fontSize: 16 }}
                            />
                            <Typography
                              sx={{
                                color: "#4CAF50",
                                fontSize: 13,
                                fontWeight: 600,
                              }}
                            >
                              {formatNumber(value)}{" "}
                              {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                            </Typography>
                          </Box>
                        )
                      )}
                    </Stack>
                  )}

                {/* Keywords */}
                {award.keywords && award.keywords.length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {award.keywords.map((keyword) => (
                      <Chip
                        key={`${award.id}-${keyword}`}
                        label={keyword}
                        size="small"
                        sx={{
                          backgroundColor: `${getTypeColor(award.type)}25`,
                          color: `${getTypeColor(award.type)}FF`,
                          fontWeight: 600,
                          fontSize: 11,
                          "&:hover": {
                            backgroundColor: `${getTypeColor(award.type)}40`,
                          },
                        }}
                      />
                    ))}
                  </Stack>
                )}

                {/* Action Links */}
                {(award.certificate || award.location) && (
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    {award.certificate && (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Launch />}
                        onClick={() => handleViewCertificate(award.certificate)}
                        sx={{
                          color: "rgba(255,255,255,0.8)",
                          borderColor: "rgba(255,255,255,0.3)",
                          fontSize: 12,
                          textTransform: "none",
                          "&:hover": {
                            borderColor: "rgba(255,255,255,0.5)",
                            backgroundColor: "rgba(255,255,255,0.1)",
                          },
                        }}
                      >
                        View Certificate
                      </Button>
                    )}
                    {award.location && (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Place />}
                        disabled
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          borderColor: "rgba(255,255,255,0.3)",
                          fontSize: 12,
                          textTransform: "none",
                        }}
                      >
                        {award.location}
                      </Button>
                    )}
                  </Stack>
                )}
              </Stack>
            </Box>
          ))}
        </Stack>
      )}

      {/* Add/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#1e1e1e",
            color: "#fff",
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#fff",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            pb: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <EmojiEvents sx={{ color: "#FBC02D" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {dialogMode === "add" ? "Add New Award" : "Edit Award"}
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ pb: 3, px: 3 }}>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              {/* Row 1: Title */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title *"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#FBC02D" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>

              {/* Row 2: Organization */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Organization *"
                  value={formData.organization}
                  onChange={(e) =>
                    setFormData({ ...formData, organization: e.target.value })
                  }
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#FBC02D" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>

              {/* Row 3: Date + Type + Prestige Level */}
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#FBC02D" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Type
                  </InputLabel>
                  <Select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    sx={{
                      color: "#fff",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#FBC02D",
                      },
                    }}
                  >
                    <MenuItem value={AWARD_TYPES.ACADEMIC}>Academic</MenuItem>
                    <MenuItem value={AWARD_TYPES.PROFESSIONAL}>
                      Professional
                    </MenuItem>
                    <MenuItem value={AWARD_TYPES.COMPETITION}>
                      Competition
                    </MenuItem>
                    <MenuItem value={AWARD_TYPES.COMMUNITY}>Community</MenuItem>
                    <MenuItem value={AWARD_TYPES.RESEARCH}>Research</MenuItem>
                    <MenuItem value={AWARD_TYPES.INNOVATION}>
                      Innovation
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Prestige Level
                  </InputLabel>
                  <Select
                    value={formData.prestigeLevel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        prestigeLevel: e.target.value,
                      })
                    }
                    sx={{
                      color: "#fff",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#FBC02D",
                      },
                    }}
                  >
                    <MenuItem value={PRESTIGE_LEVELS.INTERNATIONAL}>
                      International
                    </MenuItem>
                    <MenuItem value={PRESTIGE_LEVELS.NATIONAL}>
                      National
                    </MenuItem>
                    <MenuItem value={PRESTIGE_LEVELS.REGIONAL}>
                      Regional
                    </MenuItem>
                    <MenuItem value={PRESTIGE_LEVELS.LOCAL}>Local</MenuItem>
                    <MenuItem value={PRESTIGE_LEVELS.INSTITUTIONAL}>
                      Institutional
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Row 4: Monetary Value + Team Size + Location */}
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Monetary Value ($)"
                  type="number"
                  value={formData.monetaryValue}
                  onChange={(e) =>
                    setFormData({ ...formData, monetaryValue: e.target.value })
                  }
                  placeholder="e.g., 5000"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#FBC02D" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Team Size"
                  type="number"
                  value={formData.teamSize}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      teamSize: parseInt(e.target.value) || 1,
                    })
                  }
                  inputProps={{ min: 1 }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#FBC02D" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="e.g., Boston, MA, USA"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#FBC02D" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>

              {/* Row 5: Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#FBC02D" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>

              {/* Row 6: Significance */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Significance"
                  multiline
                  rows={2}
                  value={formData.significance}
                  onChange={(e) =>
                    setFormData({ ...formData, significance: e.target.value })
                  }
                  placeholder="e.g., Selected from 300+ submissions across 45 countries"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#FBC02D" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>

              {/* Row 7: Keywords */}
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  freeSolo
                  options={[]}
                  value={formData.keywords || []}
                  onChange={(event, newValue) => {
                    setFormData((prev) => ({ ...prev, keywords: newValue }));
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(251, 192, 45, 0.1)",
                          borderColor: "#FBC02D",
                          color: "#FBC02D",
                        }}
                        {...getTagProps({ index })}
                        key={index}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Keywords"
                      placeholder="Machine Learning, Healthcare, Innovation..."
                      helperText="Press Enter to add keywords"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#FBC02D" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                        "& .MuiFormHelperText-root": {
                          color: "rgba(255,255,255,0.6)",
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Row 8: Certificate Link */}
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField
                    fullWidth
                    label="Linked Certificate"
                    value={
                      formData.certificate
                        ? certificates.find(
                            (cert) => cert.id === formData.certificate
                          )?.title || "Certificate not found"
                        : "No certificate linked"
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "#fff",
                        "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.5)",
                        },
                        "&.Mui-focused fieldset": { borderColor: "#FBC02D" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                    }}
                  />
                  <Button
                    variant="outlined"
                    onClick={handleOpenCertificateDialog}
                    sx={{
                      color: "rgba(255,255,255,0.8)",
                      borderColor: "rgba(255,255,255,0.3)",
                      "&:hover": {
                        borderColor: "rgba(255,255,255,0.5)",
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                      minWidth: 120,
                    }}
                  >
                    Select Certificate
                  </Button>
                  {formData.certificate && (
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, certificate: null }))
                      }
                      sx={{
                        color: "rgba(244,67,54,0.8)",
                        borderColor: "rgba(244,67,54,0.3)",
                        "&:hover": {
                          borderColor: "rgba(244,67,54,0.5)",
                          backgroundColor: "rgba(244,67,54,0.1)",
                        },
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </Stack>
              </Grid>

              {/* Row 9: Featured Toggle */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#FBC02D",
                          "&:hover": {
                            backgroundColor: "rgba(251, 192, 45, 0.04)",
                          },
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: "#FBC02D",
                          },
                      }}
                    />
                  }
                  label="Featured Award"
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ p: 3, borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Button
            onClick={handleCloseDialog}
            sx={{ color: "rgba(255,255,255,0.7)" }}
            startIcon={<Close />}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!formData.title || !formData.organization}
            startIcon={<Save />}
            sx={{
              backgroundColor: "#FBC02D",
              color: "#1a1a1a",
              "&:hover": { backgroundColor: "#FDD835" },
              "&:disabled": { backgroundColor: "rgba(251, 192, 45, 0.3)" },
            }}
          >
            {dialogMode === "add" ? "Add Award" : "Update Award"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        PaperProps={{
          sx: {
            bgcolor: "#1e1e1e",
            color: "#fff",
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ color: "#f44336" }}>
            Delete Award
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{selectedAward?.title}</strong>?
          </Typography>
          <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.7)" }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleCloseDeleteDialog}
            sx={{ color: "rgba(255,255,255,0.7)" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAward}
            variant="contained"
            sx={{
              bgcolor: "#f44336",
              "&:hover": { bgcolor: "#d32f2f" },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Certificate Selection Dialog */}
      <Dialog
        open={certificateDialogOpen}
        onClose={handleCloseCertificateDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#1e1e1e",
            color: "#fff",
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#fff",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            pb: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Assignment sx={{ color: "#FBC02D" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Select Certificate
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ pb: 3, px: 3 }}>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {certificates.map((certificate) => (
                <Grid item xs={12} sm={6} md={4} key={certificate.id}>
                  <Box
                    onClick={() => handleSelectCertificate(certificate)}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid rgba(255,255,255,0.1)",
                      backgroundColor: "rgba(255,255,255,0.02)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.05)",
                        borderColor: "rgba(255,255,255,0.2)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Stack spacing={2}>
                      <Box
                        component="img"
                        src={certificate.certificateImage}
                        alt={certificate.title}
                        sx={{
                          width: "100%",
                          height: 120,
                          objectFit: "contain",
                          borderRadius: 1,
                          backgroundColor: "rgba(255,255,255,0.05)",
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: 14,
                            mb: 0.5,
                            lineHeight: 1.3,
                          }}
                        >
                          {certificate.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: 12,
                            mb: 1,
                          }}
                        >
                          {certificate.issuer}
                        </Typography>
                        <Chip
                          label={certificate.status}
                          size="small"
                          sx={{
                            backgroundColor:
                              certificate.status === "Valid"
                                ? "rgba(76, 175, 80, 0.2)"
                                : "rgba(255, 193, 7, 0.2)",
                            color:
                              certificate.status === "Valid"
                                ? "#4CAF50"
                                : "#FFC107",
                            fontSize: 10,
                            height: 20,
                          }}
                        />
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleCloseCertificateDialog}
            sx={{ color: "rgba(255,255,255,0.7)" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Certificate View Dialog */}
      <Dialog
        open={certificateViewOpen}
        onClose={handleCloseCertificateView}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#1e1e1e",
            color: "#fff",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#fff",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            pb: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Launch sx={{ color: "#FBC02D" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Certificate Details
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ pb: 3, px: 3 }}>
          {selectedCertificate && (
            <Box sx={{ mt: 2 }}>
              <Stack spacing={3}>
                <Box
                  component="img"
                  src={selectedCertificate.certificateImage}
                  alt={selectedCertificate.title}
                  sx={{
                    width: "100%",
                    maxHeight: 300,
                    objectFit: "contain",
                    borderRadius: 2,
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                />
                <Box>
                  <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
                    {selectedCertificate.title}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 2 }}>
                    Issued by: {selectedCertificate.issuer}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography
                        sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}
                      >
                        Credential ID
                      </Typography>
                      <Typography
                        sx={{
                          color: "#fff",
                          fontSize: 14,
                          fontFamily: "monospace",
                        }}
                      >
                        {selectedCertificate.credentialId}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}
                      >
                        Status
                      </Typography>
                      <Chip
                        label={selectedCertificate.status}
                        size="small"
                        sx={{
                          backgroundColor:
                            selectedCertificate.status === "Valid"
                              ? "rgba(76, 175, 80, 0.2)"
                              : "rgba(255, 193, 7, 0.2)",
                          color:
                            selectedCertificate.status === "Valid"
                              ? "#4CAF50"
                              : "#FFC107",
                          fontSize: 12,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}
                      >
                        Issue Date
                      </Typography>
                      <Typography sx={{ color: "#fff", fontSize: 14 }}>
                        {selectedCertificate.issueDate}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}
                      >
                        Expiry Date
                      </Typography>
                      <Typography sx={{ color: "#fff", fontSize: 14 }}>
                        {selectedCertificate.expiryDate}
                      </Typography>
                    </Grid>
                  </Grid>
                  {selectedCertificate.skillsValidated && (
                    <Box sx={{ mt: 2 }}>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: 14,
                          mb: 1,
                        }}
                      >
                        Skills Validated
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {selectedCertificate.skillsValidated.map(
                          (skill, index) => (
                            <Chip
                              key={index}
                              label={skill}
                              size="small"
                              sx={{
                                backgroundColor: "rgba(255,255,255,0.1)",
                                color: "rgba(255,255,255,0.8)",
                                fontSize: 12,
                                mb: 0.5,
                              }}
                            />
                          )
                        )}
                      </Stack>
                    </Box>
                  )}
                </Box>
              </Stack>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          {selectedCertificate?.verificationLink && (
            <Button
              variant="outlined"
              startIcon={<Launch />}
              href={selectedCertificate.verificationLink}
              target="_blank"
              sx={{
                color: "#FBC02D",
                borderColor: "rgba(251, 192, 45, 0.3)",
                "&:hover": {
                  borderColor: "rgba(251, 192, 45, 0.5)",
                  backgroundColor: "rgba(251, 192, 45, 0.1)",
                },
              }}
            >
              Verify Certificate
            </Button>
          )}
          <Button
            onClick={handleCloseCertificateView}
            sx={{ color: "rgba(255,255,255,0.7)" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Awards;
