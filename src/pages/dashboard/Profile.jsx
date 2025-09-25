import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Alert,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Edit,
  Save,
  Cancel,
  Person,
  Info,
  Work,
  School,
  Code,
  Build,
  EmojiEvents,
  Timeline,
  Group,
  ContactMail,
  Settings,
  Email,
  Phone,
  LocationOn,
  Language,
  LinkedIn,
  GitHub,
  Twitter,
  Upload,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const { dashboardData, handleEdit } = useOutletContext();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [saveAlert, setSaveAlert] = useState(null);
  const [photoDialog, setPhotoDialog] = useState(false);

  const [profileData, setProfileData] = useState({
    // Basic Information
    avatar: "/api/placeholder/150/150",
    name: "Nazmul Hossain",
    title: "Full Stack Developer",
    tagline: "Building the future with code",
    bio: "Passionate full-stack developer with 5+ years of experience creating innovative web applications. Specialized in React, Node.js, and cloud technologies.",
    
    // Contact Information
    email: "nazmul@example.com",
    phone: "+880 1234567890",
    location: "Dhaka, Bangladesh",
    website: "https://nazmulhossain.dev",
    
    // Social Links
    socialLinks: {
      linkedin: "https://linkedin.com/in/nazmulhossain",
      github: "https://github.com/nazmulh24",
      twitter: "https://twitter.com/nazmulhossain",
    },
    
    // Professional
    currentPosition: "Senior Full Stack Developer",
    company: "Tech Solutions Ltd.",
    experience: [
      {
        id: 1,
        title: "Senior Full Stack Developer",
        company: "Tech Solutions Ltd.",
        period: "2022 - Present",
        description: "Leading development of enterprise web applications"
      },
      {
        id: 2,
        title: "Frontend Developer",
        company: "Digital Agency",
        period: "2020 - 2022",
        description: "Developed responsive web applications using React"
      }
    ],
    
    // Education
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Computer Science",
        institution: "Dhaka University",
        year: "2020",
        grade: "3.75/4.00"
      }
    ],
    
    // Skills
    skills: {
      technical: ["JavaScript", "React", "Node.js", "Python", "MongoDB", "AWS"],
      frameworks: ["React", "Next.js", "Express.js", "Django", "FastAPI"],
      tools: ["Git", "Docker", "VS Code", "Figma", "Postman"]
    },
    
    // Projects
    featuredProjects: [
      {
        id: 1,
        name: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with React and Node.js",
        technologies: ["React", "Node.js", "MongoDB"],
        status: "Completed"
      }
    ],
    
    // Achievements
    achievements: [
      {
        id: 1,
        title: "Best Developer Award",
        organization: "Tech Solutions Ltd.",
        year: "2023"
      }
    ],
    
    // Settings
    settings: {
      profileVisibility: true,
      showEmail: true,
      showPhone: false,
      allowMessages: true,
      emailNotifications: true
    }
  });

  const tabSections = [
    { label: "Profile", icon: <Person />, value: "profile" },
    { label: "About", icon: <Info />, value: "about" },
    { label: "Experience", icon: <Work />, value: "experience" },
    { label: "Education", icon: <School />, value: "education" },
    { label: "Skills", icon: <Code />, value: "skills" },
    { label: "Projects", icon: <Build />, value: "projects" },
    { label: "Achievements", icon: <EmojiEvents />, value: "achievements" },
    { label: "Contact", icon: <ContactMail />, value: "contact" },
    { label: "Settings", icon: <Settings />, value: "settings" },
  ];

  const handleSave = () => {
    if (handleEdit) {
      handleEdit("profile", profileData);
    }
    setIsEditing(false);
    setSaveAlert({
      type: "success",
      message: "Profile updated successfully!",
    });
    setTimeout(() => setSaveAlert(null), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data logic would go here
  };

  const handleInputChange = (section, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayAdd = (section, newItem) => {
    setProfileData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...newItem, id: Date.now() }]
    }));
  };

  const handleArrayRemove = (section, id) => {
    setProfileData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const ProfileSection = () => (
    <Grid container spacing={3}>
      {/* Profile Header Card */}
      <Grid item xs={12}>
        <Card
          sx={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(255,107,53,0.1) 100%)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(0,212,255,0.2)",
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={profileData.avatar}
                  sx={{ width: 120, height: 120, border: "4px solid rgba(0,212,255,0.5)" }}
                />
                {isEditing && (
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: -5,
                      right: -5,
                      backgroundColor: "#00d4ff",
                      color: "#000",
                      width: 35,
                      height: 35,
                      "&:hover": { backgroundColor: "#00b8e6" }
                    }}
                    onClick={() => setPhotoDialog(true)}
                  >
                    <Upload sx={{ fontSize: 18 }} />
                  </IconButton>
                )}
              </Box>
              
              <Box sx={{ flex: 1 }}>
                {isEditing ? (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      variant="outlined"
                      sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "rgba(255,255,255,0.05)" } }}
                    />
                    <TextField
                      fullWidth
                      label="Professional Title"
                      value={profileData.title}
                      onChange={(e) => setProfileData(prev => ({ ...prev, title: e.target.value }))}
                      variant="outlined"
                      sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "rgba(255,255,255,0.05)" } }}
                    />
                    <TextField
                      fullWidth
                      label="Tagline"
                      value={profileData.tagline}
                      onChange={(e) => setProfileData(prev => ({ ...prev, tagline: e.target.value }))}
                      variant="outlined"
                      sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "rgba(255,255,255,0.05)" } }}
                    />
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="h3" sx={{ color: "#fff", fontWeight: 700, mb: 1 }}>
                      {profileData.name}
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#00d4ff", mb: 1, fontWeight: 600 }}>
                      {profileData.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#bbb", fontStyle: "italic" }}>
                      {profileData.tagline}
                    </Typography>
                  </Box>
                )}
              </Box>
              
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Chip
                  label="Available for Work"
                  sx={{
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                    color: "#4caf50",
                    fontWeight: 600,
                    border: "1px solid rgba(76, 175, 80, 0.5)"
                  }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      {/* Quick Stats */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {[
            { label: "Projects Completed", value: "15+", icon: <Build />, color: "#00d4ff" },
            { label: "Years Experience", value: "5+", icon: <Timeline />, color: "#4caf50" },
            { label: "Happy Clients", value: "50+", icon: <Group />, color: "#ff9800" },
            { label: "Awards Won", value: "3", icon: <EmojiEvents />, color: "#e91e63" },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 2,
                  textAlign: "center",
                  p: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    borderColor: stat.color,
                    boxShadow: `0 10px 30px rgba(${stat.color.slice(1).match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(",")}, 0.3)`
                  }
                }}
              >
                <Box sx={{ color: stat.color, mb: 2 }}>
                  {React.cloneElement(stat.icon, { sx: { fontSize: 40 } })}
                </Box>
                <Typography variant="h4" sx={{ color: stat.color, fontWeight: 700, mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: "#bbb" }}>
                  {stat.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );

  const AboutSection = () => (
    <Card
      sx={{
        backgroundColor: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ color: "#fff", fontWeight: 600, mb: 3 }}>
          About Me
        </Typography>
        {isEditing ? (
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Biography"
            value={profileData.bio}
            onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "rgba(255,255,255,0.05)" } }}
          />
        ) : (
          <Typography variant="body1" sx={{ color: "#ccc", lineHeight: 1.8 }}>
            {profileData.bio}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  const ContactSection = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            backgroundColor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600, mb: 3 }}>
              Contact Information
            </Typography>
            <List>
              {[
                { icon: <Email />, label: "Email", value: profileData.email, key: "email" },
                { icon: <Phone />, label: "Phone", value: profileData.phone, key: "phone" },
                { icon: <LocationOn />, label: "Location", value: profileData.location, key: "location" },
                { icon: <Language />, label: "Website", value: profileData.website, key: "website" },
              ].map((item, index) => (
                <ListItem key={index} sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ color: "#00d4ff", minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    secondary={isEditing ? (
                      <TextField
                        size="small"
                        value={item.value}
                        onChange={(e) => setProfileData(prev => ({ ...prev, [item.key]: e.target.value }))}
                        variant="outlined"
                        sx={{ mt: 1, "& .MuiOutlinedInput-root": { backgroundColor: "rgba(255,255,255,0.05)" } }}
                      />
                    ) : item.value}
                    primaryTypographyProps={{ sx: { color: "#fff", fontSize: "0.9rem" } }}
                    secondaryTypographyProps={{ sx: { color: "#bbb", mt: 0.5 } }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            backgroundColor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600, mb: 3 }}>
              Social Media
            </Typography>
            <List>
              {[
                { icon: <LinkedIn />, label: "LinkedIn", value: profileData.socialLinks.linkedin, key: "linkedin" },
                { icon: <GitHub />, label: "GitHub", value: profileData.socialLinks.github, key: "github" },
                { icon: <Twitter />, label: "Twitter", value: profileData.socialLinks.twitter, key: "twitter" },
              ].map((item, index) => (
                <ListItem key={index} sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ color: "#00d4ff", minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    secondary={isEditing ? (
                      <TextField
                        size="small"
                        value={item.value}
                        onChange={(e) => handleInputChange("socialLinks", item.key, e.target.value)}
                        variant="outlined"
                        sx={{ mt: 1, "& .MuiOutlinedInput-root": { backgroundColor: "rgba(255,255,255,0.05)" } }}
                      />
                    ) : (
                      <Button
                        href={item.value}
                        target="_blank"
                        sx={{ color: "#00d4ff", textTransform: "none", p: 0, justifyContent: "flex-start" }}
                      >
                        {item.value}
                      </Button>
                    )}
                    primaryTypographyProps={{ sx: { color: "#fff", fontSize: "0.9rem" } }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: return <ProfileSection />;
      case 1: return <AboutSection />;
      case 2: return <div>Experience Section (Coming Soon)</div>;
      case 3: return <div>Education Section (Coming Soon)</div>;
      case 4: return <div>Skills Section (Coming Soon)</div>;
      case 5: return <div>Projects Section (Coming Soon)</div>;
      case 6: return <div>Achievements Section (Coming Soon)</div>;
      case 7: return <ContactSection />;
      case 8: return <div>Settings Section (Coming Soon)</div>;
      default: return <ProfileSection />;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ paddingBottom: "2rem" }}
    >
      {/* Header */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 600 }}>
            Professional Profile
          </Typography>
          <Typography variant="body1" sx={{ color: "#888" }}>
            Manage your complete professional profile and portfolio information
          </Typography>
        </Box>

        {!isEditing ? (
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => setIsEditing(true)}
            sx={{
              borderColor: "#4CAF50",
              color: "#4CAF50",
              borderWidth: 2,
              borderRadius: 2,
              fontWeight: 600,
              "&:hover": {
                borderColor: "#66BB6A",
                backgroundColor: "rgba(76, 175, 80, 0.1)",
                borderWidth: 2,
              },
            }}
          >
            Edit Profile
          </Button>
        ) : (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSave}
              sx={{
                backgroundColor: "#4CAF50",
                borderRadius: 2,
                fontWeight: 600,
                "&:hover": { backgroundColor: "#45a049" },
              }}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={handleCancel}
              sx={{
                borderColor: "#666",
                color: "#666",
                borderRadius: 2,
                "&:hover": {
                  borderColor: "#888",
                  backgroundColor: "rgba(102, 102, 102, 0.1)",
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>

      {/* Alert */}
      {saveAlert && (
        <motion.div variants={itemVariants}>
          <Alert
            severity={saveAlert.type}
            sx={{
              mb: 3,
              backgroundColor:
                saveAlert.type === "success"
                  ? "rgba(46, 125, 50, 0.1)"
                  : "rgba(211, 47, 47, 0.1)",
              color: "#fff",
              border: `1px solid ${
                saveAlert.type === "success" ? "#4CAF50" : "#f44336"
              }`,
              borderRadius: 2,
              backdropFilter: "blur(10px)",
            }}
          >
            {saveAlert.message}
          </Alert>
        </motion.div>
      )}

      {/* Navigation Tabs */}
      <motion.div variants={itemVariants}>
        <Card
          sx={{
            backgroundColor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                color: "#bbb",
                fontWeight: 500,
                textTransform: "none",
                minWidth: 120,
                "&.Mui-selected": { color: "#00d4ff" },
              },
              "& .MuiTabs-indicator": { backgroundColor: "#00d4ff" },
            }}
          >
            {tabSections.map((tab, index) => (
              <Tab
                key={index}
                icon={tab.icon}
                label={tab.label}
                iconPosition="start"
                sx={{ gap: 1 }}
              />
            ))}
          </Tabs>
        </Card>
      </motion.div>

      {/* Tab Content */}
      <motion.div variants={itemVariants}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Photo Upload Dialog */}
      <Dialog open={photoDialog} onClose={() => setPhotoDialog(false)}>
        <DialogTitle>Upload Profile Photo</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Choose a new profile photo. Recommended size: 400x400px
          </Typography>
          <Button variant="outlined" component="label" fullWidth>
            Choose File
            <input type="file" hidden accept="image/*" />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPhotoDialog(false)}>Cancel</Button>
          <Button onClick={() => setPhotoDialog(false)} variant="contained">Upload</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default Profile;
