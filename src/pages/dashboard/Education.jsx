import React, { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Chip,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { School, Edit, Delete, Close, Save } from "@mui/icons-material";

const Education = () => {
  const outlet = useOutletContext?.() || {};
  const { dashboardData } = outlet;

  // Local state for CRUD operations
  const [degrees, setDegrees] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // add, edit, delete
  const [selectedDegree, setSelectedDegree] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    affiliatedWith: "",
    location: "",
    startYear: "",
    endYear: "",
    gpa: "",
    maxGpa: "4.00",
    level: "",
    status: "Completed",
    description: "",
    honors: [],
    relevantCourses: [],
  });

  // Initialize degrees from dashboard data
  React.useEffect(() => {
    if (dashboardData?.education?.degrees) {
      setDegrees(dashboardData.education.degrees);
    } else {
      // Set default demo data if no data exists
      setDegrees([
        {
          id: "bsc-niter",
          degree: "B.Sc. in Computer Science & Engineering",
          title: "B.Sc. in Computer Science & Engineering",
          institution: "National Institute of Textile Engineering & Research",
          affiliatedWith: "University of Dhaka",
          certificateIssuedBy: "University of Dhaka",
          location: "Savar, Dhaka",
          startYear: "2018",
          endYear: "2022",
          gpa: "3.75",
          maxGpa: "4.00",
          level: "Bachelor",
          status: "Completed",
          description:
            "Focused on software engineering, algorithms, and applied machine learning with thesis work in healthcare analytics. Studied at NITER with certificate issued by University of Dhaka as part of the affiliated institution program.",
          honors: ["Dean's List", "Merit Scholarship"],
          relevantCourses: [
            "Data Structures & Algorithms",
            "Machine Learning",
            "Database Systems",
            "Software Engineering",
          ],
        },
        {
          id: "msc-du",
          degree: "M.Sc. in Computer Science",
          title: "M.Sc. in Computer Science",
          institution: "University of Dhaka",
          location: "Dhaka, Bangladesh",
          startYear: "2023",
          endYear: "Present",
          gpa: "3.85",
          maxGpa: "4.00",
          level: "Master",
          status: "In progress",
          description:
            "Specializing in bioinformatics and responsible AI with emphasis on translational healthcare research.",
          honors: ["Research Fellowship"],
          relevantCourses: ["Advanced ML", "Bioinformatics", "Data Mining"],
        },
      ]);
    }
  }, [dashboardData]);

  // CRUD handlers - Simple like Skills
  const handleOpenAddDialog = () => {
    setDialogMode("add");
    setSelectedDegree(null);
    setFormData({
      degree: "",
      institution: "",
      affiliatedWith: "",
      location: "",
      startYear: "",
      endYear: "",
      gpa: "",
      maxGpa: "4.00",
      level: "",
      status: "Completed",
      description: "",
      honors: [],
      relevantCourses: [],
    });
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (degree) => {
    setDialogMode("edit");
    setSelectedDegree(degree);
    setFormData({
      degree: degree.degree || degree.title || "",
      institution: degree.institution || "",
      affiliatedWith: degree.affiliatedWith || degree.certificateIssuedBy || "",
      location: degree.location || "",
      startYear: degree.startYear || "",
      endYear: degree.endYear || "",
      gpa: degree.gpa || "",
      maxGpa: degree.maxGpa || "4.00",
      level: degree.level || "",
      status: degree.status || "Completed",
      description: degree.description || "",
      honors: Array.isArray(degree.honors) ? degree.honors : [],
      relevantCourses: Array.isArray(degree.relevantCourses)
        ? degree.relevantCourses
        : [],
    });
    setDialogOpen(true);
  };

  const handleOpenDeleteDialog = (degree) => {
    setDialogMode("delete");
    setSelectedDegree(degree);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedDegree(null);
  };

  // Simple save function like Skills
  const handleSave = () => {
    // Validate required fields
    if (!formData.degree.trim() || !formData.institution.trim()) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields (Degree and Institution).",
        severity: "error",
      });
      return;
    }

    const degreeData = {
      degree: formData.degree.trim(),
      title: formData.degree.trim(),
      institution: formData.institution.trim(),
      affiliatedWith: formData.affiliatedWith?.trim() || "",
      certificateIssuedBy: formData.affiliatedWith?.trim() || "",
      location: formData.location?.trim() || "",
      startYear: formData.startYear?.trim() || "",
      endYear: formData.endYear?.trim() || "",
      gpa: formData.gpa?.trim() || "",
      maxGpa: formData.maxGpa || "4.00",
      level: formData.level || "",
      status: formData.status || "Completed",
      description: formData.description?.trim() || "",
      honors: Array.isArray(formData.honors)
        ? formData.honors.filter(Boolean)
        : [],
      relevantCourses: Array.isArray(formData.relevantCourses)
        ? formData.relevantCourses.filter(Boolean)
        : [],
    };

    if (dialogMode === "edit") {
      // Update existing degree - match by id or degree name
      setDegrees((prev) =>
        prev.map((degree) => {
          const degreeId = degree.id || degree.degree;
          const selectedId = selectedDegree.id || selectedDegree.degree;
          return degreeId === selectedId
            ? { ...degree, ...degreeData }
            : degree;
        })
      );
      setSnackbar({
        open: true,
        message: "Degree updated successfully!",
        severity: "success",
      });
    } else {
      // Add new degree
      const newDegree = {
        ...degreeData,
        id: `degree-${Date.now()}`,
      };
      setDegrees((prev) => [newDegree, ...prev]);
      setSnackbar({
        open: true,
        message: "Degree added successfully!",
        severity: "success",
      });
    }

    handleCloseDialog();
  };

  const handleDeleteDegree = () => {
    if (selectedDegree?.id) {
      setDegrees((prev) =>
        prev.filter((degree) => degree.id !== selectedDegree.id)
      );
      setSnackbar({
        open: true,
        message: "Degree deleted successfully!",
        severity: "success",
      });
    }
    handleCloseDialog();
  };

  const education = useMemo(() => {
    const source = dashboardData?.education ?? {};

    const mapDegrees = (collection = []) =>
      collection.map((degree) => ({
        id: degree.id ?? degree.degree,
        title: degree.degree ?? degree.title,
        subtitle:
          degree.affiliatedWith || degree.certificateIssuedBy
            ? `${degree.institution}, affiliated with ${
                degree.affiliatedWith || degree.certificateIssuedBy
              }`
            : degree.institution,
        description: degree.description ?? "",
        status: degree.status,
        tags: degree.relevantCourses ?? [],
        badges: degree.honors ?? [],
        meta: [
          degree.level ? { label: degree.level, emphasis: true } : null,
          degree.location ? { label: degree.location } : null,
          degree.startYear
            ? { 
                label: `${degree.startYear} – ${
                  degree.endYear && degree.endYear.trim() 
                    ? degree.endYear 
                    : "Present"
                }` 
              }
            : null,
          degree.gpa && degree.maxGpa
            ? { label: `GPA ${degree.gpa}/${degree.maxGpa}` }
            : null,
        ].filter(Boolean),
        originalData: degree, // Preserve original data for editing
      }));
    const mapResearch = (collection = []) =>
      collection.map((research) => ({
        id: research.id ?? research.title,
        title: research.title,
        subtitle: `${research.type ?? "Research"} • ${
          research.institution ?? ""
        }`,
        description: research.description ?? "",
        tags: research.technologies ?? [],
        metrics: research.outcomes ?? [],
        meta: [
          research.supervisor
            ? { label: `Supervisor: ${research.supervisor}` }
            : null,
          research.duration ? { label: research.duration } : null,
        ].filter(Boolean),
      }));

    const mapCertifications = (collection = []) =>
      collection.map((cert) => ({
        id: cert.id ?? cert.name,
        title: cert.name,
        subtitle: cert.provider,
        description: cert.description ?? "",
        tags: cert.skills ?? [],
        meta: [
          cert.date ? { label: `Completed: ${cert.date}` } : null,
          cert.credentialId
            ? { label: `Credential: ${cert.credentialId}` }
            : null,
        ].filter(Boolean),
      }));

    const mapProjects = (collection = []) =>
      collection.map((project) => ({
        id: project.id ?? project.name,
        title: project.name,
        subtitle: [project.course, project.year].filter(Boolean).join(" • "),
        description: project.description ?? "",
        tags: project.technologies ?? [],
        metrics: project.role ? [`Role: ${project.role}`] : [],
        meta: [
          project.teamSize ? { label: `Team size: ${project.teamSize}` } : null,
        ].filter(Boolean),
      }));

    const mapTeaching = (collection = []) =>
      collection.map((teaching) => ({
        id: teaching.id ?? teaching.role,
        title: teaching.role,
        subtitle: `${teaching.course} • ${teaching.institution}`,
        description: teaching.description ?? "",
        tags: teaching.responsibilities ?? [],
        meta: [
          teaching.period ? { label: teaching.period } : null,
          teaching.students ? { label: `${teaching.students} students` } : null,
        ].filter(Boolean),
      }));

    return {
      degrees: mapDegrees(degrees),
      achievements: source.achievements ?? [
        "Graduated summa cum laude in undergraduate cohort.",
        "Best thesis award for machine learning in healthcare.",
        "National programming contest champion 2021.",
      ],
      skills: source.academicSkills ?? [
        "Research methodology",
        "Academic writing",
        "Statistical modeling",
        "Grant preparation",
        "Conference speaking",
        "Curriculum design",
      ],
      research: mapResearch(
        source.researchExperience ?? [
          {
            id: "thesis-ml-healthcare",
            title: "Machine Learning for Early Disease Detection",
            type: "Undergraduate Thesis",
            institution: "NITER",
            supervisor: "Dr. Md. Abdul Rahman",
            duration: "Jan 2022 – Dec 2022",
            description:
              "Built predictive models leveraging clinical data streams, achieving 94% accuracy across multi-class outcomes.",
            technologies: ["Python", "TensorFlow", "Pandas", "Scikit-learn"],
            outcomes: ["Published with IEEE", "Adopted by partnering clinic"],
          },
        ]
      ),
      certifications: mapCertifications(
        source.certifications ?? [
          {
            id: "cert-ml-specialization",
            name: "Machine Learning Specialization",
            provider: "Stanford University / Coursera",
            date: "2021",
            credentialId: "ABC123XYZ",
            skills: ["Supervised ML", "Unsupervised ML", "Model Deployment"],
          },
          {
            id: "cert-aws-architect",
            name: "AWS Certified Solutions Architect – Associate",
            provider: "Amazon Web Services",
            date: "2023",
            skills: ["Cloud architecture", "Distributed systems", "Security"],
          },
        ]
      ),
      projects: mapProjects(
        source.academicProjects ?? [
          {
            id: "proj-hospital",
            name: "Intelligent Hospital Operations Suite",
            course: "Software Engineering",
            year: "2021",
            description:
              "Designed a multi-tenant hospital workflow platform spanning intake, scheduling, and analytics.",
            technologies: ["React", "Django", "PostgreSQL"],
            teamSize: 4,
            role: "Product & Backend Lead",
          },
        ]
      ),
      teaching: mapTeaching(
        source.teachingExperience ?? [
          {
            id: "ta-programming",
            role: "Teaching Assistant",
            course: "Introduction to Programming",
            institution: "NITER",
            period: "Sep 2021 – Dec 2021",
            students: 60,
            responsibilities: [
              "Lab facilitation",
              "Assignment review",
              "Mentoring",
            ],
          },
        ]
      ),
    };
  }, [dashboardData, degrees]);

  return (
    <Stack spacing={4} sx={{ pb: 6, pt: 3 }}>
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
          Formal Education
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
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#81C784";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#66BB6A";
          }}
        >
          <School fontSize="small" />
          Add degree
        </button>
      </Stack>

      {/* Individual Degree Cards */}
      <Stack spacing={2.5}>
        {education.degrees.map((item, index) => {
          const rawDegree = degrees[index]; // Get the raw degree data
          return (
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
                    <Typography
                      sx={{ color: "#fff", fontWeight: 600, fontSize: 16 }}
                    >
                      {item.title}
                    </Typography>
                    {item.subtitle && (
                      <Typography
                        sx={{ color: "rgba(255,255,255,0.62)", fontSize: 13 }}
                      >
                        {item.subtitle.includes("affiliated with") ? (
                          <>
                            {item.subtitle.split("affiliated with")[0]}
                            <span
                              style={{
                                color: "#66BB6A",
                                fontWeight: 600,
                                background: "rgba(102,187,106,0.15)",
                                padding: "2px 6px",
                                borderRadius: "4px",
                                marginLeft: "4px",
                                marginRight: "4px",
                              }}
                            >
                              affiliated with
                            </span>
                            <span style={{ color: "#81C784", fontWeight: 500 }}>
                              {item.subtitle.split("affiliated with")[1]}
                            </span>
                          </>
                        ) : (
                          item.subtitle
                        )}
                      </Typography>
                    )}
                  </Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {item.status && (
                      <Chip
                        label={item.status}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(129,199,132,0.18)",
                          color: "#A5D6A7",
                          fontWeight: 600,
                        }}
                      />
                    )}
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEditDialog(
                          rawDegree || item.originalData || item
                        );
                      }}
                      sx={{
                        color: "#66BB6A",
                        opacity: 0.7,
                        "&:hover": {
                          opacity: 1,
                          bgcolor: "rgba(102,187,106,0.1)",
                        },
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDeleteDialog(
                          rawDegree || item.originalData || item
                        );
                      }}
                      sx={{
                        color: "#f44336",
                        opacity: 0.7,
                        "&:hover": {
                          opacity: 1,
                          bgcolor: "rgba(244,67,54,0.1)",
                        },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>

                {item.meta?.length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {item.meta.map((meta, index) => (
                      <Chip
                        key={`${item.id}-meta-${index}`}
                        label={meta.label}
                        size="small"
                        sx={{
                          backgroundColor: meta.emphasis
                            ? "rgba(255,213,79,0.2)"
                            : "rgba(255,255,255,0.08)",
                          color: meta.emphasis
                            ? "#FFE082"
                            : "rgba(255,255,255,0.72)",
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Stack>
                )}

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

                {item.badges?.length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {item.badges.map((badge) => (
                      <Chip
                        key={`${item.id}-badge-${badge}`}
                        label={badge}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(255,193,7,0.2)",
                          color: "#FFC107",
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Stack>
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
                        sx={{ color: "rgba(255,255,255,0.65)", fontSize: 13.5 }}
                      >
                        • {metric}
                      </Typography>
                    ))}
                  </Stack>
                )}
              </Stack>
            </Box>
          );
        })}
      </Stack>

      {/* Add/Edit Dialog */}
      <Dialog
        open={dialogOpen && (dialogMode === "add" || dialogMode === "edit")}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#1e1e1e",
            color: "#fff",
            maxHeight: "90vh",
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
            <School sx={{ color: "#A5D6A7" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {dialogMode === "add" ? "Add New Degree" : "Edit Degree"}
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ pb: 3, px: 3 }}>
          {/* Basic Information Section */}
          <Box sx={{ mb: 3, mt: 2 }}>
            <Typography
              variant="h6"
              sx={{
                color: "#66BB6A",
                mb: 2,
                mt: 2,
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              Basic Information
            </Typography>
            <Grid container spacing={3}>
              {/* Row 1: Degree (2/3) + Level (1/3) */}
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Degree *"
                  value={formData.degree}
                  onChange={(e) =>
                    setFormData({ ...formData, degree: e.target.value })
                  }
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Level
                  </InputLabel>
                  <Select
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({ ...formData, level: e.target.value })
                    }
                    sx={{
                      color: "#fff",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#66BB6A",
                      },
                    }}
                  >
                    <MenuItem value="Bachelor">Bachelor</MenuItem>
                    <MenuItem value="Master">Master</MenuItem>
                    <MenuItem value="PhD">PhD</MenuItem>
                    <MenuItem value="Associate">Associate</MenuItem>
                    <MenuItem value="Certificate">Certificate</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Row 2: Institution + Affiliated With */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Institution *"
                  value={formData.institution}
                  onChange={(e) =>
                    setFormData({ ...formData, institution: e.target.value })
                  }
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Affiliated With (Optional)"
                  value={formData.affiliatedWith}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      affiliatedWith: e.target.value,
                    })
                  }
                  placeholder="e.g., University of Dhaka"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>

              {/* Row 3: Location + GPA + Max GPA */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="GPA"
                  value={formData.gpa}
                  onChange={(e) =>
                    setFormData({ ...formData, gpa: e.target.value })
                  }
                  type="number"
                  inputProps={{ step: "0.01", min: "0", max: "4" }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Max GPA"
                  value={formData.maxGpa}
                  onChange={(e) =>
                    setFormData({ ...formData, maxGpa: e.target.value })
                  }
                  type="number"
                  inputProps={{ step: "0.01", min: "0", max: "5" }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>

              {/* Row 4: Start Year + End Year + Status */}
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Start Year"
                  value={formData.startYear}
                  onChange={(e) =>
                    setFormData({ ...formData, startYear: e.target.value })
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="End Year"
                  value={formData.endYear}
                  onChange={(e) =>
                    setFormData({ ...formData, endYear: e.target.value })
                  }
                  placeholder="Leave empty for 'Present'"
                  helperText="Leave empty to show 'Present'"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                    "& .MuiFormHelperText-root": {
                      color: "rgba(255,255,255,0.6)",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Status
                  </InputLabel>
                  <Select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    sx={{
                      color: "#fff",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#66BB6A",
                      },
                    }}
                  >
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="In progress">In progress</MenuItem>
                    <MenuItem value="Deferred">Deferred</MenuItem>
                    <MenuItem value="Transferred">Transferred</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Row 5: Description (Full width) */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Academic Achievements Section */}
          <Box sx={{ mb: 0 }}>
            <Typography
              variant="h6"
              sx={{
                color: "#66BB6A",
                mb: 2,
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              Academic Achievements
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  multiple
                  freeSolo
                  options={[]}
                  value={formData.honors || []}
                  onChange={(event, newValue) => {
                    setFormData((prev) => ({ ...prev, honors: newValue }));
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(255, 193, 7, 0.1)",
                          borderColor: "#FFD54F",
                          color: "#FFD54F",
                        }}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Honors & Awards"
                      placeholder="Dean's List, Merit Scholarship..."
                      helperText="Press Enter to add honors and awards"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                        "& .MuiFormHelperText-root": {
                          color: "rgba(255,255,255,0.6)",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  multiple
                  freeSolo
                  options={[]}
                  value={formData.relevantCourses || []}
                  onChange={(event, newValue) => {
                    setFormData((prev) => ({
                      ...prev,
                      relevantCourses: newValue,
                    }));
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(33, 150, 243, 0.1)",
                          borderColor: "#90CAF9",
                          color: "#90CAF9",
                        }}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Relevant Courses"
                      placeholder="Data Structures, Machine Learning..."
                      helperText="Press Enter to add relevant courses"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                        "& .MuiFormHelperText-root": {
                          color: "rgba(255,255,255,0.6)",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
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
            disabled={!formData.degree || !formData.institution}
            startIcon={<Save />}
            sx={{
              backgroundColor: "#A5D6A7",
              color: "#1a1a1a",
              "&:hover": { backgroundColor: "#81C784" },
              "&:disabled": { backgroundColor: "rgba(165, 214, 167, 0.3)" },
            }}
          >
            {dialogMode === "add" ? "Add Degree" : "Update Degree"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={dialogOpen && dialogMode === "delete"}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            bgcolor: "#1e1e1e",
            color: "#fff",
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ color: "#f44336" }}>
            Delete Degree
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{selectedDegree?.title || selectedDegree?.degree}</strong>{" "}
            from{" "}
            <strong>
              {selectedDegree?.subtitle || selectedDegree?.institution}
            </strong>
            ?
          </Typography>
          <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.7)" }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{ color: "rgba(255,255,255,0.7)" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteDegree}
            variant="contained"
            sx={{
              bgcolor: "#f44336",
              "&:hover": { bgcolor: "#d32f2f" },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Education;
