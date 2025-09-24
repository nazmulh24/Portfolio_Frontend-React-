import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import ThreeBackground from "../../components/ThreeBackground";
import MinimalSidebar from "../../components/dashboard/navbar/MinimalSidebar";
import EditDialog from "../../components/dashboard/EditDialog";

const DashboardLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [editDialog, setEditDialog] = useState({
    open: false,
    type: null,
    data: null,
  });

  // Mock data - replace with actual data from your backend
  const dashboardData = {
    profile: {
      name: "Nazmul Hossain",
      title: "Full-Stack Developer",
      email: "nazmul@example.com",
      phone: "+880 1712345678",
      location: "Dhaka, Bangladesh",
      bio: "Passionate full-stack developer with expertise in React, Node.js, and modern web technologies.",
      avatar: "/api/placeholder/120/120",
    },
    stats: {
      totalProjects: 15,
      completedProjects: 12,
      blogPosts: 8,
      publishedPosts: 6,
      publications: 3,
    },
    recentActivity: [
      'Updated project "E-commerce Platform"',
      "Published new blog post about React",
      "Added new skill: TypeScript",
      'Completed project "Portfolio Website"',
    ],
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        description:
          "A full-featured e-commerce platform built with React and Node.js",
        technologies: ["React", "Node.js", "MongoDB", "Express"],
        status: "Completed",
      },
      {
        id: 2,
        title: "Task Management App",
        description: "A collaborative task management application",
        technologies: ["Vue.js", "Laravel", "MySQL"],
        status: "In Progress",
      },
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Technology",
        year: "2018-2022",
        grade: "3.8/4.0",
      },
    ],
    experience: [
      {
        id: 1,
        title: "Senior Full-Stack Developer",
        company: "Tech Solutions Inc.",
        duration: "2022 - Present",
        description:
          "Leading development of web applications using modern technologies.",
      },
    ],
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSectionChange = (section) => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleEdit = (type, data) => {
    setEditDialog({
      open: true,
      type,
      data,
    });
  };

  const handleDelete = (type, id) => {
    // Implement delete functionality
    console.log(`Delete ${type} with id: ${id}`);
  };

  const handleCloseDialog = () => {
    setEditDialog({
      open: false,
      type: null,
      data: null,
    });
  };

  const handleSave = (type, data) => {
    // Implement save functionality
    console.log(`Save ${type}:`, data);
    handleCloseDialog();
  };

  // Get active section from current route
  const getActiveSection = () => {
    const path = location.pathname;
    if (path === "/dashboard" || path === "/dashboard/") return "overview";
    if (path.includes("/settings")) return "settings";
    if (path.includes("/profile")) return "hero";
    if (path.includes("/projects")) return "projects";
    if (path.includes("/blog")) return "blog";
    if (path.includes("/publications")) return "publications";
    if (path.includes("/education")) return "education";
    if (path.includes("/experience")) return "experience";
    if (path.includes("/skills")) return "skills";
    if (path.includes("/awards")) return "awards";
    if (path.includes("/testimonials")) return "testimonials";
    if (path.includes("/analytics")) return "analytics";
    if (path.includes("/contact")) return "contact";
    if (path.includes("/media")) return "media";
    return "overview";
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#0f0f0f",
      }}
    >
      {/* 3D Background - positioned to cover the main content area only */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: { lg: "280px", xs: 0 },
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <ThreeBackground />
      </Box>

      <MinimalSidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        activeSection={getActiveSection()}
        onSectionChange={handleSectionChange}
        profile={dashboardData.profile}
        onBackToWebsite={() => navigate("/")}
        onLogout={() => console.log("Logout")}
      />

      {/* Mobile App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { xs: "100%", lg: `calc(100% - 280px)` },
          ml: { lg: "280px" },
          display: { xs: "block", lg: "none" },
          backgroundColor: "#1a1a1a",
          borderBottom: "1px solid #333",
          boxShadow: "none",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: { xs: 10, lg: 3 },
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            opacity: { duration: 0.5 },
            y: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
          }}
          style={{ width: "100%", flex: 1 }}
        >
          <Outlet
            context={{
              dashboardData,
              handleEdit,
              handleDelete,
              handleSave,
            }}
          />
        </motion.div>
      </Box>

      <EditDialog
        open={editDialog.open}
        type={editDialog.type}
        data={editDialog.data}
        onClose={handleCloseDialog}
        onSave={handleSave}
      />
    </Box>
  );
};

export default DashboardLayout;
