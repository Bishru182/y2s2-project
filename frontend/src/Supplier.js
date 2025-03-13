import React, { useState } from 'react';
import styles from './supplier.module.css';
import apssaraLogo from './apssaraLogo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Supplier() {
  
  const [name, setName] = useState('');
  const [sid,setSid] = useState('')
  const [email, setEmail] = useState('');
  const [contact,setContact] = useState('');
  const [address, setAddress] = useState('');
  const [remarks, setRemarks] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/supplier', {
        name,
        sid,
        email,
        contact,
        address,
        remarks,
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
          <button className={styles.navButton} onClick={() => navigate('/order')}>Order Product</button>
        </nav>
      </div>

      <div className={styles.content1}>
        <div className={styles.supplierContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.headers}>
              <h2>Supplier Details</h2>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.mb3}>
                <label><strong>Supplier Name</strong></label>
                <input
                  type="text"
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className={styles.mb3}>
                <label><strong>Supplier ID</strong></label>
                <input
                  type="text"
                  placeholder='Enter ID'
                  value={sid}
                  onChange={(e) => setSid(e.target.value)}
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
                <label><strong>Contact Number</strong></label>
                <input
                  type="tel"
                  placeholder='Enter phone number'
                  pattern="[0-9]{10}" required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>

              <div className={styles.mb3}>
                <label><strong>Address</strong></label>
                <input
                  type="text"
                  placeholder='Enter Address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className={styles.mb3}>
                <label><strong>Remarks</strong></label>
                <input
                  type="text"
                  placeholder='Enter Remarks'
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className={styles.btn}>Add Supplier</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Supplier;
