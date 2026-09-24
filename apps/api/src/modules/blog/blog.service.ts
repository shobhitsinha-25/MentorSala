import prisma from "../../config/prisma";

interface CreateBlogInput {
  title: string;
  excerpt?: string;
  content: string;
  category?: string;
  authorId: string;
}

interface UpdateBlogInput {
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
}

// =====================================================
// SLUG GENERATOR
// =====================================================

const generateSlug = (
  title: string
) => {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

// =====================================================
// UNIQUE SLUG
// =====================================================

const generateUniqueSlug =
  async (
    title: string,
    blogId?: string
  ) => {

    const baseSlug =
      generateSlug(title);

    let slug = baseSlug;
    let counter = 1;

    while (true) {

      const existingBlog =
        await prisma.blog.findFirst({
          where: {
            slug,

            ...(blogId
              ? {
                  id: {
                    not: blogId,
                  },
                }
              : {}),
          },
        });

      if (!existingBlog) {
        return slug;
      }

      slug =
        `${baseSlug}-${counter}`;

      counter++;
    }
  };

// =====================================================
// CREATE BLOG
// =====================================================

export const createBlogService =
  async (
    data: CreateBlogInput
  ) => {

    if (!data.title?.trim()) {
      throw new Error(
        "Blog title is required"
      );
    }

    if (!data.content?.trim()) {
      throw new Error(
        "Blog content is required"
      );
    }

    const slug =
      await generateUniqueSlug(
        data.title
      );

    const blog =
      await prisma.blog.create({

        data: {

          title:
            data.title.trim(),

          slug,

          excerpt:
            data.excerpt?.trim() || null,

          content:
            data.content.trim(),

          category:
            data.category?.trim() || null,

          authorId:
            data.authorId,

          status:
            "DRAFT",
        },

        include: {

          author: {

            select: {
              id: true,
              name: true,
              avatar: true,
            },

          },

        },

      });

    return blog;
  };

// =====================================================
// GET ALL BLOGS - ADMIN
// =====================================================

export const getAllBlogsForAdmin =
  async () => {

    return prisma.blog.findMany({

      where: {
        isDeleted: false,
      },

      include: {

        author: {

          select: {
            id: true,
            name: true,
            avatar: true,
          },

        },

      },

      orderBy: {
        createdAt: "desc",
      },

    });
  };

// =====================================================
// GET SINGLE BLOG - ADMIN
// =====================================================

export const getBlogByIdForAdmin =
  async (
    blogId: string
  ) => {

    const blog =
      await prisma.blog.findFirst({

        where: {
          id: blogId,
          isDeleted: false,
        },

        include: {

          author: {

            select: {
              id: true,
              name: true,
              avatar: true,
            },

          },

        },

      });

    if (!blog) {
      throw new Error(
        "Blog not found"
      );
    }

    return blog;
  };

// =====================================================
// UPDATE BLOG
// =====================================================

export const updateBlogService =
  async (
    blogId: string,
    data: UpdateBlogInput
  ) => {

    const existingBlog =
      await prisma.blog.findFirst({

        where: {
          id: blogId,
          isDeleted: false,
        },

      });

    if (!existingBlog) {
      throw new Error(
        "Blog not found"
      );
    }

    let slug =
      existingBlog.slug;

    if (
      data.title &&
      data.title.trim() !==
        existingBlog.title
    ) {

      slug =
        await generateUniqueSlug(
          data.title,
          blogId
        );
    }

    return prisma.blog.update({

      where: {
        id: blogId,
      },

      data: {

        ...(data.title !== undefined && {
          title:
            data.title.trim(),

          slug,
        }),

        ...(data.excerpt !== undefined && {
          excerpt:
            data.excerpt.trim() ||
            null,
        }),

        ...(data.content !== undefined && {
          content:
            data.content.trim(),
        }),

        ...(data.category !== undefined && {
          category:
            data.category.trim() ||
            null,
        }),

      },

      include: {

        author: {

          select: {
            id: true,
            name: true,
            avatar: true,
          },

        },

      },

    });
  };

// =====================================================
// PUBLISH BLOG
// =====================================================

export const publishBlogService =
  async (
    blogId: string
  ) => {

    const blog =
      await prisma.blog.findFirst({

        where: {
          id: blogId,
          isDeleted: false,
        },

      });

    if (!blog) {
      throw new Error(
        "Blog not found"
      );
    }

    return prisma.blog.update({

      where: {
        id: blogId,
      },

      data: {

        status:
          "PUBLISHED",

        publishedAt:
          blog.publishedAt ??
          new Date(),

      },

      include: {

        author: {

          select: {
            id: true,
            name: true,
            avatar: true,
          },

        },

      },

    });
  };

// =====================================================
// UNPUBLISH BLOG
// =====================================================

export const unpublishBlogService =
  async (
    blogId: string
  ) => {

    const blog =
      await prisma.blog.findFirst({

        where: {
          id: blogId,
          isDeleted: false,
        },

      });

    if (!blog) {
      throw new Error(
        "Blog not found"
      );
    }

    return prisma.blog.update({

      where: {
        id: blogId,
      },

      data: {

        status:
          "DRAFT",

        publishedAt: null,

      },

      include: {

        author: {

          select: {
            id: true,
            name: true,
            avatar: true,
          },

        },

      },

    });
  };

// =====================================================
// DELETE BLOG
// =====================================================

export const deleteBlogService =
  async (
    blogId: string
  ) => {

    const blog =
      await prisma.blog.findFirst({

        where: {
          id: blogId,
          isDeleted: false,
        },

      });

    if (!blog) {
      throw new Error(
        "Blog not found"
      );
    }

    return prisma.blog.update({

      where: {
        id: blogId,
      },

      data: {
        isDeleted: true,
      },

    });
  };

// =====================================================
// PUBLIC BLOGS
// =====================================================

export const getPublishedBlogs =
  async () => {

    return prisma.blog.findMany({

      where: {

        status:
          "PUBLISHED",

        isDeleted:
          false,

      },

      select: {

        id: true,

        title: true,

        slug: true,

        excerpt: true,

        category: true,

        publishedAt: true,

        author: {

          select: {
            id: true,
            name: true,
            avatar: true,
          },

        },

      },

      orderBy: {

        publishedAt:
          "desc",

      },

    });
  };

// =====================================================
// PUBLIC SINGLE BLOG
// =====================================================

export const getPublishedBlogBySlug =
  async (
    slug: string
  ) => {

    const blog =
      await prisma.blog.findFirst({

        where: {

          slug,

          status:
            "PUBLISHED",

          isDeleted:
            false,

        },

        select: {

          id: true,

          title: true,

          slug: true,

          excerpt: true,

          content: true,

          category: true,

          publishedAt: true,

          author: {

            select: {
              id: true,
              name: true,
              avatar: true,
            },

          },

        },

      });

    if (!blog) {
      throw new Error(
        "Blog not found"
      );
    }

    return blog;
  };