import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MainPage from '../pages/MainPage';
import { MemoryRouter as Router } from 'react-router-dom';

jest.mock('axios');

describe('MainPage component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the component', async () => {
    render(
      <Router>
        <MainPage />
      </Router>
    );

    expect(screen.getByText('Fast Double Click')).toBeInTheDocument();
    expect(screen.getByText('Double Click')).toBeInTheDocument();
    expect(screen.getByText('List Records')).toBeInTheDocument();
  });

  test('should handle button click', async () => {
    const mockPost = axios.post.mockResolvedValueOnce({ data: 'success' });
    render(
      <Router>
        <MainPage />
      </Router>
    );

    fireEvent.click(screen.getByText('Double Click'));
    expect(mockPost).not.toBeCalled();

    fireEvent.click(screen.getByText('Double Click'));
    expect(mockPost).toBeCalledTimes(1);
  });
});
