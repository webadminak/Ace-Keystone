import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation  } from 'react-router-dom';
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import Services from "./components/services";
import About from "./components/about";
import Teams from "./components/Teams";
import Contact from "./components/contact";
import Intern from "./components/intern"
import Medical from "./sections/medical";
import Careers from "./sections/careers";
import JobDetail from "./sections/JobDetail";
import ScrollToTop from '../src/components/ScrollToTop';
import OurTech from "../src/components/OurTech"
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

// <-- NEW: import your new page/component here (create the file if needed) -->
import NewPage from "./components/ServicesLayout";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const RemoveTrailingSlash = () => {
  const location = useLocation();
  if (location.pathname.endsWith('/') && location.pathname !== '/') {
    return <Navigate to={location.pathname.slice(0, -1)} replace />;
  }
  return null;
};

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <RemoveTrailingSlash />

      <div>
        <Navigation />
        <Routes>
          <Route path="/teams" element={<Teams />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ourtech" element={<OurTech />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/interns" element={<Intern />} />
          <Route path="/medical" element={<Medical />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:jobId" element={<JobDetail />} />

          {/* <-- NEW ROUTE: change path and component as required */}
          <Route path="services/geo-spatial" element={<NewPage />} />

          <Route
            path="/"
            element={
              <>
                <Header data={landingPageData.Header} />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
