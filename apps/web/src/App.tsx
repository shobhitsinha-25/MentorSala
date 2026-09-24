import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./store/auth.store";
import { initGA, trackPageView } from "./utils/analytics";
import PageLoader from "./components/common/PageLoader";
import XPRewardPopup from "./components/gamification/XPRewardPopup";

function App() {
  const location = useLocation();

  const fetchCurrentUser = useAuthStore(
    (state) => state.fetchCurrentUser
  );

  const loading = useAuthStore(
    (state) => state.loading
  );

  // ======================================================
  // FETCH CURRENT USER
  // ======================================================

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  // ======================================================
  // GOOGLE ANALYTICS
  // ======================================================

  useEffect(() => {
    initGA();
  }, []);

  // ======================================================
  // PAGE VIEW TRACKING
  // ======================================================

  useEffect(() => {
    trackPageView(
      location.pathname + location.search
    );
  }, [location]);

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return <PageLoader />;
  }

  // ======================================================
  // APP
  // ======================================================

  return (
    <>
      <AppRoutes />

      {/* Global XP Reward Popup */}
      <XPRewardPopup />
    </>
  );
}

export default App;