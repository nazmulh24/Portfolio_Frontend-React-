import React from "react";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import SinglePagePortfolio from "../pages/SinglePagePortfolio.jsx";
import BlogPost from "../pages/BlogPost.jsx";
import NotFound from "../pages/NotFound.jsx";
import { useAuth } from "../contexts/AuthContext.js";

// Dashboard Pages
import {
  DashboardLayout,
  Overview,
  Settings,
  Profile,
  ComingSoon,
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
          <Route path="/blog/:slug" element={<BlogPost />} />
          {isAuthenticated && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />
              <Route
                path="projects"
                element={<ComingSoon sectionName="Projects" />}
              />
              <Route path="blog" element={<ComingSoon sectionName="Blog" />} />
              <Route
                path="publications"
                element={<ComingSoon sectionName="Publications" />}
              />
              <Route
                path="education"
                element={<ComingSoon sectionName="Education" />}
              />
              <Route
                path="experience"
                element={<ComingSoon sectionName="Experience" />}
              />
              <Route
                path="skills"
                element={<ComingSoon sectionName="Skills" />}
              />
              <Route
                path="awards"
                element={<ComingSoon sectionName="Awards" />}
              />
              <Route
                path="certificates"
                element={<ComingSoon sectionName="Certificates" />}
              />
              <Route
                path="networks"
                element={<ComingSoon sectionName="Networks" />}
              />
              <Route
                path="grants"
                element={<ComingSoon sectionName="Grants" />}
              />
              <Route
                path="activities"
                element={<ComingSoon sectionName="Activities" />}
              />
              <Route
                path="about"
                element={<ComingSoon sectionName="About" />}
              />
            </Route>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
};

export default AppRouter;
