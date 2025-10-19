import React, { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { School } from "@mui/icons-material";

const Education = () => {
  const outlet = useOutletContext?.() || {};
  const { dashboardData, handleEdit } = outlet;

  const education = useMemo(() => {
    const source = dashboardData?.education ?? {};

    const mapDegrees = (collection = []) =>
      collection.map((degree) => ({
        id: degree.id ?? degree.degree,
        title: degree.degree ?? degree.title,
        subtitle: degree.institution,
        description: degree.description ?? "",
        status: degree.status,
        tags: degree.relevantCourses ?? [],
        badges: degree.honors ?? [],
        meta: [
          degree.level ? { label: degree.level, emphasis: true } : null,
          degree.location ? { label: degree.location } : null,
          degree.startYear && degree.endYear
            ? { label: `${degree.startYear} – ${degree.endYear}` }
            : null,
          degree.gpa && degree.maxGpa
            ? { label: `GPA ${degree.gpa}/${degree.maxGpa}` }
            : null,
        ].filter(Boolean),
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
      degrees: mapDegrees(
        source.degrees ?? [
          {
            id: "bsc-niter",
            degree: "B.Sc. in Computer Science & Engineering",
            institution: "National Institute of Textile Engineering & Research",
            location: "Savar, Dhaka",
            startYear: "2018",
            endYear: "2022",
            gpa: "3.75",
            maxGpa: "4.00",
            level: "Bachelor",
            status: "Completed",
            description:
              "Focused on software engineering, algorithms, and applied machine learning with thesis work in healthcare analytics.",
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
        ]
      ),
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
  }, [dashboardData]);

  const onEdit = (sectionId, payload) =>
    handleEdit?.("education", {
      section: sectionId,
      mode: "edit",
      item: payload,
    });

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
          onClick={() =>
            handleEdit?.("education", {
              section: "degrees",
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
          <School fontSize="small" />
          Add degree
        </button>
      </Stack>

      {/* Individual Degree Cards */}
      <Stack spacing={2.5}>
        {education.degrees.map((item) => (
          <Box
            key={item.id}
            onClick={() => onEdit("degrees", item)}
            sx={{
              p: 2.75,
              borderRadius: 3,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              cursor: "pointer",
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
                <Box>
                  <Typography
                    sx={{ color: "#fff", fontWeight: 600, fontSize: 16 }}
                  >
                    {item.title}
                  </Typography>
                  {item.subtitle && (
                    <Typography
                      sx={{ color: "rgba(255,255,255,0.62)", fontSize: 13 }}
                    >
                      {item.subtitle}
                    </Typography>
                  )}
                </Box>
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
        ))}
      </Stack>
    </Stack>
  );
};

export default Education;
