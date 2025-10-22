import React, { useState, useMemo, useCallback, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Switch,
  FormControlLabel,
  Autocomplete,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import {
  Add,
  Search,
  FilterList,
  Clear,
  Edit,
  Delete,
  Event,
  School,
  Group,
  Business,
  People,
  VolunteerActivism,
  Timeline,
  CalendarToday,
  LocationOn,
  EmojiEvents,
  Launch,
  Insights,
  Close,
  Save,
} from "@mui/icons-material";

// Constants
const FILTER_ALL_VALUE = "all";

const ACTIVITY_TYPES = {
  SPEAKING: "speaking",
  WORKSHOP: "workshop",
  COMMUNITY: "community",
  SERVICE: "service",
  MENTORSHIP: "mentorship",
  VOLUNTEER: "volunteer",
};

const ACTIVITY_STATUS = {
  COMPLETED: "Completed",
  ONGOING: "Ongoing",
  PLANNED: "Planned",
  CANCELLED: "Cancelled",
};

const TYPE_COLORS = {
  speaking: "#2196F3",
  workshop: "#FF9800",
  community: "#4CAF50",
  service: "#9C27B0",
  mentorship: "#795548",
  volunteer: "#66BB6A",
};

const STATUS_COLORS = {
  Completed: "#4CAF50",
  Ongoing: "#2196F3",
  Planned: "#FF9800",
  Cancelled: "#F44336",
};

const Activities = () => {
  // const { dashboardData } = useOutletContext();

  // Main state for activities
  const [activities, setActivities] = useState([]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState(FILTER_ALL_VALUE);
  const [statusFilter, setStatusFilter] = useState(FILTER_ALL_VALUE);
  const [yearFilter, setYearFilter] = useState(FILTER_ALL_VALUE);

  // CRUD dialog states
  const [openDialog, setOpenDialog] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    type: "",
    role: "",
    status: ACTIVITY_STATUS.PLANNED,
    year: new Date().getFullYear(),
    date: "",
    location: "",
    audience: 0,
    duration: "",
    description: "",
    topics: [],
    featured: false,
    impact: {},
    materials: {},
  });

  // Notification state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Initialize demo data
  useEffect(() => {
    setActivities([
      {
        id: 1,
        title: "Machine Learning in Healthcare Conference",
        organization: "IEEE Medical AI Society",
        type: ACTIVITY_TYPES.SPEAKING,
        role: "Keynote Speaker",
        status: ACTIVITY_STATUS.COMPLETED,
        year: 2024,
        date: "2024-03-15",
        location: "San Francisco, CA",
        audience: 500,
        duration: "45 minutes",
        description:
          "Delivered keynote on ethical AI implementation in clinical decision support systems, focusing on bias mitigation and transparency.",
        topics: [
          "Machine Learning",
          "Healthcare",
          "Ethics",
          "Clinical AI",
          "Bias Mitigation",
        ],
        impact: {
          attendees: 500,
          engagementRate: 94,
          followUpConnections: 45,
        },
        featured: true,
        materials: {
          slides: "/presentations/ml_healthcare_keynote.pdf",
          video: "https://youtube.com/watch?v=example1",
          paper: "/papers/ethical_ai_healthcare.pdf",
        },
      },
      {
        id: 2,
        title: "Python Data Science Workshop Series",
        organization: "TechSkills Academy",
        type: ACTIVITY_TYPES.WORKSHOP,
        role: "Lead Instructor",
        status: ACTIVITY_STATUS.ONGOING,
        year: 2024,
        date: "2024-01-15",
        location: "Virtual",
        audience: 150,
        duration: "8 weeks",
        description:
          "Comprehensive 8-week workshop series covering pandas, scikit-learn, and machine learning fundamentals for working professionals.",
        topics: [
          "Python",
          "Data Science",
          "Machine Learning",
          "Pandas",
          "Scikit-learn",
        ],
        impact: {
          students: 150,
          completionRate: 87,
          satisfactionScore: 4.8,
          jobPlacements: 23,
        },
        materials: {
          curriculum: "/workshops/python_ds_curriculum.pdf",
          exercises: "/workshops/python_ds_exercises.zip",
          certificates: "/certificates/python_ds_template.pdf",
        },
      },
      {
        id: 3,
        title: "Open Source Contribution Drive",
        organization: "Local Developer Community",
        type: ACTIVITY_TYPES.COMMUNITY,
        role: "Event Organizer",
        status: ACTIVITY_STATUS.COMPLETED,
        year: 2024,
        date: "2024-10-01",
        location: "New York, NY",
        audience: 80,
        duration: "1 day",
        description:
          "Organized community event to encourage first-time open source contributions, with mentorship and guided project selection.",
        topics: ["Open Source", "Git", "GitHub", "Community", "Mentorship"],
        impact: {
          participants: 80,
          firstTimeContributors: 45,
          pullRequestsMerged: 67,
          projectsSupported: 12,
        },
        materials: {
          guide: "/community/opensource_guide.pdf",
          projectList: "/community/beginner_projects.json",
        },
      },
      {
        id: 4,
        title: "Journal Review Committee",
        organization: "Journal of AI Research",
        type: ACTIVITY_TYPES.SERVICE,
        role: "Associate Editor",
        status: ACTIVITY_STATUS.ONGOING,
        year: 2024,
        date: "2024-01-01",
        duration: "Ongoing",
        description:
          "Serving as associate editor for AI research journal, overseeing peer review process and maintaining publication quality standards.",
        topics: [
          "Peer Review",
          "Academic Publishing",
          "AI Research",
          "Editorial",
        ],
        impact: {
          papersReviewed: 24,
          averageReviewTime: 18,
          acceptanceRate: 32,
        },
      },
      {
        id: 5,
        title: "Student Mentorship Program",
        organization: "University Tech Initiative",
        type: ACTIVITY_TYPES.MENTORSHIP,
        role: "Senior Mentor",
        status: ACTIVITY_STATUS.ONGOING,
        year: 2024,
        date: "2024-09-01",
        location: "Boston, MA",
        duration: "Academic Year",
        description:
          "Mentoring undergraduate students in computer science, focusing on career development, research opportunities, and industry preparation.",
        topics: [
          "Mentorship",
          "Career Development",
          "Research",
          "Computer Science",
        ],
        impact: {
          studentsmentored: 8,
          researchPublications: 3,
          internshipsSecured: 6,
          satisfactionRating: 4.9,
        },
        materials: {
          handbook: "/mentorship/student_handbook.pdf",
          resources: "/mentorship/career_resources.json",
        },
      },
      {
        id: 6,
        title: "Tech for Good Hackathon",
        organization: "CodeForChange Foundation",
        type: ACTIVITY_TYPES.VOLUNTEER,
        role: "Technical Judge",
        status: ACTIVITY_STATUS.COMPLETED,
        year: 2023,
        date: "2023-11-18",
        location: "Chicago, IL",
        audience: 200,
        duration: "2 days",
        description:
          "Judged social impact projects at annual hackathon focused on solving community problems through technology innovation.",
        topics: [
          "Social Impact",
          "Hackathon",
          "Innovation",
          "Community",
          "Technology",
        ],
        impact: {
          teamsJudged: 25,
          winnersSelected: 3,
          fundingAwarded: 50000,
        },
        featured: true,
        materials: {
          criteria: "/judging/hackathon_criteria.pdf",
          winners: "/results/hackathon_2023_winners.pdf",
        },
      },
      {
        id: 7,
        title: "AI Ethics Panel Discussion",
        organization: "Ethics in Technology Conference",
        type: ACTIVITY_TYPES.SPEAKING,
        role: "Panelist",
        status: ACTIVITY_STATUS.COMPLETED,
        year: 2023,
        date: "2023-08-22",
        location: "Austin, TX",
        audience: 300,
        duration: "90 minutes",
        description:
          "Participated in panel discussion on responsible AI development, addressing bias, transparency, and accountability in AI systems.",
        topics: [
          "AI Ethics",
          "Responsible AI",
          "Bias",
          "Transparency",
          "Accountability",
        ],
        impact: {
          audienceEngagement: 89,
          mediaPickup: 5,
          policyInfluence: 2,
        },
        materials: {
          transcript: "/panels/ai_ethics_transcript.pdf",
          recording: "https://youtube.com/watch?v=example2",
        },
      },
      {
        id: 8,
        title: "Advanced Machine Learning Course",
        organization: "Professional Development Institute",
        type: ACTIVITY_TYPES.WORKSHOP,
        role: "Course Developer & Instructor",
        status: ACTIVITY_STATUS.COMPLETED,
        year: 2023,
        date: "2023-06-05",
        location: "Seattle, WA",
        audience: 45,
        duration: "5 days",
        description:
          "Intensive course covering advanced ML techniques including deep learning, reinforcement learning, and neural architecture search.",
        topics: [
          "Deep Learning",
          "Reinforcement Learning",
          "Neural Networks",
          "Advanced ML",
        ],
        impact: {
          students: 45,
          completionRate: 92,
          satisfactionScore: 4.7,
          certificationsPassed: 41,
        },
        materials: {
          curriculum: "/courses/ml_healthcare_curriculum.pdf",
          exercises: "/courses/ml_healthcare_labs.zip",
          certificates: "/certificates/ml_healthcare_template.pdf",
        },
      },
    ]);
  }, []);

  // CRUD Functions
  const handleAdd = () => {
    setEditingActivity(null);
    setFormData({
      title: "",
      organization: "",
      type: "",
      role: "",
      status: ACTIVITY_STATUS.PLANNED,
      year: new Date().getFullYear(),
      date: "",
      location: "",
      audience: 0,
      duration: "",
      description: "",
      topics: [],
      featured: false,
      impact: {},
      materials: {},
    });
    setOpenDialog(true);
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setFormData({ ...activity });
    setOpenDialog(true);
  };

  const handleDelete = (activity) => {
    setActivityToDelete(activity);
    setDeleteConfirmDialog(true);
  };

  const confirmDelete = () => {
    setActivities((prev) =>
      prev.filter((act) => act.id !== activityToDelete.id)
    );
    setDeleteConfirmDialog(false);
    setActivityToDelete(null);
    setSnackbar({
      open: true,
      message: "Activity deleted successfully",
      severity: "success",
    });
  };

  const handleSave = () => {
    if (!formData.title || !formData.organization || !formData.type) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields",
        severity: "error",
      });
      return;
    }

    if (editingActivity) {
      // Update existing activity
      setActivities((prev) =>
        prev.map((act) =>
          act.id === editingActivity.id ? { ...formData } : act
        )
      );
      setSnackbar({
        open: true,
        message: "Activity updated successfully",
        severity: "success",
      });
    } else {
      // Add new activity
      const newActivity = {
        ...formData,
        id: Date.now(),
      };
      setActivities((prev) => [...prev, newActivity]);
      setSnackbar({
        open: true,
        message: "Activity added successfully",
        severity: "success",
      });
    }

    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingActivity(null);
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Activity type options
  const activityTypeOptions = [
    { value: ACTIVITY_TYPES.SPEAKING, label: "Speaking" },
    { value: ACTIVITY_TYPES.WORKSHOP, label: "Workshop" },
    { value: ACTIVITY_TYPES.COMMUNITY, label: "Community" },
    { value: ACTIVITY_TYPES.SERVICE, label: "Service" },
    { value: ACTIVITY_TYPES.MENTORSHIP, label: "Mentorship" },
    { value: ACTIVITY_TYPES.VOLUNTEER, label: "Volunteer" },
  ];

  // Status options
  const statusOptions = [
    ACTIVITY_STATUS.PLANNED,
    ACTIVITY_STATUS.ONGOING,
    ACTIVITY_STATUS.COMPLETED,
    ACTIVITY_STATUS.CANCELLED,
  ];

  // Topics options for autocomplete
  const availableTopics = [
    "Machine Learning",
    "Healthcare",
    "Ethics",
    "Clinical AI",
    "Bias Mitigation",
    "Python",
    "Data Science",
    "Pandas",
    "Scikit-learn",
    "Open Source",
    "Git",
    "GitHub",
    "Community",
    "Mentorship",
    "Peer Review",
    "Academic Publishing",
    "AI Research",
    "Editorial",
    "Career Development",
    "Research",
    "Computer Science",
    "Social Impact",
    "Hackathon",
    "Innovation",
    "Technology",
    "AI Ethics",
    "Responsible AI",
    "Bias",
    "Transparency",
    "Accountability",
    "Deep Learning",
    "Reinforcement Learning",
    "Neural Networks",
    "Advanced ML",
  ];

  // Get unique filter options
  const uniqueTypes = useMemo(() => {
    return [...new Set(activities.map((activity) => activity.type))].sort();
  }, [activities]);

  const uniqueStatuses = useMemo(() => {
    return [...new Set(activities.map((activity) => activity.status))].sort();
  }, [activities]);

  const uniqueYears = useMemo(() => {
    return [...new Set(activities.map((activity) => activity.year))].sort(
      (a, b) => b - a
    );
  }, [activities]);

  // Filter activities
  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch =
        searchTerm === "" ||
        activity.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.organization
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        activity.description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        activity.topics?.some((topic) =>
          topic.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesType =
        typeFilter === FILTER_ALL_VALUE || activity.type === typeFilter;
      const matchesStatus =
        statusFilter === FILTER_ALL_VALUE || activity.status === statusFilter;
      const matchesYear =
        yearFilter === FILTER_ALL_VALUE ||
        activity.year.toString() === yearFilter;

      return matchesSearch && matchesType && matchesStatus && matchesYear;
    });
  }, [activities, searchTerm, typeFilter, statusFilter, yearFilter]);

  // Calculate comprehensive statistics
  const statistics = useMemo(() => {
    const speakingEvents = activities.filter(
      (activity) => activity.type === ACTIVITY_TYPES.SPEAKING
    ).length;
    const workshops = activities.filter(
      (activity) => activity.type === ACTIVITY_TYPES.WORKSHOP
    ).length;
    const communityActivities = activities.filter((activity) =>
      [ACTIVITY_TYPES.COMMUNITY, ACTIVITY_TYPES.VOLUNTEER].includes(
        activity.type
      )
    ).length;

    return {
      totalActivities: activities.length,
      speakingEvents,
      workshops,
      communityActivities,
    };
  }, [activities]);

  // Helper functions
  const formatNumber = useCallback((value) => {
    return typeof value === "number" ? value.toLocaleString() : value;
  }, []);

  const getTypeIcon = useCallback((type) => {
    const icons = {
      speaking: <Event />,
      workshop: <School />,
      community: <Group />,
      service: <Business />,
      mentorship: <People />,
      volunteer: <VolunteerActivism />,
    };
    return icons[type] || <Event />;
  }, []);

  const getTypeColor = useCallback((type) => {
    return TYPE_COLORS[type] || TYPE_COLORS.speaking;
  }, []);

  const getStatusColor = useCallback((status) => {
    return STATUS_COLORS[status] || STATUS_COLORS.Completed;
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
    setYearFilter(FILTER_ALL_VALUE);
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
          Activities & Engagement
        </Typography>
        <Button
          onClick={handleAdd}
          sx={{
            background: "#66BB6A",
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
              backgroundColor: "#81C784",
            },
          }}
        >
          <Add fontSize="small" />
          Add Activity
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
            label: "Total Activities",
            value: statistics.totalActivities,
            icon: <Timeline />,
            color: "#66BB6A",
          },
          {
            label: "Speaking Events",
            value: statistics.speakingEvents,
            icon: <Event />,
            color: "#2196F3",
          },
          {
            label: "Workshops",
            value: statistics.workshops,
            icon: <School />,
            color: "#FF9800",
          },
          {
            label: "Community",
            value: statistics.communityActivities,
            icon: <VolunteerActivism />,
            color: "#4CAF50",
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
                Filter Activities
              </Typography>
            </Stack>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {filteredActivities.length} of {activities.length}
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            {/* Search */}
            <TextField
              placeholder="Search activities, organizations, or topics..."
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

            {/* Type Filter */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#66BB6A" },
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
                    borderColor: "#66BB6A",
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
                  "&.Mui-focused": { color: "#66BB6A" },
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
                    borderColor: "#66BB6A",
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

            {/* Year Filter */}
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#66BB6A" },
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
                    borderColor: "#66BB6A",
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

      {/* Activities List */}
      {filteredActivities.length === 0 ? (
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
            No Activities Found
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 14,
              maxWidth: 400,
              lineHeight: 1.6,
            }}
          >
            Try adjusting your search terms or filters to find the activities
            you're looking for.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={3}>
          {filteredActivities.map((activity) => (
            <Box
              key={activity.id}
              sx={{
                p: 3,
                borderRadius: 4,
                background: `linear-gradient(135deg, ${getTypeColor(
                  activity.type
                )}12 0%, ${getTypeColor(activity.type)}06 100%)`,
                border: `1px solid ${getTypeColor(activity.type)}30`,
                position: "relative",
                transition: "all 160ms ease",
                "&:hover": {
                  borderColor: `${getTypeColor(activity.type)}60`,
                  transform: "translateY(-2px)",
                  boxShadow: `0 8px 32px ${getTypeColor(activity.type)}20`,
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
                        backgroundColor: `${getTypeColor(activity.type)}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: getTypeColor(activity.type),
                        mt: 0.5,
                      }}
                    >
                      {getTypeIcon(activity.type)}
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
                        {activity.title}
                        {activity.featured && (
                          <EmojiEvents
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
                        {activity.organization} •{" "}
                        {activity.role || activity.type}
                      </Typography>

                      {/* Activity Info */}
                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        alignItems="center"
                      >
                        <Chip
                          label={
                            activity.type.charAt(0).toUpperCase() +
                            activity.type.slice(1)
                          }
                          size="small"
                          sx={{
                            backgroundColor: `${getTypeColor(activity.type)}20`,
                            color: getTypeColor(activity.type),
                            fontWeight: 600,
                            fontSize: 12,
                            border: `1px solid ${getTypeColor(
                              activity.type
                            )}40`,
                          }}
                        />
                        <Chip
                          label={activity.status}
                          size="small"
                          sx={{
                            backgroundColor: `${getStatusColor(
                              activity.status
                            )}20`,
                            color: getStatusColor(activity.status),
                            fontWeight: 600,
                            fontSize: 12,
                            border: `1px solid ${getStatusColor(
                              activity.status
                            )}40`,
                          }}
                        />
                        <Chip
                          label={activity.year}
                          size="small"
                          sx={{
                            backgroundColor: "#2196F3",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: 12,
                          }}
                        />
                        {activity.audience && (
                          <Chip
                            startIcon={<People fontSize="small" />}
                            label={`${formatNumber(
                              activity.audience
                            )} attendees`}
                            size="small"
                            sx={{
                              backgroundColor: "#FF9800",
                              color: "#fff",
                              fontWeight: 600,
                              fontSize: 12,
                            }}
                          />
                        )}
                        {activity.location && (
                          <Chip
                            startIcon={<LocationOn fontSize="small" />}
                            label={activity.location}
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
                        handleEdit(activity);
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
                        handleDelete(activity);
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
                {activity.description && (
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: 14,
                      lineHeight: 1.6,
                    }}
                  >
                    {activity.description}
                  </Typography>
                )}

                {/* Date & Duration */}
                <Stack direction="row" spacing={3} flexWrap="wrap">
                  {activity.date && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarToday sx={{ color: "#4CAF50", fontSize: 16 }} />
                      <Typography
                        sx={{
                          color: "#4CAF50",
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        {formatDate(activity.date)}
                      </Typography>
                    </Box>
                  )}
                  {activity.duration && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Timeline sx={{ color: "#2196F3", fontSize: 16 }} />
                      <Typography
                        sx={{
                          color: "#2196F3",
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        {activity.duration}
                      </Typography>
                    </Box>
                  )}
                </Stack>

                {/* Impact Metrics */}
                {activity.impact && Object.keys(activity.impact).length > 0 && (
                  <Stack direction="row" spacing={3} flexWrap="wrap">
                    {Object.entries(activity.impact).map(([key, value]) => (
                      <Box
                        key={`${activity.id}-${key}`}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Insights sx={{ color: "#FF9800", fontSize: 16 }} />
                        <Typography
                          sx={{
                            color: "#FF9800",
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

                {/* Topics */}
                {activity.topics && activity.topics.length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {activity.topics.map((topic) => (
                      <Chip
                        key={`${activity.id}-${topic}`}
                        label={topic}
                        size="small"
                        sx={{
                          backgroundColor: `${getTypeColor(activity.type)}25`,
                          color: `${getTypeColor(activity.type)}FF`,
                          fontWeight: 600,
                          fontSize: 11,
                          "&:hover": {
                            backgroundColor: `${getTypeColor(activity.type)}40`,
                          },
                        }}
                      />
                    ))}
                  </Stack>
                )}

                {/* Materials & Links */}
                {activity.materials &&
                  Object.keys(activity.materials).length > 0 && (
                    <Stack direction="row" spacing={2} flexWrap="wrap">
                      {Object.entries(activity.materials).map(([type, url]) => (
                        <Button
                          key={`${activity.id}-${type}`}
                          variant="outlined"
                          size="small"
                          startIcon={<Launch />}
                          href={url}
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
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Button>
                      ))}
                    </Stack>
                  )}
              </Stack>
            </Box>
          ))}
        </Stack>
      )}

      {/* Add/Edit Activity Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#1E1E1E",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
              {editingActivity ? "Edit Activity" : "Add New Activity"}
            </Typography>
            <IconButton onClick={handleCloseDialog} sx={{ color: "#fff" }}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            {/* Activity Title */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Activity Title *"
                value={formData.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#66BB6A" },
                }}
              />
            </Grid>

            {/* Organization and Role */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Organization *"
                value={formData.organization}
                onChange={(e) =>
                  handleFormChange("organization", e.target.value)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#66BB6A" },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Role"
                value={formData.role}
                onChange={(e) => handleFormChange("role", e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#66BB6A" },
                }}
              />
            </Grid>

            {/* Activity Type and Status */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&.Mui-focused": { color: "#66BB6A" },
                  }}
                >
                  Activity Type *
                </InputLabel>
                <Select
                  value={formData.type}
                  onChange={(e) => handleFormChange("type", e.target.value)}
                  label="Activity Type *"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
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
                  }}
                >
                  {activityTypeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&.Mui-focused": { color: "#66BB6A" },
                  }}
                >
                  Status
                </InputLabel>
                <Select
                  value={formData.status}
                  onChange={(e) => handleFormChange("status", e.target.value)}
                  label="Status"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
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
                  }}
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Date and Year */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                value={formData.date}
                onChange={(e) => handleFormChange("date", e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#66BB6A" },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Year"
                value={formData.year}
                onChange={(e) =>
                  handleFormChange(
                    "year",
                    parseInt(e.target.value) || new Date().getFullYear()
                  )
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#66BB6A" },
                }}
              />
            </Grid>

            {/* Location and Duration */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={(e) => handleFormChange("location", e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#66BB6A" },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Duration"
                value={formData.duration}
                onChange={(e) => handleFormChange("duration", e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#66BB6A" },
                }}
              />
            </Grid>

            {/* Audience Size */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Audience Size"
                value={formData.audience}
                onChange={(e) =>
                  handleFormChange("audience", parseInt(e.target.value) || 0)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#66BB6A" },
                }}
              />
            </Grid>

            {/* Featured Toggle */}
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.featured}
                    onChange={(e) =>
                      handleFormChange("featured", e.target.checked)
                    }
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#66BB6A",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        { backgroundColor: "#66BB6A" },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: "rgba(255,255,255,0.7)", ml: 1 }}>
                    Featured Activity
                  </Typography>
                }
                sx={{ mt: 2 }}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                value={formData.description}
                onChange={(e) =>
                  handleFormChange("description", e.target.value)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#66BB6A" },
                }}
              />
            </Grid>

            {/* Topics */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={availableTopics}
                value={formData.topics}
                onChange={(event, newValue) => {
                  handleFormChange("topics", newValue);
                }}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      key={index}
                      sx={{
                        backgroundColor: "rgba(102,187,106,0.2)",
                        color: "#66BB6A",
                        borderColor: "rgba(102,187,106,0.4)",
                        "& .MuiChip-deleteIcon": { color: "#66BB6A" },
                      }}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Topics"
                    placeholder="Add topics..."
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255,255,255,0.05)",
                        color: "#fff",
                        "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.25)",
                        },
                        "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#66BB6A" },
                    }}
                  />
                )}
                sx={{
                  "& .MuiAutocomplete-popupIndicator": {
                    color: "rgba(255,255,255,0.7)",
                  },
                  "& .MuiAutocomplete-clearIndicator": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: "rgba(255,255,255,0.7)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            startIcon={<Save />}
            variant="contained"
            sx={{
              backgroundColor: "rgba(102,187,106,0.2)",
              color: "#66BB6A",
              "&:hover": { backgroundColor: "rgba(102,187,106,0.3)" },
              px: 3,
            }}
          >
            {editingActivity ? "Update Activity" : "Add Activity"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmDialog}
        onClose={() => setDeleteConfirmDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#1E1E1E",
            border: "1px solid rgba(244,67,54,0.3)",
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ color: "#fff", pb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Delete sx={{ color: "#f44336" }} />
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
              Delete Activity
            </Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 2 }}>
            Are you sure you want to delete this activity? This action cannot be
            undone.
          </Typography>
          {activityToDelete && (
            <Box
              sx={{
                p: 2,
                backgroundColor: "rgba(244,67,54,0.1)",
                borderRadius: 1,
              }}
            >
              <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                {activityToDelete.title}
              </Typography>
              <Typography
                sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}
              >
                {activityToDelete.organization}
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setDeleteConfirmDialog(false)}
            sx={{
              color: "rgba(255,255,255,0.7)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            startIcon={<Delete />}
            variant="contained"
            sx={{
              backgroundColor: "rgba(244,67,54,0.2)",
              color: "#f44336",
              "&:hover": { backgroundColor: "rgba(244,67,54,0.3)" },
              px: 3,
            }}
          >
            Delete Activity
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            backgroundColor:
              snackbar.severity === "success"
                ? "rgba(76, 175, 80, 0.9)"
                : "rgba(244, 67, 54, 0.9)",
            color: "#fff",
            "& .MuiAlert-icon": { color: "#fff" },
            "& .MuiIconButton-root": { color: "#fff" },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Activities;
