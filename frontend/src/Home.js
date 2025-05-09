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
    navigate('/');
  };

  const handleClick2 = () => {
    navigate('/order');
  };

 
  const handleClick3 = () => {
    navigate('/sview');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/order/${id}`);
      setOrders(orders.filter(order => order.id !== id)); // Remove order from UI
      //alert("Order deleted successfully!");
    } catch (error) {
      console.error('Error deleting order:', error);
      alert("Failed to delete order.");
    }
  };
  
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/order/status/${id}`, { status });
  
      // Update local state
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === id ? { ...order, deliveryStatus: status } : order
        )
      );
  
      // If status is 'received', store data in the item table
      if (status === 'received') {
        const receivedOrder = orders.find(order => order.id === id);
        
        await axios.post('http://localhost:5000/items', {
          orderId: receivedOrder.id,
          productName: receivedOrder.productName,
          quantity: receivedOrder.quantity,
          //receivedDate: new Date(), // or use backend time
          //supplierName: receivedOrder.name,
          //remarks: receivedOrder.remarks
        });
  
        console.log("Item added to item table.");
      }
    } catch (error) {
      console.error('Error updating status or storing item:', error);
      alert('Failed to update status or store item data.');
    }
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
          <button className={styles.logOutButton} onClick={handleClick1}>Logout</button>
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
                
                <th>Delivery status</th>
                <th>Action</th>
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


                  <td>
  <div className={styles.radioGroup}>
   <label>
      <input
        type="radio"
        name={`status-${order.id}`}
        value="pending"
        checked={order.deliveryStatus === 'pending'}
        onChange={() => updateStatus(order.id, 'pending')}
      /> Pending 
    </label>
    <label>
      <input
        type="radio"
        name={`status-${order.id}`}
        value="confirmed"
        checked={order.deliveryStatus === 'confirmed'}
        onChange={() => updateStatus(order.id, 'confirmed')}
      /> Confirmed
    </label>
    <label>
      <input
        type="radio"
        name={`status-${order.id}`}
        value="delivering"
        checked={order.deliveryStatus === 'delivering'}
        onChange={() => updateStatus(order.id, 'delivering')}
      /> Delivering
    </label>
    <label>
      <input
        type="radio"
        name={`status-${order.id}`}
        value="received"
        checked={order.deliveryStatus === 'received'}
        onChange={() => updateStatus(order.id, 'received')}
      /> Received
    </label>
  </div>
</td>

                  <td>
                    <button 
                      className={styles.deleteButton} 
                      onClick={() => handleDelete(order.id)}
                    >
                      Delete
                    </button>
                  </td>

                
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
