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
  EmojiEvents,
  Star,
  WorkspacePremium,
  School,
  Business,
  Groups,
  Campaign,
  Verified,
  MonetizationOn,
  CalendarMonth,
  LocationOn,
  Analytics,
  Badge,
  MilitaryTech,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Awards = () => {
  const { dashboardData, handleEdit } = useOutletContext();
  const data = dashboardData?.awards;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    // Academic Awards
    academicAwards: data?.academicAwards || [
      {
        id: 1,
        title: "Best Paper Award",
        category: "Research Excellence",
        organization: "International Conference on Medical Informatics (ICMI)",
        year: "2023",
        date: "2023-09-16",
        location: "Boston, MA, USA",
        description:
          "Recognized for outstanding research paper on 'Machine Learning Applications in Early Disease Detection: A Comprehensive Analysis of Healthcare Data Systems'. The paper demonstrated significant improvements in diagnostic accuracy using novel ML algorithms.",
        paperTitle: "Machine Learning Applications in Early Disease Detection",
        significance: "Selected from 200+ submissions across 40 countries",
        impactMetrics: {
          citations: 15,
          downloads: 1200,
          mediaFeatured: 3,
        },
        monetary: false,
        certificate: "/certificates/icmi_2023_best_paper.pdf",
        status: "Received",
        prestigeLevel: "International",
      },
      {
        id: 2,
        title: "Outstanding Graduate Research Award",
        category: "Academic Achievement",
        organization: "Computer Science Department, University",
        year: "2022",
        date: "2022-05-15",
        location: "University Campus",
        description:
          "Awarded for exceptional doctoral research contributions in the field of web technologies and machine learning applications. Recognized for innovative approaches to scalable web application architectures and their practical implementations.",
        significance: "Top 1% of graduating PhD students",
        impactMetrics: {
          researchProjects: 4,
          publications: 12,
          collaborations: 8,
        },
        monetary: true,
        monetaryValue: 5000,
        certificate: "/certificates/outstanding_graduate_research_2022.pdf",
        status: "Received",
        prestigeLevel: "University",
      },
      {
        id: 3,
        title: "Dean's List Recognition",
        category: "Academic Excellence",
        organization: "College of Engineering",
        year: "2020-2022",
        date: "2022-06-01",
        description:
          "Consistently maintained GPA above 3.8 throughout graduate studies. Recognized for academic excellence across multiple semesters while conducting research and teaching undergraduate courses.",
        significance: "Maintained for 6 consecutive semesters",
        monetary: false,
        certificate: "/certificates/deans_list_2020_2022.pdf",
        status: "Received",
        prestigeLevel: "University",
      },
    ],

    // Professional Awards
    professionalAwards: data?.professionalAwards || [
      {
        id: 4,
        title: "Outstanding Contribution Award",
        category: "Community Service",
        organization: "Django Software Foundation",
        year: "2023",
        date: "2023-10-15",
        location: "Virtual Ceremony",
        description:
          "Recognized for significant contributions to the Django ecosystem through code contributions, community support, educational content creation, and mentorship of new contributors. Contributions include performance optimizations, documentation improvements, and community guidance.",
        significance: "Annual award given to top 10 contributors globally",
        impactMetrics: {
          pullRequests: 45,
          issuesResolved: 32,
          communityHelp: 200,
          packagesDownloads: 25000,
        },
        monetary: false,
        certificate: "/certificates/django_outstanding_contribution_2023.pdf",
        status: "Received",
        prestigeLevel: "International",
      },
      {
        id: 5,
        title: "Developer Excellence Award",
        category: "Technical Innovation",
        organization: "Tech Innovation Society",
        year: "2023",
        date: "2023-07-20",
        location: "San Francisco, CA",
        description:
          "Awarded for innovative solutions in web development and deployment automation. Recognized for developing scalable Django applications and contributing to open-source projects that have positively impacted the developer community.",
        significance: "Selected from 500+ nominations worldwide",
        impactMetrics: {
          projectsImpacted: 15,
          developersHelped: 300,
          codeReuse: 1000,
        },
        monetary: true,
        monetaryValue: 2500,
        certificate: "/certificates/developer_excellence_2023.pdf",
        status: "Received",
        prestigeLevel: "International",
      },
      {
        id: 6,
        title: "Innovation Leadership Award",
        category: "Leadership",
        organization: "Technology Leadership Council",
        year: "2022",
        date: "2022-11-10",
        location: "Seattle, WA",
        description:
          "Recognized for leadership in technology innovation and team development. Led multiple successful projects that resulted in significant performance improvements and cost savings for client organizations.",
        significance: "Top 5% of technology leaders in the region",
        impactMetrics: {
          teamsLed: 3,
          projectsDelivered: 8,
          costSavings: 150000,
        },
        monetary: true,
        monetaryValue: 3000,
        certificate: "/certificates/innovation_leadership_2022.pdf",
        status: "Received",
        prestigeLevel: "Regional",
      },
    ],

    // Competition Awards
    competitionAwards: data?.competitionAwards || [
      {
        id: 7,
        title: "First Place - Healthcare AI Challenge",
        category: "Competition",
        organization: "Global Healthcare Innovation Summit",
        year: "2023",
        date: "2023-03-25",
        location: "London, UK",
        description:
          "Won first place in international healthcare AI competition for developing an innovative machine learning solution for early disease detection. The solution demonstrated 95% accuracy in preliminary testing and showed potential for real-world medical applications.",
        significance: "120 teams from 25 countries participated",
        impactMetrics: {
          accuracy: "95%",
          datasetSize: "100K+ samples",
          processingSpeed: "Real-time",
        },
        monetary: true,
        monetaryValue: 10000,
        certificate: "/certificates/healthcare_ai_challenge_2023.pdf",
        status: "Received",
        prestigeLevel: "International",
        teamSize: 3,
        technologies: [
          "Python",
          "TensorFlow",
          "Healthcare APIs",
          "Cloud Computing",
        ],
      },
      {
        id: 8,
        title: "Second Place - Web Innovation Hackathon",
        category: "Competition",
        organization: "Silicon Valley Tech Hub",
        year: "2022",
        date: "2022-08-14",
        location: "Palo Alto, CA",
        description:
          "Developed an innovative web application for real-time collaboration during a 48-hour hackathon. The application featured advanced WebSocket implementations and responsive design, garnering praise from industry judges.",
        significance: "80+ teams, judged by industry experts",
        impactMetrics: {
          users: "1000+ during demo",
          performance: "Sub-50ms latency",
          features: "15+ core features",
        },
        monetary: true,
        monetaryValue: 5000,
        certificate: "/certificates/web_innovation_hackathon_2022.pdf",
        status: "Received",
        prestigeLevel: "Regional",
        teamSize: 4,
        technologies: ["React", "Django", "WebSocket", "PostgreSQL"],
      },
    ],

    // Recognition Awards
    recognitionAwards: data?.recognitionAwards || [
      {
        id: 9,
        title: "Community Champion Award",
        category: "Community Impact",
        organization: "Open Source Initiative",
        year: "2023",
        date: "2023-06-30",
        description:
          "Recognized for exceptional contributions to open source communities, including mentoring new contributors, maintaining popular packages, and fostering inclusive development environments.",
        significance: "Annual recognition for top community contributors",
        impactMetrics: {
          mentees: 25,
          packages: 8,
          communityGrowth: "40%",
        },
        monetary: false,
        certificate: "/certificates/community_champion_2023.pdf",
        status: "Received",
        prestigeLevel: "International",
      },
      {
        id: 10,
        title: "Teaching Excellence Recognition",
        category: "Education",
        organization: "Education Excellence Foundation",
        year: "2022",
        date: "2022-12-05",
        description:
          "Awarded for outstanding performance in teaching and training programs. Consistently received high ratings from students and demonstrated innovative teaching methods in technology education.",
        significance: "Top 10% of instructors evaluated",
        impactMetrics: {
          studentsImpacted: 500,
          courseRating: 4.9,
          completionRate: "92%",
        },
        monetary: true,
        monetaryValue: 1500,
        certificate: "/certificates/teaching_excellence_2022.pdf",
        status: "Received",
        prestigeLevel: "National",
      },
    ],

    // Awards Statistics
    awardStats: data?.awardStats || {
      totalAwards: 10,
      internationalAwards: 4,
      nationalAwards: 3,
      regionalAwards: 2,
      universityAwards: 1,
      monetaryAwards: 6,
      totalMonetaryValue: 27000,
      categories: 8,
      organizationsRecognized: 10,
      yearsSpan: 4,
    },

    // Award Categories
    awardCategories: data?.awardCategories || [
      "Research Excellence",
      "Academic Achievement",
      "Community Service",
      "Technical Innovation",
      "Leadership",
      "Competition",
      "Community Impact",
      "Education",
      "Open Source",
      "Professional Development",
    ],
  });

  const [saveAlert, setSaveAlert] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  const handleSave = () => {
    if (handleEdit) {
      handleEdit("awards", editedData);
    }
    setIsEditing(false);
    setSaveAlert({
      type: "success",
      message: "Awards section updated successfully!",
    });
    setTimeout(() => setSaveAlert(null), 3000);
  };

  const handleCancel = () => {
    setEditedData({
      academicAwards: data?.academicAwards || [],
      professionalAwards: data?.professionalAwards || [],
      competitionAwards: data?.competitionAwards || [],
      recognitionAwards: data?.recognitionAwards || [],
      awardStats: data?.awardStats || {},
      awardCategories: data?.awardCategories || [],
    });
    setIsEditing(false);
  };

  const addCategory = () => {
    if (newCategory.trim() && editedData.awardCategories.length < 15) {
      setEditedData((prev) => ({
        ...prev,
        awardCategories: [...prev.awardCategories, newCategory.trim()],
      }));
      setNewCategory("");
    }
  };

  const removeCategory = (index) => {
    setEditedData((prev) => ({
      ...prev,
      awardCategories: prev.awardCategories.filter((_, i) => i !== index),
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

  // Reusable Award Card Component
  const AwardCard = ({ icon, title, description, children, hover = true }) => (
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
            borderColor: "#FFD700",
            transition: "border-color 0.3s ease",
          },
        }),
      }}
    >
      {(icon || title || description) && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          {icon &&
            React.cloneElement(icon, {
              sx: { color: "#FFD700", mr: 2, fontSize: 28 },
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

  // Get prestige level color
  const getPrestigeLevelColor = (level) => {
    switch (level) {
      case "International":
        return "#FFD700";
      case "National":
        return "#C0C0C0";
      case "Regional":
        return "#CD7F32";
      case "University":
        return "#4CAF50";
      default:
        return "#888";
    }
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      "Research Excellence": "#E91E63",
      "Academic Achievement": "#2196F3",
      "Community Service": "#4CAF50",
      "Technical Innovation": "#FF9800",
      Leadership: "#9C27B0",
      Competition: "#F44336",
      "Community Impact": "#00BCD4",
      Education: "#795548",
      "Open Source": "#607D8B",
      "Professional Development": "#FFC107",
    };
    return colors[category] || "#888";
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ paddingBottom: "2rem" }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 600 }}>
          Awards Section
        </Typography>
        <Typography variant="body1" sx={{ color: "#888" }}>
          Professional achievements, recognitions, and accolades
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
        <AwardCard hover={false}>
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
                Awards Management
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Professional achievements, academic recognitions, and
                competition awards
              </Typography>
            </Box>

            {!isEditing ? (
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setIsEditing(true)}
                sx={{
                  borderColor: "#FFD700",
                  color: "#FFD700",
                  borderWidth: 2,
                  borderRadius: 2,
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#FFF176",
                    backgroundColor: "rgba(255, 215, 0, 0.1)",
                    borderWidth: 2,
                  },
                }}
              >
                Edit Awards
              </Button>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  sx={{
                    backgroundColor: "#FFD700",
                    color: "#000",
                    borderRadius: 2,
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#FFC107" },
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
        </AwardCard>
      </motion.div>

      {/* Awards Statistics Overview */}
      <motion.div variants={itemVariants}>
        <AwardCard
          icon={<Analytics />}
          title="Awards Metrics"
          description="Achievement statistics and recognition summary"
        >
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#FFD700", fontWeight: 700 }}
                >
                  {editedData.awardStats.totalAwards}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Total Awards
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#E91E63", fontWeight: 700 }}
                >
                  {editedData.awardStats.internationalAwards}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  International
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#4CAF50", fontWeight: 700 }}
                >
                  {editedData.awardStats.monetaryAwards}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Monetary Awards
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#2196F3", fontWeight: 700 }}
                >
                  $
                  {(editedData.awardStats.totalMonetaryValue / 1000).toFixed(0)}
                  K
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Total Value
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
                  sx={{ color: "#C0C0C0", fontWeight: 600 }}
                >
                  {editedData.awardStats.nationalAwards}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  National Awards
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#CD7F32", fontWeight: 600 }}
                >
                  {editedData.awardStats.regionalAwards}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Regional Awards
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#FF9800", fontWeight: 600 }}
                >
                  {editedData.awardStats.categories}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Categories
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#9C27B0", fontWeight: 600 }}
                >
                  {editedData.awardStats.yearsSpan}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Years Span
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </AwardCard>
      </motion.div>

      {/* Academic Awards */}
      <motion.div variants={itemVariants}>
        <AwardCard
          icon={<School />}
          title="Academic Awards"
          description="Research excellence and academic achievement recognition"
        >
          {editedData.academicAwards.map((award, index) => (
            <Box
              key={award.id}
              sx={{
                mb: 4,
                p: 3,
                backgroundColor: "rgba(33, 150, 243, 0.05)",
                border: "1px solid rgba(33, 150, 243, 0.2)",
                borderRadius: 3,
                position: "relative",
              }}
            >
              <Box sx={{ position: "absolute", top: 15, right: 15 }}>
                <EmojiEvents sx={{ color: "#FFD700", fontSize: 28 }} />
              </Box>

              <Typography
                variant="h6"
                sx={{ color: "#fff", fontWeight: 600, mb: 1, pr: 5 }}
              >
                {award.title}
              </Typography>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Chip
                  label={award.category}
                  size="small"
                  sx={{
                    backgroundColor: `${getCategoryColor(award.category)}20`,
                    color: getCategoryColor(award.category),
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={award.prestigeLevel}
                  size="small"
                  sx={{
                    backgroundColor: `${getPrestigeLevelColor(
                      award.prestigeLevel
                    )}20`,
                    color: getPrestigeLevelColor(award.prestigeLevel),
                    fontWeight: 600,
                  }}
                />
                {award.monetary && (
                  <Chip
                    icon={<MonetizationOn sx={{ fontSize: 16 }} />}
                    label={
                      award.monetaryValue
                        ? `$${award.monetaryValue.toLocaleString()}`
                        : "Monetary"
                    }
                    size="small"
                    sx={{
                      backgroundColor: "rgba(76, 175, 80, 0.2)",
                      color: "#4CAF50",
                      fontWeight: 600,
                    }}
                  />
                )}
              </Box>

              <Typography
                variant="subtitle2"
                sx={{ color: "#2196F3", fontWeight: 500, mb: 1 }}
              >
                {award.organization}
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
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarMonth sx={{ color: "#888", mr: 1, fontSize: 16 }} />
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {award.date}
                  </Typography>
                </Box>
                {award.location && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LocationOn sx={{ color: "#888", mr: 1, fontSize: 16 }} />
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      {award.location}
                    </Typography>
                  </Box>
                )}
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {award.description}
              </Typography>

              {award.paperTitle && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#2196F3", mb: 1, fontWeight: 600 }}
                  >
                    Paper Title
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#fff", fontStyle: "italic" }}
                  >
                    "{award.paperTitle}"
                  </Typography>
                </Box>
              )}

              {award.significance && (
                <Typography
                  variant="body2"
                  sx={{ color: "#FFD700", fontWeight: 600, mb: 2 }}
                >
                  ⭐ {award.significance}
                </Typography>
              )}

              {award.impactMetrics && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#2196F3", mb: 1, fontWeight: 600 }}
                  >
                    Impact Metrics
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(award.impactMetrics).map(
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

              {award.certificate && (
                <Box sx={{ mt: 2 }}>
                  <Chip
                    icon={<Verified />}
                    label="View Certificate"
                    component={Link}
                    href={award.certificate}
                    target="_blank"
                    clickable
                    sx={{
                      backgroundColor: "rgba(76, 175, 80, 0.2)",
                      color: "#4CAF50",
                      fontWeight: 600,
                    }}
                  />
                </Box>
              )}
            </Box>
          ))}
        </AwardCard>
      </motion.div>

      {/* Professional Awards */}
      <motion.div variants={itemVariants}>
        <AwardCard
          icon={<Business />}
          title="Professional Awards"
          description="Industry recognition and professional achievement"
        >
          {editedData.professionalAwards.map((award, index) => (
            <Box
              key={award.id}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "rgba(156, 39, 176, 0.05)",
                border: "1px solid rgba(156, 39, 176, 0.2)",
                borderRadius: 3,
                position: "relative",
              }}
            >
              <Box sx={{ position: "absolute", top: 15, right: 15 }}>
                <WorkspacePremium sx={{ color: "#FFD700", fontSize: 28 }} />
              </Box>

              <Typography
                variant="h6"
                sx={{ color: "#fff", fontWeight: 600, mb: 1, pr: 5 }}
              >
                {award.title}
              </Typography>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Chip
                  label={award.category}
                  size="small"
                  sx={{
                    backgroundColor: `${getCategoryColor(award.category)}20`,
                    color: getCategoryColor(award.category),
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={award.prestigeLevel}
                  size="small"
                  sx={{
                    backgroundColor: `${getPrestigeLevelColor(
                      award.prestigeLevel
                    )}20`,
                    color: getPrestigeLevelColor(award.prestigeLevel),
                    fontWeight: 600,
                  }}
                />
                {award.monetary && (
                  <Chip
                    icon={<MonetizationOn sx={{ fontSize: 16 }} />}
                    label={`$${award.monetaryValue.toLocaleString()}`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(76, 175, 80, 0.2)",
                      color: "#4CAF50",
                      fontWeight: 600,
                    }}
                  />
                )}
              </Box>

              <Typography
                variant="subtitle2"
                sx={{ color: "#9C27B0", fontWeight: 500, mb: 1 }}
              >
                {award.organization}
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
                  {award.date} • {award.location}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {award.description}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#FFD700", fontWeight: 600, mb: 2 }}
              >
                ⭐ {award.significance}
              </Typography>

              {award.impactMetrics && (
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={2}>
                    {Object.entries(award.impactMetrics).map(
                      ([key, value], idx) => (
                        <Grid item xs={4} key={idx}>
                          <Typography
                            variant="body2"
                            sx={{ color: "#fff", fontWeight: 600 }}
                          >
                            {typeof value === "number"
                              ? value.toLocaleString()
                              : value}
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
            </Box>
          ))}
        </AwardCard>
      </motion.div>

      {/* Competition Awards */}
      <motion.div variants={itemVariants}>
        <AwardCard
          icon={<EmojiEvents />}
          title="Competition Awards"
          description="Hackathon victories and competitive achievements"
        >
          {editedData.competitionAwards.map((award, index) => (
            <Box
              key={award.id}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "rgba(244, 67, 54, 0.05)",
                border: "1px solid rgba(244, 67, 54, 0.2)",
                borderRadius: 3,
                position: "relative",
              }}
            >
              <Box sx={{ position: "absolute", top: 15, right: 15 }}>
                <MilitaryTech sx={{ color: "#FFD700", fontSize: 28 }} />
              </Box>

              <Typography
                variant="h6"
                sx={{ color: "#fff", fontWeight: 600, mb: 1, pr: 5 }}
              >
                {award.title}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 2,
                  flexWrap: "wrap",
                }}
              >
                <Chip
                  label={award.category}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(244, 67, 54, 0.2)",
                    color: "#F44336",
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={award.prestigeLevel}
                  size="small"
                  sx={{
                    backgroundColor: `${getPrestigeLevelColor(
                      award.prestigeLevel
                    )}20`,
                    color: getPrestigeLevelColor(award.prestigeLevel),
                    fontWeight: 600,
                  }}
                />
                <Chip
                  icon={<MonetizationOn sx={{ fontSize: 16 }} />}
                  label={`$${award.monetaryValue.toLocaleString()}`}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                    color: "#4CAF50",
                    fontWeight: 600,
                  }}
                />
                {award.teamSize && (
                  <Chip
                    icon={<Groups sx={{ fontSize: 16 }} />}
                    label={`Team of ${award.teamSize}`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255, 152, 0, 0.2)",
                      color: "#FF9800",
                      fontWeight: 600,
                    }}
                  />
                )}
              </Box>

              <Typography
                variant="subtitle2"
                sx={{ color: "#F44336", fontWeight: 500, mb: 1 }}
              >
                {award.organization}
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
                  {award.date} • {award.location}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {award.description}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#FFD700", fontWeight: 600, mb: 2 }}
              >
                🏆 {award.significance}
              </Typography>

              {award.technologies && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#F44336", mb: 1, fontWeight: 600 }}
                  >
                    Technologies Used
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {award.technologies.map((tech, idx) => (
                      <Chip
                        key={idx}
                        label={tech}
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
              )}

              {award.impactMetrics && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#F44336", mb: 1, fontWeight: 600 }}
                  >
                    Achievement Metrics
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(award.impactMetrics).map(
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
            </Box>
          ))}
        </AwardCard>
      </motion.div>

      {/* Recognition Awards */}
      <motion.div variants={itemVariants}>
        <AwardCard
          icon={<Star />}
          title="Recognition Awards"
          description="Community impact and service recognition"
        >
          {editedData.recognitionAwards.map((award, index) => (
            <Box
              key={award.id}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "rgba(0, 188, 212, 0.05)",
                border: "1px solid rgba(0, 188, 212, 0.2)",
                borderRadius: 3,
                position: "relative",
              }}
            >
              <Box sx={{ position: "absolute", top: 15, right: 15 }}>
                <Badge sx={{ color: "#FFD700", fontSize: 28 }} />
              </Box>

              <Typography
                variant="h6"
                sx={{ color: "#fff", fontWeight: 600, mb: 1, pr: 5 }}
              >
                {award.title}
              </Typography>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Chip
                  label={award.category}
                  size="small"
                  sx={{
                    backgroundColor: `${getCategoryColor(award.category)}20`,
                    color: getCategoryColor(award.category),
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={award.prestigeLevel}
                  size="small"
                  sx={{
                    backgroundColor: `${getPrestigeLevelColor(
                      award.prestigeLevel
                    )}20`,
                    color: getPrestigeLevelColor(award.prestigeLevel),
                    fontWeight: 600,
                  }}
                />
                {award.monetary && (
                  <Chip
                    icon={<MonetizationOn sx={{ fontSize: 16 }} />}
                    label={`$${award.monetaryValue.toLocaleString()}`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(76, 175, 80, 0.2)",
                      color: "#4CAF50",
                      fontWeight: 600,
                    }}
                  />
                )}
              </Box>

              <Typography
                variant="subtitle2"
                sx={{ color: "#00BCD4", fontWeight: 500, mb: 1 }}
              >
                {award.organization}
              </Typography>

              <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
                {award.date}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {award.description}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#FFD700", fontWeight: 600, mb: 2 }}
              >
                🌟 {award.significance}
              </Typography>

              {award.impactMetrics && (
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={2}>
                    {Object.entries(award.impactMetrics).map(
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
            </Box>
          ))}
        </AwardCard>
      </motion.div>

      {/* Award Categories */}
      <motion.div variants={itemVariants}>
        <AwardCard
          icon={<Campaign />}
          title="Award Categories"
          description="Recognition types and achievement areas"
        >
          <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
            Max 15 award categories
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {editedData.awardCategories.map((category, index) => (
              <Chip
                key={index}
                label={category}
                onDelete={isEditing ? () => removeCategory(index) : undefined}
                deleteIcon={isEditing ? <Close /> : undefined}
                sx={{
                  backgroundColor: `${getCategoryColor(category)}20`,
                  color: getCategoryColor(category),
                  border: `1px solid ${getCategoryColor(category)}50`,
                  fontWeight: 600,
                  "& .MuiChip-deleteIcon": {
                    color: getCategoryColor(category),
                    "&:hover": { opacity: 0.8 },
                  },
                }}
              />
            ))}
          </Box>

          {isEditing && editedData.awardCategories.length < 15 && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Add new award category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addCategory()}
                sx={{
                  flexGrow: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(15, 15, 15, 0.6)",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#444" },
                    "&:hover fieldset": { borderColor: "#FFD700" },
                    "&.Mui-focused fieldset": { borderColor: "#FFD700" },
                  },
                  "& .MuiInputBase-input": { color: "#fff" },
                }}
              />
              <IconButton
                onClick={addCategory}
                disabled={!newCategory.trim()}
                sx={{
                  backgroundColor: "#FFD700",
                  color: "#000",
                  "&:hover": { backgroundColor: "#FFC107" },
                  "&:disabled": { backgroundColor: "#333", color: "#666" },
                }}
              >
                <Add />
              </IconButton>
            </Box>
          )}
        </AwardCard>
      </motion.div>
    </motion.div>
  );
};

export default Awards;
