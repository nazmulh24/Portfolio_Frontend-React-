import React from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";

const ProjectDetail = () => {
  const { slug } = useParams();

  return (
    <Container maxWidth="lg" sx={{ py: 12 }}>
      <Typography variant="h2" sx={{ color: "#ccd6f6" }}>
        Project: {slug}
      </Typography>
    </Container>
  );
};

export default ProjectDetail;
