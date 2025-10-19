import React, { useMemo, useState, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Chip,
  LinearProgress,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Search,
  FilterList,
  Clear,
} from "@mui/icons-material";

const Skills = () => {
  const outlet = useOutletContext?.() || {};
  const { dashboardData, handleEdit, handleDelete } = outlet;

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Dynamic level calculation based on proficiency
  const getSkillLevel = useCallback((proficiency) => {
    if (proficiency >= 90) return "Expert";
    if (proficiency >= 75) return "Advanced";
    if (proficiency >= 60) return "Intermediate";
    return "Beginner";
  }, []);

  // Calculate experience duration from start date
  const getExperienceDuration = useCallback((startDate) => {
    const currentYear = new Date().getFullYear();
    const startYear = parseInt(startDate);
    const years = currentYear - startYear;

    if (years < 1) {
      // For less than a year, calculate months or days
      const currentDate = new Date();
      const startDateObj = new Date(startYear, 0, 1); // Assuming January 1st
      const diffTime = currentDate - startDateObj;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffMonths = Math.floor(diffDays / 30);

      if (diffMonths < 1) {
        return `${diffDays}+ days`;
      }
      return `${diffMonths}+ months`;
    }

    return `${years}+ years`;
  }, []);

  const allSkills = useMemo(() => {
    const source = dashboardData?.skills ?? {};

    return {
      categories: source.categories ?? [
        {
          id: "frontend",
          category: "Frontend Development",
          icon: "Code",
          color: "#2196F3",
          skills: [
            {
              name: "React",
              proficiency: 90,
              startDate: "2020",
              frameworks: ["Next.js", "Gatsby", "React Native"],
              description:
                "Building scalable user interfaces and SPAs with modern React patterns.",
            },
            {
              name: "JavaScript",
              proficiency: 88,
              startDate: "2019",
              frameworks: ["ES6+", "TypeScript", "Node.js"],
              description:
                "Full-stack development with modern JavaScript ecosystem.",
            },
            {
              name: "CSS",
              proficiency: 85,
              startDate: "2019",
              frameworks: ["Sass", "Material-UI", "Tailwind"],
              description:
                "Responsive design and component styling with CSS-in-JS solutions.",
            },
          ],
        },
        {
          id: "backend",
          category: "Backend Development",
          icon: "Engineering",
          color: "#4CAF50",
          skills: [
            {
              name: "Python",
              proficiency: 92,
              startDate: "2018",
              frameworks: ["Django", "FastAPI", "Flask"],
              description:
                "Server-side development, APIs, and data processing applications.",
            },
            {
              name: "Django",
              proficiency: 88,
              startDate: "2020",
              frameworks: ["DRF", "Celery", "Channels"],
              description:
                "Full-stack web applications with Django REST framework.",
            },
            {
              name: "PostgreSQL",
              proficiency: 80,
              startDate: "2021",
              frameworks: ["Redis", "MongoDB", "SQLite"],
              description:
                "Database design, optimization, and complex query development.",
            },
          ],
        },
        {
          id: "tools",
          category: "Development Tools",
          icon: "Build",
          color: "#FF9800",
          skills: [
            {
              name: "Git",
              proficiency: 90,
              startDate: "2019",
              frameworks: ["GitHub", "GitLab", "Bitbucket"],
              description:
                "Version control, branching strategies, and collaborative development.",
            },
            {
              name: "Docker",
              proficiency: 78,
              startDate: "2022",
              frameworks: ["Docker Compose", "Kubernetes", "AWS ECS"],
              description: "Containerization and deployment automation.",
            },
            {
              name: "AWS",
              proficiency: 75,
              startDate: "2022",
              frameworks: ["EC2", "S3", "Lambda", "RDS"],
              description: "Cloud infrastructure and serverless architecture.",
            },
          ],
        },
        {
          id: "professional",
          category: "Professional Skills",
          icon: "Psychology",
          color: "#9C27B0",
          skills: [
            {
              name: "Problem Solving",
              proficiency: 90,
              startDate: "2018",
              description:
                "Breaking down complex technical challenges into manageable solutions.",
            },
            {
              name: "Team Collaboration",
              proficiency: 85,
              startDate: "2019",
              description:
                "Working effectively in cross-functional teams and mentoring junior developers.",
            },
            {
              name: "Communication",
              proficiency: 82,
              startDate: "2019",
              description:
                "Technical documentation and presenting complex concepts to stakeholders.",
            },
            {
              name: "Project Management",
              proficiency: 75,
              startDate: "2020",
              description:
                "Agile methodologies, sprint planning, and delivery coordination.",
            },
          ],
        },
      ],
    };
  }, [dashboardData]);

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

  const onEdit = (sectionId, payload) =>
    handleEdit?.("skills", {
      section: sectionId,
      mode: "edit",
      item: payload,
    });

  const onDelete = (sectionId, payload) =>
    handleDelete?.("skills", { section: sectionId, item: payload });

  return (
    <Stack spacing={4} sx={{ pb: 6, pt: 4 }}>
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
          onClick={() =>
            handleEdit?.("skills", {
              section: "technical",
              mode: "create",
            })
          }
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
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#81C784";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#66BB6A";
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
                      <Tooltip title="Edit Skill">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit("skill", skill);
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
                      </Tooltip>
                      <Tooltip title="Delete Skill">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete("skill", skill);
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
                      </Tooltip>
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
                    {skill.startDate &&
                      category.category !== "Professional Skills" && (
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

                  {/* Progress Bar with Animation */}
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
                          transition: "all 300ms ease",
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
    </Stack>
  );
};

export default Skills;
