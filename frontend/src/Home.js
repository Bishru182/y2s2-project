import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import apssaraLogo from './apssaraLogo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleClick1 = () => {
    navigate('/supplier');
  };

  const handleClick2 = () => {
    navigate('/order');
  };

 
  const handleClick3 = () => {
    navigate('/sview');
  };

  return (
    <div className={styles.contain}>
      {/* Topmost Section: Navbar within Image Container */}
      <div className={styles.header}>
        <img src={apssaraLogo} alt="Company Logo" className={styles.logo} />
        <nav className={styles.navbar}>
          <button className={styles.navButton}>Home</button>
          <button className={styles.navButton} onClick={handleClick3}>Supplier</button>
          <button className={styles.navButton} onClick={handleClick2}>Order Product</button>
        </nav>
      </div>

      {/* Company Information Section */}
      <div className={styles.content}>
       

        {/* Orders Table */}
        <div className={styles.ordersSection}>
          <h2>Ordered Items</h2>
          <table className={styles.ordersTable}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Supplier Name</th>
                <th>Email</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Require Date</th>
                <th>Remarks</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>{order.requireDate}</td>
                  <td>{order.remarks}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add New Order Button */}
          
        </div>
      </div>
    </div>
  );
}

export default Home;
