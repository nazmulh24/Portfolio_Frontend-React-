import { useNavigate } from "react-router-dom";
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
  Computer,
  DarkMode,
  LightMode,
  Water,
  Diamond,
  Nature,
  LocalFireDepartment,
} from "@mui/icons-material";
import { useDashboardTheme } from "../../contexts/DashboardThemeContext";

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
    path: "/dashboard/activities",
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
  const {
    currentTheme,
    themeData,
    themeDefinitions,
    changeTheme,
    isAnimating,
  } = useDashboardTheme();
  const drawerWidth = 280;

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
    changeTheme(event.target.value);
  };

  // Get theme display name with system info
  const getThemeDisplayName = (themeKey, theme) => {
    if (themeKey === "system") {
      return `System Theme`;
    }
    return theme.name;
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        backgroundColor: themeData.sidebar.background,
        borderRight: `1px solid ${themeData.sidebar.border}`,
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Professional Header */}
      <Box
        sx={{
          p: 2.5,
          borderBottom: `1px solid ${themeData.sidebar.border}`,
          transition: "all 0.3s ease",
        }}
      >
        {/* Profile */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2.5 }}>
          <Avatar
            src={profile?.avatar}
            sx={{
              width: 45,
              height: 45,
              backgroundColor: themeData.primary,
              mr: 2,
              fontSize: "1.2rem",
              fontWeight: 600,
              boxShadow: `0 0 20px ${themeData.primary}40`,
              transition: "all 0.3s ease",
            }}
          >
            {profile?.name?.charAt(0)?.toUpperCase() || "A"}
          </Avatar>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                color: themeData.text.primary,
                fontWeight: 600,
                fontSize: "0.95rem",
                transition: "color 0.3s ease",
              }}
            >
              {profile?.name || "Admin Panel"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: themeData.text.secondary,
                fontSize: "0.8rem",
                transition: "color 0.3s ease",
              }}
            >
              ADMIN
            </Typography>
          </Box>
        </Box>

        {/* Theme Selector - Icon Outside Left */}
        <Box
          sx={{
            backgroundColor: `${themeData.primary}08`,
            border: `1px solid ${themeData.primary}20`,
            borderRadius: "12px",
            padding: 1,
            mt: 2,
            mb: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {/* Theme Icon - Outside Left */}
          <Palette
            sx={{
              color: themeData.primary,
              fontSize: "1.2rem",
              filter: `drop-shadow(0 0 4px ${themeData.primary}60)`,
              flexShrink: 0,
            }}
          />

          {/* Dropdown - Takes remaining space */}
          <FormControl size="small" sx={{ flex: 1 }}>
            <Select
              value={currentTheme}
              onChange={handleThemeChange}
              displayEmpty
              disabled={isAnimating}
              renderValue={() => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  {/* Current Theme Display */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {currentTheme === "system" ? (
                      <Computer
                        sx={{
                          color: themeData.text.secondary,
                          fontSize: "1rem",
                        }}
                      />
                    ) : currentTheme === "dark" ? (
                      <DarkMode
                        sx={{
                          color: themeData.text.secondary,
                          fontSize: "1rem",
                        }}
                      />
                    ) : currentTheme === "light" ? (
                      <LightMode
                        sx={{
                          color: themeData.text.secondary,
                          fontSize: "1rem",
                        }}
                      />
                    ) : currentTheme === "blue" ? (
                      <Water
                        sx={{
                          color: themeData.text.secondary,
                          fontSize: "1rem",
                        }}
                      />
                    ) : currentTheme === "purple" ? (
                      <Diamond
                        sx={{
                          color: themeData.text.secondary,
                          fontSize: "1rem",
                        }}
                      />
                    ) : currentTheme === "green" ? (
                      <Nature
                        sx={{
                          color: themeData.text.secondary,
                          fontSize: "1rem",
                        }}
                      />
                    ) : currentTheme === "orange" ? (
                      <LocalFireDepartment
                        sx={{
                          color: themeData.text.secondary,
                          fontSize: "1rem",
                        }}
                      />
                    ) : (
                      <Palette
                        sx={{
                          color: themeData.text.secondary,
                          fontSize: "1rem",
                        }}
                      />
                    )}

                    <Typography
                      sx={{
                        color: themeData.text.primary,
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        textTransform: "capitalize",
                      }}
                    >
                      {currentTheme === "system"
                        ? "System"
                        : getThemeDisplayName(
                            currentTheme,
                            themeDefinitions[currentTheme]
                          )}
                    </Typography>
                  </Box>

                  {/* Right Side - Loading Indicator */}
                  {isAnimating && (
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        border: `2px solid ${themeData.primary}60`,
                        borderTop: `2px solid ${themeData.primary}`,
                        animation: "spin 1s linear infinite",
                        "@keyframes spin": {
                          "0%": { transform: "rotate(0deg)" },
                          "100%": { transform: "rotate(360deg)" },
                        },
                      }}
                    />
                  )}
                </Box>
              )}
              sx={{
                backgroundColor: themeData.card.background,
                border: `1px solid ${themeData.card.border}`,
                borderRadius: "8px",
                boxShadow: `0 2px 8px ${
                  themeData.mode === "dark"
                    ? "rgba(0,0,0,0.2)"
                    : "rgba(0,0,0,0.08)"
                }`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  backgroundColor: themeData.sidebar.hover,
                  borderColor: `${themeData.primary}40`,
                  boxShadow: `0 4px 12px ${themeData.primary}20`,
                },
                "&.Mui-focused": {
                  borderColor: themeData.primary,
                  boxShadow: `0 0 0 2px ${themeData.primary}25`,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSelect-select": {
                  padding: "8px 10px !important",
                  display: "flex !important",
                  alignItems: "center !important",
                  justifyContent: "space-between !important",
                },
                "& .MuiSvgIcon-root": {
                  color: `${themeData.primary}80`,
                  fontSize: "1.2rem",
                  transition: "all 0.3s ease",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: themeData.card.background,
                    border: `1px solid ${themeData.card.border}30`,
                    borderRadius: "12px",
                    mt: 1,
                    minWidth: 220,
                    maxHeight: 320,
                    boxShadow: `
                      0 10px 40px ${
                        themeData.mode === "dark"
                          ? "rgba(0,0,0,0.7)"
                          : "rgba(0,0,0,0.15)"
                      },
                      0 0 0 1px ${themeData.primary}10
                    `,
                    backdropFilter: "blur(16px)",
                    overflow: "hidden",
                    "& .MuiList-root": {
                      padding: "8px",
                    },
                    "& .MuiMenuItem-root": {
                      borderRadius: "8px",
                      margin: "2px 0",
                      padding: "10px 12px",
                      minHeight: "auto",
                      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: themeData.text.primary,
                      "&:hover": {
                        backgroundColor: `${themeData.primary}12`,
                        transform: "translateX(2px)",
                      },
                      "&.Mui-selected": {
                        backgroundColor: `${themeData.primary}15`,
                        color: themeData.primary,
                        "&:hover": {
                          backgroundColor: `${themeData.primary}20`,
                        },
                      },
                    },
                  },
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "right",
                },
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
                slotProps: {
                  paper: {
                    style: {
                      transformOrigin: "top right",
                    },
                  },
                },
              }}
            >
              {/* System Theme Option */}
              <MenuItem
                value="system"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  pr: 2,
                }}
              >
                <Computer
                  sx={{
                    fontSize: "1.1rem",
                    color:
                      currentTheme === "system"
                        ? themeData.primary
                        : themeData.text.secondary,
                    transition: "color 0.2s ease",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: currentTheme === "system" ? 600 : 500,
                    color:
                      currentTheme === "system"
                        ? themeData.primary
                        : themeData.text.primary,
                    lineHeight: 1.2,
                  }}
                >
                  System
                </Typography>
                {currentTheme === "system" && (
                  <Box
                    sx={{
                      ml: "auto",
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: themeData.primary,
                      boxShadow: `0 0 8px ${themeData.primary}60`,
                    }}
                  />
                )}
              </MenuItem>

              {/* Manual Theme Options */}
              {Object.entries(themeDefinitions)
                .filter(([key]) => key !== "system")
                .map(([key, theme]) => (
                  <MenuItem
                    key={key}
                    value={key}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      pr: 2,
                    }}
                  >
                    {/* Theme Icon */}
                    {key === "dark" && (
                      <DarkMode
                        sx={{
                          fontSize: "1.1rem",
                          color:
                            currentTheme === key
                              ? theme.primary
                              : themeData.text.secondary,
                          transition: "color 0.2s ease",
                        }}
                      />
                    )}
                    {key === "light" && (
                      <LightMode
                        sx={{
                          fontSize: "1.1rem",
                          color:
                            currentTheme === key
                              ? theme.primary
                              : themeData.text.secondary,
                          transition: "color 0.2s ease",
                        }}
                      />
                    )}
                    {key === "blue" && (
                      <Water
                        sx={{
                          fontSize: "1.1rem",
                          color:
                            currentTheme === key
                              ? theme.primary
                              : themeData.text.secondary,
                          transition: "color 0.2s ease",
                        }}
                      />
                    )}
                    {key === "purple" && (
                      <Diamond
                        sx={{
                          fontSize: "1.1rem",
                          color:
                            currentTheme === key
                              ? theme.primary
                              : themeData.text.secondary,
                          transition: "color 0.2s ease",
                        }}
                      />
                    )}
                    {key === "green" && (
                      <Nature
                        sx={{
                          fontSize: "1.1rem",
                          color:
                            currentTheme === key
                              ? theme.primary
                              : themeData.text.secondary,
                          transition: "color 0.2s ease",
                        }}
                      />
                    )}
                    {key === "orange" && (
                      <LocalFireDepartment
                        sx={{
                          fontSize: "1.1rem",
                          color:
                            currentTheme === key
                              ? theme.primary
                              : themeData.text.secondary,
                          transition: "color 0.2s ease",
                        }}
                      />
                    )}
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: currentTheme === key ? 600 : 500,
                        color:
                          currentTheme === key
                            ? theme.primary
                            : themeData.text.primary,
                        lineHeight: 1.2,
                      }}
                    >
                      {getThemeDisplayName(key, theme)}
                    </Typography>
                    {currentTheme === key && (
                      <Box
                        sx={{
                          ml: "auto",
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: theme.primary,
                          boxShadow: `0 0 8px ${theme.primary}60`,
                        }}
                      />
                    )}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflowY: "auto", py: 1 }}>
        <List sx={{ p: 0 }}>
          {sidebarSections.map((section, index) => (
            <ListItem key={section.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(section)}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  backgroundColor:
                    activeSection === section.id
                      ? themeData.sidebar.active
                      : "transparent",
                  color:
                    activeSection === section.id
                      ? themeData.primary
                      : themeData.text.secondary,
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    backgroundColor: themeData.sidebar.hover,
                    color: themeData.text.primary,
                    transform: "translateX(4px)",
                    boxShadow:
                      activeSection === section.id
                        ? `0 4px 20px ${themeData.primary}30`
                        : "none",
                  },
                  py: 1.25,
                  minHeight: 48,
                  border:
                    activeSection === section.id
                      ? `1px solid ${themeData.primary}40`
                      : "none",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: 38,
                    "& svg": {
                      fontSize: "1.2rem",
                      transition: "all 0.2s ease",
                    },
                  }}
                >
                  {section.icon}
                </ListItemIcon>
                <ListItemText
                  primary={section.label}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "0.88rem",
                      fontWeight: activeSection === section.id ? 600 : 400,
                      transition: "font-weight 0.2s ease",
                    },
                  }}
                />
                {/* Activity indicator for active sections */}
                {activeSection === section.id && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      backgroundColor: themeData.primary,
                      borderRadius: "50%",
                      boxShadow: `0 0 10px ${themeData.primary}`,
                      animation: "pulse 2s infinite",
                      "@keyframes pulse": {
                        "0%, 100%": {
                          opacity: 1,
                          transform: "scale(1)",
                        },
                        "50%": {
                          opacity: 0.7,
                          transform: "scale(1.2)",
                        },
                      },
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Professional Bottom Actions */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${themeData.sidebar.border}`,
          transition: "all 0.3s ease",
        }}
      >
        <Button
          startIcon={<Home />}
          fullWidth
          onClick={handleBackToWebsite}
          sx={{
            justifyContent: "flex-start",
            color: themeData.text.secondary,
            textTransform: "none",
            mb: 1,
            py: 1.25,
            borderRadius: 2,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: themeData.sidebar.hover,
              color: themeData.text.primary,
              transform: "translateX(4px)",
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
            color: themeData.error,
            textTransform: "none",
            py: 1.25,
            borderRadius: 2,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: `${themeData.error}15`,
              transform: "translateX(4px)",
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
