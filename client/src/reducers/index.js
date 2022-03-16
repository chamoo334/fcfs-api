import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import campgrounds from './campgrounds';

const rootReducer = combineReducers({
  alert,
  auth,
  campgrounds,
  //   post
});

export default rootReducer;
