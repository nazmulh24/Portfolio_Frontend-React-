// Dashboard Colors
export const DASHBOARD_COLORS = {
  primary: "#4CAF50",
  secondary: "#2196F3",
  accent: "#FF9800",
  warning: "#FFC107",
  error: "#f44336",
  success: "#4CAF50",
  info: "#2196F3",
  purple: "#9C27B0",
  pink: "#E91E63",
  indigo: "#3F51B5",
  teal: "#009688",
  cyan: "#00BCD4",
  lime: "#CDDC39",
  amber: "#FFC107",
  orange: "#FF5722",
  deepOrange: "#FF5722",
  brown: "#795548",
  grey: "#9E9E9E",
  blueGrey: "#607D8B",
};

// Skill Levels
export const SKILL_LEVELS = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  EXPERT: "Expert",
  MASTER: "Master",
};

export const SKILL_LEVEL_VALUES = {
  [SKILL_LEVELS.BEGINNER]: 20,
  [SKILL_LEVELS.INTERMEDIATE]: 40,
  [SKILL_LEVELS.ADVANCED]: 60,
  [SKILL_LEVELS.EXPERT]: 80,
  [SKILL_LEVELS.MASTER]: 100,
};

// Status Types
export const STATUS_TYPES = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  PENDING: "Pending",
  COMPLETED: "Completed",
  IN_PROGRESS: "In Progress",
  CANCELLED: "Cancelled",
  EXPIRED: "Expired",
  VERIFIED: "Verified",
  DRAFT: "Draft",
  PUBLISHED: "Published",
};

export const STATUS_COLORS = {
  [STATUS_TYPES.ACTIVE]: DASHBOARD_COLORS.success,
  [STATUS_TYPES.INACTIVE]: DASHBOARD_COLORS.grey,
  [STATUS_TYPES.PENDING]: DASHBOARD_COLORS.warning,
  [STATUS_TYPES.COMPLETED]: DASHBOARD_COLORS.success,
  [STATUS_TYPES.IN_PROGRESS]: DASHBOARD_COLORS.info,
  [STATUS_TYPES.CANCELLED]: DASHBOARD_COLORS.error,
  [STATUS_TYPES.EXPIRED]: DASHBOARD_COLORS.error,
  [STATUS_TYPES.VERIFIED]: DASHBOARD_COLORS.success,
  [STATUS_TYPES.DRAFT]: DASHBOARD_COLORS.grey,
  [STATUS_TYPES.PUBLISHED]: DASHBOARD_COLORS.success,
};

// Form Limits
export const FORM_LIMITS = {
  TITLE_MAX: 100,
  DESCRIPTION_MAX: 500,
  LONG_DESCRIPTION_MAX: 2000,
  TAG_MAX: 10,
  TAG_LENGTH_MAX: 30,
  URL_MAX: 300,
  NAME_MAX: 50,
  EMAIL_MAX: 100,
  PHONE_MAX: 20,
  COMPANY_MAX: 100,
  POSITION_MAX: 100,
  LOCATION_MAX: 100,
  SKILLS_MAX: 50,
  LANGUAGES_MAX: 20,
  AWARDS_MAX: 100,
  CERTIFICATES_MAX: 100,
  PROJECTS_MAX: 200,
};

// Priority Levels
export const PRIORITY_LEVELS = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
};

export const PRIORITY_COLORS = {
  [PRIORITY_LEVELS.LOW]: DASHBOARD_COLORS.success,
  [PRIORITY_LEVELS.MEDIUM]: DASHBOARD_COLORS.warning,
  [PRIORITY_LEVELS.HIGH]: DASHBOARD_COLORS.orange,
  [PRIORITY_LEVELS.CRITICAL]: DASHBOARD_COLORS.error,
};

// Animation Variants
export const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  cardHover: {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  },
};

// Date Formats
export const DATE_FORMATS = {
  SHORT: "MMM dd, yyyy",
  LONG: "MMMM dd, yyyy",
  FULL: "EEEE, MMMM dd, yyyy",
  TIME: "HH:mm",
  DATETIME: "MMM dd, yyyy HH:mm",
  ISO: "yyyy-MM-dd",
};

// File Size Limits
export const FILE_LIMITS = {
  IMAGE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  DOCUMENT_MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  ALLOWED_DOCUMENT_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};

// Glassmorphism Styles
export const GLASSMORPHISM_STYLES = {
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  modal: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(20px)",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
};

// Chart Colors
export const CHART_COLORS = [
  "#4CAF50",
  "#2196F3",
  "#FF9800",
  "#9C27B0",
  "#F44336",
  "#00BCD4",
  "#CDDC39",
  "#FF5722",
  "#795548",
  "#607D8B",
  "#E91E63",
  "#3F51B5",
  "#009688",
  "#FFC107",
  "#8BC34A",
];

// Dashboard Section Colors
export const SECTION_COLORS = {
  overview: DASHBOARD_COLORS.primary,
  portfolio: DASHBOARD_COLORS.purple,
  activities: DASHBOARD_COLORS.teal,
  awards: DASHBOARD_COLORS.amber,
  certificates: DASHBOARD_COLORS.indigo,
  networks: DASHBOARD_COLORS.cyan,
  grants: DASHBOARD_COLORS.orange,
  skills: DASHBOARD_COLORS.pink,
  education: DASHBOARD_COLORS.info,
  experience: DASHBOARD_COLORS.success,
  projects: DASHBOARD_COLORS.secondary,
  blog: DASHBOARD_COLORS.purple,
  contact: DASHBOARD_COLORS.teal,
  settings: DASHBOARD_COLORS.grey,
};
