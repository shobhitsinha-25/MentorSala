import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import api from "../../lib/axios";
import { useAuthStore } from "../../store/auth.store";
import {
  AlertCircle,
  GraduationCap,
  TrendingUp,
  Trophy,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  Loader2,
  Mail,
  ShieldCheck,
} from "lucide-react";
import axios from "axios";

type ForgotPasswordStep =
  | "EMAIL"
  | "CODE"
  | "PASSWORD";

export default function Login() {
  const setUser = useAuthStore(
    (state) => state.setUser
  );

  const navigate = useNavigate();

  // =====================================================
  // LOGIN STATE
  // =====================================================

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  // =====================================================
  // FORGOT PASSWORD STATE
  // =====================================================

  const [
    forgotPasswordOpen,
    setForgotPasswordOpen,
  ] = useState(false);

  const [
    forgotPasswordStep,
    setForgotPasswordStep,
  ] =
    useState<ForgotPasswordStep>("EMAIL");

  const [resetEmail, setResetEmail] =
    useState("");

  const [resetCode, setResetCode] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [resetError, setResetError] =
    useState<string | null>(null);

  const [resetMessage, setResetMessage] =
    useState<string | null>(null);

  const [resetLoading, setResetLoading] =
    useState(false);

  // =====================================================
  // LOGIN INPUT CHANGE
  // =====================================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  // =====================================================
  // ROLE ROUTING
  // =====================================================

  const handleRoleRouting = (
    authenticatedUser: any
  ) => {
    setUser(authenticatedUser);

    setTimeout(() => {
      // ==========================================
      // MENTOR
      // ==========================================

      if (
        authenticatedUser.role === "MENTOR"
      ) {
        const status =
          authenticatedUser
            ?.mentorProfile
            ?.status;

        // NOT STARTED
        if (
          status === "NOT_STARTED"
        ) {
          navigate(
            "/mentor/onboarding",
            {
              replace: true,
            }
          );

          return;
        }

        // PENDING
        if (
          status ===
          "PENDING_APPROVAL"
        ) {
          navigate(
            "/mentor/under-review",
            {
              replace: true,
            }
          );

          return;
        }

        // APPROVED
        if (
          status === "APPROVED"
        ) {
          navigate(
            "/mentor/dashboard",
            {
              replace: true,
            }
          );

          return;
        }

        // REJECTED
        if (
          status === "REJECTED"
        ) {
          navigate(
            "/mentor/rejected",
            {
              replace: true,
            }
          );

          return;
        }
      }

      // ==========================================
      // STUDENT
      // ==========================================

      else {
  if (
    !authenticatedUser
      .onboardingCompleted
  ) {
    navigate(
      "/onboarding",
      {
        replace: true,
      }
    );
  } else {
    navigate(
      "/greeting",
      {
        replace: true,
      }
    );
  }
}
    }, 100);
  };

  // =====================================================
  // NORMAL EMAIL LOGIN
  // =====================================================

  const handleEmailLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setErrorMessage(null);

    try {
      const res =
        await api.post(
          "/auth/login",
          formData,
          {
            withCredentials: true,
          }
        );

      if (res.data.success) {
        // =========================================
        // SAVE ACCESS TOKEN
        // =========================================

        localStorage.setItem(
          "accessToken",
          res.data.accessToken
        );

        // =========================================
        // SAVE USER + ROUTE
        // =========================================

        handleRoleRouting(
          res.data.user
        );
      }
    } catch (error: unknown) {
      // Log only in development
      if (import.meta.env.DEV) {
        console.error(
          "Login error:",
          error
        );
      }

      // Network/server unavailable
      if (
        axios.isAxiosError(error) &&
        !error.response
      ) {
        setErrorMessage(
          "Unable to connect to the server. Please check your internet connection and try again."
        );

        return;
      }

      // Generic message for production
      setErrorMessage(
        "Login failed. Please check your email and password, then try again."
      );
    }
  };

  // =====================================================
  // OPEN FORGOT PASSWORD
  // =====================================================

  const openForgotPassword = () => {
    setForgotPasswordOpen(true);

    setForgotPasswordStep(
      "EMAIL"
    );

    setResetEmail(
      formData.email
    );

    setResetCode("");

    setNewPassword("");

    setConfirmPassword("");

    setResetError(null);

    setResetMessage(null);
  };

  // =====================================================
  // CLOSE FORGOT PASSWORD
  // =====================================================

  const closeForgotPassword = () => {
    setForgotPasswordOpen(false);

    setForgotPasswordStep(
      "EMAIL"
    );

    setResetEmail("");

    setResetCode("");

    setNewPassword("");

    setConfirmPassword("");

    setResetError(null);

    setResetMessage(null);

    setResetLoading(false);
  };

  // =====================================================
  // SEND PASSWORD RESET CODE
  // =====================================================

  const handleSendResetCode =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      setResetError(null);
      setResetMessage(null);

      const email =
        resetEmail
          .trim()
          .toLowerCase();

      if (!email) {
        setResetError(
          "Please enter your email address."
        );

        return;
      }

      try {
        setResetLoading(true);

        const response =
          await api.post(
            "/auth/forgot-password",
            {
              email,
            }
          );

        if (
          response.data.success
        ) {
          setResetMessage(
            "If an account exists with this email, a verification code has been sent."
          );

          setForgotPasswordStep(
            "CODE"
          );
        }
      } catch (error: unknown) {
        if (import.meta.env.DEV) {
          console.error(
            "Forgot password error:",
            error
          );
        }

        if (
          axios.isAxiosError(error) &&
          !error.response
        ) {
          setResetError(
            "Unable to connect to the server. Please check your internet connection and try again."
          );

          return;
        }

        setResetError(
          axios.isAxiosError(error)
            ? error.response?.data
                ?.message ||
                "Unable to send verification code. Please try again."
            : "Unable to send verification code. Please try again."
        );
      } finally {
        setResetLoading(false);
      }
    };

  // =====================================================
  // VERIFY RESET CODE
  // =====================================================

  const handleVerifyResetCode =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      setResetError(null);
      setResetMessage(null);

      if (
        !/^\d{6}$/.test(
          resetCode
        )
      ) {
        setResetError(
          "Please enter the 6-digit verification code."
        );

        return;
      }

      try {
        setResetLoading(true);

        const response =
          await api.post(
            "/auth/verify-reset-code",
            {
              email:
                resetEmail
                  .trim()
                  .toLowerCase(),

              code: resetCode,
            }
          );

        if (
          response.data.success
        ) {
          setResetMessage(
            "Email verified successfully."
          );

          setForgotPasswordStep(
            "PASSWORD"
          );
        }
      } catch (error: unknown) {
        if (import.meta.env.DEV) {
          console.error(
            "Verification code error:",
            error
          );
        }

        setResetError(
          axios.isAxiosError(error)
            ? error.response?.data
                ?.message ||
                "Invalid verification code. Please try again."
            : "Invalid verification code. Please try again."
        );
      } finally {
        setResetLoading(false);
      }
    };

  // =====================================================
  // RESET PASSWORD
  // =====================================================

  const handleResetPassword =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      setResetError(null);
      setResetMessage(null);

      if (
        newPassword.length < 6
      ) {
        setResetError(
          "Password must be at least 6 characters long."
        );

        return;
      }

      if (
        newPassword !==
        confirmPassword
      ) {
        setResetError(
          "Passwords do not match."
        );

        return;
      }

      try {
        setResetLoading(true);

        const response =
          await api.post(
            "/auth/reset-password",
            {
              email:
                resetEmail
                  .trim()
                  .toLowerCase(),

              code: resetCode,

              newPassword,
            }
          );

        if (
          response.data.success
        ) {
          setResetMessage(
            "Password changed successfully. You can now login with your new password."
          );

          setTimeout(() => {
            closeForgotPassword();
          }, 1500);
        }
      } catch (error: unknown) {
        if (import.meta.env.DEV) {
          console.error(
            "Reset password error:",
            error
          );
        }

        setResetError(
          axios.isAxiosError(error)
            ? error.response?.data
                ?.message ||
                "Unable to reset password. Please try again."
            : "Unable to reset password. Please try again."
        );
      } finally {
        setResetLoading(false);
      }
    };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-[#F7F5FF] flex items-center justify-center px-4 py-10 select-none">

      <div className="w-full max-w-4xl grid lg:grid-cols-2 rounded-[28px] overflow-hidden border border-[#E8E5F5] bg-white shadow-[0_15px_40px_rgba(124,58,237,0.08)]">

        {/* =================================================
            LEFT SIDE FEATURE SHOWCASE
        ================================================= */}

        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#7C3AED] via-[#6366F1] to-[#2563EB] p-8 text-white">

          <div>
            <h1 className="text-3xl font-black tracking-tight">
              MentorSala
            </h1>

            <div className="mt-10">

              <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em]">
                WELCOME BACK
              </div>

              <h2 className="mt-6 text-4xl font-black leading-tight">
                Continue your
                <br />
                preparation
                <br />
                journey.
              </h2>

              <p className="mt-4 max-w-sm text-sm text-white/80 leading-relaxed">
                Login to access your courses,
                analytics, streaks, and leaderboard
                progress.
              </p>

            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8">

            {[
              {
                value: "3K+",
                label: "Students",
                icon: (
                  <GraduationCap
                    size={18}
                    className="text-blue-400 mb-2"
                  />
                ),
              },
              {
                value: "100K+",
                label: "Problems",
                icon: (
                  <TrendingUp
                    size={18}
                    className="text-white/90 mb-2"
                  />
                ),
              },
              {
                value: "90%",
                label: "Success",
                icon: (
                  <Trophy
                    size={18}
                    className="text-amber-400 mb-2"
                  />
                ),
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl flex flex-col justify-between items-start"
              >
                {item.icon}

                <div>
                  <h3 className="text-lg font-black">
                    {item.value}
                  </h3>

                  <p className="mt-1 text-[10px] text-white/70">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* =================================================
            RIGHT INPUT FORM
        ================================================= */}

        <div className="p-6 md:p-8 flex flex-col justify-center bg-white">

          <div className="mb-7">

            <div className="inline-flex rounded-full border border-[#D9D4FF] bg-[#F8FAFF] px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#7C3AED] shadow-sm mb-4">
              LOGIN
            </div>

            <h2 className="text-3xl font-black text-[#0F172A]">
              Welcome Back
            </h2>

            <p className="mt-2 text-sm text-[#64748B]">
              Login and continue your preparation.
            </p>

          </div>

          {/* =================================================
              LOGIN ERROR
          ================================================= */}

          {errorMessage && (
            <div className="mb-4 flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold animate-fadeIn">

              <AlertCircle
                size={16}
                className="shrink-0 mt-0.5"
              />

              <div>
                <p>
                  {errorMessage}
                </p>
              </div>

            </div>
          )}

          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <form
            onSubmit={
              handleEmailLogin
            }
            className="flex flex-col gap-4"
          >

            {/* GOOGLE LOGIN */}

            <div className="flex justify-center">

              <GoogleLogin
                onSuccess={async (
                  credentialResponse
                ) => {
                  setErrorMessage(
                    null
                  );

                  try {
                    const res =
                      await api.post(
                        "/auth/google",
                        {
                          credential:
                            credentialResponse.credential,
                        },
                        {
                          withCredentials:
                            true,
                        }
                      );

                    if (
                      res.data.success
                    ) {
                      localStorage.setItem(
                        "accessToken",
                        res.data.accessToken
                      );

                      handleRoleRouting(
                        res.data.user
                      );
                    }
                  } catch (
                    error: any
                  ) {
                    if (
                      import.meta.env
                        .DEV
                    ) {
                      console.error(
                        "Google link validation failure:",
                        error
                      );
                    }

                    setErrorMessage(
                      "Google verification system rejected authorization token. Try password fallback."
                    );
                  }
                }}
                onError={() => {
                  if (
                    import.meta.env
                      .DEV
                  ) {
                    console.log(
                      "Google Identity Process Aborted"
                    );
                  }

                  setErrorMessage(
                    "Google sign-in process was aborted or unverified."
                  );
                }}
              />

            </div>

            {/* DIVIDER */}

            <div className="flex items-center gap-3 my-2">

              <div className="h-px flex-1 bg-[#E5E7EB]" />

              <span className="text-[11px] font-bold text-[#64748B] tracking-wider whitespace-nowrap uppercase">
                OR LOGIN WITH EMAIL
              </span>

              <div className="h-px flex-1 bg-[#E5E7EB]" />

            </div>

            {/* EMAIL */}

            <input
              type="email"
              name="email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              placeholder="Enter your email address"
              className="w-full rounded-xl border border-[#E8E5F5] bg-[#FAFBFF] px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#2563EB] transition-colors"
              required
            />

            {/* PASSWORD */}

            <div className="flex flex-col gap-2">

              <input
                type="password"
                name="password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                placeholder="Enter your password"
                className="w-full rounded-xl border border-[#E8E5F5] bg-[#FAFBFF] px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#2563EB] transition-colors"
                required
              />

              {/* FORGOT PASSWORD */}

              <div className="flex justify-end">

                <button
                  type="button"
                  onClick={
                    openForgotPassword
                  }
                  className="text-xs font-semibold text-[#2563EB] transition hover:text-[#7C3AED] hover:underline"
                >
                  Forgot password?
                </button>

              </div>

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="w-full mt-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:opacity-95 active:scale-[0.99]"
            >
              Login
            </button>

          </form>

          {/* SIGNUP */}

          <p className="mt-6 text-center text-xs text-[#64748B]">

            Don't have an account?

            <Link
              to="/signup"
              className="ml-2 font-semibold !text-[#1a75ff] hover:underline"
            >
              Signup
            </Link>

          </p>

        </div>
      </div>

      {/* =====================================================
          FORGOT PASSWORD MODAL
      ===================================================== */}

      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">

            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="mb-6">

              <button
                type="button"
                onClick={
                  closeForgotPassword
                }
                className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
              >
                <ArrowLeft
                  size={16}
                />

                Back to login
              </button>

              {/* ICON */}

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">

                {forgotPasswordStep ===
                  "EMAIL" && (
                  <Mail size={22} />
                )}

                {forgotPasswordStep ===
                  "CODE" && (
                  <ShieldCheck
                    size={22}
                  />
                )}

                {forgotPasswordStep ===
                  "PASSWORD" && (
                  <KeyRound
                    size={22}
                  />
                )}

              </div>

              {/* TITLE */}

              <h2 className="mt-5 text-2xl font-black text-slate-900">

                {forgotPasswordStep ===
                  "EMAIL" &&
                  "Forgot your password?"}

                {forgotPasswordStep ===
                  "CODE" &&
                  "Verify your email"}

                {forgotPasswordStep ===
                  "PASSWORD" &&
                  "Create new password"}

              </h2>

              {/* DESCRIPTION */}

              <p className="mt-2 text-sm leading-6 text-slate-500">

                {forgotPasswordStep ===
                  "EMAIL" &&
                  "Enter your registered email address and we'll send you a verification code."}

                {forgotPasswordStep ===
                  "CODE" &&
                  `Enter the 6-digit code sent to ${resetEmail}.`}

                {forgotPasswordStep ===
                  "PASSWORD" &&
                  "Your email has been verified. Choose a new password for your account."}

              </p>

            </div>

            {/* =================================================
                RESET ERROR
            ================================================= */}

            {resetError && (
              <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

                <AlertCircle
                  size={17}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  {resetError}
                </span>

              </div>
            )}

            {/* =================================================
                RESET SUCCESS
            ================================================= */}

            {resetMessage && (
              <div className="mb-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">

                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  {resetMessage}
                </span>

              </div>
            )}

            {/* =================================================
                STEP 1 - EMAIL
            ================================================= */}

            {forgotPasswordStep ===
              "EMAIL" && (
              <form
                onSubmit={
                  handleSendResetCode
                }
                className="space-y-4"
              >

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email address
                  </label>

                  <input
                    type="email"
                    value={
                      resetEmail
                    }
                    onChange={(e) =>
                      setResetEmail(
                        e.target.value
                      )
                    }
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    autoFocus
                    required
                  />

                </div>

                <button
                  type="submit"
                  disabled={
                    resetLoading
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] py-3 text-sm font-bold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {resetLoading ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      Sending code...
                    </>
                  ) : (
                    "Send verification code"
                  )}

                </button>

              </form>
            )}

            {/* =================================================
                STEP 2 - CODE
            ================================================= */}

            {forgotPasswordStep ===
              "CODE" && (
              <form
                onSubmit={
                  handleVerifyResetCode
                }
                className="space-y-4"
              >

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Verification code
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={
                      resetCode
                    }
                    onChange={(e) =>
                      setResetCode(
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    placeholder="000000"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-center text-2xl font-black tracking-[0.4em] text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    autoFocus
                    required
                  />

                </div>

                <button
                  type="submit"
                  disabled={
                    resetLoading ||
                    resetCode.length !==
                      6
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] py-3 text-sm font-bold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {resetLoading ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      Verifying...
                    </>
                  ) : (
                    "Verify code"
                  )}

                </button>

                <button
                  type="button"
                  onClick={() => {
                    setResetError(
                      null
                    );

                    setResetMessage(
                      null
                    );

                    setForgotPasswordStep(
                      "EMAIL"
                    );
                  }}
                  className="w-full text-center text-xs font-semibold text-indigo-600 hover:underline"
                >
                  Use a different email
                </button>

              </form>
            )}

            {/* =================================================
                STEP 3 - NEW PASSWORD
            ================================================= */}

            {forgotPasswordStep ===
              "PASSWORD" && (
              <form
                onSubmit={
                  handleResetPassword
                }
                className="space-y-4"
              >

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    New password
                  </label>

                  <input
                    type="password"
                    value={
                      newPassword
                    }
                    onChange={(e) =>
                      setNewPassword(
                        e.target.value
                      )
                    }
                    placeholder="Enter new password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    autoFocus
                    required
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Confirm password
                  </label>

                  <input
                    type="password"
                    value={
                      confirmPassword
                    }
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    placeholder="Confirm new password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    required
                  />

                </div>

                <p className="text-xs text-slate-500">
                  Password must contain at least
                  6 characters.
                </p>

                <button
                  type="submit"
                  disabled={
                    resetLoading
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] py-3 text-sm font-bold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {resetLoading ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      Resetting password...
                    </>
                  ) : (
                    "Reset password"
                  )}

                </button>

              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
}