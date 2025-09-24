import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Typography, Grid, Chip, Avatar } from "@mui/material";
import {
  EmojiEvents,
  Star,
  School,
  Business,
  Groups,
  Verified,
  MonetizationOn,
  CalendarMonth,
  LocationOn,
  MilitaryTech,
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
  formatDate,
  formatCurrency,
  ANIMATION_VARIANTS,
} from "../../components/dashboard";

const Awards = () => {
  const { dashboardData } = useOutletContext();

  // Use modular data management hook
  const { data } = useDashboardData(
    dashboardData?.awards || defaultAwardsData,
    "dashboard-awards"
  );

  // Use modular edit mode hook
  const { isEditing, toggleEdit } = useEditMode();

  // Calculate statistics
  const totalAwards = [
    ...(data.academicAwards || []),
    ...(data.professionalAwards || []),
    ...(data.competitionWins || []),
  ].length;

  const totalValue = [
    ...(data.academicAwards || []),
    ...(data.professionalAwards || []),
    ...(data.competitionWins || []),
  ].reduce((acc, award) => acc + (award.monetaryValue || 0), 0);

  const recentAwards = [
    ...(data.academicAwards || []),
    ...(data.professionalAwards || []),
    ...(data.competitionWins || []),
  ].filter(
    (award) =>
      new Date(award.date).getFullYear() >= new Date().getFullYear() - 1
  ).length;

  const prestigiousAwards = [
    ...(data.academicAwards || []),
    ...(data.professionalAwards || []),
    ...(data.competitionWins || []),
  ].filter((award) => award.prestige === "High").length;

  return (
    <Box>
      {/* Header with Statistics */}
      <DashboardCard
        title="Awards & Recognition"
        subtitle="Academic achievements, professional honors, and competition wins"
        icon={EmojiEvents}
        color={SECTION_COLORS.awards}
        onEdit={() => toggleEdit("header")}
        editMode={isEditing("header")}
      >
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Awards"
              value={totalAwards}
              icon={EmojiEvents}
              color={SECTION_COLORS.awards}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Value"
              value={formatCurrency(totalValue)}
              icon={MonetizationOn}
              color={DASHBOARD_COLORS.success}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Recent Awards"
              value={recentAwards}
              subtitle="Last 12 months"
              icon={Star}
              color={DASHBOARD_COLORS.info}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Prestigious"
              value={prestigiousAwards}
              icon={MilitaryTech}
              color={DASHBOARD_COLORS.purple}
            />
          </Grid>
        </Grid>
      </DashboardCard>

      {/* Academic Awards */}
      <DashboardCard
        title="Academic Awards"
        subtitle="Educational achievements and research recognition"
        icon={School}
        color={DASHBOARD_COLORS.primary}
        onEdit={() => toggleEdit("academic")}
        editMode={isEditing("academic")}
      >
        <motion.div
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {data.academicAwards?.map((award, index) => (
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
                        <School />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{ color: "#fff", mb: 0.5 }}
                        >
                          {award.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#aaa", mb: 1 }}
                        >
                          {award.organization}
                        </Typography>
                        <Chip
                          label={award.category}
                          size="small"
                          sx={{
                            backgroundColor: `${DASHBOARD_COLORS.primary}20`,
                            color: "#fff",
                          }}
                        />
                      </Box>
                      {award.prestige === "High" && (
                        <Star sx={{ color: DASHBOARD_COLORS.amber }} />
                      )}
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <CalendarMonth
                        sx={{ color: "#aaa", mr: 1, fontSize: 16 }}
                      />
                      <Typography variant="caption" sx={{ color: "#aaa" }}>
                        {formatDate(award.date)}
                      </Typography>
                    </Box>

                    {award.description && (
                      <Typography variant="body2" sx={{ color: "#ccc", mb: 2 }}>
                        {award.description}
                      </Typography>
                    )}

                    {award.monetaryValue && award.monetaryValue > 0 && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <MonetizationOn
                          sx={{
                            color: DASHBOARD_COLORS.success,
                            mr: 1,
                            fontSize: 16,
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{ color: DASHBOARD_COLORS.success }}
                        >
                          {formatCurrency(award.monetaryValue)}
                        </Typography>
                      </Box>
                    )}

                    {award.criteria && (
                      <TagManager
                        tags={award.criteria}
                        editable={false}
                        color={DASHBOARD_COLORS.primary}
                        variant="outlined"
                        size="small"
                      />
                    )}
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </DashboardCard>

      {/* Professional Awards */}
      <DashboardCard
        title="Professional Awards"
        subtitle="Industry recognition and career achievements"
        icon={Business}
        color={DASHBOARD_COLORS.secondary}
        onEdit={() => toggleEdit("professional")}
        editMode={isEditing("professional")}
      >
        <Grid container spacing={3}>
          {data.professionalAwards?.map((award, index) => (
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
                    <Business />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: "#fff", mb: 0.5 }}>
                      {award.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#aaa", mb: 1 }}>
                      {award.organization}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                      <Chip
                        label={award.category}
                        size="small"
                        sx={{
                          backgroundColor: `${DASHBOARD_COLORS.secondary}20`,
                          color: "#fff",
                        }}
                      />
                      {award.verified && (
                        <Chip
                          icon={<Verified sx={{ fontSize: 16 }} />}
                          label="Verified"
                          size="small"
                          sx={{
                            backgroundColor: `${DASHBOARD_COLORS.success}20`,
                            color: DASHBOARD_COLORS.success,
                          }}
                        />
                      )}
                    </Box>
                  </Box>
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
                    <CalendarMonth
                      sx={{ color: "#aaa", mr: 1, fontSize: 16 }}
                    />
                    <Typography variant="caption" sx={{ color: "#aaa" }}>
                      {formatDate(award.date)}
                    </Typography>
                  </Box>
                  {award.location && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocationOn sx={{ color: "#aaa", mr: 1, fontSize: 16 }} />
                      <Typography variant="caption" sx={{ color: "#aaa" }}>
                        {award.location}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {award.description && (
                  <Typography variant="body2" sx={{ color: "#ccc", mb: 2 }}>
                    {award.description}
                  </Typography>
                )}

                {award.impact && (
                  <TagManager
                    tags={award.impact}
                    label="Impact Areas"
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

      {/* Competition Wins */}
      <DashboardCard
        title="Competition Wins"
        subtitle="Hackathons, contests, and competitive achievements"
        icon={MilitaryTech}
        color={DASHBOARD_COLORS.success}
        onEdit={() => toggleEdit("competition")}
        editMode={isEditing("competition")}
      >
        <Grid container spacing={3}>
          {data.competitionWins?.map((competition, index) => (
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
                    <MilitaryTech />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: "#fff", mb: 0.5 }}>
                      {competition.position} - {competition.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#aaa", mb: 1 }}>
                      {competition.event}
                    </Typography>
                    <Chip
                      label={competition.category}
                      size="small"
                      sx={{
                        backgroundColor: `${DASHBOARD_COLORS.success}20`,
                        color: "#fff",
                      }}
                    />
                  </Box>
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
                    <CalendarMonth
                      sx={{ color: "#aaa", mr: 1, fontSize: 16 }}
                    />
                    <Typography variant="caption" sx={{ color: "#aaa" }}>
                      {formatDate(competition.date)}
                    </Typography>
                  </Box>
                  {competition.participants && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Groups sx={{ color: "#aaa", mr: 1, fontSize: 16 }} />
                      <Typography variant="caption" sx={{ color: "#aaa" }}>
                        {competition.participants} teams
                      </Typography>
                    </Box>
                  )}
                </Box>

                {competition.description && (
                  <Typography variant="body2" sx={{ color: "#ccc", mb: 2 }}>
                    {competition.description}
                  </Typography>
                )}

                {competition.prize && competition.prize.amount > 0 && (
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <MonetizationOn
                      sx={{
                        color: DASHBOARD_COLORS.amber,
                        mr: 1,
                        fontSize: 16,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: DASHBOARD_COLORS.amber }}
                    >
                      {formatCurrency(competition.prize.amount)} -{" "}
                      {competition.prize.type}
                    </Typography>
                  </Box>
                )}

                {competition.technologies && (
                  <TagManager
                    tags={competition.technologies}
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

// Default awards data structure
const defaultAwardsData = {
  academicAwards: [
    {
      id: 1,
      title: "Best Paper Award",
      category: "Research Excellence",
      organization: "International Conference on Medical Informatics (ICMI)",
      date: "2023-09-16",
      description:
        "Recognized for outstanding research contribution in AI-driven healthcare solutions.",
      monetaryValue: 2500,
      prestige: "High",
      criteria: ["Innovation", "Impact", "Technical Excellence"],
    },
    {
      id: 2,
      title: "Dean's List Recognition",
      category: "Academic Performance",
      organization: "University of Technology",
      date: "2023-05-15",
      description: "Achieved GPA of 3.9/4.0 in Master's program.",
      prestige: "Medium",
      criteria: ["Academic Excellence", "Consistency"],
    },
  ],
  professionalAwards: [
    {
      id: 1,
      title: "Tech Innovation Award",
      category: "Innovation",
      organization: "TechCorp Industries",
      date: "2023-11-10",
      location: "San Francisco, CA",
      description:
        "Recognized for developing revolutionary AI-powered diagnostic tools.",
      verified: true,
      impact: ["Healthcare", "AI", "Patient Care"],
    },
    {
      id: 2,
      title: "Employee of the Year",
      category: "Performance",
      organization: "DataSolutions Inc.",
      date: "2023-12-15",
      location: "New York, NY",
      description:
        "Outstanding performance and leadership in multiple high-impact projects.",
      verified: true,
      impact: ["Leadership", "Project Management", "Team Building"],
    },
  ],
  competitionWins: [
    {
      id: 1,
      title: "AI Healthcare Challenge",
      position: "1st Place",
      event: "Global Healthcare Innovation Summit",
      category: "Healthcare Technology",
      date: "2023-08-20",
      participants: 150,
      description:
        "Developed an AI system for early disease detection using medical imaging.",
      prize: {
        amount: 10000,
        type: "Cash Prize + Mentorship",
      },
      technologies: ["Python", "TensorFlow", "Computer Vision", "Healthcare"],
    },
    {
      id: 2,
      title: "Fintech Innovation Hackathon",
      position: "2nd Place",
      event: "Banking Technology Conference",
      category: "Financial Technology",
      date: "2023-07-12",
      participants: 85,
      description:
        "Created blockchain-based solution for secure cross-border payments.",
      prize: {
        amount: 5000,
        type: "Cash Prize",
      },
      technologies: ["Blockchain", "Node.js", "React", "Fintech"],
    },
  ],
};

export default Awards;
