const Job = require('../models/Job');
import { Request, Response } from 'express';
import { QuerySelector } from 'mongoose';
import { Filter } from '../../client/src/services/interfaces';

// Get all jobs

exports.getAllJobs = async (req: Request, res: Response) => {
  try {
    // Convert limit and offset to integers
    let { limit, offset, ...filters } = req.query;
    let limitNum = limit || 5;
    let offsetNum = offset || 0;

    const newFilters: Filter = {
      datePosted: filters.datePosted as string,  
      salary: filters.salary as string,
      jobType: filters.jobType as string,
      experienceLevel: filters.experienceLevel as string,
      workType: filters.workType as string,
      location: filters.location as string,
      search: filters.search as string,
    };

    let Fixfilters = buildFiltersObject(newFilters);

    // Fetch the total number of jobs
    const totalJobs = await Job.countDocuments(Fixfilters);
    
    // Fetch the jobs with pagination
    const jobs = await Job.find(Fixfilters)
      .skip(offsetNum)
      .limit(limitNum);

    // Send both the paginated jobs and the total number of jobs    
    res.json({
      data: jobs,
      total: totalJobs, // Provide total jobs for pagination
    });
  } catch (err) {
    res.status(500).send({err});
  }
};

// Get job by ID
exports.getJobById = async (req: Request, res: Response) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).send('Job not found');
    res.json(job);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create new job
exports.createJob = async (req: Request, res: Response) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update job
exports.updateJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).send('Job not found');
    res.json(job);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete job
exports.deleteJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).send('Job not found');
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.vote = async (req: Request, res: Response) => {
  const jobId = req.params.id;
  const voteType = req.params.voteType; // Assume 'voteType' is either 'upvote' or 'downvote'

  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(204).send({ message: 'Job not found' });
  }

  // Initialize `user_trust_index` to 0 if it doesn't exist
  if (job.user_trust_index === undefined) {
    job.user_trust_index = 0;
  }

  // Adjust the `user_trust_index` based on the vote type
  if (voteType === 'upvote') {
    job.user_trust_index += 1;
  } else if (voteType === 'downvote') {
    job.user_trust_index -= 1;
  } else {
    return res.status(400).send({ message: 'Invalid vote type' });
  }

  try {
    // Save the updated job document
    await job.save();
    res.send({ message: `${voteType === 'upvote' ? 'Upvote' : 'Downvote'} successful`, userTrustIndex: job.user_trust_index });
  } catch (error) {
    return res.status(500).send({ message: 'Failed to update job', error: error });
  }
};

function buildFiltersObject(filters: Filter) {
  
  interface OrObject {
    title: { $regex: string; $options: string };
  }

  interface QueryFilters {
    listed_time?: {$gte: number};
    normalized_salary?: {$lte?: number, $gte?: number};
    work_type?: string;
    formatted_experience_level?: string;
    remote_allowed?: boolean | string;
    $or?: OrObject[];
    location?: { $regex: string; $options: string };
  }

  let queryFilters: QueryFilters = {};

  // Handle 'datePosted' filter
  if (filters.datePosted) {
    const now = new Date();
    switch (filters.datePosted) {
      case 'last24hours':
        queryFilters.listed_time = { $gte: now.setDate(now.getDate() - 1) };
        break;
      case 'last7days':
        queryFilters.listed_time = { $gte: now.setDate(now.getDate() - 7) };
        break;
      case 'thismonth':
        queryFilters.listed_time = { $gte: new Date(now.getFullYear(), now.getMonth(), 1).getTime() };
        break;
      case 'anytime':
        // Do nothing as anytime means no date filter
        break;
    }
  }

  // Handle 'salary' filter
  if (filters.salary) {
    switch (filters.salary) {
      case '<20k':
        queryFilters.normalized_salary = { $lte: 20000 };
        break;
      case '20k-60k':
        queryFilters.normalized_salary = { $gte: 20000, $lte: 60000 };
        break;
      case '60k-100k':
        queryFilters.normalized_salary = { $gte: 60000, $lte: 100000 };
        break;
      case '100k+':
        queryFilters.normalized_salary = { $gte: 100000 };
        break;
    }
  }

  // Handle 'jobType' filter
  if (filters.jobType) {
    queryFilters.work_type = filters.jobType.toUpperCase(); // Assuming work_type uses upper case for types
  }

  // Handle 'experienceLevel' filter
  if (filters.experienceLevel) {
    queryFilters.formatted_experience_level = filters.experienceLevel;
  }

  // Handle 'workType' filter (On-site, Remote, Hybrid)
  if (filters.workType) {
    switch (filters.workType) {
      case 'on_site':
        queryFilters.remote_allowed = false;
        break;
      case 'remote':
        queryFilters.remote_allowed = true;
        break;
      case 'hybrid':
        // Handle hybrid work type if applicable
        queryFilters.remote_allowed = 'hybrid';
        break;
    }
  }

  // Handle 'search' filter
  if (filters.search) {
    queryFilters.$or = [
      { title: { $regex: '.*' + filters.search + '.*', $options: 'i' } },
    ];
  }

  // Handle 'location' filter
  if (filters.location) {
    queryFilters.location = { $regex: '.*' + filters.location + '.*', $options: 'i' };
  }

  return queryFilters;
}