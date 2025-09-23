import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const EditDialog = ({ open, type, data, onClose, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (open && data) {
      setFormData(data);
    } else if (open) {
      setFormData({});
    }
  }, [open, data, type]);

  const handleSubmit = () => {
    onSave(type, formData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "#1a1a1a",
          border: "1px solid #333",
          color: "#fff",
        },
      }}
    >
      <DialogTitle sx={{ color: "#fff", borderBottom: "1px solid #333" }}>
        {data ? "Edit" : "Add"} {type?.charAt(0).toUpperCase() + type?.slice(1)}
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Typography variant="body2" sx={{ color: "#888" }}>
          Edit form will be implemented based on the type: {type}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: "1px solid #333" }}>
        <Button onClick={onClose} sx={{ color: "#888" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: "#4CAF50",
            "&:hover": { backgroundColor: "#45a049" },
          }}
        >
          {data ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
