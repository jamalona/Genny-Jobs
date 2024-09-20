import React from 'react';
import './Main.css'; // Add corresponding CSS for styling
import { Routes, Route } from 'react-router-dom';
import JobListingPage from './JobListingPage';
import JobDetailPage from './JobDetailPage';
import Navbar from '../components/Navbar';
import ExploreSection from '../components/ExploreSection';


function Main() {
  return (
    <div className="job-snap-container">
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <ExploreSection />
      
      <Routes>
        <Route path="/" element={<JobListingPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
      </Routes>
    </div>
  );
}

export default Main;
