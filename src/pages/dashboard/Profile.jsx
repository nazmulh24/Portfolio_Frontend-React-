import React, { useMemo } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
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
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add,
  Analytics,
  Article,
  Contacts,
  ContentCopy,
  Edit,
  Launch,
  MenuBook,
  Psychology,
  School,
  Verified,
  Work,
  Badge,
  Inventory2,
} from "@mui/icons-material";
import ResourceSectionCard from "../../components/dashboard/ResourceSectionCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Profile = () => {
  const navigate = useNavigate();
  const { dashboardData, handleEdit, handleDelete, handleSave } =
    useOutletContext?.() || {};

  const profile = useMemo(() => {
    const base = dashboardData?.profile ?? {};
    return {
      name: base.name ?? "Md Abul Basar",
      title: base.title ?? "Machine Learning & Health Informatics Researcher",
      bio:
        base.bio ??
        "Driving impactful research at the intersection of data science and healthcare while mentoring the next generation of innovators.",
      avatar: base.avatar ?? "/api/placeholder/120/120",
      email: base.email ?? "mdabulbasar@niter.edu.bd",
      phone: base.phone ?? "+880 1712345678",
      location: base.location ?? "Dhaka, Bangladesh",
      website: base.website ?? "https://mdabulbasar.com",
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

  const sectionData = useMemo(
    () => ({
      about: [
        {
          id: "about-summary",
          title: "Professional Summary",
          description: profile.bio,
        },
      ],
      experience:
        dashboardData?.experience?.map((item) => ({
          id: item.id,
          title: `${item.title} · ${item.company}`,
          subtitle: item.duration,
          description: item.description,
        })) ?? [],
      education:
        dashboardData?.education?.map((item) => ({
          id: item.id,
          title: `${item.degree} · ${item.institution}`,
          subtitle: item.year,
          description: item.grade,
        })) ?? [],
      skills: dashboardData?.skills ?? [
        "Machine Learning",
        "Bioinformatics",
        "Data Visualization",
        "Statistical Modeling",
        "MLOps",
      ],
      projects: dashboardData?.projects?.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.status,
        description: item.description,
      })) ?? [
        {
          id: "project-portfolio",
          title: "AI-Driven Health Monitoring Platform",
          subtitle: "Live · React, Django, TensorFlow",
          description:
            "End-to-end platform that predicts patient risks using real-time biometric data.",
        },
      ],
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
      settings: [
        {
          id: "public-visibility",
          title: "Public Profile Visibility",
          subtitle: "Live",
        },
        {
          id: "two-factor",
          title: "Two-factor Authentication",
          subtitle: "Enabled",
        },
      ],
    }),
    [dashboardData, profile]
  );

  const handleNavigatePublicProfile = () => {
    navigate("/profile");
  };

  const onAdd = (section) => {
    if (handleEdit) {
      handleEdit(section, null);
    } else {
      console.log(`[add] ${section}`);
    }
  };

  const onEdit = (section, payload) => {
    if (handleEdit) {
      handleEdit(section, payload);
    } else {
      console.log(`[edit] ${section}`, payload);
    }
  };

  const onDelete = (section, payload) => {
    if (handleDelete) {
      handleDelete(section, payload?.id ?? payload);
    } else {
      console.log(`[delete] ${section}`, payload);
    }
  };

  const sections = useMemo(
    () => [
      {
        id: "about",
        title: "About / Bio",
        caption: "Tell your story and highlight your mission.",
        items: sectionData.about,
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
        caption: "Curate the capabilities you want to highlight.",
        items: sectionData.skills,
        showCount: false,
        renderItem: (items, { onEdit }) => (
          <Stack direction="row" flexWrap="wrap" gap={1.25}>
            {items.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onClick={() => onEdit?.("skills", skill)}
                sx={{
                  backgroundColor: "rgba(129, 199, 132, 0.2)",
                  color: "#A5D6A7",
                  fontWeight: 600,
                  px: 1,
                }}
              />
            ))}
          </Stack>
        ),
      },
      {
        id: "projects",
        title: "Projects",
        caption: "Publish the initiatives you’re proud of.",
        items: sectionData.projects,
      },
      {
        id: "blog",
        title: "Blog Posts",
        caption: "Control what appears on your knowledge hub.",
        items: sectionData.blog,
        emptyState: (
          <Stack spacing={1} alignItems="center">
            <Article sx={{ color: "rgba(255,255,255,0.4)" }} />
            <Typography variant="body1" fontWeight={600}>
              No blog content yet
            </Typography>
            <Typography variant="body2">
              Publish your first thought leadership piece.
            </Typography>
          </Stack>
        ),
      },
      {
        id: "publications",
        title: "Publications",
        caption: "Maintain your academic portfolio.",
        items: sectionData.publications,
        emptyState: (
          <Stack spacing={1} alignItems="center">
            <MenuBook sx={{ color: "rgba(255,255,255,0.4)" }} />
            <Typography variant="body1" fontWeight={600}>
              No publications recorded
            </Typography>
            <Typography variant="body2">
              Add journals, conference papers, or book chapters.
            </Typography>
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
        id: "contact",
        title: "Contact Channels",
        caption: "Maintain accurate outreach information.",
        items: sectionData.contact,
        showCount: false,
      },
      {
        id: "settings",
        title: "Profile Settings",
        caption: "Control visibility and security options.",
        items: sectionData.settings,
        showCount: false,
      },
    ],
    [sectionData]
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
        id: "group-foundation",
        title: "Profile Foundation",
        description: "Essentials that define who you are and what you do.",
        sectionIds: ["about", "experience", "education", "skills"],
      },
      {
        id: "group-portfolio",
        title: "Portfolio & Insights",
        description:
          "Projects, writing, and scholarly work that showcase expertise.",
        sectionIds: ["projects", "blog", "publications"],
      },
      {
        id: "group-recognition",
        title: "Achievements",
        description:
          "Recognitions, certifications, and impactful contributions.",
        sectionIds: ["awards", "certificates", "activities"],
      },
      {
        id: "group-connections",
        title: "Networks & Reach",
        description:
          "Who you collaborate with and how people connect with you.",
        sectionIds: ["networks", "contact"],
      },
      {
        id: "group-system",
        title: "System Settings",
        description:
          "Controls for visibility, security, and admin-level tweaks.",
        sectionIds: ["settings"],
      },
    ],
    []
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <motion.div variants={itemVariants}>
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
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={() => onEdit("profile", profile)}
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
                  Edit profile content
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Launch />}
                  onClick={handleNavigatePublicProfile}
                  sx={{
                    borderColor: "rgba(255,255,255,0.28)",
                    color: "rgba(255,255,255,0.78)",
                    borderRadius: 3,
                    px: 3,
                    py: 1.2,
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: "rgba(178,223,219,0.8)",
                      backgroundColor: "rgba(178,223,219,0.08)",
                    },
                  }}
                >
                  View public profile
                </Button>
                <Tooltip title="Copy portfolio URL" arrow>
                  <IconButton
                    onClick={() =>
                      navigator.clipboard.writeText(profile.website)
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
            {[
              {
                label: "Projects",
                value: stats.projects,
                icon: <Analytics />,
              },
              {
                label: "Experience",
                value: stats.experiences,
                icon: <Work />,
              },
              {
                label: "Education",
                value: stats.education,
                icon: <School />,
              },
              {
                label: "Publications",
                value: stats.publications,
                icon: <MenuBook />,
              },
              {
                label: "Awards",
                value: stats.awards,
                icon: <Badge />,
              },
              {
                label: "Blog Posts",
                value: stats.blogPosts,
                icon: <Article />,
              },
            ].map((item) => (
              <Grid item xs={6} md={2} key={item.label}>
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
                      {item.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{ color: "#fff", fontWeight: 700 }}
                    >
                      {item.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {item.label}
                    </Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card
          sx={{
            background: "rgba(16, 17, 20, 0.92)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 4,
            p: 3,
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2.5}
            alignItems="stretch"
          >
            {[
              {
                label: "Add content",
                description: "Create new entries for any section",
                actionLabel: "Create",
                icon: <Add />,
                onClick: () => onAdd("about"),
              },
              {
                label: "Bulk update",
                description: "Use CSV or JSON to import data",
                actionLabel: "Upload",
                icon: <Inventory2 />,
                onClick: () => handleSave?.("bulk-import", {}),
              },
              {
                label: "Preview changes",
                description: "Review your public-facing profile",
                actionLabel: "Preview",
                icon: <Launch />,
                onClick: handleNavigatePublicProfile,
              },
            ].map((action) => (
              <Card
                key={action.label}
                sx={{
                  flex: 1,
                  background: "rgba(30,30,37,0.8)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  borderRadius: 3,
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Stack spacing={2}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      display: "grid",
                      placeItems: "center",
                      background: "rgba(129,199,132,0.18)",
                      color: "#A5D6A7",
                    }}
                  >
                    {action.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "#fff", fontWeight: 600 }}
                    >
                      {action.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {action.description}
                    </Typography>
                  </Box>
                </Stack>
                <Button
                  variant="outlined"
                  onClick={action.onClick}
                  sx={{
                    mt: 3,
                    alignSelf: "flex-start",
                    borderColor: "rgba(129,199,132,0.4)",
                    color: "rgba(200,230,201,0.9)",
                    borderRadius: 2,
                    px: 2.5,
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: "rgba(129,199,132,0.75)",
                      backgroundColor: "rgba(129,199,132,0.12)",
                    },
                  }}
                >
                  {action.actionLabel}
                </Button>
              </Card>
            ))}
          </Stack>
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
          <motion.div key={group.id} variants={itemVariants}>
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
                <Grid item xs={12} md={6} key={section.id}>
                  <ResourceSectionCard
                    {...section}
                    onAdd={onAdd}
                    onEdit={onEdit}
                    onDelete={onDelete}
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
