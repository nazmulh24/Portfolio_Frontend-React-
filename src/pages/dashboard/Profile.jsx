import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Typography, Button, Alert } from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import { motion } from "framer-motion";
import {
  BasicInfoCard,
  CurrentPositionCard,
  ResearchInterestsCard,
  ContactInfoCard,
  SocialMediaCard,
  TechnicalSkillsCard,
  CareerGoalsCard,
  ProfileCard,
} from "../../components/shared/ProfileCards";

const Profile = () => {
  const { dashboardData, handleEdit } = useOutletContext();
  const data = dashboardData?.profile;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: data?.name || "Md Abul Basar",
    title:
      data?.title ||
      "Machine Learning, Bioinformatics, Computer Science, Data Science, Health Informatics",
    description:
      data?.bio ||
      "Aspiring academic in computer science and data science, seeking a fully funded PhD to advance research in health informatics and machine learning while contributing to academic excellence.",
    currentPosition: data?.currentPosition || "Lecturer, Department of CSE",
    organization:
      data?.organization ||
      "National Institute of Textile Engineering and Research (NITER)",
    researchInterests: data?.researchInterests || [
      "Machine Learning",
      "Bioinformatics",
      "Computer Science",
      "Data Science",
      "Health Informatics",
    ],
    // Contact Information
    email: data?.email || "mdabulbasar@niter.edu.bd",
    phone: data?.phone || "+880 1712345678",
    location: data?.location || "Dhaka, Bangladesh",
    website: data?.website || "https://mdabulbasar.com",

    // Social Media
    linkedin: data?.linkedin || "https://linkedin.com/in/mdabulbasar",
    github: data?.github || "https://github.com/mdabulbasar",
    twitter: data?.twitter || "https://twitter.com/mdabulbasar",
    orcid: data?.orcid || "0000-0000-0000-0000",

    // Skills
    technicalSkills: data?.technicalSkills || [
      "Python",
      "R",
      "JavaScript",
      "Java",
      "C++",
      "SQL",
    ],
    frameworks: data?.frameworks || [
      "TensorFlow",
      "PyTorch",
      "React",
      "Django",
      "Flask",
    ],
    tools: data?.tools || [
      "Git",
      "Docker",
      "AWS",
      "Linux",
      "Jupyter",
      "VS Code",
    ],

    // Academic Goals
    careerGoals:
      data?.careerGoals ||
      "Seeking fully funded PhD opportunities in Computer Science with focus on Health Informatics and Machine Learning research.",
    researchObjectives: data?.researchObjectives || [
      "Develop ML models for healthcare applications",
      "Advance research in bioinformatics algorithms",
      "Contribute to open-source scientific computing tools",
    ],
  });
  const [newInterest, setNewInterest] = useState("");
  const [saveAlert, setSaveAlert] = useState(null);

  const handleSave = () => {
    // Simulate API call
    if (handleEdit) {
      handleEdit("heroSection", editedData);
    }
    setIsEditing(false);
    setSaveAlert({
      type: "success",
      message: "Hero section updated successfully!",
    });
    setTimeout(() => setSaveAlert(null), 3000);
  };

  const handleCancel = () => {
    setEditedData({
      name: data?.name || "Md Abul Basar",
      title:
        data?.title ||
        "Machine Learning, Bioinformatics, Computer Science, Data Science, Health Informatics",
      description:
        data?.bio ||
        "Aspiring academic in computer science and data science, seeking a fully funded PhD to advance research in health informatics and machine learning while contributing to academic excellence.",
      currentPosition: data?.currentPosition || "Lecturer, Department of CSE",
      organization:
        data?.organization ||
        "National Institute of Textile Engineering and Research (NITER)",
      researchInterests: data?.researchInterests || [
        "Machine Learning",
        "Bioinformatics",
        "Computer Science",
        "Data Science",
        "Health Informatics",
      ],
    });
    setIsEditing(false);
  };

  const addResearchInterest = () => {
    if (newInterest.trim() && editedData.researchInterests.length < 7) {
      setEditedData((prev) => ({
        ...prev,
        researchInterests: [...prev.researchInterests, newInterest.trim()],
      }));
      setNewInterest("");
    }
  };

  const removeResearchInterest = (index) => {
    setEditedData((prev) => ({
      ...prev,
      researchInterests: prev.researchInterests.filter((_, i) => i !== index),
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ paddingBottom: "2rem" }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: "#fff", mb: 1, fontWeight: 600 }}>
          Profile Section
        </Typography>
        <Typography variant="body1" sx={{ color: "#888" }}>
          Manage your homepage hero section content
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
        <ProfileCard hover={false}>
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
                Profile Section Management
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Comprehensive personal and professional information
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
                Edit Profile
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
        </ProfileCard>
      </motion.div>

      {/* Basic Information Section */}
      <motion.div variants={itemVariants}>
        <BasicInfoCard
          isEditing={isEditing}
          editedData={editedData}
          setEditedData={setEditedData}
        />
      </motion.div>

      {/* Current Position Section */}
      <motion.div variants={itemVariants}>
        <CurrentPositionCard
          isEditing={isEditing}
          editedData={editedData}
          setEditedData={setEditedData}
        />
      </motion.div>

      {/* Research Interests Section */}
      <motion.div variants={itemVariants}>
        <ResearchInterestsCard
          isEditing={isEditing}
          editedData={editedData}
          setEditedData={setEditedData}
          newInterest={newInterest}
          setNewInterest={setNewInterest}
          addResearchInterest={addResearchInterest}
          removeResearchInterest={removeResearchInterest}
        />
      </motion.div>

      {/* Contact Information Section */}
      <motion.div variants={itemVariants}>
        <ContactInfoCard
          isEditing={isEditing}
          editedData={editedData}
          setEditedData={setEditedData}
        />
      </motion.div>

      {/* Social Media Section */}
      <motion.div variants={itemVariants}>
        <SocialMediaCard
          isEditing={isEditing}
          editedData={editedData}
          setEditedData={setEditedData}
        />
      </motion.div>

      {/* Technical Skills Section */}
      <motion.div variants={itemVariants}>
        <TechnicalSkillsCard editedData={editedData} />
      </motion.div>

      {/* Career Goals Section */}
      <motion.div variants={itemVariants}>
        <CareerGoalsCard
          isEditing={isEditing}
          editedData={editedData}
          setEditedData={setEditedData}
        />
      </motion.div>
    </motion.div>
  );
};

export default Profile;
