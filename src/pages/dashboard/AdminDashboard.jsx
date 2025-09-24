import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const adminSections = [
    {
      id: "activities",
      title: "Professional Activities",
      description:
        "Manage conferences, speaking engagements, and community service",
      status: "Ready",
      color: "#00d4ff",
      features: [
        "Full CRUD Operations",
        "Bulk Actions",
        "Export/Import",
        "Advanced Search",
      ],
      path: "/dashboard/activities-admin",
    },
    {
      id: "projects",
      title: "Portfolio Projects",
      description: "Manage your portfolio projects and case studies",
      status: "Template Ready",
      color: "#ff6b35",
      features: ["Project Gallery", "Tech Stack Management", "Status Tracking"],
      path: "#",
    },
    {
      id: "publications",
      title: "Publications & Research",
      description: "Manage academic publications and research work",
      status: "Template Ready",
      color: "#4caf50",
      features: ["Citation Management", "PDF Upload", "Research Categories"],
      path: "#",
    },
    {
      id: "awards",
      title: "Awards & Certifications",
      description: "Manage achievements and professional certifications",
      status: "Template Ready",
      color: "#ff9800",
      features: [
        "Achievement Timeline",
        "Certificate Upload",
        "Verification Links",
      ],
      path: "#",
    },
    {
      id: "networks",
      title: "Professional Networks",
      description: "Manage professional connections and memberships",
      status: "Template Ready",
      color: "#9c27b0",
      features: [
        "Contact Management",
        "Organization Links",
        "Networking Events",
      ],
      path: "#",
    },
    {
      id: "education",
      title: "Education & Training",
      description: "Manage educational background and training history",
      status: "Template Ready",
      color: "#2196f3",
      features: ["Degree Management", "Course Tracking", "Transcript Upload"],
      path: "#",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Ready":
        return "#4caf50";
      case "Template Ready":
        return "#ff9800";
      default:
        return "#666";
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              color: "#fff",
              fontWeight: 700,
              mb: 2,
              background: "linear-gradient(135deg, #00d4ff 0%, #ff6b35 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Professional Admin Management System
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: "#bbb", maxWidth: 600, mx: "auto", mb: 3 }}
          >
            Complete CRUD operations for all your professional data. Manage your
            portfolio, activities, publications, and more with a professional
            interface.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Chip
              label="✅ Full CRUD Operations"
              sx={{ backgroundColor: "#4caf50", color: "#fff" }}
            />
            <Chip
              label="✅ Professional Design"
              sx={{ backgroundColor: "#2196f3", color: "#fff" }}
            />
            <Chip
              label="✅ Bulk Actions"
              sx={{ backgroundColor: "#ff9800", color: "#fff" }}
            />
            <Chip
              label="✅ Data Export/Import"
              sx={{ backgroundColor: "#9c27b0", color: "#fff" }}
            />
          </Box>
        </Box>
      </motion.div>

      {/* Admin Sections Grid */}
      <Grid container spacing={3}>
        {adminSections.map((section, index) => (
          <Grid item xs={12} md={6} key={section.id}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.08)",
                    transform: "translateY(-8px)",
                    borderColor: section.color,
                    boxShadow: `0 20px 40px rgba(${
                      section.color === "#00d4ff"
                        ? "0,212,255"
                        : section.color === "#ff6b35"
                        ? "255,107,53"
                        : section.color === "#4caf50"
                        ? "76,175,80"
                        : section.color === "#ff9800"
                        ? "255,152,0"
                        : section.color === "#9c27b0"
                        ? "156,39,176"
                        : "33,150,243"
                    },0.3)`,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Header */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    >
                      {section.title}
                    </Typography>

                    <Chip
                      label={section.status}
                      size="small"
                      sx={{
                        backgroundColor: getStatusColor(section.status),
                        color: "#fff",
                        fontWeight: 500,
                      }}
                    />
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{ color: "#bbb", mb: 3, lineHeight: 1.6 }}
                  >
                    {section.description}
                  </Typography>

                  {/* Features */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#fff", mb: 1, fontWeight: 500 }}
                    >
                      Features:
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {section.features.map((feature, idx) => (
                        <Chip
                          key={idx}
                          label={feature}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(255,255,255,0.1)",
                            color: "#ccc",
                            fontSize: "0.75rem",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Action Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      if (section.path !== "#") {
                        navigate(section.path);
                      } else {
                        alert(
                          `${section.title} admin panel - Template ready! Copy the pattern from Activities Admin Panel.`
                        );
                      }
                    }}
                    disabled={section.path === "#"}
                    sx={{
                      backgroundColor: section.color,
                      color: "#fff",
                      fontWeight: 600,
                      py: 1.5,
                      "&:hover": {
                        backgroundColor: section.color,
                        filter: "brightness(1.1)",
                      },
                      "&:disabled": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                        color: "#666",
                      },
                    }}
                  >
                    {section.status === "Ready"
                      ? "Open Admin Panel"
                      : "Use Template (Coming Soon)"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card
          sx={{
            backgroundColor: "rgba(0,212,255,0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(0,212,255,0.3)",
            borderRadius: 3,
            mt: 4,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h5"
              sx={{ color: "#00d4ff", mb: 2, fontWeight: 600 }}
            >
              📚 How to Use the Admin System
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
                  1. Start with Activities
                </Typography>
                <Typography variant="body2" sx={{ color: "#bbb" }}>
                  The Activities Admin Panel is fully implemented. Test all CRUD
                  operations, bulk actions, and export functionality.
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
                  2. Copy the Pattern
                </Typography>
                <Typography variant="body2" sx={{ color: "#bbb" }}>
                  Use ActivitiesAdminPanel.jsx as a template. Copy the same
                  structure for other sections with their specific fields.
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
                  3. Customize Forms
                </Typography>
                <Typography variant="body2" sx={{ color: "#bbb" }}>
                  Modify form fields, table columns, and validation rules for
                  each section's specific requirements.
                </Typography>
              </Grid>
            </Grid>

            <Box
              sx={{
                mt: 3,
                p: 2,
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#ccc", fontStyle: "italic" }}
              >
                💡 <strong>Pro Tip:</strong> Check the
                ADMIN_INTEGRATION_GUIDE.md file for complete implementation
                details, code examples, and best practices.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default AdminDashboard;
