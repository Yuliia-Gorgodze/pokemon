import React, { Suspense } from 'react';
import {  Switch } from 'react-router-dom';
import Spinner from './components/Spinner';
import HomePage from './views/HomePage'
import styles from './index.css'



export default function App() {

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Switch>
       <HomePage/>
        </Switch>
      </Suspense>
    </>
  );
}
