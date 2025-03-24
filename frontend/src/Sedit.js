import React, { useState } from 'react';
import styles from './sedit.module.css';
import apssaraLogo from './apssaraLogo.png';
/*import { useNavigate } from 'react-router-dom';*/
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';


function Sedit() {
    const { state } = useLocation();
    const navigate = useNavigate();
  
    const [name, setName] = useState(state?.supplier?.name || '');
    const [sid, setSid] = useState(state?.supplier?.sid || '');
    const [email, setEmail] = useState(state?.supplier?.email || '');
    const [contact, setContact] = useState(state?.supplier?.contact || '');
    const [address, setAddress] = useState(state?.supplier?.address || '');
    const [nic, setNic] = useState(state?.supplier?.nic || '');
    const [gender, setGender] = useState(state?.supplier?.gender || '');
    const [remarks, setRemarks] = useState(state?.supplier?.remarks || '');
    const [id, setId] = useState(state?.supplier?.id || ''); // Save the supplier's ID for updating
    const [nameError, setNameError] = useState('');
    const [sidError, setSidError] = useState('');
    const [emailError, setEmailError] = useState('');
    

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

      //supplier name validatiuon
  const handleNameChange = (e) => {
    const inputName = e.target.value;
    if (/\d/.test(inputName)) {
      setNameError('Numbers are not allowed in the name field.');
    } else {
      setNameError('');
      
    }
    setName(inputName);
  };

    // Supplier ID validation
    const handleSIDChange = (e) => {
      const value = e.target.value;
      if (value.length > 6) {
        setSidError('Supplier ID must not exceed 6 characters.');
      }else if (value.length < 6){
        setSidError('Supplier ID must have 6 characters.');
      } 
      else {
        setSidError('');
      }
      setSid(value);
    };

      //email validation
  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Email validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(inputEmail)) {
        setEmailError('Invalid email address. Please enter a valid email.');
    } else {
        setEmailError('');
    }
};
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.put(`http://localhost:5000/supplier/${id}`, {
          name,
          sid,
          email,
          contact,
          address,
          nic,
          gender,
          remarks,
        });
  
        if (response.status === 200) {
          alert('Supplier updated successfully!');
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
                  onChange={handleNameChange}
                  style={{ border: nameError ? '2px solid red' : '' }} 
                />
                {nameError && <p className={styles.errorText}>{nameError}</p>}
              </div>

              <div className={styles.mb3}>
                <label><strong>Supplier ID</strong></label>
                <input
                  type="text"
                  placeholder='Enter ID'
                  value={sid}
                  onChange={handleSIDChange}
                  style={{ border: sidError ? '2px solid red' : '' }} 
                />
                {sidError && <p className={styles.errorText}>{sidError}</p>}
              </div>

              <div className={styles.mb3}>
                <label><strong>Email</strong></label>
                <input
                  type="email"
                  placeholder='Enter Email'
                  value={email}
                  onChange={handleEmailChange}
                  style={{ border: emailError ? '2px solid red' : '' }} 
                />
                 {emailError && <p className={styles.errorText}>{emailError}</p>}
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

            <button type="submit" className={styles.btn}>Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sedit;
