import React, { useState } from 'react';
import styles from './supplier.module.css';
import apssaraLogo from './apssaraLogo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Supplier() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        alert('Supplier registered successfully!');
        navigate('/home');
      }
    } catch (error) {
      alert('Error: ' + error.response.data);
    }
  };

  return (
    <div className={styles.contain}>
      <div className={styles.header}>
        <img src={apssaraLogo} alt="Company Logo" className={styles.logo} />
        <nav className={styles.navbar}>
          <button className={styles.navButton} onClick={() => navigate('/home')}>Home</button>
          <button className={styles.navButton}>Add Supplier</button>
          <button className={styles.navButton}>Order Product</button>
        </nav>
      </div>

      <div className={styles.content1}>
        <div className={styles.supplierContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.headers}>
              <h2>Admin</h2>
            </div>

            <div className={styles.mb3}>
              <label><strong>Name</strong></label>
              <input
                type="text"
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.mb3}>
              <label><strong>Email</strong></label>
              <input
                type="email"
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.mb3}>
              <label><strong>Password</strong></label>
              <input
                type="password"
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className={styles.btn}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Supplier;
