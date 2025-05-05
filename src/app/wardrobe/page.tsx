// pages/wardrobe.tsx
'use client';
import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import Card from '../components/card';
import Addbutton from '../components/addbutton';
import AlertMessage from '../components/alertMessage';

const Wardrobe = () => {
  const [alert, setAlert] = useState<{ message: string; type?: 'success' | 'error' | 'info' | 'warning' } | null>(null);

  const showAlert = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000); // Hide alert after 3 seconds
  };

  return (
    <div>
      <div className='flex justify-end'>
        <Addbutton />
      </div>
      <div className={styles.container}>
        <h1>Your Wardrobe</h1>
        <p>Here you can view and manage your wardrobe items.</p>
        <Card showAlert={showAlert} />
      </div>
      {alert && <AlertMessage message={alert.message} type={alert.type} />}
    </div>
  );
};

export default Wardrobe;
