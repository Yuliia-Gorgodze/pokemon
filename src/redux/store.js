import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
  import  pokemon  from './pokemon/pokemon-reducer';
  import page from './page/pageReducer'

  const store = configureStore({
    reducer: {
      pokemon,
      page
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });
  

  export default store

  