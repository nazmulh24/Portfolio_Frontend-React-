import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Typography, Grid, LinearProgress, Avatar } from "@mui/material";
import {
  Info,
  Psychology,
  Timeline,
  Star,
  Language,
  Interests,
  Assignment,
  TrendingUp,
} from "@mui/icons-material";
import { motion } from "framer-motion";

// Import modular components and utilities
import {
  DashboardCard,
  StatCard,
  TagManager,
  StyledTextField,
  useDashboardData,
  useEditMode,
  DASHBOARD_COLORS,
  SECTION_COLORS,
  ANIMATION_VARIANTS,
} from "../../components/dashboard";

const About = () => {
  const { dashboardData } = useOutletContext();

  // Use modular data management hook
  const { data, updateData } = useDashboardData(
    dashboardData?.about || defaultAboutData,
    "dashboard-about"
  );

  // Use modular edit mode hook
  const { isEditing, toggleEdit } = useEditMode();

  // Calculate statistics
  const totalValues = (data.values || []).length;
  const totalInterests = (data.interests || []).length;
  const totalLanguages = (data.languages || []).length;
  const totalFunFacts = (data.funFacts || []).length;

  return (
    <Box>
      {/* Header with Statistics */}
      <DashboardCard
        title="About Section"
        subtitle="Comprehensive personal and professional information"
        icon={Info}
        color={SECTION_COLORS.about}
        onEdit={() => toggleEdit("header")}
        editMode={isEditing("header")}
      >
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Core Values"
              value={totalValues}
              icon={Star}
              color={DASHBOARD_COLORS.success}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Interests"
              value={totalInterests}
              icon={Interests}
              color={DASHBOARD_COLORS.info}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Languages"
              value={totalLanguages}
              icon={Language}
              color={DASHBOARD_COLORS.warning}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Fun Facts"
              value={totalFunFacts}
              icon={TrendingUp}
              color={DASHBOARD_COLORS.primary}
            />
          </Grid>
        </Grid>
      </DashboardCard>

      {/* Personal Story & Background */}
      <DashboardCard
        title="Personal Story & Background"
        subtitle="Your professional journey and personal narrative"
        icon={Psychology}
        color={DASHBOARD_COLORS.primary}
        onEdit={() => toggleEdit("story")}
        editMode={isEditing("story")}
      >
        <motion.div
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <motion.div variants={ANIMATION_VARIANTS.item}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", mb: 2, fontWeight: 600 }}
                  >
                    Personal Story
                  </Typography>
                  {isEditing("story") ? (
                    <StyledTextField
                      fullWidth
                      multiline
                      rows={4}
                      value={data.personalStory}
                      onChange={(e) =>
                        updateData({ personalStory: e.target.value })
                      }
                      placeholder="Share your professional journey and personal narrative..."
                    />
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{ color: "#fff", lineHeight: 1.7 }}
                    >
                      {data.personalStory}
                    </Typography>
                  )}
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12}>
              <motion.div variants={ANIMATION_VARIANTS.item}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", mb: 2, fontWeight: 600 }}
                  >
                    Background
                  </Typography>
                  {isEditing("story") ? (
                    <StyledTextField
                      fullWidth
                      multiline
                      rows={3}
                      value={data.background}
                      onChange={(e) =>
                        updateData({ background: e.target.value })
                      }
                      placeholder="Describe your academic and professional background..."
                    />
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{ color: "#fff", lineHeight: 1.7 }}
                    >
                      {data.background}
                    </Typography>
                  )}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </DashboardCard>

      {/* Mission & Vision */}
      <DashboardCard
        title="Mission & Vision"
        subtitle="Your professional mission and future vision"
        icon={Timeline}
        color={DASHBOARD_COLORS.info}
        onEdit={() => toggleEdit("mission")}
        editMode={isEditing("mission")}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: 3,
                border: "1px solid #444",
                height: "100%",
                "&:hover": {
                  borderColor: DASHBOARD_COLORS.info,
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: `${DASHBOARD_COLORS.info}20`,
                    color: DASHBOARD_COLORS.info,
                    mr: 2,
                  }}
                >
                  <Assignment />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ color: "#fff", fontWeight: 600 }}
                >
                  Mission
                </Typography>
              </Box>
              {isEditing("mission") ? (
                <StyledTextField
                  fullWidth
                  multiline
                  rows={4}
                  value={data.mission}
                  onChange={(e) => updateData({ mission: e.target.value })}
                  placeholder="Define your professional mission..."
                />
              ) : (
                <Typography
                  variant="body1"
                  sx={{ color: "#fff", lineHeight: 1.7 }}
                >
                  {data.mission}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: 3,
                border: "1px solid #444",
                height: "100%",
                "&:hover": {
                  borderColor: DASHBOARD_COLORS.info,
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: `${DASHBOARD_COLORS.info}20`,
                    color: DASHBOARD_COLORS.info,
                    mr: 2,
                  }}
                >
                  <Timeline />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ color: "#fff", fontWeight: 600 }}
                >
                  Vision
                </Typography>
              </Box>
              {isEditing("mission") ? (
                <StyledTextField
                  fullWidth
                  multiline
                  rows={4}
                  value={data.vision}
                  onChange={(e) => updateData({ vision: e.target.value })}
                  placeholder="Share your future vision..."
                />
              ) : (
                <Typography
                  variant="body1"
                  sx={{ color: "#fff", lineHeight: 1.7 }}
                >
                  {data.vision}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </DashboardCard>

      {/* Core Values */}
      <DashboardCard
        title="Core Values"
        subtitle="The principles that guide your work and decisions"
        icon={Star}
        color={DASHBOARD_COLORS.success}
        onEdit={() => toggleEdit("values")}
        editMode={isEditing("values")}
      >
        <TagManager
          tags={data.values || []}
          onTagsChange={(newValues) => updateData({ values: newValues })}
          label="Core Values"
          placeholder="Add core value"
          maxTags={8}
          editable={isEditing("values")}
          color={DASHBOARD_COLORS.success}
          variant="filled"
        />
      </DashboardCard>

      {/* Work Philosophy & Motivation */}
      <DashboardCard
        title="Work Philosophy & Motivation"
        subtitle="Your approach to work and what drives you"
        icon={Assignment}
        color={DASHBOARD_COLORS.warning}
        onEdit={() => toggleEdit("philosophy")}
        editMode={isEditing("philosophy")}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ color: "#fff", mb: 2, fontWeight: 600 }}
              >
                Work Philosophy
              </Typography>
              {isEditing("philosophy") ? (
                <StyledTextField
                  fullWidth
                  multiline
                  rows={3}
                  value={data.workPhilosophy}
                  onChange={(e) =>
                    updateData({ workPhilosophy: e.target.value })
                  }
                  placeholder="Describe your work philosophy and approach..."
                />
              ) : (
                <Typography
                  variant="body1"
                  sx={{ color: "#fff", lineHeight: 1.7 }}
                >
                  {data.workPhilosophy}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box>
              <Typography
                variant="h6"
                sx={{ color: "#fff", mb: 2, fontWeight: 600 }}
              >
                What Drives Me
              </Typography>
              {isEditing("philosophy") ? (
                <StyledTextField
                  fullWidth
                  multiline
                  rows={3}
                  value={data.motivation}
                  onChange={(e) => updateData({ motivation: e.target.value })}
                  placeholder="Share what motivates and drives you..."
                />
              ) : (
                <Typography
                  variant="body1"
                  sx={{ color: "#fff", lineHeight: 1.7 }}
                >
                  {data.motivation}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </DashboardCard>

      {/* Personal Interests */}
      <DashboardCard
        title="Personal Interests"
        subtitle="Your professional and personal interests"
        icon={Interests}
        color={DASHBOARD_COLORS.info}
        onEdit={() => toggleEdit("interests")}
        editMode={isEditing("interests")}
      >
        <TagManager
          tags={data.interests || []}
          onTagsChange={(newInterests) =>
            updateData({ interests: newInterests })
          }
          label="Personal Interests"
          placeholder="Add interest"
          maxTags={10}
          editable={isEditing("interests")}
          color={DASHBOARD_COLORS.info}
          variant="outlined"
        />
      </DashboardCard>

      {/* Languages */}
      <DashboardCard
        title="Languages"
        subtitle="Your language proficiency levels"
        icon={Language}
        color={DASHBOARD_COLORS.warning}
        onEdit={() => toggleEdit("languages")}
        editMode={isEditing("languages")}
      >
        <Grid container spacing={3}>
          {data.languages?.map((language, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  p: 3,
                  backgroundColor: `${DASHBOARD_COLORS.warning}10`,
                  border: `1px solid ${DASHBOARD_COLORS.warning}30`,
                  borderRadius: 3,
                  textAlign: "center",
                  "&:hover": {
                    borderColor: DASHBOARD_COLORS.warning,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#fff", mb: 2, fontWeight: 600 }}
                >
                  {language.name}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={language.level}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    mb: 1,
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: DASHBOARD_COLORS.warning,
                    },
                  }}
                />
                <Typography variant="body2" sx={{ color: "#888" }}>
                  {language.level}%
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DashboardCard>

      {/* Fun Facts & Achievements */}
      <DashboardCard
        title="Fun Facts & Achievements"
        subtitle="Interesting facts and notable accomplishments"
        icon={TrendingUp}
        color={DASHBOARD_COLORS.primary}
        onEdit={() => toggleEdit("facts")}
        editMode={isEditing("facts")}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {data.funFacts?.map((fact, index) => (
            <motion.div
              key={index}
              variants={ANIMATION_VARIANTS.item}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 3,
                  backgroundColor: "rgba(255, 152, 0, 0.1)",
                  border: "1px solid rgba(255, 152, 0, 0.3)",
                  borderRadius: 3,
                  borderLeft: `4px solid ${DASHBOARD_COLORS.warning}`,
                  "&:hover": {
                    borderColor: DASHBOARD_COLORS.warning,
                  },
                }}
              >
                <TrendingUp sx={{ color: DASHBOARD_COLORS.warning, mr: 2 }} />
                <Typography variant="body1" sx={{ color: "#fff", flex: 1 }}>
                  {fact}
                </Typography>
              </Box>
            </motion.div>
          ))}

          {isEditing("facts") && (
            <TagManager
              tags={data.funFacts || []}
              onTagsChange={(newFacts) => updateData({ funFacts: newFacts })}
              label="Fun Facts"
              placeholder="Add fun fact"
              maxTags={8}
              editable={true}
              color={DASHBOARD_COLORS.warning}
              variant="filled"
              displayAsList={true}
            />
          )}
        </Box>
      </DashboardCard>
    </Box>
  );
};

// Default about data structure
const defaultAboutData = {
  personalStory:
    "I am a passionate computer science educator and researcher with a deep commitment to advancing the field of health informatics through innovative machine learning applications. My journey began with a fascination for how technology can solve real-world problems, particularly in healthcare and data science.",

  mission:
    "To bridge the gap between cutting-edge technology and practical healthcare solutions through research, education, and innovation.",

  vision:
    "To become a leading researcher in health informatics, contributing to the development of intelligent systems that improve healthcare outcomes and advance scientific knowledge.",

  values: [
    "Innovation & Excellence",
    "Ethical Research",
    "Collaborative Learning",
    "Social Impact",
    "Continuous Growth",
  ],

  interests: [
    "Machine Learning Research",
    "Healthcare Technology",
    "Open Source Development",
    "Scientific Writing",
    "Mentoring Students",
    "Data Visualization",
  ],

  languages: [
    { name: "English", level: 90 },
    { name: "Bengali", level: 100 },
    { name: "Hindi", level: 75 },
    { name: "Arabic", level: 60 },
  ],

  workPhilosophy:
    "I believe in the power of interdisciplinary collaboration and evidence-based research. My approach combines rigorous scientific methodology with creative problem-solving to address complex challenges in health informatics and machine learning.",

  background:
    "With a strong foundation in computer science and a growing expertise in bioinformatics, I have dedicated my career to exploring the intersection of technology and healthcare. My academic journey has been marked by a commitment to excellence and a passion for innovation.",

  motivation:
    "The potential to impact millions of lives through technology drives my research. Every algorithm I develop, every paper I publish, and every student I mentor contributes to a larger vision of a world where technology serves humanity's greatest needs.",

  funFacts: [
    "Published first research paper while teaching undergraduate courses",
    "Contributed to 5+ open-source machine learning projects",
    "Mentored 50+ students in computer science and data science",
    "Can code in 6+ programming languages fluently",
    "Active participant in international AI/ML conferences",
  ],
};

export default About;
