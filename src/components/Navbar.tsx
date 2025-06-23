import { useState } from "react";
import {
  Pickaxe,
  Bookmark,
  Sparkles,
  LogOut,
  Menu,
  X,
  User,
  School,
} from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-router";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Logout logic will be handled by parent component
    console.log("Logout clicked");
  };

  return (
    <nav className="bg-gradient-to-r from-deep-navy to-teal-ocean shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo Icon */}
              <div className="h-20 w-20  rounded-lg flex items-center justify-center mr-3 ">
                <img src={logo} alt="logo" />
                {/* <Pickaxe className="h-6 w-6 text-deep-navy" /> */}
              </div>
              {/* Site Name */}
              <div className="text-white">
                <h1 className="text-xl font-bold tracking-wide">KhojJob</h1>
                <p className="text-xs text-gray-200 -mt-1">
                  Find Your Dream Job
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/newjobs"
                className="group flex items-center px-4 py-2 rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition duration-300 font-medium"
              >
                <Sparkles className="h-5 w-5 mr-2 text-sand-gold group-hover:text-sunset-orange transition duration-300" />
                New Jobs
              </Link>

              <Link
                to="/bookmark"
                className="group flex items-center px-4 py-2 rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition duration-300 font-medium"
              >
                <Bookmark className="h-5 w-5 mr-2 text-sand-gold group-hover:text-sunset-orange transition duration-300" />
                Bookmarks
              </Link>

              <Link
                to="/alljobs"
                className="group flex items-center px-4 py-2 rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition duration-300 font-medium"
              >
                <Pickaxe className="h-5 w-5 mr-2 text-sand-gold group-hover:text-sunset-orange transition duration-300" />
                Jobs
              </Link>
              <Link
                to="/allcompany"
                className="group flex items-center px-4 py-2 rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition duration-300 font-medium"
              >
                <School className="h-5 w-5 mr-2 text-sand-gold group-hover:text-sunset-orange transition duration-300" />
                Company
              </Link>
              <button
                onClick={handleLogout}
                className="group flex items-center px-4 py-2 rounded-lg text-white hover:bg-clay-red hover:bg-opacity-20 transition duration-300 font-medium border border-transparent hover:border-clay-red hover:border-opacity-30"
              >
                <LogOut className="h-5 w-5 mr-2 text-sand-gold group-hover:text-clay-red transition duration-300" />
                Logout
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sand-gold transition duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-deep-navy bg-opacity-95 backdrop-blur-sm`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-white border-opacity-10">
          <Link
            to="/newjob"
            className="group flex items-center px-3 py-3 rounded-md text-white hover:bg-white hover:bg-opacity-10 transition duration-300 font-medium"
          >
            <Sparkles className="h-5 w-5 mr-3 text-sand-gold group-hover:text-sunset-orange transition duration-300" />
            New Jobs
          </Link>

          <Link
            to="/bookmark"
            className="group flex items-center px-3 py-3 rounded-md text-white hover:bg-white hover:bg-opacity-10 transition duration-300 font-medium"
          >
            <Bookmark className="h-5 w-5 mr-3 text-sand-gold group-hover:text-sunset-orange transition duration-300" />
            Bookmarks
          </Link>

          <Link
            to="/newjob"
            className="group flex items-center px-3 py-3 rounded-md text-white hover:bg-white hover:bg-opacity-10 transition duration-300 font-medium"
          >
            <Pickaxe className="h-5 w-5 mr-3 text-sand-gold group-hover:text-sunset-orange transition duration-300" />
            Jobs
          </Link>

          <button
            onClick={handleLogout}
            className="group flex items-center w-full px-3 py-3 rounded-md text-white hover:bg-clay-red hover:bg-opacity-20 transition duration-300 font-medium border border-transparent hover:border-clay-red hover:border-opacity-30"
          >
            <LogOut className="h-5 w-5 mr-3 text-sand-gold group-hover:text-clay-red transition duration-300" />
            Logout
          </button>
        </div>

        {/* User Info in Mobile */}
        <div className="px-4 py-3 border-t border-white border-opacity-10">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-sand-gold rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-deep-navy" />
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-white">
                Ashimkarrki
              </div>
              <div className="text-sm text-gray-300">Job Seeker</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
