import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";

import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

import MainPage from "./pages/Main.tsx";
import AboutPage from "./pages/About.tsx";
import ContactsPage from "./pages/Features.tsx";
import PricingPage from "./pages/Pricing.tsx";
import FeedbackPage from "./pages/Feedback.tsx";
import Page404 from "./pages/404.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink
                    to="/"
                    aria-current="page"
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 text-sm font-medium text-white ${isActive ? "bg-gray-950/50" : ""}`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/contacts"
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 text-sm font-medium text-white ${isActive ? "bg-gray-950/50" : ""}`
                    }
                  >
                    Features
                  </NavLink>
                  <NavLink
                    to="/pricing"
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 text-sm font-medium text-white ${isActive ? "bg-gray-950/50" : ""}`
                    }
                  >
                    Pricing
                  </NavLink>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 text-sm font-medium text-white ${isActive ? "bg-gray-950/50" : ""}`
                    }
                  >
                    About
                  </NavLink>
                  <NavLink
                    to="/feedback"
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 text-sm font-medium text-white ${isActive ? "bg-gray-950/50" : ""}`
                    }
                  >
                    Feedback
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route index element={<MainPage />} />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  </StrictMode>
);
