import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { motion } from "framer-motion";

const DashboardCard = ({
  title,
  subtitle,
  icon: Icon,
  children,
  onEdit,
  editMode = false,
  color = "#4CAF50",
  hover = true,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{ height: "100%" }}
    >
      <Box
        sx={{
          backgroundColor: "transparent",
          backdropFilter: "blur(5px)",
          border: "1px solid #444",
          borderRadius: 5,
          p: 4,
          mb: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          transition: "border-color 0.3s ease",
          ...(hover && {
            "&:hover": {
              borderColor: color,
            },
          }),
          ...props.sx,
        }}
      >
        {(Icon || title || subtitle) && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            {Icon && (
              <Icon
                sx={{
                  color: color,
                  mr: 2,
                  fontSize: 28,
                }}
              />
            )}
            <Box sx={{ flex: 1 }}>
              {title && (
                <Typography
                  variant="h6"
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    mb: subtitle ? 0.5 : 0,
                  }}
                >
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "#aaa",
                  }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
            {onEdit && (
              <IconButton
                onClick={onEdit}
                sx={{
                  color: editMode ? color : "#aaa",
                  "&:hover": {
                    color: color,
                    backgroundColor: `${color}20`,
                  },
                }}
              >
                <Edit />
              </IconButton>
            )}
          </Box>
        )}
        {children}
      </Box>
    </motion.div>
  );
};

export default DashboardCard;
