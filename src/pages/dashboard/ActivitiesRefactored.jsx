import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Typography, Grid, Chip, Link, Avatar } from "@mui/material";
import {
  Event,
  School,
  Groups,
  EmojiEvents,
  Business,
  CalendarMonth,
  LocationOn,
  Analytics,
  OpenInNew,
  Schedule,
  Star,
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
  formatDate,
  ANIMATION_VARIANTS,
} from "../../components/dashboard";

const Activities = () => {
  const { dashboardData } = useOutletContext();

  // Use modular data management hook
  const { data } = useDashboardData(
    dashboardData?.activities || defaultActivitiesData,
    "dashboard-activities"
  );

  // Use modular edit mode hook
  const { isEditing, toggleEdit } = useEditMode();

  // Calculate statistics
  const totalActivities = [
    ...(data.conferenceActivities || []),
    ...(data.trainingDelivery || []),
    ...(data.communityService || []),
  ].length;

  const upcomingActivities = [
    ...(data.conferenceActivities || []),
    ...(data.trainingDelivery || []),
    ...(data.communityService || []),
  ].filter((activity) => new Date(activity.date) > new Date()).length;

  const totalImpact =
    data.conferenceActivities?.reduce(
      (acc, activity) => acc + (activity.attendees || 0),
      0
    ) || 0;

  const activePartnership =
    data.communityService?.filter(
      (service) => service.status === STATUS_TYPES.ACTIVE
    ).length || 0;

  return (
    <Box>
      {/* Header with Statistics */}
      <DashboardCard
        title="Professional Activities"
        subtitle="Conference presentations, training delivery, and community service"
        icon={Event}
        color={SECTION_COLORS.activities}
        onEdit={() => toggleEdit("header")}
        editMode={isEditing("header")}
      >
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Activities"
              value={totalActivities}
              icon={Analytics}
              color={SECTION_COLORS.activities}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Upcoming Events"
              value={upcomingActivities}
              icon={Schedule}
              color={DASHBOARD_COLORS.info}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Impact"
              value={totalImpact}
              suffix=" attendees"
              icon={Groups}
              color={DASHBOARD_COLORS.success}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Partnerships"
              value={activePartnership}
              icon={Business}
              color={DASHBOARD_COLORS.purple}
            />
          </Grid>
        </Grid>
      </DashboardCard>

      {/* Conference Activities */}
      <DashboardCard
        title="Conference Activities"
        subtitle="Speaking engagements and presentations"
        icon={EmojiEvents}
        color={DASHBOARD_COLORS.primary}
        onEdit={() => toggleEdit("conferences")}
        editMode={isEditing("conferences")}
      >
        <motion.div
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {data.conferenceActivities?.map((activity, index) => (
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
                        <EmojiEvents />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{ color: "#fff", mb: 0.5 }}
                        >
                          {activity.title}
                        </Typography>
                        <Chip
                          label={activity.type}
                          size="small"
                          sx={{
                            backgroundColor: `${DASHBOARD_COLORS.primary}20`,
                            color: "#fff",
                            mb: 1,
                          }}
                        />
                      </Box>
                    </Box>

                    <Typography variant="body2" sx={{ color: "#aaa", mb: 2 }}>
                      <Business sx={{ mr: 1, fontSize: 16 }} />
                      {activity.event}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <CalendarMonth
                        sx={{ color: "#aaa", mr: 1, fontSize: 16 }}
                      />
                      <Typography variant="caption" sx={{ color: "#aaa" }}>
                        {formatDate(activity.date)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <LocationOn sx={{ color: "#aaa", mr: 1, fontSize: 16 }} />
                      <Typography variant="caption" sx={{ color: "#aaa" }}>
                        {activity.location}
                      </Typography>
                    </Box>

                    {activity.attendees && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Groups sx={{ color: "#aaa", mr: 1, fontSize: 16 }} />
                        <Typography variant="caption" sx={{ color: "#aaa" }}>
                          {activity.attendees} attendees
                        </Typography>
                      </Box>
                    )}

                    {activity.topics && (
                      <TagManager
                        tags={activity.topics}
                        editable={false}
                        color={DASHBOARD_COLORS.primary}
                        variant="outlined"
                        size="small"
                      />
                    )}

                    {activity.presentation && (
                      <Box sx={{ mt: 2 }}>
                        <Link
                          href={activity.presentation}
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
                          View Presentation
                        </Link>
                      </Box>
                    )}
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </DashboardCard>

      {/* Training Delivery */}
      <DashboardCard
        title="Training & Workshops"
        subtitle="Educational sessions and skill development programs"
        icon={School}
        color={DASHBOARD_COLORS.secondary}
        onEdit={() => toggleEdit("training")}
        editMode={isEditing("training")}
      >
        <Grid container spacing={3}>
          {data.trainingDelivery?.map((training, index) => (
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
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <School sx={{ color: DASHBOARD_COLORS.secondary, mr: 2 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: "#fff", mb: 0.5 }}>
                      {training.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#aaa" }}>
                      {training.organization}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="caption" sx={{ color: "#aaa" }}>
                    {formatDate(training.date)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#aaa" }}>
                    {training.duration}
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ color: "#ccc", mb: 2 }}>
                  {training.description}
                </Typography>

                {training.participants && (
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Groups sx={{ color: "#aaa", mr: 1, fontSize: 16 }} />
                    <Typography variant="caption" sx={{ color: "#aaa" }}>
                      {training.participants} participants
                    </Typography>
                  </Box>
                )}

                {training.feedback && (
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Star
                      sx={{
                        color: DASHBOARD_COLORS.amber,
                        mr: 1,
                        fontSize: 16,
                      }}
                    />
                    <Typography variant="caption" sx={{ color: "#fff" }}>
                      {training.feedback}/5 rating
                    </Typography>
                  </Box>
                )}

                {training.skills && (
                  <TagManager
                    tags={training.skills}
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

      {/* Community Service */}
      <DashboardCard
        title="Community Service"
        subtitle="Volunteer work and community engagement"
        icon={Groups}
        color={DASHBOARD_COLORS.success}
        onEdit={() => toggleEdit("community")}
        editMode={isEditing("community")}
      >
        <Grid container spacing={3}>
          {data.communityService?.map((service, index) => (
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
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Groups sx={{ color: DASHBOARD_COLORS.success, mr: 2 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: "#fff", mb: 0.5 }}>
                      {service.role}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#aaa" }}>
                      {service.organization}
                    </Typography>
                  </Box>
                  <Chip
                    label={service.status}
                    size="small"
                    sx={{
                      backgroundColor: `${DASHBOARD_COLORS.success}20`,
                      color: "#fff",
                    }}
                  />
                </Box>

                <Typography variant="body2" sx={{ color: "#ccc", mb: 2 }}>
                  {service.description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="caption" sx={{ color: "#aaa" }}>
                    {formatDate(service.startDate)} -{" "}
                    {service.endDate ? formatDate(service.endDate) : "Present"}
                  </Typography>
                  {service.hoursPerWeek && (
                    <Typography variant="caption" sx={{ color: "#aaa" }}>
                      {service.hoursPerWeek}h/week
                    </Typography>
                  )}
                </Box>

                {service.achievements && service.achievements.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="caption"
                      sx={{ color: "#aaa", mb: 1, display: "block" }}
                    >
                      Key Achievements:
                    </Typography>
                    {service.achievements
                      .slice(0, 2)
                      .map((achievement, idx) => (
                        <Typography
                          key={idx}
                          variant="caption"
                          sx={{ color: "#ccc", display: "block", mb: 0.5 }}
                        >
                          • {achievement}
                        </Typography>
                      ))}
                  </Box>
                )}

                {service.skills && (
                  <TagManager
                    tags={service.skills}
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

// Default activities data structure
const defaultActivitiesData = {
  conferenceActivities: [
    {
      id: 1,
      title: "Keynote Speaker - Future of AI in Healthcare",
      type: "Keynote Speaker",
      event: "International Conference on Medical Informatics (ICMI 2023)",
      organization: "Medical Informatics Society",
      location: "Boston, MA, USA",
      date: "2023-09-15",
      attendees: 500,
      topics: ["AI", "Healthcare", "Machine Learning", "Data Science"],
      presentation: "https://example.com/presentation1",
    },
    {
      id: 2,
      title: "Panel Discussion - Ethics in AI Development",
      type: "Panel Discussion",
      event: "Tech Ethics Summit 2023",
      organization: "Ethics in Technology Foundation",
      location: "San Francisco, CA, USA",
      date: "2023-10-22",
      attendees: 300,
      topics: ["Ethics", "AI", "Technology", "Responsibility"],
    },
  ],
  trainingDelivery: [
    {
      id: 1,
      title: "Advanced Python for Data Science",
      organization: "TechEd Solutions",
      date: "2023-08-10",
      duration: "3 days",
      participants: 25,
      feedback: 4.8,
      description:
        "Comprehensive training on advanced Python techniques for data analysis and machine learning.",
      skills: ["Python", "Data Science", "Machine Learning", "Pandas", "NumPy"],
    },
    {
      id: 2,
      title: "Cloud Architecture Best Practices",
      organization: "CloudTech Institute",
      date: "2023-09-05",
      duration: "2 days",
      participants: 30,
      feedback: 4.9,
      description:
        "Deep dive into cloud architecture patterns and best practices for scalable applications.",
      skills: ["AWS", "Cloud Architecture", "DevOps", "Scalability"],
    },
  ],
  communityService: [
    {
      id: 1,
      role: "Technical Mentor",
      organization: "Code for Good Initiative",
      status: STATUS_TYPES.ACTIVE,
      startDate: "2022-01-15",
      endDate: null,
      hoursPerWeek: 5,
      description:
        "Mentoring underprivileged students in programming and technology skills.",
      achievements: [
        "Mentored 15 students to secure tech internships",
        "Organized 3 coding bootcamps for 100+ participants",
        "Developed curriculum for web development fundamentals",
      ],
      skills: ["Mentoring", "Teaching", "Web Development", "Career Guidance"],
    },
    {
      id: 2,
      role: "Board Member",
      organization: "Tech Diversity Alliance",
      status: STATUS_TYPES.ACTIVE,
      startDate: "2023-03-01",
      endDate: null,
      hoursPerWeek: 3,
      description:
        "Contributing to diversity and inclusion initiatives in the technology sector.",
      achievements: [
        "Launched scholarship program for underrepresented minorities",
        "Increased female participation in tech events by 40%",
      ],
      skills: ["Leadership", "Diversity & Inclusion", "Strategic Planning"],
    },
  ],
};

export default Activities;
