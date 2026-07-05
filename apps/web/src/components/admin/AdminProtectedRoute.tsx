import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../lib/axios";

interface Props {
  children: React.ReactNode;
}

const AdminProtectedRoute = ({
  children,
}: Props) => {

  const [loading, setLoading] =
    useState(true);

  const [authenticated, setAuthenticated] =
    useState(false);

  useEffect(() => {

    const verifyAdmin = async () => {

      try {

        await api.get(
          "/admin-auth/profile"
        );

        setAuthenticated(true);

      } catch {

        setAuthenticated(false);

      } finally {

        setLoading(false);

      }

    };

    verifyAdmin();

  }, []);

  if (loading) {

    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Checking authentication...
      </div>
    );

  }

  if (!authenticated) {

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );

  }

  return <>{children}</>;

};

export default AdminProtectedRoute;