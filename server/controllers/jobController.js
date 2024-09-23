const Job = require('../models/Job');

// Get all jobs

exports.getAllJobs = async (req, res) => {
  try {
    // Convert limit and offset to integers
    let { limit,offset ,...filters } = req.query;
    limit = limit || 5;
    offset = offset || 0;

    // Fetch the total number of jobs
    const totalJobs = await Job.countDocuments();

    // Fetch the jobs with pagination
    let Fixfilters = buildFiltersObject(filters);
    //console.log(Fixfilters);
    const jobs = await Job.find(Fixfilters)
      .skip(offset)
      .limit(limit);

    // Send both the paginated jobs and the total number of jobs    
    res.json({
      data: jobs,
      total: totalJobs, // Provide total jobs for pagination
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Get job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).send('Job not found');
    res.json(job);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Create new job
exports.createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).send('Job not found');
    res.json(job);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).send('Job not found');
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.upVote =  async (req, res) => {
  const jobId = req.params.id;
  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(404).send({ message: 'Job not found' });
  }
  // Check if `user_trust_index` exists, if not, initialize it with 0
  if (job.user_trust_index === undefined) {
    job.user_trust_index = 0;
  }

  // Decrement the `user_trust_index`
  job.user_trust_index += 1;

  try {
    // Save the updated job document
    await job.save();
    res.send({ message: 'Upvote successful', userTrustIndex: job.user_trust_index });
  } catch (error) {
    return res.status(500).send({ message: 'Failed to update job', error: error.message });
  }
};
exports.downVote =  async (req, res) => {
  const jobId = req.params.id;
  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(404).send({ message: 'Job not found' });
  }
  // Check if `user_trust_index` exists, if not, initialize it with 0
  if (job.user_trust_index === undefined) {
    job.user_trust_index = 0;
  }

  // Decrement the `user_trust_index`
  job.user_trust_index -= 1;

  try {
    // Save the updated job document
    await job.save();
    res.send({ message: 'Downvote successful', userTrustIndex: job.user_trust_index });
  } catch (error) {
    return res.status(500).send({ message: 'Failed to update job', error: error.message });
  }
};


function buildFiltersObject(filters) {
  // Build the filters object dynamically
  let queryFilters = {};

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
  return queryFilters;
}