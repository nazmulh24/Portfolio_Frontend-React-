import React, { useMemo, useState, useCallback } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Tooltip,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Search,
  FilterList,
  Clear,
  Article,
  Visibility,
  ThumbUp,
  TrendingUp,
  Launch,
  Comment,
} from "@mui/icons-material";

const BlogPosts = () => {
  // Comprehensive blog posts data
  const allBlogPosts = useMemo(
    () => [
      {
        id: "blog-001",
        title: "Building Scalable Django REST APIs",
        excerpt:
          "Comprehensive guide to building production-ready REST APIs with Django, covering caching strategies, database optimization, and infrastructure patterns for high-performance applications.",
        category: "Backend Development",
        status: "Published",
        readTime: "12 min read",
        publishedDate: "2024-09-15",
        views: 2847,
        likes: 156,
        comments: 23,
        shares: 45,
        slug: "scalable-django-rest-apis-best-practices",
        tags: ["Django", "REST API", "Performance", "Backend", "Python"],
        featured: true,
        url: "https://blog.example.com/scalable-django-rest-apis",
      },
      {
        id: "blog-002",
        title: "Machine Learning in Healthcare Applications",
        excerpt:
          "Exploring real-world applications of machine learning in healthcare, from predictive diagnostics to personalized treatment plans and compliance considerations.",
        category: "AI & Machine Learning",
        status: "Published",
        readTime: "15 min read",
        publishedDate: "2024-08-22",
        views: 1923,
        likes: 134,
        comments: 18,
        shares: 32,
        slug: "machine-learning-healthcare-applications",
        tags: ["Machine Learning", "Healthcare", "AI", "Data Science"],
        featured: false,
        url: "https://blog.example.com/ml-healthcare-applications",
      },
      {
        id: "blog-003",
        title: "React Performance Optimization Guide",
        excerpt:
          "Advanced techniques for optimizing React applications including memoization strategies, code splitting, and bundle analysis for improved user experience.",
        category: "Frontend Development",
        status: "Published",
        readTime: "10 min read",
        publishedDate: "2024-07-10",
        views: 1654,
        likes: 98,
        comments: 15,
        shares: 28,
        slug: "react-performance-optimization-guide",
        tags: ["React", "Performance", "JavaScript", "Frontend"],
        featured: true,
        url: "https://blog.example.com/react-performance-guide",
      },
      {
        id: "blog-004",
        title: "Real-time Applications with Django Channels",
        excerpt:
          "Building real-time web applications using Django Channels, WebSockets, and Redis for live chat, notifications, and collaborative features.",
        category: "Backend Development",
        status: "Draft",
        readTime: "14 min read",
        publishedDate: null,
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        slug: "realtime-django-channels-websockets",
        tags: ["Django", "WebSockets", "Real-time", "Channels"],
        featured: false,
        completion: 75,
      },
      {
        id: "blog-005",
        title: "Microservices Architecture with Kubernetes",
        excerpt:
          "Complete guide to designing and deploying microservices using Docker and Kubernetes, covering service boundaries, communication patterns, and deployment strategies.",
        category: "DevOps & Infrastructure",
        status: "Draft",
        readTime: "18 min read",
        publishedDate: null,
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        slug: "microservices-kubernetes-deployment",
        tags: ["Microservices", "Kubernetes", "Docker", "DevOps"],
        featured: false,
        completion: 60,
      },
      {
        id: "blog-006",
        title: "Advanced Database Optimization Techniques",
        excerpt:
          "Deep dive into database performance tuning, indexing strategies, query optimization, and scaling patterns for high-traffic applications.",
        category: "Database",
        status: "Published",
        readTime: "16 min read",
        publishedDate: "2024-06-05",
        views: 2156,
        likes: 189,
        comments: 31,
        shares: 67,
        slug: "database-optimization-techniques",
        tags: ["Database", "PostgreSQL", "Performance", "Optimization"],
        featured: true,
        url: "https://blog.example.com/database-optimization",
      },
      {
        id: "blog-007",
        title: "Building Secure APIs with Authentication",
        excerpt:
          "Comprehensive security guide for API development covering JWT tokens, OAuth 2.0, rate limiting, and best practices for protecting sensitive data.",
        category: "Security",
        status: "Published",
        readTime: "13 min read",
        publishedDate: "2024-05-18",
        views: 1432,
        likes: 87,
        comments: 12,
        shares: 19,
        slug: "secure-api-authentication-guide",
        tags: ["Security", "Authentication", "JWT", "OAuth", "API"],
        featured: false,
        url: "https://blog.example.com/secure-api-authentication",
      },
      {
        id: "blog-008",
        title: "Modern Frontend State Management",
        excerpt:
          "Comparing state management solutions for React applications including Redux Toolkit, Zustand, and React Query for different use cases.",
        category: "Frontend Development",
        status: "Published",
        readTime: "11 min read",
        publishedDate: "2024-04-25",
        views: 1789,
        likes: 112,
        comments: 22,
        shares: 34,
        slug: "frontend-state-management-comparison",
        tags: ["React", "State Management", "Redux", "Zustand"],
        featured: false,
        url: "https://blog.example.com/frontend-state-management",
      },
    ],
    []
  );

  // Filter states
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Helper functions for data processing
  const getUniqueValues = useCallback((key) => {
    const values = allBlogPosts.map((post) => post[key]).filter(Boolean);
    return [...new Set(values)];
  }, [allBlogPosts]);

  // Statistics calculations
  const stats = useMemo(() => {
    const published = allBlogPosts.filter(post => post.status === "Published").length;
    const totalViews = allBlogPosts.reduce((sum, post) => sum + (post.views || 0), 0);
    const totalLikes = allBlogPosts.reduce((sum, post) => sum + (post.likes || 0), 0);

    return [
      {
        label: "Total Posts",
        value: allBlogPosts.length,
        icon: <Article />,
        color: "#64B5F6",
      },
      {
        label: "Published",
        value: published,
        icon: <Visibility />,
        color: "#81C784",
      },
      {
        label: "Total Views",
        value: totalViews.toLocaleString(),
        icon: <TrendingUp />,
        color: "#FFB74D",
      },
      {
        label: "Total Likes",
        value: totalLikes.toLocaleString(),
        icon: <ThumbUp />,
        color: "#F06292",
      },
    ];
  }, [allBlogPosts]);

  // Filtered and sorted blog posts
  const filteredPosts = useMemo(() => {
    let filtered = allBlogPosts.filter((post) => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
      
      const matchesFilter = 
        filter === "all" || 
        (filter === "published" && post.status === "Published") ||
        (filter === "drafts" && post.status === "Draft") ||
        (filter === "featured" && post.featured);

      return matchesSearch && matchesCategory && matchesFilter;
    });

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.publishedDate || "1970-01-01") - new Date(a.publishedDate || "1970-01-01");
        case "oldest":
          return new Date(a.publishedDate || "1970-01-01") - new Date(b.publishedDate || "1970-01-01");
        case "mostViews":
          return (b.views || 0) - (a.views || 0);
        case "mostLikes":
          return (b.likes || 0) - (a.likes || 0);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allBlogPosts, searchTerm, categoryFilter, filter, sortBy]);

  // Get unique categories for filter dropdown
  const categories = getUniqueValues("category");

  const clearFilters = () => {
    setFilter("all");
    setSearchTerm("");
    setCategoryFilter("all");
    setSortBy("newest");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#0D1117",
        p: 3,
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                fontWeight: 700,
                mb: 1,
                background: "linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Blog Posts
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.7)",
                maxWidth: 600,
              }}
            >
              Manage your blog posts, drafts, and content strategy with advanced
              analytics and engagement tracking.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              background: "linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%)",
              px: 3,
              py: 1.5,
              borderRadius: 2,
              "&:hover": {
                background: "linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)",
              },
            }}
          >
            NEW POST
          </Button>
        </Stack>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <Card
              sx={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 3,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 8px 32px rgba(${stat.color.replace(
                    "#",
                    ""
                  )}, 0.3)`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: `${stat.color}20`,
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ color: "#fff", fontWeight: 600 }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filters and Controls */}
      <Card
        sx={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 3,
          mb: 4,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <FilterList sx={{ color: "rgba(255,255,255,0.7)", fontSize: 20 }} />
              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
                Filters
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
              {filteredPosts.length} of {allBlogPosts.length}
            </Typography>
          </Stack>
          
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search posts, tags, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "rgba(255,255,255,0.5)" }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setSearchTerm("")}
                        sx={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        <Clear />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    color: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.2)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.4)",
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={4} md={2}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                  Status
                </InputLabel>
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  label="Status"
                  sx={{
                    color: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.2)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.4)",
                    },
                  }}
                >
                  <MenuItem value="all">All Posts</MenuItem>
                  <MenuItem value="published">Published</MenuItem>
                  <MenuItem value="drafts">Drafts</MenuItem>
                  <MenuItem value="featured">Featured</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4} md={2}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                  Category
                </InputLabel>
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  label="Category"
                  sx={{
                    color: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.2)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.4)",
                    },
                  }}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4} md={2}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                  Sort By
                </InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sort By"
                  sx={{
                    color: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.2)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.4)",
                    },
                  }}
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                  <MenuItem value="mostViews">Most Views</MenuItem>
                  <MenuItem value="mostLikes">Most Likes</MenuItem>
                  <MenuItem value="title">Alphabetical</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
              <Button
                variant="outlined"
                onClick={clearFilters}
                startIcon={<Clear />}
                fullWidth
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  borderColor: "rgba(255,255,255,0.2)",
                  "&:hover": {
                    borderColor: "rgba(255,255,255,0.4)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                  },
                }}
              >
                CLEAR
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Blog Posts Grid */}
      <Grid container spacing={3}>
        {filteredPosts.map((post) => (
          <Grid item xs={12} md={6} lg={4} key={post.id}>
            <Card
              sx={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 3,
                height: "100%",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-4px)",
                  border: "1px solid rgba(100,181,246,0.3)",
                  boxShadow: "0 8px 32px rgba(100,181,246,0.2)",
                },
              }}
            >
              <CardContent sx={{ p: 3, height: "100%" }}>
                <Stack spacing={2} sx={{ height: "100%" }}>
                  {/* Header */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#fff",
                          fontWeight: 600,
                          mb: 0.5,
                          lineHeight: 1.3,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          mb: 1,
                        }}
                      >
                        {post.category} • {post.readTime}
                      </Typography>
                    </Box>
                    
                    <Stack direction="row" spacing={1}>
                      {post.featured && (
                        <Chip
                          label="Featured"
                          size="small"
                          sx={{
                            backgroundColor: "rgba(255,193,7,0.2)",
                            color: "#FFD54F",
                            fontWeight: 600,
                          }}
                        />
                      )}
                      <Chip
                        label={post.status}
                        size="small"
                        sx={{
                          backgroundColor:
                            post.status === "Published"
                              ? "rgba(76,175,80,0.2)"
                              : "rgba(255,152,0,0.2)",
                          color:
                            post.status === "Published" ? "#81C784" : "#FFB74D",
                          fontWeight: 600,
                        }}
                      />
                    </Stack>
                  </Stack>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.8)",
                      lineHeight: 1.6,
                      flexGrow: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.excerpt}
                  </Typography>

                  {/* Tags */}
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(33,150,243,0.15)",
                          color: "#90CAF9",
                          fontWeight: 500,
                        }}
                      />
                    ))}
                    {post.tags.length > 3 && (
                      <Chip
                        label={`+${post.tags.length - 3}`}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.6)",
                          fontWeight: 500,
                        }}
                      />
                    )}
                  </Stack>

                  {/* Metrics */}
                  {post.status === "Published" ? (
                    <Stack direction="row" spacing={3}>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Visibility sx={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }} />
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                          {post.views?.toLocaleString()}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <ThumbUp sx={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }} />
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                          {post.likes?.toLocaleString()}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Comment sx={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }} />
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                          {post.comments?.toLocaleString()}
                        </Typography>
                      </Stack>
                    </Stack>
                  ) : (
                    <Stack direction="row" spacing={2}>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                        {post.completion}% Complete
                      </Typography>
                    </Stack>
                  )}

                  {/* Actions */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography
                      variant="caption"
                      sx={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {post.publishedDate
                        ? `Published ${post.publishedDate}`
                        : "Draft"}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          sx={{
                            color: "rgba(244,67,54,0.7)",
                            "&:hover": {
                              color: "#F44336",
                              backgroundColor: "rgba(244,67,54,0.1)",
                            },
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                            "&:hover": {
                              color: "#fff",
                              backgroundColor: "rgba(255,255,255,0.1)",
                            },
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {post.url && (
                        <Tooltip title="View Post">
                          <IconButton
                            size="small"
                            sx={{
                              color: "rgba(100,181,246,0.7)",
                              "&:hover": {
                                color: "#64B5F6",
                                backgroundColor: "rgba(100,181,246,0.1)",
                              },
                            }}
                          >
                            <Launch fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <Card
          sx={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 3,
            mt: 4,
          }}
        >
          <CardContent sx={{ p: 6, textAlign: "center" }}>
            <Article sx={{ fontSize: 64, color: "rgba(255,255,255,0.3)", mb: 2 }} />
            <Typography
              variant="h6"
              sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}
            >
              No blog posts found
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.5)", mb: 3 }}
            >
              Try adjusting your search criteria or create your first blog post.
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                background: "linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%)",
                "&:hover": {
                  background: "linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)",
                },
              }}
            >
              Create First Post
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default BlogPosts;