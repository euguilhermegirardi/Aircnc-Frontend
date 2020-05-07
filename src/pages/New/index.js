import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import './styles.css';
import api from '../../services/api';

export default function New({ history }) {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(e) {
    e.preventDefault();

    const user_id = localStorage.getItem('user');
    const data = new FormData();
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);
    data.append('thumbnail', thumbnail);


    await api.post('/spots', data, {
      headers: { user_id }
    });

    history.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail' : null}
      >
        <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
        <img src={camera} alt="Select img"/>
      </label>
      <label htmlFor="company">Company *</label>
      <input
        id="company"
        placeholder="Your company"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="company">Technologies *</label>
      <input
        id="techs"
        placeholder="Which technologies do you use?"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor="price">Daily rate * <span>(Empty field for free)</span></label>
      <input
        id="price"
        placeholder="Price per day"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />

      <button type="submit" className="btn">Register now</button>
    </form>
  );
};
