import React from 'react';

const ExploreSection = () => (
  <div className="explore-section">
    <h1>Explore jobs</h1>

    {/* Category Filters */}
    <div className="category-filters">
      <div className="categories">
        <button className="btn selected">Sales</button>
        <button className="btn">Marketing</button>
        <button className="btn">+ Add more categories</button>
        <button className="btn remote">Remote</button>
      </div>
      <button className="search-btn">Search</button>
    </div>

    {/* Additional Categories */}
    <div className="more-categories">
      <button className="btn">Logistics</button>
      <button className="btn">Customer support</button>
      <button className="btn">Tech</button>
    </div>

    {/* Filter Bar */}
    <div className="filter-bar">
      <select>
        <option value="">Date posted</option>
        <option value="last24hours">Last 24 hours</option>
        <option value="last7days">Last 7 days</option>
        <option value="thismonth">This month</option>
        <option value="anytime">Anytime</option>
      </select>

      <select>
        <option value="">Salary</option>
        <option value="<20k">up to $20,000</option>
        <option value="20k-60k">$20,000 - $60,000</option>
        <option value="60k-100k">$60,000 -  $100,000</option>
        <option value="100k+">$100,000+</option>
      </select>

      <select>
        <option value="">Job type</option>
        <option value="full_time">Full-time</option>
        <option value="part_time">Part-time</option>
        <option value="contract">Contract</option>
        <option value="internship">Internship</option>
        <option value="temporary">Temporary</option>
      </select>

      <select>
        <option value="">Experience level</option>
        <option value="entry_level">Entry Level</option>
        <option value="mid_level">Mid Level</option>
        <option value="senior_level">Senior Level</option>
        <option value="director">Director</option>
        <option value="executive">Executive</option>
      </select>

      <select>
        <option value="">On-site / Remote</option>
        <option value="on_site">On-site</option>
        <option value="remote">Remote</option>
        <option value="hybrid">Hybrid</option>
      </select>
    </div>


    
  </div>
);
export default ExploreSection;
