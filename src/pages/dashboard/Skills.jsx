import React, { useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Chip, LinearProgress, Stack, Typography } from "@mui/material";
import {
  Psychology,
  GridView,
  TrendingUp,
  WorkspacePremium,
  AddCircleOutline,
  PlaylistAddCheck,
  School,
  Timeline,
} from "@mui/icons-material";
import ResourcePageTemplate from "../../components/dashboard/ResourcePageTemplate";

const Skills = () => {
  const outlet = useOutletContext?.() || {};
  const { dashboardData, handleEdit, handleDelete, handleSave } = outlet;

  const skillData = useMemo(() => {
    const source = dashboardData?.skills ?? {};
    const fallbackTechnical = [
      {
        id: "lang-stack",
        category: "Programming Languages",
        icon: "Code",
        summary: "Python, JavaScript, and TypeScript as daily drivers",
        skills: [
          {
            name: "Python",
            proficiency: 95,
            level: "Expert",
            yearsOfExperience: 6,
            lastUsed: "2025-09-15",
            projects: 45,
            frameworks: ["Django", "FastAPI", "Pandas", "NumPy"],
            certifications: ["PCAP", "Django Certified"],
            description:
              "Backbone for API design, data automations, and ML prototypes.",
          },
          {
            name: "JavaScript",
            proficiency: 90,
            level: "Expert",
            yearsOfExperience: 5,
            lastUsed: "2025-09-17",
            projects: 38,
            frameworks: ["React", "Next.js", "Node.js"],
            certifications: [],
            description:
              "End-to-end applications across frontend, SSR, and tooling.",
          },
          {
            name: "TypeScript",
            proficiency: 86,
            level: "Advanced",
            yearsOfExperience: 3,
            lastUsed: "2025-09-10",
            projects: 24,
            frameworks: ["React", "NestJS", "Angular"],
            certifications: [],
            description:
              "Typed application architecture for enterprise-scale feature teams.",
          },
        ],
      },
      {
        id: "platforms",
        category: "Platform & DevOps",
        icon: "Cloud",
        summary: "Production pipelines across AWS, containers, and CI",
        skills: [
          {
            name: "AWS",
            proficiency: 85,
            level: "Advanced",
            yearsOfExperience: 4,
            lastUsed: "2025-09-12",
            projects: 28,
            frameworks: ["CloudFormation", "Serverless", "Lambda"],
            certifications: ["AWS Solutions Architect"],
            description:
              "Architected multi-region workloads with cost guardrails and IaC.",
          },
          {
            name: "Docker",
            proficiency: 88,
            level: "Advanced",
            yearsOfExperience: 4,
            lastUsed: "2025-09-14",
            projects: 33,
            frameworks: ["Compose", "BuildKit", "Docker Swarm"],
            certifications: [],
            description:
              "Container-first delivery and reproducible developer environments.",
          },
          {
            name: "Kubernetes",
            proficiency: 78,
            level: "Intermediate",
            yearsOfExperience: 2,
            lastUsed: "2025-08-21",
            projects: 12,
            frameworks: ["Helm", "Argo CD", "Istio"],
            certifications: ["CKA"],
            description:
              "Cluster operations, service mesh, and zero-downtime releases.",
          },
        ],
      },
    ];

    const fallbackSoft = [
      {
        id: "leadership",
        category: "Leadership & Communication",
        summary: "Guiding multidisciplinary squads with clarity and empathy.",
        skills: [
          {
            name: "Technical Communication",
            level: "Expert",
            proficiency: 92,
            description:
              "Translate complex architecture decisions for executives and ICs.",
            highlights: ["50+ technical talks", "Docs-first practice"],
          },
          {
            name: "Team Leadership",
            level: "Advanced",
            proficiency: 88,
            description:
              "Mentored engineers across continents with outcome-based coaching.",
            highlights: ["Managed 5 squads", "Mentored 15 engineers"],
          },
        ],
      },
      {
        id: "delivery",
        category: "Delivery Excellence",
        summary: "Ship value predictably through process and collaboration.",
        skills: [
          {
            name: "System Design",
            level: "Advanced",
            proficiency: 86,
            description: "Architect resilient systems with measurable SLOs.",
            highlights: ["Microservices at scale", "Design reviews"],
          },
          {
            name: "Project Leadership",
            level: "Advanced",
            proficiency: 84,
            description:
              "Drive roadmaps, stakeholder alignment, and agile ceremonies.",
            highlights: ["PMP certified", "Global launches"],
          },
        ],
      },
    ];

    const fallbackGoals = [
      {
        id: "ml",
        skill: "Machine Learning Engineering",
        currentLevel: 45,
        targetLevel: 80,
        targetDate: "2025-06-30",
        priority: "High",
        resources: ["Stanford CS229", "Hands-On ML", "Kaggle"],
      },
      {
        id: "rust",
        skill: "Rust for Systems",
        currentLevel: 25,
        targetLevel: 70,
        targetDate: "2025-12-31",
        priority: "Medium",
        resources: ["Rust Book", "Rustlings", "OSS contributions"],
      },
    ];

    const fallbackTimeline = [
      {
        year: 2024,
        focus: "Cloud-native readiness",
        newSkills: ["Kubernetes", "AWS networking"],
        achievements: ["CKA certification", "Led PaaS rollout"],
      },
      {
        year: 2023,
        focus: "Frontend performance",
        newSkills: ["React server components", "Design systems"],
        achievements: ["React Expert certification", "DX toolkit launch"],
      },
      {
        year: 2022,
        focus: "API excellence",
        newSkills: ["DRF advanced", "PostgreSQL tuning"],
        achievements: ["Django contributor", "API latency -40%"],
      },
    ];

    return {
      technicalCategories: source.technicalSkills ?? fallbackTechnical,
      softSkillClusters: source.softSkills ?? fallbackSoft,
      learningGoals: source.learningGoals ?? fallbackGoals,
      timeline: source.skillDevelopment ?? fallbackTimeline,
      stats: source.skillStats ?? {
        totalSkills: 28,
        expertLevel: 8,
        advancedLevel: 12,
        certifications: 15,
        averageProficiency: "85%",
      },
    };
  }, [dashboardData]);

  const stats = useMemo(
    () => [
      {
        label: "Skills catalogued",
        value: skillData.stats.totalSkills,
        icon: <GridView fontSize="small" />,
      },
      {
        label: "Expert-level",
        value: skillData.stats.expertLevel,
        icon: <WorkspacePremium fontSize="small" />,
      },
      {
        label: "Advanced",
        value: skillData.stats.advancedLevel,
        icon: <TrendingUp fontSize="small" />,
      },
      {
        label: "Certifications",
        value: skillData.stats.certifications,
        icon: <School fontSize="small" />,
      },
    ],
    [skillData.stats]
  );

  const quickActions = useMemo(
    () => [
      {
        label: "Record new capability",
        description:
          "Log fresh technical proficiencies and tie to initiatives.",
        icon: <AddCircleOutline />,
        ctaLabel: "Add skill",
        onClick: () =>
          handleEdit?.("skills", { section: "technical", mode: "create" }),
      },
      {
        label: "Update coaching plan",
        description: "Refresh soft-skill goals and track growth conversations.",
        icon: <Psychology />,
        ctaLabel: "Refine plan",
        onClick: () =>
          handleEdit?.("skills", { section: "soft", mode: "create" }),
      },
      {
        label: "Export skill matrix",
        description:
          "Generate a shareable matrix for stakeholders and clients.",
        icon: <PlaylistAddCheck />,
        ctaLabel: "Export",
        onClick: () => handleSave?.("skills-export", {}),
      },
    ],
    [handleEdit, handleSave]
  );

  const renderTechnical = useCallback(
    (categories, handlers) => (
      <Stack spacing={3}>
        {categories.map((category) => (
          <Box
            key={category.id}
            onClick={() => handlers.onEdit?.("technical", category)}
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
            <Stack spacing={2.5}>
              <Box>
                <Typography
                  sx={{ color: "#fff", fontWeight: 600, fontSize: 16 }}
                >
                  {category.category}
                </Typography>
                {category.summary && (
                  <Typography
                    sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}
                  >
                    {category.summary}
                  </Typography>
                )}
              </Box>

              <Stack spacing={2}>
                {(category.skills || []).slice(0, 4).map((skill) => (
                  <Box key={skill.name}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={0.5}
                    >
                      <Typography sx={{ color: "#E3F2FD", fontWeight: 600 }}>
                        {skill.name}
                      </Typography>
                      <Typography
                        sx={{ color: "rgba(255,255,255,0.65)", fontSize: 12 }}
                      >
                        {skill.level} • {skill.yearsOfExperience ?? 0} yrs
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={skill.proficiency ?? 0}
                      sx={{
                        height: 6,
                        borderRadius: 999,
                        backgroundColor: "rgba(255,255,255,0.08)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#66BB6A",
                        },
                      }}
                    />
                    {skill.description && (
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.62)",
                          fontSize: 13,
                          mt: 1.5,
                        }}
                      >
                        {skill.description}
                      </Typography>
                    )}
                    <Stack direction="row" spacing={1} flexWrap="wrap" mt={1.5}>
                      {(skill.frameworks || []).slice(0, 4).map((framework) => (
                        <Chip
                          key={`${skill.name}-${framework}`}
                          label={framework}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(33,150,243,0.18)",
                            color: "#90CAF9",
                            fontWeight: 600,
                          }}
                        />
                      ))}
                      {(skill.certifications || []).map((cert) => (
                        <Chip
                          key={`${skill.name}-${cert}`}
                          label={cert}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(255,193,7,0.18)",
                            color: "#FDD835",
                            fontWeight: 600,
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    ),
    []
  );

  const renderSoftSkills = useCallback(
    (clusters, handlers) => (
      <Stack spacing={3}>
        {clusters.map((cluster) => (
          <Box
            key={cluster.id}
            onClick={() => handlers.onEdit?.("soft", cluster)}
            sx={{
              p: 3,
              borderRadius: 3,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
              transition: "border-color 160ms ease, transform 160ms ease",
              "&:hover": {
                borderColor: "rgba(156,39,176,0.35)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Stack spacing={2}>
              <Box>
                <Typography
                  sx={{ color: "#fff", fontWeight: 600, fontSize: 16 }}
                >
                  {cluster.category}
                </Typography>
                {cluster.summary && (
                  <Typography
                    sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}
                  >
                    {cluster.summary}
                  </Typography>
                )}
              </Box>

              <Stack spacing={2}>
                {(cluster.skills || []).map((skill) => (
                  <Box key={skill.name}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={0.75}
                    >
                      <Typography sx={{ color: "#F3E5F5", fontWeight: 600 }}>
                        {skill.name}
                      </Typography>
                      <Chip
                        label={`${skill.level} • ${skill.proficiency ?? 0}%`}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(156,39,176,0.16)",
                          color: "#CE93D8",
                          fontWeight: 600,
                        }}
                      />
                    </Stack>
                    <Typography
                      sx={{ color: "rgba(255,255,255,0.68)", fontSize: 13 }}
                    >
                      {skill.description}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" mt={1.5}>
                      {(skill.highlights || []).map((highlight) => (
                        <Chip
                          key={`${skill.name}-${highlight}`}
                          label={highlight}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(96,125,139,0.2)",
                            color: "#B0BEC5",
                            fontWeight: 600,
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    ),
    []
  );

  const renderGoals = useCallback(
    (goals, handlers) => (
      <Stack spacing={3}>
        {goals.map((goal) => {
          const progress = Math.min(
            100,
            Math.round(
              ((goal.currentLevel ?? 0) / (goal.targetLevel || 100)) * 100
            )
          );
          return (
            <Box
              key={goal.id}
              onClick={() => handlers.onEdit?.("goals", goal)}
              sx={{
                p: 3,
                borderRadius: 3,
                background: "rgba(76,175,80,0.06)",
                border: "1px solid rgba(76,175,80,0.18)",
                cursor: "pointer",
                transition: "border-color 160ms ease, transform 160ms ease",
                "&:hover": {
                  borderColor: "rgba(129,199,132,0.45)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                    {goal.skill}
                  </Typography>
                  <Chip
                    label={goal.priority}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255,87,34,0.18)",
                      color: "#FFAB91",
                      fontWeight: 600,
                    }}
                  />
                </Stack>
                <Typography
                  sx={{ color: "rgba(255,255,255,0.62)", fontSize: 13 }}
                >
                  Target level {goal.targetLevel}% by {goal.targetDate}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 6,
                    borderRadius: 999,
                    backgroundColor: "rgba(255,255,255,0.08)",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#81C784",
                    },
                  }}
                />
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {(goal.resources || []).map((resource) => (
                    <Chip
                      key={`${goal.id}-${resource}`}
                      label={resource}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(33,150,243,0.18)",
                        color: "#90CAF9",
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    ),
    []
  );

  const renderTimeline = useCallback(
    (milestones, handlers) => (
      <Stack spacing={3}>
        {milestones.map((entry) => (
          <Box
            key={entry.year}
            onClick={() => handlers.onEdit?.("timeline", entry)}
            sx={{
              p: 3,
              borderRadius: 3,
              background: "rgba(33,33,33,0.35)",
              border: "1px solid rgba(255,255,255,0.06)",
              cursor: "pointer",
              transition: "border-color 160ms ease, transform 160ms ease",
              "&:hover": {
                borderColor: "rgba(255,255,255,0.2)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Chip
                  label={entry.year}
                  sx={{
                    backgroundColor: "rgba(33,150,243,0.2)",
                    color: "#90CAF9",
                    fontWeight: 600,
                  }}
                />
                <Typography
                  sx={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}
                >
                  {entry.focus}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {(entry.newSkills || []).map((skill) => (
                  <Chip
                    key={`${entry.year}-skill-${skill}`}
                    label={skill}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(129,199,132,0.18)",
                      color: "#C5E1A5",
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Stack>
              <Stack spacing={0.75}>
                {(entry.achievements || []).map((achievement, index) => (
                  <Typography
                    key={`${entry.year}-ach-${index}`}
                    sx={{ color: "rgba(255,255,255,0.65)", fontSize: 13.5 }}
                  >
                    • {achievement}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    ),
    []
  );

  const onAdd = (sectionId) =>
    handleEdit?.("skills", { section: sectionId, mode: "create" });
  const onEdit = (sectionId, payload) =>
    handleEdit?.("skills", { section: sectionId, mode: "edit", item: payload });
  const onDelete = (sectionId, payload) =>
    handleDelete?.("skills", { section: sectionId, item: payload });

  const sections = useMemo(
    () => [
      {
        id: "technical",
        title: "Technical Mastery",
        caption: "Stacks and frameworks powering delivery.",
        items: skillData.technicalCategories,
        fullWidth: true,
        renderItem: renderTechnical,
      },
      {
        id: "soft",
        title: "Leadership & Collaboration",
        caption: "Behavioural strengths and professional aptitude.",
        items: skillData.softSkillClusters,
        renderItem: renderSoftSkills,
      },
      {
        id: "goals",
        title: "Learning Roadmap",
        caption: "Active skill-building initiatives with momentum.",
        items: skillData.learningGoals,
        renderItem: renderGoals,
      },
      {
        id: "timeline",
        title: "Growth Timeline",
        caption: "Year-over-year capability evolution and highlights.",
        items: skillData.timeline,
        renderItem: renderTimeline,
      },
    ],
    [skillData, renderTechnical, renderSoftSkills, renderGoals, renderTimeline]
  );

  return (
    <ResourcePageTemplate
      header={{
        title: "Skills Intelligence",
        subtitle:
          "Centralize technical mastery, leadership strengths, and upskilling motions in one authoritative roster.",
        chips: [
          {
            label: "Capability",
            color: "rgba(102,187,106,0.18)",
            textColor: "#A5D6A7",
          },
          {
            label: "Continuous",
            color: "rgba(144,202,249,0.16)",
            textColor: "#90CAF9",
          },
        ],
        buttons: [
          {
            label: "Log certification",
            icon: <WorkspacePremium fontSize="small" />,
            background: "#66BB6A",
            hoverBackground: "#81C784",
            onClick: () =>
              handleEdit?.("skills", {
                section: "technical",
                mode: "create",
                context: "certification",
              }),
          },
          {
            label: "Sync timeline",
            variant: "outlined",
            onClick: () =>
              handleEdit?.("skills", { section: "timeline", mode: "sync" }),
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

export default Skills;
