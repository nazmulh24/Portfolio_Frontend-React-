import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

const BlogSection = () => {
  const blogPosts = [
    {
      title: "Understanding Machine Learning Fundamentals",
      excerpt:
        "A beginner-friendly exploration of machine learning concepts, from supervised learning to neural networks, with practical Python examples and real-world applications.",
      date: "2024-01-15",
      readTime: "8 min read",
      tags: ["Machine Learning", "Python", "AI"],
      slug: "understanding-machine-learning-fundamentals",
    },
    {
      title: "Data Structures & Algorithms in C++",
      excerpt:
        "Deep dive into essential data structures and algorithmic techniques for competitive programming and technical interviews, with optimized C++ implementations.",
      date: "2024-01-08",
      readTime: "12 min read",
      tags: ["C++", "Algorithms", "Problem Solving"],
      slug: "data-structures-algorithms-cpp",
    },
    {
      title: "Building REST APIs with Django",
      excerpt:
        "Complete guide to creating robust REST APIs using Django REST Framework, covering authentication, serialization, and best practices for scalable backend systems.",
      date: "2024-01-02",
      readTime: "10 min read",
      tags: ["Django", "Python", "Backend"],
      slug: "building-rest-apis-django",
    },
  ];

  const BlogCard = ({ post, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <Card
        sx={{
          backgroundColor: "#112240",
          color: "#ccd6f6",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-10px)",
            boxShadow: "0 20px 30px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ marginBottom: 2 }}>
            <Typography
              variant="caption"
              sx={{
                color: "#64ffda",
                fontFamily: "Monaco, monospace",
                fontSize: "0.875rem",
              }}
            >
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#8892b0",
                marginLeft: 2,
                fontSize: "0.875rem",
              }}
            >
              {post.readTime}
            </Typography>
          </Box>

          <Typography
            variant="h6"
            component="h3"
            sx={{
              color: "#ccd6f6",
              fontWeight: 600,
              marginBottom: 2,
              fontSize: "1.25rem",
              lineHeight: 1.3,
            }}
          >
            {post.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#8892b0",
              marginBottom: 3,
              flexGrow: 1,
              lineHeight: 1.6,
            }}
          >
            {post.excerpt}
          </Typography>

          <Box sx={{ marginBottom: 2 }}>
            {post.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  backgroundColor: "rgba(100, 255, 218, 0.1)",
                  color: "#64ffda",
                  fontSize: "0.75rem",
                  margin: "2px",
                  fontFamily: "Monaco, monospace",
                }}
              />
            ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              endIcon={<ArrowForwardIcon />}
              sx={{
                color: "#64ffda",
                textTransform: "none",
                fontSize: "0.875rem",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "rgba(100, 255, 218, 0.1)",
                },
              }}
            >
              Read More
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box
      id="blog"
      component="section"
      sx={{
        minHeight: "100vh",
        padding: { xs: "4rem 0", md: "6rem 0" },
        backgroundColor: "#0a192f",
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              color: "#ccd6f6",
              marginBottom: 4,
              display: "flex",
              alignItems: "center",
              "&::before": {
                content: '"03."',
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                color: "#64ffda",
                fontFamily: "Monaco, monospace",
                marginRight: 2,
              },
              "&::after": {
                content: '""',
                display: "block",
                width: "300px",
                height: "1px",
                backgroundColor: "#233554",
                marginLeft: 2,
              },
            }}
          >
            Latest Blog Posts
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid item xs={12} md={4} key={post.slug}>
              <BlogCard post={post} index={index} />
            </Grid>
          ))}
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: "center", marginTop: 6 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: "#64ffda",
                borderColor: "#64ffda",
                padding: "12px 24px",
                fontSize: "1rem",
                fontFamily: "Monaco, monospace",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(100, 255, 218, 0.1)",
                  borderColor: "#64ffda",
                },
              }}
            >
              View All Posts
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default BlogSection;
