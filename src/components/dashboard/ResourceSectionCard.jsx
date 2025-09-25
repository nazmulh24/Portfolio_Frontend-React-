import React from "react";
import {
  Card,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { Add, Delete, Edit } from "@mui/icons-material";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ResourceSectionCard = ({
  id,
  title,
  caption,
  items = [],
  onAdd,
  onEdit,
  onDelete,
  renderItem,
  emptyState,
  actionLabel = "Add",
  showCount = true,
}) => (
  <motion.div variants={itemVariants}>
    <Card
      sx={{
        background: "rgba(18, 18, 20, 0.88)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: 4,
        p: 3,
        minHeight: 220,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 24px 60px -32px rgba(0,0,0,0.65)",
      }}
    >
      <Stack direction="row" alignItems="flex-start" spacing={2} mb={3}>
        <Box>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
            {title}
          </Typography>
          {caption && (
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
              {caption}
            </Typography>
          )}
        </Box>
        <Box flexGrow={1} />
        {showCount && (
          <Chip
            label={`${items.length}`}
            size="small"
            sx={{
              backgroundColor: "rgba(76, 175, 80, 0.16)",
              color: "#66BB6A",
              fontWeight: 600,
            }}
          />
        )}
        <Tooltip title={`${actionLabel} ${title}`} arrow>
          <span>
            <IconButton
              size="small"
              onClick={() => onAdd?.(id)}
              sx={{
                backgroundColor: "rgba(76, 175, 80, 0.18)",
                color: "#81C784",
                "&:hover": {
                  backgroundColor: "rgba(129, 199, 132, 0.24)",
                },
              }}
            >
              <Add fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>

      <Box flexGrow={1}>
        {items.length === 0 ? (
          <Stack
            spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{
              color: "rgba(255,255,255,0.5)",
              border: "1px dashed rgba(255,255,255,0.1)",
              borderRadius: 3,
              py: 6,
            }}
          >
            {emptyState || (
              <>
                <Typography variant="body1" fontWeight={600}>
                  No records yet
                </Typography>
                <Typography variant="body2">
                  Click “{actionLabel}” to create your first entry.
                </Typography>
              </>
            )}
          </Stack>
        ) : renderItem ? (
          renderItem(items, { onEdit, onDelete })
        ) : (
          <List disablePadding sx={{ color: "#fff" }}>
            {items.map((item) => (
              <ListItem
                key={item.id || item.title}
                sx={{
                  borderRadius: 3,
                  mb: 1.25,
                  px: 2,
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                secondaryAction={
                  <Stack direction="row" spacing={0.5}>
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        size="small"
                        onClick={() => onEdit?.(id, item)}
                        sx={{ color: "#90CAF9" }}
                      >
                        <Edit fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        size="small"
                        onClick={() => onDelete?.(id, item)}
                        sx={{ color: "#EF9A9A" }}
                      >
                        <Delete fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                }
              >
                <ListItemText
                  primaryTypographyProps={{ fontWeight: 600, fontSize: 15 }}
                  secondaryTypographyProps={{ color: "rgba(255,255,255,0.55)" }}
                  primary={item.title || item.name || "Untitled"}
                  secondary={
                    item.subtitle ||
                    item.description ||
                    item.institution ||
                    item.company ||
                    item.summary ||
                    null
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Card>
  </motion.div>
);

export default ResourceSectionCard;
