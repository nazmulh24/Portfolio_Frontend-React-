import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  Chip,
  IconButton,
  Alert,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Edit,
  Save,
  Cancel,
  Code,
  Storage,
  Cloud,
  Security,
  Psychology,
  Language,
  School,
  Work,
  Star,
  TrendingUp,
  Assessment,
  ExpandMore,
  CheckCircle,
  Schedule,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Skills = () => {
  const { dashboardData, handleEdit } = useOutletContext();
  const data = dashboardData?.skills;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    // Technical Skills
    technicalSkills: data?.technicalSkills || [
      {
        id: 1,
        category: "Programming Languages",
        icon: "Code",
        skills: [
          {
            name: "Python",
            proficiency: 95,
            level: "Expert",
            yearsOfExperience: 6,
            lastUsed: "2024-09-20",
            projects: 45,
            certifications: ["Python Institute PCAP", "Django Developer"],
            frameworks: ["Django", "FastAPI", "Flask", "Pandas", "NumPy"],
            description:
              "Advanced Python development for web applications, data analysis, and automation",
          },
          {
            name: "JavaScript",
            proficiency: 90,
            level: "Expert",
            yearsOfExperience: 5,
            lastUsed: "2024-09-22",
            projects: 38,
            certifications: ["freeCodeCamp Full Stack"],
            frameworks: ["React", "Node.js", "Express", "Next.js", "Vue.js"],
            description:
              "Full-stack JavaScript development with modern ES6+ features and async programming",
          },
          {
            name: "TypeScript",
            proficiency: 85,
            level: "Advanced",
            yearsOfExperience: 3,
            lastUsed: "2024-09-18",
            projects: 22,
            certifications: [],
            frameworks: ["Angular", "React", "NestJS"],
            description:
              "Strongly-typed JavaScript development for large-scale applications",
          },
          {
            name: "Java",
            proficiency: 80,
            level: "Advanced",
            yearsOfExperience: 4,
            lastUsed: "2024-08-15",
            projects: 18,
            certifications: ["Oracle Java SE Certified"],
            frameworks: ["Spring Boot", "Spring MVC", "Hibernate"],
            description:
              "Enterprise Java development with Spring ecosystem and microservices",
          },
          {
            name: "Go",
            proficiency: 70,
            level: "Intermediate",
            yearsOfExperience: 2,
            lastUsed: "2024-07-10",
            projects: 8,
            certifications: [],
            frameworks: ["Gin", "Echo", "Fiber"],
            description:
              "Concurrent programming and high-performance backend services",
          },
        ],
      },
      {
        id: 2,
        category: "Web Development",
        icon: "Language",
        skills: [
          {
            name: "React",
            proficiency: 92,
            level: "Expert",
            yearsOfExperience: 4,
            lastUsed: "2024-09-22",
            projects: 35,
            certifications: ["React Developer Certification"],
            frameworks: ["Next.js", "Gatsby", "React Native"],
            description:
              "Advanced React development with hooks, context, and modern patterns",
          },
          {
            name: "Django",
            proficiency: 95,
            level: "Expert",
            yearsOfExperience: 5,
            lastUsed: "2024-09-20",
            projects: 42,
            certifications: ["Django Outstanding Contributor"],
            frameworks: ["Django REST Framework", "Channels", "Celery"],
            description:
              "Full-stack Django development with REST APIs and real-time features",
          },
          {
            name: "Node.js",
            proficiency: 88,
            level: "Advanced",
            yearsOfExperience: 4,
            lastUsed: "2024-09-15",
            projects: 28,
            certifications: [],
            frameworks: ["Express.js", "NestJS", "Fastify"],
            description: "Server-side JavaScript development and API design",
          },
          {
            name: "HTML5/CSS3",
            proficiency: 90,
            level: "Expert",
            yearsOfExperience: 6,
            lastUsed: "2024-09-22",
            projects: 50,
            certifications: ["W3C Web Standards"],
            frameworks: ["Sass/SCSS", "Tailwind CSS", "Bootstrap"],
            description:
              "Modern web markup and styling with responsive design principles",
          },
        ],
      },
      {
        id: 3,
        category: "Database & Storage",
        icon: "Storage",
        skills: [
          {
            name: "PostgreSQL",
            proficiency: 88,
            level: "Advanced",
            yearsOfExperience: 5,
            lastUsed: "2024-09-20",
            projects: 32,
            certifications: ["PostgreSQL Certified Professional"],
            frameworks: ["SQLAlchemy", "Django ORM", "Prisma"],
            description:
              "Advanced SQL queries, performance optimization, and database design",
          },
          {
            name: "MongoDB",
            proficiency: 82,
            level: "Advanced",
            yearsOfExperience: 3,
            lastUsed: "2024-09-10",
            projects: 18,
            certifications: ["MongoDB Developer"],
            frameworks: ["Mongoose", "PyMongo", "MongoEngine"],
            description:
              "NoSQL database design, aggregation pipelines, and document modeling",
          },
          {
            name: "Redis",
            proficiency: 75,
            level: "Intermediate",
            yearsOfExperience: 3,
            lastUsed: "2024-08-25",
            projects: 15,
            certifications: [],
            frameworks: ["Redis-py", "node_redis", "Celery"],
            description:
              "Caching strategies, session management, and message queuing",
          },
          {
            name: "MySQL",
            proficiency: 85,
            level: "Advanced",
            yearsOfExperience: 4,
            lastUsed: "2024-07-30",
            projects: 25,
            certifications: ["MySQL Database Administrator"],
            frameworks: ["MySQL Connector", "Sequelize"],
            description: "Relational database management and optimization",
          },
        ],
      },
      {
        id: 4,
        category: "Cloud & DevOps",
        icon: "Cloud",
        skills: [
          {
            name: "AWS",
            proficiency: 85,
            level: "Advanced",
            yearsOfExperience: 4,
            lastUsed: "2024-09-18",
            projects: 28,
            certifications: ["AWS Solutions Architect Associate"],
            frameworks: ["boto3", "AWS CDK", "Serverless"],
            description:
              "Cloud architecture, serverless computing, and infrastructure management",
          },
          {
            name: "Docker",
            proficiency: 88,
            level: "Advanced",
            yearsOfExperience: 4,
            lastUsed: "2024-09-19",
            projects: 35,
            certifications: ["Docker Certified Associate"],
            frameworks: ["Docker Compose", "Kubernetes"],
            description:
              "Containerization, orchestration, and microservices deployment",
          },
          {
            name: "Kubernetes",
            proficiency: 78,
            level: "Intermediate",
            yearsOfExperience: 2,
            lastUsed: "2024-08-20",
            projects: 12,
            certifications: ["Certified Kubernetes Administrator"],
            frameworks: ["Helm", "Istio", "Prometheus"],
            description:
              "Container orchestration, service mesh, and cluster management",
          },
          {
            name: "GitHub Actions",
            proficiency: 82,
            level: "Advanced",
            yearsOfExperience: 3,
            lastUsed: "2024-09-21",
            projects: 25,
            certifications: [],
            frameworks: ["CI/CD Pipelines", "Workflow Automation"],
            description:
              "Automated testing, deployment, and continuous integration",
          },
        ],
      },
    ],

    // Soft Skills
    softSkills: data?.softSkills || [
      {
        id: 5,
        category: "Leadership & Communication",
        icon: "Psychology",
        skills: [
          {
            name: "Team Leadership",
            proficiency: 88,
            level: "Advanced",
            description:
              "Leading development teams, mentoring junior developers, and driving project success",
            examples: [
              "Led 5+ development teams",
              "Mentored 15+ developers",
              "Managed $2M+ projects",
            ],
            development:
              "Continuous improvement through leadership workshops and peer feedback",
          },
          {
            name: "Technical Communication",
            proficiency: 92,
            level: "Expert",
            description:
              "Translating complex technical concepts for diverse audiences and stakeholders",
            examples: [
              "50+ technical presentations",
              "Documentation expert",
              "Cross-team collaboration",
            ],
            development:
              "Regular speaking engagements and technical writing practice",
          },
          {
            name: "Project Management",
            proficiency: 85,
            level: "Advanced",
            description:
              "Agile methodology, sprint planning, and cross-functional team coordination",
            examples: [
              "PMP certified",
              "20+ successful projects",
              "Agile/Scrum master",
            ],
            development: "Advanced project management methodologies and tools",
          },
          {
            name: "Problem Solving",
            proficiency: 90,
            level: "Expert",
            description:
              "Analytical thinking, debugging complex systems, and innovative solution design",
            examples: [
              "Critical system optimizations",
              "Algorithm design",
              "Architecture decisions",
            ],
            development:
              "Continuous learning and exposure to diverse technical challenges",
          },
        ],
      },
      {
        id: 6,
        category: "Professional Skills",
        icon: "Work",
        skills: [
          {
            name: "Code Review",
            proficiency: 87,
            level: "Advanced",
            description:
              "Quality assurance, mentoring through feedback, and maintaining coding standards",
            examples: [
              "1000+ code reviews",
              "Established review processes",
              "Quality improvement",
            ],
            development: "Best practices learning and peer review techniques",
          },
          {
            name: "System Design",
            proficiency: 85,
            level: "Advanced",
            description:
              "Scalable architecture design, microservices, and distributed systems planning",
            examples: [
              "Enterprise system designs",
              "Microservice architectures",
              "Scalability solutions",
            ],
            development:
              "System design interview practice and architecture patterns study",
          },
          {
            name: "Mentoring",
            proficiency: 90,
            level: "Expert",
            description:
              "Knowledge transfer, career guidance, and technical skill development for others",
            examples: [
              "15+ mentees",
              "Training programs",
              "Knowledge sharing sessions",
            ],
            development: "Mentoring methodologies and coaching techniques",
          },
          {
            name: "Research & Learning",
            proficiency: 93,
            level: "Expert",
            description:
              "Staying current with technology trends and rapid skill acquisition",
            examples: [
              "Research publications",
              "Conference presentations",
              "Continuous learning",
            ],
            development:
              "Academic research methods and rapid prototyping techniques",
          },
        ],
      },
    ],

    // Skill Development Timeline
    skillDevelopment: data?.skillDevelopment || [
      {
        year: 2024,
        skills: [
          "Kubernetes",
          "TypeScript Advanced",
          "AWS Solutions Architecture",
        ],
        achievements: [
          "CKA Certification",
          "AWS SA Associate",
          "Led microservices migration",
        ],
        focus: "Cloud native development and advanced TypeScript patterns",
      },
      {
        year: 2023,
        skills: ["React Advanced Patterns", "Docker Compose", "System Design"],
        achievements: [
          "React Expert Certification",
          "DCA Certification",
          "Architecture lead role",
        ],
        focus: "Frontend expertise and containerization mastery",
      },
      {
        year: 2022,
        skills: [
          "Django REST Framework",
          "PostgreSQL Optimization",
          "Team Leadership",
        ],
        achievements: [
          "Django Outstanding Contributor",
          "PMP Certification",
          "Team lead promotion",
        ],
        focus: "Backend specialization and leadership development",
      },
      {
        year: 2021,
        skills: ["Python Advanced", "JavaScript ES6+", "Agile Methodologies"],
        achievements: [
          "PCAP Certification",
          "Scrum Master",
          "Full-stack proficiency",
        ],
        focus: "Full-stack development foundation and project management",
      },
      {
        year: 2020,
        skills: ["Web Development Basics", "Database Design", "Git/GitHub"],
        achievements: [
          "First professional role",
          "Multiple projects completed",
        ],
        focus: "Core development skills and version control mastery",
      },
    ],

    // Skill Statistics
    skillStats: data?.skillStats || {
      totalSkills: 28,
      expertLevel: 8,
      advancedLevel: 12,
      intermediateLevel: 8,
      averageProficiency: 85.2,
      technicalSkills: 20,
      softSkills: 8,
      certifications: 15,
      yearsOfExperience: 6,
      projectsCompleted: 156,
      frameworksUsed: 45,
    },

    // Learning Goals
    learningGoals: data?.learningGoals || [
      {
        id: 1,
        skill: "Machine Learning",
        currentLevel: 40,
        targetLevel: 80,
        targetDate: "2025-06-30",
        priority: "High",
        status: "In Progress",
        resources: [
          "Stanford CS229",
          "Hands-on ML Book",
          "Kaggle Competitions",
        ],
        milestones: [
          { name: "Complete ML Course", completed: true, date: "2024-12-15" },
          { name: "First ML Project", completed: false, date: "2025-02-28" },
          { name: "Deploy ML Model", completed: false, date: "2025-05-15" },
        ],
      },
      {
        id: 2,
        skill: "Rust Programming",
        currentLevel: 20,
        targetLevel: 70,
        targetDate: "2025-12-31",
        priority: "Medium",
        status: "Planning",
        resources: [
          "Rust Book",
          "Rustlings Exercises",
          "Open Source Contributions",
        ],
        milestones: [
          {
            name: "Basic Syntax Mastery",
            completed: false,
            date: "2025-03-31",
          },
          { name: "First Rust Project", completed: false, date: "2025-07-31" },
          {
            name: "Performance Optimization",
            completed: false,
            date: "2025-11-30",
          },
        ],
      },
      {
        id: 3,
        skill: "GraphQL",
        currentLevel: 30,
        targetLevel: 85,
        targetDate: "2025-04-30",
        priority: "High",
        status: "In Progress",
        resources: [
          "GraphQL Documentation",
          "Apollo Tutorials",
          "Hands-on Projects",
        ],
        milestones: [
          { name: "GraphQL Fundamentals", completed: true, date: "2024-11-30" },
          { name: "Apollo Server Setup", completed: false, date: "2025-02-15" },
          {
            name: "Production Deployment",
            completed: false,
            date: "2025-04-15",
          },
        ],
      },
    ],
  });

  const [saveAlert, setSaveAlert] = useState(null);

  const handleSave = () => {
    if (handleEdit) {
      handleEdit("skills", editedData);
    }
    setIsEditing(false);
    setSaveAlert({
      type: "success",
      message: "Skills section updated successfully!",
    });
    setTimeout(() => setSaveAlert(null), 3000);
  };

  const handleCancel = () => {
    setEditedData({
      technicalSkills: data?.technicalSkills || [],
      softSkills: data?.softSkills || [],
      skillDevelopment: data?.skillDevelopment || [],
      skillStats: data?.skillStats || {},
      learningGoals: data?.learningGoals || [],
    });
    setIsEditing(false);
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

  // Reusable Skill Card Component
  const SkillCard = ({ icon, title, description, children, hover = true }) => (
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

  // Get proficiency color
  const getProficiencyColor = (proficiency) => {
    if (proficiency >= 90) return "#4CAF50"; // Expert - Green
    if (proficiency >= 75) return "#2196F3"; // Advanced - Blue
    if (proficiency >= 60) return "#FF9800"; // Intermediate - Orange
    return "#9E9E9E"; // Beginner - Gray
  };

  // Get level color
  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "expert":
        return "#4CAF50";
      case "advanced":
        return "#2196F3";
      case "intermediate":
        return "#FF9800";
      case "beginner":
        return "#9E9E9E";
      default:
        return "#888";
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "#f44336";
      case "medium":
        return "#FF9800";
      case "low":
        return "#4CAF50";
      default:
        return "#888";
    }
  };

  // Get icon component
  const getIconComponent = (iconName) => {
    const icons = {
      Code: <Code />,
      Storage: <Storage />,
      Cloud: <Cloud />,
      Security: <Security />,
      Language: <Language />,
      Psychology: <Psychology />,
      Work: <Work />,
    };
    return icons[iconName] || <Code />;
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
          Skills & Expertise
        </Typography>
        <Typography variant="body1" sx={{ color: "#888" }}>
          Technical proficiencies, soft skills, and continuous learning journey
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
        <SkillCard hover={false}>
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
                Skills Management
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Technical expertise, soft skills, and professional development
                tracking
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
                Edit Skills
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
        </SkillCard>
      </motion.div>

      {/* Skills Statistics Overview */}
      <motion.div variants={itemVariants}>
        <SkillCard
          icon={<Assessment />}
          title="Skills Overview"
          description="Comprehensive statistics and proficiency metrics"
        >
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#2196F3", fontWeight: 700 }}
                >
                  {editedData.skillStats.totalSkills}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Total Skills
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#4CAF50", fontWeight: 700 }}
                >
                  {editedData.skillStats.expertLevel}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Expert Level
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#FF9800", fontWeight: 700 }}
                >
                  {editedData.skillStats.averageProficiency}%
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Avg Proficiency
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#9C27B0", fontWeight: 700 }}
                >
                  {editedData.skillStats.certifications}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  Certifications
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Additional Metrics */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={4} md={2}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#00BCD4", fontWeight: 600 }}
                >
                  {editedData.skillStats.technicalSkills}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Technical
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4} md={2}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#E91E63", fontWeight: 600 }}
                >
                  {editedData.skillStats.softSkills}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Soft Skills
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4} md={2}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#795548", fontWeight: 600 }}
                >
                  {editedData.skillStats.yearsOfExperience}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Years Exp
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4} md={2}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#607D8B", fontWeight: 600 }}
                >
                  {editedData.skillStats.projectsCompleted}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Projects
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4} md={2}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#FF5722", fontWeight: 600 }}
                >
                  {editedData.skillStats.frameworksUsed}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Frameworks
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4} md={2}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#3F51B5", fontWeight: 600 }}
                >
                  {editedData.skillStats.advancedLevel}
                </Typography>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Advanced
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </SkillCard>
      </motion.div>

      {/* Technical Skills */}
      <motion.div variants={itemVariants}>
        <SkillCard
          icon={<Code />}
          title="Technical Skills"
          description="Programming languages, frameworks, and technical proficiencies"
        >
          {editedData.technicalSkills.map((category, categoryIndex) => (
            <Accordion
              key={category.id}
              sx={{
                backgroundColor: "rgba(33, 150, 243, 0.05)",
                border: "1px solid rgba(33, 150, 243, 0.2)",
                borderRadius: 2,
                mb: 2,
                "&:before": { display: "none" },
                "&.Mui-expanded": {
                  margin: "0 0 16px 0",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: "#2196F3" }} />}
                sx={{ p: 3 }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", width: "100%" }}
                >
                  {getIconComponent(category.icon)}
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", fontWeight: 600, ml: 2 }}
                  >
                    {category.category}
                  </Typography>
                  <Chip
                    label={`${category.skills.length} skills`}
                    size="small"
                    sx={{
                      ml: "auto",
                      backgroundColor: "rgba(33, 150, 243, 0.2)",
                      color: "#2196F3",
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ p: 3, pt: 0 }}>
                <Grid container spacing={3}>
                  {category.skills.map((skill, skillIndex) => (
                    <Grid item xs={12} md={6} key={skillIndex}>
                      <Box
                        sx={{
                          p: 3,
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderRadius: 3,
                          border: `1px solid ${getProficiencyColor(
                            skill.proficiency
                          )}30`,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ color: "#fff", fontWeight: 600 }}
                          >
                            {skill.name}
                          </Typography>
                          <Chip
                            label={skill.level}
                            size="small"
                            sx={{
                              backgroundColor: `${getLevelColor(
                                skill.level
                              )}20`,
                              color: getLevelColor(skill.level),
                              fontWeight: 600,
                            }}
                          />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 1,
                            }}
                          >
                            <Typography variant="body2" sx={{ color: "#888" }}>
                              Proficiency
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: getProficiencyColor(skill.proficiency),
                                fontWeight: 600,
                              }}
                            >
                              {skill.proficiency}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={skill.proficiency}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: "rgba(255, 255, 255, 0.1)",
                              "& .MuiLinearProgress-bar": {
                                borderRadius: 4,
                                backgroundColor: getProficiencyColor(
                                  skill.proficiency
                                ),
                              },
                            }}
                          />
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
                        >
                          {skill.description}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            mb: 2,
                            flexWrap: "wrap",
                          }}
                        >
                          <Typography variant="body2" sx={{ color: "#888" }}>
                            {skill.yearsOfExperience}y experience
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#888" }}>
                            {skill.projects} projects
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#888" }}>
                            Last used: {skill.lastUsed}
                          </Typography>
                        </Box>

                        {skill.frameworks && skill.frameworks.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Typography
                              variant="subtitle2"
                              sx={{ color: "#2196F3", mb: 1, fontWeight: 600 }}
                            >
                              Frameworks & Libraries
                            </Typography>
                            <Box
                              sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                            >
                              {skill.frameworks
                                .slice(0, 5)
                                .map((framework, idx) => (
                                  <Chip
                                    key={idx}
                                    label={framework}
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
                        )}

                        {skill.certifications &&
                          skill.certifications.length > 0 && (
                            <Box>
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  color: "#2196F3",
                                  mb: 1,
                                  fontWeight: 600,
                                }}
                              >
                                Certifications
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 1,
                                }}
                              >
                                {skill.certifications.map((cert, idx) => (
                                  <Chip
                                    key={idx}
                                    icon={<Star />}
                                    label={cert}
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
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </SkillCard>
      </motion.div>

      {/* Soft Skills */}
      <motion.div variants={itemVariants}>
        <SkillCard
          icon={<Psychology />}
          title="Soft Skills"
          description="Leadership, communication, and professional competencies"
        >
          {editedData.softSkills.map((category, categoryIndex) => (
            <Accordion
              key={category.id}
              sx={{
                backgroundColor: "rgba(156, 39, 176, 0.05)",
                border: "1px solid rgba(156, 39, 176, 0.2)",
                borderRadius: 2,
                mb: 2,
                "&:before": { display: "none" },
                "&.Mui-expanded": {
                  margin: "0 0 16px 0",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: "#9C27B0" }} />}
                sx={{ p: 3 }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", width: "100%" }}
                >
                  {getIconComponent(category.icon)}
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", fontWeight: 600, ml: 2 }}
                  >
                    {category.category}
                  </Typography>
                  <Chip
                    label={`${category.skills.length} skills`}
                    size="small"
                    sx={{
                      ml: "auto",
                      backgroundColor: "rgba(156, 39, 176, 0.2)",
                      color: "#9C27B0",
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ p: 3, pt: 0 }}>
                <Grid container spacing={3}>
                  {category.skills.map((skill, skillIndex) => (
                    <Grid item xs={12} md={6} key={skillIndex}>
                      <Box
                        sx={{
                          p: 3,
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderRadius: 3,
                          border: `1px solid ${getProficiencyColor(
                            skill.proficiency
                          )}30`,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ color: "#fff", fontWeight: 600 }}
                          >
                            {skill.name}
                          </Typography>
                          <Chip
                            label={skill.level}
                            size="small"
                            sx={{
                              backgroundColor: `${getLevelColor(
                                skill.level
                              )}20`,
                              color: getLevelColor(skill.level),
                              fontWeight: 600,
                            }}
                          />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 1,
                            }}
                          >
                            <Typography variant="body2" sx={{ color: "#888" }}>
                              Proficiency
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: getProficiencyColor(skill.proficiency),
                                fontWeight: 600,
                              }}
                            >
                              {skill.proficiency}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={skill.proficiency}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: "rgba(255, 255, 255, 0.1)",
                              "& .MuiLinearProgress-bar": {
                                borderRadius: 4,
                                backgroundColor: getProficiencyColor(
                                  skill.proficiency
                                ),
                              },
                            }}
                          />
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{ color: "#fff", lineHeight: 1.6, mb: 2 }}
                        >
                          {skill.description}
                        </Typography>

                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{ color: "#9C27B0", mb: 1, fontWeight: 600 }}
                          >
                            Examples & Achievements
                          </Typography>
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                          >
                            {skill.examples.map((example, idx) => (
                              <Chip
                                key={idx}
                                label={example}
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

                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{ color: "#9C27B0", mb: 1, fontWeight: 600 }}
                          >
                            Development Approach
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#888", fontStyle: "italic" }}
                          >
                            {skill.development}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </SkillCard>
      </motion.div>

      {/* Learning Goals */}
      <motion.div variants={itemVariants}>
        <SkillCard
          icon={<TrendingUp />}
          title="Learning Goals"
          description="Current skill development objectives and progress tracking"
        >
          {editedData.learningGoals.map((goal, index) => (
            <Box
              key={goal.id}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "rgba(76, 175, 80, 0.05)",
                border: "1px solid rgba(76, 175, 80, 0.2)",
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
                <Typography
                  variant="h6"
                  sx={{ color: "#fff", fontWeight: 600 }}
                >
                  {goal.skill}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Chip
                    label={goal.priority}
                    size="small"
                    sx={{
                      backgroundColor: `${getPriorityColor(goal.priority)}20`,
                      color: getPriorityColor(goal.priority),
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    label={goal.status}
                    size="small"
                    sx={{
                      backgroundColor:
                        goal.status === "In Progress"
                          ? "rgba(255, 152, 0, 0.2)"
                          : "rgba(158, 158, 158, 0.2)",
                      color:
                        goal.status === "In Progress" ? "#FF9800" : "#9E9E9E",
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    Progress: {goal.currentLevel}% → {goal.targetLevel}%
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#4CAF50", fontWeight: 600 }}
                  >
                    Target: {goal.targetDate}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(goal.currentLevel / goal.targetLevel) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                      backgroundColor: "#4CAF50",
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#4CAF50", mb: 1, fontWeight: 600 }}
                >
                  Learning Resources
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {goal.resources.map((resource, idx) => (
                    <Chip
                      key={idx}
                      label={resource}
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

              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#4CAF50", mb: 1, fontWeight: 600 }}
                >
                  Milestones
                </Typography>
                <Grid container spacing={2}>
                  {goal.milestones.map((milestone, idx) => (
                    <Grid item xs={12} md={4} key={idx}>
                      <Box
                        sx={{
                          p: 2,
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            color: milestone.completed ? "#4CAF50" : "#888",
                            mr: 1,
                          }}
                        >
                          {milestone.completed ? <CheckCircle /> : <Schedule />}
                        </IconButton>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ color: "#fff", fontWeight: 600 }}
                          >
                            {milestone.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#888" }}>
                            {milestone.date}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          ))}
        </SkillCard>
      </motion.div>

      {/* Skill Development Timeline */}
      <motion.div variants={itemVariants}>
        <SkillCard
          icon={<School />}
          title="Skill Development Timeline"
          description="Professional growth journey and yearly achievements"
        >
          {editedData.skillDevelopment.map((yearData, index) => (
            <Box
              key={yearData.year}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: "rgba(255, 152, 0, 0.05)",
                border: "1px solid rgba(255, 152, 0, 0.2)",
                borderRadius: 3,
                position: "relative",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography
                  variant="h5"
                  sx={{ color: "#FF9800", fontWeight: 700, mr: 2 }}
                >
                  {yearData.year}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#888", fontStyle: "italic" }}
                >
                  {yearData.focus}
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#FF9800", mb: 1, fontWeight: 600 }}
                  >
                    New Skills Developed
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    {yearData.skills.map((skill, idx) => (
                      <Chip
                        key={idx}
                        label={skill}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(33, 150, 243, 0.2)",
                          color: "#2196F3",
                          fontWeight: 500,
                          alignSelf: "flex-start",
                        }}
                      />
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#FF9800", mb: 1, fontWeight: 600 }}
                  >
                    Key Achievements
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {yearData.achievements.map((achievement, idx) => (
                      <Chip
                        key={idx}
                        icon={<Star />}
                        label={achievement}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(76, 175, 80, 0.2)",
                          color: "#4CAF50",
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </SkillCard>
      </motion.div>
    </motion.div>
  );
};

export default Skills;
