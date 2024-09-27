/* eslint-disable react/prop-types */
import React from 'react';

export default function JobDetailHeader ({job}) {

  return (
    <>
    <div className="header">
            <div className="card">
              <div className="logo">📊
                  {/* <img src="logo.png" alt="Company Logo" /> */}
              </div>
              <div className="company-info">
                  <h2>{job?.company_name}</h2>
                  
                  <div className="interactive-elements">
                      <p><i className="fa fa-globe"></i> Website</p>
                      <p><i className="fa fa-envelope"></i> info@examplecomapny.com</p>
                      <p><i className="fa fa-facebook"></i> Share on Facebook</p>
                      <p className="listed-time">Listed on: 
                        {typeof job?.listed_time !== 'undefined' ? new Date(job?.listed_time).toLocaleDateString() : 'Not specified'}

                      </p>
                  </div>
              </div>
              
              {job?.job_posting_url && (
              <div className="apply-button">
                  <button>Apply for job</button>
              </div>
              )}

            </div>
          </div>
    </>
  )
}