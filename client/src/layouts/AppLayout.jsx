import Header from "@/components/Header";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen pr-20 pl-20">
        <Header />
        <Outlet />
      </main>

      <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          {/* Left Section */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-bold tracking-wide">Job Finder</h2>
            <p className="text-gray-300 mt-2 max-w-xs">
              Your gateway to career success.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-gray-300 font-medium text-sm">
            <a
              href="/"
              className="hover:text-blue-400 transition-all duration-300"
            >
              Home
            </a>
            <a
              href="/jobs"
              className="hover:text-blue-400 transition-all duration-300"
            >
              Jobs
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-5 mt-6 md:mt-0">
            <a
              href="#"
              className="p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition duration-300"
            >
              <FaFacebookF className="text-xl" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition duration-300"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition duration-300"
            >
              <FaLinkedinIn className="text-xl" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition duration-300"
            >
              <FaInstagram className="text-xl" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-gray-400 text-sm mt-8">
          <p>© {new Date().getFullYear()} Job Finder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
