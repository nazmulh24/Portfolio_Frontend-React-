import React, { useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Chip, Stack, Typography } from "@mui/material";
import {
  Event,
  School,
  AddCircleOutline,
  CalendarMonth,
  VolunteerActivism,
  WorkspacePremium,
  Insights,
  Launch,
} from "@mui/icons-material";
import ResourcePageTemplate from "../../components/dashboard/ResourcePageTemplate";

const Activities = () => {
  const outlet = useOutletContext?.() || {};
  const { dashboardData, handleEdit, handleDelete, handleSave } = outlet;

  const formatNumber = useCallback(
    (value) => (typeof value === "number" ? value.toLocaleString() : value),
    []
  );

  const activities = useMemo(() => {
    const source = dashboardData?.activities ?? {};

    const fallbackConference = [
      {
        id: "icmi-keynote",
        title: "Future of AI in Healthcare",
        role: "Keynote Speaker",
        event: "International Conference on Medical Informatics (ICMI)",
        date: "2023-09-15",
        organization: "Medical Informatics Society",
        location: "Boston, USA",
        audience: "500+ attendees",
        topics: ["Artificial Intelligence", "Healthcare", "Machine Learning"],
        description:
          "Delivered keynote on transformative AI use-cases, ethical guardrails, and case studies from clinical deployments.",
        materials: {
          slides: "/presentations/icmi_2023_keynote.pdf",
          recording: "https://youtube.com/watch?v=example123",
        },
        impact: { citations: 3, mediaMentions: 2, followUps: 15 },
      },
      {
        id: "icse-chair",
        title: "Web Technologies Technical Track",
        role: "Session Chair",
        event: "IEEE International Conference on Software Engineering",
        date: "2023-05-20",
        organization: "IEEE Computer Society",
        location: "Virtual",
        audience: "200+ attendees",
        topics: ["Web Engineering", "Software Architecture", "Modern Tooling"],
        description:
          "Curated and facilitated panel discussions, moderated Q&A, and ensured high-quality discourse across 6 submissions.",
      },
    ];

    const fallbackWorkshops = [
      {
        id: "django-bootcamp",
        title: "Django for Beginners: Building Scalable Web Apps",
        format: "Workshop",
        organization: "Tech Education Institute",
        location: "San Francisco, USA",
        date: "2023-08-12",
        duration: "2 days",
        participants: 45,
        topics: ["Django", "REST APIs", "Deployment"],
        feedback: { rating: 4.8, reviews: 42, completion: 93 },
        description:
          "Hands-on workshop covering Django fundamentals, database modeling, performance profiling, and deployment pipelines.",
        resources: {
          curriculum: "/workshops/django_curriculum.pdf",
          exercises: "/workshops/django_exercises.zip",
        },
      },
      {
        id: "ml-healthcare-bootcamp",
        title: "Machine Learning Bootcamp for Healthcare",
        format: "Training Program",
        organization: "Healthcare Innovation Hub",
        location: "Remote",
        date: "2023-07-01",
        duration: "6 weeks",
        participants: 120,
        topics: ["Machine Learning", "Ethics", "Healthcare Analytics"],
        feedback: { rating: 4.9, reviews: 115, completion: 87 },
        description:
          "Structured curriculum guiding clinicians through data sourcing, model evaluation, and regulatory considerations.",
      },
    ];

    const fallbackCommunity = [
      {
        id: "drf-open-source",
        title: "Django REST Framework contributor",
        role: "Open-source maintainer",
        organization: "Django Software Foundation",
        startDate: "2022-01-15",
        endDate: "Present",
        commitment: "5-10 hrs/month",
        description:
          "Maintained performance patches, improved documentation, and mentored contributors working on API tooling.",
        contributions: {
          pullRequests: 23,
          issuesResolved: 18,
          docsPages: 12,
          communityMentions: 150,
        },
        impact: "Packages installed 10k+ times, enabled 500+ developers",
      },
      {
        id: "code-for-social-good",
        title: "Mentor - Code for Social Good",
        role: "Technical mentor",
        organization: "Code for Social Good Foundation",
        startDate: "2022-06-01",
        endDate: "2023-12-31",
        commitment: "3-5 hrs/week",
        description:
          "Guided community teams building inclusive civic-tech apps, delivering code reviews and career coaching.",
        contributions: {
          mentees: 12,
          projectsLaunched: 8,
          reviews: 45,
          guidanceSessions: 30,
        },
        impact: "Supported 3 app launches reaching 1k+ beneficiaries",
      },
    ];

    const fallbackService = [
      {
        id: "jwt-editorial",
        title: "Editorial Board Member",
        organization: "Journal of Web Technologies",
        startDate: "2023-01-01",
        endDate: "2025-12-31",
        commitment: "2-3 hrs/month",
        responsibilities: [
          "Manuscript review",
          "Author feedback",
          "Policy development",
          "Special issue coordination",
        ],
        metrics: {
          manuscriptsReviewed: 15,
          averageReviewDays: 14,
          accepted: 8,
        },
        description:
          "Provide strategic direction, uphold peer-review standards, and coach authors on elevating research rigor.",
        status: "Active",
      },
      {
        id: "icse-tpc",
        title: "Technical Program Committee",
        organization: "International Conference on Software Engineering",
        startDate: "2023-03-01",
        endDate: "2023-06-30",
        commitment: "10-15 hrs total",
        responsibilities: [
          "Paper review",
          "Author deliberations",
          "Program shaping",
        ],
        metrics: { papersReviewed: 12, avgScore: 6.8, acceptanceRate: "25%" },
        description:
          "Evaluated submissions, facilitated panel discussions, and curated outstanding content for attendees.",
        status: "Completed",
      },
    ];

    const fallbackAwards = [
      {
        id: "django-outstanding",
        title: "Outstanding Contribution Award",
        organization: "Django Software Foundation",
        date: "2023-10-15",
        category: "Community",
        description:
          "Recognized among top contributors driving ecosystem growth through code, mentorship, and tooling.",
        significance: "Awarded to top 10 contributors globally",
      },
      {
        id: "icmi-best-paper",
        title: "Best Paper Award",
        organization: "International Conference on Medical Informatics",
        date: "2023-09-16",
        category: "Research",
        description:
          "Honored for research advancing early detection of cardiovascular conditions using machine learning.",
        significance: "Selected from 200+ submissions",
      },
    ];

    const fallbackStats = {
      totalActivities: 10,
      speaking: 8,
      workshops: 6,
      communityHours: 240,
      reach: 2500,
      professionalService: 12,
      awards: 4,
    };

    const fallbackCategories = [
      "Speaking engagements",
      "Workshop instruction",
      "Community service",
      "Mentorship",
      "Editorial service",
      "Program committees",
      "Open source",
      "Volunteer work",
      "Professional recognition",
      "Training & education",
    ];

    return {
      conference: source.conferenceActivities ?? fallbackConference,
      workshops: source.workshopsTraining ?? fallbackWorkshops,
      community: source.communityActivities ?? fallbackCommunity,
      service: source.professionalService ?? fallbackService,
      awards: source.awards ?? fallbackAwards,
      stats: source.activityStats ?? fallbackStats,
      categories: source.activityCategories ?? fallbackCategories,
    };
  }, [dashboardData]);

  const stats = useMemo(
    () => [
      {
        label: "Total activities",
        value: formatNumber(activities.stats.totalActivities),
        icon: <Insights fontSize="small" />,
      },
      {
        label: "Speaking events",
        value: formatNumber(activities.stats.speaking),
        icon: <Event fontSize="small" />,
      },
      {
        label: "Workshops",
        value: formatNumber(activities.stats.workshops),
        icon: <School fontSize="small" />,
      },
      {
        label: "Community hours",
        value: formatNumber(activities.stats.communityHours),
        icon: <VolunteerActivism fontSize="small" />,
      },
    ],
    [activities.stats, formatNumber]
  );

  const quickActions = useMemo(
    () => [
      {
        label: "Log new activity",
        description: "Capture speaking detail, outcomes, and materials.",
        icon: <AddCircleOutline />,
        ctaLabel: "Add record",
        onClick: () =>
          handleEdit?.("activities", { section: "conference", mode: "create" }),
      },
      {
        label: "Plan workshop",
        description: "Schedule curriculum, roster, and post-event surveys.",
        icon: <School />,
        ctaLabel: "Create plan",
        onClick: () =>
          handleEdit?.("activities", { section: "workshops", mode: "create" }),
      },
      {
        label: "Sync calendar",
        description: "Pull accepted engagements from calendar sources.",
        icon: <CalendarMonth />,
        ctaLabel: "Sync",
        onClick: () => handleSave?.("activities-sync", {}),
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
                "&:hover": {
                  borderColor: "rgba(76,175,80,0.35)",
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
                  {item.badge && (
                    <Chip
                      label={item.badge}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(129,199,132,0.22)",
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

                {item.tags?.length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {item.tags.map((tag) => (
                      <Chip
                        key={`${item.id}-tag-${tag}`}
                        label={tag}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(3,169,244,0.18)",
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
                backgroundColor: "rgba(0,188,212,0.22)",
                color: "#4DD0E1",
                fontWeight: 600,
              }}
            />
          ))}
        </Stack>
      ),
    []
  );

  const transformConference = useMemo(
    () =>
      activities.conference.map((entry) => ({
        id: entry.id ?? entry.title,
        title: entry.title,
        subtitle: `${entry.event} • ${entry.organization}`,
        description: entry.description,
        badge: entry.role,
        meta: [
          entry.date
            ? {
                label: entry.date,
                color: "rgba(129,199,132,0.18)",
                textColor: "#A5D6A7",
              }
            : null,
          entry.location
            ? { label: entry.location, color: "rgba(163,177,198,0.14)" }
            : null,
          entry.audience ? { label: entry.audience } : null,
        ].filter(Boolean),
        metrics: [
          entry.impact?.citations
            ? `${formatNumber(entry.impact.citations)} citations`
            : null,
          entry.impact?.mediaMentions
            ? `${formatNumber(entry.impact.mediaMentions)} media mentions`
            : null,
          entry.impact?.followUps
            ? `${formatNumber(entry.impact.followUps)} follow-up meetings`
            : null,
        ].filter(Boolean),
        tags: entry.topics,
        links: [
          entry.materials?.slides
            ? {
                key: "slides",
                label: "Slides",
                href: entry.materials.slides,
                icon: <Launch fontSize="small" />,
                color: "rgba(255,213,79,0.16)",
                textColor: "#FFE082",
              }
            : null,
          entry.materials?.recording
            ? {
                key: "recording",
                label: "Recording",
                href: entry.materials.recording,
                icon: <Launch fontSize="small" />,
              }
            : null,
        ].filter(Boolean),
      })),
    [activities.conference, formatNumber]
  );

  const transformWorkshops = useMemo(
    () =>
      activities.workshops.map((entry) => ({
        id: entry.id ?? entry.title,
        title: entry.title,
        subtitle: `${entry.organization} • ${entry.date}`,
        description: entry.description,
        badge: entry.format,
        meta: [
          entry.location ? { label: entry.location } : null,
          entry.duration ? { label: entry.duration } : null,
          entry.participants
            ? {
                label: `${formatNumber(entry.participants)} participants`,
                color: "rgba(144,202,249,0.18)",
                textColor: "#90CAF9",
              }
            : null,
        ].filter(Boolean),
        metrics: [
          entry.feedback?.rating ? `Rating ${entry.feedback.rating}/5` : null,
          entry.feedback?.reviews
            ? `${formatNumber(entry.feedback.reviews)} reviews`
            : null,
          entry.feedback?.completion
            ? `${entry.feedback.completion}% completion`
            : null,
        ].filter(Boolean),
        tags: entry.topics,
        links: [
          entry.resources?.curriculum
            ? {
                key: "curriculum",
                label: "Curriculum",
                href: entry.resources.curriculum,
                icon: <Launch fontSize="small" />,
              }
            : null,
          entry.resources?.exercises
            ? {
                key: "exercises",
                label: "Exercises",
                href: entry.resources.exercises,
                icon: <Launch fontSize="small" />,
              }
            : null,
        ].filter(Boolean),
      })),
    [activities.workshops, formatNumber]
  );

  const transformCommunity = useMemo(
    () =>
      activities.community.map((entry) => ({
        id: entry.id ?? entry.title,
        title: entry.title,
        subtitle: `${entry.organization} • ${entry.startDate} – ${entry.endDate}`,
        description: entry.description,
        badge: entry.role,
        meta: [entry.commitment ? { label: entry.commitment } : null].filter(
          Boolean
        ),
        metrics: [
          entry.contributions?.pullRequests
            ? `${formatNumber(entry.contributions.pullRequests)} pull requests`
            : null,
          entry.contributions?.issuesResolved
            ? `${formatNumber(
                entry.contributions.issuesResolved
              )} issues resolved`
            : null,
          entry.contributions?.docsPages
            ? `${formatNumber(entry.contributions.docsPages)} docs pages`
            : null,
          entry.contributions?.communityMentions
            ? `${formatNumber(
                entry.contributions.communityMentions
              )} community assists`
            : null,
          entry.contributions?.mentees
            ? `${formatNumber(entry.contributions.mentees)} mentees`
            : null,
          entry.contributions?.projectsLaunched
            ? `${formatNumber(
                entry.contributions.projectsLaunched
              )} projects launched`
            : null,
        ].filter(Boolean),
        tags: entry.tags,
        links: [],
        impact: entry.impact,
      })),
    [activities.community, formatNumber]
  );

  const transformService = useMemo(
    () =>
      activities.service.map((entry) => ({
        id: entry.id ?? entry.title,
        title: entry.title,
        subtitle: `${entry.organization} • ${entry.startDate} – ${entry.endDate}`,
        description: entry.description,
        badge: entry.status,
        meta: [entry.commitment ? { label: entry.commitment } : null].filter(
          Boolean
        ),
        metrics: [
          entry.metrics?.manuscriptsReviewed
            ? `${formatNumber(
                entry.metrics.manuscriptsReviewed
              )} manuscripts reviewed`
            : null,
          entry.metrics?.averageReviewDays
            ? `Avg review ${
                entry.metrics.averageReviewDays || entry.metrics.avgReviewDays
              } days`
            : null,
          entry.metrics?.accepted
            ? `${formatNumber(entry.metrics.accepted)} recommendations`
            : entry.metrics?.acceptanceRate
            ? `Acceptance rate ${entry.metrics.acceptanceRate}`
            : null,
          entry.metrics?.papersReviewed
            ? `${formatNumber(entry.metrics.papersReviewed)} papers reviewed`
            : null,
          entry.metrics?.avgScore
            ? `Average score ${entry.metrics.avgScore}`
            : null,
        ].filter(Boolean),
        tags: entry.responsibilities,
      })),
    [activities.service, formatNumber]
  );

  const transformAwards = useMemo(
    () =>
      activities.awards.map((entry) => ({
        id: entry.id ?? entry.title,
        title: entry.title,
        subtitle: `${entry.organization} • ${entry.date}`,
        description: entry.description,
        badge: entry.category,
        metrics: [entry.significance].filter(Boolean),
        meta: [],
      })),
    [activities.awards]
  );

  const onAdd = (sectionId) =>
    handleEdit?.("activities", { section: sectionId, mode: "create" });
  const onEdit = (sectionId, payload) =>
    handleEdit?.("activities", {
      section: sectionId,
      mode: "edit",
      item: payload,
    });
  const onDelete = (sectionId, payload) =>
    handleDelete?.("activities", { section: sectionId, item: payload });

  const sections = useMemo(
    () => [
      {
        id: "conference",
        title: "Conference & speaking",
        caption: "High-impact talks, panels, and technical facilitation.",
        fullWidth: true,
        items: transformConference,
        renderItem: createRenderer("conference"),
      },
      {
        id: "workshops",
        title: "Workshops & training",
        caption: "Immersive learning experiences with measurable satisfaction.",
        items: transformWorkshops,
        renderItem: createRenderer("workshops"),
      },
      {
        id: "community",
        title: "Community & volunteer",
        caption:
          "Open-source and mentoring initiatives powering social impact.",
        items: transformCommunity,
        renderItem: createRenderer("community"),
      },
      {
        id: "service",
        title: "Professional service",
        caption: "Editorial stewardship and program committee leadership.",
        items: transformService,
        renderItem: createRenderer("service"),
      },
      {
        id: "awards",
        title: "Recognition",
        caption: "Milestones celebrating excellence and contribution.",
        items: transformAwards,
        renderItem: createRenderer("awards"),
      },
      {
        id: "categories",
        title: "Engagement focus",
        caption: "View and reprioritize engagement categories.",
        showCount: false,
        items: activities.categories,
        renderItem: renderChipGroup("categories"),
      },
    ],
    [
      activities.categories,
      transformConference,
      transformWorkshops,
      transformCommunity,
      transformService,
      transformAwards,
      createRenderer,
      renderChipGroup,
    ]
  );

  return (
    <ResourcePageTemplate
      header={{
        title: "Activities & Engagement",
        subtitle:
          "Track speaking, teaching, and service contributions with clear metrics and celebration-ready insights.",
        chips: [
          {
            label: "Community",
            color: "rgba(3,169,244,0.18)",
            textColor: "#81D4FA",
          },
          {
            label: "Professional",
            color: "rgba(165,214,167,0.22)",
            textColor: "#C5E1A5",
          },
        ],
        buttons: [
          {
            label: "Schedule activity",
            icon: <Event fontSize="small" />,
            background: "#66BB6A",
            hoverBackground: "#81C784",
            onClick: () =>
              handleEdit?.("activities", {
                section: "conference",
                mode: "create",
              }),
          },
          {
            label: "Share portfolio",
            variant: "outlined",
            endIcon: <WorkspacePremium fontSize="small" />,
            onClick: () => handleSave?.("activities-share", {}),
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

export default Activities;
