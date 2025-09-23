import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Typography,
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
  Work,
  Code,
  Timeline,
  LocationOn,
  CalendarToday,
  TrendingUp,
  EmojiEvents,
  School,
  VolunteerActivism,
  Computer,
  Assignment,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Experience = () => {
  const { dashboardData, handleEdit } = useOutletContext();
  const data = dashboardData?.experience;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    // Professional Experience
    professionalExperience: data?.professionalExperience || [
      {
        id: 1,
        jobTitle: "Senior Full Stack Developer",
        company: "TechVision Solutions Ltd.",
        location: "Dhaka, Bangladesh",
        employmentType: "Full-time",
        startDate: "January 2023",
        endDate: "Present",
        duration: "1 year 8 months",
        status: "Current",
        description:
          "Leading full-stack development projects using Django REST Framework and React.js. Developed and maintained scalable web applications serving 10,000+ users. Collaborated with cross-functional teams to deliver high-quality software solutions.",
        keyResponsibilities: [
          "Lead development of web applications using Django and React",
          "Design and implement RESTful APIs and database architectures",
          "Mentor junior developers and conduct code reviews",
          "Collaborate with product managers and designers on feature development",
          "Optimize application performance and implement security best practices",
        ],
        technologies: [
          "Python",
          "Django",
          "React.js",
          "PostgreSQL",
          "Docker",
          "AWS",
          "Git",
          "REST APIs",
        ],
        achievements: [
          "Reduced application load time by 40% through optimization",
          "Led team of 4 developers on major product redesign",
          "Implemented CI/CD pipeline reducing deployment time by 60%",
        ],
        companyWebsite: "https://techvision.com.bd",
      },
      {
        id: 2,
        jobTitle: "Software Developer",
        company: "InnovateTech Solutions",
        location: "Dhaka, Bangladesh",
        employmentType: "Full-time",
        startDate: "June 2022",
        endDate: "December 2022",
        duration: "7 months",
        status: "Completed",
        description:
          "Developed web applications and mobile solutions using modern frameworks. Worked on e-commerce platforms and healthcare management systems with focus on user experience and performance.",
        keyResponsibilities: [
          "Develop responsive web applications using React and Vue.js",
          "Build RESTful APIs using Node.js and Express",
          "Integrate third-party services and payment gateways",
          "Perform testing and debugging of applications",
          "Participate in agile development processes",
        ],
        technologies: [
          "JavaScript",
          "React",
          "Node.js",
          "MongoDB",
          "Express",
          "Vue.js",
          "HTML/CSS",
        ],
        achievements: [
          "Delivered 3 major projects ahead of schedule",
          "Improved code quality through implementation of ESLint standards",
          "Contributed to 25% increase in client satisfaction scores",
        ],
        companyWebsite: "https://innovatetech.com",
      },
    ],

    // Internship Experience
    internshipExperience: data?.internshipExperience || [
      {
        id: 1,
        jobTitle: "Software Development Intern",
        company: "Digital Innovation Hub",
        location: "Dhaka, Bangladesh",
        duration: "3 months",
        startDate: "March 2022",
        endDate: "May 2022",
        description:
          "Gained hands-on experience in full-stack development. Worked on real-world projects involving web development, database design, and API integration.",
        projects: [
          "Student Management System using Django",
          "E-commerce API development",
          "Frontend components with React",
        ],
        technologies: ["Python", "Django", "React", "MySQL", "Git"],
        skills: [
          "Web Development",
          "Database Design",
          "API Development",
          "Team Collaboration",
        ],
        supervisor: "Md. Rashidul Islam",
        certificate: "Excellence in Software Development",
      },
    ],

    // Research Experience (Academic/Professional)
    researchExperience: data?.researchExperience || [
      {
        id: 1,
        title: "Research Assistant",
        institution: "University of Dhaka",
        department: "Computer Science Department",
        supervisor: "Prof. Dr. Sarah Ahmed",
        startDate: "January 2023",
        endDate: "Present",
        duration: "1 year 8 months",
        projectTitle:
          "Machine Learning Applications in Healthcare Data Analysis",
        description:
          "Conducting research on applying machine learning algorithms to analyze healthcare data for early disease detection and personalized medicine applications.",
        responsibilities: [
          "Literature review on ML applications in healthcare",
          "Data preprocessing and feature engineering",
          "Implementation of ML models using Python and TensorFlow",
          "Statistical analysis and result interpretation",
          "Preparation of research papers and presentations",
        ],
        technologies: [
          "Python",
          "TensorFlow",
          "Pandas",
          "Scikit-learn",
          "R",
          "MATLAB",
        ],
        publications: [
          "ML-based Early Detection System for Chronic Diseases (Under Review)",
          "Healthcare Data Mining: A Comprehensive Survey (Published in IEEE)",
        ],
        skills: [
          "Research Methodology",
          "Statistical Analysis",
          "Machine Learning",
          "Academic Writing",
          "Data Visualization",
        ],
      },
    ],

    // Teaching Experience
    teachingExperience: data?.teachingExperience || [
      {
        id: 1,
        role: "Part-time Lecturer",
        institution: "Metropolitan University",
        department: "Computer Science & Engineering",
        courses: [
          "Introduction to Programming",
          "Web Development Fundamentals",
        ],
        startDate: "September 2023",
        endDate: "Present",
        duration: "1 year",
        students: 120,
        description:
          "Teaching undergraduate courses in computer science with focus on practical programming skills and modern web development technologies.",
        responsibilities: [
          "Deliver lectures on programming fundamentals and web development",
          "Design and grade assignments and examinations",
          "Mentor students on projects and career guidance",
          "Develop course materials and practical exercises",
        ],
        achievements: [
          "Student satisfaction rating: 4.8/5.0",
          "Designed new practical curriculum for web development course",
          "Mentored 15 students for internship placements",
        ],
      },
      {
        id: 2,
        role: "Teaching Assistant",
        institution: "NITER",
        department: "Computer Science & Engineering",
        courses: ["Data Structures", "Algorithms", "Database Management"],
        startDate: "January 2021",
        endDate: "December 2021",
        duration: "1 year",
        students: 80,
        description:
          "Assisted professors in conducting lab sessions, grading assignments, and providing academic support to undergraduate students.",
        responsibilities: [
          "Conduct lab sessions for programming courses",
          "Grade assignments and provide detailed feedback",
          "Hold office hours for student consultations",
          "Assist in exam preparation and invigilation",
        ],
        achievements: [
          "Helped improve overall class performance by 15%",
          "Developed automated grading system for programming assignments",
          "Received appreciation letter from department head",
        ],
      },
    ],

    // Freelance & Project Work
    freelanceExperience: data?.freelanceExperience || [
      {
        id: 1,
        role: "Freelance Full Stack Developer",
        platform: "Upwork & Fiverr",
        startDate: "August 2021",
        endDate: "Present",
        duration: "3+ years",
        clientsServed: 25,
        projectsCompleted: 40,
        rating: "4.9/5.0",
        description:
          "Providing web development services to international clients. Specialized in custom web applications, e-commerce solutions, and API development.",
        serviceTypes: [
          "Custom Web Application Development",
          "E-commerce Website Development",
          "API Development & Integration",
          "Website Redesign & Optimization",
          "Mobile App Backend Development",
        ],
        technologies: [
          "Django",
          "React",
          "Node.js",
          "Python",
          "JavaScript",
          "PostgreSQL",
          "MongoDB",
        ],
        achievements: [
          "Maintained 4.9/5 star rating across 40+ projects",
          "Generated $15,000+ in revenue",
          "100% project delivery on time",
          "Repeat clients: 60%",
        ],
        notableProjects: [
          "E-commerce platform for fashion retailer (React + Django)",
          "Healthcare management system for clinic (Full-stack)",
          "Real estate listing platform with map integration",
        ],
      },
    ],

    // Volunteer Experience
    volunteerExperience: data?.volunteerExperience || [
      {
        id: 1,
        role: "Technical Mentor",
        organization: "Code for Bangladesh",
        startDate: "June 2022",
        endDate: "Present",
        duration: "2+ years",
        description:
          "Mentoring young developers and contributing to open-source projects that benefit the local community. Focus on education technology and digital literacy programs.",
        activities: [
          "Mentor students in programming bootcamps",
          "Contribute to open-source educational platforms",
          "Organize coding workshops for underprivileged youth",
          "Review and improve educational content",
        ],
        impact: [
          "Mentored 50+ students in programming",
          "Contributed to 3 major open-source projects",
          "Organized 12 workshops reaching 300+ participants",
        ],
        skills: [
          "Mentoring",
          "Community Building",
          "Technical Writing",
          "Public Speaking",
        ],
      },
      {
        id: 2,
        role: "IT Support Volunteer",
        organization: "Local NGO - Digital Bangladesh Initiative",
        startDate: "January 2021",
        endDate: "May 2021",
        duration: "5 months",
        description:
          "Provided IT support and digital literacy training to rural communities as part of the Digital Bangladesh initiative.",
        activities: [
          "Set up computer labs in rural schools",
          "Train teachers on basic computer skills",
          "Maintain and troubleshoot computer systems",
          "Develop simple educational software",
        ],
        impact: [
          "Set up 5 computer labs serving 500+ students",
          "Trained 25 teachers in digital literacy",
          "Reduced technical issues by 70% through preventive maintenance",
        ],
        skills: [
          "Technical Support",
          "Training & Development",
          "Community Service",
        ],
      },
    ],

    // Professional Skills developed through experience
    professionalSkills: data?.professionalSkills || [
      "Team Leadership",
      "Project Management",
      "Client Communication",
      "Problem Solving",
      "Code Review",
      "Agile Methodologies",
      "Technical Documentation",
      "Mentoring",
      "Time Management",
      "Quality Assurance",
    ],

    // Career Highlights
    careerHighlights: data?.careerHighlights || [
      "Led development team of 4 developers on major product redesign",
      "Reduced application load time by 40% through performance optimization",
      "Maintained 4.9/5 star rating on freelance platforms",
      "Mentored 50+ students in programming and career development",
      "Published research paper in IEEE conference",
      "Generated $15,000+ revenue through freelance projects",
      "Improved team productivity by 30% through process optimization",
    ],
  });

  const [saveAlert, setSaveAlert] = useState(null);
  const [newSkill, setNewSkill] = useState("");
  const [newHighlight, setNewHighlight] = useState("");

  const handleSave = () => {
    if (handleEdit) {
      handleEdit("experience", editedData);
    }
    setIsEditing(false);
    setSaveAlert({
      type: "success",
      message: "Experience section updated successfully!",
    });
    setTimeout(() => setSaveAlert(null), 3000);
  };

  const handleCancel = () => {
    setEditedData({
      professionalExperience: data?.professionalExperience || [],
      internshipExperience: data?.internshipExperience || [],
      researchExperience: data?.researchExperience || [],
      teachingExperience: data?.teachingExperience || [],
      freelanceExperience: data?.freelanceExperience || [],
      volunteerExperience: data?.volunteerExperience || [],
      professionalSkills: data?.professionalSkills || [],
      careerHighlights: data?.careerHighlights || [],
    });
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && editedData.professionalSkills.length < 15) {
      setEditedData((prev) => ({
        ...prev,
        professionalSkills: [...prev.professionalSkills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    setEditedData((prev) => ({
      ...prev,
      professionalSkills: prev.professionalSkills.filter((_, i) => i !== index),
    }));
  };

  const addHighlight = () => {
    if (newHighlight.trim() && editedData.careerHighlights.length < 10) {
      setEditedData((prev) => ({
        ...prev,
        careerHighlights: [...prev.careerHighlights, newHighlight.trim()],
      }));
      setNewHighlight("");
    }
  };

  const removeHighlight = (index) => {
    setEditedData((prev) => ({
      ...prev,
      careerHighlights: prev.careerHighlights.filter((_, i) => i !== index),
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

  // Reusable Experience Card Component
  const ExperienceCard = ({
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
          Experience Section
        </Typography>
        <Typography variant="body1" sx={{ color: "#888" }}>
          Manage your professional experience, internships, and career
          achievements
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
        <ExperienceCard hover={false}>
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
                Experience Section Management
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Comprehensive professional and academic experience portfolio
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
                Edit Experience
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
        </ExperienceCard>
      </motion.div>

      {/* Professional Experience Section */}
      <motion.div variants={itemVariants}>
        <ExperienceCard
          icon={<Work />}
          title="Professional Experience"
          description="Full-time positions, career progression, and professional achievements"
        >
          {editedData.professionalExperience.map((job, index) => (
            <Box
              key={job.id}
              sx={{
                mb: 4,
                p: 3,
                backgroundColor: "rgba(76, 175, 80, 0.05)",
                border: "1px solid rgba(76, 175, 80, 0.2)",
                borderRadius: 3,
                position: "relative",
              }}
            >
              {/* Job Header */}
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
                    {job.jobTitle}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#4CAF50", fontWeight: 500, mb: 1 }}
                  >
                    {job.company}
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
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocationOn sx={{ color: "#888", mr: 1, fontSize: 16 }} />
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        {job.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CalendarToday
                        sx={{ color: "#888", mr: 1, fontSize: 16 }}
                      />
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        {job.startDate} - {job.endDate}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Timeline sx={{ color: "#888", mr: 1, fontSize: 16 }} />
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        {job.duration}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Chip
                    label={job.status}
                    size="small"
                    sx={{
                      backgroundColor:
                        job.status === "Current"
                          ? "rgba(76, 175, 80, 0.2)"
                          : "rgba(33, 150, 243, 0.2)",
                      color: job.status === "Current" ? "#4CAF50" : "#2196F3",
                      fontWeight: 600,
                      mb: 1,
                    }}
                  />
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {job.employmentType}
                  </Typography>
                </Box>
              </Box>

              {/* Job Description */}
              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 3 }}
              >
                {job.description}
              </Typography>

              {/* Key Responsibilities */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#4CAF50", mb: 2, fontWeight: 600 }}
                >
                  Key Responsibilities
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {job.keyResponsibilities.map((responsibility, idx) => (
                    <Box
                      key={idx}
                      sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                    >
                      <Assignment
                        sx={{ color: "#4CAF50", mr: 2, fontSize: 16, mt: 0.5 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", lineHeight: 1.5 }}
                      >
                        {responsibility}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Technologies */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#4CAF50", mb: 1, fontWeight: 600 }}
                >
                  Technologies & Tools
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {job.technologies.map((tech, idx) => (
                    <Chip
                      key={idx}
                      label={tech}
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

              {/* Key Achievements */}
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#4CAF50", mb: 2, fontWeight: 600 }}
                >
                  Key Achievements
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {job.achievements.map((achievement, idx) => (
                    <Box
                      key={idx}
                      sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                    >
                      <EmojiEvents
                        sx={{ color: "#FFC107", mr: 2, fontSize: 16, mt: 0.5 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", lineHeight: 1.5 }}
                      >
                        {achievement}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </ExperienceCard>
      </motion.div>

      {/* Teaching Experience Section */}
      <motion.div variants={itemVariants}>
        <ExperienceCard
          icon={<School />}
          title="Teaching Experience"
          description="Academic teaching roles, course instruction, and student mentoring"
        >
          {editedData.teachingExperience.map((teaching, index) => (
            <Box
              key={teaching.id}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "rgba(156, 39, 176, 0.05)",
                border: "1px solid rgba(156, 39, 176, 0.2)",
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
                    {teaching.role}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#9C27B0", fontWeight: 500, mb: 1 }}
                  >
                    {teaching.institution}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888", mb: 1 }}>
                    {teaching.department}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
                    {teaching.startDate} - {teaching.endDate} •{" "}
                    {teaching.duration}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#9C27B0", fontWeight: 600 }}
                  >
                    {teaching.students} Students
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {teaching.description}
              </Typography>

              {/* Courses Taught */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#9C27B0", mb: 1, fontWeight: 600 }}
                >
                  Courses Taught
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {teaching.courses.map((course, idx) => (
                    <Chip
                      key={idx}
                      label={course}
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

              {/* Achievements */}
              {teaching.achievements && (
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#9C27B0", mb: 1, fontWeight: 600 }}
                  >
                    Teaching Achievements
                  </Typography>
                  <Box sx={{ pl: 2 }}>
                    {teaching.achievements.map((achievement, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          mb: 1,
                        }}
                      >
                        <EmojiEvents
                          sx={{
                            color: "#FFC107",
                            mr: 2,
                            fontSize: 16,
                            mt: 0.5,
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: "#fff", lineHeight: 1.5 }}
                        >
                          {achievement}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </ExperienceCard>
      </motion.div>

      {/* Freelance Experience Section */}
      <motion.div variants={itemVariants}>
        <ExperienceCard
          icon={<Computer />}
          title="Freelance & Project Work"
          description="Independent consulting, freelance projects, and client work"
        >
          {editedData.freelanceExperience.map((freelance, index) => (
            <Box
              key={freelance.id}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "rgba(255, 152, 0, 0.05)",
                border: "1px solid rgba(255, 152, 0, 0.2)",
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
                    {freelance.role}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#FF9800", fontWeight: 500, mb: 1 }}
                  >
                    {freelance.platform}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
                    {freelance.startDate} - {freelance.endDate} •{" "}
                    {freelance.duration}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#FF9800", fontWeight: 600, mb: 0.5 }}
                  >
                    ⭐ {freelance.rating}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {freelance.clientsServed} Clients
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {freelance.projectsCompleted} Projects
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {freelance.description}
              </Typography>

              {/* Service Types */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#FF9800", mb: 1, fontWeight: 600 }}
                >
                  Service Types
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {freelance.serviceTypes.map((service, idx) => (
                    <Box
                      key={idx}
                      sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                    >
                      <Code sx={{ color: "#FF9800", mr: 1, fontSize: 16 }} />
                      <Typography variant="body2" sx={{ color: "#fff" }}>
                        {service}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Technologies */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#FF9800", mb: 1, fontWeight: 600 }}
                >
                  Technologies Used
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {freelance.technologies.map((tech, idx) => (
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

              {/* Achievements */}
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#FF9800", mb: 1, fontWeight: 600 }}
                >
                  Key Achievements
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {freelance.achievements.map((achievement, idx) => (
                    <Box
                      key={idx}
                      sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                    >
                      <TrendingUp
                        sx={{ color: "#4CAF50", mr: 2, fontSize: 16, mt: 0.5 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", lineHeight: 1.5 }}
                      >
                        {achievement}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </ExperienceCard>
      </motion.div>

      {/* Volunteer Experience Section */}
      <motion.div variants={itemVariants}>
        <ExperienceCard
          icon={<VolunteerActivism />}
          title="Volunteer Experience"
          description="Community service, mentoring, and social impact initiatives"
        >
          {editedData.volunteerExperience.map((volunteer, index) => (
            <Box
              key={volunteer.id}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "rgba(233, 30, 99, 0.05)",
                border: "1px solid rgba(233, 30, 99, 0.2)",
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
                    {volunteer.role}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#E91E63", fontWeight: 500, mb: 1 }}
                  >
                    {volunteer.organization}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
                    {volunteer.startDate} - {volunteer.endDate} •{" "}
                    {volunteer.duration}
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
              >
                {volunteer.description}
              </Typography>

              {/* Activities */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#E91E63", mb: 1, fontWeight: 600 }}
                >
                  Key Activities
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {volunteer.activities.map((activity, idx) => (
                    <Box
                      key={idx}
                      sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                    >
                      <VolunteerActivism
                        sx={{ color: "#E91E63", mr: 2, fontSize: 16, mt: 0.5 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", lineHeight: 1.5 }}
                      >
                        {activity}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Impact */}
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#E91E63", mb: 1, fontWeight: 600 }}
                >
                  Impact & Results
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {volunteer.impact.map((impact, idx) => (
                    <Box
                      key={idx}
                      sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                    >
                      <TrendingUp
                        sx={{ color: "#4CAF50", mr: 2, fontSize: 16, mt: 0.5 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", lineHeight: 1.5 }}
                      >
                        {impact}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </ExperienceCard>
      </motion.div>

      {/* Professional Skills Section */}
      <motion.div variants={itemVariants}>
        <ExperienceCard
          icon={<TrendingUp />}
          title="Professional Skills"
          description="Skills developed through professional experience"
        >
          <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
            Max 15 professional skills
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {editedData.professionalSkills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={isEditing ? () => removeSkill(index) : undefined}
                deleteIcon={isEditing ? <Close /> : undefined}
                sx={{
                  backgroundColor: "rgba(63, 81, 181, 0.2)",
                  color: "#3F51B5",
                  border: "1px solid rgba(63, 81, 181, 0.5)",
                  fontWeight: 600,
                  "& .MuiChip-deleteIcon": {
                    color: "#3F51B5",
                    "&:hover": { color: "#7986CB" },
                  },
                }}
              />
            ))}
          </Box>

          {isEditing && editedData.professionalSkills.length < 15 && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Add new professional skill"
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
        </ExperienceCard>
      </motion.div>

      {/* Career Highlights Section */}
      <motion.div variants={itemVariants}>
        <ExperienceCard
          icon={<EmojiEvents />}
          title="Career Highlights"
          description="Major achievements and career milestones"
        >
          <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
            Max 10 career highlights
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
            {editedData.careerHighlights.map((highlight, index) => (
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
                  <EmojiEvents sx={{ color: "#FFC107", mr: 2, fontSize: 20 }} />
                  <Typography variant="body1" sx={{ color: "#fff" }}>
                    {highlight}
                  </Typography>
                </Box>
                {isEditing && (
                  <IconButton
                    onClick={() => removeHighlight(index)}
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

          {isEditing && editedData.careerHighlights.length < 10 && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Add new career highlight"
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addHighlight()}
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
                onClick={addHighlight}
                disabled={!newHighlight.trim()}
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
        </ExperienceCard>
      </motion.div>
    </motion.div>
  );
};

export default Experience;
