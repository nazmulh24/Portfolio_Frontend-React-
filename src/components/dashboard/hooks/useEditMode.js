import { useState, useCallback } from "react";

const useEditMode = (initialEditState = {}) => {
  const [editStates, setEditStates] = useState(initialEditState);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const toggleEdit = useCallback((key) => {
    setEditStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const setEdit = useCallback((key, value) => {
    setEditStates((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const isEditing = useCallback(
    (key) => {
      return Boolean(editStates[key]);
    },
    [editStates]
  );

  const exitAllEditModes = useCallback(() => {
    setEditStates({});
    setHasUnsavedChanges(false);
  }, []);

  const exitEditMode = useCallback((key) => {
    setEditStates((prev) => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });
  }, []);

  const hasActiveEdits = useCallback(() => {
    return Object.values(editStates).some(Boolean);
  }, [editStates]);

  const getEditingKeys = useCallback(() => {
    return Object.keys(editStates).filter((key) => editStates[key]);
  }, [editStates]);

  const markUnsavedChanges = useCallback(() => {
    setHasUnsavedChanges(true);
  }, []);

  const clearUnsavedChanges = useCallback(() => {
    setHasUnsavedChanges(false);
  }, []);

  return {
    editStates,
    isEditing,
    toggleEdit,
    setEdit,
    exitEditMode,
    exitAllEditModes,
    hasActiveEdits,
    getEditingKeys,
    hasUnsavedChanges,
    markUnsavedChanges,
    clearUnsavedChanges,
  };
};

export default useEditMode;
