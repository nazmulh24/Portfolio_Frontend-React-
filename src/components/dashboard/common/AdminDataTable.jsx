import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Box,
  Typography,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  MoreVert,
  Edit,
  Delete,
  Visibility,
  FilterList,
  Search,
  Sort,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const AdminDataTable = ({
  data = [],
  columns = [],
  title = "Data Management",
  onView,
  onEdit,
  onDelete,
  onSelectionChange,
  searchable = true,
  filterable = true,
  sortable = true,
  selectable = true,
  actions = ["view", "edit", "delete"],
  customActions = [],
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [actionRowId, setActionRowId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Handle selection
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n, index) => index);
      setSelected(newSelecteds);
      onSelectionChange?.(newSelecteds);
      return;
    }
    setSelected([]);
    onSelectionChange?.([]);
  };

  const handleClick = (event, index) => {
    const selectedIndex = selected.indexOf(index);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  const isSelected = (index) => selected.indexOf(index) !== -1;

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle actions menu
  const handleActionClick = (event, rowId) => {
    setAnchorEl(event.currentTarget);
    setActionRowId(rowId);
  };

  const handleActionClose = () => {
    setAnchorEl(null);
    setActionRowId(null);
  };

  // Handle search
  const filteredData = data.filter(
    (item) =>
      searchTerm === "" ||
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Handle sorting
  const sortedData = React.useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get paginated data
  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const renderCellContent = (column, item, rowIndex) => {
    const value = item[column.field];

    if (column.render) {
      return column.render(value, item, rowIndex);
    }

    switch (column.type) {
      case "avatar":
        return (
          <Avatar src={value} sx={{ width: 40, height: 40 }}>
            {item[column.fallbackField]?.charAt(0)?.toUpperCase()}
          </Avatar>
        );

      case "chip":
        return (
          <Chip
            label={value}
            size="small"
            color={column.chipColor?.(value) || "default"}
            sx={column.chipStyles?.(value) || {}}
          />
        );

      case "date":
        return new Date(value).toLocaleDateString();

      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value);

      case "boolean":
        return (
          <Chip
            label={value ? "Yes" : "No"}
            size="small"
            color={value ? "success" : "default"}
          />
        );

      default:
        return value?.toString() || "-";
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        border: "1px solid #444",
        borderRadius: 3,
        overflow: "hidden",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Search and Filter Bar */}
      {(searchable || filterable) && (
        <Box
          sx={{
            p: 2,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderBottom: "1px solid #444",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {searchable && (
              <TextField
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#888" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#555" },
                    "&:hover fieldset": { borderColor: "#777" },
                    "&.Mui-focused fieldset": { borderColor: "#4CAF50" },
                  },
                  "& .MuiInputBase-input": { color: "#fff" },
                }}
              />
            )}

            {filterable && (
              <IconButton
                sx={{
                  color: "#888",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <FilterList />
              </IconButton>
            )}

            <Box
              sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}
            >
              <Typography variant="caption" sx={{ color: "#888" }}>
                {filteredData.length} items
              </Typography>
              {selected.length > 0 && (
                <Chip
                  label={`${selected.length} selected`}
                  size="small"
                  color="primary"
                />
              )}
            </Box>
          </Box>
        </Box>
      )}

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& .MuiTableCell-head": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "#fff",
                  fontWeight: 600,
                  borderBottom: "1px solid #444",
                },
              }}
            >
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < data.length
                    }
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAllClick}
                    sx={{
                      color: "#888",
                      "&.Mui-checked": { color: "#4CAF50" },
                    }}
                  />
                </TableCell>
              )}

              {columns.map((column) => (
                <TableCell key={column.field}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {column.headerName}
                    </Typography>
                    {sortable && column.sortable !== false && (
                      <IconButton
                        size="small"
                        onClick={() => handleSort(column.field)}
                        sx={{
                          color:
                            sortConfig.key === column.field
                              ? "#4CAF50"
                              : "#888",
                          "&:hover": { color: "#4CAF50" },
                        }}
                      >
                        <Sort />
                      </IconButton>
                    )}
                  </Box>
                </TableCell>
              ))}

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((item, index) => {
              const globalIndex = page * rowsPerPage + index;
              const isItemSelected = isSelected(globalIndex);

              return (
                <motion.tr
                  key={item.id || globalIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  component={TableRow}
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  selected={isItemSelected}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "rgba(76, 175, 80, 0.1)",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                    },
                    "& .MuiTableCell-root": {
                      borderBottom: "1px solid #333",
                      color: "#fff",
                    },
                  }}
                >
                  {selectable && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onChange={(event) => handleClick(event, globalIndex)}
                        sx={{
                          color: "#888",
                          "&.Mui-checked": { color: "#4CAF50" },
                        }}
                      />
                    </TableCell>
                  )}

                  {columns.map((column) => (
                    <TableCell key={column.field}>
                      {renderCellContent(column, item, globalIndex)}
                    </TableCell>
                  ))}

                  <TableCell>
                    <IconButton
                      onClick={(event) =>
                        handleActionClick(event, item.id || globalIndex)
                      }
                      sx={{ color: "#888", "&:hover": { color: "#fff" } }}
                    >
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderTop: "1px solid #444",
          color: "#fff",
          "& .MuiTablePagination-select": { color: "#fff" },
          "& .MuiTablePagination-selectIcon": { color: "#fff" },
        }}
      />

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleActionClose}
        PaperProps={{
          sx: {
            backgroundColor: "#2a2a2a",
            border: "1px solid #444",
            "& .MuiMenuItem-root": {
              color: "#fff",
              "&:hover": { backgroundColor: "#333" },
            },
          },
        }}
      >
        {actions.includes("view") && (
          <MenuItem
            onClick={() => {
              onView?.(actionRowId);
              handleActionClose();
            }}
          >
            <Visibility sx={{ mr: 1, fontSize: 18 }} />
            View Details
          </MenuItem>
        )}

        {actions.includes("edit") && (
          <MenuItem
            onClick={() => {
              onEdit?.(actionRowId);
              handleActionClose();
            }}
          >
            <Edit sx={{ mr: 1, fontSize: 18 }} />
            Edit
          </MenuItem>
        )}

        {customActions.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              action.onClick?.(actionRowId);
              handleActionClose();
            }}
          >
            {action.icon &&
              React.cloneElement(action.icon, { sx: { mr: 1, fontSize: 18 } })}
            {action.label}
          </MenuItem>
        ))}

        {actions.includes("delete") && (
          <>
            <MenuItem
              sx={{ borderTop: "1px solid #444", mt: 1, pt: 1 }}
            ></MenuItem>
            <MenuItem
              onClick={() => {
                onDelete?.(actionRowId);
                handleActionClose();
              }}
              sx={{ color: "#f44336 !important" }}
            >
              <Delete sx={{ mr: 1, fontSize: 18 }} />
              Delete
            </MenuItem>
          </>
        )}
      </Menu>
    </Paper>
  );
};

export default AdminDataTable;
