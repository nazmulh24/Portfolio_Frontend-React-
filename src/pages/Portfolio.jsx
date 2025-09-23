import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

const Portfolio = () => {
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
          My Portfolio
        </Typography>

        <Typography
          variant="h5"
          align="center"
          sx={{
            color: "#8892b0",
            mb: 6,
          }}
        >
          Showcase of my projects and work
        </Typography>
      </motion.div>
    </Container>
  );
};

export default Portfolio;
