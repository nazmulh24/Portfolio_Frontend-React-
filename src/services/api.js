import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api/v1";

const AUTH_BASE_URL = "http://127.0.0.1:8000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const authClient = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for both clients
const addAuthInterceptor = (client) => {
  client.interceptors.request.use(
    (config) => {
      // Add auth token if available (Django Token format)
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Token ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

// Response interceptor for both clients
const addResponseInterceptor = (client) => {
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem("token");
        window.location.href = "/";
      }
      return Promise.reject(error);
    }
  );
};

// Apply interceptors to both clients
addAuthInterceptor(apiClient);
addAuthInterceptor(authClient);
addResponseInterceptor(apiClient);
addResponseInterceptor(authClient);

// Portfolio API
export const portfolioAPI = {
  // Personal Info
  getPersonalInfo: () => apiClient.get("/portfolio/personal-info/current/"),

  // Skills
  getSkills: () => apiClient.get("/portfolio/skills/"),
  getSkillsByCategory: () => apiClient.get("/portfolio/skills/by_category/"),

  // Experience
  getExperience: () => apiClient.get("/portfolio/experience/"),

  // Education
  getEducation: () => apiClient.get("/portfolio/education/"),

  // Certifications
  getCertifications: () => apiClient.get("/portfolio/certifications/"),

  // Complete summary
  getPortfolioSummary: () => apiClient.get("/portfolio/summary/"),
};

// Projects API
export const projectsAPI = {
  // Projects
  getProjects: (params = {}) => apiClient.get("/projects/", { params }),
  getProject: (slug) => apiClient.get(`/projects/${slug}/`),
  getFeaturedProjects: () => apiClient.get("/projects/featured/"),
  getProjectsByCategory: () => apiClient.get("/projects/by_category/"),
  getProjectTechnologies: () => apiClient.get("/projects/technologies/"),

  // Categories
  getProjectCategories: () => apiClient.get("/projects/categories/"),

  // Images
  getProjectImages: (projectId) =>
    apiClient.get("/projects/images/", { params: { project: projectId } }),
};

// Blog API
export const blogAPI = {
  // Posts
  getBlogPosts: (params = {}) => apiClient.get("/blog/posts/", { params }),
  getBlogPost: (slug) => apiClient.get(`/blog/posts/${slug}/`),
  getFeaturedPosts: () => apiClient.get("/blog/posts/featured/"),
  getRecentPosts: () => apiClient.get("/blog/posts/recent/"),
  getBlogArchive: () => apiClient.get("/blog/posts/archive/"),

  // Categories
  getBlogCategories: () => apiClient.get("/blog/categories/"),

  // Tags
  getBlogTags: () => apiClient.get("/blog/tags/"),
};

// Authentication API
export const authAPI = {
  // Login - Get 30-day token
  login: (credentials) => authClient.post("/auth/token/", credentials),

  // Get admin info
  getAdminInfo: () => authClient.get("/auth/info/"),

  // Health check
  healthCheck: () => authClient.get("/health/"),

  // Logout (client-side)
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  },
};

export default apiClient;
