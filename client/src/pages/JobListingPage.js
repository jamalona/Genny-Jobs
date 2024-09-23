import React from 'react';
import JobList from '../components/JobList';

const JobListingPage = ({filtersObj}) => (
  <div>
    <JobList filtersObj={filtersObj} />
  </div>
);

export default JobListingPage;
