import React, { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-router";
import { gql, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
const Login = () => {
  const navigate = useNavigate();
  const ADD_USER = gql`
    mutation ($data: userLogintype) {
      loginUser(userData: $data) {
        name
      }
    }
  `;
  const [addUser, { loading }] = useMutation(ADD_USER);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const addingPromise = addUser({ variables: { data: formData } });

    toast.promise(addingPromise, {
      loading: "Loading...",
      success: (data) => {
        navigate("/newjob");
        return `Welcome ${data.data.loginUser.name}!`;
      },
      error: (error) => {
        return (
          error?.graphQLErrors?.[0]?.message ||
          error?.networkError?.message ||
          "Unknown error"
        );
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-navy to-teal-ocean flex items-center justify-center  px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header Section */}
        <div className="text-center mt-8">
          <div className="mx-auto h-32 w-32 bg-white rounded-full flex items-center justify-center mb-6">
            <img src={logo} alt="Logo" />
            {/* <Briefcase className="h-8 w-8 text-deep-navy" /> */}
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome to KhojJob
          </h2>
          <p className="text-gray-200">
            Sign in to find your dream job in Nepal
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-deep-navy mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-ocean focus:border-transparent transition duration-200 placeholder-gray-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-deep-navy mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-ocean focus:border-transparent transition duration-200 placeholder-gray-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-teal-ocean focus:ring-teal-ocean border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-teal-ocean hover:text-deep-navy transition duration-200"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                disabled={loading}
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-teal-ocean to-deep-navy hover:from-deep-navy hover:to-teal-ocean focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-ocean transition duration-300 transform hover:scale-105"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LogIn className="h-5 w-5 text-white group-hover:text-sand-gold transition duration-200" />
                </span>
                {loading ? "Loading...." : " Sign In"}
              </button>
            </div>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Don't have an account?
                  </span>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <Link
                to="/signup"
                className="font-medium text-teal-ocean hover:text-deep-navy transition duration-200"
              >
                Create your account here
              </Link>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-300">
            © 2025 KhojJob. Your gateway to opportunities in Nepal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
