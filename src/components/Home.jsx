import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./Auths/AuthProvider";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Services from "./Services";

const Home = () => {
  const { name } = useContext(AuthContext);
  return (
    <div className="mx-auto">
      <Services></Services>

      <Footer></Footer>
    </div>
  );
};

Home.propTypes = {};

export default Home;
