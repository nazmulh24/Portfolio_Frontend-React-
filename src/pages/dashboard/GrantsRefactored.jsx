import React from "react";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Chip,
  Link,
  LinearProgress,
  Avatar,
} from "@mui/material";
import {
  Assessment,
  Science,
  CheckCircle,
  Schedule,
  MonetizationOn,
  TrendingUp,
  PendingActions,
  Person,
  Group,
  OpenInNew,
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
  formatCurrency,
  formatDuration,
  ANIMATION_VARIANTS,
} from "../../components/dashboard";

const Grants = () => {
  const { dashboardData } = useOutletContext();

  // Use modular data management hook
  const { data } = useDashboardData(
    dashboardData?.grants || defaultGrantsData,
    "dashboard-grants"
  );

  // Use modular edit mode hook
  const { isEditing, toggleEdit } = useEditMode();

  // Calculate statistics
  const totalGrants = [
    ...(data.activeGrants || []),
    ...(data.completedGrants || []),
    ...(data.pendingApplications || []),
  ].length;

  const totalFunding = [
    ...(data.activeGrants || []),
    ...(data.completedGrants || []),
  ].reduce((acc, grant) => acc + (grant.amount || 0), 0);

  const activeGrants = (data.activeGrants || []).length;
  const pendingApplications = (data.pendingApplications || []).length;

  return (
    <Box>
      {/* Header with Statistics */}
      <DashboardCard
        title="Research Grants & Funding"
        subtitle="Active grants, completed projects, and funding applications"
        icon={Assessment}
        color={SECTION_COLORS.grants}
        onEdit={() => toggleEdit("header")}
        editMode={isEditing("header")}
      >
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Grants"
              value={totalGrants}
              icon={Assessment}
              color={SECTION_COLORS.grants}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Funding"
              value={formatCurrency(totalFunding)}
              icon={MonetizationOn}
              color={DASHBOARD_COLORS.success}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Grants"
              value={activeGrants}
              icon={TrendingUp}
              color={DASHBOARD_COLORS.info}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending Apps"
              value={pendingApplications}
              icon={PendingActions}
              color={DASHBOARD_COLORS.warning}
            />
          </Grid>
        </Grid>
      </DashboardCard>

      {/* Active Grants */}
      <DashboardCard
        title="Active Grants"
        subtitle="Currently funded research projects"
        icon={TrendingUp}
        color={DASHBOARD_COLORS.primary}
        onEdit={() => toggleEdit("active")}
        editMode={isEditing("active")}
      >
        <motion.div
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {data.activeGrants?.map((grant, index) => (
              <Grid item xs={12} key={index}>
                <motion.div variants={ANIMATION_VARIANTS.item}>
                  <Box
                    sx={{
                      p: 4,
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderRadius: 3,
                      border: "1px solid #444",
                      "&:hover": {
                        borderColor: DASHBOARD_COLORS.primary,
                      },
                    }}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={8}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            mb: 2,
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: `${DASHBOARD_COLORS.primary}20`,
                              color: DASHBOARD_COLORS.primary,
                              mr: 2,
                              width: 56,
                              height: 56,
                            }}
                          >
                            <Science />
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h5"
                              sx={{ color: "#fff", mb: 1, fontWeight: 600 }}
                            >
                              {grant.title}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ color: "#aaa", mb: 1 }}
                            >
                              {grant.grantingOrganization}
                            </Typography>
                            <Chip
                              label={grant.program}
                              sx={{
                                backgroundColor: `${DASHBOARD_COLORS.primary}20`,
                                color: "#fff",
                                mb: 1,
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{ color: "#888", display: "block" }}
                            >
                              Grant #{grant.grantNumber}
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                            mb: 2,
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Person
                              sx={{ color: "#aaa", mr: 1, fontSize: 16 }}
                            />
                            <Typography
                              variant="caption"
                              sx={{ color: "#aaa" }}
                            >
                              PI: {grant.principalInvestigator}
                            </Typography>
                          </Box>
                          {grant.coInvestigators &&
                            grant.coInvestigators.length > 0 && (
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Group
                                  sx={{ color: "#aaa", mr: 1, fontSize: 16 }}
                                />
                                <Typography
                                  variant="caption"
                                  sx={{ color: "#aaa" }}
                                >
                                  Co-PIs: {grant.coInvestigators.join(", ")}
                                </Typography>
                              </Box>
                            )}
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{ color: "#ccc", mb: 2 }}
                        >
                          {grant.description}
                        </Typography>

                        {grant.objectives && (
                          <TagManager
                            tags={grant.objectives}
                            label="Research Objectives"
                            editable={false}
                            color={DASHBOARD_COLORS.primary}
                            variant="outlined"
                            size="small"
                          />
                        )}
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Box
                          sx={{
                            p: 2,
                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                            borderRadius: 2,
                            border: "1px solid #333",
                          }}
                        >
                          <Typography
                            variant="h4"
                            sx={{
                              color: DASHBOARD_COLORS.success,
                              mb: 1,
                              fontWeight: 700,
                            }}
                          >
                            {formatCurrency(grant.amount)}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "#aaa", display: "block", mb: 2 }}
                          >
                            Total Award Amount
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 1,
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{ color: "#aaa" }}
                            >
                              Duration:
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "#fff" }}
                            >
                              {formatDuration(grant.duration)}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 1,
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{ color: "#aaa" }}
                            >
                              Start Date:
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "#fff" }}
                            >
                              {formatDate(grant.startDate)}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 2,
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{ color: "#aaa" }}
                            >
                              End Date:
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "#fff" }}
                            >
                              {formatDate(grant.endDate)}
                            </Typography>
                          </Box>

                          {grant.progress !== undefined && (
                            <Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  mb: 0.5,
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  sx={{ color: "#aaa" }}
                                >
                                  Progress:
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{ color: "#fff" }}
                                >
                                  {grant.progress}%
                                </Typography>
                              </Box>
                              <LinearProgress
                                variant="determinate"
                                value={grant.progress}
                                sx={{
                                  height: 6,
                                  borderRadius: 3,
                                  backgroundColor: "#333",
                                  "& .MuiLinearProgress-bar": {
                                    backgroundColor: DASHBOARD_COLORS.primary,
                                  },
                                }}
                              />
                            </Box>
                          )}

                          {grant.reportUrl && (
                            <Box sx={{ mt: 2 }}>
                              <Link
                                href={grant.reportUrl}
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
                                View Report
                              </Link>
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </DashboardCard>

      {/* Completed Grants */}
      <DashboardCard
        title="Completed Grants"
        subtitle="Successfully finished research projects"
        icon={CheckCircle}
        color={DASHBOARD_COLORS.success}
        onEdit={() => toggleEdit("completed")}
        editMode={isEditing("completed")}
      >
        <Grid container spacing={3}>
          {data.completedGrants?.map((grant, index) => (
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
                    <CheckCircle />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: "#fff", mb: 0.5 }}>
                      {grant.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#aaa", mb: 1 }}>
                      {grant.agency}
                    </Typography>
                    <Chip
                      label="Completed"
                      size="small"
                      sx={{
                        backgroundColor: `${DASHBOARD_COLORS.success}20`,
                        color: DASHBOARD_COLORS.success,
                      }}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: DASHBOARD_COLORS.success }}
                  >
                    {formatCurrency(grant.amount)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#aaa" }}>
                    {formatDate(grant.completionDate)}
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ color: "#ccc", mb: 2 }}>
                  {grant.summary}
                </Typography>

                {grant.outcomes && grant.outcomes.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="caption"
                      sx={{ color: "#aaa", mb: 1, display: "block" }}
                    >
                      Key Outcomes:
                    </Typography>
                    {grant.outcomes.slice(0, 2).map((outcome, idx) => (
                      <Typography
                        key={idx}
                        variant="caption"
                        sx={{ color: "#ccc", display: "block", mb: 0.5 }}
                      >
                        • {outcome}
                      </Typography>
                    ))}
                  </Box>
                )}

                {grant.impact && (
                  <TagManager
                    tags={grant.impact}
                    editable={false}
                    color={DASHBOARD_COLORS.success}
                    variant="filled"
                    size="small"
                  />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </DashboardCard>

      {/* Pending Applications */}
      <DashboardCard
        title="Pending Applications"
        subtitle="Grant applications under review"
        icon={PendingActions}
        color={DASHBOARD_COLORS.warning}
        onEdit={() => toggleEdit("pending")}
        editMode={isEditing("pending")}
      >
        <Grid container spacing={3}>
          {data.pendingApplications?.map((application, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box
                sx={{
                  p: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 3,
                  border: "1px solid #444",
                  height: "100%",
                  "&:hover": {
                    borderColor: DASHBOARD_COLORS.warning,
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: `${DASHBOARD_COLORS.warning}20`,
                      color: DASHBOARD_COLORS.warning,
                      mr: 2,
                    }}
                  >
                    <Schedule />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: "#fff", mb: 0.5 }}>
                      {application.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#aaa", mb: 1 }}>
                      {application.agency}
                    </Typography>
                    <Chip
                      label={application.status}
                      size="small"
                      sx={{
                        backgroundColor: `${DASHBOARD_COLORS.warning}20`,
                        color: DASHBOARD_COLORS.warning,
                      }}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#fff" }}>
                    {formatCurrency(application.requestedAmount)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#aaa" }}>
                    Submitted: {formatDate(application.submissionDate)}
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ color: "#ccc", mb: 2 }}>
                  {application.description}
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
                    <Schedule sx={{ color: "#aaa", mr: 1, fontSize: 16 }} />
                    <Typography variant="caption" sx={{ color: "#aaa" }}>
                      Expected Decision:{" "}
                      {formatDate(application.expectedDecision)}
                    </Typography>
                  </Box>
                </Box>

                {application.collaborators &&
                  application.collaborators.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="caption"
                        sx={{ color: "#aaa", mb: 1, display: "block" }}
                      >
                        Collaborators:
                      </Typography>
                      {application.collaborators.map((collaborator, idx) => (
                        <Typography
                          key={idx}
                          variant="caption"
                          sx={{ color: "#ccc", display: "block", mb: 0.5 }}
                        >
                          • {collaborator}
                        </Typography>
                      ))}
                    </Box>
                  )}

                {application.researchAreas && (
                  <TagManager
                    tags={application.researchAreas}
                    editable={false}
                    color={DASHBOARD_COLORS.warning}
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

// Default grants data structure
const defaultGrantsData = {
  activeGrants: [
    {
      id: 1,
      title: "AI-Powered Healthcare Analytics Platform Development",
      grantingOrganization: "National Science Foundation (NSF)",
      program: "Computer and Information Science and Engineering (CISE)",
      grantNumber: "NSF-2023-CISE-1847392",
      principalInvestigator: "Dr. Nazmul Hossain",
      coInvestigators: ["Dr. Sarah Johnson", "Dr. Michael Chen"],
      amount: 285000,
      duration: 36,
      startDate: "2023-09-01",
      endDate: "2026-08-31",
      progress: 25,
      description:
        "Developing an advanced AI platform for real-time healthcare analytics and predictive modeling to improve patient outcomes and healthcare efficiency.",
      objectives: [
        "AI Model Development",
        "Healthcare Integration",
        "Clinical Validation",
        "User Interface Design",
      ],
      reportUrl: "https://nsf.gov/reports/sample",
    },
    {
      id: 2,
      title: "Machine Learning for Medical Imaging Diagnostics",
      grantingOrganization: "National Institutes of Health (NIH)",
      program: "Biomedical Technology Research Centers (BTRC)",
      grantNumber: "NIH-2024-BTRC-R01-456789",
      principalInvestigator: "Dr. Nazmul Hossain",
      coInvestigators: ["Dr. Lisa Wang", "Dr. Robert Kim"],
      amount: 420000,
      duration: 48,
      startDate: "2024-01-15",
      endDate: "2028-01-14",
      progress: 15,
      description:
        "Research focused on developing machine learning algorithms for automated medical imaging analysis and diagnostic support systems.",
      objectives: [
        "Deep Learning Models",
        "Image Processing",
        "Clinical Trials",
        "FDA Approval",
      ],
    },
  ],
  completedGrants: [
    {
      id: 1,
      title: "Smart Healthcare Monitoring System",
      agency: "Department of Health Technology Innovation",
      amount: 150000,
      completionDate: "2023-08-30",
      summary:
        "Successfully developed and deployed a smart monitoring system for remote patient care.",
      outcomes: [
        "Reduced patient readmission rates by 30%",
        "Improved early detection of health complications by 45%",
        "Published 5 peer-reviewed papers",
      ],
      impact: ["Healthcare Innovation", "Patient Care", "Remote Monitoring"],
    },
    {
      id: 2,
      title: "AI Ethics in Healthcare Research",
      agency: "Ethics in Technology Foundation",
      amount: 85000,
      completionDate: "2023-06-15",
      summary:
        "Comprehensive study on ethical implications of AI in healthcare decision-making.",
      outcomes: [
        "Developed ethical guidelines for healthcare AI",
        "Trained 200+ healthcare professionals",
        "Created policy recommendations",
      ],
      impact: ["AI Ethics", "Healthcare Policy", "Professional Training"],
    },
  ],
  pendingApplications: [
    {
      id: 1,
      title: "Next-Generation AI for Precision Medicine",
      agency: "Advanced Research Projects Agency for Health (ARPA-H)",
      status: "Under Review",
      requestedAmount: 750000,
      submissionDate: "2024-02-15",
      expectedDecision: "2024-06-30",
      description:
        "Proposal to develop cutting-edge AI systems for personalized medicine and treatment optimization.",
      collaborators: ["Stanford University", "Mayo Clinic", "Google Health"],
      researchAreas: ["Precision Medicine", "AI", "Genomics", "Drug Discovery"],
    },
    {
      id: 2,
      title: "Sustainable Healthcare AI Infrastructure",
      agency: "Green Technology Innovation Fund",
      status: "Pending Review",
      requestedAmount: 320000,
      submissionDate: "2024-03-10",
      expectedDecision: "2024-07-15",
      description:
        "Creating environmentally sustainable AI infrastructure for healthcare applications.",
      collaborators: ["MIT", "IBM Research"],
      researchAreas: [
        "Green Technology",
        "Sustainable Computing",
        "Healthcare AI",
      ],
    },
  ],
};

export default Grants;
