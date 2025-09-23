import React from "react";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import SinglePagePortfolio from "../pages/SinglePagePortfolio.jsx";
import BlogPost from "../pages/BlogPost.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import NotFound from "../pages/NotFound.jsx";
import { useAuth } from "../contexts/AuthContext.js";

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
            <Route path="/dashboard" element={<AdminDashboard />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
};

export default AppRouter;
