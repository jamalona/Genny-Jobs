import axios from 'axios';
import { Filter } from './interfaces';

const API_URL = 'http://localhost:5001/api/jobs';

export const getJobs = (limit = 10, offset = 0 ,filters: Filter) => {
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
export const getJobById = (id: string) => axios.get(`${API_URL}/${id}`);

export const vote = async (jobId: string, voteType: string) => {
  try {
    await axios.post(`${API_URL}/${jobId}/${voteType}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
