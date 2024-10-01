import React from 'react';
import { Link } from 'react-router-dom';

interface Job {
  title: string;
  company_name: string;
  location: string;
  listed_time: string;
  job_id: string;
}


interface JobItemProps {
  job: Job;
}

const JobItem: React.FC<JobItemProps> = ({ job }) => (
  <div className="job-item">
    <h2>{job.title}</h2>
    <p>{job.company_name}</p>
    <p>{job.location}</p>
    <p>{new Date(job.listed_time).toLocaleDateString()}</p>
    <Link to={`/jobs/${job.job_id}`}>View Details</Link>
  </div>
);

export default JobItem;
