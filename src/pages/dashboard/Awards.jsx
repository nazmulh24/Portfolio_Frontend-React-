import React, { useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Chip, Stack, Typography } from "@mui/material";
import {
  EmojiEvents,
  MilitaryTech,
  AttachMoney,
  WorkspacePremium,
  AddCircleOutline,
  CloudDownload,
  Star,
  Launch,
} from "@mui/icons-material";
import ResourcePageTemplate from "../../components/dashboard/ResourcePageTemplate";

const Awards = () => {
  const outlet = useOutletContext?.() || {};
  const { dashboardData, handleEdit, handleDelete, handleSave } = outlet;

  const formatNumber = useCallback(
    (value) => (typeof value === "number" ? value.toLocaleString() : value),
    []
  );

  const formatCurrency = useCallback(
    (value) =>
      typeof value === "number"
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(value)
        : value,
    []
  );

  const awards = useMemo(() => {
    const source = dashboardData?.awards ?? {};

    const fallbackAcademic = [
      {
        id: "icmi-best-paper",
        title: "Best Paper Award",
        organization: "International Conference on Medical Informatics (ICMI)",
        date: "2023-09-16",
        category: "Research Excellence",
        prestigeLevel: "International",
        description:
          'Recognized for the paper "Machine Learning Applications in Early Disease Detection" demonstrating significant diagnostic accuracy advances with interpretable AI models.',
        significance: "Selected from 200+ submissions across 40 countries",
        impactMetrics: { citations: 15, downloads: 1200, mediaFeatured: 3 },
        certificate: "/certificates/icmi_2023_best_paper.pdf",
        keywords: ["Machine Learning", "Healthcare", "Clinical AI"],
      },
      {
        id: "graduate-research",
        title: "Outstanding Graduate Research Award",
        organization: "Computer Science Department",
        date: "2022-05-15",
        category: "Academic Achievement",
        prestigeLevel: "University",
        description:
          "Honored for doctoral research innovations in scalable web architectures and machine learning deployment patterns.",
        significance: "Top 1% of graduating PhD students",
        impactMetrics: {
          researchProjects: 4,
          publications: 12,
          collaborations: 8,
        },
        monetaryValue: 5000,
        certificate: "/certificates/outstanding_graduate_research_2022.pdf",
        keywords: ["Web Architecture", "Machine Learning", "Doctoral"],
      },
    ];

    const fallbackProfessional = [
      {
        id: "django-outstanding",
        title: "Outstanding Contribution Award",
        organization: "Django Software Foundation",
        date: "2023-10-15",
        category: "Community Service",
        prestigeLevel: "International",
        description:
          "Celebrated for ecosystem leadership: performance fixes, documentation improvements, and mentorship across the Django project.",
        significance: "Annual award granted to top 10 contributors globally",
        impactMetrics: {
          pullRequests: 45,
          issuesResolved: 32,
          communitySupport: 200,
          packagesDownloads: 25000,
        },
        certificate: "/certificates/django_outstanding_contribution_2023.pdf",
        keywords: ["Open Source", "Django", "Mentorship"],
      },
      {
        id: "innovation-leadership",
        title: "Innovation Leadership Award",
        organization: "Technology Leadership Council",
        date: "2022-11-10",
        category: "Leadership",
        prestigeLevel: "Regional",
        description:
          "Recognized for driving engineering transformation, scaling teams, and unlocking measurable savings across client portfolios.",
        significance: "Top 5% of technology leaders regionally",
        impactMetrics: {
          teamsLed: 3,
          projectsDelivered: 8,
          costSavings: 150000,
        },
        monetaryValue: 3000,
        certificate: "/certificates/innovation_leadership_2022.pdf",
        keywords: ["Leadership", "Strategy", "Innovation"],
      },
    ];

    const fallbackCompetition = [
      {
        id: "healthcare-ai-challenge",
        title: "First Place • Healthcare AI Challenge",
        organization: "Global Healthcare Innovation Summit",
        date: "2023-03-25",
        category: "Competition",
        prestigeLevel: "International",
        description:
          "Delivered 95% accurate real-time clinical prediction engine that impressed judges for interpretability and reliability.",
        significance: "120 teams from 25 countries competed",
        impactMetrics: {
          accuracy: "95% accuracy",
          datasetSize: "100K+ samples",
          processingSpeed: "Real-time",
        },
        monetaryValue: 10000,
        certificate: "/certificates/healthcare_ai_challenge_2023.pdf",
        teamSize: 3,
        technologies: ["Python", "TensorFlow", "FHIR APIs", "Cloud"],
      },
      {
        id: "web-innovation-hackathon",
        title: "Second Place • Web Innovation Hackathon",
        organization: "Silicon Valley Tech Hub",
        date: "2022-08-14",
        category: "Competition",
        prestigeLevel: "Regional",
        description:
          "Built collaborative realtime suite with sub-50ms latency leveraging modern WebSocket infrastructure and resilient UX.",
        significance: "80+ teams evaluated by industry experts",
        impactMetrics: {
          demoUsers: "1,000 demo users",
          latency: "<50ms latency",
          features: "15 core capabilities",
        },
        monetaryValue: 5000,
        certificate: "/certificates/web_innovation_hackathon_2022.pdf",
        teamSize: 4,
        technologies: ["React", "Django", "WebSocket", "PostgreSQL"],
      },
    ];

    const fallbackRecognition = [
      {
        id: "community-champion",
        title: "Community Champion Award",
        organization: "Open Source Initiative",
        date: "2023-06-30",
        category: "Community Impact",
        prestigeLevel: "International",
        description:
          "Acknowledged for sustained mentorship, inclusive practices, and stewardship of widely-adopted open-source packages.",
        significance: "Recognizes top global community advocates each year",
        impactMetrics: { mentees: 25, packages: 8, communityGrowth: "40%" },
        certificate: "/certificates/community_champion_2023.pdf",
      },
      {
        id: "teaching-excellence",
        title: "Teaching Excellence Recognition",
        organization: "Education Excellence Foundation",
        date: "2022-12-05",
        category: "Education",
        prestigeLevel: "National",
        description:
          "Celebrated for innovative pedagogy, consistently high student satisfaction, and impactful learning outcomes.",
        significance: "Top 10% of instructors assessed nationwide",
        impactMetrics: {
          studentsImpacted: 500,
          courseRating: 4.9,
          completionRate: "92%",
        },
        monetaryValue: 1500,
        certificate: "/certificates/teaching_excellence_2022.pdf",
      },
    ];

    const fallbackStats = {
      totalAwards: 10,
      internationalAwards: 4,
      monetaryAwards: 6,
      totalMonetaryValue: 27000,
      nationalAwards: 3,
      regionalAwards: 2,
      categories: 8,
      organizationsRecognized: 10,
      yearsSpan: 4,
    };

    const fallbackCategories = [
      "Research Excellence",
      "Academic Achievement",
      "Community Service",
      "Technical Innovation",
      "Leadership",
      "Competition",
      "Community Impact",
      "Education",
      "Open Source",
      "Professional Development",
    ];

    return {
      academic: source.academicAwards ?? fallbackAcademic,
      professional: source.professionalAwards ?? fallbackProfessional,
      competition: source.competitionAwards ?? fallbackCompetition,
      recognition: source.recognitionAwards ?? fallbackRecognition,
      stats: source.awardStats ?? fallbackStats,
      categories: source.awardCategories ?? fallbackCategories,
    };
  }, [dashboardData]);

  const stats = useMemo(
    () => [
      {
        label: "Total awards",
        value: formatNumber(awards.stats.totalAwards),
        icon: <EmojiEvents fontSize="small" />,
      },
      {
        label: "International",
        value: formatNumber(awards.stats.internationalAwards),
        icon: <MilitaryTech fontSize="small" />,
      },
      {
        label: "Monetary wins",
        value: formatNumber(awards.stats.monetaryAwards),
        icon: <AttachMoney fontSize="small" />,
      },
      {
        label: "Funding secured",
        value: formatCurrency(awards.stats.totalMonetaryValue),
        icon: <WorkspacePremium fontSize="small" />,
      },
    ],
    [awards.stats, formatNumber, formatCurrency]
  );

  const quickActions = useMemo(
    () => [
      {
        label: "Log a new recognition",
        description:
          "Capture award details, certificates, and highlight metrics.",
        icon: <AddCircleOutline />,
        ctaLabel: "Add award",
        onClick: () =>
          handleEdit?.("awards", { section: "academic", mode: "create" }),
      },
      {
        label: "Nominate a collaborator",
        description: "Track peer recognition and send nomination briefs.",
        icon: <Star />,
        ctaLabel: "Nominate",
        onClick: () =>
          handleEdit?.("awards", { section: "professional", mode: "create" }),
      },
      {
        label: "Export awards dossier",
        description: "Generate a PDF summary for promotion or grant packets.",
        icon: <CloudDownload />,
        ctaLabel: "Download",
        onClick: () => handleSave?.("awards-export", {}),
      },
    ],
    [handleEdit, handleSave]
  );

  const createRenderer = useCallback(
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
                transition: "border-color 160ms ease, transform 160ms ease",
                cursor: "pointer",
                position: "relative",
                "&:hover": {
                  borderColor: "rgba(255,215,0,0.35)",
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
                  {item.badge && (
                    <Chip
                      label={item.badge}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(255,215,0,0.16)",
                        color: "#FFE082",
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

                {item.meta?.length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {item.meta.map((meta, index) => (
                      <Chip
                        key={`${item.id}-meta-${index}`}
                        label={meta.label}
                        size="small"
                        sx={{
                          backgroundColor:
                            meta.color ?? "rgba(255,255,255,0.08)",
                          color: meta.textColor ?? "rgba(255,255,255,0.72)",
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Stack>
                )}

                {item.metrics?.length > 0 && (
                  <Stack spacing={0.6}>
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

                {item.links?.length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {item.links.map((link) => (
                      <Chip
                        key={link.key}
                        icon={link.icon}
                        label={link.label}
                        onClick={(event) => {
                          event.stopPropagation();
                          if (link.onClick) {
                            link.onClick();
                          } else if (link.href) {
                            window.open(link.href, "_blank", "noopener");
                          }
                        }}
                        sx={{
                          backgroundColor:
                            link.color ?? "rgba(255,255,255,0.1)",
                          color: link.textColor ?? "#E3F2FD",
                          fontWeight: 600,
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.18)",
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

  const renderChipGroup = useCallback(
    (sectionId) => (items, handlers) =>
      (
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {items.map((value) => (
            <Chip
              key={value}
              label={value}
              onClick={() => handlers.onEdit?.(sectionId, value)}
              sx={{
                backgroundColor: "rgba(255,215,0,0.18)",
                color: "#FFE082",
                fontWeight: 600,
              }}
            />
          ))}
        </Stack>
      ),
    []
  );

  const transformAcademic = useMemo(
    () =>
      awards.academic.map((entry) => ({
        id: entry.id ?? entry.title,
        title: entry.title,
        subtitle: `${entry.organization}${
          entry.date ? ` • ${entry.date}` : ""
        }`,
        description: entry.description,
        badge: entry.category,
        meta: [
          entry.prestigeLevel
            ? {
                label: entry.prestigeLevel,
                color: "rgba(129,199,132,0.24)",
                textColor: "#C5E1A5",
              }
            : null,
          entry.significance
            ? {
                label: entry.significance,
                color: "rgba(255,213,79,0.18)",
                textColor: "#FFE082",
              }
            : null,
          entry.monetaryValue
            ? {
                label: formatCurrency(entry.monetaryValue),
                color: "rgba(76,175,80,0.22)",
                textColor: "#A5D6A7",
              }
            : null,
        ].filter(Boolean),
        metrics: [
          entry.impactMetrics?.citations
            ? `${formatNumber(entry.impactMetrics.citations)} citations`
            : null,
          entry.impactMetrics?.downloads
            ? `${formatNumber(entry.impactMetrics.downloads)} downloads`
            : null,
          entry.impactMetrics?.mediaFeatured
            ? `${formatNumber(
                entry.impactMetrics.mediaFeatured
              )} media mentions`
            : null,
        ].filter(Boolean),
        tags: entry.keywords,
        links: entry.certificate
          ? [
              {
                key: `${entry.id}-certificate`,
                label: "View certificate",
                href: entry.certificate,
                icon: <Launch fontSize="small" />,
              },
            ]
          : [],
      })),
    [awards.academic, formatCurrency, formatNumber]
  );

  const transformProfessional = useMemo(
    () =>
      awards.professional.map((entry) => ({
        id: entry.id ?? entry.title,
        title: entry.title,
        subtitle: `${entry.organization}${
          entry.date ? ` • ${entry.date}` : ""
        }`,
        description: entry.description,
        badge: entry.category,
        meta: [
          entry.prestigeLevel
            ? {
                label: entry.prestigeLevel,
                color: "rgba(149,117,205,0.22)",
                textColor: "#D1C4E9",
              }
            : null,
          entry.significance
            ? {
                label: entry.significance,
                color: "rgba(255,213,79,0.18)",
                textColor: "#FFE082",
              }
            : null,
          entry.monetaryValue
            ? {
                label: formatCurrency(entry.monetaryValue),
                color: "rgba(76,175,80,0.22)",
                textColor: "#A5D6A7",
              }
            : null,
        ].filter(Boolean),
        metrics: entry.impactMetrics
          ? Object.entries(entry.impactMetrics).map(
              ([key, value]) =>
                `${key
                  .replace(/([A-Z])/g, " $1")
                  .toLowerCase()}: ${formatNumber(value)}`
            )
          : [],
        tags: entry.keywords,
        links: entry.certificate
          ? [
              {
                key: `${entry.id}-certificate`,
                label: "Award letter",
                href: entry.certificate,
                icon: <Launch fontSize="small" />,
              },
            ]
          : [],
      })),
    [awards.professional, formatCurrency, formatNumber]
  );

  const transformCompetition = useMemo(
    () =>
      awards.competition.map((entry) => ({
        id: entry.id ?? entry.title,
        title: entry.title,
        subtitle: `${entry.organization}${
          entry.date ? ` • ${entry.date}` : ""
        }`,
        description: entry.description,
        badge: entry.category,
        meta: [
          entry.teamSize
            ? {
                label: `Team of ${formatNumber(entry.teamSize)}`,
                color: "rgba(255,152,0,0.22)",
                textColor: "#FFCC80",
              }
            : null,
          entry.prestigeLevel
            ? {
                label: entry.prestigeLevel,
                color: "rgba(244,143,177,0.18)",
                textColor: "#F48FB1",
              }
            : null,
          entry.monetaryValue
            ? {
                label: formatCurrency(entry.monetaryValue),
                color: "rgba(76,175,80,0.22)",
                textColor: "#A5D6A7",
              }
            : null,
        ].filter(Boolean),
        metrics: entry.impactMetrics
          ? Object.entries(entry.impactMetrics).map(
              ([key, value]) =>
                `${key
                  .replace(/([A-Z])/g, " $1")
                  .toLowerCase()}: ${formatNumber(value)}`
            )
          : [],
        tags: entry.technologies,
        links: entry.certificate
          ? [
              {
                key: `${entry.id}-certificate`,
                label: "Winner certificate",
                href: entry.certificate,
                icon: <Launch fontSize="small" />,
              },
            ]
          : [],
      })),
    [awards.competition, formatCurrency, formatNumber]
  );

  const transformRecognition = useMemo(
    () =>
      awards.recognition.map((entry) => ({
        id: entry.id ?? entry.title,
        title: entry.title,
        subtitle: `${entry.organization}${
          entry.date ? ` • ${entry.date}` : ""
        }`,
        description: entry.description,
        badge: entry.category,
        meta: [
          entry.prestigeLevel
            ? {
                label: entry.prestigeLevel,
                color: "rgba(129,212,250,0.18)",
                textColor: "#90CAF9",
              }
            : null,
          entry.significance
            ? {
                label: entry.significance,
                color: "rgba(255,213,79,0.18)",
                textColor: "#FFE082",
              }
            : null,
          entry.monetaryValue
            ? {
                label: formatCurrency(entry.monetaryValue),
                color: "rgba(76,175,80,0.22)",
                textColor: "#A5D6A7",
              }
            : null,
        ].filter(Boolean),
        metrics: entry.impactMetrics
          ? Object.entries(entry.impactMetrics).map(
              ([key, value]) =>
                `${key
                  .replace(/([A-Z])/g, " $1")
                  .toLowerCase()}: ${formatNumber(value)}`
            )
          : [],
        links: entry.certificate
          ? [
              {
                key: `${entry.id}-certificate`,
                label: "Recognition letter",
                href: entry.certificate,
                icon: <Launch fontSize="small" />,
              },
            ]
          : [],
      })),
    [awards.recognition, formatCurrency, formatNumber]
  );

  const onAdd = (sectionId) =>
    handleEdit?.("awards", { section: sectionId, mode: "create" });
  const onEdit = (sectionId, payload) =>
    handleEdit?.("awards", { section: sectionId, mode: "edit", item: payload });
  const onDelete = (sectionId, payload) =>
    handleDelete?.("awards", { section: sectionId, item: payload });

  const sections = useMemo(
    () => [
      {
        id: "academic",
        title: "Academic excellence",
        caption:
          "Scholarship, research breakthroughs, and prestigious academic honors.",
        fullWidth: true,
        items: transformAcademic,
        renderItem: createRenderer("academic"),
      },
      {
        id: "professional",
        title: "Professional honors",
        caption: "Industry accolades that highlight leadership and impact.",
        items: transformProfessional,
        renderItem: createRenderer("professional"),
      },
      {
        id: "competition",
        title: "Competition wins",
        caption:
          "Hackathons and judged competitions showcasing rapid innovation.",
        items: transformCompetition,
        renderItem: createRenderer("competition"),
      },
      {
        id: "recognition",
        title: "Community & teaching",
        caption: "Service-driven recognition and educational excellence.",
        items: transformRecognition,
        renderItem: createRenderer("recognition"),
      },
      {
        id: "categories",
        title: "Recognition themes",
        caption: "Explore award categories to balance future nominations.",
        showCount: false,
        items: awards.categories,
        renderItem: renderChipGroup("categories"),
      },
    ],
    [
      awards.categories,
      transformAcademic,
      transformProfessional,
      transformCompetition,
      transformRecognition,
      createRenderer,
      renderChipGroup,
    ]
  );

  return (
    <ResourcePageTemplate
      header={{
        title: "Awards & Recognition",
        subtitle:
          "Celebrate impact, evidence career momentum, and curate nomination-ready highlights in minutes.",
        chips: [
          {
            label: "Excellence",
            color: "rgba(255,215,0,0.16)",
            textColor: "#FFE082",
          },
          {
            label: "Momentum",
            color: "rgba(129,199,132,0.18)",
            textColor: "#C5E1A5",
          },
        ],
        buttons: [
          {
            label: "Record award",
            icon: <EmojiEvents fontSize="small" />,
            background: "#FBC02D",
            hoverBackground: "#FDD835",
            onClick: () =>
              handleEdit?.("awards", { section: "academic", mode: "create" }),
          },
          {
            label: "Manage badges",
            variant: "outlined",
            endIcon: <WorkspacePremium fontSize="small" />,
            onClick: () =>
              handleEdit?.("awards", {
                section: "professional",
                mode: "manage",
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

export default Awards;
