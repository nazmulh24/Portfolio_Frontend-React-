import React, { useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Avatar,
  Box,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import {
  Person,
  Security,
  NotificationsActive,
  Link as LinkIcon,
  AutoFixHigh,
  Palette,
  Shield,
  VerifiedUser,
  AddCircleOutline,
  SettingsSuggest,
  Refresh,
} from "@mui/icons-material";
import ResourcePageTemplate from "../../components/dashboard/ResourcePageTemplate";

const Settings = () => {
  const outlet = useOutletContext?.() || {};
  const { dashboardData, handleEdit, handleDelete, handleSave } = outlet;

  const formatPercentage = useCallback(
    (value) => (typeof value === "number" ? `${value.toFixed(0)}%` : value),
    []
  );

  const formatNumber = useCallback(
    (value) => (typeof value === "number" ? value.toLocaleString() : value),
    []
  );

  const settings = useMemo(() => {
    const source = dashboardData?.settings ?? {};

    const fallbackProfile = {
      id: "profile-owner",
      name: "Nazmul Hossain",
      title: "Full-stack Developer & Product Strategist",
      headline:
        "Crafting resilient experiences that merge data, storytelling, and accessibility.",
      email: "hello@nazmul.dev",
      phone: "+880 1712-345678",
      location: "Dhaka, Bangladesh",
      avatar: "https://i.pravatar.cc/120?img=58",
      availability:
        "Responds to high-priority requests within 4 hours (Weekdays)",
      tags: ["Consulting", "Open Source", "Keynote Speaker"],
    };

    const fallbackSecurity = [
      {
        id: "security-mfa",
        title: "Multi-factor authentication",
        status: "Enforced",
        description: "Authy number matching on login, fallback hardware key",
        owner: "Security Office",
        lastReviewed: "2025-08-28",
        strength: 96,
      },
      {
        id: "security-passkeys",
        title: "Passkey vault",
        status: "Configured",
        description: "Hardware key + iCloud passkey synced across devices",
        owner: "Personal",
        lastReviewed: "2025-07-14",
        strength: 88,
      },
      {
        id: "security-audit",
        title: "Quarterly access review",
        status: "Scheduled",
        description:
          "Automated Notion reminder, Slack approvals for delegations",
        owner: "Operations",
        lastReviewed: "2025-09-05",
        strength: 72,
      },
    ];

    const fallbackNotifications = [
      {
        id: "notify-digest",
        channel: "Email digest",
        cadence: "Weekly",
        scope: "Product updates, launch notes, and community highlights",
        recipients: 1325,
        status: "Enabled",
        lastSent: "2025-09-20",
      },
      {
        id: "notify-slack",
        channel: "Slack workspace",
        cadence: "Real-time",
        scope: "Client escalations and deal desk approvals",
        recipients: 54,
        status: "Enabled",
        lastSent: "2025-09-25",
      },
      {
        id: "notify-sms",
        channel: "SMS",
        cadence: "Critical incidents only",
        scope: "Platform downtime & VIP travel alerts",
        recipients: 8,
        status: "Standby",
        lastSent: "2025-08-30",
      },
    ];

    const fallbackIntegrations = [
      {
        id: "integration-hubspot",
        name: "HubSpot",
        type: "CRM",
        status: "Connected",
        scope: "Contact enrichment, deal tracking",
        added: "2024-11-04",
        owner: "Revenue Ops",
      },
      {
        id: "integration-notion",
        name: "Notion",
        type: "Knowledge base",
        status: "Connected",
        scope: "Case studies, process docs, speaker assets",
        added: "2023-06-12",
        owner: "Content Studio",
      },
      {
        id: "integration-slack",
        name: "Slack",
        type: "Collaboration",
        status: "Connected",
        scope: "Alerts, channel automation, approvals",
        added: "2023-01-05",
        owner: "Client Success",
      },
      {
        id: "integration-figma",
        name: "Figma",
        type: "Design",
        status: "Under review",
        scope: "Brand system sync & component publishing",
        added: "2025-09-01",
        owner: "Brand Studio",
      },
    ];

    const fallbackAutomations = [
      {
        id: "automation-profile",
        name: "Profile sync",
        trigger: "CMS publish",
        action: "Update site hero + LinkedIn headline",
        status: "Active",
        coverage: 90,
        owner: "Marketing Ops",
      },
      {
        id: "automation-billing",
        name: "Billing escalations",
        trigger: "Invoice overdue 7 days",
        action: "Notify finance lead + follow-up sequence",
        status: "Active",
        coverage: 100,
        owner: "Finance",
      },
      {
        id: "automation-theme",
        name: "Theme rotation",
        trigger: "Seasonal campaign launch",
        action: "Swap accent palette + update CTA styling",
        status: "Planned",
        coverage: 25,
        owner: "Brand Studio",
      },
    ];

    const fallbackThemes = [
      {
        id: "theme-dashboard",
        name: "Dashboard suite",
        mode: "Auto (system)",
        accent: "#42A5F5",
        typography: "Inter",
        usage: "Analytics console, admin tools",
        lastEdited: "2025-08-22",
      },
      {
        id: "theme-public",
        name: "Public portfolio",
        mode: "Dark",
        accent: "#7E57C2",
        typography: "General Sans",
        usage: "Marketing site, landing pages",
        lastEdited: "2025-07-14",
      },
    ];

    const fallbackStats = {
      profileCompletion: 92,
      securityScore: 88,
      activeIntegrations: 5,
      automationRules: 7,
    };

    return {
      profile: source.profile ?? fallbackProfile,
      security: source.security ?? fallbackSecurity,
      notifications: source.notifications ?? fallbackNotifications,
      integrations: source.integrations ?? fallbackIntegrations,
      automations: source.automations ?? fallbackAutomations,
      themes: source.themes ?? fallbackThemes,
      stats: source.stats ?? fallbackStats,
    };
  }, [dashboardData]);

  const stats = useMemo(
    () => [
      {
        label: "Profile completeness",
        value: formatPercentage(settings.stats.profileCompletion),
        icon: <Person fontSize="small" />,
      },
      {
        label: "Security posture",
        value: formatPercentage(settings.stats.securityScore),
        icon: <Shield fontSize="small" />,
      },
      {
        label: "Integrations live",
        value: formatNumber(settings.stats.activeIntegrations),
        icon: <LinkIcon fontSize="small" />,
      },
      {
        label: "Automation rules",
        value: formatNumber(settings.stats.automationRules),
        icon: <AutoFixHigh fontSize="small" />,
      },
    ],
    [settings.stats, formatNumber, formatPercentage]
  );

  const quickActions = useMemo(
    () => [
      {
        label: "Update profile basics",
        description: "Refresh bio, titles, and social links across surfaces.",
        icon: <AddCircleOutline fontSize="small" />,
        ctaLabel: "Edit",
        onClick: () =>
          handleEdit?.("settings", { section: "profile", mode: "edit" }),
      },
      {
        label: "Rotate API keys",
        description: "Cycle credentials and notify downstream services.",
        icon: <Refresh fontSize="small" />,
        ctaLabel: "Rotate",
        onClick: () =>
          handleEdit?.("settings", { section: "security", mode: "rotate" }),
      },
      {
        label: "Tune notifications",
        description: "Adjust cadence, audiences, and escalation rules.",
        icon: <NotificationsActive fontSize="small" />,
        ctaLabel: "Configure",
        onClick: () =>
          handleEdit?.("settings", {
            section: "notifications",
            mode: "configure",
          }),
      },
    ],
    [handleEdit]
  );

  const renderProfile = useCallback(
    (items, handlers) => (
      <Stack spacing={2.5}>
        {items.map((profile) => (
          <Stack
            key={profile.id}
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            alignItems={{ xs: "flex-start", sm: "center" }}
            onClick={() => handlers.onEdit?.("profile", profile)}
            sx={{
              p: 3,
              borderRadius: 3,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
              transition: "border-color 160ms ease",
              "&:hover": {
                borderColor: "rgba(144,202,249,0.35)",
              },
            }}
          >
            <Avatar
              src={profile.avatar}
              sx={{ width: 72, height: 72, border: "2px solid #64B5F6" }}
            />
            <Stack spacing={1} flex={1}>
              <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: 18 }}>
                {profile.name}
              </Typography>
              <Typography
                sx={{ color: "rgba(255,255,255,0.72)", fontSize: 14 }}
              >
                {profile.title}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                {profile.headline}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip
                  label={profile.email}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(144,202,249,0.18)",
                    color: "#90CAF9",
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={profile.phone}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(129,199,132,0.18)",
                    color: "#A5D6A7",
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={profile.location}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 600,
                  }}
                />
              </Stack>
              <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                {profile.availability}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {profile.tags?.map((tag) => (
                  <Chip
                    key={`${profile.id}-tag-${tag}`}
                    label={tag}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255,213,79,0.18)",
                      color: "#FFE082",
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Stack>
    ),
    []
  );

  const renderSecurity = useCallback(
    (items, handlers) => (
      <Stack spacing={2}>
        {items.map((control) => (
          <Box
            key={control.id}
            onClick={() => handlers.onEdit?.("security", control)}
            sx={{
              p: 2.75,
              borderRadius: 3,
              background: "rgba(13,18,28,0.88)",
              border: "1px solid rgba(255,255,255,0.06)",
              cursor: "pointer",
              transition: "border-color 160ms ease",
              "&:hover": {
                borderColor: "rgba(129,199,132,0.32)",
              },
            }}
          >
            <Stack spacing={1.25}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Security sx={{ color: "#90CAF9" }} />
                  <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                    {control.title}
                  </Typography>
                </Stack>
                <Chip
                  label={control.status}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(129,199,132,0.18)",
                    color: "#A5D6A7",
                    fontWeight: 600,
                  }}
                />
              </Stack>
              <Typography
                sx={{ color: "rgba(255,255,255,0.62)", fontSize: 13 }}
              >
                {control.description}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  sx={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}
                >
                  Owner · {control.owner}
                </Typography>
                <Typography
                  sx={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}
                >
                  Last reviewed {control.lastReviewed}
                </Typography>
              </Stack>
              <Stack spacing={0.5} alignItems="flex-start">
                <Typography
                  sx={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}
                >
                  Strength score {formatPercentage(control.strength)}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={control.strength}
                  sx={{
                    width: 180,
                    height: 6,
                    borderRadius: 999,
                    backgroundColor: "rgba(255,255,255,0.08)",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#81C784",
                    },
                  }}
                />
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    ),
    [formatPercentage]
  );

  const renderNotifications = useCallback(
    (items, handlers) => (
      <Stack spacing={2}>
        {items.map((notification) => (
          <Box
            key={notification.id}
            onClick={() => handlers.onEdit?.("notifications", notification)}
            sx={{
              p: 2.5,
              borderRadius: 3,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              cursor: "pointer",
              transition: "border-color 160ms ease",
              "&:hover": {
                borderColor: "rgba(144,202,249,0.35)",
              },
            }}
          >
            <Stack spacing={1.25}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <NotificationsActive sx={{ color: "#FFD54F" }} />
                  <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                    {notification.channel}
                  </Typography>
                </Stack>
                <Chip
                  label={notification.status}
                  size="small"
                  sx={{
                    backgroundColor:
                      notification.status === "Standby"
                        ? "rgba(255,213,79,0.18)"
                        : "rgba(129,199,132,0.18)",
                    color:
                      notification.status === "Standby" ? "#FFD54F" : "#A5D6A7",
                    fontWeight: 600,
                  }}
                />
              </Stack>
              <Typography
                sx={{ color: "rgba(255,255,255,0.63)", fontSize: 13 }}
              >
                {notification.scope}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  sx={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}
                >
                  Cadence · {notification.cadence}
                </Typography>
                <Typography
                  sx={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}
                >
                  Recipients · {formatNumber(notification.recipients)}
                </Typography>
                <Typography
                  sx={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}
                >
                  Last sent {notification.lastSent}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    ),
    [formatNumber]
  );

  const renderIntegrations = useCallback(
    (items, handlers) => (
      <Stack spacing={2}>
        {items.map((integration) => (
          <Box
            key={integration.id}
            onClick={() => handlers.onEdit?.("integrations", integration)}
            sx={{
              p: 2.5,
              borderRadius: 3,
              background: "rgba(10,20,30,0.88)",
              border: "1px solid rgba(255,255,255,0.05)",
              cursor: "pointer",
              transition: "border-color 160ms ease",
              "&:hover": {
                borderColor: "rgba(129,199,132,0.32)",
              },
            }}
          >
            <Stack spacing={1.25}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <LinkIcon sx={{ color: "#90CAF9" }} />
                  <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                    {integration.name}
                  </Typography>
                  <Chip
                    label={integration.type}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.7)",
                      fontWeight: 600,
                    }}
                  />
                </Stack>
                <Chip
                  label={integration.status}
                  size="small"
                  sx={{
                    backgroundColor:
                      integration.status === "Under review"
                        ? "rgba(255,213,79,0.18)"
                        : "rgba(129,199,132,0.18)",
                    color:
                      integration.status === "Under review"
                        ? "#FFD54F"
                        : "#A5D6A7",
                    fontWeight: 600,
                  }}
                />
              </Stack>
              <Typography
                sx={{ color: "rgba(255,255,255,0.62)", fontSize: 13 }}
              >
                {integration.scope}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  sx={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}
                >
                  Added {integration.added}
                </Typography>
                <Typography
                  sx={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}
                >
                  Owner · {integration.owner}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    ),
    []
  );

  const renderAutomations = useCallback(
    (items, handlers) => (
      <Stack spacing={2}>
        {items.map((automation) => (
          <Box
            key={automation.id}
            onClick={() => handlers.onEdit?.("automations", automation)}
            sx={{
              p: 2.5,
              borderRadius: 3,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              cursor: "pointer",
              transition: "border-color 160ms ease",
              "&:hover": {
                borderColor: "rgba(255,213,79,0.35)",
              },
            }}
          >
            <Stack spacing={1.25}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" spacing={1.25} alignItems="center">
                  <AutoFixHigh sx={{ color: "#FFD54F" }} />
                  <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                    {automation.name}
                  </Typography>
                </Stack>
                <Chip
                  label={automation.status}
                  size="small"
                  sx={{
                    backgroundColor:
                      automation.status === "Planned"
                        ? "rgba(255,213,79,0.18)"
                        : "rgba(129,199,132,0.18)",
                    color:
                      automation.status === "Planned" ? "#FFD54F" : "#A5D6A7",
                    fontWeight: 600,
                  }}
                />
              </Stack>
              <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
                Trigger · {automation.trigger}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
                Action · {automation.action}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  sx={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}
                >
                  Owner · {automation.owner}
                </Typography>
                <Box sx={{ flex: 1 }} />
                <Stack spacing={0.5} alignItems="flex-end">
                  <Typography
                    sx={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}
                  >
                    Coverage {formatPercentage(automation.coverage)}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={automation.coverage}
                    sx={{
                      width: 120,
                      height: 6,
                      borderRadius: 999,
                      backgroundColor: "rgba(255,255,255,0.08)",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#64B5F6",
                      },
                    }}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    ),
    [formatPercentage]
  );

  const renderThemes = useCallback(
    (items, handlers) => (
      <Stack spacing={2}>
        {items.map((theme) => (
          <Box
            key={theme.id}
            onClick={() => handlers.onEdit?.("themes", theme)}
            sx={{
              p: 2.5,
              borderRadius: 3,
              background: "rgba(10,20,30,0.9)",
              border: "1px solid rgba(255,255,255,0.06)",
              cursor: "pointer",
              transition: "border-color 160ms ease",
              "&:hover": {
                borderColor: "rgba(144,202,249,0.35)",
              },
            }}
          >
            <Stack spacing={1.25}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Palette sx={{ color: theme.accent }} />
                <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                  {theme.name}
                </Typography>
                <Chip
                  label={theme.mode}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 600,
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 42,
                    height: 18,
                    borderRadius: 999,
                    backgroundColor: theme.accent,
                    boxShadow: `0 0 12px ${theme.accent}66`,
                  }}
                />
                <Typography
                  sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}
                >
                  Accent {theme.accent}
                </Typography>
                <Typography
                  sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}
                >
                  Typeface {theme.typography}
                </Typography>
              </Stack>
              <Typography
                sx={{ color: "rgba(255,255,255,0.62)", fontSize: 13 }}
              >
                {theme.usage}
              </Typography>
              <Typography
                sx={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}
              >
                Last edited {theme.lastEdited}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    ),
    []
  );

  const onAdd = (sectionId) =>
    handleEdit?.("settings", { section: sectionId, mode: "create" });
  const onEdit = (sectionId, payload) =>
    handleEdit?.("settings", {
      section: sectionId,
      mode: "edit",
      item: payload,
    });
  const onDelete = (sectionId, payload) =>
    handleDelete?.("settings", { section: sectionId, item: payload });

  const sections = useMemo(
    () => [
      {
        id: "profile",
        title: "Profile snapshot",
        caption:
          "Single source of truth for personal branding and contact data.",
        fullWidth: true,
        showCount: false,
        items: [settings.profile],
        renderItem: renderProfile,
      },
      {
        id: "security",
        title: "Security controls",
        caption: "Track authentication policies and review cadence.",
        items: settings.security,
        renderItem: renderSecurity,
      },
      {
        id: "notifications",
        title: "Notification programs",
        caption: "Define how audiences stay informed across channels.",
        items: settings.notifications,
        renderItem: renderNotifications,
      },
      {
        id: "integrations",
        title: "Connected services",
        caption: "Audit data flows and ownership across the stack.",
        items: settings.integrations,
        renderItem: renderIntegrations,
      },
      {
        id: "automations",
        title: "Automation rules",
        caption: "Keep routine workflows sharp and measurable.",
        items: settings.automations,
        renderItem: renderAutomations,
      },
      {
        id: "themes",
        title: "Theme presets",
        caption: "Brand-safe palettes powering every surface you ship.",
        showCount: false,
        items: settings.themes,
        renderItem: renderThemes,
      },
    ],
    [
      settings.profile,
      settings.security,
      settings.notifications,
      settings.integrations,
      settings.automations,
      settings.themes,
      renderProfile,
      renderSecurity,
      renderNotifications,
      renderIntegrations,
      renderAutomations,
      renderThemes,
    ]
  );

  return (
    <ResourcePageTemplate
      header={{
        title: "Settings & Governance",
        subtitle:
          "Orchestrate profile, security, and automation in one orchestrated hub—ready for audits or lightning-fast pivots.",
        chips: [
          {
            label: "Operations",
            color: "rgba(129,199,132,0.18)",
            textColor: "#A5D6A7",
          },
          {
            label: "Controls",
            color: "rgba(144,202,249,0.18)",
            textColor: "#90CAF9",
          },
        ],
        buttons: [
          {
            label: "Launch audit mode",
            icon: <VerifiedUser fontSize="small" />,
            background: "#42A5F5",
            hoverBackground: "#64B5F6",
            onClick: () =>
              handleSave?.("settings-audit", {
                timestamp: new Date().toISOString(),
              }),
          },
          {
            label: "Adjust policies",
            variant: "outlined",
            endIcon: <SettingsSuggest fontSize="small" />,
            onClick: () =>
              handleEdit?.("settings", { section: "security", mode: "policy" }),
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

export default Settings;
