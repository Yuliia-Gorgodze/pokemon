
import { createReducer } from '@reduxjs/toolkit';
import {
pageSucces}
 from './pageActions';


const page = createReducer(
    'gallery',
    {
        [pageSucces]: (_, { payload }) =>  payload,
    },
  );

export default page

