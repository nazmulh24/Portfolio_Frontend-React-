import { useOutletContext } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  LinearProgress,
  Rating,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Psychology,
  Code,
  Storage,
  Cloud,
  Security,
  DesignServices,
  School,
  Star,
  TrendingUp,
  Assessment,
  ExpandMore,
  Schedule,
  Lightbulb,
} from "@mui/icons-material";
import { motion } from "framer-motion";

// Import modular components and hooks
import {
  DashboardCard,
  StatCard,
  TagManager,
  useDashboardData,
  useEditMode,
  DASHBOARD_COLORS,
  SECTION_COLORS,
  SKILL_LEVELS,
  formatDate,
  ANIMATION_VARIANTS,
} from "../../components/dashboard";

const SkillsRefactored = () => {
  const { dashboardData } = useOutletContext();

  // Use modular data management hook
  const { data } = useDashboardData(
    dashboardData?.skills || defaultSkillsData,
    "dashboard-skills"
  );

  // Use modular edit mode hook
  const { isEditing, toggleEdit } = useEditMode();

  // Statistics calculations
  const totalSkills =
    data.technicalSkills?.reduce(
      (acc, category) => acc + category.skills.length,
      0
    ) || 0;
  const avgProficiency =
    data.technicalSkills?.reduce((acc, category) => {
      const categoryAvg =
        category.skills.reduce((sum, skill) => sum + skill.proficiency, 0) /
        category.skills.length;
      return acc + categoryAvg;
    }, 0) / (data.technicalSkills?.length || 1) || 0;

  const expertSkills =
    data.technicalSkills?.reduce(
      (acc, category) =>
        acc +
        category.skills.filter(
          (skill) =>
            skill.level === SKILL_LEVELS.EXPERT ||
            skill.level === SKILL_LEVELS.MASTER
        ).length,
      0
    ) || 0;

  return (
    <Box>
      {/* Header */}
      <DashboardCard
        title="Skills & Expertise"
        subtitle="Technical proficiencies and professional capabilities"
        icon={Psychology}
        color={SECTION_COLORS.skills}
        onEdit={() => toggleEdit("header")}
        editMode={isEditing("header")}
      >
        {/* Skills Statistics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Skills"
              value={totalSkills}
              icon={Assessment}
              color={SECTION_COLORS.skills}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Average Proficiency"
              value={Math.round(avgProficiency)}
              suffix="%"
              icon={TrendingUp}
              color={DASHBOARD_COLORS.success}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Expert Level"
              value={expertSkills}
              icon={Star}
              color={DASHBOARD_COLORS.amber}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Learning Goals"
              value={data.learningGoals?.length || 0}
              icon={Lightbulb}
              color={DASHBOARD_COLORS.info}
            />
          </Grid>
        </Grid>
      </DashboardCard>

      {/* Technical Skills */}
      <DashboardCard
        title="Technical Skills"
        subtitle="Programming languages, frameworks, and tools"
        icon={Code}
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
            {data.technicalSkills?.map((category, index) => (
              <Grid item xs={12} key={index}>
                <motion.div variants={ANIMATION_VARIANTS.item}>
                  <Accordion
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderRadius: 2,
                      border: "1px solid #444",
                      "&:before": { display: "none" },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore sx={{ color: "#fff" }} />}
                      sx={{
                        "& .MuiAccordionSummary-content": {
                          alignItems: "center",
                        },
                      }}
                    >
                      {getCategoryIcon(category.category)}
                      <Typography
                        variant="h6"
                        sx={{ color: "#fff", ml: 2, flex: 1 }}
                      >
                        {category.category}
                      </Typography>
                      <Chip
                        label={`${category.skills.length} skills`}
                        size="small"
                        sx={{
                          backgroundColor: `${DASHBOARD_COLORS.primary}20`,
                          color: "#fff",
                          mr: 2,
                        }}
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        {category.skills.map((skill, skillIndex) => (
                          <Grid item xs={12} sm={6} md={4} key={skillIndex}>
                            <Box
                              sx={{
                                p: 2,
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                borderRadius: 2,
                                border: "1px solid #333",
                                height: "100%",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  mb: 1,
                                }}
                              >
                                <Typography
                                  variant="subtitle1"
                                  sx={{ color: "#fff", fontWeight: 600 }}
                                >
                                  {skill.name}
                                </Typography>
                                <Chip
                                  label={skill.level}
                                  size="small"
                                  sx={{
                                    backgroundColor: getSkillLevelColor(
                                      skill.level
                                    ),
                                    color: "#fff",
                                  }}
                                />
                              </Box>

                              <Box sx={{ mb: 2 }}>
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
                                    Proficiency
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    sx={{ color: "#fff" }}
                                  >
                                    {skill.proficiency}%
                                  </Typography>
                                </Box>
                                <LinearProgress
                                  variant="determinate"
                                  value={skill.proficiency}
                                  sx={{
                                    height: 6,
                                    borderRadius: 3,
                                    backgroundColor: "#333",
                                    "& .MuiLinearProgress-bar": {
                                      backgroundColor: getSkillLevelColor(
                                        skill.level
                                      ),
                                    },
                                  }}
                                />
                              </Box>

                              <Typography
                                variant="caption"
                                sx={{ color: "#aaa", display: "block", mb: 1 }}
                              >
                                {skill.yearsOfExperience} years •{" "}
                                {skill.projects} projects
                              </Typography>

                              {skill.frameworks && (
                                <TagManager
                                  tags={skill.frameworks}
                                  editable={false}
                                  color={getSkillLevelColor(skill.level)}
                                  variant="outlined"
                                  size="small"
                                />
                              )}
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </DashboardCard>

      {/* Soft Skills */}
      <DashboardCard
        title="Soft Skills & Leadership"
        subtitle="Interpersonal and management capabilities"
        icon={Psychology}
        color={DASHBOARD_COLORS.purple}
        onEdit={() => toggleEdit("soft")}
        editMode={isEditing("soft")}
      >
        <Grid container spacing={2}>
          {data.softSkills?.map((skill, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 2,
                  border: "1px solid #444",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
                  {skill.name}
                </Typography>
                <Rating
                  value={skill.rating}
                  readOnly
                  size="small"
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: DASHBOARD_COLORS.purple,
                    },
                  }}
                />
                <Typography variant="body2" sx={{ color: "#aaa", mt: 1 }}>
                  {skill.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DashboardCard>

      {/* Learning Goals */}
      <DashboardCard
        title="Learning Goals & Development"
        subtitle="Planned skill development and learning objectives"
        icon={School}
        color={DASHBOARD_COLORS.info}
        onEdit={() => toggleEdit("learning")}
        editMode={isEditing("learning")}
      >
        <Grid container spacing={3}>
          {data.learningGoals?.map((goal, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box
                sx={{
                  p: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 3,
                  border: "1px solid #444",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Lightbulb sx={{ color: DASHBOARD_COLORS.info, mr: 1 }} />
                  <Typography variant="h6" sx={{ color: "#fff", flex: 1 }}>
                    {goal.skill}
                  </Typography>
                  <Chip
                    label={goal.priority}
                    size="small"
                    sx={{
                      backgroundColor: getPriorityColor(goal.priority),
                      color: "#fff",
                    }}
                  />
                </Box>

                <Typography variant="body2" sx={{ color: "#aaa", mb: 2 }}>
                  {goal.reason}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption" sx={{ color: "#aaa" }}>
                    Target: {formatDate(goal.targetDate)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Schedule sx={{ color: "#aaa", mr: 0.5, fontSize: 16 }} />
                    <Typography variant="caption" sx={{ color: "#aaa" }}>
                      {goal.estimatedTime}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DashboardCard>
    </Box>
  );
};

// Helper functions
const getCategoryIcon = (category) => {
  const iconMap = {
    "Programming Languages": <Code sx={{ color: DASHBOARD_COLORS.primary }} />,
    Databases: <Storage sx={{ color: DASHBOARD_COLORS.secondary }} />,
    "Cloud Platforms": <Cloud sx={{ color: DASHBOARD_COLORS.info }} />,
    Security: <Security sx={{ color: DASHBOARD_COLORS.error }} />,
    "Design Tools": <DesignServices sx={{ color: DASHBOARD_COLORS.purple }} />,
  };
  return iconMap[category] || <Code sx={{ color: DASHBOARD_COLORS.primary }} />;
};

const getSkillLevelColor = (level) => {
  const colorMap = {
    [SKILL_LEVELS.BEGINNER]: DASHBOARD_COLORS.grey,
    [SKILL_LEVELS.INTERMEDIATE]: DASHBOARD_COLORS.info,
    [SKILL_LEVELS.ADVANCED]: DASHBOARD_COLORS.success,
    [SKILL_LEVELS.EXPERT]: DASHBOARD_COLORS.amber,
    [SKILL_LEVELS.MASTER]: DASHBOARD_COLORS.purple,
  };
  return colorMap[level] || DASHBOARD_COLORS.primary;
};

const getPriorityColor = (priority) => {
  const colorMap = {
    High: DASHBOARD_COLORS.error,
    Medium: DASHBOARD_COLORS.warning,
    Low: DASHBOARD_COLORS.success,
  };
  return colorMap[priority] || DASHBOARD_COLORS.info;
};

// Default skills data structure
const defaultSkillsData = {
  technicalSkills: [
    {
      category: "Programming Languages",
      skills: [
        {
          name: "Python",
          proficiency: 95,
          level: "Expert",
          yearsOfExperience: 6,
          projects: 45,
          frameworks: ["Django", "FastAPI", "Flask"],
        },
        {
          name: "JavaScript",
          proficiency: 90,
          level: "Expert",
          yearsOfExperience: 5,
          projects: 38,
          frameworks: ["React", "Node.js", "Express"],
        },
      ],
    },
  ],
  softSkills: [
    {
      name: "Leadership",
      rating: 5,
      description: "Leading cross-functional teams and mentoring developers",
    },
    {
      name: "Communication",
      rating: 5,
      description: "Clear technical communication with stakeholders",
    },
  ],
  learningGoals: [
    {
      skill: "Machine Learning",
      reason: "To enhance AI capabilities in current projects",
      priority: "High",
      targetDate: "2024-12-31",
      estimatedTime: "3 months",
    },
  ],
};

export default SkillsRefactored;
