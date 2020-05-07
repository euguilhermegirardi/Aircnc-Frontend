import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './styles.css';
import { Link } from 'react-router-dom';

export default function Dashboard() {

  // useState([]) = array cos' I'm expecting a list of stops and not just one.
  const [spots, setSpots] = useState([]);

  // useEffect is a function which has two params, the first one is a function, the second one is an 'array of dependencies'.
  // The 'array of dependencies' has several variables and when these variables are uptaded the first function will be fired.
  // When we have an empty array, the first function will be fired just one time in this component.
  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { user_id }
      });

      setSpots(response.data);
    };

    loadSpots();
  }, []);

   return  (
    <>
    <ul className="spot-list">
      {spots.map(spot => (
        <li key={spot._id}>
          <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}></header>
          <strong>{spot.company}</strong>
          <span>{spot.price ? `€${spot.price}/day` : 'Free'}</span>
        </li>
      ))}
    </ul>

    <Link to="/new">
      <button className="btn">Register new spot</button>
    </Link>
    </>
    )
};
