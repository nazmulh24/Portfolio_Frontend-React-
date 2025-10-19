import React, { useState, useMemo, useCallback } from "react";
// import { useOutletContext } from "react-router-dom";
import {
  Stack,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Avatar,
  LinearProgress,
} from "@mui/material";
import {
  Add,
  Search,
  FilterList,
  Clear,
  Edit,
  Delete,
  Email,
  Phone,
  CalendarMonth,
  SupportAgent,
  AccessTime,
  SentimentVerySatisfied,
  Bolt,
  Launch,
  LocationOn,
  Schedule,
  TrendingUp,
  BusinessCenter,
  ContactMail,
  CheckCircle,
} from "@mui/icons-material";

// Constants
const FILTER_ALL_VALUE = "all";

const CONTACT_TYPES = {
  EMAIL: "email",
  PHONE: "phone", 
  SCHEDULING: "scheduling",
  SUPPORT: "support",
};

const CONTACT_STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  ESCALATED: "Escalated",
  PLANNED: "Planned",
};

const TYPE_COLORS = {
  email: "#2196F3",
  phone: "#4CAF50",
  scheduling: "#FF9800",
  support: "#9C27B0",
};

const STATUS_COLORS = {
  "Active": "#4CAF50",
  "Inactive": "#9E9E9E",
  "Escalated": "#F44336",
  "Planned": "#FF9800",
};

