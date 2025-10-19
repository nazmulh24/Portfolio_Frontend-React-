import React, { useMemo, useState, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Chip,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import {
  Search,
  FilterList,
  Clear,
  Edit,
  Delete,
  Add,
} from "@mui/icons-material";

// Constants for better maintainability
const SECTION_COLORS = {
  Professional: {
    backgroundColor: "rgba(129,199,132,0.18)",
    color: "#A5D6A7",
  },
  Research: {
    backgroundColor: "rgba(33,150,243,0.18)",
    color: "#90CAF9",
  },
  Teaching: {
    backgroundColor: "rgba(156,39,176,0.18)",
    color: "#CE93D8",
  },
  Freelance: {
    backgroundColor: "rgba(255,152,0,0.18)",
    color: "#FFB74D",
  },
  Volunteer: {
    backgroundColor: "rgba(233,30,99,0.18)",
    color: "#F48FB1",
  },
};

const FILTER_ALL_VALUE = "all";

/**
 * Experience Management Component
 * Handles display and management of professional experience across multiple categories
 */
const Experience = () => {
  const outlet = useOutletContext?.() || {};
  const { dashboardData, handleEdit, handleDelete } = outlet;

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [sectionFilter, setSectionFilter] = useState(FILTER_ALL_VALUE);
  const [statusFilter, setStatusFilter] = useState(FILTER_ALL_VALUE);

  // Helper functions
  const determineStatus = useCallback((endDate) => {
    return endDate === "Present" ? "Current" : "Completed";
  }, []);

  const mapRoleToExperience = useCallback(
    (role) => {
      const autoStatus = determineStatus(role.endDate);

      return {
        id: role.id ?? `${role.jobTitle}-${role.company}`,
        title: `${role.jobTitle ?? role.title} · ${
          role.company ?? role.institution ?? role.organization
        }`,
        subtitle: [role.startDate, role.endDate, role.location]
          .filter(Boolean)
          .join(" • "),
        description: role.description ?? role.projectTitle ?? "",
        tags:
          role.technologies ??
          role.courses ??
          role.serviceTypes ??
          role.skills ??
          role.activities ??
          [],
        metrics:
          role.achievements ??
          role.responsibilities ??
          role.publications ??
          role.impact ??
          role.projects ??
          [],
        status:
          role.status ?? role.employmentType ?? role.duration ?? autoStatus,
      };
    },
    [determineStatus]
  );

  const experience = useMemo(() => {
    const source = dashboardData?.experience ?? {};

    const mapRoles = (collection = []) => collection.map(mapRoleToExperience);

    return {
      professional: mapRoles(
        source.professionalExperience ?? [
          {
            id: "exp-1",
            jobTitle: "Senior Full Stack Developer",
            company: "TechVision Solutions",
            location: "Dhaka, Bangladesh",
            startDate: "Jan 2023",
            endDate: "Present",
            description:
              "Leading cross-functional squads delivering data-centric platforms used by 10k+ users across healthcare and finance verticals.",
            technologies: ["Django", "React", "AWS", "PostgreSQL"],
            achievements: [
              "Reduced platform latency by 38% through service decomposition.",
              "Shipped 12 major releases with zero regression incidents.",
            ],
          },
          {
            id: "exp-2",
            jobTitle: "Software Engineer",
            company: "InnovateTech Labs",
            location: "Remote",
            startDate: "Jun 2021",
            endDate: "Dec 2022",
            description:
              "Owned feature lifecycle for analytics modules powering executive dashboards and campaign attribution reporting.",
            technologies: ["Node.js", "GraphQL", "GCP", "Next.js"],
            achievements: [
              "Introduced analytics instrumentation increasing insight adoption by 2.3x.",
              "Drove design system adoption across three internal teams.",
            ],
          },
        ]
      ),
      research: mapRoles(
        source.researchExperience ?? [
          {
            id: "res-1",
            jobTitle: "Research Associate",
            company: "University of Dhaka",
            location: "Dhaka, Bangladesh",
            startDate: "Jan 2023",
            endDate: "Present",
            description:
              "Investigating predictive modeling for early-stage chronic disease detection using multimodal clinical data.",
            technologies: ["TensorFlow", "Pandas", "MLflow"],
            achievements: [
              "Architected reproducible ML pipelines with TensorFlow and MLflow.",
              "Co-authored publications targeting IEEE health informatics venues.",
              "Secured 150k BDT research grant for longitudinal study.",
            ],
          },
        ]
      ),
      teaching: mapRoles(
        source.teachingExperience ?? [
          {
            id: "teach-1",
            jobTitle: "Adjunct Lecturer",
            company: "Metropolitan University",
            location: "Dhaka, Bangladesh",
            startDate: "Sep 2023",
            endDate: "Present",
            description:
              "Delivering modern web engineering curriculum focused on production-grade patterns and developer experience.",
            technologies: ["Full Stack Engineering", "Data Structures"],
            achievements: [
              "Achieved 4.9/5 teaching effectiveness across 120+ students.",
              "Introduced capstone clinic pairing students with NGOs.",
            ],
          },
        ]
      ),
      freelance: mapRoles(
        source.freelanceExperience ?? [
          {
            id: "freelance-1",
            jobTitle: "Freelance Lead Engineer",
            company: "Global Clients",
            location: "Remote",
            startDate: "Aug 2021",
            endDate: "Present",
            description:
              "Partnering with founders to launch revenue-ready SaaS products, from architecture to growth analytics.",
            technologies: [
              "Product Discovery",
              "Technical Leadership",
              "API Design",
            ],
            achievements: [
              "Delivered 30+ engagements with 4.95 ★ average rating.",
              "Generated $15k+ in repeat contracts within last year.",
            ],
          },
        ]
      ),
      volunteer: mapRoles(
        source.volunteerExperience ?? [
          {
            id: "volunteer-1",
            jobTitle: "Technical Mentor",
            company: "Code for Bangladesh",
            location: "Dhaka, Bangladesh",
            startDate: "Jun 2022",
            endDate: "Present",
            description:
              "Mentoring emerging engineers and delivering community workshops focused on inclusive technology initiatives.",
            technologies: [
              "Hackathon coaching",
              "STEM outreach",
              "Curriculum design",
            ],
            achievements: [
              "Supported 50+ mentees into internships",
              "Launched 8 open-source civic projects",
            ],
          },
        ]
      ),
      skills: source.professionalSkills ?? [
        "Technical Leadership",
        "Product Strategy",
        "System Design",
        "Mentorship",
        "Agile Delivery",
        "Stakeholder Management",
      ],
      highlights: source.careerHighlights ?? [
        "Shipped three enterprise platforms adopted by Fortune 500 partners.",
        "Led architecture modernization reducing infrastructure spend by 28%.",
        "Speaker at IEEE AI in Healthcare Symposium 2024.",
      ],
    };
  }, [dashboardData, mapRoleToExperience]);

  // Get all experience items for filtering
  const allExperienceItems = useMemo(() => {
    const items = [];
    items.push(
      ...experience.professional.map((item) => ({
        ...item,
        section: "Professional",
      }))
    );
    items.push(
      ...experience.research.map((item) => ({ ...item, section: "Research" }))
    );
    items.push(
      ...experience.teaching.map((item) => ({ ...item, section: "Teaching" }))
    );
    items.push(
      ...experience.freelance.map((item) => ({ ...item, section: "Freelance" }))
    );
    items.push(
      ...experience.volunteer.map((item) => ({ ...item, section: "Volunteer" }))
    );
    return items;
  }, [experience]);

  // Get unique filter options
  const uniqueSections = useMemo(() => {
    return [...new Set(allExperienceItems.map((item) => item.section))].sort();
  }, [allExperienceItems]);

  const uniqueStatuses = useMemo(() => {
    return [
      ...new Set(allExperienceItems.map((item) => item.status).filter(Boolean)),
    ].sort();
  }, [allExperienceItems]);

  // Filter helper function
  const matchesFilters = useCallback(
    (item) => {
      const matchesSearch =
        searchTerm === "" ||
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags?.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesSection =
        sectionFilter === FILTER_ALL_VALUE || item.section === sectionFilter;
      const matchesStatus =
        statusFilter === FILTER_ALL_VALUE || item.status === statusFilter;

      return matchesSearch && matchesSection && matchesStatus;
    },
    [searchTerm, sectionFilter, statusFilter]
  );

  // Helper function to get section colors
  const getSectionColors = useCallback((section) => {
    return SECTION_COLORS[section] || SECTION_COLORS.Professional;
  }, []);

  // Event handlers
  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    setSectionFilter(FILTER_ALL_VALUE);
    setStatusFilter(FILTER_ALL_VALUE);
  }, []);

  const handleAddExperience = useCallback(
    (sectionId = "professional") => {
      handleEdit?.("experience", { section: sectionId, mode: "create" });
    },
    [handleEdit]
  );

  const handleEditExperience = useCallback(
    (sectionId, payload) => {
      handleEdit?.("experience", {
        section: sectionId,
        mode: "edit",
        item: payload,
      });
    },
    [handleEdit]
  );

  const handleDeleteExperience = useCallback(
    (item) => {
      handleDelete?.("experience", {
        section: item.section.toLowerCase(),
        item,
      });
    },
    [handleDelete]
  );

  // Filter UI Component
  const filterComponent = (
    <Box
      sx={{
        mb: 3,
        p: 3,
        backgroundColor: "rgba(255,255,255,0.02)",
        borderRadius: 2,
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <FilterList sx={{ color: "rgba(255,255,255,0.7)" }} />
        <Typography sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
          Filters
        </Typography>
        {(searchTerm ||
          sectionFilter !== FILTER_ALL_VALUE ||
          statusFilter !== FILTER_ALL_VALUE) && (
          <Button
            size="small"
            startIcon={<Clear />}
            onClick={handleClearFilters}
            sx={{
              color: "rgba(255,255,255,0.6)",
              "&:hover": {
                color: "#fff",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
              textTransform: "none",
            }}
          >
            Clear filters
          </Button>
        )}
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        flexWrap="wrap"
        alignItems={{ xs: "stretch", sm: "center" }}
      >
        {/* Search */}
        <TextField
          size="small"
          placeholder="Search experience..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "rgba(255,255,255,0.5)" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            minWidth: { xs: "100%", sm: 250 },
            flex: { xs: 1, sm: "none" },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "#fff",
              "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
              "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(129,199,132,0.5)",
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "rgba(255,255,255,0.5)",
            },
          }}
        />

        {/* Section Filter */}
        <FormControl
          size="small"
          sx={{
            minWidth: { xs: "100%", sm: 150 },
            flex: { xs: 1, sm: "none" },
          }}
        >
          <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
            Section
          </InputLabel>
          <Select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            label="Section"
            sx={{
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "#fff",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.1)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.2)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(129,199,132,0.5)",
              },
              "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.7)" },
            }}
          >
            <MenuItem value="all">All Sections</MenuItem>
            {uniqueSections.map((section) => (
              <MenuItem key={section} value={section}>
                {section}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Status Filter */}
        <FormControl
          size="small"
          sx={{
            minWidth: { xs: "100%", sm: 120 },
            flex: { xs: 1, sm: "none" },
          }}
        >
          <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
            Status
          </InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
            sx={{
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "#fff",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.1)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.2)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(129,199,132,0.5)",
              },
              "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.7)" },
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

        {/* Results Count */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: { xs: 0, sm: 2 },
            mt: { xs: 1, sm: 0 },
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "center", sm: "flex-start" },
          }}
        >
          <Typography
            sx={{
              color: "rgba(255,255,255,0.6)",
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
            }}
          >
            Showing {allExperienceItems.filter(matchesFilters).length} of{" "}
            {allExperienceItems.length} experiences
          </Typography>
        </Box>
      </Stack>
    </Box>
  );

  return (
    <Box sx={{ p: 3, background: "#0D1117", minHeight: "100vh" }}>
      {/* Custom header with filters */}
      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={3}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{ color: "#fff", fontWeight: 700, mb: 1 }}
            >
              Experience & Leadership
            </Typography>
            <Typography
              sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}
            >
              Centralize every milestone from enterprise roles to community
              impact for a boardroom-ready profile.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleAddExperience("professional")}
            sx={{
              backgroundColor: "rgba(129,199,132,0.2)",
              color: "#A5D6A7",
              borderRadius: 2,
              px: 3,
              py: 1,
              "&:hover": {
                backgroundColor: "rgba(129,199,132,0.3)",
              },
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Add Experience
          </Button>
        </Stack>

        {/* Filter Component */}
        {filterComponent}
      </Box>

      {/* All Experience Items in Unified List */}
      <Box>
        {/* Check if we have any filtered items */}
        {allExperienceItems.filter(matchesFilters).length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 6,
              px: 3,
              backgroundColor: "rgba(255,255,255,0.02)",
              borderRadius: 2,
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 1 }}>
              No experiences found
            </Typography>
            <Typography
              sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}
            >
              {searchTerm ||
              sectionFilter !== FILTER_ALL_VALUE ||
              statusFilter !== FILTER_ALL_VALUE
                ? "Try adjusting your filters to see more results"
                : "No experiences available"}
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2.5}>
            {allExperienceItems.filter(matchesFilters).map((item) => (
              <Box
                key={item.id}
                sx={{
                  p: 2.75,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "border-color 160ms ease, transform 160ms ease",
                  "&:hover": {
                    borderColor: "rgba(102,187,106,0.45)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Stack spacing={1.5}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Box sx={{ flex: 1 }}>
                      {/* Job title first */}
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: 16,
                          mb: 1,
                        }}
                      >
                        {item.title}
                      </Typography>
                      {/* Badges on same line below title */}
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        <Chip
                          label={item.section}
                          size="small"
                          sx={{
                            ...getSectionColors(item.section),
                            fontWeight: 600,
                            fontSize: "0.7rem",
                          }}
                        />
                        {item.subtitle && (
                          <Chip
                            label={item.subtitle}
                            size="small"
                            sx={{
                              backgroundColor: "rgba(158,158,158,0.15)",
                              color: "#BDBDBD",
                              fontWeight: 500,
                              fontSize: "0.65rem",
                              height: 22,
                              "& .MuiChip-label": {
                                px: 1.5,
                              },
                            }}
                          />
                        )}
                      </Stack>
                    </Box>

                    {/* Action Buttons */}
                    <Stack direction="row" spacing={1} alignItems="center">
                      {/* Edit Button */}
                      <Button
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditExperience(
                            item.section.toLowerCase(),
                            item
                          );
                        }}
                        sx={{
                          minWidth: 36,
                          height: 36,
                          borderRadius: 1,
                          color: "rgba(33,150,243,0.8)",
                          "&:hover": {
                            backgroundColor: "rgba(33,150,243,0.1)",
                            color: "#90CAF9",
                          },
                        }}
                      >
                        <Edit fontSize="small" />
                      </Button>

                      {/* Delete Button */}
                      <Button
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteExperience(item);
                        }}
                        sx={{
                          minWidth: 36,
                          height: 36,
                          borderRadius: 1,
                          color: "rgba(244,67,54,0.8)",
                          "&:hover": {
                            backgroundColor: "rgba(244,67,54,0.1)",
                            color: "#ef5350",
                          },
                        }}
                      >
                        <Delete fontSize="small" />
                      </Button>
                    </Stack>
                  </Stack>

                  {item.description && (
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.78)",
                        lineHeight: 1.6,
                        fontSize: 14,
                      }}
                    >
                      {item.description}
                    </Typography>
                  )}

                  {item.tags?.length > 0 && (
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {item.tags.map((tag) => (
                        <Chip
                          key={`${item.id}-tag-${tag}`}
                          label={tag}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(33,150,243,0.18)",
                            color: "#90CAF9",
                            fontWeight: 600,
                          }}
                        />
                      ))}
                    </Stack>
                  )}

                  {item.metrics?.length > 0 && (
                    <Stack spacing={0.75}>
                      {item.metrics.map((metric, index) => (
                        <Typography
                          key={`${item.id}-metric-${index}`}
                          sx={{
                            color: "rgba(255,255,255,0.65)",
                            fontSize: 13.5,
                          }}
                        >
                          • {metric}
                        </Typography>
                      ))}
                    </Stack>
                  )}
                </Stack>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default Experience;
