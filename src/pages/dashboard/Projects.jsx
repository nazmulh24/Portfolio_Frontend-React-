import React, { useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Chip, Stack, Typography, Link as MuiLink } from "@mui/material";
import {
  FolderOpen,
  Star,
  Launch,
  GitHub,
  GetApp,
  Code,
  AddCircleOutline,
  CloudUpload,
  Timeline,
} from "@mui/icons-material";
import ResourcePageTemplate from "../../components/dashboard/ResourcePageTemplate";

const Projects = () => {
  const outlet = useOutletContext?.() || {};
  const { dashboardData, handleEdit, handleDelete, handleSave } = outlet;

  const projects = useMemo(() => {
    const source = dashboardData?.projects ?? {};

    const mapProject = (collection = []) =>
      collection.map((project) => ({
        id: project.id ?? project.title,
        title: project.title,
        subtitle:
          [project.category, project.status].filter(Boolean).join(" • ") ||
          undefined,
        description: project.description ?? "",
        status: project.status,
        tags: project.technologies ?? [],
        metrics: project.achievements ?? project.features ?? [],
        meta: [
          project.startDate && project.endDate
            ? { label: `${project.startDate} – ${project.endDate}` }
            : null,
          project.teamSize
            ? {
                label: `${project.teamSize} ${
                  project.teamSize === 1 ? "member" : "members"
                }`,
              }
            : null,
          project.role ? { label: project.role } : null,
        ].filter(Boolean),
        links: [
          project.links?.github
            ? {
                key: "github",
                label: "GitHub",
                href: project.links.github,
                icon: <GitHub fontSize="small" />,
              }
            : null,
          project.links?.live
            ? {
                key: "live",
                label: "Live Demo",
                href: project.links.live,
                icon: <Launch fontSize="small" />,
              }
            : null,
          project.links?.demo
            ? {
                key: "demo",
                label: "Demo",
                href: project.links.demo,
                icon: <Launch fontSize="small" />,
              }
            : null,
          project.links?.documentation
            ? {
                key: "docs",
                label: "Docs",
                href: project.links.documentation,
                icon: <GetApp fontSize="small" />,
              }
            : null,
          project.links?.paper
            ? {
                key: "paper",
                label: "Paper",
                href: project.links.paper,
                icon: <GetApp fontSize="small" />,
              }
            : null,
        ].filter(Boolean),
      }));

    return {
      featured: mapProject(
        source.featuredProjects ?? [
          {
            id: "proj-healthcare",
            title: "AI-enabled Healthcare Operations Platform",
            description:
              "Enterprise-grade suite orchestrating patient journeys, clinician workflows, and analytics dashboards across multisite clinic networks.",
            category: "Full-stack platform",
            status: "In production",
            startDate: "Jan 2023",
            endDate: "Present",
            teamSize: 4,
            role: "Principal Engineer",
            technologies: ["Django", "React", "PostgreSQL", "Redis", "AWS"],
            achievements: [
              "Reduced clinician onboarding time by 35% using dynamic templates.",
              "Processed 10k+ patient encounters with automated audit trails.",
            ],
            links: {
              github: "https://github.com/nazmulh24/healthcare-management",
              live: "https://healthcare-demo.nazmulhossain.dev",
              documentation: "https://docs.healthcare-demo.nazmulhossain.dev",
            },
          },
        ]
      ),
      personal: mapProject(
        source.personalProjects ?? [
          {
            id: "proj-portfolio",
            title: "Immersive Portfolio Experience",
            description:
              "3D-enhanced personal site with structured CMS, analytics, and rapid content workflows.",
            category: "Portfolio experience",
            status: "Live",
            startDate: "Aug 2023",
            endDate: "Sep 2023",
            technologies: ["React", "Three.js", "Django", "Framer Motion"],
            achievements: [
              "Achieved 95+ Lighthouse performance score.",
              "Integrated modular CMS powering all sections.",
            ],
            links: {
              github: "https://github.com/nazmulh24/portfolio-website",
              live: "https://nazmulhossain.dev",
            },
          },
        ]
      ),
      academic: mapProject(
        source.academicProjects ?? [
          {
            id: "proj-thesis",
            title: "Predictive Diagnostics Engine",
            description:
              "Undergraduate thesis delivering ML-powered early disease detection with explainable insights.",
            category: "Academic research",
            status: "Published",
            startDate: "Jan 2022",
            endDate: "Dec 2022",
            technologies: ["TensorFlow", "Pandas", "Scikit-learn"],
            achievements: [
              "94% classification accuracy across five conditions.",
              "Best Thesis Award — Engineering Faculty 2022.",
            ],
            links: {
              github: "https://github.com/nazmulh24/disease-prediction-ml",
              paper: "https://papers.nazmulhossain.dev/disease-prediction.pdf",
            },
          },
        ]
      ),
      openSource: mapProject(
        source.openSourceProjects ?? [
          {
            id: "proj-drf-utils",
            title: "DRF Velocity Toolkit",
            description:
              "Utility pack of serializers, filters, and CI-ready scaffolding for Django REST Framework teams.",
            category: "Open source library",
            status: "Active",
            technologies: ["Python", "Django REST", "PyPI"],
            achievements: [
              "2.5k monthly downloads with 6 external maintainers.",
              "Automated schema generation adopted by four partner teams.",
            ],
            links: {
              github: "https://github.com/nazmulh24/drf-utils",
              pypi: "https://pypi.org/project/drf-utils-nazmul/",
            },
          },
        ]
      ),
      categories: source.projectCategories ?? [
        "Healthcare platforms",
        "AI/ML systems",
        "Open source tooling",
        "Productivity suites",
        "Developer experience",
      ],
      technologies: source.technologiesUsed ?? [
        "Python",
        "Django",
        "React",
        "PostgreSQL",
        "Docker",
        "AWS",
        "TensorFlow",
        "TypeScript",
      ],
      stats: source.projectStats ?? {
        totalProjects: 15,
        completedProjects: 10,
        inProgressProjects: 5,
        githubStars: 120,
        totalDownloads: "5k+",
      },
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
                  borderColor: "rgba(129,199,132,0.4)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Stack spacing={1.75}>
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
                        backgroundColor: "rgba(129,199,132,0.2)",
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
                          backgroundColor: "rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.72)",
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

                {item.links?.length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {item.links.map((link) => (
                      <Chip
                        key={link.key}
                        icon={link.icon}
                        label={link.label}
                        component={MuiLink}
                        href={link.href}
                        target="_blank"
                        onClick={(event) => event.stopPropagation()}
                        clickable
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.1)",
                          color: "#E3F2FD",
                          fontWeight: 600,
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.16)",
                          },
                        }}
                      />
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
        label: "Projects shipped",
        value: projects.stats.totalProjects,
        icon: <FolderOpen fontSize="small" />,
      },
      {
        label: "In operation",
        value: projects.stats.completedProjects,
        icon: <Launch fontSize="small" />,
      },
      {
        label: "GitHub stars",
        value: projects.stats.githubStars,
        icon: <Star fontSize="small" />,
      },
      {
        label: "Total downloads",
        value: projects.stats.totalDownloads,
        icon: <GetApp fontSize="small" />,
      },
    ],
    [projects.stats]
  );

  const quickActions = useMemo(
    () => [
      {
        label: "New flagship build",
        description:
          "Capture repo links, timelines, and outcomes for a hero case study.",
        icon: <AddCircleOutline />,
        onClick: () =>
          handleEdit?.("projects", { section: "featured", mode: "create" }),
        ctaLabel: "Add project",
      },
      {
        label: "Log OSS release",
        description: "Track open-source momentum, contributors, and adoption.",
        icon: <Code />,
        onClick: () =>
          handleEdit?.("projects", { section: "openSource", mode: "create" }),
        ctaLabel: "Record release",
      },
      {
        label: "Export portfolio",
        description:
          "Generate a curated PDF or Notion export for investors and partners.",
        icon: <CloudUpload />,
        onClick: () => handleSave?.("projects-export", {}),
        ctaLabel: "Generate",
      },
    ],
    [handleEdit, handleSave]
  );

  const onAdd = (sectionId) =>
    handleEdit?.("projects", { section: sectionId, mode: "create" });
  const onEdit = (sectionId, payload) =>
    handleEdit?.("projects", {
      section: sectionId,
      mode: "edit",
      item: payload,
    });
  const onDelete = (sectionId, payload) =>
    handleDelete?.("projects", { section: sectionId, item: payload });

  const sections = useMemo(
    () => [
      {
        id: "featured",
        title: "Featured Builds",
        caption:
          "Flagship initiatives delivering measurable client and user impact.",
        items: projects.featured,
        fullWidth: true,
        renderItem: buildRenderer("featured"),
      },
      {
        id: "personal",
        title: "Product Experiments",
        caption: "Self-directed products validating ideas and workflows.",
        items: projects.personal,
        renderItem: buildRenderer("personal"),
      },
      {
        id: "academic",
        title: "Academic & Research",
        caption: "University collaborations and exploration projects.",
        items: projects.academic,
        renderItem: buildRenderer("academic"),
      },
      {
        id: "openSource",
        title: "Open Source",
        caption: "Community tooling, libraries, and shared knowledge assets.",
        items: projects.openSource,
        renderItem: buildRenderer("openSource"),
      },
      {
        id: "categories",
        title: "Portfolio Focus",
        caption: "Domains and verticals with repeated success.",
        showCount: false,
        items: projects.categories,
        renderItem: (items, handlers) => (
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {items.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => handlers.onEdit?.("categories", category)}
                sx={{
                  backgroundColor: "rgba(103,58,183,0.18)",
                  color: "#B39DDB",
                  fontWeight: 600,
                }}
              />
            ))}
          </Stack>
        ),
      },
      {
        id: "technologies",
        title: "Delivery Stack",
        caption: "Languages, frameworks, and tooling in active rotation.",
        showCount: false,
        items: projects.technologies,
        renderItem: (items, handlers) => (
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {items.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                onClick={() => handlers.onEdit?.("technologies", tech)}
                sx={{
                  backgroundColor: "rgba(0,150,136,0.18)",
                  color: "#80CBC4",
                  fontWeight: 600,
                }}
              />
            ))}
          </Stack>
        ),
      },
    ],
    [projects, buildRenderer]
  );

  return (
    <ResourcePageTemplate
      header={{
        title: "Product & Engineering Portfolio",
        subtitle:
          "Operate your innovation pipeline, track delivery metrics, and surface investor-ready case studies from one workspace.",
        chips: [
          {
            label: "Portfolio",
            color: "rgba(129,199,132,0.18)",
            textColor: "#A5D6A7",
          },
          {
            label: "Evergreen",
            color: "rgba(144,202,249,0.16)",
            textColor: "#90CAF9",
          },
        ],
        buttons: [
          {
            label: "Add spotlight",
            icon: <Star fontSize="small" />,
            background: "#66BB6A",
            hoverBackground: "#81C784",
            onClick: () =>
              handleEdit?.("projects", { section: "featured", mode: "create" }),
          },
          {
            label: "Sync timeline",
            variant: "outlined",
            onClick: () =>
              handleEdit?.("projects", { section: "timeline", mode: "sync" }),
            endIcon: <Timeline fontSize="small" />,
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

export default Projects;
