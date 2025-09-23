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
} from "@mui/material";
import {
  Edit,
  Save,
  Cancel,
  Add,
  Close,
  School,
  MenuBook,
  EmojiEvents,
  Star,
  AccessTime,
  LocationOn,
  Grade,
  Assignment,
  TrendingUp,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Education = () => {
  const { dashboardData, handleEdit } = useOutletContext();
  const data = dashboardData?.education;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    // Formal Education
    degrees: data?.degrees || [
      {
        id: 1,
        level: "Bachelor",
        degree:
          "Bachelor of Science (B.Sc.) in Computer Science and Engineering",
        institution:
          "National Institute of Textile Engineering and Research (NITER)",
        location: "Savar, Dhaka, Bangladesh",
        startYear: "2018",
        endYear: "2022",
        gpa: "3.75",
        maxGpa: "4.00",
        status: "Completed",
        description:
          "Focused on software engineering, algorithms, data structures, and machine learning. Completed thesis on 'Machine Learning Applications in Healthcare Data Analysis'.",
        honors: ["Dean's List", "Merit Scholarship"],
        relevantCourses: [
          "Data Structures & Algorithms",
          "Machine Learning",
          "Database Management",
          "Software Engineering",
          "Computer Networks",
          "Operating Systems",
        ],
      },
      {
        id: 2,
        level: "Master",
        degree: "Master of Science (M.Sc.) in Computer Science",
        institution: "University of Dhaka",
        location: "Dhaka, Bangladesh",
        startYear: "2023",
        endYear: "Present",
        gpa: "3.85",
        maxGpa: "4.00",
        status: "In Progress",
        description:
          "Specializing in Machine Learning and Bioinformatics with focus on health informatics applications.",
        honors: ["Research Fellowship"],
        relevantCourses: [
          "Advanced Machine Learning",
          "Bioinformatics",
          "Data Mining",
          "Research Methodology",
          "Statistical Analysis",
        ],
      },
    ],

    // Academic Achievements
    achievements: data?.achievements || [
      "Graduated Summa Cum Laude from B.Sc. program",
      "Recipient of Merit-based Scholarship for 4 consecutive years",
      "Best Thesis Award for Machine Learning research",
      "President of Computer Science Students Association",
      "Winner of National Programming Contest 2021",
    ],

    // Skills & Competencies gained through education
    academicSkills: data?.academicSkills || [
      "Research Methodology",
      "Academic Writing",
      "Statistical Analysis",
      "Literature Review",
      "Presentation Skills",
      "Project Management",
    ],

    // Research Experience
    researchExperience: data?.researchExperience || [
      {
        id: 1,
        title: "Machine Learning Applications in Healthcare Data Analysis",
        type: "Undergraduate Thesis",
        institution: "NITER",
        supervisor: "Dr. Md. Abdul Rahman",
        duration: "Jan 2022 - Dec 2022",
        description:
          "Developed predictive models for early disease detection using machine learning algorithms on clinical datasets.",
        technologies: ["Python", "TensorFlow", "Pandas", "Scikit-learn"],
        outcomes: ["Published in IEEE Conference", "94% accuracy achieved"],
      },
      {
        id: 2,
        title: "Bioinformatics Algorithms for Genomic Data Processing",
        type: "Master's Research",
        institution: "University of Dhaka",
        supervisor: "Prof. Dr. Sarah Ahmed",
        duration: "Mar 2023 - Present",
        description:
          "Developing efficient algorithms for processing large-scale genomic data with focus on personalized medicine applications.",
        technologies: ["R", "Python", "MATLAB", "Bioconductor"],
        outcomes: [
          "2 Papers in Review",
          "Algorithm efficiency improved by 40%",
        ],
      },
    ],

    // Certifications & Training
    certifications: data?.certifications || [
      {
        id: 1,
        name: "Machine Learning Specialization",
        provider: "Stanford University (Coursera)",
        date: "2021",
        credentialId: "ABC123XYZ",
        skills: [
          "Supervised Learning",
          "Unsupervised Learning",
          "Neural Networks",
        ],
      },
      {
        id: 2,
        name: "Deep Learning Specialization",
        provider: "DeepLearning.AI (Coursera)",
        date: "2022",
        credentialId: "DEF456UVW",
        skills: ["CNN", "RNN", "LSTM", "Computer Vision"],
      },
      {
        id: 3,
        name: "AWS Certified Solutions Architect",
        provider: "Amazon Web Services",
        date: "2023",
        credentialId: "GHI789RST",
        skills: ["Cloud Computing", "AWS Services", "System Architecture"],
      },
    ],

    // Academic Projects
    academicProjects: data?.academicProjects || [
      {
        id: 1,
        name: "Hospital Management System",
        course: "Software Engineering",
        year: "2021",
        description:
          "Full-stack web application for managing hospital operations including patient records, appointments, and billing.",
        technologies: ["React", "Node.js", "MongoDB", "Express"],
        teamSize: 4,
        role: "Team Lead & Backend Developer",
      },
      {
        id: 2,
        name: "Medical Image Classification using Deep Learning",
        course: "Machine Learning",
        year: "2022",
        description:
          "CNN-based system for classifying medical images to assist in diagnostic processes.",
        technologies: ["Python", "TensorFlow", "Keras", "OpenCV"],
        teamSize: 2,
        role: "ML Engineer",
      },
    ],

    // Teaching & Mentoring Experience
    teachingExperience: data?.teachingExperience || [
      {
        id: 1,
        role: "Teaching Assistant",
        course: "Introduction to Programming",
        institution: "NITER",
        period: "Sep 2021 - Dec 2021",
        students: 60,
        responsibilities: [
          "Lab instruction",
          "Assignment grading",
          "Student mentoring",
        ],
      },
      {
        id: 2,
        role: "Peer Tutor",
        course: "Data Structures & Algorithms",
        institution: "NITER",
        period: "Jan 2022 - May 2022",
        students: 25,
        responsibilities: [
          "One-on-one tutoring",
          "Group study sessions",
          "Exam preparation",
        ],
      },
    ],
  });

  const [saveAlert, setSaveAlert] = useState(null);

  // Helper functions for adding/removing items
  const [newAchievement, setNewAchievement] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const handleSave = () => {
    if (handleEdit) {
      handleEdit("education", editedData);
    }
    setIsEditing(false);
    setSaveAlert({
      type: "success",
      message: "Education section updated successfully!",
    });
    setTimeout(() => setSaveAlert(null), 3000);
  };

  const handleCancel = () => {
    setEditedData({
      degrees: data?.degrees || [],
      achievements: data?.achievements || [],
      academicSkills: data?.academicSkills || [],
      researchExperience: data?.researchExperience || [],
      certifications: data?.certifications || [],
      academicProjects: data?.academicProjects || [],
      teachingExperience: data?.teachingExperience || [],
    });
    setIsEditing(false);
  };

  const addAchievement = () => {
    if (newAchievement.trim() && editedData.achievements.length < 10) {
      setEditedData((prev) => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()],
      }));
      setNewAchievement("");
    }
  };

  const removeAchievement = (index) => {
    setEditedData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && editedData.academicSkills.length < 12) {
      setEditedData((prev) => ({
        ...prev,
        academicSkills: [...prev.academicSkills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    setEditedData((prev) => ({
      ...prev,
      academicSkills: prev.academicSkills.filter((_, i) => i !== index),
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

  // Reusable Education Card Component
  const EducationCard = ({
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
          Education Section
        </Typography>
        <Typography variant="body1" sx={{ color: "#888" }}>
          Manage your educational background, achievements, and academic
          experience
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
        <EducationCard hover={false}>
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
                Education Section Management
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Comprehensive academic background and educational achievements
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
                Edit Education
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
        </EducationCard>
      </motion.div>

      {/* Formal Education Section */}
      <motion.div variants={itemVariants}>
        <EducationCard
          icon={<School />}
          title="Formal Education"
          description="Degrees, diplomas, and formal academic qualifications"
        >
          {editedData.degrees.map((degree, index) => (
            <Box
              key={degree.id}
              sx={{
                mb: 4,
                p: 3,
                backgroundColor: "rgba(76, 175, 80, 0.05)",
                border: "1px solid rgba(76, 175, 80, 0.2)",
                borderRadius: 3,
                position: "relative",
              }}
            >
              {/* Degree Header */}
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
                    {degree.degree}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#4CAF50", fontWeight: 500, mb: 1 }}
                  >
                    {degree.institution}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocationOn sx={{ color: "#888", mr: 1, fontSize: 16 }} />
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        {degree.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <AccessTime sx={{ color: "#888", mr: 1, fontSize: 16 }} />
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        {degree.startYear} - {degree.endYear}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Chip
                    label={degree.status}
                    size="small"
                    sx={{
                      backgroundColor:
                        degree.status === "Completed"
                          ? "rgba(76, 175, 80, 0.2)"
                          : "rgba(33, 150, 243, 0.2)",
                      color:
                        degree.status === "Completed" ? "#4CAF50" : "#2196F3",
                      fontWeight: 600,
                      mb: 1,
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Grade sx={{ color: "#4CAF50", mr: 1, fontSize: 16 }} />
                    <Typography
                      variant="body2"
                      sx={{ color: "#fff", fontWeight: 600 }}
                    >
                      GPA: {degree.gpa}/{degree.maxGpa}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Degree Description */}
              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {degree.description}
              </Typography>

              {/* Honors & Awards */}
              {degree.honors && degree.honors.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#4CAF50", mb: 1, fontWeight: 600 }}
                  >
                    Honors & Awards
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {degree.honors.map((honor, idx) => (
                      <Chip
                        key={idx}
                        label={honor}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(255, 193, 7, 0.2)",
                          color: "#FFC107",
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Relevant Courses */}
              {degree.relevantCourses && degree.relevantCourses.length > 0 && (
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#4CAF50", mb: 1, fontWeight: 600 }}
                  >
                    Relevant Courses
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {degree.relevantCourses.map((course, idx) => (
                      <Chip
                        key={idx}
                        label={course}
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
              )}
            </Box>
          ))}
        </EducationCard>
      </motion.div>

      {/* Academic Achievements Section */}
      <motion.div variants={itemVariants}>
        <EducationCard
          icon={<EmojiEvents />}
          title="Academic Achievements"
          description="Academic honors, awards, and recognitions"
        >
          <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
            Max 10 achievements
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
            {editedData.achievements.map((achievement, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  backgroundColor: "rgba(255, 193, 7, 0.1)",
                  border: "1px solid rgba(255, 193, 7, 0.3)",
                  borderRadius: 2,
                  borderLeft: "4px solid #FFC107",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <Star sx={{ color: "#FFC107", mr: 2, fontSize: 20 }} />
                  <Typography variant="body1" sx={{ color: "#fff" }}>
                    {achievement}
                  </Typography>
                </Box>
                {isEditing && (
                  <IconButton
                    onClick={() => removeAchievement(index)}
                    sx={{
                      color: "#FFC107",
                      "&:hover": { color: "#FFD54F" },
                    }}
                  >
                    <Close />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>

          {isEditing && editedData.achievements.length < 10 && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Add new achievement"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addAchievement()}
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
                onClick={addAchievement}
                disabled={!newAchievement.trim()}
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
        </EducationCard>
      </motion.div>

      {/* Academic Skills Section */}
      <motion.div variants={itemVariants}>
        <EducationCard
          icon={<TrendingUp />}
          title="Academic Skills & Competencies"
          description="Skills and competencies gained through academic experience"
        >
          <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
            Max 12 skills
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {editedData.academicSkills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={isEditing ? () => removeSkill(index) : undefined}
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

          {isEditing && editedData.academicSkills.length < 12 && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Add new academic skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSkill()}
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
                onClick={addSkill}
                disabled={!newSkill.trim()}
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
        </EducationCard>
      </motion.div>

      {/* Research Experience Section */}
      <motion.div variants={itemVariants}>
        <EducationCard
          icon={<MenuBook />}
          title="Research Experience"
          description="Academic research projects, thesis work, and publications"
        >
          {editedData.researchExperience.map((research, index) => (
            <Box
              key={research.id}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "rgba(33, 150, 243, 0.05)",
                border: "1px solid rgba(33, 150, 243, 0.2)",
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
                    {research.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#2196F3", fontWeight: 500, mb: 1 }}
                  >
                    {research.type} • {research.institution}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888", mb: 1 }}>
                    Supervisor: {research.supervisor}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
                    Duration: {research.duration}
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {research.description}
              </Typography>

              {/* Technologies Used */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#2196F3", mb: 1, fontWeight: 600 }}
                >
                  Technologies Used
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {research.technologies.map((tech, idx) => (
                    <Chip
                      key={idx}
                      label={tech}
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

              {/* Research Outcomes */}
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#2196F3", mb: 1, fontWeight: 600 }}
                >
                  Key Outcomes
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {research.outcomes.map((outcome, idx) => (
                    <Box
                      key={idx}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Assignment
                        sx={{ color: "#4CAF50", mr: 1, fontSize: 16 }}
                      />
                      <Typography variant="body2" sx={{ color: "#fff" }}>
                        {outcome}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </EducationCard>
      </motion.div>

      {/* Certifications Section */}
      <motion.div variants={itemVariants}>
        <EducationCard
          icon={<Grade />}
          title="Certifications & Training"
          description="Professional certifications, online courses, and specialized training"
        >
          <Grid container spacing={3}>
            {editedData.certifications.map((cert, index) => (
              <Grid item xs={12} md={6} key={cert.id}>
                <Box
                  sx={{
                    p: 3,
                    backgroundColor: "rgba(76, 175, 80, 0.05)",
                    border: "1px solid rgba(76, 175, 80, 0.2)",
                    borderRadius: 3,
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", fontWeight: 600, mb: 1 }}
                  >
                    {cert.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#4CAF50", fontWeight: 500, mb: 1 }}
                  >
                    {cert.provider}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
                    Completed: {cert.date}
                  </Typography>
                  {cert.credentialId && (
                    <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
                      Credential ID: {cert.credentialId}
                    </Typography>
                  )}

                  {/* Skills Gained */}
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#4CAF50", mb: 1, fontWeight: 600 }}
                    >
                      Skills Gained
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
                </Box>
              </Grid>
            ))}
          </Grid>
        </EducationCard>
      </motion.div>
    </motion.div>
  );
};

export default Education;
