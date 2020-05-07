import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {

  const [email, setEmail] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/sessions', { email });
    const { _id } = response.data; // id whiche comes from the server's response, same id from Insomnia.
    localStorage.setItem('user', _id); // Save the id in the applications' database.

    // 'history' is used to navegate the user between the pages.
    history.push('/dashboard');
  };


  //onChange={handleEmailChange}
  // function handleEmailChange(event) {
    //setEmail(event.target.value)
  //};


  return (
    <>
      <p>
        Offer <strong>spots</strong> to developers and find <strong>talents</strong> for your company.
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">EMAIL *</label>
        <input
          type="email"
          id="email"
          placeholder="Your email."
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <button className="btn" type="submit">Enter</button>
      </form>
    </>
  )
};
