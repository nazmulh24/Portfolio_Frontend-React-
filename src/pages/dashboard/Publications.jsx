import React, { useMemo, useState, useCallback } from "react";
import {
  Box,
  Chip,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Autocomplete,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  Search,
  FilterList,
  Clear,
  Edit,
  Delete,
  Add,
  Article,
  School,
  BookmarkBorder,
  Science,
  Assessment,
  Groups,
  FormatQuote,
  Download,
  Visibility,
  TrendingUp,
  Star,
  Public,
  Launch,
  Share,
  GetApp,
  Save,
  Close,
} from "@mui/icons-material";

// Constants for better maintainability
const PUBLICATION_TYPES = {
  JOURNAL: "journal",
  CONFERENCE: "conference",
  BOOK: "book",
  PREPRINT: "preprint",
  THESIS: "thesis",
  REVIEW: "review",
};

const PUBLICATION_STATUS = {
  PUBLISHED: "Published",
  ACCEPTED: "Accepted",
  UNDER_REVIEW: "Under Review",
  IN_PRESS: "In Press",
  SUBMITTED: "Submitted",
  DRAFT: "Draft",
};

const TYPE_COLORS = {
  journal: "#2196F3",
  conference: "#FF9800",
  book: "#9C27B0",
  preprint: "#607D8B",
  thesis: "#795548",
  review: "#E91E63",
};

const STATUS_COLORS = {
  Published: "#4CAF50",
  Accepted: "#66BB6A",
  "Under Review": "#FF9800",
  "In Press": "#2196F3",
  Submitted: "#9E9E9E",
  Draft: "#795548",
};

const FILTER_ALL_VALUE = "all";

/**
 * Publications Management Component
 * Handles display and management of academic publications with comprehensive filtering
 */
