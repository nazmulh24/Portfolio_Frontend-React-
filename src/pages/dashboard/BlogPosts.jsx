import React, { useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Chip, Stack, Typography } from "@mui/material";
import {
  Article,
  Visibility,
  ThumbUp,
  AutoGraph,
  AddCircleOutline,
  TrendingUp,
  CalendarMonth,
  Launch,
  Schedule,
  Campaign,
} from "@mui/icons-material";
import ResourcePageTemplate from "../../components/dashboard/ResourcePageTemplate";

const BlogPosts = () => {
  const outlet = useOutletContext?.() || {};
  const { dashboardData, handleEdit, handleDelete, handleSave } = outlet;

  const blogData = useMemo(() => {
    const source = dashboardData?.blog ?? {};

    const fallbackPublished = [
      {
        id: "django-rest",
        title: "Building Scalable Django REST APIs",
        excerpt:
          "Caching strategies, database optimization, and infrastructure patterns for production-ready APIs.",
        category: "Backend Engineering",
        readTime: "12 min read",
        publishedDate: "2023-09-15",
        views: 2847,
        likes: 156,
        comments: 23,
        shares: 45,
        slug: "scalable-django-rest-apis-best-practices",
        tags: ["Django", "REST", "Performance", "Backend"],
      },
      {
        id: "ml-healthcare",
        title: "Machine Learning in Healthcare",
        excerpt:
          "Real-world diagnostics, personalization, and compliance considerations across hospital networks.",
        category: "AI & Data",
        readTime: "15 min read",
        publishedDate: "2023-08-22",
        views: 1923,
        likes: 134,
        comments: 18,
        shares: 32,
        slug: "machine-learning-healthcare-applications",
        tags: ["Machine Learning", "Healthcare", "Case Study"],
      },
      {
        id: "react-performance",
        title: "React Performance Optimization",
        excerpt:
          "Memoization, streaming, and bundle diagnostics to keep interfaces snappy at scale.",
        category: "Frontend Architecture",
        readTime: "10 min read",
        publishedDate: "2023-07-10",
        views: 1654,
        likes: 98,
        comments: 15,
        shares: 28,
        slug: "react-performance-optimization-guide",
        tags: ["React", "Optimization", "JavaScript"],
      },
    ];

    const fallbackDrafts = [
      {
        id: "realtime-django",
        title: "Real-time Apps with Django Channels",
        excerpt:
          "Blueprint for delivering websockets, presence indicators, and live dashboards.",
        category: "Backend Engineering",
        estimatedReadTime: "14 min read",
        completionStatus: 75,
        plannedPublishDate: "2023-10-01",
        createdDate: "2023-09-20",
        tags: ["Django", "WebSockets", "Realtime"],
      },
      {
        id: "microservices-k8s",
        title: "Microservices with Docker & Kubernetes",
        excerpt:
          "Service boundaries, observability guardrails, and progressive deployments.",
        category: "Platform Engineering",
        estimatedReadTime: "18 min read",
        completionStatus: 60,
        plannedPublishDate: "2023-10-15",
        createdDate: "2023-09-18",
        tags: ["Microservices", "Docker", "Kubernetes"],
      },
    ];

    const fallbackCalendar = [
      {
        id: "advanced-django",
        title: "Advanced Django Patterns",
        status: "Planned",
        plannedDate: "2023-10-01",
        category: "Backend Engineering",
        estimatedLength: "16 min read",
      },
      {
        id: "graphql-vs-rest",
        title: "GraphQL vs REST",
        status: "Research",
        plannedDate: "2023-10-15",
        category: "API Strategy",
        estimatedLength: "12 min read",
      },
      {
        id: "secure-auth",
        title: "Building Secure Authentication",
        status: "Outline",
        plannedDate: "2023-11-01",
        category: "Security",
        estimatedLength: "14 min read",
      },
    ];

    const fallbackStats = {
      totalPosts: 8,
      publishedPosts: 3,
      draftPosts: 2,
      totalViews: 6424,
      totalLikes: 388,
      monthlyViews: 1847,
    };

    const fallbackSEO = {
      organicTraffic: 4256,
      searchImpressions: 15847,
      averagePosition: 12.4,
      clickThroughRate: 8.7,
      topKeywords: [
        "Django REST API",
        "Machine Learning Healthcare",
        "React Performance",
        "Python Web Development",
      ],
    };

    return {
      published: source.publishedPosts ?? fallbackPublished,
      drafts: source.draftPosts ?? fallbackDrafts,
      categories: source.categories ?? [
        "Backend Engineering",
        "AI & Data",
        "Frontend Architecture",
        "DevOps",
        "Security",
      ],
      tags: source.tags ?? [
        "Django",
        "React",
        "Python",
        "Performance",
        "Machine Learning",
        "DevOps",
        "Tutorial",
      ],
      calendar: source.contentCalendar ?? fallbackCalendar,
      stats: source.blogStats ?? fallbackStats,
      seo: source.seoMetrics ?? fallbackSEO,
    };
  }, [dashboardData]);

  const formatNumber = useCallback(
    (value) => (typeof value === "number" ? value.toLocaleString() : value),
    []
  );

  const stats = useMemo(
    () => [
      {
        label: "Published posts",
        value: formatNumber(blogData.stats.publishedPosts),
        icon: <Article fontSize="small" />,
      },
      {
        label: "Total reads",
        value: formatNumber(blogData.stats.totalViews),
        icon: <Visibility fontSize="small" />,
      },
      {
        label: "Audience likes",
        value: formatNumber(blogData.stats.totalLikes),
        icon: <ThumbUp fontSize="small" />,
      },
      {
        label: "Monthly reach",
        value: formatNumber(blogData.stats.monthlyViews),
        icon: <AutoGraph fontSize="small" />,
      },
    ],
    [blogData.stats, formatNumber]
  );

  const quickActions = useMemo(
    () => [
      {
        label: "Draft a new story",
        description:
          "Spin up a fresh outline with SEO prompts and audience targeting.",
        icon: <AddCircleOutline />,
        ctaLabel: "Start writing",
        onClick: () =>
          handleEdit?.("blog", { section: "published", mode: "create" }),
      },
      {
        label: "Optimize SEO",
        description: "Refresh keywords, metadata, and search intent coverage.",
        icon: <TrendingUp />,
        ctaLabel: "Open checklist",
        onClick: () =>
          handleEdit?.("blog", { section: "seo", mode: "optimize" }),
      },
      {
        label: "Export editorial plan",
        description:
          "Share the upcoming publishing calendar with stakeholders.",
        icon: <CalendarMonth />,
        ctaLabel: "Export",
        onClick: () => handleSave?.("blog-calendar-export", {}),
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
                cursor: "pointer",
                transition: "border-color 160ms ease, transform 160ms ease",
                "&:hover": {
                  borderColor: "rgba(144,202,249,0.35)",
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
                          backgroundColor: "rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.72)",
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
                    {item.tags.map((tagValue) => (
                      <Chip
                        key={`${item.id}-tag-${tagValue}`}
                        label={tagValue}
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
                          backgroundColor: "rgba(255,255,255,0.1)",
                          color: "#E3F2FD",
                          fontWeight: 600,
                          cursor: "pointer",
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

  const renderChipGroup = useCallback(
    (sectionId, color) => (items, handlers) =>
      (
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {items.map((value) => (
            <Chip
              key={value}
              label={value}
              onClick={() => handlers.onEdit?.(sectionId, value)}
              sx={{
                backgroundColor: color.background,
                color: color.text,
                fontWeight: 600,
              }}
            />
          ))}
        </Stack>
      ),
    []
  );

  const transformPublished = useMemo(
    () =>
      blogData.published.map((post) => ({
        id: post.id ?? post.slug ?? post.title,
        title: post.title,
        subtitle: `${post.category} • ${post.readTime}`,
        description: post.excerpt,
        tags: post.tags,
        metrics: [
          `Published ${post.publishedDate}`,
          `${formatNumber(post.views)} reads`,
          `${formatNumber(post.likes)} likes • ${formatNumber(
            post.comments
          )} comments`,
          `${formatNumber(post.shares)} shares`,
        ],
        links: [
          post.slug
            ? {
                key: "open",
                label: "View post",
                href: `/blog/${post.slug}`,
                icon: <Launch fontSize="small" />,
              }
            : null,
        ].filter(Boolean),
      })),
    [blogData.published, formatNumber]
  );

  const transformDrafts = useMemo(
    () =>
      blogData.drafts.map((draft) => ({
        id: draft.id ?? draft.slug ?? draft.title,
        title: draft.title,
        subtitle: `${draft.category} • ${draft.estimatedReadTime}`,
        description: draft.excerpt,
        status: `Draft • ${draft.completionStatus}% ready`,
        tags: draft.tags,
        metrics: [
          `Created ${draft.createdDate}`,
          `Target publish ${draft.plannedPublishDate}`,
          `${draft.completionStatus}% completion`,
        ],
        links: [
          {
            key: "continue",
            label: "Continue writing",
            icon: <Campaign fontSize="small" />,
            onClick: () =>
              handleEdit?.("blog", {
                section: "drafts",
                mode: "edit",
                item: draft,
              }),
          },
          {
            key: "schedule",
            label: "Schedule",
            icon: <Schedule fontSize="small" />,
            onClick: () =>
              handleEdit?.("blog", {
                section: "drafts",
                mode: "schedule",
                item: draft,
              }),
          },
        ],
      })),
    [blogData.drafts, handleEdit]
  );

  const transformCalendar = useMemo(
    () =>
      blogData.calendar.map((entry) => ({
        id: entry.id ?? entry.title,
        title: entry.title,
        subtitle: `${entry.category} • ${entry.estimatedLength}`,
        description: `Planned for ${entry.plannedDate}`,
        status: entry.status,
        metrics: [
          `Planned date ${entry.plannedDate}`,
          `Estimated length ${entry.estimatedLength}`,
        ],
      })),
    [blogData.calendar]
  );

  const transformSEO = useMemo(
    () => [
      {
        id: "seo-overview",
        title: "Search performance snapshot",
        subtitle: `${formatNumber(
          blogData.seo.organicTraffic
        )} organic visits • ${blogData.seo.clickThroughRate}% CTR`,
        description:
          "Track search intent coverage, ranking velocity, and click-through confidence.",
        metrics: [
          `Organic traffic: ${formatNumber(blogData.seo.organicTraffic)}`,
          `Search impressions: ${formatNumber(blogData.seo.searchImpressions)}`,
          `Average position: ${blogData.seo.averagePosition}`,
        ],
        tags: blogData.seo.topKeywords,
      },
    ],
    [blogData.seo, formatNumber]
  );

  const onAdd = (sectionId) =>
    handleEdit?.("blog", { section: sectionId, mode: "create" });
  const onEdit = (sectionId, payload) =>
    handleEdit?.("blog", { section: sectionId, mode: "edit", item: payload });
  const onDelete = (sectionId, payload) =>
    handleDelete?.("blog", { section: sectionId, item: payload });

  const sections = useMemo(
    () => [
      {
        id: "published",
        title: "Published articles",
        caption: "Live stories fueling reach and subscriber growth.",
        items: transformPublished,
        fullWidth: true,
        renderItem: createRenderer("published"),
      },
      {
        id: "drafts",
        title: "Draft workspace",
        caption: "In-flight content under review or polishing.",
        items: transformDrafts,
        renderItem: createRenderer("drafts"),
      },
      {
        id: "calendar",
        title: "Editorial calendar",
        caption: "Planned drops and research in motion.",
        items: transformCalendar,
        renderItem: createRenderer("calendar"),
      },
      {
        id: "categories",
        title: "Topics",
        caption: "Audience-aligned content pillars.",
        showCount: false,
        items: blogData.categories,
        renderItem: renderChipGroup("categories", {
          background: "rgba(255,213,79,0.18)",
          text: "#FFD54F",
        }),
      },
      {
        id: "tags",
        title: "Tag inventory",
        caption: "Findability and search hooks.",
        showCount: false,
        items: blogData.tags,
        renderItem: renderChipGroup("tags", {
          background: "rgba(0,188,212,0.18)",
          text: "#80DEEA",
        }),
      },
      {
        id: "seo",
        title: "SEO intelligence",
        caption: "Keyword velocity and search posture.",
        items: transformSEO,
        renderItem: createRenderer("seo"),
      },
    ],
    [
      blogData.categories,
      blogData.tags,
      transformPublished,
      transformDrafts,
      transformCalendar,
      transformSEO,
      createRenderer,
      renderChipGroup,
    ]
  );

  return (
    <ResourcePageTemplate
      header={{
        title: "Content Studio",
        subtitle:
          "Command the editorial pipeline, analytics, and search posture from one orchestrated workspace.",
        chips: [
          {
            label: "Thought leadership",
            color: "rgba(129,199,132,0.18)",
            textColor: "#A5D6A7",
          },
          {
            label: "Data informed",
            color: "rgba(144,202,249,0.16)",
            textColor: "#90CAF9",
          },
        ],
        buttons: [
          {
            label: "Publish spotlight",
            icon: <Article fontSize="small" />,
            background: "#42A5F5",
            hoverBackground: "#64B5F6",
            onClick: () =>
              handleEdit?.("blog", {
                section: "published",
                mode: "create",
                context: "spotlight",
              }),
          },
          {
            label: "Plan sprint",
            variant: "outlined",
            onClick: () =>
              handleEdit?.("blog", { section: "calendar", mode: "plan" }),
            endIcon: <CalendarMonth fontSize="small" />,
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

export default BlogPosts;
