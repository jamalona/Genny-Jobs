import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from '../services/jobService';

const JobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    getJobById(id).then(response => setJob(response.data));
  }, [id]);

  if (!job) return <div>Loading...</div>;

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.company_name}</p>
      <p>{job.location}</p>
      <p>{job.description}</p>
      <p>{new Date(job.listed_time).toLocaleDateString()}</p>
    </div>
  );
};

export default JobDetailPage;
