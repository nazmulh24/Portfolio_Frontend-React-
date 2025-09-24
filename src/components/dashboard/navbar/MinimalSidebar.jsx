import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import {
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
  Home,
  ExitToApp,
  Psychology,
  Info,
  TrendingUp,
  Analytics,
  Contacts,
  Palette,
} from "@mui/icons-material";

const sidebarSections = [
  {
    id: "analytics",
    label: "Analytics Dashboard",
    icon: <Analytics />,
    path: "/dashboard",
    category: "main",
  },
  {
    id: "profile",
    label: "Profile",
    icon: <Person />,
    path: "/dashboard/profile",
    category: "content",
  },
  {
    id: "about",
    label: "About",
    icon: <Info />,
    path: "/dashboard/about",
    category: "content",
  },
  {
    id: "experience",
    label: "Experience",
    icon: <Work />,
    path: "/dashboard/experience",
    category: "content",
  },
  {
    id: "education",
    label: "Education",
    icon: <School />,
    path: "/dashboard/education",
    category: "content",
  },
  {
    id: "skills",
    label: "Skills",
    icon: <Psychology />,
    path: "/dashboard/skills",
    category: "content",
  },
  {
    id: "projects",
    label: "Projects",
    icon: <Code />,
    path: "/dashboard/projects",
    category: "portfolio",
  },
  {
    id: "blog",
    label: "Blog",
    icon: <Article />,
    path: "/dashboard/blog",
    category: "portfolio",
  },
  {
    id: "publications",
    label: "Publications",
    icon: <MenuBook />,
    path: "/dashboard/publications",
    category: "academic",
  },
  {
    id: "awards",
    label: "Awards",
    icon: <EmojiEvents />,
    path: "/dashboard/awards",
    category: "achievements",
  },
  {
    id: "certificates",
    label: "Certificates",
    icon: <Verified />,
    path: "/dashboard/certificates",
    category: "achievements",
  },
  {
    id: "activities",
    label: "Activities",
    icon: <TrendingUp />,
    path: "/dashboard/activities-simple",
    category: "achievements",
  },
  {
    id: "networks",
    label: "Networks",
    icon: <NetworkCheck />,
    path: "/dashboard/networks",
    category: "connections",
  },
  {
    id: "contact",
    label: "Contact",
    icon: <Contacts />,
    path: "/dashboard/contact",
    category: "connections",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings />,
    path: "/dashboard/settings",
    category: "system",
  },
];

