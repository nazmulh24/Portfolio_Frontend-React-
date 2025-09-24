import { FORM_LIMITS, SKILL_LEVELS, STATUS_TYPES } from "./constants";

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// URL validation
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Phone number validation (basic)
export const validatePhone = (phone) => {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

// Date validation
export const validateDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

// Required field validation
export const validateRequired = (value) => {
  return (
    value !== null && value !== undefined && value.toString().trim() !== ""
  );
};

// Length validation
export const validateLength = (value, min = 0, max = Infinity) => {
  const length = value ? value.toString().length : 0;
  return length >= min && length <= max;
};

// Skills validation
export const validateSkill = (skill) => {
  const errors = {};

  if (!validateRequired(skill.name)) {
    errors.name = "Skill name is required";
  } else if (!validateLength(skill.name, 1, FORM_LIMITS.NAME_MAX)) {
    errors.name = `Skill name must be between 1 and ${FORM_LIMITS.NAME_MAX} characters`;
  }

  if (!validateRequired(skill.level)) {
    errors.level = "Skill level is required";
  } else if (!Object.values(SKILL_LEVELS).includes(skill.level)) {
    errors.level = "Invalid skill level";
  }

  if (
    skill.experience !== undefined &&
    (skill.experience < 0 || skill.experience > 50)
  ) {
    errors.experience = "Experience must be between 0 and 50 years";
  }

  return errors;
};

// Certificate validation
export const validateCertificate = (certificate) => {
  const errors = {};

  if (!validateRequired(certificate.name)) {
    errors.name = "Certificate name is required";
  } else if (!validateLength(certificate.name, 1, FORM_LIMITS.TITLE_MAX)) {
    errors.name = `Certificate name must be between 1 and ${FORM_LIMITS.TITLE_MAX} characters`;
  }

  if (!validateRequired(certificate.issuer)) {
    errors.issuer = "Issuer is required";
  } else if (!validateLength(certificate.issuer, 1, FORM_LIMITS.COMPANY_MAX)) {
    errors.issuer = `Issuer must be between 1 and ${FORM_LIMITS.COMPANY_MAX} characters`;
  }

  if (certificate.issueDate && !validateDate(new Date(certificate.issueDate))) {
    errors.issueDate = "Invalid issue date";
  }

  if (
    certificate.expiryDate &&
    !validateDate(new Date(certificate.expiryDate))
  ) {
    errors.expiryDate = "Invalid expiry date";
  }

  if (certificate.credentialUrl && !validateURL(certificate.credentialUrl)) {
    errors.credentialUrl = "Invalid credential URL";
  }

  return errors;
};

// Award validation
export const validateAward = (award) => {
  const errors = {};

  if (!validateRequired(award.title)) {
    errors.title = "Award title is required";
  } else if (!validateLength(award.title, 1, FORM_LIMITS.TITLE_MAX)) {
    errors.title = `Award title must be between 1 and ${FORM_LIMITS.TITLE_MAX} characters`;
  }

  if (!validateRequired(award.issuer)) {
    errors.issuer = "Issuer is required";
  } else if (!validateLength(award.issuer, 1, FORM_LIMITS.COMPANY_MAX)) {
    errors.issuer = `Issuer must be between 1 and ${FORM_LIMITS.COMPANY_MAX} characters`;
  }

  if (award.date && !validateDate(new Date(award.date))) {
    errors.date = "Invalid award date";
  }

  if (award.value !== undefined && award.value < 0) {
    errors.value = "Award value cannot be negative";
  }

  return errors;
};

// Activity validation
export const validateActivity = (activity) => {
  const errors = {};

  if (!validateRequired(activity.title)) {
    errors.title = "Activity title is required";
  } else if (!validateLength(activity.title, 1, FORM_LIMITS.TITLE_MAX)) {
    errors.title = `Activity title must be between 1 and ${FORM_LIMITS.TITLE_MAX} characters`;
  }

  if (!validateRequired(activity.type)) {
    errors.type = "Activity type is required";
  }

  if (activity.startDate && !validateDate(new Date(activity.startDate))) {
    errors.startDate = "Invalid start date";
  }

  if (activity.endDate && !validateDate(new Date(activity.endDate))) {
    errors.endDate = "Invalid end date";
  }

  if (
    activity.startDate &&
    activity.endDate &&
    new Date(activity.startDate) > new Date(activity.endDate)
  ) {
    errors.endDate = "End date must be after start date";
  }

  return errors;
};

// Grant validation
export const validateGrant = (grant) => {
  const errors = {};

  if (!validateRequired(grant.title)) {
    errors.title = "Grant title is required";
  } else if (!validateLength(grant.title, 1, FORM_LIMITS.TITLE_MAX)) {
    errors.title = `Grant title must be between 1 and ${FORM_LIMITS.TITLE_MAX} characters`;
  }

  if (!validateRequired(grant.agency)) {
    errors.agency = "Funding agency is required";
  } else if (!validateLength(grant.agency, 1, FORM_LIMITS.COMPANY_MAX)) {
    errors.agency = `Funding agency must be between 1 and ${FORM_LIMITS.COMPANY_MAX} characters`;
  }

  if (!validateRequired(grant.amount)) {
    errors.amount = "Grant amount is required";
  } else if (grant.amount < 0) {
    errors.amount = "Grant amount cannot be negative";
  }

  if (!validateRequired(grant.status)) {
    errors.status = "Grant status is required";
  } else if (!Object.values(STATUS_TYPES).includes(grant.status)) {
    errors.status = "Invalid grant status";
  }

  if (grant.startDate && !validateDate(new Date(grant.startDate))) {
    errors.startDate = "Invalid start date";
  }

  if (grant.endDate && !validateDate(new Date(grant.endDate))) {
    errors.endDate = "Invalid end date";
  }

  return errors;
};

// Network validation
export const validateNetwork = (network) => {
  const errors = {};

  if (!validateRequired(network.name)) {
    errors.name = "Network name is required";
  } else if (!validateLength(network.name, 1, FORM_LIMITS.NAME_MAX)) {
    errors.name = `Network name must be between 1 and ${FORM_LIMITS.NAME_MAX} characters`;
  }

  if (!validateRequired(network.type)) {
    errors.type = "Network type is required";
  }

  if (network.url && !validateURL(network.url)) {
    errors.url = "Invalid URL";
  }

  return errors;
};

// Form validation helper
export const validateForm = (data, validators) => {
  const errors = {};

  Object.keys(validators).forEach((field) => {
    const validator = validators[field];
    const value = data[field];

    if (typeof validator === "function") {
      const fieldErrors = validator(value);
      if (fieldErrors && Object.keys(fieldErrors).length > 0) {
        errors[field] = fieldErrors;
      }
    }
  });

  return errors;
};

// Check if form has errors
export const hasValidationErrors = (errors) => {
  return Object.values(errors).some(
    (error) =>
      error && (typeof error === "string" || Object.keys(error).length > 0)
  );
};
