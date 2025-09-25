import React, { useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Chip, Stack, Typography } from "@mui/material";
import {
  School,
  MenuBook,
  WorkspacePremium,
  Science,
  UploadFile,
  Group,
} from "@mui/icons-material";
import ResourcePageTemplate from "../../components/dashboard/ResourcePageTemplate";

const Education = () => {
  const outlet = useOutletContext?.() || {};
  const { dashboardData, handleEdit, handleDelete, handleSave } = outlet;

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

  const buildRenderer = useCallback(
    (sectionId) => (items, handlers) =>
      (
        <Stack spacing={2.5}>
          {items.map((item) => (
            <Box
              key={item.id}
              onClick={() => handlers.onEdit?.(sectionId, item)}
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
      ),
    []
  );

  const stats = useMemo(
    () => [
      {
        label: "Degrees earned",
        value: education.degrees.length,
        icon: <School fontSize="small" />,
      },
      {
        label: "Research projects",
        value: education.research.length,
        icon: <Science fontSize="small" />,
      },
      {
        label: "Certifications",
        value: education.certifications.length,
        icon: <WorkspacePremium fontSize="small" />,
      },
      {
        label: "Teaching cohorts",
        value: education.teaching.length,
        icon: <Group fontSize="small" />,
      },
    ],
    [education]
  );

  const quickActions = useMemo(
    () => [
      {
        label: "Record new degree",
        description:
          "Capture institution details, GPA, and highlights in one step.",
        icon: <School />,
        onClick: () =>
          handleEdit?.("education", { section: "degrees", mode: "create" }),
        ctaLabel: "Add degree",
      },
      {
        label: "Log research milestone",
        description:
          "Track publications, grants, and supervisory collaborations.",
        icon: <MenuBook />,
        onClick: () =>
          handleEdit?.("education", { section: "research", mode: "create" }),
        ctaLabel: "Add research",
      },
      {
        label: "Export academic CV",
        description: "Generate a polished PDF summary of academic credentials.",
        icon: <UploadFile />,
        onClick: () => handleSave?.("education-export", {}),
        ctaLabel: "Generate",
      },
    ],
    [handleEdit, handleSave]
  );

  const onAdd = (sectionId) =>
    handleEdit?.("education", { section: sectionId, mode: "create" });
  const onEdit = (sectionId, payload) =>
    handleEdit?.("education", {
      section: sectionId,
      mode: "edit",
      item: payload,
    });
  const onDelete = (sectionId, payload) =>
    handleDelete?.("education", { section: sectionId, item: payload });

  const sections = useMemo(
    () => [
      {
        id: "degrees",
        title: "Formal Education",
        caption: "Degrees, diplomas, and academic credentials.",
        items: education.degrees,
        fullWidth: true,
        renderItem: buildRenderer("degrees"),
      },
      {
        id: "research",
        title: "Research Portfolio",
        caption: "Thesis work, grants, and scholarly output.",
        items: education.research,
        renderItem: buildRenderer("research"),
      },
      {
        id: "certifications",
        title: "Certifications & Training",
        caption: "Professional upskilling and specialized programs.",
        items: education.certifications,
        renderItem: buildRenderer("certifications"),
      },
      {
        id: "projects",
        title: "Academic Projects",
        caption: "Capstones, labs, and real-world experimentation.",
        items: education.projects,
        renderItem: buildRenderer("projects"),
      },
      {
        id: "teaching",
        title: "Teaching & Mentorship",
        caption: "Courses facilitated and mentoring impact.",
        items: education.teaching,
        renderItem: buildRenderer("teaching"),
      },
      {
        id: "skills",
        title: "Academic Skill Stack",
        caption: "Capabilities sharpened through academic journey.",
        showCount: false,
        items: education.skills,
        renderItem: (items, handlers) => (
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {items.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onClick={() => handlers.onEdit?.("skills", skill)}
                sx={{
                  backgroundColor: "rgba(156,39,176,0.18)",
                  color: "#CE93D8",
                  fontWeight: 600,
                }}
              />
            ))}
          </Stack>
        ),
      },
      {
        id: "achievements",
        title: "Academic Achievements",
        caption: "Scholarships, distinctions, and competitive wins.",
        showCount: false,
        items: education.achievements.map((entry, index) => ({
          id: `achievement-${index}`,
          title: entry,
        })),
        renderItem: (items, handlers) => (
          <Stack spacing={1.2}>
            {items.map((entry) => (
              <Box
                key={entry.id}
                onClick={() => handlers.onEdit?.("achievements", entry)}
                sx={{
                  p: 2.1,
                  borderRadius: 3,
                  background: "rgba(255,213,79,0.12)",
                  border: "1px solid rgba(255,213,79,0.26)",
                  color: "#FFE082",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                • {entry.title}
              </Box>
            ))}
          </Stack>
        ),
      },
    ],
    [education, buildRenderer]
  );

  return (
    <ResourcePageTemplate
      header={{
        title: "Academic Profile",
        subtitle:
          "Showcase academic rigor, research depth, and lifelong learning artifacts in a single control center.",
        chips: [
          {
            label: "Academia",
            color: "rgba(129,199,132,0.18)",
            textColor: "#A5D6A7",
          },
          {
            label: "Updated",
            color: "rgba(144,202,249,0.16)",
            textColor: "#90CAF9",
          },
        ],
        buttons: [
          {
            label: "Add credential",
            icon: <WorkspacePremium fontSize="small" />,
            background: "#66BB6A",
            hoverBackground: "#81C784",
            onClick: () =>
              handleEdit?.("education", {
                section: "certifications",
                mode: "create",
              }),
          },
          {
            label: "New achievement",
            variant: "outlined",
            onClick: () =>
              handleEdit?.("education", {
                section: "achievements",
                mode: "create",
              }),
          },
        ],
        showSettingsButton: true,
      }}
      stats={stats}
      quickActions={quickActions}
      sections={sections}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default Education;
