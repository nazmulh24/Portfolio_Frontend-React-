import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import { motion } from "framer-motion";

// Import the new professional admin components
import {
  AdminToolbar,
  AdminDataTable,
  StyledTextField,
  useAdminCRUD,
  DASHBOARD_COLORS,
  ANIMATION_VARIANTS,
} from "../../components/dashboard";

const ActivitiesAdminPanel = () => {
  const { dashboardData } = useOutletContext();

  // Initialize admin CRUD system
  const {
    data,
    selectedItems,
    setSelectedItems,
    stats,
    addItem,
    updateItem,
    deleteItem,
    bulkDelete,
    exportData,
  } = useAdminCRUD(
    dashboardData?.activities?.conferenceActivities || defaultActivities,
    "admin-activities"
  );

  // Dialog states
  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState({ open: false, item: null });
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    event: "",
    organization: "",
    location: "",
    date: "",
    duration: "",
    description: "",
    status: "Completed",
  });

  // Handle form operations
  const handleAdd = () => {
    setFormData({
      title: "",
      type: "",
      event: "",
      organization: "",
      location: "",
      date: "",
      duration: "",
      description: "",
      status: "Completed",
    });
    setAddDialog(true);
  };

  const handleEdit = (id) => {
    const item = data.find((item) => item.id === id);
    if (item) {
      setFormData(item);
      setEditDialog({ open: true, item });
    }
  };

  const handleView = (id) => {
    const item = data.find((item) => item.id === id);
    if (item) {
      console.log("View item:", item);
      // Open view dialog or navigate to detail page
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      deleteItem(id);
    }
  };

  const handleBulkAction = (action) => {
    const selectedIds = selectedItems
      .map((index) => data[index]?.id)
      .filter(Boolean);

    switch (action) {
      case "delete":
        if (window.confirm(`Delete ${selectedIds.length} activities?`)) {
          bulkDelete(selectedIds);
        }
        break;
      case "export":
        exportData(selectedIds);
        break;
      default:
        console.log("Bulk action:", action, selectedIds);
    }
  };

  const handleSubmit = () => {
    if (editDialog.open) {
      updateItem(editDialog.item.id, formData);
      setEditDialog({ open: false, item: null });
    } else {
      addItem(formData);
      setAddDialog(false);
    }

    setFormData({
      title: "",
      type: "",
      event: "",
      organization: "",
      location: "",
      date: "",
      duration: "",
      description: "",
      status: "Completed",
    });
  };

  // Table column configuration
  const columns = [
    {
      field: "title",
      headerName: "Activity Title",
      sortable: true,
    },
    {
      field: "type",
      headerName: "Type",
      type: "chip",
      chipColor: (value) => {
        switch (value) {
          case "Keynote Speaker":
            return "primary";
          case "Session Chair":
            return "secondary";
          case "Panel Discussion":
            return "info";
          default:
            return "default";
        }
      },
    },
    {
      field: "event",
      headerName: "Event",
      sortable: true,
    },
    {
      field: "organization",
      headerName: "Organization",
      sortable: true,
    },
    {
      field: "location",
      headerName: "Location",
    },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      sortable: true,
    },
    {
      field: "status",
      headerName: "Status",
      type: "chip",
      chipColor: (value) => (value === "Completed" ? "success" : "warning"),
    },
  ];

  const customActions = [
    {
      label: "Duplicate",
      icon: <span>📋</span>,
      onClick: (id) => {
        const item = data.find((item) => item.id === id);
        if (item) {
          addItem({ ...item, title: `${item.title} (Copy)` });
        }
      },
      color: "#2196F3",
    },
  ];

  return (
    <Box>
      {/* Professional Admin Toolbar */}
      <AdminToolbar
        title="Professional Activities Management"
        subtitle="Manage conferences, speaking engagements, training delivery, and community service activities"
        totalItems={stats.total}
        selectedItems={selectedItems.length}
        onAdd={handleAdd}
        onEdit={() =>
          selectedItems.length === 1 && handleEdit(data[selectedItems[0]]?.id)
        }
        onDelete={() => handleBulkAction("delete")}
        onBulkAction={handleBulkAction}
        onImport={() => console.log("Import activities")}
        onExport={() => exportData()}
        onRefresh={() => window.location.reload()}
        showBulkActions={selectedItems.length > 0}
        customActions={customActions}
      />

      {/* Professional Data Table */}
      <motion.div
        variants={ANIMATION_VARIANTS.container}
        initial="hidden"
        animate="visible"
      >
        <AdminDataTable
          data={data}
          columns={columns}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSelectionChange={setSelectedItems}
          customActions={customActions}
          searchable
          filterable
          sortable
          selectable
        />
      </motion.div>

      {/* Add/Edit Dialog */}
      <Dialog
        open={addDialog || editDialog.open}
        onClose={() => {
          setAddDialog(false);
          setEditDialog({ open: false, item: null });
        }}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#1a1a1a",
            border: "1px solid #444",
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ color: "#fff", borderBottom: "1px solid #444" }}>
          {editDialog.open ? "Edit Activity" : "Add New Activity"}
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
            <StyledTextField
              label="Activity Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              fullWidth
              required
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <StyledTextField
                label="Type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                fullWidth
              />
              <StyledTextField
                label="Status"
                select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                fullWidth
                SelectProps={{
                  native: true,
                }}
              >
                <option value="Completed">Completed</option>
                <option value="Upcoming">Upcoming</option>
                <option value="In Progress">In Progress</option>
              </StyledTextField>
            </Box>

            <StyledTextField
              label="Event Name"
              value={formData.event}
              onChange={(e) =>
                setFormData({ ...formData, event: e.target.value })
              }
              fullWidth
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <StyledTextField
                label="Organization"
                value={formData.organization}
                onChange={(e) =>
                  setFormData({ ...formData, organization: e.target.value })
                }
                fullWidth
              />
              <StyledTextField
                label="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                fullWidth
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
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
              <StyledTextField
                label="Duration"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                fullWidth
                placeholder="e.g., 60 minutes"
              />
            </Box>

            <StyledTextField
              label="Description"
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              fullWidth
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                pt: 2,
              }}
            >
              <Button
                onClick={() => {
                  setAddDialog(false);
                  setEditDialog({ open: false, item: null });
                }}
                sx={{ color: "#888" }}
              >
                Cancel
              </Button>

              <Button
                onClick={handleSubmit}
                variant="contained"
                disabled={!formData.title}
                sx={{
                  backgroundColor: DASHBOARD_COLORS.primary,
                  "&:hover": {
                    backgroundColor: DASHBOARD_COLORS.primaryDark,
                  },
                }}
              >
                {editDialog.open ? "Update" : "Add"} Activity
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

