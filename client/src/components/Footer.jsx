import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-12 bg-gradient-to-r from-emerald-700 via-emerald-600 to-indigo-700 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                </svg>
              </div>
              <div>
                <div className="text-xl font-semibold">Festive Flair</div>
                <div className="text-sm text-white/80">Event Planner PVT. LTD.</div>
              </div>
            </div>

            <p className="mt-4 text-sm text-white/80 max-w-xs">We craft memorable events with care — halls, catering and full event management tailored for you.</p>
          </div>

          <div className="flex gap-8 justify-between md:col-span-1">
            <div>
              <h4 className="text-sm font-medium text-white/90 mb-3">Explore</h4>
              <nav className="flex flex-col gap-2">
                <Link to="/" className="text-sm text-white/80 hover:text-white">Home</Link>
                <Link to="/contact" className="text-sm text-white/80 hover:text-white">Contact</Link>
                <Link to="/dashboard" className="text-sm text-white/80 hover:text-white">Dashboard</Link>
              </nav>
            </div>

            <div>
              <h4 className="text-sm font-medium text-white/90 mb-3">Legal</h4>
              <nav className="flex flex-col gap-2">
                <Link to="/terms" className="text-sm text-white/80 hover:text-white">Terms</Link>
                <Link to="/privacy" className="text-sm text-white/80 hover:text-white">Privacy</Link>
              </nav>
            </div>
          </div>

          <div className="md:text-right">
            <h4 className="text-sm font-medium text-white/90 mb-3">Connect</h4>
            <div className="flex items-center justify-start md:justify-end gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/90 hover:text-white">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22 12.07C22 6.56 17.52 2 12 2S2 6.56 2 12.07c0 5.02 3.66 9.17 8.44 9.93v-7.03H8.9v-2.9h1.54V9.41c0-1.52.9-2.36 2.28-2.36.66 0 1.35.12 1.35.12v1.48h-.76c-.75 0-.99.47-.99.95v1.14h1.69l-.27 2.9h-1.42V22C18.34 21.24 22 17.09 22 12.07z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/90 hover:text-white">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zm6.5-.9a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-white/90 hover:text-white">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22 5.92c-.63.28-1.3.48-2 .57a3.48 3.48 0 001.53-1.92 6.92 6.92 0 01-2.2.84A3.46 3.46 0 0015.5 4c-1.92 0-3.48 1.6-3.48 3.58 0 .28.03.56.09.83A9.84 9.84 0 013 5.16a3.57 3.57 0 00-.47 1.8c0 1.24.6 2.35 1.5 3a3.44 3.44 0 01-1.58-.44v.04c0 1.73 1.25 3.17 2.9 3.5-.31.08-.64.12-.98.12-.24 0-.48-.02-.71-.06.48 1.5 1.88 2.6 3.53 2.63A7 7 0 012 19.54 9.9 9.9 0 008.54 21c6.5 0 10.06-5.68 10.06-10.6v-.48A7.2 7.2 0 0022 5.92z"/></svg>
              </a>
            </div>

            <div className="mt-6 text-sm text-white/70">© {new Date().getFullYear()} Festive Flair. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
