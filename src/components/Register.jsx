import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./Auths/AuthProvider";

import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../assets/login.svg";
import { updateProfile } from "firebase/auth";
import { auth } from "./Auths/firebase.config";

const Register = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoUrl = e.target.url.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(name, email, password);

    if (!/^(?=.*?[!@#$&*~])(?=.*[A-Z]).{6,}$/.test(password)) {
      return alert(
        "Your Password must have at least 6 characters, one capital letter and one special character."
      );
    }

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        alert("successfully registered");
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoUrl,
        })
          .then(() => {
            console.log("profile updated");
            navigate(location.state ? location.state : "/");
          })
          .catch((err) => alert(err));
      })
      .catch((err) => alert(err.message));
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
              <form onSubmit={handleRegister}>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="e.g. John Smith"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Photo URL
                  </label>
                  <input
                    type="url"
                    name="url"
                    id="url"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="https://example.com/john-smith-user/profile.jpg"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="name@flowbite.com"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type="text"
                    id="password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>

                <div className="flex items-start mb-6">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label
                    htmlFor="terms"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I agree with the{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      terms and conditions
                    </a>
                  </label>
                </div>

                <div className="flex gap-5 flex-col">
                  <button
                    type="submit"
                    className="text-white bg-[#FF3811] hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-orange-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Register new account
                  </button>
                </div>
              </form>
              <button
                onClick={googleLogin}
                className="text-[#FF3811]  border border-[#FF3811] hover:bg-[#fa3e19] hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Sign In With Google
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 py-6">
                Already have an account?
                <Link
                  to="/login"
                  className="font-medium  text-[#FF3811] hover:underline  ml-2 "
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Register.propTypes = {};

export default Register;
