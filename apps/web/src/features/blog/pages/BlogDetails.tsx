import { useEffect, useState, useMemo } from "react";
import {
  ArrowLeft,
  CalendarDays,
  FileText,
  Clock,
  Sparkles,
  Share2,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
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
  content: string;
  category: string | null;
  publishedAt: string | null;
  author: BlogAuthor;
}

const BlogDetails = () => {
  const { slug } = useParams<{
    slug: string;
  }>();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH BLOG
  // =====================================================

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/blogs/${slug}`);
        setBlog(response.data.blog);
      } catch (error) {
        console.error(error);
        toast.error("Blog not found");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // =====================================================
  // READING TIME CALCULATION
  // =====================================================

  const readTime = useMemo(() => {
    if (!blog?.content) return "3 min read";
    const words = blog.content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  }, [blog?.content]);

  // =====================================================
  // COPY SHARE LINK
  // =====================================================

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Article link copied to clipboard!");
    }
  };

  // =====================================================
  // DATE FORMATTER
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
  // LOADING STATE
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-indigo-500/20 overflow-x-hidden flex flex-col">
        <AboutNavbar />

        <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="animate-pulse space-y-6">
            <div className="h-6 w-28 bg-slate-200 rounded-lg" />
            <div className="h-10 sm:h-14 w-full bg-slate-200 rounded-2xl" />
            <div className="h-5 w-3/4 bg-slate-200 rounded-lg" />

            <div className="flex items-center gap-3 pt-2">
              <div className="h-11 w-11 rounded-full bg-slate-200 shrink-0" />
              <div className="space-y-2">
                <div className="h-4 w-28 bg-slate-200 rounded" />
                <div className="h-3 w-20 bg-slate-200 rounded" />
              </div>
            </div>

            <div className="h-px bg-slate-200 my-8" />

            <div className="space-y-4">
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-5/6 bg-slate-100 rounded" />
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-4/5 bg-slate-100 rounded" />
            </div>
          </div>
        </main>

        <div className="dark w-full bg-[#07090E] text-zinc-100 selection:bg-purple-500/30 isolate">
          <Footer />
        </div>
      </div>
    );
  }

  // =====================================================
  // NOT FOUND STATE
  // =====================================================

  if (!blog) {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-indigo-500/20 overflow-x-hidden flex flex-col">
        <AboutNavbar />

        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-20">
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shadow-xs">
              <FileText size={28} />
            </div>

            <h1 className="mt-5 text-2xl sm:text-3xl font-black text-slate-950">
              Article Not Found
            </h1>

            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              This blog post may have been moved, updated, or is temporarily
              unavailable.
            </p>

            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-slate-950 hover:bg-indigo-600 transition-colors text-sm font-bold text-white shadow-md shadow-slate-950/20"
            >
              <ArrowLeft size={16} />
              Back to Articles
            </Link>
          </div>
        </main>

        <div className="dark w-full bg-[#07090E] text-zinc-100 selection:bg-purple-500/30 isolate">
          <Footer />
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN ARTICLE PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-indigo-500/20 overflow-x-hidden flex flex-col">
      <AboutNavbar />

      <main className="relative flex-1 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40 border-b border-slate-100">
        {/* Soft Ambient Glows */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-400/10 blur-[140px] rounded-full" />
        <div className="pointer-events-none absolute top-1/3 left-1/4 w-[450px] h-[250px] bg-purple-400/10 blur-[130px] rounded-full" />

        <article className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-20">
          {/* Top Bar Navigation & Share Actions */}
          <div className="flex items-center justify-between gap-4 mb-8 sm:mb-12 mt-4">
            

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-2xs hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/40 transition-colors cursor-pointer"
            >
              <Share2 size={13} />
              <span>Share</span>
            </button>
          </div>

          {/* Category & Read Time Tags */}
          <div className="flex flex-wrap items-center gap-2.5">
            {blog.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Sparkles size={12} className="text-indigo-600" />
                {blog.category}
              </span>
            )}

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-slate-600 text-xs font-semibold">
              <Clock size={12} className="text-slate-500" />
              {readTime}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="mt-5 text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-slate-950">
            {blog.title}
          </h1>

          {/* Excerpt Lead */}
          {blog.excerpt && (
            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-normal border-l-4 border-indigo-600 pl-4 py-1 bg-indigo-50/30 rounded-r-2xl">
              {blog.excerpt}
            </p>
          )}

          {/* Author & Publication Metadata Card */}
          <div className="mt-7 sm:mt-9 flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white shadow-xs">
            <div className="flex items-center gap-3">
              {blog.author.avatar ? (
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="w-11 h-11 rounded-2xl object-cover shrink-0 border border-slate-200 shadow-xs"
                />
              ) : (
                <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-sm font-black text-indigo-600 shrink-0 shadow-xs">
                  {blog.author.name.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    {blog.author.name}
                  </p>
                  <CheckCircle2 size={14} className="text-indigo-600 stroke-[2.5]" />
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  MentorSala Academic Editorial
                </p>
              </div>
            </div>

            {blog.publishedAt && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
                <CalendarDays size={15} className="text-indigo-600" />
                <span>{formatDate(blog.publishedAt)}</span>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="mt-10 border-t border-slate-200/80" />

          {/* =================================================
              ARTICLE BODY
          ================================================= */}
          <div className="mt-8 sm:mt-10 text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-8 whitespace-pre-wrap break-words font-normal">
            {blog.content}
          </div>

          {/* Bottom Article Sign-Off Card */}
          <div className="mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-slate-950 to-zinc-900 p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/15 border border-indigo-500/25 text-indigo-400">
                <BookOpen size={22} />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Prepare with Top 1% Mentors
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Turn study insights into structured rank improvement with dedicated mentors.
                </p>
              </div>
            </div>

            <Link
              to="/signup"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 shadow-md transition-all hover:bg-blue-700 active:scale-95"
            >
              <span>Get Started</span>
              <ArrowLeft size={15} className="rotate-180" />
            </Link>
          </div>
        </article>
      </main>

      {/* Isolated Dark Footer */}
      <div className="dark w-full bg-[#07090E] text-zinc-100 selection:bg-purple-500/30 isolate">
        <Footer />
      </div>
    </div>
  );
};

export default BlogDetails;