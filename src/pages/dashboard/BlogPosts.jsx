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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Autocomplete,
  Switch,
  FormControlLabel,
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
  Close,
  Save,
} from "@mui/icons-material";

const BlogPosts = () => {
  // CRUD states
  const [blogPosts, setBlogPosts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [dialogMode, setDialogMode] = useState("add"); // add, edit
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    status: "Draft",
    readTime: "",
    tags: [],
    featured: false,
    completion: 0,
  });

  // Initialize with demo data
  React.useEffect(() => {
    setBlogPosts([
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
    ]);
  }, []);

  // Use state for blog posts data
  const allBlogPosts = useMemo(() => blogPosts, [blogPosts]);

  // Filter states
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Helper functions for data processing
  const getUniqueValues = useCallback(
    (key) => {
      const values = allBlogPosts.map((post) => post[key]).filter(Boolean);
      return [...new Set(values)];
    },
    [allBlogPosts]
  );

  // Statistics calculations
  const stats = useMemo(() => {
    const published = allBlogPosts.filter(
      (post) => post.status === "Published"
    ).length;
    const totalViews = allBlogPosts.reduce(
      (sum, post) => sum + (post.views || 0),
      0
    );
    const totalLikes = allBlogPosts.reduce(
      (sum, post) => sum + (post.likes || 0),
      0
    );

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
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        categoryFilter === "all" || post.category === categoryFilter;

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
          return (
            new Date(b.publishedDate || "1970-01-01") -
            new Date(a.publishedDate || "1970-01-01")
          );
        case "oldest":
          return (
            new Date(a.publishedDate || "1970-01-01") -
            new Date(b.publishedDate || "1970-01-01")
          );
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

  // CRUD handlers
  const handleOpenAddDialog = () => {
    setDialogMode("add");
    setSelectedPost(null);
    setFormData({
      title: "",
      excerpt: "",
      category: "",
      status: "Draft",
      readTime: "",
      tags: [],
      featured: false,
      completion: 0,
    });
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (post) => {
    setDialogMode("edit");
    setSelectedPost(post);
    setFormData({
      title: post.title || "",
      excerpt: post.excerpt || "",
      category: post.category || "",
      status: post.status || "Draft",
      readTime: post.readTime || "",
      tags: Array.isArray(post.tags) ? post.tags : [],
      featured: post.featured || false,
      completion: post.completion || 0,
    });
    setDialogOpen(true);
  };

  const handleOpenDeleteDialog = (post) => {
    setSelectedPost(post);
    setDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPost(null);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedPost(null);
  };

  const handleSave = () => {
    // Validate required fields
    if (!formData.title.trim() || !formData.excerpt.trim()) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields (Title and Excerpt).",
        severity: "error",
      });
      return;
    }

    if (dialogMode === "add") {
      // Add new post
      const newPost = {
        ...formData,
        id: `blog-${Date.now()}`,
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        publishedDate:
          formData.status === "Published"
            ? new Date().toISOString().split("T")[0]
            : null,
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        slug: formData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, ""),
        url:
          formData.status === "Published"
            ? `https://blog.example.com/${formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")}`
            : null,
      };
      setBlogPosts((prev) => [newPost, ...prev]);
      setSnackbar({
        open: true,
        message: "Blog post added successfully!",
        severity: "success",
      });
    } else if (dialogMode === "edit") {
      // Update existing post
      const updatedPost = {
        ...selectedPost,
        ...formData,
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        publishedDate:
          formData.status === "Published" && !selectedPost.publishedDate
            ? new Date().toISOString().split("T")[0]
            : selectedPost.publishedDate,
      };
      setBlogPosts((prev) =>
        prev.map((post) => (post.id === selectedPost.id ? updatedPost : post))
      );
      setSnackbar({
        open: true,
        message: "Blog post updated successfully!",
        severity: "success",
      });
    }

    handleCloseDialog();
  };

  const handleDeletePost = () => {
    if (!selectedPost?.id) {
      setSnackbar({
        open: true,
        message: "Error: No post selected for deletion.",
        severity: "error",
      });
      return;
    }

    setBlogPosts((prev) => prev.filter((post) => post.id !== selectedPost.id));
    handleCloseDeleteDialog();
    setSnackbar({
      open: true,
      message: "Blog post deleted successfully!",
      severity: "success",
    });
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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
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
            onClick={handleOpenAddDialog}
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
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 3,
                height: "100%",
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
              <CardContent
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ width: "100%" }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: `${stat.color}20`,
                      color: stat.color,
                      minWidth: "fit-content",
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#fff",
                        fontWeight: 600,
                        lineHeight: 1.2,
                        mb: 0.5,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.6)",
                        lineHeight: 1.3,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
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
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <FilterList
                sx={{ color: "rgba(255,255,255,0.7)", fontSize: 20 }}
              />
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
          <Grid item xs={12} md={6} key={post.id}>
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

                    {/* header chips removed - moved to actions row */}
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

                  {/* Metrics and Date Row */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {post.status === "Published" ? (
                      <Stack direction="row" spacing={3}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.5}
                        >
                          <Visibility
                            sx={{
                              fontSize: 16,
                              color: "rgba(255,255,255,0.6)",
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{ color: "rgba(255,255,255,0.6)" }}
                          >
                            {post.views?.toLocaleString()}
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.5}
                        >
                          <ThumbUp
                            sx={{
                              fontSize: 16,
                              color: "rgba(255,255,255,0.6)",
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{ color: "rgba(255,255,255,0.6)" }}
                          >
                            {post.likes?.toLocaleString()}
                          </Typography>
                        </Stack>
                      </Stack>
                    ) : (
                      <Typography
                        variant="caption"
                        sx={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        {post.completion}% Complete
                      </Typography>
                    )}

                    <Typography
                      variant="caption"
                      sx={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {post.publishedDate
                        ? `Published ${post.publishedDate}`
                        : "Draft"}
                    </Typography>
                  </Stack>

                  {/* Actions */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
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

                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditDialog(post);
                        }}
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
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDeleteDialog(post);
                        }}
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
            <Article
              sx={{ fontSize: 64, color: "rgba(255,255,255,0.3)", mb: 2 }}
            />
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
              onClick={handleOpenAddDialog}
              sx={{
                background: "linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)",
                },
              }}
            >
              Create First Post
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#1e1e1e",
            color: "#fff",
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#fff",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            pb: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Article sx={{ color: "#64B5F6" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {dialogMode === "add" ? "Add New Blog Post" : "Edit Blog Post"}
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ pb: 3, px: 3 }}>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              {/* Row 1: Title */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title *"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#64B5F6" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>

              {/* Row 2: Category + Status + Read Time + Featured */}
              <Grid item xs={12} sm={6} md={4.3}>
                <Autocomplete
                  freeSolo
                  options={categories}
                  value={formData.category}
                  onChange={(event, newValue) => {
                    setFormData({ ...formData, category: newValue || "" });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category *"
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#64B5F6" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.5}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Status
                  </InputLabel>
                  <Select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    sx={{
                      color: "#fff",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#64B5F6",
                      },
                    }}
                  >
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="Published">Published</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2.5}>
                <TextField
                  fullWidth
                  label="Read Time"
                  value={formData.readTime}
                  onChange={(e) =>
                    setFormData({ ...formData, readTime: e.target.value })
                  }
                  placeholder="e.g., 5 min read"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#64B5F6" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.7}>
                <Box sx={{ display: "flex", alignItems: "center", height: "100%", pt: 1 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.featured}
                        onChange={(e) =>
                          setFormData({ ...formData, featured: e.target.checked })
                        }
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#64B5F6",
                            "&:hover": {
                              backgroundColor: "rgba(100, 181, 246, 0.04)",
                            },
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: "#64B5F6",
                            },
                        }}
                      />
                    }
                    label="Featured Post"
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  />
                </Box>
              </Grid>

              {/* Row 3: Excerpt */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Excerpt *"
                  multiline
                  rows={3}
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#64B5F6" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>

              {/* Row 4: Tags */}
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  freeSolo
                  options={[]}
                  value={formData.tags || []}
                  onChange={(event, newValue) => {
                    setFormData((prev) => ({ ...prev, tags: newValue }));
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(33, 150, 243, 0.1)",
                          borderColor: "#90CAF9",
                          color: "#90CAF9",
                        }}
                        {...getTagProps({ index })}
                        key={index}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags"
                      placeholder="React, JavaScript, Web Development..."
                      helperText="Press Enter to add tags"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#64B5F6" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                        "& .MuiFormHelperText-root": {
                          color: "rgba(255,255,255,0.6)",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ p: 3, borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Button
            onClick={handleCloseDialog}
            sx={{ color: "rgba(255,255,255,0.7)" }}
            startIcon={<Close />}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!formData.title || !formData.excerpt}
            startIcon={<Save />}
            sx={{
              backgroundColor: "#64B5F6",
              color: "#1a1a1a",
              "&:hover": { backgroundColor: "#42A5F5" },
              "&:disabled": { backgroundColor: "rgba(100, 181, 246, 0.3)" },
            }}
          >
            {dialogMode === "add" ? "Add Post" : "Update Post"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        PaperProps={{
          sx: {
            bgcolor: "#1e1e1e",
            color: "#fff",
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ color: "#f44336" }}>
            Delete Blog Post
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{selectedPost?.title}</strong>?
          </Typography>
          <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.7)" }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleCloseDeleteDialog}
            sx={{ color: "rgba(255,255,255,0.7)" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeletePost}
            variant="contained"
            sx={{
              bgcolor: "#f44336",
              "&:hover": { bgcolor: "#d32f2f" },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BlogPosts;
