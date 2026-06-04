import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import api from "../../lib/axios"; // ✅ UPDATED: Switched to your pre-configured core API client wrapper
import { useAuthStore } from "../../store/auth.store";
import { User, Mail, Lock, ShieldAlert, AlertCircle, Sparkles } from "lucide-react";

export default function Signup() {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  // Modern UI feedback state hooks
  const [formErrors, setFormErrors] = useState({ name: "", email: "", password: "" });
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Smooth away errors inline as typing corrections begin
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  // ✅ FIXED: Centralized routing pipeline safely processes mentor onboarding status checks
  const handleRoleRouting = (authenticatedUser: any) => {
    setUser(authenticatedUser);

    setTimeout(() => {
      // ==========================================
      // MENTOR
      // ==========================================
      console.log("AUTH USER:", authenticatedUser);
      console.log("MENTOR STATUS:", authenticatedUser?.mentorProfile?.status);

      if (authenticatedUser.role === "MENTOR") {
        const status = authenticatedUser?.mentorProfile?.status;

        // NOT STARTED
        if (status === "NOT_STARTED") {
          navigate("/mentor/onboarding", { replace: true });
          return;
        }

        // PENDING
        if (status === "PENDING_APPROVAL") {
          navigate("/mentor/under-review", { replace: true });
          return;
        }

        // APPROVED
        if (status === "APPROVED") {
          navigate("/mentor/dashboard", { replace: true });
          return;
        }

        // REJECTED
        if (status === "REJECTED") {
          navigate("/mentor/rejected", { replace: true });
          return;
        }
      }

      // ==========================================
      // STUDENT
      // ==========================================
      else {
        if (!authenticatedUser.onboardingCompleted) {
          navigate("/onboarding", { replace: true });
        } else {
          navigate("/student/dashboard", { replace: true });
        }
      }
    }, 100);
  };

  // Pre-flight validation rules running entirely on client side
  const validateForm = () => {
    let isValid = true;
    const errors = { name: "", email: "", password: "" };

    if (!formData.name.trim()) {
      errors.name = "Please provide your full legal name.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email parameter field is required.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please input a valid format structure (e.g. name@domain.com).";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "A profile password configuration string is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Passwords must consist of at least 6 characters.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      
      // ✅ UPDATED: Utilizes custom core endpoint utility instance with credentials
      const res = await api.post("/auth/signup", formData);

      if (res.data.success) {
        handleRoleRouting(res.data.user);
      }
    } catch (error: any) {
      console.error("Registration structural error:", error);
      const rawData = error?.response?.data?.message || error?.response?.data;

      // =========================================
      // INTERCEPT RAW SCHEMA STRINGS & ARRAYS
      // =========================================
      if (rawData) {
        try {
          const parsed = typeof rawData === "string" ? JSON.parse(rawData) : rawData;
          if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].message) {
            setServerError(parsed[0].message);
            return;
          } else if (parsed.message) {
            setServerError(parsed.message);
            return;
          }
        } catch (e) {
          if (Array.isArray(rawData) && rawData.length > 0 && rawData[0].message) {
            setServerError(rawData[0].message);
            return;
          }
        }
      }

      const cleanString = typeof rawData === "string" ? rawData : "";
      if (cleanString === "User already exists") {
        setServerError("An account with this email address already exists. Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      setServerError(cleanString || "Failed to finalize registration. Please verify parameters and retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5FF] flex items-center justify-center px-4 py-10 select-none">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 rounded-[28px] overflow-hidden border border-[#E8E5F5] bg-white shadow-[0_15px_40px_rgba(124,58,237,0.08)]">
        
        {/* Left Informative Content Section */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#7C3AED] via-[#6366F1] to-[#2563EB] p-8 text-white relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="relative z-10">
            <h1 className="text-3xl font-black tracking-tight">MentorSala</h1>
            <div className="mt-12">
              <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em]">
                INDIA'S SMART AI EDTECH
              </div>
              <h2 className="mt-6 text-4xl font-black leading-tight">
                Start your <br /> dream rank <br /> journey.
              </h2>
              <p className="mt-4 max-w-sm text-sm text-white/80 leading-relaxed">
                AI-powered mentorship, live classes, analytics, and gamified learning for competitive exams.
              </p>
            </div>
          </div>

          {/* Stats Badges */}
          <div className="grid grid-cols-3 gap-3 mt-8 relative z-10">
            {[
              { value: "50K+", label: "Students" },
              { value: "200+", label: "Mentors" },
              { value: "95%", label: "Success" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl shadow-inner">
                <h3 className="text-lg font-black">{item.value}</h3>
                <p className="mt-1 text-[10px] text-white/70">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Input Workspace Section */}
        <div className="p-6 md:p-10 flex flex-col justify-center bg-white">
          <div className="mb-6">
            <div className="inline-flex rounded-full border border-[#D9D4FF] bg-[#F8FAFF] px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#7C3AED] shadow-sm mb-3">
              CREATE ACCOUNT
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight">Join MentorSala</h2>
            <p className="mt-1.5 text-xs md:text-sm text-[#64748B]">Create your account and begin learning.</p>
          </div>

          {/* Global Alert Notification Banner */}
          {serverError && (
            <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-600 animate-shake">
              <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
              <div className="font-semibold leading-relaxed">{serverError}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Google OAuth Login Button */}
            <div className="flex justify-center transition-transform hover:scale-[1.01]">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    setServerError("");
                    const res = await api.post(
                      "/auth/google",
                      {
                        credential: credentialResponse.credential,
                        role: formData.role,
                      }
                    );

                    if (res.data.success) {
                      handleRoleRouting(res.data.user);
                    }
                  } catch (error: any) {
                    console.error("Google integration failure:", error);
                    setServerError("Google identity handshake aborted. Please register via form entries below.");
                  }
                }}
                onError={() => console.log("Google Authorization Interrupted")}
              />
            </div>

            {/* Visual Separation Boundary */}
            <div className="flex items-center gap-3 my-1">
              <div className="h-px flex-1 bg-[#E5E7EB]" />
              <span className="text-[10px] font-black text-[#94A3B8] tracking-widest whitespace-nowrap uppercase">
                OR SIGNUP WITH EMAIL
              </span>
              <div className="h-px flex-1 bg-[#E5E7EB]" />
            </div>

            {/* Name Input field */}
            <div className="flex flex-col gap-1">
              <div className="relative">
                <User className={`absolute left-4 top-3.5 h-4 w-4 transition-colors ${formErrors.name ? "text-red-400" : "text-[#94A3B8]"}`} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                  className={`w-full rounded-xl border pl-11 pr-4 py-3 text-sm text-[#0F172A] outline-none transition-all placeholder:text-[#94A3B8]
                    ${formErrors.name 
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 shadow-sm" 
                      : "border-[#E8E5F5] bg-[#FAFBFF] focus:border-[#2563EB] focus:bg-white"
                    }`}
                />
              </div>
              {formErrors.name && (
                <div className="flex items-center gap-1.5 text-[11px] text-red-500 font-bold pl-0.5 mt-0.5">
                  <AlertCircle className="h-3 w-3" />
                  <span>{formErrors.name}</span>
                </div>
              )}
            </div>

            {/* Email Input Field */}
            <div className="flex flex-col gap-1">
              <div className="relative">
                <Mail className={`absolute left-4 top-3.5 h-4 w-4 transition-colors ${formErrors.email ? "text-red-400" : "text-[#94A3B8]"}`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  disabled={isSubmitting}
                  className={`w-full rounded-xl border pl-11 pr-4 py-3 text-sm text-[#0F172A] outline-none transition-all placeholder:text-[#94A3B8]
                    ${formErrors.email 
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 shadow-sm" 
                      : "border-[#E8E5F5] bg-[#FAFBFF] focus:border-[#2563EB] focus:bg-white"
                    }`}
                />
              </div>
              {formErrors.email && (
                <div className="flex items-center gap-1.5 text-[11px] text-red-500 font-bold pl-0.5 mt-0.5">
                  <AlertCircle className="h-3 w-3" />
                  <span>{formErrors.email}</span>
                </div>
              )}
            </div>

            {/* Password Input Field */}
            <div className="flex flex-col gap-1">
              <div className="relative">
                <Lock className={`absolute left-4 top-3.5 h-4 w-4 transition-colors ${formErrors.password ? "text-red-400" : "text-[#94A3B8]"}`} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a secure password (min 6 chars)"
                  disabled={isSubmitting}
                  className={`w-full rounded-xl border pl-11 pr-4 py-3 text-sm text-[#0F172A] outline-none transition-all placeholder:text-[#94A3B8]
                    ${formErrors.password 
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 shadow-sm" 
                      : "border-[#E8E5F5] bg-[#FAFBFF] focus:border-[#2563EB] focus:bg-white"
                    }`}
                />
              </div>
              {formErrors.password && (
                <div className="flex items-center gap-1.5 text-[11px] text-red-500 font-bold pl-0.5 mt-0.5">
                  <AlertCircle className="h-3 w-3" />
                  <span>{formErrors.password}</span>
                </div>
              )}
            </div>

            {/* Platform Role Selector Field */}
            <div className="flex flex-col gap-1.5">
              <div className="relative">
                <Sparkles className="absolute left-4 top-3.5 h-4 w-4 text-[#94A3B8]" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-[#E8E5F5] bg-[#FAFBFF] pl-11 pr-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] cursor-pointer appearance-none focus:bg-white transition-colors"
                >
                  <option value="STUDENT">Student Access Profile</option>
                  <option value="MENTOR">Mentor Instructor Profile</option>
                </select>
                <div className="absolute right-4 top-4.5 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-[#94A3B8] pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition-all duration-200 hover:opacity-95 active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitting ? "Generating Profile Environment..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[#64748B]">
            Already have an account?
            <Link to="/login" className="ml-1.5 font-bold text-[#2563EB] hover:underline hover:text-blue-800 transition-colors">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}