import React, { useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Analytics,
  Article,
  Contacts,
  ContentCopy,
  Edit,
  MenuBook,
  Psychology,
  School,
  Verified,
  Work,
  Badge,
  Inventory2,
} from "@mui/icons-material";
import ResourceSectionCard from "../../components/dashboard/ResourceSectionCard";

// Animation constants
const ANIMATION_CONFIG = {
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  },
  itemVariants: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  },
};

// Default fallback data
const DEFAULT_PROFILE = {
  name: "Nazmul Hossain",
  title: "CSE Student & AI/ML Researcher",
  bio: "Driving impactful research at the intersection of data science and healthcare while mentoring the next generation of innovators.",
  avatar: "/api/placeholder/120/120",
  email: "snazmulhossains24@gmail.com",
  phone: "+880 1712345678",
  location: "Dhaka, Bangladesh",
  website: "https://nazmulhossain.com",
};

const DEFAULT_ABOUT = {
  personalStory:
    "I am a passionate computer science educator and researcher committed to advancing health informatics through machine learning and responsible data science.",
  mission:
    "Bridge technology and healthcare by producing research that delivers measurable patient outcomes and social impact.",
  vision:
    "Lead a globally recognized research lab that shapes policy and best practices in AI-driven healthcare systems.",
  values: [
    "Innovation & Excellence",
    "Ethical Research",
    "Collaborative Learning",
    "Social Impact",
    "Continuous Growth",
  ],
  interests: [
    "Machine Learning Research",
    "Healthcare Technology",
    "Open Source Development",
    "Scientific Writing",
    "Mentoring Students",
  ],
  languages: [
    { id: "lang-en", name: "English", level: 96 },
    { id: "lang-bn", name: "Bengali", level: 100 },
    { id: "lang-hin", name: "Hindi", level: 78 },
    { id: "lang-ar", name: "Arabic", level: 62 },
  ],
  workPhilosophy:
    "Blend scientific rigor with empathy and cross-disciplinary collaboration to solve complex, human-centered problems.",
  motivation:
    "The opportunity to improve millions of lives through scalable, intelligent systems keeps me relentlessly curious and driven.",
  funFacts: [
    "Published first research paper while teaching undergraduate courses",
    "Mentored 50+ early-career engineers and data scientists",
    "Active speaker at global AI and health-tech conferences",
    "Contributor to multiple open-source ML projects",
  ],
};

// Reusable chip styling
const getChipStyles = (colorConfig) => ({
  backgroundColor: colorConfig.bg,
  color: colorConfig.text,
  fontWeight: 600,
  px: 2.5,
  py: 0.8,
  borderRadius: 3,
  border: `1px solid ${colorConfig.border}`,
  fontSize: "0.9rem",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: colorConfig.hoverBg,
    transform: "translateY(-2px)",
    boxShadow: colorConfig.hoverShadow,
  },
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "& .MuiChip-deleteIcon": {
    color: "rgba(255,255,255,0.6)",
    "&:hover": { color: "#ff4444" },
  },
});

