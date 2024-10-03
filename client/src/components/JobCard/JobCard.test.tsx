// const axios = require('axios');
import { render, screen } from "@testing-library/react";
import JobCard from './JobCard';
import { BrowserRouter } from 'react-router-dom';

const mockJob = {
  _id: 'dsfsdfdf345345',
  job_id: 11,   
  company_name: 'Good for you',
  title: 'Chief',
  description: 'Very Good',        
  max_salary: 1133,                                 // Maximum salary offered
  min_salary: 200,                                 // Minimum salary offered
  med_salary: 0,                                 // Median salary (if available)
  pay_period: 'YEARLY',     // Pay period (Hourly/Yearly)
  location: 'Melbourne',                   // Job location
  company_id: 321,                                 // Company ID
  views: 0,                          // Number of views
  applies: 5,                        // Number of applications
  original_listed_time: new Date('2024-04-18T00:26:40.000Z'),                         // Original listing date
  listed_time: new Date('2024-04-18T00:26:40.000Z'),               // Date when job was listed in the system
  expiry: new Date('2024-04-18T00:26:40.000Z'),                                       // Expiration date of the listing
  closed_time: new Date('2024-04-18T00:26:40.000Z'),                                  // When the job listing was closed
  job_posting_url: 'www.listing.com',                            // URL to the original job posting
  application_url: 'www.listing.com',                            // URL for applications
  application_type: 'easy',                           // Type of application process
  remote_allowed: false,            // If remote work is allowed
  formatted_experience_level: '.',                 // Required experience level (formatted)
  formatted_work_type: '.',                        // Work type (formatted, e.g., FULL_TIME)
  skills_desc: '.',                                // Skills required/description
  posting_domain: '.',                             // Domain where the job is posted
  sponsored: false,                 // If the job is sponsored
  work_type: 'PART_TIME',// Type of work (Full-time/Part-time)
  currency: 'USD',                  // Currency of the salary
  compensation_type: 'base salary',                          // Type of compensation (e.g., base salary)
  normalized_salary: 0,                          // Normalized salary figure
  zip_code: 2346,                                   // Job location's ZIP code
  fips: '.',                                       // FIPS code for the location
  ai_trust_index: 0,                             // AI trust index
  user_trust_index: 0
}

// jest.mock('axios');


describe("JobCard component", () => {

  it("Displays the job", () => {

    // axios.get.mockResolvedValue({ data: [] });

    render(
      <BrowserRouter>
        <JobCard job={mockJob} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Good for you/i)).toBeInTheDocument();
  });
  
});
