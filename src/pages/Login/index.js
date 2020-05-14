import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {

  // The first params is the state updated and the second one is used to update the state.
  const [email, setEmail] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    // get the info after a few seconds or less and save the information in the 'const response'.
    const response = await api.post('/sessions', { email });
    // id which comes from the server's response, same id from Insomnia.
    const { _id } = response.data;
    // Save the id in the applications' database.
    localStorage.setItem('user', _id);

    // 'history' is used to navigate the user between the pages.
    // After get the '_id' from the response, send the user to '/dashboard'.
    history.push('/dashboard');
  };

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
