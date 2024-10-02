import { render, screen } from "@testing-library/react";
import ExploreSection from "./ExploreSection";

const mockSetFiltersObj = jest.fn();
const mockFiltersObj = {
  datePosted: "",
  salary: "",
  jobType: "",
  experienceLevel: "",
  workType: "",
  location: "",
  search: ""
};

describe("ExploreSection component", () => {

  it("Renders the search bar and filter options", () => {
    render(
      <ExploreSection setFiltersObj={mockSetFiltersObj} filtersObj={mockFiltersObj} />
    );

    expect(screen.getByPlaceholderText(/Looking for/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter location/i)).toBeInTheDocument();

    expect(screen.getByText(/Filter by/i)).toBeInTheDocument();
    expect(screen.getByText(/Date posted/i)).toBeInTheDocument();
    expect(screen.getByText(/Salary/i)).toBeInTheDocument();
    expect(screen.getByText(/Job type/i)).toBeInTheDocument();
  });
  
});
