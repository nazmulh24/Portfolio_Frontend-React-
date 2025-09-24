import { useState, useEffect, useCallback } from "react";

const useDashboardData = (initialData = {}, storageKey = null) => {
  const [data, setData] = useState(() => {
    if (storageKey) {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          return { ...initialData, ...JSON.parse(stored) };
        } catch (error) {
          console.error("Error parsing stored data:", error);
        }
      }
    }
    return initialData;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save to localStorage when data changes
  useEffect(() => {
    if (storageKey && Object.keys(data).length > 0) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
      } catch (error) {
        console.error("Error saving data to localStorage:", error);
        setError("Failed to save data");
      }
    }
  }, [data, storageKey]);

  const updateData = useCallback((updates) => {
    setData((prevData) => ({
      ...prevData,
      ...updates,
    }));
  }, []);

  const updateItem = useCallback((key, itemId, updates) => {
    setData((prevData) => ({
      ...prevData,
      [key]:
        prevData[key]?.map((item) =>
          item.id === itemId ? { ...item, ...updates } : item
        ) || [],
    }));
  }, []);

  const addItem = useCallback((key, newItem) => {
    setData((prevData) => ({
      ...prevData,
      [key]: [...(prevData[key] || []), newItem],
    }));
  }, []);

  const removeItem = useCallback((key, itemId) => {
    setData((prevData) => ({
      ...prevData,
      [key]: prevData[key]?.filter((item) => item.id !== itemId) || [],
    }));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetData = useCallback(() => {
    setData(initialData);
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
  }, [initialData, storageKey]);

  return {
    data,
    loading,
    error,
    updateData,
    updateItem,
    addItem,
    removeItem,
    clearError,
    resetData,
    setLoading,
    setError,
  };
};

export default useDashboardData;
