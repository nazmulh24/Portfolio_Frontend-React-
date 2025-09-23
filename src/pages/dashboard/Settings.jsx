import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  TextField,
  Button,
  Avatar,
  IconButton,
  InputAdornment,
  Alert,
  Chip,
  Grid,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  PhotoCamera,
  Person,
  Security,
  Save,
  Lock,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Settings = () => {
  const { dashboardData, handleSave } = useOutletContext();
  const data = dashboardData?.profile;
  const [profileData, setProfileData] = useState({
    fullName: data?.name || "Nazmul Hossain",
    email: data?.email || "nazmul@example.com",
    phone: data?.phone || "+880 1712345678",
    title: data?.title || "Full-Stack Developer",
    bio:
      data?.bio ||
      "Passionate full-stack developer with expertise in React, Node.js, and modern web technologies.",
    location: data?.location || "Dhaka, Bangladesh",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [alerts, setAlerts] = useState({
    profile: null,
    password: null,
  });

  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleProfileSave = () => {
    // Simulate API call
    if (handleSave) {
      handleSave("profile", profileData);
    }
    setAlerts((prev) => ({
      ...prev,
      profile: { type: "success", message: "Profile updated successfully!" },
    }));
    setTimeout(() => {
      setAlerts((prev) => ({ ...prev, profile: null }));
    }, 3000);
  };

  const handlePasswordUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setAlerts((prev) => ({
        ...prev,
        password: { type: "error", message: "Passwords do not match!" },
      }));
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setAlerts((prev) => ({
        ...prev,
        password: {
          type: "error",
          message: "Password must be at least 8 characters long!",
        },
      }));
      return;
    }

    // Simulate API call
    if (handleSave) {
      handleSave("password", passwordData);
    }
    setAlerts((prev) => ({
      ...prev,
      password: { type: "success", message: "Password updated successfully!" },
    }));
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setTimeout(() => {
      setAlerts((prev) => ({ ...prev, password: null }));
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ paddingBottom: "2rem" }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 600 }}>
          Settings
        </Typography>
        <Typography variant="body1" sx={{ color: "#888" }}>
          Manage your account and dashboard preferences.
        </Typography>
      </Box>

      {/* Profile Information Section */}
      <motion.div variants={itemVariants}>
        <Card
          sx={{
            backgroundColor: "transparent",
            border: "1px solid #444",
            borderRadius: 5,
            p: 4,
            mb: 1,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(5px)",
            "&:hover": {
              borderColor: "#4CAF50",
              transition: "border-color 0.3s ease",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Person sx={{ color: "#4CAF50", mr: 2, fontSize: 28 }} />
            <Box>
              <Typography
                variant="h6"
                sx={{ color: "#fff", fontWeight: 700, letterSpacing: 0.5 }}
              >
                Profile Information
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa", mt: 0.5 }}>
                Update your personal and professional details.
              </Typography>
            </Box>
          </Box>

          {alerts.profile && (
            <Alert
              severity={alerts.profile.type}
              sx={{
                mb: 3,
                backgroundColor:
                  alerts.profile.type === "success"
                    ? "rgba(46, 125, 50, 0.1)"
                    : "rgba(211, 47, 47, 0.1)",
                color: "#fff",
                border: `1px solid ${
                  alerts.profile.type === "success" ? "#4CAF50" : "#f44336"
                }`,
                borderRadius: 2,
                backdropFilter: "blur(10px)",
              }}
            >
              {alerts.profile.message}
            </Alert>
          )}

          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Avatar
              src={data?.avatar}
              sx={{
                width: 100,
                height: 100,
                mr: 3,
                border: "3px solid #4CAF50",
                boxShadow: "0 4px 20px rgba(76, 175, 80, 0.3)",
              }}
            />
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ color: "#fff", mb: 1, fontWeight: 600 }}
              >
                Profile Image
              </Typography>
              <Button
                variant="outlined"
                startIcon={<PhotoCamera />}
                sx={{
                  color: "#4CAF50",
                  borderColor: "#4CAF50",
                  borderWidth: 2,
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#66BB6A",
                    backgroundColor: "rgba(76, 175, 80, 0.1)",
                    borderWidth: 2,
                  },
                }}
              >
                Choose File
              </Button>
              <Chip
                label="IN-PROGRESS"
                size="small"
                sx={{
                  ml: 2,
                  backgroundColor: "rgba(25, 118, 210, 0.2)",
                  color: "#64B5F6",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  border: "1px solid #1976d2",
                }}
              />
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={profileData.fullName}
                onChange={(e) =>
                  handleProfileChange("fullName", e.target.value)
                }
                required
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(15, 15, 15, 0.6)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#444", borderWidth: 2 },
                    "&:hover fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: 2,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: 2,
                      boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.1)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#bbb", fontWeight: 500 },
                  "& .MuiInputBase-input": { color: "#fff", fontSize: "1rem" },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={profileData.email}
                onChange={(e) => handleProfileChange("email", e.target.value)}
                required
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(15, 15, 15, 0.6)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#444", borderWidth: 2 },
                    "&:hover fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: 2,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: 2,
                      boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.1)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#bbb", fontWeight: 500 },
                  "& .MuiInputBase-input": { color: "#fff", fontSize: "1rem" },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Number"
                value={profileData.phone}
                onChange={(e) => handleProfileChange("phone", e.target.value)}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(15, 15, 15, 0.6)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#444", borderWidth: 2 },
                    "&:hover fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: 2,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: 2,
                      boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.1)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#bbb", fontWeight: 500 },
                  "& .MuiInputBase-input": { color: "#fff", fontSize: "1rem" },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Professional Title"
                value={profileData.title}
                onChange={(e) => handleProfileChange("title", e.target.value)}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(15, 15, 15, 0.6)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#444", borderWidth: 2 },
                    "&:hover fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: 2,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: 2,
                      boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.1)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#bbb", fontWeight: 500 },
                  "& .MuiInputBase-input": { color: "#fff", fontSize: "1rem" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                multiline
                rows={3}
                value={profileData.bio}
                onChange={(e) => handleProfileChange("bio", e.target.value)}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(15, 15, 15, 0.6)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#444", borderWidth: 2 },
                    "&:hover fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: 2,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: 2,
                      boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.1)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#bbb", fontWeight: 500 },
                  "& .MuiInputBase-input": { color: "#fff", fontSize: "1rem" },
                }}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleProfileSave}
            sx={{
              mt: 3,
              px: 4,
              py: 1.5,
              backgroundColor: "#4CAF50",
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: "0 4px 20px rgba(76, 175, 80, 0.3)",
              "&:hover": {
                backgroundColor: "#45a049",
                boxShadow: "0 6px 24px rgba(76, 175, 80, 0.4)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Save Changes
          </Button>
        </Card>
      </motion.div>

      {/* Password & Security Section */}
      <motion.div variants={itemVariants}>
        <Card
          sx={{
            backgroundColor: "transparent",
            border: "1px solid #444",
            borderRadius: 5,
            p: 4,
            mb: 1,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(5px)",
            "&:hover": {
              borderColor: "#4CAF50",
              transition: "border-color 0.3s ease",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Security sx={{ color: "#4CAF50", mr: 2, fontSize: 28 }} />
            <Box>
              <Typography
                variant="h6"
                sx={{ color: "#fff", fontWeight: 700, letterSpacing: 0.5 }}
              >
                Password & Security
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa", mt: 0.5 }}>
                Update your password to keep your account secure.
              </Typography>
            </Box>
          </Box>

          {alerts.password && (
            <Alert
              severity={alerts.password.type}
              sx={{
                mb: 3,
                backgroundColor:
                  alerts.password.type === "success"
                    ? "rgba(46, 125, 50, 0.1)"
                    : "rgba(211, 47, 47, 0.1)",
                color: "#fff",
                border: `1px solid ${
                  alerts.password.type === "success" ? "#4CAF50" : "#f44336"
                }`,
                borderRadius: 2,
                backdropFilter: "blur(10px)",
              }}
            >
              {alerts.password.message}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                type={showPasswords.current ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={(e) =>
                  handlePasswordChange("currentPassword", e.target.value)
                }
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility("current")}
                        edge="end"
                        sx={{ color: "#bbb" }}
                      >
                        {showPasswords.current ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(15, 15, 15, 0.6)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#444", borderWidth: 2 },
                    "&:hover fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: 2,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: 2,
                      boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.1)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#bbb", fontWeight: 500 },
                  "& .MuiInputBase-input": { color: "#fff", fontSize: "1rem" },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="New Password"
                type={showPasswords.new ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) =>
                  handlePasswordChange("newPassword", e.target.value)
                }
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility("new")}
                        edge="end"
                        sx={{ color: "#bbb" }}
                      >
                        {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(15, 15, 15, 0.6)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#444", borderWidth: 2 },
                    "&:hover fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: 2,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: 2,
                      boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.1)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#bbb", fontWeight: 500 },
                  "& .MuiInputBase-input": { color: "#fff", fontSize: "1rem" },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Confirm New Password"
                type={showPasswords.confirm ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  handlePasswordChange("confirmPassword", e.target.value)
                }
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility("confirm")}
                        edge="end"
                        sx={{ color: "#bbb" }}
                      >
                        {showPasswords.confirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(15, 15, 15, 0.6)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#444", borderWidth: 2 },
                    "&:hover fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: 2,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: 2,
                      boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.1)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#bbb", fontWeight: 500 },
                  "& .MuiInputBase-input": { color: "#fff", fontSize: "1rem" },
                }}
              />
            </Grid>
          </Grid>

          <Typography
            variant="body2"
            sx={{
              color: "#aaa",
              mb: 4,
              fontStyle: "italic",
              backgroundColor: "rgba(76, 175, 80, 0.1)",
              border: "1px solid rgba(76, 175, 80, 0.3)",
              borderRadius: 2,
              p: 2,
              borderLeft: "4px solid #4CAF50",
            }}
          >
            Password must be at least 8 characters long and contain a mix of
            letters, numbers, and symbols.
          </Typography>

          <Button
            variant="contained"
            startIcon={<Lock />}
            onClick={handlePasswordUpdate}
            sx={{
              px: 4,
              py: 1.5,
              backgroundColor: "#4CAF50",
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: "0 4px 20px rgba(76, 175, 80, 0.3)",
              "&:hover": {
                backgroundColor: "#45a049",
                boxShadow: "0 6px 24px rgba(76, 175, 80, 0.4)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Update Password
          </Button>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
