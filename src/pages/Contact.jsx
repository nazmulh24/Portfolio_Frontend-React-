import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { Email, Phone, LocationOn, Send } from "@mui/icons-material";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 12 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h2"
          align="center"
          sx={{
            color: "#ccd6f6",
            mb: 4,
            fontWeight: "bold",
          }}
        >
          Get In Touch
        </Typography>

        <Typography
          variant="h5"
          align="center"
          sx={{
            color: "#8892b0",
            mb: 6,
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          I'm always open to discussing new opportunities, interesting projects,
          or just having a chat about technology.
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 4,
                backgroundColor: "#112240",
                border: "1px solid rgba(100, 255, 218, 0.1)",
              }}
            >
              <Typography variant="h4" sx={{ color: "#ccd6f6", mb: 3 }}>
                Contact Information
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Email sx={{ color: "#64ffda", mr: 2 }} />
                <Typography sx={{ color: "#8892b0" }}>
                  contact@example.com
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Phone sx={{ color: "#64ffda", mr: 2 }} />
                <Typography sx={{ color: "#8892b0" }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOn sx={{ color: "#64ffda", mr: 2 }} />
                <Typography sx={{ color: "#8892b0" }}>
                  Your City, Country
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 4,
                backgroundColor: "#112240",
                border: "1px solid rgba(100, 255, 218, 0.1)",
              }}
            >
              <Typography variant="h4" sx={{ color: "#ccd6f6", mb: 3 }}>
                Send a Message
              </Typography>

              <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
              >
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#ccd6f6",
                      "& fieldset": { borderColor: "rgba(100, 255, 218, 0.3)" },
                      "&:hover fieldset": { borderColor: "#64ffda" },
                      "&.Mui-focused fieldset": { borderColor: "#64ffda" },
                    },
                    "& .MuiInputLabel-root": { color: "#8892b0" },
                  }}
                />

                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#ccd6f6",
                      "& fieldset": { borderColor: "rgba(100, 255, 218, 0.3)" },
                      "&:hover fieldset": { borderColor: "#64ffda" },
                      "&.Mui-focused fieldset": { borderColor: "#64ffda" },
                    },
                    "& .MuiInputLabel-root": { color: "#8892b0" },
                  }}
                />

                <TextField
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#ccd6f6",
                      "& fieldset": { borderColor: "rgba(100, 255, 218, 0.3)" },
                      "&:hover fieldset": { borderColor: "#64ffda" },
                      "&.Mui-focused fieldset": { borderColor: "#64ffda" },
                    },
                    "& .MuiInputLabel-root": { color: "#8892b0" },
                  }}
                />

                <Button
                  variant="contained"
                  startIcon={<Send />}
                  sx={{
                    backgroundColor: "#64ffda",
                    color: "#0a192f",
                    "&:hover": {
                      backgroundColor: "#4fd1c7",
                    },
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Contact;
