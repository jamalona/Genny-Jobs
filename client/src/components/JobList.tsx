import React, { useEffect, useState, FC } from 'react';
import ReactPaginate from 'react-paginate';
import { getJobs } from '../services/jobService';
import JobCard from './JobCard';
import './JobList.css';

interface Job {
  job_id: string;
  title: string;
  location: string;
  description: string;
  _id: string;
  ai_trust_index: number;
  user_trust_index: number;
  work_type: string;
 
}


interface Filter {
  datePosted: string;
  salary: string;
  jobType: string;
  experienceLevel: string;
  workType: string;
  location: string;
  search: string;
}

interface JobListProps {
  filtersObj: Filter;
}

const JobList: FC<JobListProps> = ({ filtersObj }) => {
  const [jobs, setJobs] = useState<Job[]>([]); // Set correct type for jobs state
  const [pageNumber, setPageNumber] = useState<number>(0);
  const limit = 6;
  const [totalJobs, setTotalJobs] = useState<number>(0); // Store the total number of jobs
  
  useEffect(() => {
    const offset = pageNumber * limit; // calculate offset based on page number and limit
    getJobs(limit, offset, filtersObj).then(response => {
      setJobs(response.data);
      setTotalJobs(response.total); // assuming the API returns the total number of jobs in response
    });
  }, [pageNumber, limit, filtersObj]);

  const handlePageChange = (event: { selected: number }) => {
    setPageNumber(event.selected); // update pageNumber state correctly from ReactPaginate event
  };

  return (
    <div>
      {/* Job Postings */}
      <div className="job-postings">
        <p className="job-count">We have found <strong>{totalJobs}</strong> job postings</p>
      </div>

      {jobs.map(job => (
        <JobCard job={job} key={job.job_id} />
      ))}
      <div>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(totalJobs / limit)} 
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
};

export default JobList;
