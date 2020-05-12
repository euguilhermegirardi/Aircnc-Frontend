import React, { useEffect, useState, useMemo } from 'react';
import api from '../../services/api';
import './styles.css';
import { Link } from 'react-router-dom';
import socketio from "socket.io-client";

export default function Dashboard() {

  // useState([]) = array cos' I'm expecting a list of stops and not just one.
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem('user');
  // To memorize the user logged in.
  const socket = useMemo(() => socketio('http://localhost:3333', {
    query: { user_id },
  }), [user_id]);

  // useEffect fire the function as soon as the component show up in the screen.
  // socket.io to connect the backend with the frontend.
  useEffect(() => {
    socket.on('booking_request', data => {
      setRequests([...requests, data]);
    })
  }, [requests, socket]);

  // useEffect to load all the information that is already saved in the Dashboard.
  // useEffect is a function which has two params, the first one is a function, the second one is an 'array of dependencies'.
  // The 'array of dependencies' has several variables and when these variables are updated the first function will be fired.
  // When we have an empty array, the first function will be fired just one time in this component.
  useEffect(() => {
    async function loadSpots() {
      // Return the user's id to return all the spots saved.
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { user_id }
      });

      setSpots(response.data);
    };

    loadSpots();
  }, []);

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`);
    setRequests(requests.filter(request => request._id !== id));
  };

  async function handleDecline(id) {
    await api.post(`/bookings/${id}/declines`);
    setRequests(requests.filter(request => request._id !== id));
  };

   return  (
    <>
    <ul className="notifications">
      {requests.map(request => (
        <li key={request._id}>
          <p>
            <strong>{request.user.email}</strong> requested a spot in
            <strong> {request.spot.company}</strong> on:
            <strong> {request.date}</strong>
          </p>
          <button className="accept" onClick={() => handleAccept(request._id)}>Accept</button>
          <button className="decline" onClick={() => handleDecline(request._id)}>Decline</button>
        </li>
        )
      )}
    </ul>

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
