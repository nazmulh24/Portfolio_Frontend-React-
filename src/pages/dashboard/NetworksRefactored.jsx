import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Typography, Grid, Chip, Link, Avatar } from "@mui/material";
import {
  Groups,
  Business,
  Public,
  LinkedIn,
  GitHub,
  Twitter,
  Analytics,
  Star,
  WorkspacePremium,
  School,
  OpenInNew,
  Forum,
} from "@mui/icons-material";
import { motion } from "framer-motion";

// Import modular components and utilities
import {
  DashboardCard,
  StatCard,
  TagManager,
  useDashboardData,
  useEditMode,
  DASHBOARD_COLORS,
  SECTION_COLORS,
  STATUS_TYPES,
  formatNumber,
  ANIMATION_VARIANTS,
} from "../../components/dashboard";

const Networks = () => {
  const { dashboardData } = useOutletContext();

  // Use modular data management hook
  const { data } = useDashboardData(
    dashboardData?.networks || defaultNetworksData,
    "dashboard-networks"
  );

  // Use modular edit mode hook
  const { isEditing, toggleEdit } = useEditMode();

  // Calculate statistics
  const totalNetworks = [
    ...(data.professionalNetworks || []),
    ...(data.communityNetworks || []),
    ...(data.academicNetworks || []),
  ].length;

  const totalConnections = [
    ...(data.professionalNetworks || []),
    ...(data.communityNetworks || []),
    ...(data.academicNetworks || []),
  ].reduce((acc, network) => acc + (network.connections || 0), 0);

  const activeNetworks = [
    ...(data.professionalNetworks || []),
    ...(data.communityNetworks || []),
    ...(data.academicNetworks || []),
  ].filter((network) => network.status === STATUS_TYPES.ACTIVE).length;

  const totalEngagement = [
    ...(data.professionalNetworks || []),
    ...(data.communityNetworks || []),
    ...(data.academicNetworks || []),
  ].reduce((acc, network) => acc + (network.engagement || 0), 0);

  return (
    <Box>
      {/* Header with Statistics */}
      <DashboardCard
        title="Professional Networks"
        subtitle="Online presence and community engagement"
        icon={Groups}
        color={SECTION_COLORS.networks}
        onEdit={() => toggleEdit("header")}
        editMode={isEditing("header")}
      >
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Networks"
              value={totalNetworks}
              icon={Groups}
              color={SECTION_COLORS.networks}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Connections"
              value={formatNumber(totalConnections)}
              icon={Public}
              color={DASHBOARD_COLORS.success}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Networks"
              value={activeNetworks}
              icon={Analytics}
              color={DASHBOARD_COLORS.info}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Engagement"
              value={formatNumber(totalEngagement)}
              icon={Star}
              color={DASHBOARD_COLORS.purple}
            />
          </Grid>
        </Grid>
      </DashboardCard>

      {/* Professional Networks */}
      <DashboardCard
        title="Professional Networks"
        subtitle="LinkedIn, industry platforms, and professional communities"
        icon={Business}
        color={DASHBOARD_COLORS.primary}
        onEdit={() => toggleEdit("professional")}
        editMode={isEditing("professional")}
      >
        <motion.div
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {data.professionalNetworks?.map((network, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div variants={ANIMATION_VARIANTS.item}>
                  <Box
                    sx={{
                      p: 3,
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderRadius: 3,
                      border: "1px solid #444",
                      height: "100%",
                      "&:hover": {
                        borderColor: DASHBOARD_COLORS.primary,
                      },
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: `${DASHBOARD_COLORS.primary}20`,
                          color: DASHBOARD_COLORS.primary,
                          mr: 2,
                        }}
                      >
                        {getPlatformIcon(network.platform)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{ color: "#fff", mb: 0.5 }}
                        >
                          {network.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#aaa", mb: 1 }}
                        >
                          @{network.username}
                        </Typography>
                        <Chip
                          label={network.platform}
                          size="small"
                          sx={{
                            backgroundColor: `${DASHBOARD_COLORS.primary}20`,
                            color: "#fff",
                          }}
                        />
                      </Box>
                      {network.verified && (
                        <Star sx={{ color: DASHBOARD_COLORS.amber }} />
                      )}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Groups sx={{ color: "#aaa", mr: 1, fontSize: 16 }} />
                        <Typography variant="caption" sx={{ color: "#aaa" }}>
                          {formatNumber(network.connections)} connections
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Analytics
                          sx={{ color: "#aaa", mr: 1, fontSize: 16 }}
                        />
                        <Typography variant="caption" sx={{ color: "#aaa" }}>
                          {formatNumber(network.engagement)} engagement
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="body2" sx={{ color: "#ccc", mb: 2 }}>
                      {network.description}
                    </Typography>

                    {network.achievements &&
                      network.achievements.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="caption"
                            sx={{ color: "#aaa", mb: 1, display: "block" }}
                          >
                            Recent Achievements:
                          </Typography>
                          {network.achievements
                            .slice(0, 2)
                            .map((achievement, idx) => (
                              <Typography
                                key={idx}
                                variant="caption"
                                sx={{
                                  color: "#ccc",
                                  display: "block",
                                  mb: 0.5,
                                }}
                              >
                                • {achievement}
                              </Typography>
                            ))}
                        </Box>
                      )}

                    {network.specialties && (
                      <Box sx={{ mb: 2 }}>
                        <TagManager
                          tags={network.specialties}
                          editable={false}
                          color={DASHBOARD_COLORS.primary}
                          variant="outlined"
                          size="small"
                        />
                      </Box>
                    )}

                    <Link
                      href={network.profileUrl}
                      target="_blank"
                      sx={{
                        color: DASHBOARD_COLORS.primary,
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      <OpenInNew sx={{ mr: 0.5, fontSize: 16 }} />
                      View Profile
                    </Link>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </DashboardCard>

      {/* Community Networks */}
      <DashboardCard
        title="Community Networks"
        subtitle="Developer communities, forums, and collaborative platforms"
        icon={Groups}
        color={DASHBOARD_COLORS.secondary}
        onEdit={() => toggleEdit("community")}
        editMode={isEditing("community")}
      >
        <Grid container spacing={3}>
          {data.communityNetworks?.map((network, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box
                sx={{
                  p: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 3,
                  border: "1px solid #444",
                  height: "100%",
                  "&:hover": {
                    borderColor: DASHBOARD_COLORS.secondary,
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: `${DASHBOARD_COLORS.secondary}20`,
                      color: DASHBOARD_COLORS.secondary,
                      mr: 2,
                    }}
                  >
                    <Groups />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: "#fff", mb: 0.5 }}>
                      {network.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#aaa", mb: 1 }}>
                      {network.platform}
                    </Typography>
                    <Chip
                      label={network.role}
                      size="small"
                      sx={{
                        backgroundColor: `${DASHBOARD_COLORS.secondary}20`,
                        color: "#fff",
                      }}
                    />
                  </Box>
                </Box>

                <Typography variant="body2" sx={{ color: "#ccc", mb: 2 }}>
                  {network.description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Forum sx={{ color: "#aaa", mr: 1, fontSize: 16 }} />
                    <Typography variant="caption" sx={{ color: "#aaa" }}>
                      {network.contributions} contributions
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Star sx={{ color: "#aaa", mr: 1, fontSize: 16 }} />
                    <Typography variant="caption" sx={{ color: "#aaa" }}>
                      {network.reputation} reputation
                    </Typography>
                  </Box>
                </Box>

                {network.badges && network.badges.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="caption"
                      sx={{ color: "#aaa", mb: 1, display: "block" }}
                    >
                      Badges Earned:
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {network.badges.slice(0, 3).map((badge, idx) => (
                        <Chip
                          key={idx}
                          label={badge}
                          size="small"
                          sx={{
                            backgroundColor: `${DASHBOARD_COLORS.amber}20`,
                            color: DASHBOARD_COLORS.amber,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                {network.topics && (
                  <TagManager
                    tags={network.topics}
                    editable={false}
                    color={DASHBOARD_COLORS.secondary}
                    variant="filled"
                    size="small"
                  />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </DashboardCard>

      {/* Academic Networks */}
      <DashboardCard
        title="Academic Networks"
        subtitle="Research collaborations and academic platforms"
        icon={School}
        color={DASHBOARD_COLORS.success}
        onEdit={() => toggleEdit("academic")}
        editMode={isEditing("academic")}
      >
        <Grid container spacing={3}>
          {data.academicNetworks?.map((network, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box
                sx={{
                  p: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 3,
                  border: "1px solid #444",
                  height: "100%",
                  "&:hover": {
                    borderColor: DASHBOARD_COLORS.success,
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: `${DASHBOARD_COLORS.success}20`,
                      color: DASHBOARD_COLORS.success,
                      mr: 2,
                    }}
                  >
                    <School />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: "#fff", mb: 0.5 }}>
                      {network.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#aaa", mb: 1 }}>
                      {network.platform}
                    </Typography>
                    <Chip
                      label={network.field}
                      size="small"
                      sx={{
                        backgroundColor: `${DASHBOARD_COLORS.success}20`,
                        color: "#fff",
                      }}
                    />
                  </Box>
                  {network.verified && (
                    <WorkspacePremium
                      sx={{ color: DASHBOARD_COLORS.success }}
                    />
                  )}
                </Box>

                <Typography variant="body2" sx={{ color: "#ccc", mb: 2 }}>
                  {network.description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Analytics sx={{ color: "#aaa", mr: 1, fontSize: 16 }} />
                    <Typography variant="caption" sx={{ color: "#aaa" }}>
                      {network.publications} publications
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Star sx={{ color: "#aaa", mr: 1, fontSize: 16 }} />
                    <Typography variant="caption" sx={{ color: "#aaa" }}>
                      {network.citations} citations
                    </Typography>
                  </Box>
                </Box>

                {network.affiliations && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="caption"
                      sx={{ color: "#aaa", mb: 1, display: "block" }}
                    >
                      Affiliations:
                    </Typography>
                    {network.affiliations.map((affiliation, idx) => (
                      <Typography
                        key={idx}
                        variant="caption"
                        sx={{ color: "#ccc", display: "block", mb: 0.5 }}
                      >
                        • {affiliation}
                      </Typography>
                    ))}
                  </Box>
                )}

                {network.researchAreas && (
                  <TagManager
                    tags={network.researchAreas}
                    editable={false}
                    color={DASHBOARD_COLORS.success}
                    variant="outlined"
                    size="small"
                  />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </DashboardCard>
    </Box>
  );
};

// Helper functions
const getPlatformIcon = (platform) => {
  const iconMap = {
    LinkedIn: <LinkedIn />,
    GitHub: <GitHub />,
    Twitter: <Twitter />,
    default: <Business />,
  };
  return iconMap[platform] || iconMap.default;
};

// Default networks data structure
const defaultNetworksData = {
  professionalNetworks: [
    {
      id: 1,
      name: "LinkedIn Professional Network",
      platform: "LinkedIn",
      username: "nazmul-hossain-dev",
      profileUrl: "https://linkedin.com/in/nazmul-hossain-dev",
      connections: 2500,
      engagement: 15000,
      verified: true,
      description:
        "Professional network focused on AI, healthcare technology, and software engineering.",
      achievements: [
        "Featured in LinkedIn's Top Voices for AI in Healthcare",
        "1M+ post impressions in the last quarter",
      ],
      specialties: [
        "AI",
        "Healthcare Technology",
        "Software Engineering",
        "Machine Learning",
      ],
      status: STATUS_TYPES.ACTIVE,
    },
    {
      id: 2,
      name: "GitHub Open Source Profile",
      platform: "GitHub",
      username: "nazmulh24",
      profileUrl: "https://github.com/nazmulh24",
      connections: 850,
      engagement: 5200,
      verified: true,
      description:
        "Active contributor to open-source projects in healthcare AI and web development.",
      achievements: [
        "100+ repositories with 500+ stars",
        "Contributed to 25+ open source projects",
      ],
      specialties: ["Open Source", "Python", "React", "Healthcare AI"],
      status: STATUS_TYPES.ACTIVE,
    },
  ],
  communityNetworks: [
    {
      id: 1,
      name: "Stack Overflow Developer Community",
      platform: "Stack Overflow",
      role: "Top Contributor",
      contributions: 450,
      reputation: 12000,
      description:
        "Active contributor helping developers with AI, Python, and web development questions.",
      badges: ["Python Expert", "Machine Learning", "React Specialist"],
      topics: ["Python", "JavaScript", "Machine Learning", "React", "Django"],
    },
    {
      id: 2,
      name: "Dev.to Tech Community",
      platform: "Dev.to",
      role: "Featured Author",
      contributions: 85,
      reputation: 8500,
      description:
        "Technical writer sharing insights on AI development and best practices.",
      badges: ["Top Author", "Community Champion", "AI Advocate"],
      topics: ["AI Development", "Career Growth", "Technical Leadership"],
    },
  ],
  academicNetworks: [
    {
      id: 1,
      name: "ResearchGate Academic Network",
      platform: "ResearchGate",
      field: "Computer Science & AI",
      publications: 12,
      citations: 156,
      verified: true,
      description:
        "Research focus on AI applications in healthcare and medical informatics.",
      affiliations: [
        "Medical AI Research Lab, Tech University",
        "Healthcare Innovation Consortium",
      ],
      researchAreas: [
        "Medical AI",
        "Healthcare Informatics",
        "Machine Learning",
        "Computer Vision",
      ],
    },
    {
      id: 2,
      name: "IEEE Computer Society",
      platform: "IEEE",
      field: "Computer Engineering",
      publications: 8,
      citations: 89,
      verified: true,
      description:
        "Member of IEEE Computer Society contributing to AI and healthcare technology standards.",
      affiliations: [
        "IEEE Computer Society",
        "IEEE Engineering in Medicine and Biology Society",
      ],
      researchAreas: [
        "AI Standards",
        "Healthcare Technology",
        "Biomedical Engineering",
      ],
    },
  ],
};

export default Networks;
