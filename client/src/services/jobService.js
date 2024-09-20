import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jobs';

export const getJobs = (limit = 10, offset = 0) => {
  return axios.get(API_URL, {
    params: {
      limit: limit,   // limit for number of jobs to fetch
      offset:offset   // offset for pagination
    }
  }).then(function (response) {
    return response.data;
  });
};
export const getJobById = (id) => axios.get(`${API_URL}/${id}`);

export const upVote = (job_id) => {
  axios.post(`${API_URL}/${job_id}/upvote`)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        console.error(error);
      });
};

export const downVote = (job_id) => {
  //console.log(job_id);
  axios.post(`${API_URL}/${job_id}/downvote`)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        console.error(error);
      });
};
