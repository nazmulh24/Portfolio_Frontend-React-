import React from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import { ArrowForward, Tune } from "@mui/icons-material";
import ResourceSectionCard from "./ResourceSectionCard";

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ResourcePageTemplate = ({
  header = {},
  stats = [],
  quickActions = [],
  sections = [],
  onAdd,
  onEdit,
  onDelete,
}) => (
  <Stack spacing={4} sx={{ pb: 6 }}>
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Card
        sx={{
          background:
            "linear-gradient(135deg, #132240 0%, #17141A 60%, #0B121C 100%)",
          borderRadius: 5,
          border: "1px solid rgba(255,255,255,0.08)",
          px: { xs: 3, md: 5 },
          py: { xs: 4, md: 5 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.24,
            background:
              "radial-gradient(120% 120% at 30% 20%, rgba(0, 188, 212, 0.38) 0%, rgba(10, 25, 47, 0) 65%)",
          }}
        />

        <Stack spacing={3} sx={{ position: "relative" }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            <Box flex={1}>
              <Stack direction="row" alignItems="center" spacing={2} mb={1.5}>
                <Typography
                  variant="h4"
                  sx={{ color: "#fff", fontWeight: 700, letterSpacing: 0.3 }}
                >
                  {header.title}
                </Typography>
                {header.chips?.map((chip) => (
                  <Chip
                    key={chip.label}
                    label={chip.label}
                    size="small"
                    sx={{
                      backgroundColor:
                        chip.color || "rgba(129, 199, 132, 0.15)",
                      color: chip.textColor || "#A5D6A7",
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Stack>

              {header.subtitle && (
                <Typography
                  variant="body1"
                  sx={{ color: "rgba(255,255,255,0.68)", maxWidth: 560 }}
                >
                  {header.subtitle}
                </Typography>
              )}
            </Box>

            {(header.buttons?.length || header.showSettingsButton) && (
              <Stack direction={{ xs: "row", md: "column" }} spacing={2}>
                {header.buttons?.map((button) => (
                  <Button
                    key={button.label}
                    variant={button.variant || "contained"}
                    color={button.color || "primary"}
                    onClick={button.onClick}
                    startIcon={button.icon}
                    endIcon={button.endIcon}
                    sx={{
                      borderRadius: 3,
                      px: 3,
                      py: 1.25,
                      textTransform: "none",
                      fontWeight: 600,
                      backgroundColor:
                        button.variant === "outlined"
                          ? "transparent"
                          : button.background,
                      color:
                        button.variant === "outlined" ? "#90CAF9" : undefined,
                      borderColor: "rgba(144,202,249,0.4)",
                      "&:hover": {
                        backgroundColor:
                          button.variant === "outlined"
                            ? "rgba(144,202,249,0.12)"
                            : button.hoverBackground,
                      },
                    }}
                  >
                    {button.label}
                  </Button>
                ))}

                {header.showSettingsButton && (
                  <Tooltip title="Configure view" arrow>
                    <IconButton
                      sx={{
                        borderRadius: 3,
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.7)",
                        background: "rgba(255,255,255,0.04)",
                        "&:hover": { background: "rgba(255,255,255,0.08)" },
                      }}
                    >
                      <Tune />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
            )}
          </Stack>

          {stats.length > 0 && (
            <Grid container spacing={2}>
              {stats.map((stat) => (
                <Grid item xs={12} sm={6} md={3} key={stat.label}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      px: 3,
                      py: 2.5,
                      background: "rgba(10, 20, 30, 0.8)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <Stack spacing={1.5}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        {stat.icon && (
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: 2,
                              background: "rgba(144, 202, 249, 0.12)",
                              color: "#90CAF9",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {stat.icon}
                          </Box>
                        )}
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255,255,255,0.6)",
                            fontWeight: 600,
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </Stack>
                      <Typography
                        variant="h5"
                        sx={{ color: "#fff", fontWeight: 700, lineHeight: 1.3 }}
                      >
                        {stat.value}
                      </Typography>
                      {stat.delta && (
                        <Typography variant="body2" sx={{ color: "#81C784" }}>
                          {stat.delta}
                        </Typography>
                      )}
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Stack>
      </Card>
    </motion.div>

    {quickActions.length > 0 && (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card
          sx={{
            borderRadius: 4,
            background: "rgba(13, 18, 28, 0.95)",
            border: "1px solid rgba(255,255,255,0.06)",
            px: { xs: 2.5, md: 4 },
            py: { xs: 3, md: 3.5 },
          }}
        >
          <Grid container spacing={3}>
            {quickActions.map((action) => (
              <Grid item xs={12} md={4} key={action.label}>
                <Card
                  sx={{
                    borderRadius: 3,
                    p: 3,
                    background: action.background || "rgba(255,255,255,0.03)",
                    border: action.border || "1px solid rgba(255,255,255,0.06)",
                    height: "100%",
                  }}
                >
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 46,
                          height: 46,
                          borderRadius: 2,
                          background:
                            action.iconBackground ||
                            "rgba(129, 199, 132, 0.16)",
                          color: action.iconColor || "#A5D6A7",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {action.icon}
                      </Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "#fff", fontWeight: 600 }}
                      >
                        {action.label}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.62)" }}
                    >
                      {action.description}
                    </Typography>
                    <Button
                      onClick={action.onClick}
                      endIcon={<ArrowForward />}
                      sx={{
                        alignSelf: "flex-start",
                        borderRadius: 2,
                        px: 2.5,
                        textTransform: "none",
                        color: action.ctaColor || "#90CAF9",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "rgba(144,202,249,0.08)",
                        },
                      }}
                    >
                      {action.ctaLabel || "Manage"}
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Card>
      </motion.div>
    )}

    {sections.length > 0 && (
      <Grid container spacing={3}>
        {sections.map((section) => (
          <Grid item xs={12} md={section.fullWidth ? 12 : 6} key={section.id}>
            <ResourceSectionCard
              {...section}
              onAdd={section.onAdd || onAdd}
              onEdit={section.onEdit || onEdit}
              onDelete={section.onDelete || onDelete}
            />
          </Grid>
        ))}
      </Grid>
    )}
  </Stack>
);

export default ResourcePageTemplate;
