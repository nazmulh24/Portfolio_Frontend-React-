import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import {
  TrendingUp,
  Assignment,
  Visibility,
  Code,
  School,
  Work,
  EmojiEvents,
} from "@mui/icons-material";

const AnalyticsDashboard = () => {
  const statsData = [
    {
      title: "Total Sections",
      value: "15",
      icon: <Assignment />,
      color: "#00d4ff",
    },
    {
      title: "Portfolio Items",
      value: "124",
      icon: <Code />,
      color: "#ff6b35",
    },
    {
      title: "Recent Updates",
      value: "8",
      icon: <TrendingUp />,
      color: "#4caf50",
    },
    {
      title: "Profile Views",
      value: "1.2K",
      icon: <Visibility />,
      color: "#9c27b0",
    },
    { title: "Projects", value: "12", icon: <Code />, color: "#2196f3" },
    { title: "Experience", value: "5", icon: <Work />, color: "#ff9800" },
    { title: "Education", value: "3", icon: <School />, color: "#607d8b" },
    { title: "Awards", value: "8", icon: <EmojiEvents />, color: "#e91e63" },
  ];

  const recentActivity = [
    {
      action: "Updated Professional Activities",
      time: "2 hours ago",
      type: "edit",
    },
    {
      action: "Added new project to portfolio",
      time: "1 day ago",
      type: "create",
    },
    { action: "Published new blog post", time: "3 days ago", type: "create" },
    { action: "Updated work experience", time: "5 days ago", type: "edit" },
    { action: "Added new certification", time: "1 week ago", type: "create" },
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      {/* Portfolio Overview Section */}
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
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Assignment sx={{ color: "#00d4ff", fontSize: 28, mr: 2 }} />
            <Typography
              variant="h5"
              sx={{
                color: "#fff",
                fontWeight: 700,
                background: "linear-gradient(135deg, #00d4ff 0%, #ff6b35 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Portfolio Overview
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                  backgroundColor: "rgba(0,212,255,0.1)",
                  borderRadius: 2,
                  border: "1px solid rgba(0,212,255,0.2)",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ color: "#00d4ff", fontWeight: 700, mb: 1 }}
                >
                  15
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#ccc", fontWeight: 500 }}
                >
                  Active Sections
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Portfolio components
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                  backgroundColor: "rgba(76,175,80,0.1)",
                  borderRadius: 2,
                  border: "1px solid rgba(76,175,80,0.2)",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ color: "#4caf50", fontWeight: 700, mb: 1 }}
                >
                  92%
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#ccc", fontWeight: 500 }}
                >
                  Completion Rate
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Content filled
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                  backgroundColor: "rgba(255,107,53,0.1)",
                  borderRadius: 2,
                  border: "1px solid rgba(255,107,53,0.2)",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ color: "#ff6b35", fontWeight: 700, mb: 1 }}
                >
                  8
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#ccc", fontWeight: 500 }}
                >
                  Recent Updates
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Last 30 days
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Portfolio Health Indicator */}
          <Box
            sx={{
              mt: 3,
              p: 2,
              backgroundColor: "rgba(255,255,255,0.03)",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: "#fff", fontWeight: 600, mb: 2 }}
            >
              Portfolio Health Status
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  backgroundColor: "#4caf50",
                  borderRadius: "50%",
                  boxShadow: "0 0 8px rgba(76,175,80,0.5)",
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: "#4caf50", fontWeight: 500 }}
              >
                Excellent - Portfolio is well-maintained and up-to-date
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontWeight: 700,
            mb: 1,
            background: "linear-gradient(135deg, #00d4ff 0%, #ff6b35 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Analytics Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: "#bbb" }}>
          Overview of your portfolio performance and content statistics
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
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
                },
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Box
                    sx={{
                      backgroundColor: stat.color,
                      borderRadius: 1,
                      p: 1,
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {React.cloneElement(stat.icon, {
                      sx: { color: "#fff", fontSize: "1.2rem" },
                    })}
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{ color: "#fff", fontWeight: 700 }}
                  >
                    {stat.value}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#bbb", fontSize: "0.85rem" }}
                >
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              backgroundColor: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 2,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{ color: "#fff", fontWeight: 600, mb: 2 }}
              >
                Recent Activity
              </Typography>
              <Box>
                {recentActivity.map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      py: 1.5,
                      borderBottom:
                        index < recentActivity.length - 1
                          ? "1px solid rgba(255,255,255,0.1)"
                          : "none",
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor:
                          activity.type === "create" ? "#4caf50" : "#ff9800",
                        mr: 2,
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", fontSize: "0.9rem" }}
                      >
                        {activity.action}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#888", fontSize: "0.75rem" }}
                      >
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 2,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{ color: "#fff", fontWeight: 600, mb: 2 }}
              >
                Portfolio Health
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#bbb" }}>
                    Profile Completion
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#4caf50" }}>
                    92%
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: 6,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: "92%",
                      height: "100%",
                      backgroundColor: "#4caf50",
                      borderRadius: 3,
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#bbb" }}>
                    Content Freshness
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#ff9800" }}>
                    78%
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: 6,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: "78%",
                      height: "100%",
                      backgroundColor: "#ff9800",
                      borderRadius: 3,
                    }}
                  />
                </Box>
              </Box>

              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#bbb" }}>
                    SEO Score
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#00d4ff" }}>
                    85%
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: 6,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: "85%",
                      height: "100%",
                      backgroundColor: "#00d4ff",
                      borderRadius: 3,
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDashboard;
