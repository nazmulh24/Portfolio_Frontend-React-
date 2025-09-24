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

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      {/* Header */}
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
          Admin Control Panel
        </Typography>

        <Typography variant="h6" sx={{ color: "#bbb", mb: 3 }}>
          Manage your portfolio data - Add, Edit, Delete everything from here
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 4 }}>
          <Chip
            label="✅ Simple & Clean"
            sx={{ backgroundColor: "#4caf50", color: "#fff" }}
          />
          <Chip
            label="✅ Full Control"
            sx={{ backgroundColor: "#2196f3", color: "#fff" }}
          />
          <Chip
            label="✅ Professional"
            sx={{ backgroundColor: "#ff9800", color: "#fff" }}
          />
        </Box>
      </Box>

      {/* Admin Sections */}
      <Grid container spacing={3}>
        {adminSections.map((section, index) => (
          <Grid item xs={12} sm={6} key={section.id}>
            <Card
              sx={{
                backgroundColor: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 2,
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.08)",
                  transform: "translateY(-4px)",
                  borderColor: section.color,
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
                    variant="h6"
                    sx={{ color: "#fff", fontWeight: 600 }}
                  >
                    {section.title}
                  </Typography>
                  <Chip
                    label={section.type}
                    size="small"
                    sx={{
                      backgroundColor: section.color,
                      color: "#fff",
                      fontWeight: 500,
                    }}
                  />
                </Box>

                {/* Description */}
                <Typography variant="body2" sx={{ color: "#bbb", mb: 3 }}>
                  {section.description}
                </Typography>

                {/* Action Button */}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    if (section.path !== "#") {
                      navigate(section.path);
                    } else {
                      alert(`${section.title} - Coming Soon!`);
                    }
                  }}
                  disabled={section.path === "#"}
                  sx={{
                    backgroundColor: section.color,
                    color: "#fff",
                    fontWeight: 600,
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
                  {section.path !== "#" ? "Manage" : "Coming Soon"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Instructions */}
      <Card
        sx={{
          backgroundColor: "rgba(0,212,255,0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0,212,255,0.3)",
          borderRadius: 2,
          mt: 4,
        }}
      >
        <CardContent sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6" sx={{ color: "#00d4ff", mb: 2 }}>
            📝 Simple & Effective Admin System
          </Typography>
          <Typography variant="body2" sx={{ color: "#bbb" }}>
            Each section gives you complete control to add, edit, and delete
            your data. Clean interface, professional results.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

// Admin sections
const adminSections = [
  {
    id: "activities",
    title: "Professional Activities",
    description: "Conferences, speaking, training, workshops",
    type: "CRUD",
    color: "#00d4ff",
    path: "/dashboard/activities-simple",
  },
  {
    id: "projects",
    title: "Portfolio Projects",
    description: "Your projects, case studies, work samples",
    type: "CRUD",
    color: "#ff6b35",
    path: "#",
  },
  {
    id: "education",
    title: "Education & Qualifications",
    description: "Degrees, courses, certifications, training",
    type: "CRUD",
    color: "#4caf50",
    path: "#",
  },
  {
    id: "experience",
    title: "Work Experience",
    description: "Jobs, positions, responsibilities, achievements",
    type: "CRUD",
    color: "#9c27b0",
    path: "#",
  },
  {
    id: "awards",
    title: "Awards & Recognition",
    description: "Awards, honors, achievements, recognition",
    type: "CRUD",
    color: "#ff9800",
    path: "#",
  },
  {
    id: "publications",
    title: "Publications & Research",
    description: "Papers, articles, research, publications",
    type: "CRUD",
    color: "#2196f3",
    path: "#",
  },
  {
    id: "skills",
    title: "Skills & Expertise",
    description: "Technical skills, tools, technologies",
    type: "CRUD",
    color: "#f44336",
    path: "#",
  },
  {
    id: "networks",
    title: "Professional Networks",
    description: "LinkedIn, GitHub, social profiles, connections",
    type: "CRUD",
    color: "#607d8b",
    path: "#",
  },
];

export default AdminHome;
