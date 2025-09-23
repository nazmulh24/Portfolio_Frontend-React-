import React from "react";
import { Box, Typography, Card } from "@mui/material";
import { motion } from "framer-motion";

const ComingSoonSection = ({ sectionName }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 600 }}>
        {sectionName?.charAt(0).toUpperCase() + sectionName?.slice(1)} Section
      </Typography>
      <Typography variant="body1" sx={{ color: "#888" }}>
        Manage your {sectionName} content
      </Typography>
    </Box>

    <Card
      sx={{
        backgroundColor: "#1a1a1a",
        border: "1px solid #333",
        p: 4,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
        Coming Soon
      </Typography>
      <Typography variant="body2" sx={{ color: "#888" }}>
        This section is under development. Features will be added soon.
      </Typography>
    </Card>
  </motion.div>
);

export default ComingSoonSection;
