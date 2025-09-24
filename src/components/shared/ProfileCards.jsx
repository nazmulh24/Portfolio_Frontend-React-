import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  TextField,
  Chip,
  IconButton,
} from "@mui/material";
import {
  Person,
  Work,
  Science,
  Email,
  LinkedIn,
  Code,
  EmojiEvents,
  Add,
  Close,
} from "@mui/icons-material";

// Reusable Profile Card Component
export const ProfileCard = ({
  icon,
  title,
  description,
  children,
  hover = true,
}) => (
  <Card
    sx={{
      backgroundColor: "transparent",
      border: "1px solid #444",
      borderRadius: 5,
      p: 4,
      mb: 3,
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      backdropFilter: "blur(5px)",
      ...(hover && {
        "&:hover": {
          borderColor: "#4CAF50",
          transition: "border-color 0.3s ease",
        },
      }),
    }}
  >
    {(icon || title || description) && (
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        {icon &&
          React.cloneElement(icon, {
            sx: { color: "#4CAF50", mr: 2, fontSize: 28 },
          })}
        <Box>
          {title && (
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="body2" sx={{ color: "#aaa" }}>
              {description}
            </Typography>
          )}
        </Box>
      </Box>
    )}
    {children}
  </Card>
);

// Text Field Component for consistent styling
export const StyledTextField = ({
  isEditing,
  label,
  value,
  onChange,
  multiline = false,
  rows = 1,
  type = "text",
}) => {
  if (!isEditing) {
    return (
      <Box sx={{ mb: multiline ? 3 : 2 }}>
        <Typography variant="body2" sx={{ color: "#888", mb: 1 }}>
          {label}
        </Typography>
        <Typography
          variant={multiline ? "body1" : "h6"}
          sx={{
            color: "#fff",
            fontWeight: multiline ? 400 : 600,
            lineHeight: multiline ? 1.6 : 1.2,
          }}
        >
          {value}
        </Typography>
      </Box>
    );
  }

  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      value={value}
      onChange={onChange}
      sx={{
        mb: multiline ? 3 : 2,
        "& .MuiOutlinedInput-root": {
          backgroundColor: "rgba(15, 15, 15, 0.6)",
          backdropFilter: "blur(10px)",
          borderRadius: 2,
          "& fieldset": { borderColor: "#444", borderWidth: 2 },
          "&:hover fieldset": {
            borderColor: "#4CAF50",
            borderWidth: 2,
          },
          "&.Mui-focused fieldset": {
            borderColor: "#4CAF50",
            borderWidth: 2,
          },
        },
        "& .MuiInputLabel-root": { color: "#bbb" },
        "& .MuiInputBase-input": { color: "#fff" },
      }}
    />
  );
};

