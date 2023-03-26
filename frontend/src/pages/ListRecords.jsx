/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL_RECORDS } from '../utils/strings';
import '../styles/ListRecords.css';

export default function ListRecords() {
  const [records, setRecords] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [orderBy, setOrderBy] = useState('time');
  const [order, setOrder] = useState('asc');


  useEffect(() => {
    axios.get(API_URL_RECORDS)
      .then(response => {
        setRecords(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const filterRecordsByDate = (records) => {
    if (!startDate || !endDate) {
      return records;
    }
  
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (start.getTime() === end.getTime()) {
      return records.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate
      });
    }
    
    return records.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= start && recordDate <= end;
    });
  };

  const sortRecords = (records) => {
    if (!orderBy) {
      return records;
    }

    const sortedRecords = [...records].sort((a, b) => {
      const valueA = a[orderBy];
      const valueB = b[orderBy];
  
      if (valueA < valueB) {
        return order === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  
    return sortedRecords;
  };

  const filterAndSortRecords = () => {
    const filteredRecords = filterRecordsByDate([...records]);
    const sortedRecords = sortRecords(filteredRecords);
    return sortedRecords;
  };

  const handleApplyFilters = () => {
    const sortedRecords = filterAndSortRecords();
    setRecords(sortedRecords);
  };

  const clearRecords = () => {
    axios.delete(API_URL_RECORDS)
      .then(response => {
        setRecords([]);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
      <div className="container-btn-home">
        <Link to="/"><button className="btn btn-info" id="btn-home">Home</button></Link>
        <h1 className="title-h1">List of Records</h1>
      <div className="constainer-filters">
        <label htmlFor="startDate" className="label-start-date">Start Date:</label>
        <input type="date" className="form-control" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} />

        <label htmlFor="endDate" className="label-end-date">End Date:</label>
        <input type="date" className="form-control" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} />

        <label htmlFor="orderBy" className="label-oder-by">Order By:</label>
        <select className="form-control" id="orderBy" value={orderBy} onChange={e => setOrderBy(e.target.value)}>
          <option value="time">Time</option>
          <option value="date">Date And Time</option>
        </select>

        <label htmlFor="order" className="label-order">Order:</label>
        <select className="form-control" id="order" value={order} onChange={e => setOrder(e.target.value)}>
          <option value="asc">Asc</option>
          <option value="desc">Des</option>
        </select>
      </div>
      <div className="button-filter">
        <button className="btn btn-success" id="btn-filter" onClick={handleApplyFilters}>Apply Filters</button>
      </div>

      <ul className="container-list-record">
        {records.map(record => (
          <li key={record.date}>
            Time: {(record.time / 1000).toFixed(2)}s - Date and Time: {new Date(record.date).toLocaleString()}
          </li>
        ))}
      </ul>
      <div className="container-btn-clear">
        <button className="btn btn-danger" id="btn-clear" onClick={clearRecords}>Clear Records</button>
      </div>
    </div>
  );
}

