import { Navigate, Outlet } from "react-router";

// type Props = {
//   children: React.ReactNode;
// };
function PrivateRoute() {
  return sessionStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
