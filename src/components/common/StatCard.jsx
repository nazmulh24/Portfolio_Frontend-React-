import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = "#4CAF50",
  change,
  changeColor,
  subtitle,
  prefix = "",
  suffix = "",
  animate = true,
  ...props
}) => {
  const cardContent = (
    <Box
      sx={{
        textAlign: "center",
        p: 3,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: 3,
        border: "1px solid #444",
        backdropFilter: "blur(5px)",
        transition: "border-color 0.3s ease",
        "&:hover": {
          borderColor: color,
        },
        ...props.sx,
      }}
    >
      {Icon && (
        <Icon
          sx={{
            fontSize: 32,
            color: color,
            mb: 1,
          }}
        />
      )}
      <Typography
        variant="h4"
        sx={{
          color: "#fff",
          fontWeight: 700,
          mb: 0.5,
        }}
      >
        {prefix}
        {value}
        {suffix}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#aaa",
          mb: change ? 1 : 0,
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="caption"
          sx={{
            color: "#888",
            display: "block",
            mb: change ? 1 : 0,
          }}
        >
          {subtitle}
        </Typography>
      )}
      {change && (
        <Typography
          variant="body2"
          sx={{
            color: changeColor || (change > 0 ? "#4CAF50" : "#f44336"),
            fontWeight: 600,
          }}
        >
          {change > 0 ? "+" : ""}
          {change}
        </Typography>
      )}
    </Box>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default StatCard;
