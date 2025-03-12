import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const hardcodedEmail = 'admin@example.com';
  const hardcodedPassword = 'admin123';

  const validate = () => {
    const errors = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (email === hardcodedEmail && password === hardcodedPassword) {
        navigate('/home');
      } else {
        alert('Invalid credentials');
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <h2>Admin</h2>
        </div>
        
        <div className={styles.mb3}>
          <label><strong>Email</strong></label>
          <input
            type="email"
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        
        <div className={styles.mb3}>
          <label><strong>Password</strong></label>
          <input
            type="password"
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>
        
        <button type="submit" className={styles.btn}>Log in</button>
      </form>
    </div>
  );
}

export default Login;
