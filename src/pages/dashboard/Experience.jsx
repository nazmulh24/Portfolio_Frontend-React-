import React, { useMemo, useState, useCallback } from "react";
import { portfolioAPI } from "../../services/api";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Autocomplete,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Search,
  FilterList,
  Clear,
  Work,
  Business,
  VolunteerActivism,
  TrendingUp,
  Star,
  LocationOn,
  CalendarToday,
  Save,
  Close,
} from "@mui/icons-material";

const Experience = () => {
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // CRUD states
  const [experiences, setExperiences] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    type: "Full-time",
    description: "",
    technologies: [],
    achievements: [""],
    responsibilities: [""],
  });

  // Fetch experiences from backend (initial + manual retry)
  const fetchExperiences = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await portfolioAPI.getExperience();
      const incoming = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];
      setExperiences((prev) => {
        if (prev.length === 0) return incoming; // initial load
        const existingIds = new Set(prev.map((e) => e.id));
        const fresh = incoming.filter((e) => !existingIds.has(e.id));
        return [...prev, ...fresh];
      });
    } catch (err) {
      console.error("Failed to load experiences", err);
      setLoadError(
        err.response?.data?.error || "Unable to load experience data from API."
      );
      setExperiences((prev) => {
        if (prev.length !== 0) return prev;
        return [
          {
            id: "exp-fallback-1",
            title: "Sample Experience",
            company: "Placeholder Corp",
            location: "Remote",
            startDate: "Jan 2024",
            endDate: "Present",
            type: "Full-time",
            status: "Current",
            description: "Fallback sample while API is unreachable.",
            technologies: ["React", "Django"],
            achievements: ["Bootstrap fallback"],
            responsibilities: ["Display sample data"],
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  // CRUD Functions
  const generateId = () => `exp-${Date.now()}`;

  // Auto-calculate status based on end date
  const calculateStatus = (endDate) => {
    // If no end date is provided, it means currently employed
    if (!endDate || endDate.trim() === "") {
      return "Current";
    }

    // If end date is provided, compare with current date
    const currentDate = new Date();
    const experienceEndDate = new Date(endDate);

    // If end date is in the future or today, consider it current
    if (experienceEndDate >= currentDate) {
      return "Current";
    }

    return "Completed";
  };

  const resetForm = () => {
    setFormData({
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      type: "Full-time",
      description: "",
      technologies: [],
      achievements: [""],
      responsibilities: [""],
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.company.trim()) errors.company = "Company is required";
    if (!formData.location.trim()) errors.location = "Location is required";
    if (!formData.startDate.trim()) errors.startDate = "Start date is required";
    if (!formData.description.trim())
      errors.description = "Description is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOpenAddDialog = () => {
    setIsEditMode(false);
    resetForm();
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (experience) => {
    setIsEditMode(true);
    setSelectedExperience(experience);
    setFormData({
      ...experience,
      achievements: experience.achievements || [""],
      responsibilities: experience.responsibilities || [""],
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedExperience(null);
    resetForm();
  };

  const handleOpenDeleteDialog = (experience) => {
    setSelectedExperience(experience);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedExperience(null);
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Auto-calculate status based on end date
    const autoStatus = calculateStatus(formData.endDate);

    if (isEditMode) {
      setExperiences((prev) =>
        prev.map((exp) =>
          exp.id === selectedExperience.id
            ? { ...formData, status: autoStatus, id: selectedExperience.id }
            : exp
        )
      );
    } else {
      const newExperience = {
        ...formData,
        status: autoStatus,
        id: generateId(),
      };
      setExperiences((prev) => [newExperience, ...prev]);
    }

    setIsLoading(false);
    handleCloseDialog();
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    // Simulate API call delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 600));

    setExperiences((prev) =>
      prev.filter((exp) => exp.id !== selectedExperience.id)
    );

    setIsDeleting(false);
    handleCloseDeleteDialog();
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleArrayFieldChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayField = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Helper function to get unique values
  const getUniqueValues = useCallback(
    (key) => {
      return [...new Set(experiences.map((exp) => exp[key]))].sort();
    },
    [experiences]
  );

  const uniqueTypes = useMemo(() => getUniqueValues("type"), [getUniqueValues]);
  const uniqueStatuses = useMemo(
    () => getUniqueValues("status"),
    [getUniqueValues]
  );

  // Apply filters
  const filteredExperience = useMemo(() => {
    return experiences.filter((experience) => {
      const matchesSearch =
        searchTerm === "" ||
        experience.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        experience.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        experience.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        experience.technologies.some((tech) =>
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesType =
        typeFilter === "all" || experience.type === typeFilter;
      const matchesStatus =
        statusFilter === "all" || experience.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [experiences, searchTerm, typeFilter, statusFilter]);

  // Statistics calculations
  const statistics = useMemo(() => {
    const totalExperience = experiences.length;
    const currentRoles = experiences.filter(
      (exp) => exp.status === "Current"
    ).length;
    const completedRoles = experiences.filter(
      (exp) => exp.status === "Completed"
    ).length;
    const totalYears = Math.floor(
      new Date().getFullYear() - 2020 + (new Date().getMonth() + 1) / 12
    );

    return {
      total: totalExperience,
      current: currentRoles,
      completed: completedRoles,
      years: totalYears,
    };
  }, [experiences]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setStatusFilter("all");
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Full-time":
        return <Work fontSize="small" />;
      case "Part-time":
        return <Business fontSize="small" />;
      case "Contract":
        return <Business fontSize="small" />;
      case "Volunteer":
        return <VolunteerActivism fontSize="small" />;
      default:
        return <Work fontSize="small" />;
    }
  };

  const getStatusChipProps = (status) => {
    switch (status) {
      case "Current":
        return {
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          color: "#4CAF50",
          borderColor: "rgba(76, 175, 80, 0.4)",
        };
      case "Completed":
        return {
          backgroundColor: "rgba(33, 150, 243, 0.2)",
          color: "#2196F3",
          borderColor: "rgba(33, 150, 243, 0.4)",
        };
      default:
        return {
          backgroundColor: "rgba(158, 158, 158, 0.2)",
          color: "#9E9E9E",
          borderColor: "rgba(158, 158, 158, 0.4)",
        };
    }
  };

  return (
    <Box sx={{ p: 3, background: "#0D1117", minHeight: "100vh" }}>
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "flex-start" }}
        spacing={{ xs: 2, sm: 0 }}
        mb={4}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ color: "#fff", fontWeight: 700, mb: 1 }}
          >
            Professional Experience
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
            Comprehensive overview of career milestones and achievements
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenAddDialog}
          sx={{
            backgroundColor: "rgba(129,199,132,0.2)",
            color: "#A5D6A7",
            border: "1px solid rgba(129,199,132,0.3)",
            px: 3,
            py: 1,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "rgba(129,199,132,0.35)",
              border: "1px solid rgba(129,199,132,0.5)",
            },
          }}
        >
          Add Experience
        </Button>
      </Stack>

      {loadError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {loadError}
          <Button
            size="small"
            variant="outlined"
            onClick={fetchExperiences}
            sx={{ ml: 2, textTransform: "none" }}
          >
            Retry
          </Button>
        </Alert>
      )}
      {isLoading && experiences.length === 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <CircularProgress size={32} />
        </Box>
      )}

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(129,199,132,0.3)",
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: "rgba(129,199,132,0.2)",
                  }}
                >
                  <Work sx={{ color: "#A5D6A7" }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ color: "#fff", fontWeight: 700 }}
                  >
                    {statistics.total}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Total Roles
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(76, 175, 80, 0.4)",
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                  }}
                >
                  <Star sx={{ color: "#4CAF50" }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ color: "#fff", fontWeight: 700 }}
                  >
                    {statistics.current}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Current Roles
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(33, 150, 243, 0.4)",
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: "rgba(33, 150, 243, 0.2)",
                  }}
                >
                  <TrendingUp sx={{ color: "#2196F3" }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ color: "#fff", fontWeight: 700 }}
                  >
                    {statistics.completed}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Completed
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(156, 39, 176, 0.4)",
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: "rgba(156, 39, 176, 0.2)",
                  }}
                >
                  <CalendarToday sx={{ color: "#9C27B0" }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ color: "#fff", fontWeight: 700 }}
                  >
                    {statistics.years}+
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Years Experience
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Box
        sx={{
          mb: 3,
          p: 3,
          backgroundColor: "rgba(255,255,255,0.02)",
          borderRadius: 2,
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Stack spacing={3}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <FilterList
                sx={{ color: "rgba(255,255,255,0.7)", fontSize: 20 }}
              />
              <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: 16 }}>
                Filter Experience
              </Typography>
            </Stack>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {filteredExperience.length} of {experiences.length}
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            {/* Search */}
            <TextField
              placeholder="Search roles, companies, or technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "#fff",
                  "& fieldset": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#A5D6A7",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255,255,255,0.5)",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search
                      sx={{ color: "rgba(255,255,255,0.5)", fontSize: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            {/* Type Filter */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#A5D6A7" },
                }}
              >
                Type
              </InputLabel>
              <Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                label="Type"
                sx={{
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#A5D6A7",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value="all">All Types</MenuItem>
                {uniqueTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Status Filter */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#A5D6A7" },
                }}
              >
                Status
              </InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
                sx={{
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#A5D6A7",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value="all">All Status</MenuItem>
                {uniqueStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Clear Filters */}
            <Button
              onClick={handleClearFilters}
              startIcon={<Clear />}
              variant="outlined"
              size="small"
              sx={{
                color: "rgba(255,255,255,0.7)",
                borderColor: "rgba(255,255,255,0.15)",
                borderRadius: 2,
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.4)",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "#fff",
                },
              }}
            >
              Clear
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Experience Cards */}
      {filteredExperience.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            px: 3,
            backgroundColor: "rgba(255,255,255,0.02)",
            borderRadius: 2,
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Work sx={{ color: "rgba(255,255,255,0.3)", fontSize: 64, mb: 2 }} />
          <Typography
            sx={{ color: "rgba(255,255,255,0.6)", mb: 1, fontSize: "1.1rem" }}
          >
            No experience found
          </Typography>
          <Typography
            sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}
          >
            {searchTerm || typeFilter !== "all" || statusFilter !== "all"
              ? "Try adjusting your filters to see more results"
              : "Click 'Add Experience' to start building your professional portfolio"}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredExperience.map((experience, index) => (
            <Grid item xs={12} key={experience.id}>
              <Card
                sx={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(165, 214, 167, 0.2)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Experience Header */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    mb={2}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        mb={1}
                      >
                        {getTypeIcon(experience.type)}
                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: "1.3rem",
                            lineHeight: 1.3,
                          }}
                        >
                          {experience.title}
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        mb={1}
                      >
                        <Typography
                          sx={{
                            color: "rgba(255,255,255,0.8)",
                            fontSize: "1.1rem",
                            fontWeight: 500,
                          }}
                        >
                          {experience.company}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.5}
                        >
                          <LocationOn
                            sx={{
                              color: "rgba(255,255,255,0.5)",
                              fontSize: 16,
                            }}
                          />
                          <Typography
                            sx={{
                              color: "rgba(255,255,255,0.6)",
                              fontSize: "0.9rem",
                            }}
                          >
                            {experience.location}
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.5}
                        >
                          <CalendarToday
                            sx={{
                              color: "rgba(255,255,255,0.5)",
                              fontSize: 16,
                            }}
                          />
                          <Typography
                            sx={{
                              color: "rgba(255,255,255,0.6)",
                              fontSize: "0.9rem",
                            }}
                          >
                            {experience.startDate} -{" "}
                            {experience.endDate || "Present"}
                          </Typography>
                        </Stack>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        alignItems="center"
                      >
                        <Chip
                          label={experience.type}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(129,199,132,0.2)",
                            color: "#A5D6A7",
                            fontSize: "0.75rem",
                            height: "24px",
                          }}
                        />
                        <Chip
                          label={experience.status}
                          size="small"
                          sx={{
                            ...getStatusChipProps(experience.status),
                            border: `1px solid ${
                              getStatusChipProps(experience.status).borderColor
                            }`,
                            fontSize: "0.75rem",
                            height: "24px",
                          }}
                        />
                      </Stack>
                    </Box>

                    <Stack direction="row" spacing={1}>
                      {/* Edit Button */}
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleOpenEditDialog(experience);
                        }}
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          backgroundColor: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 2,
                          "&:hover": {
                            color: "#A5D6A7",
                            backgroundColor: "rgba(129, 199, 132, 0.15)",
                            border: "1px solid rgba(129, 199, 132, 0.4)",
                          },
                        }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>

                      {/* Delete Button */}
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleOpenDeleteDialog(experience);
                        }}
                        sx={{
                          color: "rgba(255,255,255,0.5)",
                          backgroundColor: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 2,
                          "&:hover": {
                            color: "#f44336",
                            backgroundColor: "rgba(244,67,54,0.15)",
                            border: "1px solid rgba(244,67,54,0.4)",
                          },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Stack>

                  {/* Description */}
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "1rem",
                      lineHeight: 1.6,
                      mb: 2,
                    }}
                  >
                    {experience.description}
                  </Typography>

                  {/* Technologies */}
                  {experience.technologies?.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.7)",
                          fontSize: "0.9rem",
                          mb: 1,
                          fontWeight: 600,
                        }}
                      >
                        Technologies & Skills
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {experience.technologies.map((tech, index) => (
                          <Chip
                            key={index}
                            label={tech}
                            size="small"
                            sx={{
                              backgroundColor: "rgba(33, 150, 243, 0.2)",
                              color: "#90CAF9",
                              fontSize: "0.7rem",
                              height: "22px",
                              border: "1px solid rgba(33, 150, 243, 0.3)",
                              "&:hover": {
                                backgroundColor: "rgba(33, 150, 243, 0.3)",
                                color: "#64B5F6",
                                border: "1px solid rgba(33, 150, 243, 0.5)",
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* Achievements and Responsibilities in two columns */}
                  <Grid container spacing={3}>
                    {experience.achievements?.length > 0 && (
                      <Grid item xs={12} md={6}>
                        <Typography
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "0.9rem",
                            mb: 1,
                            fontWeight: 600,
                          }}
                        >
                          Key Achievements
                        </Typography>
                        <Stack spacing={0.5}>
                          {experience.achievements.map((achievement, index) => (
                            <Typography
                              key={index}
                              sx={{
                                color: "rgba(255,255,255,0.7)",
                                fontSize: "0.85rem",
                                lineHeight: 1.5,
                              }}
                            >
                              • {achievement}
                            </Typography>
                          ))}
                        </Stack>
                      </Grid>
                    )}

                    {experience.responsibilities?.length > 0 && (
                      <Grid item xs={12} md={6}>
                        <Typography
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "0.9rem",
                            mb: 1,
                            fontWeight: 600,
                          }}
                        >
                          Key Responsibilities
                        </Typography>
                        <Stack spacing={0.5}>
                          {experience.responsibilities.map(
                            (responsibility, index) => (
                              <Typography
                                key={index}
                                sx={{
                                  color: "rgba(255,255,255,0.7)",
                                  fontSize: "0.85rem",
                                  lineHeight: 1.5,
                                }}
                              >
                                • {responsibility}
                              </Typography>
                            )
                          )}
                        </Stack>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Experience Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        TransitionProps={{
          timeout: {
            enter: 400,
            exit: 300,
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(13, 17, 23, 0.98)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 3,
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#fff",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            pb: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Work sx={{ color: "#A5D6A7" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {isEditMode ? "Edit Experience" : "Add New Experience"}
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                sx={{ color: "#A5D6A7", pt: 3, mb: -1, fontWeight: 600 }}
              >
                Basic Information
              </Typography>
            </Grid>

            {/* Job Title - Single Line */}
            <Grid item xs={12}>
              <TextField
                label="Job Title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                error={!!formErrors.title}
                helperText={formErrors.title}
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#A5D6A7" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiFormHelperText-root": { color: "#f44336" },
                }}
              />
            </Grid>

            {/* Company and Location - Same Line */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                error={!!formErrors.company}
                helperText={formErrors.company}
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#A5D6A7" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiFormHelperText-root": { color: "#f44336" },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                error={!!formErrors.location}
                helperText={formErrors.location}
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#A5D6A7" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiFormHelperText-root": { color: "#f44336" },
                }}
              />
            </Grid>

            {/* Employment Type, Start Date, End Date - Same Line */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&.Mui-focused": { color: "#A5D6A7" },
                  }}
                >
                  Employment Type
                </InputLabel>
                <Select
                  value={formData.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  label="Employment Type"
                  sx={{
                    color: "#fff",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.15)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#A5D6A7",
                    },
                    "& .MuiSelect-icon": { color: "rgba(255,255,255,0.7)" },
                  }}
                >
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Volunteer">Volunteer</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                error={!!formErrors.startDate}
                helperText={formErrors.startDate}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#A5D6A7" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiFormHelperText-root": { color: "#f44336" },
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="End Date"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                fullWidth
                helperText="Leave empty if currently employed"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#A5D6A7" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiFormHelperText-root": {
                    color: "rgba(255,255,255,0.6)",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Job Description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                error={!!formErrors.description}
                helperText={formErrors.description}
                fullWidth
                required
                multiline
                rows={4}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#A5D6A7" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiFormHelperText-root": { color: "#f44336" },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
            </Grid>

            {/* Technologies */}
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                sx={{ color: "#A5D6A7", mb: 2, fontWeight: 600 }}
              >
                Technologies & Skills
              </Typography>
              <Autocomplete
                multiple
                freeSolo
                open={false}
                value={formData.technologies || []}
                onChange={(e, newValue) =>
                  handleInputChange("technologies", newValue)
                }
                options={[]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Add technologies and skills"
                    placeholder="Type and press Enter to add"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255,255,255,0.05)",
                        color: "#fff",
                        "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.25)",
                        },
                        "&.Mui-focused fieldset": { borderColor: "#A5D6A7" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                    }}
                  />
                )}
                sx={{
                  "& .MuiChip-root": {
                    backgroundColor: "rgba(33, 150, 243, 0.2)",
                    color: "#90CAF9",
                    "& .MuiChip-deleteIcon": { color: "#90CAF9" },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
            </Grid>

            {/* Achievements */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                sx={{ color: "#A5D6A7", mb: 2, fontWeight: 600 }}
              >
                Key Achievements
              </Typography>
              {formData.achievements.map((achievement, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <TextField
                      value={achievement}
                      onChange={(e) =>
                        handleArrayFieldChange(
                          "achievements",
                          index,
                          e.target.value
                        )
                      }
                      placeholder={`Achievement ${index + 1}`}
                      fullWidth
                      multiline
                      rows={2}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "rgba(255,255,255,0.05)",
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.15)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.25)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#A5D6A7" },
                        },
                      }}
                    />
                    {formData.achievements.length > 1 && (
                      <IconButton
                        onClick={() => removeArrayField("achievements", index)}
                        sx={{
                          color: "#f44336",
                          mt: 1,
                          backgroundColor: "rgba(244, 67, 54, 0.1)",
                          borderRadius: "50%",
                          width: 36,
                          height: 36,
                          "&:hover": {
                            backgroundColor: "rgba(244, 67, 54, 0.2)",
                          },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                  </Stack>
                </Box>
              ))}
              <Button
                startIcon={<Add />}
                onClick={() => addArrayField("achievements")}
                sx={{ color: "#A5D6A7", textTransform: "none" }}
              >
                Add Achievement
              </Button>
            </Grid>

            {/* Responsibilities */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                sx={{ color: "#A5D6A7", mb: 2, fontWeight: 600 }}
              >
                Key Responsibilities
              </Typography>
              {formData.responsibilities.map((responsibility, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <TextField
                      value={responsibility}
                      onChange={(e) =>
                        handleArrayFieldChange(
                          "responsibilities",
                          index,
                          e.target.value
                        )
                      }
                      placeholder={`Responsibility ${index + 1}`}
                      fullWidth
                      multiline
                      rows={2}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "rgba(255,255,255,0.05)",
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.15)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.25)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#A5D6A7" },
                        },
                      }}
                    />
                    {formData.responsibilities.length > 1 && (
                      <IconButton
                        onClick={() =>
                          removeArrayField("responsibilities", index)
                        }
                        sx={{
                          color: "#f44336",
                          mt: 1,
                          backgroundColor: "rgba(244, 67, 54, 0.1)",
                          borderRadius: "50%",
                          width: 36,
                          height: 36,
                          "&:hover": {
                            backgroundColor: "rgba(244, 67, 54, 0.2)",
                          },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                  </Stack>
                </Box>
              ))}
              <Button
                startIcon={<Add />}
                onClick={() => addArrayField("responsibilities")}
                sx={{ color: "#A5D6A7", textTransform: "none" }}
              >
                Add Responsibility
              </Button>
            </Grid>
          </Grid>

          {/* Form Errors Alert */}
          {Object.keys(formErrors).length > 0 && (
            <Alert
              severity="error"
              sx={{
                mt: 2,
                backgroundColor: "rgba(244, 67, 54, 0.1)",
                color: "#f44336",
                "& .MuiAlert-icon": { color: "#f44336" },
              }}
            >
              Please fix the errors above before saving.
            </Alert>
          )}
        </DialogContent>
        <DialogActions
          sx={{ p: 3, borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Button
            onClick={handleCloseDialog}
            sx={{ color: "rgba(255,255,255,0.7)" }}
            startIcon={<Close />}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={isLoading}
            startIcon={
              isLoading ? (
                <CircularProgress size={16} sx={{ color: "#000" }} />
              ) : (
                <Save />
              )
            }
            sx={{
              backgroundColor: "#A5D6A7",
              color: "#000",
              minWidth: "180px",
              "&:hover": {
                backgroundColor: "#81C784",
              },
              "&:disabled": {
                backgroundColor: "rgba(165, 214, 167, 0.7)",
                color: "#000",
              },
            }}
          >
            {isLoading
              ? "Saving..."
              : isEditMode
              ? "Update Experience"
              : "Save Experience"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(13, 17, 23, 0.95)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ color: "#fff" }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Delete sx={{ color: "#f44336" }} />
            <Typography variant="h6">Delete Experience</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "rgba(255,255,255,0.8)" }}>
            Are you sure you want to delete "{selectedExperience?.title}" at{" "}
            {selectedExperience?.company}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleCloseDeleteDialog}
            sx={{ color: "rgba(255,255,255,0.7)" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            disabled={isDeleting}
            startIcon={
              isDeleting ? (
                <CircularProgress size={16} sx={{ color: "#fff" }} />
              ) : (
                <Delete />
              )
            }
            sx={{
              minWidth: "120px",
            }}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Experience;
