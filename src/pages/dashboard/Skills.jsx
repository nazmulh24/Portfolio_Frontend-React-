import React, { useMemo, useState, useCallback } from "react";
import {
  Box,
  Chip,
  LinearProgress,
  Stack,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Slider,
  Autocomplete,
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
  Code,
  Save,
  Close,
} from "@mui/icons-material";

// Category configuration
const CATEGORY_CONFIG = {
  frontend: {
    id: "frontend",
    category: "Frontend Development",
    icon: "Code",
    color: "#2196F3",
  },
  backend: {
    id: "backend",
    category: "Backend Development",
    icon: "Engineering",
    color: "#4CAF50",
  },
  tools: {
    id: "tools",
    category: "Development Tools",
    icon: "Build",
    color: "#FF9800",
  },
  professional: {
    id: "professional",
    category: "Professional Skills",
    icon: "Psychology",
    color: "#9C27B0",
  },
};

const Skills = () => {
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // CRUD states
  const [skills, setSkills] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "frontend",
    proficiency: 50,
    startDate: "",
    description: "",
    frameworks: [],
  });

  // Initialize skills with existing data
  React.useEffect(() => {
    const initialSkills = [
      {
        id: "skill-001",
        name: "React",
        category: "frontend",
        proficiency: 90,
        startDate: "2020-01-01",
        frameworks: ["Next.js", "Gatsby", "React Native"],
        description:
          "Building scalable user interfaces and SPAs with modern React patterns.",
      },
      {
        id: "skill-002",
        name: "Python",
        category: "backend",
        proficiency: 92,
        startDate: "2018-06-01",
        frameworks: ["Django", "FastAPI", "Flask"],
        description:
          "Server-side development, APIs, and data processing applications.",
      },
      {
        id: "skill-003",
        name: "JavaScript",
        category: "frontend",
        proficiency: 88,
        startDate: "2019-03-01",
        frameworks: ["ES6+", "TypeScript", "Node.js"],
        description: "Full-stack development with modern JavaScript ecosystem.",
      },
      {
        id: "skill-004",
        name: "Git",
        category: "tools",
        proficiency: 90,
        startDate: "2019-09-01",
        frameworks: ["GitHub", "GitLab", "Bitbucket"],
        description:
          "Version control, branching strategies, and collaborative development.",
      },
    ];
    setSkills(initialSkills);
  }, []);

  // CRUD Functions
  const generateId = () => `skill-${Date.now()}`;

  const resetForm = () => {
    setFormData({
      name: "",
      category: "frontend",
      proficiency: 50,
      startDate: "",
      description: "",
      frameworks: [],
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Skill name is required";
    if (!formData.category) errors.category = "Category is required";
    if (formData.proficiency < 1 || formData.proficiency > 100) {
      errors.proficiency = "Proficiency must be between 1 and 100";
    }
    if (!formData.startDate.trim()) errors.startDate = "Start date is required";

    // Validate date format and range
    if (formData.startDate) {
      const startDate = new Date(formData.startDate);
      const currentDate = new Date();
      const earliestDate = new Date("1990-01-01");

      if (isNaN(startDate.getTime())) {
        errors.startDate = "Invalid date format";
      } else if (startDate < earliestDate) {
        errors.startDate = "Start date cannot be before 1990";
      } else if (startDate > currentDate) {
        errors.startDate = "Start date cannot be in the future";
      }
    }
    return errors;
  };

  const handleOpenAddDialog = () => {
    setIsEditMode(false);
    setSelectedSkill(null);
    resetForm();
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (skill) => {
    setIsEditMode(true);
    setSelectedSkill(skill);

    // Convert year to date format for editing
    let startDateFormatted = skill.startDate || "";
    if (skill.startDate && skill.startDate.length === 4) {
      // If it's just a year (like "2020"), convert to date format
      startDateFormatted = `${skill.startDate}-01-01`;
    }

    setFormData({
      name: skill.name || "",
      category: skill.category || "frontend",
      proficiency: skill.proficiency || 50,
      startDate: startDateFormatted,
      description: skill.description || "",
      frameworks: skill.frameworks || [],
    });
    setFormErrors({});
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSkill(null);
    resetForm();
  };

  const handleOpenDeleteDialog = (skill) => {
    setSelectedSkill(skill);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedSkill(null);
  };

  const handleSave = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    setFormErrors({});

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (isEditMode) {
      setSkills((prev) =>
        prev.map((skill) =>
          skill.id === selectedSkill.id
            ? { ...formData, id: selectedSkill.id }
            : skill
        )
      );
    } else {
      const newSkill = {
        ...formData,
        id: generateId(),
      };
      setSkills((prev) => [newSkill, ...prev]);
    }

    setIsLoading(false);
    handleCloseDialog();
  };

  const handleDeleteSkill = async () => {
    setIsDeleting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    setSkills((prev) => prev.filter((skill) => skill.id !== selectedSkill.id));

    setIsDeleting(false);
    handleCloseDeleteDialog();
  };

  // Dynamic level calculation based on proficiency
  const getSkillLevel = useCallback((proficiency) => {
    if (proficiency >= 90) return "Expert";
    if (proficiency >= 75) return "Advanced";
    if (proficiency >= 60) return "Intermediate";
    return "Beginner";
  }, []);

  // Calculate experience duration from start date
  const getExperienceDuration = useCallback((startDate) => {
    if (!startDate) return "0 years";

    const currentDate = new Date();
    const startDateObj = new Date(startDate);

    // If invalid date, try to parse as year only
    if (isNaN(startDateObj.getTime()) && startDate.length === 4) {
      const startYear = parseInt(startDate);
      const years = currentDate.getFullYear() - startYear;
      return `${years}+ years`;
    }

    if (isNaN(startDateObj.getTime())) {
      return "Invalid date";
    }

    const diffTime = currentDate - startDateObj;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears >= 1) {
      return `${diffYears}+ years`;
    } else if (diffMonths >= 1) {
      return `${diffMonths}+ months`;
    } else {
      return `${diffDays}+ days`;
    }
  }, []);

  // Get category info for a skill
  const getCategoryInfo = useCallback((categoryId) => {
    return CATEGORY_CONFIG[categoryId] || CATEGORY_CONFIG.frontend;
  }, []);

  const allSkills = useMemo(() => {
    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
      const category = skill.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {});

    // Convert to categories format
    const categories = Object.entries(groupedSkills).map(
      ([categoryId, categorySkills]) => {
        const categoryInfo = getCategoryInfo(categoryId);
        return {
          ...categoryInfo,
          skills: categorySkills,
        };
      }
    );

    return { categories };
  }, [skills, getCategoryInfo]);

  // Filter logic
  const filteredSkills = useMemo(() => {
    const filterSkillsArray = (skillsArray, category = "") => {
      return skillsArray.filter((item) => {
        const matchesSearch =
          searchTerm === "" ||
          item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.frameworks?.some((f) =>
            f.toLowerCase().includes(searchTerm.toLowerCase())
          );

        const matchesLevel =
          levelFilter === "all" ||
          getSkillLevel(item.proficiency) === levelFilter;

        const matchesCategory =
          categoryFilter === "all" ||
          category.toLowerCase().includes(categoryFilter.toLowerCase());

        return matchesSearch && matchesLevel && matchesCategory;
      });
    };

    const filterCategories = (categories) => {
      return categories
        .map((category) => ({
          ...category,
          skills: filterSkillsArray(category.skills, category.category),
        }))
        .filter(
          (category) => category.skills.length > 0 || categoryFilter === "all"
        );
    };

    return {
      categories: filterCategories(allSkills.categories),
    };
  }, [allSkills, searchTerm, levelFilter, categoryFilter, getSkillLevel]);

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setLevelFilter("all");
    setCategoryFilter("all");
  };

  return (
    <Stack
      spacing={4}
      sx={{
        pb: 6,
        pt: 4,
        opacity: 1,
        transform: "none",
        transition: "none",
        animation: "none",
      }}
    >
      {/* Simple Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1 }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontWeight: 700,
            fontSize: { xs: 28, md: 32 },
          }}
        >
          Skills & Expertise
        </Typography>
        <button
          onClick={handleOpenAddDialog}
          style={{
            background: "#66BB6A",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <Add fontSize="small" />
          Add Skill
        </button>
      </Stack>

      {/* Filter Controls */}
      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          background: "rgba(255,255,255,0.02)",
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
                Filter Skills
              </Typography>
            </Stack>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {(() => {
                const totalVisible = filteredSkills.categories.reduce(
                  (acc, cat) => acc + cat.skills.length,
                  0
                );
                const totalSkills = allSkills.categories.reduce(
                  (acc, cat) => acc + cat.skills.length,
                  0
                );
                return `${totalVisible} of ${totalSkills}`;
              })()}
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            {/* Search */}
            <TextField
              placeholder="Search skills, categories, or frameworks..."
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
                    borderColor: "#66BB6A",
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

            {/* Level Filter */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#66BB6A" },
                }}
              >
                Level
              </InputLabel>
              <Select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                label="Level"
                sx={{
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#66BB6A",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value="all">All Levels</MenuItem>
                <MenuItem value="Expert">Expert</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Beginner">Beginner</MenuItem>
              </Select>
            </FormControl>

            {/* Category Filter */}
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#66BB6A" },
                }}
              >
                Category
              </InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                label="Category"
                sx={{
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#66BB6A",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="frontend">Frontend Development</MenuItem>
                <MenuItem value="backend">Backend Development</MenuItem>
                <MenuItem value="tools">Development Tools</MenuItem>
                <MenuItem value="professional">Professional Skills</MenuItem>
              </Select>
            </FormControl>

            {/* Clear Filters */}
            <Button
              onClick={clearFilters}
              startIcon={<Clear />}
              variant="outlined"
              size="small"
              sx={{
                color: "rgba(255,255,255,0.7)",
                borderColor: "rgba(255,255,255,0.15)",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.3)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              Clear
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Individual Skills Cards */}
      {filteredSkills.categories.reduce(
        (acc, cat) => acc + cat.skills.length,
        0
      ) === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 8,
            px: 4,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 18,
              fontWeight: 600,
              mb: 1,
            }}
          >
            No Results Found
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 14,
              maxWidth: 400,
              lineHeight: 1.6,
            }}
          >
            Try adjusting your search terms or filters to find the skills you're
            looking for.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
            opacity: 1,
            transform: "none",
            transition: "none",
            animation: "none",
          }}
        >
          {filteredSkills.categories.map((category) =>
            category.skills.map((skill) => (
              <Box
                key={`${category.id}-${skill.name}`}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${category.color}12 0%, ${category.color}06 100%)`,
                  border: `1px solid ${category.color}30`,
                  position: "relative",
                  transition: "all 160ms ease",
                  "&:hover": {
                    borderColor: `${category.color}60`,
                    transform: "translateY(-2px)",
                    boxShadow: `0 8px 32px ${category.color}20`,
                  },
                }}
              >
                <Stack spacing={2.5}>
                  {/* Skill Header */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 18,
                      }}
                    >
                      {skill.name}
                    </Typography>
                    <Stack direction="row" spacing={0.5}>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditDialog(skill);
                        }}
                        size="small"
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          "&:hover": {
                            color: "#90CAF9",
                            backgroundColor: "rgba(33,150,243,0.1)",
                          },
                        }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>

                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDeleteDialog(skill);
                        }}
                        size="small"
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          "&:hover": {
                            color: "#F48FB1",
                            backgroundColor: "rgba(233,30,99,0.1)",
                          },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Stack>

                  {/* Skill Level and Experience */}
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <Chip
                      label={category.category}
                      size="small"
                      sx={{
                        backgroundColor: category.color + "20",
                        color: category.color + "FF",
                        fontWeight: 600,
                        fontSize: 12,
                        border: `1px solid ${category.color}40`,
                      }}
                    />
                    <Chip
                      label={getSkillLevel(skill.proficiency)}
                      size="small"
                      sx={{
                        backgroundColor: category.color + "40",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    />
                    {skill.startDate && (
                      <Chip
                        label={getExperienceDuration(skill.startDate)}
                        size="small"
                        sx={{
                          backgroundColor: "#4CAF50",
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: 12,
                        }}
                      />
                    )}
                  </Stack>

                  {/* Progress Bar */}
                  <Box sx={{ position: "relative" }}>
                    <LinearProgress
                      variant="determinate"
                      value={skill.proficiency}
                      sx={{
                        height: 14,
                        borderRadius: 999,
                        backgroundColor: "rgba(255,255,255,0.15)",
                        "& .MuiLinearProgress-bar": {
                          background: `linear-gradient(90deg, ${category.color}, ${category.color}BB)`,
                          borderRadius: 999,
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        position: "absolute",
                        top: "50%",
                        right: 12,
                        transform: "translateY(-50%)",
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {skill.proficiency}%
                    </Typography>
                  </Box>

                  {/* Description */}
                  {skill.description && (
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.85)",
                        fontSize: 14,
                        lineHeight: 1.6,
                        fontStyle: "italic",
                      }}
                    >
                      {skill.description}
                    </Typography>
                  )}

                  {/* Frameworks/Tools */}
                  {skill.frameworks && (
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {skill.frameworks.map((framework) => (
                        <Chip
                          key={`${skill.name}-${framework}`}
                          label={framework}
                          size="small"
                          sx={{
                            backgroundColor: category.color + "25",
                            color: category.color + "FF",
                            fontWeight: 600,
                            fontSize: 11,
                            "&:hover": {
                              backgroundColor: category.color + "40",
                            },
                          }}
                        />
                      ))}
                    </Stack>
                  )}
                </Stack>
              </Box>
            ))
          )}
        </Box>
      )}

      {/* Add/Edit Skill Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
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
            <Code sx={{ color: "#A5D6A7" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {isEditMode ? "Edit Skill" : "Add New Skill"}
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ pt: 4, pb: 3, px: 3 }}>
          <Stack spacing={3}>
            {/* Error Alert */}
            {Object.keys(formErrors).length > 0 && (
              <Alert
                severity="error"
                sx={{
                  backgroundColor: "rgba(211, 47, 47, 0.1)",
                  color: "#ff6b6b",
                }}
              >
                Please fix the following errors:
                <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
                  {Object.values(formErrors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </Alert>
            )}

            {/* Skill Name and Category - Same Line */}
            <Stack
              direction="row"
              spacing={2}
              sx={{ pt: Object.keys(formErrors).length > 0 ? 3 : 4 }}
            >
              <TextField
                label="Skill Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                error={!!formErrors.name}
                helperText={formErrors.name}
                sx={{
                  flex: 1,
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
                  "& .MuiInputLabel-root.Mui-focused": { color: "#A5D6A7" },
                }}
              />

              <FormControl sx={{ flex: 1 }}>
                <InputLabel
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&.Mui-focused": { color: "#A5D6A7" },
                  }}
                >
                  Category
                </InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  label="Category"
                  error={!!formErrors.category}
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
                    "& .MuiSelect-icon": { color: "rgba(255,255,255,0.7)" },
                  }}
                >
                  <MenuItem value="frontend">Frontend Development</MenuItem>
                  <MenuItem value="backend">Backend Development</MenuItem>
                  <MenuItem value="tools">Development Tools</MenuItem>
                  <MenuItem value="professional">Professional Skills</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            {/* Proficiency and Start Date - Same Line */}
            <Stack direction="row" spacing={2}>
              <Box
                sx={{
                  flex: 1,
                  position: "relative",
                  "& .MuiInputBase-root": {
                    height: "56px",
                  },
                }}
              >
                <Box
                  sx={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 1,
                    backgroundColor: "rgba(255,255,255,0.05)",
                    height: "56px",
                    px: 1.5,
                    pt: 1,
                    pb: 0.5,
                    "&:hover": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&:focus-within": {
                      borderColor: "#A5D6A7",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "0.75rem",
                      mb: 0.5,
                      lineHeight: 1,
                    }}
                  >
                    Proficiency: {formData.proficiency}%
                  </Typography>
                  <Slider
                    value={formData.proficiency}
                    onChange={(e, newValue) =>
                      setFormData((prev) => ({
                        ...prev,
                        proficiency: newValue,
                      }))
                    }
                    min={1}
                    max={100}
                    sx={{
                      color: "#A5D6A7",
                      height: 4,
                      "& .MuiSlider-track": {
                        backgroundColor: "#A5D6A7",
                        height: 4,
                      },
                      "& .MuiSlider-thumb": {
                        backgroundColor: "#A5D6A7",
                        width: 16,
                        height: 16,
                      },
                      "& .MuiSlider-rail": {
                        backgroundColor: "rgba(255,255,255,0.15)",
                        height: 4,
                      },
                    }}
                  />
                </Box>
              </Box>

              <TextField
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                error={!!formErrors.startDate}
                helperText={
                  formErrors.startDate || "When you started learning this skill"
                }
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  flex: 1,
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
                  "& .MuiInputLabel-root.Mui-focused": { color: "#A5D6A7" },
                }}
              />
            </Stack>

            {/* Description */}
            <TextField
              label="Description"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              helperText="Brief description of your experience with this skill"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "#fff",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.25)" },
                  "&.Mui-focused fieldset": { borderColor: "#A5D6A7" },
                },
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#A5D6A7" },
              }}
            />

            {/* Frameworks/Tools */}
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={formData.frameworks}
              onChange={(event, newValue) => {
                setFormData((prev) => ({ ...prev, frameworks: newValue }));
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(165, 214, 167, 0.1)",
                      borderColor: "#A5D6A7",
                      color: "#A5D6A7",
                    }}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Related Frameworks/Tools"
                  helperText="Press Enter to add frameworks, libraries, or tools"
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
                    "& .MuiInputLabel-root.Mui-focused": { color: "#A5D6A7" },
                  }}
                />
              )}
              sx={{
                "& .MuiAutocomplete-tag": {
                  backgroundColor: "rgba(165, 214, 167, 0.1)",
                  color: "#A5D6A7",
                },
              }}
            />
          </Stack>
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
            disabled={isLoading}
            variant="contained"
            startIcon={isLoading ? <CircularProgress size={16} /> : <Save />}
            sx={{
              backgroundColor: "#A5D6A7",
              color: "#1a1a1a",
              "&:hover": { backgroundColor: "#81C784" },
              "&:disabled": { backgroundColor: "rgba(165, 214, 167, 0.3)" },
            }}
          >
            {isLoading
              ? "Saving..."
              : isEditMode
              ? "Update Skill"
              : "Add Skill"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(13, 17, 23, 0.98)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 3,
            backdropFilter: "blur(20px)",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#fff",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Delete sx={{ color: "#F48FB1" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Delete Skill
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <DialogContentText sx={{ color: "rgba(255,255,255,0.8)", mb: 2 }}>
            Are you sure you want to delete{" "}
            <strong style={{ color: "#A5D6A7" }}>{selectedSkill?.name}</strong>?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ p: 3, borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Button
            onClick={handleCloseDeleteDialog}
            sx={{ color: "rgba(255,255,255,0.7)" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteSkill}
            disabled={isDeleting}
            variant="contained"
            startIcon={isDeleting ? <CircularProgress size={16} /> : <Delete />}
            sx={{
              backgroundColor: "#F48FB1",
              color: "#1a1a1a",
              "&:hover": { backgroundColor: "#F06292" },
              "&:disabled": { backgroundColor: "rgba(244, 143, 177, 0.3)" },
            }}
          >
            {isDeleting ? "Deleting..." : "Delete Skill"}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default Skills;