// Utility function to create default data items
const createDefaultDataItems = (type, count = 4) => {
  const templates = {
    experience: [
      {
        id: "exp-research-lead",
        title: "Senior Research Engineer · Healthcare AI Labs",
        subtitle: "2023 - Present",
        description:
          "Leading cross-functional teams in developing AI-powered diagnostic tools for early disease detection. Managed $2M+ research budget and published 8 peer-reviewed papers.",
      },
      {
        id: "exp-ml-engineer",
        title: "Machine Learning Engineer · TechHealth Solutions",
        subtitle: "2021 - 2023",
        description:
          "Developed and deployed ML models for patient risk assessment, achieving 94% accuracy in sepsis prediction. Built scalable MLOps pipelines serving 500K+ predictions daily.",
      },
      {
        id: "exp-data-scientist",
        title: "Data Scientist · MedTech Innovations",
        subtitle: "2020 - 2021",
        description:
          "Created predictive analytics solutions for healthcare providers. Reduced hospital readmission rates by 23% through advanced statistical modeling and feature engineering.",
      },
      {
        id: "exp-research-intern",
        title: "Research Intern · University Medical Center",
        subtitle: "2019 - 2020",
        description:
          "Conducted bioinformatics research on genomic data analysis. Developed novel algorithms for protein structure prediction and contributed to 3 research publications.",
      },
    ],
    education: [
      {
        id: "edu-phd",
        title: "Ph.D. in Computer Science · Stanford University",
        subtitle: "2018 - 2022",
        description:
          "Dissertation: 'Advanced Machine Learning Techniques for Precision Medicine' | GPA: 3.9/4.0 | Advisor: Dr. Sarah Johnson",
      },
      {
        id: "edu-masters",
        title: "M.S. in Artificial Intelligence · MIT",
        subtitle: "2016 - 2018",
        description:
          "Specialized in Deep Learning and Neural Networks | GPA: 3.8/4.0 | Thesis: 'Convolutional Neural Networks for Medical Image Analysis'",
      },
      {
        id: "edu-bachelor",
        title: "B.S. in Computer Science & Engineering · University of Dhaka",
        subtitle: "2012 - 2016",
        description:
          "Magna Cum Laude | GPA: 3.7/4.0 | President of Computer Science Society | Dean's List all semesters",
      },
      {
        id: "edu-certification",
        title: "Advanced AI Certification · Google DeepMind",
        subtitle: "2023",
        description:
          "Intensive 6-month program covering cutting-edge AI research, ethics, and deployment strategies in healthcare applications.",
      },
    ],
    projects: [
      {
        id: "project-portfolio",
        title: "AI-Driven Health Monitoring Platform",
        subtitle: "Live · React, Django, TensorFlow",
        description:
          "End-to-end platform that predicts patient risks using real-time biometric data.",
      },
    ],
  };

  return templates[type]?.slice(0, count) || [];
};

