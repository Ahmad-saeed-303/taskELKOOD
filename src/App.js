import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import JobListings from "./components/JobListings";
import PostJob from "./components/PostJob";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ApplyJob from "./pages/ApplyJob";
import PersonDashboard from "./pages/PersonDashboard";
import EntityDashboard from "./pages/EntityDashboard";
import ApplicantDetails from "./components/ApplicantDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isLoggedIn = !!currentUser;

  const hideLayout = ["/login", "/register", "/"];

  const shouldHideLayout = hideLayout.includes(location.pathname);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <div className="content">
            {isLoggedIn && !shouldHideLayout && (
          <Navbar/>
            )}
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                  path="/dashboard"
                  element={<ProtectedRoute allowedRole="person"><PersonDashboard /></ProtectedRoute>}
                />
                <Route
                  path="/apply/:jobId"
                  element={<ProtectedRoute allowedRole="person"><ApplyJob /></ProtectedRoute>}
                />
                <Route
                  path="/entity-dashboard"
                  element={<ProtectedRoute allowedRole="entity"><EntityDashboard /></ProtectedRoute>}
                />
                <Route
                  path="/post-job"
                  element={<ProtectedRoute allowedRole="entity"><PostJob /></ProtectedRoute>}
                />
                <Route
                  path="/applicant/:id"
                  element={<ProtectedRoute allowedRole="entity"><ApplicantDetails /></ProtectedRoute>}
                />
                <Route path="/job-list" element={<JobListings />} />
              </Routes>
            </main>
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
