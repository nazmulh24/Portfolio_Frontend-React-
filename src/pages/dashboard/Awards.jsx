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
  IconButton,
} from "@mui/material";
import {
  Search,
  FilterList,
  Clear,
  Edit,
  Delete,
  Add,
  EmojiEvents,
  AttachMoney,
  WorkspacePremium,
  Star,
  Launch,
  Place,
  TrendingUp,
  Public,
  Group,
} from "@mui/icons-material";

// Constants for better maintainability
const AWARD_TYPES = {
  ACADEMIC: "academic",
  PROFESSIONAL: "professional",
  COMPETITION: "competition",
  COMMUNITY: "community",
  RESEARCH: "research",
  INNOVATION: "innovation",
};

const PRESTIGE_LEVELS = {
  INTERNATIONAL: "International",
  NATIONAL: "National",
  REGIONAL: "Regional",
  LOCAL: "Local",
  INSTITUTIONAL: "Institutional",
};

const TYPE_COLORS = {
  academic: "#2196F3",
  professional: "#FF9800",
  competition: "#4CAF50",
  community: "#9C27B0",
  research: "#607D8B",
  innovation: "#E91E63",
};

const PRESTIGE_COLORS = {
  International: "#FFD700",
  National: "#C0C0C0",
  Regional: "#CD7F32",
  Local: "#4CAF50",
  Institutional: "#2196F3",
};

const FILTER_ALL_VALUE = "all";

/**
 * Awards & Recognition Management Component
 * Handles display and management of awards with comprehensive filtering
 */
