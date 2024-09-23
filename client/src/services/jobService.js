import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jobs';

export const getJobs = (limit = 10, offset = 0 ,filters) => {
  const nonEmptyFilters = Object.fromEntries(
    Object.entries(filters).filter(([value]) => value !== '')
  );
  return axios.get(API_URL, {
    params: {
      limit: limit,   // limit for number of jobs to fetch
      offset:offset,   // offset for pagination
      ...nonEmptyFilters
    }
  }).then(function (response) {
    return response.data;
  });
};
export const getJobById = (id) => axios.get(`${API_URL}/${id}`);

export const upVote = async (job_id) => {
  try {
    await axios.post(`${API_URL}/${job_id}/upvote`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const downVote = async(job_id) => {
  //console.log(job_id);
  try {
    await axios.post(`${API_URL}/${job_id}/downvote`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
