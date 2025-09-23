import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Typography,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon, AdminPanelSettings } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext.js";

const AdminLogin = ({ open, onClose }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(credentials);

    if (result.success) {
      setCredentials({ username: "", password: "" });
      onClose();
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const handleClose = () => {
    setCredentials({ username: "", password: "" });
    setError("");
    setLoading(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "#112240",
          color: "#ccd6f6",
          border: "1px solid #233554",
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#64ffda",
          borderBottom: "1px solid #233554",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AdminPanelSettings />
          <Typography variant="h6">Admin Login</Typography>
        </Box>
        <IconButton onClick={handleClose} sx={{ color: "#8892b0" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 3 }}>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Alert
                severity="error"
                sx={{
                  mb: 2,
                  backgroundColor: "#ff6b6b20",
                  color: "#ff6b6b",
                  border: "1px solid #ff6b6b40",
                }}
              >
                {error}
              </Alert>
            </motion.div>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              name="username"
              label="Username"
              type="text"
              value={credentials.username}
              onChange={handleChange}
              required
              fullWidth
              autoFocus
              disabled={loading}
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

            <TextField
              name="password"
              label="Password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              required
              fullWidth
              disabled={loading}
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
          </Box>

          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 2,
              color: "#8892b0",
              textAlign: "center",
            }}
          >
            Login session valid for 30 days
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 3, borderTop: "1px solid #233554" }}>
          <Button
            onClick={handleClose}
            disabled={loading}
            sx={{
              color: "#8892b0",
              "&:hover": {
                backgroundColor: "#233554",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !credentials.username || !credentials.password}
            sx={{
              backgroundColor: "#64ffda",
              color: "#0a192f",
              "&:hover": {
                backgroundColor: "#52d4c4",
              },
              "&:disabled": {
                backgroundColor: "#233554",
                color: "#8892b0",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={20} sx={{ color: "#0a192f" }} />
            ) : (
              "Login"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AdminLogin;
