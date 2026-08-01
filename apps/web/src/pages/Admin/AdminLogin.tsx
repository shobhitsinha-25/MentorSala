import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../../lib/axios";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await api.post(
        "/admin-auth/login",
        formData
      );

      toast.success(data.message);

      navigate("/admin/dashboard");

    } catch (error: unknown) {

      if (import.meta.env.DEV) {
        console.error("Admin login error:", error);
      }

      if (axios.isAxiosError(error) && !error.response) {
        toast.error(
          "Unable to connect to the server. Please check your internet connection and try again."
        );
        return;
      }

      toast.error(
        "Login failed. Please refresh the page or try again later."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-white text-center">
          Admin Login
        </h1>

        <p className="text-slate-400 text-center mt-2">
          MentorSala Control Panel
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-12 rounded-xl bg-slate-800 px-4 text-white outline-none"
            autoComplete="email"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full h-12 rounded-xl bg-slate-800 px-4 text-white outline-none"
            autoComplete="current-password"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-indigo-600 text-white font-semibold transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminLogin;