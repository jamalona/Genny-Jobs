/* eslint-disable react/prop-types */
import React from 'react';

export default function JobDetailHeader ({job, desc}) {

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