import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Typography, Grid, Card, Button } from "@mui/material";
import { Add, Settings, Article, TrendingUp } from "@mui/icons-material";
import { motion } from "framer-motion";

const Overview = () => {
  const { dashboardData } = useOutletContext();
  const data = dashboardData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 600 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: "#888" }}>
          Welcome back! Here's a quick overview of your content.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #333",
              p: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="h3"
                  sx={{ color: "#fff", fontWeight: 600 }}
                >
                  {data?.stats?.totalProjects || 0}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  {data?.stats?.completedProjects || 0} completed
                </Typography>
              </Box>
              <TrendingUp sx={{ color: "#4CAF50", fontSize: 40 }} />
            </Box>
            <Typography variant="h6" sx={{ color: "#fff", mt: 2 }}>
              Total Projects
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #333",
              p: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="h3"
                  sx={{ color: "#fff", fontWeight: 600 }}
                >
                  {data?.stats?.blogPosts || 0}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  {data?.stats?.publishedPosts || 0} published
                </Typography>
              </Box>
              <Article sx={{ color: "#2196F3", fontSize: 40 }} />
            </Box>
            <Typography variant="h6" sx={{ color: "#fff", mt: 2 }}>
              Blog Posts
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #333",
              p: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="h3"
                  sx={{ color: "#fff", fontWeight: 600 }}
                >
                  {data?.stats?.publications || 0}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Academic publications
                </Typography>
              </Box>
              <Settings sx={{ color: "#FF9800", fontSize: 40 }} />
            </Box>
            <Typography variant="h6" sx={{ color: "#fff", mt: 2 }}>
              Publications
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions and Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #333",
              p: 3,
              height: "100%",
            }}
          >
            <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
              Quick Actions
            </Typography>
            <Typography variant="body2" sx={{ color: "#888", mb: 3 }}>
              Manage your content efficiently
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                startIcon={<Add />}
                variant="contained"
                sx={{
                  backgroundColor: "#333",
                  color: "#fff",
                  justifyContent: "flex-start",
                  "&:hover": { backgroundColor: "#444" },
                }}
              >
                Add New Project
              </Button>
              <Button
                startIcon={<Add />}
                variant="contained"
                sx={{
                  backgroundColor: "#333",
                  color: "#fff",
                  justifyContent: "flex-start",
                  "&:hover": { backgroundColor: "#444" },
                }}
              >
                Write New Blog Post
              </Button>
              <Button
                startIcon={<Settings />}
                variant="contained"
                sx={{
                  backgroundColor: "#333",
                  color: "#fff",
                  justifyContent: "flex-start",
                  "&:hover": { backgroundColor: "#444" },
                }}
              >
                Dashboard Settings
              </Button>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #333",
              p: 3,
              height: "100%",
            }}
          >
            <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
              Recent Activity
            </Typography>
            <Typography variant="body2" sx={{ color: "#888", mb: 3 }}>
              Your latest content updates
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {(data?.recentActivity || []).map((activity, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#4CAF50",
                      mr: 2,
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {activity}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Overview;
