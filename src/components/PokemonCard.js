
import React, {useState} from 'react';
import typeColors from '../helpers/color'
import style from './styles/card.module.css'
import { nanoid } from 'nanoid'
import {useDispatch, useSelector} from 'react-redux'
import selectors from '../redux/pokemon/pokemon-selectors'
import selectorsPage from '../redux/page/pageSelectors'
import operations from '../redux/pokemon/pokemon-operations'
function Card({ pokemon }) {
    const dispatch = useDispatch();
  const page = useSelector(selectorsPage.getPage)

   const favoritPokemonId = useSelector(selectors.getFavoritePokemon).map(el => el.id)
   const [pockemon, setPokemon] = useState({})
 
    const handleChange = (e) =>{
        const  add = 'Добавить в любимые';
        const del = 'Удалить из любимых'
        if(favoritPokemonId.includes(pockemon.id)){
            e.target.textContent   = del
            return
        }
        if(e.target.textContent === add){
            e.target.textContent   = del
        }else{
            e.target.textContent   = add
        }
       addFavorite(pokemon)
    }
   
    const addFavorite  = (pokemon) => {
        console.log(favoritPokemonId);
        if(favoritPokemonId.includes(pokemon.id)){
            dispatch(operations.deleteFavoritePokemon(pokemon.id))
            setPokemon({pokemon})
            return
        }else{
            dispatch(operations.addFavoritePokemon(pokemon))
        }  
    } 
    return (
        <div  className={`${style.baseContainer} ${style.Card}`} >
            <div  className={style.Card__img}>
                <img src={pokemon.sprites.front_default} alt="" />
            </div>
            <div className={style.Card__name}>
                {pokemon.name}
            </div>
            <div className={style.Card__types}>
                {
                    pokemon.types.map(type => {
                        return (
                            <div key={nanoid()} className={style.Card__type} style={{ backgroundColor:  typeColors[type.type.name] }}>
                                {type.type.name}
                            </div>
                        )
                    })
                }
            </div>
            <div className={style.Card__info}>
                <div className={`${style.Card__data}  ${style.Card__data__weight}`}>
                    <p className={style.title}>Weight</p>
                    <p>{pokemon.weight}</p>
                </div>
                <div className={`${style.Card__data}  ${style.Card__data__weight}`}>
                    <p className={style.title}>Height</p>
                    <p>{pokemon.height}</p>
                </div>
                <div className={`${style.Card__data}  ${style.Card__data__ability}`}>
                    <p className={style.title}>Ability</p>
                    <p>{pokemon.abilities[0].ability.name}</p>
                </div>
            </div>
            <button onClick={handleChange} type='button'>{page === 'gallery' ? 'Добавить в любимые' : 'Удалить из любимых'}</button>
        </div>
    );
}

export default Card ;