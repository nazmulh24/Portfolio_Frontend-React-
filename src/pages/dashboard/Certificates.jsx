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
  Tooltip,
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
} from "@mui/icons-material";

const Certificates = () => {
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [issuerFilter, setIssuerFilter] = useState("all");

  // Comprehensive certificates data with diverse examples
  const allCertificates = useMemo(
    () => [
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
    ],
    []
  );

  // Helper functions for filtering
  const getUniqueValues = useCallback(
    (key) => {
      return [...new Set(allCertificates.map((cert) => cert[key]))].sort();
    },
    [allCertificates]
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
    return allCertificates.filter((certificate) => {
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
  }, [allCertificates, searchTerm, statusFilter, typeFilter, issuerFilter]);

  // Statistics calculations
  const statistics = useMemo(() => {
    const totalCertificates = allCertificates.length;
    const validCertificates = allCertificates.filter(
      (cert) => cert.status === "Valid"
    ).length;
    const expiringCertificates = allCertificates.filter(
      (cert) => cert.status === "Expiring Soon"
    ).length;
    const expiredCertificates = allCertificates.filter(
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
  }, [allCertificates]);

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
              {filteredCertificates.length} of {allCertificates.length}
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
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  {/* Certificate Header */}
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="flex-start"
                    mb={2}
                  >
                    <Box
                      component="img"
                      src={certificate.certificateImage}
                      alt={certificate.title}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 2,
                        border: "1px solid rgba(255,255,255,0.1)",
                        flexShrink: 0,
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
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.85rem",
                        }}
                      >
                        {certificate.issuer}
                      </Typography>
                    </Box>
                  </Stack>

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
                          {certificate.expiryDate}
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
                            label={`+${certificate.skillsValidated.length - 3}`}
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

                  {/* Actions */}
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="flex-end"
                    mt="auto"
                  >
                    <IconButton
                      size="small"
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

export default Certificates;
