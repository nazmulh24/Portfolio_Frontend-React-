import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);

    // Show success message
    setSnackbar({
      open: true,
      message: "Message sent successfully! I'll get back to you soon.",
      severity: "success",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const contactInfo = [
    {
      icon: <EmailIcon />,
      title: "Email",
      content: "nazmul@example.com",
      link: "mailto:nazmul@example.com",
    },
    {
      icon: <PhoneIcon />,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: <LocationIcon />,
      title: "Location",
      content: "San Francisco, CA",
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: <GitHubIcon />,
      link: "https://github.com",
      label: "GitHub",
    },
    {
      icon: <LinkedInIcon />,
      link: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: <TwitterIcon />,
      link: "https://twitter.com",
      label: "Twitter",
    },
  ];

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        minHeight: "100vh",
        padding: { xs: "4rem 0", md: "6rem 0" },
        backgroundColor: "#0a192f",
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              color: "#ccd6f6",
              marginBottom: 2,
              display: "flex",
              alignItems: "center",
              "&::before": {
                content: '"04."',
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                color: "#64ffda",
                fontFamily: "Monaco, monospace",
                marginRight: 2,
              },
              "&::after": {
                content: '""',
                display: "block",
                width: "300px",
                height: "1px",
                backgroundColor: "#233554",
                marginLeft: 2,
              },
            }}
          >
            Get In Touch
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.125rem" },
              color: "#8892b0",
              marginBottom: 6,
              maxWidth: "600px",
              lineHeight: 1.6,
            }}
          >
            I'm always interested in new opportunities, especially ambitious or
            large projects. My inbox is always open. Whether you have a question
            or just want to say hi, I'll try my best to get back to you!
          </Typography>
        </motion.div>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Paper
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  backgroundColor: "#112240",
                  padding: 4,
                  border: "1px solid #233554",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="name"
                      label="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#ccd6f6",
                          "& fieldset": {
                            borderColor: "#233554",
                          },
                          "&:hover fieldset": {
                            borderColor: "#64ffda",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#64ffda",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#8892b0",
                          "&.Mui-focused": {
                            color: "#64ffda",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#ccd6f6",
                          "& fieldset": {
                            borderColor: "#233554",
                          },
                          "&:hover fieldset": {
                            borderColor: "#64ffda",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#64ffda",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#8892b0",
                          "&.Mui-focused": {
                            color: "#64ffda",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="subject"
                      label="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#ccd6f6",
                          "& fieldset": {
                            borderColor: "#233554",
                          },
                          "&:hover fieldset": {
                            borderColor: "#64ffda",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#64ffda",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#8892b0",
                          "&.Mui-focused": {
                            color: "#64ffda",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="message"
                      label="Message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#ccd6f6",
                          "& fieldset": {
                            borderColor: "#233554",
                          },
                          "&:hover fieldset": {
                            borderColor: "#64ffda",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#64ffda",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#8892b0",
                          "&.Mui-focused": {
                            color: "#64ffda",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="outlined"
                      size="large"
                      sx={{
                        color: "#64ffda",
                        borderColor: "#64ffda",
                        padding: "12px 24px",
                        fontSize: "1rem",
                        fontFamily: "Monaco, monospace",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "rgba(100, 255, 218, 0.1)",
                          borderColor: "#64ffda",
                        },
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Box>
                {contactInfo.map((info, index) => (
                  <Box
                    key={info.title}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 3,
                      padding: 2,
                      backgroundColor: "#112240",
                      borderRadius: 1,
                      border: "1px solid #233554",
                    }}
                  >
                    <Box
                      sx={{
                        color: "#64ffda",
                        marginRight: 2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "#ccd6f6",
                          fontWeight: 600,
                        }}
                      >
                        {info.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        component={info.link ? "a" : "span"}
                        href={info.link}
                        sx={{
                          color: "#8892b0",
                          textDecoration: info.link ? "none" : "initial",
                          "&:hover": info.link
                            ? {
                                color: "#64ffda",
                              }
                            : {},
                        }}
                      >
                        {info.content}
                      </Typography>
                    </Box>
                  </Box>
                ))}

                <Box sx={{ marginTop: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#ccd6f6",
                      marginBottom: 2,
                      fontWeight: 600,
                    }}
                  >
                    Connect with me
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {socialLinks.map((social) => (
                      <IconButton
                        key={social.label}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: "#8892b0",
                          backgroundColor: "#112240",
                          border: "1px solid #233554",
                          "&:hover": {
                            color: "#64ffda",
                            backgroundColor: "rgba(100, 255, 218, 0.1)",
                            borderColor: "#64ffda",
                          },
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    ))}
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactSection;
