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
  InputAdornment,
} from "@mui/material";
import {
  Close as CloseIcon,
  AdminPanelSettings,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext.js";

const AdminLogin = ({ open, onClose }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      setCredentials({ email: "", password: "" });
      onClose();
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const handleClose = () => {
    setCredentials({ email: "", password: "" });
    setError("");
    setLoading(false);
    setShowPassword(false);
    onClose();
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              name="email"
              label="Gmail Address"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              required
              fullWidth
              autoFocus
              disabled={loading}
              placeholder="nazmul@gmail.com"
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
              label="Admin Password"
              type={showPassword ? "text" : "password"}
              value={credentials.password}
              onChange={handleChange}
              required
              fullWidth
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      onMouseDown={(e) => e.preventDefault()}
                      disabled={loading}
                      title={showPassword ? "Hide password" : "Show password"}
                      sx={{
                        color: "#8892b0",
                        "&:hover": {
                          color: "#64ffda",
                          backgroundColor: "rgba(100, 255, 218, 0.1)",
                        },
                        "&:disabled": {
                          color: "#233554",
                        },
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
                  "& input[type=password]": {
                    fontFamily: "monospace !important",
                    fontSize: "20px !important",
                    letterSpacing: "0.2em !important",
                    color: "#ccd6f6 !important",
                    "&::-webkit-input-placeholder": {
                      letterSpacing: "normal",
                    },
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
            disabled={loading || !credentials.email || !credentials.password}
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
