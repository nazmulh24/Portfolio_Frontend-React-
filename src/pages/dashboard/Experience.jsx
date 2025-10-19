import React, { useMemo, useState, useCallback } from "react";
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
  Tooltip,
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
} from "@mui/icons-material";

const Experience = () => {
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Comprehensive experience data
  const allExperience = useMemo(
    () => [
      {
        id: "exp-001",
        title: "Senior Full Stack Developer",
        company: "TechVision Solutions",
        location: "Dhaka, Bangladesh",
        startDate: "Jan 2023",
        endDate: "Present",
        type: "Full-time",
        status: "Current",
        description:
          "Leading cross-functional teams to deliver scalable web applications for healthcare and fintech clients. Architecting microservices solutions and implementing CI/CD pipelines for enterprise-grade systems.",
        technologies: [
          "React",
          "Node.js",
          "Django",
          "AWS",
          "Docker",
          "PostgreSQL",
          "Redis",
        ],
        achievements: [
          "Led development of 5+ enterprise applications serving 10K+ users",
          "Reduced system latency by 40% through performance optimizations",
          "Implemented automated testing reducing bugs by 60%",
          "Mentored 8 junior developers and interns",
        ],
        responsibilities: [
          "Technical leadership and architecture decisions",
          "Code review and quality assurance",
          "Client communication and requirement gathering",
          "Team mentorship and knowledge sharing",
        ],
      },
      {
        id: "exp-002",
        title: "Software Engineer",
        company: "InnovateTech Labs",
        location: "Remote",
        startDate: "Jun 2021",
        endDate: "Dec 2022",
        type: "Full-time",
        status: "Completed",
        description:
          "Developed and maintained analytics platforms for digital marketing campaigns. Built real-time dashboards and reporting tools using modern web technologies and cloud infrastructure.",
        technologies: [
          "Next.js",
          "GraphQL",
          "Python",
          "GCP",
          "MongoDB",
          "Apache Kafka",
        ],
        achievements: [
          "Built analytics system processing 1M+ daily events",
          "Improved data pipeline efficiency by 50%",
          "Developed 15+ reusable React components",
          "Achieved 99.9% system uptime",
        ],
        responsibilities: [
          "Full-stack development and API design",
          "Database optimization and query performance",
          "Real-time data processing and analytics",
          "Cross-team collaboration and integration",
        ],
      },
      {
        id: "exp-003",
        title: "Research Associate",
        company: "University of Dhaka",
        location: "Dhaka, Bangladesh",
        startDate: "Sep 2022",
        endDate: "Present",
        type: "Part-time",
        status: "Current",
        description:
          "Conducting research in machine learning applications for healthcare diagnostics. Developing predictive models and publishing findings in peer-reviewed journals.",
        technologies: [
          "Python",
          "TensorFlow",
          "PyTorch",
          "Pandas",
          "Jupyter",
          "MLflow",
          "Scikit-learn",
        ],
        achievements: [
          "Published 3 research papers in top-tier conferences",
          "Developed ML models with 95%+ accuracy",
          "Secured $50K research grant funding",
          "Presented at 5 international conferences",
        ],
        responsibilities: [
          "Research design and experiment planning",
          "Data collection and analysis",
          "Model development and validation",
          "Academic writing and publication",
        ],
      },
      {
        id: "exp-004",
        title: "Freelance Full Stack Developer",
        company: "Self-Employed",
        location: "Remote",
        startDate: "Jan 2020",
        endDate: "Present",
        type: "Contract",
        status: "Current",
        description:
          "Providing end-to-end web development services for startups and SMEs. Specializing in modern web technologies and delivering pixel-perfect, responsive applications.",
        technologies: [
          "React",
          "Vue.js",
          "Laravel",
          "Firebase",
          "Shopify",
          "WordPress",
        ],
        achievements: [
          "Completed 25+ successful projects",
          "Maintained 4.9/5 client satisfaction rating",
          "Generated $30K+ in annual revenue",
          "Built long-term partnerships with 8 clients",
        ],
        responsibilities: [
          "Client consultation and project planning",
          "Full-stack development and deployment",
          "Quality assurance and testing",
          "Client training and support",
        ],
      },
      {
        id: "exp-005",
        title: "Teaching Assistant",
        company: "Metropolitan University",
        location: "Dhaka, Bangladesh",
        startDate: "Feb 2023",
        endDate: "Jul 2023",
        type: "Part-time",
        status: "Completed",
        description:
          "Assisted in teaching web development and data structures courses. Conducted lab sessions, graded assignments, and provided one-on-one student mentoring.",
        technologies: [
          "JavaScript",
          "Python",
          "Java",
          "HTML/CSS",
          "Git",
          "MySQL",
        ],
        achievements: [
          "Taught 150+ students across multiple courses",
          "Achieved 4.8/5 teaching effectiveness rating",
          "Developed 10+ practical coding exercises",
          "Improved student pass rate by 25%",
        ],
        responsibilities: [
          "Course content development and delivery",
          "Student assessment and feedback",
          "Lab supervision and guidance",
          "Academic support and mentoring",
        ],
      },
      {
        id: "exp-006",
        title: "Technical Mentor",
        company: "Code for Bangladesh",
        location: "Dhaka, Bangladesh",
        startDate: "Mar 2022",
        endDate: "Present",
        type: "Volunteer",
        status: "Current",
        description:
          "Mentoring aspiring developers in programming fundamentals and career development. Organizing workshops and hackathons to promote tech education in the community.",
        technologies: [
          "Web Development",
          "Mobile App Development",
          "Open Source",
          "Career Guidance",
        ],
        achievements: [
          "Mentored 40+ aspiring developers",
          "Organized 8 successful workshops",
          "Led 3 community hackathons",
          "Helped 15+ mentees land internships",
        ],
        responsibilities: [
          "Individual and group mentoring sessions",
          "Workshop planning and execution",
          "Community outreach and engagement",
          "Career guidance and networking",
        ],
      },
    ],
    []
  );

  // Helper function to get unique values
  const getUniqueValues = useCallback(
    (key) => {
      return [...new Set(allExperience.map((exp) => exp[key]))].sort();
    },
    [allExperience]
  );

  const uniqueTypes = useMemo(() => getUniqueValues("type"), [getUniqueValues]);
  const uniqueStatuses = useMemo(
    () => getUniqueValues("status"),
    [getUniqueValues]
  );

  // Apply filters
  const filteredExperience = useMemo(() => {
    return allExperience.filter((experience) => {
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
  }, [allExperience, searchTerm, typeFilter, statusFilter]);

  // Statistics calculations
  const statistics = useMemo(() => {
    const totalExperience = allExperience.length;
    const currentRoles = allExperience.filter(
      (exp) => exp.status === "Current"
    ).length;
    const completedRoles = allExperience.filter(
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
  }, [allExperience]);

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
          sx={{
            backgroundColor: "rgba(129,199,132,0.2)",
            color: "#A5D6A7",
            "&:hover": { backgroundColor: "rgba(129,199,132,0.3)" },
            px: 3,
            py: 1,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Add Experience
        </Button>
      </Stack>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 2,
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
              {filteredExperience.length} of {allExperience.length}
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
              : "Start building your professional experience portfolio"}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredExperience.map((experience) => (
            <Grid item xs={12} key={experience.id}>
              <Card
                sx={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 2,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
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
                            {experience.startDate} - {experience.endDate}
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
                      <Tooltip title="Edit Experience" arrow>
                        <IconButton
                          size="small"
                          sx={{
                            color: "rgba(255,255,255,0.6)",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                              color: "#A5D6A7",
                              backgroundColor: "rgba(129, 199, 132, 0.15)",
                              border: "1px solid rgba(129, 199, 132, 0.3)",
                              transform: "scale(1.05)",
                            },
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      {/* Delete Button */}
                      <Tooltip title="Delete Experience" arrow>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log("Delete experience:", experience.id);
                          }}
                          sx={{
                            color: "rgba(255,255,255,0.5)",
                            "&:hover": {
                              color: "#f44336",
                              backgroundColor: "rgba(244,67,54,0.1)",
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
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
    </Box>
  );
};

export default Experience;
