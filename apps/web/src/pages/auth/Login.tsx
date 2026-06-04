import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import api from "../../lib/axios";
import { useAuthStore } from "../../store/auth.store";
import { AlertCircle } from "lucide-react";

export default function Login() {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to hold clean inline error messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear out errors when user starts modifying input fields
    if (errorMessage) setErrorMessage(null);
  };

  const handleRoleRouting = (authenticatedUser: any) => {
    setUser(authenticatedUser);

    setTimeout(() => {
      // ==========================================
      // MENTOR
      // ==========================================
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

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      const res = await api.post(
  "/auth/login",
  formData,
  { withCredentials: true }
);

      if (res.data.success) {
        // =========================================
        // SAVE ACCESS TOKEN
        // =========================================
        localStorage.setItem("accessToken", res.data.accessToken);

        // =========================================
        // SAVE USER + ROUTE
        // =========================================
        handleRoleRouting(res.data.user);
      }
    } catch (error: any) {
      console.error("Login Exception Handle Context:", error);
      
      const rawData = error?.response?.data?.message || error?.response?.data;
      
      // =========================================
      // CLEAN RAW SCHEMA STRINGS & ARRAYS
      // =========================================
      if (rawData) {
        try {
          // If the error message is a stringified JSON array or object
          const parsed = typeof rawData === "string" ? JSON.parse(rawData) : rawData;
          
          if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].message) {
            setErrorMessage(parsed[0].message);
            return;
          } else if (parsed.message) {
            setErrorMessage(parsed.message);
            return;
          }
        } catch (e) {
          // If parsing fails, fall back check if it's already an array type
          if (Array.isArray(rawData) && rawData.length > 0 && rawData[0].message) {
            setErrorMessage(rawData[0].message);
            return;
          }
        }
      }

      // Fallback clean message string if formatting doesn't contain a schema structure
      setErrorMessage(
        typeof rawData === "string" ? rawData : "Invalid account credentials entered"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5FF] flex items-center justify-center px-4 py-10 select-none">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 rounded-[28px] overflow-hidden border border-[#E8E5F5] bg-white shadow-[0_15px_40px_rgba(124,58,237,0.08)]">
        
        {/* Left Side Feature Showcase Layout */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#7C3AED] via-[#6366F1] to-[#2563EB] p-8 text-white">
          <div>
            <h1 className="text-3xl font-black tracking-tight">MentorSala</h1>
            <div className="mt-10">
              <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em]">
                WELCOME BACK
              </div>
              <h2 className="mt-6 text-4xl font-black leading-tight">
                Continue your <br /> preparation <br /> journey.
              </h2>
              <p className="mt-4 max-w-sm text-sm text-white/80 leading-relaxed">
                Login to access your courses, analytics, streaks, and leaderboard progress.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8">
            {[
              { value: "50K+", label: "Students" },
              { value: "1M+", label: "Problems" },
              { value: "95%", label: "Success" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl">
                <h3 className="text-lg font-black">{item.value}</h3>
                <p className="mt-1 text-[10px] text-white/70">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Input Form Section Workspace */}
        <div className="p-6 md:p-8 flex flex-col justify-center bg-white">
          <div className="mb-7">
            <div className="inline-flex rounded-full border border-[#D9D4FF] bg-[#F8FAFF] px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#7C3AED] shadow-sm mb-4">
              LOGIN
            </div>
            <h2 className="text-3xl font-black text-[#0F172A]">Welcome Back</h2>
            <p className="mt-2 text-sm text-[#64748B]">Login and continue your preparation.</p>
          </div>

          {/* DYNAMIC INLINE ERROR NOTIFICATION MESH */}
          {errorMessage && (
            <div className="mb-4 flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold animate-fadeIn">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <div>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  setErrorMessage(null);
                  try {
                    const res = await api.post(
                      "/auth/google",
                      { credential: credentialResponse.credential },
                      { withCredentials: true }
                    );

                    if (res.data.success) {
                      localStorage.setItem("accessToken", res.data.accessToken);
                      handleRoleRouting(res.data.user);
                    }
                  } catch (error: any) {
                    console.error("Google link validation failure:", error);
                    setErrorMessage("Google verification system rejected authorization token. Try password fallback.");
                  }
                }}
                onError={() => {
                  console.log("Google Identity Process Aborted");
                  setErrorMessage("Google sign-in process was aborted or unverified.");
                }}
              />
            </div>

            <div className="flex items-center gap-3 my-2">
              <div className="h-px flex-1 bg-[#E5E7EB]" />
              <span className="text-[11px] font-bold text-[#64748B] tracking-wider whitespace-nowrap uppercase">
                OR LOGIN WITH EMAIL
              </span>
              <div className="h-px flex-1 bg-[#E5E7EB]" />
            </div>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full rounded-xl border border-[#E8E5F5] bg-[#FAFBFF] px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#2563EB] transition-colors"
              required
            />

            <div className="flex flex-col gap-2">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-[#E8E5F5] bg-[#FAFBFF] px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#2563EB] transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:opacity-95 active:scale-[0.99]"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[#64748B]">
            Don't have an account?
            <Link to="/signup" className="ml-2 font-semibold text-[#2563EB] hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}