const Contact = () => {
  // const { dashboardData } = useOutletContext();

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState(FILTER_ALL_VALUE);
  const [statusFilter, setStatusFilter] = useState(FILTER_ALL_VALUE);
  const [channelFilter, setChannelFilter] = useState(FILTER_ALL_VALUE);

  // Contact data with comprehensive examples
  const allContactChannels = useMemo(() => {
    return [
      {
        id: 1,
        name: "General Inquiries",
        type: CONTACT_TYPES.EMAIL,
        channel: "Email",
        endpoint: "hello@nazmul.dev",
        status: CONTACT_STATUS.ACTIVE,
        purpose: "Client engagements, partnerships, business inquiries",
        slaHours: 12,
        owner: "Nazmul Hossain",
        lastReviewed: "2024-10-15",
        tags: ["Primary", "High-volume", "Business"],
        metrics: {
          weeklyVolume: 46,
          avgResponseTime: 5.3,
          satisfactionRate: 97,
        },
        availability: "24/7",
        autoResponse: true,
        priority: "High",
        featured: true,
      },
      {
        id: 2,
        name: "Consultation Requests",
        type: CONTACT_TYPES.SCHEDULING,
        channel: "Scheduling Portal",
        endpoint: "cal.com/nazmul/consultation",
        status: CONTACT_STATUS.ACTIVE,
        purpose: "Discovery calls, coaching sessions, technical consultations",
        slaHours: 4,
        owner: "Operations Team",
        lastReviewed: "2024-10-10",
        tags: ["Calendar", "Auto-confirm", "Premium"],
        metrics: {
          weeklyBookings: 18,
          showUpRate: 89,
          satisfactionRate: 94,
        },
        availability: "Mon-Fri 9AM-5PM GMT+6",
        autoResponse: true,
        priority: "High",
      },
      {
        id: 3,
        name: "Media & Press",
        type: CONTACT_TYPES.PHONE,
        channel: "Direct Line",
        endpoint: "+1 (415) 555-8923",
        status: CONTACT_STATUS.ESCALATED,
        purpose: "Media interviews, keynote briefings, press inquiries",
        slaHours: 2,
        owner: "Press Relations",
        lastReviewed: "2024-09-28",
        tags: ["Priority", "24/7", "Media"],
        metrics: {
          monthlyCallsReceived: 12,
          avgCallDuration: 25,
          conversionRate: 78,
        },
        availability: "24/7 Emergency Line",
        autoResponse: false,
        priority: "Critical",
        featured: true,
      },
      {
        id: 4,
        name: "Technical Support",
        type: CONTACT_TYPES.SUPPORT,
        channel: "Support Portal",
        endpoint: "support@nazmul.dev",
        status: CONTACT_STATUS.ACTIVE,
        purpose: "Technical issues, implementation support, bug reports",
        slaHours: 8,
        owner: "Technical Support Team",
        lastReviewed: "2024-10-12",
        tags: ["Technical", "Priority", "Escalation"],
        metrics: {
          weeklyTickets: 23,
          avgResolutionTime: 6.2,
          firstCallResolution: 82,
        },
        availability: "Mon-Fri 8AM-8PM GMT+6",
        autoResponse: true,
        priority: "High",
      },
      {
        id: 5,
        name: "Partnership Opportunities",
        type: CONTACT_TYPES.EMAIL,
        channel: "Email",
        endpoint: "partnerships@nazmul.dev",
        status: CONTACT_STATUS.ACTIVE,
        purpose: "Strategic partnerships, collaboration opportunities, joint ventures",
        slaHours: 24,
        owner: "Business Development",
        lastReviewed: "2024-10-08",
        tags: ["Business", "Strategic", "Partnership"],
        metrics: {
          monthlyInquiries: 15,
          conversionRate: 28,
          avgDealSize: 25000,
        },
        availability: "Business Hours",
        autoResponse: true,
        priority: "Medium",
      },
      {
        id: 6,
        name: "Speaking Engagements",
        type: CONTACT_TYPES.SCHEDULING,
        channel: "Booking System",
        endpoint: "speakerbooking.com/nazmul",
        status: CONTACT_STATUS.ACTIVE,
        purpose: "Conference speaking, workshop facilitation, keynote presentations",
        slaHours: 6,
        owner: "Event Coordination",
        lastReviewed: "2024-10-05",
        tags: ["Speaking", "Events", "Public"],
        metrics: {
          monthlyRequests: 8,
          acceptanceRate: 45,
          avgFee: 5000,
        },
        availability: "By Appointment",
        autoResponse: true,
        priority: "Medium",
      },
      {
        id: 7,
        name: "Career Opportunities",
        type: CONTACT_TYPES.EMAIL,
        channel: "Email",
        endpoint: "careers@nazmul.dev",
        status: CONTACT_STATUS.INACTIVE,
        purpose: "Job opportunities, recruitment, freelance projects",
        slaHours: 48,
        owner: "HR Department",
        lastReviewed: "2024-09-20",
        tags: ["Careers", "Recruitment", "Freelance"],
        metrics: {
          monthlyApplications: 45,
          responseRate: 15,
          interviewRate: 8,
        },
        availability: "Not Currently Active",
        autoResponse: true,
        priority: "Low",
      },
      {
        id: 8,
        name: "Emergency Contact",
        type: CONTACT_TYPES.PHONE,
        channel: "Emergency Line",
        endpoint: "+1 (415) 555-9999",
        status: CONTACT_STATUS.PLANNED,
        purpose: "Critical issues, system outages, urgent client matters",
        slaHours: 1,
        owner: "On-Call Team",
        lastReviewed: "2024-10-01",
        tags: ["Emergency", "Critical", "24/7"],
        metrics: {
          monthlyEmergencies: 3,
          avgResolutionTime: 45,
          escalationRate: 20,
        },
        availability: "24/7 Emergency Only",
        autoResponse: false,
        priority: "Critical",
      },
    ];
  }, []);

  // Get unique filter options
  const uniqueTypes = useMemo(() => {
    return [...new Set(allContactChannels.map(contact => contact.type))].sort();
  }, [allContactChannels]);

  const uniqueStatuses = useMemo(() => {
    return [...new Set(allContactChannels.map(contact => contact.status))].sort();
  }, [allContactChannels]);

  const uniqueChannels = useMemo(() => {
    return [...new Set(allContactChannels.map(contact => contact.channel))].sort();
  }, [allContactChannels]);

  // Filter contacts
  const filteredContacts = useMemo(() => {
    return allContactChannels.filter(contact => {
      const matchesSearch = searchTerm === "" ||
        contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.endpoint?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.purpose?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.owner?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = typeFilter === FILTER_ALL_VALUE || contact.type === typeFilter;
      const matchesStatus = statusFilter === FILTER_ALL_VALUE || contact.status === statusFilter;
      const matchesChannel = channelFilter === FILTER_ALL_VALUE || contact.channel === channelFilter;
      
      return matchesSearch && matchesType && matchesStatus && matchesChannel;
    });
  }, [allContactChannels, searchTerm, typeFilter, statusFilter, channelFilter]);

  // Calculate comprehensive statistics
  const statistics = useMemo(() => {
    const activeChannels = allContactChannels.filter(contact => contact.status === CONTACT_STATUS.ACTIVE).length;
    const totalWeeklyVolume = allContactChannels.reduce((sum, contact) => {
      return sum + (contact.metrics?.weeklyVolume || contact.metrics?.weeklyBookings || contact.metrics?.weeklyTickets || 0);
    }, 0);
    const avgResponseTime = allContactChannels.reduce((sum, contact) => {
      return sum + (contact.slaHours || 0);
    }, 0) / allContactChannels.length;
    const avgSatisfaction = allContactChannels.reduce((sum, contact) => {
      return sum + (contact.metrics?.satisfactionRate || 0);
    }, 0) / allContactChannels.length;

    return {
      totalChannels: allContactChannels.length,
      activeChannels,
      weeklyVolume: totalWeeklyVolume,
      avgResponseTime: Math.round(avgResponseTime * 10) / 10,
      avgSatisfaction: Math.round(avgSatisfaction),
    };
  }, [allContactChannels]);

  // Helper functions
  const formatNumber = useCallback((value) => {
    return typeof value === "number" ? value.toLocaleString() : value;
  }, []);

  const getTypeIcon = useCallback((type) => {
    const icons = {
      email: <Email />,
      phone: <Phone />,
      scheduling: <CalendarMonth />,
      support: <SupportAgent />,
    };
    return icons[type] || <ContactMail />;
  }, []);

  const getChannelIcon = useCallback((channel) => {
    if (channel?.toLowerCase().includes('email')) return <Email />;
    if (channel?.toLowerCase().includes('phone') || channel?.toLowerCase().includes('line')) return <Phone />;
    if (channel?.toLowerCase().includes('scheduling') || channel?.toLowerCase().includes('booking')) return <CalendarMonth />;
    if (channel?.toLowerCase().includes('support') || channel?.toLowerCase().includes('portal')) return <SupportAgent />;
    return <ContactMail />;
  }, []);

  const getTypeColor = useCallback((type) => {
    return TYPE_COLORS[type] || TYPE_COLORS.email;
  }, []);

  const getStatusColor = useCallback((status) => {
    return STATUS_COLORS[status] || STATUS_COLORS.Active;
  }, []);

  const getPriorityColor = useCallback((priority) => {
    const colors = {
      "Critical": "#F44336",
      "High": "#FF9800",
      "Medium": "#2196F3",
      "Low": "#4CAF50",
    };
    return colors[priority] || colors.Medium;
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setTypeFilter(FILTER_ALL_VALUE);
    setStatusFilter(FILTER_ALL_VALUE);
    setChannelFilter(FILTER_ALL_VALUE);
  }, []);

  const handleAddContact = useCallback(() => {
    console.log("Add Contact Channel clicked");
  }, []);

  const handleEditContact = useCallback((contact) => {
    console.log("Edit Contact:", contact);
  }, []);

  const handleDeleteContact = useCallback((contact) => {
    if (window.confirm(`Are you sure you want to delete "${contact.name}"?`)) {
      console.log("Delete Contact:", contact);
    }
  }, []);

  return (
    <Stack spacing={4} sx={{ pb: 6, pt: 4 }}>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1 }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontWeight: 700,
            fontSize: { xs: 28, md: 32 },
          }}
        >
          Contact & Outreach
        </Typography>
        <Button
          onClick={handleAddContact}
          sx={{
            background: "#42A5F5",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#64B5F6",
            },
          }}
        >
          <Add fontSize="small" />
          Add Channel
        </Button>
      </Stack>

      {/* Statistics Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {[
          {
            label: "Total Channels",
            value: statistics.totalChannels,
            icon: <ContactMail />,
            color: "#42A5F5",
          },
          {
            label: "Active Channels",
            value: statistics.activeChannels,
            icon: <CheckCircle />,
            color: "#4CAF50",
          },
          {
            label: "Weekly Volume",
            value: formatNumber(statistics.weeklyVolume),
            icon: <TrendingUp />,
            color: "#FF9800",
          },
          {
            label: "Avg Response",
            value: `${statistics.avgResponseTime}h`,
            icon: <AccessTime />,
            color: "#9C27B0",
          },
        ].map((stat) => (
          <Box
            key={stat.label}
            sx={{
              p: 3,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${stat.color}12 0%, ${stat.color}06 100%)`,
              border: `1px solid ${stat.color}30`,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  backgroundColor: `${stat.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: stat.color,
                }}
              >
                {stat.icon}
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 24,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 14,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Stack>
          </Box>
        ))}
      </Box>

      {/* Filter Controls */}
      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Stack spacing={3}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <FilterList
                sx={{ color: "rgba(255,255,255,0.7)", fontSize: 20 }}
              />
              <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: 16 }}>
                Filter Contact Channels
              </Typography>
            </Stack>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {filteredContacts.length} of {allContactChannels.length}
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            {/* Search */}
            <TextField
              placeholder="Search channels, endpoints, or purposes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "#fff",
                  "& fieldset": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#42A5F5",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255,255,255,0.5)",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search
                      sx={{ color: "rgba(255,255,255,0.5)", fontSize: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            {/* Type Filter */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#42A5F5" },
                }}
              >
                Type
              </InputLabel>
              <Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                label="Type"
                sx={{
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#42A5F5",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value={FILTER_ALL_VALUE}>All Types</MenuItem>
                {uniqueTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Status Filter */}
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#42A5F5" },
                }}
              >
                Status
              </InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
                sx={{
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#42A5F5",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value={FILTER_ALL_VALUE}>All Status</MenuItem>
                {uniqueStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Channel Filter */}
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#42A5F5" },
                }}
              >
                Channel
              </InputLabel>
              <Select
                value={channelFilter}
                onChange={(e) => setChannelFilter(e.target.value)}
                label="Channel"
                sx={{
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#42A5F5",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value={FILTER_ALL_VALUE}>All Channels</MenuItem>
                {uniqueChannels.map((channel) => (
                  <MenuItem key={channel} value={channel}>
                    {channel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Clear Filters */}
            <Button
              onClick={clearFilters}
              startIcon={<Clear />}
              variant="outlined"
              size="small"
              sx={{
                color: "rgba(255,255,255,0.7)",
                borderColor: "rgba(255,255,255,0.15)",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.3)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              Clear
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Contact Channels List */}
      {filteredContacts.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 8,
            px: 4,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 18,
              fontWeight: 600,
              mb: 1,
            }}
          >
            No Contact Channels Found
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 14,
              maxWidth: 400,
              lineHeight: 1.6,
            }}
          >
            Try adjusting your search terms or filters to find the contact channels you're looking for.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={3}>
          {filteredContacts.map((contact) => (
            <Box
              key={contact.id}
              sx={{
                p: 3,
                borderRadius: 4,
                background: `linear-gradient(135deg, ${getTypeColor(contact.type)}12 0%, ${getTypeColor(contact.type)}06 100%)`,
                border: `1px solid ${getTypeColor(contact.type)}30`,
                position: "relative",
                transition: "all 160ms ease",
                "&:hover": {
                  borderColor: `${getTypeColor(contact.type)}60`,
                  transform: "translateY(-2px)",
                  boxShadow: `0 8px 32px ${getTypeColor(contact.type)}20`,
                },
              }}
            >
              <Stack spacing={2.5}>
                {/* Header */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="flex-start"
                    sx={{ flex: 1 }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        backgroundColor: `${getTypeColor(contact.type)}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: getTypeColor(contact.type),
                        mt: 0.5,
                      }}
                    >
                      {getChannelIcon(contact.channel)}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: 18,
                          lineHeight: 1.3,
                          mb: 1,
                        }}
                      >
                        {contact.name}
                        {contact.featured && (
                          <Chip
                            label="Featured"
                            size="small"
                            sx={{
                              ml: 1,
                              backgroundColor: "#FFD700",
                              color: "#000",
                              fontSize: 10,
                              height: 18,
                            }}
                          />
                        )}
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.7)",
                          fontSize: 14,
                          mb: 1,
                        }}
                      >
                        {contact.channel} • {contact.endpoint} • SLA {contact.slaHours}h
                      </Typography>

                      {/* Contact Info */}
                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        alignItems="center"
                      >
                        <Chip
                          label={contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                          size="small"
                          sx={{
                            backgroundColor: `${getTypeColor(contact.type)}20`,
                            color: getTypeColor(contact.type),
                            fontWeight: 600,
                            fontSize: 12,
                            border: `1px solid ${getTypeColor(contact.type)}40`,
                          }}
                        />
                        <Chip
                          label={contact.status}
                          size="small"
                          sx={{
                            backgroundColor: `${getStatusColor(contact.status)}20`,
                            color: getStatusColor(contact.status),
                            fontWeight: 600,
                            fontSize: 12,
                            border: `1px solid ${getStatusColor(contact.status)}40`,
                          }}
                        />
                        <Chip
                          label={contact.priority}
                          size="small"
                          sx={{
                            backgroundColor: `${getPriorityColor(contact.priority)}20`,
                            color: getPriorityColor(contact.priority),
                            fontWeight: 600,
                            fontSize: 12,
                            border: `1px solid ${getPriorityColor(contact.priority)}40`,
                          }}
                        />
                        <Chip
                          startIcon={<BusinessCenter fontSize="small" />}
                          label={contact.owner}
                          size="small"
                          sx={{
                            backgroundColor: "#9C27B0",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: 12,
                          }}
                        />
                      </Stack>
                    </Box>
                  </Stack>

                  {/* Action Buttons */}
                  <Stack direction="row" spacing={0.5}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditContact(contact);
                      }}
                      size="small"
                      sx={{
                        color: "rgba(255,255,255,0.6)",
                        "&:hover": {
                          color: "#90CAF9",
                          backgroundColor: "rgba(33,150,243,0.1)",
                        },
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteContact(contact);
                      }}
                      size="small"
                      sx={{
                        color: "rgba(255,255,255,0.6)",
                        "&:hover": {
                          color: "#F48FB1",
                          backgroundColor: "rgba(233,30,99,0.1)",
                        },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>

                {/* Purpose & Description */}
                {contact.purpose && (
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: 14,
                      lineHeight: 1.6,
                    }}
                  >
                    {contact.purpose}
                  </Typography>
                )}

                {/* Availability & Auto Response */}
                <Stack direction="row" spacing={3} flexWrap="wrap">
                  {contact.availability && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Schedule sx={{ color: "#4CAF50", fontSize: 16 }} />
                      <Typography
                        sx={{
                          color: "#4CAF50",
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        {contact.availability}
                      </Typography>
                    </Box>
                  )}
                  {contact.autoResponse && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Bolt sx={{ color: "#FF9800", fontSize: 16 }} />
                      <Typography
                        sx={{
                          color: "#FF9800",
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        Auto Response Enabled
                      </Typography>
                    </Box>
                  )}
                </Stack>

                {/* Metrics */}
                {contact.metrics && Object.keys(contact.metrics).length > 0 && (
                  <Stack direction="row" spacing={3} flexWrap="wrap">
                    {Object.entries(contact.metrics).slice(0, 3).map(([key, value]) => (
                      <Box
                        key={`${contact.id}-${key}`}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <TrendingUp sx={{ color: "#2196F3", fontSize: 16 }} />
                        <Typography
                          sx={{
                            color: "#2196F3",
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          {formatNumber(value)}{typeof value === "number" && value < 100 && key.includes("Rate") ? "%" : ""} {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                )}

                {/* Tags */}
                {contact.tags && contact.tags.length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {contact.tags.map((tag) => (
                      <Chip
                        key={`${contact.id}-${tag}`}
                        label={tag}
                        size="small"
                        sx={{
                          backgroundColor: `${getTypeColor(contact.type)}25`,
                          color: `${getTypeColor(contact.type)}FF`,
                          fontWeight: 600,
                          fontSize: 11,
                          "&:hover": {
                            backgroundColor: `${getTypeColor(contact.type)}40`,
                          },
                        }}
                      />
                    ))}
                  </Stack>
                )}

                {/* Contact Link */}
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Launch />}
                    href={contact.endpoint.startsWith('http') ? contact.endpoint : `mailto:${contact.endpoint}`}
                    target="_blank"
                    sx={{
                      color: "rgba(255,255,255,0.8)",
                      borderColor: "rgba(255,255,255,0.3)",
                      fontSize: 12,
                      textTransform: "none",
                      "&:hover": {
                        borderColor: "rgba(255,255,255,0.5)",
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    Contact via {contact.channel}
                  </Button>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 12,
                      alignSelf: "center",
                    }}
                  >
                    Last reviewed: {contact.lastReviewed}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default Contact;