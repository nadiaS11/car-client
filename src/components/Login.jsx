import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../assets/login.svg";
import { AuthContext } from "./Auths/AuthProvider";
import axios from "axios";

const Login = () => {
  const { signInUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return alert("Enter a valid email address.");
    }
    if (!/^(?=.*?[!@#$&*~])(?=.*[A-Z]).{6,}$/.test(password)) {
      return alert("Password invalid.");
    }

    signInUser(email, password)
      .then((res) => {
        console.log(res.user);
        // alert("Login successful");
        const loggedInUser = res.user;
        const user = { email };

        //get access token
        axios
          .post("http://localhost:3000/jwt", user, { withCredentials: true })
          .then((res) => {
            console.log(res.data);
            if (res.data.success) {
              navigate(location?.state ? location.state : "/");
            }
          });
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        console.log(res.user);
        // alert("Login successful");
        const loggedInUser = res.user;
        const user = { email };

        //get access token
        axios
          .post("http://localhost:3000/jwt", user, { withCredentials: true })
          .then((res) => {
            console.log(res.data);
            if (res.data.success) {
              navigate(location?.state ? location.state : "/");
            }
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <section className="pt-20  flex   ">
        <figure>
          <img src={img} alt="" />
        </figure>
        <div className="flex flex-col items-center  px-6  mx-auto md:h-screen lg:py-0 ">
          <div className="w-full   rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0    ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight   md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium   dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300   sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium   dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    placeholder="password"
                    className="bg-gray-50 border border-gray-300   sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  "
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-[#FF3811] hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
                >
                  Sign in
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400 py-6">
                  Don’t have an account yet?
                  <Link
                    to="/register"
                    className="font-medium  text-[#FF3811] hover:underline  ml-2 "
                  >
                    Sign up
                  </Link>
                </p>
              </form>
              <button
                onClick={handleGoogleLogin}
                className="text-[#FF3811]  border border-[#FF3811] hover:bg-[#fa3e19] hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Sign In With Google
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Login.propTypes = {};

export default Login;
