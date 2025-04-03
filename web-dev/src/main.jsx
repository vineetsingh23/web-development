import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
// import Layout from "./Layout.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import App from "./App.jsx";
import Navbar from "./components/Layout.jsx";
import Contact from "./components/Contact.jsx";
import Product from "./components/Product.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Navbar />
      <Home />
      <About />
      <Contact />
      <Product />
    </BrowserRouter>
  </StrictMode>
);
