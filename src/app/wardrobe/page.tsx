import styles from '../styles/Home.module.css'
import  Card from '../components/card'
import Addbutton from '../components/addbutton'

const Wardrobe= async() =>{
  
  return (
    <div className={styles.container}>
      <h1>Your Wardrobe</h1>
      <p>Here you can view and manage your wardrobe items.</p>
      <Addbutton />
     <Card />
      
    </div>
  )
}
export default Wardrobe;
