import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./store/auth.store";
import { initGA, trackPageView } from "./utils/analytics";

function App() {

  const location = useLocation();

  const fetchCurrentUser =
    useAuthStore(
      (state) => state.fetchCurrentUser
    );

  const loading =
    useAuthStore(
      (state) => state.loading
    );

  // RUN ONLY ONCE
  useEffect(() => {

    fetchCurrentUser();

  }, []);

  // Initialize Google Analytics
  useEffect(() => {
    initGA();
  }, []);

  // Track page views on route change
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  if (loading) {

    return (

      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-3 select-none text-slate-400 font-medium">

        <div className="h-6 w-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />

        <span className="text-sm tracking-wide">

          Loading MentorSala...

        </span>

      </div>

    );

  }

  return <AppRoutes />;

}

export default App;