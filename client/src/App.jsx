import React, { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const CustomerDashboard = lazy(() => import("./pages/CustomerDashboard"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Stories = lazy(() => import("./pages/Stories"));
const Gallery = lazy(() => import("./pages/Gallery"));
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-semibold">404 — Not found</h2>
      <p className="text-gray-600">We couldn't find the page you were looking for.</p>
    </div>
  </div>
);

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <a href="#main" className="sr-only focus:not-sr-only p-2">Skip to content</a>
        <Navbar />

        <Suspense fallback={<div className="py-24 text-center">Loading...</div>}>
          <main id="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/gallery" element={<Gallery />} />

              <Route
                path="/dashboard"
                element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>}
              />

              <Route
                path="/adminpanel"
                element={<AdminRoute><AdminPanel /></AdminRoute>}
              />

              <Route path="/contact" element={<ContactUs />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
