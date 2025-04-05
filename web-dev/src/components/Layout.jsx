import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav
        className="w-full font-sans bg-slate-950 flex  
       py-3 px-0 fixed top-0 left-0 text-white rounded-b-md items-center"
      >
        <div className="flex">
          <Link to="/home" className="inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="currentColor"
              class="size-16 text-blue-500 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
            <h1 className="font-bold text-3xl px-2 inline-flex space-x-2 bg-gradient-to-l from-pink-300 to-green-300 bg-clip-text text-transparent">
              Study <span className="text-blue-500 ml-2">ALONG</span>
            </h1>
          </Link>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-8 block cursor-pointer md:hidden absolute -right-1 justify-between items-center"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </span>
        </div>
        <nav
          className="md:flex items-center justify-items-center
         w-full left-0 md:w-auto md:py-0 md:pl-0 min-w-56  md:opacity-100 opacity-0 
         top-[-400px] transition-all ease-in duration-300 ml-40 gap-5"
        >
          <Link
            to="/home"
            className="py-1 px-3 text-lg font-light hover:text-sky-400 rounded-2xl hover:bg-slate-600 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="py-1 px-3 text-lg font-light hover:text-sky-400 rounded-2xl hover:bg-slate-600 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="py-1 px-3 text-lg font-light hover:text-sky-400 rounded-2xl hover:bg-slate-600 transition duration-300"
          >
            Contact
          </Link>
          <Link
            to="/product"
            className="py-3 px-3 text-lg font-light hover:text-sky-400 rounded-2xl hover:bg-slate-600 transition duration-300"
          >
            Product
          </Link>
          <button className="py-2 px-3 ml-10 bg-blue-700 text-white text-nowrap rounded-lg">
            Get Started
          </button>
        </nav>
      </nav>
    </>
  );
};
export default Navbar;
