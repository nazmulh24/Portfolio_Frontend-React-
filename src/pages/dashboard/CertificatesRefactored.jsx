import React from "react";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Chip,
  Link,
  Avatar,
  LinearProgress,
} from "@mui/material";
import {
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
  AccessTime,
  Badge,
} from "@mui/icons-material";
import { motion } from "framer-motion";

// Import modular components and utilities
import {
  DashboardCard,
  StatCard,
  TagManager,
  useDashboardData,
  useEditMode,
  DASHBOARD_COLORS,
  SECTION_COLORS,
  formatDate,
  ANIMATION_VARIANTS,
} from "../../components/dashboard";

const Certificates = () => {
  const { dashboardData } = useOutletContext();

  // Use modular data management hook
  const { data } = useDashboardData(
    dashboardData?.certificates || defaultCertificatesData,
    "dashboard-certificates"
  );

  // Use modular edit mode hook
  const { isEditing, toggleEdit } = useEditMode();

  // Calculate statistics
  const totalCertificates = [
    ...(data.technicalCertificates || []),
    ...(data.professionalCertificates || []),
    ...(data.educationalCertificates || []),
  ].length;

  const activeCertificates = [
    ...(data.technicalCertificates || []),
    ...(data.professionalCertificates || []),
    ...(data.educationalCertificates || []),
  ].filter(
    (cert) => !cert.expiryDate || new Date(cert.expiryDate) > new Date()
  ).length;

  const totalStudyHours = [
    ...(data.technicalCertificates || []),
    ...(data.professionalCertificates || []),
    ...(data.educationalCertificates || []),
  ].reduce((acc, cert) => acc + (cert.studyHours || 0), 0);

  const expiringCertificates = [
    ...(data.technicalCertificates || []),
    ...(data.professionalCertificates || []),
    ...(data.educationalCertificates || []),
  ].filter((cert) => {
    if (!cert.expiryDate) return false;
    const expiryDate = new Date(cert.expiryDate);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return expiryDate <= threeMonthsFromNow;
  }).length;

  return (
    <Box>
      {/* Header with Statistics */}
      <DashboardCard
        title="Certificates & Credentials"
        subtitle="Professional certifications and educational achievements"
        icon={CardMembership}
        color={SECTION_COLORS.certificates}
        onEdit={() => toggleEdit("header")}
        editMode={isEditing("header")}
      >
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Certificates"
              value={totalCertificates}
              icon={CardMembership}
              color={SECTION_COLORS.certificates}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Certificates"
              value={activeCertificates}
              icon={Verified}
              color={DASHBOARD_COLORS.success}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Study Hours"
              value={totalStudyHours}
              suffix="h"
              icon={AccessTime}
              color={DASHBOARD_COLORS.info}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Expiring Soon"
              value={expiringCertificates}
              icon={Schedule}
              color={
                expiringCertificates > 0
                  ? DASHBOARD_COLORS.warning
                  : DASHBOARD_COLORS.success
              }
            />
          </Grid>
        </Grid>
      </DashboardCard>

      {/* Technical Certificates */}
      <DashboardCard
        title="Technical Certificates"
        subtitle="Cloud platforms, programming, and technology skills"
        icon={Computer}
        color={DASHBOARD_COLORS.primary}
        onEdit={() => toggleEdit("technical")}
        editMode={isEditing("technical")}
      >
        <motion.div
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {data.technicalCertificates?.map((certificate, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div variants={ANIMATION_VARIANTS.item}>
                  <Box
                    sx={{
                      p: 3,
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderRadius: 3,
                      border: "1px solid #444",
                      height: "100%",
                      "&:hover": {
                        borderColor: DASHBOARD_COLORS.primary,
                      },
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: `${DASHBOARD_COLORS.primary}20`,
                          color: DASHBOARD_COLORS.primary,
                          mr: 2,
                        }}
                      >
                        <Computer />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{ color: "#fff", mb: 0.5 }}
                        >
                          {certificate.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#aaa", mb: 1 }}
                        >
                          {certificate.provider}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            mb: 1,
                            flexWrap: "wrap",
                          }}
                        >
                          <Chip
                            label={certificate.level}
                            size="small"
                            sx={{
                              backgroundColor: `${DASHBOARD_COLORS.primary}20`,
                              color: "#fff",
                            }}
                          />
                          {certificate.verified && (
                            <Chip
                              icon={<Verified sx={{ fontSize: 16 }} />}
                              label="Verified"
                              size="small"
                              sx={{
                                backgroundColor: `${DASHBOARD_COLORS.success}20`,
                                color: DASHBOARD_COLORS.success,
                              }}
                            />
                          )}
                          {isExpiringSoon(certificate.expiryDate) && (
                            <Chip
                              label="Expiring Soon"
                              size="small"
                              sx={{
                                backgroundColor: `${DASHBOARD_COLORS.warning}20`,
                                color: DASHBOARD_COLORS.warning,
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CalendarMonth
                          sx={{ color: "#aaa", mr: 1, fontSize: 16 }}
                        />
                        <Typography variant="caption" sx={{ color: "#aaa" }}>
                          Issued: {formatDate(certificate.issueDate)}
                        </Typography>
                      </Box>
                      {certificate.expiryDate && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Schedule
                            sx={{ color: "#aaa", mr: 1, fontSize: 16 }}
                          />
                          <Typography variant="caption" sx={{ color: "#aaa" }}>
                            Expires: {formatDate(certificate.expiryDate)}
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {certificate.score && (
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{ color: "#aaa", mb: 0.5, display: "block" }}
                        >
                          Score: {certificate.score}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={certificate.score}
                          sx={{
                            height: 4,
                            borderRadius: 2,
                            backgroundColor: "#333",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: getScoreColor(certificate.score),
                            },
                          }}
                        />
                      </Box>
                    )}

                    {certificate.studyHours && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <AccessTime
                          sx={{ color: "#aaa", mr: 1, fontSize: 16 }}
                        />
                        <Typography variant="caption" sx={{ color: "#aaa" }}>
                          {certificate.studyHours} hours of study
                        </Typography>
                      </Box>
                    )}

                    {certificate.skills && (
                      <Box sx={{ mb: 2 }}>
                        <TagManager
                          tags={certificate.skills}
                          editable={false}
                          color={DASHBOARD_COLORS.primary}
                          variant="outlined"
                          size="small"
                        />
                      </Box>
                    )}

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {certificate.credentialUrl && (
                        <Link
                          href={certificate.credentialUrl}
                          target="_blank"
                          sx={{
                            color: DASHBOARD_COLORS.primary,
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            fontSize: "0.75rem",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          <OpenInNew sx={{ mr: 0.5, fontSize: 14 }} />
                          View Credential
                        </Link>
                      )}
                      {certificate.certificateUrl && (
                        <Link
                          href={certificate.certificateUrl}
                          target="_blank"
                          sx={{
                            color: DASHBOARD_COLORS.success,
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            fontSize: "0.75rem",
                            ml: 1,
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          <CloudDownload sx={{ mr: 0.5, fontSize: 14 }} />
                          Download
                        </Link>
                      )}
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </DashboardCard>

      {/* Professional Certificates */}
      <DashboardCard
        title="Professional Certificates"
        subtitle="Industry standards and professional development"
        icon={Business}
        color={DASHBOARD_COLORS.secondary}
        onEdit={() => toggleEdit("professional")}
        editMode={isEditing("professional")}
      >
        <Grid container spacing={3}>
          {data.professionalCertificates?.map((certificate, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box
                sx={{
                  p: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 3,
                  border: "1px solid #444",
                  height: "100%",
                  "&:hover": {
                    borderColor: DASHBOARD_COLORS.secondary,
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: `${DASHBOARD_COLORS.secondary}20`,
                      color: DASHBOARD_COLORS.secondary,
                      mr: 2,
                    }}
                  >
                    <Business />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: "#fff", mb: 0.5 }}>
                      {certificate.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#aaa", mb: 1 }}>
                      {certificate.provider}
                    </Typography>
                    <Chip
                      label={certificate.category}
                      size="small"
                      sx={{
                        backgroundColor: `${DASHBOARD_COLORS.secondary}20`,
                        color: "#fff",
                      }}
                    />
                  </Box>
                  {certificate.featured && (
                    <Star sx={{ color: DASHBOARD_COLORS.amber }} />
                  )}
                </Box>

                <Typography variant="body2" sx={{ color: "#ccc", mb: 2 }}>
                  {certificate.description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CalendarMonth
                      sx={{ color: "#aaa", mr: 1, fontSize: 16 }}
                    />
                    <Typography variant="caption" sx={{ color: "#aaa" }}>
                      {formatDate(certificate.issueDate)}
                    </Typography>
                  </Box>
                  {certificate.renewalDate && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Schedule sx={{ color: "#aaa", mr: 1, fontSize: 16 }} />
                      <Typography variant="caption" sx={{ color: "#aaa" }}>
                        Renewal: {formatDate(certificate.renewalDate)}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {certificate.competencies && (
                  <TagManager
                    tags={certificate.competencies}
                    editable={false}
                    color={DASHBOARD_COLORS.secondary}
                    variant="filled"
                    size="small"
                  />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </DashboardCard>

      {/* Educational Certificates */}
      <DashboardCard
        title="Educational Certificates"
        subtitle="Academic courses and educational achievements"
        icon={School}
        color={DASHBOARD_COLORS.success}
        onEdit={() => toggleEdit("educational")}
        editMode={isEditing("educational")}
      >
        <Grid container spacing={3}>
          {data.educationalCertificates?.map((certificate, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box
                sx={{
                  p: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 3,
                  border: "1px solid #444",
                  height: "100%",
                  "&:hover": {
                    borderColor: DASHBOARD_COLORS.success,
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: `${DASHBOARD_COLORS.success}20`,
                      color: DASHBOARD_COLORS.success,
                      mr: 2,
                    }}
                  >
                    <School />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: "#fff", mb: 0.5 }}>
                      {certificate.course}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#aaa", mb: 1 }}>
                      {certificate.institution}
                    </Typography>
                    <Chip
                      label={certificate.level}
                      size="small"
                      sx={{
                        backgroundColor: `${DASHBOARD_COLORS.success}20`,
                        color: "#fff",
                      }}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CalendarMonth
                      sx={{ color: "#aaa", mr: 1, fontSize: 16 }}
                    />
                    <Typography variant="caption" sx={{ color: "#aaa" }}>
                      Completed: {formatDate(certificate.completionDate)}
                    </Typography>
                  </Box>
                  {certificate.duration && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <AccessTime sx={{ color: "#aaa", mr: 1, fontSize: 16 }} />
                      <Typography variant="caption" sx={{ color: "#aaa" }}>
                        {certificate.duration}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {certificate.grade && (
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Badge
                      sx={{
                        color: DASHBOARD_COLORS.success,
                        mr: 1,
                        fontSize: 16,
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: DASHBOARD_COLORS.success }}
                    >
                      Grade: {certificate.grade}
                    </Typography>
                  </Box>
                )}

                {certificate.topics && (
                  <TagManager
                    tags={certificate.topics}
                    editable={false}
                    color={DASHBOARD_COLORS.success}
                    variant="outlined"
                    size="small"
                  />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </DashboardCard>
    </Box>
  );
};

// Helper functions
const isExpiringSoon = (expiryDate) => {
  if (!expiryDate) return false;
  const expiry = new Date(expiryDate);
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
  return expiry <= threeMonthsFromNow;
};

const getScoreColor = (score) => {
  if (score >= 90) return DASHBOARD_COLORS.success;
  if (score >= 80) return DASHBOARD_COLORS.info;
  if (score >= 70) return DASHBOARD_COLORS.warning;
  return DASHBOARD_COLORS.error;
};

// Default certificates data structure
const defaultCertificatesData = {
  technicalCertificates: [
    {
      id: 1,
      title: "AWS Solutions Architect - Associate",
      provider: "Amazon Web Services",
      level: "Associate",
      issueDate: "2023-06-15",
      expiryDate: "2026-06-15",
      score: 85,
      studyHours: 120,
      verified: true,
      credentialUrl: "https://credly.com/badges/sample",
      certificateUrl: "https://aws.amazon.com/certification/sample",
      skills: ["AWS", "Cloud Architecture", "EC2", "S3", "Lambda"],
    },
    {
      id: 2,
      title: "Google Cloud Professional Cloud Architect",
      provider: "Google Cloud Platform",
      level: "Professional",
      issueDate: "2023-08-20",
      expiryDate: "2025-08-20",
      score: 92,
      studyHours: 150,
      verified: true,
      credentialUrl: "https://cloud.google.com/certification/sample",
      skills: ["GCP", "Cloud Architecture", "Kubernetes", "BigQuery"],
    },
  ],
  professionalCertificates: [
    {
      id: 1,
      title: "Project Management Professional (PMP)",
      provider: "Project Management Institute",
      category: "Project Management",
      issueDate: "2023-04-10",
      renewalDate: "2026-04-10",
      description:
        "Global standard for project management professionals, demonstrating leadership skills and project management expertise.",
      featured: true,
      competencies: [
        "Project Leadership",
        "Risk Management",
        "Stakeholder Engagement",
      ],
    },
    {
      id: 2,
      title: "Certified ScrumMaster (CSM)",
      provider: "Scrum Alliance",
      category: "Agile Methodology",
      issueDate: "2023-02-28",
      renewalDate: "2025-02-28",
      description:
        "Demonstrates understanding of Scrum framework and ability to serve as a ScrumMaster.",
      competencies: [
        "Agile Methodology",
        "Team Facilitation",
        "Scrum Framework",
      ],
    },
  ],
  educationalCertificates: [
    {
      id: 1,
      course: "Machine Learning Specialization",
      institution: "Stanford University (Coursera)",
      level: "Specialization",
      completionDate: "2023-07-30",
      duration: "3 months",
      grade: "96.5%",
      topics: [
        "Machine Learning",
        "Neural Networks",
        "Deep Learning",
        "Python",
      ],
    },
    {
      id: 2,
      course: "Data Structures and Algorithms",
      institution: "University of California San Diego (edX)",
      level: "Professional Certificate",
      completionDate: "2023-05-15",
      duration: "6 months",
      grade: "A",
      topics: ["Data Structures", "Algorithms", "Problem Solving", "Java"],
    },
  ],
};

export default Certificates;
