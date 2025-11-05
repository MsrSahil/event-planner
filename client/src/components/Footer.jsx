import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <div className="text-lg font-semibold">Festive Flair</div>
          <div className="text-sm text-gray-600">Event Planner PVT. LTD.</div>
        </div>

        <div className="flex items-center gap-6">
          <nav className="flex gap-4">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">Home</Link>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link>
            <Link to="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">Dashboard</Link>
          </nav>

          <div className="text-sm text-gray-500">© {new Date().getFullYear()} Festive Flair. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
