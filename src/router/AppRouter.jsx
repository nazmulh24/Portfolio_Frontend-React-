import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import SinglePagePortfolio from "../pages/SinglePagePortfolio.jsx";
import NotFound from "../pages/NotFound.jsx";
import { useAuth } from "../contexts/AuthContext.js";

// Dashboard Pages
import {
  DashboardLayout,
  AnalyticsDashboard,
  Profile,
  About,
  Education,
  Experience,
  Projects,
  Skills,
  BlogPosts,
  Publications,
  Activities,
  Awards,
  Certificates,
  Networks,
  Grants,
  Contact,
  Settings,
} from "../pages/dashboard";

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<SinglePagePortfolio />} />

          {isAuthenticated && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<AnalyticsDashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="about" element={<About />} />
              <Route path="projects" element={<Projects />} />
              <Route path="blog" element={<BlogPosts />} />
              <Route path="publications" element={<Publications />} />
              <Route path="education" element={<Education />} />
              <Route path="experience" element={<Experience />} />
              <Route path="skills" element={<Skills />} />
              <Route path="activities" element={<Activities />} />
              <Route path="awards" element={<Awards />} />
              <Route path="certificates" element={<Certificates />} />
              <Route path="networks" element={<Networks />} />
              <Route path="grants" element={<Grants />} />
              <Route path="contact" element={<Contact />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
};

export default AppRouter;
