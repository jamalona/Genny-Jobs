const supertest = require('supertest')
import mongoose from 'mongoose';
import app from '../app';
// import Job from '../models/Job';
const Job = require('../models/Job')

// Connect to the test database before running the tests
describe('Job API', () => {
  // Clear the database between tests
  beforeEach(async () => {
    await Job.deleteMany({});
  });

  // Close the MongoDB connection after all tests are done
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/jobs', () => {
    it('should return a list of jobs', async () => {
      // Insert sample jobs for testing
      await Job.insertMany([
        {
          job_id: 1,
          company_name: 'TechCorp',
          title: 'Software Engineer',
          description: 'Develop and maintain software.',
          location: 'San Francisco, CA',
          max_salary: 120000,
          min_salary: 90000,
          pay_period: 'YEARLY',
          work_type: 'FULL_TIME',
          remote_allowed: true,
        },
        {
          job_id: 2,
          company_name: 'DataCorp',
          title: 'Data Scientist',
          description: 'Analyze data and build predictive models.',
          location: 'New York, NY',
          max_salary: 150000,
          min_salary: 100000,
          pay_period: 'YEARLY',
          work_type: 'FULL_TIME',
          remote_allowed: false,
        },
      ]);

      // Make a request to the API
      const response = await supertest(app).get('/api/jobs').expect(200);


      // Check that the response has the correct data structure
      expect(response.body.data).toHaveLength(2); // Access the data array

      // Check specific job titles
      expect(response.body.data[0].title).toBe('Software Engineer');
      expect(response.body.data[1].title).toBe('Data Scientist');
    });
  });


  describe("post /api/jobs", () => {
    it("should create new job and return it", async () => {
      const newJob = {
        job_id: 3,
        company_name: 'LCorp',
        title: 'Biologist',
        description: 'Animal cloning',
        location: 'San Francisco, CA',
        max_salary: 250000,
        min_salary: 120000,
        pay_period: 'YEARLY',
        work_type: 'FULL_TIME',
        remote_allowed: false,
      }


      const response = await supertest(app)
        .post('/api/jobs')
        .send(newJob)
        .expect(201)

      expect(response.body).toHaveProperty('job_id')
      expect(response.body.title).toBe(newJob.title)
      expect(response.body.min_salary).toBe(newJob.min_salary)



    });

    describe('Put /api/jobs', () => {
      it('should update an existing job and return it', async () => {
        const newJob = new Job(
          {
            job_id: 5,
            company_name: 'WayneEnterprise',
            title: 'Engineer',
            description: 'weapons manufacturing',
            location: 'Gotham',
            max_salary: 350000,
            min_salary: 200000,
            pay_period: 'YEARLY',
            work_type: 'FULL_TIME',
            remote_allowed: true,
          }
        )
        await newJob.save()

        const updatedJobData = {
          max_salary: 500000,
          description: 'Head of manufacturing'
        }

        //Send PUT request to update the job
        const response = await supertest(app)
          .put(`/api/jobs/${newJob._id}`)
          .send(updatedJobData)
          .expect(200)

        expect(response.body).toHaveProperty('_id', newJob._id.toString());
        expect(response.body.max_salary).toBe(updatedJobData.max_salary);
        expect(response.body.description).toBe(updatedJobData.description);
      });
    });


    describe("Delete /api/jobs", () => {
      it("Should delete existing job", async () => {
        const job = new Job({
          job_id: 5,
          company_name: 'Chelsea',
          title: 'Footballer',
          description: 'plays football',
          location: 'london',
          max_salary: 350000,
          min_salary: 200000,
          pay_period: 'YEARLY',
        })

        await job.save()

        const response = await supertest(app)
          .delete(`/api/jobs/${job._id}`)
          .expect(200)
        expect(response.body.message).toBe('Job deleted successfully');

        const deletedJob = await Job.findById(job._id);  // Find the job by its _id
        expect(deletedJob).toBeNull();

      })
    })






  });
});