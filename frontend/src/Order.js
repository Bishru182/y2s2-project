import React, { useState, useEffect } from 'react';
import styles from './order.module.css';
import apssaraLogo from './apssaraLogo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Order() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [suppliers, setSuppliers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/suppliers');
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSupplierChange = (e) => {
    const selectedSupplierName = e.target.value;
    setName(selectedSupplierName);

    // Find the selected supplier from the suppliers list
    const selectedSupplier = suppliers.find(supplier => supplier.name === selectedSupplierName);
    
    // If found, set the email state to the selected supplier's email
    if (selectedSupplier) {
      setEmail(selectedSupplier.email);
    } else {
      setEmail(''); // Clear email if no supplier is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form submission logic here
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
              <h2>Order product</h2>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.mb3}>
                <label><strong>Supplier Name</strong></label>
                <select
                  value={name}
                  onChange={handleSupplierChange}
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.name}>{supplier.name}</option>
                  ))}
                </select>
              </div>

              <div className={styles.mb3}>
                <label><strong>Email</strong></label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly
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

export default Order;
