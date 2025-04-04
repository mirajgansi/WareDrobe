import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
export default function Inventory() {
  return (
    <div className={styles.container}>
      <h1>Inventory</h1>
      <p>Track your wardrobe inventory and make updates.</p>
      {/* Add inventory management content here */}
    </div>
  )
}
