import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import MinimalSidebar from "../../components/navbar/MinimalSidebar";
import EditDialog from "../../components/common/EditDialog";
import {
  DashboardThemeProvider,
  useDashboardTheme,
} from "../../contexts/DashboardThemeContext";

const DashboardLayoutContent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const location = useLocation();
  const { themeData } = useDashboardTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [editDialog, setEditDialog] = useState({
    open: false,
    type: null,
    data: null,
  });

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
    if (path === "/dashboard" || path === "/dashboard/") return "analytics";
    if (path.includes("/profile")) return "profile";
    if (path.includes("/about")) return "about";
    if (path.includes("/projects")) return "projects";
    if (path.includes("/blog")) return "blog";
    if (path.includes("/publications")) return "publications";
    if (path.includes("/education")) return "education";
    if (path.includes("/experience")) return "experience";
    if (path.includes("/skills")) return "skills";
    if (path.includes("/activities")) return "activities";
    if (path.includes("/awards")) return "awards";
    if (path.includes("/certificates")) return "certificates";
    if (path.includes("/networks")) return "networks";
    if (path.includes("/grants")) return "grants";
    if (path.includes("/contact")) return "contact";
    if (path.includes("/settings")) return "settings";
    return "analytics";
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: themeData.background.default,
        transition: "background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <MinimalSidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        activeSection={getActiveSection()}
        onSectionChange={handleSectionChange}
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
          backgroundColor: themeData.background.paper,
          borderBottom: `1px solid ${themeData.divider}`,
          boxShadow: "none",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: themeData.text.primary }}
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
          backgroundColor: themeData.background.default,
          transition: "background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div style={{ width: "100%", flex: 1 }}>
          <Outlet
            context={{
              handleEdit,
              handleDelete,
              handleSave,
            }}
          />
        </div>
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

const DashboardLayout = () => {
  return (
    <DashboardThemeProvider>
      <DashboardLayoutContent />
    </DashboardThemeProvider>
  );
};

export default DashboardLayout;
