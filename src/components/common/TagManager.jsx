import React, { useState } from "react";
import { Box, Chip, TextField, Button, Typography } from "@mui/material";
import { Add, Close } from "@mui/icons-material";

const TagManager = ({
  tags = [],
  onTagsChange,
  label = "Tags",
  placeholder = "Add a tag...",
  maxTags = 10,
  editable = true,
  color = "#4CAF50",
  variant = "filled", // 'filled', 'outlined', 'standard'
  size = "small",
  ...props
}) => {
  const [newTag, setNewTag] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTag = () => {
    if (
      newTag.trim() &&
      !tags.includes(newTag.trim()) &&
      tags.length < maxTags
    ) {
      onTagsChange([...tags, newTag.trim()]);
      setNewTag("");
      setIsAdding(false);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTag();
    } else if (event.key === "Escape") {
      setNewTag("");
      setIsAdding(false);
    }
  };

  return (
    <Box sx={{ mb: 2, ...props.sx }}>
      {label && (
        <Typography
          variant="subtitle2"
          sx={{
            color: "#aaa",
            mb: 1,
            fontWeight: 600,
          }}
        >
          {label} ({tags.length}/{maxTags})
        </Typography>
      )}

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            variant={variant}
            size={size}
            onDelete={editable ? () => handleRemoveTag(tag) : undefined}
            deleteIcon={<Close />}
            sx={{
              backgroundColor:
                variant === "filled" ? `${color}20` : "transparent",
              color: "#fff",
              border: variant === "outlined" ? `1px solid ${color}` : "none",
              "& .MuiChip-deleteIcon": {
                color: "#fff",
                "&:hover": {
                  color: color,
                },
              },
            }}
          />
        ))}

        {editable && tags.length < maxTags && (
          <>
            {isAdding ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TextField
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={placeholder}
                  size="small"
                  autoFocus
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      "& fieldset": {
                        borderColor: "#444",
                      },
                      "&:hover fieldset": {
                        borderColor: "#666",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: color,
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "8px 12px",
                    },
                  }}
                />
                <Button
                  onClick={handleAddTag}
                  disabled={!newTag.trim()}
                  sx={{
                    color: color,
                    minWidth: "auto",
                    p: 1,
                  }}
                >
                  <Add />
                </Button>
                <Button
                  onClick={() => {
                    setNewTag("");
                    setIsAdding(false);
                  }}
                  sx={{
                    color: "#aaa",
                    minWidth: "auto",
                    p: 1,
                  }}
                >
                  <Close />
                </Button>
              </Box>
            ) : (
              <Chip
                label="+ Add Tag"
                variant="outlined"
                size={size}
                onClick={() => setIsAdding(true)}
                sx={{
                  border: `1px dashed ${color}`,
                  color: color,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: `${color}10`,
                  },
                }}
              />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default TagManager;
