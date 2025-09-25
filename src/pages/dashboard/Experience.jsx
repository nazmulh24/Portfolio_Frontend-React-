import React, { useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Chip, Stack, Typography } from "@mui/material";
import {
  Work,
  School,
  VolunteerActivism,
  TrendingUp,
  NoteAdd,
  IntegrationInstructions,
  Insights,
} from "@mui/icons-material";
import ResourcePageTemplate from "../../components/dashboard/ResourcePageTemplate";

const Experience = () => {
  const outlet = useOutletContext?.() || {};
  const { dashboardData, handleEdit, handleDelete, handleSave } = outlet;

  const experience = useMemo(() => {
    const source = dashboardData?.experience ?? {};

    const mapRoles = (collection = []) =>
      collection.map((role) => ({
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
        status: role.status ?? role.employmentType ?? role.duration ?? "",
      }));

    return {
      professional: mapRoles(
        source.professionalExperience ?? [
          {
            id: "exp-techvision",
            jobTitle: "Senior Full Stack Developer",
            company: "TechVision Solutions",
            location: "Dhaka, Bangladesh",
            startDate: "Jan 2023",
            endDate: "Present",
            status: "Current",
            description:
              "Leading cross-functional squads delivering data-centric platforms used by 10k+ users across healthcare and finance verticals.",
            technologies: ["Django", "React", "AWS", "PostgreSQL"],
            achievements: [
              "Reduced platform latency by 38% through service decomposition.",
              "Shipped 12 major releases with zero regression incidents.",
            ],
          },
          {
            id: "exp-innovate",
            jobTitle: "Software Engineer",
            company: "InnovateTech Labs",
            location: "Remote",
            startDate: "Jun 2021",
            endDate: "Dec 2022",
            status: "Completed",
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
            id: "res-ml-health",
            jobTitle: "Research Associate",
            company: "University of Dhaka",
            startDate: "Jan 2023",
            endDate: "Present",
            description:
              "Investigating predictive modeling for early-stage chronic disease detection using multimodal clinical data.",
            responsibilities: [
              "Architected reproducible ML pipelines with TensorFlow and MLflow.",
              "Co-authored publications targeting IEEE health informatics venues.",
            ],
            technologies: ["TensorFlow", "Pandas", "MLflow"],
            achievements: [
              "Secured 150k BDT research grant for longitudinal study.",
            ],
          },
        ]
      ),
      teaching: mapRoles(
        source.teachingExperience ?? [
          {
            id: "teach-metropolitan",
            jobTitle: "Adjunct Lecturer",
            company: "Metropolitan University",
            startDate: "Sep 2023",
            endDate: "Present",
            description:
              "Delivering modern web engineering curriculum focused on production-grade patterns and developer experience.",
            courses: ["Full Stack Engineering", "Data Structures"],
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
            id: "freelance-upwork",
            jobTitle: "Freelance Lead Engineer",
            company: "Global Clients",
            startDate: "Aug 2021",
            endDate: "Present",
            description:
              "Partnering with founders to launch revenue-ready SaaS products, from architecture to growth analytics.",
            serviceTypes: [
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
            id: "volunteer-code",
            jobTitle: "Technical Mentor",
            company: "Code for Bangladesh",
            startDate: "Jun 2022",
            endDate: "Present",
            description:
              "Mentoring emerging engineers and delivering community workshops focused on inclusive technology initiatives.",
            activities: [
              "Hackathon coaching",
              "STEM outreach",
              "Curriculum design",
            ],
            impact: [
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
  }, [dashboardData]);

  const buildDetailRenderer = useCallback(
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
                        sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}
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
        label: "Core roles",
        value: experience.professional.length,
        icon: <Work fontSize="small" />,
      },
      {
        label: "Academic & research",
        value: experience.research.length + experience.teaching.length,
        icon: <School fontSize="small" />,
      },
      {
        label: "Consulting gigs",
        value: experience.freelance.length,
        icon: <TrendingUp fontSize="small" />,
      },
      {
        label: "Impact initiatives",
        value: experience.volunteer.length,
        icon: <VolunteerActivism fontSize="small" />,
      },
    ],
    [experience]
  );

  const quickActions = useMemo(
    () => [
      {
        label: "Add full-time role",
        description:
          "Document a new corporate or startup engagement with highlights.",
        icon: <NoteAdd />,
        onClick: () =>
          handleEdit?.("experience", {
            section: "professional",
            mode: "create",
          }),
        ctaLabel: "Add role",
      },
      {
        label: "Log freelance win",
        description:
          "Capture billable engagements to track revenue and testimonials.",
        icon: <IntegrationInstructions />,
        onClick: () =>
          handleEdit?.("experience", { section: "freelance", mode: "create" }),
        ctaLabel: "Record gig",
      },
      {
        label: "Export CV snapshot",
        description:
          "Generate a polished export for resumes or tenure reports.",
        icon: <Insights />,
        onClick: () => handleSave?.("experience-export", {}),
        ctaLabel: "Generate",
      },
    ],
    [handleEdit, handleSave]
  );

  const onAdd = (sectionId) =>
    handleEdit?.("experience", { section: sectionId, mode: "create" });
  const onEdit = (sectionId, payload) =>
    handleEdit?.("experience", {
      section: sectionId,
      mode: "edit",
      item: payload,
    });
  const onDelete = (sectionId, payload) =>
    handleDelete?.("experience", { section: sectionId, item: payload });

  const sections = useMemo(
    () => [
      {
        id: "professional",
        title: "Professional Roles",
        caption:
          "Leadership across startups, enterprises, and mission-driven teams.",
        items: experience.professional,
        fullWidth: true,
        renderItem: buildDetailRenderer("professional"),
      },
      {
        id: "research",
        title: "Research Contributions",
        caption: "Grant-backed investigations and scholarly output.",
        items: experience.research,
        renderItem: buildDetailRenderer("research"),
      },
      {
        id: "teaching",
        title: "Teaching & Mentorship",
        caption: "Academic appointments and community knowledge sharing.",
        items: experience.teaching,
        renderItem: buildDetailRenderer("teaching"),
      },
      {
        id: "freelance",
        title: "Consulting & Freelance",
        caption: "High-impact client engagements and advisory work.",
        items: experience.freelance,
        renderItem: buildDetailRenderer("freelance"),
      },
      {
        id: "volunteer",
        title: "Volunteer & Social Impact",
        caption: "Grassroots initiatives, advocacy, and civic tech projects.",
        items: experience.volunteer,
        renderItem: buildDetailRenderer("volunteer"),
      },
      {
        id: "skills",
        title: "Professional Skill Stack",
        caption: "Competencies strengthened through the journey.",
        showCount: false,
        items: experience.skills,
        renderItem: (items, handlers) => (
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {items.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onClick={() => handlers.onEdit?.("skills", skill)}
                sx={{
                  backgroundColor: "rgba(63,81,181,0.18)",
                  color: "#9FA8DA",
                  fontWeight: 600,
                }}
              />
            ))}
          </Stack>
        ),
      },
      {
        id: "highlights",
        title: "Career Highlights",
        caption: "Momentous wins, press mentions, and accolades.",
        showCount: false,
        items: experience.highlights.map((entry, index) => ({
          id: `highlight-${index}`,
          title: entry,
        })),
        renderItem: (items, handlers) => (
          <Stack spacing={1.2}>
            {items.map((entry) => (
              <Box
                key={entry.id}
                onClick={() => handlers.onEdit?.("highlights", entry)}
                sx={{
                  p: 2.1,
                  borderRadius: 3,
                  background: "rgba(255,213,79,0.12)",
                  border: "1px solid rgba(255,213,79,0.26)",
                  color: "#FFF59D",
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
    [experience, buildDetailRenderer]
  );

  return (
    <ResourcePageTemplate
      header={{
        title: "Experience & Leadership",
        subtitle:
          "Centralize every milestone from enterprise roles to community impact for a boardroom-ready profile.",
        chips: [
          {
            label: "Career",
            color: "rgba(129,199,132,0.18)",
            textColor: "#A5D6A7",
          },
          {
            label: "Live",
            color: "rgba(144,202,249,0.16)",
            textColor: "#90CAF9",
          },
        ],
        buttons: [
          {
            label: "New engagement",
            icon: <Work fontSize="small" />,
            background: "#66BB6A",
            hoverBackground: "#81C784",
            onClick: () =>
              handleEdit?.("experience", {
                section: "professional",
                mode: "create",
              }),
          },
          {
            label: "Add highlight",
            variant: "outlined",
            onClick: () =>
              handleEdit?.("experience", {
                section: "highlights",
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

export default Experience;
