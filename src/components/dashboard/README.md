# Modular Dashboard Architecture

This document outlines the modular dashboard architecture implemented to improve code organization, reusability, and maintainability across all dashboard components.

## 🏗️ Architecture Overview

The modular system consists of:

- **Common Components**: Reusable UI components with consistent styling
- **Custom Hooks**: Business logic and state management utilities
- **Utilities**: Constants, validation, and formatting helpers
- **Clean Separation**: Clear separation of concerns and responsibilities

## 📁 Directory Structure

```
frontend/src/components/dashboard/
├── common/                    # Reusable UI components
│   ├── DashboardCard.jsx     # Universal card container
│   ├── StyledTextField.jsx   # Consistent form inputs
│   ├── StatCard.jsx          # Statistics display cards
│   └── TagManager.jsx        # Tag/chip management
├── hooks/                     # Custom React hooks
│   ├── useDashboardData.js   # Data management & localStorage
│   ├── useEditMode.js        # Edit state management
│   └── useFormValidation.js  # Form validation logic
├── utils/                     # Utility functions
│   ├── constants.js          # Colors, levels, status types
│   ├── validation.js         # Validation functions
│   └── formatting.js         # Data formatting utilities
└── index.js                  # Central exports
```

## 🧩 Common Components

### DashboardCard

Universal container component for dashboard sections with glassmorphism styling.

```jsx
import { DashboardCard } from "../../components/dashboard";

<DashboardCard
  title="Section Title"
  subtitle="Optional subtitle"
  icon={IconComponent}
  color="#4CAF50"
  onEdit={() => toggleEdit("section")}
  editMode={isEditing("section")}
>
  {/* Content */}
</DashboardCard>;
```

**Props:**

- `title`: Card title text
- `subtitle`: Optional subtitle
- `icon`: Material-UI icon component
- `color`: Theme color (defaults to primary)
- `onEdit`: Edit callback function
- `editMode`: Boolean edit state
- `hover`: Enable hover effects (default: true)

### StyledTextField

Consistent text input with glassmorphism styling and theme integration.

```jsx
import { StyledTextField } from "../../components/dashboard";

<StyledTextField
  label="Field Label"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  color="#4CAF50"
  multiline={true}
  rows={4}
/>;
```

**Props:**

- Standard Material-UI TextField props
- `color`: Theme color for focus states
- Pre-styled with glassmorphism design

### StatCard

Statistics display component with optional icons and animations.

```jsx
import { StatCard } from "../../components/dashboard";

<StatCard
  title="Total Projects"
  value={45}
  icon={AssessmentIcon}
  color="#4CAF50"
  change={+5}
  changeColor="#4CAF50"
  prefix="$"
  suffix="K"
/>;
```

**Props:**

- `title`: Statistic title
- `value`: Numeric value to display
- `icon`: Optional Material-UI icon
- `color`: Theme color
- `change`: Optional change indicator
- `prefix`/`suffix`: Value formatting
- `animate`: Enable animations (default: true)

### TagManager

Advanced tag/chip management with add/remove functionality.

```jsx
import { TagManager } from "../../components/dashboard";

<TagManager
  tags={skillTags}
  onTagsChange={setSkillTags}
  label="Skills"
  maxTags={10}
  color="#4CAF50"
  editable={true}
/>;
```

**Props:**

- `tags`: Array of tag strings
- `onTagsChange`: Callback for tag updates
- `label`: Field label
- `maxTags`: Maximum number of tags
- `editable`: Enable add/remove functionality
- `color`: Theme color
- `variant`: Chip appearance ('filled', 'outlined', 'standard')

## 🎣 Custom Hooks

### useDashboardData

Comprehensive data management with localStorage persistence.

```jsx
import { useDashboardData } from "../../components/dashboard";

const {
  data,
  loading,
  error,
  updateData,
  updateItem,
  addItem,
  removeItem,
  resetData,
} = useDashboardData(initialData, "storage-key");
```

**Features:**

- Automatic localStorage persistence
- CRUD operations for nested data
- Loading and error states
- Data reset functionality

### useEditMode

Edit state management for multiple sections.

```jsx
import { useEditMode } from "../../components/dashboard";

const {
  isEditing,
  toggleEdit,
  setEdit,
  exitEditMode,
  exitAllEditModes,
  hasActiveEdits,
  hasUnsavedChanges,
} = useEditMode();

// Usage
const editing = isEditing("skills");
toggleEdit("skills");
```

**Features:**

- Multi-section edit state tracking
- Unsaved changes detection
- Batch edit operations
- Active edits queries

