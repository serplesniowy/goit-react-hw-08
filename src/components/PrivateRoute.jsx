import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";

export function PrivateRoute({ Component, redirectPath }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? Component : <Navigate to={redirectPath} />;
}
