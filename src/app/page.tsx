import Head from 'next/head'
import Link from 'next/link'
import styles from './styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Wardrobe Management</title>
        <meta name="description" content="Manage your wardrobe easily!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>Welcome to Your Wardrobe</h1>
        <p>Manage your clothes effortlessly and keep track of your wardrobe items.</p>
      </header>

      <main className={styles.main}>
        <section className={styles.card}>
          <h2>Your Wardrobe</h2>
          <p>View, add, or update your wardrobe items.</p>
          <Link href="/wardrobe"  className={styles.button}>
             Go to Wardrobe
          </Link>
        </section>

        <section className={styles.card}>
          <h2>Categories</h2>
          <p>Explore items by category: Shirts, Pants, Dresses, and more!</p>
          <Link href="/categories"  className={styles.button} >
          View Categories
          </Link>
        </section>

        <section className={styles.card}>
          <h2>Inventory</h2>
          <p>Track your wardrobe inventory and keep it up to date.</p>
          <Link href="/inventory"  className={styles.button}  >
            Manage Inventory
          </Link>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Created by Your Name</p>
      </footer>
    </div>
  )
}
