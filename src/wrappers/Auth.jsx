import { Navigate, useModel, useLocation, Outlet } from "@umijs/max";
import { Spin } from "antd";

export default function AuthWrapper() {
  const { initialState, loading } = useModel("@@initialState");
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (location.pathname === "/login") {
    return <Outlet />;
  }

  if (!initialState?.user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}