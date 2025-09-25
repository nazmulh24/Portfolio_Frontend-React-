import React, { useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Avatar,
  Box,
  Chip,
  Stack,
  Typography,
  LinearProgress,
} from "@mui/material";
import {
  Email,
  AccessTime,
  SentimentVerySatisfied,
  Bolt,
  AddCircleOutline,
  CalendarMonth,
  SupportAgent,
  Phone,
  Launch,
  Sync,
} from "@mui/icons-material";
import ResourcePageTemplate from "../../components/dashboard/ResourcePageTemplate";

const Contact = () => {
  const outlet = useOutletContext?.() || {};
  const { dashboardData, handleEdit, handleDelete, handleSave } = outlet;

  const formatNumber = useCallback(
    (value) =>
      typeof value === "number"
        ? value.toLocaleString(undefined, {
            maximumFractionDigits: value % 1 === 0 ? 0 : 1,
          })
        : value,
    []
  );

  const formatPercentage = useCallback(
    (value) => (typeof value === "number" ? `${value.toFixed(0)}%` : value),
    []
  );

  const contact = useMemo(() => {
    const source = dashboardData?.contact ?? {};

    const fallbackChannels = [
      {
        id: "channel-email",
        label: "General inquiries",
        channel: "Email",
        endpoint: "hello@nazmul.dev",
        purpose: "Client engagements, partnerships, open calls",
        status: "Live",
        slaHours: 12,
        owner: "Nazmul Hossain",
        lastReviewed: "2025-08-12",
        tags: ["Primary", "High-volume"],
      },
      {
        id: "channel-consult",
        label: "Consultation requests",
        channel: "Scheduling portal",
        endpoint: "cal.com/nazmul/intro",
        purpose: "Discovery calls, coaching, advisory sessions",
        status: "Live",
        slaHours: 4,
        owner: "Operations Desk",
        lastReviewed: "2025-09-01",
        tags: ["Calendar", "Auto-confirm"],
      },
      {
        id: "channel-press",
        label: "Media & press",
        channel: "Direct line",
        endpoint: "+1 (415) 555-8923",
        purpose: "Media interviews, keynote briefings",
        status: "Escalated",
        slaHours: 2,
        owner: "Press Relations",
        lastReviewed: "2025-07-28",
        tags: ["Priority", "24/7"],
      },
    ];

    const fallbackAvailability = [
      {
        id: "avail-mon",
        day: "Monday",
        slots: ["09:00 – 12:00", "14:00 – 17:00"],
        timezone: "GMT+06",
        notes: "Internal focus in the morning, external calls afternoon",
      },
      {
        id: "avail-wed",
        day: "Wednesday",
        slots: ["10:00 – 16:00"],
        timezone: "GMT+06",
        notes: "Preferred day for new client discovery sessions",
      },
      {
        id: "avail-fri",
        day: "Friday",
        slots: ["11:00 – 15:00"],
        timezone: "GMT+06",
        notes: "Content planning in the afternoon; limited availability",
      },
    ];

    const fallbackEscalations = [
      {
        id: "escalation-ops",
        name: "Anika Rahman",
        role: "Client Success Lead",
        focus: "Enterprise onboarding, strategic partnerships",
        contact: "anika@nazmul.dev",
        timezone: "GMT+06",
        avatar: "https://i.pravatar.cc/120?img=47",
        primaryChannel: "Slack Connect",
      },
      {
        id: "escalation-tech",
        name: "Rafi Chowdhury",
        role: "Solutions Architect",
        focus: "Implementation blockers, technical deep dives",
        contact: "rafi@nazmul.dev",
        timezone: "GMT+06",
        avatar: "https://i.pravatar.cc/120?img=12",
        primaryChannel: "Zoom, PagerDuty",
      },
    ];

    const fallbackAutomations = [
      {
        id: "automation-intake",
        name: "Intake triage",
        trigger: "New Typeform submission",
        action: "Tag by intent & push to HubSpot pipeline",
        owner: "Automation Suite",
        coverage: 78,
        status: "Enabled",
      },
      {
        id: "automation-slack",
        name: "Slack alerting",
        trigger: "VIP domain detected",
        action: "Notify operations war-room channel",
        owner: "Client Success",
        coverage: 100,
        status: "Enabled",
      },
      {
        id: "automation-outofoffice",
        name: "Out of office sync",
        trigger: "Calendar PTO event",
        action: "Update auto-replies, adjust SLA targets",
        owner: "People Ops",
        coverage: 60,
        status: "Planned",
      },
    ];

    const fallbackPlaybooks = [
      {
        id: "playbook-general",
        title: "Initial inquiry reply",
        intent: "General",
        tone: "Warm, consultative",
        steps: [
          "Acknowledge inquiry and share 24h response expectation",
          "Link portfolio case studies tailored to requester",
          "Offer 30-minute discovery session booking link",
        ],
        lastUpdated: "2025-08-17",
      },
      {
        id: "playbook-speaking",
        title: "Speaking engagement reply",
        intent: "Speaking",
        tone: "Executive, concise",
        steps: [
          "Request event details & audience size",
          "Share keynote topics and fee structure overview",
          "Route to operations for contract finalization",
        ],
        lastUpdated: "2025-07-29",
      },
      {
        id: "playbook-support",
        title: "Support escalation",
        intent: "Support",
        tone: "Reassuring, precise",
        steps: [
          "Acknowledge urgency and gather reproduction steps",
          "Log ticket in Linear with priority label",
          "Assign on-call engineer and confirm ETA",
        ],
        lastUpdated: "2025-09-02",
      },
    ];

    const fallbackStats = {
      inboundPerWeek: 46,
      avgResponseHours: 5.3,
      satisfaction: 97,
      automationCoverage: 72,
      activeConversations: 14,
    };

    return {
      channels: source.primaryChannels ?? fallbackChannels,
      availability: source.availability ?? fallbackAvailability,
      escalations: source.escalationContacts ?? fallbackEscalations,
      automations: source.automations ?? fallbackAutomations,
      playbooks: source.playbooks ?? fallbackPlaybooks,
      stats: source.stats ?? fallbackStats,
    };
  }, [dashboardData]);

  const stats = useMemo(
    () => [
      {
        label: "Weekly inbound",
        value: formatNumber(contact.stats.inboundPerWeek),
        icon: <Email fontSize="small" />,
      },
      {
        label: "Avg response time",
        value: `${formatNumber(contact.stats.avgResponseHours)}h`,
        icon: <AccessTime fontSize="small" />,
      },
      {
        label: "Satisfaction",
        value: formatPercentage(contact.stats.satisfaction),
        icon: <SentimentVerySatisfied fontSize="small" />,
      },
      {
        label: "Automation coverage",
        value: formatPercentage(contact.stats.automationCoverage),
        icon: <Bolt fontSize="small" />,
      },
    ],
    [contact.stats, formatNumber, formatPercentage]
  );

  const quickActions = useMemo(
    () => [
      {
        label: "Add contact channel",
        description: "Spin up a new inbox, phone line, or scheduling flow.",
        icon: <AddCircleOutline fontSize="small" />,
        ctaLabel: "Create",
        onClick: () =>
          handleEdit?.("contact", { section: "channels", mode: "create" }),
      },
      {
        label: "Sync availability",
        description: "Import updated working hours from calendar systems.",
        icon: <CalendarMonth fontSize="small" />,
        ctaLabel: "Sync",
        onClick: () =>
          handleEdit?.("contact", { section: "availability", mode: "sync" }),
      },
      {
        label: "Export outreach kit",
        description: "Generate press sheet, speaker bio, and high-res assets.",
        icon: <Launch fontSize="small" />,
        ctaLabel: "Export",
        onClick: () => handleSave?.("contact-export", {}),
      },
    ],
    [handleEdit, handleSave]
  );

  const renderChannels = useCallback(
    (items, handlers) => (
      <Stack spacing={2.5}>
        {items.map((channel) => (
          <Box
            key={channel.id}
            onClick={() => handlers.onEdit?.("channels", channel)}
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
            <Stack spacing={1.75}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2,
                    backgroundColor: "rgba(129,199,132,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#A5D6A7",
                  }}
                >
                  {channel.channel === "Email" && <Email />}
                  {channel.channel === "Scheduling portal" && <CalendarMonth />}
                  {channel.channel === "Direct line" && <Phone />}
                  {!["Email", "Scheduling portal", "Direct line"].includes(
                    channel.channel
                  ) && <SupportAgent />}
                </Box>
                <Box flex={1}>
                  <Typography
                    sx={{ color: "#fff", fontWeight: 600, fontSize: 16 }}
                  >
                    {channel.label}
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.68)",
                      fontSize: 13,
                    }}
                  >
                    {channel.channel} • SLA {channel.slaHours}h
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.6)",
                      fontSize: 13,
                    }}
                  >
                    {channel.purpose}
                  </Typography>
                </Box>
                <Stack direction="column" spacing={1} alignItems="flex-end">
                  <Chip
                    label={channel.status}
                    size="small"
                    sx={{
                      backgroundColor:
                        channel.status === "Escalated"
                          ? "rgba(244,143,177,0.2)"
                          : "rgba(129,199,132,0.18)",
                      color:
                        channel.status === "Escalated" ? "#F48FB1" : "#A5D6A7",
                      fontWeight: 600,
                    }}
                  />
                  <Typography
                    sx={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}
                  >
                    Owner: {channel.owner}
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip
                  label={channel.endpoint}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(144,202,249,0.18)",
                    color: "#90CAF9",
                    fontWeight: 600,
                  }}
                />
                {channel.tags?.map((tag) => (
                  <Chip
                    key={`${channel.id}-tag-${tag}`}
                    label={tag}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.7)",
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Stack>

              <Typography
                sx={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}
              >
                Last reviewed {channel.lastReviewed}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    ),
    []
  );

  const renderAvailability = useCallback(
    (items, handlers) => (
      <Stack spacing={2}>
        {items.map((entry) => (
          <Box
            key={entry.id}
            onClick={() => handlers.onEdit?.("availability", entry)}
            sx={{
              p: 2.75,
              borderRadius: 3,
              background: "rgba(13,18,28,0.85)",
              border: "1px solid rgba(255,255,255,0.06)",
              cursor: "pointer",
              transition: "border-color 160ms ease",
              "&:hover": {
                borderColor: "rgba(144,202,249,0.35)",
              },
            }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <CalendarMonth sx={{ color: "#90CAF9" }} />
              <Stack spacing={1} flex={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    sx={{ color: "#fff", fontWeight: 600, fontSize: 15 }}
                  >
                    {entry.day}
                  </Typography>
                  <Chip
                    label={entry.timezone}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(156,204,101,0.18)",
                      color: "#C5E1A5",
                      fontWeight: 600,
                    }}
                  />
                </Stack>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {entry.slots.map((slot) => (
                    <Chip
                      key={`${entry.id}-slot-${slot}`}
                      label={slot}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.7)",
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Stack>
                {entry.notes && (
                  <Typography
                    sx={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}
                  >
                    {entry.notes}
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    ),
    []
  );

  const renderEscalations = useCallback(
    (items, handlers) => (
      <Stack spacing={2.25}>
        {items.map((member) => (
          <Stack
            key={member.id}
            direction="row"
            spacing={2.5}
            alignItems="center"
            onClick={() => handlers.onEdit?.("escalations", member)}
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
            <Avatar src={member.avatar} sx={{ width: 56, height: 56 }} />
            <Stack spacing={0.75} flex={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                  {member.name}
                </Typography>
                <Chip
                  label={member.role}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(144,202,249,0.18)",
                    color: "#90CAF9",
                    fontWeight: 600,
                  }}
                />
              </Stack>
              <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
                {member.focus}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <SupportAgent sx={{ color: "#81D4FA", fontSize: 18 }} />
                <Typography
                  sx={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}
                >
                  Primary: {member.primaryChannel}
                </Typography>
              </Stack>
              <Typography
                sx={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}
              >
                {member.contact} • {member.timezone}
              </Typography>
            </Stack>
          </Stack>
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
              background: "rgba(10,20,30,0.88)",
              border: "1px solid rgba(255,255,255,0.05)",
              cursor: "pointer",
              transition: "border-color 160ms ease",
              "&:hover": {
                borderColor: "rgba(129,199,132,0.35)",
              },
            }}
          >
            <Stack spacing={1.25}>
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                  {automation.name}
                </Typography>
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
              <Typography
                sx={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}
              >
                Trigger: {automation.trigger}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
                Action: {automation.action}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  sx={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}
                >
                  Owner: {automation.owner}
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
                        backgroundColor: "#81C784",
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

  const renderPlaybooks = useCallback(
    (items, handlers) => (
      <Stack spacing={2}>
        {items.map((playbook) => (
          <Box
            key={playbook.id}
            onClick={() => handlers.onEdit?.("playbooks", playbook)}
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
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                  {playbook.title}
                </Typography>
                <Chip
                  label={playbook.intent}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(33,150,243,0.18)",
                    color: "#90CAF9",
                    fontWeight: 600,
                  }}
                />
              </Stack>
              <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
                Tone: {playbook.tone}
              </Typography>
              <Stack spacing={0.5}>
                {playbook.steps.map((step, index) => (
                  <Typography
                    key={`${playbook.id}-step-${index}`}
                    sx={{ color: "rgba(255,255,255,0.62)", fontSize: 13 }}
                  >
                    • {step}
                  </Typography>
                ))}
              </Stack>
              <Typography
                sx={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}
              >
                Last updated {playbook.lastUpdated}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    ),
    []
  );

  const onAdd = (sectionId) =>
    handleEdit?.("contact", { section: sectionId, mode: "create" });
  const onEdit = (sectionId, payload) =>
    handleEdit?.("contact", {
      section: sectionId,
      mode: "edit",
      item: payload,
    });
  const onDelete = (sectionId, payload) =>
    handleDelete?.("contact", { section: sectionId, item: payload });

  const sections = useMemo(
    () => [
      {
        id: "channels",
        title: "Primary channels",
        caption:
          "Manage inboxes, direct lines, and booking flows your team watches.",
        fullWidth: true,
        items: contact.channels,
        renderItem: renderChannels,
      },
      {
        id: "availability",
        title: "Availability & routing",
        caption: "Keep office hours aligned across regions and workloads.",
        items: contact.availability,
        renderItem: renderAvailability,
      },
      {
        id: "escalations",
        title: "Escalation partners",
        caption: "Know exactly who to loop in when conversations get critical.",
        items: contact.escalations,
        renderItem: renderEscalations,
      },
      {
        id: "automations",
        title: "Automation coverage",
        caption:
          "Level up response consistency with workflow coverage insights.",
        items: contact.automations,
        renderItem: renderAutomations,
      },
      {
        id: "playbooks",
        title: "Response playbooks",
        caption:
          "Reusable drafts that keep tone, promises, and expectations aligned.",
        items: contact.playbooks,
        renderItem: renderPlaybooks,
      },
    ],
    [
      contact.channels,
      contact.availability,
      contact.escalations,
      contact.automations,
      contact.playbooks,
      renderChannels,
      renderAvailability,
      renderEscalations,
      renderAutomations,
      renderPlaybooks,
    ]
  );

  return (
    <ResourcePageTemplate
      header={{
        title: "Contact & Outreach",
        subtitle:
          "Centralize inbound requests, maintain fast SLAs, and keep stakeholders in the loop without spreadsheets.",
        chips: [
          {
            label: "Communication",
            color: "rgba(144,202,249,0.18)",
            textColor: "#90CAF9",
          },
          {
            label: "Client Success",
            color: "rgba(129,199,132,0.18)",
            textColor: "#A5D6A7",
          },
        ],
        buttons: [
          {
            label: "Log new channel",
            icon: <AddCircleOutline fontSize="small" />,
            background: "#42A5F5",
            hoverBackground: "#64B5F6",
            onClick: () =>
              handleEdit?.("contact", { section: "channels", mode: "create" }),
          },
          {
            label: "Trigger handover",
            variant: "outlined",
            endIcon: <Sync fontSize="small" />,
            onClick: () =>
              handleEdit?.("contact", {
                section: "escalations",
                mode: "handover",
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

export default Contact;
