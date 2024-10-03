import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from '../../services/jobService';
import './JobDetailPage.css';
import { Link } from 'react-router-dom';
import { vote} from '../../services/jobService';
import JobDetailHeader from './JobDetailHeader';
import JobDescription from './JobDescription';
import JobOverview from './JobOverview';
import { Job } from '../../services/interfaces';

export default function JobDetailPage () {
  const [voteCount, setVoteCount] = useState(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  
  const { id } = useParams();
  const [job, setJob] = useState<Job | null >(null);

  useEffect(() => {
    // Fetch job details based on the job ID from the URL params
    if (id) {
      getJobById(id).then(response => setJob(response.data));
    }
    if(job){
      setVoteCount(job.user_trust_index);
    }
  }, [id,job]);

  if (!job) return <div>Loading...</div>;

  const handleUpvote = (job_id: number) => {
    if (!hasUpvoted) {
      setVoteCount(voteCount + 1);
      setHasUpvoted(true);
      setHasDownvoted(false);
      // API call to update the vote count on the server
      vote(job_id, 'upvote');
    }
  };

  const handleDownvote = (job_id: number) => {
    if (!hasDownvoted) {
      setVoteCount(voteCount - 1);
      setHasDownvoted(true);
      setHasUpvoted(false);
      // API call to update the vote count on the server
      vote(job_id, 'downvote');
    }
  };

  
  const salaryRange = job?.max_salary && job?.min_salary ? (
    `${job?.min_salary.toLocaleString()} ${job?.currency} - ${job?.max_salary.toLocaleString()} ${job?.currency} ${job?.pay_period ? `(${job?.pay_period.toLowerCase()})` : ''}`
  ) : (
    'Salary information not available'
  );
  const desc = formatJobDescription(job?.description);

  return (
    <div id="jobDetailsSection" className="job-details-section">
      <div className="job-details-container">
        <h1 className="job-title">{job?.title}</h1>
        <Link to={`/`} >
          <button className="btn btn-red">Back</button>
        </Link>
        <JobDetailHeader job={job}/>
        
          <div className="content">
            <div className="left-column">
              <JobDescription job={job} desc={desc}/>
            </div>
            <div className="right-column">
              <JobOverview job={job} handleUpvote={handleUpvote} handleDownvote={handleDownvote} voteCount={voteCount} salaryRange={salaryRange} />
            </div>
          </div>
      </div>
    </div>
  );
};

function formatJobDescription(description: string) {
  // Step 1: Normalize and clean the description
  description = description.replace(/\s+/g, ' ').trim(); // Remove excess whitespace
  description = description.replace(/([a-z])([A-Z])/g, '$1. $2'); // Add missing periods before capitalized words
  description = description.replace(/\.(?=[^\s])/g, '. '); // Add space after periods, if missing
  description = description.replace(/\s?-\s?/g, ' - '); // Normalize dashes

  // Step 2: Define common section headers and patterns
  const sectionHeaders = [
      "responsibilities", "requirements", "qualifications", "skills", "benefits",
      "about us", "description", "job duties", "experience needed", "education",
      "job description", "overview", "key duties", "preferred qualifications",
      "mandatory requirements", "preferred experience", "who you are", "role", "schedule"
  ];

  // Use regex to find section headers
  const sectionRegex = new RegExp(`\\b(${sectionHeaders.join('|')})\\b`, 'gi');

  // Split description into sections based on detected headers
  const sections = description.split(sectionRegex);

  let formattedDescription: { [key: string]: string } = {};
  let currentSection = 'General Information';

  for (let i = 0; i < sections.length; i++) {
      let section = sections[i].trim();

      // Check if the section matches a header
      if (sectionHeaders.some(header => new RegExp(header, 'i').test(section))) {
          currentSection = section.charAt(0).toUpperCase() + section.slice(1).toLowerCase();
      } else if (section.length > 0) {
          // Append to the current section
          if (!formattedDescription[currentSection]) {
              formattedDescription[currentSection] = section;
          } else {
              formattedDescription[currentSection] += ' ' + section;
          }
      }
  }

  // Step 3: Format bullet points
  for (let section in formattedDescription) {
    if (formattedDescription[section].startsWith(':') || formattedDescription[section].startsWith('.')) {
      formattedDescription[section] = formattedDescription[section].slice(1); // Remove the colon or dot if present at the beginning
    }
    formattedDescription[section] = formattedDescription[section]
      .replace(/[-*•]\s+/g, '<br/> - ') // Convert common bullet symbols into a standard format
      .replace(/\.\s/g, '.<br/>') // Add line breaks after sentences for readability
      .trim();
  }

  // Step 4: Construct the final formatted output
  let formattedOutput = '';
  for (let section in formattedDescription) {
    if(formattedDescription[section].length > 10) {
      //section in bold and with line breaks . then section description
      formattedOutput += `\n\n <strong class="section-header">${section} :</strong>   ${formattedDescription[section]}`;
      formattedOutput += '<br/><br/>';
    }
  }

  return formattedOutput.trim();
  // return formattedOutput.trim().split('\n\n') // Split paragraphs
  // .map(section => section.split('\n').join('<br />')) // Split lines within a paragraph
  // .map(section => `<p>${section.trim()}</p>`) // Wrap in paragraph tags
  // .join('');
}