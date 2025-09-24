import { useState, useCallback, useEffect } from "react";

const useFormValidation = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback(
    (name, value) => {
      const rules = validationRules[name];
      if (!rules) return "";

      for (const rule of rules) {
        if (rule.required && (!value || value.toString().trim() === "")) {
          return rule.message || `${name} is required`;
        }

        if (rule.minLength && value && value.length < rule.minLength) {
          return (
            rule.message ||
            `${name} must be at least ${rule.minLength} characters`
          );
        }

        if (rule.maxLength && value && value.length > rule.maxLength) {
          return (
            rule.message ||
            `${name} must be no more than ${rule.maxLength} characters`
          );
        }

        if (rule.pattern && value && !rule.pattern.test(value)) {
          return rule.message || `${name} format is invalid`;
        }

        if (rule.custom && value) {
          const customError = rule.custom(value, values);
          if (customError) return customError;
        }
      }

      return "";
    },
    [validationRules, values]
  );

  const validateAll = useCallback(() => {
    const newErrors = {};
    Object.keys(validationRules).forEach((name) => {
      const error = validateField(name, values[name]);
      if (error) newErrors[name] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validateField, validationRules]);

  const handleChange = useCallback(
    (name, value) => {
      setValues((prev) => ({ ...prev, [name]: value }));

      if (touched[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [touched, validateField]
  );

  const handleBlur = useCallback(
    (name) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, values[name]);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validateField, values]
  );

  const reset = useCallback(
    (newValues = initialValues) => {
      setValues(newValues);
      setErrors({});
      setTouched({});
    },
    [initialValues]
  );

  const isValid = Object.keys(errors).every((key) => !errors[key]);
  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isValid,
    isDirty,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    setValues,
    setErrors,
  };
};

export default useFormValidation;
