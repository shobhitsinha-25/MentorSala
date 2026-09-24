import type {
  Request,
  Response,
} from "express";

import { asyncHandler } from "../../utils/asyncHandler";

import {
  getPublishedBlogs,
  getPublishedBlogBySlug,
} from "./blog.service";

// =====================================================
// GET PUBLISHED BLOGS
// =====================================================

export const getBlogs =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      const blogs =
        await getPublishedBlogs();

      return res
        .status(200)
        .json({
          success: true,
          blogs,
        });
    }
  );

// =====================================================
// GET SINGLE BLOG BY SLUG
// =====================================================

export const getBlogBySlug =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      const blog =
        await getPublishedBlogBySlug(
          req.params.slug as string
        );

      return res
        .status(200)
        .json({
          success: true,
          blog,
        });
    }
  );