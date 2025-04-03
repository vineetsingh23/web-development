import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-slate-800 flex items-center justify-around py-3 px-32 fixed top-0 left-0 text-white">
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
        className="py-1 px-3 text-lg font-light hover:text-sky-400 rounded-2xl hover:bg-slate-600 transition duration-300"
      >
        Product
      </Link>
    </nav>
  );
};
export default Navbar;
