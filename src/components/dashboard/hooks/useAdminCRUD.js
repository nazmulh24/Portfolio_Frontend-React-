import { useState, useCallback, useEffect } from "react";

/**
 * Professional Admin CRUD Hook
 * Provides complete Create, Read, Update, Delete operations for admin management
 */
const useAdminCRUD = (initialData = [], storageKey = null) => {
  const [data, setData] = useState(initialData);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 10,
    total: 0,
  });

  // Load data from localStorage on mount
  useEffect(() => {
    if (storageKey) {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        try {
          setData(JSON.parse(savedData));
        } catch (error) {
          console.error("Error loading data from localStorage:", error);
        }
      }
    }
  }, [storageKey]);

  // Save data to localStorage when data changes
  useEffect(() => {
    if (storageKey && data.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(data));
    }
  }, [data, storageKey]);

  // Update pagination total when data changes
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      total: data.length,
    }));
  }, [data]);

  // CREATE - Add new item
  const addItem = useCallback((newItem) => {
    try {
      setLoading(true);
      const item = {
        id: newItem.id || Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...newItem,
      };

      setData((prevData) => [item, ...prevData]);
      setError(null);
      return { success: true, data: item };
    } catch (err) {
      setError(`Failed to add item: ${err.message}`);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // READ - Get all items with filtering and sorting
  const getItems = useCallback(() => {
    try {
      let filteredData = [...data];

      // Apply search
      if (searchTerm) {
        filteredData = filteredData.filter((item) =>
          Object.values(item).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }

      // Apply filters
      Object.keys(filters).forEach((key) => {
        if (
          filters[key] !== null &&
          filters[key] !== undefined &&
          filters[key] !== ""
        ) {
          filteredData = filteredData.filter((item) => {
            const itemValue = item[key];
            const filterValue = filters[key];

            if (typeof filterValue === "string") {
              return itemValue
                ?.toString()
                .toLowerCase()
                .includes(filterValue.toLowerCase());
            }
            return itemValue === filterValue;
          });
        }
      });

      // Apply sorting
      if (sortConfig.key) {
        filteredData.sort((a, b) => {
          const aValue = a[sortConfig.key];
          const bValue = b[sortConfig.key];

          if (aValue < bValue) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
          return 0;
        });
      }

      return filteredData;
    } catch (err) {
      setError(`Failed to get items: ${err.message}`);
      return [];
    }
  }, [data, searchTerm, filters, sortConfig]);

  // READ - Get single item by ID
  const getItem = useCallback(
    (id) => {
      return data.find((item) => item.id === id) || null;
    },
    [data]
  );

  // UPDATE - Update existing item
  const updateItem = useCallback(
    (id, updates) => {
      try {
        setLoading(true);
        const updatedData = data.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              ...updates,
              updatedAt: new Date().toISOString(),
            };
          }
          return item;
        });

        setData(updatedData);
        setError(null);

        const updatedItem = updatedData.find((item) => item.id === id);
        return { success: true, data: updatedItem };
      } catch (err) {
        setError(`Failed to update item: ${err.message}`);
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [data]
  );

  // DELETE - Delete single item
  const deleteItem = useCallback(
    (id) => {
      try {
        setLoading(true);
        const filteredData = data.filter((item) => item.id !== id);
        setData(filteredData);

        // Remove from selection if selected
        setSelectedItems((prev) =>
          prev.filter((selectedId) => selectedId !== id)
        );

        setError(null);
        return { success: true };
      } catch (err) {
        setError(`Failed to delete item: ${err.message}`);
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [data]
  );

  // BULK DELETE - Delete multiple items
  const bulkDelete = useCallback(
    (ids) => {
      try {
        setLoading(true);
        const filteredData = data.filter((item) => !ids.includes(item.id));
        setData(filteredData);

        // Clear selection
        setSelectedItems([]);

        setError(null);
        return { success: true, count: ids.length };
      } catch (err) {
        setError(`Failed to delete items: ${err.message}`);
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [data]
  );

  // BULK UPDATE - Update multiple items
  const bulkUpdate = useCallback(
    (ids, updates) => {
      try {
        setLoading(true);
        const updatedData = data.map((item) => {
          if (ids.includes(item.id)) {
            return {
              ...item,
              ...updates,
              updatedAt: new Date().toISOString(),
            };
          }
          return item;
        });

        setData(updatedData);
        setError(null);
        return { success: true, count: ids.length };
      } catch (err) {
        setError(`Failed to update items: ${err.message}`);
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [data]
  );

  // DUPLICATE - Duplicate an item
  const duplicateItem = useCallback(
    (id) => {
      try {
        const originalItem = data.find((item) => item.id === id);
        if (!originalItem) {
          throw new Error("Item not found");
        }

        const duplicatedItem = {
          ...originalItem,
          id: Date.now().toString(),
          name: `${originalItem.name} (Copy)`,
          title: `${originalItem.title} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setData((prevData) => [duplicatedItem, ...prevData]);
        return { success: true, data: duplicatedItem };
      } catch (err) {
        setError(`Failed to duplicate item: ${err.message}`);
        return { success: false, error: err.message };
      }
    },
    [data]
  );

  // IMPORT - Import data from array
  const importData = useCallback((importedData, replaceExisting = false) => {
    try {
      setLoading(true);
      let processedData = importedData.map((item, index) => ({
        id: item.id || `imported-${Date.now()}-${index}`,
        createdAt: item.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...item,
      }));

      if (replaceExisting) {
        setData(processedData);
      } else {
        setData((prevData) => [...processedData, ...prevData]);
      }

      setError(null);
      return { success: true, count: processedData.length };
    } catch (err) {
      setError(`Failed to import data: ${err.message}`);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // EXPORT - Export data to JSON
  const exportData = useCallback(
    (selectedIds = null) => {
      try {
        const exportData = selectedIds
          ? data.filter((item) => selectedIds.includes(item.id))
          : data;

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${storageKey || "data"}-export-${Date.now()}.json`;
        link.click();

        URL.revokeObjectURL(url);
        return { success: true, count: exportData.length };
      } catch (err) {
        setError(`Failed to export data: ${err.message}`);
        return { success: false, error: err.message };
      }
    },
    [data, storageKey]
  );

  // CLEAR ALL - Clear all data
  const clearAll = useCallback(() => {
    setData([]);
    setSelectedItems([]);
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  // Statistics
  const stats = useCallback(() => {
    const total = data.length;
    const selected = selectedItems.length;
    const recent = data.filter(
      (item) =>
        new Date(item.createdAt) >
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length;

    return { total, selected, recent };
  }, [data, selectedItems]);

  return {
    // Data
    data: getItems(),
    rawData: data,
    selectedItems,
    loading,
    error,
    stats: stats(),

    // CRUD Operations
    addItem,
    getItem,
    updateItem,
    deleteItem,
    bulkDelete,
    bulkUpdate,
    duplicateItem,

    // Data Management
    importData,
    exportData,
    clearAll,

    // UI State Management
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    sortConfig,
    setSortConfig,
    pagination,
    setPagination,
    setSelectedItems,

    // Utility Functions
    refreshData: () => setData([...data]),
    clearError: () => setError(null),
  };
};

export default useAdminCRUD;
