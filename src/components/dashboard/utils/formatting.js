// Date formatting utilities
export const formatDate = (date, format = "MMM dd, yyyy") => {
  if (!date) return "";

  const d = new Date(date);
  if (isNaN(d)) return "";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const fullMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  switch (format) {
    case "MMM dd, yyyy":
      return `${months[d.getMonth()]} ${d
        .getDate()
        .toString()
        .padStart(2, "0")}, ${d.getFullYear()}`;
    case "MMMM dd, yyyy":
      return `${fullMonths[d.getMonth()]} ${d
        .getDate()
        .toString()
        .padStart(2, "0")}, ${d.getFullYear()}`;
    case "EEEE, MMMM dd, yyyy":
      return `${days[d.getDay()]}, ${fullMonths[d.getMonth()]} ${d
        .getDate()
        .toString()
        .padStart(2, "0")}, ${d.getFullYear()}`;
    case "yyyy-MM-dd":
      return `${d.getFullYear()}-${(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
    case "HH:mm":
      return `${d.getHours().toString().padStart(2, "0")}:${d
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    case "MMM dd, yyyy HH:mm":
      return `${months[d.getMonth()]} ${d
        .getDate()
        .toString()
        .padStart(2, "0")}, ${d.getFullYear()} ${d
        .getHours()
        .toString()
        .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
    default:
      return d.toLocaleDateString();
  }
};

// Currency formatting
export const formatCurrency = (amount, currency = "USD", locale = "en-US") => {
  if (typeof amount !== "number") return "";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};

// Number formatting
export const formatNumber = (number, options = {}) => {
  if (typeof number !== "number") return "";

  const defaultOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };

  return new Intl.NumberFormat("en-US", {
    ...defaultOptions,
    ...options,
  }).format(number);
};

// Percentage formatting
export const formatPercentage = (value, decimals = 1) => {
  if (typeof value !== "number") return "";
  return `${value.toFixed(decimals)}%`;
};

// Duration formatting
export const formatDuration = (months) => {
  if (!months || months < 1) return "0 months";

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${months} month${months === 1 ? "" : "s"}`;
  }

  if (remainingMonths === 0) {
    return `${years} year${years === 1 ? "" : "s"}`;
  }

  return `${years} year${years === 1 ? "" : "s"}, ${remainingMonths} month${
    remainingMonths === 1 ? "" : "s"
  }`;
};

// File size formatting
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Text truncation
export const truncateText = (text, maxLength = 100, ellipsis = "...") => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength - ellipsis.length) + ellipsis;
};

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Title case
export const toTitleCase = (str) => {
  if (!str) return "";
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

// Slug generation
export const generateSlug = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

// Time ago formatting
export const formatTimeAgo = (date) => {
  if (!date) return "";

  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks === 1 ? "" : "s"} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
};

// Deep clone object
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map((item) => deepClone(item));
  if (typeof obj === "object") {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Generate unique ID
export const generateId = (prefix = "id") => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Sort array of objects
export const sortBy = (array, key, direction = "asc") => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (direction === "asc") {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });
};

// Group array by key
export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
};

// Calculate statistics
export const calculateStats = (array, key) => {
  if (!array.length) return { min: 0, max: 0, avg: 0, sum: 0, count: 0 };

  const values = array.map((item) => parseFloat(item[key]) || 0);
  const sum = values.reduce((acc, val) => acc + val, 0);
  const count = values.length;
  const avg = sum / count;
  const min = Math.min(...values);
  const max = Math.max(...values);

  return { min, max, avg, sum, count };
};
