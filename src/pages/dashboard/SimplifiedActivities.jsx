import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
} from "@mui/material";
import SimpleAdminToolbar from "../../components/dashboard/common/SimpleAdminToolbar";
import SimpleDataTable from "../../components/dashboard/common/SimpleDataTable";
import StyledTextField from "../../components/dashboard/common/StyledTextField";
import useSimpleCRUD from "../../components/dashboard/hooks/useSimpleCRUD";

const SimplifiedActivities = () => {
  const { dashboardData } = useOutletContext();

  // Initialize simple CRUD
  const {
    data,
    selectedItems,
    setSelectedItems,
    stats,
    addItem,
    updateItem,
    deleteItem,
    deleteSelected,
  } = useSimpleCRUD(
    dashboardData?.activities?.conferenceActivities || defaultActivities,
    "activities-data"
  );

  // Form state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    event: "",
    organization: "",
    location: "",
    date: "",
    status: "Completed",
  });

  // Handle form operations
  const openAddDialog = () => {
    setFormData({
      title: "",
      type: "",
      event: "",
      organization: "",
      location: "",
      date: "",
      status: "Completed",
    });
    setEditingItem(null);
    setDialogOpen(true);
  };

  const openEditDialog = (id) => {
    const item = data.find((item) => item.id === id);
    if (item) {
      setFormData(item);
      setEditingItem(item);
      setDialogOpen(true);
    }
  };

  const handleSubmit = () => {
    if (editingItem) {
      updateItem(editingItem.id, formData);
    } else {
      addItem(formData);
    }
    setDialogOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this activity?")) {
      deleteItem(id);
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedItems.length} activities?`)) {
      deleteSelected();
    }
  };

  // Table columns
  const columns = [
    { field: "title", headerName: "Title" },
    {
      field: "type",
      headerName: "Type",
      type: "chip",
      chipColor: () => "primary",
    },
    { field: "event", headerName: "Event" },
    { field: "organization", headerName: "Organization" },
    { field: "date", headerName: "Date", type: "date" },
    {
      field: "status",
      headerName: "Status",
      type: "chip",
      chipColor: (value) => (value === "Completed" ? "success" : "warning"),
    },
  ];

  return (
    <Box>
      {/* Simple Admin Toolbar */}
      <SimpleAdminToolbar
        title="Professional Activities"
        totalItems={stats.total}
        selectedItems={stats.selected}
        onAdd={openAddDialog}
        onEdit={() =>
          selectedItems.length === 1 &&
          openEditDialog(data[selectedItems[0]]?.id)
        }
        onDelete={handleBulkDelete}
        showBulkActions={selectedItems.length > 0}
      />

      {/* Simple Data Table */}
      <SimpleDataTable
        data={data}
        columns={columns}
        onView={(id) => console.log("View:", id)}
        onEdit={openEditDialog}
        onDelete={handleDelete}
        onSelectionChange={setSelectedItems}
        selectable={true}
      />

      {/* Simple Add/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ color: "#fff", borderBottom: "1px solid #333" }}>
          {editingItem ? "Edit Activity" : "Add Activity"}
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <StyledTextField
                label="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={6}>
              <StyledTextField
                label="Type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <StyledTextField
                label="Status"
                select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                fullWidth
                SelectProps={{ native: true }}
              >
                <option value="Completed">Completed</option>
                <option value="Upcoming">Upcoming</option>
              </StyledTextField>
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                label="Event"
                value={formData.event}
                onChange={(e) =>
                  setFormData({ ...formData, event: e.target.value })
                }
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <StyledTextField
                label="Organization"
                value={formData.organization}
                onChange={(e) =>
                  setFormData({ ...formData, organization: e.target.value })
                }
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <StyledTextField
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                label="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                fullWidth
              />
            </Grid>
          </Grid>

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}
          >
            <Button onClick={() => setDialogOpen(false)} sx={{ color: "#888" }}>
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={!formData.title}
              sx={{
                backgroundColor: "#00d4ff",
                color: "#000",
                "&:hover": { backgroundColor: "#00b8e6" },
              }}
            >
              {editingItem ? "Update" : "Add"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

// Default data
const defaultActivities = [
  {
    id: "1",
    title: "Keynote Speaker - AI in Healthcare",
    type: "Keynote",
    event: "Medical Informatics Conference",
    organization: "Medical Society",
    location: "Boston, MA",
    date: "2023-09-15",
    status: "Completed",
  },
  {
    id: "2",
    title: "Session Chair - Web Technologies",
    type: "Session Chair",
    event: "IEEE Software Engineering Conference",
    organization: "IEEE",
    location: "Virtual",
    date: "2023-05-20",
    status: "Completed",
  },
  {
    id: "3",
    title: "Panel Discussion - ML in Education",
    type: "Panel",
    event: "EdTech Summit 2024",
    organization: "EdTech Association",
    location: "San Francisco, CA",
    date: "2024-03-10",
    status: "Upcoming",
  },
];

export default SimplifiedActivities;
