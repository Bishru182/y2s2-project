import React, { useState } from 'react';
import styles from './supplier.module.css';
import apssaraLogo from './apssaraLogo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Supplier() {
  
  const [name, setName] = useState('');
  const [sid, setSid] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [nic, setNic] = useState('');
  const [gender, setGender] = useState(''); // New state for gender
  const [remarks, setRemarks] = useState('');
  const navigate = useNavigate();

  const handleNICChange = (e) => {
    const inputNic = e.target.value;
    setNic(inputNic);

    if (/^\d{9}[VXvx]$|^\d{12}$/.test(inputNic)) {
      let genderDigits = '';

      if (inputNic.length === 10) {
        // Old format (9 digits + V/X)
        genderDigits = inputNic.substring(2, 5);
      } else if (inputNic.length === 12) {
        // New format (12 digits)
        genderDigits = inputNic.substring(4, 7);
      }

      if (genderDigits) {
        const genderNumber = parseInt(genderDigits, 10);
        setGender(genderNumber > 500 ? 'Female' : 'Male');
      } else {
        setGender('');
      }
    } else {
      setGender('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/supplier', {
        name,
        sid,
        email,
        contact,
        address,
        nic,
        gender, // Including gender in the post request
        remarks,
      });

      if (response.status === 200) {
        alert('Supplier registered successfully!');
        navigate('/sview');
      }
    } catch (error) {
      alert('Error: ' + error.response.data);
    }
  };

  const handleClick = () => {
    navigate('/sview');
  };

  return (
    <div className={styles.contain}>
      <div className={styles.header}>
        <img src={apssaraLogo} alt="Company Logo" className={styles.logo} />
        
        <nav className={styles.navbar}>
          <button className={styles.navButton} onClick={() => navigate('/home')}>Home</button>
          <button className={styles.navButton}>Supplier</button>
          <button className={styles.navButton} onClick={() => navigate('/order')}>Order Product</button>
        </nav>
      </div>

      <div className={styles.content1}>
        <div className={styles.supplierContainer}>
         <div className={styles.btn_back} onClick={handleClick}><button>back</button></div>
          
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
                <label><strong>NIC number</strong></label>
                <input
                  type="text"
                  placeholder='Enter NIC'
                  value={nic}
                  onChange={handleNICChange}
                  pattern="^\d{9}[VXvx]$|^\d{12}$"
                  title="Enter a valid Sri Lankan NIC (9 digits followed by V/X or 12 digits)"
                />
              </div>

              <div className={styles.mb3}>
                <label><strong>Gender</strong></label>
                <input
                  type="text"
                  value={gender}
                  readOnly
                  placeholder="Gender will be detected automatically"
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
