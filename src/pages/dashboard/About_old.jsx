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
  LinearProgress,
} from "@mui/material";
import {
  Edit,
  Save,
  Cancel,
  Add,
  Close,
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

const About = () => {
  const { dashboardData, handleEdit } = useOutletContext();
  const data = dashboardData?.about;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    // Personal Story
    personalStory:
      data?.personalStory ||
      "I am a passionate computer science educator and researcher with a deep commitment to advancing the field of health informatics through innovative machine learning applications. My journey began with a fascination for how technology can solve real-world problems, particularly in healthcare and data science.",
    
    // Mission & Vision
    mission:
      data?.mission ||
      "To bridge the gap between cutting-edge technology and practical healthcare solutions through research, education, and innovation.",
    vision:
      data?.vision ||
      "To become a leading researcher in health informatics, contributing to the development of intelligent systems that improve healthcare outcomes and advance scientific knowledge.",

    // Core Values
    values: data?.values || [
      "Innovation & Excellence",
      "Ethical Research",
      "Collaborative Learning",
      "Social Impact",
      "Continuous Growth",
    ],

    // Personal Interests
    interests: data?.interests || [
      "Machine Learning Research",
      "Healthcare Technology",
      "Open Source Development",
      "Scientific Writing",
      "Mentoring Students",
      "Data Visualization",
    ],

    // Languages
    languages: data?.languages || [
      { name: "English", level: 90 },
      { name: "Bengali", level: 100 },
      { name: "Hindi", level: 75 },
      { name: "Arabic", level: 60 },
    ],

    // Philosophy
    workPhilosophy:
      data?.workPhilosophy ||
      "I believe in the power of interdisciplinary collaboration and evidence-based research. My approach combines rigorous scientific methodology with creative problem-solving to address complex challenges in health informatics and machine learning.",

    // Background
    background:
      data?.background ||
      "With a strong foundation in computer science and a growing expertise in bioinformatics, I have dedicated my career to exploring the intersection of technology and healthcare. My academic journey has been marked by a commitment to excellence and a passion for innovation.",

    // What Drives Me
    motivation:
      data?.motivation ||
      "The potential to impact millions of lives through technology drives my research. Every algorithm I develop, every paper I publish, and every student I mentor contributes to a larger vision of a world where technology serves humanity's greatest needs.",

    // Fun Facts
    funFacts: data?.funFacts || [
      "Published first research paper while teaching undergraduate courses",
      "Contributed to 5+ open-source machine learning projects",
      "Mentored 50+ students in computer science and data science",
      "Can code in 6+ programming languages fluently",
      "Active participant in international AI/ML conferences",
    ],
  });
  
  const [newValue, setNewValue] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [newFunFact, setNewFunFact] = useState("");
  const [saveAlert, setSaveAlert] = useState(null);

  const handleSave = () => {
    if (handleEdit) {
      handleEdit("about", editedData);
    }
    setIsEditing(false);
    setSaveAlert({
      type: "success",
      message: "About section updated successfully!",
    });
    setTimeout(() => setSaveAlert(null), 3000);
  };

  const handleCancel = () => {
    setEditedData({
      personalStory:
        data?.personalStory ||
        "I am a passionate computer science educator and researcher with a deep commitment to advancing the field of health informatics through innovative machine learning applications. My journey began with a fascination for how technology can solve real-world problems, particularly in healthcare and data science.",
      mission:
        data?.mission ||
        "To bridge the gap between cutting-edge technology and practical healthcare solutions through research, education, and innovation.",
      vision:
        data?.vision ||
        "To become a leading researcher in health informatics, contributing to the development of intelligent systems that improve healthcare outcomes and advance scientific knowledge.",
      values: data?.values || [
        "Innovation & Excellence",
        "Ethical Research",
        "Collaborative Learning",
        "Social Impact",
        "Continuous Growth",
      ],
      interests: data?.interests || [
        "Machine Learning Research",
        "Healthcare Technology",
        "Open Source Development",
        "Scientific Writing",
        "Mentoring Students",
        "Data Visualization",
      ],
      languages: data?.languages || [
        { name: "English", level: 90 },
        { name: "Bengali", level: 100 },
        { name: "Hindi", level: 75 },
        { name: "Arabic", level: 60 },
      ],
      workPhilosophy:
        data?.workPhilosophy ||
        "I believe in the power of interdisciplinary collaboration and evidence-based research. My approach combines rigorous scientific methodology with creative problem-solving to address complex challenges in health informatics and machine learning.",
      background:
        data?.background ||
        "With a strong foundation in computer science and a growing expertise in bioinformatics, I have dedicated my career to exploring the intersection of technology and healthcare. My academic journey has been marked by a commitment to excellence and a passion for innovation.",
      motivation:
        data?.motivation ||
        "The potential to impact millions of lives through technology drives my research. Every algorithm I develop, every paper I publish, and every student I mentor contributes to a larger vision of a world where technology serves humanity's greatest needs.",
      funFacts: data?.funFacts || [
        "Published first research paper while teaching undergraduate courses",
        "Contributed to 5+ open-source machine learning projects",
        "Mentored 50+ students in computer science and data science",
        "Can code in 6+ programming languages fluently",
        "Active participant in international AI/ML conferences",
      ],
    });
    setIsEditing(false);
  };

  const addValue = () => {
    if (newValue.trim() && editedData.values.length < 8) {
      setEditedData((prev) => ({
        ...prev,
        values: [...prev.values, newValue.trim()],
      }));
      setNewValue("");
    }
  };

  const removeValue = (index) => {
    setEditedData((prev) => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index),
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && editedData.interests.length < 10) {
      setEditedData((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()],
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (index) => {
    setEditedData((prev) => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index),
    }));
  };

  const addFunFact = () => {
    if (newFunFact.trim() && editedData.funFacts.length < 8) {
      setEditedData((prev) => ({
        ...prev,
        funFacts: [...prev.funFacts, newFunFact.trim()],
      }));
      setNewFunFact("");
    }
  };

  const removeFunFact = (index) => {
    setEditedData((prev) => ({
      ...prev,
      funFacts: prev.funFacts.filter((_, i) => i !== index),
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
          About Section
        </Typography>
        <Typography variant="body1" sx={{ color: "#888" }}>
          Manage your comprehensive about section content
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
        <Card
          sx={{
            backgroundColor: "transparent",
            border: "1px solid #444",
            borderRadius: 5,
            p: 4,
            mb: 3,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(5px)",
            "&:hover": {
              borderColor: "#4CAF50",
              transition: "border-color 0.3s ease",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Info sx={{ color: "#4CAF50", mr: 2, fontSize: 28 }} />
              <Box>
                <Typography
                  variant="h6"
                  sx={{ color: "#fff", fontWeight: 700 }}
                >
                  About Section Management
                </Typography>
                <Typography variant="body2" sx={{ color: "#aaa" }}>
                  Comprehensive personal and professional information
                </Typography>
              </Box>
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
                Edit About Section
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
        </Card>
      </motion.div>

      {/* Personal Story Section */}
      <motion.div variants={itemVariants}>
        <Card
          sx={{
            backgroundColor: "transparent",
            border: "1px solid #444",
            borderRadius: 5,
            p: 4,
            mb: 3,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(5px)",
            "&:hover": {
              borderColor: "#4CAF50",
              transition: "border-color 0.3s ease",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Psychology sx={{ color: "#4CAF50", mr: 2, fontSize: 28 }} />
            <Box>
              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                Personal Story & Background
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Your professional journey and personal narrative
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Personal Story"
                  multiline
                  rows={4}
                  value={editedData.personalStory}
                  onChange={(e) =>
                    setEditedData((prev) => ({
                      ...prev,
                      personalStory: e.target.value,
                    }))
                  }
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(15, 15, 15, 0.6)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 2,
                      "& fieldset": { borderColor: "#444", borderWidth: 2 },
                      "&:hover fieldset": {
                        borderColor: "#4CAF50",
                        borderWidth: 2,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#4CAF50",
                        borderWidth: 2,
                      },
                    },
                    "& .MuiInputLabel-root": { color: "#bbb" },
                    "& .MuiInputBase-input": { color: "#fff" },
                  }}
                />
              ) : (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#fff", mb: 2, fontWeight: 600 }}
                  >
                    Personal Story
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#fff", lineHeight: 1.7 }}
                  >
                    {editedData.personalStory}
                  </Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Background"
                  multiline
                  rows={3}
                  value={editedData.background}
                  onChange={(e) =>
                    setEditedData((prev) => ({
                      ...prev,
                      background: e.target.value,
                    }))
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(15, 15, 15, 0.6)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 2,
                      "& fieldset": { borderColor: "#444", borderWidth: 2 },
                      "&:hover fieldset": {
                        borderColor: "#4CAF50",
                        borderWidth: 2,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#4CAF50",
                        borderWidth: 2,
                      },
                    },
                    "& .MuiInputLabel-root": { color: "#bbb" },
                    "& .MuiInputBase-input": { color: "#fff" },
                  }}
                />
              ) : (
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#fff", mb: 2, fontWeight: 600 }}
                  >
                    Background
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#fff", lineHeight: 1.7 }}
                  >
                    {editedData.background}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Card>
      </motion.div>

      {/* Mission & Vision Section */}
      <motion.div variants={itemVariants}>
        <Card
          sx={{
            backgroundColor: "transparent",
            border: "1px solid #444",
            borderRadius: 5,
            p: 4,
            mb: 3,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(5px)",
            "&:hover": {
              borderColor: "#4CAF50",
              transition: "border-color 0.3s ease",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Timeline sx={{ color: "#4CAF50", mr: 2, fontSize: 28 }} />
            <Box>
              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                Mission & Vision
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Your professional mission and future vision
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Mission"
                  multiline
                  rows={4}
                  value={editedData.mission}
                  onChange={(e) =>
                    setEditedData((prev) => ({
                      ...prev,
                      mission: e.target.value,
                    }))
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(15, 15, 15, 0.6)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 2,
                      "& fieldset": { borderColor: "#444", borderWidth: 2 },
                      "&:hover fieldset": {
                        borderColor: "#4CAF50",
                        borderWidth: 2,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#4CAF50",
                        borderWidth: 2,
                      },
                    },
                    "& .MuiInputLabel-root": { color: "#bbb" },
                    "& .MuiInputBase-input": { color: "#fff" },
                  }}
                />
              ) : (
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#fff", mb: 2, fontWeight: 600 }}
                  >
                    Mission
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#fff", lineHeight: 1.7 }}
                  >
                    {editedData.mission}
                  </Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Vision"
                  multiline
                  rows={4}
                  value={editedData.vision}
                  onChange={(e) =>
                    setEditedData((prev) => ({
                      ...prev,
                      vision: e.target.value,
                    }))
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(15, 15, 15, 0.6)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 2,
                      "& fieldset": { borderColor: "#444", borderWidth: 2 },
                      "&:hover fieldset": {
                        borderColor: "#4CAF50",
                        borderWidth: 2,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#4CAF50",
                        borderWidth: 2,
                      },
                    },
                    "& .MuiInputLabel-root": { color: "#bbb" },
                    "& .MuiInputBase-input": { color: "#fff" },
                  }}
                />
              ) : (
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#fff", mb: 2, fontWeight: 600 }}
                  >
                    Vision
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#fff", lineHeight: 1.7 }}
                  >
                    {editedData.vision}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Card>
      </motion.div>

      {/* Core Values Section */}
      <motion.div variants={itemVariants}>
        <Card
          sx={{
            backgroundColor: "transparent",
            border: "1px solid #444",
            borderRadius: 5,
            p: 4,
            mb: 3,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(5px)",
            "&:hover": {
              borderColor: "#4CAF50",
              transition: "border-color 0.3s ease",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Star sx={{ color: "#4CAF50", mr: 2, fontSize: 28 }} />
            <Box>
              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                Core Values
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                The principles that guide your work and decisions
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
            Max 8 values
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {editedData.values.map((value, index) => (
              <Chip
                key={index}
                label={value}
                onDelete={isEditing ? () => removeValue(index) : undefined}
                deleteIcon={isEditing ? <Close /> : undefined}
                sx={{
                  backgroundColor: "rgba(76, 175, 80, 0.2)",
                  color: "#4CAF50",
                  border: "1px solid rgba(76, 175, 80, 0.5)",
                  fontWeight: 600,
                  "& .MuiChip-deleteIcon": {
                    color: "#4CAF50",
                    "&:hover": { color: "#66BB6A" },
                  },
                }}
              />
            ))}
          </Box>

          {isEditing && editedData.values.length < 8 && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Add new core value"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addValue()}
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
                onClick={addValue}
                disabled={!newValue.trim()}
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
        </Card>
      </motion.div>

      {/* Work Philosophy & Motivation Section */}
      <motion.div variants={itemVariants}>
        <Card
          sx={{
            backgroundColor: "transparent",
            border: "1px solid #444",
            borderRadius: 5,
            p: 4,
            mb: 3,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(5px)",
            "&:hover": {
              borderColor: "#4CAF50",
              transition: "border-color 0.3s ease",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Assignment sx={{ color: "#4CAF50", mr: 2, fontSize: 28 }} />
            <Box>
              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                Work Philosophy & Motivation
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Your approach to work and what drives you
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Work Philosophy"
                  multiline
                  rows={3}
                  value={editedData.workPhilosophy}
                  onChange={(e) =>
                    setEditedData((prev) => ({
                      ...prev,
                      workPhilosophy: e.target.value,
                    }))
                  }
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(15, 15, 15, 0.6)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 2,
                      "& fieldset": { borderColor: "#444", borderWidth: 2 },
                      "&:hover fieldset": {
                        borderColor: "#4CAF50",
                        borderWidth: 2,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#4CAF50",
                        borderWidth: 2,
                      },
                    },
                    "& .MuiInputLabel-root": { color: "#bbb" },
                    "& .MuiInputBase-input": { color: "#fff" },
                  }}
                />
              ) : (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#fff", mb: 2, fontWeight: 600 }}
                  >
                    Work Philosophy
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#fff", lineHeight: 1.7 }}
                  >
                    {editedData.workPhilosophy}
                  </Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="What Drives Me"
                  multiline
                  rows={3}
                  value={editedData.motivation}
                  onChange={(e) =>
                    setEditedData((prev) => ({
                      ...prev,
                      motivation: e.target.value,
                    }))
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(15, 15, 15, 0.6)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 2,
                      "& fieldset": { borderColor: "#444", borderWidth: 2 },
                      "&:hover fieldset": {
                        borderColor: "#4CAF50",
                        borderWidth: 2,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#4CAF50",
                        borderWidth: 2,
                      },
                    },
                    "& .MuiInputLabel-root": { color: "#bbb" },
                    "& .MuiInputBase-input": { color: "#fff" },
                  }}
                />
              ) : (
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#fff", mb: 2, fontWeight: 600 }}
                  >
                    What Drives Me
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#fff", lineHeight: 1.7 }}
                  >
                    {editedData.motivation}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Card>
      </motion.div>

      {/* Personal Interests Section */}
      <motion.div variants={itemVariants}>
        <Card
          sx={{
            backgroundColor: "transparent",
            border: "1px solid #444",
            borderRadius: 5,
            p: 4,
            mb: 3,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(5px)",
            "&:hover": {
              borderColor: "#4CAF50",
              transition: "border-color 0.3s ease",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Interests sx={{ color: "#4CAF50", mr: 2, fontSize: 28 }} />
            <Box>
              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                Personal Interests
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Your professional and personal interests
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
            Max 10 interests
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {editedData.interests.map((interest, index) => (
              <Chip
                key={index}
                label={interest}
                onDelete={isEditing ? () => removeInterest(index) : undefined}
                deleteIcon={isEditing ? <Close /> : undefined}
                sx={{
                  backgroundColor: "rgba(33, 150, 243, 0.2)",
                  color: "#2196F3",
                  border: "1px solid rgba(33, 150, 243, 0.5)",
                  fontWeight: 600,
                  "& .MuiChip-deleteIcon": {
                    color: "#2196F3",
                    "&:hover": { color: "#42A5F5" },
                  },
                }}
              />
            ))}
          </Box>

          {isEditing && editedData.interests.length < 10 && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Add new interest"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addInterest()}
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
                onClick={addInterest}
                disabled={!newInterest.trim()}
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
        </Card>
      </motion.div>

      {/* Languages Section */}
      <motion.div variants={itemVariants}>
        <Card
          sx={{
            backgroundColor: "transparent",
            border: "1px solid #444",
            borderRadius: 5,
            p: 4,
            mb: 3,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(5px)",
            "&:hover": {
              borderColor: "#4CAF50",
              transition: "border-color 0.3s ease",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Language sx={{ color: "#4CAF50", mr: 2, fontSize: 28 }} />
            <Box>
              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                Languages
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Your language proficiency levels
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {editedData.languages.map((language, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    p: 3,
                    backgroundColor: "rgba(76, 175, 80, 0.1)",
                    border: "1px solid rgba(76, 175, 80, 0.3)",
                    borderRadius: 3,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#fff", mb: 2, fontWeight: 600 }}
                  >
                    {language.name}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={language.level}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      mb: 1,
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#4CAF50",
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "#888", textAlign: "center" }}
                  >
                    {language.level}%
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      </motion.div>

      {/* Fun Facts Section */}
      <motion.div variants={itemVariants}>
        <Card
          sx={{
            backgroundColor: "transparent",
            border: "1px solid #444",
            borderRadius: 5,
            p: 4,
            mb: 3,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(5px)",
            "&:hover": {
              borderColor: "#4CAF50",
              transition: "border-color 0.3s ease",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <TrendingUp sx={{ color: "#4CAF50", mr: 2, fontSize: 28 }} />
            <Box>
              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                Fun Facts & Achievements
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Interesting facts and notable accomplishments
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
            Max 8 facts
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
            {editedData.funFacts.map((fact, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  backgroundColor: "rgba(255, 152, 0, 0.1)",
                  border: "1px solid rgba(255, 152, 0, 0.3)",
                  borderRadius: 2,
                  borderLeft: "4px solid #FF9800",
                }}
              >
                <Typography variant="body1" sx={{ color: "#fff", flex: 1 }}>
                  • {fact}
                </Typography>
                {isEditing && (
                  <IconButton
                    onClick={() => removeFunFact(index)}
                    sx={{
                      color: "#FF9800",
                      "&:hover": { color: "#FFB74D" },
                    }}
                  >
                    <Close />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>

          {isEditing && editedData.funFacts.length < 8 && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Add new fun fact"
                value={newFunFact}
                onChange={(e) => setNewFunFact(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addFunFact()}
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
                onClick={addFunFact}
                disabled={!newFunFact.trim()}
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
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default About;