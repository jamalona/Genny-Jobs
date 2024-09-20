const Job = require('../models/Job');

// Get all jobs

exports.getAllJobs = async (req, res) => {
  try {
    // Convert limit and offset to integers
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;

    // Fetch the total number of jobs
    const totalJobs = await Job.countDocuments();

    // Fetch the jobs with pagination
    const jobs = await Job.find()
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