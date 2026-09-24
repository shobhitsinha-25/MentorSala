import {
  Router,
} from "express";

import {
  getBlogs,
  getBlogBySlug,
} from "./blog.controller";

const router =
  Router();

// =====================================================
// GET ALL PUBLISHED BLOGS
// =====================================================

router.get(
  "/",
  getBlogs
);

// =====================================================
// GET SINGLE PUBLISHED BLOG
// =====================================================

router.get(
  "/:slug",
  getBlogBySlug
);

export default router;