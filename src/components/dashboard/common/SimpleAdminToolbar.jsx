import React from "react";
import { Box, Typography, Button, IconButton, Chip } from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const AdminToolbar = ({
  title = "Admin Panel",
  totalItems = 0,
  selectedItems = 0,
  onAdd,
  onEdit,
  onDelete,
  showBulkActions = false,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 2,
        p: 2.5,
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {/* Title & Info */}
      <Box>
        <Typography
          variant="h6"
          sx={{ color: "#fff", fontWeight: 600, mb: 0.5 }}
        >
          {title}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Chip
            label={`${totalItems} Total`}
            size="small"
            sx={{
              backgroundColor: "#00d4ff",
              color: "#000",
              fontSize: "0.75rem",
            }}
          />
          {showBulkActions && selectedItems > 0 && (
            <Chip
              label={`${selectedItems} Selected`}
              size="small"
              sx={{
                backgroundColor: "#ff6b35",
                color: "#fff",
                fontSize: "0.75rem",
              }}
            />
          )}
        </Box>
      </Box>

      {/* Actions */}
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAdd}
          sx={{
            backgroundColor: "#00d4ff",
            color: "#000",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { backgroundColor: "#00b8e6" },
          }}
        >
          Add New
        </Button>

        {showBulkActions && (
          <>
            <IconButton
              onClick={onEdit}
              disabled={selectedItems !== 1}
              sx={{
                color: selectedItems === 1 ? "#ff6b35" : "#666",
                backgroundColor:
                  selectedItems === 1 ? "rgba(255,107,53,0.1)" : "transparent",
                "&:hover": { backgroundColor: "rgba(255,107,53,0.2)" },
              }}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              onClick={onDelete}
              disabled={selectedItems === 0}
              sx={{
                color: selectedItems > 0 ? "#f44336" : "#666",
                backgroundColor:
                  selectedItems > 0 ? "rgba(244,67,54,0.1)" : "transparent",
                "&:hover": { backgroundColor: "rgba(244,67,54,0.2)" },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
};

export default AdminToolbar;
