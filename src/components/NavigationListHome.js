import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles/navigationListHome.module.css';
import imgVoting from '../img/three.png';
import imgGallery from '../img/one.png';
import imgBreeds from '../img/two.png';
import { useDispatch } from 'react-redux';
import page from '../redux/page/pageOperations';

const NavigationListHome = () => {
  const dispatch = useDispatch();
  const onClickFavorite = () => {
    dispatch(page('favorite'));
    localStorage.setItem('page', JSON.stringify('favorite'));
  };
  const onClickGallery = () => {
    dispatch(page('gallery'));
    localStorage.setItem('page', JSON.stringify('gallery'));
  };

  return (
    <ul className={styles.list}>
      <li>
        <div className={styles.cardVoting}>
          <img style={{ width: '100%' }} src={imgVoting} alt="gallery" />
        </div>
        <NavLink
          to="/gallery"
          onClick={onClickGallery}
          className={styles.button}
          activeClassName={styles.buttonActive}
        >
          галерея
        </NavLink>
      </li>
      <li>
        <div className={styles.cardGallery}>
          <img style={{ width: '100%' }} src={imgGallery} alt="favorite" />
        </div>
        <NavLink
          to="/favorite"
          className={styles.button}
          onClick={onClickFavorite}
          activeClassName={styles.buttonActive}
        >
          любимые
        </NavLink>
      </li>
    </ul>
  );
};
export default NavigationListHome;
