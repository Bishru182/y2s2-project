import React, { useState, useEffect } from 'react';
import styles from './order.module.css';
import apssaraLogo from './apssaraLogo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Order() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [requireDate, setRequireDate] = useState('');
  const [remarks, setRemarks] = useState('');
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

    const selectedSupplier = suppliers.find(supplier => supplier.name === selectedSupplierName);
    if (selectedSupplier) {
      setEmail(selectedSupplier.email);
    } else {
      setEmail('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/order', {
        name,
        email,
        productName,
        quantity,
        requireDate,
        remarks
      });
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place the order.');
    }
  };

  return (
    <div className={styles.contain}>
      <div className={styles.header}>
        <img src={apssaraLogo} alt="Company Logo" className={styles.logo} />
        <nav className={styles.navbar}>
          <button className={styles.navButton} onClick={() => navigate('/home')}>Home</button>
          <button className={styles.navButton}onClick={() => navigate('/sview')}>Supplier</button>
          <button className={styles.navButton} onClick={() => navigate('/order')}>Order Product</button>
        </nav>
      </div>

      <div className={styles.content1}>
        <div className={styles.supplierContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.headers}><h2>Order Product</h2></div>

            <div className={styles.formGrid}>
              <div className={styles.mb3}>
                <label><strong>Supplier Name</strong></label>
                <select value={name} onChange={handleSupplierChange}>
                  <option value="">Select Supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.name}>{supplier.name}</option>
                  ))}
                </select>
              </div>

              <div className={styles.mb3}>
                <label><strong>Email</strong></label>
                <input type="email" value={email} readOnly />
              </div>

              <div className={styles.mb3}>
                <label><strong>Product Name</strong></label>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
              </div>

              <div className={styles.mb3}>
                <label><strong>Quantity</strong></label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
              </div>

              <div className={styles.mb32}>
                <label><strong>Require Date</strong></label>
                <input type="date" value={requireDate} onChange={(e) => setRequireDate(e.target.value)} required />
              </div>

              <div className={styles.mb32}>
                <label><strong>Remarks</strong></label>
                <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)}></textarea>
              </div>
            </div>

            <button type="submit" className={styles.btn}>Order</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Order;