const MinimalSidebar = ({
  mobileOpen,
  handleDrawerToggle,
  activeSection,
  onSectionChange,
  profile,
  onBackToWebsite,
  onLogout,
}) => {
  const navigate = useNavigate();
  const [currentTheme, setCurrentTheme] = useState("dark");
  const drawerWidth = 280;

  const themeOptions = [
    {
      value: "dark",
      label: "Dark Theme",
      primary: "#1a1a1a",
      accent: "#00d4ff",
    },
    {
      value: "light",
      label: "Light Theme",
      primary: "#ffffff",
      accent: "#1976d2",
    },
    {
      value: "blue",
      label: "Blue Theme",
      primary: "#0d1421",
      accent: "#2196f3",
    },
    {
      value: "purple",
      label: "Purple Theme",
      primary: "#1a0d21",
      accent: "#9c27b0",
    },
  ];

  const currentThemeData = themeOptions.find(
    (theme) => theme.value === currentTheme
  );
  const isDark =
    currentTheme === "dark" ||
    currentTheme === "blue" ||
    currentTheme === "purple";

  const handleNavigation = (section) => {
    navigate(section.path);
    if (onSectionChange) {
      onSectionChange(section.id);
    }
  };

  const handleBackToWebsite = () => {
    navigate("/");
    if (onBackToWebsite) {
      onBackToWebsite();
    }
  };

  const handleThemeChange = (event) => {
    setCurrentTheme(event.target.value);
    // Theme change logic will be added later
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        backgroundColor: isDark
          ? currentThemeData?.primary || "#1a1a1a"
          : "#f5f5f5",
        borderRight: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Professional Header */}
      <Box
        sx={{
          p: 2.5,
          borderBottom: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
        }}
      >
        {/* Profile */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2.5 }}>
          <Avatar
            src={profile?.avatar}
            sx={{
              width: 45,
              height: 45,
              backgroundColor: currentThemeData?.accent || "#00d4ff",
              mr: 2,
              fontSize: "1.2rem",
              fontWeight: 600,
            }}
          >
            {profile?.name?.charAt(0)?.toUpperCase() || "A"}
          </Avatar>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                color: isDark ? "#fff" : "#000",
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
            >
              {profile?.name || "Admin Panel"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: isDark ? "#888" : "#666", fontSize: "0.8rem" }}
            >
              Portfolio Management System
            </Typography>
          </Box>
        </Box>

        {/* Theme Selector */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Palette sx={{ color: isDark ? "#888" : "#666", fontSize: "1rem" }} />
          <FormControl size="small" fullWidth>
            <Select
              value={currentTheme}
              onChange={handleThemeChange}
              displayEmpty
              sx={{
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.05)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDark
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.2)",
                },
                "& .MuiSelect-select": {
                  color: isDark ? "#fff" : "#000",
                  fontSize: "0.8rem",
                  py: 0.5,
                },
                "& .MuiSvgIcon-root": {
                  color: isDark ? "#888" : "#666",
                },
              }}
            >
              {themeOptions.map((theme) => (
                <MenuItem key={theme.value} value={theme.value}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        backgroundColor: theme.accent,
                        borderRadius: "50%",
                      }}
                    />
                    <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                      {theme.label}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Professional Navigation */}

      {/* Navigation */}
      <Box sx={{ flex: 1, overflowY: "auto", py: 1 }}>
        <List sx={{ p: 0 }}>
          {sidebarSections.map((section, index) => (
            <ListItem key={section.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(section)}
                sx={{
                  mx: 1,
                  borderRadius: 1.5,
                  backgroundColor:
                    activeSection === section.id
                      ? isDark
                        ? "#333"
                        : "#e3f2fd"
                      : "transparent",
                  color:
                    activeSection === section.id
                      ? isDark
                        ? "#fff"
                        : "#1976d2"
                      : isDark
                      ? "#888"
                      : "#666",
                  "&:hover": {
                    backgroundColor: isDark ? "#333" : "#f5f5f5",
                    color: isDark ? "#fff" : "#000",
                  },
                  py: 1,
                  minHeight: 44,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: 36,
                    "& svg": { fontSize: "1.1rem" },
                  }}
                >
                  {section.icon}
                </ListItemIcon>
                <ListItemText
                  primary={section.label}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "0.87rem",
                      fontWeight: activeSection === section.id ? 600 : 400,
                    },
                  }}
                />
                {/* Activity indicator */}
                {section.id === "activities" && (
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      backgroundColor: "#4caf50",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Bottom Actions */}
      <Box sx={{ p: 2, borderTop: `1px solid ${isDark ? "#333" : "#e0e0e0"}` }}>
        <Button
          startIcon={<Home />}
          fullWidth
          onClick={handleBackToWebsite}
          sx={{
            justifyContent: "flex-start",
            color: isDark ? "#888" : "#666",
            textTransform: "none",
            mb: 1,
            py: 1,
            borderRadius: 1.5,
            "&:hover": {
              backgroundColor: isDark ? "#333" : "#f5f5f5",
              color: isDark ? "#fff" : "#000",
            },
          }}
        >
          Back to Website
        </Button>

        <Button
          startIcon={<ExitToApp />}
          fullWidth
          onClick={onLogout}
          sx={{
            justifyContent: "flex-start",
            color: "#ff6b6b",
            textTransform: "none",
            py: 1,
            borderRadius: 1.5,
            "&:hover": {
              backgroundColor: "rgba(255, 107, 107, 0.1)",
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
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
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
              height: "100vh",
              position: "fixed",
              top: 0,
              left: 0,
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

export default MinimalSidebar;
