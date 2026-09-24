import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Search,
  FileText,
  Sparkles,
  BookOpen,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../../lib/axios";
import AboutNavbar from "../../../pages/About/AboutNavbar";
import Footer from "../../../pages/home/Footer";

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
  category: string | null;
  publishedAt: string | null;
  author: BlogAuthor;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // =====================================================
  // FETCH BLOGS
  // =====================================================

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const response = await api.get("/blogs");
        setBlogs(response.data.blogs || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredBlogs = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) {
      return blogs;
    }

    return blogs.filter((blog) => {
      return (
        blog.title.toLowerCase().includes(searchText) ||
        blog.excerpt?.toLowerCase().includes(searchText) ||
        blog.category?.toLowerCase().includes(searchText) ||
        blog.author.name.toLowerCase().includes(searchText)
      );
    });
  }, [blogs, search]);

  const clearSearch = () => {
    setSearch("");
  };

  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (date: string | null) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-indigo-500/20 overflow-x-hidden flex flex-col">
      {/* Keyframe animation for the rotating conic border beam */}
      <style>{`
        @keyframes rotateBorderGlow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-border-beam {
          animation: rotateBorderGlow 4s linear infinite;
        }
      `}</style>

      {/* Global Navbar */}
      <AboutNavbar />

      {/* =================================================
          HERO SECTION
      ================================================= */}

      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/90 via-white to-white border-b border-slate-100 py-12 sm:py-18 md:py-24">
        {/* Soft Ambient Light Glows */}
        <div className="pointer-events-none absolute -left-28 sm:-left-32 -top-28 sm:-top-32 h-72 sm:h-96 w-72 sm:w-96 rounded-full bg-indigo-400/15 blur-[90px] sm:blur-[120px]" />
        <div className="pointer-events-none absolute -right-28 sm:-right-32 top-10 h-72 sm:h-96 w-72 sm:w-96 rounded-full bg-blue-400/15 blur-[90px] sm:blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-950">
              Learn. Grow.{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 bg-clip-text text-transparent block sm:inline">
                Build Your Future.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-3.5 sm:mt-4 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600 font-normal">
              Explore useful insights, exam preparation roadmaps, high-yield subject strategies, and career counseling advice curated by MentorSala educators.
            </p>
          </div>

          {/* ===================================================
              CENTERED LIGHT-BLUE BEAM SEARCH BAR (RESPONSIVE)
          =================================================== */}
          <div className="mx-auto mt-7 sm:mt-10 md:mt-12 max-w-2xl">
            <div className="relative rounded-2xl sm:rounded-3xl p-[2px] overflow-hidden shadow-xl shadow-cyan-500/10">
              {/* Rotating Light-Blue / Cyan Conic Beam Border Animation */}
              <div
                className="absolute -inset-[150%] animate-border-beam"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, transparent 180deg, #38bdf8 260deg, #06b6d4 310deg, #60a5fa 340deg, transparent 360deg)",
                }}
              />

              {/* Ambient Glow layer matching the border */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-cyan-400/10 blur-sm pointer-events-none" />

              {/* Inner Input Card */}
              <div className="relative flex items-center rounded-[14px] sm:rounded-[22px] bg-white border border-slate-200/80 transition-all duration-200 focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-400/10">
                {/* Search Icon */}
                <div className="pointer-events-none pl-3.5 sm:pl-5 pr-2 sm:pr-3 text-sky-500 transition-colors">
                  <Search size={18} className="stroke-[2.2] sm:w-5 sm:h-5" />
                </div>

                {/* Input Field */}
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles by title, subject, or author..."
                  className="h-12 sm:h-14 w-full bg-transparent pr-16 sm:pr-20 md:pr-24 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none"
                />

                {/* Right Actions: Clear Button / Keyboard Shortcut */}
                <div className="absolute right-2.5 sm:right-4 flex items-center gap-1.5 sm:gap-2">
                  {search ? (
                    <button
                      type="button"
                      onClick={clearSearch}
                      aria-label="Clear search"
                      className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-pointer"
                    >
                      <X size={15} />
                    </button>
                  ) : (
                    <span className="hidden sm:inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-400 tracking-wider">
                      ⌘
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Filter Tag Pills */}
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-500">
              <span className="font-semibold text-slate-400">Popular:</span>
              {["JEE Main", "WBJEE", "Study Strategy", "Revision Tips", "Chemistry"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearch(tag)}
                  className="rounded-full border border-slate-200/80 bg-white px-2.5 sm:px-3 py-0.5 text-slate-600 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50/40 transition-colors cursor-pointer shadow-2xs"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          BLOG CONTENT SECTION
      ================================================= */}

      <section className="flex-1 bg-slate-50/60 py-10 sm:py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-center sm:text-left">
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Latest Articles
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Hand-picked insights to help you prepare smarter and ace your goals.
              </p>
            </div>

            {!loading && filteredBlogs.length > 0 && (
              <span className="text-xs font-semibold text-slate-500">
                Showing <strong className="text-slate-900">{filteredBlogs.length}</strong> {filteredBlogs.length === 1 ? "article" : "articles"}
              </span>
            )}
          </div>

          {/* =================================================
              DARK LOADING SKELETONS
          ================================================= */}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl sm:rounded-3xl border border-zinc-800 bg-zinc-900/90 overflow-hidden shadow-xl animate-pulse"
                >
                  <div className="h-40 sm:h-44 md:h-48 bg-zinc-800/80" />
                  <div className="p-5 sm:p-6 space-y-3 sm:space-y-3.5">
                    <div className="h-4 w-20 bg-zinc-800 rounded-md" />
                    <div className="h-5 sm:h-6 w-4/5 bg-zinc-800 rounded-md" />
                    <div className="h-3.5 w-full bg-zinc-800/60 rounded-md" />
                    <div className="h-3.5 w-3/4 bg-zinc-800/60 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            /* =================================================
                EMPTY STATE
            ================================================= */
            <div className="rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 bg-white px-4 py-12 sm:py-16 text-center shadow-xs">
              <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <FileText size={22} className="sm:w-6 sm:h-6" />
              </div>

              <h3 className="mt-3.5 sm:mt-4 text-base sm:text-lg font-bold text-slate-900">
                No articles found
              </h3>

              <p className="mx-auto mt-1 max-w-sm text-xs sm:text-sm leading-relaxed text-slate-500">
                We couldn't find any articles matching "{search}". Try searching with different keywords.
              </p>

              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="mt-5 sm:mt-6 inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            /* =================================================
                DARK THEME BLOG GRID
            ================================================= */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {filteredBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blogs/${blog.slug}`}
                  className="group flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900 to-zinc-950 text-zinc-100 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 overflow-hidden"
                >
                  <div>
                    {/* CARD TOP MEDIA */}
                    <div className="h-40 sm:h-44 md:h-48 bg-gradient-to-br from-indigo-950/60 via-purple-950/40 to-slate-950 border-b border-zinc-800/80 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_70%)]" />

                      <div className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-zinc-900/90 border border-zinc-700/60 shadow-lg text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-all duration-300">
                        <BookOpen size={22} className="stroke-[2] sm:w-6 sm:h-6" />
                      </div>
                    </div>

                    {/* CARD CONTENT */}
                    <div className="p-4 sm:p-5 md:p-6">
                      {/* CATEGORY & DATE */}
                      <div className="flex items-center justify-between gap-2">
                        {blog.category ? (
                          <span className="inline-flex px-2 sm:px-2.5 py-0.5 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                            {blog.category}
                          </span>
                        ) : (
                          <span />
                        )}

                        {blog.publishedAt && (
                          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-400 font-medium">
                            <CalendarDays size={12} className="text-zinc-500" />
                            {formatDate(blog.publishedAt)}
                          </div>
                        )}
                      </div>

                      {/* TITLE */}
                      <h3 className="mt-3 sm:mt-3.5 text-base sm:text-lg font-bold leading-snug text-white group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>

                      {/* EXCERPT */}
                      {blog.excerpt && (
                        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                          {blog.excerpt}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* AUTHOR & READ MORE */}
                  <div className="p-4 sm:p-5 md:p-6 pt-0">
                    <div className="pt-3.5 sm:pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                        {blog.author.avatar ? (
                          <img
                            src={blog.author.avatar}
                            alt={blog.author.name}
                            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover shrink-0 border border-zinc-700"
                          />
                        ) : (
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] sm:text-[11px] font-bold text-indigo-400 shrink-0">
                            {blog.author.name.charAt(0).toUpperCase()}
                          </div>
                        )}

                        
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold text-indigo-400 group-hover:text-indigo-300 shrink-0">
                        <span>Read</span>
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===================================================
          ISOLATED DARK FOOTER
      =================================================== */}
      <div className="dark w-full bg-[#07090E] text-zinc-100 selection:bg-purple-500/30 isolate">
        <Footer />
      </div>
    </div>
  );
};

export default Blogs;