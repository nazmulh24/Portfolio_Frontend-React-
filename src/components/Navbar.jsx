import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Chip,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  AdminPanelSettings,
  Logout,
  AccountCircle,
  Dashboard,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext.js";
import AdminLogin from "./AdminLogin.jsx";

const navItems = [
  { name: "Home", path: "#home" },
  { name: "About", path: "#about" },
  { name: "Portfolio", path: "#portfolio" },
  { name: "Blog", path: "#blog" },
  { name: "Contact", path: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeSection, setActiveSection] = useState("home");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);

      // Update active section based on scroll position
      const sections = ["home", "about", "portfolio", "blog", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAdminMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdminMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setLoginOpen(true);
  };

  const handleLogout = () => {
    logout();
    handleAdminMenuClose();
  };

  const handleDashboard = () => {
    // Navigate to custom admin dashboard
    navigate("/dashboard");
    handleAdminMenuClose();
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setMobileOpen(false); // Close mobile menu if open
  };

  const handleNavClick = (path) => {
    if (path.startsWith("#")) {
      const sectionId = path.substring(1);
      scrollToSection(sectionId);
    }
  };
  const drawer = (
    <Box
      sx={{ textAlign: "center", height: "100%", backgroundColor: "#0a192f" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ color: "#64ffda", fontWeight: "bold" }}>
          Portfolio
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ color: "#ccd6f6" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              onClick={() => handleNavClick(item.path)}
              sx={{
                color:
                  activeSection === item.path.substring(1)
                    ? "#64ffda"
                    : "#ccd6f6",
                "&:hover": {
                  backgroundColor: "rgba(100, 255, 218, 0.1)",
                  color: "#64ffda",
                },
                borderLeft:
                  activeSection === item.path.substring(1)
                    ? "3px solid #64ffda"
                    : "none",
              }}
            >
              <ListItemText primary={item.name} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Mobile Admin Section */}
        <Divider sx={{ my: 2, borderColor: "#233554" }} />
        {isAuthenticated ? (
          <>
            <ListItem disablePadding>
              <ListItemButton sx={{ color: "#64ffda" }}>
                <ListItemText
                  primary={`Admin: ${user?.username}`}
                  sx={{ textAlign: "center" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleDashboard}
                sx={{ color: "#64ffda" }}
              >
                <ListItemText
                  primary="Dashboard"
                  sx={{ textAlign: "center" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout} sx={{ color: "#ff6b6b" }}>
                <ListItemText primary="Logout" sx={{ textAlign: "center" }} />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogin} sx={{ color: "#8892b0" }}>
              <ListItemText
                primary="Admin Login"
                sx={{ textAlign: "center" }}
              />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: scrolled ? "rgba(10, 25, 47, 0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled
            ? "0 10px 30px -10px rgba(2, 12, 27, 0.7)"
            : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            maxWidth: "1200px",
            width: "100%",
            mx: "auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                color: "#64ffda",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "1.5rem",
                "&:hover": {
                  color: "#4fd1c7",
                },
              }}
            >
              {"<Portfolio />"}
            </Typography>
          </motion.div>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ color: "#ccd6f6" }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Button
                    onClick={() => handleNavClick(item.path)}
                    sx={{
                      color:
                        activeSection === item.path.substring(1)
                          ? "#64ffda"
                          : "#ccd6f6",
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: 500,
                      position: "relative",
                      cursor: "pointer",
                      "&:hover": {
                        color: "#64ffda",
                        backgroundColor: "transparent",
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        width:
                          activeSection === item.path.substring(1)
                            ? "100%"
                            : "0%",
                        height: "2px",
                        backgroundColor: "#64ffda",
                        transition: "all 0.3s ease",
                        transform: "translateX(-50%)",
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                </motion.div>
              ))}

              {/* Desktop Admin Section */}
              {isAuthenticated ? (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      ml: 2,
                    }}
                  >
                    <Chip
                      icon={<AdminPanelSettings />}
                      label={user?.username || "Admin"}
                      size="small"
                      sx={{
                        backgroundColor: "#64ffda20",
                        color: "#64ffda",
                        border: "1px solid #64ffda40",
                        "& .MuiChip-icon": {
                          color: "#64ffda",
                        },
                      }}
                    />
                    <IconButton
                      onClick={handleAdminMenuOpen}
                      sx={{ color: "#ccd6f6", ml: 1 }}
                    >
                      <AccountCircle />
                    </IconButton>
                  </Box>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button
                    onClick={handleLogin}
                    startIcon={<AdminPanelSettings />}
                    sx={{
                      color: "#8892b0",
                      textTransform: "none",
                      fontSize: "0.9rem",
                      ml: 2,
                      "&:hover": {
                        color: "#64ffda",
                        backgroundColor: "rgba(100, 255, 218, 0.1)",
                      },
                    }}
                  >
                    Admin
                  </Button>
                </motion.div>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Admin Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleAdminMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: "#112240",
            color: "#ccd6f6",
            border: "1px solid #233554",
            mt: 1,
          },
        }}
      >
        <MenuItem onClick={handleAdminMenuClose} disabled>
          <Typography variant="body2" sx={{ color: "#8892b0" }}>
            Logged in as {user?.first_name} {user?.last_name}
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleDashboard} sx={{ color: "#64ffda" }}>
          <Dashboard sx={{ mr: 1, fontSize: 18 }} />
          Dashboard
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: "#ff6b6b" }}>
          <Logout sx={{ mr: 1, fontSize: 18 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
            backgroundColor: "#0a192f",
            borderRight: "1px solid rgba(100, 255, 218, 0.2)",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Admin Login Dialog */}
      <AdminLogin open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

export default Navbar;