const Awards = () => {
  const outlet = useOutletContext?.() || {};
  const { dashboardData, handleEdit, handleDelete } = outlet;

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState(FILTER_ALL_VALUE);
  const [prestigeFilter, setPrestigeFilter] = useState(FILTER_ALL_VALUE);
  const [yearFilter, setYearFilter] = useState(FILTER_ALL_VALUE);

  // Enhanced awards data with fallback
  const allAwards = useMemo(() => {
    const source = dashboardData?.awards ?? {};

    return (
      source.awards ?? [
        {
          id: "icmi-best-paper-2024",
          title: "Best Paper Award - Outstanding Research",
          organization:
            "International Conference on Medical Informatics (ICMI)",
          year: 2024,
          date: "2024-09-16",
          type: AWARD_TYPES.ACADEMIC,
          prestigeLevel: PRESTIGE_LEVELS.INTERNATIONAL,
          description:
            "Recognized for groundbreaking research in 'Deep Learning Applications for Early Disease Detection Using Multimodal Brain Imaging' demonstrating 94.7% accuracy in early Alzheimer's and Parkinson's detection.",
          significance: "Selected from 300+ submissions across 45 countries",
          monetaryValue: 5000,
          impactMetrics: {
            citations: 24,
            mediaFeatures: 8,
            collaborations: 12,
          },
          certificate: "/certificates/icmi_2024_best_paper.pdf",
          keywords: [
            "Machine Learning",
            "Healthcare",
            "Neuroimaging",
            "Early Detection",
          ],
          featured: true,
          teamSize: 1,
          location: "Boston, MA, USA",
        },
        {
          id: "ieee-young-researcher-2024",
          title: "Young Researcher Excellence Award",
          organization: "IEEE Computer Society",
          year: 2024,
          date: "2024-06-20",
          type: AWARD_TYPES.PROFESSIONAL,
          prestigeLevel: PRESTIGE_LEVELS.INTERNATIONAL,
          description:
            "Honored for exceptional contributions to biomedical engineering and real-time healthcare analytics, specifically for developing ML pipelines for wearable ECG devices.",
          significance: "Top 10 young researchers globally under 30",
          monetaryValue: 8000,
          impactMetrics: {
            publications: 15,
            patents: 3,
            industryAdoption: 5,
          },
          certificate: "/certificates/ieee_young_researcher_2024.pdf",
          keywords: [
            "Biomedical Engineering",
            "Wearable Computing",
            "Real-time Analytics",
          ],
          featured: true,
          teamSize: 1,
          location: "San Francisco, CA, USA",
        },
        {
          id: "neurips-outstanding-paper-2023",
          title: "Outstanding Paper Award",
          organization:
            "Conference on Neural Information Processing Systems (NeurIPS)",
          year: 2023,
          date: "2023-12-10",
          type: AWARD_TYPES.RESEARCH,
          prestigeLevel: PRESTIGE_LEVELS.INTERNATIONAL,
          description:
            "Awarded for 'Federated Learning for Privacy-Preserving Healthcare Analytics: A Multi-institutional Study' - a novel framework enabling collaborative ML training while maintaining HIPAA compliance.",
          significance: "Top 0.5% of accepted papers (26 out of 5,200)",
          impactMetrics: {
            citations: 89,
            implementations: 15,
            industrialPartners: 8,
          },
          certificate: "/certificates/neurips_2023_outstanding.pdf",
          keywords: [
            "Federated Learning",
            "Privacy Preservation",
            "Healthcare",
            "HIPAA",
          ],
          featured: true,
          teamSize: 5,
          location: "New Orleans, LA, USA",
        },
        {
          id: "hackathon-healthcare-ai-2023",
          title: "1st Place - Healthcare AI Challenge",
          organization: "Global Healthcare Innovation Summit",
          year: 2023,
          date: "2023-03-25",
          type: AWARD_TYPES.COMPETITION,
          prestigeLevel: PRESTIGE_LEVELS.INTERNATIONAL,
          description:
            "Built an AI-powered diagnostic assistant achieving 95% accuracy in predicting COVID-19 severity using multi-omics data integration. Solution impressed judges with clinical interpretability and real-world deployment readiness.",
          significance: "120 teams from 25 countries, $50K total prize pool",
          monetaryValue: 25000,
          impactMetrics: {
            accuracy: 95,
            dataPoints: 100000,
            processingTime: 2,
          },
          certificate: "/certificates/healthcare_ai_challenge_2023.pdf",
          keywords: [
            "Multi-omics",
            "COVID-19",
            "Biomarker Discovery",
            "Clinical AI",
          ],
          teamSize: 4,
          location: "Geneva, Switzerland",
        },
        {
          id: "django-core-contributor-2023",
          title: "Outstanding Contribution Award",
          organization: "Django Software Foundation",
          year: 2023,
          date: "2023-10-15",
          type: AWARD_TYPES.COMMUNITY,
          prestigeLevel: PRESTIGE_LEVELS.INTERNATIONAL,
          description:
            "Recognized for exceptional contributions to Django core development including performance optimizations, security patches, and mentoring new contributors. Helped maintain 40M+ monthly active Django installations.",
          significance:
            "Top 10 contributors globally out of 2,000+ active developers",
          impactMetrics: {
            pullRequests: 45,
            issuesResolved: 67,
            menteesGuided: 28,
          },
          certificate: "/certificates/django_outstanding_2023.pdf",
          keywords: ["Open Source", "Django", "Web Framework", "Community"],
          teamSize: 1,
          location: "Remote - Global Community",
        },
        {
          id: "innovation-leadership-2022",
          title: "Technology Innovation Leadership Award",
          organization: "National Technology Leadership Council",
          year: 2022,
          date: "2022-11-10",
          type: AWARD_TYPES.INNOVATION,
          prestigeLevel: PRESTIGE_LEVELS.NATIONAL,
          description:
            "Honored for transforming healthcare technology infrastructure, leading cross-functional teams of 20+ engineers, and delivering $2M+ in cost savings through innovative ML deployment strategies.",
          significance: "Top 5% of technology leaders nationwide",
          monetaryValue: 5000,
          impactMetrics: {
            teamsLed: 3,
            projectsDelivered: 12,
            costSavings: 2000000,
          },
          certificate: "/certificates/innovation_leadership_2022.pdf",
          keywords: [
            "Leadership",
            "Innovation",
            "Cost Optimization",
            "Team Management",
          ],
          teamSize: 1,
          location: "New York, NY, USA",
        },
        {
          id: "web-hackathon-2022",
          title: "2nd Place - Web Innovation Hackathon",
          organization: "Silicon Valley Tech Hub",
          year: 2022,
          date: "2022-08-14",
          type: AWARD_TYPES.COMPETITION,
          prestigeLevel: PRESTIGE_LEVELS.REGIONAL,
          description:
            "Developed a real-time collaborative workspace platform with sub-50ms latency using modern WebSocket architecture. Solution featured 15+ productivity tools with seamless synchronization.",
          significance:
            "80+ teams, judged by industry leaders from Google, Meta, Netflix",
          monetaryValue: 10000,
          impactMetrics: {
            demoUsers: 1000,
            latency: 45,
            features: 15,
          },
          certificate: "/certificates/web_innovation_2022.pdf",
          keywords: [
            "Real-time Systems",
            "WebSocket",
            "Collaboration",
            "Performance",
          ],
          teamSize: 4,
          location: "Palo Alto, CA, USA",
        },
        {
          id: "community-champion-2022",
          title: "Open Source Community Champion",
          organization: "Open Source Initiative",
          year: 2022,
          date: "2022-06-30",
          type: AWARD_TYPES.COMMUNITY,
          prestigeLevel: PRESTIGE_LEVELS.INTERNATIONAL,
          description:
            "Acknowledged for fostering inclusive open-source communities, maintaining 8 widely-used packages, and mentoring 25+ new contributors. Packages collectively downloaded 500K+ times monthly.",
          significance: "Recognizes top community builders globally each year",
          impactMetrics: {
            packagesOwned: 8,
            monthlyDownloads: 500000,
            contributorsHelped: 25,
          },
          certificate: "/certificates/community_champion_2022.pdf",
          keywords: [
            "Open Source",
            "Community Building",
            "Mentorship",
            "Package Maintenance",
          ],
          teamSize: 1,
          location: "Global Open Source Community",
        },
      ]
    );
  }, [dashboardData]);

  // Get unique filter options
  const uniqueTypes = useMemo(() => {
    return [...new Set(allAwards.map((award) => award.type))].sort();
  }, [allAwards]);

  const uniquePrestigeLevels = useMemo(() => {
    return [...new Set(allAwards.map((award) => award.prestigeLevel))].sort();
  }, [allAwards]);

  const uniqueYears = useMemo(() => {
    return [...new Set(allAwards.map((award) => award.year))].sort(
      (a, b) => b - a
    );
  }, [allAwards]);

  // Filter awards
  const filteredAwards = useMemo(() => {
    return allAwards.filter((award) => {
      const matchesSearch =
        searchTerm === "" ||
        award.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        award.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        award.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        award.keywords?.some((keyword) =>
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesType =
        typeFilter === FILTER_ALL_VALUE || award.type === typeFilter;
      const matchesPrestige =
        prestigeFilter === FILTER_ALL_VALUE ||
        award.prestigeLevel === prestigeFilter;
      const matchesYear =
        yearFilter === FILTER_ALL_VALUE || award.year.toString() === yearFilter;

      return matchesSearch && matchesType && matchesPrestige && matchesYear;
    });
  }, [allAwards, searchTerm, typeFilter, prestigeFilter, yearFilter]);

  // Calculate comprehensive statistics
  const statistics = useMemo(() => {
    const totalMonetaryValue = allAwards.reduce(
      (sum, award) => sum + (award.monetaryValue || 0),
      0
    );
    const internationalAwards = allAwards.filter(
      (award) => award.prestigeLevel === PRESTIGE_LEVELS.INTERNATIONAL
    ).length;
    const monetaryAwards = allAwards.filter(
      (award) => award.monetaryValue > 0
    ).length;
    const competitionAwards = allAwards.filter(
      (award) => award.type === AWARD_TYPES.COMPETITION
    ).length;

    return {
      totalAwards: allAwards.length,
      totalMonetaryValue,
      internationalAwards,
      monetaryAwards,
      competitionAwards,
      currentYear: allAwards.filter((award) => award.year === 2024).length,
    };
  }, [allAwards]);

  // Helper functions
  const formatCurrency = useCallback((value) => {
    return typeof value === "number"
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(value)
      : "N/A";
  }, []);

  const formatNumber = useCallback((value) => {
    return typeof value === "number" ? value.toLocaleString() : value;
  }, []);

  const getTypeIcon = useCallback((type) => {
    const icons = {
      academic: <EmojiEvents />,
      professional: <WorkspacePremium />,
      competition: <Star />,
      community: <Group />,
      research: <TrendingUp />,
      innovation: <Public />,
    };
    return icons[type] || <EmojiEvents />;
  }, []);

  const getTypeColor = useCallback((type) => {
    return TYPE_COLORS[type] || TYPE_COLORS.academic;
  }, []);

  const getPrestigeColor = useCallback((prestige) => {
    return PRESTIGE_COLORS[prestige] || PRESTIGE_COLORS.Local;
  }, []);

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setTypeFilter(FILTER_ALL_VALUE);
    setPrestigeFilter(FILTER_ALL_VALUE);
    setYearFilter(FILTER_ALL_VALUE);
  }, []);

  const handleAddAward = useCallback(() => {
    handleEdit?.("awards", { mode: "create" });
  }, [handleEdit]);

  const handleEditAward = useCallback(
    (award) => {
      handleEdit?.("awards", { mode: "edit", item: award });
    },
    [handleEdit]
  );

  const handleDeleteAward = useCallback(
    (award) => {
      handleDelete?.("awards", { item: award });
    },
    [handleDelete]
  );

  return (
    <Stack spacing={4} sx={{ pb: 6, pt: 4 }}>
      {/* Header */}
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
          Awards & Recognition
        </Typography>
        <Button
          onClick={handleAddAward}
          sx={{
            background: "#FBC02D",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#FDD835",
            },
          }}
        >
          <Add fontSize="small" />
          Add Award
        </Button>
      </Stack>

      {/* Statistics Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {[
          {
            label: "Total Awards",
            value: statistics.totalAwards,
            icon: <EmojiEvents />,
            color: "#FBC02D",
          },
          {
            label: "International",
            value: statistics.internationalAwards,
            icon: <Public />,
            color: "#4CAF50",
          },
          {
            label: "Prize Money",
            value: formatCurrency(statistics.totalMonetaryValue),
            icon: <AttachMoney />,
            color: "#FF9800",
          },
          {
            label: "Competitions",
            value: statistics.competitionAwards,
            icon: <Star />,
            color: "#9C27B0",
          },
        ].map((stat) => (
          <Box
            key={stat.label}
            sx={{
              p: 3,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${stat.color}12 0%, ${stat.color}06 100%)`,
              border: `1px solid ${stat.color}30`,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  backgroundColor: `${stat.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: stat.color,
                }}
              >
                {stat.icon}
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 24,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 14,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Stack>
          </Box>
        ))}
      </Box>

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
                Filter Awards
              </Typography>
            </Stack>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {filteredAwards.length} of {allAwards.length}
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            {/* Search */}
            <TextField
              placeholder="Search awards, organizations, or keywords..."
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
                    borderColor: "#FBC02D",
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
                  "&.Mui-focused": { color: "#FBC02D" },
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
                    borderColor: "#FBC02D",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value={FILTER_ALL_VALUE}>All Types</MenuItem>
                {uniqueTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Prestige Filter */}
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#FBC02D" },
                }}
              >
                Prestige
              </InputLabel>
              <Select
                value={prestigeFilter}
                onChange={(e) => setPrestigeFilter(e.target.value)}
                label="Prestige"
                sx={{
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FBC02D",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value={FILTER_ALL_VALUE}>All Levels</MenuItem>
                {uniquePrestigeLevels.map((prestige) => (
                  <MenuItem key={prestige} value={prestige}>
                    {prestige}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Year Filter */}
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#FBC02D" },
                }}
              >
                Year
              </InputLabel>
              <Select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                label="Year"
                sx={{
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FBC02D",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value={FILTER_ALL_VALUE}>All Years</MenuItem>
                {uniqueYears.map((year) => (
                  <MenuItem key={year} value={year.toString()}>
                    {year}
                  </MenuItem>
                ))}
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

      {/* Awards List */}
      {filteredAwards.length === 0 ? (
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
            No Awards Found
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 14,
              maxWidth: 400,
              lineHeight: 1.6,
            }}
          >
            Try adjusting your search terms or filters to find the awards you're
            looking for.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={3}>
          {filteredAwards.map((award) => (
            <Box
              key={award.id}
              sx={{
                p: 3,
                borderRadius: 4,
                background: `linear-gradient(135deg, ${getTypeColor(
                  award.type
                )}12 0%, ${getTypeColor(award.type)}06 100%)`,
                border: `1px solid ${getTypeColor(award.type)}30`,
                position: "relative",
                transition: "all 160ms ease",
                "&:hover": {
                  borderColor: `${getTypeColor(award.type)}60`,
                  transform: "translateY(-2px)",
                  boxShadow: `0 8px 32px ${getTypeColor(award.type)}20`,
                },
              }}
            >
              <Stack spacing={2.5}>
                {/* Header */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="flex-start"
                    sx={{ flex: 1 }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        backgroundColor: `${getTypeColor(award.type)}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: getTypeColor(award.type),
                        mt: 0.5,
                      }}
                    >
                      {getTypeIcon(award.type)}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: 18,
                          lineHeight: 1.3,
                          mb: 1,
                        }}
                      >
                        {award.title}
                        {award.featured && (
                          <Star
                            sx={{ ml: 1, fontSize: 18, color: "#FFD700" }}
                          />
                        )}
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.7)",
                          fontSize: 14,
                          mb: 1,
                        }}
                      >
                        {award.organization} • {formatDate(award.date)}
                      </Typography>

                      {/* Award Info */}
                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        alignItems="center"
                      >
                        <Chip
                          label={
                            award.type.charAt(0).toUpperCase() +
                            award.type.slice(1)
                          }
                          size="small"
                          sx={{
                            backgroundColor: `${getTypeColor(award.type)}20`,
                            color: getTypeColor(award.type),
                            fontWeight: 600,
                            fontSize: 12,
                            border: `1px solid ${getTypeColor(award.type)}40`,
                          }}
                        />
                        <Chip
                          label={award.prestigeLevel}
                          size="small"
                          sx={{
                            backgroundColor: `${getPrestigeColor(
                              award.prestigeLevel
                            )}20`,
                            color: getPrestigeColor(award.prestigeLevel),
                            fontWeight: 600,
                            fontSize: 12,
                            border: `1px solid ${getPrestigeColor(
                              award.prestigeLevel
                            )}40`,
                          }}
                        />
                        <Chip
                          label={award.year}
                          size="small"
                          sx={{
                            backgroundColor: "#2196F3",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: 12,
                          }}
                        />
                        {award.monetaryValue && (
                          <Chip
                            label={formatCurrency(award.monetaryValue)}
                            size="small"
                            sx={{
                              backgroundColor: "#4CAF50",
                              color: "#fff",
                              fontWeight: 600,
                              fontSize: 12,
                            }}
                          />
                        )}
                        {award.teamSize && award.teamSize > 1 && (
                          <Chip
                            label={`Team of ${award.teamSize}`}
                            size="small"
                            sx={{
                              backgroundColor: "#FF9800",
                              color: "#fff",
                              fontWeight: 600,
                              fontSize: 12,
                            }}
                          />
                        )}
                      </Stack>
                    </Box>
                  </Stack>

                  {/* Action Buttons */}
                  <Stack direction="row" spacing={0.5}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditAward(award);
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
                        handleDeleteAward(award);
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

                {/* Description */}
                {award.description && (
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: 14,
                      lineHeight: 1.6,
                    }}
                  >
                    {award.description}
                  </Typography>
                )}

                {/* Significance */}
                {award.significance && (
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.85)",
                      fontSize: 14,
                      fontWeight: 600,
                      fontStyle: "italic",
                    }}
                  >
                    🏆 {award.significance}
                  </Typography>
                )}

                {/* Impact Metrics */}
                {award.impactMetrics &&
                  Object.keys(award.impactMetrics).length > 0 && (
                    <Stack direction="row" spacing={3} flexWrap="wrap">
                      {Object.entries(award.impactMetrics).map(
                        ([key, value]) => (
                          <Box
                            key={`${award.id}-${key}`}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <TrendingUp
                              sx={{ color: "#4CAF50", fontSize: 16 }}
                            />
                            <Typography
                              sx={{
                                color: "#4CAF50",
                                fontSize: 13,
                                fontWeight: 600,
                              }}
                            >
                              {formatNumber(value)}{" "}
                              {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                            </Typography>
                          </Box>
                        )
                      )}
                    </Stack>
                  )}

                {/* Keywords */}
                {award.keywords && award.keywords.length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {award.keywords.map((keyword) => (
                      <Chip
                        key={`${award.id}-${keyword}`}
                        label={keyword}
                        size="small"
                        sx={{
                          backgroundColor: `${getTypeColor(award.type)}25`,
                          color: `${getTypeColor(award.type)}FF`,
                          fontWeight: 600,
                          fontSize: 11,
                          "&:hover": {
                            backgroundColor: `${getTypeColor(award.type)}40`,
                          },
                        }}
                      />
                    ))}
                  </Stack>
                )}

                {/* Action Links */}
                {(award.certificate || award.location) && (
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    {award.certificate && (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Launch />}
                        href={award.certificate}
                        target="_blank"
                        sx={{
                          color: "rgba(255,255,255,0.8)",
                          borderColor: "rgba(255,255,255,0.3)",
                          fontSize: 12,
                          textTransform: "none",
                          "&:hover": {
                            borderColor: "rgba(255,255,255,0.5)",
                            backgroundColor: "rgba(255,255,255,0.1)",
                          },
                        }}
                      >
                        Certificate
                      </Button>
                    )}
                    {award.location && (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Place />}
                        disabled
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          borderColor: "rgba(255,255,255,0.3)",
                          fontSize: 12,
                          textTransform: "none",
                        }}
                      >
                        {award.location}
                      </Button>
                    )}
                  </Stack>
                )}
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default Awards;
