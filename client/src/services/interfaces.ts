export interface Filter{
  datePosted: string;
  salary: string;
  jobType: string;
  experienceLevel: string;
  workType: string;
  location: string;
  search: string;
}

export interface Job {
  _id: string;
  job_id: number;
  title: string;
  ai_trust_index: number;
  user_trust_index: number;
  description: string;
  work_type: string;
  location: string;
  formatted_experience_level: string;
  company_name: string;
  max_salary: number;
  pay_period: string;
  company_id: number;
  views: number;
  min_salary: number;
  formatted_work_type: string;
  applies: number;
  currency: string;
  skills_desc: string;
  listed_time: Date;
  job_posting_url: string;
  expiry: Date;
  med_salary: number;
  remote_allowed: boolean;
  zip_code: number;
  compensation_type: string;
  application_url: string;
}