### useFormValidation

Form validation with real-time feedback.

```jsx
import { useFormValidation } from "../../components/dashboard";

const validationRules = {
  name: [
    { required: true, message: "Name is required" },
    { minLength: 2, message: "Name must be at least 2 characters" },
  ],
};

const { values, errors, isValid, handleChange, handleBlur, validateAll } =
  useFormValidation(initialValues, validationRules);
```

## 🛠️ Utilities

### Constants

Centralized design tokens and configuration values.

```jsx
import {
  DASHBOARD_COLORS,
  SKILL_LEVELS,
  STATUS_TYPES,
  ANIMATION_VARIANTS,
  SECTION_COLORS,
} from "../../components/dashboard";

// Usage
<Box sx={{ color: DASHBOARD_COLORS.primary }}>
  <Chip label={SKILL_LEVELS.EXPERT} />
</Box>;
```

**Available Constants:**

- `DASHBOARD_COLORS`: Color palette
- `SKILL_LEVELS`: Proficiency levels
- `STATUS_TYPES`: Status indicators
- `FORM_LIMITS`: Input limitations
- `ANIMATION_VARIANTS`: Framer Motion variants
- `SECTION_COLORS`: Section-specific colors

### Validation

Comprehensive validation functions for all data types.

```jsx
import {
  validateEmail,
  validateSkill,
  validateCertificate,
  validateForm,
} from "../../components/dashboard";

// Usage
const skillErrors = validateSkill(skillData);
const isValidEmail = validateEmail("user@example.com");
```

### Formatting

Data formatting utilities for consistent display.

```jsx
import {
  formatDate,
  formatCurrency,
  formatDuration,
  formatTimeAgo,
} from "../../components/dashboard";

// Usage
const displayDate = formatDate(new Date(), "MMM dd, yyyy");
const price = formatCurrency(1000, "USD");
const duration = formatDuration(18); // "1 year, 6 months"
```

## 🚀 Migration Guide

### Before (Monolithic Component)

```jsx
const Skills = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(initialData);

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        backdropFilter: "blur(5px)",
        border: "1px solid #444",
        borderRadius: 5,
        // ... more styles
      }}
    >
      <TextField
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "#fff",
            // ... many style overrides
          },
        }}
      />
      {/* Repeated validation and formatting logic */}
    </Box>
  );
};
```

### After (Modular Component)

```jsx
import {
  DashboardCard,
  StyledTextField,
  useDashboardData,
  useEditMode,
} from "../../components/dashboard";

const Skills = () => {
  const { data } = useDashboardData(initialData, "skills");
  const { isEditing, toggleEdit } = useEditMode();

  return (
    <DashboardCard
      title="Skills"
      onEdit={() => toggleEdit("skills")}
      editMode={isEditing("skills")}
    >
      <StyledTextField
        label="Skill Name"
        // Styling automatically applied
      />
    </DashboardCard>
  );
};
```

## ✅ Benefits

1. **Consistency**: Unified styling and behavior across components
2. **Reusability**: Components used across multiple dashboard sections
3. **Maintainability**: Single source of truth for styles and logic
4. **Performance**: Reduced bundle size through shared components
5. **Developer Experience**: Faster development with pre-built components
6. **Type Safety**: Consistent prop interfaces and validation
7. **Testing**: Easier unit testing of isolated components and hooks

## 🔄 Implementation Status

- ✅ **Common Components**: DashboardCard, StyledTextField, StatCard, TagManager
- ✅ **Custom Hooks**: useDashboardData, useEditMode, useFormValidation
- ✅ **Utilities**: constants, validation, formatting
- ✅ **Example Refactor**: SkillsRefactored.jsx
- 🔄 **Migration**: Gradually refactor existing components
- 📋 **Testing**: Add component and hook tests

## 📝 Usage Examples

See `SkillsRefactored.jsx` for a complete example of migrating from monolithic to modular architecture. The refactored component demonstrates:

- Using DashboardCard for consistent layouts
- StatCard for metrics display
- TagManager for skill frameworks
- Custom hooks for data and edit state management
- Utility functions for formatting and validation

## 🎯 Next Steps

1. **Refactor Remaining Components**: Apply modular patterns to Activities, Awards, Certificates, Networks, and Grants
2. **Add Form Components**: Create modular form components for edit modes
3. **Enhance Animations**: Standardize animation patterns
4. **Add Testing**: Unit tests for all components and hooks
5. **Documentation**: Component storybook documentation
6. **Performance**: Optimize with React.memo and useMemo where appropriate
