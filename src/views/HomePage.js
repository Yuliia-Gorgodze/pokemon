
import React, { Component } from 'react'; 
import { Route } from 'react-router-dom';
import styles from './styles/homePage.module.css'
import logo from '../img/pokemon-logo.png'
import NavigationList from '../components/NavigationListHome'
import GalleryPage from './GalleryPage'
import HomePreviews from '../components/HomePreviewsImg'
import FavoritePage from './FavoritePokemon'

class HomePage extends Component {
   state = {
       renderPage : false
   }
    render () {
        return (
            <> 
            <div className={styles.baseContainerHome}>
            
            <div className={styles.homeContainer}>
            <img alt='logo' src={logo} className={styles.logo}/>
            <h2 className= {styles.title}> Привет друг!</h2>
             <span className={styles.text}>Добро пожаловать в мир покемонов</span>
             <span className={styles.listTitle}>Давай знакомиться!</span>
             <NavigationList/>
            </div>
             <div className={styles.container}>
             <Route exact path="/" component={HomePreviews} />
             <Route path="/gallery" component={GalleryPage} />
             <Route path="/favorite"  component={FavoritePage} />
           
             </div>
            </div>
            </>
            )
    } 
}
export default HomePage;
