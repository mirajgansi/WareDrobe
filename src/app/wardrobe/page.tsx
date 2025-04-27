import styles from '../styles/Home.module.css'
import  Card from '../components/card'
import Addbutton from '../components/addbutton'

const Wardrobe= async() =>{
  
  return (
    <div>
    <div className='flex justify-end'>
      <Addbutton />
      </div>
    <div className={styles.container}>
      <h1>Your Wardrobe</h1>
      <p>Here you can view and manage your wardrobe items.</p>
     <Card />
    </div>
    </div>
  )
}
export default Wardrobe;
