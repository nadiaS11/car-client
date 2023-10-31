import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./Auths/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (user?.email) {
    return children;
  }

  if (loading) {
    return <progress className="progress w-56 "></progress>;
  }

  return <Navigate state={location.pathname} to={"/login"} replace></Navigate>;
};

PrivateRoute.propTypes = {};

export default PrivateRoute;