// Basic Information Card
export const BasicInfoCard = ({ isEditing, editedData, setEditedData }) => (
  <ProfileCard
    icon={<Person />}
    title="Basic Information"
    description="Update your name, title, and description"
  >
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <StyledTextField
          isEditing={isEditing}
          label="Name"
          value={editedData.name}
          onChange={(e) =>
            setEditedData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          isEditing={isEditing}
          label="Title"
          value={editedData.title}
          onChange={(e) =>
            setEditedData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </Grid>
      <Grid item xs={12}>
        <StyledTextField
          isEditing={isEditing}
          label="Description"
          value={editedData.description}
          onChange={(e) =>
            setEditedData((prev) => ({ ...prev, description: e.target.value }))
          }
          multiline={true}
          rows={4}
        />
      </Grid>
    </Grid>
  </ProfileCard>
);

// Current Position Card
export const CurrentPositionCard = ({
  isEditing,
  editedData,
  setEditedData,
}) => (
  <ProfileCard
    icon={<Work />}
    title="Current Position"
    description="Update your current role and organization"
  >
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <StyledTextField
          isEditing={isEditing}
          label="Current Position"
          value={editedData.currentPosition}
          onChange={(e) =>
            setEditedData((prev) => ({
              ...prev,
              currentPosition: e.target.value,
            }))
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          isEditing={isEditing}
          label="Organization"
          value={editedData.organization}
          onChange={(e) =>
            setEditedData((prev) => ({
              ...prev,
              organization: e.target.value,
            }))
          }
        />
      </Grid>
    </Grid>
  </ProfileCard>
);

// Research Interests Card
export const ResearchInterestsCard = ({
  isEditing,
  editedData,
  setEditedData,
  newInterest,
  setNewInterest,
  addResearchInterest,
  removeResearchInterest,
}) => (
  <ProfileCard
    icon={<Science />}
    title="Research Interests"
    description="Manage your research interest tags"
  >
    <Typography variant="body2" sx={{ color: "#888", mb: 2 }}>
      Max 7 items
    </Typography>

    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
      {editedData.researchInterests.map((interest, index) => (
        <Chip
          key={index}
          label={interest}
          onDelete={isEditing ? () => removeResearchInterest(index) : undefined}
          deleteIcon={isEditing ? <Close /> : undefined}
          sx={{
            backgroundColor: "rgba(76, 175, 80, 0.2)",
            color: "#4CAF50",
            border: "1px solid rgba(76, 175, 80, 0.5)",
            fontWeight: 600,
            "& .MuiChip-deleteIcon": {
              color: "#4CAF50",
              "&:hover": { color: "#66BB6A" },
            },
          }}
        />
      ))}
    </Box>

    {isEditing && editedData.researchInterests.length < 7 && (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <TextField
          size="small"
          placeholder="Add new research interest"
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addResearchInterest()}
          sx={{
            flexGrow: 1,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(15, 15, 15, 0.6)",
              borderRadius: 2,
              "& fieldset": { borderColor: "#444" },
              "&:hover fieldset": { borderColor: "#4CAF50" },
              "&.Mui-focused fieldset": { borderColor: "#4CAF50" },
            },
            "& .MuiInputBase-input": { color: "#fff" },
          }}
        />
        <IconButton
          onClick={addResearchInterest}
          disabled={!newInterest.trim()}
          sx={{
            backgroundColor: "#4CAF50",
            color: "#fff",
            "&:hover": { backgroundColor: "#45a049" },
            "&:disabled": { backgroundColor: "#333", color: "#666" },
          }}
        >
          <Add />
        </IconButton>
      </Box>
    )}
  </ProfileCard>
);

// Contact Information Card
export const ContactInfoCard = ({ isEditing, editedData, setEditedData }) => (
  <ProfileCard
    icon={<Email />}
    title="Contact Information"
    description="Update your contact details and social media links"
  >
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <StyledTextField
          isEditing={isEditing}
          label="Email"
          type="email"
          value={editedData.email}
          onChange={(e) =>
            setEditedData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          isEditing={isEditing}
          label="Phone"
          value={editedData.phone}
          onChange={(e) =>
            setEditedData((prev) => ({ ...prev, phone: e.target.value }))
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          isEditing={isEditing}
          label="Location"
          value={editedData.location}
          onChange={(e) =>
            setEditedData((prev) => ({ ...prev, location: e.target.value }))
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          isEditing={isEditing}
          label="Website"
          value={editedData.website}
          onChange={(e) =>
            setEditedData((prev) => ({ ...prev, website: e.target.value }))
          }
        />
      </Grid>
    </Grid>
  </ProfileCard>
);

// Social Media Card
export const SocialMediaCard = ({ isEditing, editedData, setEditedData }) => (
  <ProfileCard
    icon={<LinkedIn />}
    title="Social Media & Professional Profiles"
    description="Update your professional social media links"
  >
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <StyledTextField
          isEditing={isEditing}
          label="LinkedIn"
          value={editedData.linkedin}
          onChange={(e) =>
            setEditedData((prev) => ({ ...prev, linkedin: e.target.value }))
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          isEditing={isEditing}
          label="GitHub"
          value={editedData.github}
          onChange={(e) =>
            setEditedData((prev) => ({ ...prev, github: e.target.value }))
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          isEditing={isEditing}
          label="Twitter"
          value={editedData.twitter}
          onChange={(e) =>
            setEditedData((prev) => ({ ...prev, twitter: e.target.value }))
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          isEditing={isEditing}
          label="ORCID"
          value={editedData.orcid}
          onChange={(e) =>
            setEditedData((prev) => ({ ...prev, orcid: e.target.value }))
          }
        />
      </Grid>
    </Grid>
  </ProfileCard>
);

// Technical Skills Card
export const TechnicalSkillsCard = ({ editedData }) => (
  <ProfileCard
    icon={<Code />}
    title="Technical Skills"
    description="Showcase your technical expertise and tools"
  >
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Typography
          variant="subtitle1"
          sx={{ color: "#fff", mb: 2, fontWeight: 600 }}
        >
          Programming Languages
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {editedData.technicalSkills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              sx={{
                backgroundColor: "rgba(33, 150, 243, 0.2)",
                color: "#2196F3",
                border: "1px solid rgba(33, 150, 243, 0.5)",
                fontWeight: 500,
              }}
            />
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography
          variant="subtitle1"
          sx={{ color: "#fff", mb: 2, fontWeight: 600 }}
        >
          Frameworks & Libraries
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {editedData.frameworks.map((framework, index) => (
            <Chip
              key={index}
              label={framework}
              sx={{
                backgroundColor: "rgba(156, 39, 176, 0.2)",
                color: "#9C27B0",
                border: "1px solid rgba(156, 39, 176, 0.5)",
                fontWeight: 500,
              }}
            />
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography
          variant="subtitle1"
          sx={{ color: "#fff", mb: 2, fontWeight: 600 }}
        >
          Tools & Technologies
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {editedData.tools.map((tool, index) => (
            <Chip
              key={index}
              label={tool}
              sx={{
                backgroundColor: "rgba(255, 152, 0, 0.2)",
                color: "#FF9800",
                border: "1px solid rgba(255, 152, 0, 0.5)",
                fontWeight: 500,
              }}
            />
          ))}
        </Box>
      </Grid>
    </Grid>
  </ProfileCard>
);

// Career Goals Card
export const CareerGoalsCard = ({ isEditing, editedData, setEditedData }) => (
  <ProfileCard
    icon={<EmojiEvents />}
    title="Career Goals & Objectives"
    description="Define your professional aspirations and research objectives"
  >
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StyledTextField
          isEditing={isEditing}
          label="Career Goals"
          value={editedData.careerGoals}
          onChange={(e) =>
            setEditedData((prev) => ({
              ...prev,
              careerGoals: e.target.value,
            }))
          }
          multiline={true}
          rows={3}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="subtitle1"
          sx={{ color: "#fff", mb: 2, fontWeight: 600 }}
        >
          Research Objectives
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {editedData.researchObjectives.map((objective, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                backgroundColor: "rgba(76, 175, 80, 0.1)",
                border: "1px solid rgba(76, 175, 80, 0.3)",
                borderRadius: 2,
                borderLeft: "4px solid #4CAF50",
              }}
            >
              <Science sx={{ color: "#4CAF50", mr: 2, fontSize: 20 }} />
              <Typography variant="body1" sx={{ color: "#fff" }}>
                {objective}
              </Typography>
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  </ProfileCard>
);
