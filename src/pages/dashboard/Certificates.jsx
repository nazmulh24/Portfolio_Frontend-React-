import React, { useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Chip, Stack, Typography } from "@mui/material";
import {
  WorkspacePremium,
  Verified,
  Schedule,
  TrendingUp,
  AddCircleOutline,
  CloudDownload,
  Launch,
} from "@mui/icons-material";
import ResourcePageTemplate from "../../components/dashboard/ResourcePageTemplate";

const Certificates = () => {
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

  const toScoreString = useCallback(
    (score, maxScore) => {
      if (typeof score === "number" && typeof maxScore === "number") {
        return `${formatNumber(score, {
          maximumFractionDigits: 0,
        })}/${formatNumber(maxScore, { maximumFractionDigits: 0 })}`;
      }
      if (typeof score === "number") {
        return `${formatNumber(score, { maximumFractionDigits: 0 })}`;
      }
      return score;
    },
    [formatNumber]
  );

  const certificates = useMemo(() => {
    const source = dashboardData?.certificates ?? {};

    const technical = source.technicalCertificates ?? [
      {
        id: "aws-saa",
        title: "AWS Solutions Architect – Associate",
        provider: "Amazon Web Services",
        category: "Cloud Computing",
        difficulty: "Associate",
        status: "Active",
        issueDate: "2023-08-15",
        expiryDate: "2026-08-15",
        credentialId: "AWS-SAA-2023-081501",
        renewalRequired: true,
        studyHours: 120,
        examScore: 856,
        maxScore: 1000,
        description:
          "Validates architectural expertise across compute, networking, storage, and data services, emphasising resilient and cost-optimised cloud workloads.",
        skills: ["AWS EC2", "S3", "Lambda", "CloudFormation", "IAM"],
        certificateUrl: "/certificates/aws_solutions_architect_associate.pdf",
        verificationUrl:
          "https://aws.amazon.com/verification/AWS-SAA-2023-081501",
      },
      {
        id: "gcp-developer",
        title: "Google Cloud Professional Cloud Developer",
        provider: "Google Cloud",
        category: "Cloud Computing",
        difficulty: "Professional",
        status: "Active",
        issueDate: "2023-06-10",
        expiryDate: "2025-06-10",
        credentialId: "GCP-PCD-2023-061001",
        renewalRequired: true,
        studyHours: 150,
        examScore: 82,
        maxScore: 100,
        description:
          "Demonstrates the ability to build, deploy, and monitor high availability services on Google Cloud using modern CI/CD tooling.",
        skills: ["GCP", "App Engine", "Cloud Functions", "Pub/Sub", "BigQuery"],
        certificateUrl: "/certificates/gcp_cloud_developer.pdf",
        verificationUrl:
          "https://cloud.google.com/certification/cloud-developer",
      },
      {
        id: "cka",
        title: "Certified Kubernetes Administrator (CKA)",
        provider: "Cloud Native Computing Foundation",
        category: "DevOps",
        difficulty: "Professional",
        status: "Active",
        issueDate: "2023-04-20",
        expiryDate: "2026-04-20",
        credentialId: "CKA-2304-20-001",
        renewalRequired: true,
        studyHours: 180,
        examScore: 89,
        maxScore: 100,
        description:
          "Hands-on assessment covering cluster architecture, scheduling, networking, storage, and troubleshooting within production Kubernetes environments.",
        skills: ["Kubernetes", "Docker", "Networking", "Storage", "kubectl"],
        certificateUrl: "/certificates/cka_certificate.pdf",
        verificationUrl:
          "https://training.linuxfoundation.org/certification/verify/",
      },
    ];

    const professional = source.professionalCertificates ?? [
      {
        id: "pmp",
        title: "Project Management Professional (PMP)",
        provider: "Project Management Institute",
        category: "Project Management",
        status: "Active",
        issueDate: "2022-11-30",
        expiryDate: "2025-11-30",
        studyHours: 200,
        credentialId: "PMP-2022-113001",
        renewalRequired: true,
        renewalCredits: 60,
        description:
          "Confirms mastery of predictive and agile delivery, risk governance, and stakeholder leadership across enterprise projects.",
        skills: ["Agile", "Risk", "Leadership", "Stakeholder Management"],
      },
      {
        id: "csm",
        title: "Certified ScrumMaster (CSM)",
        provider: "Scrum Alliance",
        category: "Agile Methodology",
        status: "Active",
        issueDate: "2022-09-12",
        expiryDate: "2024-09-12",
        studyHours: 40,
        renewalRequired: true,
        renewalCredits: 20,
        description:
          "Validates servant-leadership, facilitation, and empiricism within Scrum teams while accelerating incremental delivery.",
        skills: ["Scrum", "Facilitation", "Sprint Planning", "Retrospectives"],
      },
    ];

    const educational = source.educationalCertificates ?? [
      {
        id: "stanford-ml",
        title: "Machine Learning Specialization",
        provider: "Stanford University (Coursera)",
        category: "Machine Learning",
        status: "Completed",
        issueDate: "2023-01-25",
        studyHours: 180,
        grade: "95%",
        coursesCompleted: 5,
        description:
          "Advanced programme spanning supervised learning, deep learning, and production deployment patterns.",
        skills: ["ML", "TensorFlow", "Neural Networks", "Data Analysis"],
      },
      {
        id: "fcc-fullstack",
        title: "Full Stack Web Development",
        provider: "freeCodeCamp",
        category: "Web Development",
        status: "Completed",
        issueDate: "2022-07-18",
        studyHours: 300,
        projectsCompleted: 15,
        description:
          "Comprehensive curriculum covering responsive design, React, Node.js, and API-driven applications.",
        skills: ["HTML", "CSS", "React", "Node.js", "APIs"],
      },
      {
        id: "ibm-ds",
        title: "Data Science Professional Certificate",
        provider: "IBM (edX)",
        category: "Data Science",
        status: "Completed",
        issueDate: "2022-12-05",
        studyHours: 240,
        grade: "88%",
        capstoneProject: "Healthcare Data Analysis Dashboard",
        description:
          "Industry-aligned pathway through data analysis, machine learning, and storytelling with Python.",
        skills: ["Python", "Pandas", "SQL", "Visualization", "Statistics"],
      },
    ];

    const security = source.securityCertificates ?? [
      {
        id: "security-plus",
        title: "CompTIA Security+",
        provider: "CompTIA",
        category: "Cybersecurity",
        status: "Active",
        issueDate: "2023-03-10",
        expiryDate: "2026-03-10",
        examScore: 785,
        maxScore: 900,
        studyHours: 100,
        renewalRequired: true,
        description:
          "Baseline cybersecurity credential covering threat modelling, incident response, and secure architecture fundamentals.",
        skills: [
          "Network Security",
          "Risk Management",
          "Identity",
          "Cryptography",
        ],
      },
    ];

    const language = source.languageCertificates ?? [
      {
        id: "ielts",
        title: "IELTS Academic",
        provider: "British Council",
        category: "English Language",
        status: "Active",
        issueDate: "2022-05-20",
        expiryDate: "2024-05-20",
        overallScore: 8.5,
        maxScore: 9,
        bandScores: {
          Listening: 8.5,
          Reading: 8.0,
          Writing: 8.0,
          Speaking: 9.0,
        },
        description:
          "Academic English proficiency across listening, reading, writing, and speaking domains.",
      },
    ];

    const stats = source.certificateStats ?? {
      totalCertificates: 11,
      activeCertificates: 9,
      pendingRenewal: 2,
      totalStudyHours: 1493,
      averageScore: 83.2,
      renewalsThisYear: 3,
    };

    const categories = source.certificateCategories ?? [
      "Cloud Computing",
      "DevOps",
      "Containerization",
      "Project Management",
      "Agile Methodology",
      "Machine Learning",
      "Web Development",
      "Data Science",
      "Cybersecurity",
      "English Language",
      "Software Development",
      "Database Management",
    ];

    return {
      technical,
      professional,
      educational,
      security,
      language,
      stats,
      categories,
    };
  }, [dashboardData]);

  const stats = useMemo(
    () => [
      {
        label: "Total certificates",
        value: formatNumber(certificates.stats.totalCertificates, {
          maximumFractionDigits: 0,
        }),
        icon: <WorkspacePremium fontSize="small" />,
      },
      {
        label: "Active",
        value: formatNumber(certificates.stats.activeCertificates, {
          maximumFractionDigits: 0,
        }),
        icon: <Verified fontSize="small" />,
      },
      {
        label: "Study hours",
        value: `${formatNumber(certificates.stats.totalStudyHours / 1000)}k`,
        icon: <TrendingUp fontSize="small" />,
      },
      {
        label: "Renewals this year",
        value: formatNumber(certificates.stats.renewalsThisYear, {
          maximumFractionDigits: 0,
        }),
        icon: <Schedule fontSize="small" />,
      },
    ],
    [certificates.stats, formatNumber]
  );

  const quickActions = useMemo(
    () => [
      {
        label: "Log new certificate",
        description:
          "Track fresh credentials, attach files, and keep renewal notes aligned.",
        icon: <AddCircleOutline />,
        ctaLabel: "Add certificate",
        onClick: () =>
          handleEdit?.("certificates", {
            section: "technical",
            mode: "create",
          }),
      },
      {
        label: "Plan renewals",
        description:
          "Generate a three-month action plan for upcoming expirations.",
        icon: <Schedule />,
        ctaLabel: "View schedule",
        onClick: () =>
          handleEdit?.("certificates", {
            section: "professional",
            mode: "renewals",
          }),
      },
      {
        label: "Download transcript",
        description:
          "Export a consolidated credential dossier for proposals and visa packs.",
        icon: <CloudDownload />,
        ctaLabel: "Download",
        onClick: () => handleSave?.("certificates-export", {}),
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
                  borderColor: "rgba(33,150,243,0.4)",
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
                        sx={{ color: "rgba(255,255,255,0.64)", fontSize: 13 }}
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
                        backgroundColor: "rgba(33,150,243,0.16)",
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
                          backgroundColor: "rgba(76,175,80,0.18)",
                          color: "#C5E1A5",
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
                backgroundColor: "rgba(33,150,243,0.16)",
                color: "#90CAF9",
                fontWeight: 600,
              }}
            />
          ))}
        </Stack>
      ),
    []
  );

  const transformTechnical = useMemo(
    () =>
      certificates.technical.map((entry) => ({
        id: entry.id ?? entry.title,
        title: entry.title,
        subtitle: `${entry.provider}${
          entry.issueDate ? ` • Issued ${entry.issueDate}` : ""
        }${entry.expiryDate ? ` • Expires ${entry.expiryDate}` : ""}`,
        description: entry.description,
        badge: entry.category,
        meta: [
          entry.difficulty
            ? {
                label: entry.difficulty,
                color: "rgba(33,150,243,0.18)",
                textColor: "#90CAF9",
              }
            : null,
          entry.status
            ? {
                label: entry.status,
                color: "rgba(76,175,80,0.22)",
                textColor: "#A5D6A7",
              }
            : null,
          entry.credentialId
            ? {
                label: entry.credentialId,
                color: "rgba(255,255,255,0.1)",
                textColor: "rgba(255,255,255,0.75)",
              }
            : null,
        ].filter(Boolean),
        metrics: [
          entry.studyHours
            ? `${formatNumber(entry.studyHours, {
                maximumFractionDigits: 0,
              })} study hours`
            : null,
          entry.examScore
            ? `Exam score ${toScoreString(entry.examScore, entry.maxScore)}`
            : null,
          entry.renewalRequired ? "Renewal required" : null,
        ].filter(Boolean),
        tags: entry.skills,
        links: [
          entry.certificateUrl
            ? {
                key: `${entry.id}-certificate`,
                label: "Certificate PDF",
                href: entry.certificateUrl,
                icon: <CloudDownload fontSize="small" />,
              }
            : null,
          entry.verificationUrl
            ? {
                key: `${entry.id}-verify`,
                label: "Verify credential",
                href: entry.verificationUrl,
                icon: <Launch fontSize="small" />,
              }
            : null,
        ].filter(Boolean),
      })),
    [certificates.technical, formatNumber, toScoreString]
  );

  const transformProfessional = useMemo(
    () =>
      certificates.professional.map((entry) => ({
        id: entry.id ?? entry.title,
        title: entry.title,
        subtitle: `${entry.provider}${
          entry.issueDate ? ` • ${entry.issueDate}` : ""
        }${entry.expiryDate ? ` → ${entry.expiryDate}` : ""}`,
        description: entry.description,
        badge: entry.category,
        meta: [
          entry.status
            ? {
                label: entry.status,
                color: "rgba(76,175,80,0.22)",
                textColor: "#A5D6A7",
              }
            : null,
          entry.renewalRequired
            ? {
                label: `${formatNumber(entry.renewalCredits ?? 0, {
                  maximumFractionDigits: 0,
                })} renewal credits`,
                color: "rgba(255,213,79,0.2)",
                textColor: "#FFE082",
              }
            : null,
        ].filter(Boolean),
        metrics: [
          entry.studyHours
            ? `${formatNumber(entry.studyHours, {
                maximumFractionDigits: 0,
              })} hour prep`
            : null,
        ].filter(Boolean),
        tags: entry.skills,
      })),
    [certificates.professional, formatNumber]
  );

  const transformEducational = useMemo(
    () =>
      certificates.educational.map((entry) => ({
        id: entry.id ?? entry.title,
        title: entry.title,
        subtitle: `${entry.provider}${
          entry.issueDate ? ` • Completed ${entry.issueDate}` : ""
        }`,
        description: entry.description,
        badge: entry.category,
        meta: [
          entry.status
            ? {
                label: entry.status,
                color: "rgba(33,150,243,0.18)",
                textColor: "#90CAF9",
              }
            : null,
          entry.grade
            ? {
                label: `Grade ${entry.grade}`,
                color: "rgba(76,175,80,0.22)",
                textColor: "#A5D6A7",
              }
            : null,
        ].filter(Boolean),
        metrics: [
          entry.studyHours
            ? `${formatNumber(entry.studyHours, {
                maximumFractionDigits: 0,
              })} hours of coursework`
            : null,
          entry.projectsCompleted
            ? `${formatNumber(entry.projectsCompleted, {
                maximumFractionDigits: 0,
              })} projects`
            : null,
          entry.coursesCompleted
            ? `${formatNumber(entry.coursesCompleted, {
                maximumFractionDigits: 0,
              })} courses`
            : null,
          entry.capstoneProject ? `Capstone • ${entry.capstoneProject}` : null,
        ].filter(Boolean),
        tags: entry.skills,
      })),
    [certificates.educational, formatNumber]
  );

  const transformSecurity = useMemo(
    () =>
      certificates.security.map((entry) => ({
        id: entry.id ?? entry.title,
        title: entry.title,
        subtitle: `${entry.provider}${
          entry.issueDate ? ` • ${entry.issueDate}` : ""
        }${entry.expiryDate ? ` → ${entry.expiryDate}` : ""}`,
        description: entry.description,
        badge: entry.category,
        meta: [
          entry.status
            ? {
                label: entry.status,
                color: "rgba(244,143,177,0.2)",
                textColor: "#F48FB1",
              }
            : null,
          entry.renewalRequired
            ? {
                label: "Renewal required",
                color: "rgba(255,213,79,0.2)",
                textColor: "#FFE082",
              }
            : null,
        ].filter(Boolean),
        metrics: [
          entry.studyHours
            ? `${formatNumber(entry.studyHours, {
                maximumFractionDigits: 0,
              })} hour prep`
            : null,
          entry.examScore
            ? `Exam score ${toScoreString(entry.examScore, entry.maxScore)}`
            : null,
        ].filter(Boolean),
        tags: entry.skills,
      })),
    [certificates.security, formatNumber, toScoreString]
  );

  const transformLanguage = useMemo(
    () =>
      certificates.language.map((entry) => ({
        id: entry.id ?? entry.title,
        title: entry.title,
        subtitle: `${entry.provider}${
          entry.issueDate ? ` • ${entry.issueDate}` : ""
        }${entry.expiryDate ? ` → ${entry.expiryDate}` : ""}`,
        description: entry.description,
        badge: entry.category,
        meta: [
          entry.status
            ? {
                label: entry.status,
                color: "rgba(129,212,250,0.18)",
                textColor: "#81D4FA",
              }
            : null,
          entry.overallScore
            ? {
                label: `Overall ${toScoreString(
                  entry.overallScore,
                  entry.maxScore
                )}`,
                color: "rgba(76,175,80,0.22)",
                textColor: "#A5D6A7",
              }
            : null,
        ].filter(Boolean),
        metrics: entry.bandScores
          ? Object.entries(entry.bandScores).map(
              ([skill, score]) =>
                `${skill}: ${formatNumber(score, { maximumFractionDigits: 1 })}`
            )
          : [],
      })),
    [certificates.language, formatNumber, toScoreString]
  );

  const onAdd = (sectionId) =>
    handleEdit?.("certificates", { section: sectionId, mode: "create" });
  const onEdit = (sectionId, payload) =>
    handleEdit?.("certificates", {
      section: sectionId,
      mode: "edit",
      item: payload,
    });
  const onDelete = (sectionId, payload) =>
    handleDelete?.("certificates", { section: sectionId, item: payload });

  const sections = useMemo(
    () => [
      {
        id: "technical",
        title: "Technical credentials",
        caption:
          "Cloud, DevOps, and platform certifications that reinforce engineering trust.",
        fullWidth: true,
        items: transformTechnical,
        renderItem: createRenderer("technical"),
      },
      {
        id: "professional",
        title: "Professional & leadership",
        caption:
          "Stakeholder, programme, and delivery mastery for enterprise settings.",
        items: transformProfessional,
        renderItem: createRenderer("professional"),
      },
      {
        id: "educational",
        title: "Academic & MOOCs",
        caption: "Courses and specialisations demonstrating ongoing learning.",
        items: transformEducational,
        renderItem: createRenderer("educational"),
      },
      {
        id: "security",
        title: "Security & compliance",
        caption:
          "Trust-building security achievements and continuous education.",
        items: transformSecurity,
        renderItem: createRenderer("security"),
      },
      {
        id: "language",
        title: "Language proficiency",
        caption: "Communication credentials supporting global collaboration.",
        items: transformLanguage,
        renderItem: createRenderer("language"),
      },
      {
        id: "categories",
        title: "Certification themes",
        caption: "Plan future credentials against strategic focus areas.",
        showCount: false,
        items: certificates.categories,
        renderItem: renderChipGroup("categories"),
      },
    ],
    [
      certificates.categories,
      transformTechnical,
      transformProfessional,
      transformEducational,
      transformSecurity,
      transformLanguage,
      createRenderer,
      renderChipGroup,
    ]
  );

  return (
    <ResourcePageTemplate
      header={{
        title: "Certificates & Credentials",
        subtitle:
          "Keep every credential at your fingertips, surface expiring achievements, and prove breadth instantly.",
        chips: [
          {
            label: "Credibility",
            color: "rgba(33,150,243,0.18)",
            textColor: "#90CAF9",
          },
          {
            label: "Up-to-date",
            color: "rgba(129,199,132,0.18)",
            textColor: "#C5E1A5",
          },
        ],
        buttons: [
          {
            label: "Log credential",
            icon: <WorkspacePremium fontSize="small" />,
            background: "#2196F3",
            hoverBackground: "#1E88E5",
            onClick: () =>
              handleEdit?.("certificates", {
                section: "technical",
                mode: "create",
              }),
          },
          {
            label: "Renewal dashboard",
            variant: "outlined",
            endIcon: <Schedule fontSize="small" />,
            onClick: () =>
              handleEdit?.("certificates", {
                section: "professional",
                mode: "renewals",
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

export default Certificates;
