import React from 'react';
import styles from './supplier.module.css';
import apssaraLogo from './apssaraLogo.png';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div className={styles.contain}>
      {/* Topmost Section: Navbar within Image Container */}
      <div className={styles.header}>
        <img src={apssaraLogo} alt="Company Logo" className={styles.logo} />
        <nav className={styles.navbar}>
          <button className={styles.navButton} onClick={handleClick}>Home</button>
          <button className={styles.navButton} >Add Supplier</button>
          <button className={styles.navButton}>Order Product</button>
        </nav>
      </div>

      {/* Company Information Section */}
      <div className={styles.content}>
        <p>
          poda punda
        </p>
      </div>
    </div>
  );
}

export default Home;
