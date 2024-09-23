import React from 'react';
import { useState } from 'react';
import './Main.css'; // Add corresponding CSS for styling
import { Routes, Route } from 'react-router-dom';
import JobListingPage from './JobListingPage';
import JobDetailPage from './JobDetailPage';
import Navbar from '../components/Navbar';
import ExploreSection from '../components/ExploreSection';


function Main() {
  const [filtersObj, setFiltersObj] = useState({
    datePosted: '',
    salary: '',
    jobType: '',
    experienceLevel: '',
    workType: '',
  });

  const handleDataChange = (updatedFilters) => {
    setFiltersObj(updatedFilters); 
  };

  return (
    <div className="job-snap-container">
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <ExploreSection  setFiltersObj={handleDataChange} />
      <JobListingPage  filtersObj={filtersObj}  />
      <Routes>
        {/* <Route path="/" element={} /> */}
        <Route path="/jobs/:id" element={<JobDetailPage />} />
      </Routes>
    </div>
  );
}

export default Main;
