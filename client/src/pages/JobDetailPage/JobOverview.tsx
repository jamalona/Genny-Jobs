/* eslint-disable react/prop-types */
import React from 'react';
import { Job } from '../../services/interfaces';

interface JobOverviewProps {
  job: Job;
  handleUpvote: (jobId: string) => void;
  handleDownvote: (jobId: string) => void;
  voteCount: number;
  salaryRange: string;
}

export default function JobOverview ({job, handleUpvote, handleDownvote, voteCount, salaryRange}: JobOverviewProps) {

  
  return (
    <>
     <h3>Job overview</h3>
                <div className="job-detail-card">

                  <div className='job-actions'>
                    <div className="elegant-vote-container">
                      <div className="vote-info">AI trust <strong>{job?.ai_trust_index || "3.5/5"}</strong></div>
                      <div className="vote-controls">
                        <button className="vote-button elegant-upvote" onClick={()=>handleUpvote(job._id)}>
                          <span>&#9650;</span>
                        </button>
                        <span className="vote-count">{voteCount}</span>
                        <button className="vote-button elegant-downvote" onClick={()=>handleDownvote(job._id)}>
                          <span>&#9660;</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <br/>

                  <div className="job-header">
                    <p className="location"><i className="fa fa-map-marker"></i> {job?.location}</p>
                    <p className="posted-time">Listed on: 
                      {typeof job?.listed_time !== 'undefined' ? new Date(job?.listed_time).toLocaleDateString() : 'Not specified'}
                    </p>
                    <p className="expiration-date">Expires on: 
                      {typeof job?.expiry !== 'undefined' ? new Date(job?.expiry).toLocaleDateString() : 'Not specified'}
                    </p>
                  </div>
                  <div className="job-salary">
                      <h3>Salary</h3>
                      <p>{salaryRange} </p>
                      <p>{job?.med_salary > 0 && <p >Median Salary: {job?.med_salary.toLocaleString()} {job?.currency}</p>}</p>
                  </div>
                  <div>
                    <ul>
                      <li><strong>Experience Level:</strong> </li>
                      <li><strong>Work Type:</strong> {job?.formatted_work_type || job?.work_type || 'Not specified'}</li>
                      <li><strong>Remote Allowed:</strong> {job?.remote_allowed ? 'Yes' : 'No'}</li>
                      <li><strong>Compensation Type:</strong> {job?.compensation_type || 'Not specified'}</li>
                      <li><strong>ZIP Code:</strong> {job?.zip_code || 'Not specified'}</li>
                    </ul>
                  </div>
                  
                  {job?.application_url && (
                    <div className="apply-button">
                        <a href={job?.application_url} target="_blank" rel="noopener noreferrer" className="apply-button">Apply Now</a>
                    </div>
                  )}
              </div>
    </>
  )
}