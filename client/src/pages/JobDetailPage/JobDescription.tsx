/* eslint-disable react/prop-types */
import React from 'react';
import { Job } from '../../services/interfaces';

interface JobDescriptionProps {
  job: Job;
  desc: string;
}

export default function JobDescription ({job, desc}: JobDescriptionProps) {

  return (
    <>
    <div className="job-description">
        <p dangerouslySetInnerHTML={{ __html: desc }} />
    </div>

    <div className="job-skills">
      <h3>Skills Required</h3>
      <p>{job?.skills_desc || 'Not specified'}</p>
    </div>
    </>
  )
}
