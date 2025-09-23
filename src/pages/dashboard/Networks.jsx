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
  Avatar,
} from "@mui/material";
import {
  Edit,
  Save,
  Cancel,
  Add,
  Close,
  Groups,
  Business,
  Public,
  LinkedIn,
  GitHub,
  Twitter,
  Campaign,
  Analytics,
  Star,
  WorkspacePremium,
  School,
  LocationOn,
  OpenInNew,
  Forum,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Networks = () => {
  const { dashboardData, handleEdit } = useOutletContext();
  const data = dashboardData?.networks;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    // Professional Networks
    professionalNetworks: data?.professionalNetworks || [
      {
        id: 1,
        name: "LinkedIn Professional Network",
        platform: "LinkedIn",
        username: "nazmul-hossain-dev",
        profileUrl: "https://linkedin.com/in/nazmul-hossain-dev",
        category: "Professional Social",
        joinDate: "2019-03-15",
        description:
          "Professional networking platform for career development, industry connections, and knowledge sharing. Actively engaged with technology professionals and recruiters.",
        metrics: {
          connections: 2847,
          followers: 1254,
          posts: 156,
          articles: 23,
          endorsements: 89,
          recommendations: 17,
        },
        engagement: {
          weeklyViews: 450,
          searchAppearances: 230,
          postImpressions: 5600,
        },
        status: "Active",
        verified: true,
        isPrimary: true,
      },
      {
        id: 2,
        name: "GitHub Developer Community",
        platform: "GitHub",
        username: "nazmulh24",
        profileUrl: "https://github.com/nazmulh24",
        category: "Developer Community",
        joinDate: "2020-01-20",
        description:
          "Open source development platform for code collaboration, project hosting, and developer networking. Contributing to various projects and maintaining repositories.",
        metrics: {
          repositories: 47,
          followers: 189,
          following: 145,
          stars: 234,
          contributions: 1847,
          organizations: 8,
        },
        engagement: {
          commitsThisYear: 567,
          pullRequests: 89,
          issues: 34,
        },
        status: "Active",
        verified: true,
        isPrimary: true,
      },
      {
        id: 3,
        name: "Stack Overflow Developer Network",
        platform: "Stack Overflow",
        username: "nazmul_dev",
        profileUrl: "https://stackoverflow.com/users/nazmul_dev",
        category: "Q&A Community",
        joinDate: "2020-06-10",
        description:
          "Technical Q&A platform for developers. Providing solutions and helping fellow developers with programming challenges, particularly in Django and React.",
        metrics: {
          reputation: 3247,
          answers: 67,
          questions: 23,
          badgesEarned: 15,
          peoplePeached: 25000,
          acceptedAnswers: 42,
        },
        engagement: {
          monthlyViews: 1200,
          upvotes: 289,
          downvotes: 12,
        },
        status: "Active",
        verified: false,
        isPrimary: false,
      },
    ],

    // Industry Networks
    industryNetworks: data?.industryNetworks || [
      {
        id: 4,
        name: "Django Software Foundation",
        type: "Professional Organization",
        role: "Contributing Member",
        category: "Web Development",
        joinDate: "2021-05-15",
        website: "https://djangoproject.com/foundation/",
        description:
          "Non-profit organization that supports the Django web framework. Active contributor to the Django ecosystem through code contributions and community support.",
        activities: [
          "Code contributions to Django core",
          "Community forum participation",
          "Documentation improvements",
          "Bug reporting and fixes",
        ],
        achievements: [
          "Outstanding Contributor Award 2023",
          "Top 50 contributors list",
          "Community recognition badge",
        ],
        networking: {
          connections: 156,
          events: 12,
          contributions: 45,
        },
        status: "Active Member",
        membershipLevel: "Contributing",
      },
      {
        id: 5,
        name: "React Developer Community",
        type: "Developer Community",
        role: "Active Contributor",
        category: "Frontend Development",
        joinDate: "2020-11-20",
        website: "https://reactjs.org/community/",
        description:
          "Global community of React developers sharing knowledge, best practices, and contributing to the React ecosystem through discussions and code contributions.",
        activities: [
          "Community discussions participation",
          "Tutorial and blog writing",
          "Code review assistance",
          "Mentoring new developers",
        ],
        achievements: [
          "Top contributor badge",
          "Community helper recognition",
          "Featured blog posts",
        ],
        networking: {
          connections: 234,
          events: 18,
          contributions: 67,
        },
        status: "Active Member",
        membershipLevel: "Contributor",
      },
      {
        id: 6,
        name: "IEEE Computer Society",
        type: "Professional Association",
        role: "Member",
        category: "Technology Research",
        joinDate: "2022-02-10",
        website: "https://computer.org/",
        description:
          "Professional organization for computing professionals. Participating in research communities, conferences, and professional development activities.",
        activities: [
          "Conference participation",
          "Research paper reviews",
          "Professional development courses",
          "Networking events attendance",
        ],
        achievements: [
          "Conference presenter badge",
          "Peer review recognition",
          "Professional development certificates",
        ],
        networking: {
          connections: 89,
          events: 8,
          contributions: 12,
        },
        status: "Active Member",
        membershipLevel: "Professional",
      },
    ],

    // Community Networks
    communityNetworks: data?.communityNetworks || [
      {
        id: 7,
        name: "Tech Meetup Bay Area",
        type: "Local Tech Community",
        role: "Regular Attendee & Speaker",
        category: "Technology Meetup",
        location: "San Francisco, CA",
        joinDate: "2021-08-15",
        website: "https://meetup.com/tech-bay-area",
        description:
          "Local technology meetup group focusing on web development, AI, and emerging technologies. Regular participant and occasional speaker on Django and React topics.",
        activities: [
          "Monthly meetup attendance",
          "Technical presentations",
          "Workshop facilitation",
          "Networking with local developers",
        ],
        events: [
          {
            title: "Django Best Practices Workshop",
            date: "2023-09-15",
            role: "Workshop Leader",
            attendance: 45,
          },
          {
            title: "React State Management Talk",
            date: "2023-06-20",
            role: "Speaker",
            attendance: 38,
          },
        ],
        networking: {
          connections: 127,
          events: 24,
          presentations: 6,
        },
        status: "Active",
        membershipLevel: "Speaker",
      },
      {
        id: 8,
        name: "Open Source Collective",
        type: "Developer Community",
        role: "Maintainer",
        category: "Open Source",
        joinDate: "2020-12-05",
        website: "https://opencollective.com/",
        description:
          "Community of open source contributors and maintainers. Managing and contributing to various open source projects while helping other developers get started.",
        activities: [
          "Project maintenance",
          "New contributor mentoring",
          "Code review and guidance",
          "Community events organization",
        ],
        projects: [
          "Django utility packages",
          "React component libraries",
          "Developer tools and scripts",
        ],
        networking: {
          connections: 298,
          events: 15,
          contributions: 156,
        },
        status: "Active",
        membershipLevel: "Maintainer",
      },
    ],

    // Academic Networks
    academicNetworks: data?.academicNetworks || [
      {
        id: 9,
        name: "Association for Computing Machinery (ACM)",
        type: "Academic Association",
        role: "Student Member",
        category: "Computer Science Research",
        joinDate: "2021-09-01",
        website: "https://acm.org/",
        description:
          "World's largest educational and scientific computing society. Participating in research communities and staying updated with latest computing research and developments.",
        activities: [
          "Research paper access",
          "Conference proceedings review",
          "Special interest groups participation",
          "Professional development webinars",
        ],
        specialInterests: [
          "Human-Computer Interaction",
          "Software Engineering",
          "Web Technologies",
          "Machine Learning Applications",
        ],
        networking: {
          connections: 67,
          events: 5,
          papers: 3,
        },
        status: "Active Member",
        membershipLevel: "Student",
      },
      {
        id: 10,
        name: "ResearchGate Academic Network",
        type: "Research Platform",
        role: "Researcher",
        category: "Academic Research",
        joinDate: "2022-01-20",
        profileUrl: "https://researchgate.net/profile/nazmul-hossain",
        description:
          "Academic social networking platform for researchers. Sharing research findings, collaborating with fellow researchers, and staying updated with latest publications.",
        activities: [
          "Research publication sharing",
          "Collaboration with researchers",
          "Peer review participation",
          "Research discussion forums",
        ],
        metrics: {
          publications: 8,
          citations: 67,
          reads: 1247,
          followers: 89,
          following: 156,
          researchGate: 4.2,
        },
        networking: {
          connections: 134,
          collaborations: 8,
          reviews: 12,
        },
        status: "Active",
        membershipLevel: "Researcher",
      },
    ],

    // Network Statistics
    networkStats: data?.networkStats || {
      totalNetworks: 10,
      professionalNetworks: 3,
      industryNetworks: 3,
      communityNetworks: 2,
      academicNetworks: 2,
      totalConnections: 4567,
      activeMembers: 8,
      leadershipRoles: 4,
      speakingEngagements: 12,
      contributions: 356,
      networkingEvents: 89,
      mentorshipConnections: 45,
    },

    // Network Categories
    networkCategories: data?.networkCategories || [
      "Professional Social",
      "Developer Community",
      "Q&A Community",
      "Web Development",
      "Frontend Development",
      "Technology Research",
      "Technology Meetup",
      "Open Source",
      "Computer Science Research",
      "Academic Research",
      "Industry Association",
      "Local Community",
    ],
  });

  const [saveAlert, setSaveAlert] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  const handleSave = () => {
    if (handleEdit) {
      handleEdit("networks", editedData);
    }
    setIsEditing(false);
    setSaveAlert({
      type: "success",
      message: "Networks section updated successfully!",
    });
    setTimeout(() => setSaveAlert(null), 3000);
  };

  const handleCancel = () => {
    setEditedData({
      professionalNetworks: data?.professionalNetworks || [],
      industryNetworks: data?.industryNetworks || [],
      communityNetworks: data?.communityNetworks || [],
      academicNetworks: data?.academicNetworks || [],
      networkStats: data?.networkStats || {},
      networkCategories: data?.networkCategories || [],
    });
    setIsEditing(false);
  };

  const addCategory = () => {
    if (newCategory.trim() && editedData.networkCategories.length < 15) {
      setEditedData((prev) => ({
        ...prev,
        networkCategories: [...prev.networkCategories, newCategory.trim()],
      }));
      setNewCategory("");
    }
  };

  const removeCategory = (index) => {
    setEditedData((prev) => ({
      ...prev,
      networkCategories: prev.networkCategories.filter((_, i) => i !== index),
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

  // Reusable Network Card Component
  const NetworkCard = ({
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
            borderColor: "#00BCD4",
            transition: "border-color 0.3s ease",
          },
        }),
      }}
    >
      {(icon || title || description) && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          {icon &&
            React.cloneElement(icon, {
              sx: { color: "#00BCD4", mr: 2, fontSize: 28 },
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

  // Get platform icon
  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "linkedin":
        return <LinkedIn sx={{ fontSize: 20 }} />;
      case "github":
        return <GitHub sx={{ fontSize: 20 }} />;
      case "twitter":
        return <Twitter sx={{ fontSize: 20 }} />;
      case "stack overflow":
        return <Forum sx={{ fontSize: 20 }} />;
      default:
        return <Public sx={{ fontSize: 20 }} />;
    }
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      "Professional Social": "#0077B5",
      "Developer Community": "#333333",
      "Q&A Community": "#F48024",
      "Web Development": "#4CAF50",
      "Frontend Development": "#61DAFB",
      "Technology Research": "#9C27B0",
      "Technology Meetup": "#FF9800",
      "Open Source": "#28A745",
      "Computer Science Research": "#2196F3",
      "Academic Research": "#00BCD4",
      "Industry Association": "#795548",
      "Local Community": "#E91E63",
    };
    return colors[category] || "#888";
  };

  // Get membership level color
  const getMembershipColor = (level) => {
    switch (level) {
      case "Contributing":
        return "#4CAF50";
      case "Professional":
        return "#2196F3";
      case "Speaker":
        return "#FF9800";
      case "Maintainer":
        return "#9C27B0";
      case "Researcher":
        return "#00BCD4";
      default:
        return "#888";
    }
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
          Networks Section
        </Typography>
        <Typography variant="body1" sx={{ color: "#888" }}>
          Professional networking, community engagement, and industry
          connections
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
        <NetworkCard hover={false}>
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
                Networks Management
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Professional connections, community engagement, and industry
                networking
              </Typography>
            </Box>

            {!isEditing ? (
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setIsEditing(true)}
                sx={{
                  borderColor: "#00BCD4",
                  color: "#00BCD4",
                  borderWidth: 2,
                  borderRadius: 2,
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#4DD0E1",
                    backgroundColor: "rgba(0, 188, 212, 0.1)",
                    borderWidth: 2,
                  },
                }}
              >
                Edit Networks
              </Button>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  sx={{
                    backgroundColor: "#00BCD4",
                    borderRadius: 2,
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#00ACC1" },
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
        </NetworkCard>
      </motion.div>

      {/* Network Statistics Overview */}
      <motion.div variants={itemVariants}>
        <NetworkCard
          icon={<Analytics />}
          title="Network Metrics"
          description="Professional networking statistics and engagement metrics"
        >
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#00BCD4", fontWeight: 700 }}
                >
                  {editedData.networkStats.totalNetworks}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Total Networks
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#4CAF50", fontWeight: 700 }}
                >
                  {(editedData.networkStats.totalConnections / 1000).toFixed(1)}
                  K
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Total Connections
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#FF9800", fontWeight: 700 }}
                >
                  {editedData.networkStats.leadershipRoles}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Leadership Roles
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#E91E63", fontWeight: 700 }}
                >
                  {editedData.networkStats.speakingEngagements}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Speaking Events
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
                  sx={{ color: "#2196F3", fontWeight: 600 }}
                >
                  {editedData.networkStats.professionalNetworks}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Professional
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#9C27B0", fontWeight: 600 }}
                >
                  {editedData.networkStats.networkingEvents}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Events Attended
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#795548", fontWeight: 600 }}
                >
                  {editedData.networkStats.contributions}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Contributions
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#607D8B", fontWeight: 600 }}
                >
                  {editedData.networkStats.mentorshipConnections}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Mentorship
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </NetworkCard>
      </motion.div>

      {/* Professional Networks */}
      <motion.div variants={itemVariants}>
        <NetworkCard
          icon={<LinkedIn />}
          title="Professional Networks"
          description="Social platforms and professional networking services"
        >
          {editedData.professionalNetworks.map((network, index) => (
            <Box
              key={network.id}
              sx={{
                mb: 4,
                p: 3,
                backgroundColor: `${getCategoryColor(network.category)}10`,
                border: `1px solid ${getCategoryColor(network.category)}30`,
                borderRadius: 3,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 15,
                  right: 15,
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                {network.isPrimary && (
                  <Chip
                    icon={<Star />}
                    label="Primary"
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255, 193, 7, 0.2)",
                      color: "#FFC107",
                      fontWeight: 600,
                    }}
                  />
                )}
                {network.verified && (
                  <WorkspacePremium sx={{ color: "#4CAF50", fontSize: 20 }} />
                )}
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", mb: 2, pr: 10 }}
              >
                <Avatar
                  sx={{
                    backgroundColor: getCategoryColor(network.category),
                    mr: 2,
                    width: 40,
                    height: 40,
                  }}
                >
                  {getPlatformIcon(network.platform)}
                </Avatar>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", fontWeight: 600 }}
                  >
                    {network.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: getCategoryColor(network.category) }}
                  >
                    @{network.username}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Chip
                  label={network.category}
                  size="small"
                  sx={{
                    backgroundColor: `${getCategoryColor(network.category)}20`,
                    color: getCategoryColor(network.category),
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={network.status}
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
                sx={{ color: "#fff", lineHeight: 1.6, mb: 3 }}
              >
                {network.description}
              </Typography>

              {network.metrics && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: getCategoryColor(network.category),
                      mb: 1,
                      fontWeight: 600,
                    }}
                  >
                    Network Metrics
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(network.metrics)
                      .slice(0, 6)
                      .map(([key, value], idx) => (
                        <Grid item xs={4} md={2} key={idx}>
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
                      ))}
                  </Grid>
                </Box>
              )}

              {network.engagement && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: getCategoryColor(network.category),
                      mb: 1,
                      fontWeight: 600,
                    }}
                  >
                    Engagement Metrics
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(network.engagement).map(
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

              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Chip
                  icon={<OpenInNew />}
                  label="Visit Profile"
                  component={Link}
                  href={network.profileUrl}
                  target="_blank"
                  clickable
                  sx={{
                    backgroundColor: `${getCategoryColor(network.category)}20`,
                    color: getCategoryColor(network.category),
                    fontWeight: 600,
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888", ml: 1 }}>
                  Member since {network.joinDate}
                </Typography>
              </Box>
            </Box>
          ))}
        </NetworkCard>
      </motion.div>

      {/* Industry Networks */}
      <motion.div variants={itemVariants}>
        <NetworkCard
          icon={<Business />}
          title="Industry Networks"
          description="Professional organizations and industry associations"
        >
          {editedData.industryNetworks.map((network, index) => (
            <Box
              key={network.id}
              sx={{
                mb: 4,
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
                {network.name}
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
                  label={network.type}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(156, 39, 176, 0.2)",
                    color: "#9C27B0",
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={network.role}
                  size="small"
                  sx={{
                    backgroundColor: `${getMembershipColor(
                      network.membershipLevel
                    )}20`,
                    color: getMembershipColor(network.membershipLevel),
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={network.category}
                  size="small"
                  sx={{
                    backgroundColor: `${getCategoryColor(network.category)}20`,
                    color: getCategoryColor(network.category),
                    fontWeight: 600,
                  }}
                />
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 3 }}
              >
                {network.description}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#9C27B0", mb: 1, fontWeight: 600 }}
                >
                  Activities
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {network.activities.map((activity, idx) => (
                    <Chip
                      key={idx}
                      label={activity}
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

              {network.achievements && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#9C27B0", mb: 1, fontWeight: 600 }}
                  >
                    Achievements
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {network.achievements.map((achievement, idx) => (
                      <Chip
                        key={idx}
                        icon={<Star />}
                        label={achievement}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(255, 193, 7, 0.2)",
                          color: "#FFC107",
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {network.networking.connections} connections
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {network.networking.events} events
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {network.networking.contributions} contributions
                  </Typography>
                </Box>
                <Link
                  href={network.website}
                  target="_blank"
                  sx={{ color: "#9C27B0" }}
                >
                  Visit Website
                </Link>
              </Box>
            </Box>
          ))}
        </NetworkCard>
      </motion.div>

      {/* Community Networks */}
      <motion.div variants={itemVariants}>
        <NetworkCard
          icon={<Groups />}
          title="Community Networks"
          description="Developer communities, meetups, and collaborative groups"
        >
          {editedData.communityNetworks.map((network, index) => (
            <Box
              key={network.id}
              sx={{
                mb: 4,
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
                {network.name}
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
                  label={network.type}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255, 152, 0, 0.2)",
                    color: "#FF9800",
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={network.role}
                  size="small"
                  sx={{
                    backgroundColor: `${getMembershipColor(
                      network.membershipLevel
                    )}20`,
                    color: getMembershipColor(network.membershipLevel),
                    fontWeight: 600,
                  }}
                />
                {network.location && (
                  <Chip
                    icon={<LocationOn sx={{ fontSize: 16 }} />}
                    label={network.location}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(96, 125, 139, 0.2)",
                      color: "#607D8B",
                      fontWeight: 500,
                    }}
                  />
                )}
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 3 }}
              >
                {network.description}
              </Typography>

              {network.events && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#FF9800", mb: 2, fontWeight: 600 }}
                  >
                    Recent Speaking Events
                  </Typography>
                  {network.events.map((event, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        p: 2,
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        borderRadius: 2,
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "#fff", fontWeight: 600 }}
                      >
                        {event.title}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "center",
                          mt: 1,
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "#888" }}>
                          {event.date}
                        </Typography>
                        <Chip
                          label={event.role}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(76, 175, 80, 0.2)",
                            color: "#4CAF50",
                          }}
                        />
                        <Typography variant="body2" sx={{ color: "#888" }}>
                          {event.attendance} attendees
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {network.networking.connections} connections
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {network.networking.events} events attended
                  </Typography>
                  {network.networking.presentations && (
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      {network.networking.presentations} presentations
                    </Typography>
                  )}
                </Box>
                <Link
                  href={network.website}
                  target="_blank"
                  sx={{ color: "#FF9800" }}
                >
                  Learn More
                </Link>
              </Box>
            </Box>
          ))}
        </NetworkCard>
      </motion.div>

      {/* Academic Networks */}
      <motion.div variants={itemVariants}>
        <NetworkCard
          icon={<School />}
          title="Academic Networks"
          description="Research associations and academic communities"
        >
          {editedData.academicNetworks.map((network, index) => (
            <Box
              key={network.id}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "rgba(0, 188, 212, 0.05)",
                border: "1px solid rgba(0, 188, 212, 0.2)",
                borderRadius: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#fff", fontWeight: 600, mb: 1 }}
              >
                {network.name}
              </Typography>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Chip
                  label={network.type}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(0, 188, 212, 0.2)",
                    color: "#00BCD4",
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={network.membershipLevel}
                  size="small"
                  sx={{
                    backgroundColor: `${getMembershipColor(
                      network.membershipLevel
                    )}20`,
                    color: getMembershipColor(network.membershipLevel),
                    fontWeight: 600,
                  }}
                />
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {network.description}
              </Typography>

              {network.specialInterests && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#00BCD4", mb: 1, fontWeight: 600 }}
                  >
                    Special Interests
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {network.specialInterests.map((interest, idx) => (
                      <Chip
                        key={idx}
                        label={interest}
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

              {network.metrics && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#00BCD4", mb: 1, fontWeight: 600 }}
                  >
                    Research Metrics
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(network.metrics)
                      .slice(0, 4)
                      .map(([key, value], idx) => (
                        <Grid item xs={3} key={idx}>
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
                      ))}
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
                  Member since {network.joinDate}
                </Typography>
                {network.profileUrl && (
                  <Link
                    href={network.profileUrl}
                    target="_blank"
                    sx={{ color: "#00BCD4" }}
                  >
                    View Profile
                  </Link>
                )}
              </Box>
            </Box>
          ))}
        </NetworkCard>
      </motion.div>

      {/* Network Categories */}
      <motion.div variants={itemVariants}>
        <NetworkCard
          icon={<Campaign />}
          title="Network Categories"
          description="Professional networking areas and community types"
        >
          <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
            Max 15 network categories
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {editedData.networkCategories.map((category, index) => (
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

          {isEditing && editedData.networkCategories.length < 15 && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Add new network category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addCategory()}
                sx={{
                  flexGrow: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(15, 15, 15, 0.6)",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#444" },
                    "&:hover fieldset": { borderColor: "#00BCD4" },
                    "&.Mui-focused fieldset": { borderColor: "#00BCD4" },
                  },
                  "& .MuiInputBase-input": { color: "#fff" },
                }}
              />
              <IconButton
                onClick={addCategory}
                disabled={!newCategory.trim()}
                sx={{
                  backgroundColor: "#00BCD4",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#00ACC1" },
                  "&:disabled": { backgroundColor: "#333", color: "#666" },
                }}
              >
                <Add />
              </IconButton>
            </Box>
          )}
        </NetworkCard>
      </motion.div>
    </motion.div>
  );
};

export default Networks;
