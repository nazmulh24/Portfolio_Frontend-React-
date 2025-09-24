import React from "react";
import { TextField } from "@mui/material";

const StyledTextField = ({
  multiline = false,
  rows = 1,
  variant = "outlined",
  fullWidth = true,
  color = "#4CAF50",
  ...props
}) => {
  return (
    <TextField
      variant={variant}
      multiline={multiline}
      rows={rows}
      fullWidth={fullWidth}
      sx={{
        "& .MuiOutlinedInput-root": {
          color: "#fff",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          "& fieldset": {
            borderColor: "#444",
          },
          "&:hover fieldset": {
            borderColor: "#666",
          },
          "&.Mui-focused fieldset": {
            borderColor: color,
          },
        },
        "& .MuiInputLabel-root": {
          color: "#aaa",
          "&.Mui-focused": {
            color: color,
          },
        },
        "& .MuiFormHelperText-root": {
          color: "#aaa",
        },
        "& .MuiOutlinedInput-input": {
          "&::placeholder": {
            color: "#888",
            opacity: 1,
          },
        },
        mb: 2,
      }}
      {...props}
    />
  );
};

export default StyledTextField;