// Default activities data for demonstration
const defaultActivities = [
  {
    id: "1",
    title: "Keynote Speaker - Future of AI in Healthcare",
    type: "Keynote Speaker",
    event: "International Conference on Medical Informatics (ICMI 2023)",
    organization: "Medical Informatics Society",
    location: "Boston, MA, USA",
    date: "2023-09-15",
    duration: "60 minutes",
    description:
      "Delivered keynote presentation on the transformative potential of AI in healthcare.",
    status: "Completed",
    createdAt: "2023-09-01T00:00:00.000Z",
    updatedAt: "2023-09-15T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Technical Session Chair - Web Technologies Track",
    type: "Session Chair",
    event: "IEEE International Conference on Software Engineering",
    organization: "IEEE Computer Society",
    location: "Virtual Event",
    date: "2023-05-20",
    duration: "4 hours",
    description: "Chaired technical sessions on modern web technologies.",
    status: "Completed",
    createdAt: "2023-05-01T00:00:00.000Z",
    updatedAt: "2023-05-20T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Panel Discussion - Machine Learning in Education",
    type: "Panel Discussion",
    event: "EdTech Summit 2024",
    organization: "Education Technology Association",
    location: "San Francisco, CA, USA",
    date: "2024-03-10",
    duration: "90 minutes",
    description:
      "Participated in panel discussing ML applications in education.",
    status: "Upcoming",
    createdAt: "2024-02-01T00:00:00.000Z",
    updatedAt: "2024-02-01T00:00:00.000Z",
  },
];

export default ActivitiesAdminPanel;
