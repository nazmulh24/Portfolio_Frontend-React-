import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Link,
  Divider,
} from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Twitter,
  Email,
  LocationOn,
  Phone,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <GitHub />, url: "https://github.com", label: "GitHub" },
    { icon: <LinkedIn />, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Twitter />, url: "https://twitter.com", label: "Twitter" },
    { icon: <Email />, url: "mailto:contact@example.com", label: "Email" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#020c1b",
        borderTop: "1px solid rgba(100, 255, 218, 0.2)",
        mt: 8,
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#64ffda",
                  mb: 2,
                  fontWeight: "bold",
                }}
              >
                Software Engineer
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#8892b0",
                  lineHeight: 1.6,
                  mb: 2,
                }}
              >
                Passionate about creating innovative solutions using Django and
                React. Researcher and tech enthusiast exploring the latest
                technologies.
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {socialLinks.map((link, index) => (
                  <IconButton
                    key={index}
                    component={Link}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "#8892b0",
                      "&:hover": {
                        color: "#64ffda",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </IconButton>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#ccd6f6",
                  mb: 2,
                  fontWeight: "bold",
                }}
              >
                Quick Links
              </Typography>
              {quickLinks.map((link, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Link
                    href={link.path}
                    sx={{
                      color: "#8892b0",
                      textDecoration: "none",
                      "&:hover": {
                        color: "#64ffda",
                        textDecoration: "underline",
                      },
                      transition: "color 0.3s ease",
                    }}
                  >
                    {link.name}
                  </Link>
                </Box>
              ))}
            </motion.div>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#ccd6f6",
                  mb: 2,
                  fontWeight: "bold",
                }}
              >
                Get In Touch
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Email sx={{ color: "#64ffda", mr: 1, fontSize: "1.2rem" }} />
                <Typography variant="body2" sx={{ color: "#8892b0" }}>
                  contact@example.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Phone sx={{ color: "#64ffda", mr: 1, fontSize: "1.2rem" }} />
                <Typography variant="body2" sx={{ color: "#8892b0" }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOn
                  sx={{ color: "#64ffda", mr: 1, fontSize: "1.2rem" }}
                />
                <Typography variant="body2" sx={{ color: "#8892b0" }}>
                  Your City, Country
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(100, 255, 218, 0.1)" }} />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="body2"
            align="center"
            sx={{
              color: "#8892b0",
              "& a": {
                color: "#64ffda",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              },
            }}
          >
            © {currentYear} Portfolio. Built with{" "}
            <Link href="https://reactjs.org" target="_blank" rel="noopener">
              React
            </Link>{" "}
            and{" "}
            <Link
              href="https://djangoproject.com"
              target="_blank"
              rel="noopener"
            >
              Django
            </Link>
            . All rights reserved.
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;
