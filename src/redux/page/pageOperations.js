
import {
    pageSucces,

} from './pageActions';

  const page = (page) =>
 dispatch => {
  dispatch(pageSucces(page));

  };
  

export default page 