const Profile = () => {
  const { dashboardData, handleEdit, handleDelete } =
    useOutletContext?.() || {};

  // Memoized profile data with fallbacks
  const profile = useMemo(() => {
    const base = dashboardData?.profile ?? {};
    return {
      name: base.name ?? DEFAULT_PROFILE.name,
      title: base.title ?? DEFAULT_PROFILE.title,
      bio: base.bio ?? DEFAULT_PROFILE.bio,
      avatar: base.avatar ?? DEFAULT_PROFILE.avatar,
      email: base.email ?? DEFAULT_PROFILE.email,
      phone: base.phone ?? DEFAULT_PROFILE.phone,
      location: base.location ?? DEFAULT_PROFILE.location,
      website: base.website ?? DEFAULT_PROFILE.website,
    };
  }, [dashboardData]);

  const stats = useMemo(
    () => ({
      projects: dashboardData?.projects?.length ?? 0,
      experiences: dashboardData?.experience?.length ?? 0,
      education: dashboardData?.education?.length ?? 0,
      publications: dashboardData?.publications?.length ?? 0,
      awards: dashboardData?.awards?.length ?? 0,
      blogPosts: dashboardData?.blog?.length ?? 0,
    }),
    [dashboardData]
  );

  // Memoized about data with fallbacks
  const aboutData = useMemo(() => {
    const source = dashboardData?.about ?? {};
    return {
      personalStory: source.personalStory ?? DEFAULT_ABOUT.personalStory,
      mission: source.mission ?? DEFAULT_ABOUT.mission,
      vision: source.vision ?? DEFAULT_ABOUT.vision,
      values: source.values ?? DEFAULT_ABOUT.values,
      interests: source.interests ?? DEFAULT_ABOUT.interests,
      languages: source.languages ?? DEFAULT_ABOUT.languages,
      workPhilosophy: source.workPhilosophy ?? DEFAULT_ABOUT.workPhilosophy,
      motivation: source.motivation ?? DEFAULT_ABOUT.motivation,
      funFacts: source.funFacts ?? DEFAULT_ABOUT.funFacts,
    };
  }, [dashboardData]);

  const sectionData = useMemo(
    () => ({
      about: [
        {
          id: "personal-story",
          title: "Personal Story",
          description: aboutData.personalStory,
        },
        {
          id: "mission",
          title: "Mission",
          description: aboutData.mission,
        },
        {
          id: "vision",
          title: "Vision",
          description: aboutData.vision,
        },
        {
          id: "work-philosophy",
          title: "Work Philosophy",
          description: aboutData.workPhilosophy,
        },
        {
          id: "motivation",
          title: "What Drives Me",
          description: aboutData.motivation,
        },
      ],
      experience:
        dashboardData?.experience?.map((item) => ({
          id: item.id,
          title: `${item.title} · ${item.company}`,
          subtitle: item.duration,
          description: item.description,
        })) ?? createDefaultDataItems("experience"),
      education:
        dashboardData?.education?.map((item) => ({
          id: item.id,
          title: `${item.degree} · ${item.institution}`,
          subtitle: item.year,
          description: item.grade,
        })) ?? createDefaultDataItems("education"),
      skills: dashboardData?.skills ?? [
        "Machine Learning",
        "Bioinformatics",
        "Data Visualization",
        "Statistical Modeling",
        "MLOps",
      ],
      projects:
        dashboardData?.projects?.map((item) => ({
          id: item.id,
          title: item.title,
          subtitle: item.status,
          description: item.description,
        })) ?? createDefaultDataItems("projects", 1),
      blog: dashboardData?.blog?.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.publishedAt || "Draft",
        description: item.excerpt,
      })) ?? [
        {
          id: "blog-ml-health",
          title: "Bridging Data Science and Public Health",
          subtitle: "Published · 5 min read",
          description:
            "Exploring ethical machine learning practices for large-scale health data projects.",
        },
      ],
      publications: dashboardData?.publications?.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.journal || item.conference,
        description: item.year,
      })) ?? [
        {
          id: "pub-icph2024",
          title: "Predictive Analytics for Early Sepsis Detection",
          subtitle: "International Conference on Public Health",
          description: "2024",
        },
      ],
      awards: dashboardData?.awards?.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.issuer,
        description: item.year,
      })) ?? [
        {
          id: "award-innovation",
          title: "National Innovation in Health Tech Award",
          subtitle: "ICT Division Bangladesh",
          description: "2023",
        },
      ],
      certificates: dashboardData?.certificates?.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.organization,
        description: item.year,
      })) ?? [
        {
          id: "cert-deeplearning",
          title: "Deep Learning Specialization",
          subtitle: "Coursera · Andrew Ng",
          description: "2022",
        },
      ],
      activities: dashboardData?.activities?.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.type,
        description: item.date,
      })) ?? [
        {
          id: "activity-keynote",
          title: "Keynote: AI for Accessible Healthcare",
          subtitle: "TEDx Dhaka",
          description: "May 2024",
        },
      ],
      networks: dashboardData?.networks?.map((item) => ({
        id: item.id,
        title: item.organization || item.name,
        subtitle: item.role,
        description: item.industry,
      })) ?? [
        {
          id: "network-ai-lab",
          title: "Global AI in Healthcare Research Network",
          subtitle: "Advisory Member",
          description: "International",
        },
      ],
      contact: [
        {
          id: "primary-contact",
          title: profile.email,
          subtitle: profile.phone,
          description: profile.location,
        },
      ],
    }),
    [dashboardData, profile, aboutData]
  );

  // Optimized action handlers with proper error handling
  const handleAddItem = useCallback(
    (section) => {
      try {
        if (handleEdit) {
          handleEdit(section, { mode: "add-existing", section });
        } else {
          console.warn(
            `[Portfolio Manager] No edit handler available for ${section}`
          );
        }
      } catch (error) {
        console.error(`Error adding ${section}:`, error);
      }
    },
    [handleEdit]
  );

  const handleEditItem = useCallback(
    (section, payload) => {
      try {
        if (handleEdit) {
          handleEdit(section, { mode: "edit", data: payload });
        } else {
          console.warn(
            `[Portfolio Manager] No edit handler available for ${section}`
          );
        }
      } catch (error) {
        console.error(`Error editing ${section}:`, error);
      }
    },
    [handleEdit]
  );

  const handleDeleteItem = useCallback(
    (section, payload) => {
      try {
        if (handleDelete) {
          handleDelete(section, {
            id: payload?.id ?? payload,
            mode: "remove-from-portfolio",
            confirm: `Remove this ${section} from your public portfolio? (Item will remain in your database)`,
          });
        } else {
          console.warn(
            `[Portfolio Manager] No delete handler available for ${section}`
          );
        }
      } catch (error) {
        console.error(`Error deleting ${section}:`, error);
      }
    },
    [handleDelete]
  );

  // Utility function for copying to clipboard
  const handleCopyToClipboard = useCallback(
    async (text, successMessage = "Copied to clipboard") => {
      try {
        await navigator.clipboard.writeText(text);
        console.log(successMessage);
        // You could add a toast notification here
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand("copy");
          console.log(successMessage);
        } catch (fallbackError) {
          console.error("Fallback copy failed:", fallbackError);
        }
        document.body.removeChild(textArea);
      }
    },
    []
  );

  const sections = useMemo(
    () => [
      {
        id: "about",
        title: "About & Biography",
        caption:
          "Manage your personal story, mission, and professional narrative.",
        items: sectionData.about,
        managementType: "content-sections",
      },
      {
        id: "experience",
        title: "Professional Experience",
        caption: "Keep your career timeline current.",
        items: sectionData.experience,
      },
      {
        id: "education",
        title: "Education",
        caption: "Showcase your academic background.",
        items: sectionData.education,
      },
      {
        id: "skills",
        title: "Skills & Expertise",
        caption:
          "Select skills from your database to display on your portfolio.",
        items: sectionData.skills,
        showCount: false,
        managementType: "database-selection",
        renderItem: (items, { onEdit, onDelete }) => (
          <Stack direction="row" flexWrap="wrap" gap={1.5}>
            {items.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onClick={() => onEdit?.("skills", skill)}
                onDelete={() => onDelete?.("skills", skill)}
                sx={getChipStyles({
                  bg: "rgba(129, 199, 132, 0.2)",
                  text: "#A5D6A7",
                  border: "rgba(129, 199, 132, 0.3)",
                  hoverBg: "rgba(129, 199, 132, 0.35)",
                  hoverShadow: "0 4px 12px rgba(129, 199, 132, 0.3)",
                })}
              />
            ))}
          </Stack>
        ),
      },
      {
        id: "projects",
        title: "Featured Projects",
        caption:
          "Select projects from your database to showcase on your portfolio.",
        items: sectionData.projects,
        managementType: "database-selection",
      },
      {
        id: "blog",
        title: "Blog Posts",
        caption: "Control what appears on your knowledge hub.",
        items: sectionData.blog,
        emptyState: (
          <Stack spacing={3} alignItems="center" py={4}>
            <Article sx={{ color: "rgba(255,255,255,0.3)", fontSize: 56 }} />
            <Stack spacing={1} alignItems="center" textAlign="center">
              <Typography
                variant="h6"
                fontWeight={600}
                color="rgba(255,255,255,0.8)"
              >
                No blog content yet
              </Typography>
              <Typography
                variant="body2"
                color="rgba(255,255,255,0.5)"
                maxWidth={280}
              >
                Share your insights and expertise by publishing your first
                thought leadership piece.
              </Typography>
            </Stack>
          </Stack>
        ),
      },
      {
        id: "publications",
        title: "Publications",
        caption: "Maintain your academic portfolio.",
        items: sectionData.publications,
        emptyState: (
          <Stack spacing={3} alignItems="center" py={4}>
            <MenuBook sx={{ color: "rgba(255,255,255,0.3)", fontSize: 56 }} />
            <Stack spacing={1} alignItems="center" textAlign="center">
              <Typography
                variant="h6"
                fontWeight={600}
                color="rgba(255,255,255,0.8)"
              >
                No publications recorded
              </Typography>
              <Typography
                variant="body2"
                color="rgba(255,255,255,0.5)"
                maxWidth={280}
              >
                Showcase your research by adding journals, conference papers, or
                book chapters.
              </Typography>
            </Stack>
          </Stack>
        ),
      },
      {
        id: "awards",
        title: "Awards & Honors",
        caption: "Highlight recognitions and achievements.",
        items: sectionData.awards,
        emptyState: (
          <Stack spacing={1} alignItems="center">
            <Badge sx={{ color: "rgba(255,255,255,0.4)" }} />
            <Typography variant="body1" fontWeight={600}>
              No awards added yet
            </Typography>
            <Typography variant="body2">
              Showcase accolades, honors, and notable wins.
            </Typography>
          </Stack>
        ),
      },
      {
        id: "certificates",
        title: "Certifications",
        caption: "Keep credentials and verifications organized.",
        items: sectionData.certificates,
        emptyState: (
          <Stack spacing={1} alignItems="center">
            <Verified sx={{ color: "rgba(255,255,255,0.4)" }} />
            <Typography variant="body1" fontWeight={600}>
              No certifications yet
            </Typography>
            <Typography variant="body2">
              Add course completions and professional licenses.
            </Typography>
          </Stack>
        ),
      },
      {
        id: "activities",
        title: "Activities & Engagement",
        caption: "Track workshops, talks, and community work.",
        items: sectionData.activities,
        emptyState: (
          <Stack spacing={1} alignItems="center">
            <Inventory2 sx={{ color: "rgba(255,255,255,0.4)" }} />
            <Typography variant="body1" fontWeight={600}>
              No activities listed
            </Typography>
            <Typography variant="body2">
              Document mentoring, keynotes, and community impact.
            </Typography>
          </Stack>
        ),
      },
      {
        id: "networks",
        title: "Professional Networks",
        caption: "Capture partnerships and affiliations.",
        items: sectionData.networks,
        emptyState: (
          <Stack spacing={1} alignItems="center">
            <Psychology sx={{ color: "rgba(255,255,255,0.4)" }} />
            <Typography variant="body1" fontWeight={600}>
              No networks connected
            </Typography>
            <Typography variant="body2">
              Link collaborators, labs, and professional circles.
            </Typography>
          </Stack>
        ),
      },
      {
        id: "values",
        title: "Core Values",
        caption: "Manage values that define your professional principles.",
        items: aboutData.values,
        showCount: false,
        managementType: "editable-list",
        renderItem: (items, { onEdit, onDelete }) => (
          <Stack direction="row" flexWrap="wrap" gap={1.5}>
            {items.map((value, idx) => (
              <Chip
                key={`${value}-${idx}`}
                label={value}
                onClick={() => onEdit?.("values", value)}
                onDelete={() => onDelete?.("values", { id: idx, value })}
                sx={getChipStyles({
                  bg: "rgba(76,175,80,0.2)",
                  text: "#A5D6A7",
                  border: "rgba(76,175,80,0.4)",
                  hoverBg: "rgba(76,175,80,0.35)",
                  hoverShadow: "0 6px 16px rgba(76,175,80,0.25)",
                })}
              />
            ))}
          </Stack>
        ),
      },
      {
        id: "interests",
        title: "Focus Interests",
        caption: "Manage topics you actively explore and want to showcase.",
        items: aboutData.interests,
        showCount: false,
        managementType: "editable-list",
        renderItem: (items, { onEdit, onDelete }) => (
          <Stack direction="row" flexWrap="wrap" gap={1.5}>
            {items.map((interest, idx) => (
              <Chip
                key={`${interest}-${idx}`}
                label={interest}
                onClick={() => onEdit?.("interests", interest)}
                onDelete={() =>
                  onDelete?.("interests", { id: idx, value: interest })
                }
                sx={getChipStyles({
                  bg: "rgba(33,150,243,0.2)",
                  text: "#90CAF9",
                  border: "rgba(33,150,243,0.4)",
                  hoverBg: "rgba(33,150,243,0.35)",
                  hoverShadow: "0 6px 16px rgba(33,150,243,0.25)",
                })}
              />
            ))}
          </Stack>
        ),
      },
      {
        id: "languages",
        title: "Language Fluency",
        caption: "Demonstrate communication versatility.",
        items: aboutData.languages,
        fullWidth: true,
        renderItem: (items, { onEdit }) => (
          <Grid container spacing={2.5}>
            {items.map((language) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                key={language.id || language.name}
              >
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      border: "1px solid rgba(129,199,132,0.4)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
                      "& .progress-bar": {
                        backgroundColor: "#81C784",
                      },
                    },
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: `linear-gradient(90deg, #66BB6A ${language.level}%, rgba(255,255,255,0.1) ${language.level}%)`,
                    },
                  }}
                  onClick={() => onEdit?.("languages", language)}
                >
                  <Stack spacing={2.5}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: "1.1rem",
                        }}
                      >
                        {language.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#A5D6A7",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          backgroundColor: "rgba(129,199,132,0.2)",
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                        }}
                      >
                        {language.level}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={language.level}
                      className="progress-bar"
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "rgba(255,255,255,0.1)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#66BB6A",
                          borderRadius: 4,
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
        id: "fun-facts",
        title: "Highlights & Fun Facts",
        caption: "Memorable wins and human moments.",
        items: aboutData.funFacts.map((fact, idx) => ({
          id: `fact-${idx}`,
          title: fact,
        })),
        showCount: false,
        fullWidth: true,
        renderItem: (items, { onEdit }) => (
          <Grid container spacing={2}>
            {items.map((fact, index) => (
              <Grid item xs={12} sm={6} md={6} key={fact.id}>
                <Box
                  onClick={() => onEdit?.("fun-facts", fact)}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.9)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    minHeight: 80,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Typography
                    sx={{
                      color: "rgba(129,199,132,0.8)",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      flexShrink: 0,
                      mt: 0.2,
                    }}
                  >
                    {index + 1}.
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.95rem",
                      lineHeight: 1.5,
                      fontWeight: 500,
                    }}
                  >
                    {fact.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        ),
      },
      {
        id: "contact",
        title: "Contact Channels",
        caption: "Maintain accurate outreach information.",
        items: sectionData.contact,
        showCount: false,
      },
    ],
    [sectionData, aboutData]
  );

  const sectionLookup = useMemo(() => {
    const map = new Map();
    sections.forEach((section) => {
      map.set(section.id, section);
    });
    return map;
  }, [sections]);

  const sectionGroups = useMemo(
    () => [
      {
        id: "group-identity",
        title: "Portfolio Identity",
        description:
          "Manage your personal brand, values, and narrative for public display.",
        sectionIds: ["about", "values", "interests"],
        type: "content-management",
      },
      {
        id: "group-professional",
        title: "Professional Showcase",
        description:
          "Select and organize professional background from your database.",
        sectionIds: ["experience", "education", "skills"],
        type: "database-selection",
      },
      {
        id: "group-portfolio",
        title: "Work & Publications",
        description:
          "Curate projects, writings, and research from your database.",
        sectionIds: ["projects", "publications", "blog"],
        type: "database-selection",
      },
      {
        id: "group-achievements",
        title: "Recognition & Credentials",
        description:
          "Feature awards, certifications, and activities from your database.",
        sectionIds: ["awards", "certificates", "activities"],
        type: "database-selection",
      },
      {
        id: "group-personal",
        title: "Personal Touch",
        description:
          "Languages, fun facts, and unique aspects of your journey.",
        sectionIds: ["languages", "fun-facts"],
      },
      {
        id: "group-networking",
        title: "Connect & Collaborate",
        description: "Professional networks and contact information.",
        sectionIds: ["networks", "contact"],
      },
    ],
    []
  );

  return (
    <motion.div
      variants={ANIMATION_CONFIG.containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <motion.div variants={ANIMATION_CONFIG.itemVariants}>
        <Card
          sx={{
            background:
              "linear-gradient(135deg, rgba(20,22,26,0.92), rgba(8,12,18,0.88))",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 4,
            p: 4,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(circle at top right, rgba(76,175,80,0.25), transparent 55%)",
            }}
          />

          <Grid
            container
            spacing={4}
            alignItems="center"
            position="relative"
            zIndex={1}
          >
            <Grid item xs={12} md={8}>
              <Stack direction="row" spacing={3} alignItems="center">
                <Avatar
                  src={profile.avatar}
                  sx={{
                    width: 96,
                    height: 96,
                    border: "3px solid rgba(129,199,132,0.6)",
                    boxShadow: "0 20px 50px -18px rgba(129,199,132,0.6)",
                    fontSize: 38,
                    fontWeight: 700,
                    backgroundColor: "rgba(76,175,80,0.25)",
                  }}
                >
                  {profile?.name?.[0] || "M"}
                </Avatar>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ color: "#fff", fontWeight: 700, lineHeight: 1.15 }}
                  >
                    {profile.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "rgba(255,255,255,0.75)",
                      fontWeight: 500,
                    }}
                  >
                    {profile.title}
                  </Typography>
                  <Stack direction="row" spacing={1.5} mt={2} flexWrap="wrap">
                    <Chip
                      icon={<Contacts />}
                      label={profile.email}
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.85)",
                        borderRadius: 2,
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    />
                    <Chip
                      label={profile.location}
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.75)",
                        borderRadius: 2,
                      }}
                    />
                  </Stack>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                justifyContent="flex-end"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={() => handleEditItem("profile", profile)}
                  sx={{
                    backgroundColor: "#66BB6A",
                    color: "#0B1C10",
                    borderRadius: 3,
                    px: 3,
                    py: 1.2,
                    fontWeight: 700,
                    "&:hover": { backgroundColor: "#81C784" },
                  }}
                >
                  Edit profile
                </Button>
                <Tooltip title="Copy portfolio URL" arrow>
                  <IconButton
                    onClick={() =>
                      handleCopyToClipboard(
                        profile.website,
                        "Portfolio URL copied!"
                      )
                    }
                    sx={{
                      borderRadius: 3,
                      border: "1px solid rgba(255,255,255,0.24)",
                      color: "rgba(255,255,255,0.7)",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.08)",
                      },
                    }}
                  >
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.08)" }} />

          <Grid container spacing={3}>
            {Object.entries({
              Projects: { value: stats.projects, icon: Analytics },
              Experience: { value: stats.experiences, icon: Work },
              Education: { value: stats.education, icon: School },
              Publications: { value: stats.publications, icon: MenuBook },
              Awards: { value: stats.awards, icon: Badge },
              "Blog Posts": { value: stats.blogPosts, icon: Article },
            }).map(([label, { value, icon: IconComponent }]) => (
              <Grid item xs={6} md={2} key={label}>
                <Card
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 3,
                    textAlign: "center",
                    py: 3,
                  }}
                >
                  <Stack spacing={1.25} alignItems="center">
                    <Box
                      sx={{
                        width: 46,
                        height: 46,
                        borderRadius: "20%",
                        display: "grid",
                        placeItems: "center",
                        backgroundColor: "rgba(102,187,106,0.18)",
                        color: "#A5D6A7",
                      }}
                    >
                      <IconComponent />
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{ color: "#fff", fontWeight: 700 }}
                    >
                      {value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {label}
                    </Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Card>
      </motion.div>

      {sectionGroups.map((group) => {
        const visibleSections = group.sectionIds
          .map((sectionId) => sectionLookup.get(sectionId))
          .filter(Boolean);

        if (!visibleSections.length) {
          return null;
        }

        return (
          <motion.div key={group.id} variants={ANIMATION_CONFIG.itemVariants}>
            <Stack spacing={1} mb={2}>
              <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>
                {group.title}
              </Typography>
              {group.description && (
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {group.description}
                </Typography>
              )}
            </Stack>

            <Grid container spacing={3}>
              {visibleSections.map((section) => (
                <Grid item xs={12} sm={12} md={12} lg={12} key={section.id}>
                  <ResourceSectionCard
                    {...section}
                    onAdd={handleAddItem}
                    onEdit={handleEditItem}
                    onDelete={handleDeleteItem}
                  />
                </Grid>
              ))}
            </Grid>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default Profile;
