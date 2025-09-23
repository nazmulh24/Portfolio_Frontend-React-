import React, { useState } from "react";
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
import ThreeBackground from "../components/ThreeBackground";
import {
  DashboardSidebar,
  OverviewContent,
  HeroSection,
  ComingSoonSection,
  EditDialog,
} from "../components/dashboard";

const AdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
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
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
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
    setActiveSection(section);
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

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewContent data={dashboardData} />;
      case "hero":
        return <HeroSection data={dashboardData.profile} onEdit={handleEdit} />;
      case "projects":
        return (
          <ComingSoonSection
            sectionName="Projects"
            data={dashboardData.projects}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      case "blog":
        return <ComingSoonSection sectionName="Blog" />;
      case "publications":
        return <ComingSoonSection sectionName="Publications" />;
      case "education":
        return (
          <ComingSoonSection
            sectionName="Education"
            data={dashboardData.education}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      case "experience":
        return (
          <ComingSoonSection
            sectionName="Experience"
            data={dashboardData.experience}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      case "skills":
        return <ComingSoonSection sectionName="Skills" />;
      case "awards":
        return <ComingSoonSection sectionName="Awards" />;
      case "testimonials":
        return <ComingSoonSection sectionName="Testimonials" />;
      case "settings":
        return <ComingSoonSection sectionName="Settings" />;
      case "analytics":
        return <ComingSoonSection sectionName="Analytics" />;
      case "contact":
        return <ComingSoonSection sectionName="Contact" />;
      case "media":
        return <ComingSoonSection sectionName="Media" />;
      default:
        return <OverviewContent data={dashboardData} />;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#0f0f0f",
        width: "100vw",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        position: "relative",
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

      <DashboardSidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        profile={dashboardData.profile}
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
          width: "100%",
        }}
      >
        <motion.div
          key={activeSection}
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
          {renderContent()}
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

export default AdminDashboard;
