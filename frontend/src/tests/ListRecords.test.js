import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import ListRecords from '../pages/ListRecords';
import { MemoryRouter as Router } from 'react-router-dom';

jest.mock('axios');

const records = [
  { date: '2022-03-21T12:34:56.000Z', time: 1000 },
  { date: '2022-03-22T12:34:56.000Z', time: 2000 },
  { date: '2022-03-23T12:34:56.000Z', time: 3000 },
];

describe('Testing ListRecords component', () => {
  test('Render filters and list records', async () => {
    axios.get.mockResolvedValueOnce({ data: records });

    render(
      <Router>
        <ListRecords />
      </Router>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('List of Records')).toBeInTheDocument();
    expect(screen.getByLabelText('Start Date:')).toBeInTheDocument();
    expect(screen.getByLabelText('End Date:')).toBeInTheDocument();
    expect(screen.getByLabelText('Order By:')).toBeInTheDocument();
    expect(screen.getByLabelText('Order:')).toBeInTheDocument();
    expect(screen.getByText('Apply Filters')).toBeInTheDocument();
    expect(screen.getByText('Clear Records')).toBeInTheDocument();

    expect(await screen.findByText('Time: 1.00s - Date and Time: 21/03/2022 09:34:56')).toBeInTheDocument();
    expect(await screen.findByText('Time: 2.00s - Date and Time: 22/03/2022 09:34:56')).toBeInTheDocument();
    expect(await screen.findByText('Time: 3.00s - Date and Time: 23/03/2022 09:34:56')).toBeInTheDocument();
  });

  test('clicking on the "Apply Filters" button filters and sorts the records', async () => {
    axios.get.mockResolvedValueOnce({ data: records });

    render(
      <Router>
        <ListRecords />
      </Router>
    );

    const startDateInput = screen.getByLabelText('Start Date:');
    const endDateInput = screen.getByLabelText('End Date:');
    const orderByInput = screen.getByLabelText('Order By:');
    const orderInput = screen.getByLabelText('Order:');
    const applyFiltersButton = screen.getByText('Apply Filters');

    fireEvent.change(startDateInput, { target: { value: '2022-03-22' } });
    fireEvent.change(endDateInput, { target: { value: '2022-03-23' } });
    fireEvent.change(orderByInput, { target: { value: 'time' } });
    fireEvent.change(orderInput, { target: { value: 'desc' } });
    fireEvent.click(applyFiltersButton);

    expect(await screen.findByText('Time: 3.00s - Date and Time: 23/03/2022 09:34:56')).toBeInTheDocument();
    expect(await screen.findByText('Time: 2.00s - Date and Time: 22/03/2022 09:34:56')).toBeInTheDocument();
    expect(await screen.findByText('Time: 1.00s - Date and Time: 21/03/2022 09:34:56')).toBeInTheDocument();
  });
});