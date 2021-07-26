import React from 'react'
import ReactDom from 'react-dom'
import style from './styles/modal.module.css'
import typeColors from '../helpers/color'
import selectors from '../redux/pokemon/pokemon-selectors'
import selectorsPage from '../redux/page/pageSelectors'
import {useDispatch, useSelector} from 'react-redux'
import operations from '../redux/pokemon/pokemon-operations'
import { nanoid } from 'nanoid'
import { CloseOutlined } from '@ant-design/icons';
import {HeartTwoTone,  DeleteTwoTone } from '@ant-design/icons';

export default function Modal({ open, onClose, pokemon }) {
  const favoritPokemonId = useSelector(selectors.getFavoritePokemon).map(el => el.id)
  const page = useSelector(selectorsPage.getPage)
  const dispatch = useDispatch();
  const handleChange = (e) =>{
    console.log();
 if(page ==='gallery' &&  e.target.nodeName === 'BUTTON'){
  e.target.classList.toggle('buttonAddFavorite')
}
if(e.target.nodeName === 'BUTTON'){
    addFavorite(pokemon)
}
return
}
const addFavorite  = (pokemon) => {
  console.log(favoritPokemonId);
  if(favoritPokemonId.includes(pokemon.id)){
      dispatch(operations.deleteFavoritePokemon(pokemon.id))
      return
  }else{
      dispatch(operations.addFavoritePokemon(pokemon))
  }  
} 
  if (!open) return null
  console.dir(pokemon.pokemonUrl);
  return ReactDom.createPortal(
    <>
      <div className={style.overlyStyles} />
      <div className={style.modalStyles}>
      <CloseOutlined className={style.closeButton}  onClick={onClose} />
        <h1 className={style.name} >{pokemon.pokemonUrl.species.name}</h1>
         <img className={style.img} src={pokemon.pokemonUrl.sprites.front_default} alt="pokemon"/>
           <div className={style.CardTypes}>
                {
                    pokemon.pokemonUrl.types.map(type => {
                        return (
                            <div key={nanoid()} className={style.cardType} style={{ backgroundColor:  typeColors[type.type.name] }}>
                                {type.type.name}
                            </div>
                        )
                    })
                }
            </div>
         <ul>
           <li className={style.weight}><span>Weight:</span> <span>{pokemon.pokemonUrl.weight}</span></li>
           <li className={style.height}><span>Height:</span><span>{pokemon.pokemonUrl.height}</span></li>
         </ul>
         <button className={style.button} onClick={handleChange} type='button'>
                {page === 'gallery' ? <HeartTwoTone className={style.favorite}  />
                 : <DeleteTwoTone className={style.delete} />
                 }</button>
      </div>
    </>,
    document.getElementById('portal')
  )
}
