import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import './styles.css';
import api from '../../services/api';

export default function New({ history }) {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null); // null cos' it's not a text.

  // To create a preview from 'thumbnail'. Show the img selected.
  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(e) {
    e.preventDefault();

    const user_id = localStorage.getItem('user');
    // 'new FormData()' was created because to create a spot was use many information as 'Multipart Form' as the Insomnia shows...
    // So, to return those information on React it's necessary to append them one by one.
    const data = new FormData();
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);
    data.append('thumbnail', thumbnail);


    await api.post('/spots', data, {
      headers: { user_id }
    });

    // After create the new spot, send the user to '/dashboard'.
    history.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        // 'preview' from the 'useMemo'.
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
