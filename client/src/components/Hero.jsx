import React from "react";
import background from "../assets/background.jpg";

const Hero = () => {
  return (
    <section className="relative w-full mt-[-100px]">
      {/* Background image */}
      <img
        src={background}
        alt="Decorated event venue with tables and lighting"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-75"
      />

      {/* Overlay to improve text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-28 lg:py-40">
        <div className="bg-white/8 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl border border-white/8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 lg:col-span-9">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Turn Your Dream Into Reality
              </h1>

              <p className="mt-4 text-gray-100 max-w-xl text-base sm:text-lg">
                We design memorable events — from intimate gatherings to grand
                celebrations. Professional planning, trusted vendors, and
                flawless execution.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="#book"
                  className="inline-flex items-center justify-center px-7 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  aria-label="Book an event"
                >
                  Book Now
                </a>

                <a
                  href="/pages/ContactUs"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-white/20 text-white/90 hover:bg-white/6"
                  aria-label="Explore packages and services"
                >
                  Explore Packages
                </a>
              </div>

              <ul className="mt-6 flex flex-wrap gap-4 text-sm text-gray-200">
                <li className="inline-flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                  Trusted vendors
                </li>
                <li className="inline-flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                  Transparent pricing
                </li>
                <li className="inline-flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                  On-time delivery
                </li>
              </ul>
            </div>

            {/* Right column - short highlights or illustration placeholder */}
            <div className="order-first md:order-last md:col-span-4 lg:col-span-3">
              <div className="rounded-xl bg-gradient-to-br from-white/6 to-white/3 p-5 sm:p-6 md:p-6 lg:p-8 w-full">
                <h3 className="text-white font-semibold">Start with a free consult</h3>
                <p className="mt-2 text-sm text-gray-200">
                  Schedule a 15-minute call to discuss your vision and get a
                  customized plan and quote.
                </p>
                <a
                  href="#contact"
                  className="mt-4 inline-block text-sm px-4 py-2 rounded-md bg-yellow-500 text-black font-medium hover:bg-yellow-600 shadow-sm"
                >
                  Request Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
