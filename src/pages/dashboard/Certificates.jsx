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
  LinearProgress,
} from "@mui/material";
import {
  Edit,
  Save,
  Cancel,
  Add,
  Close,
  CardMembership,
  School,
  Verified,
  CloudDownload,
  OpenInNew,
  CalendarMonth,
  Schedule,
  Star,
  Business,
  Computer,
  Security,
  Language,
  Analytics,
  AccessTime,
  Campaign,
  Badge,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Certificates = () => {
  const { dashboardData, handleEdit } = useOutletContext();
  const data = dashboardData?.certificates;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    // Technical Certificates
    technicalCertificates: data?.technicalCertificates || [
      {
        id: 1,
        title: "AWS Solutions Architect - Associate",
        provider: "Amazon Web Services",
        category: "Cloud Computing",
        issueDate: "2023-08-15",
        expiryDate: "2026-08-15",
        credentialId: "AWS-SAA-2023-081501",
        verificationUrl:
          "https://aws.amazon.com/verification/AWS-SAA-2023-081501",
        description:
          "Validates technical expertise in designing distributed systems on AWS. Covers compute, networking, storage, and database AWS services for designing and deploying scalable, highly available, and fault-tolerant systems.",
        skills: [
          "AWS EC2",
          "S3",
          "RDS",
          "VPC",
          "Lambda",
          "CloudFormation",
          "IAM",
          "Route 53",
        ],
        difficulty: "Associate",
        studyHours: 120,
        examScore: 856,
        maxScore: 1000,
        status: "Active",
        certificateUrl: "/certificates/aws_solutions_architect_associate.pdf",
        badgeUrl: "/badges/aws_saa_badge.png",
        renewalRequired: true,
      },
      {
        id: 2,
        title: "Google Cloud Professional Cloud Developer",
        provider: "Google Cloud",
        category: "Cloud Computing",
        issueDate: "2023-06-10",
        expiryDate: "2025-06-10",
        credentialId: "GCP-PCD-2023-061001",
        verificationUrl:
          "https://cloud.google.com/certification/cloud-developer",
        description:
          "Demonstrates ability to build scalable and highly available applications using Google Cloud Platform. Covers application development, deployment, monitoring, and maintenance on GCP.",
        skills: [
          "Google Cloud Platform",
          "App Engine",
          "Kubernetes Engine",
          "Cloud Storage",
          "BigQuery",
          "Cloud Functions",
          "Pub/Sub",
        ],
        difficulty: "Professional",
        studyHours: 150,
        examScore: 82,
        maxScore: 100,
        status: "Active",
        certificateUrl: "/certificates/gcp_cloud_developer.pdf",
        badgeUrl: "/badges/gcp_developer_badge.png",
        renewalRequired: true,
      },
      {
        id: 3,
        title: "Certified Kubernetes Administrator (CKA)",
        provider: "Cloud Native Computing Foundation",
        category: "DevOps",
        issueDate: "2023-04-20",
        expiryDate: "2026-04-20",
        credentialId: "CKA-2304-20-001",
        verificationUrl:
          "https://training.linuxfoundation.org/certification/verify/",
        description:
          "Performance-based certification that validates skills in Kubernetes administration. Covers cluster architecture, workloads & scheduling, services & networking, storage, and troubleshooting.",
        skills: [
          "Kubernetes",
          "Docker",
          "Container Orchestration",
          "YAML",
          "kubectl",
          "etcd",
          "Networking",
          "Storage",
        ],
        difficulty: "Professional",
        studyHours: 180,
        examScore: 89,
        maxScore: 100,
        status: "Active",
        certificateUrl: "/certificates/cka_certificate.pdf",
        badgeUrl: "/badges/cka_badge.png",
        renewalRequired: true,
      },
      {
        id: 4,
        title: "Docker Certified Associate",
        provider: "Docker Inc.",
        category: "Containerization",
        issueDate: "2023-02-15",
        expiryDate: "2025-02-15",
        credentialId: "DCA-2023-021501",
        verificationUrl: "https://docker.com/certification/dca",
        description:
          "Validates skills in Docker containerization technology. Covers container lifecycle management, image creation, networking, security, and Docker Swarm orchestration.",
        skills: [
          "Docker",
          "Containerization",
          "Docker Compose",
          "Docker Swarm",
          "Container Security",
          "Image Management",
        ],
        difficulty: "Associate",
        studyHours: 80,
        examScore: 78,
        maxScore: 100,
        status: "Active",
        certificateUrl: "/certificates/docker_certified_associate.pdf",
        badgeUrl: "/badges/docker_dca_badge.png",
        renewalRequired: true,
      },
    ],

    // Professional Certificates
    professionalCertificates: data?.professionalCertificates || [
      {
        id: 5,
        title: "Project Management Professional (PMP)",
        provider: "Project Management Institute",
        category: "Project Management",
        issueDate: "2022-11-30",
        expiryDate: "2025-11-30",
        credentialId: "PMP-2022-113001",
        verificationUrl: "https://ccrs.pmi.org/",
        description:
          "Globally recognized certification for project management professionals. Validates ability to lead and direct projects and teams. Covers project initiation, planning, execution, monitoring, and closing.",
        skills: [
          "Project Management",
          "Agile Methodologies",
          "Risk Management",
          "Stakeholder Management",
          "Quality Management",
          "Leadership",
        ],
        difficulty: "Professional",
        studyHours: 200,
        examScore: 78,
        maxScore: 100,
        status: "Active",
        certificateUrl: "/certificates/pmp_certificate.pdf",
        badgeUrl: "/badges/pmp_badge.png",
        renewalRequired: true,
        pduRequired: 60,
      },
      {
        id: 6,
        title: "Certified ScrumMaster (CSM)",
        provider: "Scrum Alliance",
        category: "Agile Methodology",
        issueDate: "2022-09-12",
        expiryDate: "2024-09-12",
        credentialId: "CSM-2022-091201",
        verificationUrl: "https://scrumalliance.org/community/profile/csm",
        description:
          "Validates knowledge of Scrum framework and ability to implement Scrum practices. Covers Scrum theory, practices, rules, and the role of ScrumMaster in facilitating the process.",
        skills: [
          "Scrum Framework",
          "Agile Practices",
          "Team Facilitation",
          "Sprint Planning",
          "Retrospectives",
          "Product Backlog Management",
        ],
        difficulty: "Intermediate",
        studyHours: 40,
        status: "Active",
        certificateUrl: "/certificates/csm_certificate.pdf",
        badgeUrl: "/badges/csm_badge.png",
        renewalRequired: true,
        renewalCredits: 20,
      },
    ],

    // Educational Certificates
    educationalCertificates: data?.educationalCertificates || [
      {
        id: 7,
        title: "Machine Learning Specialization",
        provider: "Stanford University (Coursera)",
        category: "Machine Learning",
        issueDate: "2023-01-25",
        expiryDate: null,
        credentialId: "ML-SPEC-2023-012501",
        verificationUrl:
          "https://coursera.org/verify/specialization/ML-SPEC-2023-012501",
        description:
          "Comprehensive specialization covering machine learning algorithms, deep learning, and practical implementation. Includes supervised learning, unsupervised learning, and reinforcement learning concepts.",
        skills: [
          "Machine Learning",
          "Python",
          "TensorFlow",
          "Neural Networks",
          "Deep Learning",
          "Data Analysis",
          "Statistical Modeling",
        ],
        difficulty: "Advanced",
        studyHours: 180,
        grade: "95%",
        status: "Completed",
        certificateUrl: "/certificates/ml_specialization_stanford.pdf",
        badgeUrl: "/badges/stanford_ml_badge.png",
        renewalRequired: false,
        coursesCompleted: 5,
      },
      {
        id: 8,
        title: "Full Stack Web Development",
        provider: "freeCodeCamp",
        category: "Web Development",
        issueDate: "2022-07-18",
        expiryDate: null,
        credentialId: "FSWD-2022-071801",
        verificationUrl:
          "https://freecodecamp.org/certification/fswd-2022-071801",
        description:
          "Comprehensive certification covering front-end and back-end web development. Includes responsive web design, JavaScript algorithms, front-end libraries, data visualization, and APIs.",
        skills: [
          "HTML",
          "CSS",
          "JavaScript",
          "React",
          "Node.js",
          "Express",
          "MongoDB",
          "Responsive Design",
          "APIs",
        ],
        difficulty: "Intermediate",
        studyHours: 300,
        projectsCompleted: 15,
        status: "Completed",
        certificateUrl: "/certificates/freecodecamp_fullstack.pdf",
        badgeUrl: "/badges/freecodecamp_badge.png",
        renewalRequired: false,
      },
      {
        id: 9,
        title: "Data Science Professional Certificate",
        provider: "IBM (edX)",
        category: "Data Science",
        issueDate: "2022-12-05",
        expiryDate: null,
        credentialId: "DS-IBM-2022-120501",
        verificationUrl: "https://edx.org/certificate/DS-IBM-2022-120501",
        description:
          "Professional certificate program covering data science methodology, tools, and techniques. Includes Python programming, data analysis, machine learning, and data visualization.",
        skills: [
          "Python",
          "Pandas",
          "NumPy",
          "Matplotlib",
          "Scikit-learn",
          "SQL",
          "Data Visualization",
          "Statistical Analysis",
        ],
        difficulty: "Intermediate",
        studyHours: 240,
        grade: "88%",
        capstoneProject: "Healthcare Data Analysis Dashboard",
        status: "Completed",
        certificateUrl: "/certificates/ibm_data_science.pdf",
        badgeUrl: "/badges/ibm_ds_badge.png",
        renewalRequired: false,
      },
    ],

    // Security Certificates
    securityCertificates: data?.securityCertificates || [
      {
        id: 10,
        title: "CompTIA Security+",
        provider: "CompTIA",
        category: "Cybersecurity",
        issueDate: "2023-03-10",
        expiryDate: "2026-03-10",
        credentialId: "SEC-2023-031001",
        verificationUrl: "https://comptia.org/certifications/security",
        description:
          "Entry-level cybersecurity certification covering network security, compliance, operational security, threats and vulnerabilities, application security, and cryptography.",
        skills: [
          "Network Security",
          "Risk Management",
          "Cryptography",
          "Identity Management",
          "Security Architecture",
          "Incident Response",
        ],
        difficulty: "Entry Level",
        studyHours: 100,
        examScore: 785,
        maxScore: 900,
        status: "Active",
        certificateUrl: "/certificates/comptia_security_plus.pdf",
        badgeUrl: "/badges/comptia_security_badge.png",
        renewalRequired: true,
        ceuRequired: 50,
      },
    ],

    // Language Certificates
    languageCertificates: data?.languageCertificates || [
      {
        id: 11,
        title: "IELTS Academic",
        provider: "British Council",
        category: "English Language",
        issueDate: "2022-05-20",
        expiryDate: "2024-05-20",
        credentialId: "IELTS-2022-052001",
        verificationUrl: "https://ielts.org/check-results",
        description:
          "International English Language Testing System for academic purposes. Assesses English language proficiency across listening, reading, writing, and speaking skills.",
        skills: [
          "English Proficiency",
          "Academic Writing",
          "Listening Comprehension",
          "Speaking Fluency",
          "Reading Comprehension",
        ],
        difficulty: "Proficient",
        overallScore: 8.5,
        maxScore: 9.0,
        bandScores: {
          listening: 8.5,
          reading: 8.0,
          writing: 8.0,
          speaking: 9.0,
        },
        status: "Active",
        certificateUrl: "/certificates/ielts_academic.pdf",
        renewalRequired: true,
      },
    ],

    // Certificates Statistics
    certificateStats: data?.certificateStats || {
      totalCertificates: 11,
      activeCertificates: 9,
      expiredCertificates: 0,
      pendingRenewal: 2,
      technicalCerts: 4,
      professionalCerts: 2,
      educationalCerts: 3,
      securityCerts: 1,
      languageCerts: 1,
      totalStudyHours: 1493,
      averageScore: 83.2,
      renewalsThisYear: 3,
    },

    // Certificate Categories
    certificateCategories: data?.certificateCategories || [
      "Cloud Computing",
      "DevOps",
      "Containerization",
      "Project Management",
      "Agile Methodology",
      "Machine Learning",
      "Web Development",
      "Data Science",
      "Cybersecurity",
      "English Language",
      "Software Development",
      "Database Management",
    ],
  });

  const [saveAlert, setSaveAlert] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  const handleSave = () => {
    if (handleEdit) {
      handleEdit("certificates", editedData);
    }
    setIsEditing(false);
    setSaveAlert({
      type: "success",
      message: "Certificates section updated successfully!",
    });
    setTimeout(() => setSaveAlert(null), 3000);
  };

  const handleCancel = () => {
    setEditedData({
      technicalCertificates: data?.technicalCertificates || [],
      professionalCertificates: data?.professionalCertificates || [],
      educationalCertificates: data?.educationalCertificates || [],
      securityCertificates: data?.securityCertificates || [],
      languageCertificates: data?.languageCertificates || [],
      certificateStats: data?.certificateStats || {},
      certificateCategories: data?.certificateCategories || [],
    });
    setIsEditing(false);
  };

  const addCategory = () => {
    if (newCategory.trim() && editedData.certificateCategories.length < 15) {
      setEditedData((prev) => ({
        ...prev,
        certificateCategories: [
          ...prev.certificateCategories,
          newCategory.trim(),
        ],
      }));
      setNewCategory("");
    }
  };

  const removeCategory = (index) => {
    setEditedData((prev) => ({
      ...prev,
      certificateCategories: prev.certificateCategories.filter(
        (_, i) => i !== index
      ),
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

  // Reusable Certificate Card Component
  const CertificateCard = ({
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
            borderColor: "#2196F3",
            transition: "border-color 0.3s ease",
          },
        }),
      }}
    >
      {(icon || title || description) && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          {icon &&
            React.cloneElement(icon, {
              sx: { color: "#2196F3", mr: 2, fontSize: 28 },
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

  // Get certificate status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "#4CAF50";
      case "Expired":
        return "#F44336";
      case "Pending":
        return "#FF9800";
      case "Completed":
        return "#2196F3";
      default:
        return "#888";
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Entry Level":
        return "#4CAF50";
      case "Intermediate":
        return "#FF9800";
      case "Associate":
        return "#2196F3";
      case "Advanced":
        return "#E91E63";
      case "Professional":
        return "#9C27B0";
      case "Expert":
        return "#F44336";
      default:
        return "#888";
    }
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      "Cloud Computing": "#FF9800",
      DevOps: "#4CAF50",
      Containerization: "#2196F3",
      "Project Management": "#9C27B0",
      "Agile Methodology": "#00BCD4",
      "Machine Learning": "#E91E63",
      "Web Development": "#FFC107",
      "Data Science": "#795548",
      Cybersecurity: "#F44336",
      "English Language": "#607D8B",
    };
    return colors[category] || "#888";
  };

  // Check if certificate is expiring soon (within 3 months)
  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const threeMonthsFromNow = new Date(
      today.getFullYear(),
      today.getMonth() + 3,
      today.getDate()
    );
    return expiry <= threeMonthsFromNow;
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
          Certificates Section
        </Typography>
        <Typography variant="body1" sx={{ color: "#888" }}>
          Professional certifications, training completions, and credentials
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
        <CertificateCard hover={false}>
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
                Certificates Management
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Professional certifications, technical credentials, and
                educational achievements
              </Typography>
            </Box>

            {!isEditing ? (
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setIsEditing(true)}
                sx={{
                  borderColor: "#2196F3",
                  color: "#2196F3",
                  borderWidth: 2,
                  borderRadius: 2,
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#42A5F5",
                    backgroundColor: "rgba(33, 150, 243, 0.1)",
                    borderWidth: 2,
                  },
                }}
              >
                Edit Certificates
              </Button>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  sx={{
                    backgroundColor: "#2196F3",
                    borderRadius: 2,
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#1976D2" },
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
        </CertificateCard>
      </motion.div>

      {/* Certificate Statistics Overview */}
      <motion.div variants={itemVariants}>
        <CertificateCard
          icon={<Analytics />}
          title="Certificate Metrics"
          description="Professional certification portfolio statistics"
        >
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#2196F3", fontWeight: 700 }}
                >
                  {editedData.certificateStats.totalCertificates}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Total Certificates
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#4CAF50", fontWeight: 700 }}
                >
                  {editedData.certificateStats.activeCertificates}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Active
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#FF9800", fontWeight: 700 }}
                >
                  {editedData.certificateStats.pendingRenewal}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Pending Renewal
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#9C27B0", fontWeight: 700 }}
                >
                  {editedData.certificateStats.averageScore}%
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Avg Score
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
                  {editedData.certificateStats.technicalCerts}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Technical Certs
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#00BCD4", fontWeight: 600 }}
                >
                  {editedData.certificateStats.educationalCerts}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Educational Certs
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#795548", fontWeight: 600 }}
                >
                  {(editedData.certificateStats.totalStudyHours / 1000).toFixed(
                    1
                  )}
                  K
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Study Hours
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#FFC107", fontWeight: 600 }}
                >
                  {editedData.certificateStats.renewalsThisYear}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Renewals This Year
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CertificateCard>
      </motion.div>

      {/* Technical Certificates */}
      <motion.div variants={itemVariants}>
        <CertificateCard
          icon={<Computer />}
          title="Technical Certificates"
          description="Cloud computing, DevOps, and technical skill certifications"
        >
          {editedData.technicalCertificates.map((cert, index) => (
            <Box
              key={cert.id}
              sx={{
                mb: 4,
                p: 3,
                backgroundColor: "rgba(33, 150, 243, 0.05)",
                border: "1px solid rgba(33, 150, 243, 0.2)",
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
                }}
              >
                {isExpiringSoon(cert.expiryDate) && (
                  <Chip
                    icon={<AccessTime />}
                    label="Expiring Soon"
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255, 152, 0, 0.2)",
                      color: "#FF9800",
                      fontWeight: 600,
                    }}
                  />
                )}
                <Verified sx={{ color: "#4CAF50", fontSize: 24 }} />
              </Box>

              <Typography
                variant="h6"
                sx={{ color: "#fff", fontWeight: 600, mb: 1, pr: 10 }}
              >
                {cert.title}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ color: "#2196F3", fontWeight: 500, mb: 2 }}
              >
                {cert.provider}
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
                  label={cert.category}
                  size="small"
                  sx={{
                    backgroundColor: `${getCategoryColor(cert.category)}20`,
                    color: getCategoryColor(cert.category),
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={cert.difficulty}
                  size="small"
                  sx={{
                    backgroundColor: `${getDifficultyColor(cert.difficulty)}20`,
                    color: getDifficultyColor(cert.difficulty),
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={cert.status}
                  size="small"
                  sx={{
                    backgroundColor: `${getStatusColor(cert.status)}20`,
                    color: getStatusColor(cert.status),
                    fontWeight: 600,
                  }}
                />
              </Box>

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
                    Issued: {cert.issueDate}
                  </Typography>
                </Box>
                {cert.expiryDate && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Schedule sx={{ color: "#888", mr: 1, fontSize: 16 }} />
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      Expires: {cert.expiryDate}
                    </Typography>
                  </Box>
                )}
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {cert.description}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#2196F3", mb: 1, fontWeight: 600 }}
                >
                  Skills Covered
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {cert.skills.map((skill, idx) => (
                    <Chip
                      key={idx}
                      label={skill}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(76, 175, 80, 0.2)",
                        color: "#4CAF50",
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {cert.examScore && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#2196F3", mb: 1, fontWeight: 600 }}
                  >
                    Exam Performance
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="body2" sx={{ color: "#fff" }}>
                      Score: {cert.examScore}
                      {cert.maxScore ? `/${cert.maxScore}` : "%"}
                    </Typography>
                    {cert.maxScore && (
                      <LinearProgress
                        variant="determinate"
                        value={(cert.examScore / cert.maxScore) * 100}
                        sx={{
                          width: 100,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#4CAF50",
                            borderRadius: 4,
                          },
                        }}
                      />
                    )}
                  </Box>
                </Box>
              )}

              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip
                  icon={<CloudDownload />}
                  label="Certificate"
                  component={Link}
                  href={cert.certificateUrl}
                  target="_blank"
                  clickable
                  sx={{
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                    color: "#4CAF50",
                    fontWeight: 600,
                  }}
                />
                <Chip
                  icon={<OpenInNew />}
                  label="Verify"
                  component={Link}
                  href={cert.verificationUrl}
                  target="_blank"
                  clickable
                  sx={{
                    backgroundColor: "rgba(33, 150, 243, 0.2)",
                    color: "#2196F3",
                    fontWeight: 600,
                  }}
                />
                {cert.studyHours && (
                  <Chip
                    icon={<Schedule />}
                    label={`${cert.studyHours}h study`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(156, 39, 176, 0.2)",
                      color: "#9C27B0",
                      fontWeight: 500,
                    }}
                  />
                )}
              </Box>
            </Box>
          ))}
        </CertificateCard>
      </motion.div>

      {/* Professional Certificates */}
      <motion.div variants={itemVariants}>
        <CertificateCard
          icon={<Business />}
          title="Professional Certificates"
          description="Project management and professional development certifications"
        >
          {editedData.professionalCertificates.map((cert, index) => (
            <Box
              key={cert.id}
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
                <CardMembership sx={{ color: "#9C27B0", fontSize: 24 }} />
              </Box>

              <Typography
                variant="h6"
                sx={{ color: "#fff", fontWeight: 600, mb: 1, pr: 5 }}
              >
                {cert.title}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ color: "#9C27B0", fontWeight: 500, mb: 2 }}
              >
                {cert.provider}
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
                  label={cert.category}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(156, 39, 176, 0.2)",
                    color: "#9C27B0",
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={cert.status}
                  size="small"
                  sx={{
                    backgroundColor: `${getStatusColor(cert.status)}20`,
                    color: getStatusColor(cert.status),
                    fontWeight: 600,
                  }}
                />
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {cert.description}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {cert.skills.map((skill, idx) => (
                    <Chip
                      key={idx}
                      label={skill}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(156, 39, 176, 0.2)",
                        color: "#9C27B0",
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              </Box>

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
                  {cert.issueDate} - {cert.expiryDate}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  {cert.studyHours}h preparation
                </Typography>
              </Box>

              {cert.pduRequired && (
                <Typography
                  variant="body2"
                  sx={{ color: "#FF9800", fontWeight: 600, mb: 2 }}
                >
                  📚 {cert.pduRequired} PDUs required for renewal
                </Typography>
              )}
            </Box>
          ))}
        </CertificateCard>
      </motion.div>

      {/* Educational Certificates */}
      <motion.div variants={itemVariants}>
        <CertificateCard
          icon={<School />}
          title="Educational Certificates"
          description="Online courses, specializations, and educational achievements"
        >
          {editedData.educationalCertificates.map((cert, index) => (
            <Box
              key={cert.id}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "rgba(255, 193, 7, 0.05)",
                border: "1px solid rgba(255, 193, 7, 0.2)",
                borderRadius: 3,
                position: "relative",
              }}
            >
              <Box sx={{ position: "absolute", top: 15, right: 15 }}>
                <Badge sx={{ color: "#FFC107", fontSize: 24 }} />
              </Box>

              <Typography
                variant="h6"
                sx={{ color: "#fff", fontWeight: 600, mb: 1, pr: 5 }}
              >
                {cert.title}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ color: "#FFC107", fontWeight: 500, mb: 2 }}
              >
                {cert.provider}
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
                  label={cert.category}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255, 193, 7, 0.2)",
                    color: "#FFC107",
                    fontWeight: 600,
                  }}
                />
                {cert.grade && (
                  <Chip
                    icon={<Star />}
                    label={`Grade: ${cert.grade}`}
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
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {cert.description}
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {cert.skills.map((skill, idx) => (
                  <Chip
                    key={idx}
                    label={skill}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(33, 150, 243, 0.2)",
                      color: "#2196F3",
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Completed: {cert.issueDate}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  {cert.studyHours}h coursework
                </Typography>
                {cert.projectsCompleted && (
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {cert.projectsCompleted} projects
                  </Typography>
                )}
                {cert.coursesCompleted && (
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {cert.coursesCompleted} courses
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </CertificateCard>
      </motion.div>

      {/* Security Certificates */}
      <motion.div variants={itemVariants}>
        <CertificateCard
          icon={<Security />}
          title="Security Certificates"
          description="Cybersecurity and information security certifications"
        >
          {editedData.securityCertificates.map((cert, index) => (
            <Box
              key={cert.id}
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
                <Security sx={{ color: "#F44336", fontSize: 24 }} />
              </Box>

              <Typography
                variant="h6"
                sx={{ color: "#fff", fontWeight: 600, mb: 1, pr: 5 }}
              >
                {cert.title}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ color: "#F44336", fontWeight: 500, mb: 2 }}
              >
                {cert.provider}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {cert.description}
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {cert.skills.map((skill, idx) => (
                  <Chip
                    key={idx}
                    label={skill}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(244, 67, 54, 0.2)",
                      color: "#F44336",
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Score: {cert.examScore}/{cert.maxScore}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Valid: {cert.issueDate} - {cert.expiryDate}
                </Typography>
              </Box>
            </Box>
          ))}
        </CertificateCard>
      </motion.div>

      {/* Language Certificates */}
      <motion.div variants={itemVariants}>
        <CertificateCard
          icon={<Language />}
          title="Language Certificates"
          description="Language proficiency and communication certifications"
        >
          {editedData.languageCertificates.map((cert, index) => (
            <Box
              key={cert.id}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "rgba(96, 125, 139, 0.05)",
                border: "1px solid rgba(96, 125, 139, 0.2)",
                borderRadius: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#fff", fontWeight: 600, mb: 1 }}
              >
                {cert.title}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ color: "#607D8B", fontWeight: 500, mb: 2 }}
              >
                {cert.provider}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {cert.description}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#607D8B", mb: 1, fontWeight: 600 }}
                >
                  Overall Score: {cert.overallScore}/{cert.maxScore}
                </Typography>
                {cert.bandScores && (
                  <Grid container spacing={2}>
                    {Object.entries(cert.bandScores).map(
                      ([skill, score], idx) => (
                        <Grid item xs={3} key={idx}>
                          <Typography
                            variant="body2"
                            sx={{ color: "#fff", fontWeight: 600 }}
                          >
                            {score}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#888" }}>
                            {skill.charAt(0).toUpperCase() + skill.slice(1)}
                          </Typography>
                        </Grid>
                      )
                    )}
                  </Grid>
                )}
              </Box>

              <Typography variant="body2" sx={{ color: "#888" }}>
                Valid: {cert.issueDate} - {cert.expiryDate}
              </Typography>
            </Box>
          ))}
        </CertificateCard>
      </motion.div>

      {/* Certificate Categories */}
      <motion.div variants={itemVariants}>
        <CertificateCard
          icon={<Campaign />}
          title="Certificate Categories"
          description="Professional certification areas and specializations"
        >
          <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
            Max 15 certificate categories
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {editedData.certificateCategories.map((category, index) => (
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

          {isEditing && editedData.certificateCategories.length < 15 && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Add new certificate category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addCategory()}
                sx={{
                  flexGrow: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(15, 15, 15, 0.6)",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#444" },
                    "&:hover fieldset": { borderColor: "#2196F3" },
                    "&.Mui-focused fieldset": { borderColor: "#2196F3" },
                  },
                  "& .MuiInputBase-input": { color: "#fff" },
                }}
              />
              <IconButton
                onClick={addCategory}
                disabled={!newCategory.trim()}
                sx={{
                  backgroundColor: "#2196F3",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#1976D2" },
                  "&:disabled": { backgroundColor: "#333", color: "#666" },
                }}
              >
                <Add />
              </IconButton>
            </Box>
          )}
        </CertificateCard>
      </motion.div>
    </motion.div>
  );
};

export default Certificates;
