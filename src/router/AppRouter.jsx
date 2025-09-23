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
  Profile,
  About,
  Education,
  Experience,
  Projects,
  BlogPosts,
  Publications,
  Activities,
  Awards,
  Certificates,
  Networks,
  Grants,
  Skills,
  ComingSoon,
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
          <Route path="/blog/:slug" element={<BlogPost />} />
          {isAuthenticated && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Overview />} />
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
