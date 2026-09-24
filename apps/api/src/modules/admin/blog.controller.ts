import type {
  Request,
  Response,
} from "express";

import { asyncHandler } from "../../utils/asyncHandler";

import {
  createBlogService,
  getAllBlogsForAdmin,
  getBlogByIdForAdmin,
  updateBlogService,
  publishBlogService,
  unpublishBlogService,
  deleteBlogService,
} from "../blog/blog.service";

// =====================================================
// CREATE BLOG
// =====================================================

export const createBlog =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      const {
        title,
        excerpt,
        content,
        category,
      } = req.body;

      const blog =
        await createBlogService({

          title,

          excerpt,

          content,

          category,

          authorId:
            req.user!.userId,

        });

      return res
        .status(201)
        .json({

          success: true,

          message:
            "Blog created successfully",

          blog,

        });
    }
  );

// =====================================================
// GET ALL BLOGS
// =====================================================

export const getAdminBlogs =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      const blogs =
        await getAllBlogsForAdmin();

      return res
        .status(200)
        .json({

          success: true,

          blogs,

        });
    }
  );

// =====================================================
// GET SINGLE BLOG
// =====================================================

export const getAdminBlog =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      const blog =
  await getBlogByIdForAdmin(
    req.params.id as string
  );

      return res
        .status(200)
        .json({

          success: true,

          blog,

        });
    }
  );

// =====================================================
// UPDATE BLOG
// =====================================================

export const updateBlog =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      const {
        title,
        excerpt,
        content,
        category,
      } = req.body;

      const blog =
        await updateBlogService(
          req.params.id as string,
          {
            title,
            excerpt,
            content,
            category,
          }
        );

      return res
        .status(200)
        .json({

          success: true,

          message:
            "Blog updated successfully",

          blog,

        });
    }
  );

// =====================================================
// PUBLISH BLOG
// =====================================================

export const publishBlog =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      const blog =
        await publishBlogService(
          req.params.id as string,
        );

      return res
        .status(200)
        .json({

          success: true,

          message:
            "Blog published successfully",

          blog,

        });
    }
  );

// =====================================================
// UNPUBLISH BLOG
// =====================================================

export const unpublishBlog =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      const blog =
        await unpublishBlogService(
          req.params.id as string,
        );

      return res
        .status(200)
        .json({

          success: true,

          message:
            "Blog moved to draft",

          blog,

        });
    }
  );

// =====================================================
// DELETE BLOG
// =====================================================

export const deleteBlog =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      await deleteBlogService(
        req.params.id as string,
      );

      return res
        .status(200)
        .json({

          success: true,

          message:
            "Blog deleted successfully",

        });
    }
  );