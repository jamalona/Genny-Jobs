import React from 'react';
import { useState } from 'react';
import './Main.css'; // Add corresponding CSS for styling
// import JobListingPage from '../components/JobListingPage';

import Navbar from '../components/Navbar.tsx';
import ExploreSection from '../components/ExploreSection.tsx';
import JobList from '../components/JobList';

interface Filter{
  datePosted: string;
  salary: string;
  jobType: string;
  experienceLevel: string;
  workType: string;
  location: string;
  search: string;
}

function Main() {
  const [filtersObj, setFiltersObj] = useState <Filter>({
    datePosted: '',
    salary: '',
    jobType: '',
    experienceLevel: '',
    workType: '',
    location: '',
    search: '',
  });

  const handleDataChange = (updatedFilters: Filter) => {
    setFiltersObj(updatedFilters); 
  };

  return (
      <div className="job-container">
        {/* Navbar */}
        <Navbar />
        {/* Main Content */}
        <ExploreSection  setFiltersObj={handleDataChange} />
        <JobList  filtersObj={filtersObj}  />
      </div>
  );
}

export default Main;
