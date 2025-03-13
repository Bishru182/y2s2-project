import React from 'react';
import styles from './Home.module.css';
import apssaraLogo from './apssaraLogo.png';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate('/supplier');
  };

  const handleClick2 = () => {
    navigate('/order');
  };

  return (
    <div className={styles.contain}>
      {/* Topmost Section: Navbar within Image Container */}
      <div className={styles.header}>
        <img src={apssaraLogo} alt="Company Logo" className={styles.logo} />
        <nav className={styles.navbar}>
          <button className={styles.navButton}>Home</button>
          <button className={styles.navButton} onClick={handleClick1}>Add Supplier</button>
          <button className={styles.navButton} onClick={handleClick2}>Order Product</button>
        </nav>
      </div>

      {/* Company Information Section */}
      <div className={styles.content}>
        <p>
          Welcome to our company! We are dedicated to providing top-quality hardware solutions to meet your needs. From reliable suppliers to efficient order management, we strive to ensure the best service for our clients.
        </p>
      </div>
    </div>
  );
}

export default Home;
