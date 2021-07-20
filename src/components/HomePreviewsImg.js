import styles from '../views/styles/homePage.module.css'
import imgHome from '../img/home.png'

const HomePreviewsImg = () => {
    return <div className={styles.baseContainer}>
    <img className={styles.imgHome} src={imgHome} width='100%' alt='imgPreviws'/>
    
    </div>
} 

export default HomePreviewsImg;