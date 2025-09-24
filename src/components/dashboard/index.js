// Dashboard Components Index
// Navbar Components
export { default as DashboardSidebar } from "./navbar/DashboardSidebar";

// Shared Components
export { default as EditDialog } from "./EditDialog";

// Common Components
export { default as DashboardCard } from "./common/DashboardCard";
export { default as StyledTextField } from "./common/StyledTextField";
export { default as StatCard } from "./common/StatCard";
export { default as TagManager } from "./common/TagManager";

// Admin Components (Complex)
export { default as AdminToolbar } from "./common/AdminToolbar";
export { default as AdminDataTable } from "./common/AdminDataTable";

// Simple Admin Components (Minimal)
export { default as SimpleAdminToolbar } from "./common/SimpleAdminToolbar";
export { default as SimpleDataTable } from "./common/SimpleDataTable";

// Hooks
export { default as useDashboardData } from "./hooks/useDashboardData";
export { default as useEditMode } from "./hooks/useEditMode";
export { default as useFormValidation } from "./hooks/useFormValidation";
export { default as useAdminCRUD } from "./hooks/useAdminCRUD";
export { default as useSimpleCRUD } from "./hooks/useSimpleCRUD";

// Utils
export * from "./utils/constants";
export * from "./utils/validation";
export * from "./utils/formatting";
