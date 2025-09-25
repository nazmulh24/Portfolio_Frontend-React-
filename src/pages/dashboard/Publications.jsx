import React, { useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Chip, Stack, Typography } from "@mui/material";
import {
  Article,
  School,
  Assessment,
  AutoGraph,
  AddCircleOutline,
  CloudUpload,
  WorkspacePremium,
  Launch,
  Timeline,
} from "@mui/icons-material";
import ResourcePageTemplate from "../../components/dashboard/ResourcePageTemplate";

const Publications = () => {
  const outlet = useOutletContext?.() || {};
  const { dashboardData, handleEdit, handleDelete, handleSave } = outlet;

  const formatNumber = useCallback(
    (value) => (typeof value === "number" ? value.toLocaleString() : value),
    []
  );

  const publications = useMemo(() => {
    const source = dashboardData?.publications ?? {};

    const fallbackJournals = [
      {
        id: "ml-healthcare",
        title: "Machine Learning Approaches for Early Disease Detection",
        journal: "Journal of Medical Informatics",
        year: 2023,
        volume: "45",
        issue: "3",
        pages: "234-248",
        doi: "10.1016/j.jmi.2023.456789",
        authors: ["Nazmul Hossain", "Sarah Johnson", "Michael Chen"],
        abstract:
          "Ensemble methods improving cardiovascular diagnosis accuracy on large-scale clinical datasets.",
        keywords: ["Machine Learning", "Healthcare", "Predictive Analytics"],
        metrics: { citations: 23, downloads: 487, impact: 4.7, quartile: "Q1" },
        openAccess: true,
        pdfUrl: "/publications/hossain_2023_ml_healthcare.pdf",
        funding: "NSF Grant #NSF-2023-1234",
      },
      {
        id: "django-node",
        title: "Scalable Web Applications: Django vs Node.js",
        journal: "International Journal of Web Technologies",
        year: 2023,
        volume: "12",
        issue: "2",
        pages: "89-105",
        doi: "10.1007/s11280-023-01234",
        authors: ["Nazmul Hossain", "Ahmed Rahman"],
        abstract:
          "Benchmarking throughput, latency, and resource usage across modern server frameworks.",
        keywords: ["Web Performance", "Django", "Node.js"],
        metrics: { citations: 15, downloads: 298, impact: 3.2, quartile: "Q2" },
        openAccess: false,
        pdfUrl: "/publications/hossain_2023_web_frameworks.pdf",
        funding: "University Research Grant",
      },
    ];

    const fallbackConferences = [
      {
        id: "realtime-kafka",
        title: "Real-time Data Processing with Kafka and Django Channels",
        event: "International Conference on Software Engineering",
        year: 2023,
        location: "San Francisco, USA",
        authors: ["Nazmul Hossain", "Lisa Wang"],
        abstract:
          "A responsive architecture for high-volume streaming interfaces leveraging Kafka and Channels.",
        keywords: ["Kafka", "Realtime", "WebSockets"],
        metrics: { citations: 8, downloads: 156 },
        acceptanceRate: "22%",
        ranking: "A*",
        pdfUrl: "/publications/hossain_2023_realtime_kafka.pdf",
        slidesUrl: "/publications/hossain_2023_icse_slides.pdf",
      },
      {
        id: "microservices-security",
        title: "Microservices Security Patterns",
        event: "IEEE International Conference on Cloud Computing",
        year: 2022,
        location: "Virtual",
        authors: ["Nazmul Hossain", "Robert Kim", "Jane Smith"],
        abstract:
          "Evaluating authentication, authorization, and data protection blueprints for distributed systems.",
        keywords: ["Microservices", "Security", "Cloud"],
        metrics: { citations: 12, downloads: 234 },
        acceptanceRate: "28%",
        ranking: "A",
        pdfUrl: "/publications/hossain_2022_microservices_security.pdf",
      },
    ];

    const fallbackBooks = [
      {
        id: "django-chapter",
        title: "Modern Web Development with Django",
        book: "Advanced Python Programming Techniques",
        publisher: "Springer",
        year: 2023,
        pages: "245-278",
        doi: "10.1007/978-3-031-12345-6_12",
        summary:
          "Practical frameworks for REST APIs, security posture, and deployment automation with Django.",
        keywords: ["Django", "REST", "Deployment"],
        pdfUrl: "/publications/hossain_2023_django_chapter.pdf",
      },
    ];

    const fallbackUnderReview = [
      {
        id: "ai-code-review",
        title: "AI-Powered Code Review",
        venue: "IEEE Transactions on Software Engineering",
        submissionDate: "2023-08-15",
        decisionDate: "2023-11-15",
        authors: ["Nazmul Hossain", "Emily Chen", "David Park"],
        abstract:
          "Machine learning models for automated detection of defects and vulnerabilities in pull requests.",
        keywords: ["AI", "Code Quality", "Machine Learning"],
        metrics: { impact: 6.2, quartile: "Q1" },
      },
      {
        id: "blockchain-identity",
        title: "Blockchain-based Identity Management",
        venue: "ACM Symposium on Applied Computing",
        submissionDate: "2023-09-01",
        decisionDate: "2023-12-01",
        authors: ["Nazmul Hossain", "Alex Thompson"],
        abstract:
          "Decentralized identity primitives ensuring privacy and interoperability for distributed apps.",
        keywords: ["Blockchain", "Identity", "Security"],
      },
    ];

    const fallbackStats = {
      totalPublications: 7,
      journalArticles: 2,
      conferenceProceedings: 2,
      bookChapters: 1,
      underReview: 2,
      totalCitations: 58,
      totalDownloads: 1175,
      hIndex: 4,
      averageImpactFactor: 4.03,
      firstAuthor: 5,
      openAccess: 3,
    };

    const fallbackProfiles = {
      googleScholarProfile: "https://scholar.google.com/citations?user=xyz123",
      orcidId: "0000-0002-1234-5678",
      researchGateScore: 24.5,
      researchGateReads: 1456,
      scopusAuthorId: "57123456789",
      publonsId: "3456789",
      academiaFollowers: 234,
    };

    const fallbackReviewing = [
      {
        id: "jmi",
        journal: "Journal of Medical Informatics",
        count: 5,
        since: "2022",
      },
      {
        id: "ijwt",
        journal: "International Journal of Web Technologies",
        count: 3,
        since: "2023",
      },
      { id: "ieee", journal: "IEEE Computer Society", count: 2, since: "2023" },
    ];

    const fallbackAreas = [
      "Machine Learning",
      "Healthcare Informatics",
      "Software Engineering",
      "Cloud Computing",
      "Cybersecurity",
      "Distributed Systems",
    ];

    return {
      journals: source.journalPublications ?? fallbackJournals,
      conferences: source.conferencePublications ?? fallbackConferences,
      books: source.bookChapters ?? fallbackBooks,
      underReview: source.underReview ?? fallbackUnderReview,
      stats: source.publicationStats ?? fallbackStats,
      profiles: source.researchMetrics ?? fallbackProfiles,
      areas: source.researchAreas ?? fallbackAreas,
      reviewing: source.reviewingExperience ?? fallbackReviewing,
    };
  }, [dashboardData]);

  const stats = useMemo(
    () => [
      {
        label: "Publications",
        value: formatNumber(publications.stats.totalPublications),
        icon: <Article fontSize="small" />,
      },
      {
        label: "Citations",
        value: formatNumber(publications.stats.totalCitations),
        icon: <AutoGraph fontSize="small" />,
      },
      {
        label: "H-index",
        value: formatNumber(publications.stats.hIndex),
        icon: <Assessment fontSize="small" />,
      },
      {
        label: "Downloads",
        value: formatNumber(publications.stats.totalDownloads),
        icon: <CloudUpload fontSize="small" />,
      },
    ],
    [publications.stats, formatNumber]
  );

  const quickActions = useMemo(
    () => [
      {
        label: "Add journal article",
        description:
          "Capture metadata, DOI links, and funding acknowledgements.",
        icon: <AddCircleOutline />,
        ctaLabel: "New article",
        onClick: () =>
          handleEdit?.("publications", { section: "journals", mode: "create" }),
      },
      {
        label: "Submit conference paper",
        description:
          "Track deadlines, acceptance rates, and presentation assets.",
        icon: <School />,
        ctaLabel: "Track submission",
        onClick: () =>
          handleEdit?.("publications", {
            section: "conferences",
            mode: "create",
          }),
      },
      {
        label: "Export citation report",
        description:
          "Generate a citation snapshot for grant or tenure packets.",
        icon: <WorkspacePremium />,
        ctaLabel: "Export",
        onClick: () => handleSave?.("publications-citations-export", {}),
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
                  borderColor: "rgba(129,199,132,0.35)",
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
                        backgroundColor: "rgba(33,150,243,0.2)",
                        color: "#90CAF9",
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
                          backgroundColor: meta.emphasis
                            ? "rgba(255,193,7,0.2)"
                            : "rgba(255,255,255,0.08)",
                          color: meta.emphasis
                            ? "#FFC107"
                            : "rgba(255,255,255,0.72)",
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
                          backgroundColor: "rgba(76,175,80,0.2)",
                          color: "#A5D6A7",
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
                backgroundColor: "rgba(156,39,176,0.18)",
                color: "#CE93D8",
                fontWeight: 600,
              }}
            />
          ))}
        </Stack>
      ),
    []
  );

  const transformJournals = useMemo(
    () =>
      publications.journals.map((entry) => ({
        id: entry.id ?? entry.title,
        title: entry.title,
        subtitle: `${entry.journal} • ${entry.year}`,
        description: entry.abstract,
        meta: [
          { label: `Authors: ${entry.authors?.join?.(", ") ?? "Unknown"}` },
          entry.doi ? { label: `DOI ${entry.doi}` } : null,
          entry.funding ? { label: entry.funding, emphasis: true } : null,
        ].filter(Boolean),
        metrics: [
          entry.metrics?.impact
            ? `Impact factor ${entry.metrics.impact}`
            : null,
          entry.metrics?.quartile ? `Quartile ${entry.metrics.quartile}` : null,
          entry.metrics?.citations
            ? `${formatNumber(entry.metrics.citations)} citations`
            : null,
          entry.metrics?.downloads
            ? `${formatNumber(entry.metrics.downloads)} downloads`
            : null,
          entry.openAccess ? "Open access" : null,
        ].filter(Boolean),
        tags: entry.keywords,
        links: [
          entry.pdfUrl
            ? {
                key: "pdf",
                label: "View PDF",
                href: entry.pdfUrl,
                icon: <Launch fontSize="small" />,
              }
            : null,
        ].filter(Boolean),
      })),
    [publications.journals, formatNumber]
  );

  const transformConferences = useMemo(
    () =>
      publications.conferences.map((entry) => ({
        id: entry.id ?? entry.title,
        title: entry.title,
        subtitle: `${entry.event} • ${entry.year}`,
        description: entry.abstract,
        meta: [
          { label: `Location: ${entry.location}` },
          { label: `Authors: ${entry.authors?.join?.(", ") ?? "Unknown"}` },
          entry.acceptanceRate
            ? { label: `Acceptance ${entry.acceptanceRate}`, emphasis: true }
            : null,
          entry.ranking ? { label: `Rank ${entry.ranking}` } : null,
        ].filter(Boolean),
        metrics: [
          entry.metrics?.citations
            ? `${formatNumber(entry.metrics.citations)} citations`
            : null,
          entry.metrics?.downloads
            ? `${formatNumber(entry.metrics.downloads)} downloads`
            : null,
        ].filter(Boolean),
        tags: entry.keywords,
        links: [
          entry.pdfUrl
            ? {
                key: "paper",
                label: "View paper",
                href: entry.pdfUrl,
                icon: <Launch fontSize="small" />,
              }
            : null,
          entry.slidesUrl
            ? {
                key: "slides",
                label: "Slides",
                href: entry.slidesUrl,
                icon: <Launch fontSize="small" />,
                color: "rgba(255,152,0,0.18)",
                textColor: "#FFCC80",
              }
            : null,
        ].filter(Boolean),
      })),
    [publications.conferences, formatNumber]
  );

  const transformBooks = useMemo(
    () =>
      publications.books.map((entry) => ({
        id: entry.id ?? entry.title,
        title: entry.title,
        subtitle: `${entry.book} • ${entry.publisher} (${entry.year})`,
        description: entry.summary,
        meta: [
          entry.doi ? { label: `DOI ${entry.doi}` } : null,
          entry.pages ? { label: `Pages ${entry.pages}` } : null,
        ].filter(Boolean),
        tags: entry.keywords,
        links: [
          entry.pdfUrl
            ? {
                key: "chapter",
                label: "Chapter PDF",
                href: entry.pdfUrl,
                icon: <Launch fontSize="small" />,
              }
            : null,
        ].filter(Boolean),
      })),
    [publications.books]
  );

  const transformUnderReview = useMemo(
    () =>
      publications.underReview.map((entry) => ({
        id: entry.id ?? entry.title,
        title: entry.title,
        subtitle: `${entry.venue} • Submitted ${entry.submissionDate}`,
        description: entry.abstract,
        status: "Under review",
        meta: [
          entry.decisionDate
            ? { label: `Decision expected ${entry.decisionDate}` }
            : null,
          { label: `Authors: ${entry.authors?.join?.(", ") ?? "Unknown"}` },
        ].filter(Boolean),
        metrics: [
          entry.metrics?.impact
            ? `Target impact ${entry.metrics.impact}`
            : null,
          entry.metrics?.quartile
            ? `Target quartile ${entry.metrics.quartile}`
            : null,
        ].filter(Boolean),
        tags: entry.keywords,
      })),
    [publications.underReview]
  );

  const transformProfiles = useMemo(
    () => [
      {
        id: "profiles",
        title: "Academic identities",
        subtitle: "Keep external profiles aligned with latest research.",
        description:
          "Centralize scholarly identifiers and engagement metrics for quick references.",
        meta: [
          publications.profiles.orcidId
            ? { label: `ORCID ${publications.profiles.orcidId}` }
            : null,
          publications.profiles.scopusAuthorId
            ? { label: `Scopus ${publications.profiles.scopusAuthorId}` }
            : null,
          publications.profiles.publonsId
            ? { label: `Publons ${publications.profiles.publonsId}` }
            : null,
        ].filter(Boolean),
        metrics: [
          publications.profiles.researchGateScore
            ? `ResearchGate score ${publications.profiles.researchGateScore}`
            : null,
          publications.profiles.researchGateReads
            ? `${formatNumber(publications.profiles.researchGateReads)} reads`
            : null,
          publications.profiles.academiaFollowers
            ? `${formatNumber(
                publications.profiles.academiaFollowers
              )} Academia.edu followers`
            : null,
        ].filter(Boolean),
        links: [
          publications.profiles.googleScholarProfile
            ? {
                key: "scholar",
                label: "Google Scholar",
                href: publications.profiles.googleScholarProfile,
                icon: <Launch fontSize="small" />,
              }
            : null,
        ].filter(Boolean),
      },
    ],
    [publications.profiles, formatNumber]
  );

  const transformReviewing = useMemo(
    () =>
      publications.reviewing.map((entry) => ({
        id: entry.id ?? entry.journal,
        title: entry.journal,
        subtitle: `Reviewer since ${entry.since}`,
        metrics: [`${formatNumber(entry.count)} completed reviews`],
      })),
    [publications.reviewing, formatNumber]
  );

  const onAdd = (sectionId) =>
    handleEdit?.("publications", { section: sectionId, mode: "create" });
  const onEdit = (sectionId, payload) =>
    handleEdit?.("publications", {
      section: sectionId,
      mode: "edit",
      item: payload,
    });
  const onDelete = (sectionId, payload) =>
    handleDelete?.("publications", { section: sectionId, item: payload });

  const sections = useMemo(
    () => [
      {
        id: "journals",
        title: "Journal publications",
        caption: "Peer-reviewed articles with measurable impact.",
        items: transformJournals,
        fullWidth: true,
        renderItem: createRenderer("journals"),
      },
      {
        id: "conferences",
        title: "Conference proceedings",
        caption: "Talks and papers presented to global audiences.",
        items: transformConferences,
        renderItem: createRenderer("conferences"),
      },
      {
        id: "books",
        title: "Book chapters",
        caption: "Long-form contributions to industry references.",
        items: transformBooks,
        renderItem: createRenderer("books"),
      },
      {
        id: "underReview",
        title: "In peer review",
        caption: "Submissions awaiting decisions and revisions.",
        items: transformUnderReview,
        renderItem: createRenderer("underReview"),
      },
      {
        id: "researchAreas",
        title: "Research domains",
        caption: "Core areas of expertise and ongoing exploration.",
        showCount: false,
        items: publications.areas,
        renderItem: renderChipGroup("researchAreas"),
      },
      {
        id: "profiles",
        title: "Research footprint",
        caption: "Profiles, identifiers, and engagement metrics.",
        items: transformProfiles,
        renderItem: createRenderer("profiles"),
      },
      {
        id: "reviewing",
        title: "Reviewing service",
        caption: "Editorial stewardship across journals.",
        items: transformReviewing,
        renderItem: createRenderer("reviewing"),
      },
    ],
    [
      publications.areas,
      transformJournals,
      transformConferences,
      transformBooks,
      transformUnderReview,
      transformProfiles,
      transformReviewing,
      createRenderer,
      renderChipGroup,
    ]
  );

  return (
    <ResourcePageTemplate
      header={{
        title: "Research Portfolio",
        subtitle:
          "Illuminate scholarly output, amplify citation velocity, and manage submissions from a single command center.",
        chips: [
          {
            label: "Scholarly",
            color: "rgba(129,199,132,0.18)",
            textColor: "#A5D6A7",
          },
          {
            label: "Impact",
            color: "rgba(144,202,249,0.16)",
            textColor: "#90CAF9",
          },
        ],
        buttons: [
          {
            label: "Log publication",
            icon: <Article fontSize="small" />,
            background: "#66BB6A",
            hoverBackground: "#81C784",
            onClick: () =>
              handleEdit?.("publications", {
                section: "journals",
                mode: "create",
              }),
          },
          {
            label: "Sync indexes",
            variant: "outlined",
            onClick: () =>
              handleEdit?.("publications", {
                section: "profiles",
                mode: "sync",
              }),
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

export default Publications;
