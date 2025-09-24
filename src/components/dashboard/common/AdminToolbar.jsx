import React from "react";
import { Box, Button, Chip, Typography, Paper, Grid } from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  ViewList,
  ImportExport,
  Refresh,
  Analytics,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const AdminToolbar = ({
  title,
  subtitle,
  totalItems = 0,
  selectedItems = 0,
  onAdd,
  onEdit,
  onDelete,
  onBulkAction,
  onImport,
  onExport,
  onRefresh,
  showBulkActions = false,
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  customActions = [],
}) => {
  const hasSelection = selectedItems > 0;

  return (
    <Paper
      elevation={0}
      sx={{
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 3,
        p: 3,
        mb: 3,
      }}
    >
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  mb: 0.5,
                  background:
                    "linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {title}
              </Typography>
              <Typography variant="body1" sx={{ color: "#aaa", mb: 2 }}>
                {subtitle}
              </Typography>

              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip
                  label={`${totalItems} Total Items`}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                    color: "#4CAF50",
                    fontWeight: 600,
                  }}
                />
                {hasSelection && (
                  <Chip
                    label={`${selectedItems} Selected`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(33, 150, 243, 0.2)",
                      color: "#2196F3",
                      fontWeight: 600,
                    }}
                  />
                )}
                <Chip
                  label="Admin Mode"
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255, 152, 0, 0.2)",
                    color: "#FF9800",
                    fontWeight: 600,
                  }}
                />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", md: "flex-end" },
              }}
            >
              <Button
                startIcon={<Analytics />}
                sx={{
                  color: "#888",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                  },
                }}
              >
                View Analytics
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Action Buttons Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
            p: 2,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: 2,
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          {/* Primary Actions */}
          <Box sx={{ display: "flex", gap: 1, flex: 1 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={onAdd}
              sx={{
                backgroundColor: "#4CAF50",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#45a049",
                },
              }}
            >
              Add New
            </Button>

            {hasSelection && (
              <>
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={onEdit}
                  disabled={selectedItems !== 1}
                  sx={{
                    borderColor: "#2196F3",
                    color: "#2196F3",
                    textTransform: "none",
                    borderRadius: "8px",
                    "&:hover": {
                      borderColor: "#1976D2",
                      backgroundColor: "rgba(33, 150, 243, 0.1)",
                    },
                    "&:disabled": {
                      borderColor: "#555",
                      color: "#555",
                    },
                  }}
                >
                  Edit
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<Delete />}
                  onClick={onDelete}
                  sx={{
                    borderColor: "#f44336",
                    color: "#f44336",
                    textTransform: "none",
                    borderRadius: "8px",
                    "&:hover": {
                      borderColor: "#d32f2f",
                      backgroundColor: "rgba(244, 67, 54, 0.1)",
                    },
                  }}
                >
                  Delete ({selectedItems})
                </Button>
              </>
            )}

            {/* Custom Actions */}
            {customActions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "outlined"}
                startIcon={action.icon}
                onClick={action.onClick}
                disabled={action.disabled}
                sx={{
                  borderColor: action.color || "#666",
                  color: action.color || "#666",
                  textTransform: "none",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: `rgba(${
                      action.color
                        ? action.color.replace("#", "")
                        : "102, 102, 102"
                    }, 0.1)`,
                  },
                }}
              >
                {action.label}
              </Button>
            ))}
          </Box>

          {/* Utility Actions */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              startIcon={<ImportExport />}
              onClick={onImport}
              sx={{
                color: "#888",
                textTransform: "none",
                minWidth: "auto",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                },
              }}
            >
              Import/Export
            </Button>

            <Button
              startIcon={<Refresh />}
              onClick={onRefresh}
              sx={{
                color: "#888",
                textTransform: "none",
                minWidth: "auto",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                },
              }}
            >
              Refresh
            </Button>

            <Button
              startIcon={<ViewList />}
              sx={{
                color: "#888",
                textTransform: "none",
                minWidth: "auto",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                },
              }}
            >
              View Options
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Bulk Actions (shown when items are selected) */}
      {hasSelection && showBulkActions && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: "rgba(33, 150, 243, 0.1)",
              border: "1px solid rgba(33, 150, 243, 0.3)",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "#2196F3", fontWeight: 600 }}
            >
              {selectedItems} item{selectedItems > 1 ? "s" : ""} selected
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                size="small"
                startIcon={<Edit />}
                onClick={() => onBulkAction("edit")}
                sx={{
                  color: "#2196F3",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(33, 150, 243, 0.1)",
                  },
                }}
              >
                Bulk Edit
              </Button>

              <Button
                size="small"
                startIcon={<Delete />}
                onClick={() => onBulkAction("delete")}
                sx={{
                  color: "#f44336",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(244, 67, 54, 0.1)",
                  },
                }}
              >
                Bulk Delete
              </Button>

              <Button
                size="small"
                startIcon={<ImportExport />}
                onClick={() => onBulkAction("export")}
                sx={{
                  color: "#4CAF50",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(76, 175, 80, 0.1)",
                  },
                }}
              >
                Export Selected
              </Button>
            </Box>
          </Box>
        </motion.div>
      )}
    </Paper>
  );
};

export default AdminToolbar;
