import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Paper,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const SimpleDataTable = ({
  data = [],
  columns = [],
  onView,
  onEdit,
  onDelete,
  onSelectionChange,
  selectable = false,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);

  // Filter data based on search term
  const filteredData = data.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleSelectRow = (index, checked) => {
    let newSelection;
    if (checked) {
      newSelection = [...selectedRows, index];
    } else {
      newSelection = selectedRows.filter((i) => i !== index);
    }
    setSelectedRows(newSelection);
    if (onSelectionChange) {
      onSelectionChange(newSelection);
    }
  };

  const handleSelectAll = (checked) => {
    let newSelection = checked ? filteredData.map((_, index) => index) : [];
    setSelectedRows(newSelection);
    if (onSelectionChange) {
      onSelectionChange(newSelection);
    }
  };

  const handleMenuOpen = (event, rowId) => {
    setMenuAnchor(event.currentTarget);
    setMenuRowId(rowId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuRowId(null);
  };

  const handleMenuAction = (action) => {
    if (action === "view" && onView) {
      onView(menuRowId);
    } else if (action === "edit" && onEdit) {
      onEdit(menuRowId);
    } else if (action === "delete" && onDelete) {
      onDelete(menuRowId);
    }
    handleMenuClose();
  };

  const renderCellValue = (value, column) => {
    if (column.type === "chip") {
      const color = column.chipColor ? column.chipColor(value) : "default";
      return (
        <Chip
          label={value}
          size="small"
          color={color}
          sx={{ fontSize: "0.75rem" }}
        />
      );
    }

    if (column.type === "date") {
      return new Date(value).toLocaleDateString();
    }

    return value;
  };

  return (
    <Box>
      {/* Search */}
      <Box sx={{ mb: 2 }}>
        <TextField
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{
            maxWidth: 300,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(255,255,255,0.05)",
              "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
              "&:hover fieldset": { borderColor: "rgba(255,255,255,0.3)" },
              "&.Mui-focused fieldset": { borderColor: "#00d4ff" },
            },
            "& .MuiInputBase-input": { color: "#fff" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#888" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Table */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 2,
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {selectable && (
                  <TableCell
                    padding="checkbox"
                    sx={{ borderBottom: "1px solid #333" }}
                  >
                    <Checkbox
                      checked={
                        selectedRows.length === filteredData.length &&
                        filteredData.length > 0
                      }
                      indeterminate={
                        selectedRows.length > 0 &&
                        selectedRows.length < filteredData.length
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      sx={{ color: "#00d4ff" }}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    sx={{
                      color: "#fff",
                      fontWeight: 600,
                      borderBottom: "1px solid #333",
                    }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
                <TableCell
                  sx={{ borderBottom: "1px solid #333" }}
                  align="right"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow
                  key={row.id || index}
                  sx={{
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
                  }}
                >
                  {selectable && (
                    <TableCell
                      padding="checkbox"
                      sx={{ borderBottom: "1px solid #222" }}
                    >
                      <Checkbox
                        checked={selectedRows.includes(index)}
                        onChange={(e) =>
                          handleSelectRow(index, e.target.checked)
                        }
                        sx={{ color: "#00d4ff" }}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      sx={{ color: "#ccc", borderBottom: "1px solid #222" }}
                    >
                      {renderCellValue(row[column.field], column)}
                    </TableCell>
                  ))}
                  <TableCell
                    sx={{ borderBottom: "1px solid #222" }}
                    align="right"
                  >
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, row.id || index)}
                      sx={{ color: "#888" }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Action Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: "#2a2a2a",
            border: "1px solid #444",
          },
        }}
      >
        <MenuItem
          onClick={() => handleMenuAction("view")}
          sx={{ color: "#fff" }}
        >
          <ViewIcon sx={{ mr: 1, fontSize: "1rem" }} />
          View
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuAction("edit")}
          sx={{ color: "#fff" }}
        >
          <EditIcon sx={{ mr: 1, fontSize: "1rem" }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuAction("delete")}
          sx={{ color: "#f44336" }}
        >
          <DeleteIcon sx={{ mr: 1, fontSize: "1rem" }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SimpleDataTable;
