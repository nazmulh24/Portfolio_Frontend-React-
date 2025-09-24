import { useState, useEffect } from "react";

const useSimpleCRUD = (initialData = [], storageKey = "simple-crud-data") => {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setData(JSON.parse(saved));
      } else {
        setData(initialData);
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      setData(initialData);
    }
  }, [initialData, storageKey]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (data.length > 0) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
      } catch (error) {
        console.error("Error saving data to localStorage:", error);
      }
    }
  }, [data, storageKey]);

  // Generate unique ID
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Add new item
  const addItem = (newItem) => {
    const item = {
      ...newItem,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setData((prev) => [...prev, item]);
    return item;
  };

  // Update existing item
  const updateItem = (id, updates) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...updates, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  // Delete single item
  const deleteItem = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    // Clear selection if deleted item was selected
    setSelectedItems((prev) =>
      prev.filter((index) => {
        const item = data[index];
        return item && item.id !== id;
      })
    );
  };

  // Delete multiple items
  const deleteSelected = () => {
    const selectedIds = selectedItems
      .map((index) => data[index]?.id)
      .filter(Boolean);
    setData((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedItems([]);
  };

  // Clear all data
  const clearAll = () => {
    setData([]);
    setSelectedItems([]);
    localStorage.removeItem(storageKey);
  };

  // Get item by ID
  const getItemById = (id) => {
    return data.find((item) => item.id === id);
  };

  // Basic stats
  const stats = {
    total: data.length,
    selected: selectedItems.length,
    recent: data.filter((item) => {
      const itemDate = new Date(item.createdAt || item.updatedAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return itemDate > weekAgo;
    }).length,
  };

  return {
    data,
    selectedItems,
    setSelectedItems,
    stats,
    addItem,
    updateItem,
    deleteItem,
    deleteSelected,
    clearAll,
    getItemById,
  };
};

export default useSimpleCRUD;
