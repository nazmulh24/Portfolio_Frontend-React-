import React from "react";
import {
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Drawer,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Person,
  Code,
  Work,
  School,
  Settings,
  Article,
  MenuBook,
  EmojiEvents,
  Verified,
  NetworkCheck,
  MonetizationOn,
  Home,
  ExitToApp,
} from "@mui/icons-material";

const sidebarSections = [
  {
    id: "overview",
    label: "Overview",
    icon: <DashboardIcon />,
    description: "Dashboard overview",
  },
  {
    id: "hero",
    label: "Hero Section",
    icon: <Person />,
    description: "Personal information",
  },
  {
    id: "about",
    label: "About Section",
    icon: <Person />,
    description: "About me content",
  },
  {
    id: "education",
    label: "Education Section",
    icon: <School />,
    description: "Educational background",
  },
  {
    id: "experiences",
    label: "Experiences Section",
    icon: <Work />,
    description: "Work experience",
  },
  {
    id: "projects",
    label: "Projects",
    icon: <Code />,
    description: "Portfolio projects",
  },
  {
    id: "blog",
    label: "Blog Posts",
    icon: <Article />,
    description: "Blog management",
  },
  {
    id: "publications",
    label: "Publications",
    icon: <MenuBook />,
    description: "Academic publications",
  },
  {
    id: "activities",
    label: "Activities",
    icon: <EmojiEvents />,
    description: "Professional activities",
  },
  {
    id: "awards",
    label: "Awards",
    icon: <EmojiEvents />,
    description: "Awards & recognition",
  },
  {
    id: "certificates",
    label: "Certificates",
    icon: <Verified />,
    description: "Certifications",
  },
  {
    id: "networks",
    label: "Networks",
    icon: <NetworkCheck />,
    description: "Professional networks",
  },
  {
    id: "grants",
    label: "Grants",
    icon: <MonetizationOn />,
    description: "Research grants",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings />,
    description: "Application settings",
  },
];

const DashboardSidebar = ({
  mobileOpen,
  handleDrawerToggle,
  activeSection,
  onSectionChange,
  profile,
  onBackToWebsite,
  onLogout,
}) => {
  const drawerWidth = 280;

  const drawer = (
    <Box
      sx={{
        height: "100%",
        backgroundColor: "#1a1a1a",
        borderRight: "1px solid #333",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Profile Section */}
      <Box sx={{ p: 3, borderBottom: "1px solid #333" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            src={profile?.avatar}
            sx={{
              width: 50,
              height: 50,
              backgroundColor: "#4CAF50",
              mr: 2,
              fontSize: "1.5rem",
              fontWeight: 600,
            }}
          >
            {profile?.name?.charAt(0)?.toUpperCase() || "A"}
          </Avatar>
          <Box>
            <Typography
              variant="h6"
              sx={{ color: "#fff", fontSize: "1rem", fontWeight: 600 }}
            >
              {profile?.name || "Dashboard"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#888", fontSize: "0.8rem" }}
            >
              {profile?.title || "Admin Panel"}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <List sx={{ p: 1 }}>
          {sidebarSections.map((section) => (
            <ListItem key={section.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => onSectionChange(section.id)}
                sx={{
                  borderRadius: "8px",
                  mx: 1,
                  backgroundColor:
                    activeSection === section.id ? "#333" : "transparent",
                  color: activeSection === section.id ? "#fff" : "#888",
                  "&:hover": {
                    backgroundColor: "#333",
                    color: "#fff",
                  },
                  py: 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: 40,
                    "& svg": { fontSize: "1.2rem" },
                  }}
                >
                  {section.icon}
                </ListItemIcon>
                <ListItemText
                  primary={section.label}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "0.9rem",
                      fontWeight: activeSection === section.id ? 500 : 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Bottom Actions */}
      <Box sx={{ p: 2, borderTop: "1px solid #333" }}>
        <Button
          startIcon={<Home />}
          onClick={onBackToWebsite}
          sx={{
            width: "100%",
            justifyContent: "flex-start",
            color: "#888",
            textTransform: "none",
            mb: 1,
            "&:hover": {
              backgroundColor: "#333",
              color: "#fff",
            },
          }}
        >
          Back to Website
        </Button>
        <Button
          startIcon={<ExitToApp />}
          onClick={onLogout}
          sx={{
            width: "100%",
            justifyContent: "flex-start",
            color: "#888",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#333",
              color: "#fff",
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#1a1a1a",
            borderRight: "1px solid #333",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer container */}
      <Box
        component="nav"
        sx={{
          width: { lg: drawerWidth },
          flexShrink: { lg: 0 },
          display: { xs: "none", lg: "block" },
        }}
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#1a1a1a",
              borderRight: "1px solid #333",
              height: "100vh",
              position: "relative",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default DashboardSidebar;
