import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Home as HomeIcon } from "@mui/icons-material";

const NotFound = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 12, textAlign: "center" }}>
      <Typography
        variant="h1"
        sx={{
          color: "#64ffda",
          fontSize: "8rem",
          fontWeight: "bold",
          mb: 2,
        }}
      >
        404
      </Typography>

      <Typography
        variant="h3"
        sx={{
          color: "#ccd6f6",
          mb: 2,
        }}
      >
        Page Not Found
      </Typography>

      <Typography
        variant="h6"
        sx={{
          color: "#8892b0",
          mb: 4,
        }}
      >
        The page you're looking for doesn't exist.
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to="/"
        startIcon={<HomeIcon />}
        sx={{
          backgroundColor: "#64ffda",
          color: "#0a192f",
          "&:hover": {
            backgroundColor: "#4fd1c7",
          },
        }}
      >
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;
