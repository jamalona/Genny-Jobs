import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar component', () => {

  it('renders the logo', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const logoElement = screen.getByText(/Geniune Jobs/i);
    expect(logoElement).toBeInTheDocument();
  });

  it('renders the navigation links with correct paths', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const homeLink = screen.getByText(/Home/i);
    const searchLink = screen.getByText(/Search/i);
    const postJobLink = screen.getByText(/Post a job/i);

    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    expect(searchLink.closest('a')).toHaveAttribute('href', '/search');
    expect(postJobLink.closest('a')).toHaveAttribute('href', '/add_post');
  });

});