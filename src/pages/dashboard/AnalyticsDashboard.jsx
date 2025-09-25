import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Paper,
} from "@mui/material";
import {
  TrendingUp,
  Assignment,
  Visibility,
  Code,
  Work,
  EmojiEvents,
  Timeline,
  Download,
  Share,
  BarChart,
  ArrowUpward,
  ArrowDownward,
  BusinessCenter,
  Article,
  People,
  Analytics,
  Speed,
  Security,
  Assessment,
  DataUsage,
  CloudDownload,
  GitHub,
  LinkedIn,
} from "@mui/icons-material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar, Doughnut, Radar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsDashboard = () => {
  // Enhanced stats data with growth indicators
  const statsData = [
    {
      title: "Portfolio Views",
      value: "12,847",
      change: "+24.5%",
      trend: "up",
      icon: <Visibility />,
      color: "#00d4ff",
      period: "vs last month",
    },
    {
      title: "Total Projects",
      value: "24",
      change: "+3",
      trend: "up",
      icon: <Code />,
      color: "#4caf50",
      period: "new this month",
    },
    {
      title: "Blog Posts",
      value: "18",
      change: "+2",
      trend: "up",
      icon: <Article />,
      color: "#ff9800",
      period: "published",
    },
    {
      title: "Engagement Rate",
      value: "8.7%",
      change: "-1.2%",
      trend: "down",
      icon: <TrendingUp />,
      color: "#e91e63",
      period: "avg engagement",
    },
    {
      title: "Profile Completion",
      value: "92%",
      change: "+5%",
      trend: "up",
      icon: <Assignment />,
      color: "#9c27b0",
      period: "completion rate",
    },
    {
      title: "Skills Added",
      value: "28",
      change: "+4",
      trend: "up",
      icon: <Speed />,
      color: "#00bcd4",
      period: "total skills",
    },
    {
      title: "Awards & Certs",
      value: "15",
      change: "+2",
      trend: "up",
      icon: <EmojiEvents />,
      color: "#ffc107",
      period: "achievements",
    },
    {
      title: "Network Reach",
      value: "2.4K",
      change: "+12.8%",
      trend: "up",
      icon: <People />,
      color: "#607d8b",
      period: "connections",
    },
  ];

  // Performance metrics
  // Recent activities with more detail
  const recentActivity = [
    {
      action: "Updated React E-commerce Project",
      type: "project",
      time: "2 hours ago",
      details: "Added new features and documentation",
      icon: <Code />,
      color: "#00d4ff",
    },
    {
      action: "Published: 'Advanced TypeScript Patterns'",
      type: "blog",
      time: "1 day ago",
      details: "New blog post about TypeScript best practices",
      icon: <Article />,
      color: "#4caf50",
    },
    {
      action: "Earned AWS Solutions Architect Certification",
      type: "achievement",
      time: "3 days ago",
      details: "Professional certification completed",
      icon: <EmojiEvents />,
      color: "#ff9800",
    },
    {
      action: "Added 5 new skills to profile",
      type: "skill",
      time: "5 days ago",
      details: "Docker, Kubernetes, Terraform, GraphQL, Redis",
      icon: <Speed />,
      color: "#9c27b0",
    },
    {
      action: "Updated work experience at Tech Corp",
      type: "experience",
      time: "1 week ago",
      details: "Senior Full-Stack Developer role details",
      icon: <Work />,
      color: "#e91e63",
    },
  ];

  // Chart Data for Professional Visualizations

  // Portfolio Views Timeline (Line Chart)
  const portfolioViewsData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Portfolio Views",
        data: [
          1200, 1900, 2300, 2800, 3200, 3800, 4200, 4800, 5200, 5800, 6400,
          7200,
        ],
        borderColor: "#00d4ff",
        backgroundColor: "rgba(0, 212, 255, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: "#00d4ff",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
      {
        label: "Unique Visitors",
        data: [
          800, 1200, 1500, 1800, 2100, 2400, 2700, 3100, 3400, 3800, 4200, 4600,
        ],
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: "#4caf50",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  // Skills Distribution (Radar Chart)
  const skillsRadarData = {
    labels: ["Frontend", "Backend", "Database", "DevOps", "Mobile", "AI/ML"],
    datasets: [
      {
        label: "Current Skills",
        data: [95, 88, 82, 78, 65, 72],
        backgroundColor: "rgba(0, 212, 255, 0.2)",
        borderColor: "#00d4ff",
        borderWidth: 3,
        pointBackgroundColor: "#00d4ff",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#00d4ff",
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: "Industry Average",
        data: [85, 80, 75, 70, 60, 65],
        backgroundColor: "rgba(255, 152, 0, 0.2)",
        borderColor: "#ff9800",
        borderWidth: 2,
        pointBackgroundColor: "#ff9800",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#ff9800",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Project Categories (Doughnut Chart)
  const projectCategoriesData = {
    labels: [
      "Web Apps",
      "Mobile Apps",
      "APIs",
      "AI/ML Projects",
      "Tools & Utilities",
    ],
    datasets: [
      {
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          "#00d4ff",
          "#4caf50",
          "#ff9800",
          "#e91e63",
          "#9c27b0",
        ],
        borderColor: ["#00d4ff", "#4caf50", "#ff9800", "#e91e63", "#9c27b0"],
        borderWidth: 3,
        hoverOffset: 10,
      },
    ],
  };

  // Monthly Activity (Bar Chart)
  const monthlyActivityData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Projects Completed",
        data: [2, 3, 2, 4, 3, 5, 4, 3, 2, 4, 3, 2],
        backgroundColor: "#00d4ff",
        borderColor: "#00d4ff",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: "Blog Posts",
        data: [1, 2, 1, 1, 2, 2, 3, 2, 1, 2, 1, 2],
        backgroundColor: "#4caf50",
        borderColor: "#4caf50",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: "Certifications",
        data: [0, 1, 0, 1, 0, 2, 1, 0, 1, 1, 0, 1],
        backgroundColor: "#ff9800",
        borderColor: "#ff9800",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  // Chart options for consistent styling
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#00d4ff",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#888",
          font: {
            size: 11,
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        ticks: {
          color: "#888",
          font: {
            size: 11,
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#00d4ff",
        borderWidth: 1,
      },
    },
    scales: {
      r: {
        angleLines: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        pointLabels: {
          color: "#fff",
          font: {
            size: 11,
            weight: 500,
          },
        },
        ticks: {
          color: "#888",
          backdrop: {
            color: "rgba(0, 0, 0, 0.5)",
          },
        },
        min: 0,
        max: 100,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
          font: {
            size: 11,
            weight: 500,
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#00d4ff",
        borderWidth: 1,
      },
    },
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", p: 2 }}>
      {/* Enhanced Portfolio Overview Section */}
      <Card
        sx={{
          backgroundColor: "rgba(0,212,255,0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0,212,255,0.2)",
          borderRadius: 3,
          mb: 4,
          background:
            "linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(255,107,53,0.1) 100%)",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Analytics sx={{ color: "#00d4ff", fontSize: 32, mr: 2 }} />
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg, #00d4ff 0%, #ff6b35 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 0.5,
                  }}
                >
                  Portfolio Analytics
                </Typography>
                <Typography variant="body1" sx={{ color: "#bbb" }}>
                  Comprehensive overview of your professional portfolio
                  performance
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                size="small"
                startIcon={<Download />}
                sx={{
                  color: "#00d4ff",
                  borderColor: "#00d4ff",
                  "&:hover": { backgroundColor: "rgba(0,212,255,0.1)" },
                }}
                variant="outlined"
              >
                Export
              </Button>
              <Button
                size="small"
                startIcon={<Share />}
                sx={{
                  color: "#ff6b35",
                  borderColor: "#ff6b35",
                  "&:hover": { backgroundColor: "rgba(255,107,53,0.1)" },
                }}
                variant="outlined"
              >
                Share
              </Button>
            </Box>
          </Box>

          {/* Key Metrics Grid */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                  backgroundColor: "rgba(0,212,255,0.15)",
                  borderRadius: 2,
                  border: "1px solid rgba(0,212,255,0.3)",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ color: "#00d4ff", fontWeight: 700, mb: 0.5 }}
                >
                  15
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#ccc", fontWeight: 500, mb: 0.5 }}
                >
                  Active Sections
                </Typography>
                <Chip
                  label="All Complete"
                  size="small"
                  sx={{
                    backgroundColor: "rgba(76,175,80,0.2)",
                    color: "#4caf50",
                    fontSize: "0.75rem",
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                  backgroundColor: "rgba(76,175,80,0.15)",
                  borderRadius: 2,
                  border: "1px solid rgba(76,175,80,0.3)",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ color: "#4caf50", fontWeight: 700, mb: 0.5 }}
                >
                  94%
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#ccc", fontWeight: 500, mb: 0.5 }}
                >
                  Quality Score
                </Typography>
                <Chip
                  label="Excellent"
                  size="small"
                  sx={{
                    backgroundColor: "rgba(76,175,80,0.2)",
                    color: "#4caf50",
                    fontSize: "0.75rem",
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                  backgroundColor: "rgba(255,107,53,0.15)",
                  borderRadius: 2,
                  border: "1px solid rgba(255,107,53,0.3)",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ color: "#ff6b35", fontWeight: 700, mb: 0.5 }}
                >
                  24
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#ccc", fontWeight: 500, mb: 0.5 }}
                >
                  Active Projects
                </Typography>
                <Chip
                  label="+3 New"
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255,107,53,0.2)",
                    color: "#ff6b35",
                    fontSize: "0.75rem",
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                  backgroundColor: "rgba(156,39,176,0.15)",
                  borderRadius: 2,
                  border: "1px solid rgba(156,39,176,0.3)",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ color: "#9c27b0", fontWeight: 700, mb: 0.5 }}
                >
                  2.4K
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#ccc", fontWeight: 500, mb: 0.5 }}
                >
                  Total Views
                </Typography>
                <Chip
                  label="+12.8%"
                  size="small"
                  sx={{
                    backgroundColor: "rgba(76,175,80,0.2)",
                    color: "#4caf50",
                    fontSize: "0.75rem",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Detailed Analytics Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                backgroundColor: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.08)",
                  transform: "translateY(-4px)",
                  borderColor: stat.color,
                  boxShadow: `0 8px 32px rgba(${
                    stat.color
                      .slice(1)
                      .match(/.{2}/g)
                      ?.map((hex) => parseInt(hex, 16))
                      .join(",") || "0,0,0"
                  }, 0.2)`,
                },
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: `${stat.color}15`,
                      border: `1px solid ${stat.color}30`,
                      borderRadius: 1.5,
                      p: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {React.cloneElement(stat.icon, {
                      sx: { color: stat.color, fontSize: "1.3rem" },
                    })}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {stat.trend === "up" ? (
                      <ArrowUpward
                        sx={{ color: "#4caf50", fontSize: "1rem" }}
                      />
                    ) : (
                      <ArrowDownward
                        sx={{ color: "#f44336", fontSize: "1rem" }}
                      />
                    )}
                    <Typography
                      variant="caption"
                      sx={{
                        color: stat.trend === "up" ? "#4caf50" : "#f44336",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    >
                      {stat.change}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="h5"
                  sx={{ color: "#fff", fontWeight: 700, mb: 0.5 }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#bbb",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    mb: 0.5,
                  }}
                >
                  {stat.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#777", fontSize: "0.75rem" }}
                >
                  {stat.period}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Performance Metrics & Traffic Analysis */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Performance Metrics */}
        <Grid item xs={12} lg={6}>
          <Card
            sx={{
              backgroundColor: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Assessment sx={{ color: "#00d4ff", fontSize: 24, mr: 2 }} />
                <Typography
                  variant="h6"
                  sx={{ color: "#fff", fontWeight: 600 }}
                >
                  Portfolio Views Timeline
                </Typography>
                <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
                  <TrendingUp
                    sx={{ color: "#4caf50", fontSize: 18, mr: 0.5 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#4caf50",
                      fontWeight: 500,
                      fontSize: "0.8rem",
                    }}
                  >
                    +23%
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ height: 250, width: "100%" }}>
                <Line data={portfolioViewsData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Project Categories - Doughnut Chart */}
        <Grid item xs={12} lg={6}>
          <Card
            sx={{
              backgroundColor: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <DataUsage sx={{ color: "#ff6b35", fontSize: 24, mr: 2 }} />
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", fontWeight: 600 }}
                  >
                    Project Categories
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Portfolio Distribution
                </Typography>
              </Box>
              <Box
                sx={{
                  height: 250,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Doughnut
                  data={projectCategoriesData}
                  options={doughnutOptions}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity & Top Content */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Enhanced Recent Activity */}
        <Grid item xs={12} lg={6}>
          <Card
            sx={{
              backgroundColor: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 2,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      backgroundColor: "rgba(76, 175, 80, 0.15)",
                      borderRadius: 1,
                      p: 0.75,
                      display: "flex",
                      alignItems: "center",
                      mr: 2,
                    }}
                  >
                    <Timeline sx={{ color: "#4caf50", fontSize: 18 }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", fontWeight: 600, fontSize: "1.1rem" }}
                  >
                    Recent Activity
                  </Typography>
                </Box>
                <Button
                  size="small"
                  sx={{
                    color: "#00d4ff",
                    textTransform: "none",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "rgba(0, 212, 255, 0.1)",
                    },
                  }}
                >
                  View All
                </Button>
              </Box>

              <Box
                sx={{
                  maxHeight: 310,
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "3px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "3px",
                    "&:hover": {
                      background: "rgba(255,255,255,0.3)",
                    },
                  },
                }}
              >
                <List sx={{ p: 0 }}>
                  {recentActivity.map((activity, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        px: 0,
                        py: 2,
                        borderBottom:
                          index < recentActivity.length - 1
                            ? "1px solid rgba(255,255,255,0.08)"
                            : "none",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.03)",
                          borderRadius: 1,
                          transition: "all 0.2s ease",
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            backgroundColor: `${activity.color}15`,
                            border: `1px solid ${activity.color}30`,
                            width: 42,
                            height: 42,
                            mr: 1.5,
                          }}
                        >
                          {React.cloneElement(activity.icon, {
                            sx: { color: activity.color, fontSize: "1.3rem" },
                          })}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#fff",
                              fontSize: "0.95rem",
                              fontWeight: 600,
                              mb: 0.5,
                              lineHeight: 1.3,
                            }}
                          >
                            {activity.action}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#aaa",
                                fontSize: "0.8rem",
                                lineHeight: 1.2,
                                display: "block",
                                mb: 0.5,
                              }}
                            >
                              {activity.details}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#777",
                                fontSize: "0.75rem",
                                fontStyle: "italic",
                              }}
                            >
                              {activity.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Activity - Bar Chart */}
        <Grid item xs={12} lg={6}>
          <Card
            sx={{
              backgroundColor: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 2,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      background:
                        "linear-gradient(135deg, rgba(255,193,7,0.2), rgba(255,193,7,0.1))",
                      border: "1px solid rgba(255,193,7,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 3,
                    }}
                  >
                    <BarChart sx={{ color: "#ffc107", fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ color: "#fff", fontWeight: 600, mb: 0.5 }}
                    >
                      Monthly Activity
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      Project submissions & updates
                    </Typography>
                  </Box>
                </Box>

                {/* Legend */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      Projects
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      Updates
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  height: 280,
                  width: "100%",
                  p: 2,
                  background: "rgba(0,0,0,0.1)",
                  borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <Bar data={monthlyActivityData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Skills Distribution - Radar Chart */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={6}>
          <Card
            sx={{
              backgroundColor: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Security sx={{ color: "#9c27b0", fontSize: 24, mr: 2 }} />
                <Typography
                  variant="h6"
                  sx={{ color: "#fff", fontWeight: 600 }}
                >
                  Skills Distribution
                </Typography>
                <Box sx={{ ml: "auto" }}>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    vs Industry Average
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  height: 320,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Radar data={skillsRadarData} options={radarOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card
            sx={{
              backgroundColor: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Analytics sx={{ color: "#e91e63", fontSize: 24, mr: 2 }} />
                <Typography
                  variant="h6"
                  sx={{ color: "#fff", fontWeight: 600 }}
                >
                  Performance Metrics
                </Typography>
              </Box>

              {/* Professional Metric Cards */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      p: 2,
                      background:
                        "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(0,212,255,0.05))",
                      borderRadius: 2,
                      border: "1px solid rgba(0,212,255,0.2)",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ color: "#00d4ff", fontWeight: 700, mb: 1 }}
                    >
                      97%
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#bbb" }}>
                      Performance Score
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      p: 2,
                      background:
                        "linear-gradient(135deg, rgba(76,175,80,0.1), rgba(76,175,80,0.05))",
                      borderRadius: 2,
                      border: "1px solid rgba(76,175,80,0.2)",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ color: "#4caf50", fontWeight: 700, mb: 1 }}
                    >
                      92%
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#bbb" }}>
                      SEO Rating
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      p: 2,
                      background:
                        "linear-gradient(135deg, rgba(255,152,0,0.1), rgba(255,152,0,0.05))",
                      borderRadius: 2,
                      border: "1px solid rgba(255,152,0,0.2)",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ color: "#ff9800", fontWeight: 700, mb: 1 }}
                    >
                      2.3s
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#bbb" }}>
                      Load Time
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      p: 2,
                      background:
                        "linear-gradient(135deg, rgba(233,30,99,0.1), rgba(233,30,99,0.05))",
                      borderRadius: 2,
                      border: "1px solid rgba(233,30,99,0.2)",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ color: "#e91e63", fontWeight: 700, mb: 1 }}
                    >
                      95%
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#bbb" }}>
                      Accessibility
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Center */}
      <Card
        sx={{
          backgroundColor: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <BusinessCenter sx={{ color: "#9c27b0", fontSize: 24, mr: 2 }} />
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
              Quick Actions & Recommendations
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 2,
                  backgroundColor: "rgba(0,212,255,0.1)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  borderRadius: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(0,212,255,0.15)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CloudDownload sx={{ color: "#00d4ff", fontSize: 32, mb: 1 }} />
                <Typography
                  variant="body2"
                  sx={{ color: "#00d4ff", fontWeight: 600, mb: 0.5 }}
                >
                  Export Portfolio
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Download as PDF
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 2,
                  backgroundColor: "rgba(76,175,80,0.1)",
                  border: "1px solid rgba(76,175,80,0.2)",
                  borderRadius: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(76,175,80,0.15)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <GitHub sx={{ color: "#4caf50", fontSize: 32, mb: 1 }} />
                <Typography
                  variant="body2"
                  sx={{ color: "#4caf50", fontWeight: 600, mb: 0.5 }}
                >
                  Sync GitHub
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Update projects
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 2,
                  backgroundColor: "rgba(255,152,0,0.1)",
                  border: "1px solid rgba(255,152,0,0.2)",
                  borderRadius: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255,152,0,0.15)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <LinkedIn sx={{ color: "#ff9800", fontSize: 32, mb: 1 }} />
                <Typography
                  variant="body2"
                  sx={{ color: "#ff9800", fontWeight: 600, mb: 0.5 }}
                >
                  Share Update
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Social media
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 2,
                  backgroundColor: "rgba(156,39,176,0.1)",
                  border: "1px solid rgba(156,39,176,0.2)",
                  borderRadius: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(156,39,176,0.15)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Assessment sx={{ color: "#9c27b0", fontSize: 32, mb: 1 }} />
                <Typography
                  variant="body2"
                  sx={{ color: "#9c27b0", fontWeight: 600, mb: 0.5 }}
                >
                  View Reports
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Detailed analytics
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

          <Box>
            <Typography
              variant="subtitle2"
              sx={{ color: "#fff", fontWeight: 600, mb: 2 }}
            >
              💡 Recommendations
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1.5,
                    backgroundColor: "rgba(255,193,7,0.1)",
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "#ffc107", fontSize: "0.85rem" }}
                  >
                    <strong>Add 3 more projects</strong> to reach optimal
                    portfolio size
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1.5,
                    backgroundColor: "rgba(33,150,243,0.1)",
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "#2196f3", fontSize: "0.85rem" }}
                  >
                    <strong>Update your skills</strong> section with latest
                    technologies
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1.5,
                    backgroundColor: "rgba(156,39,176,0.1)",
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "#9c27b0", fontSize: "0.85rem" }}
                  >
                    <strong>Write a blog post</strong> about your recent project
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AnalyticsDashboard;