const Publications = () => {
  // Note: useOutletContext can be used if dashboard data is needed in future
  // const outlet = useOutletContext?.() || {};
  // const { dashboardData } = outlet;

  // CRUD states
  const [publications, setPublications] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [dialogMode, setDialogMode] = useState("add"); // add, edit
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Form state
  const [formData, setFormData] = useState({
    // Basic Info
    title: "",
    authors: [],
    abstract: "",
    keywords: [],

    // Publication Details
    type: PUBLICATION_TYPES.JOURNAL,
    status: PUBLICATION_STATUS.DRAFT,
    year: new Date().getFullYear(),

    // Journal/Venue Info
    journal: "",
    bookTitle: "",
    conference: "",
    publisher: "",

    // Volume/Issue/Pages
    volume: "",
    issue: "",
    pages: "",

    // Identifiers & Metrics
    doi: "",
    isbn: "",
    impactFactor: "",
    quartile: "",

    // Conference Specific
    location: "",
    acceptanceRate: "",

    // Book Specific
    editor: "",

    // Thesis Specific
    university: "",
    department: "",
    advisor: "",
    degreeType: "",

    // Preprint Specific
    targetJournal: "",

    // Review Specific
    reviewType: "",

    // Flags
    openAccess: false,
    featured: false,
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState(FILTER_ALL_VALUE);
  const [statusFilter, setStatusFilter] = useState(FILTER_ALL_VALUE);
  const [yearFilter, setYearFilter] = useState(FILTER_ALL_VALUE);

  // Initialize with demo data
  React.useEffect(() => {
    const demoPublications = [
      {
        id: "nature-ai-2024",
        title:
          "Deep Learning Approaches for Early Detection of Neurodegenerative Diseases Using Multimodal Brain Imaging",
        authors: [
          "M.H. Rahman",
          "S. Ahmed",
          "Dr. K. Thompson",
          "Prof. A. Williams",
        ],
        journal: "Nature Machine Intelligence",
        year: 2024,
        volume: "11",
        issue: "8",
        pages: "234-251",
        type: PUBLICATION_TYPES.JOURNAL,
        status: PUBLICATION_STATUS.PUBLISHED,
        doi: "10.1038/s42256-024-00789-1",
        impactFactor: 25.898,
        quartile: "Q1",
        citations: 47,
        downloads: 892,
        views: 2156,
        abstract:
          "This study presents a comprehensive framework for early detection of Alzheimer's and Parkinson's diseases using deep learning analysis of MRI, PET, and DTI brain scans. Our hybrid CNN-Transformer architecture achieved 94.7% accuracy on a dataset of 15,000+ patients.",
        keywords: [
          "Deep Learning",
          "Neuroimaging",
          "Early Detection",
          "CNN",
          "Transformer",
          "Medical AI",
        ],
        publicationDate: "2024-08-15",
        openAccess: true,
        featured: true,
        coAuthors: 4,
        institutions: ["University of Dhaka", "MIT", "Harvard Medical School"],
        fundingAgency: "National Science Foundation",
      },
      {
        id: "ieee-biomedical-2024",
        title:
          "Machine Learning Pipeline for Real-time Analysis of Cardiac Arrhythmias in Wearable ECG Devices",
        authors: ["M.H. Rahman", "Dr. R. Patel", "A. Khan"],
        journal: "IEEE Transactions on Biomedical Engineering",
        year: 2024,
        volume: "71",
        issue: "3",
        pages: "445-456",
        type: PUBLICATION_TYPES.JOURNAL,
        status: PUBLICATION_STATUS.PUBLISHED,
        doi: "10.1109/TBME.2024.3123456",
        impactFactor: 4.756,
        quartile: "Q1",
        citations: 23,
        downloads: 567,
        views: 1234,
        abstract:
          "We developed an edge-computing solution for real-time cardiac arrhythmia detection that operates on resource-constrained wearable devices while maintaining 96.3% sensitivity and 94.8% specificity.",
        keywords: [
          "Wearable Computing",
          "Edge AI",
          "Cardiac Monitoring",
          "Real-time Processing",
        ],
        publicationDate: "2024-03-20",
        openAccess: false,
        featured: false,
        coAuthors: 3,
        institutions: ["Bangladesh University of Science & Technology"],
        fundingAgency: "IEEE Foundation Grant",
      },
      {
        id: "neurips-2023",
        title:
          "Federated Learning for Privacy-Preserving Healthcare Analytics: A Multi-institutional Study",
        authors: [
          "M.H. Rahman",
          "S. Chen",
          "Dr. L. Garcia",
          "Prof. M. Johnson",
          "A. Patel",
        ],
        journal: "Advances in Neural Information Processing Systems (NeurIPS)",
        year: 2023,
        type: PUBLICATION_TYPES.CONFERENCE,
        status: PUBLICATION_STATUS.PUBLISHED,
        citations: 89,
        downloads: 1456,
        views: 3421,
        abstract:
          "This paper introduces a novel federated learning framework that enables multiple healthcare institutions to collaboratively train ML models while preserving patient privacy and meeting HIPAA compliance requirements.",
        keywords: [
          "Federated Learning",
          "Privacy Preservation",
          "Healthcare",
          "HIPAA",
          "Distributed Learning",
        ],
        publicationDate: "2023-12-10",
        location: "New Orleans, LA, USA",
        conference: "37th Conference on Neural Information Processing Systems",
        acceptanceRate: "26.1%",
        openAccess: true,
        featured: true,
        coAuthors: 5,
        institutions: [
          "University of Dhaka",
          "Stanford University",
          "Johns Hopkins",
        ],
      },
      {
        id: "jmir-2023",
        title:
          "Digital Biomarkers for Mental Health: A Systematic Review and Meta-Analysis",
        authors: ["M.H. Rahman", "Dr. F. Wilson", "K. Martinez"],
        journal: "Journal of Medical Internet Research",
        year: 2023,
        volume: "25",
        issue: "11",
        pages: "e45678",
        type: PUBLICATION_TYPES.JOURNAL,
        status: PUBLICATION_STATUS.PUBLISHED,
        doi: "10.2196/45678",
        impactFactor: 7.076,
        quartile: "Q1",
        citations: 156,
        downloads: 2341,
        views: 4567,
        abstract:
          "Comprehensive systematic review of 247 studies examining digital biomarkers for depression, anxiety, and bipolar disorder detection using smartphone and wearable sensor data.",
        keywords: [
          "Digital Biomarkers",
          "Mental Health",
          "Systematic Review",
          "Meta-Analysis",
          "mHealth",
        ],
        publicationDate: "2023-11-14",
        openAccess: true,
        featured: false,
        coAuthors: 3,
        institutions: ["University of Dhaka", "Mayo Clinic"],
        fundingAgency: "World Health Organization",
      },
      {
        id: "springer-book-2024",
        title: "Chapter 12: AI-Driven Precision Medicine in Oncology",
        authors: ["M.H. Rahman", "Prof. S. Kumar"],
        bookTitle: "Handbook of Artificial Intelligence in Healthcare",
        publisher: "Springer Nature",
        year: 2024,
        pages: "287-315",
        type: PUBLICATION_TYPES.BOOK,
        status: PUBLICATION_STATUS.PUBLISHED,
        isbn: "978-3-030-12345-7",
        citations: 12,
        downloads: 234,
        views: 567,
        abstract:
          "This chapter explores the application of machine learning algorithms in personalized cancer treatment selection, covering genomic data analysis, treatment response prediction, and clinical decision support systems.",
        keywords: [
          "Precision Medicine",
          "Oncology",
          "Personalized Treatment",
          "Genomics",
          "Clinical AI",
        ],
        publicationDate: "2024-05-22",
        openAccess: false,
        featured: false,
        coAuthors: 2,
        institutions: [
          "University of Dhaka",
          "All India Institute of Medical Sciences",
        ],
        editor: "Prof. John Smith",
      },
      {
        id: "biorxiv-2024",
        title:
          "Novel Biomarker Discovery for COVID-19 Severity Prediction Using Multi-omics Data Integration",
        authors: [
          "M.H. Rahman",
          "Dr. M. Zhang",
          "A. Rodriguez",
          "Prof. K. Lee",
        ],
        journal: "bioRxiv (Preprint)",
        year: 2024,
        type: PUBLICATION_TYPES.PREPRINT,
        status: PUBLICATION_STATUS.UNDER_REVIEW,
        citations: 3,
        downloads: 89,
        views: 234,
        abstract:
          "Integration of genomics, proteomics, and metabolomics data to identify novel biomarkers for predicting COVID-19 disease severity and treatment outcomes. Currently under review at Nature Medicine.",
        keywords: [
          "Multi-omics",
          "COVID-19",
          "Biomarker Discovery",
          "Systems Biology",
          "Predictive Modeling",
        ],
        publicationDate: "2024-09-15",
        doi: "10.1101/2024.09.15.613234",
        openAccess: true,
        featured: false,
        coAuthors: 4,
        institutions: [
          "University of Dhaka",
          "Broad Institute",
          "Harvard T.H. Chan School",
        ],
        targetJournal: "Nature Medicine",
      },
      {
        id: "thesis-2023",
        title:
          "Machine Learning Approaches for Personalized Healthcare: From Diagnosis to Treatment Optimization",
        authors: ["M.H. Rahman"],
        year: 2023,
        type: PUBLICATION_TYPES.THESIS,
        status: PUBLICATION_STATUS.PUBLISHED,
        pages: "187",
        citations: 5,
        downloads: 67,
        views: 145,
        abstract:
          "PhD dissertation exploring the application of machine learning in personalized medicine, covering diagnostic algorithms, treatment prediction models, and clinical decision support systems.",
        keywords: [
          "Machine Learning",
          "Personalized Medicine",
          "Healthcare AI",
          "Clinical Decision Support",
        ],
        publicationDate: "2023-06-30",
        university: "University of Dhaka",
        department: "Computer Science and Engineering",
        advisor: "Prof. A.K.M. Rahman",
        openAccess: true,
        featured: false,
        degreeType: "PhD",
      },
      {
        id: "jama-review-2024",
        title:
          "Artificial Intelligence in Radiology: Current Applications and Future Directions",
        authors: ["M.H. Rahman", "Dr. S. Radiologist", "Prof. I. Expert"],
        journal: "JAMA Radiology",
        year: 2024,
        volume: "181",
        issue: "7",
        pages: "834-842",
        type: PUBLICATION_TYPES.REVIEW,
        status: PUBLICATION_STATUS.PUBLISHED,
        doi: "10.1001/jamaradiol.2024.1234",
        impactFactor: 7.931,
        quartile: "Q1",
        citations: 67,
        downloads: 1234,
        views: 2987,
        abstract:
          "Comprehensive review of AI applications in medical imaging, covering current clinical implementations, regulatory considerations, and future research directions in radiology.",
        keywords: [
          "Artificial Intelligence",
          "Radiology",
          "Medical Imaging",
          "Clinical Implementation",
          "Regulatory Affairs",
        ],
        publicationDate: "2024-07-10",
        openAccess: false,
        featured: true,
        coAuthors: 3,
        institutions: [
          "University of Dhaka",
          "Mayo Clinic",
          "Stanford University",
        ],
        reviewType: "Invited Review",
      },
    ];
    setPublications(demoPublications);
  }, []);

  // Use state for publications data
  const allPublications = useMemo(() => publications, [publications]);

  // Get unique filter options
  const uniqueTypes = useMemo(() => {
    return [...new Set(allPublications.map((p) => p.type))].sort();
  }, [allPublications]);

  const uniqueStatuses = useMemo(() => {
    return [...new Set(allPublications.map((p) => p.status))].sort();
  }, [allPublications]);

  const uniqueYears = useMemo(() => {
    return [...new Set(allPublications.map((p) => p.year))].sort(
      (a, b) => b - a
    );
  }, [allPublications]);

  // Helper function for H-Index calculation
  const calculateHIndex = useCallback((publications) => {
    const citations = publications
      .map((pub) => pub.citations || 0)
      .sort((a, b) => b - a);

    let hIndex = 0;
    for (let i = 0; i < citations.length; i++) {
      if (citations[i] >= i + 1) {
        hIndex = i + 1;
      } else {
        break;
      }
    }
    return hIndex;
  }, []);

  // Filter publications
  const filteredPublications = useMemo(() => {
    return allPublications.filter((pub) => {
      const matchesSearch =
        searchTerm === "" ||
        pub.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors?.some((author) =>
          author.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        pub.journal?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.abstract?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.keywords?.some((keyword) =>
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesType =
        typeFilter === FILTER_ALL_VALUE || pub.type === typeFilter;
      const matchesStatus =
        statusFilter === FILTER_ALL_VALUE || pub.status === statusFilter;
      const matchesYear =
        yearFilter === FILTER_ALL_VALUE || pub.year.toString() === yearFilter;

      return matchesSearch && matchesType && matchesStatus && matchesYear;
    });
  }, [allPublications, searchTerm, typeFilter, statusFilter, yearFilter]);

  // Calculate comprehensive statistics
  const statistics = useMemo(() => {
    const totalCitations = allPublications.reduce(
      (sum, pub) => sum + (pub.citations || 0),
      0
    );
    const totalDownloads = allPublications.reduce(
      (sum, pub) => sum + (pub.downloads || 0),
      0
    );
    const totalViews = allPublications.reduce(
      (sum, pub) => sum + (pub.views || 0),
      0
    );
    const avgImpactFactor =
      allPublications
        .filter((pub) => pub.impactFactor)
        .reduce((sum, pub) => sum + pub.impactFactor, 0) /
      allPublications.filter((pub) => pub.impactFactor).length;

    return {
      totalPublications: allPublications.length,
      totalCitations,
      totalDownloads,
      totalViews,
      avgImpactFactor: avgImpactFactor ? avgImpactFactor.toFixed(2) : "N/A",
      q1Journals: allPublications.filter((pub) => pub.quartile === "Q1").length,
      openAccessCount: allPublications.filter((pub) => pub.openAccess).length,
      currentYear: allPublications.filter((pub) => pub.year === 2024).length,
      hIndex: calculateHIndex(allPublications),
    };
  }, [allPublications, calculateHIndex]);

  // Helper functions

  const getTypeIcon = useCallback((type) => {
    const icons = {
      journal: <Article />,
      conference: <School />,
      book: <BookmarkBorder />,
      preprint: <Science />,
      thesis: <Assessment />,
      review: <Groups />,
    };
    return icons[type] || <Article />;
  }, []);

  const getTypeColor = useCallback((type) => {
    return TYPE_COLORS[type] || TYPE_COLORS.journal;
  }, []);

  const getStatusColor = useCallback((status) => {
    return STATUS_COLORS[status] || STATUS_COLORS.Draft;
  }, []);

  const formatAuthors = useCallback((authors) => {
    if (!authors || authors.length === 0) return "Unknown Author";
    if (authors.length <= 3) {
      return authors.join(", ");
    }
    return `${authors[0]}, et al. (${authors.length} authors)`;
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setTypeFilter(FILTER_ALL_VALUE);
    setStatusFilter(FILTER_ALL_VALUE);
    setYearFilter(FILTER_ALL_VALUE);
  }, []);

  // CRUD handlers
  const handleOpenAddDialog = () => {
    setDialogMode("add");
    setSelectedPublication(null);
    setFormData({
      // Basic Info
      title: "",
      authors: [],
      abstract: "",
      keywords: [],

      // Publication Details
      type: PUBLICATION_TYPES.JOURNAL,
      status: PUBLICATION_STATUS.DRAFT,
      year: new Date().getFullYear(),

      // Journal/Venue Info
      journal: "",
      bookTitle: "",
      conference: "",
      publisher: "",

      // Volume/Issue/Pages
      volume: "",
      issue: "",
      pages: "",

      // Identifiers & Metrics
      doi: "",
      isbn: "",
      impactFactor: "",
      quartile: "",

      // Conference Specific
      location: "",
      acceptanceRate: "",

      // Book Specific
      editor: "",

      // Thesis Specific
      university: "",
      department: "",
      advisor: "",
      degreeType: "",

      // Preprint Specific
      targetJournal: "",

      // Review Specific
      reviewType: "",

      // Flags
      openAccess: false,
      featured: false,
    });
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (publication) => {
    setDialogMode("edit");
    setSelectedPublication(publication);
    setFormData({
      // Basic Info
      title: publication.title || "",
      authors: Array.isArray(publication.authors) ? publication.authors : [],
      abstract: publication.abstract || "",
      keywords: Array.isArray(publication.keywords) ? publication.keywords : [],

      // Publication Details
      type: publication.type || PUBLICATION_TYPES.JOURNAL,
      status: publication.status || PUBLICATION_STATUS.DRAFT,
      year: publication.year || new Date().getFullYear(),

      // Journal/Venue Info
      journal: publication.journal || "",
      bookTitle: publication.bookTitle || "",
      conference: publication.conference || "",
      publisher: publication.publisher || "",

      // Volume/Issue/Pages
      volume: publication.volume || "",
      issue: publication.issue || "",
      pages: publication.pages || "",

      // Identifiers & Metrics
      doi: publication.doi || "",
      isbn: publication.isbn || "",
      impactFactor: publication.impactFactor || "",
      quartile: publication.quartile || "",

      // Conference Specific
      location: publication.location || "",
      acceptanceRate: publication.acceptanceRate || "",

      // Book Specific
      editor: publication.editor || "",

      // Thesis Specific
      university: publication.university || "",
      department: publication.department || "",
      advisor: publication.advisor || "",
      degreeType: publication.degreeType || "",

      // Preprint Specific
      targetJournal: publication.targetJournal || "",

      // Review Specific
      reviewType: publication.reviewType || "",

      // Flags
      openAccess: publication.openAccess || false,
      featured: publication.featured || false,
    });
    setDialogOpen(true);
  };

  const handleOpenDeleteDialog = (publication) => {
    setSelectedPublication(publication);
    setDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPublication(null);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedPublication(null);
  };

  const handleSave = () => {
    // Validate required fields
    if (!formData.title.trim() || !formData.authors.length) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields (Title and Authors).",
        severity: "error",
      });
      return;
    }

    if (dialogMode === "add") {
      // Add new publication
      const newPublication = {
        ...formData,
        id: `pub-${Date.now()}`,
        title: formData.title.trim(),
        publicationDate: new Date().toISOString().split("T")[0],
        citations: 0,
        downloads: 0,
        views: 0,
      };
      setPublications((prev) => [newPublication, ...prev]);
      setSnackbar({
        open: true,
        message: "Publication added successfully!",
        severity: "success",
      });
    } else if (dialogMode === "edit") {
      // Update existing publication
      const updatedPublication = {
        ...selectedPublication,
        ...formData,
        title: formData.title.trim(),
      };
      setPublications((prev) =>
        prev.map((pub) =>
          pub.id === selectedPublication.id ? updatedPublication : pub
        )
      );
      setSnackbar({
        open: true,
        message: "Publication updated successfully!",
        severity: "success",
      });
    }

    handleCloseDialog();
  };

  const handleDeletePublication = () => {
    if (!selectedPublication?.id) {
      setSnackbar({
        open: true,
        message: "Error: No publication selected for deletion.",
        severity: "error",
      });
      return;
    }

    setPublications((prev) =>
      prev.filter((pub) => pub.id !== selectedPublication.id)
    );
    handleCloseDeleteDialog();
    setSnackbar({
      open: true,
      message: "Publication deleted successfully!",
      severity: "success",
    });
  };

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
          Research Publications
        </Typography>
        <Button
          onClick={handleOpenAddDialog}
          sx={{
            background: "#66BB6A",
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
              backgroundColor: "#81C784",
            },
          }}
        >
          <Add fontSize="small" />
          Add Publication
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
            label: "Publications",
            value: statistics.totalPublications,
            icon: <Article />,
            color: "#2196F3",
          },
          {
            label: "Citations",
            value: statistics.totalCitations,
            icon: <FormatQuote />,
            color: "#4CAF50",
          },
          {
            label: "H-Index",
            value: statistics.hIndex,
            icon: <TrendingUp />,
            color: "#FF9800",
          },
          {
            label: "Open Access",
            value: statistics.openAccessCount,
            icon: <Public />,
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
                Filter Publications
              </Typography>
            </Stack>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {filteredPublications.length} of {allPublications.length}
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            {/* Search */}
            <TextField
              placeholder="Search publications, authors, or keywords..."
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
                    borderColor: "#66BB6A",
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
                  "&.Mui-focused": { color: "#66BB6A" },
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
                    borderColor: "#66BB6A",
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
                  "&.Mui-focused": { color: "#66BB6A" },
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
                    borderColor: "#66BB6A",
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

            {/* Year Filter */}
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": { color: "#66BB6A" },
                }}
              >
                Year
              </InputLabel>
              <Select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                label="Year"
                sx={{
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#66BB6A",
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.7)",
                  },
                }}
              >
                <MenuItem value={FILTER_ALL_VALUE}>All Years</MenuItem>
                {uniqueYears.map((year) => (
                  <MenuItem key={year} value={year.toString()}>
                    {year}
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

      {/* Publications List */}
      {filteredPublications.length === 0 ? (
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
            No Publications Found
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 14,
              maxWidth: 400,
              lineHeight: 1.6,
            }}
          >
            Try adjusting your search terms or filters to find the publications
            you're looking for.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={3}>
          {filteredPublications.map((publication) => (
            <Box
              key={publication.id}
              sx={{
                p: 3,
                borderRadius: 4,
                background: `linear-gradient(135deg, ${getTypeColor(
                  publication.type
                )}12 0%, ${getTypeColor(publication.type)}06 100%)`,
                border: `1px solid ${getTypeColor(publication.type)}30`,
                position: "relative",
                transition: "all 160ms ease",
                "&:hover": {
                  borderColor: `${getTypeColor(publication.type)}60`,
                  transform: "translateY(-2px)",
                  boxShadow: `0 8px 32px ${getTypeColor(publication.type)}20`,
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
                        backgroundColor: `${getTypeColor(publication.type)}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: getTypeColor(publication.type),
                        mt: 0.5,
                      }}
                    >
                      {getTypeIcon(publication.type)}
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
                        {publication.title}
                        {publication.featured && (
                          <Star
                            sx={{ ml: 1, fontSize: 18, color: "#FFD700" }}
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
                        {formatAuthors(publication.authors)}
                      </Typography>

                      {/* Publication Info */}
                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        alignItems="center"
                      >
                        <Chip
                          label={
                            publication.type.charAt(0).toUpperCase() +
                            publication.type.slice(1)
                          }
                          size="small"
                          sx={{
                            backgroundColor: `${getTypeColor(
                              publication.type
                            )}20`,
                            color: getTypeColor(publication.type),
                            fontWeight: 600,
                            fontSize: 12,
                            border: `1px solid ${getTypeColor(
                              publication.type
                            )}40`,
                          }}
                        />
                        <Chip
                          label={publication.status}
                          size="small"
                          sx={{
                            backgroundColor: `${getStatusColor(
                              publication.status
                            )}20`,
                            color: getStatusColor(publication.status),
                            fontWeight: 600,
                            fontSize: 12,
                            border: `1px solid ${getStatusColor(
                              publication.status
                            )}40`,
                          }}
                        />
                        <Chip
                          label={publication.year}
                          size="small"
                          sx={{
                            backgroundColor: "#2196F3",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: 12,
                          }}
                        />
                        {publication.quartile && (
                          <Chip
                            label={`${publication.quartile} Journal`}
                            size="small"
                            sx={{
                              backgroundColor: "#4CAF50",
                              color: "#fff",
                              fontWeight: 600,
                              fontSize: 12,
                            }}
                          />
                        )}
                        {publication.openAccess && (
                          <Chip
                            icon={<Public fontSize="small" />}
                            label="Open Access"
                            size="small"
                            sx={{
                              backgroundColor: "#FF9800",
                              color: "#fff",
                              fontWeight: 600,
                              fontSize: 12,
                            }}
                          />
                        )}
                        {publication.type === PUBLICATION_TYPES.THESIS &&
                          publication.degreeType && (
                            <Chip
                              label={publication.degreeType}
                              size="small"
                              sx={{
                                backgroundColor: "#795548",
                                color: "#fff",
                                fontWeight: 600,
                                fontSize: 12,
                              }}
                            />
                          )}
                        {publication.type === PUBLICATION_TYPES.CONFERENCE &&
                          publication.acceptanceRate && (
                            <Chip
                              label={`${publication.acceptanceRate} acceptance`}
                              size="small"
                              sx={{
                                backgroundColor: "#9C27B0",
                                color: "#fff",
                                fontWeight: 600,
                                fontSize: 12,
                              }}
                            />
                          )}
                        {publication.type === PUBLICATION_TYPES.BOOK &&
                          publication.publisher && (
                            <Chip
                              label={publication.publisher}
                              size="small"
                              sx={{
                                backgroundColor: "#607D8B",
                                color: "#fff",
                                fontWeight: 600,
                                fontSize: 12,
                              }}
                            />
                          )}
                      </Stack>
                    </Box>
                  </Stack>

                  {/* Action Buttons */}
                  <Stack direction="row" spacing={0.5}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEditDialog(publication);
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
                        handleOpenDeleteDialog(publication);
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

                {/* Publication Details */}
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {/* Thesis Details */}
                  {publication.type === PUBLICATION_TYPES.THESIS && (
                    <>
                      {publication.university && `${publication.university}`}
                      {publication.department && ` • ${publication.department}`}
                      {publication.degreeType &&
                        ` • ${publication.degreeType} Dissertation`}
                      {publication.advisor &&
                        ` • Advisor: ${publication.advisor}`}
                      {publication.pages && ` • ${publication.pages} pages`}
                    </>
                  )}

                  {/* Journal Details */}
                  {publication.type === PUBLICATION_TYPES.JOURNAL && (
                    <>
                      {publication.journal}
                      {publication.volume && ` • Vol. ${publication.volume}`}
                      {publication.issue && `, Issue ${publication.issue}`}
                      {publication.pages && ` • pp. ${publication.pages}`}
                    </>
                  )}

                  {/* Conference Details */}
                  {publication.type === PUBLICATION_TYPES.CONFERENCE && (
                    <>
                      {publication.conference || publication.journal}
                      {publication.location && ` • ${publication.location}`}
                      {publication.acceptanceRate &&
                        ` • Acceptance Rate: ${publication.acceptanceRate}`}
                    </>
                  )}

                  {/* Book Details */}
                  {publication.type === PUBLICATION_TYPES.BOOK && (
                    <>
                      {publication.bookTitle}
                      {publication.publisher && ` • ${publication.publisher}`}
                      {publication.editor && ` • Editor: ${publication.editor}`}
                      {publication.pages && ` • pp. ${publication.pages}`}
                    </>
                  )}

                  {/* Preprint Details */}
                  {publication.type === PUBLICATION_TYPES.PREPRINT && (
                    <>
                      {publication.journal}
                      {publication.targetJournal &&
                        ` • Target: ${publication.targetJournal}`}
                    </>
                  )}

                  {/* Review Details */}
                  {publication.type === PUBLICATION_TYPES.REVIEW && (
                    <>
                      {publication.journal}
                      {publication.reviewType && ` • ${publication.reviewType}`}
                      {publication.volume && ` • Vol. ${publication.volume}`}
                      {publication.issue && `, Issue ${publication.issue}`}
                      {publication.pages && ` • pp. ${publication.pages}`}
                    </>
                  )}
                </Typography>

                {/* Abstract */}
                {publication.abstract && (
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: 14,
                      lineHeight: 1.6,
                      fontStyle: "italic",
                    }}
                  >
                    {publication.abstract}
                  </Typography>
                )}

                {/* Impact Metrics */}
                {(publication.citations > 0 ||
                  publication.downloads > 0 ||
                  publication.views > 0 ||
                  publication.impactFactor) && (
                  <Stack direction="row" spacing={3} flexWrap="wrap">
                    {publication.citations > 0 && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <FormatQuote sx={{ color: "#4CAF50", fontSize: 16 }} />
                        <Typography
                          sx={{
                            color: "#4CAF50",
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          {publication.citations} citations
                        </Typography>
                      </Box>
                    )}
                    {publication.downloads > 0 && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Download sx={{ color: "#2196F3", fontSize: 16 }} />
                        <Typography
                          sx={{
                            color: "#2196F3",
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          {publication.downloads} downloads
                        </Typography>
                      </Box>
                    )}
                    {publication.views > 0 && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Visibility sx={{ color: "#9C27B0", fontSize: 16 }} />
                        <Typography
                          sx={{
                            color: "#9C27B0",
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          {publication.views} views
                        </Typography>
                      </Box>
                    )}
                    {publication.impactFactor && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <TrendingUp sx={{ color: "#FF9800", fontSize: 16 }} />
                        <Typography
                          sx={{
                            color: "#FF9800",
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          IF: {publication.impactFactor}
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                )}

                {/* Keywords */}
                {publication.keywords && publication.keywords.length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {publication.keywords.map((keyword) => (
                      <Chip
                        key={`${publication.id}-${keyword}`}
                        label={keyword}
                        size="small"
                        sx={{
                          backgroundColor: `${getTypeColor(
                            publication.type
                          )}25`,
                          color: `${getTypeColor(publication.type)}FF`,
                          fontWeight: 600,
                          fontSize: 11,
                          "&:hover": {
                            backgroundColor: `${getTypeColor(
                              publication.type
                            )}40`,
                          },
                        }}
                      />
                    ))}
                  </Stack>
                )}

                {/* Action Links */}
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  {publication.doi && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Launch />}
                      href={`https://doi.org/${publication.doi}`}
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
                      DOI
                    </Button>
                  )}
                  {publication.openAccess && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<GetApp />}
                      sx={{
                        color: "#4CAF50",
                        borderColor: "#4CAF50",
                        fontSize: 12,
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "rgba(76, 175, 80, 0.1)",
                        },
                      }}
                    >
                      PDF
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Share />}
                    sx={{
                      color: "rgba(255,255,255,0.6)",
                      borderColor: "rgba(255,255,255,0.3)",
                      fontSize: 12,
                      textTransform: "none",
                      "&:hover": {
                        borderColor: "rgba(255,255,255,0.5)",
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    Share
                  </Button>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}

      {/* Add/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#1e1e1e",
            color: "#fff",
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#fff",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            pb: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Article sx={{ color: "#66BB6A" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {dialogMode === "add"
                ? "Add New Publication"
                : "Edit Publication"}
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ pb: 3, px: 3 }}>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              {/* Row 1: Title */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title *"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>

              {/* Row 2: Authors */}
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  freeSolo
                  options={[]}
                  value={formData.authors || []}
                  onChange={(event, newValue) => {
                    setFormData((prev) => ({ ...prev, authors: newValue }));
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(102, 187, 106, 0.1)",
                          borderColor: "#66BB6A",
                          color: "#66BB6A",
                        }}
                        {...getTagProps({ index })}
                        key={index}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Authors *"
                      placeholder="Add author names..."
                      helperText="Press Enter to add authors"
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                        "& .MuiFormHelperText-root": {
                          color: "rgba(255,255,255,0.6)",
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Row 3: Type + Status + Year */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Type *
                  </InputLabel>
                  <Select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    sx={{
                      color: "#fff",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#66BB6A",
                      },
                    }}
                  >
                    <MenuItem value={PUBLICATION_TYPES.JOURNAL}>
                      Journal
                    </MenuItem>
                    <MenuItem value={PUBLICATION_TYPES.CONFERENCE}>
                      Conference
                    </MenuItem>
                    <MenuItem value={PUBLICATION_TYPES.BOOK}>Book</MenuItem>
                    <MenuItem value={PUBLICATION_TYPES.PREPRINT}>
                      Preprint
                    </MenuItem>
                    <MenuItem value={PUBLICATION_TYPES.THESIS}>Thesis</MenuItem>
                    <MenuItem value={PUBLICATION_TYPES.REVIEW}>Review</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Status
                  </InputLabel>
                  <Select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    sx={{
                      color: "#fff",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#66BB6A",
                      },
                    }}
                  >
                    <MenuItem value={PUBLICATION_STATUS.PUBLISHED}>
                      Published
                    </MenuItem>
                    <MenuItem value={PUBLICATION_STATUS.ACCEPTED}>
                      Accepted
                    </MenuItem>
                    <MenuItem value={PUBLICATION_STATUS.UNDER_REVIEW}>
                      Under Review
                    </MenuItem>
                    <MenuItem value={PUBLICATION_STATUS.IN_PRESS}>
                      In Press
                    </MenuItem>
                    <MenuItem value={PUBLICATION_STATUS.SUBMITTED}>
                      Submitted
                    </MenuItem>
                    <MenuItem value={PUBLICATION_STATUS.DRAFT}>Draft</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Year"
                  type="number"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      year:
                        parseInt(e.target.value) || new Date().getFullYear(),
                    })
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>

              {/* Row 4: Publication Venue (Dynamic based on type) */}
              {formData.type === PUBLICATION_TYPES.JOURNAL && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Journal Name"
                    value={formData.journal}
                    onChange={(e) =>
                      setFormData({ ...formData, journal: e.target.value })
                    }
                    placeholder="e.g., Nature Machine Intelligence, IEEE Transactions..."
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "#fff",
                        "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.5)",
                        },
                        "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                    }}
                  />
                </Grid>
              )}

              {formData.type === PUBLICATION_TYPES.CONFERENCE && (
                <>
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      label="Conference Name"
                      value={formData.conference}
                      onChange={(e) =>
                        setFormData({ ...formData, conference: e.target.value })
                      }
                      placeholder="e.g., Neural Information Processing Systems (NeurIPS)"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="e.g., New Orleans, LA, USA"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>
                </>
              )}

              {formData.type === PUBLICATION_TYPES.BOOK && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Book Title"
                      value={formData.bookTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, bookTitle: e.target.value })
                      }
                      placeholder="e.g., Handbook of Artificial Intelligence in Healthcare"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Publisher"
                      value={formData.publisher}
                      onChange={(e) =>
                        setFormData({ ...formData, publisher: e.target.value })
                      }
                      placeholder="e.g., Springer Nature"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Editor"
                      value={formData.editor}
                      onChange={(e) =>
                        setFormData({ ...formData, editor: e.target.value })
                      }
                      placeholder="e.g., Prof. John Smith"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>
                </>
              )}

              {formData.type === PUBLICATION_TYPES.THESIS && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="University"
                      value={formData.university}
                      onChange={(e) =>
                        setFormData({ ...formData, university: e.target.value })
                      }
                      placeholder="e.g., University of Dhaka"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Department"
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                      placeholder="e.g., Computer Science"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Degree Type"
                      value={formData.degreeType}
                      onChange={(e) =>
                        setFormData({ ...formData, degreeType: e.target.value })
                      }
                      placeholder="e.g., PhD, MSc"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Advisor"
                      value={formData.advisor}
                      onChange={(e) =>
                        setFormData({ ...formData, advisor: e.target.value })
                      }
                      placeholder="e.g., Prof. A.K.M. Rahman"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Total Pages"
                      value={formData.pages}
                      onChange={(e) =>
                        setFormData({ ...formData, pages: e.target.value })
                      }
                      placeholder="e.g., 187"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>
                </>
              )}

              {formData.type === PUBLICATION_TYPES.PREPRINT && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Preprint Server"
                      value={formData.journal}
                      onChange={(e) =>
                        setFormData({ ...formData, journal: e.target.value })
                      }
                      placeholder="e.g., bioRxiv, arXiv"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Target Journal"
                      value={formData.targetJournal}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          targetJournal: e.target.value,
                        })
                      }
                      placeholder="e.g., Nature Medicine"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>
                </>
              )}

              {formData.type === PUBLICATION_TYPES.REVIEW && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Journal Name"
                      value={formData.journal}
                      onChange={(e) =>
                        setFormData({ ...formData, journal: e.target.value })
                      }
                      placeholder="e.g., JAMA Radiology"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Review Type"
                      value={formData.reviewType}
                      onChange={(e) =>
                        setFormData({ ...formData, reviewType: e.target.value })
                      }
                      placeholder="e.g., Systematic Review, Invited Review"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>
                </>
              )}

              {/* Row 5: Volume/Issue/Pages (For journals, books, reviews) */}
              {(formData.type === PUBLICATION_TYPES.JOURNAL ||
                formData.type === PUBLICATION_TYPES.BOOK ||
                formData.type === PUBLICATION_TYPES.REVIEW) && (
                <>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Volume"
                      value={formData.volume}
                      onChange={(e) =>
                        setFormData({ ...formData, volume: e.target.value })
                      }
                      placeholder="e.g., 71"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Issue"
                      value={formData.issue}
                      onChange={(e) =>
                        setFormData({ ...formData, issue: e.target.value })
                      }
                      placeholder="e.g., 3"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Pages"
                      value={formData.pages}
                      onChange={(e) =>
                        setFormData({ ...formData, pages: e.target.value })
                      }
                      placeholder="e.g., 445-456"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>
                </>
              )}

              {/* Row 6: Identifiers */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={
                    formData.type === PUBLICATION_TYPES.BOOK ? "ISBN" : "DOI"
                  }
                  value={
                    formData.type === PUBLICATION_TYPES.BOOK
                      ? formData.isbn
                      : formData.doi
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [formData.type === PUBLICATION_TYPES.BOOK
                        ? "isbn"
                        : "doi"]: e.target.value,
                    })
                  }
                  placeholder={
                    formData.type === PUBLICATION_TYPES.BOOK
                      ? "978-3-030-12345-7"
                      : "10.1000/182"
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>

              {/* Impact Factor & Quartile (for journals only) */}
              {(formData.type === PUBLICATION_TYPES.JOURNAL ||
                formData.type === PUBLICATION_TYPES.REVIEW) && (
                <>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Impact Factor"
                      type="number"
                      value={formData.impactFactor}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          impactFactor: e.target.value,
                        })
                      }
                      placeholder="e.g., 25.898"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                        Quartile
                      </InputLabel>
                      <Select
                        value={formData.quartile}
                        onChange={(e) =>
                          setFormData({ ...formData, quartile: e.target.value })
                        }
                        sx={{
                          color: "#fff",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#66BB6A",
                          },
                        }}
                      >
                        <MenuItem value="Q1">Q1</MenuItem>
                        <MenuItem value="Q2">Q2</MenuItem>
                        <MenuItem value="Q3">Q3</MenuItem>
                        <MenuItem value="Q4">Q4</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              {/* Acceptance Rate (for conferences) */}
              {formData.type === PUBLICATION_TYPES.CONFERENCE && (
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Acceptance Rate"
                    value={formData.acceptanceRate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        acceptanceRate: e.target.value,
                      })
                    }
                    placeholder="e.g., 26.1%"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "#fff",
                        "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.5)",
                        },
                        "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                    }}
                  />
                </Grid>
              )}

              {/* Row 7: Toggles */}
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.openAccess}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          openAccess: e.target.checked,
                        })
                      }
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#66BB6A",
                          "&:hover": {
                            backgroundColor: "rgba(102, 187, 106, 0.04)",
                          },
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: "#66BB6A",
                          },
                      }}
                    />
                  }
                  label="Open Access"
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#66BB6A",
                          "&:hover": {
                            backgroundColor: "rgba(102, 187, 106, 0.04)",
                          },
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: "#66BB6A",
                          },
                      }}
                    />
                  }
                  label="Featured"
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                />
              </Grid>

              {/* Row 8: Abstract */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Abstract"
                  multiline
                  rows={4}
                  value={formData.abstract}
                  onChange={(e) =>
                    setFormData({ ...formData, abstract: e.target.value })
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                    },
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  }}
                />
              </Grid>

              {/* Row 9: Keywords */}
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  freeSolo
                  options={[]}
                  value={formData.keywords || []}
                  onChange={(event, newValue) => {
                    setFormData((prev) => ({ ...prev, keywords: newValue }));
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(33, 150, 243, 0.1)",
                          borderColor: "#90CAF9",
                          color: "#90CAF9",
                        }}
                        {...getTagProps({ index })}
                        key={index}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Keywords"
                      placeholder="Machine Learning, AI, Healthcare..."
                      helperText="Press Enter to add keywords"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused fieldset": { borderColor: "#66BB6A" },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                        },
                        "& .MuiFormHelperText-root": {
                          color: "rgba(255,255,255,0.6)",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ p: 3, borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Button
            onClick={handleCloseDialog}
            sx={{ color: "rgba(255,255,255,0.7)" }}
            startIcon={<Close />}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!formData.title || !formData.authors.length}
            startIcon={<Save />}
            sx={{
              backgroundColor: "#66BB6A",
              color: "#1a1a1a",
              "&:hover": { backgroundColor: "#81C784" },
              "&:disabled": { backgroundColor: "rgba(102, 187, 106, 0.3)" },
            }}
          >
            {dialogMode === "add" ? "Add Publication" : "Update Publication"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        PaperProps={{
          sx: {
            bgcolor: "#1e1e1e",
            color: "#fff",
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ color: "#f44336" }}>
            Delete Publication
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{selectedPublication?.title}</strong>?
          </Typography>
          <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.7)" }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleCloseDeleteDialog}
            sx={{ color: "rgba(255,255,255,0.7)" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeletePublication}
            variant="contained"
            sx={{
              bgcolor: "#f44336",
              "&:hover": { bgcolor: "#d32f2f" },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Publications;
