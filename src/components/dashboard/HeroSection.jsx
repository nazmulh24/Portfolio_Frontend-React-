import React from "react";
import { Box, Typography, Grid, Card, Button, Avatar } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { motion } from "framer-motion";

const HeroSection = ({ data, onEdit }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 600 }}>
        Hero Section
      </Typography>
      <Typography variant="body1" sx={{ color: "#888" }}>
        Manage your personal information and hero content
      </Typography>
    </Box>

    <Card
      sx={{
        backgroundColor: "#1a1a1a",
        border: "1px solid #333",
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ color: "#fff" }}>
          Personal Information
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Edit />}
          onClick={() => onEdit("personalInfo", data)}
          sx={{
            borderColor: "#4CAF50",
            color: "#4CAF50",
            "&:hover": {
              borderColor: "#4CAF50",
              backgroundColor: "rgba(76, 175, 80, 0.1)",
            },
          }}
        >
          Edit Profile
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: "center" }}>
            <Avatar
              src={data.avatar}
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                mb: 2,
                border: "3px solid #4CAF50",
              }}
            />
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
              {data.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "#888" }}>
              {data.title}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ color: "#888", mb: 0.5 }}>
                Email
              </Typography>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                {data.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ color: "#888", mb: 0.5 }}>
                Phone
              </Typography>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                {data.phone}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ color: "#888", mb: 0.5 }}>
                Location
              </Typography>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                {data.location}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ color: "#888", mb: 0.5 }}>
                Bio
              </Typography>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                {data.bio}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  </motion.div>
);

export default HeroSection;
