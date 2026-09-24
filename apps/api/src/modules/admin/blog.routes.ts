import {
  Router,
} from "express";

import {
  protect,
} from "../auth/auth.middleware";

import {
  authorizeRoles,
} from "../../middleware/role.middleware";

import {
  createBlog,
  getAdminBlogs,
  getAdminBlog,
  updateBlog,
  publishBlog,
  unpublishBlog,
  deleteBlog,
} from "./blog.controller";

const router = Router();

// =====================================================
// ADMIN PROTECTION
// =====================================================

router.use(
  protect,
  authorizeRoles("ADMIN")
);

// =====================================================
// CREATE BLOG
// =====================================================

router.post(
  "/",
  createBlog
);

// =====================================================
// GET ALL BLOGS
// =====================================================

router.get(
  "/",
  getAdminBlogs
);

// =====================================================
// GET SINGLE BLOG
// =====================================================

router.get(
  "/:id",
  getAdminBlog
);

// =====================================================
// UPDATE BLOG
// =====================================================

router.patch(
  "/:id",
  updateBlog
);

// =====================================================
// PUBLISH BLOG
// =====================================================

router.patch(
  "/:id/publish",
  publishBlog
);

// =====================================================
// UNPUBLISH BLOG
// =====================================================

router.patch(
  "/:id/unpublish",
  unpublishBlog
);

// =====================================================
// DELETE BLOG
// =====================================================

router.delete(
  "/:id",
  deleteBlog
);

export default router;