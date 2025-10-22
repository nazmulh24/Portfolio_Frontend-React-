import React, { useMemo, useState, useCallback, useEffect } from "react";
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
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Autocomplete,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Add,
  Edit,
  Launch,
  Search,
  FilterList,
  Clear,
  Verified,
  Schedule,
  Assignment,
  School,
  Security,
  Code,
  Cloud,
  Business,
  Delete,
  Close,
  Save,
} from "@mui/icons-material";

const Certificates = () => {
  // Main state for certificates
  const [certificates, setCertificates] = useState([]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [issuerFilter, setIssuerFilter] = useState("all");

  // CRUD dialog states
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false);
  const [certificateToDelete, setCertificateToDelete] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    credentialId: "",
    issuer: "",
    type: "",
    issueDate: "",
    expiryDate: "",
    verificationLink: "",
    competencyLevel: "",
    industryRecognition: "",
    skillsValidated: [],
    certificateImage: "",
  });

  // Notification state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Image modal state
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Initialize demo data
  useEffect(() => {
    const demoData = [
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
        continuingEducation: 40,
        industryRecognition: "High",
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
        continuingEducation: 35,
        industryRecognition: "High",
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
        continuingEducation: 32,
        industryRecognition: "High",
        skillsValidated: [
          "Application Development",
          "Cloud APIs",
          "Data Storage",
          "Monitoring",
        ],
        certificateImage:
          "https://images.credly.com/size/340x340/images/fb5a2c06-3ef8-4413-9c3f-4ac70b3b592a/image.png",
      },
      {
        id: "cert-004",
        title: "Certified Information Systems Security Professional (CISSP)",
        credentialId: "CISSP-751429",
        issuer: "(ISC)² International",
        type: "Cybersecurity",
        issueDate: "2023-09-05",
        expiryDate: "2026-09-05",
        status: "Valid",
        verificationLink: "https://www.isc2.org/MemberVerification",
        competencyLevel: "Expert",
        continuingEducation: 45,
        industryRecognition: "Very High",
        skillsValidated: [
          "Security Architecture",
          "Risk Management",
          "Incident Response",
          "Compliance",
        ],
        certificateImage:
          "https://images.credly.com/size/340x340/images/9180921d-4a13-429e-9357-6f9706a554f0/image.png",
      },
      {
        id: "cert-005",
        title: "Microsoft Azure Developer Associate",
        credentialId: "AZ-204-852741",
        issuer: "Microsoft",
        type: "Cloud Computing",
        issueDate: "2024-02-28",
        expiryDate: "2025-02-28",
        status: "Valid",
        verificationLink:
          "https://learn.microsoft.com/en-us/certifications/verify/",
        competencyLevel: "Associate",
        continuingEducation: 30,
        industryRecognition: "High",
        skillsValidated: [
          "Azure Services",
          "API Development",
          "Security Implementation",
          "Monitoring",
        ],
        certificateImage:
          "https://images.credly.com/size/340x340/images/63316b60-f62d-4e51-aacc-c23cb850089c/azure-developer-associate-600x600.png",
      },
      {
        id: "cert-006",
        title: "Certified Ethical Hacker (CEH)",
        credentialId: "CEH-394857",
        issuer: "EC-Council",
        type: "Cybersecurity",
        issueDate: "2023-08-12",
        expiryDate: "2026-08-12",
        status: "Valid",
        verificationLink: "https://cert.eccouncil.org/",
        competencyLevel: "Professional",
        continuingEducation: 35,
        industryRecognition: "High",
        skillsValidated: [
          "Penetration Testing",
          "Vulnerability Assessment",
          "Network Security",
          "Forensics",
        ],
        certificateImage:
          "https://images.credly.com/size/340x340/images/9180921d-4a13-429e-9357-6f9706a554f0/image.png",
      },
      {
        id: "cert-007",
        title: "Scrum Master Certified (SMC)",
        credentialId: "SMC-672941",
        issuer: "Scrum Alliance",
        type: "Project Management",
        issueDate: "2023-06-15",
        expiryDate: "2025-06-15",
        status: "Expiring Soon",
        verificationLink: "https://www.scrumalliance.org/community/profile/",
        competencyLevel: "Professional",
        continuingEducation: 20,
        industryRecognition: "Medium",
        skillsValidated: [
          "Agile Methodology",
          "Team Leadership",
          "Sprint Planning",
          "Stakeholder Management",
        ],
        certificateImage:
          "https://images.credly.com/size/340x340/images/6c7d8b89-45e2-4067-ad29-b1d35c5b5a5a/image.png",
      },
      {
        id: "cert-008",
        title: "MongoDB Certified Developer Associate",
        credentialId: "MDB-DEV-528174",
        issuer: "MongoDB Inc.",
        type: "Database",
        issueDate: "2022-12-08",
        expiryDate: "2024-12-08",
        status: "Expired",
        verificationLink:
          "https://university.mongodb.com/certification/verify/",
        competencyLevel: "Associate",
        continuingEducation: 25,
        industryRecognition: "Medium",
        skillsValidated: [
          "NoSQL Design",
          "Query Optimization",
          "Indexing",
          "Aggregation Framework",
        ],
        certificateImage:
          "https://images.credly.com/size/340x340/images/e70b8c2e-6ad0-4c3c-b5b6-4cf3ffd9b7a9/image.png",
      },
    ];

    // Process demo data to calculate status and remove continuingEducation
    const processedData = demoData.map((cert) => {
      const { continuingEducation, status, ...rest } = cert;
      return {
        ...rest,
        status: calculateStatus(cert.issueDate, cert.expiryDate),
      };
    });

    setCertificates(processedData);
  }, []);

  // Function to calculate status based on issue and expiry dates
  const calculateStatus = (issueDate, expiryDate) => {
    // If no issue date, return null
    if (!issueDate) return null;

    // If issue date exists but no expiry date (lifetime certificate), return Valid
    if (
      issueDate &&
      (!expiryDate || expiryDate === "N/A" || expiryDate === "")
    ) {
      return "Valid";
    }

    // If expiry date exists, check if it's expired
    const today = new Date();
    const expiry = new Date(expiryDate);

    // Check if expiry date is valid
    if (isNaN(expiry.getTime())) {
      return "Valid"; // If expiry date is invalid, treat as lifetime
    }

    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Expired";
    if (diffDays <= 30) return "Expiring Soon";
    return "Valid";
  };

  // CRUD Functions
  const handleAdd = () => {
    setEditingCertificate(null);
    setFormData({
      title: "",
      credentialId: "",
      issuer: "",
      type: "",
      issueDate: "",
      expiryDate: "",
      verificationLink: "",
      competencyLevel: "",
      industryRecognition: "",
      skillsValidated: [],
      certificateImage: "",
    });
    setOpenDialog(true);
  };

  const handleEdit = (certificate) => {
    setEditingCertificate(certificate);
    setFormData({ ...certificate });
    setOpenDialog(true);
  };

  const handleDelete = (certificate) => {
    setCertificateToDelete(certificate);
    setDeleteConfirmDialog(true);
  };

  const confirmDelete = () => {
    setCertificates((prev) =>
      prev.filter((cert) => cert.id !== certificateToDelete.id)
    );
    setDeleteConfirmDialog(false);
    setCertificateToDelete(null);
    setSnackbar({
      open: true,
      message: "Certificate deleted successfully",
      severity: "success",
    });
  };

  const handleSave = () => {
    if (!formData.title || !formData.issuer || !formData.type) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields",
        severity: "error",
      });
      return;
    }

    // Calculate status based on issue and expiry dates
    const calculatedStatus = calculateStatus(
      formData.issueDate,
      formData.expiryDate
    );
    const certificateData = { ...formData, status: calculatedStatus };

    if (editingCertificate) {
      // Update existing certificate
      setCertificates((prev) =>
        prev.map((cert) =>
          cert.id === editingCertificate.id ? certificateData : cert
        )
      );
      setSnackbar({
        open: true,
        message: "Certificate updated successfully",
        severity: "success",
      });
    } else {
      // Add new certificate
      const newCertificate = {
        ...certificateData,
        id: `cert-${Date.now()}`,
      };
      setCertificates((prev) => [...prev, newCertificate]);
      setSnackbar({
        open: true,
        message: "Certificate added successfully",
        severity: "success",
      });
    }

    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCertificate(null);
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Image modal handlers
  const handleImageClick = (certificate) => {
    setSelectedImage(certificate);
    setImageModalOpen(true);
  };

  const handleImageModalClose = () => {
    setImageModalOpen(false);
    setSelectedImage(null);
  };

  // Certificate type options
  const certificateTypes = [
    "Cloud Computing",
    "Cybersecurity",
    "DevOps",
    "Project Management",
    "Database",
    "Programming",
    "Data Science",
    "Machine Learning",
    "Networking",
    "Quality Assurance",
    "Business Analysis",
    "Leadership",
  ];

  // Competency level options
  const competencyLevels = [
    "Foundational",
    "Associate",
    "Professional",
    "Expert",
    "Master",
  ];

  // Industry recognition options
  const recognitionLevels = ["Very High", "High", "Medium", "Low"];

  // Skills options for autocomplete
  const availableSkills = [
    "Architecture Design",
    "Cost Optimization",
    "Security",
    "Scalability",
    "Container Orchestration",
    "Cluster Management",
    "Networking",
    "Application Development",
    "Cloud APIs",
    "Data Storage",
    "Monitoring",
    "Security Architecture",
    "Risk Management",
    "Incident Response",
    "Compliance",
    "Azure Services",
    "API Development",
    "Security Implementation",
    "Penetration Testing",
    "Vulnerability Assessment",
    "Network Security",
    "Forensics",
    "Agile Methodology",
    "Team Leadership",
    "Sprint Planning",
    "Stakeholder Management",
    "NoSQL Design",
    "Query Optimization",
    "Indexing",
    "Aggregation Framework",
  ];

  // Helper functions for filtering
  const getUniqueValues = useCallback(
    (key) => {
      return [...new Set(certificates.map((cert) => cert[key]))].sort();
    },
    [certificates]
  );

  const uniqueTypes = useMemo(() => getUniqueValues("type"), [getUniqueValues]);
  const uniqueIssuers = useMemo(
    () => getUniqueValues("issuer"),
    [getUniqueValues]
  );
  const uniqueStatuses = useMemo(
    () => getUniqueValues("status"),
    [getUniqueValues]
  );

  // Apply filters to certificates
  const filteredCertificates = useMemo(() => {
    return certificates.filter((certificate) => {
      const matchesSearch =
        searchTerm === "" ||
        certificate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        certificate.credentialId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        certificate.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        certificate.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        certificate.skillsValidated.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesStatus =
        statusFilter === "all" || certificate.status === statusFilter;
      const matchesType =
        typeFilter === "all" || certificate.type === typeFilter;
      const matchesIssuer =
        issuerFilter === "all" || certificate.issuer === issuerFilter;

      return matchesSearch && matchesStatus && matchesType && matchesIssuer;
    });
  }, [certificates, searchTerm, statusFilter, typeFilter, issuerFilter]);

  // Statistics calculations
  const statistics = useMemo(() => {
    const totalCertificates = certificates.length;
    const validCertificates = certificates.filter(
      (cert) => cert.status === "Valid"
    ).length;
    const expiringCertificates = certificates.filter(
      (cert) => cert.status === "Expiring Soon"
    ).length;
    const expiredCertificates = certificates.filter(
      (cert) => cert.status === "Expired"
    ).length;

    return {
      total: totalCertificates,
      valid: validCertificates,
      expiring: expiringCertificates,
      expired: expiredCertificates,
      validityRate:
        totalCertificates > 0
          ? ((validCertificates / totalCertificates) * 100).toFixed(1)
          : 0,
    };
  }, [certificates]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTypeFilter("all");
    setIssuerFilter("all");
  };

  const getStatusChipProps = (status) => {
    switch (status) {
      case "Valid":
        return {
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          color: "#4CAF50",
          borderColor: "rgba(76, 175, 80, 0.4)",
        };
      case "Expiring Soon":
        return {
          backgroundColor: "rgba(255, 193, 7, 0.2)",
          color: "#FFC107",
          borderColor: "rgba(255, 193, 7, 0.4)",
        };
      case "Expired":
        return {
          backgroundColor: "rgba(244, 67, 54, 0.2)",
          color: "#F44336",
          borderColor: "rgba(244, 67, 54, 0.4)",
        };
      default:
        return {
          backgroundColor: "rgba(156, 163, 175, 0.2)",
          color: "#9CA3AF",
          borderColor: "rgba(156, 163, 175, 0.4)",
        };
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Cloud Computing":
        return <Cloud fontSize="small" />;
      case "Cybersecurity":
        return <Security fontSize="small" />;
      case "DevOps":
        return <Code fontSize="small" />;
      case "Project Management":
        return <Business fontSize="small" />;
      case "Database":
        return <Assignment fontSize="small" />;
      default:
        return <School fontSize="small" />;
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
            Professional Certifications
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
            Manage your professional certifications and credentials portfolio
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAdd}
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
          Add Certificate
        </Button>
      </Stack>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
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
                  <Assignment sx={{ color: "#A5D6A7" }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ color: "#fff", fontWeight: 700 }}
                  >
                    {statistics.total}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Total Certificates
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
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
                  <Verified sx={{ color: "#4CAF50" }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ color: "#fff", fontWeight: 700 }}
                  >
                    {statistics.valid}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Valid Certificates
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
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
                  <Schedule sx={{ color: "#FFC107" }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ color: "#fff", fontWeight: 700 }}
                  >
                    {statistics.expiring}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Expiring Soon
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
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
                  <Verified sx={{ color: "#A5D6A7" }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ color: "#fff", fontWeight: 700 }}
                  >
                    {statistics.validityRate}%
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Validity Rate
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
                Filter Certificates
              </Typography>
            </Stack>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {filteredCertificates.length} of {certificates.length}
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            {/* Search */}
            <TextField
              placeholder="Search certificates, skills, issuers..."
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

            {/* Type Filter */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#A5D6A7" },
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
                    borderColor: "#A5D6A7",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value="all">All Types</MenuItem>
                {uniqueTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Status Filter */}
            <FormControl size="small" sx={{ minWidth: 140 }}>
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

            {/* Issuer Filter */}
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#A5D6A7" },
                }}
              >
                Issuer
              </InputLabel>
              <Select
                value={issuerFilter}
                onChange={(e) => setIssuerFilter(e.target.value)}
                label="Issuer"
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
                <MenuItem value="all">All Issuers</MenuItem>
                {uniqueIssuers.map((issuer) => (
                  <MenuItem key={issuer} value={issuer}>
                    {issuer}
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

      {/* Certificates Grid */}
      {filteredCertificates.length === 0 ? (
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
          <Assignment
            sx={{ color: "rgba(255,255,255,0.3)", fontSize: 64, mb: 2 }}
          />
          <Typography
            sx={{ color: "rgba(255,255,255,0.6)", mb: 1, fontSize: "1.1rem" }}
          >
            No certificates found
          </Typography>
          <Typography
            sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}
          >
            {searchTerm ||
            statusFilter !== "all" ||
            typeFilter !== "all" ||
            issuerFilter !== "all"
              ? "Try adjusting your filters to see more results"
              : "Start building your certification portfolio"}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredCertificates.map((certificate) => (
            <Grid item xs={12} md={6} lg={4} key={certificate.id}>
              <Card
                sx={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  {/* Content Container - Grows to fill space */}
                  <Box sx={{ flexGrow: 1 }}>
                    {/* Certificate Header */}
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="flex-start"
                      mb={1}
                    >
                      <Box
                        component="img"
                        src={certificate.certificateImage}
                        alt={certificate.title}
                        onClick={() => handleImageClick(certificate)}
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 2,
                          border: "1px solid rgba(255,255,255,0.1)",
                          flexShrink: 0,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "scale(1.1)",
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                        }}
                      />
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            mb: 0.5,
                            lineHeight: 1.3,
                          }}
                        >
                          {certificate.title}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          mb={1}
                        >
                          {getTypeIcon(certificate.type)}
                          <Typography
                            sx={{
                              color: "rgba(255,255,255,0.7)",
                              fontSize: "0.9rem",
                            }}
                          >
                            {certificate.type}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>

                    {/* Issuer - Aligned to Left */}
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "0.85rem",
                        mb: 2,
                        textAlign: "left",
                      }}
                    >
                      {certificate.issuer}
                    </Typography>

                    {/* Status and Dates */}
                    <Stack spacing={2} mb={2}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Chip
                          label={certificate.status}
                          size="small"
                          sx={{
                            ...getStatusChipProps(certificate.status),
                            fontWeight: 600,
                            border: `1px solid ${
                              getStatusChipProps(certificate.status).borderColor
                            }`,
                          }}
                        />
                        <Chip
                          label={certificate.competencyLevel}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(129,199,132,0.2)",
                            color: "#A5D6A7",
                            border: "1px solid rgba(129,199,132,0.4)",
                            fontWeight: 600,
                          }}
                        />
                      </Stack>

                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 1,
                          fontSize: "0.85rem",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              color: "rgba(255,255,255,0.5)",
                              fontSize: "0.75rem",
                            }}
                          >
                            Issued
                          </Typography>
                          <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>
                            {certificate.issueDate}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              color: "rgba(255,255,255,0.5)",
                              fontSize: "0.75rem",
                            }}
                          >
                            Expires
                          </Typography>
                          <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>
                            {certificate.expiryDate || "N/A"}
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>

                    {/* Credential ID */}
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "0.75rem",
                        }}
                      >
                        Credential ID
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.8)",
                          fontSize: "0.85rem",
                          fontFamily: "monospace",
                        }}
                      >
                        {certificate.credentialId}
                      </Typography>
                    </Box>

                    {/* Skills Validated */}
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "0.75rem",
                          mb: 1,
                        }}
                      >
                        Skills Validated
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {certificate.skillsValidated
                          .slice(0, 3)
                          .map((skill, index) => (
                            <Chip
                              key={index}
                              label={skill}
                              size="small"
                              sx={{
                                backgroundColor: "rgba(255,255,255,0.1)",
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "0.7rem",
                                height: "24px",
                              }}
                            />
                          ))}
                        {certificate.skillsValidated.length > 3 && (
                          <Tooltip
                            title={certificate.skillsValidated
                              .slice(3)
                              .join(", ")}
                          >
                            <Chip
                              label={`+${
                                certificate.skillsValidated.length - 3
                              }`}
                              size="small"
                              sx={{
                                backgroundColor: "rgba(255,255,255,0.05)",
                                color: "rgba(255,255,255,0.6)",
                                fontSize: "0.7rem",
                                height: "24px",
                              }}
                            />
                          </Tooltip>
                        )}
                      </Box>
                    </Box>

                    {/* Recognition Level */}
                    <Box sx={{ mb: 2 }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography
                          sx={{
                            color: "rgba(255,255,255,0.5)",
                            fontSize: "0.75rem",
                          }}
                        >
                          Industry Recognition
                        </Typography>
                        <Typography
                          sx={{
                            color:
                              certificate.industryRecognition === "Very High"
                                ? "#4CAF50"
                                : certificate.industryRecognition === "High"
                                ? "#A5D6A7"
                                : "#FFC107",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                          }}
                        >
                          {certificate.industryRecognition}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>

                  {/* Actions */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mt="auto"
                    pt={1}
                    sx={{
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    {/* Left side - Verify button */}
                    <IconButton
                      size="small"
                      onClick={() =>
                        window.open(certificate.verificationLink, "_blank")
                      }
                      sx={{
                        color: "rgba(255,255,255,0.6)",
                        "&:hover": {
                          color: "#fff",
                          backgroundColor: "rgba(255,255,255,0.1)",
                        },
                      }}
                    >
                      <Launch fontSize="small" />
                    </IconButton>

                    {/* Right side - Edit and Delete buttons */}
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(certificate)}
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          "&:hover": {
                            color: "#fff",
                            backgroundColor: "rgba(255,255,255,0.1)",
                          },
                        }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(certificate)}
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          "&:hover": {
                            color: "#f44336",
                            backgroundColor: "rgba(244,67,54,0.1)",
                          },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Certificate Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#1E1E1E",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
              {editingCertificate ? "Edit Certificate" : "Add New Certificate"}
            </Typography>
            <IconButton onClick={handleCloseDialog} sx={{ color: "#fff" }}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            {/* Certificate Title */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Certificate Title *"
                value={formData.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                sx={{
                  mt: 3,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#A5D6A7" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#A5D6A7" },
                }}
              />
            </Grid>

            {/* Credential ID, Issuing Organization, Industry Recognition - Same Row */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Credential ID"
                value={formData.credentialId}
                onChange={(e) =>
                  handleFormChange("credentialId", e.target.value)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#A5D6A7" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#A5D6A7" },
                }}
              />
            </Grid>

            <Grid item xs={12} md={5.5}>
              <TextField
                fullWidth
                label="Issuing Organization *"
                value={formData.issuer}
                onChange={(e) => handleFormChange("issuer", e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#A5D6A7" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#A5D6A7" },
                }}
              />
            </Grid>

            <Grid item xs={12} md={2.5}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&.Mui-focused": { color: "#A5D6A7" },
                  }}
                >
                  Industry score
                </InputLabel>
                <Select
                  value={formData.industryRecognition}
                  onChange={(e) =>
                    handleFormChange("industryRecognition", e.target.value)
                  }
                  label="Industry Recognition"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
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
                  }}
                >
                  {recognitionLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Certificate Type, Issue Date, Expiry Date, Competency Level - Same Row */}
            <Grid item xs={12} md={3.6}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&.Mui-focused": { color: "#A5D6A7" },
                  }}
                >
                  Certificate Type *
                </InputLabel>
                <Select
                  value={formData.type}
                  onChange={(e) => handleFormChange("type", e.target.value)}
                  label="Certificate Type *"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
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
                  }}
                >
                  {certificateTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2.7}>
              <TextField
                fullWidth
                type="date"
                label="Issue Date"
                value={formData.issueDate}
                onChange={(e) => handleFormChange("issueDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#A5D6A7" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#A5D6A7" },
                }}
              />
            </Grid>

            <Grid item xs={12} md={2.7}>
              <TextField
                fullWidth
                type="date"
                label="Expiry Date"
                value={formData.expiryDate}
                onChange={(e) => handleFormChange("expiryDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#A5D6A7" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#A5D6A7" },
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&.Mui-focused": { color: "#A5D6A7" },
                  }}
                >
                  Competency Level
                </InputLabel>
                <Select
                  value={formData.competencyLevel}
                  onChange={(e) =>
                    handleFormChange("competencyLevel", e.target.value)
                  }
                  label="Competency Level"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
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
                  }}
                >
                  {competencyLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Verification Link */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Verification Link"
                value={formData.verificationLink}
                onChange={(e) =>
                  handleFormChange("verificationLink", e.target.value)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#A5D6A7" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#A5D6A7" },
                }}
              />
            </Grid>

            {/* Certificate Image URL */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Certificate Image URL"
                value={formData.certificateImage}
                onChange={(e) =>
                  handleFormChange("certificateImage", e.target.value)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#A5D6A7" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#A5D6A7" },
                }}
              />
            </Grid>

            {/* Skills Validated */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={availableSkills}
                value={formData.skillsValidated}
                onChange={(event, newValue) => {
                  handleFormChange("skillsValidated", newValue);
                }}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      key={index}
                      sx={{
                        backgroundColor: "rgba(129,199,132,0.2)",
                        color: "#A5D6A7",
                        borderColor: "rgba(129,199,132,0.4)",
                        "& .MuiChip-deleteIcon": { color: "#A5D6A7" },
                      }}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Skills Validated"
                    placeholder="Add skills..."
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255,255,255,0.05)",
                        color: "#fff",
                        "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.25)",
                        },
                        "&.Mui-focused fieldset": { borderColor: "#A5D6A7" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#A5D6A7" },
                    }}
                  />
                )}
                sx={{
                  "& .MuiAutocomplete-popupIndicator": {
                    color: "rgba(255,255,255,0.7)",
                  },
                  "& .MuiAutocomplete-clearIndicator": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        <DialogActions sx={{ p: 3, pt: 4 }}>
          <Button
            onClick={handleCloseDialog}
            startIcon={<Close />}
            sx={{
              color: "rgba(255,255,255,0.7)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            startIcon={<Save />}
            variant="contained"
            sx={{
              backgroundColor: "rgba(129,199,132,0.2)",
              color: "#A5D6A7",
              "&:hover": { backgroundColor: "rgba(129,199,132,0.3)" },
              px: 3,
            }}
          >
            {editingCertificate ? "Update Certificate" : "Add Certificate"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmDialog}
        onClose={() => setDeleteConfirmDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#1E1E1E",
            border: "1px solid rgba(244,67,54,0.3)",
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ color: "#fff", pb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Delete sx={{ color: "#f44336" }} />
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
              Delete Certificate
            </Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 2 }}>
            Are you sure you want to delete this certificate? This action cannot
            be undone.
          </Typography>
          {certificateToDelete && (
            <Box
              sx={{
                p: 2,
                backgroundColor: "rgba(244,67,54,0.1)",
                borderRadius: 1,
              }}
            >
              <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                {certificateToDelete.title}
              </Typography>
              <Typography
                sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}
              >
                {certificateToDelete.issuer}
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setDeleteConfirmDialog(false)}
            sx={{
              color: "rgba(255,255,255,0.7)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            startIcon={<Delete />}
            variant="contained"
            sx={{
              backgroundColor: "rgba(244,67,54,0.2)",
              color: "#f44336",
              "&:hover": { backgroundColor: "rgba(244,67,54,0.3)" },
              px: 3,
            }}
          >
            Delete Certificate
          </Button>
        </DialogActions>
      </Dialog>

      {/* Certificate Image Modal */}
      <Dialog
        open={imageModalOpen}
        onClose={handleImageModalClose}
        maxWidth={false}
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
            boxShadow: "none",
            overflow: "visible",
            margin: 0,
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          {/* Close Button - Top Right */}
          <IconButton
            onClick={handleImageModalClose}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "#000 !important",
              color: "#fff !important",
              zIndex: 1000,
              width: 40,
              height: 40,
              border: "2px solid #fff",
              "&:hover": {
                backgroundColor: "#333 !important",
                transform: "scale(1.05)",
              },
            }}
          >
            <Close sx={{ fontSize: 20 }} />
          </IconButton>

          {/* Certificate Image - Natural Size */}
          {selectedImage && (
            <Box
              component="img"
              src={selectedImage.certificateImage}
              alt={selectedImage.title}
              sx={{
                display: "block",
              }}
            />
          )}
        </Box>
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            backgroundColor:
              snackbar.severity === "success"
                ? "rgba(76, 175, 80, 0.9)"
                : "rgba(244, 67, 54, 0.9)",
            color: "#fff",
            "& .MuiAlert-icon": { color: "#fff" },
            "& .MuiIconButton-root": { color: "#fff" },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Certificates;
