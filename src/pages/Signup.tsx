import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useMutation, gql } from "@apollo/client";
import {
  UserPlus,
  User,
  AtSign,
  Shield,
  Mail,
  Lock,
  CheckCircle,
  Briefcase,
  Lightbulb,
  Search,
} from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
const Signup = () => {
  const navigate = useNavigate();
  const ADD_USER = gql`
    mutation ($data: addingUserType) {
      addUser(userData: $data) {
        name
      }
    }
  `;
  const [adduser, { loading, error }] = useMutation(ADD_USER);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    experience: "",
    lookingFor: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData.lookingFor);
    let newJob;
    if (formData.lookingFor && formData.lookingFor.trim() !== ",") {
      console.log("yes");
      newJob = {
        ...formData,
        looking_for: formData.lookingFor.split(",").map((s) => s.trim()),
      };
    } else {
      newJob = { ...formData };
    }
    const { confirmPassword, lookingFor, ...rest } = newJob;
    try {
      await adduser({ variables: { data: rest } });
      navigate("/login");
      toast.success(`Registered Success`);
    } catch {
      toast.error(error?.graphQLErrors[0].message || "Undefined Error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-navy via-teal-ocean to-sand-gold flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <div className="mx-auto h-32 w-32 bg-white  rounded-full flex items-center justify-center mb-6 shadow-lg">
            {/*  */}
            <img src={logo} alt="Logo" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Join KhojJob</h2>
          <p className="text-gray-100">
            Create your account and start your career journey in Nepal
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-deep-navy mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-teal-ocean" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-deep-navy mb-2"
                  >
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-ocean focus:border-transparent transition duration-200 placeholder-gray-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-semibold text-deep-navy mb-2"
                  >
                    Username *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AtSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-ocean focus:border-transparent transition duration-200 placeholder-gray-500"
                      placeholder="Choose a username"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-deep-navy mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-teal-ocean" />
                Account Security
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-deep-navy mb-2"
                  >
                    Email Address *
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-deep-navy mb-2"
                    >
                      Password *
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
                        placeholder="Create password"
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-semibold text-deep-navy mb-2"
                    >
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CheckCircle className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-ocean focus:border-transparent transition duration-200 placeholder-gray-500"
                        placeholder="Confirm password"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="pb-6">
              <h3 className="text-lg font-semibold text-deep-navy mb-4 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-teal-ocean" />
                Professional Profile
              </h3>

              <div className="space-y-6">
                {/* Experience Level */}
                <div>
                  <label
                    htmlFor="experience"
                    className="block text-sm font-semibold text-deep-navy mb-2"
                  >
                    Experience Level *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lightbulb className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="experience"
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-ocean focus:border-transparent transition duration-200 bg-white"
                    >
                      <option value="">Select your experience level</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="5+">5+</option>
                    </select>
                  </div>
                </div>

                {/* Looking For */}
                <div>
                  <label
                    htmlFor="lookingFor"
                    className="block text-sm font-semibold text-deep-navy mb-2"
                  >
                    Interested In *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="lookingFor"
                      name="lookingFor"
                      type="text"
                      // required
                      value={formData.lookingFor}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-ocean focus:border-transparent transition duration-200 placeholder-gray-500"
                      placeholder="e.g., Software Developer, Marketing Manager, Data Analyst"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Enter job titles you're interested in, separated by commas
                  </p>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-teal-ocean focus:ring-teal-ocean border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-700">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="font-medium text-teal-ocean hover:text-deep-navy transition duration-200"
                  >
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="font-medium text-teal-ocean hover:text-deep-navy transition duration-200"
                  >
                    Privacy Policy
                  </a>
                </label>
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
                  <UserPlus className="h-5 w-5 text-white group-hover:text-sand-gold transition duration-200" />
                </span>
                {loading ? "Loading..." : "Create Account"}
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-teal-ocean hover:text-deep-navy transition duration-200"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-100">
            © 2025 KhojJob. Building careers, connecting opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
