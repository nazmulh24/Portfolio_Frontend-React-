import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Chip,
  Fab,
} from "@mui/material";
import {
  Person,
  Lock,
  Edit,
  Save,
  Cancel,
  Visibility,
  VisibilityOff,
  Camera,
  ContactMail,
  LinkedIn,
  GitHub,
  Twitter,
  Language,
  Add,
  Delete,
} from "@mui/icons-material";

const Settings = () => {
  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Nazmul Hossain",
    title: "Full-stack Developer & Product Strategist",
    email: "hello@nazmul.dev",
    phone: "+880 1712-345678",
    location: "Dhaka, Bangladesh",
    avatar: "https://i.pravatar.cc/120?img=58",
  });

  // Password editing state
  const [isEditingPassword, setIsEditingPassword] = useState(false);
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

  // Contact editing state
  const [isEditingContacts, setIsEditingContacts] = useState(false);
  const [contactData, setContactData] = useState({
    socialLinks: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/nazmulh24",
        icon: "LinkedIn",
      },
      {
        platform: "GitHub",
        url: "https://github.com/nazmulh24",
        icon: "GitHub",
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/nazmulh24",
        icon: "Twitter",
      },
      { platform: "Website", url: "https://nazmul.dev", icon: "Language" },
    ],
    additionalInfo: {
      bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications and leading cross-functional teams.",
      availability: "Available for freelance projects",
      timezone: "GMT+6 (Dhaka)",
    },
  });

  const handleProfileSave = () => {
    // Handle profile save logic here
    setIsEditingProfile(false);
    console.log("Profile saved:", profileData);
  };

  const handlePasswordSave = () => {
    // Handle password save logic here
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    setIsEditingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    console.log("Password updated");
  };

  const handleContactSave = () => {
    // Handle contact save logic here
    setIsEditingContacts(false);
    console.log("Contacts saved:", contactData);
  };

  const handleCancel = () => {
    setIsEditingProfile(false);
    setIsEditingPassword(false);
    setIsEditingContacts(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleAddSocialLink = () => {
    setContactData({
      ...contactData,
      socialLinks: [
        ...contactData.socialLinks,
        { platform: "", url: "", icon: "Language" },
      ],
    });
  };

  const handleRemoveSocialLink = (index) => {
    const updatedLinks = contactData.socialLinks.filter((_, i) => i !== index);
    setContactData({ ...contactData, socialLinks: updatedLinks });
  };

  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = contactData.socialLinks.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    setContactData({ ...contactData, socialLinks: updatedLinks });
  };

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "LinkedIn":
        return <LinkedIn />;
      case "GitHub":
        return <GitHub />;
      case "Twitter":
        return <Twitter />;
      case "Language":
        return <Language />;
      default:
        return <Language />;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#0D1117",
        p: 3,
      }}
    >
      {/* Enhanced Header */}
      <Box
        sx={{
          mb: 5,
          p: 4,
          borderRadius: 4,
          background:
            "linear-gradient(135deg, rgba(100,181,246,0.1) 0%, rgba(66,165,245,0.05) 100%)",
          border: "1px solid rgba(100,181,246,0.2)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            background:
              "radial-gradient(circle, rgba(100,181,246,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <Stack spacing={2}>
          <Typography
            variant="h3"
            sx={{
              color: "#fff",
              fontWeight: 800,
              background: "linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Settings & Preferences
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.8)",
              fontWeight: 400,
              maxWidth: 700,
            }}
          >
            Customize your profile, manage security settings, and update contact
            information
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip
              label="Profile Management"
              sx={{
                backgroundColor: "rgba(100,181,246,0.2)",
                color: "#90CAF9",
                fontWeight: 600,
              }}
            />
            <Chip
              label="Security & Privacy"
              sx={{
                backgroundColor: "rgba(129,199,132,0.2)",
                color: "#A5D6A7",
                fontWeight: 600,
              }}
            />
            <Chip
              label="Contact Information"
              sx={{
                backgroundColor: "rgba(255,213,79,0.2)",
                color: "#FFD54F",
                fontWeight: 600,
              }}
            />
          </Stack>
        </Stack>
      </Box>

      <Grid container spacing={4}>
        {/* Profile Settings */}
        <Grid item xs={12}>
          <Card
            sx={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 4,
              height: "fit-content",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                border: "1px solid rgba(100,181,246,0.3)",
              },
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={3}>
                {/* Profile Header */}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Person sx={{ color: "#64B5F6" }} />
                    <Typography
                      variant="h6"
                      sx={{ color: "#fff", fontWeight: 600 }}
                    >
                      Profile Information
                    </Typography>
                  </Stack>
                  {!isEditingProfile && (
                    <IconButton
                      onClick={() => setIsEditingProfile(true)}
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        "&:hover": {
                          color: "#fff",
                          backgroundColor: "rgba(255,255,255,0.1)",
                        },
                      }}
                    >
                      <Edit />
                    </IconButton>
                  )}
                </Stack>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

                {/* Profile Avatar */}
                <Stack direction="row" alignItems="center" spacing={3}>
                  <Box sx={{ position: "relative" }}>
                    <Avatar
                      src={profileData.avatar}
                      sx={{
                        width: 80,
                        height: 80,
                        border: "2px solid #64B5F6",
                      }}
                    />
                    {isEditingProfile && (
                      <IconButton
                        sx={{
                          position: "absolute",
                          bottom: -5,
                          right: -5,
                          backgroundColor: "#64B5F6",
                          color: "#fff",
                          "&:hover": { backgroundColor: "#42A5F5" },
                          width: 32,
                          height: 32,
                        }}
                      >
                        <Camera fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ color: "#fff", fontWeight: 600 }}
                    >
                      {profileData.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {profileData.title}
                    </Typography>
                  </Box>
                </Stack>

                {/* Profile Form */}
                <Grid container spacing={3}>
                  {/* First Row */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Full Name"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      disabled={!isEditingProfile}
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.4)",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Professional Title"
                      value={profileData.title}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          title: e.target.value,
                        })
                      }
                      disabled={!isEditingProfile}
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.4)",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>

                  {/* Second Row */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email Address"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                      disabled={!isEditingProfile}
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.4)",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Phone Number"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                      disabled={!isEditingProfile}
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.4)",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>

                  {/* Third Row - Location spans full width */}
                  <Grid item xs={12}>
                    <TextField
                      label="Location"
                      value={profileData.location}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          location: e.target.value,
                        })
                      }
                      disabled={!isEditingProfile}
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.4)",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Profile Actions */}
                {isEditingProfile && (
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      startIcon={<Cancel />}
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        borderColor: "rgba(255,255,255,0.2)",
                        "&:hover": {
                          borderColor: "rgba(255,255,255,0.4)",
                          backgroundColor: "rgba(255,255,255,0.05)",
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleProfileSave}
                      startIcon={<Save />}
                      sx={{
                        background:
                          "linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%)",
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)",
                        },
                      }}
                    >
                      Save Changes
                    </Button>
                  </Stack>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Password Settings */}
        <Grid item xs={12}>
          <Card
            sx={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 4,
              height: "fit-content",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                border: "1px solid rgba(100,181,246,0.3)",
              },
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={3}>
                {/* Password Header */}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Lock sx={{ color: "#64B5F6" }} />
                    <Typography
                      variant="h6"
                      sx={{ color: "#fff", fontWeight: 600 }}
                    >
                      Password & Security
                    </Typography>
                  </Stack>
                  {!isEditingPassword && (
                    <IconButton
                      onClick={() => setIsEditingPassword(true)}
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        "&:hover": {
                          color: "#fff",
                          backgroundColor: "rgba(255,255,255,0.1)",
                        },
                      }}
                    >
                      <Edit />
                    </IconButton>
                  )}
                </Stack>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

                {!isEditingPassword ? (
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ color: "rgba(255,255,255,0.8)", mb: 2 }}
                    >
                      Your password was last updated on October 15, 2024
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      Keep your account secure by using a strong, unique
                      password and enabling two-factor authentication.
                    </Typography>
                  </Box>
                ) : (
                  <Stack spacing={3}>
                    <TextField
                      label="Current Password"
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowPasswords({
                                  ...showPasswords,
                                  current: !showPasswords.current,
                                })
                              }
                              sx={{ color: "rgba(255,255,255,0.6)" }}
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
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.4)",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />

                    <TextField
                      label="New Password"
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowPasswords({
                                  ...showPasswords,
                                  new: !showPasswords.new,
                                })
                              }
                              sx={{ color: "rgba(255,255,255,0.6)" }}
                            >
                              {showPasswords.new ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.4)",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />

                    <TextField
                      label="Confirm New Password"
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowPasswords({
                                  ...showPasswords,
                                  confirm: !showPasswords.confirm,
                                })
                              }
                              sx={{ color: "rgba(255,255,255,0.6)" }}
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
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.4)",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />

                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      Password should be at least 8 characters long and include
                      a mix of letters, numbers, and special characters.
                    </Typography>
                  </Stack>
                )}

                {/* Password Actions */}
                {isEditingPassword && (
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      startIcon={<Cancel />}
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        borderColor: "rgba(255,255,255,0.2)",
                        "&:hover": {
                          borderColor: "rgba(255,255,255,0.4)",
                          backgroundColor: "rgba(255,255,255,0.05)",
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handlePasswordSave}
                      startIcon={<Save />}
                      sx={{
                        background:
                          "linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%)",
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)",
                        },
                      }}
                    >
                      Update Password
                    </Button>
                  </Stack>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact & Social Settings */}
        <Grid item xs={12}>
          <Card
            sx={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 4,
              height: "fit-content",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                border: "1px solid rgba(100,181,246,0.3)",
              },
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={3}>
                {/* Contact Header */}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <ContactMail sx={{ color: "#64B5F6" }} />
                    <Typography
                      variant="h6"
                      sx={{ color: "#fff", fontWeight: 600 }}
                    >
                      Contact & Social
                    </Typography>
                  </Stack>
                  {!isEditingContacts && (
                    <IconButton
                      onClick={() => setIsEditingContacts(true)}
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        "&:hover": {
                          color: "#fff",
                          backgroundColor: "rgba(255,255,255,0.1)",
                        },
                      }}
                    >
                      <Edit />
                    </IconButton>
                  )}
                </Stack>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

                {/* Bio Section */}
                <Stack spacing={2}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}
                  >
                    Professional Bio
                  </Typography>
                  <TextField
                    multiline
                    rows={3}
                    value={contactData.additionalInfo.bio}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        additionalInfo: {
                          ...contactData.additionalInfo,
                          bio: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditingContacts}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "#fff",
                        "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.4)",
                        },
                      },
                    }}
                  />
                </Stack>

                {/* Social Links */}
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}
                    >
                      Social Links
                    </Typography>
                    {isEditingContacts && (
                      <Fab
                        size="small"
                        onClick={handleAddSocialLink}
                        sx={{
                          backgroundColor: "rgba(100,181,246,0.2)",
                          color: "#64B5F6",
                          "&:hover": {
                            backgroundColor: "rgba(100,181,246,0.3)",
                          },
                          width: 32,
                          height: 32,
                        }}
                      >
                        <Add fontSize="small" />
                      </Fab>
                    )}
                  </Stack>

                  <Grid container spacing={2}>
                    {contactData.socialLinks.map((link, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        {isEditingContacts ? (
                          <Stack spacing={1}>
                            <TextField
                              label="Platform"
                              value={link.platform}
                              onChange={(e) =>
                                handleSocialLinkChange(
                                  index,
                                  "platform",
                                  e.target.value
                                )
                              }
                              size="small"
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  color: "#fff",
                                  "& fieldset": {
                                    borderColor: "rgba(255,255,255,0.2)",
                                  },
                                },
                                "& .MuiInputLabel-root": {
                                  color: "rgba(255,255,255,0.7)",
                                },
                              }}
                            />
                            <Stack direction="row" spacing={1} alignItems="center">
                              <TextField
                                label="URL"
                                value={link.url}
                                onChange={(e) =>
                                  handleSocialLinkChange(
                                    index,
                                    "url",
                                    e.target.value
                                  )
                                }
                                size="small"
                                fullWidth
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    color: "#fff",
                                    "& fieldset": {
                                      borderColor: "rgba(255,255,255,0.2)",
                                    },
                                  },
                                  "& .MuiInputLabel-root": {
                                    color: "rgba(255,255,255,0.7)",
                                  },
                                }}
                              />
                              <IconButton
                                onClick={() => handleRemoveSocialLink(index)}
                                sx={{ color: "rgba(255,100,100,0.8)" }}
                                size="small"
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Stack>
                          </Stack>
                        ) : (
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(255,255,255,0.08)",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(100,181,246,0.2)",
                              },
                            }}
                          >
                            {getIconComponent(link.icon)}
                            <Stack sx={{ minWidth: 0, flex: 1 }}>
                              <Typography
                                variant="body2"
                                sx={{ color: "#fff", fontWeight: 500 }}
                              >
                                {link.platform}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "rgba(255,255,255,0.6)",
                                  cursor: "pointer",
                                  "&:hover": { color: "#64B5F6" },
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                                onClick={() => window.open(link.url, "_blank")}
                              >
                                {link.url}
                              </Typography>
                            </Stack>
                          </Stack>
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </Stack>

                {/* Additional Info */}
                <Stack spacing={2}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}
                  >
                    Additional Information
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Availability Status"
                        value={contactData.additionalInfo.availability}
                        onChange={(e) =>
                          setContactData({
                            ...contactData,
                            additionalInfo: {
                              ...contactData.additionalInfo,
                              availability: e.target.value,
                            },
                          })
                        }
                        disabled={!isEditingContacts}
                        fullWidth
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            color: "#fff",
                            "& fieldset": {
                              borderColor: "rgba(255,255,255,0.2)",
                            },
                            "&:hover fieldset": {
                              borderColor: "rgba(255,255,255,0.4)",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: "rgba(255,255,255,0.7)",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Timezone"
                        value={contactData.additionalInfo.timezone}
                        onChange={(e) =>
                          setContactData({
                            ...contactData,
                            additionalInfo: {
                              ...contactData.additionalInfo,
                              timezone: e.target.value,
                            },
                          })
                        }
                        disabled={!isEditingContacts}
                        fullWidth
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            color: "#fff",
                            "& fieldset": {
                              borderColor: "rgba(255,255,255,0.2)",
                            },
                            "&:hover fieldset": {
                              borderColor: "rgba(255,255,255,0.4)",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: "rgba(255,255,255,0.7)",
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Stack>

                {/* Contact Actions */}
                {isEditingContacts && (
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      startIcon={<Cancel />}
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        borderColor: "rgba(255,255,255,0.2)",
                        "&:hover": {
                          borderColor: "rgba(255,255,255,0.4)",
                          backgroundColor: "rgba(255,255,255,0.05)",
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleContactSave}
                      startIcon={<Save />}
                      sx={{
                        background:
                          "linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%)",
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)",
                        },
                      }}
                    >
                      Save Changes
                    </Button>
                  </Stack>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
