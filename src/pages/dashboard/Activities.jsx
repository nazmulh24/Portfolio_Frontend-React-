import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  TextField,
  Chip,
  IconButton,
  Alert,
  Link,
} from "@mui/material";
import {
  Edit,
  Save,
  Cancel,
  Add,
  Close,
  Event,
  School,
  Groups,
  Campaign,
  EmojiEvents,
  Business,
  CalendarMonth,
  LocationOn,
  Analytics,
  OpenInNew,
  Schedule,
  Star,
  Badge,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Activities = () => {
  const { dashboardData, handleEdit } = useOutletContext();
  const data = dashboardData?.activities;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    // Conference Activities
    conferenceActivities: data?.conferenceActivities || [
      {
        id: 1,
        title: "Keynote Speaker - Future of AI in Healthcare",
        type: "Keynote Speaker",
        event: "International Conference on Medical Informatics (ICMI 2023)",
        organization: "Medical Informatics Society",
        location: "Boston, MA, USA",
        date: "2023-09-15",
        duration: "60 minutes",
        audience: "500+ attendees",
        description:
          "Delivered keynote presentation on the transformative potential of AI in healthcare, covering current applications, challenges, and future directions. Discussed case studies from my research on machine learning for early disease detection.",
        topics: [
          "Artificial Intelligence",
          "Healthcare Technology",
          "Machine Learning",
          "Medical Diagnosis",
        ],
        materials: {
          slides: "/presentations/icmi_2023_keynote.pdf",
          video: "https://youtube.com/watch?v=example123",
          abstract: "/abstracts/icmi_2023_keynote_abstract.pdf",
        },
        impact: {
          citations: 3,
          mediaCoverage: 2,
          followUpConnections: 15,
        },
        category: "Speaking",
        status: "Completed",
      },
      {
        id: 2,
        title: "Technical Session Chair - Web Technologies Track",
        type: "Session Chair",
        event: "IEEE International Conference on Software Engineering",
        organization: "IEEE Computer Society",
        location: "Virtual Event",
        date: "2023-05-20",
        duration: "4 hours",
        audience: "200+ attendees",
        description:
          "Chaired technical sessions on modern web technologies, managed Q&A sessions, and facilitated discussions among researchers and practitioners in the field.",
        topics: [
          "Web Development",
          "Software Engineering",
          "Technology Trends",
        ],
        category: "Organizing",
        status: "Completed",
      },
    ],

    // Workshop & Training Activities
    workshopsTraining: data?.workshopsTraining || [
      {
        id: 3,
        title: "Django for Beginners: Building Scalable Web Applications",
        type: "Workshop Instructor",
        organization: "Tech Education Institute",
        location: "San Francisco, CA",
        date: "2023-08-12",
        duration: "8 hours (2 days)",
        participants: "45 developers",
        description:
          "Conducted intensive workshop covering Django fundamentals, REST API development, database design, and deployment strategies. Provided hands-on training with real-world project examples.",
        topics: [
          "Django",
          "Python",
          "Web Development",
          "REST APIs",
          "Database Design",
        ],
        materials: {
          curriculum: "/workshops/django_curriculum.pdf",
          exercises: "/workshops/django_exercises.zip",
          resources: "/workshops/django_resources.md",
        },
        feedback: {
          rating: 4.8,
          totalReviews: 42,
          completionRate: 93,
        },
        category: "Training",
        status: "Completed",
      },
      {
        id: 4,
        title: "Machine Learning Bootcamp for Healthcare Professionals",
        type: "Training Program Lead",
        organization: "Healthcare Innovation Hub",
        location: "Online",
        date: "2023-07-01",
        duration: "6 weeks (24 hours)",
        participants: "120 professionals",
        description:
          "Designed and delivered comprehensive ML training program specifically for healthcare professionals, covering practical applications, ethical considerations, and implementation strategies.",
        topics: [
          "Machine Learning",
          "Healthcare AI",
          "Data Science",
          "Ethics in AI",
        ],
        materials: {
          curriculum: "/training/ml_healthcare_curriculum.pdf",
          datasets: "/training/healthcare_datasets.zip",
          notebooks: "/training/jupyter_notebooks.zip",
        },
        feedback: {
          rating: 4.9,
          totalReviews: 115,
          completionRate: 87,
        },
        category: "Training",
        status: "Completed",
      },
    ],

    // Community & Volunteer Activities
    communityActivities: data?.communityActivities || [
      {
        id: 5,
        title: "Open Source Contributor - Django REST Framework",
        type: "Code Contributor",
        organization: "Django Software Foundation",
        startDate: "2022-01-15",
        endDate: "Ongoing",
        timeCommitment: "5-10 hours/month",
        description:
          "Active contributor to Django REST Framework, focusing on performance optimizations, documentation improvements, and bug fixes. Maintained several utility packages used by the Django community.",
        contributions: {
          pullRequests: 23,
          issuesResolved: 18,
          documentationPages: 12,
          communityHelp: 150,
        },
        impact: "Packages downloaded 10,000+ times, helped 500+ developers",
        category: "Open Source",
        status: "Active",
      },
      {
        id: 6,
        title: "Volunteer Mentor - Code for Social Good",
        type: "Technical Mentor",
        organization: "Code for Social Good Foundation",
        startDate: "2022-06-01",
        endDate: "2023-12-31",
        timeCommitment: "3-5 hours/week",
        description:
          "Mentored junior developers working on social impact projects, provided technical guidance, code reviews, and career advice. Helped teams build applications for non-profit organizations.",
        contributions: {
          menteesGuided: 12,
          projectsCompleted: 8,
          technicalReviews: 45,
          careerGuidanceSessions: 30,
        },
        impact: "Helped launch 3 applications serving 1000+ users",
        category: "Mentoring",
        status: "Completed",
      },
    ],

    // Professional Service
    professionalService: data?.professionalService || [
      {
        id: 7,
        title: "Editorial Board Member",
        type: "Editorial Service",
        organization: "Journal of Web Technologies",
        startDate: "2023-01-01",
        endDate: "2025-12-31",
        timeCommitment: "2-3 hours/month",
        description:
          "Serve as editorial board member, review manuscripts, provide feedback to authors, and contribute to journal's strategic direction in web technology research.",
        responsibilities: [
          "Manuscript review and evaluation",
          "Author feedback and guidance",
          "Editorial policy development",
          "Special issue coordination",
        ],
        metrics: {
          manuscriptsReviewed: 15,
          averageReviewTime: "14 days",
          acceptanceRecommendations: 8,
        },
        category: "Editorial",
        status: "Active",
      },
      {
        id: 8,
        title: "Technical Program Committee Member",
        type: "Program Committee",
        organization: "International Conference on Software Engineering",
        startDate: "2023-03-01",
        endDate: "2023-06-30",
        timeCommitment: "10-15 hours total",
        description:
          "Served on technical program committee, reviewed conference submissions, participated in paper selection process, and helped maintain conference quality standards.",
        responsibilities: [
          "Paper review and scoring",
          "Author feedback provision",
          "Committee deliberations",
          "Conference planning support",
        ],
        metrics: {
          papersReviewed: 12,
          averageScore: 6.8,
          acceptanceRate: "25%",
        },
        category: "Program Committee",
        status: "Completed",
      },
    ],

    // Awards & Recognition
    awards: data?.awards || [
      {
        id: 9,
        title: "Outstanding Contribution Award",
        type: "Professional Recognition",
        organization: "Django Software Foundation",
        date: "2023-10-15",
        description:
          "Recognized for significant contributions to the Django ecosystem through code contributions, community support, and educational content creation.",
        category: "Community Service",
        significance: "Annual award given to top 10 contributors globally",
        status: "Received",
      },
      {
        id: 10,
        title: "Best Paper Award",
        type: "Academic Recognition",
        organization: "International Conference on Medical Informatics",
        date: "2023-09-16",
        description:
          "Awarded for exceptional research paper on machine learning applications in healthcare diagnosis systems.",
        category: "Research Excellence",
        significance: "Selected from 200+ submissions",
        status: "Received",
      },
    ],

    // Activity Statistics
    activityStats: data?.activityStats || {
      totalActivities: 10,
      speakingEngagements: 8,
      workshopsDelivered: 6,
      communityContributions: 15,
      mentorshipHours: 240,
      volunteersSupervised: 25,
      awardsReceived: 4,
      professionalServices: 12,
      impactReach: 2500,
    },

    // Activity Categories
    activityCategories: data?.activityCategories || [
      "Speaking Engagements",
      "Workshop Instruction",
      "Community Service",
      "Mentoring",
      "Editorial Service",
      "Program Committee",
      "Open Source",
      "Volunteer Work",
      "Professional Recognition",
      "Training & Education",
    ],
  });

  const [saveAlert, setSaveAlert] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  const handleSave = () => {
    if (handleEdit) {
      handleEdit("activities", editedData);
    }
    setIsEditing(false);
    setSaveAlert({
      type: "success",
      message: "Activities section updated successfully!",
    });
    setTimeout(() => setSaveAlert(null), 3000);
  };

  const handleCancel = () => {
    setEditedData({
      conferenceActivities: data?.conferenceActivities || [],
      workshopsTraining: data?.workshopsTraining || [],
      communityActivities: data?.communityActivities || [],
      professionalService: data?.professionalService || [],
      awards: data?.awards || [],
      activityStats: data?.activityStats || {},
      activityCategories: data?.activityCategories || [],
    });
    setIsEditing(false);
  };

  const addCategory = () => {
    if (newCategory.trim() && editedData.activityCategories.length < 15) {
      setEditedData((prev) => ({
        ...prev,
        activityCategories: [...prev.activityCategories, newCategory.trim()],
      }));
      setNewCategory("");
    }
  };

  const removeCategory = (index) => {
    setEditedData((prev) => ({
      ...prev,
      activityCategories: prev.activityCategories.filter((_, i) => i !== index),
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Reusable Activity Card Component
  const ActivityCard = ({
    icon,
    title,
    description,
    children,
    hover = true,
  }) => (
    <Card
      sx={{
        backgroundColor: "transparent",
        border: "1px solid #444",
        borderRadius: 5,
        p: 4,
        mb: 3,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(5px)",
        ...(hover && {
          "&:hover": {
            borderColor: "#4CAF50",
            transition: "border-color 0.3s ease",
          },
        }),
      }}
    >
      {(icon || title || description) && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          {icon &&
            React.cloneElement(icon, {
              sx: { color: "#4CAF50", mr: 2, fontSize: 28 },
            })}
          <Box>
            {title && (
              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                {title}
              </Typography>
            )}
            {description && (
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                {description}
              </Typography>
            )}
          </Box>
        </Box>
      )}
      {children}
    </Card>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ paddingBottom: "2rem" }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 600 }}>
          Activities Section
        </Typography>
        <Typography variant="body1" sx={{ color: "#888" }}>
          Professional activities, community service, and academic engagement
        </Typography>
      </Box>

      {saveAlert && (
        <motion.div variants={itemVariants}>
          <Alert
            severity={saveAlert.type}
            sx={{
              mb: 3,
              backgroundColor:
                saveAlert.type === "success"
                  ? "rgba(46, 125, 50, 0.1)"
                  : "rgba(211, 47, 47, 0.1)",
              color: "#fff",
              border: `1px solid ${
                saveAlert.type === "success" ? "#4CAF50" : "#f44336"
              }`,
              borderRadius: 2,
              backdropFilter: "blur(10px)",
            }}
          >
            {saveAlert.message}
          </Alert>
        </motion.div>
      )}

      {/* Header with Edit Controls */}
      <motion.div variants={itemVariants}>
        <ActivityCard hover={false}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                Activities Management
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Professional engagement, community service, and academic
                contributions
              </Typography>
            </Box>

            {!isEditing ? (
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setIsEditing(true)}
                sx={{
                  borderColor: "#4CAF50",
                  color: "#4CAF50",
                  borderWidth: 2,
                  borderRadius: 2,
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#66BB6A",
                    backgroundColor: "rgba(76, 175, 80, 0.1)",
                    borderWidth: 2,
                  },
                }}
              >
                Edit Activities
              </Button>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  sx={{
                    backgroundColor: "#4CAF50",
                    borderRadius: 2,
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#45a049" },
                  }}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={handleCancel}
                  sx={{
                    borderColor: "#666",
                    color: "#666",
                    borderRadius: 2,
                    "&:hover": {
                      borderColor: "#888",
                      backgroundColor: "rgba(102, 102, 102, 0.1)",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
        </ActivityCard>
      </motion.div>

      {/* Activity Statistics Overview */}
      <motion.div variants={itemVariants}>
        <ActivityCard
          icon={<Analytics />}
          title="Activity Metrics"
          description="Professional engagement and community impact statistics"
        >
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#4CAF50", fontWeight: 700 }}
                >
                  {editedData.activityStats.totalActivities}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Total Activities
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#2196F3", fontWeight: 700 }}
                >
                  {editedData.activityStats.speakingEngagements}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Speaking Events
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#FF9800", fontWeight: 700 }}
                >
                  {editedData.activityStats.workshopsDelivered}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Workshops
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#9C27B0", fontWeight: 700 }}
                >
                  {editedData.activityStats.impactReach.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  People Reached
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Additional Metrics Row */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#E91E63", fontWeight: 600 }}
                >
                  {editedData.activityStats.mentorshipHours}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Mentorship Hours
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#00BCD4", fontWeight: 600 }}
                >
                  {editedData.activityStats.communityContributions}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Community Projects
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#FFC107", fontWeight: 600 }}
                >
                  {editedData.activityStats.professionalServices}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Professional Services
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#795548", fontWeight: 600 }}
                >
                  {editedData.activityStats.awardsReceived}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Awards
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </ActivityCard>
      </motion.div>

      {/* Conference Activities */}
      <motion.div variants={itemVariants}>
        <ActivityCard
          icon={<Event />}
          title="Conference Activities"
          description="Speaking engagements, session chairing, and conference participation"
        >
          {editedData.conferenceActivities.map((activity, index) => (
            <Box
              key={activity.id}
              sx={{
                mb: 4,
                p: 3,
                backgroundColor: "rgba(76, 175, 80, 0.05)",
                border: "1px solid rgba(76, 175, 80, 0.2)",
                borderRadius: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", fontWeight: 600, mb: 1 }}
                  >
                    {activity.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#4CAF50", fontWeight: 500, mb: 1 }}
                  >
                    {activity.event}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      flexWrap: "wrap",
                      mb: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocationOn sx={{ color: "#888", mr: 1, fontSize: 16 }} />
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        {activity.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CalendarMonth
                        sx={{ color: "#888", mr: 1, fontSize: 16 }}
                      />
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        {activity.date}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Schedule sx={{ color: "#888", mr: 1, fontSize: 16 }} />
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        {activity.duration}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Chip
                  label={activity.type}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                    color: "#4CAF50",
                    fontWeight: 600,
                  }}
                />
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {activity.description}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#4CAF50", mb: 1, fontWeight: 600 }}
                >
                  Topics Covered
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {activity.topics.map((topic, idx) => (
                    <Chip
                      key={idx}
                      label={topic}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(33, 150, 243, 0.2)",
                        color: "#2196F3",
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {activity.materials && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#4CAF50", mb: 1, fontWeight: 600 }}
                  >
                    Materials
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {activity.materials.slides && (
                      <Chip
                        icon={<OpenInNew />}
                        label="Slides"
                        component={Link}
                        href={activity.materials.slides}
                        target="_blank"
                        clickable
                        sx={{
                          backgroundColor: "rgba(255, 152, 0, 0.2)",
                          color: "#FF9800",
                        }}
                      />
                    )}
                    {activity.materials.video && (
                      <Chip
                        icon={<OpenInNew />}
                        label="Video"
                        component={Link}
                        href={activity.materials.video}
                        target="_blank"
                        clickable
                        sx={{
                          backgroundColor: "rgba(233, 30, 99, 0.2)",
                          color: "#E91E63",
                        }}
                      />
                    )}
                  </Box>
                </Box>
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" sx={{ color: "#888" }}>
                  <strong>Audience:</strong> {activity.audience}
                </Typography>
                <Chip
                  label={activity.status}
                  size="small"
                  sx={{
                    backgroundColor:
                      activity.status === "Completed"
                        ? "rgba(76, 175, 80, 0.2)"
                        : "rgba(255, 152, 0, 0.2)",
                    color:
                      activity.status === "Completed" ? "#4CAF50" : "#FF9800",
                    fontWeight: 600,
                  }}
                />
              </Box>
            </Box>
          ))}
        </ActivityCard>
      </motion.div>

      {/* Workshop & Training Activities */}
      <motion.div variants={itemVariants}>
        <ActivityCard
          icon={<School />}
          title="Workshops & Training"
          description="Educational programs, training delivery, and skill development"
        >
          {editedData.workshopsTraining.map((workshop, index) => (
            <Box
              key={workshop.id}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "rgba(33, 150, 243, 0.05)",
                border: "1px solid rgba(33, 150, 243, 0.2)",
                borderRadius: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#fff", fontWeight: 600, mb: 1 }}
              >
                {workshop.title}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: "#2196F3", fontWeight: 500, mb: 1 }}
              >
                {workshop.organization}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                  mb: 2,
                }}
              >
                <Typography variant="body2" sx={{ color: "#888" }}>
                  {workshop.location} • {workshop.date} • {workshop.duration}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  <strong>Participants:</strong> {workshop.participants}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {workshop.description}
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {workshop.topics.map((topic, idx) => (
                  <Chip
                    key={idx}
                    label={topic}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(33, 150, 243, 0.2)",
                      color: "#2196F3",
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Box>

              {workshop.feedback && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Star sx={{ color: "#FFC107", mr: 1, fontSize: 18 }} />
                    <Typography
                      variant="body2"
                      sx={{ color: "#fff", fontWeight: 600 }}
                    >
                      {workshop.feedback.rating}/5.0
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    ({workshop.feedback.totalReviews} reviews)
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {workshop.feedback.completionRate}% completion rate
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
        </ActivityCard>
      </motion.div>

      {/* Community Activities */}
      <motion.div variants={itemVariants}>
        <ActivityCard
          icon={<Groups />}
          title="Community & Volunteer Work"
          description="Open source contributions, mentoring, and community service"
        >
          {editedData.communityActivities.map((activity, index) => (
            <Box
              key={activity.id}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "rgba(156, 39, 176, 0.05)",
                border: "1px solid rgba(156, 39, 176, 0.2)",
                borderRadius: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#fff", fontWeight: 600, mb: 1 }}
              >
                {activity.title}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: "#9C27B0", fontWeight: 500, mb: 1 }}
              >
                {activity.organization}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                  mb: 2,
                }}
              >
                <Typography variant="body2" sx={{ color: "#888" }}>
                  {activity.startDate} - {activity.endDate}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  <strong>Time:</strong> {activity.timeCommitment}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {activity.description}
              </Typography>

              {activity.contributions && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#9C27B0", mb: 1, fontWeight: 600 }}
                  >
                    Contributions
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(activity.contributions).map(
                      ([key, value], idx) => (
                        <Grid item xs={6} md={3} key={idx}>
                          <Typography
                            variant="body2"
                            sx={{ color: "#fff", fontWeight: 600 }}
                          >
                            {value}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#888" }}>
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                          </Typography>
                        </Grid>
                      )
                    )}
                  </Grid>
                </Box>
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" sx={{ color: "#888" }}>
                  <strong>Impact:</strong> {activity.impact}
                </Typography>
                <Chip
                  label={activity.status}
                  size="small"
                  sx={{
                    backgroundColor:
                      activity.status === "Active"
                        ? "rgba(76, 175, 80, 0.2)"
                        : "rgba(158, 158, 158, 0.2)",
                    color: activity.status === "Active" ? "#4CAF50" : "#9E9E9E",
                    fontWeight: 600,
                  }}
                />
              </Box>
            </Box>
          ))}
        </ActivityCard>
      </motion.div>

      {/* Professional Service */}
      <motion.div variants={itemVariants}>
        <ActivityCard
          icon={<Business />}
          title="Professional Service"
          description="Editorial boards, program committees, and professional organizations"
        >
          {editedData.professionalService.map((service, index) => (
            <Box
              key={service.id}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "rgba(255, 152, 0, 0.05)",
                border: "1px solid rgba(255, 152, 0, 0.2)",
                borderRadius: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#fff", fontWeight: 600, mb: 1 }}
              >
                {service.title}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: "#FF9800", fontWeight: 500, mb: 1 }}
              >
                {service.organization}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                  mb: 2,
                }}
              >
                <Typography variant="body2" sx={{ color: "#888" }}>
                  {service.startDate} - {service.endDate}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  <strong>Commitment:</strong> {service.timeCommitment}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {service.description}
              </Typography>

              {service.responsibilities && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#FF9800", mb: 1, fontWeight: 600 }}
                  >
                    Responsibilities
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {service.responsibilities.map((resp, idx) => (
                      <Chip
                        key={idx}
                        label={resp}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(255, 152, 0, 0.2)",
                          color: "#FF9800",
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {service.metrics && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#FF9800", mb: 1, fontWeight: 600 }}
                  >
                    Service Metrics
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(service.metrics).map(
                      ([key, value], idx) => (
                        <Grid item xs={4} key={idx}>
                          <Typography
                            variant="body2"
                            sx={{ color: "#fff", fontWeight: 600 }}
                          >
                            {value}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#888" }}>
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                          </Typography>
                        </Grid>
                      )
                    )}
                  </Grid>
                </Box>
              )}

              <Chip
                label={service.status}
                size="small"
                sx={{
                  backgroundColor:
                    service.status === "Active"
                      ? "rgba(76, 175, 80, 0.2)"
                      : "rgba(158, 158, 158, 0.2)",
                  color: service.status === "Active" ? "#4CAF50" : "#9E9E9E",
                  fontWeight: 600,
                }}
              />
            </Box>
          ))}
        </ActivityCard>
      </motion.div>

      {/* Awards & Recognition */}
      <motion.div variants={itemVariants}>
        <ActivityCard
          icon={<EmojiEvents />}
          title="Awards & Recognition"
          description="Professional achievements and community recognition"
        >
          {editedData.awards.map((award, index) => (
            <Box
              key={award.id}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "rgba(255, 193, 7, 0.05)",
                border: "1px solid rgba(255, 193, 7, 0.2)",
                borderRadius: 3,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", fontWeight: 600, mb: 1 }}
                  >
                    {award.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#FFC107", fontWeight: 500, mb: 1 }}
                  >
                    {award.organization}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888", mb: 1 }}>
                    {award.date}
                  </Typography>
                </Box>
                <Badge sx={{ color: "#FFC107", fontSize: 24 }} />
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {award.description}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Chip
                  label={award.category}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255, 193, 7, 0.2)",
                    color: "#FFC107",
                    fontWeight: 600,
                  }}
                />
                {award.significance && (
                  <Typography
                    variant="caption"
                    sx={{ color: "#888", fontStyle: "italic" }}
                  >
                    {award.significance}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </ActivityCard>
      </motion.div>

      {/* Activity Categories */}
      <motion.div variants={itemVariants}>
        <ActivityCard
          icon={<Campaign />}
          title="Activity Categories"
          description="Professional activity types and engagement areas"
        >
          <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
            Max 15 activity categories
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {editedData.activityCategories.map((category, index) => (
              <Chip
                key={index}
                label={category}
                onDelete={isEditing ? () => removeCategory(index) : undefined}
                deleteIcon={isEditing ? <Close /> : undefined}
                sx={{
                  backgroundColor: "rgba(0, 188, 212, 0.2)",
                  color: "#00BCD4",
                  border: "1px solid rgba(0, 188, 212, 0.5)",
                  fontWeight: 600,
                  "& .MuiChip-deleteIcon": {
                    color: "#00BCD4",
                    "&:hover": { color: "#4DD0E1" },
                  },
                }}
              />
            ))}
          </Box>

          {isEditing && editedData.activityCategories.length < 15 && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Add new activity category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addCategory()}
                sx={{
                  flexGrow: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(15, 15, 15, 0.6)",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#444" },
                    "&:hover fieldset": { borderColor: "#4CAF50" },
                    "&.Mui-focused fieldset": { borderColor: "#4CAF50" },
                  },
                  "& .MuiInputBase-input": { color: "#fff" },
                }}
              />
              <IconButton
                onClick={addCategory}
                disabled={!newCategory.trim()}
                sx={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#45a049" },
                  "&:disabled": { backgroundColor: "#333", color: "#666" },
                }}
              >
                <Add />
              </IconButton>
            </Box>
          )}
        </ActivityCard>
      </motion.div>
    </motion.div>
  );
};

export default Activities;
