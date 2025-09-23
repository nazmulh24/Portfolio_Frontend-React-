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
  School,
  Science,
  Star,
  FormatQuote,
  TrendingUp,
  Analytics,
  Download,
  OpenInNew,
  Share,
  Assessment,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Publications = () => {
  const { dashboardData, handleEdit } = useOutletContext();
  const data = dashboardData?.publications;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    // Journal Publications
    journalPublications: data?.journalPublications || [
      {
        id: 1,
        title:
          "Machine Learning Approaches for Early Disease Detection in Healthcare Systems",
        authors: ["Nazmul Hossain", "Dr. Sarah Johnson", "Dr. Michael Chen"],
        journal: "Journal of Medical Informatics",
        volume: "45",
        issue: "3",
        pages: "234-248",
        year: "2023",
        doi: "10.1016/j.jmi.2023.456789",
        pmid: "37891234",
        impact_factor: 4.7,
        quartile: "Q1",
        citations: 23,
        abstract:
          "This study presents novel machine learning approaches for early disease detection in healthcare systems. We developed and evaluated three different algorithms (Random Forest, SVM, and Neural Networks) on a dataset of 10,000 patient records. Our results show that the proposed ensemble method achieves 94.2% accuracy in early detection of cardiovascular diseases, significantly outperforming existing approaches.",
        keywords: [
          "Machine Learning",
          "Healthcare",
          "Disease Detection",
          "Medical Informatics",
          "Predictive Analytics",
        ],
        status: "Published",
        openAccess: true,
        pdfUrl: "/publications/hossain_2023_ml_healthcare.pdf",
        supplementaryUrl: "/publications/hossain_2023_supplementary.zip",
        citationCount: 23,
        downloadCount: 487,
        category: "Research Article",
        fundingSource: "National Science Foundation Grant #NSF-2023-1234",
      },
      {
        id: 2,
        title:
          "Scalable Web Applications: A Comparative Study of Django and Node.js Performance",
        authors: ["Nazmul Hossain", "Dr. Ahmed Rahman"],
        journal: "International Journal of Web Technologies",
        volume: "12",
        issue: "2",
        pages: "89-105",
        year: "2023",
        doi: "10.1007/s11280-023-01234",
        impact_factor: 3.2,
        quartile: "Q2",
        citations: 15,
        abstract:
          "This paper presents a comprehensive performance comparison between Django and Node.js frameworks for building scalable web applications. Through extensive benchmarking using realistic workloads, we analyze response time, throughput, memory usage, and CPU utilization. Our findings provide practical guidelines for framework selection based on application requirements.",
        keywords: [
          "Web Development",
          "Django",
          "Node.js",
          "Performance",
          "Scalability",
          "Benchmarking",
        ],
        status: "Published",
        openAccess: false,
        pdfUrl: "/publications/hossain_2023_web_frameworks.pdf",
        citationCount: 15,
        downloadCount: 298,
        category: "Research Article",
        fundingSource: "University Research Grant",
      },
    ],

    // Conference Publications
    conferencePublications: data?.conferencePublications || [
      {
        id: 3,
        title:
          "Real-time Data Processing with Apache Kafka and Django Channels",
        authors: ["Nazmul Hossain", "Dr. Lisa Wang"],
        conference: "International Conference on Software Engineering (ICSE)",
        location: "San Francisco, CA, USA",
        year: "2023",
        pages: "456-461",
        doi: "10.1109/ICSE.2023.789012",
        abstract:
          "This paper demonstrates a novel architecture for real-time data processing combining Apache Kafka with Django Channels. We present implementation details, performance benchmarks, and use cases for building responsive web applications that handle high-volume data streams.",
        keywords: [
          "Real-time Processing",
          "Apache Kafka",
          "Django Channels",
          "WebSockets",
          "Streaming Data",
        ],
        status: "Published",
        pdfUrl: "/publications/hossain_2023_realtime_kafka.pdf",
        presentationUrl: "/publications/hossain_2023_icse_slides.pdf",
        citationCount: 8,
        downloadCount: 156,
        category: "Conference Paper",
        acceptance_rate: "22%",
        ranking: "A*",
      },
      {
        id: 4,
        title:
          "Microservices Security Patterns: Implementation and Performance Analysis",
        authors: ["Nazmul Hossain", "Dr. Robert Kim", "Jane Smith"],
        conference: "IEEE International Conference on Cloud Computing",
        location: "Virtual Event",
        year: "2022",
        pages: "123-128",
        doi: "10.1109/CLOUD.2022.345678",
        abstract:
          "We propose and evaluate security patterns for microservices architectures, focusing on authentication, authorization, and data protection. Our implementation using Docker and Kubernetes demonstrates improved security with minimal performance overhead.",
        keywords: [
          "Microservices",
          "Security",
          "Cloud Computing",
          "Docker",
          "Kubernetes",
          "Authentication",
        ],
        status: "Published",
        pdfUrl: "/publications/hossain_2022_microservices_security.pdf",
        citationCount: 12,
        downloadCount: 234,
        category: "Conference Paper",
        acceptance_rate: "28%",
        ranking: "A",
      },
    ],

    // Book Chapters
    bookChapters: data?.bookChapters || [
      {
        id: 5,
        title: "Modern Web Development with Python and Django",
        authors: ["Nazmul Hossain"],
        book: "Advanced Python Programming Techniques",
        editor: "Dr. Michael Johnson",
        publisher: "Springer",
        year: "2023",
        pages: "245-278",
        isbn: "978-3-031-12345-6",
        doi: "10.1007/978-3-031-12345-6_12",
        abstract:
          "This chapter provides a comprehensive guide to modern web development using Python and Django framework. Topics covered include REST API design, database optimization, security best practices, and deployment strategies for production environments.",
        keywords: [
          "Python",
          "Django",
          "Web Development",
          "REST API",
          "Security",
        ],
        status: "Published",
        pdfUrl: "/publications/hossain_2023_django_chapter.pdf",
        category: "Book Chapter",
      },
    ],

    // Under Review
    underReview: data?.underReview || [
      {
        id: 6,
        title:
          "AI-Powered Code Review: Enhancing Software Quality Through Machine Learning",
        authors: ["Nazmul Hossain", "Dr. Emily Chen", "Dr. David Park"],
        journal: "IEEE Transactions on Software Engineering",
        submissionDate: "2023-08-15",
        expectedDecision: "2023-11-15",
        abstract:
          "This study introduces an AI-powered code review system that uses machine learning to identify potential bugs, security vulnerabilities, and code quality issues. We trained models on large-scale open-source repositories and achieved 87% accuracy in detecting critical issues.",
        keywords: [
          "Artificial Intelligence",
          "Code Review",
          "Software Quality",
          "Machine Learning",
          "Static Analysis",
        ],
        status: "Under Review",
        category: "Research Article",
        impact_factor: 6.2,
        quartile: "Q1",
      },
      {
        id: 7,
        title: "Blockchain-based Identity Management for Distributed Systems",
        authors: ["Nazmul Hossain", "Dr. Alex Thompson"],
        conference: "ACM Symposium on Applied Computing",
        submissionDate: "2023-09-01",
        expectedDecision: "2023-12-01",
        abstract:
          "We propose a novel blockchain-based identity management system for distributed applications. Our approach ensures privacy, security, and scalability while maintaining compatibility with existing authentication protocols.",
        keywords: [
          "Blockchain",
          "Identity Management",
          "Distributed Systems",
          "Security",
          "Privacy",
        ],
        status: "Under Review",
        category: "Conference Paper",
      },
    ],

    // Publications Statistics
    publicationStats: data?.publicationStats || {
      totalPublications: 7,
      journalArticles: 2,
      conferenceProceedings: 2,
      bookChapters: 1,
      underReview: 2,
      totalCitations: 58,
      hIndex: 4,
      i10Index: 2,
      totalDownloads: 1175,
      averageImpactFactor: 4.03,
      firstAuthorPapers: 5,
      collaborations: 8,
      openAccessPapers: 3,
    },

    // Research Metrics
    researchMetrics: data?.researchMetrics || {
      googleScholarProfile: "https://scholar.google.com/citations?user=xyz123",
      orcidId: "0000-0002-1234-5678",
      researchGateScore: 24.5,
      researchGateReads: 1456,
      scopusAuthorId: "57123456789",
      webOfScienceId: "ABC-1234-2023",
      publonsId: "3456789",
      academiaEduFollowers: 234,
    },

    // Research Areas
    researchAreas: data?.researchAreas || [
      "Machine Learning",
      "Web Development",
      "Healthcare Informatics",
      "Software Engineering",
      "Distributed Systems",
      "Data Science",
      "Cloud Computing",
      "Cybersecurity",
      "Artificial Intelligence",
      "Database Systems",
    ],

    // Journals Reviewed For
    reviewingExperience: data?.reviewingExperience || [
      {
        journal: "Journal of Medical Informatics",
        count: 5,
        since: "2022",
      },
      {
        journal: "International Journal of Web Technologies",
        count: 3,
        since: "2023",
      },
      {
        journal: "IEEE Computer Society",
        count: 2,
        since: "2023",
      },
    ],
  });

  const [saveAlert, setSaveAlert] = useState(null);
  const [newResearchArea, setNewResearchArea] = useState("");

  const handleSave = () => {
    if (handleEdit) {
      handleEdit("publications", editedData);
    }
    setIsEditing(false);
    setSaveAlert({
      type: "success",
      message: "Publications section updated successfully!",
    });
    setTimeout(() => setSaveAlert(null), 3000);
  };

  const handleCancel = () => {
    setEditedData({
      journalPublications: data?.journalPublications || [],
      conferencePublications: data?.conferencePublications || [],
      bookChapters: data?.bookChapters || [],
      underReview: data?.underReview || [],
      publicationStats: data?.publicationStats || {},
      researchMetrics: data?.researchMetrics || {},
      researchAreas: data?.researchAreas || [],
      reviewingExperience: data?.reviewingExperience || [],
    });
    setIsEditing(false);
  };

  const addResearchArea = () => {
    if (newResearchArea.trim() && editedData.researchAreas.length < 15) {
      setEditedData((prev) => ({
        ...prev,
        researchAreas: [...prev.researchAreas, newResearchArea.trim()],
      }));
      setNewResearchArea("");
    }
  };

  const removeResearchArea = (index) => {
    setEditedData((prev) => ({
      ...prev,
      researchAreas: prev.researchAreas.filter((_, i) => i !== index),
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

  // Reusable Publication Card Component
  const PublicationCard = ({
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
          Publications Section
        </Typography>
        <Typography variant="body1" sx={{ color: "#888" }}>
          Academic publications, research metrics, and scholarly achievements
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
        <PublicationCard hover={false}>
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
                Publications Management
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Academic publications, research metrics, and scholarly impact
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
                Edit Publications
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
        </PublicationCard>
      </motion.div>

      {/* Publication Statistics Overview */}
      <motion.div variants={itemVariants}>
        <PublicationCard
          icon={<Analytics />}
          title="Publication Metrics"
          description="Research impact and publication statistics"
        >
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#4CAF50", fontWeight: 700 }}
                >
                  {editedData.publicationStats.totalPublications}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Total Publications
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#2196F3", fontWeight: 700 }}
                >
                  {editedData.publicationStats.totalCitations}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Total Citations
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#FF9800", fontWeight: 700 }}
                >
                  {editedData.publicationStats.hIndex}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  H-Index
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#9C27B0", fontWeight: 700 }}
                >
                  {editedData.publicationStats.averageImpactFactor.toFixed(1)}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Avg. Impact Factor
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
                  {editedData.publicationStats.i10Index}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  i10-Index
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#00BCD4", fontWeight: 600 }}
                >
                  {editedData.publicationStats.totalDownloads.toLocaleString()}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Downloads
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#FFC107", fontWeight: 600 }}
                >
                  {editedData.publicationStats.firstAuthorPapers}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  First Author
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#795548", fontWeight: 600 }}
                >
                  {editedData.publicationStats.openAccessPapers}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Open Access
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </PublicationCard>
      </motion.div>

      {/* Journal Publications */}
      <motion.div variants={itemVariants}>
        <PublicationCard
          icon={<Article />}
          title="Journal Publications"
          description="Peer-reviewed journal articles and research papers"
        >
          {editedData.journalPublications.map((publication, index) => (
            <Box
              key={publication.id}
              sx={{
                mb: 4,
                p: 3,
                backgroundColor: "rgba(76, 175, 80, 0.05)",
                border: "1px solid rgba(76, 175, 80, 0.2)",
                borderRadius: 3,
                position: "relative",
              }}
            >
              {/* Publication Header */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#fff", fontWeight: 600, mb: 1, pr: 8 }}
                >
                  {publication.title}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#4CAF50", fontWeight: 500, mb: 1 }}
                >
                  {publication.journal}
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
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    Vol. {publication.volume}, Issue {publication.issue}, pp.{" "}
                    {publication.pages} ({publication.year})
                  </Typography>
                  {publication.impact_factor && (
                    <Chip
                      label={`IF: ${publication.impact_factor}`}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(255, 193, 7, 0.2)",
                        color: "#FFC107",
                        fontWeight: 600,
                      }}
                    />
                  )}
                  {publication.quartile && (
                    <Chip
                      label={publication.quartile}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(76, 175, 80, 0.2)",
                        color: "#4CAF50",
                        fontWeight: 600,
                      }}
                    />
                  )}
                  {publication.openAccess && (
                    <Chip
                      label="Open Access"
                      size="small"
                      sx={{
                        backgroundColor: "rgba(33, 150, 243, 0.2)",
                        color: "#2196F3",
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Box>
              </Box>

              {/* Authors */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#4CAF50", mb: 1, fontWeight: 600 }}
                >
                  Authors
                </Typography>
                <Typography variant="body2" sx={{ color: "#fff" }}>
                  {publication.authors.join(", ")}
                </Typography>
              </Box>

              {/* Abstract */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#4CAF50", mb: 1, fontWeight: 600 }}
                >
                  Abstract
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#fff", lineHeight: 1.6 }}
                >
                  {publication.abstract}
                </Typography>
              </Box>

              {/* Keywords */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#4CAF50", mb: 1, fontWeight: 600 }}
                >
                  Keywords
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {publication.keywords.map((keyword, idx) => (
                    <Chip
                      key={idx}
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

              {/* Metrics */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#4CAF50", mb: 2, fontWeight: 600 }}
                >
                  Publication Metrics
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
                      <FormatQuote
                        sx={{ color: "#FF9800", mr: 1, fontSize: 18 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", fontWeight: 600 }}
                      >
                        {publication.citations}
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
                      Citations
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
                      <Download
                        sx={{ color: "#2196F3", mr: 1, fontSize: 18 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", fontWeight: 600 }}
                      >
                        {publication.downloadCount}
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
                      Downloads
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
                      <Assessment
                        sx={{ color: "#9C27B0", mr: 1, fontSize: 18 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", fontWeight: 600 }}
                      >
                        {publication.impact_factor}
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
                      Impact Factor
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
                      <Star sx={{ color: "#FFC107", mr: 1, fontSize: 18 }} />
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", fontWeight: 600 }}
                      >
                        {publication.quartile}
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
                      Quartile
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Additional Info */}
              <Box sx={{ mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      <strong>DOI:</strong> {publication.doi}
                    </Typography>
                    {publication.pmid && (
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        <strong>PMID:</strong> {publication.pmid}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      <strong>Category:</strong> {publication.category}
                    </Typography>
                    {publication.fundingSource && (
                      <Typography
                        variant="body2"
                        sx={{ color: "#888", fontSize: "0.8rem" }}
                      >
                        <strong>Funding:</strong> {publication.fundingSource}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <Chip
                  icon={<OpenInNew />}
                  label="View Paper"
                  component={Link}
                  href={publication.pdfUrl}
                  target="_blank"
                  clickable
                  sx={{
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                    color: "#4CAF50",
                    "&:hover": { backgroundColor: "rgba(76, 175, 80, 0.3)" },
                  }}
                />
                <Chip
                  icon={<FormatQuote />}
                  label="Cite"
                  clickable
                  sx={{
                    backgroundColor: "rgba(33, 150, 243, 0.2)",
                    color: "#2196F3",
                    "&:hover": { backgroundColor: "rgba(33, 150, 243, 0.3)" },
                  }}
                />
                <Chip
                  icon={<Share />}
                  label="Share"
                  clickable
                  sx={{
                    backgroundColor: "rgba(255, 152, 0, 0.2)",
                    color: "#FF9800",
                    "&:hover": { backgroundColor: "rgba(255, 152, 0, 0.3)" },
                  }}
                />
                {publication.supplementaryUrl && (
                  <Chip
                    icon={<Download />}
                    label="Supplementary"
                    component={Link}
                    href={publication.supplementaryUrl}
                    target="_blank"
                    clickable
                    sx={{
                      backgroundColor: "rgba(156, 39, 176, 0.2)",
                      color: "#9C27B0",
                      "&:hover": { backgroundColor: "rgba(156, 39, 176, 0.3)" },
                    }}
                  />
                )}
              </Box>
            </Box>
          ))}
        </PublicationCard>
      </motion.div>

      {/* Conference Publications */}
      <motion.div variants={itemVariants}>
        <PublicationCard
          icon={<School />}
          title="Conference Publications"
          description="Peer-reviewed conference proceedings and presentations"
        >
          {editedData.conferencePublications.map((publication, index) => (
            <Box
              key={publication.id}
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
                {publication.title}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: "#2196F3", fontWeight: 500, mb: 1 }}
              >
                {publication.conference}
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
                  {publication.location}, {publication.year}
                </Typography>
                {publication.acceptance_rate && (
                  <Chip
                    label={`Acceptance: ${publication.acceptance_rate}`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255, 193, 7, 0.2)",
                      color: "#FFC107",
                      fontWeight: 600,
                    }}
                  />
                )}
                {publication.ranking && (
                  <Chip
                    label={`Rank: ${publication.ranking}`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(76, 175, 80, 0.2)",
                      color: "#4CAF50",
                      fontWeight: 600,
                    }}
                  />
                )}
              </Box>

              <Typography variant="body2" sx={{ color: "#fff", mb: 2 }}>
                <strong>Authors:</strong> {publication.authors.join(", ")}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {publication.abstract}
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {publication.keywords.map((keyword, idx) => (
                  <Chip
                    key={idx}
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

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <Chip
                  icon={<OpenInNew />}
                  label="View Paper"
                  component={Link}
                  href={publication.pdfUrl}
                  target="_blank"
                  clickable
                  sx={{
                    backgroundColor: "rgba(33, 150, 243, 0.2)",
                    color: "#2196F3",
                    "&:hover": { backgroundColor: "rgba(33, 150, 243, 0.3)" },
                  }}
                />
                {publication.presentationUrl && (
                  <Chip
                    icon={<Download />}
                    label="Presentation"
                    component={Link}
                    href={publication.presentationUrl}
                    target="_blank"
                    clickable
                    sx={{
                      backgroundColor: "rgba(255, 152, 0, 0.2)",
                      color: "#FF9800",
                      "&:hover": { backgroundColor: "rgba(255, 152, 0, 0.3)" },
                    }}
                  />
                )}
              </Box>
            </Box>
          ))}
        </PublicationCard>
      </motion.div>

      {/* Under Review */}
      <motion.div variants={itemVariants}>
        <PublicationCard
          icon={<Assessment />}
          title="Under Review"
          description="Manuscripts currently under peer review"
        >
          {editedData.underReview.map((publication, index) => (
            <Box
              key={publication.id}
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
                {publication.title}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: "#FF9800", fontWeight: 500, mb: 1 }}
              >
                {publication.journal || publication.conference}
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
                  Submitted: {publication.submissionDate}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Expected Decision: {publication.expectedDecision}
                </Typography>
                {publication.impact_factor && (
                  <Chip
                    label={`IF: ${publication.impact_factor}`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255, 193, 7, 0.2)",
                      color: "#FFC107",
                      fontWeight: 600,
                    }}
                  />
                )}
              </Box>

              <Typography variant="body2" sx={{ color: "#fff", mb: 2 }}>
                <strong>Authors:</strong> {publication.authors.join(", ")}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {publication.abstract}
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {publication.keywords.map((keyword, idx) => (
                  <Chip
                    key={idx}
                    label={keyword}
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
          ))}
        </PublicationCard>
      </motion.div>

      {/* Research Areas */}
      <motion.div variants={itemVariants}>
        <PublicationCard
          icon={<Science />}
          title="Research Areas"
          description="Primary research interests and expertise domains"
        >
          <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
            Max 15 research areas
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {editedData.researchAreas.map((area, index) => (
              <Chip
                key={index}
                label={area}
                onDelete={
                  isEditing ? () => removeResearchArea(index) : undefined
                }
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

          {isEditing && editedData.researchAreas.length < 15 && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Add new research area"
                value={newResearchArea}
                onChange={(e) => setNewResearchArea(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addResearchArea()}
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
                onClick={addResearchArea}
                disabled={!newResearchArea.trim()}
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
        </PublicationCard>
      </motion.div>

      {/* Research Metrics */}
      <motion.div variants={itemVariants}>
        <PublicationCard
          icon={<TrendingUp />}
          title="Research Profile & Metrics"
          description="Academic profiles and research impact indicators"
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle2"
                sx={{ color: "#4CAF50", mb: 2, fontWeight: 600 }}
              >
                Academic Profiles
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#fff" }}>
                    Google Scholar
                  </Typography>
                  <Chip
                    component={Link}
                    href={editedData.researchMetrics.googleScholarProfile}
                    target="_blank"
                    label="View Profile"
                    size="small"
                    sx={{
                      backgroundColor: "rgba(76, 175, 80, 0.2)",
                      color: "#4CAF50",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#fff" }}>
                    ORCID ID
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {editedData.researchMetrics.orcidId}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#fff" }}>
                    ResearchGate Score
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {editedData.researchMetrics.researchGateScore}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#fff" }}>
                    Scopus Author ID
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {editedData.researchMetrics.scopusAuthorId}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle2"
                sx={{ color: "#4CAF50", mb: 2, fontWeight: 600 }}
              >
                Reviewing Experience
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {editedData.reviewingExperience.map((review, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "#fff", fontSize: "0.85rem" }}
                    >
                      {review.journal}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      {review.count} reviews (since {review.since})
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </PublicationCard>
      </motion.div>
    </motion.div>
  );
};

export default Publications;
