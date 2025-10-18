import React, { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
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
} from "@mui/material";
import {
  Add,
  Edit,
  Launch,
  Search,
  FilterList,
  Clear,
} from "@mui/icons-material";

const Certificates = () => {
  const { dashboardData, handleEdit } = useOutletContext?.() || {};

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [issuerFilter, setIssuerFilter] = useState("all");

  // Sample certificates data - will be replaced with real data from dashboardData
  const allCertificates = useMemo(() => {
    return (
      dashboardData?.certificates ?? [
        {
          id: "aws-csa-1",
          title: "AWS Certified Solutions Architect",
          credentialId: "AWS-CSA-2024-001",
          issuer: "Amazon Web Services",
          issueDate: "2024",
          expiryDate: "2027",
          status: "Valid",
          certificateImage: "/api/placeholder/80/60",
        },
        {
          id: "aws-csa-2",
          title: "AWS Certified Solutions Architect",
          credentialId: "AWS-CSA-2024-001",
          issuer: "Amazon Web Services",
          issueDate: "2024",
          expiryDate: "2027",
          status: "Valid",
          certificateImage: "/api/placeholder/80/60",
        },
        {
          id: "react-dev-1",
          title: "React Developer Certification",
          credentialId: "META-12345-REACT",
          issuer: "Meta",
          issueDate: "2024-05-20",
          expiryDate: "2026-05-20",
          status: "Valid",
          certificateImage: "/api/placeholder/80/60",
        },
        {
          id: "react-dev-2",
          title: "React Developer Certification",
          credentialId: "META-12345-REACT",
          issuer: "Meta",
          issueDate: "2024-05-20",
          expiryDate: "2026-05-20",
          status: "Valid",
          certificateImage: "/api/placeholder/80/60",
        },
        {
          id: "react-dev-3",
          title: "React Developer Certification",
          credentialId: "META-12345-REACT",
          issuer: "Meta",
          issueDate: "2024-05-20",
          expiryDate: "2026-05-20",
          status: "Valid",
          certificateImage: "/api/placeholder/80/60",
        },
      ]
    );
  }, [dashboardData]);

  // Get unique issuers for filter dropdown
  const uniqueIssuers = useMemo(() => {
    const issuers = [...new Set(allCertificates.map((cert) => cert.issuer))];
    return issuers.sort();
  }, [allCertificates]);

  // Get unique statuses for filter dropdown
  const uniqueStatuses = useMemo(() => {
    const statuses = [...new Set(allCertificates.map((cert) => cert.status))];
    return statuses.sort();
  }, [allCertificates]);

  // Apply filters to certificates
  const filteredCertificates = useMemo(() => {
    return allCertificates.filter((certificate) => {
      const matchesSearch =
        searchTerm === "" ||
        certificate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        certificate.credentialId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        certificate.issuer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || certificate.status === statusFilter;
      const matchesIssuer =
        issuerFilter === "all" || certificate.issuer === issuerFilter;

      return matchesSearch && matchesStatus && matchesIssuer;
    });
  }, [allCertificates, searchTerm, statusFilter, issuerFilter]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setIssuerFilter("all");
  };

  const handleAddCertificate = () => {
    handleEdit?.("certificates", { mode: "create" });
  };

  const handleEditCertificate = (certificate) => {
    handleEdit?.("certificates", { mode: "edit", data: certificate });
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
            Certifications
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
            Manage your professional certifications and credentials
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddCertificate}
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

      {/* Professional Certifications Section */}
      <Box sx={{ mb: 4 }}>
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
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <FilterList sx={{ color: "rgba(255,255,255,0.7)" }} />
            <Typography
              sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}
            >
              Filters
            </Typography>
            {(searchTerm ||
              statusFilter !== "all" ||
              issuerFilter !== "all") && (
              <Button
                size="small"
                startIcon={<Clear />}
                onClick={handleClearFilters}
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                  textTransform: "none",
                }}
              >
                Clear filters
              </Button>
            )}
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            flexWrap="wrap"
            alignItems={{ xs: "stretch", sm: "center" }}
          >
            {/* Search */}
            <TextField
              size="small"
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "rgba(255,255,255,0.5)" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                minWidth: { xs: "100%", sm: 250 },
                flex: { xs: 1, sm: "none" },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "#fff",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgba(129,199,132,0.5)",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255,255,255,0.5)",
                },
              }}
            />

            {/* Status Filter */}
            <FormControl
              size="small"
              sx={{
                minWidth: { xs: "100%", sm: 120 },
                flex: { xs: 1, sm: "none" },
              }}
            >
              <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                Status
              </InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.1)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.2)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(129,199,132,0.5)",
                  },
                  "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.7)" },
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
            <FormControl
              size="small"
              sx={{
                minWidth: { xs: "100%", sm: 180 },
                flex: { xs: 1, sm: "none" },
              }}
            >
              <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                Issuer
              </InputLabel>
              <Select
                value={issuerFilter}
                onChange={(e) => setIssuerFilter(e.target.value)}
                label="Issuer"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.1)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.2)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(129,199,132,0.5)",
                  },
                  "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.7)" },
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

            {/* Results Count */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ml: { xs: 0, sm: 2 },
                mt: { xs: 1, sm: 0 },
                width: { xs: "100%", sm: "auto" },
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                }}
              >
                Showing {filteredCertificates.length} of{" "}
                {allCertificates.length} certificates
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Table Container */}
        <Box
          sx={{
            overflowX: { xs: "auto", sm: "visible" },
            minWidth: { xs: "720px", sm: "100%" }, // Increased for wider status/action columns
            width: "100%",
          }}
        >
          {/* Table Header */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "300px 180px 100px 100px 120px 120px", // Fixed widths for mobile scroll - wider status & actions
                sm: "2fr 1.3fr 0.8fr 0.8fr 1.1fr 1.2fr", // Better proportions on tablet
                md: "3fr 1.8fr 1fr 1fr 1.3fr 1.4fr", // Optimized for desktop - more space for status/actions
              },
              gap: { xs: 2, sm: 2, md: 3 },
              px: 3,
              py: 2,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              mb: 2,
              minWidth: 0, // Allow grid items to shrink
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              Certificate
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              Issuer
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontWeight: 600,
                fontSize: "0.9rem",
                textAlign: "center",
              }}
            >
              Issue Date
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontWeight: 600,
                fontSize: "0.9rem",
                textAlign: "center",
              }}
            >
              Expiry Date
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontWeight: 600,
                fontSize: "0.9rem",
                textAlign: "center",
              }}
            >
              Status
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontWeight: 600,
                fontSize: "0.9rem",
                textAlign: "center",
              }}
            >
              Actions
            </Typography>
          </Box>

          {/* Certificate Rows */}
          <Stack spacing={1}>
            {filteredCertificates.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 6,
                  px: 3,
                  backgroundColor: "rgba(255,255,255,0.02)",
                  borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 1 }}>
                  No certificates found
                </Typography>
                <Typography
                  sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}
                >
                  {searchTerm ||
                  statusFilter !== "all" ||
                  issuerFilter !== "all"
                    ? "Try adjusting your filters to see more results"
                    : "No certificates available"}
                </Typography>
              </Box>
            ) : (
              filteredCertificates.map((certificate) => (
                <Box
                  key={certificate.id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "300px 180px 100px 100px 120px 120px", // Fixed widths for mobile scroll - wider status & actions
                      sm: "2fr 1.3fr 0.8fr 0.8fr 1.1fr 1.2fr", // Better proportions on tablet
                      md: "3fr 1.8fr 1fr 1fr 1.3fr 1.4fr", // Optimized for desktop - more space for status/actions
                    },
                    gap: { xs: 2, sm: 2, md: 3 },
                    px: 3,
                    py: 2.5,
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 2,
                    minWidth: 0, // Allow grid items to shrink
                    overflow: "hidden", // Prevent content overflow
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    },
                    transition: "all 0.2s ease",
                    alignItems: "center",
                  }}
                >
                  {/* Certificate Info */}
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ minWidth: 0, overflow: "hidden" }}
                  >
                    <Box
                      component="img"
                      src={certificate.certificateImage}
                      sx={{
                        width: 60,
                        height: 45,
                        borderRadius: 1,
                        border: "1px solid rgba(255,255,255,0.1)",
                        flexShrink: 0,
                      }}
                    />
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: "0.95rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {certificate.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.85rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        ID: {certificate.credentialId}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Issuer */}
                  <Box
                    sx={{ display: "flex", alignItems: "center", minWidth: 0 }}
                  >
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.9rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        flex: 1,
                      }}
                    >
                      {certificate.issuer}
                    </Typography>
                  </Box>

                  {/* Issue Date */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.9rem",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      {certificate.issueDate}
                    </Typography>
                  </Box>

                  {/* Expiry Date */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.9rem",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      {certificate.expiryDate}
                    </Typography>
                  </Box>

                  {/* Status */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Chip
                      label={certificate.status}
                      size="small"
                      sx={{
                        backgroundColor:
                          certificate.status === "Valid"
                            ? "rgba(76, 175, 80, 0.2)"
                            : certificate.status === "Expired"
                            ? "rgba(244, 67, 54, 0.2)"
                            : "rgba(255, 193, 7, 0.2)",
                        color:
                          certificate.status === "Valid"
                            ? "#4CAF50"
                            : certificate.status === "Expired"
                            ? "#F44336"
                            : "#FFC107",
                        border:
                          certificate.status === "Valid"
                            ? "1px solid rgba(76, 175, 80, 0.4)"
                            : certificate.status === "Expired"
                            ? "1px solid rgba(244, 67, 54, 0.4)"
                            : "1px solid rgba(255, 193, 7, 0.4)",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        height: "26px",
                        minWidth: "70px",
                        maxWidth: "90px",
                        "& .MuiChip-label": {
                          px: 1,
                          py: 0.2,
                          lineHeight: 1.2,
                        },
                      }}
                    />
                  </Box>

                  {/* Actions */}
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      flexShrink: 0,
                      justifyContent: "center",
                      alignItems: "center",
                      minWidth: "100px",
                      width: "100%",
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleEditCertificate(certificate)}
                      sx={{
                        color: "rgba(255,255,255,0.6)",
                        width: 32,
                        height: 32,
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
                      onClick={() => window.open("#", "_blank")}
                      sx={{
                        color: "rgba(255,255,255,0.6)",
                        width: 32,
                        height: 32,
                        "&:hover": {
                          color: "#fff",
                          backgroundColor: "rgba(255,255,255,0.1)",
                        },
                      }}
                    >
                      <Launch fontSize="small" />
                    </IconButton>
                  </Stack>
                </Box>
              ))
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Certificates;
