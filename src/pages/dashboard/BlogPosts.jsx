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
  Article,
  Create,
  Visibility,
  ThumbUp,
  Comment,
  Share,
  CalendarToday,
  Schedule,
  Category,
  Tag,
  TrendingUp,
  Publish,
  Analytics,
  ReadMore,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const BlogPosts = () => {
  const { dashboardData, handleEdit } = useOutletContext();
  const data = dashboardData?.blog;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    // Published Blog Posts
    publishedPosts: data?.publishedPosts || [
      {
        id: 1,
        title:
          "Building Scalable Django REST APIs: Best Practices and Performance Tips",
        slug: "scalable-django-rest-apis-best-practices",
        excerpt:
          "Learn how to build high-performance Django REST APIs that can handle thousands of concurrent users. This comprehensive guide covers caching strategies, database optimization, and deployment best practices.",
        content:
          "# Building Scalable Django REST APIs\n\nIn this comprehensive guide, we'll explore the essential techniques for building Django REST APIs that can scale to handle high traffic loads...",
        status: "Published",
        category: "Web Development",
        tags: [
          "Django",
          "REST API",
          "Python",
          "Performance",
          "Scalability",
          "Backend",
        ],
        author: "Nazmul Hossain",
        publishedDate: "2023-09-15",
        lastModified: "2023-09-20",
        readTime: "12 min read",
        featured: true,
        featuredImage: "/blog/django-rest-api-cover.jpg",
        views: 2847,
        likes: 156,
        comments: 23,
        shares: 45,
        seoTitle: "Building Scalable Django REST APIs - Complete Guide",
        seoDescription:
          "Complete guide to building scalable Django REST APIs with performance optimization, caching strategies, and deployment best practices.",
        keywords: [
          "Django REST Framework",
          "API Development",
          "Python",
          "Web Development",
          "Scalability",
        ],
        relatedPosts: [2, 3],
        socialMedia: {
          linkedinShares: 28,
          twitterShares: 12,
          facebookShares: 5,
        },
      },
      {
        id: 2,
        title:
          "Machine Learning in Healthcare: Real-world Applications and Case Studies",
        slug: "machine-learning-healthcare-applications",
        excerpt:
          "Explore how machine learning is revolutionizing healthcare with real-world case studies, from diagnostic imaging to drug discovery and personalized treatment plans.",
        content:
          "# Machine Learning in Healthcare\n\nMachine learning is transforming healthcare in unprecedented ways. From early disease detection to personalized treatment recommendations...",
        status: "Published",
        category: "Machine Learning",
        tags: [
          "Machine Learning",
          "Healthcare",
          "AI",
          "Medical Technology",
          "Data Science",
        ],
        author: "Nazmul Hossain",
        publishedDate: "2023-08-22",
        lastModified: "2023-08-25",
        readTime: "15 min read",
        featured: true,
        featuredImage: "/blog/ml-healthcare-cover.jpg",
        views: 1923,
        likes: 134,
        comments: 18,
        shares: 32,
        seoTitle:
          "Machine Learning in Healthcare - Applications & Case Studies",
        seoDescription:
          "Discover real-world applications of machine learning in healthcare, including diagnostic imaging, drug discovery, and personalized medicine.",
        keywords: [
          "Machine Learning",
          "Healthcare AI",
          "Medical Technology",
          "Data Science",
        ],
        relatedPosts: [1, 4],
        socialMedia: {
          linkedinShares: 22,
          twitterShares: 8,
          facebookShares: 2,
        },
      },
      {
        id: 3,
        title:
          "React Performance Optimization: From Basics to Advanced Techniques",
        slug: "react-performance-optimization-guide",
        excerpt:
          "Master React performance optimization with practical techniques including memoization, lazy loading, code splitting, and advanced patterns for high-performance applications.",
        content:
          "# React Performance Optimization\n\nBuilding fast and responsive React applications requires understanding performance optimization techniques...",
        status: "Published",
        category: "Frontend Development",
        tags: [
          "React",
          "JavaScript",
          "Performance",
          "Optimization",
          "Frontend",
        ],
        author: "Nazmul Hossain",
        publishedDate: "2023-07-10",
        lastModified: "2023-07-12",
        readTime: "10 min read",
        featured: false,
        featuredImage: "/blog/react-performance-cover.jpg",
        views: 1654,
        likes: 98,
        comments: 15,
        shares: 28,
        seoTitle: "React Performance Optimization - Complete Guide",
        seoDescription:
          "Learn advanced React performance optimization techniques including memoization, lazy loading, and code splitting.",
        keywords: [
          "React Performance",
          "JavaScript Optimization",
          "Frontend Development",
        ],
        relatedPosts: [1, 5],
        socialMedia: {
          linkedinShares: 18,
          twitterShares: 7,
          facebookShares: 3,
        },
      },
    ],

    // Draft Posts
    draftPosts: data?.draftPosts || [
      {
        id: 4,
        title:
          "Building Real-time Applications with WebSockets and Django Channels",
        slug: "realtime-apps-websockets-django-channels",
        excerpt:
          "Learn how to build real-time web applications using WebSockets with Django Channels, covering chat applications, live notifications, and real-time data updates.",
        content:
          "# Building Real-time Applications\n\nReal-time functionality is becoming essential for modern web applications. In this guide, we'll explore...",
        status: "Draft",
        category: "Web Development",
        tags: ["Django", "WebSockets", "Real-time", "Channels", "Python"],
        author: "Nazmul Hossain",
        createdDate: "2023-09-20",
        lastModified: "2023-09-22",
        estimatedReadTime: "14 min read",
        completionStatus: 75,
        notes: "Need to add more code examples and deployment section",
        plannedPublishDate: "2023-10-01",
      },
      {
        id: 5,
        title: "Microservices Architecture with Docker and Kubernetes",
        slug: "microservices-docker-kubernetes",
        excerpt:
          "A comprehensive guide to implementing microservices architecture using Docker containers and Kubernetes orchestration for scalable applications.",
        content:
          "# Microservices Architecture\n\nMicroservices architecture has become the standard for building scalable, maintainable applications...",
        status: "Draft",
        category: "DevOps",
        tags: [
          "Microservices",
          "Docker",
          "Kubernetes",
          "DevOps",
          "Architecture",
        ],
        author: "Nazmul Hossain",
        createdDate: "2023-09-18",
        lastModified: "2023-09-23",
        estimatedReadTime: "18 min read",
        completionStatus: 60,
        notes: "Research more about service mesh and add practical examples",
        plannedPublishDate: "2023-10-15",
      },
    ],

    // Blog Categories
    categories: data?.categories || [
      "Web Development",
      "Machine Learning",
      "Frontend Development",
      "Backend Development",
      "DevOps",
      "Data Science",
      "Mobile Development",
      "AI & Automation",
      "Career Development",
      "Technology Trends",
    ],

    // Blog Tags
    tags: data?.tags || [
      "Django",
      "React",
      "Python",
      "JavaScript",
      "Machine Learning",
      "API Development",
      "Performance",
      "Healthcare",
      "AI",
      "Docker",
      "AWS",
      "PostgreSQL",
      "Frontend",
      "Backend",
      "Full-Stack",
      "Tutorial",
      "Best Practices",
      "Case Study",
      "Guide",
    ],

    // Blog Statistics
    blogStats: data?.blogStats || {
      totalPosts: 8,
      publishedPosts: 3,
      draftPosts: 2,
      totalViews: 6424,
      totalLikes: 388,
      totalComments: 56,
      totalShares: 105,
      averageReadTime: "12 min",
      mostPopularPost: "Building Scalable Django REST APIs",
      monthlyViews: 1847,
      subscriberCount: 234,
    },

    // Content Calendar
    contentCalendar: data?.contentCalendar || [
      {
        id: 1,
        title: "Advanced Django Patterns for Enterprise Applications",
        plannedDate: "2023-10-01",
        status: "Planned",
        category: "Web Development",
        estimatedLength: "16 min read",
      },
      {
        id: 2,
        title: "GraphQL vs REST: When to Choose What",
        plannedDate: "2023-10-15",
        status: "Research",
        category: "API Development",
        estimatedLength: "12 min read",
      },
      {
        id: 3,
        title: "Building Secure Authentication Systems",
        plannedDate: "2023-11-01",
        status: "Outline",
        category: "Security",
        estimatedLength: "14 min read",
      },
    ],

    // SEO Performance
    seoMetrics: data?.seoMetrics || {
      organicTraffic: 4256,
      searchImpressions: 15847,
      averagePosition: 12.4,
      clickThroughRate: 8.7,
      topKeywords: [
        "Django REST API",
        "Machine Learning Healthcare",
        "React Performance",
        "Python Web Development",
        "API Best Practices",
      ],
    },
  });

  const [saveAlert, setSaveAlert] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [newTag, setNewTag] = useState("");

  const handleSave = () => {
    if (handleEdit) {
      handleEdit("blog", editedData);
    }
    setIsEditing(false);
    setSaveAlert({
      type: "success",
      message: "Blog section updated successfully!",
    });
    setTimeout(() => setSaveAlert(null), 3000);
  };

  const handleCancel = () => {
    setEditedData({
      publishedPosts: data?.publishedPosts || [],
      draftPosts: data?.draftPosts || [],
      categories: data?.categories || [],
      tags: data?.tags || [],
      blogStats: data?.blogStats || {},
      contentCalendar: data?.contentCalendar || [],
      seoMetrics: data?.seoMetrics || {},
    });
    setIsEditing(false);
  };

  const addCategory = () => {
    if (newCategory.trim() && editedData.categories.length < 15) {
      setEditedData((prev) => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()],
      }));
      setNewCategory("");
    }
  };

  const removeCategory = (index) => {
    setEditedData((prev) => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (newTag.trim() && editedData.tags.length < 30) {
      setEditedData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (index) => {
    setEditedData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
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

  // Reusable Blog Card Component
  const BlogCard = ({ icon, title, description, children, hover = true }) => (
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
          Blog Posts Section
        </Typography>
        <Typography variant="body1" sx={{ color: "#888" }}>
          Manage your blog content, analytics, and publishing workflow
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
        <BlogCard hover={false}>
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
                Blog Section Management
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Content management, analytics, and publishing workflow
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
                Edit Blog
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
        </BlogCard>
      </motion.div>

      {/* Blog Statistics Overview */}
      <motion.div variants={itemVariants}>
        <BlogCard
          icon={<Analytics />}
          title="Blog Analytics"
          description="Performance metrics and content statistics"
        >
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#4CAF50", fontWeight: 700 }}
                >
                  {editedData.blogStats.totalPosts}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Total Posts
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#2196F3", fontWeight: 700 }}
                >
                  {editedData.blogStats.totalViews.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Total Views
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#FF9800", fontWeight: 700 }}
                >
                  {editedData.blogStats.totalLikes}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Total Likes
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#9C27B0", fontWeight: 700 }}
                >
                  {editedData.blogStats.subscriberCount}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Subscribers
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Additional Stats Row */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#E91E63", fontWeight: 600 }}
                >
                  {editedData.blogStats.totalComments}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Comments
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#00BCD4", fontWeight: 600 }}
                >
                  {editedData.blogStats.totalShares}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Shares
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#FFC107", fontWeight: 600 }}
                >
                  {editedData.blogStats.averageReadTime}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Avg. Read Time
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#795548", fontWeight: 600 }}
                >
                  {editedData.blogStats.monthlyViews.toLocaleString()}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Monthly Views
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </BlogCard>
      </motion.div>

      {/* Published Posts Section */}
      <motion.div variants={itemVariants}>
        <BlogCard
          icon={<Article />}
          title="Published Blog Posts"
          description="Live content reaching your audience"
        >
          {editedData.publishedPosts.map((post, index) => (
            <Box
              key={post.id}
              sx={{
                mb: 4,
                p: 3,
                backgroundColor: "rgba(76, 175, 80, 0.05)",
                border: "1px solid rgba(76, 175, 80, 0.2)",
                borderRadius: 3,
                position: "relative",
              }}
            >
              {/* Featured Badge */}
              {post.featured && (
                <Chip
                  label="Featured"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    backgroundColor: "rgba(255, 193, 7, 0.2)",
                    color: "#FFC107",
                    fontWeight: 600,
                  }}
                />
              )}

              {/* Post Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                  pr: 8,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", fontWeight: 600, mb: 1 }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#4CAF50", fontWeight: 500, mb: 1 }}
                  >
                    {post.category}
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
                      <CalendarToday
                        sx={{ color: "#888", mr: 1, fontSize: 16 }}
                      />
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        {post.publishedDate}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Schedule sx={{ color: "#888", mr: 1, fontSize: 16 }} />
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        {post.readTime}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Post Excerpt */}
              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 3 }}
              >
                {post.excerpt}
              </Typography>

              {/* Post Tags */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#4CAF50", mb: 1, fontWeight: 600 }}
                >
                  Tags
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {post.tags.slice(0, 6).map((tag, idx) => (
                    <Chip
                      key={idx}
                      label={tag}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(33, 150, 243, 0.2)",
                        color: "#2196F3",
                        fontWeight: 500,
                      }}
                    />
                  ))}
                  {post.tags.length > 6 && (
                    <Chip
                      label={`+${post.tags.length - 6} more`}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(158, 158, 158, 0.2)",
                        color: "#9E9E9E",
                        fontWeight: 500,
                      }}
                    />
                  )}
                </Box>
              </Box>

              {/* Post Metrics */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#4CAF50", mb: 2, fontWeight: 600 }}
                >
                  Performance Metrics
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Visibility
                        sx={{ color: "#2196F3", mr: 1, fontSize: 18 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", fontWeight: 600 }}
                      >
                        {post.views.toLocaleString()}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#888",
                        textAlign: "center",
                        display: "block",
                      }}
                    >
                      Views
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ThumbUp sx={{ color: "#FF9800", mr: 1, fontSize: 18 }} />
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", fontWeight: 600 }}
                      >
                        {post.likes}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#888",
                        textAlign: "center",
                        display: "block",
                      }}
                    >
                      Likes
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Comment sx={{ color: "#9C27B0", mr: 1, fontSize: 18 }} />
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", fontWeight: 600 }}
                      >
                        {post.comments}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#888",
                        textAlign: "center",
                        display: "block",
                      }}
                    >
                      Comments
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Share sx={{ color: "#E91E63", mr: 1, fontSize: 18 }} />
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", fontWeight: 600 }}
                      >
                        {post.shares}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#888",
                        textAlign: "center",
                        display: "block",
                      }}
                    >
                      Shares
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Post Actions */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <Chip
                  icon={<ReadMore />}
                  label="Read Full Post"
                  component={Link}
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  clickable
                  sx={{
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                    color: "#4CAF50",
                    "&:hover": { backgroundColor: "rgba(76, 175, 80, 0.3)" },
                  }}
                />
                <Chip
                  icon={<Edit />}
                  label="Edit Post"
                  clickable
                  sx={{
                    backgroundColor: "rgba(33, 150, 243, 0.2)",
                    color: "#2196F3",
                    "&:hover": { backgroundColor: "rgba(33, 150, 243, 0.3)" },
                  }}
                />
                <Chip
                  icon={<Analytics />}
                  label="View Analytics"
                  clickable
                  sx={{
                    backgroundColor: "rgba(255, 152, 0, 0.2)",
                    color: "#FF9800",
                    "&:hover": { backgroundColor: "rgba(255, 152, 0, 0.3)" },
                  }}
                />
              </Box>
            </Box>
          ))}
        </BlogCard>
      </motion.div>

      {/* Draft Posts Section */}
      <motion.div variants={itemVariants}>
        <BlogCard
          icon={<Create />}
          title="Draft Posts"
          description="Work in progress and unpublished content"
        >
          {editedData.draftPosts.map((post, index) => (
            <Box
              key={post.id}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "rgba(255, 152, 0, 0.05)",
                border: "1px solid rgba(255, 152, 0, 0.2)",
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
                    {post.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#FF9800", fontWeight: 500, mb: 1 }}
                  >
                    {post.category}
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
                      <Create sx={{ color: "#888", mr: 1, fontSize: 16 }} />
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        Created: {post.createdDate}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Schedule sx={{ color: "#888", mr: 1, fontSize: 16 }} />
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        {post.estimatedReadTime}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Chip
                    label={`${post.completionStatus}% Complete`}
                    size="small"
                    sx={{
                      backgroundColor:
                        post.completionStatus >= 75
                          ? "rgba(76, 175, 80, 0.2)"
                          : "rgba(255, 152, 0, 0.2)",
                      color:
                        post.completionStatus >= 75 ? "#4CAF50" : "#FF9800",
                      fontWeight: 600,
                      mb: 1,
                    }}
                  />
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    Planned: {post.plannedPublishDate}
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {post.excerpt}
              </Typography>

              {/* Tags */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#FF9800", mb: 1, fontWeight: 600 }}
                >
                  Tags
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {post.tags.map((tag, idx) => (
                    <Chip
                      key={idx}
                      label={tag}
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

              {/* Notes */}
              {post.notes && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#FF9800", mb: 1, fontWeight: 600 }}
                  >
                    Notes
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#fff", fontStyle: "italic" }}
                  >
                    {post.notes}
                  </Typography>
                </Box>
              )}

              {/* Draft Actions */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <Chip
                  icon={<Edit />}
                  label="Continue Writing"
                  clickable
                  sx={{
                    backgroundColor: "rgba(255, 152, 0, 0.2)",
                    color: "#FF9800",
                    "&:hover": { backgroundColor: "rgba(255, 152, 0, 0.3)" },
                  }}
                />
                <Chip
                  icon={<Publish />}
                  label="Publish Now"
                  clickable
                  sx={{
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                    color: "#4CAF50",
                    "&:hover": { backgroundColor: "rgba(76, 175, 80, 0.3)" },
                  }}
                />
                <Chip
                  icon={<Schedule />}
                  label="Schedule"
                  clickable
                  sx={{
                    backgroundColor: "rgba(33, 150, 243, 0.2)",
                    color: "#2196F3",
                    "&:hover": { backgroundColor: "rgba(33, 150, 243, 0.3)" },
                  }}
                />
              </Box>
            </Box>
          ))}
        </BlogCard>
      </motion.div>

      {/* Blog Categories Section */}
      <motion.div variants={itemVariants}>
        <BlogCard
          icon={<Category />}
          title="Blog Categories"
          description="Content organization and topic classification"
        >
          <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
            Max 15 blog categories
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {editedData.categories.map((category, index) => (
              <Chip
                key={index}
                label={category}
                onDelete={isEditing ? () => removeCategory(index) : undefined}
                deleteIcon={isEditing ? <Close /> : undefined}
                sx={{
                  backgroundColor: "rgba(156, 39, 176, 0.2)",
                  color: "#9C27B0",
                  border: "1px solid rgba(156, 39, 176, 0.5)",
                  fontWeight: 600,
                  "& .MuiChip-deleteIcon": {
                    color: "#9C27B0",
                    "&:hover": { color: "#BA68C8" },
                  },
                }}
              />
            ))}
          </Box>

          {isEditing && editedData.categories.length < 15 && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Add new category"
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
        </BlogCard>
      </motion.div>

      {/* Blog Tags Section */}
      <motion.div variants={itemVariants}>
        <BlogCard
          icon={<Tag />}
          title="Blog Tags"
          description="Content tagging system for better discoverability"
        >
          <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
            Max 30 blog tags
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {editedData.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={isEditing ? () => removeTag(index) : undefined}
                deleteIcon={isEditing ? <Close /> : undefined}
                sx={{
                  backgroundColor: "rgba(0, 150, 136, 0.2)",
                  color: "#009688",
                  border: "1px solid rgba(0, 150, 136, 0.5)",
                  fontWeight: 600,
                  "& .MuiChip-deleteIcon": {
                    color: "#009688",
                    "&:hover": { color: "#4DB6AC" },
                  },
                }}
              />
            ))}
          </Box>

          {isEditing && editedData.tags.length < 30 && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Add new tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTag()}
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
                onClick={addTag}
                disabled={!newTag.trim()}
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
        </BlogCard>
      </motion.div>

      {/* SEO Performance Section */}
      <motion.div variants={itemVariants}>
        <BlogCard
          icon={<TrendingUp />}
          title="SEO Performance"
          description="Search engine optimization metrics and keyword rankings"
        >
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h5"
                  sx={{ color: "#4CAF50", fontWeight: 700 }}
                >
                  {editedData.seoMetrics.organicTraffic.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Organic Traffic
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h5"
                  sx={{ color: "#2196F3", fontWeight: 700 }}
                >
                  {editedData.seoMetrics.searchImpressions.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Impressions
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h5"
                  sx={{ color: "#FF9800", fontWeight: 700 }}
                >
                  {editedData.seoMetrics.averagePosition}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Avg. Position
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h5"
                  sx={{ color: "#9C27B0", fontWeight: 700 }}
                >
                  {editedData.seoMetrics.clickThroughRate}%
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  CTR
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Top Keywords */}
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#4CAF50", mb: 2, fontWeight: 600 }}
            >
              Top Performing Keywords
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {editedData.seoMetrics.topKeywords.map((keyword, index) => (
                <Chip
                  key={index}
                  label={keyword}
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
        </BlogCard>
      </motion.div>
    </motion.div>
  );
};

export default BlogPosts;
