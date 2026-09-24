import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  X,
  FileText,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";

import api from "../../../../lib/axios";

interface BlogAuthor {
  id: string;
  name: string;
  avatar: string | null;
}

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  author: BlogAuthor;
}

interface BlogForm {
  title: string;
  excerpt: string;
  content: string;
  category: string;
}

const emptyForm: BlogForm = {
  title: "",
  excerpt: "",
  content: "",
  category: "",
};

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [editingBlogId, setEditingBlogId] =
    useState<string | null>(null);

  const [form, setForm] =
    useState<BlogForm>(emptyForm);

  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");

  // =====================================================
  // FETCH BLOGS
  // =====================================================

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const response =
        await api.get("/admin/blogs");

      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load blogs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // =====================================================
  // OPEN CREATE MODAL
  // =====================================================

  const handleCreate = () => {
    setEditingBlogId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const handleEdit = (
    blog: Blog
  ) => {
    setEditingBlogId(blog.id);

    setForm({
      title: blog.title,
      excerpt: blog.excerpt || "",
      content: blog.content,
      category: blog.category || "",
    });

    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const handleCloseModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingBlogId(null);
    setForm(emptyForm);
  };

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (
    field: keyof BlogForm,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // =====================================================
  // CREATE / UPDATE
  // =====================================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error(
        "Blog title is required"
      );
      return;
    }

    if (!form.content.trim()) {
      toast.error(
        "Blog content is required"
      );
      return;
    }

    try {
      setSaving(true);

      if (editingBlogId) {
        await api.patch(
          `/admin/blogs/${editingBlogId}`,
          {
            title: form.title,
            excerpt: form.excerpt,
            content: form.content,
            category: form.category,
          }
        );

        toast.success(
          "Blog updated successfully"
        );
      } else {
        await api.post(
          "/admin/blogs",
          {
            title: form.title,
            excerpt: form.excerpt,
            content: form.content,
            category: form.category,
          }
        );

        toast.success(
          "Blog created successfully"
        );
      }

      handleCloseModal();

      await fetchBlogs();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // PUBLISH
  // =====================================================

  const handlePublish = async (
    blogId: string
  ) => {
    try {
      await api.patch(
        `/admin/blogs/${blogId}/publish`
      );

      toast.success(
        "Blog published successfully"
      );

      await fetchBlogs();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to publish blog"
      );
    }
  };

  // =====================================================
  // UNPUBLISH
  // =====================================================

  const handleUnpublish = async (
    blogId: string
  ) => {
    try {
      await api.patch(
        `/admin/blogs/${blogId}/unpublish`
      );

      toast.success(
        "Blog moved to draft"
      );

      await fetchBlogs();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to unpublish blog"
      );
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (
    blogId: string
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this blog?"
      );

    if (!confirmed) return;

    try {
      await api.delete(
        `/admin/blogs/${blogId}`
      );

      toast.success(
        "Blog deleted successfully"
      );

      await fetchBlogs();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete blog"
      );
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredBlogs =
    blogs.filter((blog) => {
      const searchText =
        search.toLowerCase().trim();

      if (!searchText) return true;

      return (
        blog.title
          .toLowerCase()
          .includes(searchText) ||
        blog.category
          ?.toLowerCase()
          .includes(searchText) ||
        blog.author.name
          .toLowerCase()
          .includes(searchText)
      );
    });

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (
    date: string
  ) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="h-full bg-[#020617] text-white overflow-y-auto">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="px-8 py-7 border-b border-white/[0.05]">

        <div className="flex items-center justify-between gap-6">

          <div>
            <h1 className="text-2xl font-black tracking-tight">
              Blogs
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Create and manage MentorSala blogs
            </p>
          </div>

          <button
            onClick={handleCreate}
            className="h-11 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center gap-2 text-sm font-bold shadow-lg shadow-indigo-600/20"
          >
            <Plus size={18} />

            Create Blog
          </button>

        </div>

      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="p-8">

        {/* SEARCH */}

        <div className="relative max-w-md mb-6">

          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search blogs..."
            className="w-full h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] pl-11 pr-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/40 transition"
          />

        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (

          <div className="flex items-center justify-center py-24">

            <div className="w-8 h-8 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />

          </div>

        ) : filteredBlogs.length === 0 ? (

          /* =================================================
             EMPTY STATE
          ================================================= */

          <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] py-20 flex flex-col items-center justify-center text-center">

            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4">

              <FileText
                size={26}
                className="text-indigo-400"
              />

            </div>

            <h2 className="text-lg font-bold text-slate-200">
              No blogs found
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Create your first blog to get started.
            </p>

            <button
              onClick={handleCreate}
              className="mt-5 px-5 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-bold transition"
            >
              Create Blog
            </button>

          </div>

        ) : (

          /* =================================================
             BLOG TABLE
          ================================================= */

          <div className="rounded-2xl border border-white/[0.05] overflow-hidden bg-white/[0.015]">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="border-b border-white/[0.05] bg-white/[0.02]">

                    <th className="text-left px-5 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500">
                      Blog
                    </th>

                    <th className="text-left px-5 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500">
                      Category
                    </th>

                    <th className="text-left px-5 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500">
                      Author
                    </th>

                    <th className="text-left px-5 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500">
                      Status
                    </th>

                    <th className="text-left px-5 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500">
                      Date
                    </th>

                    <th className="text-right px-5 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredBlogs.map(
                    (blog) => (

                      <tr
                        key={blog.id}
                        className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.015] transition"
                      >

                        {/* BLOG */}

                        <td className="px-5 py-5 max-w-md">

                          <div className="font-bold text-sm text-slate-200 truncate">
                            {blog.title}
                          </div>

                          {blog.excerpt && (
                            <div className="text-xs text-slate-500 mt-1 line-clamp-2">
                              {blog.excerpt}
                            </div>
                          )}

                        </td>

                        {/* CATEGORY */}

                        <td className="px-5 py-5">

                          {blog.category ? (
                            <span className="inline-flex px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/10 text-indigo-400 text-[11px] font-bold">
                              {blog.category}
                            </span>
                          ) : (
                            <span className="text-slate-600 text-xs">
                              —
                            </span>
                          )}

                        </td>

                        {/* AUTHOR */}

                        <td className="px-5 py-5">

                          <div className="text-sm text-slate-300 font-medium">
                            {blog.author.name}
                          </div>

                        </td>

                        {/* STATUS */}

                        <td className="px-5 py-5">

                          {blog.status ===
                          "PUBLISHED" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/10 text-emerald-400 text-[11px] font-bold">

                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

                              Published

                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/10 text-amber-400 text-[11px] font-bold">

                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />

                              Draft

                            </span>
                          )}

                        </td>

                        {/* DATE */}

                        <td className="px-5 py-5 text-xs text-slate-500 whitespace-nowrap">

                          {blog.status ===
                          "PUBLISHED" &&
                          blog.publishedAt
                            ? formatDate(
                                blog.publishedAt
                              )
                            : formatDate(
                                blog.createdAt
                              )}

                        </td>

                        {/* ACTIONS */}

                        <td className="px-5 py-5">

                          <div className="flex items-center justify-end gap-2">

                            {/* EDIT */}

                            <button
                              onClick={() =>
                                handleEdit(blog)
                              }
                              title="Edit"
                              className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.06] transition flex items-center justify-center"
                            >
                              <Pencil size={15} />
                            </button>

                            {/* PUBLISH / UNPUBLISH */}

                            {blog.status ===
                            "PUBLISHED" ? (

                              <button
                                onClick={() =>
                                  handleUnpublish(
                                    blog.id
                                  )
                                }
                                title="Move to draft"
                                className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition flex items-center justify-center"
                              >
                                <EyeOff
                                  size={15}
                                />
                              </button>

                            ) : (

                              <button
                                onClick={() =>
                                  handlePublish(
                                    blog.id
                                  )
                                }
                                title="Publish"
                                className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition flex items-center justify-center"
                              >
                                <Eye
                                  size={15}
                                />
                              </button>

                            )}

                            {/* DELETE */}

                            <button
                              onClick={() =>
                                handleDelete(
                                  blog.id
                                )
                              }
                              title="Delete"
                              className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/10 text-red-400 hover:bg-red-500/20 transition flex items-center justify-center"
                            >
                              <Trash2
                                size={15}
                              />
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </div>

      {/* =================================================
          CREATE / EDIT MODAL
      ================================================= */}

      {showModal && (

        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">

          <div className="w-full max-w-4xl max-h-[90vh] bg-[#020617] border border-white/[0.08] rounded-2xl shadow-2xl flex flex-col">

            {/* MODAL HEADER */}

            <div className="px-6 py-5 border-b border-white/[0.05] flex items-center justify-between">

              <div>

                <h2 className="text-lg font-black text-white">
                  {editingBlogId
                    ? "Edit Blog"
                    : "Create Blog"}
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  {editingBlogId
                    ? "Update your blog content"
                    : "Create a new blog post"}
                </p>

              </div>

              <button
                onClick={handleCloseModal}
                className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.06] transition flex items-center justify-center"
              >
                <X size={18} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-6 overflow-y-auto space-y-5"
            >

              {/* TITLE */}

              <div>

                <label className="block text-xs font-bold text-slate-400 mb-2">
                  Title
                </label>

                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    handleChange(
                      "title",
                      e.target.value
                    )
                  }
                  placeholder="Enter blog title"
                  className="w-full h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/40 transition"
                />

              </div>

              {/* CATEGORY */}

              <div>

                <label className="block text-xs font-bold text-slate-400 mb-2">
                  Category
                </label>

                <input
                  type="text"
                  value={form.category}
                  onChange={(e) =>
                    handleChange(
                      "category",
                      e.target.value
                    )
                  }
                  placeholder="e.g. JEE Preparation"
                  className="w-full h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/40 transition"
                />

              </div>

              {/* EXCERPT */}

              <div>

                <label className="block text-xs font-bold text-slate-400 mb-2">
                  Short Description
                </label>

                <textarea
                  value={form.excerpt}
                  onChange={(e) =>
                    handleChange(
                      "excerpt",
                      e.target.value
                    )
                  }
                  placeholder="Write a short description..."
                  rows={3}
                  className="w-full rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/40 transition resize-none"
                />

              </div>

              {/* CONTENT */}

              <div>

                <label className="block text-xs font-bold text-slate-400 mb-2">
                  Content
                </label>

                <textarea
                  value={form.content}
                  onChange={(e) =>
                    handleChange(
                      "content",
                      e.target.value
                    )
                  }
                  placeholder="Write your blog content..."
                  rows={14}
                  className="w-full rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3 text-sm leading-6 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/40 transition resize-y"
                />

              </div>

              {/* FOOTER */}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.05]">

                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={saving}
                  className="h-11 px-5 rounded-xl border border-white/[0.06] bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] transition text-sm font-bold disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-sm font-bold disabled:opacity-50 flex items-center gap-2"
                >

                  {saving && (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}

                  {editingBlogId
                    ? "Update Blog"
                    : "Create Blog"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminBlogs;