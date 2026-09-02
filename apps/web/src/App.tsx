import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./store/auth.store";
import { initGA, trackPageView } from "./utils/analytics";
import PageLoader from "./components/common/PageLoader";

function App() {
  const location = useLocation();

  const fetchCurrentUser = useAuthStore(
    (state) => state.fetchCurrentUser
  );

  const loading = useAuthStore(
    (state) => state.loading
  );

  // Fetch current user only once when application starts
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  // Initialize Google Analytics
  useEffect(() => {
    initGA();
  }, []);

  // Track page views whenever route changes
  useEffect(() => {
    trackPageView(
      location.pathname + location.search
    );
  }, [location]);

  // Show MentorSala loader while authentication state
  // is being initialized
  if (loading) {
    return <PageLoader />;
  }

  return <AppRoutes />;
}

export default App;