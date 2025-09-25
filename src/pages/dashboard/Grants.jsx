import React, { useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Chip, LinearProgress, Stack, Typography } from "@mui/material";
import {
  MonetizationOn,
  PendingActions,
  ThumbUpAlt,
  TrendingUp,
  AddCircleOutline,
  Timeline,
  Launch,
} from "@mui/icons-material";
import ResourcePageTemplate from "../../components/dashboard/ResourcePageTemplate";

const Grants = () => {
  const outlet = useOutletContext?.() || {};
  const { dashboardData, handleEdit, handleDelete, handleSave } = outlet;

  const formatCurrency = useCallback(
    (value) =>
      typeof value === "number"
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
          }).format(value)
        : value,
    []
  );

  const grants = useMemo(() => {
    const source = dashboardData?.grants ?? {};

    const fallbackActive = [
      {
        id: "nsf-healthcare",
        title: "AI-Powered Healthcare Analytics",
        sponsor: "National Science Foundation",
        program: "CISE",
        number: "NSF-1847392",
        amount: 285000,
        category: "Research Grant",
        field: "Computer Science",
        start: "2023-09-01",
        end: "2026-08-31",
        durationMonths: 36,
        progress: 65,
        summary:
          "Building interpretable ML pipelines for real-time clinical decision support systems.",
        team: {
          pi: "Dr. Nazmul Hossain",
          coInvestigators: ["Dr. Sarah Johnson", "Dr. Michael Chen"],
        },
        budget: {
          personnel: 180000,
          equipment: 45000,
          travel: 15000,
          supplies: 25000,
          indirect: 20000,
        },
        milestones: [
          {
            label: "Prototype implementation",
            status: "In progress",
            due: "2024-09-30",
          },
          { label: "Clinical testing", status: "Upcoming", due: "2025-01-15" },
        ],
        outputs: {
          publications: 3,
          students: 4,
          objectives: [
            "Deploy real-time analytics pipeline",
            "Publish 8 peer-reviewed papers",
            "File two patent disclosures",
          ],
        },
      },
      {
        id: "doe-sustainability",
        title: "Sustainable Web Technologies Initiative",
        sponsor: "Department of Energy",
        program: "EERE",
        number: "DOE-5634",
        amount: 125000,
        category: "Innovation Grant",
        field: "Green Technology",
        start: "2024-01-15",
        end: "2025-12-31",
        durationMonths: 24,
        progress: 45,
        summary:
          "Optimising digital products to reduce operational carbon footprint and energy usage.",
        team: {
          pi: "Dr. Nazmul Hossain",
          coInvestigators: ["Dr. Emily Rodriguez"],
        },
        budget: {
          personnel: 85000,
          equipment: 20000,
          travel: 8000,
          supplies: 7000,
          indirect: 5000,
        },
        milestones: [
          {
            label: "Tooling beta release",
            status: "In progress",
            due: "2024-10-15",
          },
          { label: "Industry pilots", status: "Upcoming", due: "2025-03-01" },
        ],
        outputs: {
          publications: 1,
          students: 2,
          objectives: [
            "Publish sustainability playbook",
            "Train 100 developers",
            "Open-source measurement toolkit",
          ],
        },
      },
    ];

    const fallbackCompleted = [
      {
        id: "psf-django",
        title: "Django Framework Enhancement",
        sponsor: "Python Software Foundation",
        program: "Community Development",
        amount: 35000,
        category: "Community Grant",
        year: "2022-2023",
        highlights: [
          "5 core contributions merged",
          "Average performance +25%",
          "Security advisories resolved",
        ],
        impact: [
          "Reached 25k community members",
          "Delivered 2 global conference talks",
          "Released comprehensive docs refresh",
        ],
        reportUrl: "https://example.com/django-enhancement-final-report.pdf",
      },
      {
        id: "gates-edtech",
        title: "Educational Technology Innovation",
        sponsor: "Gates Foundation",
        program: "Digital Learning Solutions",
        amount: 95000,
        category: "Education Grant",
        year: "2021-2022",
        highlights: [
          "Launched interactive coding lab",
          "5k students onboarded across 50 institutions",
          "Engagement uplift of 40%",
        ],
        impact: [
          "Learning outcomes improved by 35%",
          "Open-source adoption across 12 districts",
          "Four publications in education tech journals",
        ],
        reportUrl: "https://example.com/edtech-innovation-final-report.pdf",
      },
    ];

    const fallbackPending = [
      {
        id: "nsa-quantum",
        title: "Quantum Computing for Web Security",
        sponsor: "National Security Agency",
        program: "Cybersecurity Research Initiative",
        requested: 450000,
        submitted: "2024-08-15",
        decision: "2025-02-15",
        stage: "Technical review",
        probability: "High",
        status: "Under review",
        notes:
          "Panel noted strong technical merit; requested expanded deployment roadmap for government systems.",
      },
      {
        id: "mozilla-ethics",
        title: "AI Ethics & Transparency Framework",
        sponsor: "Mozilla Foundation",
        program: "Responsible AI Initiative",
        requested: 180000,
        submitted: "2024-09-10",
        decision: "2025-01-10",
        stage: "Initial review",
        probability: "Medium",
        status: "Submitted",
        notes:
          "Meets criteria with compelling case studies; reviewers flagged competitive cohort for final round.",
      },
    ];

    const fallbackRejected = [
      {
        id: "erc-blockchain",
        title: "Blockchain Identity Management",
        sponsor: "European Research Council",
        program: "Digital Innovation Grants",
        requested: 320000,
        decision: "2024-07-15",
        status: "Rejected",
        lesson:
          "Scope considered ambitious relative to timeline. Rescoping MVP for Q1 2025 resubmission with municipal partner.",
      },
    ];

    const fallbackStats = {
      totalFunding: 540000,
      activeFunding: 410000,
      completedFunding: 130000,
      pendingApps: 2,
      successRate: 75,
      avgGrant: 192500,
      studentsSupported: 12,
      publications: 10,
      patents: 2,
    };

    const fallbackCategories = [
      "Research Grant",
      "Innovation Grant",
      "Community Grant",
      "Education Grant",
      "Security Research",
      "Ethics Research",
      "Technology Development",
      "Industry Partnership",
    ];

    return {
      active: source.activeGrants ?? fallbackActive,
      completed: source.completedGrants ?? fallbackCompleted,
      pending: source.pendingApplications ?? fallbackPending,
      rejected: source.rejectedApplications ?? fallbackRejected,
      stats: source.grantStats ?? fallbackStats,
      categories: source.fundingCategories ?? fallbackCategories,
    };
  }, [dashboardData]);

  const stats = useMemo(
    () => [
      {
        label: "Total funding",
        value: formatCurrency(grants.stats.totalFunding),
        icon: <MonetizationOn fontSize="small" />,
      },
      {
        label: "Success rate",
        value: `${grants.stats.successRate}%`,
        icon: <ThumbUpAlt fontSize="small" />,
      },
      {
        label: "Pending decisions",
        value: grants.stats.pendingApps,
        icon: <PendingActions fontSize="small" />,
      },
      {
        label: "Students supported",
        value: grants.stats.studentsSupported,
        icon: <TrendingUp fontSize="small" />,
      },
    ],
    [grants.stats, formatCurrency]
  );

  const quickActions = useMemo(
    () => [
      {
        label: "Register new grant",
        description:
          "Capture sponsor details, budget structure, and milestones.",
        icon: <AddCircleOutline fontSize="small" />,
        ctaLabel: "Create",
        onClick: () =>
          handleEdit?.("grants", { section: "active", mode: "create" }),
      },
      {
        label: "Update pipeline",
        description: "Log review feedback and adjust resubmission plans.",
        icon: <Timeline fontSize="small" />,
        ctaLabel: "Review",
        onClick: () =>
          handleEdit?.("grants", { section: "pipeline", mode: "edit" }),
      },
      {
        label: "Export portfolio",
        description:
          "Generate summary for investors or departmental reporting.",
        icon: <Launch fontSize="small" />,
        ctaLabel: "Export",
        onClick: () => handleSave?.("grants-export", {}),
      },
    ],
    [handleEdit, handleSave]
  );

  const renderActiveGrants = useCallback(
    (items, handlers) => (
      <Stack spacing={3}>
        {items.map((grant) => (
          <Box
            key={grant.id}
            onClick={() => handlers.onEdit?.("active", grant)}
            sx={{
              p: 3,
              borderRadius: 3,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
              transition: "border-color 160ms ease, transform 160ms ease",
              "&:hover": {
                borderColor: "rgba(129,199,132,0.4)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Box>
                  <Typography
                    sx={{ color: "#fff", fontWeight: 600, fontSize: 16 }}
                  >
                    {grant.title}
                  </Typography>
                  <Typography
                    sx={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}
                  >
                    {grant.sponsor} • {grant.program}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={grant.category}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(79,195,247,0.18)",
                      color: "#81D4FA",
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    label={formatCurrency(grant.amount)}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255,213,79,0.18)",
                      color: "#FFE082",
                      fontWeight: 600,
                    }}
                  />
                </Stack>
              </Stack>

              <Typography
                sx={{ color: "rgba(255,255,255,0.68)", fontSize: 13 }}
              >
                {grant.summary}
              </Typography>

              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}
                  >
                    {grant.start} → {grant.end} ({grant.durationMonths} months)
                  </Typography>
                  <Typography
                    sx={{ color: "#A5D6A7", fontWeight: 600, fontSize: 13 }}
                  >
                    {grant.progress}% complete
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={grant.progress}
                  sx={{
                    height: 6,
                    borderRadius: 999,
                    backgroundColor: "rgba(255,255,255,0.08)",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#81C784",
                    },
                  }}
                />
              </Stack>

              <Stack spacing={1.25}>
                <Typography
                  sx={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}
                >
                  PI: {grant.team.pi}
                </Typography>
                {grant.team.coInvestigators?.length ? (
                  <Typography
                    sx={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}
                  >
                    Co-Is: {grant.team.coInvestigators.join(", ")}
                  </Typography>
                ) : null}
              </Stack>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                {grant.outputs.objectives?.map((objective) => (
                  <Chip
                    key={`${grant.id}-${objective}`}
                    label={objective}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(156,204,101,0.18)",
                      color: "#C5E1A5",
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Stack>

              <Stack spacing={0.75}>
                {grant.milestones.map((milestone, index) => (
                  <Typography
                    key={`${grant.id}-milestone-${index}`}
                    sx={{ color: "rgba(255,255,255,0.6)", fontSize: 12.5 }}
                  >
                    • {milestone.label} — {milestone.status} (due{" "}
                    {milestone.due})
                  </Typography>
                ))}
              </Stack>

              <Stack direction="row" spacing={2}>
                <Typography
                  sx={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}
                >
                  Publications: {grant.outputs.publications}
                </Typography>
                <Typography
                  sx={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}
                >
                  Students: {grant.outputs.students}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    ),
    [formatCurrency]
  );

  const renderCompletedGrants = useCallback(
    (items, handlers) => (
      <Stack spacing={2.5}>
        {items.map((grant) => (
          <Box
            key={grant.id}
            onClick={() => handlers.onEdit?.("completed", grant)}
            sx={{
              p: 3,
              borderRadius: 3,
              background: "rgba(33,33,33,0.55)",
              border: "1px solid rgba(255,255,255,0.07)",
              cursor: "pointer",
              transition: "border-color 160ms ease, transform 160ms ease",
              "&:hover": {
                borderColor: "rgba(144,202,249,0.4)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Stack spacing={1.5}>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Box>
                  <Typography
                    sx={{ color: "#fff", fontWeight: 600, fontSize: 16 }}
                  >
                    {grant.title}
                  </Typography>
                  <Typography
                    sx={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}
                  >
                    {grant.sponsor} • {grant.program}
                  </Typography>
                </Box>
                <Chip
                  label={`${grant.year}`}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(129,199,132,0.18)",
                    color: "#C5E1A5",
                    fontWeight: 600,
                  }}
                />
              </Stack>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                {grant.highlights.map((highlight) => (
                  <Chip
                    key={`${grant.id}-highlight-${highlight}`}
                    label={highlight}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(33,150,243,0.18)",
                      color: "#90CAF9",
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Stack>

              <Stack spacing={0.75}>
                {grant.impact.map((detail, index) => (
                  <Typography
                    key={`${grant.id}-impact-${index}`}
                    sx={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}
                  >
                    • {detail}
                  </Typography>
                ))}
              </Stack>

              {grant.reportUrl && (
                <Typography
                  onClick={(event) => {
                    event.stopPropagation();
                    window.open(grant.reportUrl, "_blank", "noopener");
                  }}
                  sx={{
                    color: "#90CAF9",
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: "pointer",
                    textDecoration: "underline",
                    width: "fit-content",
                  }}
                >
                  View final report ↗
                </Typography>
              )}
            </Stack>
          </Box>
        ))}
      </Stack>
    ),
    []
  );

  const renderPipeline = useCallback(
    (items, handlers) => (
      <Stack spacing={2.5}>
        {items.map((application) => (
          <Box
            key={application.id}
            onClick={() => handlers.onEdit?.("pipeline", application)}
            sx={{
              p: 3,
              borderRadius: 3,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
              transition: "border-color 160ms ease, transform 160ms ease",
              "&:hover": {
                borderColor: "rgba(255,213,79,0.35)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Stack spacing={1.5}>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Box>
                  <Typography
                    sx={{ color: "#fff", fontWeight: 600, fontSize: 16 }}
                  >
                    {application.title}
                  </Typography>
                  <Typography
                    sx={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}
                  >
                    {application.sponsor} • {application.program}
                  </Typography>
                </Box>
                <Chip
                  label={application.status}
                  size="small"
                  sx={{
                    backgroundColor:
                      application.status === "Rejected"
                        ? "rgba(244,143,177,0.2)"
                        : "rgba(255,213,79,0.2)",
                    color:
                      application.status === "Rejected" ? "#F48FB1" : "#FFD54F",
                    fontWeight: 600,
                  }}
                />
              </Stack>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip
                  label={`Requested ${formatCurrency(application.requested)}`}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(79,195,247,0.18)",
                    color: "#81D4FA",
                    fontWeight: 600,
                  }}
                />
                {application.stage && (
                  <Chip
                    label={application.stage}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(179,157,219,0.18)",
                      color: "#B39DDB",
                      fontWeight: 600,
                    }}
                  />
                )}
                {application.probability && (
                  <Chip
                    label={`${application.probability} probability`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(158,204,101,0.18)",
                      color: "#C5E1A5",
                      fontWeight: 600,
                    }}
                  />
                )}
              </Stack>

              <Typography
                sx={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}
              >
                Submitted {application.submitted} • Decision expected{" "}
                {application.decision}
              </Typography>

              <Typography
                sx={{ color: "rgba(255,255,255,0.62)", fontSize: 13 }}
              >
                {application.notes}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    ),
    [formatCurrency]
  );

  const renderCategories = useCallback(
    (items, handlers) => (
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {items.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => handlers.onEdit?.("categories", category)}
            sx={{
              backgroundColor: "rgba(144,202,249,0.18)",
              color: "#BBDEFB",
              fontWeight: 600,
            }}
          />
        ))}
      </Stack>
    ),
    []
  );

  const onAdd = (sectionId) =>
    handleEdit?.("grants", { section: sectionId, mode: "create" });
  const onEdit = (sectionId, payload) =>
    handleEdit?.("grants", { section: sectionId, mode: "edit", item: payload });
  const onDelete = (sectionId, payload) =>
    handleDelete?.("grants", { section: sectionId, item: payload });

  const sections = useMemo(
    () => [
      {
        id: "active",
        title: "Active awards",
        caption: "Live funding streams with deliverables in motion.",
        items: grants.active,
        fullWidth: true,
        renderItem: renderActiveGrants,
      },
      {
        id: "completed",
        title: "Completed projects",
        caption: "Closed grants with published outcomes and impact.",
        items: grants.completed,
        renderItem: renderCompletedGrants,
      },
      {
        id: "pipeline",
        title: "Application pipeline",
        caption:
          "Pending submissions, review feedback, and resubmission plans.",
        items: [...grants.pending, ...grants.rejected],
        renderItem: renderPipeline,
      },
      {
        id: "categories",
        title: "Funding categories",
        caption: "Domains and grant types that align with research strategy.",
        items: grants.categories,
        renderItem: renderCategories,
        showCount: false,
      },
    ],
    [
      grants.active,
      grants.completed,
      grants.pending,
      grants.rejected,
      grants.categories,
      renderActiveGrants,
      renderCompletedGrants,
      renderPipeline,
      renderCategories,
    ]
  );

  return (
    <ResourcePageTemplate
      header={{
        title: "Funding Operations",
        subtitle:
          "Monitor research capital, track deliverables, and keep the grant pipeline healthy in one consolidated workspace.",
        chips: [
          {
            label: "Research",
            color: "rgba(129,199,132,0.16)",
            textColor: "#C5E1A5",
          },
          {
            label: "Funding",
            color: "rgba(144,202,249,0.18)",
            textColor: "#BBDEFB",
          },
        ],
        buttons: [
          {
            label: "Add award",
            icon: <AddCircleOutline fontSize="small" />,
            background: "#66BB6A",
            hoverBackground: "#81C784",
            onClick: () =>
              handleEdit?.("grants", { section: "active", mode: "create" }),
          },
          {
            label: "Sync milestones",
            variant: "outlined",
            onClick: () =>
              handleEdit?.("grants", { section: "active", mode: "sync" }),
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

export default Grants;
