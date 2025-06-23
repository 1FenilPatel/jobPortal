import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const AppLayout = () => {
  return (
    <div className="relative">
      <div className="grid-background absolute inset-0 -z-10"></div>

      {/* Main Content Area */}
      <main className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-20">
        <Header />
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-10 mt-16 px-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Section */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-wide">Job Finder</h2>
            <p className="text-gray-300 mt-2 max-w-xs mx-auto md:mx-0 text-sm sm:text-base">
              Your gateway to career success.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4 text-gray-300 font-medium text-sm">
            <a href="/" className="hover:text-blue-400 transition-all duration-300">
              Home
            </a>
            <a href="/jobs" className="hover:text-blue-400 transition-all duration-300">
              Jobs
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4 justify-center">
            <a
              href="#"
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition duration-300"
            >
              <FaFacebookF className="text-lg sm:text-xl" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition duration-300"
            >
              <FaTwitter className="text-lg sm:text-xl" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition duration-300"
            >
              <FaLinkedinIn className="text-lg sm:text-xl" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition duration-300"
            >
              <FaInstagram className="text-lg sm:text-xl" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-gray-400 text-xs sm:text-sm mt-8">
          <p>© {new Date().getFullYear()} Job Finder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
