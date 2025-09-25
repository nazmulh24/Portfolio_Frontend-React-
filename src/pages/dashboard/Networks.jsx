import React, { useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Chip, Stack, Typography } from "@mui/material";
import {
  Groups,
  Business,
  Public,
  School,
  Campaign,
  AddCircleOutline,
  Analytics,
  CloudDownload,
  WorkspacePremium,
  Star,
  Launch,
} from "@mui/icons-material";
import ResourcePageTemplate from "../../components/dashboard/ResourcePageTemplate";

const Networks = () => {
  const outlet = useOutletContext?.() || {};
  const { dashboardData, handleEdit, handleDelete, handleSave } = outlet;

  const formatNumber = useCallback(
    (value, options = {}) =>
      typeof value === "number"
        ? value.toLocaleString(undefined, {
            maximumFractionDigits: 1,
            ...options,
          })
        : value,
    []
  );

  const formatLabel = useCallback(
    (key) =>
      key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .replace(/_/g, " "),
    []
  );

  const networks = useMemo(() => {
    const source = dashboardData?.networks ?? {};

    const professional = source.professionalNetworks ?? [
      {
        id: 1,
        name: "LinkedIn Professional Network",
        platform: "LinkedIn",
        username: "nazmul-hossain-dev",
        profileUrl: "https://linkedin.com/in/nazmul-hossain-dev",
        category: "Professional Social",
        joinDate: "2019-03-15",
        description:
          "Professional networking platform for career development, industry connections, and knowledge sharing. Actively engaged with technology professionals and recruiters.",
        metrics: {
          connections: 2847,
          followers: 1254,
          posts: 156,
          articles: 23,
          endorsements: 89,
          recommendations: 17,
        },
        engagement: {
          weeklyViews: 450,
          searchAppearances: 230,
          postImpressions: 5600,
        },
        status: "Active",
        verified: true,
        isPrimary: true,
      },
      {
        id: 2,
        name: "GitHub Developer Community",
        platform: "GitHub",
        username: "nazmulh24",
        profileUrl: "https://github.com/nazmulh24",
        category: "Developer Community",
        joinDate: "2020-01-20",
        description:
          "Open source development platform for code collaboration, project hosting, and developer networking. Contributing to various projects and maintaining repositories.",
        metrics: {
          repositories: 47,
          followers: 189,
          following: 145,
          stars: 234,
          contributions: 1847,
          organizations: 8,
        },
        engagement: {
          commitsThisYear: 567,
          pullRequests: 89,
          issues: 34,
        },
        status: "Active",
        verified: true,
        isPrimary: true,
      },
      {
        id: 3,
        name: "Stack Overflow Developer Network",
        platform: "Stack Overflow",
        username: "nazmul_dev",
        profileUrl: "https://stackoverflow.com/users/nazmul_dev",
        category: "Q&A Community",
        joinDate: "2020-06-10",
        description:
          "Technical Q&A platform for developers. Providing solutions and helping fellow developers with programming challenges, particularly in Django and React.",
        metrics: {
          reputation: 3247,
          answers: 67,
          questions: 23,
          badgesEarned: 15,
          peoplePeached: 25000,
          acceptedAnswers: 42,
        },
        engagement: {
          monthlyViews: 1200,
          upvotes: 289,
          downvotes: 12,
        },
        status: "Active",
        verified: false,
        isPrimary: false,
      },
    ];

    const industry = source.industryNetworks ?? [
      {
        id: 4,
        name: "Django Software Foundation",
        type: "Professional Organization",
        role: "Contributing Member",
        category: "Web Development",
        joinDate: "2021-05-15",
        website: "https://djangoproject.com/foundation/",
        description:
          "Non-profit organization that supports the Django web framework. Active contributor to the Django ecosystem through code contributions and community support.",
        activities: [
          "Code contributions to Django core",
          "Community forum participation",
          "Documentation improvements",
          "Bug reporting and fixes",
        ],
        achievements: [
          "Outstanding Contributor Award 2023",
          "Top 50 contributors list",
          "Community recognition badge",
        ],
        networking: {
          connections: 156,
          events: 12,
          contributions: 45,
        },
        status: "Active Member",
        membershipLevel: "Contributing",
      },
      {
        id: 5,
        name: "React Developer Community",
        type: "Developer Community",
        role: "Active Contributor",
        category: "Frontend Development",
        joinDate: "2020-11-20",
        website: "https://reactjs.org/community/",
        description:
          "Global community of React developers sharing knowledge, best practices, and contributing to the React ecosystem through discussions and code contributions.",
        activities: [
          "Community discussions participation",
          "Tutorial and blog writing",
          "Code review assistance",
          "Mentoring new developers",
        ],
        achievements: [
          "Top contributor badge",
          "Community helper recognition",
          "Featured blog posts",
        ],
        networking: {
          connections: 234,
          events: 18,
          contributions: 67,
        },
        status: "Active Member",
        membershipLevel: "Contributor",
      },
      {
        id: 6,
        name: "IEEE Computer Society",
        type: "Professional Association",
        role: "Member",
        category: "Technology Research",
        joinDate: "2022-02-10",
        website: "https://computer.org/",
        description:
          "Professional organization for computing professionals. Participating in research communities, conferences, and professional development activities.",
        activities: [
          "Conference participation",
          "Research paper reviews",
          "Professional development courses",
          "Networking events attendance",
        ],
        achievements: [
          "Conference presenter badge",
          "Peer review recognition",
          "Professional development certificates",
        ],
        networking: {
          connections: 89,
          events: 8,
          contributions: 12,
        },
        status: "Active Member",
        membershipLevel: "Professional",
      },
    ];

    const community = source.communityNetworks ?? [
      {
        id: 7,
        name: "Tech Meetup Bay Area",
        type: "Local Tech Community",
        role: "Regular Attendee & Speaker",
        category: "Technology Meetup",
        location: "San Francisco, CA",
        joinDate: "2021-08-15",
        website: "https://meetup.com/tech-bay-area",
        description:
          "Local technology meetup group focusing on web development, AI, and emerging technologies. Regular participant and occasional speaker on Django and React topics.",
        activities: [
          "Monthly meetup attendance",
          "Technical presentations",
          "Workshop facilitation",
          "Networking with local developers",
        ],
        events: [
          {
            title: "Django Best Practices Workshop",
            date: "2023-09-15",
            role: "Workshop Leader",
            attendance: 45,
          },
          {
            title: "React State Management Talk",
            date: "2023-06-20",
            role: "Speaker",
            attendance: 38,
          },
        ],
        networking: {
          connections: 127,
          events: 24,
          presentations: 6,
        },
        status: "Active",
        membershipLevel: "Speaker",
      },
      {
        id: 8,
        name: "Open Source Collective",
        type: "Developer Community",
        role: "Maintainer",
        category: "Open Source",
        joinDate: "2020-12-05",
        website: "https://opencollective.com/",
        description:
          "Community of open source contributors and maintainers. Managing and contributing to various open source projects while helping other developers get started.",
        activities: [
          "Project maintenance",
          "New contributor mentoring",
          "Code review and guidance",
          "Community events organization",
        ],
        projects: [
          "Django utility packages",
          "React component libraries",
          "Developer tools and scripts",
        ],
        networking: {
          connections: 298,
          events: 15,
          contributions: 156,
        },
        status: "Active",
        membershipLevel: "Maintainer",
      },
    ];

    const academicNetworks = source.academicNetworks ?? [
      {
        id: 9,
        name: "Association for Computing Machinery (ACM)",
        type: "Academic Association",
        role: "Student Member",
        category: "Computer Science Research",
        joinDate: "2021-09-01",
        website: "https://acm.org/",
        description:
          "World's largest educational and scientific computing society. Participating in research communities and staying updated with latest computing research and developments.",
        activities: [
          "Research paper access",
          "Conference proceedings review",
          "Special interest groups participation",
          "Professional development webinars",
        ],
        specialInterests: [
          "Human-Computer Interaction",
          "Software Engineering",
          "Web Technologies",
          "Machine Learning Applications",
        ],
        networking: {
          connections: 67,
          events: 5,
          papers: 3,
        },
        status: "Active Member",
        membershipLevel: "Student",
      },
      {
        id: 10,
        name: "ResearchGate Academic Network",
        type: "Research Platform",
        role: "Researcher",
        category: "Academic Research",
        joinDate: "2022-01-20",
        profileUrl: "https://researchgate.net/profile/nazmul-hossain",
        description:
          "Academic social networking platform for researchers. Sharing research findings, collaborating with fellow researchers, and staying updated with latest publications.",
        activities: [
          "Research publication sharing",
          "Collaboration with researchers",
          "Peer review participation",
          "Research discussion forums",
        ],
        metrics: {
          publications: 8,
          citations: 67,
          reads: 1247,
          followers: 89,
          following: 156,
          researchGate: 4.2,
        },
        networking: {
          connections: 134,
          collaborations: 8,
          reviews: 12,
        },
        status: "Active",
        membershipLevel: "Researcher",
      },
    ];

    const stats = source.networkStats ?? {
      totalNetworks: 10,
      professionalNetworks: 3,
      industryNetworks: 3,
      communityNetworks: 2,
      academicNetworks: 2,
      totalConnections: 4567,
      activeMembers: 8,
      leadershipRoles: 4,
      speakingEngagements: 12,
      contributions: 356,
      networkingEvents: 89,
      mentorshipConnections: 45,
    };

    const categories = source.networkCategories ?? [
      "Professional Social",
      "Developer Community",
      "Q&A Community",
      "Web Development",
      "Frontend Development",
      "Technology Research",
      "Technology Meetup",
      "Open Source",
      "Computer Science Research",
      "Academic Research",
      "Industry Association",
      "Local Community",
    ];

    return {
      professional,
      industry,
      community,
      academic: academicNetworks,
      stats,
      categories,
    };
  }, [dashboardData]);

  const stats = useMemo(
    () => [
      {
        label: "Active networks",
        value: formatNumber(networks.stats.totalNetworks, {
          maximumFractionDigits: 0,
        }),
        icon: <Groups fontSize="small" />,
      },
      {
        label: "Total connections",
        value: formatNumber(networks.stats.totalConnections, {
          notation: "compact",
        }),
        icon: <Public fontSize="small" />,
      },
      {
        label: "Leadership roles",
        value: formatNumber(networks.stats.leadershipRoles, {
          maximumFractionDigits: 0,
        }),
        icon: <Star fontSize="small" />,
      },
      {
        label: "Speaking events",
        value: formatNumber(networks.stats.speakingEngagements, {
          maximumFractionDigits: 0,
        }),
        icon: <Campaign fontSize="small" />,
      },
    ],
    [networks.stats, formatNumber]
  );

  const quickActions = useMemo(
    () => [
      {
        label: "Add network",
        description:
          "Capture a new platform, membership, or community to keep relationships organised.",
        icon: <AddCircleOutline />,
        ctaLabel: "Log network",
        onClick: () =>
          handleEdit?.("networks", { section: "professional", mode: "create" }),
      },
      {
        label: "Plan engagement",
        description:
          "Review contribution cadence and schedule upcoming touch-points.",
        icon: <Analytics />,
        ctaLabel: "Open planner",
        onClick: () =>
          handleEdit?.("networks", { section: "industry", mode: "plan" }),
      },
      {
        label: "Download network map",
        description:
          "Export a consolidated snapshot for proposals, grants, or leadership reviews.",
        icon: <CloudDownload />,
        ctaLabel: "Download",
        onClick: () => handleSave?.("networks-export", {}),
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
                  borderColor: "rgba(0,188,212,0.35)",
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
                        backgroundColor:
                          item.badgeColor ?? "rgba(0,188,212,0.16)",
                        color: item.badgeTextColor ?? "#4DD0E1",
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
                        icon={meta.icon}
                        sx={{
                          backgroundColor:
                            meta.color ?? "rgba(255,255,255,0.08)",
                          color: meta.textColor ?? "rgba(255,255,255,0.72)",
                          fontWeight: 600,
                          "& .MuiChip-icon": {
                            color: meta.textColor ?? "rgba(255,255,255,0.72)",
                          },
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
                          backgroundColor: "rgba(0,188,212,0.18)",
                          color: "#4DD0E1",
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
                            link.color ?? "rgba(255,255,255,0.12)",
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
                backgroundColor: "rgba(0,188,212,0.18)",
                color: "#4DD0E1",
                fontWeight: 600,
              }}
            />
          ))}
        </Stack>
      ),
    []
  );

  const transformProfessional = useMemo(
    () =>
      networks.professional.map((entry) => {
        const metricEntries = entry.metrics
          ? Object.entries(entry.metrics).map(
              ([key, value]) =>
                `${formatLabel(key)}: ${
                  typeof value === "number"
                    ? formatNumber(value, {
                        maximumFractionDigits: value < 10 ? 1 : 0,
                      })
                    : value
                }`
            )
          : [];

        const engagementEntries = entry.engagement
          ? Object.entries(entry.engagement).map(
              ([key, value]) =>
                `${formatLabel(key)}: ${
                  typeof value === "number"
                    ? formatNumber(value, {
                        maximumFractionDigits: value < 10 ? 1 : 0,
                      })
                    : value
                }`
            )
          : [];

        return {
          id: entry.id ?? entry.name,
          title: entry.name,
          subtitle: [
            entry.platform,
            entry.username ? `@${entry.username}` : null,
            entry.joinDate ? `Since ${entry.joinDate}` : null,
          ]
            .filter(Boolean)
            .join(" • "),
          description: entry.description,
          badge: entry.category,
          badgeColor: "rgba(0,188,212,0.16)",
          badgeTextColor: "#4DD0E1",
          meta: [
            entry.status
              ? {
                  label: entry.status,
                  color: "rgba(76,175,80,0.22)",
                  textColor: "#A5D6A7",
                }
              : null,
            entry.verified
              ? {
                  label: "Verified",
                  icon: <WorkspacePremium fontSize="small" />,
                  color: "rgba(129,199,132,0.22)",
                  textColor: "#C5E1A5",
                }
              : null,
            entry.isPrimary
              ? {
                  label: "Primary profile",
                  color: "rgba(255,213,79,0.22)",
                  textColor: "#FFE082",
                }
              : null,
          ].filter(Boolean),
          metrics: [...metricEntries, ...engagementEntries],
          tags: [
            entry.platform,
            entry.category,
            entry.username ? `@${entry.username}` : null,
          ].filter(Boolean),
          links: entry.profileUrl
            ? [
                {
                  key: `${entry.id}-profile`,
                  label: "View profile",
                  href: entry.profileUrl,
                  icon: <Launch fontSize="small" />,
                },
              ]
            : [],
        };
      }),
    [networks.professional, formatLabel, formatNumber]
  );

  const transformIndustry = useMemo(
    () =>
      networks.industry.map((entry) => {
        const networkingMetrics = entry.networking
          ? Object.entries(entry.networking).map(
              ([key, value]) =>
                `${formatLabel(key)}: ${
                  typeof value === "number"
                    ? formatNumber(value, {
                        maximumFractionDigits: value < 10 ? 1 : 0,
                      })
                    : value
                }`
            )
          : [];

        const achievementHighlights = entry.achievements
          ? entry.achievements.map(
              (achievement) => `Achievement • ${achievement}`
            )
          : [];

        return {
          id: entry.id ?? entry.name,
          title: entry.name,
          subtitle: [
            entry.type,
            entry.joinDate ? `Joined ${entry.joinDate}` : null,
          ]
            .filter(Boolean)
            .join(" • "),
          description: entry.description,
          badge: entry.category,
          badgeColor: "rgba(156,39,176,0.18)",
          badgeTextColor: "#E1BEE7",
          meta: [
            entry.role
              ? {
                  label: entry.role,
                  color: "rgba(255,213,79,0.22)",
                  textColor: "#FFE082",
                }
              : null,
            entry.membershipLevel
              ? {
                  label: entry.membershipLevel,
                  color: "rgba(63,81,181,0.22)",
                  textColor: "#C5CAE9",
                }
              : null,
            entry.status
              ? {
                  label: entry.status,
                  color: "rgba(76,175,80,0.22)",
                  textColor: "#A5D6A7",
                }
              : null,
          ].filter(Boolean),
          metrics: [...networkingMetrics, ...achievementHighlights],
          tags: entry.activities ? entry.activities.slice(0, 4) : [],
          links: entry.website
            ? [
                {
                  key: `${entry.id}-site`,
                  label: "Visit site",
                  href: entry.website,
                  icon: <Business fontSize="small" />,
                },
              ]
            : [],
        };
      }),
    [networks.industry, formatLabel, formatNumber]
  );

  const transformCommunity = useMemo(
    () =>
      networks.community.map((entry) => {
        const networking = entry.networking
          ? Object.entries(entry.networking).map(
              ([key, value]) =>
                `${formatLabel(key)}: ${
                  typeof value === "number"
                    ? formatNumber(value, {
                        maximumFractionDigits: value < 10 ? 1 : 0,
                      })
                    : value
                }`
            )
          : [];

        const eventHighlights = entry.events
          ? entry.events.map(
              (event) =>
                `Event • ${event.title} (${event.date}) — ${event.role}${
                  event.attendance ? `, ${event.attendance} attendees` : ""
                }`
            )
          : [];

        return {
          id: entry.id ?? entry.name,
          title: entry.name,
          subtitle: [
            entry.type,
            entry.location,
            entry.joinDate ? `Since ${entry.joinDate}` : null,
          ]
            .filter(Boolean)
            .join(" • "),
          description: entry.description,
          badge: entry.category,
          badgeColor: "rgba(255,152,0,0.18)",
          badgeTextColor: "#FFCC80",
          meta: [
            entry.role
              ? {
                  label: entry.role,
                  color: "rgba(76,175,80,0.22)",
                  textColor: "#A5D6A7",
                }
              : null,
            entry.membershipLevel
              ? {
                  label: entry.membershipLevel,
                  color: "rgba(0,188,212,0.18)",
                  textColor: "#4DD0E1",
                }
              : null,
            entry.status
              ? {
                  label: entry.status,
                  color: "rgba(255,213,79,0.22)",
                  textColor: "#FFE082",
                }
              : null,
          ].filter(Boolean),
          metrics: [...networking, ...eventHighlights],
          tags: entry.activities ? entry.activities.slice(0, 4) : [],
          links: entry.website
            ? [
                {
                  key: `${entry.id}-learn`,
                  label: "Learn more",
                  href: entry.website,
                  icon: <Groups fontSize="small" />,
                },
              ]
            : [],
        };
      }),
    [networks.community, formatLabel, formatNumber]
  );

  const transformAcademic = useMemo(
    () =>
      networks.academic.map((entry) => {
        const networkingMetrics = entry.networking
          ? Object.entries(entry.networking).map(
              ([key, value]) =>
                `${formatLabel(key)}: ${
                  typeof value === "number"
                    ? formatNumber(value, {
                        maximumFractionDigits: value < 10 ? 1 : 0,
                      })
                    : value
                }`
            )
          : [];

        const researchMetrics = entry.metrics
          ? Object.entries(entry.metrics).map(
              ([key, value]) =>
                `${formatLabel(key)}: ${
                  typeof value === "number"
                    ? formatNumber(value, {
                        maximumFractionDigits: value < 10 ? 1 : 0,
                      })
                    : value
                }`
            )
          : [];

        return {
          id: entry.id ?? entry.name,
          title: entry.name,
          subtitle: [
            entry.type,
            entry.joinDate ? `Since ${entry.joinDate}` : null,
          ]
            .filter(Boolean)
            .join(" • "),
          description: entry.description,
          badge: entry.category,
          badgeColor: "rgba(0,188,212,0.18)",
          badgeTextColor: "#4DD0E1",
          meta: [
            entry.membershipLevel
              ? {
                  label: entry.membershipLevel,
                  color: "rgba(63,81,181,0.22)",
                  textColor: "#C5CAE9",
                }
              : null,
            entry.status
              ? {
                  label: entry.status,
                  color: "rgba(129,199,132,0.22)",
                  textColor: "#C5E1A5",
                }
              : null,
          ].filter(Boolean),
          metrics: [...researchMetrics, ...networkingMetrics],
          tags: entry.specialInterests ?? [],
          links: [
            entry.profileUrl
              ? {
                  key: `${entry.id}-profile`,
                  label: "View profile",
                  href: entry.profileUrl,
                  icon: <Launch fontSize="small" />,
                }
              : null,
            entry.website
              ? {
                  key: `${entry.id}-site`,
                  label: "Visit site",
                  href: entry.website,
                  icon: <School fontSize="small" />,
                }
              : null,
          ].filter(Boolean),
        };
      }),
    [networks.academic, formatLabel, formatNumber]
  );

  const onAdd = (sectionId) =>
    handleEdit?.("networks", { section: sectionId, mode: "create" });
  const onEdit = (sectionId, payload) =>
    handleEdit?.("networks", {
      section: sectionId,
      mode: "edit",
      item: payload,
    });
  const onDelete = (sectionId, payload) =>
    handleDelete?.("networks", { section: sectionId, item: payload });

  const sections = useMemo(
    () => [
      {
        id: "professional",
        title: "Professional platforms",
        caption:
          "Social networks, developer hubs, and credentials that expand influence.",
        fullWidth: true,
        items: transformProfessional,
        renderItem: createRenderer("professional"),
      },
      {
        id: "industry",
        title: "Industry organisations",
        caption:
          "Memberships, associations, and programmes that reinforce leadership.",
        items: transformIndustry,
        renderItem: createRenderer("industry"),
      },
      {
        id: "community",
        title: "Community engagement",
        caption:
          "Meetups, collectives, and grassroots groups enabling knowledge exchange.",
        items: transformCommunity,
        renderItem: createRenderer("community"),
      },
      {
        id: "academic",
        title: "Academic collaborations",
        caption:
          "Research alliances, scholarly societies, and evidence of thought leadership.",
        items: transformAcademic,
        renderItem: createRenderer("academic"),
      },
      {
        id: "categories",
        title: "Network categories",
        caption:
          "Track strategic focus areas to balance advocacy and visibility.",
        showCount: false,
        items: networks.categories,
        renderItem: renderChipGroup("categories"),
      },
    ],
    [
      networks.categories,
      transformProfessional,
      transformIndustry,
      transformCommunity,
      transformAcademic,
      createRenderer,
      renderChipGroup,
    ]
  );

  return (
    <ResourcePageTemplate
      header={{
        title: "Networks & Communities",
        subtitle:
          "Showcase professional reach, community leadership, and research partnerships in one actionable view.",
        chips: [
          {
            label: "Connectivity",
            color: "rgba(0,188,212,0.18)",
            textColor: "#4DD0E1",
          },
          {
            label: "Community-first",
            color: "rgba(129,199,132,0.18)",
            textColor: "#C5E1A5",
          },
        ],
        buttons: [
          {
            label: "Connect platform",
            icon: <Groups fontSize="small" />,
            background: "#00BCD4",
            hoverBackground: "#00ACC1",
            onClick: () =>
              handleEdit?.("networks", {
                section: "professional",
                mode: "create",
              }),
          },
          {
            label: "Manage memberships",
            variant: "outlined",
            endIcon: <Business fontSize="small" />,
            onClick: () =>
              handleEdit?.("networks", { section: "industry", mode: "manage" }),
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

export default Networks;
