import React, { useState, useMemo, useCallback } from "react";
// import { useOutletContext } from "react-router-dom";
import {
  Stack,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
} from "@mui/material";
import {
  Add,
  Search,
  FilterList,
  Clear,
  Edit,
  Delete,
  Groups,
  Business,
  Public,
  Launch,
  LinkedIn,
  GitHub,
  Language,
  Star,
  Verified,
  LocationOn,
  CalendarToday,
  TrendingUp,
  People,
  EmojiEvents,
} from "@mui/icons-material";

// Constants
const FILTER_ALL_VALUE = "all";

const NETWORK_TYPES = {
  PROFESSIONAL: "professional",
  INDUSTRY: "industry",
  COMMUNITY: "community",
  ACADEMIC: "academic",
};

const NETWORK_STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  PENDING: "Pending",
  SUSPENDED: "Suspended",
};

const TYPE_COLORS = {
  professional: "#2196F3",
  industry: "#9C27B0",
  community: "#FF9800",
  academic: "#4CAF50",
};

const STATUS_COLORS = {
  Active: "#4CAF50",
  Inactive: "#9E9E9E",
  Pending: "#FF9800",
  Suspended: "#F44336",
};

const Networks = () => {
  // const { dashboardData } = useOutletContext();

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState(FILTER_ALL_VALUE);
  const [statusFilter, setStatusFilter] = useState(FILTER_ALL_VALUE);
  const [categoryFilter, setCategoryFilter] = useState(FILTER_ALL_VALUE);

  // Networks data with comprehensive examples
  const allNetworks = useMemo(() => {
    return [
      {
        id: 1,
        name: "LinkedIn Professional Network",
        platform: "LinkedIn",
        username: "nazmul-hossain-dev",
        profileUrl: "https://linkedin.com/in/nazmul-hossain-dev",
        type: NETWORK_TYPES.PROFESSIONAL,
        category: "Professional Social",
        joinDate: "2019-03-15",
        location: "Global",
        status: NETWORK_STATUS.ACTIVE,
        description:
          "Professional networking platform for career development, industry connections, and knowledge sharing. Actively engaged with technology professionals and recruiters.",
        metrics: {
          connections: 2847,
          followers: 1254,
          posts: 156,
          articles: 23,
          endorsements: 89,
          recommendations: 17,
        },
        engagement: {
          weeklyViews: 450,
          searchAppearances: 230,
          postImpressions: 5600,
        },
        verified: true,
        isPrimary: true,
        featured: true,
      },
      {
        id: 2,
        name: "GitHub Developer Community",
        platform: "GitHub",
        username: "nazmulh24",
        profileUrl: "https://github.com/nazmulh24",
        type: NETWORK_TYPES.PROFESSIONAL,
        category: "Developer Community",
        joinDate: "2020-01-20",
        location: "Global",
        status: NETWORK_STATUS.ACTIVE,
        description:
          "Open source development platform for code collaboration, project hosting, and developer networking. Contributing to various projects and maintaining repositories.",
        metrics: {
          repositories: 47,
          followers: 189,
          following: 145,
          stars: 234,
          contributions: 1847,
          organizations: 8,
        },
        engagement: {
          commitsThisYear: 567,
          pullRequests: 89,
          issues: 34,
        },
        verified: true,
        isPrimary: true,
      },
      {
        id: 3,
        name: "Stack Overflow Developer Network",
        platform: "Stack Overflow",
        username: "nazmul_dev",
        profileUrl: "https://stackoverflow.com/users/nazmul_dev",
        type: NETWORK_TYPES.PROFESSIONAL,
        category: "Q&A Community",
        joinDate: "2020-06-10",
        location: "Global",
        status: NETWORK_STATUS.ACTIVE,
        description:
          "Technical Q&A platform for developers. Providing solutions and helping fellow developers with programming challenges, particularly in Django and React.",
        metrics: {
          reputation: 3247,
          answers: 67,
          questions: 23,
          badgesEarned: 15,
          peopleReached: 25000,
          acceptedAnswers: 42,
        },
        engagement: {
          monthlyViews: 1200,
          upvotes: 289,
          downvotes: 12,
        },
        verified: false,
      },
      {
        id: 4,
        name: "Django Software Foundation",
        platform: "Django Foundation",
        type: NETWORK_TYPES.INDUSTRY,
        category: "Web Development",
        role: "Contributing Member",
        joinDate: "2021-05-15",
        location: "Global",
        status: NETWORK_STATUS.ACTIVE,
        website: "https://djangoproject.com/foundation/",
        description:
          "Non-profit organization that supports the Django web framework. Active contributor to the Django ecosystem through code contributions and community support.",
        activities: [
          "Code contributions to Django core",
          "Community forum participation",
          "Documentation improvements",
          "Bug reporting and fixes",
        ],
        achievements: [
          "Outstanding Contributor Award 2023",
          "Top 50 contributors list",
          "Community recognition badge",
        ],
        metrics: {
          contributions: 45,
          forumPosts: 234,
          documentation: 12,
          bugFixes: 28,
        },
        networking: {
          connections: 156,
          events: 12,
        },
        membershipLevel: "Contributing",
      },
      {
        id: 5,
        name: "React Developer Community",
        platform: "React Community",
        type: NETWORK_TYPES.INDUSTRY,
        category: "Frontend Development",
        role: "Active Contributor",
        joinDate: "2020-11-20",
        location: "Global",
        status: NETWORK_STATUS.ACTIVE,
        website: "https://reactjs.org/community/",
        description:
          "Global community of React developers sharing knowledge, best practices, and contributing to the React ecosystem through discussions and code contributions.",
        activities: [
          "Community discussions participation",
          "Tutorial and blog writing",
          "Code review assistance",
          "Mentoring new developers",
        ],
        achievements: [
          "Top contributor badge",
          "Community helper recognition",
          "Featured blog posts",
        ],
        metrics: {
          discussions: 89,
          tutorials: 23,
          mentees: 15,
          blogPosts: 12,
        },
        networking: {
          connections: 234,
          events: 18,
        },
        membershipLevel: "Contributor",
      },
      {
        id: 6,
        name: "IEEE Computer Society",
        platform: "IEEE",
        type: NETWORK_TYPES.INDUSTRY,
        category: "Technology Research",
        role: "Professional Member",
        joinDate: "2022-02-10",
        location: "Global",
        status: NETWORK_STATUS.ACTIVE,
        website: "https://computer.org/",
        description:
          "Professional organization for computing professionals. Participating in research communities, conferences, and professional development activities.",
        activities: [
          "Conference participation",
          "Research paper reviews",
          "Professional development courses",
          "Networking events attendance",
        ],
        achievements: [
          "Conference presenter badge",
          "Peer review recognition",
          "Professional development certificates",
        ],
        metrics: {
          conferences: 8,
          paperReviews: 12,
          certifications: 5,
          presentations: 3,
        },
        networking: {
          connections: 89,
          events: 8,
        },
        membershipLevel: "Professional",
      },
      {
        id: 7,
        name: "Tech Meetup Bay Area",
        platform: "Meetup",
        type: NETWORK_TYPES.COMMUNITY,
        category: "Technology Meetup",
        role: "Regular Speaker",
        joinDate: "2021-08-15",
        location: "San Francisco, CA",
        status: NETWORK_STATUS.ACTIVE,
        website: "https://meetup.com/tech-bay-area",
        description:
          "Local technology meetup group focusing on web development, AI, and emerging technologies. Regular participant and occasional speaker on Django and React topics.",
        activities: [
          "Monthly meetup attendance",
          "Technical presentations",
          "Workshop facilitation",
          "Networking with local developers",
        ],
        events: [
          {
            title: "Django Best Practices Workshop",
            date: "2023-09-15",
            role: "Workshop Leader",
            attendance: 45,
          },
          {
            title: "React State Management Talk",
            date: "2023-06-20",
            role: "Speaker",
            attendance: 38,
          },
        ],
        metrics: {
          presentations: 6,
          workshops: 4,
          attendance: 24,
          networkingEvents: 18,
        },
        networking: {
          connections: 127,
          events: 24,
        },
        membershipLevel: "Speaker",
        featured: true,
      },
      {
        id: 8,
        name: "Open Source Collective",
        platform: "OpenCollective",
        type: NETWORK_TYPES.COMMUNITY,
        category: "Open Source",
        role: "Project Maintainer",
        joinDate: "2020-12-05",
        location: "Global",
        status: NETWORK_STATUS.ACTIVE,
        website: "https://opencollective.com/",
        description:
          "Community of open source contributors and maintainers. Managing and contributing to various open source projects while helping other developers get started.",
        activities: [
          "Project maintenance",
          "New contributor mentoring",
          "Code review and guidance",
          "Community events organization",
        ],
        projects: [
          "Django utility packages",
          "React component libraries",
          "Developer tools and scripts",
        ],
        metrics: {
          projectsMaintained: 8,
          contributors: 45,
          codeReviews: 234,
          mentees: 23,
        },
        networking: {
          connections: 298,
          events: 15,
        },
        membershipLevel: "Maintainer",
      },
      {
        id: 9,
        name: "Association for Computing Machinery (ACM)",
        platform: "ACM",
        type: NETWORK_TYPES.ACADEMIC,
        category: "Computer Science Research",
        role: "Student Member",
        joinDate: "2021-09-01",
        location: "Global",
        status: NETWORK_STATUS.ACTIVE,
        website: "https://acm.org/",
        description:
          "World's largest educational and scientific computing society. Participating in research communities and staying updated with latest computing research and developments.",
        activities: [
          "Research paper access",
          "Conference proceedings review",
          "Special interest groups participation",
          "Professional development webinars",
        ],
        specialInterests: [
          "Human-Computer Interaction",
          "Software Engineering",
          "Web Technologies",
          "Machine Learning Applications",
        ],
        metrics: {
          papersAccessed: 234,
          webinars: 45,
          sigParticipation: 8,
          conferences: 5,
        },
        networking: {
          connections: 67,
          events: 5,
        },
        membershipLevel: "Student",
      },
      {
        id: 10,
        name: "ResearchGate Academic Network",
        platform: "ResearchGate",
        type: NETWORK_TYPES.ACADEMIC,
        category: "Academic Research",
        role: "Researcher",
        joinDate: "2022-01-20",
        location: "Global",
        status: NETWORK_STATUS.ACTIVE,
        profileUrl: "https://researchgate.net/profile/nazmul-hossain",
        description:
          "Academic social networking platform for researchers. Sharing research findings, collaborating with fellow researchers, and staying updated with latest publications.",
        activities: [
          "Research publication sharing",
          "Collaboration with researchers",
          "Peer review participation",
          "Research discussion forums",
        ],
        metrics: {
          publications: 8,
          citations: 67,
          reads: 1247,
          followers: 89,
          following: 156,
          researchGateScore: 4.2,
        },
        networking: {
          connections: 134,
          collaborations: 8,
        },
        membershipLevel: "Researcher",
        featured: true,
      },
    ];
  }, []);

  // Get unique filter options
  const uniqueTypes = useMemo(() => {
    return [...new Set(allNetworks.map((network) => network.type))].sort();
  }, [allNetworks]);

  const uniqueStatuses = useMemo(() => {
    return [...new Set(allNetworks.map((network) => network.status))].sort();
  }, [allNetworks]);

  const uniqueCategories = useMemo(() => {
    return [...new Set(allNetworks.map((network) => network.category))].sort();
  }, [allNetworks]);

  // Filter networks
  const filteredNetworks = useMemo(() => {
    return allNetworks.filter((network) => {
      const matchesSearch =
        searchTerm === "" ||
        network.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        network.platform?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        network.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        network.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        network.username?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        typeFilter === FILTER_ALL_VALUE || network.type === typeFilter;
      const matchesStatus =
        statusFilter === FILTER_ALL_VALUE || network.status === statusFilter;
      const matchesCategory =
        categoryFilter === FILTER_ALL_VALUE ||
        network.category === categoryFilter;

      return matchesSearch && matchesType && matchesStatus && matchesCategory;
    });
  }, [allNetworks, searchTerm, typeFilter, statusFilter, categoryFilter]);

  // Calculate comprehensive statistics
  const statistics = useMemo(() => {
    const professionalNetworks = allNetworks.filter(
      (network) => network.type === NETWORK_TYPES.PROFESSIONAL
    ).length;
    const industryNetworks = allNetworks.filter(
      (network) => network.type === NETWORK_TYPES.INDUSTRY
    ).length;
    const communityNetworks = allNetworks.filter(
      (network) => network.type === NETWORK_TYPES.COMMUNITY
    ).length;
    const academicNetworks = allNetworks.filter(
      (network) => network.type === NETWORK_TYPES.ACADEMIC
    ).length;

    const totalConnections = allNetworks.reduce((sum, network) => {
      return (
        sum +
        (network.metrics?.connections ||
          network.metrics?.followers ||
          network.networking?.connections ||
          0)
      );
    }, 0);

    return {
      totalNetworks: allNetworks.length,
      professionalNetworks,
      industryNetworks,
      communityNetworks,
      academicNetworks,
      totalConnections,
      activeNetworks: allNetworks.filter(
        (network) => network.status === NETWORK_STATUS.ACTIVE
      ).length,
    };
  }, [allNetworks]);

  // Helper functions
  const formatNumber = useCallback((value) => {
    return typeof value === "number" ? value.toLocaleString() : value;
  }, []);

  const getPlatformIcon = useCallback((platform) => {
    const platformLower = platform?.toLowerCase();
    if (platformLower?.includes("linkedin")) return <LinkedIn />;
    if (platformLower?.includes("github")) return <GitHub />;
    return <Language />;
  }, []);

  const getTypeColor = useCallback((type) => {
    return TYPE_COLORS[type] || TYPE_COLORS.professional;
  }, []);

  const getStatusColor = useCallback((status) => {
    return STATUS_COLORS[status] || STATUS_COLORS.Active;
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
    setStatusFilter(FILTER_ALL_VALUE);
    setCategoryFilter(FILTER_ALL_VALUE);
  }, []);

  const handleAddNetwork = useCallback(() => {
    console.log("Add Network clicked");
  }, []);

  const handleEditNetwork = useCallback((network) => {
    console.log("Edit Network:", network);
  }, []);

  const handleDeleteNetwork = useCallback((network) => {
    if (window.confirm(`Are you sure you want to delete "${network.name}"?`)) {
      console.log("Delete Network:", network);
    }
  }, []);

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
          Networks & Communities
        </Typography>
        <Button
          onClick={handleAddNetwork}
          sx={{
            background: "#00BCD4",
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
              backgroundColor: "#00ACC1",
            },
          }}
        >
          <Add fontSize="small" />
          Add Network
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
            label: "Total Networks",
            value: statistics.totalNetworks,
            icon: <Groups />,
            color: "#00BCD4",
          },
          {
            label: "Total Connections",
            value: formatNumber(statistics.totalConnections),
            icon: <People />,
            color: "#2196F3",
          },
          {
            label: "Professional",
            value: statistics.professionalNetworks,
            icon: <Business />,
            color: "#9C27B0",
          },
          {
            label: "Community",
            value: statistics.communityNetworks,
            icon: <Public />,
            color: "#FF9800",
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
                Filter Networks
              </Typography>
            </Stack>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {filteredNetworks.length} of {allNetworks.length}
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            {/* Search */}
            <TextField
              placeholder="Search networks, platforms, or categories..."
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
                    borderColor: "#00BCD4",
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
                  "&.Mui-focused": { color: "#00BCD4" },
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
                    borderColor: "#00BCD4",
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

            {/* Status Filter */}
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#00BCD4" },
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
                    borderColor: "#00BCD4",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value={FILTER_ALL_VALUE}>All Status</MenuItem>
                {uniqueStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Category Filter */}
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#00BCD4" },
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
                    borderColor: "#00BCD4",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value={FILTER_ALL_VALUE}>All Categories</MenuItem>
                {uniqueCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
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

      {/* Networks List */}
      {filteredNetworks.length === 0 ? (
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
            No Networks Found
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 14,
              maxWidth: 400,
              lineHeight: 1.6,
            }}
          >
            Try adjusting your search terms or filters to find the networks
            you're looking for.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={3}>
          {filteredNetworks.map((network) => (
            <Box
              key={network.id}
              sx={{
                p: 3,
                borderRadius: 4,
                background: `linear-gradient(135deg, ${getTypeColor(
                  network.type
                )}12 0%, ${getTypeColor(network.type)}06 100%)`,
                border: `1px solid ${getTypeColor(network.type)}30`,
                position: "relative",
                transition: "all 160ms ease",
                "&:hover": {
                  borderColor: `${getTypeColor(network.type)}60`,
                  transform: "translateY(-2px)",
                  boxShadow: `0 8px 32px ${getTypeColor(network.type)}20`,
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
                        backgroundColor: `${getTypeColor(network.type)}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: getTypeColor(network.type),
                        mt: 0.5,
                      }}
                    >
                      {getPlatformIcon(network.platform)}
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
                        {network.name}
                        {network.featured && (
                          <EmojiEvents
                            sx={{ ml: 1, fontSize: 18, color: "#FFD700" }}
                          />
                        )}
                        {network.verified && (
                          <Verified
                            sx={{ ml: 1, fontSize: 16, color: "#4CAF50" }}
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
                        {network.platform}{" "}
                        {network.username && `• @${network.username}`}{" "}
                        {network.role && `• ${network.role}`}
                      </Typography>

                      {/* Network Info */}
                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        alignItems="center"
                      >
                        <Chip
                          label={
                            network.type.charAt(0).toUpperCase() +
                            network.type.slice(1)
                          }
                          size="small"
                          sx={{
                            backgroundColor: `${getTypeColor(network.type)}20`,
                            color: getTypeColor(network.type),
                            fontWeight: 600,
                            fontSize: 12,
                            border: `1px solid ${getTypeColor(network.type)}40`,
                          }}
                        />
                        <Chip
                          label={network.status}
                          size="small"
                          sx={{
                            backgroundColor: `${getStatusColor(
                              network.status
                            )}20`,
                            color: getStatusColor(network.status),
                            fontWeight: 600,
                            fontSize: 12,
                            border: `1px solid ${getStatusColor(
                              network.status
                            )}40`,
                          }}
                        />
                        <Chip
                          label={network.category}
                          size="small"
                          sx={{
                            backgroundColor: "#2196F3",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: 12,
                          }}
                        />
                        {network.membershipLevel && (
                          <Chip
                            startIcon={<Star fontSize="small" />}
                            label={network.membershipLevel}
                            size="small"
                            sx={{
                              backgroundColor: "#FF9800",
                              color: "#fff",
                              fontWeight: 600,
                              fontSize: 12,
                            }}
                          />
                        )}
                        {network.location && (
                          <Chip
                            startIcon={<LocationOn fontSize="small" />}
                            label={network.location}
                            size="small"
                            sx={{
                              backgroundColor: "#9C27B0",
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
                        handleEditNetwork(network);
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
                        handleDeleteNetwork(network);
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
                {network.description && (
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: 14,
                      lineHeight: 1.6,
                    }}
                  >
                    {network.description}
                  </Typography>
                )}

                {/* Join Date & Location */}
                <Stack direction="row" spacing={3} flexWrap="wrap">
                  {network.joinDate && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarToday sx={{ color: "#4CAF50", fontSize: 16 }} />
                      <Typography
                        sx={{
                          color: "#4CAF50",
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        Joined {formatDate(network.joinDate)}
                      </Typography>
                    </Box>
                  )}
                </Stack>

                {/* Metrics */}
                {network.metrics && Object.keys(network.metrics).length > 0 && (
                  <Stack direction="row" spacing={3} flexWrap="wrap">
                    {Object.entries(network.metrics)
                      .slice(0, 4)
                      .map(([key, value]) => (
                        <Box
                          key={`${network.id}-${key}`}
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <TrendingUp sx={{ color: "#2196F3", fontSize: 16 }} />
                          <Typography
                            sx={{
                              color: "#2196F3",
                              fontSize: 13,
                              fontWeight: 600,
                            }}
                          >
                            {formatNumber(value)}{" "}
                            {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                          </Typography>
                        </Box>
                      ))}
                  </Stack>
                )}

                {/* Activities */}
                {network.activities && network.activities.length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {network.activities.slice(0, 4).map((activity) => (
                      <Chip
                        key={`${network.id}-${activity}`}
                        label={activity}
                        size="small"
                        sx={{
                          backgroundColor: `${getTypeColor(network.type)}25`,
                          color: `${getTypeColor(network.type)}FF`,
                          fontWeight: 600,
                          fontSize: 11,
                          "&:hover": {
                            backgroundColor: `${getTypeColor(network.type)}40`,
                          },
                        }}
                      />
                    ))}
                  </Stack>
                )}

                {/* Links */}
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  {network.profileUrl && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Launch />}
                      href={network.profileUrl}
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
                      View Profile
                    </Button>
                  )}
                  {network.website && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Language />}
                      href={network.website}
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
                      Visit Website
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default Networks;
