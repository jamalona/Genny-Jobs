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
        <option>Date posted</option>
      </select>
      <select>
        <option>Salary</option>
      </select>
      <select>
        <option>Job type</option>
      </select>
      <select>
        <option>Experience level</option>
      </select>
      <select>
        <option>On-site / Remote</option>
      </select>
    </div>

    
  </div>
);
export default ExploreSection;
