import React, { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Chip,
  Grid,
  LinearProgress,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import {
  Edit,
  ImportExport,
  Visibility,
  Psychology,
  Star,
  Language,
  EmojiObjects,
} from "@mui/icons-material";
import ResourcePageTemplate from "../../components/dashboard/ResourcePageTemplate";

const About = () => {
  const outlet = useOutletContext?.() || {};
  const { dashboardData, handleEdit, handleDelete, handleSave } = outlet;

  const about = useMemo(() => {
    const source = dashboardData?.about ?? {};
    return {
      personalStory:
        source.personalStory ??
        "I am a passionate computer science educator and researcher committed to advancing health informatics through machine learning and responsible data science.",
      mission:
        source.mission ??
        "Bridge technology and healthcare by producing research that delivers measurable patient outcomes and social impact.",
      vision:
        source.vision ??
        "Lead a globally recognized research lab that shapes policy and best practices in AI-driven healthcare systems.",
      values: source.values ?? [
        "Innovation & Excellence",
        "Ethical Research",
        "Collaborative Learning",
        "Social Impact",
        "Continuous Growth",
      ],
      interests: source.interests ?? [
        "Machine Learning Research",
        "Healthcare Technology",
        "Open Source Development",
        "Scientific Writing",
        "Mentoring Students",
      ],
      languages: source.languages ?? [
        { id: "lang-en", name: "English", level: 96 },
        { id: "lang-bn", name: "Bengali", level: 100 },
        { id: "lang-hin", name: "Hindi", level: 78 },
        { id: "lang-ar", name: "Arabic", level: 62 },
      ],
      workPhilosophy:
        source.workPhilosophy ??
        "Blend scientific rigor with empathy and cross-disciplinary collaboration to solve complex, human-centered problems.",
      motivation:
        source.motivation ??
        "The opportunity to improve millions of lives through scalable, intelligent systems keeps me relentlessly curious and driven.",
      funFacts: source.funFacts ?? [
        "Published first research paper while teaching undergraduate courses",
        "Mentored 50+ early-career engineers and data scientists",
        "Active speaker at global AI and health-tech conferences",
        "Contributor to multiple open-source ML projects",
      ],
    };
  }, [dashboardData]);

  const stats = useMemo(
    () => [
      {
        label: "Core Values",
        value: about.values.length,
        icon: <Star fontSize="small" />,
      },
      {
        label: "Languages",
        value: about.languages.length,
        icon: <Language fontSize="small" />,
      },
      {
        label: "Focus Areas",
        value: about.interests.length,
        icon: <Psychology fontSize="small" />,
      },
      {
        label: "Highlights",
        value: about.funFacts.length,
        icon: <EmojiObjects fontSize="small" />,
      },
    ],
    [about]
  );

  const quickActions = useMemo(
    () => [
      {
        label: "Refine personal story",
        description: "Keep your signature narrative compelling and up to date.",
        icon: <Edit />,
        onClick: () => handleEdit?.("about", { section: "personalStory" }),
        ctaLabel: "Revise",
      },
      {
        label: "Bulk update content",
        description:
          "Import structured JSON or CSV to refresh this page quickly.",
        icon: <ImportExport />,
        onClick: () => handleSave?.("about-bulk-import", {}),
        ctaLabel: "Upload",
      },
      {
        label: "Preview public view",
        description:
          "Check how the About page presents on your portfolio site.",
        icon: <Visibility />,
        onClick: () => handleEdit?.("preview", { module: "about" }),
        ctaLabel: "Preview",
      },
    ],
    [handleEdit, handleSave]
  );

  const onAdd = (sectionId) =>
    handleEdit?.("about", { section: sectionId, mode: "create" });

  const onEdit = (sectionId, payload) =>
    handleEdit?.("about", { section: sectionId, mode: "edit", item: payload });

  const onDelete = (sectionId, payload) =>
    handleDelete?.("about", { section: sectionId, item: payload });

  const sections = useMemo(
    () => [
      {
        id: "personal-story",
        title: "Signature Narrative",
        caption: "Your overarching story and motivation.",
        fullWidth: true,
        items: [
          {
            id: "story",
            title: "Personal Story",
            description: about.personalStory,
          },
        ],
        showCount: false,
        onAdd: () =>
          handleEdit?.("about", { section: "personalStory", mode: "edit" }),
      },
      {
        id: "mission-vision",
        title: "Mission & Vision",
        caption: "Clarify your purpose and future direction.",
        fullWidth: true,
        showCount: false,
        items: [
          { id: "mission", title: "Mission", description: about.mission },
          { id: "vision", title: "Vision", description: about.vision },
        ],
        onAdd: () =>
          handleEdit?.("about", { section: "missionVision", mode: "edit" }),
      },
      {
        id: "core-values",
        title: "Core Values",
        caption: "Principles guiding your decisions.",
        showCount: false,
        items: about.values,
        renderItem: (items, handlers) => (
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {items.map((value, idx) => (
              <Chip
                key={`${value}-${idx}`}
                label={value}
                onClick={() => handlers.onEdit?.("core-values", value)}
                sx={{
                  backgroundColor: "rgba(76,175,80,0.18)",
                  color: "#A5D6A7",
                  fontWeight: 600,
                }}
              />
            ))}
          </Stack>
        ),
      },
      {
        id: "interests",
        title: "Focus Interests",
        caption: "Topics you actively explore and share.",
        showCount: false,
        items: about.interests,
        renderItem: (items, handlers) => (
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {items.map((interest, idx) => (
              <Chip
                key={`${interest}-${idx}`}
                label={interest}
                onClick={() => handlers.onEdit?.("interests", interest)}
                sx={{
                  backgroundColor: "rgba(33,150,243,0.18)",
                  color: "#90CAF9",
                  fontWeight: 600,
                }}
              />
            ))}
          </Stack>
        ),
      },
      {
        id: "languages",
        title: "Language Fluency",
        caption: "Demonstrate communication versatility.",
        items: about.languages,
        renderItem: (items, handlers) => (
          <Grid container spacing={2}>
            {items.map((language) => (
              <Grid item xs={12} sm={6} key={language.id || language.name}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    cursor: "pointer",
                  }}
                  onClick={() => handlers.onEdit?.("languages", language)}
                >
                  <Stack spacing={1.5}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                        {language.name}
                      </Typography>
                      <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                        {language.level}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={language.level}
                      sx={{
                        height: 6,
                        borderRadius: 4,
                        backgroundColor: "rgba(255,255,255,0.1)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#66BB6A",
                        },
                      }}
                    />
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        ),
      },
      {
        id: "philosophy",
        title: "Work Philosophy",
        caption: "Explain how you operate and collaborate.",
        showCount: false,
        items: [
          {
            id: "philosophy",
            title: "Approach",
            description: about.workPhilosophy,
          },
          {
            id: "motivation",
            title: "What Drives Me",
            description: about.motivation,
          },
        ],
        fullWidth: true,
        onAdd: () =>
          handleEdit?.("about", { section: "philosophy", mode: "edit" }),
      },
      {
        id: "fun-facts",
        title: "Highlights & Fun Facts",
        caption: "Memorable wins and human moments.",
        showCount: false,
        items: about.funFacts.map((fact, idx) => ({
          id: `fact-${idx}`,
          title: fact,
        })),
        renderItem: (items, handlers) => (
          <Stack spacing={1.5}>
            {items.map((fact) => (
              <Box
                key={fact.id}
                onClick={() => handlers.onEdit?.("fun-facts", fact)}
                sx={{
                  p: 2.25,
                  borderRadius: 3,
                  background: "rgba(255,193,7,0.12)",
                  border: "1px solid rgba(255,193,7,0.25)",
                  color: "#FFE082",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                • {fact.title}
              </Box>
            ))}
          </Stack>
        ),
      },
    ],
    [about, handleEdit]
  );

  return (
    <ResourcePageTemplate
      header={{
        title: "About & Narrative",
        subtitle:
          "Curate the story, mission, and values that set the foundation for your professional identity.",
        chips: [
          {
            label: "Owner",
            color: "rgba(129,199,132,0.18)",
            textColor: "#A5D6A7",
          },
          {
            label: "Public",
            color: "rgba(144,202,249,0.16)",
            textColor: "#90CAF9",
          },
        ],
        buttons: [
          {
            label: "Edit narrative",
            icon: <Edit fontSize="small" />,
            background: "#66BB6A",
            hoverBackground: "#81C784",
            onClick: () =>
              handleEdit?.("about", { section: "personalStory", mode: "edit" }),
          },
          {
            label: "New highlight",
            variant: "outlined",
            onClick: () =>
              handleEdit?.("about", { section: "fun-facts", mode: "create" }),
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

export default About;
